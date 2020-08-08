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
    round_num = event['queryStringParameters']['roundNumber']

    # Connect to DB
    status, secret = get_db_secret()

    if status == 500:
        return { 'statusCode': 500, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': 'Unable to get DB secret' }) }

    conn = None
    cur = None

    try:
        conn = psycopg2.connect(host=secret['host'], database=secret['dbname'], user=secret['username'], password=secret['password'])
        cur = conn.cursor()
    except Exception as e:
        return { 'statusCode': 500, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': f'Failed to establish DB connection: {e}' }) }

    if round_num == '':
        # Figure out next round (get current round and add one)
        cur.execute('''
            SELECT round_number
            FROM rounds
            WHERE start_date <= (SELECT CURRENT_DATE) AND (SELECT CURRENT_DATE) <= end_date
        ''')

        next_round = cur.fetchone()[0] + 1
    else:
        next_round = round_num

    # Query for unassigned constructors
    cur.execute('''
        SELECT c_id, name, num_masks_desired / 10 as num_kits_desired
        FROM construct_intent INNER JOIN constructors ON c_id = id
        WHERE round_number = %s
    ''', (next_round,))

    unassigned_users = []

    if (results := cur.fetchall()):
        unassigned_users = results

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': status,
        'headers': { "Access-Control-Allow-Origin" : "*" },
        'body': json.dumps({
            'unassignedUsers': unassigned_users
        })
    }
