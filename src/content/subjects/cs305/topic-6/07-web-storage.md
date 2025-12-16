# Web Storage

Web storage provides mechanisms for storing data in the browser, enabling applications to persist information across sessions, cache data for offline use, and improve performance by reducing server requests. Understanding different storage options helps you choose the right solution for your application's needs.

## localStorage

localStorage stores data with no expiration time. Data persists even after the browser is closed and reopened.

```javascript
// Storing data
localStorage.setItem('username', 'john_doe');
localStorage.setItem('theme', 'dark');
localStorage.setItem('fontSize', '16');

// Retrieving data
const username = localStorage.getItem('username');
console.log('Username:', username); // 'john_doe'

const theme = localStorage.getItem('theme');
console.log('Theme:', theme); // 'dark'

// Removing specific item
localStorage.removeItem('fontSize');

// Clearing all localStorage
localStorage.clear();

// Checking if key exists
if (localStorage.getItem('username')) {
    console.log('User is logged in');
}

// Getting number of items
console.log('Items in storage:', localStorage.length);

// Iterating over all items
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}: ${value}`);
}
```

## Storing Complex Data

localStorage only stores strings, so objects must be serialized.

```javascript
// Storing objects
const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
        theme: 'dark',
        notifications: true
    }
};

// Convert to JSON string
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log('User:', storedUser.name);

// Storing arrays
const items = ['apple', 'banana', 'cherry'];
localStorage.setItem('items', JSON.stringify(items));

const storedItems = JSON.parse(localStorage.getItem('items'));
console.log('Items:', storedItems);

// Handling parsing errors
function getStoredObject(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error parsing stored data:', error);
        return defaultValue;
    }
}

const userData = getStoredObject('user', { name: 'Guest' });
```

## sessionStorage

sessionStorage is similar to localStorage but data is cleared when the page session ends (when the tab is closed).

```javascript
// API is identical to localStorage
sessionStorage.setItem('tempToken', 'abc123');
sessionStorage.setItem('cartItems', JSON.stringify(['item1', 'item2']));

const token = sessionStorage.getItem('tempToken');

// Data persists during page refresh
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
});

// Clear session data
sessionStorage.clear();
```

## localStorage vs sessionStorage

Understanding when to use each storage type is important.

```javascript
// Use localStorage for:
// - User preferences that persist across sessions
localStorage.setItem('userPreferences', JSON.stringify({
    theme: 'dark',
    language: 'en',
    fontSize: 'medium'
}));

// - Authentication tokens (with caution)
localStorage.setItem('authToken', 'token123');

// - Cached data
localStorage.setItem('cachedUsers', JSON.stringify(users));

// Use sessionStorage for:
// - Temporary form data
sessionStorage.setItem('formDraft', JSON.stringify(formData));

// - Page-specific state
sessionStorage.setItem('currentTab', 'profile');

// - Shopping cart (temporary)
sessionStorage.setItem('cart', JSON.stringify(cartItems));

// - Wizard/multi-step form progress
sessionStorage.setItem('wizardStep', '3');
```

## Storage Events

Storage events allow different tabs/windows to synchronize data changes.

```javascript
// Listen for storage changes
window.addEventListener('storage', (event) => {
    console.log('Storage changed!');
    console.log('Key:', event.key);
    console.log('Old value:', event.oldValue);
    console.log('New value:', event.newValue);
    console.log('URL:', event.url);
    console.log('Storage area:', event.storageArea);

    // React to specific changes
    if (event.key === 'theme') {
        applyTheme(event.newValue);
    }

    if (event.key === 'authToken') {
        if (!event.newValue) {
            // User logged out in another tab
            window.location.href = '/login';
        }
    }
});

// Note: storage event doesn't fire in the same tab that made the change
// It only fires in other tabs/windows on the same domain

// Cross-tab communication
function broadcastMessage(key, message) {
    localStorage.setItem(key, JSON.stringify({
        message,
        timestamp: Date.now()
    }));
}

window.addEventListener('storage', (event) => {
    if (event.key === 'broadcast') {
        const data = JSON.parse(event.newValue);
        console.log('Received message:', data.message);
    }
});

