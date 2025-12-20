---
id: cs404-t6-rollback
title: "Rollback Strategies"
order: 7
---

# Rollback Strategies

Rollback strategies are your safety net for deployments. When something goes wrong in production—and eventually it will—the ability to quickly revert to a known-good state minimizes downtime and user impact. Planning and testing rollback procedures before you need them is essential for production-ready software.

## Why Rollback Planning Matters

Deployments can fail in ways that testing does not catch. A bug might only appear under production load. An external service dependency might behave differently than in staging. A database migration might corrupt data in edge cases. Configuration differences between environments can cause unexpected behavior.

When these failures occur, you need to restore service quickly. Every minute of downtime costs user trust and, in commercial contexts, revenue. A well-planned rollback procedure can restore service in minutes rather than hours.

For capstone projects, demonstrating rollback capability shows evaluators that you understand production operations. It also provides a safety net that makes deploying updates less stressful.

## Rollback Approaches

### Application Rollback

The simplest rollback reverts the deployed application code to a previous version while keeping everything else (database, configuration) unchanged.

For container-based deployments, this means switching to a previous container image:

```bash
# Kubernetes rollback to previous deployment
kubectl rollout undo deployment/myapp

# Or rollback to a specific revision
kubectl rollout undo deployment/myapp --to-revision=3

# Docker Compose: update image tag and redeploy
docker-compose up -d --no-deps myapp
```

For traditional server deployments, keep previous versions available:

```bash
# Symlink-based deployment structure
/var/www/myapp/
├── releases/
│   ├── 20250101120000/  # Previous release
│   ├── 20250115120000/  # Current release
│   └── 20250120120000/  # Failed release
├── current -> releases/20250115120000/  # Symlink to current
└── shared/  # Shared files (uploads, logs)

# Rollback by updating symlink
ln -sfn /var/www/myapp/releases/20250101120000 /var/www/myapp/current
systemctl restart myapp
```

### Database Rollback

Database changes are more complex because they often cannot simply be undone. Once data is modified or deleted, restoring it requires backups or specific reversal logic.

**Migration Down Scripts**: Write reversible migrations:

```typescript
// Migration: Add status column to orders table
export async function up(db: Database): Promise<void> {
  await db.query(`
    ALTER TABLE orders
    ADD COLUMN status VARCHAR(50) DEFAULT 'pending'
  `);
}

export async function down(db: Database): Promise<void> {
  await db.query(`
    ALTER TABLE orders
    DROP COLUMN status
  `);
}
```

However, be aware that down migrations can lose data. Dropping a column removes all data in that column.

**Point-in-Time Recovery**: For critical systems, database backups allow restoring to any point before the problem occurred:

```bash
# PostgreSQL point-in-time recovery
pg_restore --dbname=myapp_restored backup.dump

# Or restore to specific timestamp
recovery_target_time = '2025-01-20 10:00:00'
```

**Forward-Only Migrations**: For complex changes, sometimes it is safer to write a new "fix-forward" migration rather than attempting to roll back:

```typescript
// Instead of rolling back a complex schema change,
// add a new migration that fixes the issue
export async function up(db: Database): Promise<void> {
  await db.query(`
    UPDATE orders
    SET status = 'pending'
    WHERE status IS NULL
  `);
}
```

### Configuration Rollback

If the deployment failure is caused by configuration changes (environment variables, feature flags), rolling back configuration may be sufficient:

```bash
# Restore previous .env file
cp .env.backup.20250119 .env
systemctl restart myapp

# Or if using a config management system
kubectl rollout undo configmap/myapp-config
kubectl rollout restart deployment/myapp
```

Keep configuration history just like code history. Store configurations in version control or use systems that maintain history automatically.

## Implementing Blue-Green Deployments

Blue-green deployment is a release strategy that maintains two identical production environments. At any time, one environment (blue) serves live traffic while the other (green) receives the new deployment. Switching traffic between them enables instant rollback.

```
                    ┌─────────────┐
                    │   Router    │
                    │  (nginx)    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │                         │
       ┌──────▼──────┐           ┌──────▼──────┐
       │    Blue     │           │    Green    │
       │  (v1.0.0)   │           │  (v1.1.0)   │
       │   [LIVE]    │           │  [STANDBY]  │
       └─────────────┘           └─────────────┘
```

To roll back, simply redirect traffic back to the previous environment:

```nginx
# nginx configuration for blue-green switching
upstream app {
    # Comment/uncomment to switch
    server blue.internal:8080;
    # server green.internal:8080;
}
```

The standby environment remains available until you are confident the new release is stable.

## Testing Rollback Procedures

A rollback procedure that has never been tested is not reliable. Include rollback testing as part of your deployment process:

1. **Document the procedure**: Write step-by-step rollback instructions
2. **Test in staging**: Practice rollback on a non-production environment
3. **Time the process**: Know how long rollback takes
4. **Verify recovery**: After rollback, confirm the system works correctly
5. **Automate if possible**: Scripted rollbacks are faster and less error-prone

Create a runbook for rollback:

```markdown
## Rollback Runbook

### Triggers
- Error rate exceeds 5% after deployment
- Response time exceeds 2 seconds
- Critical functionality broken
- Data corruption detected

### Steps
1. Alert team in Slack #incidents channel
2. Run: `kubectl rollout undo deployment/myapp`
3. Verify pods are running: `kubectl get pods`
4. Check error rates in monitoring dashboard
5. If database migration ran, execute down migration
6. Confirm functionality with smoke tests
7. Document incident for postmortem

### Contacts
- On-call engineer: See PagerDuty schedule
- Database admin: [contact info]
```

## Rollback for Capstone Projects

For your capstone, implement at minimum:

1. **Version tagging**: Tag every deployment with version numbers or timestamps
2. **Retention of previous versions**: Keep at least one previous deployment available
3. **Documented rollback procedure**: Write clear instructions for reverting
4. **One test rollback**: Practice the procedure once to verify it works

If using containers and Kubernetes or a similar orchestrator, you get rollback capability automatically. If deploying to traditional servers, implement a symlink-based release structure or similar approach.

Include rollback capability in your project documentation:

```markdown
## Deployment and Rollback

### Deploying
1. Build new image: `docker build -t myapp:v1.2.0 .`
2. Push to registry: `docker push myapp:v1.2.0`
3. Deploy: `kubectl set image deployment/myapp myapp=myapp:v1.2.0`

### Rolling Back
1. List deployment history: `kubectl rollout history deployment/myapp`
2. Rollback to previous: `kubectl rollout undo deployment/myapp`
3. Verify: `kubectl get pods` and check application health
```

## Summary

Rollback strategies are essential for production systems. Plan your rollback approach before deploying, whether it is container image rollback, symlink switching, or blue-green deployment. Test your rollback procedure to ensure it works when needed. For database changes, consider whether migrations are reversible and maintain backups for critical data. For capstone projects, demonstrating rollback capability shows understanding of production operations and provides confidence during deployments. The goal is simple: when something goes wrong, you can quickly restore service with minimal manual intervention.
