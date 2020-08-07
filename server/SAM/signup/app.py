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

    vals = (
        params['uid'],
        params['name'],
        params['address'],
        params['county'],
        params['phone_number'],
        params['email'],
        1
    )

    cur.execute('''
        INSERT INTO constructors (id, name, address, county, phone_number, email, driver_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', vals)

    conn.commit()

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'User inserted succesfully'
        }),
    }
