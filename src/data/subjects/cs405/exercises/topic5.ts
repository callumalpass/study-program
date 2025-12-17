import { CodingExercise } from '../../../../core/types';

const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-5-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-5',
    title: 'Build Serverless REST API',
    difficulty: 3,
    description: `Create a serverless REST API using AWS Lambda and API Gateway (or similar) with:

1. CRUD endpoints for a resource
2. DynamoDB for data storage
3. Input validation
4. Error handling
5. Proper HTTP status codes

Use Serverless Framework or SAM.`,
    starterCode: `# serverless.yml
# TODO: Define service configuration

# handler.py
# TODO: Implement Lambda functions`,
    solution: `# serverless.yml
service: users-api

provider:
  name: aws
  runtime: python3.9
  region: us-east-1
  stage: \${opt:stage, 'dev'}
  environment:
    USERS_TABLE: \${self:service}-\${self:provider.stage}-users
    STAGE: \${self:provider.stage}
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - dynamodb:Query
            - dynamodb:Scan
            - dynamodb:GetItem
            - dynamodb:PutItem
            - dynamodb:UpdateItem
            - dynamodb:DeleteItem
          Resource:
            - !GetAtt UsersTable.Arn
            - !Join ['/', [!GetAtt UsersTable.Arn, 'index', '*']]

functions:
  createUser:
    handler: handler.create_user
    events:
      - http:
          path: /users
          method: post
          cors: true

  getUser:
    handler: handler.get_user
    events:
      - http:
          path: /users/{user_id}
          method: get
          cors: true

  listUsers:
    handler: handler.list_users
    events:
      - http:
          path: /users
          method: get
          cors: true

  updateUser:
    handler: handler.update_user
    events:
      - http:
          path: /users/{user_id}
          method: put
          cors: true

  deleteUser:
    handler: handler.delete_user
    events:
      - http:
          path: /users/{user_id}
          method: delete
          cors: true

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: \${self:provider.environment.USERS_TABLE}
        AttributeDefinitions:
          - AttributeName: user_id
            AttributeType: S
          - AttributeName: email
            AttributeType: S
        KeySchema:
          - AttributeName: user_id
            KeyType: HASH
        GlobalSecondaryIndexes:
          - IndexName: EmailIndex
            KeySchema:
              - AttributeName: email
                KeyType: HASH
            Projection:
              ProjectionType: ALL
            ProvisionedThroughput:
              ReadCapacityUnits: 5
              WriteCapacityUnits: 5
        BillingMode: PROVISIONED
        ProvisionedThroughput:
          ReadCapacityUnits: 5
          WriteCapacityUnits: 5

# handler.py
import json
import os
import uuid
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table_name = os.environ['USERS_TABLE']
table = dynamodb.Table(table_name)

def response(status_code, body):
    """Helper function to create HTTP response"""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True
        },
        'body': json.dumps(body)
    }

def validate_user(data):
    """Validate user data"""
    required_fields = ['name', 'email']
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f"Missing required field: {field}"

    # Basic email validation
    if '@' not in data['email']:
        return False, "Invalid email format"

    return True, None

def create_user(event, context):
    """Create a new user"""
    try:
        data = json.loads(event['body'])

        # Validate input
        is_valid, error_msg = validate_user(data)
        if not is_valid:
            return response(400, {'error': error_msg})

        # Check if email already exists
        existing = table.query(
            IndexName='EmailIndex',
            KeyConditionExpression=Key('email').eq(data['email'])
        )
        if existing['Items']:
            return response(409, {'error': 'Email already exists'})

        # Create user
        user = {
            'user_id': str(uuid.uuid4()),
            'name': data['name'],
            'email': data['email'],
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }

        table.put_item(Item=user)

        return response(201, user)

    except json.JSONDecodeError:
        return response(400, {'error': 'Invalid JSON'})
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        return response(500, {'error': 'Internal server error'})

def get_user(event, context):
    """Get a single user by ID"""
    try:
        user_id = event['pathParameters']['user_id']

        result = table.get_item(Key={'user_id': user_id})

        if 'Item' not in result:
            return response(404, {'error': 'User not found'})

        return response(200, result['Item'])

    except Exception as e:
        print(f"Error getting user: {str(e)}")
        return response(500, {'error': 'Internal server error'})

def list_users(event, context):
    """List all users with pagination"""
    try:
        # Get query parameters
        params = event.get('queryStringParameters') or {}
        limit = int(params.get('limit', 10))
        last_key = params.get('last_key')

        # Build scan parameters
        scan_params = {'Limit': limit}
        if last_key:
            scan_params['ExclusiveStartKey'] = {'user_id': last_key}

        result = table.scan(**scan_params)

        response_body = {
            'users': result['Items'],
            'count': len(result['Items'])
        }

        if 'LastEvaluatedKey' in result:
            response_body['last_key'] = result['LastEvaluatedKey']['user_id']

        return response(200, response_body)

    except Exception as e:
        print(f"Error listing users: {str(e)}")
        return response(500, {'error': 'Internal server error'})

def update_user(event, context):
    """Update an existing user"""
    try:
        user_id = event['pathParameters']['user_id']
        data = json.loads(event['body'])

        # Check if user exists
        existing = table.get_item(Key={'user_id': user_id})
        if 'Item' not in existing:
            return response(404, {'error': 'User not found'})

        # Build update expression
        update_expr = "SET updated_at = :updated_at"
        expr_values = {':updated_at': datetime.utcnow().isoformat()}

        if 'name' in data:
            update_expr += ", #n = :name"
            expr_values[':name'] = data['name']

        if 'email' in data:
            # Check if new email already exists
            email_check = table.query(
                IndexName='EmailIndex',
                KeyConditionExpression=Key('email').eq(data['email'])
            )
            if email_check['Items'] and email_check['Items'][0]['user_id'] != user_id:
                return response(409, {'error': 'Email already exists'})

            update_expr += ", email = :email"
            expr_values[':email'] = data['email']

        # Update user
        result = table.update_item(
            Key={'user_id': user_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames={'#n': 'name'} if 'name' in data else {},
            ExpressionAttributeValues=expr_values,
            ReturnValues='ALL_NEW'
        )

        return response(200, result['Attributes'])

    except json.JSONDecodeError:
        return response(400, {'error': 'Invalid JSON'})
    except Exception as e:
        print(f"Error updating user: {str(e)}")
        return response(500, {'error': 'Internal server error'})

def delete_user(event, context):
    """Delete a user"""
    try:
        user_id = event['pathParameters']['user_id']

        # Check if user exists
        existing = table.get_item(Key={'user_id': user_id})
        if 'Item' not in existing:
            return response(404, {'error': 'User not found'})

        table.delete_item(Key={'user_id': user_id})

        return response(204, {})

    except Exception as e:
        print(f"Error deleting user: {str(e)}")
        return response(500, {'error': 'Internal server error'})

# requirements.txt
# boto3==1.26.137
# botocore==1.29.137`,
    hints: [
      'Use environment variables for table names',
      'Validate input before database operations',
      'Return appropriate HTTP status codes',
      'Use GSI for non-key queries',
      'Implement pagination for list operations'
    ],
    testCases: [
      {
        input: 'POST /users {"name":"John","email":"john@test.com"}',
        expectedOutput: '201 Created with user object',
        isHidden: false,
        description: 'Create a new user'
      },
      {
        input: 'GET /users/USER_ID',
        expectedOutput: '200 OK with user details',
        isHidden: false,
        description: 'Get user by ID'
      },
      {
        input: 'DELETE /users/USER_ID',
        expectedOutput: '204 No Content',
        isHidden: false,
        description: 'Delete a user'
      }
    ],
    language: 'python'
  }
];

export { topic5Exercises };
