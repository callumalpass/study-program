# Deployment

Deployment is the process of making your web application available to users. Modern deployment involves build optimization, hosting selection, continuous integration/continuous deployment (CI/CD), and environment management. Understanding deployment strategies and tools is essential for delivering applications to production.

## Build Process

Preparing your application for production deployment.

```bash
# React build
npm run build
# Creates optimized production build in 'build' folder
# - Minified JavaScript
# - Optimized assets
# - Generated index.html

# Vue build
npm run build
# Creates production build in 'dist' folder

# Next.js build
npm run build
npm start
# Builds and starts production server

# Vite build
npm run build
npm run preview
# Build and preview production build locally

# Build output typically includes:
# - Minified JavaScript bundles
# - Minified CSS
# - Optimized images
# - Source maps (optional)
# - Asset manifest
```

## Static Hosting

Hosting static sites (HTML, CSS, JavaScript).

```javascript
// Static hosting platforms:
// - Netlify
// - Vercel
// - GitHub Pages
// - Cloudflare Pages
// - AWS S3 + CloudFront
// - Firebase Hosting

// netlify.toml configuration
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

// vercel.json configuration
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "@api_url"
  }
}

// package.json for GitHub Pages
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}

// Deploy to GitHub Pages
npm run deploy
```

## Netlify

Popular platform for static sites and serverless functions.

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod

# Environment variables
netlify env:set API_KEY your-api-key

# netlify.toml - Advanced configuration
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[context.production]
  environment = { NODE_ENV = "production" }

[context.deploy-preview]
  command = "npm run build:preview"

[context.branch-deploy]
  command = "npm run build:staging"

# Redirects and rewrites
[[redirects]]
  from = "/api/*"
  to = "https://api.example.com/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301

# Serverless function (netlify/functions/hello.js)
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify Functions!' })
  };
};
```

## Vercel

Optimized for Next.js and frontend frameworks.

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# Environment variables
vercel env add API_KEY

# vercel.json configuration
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "@api_url",
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}

// Serverless functions (api/hello.js)
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Vercel!' });
}

// Edge functions (middleware.js)
import { NextResponse } from 'next/server';

export function middleware(request) {
  const country = request.geo.country;
  return NextResponse.rewrite(new URL(`/${country}`, request.url));
}
```

## CI/CD Pipelines

Automating the build, test, and deployment process.

```yaml
# GitHub Actions (.github/workflows/deploy.yml)
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}

# GitLab CI (.gitlab-ci.yml)
image: node:18

stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm run lint
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=build
  only:
    - main
  environment:
    name: production
    url: https://myapp.netlify.app

# CircleCI (.circleci/config.yml)
version: 2.1

orbs:
  node: circleci/node@5.0.0

jobs:
  test:
    executor: node/default
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Run tests
          command: npm test

  build:
    executor: node/default
    steps:
      - checkout
      - node/install-packages
      - run:
          name: Build
          command: npm run build
      - persist_to_workspace:
          root: .
          paths:
            - build

  deploy:
    executor: node/default
    steps:
      - checkout
      - attach_workspace:
          at: .
      - run:
          name: Deploy
          command: |
            npm install -g netlify-cli
            netlify deploy --prod --dir=build

workflows:
  test-build-deploy:
    jobs:
      - test
      - build:
          requires:
            - test
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: main
```

## Environment Variables

Managing configuration across environments.

```javascript
// .env files (not committed to git)
// .env.local
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_DEBUG=true

// .env.production
REACT_APP_API_URL=https://api.example.com
REACT_APP_DEBUG=false

// Using in React
const apiUrl = process.env.REACT_APP_API_URL;
const isDebug = process.env.REACT_APP_DEBUG === 'true';

fetch(`${apiUrl}/users`)
  .then(res => res.json())
  .then(data => console.log(data));

// Vite environment variables
// .env
VITE_API_URL=http://localhost:8080/api

// Using in code
const apiUrl = import.meta.env.VITE_API_URL;

// Next.js environment variables
// .env.local (server and client)
NEXT_PUBLIC_API_URL=http://localhost:8080/api

// .env.production
NEXT_PUBLIC_API_URL=https://api.example.com

// Server-only variables (no NEXT_PUBLIC_ prefix)
DATABASE_URL=postgresql://localhost/db
SECRET_KEY=secret123

// Using in code
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Platform-specific environment variables
// Netlify: Site settings -> Environment variables
// Vercel: Project settings -> Environment Variables
// GitHub Actions: Repository settings -> Secrets

// Accessing in CI/CD
{
  "env": {
    "API_URL": "${{ secrets.API_URL }}",
    "DATABASE_URL": "${{ secrets.DATABASE_URL }}"
  }
}
```

