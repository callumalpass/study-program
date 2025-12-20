# Application Monitoring

## Introduction

Application monitoring is your window into production behavior. While development and testing catch many issues, production environments expose problems impossible to reproduce locally—unexpected user behavior, scale-related bugs, integration failures with third-party services, and infrastructure issues. Monitoring tools track application health, performance metrics, and errors in real-time, enabling you to identify and fix problems before they impact many users.

Effective monitoring answers critical questions: Is my application running? Are users experiencing errors? Which features are slow? Where are exceptions occurring? Without monitoring, you're flying blind—you might discover problems only when users complain, by which time significant damage has occurred. Modern monitoring tools like Sentry, LogRocket, and Datadog make comprehensive observability accessible even for small projects. For capstone projects, implementing monitoring demonstrates professional engineering practices and provides valuable data for understanding real-world application behavior.

## Understanding Monitoring Fundamentals

Monitoring encompasses several related concepts. Error tracking captures exceptions and crashes, providing stack traces, environment context, and user impact. Performance monitoring measures response times, database query duration, and resource utilization. User monitoring tracks how people interact with your application—which features they use, where they encounter problems, and what workflows they follow.

Modern monitoring is proactive rather than reactive. Instead of waiting for users to report problems, monitoring alerts you when errors spike, performance degrades, or critical services fail. Alert thresholds let you define what "normal" looks like and get notified when conditions deviate. For example, you might alert when error rates exceed 1% of requests or when API response times cross 500ms.

The most effective monitoring provides context. When an error occurs, you need to know: What user action triggered it? What was the application state? What data was involved? Good monitoring tools capture this context automatically, including request headers, user IDs, browser information, and custom data you attach.

## Implementing Sentry for Error Tracking

Sentry has become the industry standard for error tracking. It captures exceptions, provides detailed stack traces with source maps, and groups similar errors together. Sentry's free tier supports 5,000 errors per month, sufficient for most capstone projects.

Setting up Sentry in a TypeScript application:

```typescript
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.GIT_COMMIT_SHA,

  // Set sample rate for performance monitoring
  tracesSampleRate: 1.0,

  // Capture 100% of transactions for profiling
  profilesSampleRate: 1.0,

  integrations: [
    new ProfilingIntegration(),
  ],

  // Filter sensitive data
  beforeSend(event, hint) {
    // Don't send errors from development
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    // Remove sensitive headers
    if (event.request?.headers) {
      delete event.request.headers['Authorization'];
      delete event.request.headers['Cookie'];
    }

    return event;
  },
});
```

For frontend applications, use `@sentry/react`:

```typescript
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Performance monitoring
  tracesSampleRate: 1.0,

  // Session replay for debugging
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Tag errors with release version
  release: __APP_VERSION__,
});
```

Sentry's session replay feature records user sessions, allowing you to watch exactly what users did before encountering an error. The replay captures DOM changes, clicks, and navigation—essentially a video of the user's experience.

## Adding Context to Errors

Raw stack traces often aren't enough to diagnose issues. Sentry allows enriching errors with custom context:

```typescript
import * as Sentry from "@sentry/node";

// Set user information
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Add custom tags for filtering
Sentry.setTag("page", "checkout");
Sentry.setTag("payment_method", "stripe");

// Add breadcrumbs for event trail
Sentry.addBreadcrumb({
  category: "cart",
  message: "Item added to cart",
  data: {
    productId: product.id,
    quantity: 2,
  },
  level: "info",
});

// Capture exception with extra context
try {
  await processPayment(cart);
} catch (error) {
  Sentry.captureException(error, {
    extra: {
      cartTotal: cart.total,
      itemCount: cart.items.length,
      paymentGateway: "stripe",
    },
  });
  throw error;
}
```

Breadcrumbs create an event trail showing what happened before an error. This is invaluable for reproducing bugs—you can see exactly what sequence of actions led to the failure.

## Performance Monitoring

Beyond errors, monitoring should track performance. Slow features frustrate users as much as broken ones. Sentry's performance monitoring measures transaction duration and identifies bottlenecks:

