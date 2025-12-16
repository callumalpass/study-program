# Async/Await

Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code. Introduced in ES2017, async/await has become the preferred way to handle asynchronous operations in modern JavaScript due to its readability and ease of use.

## Async Functions

An async function is a function declared with the `async` keyword. It automatically returns a Promise and allows the use of the `await` keyword inside its body.

```javascript
// Traditional Promise approach
function getUserData() {
    return fetch('/api/user')
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

// Async function approach
async function getUserData() {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
}

// Async functions always return Promises
async function greet() {
    return 'Hello';
}

greet().then((message) => {
    console.log(message); // 'Hello'
});

// Even if you don't explicitly return a Promise
async function calculateSum(a, b) {
    return a + b;
}

calculateSum(5, 3).then((result) => {
    console.log(result); // 8
});
```

## The Await Keyword

The `await` keyword can only be used inside async functions. It pauses execution until the Promise resolves, then returns the resolved value.

```javascript
// Basic await usage
async function fetchUser(id) {
    // Simulated API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: 'Alice', email: 'alice@example.com' });
        }, 1000);
    });
}

async function displayUser() {
    console.log('Fetching user...');
    const user = await fetchUser(1); // Pauses here until resolved
    console.log('User:', user);
    console.log('Done!');
}

displayUser();

// Multiple await calls - sequential
async function getUserWithPosts(userId) {
    const user = await fetchUser(userId); // Wait for user
    const posts = await fetchUserPosts(user.id); // Then wait for posts
    return { user, posts };
}

// Multiple await calls - parallel
async function getUserDashboard(userId) {
    // Start all requests simultaneously
    const userPromise = fetchUser(userId);
    const postsPromise = fetchUserPosts(userId);
    const notificationsPromise = fetchNotifications(userId);

    // Wait for all to complete
    const user = await userPromise;
    const posts = await postsPromise;
    const notifications = await notificationsPromise;

    return { user, posts, notifications };
}

// Using Promise.all for parallel operations
async function getUserDashboardOptimized(userId) {
    const [user, posts, notifications] = await Promise.all([
        fetchUser(userId),
        fetchUserPosts(userId),
        fetchNotifications(userId)
    ]);

    return { user, posts, notifications };
}
```

## Error Handling with Try/Catch

Async/await allows you to use traditional try/catch blocks for error handling, making it more intuitive than Promise chains.

```javascript
// Basic error handling
async function fetchUserSafely(id) {
    try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
}

// Handling specific error types
class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

async function processUserData(userId) {
    try {
        const user = await fetchUser(userId);

        if (!user.email) {
            throw new ValidationError('Email is required', 'email');
        }

        const result = await saveUser(user);
        return result;
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error(`Network error (${error.statusCode}):`, error.message);
            // Maybe retry or use cached data
        } else if (error instanceof ValidationError) {
            console.error(`Validation error in ${error.field}:`, error.message);
            // Show validation error to user
        } else {
            console.error('Unexpected error:', error);
            // Generic error handling
        }
        throw error; // Re-throw if caller needs to handle it
    }
}

// Finally block for cleanup
async function uploadFile(file) {
    const loadingSpinner = showLoadingSpinner();

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: file
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    } finally {
        hideLoadingSpinner(loadingSpinner);
        // Always runs, even if there's a return or throw
    }
}
```

## Advanced Patterns

```javascript
// Async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        const data = await fetchData();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();

// Async arrow functions
const getData = async () => {
    const response = await fetch('/api/data');
    return await response.json();
};

// Async class methods
class UserService {
    async getUser(id) {
        const response = await fetch(`/api/users/${id}`);
        return await response.json();
    }

    async createUser(userData) {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return await response.json();
    }

    async updateUser(id, updates) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return await response.json();
    }
}

// Sequential processing with for...of
async function processUsersSequentially(userIds) {
    const results = [];

    for (const id of userIds) {
        const user = await fetchUser(id);
        const processed = await processUser(user);
        results.push(processed);
    }

    return results;
}

// Parallel processing with map and Promise.all
async function processUsersParallel(userIds) {
    const promises = userIds.map(async (id) => {
        const user = await fetchUser(id);
        return await processUser(user);
    });

    return await Promise.all(promises);
}

// Concurrent control - limit parallel operations
async function processBatch(items, batchSize, processor) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map((item) => processor(item))
        );
        results.push(...batchResults);
    }

    return results;
}

// Usage
const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = await processBatch(userIds, 3, fetchUser);
```

## Timeout and Cancellation

