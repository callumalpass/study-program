# Backend Development

## Introduction

Backend development forms the engine room of your capstone project. It's where you implement the business logic, manage data persistence, handle security, and expose APIs for your frontend to consume. Whether you're using Node.js with Express, Python with Flask, or another technology stack, the fundamental principles remain consistent: clean architecture, robust error handling, and secure data management.

In modern web applications, the backend serves as both the gatekeeper and the brain. It validates requests, enforces business rules, manages data integrity, and coordinates complex operations. For capstone projects, backend development typically involves creating RESTful APIs that perform CRUD operations on your data models. Express.js paired with Prisma ORM provides an excellent foundation for building type-safe, maintainable backends with minimal boilerplate. The combination allows you to define your data schema declaratively, generate type-safe database clients automatically, and focus on implementing business logic rather than wrestling with raw SQL queries.

## Setting Up Express.js with TypeScript

Express.js is the de facto standard for Node.js web applications. Setting it up with TypeScript adds type safety and better development experience. Here's a production-ready setup:

```typescript
// src/index.ts - Main application entry point
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-origin resource sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

This setup includes essential middleware for security (helmet), cross-origin requests (cors), request parsing, logging, error handling, and graceful shutdown. Each middleware serves a specific purpose and demonstrates production-ready practices.

## Database Operations with Prisma

Prisma ORM simplifies database operations while maintaining type safety. Define your schema once, and Prisma generates a fully-typed client:

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  status      String   @default("pending")
  priority    String   @default("medium")
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// src/services/task.service.ts - Business logic layer
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskService {
  async createTask(userId: string, data: { title: string; description?: string; priority?: string }) {
    // Validation
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Task title is required');
    }

    if (data.title.length > 200) {
      throw new Error('Task title must be less than 200 characters');
    }

    // Create task
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority || 'medium',
        userId
      }
    });
  }

  async getTasksByUser(userId: string) {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTaskById(taskId: string, userId: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      throw new Error('Task not found');
    }

    if (task.userId !== userId) {
      throw new Error('Unauthorized to access this task');
    }

    return task;
  }

  async updateTask(taskId: string, userId: string, data: Partial<{ title: string; description: string; status: string; priority: string }>) {
    // Verify ownership
    await this.getTaskById(taskId, userId);

    return await prisma.task.update({
      where: { id: taskId },
      data
    });
  }

  async deleteTask(taskId: string, userId: string) {
    // Verify ownership
    await this.getTaskById(taskId, userId);

    return await prisma.task.delete({
      where: { id: taskId }
    });
  }

  async getTaskStats(userId: string) {
    const tasks = await prisma.task.findMany({
      where: { userId }
    });

    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  }
}
```

This service layer demonstrates several best practices: input validation, authorization checks (ensuring users can only access their own tasks), descriptive error messages, and separation of business logic from routing logic.

## Implementing RESTful API Routes

Routes define your API endpoints and delegate to service classes:

```typescript
// src/routes/task.routes.ts
import express from 'express';
import { TaskService } from '../services/task.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();
const taskService = new TaskService();

// All routes require authentication
router.use(authMiddleware);

// Create task
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id; // Set by authMiddleware
    const task = await taskService.createTask(userId, req.body);

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks for user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getTasksByUser(userId);

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task statistics
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await taskService.getTaskStats(userId);

    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await taskService.getTaskById(req.params.id, userId);

    res.json({ task });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
                       error.message.includes('Unauthorized') ? 403 : 500;
    res.status(statusCode).json({ message: error.message });
  }
});

// Update task
router.patch('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await taskService.updateTask(req.params.id, userId, req.body);

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
                       error.message.includes('Unauthorized') ? 403 : 400;
    res.status(statusCode).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    await taskService.deleteTask(req.params.id, userId);

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 :
                       error.message.includes('Unauthorized') ? 403 : 500;
    res.status(statusCode).json({ message: error.message });
  }
});

export default router;
```

Notice the consistent error handling, appropriate HTTP status codes, and how the authentication middleware provides the user context for all operations.

## Key Takeaways

- Structure your backend in layers: routes handle HTTP, services handle business logic, Prisma handles data access
- Use TypeScript for type safety and better developer experience
- Implement authentication middleware to protect routes and provide user context
- Validate all inputs—never trust client data
- Use appropriate HTTP status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)
- Centralize error handling with Express error middleware
- Keep your routes thin—delegate complex logic to service classes
- Use Prisma for type-safe database operations and automatic migrations
- Implement graceful shutdown to clean up database connections

## Common Mistakes

### Mistake 1: Putting Business Logic in Routes
**Problem:** Routes become bloated with validation, calculations, and complex logic, making them difficult to test and reuse.
**Solution:** Keep routes thin. They should parse requests, call service methods, and format responses. Move all business logic to service classes.

### Mistake 2: Inconsistent Error Handling
**Problem:** Some routes throw errors, others return error responses, creating unpredictable behavior and poor developer experience.
**Solution:** Establish a consistent pattern. Throw errors in services, catch them in routes, and use error middleware for unhandled exceptions.

### Mistake 3: Missing Authorization Checks
**Problem:** Checking authentication but not authorization allows authenticated users to access or modify other users' data.
**Solution:** Always verify that the authenticated user has permission to access the requested resource. Check ownership in your service layer.

### Mistake 4: Not Using Database Transactions
**Problem:** Complex operations that modify multiple records can leave the database in an inconsistent state if one operation fails.
**Solution:** Use Prisma transactions for operations that must succeed or fail atomically: `await prisma.$transaction([operation1, operation2])`.

## Summary

Backend development for your capstone project requires attention to architecture, security, and maintainability. By structuring your code in clear layers, implementing comprehensive error handling, validating all inputs, and using modern tools like Express.js and Prisma, you create a solid foundation for your application. Remember that the backend is the trusted layer of your application—it must enforce all business rules and security constraints because frontend code can be manipulated. Build with the assumption that every request could be malicious, and validate accordingly.
