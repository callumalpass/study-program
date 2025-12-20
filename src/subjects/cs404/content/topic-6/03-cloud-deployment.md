# Cloud Deployment

## Introduction

Cloud deployment transforms your local development project into a live application accessible to users worldwide. Modern cloud platforms like Vercel, Netlify, Render, and Railway have revolutionized deployment by abstracting away infrastructure complexity. What once required configuring servers, setting up load balancers, and managing databases now happens with a git push. These platforms offer generous free tiers perfect for capstone projects and small-scale production applications.

The key insight of modern cloud platforms is that they optimize for developer experience while maintaining production-grade reliability and performance. Rather than learning AWS's hundreds of services or configuring Kubernetes clusters, you connect your GitHub repository, define a few environment variables, and your application is live in minutes. This democratization of deployment means student projects can achieve the same deployment quality as applications built by large engineering teams. Understanding cloud deployment is essential for modern software engineers—it's the bridge between code on your laptop and value delivered to users.

## Choosing a Deployment Platform

Different platforms excel at different use cases. Vercel pioneered the "git push to deploy" model and remains the best choice for frontend applications and Next.js projects. Vercel's edge network provides exceptional performance for static sites and server-rendered React applications. Their preview deployments create a unique URL for every pull request, enabling stakeholders to review changes before merging.

Railway excels at full-stack applications with databases. It provides managed PostgreSQL, Redis, and MySQL with zero configuration. Railway's killer feature is its project-based model—your application, database, and related services exist as a single project with shared environment variables and networking. This makes it ideal for capstone projects that need persistent data storage.

Render offers a middle ground with support for web services, static sites, PostgreSQL databases, and cron jobs. It's particularly strong for background workers and scheduled tasks. Render's free tier includes 750 hours per month of compute time, enough for continuous uptime of a small application.

Netlify focuses on frontend and static sites with exceptional build performance and integrated form handling. Their edge functions run serverless code globally for dynamic functionality. Netlify shines for content-heavy sites and applications built with static site generators.

## Deploying to Vercel

Vercel deployment is straightforward for any frontend framework. For a React or TypeScript application, create a `vercel.json` configuration file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

This configuration tells Vercel how to build your application. The `rewrites` section handles client-side routing—all routes serve `index.html`, allowing React Router or similar libraries to handle navigation. Headers configure caching for static assets. Environment variables use Vercel's secret syntax (`@variable_name`) to reference values defined in the dashboard.

Deploy by connecting your GitHub repository through Vercel's dashboard or using the CLI:

```bash
npm install -g vercel
vercel login
vercel
```

The CLI interactively prompts for project settings, then deploys. Subsequent deployments happen automatically on git push. Vercel automatically provisions SSL certificates, provides a CDN, and enables instant rollbacks.

## Deploying Full-Stack Applications to Railway

Railway's project-based approach makes deploying applications with databases simple. After connecting your GitHub repository, Railway automatically detects your application type and provides appropriate build commands. For a Node.js application with PostgreSQL:

1. Create a new project on Railway
2. Add your GitHub repository as a service
3. Add a PostgreSQL database from the service menu
4. Railway automatically sets `DATABASE_URL` environment variable
5. Configure environment variables in the Railway dashboard

Railway's `railway.json` provides additional configuration:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Nixpacks is Railway's build system that automatically detects your stack and installs dependencies. The healthcheck ensures your application is running before routing traffic. Railway's restart policy automatically recovers from crashes.

For database migrations, use Railway's build command to run migrations before starting:

```json
{
  "build": {
    "buildCommand": "npm run build && npm run migrate"
  }
}
```

This ensures your database schema is current before the new version launches.

## Environment Variables and Secrets

All cloud platforms provide environment variable management, but approaches differ. Vercel distinguishes between production, preview, and development environments. Variables can be scoped to specific environments:

```bash
# Production only
vercel env add STRIPE_SECRET_KEY production

# All environments
vercel env add API_URL
```