```javascript
// Implementing timeout
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), ms)
        )
    ]);
}

async function fetchWithTimeout(url, timeout = 5000) {
    try {
        const response = await withTimeout(fetch(url), timeout);
        return await response.json();
    } catch (error) {
        if (error.message === 'Timeout') {
            console.error(`Request timed out after ${timeout}ms`);
        }
        throw error;
    }
}

// Using AbortController for cancellation
async function fetchWithAbort(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Request was aborted');
        }
        throw error;
    }
}

// Manual cancellation
class CancellableRequest {
    constructor() {
        this.cancelled = false;
    }

    cancel() {
        this.cancelled = true;
    }

    async fetch(url) {
        if (this.cancelled) {
            throw new Error('Request cancelled');
        }

        const response = await fetch(url);

        if (this.cancelled) {
            throw new Error('Request cancelled');
        }

        return await response.json();
    }
}

const request = new CancellableRequest();
request.fetch('/api/data').then((data) => {
    console.log('Data:', data);
}).catch((error) => {
    console.error('Error:', error.message);
});

// Cancel after 2 seconds
setTimeout(() => request.cancel(), 2000);
```

## Retry Logic

```javascript
// Simple retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (i < maxRetries - 1) {
                const delay = baseDelay * Math.pow(2, i);
                console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    throw lastError;
}

// Usage
async function unreliableRequest() {
    const response = await fetch('/api/unreliable');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
}

try {
    const data = await retryWithBackoff(unreliableRequest, 3, 500);
    console.log('Success:', data);
} catch (error) {
    console.error('Failed after retries:', error);
}

// Retry with condition
async function retryIf(fn, shouldRetry, maxRetries = 3) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            if (i < maxRetries - 1 && shouldRetry(error)) {
                console.log(`Retrying... (attempt ${i + 2}/${maxRetries})`);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            } else {
                break;
            }
        }
    }

    throw lastError;
}

// Retry only on network errors
try {
    const data = await retryIf(
        () => fetch('/api/data').then((r) => r.json()),
        (error) => error.name === 'NetworkError',
        3
    );
} catch (error) {
    console.error('Failed:', error);
}
```

## Real-World Examples

```javascript
// Form submission with validation
async function submitForm(formData) {
    const submitButton = document.querySelector('#submit');
    submitButton.disabled = true;

    try {
        // Validate data
        if (!formData.email) {
            throw new ValidationError('Email is required', 'email');
        }

        // Submit to API
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Submission failed');
        }

        const result = await response.json();

        // Show success message
        showNotification('Success!', 'success');
        return result;
    } catch (error) {
        if (error instanceof ValidationError) {
            showNotification(error.message, 'error');
        } else {
            showNotification('An error occurred', 'error');
        }
        throw error;
    } finally {
        submitButton.disabled = false;
    }
}

// Infinite scroll pagination
class InfiniteScroll {
    constructor() {
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
    }

    async loadMore() {
        if (this.loading || !this.hasMore) {
            return;
        }

        this.loading = true;

        try {
            const response = await fetch(`/api/items?page=${this.page}`);
            const data = await response.json();

            if (data.items.length === 0) {
                this.hasMore = false;
                return;
            }

            this.page++;
            return data.items;
        } catch (error) {
            console.error('Error loading more items:', error);
            throw error;
        } finally {
            this.loading = false;
        }
    }
}

// Search with debounce
let searchTimeout;

async function performSearch(query) {
    clearTimeout(searchTimeout);

    return new Promise((resolve) => {
        searchTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const results = await response.json();
                resolve(results);
            } catch (error) {
                console.error('Search error:', error);
                resolve([]);
            }
        }, 300);
    });
}

// Multi-step wizard
async function completeWizard(steps) {
    const results = [];

    for (const [index, step] of steps.entries()) {
        try {
            console.log(`Step ${index + 1}/${steps.length}`);
            const result = await step.execute();
            results.push(result);

            // Optional: Save progress
            await saveProgress(index, result);
        } catch (error) {
            console.error(`Step ${index + 1} failed:`, error);
            // Allow user to retry or skip
            const shouldRetry = await askUserToRetry();
            if (shouldRetry) {
                index--; // Retry this step
            } else {
                throw error;
            }
        }
    }

    return results;
}
```

## Common Pitfalls

```javascript
// Forgetting await
async function wrong() {
    const data = fetchData(); // Returns Promise, not data!
    console.log(data); // Promise { <pending> }
}

async function correct() {
    const data = await fetchData(); // Wait for Promise to resolve
    console.log(data); // Actual data
}

// Not handling errors
async function noErrorHandling() {
    const data = await fetchData(); // Unhandled rejection if fails!
    return data;
}

async function withErrorHandling() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Sequential when parallel is better
async function slow() {
    const user = await fetchUser(1); // 1 second
    const posts = await fetchPosts(); // 1 second
    const comments = await fetchComments(); // 1 second
    // Total: 3 seconds
}

async function fast() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchPosts(),
        fetchComments()
    ]);
    // Total: 1 second (parallel)
}

// Async in forEach (doesn't work as expected)
async function wrong(items) {
    items.forEach(async (item) => {
        await processItem(item); // Runs in parallel, not sequential
    });
}

async function correct(items) {
    for (const item of items) {
        await processItem(item); // Sequential
    }
}
```

## Conclusion

Async/await provides a clean, readable syntax for handling asynchronous operations in JavaScript. By making async code look synchronous, it improves code maintainability and reduces complexity. Combined with try/catch for error handling and Promise utilities for parallel operations, async/await has become the standard approach for modern JavaScript development.
