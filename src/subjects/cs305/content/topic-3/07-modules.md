# JavaScript Modules

JavaScript modules enable code organization by splitting functionality into separate files. Modules provide encapsulation, reusability, and maintainability for large applications. Understanding ES6 module syntax with import/export is essential for modern JavaScript development.

## What are Modules?

Modules are JavaScript files that export functionality for use in other files. They help:

- Organize code into logical units
- Avoid global scope pollution
- Enable code reuse
- Improve maintainability
- Manage dependencies

Without modules, all JavaScript runs in global scope:

```javascript
// script1.js
var username = 'Alice';

// script2.js
var username = 'Bob';  // Overwrites script1.js variable!
```

With modules, each file has its own scope:

```javascript
// user1.js
const username = 'Alice';
export { username };

// user2.js
const username = 'Bob';
export { username };
```

## ES6 Module Syntax

ES6 (ES2015) introduced native module support with `import` and `export`.

### Named Exports

Export multiple items from a file:

**math.js**:
```javascript
// Export individual items
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// Or export all at once
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export { multiply, divide };
```

**main.js**:
```javascript
// Import specific items
import { PI, add, subtract } from './math.js';

console.log(PI);           // 3.14159
console.log(add(5, 3));    // 8
console.log(subtract(10, 4)); // 6

// Import all as namespace
import * as math from './math.js';

console.log(math.PI);
console.log(math.add(5, 3));
```

### Default Exports

Export a single main value from a file:

**calculator.js**:
```javascript
export default function calculator(a, b, operation) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        default:
            return 0;
    }
}
```

**main.js**:
```javascript
// Import default export (can use any name)
import calculator from './calculator.js';
import calc from './calculator.js';  // Same thing

console.log(calculator(5, 3, 'add'));  // 8
```

### Combining Named and Default Exports

**user.js**:
```javascript
// Default export
export default class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

// Named exports
export const ADMIN_ROLE = 'admin';
export const USER_ROLE = 'user';

export function validateUser(user) {
    return user && user.name;
}
```

**main.js**:
```javascript
// Import default and named exports
import User, { ADMIN_ROLE, USER_ROLE, validateUser } from './user.js';

const user = new User('Alice');
console.log(user.greet());
console.log(ADMIN_ROLE);
console.log(validateUser(user));
```

### Renaming Imports and Exports

**Rename exports**:

```javascript
// math.js
const sum = (a, b) => a + b;
const difference = (a, b) => a - b;

export { sum as add, difference as subtract };
```

**Rename imports**:

```javascript
// main.js
import { add as sum, subtract as diff } from './math.js';

console.log(sum(5, 3));   // 8
console.log(diff(10, 4)); // 6
```

### Re-exporting

Export items from another module:

**utils.js**:
```javascript
export { add, subtract } from './math.js';
export { User } from './user.js';

// Or re-export everything
export * from './helpers.js';

// Re-export with rename
export { default as Calculator } from './calculator.js';
```

## Module Patterns

### Utility Module

**utils.js**:
```javascript
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, length) {
    return str.length > length ? str.slice(0, length) + '...' : str;
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}
```

**Usage**:
```javascript
import { capitalize, truncate } from './utils.js';

console.log(capitalize('hello'));      // "Hello"
console.log(truncate('Long text', 5)); // "Long..."
```

### Constants Module

**constants.js**:
```javascript
export const API_URL = 'https://api.example.com';
export const API_KEY = 'your-api-key';
export const MAX_RETRIES = 3;
export const TIMEOUT = 5000;

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

export const COLORS = {
    PRIMARY: '#007bff',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545'
};
```

**Usage**:
```javascript
import { API_URL, ROLES } from './constants.js';

console.log(API_URL);
console.log(ROLES.ADMIN);
```

### Service Module

**userService.js**:
```javascript
const API_URL = 'https://api.example.com';

async function fetchUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
}

async function createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
}

async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return response.json();
}

export { fetchUser, createUser, updateUser };
```

**Usage**:
```javascript
import { fetchUser, createUser } from './userService.js';

const user = await fetchUser(123);
const newUser = await createUser({ name: 'Alice', email: 'alice@example.com' });
```

### Class Module

**User.js**:
```javascript
export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }

    getAge() {
        const now = new Date();
        return now.getFullYear() - this.createdAt.getFullYear();
    }

    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
```

**Usage**:
```javascript
import User from './User.js';

const user = new User('Alice', 'alice@example.com');
console.log(user.greet());

if (User.validateEmail('test@example.com')) {
    console.log('Valid email');
}
```

## Using Modules in HTML

Add `type="module"` to script tags:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ES6 Modules</title>
</head>
<body>
    <h1>ES6 Modules Demo</h1>

    <script type="module">
        import { add, subtract } from './math.js';
        import User from './User.js';

        console.log(add(5, 3));

        const user = new User('Alice');
        console.log(user.greet());
    </script>

    <!-- Or external module -->
    <script type="module" src="main.js"></script>
