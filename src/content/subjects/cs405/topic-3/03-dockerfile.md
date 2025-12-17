# Dockerfile and Image Building

Dockerfiles are text documents containing instructions for building Docker images. They define the base image, application dependencies, configuration, and runtime behavior. Understanding Dockerfile syntax and best practices is essential for creating efficient, secure, and maintainable container images.

## Dockerfile Basics

### What is a Dockerfile?

A Dockerfile is a script containing a series of instructions that Docker executes sequentially to build an image. Each instruction creates a new layer in the image.

**Basic Structure**:
```dockerfile
# Comment
INSTRUCTION arguments
```

**Simple Example**:
```dockerfile
# Use official Python runtime as base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy application code
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Run application
CMD ["python", "app.py"]
```

### Building Images

```bash
# Build image from Dockerfile in current directory
docker build -t myapp:latest .

# Build with specific Dockerfile
docker build -f Dockerfile.dev -t myapp:dev .

# Build with build arguments
docker build --build-arg VERSION=1.0 -t myapp:1.0 .

# Build without cache
docker build --no-cache -t myapp:latest .

# Build and tag multiple times
docker build -t myapp:latest -t myapp:1.0 -t myapp:production .
```

## Dockerfile Instructions

### FROM - Base Image

The `FROM` instruction specifies the base image. Every Dockerfile must start with a FROM instruction (except for multi-stage builds).

```dockerfile
# Use official image
FROM ubuntu:20.04

# Use specific version
FROM node:16.14.2

# Use slim/alpine variants (smaller size)
FROM python:3.9-slim
FROM nginx:alpine

# Multi-stage build (multiple FROM statements)
FROM node:16 AS builder
FROM nginx:alpine
```

**Base Image Selection**:
- **Official images**: Maintained by Docker or software vendors (nginx, python, node)
- **Distro-based**: ubuntu, debian, centos, alpine
- **Language-specific**: python, node, openjdk, golang, ruby
- **Slim/Alpine variants**: Smaller size, fewer vulnerabilities

### WORKDIR - Set Working Directory

Sets the working directory for subsequent instructions. Creates directory if it doesn't exist.

```dockerfile
# Set working directory
WORKDIR /app

# Relative paths work too
WORKDIR /app
WORKDIR src  # Now at /app/src

# All subsequent commands execute in this directory
COPY . .
RUN npm install
```

### COPY - Copy Files

Copies files and directories from build context to image filesystem.

```dockerfile
# Copy single file
COPY app.py /app/

# Copy multiple files
COPY app.py requirements.txt /app/

# Copy directory
COPY src/ /app/src/

# Copy with wildcard
COPY *.py /app/

# Copy and rename
COPY config.json /app/settings.json

# Copy with ownership
COPY --chown=node:node . /app

# Copy from URL (rarely used, use RUN wget instead)
# Not recommended for large files
```

### ADD - Add Files (with Extra Features)

Similar to COPY but with additional features. Prefer COPY unless you need ADD's special capabilities.

```dockerfile
# Copy files (same as COPY)
ADD app.py /app/

# Auto-extract tar archives
ADD archive.tar.gz /app/

# Download from URL (not recommended)
ADD https://example.com/file.tar.gz /tmp/
```

**COPY vs ADD**:
- Use `COPY` for simple file copying (preferred)
- Use `ADD` only when auto-extraction or URL download is needed

### RUN - Execute Commands

Executes commands during image build. Creates a new layer.

**Shell Form** (executed in shell):
```dockerfile
# Shell form - runs in /bin/sh -c
RUN apt-get update && apt-get install -y curl

# Multiple commands
RUN apt-get update && \
    apt-get install -y \
        curl \
        vim \
        git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

**Exec Form** (does not invoke shell):
```dockerfile
# Exec form - runs directly without shell
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "curl"]
```

**Best Practices**:
```dockerfile
# Bad: Creates multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim

# Good: Single layer, chained commands
RUN apt-get update && \
    apt-get install -y \
        curl \
        vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### CMD - Default Command

Specifies the default command to run when container starts. Only one CMD per Dockerfile (last one takes effect).

```dockerfile
# Exec form (preferred)
CMD ["python", "app.py"]
CMD ["nginx", "-g", "daemon off;"]

# Shell form
CMD python app.py

# As parameters to ENTRYPOINT
CMD ["--port", "8000"]
```

**CMD can be overridden**:
```bash
# Dockerfile has: CMD ["python", "app.py"]
docker run myapp  # Runs: python app.py
docker run myapp python test.py  # Runs: python test.py (overrides CMD)
```

### ENTRYPOINT - Container Executable

