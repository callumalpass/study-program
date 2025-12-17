# Event-Driven Serverless

Event-driven architectures use events to trigger and communicate between decoupled services.

## Event Sources

**S3**: Object created/deleted/modified
**DynamoDB**: Stream of table changes
**SNS**: Pub/sub messaging
**SQS**: Queue-based messaging
**Kinesis**: Real-time data streams
**EventBridge**: Custom events and scheduling
**API Gateway**: HTTP requests

## Patterns

**Fan-Out**: One event triggers multiple functions
**Fan-In**: Multiple events aggregate to one function
**Pipeline**: Chain of processing steps
**Event Sourcing**: Store events as source of truth
**CQRS**: Separate read and write models

## Example: Order Processing

```python
# Event: OrderCreated
def on_order_created(event, context):
    order = parse_event(event)

    # Publish domain events
    sns.publish(Topic='inventory-reserve', Message=order)
    sns.publish(Topic='payment-process', Message=order)
    sns.publish(Topic='notification-send', Message=order)
```

## Summary

Event-driven serverless enables loose coupling, scalability, and resilience through asynchronous event processing.