</body>
</html>
```

**Module characteristics**:
- Automatically in strict mode
- Have their own scope
- Loaded asynchronously
- Executed once (cached)

## Module Scope

Each module has its own scope:

**module1.js**:
```javascript
const secret = 'This is private';
export const public = 'This is public';

function privateFunction() {
    return secret;
}

export function publicFunction() {
    return privateFunction();
}
```

**main.js**:
```javascript
import { public, publicFunction } from './module1.js';

console.log(public);           // Works
console.log(publicFunction()); // Works
console.log(secret);           // Error: secret is not defined
```

## Dynamic Imports

Load modules conditionally or lazily:

```javascript
// Static import (loaded immediately)
import { add } from './math.js';

// Dynamic import (loaded when needed)
const button = document.querySelector('#loadButton');

button.addEventListener('click', async () => {
    const { add, subtract } = await import('./math.js');
    console.log(add(5, 3));
});

// Conditional loading
if (userNeedsFeature) {
    const module = await import('./feature.js');
    module.initialize();
}

// Error handling
try {
    const module = await import('./optional.js');
    module.run();
} catch (error) {
    console.error('Failed to load module:', error);
}
```

## Module Best Practices

**One module per file**: Keep modules focused and single-purpose.

**Use named exports for utilities**: Makes imports explicit.

```javascript
// Good
export function formatDate(date) { }
export function parseDate(str) { }

// Use as:
import { formatDate } from './utils.js';
```

**Use default export for classes**: When file exports one main thing.

```javascript
// User.js
export default class User { }

// Import as:
import User from './User.js';
```

**Group related exports**: Use barrel files (index.js) to group exports.

**utils/index.js**:
```javascript
export { formatDate, parseDate } from './dateUtils.js';
export { capitalize, truncate } from './stringUtils.js';
export { validateEmail, validatePhone } from './validators.js';
```

**Usage**:
```javascript
// Import from single file
import { formatDate, capitalize, validateEmail } from './utils/index.js';
```

**Keep modules small**: Each module should have a clear, focused purpose.

**Avoid circular dependencies**: Module A imports B, B imports A causes issues.

**Use absolute paths sparingly**: Relative paths are more portable.

## Common Patterns

### API Module

**api.js**:
```javascript
const BASE_URL = 'https://api.example.com';

async function get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
}

async function post(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return response.json();
}

export const api = { get, post };
```

### Config Module

**config.js**:
```javascript
const config = {
    development: {
        apiUrl: 'http://localhost:3000',
        debug: true
    },
    production: {
        apiUrl: 'https://api.example.com',
        debug: false
    }
};

const env = process.env.NODE_ENV || 'development';

export default config[env];
```

### Helper Module

**helpers.js**:
```javascript
export const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
```

## Browser Compatibility

ES6 modules are supported in modern browsers:
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

For older browsers, use a bundler like:
- **Webpack**: Module bundler
- **Rollup**: Optimized for libraries
- **Parcel**: Zero-config bundler
- **Vite**: Fast development server

## Node.js Modules

Node.js traditionally used CommonJS:

```javascript
// CommonJS (older)
const express = require('express');
module.exports = app;

// ES6 modules (modern)
import express from 'express';
export default app;
```

To use ES6 modules in Node.js:
- Use `.mjs` file extension, or
- Add `"type": "module"` to package.json

## Complete Example

**Project structure**:
```
project/
├── index.html
├── main.js
├── models/
│   └── User.js
├── services/
│   └── userService.js
├── utils/
│   ├── constants.js
│   ├── validators.js
│   └── index.js
```

**models/User.js**:
```javascript
export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }
}
```

**services/userService.js**:
```javascript
import { API_URL } from '../utils/constants.js';

export async function fetchUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    return response.json();
}
```

**utils/constants.js**:
```javascript
export const API_URL = 'https://api.example.com';
export const MAX_RETRIES = 3;
```

**utils/validators.js**:
```javascript
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
    return password.length >= 8;
}
```

**utils/index.js**:
```javascript
export * from './constants.js';
export * from './validators.js';
```

**main.js**:
```javascript
import User from './models/User.js';
import { fetchUser, createUser } from './services/userService.js';
import { validateEmail } from './utils/index.js';

// Create user
const user = new User('Alice', 'alice@example.com');
console.log(user.greet());

// Validate
if (validateEmail(user.email)) {
    console.log('Valid email');
}

// Fetch from API
const apiUser = await fetchUser(123);
console.log(apiUser);
```

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Modules Demo</title>
</head>
<body>
    <h1>ES6 Modules</h1>
    <script type="module" src="main.js"></script>
</body>
</html>
```

## Conclusion

JavaScript modules are essential for organizing code in modern applications. Use ES6 import/export syntax to create modular, maintainable code. Leverage named exports for utilities and multiple exports, default exports for classes and main exports. Structure projects with logical module organization, use barrel files to group related exports, and follow best practices like keeping modules focused and avoiding circular dependencies. Modules enable code reuse, improve maintainability, and are fundamental to modern JavaScript development.
