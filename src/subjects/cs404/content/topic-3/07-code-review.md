# Code Review and Refactoring

## Introduction

Code review and refactoring are essential practices for maintaining code quality, catching bugs early, and ensuring long-term maintainability. Even in solo capstone projects where you don't have teammates to review your code, implementing systematic self-review practices and refactoring regularly demonstrates professional software development maturity. These practices distinguish hobbyist code from production-ready software.

Code review is the systematic examination of code to identify bugs, security vulnerabilities, design issues, and opportunities for improvement. Refactoring is the disciplined technique of restructuring existing code without changing its external behavior. Together, these practices form a continuous improvement cycle. Initial implementations often prioritize getting features working; review and refactoring make that code maintainable, efficient, and reliable. For capstone projects, these practices provide opportunities to demonstrate critical thinking, attention to detail, and commitment to quality—qualities that employers value highly. Moreover, reviewing and refactoring your own code develops the objective eye necessary for evaluating any codebase.

## Self-Review Practices

Self-review requires discipline and a systematic approach. Create a checklist to guide your reviews and ensure consistency:

```typescript
// Self-Review Checklist Example

/**
 * FUNCTIONALITY
 * - Does the code work as intended?
 * - Are all edge cases handled?
 * - Does it meet the acceptance criteria?
 */

/**
 * CODE QUALITY
 * - Is the code readable and self-documenting?
 * - Are variable and function names descriptive?
 * - Is the logic clear and straightforward?
 * - Are functions focused on a single responsibility?
 */

/**
 * ERROR HANDLING
 * - Are all potential errors caught and handled?
 * - Are error messages helpful and specific?
 * - Is user feedback appropriate?
 */

/**
 * SECURITY
 * - Is user input validated and sanitized?
 * - Are authentication and authorization checks in place?
 * - Are sensitive data (passwords, tokens) handled securely?
 * - Are there any SQL injection or XSS vulnerabilities?
 */

/**
 * PERFORMANCE
 * - Are there any obvious performance issues?
 * - Are database queries optimized?
 * - Is unnecessary work avoided?
 */

/**
 * TESTING
 * - Are there tests for the new functionality?
 * - Do existing tests still pass?
 * - Are edge cases tested?
 */

/**
 * DOCUMENTATION
 * - Are complex algorithms explained?
 * - Are API endpoints documented?
 * - Are configuration requirements noted?
 */
```

Apply this checklist systematically. Review your code the day after writing it when you have fresh perspective. Reading code aloud or explaining it to a rubber duck often reveals issues you missed while writing.

## Pull Request Guidelines for Solo Projects

Even working alone, use pull requests to structure your development workflow. Create feature branches and merge through pull requests with self-review:

```bash
# Create feature branch
git checkout -b feature/user-authentication

# Make your changes and commit
git add .
git commit -m "Implement user authentication with JWT"

# Push to remote
git push origin feature/user-authentication

# Create pull request (using GitHub CLI)
gh pr create --title "Add user authentication" --body "$(cat <<'EOF'
## Summary
Implements JWT-based user authentication including:
- User registration endpoint with password hashing
- Login endpoint with token generation
- Authentication middleware for protected routes
- Token validation and refresh logic

## Changes
- Added `AuthService` class with registration and login methods
- Created `/api/auth/register` and `/api/auth/login` endpoints
- Implemented `authMiddleware` to protect routes
- Added JWT token generation and validation
- Updated User model to include password field

## Testing
- [x] Registration with valid data creates user
- [x] Registration with existing email returns error
- [x] Login with correct credentials returns token
- [x] Login with incorrect credentials returns error
- [x] Protected routes reject requests without token
- [x] Protected routes accept requests with valid token
- [x] Expired tokens are rejected

## Security Considerations
- Passwords are hashed using bcrypt with salt rounds of 10
- JWT tokens expire after 24 hours
- Tokens are validated on every protected request
- Password field is excluded from user responses

## Next Steps
- Implement password reset functionality
- Add email verification
- Implement refresh token rotation
EOF
)"
```

This structured approach forces you to articulate what you built, why you built it, and what testing you performed. The act of writing this documentation often reveals gaps in your implementation.

## Refactoring During Development

Refactoring isn't a separate phase—it's an ongoing practice. Recognize code smells and refactor immediately:

### Example: Extracting Complex Logic

```typescript
// Before: Complex logic in component
export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      // Validate status transition
      if (task.status === 'completed' && newStatus === 'pending') {
        alert('Cannot move completed task back to pending');
        return;
      }
      if (task.status === 'pending' && newStatus === 'completed') {
        alert('Task must be in progress before completion');
        return;
      }

      const updatedTask = await taskService.updateTask(id, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // ... rest of component
};
```

```typescript
// After: Extract business logic to service
// src/services/task-validator.service.ts
export class TaskValidator {
  static validateStatusTransition(currentStatus: string, newStatus: string): { valid: boolean; message?: string } {
    const invalidTransitions = [
      {
        from: 'completed',
        to: 'pending',
        message: 'Cannot move completed task back to pending'
      },
      {
        from: 'pending',
        to: 'completed',
        message: 'Task must be in progress before completion'
      }
    ];

    const invalid = invalidTransitions.find(
      t => t.from === currentStatus && t.to === newStatus
    );

    if (invalid) {
      return { valid: false, message: invalid.message };
    }

    return { valid: true };
  }
}

// Component becomes cleaner
export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const validation = TaskValidator.validateStatusTransition(task.status, newStatus);
      if (!validation.valid) {
        alert(validation.message);
        return;
      }

      const updatedTask = await taskService.updateTask(id, { status: newStatus });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  // ... rest of component
};
```

