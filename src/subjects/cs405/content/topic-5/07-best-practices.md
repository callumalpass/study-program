---
id: cs405-t5-best-practices
title: Serverless Best Practices
order: 7
---

# Serverless Best Practices

## Performance Optimization

**Minimize Cold Starts**:
- Keep functions warm with scheduled invocations
- Use provisioned concurrency for critical functions
- Reduce package size (remove unused dependencies)
- Use compiled languages for better performance

**Optimize Package Size**:
```bash
# Use Lambda layers for dependencies
# Package only required files
# Exclude dev dependencies
```

### Cold Start Mitigation Techniques

Cold starts occur when AWS creates a new execution environment for your Lambda function. Understanding and mitigating cold starts is crucial for performance-sensitive applications.

#### Provisioned Concurrency

Provisioned concurrency keeps function instances initialized and ready to respond immediately.

```python
# CloudFormation/SAM template
Resources:
  MyFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.handler
      Runtime: python3.11
      AutoPublishAlias: live
      ProvisionedConcurrencyConfig:
        ProvisionedConcurrentExecutions: 5

# Or using AWS CLI
aws lambda put-provisioned-concurrency-config \
    --function-name my-function \
    --provisioned-concurrent-executions 5 \
    --qualifier BLUE
```

#### Lambda SnapStart (Java)

SnapStart dramatically reduces cold start times for Java functions by caching initialized snapshots.

```yaml
Resources:
  JavaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: java17
      Handler: com.example.Handler
      SnapStart:
        ApplyOn: PublishedVersions
```

#### Package Optimization Strategies

```python
# Use Lambda Layers for dependencies
# requirements-layer.txt
boto3==1.26.137
requests==2.31.0

# requirements.txt (function-specific)
custom-business-logic==1.0.0

# Deploy layer
zip -r layer.zip python/
aws lambda publish-layer-version \
    --layer-name my-dependencies \
    --zip-file fileb://layer.zip \
    --compatible-runtimes python3.11
```

```javascript
// Use webpack to bundle and tree-shake
// webpack.config.js
module.exports = {
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: true
  },
  externals: {
    'aws-sdk': 'aws-sdk' // Exclude AWS SDK (provided by Lambda)
  }
};
```

#### Runtime Selection Impact

```python
# Cold start comparison (approximate):
# Python: 100-300ms
# Node.js: 100-200ms
# Java: 500-1000ms (without SnapStart)
# Go: 50-100ms
# .NET: 400-800ms

# Choose compiled languages for lowest cold starts
# Example: Go function
package main

import (
    "github.com/aws/aws-lambda-go/lambda"
)

func handler() (string, error) {
    return "Hello from Go!", nil
}

func main() {
    lambda.Start(handler)
}
```

#### Initialize Outside Handler

```python
import boto3
import json

# Initialize outside handler (reused across invocations)
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Products')
s3_client = boto3.client('s3')

# Connection pooling for HTTP requests
import urllib3
http = urllib3.PoolManager(
    maxsize=10,
    block=False
)

def lambda_handler(event, context):
    # Handler only contains business logic
    product_id = event['product_id']

    # Reuse initialized clients
    response = table.get_item(Key={'id': product_id})
    return response['Item']
```

#### Keep Functions Warm

```python
# Scheduled EventBridge rule to keep function warm
Resources:
  WarmerRule:
    Type: AWS::Events::Rule
    Properties:
      ScheduleExpression: rate(5 minutes)
      Targets:
        - Arn: !GetAtt MyFunction.Arn
          Input: '{"warmup": true}'

# Handle warmup requests
def lambda_handler(event, context):
    if event.get('warmup'):
        return {'statusCode': 200, 'body': 'Warmed'}

    # Normal processing
    return process_request(event)
```

## Function Design Patterns

### Single Responsibility Principle

Each function should do one thing well. This improves testability, maintainability, and reusability.

