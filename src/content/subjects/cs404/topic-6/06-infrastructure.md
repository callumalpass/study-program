# Infrastructure as Code

## Introduction

Infrastructure as Code (IaC) treats infrastructure configuration as software—versioned, reviewed, and deployed through the same processes as application code. Rather than manually clicking through cloud provider dashboards to configure servers, databases, and networks, you define infrastructure in configuration files that can be tested, versioned in git, and automatically deployed. This approach brings software engineering discipline to infrastructure management, enabling reproducible deployments, disaster recovery, and collaborative infrastructure changes.

For capstone projects, IaC might seem excessive—you're building one application, not managing hundreds of servers. However, even small projects benefit from documented, reproducible infrastructure. IaC ensures you can recreate your environment if something breaks, that team members can set up local development identically, and that you can migrate between cloud providers without starting from scratch. Modern platforms have made IaC accessible through simple configuration files rather than complex orchestration tools. Understanding environment management, secrets handling, and infrastructure configuration demonstrates professional operations knowledge that employers value.

## Environment Management Fundamentals

Applications run in multiple environments with different configurations. Your development environment connects to a local database and exposes debug tools. Staging mirrors production but uses test data and separate services. Production serves real users with security hardened and performance optimized.

Environment-specific configuration is managed through environment variables—dynamic values loaded at runtime rather than hardcoded. The twelve-factor app methodology recommends strict separation between code (which doesn't change between environments) and config (which does). Environment variables store database URLs, API keys, feature flags, and any value that differs across environments.

Create a `.env.example` file documenting required variables without sensitive values:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379

# API Keys (get from respective dashboards)
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
SENTRY_DSN=https://...

# Feature Flags
ENABLE_BETA_FEATURES=false
MAINTENANCE_MODE=false

# Application
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

Team members copy this to `.env` (which is gitignored) and fill in actual values. This documents configuration requirements without exposing secrets.

## Managing Secrets Securely

Secrets—API keys, database passwords, encryption keys—require special handling. Never commit secrets to git, even in private repositories. Git history is permanent; once committed, a secret is compromised forever.

For local development, use `.env` files loaded with libraries like `dotenv`:

```typescript
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Validate required variables
const requiredEnvVars = [
  'DATABASE_URL',
  'REDIS_URL',
  'STRIPE_SECRET_KEY',
  'SENTRY_DSN',
];

const missingEnvVars = requiredEnvVars.filter(
  varName => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`  - ${varName}`));
  process.exit(1);
}

// Export typed configuration
export const config = {
  database: {
    url: process.env.DATABASE_URL!,
  },
  redis: {
    url: process.env.REDIS_URL!,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY!,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN!,
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000'),
    logLevel: process.env.LOG_LEVEL || 'info',
  },
} as const;
```

This centralized configuration module validates required variables on startup, failing fast with clear error messages if configuration is incomplete. TypeScript types ensure configuration is used correctly throughout the application.

For production, use your platform's secret management. Cloud providers encrypt secrets and expose them only to running applications. Vercel, Railway, and similar platforms provide secret management through their dashboards or CLI:

```bash
# Vercel
vercel env add DATABASE_URL production
vercel env add STRIPE_SECRET_KEY production

# Railway
railway variables set DATABASE_URL=postgresql://...
railway variables set STRIPE_SECRET_KEY=sk_live_...
```

Secrets are encrypted at rest and in transit, never appear in logs, and can be rotated without code changes.

## Infrastructure Configuration Files

Modern platforms use configuration files to define build and deployment behavior. These files document infrastructure requirements and ensure consistent deployments.

**package.json engines**: Specify Node.js version requirements:

```json
{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
```

Platforms use this to provision the correct runtime. Version mismatches between development and production cause subtle bugs—explicit version requirements prevent this.

**Vercel configuration** (`vercel.json`):

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci",
  "devCommand": "npm run dev",

  "env": {
    "VITE_API_URL": "@api_url",
    "VITE_SENTRY_DSN": "@sentry_dsn"
  },

  "regions": ["iad1"],

  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },

  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://myapp.com"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ],

  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

