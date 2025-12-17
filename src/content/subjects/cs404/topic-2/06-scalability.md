# Scalability

## Introduction

Scalability is the ability of your system to handle increased load gracefully. For capstone projects, you won't build systems handling millions of users, but understanding scalability principles demonstrates systems thinking and prepares you for professional software development.

## Learning Objectives

By the end of this lesson, you will be able to:

- Understand vertical vs. horizontal scaling
- Identify scalability bottlenecks
- Apply caching strategies effectively
- Design for database scalability
- Implement pagination and lazy loading
- Make informed scalability trade-offs
- Document scaling architecture

## Scaling Strategies

### Vertical Scaling (Scale Up)

Add more resources to a single server (more CPU, RAM, disk).

**Pros:**
- Simple to implement
- No application changes needed
- No distributed system complexity

**Cons:**
- Limited by hardware max
- Single point of failure
- Expensive at high levels

**For Capstone:** Usually sufficient. Start here.

### Horizontal Scaling (Scale Out)

Add more servers to distribute load.

**Pros:**
- Nearly unlimited scaling potential
- Redundancy and fault tolerance
- Can be cost-effective

**Cons:**
- Application must be stateless
- Requires load balancing
- Database becomes bottleneck
- Increased complexity

**For Capstone:** Understand the concept, but likely not needed.

## Caching Strategies

### In-Memory Caching

```typescript
// Simple in-memory cache
const cache = new Map<string, { data: any; expires: number }>();

function getCached<T>(key: string, ttl: number, fetch: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && cached.expires > Date.now()) {
    return Promise.resolve(cached.data);
  }
  
  return fetch().then(data => {
    cache.set(key, {
      data,
      expires: Date.now() + ttl
    });
    return data;
  });
}

// Usage
const activities = await getCached(
  `user:${userId}:activities`,
  5 * 60 * 1000, // 5 minutes
  () => prisma.activity.findMany({ where: { user_id: userId } })
);
```

### Redis Caching

```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

async function getCachedData<T>(
  key: string,
  ttl: number,
  fetch: () => Promise<T>
): Promise<T> {
  // Try cache first
  const cached = await redis.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const data = await fetch();
  
  // Store in cache
  await redis.setex(key, ttl, JSON.stringify(data));
  
  return data;
}

// Usage
const stats = await getCachedData(
  `analytics:${userId}:monthly`,
  3600, // 1 hour
  () => calculateMonthlyStats(userId)
);
```

### HTTP Caching

```typescript
// Set cache headers for static content
app.get('/api/emission-factors', async (req, res) => {
  const factors = await prisma.emissionFactor.findMany();
  
  // Cache for 24 hours (data changes infrequently)
  res.set('Cache-Control', 'public, max-age=86400');
  res.json({ data: factors });
});

// No caching for user-specific data
app.get('/api/activities', authenticate, async (req, res) => {
  res.set('Cache-Control', 'private, no-cache');
  // ... fetch activities
});
```

## Database Optimization

### Indexing

```sql
-- Index frequently queried columns
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_date ON activities(activity_date DESC);

-- Composite index for common query patterns
CREATE INDEX idx_activities_user_date 
ON activities(user_id, activity_date DESC);

-- Check index usage
EXPLAIN ANALYZE
SELECT * FROM activities 
WHERE user_id = 'xxx' 
ORDER BY activity_date DESC;
```

### Query Optimization

```typescript
// Bad: N+1 query problem
const users = await prisma.user.findMany();
for (const user of users) {
  user.activities = await prisma.activity.findMany({
    where: { user_id: user.id }
  });
}

// Good: Use include/join
const users = await prisma.user.findMany({
  include: {
    activities: true
  }
});

// Even better: Paginate
const users = await prisma.user.findMany({
  include: {
    activities: {
      take: 10,
      orderBy: { created_at: 'desc' }
    }
  },
  take: 20,
  skip: (page - 1) * 20
});
```

### Connection Pooling

```typescript
// Prisma handles connection pooling automatically
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Configure pool size if needed
// In DATABASE_URL: ?connection_limit=10
```

## Pagination

### Offset-Based Pagination

```typescript
interface PaginationParams {
  page: number;
  limit: number;
}

async function getActivities(userId: string, { page, limit }: PaginationParams) {
  const skip = (page - 1) * limit;
  
  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      where: { user_id: userId },
      skip,
      take: limit,
      orderBy: { activity_date: 'desc' }
    }),
    prisma.activity.count({
      where: { user_id: userId }
    })
  ]);
  
  return {
    data: activities,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit)
    }
  };
}

// API endpoint
app.get('/api/activities', authenticate, async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  
  const result = await getActivities(req.user.id, { page, limit });
  res.json(result);
});
```

