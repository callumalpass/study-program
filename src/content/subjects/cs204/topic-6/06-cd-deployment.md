# Continuous Delivery and Deployment

Continuous Delivery (CD) extends Continuous Integration by ensuring code is always in a deployable state. Continuous Deployment takes this further by automatically deploying every change that passes the automated pipeline. Together, these practices enable rapid, reliable software delivery.

## Continuous Delivery vs Continuous Deployment

### Continuous Delivery

Code is automatically built, tested, and prepared for release to production, but deployment requires manual approval. The software is always ready to deploy, but humans decide when.

```
Commit → Build → Test → Stage → [Manual Approval] → Production
```

Benefits:
- Business decides release timing
- Regulatory compliance easier
- Risk management through controlled releases
- Suitable for most organizations

### Continuous Deployment

Every change that passes automated tests is automatically deployed to production without human intervention.

```
Commit → Build → Test → Stage → Production (automatic)
```

Benefits:
- Fastest possible delivery
- No release planning overhead
- Immediate user feedback
- Forces excellent automation and testing

Most organizations practice Continuous Delivery, reserving Continuous Deployment for specific contexts like SaaS products with sophisticated automation.

## Deployment Pipeline

A deployment pipeline is an automated manifestation of your process for getting software from version control into production. It provides visibility, feedback, and control.

```mermaid
flowchart TD
    A[Code Commit] --> B[Commit Stage]
    B --> C{Quick Tests<br/>Pass?}
    C -->|No| X[Fail Fast]
    C -->|Yes| D[Acceptance Tests]
    D --> E{Integration<br/>Tests Pass?}
    E -->|No| X
    E -->|Yes| F[Performance Tests]
    F --> G{Performance<br/>Acceptable?}
    G -->|No| X
    G -->|Yes| H[Deploy to Staging]
    H --> I[Smoke Tests]
    I --> J{Staging<br/>Healthy?}
    J -->|No| X
    J -->|Yes| K{Manual<br/>Approval}
    K -->|Reject| X
    K -->|Approve| L[Deploy to Production]
    L --> M[Production<br/>Smoke Tests]
    M --> N{Production<br/>Healthy?}
    N -->|No| O[Rollback]
    N -->|Yes| P[Success]

    style B fill:#e3f2fd
    style D fill:#e1f5fe
    style F fill:#fff3e0
    style H fill:#e8f5e9
    style L fill:#c8e6c9
    style X fill:#ffcdd2
    style P fill:#a5d6a7
```

### Pipeline Stages

#### 1. Commit Stage

Triggered on every commit. Runs quickly (under 10 minutes).

```yaml
# .github/workflows/commit-stage.yml
name: Commit Stage

on: [push, pull_request]

jobs:
  commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup environment
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Run unit tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v2
        with:
          name: dist
          path: dist/
```

#### 2. Acceptance Testing Stage

Runs comprehensive tests including integration and end-to-end tests.

```yaml
acceptance:
  needs: commit
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:14
      env:
        POSTGRES_PASSWORD: postgres
      options: >-
        --health-cmd pg_isready
        --health-interval 10s

  steps:
    - uses: actions/checkout@v2

    - name: Download build artifacts
      uses: actions/download-artifact@v2
      with:
        name: dist

    - name: Run integration tests
      run: npm run test:integration
      env:
        DATABASE_URL: postgresql://postgres:postgres@postgres:5432/test

    - name: Run E2E tests
      run: npm run test:e2e
```

#### 3. Performance Testing Stage

Validates system performance under load.

```yaml
performance:
  needs: acceptance
  runs-on: ubuntu-latest
  steps:
    - name: Run load tests
      run: |
        npm install -g artillery
        artillery run load-test.yml

    - name: Check performance thresholds
      run: |
        if [ "$RESPONSE_TIME_95TH" -gt 500 ]; then
          echo "Performance degradation detected"
          exit 1
        fi
```

#### 4. Staging Deployment

Deploy to production-like environment for final validation.

```yaml
deploy-staging:
  needs: performance
  runs-on: ubuntu-latest
  environment:
    name: staging
    url: https://staging.example.com
  steps:
    - name: Deploy to staging
      run: |
        ./deploy.sh staging
        ./smoke-test.sh staging
```

#### 5. Production Deployment

Final deployment to production.

```yaml
deploy-production:
  needs: deploy-staging
  runs-on: ubuntu-latest
  environment:
    name: production
    url: https://example.com
  steps:
    - name: Deploy to production
      run: |
        ./deploy.sh production
        ./smoke-test.sh production

    - name: Run smoke tests
      run: npm run test:smoke

    - name: Notify team
      run: |
        curl -X POST $SLACK_WEBHOOK \
          -d "{'text':'Deployed v$VERSION to production'}"
```

