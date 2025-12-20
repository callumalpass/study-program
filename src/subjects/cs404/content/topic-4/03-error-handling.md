# Error Handling

## Introduction

Comprehensive error handling is what separates professional software from amateur projects. Errors are inevitable in software systems—network requests fail, users provide invalid input, external services become unavailable, and unexpected edge cases emerge. How your application handles these failures determines whether users trust your software or abandon it in frustration.

Effective error handling requires anticipating failure modes, implementing graceful degradation, providing clear user feedback, and logging sufficient information for debugging without exposing sensitive details. Your capstone project should demonstrate production-grade error handling that maintains application stability and user confidence even when things go wrong.

## Understanding Error Handling Strategies

Error handling operates at multiple levels of your application, from input validation to exception management to user feedback. Each layer serves a distinct purpose in building a robust system.

### Input Validation

Input validation is your first line of defense against errors and security vulnerabilities. Never trust user input or external data. Validate data types, formats, ranges, and business rules before processing. Validation should occur both on the client side for immediate feedback and on the server side for security.

Client-side validation improves user experience by providing instant feedback without server round-trips. However, client-side validation alone is insufficient because users can bypass it through browser tools or direct API calls. Server-side validation enforces data integrity and security regardless of client behavior.

Consider all validation scenarios: required fields, data types, format constraints (email, phone, URL), length limits, numeric ranges, unique constraints, cross-field dependencies, and business rule validation. Provide specific error messages that guide users toward fixing problems rather than generic "invalid input" messages.

### Exception Handling

Exceptions represent exceptional conditions that disrupt normal program flow. Proper exception handling catches errors at appropriate levels, logs diagnostic information, performs necessary cleanup, and either recovers gracefully or fails safely.

Use try-catch blocks to handle expected exceptional conditions, but don't catch exceptions you can't handle meaningfully. Let unexpected errors bubble up to centralized error handlers that can log them and present appropriate user messages. Never silently catch and ignore exceptions—this hides problems and makes debugging impossible.

Implement different handling strategies for different error types: recoverable errors that allow retry, validation errors that need user correction, configuration errors that require administrative intervention, and fatal errors that prevent continued operation.

### Error Boundaries and Isolation

In modern frameworks like React, error boundaries prevent component errors from crashing the entire application. Similarly, isolate critical functionality so failures in one area don't cascade throughout the system. Implement circuit breakers for external services to prevent repeated failures from overwhelming your system.

Design components and modules to fail independently when possible. If a recommendation engine fails, the core application should continue functioning. If image loading fails, display a placeholder rather than breaking the layout. Progressive enhancement and graceful degradation ensure basic functionality remains available even when advanced features fail.

### Logging and Monitoring

Effective error handling includes comprehensive logging for debugging and monitoring. Log enough information to diagnose problems—error messages, stack traces, user context, request parameters, application state—but avoid logging sensitive data like passwords, tokens, or personal information.

Implement different log levels (debug, info, warn, error, fatal) and use them appropriately. Structure logs for easy parsing and analysis. In production, send errors to monitoring services that alert you to problems and track error rates over time. Tools like Sentry, Rollbar, or LogRocket capture errors with full context for post-mortem analysis.

### User Feedback

Users should always understand what happened and what they can do about it. Replace technical error messages with user-friendly explanations. Distinguish between user errors (invalid input) and system errors (service unavailable). For system errors, acknowledge the problem, apologize for the inconvenience, and explain what users can try.

Provide actionable guidance: "Email addresses must contain an @ symbol" is better than "Invalid email." "Our servers are temporarily unavailable. Please try again in a few minutes" is better than "Error 503." Use appropriate visual feedback—toast notifications for minor issues, modal dialogs for critical errors, inline validation for form fields.

## Practical Implementation

### Comprehensive Form Validation

