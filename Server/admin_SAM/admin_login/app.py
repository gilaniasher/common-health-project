import json
import boto3

def get_admin_secret():
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
    params = event['queryStringParameters']
    status, creds = get_admin_secret()

    if status != 200:
        return { 'statusCode': 500, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': 'Could not retrieve Admin Credentials' }) }

    if params['username'] == creds['adminUser'] and params['password'] == creds['adminPassword']:
        return { 'statusCode': 200, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': 'Login Succesful' }) }
    else:
        return { 'statusCode': 401, 'headers': { "Access-Control-Allow-Origin" : "*" }, 'body': json.dumps({ 'message': 'Invalid Credentials' }) }