## Deployment Strategies

### Blue-Green Deployment

Maintain two identical production environments: Blue (current) and Green (new). Deploy to Green, test, then switch traffic.

```mermaid
flowchart TD
    subgraph Before["Before Deployment"]
        LB1[Load Balancer] --> BLUE1[Blue Environment<br/>v1.0 LIVE]
        LB1 -.->|Idle| GREEN1[Green Environment<br/>v1.0]
    end

    subgraph During["During Deployment"]
        LB2[Load Balancer] --> BLUE2[Blue Environment<br/>v1.0 LIVE]
        LB2 -.->|Deploying| GREEN2[Green Environment<br/>v2.0 Testing]
    end

    subgraph After["After Switch"]
        LB3[Load Balancer] -.->|Idle| BLUE3[Blue Environment<br/>v1.0 Standby]
        LB3 --> GREEN3[Green Environment<br/>v2.0 LIVE]
    end

    Before --> During --> After

    style BLUE1 fill:#90caf9
    style GREEN1 fill:#a5d6a7,stroke-dasharray: 5 5
    style BLUE2 fill:#90caf9
    style GREEN2 fill:#fff59d
    style BLUE3 fill:#90caf9,stroke-dasharray: 5 5
    style GREEN3 fill:#a5d6a7
```

```bash
# Deploy to green environment
./deploy.sh green

# Run smoke tests on green
./smoke-test.sh green

# Switch router from blue to green
./switch-traffic.sh green

# Keep blue as backup for quick rollback if needed
# After confidence period, blue becomes the next green
```

**Advantages**:
- Instant rollback (switch back to blue)
- Zero downtime
- Test in production environment before switching

**Disadvantages**:
- Requires double infrastructure
- Database migrations can be complex
- Requires sophisticated routing

### Canary Deployment

Gradually roll out changes to a small subset of users before full deployment.

```yaml
# deployment.yml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-stable
spec:
  replicas: 9
  template:
    metadata:
      labels:
        app: myapp
        version: stable
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-canary
spec:
  replicas: 1  # 10% of traffic
  template:
    metadata:
      labels:
        app: myapp
        version: canary
```

**Process**:
1. Deploy new version to 10% of servers
2. Monitor metrics (errors, latency, business metrics)
3. Gradually increase percentage (10% → 25% → 50% → 100%)
4. Rollback if issues detected

**Advantages**:
- Reduced risk
- Real production testing
- Gradual rollout

**Disadvantages**:
- More complex deployment
- Requires monitoring
- Two versions running simultaneously

### Rolling Deployment

Update instances one (or a few) at a time.

```bash
#!/bin/bash
# rolling-deploy.sh

SERVERS=("server1" "server2" "server3" "server4")

for SERVER in "${SERVERS[@]}"; do
  echo "Deploying to $SERVER..."

  # Remove from load balancer
  ./lb-remove.sh $SERVER

  # Deploy new version
  ssh $SERVER "cd /app && git pull && npm install && pm2 restart app"

  # Health check
  ./health-check.sh $SERVER

  # Add back to load balancer
  ./lb-add.sh $SERVER

  # Wait before next server
  sleep 30
done
```

**Advantages**:
- No extra infrastructure needed
- Gradual rollout
- Can pause/stop if issues arise

**Disadvantages**:
- Slower deployment
- Multiple versions running during deployment
- Requires careful handling of breaking changes

### Feature Flags

Deploy code to production but hide it behind toggles, enabling/disabling features independently of deployment.

```javascript
// feature-flags.js
const featureFlags = {
  newCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true',
  darkMode: process.env.FEATURE_DARK_MODE === 'true'
};

// In code
function checkout() {
  if (featureFlags.newCheckout) {
    return newCheckoutFlow();
  } else {
    return legacyCheckoutFlow();
  }
}
```

More sophisticated approach with gradual rollout:

```javascript
// Using a feature flag service like LaunchDarkly
import * as LaunchDarkly from 'launchdarkly-node-client-sdk';

const client = LaunchDarkly.initialize('your-client-id', user);

if (await client.variation('new-checkout', false)) {
  return newCheckoutFlow();
} else {
  return legacyCheckoutFlow();
}
```

**Advantages**:
- Decouple deployment from release
- A/B testing capability
- Quick rollback without redeployment
- Gradual rollout to specific users

**Disadvantages**:
- Code complexity
- Technical debt (old flags)
- Testing complexity (multiple code paths)

## Environment Management