```python
# BAD: Function does too much
def process_order(event, context):
    # Validate order
    if not validate_order(event['order']):
        return {'error': 'Invalid order'}

    # Check inventory
    if not check_inventory(event['order']['items']):
        return {'error': 'Out of stock'}

    # Process payment
    payment_result = process_payment(event['order'])

    # Send notifications
    send_email(event['order']['customer'])
    send_sms(event['order']['customer'])

    # Update analytics
    update_analytics(event['order'])

    return {'success': True}

# GOOD: Separate functions with event-driven coordination
def validate_order(event, context):
    order = event['order']
    if is_valid(order):
        publish_event('OrderValidated', order)
    else:
        publish_event('OrderValidationFailed', order)

def reserve_inventory(event, context):
    order = event['order']
    if has_stock(order['items']):
        reserve_stock(order['items'])
        publish_event('InventoryReserved', order)
    else:
        publish_event('OutOfStock', order)

def process_payment(event, context):
    order = event['order']
    result = charge_customer(order)
    publish_event('PaymentProcessed', {'order': order, 'result': result})
```

### Function Composition

Build complex workflows by composing simple functions using Step Functions.

```yaml
# AWS Step Functions state machine
StateMachine:
  StartAt: ValidateOrder
  States:
    ValidateOrder:
      Type: Task
      Resource: !GetAtt ValidateOrderFunction.Arn
      Next: CheckInventory
      Catch:
        - ErrorEquals: ["ValidationError"]
          Next: NotifyFailure

    CheckInventory:
      Type: Task
      Resource: !GetAtt CheckInventoryFunction.Arn
      Next: ProcessPayment
      Retry:
        - ErrorEquals: ["ServiceException"]
          IntervalSeconds: 2
          MaxAttempts: 3
          BackoffRate: 2.0

    ProcessPayment:
      Type: Task
      Resource: !GetAtt ProcessPaymentFunction.Arn
      Next: SendNotification

    SendNotification:
      Type: Task
      Resource: !GetAtt SendNotificationFunction.Arn
      End: true

    NotifyFailure:
      Type: Task
      Resource: !GetAtt NotifyFailureFunction.Arn
      End: true
```

### Adapter Pattern for Event Sources

Normalize events from different sources using adapter functions.

```python
# Adapter layer
def lambda_handler(event, context):
    # Determine event source and normalize
    if 'Records' in event and event['Records'][0]['eventSource'] == 'aws:s3':
        normalized_event = normalize_s3_event(event)
    elif 'Records' in event and event['Records'][0]['EventSource'] == 'aws:sns':
        normalized_event = normalize_sns_event(event)
    elif 'httpMethod' in event:
        normalized_event = normalize_api_gateway_event(event)
    else:
        normalized_event = event

    # Business logic works with normalized events
    return process_event(normalized_event)

def normalize_s3_event(event):
    record = event['Records'][0]
    return {
        'type': 's3',
        'bucket': record['s3']['bucket']['name'],
        'key': record['s3']['object']['key'],
        'timestamp': record['eventTime']
    }

def normalize_sns_event(event):
    record = event['Records'][0]
    return {
        'type': 'sns',
        'message': json.loads(record['Sns']['Message']),
        'timestamp': record['Sns']['Timestamp']
    }
```

## Cost Optimization

**Right-Size Memory**: Higher memory = faster but costlier
**Use Timeouts**: Prevent runaway costs
**Implement Caching**: Reduce redundant executions
**Monitor and Alert**: Track costs proactively

### Memory and CPU Optimization

Lambda allocates CPU proportional to memory. Finding the right balance is crucial.

```python
# Use AWS Lambda Power Tuning tool
# https://github.com/alexcasalboni/aws-lambda-power-tuning

# Example results:
# 128 MB: 2000ms execution = $0.000000417
# 256 MB: 1000ms execution = $0.000000417 (same cost, faster!)
# 512 MB: 500ms execution = $0.000000417 (same cost, even faster!)
# 1024 MB: 300ms execution = $0.000000500 (slightly more, much faster)

# Monitor with CloudWatch Logs Insights
fields @type, @maxMemoryUsed, @memorySize
| filter @type = "REPORT"
| stats avg(@maxMemoryUsed / 1000 / 1000) as AvgMemoryUsedMB,
        max(@maxMemoryUsed / 1000 / 1000) as MaxMemoryUsedMB,
        avg(@memorySize / 1000 / 1000) as ProvisionedMB
```

