---
id: cs103-t6-abc-vs-protocol
title: "ABCs vs Protocols"
order: 7
---

## When to Use ABCs vs Protocols

Both ABCs and Protocols define interfaces, but they serve different purposes. Understanding when to use each helps you design better code.

---

## Quick Decision Guide

| Use Case | Choose |
|----------|--------|
| Need shared implementation | ABC |
| Working with third-party code | Protocol |
| Runtime `isinstance()` checks critical | ABC |
| Maximum flexibility needed | Protocol |
| Defining class hierarchies | ABC |
| Defining function signatures | Protocol |
| Type hints without enforcement | Protocol |
| Enforced implementation at instantiation | ABC |

---

## Use ABCs When...

### 1. You Have Shared Implementation

```python
from abc import ABC, abstractmethod

class DataExporter(ABC):
    """ABC with shared implementation."""

    def export(self, data, filename):
        """Template method with shared logic."""
        validated = self.validate(data)
        formatted = self.format(validated)
        self._write_file(filename, formatted)

    def validate(self, data):
        """Shared validation logic."""
        if not data:
            raise ValueError("Data cannot be empty")
        return data

    def _write_file(self, filename, content):
        """Shared file writing."""
        with open(filename, 'w') as f:
            f.write(content)

    @abstractmethod
    def format(self, data):
        """Subclasses provide formatting."""
        pass

class JSONExporter(DataExporter):
    def format(self, data):
        import json
        return json.dumps(data)

class CSVExporter(DataExporter):
    def format(self, data):
        return '\n'.join(','.join(row) for row in data)
```

**Protocol can't do this** because protocols don't provide implementation.

### 2. You Need Runtime Type Checking

```python
from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self): pass

class CommandProcessor:
    def __init__(self):
        self.commands = []

    def add(self, cmd):
        # Runtime check - always works with ABCs
        if not isinstance(cmd, Command):
            raise TypeError("Expected Command instance")
        self.commands.append(cmd)
```

### 3. You Want Instantiation Enforcement

```python
from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def activate(self): pass

    @abstractmethod
    def deactivate(self): pass

class IncompletePlugin(Plugin):
    def activate(self):
        pass
    # Missing deactivate!

plugin = IncompletePlugin()  # TypeError immediately!
```

---

## Use Protocols When...

### 1. Working With Third-Party Code

```python
from typing import Protocol

class JSONSerializable(Protocol):
    def to_json(self) -> str: ...

# Works with any class that has to_json()
# Even third-party classes you can't modify!

class ThirdPartyClass:
    def to_json(self) -> str:
        return "{}"

def serialize(obj: JSONSerializable) -> str:
    return obj.to_json()

serialize(ThirdPartyClass())  # Works!
```

### 2. Maximum Flexibility

```python
from typing import Protocol

class Comparable(Protocol):
    def __lt__(self, other) -> bool: ...

def sort_items(items: list[Comparable]) -> list[Comparable]:
    return sorted(items)

# Works with ANY class that has __lt__
# int, str, datetime, custom classes...
sort_items([3, 1, 2])           # OK
sort_items(["c", "a", "b"])     # OK
sort_items([datetime.now()])    # OK
```

### 3. Defining Function Signatures

```python
from typing import Protocol

class EventHandler(Protocol):
    def __call__(self, event: str, data: dict) -> None: ...

class EventBus:
    def __init__(self):
        self.handlers: list[EventHandler] = []

    def subscribe(self, handler: EventHandler) -> None:
        self.handlers.append(handler)

# Functions work
def my_handler(event: str, data: dict) -> None:
    print(f"Event: {event}")

bus = EventBus()
bus.subscribe(my_handler)  # Function matches protocol

# Callable classes work too
class LoggingHandler:
    def __call__(self, event: str, data: dict) -> None:
        print(f"[LOG] {event}: {data}")

bus.subscribe(LoggingHandler())  # Also matches
```

### 4. Gradual Typing

```python
from typing import Protocol

class Repository(Protocol):
    def find(self, id: int) -> dict | None: ...
    def save(self, data: dict) -> int: ...

# Can add type hints to existing code without changing it
class ExistingRepo:
    def find(self, id: int) -> dict | None:
        return {"id": id}

    def save(self, data: dict) -> int:
        return 1

def process(repo: Repository) -> None:
    # Type checker knows repo has find() and save()
    item = repo.find(1)
    repo.save({"name": "test"})

process(ExistingRepo())  # Works without inheritance
```

---

## Combining Both

Sometimes you want both approaches:

```python
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable

# ABC for internal hierarchy with shared code
class BaseValidator(ABC):
    def validate(self, data):
        errors = self._check_required(data)
        errors.extend(self._custom_validation(data))
        return errors

    def _check_required(self, data):
        # Shared logic
        return []

    @abstractmethod
    def _custom_validation(self, data):
        pass

# Protocol for external integration
@runtime_checkable
class Validator(Protocol):
    def validate(self, data) -> list[str]: ...

# Your validators inherit from ABC
class EmailValidator(BaseValidator):
    def _custom_validation(self, data):
        if '@' not in data.get('email', ''):
            return ['Invalid email']
        return []

# Third-party validators just need validate()
class ThirdPartyValidator:
    def validate(self, data) -> list[str]:
        return []

# Function accepts anything with validate()
def run_validators(validators: list[Validator], data: dict) -> list[str]:
    errors = []
    for v in validators:
        errors.extend(v.validate(data))
    return errors

# Mix your validators with third-party ones
run_validators([
    EmailValidator(),
    ThirdPartyValidator()
], {"email": "test"})
```

---

## Summary Decision Tree

```
Do you need shared implementation?
├── Yes → Use ABC
└── No
    └── Do you control all implementations?
        ├── Yes → Either works, prefer Protocol for flexibility
        └── No (third-party code)
            └── Use Protocol

Do you need runtime isinstance() checks?
├── Critical → Use ABC
└── Nice to have → Protocol with @runtime_checkable
└── Not needed → Protocol
```

---

## Key Takeaways

- ABCs: shared implementation, runtime checks, instantiation enforcement
- Protocols: flexibility, third-party code, gradual typing
- ABCs define "what it is" (nominal typing)
- Protocols define "what it can do" (structural typing)
- Can combine both in the same codebase
- Default to Protocol unless you need ABC's features
