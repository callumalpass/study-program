## Introduction to Abstraction

As programs grow, classes often need to work together without knowing the exact concrete types involved. **Abstraction** helps you design around *what something can do* (its interface/contract) rather than *what it is* (its concrete class).

---

## What Is Abstraction?

Abstraction means hiding complex implementation details behind simple interfaces. Users of a class don't need to know *how* it works, just *what* it does.

```python
# User just knows: call send() to send email
email_service.send(to, subject, body)

# They don't need to know:
# - SMTP connection details
# - Authentication mechanisms
# - Retry logic
# - Encoding issues
```

---

## Why Abstraction Matters

### 1. Reduced Coupling
Code depends on abstractions, not implementations:

```python
# Tightly coupled - depends on specific class
class OrderProcessor:
    def __init__(self):
        self.db = PostgresDatabase()  # Hardcoded!

# Loosely coupled - depends on abstraction
class OrderProcessor:
    def __init__(self, database):  # Any database works
        self.db = database
```

### 2. Easier Testing
Abstractions can be replaced with test doubles:

```python
# Production
processor = OrderProcessor(RealDatabase())

# Testing
processor = OrderProcessor(MockDatabase())
```

### 3. Flexibility
Change implementations without changing callers:

```python
# Today: Use PostgreSQL
database = PostgresDatabase()

# Tomorrow: Switch to MongoDB (same interface)
database = MongoDatabase()

# No other code changes needed!
```

### 4. Parallel Development
Teams can work on different implementations simultaneously:

```python
# Team A defines the interface
class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount): pass

# Team B implements Stripe
class StripeGateway(PaymentGateway): ...

# Team C implements PayPal
class PayPalGateway(PaymentGateway): ...
```

---

## Abstraction in Python

Python offers several ways to express abstractions:

### 1. Abstract Base Classes (ABCs)
Formal interface definition with enforcement:
```python
from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, data): pass

    @abstractmethod
    def load(self, key): pass
```

### 2. Protocols (Structural Typing)
Duck typing with type hints:
```python
from typing import Protocol

class Readable(Protocol):
    def read(self) -> str: ...
```

### 3. Duck Typing
Implicit interfaces based on methods:
```python
def process(obj):
    return obj.read()  # Works with anything that has read()
```

### 4. Documentation
Describe expected interface in docstrings:
```python
def save_data(storage):
    """
    Save data to storage.

    Args:
        storage: Any object with save(data) and load(key) methods
    """
```

---

## Interface vs Implementation

The key distinction in abstraction:

| Interface | Implementation |
|-----------|----------------|
| What it does | How it does it |
| Public contract | Private details |
| Stable | Can change freely |
| Used by clients | Hidden from clients |

```python
class EmailSender:
    # INTERFACE (public):
    def send(self, to, subject, body):
        """Send an email. That's all callers need to know."""
        self._validate(to)
        self._connect()
        self._transmit(to, subject, body)
        self._disconnect()

    # IMPLEMENTATION (private):
    def _validate(self, to): ...
    def _connect(self): ...
    def _transmit(self, to, subject, body): ...
    def _disconnect(self): ...
```

---

## The Abstraction Principle

> "Program to an interface, not an implementation."
> — Gang of Four

This means:
- Depend on abstract types, not concrete classes
- Let implementations vary behind stable interfaces
- Focus on what objects *do*, not what they *are*

---

## What You'll Learn

In this topic, you'll master:

1. **Abstract Base Classes:** Defining required interfaces
2. **The Template Method Pattern:** Sharing algorithm structure
3. **Protocols:** Typed duck typing
4. **Interface Design:** Creating good abstractions
5. **When to use ABCs vs Protocols**
6. **Balancing abstraction and simplicity**

---

## Key Takeaways

- Abstraction hides complexity behind simple interfaces
- It reduces coupling and improves testability
- Python offers ABCs, Protocols, and duck typing for abstraction
- Design around what objects do, not what they are
- Good abstractions are small, stable, and focused
