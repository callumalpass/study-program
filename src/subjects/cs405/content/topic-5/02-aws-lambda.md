---
id: cs405-t5-aws-lambda
title: "AWS Lambda"
order: 2
---

# AWS Lambda

AWS Lambda is Amazon's Function as a Service (FaaS) platform, running code in response to events without provisioning servers.

## Core Concepts

**Function**: Code that processes events
**Event Source**: Triggers that invoke functions
**Execution Role**: IAM permissions for function
**Runtime**: Language environment (Python, Node.js, Java, Go, etc.)
**Handler**: Entry point method

## Creating Functions

**Python Example**:
```python
import json

def lambda_handler(event, context):
    # event: input data
    # context: runtime information

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'message': 'Success'})
    }
```

**Node.js Example**:
```javascript
exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```

## Context Object

The context parameter provides runtime information about the Lambda invocation:

```python
def lambda_handler(event, context):
    # Request ID for tracking
    request_id = context.aws_request_id

    # Remaining execution time (milliseconds)
    time_remaining = context.get_remaining_time_in_millis()

    # Function details
    function_name = context.function_name
    function_version = context.function_version
    memory_limit = context.memory_limit_in_mb

    # Log group and stream
    log_group = context.log_group_name
    log_stream = context.log_stream_name

    # Invoked function ARN
    invoked_arn = context.invoked_function_arn

    print(f"Function {function_name} has {time_remaining}ms remaining")

    return {'statusCode': 200}
```

**Context Properties**:
- `aws_request_id`: Unique identifier for the invocation
- `log_group_name`: CloudWatch Logs group name
- `log_stream_name`: CloudWatch Logs stream name
- `function_name`: Name of the Lambda function
- `memory_limit_in_mb`: Memory allocated to the function
- `function_version`: Version of the function being executed
- `invoked_function_arn`: ARN used to invoke the function
- `get_remaining_time_in_millis()`: Milliseconds remaining before timeout

## Event Sources

**API Gateway**: HTTP requests trigger functions
**S3**: Object creation/deletion
**DynamoDB Streams**: Database changes
**SNS/SQS**: Message queues
**CloudWatch Events**: Scheduled/custom events
**Kinesis**: Real-time data streams

## Triggers and Permissions

**Setting up Event Sources**:

```python
# S3 Event Handler
def s3_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        print(f"Processing {key} from {bucket}")
```

**IAM Role Configuration**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

**Resource-based Policies**:
```bash
# Grant S3 permission to invoke Lambda
aws lambda add-permission \
  --function-name my-function \
  --statement-id s3-invoke \
  --action lambda:InvokeFunction \
  --principal s3.amazonaws.com \
  --source-arn arn:aws:s3:::my-bucket
```

**Event Source Mapping** (for streams/queues):
```bash
# Create SQS trigger
aws lambda create-event-source-mapping \
  --function-name my-function \
  --event-source-arn arn:aws:sqs:region:account:queue-name \
  --batch-size 10
```

## Configuration

**Memory**: 128 MB to 10,240 MB (CPU scales with memory)
**Timeout**: 1 second to 15 minutes
**Concurrency**: Up to 1,000 concurrent executions (default)
**Environment Variables**: Configuration without code changes

```bash
aws lambda update-function-configuration \
  --function-name my-function \
  --memory-size 512 \
  --timeout 30 \
  --environment Variables={DB_HOST=example.com,API_KEY=secret}
```

## Cold Starts

**Understanding Cold Starts**:
- Occur when Lambda creates new execution environment
- Include: downloading code, starting runtime, initializing code
- Warm start: 1-2ms (reuses existing environment)
- Cold start: 100ms-5s depending on runtime and size

**Cold Start Components**:
1. **Download Code**: Retrieve deployment package from S3
2. **Start Runtime**: Initialize language runtime (JVM, Node.js, etc.)
3. **Initialize Code**: Execute code outside handler (imports, connections)
4. **Execute Handler**: Run actual function code

**Techniques to Reduce Cold Starts**:

```python
# 1. Initialize connections outside handler (reused across invocations)
import boto3

# Initialized once during cold start
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

def lambda_handler(event, context):
    # Reuses existing connection
    response = table.get_item(Key={'id': event['user_id']})
    return response
```

```python
# 2. Minimize package size
# Use Lambda Layers for dependencies
# Remove unnecessary dependencies
# Use lightweight libraries
```

```bash
# 3. Provisioned Concurrency - keep instances warm
aws lambda put-provisioned-concurrency-config \
  --function-name my-function \
  --provisioned-concurrent-executions 5
```

```python
# 4. Keep-warm pattern (ping function periodically)
# CloudWatch Events rule: rate(5 minutes)
def lambda_handler(event, context):
    if event.get('source') == 'keep-warm':
        return {'statusCode': 200, 'body': 'Staying warm'}

    # Normal processing
    return process_request(event)
```

**Best Practices for Cold Starts**:
- Choose interpreted languages (Python, Node.js) over compiled (Java, .NET)
- Minimize dependencies and package size
- Use Lambda SnapStart for Java (snapshot and restore)
- Lazy load heavy resources
- Use Provisioned Concurrency for latency-sensitive applications

## Monitoring with CloudWatch