Configures container to run as an executable. Not easily overridden.

```dockerfile
# Exec form (preferred)
ENTRYPOINT ["python", "app.py"]

# Shell form
ENTRYPOINT python app.py
```

**ENTRYPOINT + CMD Pattern**:
```dockerfile
# ENTRYPOINT defines executable
ENTRYPOINT ["python", "app.py"]

# CMD provides default arguments
CMD ["--port", "8000"]

# Result: python app.py --port 8000
```

```bash
# Use default arguments
docker run myapp
# Runs: python app.py --port 8000

# Override CMD arguments
docker run myapp --port 9000
# Runs: python app.py --port 9000

# Override ENTRYPOINT (requires --entrypoint flag)
docker run --entrypoint /bin/bash myapp
```

**ENTRYPOINT vs CMD**:
- **ENTRYPOINT**: For fixed commands that always run
- **CMD**: For default arguments or commands that may change

### ENV - Environment Variables

Sets environment variables available during build and runtime.

```dockerfile
# Single variable
ENV NODE_ENV=production

# Multiple variables (deprecated format)
ENV NODE_ENV production
ENV PORT 8000

# Multiple variables (preferred format)
ENV NODE_ENV=production \
    PORT=8000 \
    LOG_LEVEL=info

# Using variables
ENV APP_HOME=/app
WORKDIR $APP_HOME
COPY . $APP_HOME
```

### ARG - Build Arguments

Defines build-time variables (not available at runtime).

```dockerfile
# Define argument with default value
ARG VERSION=latest
ARG BUILD_DATE

# Use argument
FROM node:${VERSION}

# Use in RUN command
RUN echo "Built on ${BUILD_DATE}"
```

```bash
# Pass build arguments
docker build --build-arg VERSION=16 --build-arg BUILD_DATE=$(date) -t myapp .
```

**ARG vs ENV**:
- **ARG**: Build-time only, not in final image
- **ENV**: Build-time and runtime, persists in image

### EXPOSE - Document Ports

Documents which ports the container listens on. Does not actually publish ports.

```dockerfile
# Single port
EXPOSE 8080

# Multiple ports
EXPOSE 8080 8443

# UDP port
EXPOSE 53/udp

# TCP and UDP
EXPOSE 80/tcp 53/udp
```

```bash
# Publish exposed ports
docker run -p 8080:8080 myapp

# Publish all exposed ports to random host ports
docker run -P myapp
```

### VOLUME - Mount Points

Creates mount points for persistent data.

```dockerfile
# Single volume
VOLUME /var/lib/mysql

# Multiple volumes
VOLUME ["/var/log", "/var/db"]
```

```bash
# Use named volume
docker run -v mydata:/var/lib/mysql mysql

# Use bind mount
docker run -v /host/path:/var/lib/mysql mysql
```

### USER - Set User

Sets the user (and optionally group) for subsequent instructions and container runtime.

```dockerfile
# Create user and switch to it
RUN useradd -m -u 1000 appuser
USER appuser

# Use user:group
USER appuser:appgroup

# Use UID:GID
USER 1000:1000

# Switch back to root if needed
USER root
```

**Security Best Practice**:
```dockerfile
FROM node:16

# Create non-root user
RUN useradd -m -u 1000 node

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies as root
RUN npm install

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Run as non-root
CMD ["node", "app.js"]
```

### LABEL - Metadata

Adds metadata to image.

```dockerfile
# Single label
LABEL version="1.0"

# Multiple labels
LABEL maintainer="devops@example.com" \
      description="My application" \
      version="1.0" \
      vendor="ACME Inc."

# OCI annotations
LABEL org.opencontainers.image.title="My App" \
      org.opencontainers.image.version="1.0" \
      org.opencontainers.image.authors="DevOps Team"
```

```bash
# View labels
docker inspect --format='{{json .Config.Labels}}' myapp
```

### HEALTHCHECK - Health Monitoring

Defines how to test container health.

```dockerfile
# HTTP health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Custom script
HEALTHCHECK CMD /app/health-check.sh

# Disable inherited healthcheck
HEALTHCHECK NONE
```

### SHELL - Change Default Shell

Changes the default shell for shell form commands.

```dockerfile
# Change to bash
SHELL ["/bin/bash", "-c"]

# Windows example
SHELL ["powershell", "-command"]
```

### ONBUILD - Trigger Instructions

Adds triggers that execute when image is used as base for another image.

```dockerfile
# In base image
FROM node:16
ONBUILD COPY package*.json ./
ONBUILD RUN npm install
ONBUILD COPY . .

# When used as base image, ONBUILD instructions execute automatically
```

