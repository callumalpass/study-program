---
id: cs405-t7-microservices
title: "Microservices Architecture"
order: 2
---

# Microservices Architecture

Microservices architecture is a design approach where applications are composed of small, independent services that communicate over well-defined APIs. Unlike monolithic architectures where all functionality resides in a single deployable unit, microservices decompose applications into loosely coupled services that can be developed, deployed, and scaled independently.

## Monolithic vs Microservices

In a monolithic architecture, all components share the same codebase, database, and deployment lifecycle. Changes to any part require rebuilding and redeploying the entire application. While simpler to develop initially, monoliths become increasingly difficult to maintain as they grow.

```
Monolithic Architecture:
┌─────────────────────────────────────────────────────────────┐
│                      Single Application                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Users   │  │  Orders  │  │ Inventory │  │ Payments │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                    │                                          │
│                    ▼                                          │
│               Shared Database                                 │
└─────────────────────────────────────────────────────────────┘

Microservices Architecture:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ User Service │  │ Order Service│  │Inventory Svc │  │ Payment Svc  │
│   ┌────┐     │  │   ┌────┐     │  │   ┌────┐     │  │   ┌────┐     │
│   │ DB │     │  │   │ DB │     │  │   │ DB │     │  │   │ DB │     │
│   └────┘     │  │   └────┘     │  │   └────┘     │  │   └────┘     │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
       │                 │                 │                 │
       └─────────────────┼─────────────────┼─────────────────┘
                         ▼
                    API Gateway
```

Microservices offer independent deployment, allowing teams to update individual services without affecting others. They enable technology diversity, as each service can use the most appropriate programming language, framework, or database. They also allow independent scaling based on actual demand for each service.

## Service Decomposition

Decomposing a monolith into microservices requires identifying service boundaries. Domain-Driven Design (DDD) provides valuable guidance through the concept of bounded contexts—logical boundaries where a particular domain model applies.

**Decomposition Strategies:**

1. **By Business Capability** - Identify distinct business capabilities and create services around them. An e-commerce platform might have catalog management, order processing, payment handling, and shipping coordination as separate services.

2. **By Subdomain** - Using DDD terminology, identify core domains (competitive advantages), supporting domains (necessary but not differentiating), and generic domains (commoditized capabilities).

3. **By Team Ownership** - Following Conway's Law, align service boundaries with team structure. Each team owns one or more services end-to-end.

## Inter-Service Communication

Microservices communicate through well-defined APIs. There are two primary patterns: synchronous and asynchronous communication.

**Synchronous Communication (REST/gRPC):**

```python
# User Service calling Order Service
import requests

def get_user_orders(user_id):
    """Retrieve orders for a user from the Order Service."""
    response = requests.get(
        f"http://order-service/users/{user_id}/orders",
        timeout=5
    )
    if response.status_code == 200:
        return response.json()
    elif response.status_code == 404:
        return []
    else:
        raise ServiceError(f"Order service returned {response.status_code}")
```

**Asynchronous Communication (Message Queues):**

```python
# Publishing an event when order is created
import json
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def publish_order_created(order):
    """Publish order created event for other services."""
    event = {
        'event_type': 'order.created',
        'order_id': order['id'],
        'user_id': order['user_id'],
        'total': order['total'],
        'timestamp': datetime.utcnow().isoformat()
    }
    producer.send('orders', event)
    producer.flush()
```

## Database Per Service Pattern

Each microservice should own its data. The database-per-service pattern prevents tight coupling through shared databases. Services access other services' data only through their APIs, never by querying their databases directly.

This approach enables independent schema evolution—services can change their database schemas without coordinating with other teams. It also allows choosing the best database technology for each service's needs. An order service might use PostgreSQL for transactional data, while a product catalog uses MongoDB for flexible schema, and a session service uses Redis for speed.

## API Gateway Pattern

An API Gateway serves as the single entry point for client requests. It handles cross-cutting concerns like authentication, rate limiting, request routing, and response aggregation.

```yaml
# Kong API Gateway configuration example
services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: users-route
        paths: ["/api/v1/users"]
    plugins:
      - name: rate-limiting
        config:
          minute: 100
      - name: jwt
        config:
          secret_is_base64: false
```

The gateway also enables backend-for-frontend (BFF) patterns, where different gateways serve different clients (mobile, web, partner APIs) with optimized responses.

## Key Takeaways

- Microservices enable independent development, deployment, and scaling of application components
- Use Domain-Driven Design concepts like bounded contexts to identify service boundaries
- Choose synchronous (REST, gRPC) or asynchronous (events, messages) communication based on use case
- Each service should own its database to maintain loose coupling
- API Gateways provide a unified entry point and handle cross-cutting concerns

## Common Mistakes

- Creating services that are too fine-grained ("nanoservices"), increasing operational complexity
- Sharing databases between services, creating hidden coupling
- Not implementing circuit breakers for synchronous calls between services
- Ignoring data consistency challenges in distributed transactions
- Underestimating the operational complexity of managing many services
