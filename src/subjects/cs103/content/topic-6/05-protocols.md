## Protocols: Structural Typing

Protocols (introduced in Python 3.8) enable typed duck typing. They define what methods an object must have without requiring inheritance—if an object has the right methods, it satisfies the protocol.

---

## ABCs vs Protocols

| Feature | ABCs | Protocols |
|---------|------|-----------|
| Inheritance required | Yes | No |
| Runtime `isinstance()` | Yes | Optional |
| Type checker support | Yes | Yes |
| Enforcement | At instantiation | At type check |
| Philosophy | Nominal typing | Structural typing |

```python
from abc import ABC, abstractmethod
from typing import Protocol

# ABC - requires inheritance
class DrawableABC(ABC):
    @abstractmethod
    def draw(self) -> None: pass

class CircleABC(DrawableABC):  # Must inherit
    def draw(self) -> None:
        print("Circle")

# Protocol - no inheritance needed
class DrawableProtocol(Protocol):
    def draw(self) -> None: ...

class CircleProtocol:  # No inheritance!
    def draw(self) -> None:
        print("Circle")

# Both work with their type annotations
def render_abc(obj: DrawableABC) -> None:
    obj.draw()

def render_protocol(obj: DrawableProtocol) -> None:
    obj.draw()
```

---

## Defining Protocols

```python
from typing import Protocol

class Reader(Protocol):
    """Protocol for readable objects."""

    def read(self) -> str:
        """Read and return content."""
        ...  # Ellipsis indicates abstract

class Writer(Protocol):
    """Protocol for writable objects."""

    def write(self, data: str) -> None:
        """Write data."""
        ...

class Closeable(Protocol):
    """Protocol for closeable objects."""

    def close(self) -> None:
        """Close the resource."""
        ...
```

---

## Using Protocols in Type Hints

```python
from typing import Protocol

class Logger(Protocol):
    def log(self, message: str) -> None: ...

# Any class with log(str) -> None works
class ConsoleLogger:
    def log(self, message: str) -> None:
        print(f"[LOG] {message}")

class FileLogger:
    def __init__(self, path: str):
        self.path = path

    def log(self, message: str) -> None:
        with open(self.path, 'a') as f:
            f.write(message + '\n')

# Function accepts anything matching Logger protocol
def process_with_logging(data: str, logger: Logger) -> str:
    logger.log(f"Processing: {data}")
    result = data.upper()
    logger.log(f"Result: {result}")
    return result

# Both work!
process_with_logging("hello", ConsoleLogger())
process_with_logging("hello", FileLogger("app.log"))
```

---

## Runtime Checking with `@runtime_checkable`

By default, protocols work only with type checkers. Add `@runtime_checkable` for `isinstance()`:

```python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Iterable(Protocol):
    def __iter__(self):
        ...

class MyCollection:
    def __iter__(self):
        return iter([1, 2, 3])

class NotIterable:
    pass

# Now isinstance() works
print(isinstance(MyCollection(), Iterable))   # True
print(isinstance(NotIterable(), Iterable))    # False
print(isinstance([1, 2, 3], Iterable))        # True
```

**Note:** `isinstance()` only checks method *existence*, not signatures.

---

## Protocols with Properties

```python
from typing import Protocol

class Named(Protocol):
    @property
    def name(self) -> str:
        ...

class Aged(Protocol):
    @property
    def age(self) -> int:
        ...

class Person:
    def __init__(self, name: str, age: int):
        self._name = name
        self._age = age

    @property
    def name(self) -> str:
        return self._name

    @property
    def age(self) -> int:
        return self._age

def greet(obj: Named) -> str:
    return f"Hello, {obj.name}!"

def is_adult(obj: Aged) -> bool:
    return obj.age >= 18

person = Person("Alice", 25)
print(greet(person))      # Hello, Alice!
print(is_adult(person))   # True
```

---

## Combining Protocols

```python
from typing import Protocol

class Readable(Protocol):
    def read(self) -> str: ...

class Writable(Protocol):
    def write(self, data: str) -> None: ...

class Closeable(Protocol):
    def close(self) -> None: ...

# Combine protocols
class ReadWriteClose(Readable, Writable, Closeable, Protocol):
    """Protocol combining read, write, and close capabilities."""
    pass

def process_file(f: ReadWriteClose) -> None:
    data = f.read()
    f.write(data.upper())
    f.close()
```

---

## Generic Protocols

Protocols can be generic:

```python
from typing import Protocol, TypeVar

T = TypeVar('T')

class Repository(Protocol[T]):
    def get(self, id: int) -> T | None: ...
    def save(self, item: T) -> None: ...
    def delete(self, id: int) -> None: ...

class User:
    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

class InMemoryUserRepo:
    def __init__(self):
        self._users: dict[int, User] = {}

    def get(self, id: int) -> User | None:
        return self._users.get(id)

    def save(self, user: User) -> None:
        self._users[user.id] = user

    def delete(self, id: int) -> None:
        self._users.pop(id, None)

def get_user(repo: Repository[User], user_id: int) -> User | None:
    return repo.get(user_id)

repo = InMemoryUserRepo()
repo.save(User(1, "Alice"))
user = get_user(repo, 1)  # Type checker knows it's User | None
```

---

## Callback Protocols

Define function signatures:

```python
from typing import Protocol

class Callback(Protocol):
    def __call__(self, event: str, data: dict) -> None:
        ...

def register_handler(callback: Callback) -> None:
    # ...
    pass

# Functions and lambdas work if signature matches
def my_handler(event: str, data: dict) -> None:
    print(f"Event: {event}, Data: {data}")

register_handler(my_handler)  # OK

# Callable objects work too
class MyHandler:
    def __call__(self, event: str, data: dict) -> None:
        print(f"Handling: {event}")

register_handler(MyHandler())  # OK
```

---

## When to Use Protocols

**Prefer Protocols when:**
- You want structural typing (duck typing with types)
- Working with third-party code you can't modify
- Maximum flexibility is important
- You're defining interfaces for functions, not class hierarchies

**Prefer ABCs when:**
- You need shared implementation in the base
- Runtime `isinstance()` checks are critical
- You want to enforce inheritance relationships

---

## Key Takeaways

- Protocols enable typed duck typing—no inheritance required
- Use `@runtime_checkable` for `isinstance()` support
- Protocols can have properties, be generic, and be combined
- Type checkers verify protocol compliance
- Protocols offer more flexibility than ABCs
- Use Protocols for interfaces, ABCs for hierarchies with shared code
