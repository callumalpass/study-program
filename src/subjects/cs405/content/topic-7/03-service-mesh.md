---
id: cs405-t7-service-mesh
title: "Service Mesh"
order: 3
---

# Service Mesh

A service mesh is a dedicated infrastructure layer that manages service-to-service communication in microservices architectures. It handles complex networking concerns like traffic management, security, and observability without requiring changes to application code. As microservices proliferate, managing communication between them becomes increasingly complex, and service mesh provides a standardized solution.

## The Need for Service Mesh

In a microservices environment, services need to discover each other, route traffic appropriately, handle failures gracefully, encrypt communications, and collect telemetry. Initially, these concerns were implemented in application libraries—every service included retry logic, circuit breakers, and metrics collection code.

This approach led to inconsistencies across services written in different languages, difficulty updating networking logic across hundreds of services, and tight coupling between business logic and infrastructure concerns. Service mesh extracts these cross-cutting concerns into a separate infrastructure layer.

## Service Mesh Architecture

A service mesh consists of two main components: the data plane and the control plane.

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Control Plane                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │
│  │   Config    │  │   Service   │  │  Telemetry  │                   │
│  │    Store    │  │  Discovery  │  │ Aggregation │                   │
│  └─────────────┘  └─────────────┘  └─────────────┘                   │
└──────────────────────────────────────────────────────────────────────┘
                              │ Configuration
                              ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Data Plane                                    │
│  ┌────────────────────┐        ┌────────────────────┐                  │
│  │    Service A       │        │    Service B       │                  │
│  │  ┌──────────────┐  │  HTTP  │  ┌──────────────┐  │                  │
│  │  │   App Code   │◄─┼────────┼─►│   App Code   │  │                  │
│  │  └──────────────┘  │        │  └──────────────┘  │                  │
│  │        │           │        │        │           │                  │
│  │        ▼           │        │        ▼           │                  │
│  │  ┌──────────────┐  │        │  ┌──────────────┐  │                  │
│  │  │  Sidecar     │◄─┼────────┼─►│  Sidecar     │  │                  │
│  │  │  Proxy       │  │  mTLS  │  │  Proxy       │  │                  │
│  │  └──────────────┘  │        │  └──────────────┘  │                  │
│  └────────────────────┘        └────────────────────┘                  │
└────────────────────────────────────────────────────────────────────────┘
```

**Data Plane**: Consists of lightweight proxy sidecars (typically Envoy) deployed alongside each service instance. These proxies intercept all network traffic to and from the service, enforcing policies and collecting telemetry.

**Control Plane**: Provides configuration, service discovery, and certificate management to the data plane proxies. It defines how traffic should be routed, what policies to enforce, and collects aggregated telemetry.

## Istio Service Mesh

Istio is the most widely adopted service mesh. It runs on Kubernetes and uses Envoy as its data plane proxy.

**Installing Istio:**

```bash
# Download and install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install with demo profile
istioctl install --set profile=demo -y

# Enable sidecar injection for default namespace
kubectl label namespace default istio-injection=enabled
```

**Traffic Management with Virtual Services:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews-route
spec:
  hosts:
    - reviews
  http:
    - match:
        - headers:
            end-user:
              exact: jason
      route:
        - destination:
            host: reviews
            subset: v2
    - route:
        - destination:
            host: reviews
            subset: v1
          weight: 90
        - destination:
            host: reviews
            subset: v2
          weight: 10
```

This configuration routes traffic from user "jason" to v2 of the reviews service, while splitting remaining traffic 90/10 between v1 and v2 for canary testing.

## Security with mTLS

Service mesh provides automatic mutual TLS (mTLS) encryption between services. Each sidecar proxy has a cryptographic identity, and all service-to-service communication is encrypted and authenticated.

```yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT  # Require mTLS for all traffic
---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: orders-policy
  namespace: default
spec:
  selector:
    matchLabels:
      app: orders
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/default/sa/frontend"]
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/orders*"]
```

## Resilience Patterns

Service mesh implements resilience patterns at the infrastructure level:

**Circuit Breaker:**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: orders-circuit-breaker
spec:
  host: orders
  trafficPolicy:
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    connectionPool:
      http:
        http1MaxPendingRequests: 100
        http2MaxRequests: 1000
```

This configuration ejects endpoints from the load balancing pool if they return 5 consecutive 5xx errors, and limits concurrent connections to prevent overload.

## Key Takeaways

- Service mesh extracts networking concerns from application code into infrastructure
- The data plane (sidecar proxies) handles traffic; the control plane manages configuration
- Automatic mTLS provides encryption and identity for all service-to-service communication
- Traffic management enables canary deployments, A/B testing, and traffic splitting
- Circuit breakers and connection pooling provide resilience at the infrastructure level

## Common Mistakes

- Deploying service mesh without understanding the latency overhead it adds
- Not configuring resource limits for sidecar proxies, causing node resource exhaustion
- Enabling strict mTLS without considering external services that can't use mTLS
- Overcomplicating routing rules when simpler Kubernetes services would suffice
- Ignoring the learning curve and operational complexity of service mesh
