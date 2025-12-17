import { CodingExercise } from '../../../../core/types';

const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-4-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-4',
    title: 'Deploy Application on Kubernetes',
    difficulty: 3,
    description: `Create Kubernetes manifests to deploy a web application with:

1. Deployment with 3 replicas
2. Service (LoadBalancer)
3. ConfigMap for configuration
4. Secret for sensitive data
5. Health probes (liveness and readiness)
6. Resource requests and limits`,
    starterCode: `# deployment.yaml
# TODO: Create Deployment

# service.yaml
# TODO: Create Service

# configmap.yaml
# TODO: Create ConfigMap

# secret.yaml
# TODO: Create Secret`,
    solution: `# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  labels:
    app: webapp
data:
  app.properties: |
    server.port=8080
    logging.level=INFO
    feature.enabled=true
  database.host: "postgres.default.svc.cluster.local"
  cache.host: "redis.default.svc.cluster.local"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  labels:
    app: webapp
type: Opaque
stringData:
  database-password: "changeme-in-production"
  api-key: "secret-api-key-here"
  jwt-secret: "jwt-signing-secret"

---
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  labels:
    app: webapp
    version: v1
spec:
  replicas: 3
  revisionHistoryLimit: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
        version: v1
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      containers:
      - name: webapp
        image: myapp:1.0
        imagePullPolicy: IfNotPresent
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        env:
        - name: NODE_ENV
          value: "production"
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database.host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: api-key
        volumeMounts:
        - name: config
          mountPath: /etc/config
          readOnly: true
        - name: cache
          mountPath: /tmp
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
            scheme: HTTP
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          successThreshold: 1
          failureThreshold: 3
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          capabilities:
            drop:
            - ALL
      volumes:
      - name: config
        configMap:
          name: app-config
      - name: cache
        emptyDir: {}

---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: webapp-service
  labels:
    app: webapp
spec:
  type: LoadBalancer
  selector:
    app: webapp
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 8080
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800

---
# hpa.yaml (Horizontal Pod Autoscaler)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp
  minReplicas: 3
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
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30

---
# pdb.yaml (Pod Disruption Budget)
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: webapp-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: webapp`,
    hints: [
      'Always set resource requests and limits',
      'Use health probes for reliability',
      'ConfigMaps for config, Secrets for sensitive data',
      'Rolling updates prevent downtime',
      'HPA requires metrics-server'
    ],
    testCases: [
      {
        input: 'kubectl apply -f .',
        expectedOutput: 'All resources created successfully',
        isHidden: false,
        description: 'Apply all Kubernetes manifests'
      },
      {
        input: 'kubectl get pods',
        expectedOutput: '3 pods running and ready',
        isHidden: false,
        description: 'Check pod status'
      },
      {
        input: 'kubectl get svc',
        expectedOutput: 'LoadBalancer service with external IP',
        isHidden: false,
        description: 'Verify service configuration'
      }
    ],
    language: 'yaml'
  }
];

export { topic4Exercises };
