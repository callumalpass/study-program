## Common Mistakes and Best Practices

Encapsulation is powerful, but misuse leads to over-engineering, confusing APIs, and hidden bugs. Learn the pitfalls and how to avoid them.

---

## Mistake 1: Unnecessary Properties

Don't create properties that add no value:

```python
# UNNECESSARY - just use a plain attribute
class Point:
    def __init__(self, x, y):
        self._x = x

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, value):
        self._x = value  # No validation, no logic - pointless!

# BETTER - use plain attributes when they suffice
class Point:
    def __init__(self, x, y):
        self.x = x  # Simple and clear
        self.y = y
```

**Rule:** Only use properties when you need validation, computation, or logging.

---

## Mistake 2: Expensive Property Operations

Properties should feel like attribute access—instant. Don't hide expensive operations:

```python
# BAD - network call hidden in property
class UserProfile:
    @property
    def friends(self):
        return fetch_friends_from_api()  # Slow network call!

# User expects this to be fast
if user.friends:  # Surprise! This takes 2 seconds
    pass

# BETTER - make it explicit with a method
class UserProfile:
    def fetch_friends(self):
        """Fetch friends from API. May be slow."""
        return fetch_friends_from_api()
```

---

## Mistake 3: Properties with Side Effects

Properties shouldn't do unexpected things:

```python
# BAD - reading property has side effects
class Counter:
    def __init__(self):
        self._count = 0

    @property
    def count(self):
        self._count += 1  # Side effect! Count changes on read!
        return self._count

c = Counter()
print(c.count)  # 1
print(c.count)  # 2 - Surprise!

# BETTER - use a method for stateful operations
class Counter:
    def __init__(self):
        self._count = 0

    def increment(self):
        self._count += 1
        return self._count
```

---

## Mistake 4: Inconsistent Internal Access

Don't mix direct access and property access internally:

```python
# BAD - bypasses setter validation
class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = value

    def withdraw(self, amount):
        self._balance -= amount  # WRONG: bypasses validation!
        # Could make balance negative

# BETTER - always use the property
def withdraw(self, amount):
    self.balance = self.balance - amount  # Uses setter validation
```

---

## Mistake 5: Exposing Internal Collections

Returning mutable internal state:

```python
# BAD - internal list exposed
class TodoList:
    def __init__(self):
        self._items = []

    def get_items(self):
        return self._items  # Returns actual list!

todo = TodoList()
items = todo.get_items()
items.append("Hacked!")  # Modifies internal state!

# BETTER - return a copy
def get_items(self):
    return list(self._items)  # Returns a copy

# OR use a property with defensive copy
@property
def items(self):
    return tuple(self._items)  # Immutable copy
```

---

## Mistake 6: Over-Engineering

Don't apply encapsulation patterns where they're not needed:

```python
# OVER-ENGINEERED for a simple use case
class Config:
    def __init__(self):
        self._settings = {}

    def get_setting(self, key):
        return self._settings.get(key)

    def set_setting(self, key, value):
        self._settings[key] = value

# Simple dict would be fine
config = {
    'debug': True,
    'log_level': 'INFO'
}
```

---

## Best Practice 1: Start Public, Protect Later

Begin with simple public attributes. Add properties when you need them:

```python
# Version 1: Simple public attribute
class User:
    def __init__(self, email):
        self.email = email

# Version 2: Need validation? Add property - existing code still works!
class User:
    def __init__(self, email):
        self._email = None
        self.email = email  # Uses property setter

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if '@' not in value:
            raise ValueError("Invalid email")
        self._email = value.lower()
```

---

## Best Practice 2: Consistent Access Patterns

Use the same interface internally and externally:

```python
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius  # Use property, not _celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero")
        self._celsius = value

    def warm_up(self, degrees):
        self.celsius += degrees  # Consistent use of property
```

---

## Best Practice 3: Document Protected Members

Signal intent clearly:

```python
class HTTPClient:
    """HTTP client for making requests.

    Public API:
        - get(url): Make GET request
        - post(url, data): Make POST request

    Internal (protected):
        - _session: Underlying session object
        - _retry_count: Number of retries on failure
    """

    def __init__(self):
        self._session = create_session()  # Internal
        self._retry_count = 3             # Internal

    def get(self, url):
        """Make a GET request to the URL."""
        pass
```

---

## Best Practice 4: Use Properties for Computed Values

Properties are perfect for derived/computed attributes:

```python
class Order:
    def __init__(self, items, tax_rate=0.1):
        self.items = items
        self.tax_rate = tax_rate

    @property
    def subtotal(self):
        return sum(item.price for item in self.items)

    @property
    def tax(self):
        return self.subtotal * self.tax_rate

    @property
    def total(self):
        return self.subtotal + self.tax
```

---

## Best Practice 5: Single Underscore for Most Cases

Reserve double underscore for frameworks and library code:

```python
# Good: single underscore for internal state
class MyClass:
    def __init__(self):
        self._data = []        # Internal, but accessible
        self._cache = {}       # Internal, but accessible

# Reserve double underscore for inheritance protection
class FrameworkBase:
    def __init__(self):
        self.__hooks = []  # Must not collide with subclass attributes
```

---

## Summary Checklist

When implementing encapsulation:

- [ ] Properties have a purpose (validation, computation, logging)
- [ ] Property operations are fast
- [ ] No hidden side effects in getters
- [ ] Internal code uses properties consistently
- [ ] Mutable collections are copied before returning
- [ ] Single underscore for most protected attributes
- [ ] Documentation explains what's public vs internal

---

## Key Takeaways

- Don't create trivial properties with no logic
- Properties should be fast and side-effect free
- Use properties consistently, even internally
- Protect mutable internal state with defensive copies
- Start simple, add encapsulation when needed
- Document the intended public interface
