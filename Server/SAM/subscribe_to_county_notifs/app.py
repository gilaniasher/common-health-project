import json
import boto3
from firebase_admin import messaging, credentials, initialize_app

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


def lambda_handler(event, context):
    params = event['queryStringParameters']
    status, fcm_secret = get_firebase_secret()

    if status == 500:
        return { 'statusCode': 500, 'body': json.dumps({ 'message': 'Unable to get Firebase secret' }) }

    creds = credentials.Certificate(fcm_secret)
    initialize_app(creds)

    reg_tokens = [params['regToken']]
    res = messaging.subscribe_to_topic(reg_tokens, params['county'])

    if res.success_count > 0:
        return { 'statusCode': 200, 'body': json.dumps({ 'message': 'User subscribed to notification topic' }) }
    else:
        return { 'statusCode': 500, 'body': json.dumps({ 'message': 'Unable to subscribe user to notification topic' }) }
