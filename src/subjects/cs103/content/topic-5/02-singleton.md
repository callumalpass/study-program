---
id: cs103-t5-singleton
title: "Singleton Pattern"
order: 2
---

## Singleton: Pattern or Warning Sign?

**Problem:** You think you need exactly one instance of a class, accessible globally. Common examples people reach for are configuration managers, logging systems, and database connections.

**Classic solution:** Control instantiation so only one instance ever exists.

**Design warning:** In Python, Singleton is often a smell. It can hide dependencies, introduce global mutable state, and make tests affect each other. Learn how it works so you can recognize it, but prefer explicit dependency injection or module-level objects unless there is a strong reason to enforce one instance.

---

## Classic Singleton in Python

```python
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        print("Connecting to database...")
        self.connection = "Connected"

    def query(self, sql):
        return f"Executing: {sql}"

# Same instance every time
db1 = DatabaseConnection()  # Prints: Connecting to database...
db2 = DatabaseConnection()  # No print - reuses existing instance
print(db1 is db2)           # True
```

---

## How It Works

1. `__new__` creates instances (before `__init__`)
2. We override `__new__` to return the existing instance if it exists
3. `_initialized` flag prevents re-running initialization logic

---

## The Pythonic Alternative: Module

In Python, modules are natural singletons:

```python
# database.py
class _DatabaseConnection:
    def __init__(self):
        print("Connecting to database...")
        self.connection = "Connected"

    def query(self, sql):
        return f"Executing: {sql}"

# Create the single instance at module load
connection = _DatabaseConnection()

# ---------------------
# Other files:
from database import connection

result = connection.query("SELECT * FROM users")
```

**Advantages:**
- Simpler code
- Lazy initialization (only when imported)
- Python handles thread safety
- Clear intent

---

## Singleton with Thread Safety

For multi-threaded applications:

```python
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                # Double-check locking
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        with self._lock:
            if not self._initialized:
                # Expensive initialization
                self._initialized = True
```

---

## Singleton as a Decorator

Reusable singleton decorator:

```python
def singleton(cls):
    """Decorator that makes a class a singleton."""
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance

@singleton
class Logger:
    def __init__(self):
        self.logs = []

    def log(self, message):
        self.logs.append(message)

# Usage
logger1 = Logger()
logger2 = Logger()
print(logger1 is logger2)  # True
```

---

## The Borg Pattern (Shared State)

Alternative: All instances share state, but are different objects:

```python
class Borg:
    _shared_state = {}

    def __init__(self):
        self.__dict__ = self._shared_state

class Config(Borg):
    def __init__(self):
        super().__init__()
        if not hasattr(self, 'initialized'):
            self.debug = False
            self.log_level = "INFO"
            self.initialized = True

c1 = Config()
c2 = Config()

print(c1 is c2)        # False (different objects)
c1.debug = True
print(c2.debug)        # True (shared state!)
```

---

## When to Consider Singleton

**Possible use cases:**
- A true process-wide hardware resource
- A framework-managed registry where the lifecycle is already global
- A module-level object that is immutable after startup

**Avoid when:**
- You're just avoiding passing objects around
- Testing is important (singletons are hard to mock)
- You might need multiple instances later
- The object holds mutable user/session/request state

---

## Testing Challenges

Singletons make testing difficult:

```python
# Hard to test - global state persists
class PaymentProcessor:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Test 1 affects Test 2!
def test_process_payment():
    processor = PaymentProcessor()
    processor.test_mode = True
    # ...

def test_refund():
    processor = PaymentProcessor()
    # processor.test_mode is still True from previous test!
```

**Solution:** Dependency injection instead:

```python
class PaymentService:
    def __init__(self, processor):
        self.processor = processor

# In production
service = PaymentService(RealProcessor())

# In tests
service = PaymentService(MockProcessor())
```

---

## Real-World Example: Configuration

```python
# config.py
import json
import os

class _Config:
    def __init__(self):
        self._data = {}
        self._load_config()

    def _load_config(self):
        config_file = os.environ.get('CONFIG_FILE', 'config.json')
        if os.path.exists(config_file):
            with open(config_file) as f:
                self._data = json.load(f)

    def get(self, key, default=None):
        return self._data.get(key, default)

    def set(self, key, value):
        self._data[key] = value

# Module-level singleton
config = _Config()

# Usage anywhere in the app
from config import config

debug_mode = config.get('debug', False)
```

---

## Key Takeaways

- Singleton ensures exactly one instance of a class
- Python modules can provide a simpler single shared object
- Classic singleton uses `__new__` to control instantiation
- Thread-safe singleton requires locking
- Singletons make testing difficult—consider alternatives
- Prefer explicit dependencies for most application services
