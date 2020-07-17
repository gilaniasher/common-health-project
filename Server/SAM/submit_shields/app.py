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

    # Submit built shields
    vals = (
        params['numShieldsBuilt'],
        params['uid'],
        round_number
    )

    cur.execute('''
        UPDATE rounds_construct
        SET num_masks_built = %s
        WHERE c_id = %s AND round_number = %s
    ''', vals)

    conn.commit()

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Succesfully submitted kits'
        }),
    }