```typescript
interface ValidationRule<T = any> {
  validate: (value: T) => boolean;
  message: string;
}

interface ValidationError {
  field: string;
  message: string;
}

class FormValidator {
  private rules: Map<string, ValidationRule[]> = new Map();

  addRule(field: string, rule: ValidationRule): this {
    if (!this.rules.has(field)) {
      this.rules.set(field, []);
    }
    this.rules.get(field)!.push(rule);
    return this;
  }

  validate(data: Record<string, any>): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [field, rules] of this.rules.entries()) {
      const value = data[field];

      for (const rule of rules) {
        if (!rule.validate(value)) {
          errors.push({ field, message: rule.message });
          break; // Stop at first error per field
        }
      }
    }

    return errors;
  }

  isValid(data: Record<string, any>): boolean {
    return this.validate(data).length === 0;
  }
}

// Common validation rules
const ValidationRules = {
  required: (fieldName: string): ValidationRule => ({
    validate: (value: any) => value !== null && value !== undefined && value !== '',
    message: `${fieldName} is required`
  }),

  email: (): ValidationRule<string> => ({
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }),

  minLength: (min: number): ValidationRule<string> => ({
    validate: (value: string) => value && value.length >= min,
    message: `Must be at least ${min} characters`
  }),

  maxLength: (max: number): ValidationRule<string> => ({
    validate: (value: string) => !value || value.length <= max,
    message: `Must be no more than ${max} characters`
  }),

  pattern: (regex: RegExp, message: string): ValidationRule<string> => ({
    validate: (value: string) => !value || regex.test(value),
    message
  }),

  range: (min: number, max: number): ValidationRule<number> => ({
    validate: (value: number) => value >= min && value <= max,
    message: `Must be between ${min} and ${max}`
  }),

  custom: (fn: (value: any) => boolean, message: string): ValidationRule => ({
    validate: fn,
    message
  })
};

// Usage example
const userValidator = new FormValidator()
  .addRule('email', ValidationRules.required('Email'))
  .addRule('email', ValidationRules.email())
  .addRule('password', ValidationRules.required('Password'))
  .addRule('password', ValidationRules.minLength(8))
  .addRule('password', ValidationRules.pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain uppercase, lowercase, and number'
  ))
  .addRule('age', ValidationRules.required('Age'))
  .addRule('age', ValidationRules.range(18, 120));

const formData = {
  email: 'user@example.com',
  password: 'weak',
  age: 25
};

const errors = userValidator.validate(formData);
if (errors.length > 0) {
  console.log('Validation errors:', errors);
  // Display errors to user
}
```

### Error Handling Wrapper for API Calls

```typescript
interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}

class ApiErrorHandler {
  async handleRequest<T>(
    request: () => Promise<Response>,
    options: {
      retries?: number;
      retryDelay?: number;
      timeout?: number;
    } = {}
  ): Promise<T> {
    const {
      retries = 0,
      retryDelay = 1000,
      timeout = 30000
    } = options;

    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        if (attempt > 0) {
          await this.delay(retryDelay * Math.pow(2, attempt - 1));
        }

        const response = await Promise.race([
          request(),
          this.createTimeoutPromise(timeout)
        ]);

        if (!response.ok) {
          throw await this.createApiError(response);
        }

        return await response.json();
      } catch (error) {
        lastError = error as Error;

        // Don't retry client errors (4xx)
        if (error instanceof Error && 'status' in error) {
          const apiError = error as ApiError;
          if (apiError.status >= 400 && apiError.status < 500) {
            throw error;
          }
        }

        // Retry on network errors or server errors (5xx)
        if (attempt === retries) {
          throw error;
        }

        console.warn(`Request failed (attempt ${attempt + 1}/${retries + 1}):`, error);
      }
    }

    throw lastError!;
  }

  private async createApiError(response: Response): Promise<ApiError> {
    let details;
    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    return {
      message: this.getErrorMessage(response.status, details),
      code: details?.code || `HTTP_${response.status}`,
      status: response.status,
      details
    };
  }

  private getErrorMessage(status: number, details: any): string {
    // Use server-provided message if available
    if (details?.message) {
      return details.message;
    }

    // Fallback to user-friendly messages
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Authentication required. Please log in.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This action conflicts with existing data.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'An internal server error occurred. Please try again.';
      case 502:
      case 503:
      case 504:
        return 'Service temporarily unavailable. Please try again in a moment.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  private createTimeoutPromise(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage
const apiHandler = new ApiErrorHandler();

async function fetchUserData(userId: string) {
  try {
    const user = await apiHandler.handleRequest<User>(
      () => fetch(`/api/users/${userId}`),
      { retries: 3, timeout: 5000 }
    );
    return user;
  } catch (error) {
    if (error instanceof Error && 'status' in error) {
      const apiError = error as ApiError;
      showErrorNotification(apiError.message);

      // Handle specific error cases
      if (apiError.status === 401) {
        redirectToLogin();
      }
    } else {
      showErrorNotification('Network error. Please check your connection.');
    }
    throw error;
  }
}
```

