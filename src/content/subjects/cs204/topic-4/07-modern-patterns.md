# Modern Design Patterns

As software development evolves, new patterns emerge to address contemporary challenges in web development, cloud computing, microservices, and reactive programming. This section explores patterns relevant to modern application development.

## Overview of Modern Patterns

Modern patterns address challenges specific to contemporary software development, including distributed systems, asynchronous operations, cloud infrastructure, and real-time user interfaces.

### Contemporary Challenges

- **Distributed Systems**: Applications spanning multiple servers and services
- **Asynchronous Operations**: Non-blocking I/O and event-driven architectures
- **Scalability**: Handling variable loads and horizontal scaling
- **Real-time Updates**: Live data synchronization across clients
- **Cloud Infrastructure**: Leveraging cloud services and serverless computing

## Module Pattern (JavaScript)

The Module pattern provides encapsulation and privacy in JavaScript, creating private and public members within a single object.

### When to Use

- Need to create private variables and functions
- Want to organize code into logical units
- Avoid polluting the global namespace

### Implementation

```javascript
// Module Pattern - IIFE (Immediately Invoked Function Expression)
const UserModule = (function() {
    // Private variables and functions
    let users = [];
    let nextId = 1;

    function validateEmail(email) {
        return email.includes('@');
    }

    function generateId() {
        return nextId++;
    }

    // Public API
    return {
        addUser: function(name, email) {
            if (!validateEmail(email)) {
                throw new Error('Invalid email');
            }

            const user = {
                id: generateId(),
                name: name,
                email: email
            };

            users.push(user);
            return user;
        },

        getUser: function(id) {
            return users.find(u => u.id === id);
        },

        getAllUsers: function() {
            // Return copy to prevent external modification
            return [...users];
        },

        removeUser: function(id) {
            users = users.filter(u => u.id !== id);
        }
    };
})();

// Usage
const user1 = UserModule.addUser('Alice', 'alice@example.com');
const user2 = UserModule.addUser('Bob', 'bob@example.com');

console.log(UserModule.getAllUsers());
// Cannot access private members
console.log(UserModule.users);        // undefined
console.log(UserModule.validateEmail); // undefined

// ES6 Module Pattern
class UserManager {
    #users = [];  // Private field
    #nextId = 1;

    #validateEmail(email) {
        return email.includes('@');
    }

    #generateId() {
        return this.#nextId++;
    }

    addUser(name, email) {
        if (!this.#validateEmail(email)) {
            throw new Error('Invalid email');
        }

        const user = {
            id: this.#generateId(),
            name: name,
            email: email
        };

        this.#users.push(user);
        return user;
    }

    getUser(id) {
        return this.#users.find(u => u.id === id);
    }
}

const manager = new UserManager();
manager.addUser('Charlie', 'charlie@example.com');
```

## Middleware Pattern

The Middleware pattern creates a pipeline of processing steps, commonly used in web frameworks like Express.js. Each middleware can process the request, modify it, and pass it to the next middleware.

### When to Use

- Need to process requests through multiple steps
- Want to add cross-cutting concerns (logging, authentication, etc.)
- Need a flexible, composable request processing pipeline

### Implementation

```javascript
// Middleware system
class Application {
    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
        return this;  // Enable chaining
    }

    async handle(request) {
        let index = 0;

        const next = async () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index++];
                await middleware(request, next);
            }
        };

        await next();
        return request;
    }
}

// Middleware functions
const logger = async (req, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    await next();
};

const authenticate = async (req, next) => {
    if (req.headers.authorization) {
        req.user = { id: 1, name: 'Alice' };
        console.log('User authenticated');
    } else {
        console.log('No authentication provided');
    }
    await next();
};

const validateRequest = async (req, next) => {
    if (!req.body) {
        throw new Error('Request body is required');
    }
    console.log('Request validated');
    await next();
};

const processRequest = async (req, next) => {
    console.log('Processing request...');
    req.result = { status: 'success', data: req.body };
    await next();
};

// Usage
const app = new Application();

app
    .use(logger)
    .use(authenticate)
    .use(validateRequest)
    .use(processRequest);

const request = {
    method: 'POST',
    url: '/api/users',
    headers: { authorization: 'Bearer token123' },
    body: { name: 'Bob', email: 'bob@example.com' }
};

app.handle(request).then(result => {
    console.log('Final result:', result.result);
});

// Output:
// [2025-12-16T...] POST /api/users
// User authenticated
// Request validated
// Processing request...
// Final result: { status: 'success', data: { name: 'Bob', email: 'bob@example.com' } }
```

