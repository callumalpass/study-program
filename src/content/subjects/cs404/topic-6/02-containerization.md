# Containerization with Docker

## Introduction

Docker revolutionized application deployment by solving one of software engineering's most persistent problems: "it works on my machine." Containers package your application along with all its dependencies—runtime, libraries, configuration files—into a single, portable unit that runs identically across any environment. Whether you're running on your laptop, a teammate's computer, a staging server, or production infrastructure, the container behaves exactly the same way.

Containerization provides isolation without the overhead of traditional virtual machines. While VMs virtualize entire operating systems, containers share the host OS kernel and virtualize only the user space. This makes containers lightweight and fast—they start in seconds, use minimal resources, and you can run dozens on a single machine. For capstone projects, Docker simplifies deployment, ensures consistency across team members' development environments, and demonstrates understanding of modern infrastructure practices that employers expect.

## Understanding Docker Fundamentals

Docker's architecture consists of three primary components: images, containers, and registries. An image is a read-only template containing your application code, runtime, libraries, and configuration. Think of an image as a snapshot or blueprint. When you run an image, Docker creates a container—a running instance of that image. You can create multiple containers from a single image, each running independently with its own isolated filesystem, network, and process space.

Images are built in layers, and Docker caches these layers to optimize builds. When you modify your code and rebuild, Docker only rebuilds layers that changed and reuses cached layers that didn't. This layered approach makes iterative development fast—subsequent builds often complete in seconds rather than minutes.

Registries store and distribute images. Docker Hub is the public registry where you can find official images for Node.js, PostgreSQL, Redis, and thousands of other tools. You can also run private registries for proprietary code. Cloud platforms like GitHub Container Registry and AWS ECR provide integrated registry services.

## Writing Effective Dockerfiles

A Dockerfile contains instructions for building an image. Each instruction creates a layer, and understanding layer caching is crucial for fast builds. Here's a production-ready Dockerfile for a TypeScript Node.js application:

```dockerfile
# Use specific version, not 'latest'
FROM node:20-alpine

# Install security updates
RUN apk update && apk upgrade

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY --chown=nodejs:nodejs . .

# Build TypeScript
RUN npm run build

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["node", "dist/index.js"]
```

This Dockerfile demonstrates several best practices. We use `node:20-alpine` instead of `node:20` because Alpine Linux is a minimal distribution—the resulting image is 100MB instead of 1GB. We specify an exact version rather than `latest` to ensure consistent builds. Dependencies are copied and installed before source code to leverage Docker's layer cache—when you change application code but not dependencies, the npm install layer is reused from cache.

The multi-stage build pattern is even more powerful for optimizing image size. Here's an enhanced version:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Production stage
FROM node:20-alpine

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# Copy only built artifacts from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

This multi-stage build separates the build environment from the runtime environment. The final image contains only production dependencies and compiled JavaScript, not TypeScript source, dev dependencies, or build tools. This significantly reduces image size and attack surface.

## Docker Compose for Local Development

Docker Compose orchestrates multiple containers, making it perfect for running your application with its dependencies locally. Here's a compose file for a web app with PostgreSQL and Redis:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://postgres:password@db:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      # Mount source code for hot reload
      - ./src:/app/src
      - /app/node_modules
    command: npm run dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

With this setup, `docker compose up` starts your entire development environment—application, database, and cache—with a single command. The `volumes` section mounts your source code into the container, enabling hot reload during development. Named volumes persist database data between restarts. The `depends_on` directive ensures the database starts before the application.

Environment variables are defined inline for development, but for production you'd use `.env` files or secret management. The application references other services by name—Docker Compose creates a network where `db` and `redis` are hostnames that resolve to the respective containers.

## Container Networking and Volumes

Docker provides several networking modes. The default bridge network allows containers to communicate using container names as hostnames. For more control, create custom networks:

```bash
docker network create myapp-network
docker run --network myapp-network --name api myapp-api
docker run --network myapp-network --name worker myapp-worker
```

Volumes persist data beyond container lifecycles. There are three types: named volumes (managed by Docker), bind mounts (map host directories into containers), and tmpfs mounts (temporary in-memory storage). For databases, always use named volumes:

```bash
docker volume create postgres_data
docker run -v postgres_data:/var/lib/postgresql/data postgres:16
```

This ensures your database persists when you recreate containers.

## Key Takeaways

- Containers package applications with dependencies, ensuring consistency across environments
- Dockerfiles define how to build images using layered instructions
- Layer caching speeds up builds—copy package files before source code
- Multi-stage builds reduce final image size by separating build and runtime environments
- Use specific base image versions, not `latest`, for reproducible builds
- Docker Compose orchestrates multiple containers for local development
- Named volumes persist data across container restarts
- Alpine-based images are significantly smaller than standard distributions
- Run containers as non-root users for security

## Common Mistakes

### Mistake 1: Using `latest` Tag
**Problem:** Your Dockerfile specifies `FROM node:latest`. Months later, rebuilding the image pulls a new Node.js version with breaking changes, causing mysterious failures. Different team members have different "latest" versions, breaking consistency.

**Solution:** Always use specific versions: `FROM node:20-alpine`. Update versions deliberately through pull requests, testing changes before merging. This ensures reproducible builds and prevents surprise breakages.

### Mistake 2: Building Large Images
**Problem:** Your production image is 2GB because it includes TypeScript, dev dependencies, source maps, and build tools that aren't needed at runtime. Large images slow down deployment and increase costs.

**Solution:** Use multi-stage builds to separate build and runtime stages. Install only production dependencies in the final stage. Use Alpine-based images when possible. A well-optimized Node.js app should be under 200MB.

### Mistake 3: Running as Root
**Problem:** Your container runs as root (the default), violating security best practices. If an attacker exploits your application, they have root access inside the container.

**Solution:** Create a non-root user in your Dockerfile and switch to it before running the application. Many official images provide a pre-created user (like `node` in Node.js images).

### Mistake 4: Secrets in Images
**Problem:** You copy `.env` files containing secrets into the image or hardcode API keys. These secrets are visible to anyone with access to the image.

**Solution:** Never include secrets in images. Use environment variables passed at runtime, Docker secrets (for Swarm), or cloud provider secret management. Add `.env` to `.dockerignore` to prevent accidental inclusion.

### Mistake 5: No .dockerignore
**Problem:** Without a `.dockerignore` file, Docker copies `node_modules`, `.git`, build artifacts, and other unnecessary files into the build context. This slows builds and bloats images.

**Solution:** Create a `.dockerignore` file similar to `.gitignore`:

```
node_modules
dist
.git
.env
*.log
coverage
.DS_Store
```

This speeds up builds by reducing the context size sent to the Docker daemon.

### Mistake 6: Installing Dependencies Every Build
**Problem:** Your Dockerfile copies all code then runs `npm install`, so even small code changes invalidate the install cache and reinstall all dependencies.

**Solution:** Copy `package.json` and `package-lock.json` first, run `npm ci`, then copy source code. This way, dependency installation is cached unless package files change.

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Play with Docker](https://labs.play-with-docker.com/) - Free online Docker playground