### React Error Boundary

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Send to error tracking service
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        extra: { errorInfo }
      });
    }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We apologize for the inconvenience. Please try refreshing the page.</p>
          <button onClick={this.handleReset}>Try again</button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '1rem' }}>
              <summary>Error details</summary>
              <pre>{this.state.error.toString()}</pre>
              <pre>{this.state.error.stack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary onError={(error, info) => logToService(error, info)}>
      <MainApp />
    </ErrorBoundary>
  );
}
```

### Global Error Handler

```typescript
class GlobalErrorHandler {
  private errorListeners: Array<(error: Error) => void> = [];

  constructor() {
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.handleError(event.error || new Error(event.message));
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))
      );
    });
  }

  handleError(error: Error): void {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error:', error);
    }

    // Send to monitoring service
    this.reportError(error);

    // Notify listeners
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (e) {
        console.error('Error in error listener:', e);
      }
    });
  }

  private reportError(error: Error): void {
    // Send to error tracking service
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      // Add custom context
      user: this.getUserContext(),
      appState: this.getAppState()
    };

    // Send asynchronously, don't block
    setTimeout(() => {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorReport)
      }).catch(e => console.error('Failed to report error:', e));
    }, 0);
  }

  private getUserContext(): any {
    // Get user information without sensitive data
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return { id: user.id, role: user.role };
      } catch {
        return null;
      }
    }
    return null;
  }

  private getAppState(): any {
    // Capture relevant application state
    return {
      route: window.location.pathname,
      timestamp: Date.now()
    };
  }

  onError(listener: (error: Error) => void): () => void {
    this.errorListeners.push(listener);
    return () => {
      const index = this.errorListeners.indexOf(listener);
      if (index > -1) {
        this.errorListeners.splice(index, 1);
      }
    };
  }
}

// Initialize global handler
const errorHandler = new GlobalErrorHandler();

// Subscribe to errors for UI notifications
errorHandler.onError((error) => {
  showErrorToast('An unexpected error occurred');
});
```

## Key Takeaways

- Validate all user input on both client and server sides
- Provide specific, actionable error messages that guide users toward solutions
- Implement retry logic with exponential backoff for transient failures
- Use error boundaries to prevent component failures from crashing the entire application
- Log errors with sufficient context for debugging but without exposing sensitive information
- Distinguish between recoverable errors (retry, user correction) and fatal errors
- Handle network failures gracefully with appropriate user feedback
- Implement global error handlers to catch uncaught exceptions and promise rejections
- Test error handling paths as thoroughly as success paths
- Monitor error rates in production to identify and fix emerging problems

## Common Mistakes

### Mistake 1: Silent Error Swallowing

**Problem:** Catching exceptions with empty catch blocks or logging without handling, causing errors to disappear without user feedback or proper resolution.

**Solution:** Only catch errors you can handle meaningfully. If you catch an error, either recover from it, show appropriate user feedback, or re-throw it. Never catch and ignore errors silently—this makes debugging impossible and creates a poor user experience.

### Mistake 2: Exposing Technical Details to Users

**Problem:** Showing stack traces, database errors, or technical messages to end users, which creates confusion and potential security issues.

**Solution:** Present user-friendly error messages while logging technical details securely. Use different error messages for development and production environments. Never expose internal system details, file paths, or database information in user-facing errors.

### Mistake 3: Not Validating on Server Side

**Problem:** Relying solely on client-side validation, which users can bypass, leading to data integrity issues and security vulnerabilities.

**Solution:** Always validate on the server side, even if you also validate on the client. Client-side validation is for user experience; server-side validation is for security and data integrity. Never trust data from the client.

### Mistake 4: Poor Error Recovery

**Problem:** Showing errors without providing users any way to recover or retry, forcing them to refresh the page or restart the application.

**Solution:** Implement retry mechanisms for transient failures, provide clear recovery actions, and preserve user state when possible. If a network request fails, offer a retry button. If validation fails, keep the form data and highlight specific issues.

### Mistake 5: Insufficient Error Context

**Problem:** Logging errors without enough context to reproduce or diagnose them, making debugging nearly impossible when issues occur in production.

**Solution:** Include relevant context in error logs: user ID (not sensitive details), request parameters, application state, browser information, and timestamp. Use structured logging that's easy to search and analyze. Implement error tracking services that capture full context automatically.
