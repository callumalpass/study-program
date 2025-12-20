# REST APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources. Understanding REST principles is essential for building and consuming modern web APIs.

## REST Principles

REST is built on several key principles that guide API design:

### 1. Client-Server Separation

The client and server are independent, communicating only through requests and responses.

```javascript
// Client makes requests
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    return await response.json();
}

// Server processes and responds
// Server code (Node.js/Express example)
app.get('/users', (req, res) => {
    const users = database.getUsers();
    res.json(users);
});
```

### 2. Statelessness

Each request contains all information needed to process it. The server doesn't store client state between requests.

```javascript
// Each request includes authentication
async function fetchUserData() {
    const token = localStorage.getItem('authToken');

    const response = await fetch('https://api.example.com/user/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return await response.json();
}

// Bad: Relying on server-stored session
async function badFetch() {
    // Assumes server remembers who we are from previous request
    const response = await fetch('https://api.example.com/user/profile');
}
```

### 3. Cacheability

Responses should indicate whether they can be cached.

```javascript
// Server sets cache headers
app.get('/users', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
    res.json(users);
});

// Client respects cache
const response = await fetch('https://api.example.com/users', {
    cache: 'default' // Use cache if valid
});
```

### 4. Uniform Interface

Resources are identified by URIs, and operations use standard HTTP methods.

```javascript
// Resources identified by URIs
const usersEndpoint = '/users';
const userEndpoint = '/users/123';
const userPostsEndpoint = '/users/123/posts';

// Standard HTTP methods
await fetch('/users', { method: 'GET' }); // List users
await fetch('/users/123', { method: 'GET' }); // Get user
await fetch('/users', { method: 'POST', body: data }); // Create user
await fetch('/users/123', { method: 'PUT', body: data }); // Update user
await fetch('/users/123', { method: 'DELETE' }); // Delete user
```

### 5. Layered System

Client doesn't know if it's connected directly to the server or through intermediaries.

```javascript
// Client doesn't care about proxies, load balancers, CDNs
const response = await fetch('https://api.example.com/users');
// Could go through: CDN -> Load Balancer -> API Gateway -> Server
```

## HTTP Methods

REST uses HTTP methods to define operations on resources.

```javascript
// GET - Retrieve resource(s)
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    return await response.json();
}

async function getUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`);
    return await response.json();
}

// POST - Create new resource
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }

    return await response.json();
}

// PUT - Replace entire resource
async function updateUser(id, userData) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
}

// PATCH - Partially update resource
async function patchUser(id, updates) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });

    return await response.json();
}

// DELETE - Remove resource
async function deleteUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE'
    });

    if (response.status === 204) {
        return { success: true };
    }

    return await response.json();
}
```

## Resource Naming Conventions

RESTful APIs follow consistent naming patterns for resources.

```javascript
// Collections (plural nouns)
'/users' // All users
'/posts' // All posts
'/products' // All products

// Individual resources
'/users/123' // Specific user
'/posts/456' // Specific post

// Nested resources
'/users/123/posts' // All posts by user 123
'/posts/456/comments' // All comments on post 456
'/users/123/posts/789' // Specific post by specific user

// Actions as resources
'/users/123/activate' // Activate user
'/posts/456/publish' // Publish post

// Filtering, sorting, pagination (query parameters)
'/users?status=active' // Filter users by status
'/users?sort=name&order=asc' // Sort users by name
'/users?page=2&limit=20' // Pagination
'/posts?author=123&category=tech' // Multiple filters
```

## Working with JSON

JSON is the standard data format for REST APIs.

```javascript
// Sending JSON
async function createPost(postData) {
    const response = await fetch('https://api.example.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            title: postData.title,
            content: postData.content,
            author: postData.authorId,
            tags: postData.tags,
            published: true
        })
    });

    return await response.json();
}

// Receiving JSON
async function getPosts() {
    const response = await fetch('https://api.example.com/posts', {
        headers: {
            'Accept': 'application/json'
        }
    });

    const posts = await response.json();
    return posts;
}

