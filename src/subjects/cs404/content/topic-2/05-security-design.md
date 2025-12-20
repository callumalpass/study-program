# Security Design

## Introduction

Security design involves building protection mechanisms into your application from the ground up. For capstone projects, implementing core security practices demonstrates professional maturity and responsible engineering. While you won't need enterprise-grade security, understanding and applying fundamental security principles is essential for any production-ready application.

## Learning Objectives

By the end of this lesson, you will be able to:

- Implement secure authentication and authorization
- Protect against OWASP Top 10 vulnerabilities
- Handle sensitive data securely
- Apply input validation and sanitization
- Configure secure headers and CORS
- Implement rate limiting
- Follow security best practices for your tech stack

## Authentication Security

### Password Hashing

**Always hash passwords with bcrypt:**

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

// Hash password during registration
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password during login
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Never store or log plain text passwords
```

### JWT Token Security

```typescript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = '24h';

function generateToken(userId: string): string {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

// Middleware to authenticate requests
function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Password Reset Security

```typescript
import crypto from 'crypto';

// Generate secure reset token
function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Hash token for storage
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Request password reset
async function requestPasswordReset(email: string) {
  const resetToken = generateResetToken();
  const hashedToken = hashToken(resetToken);
  
  await prisma.user.update({
    where: { email },
    data: {
      reset_token: hashedToken,
      reset_token_expires: new Date(Date.now() + 3600000) // 1 hour
    }
  });
  
  // Send reset link via email (token sent only once)
  await sendEmail({
    to: email,
    subject: 'Password Reset',
    body: `Reset link: https://app.com/reset?token=${resetToken}`
  });
}

// Verify and use reset token
async function resetPassword(token: string, newPassword: string) {
  const hashedToken = hashToken(token);
  
  const user = await prisma.user.findFirst({
    where: {
      reset_token: hashedToken,
      reset_token_expires: { gt: new Date() }
    }
  });
  
  if (!user) {
    throw new Error('Invalid or expired token');
  }
  
  const hashedPassword = await hashPassword(newPassword);
  
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password_hash: hashedPassword,
      reset_token: null,
      reset_token_expires: null
    }
  });
}
```

## Authorization

### Resource Ownership

```typescript
// Verify user owns resource before allowing access
app.get('/api/activities/:id', authenticate, async (req, res) => {
  const activity = await prisma.activity.findUnique({
    where: { id: req.params.id }
  });
  
  if (!activity) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  // Check ownership
  if (activity.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json({ data: activity });
});
```

### Role-Based Access Control

```typescript
enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

function requireRole(role: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Admin-only endpoint
app.delete('/api/users/:id', 
  authenticate, 
  requireRole(Role.ADMIN), 
  deleteUser
);
```

## Input Validation

### Schema Validation

```typescript
import { z } from 'zod';

const createActivitySchema = z.object({
  category: z.enum(['transportation', 'energy', 'food', 'waste', 'purchases']),
  activity_type: z.string().min(1).max(100).trim(),
  quantity: z.number().positive().finite(),
  unit: z.string().min(1).max(20),
  activity_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).trim().optional()
});

app.post('/api/activities', authenticate, async (req, res) => {
  try {
    const validated = createActivitySchema.parse(req.body);
    
    const activity = await activityService.create({
      ...validated,
      user_id: req.user.id
    });
    
    res.status(201).json({ data: activity });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        error: {
          code: 'VALIDATION_ERROR',
          details: error.errors
        }
      });
    }
    throw error;
  }
});
```

### SQL Injection Prevention

```typescript
// Bad: Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// Good: Use parameterized queries
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [userInput]);

// Best: Use ORM
const user = await prisma.user.findUnique({
  where: { email: userInput }
});
```

### XSS Prevention

```typescript
// React automatically escapes output
function ActivityNote({ note }: { note: string }) {
  return <div>{note}</div>; // Safe - React escapes
}

// If you must use dangerouslySetInnerHTML, sanitize first
import DOMPurify from 'dompurify';

function RichContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

## Security Headers

```typescript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://api.example.com']
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Remove identifying headers
app.disable('x-powered-by');
```

## CORS Configuration

```typescript
import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com'
    : 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later' }
});

app.use('/api/', apiLimiter);

// Strict limiter for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: { error: 'Too many login attempts, please try again later' }
});

app.post('/api/auth/login', authLimiter, loginHandler);
```

