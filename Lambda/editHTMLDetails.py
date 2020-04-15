import json
import boto3
from datetime import datetime

s3 = boto3.resource('s3')

def lambda_handler(event, context):
    bucket = 'getsmarthack'
    key = 'details.json'
    
    body = json.loads(event["body"])
    new_details = {
        "name": body["name"],
        "number": body["number"],
        "address": body["address"],
        "plateNo": body["plateNo"]
    }
    
    try:
        # See Current
        data = s3.Object(bucket, key)
        data.put(Body=bytes(json.dumps(new_details).encode('UTF-8')), ACL='public-read')
        file = data.get()['Body'].read().decode()
        print(file)
    
        # TODO implement
        return {
            'statusCode': 200,
            'body': json.dumps(new_details)
        }
        
    except Exception as e:
        print(e)
        raise e
