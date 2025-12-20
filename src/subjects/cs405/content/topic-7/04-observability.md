---
id: cs405-t7-observability
title: "Observability"
order: 4
---

# Observability

Observability is the ability to understand the internal state of a system by examining its external outputs. In cloud-native environments with numerous distributed services, observability becomes essential for understanding system behavior, diagnosing issues, and maintaining reliability. Unlike traditional monitoring which focuses on known failure modes, observability enables exploration of unknown-unknowns through rich telemetry data.

## The Three Pillars of Observability

Observability is built on three complementary pillars: logs, metrics, and traces. Each provides a different perspective on system behavior, and together they enable comprehensive system understanding.

**Logs** are discrete, timestamped records of events. They capture what happened at a specific moment—errors, state changes, and significant events. Structured logging using JSON format makes logs searchable and analyzable.

**Metrics** are numeric measurements aggregated over time. They show trends, patterns, and thresholds—request rates, error percentages, latencies, and resource utilization. Metrics are efficient to store and query.

**Traces** follow individual requests as they flow through distributed systems. They show the complete path of a request, including time spent in each service and the relationships between calls.

## Structured Logging

Effective cloud-native logging requires structured formats that can be parsed, filtered, and analyzed at scale.

```python
import logging
import json
from datetime import datetime

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_record = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': record.levelname,
            'logger': record.name,
            'message': record.getMessage(),
            'module': record.module,
            'function': record.funcName,
            'line': record.lineno
        }
        if hasattr(record, 'request_id'):
            log_record['request_id'] = record.request_id
        if hasattr(record, 'user_id'):
            log_record['user_id'] = record.user_id
        if record.exc_info:
            log_record['exception'] = self.formatException(record.exc_info)
        return json.dumps(log_record)

# Configure logger
handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
logger = logging.getLogger('order-service')
logger.addHandler(handler)
logger.setLevel(logging.INFO)

# Usage with context
logger.info("Order created", extra={
    'request_id': 'abc-123',
    'user_id': 'user-456',
    'order_id': 'order-789'
})
```

Log aggregation platforms like Elasticsearch (ELK Stack), Loki, or cloud services (CloudWatch Logs, Stackdriver) collect logs from all services for centralized querying.

## Metrics with Prometheus

Prometheus is the standard metrics solution for cloud-native environments. It uses a pull-based model where the Prometheus server scrapes metrics endpoints exposed by applications.

```python
from prometheus_client import Counter, Histogram, Gauge, start_http_server
import time

# Define metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request latency',
    ['method', 'endpoint'],
    buckets=[0.01, 0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0]
)

ACTIVE_CONNECTIONS = Gauge(
    'active_connections',
    'Number of active connections'
)

# Instrument application
def handle_request(method, endpoint):
    ACTIVE_CONNECTIONS.inc()
    start_time = time.time()
    try:
        # Process request...
        status = 200
    except Exception:
        status = 500
    finally:
        duration = time.time() - start_time
        REQUEST_COUNT.labels(method=method, endpoint=endpoint, status=status).inc()
        REQUEST_LATENCY.labels(method=method, endpoint=endpoint).observe(duration)
        ACTIVE_CONNECTIONS.dec()

# Start metrics server
start_http_server(8000)  # Prometheus scrapes localhost:8000/metrics
```

**Prometheus Alert Rules:**

```yaml
groups:
  - name: service-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value | humanizePercentage }}"
```

## Distributed Tracing

Distributed tracing tracks requests across service boundaries. Each service adds its span to the trace, creating a complete picture of request flow.

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.instrumentation.requests import RequestsInstrumentor

# Configure tracing
trace.set_tracer_provider(TracerProvider())
jaeger_exporter = JaegerExporter(
    agent_host_name="jaeger",
    agent_port=6831,
)
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(jaeger_exporter)
)

# Auto-instrument HTTP client
RequestsInstrumentor().instrument()

tracer = trace.get_tracer(__name__)

def process_order(order_id):
    with tracer.start_as_current_span("process_order") as span:
        span.set_attribute("order.id", order_id)

        # Call inventory service
        with tracer.start_as_current_span("check_inventory"):
            inventory_status = check_inventory(order_id)

        # Call payment service
        with tracer.start_as_current_span("process_payment"):
            payment_result = process_payment(order_id)

        return {"inventory": inventory_status, "payment": payment_result}
```

Trace context (trace ID, span ID) propagates through HTTP headers, allowing Jaeger or Zipkin to reassemble the complete trace across all services.

## Dashboards and Visualization

Grafana provides dashboards for visualizing metrics and correlating data across pillars. Standard dashboards include:

- **RED metrics**: Rate, Errors, Duration for each service
- **USE metrics**: Utilization, Saturation, Errors for resources
- **Golden signals**: Latency, Traffic, Errors, Saturation

## Key Takeaways

- Observability enables understanding system behavior through logs, metrics, and traces
- Structured JSON logging enables efficient search and analysis at scale
- Prometheus metrics with alerting provide proactive issue detection
- Distributed tracing reveals request flow and latency across services
- Dashboards correlate data from all three pillars for comprehensive visibility

## Common Mistakes

- Logging sensitive data (passwords, PII) that shouldn't be captured
- Creating too many high-cardinality metric labels, causing storage explosion
- Not propagating trace context headers, breaking distributed traces
- Setting alert thresholds too sensitively, causing alert fatigue
- Only implementing observability after problems occur rather than proactively