This refactoring separates business logic from presentation logic, making both easier to test and maintain.

### Example: Eliminating Code Duplication

```typescript
// Before: Duplicated error handling
async createTask(data: CreateTaskDto) {
  try {
    return await apiClient.post('/tasks', data);
  } catch (error) {
    console.error('Failed to create task:', error);
    throw new Error('Unable to create task. Please try again.');
  }
}

async updateTask(id: string, data: UpdateTaskDto) {
  try {
    return await apiClient.patch(`/tasks/${id}`, data);
  } catch (error) {
    console.error('Failed to update task:', error);
    throw new Error('Unable to update task. Please try again.');
  }
}

async deleteTask(id: string) {
  try {
    return await apiClient.delete(`/tasks/${id}`);
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw new Error('Unable to delete task. Please try again.');
  }
}
```

```typescript
// After: Extract common error handling
private async handleApiCall<T>(
  apiCall: () => Promise<T>,
  operation: string
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.error(`Failed to ${operation}:`, error);
    throw new Error(`Unable to ${operation}. Please try again.`);
  }
}

async createTask(data: CreateTaskDto) {
  return this.handleApiCall(
    () => apiClient.post('/tasks', data),
    'create task'
  );
}

async updateTask(id: string, data: UpdateTaskDto) {
  return this.handleApiCall(
    () => apiClient.patch(`/tasks/${id}`, data),
    'update task'
  );
}

async deleteTask(id: string) {
  return this.handleApiCall(
    () => apiClient.delete(`/tasks/${id}`),
    'delete task'
  );
}
```

This eliminates duplication and ensures consistent error handling across all methods.

## Common Code Smells and Refactoring Techniques

Recognize these common issues and apply appropriate refactoring:

### Long Functions
**Smell:** Functions exceeding 20-30 lines doing multiple things
**Refactor:** Extract smaller, focused functions

### Magic Numbers and Strings
**Smell:** Hardcoded values without explanation
**Refactor:** Extract to named constants

```typescript
// Before
if (password.length < 8) {
  throw new Error('Password too short');
}

// After
const MIN_PASSWORD_LENGTH = 8;

if (password.length < MIN_PASSWORD_LENGTH) {
  throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
}
```

### Deep Nesting
**Smell:** Multiple levels of nested if statements or loops
**Refactor:** Use early returns or extract to functions

```typescript
// Before
if (user) {
  if (user.isActive) {
    if (user.hasPermission('delete')) {
      // delete logic
    }
  }
}

// After
if (!user || !user.isActive || !user.hasPermission('delete')) {
  return;
}
// delete logic
```

### Large Classes
**Smell:** Classes with many methods and responsibilities
**Refactor:** Split into focused classes following Single Responsibility Principle

## Creating Effective Commit Messages

Good commit messages document your development process:

```bash
# Bad commit messages
git commit -m "fix"
git commit -m "updates"
git commit -m "more changes"

# Good commit messages
git commit -m "Fix task status validation to prevent invalid transitions"
git commit -m "Add authentication middleware for protected routes"
git commit -m "Refactor error handling in TaskService to reduce duplication"

# Excellent commit message (multi-line)
git commit -m "$(cat <<'EOF'
Implement optimistic updates for task operations

Updates task state immediately in the UI before API confirmation
to improve perceived performance. Reverts changes if API call fails.

Changes:
- Add optimistic update logic to TasksPage
- Implement rollback on error
- Add loading states for individual tasks

Fixes issue where UI felt sluggish during task updates.
EOF
)"
```

Good commit messages explain the "why" not just the "what". They provide context for future you and demonstrate thoughtful development.

## Key Takeaways

- Review your own code systematically using a checklist
- Create pull requests even for solo projects to structure your workflow
- Write clear PR descriptions that explain what, why, and how
- Refactor continuously—don't wait for a dedicated "refactoring phase"
- Recognize code smells: duplication, long functions, deep nesting, magic values
- Extract business logic from UI components for better testability
- Eliminate duplication by extracting common patterns
- Use meaningful variable and function names that explain intent
- Write descriptive commit messages that provide context
- Test after refactoring to ensure behavior hasn't changed

## Common Mistakes

### Mistake 1: Skipping Self-Review
**Problem:** Rushing to merge code without review leads to bugs, poor design, and technical debt.
**Solution:** Schedule review time into your workflow. Review code before creating a pull request, not after.

### Mistake 2: Refactoring Without Tests
**Problem:** Changing code without tests risks breaking functionality silently.
**Solution:** Write tests before refactoring, or ensure existing tests cover the code being refactored. Tests are your safety net.

### Mistake 3: Over-Engineering During Refactoring
**Problem:** Refactoring simple code into complex abstractions reduces readability without benefit.
**Solution:** Follow the principle of "make it work, make it right, make it fast." Refactor to simplify, not to show off technical prowess.

### Mistake 4: Combining Feature and Refactoring Changes
**Problem:** Mixing new functionality with refactoring makes pull requests harder to review and bugs harder to isolate.
**Solution:** Separate refactoring commits from feature commits. Refactor first, then add features, or vice versa.

## Summary

Code review and refactoring transform working code into professional, maintainable software. By implementing systematic self-review practices, using pull requests to structure your workflow, refactoring continuously to improve code quality, and documenting your process through clear commits and PR descriptions, you demonstrate software engineering maturity that extends beyond simply making features work. These practices require discipline, especially in solo projects where no one is watching, but they're precisely what distinguishes good developers from great ones. Your capstone project is an opportunity to prove you can not only write code that works today but code that will be maintainable tomorrow. Embrace review and refactoring as integral parts of your development process, not optional extras.