## Multi-Stage Builds

Multi-stage builds create multiple images within a single Dockerfile, allowing you to copy artifacts between stages and create smaller final images.

### Basic Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Benefits**:
- Smaller final image (only runtime dependencies)
- Separate build and runtime environments
- No build tools in production image
- Better security (fewer attack surfaces)

### Advanced Multi-Stage Example

```dockerfile
# Stage 1: Dependencies
FROM node:16 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:16 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run test

# Stage 3: Production
FROM node:16-alpine
WORKDIR /app

# Copy production dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/sh -D node

# Change ownership
RUN chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Copying from External Images

```dockerfile
FROM node:16
WORKDIR /app

# Copy from specific image
COPY --from=nginx:latest /etc/nginx/nginx.conf /nginx.conf

# Copy from previous stage
COPY --from=builder /app/dist ./dist
```

## Complete Real-World Examples

### Example 1: Python Flask Application

```dockerfile
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_HOME=/app

# Create app directory
WORKDIR $APP_HOME

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        postgresql-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser $APP_HOME

USER appuser

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:5000/health')" || exit 1

# Run application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

### Example 2: Node.js Application with Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Run tests
RUN npm test

# Stage 2: Production
FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/sh -D node && \
    chown -R node:node /app

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

CMD ["node", "dist/index.js"]
```

### Example 3: Go Application

```dockerfile
# Stage 1: Build
FROM golang:1.19-alpine AS builder

# Install build dependencies
RUN apk add --no-cache git

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

# Build application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Stage 2: Production
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
```

### Example 4: Static Website with Nginx

```dockerfile
# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## Dockerfile Best Practices

### 1. Use Specific Tags

```dockerfile
# Bad
FROM node

# Good
FROM node:16.14.2-alpine
```

### 2. Minimize Layers

```dockerfile
# Bad: Multiple layers
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y vim

# Good: Single layer
RUN apt-get update && \
    apt-get install -y curl vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 3. Order Instructions by Change Frequency

```dockerfile
# Dependencies change rarely - put first
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install

# Source code changes frequently - put last
COPY . .
CMD ["node", "app.js"]
```

### 4. Use .dockerignore

Create `.dockerignore` file to exclude files from build context:

```
node_modules
npm-debug.log
.git
.env
.DS_Store
*.md
coverage
.vscode
```

### 5. Don't Run as Root

```dockerfile
# Create and use non-root user
RUN useradd -m -u 1000 appuser
USER appuser
```

### 6. Clean Up in Same Layer

```dockerfile
# Bad: Cleanup in separate layer (doesn't reduce image size)
RUN apt-get update
RUN apt-get install -y curl
RUN rm -rf /var/lib/apt/lists/*

# Good: Cleanup in same layer
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*
```

### 7. Use Multi-Stage Builds

```dockerfile
# Build stage with all tools
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production stage with only runtime
FROM node:16-alpine
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/index.js"]
```

### 8. Leverage Build Cache

```dockerfile
# Copy package files first (changes rarely)
COPY package*.json ./
RUN npm install

# Copy source code last (changes frequently)
COPY . .
```

### 9. Use COPY Instead of ADD

```dockerfile
# Preferred
COPY app.py /app/

# Only use ADD for tar auto-extraction
ADD archive.tar.gz /app/
```

### 10. Set Working Directory

```dockerfile
# Good
WORKDIR /app
COPY . .

# Avoid
COPY . /app
```

## Building Optimized Images

### Image Size Comparison

```dockerfile
# Large image (~1GB)
FROM ubuntu:20.04
RUN apt-get update && apt-get install -y python3 python3-pip
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY . .
CMD ["python3", "app.py"]

# Medium image (~500MB)
FROM python:3.9
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]

# Small image (~150MB)
FROM python:3.9-slim
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]

# Smallest image (~50MB)
FROM python:3.9-alpine
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## Summary

Dockerfiles provide a declarative way to build container images with predictable, reproducible results. Key takeaways:

- **FROM** specifies base image; use specific tags and slim/alpine variants
- **COPY and ADD** transfer files; prefer COPY for simple copying
- **RUN** executes build commands; chain commands to minimize layers
- **CMD and ENTRYPOINT** define container startup behavior
- **Multi-stage builds** create smaller, more secure production images
- **Best practices** include ordering by change frequency, cleaning up in same layer, running as non-root, and using .dockerignore
- **Optimization** focuses on minimal base images, layer caching, and removing unnecessary files

Understanding Dockerfile instructions and best practices enables you to create efficient, secure, and maintainable container images for any application.
