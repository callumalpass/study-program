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

## Cost Optimization

**Right-Size Memory**: Higher memory = faster but costlier
**Use Timeouts**: Prevent runaway costs
**Implement Caching**: Reduce redundant executions
**Monitor and Alert**: Track costs proactively

## Security

**Least Privilege IAM**: Minimal permissions required
**Secrets Management**: Use AWS Secrets Manager or Parameter Store
**Encryption**: Enable encryption at rest and in transit
**VPC Integration**: Access private resources securely
**Input Validation**: Validate all inputs
**Dependency Scanning**: Check for vulnerabilities

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

Follow best practices for performance, cost, security, and reliability to build production-ready serverless applications.