### Python Middleware Pattern

```python
from typing import Callable, Any

class Request:
    def __init__(self, path: str, method: str, headers: dict = None):
        self.path = path
        self.method = method
        self.headers = headers or {}
        self.user = None
        self.data = None

class MiddlewareApp:
    def __init__(self):
        self.middlewares = []

    def use(self, middleware: Callable):
        """Add middleware to the pipeline"""
        self.middlewares.append(middleware)
        return self

    def handle(self, request: Request):
        """Process request through middleware pipeline"""
        def create_next(index):
            if index < len(self.middlewares):
                def next_middleware():
                    self.middlewares[index](request, create_next(index + 1))
                return next_middleware
            return lambda: None

        create_next(0)()
        return request

# Middleware functions
def logging_middleware(req: Request, next: Callable):
    print(f"[LOG] {req.method} {req.path}")
    next()

def auth_middleware(req: Request, next: Callable):
    if "Authorization" in req.headers:
        req.user = {"id": 1, "name": "Alice"}
        print("[AUTH] User authenticated")
    next()

def data_processing_middleware(req: Request, next: Callable):
    print("[PROCESS] Processing request data")
    req.data = {"processed": True}
    next()

# Usage
app = MiddlewareApp()
app.use(logging_middleware)
app.use(auth_middleware)
app.use(data_processing_middleware)

request = Request(
    path="/api/users",
    method="GET",
    headers={"Authorization": "Bearer token123"}
)

result = app.handle(request)
print(f"User: {result.user}")
print(f"Data: {result.data}")
```

## Circuit Breaker Pattern

The Circuit Breaker pattern prevents an application from repeatedly trying to execute an operation that's likely to fail, allowing it to continue without waiting for the fault to be fixed or wasting resources.

### When to Use

- Calling remote services that may fail
- Operations that may take a long time
- Need to fail fast rather than waiting
- Want to prevent cascading failures

### Implementation in Python

```python
import time
from enum import Enum
from datetime import datetime, timedelta

class CircuitState(Enum):
    CLOSED = "closed"    # Normal operation
    OPEN = "open"        # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60, retry_timeout=30):
        self.failure_threshold = failure_threshold
        self.timeout = timeout  # seconds before trying again
        self.retry_timeout = retry_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED

    def call(self, func, *args, **kwargs):
        """Execute function with circuit breaker protection"""
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN - service unavailable")

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e

    def _should_attempt_reset(self):
        """Check if enough time has passed to try again"""
        if self.last_failure_time is None:
            return False
        return (datetime.now() - self.last_failure_time).seconds >= self.timeout

    def _on_success(self):
        """Reset on successful call"""
        self.failure_count = 0
        self.state = CircuitState.CLOSED
        print("[CIRCUIT BREAKER] State: CLOSED (Success)")

    def _on_failure(self):
        """Record failure"""
        self.failure_count += 1
        self.last_failure_time = datetime.now()

        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
            print(f"[CIRCUIT BREAKER] State: OPEN (Failed {self.failure_count} times)")
        else:
            print(f"[CIRCUIT BREAKER] Failure count: {self.failure_count}")

# Simulated service
class ExternalService:
    def __init__(self):
        self.call_count = 0
        self.should_fail = True

    def call_api(self):
        self.call_count += 1
        if self.should_fail:
            raise Exception("Service unavailable")
        return {"status": "success", "data": "some data"}

# Usage
service = ExternalService()
circuit_breaker = CircuitBreaker(failure_threshold=3, timeout=5)

# Simulate failures
for i in range(5):
    try:
        print(f"\nAttempt {i + 1}:")
        result = circuit_breaker.call(service.call_api)
        print(f"Success: {result}")
    except Exception as e:
        print(f"Failed: {e}")

    time.sleep(1)

# Service recovers
service.should_fail = False

# Wait for circuit breaker to attempt reset
print("\n--- Service recovered, waiting for circuit breaker timeout ---")
time.sleep(6)

# Try again - should succeed
try:
    print("\nRetry after timeout:")
    result = circuit_breaker.call(service.call_api)
    print(f"Success: {result}")
except Exception as e:
    print(f"Failed: {e}")
```

