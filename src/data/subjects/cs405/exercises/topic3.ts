import { CodingExercise } from '../../../../core/types';

const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs405-ex-3-1',
    subjectId: 'cs405',
    topicId: 'cs405-topic-3',
    title: 'Build Multi-Stage Dockerfile',
    difficulty: 3,
    description: `Create a multi-stage Dockerfile for a Node.js application that:

1. Uses separate build and production stages
2. Installs dependencies in build stage
3. Runs tests in build stage
4. Creates minimal production image
5. Runs as non-root user
6. Includes health check

Also create a .dockerignore file to exclude unnecessary files.`,
    starterCode: `# Dockerfile
# TODO: Build stage

# TODO: Production stage

# .dockerignore
# TODO: Add files to exclude`,
    solution: `# Dockerfile
# Multi-stage build for Node.js application

# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \\
    npm cache clean --force

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Run tests
RUN npm test

# Build application
RUN npm run build

# Stage 3: Production
FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy production dependencies from dependencies stage
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]

# .dockerignore file
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.env.local
.env.*.local
.vscode
.idea
*.md
coverage
.nyc_output
dist
build
.DS_Store
Thumbs.db
*.log
.dockerignore
Dockerfile
docker-compose.yml`,
    hints: [
      'Use Alpine images for smaller size',
      'Copy package.json before source code for better caching',
      'Clean npm cache in same RUN command',
      'Use COPY --chown to set ownership',
      'Health checks enable automatic restart'
    ],
    testCases: [
      {
        input: 'docker build -t myapp .',
        expectedOutput: 'Image built successfully, tests pass',
        isHidden: false,
        description: 'Build multi-stage Docker image'
      },
      {
        input: 'docker run myapp',
        expectedOutput: 'Container runs as non-root user',
        isHidden: false,
        description: 'Run container with non-root user'
      },
      {
        input: 'docker inspect myapp',
        expectedOutput: 'Health check configured',
        isHidden: false,
        description: 'Verify health check is configured'
      }
    ],
    language: 'dockerfile'
  },
  {
    id: 'cs405-ex-3-2',
    subjectId: 'cs405',
    topicId: 'cs405-topic-3',
    title: 'Docker Compose Full-Stack Application',
    difficulty: 4,
    description: `Create a docker-compose.yml for a full-stack application with:

1. Frontend (React/Vue)
2. Backend API (Node.js/Python)
3. Database (PostgreSQL)
4. Redis cache
5. Nginx reverse proxy

Include:
- Custom networks (frontend, backend)
- Named volumes for data persistence
- Environment variables
- Health checks
- Resource limits
- Proper service dependencies`,
    starterCode: `version: '3.8'

services:
  # TODO: Define all services

networks:
  # TODO: Define networks

volumes:
  # TODO: Define volumes`,
    solution: `version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: app-database
    restart: unless-stopped
    environment:
      POSTGRES_DB: \${DB_NAME:-appdb}
      POSTGRES_USER: \${DB_USER:-appuser}
      POSTGRES_PASSWORD: \${DB_PASSWORD:-secret}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${DB_USER:-appuser} -d \${DB_NAME:-appdb}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: app-cache
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass \${REDIS_PASSWORD:-redissecret}
    volumes:
      - redis-data:/data
    networks:
      - backend
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production
    container_name: app-backend
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      NODE_ENV: production
      PORT: 5000
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: \${DB_NAME:-appdb}
      DB_USER: \${DB_USER:-appuser}
      DB_PASSWORD: \${DB_PASSWORD:-secret}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: \${REDIS_PASSWORD:-redissecret}
      JWT_SECRET: \${JWT_SECRET:-change-me-in-production}
    volumes:
      - ./backend/uploads:/app/uploads
    networks:
      - frontend
      - backend
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/health')"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        REACT_APP_API_URL: /api
    container_name: app-frontend
    restart: unless-stopped
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - frontend
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: app-nginx
    restart: unless-stopped
    depends_on:
      - frontend
      - backend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - nginx-cache:/var/cache/nginx
    networks:
      - frontend
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M

  # PGAdmin (optional, for development)
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: app-pgadmin
    restart: unless-stopped
    profiles:
      - dev  # Only runs when using --profile dev
    environment:
      PGADMIN_DEFAULT_EMAIL: \${PGADMIN_EMAIL:-admin@example.com}
      PGADMIN_DEFAULT_PASSWORD: \${PGADMIN_PASSWORD:-admin}
    ports:
      - "5050:80"
    volumes:
      - pgadmin-data:/var/lib/pgadmin
    networks:
      - backend
    depends_on:
      - postgres

networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

  backend:
    driver: bridge
    internal: true  # No external access
    ipam:
      config:
        - subnet: 172.21.0.0/16

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local
  nginx-cache:
    driver: local
  pgadmin-data:
    driver: local

# nginx/nginx.conf
# events {
#     worker_connections 1024;
# }
#
# http {
#     upstream backend {
#         server backend:5000;
#     }
#
#     upstream frontend {
#         server frontend:3000;
#     }
#
#     server {
#         listen 80;
#         server_name localhost;
#
#         # Frontend
#         location / {
#             proxy_pass http://frontend;
#             proxy_http_version 1.1;
#             proxy_set_header Upgrade $http_upgrade;
#             proxy_set_header Connection 'upgrade';
#             proxy_set_header Host $host;
#             proxy_cache_bypass $http_upgrade;
#         }
#
#         # Backend API
#         location /api {
#             rewrite ^/api/(.*) /$1 break;
#             proxy_pass http://backend;
#             proxy_http_version 1.1;
#             proxy_set_header Host $host;
#             proxy_set_header X-Real-IP $remote_addr;
#             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#             proxy_set_header X-Forwarded-Proto $scheme;
#         }
#
#         # Health check
#         location /health {
#             access_log off;
#             return 200 "healthy\\n";
#             add_header Content-Type text/plain;
#         }
#     }
# }

# .env file
# DB_NAME=appdb
# DB_USER=appuser
# DB_PASSWORD=secret-password-change-me
# REDIS_PASSWORD=redis-secret-change-me
# JWT_SECRET=jwt-secret-change-me
# PGADMIN_EMAIL=admin@example.com
# PGADMIN_PASSWORD=admin`,
    hints: [
      'Use depends_on with condition: service_healthy',
      'Internal networks prevent external access',
      'Named volumes persist data across restarts',
      'Resource limits prevent resource exhaustion',
      'Profiles enable optional services'
    ],
    testCases: [
      {
        input: 'docker compose up',
        expectedOutput: 'All services start in correct order',
        isHidden: false,
        description: 'Start all services with Docker Compose'
      },
      {
        input: 'docker compose ps',
        expectedOutput: 'All services running and healthy',
        isHidden: false,
        description: 'Check service status'
      },
      {
        input: 'curl http://localhost',
        expectedOutput: 'Frontend accessible via Nginx',
        isHidden: false,
        description: 'Test frontend access through Nginx'
      }
    ],
    language: 'yaml'
  }
];

export { topic3Exercises };