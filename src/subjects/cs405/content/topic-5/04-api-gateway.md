---
id: cs405-t5-api-gateway
title: "API Gateway and Serverless APIs"
order: 4
---

# API Gateway and Serverless APIs

API Gateway provides managed HTTP endpoints for serverless functions, handling routing, authentication, rate limiting, and more.

## AWS API Gateway

**REST API**: Traditional RESTful API with full features
**HTTP API**: Simplified, lower cost (70% cheaper)
**WebSocket API**: Bi-directional communication

## REST API vs HTTP API

**Comparison Table**:

| Feature | REST API | HTTP API |
|---------|----------|----------|
| **Pricing** | $3.50 per million requests | $1.00 per million requests |
| **Latency** | ~100ms | ~50ms (optimized) |
| **Authorization** | IAM, Cognito, Lambda, API Keys | IAM, Cognito, Lambda (JWT) |
| **Caching** | Yes (with TTL control) | No |
| **Request Validation** | Yes (JSON Schema) | No |
| **WAF Integration** | Yes | No |
| **API Keys** | Yes | No |
| **Usage Plans** | Yes (throttling, quotas) | No |
| **CORS** | Manual configuration | Automatic configuration |
| **Private APIs** | Yes (VPC endpoints) | No |
| **Regional Deployment** | Edge-optimized, Regional, Private | Regional only |

**When to Use REST API**:
- Need API keys for partner integrations
- Require response caching
- Need request/response validation
- Want usage plans with quotas
- Require AWS WAF protection
- Need private API in VPC

**When to Use HTTP API**:
- Simple proxy to Lambda/HTTP backends
- Cost optimization is priority
- Low latency requirements
- JWT-based authentication sufficient
- Don't need advanced features

**Example Configuration**:
```yaml
# REST API - Serverless Framework
functions:
  getUser:
    handler: users.get
    events:
      - http:
          path: /users/{id}
          method: get
          request:
            parameters:
              paths:
                id: true
          authorizer:
            name: authorizer
            arn: arn:aws:cognito-idp:region:account:userpool/id

# HTTP API - Serverless Framework
functions:
  getUser:
    handler: users.get
    events:
      - httpApi:
          path: /users/{id}
          method: get
          authorizer:
            name: jwtAuthorizer
            identitySource: $request.header.Authorization
            issuerUrl: https://cognito-idp.region.amazonaws.com/pool-id
            audience:
              - client-id
```

## Creating APIs

**Integration with Lambda**:
```yaml
# serverless.yml
functions:
  getUser:
    handler: users.get
    events:
      - http:
          path: /users/{id}
          method: get
          cors: true
          authorizer: aws_iam

  createUser:
    handler: users.create
    events:
      - http:
          path: /users
          method: post
```

**Lambda Proxy Integration**:
```python
def lambda_handler(event, context):
    # Access HTTP details
    http_method = event['httpMethod']
    path = event['path']
    query_params = event['queryStringParameters']
    headers = event['headers']
    body = json.loads(event['body']) if event['body'] else {}

    # Return HTTP response
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': 'Success',
            'user_id': path.split('/')[-1]
        })
    }
```

## Request/Response Transformation

API Gateway can transform requests/responses using VTL (Velocity Template Language):

**Request Mapping Template**:
```velocity
## Transform query parameters to body
{
  "user_id": "$input.params('id')",
  "action": "get_user",
  "timestamp": "$context.requestTime",
  "source_ip": "$context.identity.sourceIp"
}
```

**Response Mapping Template**:
```velocity
## Transform DynamoDB response
#set($inputRoot = $input.path('$'))
{
  "user": {
    "id": "$inputRoot.Item.userId.S",
    "name": "$inputRoot.Item.name.S",
    "email": "$inputRoot.Item.email.S"
  },
  "metadata": {
    "timestamp": "$context.requestTime",
    "request_id": "$context.requestId"
  }
}
```

**Using AWS Console Configuration**:
```json
// Integration Request - Mapping Template
{
  "body": $input.json('$'),
  "headers": {
    #foreach($header in $input.params().header.keySet())
    "$header": "$util.escapeJavaScript($input.params().header.get($header))" #if($foreach.hasNext),#end
    #end
  },
  "method": "$context.httpMethod",
  "params": {
    #foreach($param in $input.params().path.keySet())
    "$param": "$util.escapeJavaScript($input.params().path.get($param))" #if($foreach.hasNext),#end
    #end
  },
  "query": {
    #foreach($queryParam in $input.params().querystring.keySet())
    "$queryParam": "$util.escapeJavaScript($input.params().querystring.get($queryParam))" #if($foreach.hasNext),#end
    #end
  }
}
```

**Common Transformations**:
```python
# Lambda function that works with transformed request
def handler(event, context):
    # event now contains transformed structure
    user_id = event['params']['id']
    source_ip = event.get('source_ip')

    return {
        'statusCode': 200,
        'user': get_user(user_id),
        'request_ip': source_ip
    }
```