## Promise/Future Pattern

The Promise pattern represents a value that may not be available yet but will be resolved at some point in the future, enabling asynchronous programming.

### When to Use

- Asynchronous operations (I/O, network requests, etc.)
- Need to compose asynchronous operations
- Want to avoid callback hell

### Implementation

```javascript
// JavaScript native Promises
class DataService {
    async fetchUser(userId) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId > 0) {
                    resolve({
                        id: userId,
                        name: 'Alice',
                        email: 'alice@example.com'
                    });
                } else {
                    reject(new Error('Invalid user ID'));
                }
            }, 1000);
        });
    }

    async fetchUserPosts(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, title: 'Post 1', userId },
                    { id: 2, title: 'Post 2', userId }
                ]);
            }, 500);
        });
    }
}

// Chaining promises
const service = new DataService();

service.fetchUser(1)
    .then(user => {
        console.log('User:', user);
        return service.fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Using async/await (cleaner syntax)
async function getUserWithPosts(userId) {
    try {
        const user = await service.fetchUser(userId);
        console.log('User:', user);

        const posts = await service.fetchUserPosts(user.id);
        console.log('Posts:', posts);

        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
    }
}

getUserWithPosts(1);

// Parallel execution
async function fetchMultipleUsers(userIds) {
    const promises = userIds.map(id => service.fetchUser(id));
    const users = await Promise.all(promises);
    return users;
}

fetchMultipleUsers([1, 2, 3]).then(users => {
    console.log('All users:', users);
});
```

### Python Async/Await

```python
import asyncio

class AsyncDataService:
    async def fetch_user(self, user_id: int):
        """Simulate async API call"""
        await asyncio.sleep(1)  # Simulate delay
        if user_id > 0:
            return {
                'id': user_id,
                'name': 'Alice',
                'email': 'alice@example.com'
            }
        raise ValueError('Invalid user ID')

    async def fetch_user_posts(self, user_id: int):
        """Simulate async API call"""
        await asyncio.sleep(0.5)
        return [
            {'id': 1, 'title': 'Post 1', 'userId': user_id},
            {'id': 2, 'title': 'Post 2', 'userId': user_id}
        ]

# Using async/await
async def get_user_with_posts(user_id: int):
    service = AsyncDataService()

    try:
        user = await service.fetch_user(user_id)
        print(f"User: {user}")

        posts = await service.fetch_user_posts(user['id'])
        print(f"Posts: {posts}")

        return {'user': user, 'posts': posts}
    except Exception as e:
        print(f"Error: {e}")

# Parallel execution
async def fetch_multiple_users(user_ids: list):
    service = AsyncDataService()
    tasks = [service.fetch_user(uid) for uid in user_ids]
    users = await asyncio.gather(*tasks)
    return users

# Run async code
asyncio.run(get_user_with_posts(1))

users = asyncio.run(fetch_multiple_users([1, 2, 3]))
print(f"All users: {users}")
```

