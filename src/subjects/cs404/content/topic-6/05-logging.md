# Logging Best Practices

## Introduction

Effective logging is the difference between quickly diagnosing production issues and spending hours debugging blind. Logs provide a chronological record of application events, revealing what happened, when it happened, and why. While monitoring tools like Sentry capture errors automatically, logs capture everything else—user actions, business events, integration calls, performance metrics, and application state changes that don't constitute errors but are essential for understanding system behavior.

Good logging is an art. Log too little and you lack information to diagnose problems. Log too much and important signals drown in noise, while storage costs balloon and performance suffers. The key is logging meaningful events with appropriate detail and context. Structured logging—emitting logs as parseable data structures rather than plain text—enables powerful filtering, searching, and analysis. For capstone projects, implementing proper logging demonstrates understanding of production debugging techniques and operational concerns that extend beyond feature development.

## Understanding Log Levels

Log levels categorize messages by importance, enabling you to filter based on context. Production might show only warnings and errors, while development shows everything. Standard log levels, from least to most severe:

**DEBUG**: Detailed information useful only during development. Database query parameters, cache hits, internal state transitions. Debug logs help trace execution flow when investigating complex bugs. Never enabled in production—too verbose and may expose sensitive data.

**INFO**: General informational messages about application operation. User logged in, payment processed, email sent, job scheduled. Info logs track normal business events and provide audit trails. Enabled in production but must be used judiciously to avoid noise.

**WARN**: Potentially harmful situations that don't prevent operation. Deprecated API used, rate limit approaching, external service slow, fallback logic triggered. Warnings indicate "something's not quite right" but the application continues functioning.

**ERROR**: Error events that prevent specific operations but don't crash the application. Failed database query, payment declined, file upload rejected, external API unavailable. Errors require investigation but the application remains operational.

**FATAL**: Severe errors that cause application shutdown. Database unreachable on startup, required configuration missing, critical dependency failed. Fatal logs often precede crashes.

Use log levels consistently. Don't log routine operations as errors or actual errors as warnings. This degrades trust in logs—if everything is an error, nothing is an error.

## Implementing Structured Logging

Structured logging emits logs as JSON or other parseable formats, making them searchable and aggregatable. Compare plain text logging:

```
User registration attempt at 2025-01-15T10:23:45Z for user@example.com failed with error Invalid email
```

To structured logging:

```json
{
  "timestamp": "2025-01-15T10:23:45.123Z",
  "level": "error",
  "event": "user_registration_failed",
  "userId": null,
  "email": "user@example.com",
  "error": "Invalid email format",
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

The structured version is machine-parseable. You can query "show all failed registrations" or "find all events from this IP" without regex parsing text.

Implement structured logging with Winston, the most popular Node.js logging library:

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'api',
    environment: process.env.NODE_ENV,
  },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // Write errors to file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // Write all logs to file
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;
```

This configuration writes JSON logs to files and human-readable logs to console. In production, you'd typically send logs to a service like Datadog, Logtail, or CloudWatch instead of files.

## Logging with Context

Logs need context to be useful. When investigating an issue, you want to know: Who was the user? What were they doing? What was the application state? Add context through structured fields:

```typescript
import logger from './logger';

// Log user action with context
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  ipAddress: req.ip,
  userAgent: req.headers['user-agent'],
  sessionId: req.session.id,
});

// Log business event
logger.info('Order created', {
  orderId: order.id,
  userId: user.id,
  total: order.total,
  itemCount: order.items.length,
  paymentMethod: order.payment.method,
});

// Log external API call
logger.debug('Calling payment gateway', {
  gateway: 'stripe',
  amount: payment.amount,
  currency: payment.currency,
  requestId: generateRequestId(),
});

// Log errors with full context
try {
  await processPayment(order);
} catch (error) {
  logger.error('Payment processing failed', {
    error: error.message,
    stack: error.stack,
    orderId: order.id,
    userId: user.id,
    amount: order.total,
    gateway: 'stripe',
  });
  throw error;
}
```

Notice how each log includes relevant identifiers. When debugging an issue with order 12345, you can filter logs to that order ID and see the complete sequence of events.

## Request Correlation

In distributed systems or high-traffic applications, logs from different requests interleave, making it hard to trace a single request's journey. Request correlation solves this by assigning each request a unique ID that propagates through all logs related to that request.

Implement request correlation with Express middleware:

```typescript
import { randomUUID } from 'crypto';
import logger from './logger';

// Middleware to add correlation ID
app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || randomUUID();
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// Create child logger for each request
app.use((req, res, next) => {
  req.logger = logger.child({
    correlationId: req.correlationId,
    method: req.method,
    path: req.path,
  });
  next();
});

// Use request logger
app.post('/api/orders', async (req, res) => {
  req.logger.info('Creating order', {
    userId: req.user.id,
    itemCount: req.body.items.length,
  });

  try {
    const order = await createOrder(req.body);
    req.logger.info('Order created successfully', {
      orderId: order.id,
    });
    res.json(order);
  } catch (error) {
    req.logger.error('Order creation failed', {
      error: error.message,
    });
    res.status(500).json({ error: 'Failed to create order' });
  }
});
```