// Handling nested JSON
async function getUserWithRelations() {
    const response = await fetch('https://api.example.com/users/123?include=posts,comments');

    const data = await response.json();
    // {
    //   id: 123,
    //   name: 'John Doe',
    //   posts: [...],
    //   comments: [...]
    // }

    return data;
}

// Transforming data
async function getFormattedPosts() {
    const response = await fetch('https://api.example.com/posts');
    const posts = await response.json();

    return posts.map((post) => ({
        id: post.id,
        title: post.title,
        excerpt: post.content.substring(0, 100),
        author: post.author.name,
        publishedDate: new Date(post.createdAt).toLocaleDateString()
    }));
}
```

## Status Codes

HTTP status codes indicate the result of API requests.

```javascript
async function handleStatusCodes(url, options) {
    const response = await fetch(url, options);

    // 2xx Success
    if (response.status === 200) {
        // OK - Request succeeded
        return await response.json();
    }

    if (response.status === 201) {
        // Created - Resource created successfully
        const location = response.headers.get('Location');
        console.log('Created at:', location);
        return await response.json();
    }

    if (response.status === 204) {
        // No Content - Success but no response body
        return null;
    }

    // 3xx Redirection
    if (response.status === 304) {
        // Not Modified - Use cached version
        return getCachedData(url);
    }

    // 4xx Client Errors
    if (response.status === 400) {
        // Bad Request - Invalid data
        const error = await response.json();
        throw new Error(`Validation error: ${error.message}`);
    }

    if (response.status === 401) {
        // Unauthorized - Authentication required
        window.location.href = '/login';
        throw new Error('Please log in');
    }

    if (response.status === 403) {
        // Forbidden - Insufficient permissions
        throw new Error('Access denied');
    }

    if (response.status === 404) {
        // Not Found - Resource doesn't exist
        throw new Error('Resource not found');
    }

    if (response.status === 409) {
        // Conflict - Resource conflict (e.g., duplicate)
        throw new Error('Resource already exists');
    }

    if (response.status === 422) {
        // Unprocessable Entity - Validation failed
        const errors = await response.json();
        throw new Error(`Validation errors: ${JSON.stringify(errors)}`);
    }

    if (response.status === 429) {
        // Too Many Requests - Rate limit exceeded
        const retryAfter = response.headers.get('Retry-After');
        throw new Error(`Rate limited. Retry after ${retryAfter} seconds`);
    }

    // 5xx Server Errors
    if (response.status === 500) {
        // Internal Server Error
        throw new Error('Server error. Please try again later');
    }

    if (response.status === 503) {
        // Service Unavailable
        throw new Error('Service temporarily unavailable');
    }

    throw new Error(`Unexpected status: ${response.status}`);
}
```

## Query Parameters

Query parameters filter, sort, and paginate resources.

```javascript
// Building query strings
function buildQueryString(params) {
    return new URLSearchParams(params).toString();
}

// Filtering
async function getActiveUsers() {
    const params = buildQueryString({
        status: 'active',
        role: 'admin'
    });

    const response = await fetch(`https://api.example.com/users?${params}`);
    return await response.json();
}

// Sorting
async function getSortedPosts() {
    const params = buildQueryString({
        sort: 'createdAt',
        order: 'desc'
    });

    const response = await fetch(`https://api.example.com/posts?${params}`);
    return await response.json();
}

// Pagination
async function getPagedUsers(page = 1, limit = 20) {
    const params = buildQueryString({
        page,
        limit
    });

    const response = await fetch(`https://api.example.com/users?${params}`);
    const data = await response.json();

    return {
        users: data.items,
        total: data.total,
        page: data.page,
        totalPages: Math.ceil(data.total / limit)
    };
}

// Complex queries
async function searchPosts(filters) {
    const params = buildQueryString({
        q: filters.searchTerm,
        author: filters.authorId,
        category: filters.category,
        tags: filters.tags.join(','),
        from: filters.dateFrom,
        to: filters.dateTo,
        sort: 'relevance',
        page: filters.page,
        limit: filters.limit
    });

    const response = await fetch(`https://api.example.com/posts/search?${params}`);
    return await response.json();
}