## Event Sourcing Pattern

Event Sourcing stores the state of an application as a sequence of events rather than just the current state. This provides a complete audit log and enables temporal queries.

### When to Use

- Need complete audit trail of all changes
- Want to replay events to rebuild state
- Require temporal queries (state at any point in time)
- Building event-driven systems

### Implementation in Python

```python
from datetime import datetime
from typing import List, Any
from enum import Enum

# Events
class EventType(Enum):
    ACCOUNT_CREATED = "account_created"
    MONEY_DEPOSITED = "money_deposited"
    MONEY_WITHDRAWN = "money_withdrawn"

class Event:
    def __init__(self, event_type: EventType, data: dict):
        self.event_type = event_type
        self.data = data
        self.timestamp = datetime.now()

    def __repr__(self):
        return f"Event({self.event_type.value}, {self.data}, {self.timestamp})"

# Event Store
class EventStore:
    def __init__(self):
        self.events: List[Event] = []

    def save(self, event: Event):
        """Append event to store (immutable)"""
        self.events.append(event)

    def get_events(self, entity_id: str = None) -> List[Event]:
        """Get all events or events for specific entity"""
        if entity_id:
            return [e for e in self.events if e.data.get('account_id') == entity_id]
        return self.events

# Aggregate (rebuilt from events)
class BankAccount:
    def __init__(self, account_id: str):
        self.account_id = account_id
        self.balance = 0
        self.is_active = False

    def apply_event(self, event: Event):
        """Apply event to rebuild state"""
        if event.event_type == EventType.ACCOUNT_CREATED:
            self.is_active = True
        elif event.event_type == EventType.MONEY_DEPOSITED:
            self.balance += event.data['amount']
        elif event.event_type == EventType.MONEY_WITHDRAWN:
            self.balance -= event.data['amount']

    @classmethod
    def from_events(cls, account_id: str, events: List[Event]):
        """Rebuild account state from events"""
        account = cls(account_id)
        for event in events:
            account.apply_event(event)
        return account

# Service
class BankingService:
    def __init__(self, event_store: EventStore):
        self.event_store = event_store

    def create_account(self, account_id: str):
        """Create new account"""
        event = Event(EventType.ACCOUNT_CREATED, {'account_id': account_id})
        self.event_store.save(event)
        return event

    def deposit(self, account_id: str, amount: float):
        """Deposit money"""
        event = Event(EventType.MONEY_DEPOSITED, {
            'account_id': account_id,
            'amount': amount
        })
        self.event_store.save(event)
        return event

    def withdraw(self, account_id: str, amount: float):
        """Withdraw money"""
        event = Event(EventType.MONEY_WITHDRAWN, {
            'account_id': account_id,
            'amount': amount
        })
        self.event_store.save(event)
        return event

    def get_account(self, account_id: str) -> BankAccount:
        """Rebuild account from events"""
        events = self.event_store.get_events(account_id)
        return BankAccount.from_events(account_id, events)

# Usage
event_store = EventStore()
service = BankingService(event_store)

# Perform operations
service.create_account("ACC001")
service.deposit("ACC001", 1000)
service.deposit("ACC001", 500)
service.withdraw("ACC001", 200)

# Rebuild current state from events
account = service.get_account("ACC001")
print(f"Account balance: ${account.balance}")  # $1300

# Audit trail
print("\nEvent history:")
for event in event_store.get_events("ACC001"):
    print(event)
```

## Summary

Modern patterns address contemporary challenges in software development. The Module pattern provides encapsulation in JavaScript, Middleware enables flexible request processing pipelines, Circuit Breaker prevents cascading failures in distributed systems, Promise/Future handles asynchronous operations elegantly, and Event Sourcing provides complete audit trails and temporal queries. These patterns are essential for building modern web applications, microservices, and cloud-native systems. Understanding and applying them enables developers to create robust, scalable, and maintainable applications that meet current industry standards.
