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

def run_query(query, vals):
    status, secret = get_db_secret()

    if status == 500:
        return status, secret

    conn = None
    cur = None

    try:
        conn = psycopg2.connect(host=secret['host'], database=secret['dbname'], user=secret['username'], password=secret['password'])
        cur = conn.cursor()
        cur.execute(query, vals)
        conn.commit()
    except Exception as e:
        status = 500
        msg = str(e)
    else:
        status = 200
        msg = 'Signup succesful'
    finally:
        if cur is not None: cur.close()
        if conn is not None: conn.close()

    return status, msg

def lambda_handler(event, context):
    query = '''
    INSERT INTO constructors (id, name, address, county, phone_number, email, driver_id)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    '''

    print(event)
    params = event['queryStringParameters']

    vals = (
        params['uid'],
        params['name'],
        params['address'],
        params['county'],
        params['phone_number'],
        params['email'],
        1
    )

    status, msg = run_query(query, vals)

    return {
        'statusCode': status,
        'body': json.dumps({
            'message': msg
        }),
    }
