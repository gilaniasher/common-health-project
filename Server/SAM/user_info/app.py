import json
import psycopg2
import boto3

def get_db_secret():
    try:
        session = boto3.session.Session()
        client = session.client(service_name='secretsmanager', region_name='us-east-2')
        get_secret_value_response = client.get_secret_value(SecretId='dev/CHP/postgres')
        secret = get_secret_value_response['SecretString']
    except Exception as e:
        return 500, f'Secret Manager Error: {e}'
    else:
        return 200, json.loads(secret)

def lambda_handler(event, context):
    # Load params
    params = event['queryStringParameters']
    uid = params['uid']

    # Connect to DB
    status, secret = get_db_secret()

    if status == 500:
        return { 'statusCode': 500, 'body': json.dumps({ 'message': 'Unable to get DB secret' }) }

    conn = None
    cur = None

    try:
        conn = psycopg2.connect(host=secret['host'], database=secret['dbname'], user=secret['username'], password=secret['password'])
        cur = conn.cursor()
    except Exception as e:
        return { 'statusCode': 500, 'body': json.dumps({ 'message': f'Failed to establish DB connection: {e}' }) }

    # Figure out current round
    cur.execute('''
        SELECT round_number
        FROM rounds
        WHERE start_date <= (SELECT CURRENT_DATE) AND (SELECT CURRENT_DATE) <= end_date
    ''')

    round_number = cur.fetchone()[0]

    # Query rounds_construct for num_masks_assigned, built, broken/ opted out
    cur.execute('''
        SELECT num_masks_built, num_masks_broken, num_masks_assigned
        FROM rounds_construct
        WHERE c_id = %s AND round_number = %s
    ''', (uid, round_number))

    if (vals := cur.fetchone()) is None:
        opted_out = True
        num_masks_built, num_masks_broken, num_masks_assigned = (0, 0, 0)
    else:
        opted_out = False
        num_masks_built, num_masks_broken, num_masks_assigned = vals

    # Query for name
    cur.execute('''
        SELECT name, num_masks_built, county
        FROM constructors
        WHERE id = %s
    ''', (uid,))

    name, total_masks_built, county = cur.fetchone()

    # Query for notifications
    cur.execute('''
        SELECT time, title, body
        FROM notifications
        WHERE county = %s
        ORDER BY time DESC
        LIMIT 25
    ''', (county,))

    notifications = []

    if (results := cur.fetchall()):
        for time, title, body in results:
            notifications.append((time.strftime('%m/%d/%Y, %-I:%M%p'), title, body))

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': status,
        'body': json.dumps({
            'name': name,
            'currentRound': round_number,
            'optedOut' : opted_out,
            'numMasksAssigned': num_masks_assigned,
            'numMasksBuilt': num_masks_built,
            'numMasksBroken': num_masks_broken,
            'notifications': notifications,
            'totalMasksBuilt': total_masks_built,
            'county': county
        }),
    }
