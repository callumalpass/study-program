import { CodingExercise } from '../../../../core/types';

const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-7-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-7',
    title: 'Implement 12-Factor App',
    difficulty: 3,
    description: `Create a cloud-native application following 12-factor principles:

1. Configuration via environment variables
2. Stateless design
3. Proper logging
4. Graceful shutdown
5. Health check endpoints
6. Containerized deployment

Include Dockerfile and deployment manifests.`,
    starterCode: `# app.py
# TODO: Implement 12-factor app

# Dockerfile
# TODO: Create Dockerfile

# k8s/deployment.yaml
# TODO: Create Kubernetes deployment`,
    solution: `# app.py
import os
import sys
import signal
import logging
from flask import Flask, jsonify, request
import redis
from datetime import datetime

# Configure logging (Factor 11: Logs as event streams)
logging.basicConfig(
    level=os.environ.get('LOG_LEVEL', 'INFO'),
    format='{"timestamp":"%(asctime)s","level":"%(levelname)s","message":"%(message)s"}',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Factor 3: Config in environment
CONFIG = {
    'REDIS_HOST': os.environ.get('REDIS_HOST', 'localhost'),
    'REDIS_PORT': int(os.environ.get('REDIS_PORT', 6379)),
    'PORT': int(os.environ.get('PORT', 8080)),
    'WORKERS': int(os.environ.get('WORKERS', 4))
}

# Factor 4: Backing services as attached resources
redis_client = None

def init_redis():
    """Initialize Redis connection"""
    global redis_client
    try:
        redis_client = redis.Redis(
            host=CONFIG['REDIS_HOST'],
            port=CONFIG['REDIS_PORT'],
            decode_responses=True,
            socket_connect_timeout=5
        )
        redis_client.ping()
        logger.info(f"Connected to Redis at {CONFIG['REDIS_HOST']}:{CONFIG['REDIS_PORT']}")
    except Exception as e:
        logger.error(f"Failed to connect to Redis: {str(e)}")
        redis_client = None

# Factor 9: Disposability (fast startup)
init_redis()

# Health check endpoint
@app.route('/health')
def health():
    """Health check endpoint"""
    health_status = {
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'redis': 'connected' if redis_client and redis_client.ping() else 'disconnected'
    }
    status_code = 200 if health_status['redis'] == 'connected' else 503
    return jsonify(health_status), status_code

# Readiness check
@app.route('/ready')
def ready():
    """Readiness check endpoint"""
    if redis_client and redis_client.ping():
        return jsonify({'status': 'ready'}), 200
    return jsonify({'status': 'not ready'}), 503

# Factor 6: Stateless processes
@app.route('/counter', methods=['GET', 'POST'])
def counter():
    """Stateless counter using Redis"""
    if not redis_client:
        return jsonify({'error': 'Redis not available'}), 503

    if request.method == 'POST':
        count = redis_client.incr('counter')
        logger.info(f"Counter incremented to {count}")
        return jsonify({'count': count}), 200
    else:
        count = redis_client.get('counter') or 0
        return jsonify({'count': int(count)}), 200

# Factor 9: Graceful shutdown
shutdown_flag = False

def signal_handler(signum, frame):
    """Handle shutdown signals"""
    global shutdown_flag
    logger.info(f"Received signal {signum}, initiating graceful shutdown...")
    shutdown_flag = True

    # Close Redis connection
    if redis_client:
        redis_client.close()
        logger.info("Redis connection closed")

    logger.info("Shutdown complete")
    sys.exit(0)

signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)

if __name__ == '__main__':
    logger.info(f"Starting application on port {CONFIG['PORT']}")
    # Factor 7: Port binding
    app.run(
        host='0.0.0.0',
        port=CONFIG['PORT'],
        debug=False
    )

# Dockerfile
FROM python:3.11-slim as base

# Factor 2: Dependencies explicitly declared
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Factor 5: Build, release, run (build stage)
FROM python:3.11-slim

# Install dumb-init for proper signal handling
RUN apt-get update && \\
    apt-get install -y --no-install-recommends dumb-init && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 appuser

WORKDIR /app

# Copy dependencies
COPY --from=base /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy application
COPY --chown=appuser:appuser app.py .

USER appuser

# Factor 7: Port binding
EXPOSE 8080

# Factor 9: Disposability
ENTRYPOINT ["dumb-init", "--"]
CMD ["python", "app.py"]

# requirements.txt
Flask==2.3.2
redis==4.5.5
gunicorn==20.1.0

# k8s/deployment.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "INFO"
  WORKERS: "4"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloud-native-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cloud-native-app
  template:
    metadata:
      labels:
        app: cloud-native-app
    spec:
      containers:
      - name: app
        image: cloud-native-app:1.0
        ports:
        - containerPort: 8080
        env:
        # Factor 3: Config from environment
        - name: PORT
          value: "8080"
        - name: REDIS_HOST
          value: redis
        - name: REDIS_PORT
          value: "6379"
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: LOG_LEVEL
        # Factor 10: Dev/prod parity
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        # Factor 9: Fast shutdown
        lifecycle:
          preStop:
            exec:
              command: ["sleep", "5"]

---
apiVersion: v1
kind: Service
metadata:
  name: cloud-native-app
spec:
  selector:
    app: cloud-native-app
  ports:
  - port: 80
    targetPort: 8080

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379

---
apiVersion: v1
kind: Service
metadata:
  name: redis
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379`,
    hints: [
      'Use environment variables for all configuration',
      'Design stateless processes',
      'Implement graceful shutdown',
      'Log to stdout/stderr',
      'Fast startup and shutdown'
    ],
    testCases: [
      {
        input: 'curl /health',
        expectedOutput: '200 OK with health status',
        isHidden: false,
        description: 'Test health check endpoint'
      },
      {
        input: 'SIGTERM signal',
        expectedOutput: 'Graceful shutdown within 5 seconds',
        isHidden: false,
        description: 'Verify graceful shutdown handling'
      }
    ],
    language: 'python'
  }
];

export { topic7Exercises };