### Cost-Effective Architecture Patterns

```python
# Use SQS to batch process and reduce invocations
def lambda_handler(event, context):
    # Process up to 10 messages per invocation
    records = event['Records']  # Batch size configured in trigger

    # Batch operations
    items_to_write = []
    for record in records:
        message = json.loads(record['body'])
        items_to_write.append(transform(message))

    # Single batch write instead of multiple individual writes
    with table.batch_writer() as batch:
        for item in items_to_write:
            batch.put_item(Item=item)

# Configure SQS trigger with batch size
Resources:
  ProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Events:
        SQSEvent:
          Type: SQS
          Properties:
            Queue: !GetAtt MyQueue.Arn
            BatchSize: 10
            MaximumBatchingWindowInSeconds: 5
```

## Security

**Least Privilege IAM**: Minimal permissions required
**Secrets Management**: Use AWS Secrets Manager or Parameter Store
**Encryption**: Enable encryption at rest and in transit
**VPC Integration**: Access private resources securely
**Input Validation**: Validate all inputs
**Dependency Scanning**: Check for vulnerabilities

### Secrets Management Implementation

```python
import boto3
import json
from functools import lru_cache

secrets_client = boto3.client('secretsmanager')
ssm_client = boto3.client('ssm')

# Cache secrets to avoid repeated API calls
@lru_cache(maxsize=128)
def get_secret(secret_name):
    response = secrets_client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])

@lru_cache(maxsize=128)
def get_parameter(parameter_name):
    response = ssm_client.get_parameter(
        Name=parameter_name,
        WithDecryption=True
    )
    return response['Parameter']['Value']

def lambda_handler(event, context):
    # Retrieve database credentials
    db_credentials = get_secret('prod/db/credentials')

    # Retrieve API key
    api_key = get_parameter('/prod/api/key')

    # Use credentials
    conn = connect_to_database(
        host=db_credentials['host'],
        user=db_credentials['username'],
        password=db_credentials['password']
    )
```

### IAM Least Privilege Example

```yaml
# SAM template with minimal permissions
Resources:
  OrderProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Policies:
        # Only specific DynamoDB table access
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable
        # Only specific S3 bucket access
        - S3ReadPolicy:
            BucketName: !Ref OrdersBucket
        # Only publish to specific SNS topic
        - SNSPublishMessagePolicy:
            TopicName: !GetAtt OrdersTopic.TopicName
        # Only specific secrets
        - Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - secretsmanager:GetSecretValue
              Resource: !Sub 'arn:aws:secretsmanager:${AWS::Region}:${AWS::AccountId}:secret:prod/db/*'
```

### Input Validation

```python
import re
from typing import Dict, Any

def validate_order(order: Dict[str, Any]) -> None:
    """Validate order input to prevent injection attacks"""

    # Required fields
    required_fields = ['customer_id', 'items', 'total']
    for field in required_fields:
        if field not in order:
            raise ValueError(f"Missing required field: {field}")

    # Validate customer_id format
    if not re.match(r'^CUST-\d{6}$', order['customer_id']):
        raise ValueError("Invalid customer_id format")

    # Validate items is a list
    if not isinstance(order['items'], list) or len(order['items']) == 0:
        raise ValueError("Items must be a non-empty list")

    # Validate each item
    for item in order['items']:
        if 'sku' not in item or 'quantity' not in item:
            raise ValueError("Each item must have sku and quantity")

        if not isinstance(item['quantity'], int) or item['quantity'] <= 0:
            raise ValueError("Quantity must be a positive integer")

    # Validate total
    if not isinstance(order['total'], (int, float)) or order['total'] <= 0:
        raise ValueError("Total must be a positive number")

def lambda_handler(event, context):
    try:
        order = json.loads(event['body'])
        validate_order(order)
        return process_order(order)
    except ValueError as e:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
```

