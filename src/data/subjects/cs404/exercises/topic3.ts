import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs404-ex-3-1',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Input Validation with Zod',
    difficulty: 1,
    description: 'Create Zod schemas for API input validation. Build validation schemas for user registration and activity creation.',
    starterCode: `import { z } from 'zod';

// TODO: Create registration schema
const registerSchema = z.object({
  // email: valid email
  // password: min 12 chars, contains uppercase, lowercase, number, special char
  // name: 1-100 characters
});

// TODO: Create activity schema
const createActivitySchema = z.object({
  // category: one of 'transportation', 'energy', 'food', 'waste', 'purchases'
  // quantity: positive number
  // date: YYYY-MM-DD format
});

export { registerSchema, createActivitySchema };`,
    solution: `import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[a-z]/, 'Must contain lowercase letter')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[@$!%*?&]/, 'Must contain special character'),
  name: z.string().min(1).max(100)
});

const createActivitySchema = z.object({
  category: z.enum(['transportation', 'energy', 'food', 'waste', 'purchases']),
  activity_type: z.string().min(1).max(100),
  quantity: z.number().positive(),
  unit: z.string().min(1).max(20),
  activity_date: z.string().regex(/^\\d{4}-\\d{2}-\\d{2}$/, 'Must be YYYY-MM-DD format'),
  notes: z.string().max(500).optional()
});

// Usage example
try {
  const validUser = registerSchema.parse({
    email: 'user@example.com',
    password: 'SecureP@ssw0rd123',
    name: 'John Doe'
  });
  console.log('Valid user:', validUser);
} catch (error) {
  console.error('Validation error:', error);
}

try {
  const validActivity = createActivitySchema.parse({
    category: 'transportation',
    activity_type: 'car',
    quantity: 25.5,
    unit: 'miles',
    activity_date: '2024-01-15'
  });
  console.log('Valid activity:', validActivity);
} catch (error) {
  console.error('Validation error:', error);
}

export { registerSchema, createActivitySchema };`,
    hints: [
      'Use z.string().email() for email validation',
      'Use regex for password complexity',
      'Use z.enum() for limited value sets',
      'Use .optional() for optional fields'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-3-2',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'API Error Handler Middleware',
    difficulty: 3,
    description: 'Create Express middleware for consistent error handling. Build error handler middleware that catches and formats all errors consistently.',
    starterCode: `import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: Handle different error types
  // - ZodError (validation errors)
  // - AppError (custom application errors)
  // - Default errors
}

export { AppError, errorHandler };`,
    solution: `import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
  }
}

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log error
  console.error('Error:', error);

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input data',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }
    });
  }

  // Application errors
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message
      }
    });
  }

  // Default error (hide internals in production)
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message;

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message
    }
  });
}

// Usage example
app.post('/api/users', async (req, res, next) => {
  try {
    const validated = userSchema.parse(req.body);
    const user = await userService.create(validated);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      throw new AppError(404, 'User not found', 'USER_NOT_FOUND');
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

export { AppError, errorHandler };`,
    hints: [
      'Check error type with instanceof',
      'Return different status codes for different errors',
      'Format errors consistently',
      'Don\'t expose internal errors in production'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex03',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Environment Configuration Manager',
    difficulty: 1,
    description: 'Create a configuration manager that loads and validates environment variables using dotenv. Implement type-safe access to configuration values with validation and default values.',
    starterCode: `import dotenv from 'dotenv';

interface Config {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  corsOrigin: string;
}

// TODO: Load environment variables
// TODO: Validate required variables
// TODO: Export typed config object

export function getConfig(): Config {
  // Implement configuration loading
}`,
    solution: `import dotenv from 'dotenv';

interface Config {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  corsOrigin: string;
}

// Load environment variables
dotenv.config();

function getEnvVariable(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(\`Missing required environment variable: \${key}\`);
  }
  return value;
}

export function getConfig(): Config {
  return {
    nodeEnv: (process.env.NODE_ENV || 'development') as Config['nodeEnv'],
    port: parseInt(process.env.PORT || '3000', 10),
    databaseUrl: getEnvVariable('DATABASE_URL'),
    jwtSecret: getEnvVariable('JWT_SECRET'),
    corsOrigin: getEnvVariable('CORS_ORIGIN', 'http://localhost:5173')
  };
}

// Usage example
const config = getConfig();
console.log(\`Server running in \${config.nodeEnv} mode on port \${config.port}\`);

export { config };`,
    hints: [
      'Use dotenv.config() to load .env file',
      'Check if required variables exist using process.env',
      'Throw descriptive errors for missing required variables',
      'Use parseInt() for numeric values with fallback defaults'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex04',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Git Branch Name Validator',
    difficulty: 1,
    description: 'Create a function that validates Git branch names according to best practices. Check for proper naming conventions like feature/*, bugfix/*, hotfix/*, etc.',
    starterCode: `interface BranchValidation {
  valid: boolean;
  type?: 'feature' | 'bugfix' | 'hotfix' | 'release' | 'chore';
  message?: string;
}

// TODO: Validate branch name format
// Valid patterns:
// - feature/description-of-feature
// - bugfix/issue-123-description
// - hotfix/critical-bug
// - release/v1.2.3
// - chore/update-dependencies

function validateBranchName(branchName: string): BranchValidation {
  // Implement validation
}

export { validateBranchName };`,
    solution: `interface BranchValidation {
  valid: boolean;
  type?: 'feature' | 'bugfix' | 'hotfix' | 'release' | 'chore';
  message?: string;
}

function validateBranchName(branchName: string): BranchValidation {
  // Regex pattern for valid branch names
  const patterns = [
    { regex: /^feature\\/[a-z0-9-]+$/, type: 'feature' as const },
    { regex: /^bugfix\\/(issue-\\d+-)?[a-z0-9-]+$/, type: 'bugfix' as const },
    { regex: /^hotfix\\/[a-z0-9-]+$/, type: 'hotfix' as const },
    { regex: /^release\\/v?\\d+\\.\\d+\\.\\d+$/, type: 'release' as const },
    { regex: /^chore\\/[a-z0-9-]+$/, type: 'chore' as const }
  ];

  // Check if branch name is empty
  if (!branchName.trim()) {
    return {
      valid: false,
      message: 'Branch name cannot be empty'
    };
  }

  // Check against valid patterns
  for (const { regex, type } of patterns) {
    if (regex.test(branchName)) {
      return {
        valid: true,
        type,
        message: \`Valid \${type} branch\`
      };
    }
  }

  return {
    valid: false,
    message: 'Branch name must follow pattern: type/description (e.g., feature/add-login)'
  };
}

// Usage examples
console.log(validateBranchName('feature/user-authentication'));
// { valid: true, type: 'feature', message: 'Valid feature branch' }

console.log(validateBranchName('bugfix/issue-123-fix-login'));
// { valid: true, type: 'bugfix', message: 'Valid bugfix branch' }

console.log(validateBranchName('invalid-branch'));
// { valid: false, message: 'Branch name must follow pattern...' }

export { validateBranchName };`,
    hints: [
      'Use regex patterns to match each branch type',
      'Check for empty or invalid branch names first',
      'Use lowercase and hyphens in branch descriptions',
      'Return descriptive error messages for invalid formats'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex05',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Conventional Commit Message Formatter',
    difficulty: 2,
    description: 'Build a commit message formatter that follows Conventional Commits specification. Parse and format commit messages with type, scope, description, and optional body/footer.',
    starterCode: `interface CommitMessage {
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';
  scope?: string;
  description: string;
  body?: string;
  breaking?: boolean;
}

// TODO: Format commit message according to Conventional Commits
// Format: type(scope): description
// Example: feat(auth): add login endpoint

function formatCommitMessage(commit: CommitMessage): string {
  // Implement formatter
}

// TODO: Parse conventional commit message
function parseCommitMessage(message: string): CommitMessage | null {
  // Implement parser
}

export { formatCommitMessage, parseCommitMessage };`,
    solution: `interface CommitMessage {
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';
  scope?: string;
  description: string;
  body?: string;
  breaking?: boolean;
}

function formatCommitMessage(commit: CommitMessage): string {
  let message = commit.type;

  if (commit.scope) {
    message += \`(\${commit.scope})\`;
  }

  if (commit.breaking) {
    message += '!';
  }

  message += \`: \${commit.description}\`;

  if (commit.body) {
    message += \`\\n\\n\${commit.body}\`;
  }

  if (commit.breaking) {
    message += '\\n\\nBREAKING CHANGE: This introduces a breaking change';
  }

  return message;
}

function parseCommitMessage(message: string): CommitMessage | null {
  // Regex for conventional commit format
  const regex = /^(feat|fix|docs|style|refactor|test|chore)(?:\\(([^)]+)\\))?(!)?:\\s*(.+)$/;
  const match = message.match(regex);

  if (!match) {
    return null;
  }

  const [, type, scope, breaking, description] = match;

  return {
    type: type as CommitMessage['type'],
    scope: scope || undefined,
    description: description.trim(),
    breaking: breaking === '!'
  };
}

// Usage examples
const commit: CommitMessage = {
  type: 'feat',
  scope: 'api',
  description: 'add user registration endpoint',
  body: 'Implements POST /api/auth/register with email validation'
};

console.log(formatCommitMessage(commit));
// Output: feat(api): add user registration endpoint
//
// Implements POST /api/auth/register with email validation

const parsed = parseCommitMessage('fix(auth): resolve token expiration bug');
console.log(parsed);
// { type: 'fix', scope: 'auth', description: 'resolve token expiration bug' }

export { formatCommitMessage, parseCommitMessage };`,
    hints: [
      'Build the message string step by step: type, scope, breaking indicator, description',
      'Use regex with capture groups to parse commit message components',
      'Handle optional scope and breaking change indicator',
      'Validate the commit type against allowed values'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex06',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Express Route Handler with Async Error Handling',
    difficulty: 2,
    description: 'Create a utility function that wraps Express route handlers to automatically catch async errors. This eliminates the need for try-catch blocks in every route handler.',
    starterCode: `import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// TODO: Create wrapper that catches async errors
function asyncHandler(handler: AsyncHandler) {
  // Implement wrapper
}

// Example route handler to wrap
async function getUserById(req: Request, res: Response) {
  const user = await database.users.findUnique({
    where: { id: req.params.id }
  });

  if (!user) {
    throw new Error('User not found');
  }

  res.json({ data: user });
}

export { asyncHandler };`,
    solution: `import { Request, Response, NextFunction } from 'express';

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

function asyncHandler(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next))
      .catch(next);
  };
}

// Example route handler to wrap
async function getUserById(req: Request, res: Response) {
  const user = await database.users.findUnique({
    where: { id: req.params.id }
  });

  if (!user) {
    throw new Error('User not found');
  }

  res.json({ data: user });
}

// Usage example
import express from 'express';
const app = express();

// Without asyncHandler (verbose)
app.get('/api/users/:id', async (req, res, next) => {
  try {
    await getUserById(req, res);
  } catch (error) {
    next(error);
  }
});

// With asyncHandler (clean)
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await database.users.findUnique({
    where: { id: req.params.id }
  });

  if (!user) {
    throw new Error('User not found');
  }

  res.json({ data: user });
}));

export { asyncHandler };`,
    hints: [
      'Return a new function that matches Express handler signature',
      'Wrap the handler call in Promise.resolve() to handle both sync and async',
      'Use .catch() to pass errors to the next() function',
      'The wrapper should preserve the original handler parameters'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex07',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Request Logging Middleware Chain',
    difficulty: 3,
    description: 'Implement a middleware chain for request logging that tracks request ID, duration, and user information. Build composable middleware functions that work together.',
    starterCode: `import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

interface RequestLog {
  requestId: string;
  method: string;
  path: string;
  userId?: string;
  startTime: number;
  duration?: number;
}

// TODO: Add unique request ID to each request
function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  // Implement request ID generation
}

// TODO: Log request details with timing
function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  // Implement request logging with duration
}

// TODO: Extract user ID from auth header
function userContextMiddleware(req: Request, res: Response, next: NextFunction) {
  // Implement user context extraction
}

export { requestIdMiddleware, requestLoggerMiddleware, userContextMiddleware };`,
    solution: `import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

interface RequestLog {
  requestId: string;
  method: string;
  path: string;
  userId?: string;
  startTime: number;
  duration?: number;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      userId?: string;
      startTime?: number;
    }
  }
}

function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  req.requestId = randomUUID();
  res.setHeader('X-Request-ID', req.requestId);
  next();
}

function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  req.startTime = Date.now();

  // Log on response finish
  res.on('finish', () => {
    const duration = Date.now() - (req.startTime || Date.now());
    const log: RequestLog = {
      requestId: req.requestId || 'unknown',
      method: req.method,
      path: req.path,
      userId: req.userId,
      startTime: req.startTime || Date.now(),
      duration
    };

    console.log(\`[\${log.requestId}] \${log.method} \${log.path} - \${duration}ms - User: \${log.userId || 'anonymous'}\`);
  });

  next();
}

function userContextMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extract user ID from Authorization header or JWT
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In real app, decode JWT here
    // For demo, extract mock user ID
    try {
      // Mock: extract user ID from token
      req.userId = 'user-123'; // In reality: jwt.verify(token).userId
    } catch (error) {
      // Invalid token, continue as anonymous
      req.userId = undefined;
    }
  }

  next();
}

// Usage example
import express from 'express';
const app = express();

// Apply middleware chain
app.use(requestIdMiddleware);
app.use(userContextMiddleware);
app.use(requestLoggerMiddleware);

// Example route
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Success',
    requestId: req.requestId,
    userId: req.userId
  });
});

export { requestIdMiddleware, requestLoggerMiddleware, userContextMiddleware };`,
    hints: [
      'Use res.on("finish") to log after response is sent',
      'Store request metadata on the req object',
      'Generate UUID for each request using randomUUID()',
      'Calculate duration by comparing timestamps'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex08',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'React Form with Controlled Inputs',
    difficulty: 3,
    description: 'Build a React registration form component with controlled inputs, real-time validation, and error display. Implement proper state management and validation feedback.',
    starterCode: `import React, { useState } from 'react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// TODO: Create registration form component
// - Controlled inputs for email, password, confirm password
// - Real-time validation
// - Display errors under each field
// - Disable submit button if form is invalid

export function RegistrationForm() {
  // Implement form component
}`,
    solution: `import React, { useState, useEffect } from 'react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validate email
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return 'Invalid email format';
    }
    return undefined;
  };

  // Validate password
  const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Must contain uppercase letter';
    if (!/[a-z]/.test(password)) return 'Must contain lowercase letter';
    if (!/[0-9]/.test(password)) return 'Must contain number';
    return undefined;
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPassword: string, password: string): string | undefined => {
    if (!confirmPassword) return 'Please confirm password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return undefined;
  };

  // Validate form on change
  useEffect(() => {
    const newErrors: FormErrors = {};

    if (touched.email) {
      newErrors.email = validateEmail(formData.email);
    }
    if (touched.password) {
      newErrors.password = validatePassword(formData.password);
    }
    if (touched.confirmPassword) {
      newErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      );
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const allErrors: FormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      )
    };

    if (Object.values(allErrors).some(error => error)) {
      setErrors(allErrors);
      setTouched({ email: true, password: true, confirmPassword: true });
      return;
    }

    // Submit form
    console.log('Form submitted:', formData);
  };

  const isFormValid = !Object.values(errors).some(error => error) &&
    formData.email && formData.password && formData.confirmPassword;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Register
      </button>
    </form>
  );
}`,
    hints: [
      'Use useState for form data and errors separately',
      'Track which fields have been touched for validation timing',
      'Validate on blur and on change after first touch',
      'Use useEffect to run validation when form data changes'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex09',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Custom React Hook for Data Fetching',
    difficulty: 3,
    description: 'Create a reusable React hook for data fetching with loading states, error handling, and automatic retries. Implement proper cleanup to prevent memory leaks.',
    starterCode: `import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// TODO: Create useFetch hook
// - Accepts URL and options
// - Handles loading, error, and data states
// - Implements retry logic
// - Cleans up on unmount

export function useFetch<T>(url: string, options?: RequestInit) {
  // Implement hook
}`,
    solution: `import { useState, useEffect, useRef } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

export function useFetch<T>(
  url: string,
  options: FetchOptions = {}
): FetchState<T> & { refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      let lastError: Error | null = null;

      // Retry logic
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const response = await fetch(url, {
            ...fetchOptions,
            signal: abortControllerRef.current.signal
          });

          if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
          }

          const result = await response.json();

          if (isMounted) {
            setData(result);
            setError(null);
            setLoading(false);
          }

          return; // Success, exit retry loop

        } catch (err) {
          lastError = err instanceof Error ? err : new Error('Unknown error');

          // Don't retry if aborted
          if (lastError.name === 'AbortError') {
            break;
          }

          // Wait before retry (except on last attempt)
          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          }
        }
      }

      // All retries failed
      if (isMounted && lastError) {
        setError(lastError);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
      abortControllerRef.current?.abort();
    };
  }, [url, refetchTrigger, retries, retryDelay]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
}

// Usage example
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, refetch } = useFetch<User>(
    \`/api/users/\${userId}\`,
    { retries: 3, retryDelay: 1000 }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message} <button onClick={refetch}>Retry</button></div>;
  if (!data) return <div>No data</div>;

  return <div>Welcome, {data.name}!</div>;
}`,
    hints: [
      'Use AbortController to cancel requests on unmount',
      'Track isMounted with a flag to prevent state updates after unmount',
      'Implement retry loop with delay using setTimeout',
      'Provide a refetch function using state trigger'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex10',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'API Client with Interceptors',
    difficulty: 4,
    description: 'Build a type-safe API client with request/response interceptors for authentication, error handling, and request transformation. Implement automatic token refresh and retry logic.',
    starterCode: `interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onError?: (error: Error) => Error | Promise<Error>;
}

interface ResponseInterceptor {
  onResponse?: (response: Response) => Response | Promise<Response>;
  onError?: (error: Error) => Error | Promise<Error>;
}

interface RequestConfig extends RequestInit {
  url: string;
  params?: Record<string, string>;
}

// TODO: Create API client class
// - Add request/response interceptors
// - Handle authentication tokens
// - Implement automatic token refresh
// - Type-safe methods (get, post, put, delete)

class ApiClient {
  // Implement API client
}

export { ApiClient };`,
    solution: `interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onError?: (error: Error) => Error | Promise<Error>;
}

interface ResponseInterceptor {
  onResponse?: (response: Response) => Response | Promise<Response>;
  onError?: (error: Error) => Error | Promise<Error>;
}

interface RequestConfig extends RequestInit {
  url: string;
  params?: Record<string, string>;
  skipAuth?: boolean;
}

class ApiClient {
  private baseURL: string;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Add default auth interceptor
    this.addRequestInterceptor({
      onRequest: async (config) => {
        if (!config.skipAuth && this.accessToken) {
          config.headers = {
            ...config.headers,
            'Authorization': \`Bearer \${this.accessToken}\`
          };
        }
        return config;
      }
    });

    // Add default response interceptor for token refresh
    this.addResponseInterceptor({
      onError: async (error: any) => {
        const originalRequest = error.config;

        // If 401 and we have refresh token, try to refresh
        if (error.response?.status === 401 && this.refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.post<{ accessToken: string }>('/auth/refresh', {
              refreshToken: this.refreshToken
            }, { skipAuth: true });

            this.setAccessToken(response.accessToken);

            // Retry original request
            return this.request(originalRequest);
          } catch (refreshError) {
            // Refresh failed, clear tokens
            this.clearTokens();
            throw refreshError;
          }
        }

        throw error;
      }
    });
  }

  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setRefreshToken(token: string) {
    this.refreshToken = token;
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  private buildURL(url: string, params?: Record<string, string>): string {
    const fullURL = url.startsWith('http') ? url : \`\${this.baseURL}\${url}\`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      return \`\${fullURL}?\${searchParams}\`;
    }

    return fullURL;
  }

  async request<T>(config: RequestConfig): Promise<T> {
    // Apply request interceptors
    let finalConfig = config;
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        try {
          finalConfig = await interceptor.onRequest(finalConfig);
        } catch (error) {
          if (interceptor.onError) {
            throw await interceptor.onError(error as Error);
          }
          throw error;
        }
      }
    }

    // Build URL with params
    const url = this.buildURL(finalConfig.url, finalConfig.params);

    try {
      // Make request
      let response = await fetch(url, {
        ...finalConfig,
        headers: {
          'Content-Type': 'application/json',
          ...finalConfig.headers
        }
      });

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponse) {
          response = await interceptor.onResponse(response);
        }
      }

      if (!response.ok) {
        const error: any = new Error(\`HTTP error! status: \${response.status}\`);
        error.response = response;
        error.config = finalConfig;
        throw error;
      }

      return await response.json();

    } catch (error) {
      // Apply error interceptors
      let finalError = error as Error;
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onError) {
          finalError = await interceptor.onError(finalError);
        }
      }
      throw finalError;
    }
  }

  async get<T>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'GET' });
  }

  async post<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({
      ...config,
      url,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ ...config, url, method: 'DELETE' });
  }
}

// Usage example
const api = new ApiClient('https://api.example.com');

// Add custom logging interceptor
api.addRequestInterceptor({
  onRequest: (config) => {
    console.log(\`Making request to \${config.url}\`);
    return config;
  }
});

// Login and set tokens
const loginResponse = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
api.setAccessToken(loginResponse.accessToken);
api.setRefreshToken(loginResponse.refreshToken);

// Make authenticated request
const userData = await api.get('/users/me');

export { ApiClient };`,
    hints: [
      'Store interceptors in arrays and apply them in sequence',
      'Use a retry flag on the request config to prevent infinite loops',
      'Apply request interceptors before the fetch call',
      'Apply response interceptors after receiving the response'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex11',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Database Connection Pool Manager',
    difficulty: 4,
    description: 'Implement a connection pool manager for PostgreSQL with health checks, connection recycling, and monitoring. Handle connection failures gracefully and provide pool statistics.',
    starterCode: `import { Pool, PoolClient, PoolConfig } from 'pg';

interface PoolStats {
  total: number;
  idle: number;
  waiting: number;
}

// TODO: Create connection pool manager
// - Initialize pool with config
// - Health check functionality
// - Connection acquisition with timeout
// - Pool statistics
// - Graceful shutdown

class DatabasePool {
  // Implement pool manager
}

export { DatabasePool };`,
    solution: `import { Pool, PoolClient, PoolConfig } from 'pg';

interface PoolStats {
  total: number;
  idle: number;
  waiting: number;
}

interface DatabasePoolConfig extends PoolConfig {
  healthCheckInterval?: number;
  connectionTimeout?: number;
}

class DatabasePool {
  private pool: Pool;
  private healthCheckInterval?: NodeJS.Timeout;
  private connectionTimeout: number;

  constructor(config: DatabasePoolConfig) {
    const {
      healthCheckInterval = 30000,
      connectionTimeout = 5000,
      ...poolConfig
    } = config;

    this.connectionTimeout = connectionTimeout;

    // Create pool with default config
    this.pool = new Pool({
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: connectionTimeout,
      ...poolConfig
    });

    // Set up event listeners
    this.setupEventListeners();

    // Start health checks if enabled
    if (healthCheckInterval > 0) {
      this.startHealthChecks(healthCheckInterval);
    }
  }

  private setupEventListeners() {
    this.pool.on('connect', (client) => {
      console.log('New client connected to pool');
    });

    this.pool.on('acquire', (client) => {
      console.log('Client acquired from pool');
    });

    this.pool.on('remove', (client) => {
      console.log('Client removed from pool');
    });

    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  private startHealthChecks(interval: number) {
    this.healthCheckInterval = setInterval(async () => {
      try {
        await this.healthCheck();
        console.log('Health check passed');
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, interval);
  }

  async healthCheck(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      try {
        const result = await client.query('SELECT 1');
        return result.rows.length === 1;
      } finally {
        client.release();
      }
    } catch (error) {
      throw new Error(\`Health check failed: \${error}\`);
    }
  }

  async getConnection(): Promise<PoolClient> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Connection acquisition timeout'));
      }, this.connectionTimeout);

      this.pool.connect()
        .then(client => {
          clearTimeout(timeout);
          resolve(client);
        })
        .catch(error => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  async query<T = any>(text: string, params?: any[]): Promise<T[]> {
    const client = await this.getConnection();
    try {
      const result = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.getConnection();

    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  getStats(): PoolStats {
    return {
      total: this.pool.totalCount,
      idle: this.pool.idleCount,
      waiting: this.pool.waitingCount
    };
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down database pool...');

    // Stop health checks
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // End pool
    await this.pool.end();
    console.log('Database pool shut down successfully');
  }
}

// Usage example
const db = new DatabasePool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: 'password',
  max: 20,
  healthCheckInterval: 30000
});

// Query with automatic connection management
const users = await db.query('SELECT * FROM users WHERE active = $1', [true]);

// Transaction example
await db.transaction(async (client) => {
  await client.query('INSERT INTO users (email) VALUES ($1)', ['user@example.com']);
  await client.query('INSERT INTO audit_log (action) VALUES ($1)', ['user_created']);
});

// Get pool statistics
const stats = db.getStats();
console.log(\`Pool: \${stats.idle}/\${stats.total} idle, \${stats.waiting} waiting\`);

// Graceful shutdown
process.on('SIGTERM', async () => {
  await db.shutdown();
  process.exit(0);
});

export { DatabasePool };`,
    hints: [
      'Use Pool event listeners to monitor connection lifecycle',
      'Implement health check using a simple SELECT 1 query',
      'Wrap connection acquisition in a promise with timeout',
      'Always release connections in finally blocks'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex12',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Type-Safe CRUD Repository with Prisma',
    difficulty: 4,
    description: 'Create a generic repository pattern for CRUD operations using Prisma ORM. Implement type-safe methods with query building, pagination, and filtering capabilities.',
    starterCode: `import { PrismaClient } from '@prisma/client';

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// TODO: Create generic repository class
// - Type-safe CRUD operations
// - Pagination support
// - Dynamic filtering
// - Sorting capabilities
// - Include relations

class Repository<T> {
  // Implement repository
}

export { Repository };`,
    solution: `import { PrismaClient } from '@prisma/client';

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

interface QueryOptions<T> {
  where?: any;
  include?: any;
  orderBy?: any;
  select?: any;
}

class Repository<T extends Record<string, any>> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  private getModel() {
    return (this.prisma as any)[this.modelName];
  }

  async findById(id: string | number, options?: QueryOptions<T>): Promise<T | null> {
    return this.getModel().findUnique({
      where: { id },
      ...options
    });
  }

  async findOne(options: QueryOptions<T>): Promise<T | null> {
    return this.getModel().findFirst(options);
  }

  async findMany(options?: QueryOptions<T>): Promise<T[]> {
    return this.getModel().findMany(options);
  }

  async findWithPagination(
    pagination: PaginationParams,
    options?: QueryOptions<T>
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.getModel().findMany({
        ...options,
        skip,
        take: limit
      }),
      this.getModel().count({ where: options?.where })
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async create(data: Partial<T>): Promise<T> {
    return this.getModel().create({ data });
  }

  async createMany(data: Partial<T>[]): Promise<{ count: number }> {
    return this.getModel().createMany({ data });
  }

  async update(id: string | number, data: Partial<T>): Promise<T> {
    return this.getModel().update({
      where: { id },
      data
    });
  }

  async updateMany(where: any, data: Partial<T>): Promise<{ count: number }> {
    return this.getModel().updateMany({
      where,
      data
    });
  }

  async delete(id: string | number): Promise<T> {
    return this.getModel().delete({
      where: { id }
    });
  }

  async deleteMany(where: any): Promise<{ count: number }> {
    return this.getModel().deleteMany({ where });
  }

  async count(where?: any): Promise<number> {
    return this.getModel().count({ where });
  }

  async exists(where: any): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }
}

// Usage example with specific models
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface Activity {
  id: string;
  userId: string;
  category: string;
  quantity: number;
  date: Date;
}

const prisma = new PrismaClient();

class UserRepository extends Repository<User> {
  constructor() {
    super(prisma, 'user');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}

class ActivityRepository extends Repository<Activity> {
  constructor() {
    super(prisma, 'activity');
  }

  async findByUser(userId: string, pagination: PaginationParams): Promise<PaginatedResult<Activity>> {
    return this.findWithPagination(pagination, {
      where: { userId },
      orderBy: { date: 'desc' }
    });
  }

  async getTotalByCategory(userId: string): Promise<Record<string, number>> {
    const activities = await this.findMany({
      where: { userId },
      select: { category: true, quantity: true }
    });

    return activities.reduce((acc, activity) => {
      acc[activity.category] = (acc[activity.category] || 0) + activity.quantity;
      return acc;
    }, {} as Record<string, number>);
  }
}

// Example usage
const userRepo = new UserRepository();
const activityRepo = new ActivityRepository();

// Create user
const user = await userRepo.create({
  email: 'user@example.com',
  name: 'John Doe'
});

// Find with pagination
const activities = await activityRepo.findByUser(user.id, {
  page: 1,
  limit: 10
});

console.log(\`Found \${activities.total} activities, showing page \${activities.page} of \${activities.totalPages}\`);

export { Repository, UserRepository, ActivityRepository };`,
    hints: [
      'Use (this.prisma as any)[modelName] to access models dynamically',
      'Combine findMany and count queries with Promise.all for pagination',
      'Accept generic QueryOptions to allow flexible querying',
      'Extend the base Repository class for model-specific methods'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex13',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Frontend-Backend Integration Layer',
    difficulty: 5,
    description: 'Build a complete integration layer that connects React frontend with Express backend. Implement real-time updates with Server-Sent Events, optimistic updates, and cache management.',
    starterCode: `// Backend: SSE endpoint
import { Request, Response } from 'express';

// TODO: Implement SSE endpoint for real-time updates
export function setupSSE(req: Request, res: Response) {
  // Implement SSE
}

// Frontend: Integration hook
import { useState, useEffect } from 'react';

interface DataState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

// TODO: Create integration hook with:
// - CRUD operations
// - Optimistic updates
// - SSE for real-time updates
// - Cache management

export function useDataSync<T>(endpoint: string) {
  // Implement hook
}`,
    solution: `// Backend: SSE endpoint
import { Request, Response } from 'express';
import { EventEmitter } from 'events';

class SSEManager extends EventEmitter {
  private clients: Map<string, Response> = new Map();

  addClient(clientId: string, res: Response) {
    this.clients.set(clientId, res);

    res.on('close', () => {
      this.clients.delete(clientId);
      console.log(\`Client \${clientId} disconnected\`);
    });
  }

  broadcast(event: string, data: any) {
    const message = \`event: \${event}\\ndata: \${JSON.stringify(data)}\\n\\n\`;

    this.clients.forEach((client, clientId) => {
      try {
        client.write(message);
      } catch (error) {
        console.error(\`Failed to send to client \${clientId}\`, error);
        this.clients.delete(clientId);
      }
    });
  }

  sendToClient(clientId: string, event: string, data: any) {
    const client = this.clients.get(clientId);
    if (client) {
      const message = \`event: \${event}\\ndata: \${JSON.stringify(data)}\\n\\n\`;
      client.write(message);
    }
  }
}

const sseManager = new SSEManager();

export function setupSSE(req: Request, res: Response) {
  const clientId = req.query.clientId as string || \`client-\${Date.now()}\`;

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connection message
  res.write(\`data: \${JSON.stringify({ type: 'connected', clientId })}\\n\\n\`);

  // Add client to manager
  sseManager.addClient(clientId, res);

  // Keep connection alive with heartbeat
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\\n\\n');
  }, 30000);

  res.on('close', () => {
    clearInterval(heartbeat);
  });
}

// Broadcast updates when data changes
export function broadcastUpdate(event: string, data: any) {
  sseManager.broadcast(event, data);
}

// Frontend: Integration hook
import { useState, useEffect, useCallback, useRef } from 'react';

interface DataState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

interface CacheEntry<T> {
  data: T[];
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function useDataSync<T extends { id: string }>(
  endpoint: string,
  options: { realtime?: boolean; cacheKey?: string } = {}
) {
  const [state, setState] = useState<DataState<T>>({
    data: [],
    loading: true,
    error: null
  });

  const eventSourceRef = useRef<EventSource | null>(null);
  const { realtime = true, cacheKey = endpoint } = options;

  // Check cache
  const getCachedData = useCallback(() => {
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    return null;
  }, [cacheKey]);

  // Update cache
  const updateCache = useCallback((data: T[]) => {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }, [cacheKey]);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      // Check cache first
      const cachedData = getCachedData();
      if (cachedData) {
        setState({ data: cachedData, loading: false, error: null });
        return;
      }

      setState(prev => ({ ...prev, loading: true }));

      const response = await fetch(\`/api\${endpoint}\`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      updateCache(data);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error as Error
      }));
    }
  }, [endpoint, getCachedData, updateCache]);

  // Create item with optimistic update
  const create = useCallback(async (item: Omit<T, 'id'>) => {
    const tempId = \`temp-\${Date.now()}\`;
    const optimisticItem = { ...item, id: tempId } as T;

    // Optimistic update
    setState(prev => ({
      ...prev,
      data: [...prev.data, optimisticItem]
    }));

    try {
      const response = await fetch(\`/api\${endpoint}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });

      if (!response.ok) throw new Error('Failed to create');

      const created = await response.json();

      // Replace optimistic item with real one
      setState(prev => ({
        ...prev,
        data: prev.data.map(i => i.id === tempId ? created : i)
      }));

      updateCache(state.data);
      return created;
    } catch (error) {
      // Rollback optimistic update
      setState(prev => ({
        ...prev,
        data: prev.data.filter(i => i.id !== tempId),
        error: error as Error
      }));
      throw error;
    }
  }, [endpoint, state.data, updateCache]);

  // Update item with optimistic update
  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const originalData = [...state.data];

    // Optimistic update
    setState(prev => ({
      ...prev,
      data: prev.data.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));

    try {
      const response = await fetch(\`/api\${endpoint}/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update');

      const updated = await response.json();

      setState(prev => ({
        ...prev,
        data: prev.data.map(i => i.id === id ? updated : i)
      }));

      updateCache(state.data);
      return updated;
    } catch (error) {
      // Rollback
      setState(prev => ({
        ...prev,
        data: originalData,
        error: error as Error
      }));
      throw error;
    }
  }, [endpoint, state.data, updateCache]);

  // Delete item with optimistic update
  const remove = useCallback(async (id: string) => {
    const originalData = [...state.data];

    // Optimistic update
    setState(prev => ({
      ...prev,
      data: prev.data.filter(item => item.id !== id)
    }));

    try {
      const response = await fetch(\`/api\${endpoint}/\${id}\`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete');

      updateCache(state.data);
    } catch (error) {
      // Rollback
      setState(prev => ({
        ...prev,
        data: originalData,
        error: error as Error
      }));
      throw error;
    }
  }, [endpoint, state.data, updateCache]);

  // Setup SSE for real-time updates
  useEffect(() => {
    if (!realtime) return;

    const clientId = \`client-\${Date.now()}\`;
    const eventSource = new EventSource(\`/api/events?clientId=\${clientId}\`);
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('created', (event) => {
      const item = JSON.parse(event.data);
      setState(prev => ({
        ...prev,
        data: [...prev.data, item]
      }));
    });

    eventSource.addEventListener('updated', (event) => {
      const item = JSON.parse(event.data);
      setState(prev => ({
        ...prev,
        data: prev.data.map(i => i.id === item.id ? item : i)
      }));
    });

    eventSource.addEventListener('deleted', (event) => {
      const { id } = JSON.parse(event.data);
      setState(prev => ({
        ...prev,
        data: prev.data.filter(i => i.id !== id)
      }));
    });

    return () => {
      eventSource.close();
    };
  }, [realtime]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    create,
    update,
    remove,
    refetch: fetchData
  };
}

// Usage example
function ActivityList() {
  const {
    data: activities,
    loading,
    error,
    create,
    update,
    remove
  } = useDataSync<Activity>('/activities', { realtime: true });

  const handleCreate = async () => {
    await create({
      category: 'transportation',
      quantity: 10,
      date: new Date()
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreate}>Add Activity</button>
      {activities.map(activity => (
        <div key={activity.id}>
          {activity.category} - {activity.quantity}
          <button onClick={() => update(activity.id, { quantity: activity.quantity + 1 })}>
            +
          </button>
          <button onClick={() => remove(activity.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export { setupSSE, broadcastUpdate, useDataSync };`,
    hints: [
      'Use EventSource API for SSE on the frontend',
      'Store original data before optimistic updates for rollback',
      'Implement cache with timestamps for TTL management',
      'Use EventEmitter pattern for managing SSE clients on backend'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex14',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Code Review Checklist Validator',
    difficulty: 5,
    description: 'Create an automated code review checklist validator that analyzes TypeScript code for common issues. Check for proper error handling, type safety, naming conventions, and code complexity.',
    starterCode: `import * as ts from 'typescript';

interface ReviewIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
}

interface ReviewResult {
  passed: boolean;
  issues: ReviewIssue[];
  score: number;
}

// TODO: Create code review validator
// - Parse TypeScript code
// - Check for proper error handling (try-catch)
// - Verify type annotations
// - Check naming conventions
// - Detect code smells
// - Calculate complexity score

export class CodeReviewValidator {
  // Implement validator
}`,
    solution: `import * as ts from 'typescript';

interface ReviewIssue {
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
  rule: string;
}

interface ReviewResult {
  passed: boolean;
  issues: ReviewIssue[];
  score: number;
  metrics: {
    complexity: number;
    linesOfCode: number;
    typeAnnotationCoverage: number;
  };
}

export class CodeReviewValidator {
  private sourceFile: ts.SourceFile;
  private issues: ReviewIssue[] = [];

  constructor(code: string, fileName: string = 'temp.ts') {
    this.sourceFile = ts.createSourceFile(
      fileName,
      code,
      ts.ScriptTarget.Latest,
      true
    );
  }

  validate(): ReviewResult {
    this.issues = [];

    // Run all checks
    this.checkErrorHandling();
    this.checkTypeAnnotations();
    this.checkNamingConventions();
    this.checkComplexity();
    this.checkCodeSmells();

    const metrics = {
      complexity: this.calculateComplexity(),
      linesOfCode: this.sourceFile.getLineAndCharacterOfPosition(this.sourceFile.end).line + 1,
      typeAnnotationCoverage: this.calculateTypeAnnotationCoverage()
    };

    // Calculate score (0-100)
    const errorCount = this.issues.filter(i => i.severity === 'error').length;
    const warningCount = this.issues.filter(i => i.severity === 'warning').length;
    const score = Math.max(0, 100 - (errorCount * 10) - (warningCount * 5));

    return {
      passed: errorCount === 0 && score >= 70,
      issues: this.issues,
      score,
      metrics
    };
  }

  private addIssue(issue: ReviewIssue) {
    this.issues.push(issue);
  }

  private getLineAndColumn(node: ts.Node) {
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.getStart());
    return { line: line + 1, column: character + 1 };
  }

  private checkErrorHandling() {
    const visit = (node: ts.Node) => {
      // Check async functions without try-catch
      if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node)) {
        const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);

        if (isAsync) {
          let hasTryCatch = false;

          const checkBody = (body: ts.Node) => {
            if (ts.isTryStatement(body)) {
              hasTryCatch = true;
            }
            ts.forEachChild(body, checkBody);
          };

          if (node.body) {
            checkBody(node.body);
          }

          if (!hasTryCatch) {
            const { line, column } = this.getLineAndColumn(node);
            this.addIssue({
              severity: 'warning',
              message: 'Async function should have error handling (try-catch)',
              line,
              column,
              rule: 'error-handling'
            });
          }
        }
      }

      // Check Promise usage without .catch()
      if (ts.isCallExpression(node)) {
        const text = node.expression.getText(this.sourceFile);
        if (text.includes('fetch') || text.includes('Promise')) {
          // Check if .catch() is chained
          let parent = node.parent;
          let hasCatch = false;

          while (parent && ts.isCallExpression(parent)) {
            if (parent.expression.getText(this.sourceFile).includes('.catch')) {
              hasCatch = true;
              break;
            }
            parent = parent.parent;
          }

          if (!hasCatch) {
            const { line, column } = this.getLineAndColumn(node);
            this.addIssue({
              severity: 'info',
              message: 'Promise should have .catch() handler',
              line,
              column,
              rule: 'promise-catch'
            });
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
  }

  private checkTypeAnnotations() {
    const visit = (node: ts.Node) => {
      // Check function parameters
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node)) {
        node.parameters.forEach(param => {
          if (!param.type && !param.initializer) {
            const { line, column } = this.getLineAndColumn(param);
            this.addIssue({
              severity: 'warning',
              message: \`Parameter '\${param.name.getText(this.sourceFile)}' should have type annotation\`,
              line,
              column,
              rule: 'type-annotation'
            });
          }
        });

        // Check return type
        if (!node.type && ts.isFunctionDeclaration(node)) {
          const { line, column } = this.getLineAndColumn(node);
          this.addIssue({
            severity: 'warning',
            message: 'Function should have return type annotation',
            line,
            column,
            rule: 'return-type'
          });
        }
      }

      // Check variable declarations
      if (ts.isVariableDeclaration(node)) {
        if (!node.type && !node.initializer) {
          const { line, column } = this.getLineAndColumn(node);
          this.addIssue({
            severity: 'info',
            message: \`Variable '\${node.name.getText(this.sourceFile)}' should have type annotation\`,
            line,
            column,
            rule: 'var-type'
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
  }

  private checkNamingConventions() {
    const visit = (node: ts.Node) => {
      // Check function names (camelCase)
      if (ts.isFunctionDeclaration(node) && node.name) {
        const name = node.name.text;
        if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
          const { line, column } = this.getLineAndColumn(node.name);
          this.addIssue({
            severity: 'info',
            message: \`Function '\${name}' should use camelCase\`,
            line,
            column,
            rule: 'naming-convention'
          });
        }
      }

      // Check class names (PascalCase)
      if (ts.isClassDeclaration(node) && node.name) {
        const name = node.name.text;
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
          const { line, column } = this.getLineAndColumn(node.name);
          this.addIssue({
            severity: 'info',
            message: \`Class '\${name}' should use PascalCase\`,
            line,
            column,
            rule: 'naming-convention'
          });
        }
      }

      // Check constants (UPPER_CASE)
      if (ts.isVariableDeclaration(node)) {
        const name = node.name.getText(this.sourceFile);
        const parent = node.parent;
        if (parent && ts.isVariableDeclarationList(parent)) {
          const isConst = (parent.flags & ts.NodeFlags.Const) !== 0;
          if (isConst && /^[A-Z_]+$/.test(name) === false && name === name.toUpperCase()) {
            // Allow UPPER_CASE for constants, but don't require it
          }
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
  }

  private checkComplexity() {
    const visit = (node: ts.Node) => {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const complexity = this.calculateFunctionComplexity(node);

        if (complexity > 10) {
          const { line, column } = this.getLineAndColumn(node);
          this.addIssue({
            severity: 'warning',
            message: \`Function has high cyclomatic complexity (\${complexity}). Consider refactoring.\`,
            line,
            column,
            rule: 'complexity'
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
  }

  private calculateFunctionComplexity(node: ts.FunctionDeclaration | ts.MethodDeclaration): number {
    let complexity = 1;

    const visit = (n: ts.Node) => {
      if (ts.isIfStatement(n) || ts.isConditionalExpression(n)) complexity++;
      if (ts.isWhileStatement(n) || ts.isDoStatement(n) || ts.isForStatement(n) || ts.isForInStatement(n) || ts.isForOfStatement(n)) complexity++;
      if (ts.isCaseClause(n)) complexity++;
      if (ts.isCatchClause(n)) complexity++;
      if (ts.isBinaryExpression(n) && (n.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken || n.operatorToken.kind === ts.SyntaxKind.BarBarToken)) complexity++;

      ts.forEachChild(n, visit);
    };

    if (node.body) {
      visit(node.body);
    }

    return complexity;
  }

  private calculateComplexity(): number {
    let totalComplexity = 0;
    let functionCount = 0;

    const visit = (node: ts.Node) => {
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        totalComplexity += this.calculateFunctionComplexity(node);
        functionCount++;
      }
      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);

    return functionCount > 0 ? totalComplexity / functionCount : 0;
  }

  private calculateTypeAnnotationCoverage(): number {
    let total = 0;
    let annotated = 0;

    const visit = (node: ts.Node) => {
      if (ts.isParameter(node) || ts.isVariableDeclaration(node)) {
        total++;
        if (node.type || node.initializer) annotated++;
      }
      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);

    return total > 0 ? (annotated / total) * 100 : 100;
  }

  private checkCodeSmells() {
    const visit = (node: ts.Node) => {
      // Check for magic numbers
      if (ts.isNumericLiteral(node)) {
        const value = parseInt(node.text);
        if (value > 1 && !this.isInConstDeclaration(node)) {
          const { line, column } = this.getLineAndColumn(node);
          this.addIssue({
            severity: 'info',
            message: \`Magic number \${value} should be a named constant\`,
            line,
            column,
            rule: 'magic-number'
          });
        }
      }

      // Check for long parameter lists
      if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        if (node.parameters.length > 4) {
          const { line, column } = this.getLineAndColumn(node);
          this.addIssue({
            severity: 'info',
            message: \`Function has \${node.parameters.length} parameters. Consider using an options object.\`,
            line,
            column,
            rule: 'parameter-count'
          });
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(this.sourceFile);
  }

  private isInConstDeclaration(node: ts.Node): boolean {
    let parent = node.parent;
    while (parent) {
      if (ts.isVariableDeclaration(parent)) {
        const grandParent = parent.parent;
        if (grandParent && ts.isVariableDeclarationList(grandParent)) {
          return (grandParent.flags & ts.NodeFlags.Const) !== 0;
        }
      }
      parent = parent.parent;
    }
    return false;
  }
}

// Usage example
const code = \`
async function fetchUser(id: string) {
  const response = await fetch(\\\`/api/users/\\\${id}\\\`);
  return response.json();
}

function calculateTotal(a, b, c, d, e) {
  return a + b + c + d + e + 100;
}
\`;

const validator = new CodeReviewValidator(code);
const result = validator.validate();

console.log(\`Review Score: \${result.score}/100\`);
console.log(\`Passed: \${result.passed}\`);
console.log(\`\\nIssues:\`);
result.issues.forEach(issue => {
  console.log(\`  [\${issue.severity}] Line \${issue.line}: \${issue.message}\`);
});

export { CodeReviewValidator };`,
    hints: [
      'Use TypeScript Compiler API to parse and traverse the AST',
      'Track different node types for different checks (functions, variables, etc)',
      'Calculate cyclomatic complexity by counting decision points',
      'Use node.parent to traverse up the tree for context'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex15',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Pull Request Template Generator',
    difficulty: 3,
    description: 'Create a tool that generates comprehensive pull request descriptions by analyzing Git diff and commit history. Extract meaningful information and format it according to PR templates.',
    starterCode: `import { execSync } from 'child_process';

interface PRTemplate {
  title: string;
  description: string;
  changes: string[];
  testPlan: string[];
  breaking: boolean;
  linkedIssues: string[];
}

// TODO: Create PR template generator
// - Analyze git diff
// - Parse commit messages
// - Extract file changes
// - Detect breaking changes
// - Generate formatted PR description

export class PRTemplateGenerator {
  // Implement generator
}`,
    solution: `import { execSync } from 'child_process';

interface PRTemplate {
  title: string;
  description: string;
  changes: string[];
  testPlan: string[];
  breaking: boolean;
  linkedIssues: string[];
  filesChanged: {
    added: string[];
    modified: string[];
    deleted: string[];
  };
}

interface CommitInfo {
  hash: string;
  message: string;
  type?: string;
  scope?: string;
  breaking: boolean;
}

export class PRTemplateGenerator {
  private baseBranch: string;

  constructor(baseBranch: string = 'main') {
    this.baseBranch = baseBranch;
  }

  generate(): PRTemplate {
    const commits = this.getCommits();
    const fileChanges = this.getFileChanges();
    const diff = this.getDiff();

    const title = this.generateTitle(commits);
    const description = this.generateDescription(commits);
    const changes = this.extractChanges(commits);
    const testPlan = this.generateTestPlan(fileChanges);
    const breaking = commits.some(c => c.breaking);
    const linkedIssues = this.extractIssues(commits);

    return {
      title,
      description,
      changes,
      testPlan,
      breaking,
      linkedIssues,
      filesChanged: fileChanges
    };
  }

  private getCommits(): CommitInfo[] {
    try {
      const output = execSync(
        \`git log \${this.baseBranch}..HEAD --pretty=format:"%H|%s"\`,
        { encoding: 'utf-8' }
      );

      return output
        .split('\\n')
        .filter(line => line.trim())
        .map(line => {
          const [hash, message] = line.split('|');
          return this.parseCommit(hash, message);
        });
    } catch (error) {
      console.error('Failed to get commits:', error);
      return [];
    }
  }

  private parseCommit(hash: string, message: string): CommitInfo {
    // Parse conventional commit format
    const conventionalRegex = /^(\\w+)(\\(([^)]+)\\))?(!)?:\\s*(.+)$/;
    const match = message.match(conventionalRegex);

    if (match) {
      const [, type, , scope, breaking, msg] = match;
      return {
        hash,
        message: msg,
        type,
        scope,
        breaking: breaking === '!'
      };
    }

    // Check for BREAKING CHANGE in message
    const breaking = message.includes('BREAKING CHANGE');

    return {
      hash,
      message,
      breaking
    };
  }

  private getFileChanges() {
    try {
      const added = this.getFilesByStatus('A');
      const modified = this.getFilesByStatus('M');
      const deleted = this.getFilesByStatus('D');

      return { added, modified, deleted };
    } catch (error) {
      console.error('Failed to get file changes:', error);
      return { added: [], modified: [], deleted: [] };
    }
  }

  private getFilesByStatus(status: string): string[] {
    try {
      const output = execSync(
        \`git diff --name-only --diff-filter=\${status} \${this.baseBranch}..HEAD\`,
        { encoding: 'utf-8' }
      );

      return output.split('\\n').filter(line => line.trim());
    } catch (error) {
      return [];
    }
  }

  private getDiff(): string {
    try {
      return execSync(\`git diff \${this.baseBranch}..HEAD\`, { encoding: 'utf-8' });
    } catch (error) {
      return '';
    }
  }

  private generateTitle(commits: CommitInfo[]): string {
    if (commits.length === 0) {
      return 'Update';
    }

    // Group by type
    const types = commits.map(c => c.type).filter(Boolean);
    const uniqueTypes = [...new Set(types)];

    if (uniqueTypes.length === 1) {
      const type = uniqueTypes[0];
      const typeMap: Record<string, string> = {
        feat: 'Add',
        fix: 'Fix',
        docs: 'Update documentation',
        refactor: 'Refactor',
        test: 'Add tests',
        chore: 'Update'
      };

      const prefix = typeMap[type] || 'Update';

      // Use first commit message
      const firstCommit = commits[0];
      return \`\${prefix}: \${firstCommit.message}\`;
    }

    // Multiple types - use generic title
    return \`Update: Multiple changes (\${commits.length} commits)\`;
  }

  private generateDescription(commits: CommitInfo[]): string {
    const parts: string[] = [];

    // Group commits by type
    const grouped = commits.reduce((acc, commit) => {
      const type = commit.type || 'other';
      if (!acc[type]) acc[type] = [];
      acc[type].push(commit);
      return acc;
    }, {} as Record<string, CommitInfo[]>);

    // Format each group
    Object.entries(grouped).forEach(([type, commits]) => {
      const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
      parts.push(\`### \${typeLabel}\`);
      commits.forEach(commit => {
        const scope = commit.scope ? \`**\${commit.scope}**: \` : '';
        parts.push(\`- \${scope}\${commit.message}\`);
      });
      parts.push('');
    });

    return parts.join('\\n');
  }

  private extractChanges(commits: CommitInfo[]): string[] {
    return commits.map(commit => {
      const scope = commit.scope ? \`[\${commit.scope}] \` : '';
      return \`\${scope}\${commit.message}\`;
    });
  }

  private generateTestPlan(fileChanges: PRTemplate['filesChanged']): string[] {
    const plan: string[] = [];

    if (fileChanges.added.length > 0) {
      plan.push('Test new functionality in added files');
      fileChanges.added.forEach(file => {
        if (file.includes('test')) {
          plan.push(\`Run tests in \${file}\`);
        }
      });
    }

    if (fileChanges.modified.length > 0) {
      plan.push('Verify existing functionality still works');

      // Check for specific file types
      const hasBackend = fileChanges.modified.some(f =>
        f.includes('api/') || f.includes('server/') || f.endsWith('.controller.ts')
      );
      const hasFrontend = fileChanges.modified.some(f =>
        f.includes('components/') || f.endsWith('.tsx')
      );

      if (hasBackend) {
        plan.push('Test API endpoints manually or with Postman');
      }
      if (hasFrontend) {
        plan.push('Test UI changes in browser');
      }
    }

    if (plan.length === 0) {
      plan.push('Run all tests: npm test');
      plan.push('Verify build: npm run build');
    }

    return plan;
  }

  private extractIssues(commits: CommitInfo[]): string[] {
    const issues = new Set<string>();
    const issueRegex = /#(\\d+)/g;

    commits.forEach(commit => {
      const matches = commit.message.matchAll(issueRegex);
      for (const match of matches) {
        issues.add(match[1]);
      }
    });

    return Array.from(issues);
  }

  formatAsMarkdown(): string {
    const template = this.generate();

    const sections: string[] = [];

    // Title
    sections.push(\`# \${template.title}\\n\`);

    // Breaking change warning
    if (template.breaking) {
      sections.push('## ⚠️ BREAKING CHANGE\\n');
      sections.push('This PR contains breaking changes. Please review carefully.\\n');
    }

    // Description
    sections.push('## Description\\n');
    sections.push(template.description);

    // Changes
    if (template.changes.length > 0) {
      sections.push('## Changes\\n');
      template.changes.forEach(change => {
        sections.push(\`- \${change}\`);
      });
      sections.push('');
    }

    // Files changed
    sections.push('## Files Changed\\n');
    if (template.filesChanged.added.length > 0) {
      sections.push(\`**Added (\${template.filesChanged.added.length}):**\`);
      template.filesChanged.added.forEach(file => sections.push(\`- \${file}\`));
      sections.push('');
    }
    if (template.filesChanged.modified.length > 0) {
      sections.push(\`**Modified (\${template.filesChanged.modified.length}):**\`);
      template.filesChanged.modified.forEach(file => sections.push(\`- \${file}\`));
      sections.push('');
    }
    if (template.filesChanged.deleted.length > 0) {
      sections.push(\`**Deleted (\${template.filesChanged.deleted.length}):**\`);
      template.filesChanged.deleted.forEach(file => sections.push(\`- \${file}\`));
      sections.push('');
    }

    // Test plan
    sections.push('## Test Plan\\n');
    template.testPlan.forEach((step, i) => {
      sections.push(\`\${i + 1}. \${step}\`);
    });
    sections.push('');

    // Linked issues
    if (template.linkedIssues.length > 0) {
      sections.push('## Related Issues\\n');
      template.linkedIssues.forEach(issue => {
        sections.push(\`- Closes #\${issue}\`);
      });
      sections.push('');
    }

    return sections.join('\\n');
  }
}

// Usage example
const generator = new PRTemplateGenerator('main');
const markdown = generator.formatAsMarkdown();
console.log(markdown);

// Output to file
import { writeFileSync } from 'fs';
writeFileSync('PR_DESCRIPTION.md', markdown);

export { PRTemplateGenerator };`,
    hints: [
      'Use git log with custom format to get commit messages',
      'Parse conventional commit format with regex',
      'Use git diff --name-only with --diff-filter to get file changes by status',
      'Extract issue numbers from commit messages using regex'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t3-ex16',
    subjectId: 'cs404',
    topicId: 'topic-3',
    title: 'Development Workflow Automation Script',
    difficulty: 5,
    description: 'Build a comprehensive workflow automation tool that handles common development tasks: branch creation, commit formatting, pre-push checks, and deployment preparation. Integrate multiple Git operations and validation steps.',
    starterCode: `import { execSync } from 'child_process';
import prompts from 'prompts';

interface WorkflowConfig {
  baseBranch: string;
  requireTests: boolean;
  requireLinting: boolean;
  conventionalCommits: boolean;
}

// TODO: Create workflow automation tool
// - Interactive branch creation
// - Automated commit message formatting
// - Pre-push validation (tests, lint, build)
// - Change detection and impact analysis
// - Deployment checklist generation

export class WorkflowAutomation {
  // Implement automation tool
}`,
    solution: `import { execSync } from 'child_process';
import prompts from 'prompts';
import chalk from 'chalk';

interface WorkflowConfig {
  baseBranch: string;
  requireTests: boolean;
  requireLinting: boolean;
  conventionalCommits: boolean;
  remoteUrl?: string;
}

interface BranchInfo {
  name: string;
  type: 'feature' | 'bugfix' | 'hotfix' | 'release' | 'chore';
  description: string;
}

interface CommitInfo {
  type: string;
  scope?: string;
  message: string;
  breaking: boolean;
}

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

export class WorkflowAutomation {
  private config: WorkflowConfig;

  constructor(config: Partial<WorkflowConfig> = {}) {
    this.config = {
      baseBranch: 'main',
      requireTests: true,
      requireLinting: true,
      conventionalCommits: true,
      ...config
    };
  }

  private exec(command: string, silent: boolean = false): string {
    try {
      return execSync(command, {
        encoding: 'utf-8',
        stdio: silent ? 'pipe' : 'inherit'
      });
    } catch (error: any) {
      throw new Error(\`Command failed: \${command}\\n\${error.message}\`);
    }
  }

  private execSilent(command: string): string {
    return this.exec(command, true);
  }

  async createBranch(): Promise<void> {
    console.log(chalk.blue('\\n📦 Creating new branch...\\n'));

    // Get current branch
    const currentBranch = this.execSilent('git rev-parse --abbrev-ref HEAD').trim();

    if (currentBranch !== this.config.baseBranch) {
      const { switchBase } = await prompts({
        type: 'confirm',
        name: 'switchBase',
        message: \`You're on '\${currentBranch}'. Switch to '\${this.config.baseBranch}'?\`,
        initial: true
      });

      if (switchBase) {
        this.exec(\`git checkout \${this.config.baseBranch}\`);
        this.exec('git pull origin ' + this.config.baseBranch);
      }
    }

    // Get branch details
    const response = await prompts([
      {
        type: 'select',
        name: 'type',
        message: 'Branch type:',
        choices: [
          { title: 'Feature', value: 'feature' },
          { title: 'Bugfix', value: 'bugfix' },
          { title: 'Hotfix', value: 'hotfix' },
          { title: 'Release', value: 'release' },
          { title: 'Chore', value: 'chore' }
        ]
      },
      {
        type: 'text',
        name: 'description',
        message: 'Branch description (kebab-case):',
        validate: (value: string) =>
          /^[a-z0-9-]+$/.test(value) || 'Use lowercase letters, numbers, and hyphens only'
      }
    ]);

    const branchName = \`\${response.type}/\${response.description}\`;

    // Create and checkout branch
    this.exec(\`git checkout -b \${branchName}\`);

    console.log(chalk.green(\`\\n✓ Created and switched to branch: \${branchName}\\n\`));
  }

  async createCommit(): Promise<void> {
    console.log(chalk.blue('\\n📝 Creating commit...\\n'));

    // Check for staged changes
    const stagedFiles = this.execSilent('git diff --cached --name-only').trim();

    if (!stagedFiles) {
      console.log(chalk.yellow('No staged changes. Stage files first with: git add <files>'));
      return;
    }

    console.log(chalk.gray('Staged files:'));
    stagedFiles.split('\\n').forEach(file => {
      console.log(chalk.gray(\`  - \${file}\`));
    });
    console.log('');

    let commitMessage: string;

    if (this.config.conventionalCommits) {
      const response = await prompts([
        {
          type: 'select',
          name: 'type',
          message: 'Commit type:',
          choices: [
            { title: 'feat: New feature', value: 'feat' },
            { title: 'fix: Bug fix', value: 'fix' },
            { title: 'docs: Documentation', value: 'docs' },
            { title: 'style: Code style', value: 'style' },
            { title: 'refactor: Code refactoring', value: 'refactor' },
            { title: 'test: Tests', value: 'test' },
            { title: 'chore: Maintenance', value: 'chore' }
          ]
        },
        {
          type: 'text',
          name: 'scope',
          message: 'Scope (optional):',
        },
        {
          type: 'text',
          name: 'message',
          message: 'Commit message:',
          validate: (value: string) => value.length > 0 || 'Message required'
        },
        {
          type: 'confirm',
          name: 'breaking',
          message: 'Breaking change?',
          initial: false
        },
        {
          type: (prev: boolean) => prev ? 'text' : null,
          name: 'breakingDescription',
          message: 'Describe the breaking change:'
        }
      ]);

      // Format conventional commit
      const scope = response.scope ? \`(\${response.scope})\` : '';
      const breaking = response.breaking ? '!' : '';
      commitMessage = \`\${response.type}\${scope}\${breaking}: \${response.message}\`;

      if (response.breaking && response.breakingDescription) {
        commitMessage += \`\\n\\nBREAKING CHANGE: \${response.breakingDescription}\`;
      }
    } else {
      const { message } = await prompts({
        type: 'text',
        name: 'message',
        message: 'Commit message:',
        validate: (value: string) => value.length > 0 || 'Message required'
      });
      commitMessage = message;
    }

    // Create commit
    this.exec(\`git commit -m "\${commitMessage}"\`);

    console.log(chalk.green('\\n✓ Commit created successfully\\n'));
  }

  async prePushCheck(): Promise<boolean> {
    console.log(chalk.blue('\\n🔍 Running pre-push checks...\\n'));

    const results: ValidationResult = {
      passed: true,
      errors: [],
      warnings: []
    };

    // Check for uncommitted changes
    const uncommitted = this.execSilent('git status --porcelain').trim();
    if (uncommitted) {
      results.warnings.push('You have uncommitted changes');
    }

    // Run linting
    if (this.config.requireLinting) {
      console.log(chalk.gray('Running linter...'));
      try {
        this.execSilent('npm run lint');
        console.log(chalk.green('✓ Linting passed'));
      } catch (error) {
        results.errors.push('Linting failed');
        results.passed = false;
        console.log(chalk.red('✗ Linting failed'));
      }
    }

    // Run tests
    if (this.config.requireTests) {
      console.log(chalk.gray('Running tests...'));
      try {
        this.execSilent('npm test');
        console.log(chalk.green('✓ Tests passed'));
      } catch (error) {
        results.errors.push('Tests failed');
        results.passed = false;
        console.log(chalk.red('✗ Tests failed'));
      }
    }

    // Check build
    console.log(chalk.gray('Checking build...'));
    try {
      this.execSilent('npm run build');
      console.log(chalk.green('✓ Build successful'));
    } catch (error) {
      results.errors.push('Build failed');
      results.passed = false;
      console.log(chalk.red('✗ Build failed'));
    }

    // Check for merge conflicts with base branch
    try {
      this.execSilent(\`git fetch origin \${this.config.baseBranch}\`);
      const conflicts = this.execSilent(
        \`git merge-tree \\\`git merge-base HEAD origin/\${this.config.baseBranch}\\\` HEAD origin/\${this.config.baseBranch}\`
      );

      if (conflicts.includes('<<<<<<<')) {
        results.warnings.push('Potential merge conflicts with base branch');
      }
    } catch (error) {
      results.warnings.push('Could not check for merge conflicts');
    }

    // Display results
    console.log('');
    if (results.errors.length > 0) {
      console.log(chalk.red('\\n❌ Pre-push checks failed:\\n'));
      results.errors.forEach(error => {
        console.log(chalk.red(\`  ✗ \${error}\`));
      });
    }

    if (results.warnings.length > 0) {
      console.log(chalk.yellow('\\n⚠️  Warnings:\\n'));
      results.warnings.forEach(warning => {
        console.log(chalk.yellow(\`  ! \${warning}\`));
      });
    }

    if (results.passed) {
      console.log(chalk.green('\\n✓ All checks passed!\\n'));
    }

    return results.passed;
  }

  async push(): Promise<void> {
    console.log(chalk.blue('\\n🚀 Pushing changes...\\n'));

    // Run pre-push checks
    const checksPass = await this.prePushCheck();

    if (!checksPass) {
      const { forcePush } = await prompts({
        type: 'confirm',
        name: 'forcePush',
        message: 'Checks failed. Push anyway?',
        initial: false
      });

      if (!forcePush) {
        console.log(chalk.yellow('\\nPush cancelled\\n'));
        return;
      }
    }

    // Get current branch
    const branch = this.execSilent('git rev-parse --abbrev-ref HEAD').trim();

    // Push
    try {
      this.exec(\`git push -u origin \${branch}\`);
      console.log(chalk.green(\`\\n✓ Pushed to origin/\${branch}\\n\`));

      // Generate PR URL
      const remoteUrl = this.execSilent('git config --get remote.origin.url').trim();
      if (remoteUrl.includes('github.com')) {
        const repoPath = remoteUrl
          .replace(/^.*github\\.com[:\\/]/, '')
          .replace(/\\.git$/, '');
        const prUrl = \`https://github.com/\${repoPath}/compare/\${this.config.baseBranch}...\${branch}?expand=1\`;
        console.log(chalk.blue(\`Create PR: \${prUrl}\\n\`));
      }
    } catch (error) {
      console.log(chalk.red('\\n✗ Push failed\\n'));
      throw error;
    }
  }

  async deploymentChecklist(): Promise<void> {
    console.log(chalk.blue('\\n📋 Deployment Checklist\\n'));

    const checklist = [
      'All tests passing',
      'Linting checks pass',
      'Build successful',
      'No merge conflicts',
      'Database migrations ready',
      'Environment variables configured',
      'Documentation updated',
      'Change log updated',
      'Version bumped (if needed)',
      'Backup plan in place'
    ];

    const responses = await prompts(
      checklist.map((item, i) => ({
        type: 'confirm',
        name: \`check\${i}\`,
        message: item,
        initial: false
      }))
    );

    const allChecked = Object.values(responses).every(v => v === true);

    if (allChecked) {
      console.log(chalk.green('\\n✓ All deployment checks completed!\\n'));
    } else {
      console.log(chalk.yellow('\\n⚠️  Some checks incomplete\\n'));
    }
  }

  async run(): Promise<void> {
    const { action } = await prompts({
      type: 'select',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { title: 'Create branch', value: 'branch' },
        { title: 'Create commit', value: 'commit' },
        { title: 'Run pre-push checks', value: 'check' },
        { title: 'Push changes', value: 'push' },
        { title: 'Deployment checklist', value: 'deploy' }
      ]
    });

    switch (action) {
      case 'branch':
        await this.createBranch();
        break;
      case 'commit':
        await this.createCommit();
        break;
      case 'check':
        await this.prePushCheck();
        break;
      case 'push':
        await this.push();
        break;
      case 'deploy':
        await this.deploymentChecklist();
        break;
    }
  }
}

// CLI entry point
if (require.main === module) {
  const automation = new WorkflowAutomation();
  automation.run().catch(error => {
    console.error(chalk.red('Error:', error.message));
    process.exit(1);
  });
}

export { WorkflowAutomation };`,
    hints: [
      'Use prompts library for interactive CLI inputs',
      'Use execSync with { stdio: "pipe" } for silent execution',
      'Run validation checks in sequence and collect all errors',
      'Use chalk for colored console output to improve UX'
    ],
    testCases: [],
    language: 'typescript'
  }
];
