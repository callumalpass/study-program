---
id: cs405-t7-security
title: "Cloud-Native Security"
order: 6
---

# Cloud-Native Security

Security in cloud-native environments requires a fundamentally different approach than traditional perimeter-based security. With microservices, containers, and dynamic infrastructure, the attack surface expands and traditional network boundaries dissolve. Cloud-native security must be integrated throughout the development lifecycle, automated, and designed for the ephemeral nature of containerized workloads.

## The Shared Responsibility Model

In cloud environments, security responsibility is shared between the cloud provider and the customer. The exact division depends on the service model used.

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Customer Responsibility                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐ │
│  │  IaaS          │  │  PaaS          │  │  SaaS                  │ │
│  │  - Data        │  │  - Data        │  │  - Data                │ │
│  │  - Apps        │  │  - Apps        │  │  - User access         │ │
│  │  - OS          │  │                │  │                        │ │
│  │  - Network     │  │                │  │                        │ │
│  │  - Runtime     │  │                │  │                        │ │
│  └────────────────┘  └────────────────┘  └────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────┐
│                        Provider Responsibility                         │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐ │
│  │  IaaS          │  │  PaaS          │  │  SaaS                  │ │
│  │  - Compute     │  │  - Compute     │  │  - Compute             │ │
│  │  - Storage     │  │  - Storage     │  │  - Storage             │ │
│  │  - Network HW  │  │  - Network     │  │  - Network             │ │
│  │                │  │  - OS          │  │  - OS                  │ │
│  │                │  │  - Runtime     │  │  - Runtime             │ │
│  │                │  │                │  │  - Apps                │ │
│  └────────────────┘  └────────────────┘  └────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

Understanding this model is crucial. The cloud provider secures the infrastructure, but customers are responsible for securing what they build on it—data, applications, access controls, and configurations.

## Container Security

Container security starts with the image and extends through the entire lifecycle.

**Image Scanning** - Scan images for known vulnerabilities before deployment:

```yaml
# GitHub Actions with Trivy scanner
name: Container Security Scan
on:
  push:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          format: 'table'
          exit-code: '1'
          severity: 'CRITICAL,HIGH'
```

**Minimal Base Images** - Use distroless or scratch images to reduce attack surface:

```dockerfile
# Multi-stage build with distroless
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server

FROM gcr.io/distroless/static:nonroot
COPY --from=builder /app/server /server
USER nonroot:nonroot
ENTRYPOINT ["/server"]
```

**Pod Security Standards** - Kubernetes provides pod security standards to restrict container capabilities:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: myapp:latest
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop:
            - ALL
```

## Secrets Management

Secrets (passwords, API keys, certificates) require special handling. Never store secrets in code, environment variables in deployment configs, or container images.

```yaml
# Kubernetes External Secrets with AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: ClusterSecretStore
  target:
    name: db-secret
    creationPolicy: Owner
  data:
    - secretKey: username
      remoteRef:
        key: production/database
        property: username
    - secretKey: password
      remoteRef:
        key: production/database
        property: password
```

External secret managers (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) provide encryption, rotation, and access auditing.

## Network Policies

Kubernetes Network Policies implement zero-trust networking by controlling traffic between pods:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
        - namespaceSelector:
            matchLabels:
              name: monitoring
      ports:
        - port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - port: 5432
```

This policy allows the API to receive traffic only from the frontend and monitoring namespace, and can only connect to the database on port 5432. All other traffic is denied by default.

## Identity and Access Management

Cloud-native applications should use workload identity instead of long-lived credentials. In Kubernetes, this means using service accounts with cloud provider IAM integration.

```yaml
# AWS IRSA (IAM Roles for Service Accounts)
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/app-role
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      serviceAccountName: app-service-account
      containers:
        - name: app
          image: myapp:latest
```

The pod automatically receives temporary AWS credentials with permissions defined by the IAM role, eliminating the need for static credentials.

## Key Takeaways

- The shared responsibility model defines who secures what in cloud environments
- Container security requires image scanning, minimal images, and restricted capabilities
- External secret managers handle encryption, rotation, and auditing of sensitive data
- Network policies implement zero-trust by controlling pod-to-pod traffic
- Workload identity provides temporary credentials instead of static secrets

## Common Mistakes

- Running containers as root when it's not required
- Not scanning images for vulnerabilities before deployment
- Storing secrets in environment variables within Kubernetes manifests
- Allowing unrestricted network access between all pods
- Using static credentials instead of workload identity and temporary tokens
