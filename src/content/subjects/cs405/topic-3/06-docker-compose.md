# Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. Using a YAML file, you can configure all your application's services, networks, and volumes, then start everything with a single command. Compose is essential for local development, testing, and simple production deployments.

## Docker Compose Overview

```mermaid
graph TB
    YAML[docker-compose.yml]
    CMD[docker compose up]

    subgraph "Application Stack"
        WEB[Web Container<br/>nginx:latest]
        API[API Container<br/>node:16]
        DB[(Database Container<br/>postgres:14)]
        CACHE[(Cache Container<br/>redis:alpine)]
    end

    subgraph "Docker Resources"
        NET[Custom Network]
        VOL1[Database Volume]
        VOL2[Cache Volume]
    end

    YAML --> CMD
    CMD --> WEB
    CMD --> API
    CMD --> DB
    CMD --> CACHE
    CMD --> NET
    CMD --> VOL1
    CMD --> VOL2

    WEB --> NET
    API --> NET
    DB --> NET
    CACHE --> NET

    DB --> VOL1
    CACHE --> VOL2

    style YAML fill:#99ff99
    style CMD fill:#ff9999
```

## Installation

```bash
# Docker Compose V2 (included with Docker Desktop)
docker compose version

# Linux installation (if not included)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker compose version
```

## Compose File Structure

### Basic Compose File (docker-compose.yml)

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - frontend

  api:
    image: node:16
    working_dir: /app
    volumes:
      - ./api:/app
    command: npm start
    networks:
      - frontend
      - backend
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - backend

networks:
  frontend:
  backend:

volumes:
  pgdata:
```

### Version Specification

```yaml
# Compose file format version
version: '3.8'  # Recommended for Docker Engine 19.03+
```

## Services Configuration

### Image-Based Service

```yaml
services:
  web:
    image: nginx:1.21
    container_name: my-nginx
    restart: unless-stopped
```

### Build-Based Service

```yaml
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile
      args:
        VERSION: "1.0"
        BUILD_DATE: "2024-01-01"
    image: myapp:latest
```

**Advanced Build Options**:
```yaml
services:
  app:
    build:
      context: ./app
      dockerfile: Dockerfile.prod
      target: production  # Multi-stage build target
      cache_from:
        - myapp:latest
      labels:
        - "com.example.version=1.0"
```

### Ports

```yaml
services:
  web:
    ports:
      # HOST:CONTAINER
      - "8080:80"           # Map port 8080 to 80
      - "8443:443"          # Multiple ports
      - "127.0.0.1:8080:80" # Specific interface
      - "80"                # Random host port
      - "53:53/udp"         # UDP port
```

### Environment Variables

```yaml
services:
  app:
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: 5432
      DEBUG: "false"

  # Or use array format
  db:
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_USER=admin
      - POSTGRES_DB=myapp

  # Load from .env file
  api:
    env_file:
      - ./config/app.env
      - ./config/secrets.env
```

### Volumes

```yaml
services:
  app:
    volumes:
      # Named volume
      - data:/data

      # Bind mount
      - ./app:/app

      # Read-only bind mount
      - ./config:/etc/config:ro

      # tmpfs mount
      - type: tmpfs
        target: /tmp

      # Long syntax with options
      - type: volume
        source: mydata
        target: /data
        volume:
          nocopy: true
```

### Networks

```yaml
services:
  web:
    networks:
      - frontend
      - backend

  # Network with alias
  api:
    networks:
      frontend:
        aliases:
          - api-service
          - backend-api

  # Static IP
  db:
    networks:
      backend:
        ipv4_address: 172.16.238.10
```

### Dependencies

```yaml
services:
  web:
    depends_on:
      - api
      - cache

  # Advanced: wait for health check
  api:
    depends_on:
      db:
        condition: service_healthy
```

### Health Checks

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # Disable health check
  api:
    healthcheck:
      disable: true
```

### Resource Limits

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Restart Policies

```yaml
services:
  web:
    restart: no              # Never restart
    # restart: always        # Always restart
    # restart: on-failure    # Restart on failure
    # restart: unless-stopped # Restart unless manually stopped
```

## Docker Compose Commands

### Basic Commands

```bash
# Start all services
docker compose up

# Start in background (detached)
docker compose up -d

# Start specific services
docker compose up web db

# Build or rebuild services
docker compose build

# Build without cache
docker compose build --no-cache

# Start and build if needed
docker compose up --build

# Stop services (preserves containers)
docker compose stop

# Start stopped services
docker compose start

# Restart services
docker compose restart

# Stop and remove containers
docker compose down

# Stop and remove with volumes
docker compose down -v

# Stop and remove with images
docker compose down --rmi all
```

### Service Management

```bash
# List running services
docker compose ps

# List all containers (including stopped)
docker compose ps -a

# View logs
docker compose logs

# Follow logs
docker compose logs -f

# Logs for specific service
docker compose logs web

# Last N lines
docker compose logs --tail=100 web

# Execute command in service
docker compose exec web sh

# Run one-off command
docker compose run --rm web sh

# Scale services
docker compose up -d --scale api=3
```

### Advanced Commands

```bash
# Validate compose file
docker compose config

# View resolved configuration
docker compose config --services

# Pause services
docker compose pause

# Unpause services
docker compose unpause

# View port mappings
docker compose port web 80

# View running processes
docker compose top

# View events
docker compose events

# Pull images
docker compose pull

# Push images
docker compose push
```

## Complete Examples

