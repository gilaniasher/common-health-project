import json
import psycopg2
import boto3
import firebase_admin
from firebase_admin import messaging, credentials, initialize_app

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

def get_firebase_secret():
    try:
        session = boto3.session.Session()
        client = session.client(service_name='secretsmanager', region_name='us-east-2')
        get_secret_value_response = client.get_secret_value(SecretId='dev/CHP/firebase')
        secret = get_secret_value_response['SecretString']
    except Exception as e:
        return 500, f'Secret Manager Error: {e}'
    else:
        return 200, json.loads(secret)

def add_dates_db(county, notif_title, notif_body):
    # Connect to DB
    status, secret = get_db_secret()

    if status == 500:
        return 500, 'Unable to get DB secret'

    conn = None
    cur = None

    try:
        conn = psycopg2.connect(host=secret['host'], database=secret['dbname'], user=secret['username'], password=secret['password'])
        cur = conn.cursor()
    except Exception as e:
        return 500, f'Failed to establish DB connection: {e}'

    # Add this information to the database
    vals = (
        county,
        notif_title,
        notif_body
    )

    cur.execute('''
        INSERT INTO notifications (county, time, title, body)
        VALUES (%s, NOW(), %s, %s);

    ''', vals)

    conn.commit()

    if conn is not None:
        cur.close()
        conn.close()

    return 200, ''

def send_county_notification(notif_title, notif_body, county):
    if not firebase_admin._apps:
        status, fcm_secret = get_firebase_secret()

        if status == 500:
            return 500, 'Unable to get Firebase secret'

        creds = credentials.Certificate(fcm_secret)
        initialize_app(creds)

    messaging.send(messaging.Message(
        notification=messaging.Notification(
            title=notif_title,
            body=notif_body
        ),
        topic=county
    ))

    return 200, ''

def lambda_handler(event, context):
    params = event['queryStringParameters']
    notif_title = f'CHP {params["county"]} Update (Round {params["roundNum"]})'
    notif_body = f'Kits will be dropped off on {params["kitDropoffDate"]}\nKits will be collected on {params["kitPickupDate"]}'

    # Update DB
    status, msg = add_dates_db(params['county'], notif_title, notif_body)

    if status != 200:
        return { 'statusCode': 500, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': msg }) }

    # Send out Firebase notifications
    status, msg = send_county_notification(notif_title, notif_body, params['county'])

    if status != 200:
        return { 'statusCode': 500, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': msg }) }

    return {
        'statusCode': 200,
        'headers': { "Access-Control-Allow-Origin" : "*" },
        'body': json.dumps({
            'message': 'Dates scheduled succesfully'
        }),
    }
