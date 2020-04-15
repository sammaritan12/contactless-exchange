import json
import boto3
  
sns = boto3.client('sns')

def lambda_handler(event, context):
    
    body = json.loads(event["body"])
    number = body["number"]
    message = "Vehicle and Insurance Details: http://getsmarthack.s3-website-ap-southeast-2.amazonaws.com/"
    
    sns.publish(PhoneNumber = number, Message=message )
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Number: {}, Message: {}'.format(number, message))
    }
