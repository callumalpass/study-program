---
id: cs103-t4-protocols
title: "Protocols"
order: 6
---

## Protocols and Structural Typing

Python 3.8 introduced `Protocol` for typed duck typing. Protocols define what methods/attributes an object must have, without requiring inheritance. This brings type checking to duck typing.

---

## The Problem: Duck Typing Without Types

Duck typing is flexible but loses type information:

```python
def process(reader):
    return reader.read()  # What type is reader? What does read() return?

# Type checker doesn't know what reader needs
# Documentation is the only guide
```

---

## Protocols to the Rescue

Protocols define structural interfaces:

```python
from typing import Protocol

class Reader(Protocol):
    def read(self) -> str:
        ...  # Just the signature, no implementation

def process(reader: Reader) -> str:
    return reader.read()  # Type checker knows read() returns str

# Any class with read() -> str works!
class FileReader:
    def read(self) -> str:
        return "file contents"

class NetworkReader:
    def read(self) -> str:
        return "network data"

# Both satisfy Reader protocol - no inheritance needed!
process(FileReader())     # OK
process(NetworkReader())  # OK
```

---

## Protocols vs Abstract Base Classes

| Feature | Protocol | ABC |
|---------|----------|-----|
| Requires inheritance | No | Yes |
| Runtime checks (`isinstance`) | Optional | Yes |
| Type checker support | Yes | Yes |
| Can have implementations | Yes | Yes |
| Best for | Structural typing | Hierarchies |

```python
from abc import ABC, abstractmethod
from typing import Protocol

# ABC approach - requires inheritance
class DrawableABC(ABC):
    @abstractmethod
    def draw(self) -> None:
        pass

class CircleABC(DrawableABC):  # Must inherit
    def draw(self) -> None:
        print("Drawing circle")

# Protocol approach - no inheritance needed
class DrawableProtocol(Protocol):
    def draw(self) -> None:
        ...

class CircleProtocol:  # No inheritance!
    def draw(self) -> None:
        print("Drawing circle")

# Both work with their respective types
def render_abc(d: DrawableABC) -> None:
    d.draw()

def render_protocol(d: DrawableProtocol) -> None:
    d.draw()
```

---

## Defining Protocols

### Basic Protocol
```python
from typing import Protocol

class Closeable(Protocol):
    def close(self) -> None:
        ...
```

### Protocol with Properties
```python
class Named(Protocol):
    @property
    def name(self) -> str:
        ...
```

### Protocol with Multiple Methods
```python
class Database(Protocol):
    def connect(self) -> None:
        ...

    def query(self, sql: str) -> list:
        ...

    def close(self) -> None:
        ...
```

---

## Runtime Checking with `runtime_checkable`

By default, protocols only work with type checkers. Add `@runtime_checkable` for `isinstance()` support:

```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> None:
        ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class NotDrawable:
    pass

# Now isinstance() works!
c = Circle()
nd = NotDrawable()

print(isinstance(c, Drawable))   # True
print(isinstance(nd, Drawable))  # False
```

**Note:** `isinstance()` only checks method names, not signatures.

---

## Combining Protocols

Create complex interfaces by combining protocols:

```python
from typing import Protocol

class Readable(Protocol):
    def read(self) -> str:
        ...

class Writable(Protocol):
    def write(self, data: str) -> None:
        ...

class Closeable(Protocol):
    def close(self) -> None:
        ...

class ReadWriteCloseable(Readable, Writable, Closeable, Protocol):
    """Combination of all three protocols."""
    pass

def process_file(f: ReadWriteCloseable) -> None:
    data = f.read()
    f.write(data.upper())
    f.close()
```

---

## Protocols with Class Variables

```python
from typing import Protocol, ClassVar

class Configurable(Protocol):
    config: ClassVar[dict]  # Class variable

    def get_setting(self, key: str) -> str:
        ...

class MyService:
    config = {"debug": "true", "timeout": "30"}

    def get_setting(self, key: str) -> str:
        return self.config.get(key, "")

def read_config(service: Configurable) -> None:
    print(service.get_setting("debug"))
```

---

## Practical Example: Repository Pattern

```python
from typing import Protocol, TypeVar, Generic, Optional

T = TypeVar('T')

class Repository(Protocol[T]):
    def get(self, id: int) -> Optional[T]:
        ...

    def save(self, item: T) -> None:
        ...

    def delete(self, id: int) -> None:
        ...

    def list_all(self) -> list[T]:
        ...

# Concrete implementation - no inheritance needed!
class User:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

class InMemoryUserRepository:
    def __init__(self):
        self._users: dict[int, User] = {}

    def get(self, id: int) -> Optional[User]:
        return self._users.get(id)

    def save(self, user: User) -> None:
        self._users[user.id] = user

    def delete(self, id: int) -> None:
        self._users.pop(id, None)

    def list_all(self) -> list[User]:
        return list(self._users.values())

# Works with the Repository protocol!
def process_users(repo: Repository[User]) -> None:
    for user in repo.list_all():
        print(user.name)

repo = InMemoryUserRepository()
repo.save(User(1, "Alice"))
process_users(repo)
```

---

## When to Use Protocols

**Use Protocols when:**
- You want type checking with duck typing
- You don't want to force inheritance
- You're defining interfaces for third-party code
- You want flexibility with safety

**Use ABCs when:**
- You need `isinstance()` checks reliably
- You have shared implementation in the base
- You want to enforce inheritance hierarchies
- You need to register virtual subclasses

---

## Key Takeaways

- Protocols enable typed duck typing
- No inheritance required—just matching methods
- Use `@runtime_checkable` for `isinstance()` support
- Protocols can be combined and made generic
- Choose Protocols for flexibility, ABCs for hierarchies