### Environment Types

**Development**: Developer local machines. Frequent changes, individual experimentation.

**CI/CD**: Automated build and test environment. Clean, reproducible builds.

**Staging**: Production-like environment for final testing. Should mirror production closely.

**Production**: Live environment serving real users. Stable, monitored, backed up.

Some organizations add:
- **QA**: Dedicated testing environment
- **UAT**: User Acceptance Testing environment
- **Pre-production**: Final staging before production

### Environment Parity

Keep environments as similar as possible to catch environment-specific issues:

**Infrastructure**: Same OS, versions, configurations
**Data**: Production-like data volume and characteristics (anonymized)
**Services**: Same dependencies and versions
**Configuration**: Same settings (different credentials)

### Configuration Management

Never hardcode environment-specific values. Use configuration:

```javascript
// config.js
module.exports = {
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  api: {
    url: process.env.API_URL,
    timeout: process.env.API_TIMEOUT || 5000
  },
  features: {
    newCheckout: process.env.FEATURE_NEW_CHECKOUT === 'true'
  }
};
```

Environment variables for each environment:

```bash
# .env.development
DB_HOST=localhost
DB_PORT=5432
API_URL=http://localhost:3000

# .env.staging
DB_HOST=staging-db.internal
DB_PORT=5432
API_URL=https://api-staging.example.com

# .env.production
DB_HOST=prod-db.internal
DB_PORT=5432
API_URL=https://api.example.com
```

### Secrets Management

Never commit secrets to version control. Use secret management tools:

**Environment Variables**: Basic approach, good for simple cases.

**Cloud Provider Secret Managers**:
- AWS Secrets Manager
- Azure Key Vault
- Google Cloud Secret Manager

**Dedicated Tools**:
- HashiCorp Vault
- Doppler
- 1Password Secrets Automation

```yaml
# GitHub Actions with secrets
deploy:
  runs-on: ubuntu-latest
  steps:
    - name: Deploy
      env:
        DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
        API_KEY: ${{ secrets.API_KEY }}
      run: ./deploy.sh
```

## Rollback Strategies

Always have a rollback plan.

### Quick Rollback

Keep previous version available for instant revert:

```bash
# Blue-green switch back
./switch-traffic.sh blue

# Or redeploy previous version
./deploy.sh production v1.2.3

# Or use container orchestration
kubectl rollout undo deployment/myapp
```

### Database Rollback

Database changes are trickiest to rollback.

**Backward Compatible Migrations**: Make changes in phases:

```sql
-- Phase 1: Add new column (nullable)
ALTER TABLE users ADD COLUMN email_new VARCHAR(255);

-- Deploy code that writes to both email and email_new
-- Wait for all instances to deploy

-- Phase 2: Backfill data
UPDATE users SET email_new = email WHERE email_new IS NULL;

-- Phase 3: Make non-nullable after validation
ALTER TABLE users ALTER COLUMN email_new SET NOT NULL;

-- Phase 4: Drop old column
-- Deploy code that only uses email_new
ALTER TABLE users DROP COLUMN email;
ALTER TABLE users RENAME COLUMN email_new TO email;
```

This allows rollback at any phase without data loss.

## Monitoring and Observability

Deploy is not done when code reaches production—you must verify it works.

### Health Checks

Endpoint that verifies system health:

```javascript
app.get('/health', async (req, res) => {
  try {
    // Check database
    await db.query('SELECT 1');

    // Check external dependencies
    await fetch('https://api.external.com/health');

    res.status(200).json({
      status: 'healthy',
      version: process.env.VERSION,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

### Smoke Tests

Quick tests run after deployment to verify basic functionality:

```bash
#!/bin/bash
# smoke-test.sh

ENV=$1
BASE_URL="https://$ENV.example.com"

# Test homepage loads
curl -f "$BASE_URL" || exit 1

# Test API responds
curl -f "$BASE_URL/api/health" || exit 1

# Test authentication works
TOKEN=$(curl -X POST "$BASE_URL/api/login" \
  -d '{"user":"test","pass":"test"}' | jq -r .token)
[ -n "$TOKEN" ] || exit 1

echo "Smoke tests passed!"
```

### Metrics and Alerts

Monitor key metrics:
- Response times
- Error rates
- Throughput
- Resource utilization

Alert on anomalies after deployment.

## Conclusion

Continuous Delivery and Deployment practices enable rapid, reliable software delivery. Deployment pipelines automate the path from code to production, deployment strategies minimize risk, and proper environment and configuration management ensure consistency. Combined with monitoring and rollback capabilities, these practices allow teams to deploy frequently with confidence.