## Environment Variables

```bash
# .env (never commit!)
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-very-long-random-secret-key-here
SENDGRID_API_KEY=SG.xxxxx

# .env.example (commit as template)
DATABASE_URL=
JWT_SECRET=
SENDGRID_API_KEY=
```

```typescript
import dotenv from 'dotenv';
dotenv.config();

// Access securely
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required');
}

// Never log secrets
console.log({ dbConnected: !!process.env.DATABASE_URL }); // OK
console.log({ dbUrl: process.env.DATABASE_URL }); // NEVER do this!
```

## HTTPS/TLS

```typescript
// Force HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

## Logging Security Events

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'security.log' })
  ]
});

// Log security events
logger.info('Login success', { userId, ip: req.ip });
logger.warn('Login failed', { email, ip: req.ip });
logger.error('Unauthorized access attempt', { userId, resource: req.path });
```

## Security Checklist

### Authentication & Authorization
- [ ] Passwords hashed with bcrypt (salt rounds ≥ 12)
- [ ] JWT tokens for authentication
- [ ] Tokens have appropriate expiration
- [ ] Authorization checks on all protected routes
- [ ] Users can only access their own data

### Input Validation
- [ ] All input validated on server-side
- [ ] SQL injection prevented (ORM or parameterized queries)
- [ ] XSS prevention (auto-escaping or sanitization)
- [ ] Type validation for all inputs

### Data Protection
- [ ] HTTPS enforced in production
- [ ] Secrets in environment variables
- [ ] No secrets in code or version control
- [ ] Sensitive data not logged

### Configuration
- [ ] Security headers configured (Helmet.js)
- [ ] CORS properly configured
- [ ] Error messages don't leak sensitive info
- [ ] Debug mode disabled in production

### Dependencies
- [ ] Dependencies regularly updated
- [ ] `npm audit` run and issues addressed
- [ ] No known critical vulnerabilities

### Rate Limiting
- [ ] Rate limiting on authentication endpoints
- [ ] General API rate limiting
- [ ] Protection against brute force attacks

## Common Vulnerabilities to Avoid

### Broken Access Control

```typescript
// BAD: No authorization check
app.get('/api/activities/:id', async (req, res) => {
  const activity = await findActivity(req.params.id);
  res.json(activity); // Anyone can access any activity!
});

// GOOD: Verify ownership
app.get('/api/activities/:id', authenticate, async (req, res) => {
  const activity = await findActivity(req.params.id);
  
  if (!activity) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  if (activity.user_id !== req.user.id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  res.json(activity);
});
```

### Mass Assignment

```typescript
// BAD: User can set any field
app.patch('/api/users/me', authenticate, async (req, res) => {
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: req.body // User could set { role: 'admin' }!
  });
  res.json(updated);
});

// GOOD: Whitelist allowed fields
const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional()
});

app.patch('/api/users/me', authenticate, async (req, res) => {
  const validated = updateUserSchema.parse(req.body);
  
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: validated
  });
  
  res.json(updated);
});
```

## Security Testing

### Manual Testing Checklist

- [ ] Try accessing other users' data by changing IDs
- [ ] Test with malicious input (SQL injection attempts)
- [ ] Try XSS payloads in text fields
- [ ] Test with expired/invalid JWT tokens
- [ ] Attempt to access admin routes without admin role
- [ ] Test rate limiting by making many requests

### Automated Security Testing

```bash
# Check for vulnerable dependencies
npm audit

# Fix automatically when possible
npm audit fix

# Use security scanning tools
# - OWASP ZAP
# - Snyk
# - GitHub Dependabot
```

## Summary

Security fundamentals for capstone projects:

1. **Hash passwords** with bcrypt
2. **Use JWT** for authentication
3. **Validate all input** on the server
4. **Check authorization** on every protected route
5. **Use HTTPS** in production
6. **Keep dependencies updated**
7. **Apply security headers**
8. **Rate limit** sensitive operations
9. **Never log secrets**
10. **Test your security measures**

Document your security implementation in your final report. Explain what you did and why, showing you understand the threats and how you mitigated them.

## Additional Resources

- OWASP Top 10: owasp.org/www-project-top-ten
- OWASP Cheat Sheet Series
- Helmet.js documentation
- Mozilla Web Security Guidelines
- "Web Application Security" by Andrew Hoffman
