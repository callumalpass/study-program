# API Gateway and Serverless APIs

API Gateway provides managed HTTP endpoints for serverless functions, handling routing, authentication, rate limiting, and more.

## AWS API Gateway

**REST API**: Traditional RESTful API with full features
**HTTP API**: Simplified, lower cost (70% cheaper)
**WebSocket API**: Bi-directional communication

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

## Features

**Request Validation**: Schema validation before Lambda invocation
**Response Transformation**: Map response formats
**Rate Limiting**: Throttle requests per client
**Caching**: Cache responses to reduce load
**Authentication**: IAM, Cognito, Lambda authorizers
**CORS**: Cross-origin resource sharing
**API Keys**: Simple API key management

## Custom Authorizers

```python
def lambda_authorizer(event, context):
    token = event['authorizationToken']

    if validate_token(token):
        return generate_policy('user', 'Allow', event['methodArn'])
    return generate_policy('user', 'Deny', event['methodArn'])
```

## Summary

API Gateway provides enterprise-grade API management for serverless applications with minimal configuration and operational overhead.