**Automatic Metrics**:
- Invocations: Number of times function is invoked
- Duration: Execution time in milliseconds
- Errors: Number of invocations that result in errors
- Throttles: Number of throttled invocations
- ConcurrentExecutions: Current concurrent executions
- UnreservedConcurrentExecutions: Concurrent executions available

**Logging**:
```python
import json

def lambda_handler(event, context):
    # Automatic logging to CloudWatch Logs
    print(f"Processing event: {json.dumps(event)}")

    # Structured logging
    import logging
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)

    logger.info("Processing started", extra={
        'user_id': event.get('user_id'),
        'request_id': context.aws_request_id
    })

    return {'statusCode': 200}
```

**Custom Metrics**:
```python
import boto3

cloudwatch = boto3.client('cloudwatch')

def lambda_handler(event, context):
    # Publish custom metric
    cloudwatch.put_metric_data(
        Namespace='MyApp',
        MetricData=[
            {
                'MetricName': 'OrdersProcessed',
                'Value': 1,
                'Unit': 'Count'
            }
        ]
    )
```

**CloudWatch Insights Queries**:
```sql
-- Find slowest invocations
fields @timestamp, @duration, @requestId
| filter @type = "REPORT"
| sort @duration desc
| limit 20

-- Count errors by type
fields @message
| filter @type = "ERROR"
| stats count() by @message
```

**X-Ray Tracing**:
```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all

# Patch all supported libraries
patch_all()

@xray_recorder.capture('process_order')
def process_order(order_id):
    # Traced operation
    return get_order(order_id)

def lambda_handler(event, context):
    return process_order(event['order_id'])
```

## Error Handling

**Try-Catch Pattern**:
```python
import json
import traceback

def lambda_handler(event, context):
    try:
        result = process_event(event)
        return {
            'statusCode': 200,
            'body': json.dumps(result)
        }
    except ValueError as e:
        # Client error
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }
    except Exception as e:
        # Server error - Lambda will retry
        print(f"Error: {str(e)}")
        print(traceback.format_exc())
        raise
```

**Retry Behavior**:
- **Synchronous invocation** (API Gateway): No automatic retry
- **Asynchronous invocation** (S3, SNS): 2 automatic retries
- **Stream-based** (Kinesis, DynamoDB): Retry until data expires or succeeds

**Dead Letter Queues (DLQ)**:
```bash
# Configure DLQ for failed async invocations
aws lambda update-function-configuration \
  --function-name my-function \
  --dead-letter-config TargetArn=arn:aws:sqs:region:account:dlq
```

```python
# Process DLQ messages
def dlq_handler(event, context):
    for record in event['Records']:
        failed_event = json.loads(record['body'])

        # Log failure details
        print(f"Failed event: {failed_event}")

        # Send alert
        send_alert(f"Lambda failure: {failed_event}")
```

**Destination Configuration** (better than DLQ):
```bash
# Configure destinations for async invocations
aws lambda put-function-event-invoke-config \
  --function-name my-function \
  --on-success Destination=arn:aws:sqs:region:account:success-queue \
  --on-failure Destination=arn:aws:sqs:region:account:failure-queue
```

**Circuit Breaker Pattern**:
```python
import time
from functools import wraps

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.opened_at = None

    def call(self, func, *args, **kwargs):
        if self.failure_count >= self.failure_threshold:
            if time.time() - self.opened_at < self.timeout:
                raise Exception("Circuit breaker is OPEN")
            self.failure_count = 0

        try:
            result = func(*args, **kwargs)
            self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            if self.failure_count >= self.failure_threshold:
                self.opened_at = time.time()
            raise

circuit_breaker = CircuitBreaker()

def lambda_handler(event, context):
    return circuit_breaker.call(call_external_api, event)
```

## Layers

Reusable code and dependencies shared across functions.

```bash
# Create layer
zip layer.zip python/lib/python3.9/site-packages/*

aws lambda publish-layer-version \
  --layer-name my-layer \
  --zip-file fileb://layer.zip \
  --compatible-runtimes python3.9
```

## VPC Integration

Access private resources in VPC.

```bash
aws lambda update-function-configuration \
  --function-name my-function \
  --vpc-config SubnetIds=subnet-xxx,SecurityGroupIds=sg-xxx
```

## Best Practices

1. **Minimize cold starts**: Keep functions warm, use provisioned concurrency
2. **Optimize package size**: Smaller packages = faster cold starts
3. **Use environment variables**: Configuration without deployment
4. **Implement error handling**: Retry logic, dead letter queues
5. **Monitor with CloudWatch**: Logs, metrics, alarms
6. **Use IAM least privilege**: Minimal permissions required

## Pricing

**Requests**: $0.20 per 1 million requests
**Duration**: $0.0000166667 per GB-second
**Free Tier**: 1M requests and 400,000 GB-seconds per month

**Example**:
- 128 MB function
- 100 ms execution
- 10M invocations/month
- Cost ≈ $5/month

## Summary

AWS Lambda enables event-driven, scalable applications with minimal operational overhead. Understanding configuration, event sources, and best practices ensures efficient, cost-effective serverless applications. Proper monitoring, error handling, and cold start optimization are critical for production deployments.
