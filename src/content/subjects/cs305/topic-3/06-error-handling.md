# Error Handling in JavaScript

Error handling is essential for creating robust, production-ready applications. JavaScript provides mechanisms for catching and handling errors gracefully, preventing crashes and providing meaningful feedback. Understanding try/catch blocks, error types, throwing custom errors, and debugging techniques enables you to build reliable applications.

## Why Error Handling Matters

Without error handling, errors crash programs and provide poor user experience:

```javascript
// No error handling - crashes if data is invalid
const user = JSON.parse(invalidJSON);  // Throws error, stops execution
console.log('This never runs');

// With error handling - gracefully handles errors
try {
    const user = JSON.parse(invalidJSON);
} catch (error) {
    console.log('Invalid JSON data');
}
console.log('This runs despite error');
```

Benefits of error handling:
- Prevents application crashes
- Provides meaningful error messages
- Allows graceful degradation
- Improves debugging
- Enhances user experience

## try...catch Statement

The try...catch block catches and handles errors:

```javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
} catch (error) {
    // Handle the error
    console.log('An error occurred:', error.message);
}
```

### Basic Example

```javascript
try {
    const data = JSON.parse('{ invalid json }');
} catch (error) {
    console.log('Failed to parse JSON');
    console.log('Error:', error.message);
}
```

### The Error Object

The catch block receives an error object with properties:

```javascript
try {
    throw new Error('Something went wrong');
} catch (error) {
    console.log(error.name);     // "Error"
    console.log(error.message);  // "Something went wrong"
    console.log(error.stack);    // Stack trace
}
```

### finally Block

Executes regardless of whether an error occurred:

```javascript
try {
    // Attempt operation
    const file = openFile('data.txt');
    processFile(file);
} catch (error) {
    console.log('Error processing file:', error.message);
} finally {
    // Always executes (cleanup)
    closeFile(file);
}
```

### Complete Example

```javascript
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    } finally {
        console.log('Division operation completed');
    }
}

console.log(divide(10, 2));  // 5, "Division operation completed"
console.log(divide(10, 0));  // null, "Error: Division by zero", "Division operation completed"
```

## Error Types

JavaScript has several built-in error types:

### Error

Generic error:

```javascript
throw new Error('Generic error message');
```

### SyntaxError

Syntax errors in code:

```javascript
try {
    eval('{ invalid syntax');
} catch (error) {
    console.log(error instanceof SyntaxError);  // true
    console.log(error.message);
}
```

### ReferenceError

Referencing undefined variables:

```javascript
try {
    console.log(undefinedVariable);
} catch (error) {
    console.log(error instanceof ReferenceError);  // true
    console.log(error.message);  // "undefinedVariable is not defined"
}
```

### TypeError

Wrong type or undefined methods:

```javascript
try {
    null.toString();
} catch (error) {
    console.log(error instanceof TypeError);  // true
    console.log(error.message);  // "Cannot read property 'toString' of null"
}

try {
    const num = 123;
    num.toUpperCase();  // Numbers don't have toUpperCase()
} catch (error) {
    console.log(error instanceof TypeError);  // true
}
```

### RangeError

Values outside valid range:

```javascript
try {
    const arr = new Array(-1);  // Negative length
} catch (error) {
    console.log(error instanceof RangeError);  // true
    console.log(error.message);
}
```

### URIError

Invalid URI encoding/decoding:

```javascript
try {
    decodeURIComponent('%');
} catch (error) {
    console.log(error instanceof URIError);  // true
}
```

### Checking Error Type

```javascript
try {
    // Some operation
} catch (error) {
    if (error instanceof TypeError) {
        console.log('Type error:', error.message);
    } else if (error instanceof ReferenceError) {
        console.log('Reference error:', error.message);
    } else {
        console.log('Other error:', error.message);
    }
}
```

## Throwing Errors

Create and throw custom errors:

### throw Statement

```javascript
function validateAge(age) {
    if (age < 0) {
        throw new Error('Age cannot be negative');
    }
    if (age > 120) {
        throw new Error('Age seems unrealistic');
    }
    return age;
}

try {
    validateAge(-5);
} catch (error) {
    console.log(error.message);  // "Age cannot be negative"
}
```

### Custom Error Types

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DatabaseError';
    }
}

function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required');
    }
    if (!user.password) {
        throw new ValidationError('Password is required');
    }
}

try {
    validateUser({ email: '', password: 'secret' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    } else {
        console.log('Unexpected error:', error.message);
    }
}
```

### Rethrowing Errors

```javascript
function processData(data) {
    try {
        // Process data
        if (!data) {
            throw new Error('No data provided');
        }
        // More processing...
    } catch (error) {
        console.log('Error in processData:', error.message);
        throw error;  // Rethrow to caller
    }
}

try {
    processData(null);
} catch (error) {
    console.log('Caught rethrown error:', error.message);
}
```

## Practical Error Handling

### API Calls

```javascript
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error.message);
        return null;
    }
}
```

### JSON Parsing

```javascript
function parseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Invalid JSON:', error.message);
        return null;
    }
}