## Rate Limiting and Throttling

**Usage Plans**:
```bash
# Create usage plan
aws apigateway create-usage-plan \
  --name "Basic Plan" \
  --throttle burstLimit=100,rateLimit=50 \
  --quota limit=10000,period=MONTH

# Associate API stage
aws apigateway create-usage-plan-key \
  --usage-plan-id plan-id \
  --key-type API_KEY \
  --key-id key-id
```

**Throttling Configuration**:
```yaml
# serverless.yml
provider:
  name: aws
  apiGateway:
    # Account-level settings
    throttle:
      burstLimit: 5000
      rateLimit: 2000

functions:
  getUser:
    handler: users.get
    # Function-level throttling
    throttle:
      burstLimit: 100
      rateLimit: 50
    events:
      - http:
          path: /users/{id}
          method: get
```

**Rate Limit Headers**:
```python
def lambda_handler(event, context):
    # API Gateway includes rate limit info in context
    print(f"Request ID: {event['requestContext']['requestId']}")

    return {
        'statusCode': 200,
        'headers': {
            'X-RateLimit-Limit': '100',
            'X-RateLimit-Remaining': '95',
            'X-RateLimit-Reset': '1640000000'
        },
        'body': json.dumps({'message': 'Success'})
    }
```

**429 Too Many Requests Response**:
```python
# Custom rate limiting logic
import time
from functools import wraps

rate_limits = {}

def rate_limit(max_requests=100, window=60):
    def decorator(func):
        @wraps(func)
        def wrapper(event, context):
            client_id = event['requestContext']['identity']['sourceIp']
            current_time = time.time()

            if client_id not in rate_limits:
                rate_limits[client_id] = []

            # Remove old requests outside window
            rate_limits[client_id] = [
                req_time for req_time in rate_limits[client_id]
                if current_time - req_time < window
            ]

            if len(rate_limits[client_id]) >= max_requests:
                return {
                    'statusCode': 429,
                    'body': json.dumps({'error': 'Rate limit exceeded'})
                }

            rate_limits[client_id].append(current_time)
            return func(event, context)

        return wrapper
    return decorator

@rate_limit(max_requests=10, window=60)
def lambda_handler(event, context):
    return {'statusCode': 200, 'body': 'Success'}
```

## Authentication Methods

### IAM Authentication

**Client Request**:
```python
import boto3
from botocore.auth import SigV4Auth
from botocore.awsrequest import AWSRequest
import requests

# Sign request with AWS credentials
session = boto3.Session()
credentials = session.get_credentials()

url = 'https://api-id.execute-api.region.amazonaws.com/prod/users'
request = AWSRequest(method='GET', url=url)

SigV4Auth(credentials, 'execute-api', 'us-east-1').add_auth(request)

response = requests.get(url, headers=dict(request.headers))
```

**IAM Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:region:account:api-id/stage/method/path"
    }
  ]
}
```

### Cognito User Pools

**Configuration**:
```yaml
functions:
  getUser:
    handler: users.get
    events:
      - http:
          path: /users/{id}
          method: get
          authorizer:
            name: CognitoAuthorizer
            type: COGNITO_USER_POOLS
            arn: arn:aws:cognito-idp:region:account:userpool/pool-id
            claims:
              - email
              - sub
```

**Lambda Access to Claims**:
```python
def lambda_handler(event, context):
    # Access Cognito user claims
    claims = event['requestContext']['authorizer']['claims']

    user_email = claims['email']
    user_sub = claims['sub']
    username = claims['cognito:username']

    print(f"Request from {username} ({user_email})")

    return {
        'statusCode': 200,
        'body': json.dumps({'user_id': user_sub})
    }
```

### Custom Lambda Authorizers

**Token-based Authorizer**:
```python
import jwt
import os

def lambda_authorizer(event, context):
    token = event['authorizationToken']  # "Bearer <token>"

    try:
        # Validate JWT token
        decoded = jwt.decode(
            token.replace('Bearer ', ''),
            os.environ['JWT_SECRET'],
            algorithms=['HS256']
        )

        # Generate IAM policy
        return generate_policy(
            decoded['user_id'],
            'Allow',
            event['methodArn'],
            context={
                'user_id': decoded['user_id'],
                'role': decoded['role']
            }
        )

    except jwt.InvalidTokenError:
        return generate_policy('user', 'Deny', event['methodArn'])

def generate_policy(principal_id, effect, resource, context=None):
    policy = {
        'principalId': principal_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource
                }
            ]
        }
    }

    if context:
        policy['context'] = context

    return policy
```

**Request-based Authorizer**:
```python
def lambda_authorizer(event, context):
    # Access to full request
    headers = event['headers']
    query_params = event['queryStringParameters']
    request_context = event['requestContext']

    api_key = headers.get('X-API-Key')

    # Validate API key
    if validate_api_key(api_key):
        return generate_policy('user', 'Allow', event['methodArn'], {
            'api_key': api_key,
            'tier': get_tier(api_key)
        })

    return generate_policy('user', 'Deny', event['methodArn'])