## Testing Strategies

### Unit Testing

```python
import unittest
from unittest.mock import patch, MagicMock
import json

class TestOrderProcessor(unittest.TestCase):

    @patch('app.dynamodb')
    @patch('app.sns_client')
    def test_process_valid_order(self, mock_sns, mock_dynamodb):
        # Arrange
        mock_table = MagicMock()
        mock_dynamodb.Table.return_value = mock_table

        event = {
            'body': json.dumps({
                'customer_id': 'CUST-123456',
                'items': [{'sku': 'PROD-1', 'quantity': 2}],
                'total': 99.99
            })
        }

        # Act
        from app import lambda_handler
        response = lambda_handler(event, None)

        # Assert
        self.assertEqual(response['statusCode'], 200)
        mock_table.put_item.assert_called_once()
        mock_sns.publish.assert_called()

    def test_invalid_order_format(self):
        event = {
            'body': json.dumps({
                'customer_id': 'INVALID',
                'items': [],
                'total': -10
            })
        }

        from app import lambda_handler
        response = lambda_handler(event, None)

        self.assertEqual(response['statusCode'], 400)
        self.assertIn('error', json.loads(response['body']))
```

### Integration Testing

```python
import boto3
import pytest
import os

@pytest.fixture
def lambda_client():
    return boto3.client('lambda', region_name=os.environ['AWS_REGION'])

@pytest.fixture
def dynamodb_table():
    dynamodb = boto3.resource('dynamodb', region_name=os.environ['AWS_REGION'])
    return dynamodb.Table(os.environ['TABLE_NAME'])

def test_order_processing_integration(lambda_client, dynamodb_table):
    # Invoke Lambda function
    response = lambda_client.invoke(
        FunctionName=os.environ['FUNCTION_NAME'],
        InvocationType='RequestResponse',
        Payload=json.dumps({
            'body': json.dumps({
                'customer_id': 'CUST-999999',
                'items': [{'sku': 'TEST-SKU', 'quantity': 1}],
                'total': 50.00
            })
        })
    )

    # Verify response
    result = json.loads(response['Payload'].read())
    assert result['statusCode'] == 200

    # Verify data in DynamoDB
    order_id = json.loads(result['body'])['order_id']
    item = dynamodb_table.get_item(Key={'order_id': order_id})
    assert item['Item']['customer_id'] == 'CUST-999999'
```

### End-to-End Testing

```python
# Use SAM CLI for local testing
# template.yaml
Resources:
  OrderProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambda_handler
      Environment:
        Variables:
          TABLE_NAME: !Ref OrdersTable

# Test locally
# sam local invoke OrderProcessorFunction -e events/order.json
# sam local start-api  # Test API Gateway integration

# events/order.json
{
  "body": "{\"customer_id\":\"CUST-123456\",\"items\":[{\"sku\":\"PROD-1\",\"quantity\":2}],\"total\":99.99}",
  "httpMethod": "POST",
  "path": "/orders"
}
```

## Deployment Strategies

### Canary Deployments

Gradually roll out changes to minimize risk.

```yaml
Resources:
  OrderProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambda_handler
      AutoPublishAlias: live
      DeploymentPreference:
        Type: Canary10Percent5Minutes  # 10% traffic for 5 minutes
        Alarms:
          - !Ref FunctionErrorAlarm
        Hooks:
          PreTraffic: !Ref PreTrafficHook
          PostTraffic: !Ref PostTrafficHook

  FunctionErrorAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: Lambda function errors
      MetricName: Errors
      Namespace: AWS/Lambda
      Statistic: Sum
      Period: 60
      EvaluationPeriods: 1
      Threshold: 5
      ComparisonOperator: GreaterThanThreshold
```

### Blue-Green Deployments

Switch traffic between two complete environments.

