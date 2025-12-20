# Error Handling in Asynchronous Operations

Proper error handling in asynchronous JavaScript is crucial for building robust applications. Network requests, API calls, and other async operations can fail for many reasons, and handling these failures gracefully improves user experience and application reliability.

## Types of Errors

Different types of errors require different handling strategies.

```javascript
// Network errors - connection failures
async function handleNetworkError() {
    try {
        const response = await fetch('https://api.example.com/users');
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Network error: Unable to connect');
            // Show offline message to user
            return null;
        }
        throw error;
    }
}

// HTTP errors - server returned error status
async function handleHTTPError() {
    try {
        const response = await fetch('https://api.example.com/users');

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Resource not found');
            }
            if (response.status === 500) {
                throw new Error('Server error');
            }
            throw new Error(`HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('HTTP error:', error.message);
        throw error;
    }
}

// Parsing errors - invalid JSON
async function handleParsingError() {
    try {
        const response = await fetch('https://api.example.com/data');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error('Invalid JSON response:', text);
            throw new Error('Invalid server response');
        }
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

// Validation errors - data doesn't meet requirements
async function handleValidationError(userData) {
    try {
        if (!userData.email || !userData.email.includes('@')) {
            throw new Error('Valid email is required');
        }

        if (!userData.password || userData.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }

        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (response.status === 422) {
            const errors = await response.json();
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Validation error:', error.message);
        throw error;
    }
}

// Timeout errors - request takes too long
async function handleTimeoutError() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch('https://api.example.com/slow', {
            signal: controller.signal
        });

        clearTimeout(timeout);
        return await response.json();
    } catch (error) {
        clearTimeout(timeout);

        if (error.name === 'AbortError') {
            console.error('Request timed out');
            throw new Error('Request timeout - please try again');
        }

        throw error;
    }
}
```

## Custom Error Classes

Creating custom error classes helps differentiate error types and handle them appropriately.

```javascript
// Base API error
class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

// Network error
class NetworkError extends APIError {
    constructor(message) {
        super(message, 0);
        this.name = 'NetworkError';
    }
}

// Validation error
class ValidationError extends APIError {
    constructor(message, fields) {
        super(message, 422);
        this.name = 'ValidationError';
        this.fields = fields;
    }
}

// Authentication error
class AuthenticationError extends APIError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

// Authorization error
class AuthorizationError extends APIError {
    constructor(message) {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

// Not found error
class NotFoundError extends APIError {
    constructor(resource) {
        super(`${resource} not found`, 404);
        this.name = 'NotFoundError';
        this.resource = resource;
    }
}

// Usage
async function fetchUser(id) {
    try {
        const response = await fetch(`https://api.example.com/users/${id}`);

        if (response.status === 404) {
            throw new NotFoundError('User');
        }

        if (response.status === 401) {
            throw new AuthenticationError('Please log in');
        }

        if (response.status === 403) {
            throw new AuthorizationError('Access denied');
        }

        if (!response.ok) {
            throw new APIError('Request failed', response.status);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof NotFoundError) {
            console.log('User does not exist');
            return null;
        }

        if (error instanceof AuthenticationError) {
            window.location.href = '/login';
            return;
        }

        if (error instanceof AuthorizationError) {
            console.error('You do not have permission');
            return null;
        }

        if (error instanceof TypeError) {
            throw new NetworkError('Network connection failed');
        }

        throw error;
    }
}
```

## Timeout Handling

Implementing timeouts prevents requests from hanging indefinitely.

```javascript
// Basic timeout with AbortController
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(id);

        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, response.status);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(id);

