# Serverless Databases

Serverless databases scale automatically, charge based on usage, and require no infrastructure management.

## AWS DynamoDB

NoSQL database with auto-scaling and pay-per-request pricing.

```python
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

# Put item
table.put_item(Item={'userId': '123', 'name': 'Alice'})

# Get item
response = table.get_item(Key={'userId': '123'})

# Query
response = table.query(
    KeyConditionExpression=Key('userId').eq('123')
)

# Scan
response = table.scan(
    FilterExpression=Attr('age').gt(18)
)
```

## Aurora Serverless

Auto-scaling relational database (MySQL/PostgreSQL compatible).

**Features**:
- Automatic start/stop based on activity
- Scales capacity based on load
- Charged per second of usage
- Data API for HTTP-based queries

## Firestore (Google)

Document database with real-time sync and offline support.

## CosmosDB (Azure)

Multi-model database with global distribution.

## Summary

Serverless databases eliminate operational overhead while providing automatic scaling, high availability, and pay-per-use pricing.
