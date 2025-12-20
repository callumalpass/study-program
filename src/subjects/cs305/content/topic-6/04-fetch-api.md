# Fetch API

The Fetch API provides a modern, Promise-based interface for making HTTP requests in JavaScript. It replaces the older XMLHttpRequest and offers a cleaner, more powerful way to interact with servers, APIs, and resources over the network.

## Fetch Basics

The `fetch()` function takes a URL and returns a Promise that resolves to a Response object.

```javascript
// Basic GET request
fetch('https://api.example.com/users')
    .then((response) => response.json())
    .then((data) => {
        console.log('Users:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Using async/await
async function fetchUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log('Users:', data);
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Fetching text content
async function fetchText() {
    const response = await fetch('/api/message');
    const text = await response.text();
    console.log('Message:', text);
}

// Fetching binary data
async function fetchImage() {
    const response = await fetch('/images/logo.png');
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById('myImage').src = imageUrl;
}
```

## The Request Object

The Request object represents a resource request and can be passed to fetch().

```javascript
// Creating a Request object
const request = new Request('https://api.example.com/users', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    }
});

fetch(request)
    .then((response) => response.json())
    .then((data) => console.log(data));

// Request with options
const postRequest = new Request('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
    })
});

// Cloning requests
const clonedRequest = request.clone();

// Reading request properties
console.log(request.url); // URL
console.log(request.method); // HTTP method
console.log(request.headers); // Headers object
console.log(request.body); // Request body
```

## The Response Object

The Response object represents the response to a request and provides methods to access the response body in different formats.

```javascript
async function analyzeResponse() {
    const response = await fetch('https://api.example.com/users');

    // Response properties
    console.log('Status:', response.status); // 200, 404, etc.
    console.log('Status Text:', response.statusText); // 'OK', 'Not Found'
    console.log('OK:', response.ok); // true if status 200-299
    console.log('URL:', response.url);
    console.log('Headers:', response.headers);

    // Check if successful
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Response body methods
    const json = await response.json(); // Parse as JSON
    // const text = await response.text(); // Parse as text
    // const blob = await response.blob(); // Parse as Blob
    // const arrayBuffer = await response.arrayBuffer(); // Parse as ArrayBuffer
    // const formData = await response.formData(); // Parse as FormData

    return json;
}

// Cloning response (body can only be read once)
async function cloneResponse() {
    const response = await fetch('https://api.example.com/users');

    // Clone before reading
    const clone = response.clone();

    const data1 = await response.json();
    const data2 = await clone.json();

    console.log('Same data:', data1, data2);
}

// Reading headers
async function readHeaders() {
    const response = await fetch('https://api.example.com/users');

    // Get specific header
    const contentType = response.headers.get('Content-Type');
    console.log('Content-Type:', contentType);

    // Check if header exists
    const hasAuth = response.headers.has('Authorization');
    console.log('Has Authorization:', hasAuth);

    // Iterate headers
    for (const [key, value] of response.headers) {
        console.log(`${key}: ${value}`);
    }
}
```

## HTTP Methods

The Fetch API supports all standard HTTP methods through the `method` option.

```javascript
// GET request (default)
async function getUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`);
    return await response.json();
}

// POST request - Create resource
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

// PUT request - Replace resource
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

// PATCH request - Partial update
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

// DELETE request
async function deleteUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete user');
    }

    // DELETE might return no content
    if (response.status === 204) {
        return { success: true };
    }

    return await response.json();
}

// HEAD request - Get headers only
async function checkResourceExists(url) {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
}

// OPTIONS request - Check allowed methods
async function getAllowedMethods(url) {
    const response = await fetch(url, { method: 'OPTIONS' });
    return response.headers.get('Allow');
}
```

## Request Headers

Headers provide metadata about the request and response.

```javascript
// Setting headers
async function fetchWithHeaders() {
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
            'Accept': 'application/json',
            'X-Custom-Header': 'custom-value'
        }
    });

    return await response.json();
}

// Using Headers object
const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'Bearer token123');
headers.set('Accept', 'application/json'); // Set or replace

const response = await fetch('https://api.example.com/users', {
    headers: headers
});

// Headers methods
console.log(headers.get('Content-Type')); // Get value
console.log(headers.has('Authorization')); // Check existence
headers.delete('Accept'); // Remove header

// Iterate headers
for (const [key, value] of headers) {
    console.log(`${key}: ${value}`);
}

// Common headers
const commonHeaders = {
    'Content-Type': 'application/json', // Body format
    'Accept': 'application/json', // Expected response format
    'Authorization': 'Bearer token', // Authentication
    'Cache-Control': 'no-cache', // Caching behavior
    'User-Agent': 'MyApp/1.0', // Client identification
    'Accept-Language': 'en-US', // Language preference
    'If-None-Match': 'etag-value' // Conditional request
};
```

## Request Body

Different types of data can be sent in the request body.

```javascript
// JSON body
async function sendJSON() {
    const data = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
    };

    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}