// Field selection
async function getUserWithFields(id, fields) {
    const params = buildQueryString({
        fields: fields.join(',') // 'id,name,email'
    });

    const response = await fetch(`https://api.example.com/users/${id}?${params}`);
    return await response.json();
}
```

## Authentication and Authorization

REST APIs commonly use token-based authentication.

```javascript
// API key authentication
async function fetchWithAPIKey(endpoint) {
    const response = await fetch(`https://api.example.com${endpoint}`, {
        headers: {
            'X-API-Key': 'your-api-key-here'
        }
    });

    return await response.json();
}

// Bearer token authentication (JWT)
class AuthenticatedAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.token = null;
    }

    async login(email, password) {
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        this.token = data.token;
        localStorage.setItem('authToken', data.token);
        return data;
    }

    async logout() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    async request(endpoint, options = {}) {
        if (!this.token) {
            this.token = localStorage.getItem('authToken');
        }

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Token expired or invalid
            this.logout();
            throw new Error('Session expired. Please log in again.');
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage
const api = new AuthenticatedAPI('https://api.example.com');
await api.login('user@example.com', 'password');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John Doe' });
```

## Error Handling

Comprehensive error handling improves API reliability.

```javascript
class APIError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.data = data;
    }
}

async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        // Parse response
        let data;
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Handle errors
        if (!response.ok) {
            throw new APIError(
                data.message || `HTTP ${response.status}`,
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        if (error instanceof APIError) {
            // API returned an error
            console.error('API Error:', error.message, error.data);
        } else if (error instanceof TypeError) {
            // Network error
            console.error('Network Error:', error.message);
        } else {
            // Unknown error
            console.error('Unknown Error:', error);
        }
        throw error;
    }
}

// Usage with error handling
async function getUserSafely(id) {
    try {
        const user = await apiRequest(`https://api.example.com/users/${id}`);
        return user;
    } catch (error) {
        if (error instanceof APIError && error.status === 404) {
            console.log('User not found');
            return null;
        }
        throw error;
    }
}
```

## Real-World API Client

```javascript
class RESTClient {
    constructor(config = {}) {
        this.baseURL = config.baseURL || '';
        this.headers = config.headers || {};
        this.timeout = config.timeout || 30000;
        this.retryAttempts = config.retryAttempts || 3;
        this.interceptors = {
            request: [],
            response: []
        };
    }

    addRequestInterceptor(fn) {
        this.interceptors.request.push(fn);
    }

    addResponseInterceptor(fn) {
        this.interceptors.response.push(fn);
    }

    async request(endpoint, options = {}) {
        let url = `${this.baseURL}${endpoint}`;
        let config = {
            headers: { ...this.headers, ...options.headers },
            ...options
        };

        // Apply request interceptors
        for (const interceptor of this.interceptors.request) {
            const result = await interceptor(url, config);
            if (result) {
                url = result.url || url;
                config = result.config || config;
            }
        }

        // Add timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        config.signal = controller.signal;

        try {
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            // Apply response interceptors
            let processedResponse = response;
            for (const interceptor of this.interceptors.response) {
                processedResponse = await interceptor(processedResponse);
            }

            if (!processedResponse.ok) {
                throw new APIError(
                    `HTTP ${processedResponse.status}`,
                    processedResponse.status
                );
            }

            return await processedResponse.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error.name === 'AbortError') {
                throw new Error('Request timeout');
            }

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

    put(endpoint, data, options) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    patch(endpoint, data, options) {
        return this.request(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    delete(endpoint, options) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Usage
const api = new RESTClient({
    baseURL: 'https://api.example.com',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// Add logging interceptor
api.addRequestInterceptor((url, config) => {
    console.log(`Request: ${config.method} ${url}`);
    return { url, config };
});

api.addResponseInterceptor((response) => {
    console.log(`Response: ${response.status}`);
    return response;
});

// Make requests
const users = await api.get('/users?page=1&limit=10');
const user = await api.post('/users', { name: 'John Doe' });
await api.delete('/users/123');
```

## Conclusion

REST APIs provide a standardized way to build and consume web services. By following REST principles, using appropriate HTTP methods, structuring URLs logically, and handling errors properly, you can create robust, maintainable APIs. Understanding these concepts is essential for modern web development, whether you're building APIs or consuming them in your applications.
