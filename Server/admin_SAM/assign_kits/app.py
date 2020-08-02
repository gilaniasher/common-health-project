import json
import psycopg2
from psycopg2.extras import execute_values
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
    kit_assignment = json.loads(event['body'])

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

    # Figure out next round (get current round and add one)
    cur.execute('''
        SELECT round_number
        FROM rounds
        WHERE start_date <= (SELECT CURRENT_DATE) AND (SELECT CURRENT_DATE) <= end_date
    ''')

    next_round = cur.fetchone()[0] + 1

    # Assign Kits (update rows in rounds_construct)
    args_list = [(next_round, 0, 0, c_id, num_masks_assigned) for c_id, num_masks_assigned in kit_assignment.items()]

    execute_values(cur, '''
        INSERT INTO rounds_construct (round_number, num_masks_built, num_masks_broken, c_id, num_masks_assigned)
        VALUES %s
    ''', args_list)

    # Remove these users from construct_intent
    assigned_ids = tuple(c_id for c_id in kit_assignment)

    cur.execute('''
        DELETE FROM construct_intent
        WHERE round_number = %s AND c_id IN %s
    ''', (next_round, assigned_ids))

    conn.commit()

    if conn is not None:
        cur.close()
        conn.close()

    return {
        'statusCode': 200,
        'headers': { "Access-Control-Allow-Origin" : "*" },
        'body': json.dumps({ 'message': 'Succesfully assigned kits for next round' })
    }