## Docker Deployment

Containerizing applications for consistent deployments.

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]

# Multi-stage build for smaller images
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_URL=http://api:8080
    depends_on:
      - api

  api:
    image: myapi:latest
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://db:5432/mydb

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_PASSWORD=password
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:

# Build and run
docker build -t myapp .
docker run -p 3000:3000 myapp

# Using docker-compose
docker-compose up
docker-compose up -d  # Detached mode
```

## Performance Optimization

Optimizing for production deployment.

```javascript
// 1. Code splitting
// Dynamic imports
const AdminPanel = lazy(() => import('./AdminPanel'));

// 2. Asset optimization
// Compress images (use tools like imagemin)
// Use modern formats (WebP, AVIF)
// Lazy load images
<img loading="lazy" src="image.jpg" alt="Description" />

// 3. Caching strategies
// Service worker for offline support
// public/service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/main.js',
        '/static/css/main.css'
      ]);
    })
  );
});

// 4. CDN for static assets
// Use CDN for libraries
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>

// 5. Compression
// Enable gzip/brotli on server
// Netlify and Vercel do this automatically

// 6. Minification
// Webpack production mode handles this
mode: 'production'

// 7. Tree shaking
// Remove unused code
import { debounce } from 'lodash'; // Bad - imports entire lodash
import debounce from 'lodash/debounce'; // Good - only imports debounce

// 8. Bundle analysis
// Analyze bundle size
npm run build
npx webpack-bundle-analyzer dist/stats.json

// 9. Preload critical resources
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin />

// 10. HTTP/2 and HTTP/3
// Most modern hosting platforms support this automatically
```

## Monitoring and Analytics

Tracking application performance and errors in production.

```javascript
// Google Analytics
// public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

// Error tracking with Sentry
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Performance monitoring
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = '/analytics';

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);

// Uptime monitoring
// Services: Pingdom, UptimeRobot, StatusCake
// Set up monitors to check site availability

// Log aggregation
// Services: Loggly, Papertrail, LogDNA
console.log('Application started');
console.error('Error occurred:', error);
```

## Deployment Checklist

```javascript
const deploymentChecklist = {
  preDeploy: [
    'Run all tests',
    'Check for console errors',
    'Verify environment variables',
    'Update dependencies',
    'Run security audit (npm audit)',
    'Test in production mode locally',
    'Review code changes',
    'Update documentation'
  ],

  build: [
    'Build passes successfully',
    'No build warnings',
    'Assets optimized',
    'Source maps generated (if needed)',
    'Bundle size acceptable'
  ],

  deployment: [
    'Choose appropriate hosting',
    'Configure domain/SSL',
    'Set up redirects',
    'Configure CORS',
    'Set security headers',
    'Enable compression',
    'Configure CDN'
  ],

  postDeploy: [
    'Verify site is accessible',
    'Test critical user flows',
    'Check console for errors',
    'Verify analytics working',
    'Test on different devices',
    'Check performance metrics',
    'Monitor error tracking',
    'Verify environment variables'
  ],

  monitoring: [
    'Set up uptime monitoring',
    'Configure error tracking',
    'Enable performance monitoring',
    'Set up alerts',
    'Monitor resource usage',
    'Check analytics dashboard'
  ]
};
```

## Rollback Strategy

```bash
# Git-based rollback
git log  # Find previous working commit
git revert <commit-hash>
git push

# Netlify rollback
netlify deploy --alias previous-version
netlify deploy --prod  # After verification

# Vercel rollback
vercel inspect <deployment-url>
vercel promote <deployment-url>

# Docker rollback
docker ps  # Find current container
docker stop <container-id>
docker run <previous-image>

# Feature flags for gradual rollout
// Using a feature flag service
const isNewFeatureEnabled = featureFlags.isEnabled('new-feature');

if (isNewFeatureEnabled) {
  // New feature code
} else {
  // Old code
}

// Canary deployment
// Deploy to small percentage of users first
// Gradually increase if no issues
```

## Conclusion

Deployment involves more than just uploading files to a server. Modern deployment includes build optimization, choosing appropriate hosting platforms, implementing CI/CD pipelines, managing environment variables, and monitoring production applications. Platforms like Netlify and Vercel simplify static hosting with automatic builds and deployments, while CI/CD tools automate testing and deployment workflows. Understanding these concepts and tools enables you to deliver applications reliably and maintain them effectively in production environments.