Now all logs from a single request share a correlation ID. You can trace the entire request flow by filtering on that ID, even across multiple services if you propagate the header.

## Performance Considerations

Logging has performance costs—I/O operations, formatting overhead, network latency for remote logging. Some optimization strategies:

**Asynchronous Logging**: Don't block request handling while writing logs. Winston transports are asynchronous by default, but for high-throughput applications, consider dedicated logging queues.

**Sampling**: In very high-traffic scenarios, log only a sample of requests at debug level. Log all errors but only 10% of successful requests:

```typescript
const shouldLogRequest = () => Math.random() < 0.1;

app.use((req, res, next) => {
  if (shouldLogRequest()) {
    req.logger.debug('Request received', {
      body: req.body,
      query: req.query,
    });
  }
  next();
});
```

**Conditional Detail**: Log minimal information normally, detailed information when errors occur:

```typescript
const requestData = {
  userId: user.id,
  action: 'checkout',
};

try {
  await processCheckout();
  logger.info('Checkout successful', requestData);
} catch (error) {
  // Add detailed context only on error
  logger.error('Checkout failed', {
    ...requestData,
    cart: user.cart,
    paymentInfo: sanitizePaymentInfo(payment),
    error: error.message,
    stack: error.stack,
  });
}
```

**Avoid Logging in Tight Loops**: Don't log inside loops that run thousands of times. Log aggregated results instead:

```typescript
// Bad: logs thousands of times
for (const item of items) {
  logger.debug('Processing item', { itemId: item.id });
  processItem(item);
}

// Good: logs once with summary
logger.debug('Processing items', {
  count: items.length,
  itemIds: items.map(i => i.id),
});
for (const item of items) {
  processItem(item);
}
```

## Key Takeaways

- Use appropriate log levels: DEBUG for development, INFO for business events, ERROR for failures
- Structured logging (JSON) enables powerful searching and filtering
- Include context: user IDs, request IDs, business entity IDs make logs actionable
- Request correlation IDs trace individual requests through complex flows
- Never log sensitive data: passwords, tokens, credit cards, personal information
- Consider performance: async logging, sampling, conditional detail
- Log at boundaries: HTTP requests/responses, database queries, external API calls
- Child loggers propagate context automatically to related log statements

## Common Mistakes

### Mistake 1: Logging Sensitive Data
**Problem:** Logs contain passwords, API keys, credit card numbers, or personal information. This creates security vulnerabilities and compliance violations.

**Solution:** Create a sanitization function for sensitive data:

```typescript
function sanitize(data: any) {
  const sensitive = ['password', 'token', 'apiKey', 'creditCard', 'ssn'];
  const sanitized = { ...data };

  for (const key of Object.keys(sanitized)) {
    if (sensitive.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]';
    }
  }

  return sanitized;
}

logger.info('User update', sanitize(userData));
```

### Mistake 2: Console.log in Production
**Problem:** Using `console.log` instead of a proper logger means no log levels, no structured data, no persistence, and no control over output.

**Solution:** Replace all `console.log` with logger calls. Set up a linter rule to prevent `console.log`:

```json
{
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }]
  }
}
```

### Mistake 3: Overly Verbose Logging
**Problem:** Logging every function call and variable change creates massive log volumes that hide important information and increase costs.

**Solution:** Log at boundaries and key decision points, not every line. Ask "Would this help me debug a production issue?" before adding a log statement.

### Mistake 4: Inconsistent Log Formats
**Problem:** Different parts of the application use different log formats, making it impossible to aggregate or search logs effectively.

**Solution:** Use a shared logger instance configured once at application startup. Create logger utilities for common patterns:

```typescript
export const logUserAction = (action: string, userId: string, details?: any) => {
  logger.info(`User action: ${action}`, {
    userId,
    action,
    ...details,
  });
};
```

### Mistake 5: No Log Rotation
**Problem:** Log files grow indefinitely, filling disk space and making older logs unsearchable.

**Solution:** Use log rotation to archive old logs:

```typescript
new winston.transports.File({
  filename: 'logs/app.log',
  maxsize: 10485760, // 10MB
  maxFiles: 10,
  tailable: true,
});
```

Or use external log management services that handle rotation automatically.

## Additional Resources

- [Winston Documentation](https://github.com/winstonjs/winston)
- [Pino](https://getpino.io/) - High-performance alternative to Winston
- [The Twelve-Factor App: Logs](https://12factor.net/logs)
- [Datadog Logging Best Practices](https://docs.datadoghq.com/logs/guide/best-practices/)
- [Logtail](https://betterstack.com/logtail) - Modern log management service