```yaml
# Use Lambda aliases for blue-green
Resources:
  OrderProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambda_handler
      VersionDescription: !Ref DeploymentVersion

  ProductionAlias:
    Type: AWS::Lambda::Alias
    Properties:
      FunctionName: !Ref OrderProcessorFunction
      FunctionVersion: !GetAtt OrderProcessorFunctionVersion.Version
      Name: production
      RoutingConfig:
        AdditionalVersionWeights:
          - FunctionVersion: !Ref PreviousVersion
            FunctionWeight: 0.1  # 10% to previous version
```

## Common Mistakes to Avoid

### 1. Not Handling Timeouts Properly

```python
# BAD: No timeout handling
def lambda_handler(event, context):
    while True:
        process_data()  # Runs until timeout

# GOOD: Check remaining time
def lambda_handler(event, context):
    while context.get_remaining_time_in_millis() > 5000:  # 5s buffer
        if not process_batch():
            break

    return {'processed': True}
```

### 2. Synchronous Calls to Other Functions

```python
# BAD: Synchronous Lambda invocations
lambda_client.invoke(
    FunctionName='ProcessOrder',
    InvocationType='RequestResponse',  # Waits for response
    Payload=json.dumps(data)
)

# GOOD: Use asynchronous invocations or queues
lambda_client.invoke(
    FunctionName='ProcessOrder',
    InvocationType='Event',  # Async
    Payload=json.dumps(data)
)

# BETTER: Use SQS for decoupling
sqs.send_message(
    QueueUrl=queue_url,
    MessageBody=json.dumps(data)
)
```

### 3. Not Using Environment Variables

```python
# BAD: Hardcoded configuration
TABLE_NAME = 'orders-production'
API_KEY = 'abc123xyz'  # Never do this!

# GOOD: Use environment variables
TABLE_NAME = os.environ['TABLE_NAME']
API_KEY = get_secret(os.environ['API_KEY_SECRET_NAME'])
```

### 4. Ignoring Idempotency

```python
# BAD: Can process same event multiple times
def lambda_handler(event, context):
    order_id = event['order_id']
    charge_customer(order_id)  # Charges customer again on retry!

# GOOD: Implement idempotency
def lambda_handler(event, context):
    order_id = event['order_id']

    # Check if already processed
    if is_already_processed(order_id):
        return get_cached_result(order_id)

    # Process and cache result
    result = charge_customer(order_id)
    cache_result(order_id, result)
    return result
```

### 5. Over-Provisioning Memory

```python
# BAD: Using 3008 MB when function only needs 512 MB
# Result: Paying 6x more than necessary

# GOOD: Test and right-size memory
# Use AWS Lambda Power Tuning to find optimal memory
# Monitor MaxMemoryUsed metric in CloudWatch
```

## Reliability

**Idempotency**: Handle duplicate events safely
**Error Handling**: Implement retries and DLQs
**Monitoring**: CloudWatch metrics and logs
**Distributed Tracing**: X-Ray for request tracing
**Health Checks**: Implement synthetic monitoring

## Development Practices

**Infrastructure as Code**: Use SAM, Serverless Framework, or Terraform
**CI/CD**: Automated testing and deployment
**Local Testing**: SAM Local, Serverless Offline
**Logging**: Structured logging with context
**Versioning**: Use Lambda versions and aliases

## Monitoring

**Key Metrics**:
- Invocation count
- Error rate
- Duration
- Throttles
- Concurrent executions
- Cold start rate

**Alerting**:
```yaml
# CloudWatch Alarms
Alarm:
  MetricName: Errors
  Threshold: 10
  EvaluationPeriods: 2
  ComparisonOperator: GreaterThanThreshold
```

## Summary

Follow best practices for performance, cost, security, and reliability to build production-ready serverless applications. Optimize cold starts through provisioned concurrency and package optimization, design functions following single responsibility principle, implement proper security with least privilege IAM and secrets management, and use comprehensive testing strategies from unit to end-to-end tests. Deploy safely with canary or blue-green strategies, and avoid common mistakes like ignoring timeouts, using synchronous calls, and not implementing idempotency.
