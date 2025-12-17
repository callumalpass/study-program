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

## Event Sources

**API Gateway**: HTTP requests trigger functions
**S3**: Object creation/deletion
**DynamoDB Streams**: Database changes
**SNS/SQS**: Message queues
**CloudWatch Events**: Scheduled/custom events
**Kinesis**: Real-time data streams

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

AWS Lambda enables event-driven, scalable applications with minimal operational overhead. Understanding configuration, event sources, and best practices ensures efficient, cost-effective serverless applications.