This configuration defines build commands, environment variables, function limits, CORS headers, and redirects. Everything is versioned in git, changes are reviewed through pull requests, and deployments are reproducible.

**Docker Compose** for local infrastructure:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-myapp_dev}
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
    ports:
      - "${POSTGRES_PORT:-5432}:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "${REDIS_PORT:-6379}:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  maildev:
    image: maildev/maildev
    ports:
      - "1080:1080"  # Web UI
      - "1025:1025"  # SMTP
    environment:
      MAILDEV_INCOMING_USER: dev
      MAILDEV_INCOMING_PASS: dev

volumes:
  postgres_data:
  redis_data:
```

This defines local development infrastructure. New team members run `docker compose up` to get a complete development environment—database, cache, and email server—without manual setup.

## Scaling Considerations

Even capstone projects should consider basic scaling principles. Most modern platforms auto-scale based on traffic, but application architecture affects scalability.

**Stateless Applications**: Don't store session data in memory or write to local disk (except for temporary files). Use external session stores like Redis or database-backed sessions. This allows scaling horizontally—adding more application instances—without worrying about which instance handles requests.

```typescript
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

await redisClient.connect();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));
```

**Database Connection Pooling**: Opening database connections is expensive. Use connection pools to reuse connections:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool for queries
export const query = (text: string, params?: any[]) =>
  pool.query(text, params);
```

**Caching**: Cache expensive computations and external API calls:

```typescript
import { createClient } from 'redis';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

async function getProductDetails(productId: string) {
  // Check cache first
  const cached = await redis.get(`product:${productId}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Cache miss - fetch from database
  const product = await db.query(
    'SELECT * FROM products WHERE id = $1',
    [productId]
  );

  // Cache for 1 hour
  await redis.setEx(
    `product:${productId}`,
    3600,
    JSON.stringify(product)
  );

  return product;
}
```

## Key Takeaways

- Infrastructure as Code makes infrastructure reproducible, versionable, and reviewable
- Environment variables separate configuration from code, enabling environment-specific settings
- Never commit secrets to git—use platform secret management for production
- Validate required environment variables on application startup with clear error messages
- Use configuration files to document infrastructure requirements
- Docker Compose provides reproducible local development environments
- Design stateless applications that can scale horizontally
- Connection pooling and caching optimize performance and enable scaling

## Common Mistakes

### Mistake 1: Hardcoded Configuration
**Problem:** Database URLs, API endpoints, and feature flags are hardcoded in source files. Deploying to different environments requires code changes, and secrets are exposed in git.

**Solution:** Move all configuration to environment variables. Create a central configuration module that loads and validates environment variables. Use `.env.example` to document required variables.

### Mistake 2: Committed Secrets
**Problem:** Someone commits `.env` with production database password to git. Even after deleting in a later commit, it remains in git history.

**Solution:** Add `.env` to `.gitignore` immediately when starting the project. Use `git-secrets` or similar tools to prevent accidental commits. If a secret is committed, consider it compromised—rotate it immediately.

### Mistake 3: Different Dev Environments
**Problem:** Team members have different Node.js versions, database versions, or configuration. "Works on my machine" bugs proliferate.

**Solution:** Use Docker Compose for local development. Specify exact versions in `package.json` engines. Document setup in README with specific version requirements.

### Mistake 4: Missing Environment Variables
**Problem:** Application deploys successfully but crashes because required environment variables aren't set. Error messages are cryptic.

**Solution:** Validate required environment variables on startup. Fail fast with clear messages listing missing variables. Many platforms show environment variable warnings during deployment.

### Mistake 5: Production Secrets in Code Reviews
**Problem:** Pull requests include production API keys or database passwords in configuration examples or debug code.

**Solution:** Never include real secrets in code, even in comments. Use dummy values in examples. Configure GitHub to scan for secrets and block commits containing them.

## Additional Resources

- [The Twelve-Factor App](https://12factor.net/)
- [dotenv Documentation](https://github.com/motdotla/dotenv)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Railway Environment Variables](https://docs.railway.app/develop/variables)
- [git-secrets](https://github.com/awslabs/git-secrets) - Prevent committing secrets to git
