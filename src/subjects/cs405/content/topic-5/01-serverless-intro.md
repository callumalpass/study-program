# Introduction to Serverless Computing

Serverless computing allows developers to build and run applications without managing servers. Despite the name, servers still exist, but cloud providers handle all server management, allowing developers to focus purely on code.

## What is Serverless?

**Serverless** is a cloud execution model where:
- Cloud provider manages infrastructure
- Automatic scaling (including to zero)
- Pay-per-use pricing (pay only for execution time)
- Event-driven architecture
- No server provisioning or management

**Key Characteristics**:
- **No server management**: Provider handles patching, scaling, high availability
- **Auto-scaling**: Scales automatically based on demand
- **Pay-per-execution**: Billed only for actual compute time (milliseconds)
- **Event-driven**: Functions triggered by events
- **Stateless**: Each execution is independent

## Serverless vs Traditional

| Aspect | Traditional | Serverless |
|--------|-------------|------------|
| **Infrastructure** | Manual provisioning | Fully managed |
| **Scaling** | Manual/Auto-scaling groups | Automatic, instant |
| **Pricing** | Pay for capacity | Pay per execution |
| **Idle Cost** | Yes (24/7 running) | No (zero when idle) |
| **Management** | OS patching, updates | None |
| **Cold Start** | No | Yes (initial latency) |
| **Execution Time** | Unlimited | Limited (typically 15 min) |

## Serverless Services

**Function as a Service (FaaS)**:
- AWS Lambda
- Azure Functions
- Google Cloud Functions
- IBM Cloud Functions (Apache OpenWhisk)

**Backend as a Service (BaaS)**:
- AWS DynamoDB, S3
- Azure Cosmos DB
- Google Firestore
- Auth0, Firebase Auth

**Event Sources**:
- HTTP requests (API Gateway)
- Database changes (DynamoDB Streams)
- File uploads (S3 events)
- Message queues (SQS, SNS)
- Scheduled events (CloudWatch Events)
- IoT events

## Benefits

**Cost Efficiency**:
- No idle capacity costs
- Granular pricing (100ms billing)
- No upfront infrastructure investment

**Developer Productivity**:
- Focus on business logic
- Faster time to market
- Less operational overhead

**Scalability**:
- Automatic scaling to handle load
- Scales to zero during no traffic
- Handles traffic spikes effortlessly

**Reliability**:
- Built-in high availability
- Automatic failover
- No single points of failure

## Challenges

**Cold Starts**:
- Initial latency when function hasn't run recently
- Can be 100ms-5s depending on runtime
- Mitigations: provisioned concurrency, keep-warm patterns

**Execution Limits**:
- Maximum execution time (AWS Lambda: 15 minutes)
- Memory limits
- Payload size limits

**Vendor Lock-in**:
- Provider-specific APIs and services
- Migration complexity
- Mitigations: use frameworks (Serverless Framework), abstraction layers

**Debugging and Monitoring**:
- Distributed tracing complexity
- Limited local development
- Different debugging approach

**State Management**:
- Functions are stateless
- External state storage required (databases, object storage)

## Use Cases

**Web APIs**: RESTful APIs, GraphQL
**Data Processing**: ETL, real-time stream processing
**Automation**: Scheduled tasks, workflows
**Mobile/IoT Backends**: Authentication, data sync
**Chatbots**: Conversational interfaces
**Image/Video Processing**: Thumbnails, transcoding
**Machine Learning Inference**: Model serving

## Example: AWS Lambda

```python
# handler.py
import json

def lambda_handler(event, context):
    name = event.get('name', 'World')

    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Hello, {name}!'
        })
    }
```

```bash
# Deploy with AWS CLI
zip function.zip handler.py

aws lambda create-function \
  --function-name hello-world \
  --runtime python3.9 \
  --role arn:aws:iam::ACCOUNT:role/lambda-role \
  --handler handler.lambda_handler \
  --zip-file fileb://function.zip

# Invoke function
aws lambda invoke \
  --function-name hello-world \
  --payload '{"name": "Alice"}' \
  response.json
```

## Serverless Frameworks

**Serverless Framework**:
```yaml
# serverless.yml
service: my-service

provider:
  name: aws
  runtime: python3.9

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get
```

**AWS SAM (Serverless Application Model)**:
```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Resources:
  HelloFunction:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.9
      Handler: app.lambda_handler
      Events:
        Api:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Summary

Serverless computing abstracts infrastructure management, enabling rapid development with automatic scaling and pay-per-use pricing. While challenges like cold starts and execution limits exist, benefits often outweigh drawbacks for event-driven, variable-load workloads.