```typescript
import * as Sentry from "@sentry/node";

app.get("/api/products", async (req, res) => {
  const transaction = Sentry.startTransaction({
    op: "http.server",
    name: "GET /api/products",
  });

  try {
    // Measure database query
    const dbSpan = transaction.startChild({
      op: "db.query",
      description: "SELECT * FROM products",
    });
    const products = await db.query("SELECT * FROM products WHERE active = true");
    dbSpan.finish();

    // Measure external API call
    const apiSpan = transaction.startChild({
      op: "http.client",
      description: "Fetch inventory levels",
    });
    const inventory = await fetchInventory(products.map(p => p.id));
    apiSpan.finish();

    res.json({ products, inventory });
  } finally {
    transaction.finish();
  }
});
```

This creates a performance trace showing how much time each operation consumed. If the endpoint is slow, you can see whether the database query, API call, or something else is the bottleneck.

## Health Check Endpoints

Health checks provide a simple way to verify application status. Cloud platforms use health checks to determine if instances are healthy. A comprehensive health check verifies critical dependencies:

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: false,
    redis: false,
    externalApi: false,
  };

  try {
    // Check database connectivity
    await db.query('SELECT 1');
    checks.database = true;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { healthCheck: 'database' },
    });
  }

  try {
    // Check Redis connectivity
    await redis.ping();
    checks.redis = true;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { healthCheck: 'redis' },
    });
  }

  try {
    // Check critical external API
    await fetch('https://api.service.com/status', {
      timeout: 2000,
    });
    checks.externalApi = true;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { healthCheck: 'externalApi' },
    });
  }

  const healthy = Object.values(checks).every(check => check);

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  });
});
```

This endpoint returns 200 if all checks pass, 503 otherwise. Cloud platforms route traffic away from unhealthy instances automatically.

## Key Takeaways

- Monitoring provides visibility into production application behavior and performance
- Sentry captures errors with stack traces, context, and user impact data
- Add custom context, tags, and breadcrumbs to errors for easier debugging
- Performance monitoring identifies slow features and bottlenecks
- Session replay shows exactly what users did before encountering errors
- Health check endpoints verify critical dependencies are functioning
- Set up alerts for error rate spikes and performance degradation
- Filter sensitive data before sending to monitoring services

## Common Mistakes

### Mistake 1: No Error Boundaries in React
**Problem:** A single uncaught error crashes your entire React application, showing users a blank page. Sentry doesn't capture the error because it's not properly handled.

**Solution:** Wrap your application in Sentry's error boundary:

```typescript
import * as Sentry from "@sentry/react";

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />} showDialog>
      <YourApplication />
    </Sentry.ErrorBoundary>
  );
}
```

This catches React errors, reports them to Sentry, and displays a fallback UI instead of a blank page.

### Mistake 2: Logging Sensitive Information
**Problem:** Error reports include passwords, credit card numbers, API keys, or personal data. This creates security and compliance issues.

**Solution:** Use Sentry's `beforeSend` hook to scrub sensitive data. Remove authorization headers, filter fields like `password` and `creditCard`, and mask user data. Configure Sentry's data scrubbing rules in the dashboard for additional protection.

### Mistake 3: Ignoring Monitoring in Development
**Problem:** You only initialize Sentry in production, so you can't test error reporting during development. Errors might not be captured correctly in production.

**Solution:** Initialize Sentry in all environments but filter development errors in `beforeSend`. This lets you test error reporting while preventing development noise from polluting production data.

### Mistake 4: Not Setting Release Versions
**Problem:** Sentry groups errors from different code versions together, making it unclear which deployment introduced a bug. Source maps don't work because releases aren't tracked.

**Solution:** Set the `release` option during initialization using your git commit SHA or version tag. Upload source maps tagged with the same release. This enables Sentry to show the exact source code that produced errors.

### Mistake 5: Alert Fatigue
**Problem:** You configure alerts for every error, so you receive hundreds of notifications per day. You start ignoring them, missing critical issues.

**Solution:** Set intelligent alert thresholds. Alert on error rate (e.g., >1% of requests), not individual errors. Use Sentry's issue grouping to alert on new issues rather than recurring ones. Configure different alert channels for different severity levels—critical issues to phone, warnings to email.

## Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Sentry React SDK](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Node.js SDK](https://docs.sentry.io/platforms/node/)
- [Performance Monitoring Best Practices](https://docs.sentry.io/product/performance/best-practices/)
- [LogRocket](https://logrocket.com/) - Alternative with advanced session replay