// FormData - for file uploads
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'My file');

    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData // Don't set Content-Type, browser sets it with boundary
    });

    return await response.json();
}

// URLSearchParams - form encoded data
async function sendFormData() {
    const params = new URLSearchParams();
    params.append('username', 'john');
    params.append('password', 'secret');

    const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    return await response.json();
}

// Plain text
async function sendText() {
    const response = await fetch('https://api.example.com/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: 'Hello, World!'
    });

    return await response.text();
}

// Blob - binary data
async function sendBlob(blob) {
    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        body: blob
    });

    return await response.json();
}
```

## Request Options

Fetch accepts various options to customize requests.

```javascript
// Comprehensive fetch options
const response = await fetch('https://api.example.com/users', {
    method: 'POST', // HTTP method
    headers: {}, // Request headers
    body: JSON.stringify({}), // Request body
    mode: 'cors', // cors, no-cors, same-origin
    credentials: 'include', // include, same-origin, omit
    cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow', // follow, error, manual
    referrer: 'client', // client, no-referrer, URL
    referrerPolicy: 'no-referrer', // Referrer policy
    integrity: 'sha256-...', // Subresource integrity
    keepalive: false, // Keep connection alive
    signal: null // AbortSignal for cancellation
});

// CORS mode
async function corsRequest() {
    const response = await fetch('https://api.example.com/data', {
        mode: 'cors', // Allow cross-origin requests
        credentials: 'include' // Send cookies
    });

    return await response.json();
}

// Cache control
async function cacheRequest() {
    // Always fetch fresh data
    const fresh = await fetch('/api/data', {
        cache: 'no-cache'
    });

    // Use cached version if available
    const cached = await fetch('/api/data', {
        cache: 'force-cache'
    });
}

// Redirect handling
async function handleRedirect() {
    const response = await fetch('https://example.com/redirect', {
        redirect: 'follow' // Default: follow redirects
    });

    console.log('Final URL:', response.url);
}
```

## Error Handling

Proper error handling is crucial when working with network requests.

```javascript
// Basic error handling
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);

        // fetch() only rejects on network failure, not HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Network error:', error);
        } else {
            console.error('Fetch error:', error);
        }
        throw error;
    }
}

// Handling different status codes
async function handleStatusCodes(url) {
    const response = await fetch(url);

    switch (response.status) {
        case 200:
            return await response.json();
        case 201:
            console.log('Resource created');
            return await response.json();
        case 204:
            console.log('No content');
            return null;
        case 400:
            throw new Error('Bad request');
        case 401:
            throw new Error('Unauthorized - please login');
        case 403:
            throw new Error('Forbidden - insufficient permissions');
        case 404:
            throw new Error('Resource not found');
        case 500:
            throw new Error('Server error');
        default:
            throw new Error(`Unexpected status: ${response.status}`);
    }
}

// Timeout handling
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error(`Request timeout after ${timeout}ms`);
        }

        throw error;
    }
}
```

## Advanced Patterns

```javascript
// Request cancellation with AbortController
const controller = new AbortController();

fetch('https://api.example.com/data', {
    signal: controller.signal
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
        if (error.name === 'AbortError') {
            console.log('Request cancelled');
        }
    });

// Cancel request after 5 seconds or on user action
setTimeout(() => controller.abort(), 5000);
document.getElementById('cancel').addEventListener('click', () => {
    controller.abort();
});

// Request interceptor pattern
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        // Add base URL
        const url = `${this.baseURL}${endpoint}`;

        // Add default headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add authentication token
        const token = localStorage.getItem('authToken');
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
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

    delete(endpoint, options) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Usage
const api = new APIClient('https://api.example.com');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });

// Retry logic
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            lastError = error;
            console.log(`Attempt ${i + 1} failed, retrying...`);
            await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
        }
    }

    throw lastError;
}

// Progress tracking for uploads
async function uploadWithProgress(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percent = (event.loaded / event.total) * 100;
                onProgress(percent);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(`Upload failed: ${xhr.status}`));
            }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload error')));

        xhr.open('POST', '/api/upload');
        xhr.send(formData);
    });
}
```

## Conclusion

The Fetch API provides a modern, flexible way to make HTTP requests in JavaScript. Its Promise-based interface integrates seamlessly with async/await, making it easy to write clean, maintainable code for network operations. Understanding fetch, requests, responses, headers, and error handling is essential for building modern web applications that interact with APIs and services.
