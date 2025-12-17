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
  }
];