        if (error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeout}ms`);
        }

        throw error;
    }
}

// Timeout wrapper for any Promise
function withTimeout(promise, timeout, errorMessage) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(errorMessage || 'Timeout')), timeout)
        )
    ]);
}

// Usage
try {
    const data = await withTimeout(
        fetch('https://api.example.com/users').then((r) => r.json()),
        5000,
        'User request timed out'
    );
    console.log('Data:', data);
} catch (error) {
    console.error('Error:', error.message);
}

// Progressive timeout - try fast, then slow
async function fetchWithProgressiveTimeout(url) {
    try {
        // Try with short timeout first
        return await fetchWithTimeout(url, 2000);
    } catch (error) {
        if (error.message.includes('timed out')) {
            console.log('Request slow, trying with extended timeout...');
            // Retry with longer timeout
            return await fetchWithTimeout(url, 10000);
        }
        throw error;
    }
}

// Cancellable request
class CancellableRequest {
    constructor() {
        this.controller = new AbortController();
    }

    async fetch(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: this.controller.signal
            });

            if (!response.ok) {
                throw new APIError(`HTTP ${response.status}`, response.status);
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request cancelled');
            }
            throw error;
        }
    }

    cancel() {
        this.controller.abort();
    }
}

// Usage
const request = new CancellableRequest();

// Start request
request.fetch('https://api.example.com/users')
    .then((data) => console.log('Data:', data))
    .catch((error) => console.error('Error:', error.message));

// Cancel if needed
setTimeout(() => request.cancel(), 1000);
```

## Retry Strategies

Retrying failed requests can improve reliability for transient errors.

```javascript
// Basic retry with fixed delay
async function retryRequest(fn, maxRetries = 3, delay = 1000) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i + 1} failed:`, error.message);

            if (i < maxRetries - 1) {
                console.log(`Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

// Exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (i < maxRetries - 1) {
                const delay = baseDelay * Math.pow(2, i);
                console.log(`Retry ${i + 1} after ${delay}ms`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}

// Conditional retry - only retry certain errors
async function retryIf(fn, shouldRetry, maxRetries = 3) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            const canRetry = i < maxRetries - 1 && shouldRetry(error);

            if (canRetry) {
                console.log('Error is retryable, attempting again...');
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
                break;
            }
        }
    }

    throw lastError;
}

// Usage examples
async function unreliableRequest() {
    const response = await fetch('https://api.example.com/unreliable');
    if (!response.ok) {
        throw new APIError(`HTTP ${response.status}`, response.status);
    }
    return await response.json();
}

// Retry with exponential backoff
try {
    const data = await retryWithBackoff(unreliableRequest, 3, 500);
    console.log('Success:', data);
} catch (error) {
    console.error('Failed after retries:', error);
}

// Retry only network errors, not 4xx client errors
try {
    const data = await retryIf(
        unreliableRequest,
        (error) => {
            // Retry network errors and 5xx server errors
            return error instanceof NetworkError ||
                   (error instanceof APIError && error.status >= 500);
        },
        3
    );
} catch (error) {
    console.error('Request failed:', error);
}

// Advanced retry with jitter
async function retryWithJitter(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (i < maxRetries - 1) {
                const exponentialDelay = baseDelay * Math.pow(2, i);
                const jitter = Math.random() * exponentialDelay * 0.3;
                const delay = exponentialDelay + jitter;

                console.log(`Retrying in ${Math.round(delay)}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}
```

## Fallback Strategies

Providing fallbacks ensures the application remains functional when requests fail.

```javascript
// Fallback to cached data
async function fetchWithCache(url, cacheKey) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, response.status);
        }

        const data = await response.json();

        // Cache successful response
        localStorage.setItem(cacheKey, JSON.stringify(data));

        return data;
    } catch (error) {
        console.warn('Fetch failed, using cached data:', error.message);

        // Try to get cached data
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        throw error;
    }
}

// Fallback to alternative endpoint
async function fetchWithFallback(primaryUrl, fallbackUrl) {
    try {
        const response = await fetch(primaryUrl);

        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, response.status);
        }

        return await response.json();
    } catch (error) {
        console.warn('Primary endpoint failed, trying fallback:', error.message);

        try {
            const response = await fetch(fallbackUrl);

            if (!response.ok) {
                throw new APIError(`HTTP ${response.status}`, response.status);
            }

            return await response.json();
        } catch (fallbackError) {
            console.error('Both endpoints failed');
            throw fallbackError;
        }
    }
}

// Fallback to default data
async function fetchWithDefault(url, defaultData) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, response.status);
        }

        return await response.json();
    } catch (error) {
        console.warn('Fetch failed, using default data:', error.message);
        return defaultData;
    }
}

// Partial success handling
async function fetchMultipleWithPartialSuccess(urls) {
    const results = await Promise.allSettled(
        urls.map((url) => fetch(url).then((r) => r.json()))
    );

    const successful = [];
    const failed = [];

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successful.push({ url: urls[index], data: result.value });
        } else {
            failed.push({ url: urls[index], error: result.reason });
        }
    });

    if (failed.length > 0) {
        console.warn(`${failed.length} requests failed:`, failed);
    }

    return {
        successful,
        failed,
        hasPartialFailure: failed.length > 0,
        allSucceeded: failed.length === 0
    };
}
```

## Comprehensive Error Handler

A unified error handler can centralize error handling logic.

```javascript
class ErrorHandler {
    constructor(config = {}) {
        this.showNotifications = config.showNotifications ?? true;
        this.logErrors = config.logErrors ?? true;
        this.onError = config.onError || null;
    }

