# Serverless Architectures

Serverless architectures combine FaaS, managed services, and event-driven patterns to build scalable, cost-effective applications without managing infrastructure.

## Common Patterns

### API Backend

```mermaid
graph LR
    CLIENT[Client] --> APIGW[API Gateway]
    APIGW --> LAMBDA[Lambda Functions]
    LAMBDA --> DB[(DynamoDB)]
    LAMBDA --> S3[(S3)]
```

**Implementation**:
- API Gateway for HTTP routing
- Lambda functions for business logic
- DynamoDB for data storage
- S3 for static assets

### Event-Driven Processing

```mermaid
graph TD
    S3[S3 Upload] --> LAMBDA1[Process Image]
    LAMBDA1 --> LAMBDA2[Generate Thumbnail]
    LAMBDA1 --> LAMBDA3[Extract Metadata]
    LAMBDA2 --> S3OUT[S3 Output]
    LAMBDA3 --> DB[(Database)]
```

### Stream Processing

```mermaid
graph LR
    KINESIS[Kinesis Stream] --> LAMBDA[Lambda Processor]
    LAMBDA --> ES[(Elasticsearch)]
    LAMBDA --> S3[(S3)]
```

## Microservices Architecture

Each microservice as independent Lambda functions:

```yaml
# Serverless Framework
service: ecommerce

functions:
  createOrder:
    handler: orders.create
    events:
      - http:
          path: /orders
          method: post

  getOrder:
    handler: orders.get
    events:
      - http:
          path: /orders/{id}
          method: get

  processPayment:
    handler: payments.process
    events:
      - sns: order-created

  sendNotification:
    handler: notifications.send
    events:
      - sqs: payment-completed
```

## Async Processing

**Queue-Based**:
```python
# Producer (API)
import boto3

sqs = boto3.client('sqs')

def handler(event, context):
    sqs.send_message(
        QueueUrl='https://sqs.region.amazonaws.com/account/queue',
        MessageBody=json.dumps({'order_id': order_id})
    )
    return {'statusCode': 202, 'body': 'Processing'}
```

```python
# Consumer (Worker)
def handler(event, context):
    for record in event['Records']:
        message = json.loads(record['body'])
        # Process order
        process_order(message['order_id'])
```

## CQRS Pattern

Separate read and write operations:

```python
# Command (Write)
def create_order(event, context):
    order = validate_order(event)
    dynamodb.put_item(Table='Orders', Item=order)
    sns.publish(Topic='order-created', Message=order)

# Query (Read)
def get_orders(event, context):
    # Read from optimized read model
    return elasticsearch.search(index='orders')
```

## Fan-Out Pattern

Single event triggers multiple functions:

```python
# Publisher
sns.publish(
    TopicArn='arn:aws:sns:region:account:new-user',
    Message=json.dumps(user_data)
)

# Subscribers (multiple Lambdas)
# - SendWelcomeEmail
# - CreateUserProfile
# - SendToAnalytics
# - UpdateCRM
```

## Saga Pattern

Distributed transactions across services:

```python
# Order saga orchestrator
def create_order_saga(event, context):
    try:
        # Reserve inventory
        inventory_response = lambda_client.invoke(
            FunctionName='reserve-inventory',
            Payload=json.dumps(order)
        )

        # Process payment
        payment_response = lambda_client.invoke(
            FunctionName='process-payment',
            Payload=json.dumps(order)
        )

        # Confirm order
        confirm_order(order)

    except Exception as e:
        # Compensation: rollback
        compensate_inventory(order)
        compensate_payment(order)
        raise
```

## Best Practices

**1. Idempotency**: Handle duplicate events
```python
def handler(event, context):
    request_id = event['request_id']

    # Check if already processed
    if dynamodb.get_item(Key={'id': request_id}):
        return {'statusCode': 200, 'body': 'Already processed'}

    # Process and store
    result = process(event)
    dynamodb.put_item(Item={'id': request_id, 'result': result})
    return result
```

**2. Circuit Breaker**: Fail fast on errors
```python
from circuitbreaker import circuit

@circuit(failure_threshold=5, recovery_timeout=60)
def call_external_api():
    response = requests.get('https://api.example.com')
    return response.json()
```

**3. Dead Letter Queues**: Handle failures
```yaml
functions:
  processor:
    handler: handler.process
    events:
      - sqs:
          arn: arn:aws:sqs:region:account:main-queue
    onError: arn:aws:sqs:region:account:dlq
```

**4. Retry Logic**: Exponential backoff
```python
import time
from functools import wraps

def retry(max_attempts=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    time.sleep(delay * (2 ** attempt))
        return wrapper
    return decorator
```

## Complete Example: Image Processing Service

```python
# 1. Upload Handler
def upload_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']

        # Trigger processing
        sns.publish(
            TopicArn='image-uploaded',
            Message=json.dumps({'bucket': bucket, 'key': key})
        )
```

```python
# 2. Thumbnail Generator
import boto3
from PIL import Image
import io

def generate_thumbnail(event, context):
    message = json.loads(event['Records'][0]['Sns']['Message'])

    # Download image
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket=message['bucket'], Key=message['key'])
    img = Image.open(io.BytesIO(obj['Body'].read()))

    # Generate thumbnail
    img.thumbnail((200, 200))

    # Upload thumbnail
    buffer = io.BytesIO()
    img.save(buffer, 'JPEG')
    buffer.seek(0)

    s3.put_object(
        Bucket=message['bucket'],
        Key=f"thumbnails/{message['key']}",
        Body=buffer
    )
```

```python
# 3. Metadata Extractor
def extract_metadata(event, context):
    message = json.loads(event['Records'][0]['Sns']['Message'])

    # Extract EXIF data
    metadata = extract_exif(message['bucket'], message['key'])

    # Store in DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ImageMetadata')
    table.put_item(Item={
        'image_id': message['key'],
        'metadata': metadata,
        'timestamp': str(datetime.now())
    })
```

```yaml
# serverless.yml
service: image-processor

functions:
  uploadHandler:
    handler: upload.handler
    events:
      - s3:
          bucket: images
          event: s3:ObjectCreated:*

  thumbnailGenerator:
    handler: thumbnail.handler
    events:
      - sns: image-uploaded

  metadataExtractor:
    handler: metadata.handler
    events:
      - sns: image-uploaded

resources:
  Resources:
    ImageMetadataTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ImageMetadata
        AttributeDefinitions:
          - AttributeName: image_id
            AttributeType: S
        KeySchema:
          - AttributeName: image_id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
```

## Summary

Serverless architectures leverage FaaS and managed services to build scalable, event-driven systems. Key patterns include API backends, event processing, CQRS, fan-out, and sagas. Best practices ensure reliability through idempotency, circuit breakers, retries, and proper error handling.
