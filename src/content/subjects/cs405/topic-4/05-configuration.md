# Kubernetes Configuration and Management

This section covers configuration management, resource quotas, security contexts, and best practices for managing Kubernetes applications.

## Resource Quotas

Limit resource consumption per namespace.

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: development
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    pods: "50"
    services: "10"
    persistentvolumeclaims: "20"
```

## LimitRanges

Set default and maximum resource limits.

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: mem-cpu-limits
  namespace: development
spec:
  limits:
  - max:
      cpu: "2"
      memory: "2Gi"
    min:
      cpu: "100m"
      memory: "128Mi"
    default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "250m"
      memory: "256Mi"
    type: Container
```

## Security Contexts

Define privilege and access control settings.

**Pod-level**:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: security-demo
spec:
  securityContext:
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
  containers:
  - name: app
    image: myapp
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      capabilities:
        drop:
        - ALL
        add:
        - NET_BIND_SERVICE
```

## Pod Security Standards

**Privileged**: Unrestricted
**Baseline**: Minimally restrictive
**Restricted**: Heavily restricted (production recommended)

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

## Service Accounts

Identity for pods to access Kubernetes API.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-sa
  namespace: default
---
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  serviceAccountName: app-sa
  containers:
  - name: app
    image: myapp
```

## RBAC (Role-Based Access Control)

**Role**: Namespace-scoped permissions
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: default
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

**RoleBinding**: Bind role to subjects
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: ServiceAccount
  name: app-sa
  namespace: default
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**ClusterRole**: Cluster-wide permissions
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-reader
rules:
- apiGroups: [""]
  resources: ["nodes", "pods"]
  verbs: ["get", "list"]
```

## Horizontal Pod Autoscaler (HPA)

Automatically scale pods based on metrics.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

**Metrics Server Required**:
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

## Vertical Pod Autoscaler (VPA)

Automatically adjust CPU and memory requests/limits.

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: webapp-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  updatePolicy:
    updateMode: "Auto"
```

## Taints and Tolerations

Control pod placement on nodes.

**Taint node**:
```bash
kubectl taint nodes node1 key=value:NoSchedule
kubectl taint nodes node1 gpu=true:NoSchedule
```

**Tolerate taint**:
```yaml
spec:
  tolerations:
  - key: "gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
```

## Node Affinity

Constrain pods to nodes with labels.

```yaml
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: zone
            operator: In
            values:
            - us-west-1a
```

## Pod Affinity and Anti-Affinity

**Affinity**: Schedule pods together
```yaml
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: app
            operator: In
            values:
            - cache
        topologyKey: kubernetes.io/hostname
```

**Anti-Affinity**: Separate pods
```yaml
spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: app
            operator: In
            values:
            - webapp
        topologyKey: kubernetes.io/hostname
```

## Health Probes

**Liveness Probe**: Restart unhealthy containers
```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3
```

**Readiness Probe**: Remove from service when not ready
```yaml
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

**Startup Probe**: For slow-starting applications
```yaml
startupProbe:
  httpGet:
    path: /startup
    port: 8080
  failureThreshold: 30
  periodSeconds: 10
```

## Summary

Kubernetes configuration management includes resource quotas, security contexts, RBAC, autoscaling, and advanced scheduling. These features enable secure, efficient, and reliable application deployment.
