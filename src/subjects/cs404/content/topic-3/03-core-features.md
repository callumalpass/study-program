# Core Features Implementation

## Introduction

Implementing core features is where your capstone project transforms from abstract planning into tangible software. This critical phase involves translating requirements and designs into working code that delivers value to users. The key principle guiding this phase is building your Minimum Viable Product (MVP) first—the essential features that define your application's core purpose.

The MVP approach isn't about building a limited or inferior product; it's about strategic focus. By prioritizing authentication, core CRUD operations, and essential user workflows, you create a solid foundation that can be tested, validated, and built upon. This methodology reduces risk, enables faster feedback cycles, and ensures you have a working application even if timeline constraints limit additional features. Quality matters more than quantity—a well-implemented core feature set demonstrates professional software engineering more effectively than numerous half-finished features.

## Understanding Feature Prioritization

Feature prioritization is the strategic process of determining which features to build first. The MoSCoW method provides an excellent framework: Must have, Should have, Could have, and Won't have. For your capstone project, focus exclusively on "Must have" features during Implementation Sprint 1.

Must-have features typically include user authentication (if your application has users), the primary data entities and their CRUD operations, and the core workflow that defines your application's purpose. If you're building a task management system, creating, viewing, updating, and deleting tasks are must-haves. Advanced features like task sharing, comments, or analytics are should-haves or could-haves.

Consider the dependency chain when prioritizing. Authentication often must come first because other features depend on it. Similarly, basic data models must exist before you can implement features that manipulate that data. Create a dependency graph of your features to identify the critical path through your implementation.

## Building Essential Functionality First

Essential functionality forms the backbone of your application. Start with the data layer—define your database schema and models. These represent the core entities in your application domain. A well-designed data layer provides clarity for all subsequent development.

Next, implement the business logic layer. This is where your application's rules and operations live. Separate business logic from presentation logic to maintain clean architecture. For example, password validation logic belongs in your authentication service, not in your React component.

Finally, create the presentation layer—the user interfaces that allow users to interact with your functionality. Even if you're not a designer, functional interfaces with clear labels and logical layouts demonstrate competency. You can always improve visual design later, but functionality should work correctly from the start.

## Practical Implementation Example

Here's how to implement a core feature—user registration—following best practices:

```typescript
// Backend: User Model (Prisma Schema)
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Backend: Authentication Service
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
  async registerUser(email: string, password: string, name: string) {
    // Validate input
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

// Backend: Express Route
import express from 'express';
import { AuthService } from './auth.service';

const router = express.Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.registerUser(email, password, name);

    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

export default router;

// Frontend: Registration Form Component
import React, { useState } from 'react';
import axios from 'axios';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      // Redirect or show success message
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
```

This example demonstrates several best practices: separation of concerns (service layer separate from routes), proper error handling, input validation, security (password hashing), and user feedback in the UI.

## Key Takeaways

- Build your MVP first—focus on essential features that deliver core value
- Use feature prioritization frameworks like MoSCoW to identify must-haves
- Consider feature dependencies when planning implementation order
- Implement in layers: data model, business logic, then presentation
- Maintain separation of concerns for cleaner, more maintainable code
- Validate inputs and handle errors at every layer
- Security should be built in from the start, not added later
- Test each feature as you build it—don't accumulate technical debt

## Common Mistakes

### Mistake 1: Feature Creep During MVP Development
**Problem:** Adding "nice to have" features during initial development dilutes focus, extends timelines, and risks leaving core features incomplete.
**Solution:** Maintain a strict feature list. Write down additional ideas in a backlog for later sprints, but resist implementing them during Sprint 1.

### Mistake 2: Building Without Validation
**Problem:** Implementing features without validating user input or business rules leads to data corruption, security vulnerabilities, and poor user experience.
**Solution:** Implement validation at multiple layers—client-side for user experience, server-side for security and data integrity.

### Mistake 3: Coupling Presentation and Business Logic
**Problem:** Mixing business logic with UI components makes code difficult to test, reuse, and maintain.
**Solution:** Extract business logic into separate service classes or utility functions that can be tested independently and reused across different interfaces.

### Mistake 4: Ignoring Error Handling
**Problem:** Failing to handle errors properly leads to application crashes, poor user experience, and difficult debugging.
**Solution:** Implement comprehensive error handling with try-catch blocks, meaningful error messages, and appropriate HTTP status codes. Always consider what could go wrong.

## Summary

Core features implementation is the foundation of your capstone project. By focusing on MVP features first, prioritizing strategically, and building with quality and maintainability in mind, you create a solid base for future development. Remember that professional software engineering values working, well-tested features over ambitious but incomplete functionality. Start with authentication, implement core CRUD operations for your primary entities, and ensure your essential user workflows function correctly. This disciplined approach demonstrates maturity as a developer and positions your project for success.