Railway uses a single environment per service but supports multiple services. Environment variables are shared across all deployments of a service. Reference variables from other services using template syntax:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}
```

Never commit secrets to git. Use environment variables for all sensitive configuration. Most platforms support `.env` file upload for bulk configuration, but verify these aren't committed to version control.

## Custom Domains and SSL

All major platforms provide free SSL certificates through Let's Encrypt. Adding a custom domain is straightforward:

1. Add domain in platform dashboard
2. Configure DNS with your domain registrar
3. Platform automatically provisions SSL certificate

For Vercel, add domain to project settings and configure DNS:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

SSL certificates renew automatically. Platforms handle certificate management, HTTP to HTTPS redirects, and domain routing.

## Zero-Downtime Deployments

Modern platforms implement zero-downtime deployments by default. When you deploy a new version:

1. Platform builds the new version
2. Runs health checks
3. Gradually shifts traffic from old to new version
4. Old version continues serving requests during transition
5. Old version terminates once all traffic migrates

This happens automatically without configuration. Some platforms like Render allow configuring health check endpoints:

```yaml
services:
  - type: web
    name: myapp
    env: node
    buildCommand: npm run build
    startCommand: npm start
    healthCheckPath: /health
```

The health check endpoint should verify critical dependencies:

```typescript
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'healthy' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});
```

If health checks fail, the platform doesn't route traffic to the new version.

## Key Takeaways

- Modern cloud platforms like Vercel and Railway enable deployment with minimal configuration
- Choose platforms based on your stack—Vercel for frontend, Railway for full-stack with databases
- Git push triggers automatic deployment, testing, and rollout
- Environment variables store configuration and secrets, never commit them to git
- Platforms provide free SSL certificates and CDN for production performance
- Preview deployments create unique URLs for every pull request
- Health checks ensure new versions are working before receiving traffic
- Zero-downtime deployments happen automatically without complex orchestration

## Common Mistakes

### Mistake 1: Hardcoded Configuration
**Problem:** API URLs, database connections, and third-party service keys are hardcoded in source files. This breaks when deploying to different environments and exposes secrets in git history.

**Solution:** Use environment variables for all configuration. Reference them in code using `process.env.VARIABLE_NAME` (Node.js) or `import.meta.env.VITE_VARIABLE_NAME` (Vite). Create `.env.example` with dummy values as documentation, but never commit actual `.env` files.

### Mistake 2: Missing Build Configuration
**Problem:** Your app works locally but fails to build on the platform. Common issues include missing build scripts, incorrect output directories, or dev dependencies in production.

**Solution:** Test builds locally with `npm run build`. Ensure `package.json` includes all necessary build dependencies. Verify the output directory matches platform configuration. Check build logs for specific errors—platforms show detailed build output.

### Mistake 3: Database Connection Issues
**Problem:** Your application can't connect to the database in production despite working locally. Connection strings, SSL requirements, or network configuration differ between environments.

**Solution:** Use the exact database URL format provided by the platform. Most managed databases require SSL—configure your database client appropriately. Test connections using the platform's shell or temporary debug endpoints before deploying full functionality.

### Mistake 4: Environment Variable Typos
**Problem:** Your application crashes in production due to missing or misspelled environment variables. Locally these are defined in `.env`, but production doesn't have them.

**Solution:** Create a checklist of required environment variables. Many platforms show warnings for variables referenced in code but not defined. Create a validation script that runs at startup and fails fast if required variables are missing:

```typescript
const requiredEnvVars = ['DATABASE_URL', 'API_KEY', 'SECRET_TOKEN'];
const missing = requiredEnvVars.filter(v => !process.env[v]);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}
```

### Mistake 5: No Health Checks
**Problem:** Deployments succeed even when the application is broken. Traffic routes to non-functional instances, causing downtime.

**Solution:** Implement a health check endpoint that verifies critical functionality. Test database connectivity, required environment variables, and external service availability. Configure platform health checks to use this endpoint.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [The Twelve-Factor App](https://12factor.net/) - Methodology for cloud-native applications