broadcastMessage('broadcast', 'Hello from another tab!');
```

## Storage Quota Management

Browsers limit storage space, so managing quota is important.

```javascript
// Check available space (Chrome/Edge)
if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then((estimate) => {
        const usage = estimate.usage;
        const quota = estimate.quota;
        const percentUsed = (usage / quota) * 100;

        console.log(`Using ${usage} of ${quota} bytes (${percentUsed.toFixed(2)}%)`);
    });
}

// Handle quota exceeded errors
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.error('Storage quota exceeded');

            // Clean up old items
            cleanupOldItems();

            // Try again
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (retryError) {
                console.error('Still failed after cleanup');
                return false;
            }
        }
        return false;
    }
}

// Remove oldest items
function cleanupOldItems() {
    const items = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        try {
            const data = JSON.parse(value);
            if (data.timestamp) {
                items.push({ key, timestamp: data.timestamp });
            }
        } catch (e) {
            // Not timestamped data
        }
    }

    // Sort by timestamp and remove oldest
    items.sort((a, b) => a.timestamp - b.timestamp);
    if (items.length > 0) {
        localStorage.removeItem(items[0].key);
    }
}
```

## Helper Utilities

Creating utility functions improves code reusability.

```javascript
// Storage wrapper with expiration
class StorageManager {
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    set(key, value, expiresIn = null) {
        const item = {
            value,
            timestamp: Date.now(),
            expires: expiresIn ? Date.now() + expiresIn : null
        };

        try {
            this.storage.setItem(key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    get(key, defaultValue = null) {
        try {
            const itemStr = this.storage.getItem(key);

            if (!itemStr) {
                return defaultValue;
            }

            const item = JSON.parse(itemStr);

            // Check expiration
            if (item.expires && Date.now() > item.expires) {
                this.storage.removeItem(key);
                return defaultValue;
            }

            return item.value;
        } catch (error) {
            console.error('Error retrieving item:', error);
            return defaultValue;
        }
    }

    remove(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

    has(key) {
        return this.storage.getItem(key) !== null;
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            keys.push(this.storage.key(i));
        }
        return keys;
    }

    size() {
        return this.storage.length;
    }

    // Clean expired items
    cleanExpired() {
        const keys = this.keys();
        let cleaned = 0;

        keys.forEach((key) => {
            try {
                const item = JSON.parse(this.storage.getItem(key));
                if (item.expires && Date.now() > item.expires) {
                    this.storage.removeItem(key);
                    cleaned++;
                }
            } catch (error) {
                // Invalid item, skip
            }
        });

        return cleaned;
    }
}

// Usage
const storage = new StorageManager(localStorage);

// Store with 1 hour expiration
storage.set('tempData', { message: 'Hello' }, 60 * 60 * 1000);

// Retrieve
const data = storage.get('tempData', { message: 'Default' });

// Clean expired items
storage.cleanExpired();

// Namespace wrapper
class NamespacedStorage {
    constructor(namespace, storage = localStorage) {
        this.namespace = namespace;
        this.storage = storage;
    }

    _getKey(key) {
        return `${this.namespace}:${key}`;
    }

    set(key, value) {
        this.storage.setItem(this._getKey(key), JSON.stringify(value));
    }

    get(key, defaultValue = null) {
        const item = this.storage.getItem(this._getKey(key));
        return item ? JSON.parse(item) : defaultValue;
    }

    remove(key) {
        this.storage.removeItem(this._getKey(key));
    }

    clear() {
        const keysToRemove = [];

        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key.startsWith(`${this.namespace}:`)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach((key) => this.storage.removeItem(key));
    }
}

// Usage with namespaces
const userStorage = new NamespacedStorage('user');
const appStorage = new NamespacedStorage('app');

userStorage.set('preferences', { theme: 'dark' });
appStorage.set('settings', { version: '1.0' });

userStorage.clear(); // Only clears user-namespaced items
```

## IndexedDB

IndexedDB is a low-level API for storing significant amounts of structured data.

```javascript
// Opening a database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MyDatabase', 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create object store
            if (!db.objectStoreNames.contains('users')) {
                const objectStore = db.createObjectStore('users', {
                    keyPath: 'id',
                    autoIncrement: true
                });

                // Create indexes
                objectStore.createIndex('email', 'email', { unique: true });
                objectStore.createIndex('name', 'name', { unique: false });
            }
        };
    });
}