const result = parseJSON('{ "name": "Alice" }');
if (result) {
    console.log(result.name);
} else {
    console.log('Failed to parse JSON');
}
```

### Form Validation

```javascript
function validateForm(formData) {
    const errors = [];

    try {
        if (!formData.email) {
            throw new ValidationError('Email is required');
        }

        if (!formData.email.includes('@')) {
            throw new ValidationError('Email must contain @');
        }

        if (!formData.password) {
            throw new ValidationError('Password is required');
        }

        if (formData.password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters');
        }

        return { valid: true, errors: [] };
    } catch (error) {
        if (error instanceof ValidationError) {
            errors.push(error.message);
            return { valid: false, errors };
        }
        throw error;  // Unexpected error
    }
}

const result = validateForm({ email: '', password: 'short' });
if (!result.valid) {
    console.log('Validation errors:', result.errors);
}
```

### Multiple Validations

```javascript
function validateUser(user) {
    const errors = [];

    if (!user.name) {
        errors.push('Name is required');
    }

    if (!user.email) {
        errors.push('Email is required');
    } else if (!user.email.includes('@')) {
        errors.push('Email must be valid');
    }

    if (!user.age) {
        errors.push('Age is required');
    } else if (user.age < 18) {
        errors.push('Must be 18 or older');
    }

    if (errors.length > 0) {
        throw new ValidationError(errors.join(', '));
    }

    return true;
}

try {
    validateUser({ name: '', email: 'invalid', age: 15 });
} catch (error) {
    console.log('Validation failed:', error.message);
}
```

## Async Error Handling

### Promises

```javascript
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error.message));
```

### async/await

```javascript
async function getData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to get data:', error.message);
        return null;
    }
}
```

### Multiple async Operations

```javascript
async function loadUserData(userId) {
    try {
        const [user, posts, comments] = await Promise.all([
            fetchUser(userId),
            fetchPosts(userId),
            fetchComments(userId)
        ]);

        return { user, posts, comments };
    } catch (error) {
        console.error('Failed to load user data:', error.message);
        throw error;
    }
}
```

## Debugging Techniques

### console Methods

```javascript
console.log('General logging');
console.info('Informational message');
console.warn('Warning message');
console.error('Error message');

// Object inspection
console.table([
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
]);

// Grouping
console.group('User Details');
console.log('Name: Alice');
console.log('Age: 30');
console.groupEnd();

// Assertions
console.assert(2 + 2 === 4, 'Math works');
console.assert(2 + 2 === 5, 'Math is broken');  // Logs error

// Timing
console.time('operation');
// ... some code ...
console.timeEnd('operation');  // Logs elapsed time
```

### debugger Statement

Pauses execution in browser DevTools:

```javascript
function complexCalculation(x, y) {
    debugger;  // Execution pauses here
    const result = x * y + Math.sqrt(x);
    return result;
}
```

### Stack Traces

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.trace('Trace from third()');
}

first();
// Shows call stack: third() → second() → first()
```

## Error Handling Best Practices

**Always handle errors**: Don't let errors crash your app.

**Provide meaningful messages**: Help users and developers understand what went wrong.

```javascript
// Good
throw new Error('Failed to load user: invalid user ID');

// Bad
throw new Error('Error');
```

**Use specific error types**: Differentiate between error categories.

**Log errors appropriately**: Console for development, error tracking service for production.

**Fail gracefully**: Provide fallbacks when operations fail.

```javascript
function getUsername(user) {
    try {
        return user.profile.name;
    } catch (error) {
        return 'Anonymous';  // Graceful fallback
    }
}
```

**Validate early**: Check inputs before processing.

**Clean up resources**: Use finally block for cleanup.

**Don't silence errors**: Always log or handle them.

```javascript
// Bad
try {
    riskyOperation();
} catch (error) {
    // Silent failure - hard to debug
}

// Good
try {
    riskyOperation();
} catch (error) {
    console.error('Operation failed:', error.message);
    // Handle or rethrow
}
```

## Common Patterns

### Safe Property Access

```javascript
function getUserEmail(user) {
    try {
        return user.profile.email;
    } catch (error) {
        return null;
    }
}

// Or use optional chaining (modern)
const email = user?.profile?.email;
```

### Try with Default

```javascript
function parseConfig(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return { /* default config */ };
    }
}
```

### Error Boundary (React Pattern)

```javascript
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
```

## Complete Example

```javascript
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'APIError';
        this.statusCode = statusCode;
    }
}

async function fetchUserData(userId) {
    try {
        // Validate input
        if (!userId) {
            throw new ValidationError('User ID is required');
        }

        // Make API call
        const response = await fetch(`/api/users/${userId}`);

        // Check response
        if (!response.ok) {
            throw new APIError(
                `Failed to fetch user`,
                response.status
            );
        }

        // Parse response
        const data = await response.json();
        return data;

    } catch (error) {
        // Handle specific errors
        if (error instanceof ValidationError) {
            console.error('Validation error:', error.message);
        } else if (error instanceof APIError) {
            console.error(`API error ${error.statusCode}:`, error.message);
        } else {
            console.error('Unexpected error:', error.message);
        }

        // Rethrow or return default
        return null;
    } finally {
        console.log('Fetch attempt completed');
    }
}

// Usage
const user = await fetchUserData(123);
if (user) {
    console.log('User loaded:', user);
} else {
    console.log('Failed to load user');
}
```

## Conclusion

Error handling is critical for building robust JavaScript applications. Use try/catch blocks to handle errors gracefully, understand different error types, and throw custom errors when needed. Implement proper async error handling with promises and async/await, and use debugging techniques like console methods and the debugger statement. Follow best practices like providing meaningful error messages, validating inputs early, and failing gracefully to create reliable, production-ready code.
