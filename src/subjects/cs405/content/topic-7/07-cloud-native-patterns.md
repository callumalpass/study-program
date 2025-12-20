---
id: cs405-t7-patterns
title: "Cloud-Native Patterns"
order: 7
---

# Cloud-Native Patterns

Cloud-native development relies on established patterns to solve common challenges in distributed systems. These patterns address concerns like resilience, scalability, communication, and state management. Understanding and applying these patterns correctly is essential for building robust cloud-native applications.

## Circuit Breaker Pattern

The circuit breaker pattern prevents cascade failures when a downstream service becomes unhealthy. Like an electrical circuit breaker, it "trips" when failures exceed a threshold, stopping calls to the failing service and returning immediately with an error or fallback response.

```python
import time
from functools import wraps
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Blocking calls
    HALF_OPEN = "half_open"  # Testing recovery

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.state = CircuitState.CLOSED
        self.last_failure_time = None

    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerOpenError("Circuit is open")

        try:
            result = func(*args, **kwargs)
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
                self.failure_count = 0
            return result
        except Exception as e:
            self._handle_failure()
            raise

    def _handle_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN

# Usage
order_service_breaker = CircuitBreaker()
try:
    result = order_service_breaker.call(fetch_orders, user_id)
except CircuitBreakerOpenError:
    result = get_cached_orders(user_id)  # Fallback
```

The circuit breaker has three states: closed (normal operation), open (failing fast), and half-open (testing recovery). This pattern prevents overwhelming already-struggling services and allows them time to recover.

## Saga Pattern

Sagas manage distributed transactions across multiple services. Instead of a single ACID transaction, a saga breaks the operation into a sequence of local transactions, each with a compensating action that can undo its effects if a later step fails.

```
Order Saga:
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Create    │───►│   Reserve   │───►│   Process   │───►│    Ship     │
│   Order     │    │  Inventory  │    │   Payment   │    │   Order     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │                  │
       ▼                  ▼                  ▼                  ▼
  Cancel Order      Release Stock     Refund Payment    Cancel Shipment
  (Compensate)      (Compensate)      (Compensate)      (Compensate)
```

**Orchestration-based Saga:**

```python
class OrderSaga:
    def __init__(self):
        self.steps = []
        self.compensations = []

    def add_step(self, action, compensation):
        self.steps.append(action)
        self.compensations.append(compensation)

    def execute(self, order):
        completed = []
        try:
            for i, step in enumerate(self.steps):
                step(order)
                completed.append(i)
        except Exception as e:
            # Compensate in reverse order
            for i in reversed(completed):
                try:
                    self.compensations[i](order)
                except Exception as comp_error:
                    log.error(f"Compensation failed: {comp_error}")
            raise SagaFailedError(f"Saga failed: {e}")

# Define saga
saga = OrderSaga()
saga.add_step(create_order, cancel_order)
saga.add_step(reserve_inventory, release_inventory)
saga.add_step(process_payment, refund_payment)
saga.add_step(ship_order, cancel_shipment)
```

## Sidecar Pattern

The sidecar pattern deploys helper containers alongside application containers in the same pod. Sidecars handle cross-cutting concerns like logging, monitoring, proxying, and security without modifying the application code.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecars
spec:
  containers:
    # Main application
    - name: app
      image: myapp:latest
      ports:
        - containerPort: 8080
      volumeMounts:
        - name: logs
          mountPath: /var/log/app

    # Logging sidecar
    - name: log-shipper
      image: fluentbit:latest
      volumeMounts:
        - name: logs
          mountPath: /var/log/app
          readOnly: true
      env:
        - name: ELASTICSEARCH_HOST
          value: elasticsearch.logging.svc

    # Metrics sidecar
    - name: metrics-exporter
      image: prometheus-exporter:latest
      ports:
        - containerPort: 9090

  volumes:
    - name: logs
      emptyDir: {}
```

Service mesh proxies (Envoy in Istio) are the most common example of sidecars. They intercept all network traffic, enabling features like mTLS, load balancing, and observability without application changes.

## Strangler Fig Pattern

The strangler fig pattern enables gradual migration from monolith to microservices. Instead of a risky big-bang rewrite, functionality is incrementally extracted to new services while the old system continues operating.

```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                           │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         ▼              ▼              ▼              ▼
    /users         /orders        /products      /payments
         │              │              │              │
         ▼              ▼              ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ User Service │  │Order Service │  │Product Svc   │  │
│   (New)      │  │   (New)      │  │   (New)      │  │
└──────────────┘  └──────────────┘  └──────────────┘  │
                                                       ▼
                                              ┌──────────────┐
                                              │   Monolith   │
                                              │ (Remaining)  │
                                              └──────────────┘
```

The API gateway routes requests to new microservices for migrated functionality and to the monolith for everything else. Over time, the monolith shrinks until it can be decommissioned entirely.

## Event Sourcing

Event sourcing stores all changes as a sequence of immutable events rather than just the current state. The current state is derived by replaying events.

```python
class EventStore:
    def __init__(self):
        self.events = []

    def append(self, event):
        event['timestamp'] = datetime.utcnow().isoformat()
        event['version'] = len(self.events) + 1
        self.events.append(event)

    def get_events(self, aggregate_id):
        return [e for e in self.events if e['aggregate_id'] == aggregate_id]

def rebuild_account(account_id, event_store):
    """Rebuild account state from events."""
    account = {'id': account_id, 'balance': 0}
    for event in event_store.get_events(account_id):
        if event['type'] == 'deposited':
            account['balance'] += event['amount']
        elif event['type'] == 'withdrawn':
            account['balance'] -= event['amount']
    return account
```

Event sourcing provides complete audit trails, enables temporal queries ("what was the state at time X?"), and supports event replay for rebuilding state or debugging.

## Key Takeaways

- Circuit breakers prevent cascade failures by stopping calls to unhealthy services
- Sagas manage distributed transactions through compensating actions for rollback
- Sidecars extend application functionality without modifying application code
- The strangler fig pattern enables safe, incremental migration from monolith to microservices
- Event sourcing provides complete audit trails and enables state reconstruction

## Common Mistakes

- Setting circuit breaker thresholds too sensitively, causing unnecessary service interruptions
- Not implementing compensating actions for all saga steps, leading to inconsistent state
- Overusing sidecars when a library would be simpler and more efficient
- Attempting a complete monolith rewrite instead of incremental migration
- Not handling event ordering and idempotency in event-sourced systems