    async handle(error, context = {}) {
        // Log error if enabled
        if (this.logErrors) {
            console.error('Error:', error.message, context);
        }

        // Categorize and handle error
        if (error instanceof NetworkError) {
            return this.handleNetworkError(error, context);
        }

        if (error instanceof AuthenticationError) {
            return this.handleAuthError(error, context);
        }

        if (error instanceof ValidationError) {
            return this.handleValidationError(error, context);
        }

        if (error instanceof NotFoundError) {
            return this.handleNotFoundError(error, context);
        }

        if (error instanceof APIError) {
            return this.handleAPIError(error, context);
        }

        return this.handleUnknownError(error, context);
    }

    handleNetworkError(error, context) {
        if (this.showNotifications) {
            this.showNotification('Network error. Please check your connection.', 'error');
        }

        if (this.onError) {
            this.onError('network', error, context);
        }

        return { success: false, error: 'network', retry: true };
    }

    handleAuthError(error, context) {
        if (this.showNotifications) {
            this.showNotification('Please log in to continue.', 'warning');
        }

        // Redirect to login
        setTimeout(() => {
            window.location.href = '/login';
        }, 1000);

        return { success: false, error: 'auth', retry: false };
    }

    handleValidationError(error, context) {
        if (this.showNotifications) {
            this.showNotification(error.message, 'warning');
        }

        return {
            success: false,
            error: 'validation',
            fields: error.fields,
            retry: false
        };
    }

    handleNotFoundError(error, context) {
        if (this.showNotifications) {
            this.showNotification(`${error.resource} not found.`, 'info');
        }

        return { success: false, error: 'not_found', retry: false };
    }

    handleAPIError(error, context) {
        const message = error.status >= 500
            ? 'Server error. Please try again later.'
            : 'Request failed. Please try again.';

        if (this.showNotifications) {
            this.showNotification(message, 'error');
        }

        return {
            success: false,
            error: 'api',
            status: error.status,
            retry: error.status >= 500
        };
    }

    handleUnknownError(error, context) {
        if (this.showNotifications) {
            this.showNotification('An unexpected error occurred.', 'error');
        }

        return { success: false, error: 'unknown', retry: false };
    }

    showNotification(message, type) {
        // Implementation depends on your UI framework
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// Usage
const errorHandler = new ErrorHandler({
    showNotifications: true,
    logErrors: true,
    onError: (type, error, context) => {
        // Send to error tracking service
        console.log('Tracking error:', type, error.message);
    }
});

async function makeRequest() {
    try {
        const response = await fetch('https://api.example.com/users');

        if (!response.ok) {
            throw new APIError(`HTTP ${response.status}`, response.status);
        }

        return await response.json();
    } catch (error) {
        const result = await errorHandler.handle(error, {
            endpoint: '/users',
            timestamp: new Date()
        });

        if (result.retry) {
            // Could retry here
            console.log('Error is retryable');
        }

        return null;
    }
}
```

## Real-World Example

A complete example combining multiple error handling strategies.

```javascript
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.timeout = options.timeout || 10000;
        this.maxRetries = options.maxRetries || 3;
        this.errorHandler = new ErrorHandler();
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const requestFn = async () => {
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        ...options.headers
                    }
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new NotFoundError('Resource');
                    }
                    if (response.status === 401) {
                        throw new AuthenticationError('Authentication required');
                    }
                    throw new APIError(`HTTP ${response.status}`, response.status);
                }

                return await response.json();
            } catch (error) {
                clearTimeout(timeoutId);

                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }

                if (error instanceof TypeError) {
                    throw new NetworkError('Network connection failed');
                }

                throw error;
            }
        };

        try {
            // Retry with exponential backoff
            return await retryWithBackoff(requestFn, this.maxRetries, 1000);
        } catch (error) {
            await this.errorHandler.handle(error, { endpoint, options });
            throw error;
        }
    }

    get(endpoint, options) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, data, options) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

// Usage
const api = new APIClient('https://api.example.com', {
    timeout: 5000,
    maxRetries: 3
});

try {
    const users = await api.get('/users');
    console.log('Users:', users);
} catch (error) {
    console.error('Failed to fetch users:', error.message);
}
```

## Conclusion

Effective error handling in asynchronous operations is essential for building reliable web applications. By understanding different error types, implementing retry strategies, providing fallbacks, and using custom error classes, you can create resilient applications that gracefully handle failures and provide good user experiences even when things go wrong.
