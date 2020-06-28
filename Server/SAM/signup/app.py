import json
import psycopg2

def lambda_handler(event, context):
    name = event['queryStringParameters']['name']
    address = event['queryStringParameters']['address']
    county = event['queryStringParameters']['county']
    phone_number = event['queryStringParameters']['phone_number']
    email = event['queryStringParameters']['email']
    passhash = event['queryStringParameters']['passhash']
    driver_id = 1

    conn = None
    cur = None

    try:
        conn = psycopg2.connect(
            host='', 
            database='', 
            user='', 
            password=''
        )
        cur = conn.cursor()

        query = '''
        INSERT INTO constructors (name, address, county, phone_number, email, passhash, driver_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        '''

        cur.execute(query, (name, address, county, phone_number, email, passhash, driver_id))
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

    return {
        'statusCode': status,
        'body': json.dumps({
            'message': msg
        }),
    }