// Adding data
async function addUser(userData) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.add(userData);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Reading data
async function getUser(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Updating data
async function updateUser(id, userData) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.put({ ...userData, id });

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Deleting data
async function deleteUser(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Querying data
async function getUserByEmail(email) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
        const index = objectStore.index('email');
        const request = index.get(email);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Getting all data
async function getAllUsers() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
        const request = objectStore.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Usage
try {
    const userId = await addUser({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
    });

    console.log('User added with ID:', userId);

    const user = await getUser(userId);
    console.log('Retrieved user:', user);

    await updateUser(userId, {
        name: 'John Doe',
        email: 'john@example.com',
        age: 31
    });

    const allUsers = await getAllUsers();
    console.log('All users:', allUsers);
} catch (error) {
    console.error('IndexedDB error:', error);
}
```

## Cookies

Cookies are primarily used for server communication but can also store client-side data.

```javascript
// Setting a cookie
function setCookie(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Getting a cookie
function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }

    return null;
}

// Deleting a cookie
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Cookie with options
function setSecureCookie(name, value, options = {}) {
    const defaults = {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        secure: true,
        sameSite: 'Strict'
    };

    const config = { ...defaults, ...options };
    let cookieString = `${name}=${value}`;

    if (config.maxAge) {
        cookieString += `;max-age=${config.maxAge}`;
    }

    if (config.path) {
        cookieString += `;path=${config.path}`;
    }

    if (config.domain) {
        cookieString += `;domain=${config.domain}`;
    }

    if (config.secure) {
        cookieString += ';secure';
    }

    if (config.sameSite) {
        cookieString += `;samesite=${config.sameSite}`;
    }

    if (config.httpOnly) {
        cookieString += ';httponly';
    }

    document.cookie = cookieString;
}

// Usage
setCookie('username', 'john_doe', 30);
const username = getCookie('username');
deleteCookie('username');

setSecureCookie('sessionToken', 'abc123', {
    maxAge: 60 * 60, // 1 hour
    secure: true,
    sameSite: 'Strict'
});
```

## Choosing the Right Storage

```javascript
// Decision guide
const storageGuide = {
    localStorage: {
        useFor: [
            'User preferences',
            'Application settings',
            'Cached data',
            'Draft content'
        ],
        limitations: [
            'Max ~5-10MB',
            'Synchronous API',
            'String values only',
            'No expiration'
        ]
    },

    sessionStorage: {
        useFor: [
            'Temporary form data',
            'Page state',
            'Session-specific cache',
            'Wizard progress'
        ],
        limitations: [
            'Max ~5-10MB',
            'Cleared on tab close',
            'String values only',
            'Synchronous API'
        ]
    },

    IndexedDB: {
        useFor: [
            'Large datasets',
            'Complex objects',
            'Offline applications',
            'Structured data'
        ],
        limitations: [
            'Complex API',
            'Asynchronous only',
            'Requires more code'
        ]
    },

    cookies: {
        useFor: [
            'Server communication',
            'Authentication tokens',
            'Tracking',
            'Small preferences'
        ],
        limitations: [
            'Max ~4KB',
            'Sent with every request',
            'Security concerns',
            'Domain restrictions'
        ]
    }
};

// Example: Choosing storage for user preferences
function saveUserPreferences(preferences) {
    // Small, simple data -> localStorage
    if (Object.keys(preferences).length < 10) {
        localStorage.setItem('preferences', JSON.stringify(preferences));
        return;
    }

    // Large or complex data -> IndexedDB
    return saveToIndexedDB('preferences', preferences);
}
```

## Conclusion

Web storage provides multiple options for persisting data in the browser, each with its own use cases and limitations. localStorage and sessionStorage are simple and sufficient for most needs, IndexedDB handles large structured data, and cookies facilitate server communication. Understanding these options and their appropriate uses enables you to build applications that work efficiently both online and offline.