### Cursor-Based Pagination

```typescript
async function getActivitiesCursor(
  userId: string,
  cursor?: string,
  limit: number = 20
) {
  const activities = await prisma.activity.findMany({
    where: { user_id: userId },
    take: limit + 1,
    ...(cursor && {
      cursor: { id: cursor },
      skip: 1
    }),
    orderBy: { created_at: 'desc' }
  });
  
  const hasMore = activities.length > limit;
  const items = hasMore ? activities.slice(0, -1) : activities;
  
  return {
    data: items,
    pagination: {
      next_cursor: hasMore ? items[items.length - 1].id : null,
      has_more: hasMore
    }
  };
}
```

## Lazy Loading

### Frontend Lazy Loading

```typescript
// React code splitting
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

### Infinite Scroll

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';

function ActivityList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['activities'],
    queryFn: ({ pageParam = 1 }) =>
      fetchActivities({ page: pageParam, limit: 20 }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.total_pages
        ? lastPage.pagination.page + 1
        : undefined
  });

  return (
    <div>
      {data?.pages.map((page) =>
        page.data.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      )}
      
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          Load More
        </button>
      )}
    </div>
  );
}
```

## Background Jobs

```typescript
// Simple in-process job queue
import Bull from 'bull';

const emailQueue = new Bull('email', process.env.REDIS_URL);

// Process jobs
emailQueue.process(async (job) => {
  const { to, subject, body } = job.data;
  await sendEmail({ to, subject, body });
});

// Queue a job
async function queueEmail(to: string, subject: string, body: string) {
  await emailQueue.add({
    to,
    subject,
    body
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
}

// Use in route
app.post('/api/activities', authenticate, async (req, res) => {
  const activity = await createActivity(req.body);
  
  // Queue email notification (don't wait)
  await queueEmail(
    req.user.email,
    'Activity Logged',
    `You logged ${activity.activity_type}`
  );
  
  res.status(201).json({ data: activity });
});
```

## CDN for Static Assets

```typescript
// Upload assets to CDN (e.g., Cloudinary, AWS S3)
// Reference CDN URLs in your app

const ASSET_BASE_URL = process.env.CDN_URL || '/assets';

function getAssetUrl(path: string): string {
  return `${ASSET_BASE_URL}/${path}`;
}

// In React
<img src={getAssetUrl('logo.png')} alt="Logo" />
```

## Performance Monitoring

```typescript
// Add timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    if (duration > 1000) {
      logger.warn('Slow request', {
        method: req.method,
        path: req.path,
        duration
      });
    }
  });
  
  next();
});

// Monitor query performance
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', (e) => {
  if (e.duration > 1000) {
    logger.warn('Slow query', {
      query: e.query,
      duration: e.duration
    });
  }
});
```

## Scalability Checklist

### Database
- [ ] Indexes on frequently queried columns
- [ ] Pagination implemented for lists
- [ ] Connection pooling configured
- [ ] N+1 queries eliminated
- [ ] Query performance monitored

### Caching
- [ ] Expensive queries cached
- [ ] Cache invalidation strategy defined
- [ ] HTTP cache headers set appropriately
- [ ] Static assets served from CDN

### API
- [ ] Rate limiting implemented
- [ ] Pagination on all list endpoints
- [ ] Lazy loading for large datasets
- [ ] Background jobs for slow operations

### Frontend
- [ ] Code splitting implemented
- [ ] Images optimized and lazy loaded
- [ ] Infinite scroll or pagination
- [ ] Debouncing on search inputs

## Scalability for Capstone Projects

**What you SHOULD do:**
- Implement pagination
- Add database indexes
- Cache expensive calculations
- Optimize images
- Use code splitting

**What you DON'T need:**
- Multiple server instances
- Load balancers
- Database replication
- Microservices
- Kubernetes

**Document scaling path:**
"Current architecture supports up to 1,000 concurrent users. Future scaling would involve: 1) Horizontal API scaling with load balancer, 2) Read replicas for database, 3) Redis for distributed caching."

## Summary

For capstone projects, focus on:

1. **Database optimization** - indexes, pagination, efficient queries
2. **Caching** - reduce redundant calculations and queries
3. **Lazy loading** - don't load everything at once
4. **Monitoring** - know where bottlenecks are

Design your application to be scalable (stateless, proper architecture), but don't over-engineer. Document how you would scale further if needed, demonstrating you understand the concepts.

## Additional Resources

- "Designing Data-Intensive Applications" by Martin Kleppmann
- "High Performance Browser Networking" by Ilya Grigorik
- Web.dev performance guides
- Database query optimization guides
- Redis documentation