### Example 1: MERN Stack

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    container_name: mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secret
    volumes:
      - mongo-data:/data/db
    networks:
      - backend

  backend:
    build: ./backend
    container_name: api
    restart: unless-stopped
    environment:
      NODE_ENV: production
      MONGO_URI: mongodb://admin:secret@mongodb:27017/myapp?authSource=admin
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    networks:
      - backend
      - frontend

  frontend:
    build: ./frontend
    container_name: react-app
    restart: unless-stopped
    environment:
      REACT_APP_API_URL: http://localhost:5000
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - frontend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge

volumes:
  mongo-data:
    driver: local
```

### Example 2: WordPress with MySQL

```yaml
version: '3.8'

services:
  db:
    image: mysql:8.0
    container_name: wordpress-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppassword
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - wordpress-net

  wordpress:
    image: wordpress:latest
    container_name: wordpress
    restart: always
    depends_on:
      - db
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppassword
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp-content:/var/www/html/wp-content
    ports:
      - "8080:80"
    networks:
      - wordpress-net

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: phpmyadmin
    restart: always
    depends_on:
      - db
    environment:
      PMA_HOST: db
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - "8081:80"
    networks:
      - wordpress-net

networks:
  wordpress-net:
    driver: bridge

volumes:
  db-data:
  wp-content:
```

### Example 3: Microservices Application

```yaml
version: '3.8'

services:
  # API Gateway
  gateway:
    build: ./gateway
    ports:
      - "8080:8080"
    environment:
      USER_SERVICE_URL: http://user-service:3001
      ORDER_SERVICE_URL: http://order-service:3002
    depends_on:
      - user-service
      - order-service
    networks:
      - frontend

  # User Service
  user-service:
    build: ./services/user
    environment:
      DB_HOST: postgres
      REDIS_HOST: redis
    depends_on:
      - postgres
      - redis
    networks:
      - frontend
      - backend

  # Order Service
  order-service:
    build: ./services/order
    environment:
      DB_HOST: postgres
      RABBITMQ_HOST: rabbitmq
    depends_on:
      - postgres
      - rabbitmq
    networks:
      - frontend
      - backend

  # Database
  postgres:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: microservices
    volumes:
      - pg-data:/var/lib/postgresql/data
    networks:
      - backend

  # Cache
  redis:
    image: redis:alpine
    networks:
      - backend

  # Message Queue
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "15672:15672"
    networks:
      - backend

networks:
  frontend:
  backend:

volumes:
  pg-data:
```

### Example 4: Development Environment

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - ./src:/app/src
      - ./public:/app/public
      - node-modules:/app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"  # Debug port
    environment:
      NODE_ENV: development
      CHOKIDAR_USEPOLLING: "true"  # Hot reload in Docker
    command: npm run dev
    depends_on:
      - db
      - redis
    networks:
      - dev-net

  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: myapp_dev
    ports:
      - "5432:5432"
    volumes:
      - pg-dev-data:/var/lib/postgresql/data
    networks:
      - dev-net

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    networks:
      - dev-net

  pgadmin:
    image: dpage/pgadmin4
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@dev.local
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    networks:
      - dev-net

networks:
  dev-net:

volumes:
  pg-dev-data:
  node-modules:
```

## Environment Variable Substitution

**.env file**:
```env
DB_PASSWORD=secretpassword
API_PORT=5000
NODE_ENV=production
```

**docker-compose.yml**:
```yaml
services:
  api:
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
      NODE_ENV: ${NODE_ENV:-development}  # Default value
    ports:
      - "${API_PORT}:5000"
```

```bash
# Load .env file and start
docker compose up
```

## Override Files

Create environment-specific configurations with override files.

**docker-compose.override.yml** (auto-loaded):
```yaml
version: '3.8'

services:
  web:
    environment:
      DEBUG: "true"
    volumes:
      - ./logs:/var/log/nginx
```

**docker-compose.prod.yml**:
```yaml
version: '3.8'

services:
  web:
    environment:
      DEBUG: "false"
    restart: always
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

```bash
# Use specific override file
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Multiple override files
docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.monitoring.yml up -d
```

## Best Practices

### 1. Use Version Control

```bash
# Commit compose files
git add docker-compose.yml .dockerignore .env.example
git commit -m "Add Docker Compose configuration"

# Don't commit .env with secrets
echo ".env" >> .gitignore
```

### 2. Use Named Volumes

```yaml
# Good: Named volumes
volumes:
  postgres-data:
  redis-data:

# Avoid: Anonymous volumes
volumes:
  - /var/lib/postgresql/data
```

### 3. Health Checks

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 4. Dependency Order with Health Checks

```yaml
services:
  app:
    depends_on:
      db:
        condition: service_healthy

  db:
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
```

### 5. Use .dockerignore

```
node_modules
npm-debug.log
.git
.env
*.md
.vscode
```

### 6. Resource Limits

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

### 7. Logging Configuration

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Troubleshooting

```bash
# View logs with timestamps
docker compose logs -t -f

# Rebuild specific service
docker compose build --no-cache app

# Recreate containers
docker compose up -d --force-recreate

# Remove orphan containers
docker compose down --remove-orphans

# Validate compose file
docker compose config

# Check service status
docker compose ps
docker compose top
```

## Summary

Docker Compose simplifies multi-container application management through declarative YAML configuration. Key takeaways:

- **Compose files** define services, networks, and volumes in a single YAML file
- **Commands** like `up`, `down`, `build`, and `logs` manage entire application stacks
- **Service configuration** supports images, builds, ports, environment variables, volumes, and dependencies
- **Override files** enable environment-specific configurations (dev, staging, production)
- **Best practices** include health checks, named volumes, resource limits, and version control
- **Use cases** range from development environments to production deployments of multi-container applications

Docker Compose is essential for local development, testing, and managing multi-container applications efficiently.