```

**Using Authorizer Context**:
```python
# Main Lambda function
def lambda_handler(event, context):
    # Access authorizer context
    authorizer = event['requestContext']['authorizer']

    user_id = authorizer['user_id']
    role = authorizer['role']

    # Use in business logic
    if role == 'admin':
        return get_all_users()
    else:
        return get_user(user_id)
```

## Caching

**Enable Caching**:
```yaml
provider:
  apiGateway:
    caching:
      enabled: true
      ttlInSeconds: 300  # 5 minutes
      dataEncrypted: true
      cacheKeyParameters:
        - name: request.path.id
        - name: request.querystring.filter
```

**Cache Configuration per Endpoint**:
```bash
aws apigateway update-method \
  --rest-api-id api-id \
  --resource-id resource-id \
  --http-method GET \
  --patch-operations \
    op=replace,path=/caching/enabled,value=true \
    op=replace,path=/caching/ttlInSeconds,value=300
```

**Cache Invalidation**:
```python
# Require "Cache-Control: max-age=0" header to bypass cache
def lambda_handler(event, context):
    # Update user
    update_user(user_id, data)

    return {
        'statusCode': 200,
        'headers': {
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        'body': json.dumps({'message': 'User updated'})
    }
```

**Per-Key Caching**:
```yaml
functions:
  getUser:
    handler: users.get
    events:
      - http:
          path: /users/{id}
          method: get
          caching:
            enabled: true
            ttlInSeconds: 300
            cacheKeyParameters:
              - name: request.path.id
```

## Features

**Request Validation**: Schema validation before Lambda invocation
**Response Transformation**: Map response formats
**Rate Limiting**: Throttle requests per client
**Caching**: Cache responses to reduce load
**Authentication**: IAM, Cognito, Lambda authorizers
**CORS**: Cross-origin resource sharing
**API Keys**: Simple API key management

## WebSocket APIs

Real-time bidirectional communication for chat, gaming, live updates:

**WebSocket Configuration**:
```yaml
functions:
  connectionHandler:
    handler: websocket.connect
    events:
      - websocket:
          route: $connect
          authorizer:
            name: auth
            identitySource:
              - route.request.querystring.token

  disconnectionHandler:
    handler: websocket.disconnect
    events:
      - websocket:
          route: $disconnect

  messageHandler:
    handler: websocket.message
    events:
      - websocket:
          route: sendMessage

  defaultHandler:
    handler: websocket.default
    events:
      - websocket:
          route: $default
```

**Connection Handler**:
```python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('WebSocketConnections')

def connect(event, context):
    connection_id = event['requestContext']['connectionId']

    # Store connection
    table.put_item(Item={
        'connectionId': connection_id,
        'timestamp': str(datetime.now())
    })

    return {'statusCode': 200, 'body': 'Connected'}

def disconnect(event, context):
    connection_id = event['requestContext']['connectionId']

    # Remove connection
    table.delete_item(Key={'connectionId': connection_id})

    return {'statusCode': 200, 'body': 'Disconnected'}
```

**Sending Messages**:
```python
def send_message(event, context):
    connection_id = event['requestContext']['connectionId']
    domain = event['requestContext']['domainName']
    stage = event['requestContext']['stage']

    # Parse message
    body = json.loads(event['body'])
    message = body['message']

    # Get all connections
    response = table.scan()
    connections = response['Items']

    # Send to all connections
    apigw_client = boto3.client(
        'apigatewaymanagementapi',
        endpoint_url=f'https://{domain}/{stage}'
    )

    for connection in connections:
        try:
            apigw_client.post_to_connection(
                ConnectionId=connection['connectionId'],
                Data=json.dumps({'message': message})
            )
        except apigw_client.exceptions.GoneException:
            # Connection no longer exists
            table.delete_item(Key={'connectionId': connection['connectionId']})

    return {'statusCode': 200, 'body': 'Message sent'}
```

**Client Connection**:
```javascript
// Browser WebSocket client
const ws = new WebSocket('wss://api-id.execute-api.region.amazonaws.com/prod?token=auth-token');

ws.onopen = () => {
    console.log('Connected');
    ws.send(JSON.stringify({
        action: 'sendMessage',
        message: 'Hello, world!'
    }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data.message);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected');
};
```

## Summary

API Gateway provides enterprise-grade API management for serverless applications with minimal configuration and operational overhead. Choose REST API for full features (caching, validation, WAF), or HTTP API for cost optimization and simplicity. Advanced features like custom authorizers, request transformation, rate limiting, and WebSocket support enable building complex, production-ready APIs. Proper authentication, caching strategies, and throttling ensure secure, performant, and cost-effective serverless APIs.
