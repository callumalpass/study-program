# Kubernetes Storage

Kubernetes provides flexible storage options for stateful applications through Volumes, PersistentVolumes, and PersistentVolumeClaims.

## Volumes

Volumes provide storage to containers within a Pod.

**emptyDir**: Temporary storage, deleted with Pod
```yaml
spec:
  containers:
  - name: app
    volumeMounts:
    - name: cache
      mountPath: /cache
  volumes:
  - name: cache
    emptyDir: {}
```

**hostPath**: Mount host filesystem (not recommended for production)
```yaml
volumes:
- name: logs
  hostPath:
    path: /var/log
    type: Directory
```

**configMap**: Mount configuration data
```yaml
volumes:
- name: config
  configMap:
    name: app-config
```

**secret**: Mount sensitive data
```yaml
volumes:
- name: secrets
  secret:
    secretName: app-secrets
```

## PersistentVolumes (PV)

Cluster-wide storage resource.

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-mysql
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /data/mysql
```

**Access Modes**:
- `ReadWriteOnce` (RWO): Single node read-write
- `ReadOnlyMany` (ROX): Multiple nodes read-only
- `ReadWriteMany` (RWX): Multiple nodes read-write

**Reclaim Policies**:
- `Retain`: Manual reclamation
- `Delete`: Delete volume when claim deleted
- `Recycle`: Scrub and reuse (deprecated)

## PersistentVolumeClaims (PVC)

Request for storage by user.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard
```

**Using PVC in Pod**:
```yaml
spec:
  containers:
  - name: mysql
    volumeMounts:
    - name: data
      mountPath: /var/lib/mysql
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: mysql-pvc
```

## StorageClasses

Dynamic provisioning of storage.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iopsPerGB: "10"
```

**Using StorageClass**:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: fast-storage
spec:
  accessModes:
  - ReadWriteOnce
  storageClassName: fast
  resources:
    requests:
      storage: 100Gi
```

## ConfigMaps

Non-sensitive configuration data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  app.properties: |
    db.host=postgres
    db.port=5432
  log.level: "info"
```

**Using ConfigMap**:
```yaml
spec:
  containers:
  - name: app
    env:
    - name: LOG_LEVEL
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: log.level
    volumeMounts:
    - name: config
      mountPath: /etc/config
  volumes:
  - name: config
    configMap:
      name: app-config
```

## Secrets

Sensitive data storage.

```bash
# Create secret
kubectl create secret generic db-secret \
  --from-literal=username=admin \
  --from-literal=password=secret123

# From file
kubectl create secret generic tls-secret \
  --from-file=tls.crt=./cert.pem \
  --from-file=tls.key=./key.pem
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded
  password: c2VjcmV0MTIz
```

**Using Secrets**:
```yaml
spec:
  containers:
  - name: app
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
    volumeMounts:
    - name: secrets
      mountPath: /etc/secrets
      readOnly: true
  volumes:
  - name: secrets
    secret:
      secretName: db-secret
```

## StatefulSet with Storage

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast
      resources:
        requests:
          storage: 10Gi
```

## Summary

Kubernetes storage provides flexible options from ephemeral emptyDir to persistent volumes with dynamic provisioning. ConfigMaps and Secrets manage configuration and sensitive data securely.
