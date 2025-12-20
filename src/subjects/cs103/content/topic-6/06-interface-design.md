## Interface Design Principles

Good interfaces are the foundation of maintainable code. They define how components interact and determine how easy your code is to use, test, and change.

---

## Principle 1: Keep Interfaces Small

Small interfaces are easier to implement and understand:

```python
# BAD: Giant interface
class UserManager(ABC):
    @abstractmethod
    def create_user(self, data): pass
    @abstractmethod
    def update_user(self, id, data): pass
    @abstractmethod
    def delete_user(self, id): pass
    @abstractmethod
    def find_user(self, id): pass
    @abstractmethod
    def list_users(self): pass
    @abstractmethod
    def authenticate(self, username, password): pass
    @abstractmethod
    def change_password(self, id, password): pass
    @abstractmethod
    def reset_password(self, email): pass
    @abstractmethod
    def verify_email(self, token): pass
    @abstractmethod
    def send_notification(self, id, message): pass
    # Every implementation must handle all 10 methods!

# GOOD: Focused interfaces
class UserRepository(Protocol):
    def create(self, data: dict) -> User: ...
    def find(self, id: int) -> User | None: ...
    def update(self, id: int, data: dict) -> User: ...
    def delete(self, id: int) -> None: ...

class Authenticator(Protocol):
    def authenticate(self, username: str, password: str) -> User | None: ...

class PasswordManager(Protocol):
    def change_password(self, user_id: int, password: str) -> None: ...
    def reset_password(self, email: str) -> None: ...

class Notifier(Protocol):
    def send(self, user_id: int, message: str) -> None: ...
```

---

## Principle 2: Interface Segregation

Clients shouldn't depend on methods they don't use:

```python
# BAD: Printer interface forces scanner implementation
class MultiFunctionDevice(ABC):
    @abstractmethod
    def print(self, document): pass
    @abstractmethod
    def scan(self): pass
    @abstractmethod
    def fax(self, document, number): pass

class SimplePrinter(MultiFunctionDevice):
    def print(self, document):
        # Can print
        pass
    def scan(self):
        raise NotImplementedError("Can't scan!")  # Forced to implement
    def fax(self, document, number):
        raise NotImplementedError("Can't fax!")   # Forced to implement

# GOOD: Separate interfaces
class Printer(Protocol):
    def print(self, document) -> None: ...

class Scanner(Protocol):
    def scan(self) -> bytes: ...

class Fax(Protocol):
    def fax(self, document, number: str) -> None: ...

class SimplePrinter:
    def print(self, document) -> None:
        # Just print, nothing else required
        pass

class AllInOne:
    def print(self, document) -> None: ...
    def scan(self) -> bytes: ...
    def fax(self, document, number: str) -> None: ...
```

---

## Principle 3: Depend on Abstractions

High-level modules shouldn't depend on low-level modules:

```python
# BAD: Direct dependency on concrete class
class OrderService:
    def __init__(self):
        self.db = PostgresDatabase()  # Concrete dependency
        self.email = SMTPEmailSender()  # Concrete dependency

# GOOD: Depend on abstractions
class Database(Protocol):
    def save(self, data: dict) -> int: ...
    def find(self, id: int) -> dict | None: ...

class EmailSender(Protocol):
    def send(self, to: str, subject: str, body: str) -> None: ...

class OrderService:
    def __init__(self, db: Database, email: EmailSender):
        self.db = db
        self.email = email

# Can use any implementation
service = OrderService(
    PostgresDatabase(),
    SMTPEmailSender()
)

# Or for testing
service = OrderService(
    MockDatabase(),
    MockEmailSender()
)
```

---

## Principle 4: Design for Extension

Make interfaces easy to extend without breaking existing code:

```python
# Good: Optional method with default
class Logger(Protocol):
    def log(self, message: str) -> None: ...

# Implementations can add more without breaking callers
class FileLogger:
    def log(self, message: str) -> None:
        with open(self.path, 'a') as f:
            f.write(message + '\n')

    def log_with_level(self, level: str, message: str) -> None:
        self.log(f"[{level}] {message}")

# Good: Use kwargs for forward compatibility
class Formatter(Protocol):
    def format(self, data: dict, **kwargs) -> str: ...

# Future implementations can use new kwargs
class JSONFormatter:
    def format(self, data: dict, **kwargs) -> str:
        indent = kwargs.get('indent', 2)
        import json
        return json.dumps(data, indent=indent)
```

---

## Principle 5: Be Explicit About Contracts

Document what your interface expects and guarantees:

```python
class Cache(Protocol):
    """
    Interface for caching implementations.

    Thread Safety: Implementations MUST be thread-safe.
    Null Handling: None values are valid and distinct from missing keys.

    Performance Expectations:
    - get(): O(1) expected
    - set(): O(1) expected
    - delete(): O(1) expected
    """

    def get(self, key: str) -> Any | None:
        """
        Get value by key.

        Returns:
            The cached value, or None if key not found.
            Note: None could also be a cached value.

        Raises:
            Nothing - missing keys return None
        """
        ...

    def set(self, key: str, value: Any, ttl: int | None = None) -> None:
        """
        Set a value in the cache.

        Args:
            key: Cache key
            value: Value to cache (can be None)
            ttl: Time-to-live in seconds, or None for no expiration

        Raises:
            Nothing - always succeeds
        """
        ...

    def delete(self, key: str) -> bool:
        """
        Delete a key from the cache.

        Returns:
            True if key existed and was deleted, False if key didn't exist
        """
        ...
```

---

## Principle 6: Avoid Leaky Abstractions

Don't expose implementation details:

```python
# BAD: Leaks SQL implementation
class UserRepository(ABC):
    @abstractmethod
    def execute_query(self, sql: str): pass  # Exposes SQL!

    @abstractmethod
    def get_connection(self): pass  # Exposes connection!

# GOOD: Hides implementation
class UserRepository(Protocol):
    def find_by_id(self, id: int) -> User | None: ...
    def find_by_email(self, email: str) -> User | None: ...
    def save(self, user: User) -> None: ...
    def delete(self, id: int) -> None: ...
    # No SQL, no connections - could be SQL, MongoDB, or in-memory
```

---

## Principle 7: Use Method Names That Describe Intent

```python
# BAD: Generic, unclear names
class DataHandler(Protocol):
    def process(self, data): ...  # Process how?
    def handle(self, item): ...   # Handle how?
    def do_thing(self, x): ...    # What thing?

# GOOD: Intent is clear
class OrderProcessor(Protocol):
    def validate_order(self, order: Order) -> list[str]: ...
    def calculate_total(self, order: Order) -> Decimal: ...
    def submit_order(self, order: Order) -> str: ...  # Returns order ID
```

---

## Common Interface Smells

1. **Too many methods:** Split into focused interfaces
2. **Unused methods:** Remove or move to separate interface
3. **Implementation leakage:** Hide concrete details
4. **Inconsistent naming:** Use consistent verb patterns
5. **Missing documentation:** Document contracts clearly

---

## Key Takeaways

- Small, focused interfaces are better than large ones
- Depend on abstractions, not concrete implementations
- Don't force clients to depend on methods they don't use
- Design interfaces for extension
- Document contracts explicitly
- Hide implementation details behind clean interfaces
