---
id: cs405-t5-serverless-intro
title: "Introduction to Serverless Computing"
order: 1
---

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
- **Performance Impact**:
  - Node.js/Python: 100-300ms for simple functions
  - Java/.NET: 500ms-3s due to runtime initialization
  - Large dependencies: Can add 1-5s additional latency
  - VPC-enabled functions: Additional 5-10s on first invocation
- **Mitigations**:
  - Provisioned concurrency (keep instances warm)
  - Keep-warm patterns (scheduled pings)
  - Minimize package size and dependencies
  - Use interpreted languages for faster startup
  - Lambda SnapStart for Java (reduces cold start by up to 90%)

**Execution Limits**:
- Maximum execution time (AWS Lambda: 15 minutes)
- Memory limits (AWS: up to 10GB)
- Payload size limits (6MB synchronous, 256KB asynchronous)
- Concurrent execution limits (1,000 default, can request increase)

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

**Web APIs**:
- RESTful APIs serving mobile/web applications
- GraphQL endpoints with dynamic scaling
- Microservices architecture with independent deployment

**Data Processing**:
- ETL pipelines transforming data on upload
- Real-time stream processing from IoT devices
- Log analysis and aggregation
- Data validation and enrichment

**Automation**:
- Scheduled tasks (daily reports, cleanup jobs)
- Workflow orchestration using Step Functions
- Infrastructure automation (backup, scaling)
- CI/CD pipeline automation

**Mobile/IoT Backends**:
- User authentication and authorization
- Real-time data synchronization
- Push notification delivery
- Device management and telemetry

**Chatbots**:
- Conversational interfaces for customer service
- Natural language processing
- Integration with messaging platforms (Slack, Teams)

**Image/Video Processing**:
- Automatic thumbnail generation on upload
- Video transcoding to multiple formats
- Image recognition and tagging
- Watermarking and resizing

**Machine Learning Inference**:
- Model serving with auto-scaling
- Real-time predictions
- A/B testing of models
- Feature extraction pipelines

## Pricing Models

**AWS Lambda**:
- **Requests**: $0.20 per 1M requests
- **Duration**: $0.0000166667 per GB-second
- **Free Tier**: 1M requests + 400,000 GB-seconds/month (perpetual)
- **Provisioned Concurrency**: Additional $0.0000041667 per GB-second
- **Example Cost**: 1M requests, 512MB, 100ms avg = $8.33/month

**Azure Functions**:
- **Consumption Plan**: $0.20 per 1M executions
- **Duration**: $0.000016 per GB-second
- **Free Tier**: 1M requests + 400,000 GB-seconds/month
- **Premium Plan**: Fixed cost starting at $161/month for reserved capacity

**Google Cloud Functions**:
- **Invocations**: $0.40 per 1M invocations
- **Compute Time**: $0.0000025 per GB-second
- **Free Tier**: 2M invocations + 400,000 GB-seconds/month
- **Network Egress**: Additional charges apply

**Cost Comparison Scenario** (10M requests/month, 128MB, 200ms):
- AWS Lambda: ~$41/month
- Azure Functions: ~$41/month
- Google Cloud Functions: ~$44/month

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

Serverless computing abstracts infrastructure management, enabling rapid development with automatic scaling and pay-per-use pricing. While challenges like cold starts and execution limits exist, benefits often outweigh drawbacks for event-driven, variable-load workloads. Understanding pricing models across providers helps optimize costs, while proper architecture patterns mitigate common challenges.
