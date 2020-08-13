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

    # Get current round number
    cur.execute('''
        SELECT round_number
        FROM rounds
        WHERE start_date <= (SELECT CURRENT_DATE) AND (SELECT CURRENT_DATE) <= end_date
    ''')

    if params['nextRound']:
        round_number = cur.fetchone()[0] + 1
    else:
        round_number = cur.fetchone()[0]

    # Declare intent to sign up for certain number of kits (actual assignment happens in admin interface)
    vals = (
        params['uid'],
        round_number,
        int(params['numKits']) * 10
    )

    cur.execute('''
        INSERT INTO construct_intent (c_id, round_number, num_masks_desired)
        VALUES (%s, %s, %s)
    ''', vals)

    conn.commit()

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Succesfully signed up for {params["numKits"]} kits'
        }),
    }
