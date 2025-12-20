# Kubernetes Services and Networking

Services provide stable network endpoints for dynamic sets of Pods, enabling service discovery and load balancing. Networking in Kubernetes connects containers, pods, services, and external clients.

## Services

Services abstract access to a logical set of Pods, providing stable DNS names and IP addresses.

### Service Types

**ClusterIP** (Default): Internal cluster access only
```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

**NodePort**: Exposes service on each node's IP at a static port
```yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp
spec:
  type: NodePort
  selector:
    app: webapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
    nodePort: 30080  # 30000-32767 range
```

**LoadBalancer**: Cloud provider load balancer
```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

**ExternalName**: Maps service to DNS name
```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: database.example.com
```

### Endpoints

Services automatically create Endpoints for selected Pods.

```bash
kubectl get endpoints backend
```

### Headless Services

Services without cluster IP for direct pod access (StatefulSets).

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  clusterIP: None  # Headless
  selector:
    app: mysql
  ports:
  - port: 3306
```

## Ingress

HTTP(S) routing to services based on hostnames and paths.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 8080
  tls:
  - hosts:
    - myapp.example.com
    secretName: tls-secret
```

**Ingress Controllers**: nginx, Traefik, HAProxy, AWS ALB, GCP GCLB

## NetworkPolicies

Control traffic between Pods.

**Allow Backend to Database**:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-backend-to-db
spec:
  podSelector:
    matchLabels:
      app: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: backend
    ports:
    - protocol: TCP
      port: 5432
```

**Deny All Ingress**:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

## DNS

Kubernetes provides automatic DNS for services and pods.

**Service DNS**: `<service>.<namespace>.svc.cluster.local`
- Within same namespace: `backend`
- Cross-namespace: `backend.production.svc.cluster.local`

**Pod DNS**: `<pod-ip-with-dashes>.<namespace>.pod.cluster.local`

## Complete Example

```yaml
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
---
# ClusterIP Service
apiVersion: v1
kind: Service
metadata:
  name: nginx-internal
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
  - port: 80
---
# LoadBalancer Service
apiVersion: v1
kind: Service
metadata:
  name: nginx-external
spec:
  type: LoadBalancer
  selector:
    app: nginx
  ports:
  - port: 80
---
# Ingress
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
  - host: nginx.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-internal
            port:
              number: 80
```

## Summary

Services provide stable networking for dynamic Pod sets, while Ingress handles HTTP routing and NetworkPolicies control traffic. Understanding these components enables building secure, accessible applications in Kubernetes.
