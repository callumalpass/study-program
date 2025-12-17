# Helm - Kubernetes Package Manager

Helm is the package manager for Kubernetes, simplifying deployment and management of applications through reusable charts.

## Helm Basics

**Install Helm**:
```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version
```

**Core Concepts**:
- **Chart**: Package of Kubernetes resources
- **Release**: Instance of a chart running in cluster
- **Repository**: Collection of charts

## Using Helm Charts

```bash
# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Search charts
helm search repo wordpress
helm search hub nginx

# Install chart
helm install my-wordpress bitnami/wordpress

# Install with custom values
helm install my-wordpress bitnami/wordpress \
  --set wordpressUsername=admin \
  --set wordpressPassword=password \
  --set service.type=LoadBalancer

# Install from values file
helm install my-wordpress bitnami/wordpress -f values.yaml

# List releases
helm list

# Get release status
helm status my-wordpress

# Upgrade release
helm upgrade my-wordpress bitnami/wordpress \
  --set service.type=NodePort

# Rollback release
helm rollback my-wordpress 1

# Uninstall release
helm uninstall my-wordpress
```

## Creating Charts

```bash
# Create new chart
helm create myapp

# Chart structure
myapp/
  Chart.yaml          # Chart metadata
  values.yaml         # Default values
  charts/             # Chart dependencies
  templates/          # Kubernetes manifests
    deployment.yaml
    service.yaml
    ingress.yaml
    _helpers.tpl      # Template helpers
  .helmignore         # Files to ignore
```

**Chart.yaml**:
```yaml
apiVersion: v2
name: myapp
description: A Helm chart for my application
type: application
version: 1.0.0
appVersion: "1.0"
dependencies:
- name: postgresql
  version: "11.x.x"
  repository: https://charts.bitnami.com/bitnami
```

**values.yaml**:
```yaml
replicaCount: 3

image:
  repository: myapp
  tag: "1.0"
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  hosts:
    - host: myapp.example.com
      paths:
      - path: /
        pathType: Prefix

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: false
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

**templates/deployment.yaml**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "myapp.fullname" . }}
  labels:
    {{- include "myapp.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "myapp.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "myapp.selectorLabels" . | nindent 8 }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        resources:
          {{- toYaml .Values.resources | nindent 12 }}
```

## Template Functions

```yaml
# Values reference
{{ .Values.replicaCount }}

# Chart metadata
{{ .Chart.Name }}
{{ .Chart.Version }}

# Release info
{{ .Release.Name }}
{{ .Release.Namespace }}

# Conditionals
{{- if .Values.ingress.enabled }}
kind: Ingress
{{- end }}

# Loops
{{- range .Values.hosts }}
- host: {{ . }}
{{- end }}

# Include named templates
{{- include "myapp.labels" . | nindent 4 }}

# Default values
{{ .Values.image.tag | default .Chart.AppVersion }}

# toYaml for complex structures
{{- toYaml .Values.resources | nindent 12 }}
```

## Validating and Testing

```bash
# Lint chart
helm lint myapp

# Dry run (template without installing)
helm install myapp ./myapp --dry-run --debug

# Template locally
helm template myapp ./myapp

# Package chart
helm package myapp

# Test release
helm test my-release
```

## Chart Repositories

```bash
# Add repository
helm repo add myrepo https://charts.example.com

# Update repositories
helm repo update

# List repositories
helm repo list

# Remove repository
helm repo remove myrepo

# Create repository index
helm repo index ./charts
```

## Best Practices

1. **Use .helmignore**
2. **Document in README.md**
3. **Provide good defaults in values.yaml**
4. **Use named templates for reusability**
5. **Include NOTES.txt for installation instructions**
6. **Version charts semantically**

**templates/NOTES.txt**:
```
1. Get the application URL:
{{- if .Values.ingress.enabled }}
  http{{ if .Values.ingress.tls }}s{{ end }}://{{ index .Values.ingress.hosts 0 }}
{{- else }}
  export POD_NAME=$(kubectl get pods --namespace {{ .Release.Namespace }} -l "app.kubernetes.io/name={{ include "myapp.name" . }}" -o jsonpath="{.items[0].metadata.name}")
  kubectl --namespace {{ .Release.Namespace }} port-forward $POD_NAME 8080:8080
  echo "Visit http://127.0.0.1:8080"
{{- end }}
```

## Summary

Helm simplifies Kubernetes application management through packageable, reusable charts with templating, versioning, and lifecycle management capabilities.
