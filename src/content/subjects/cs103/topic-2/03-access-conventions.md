## Python's Access Control Conventions

Python doesn't enforce access control like Java or C++. Instead, it uses naming conventions that signal intent to other developers. Understanding these conventions is essential for writing idiomatic Python.

---

## The Three Levels

| Convention | Example | Meaning |
|------------|---------|---------|
| No prefix | `self.name` | Public — use freely |
| Single underscore | `self._name` | Protected — internal use suggested |
| Double underscore | `self.__name` | Private — name mangling applied |

---

## Public Attributes (No Prefix)

Attributes without any underscore prefix are public. They're part of your class's interface:

```python
class User:
    def __init__(self, username, email):
        self.username = username  # Public
        self.email = email        # Public

user = User("alice", "alice@example.com")
print(user.username)  # Intended use
user.email = "new@example.com"  # Intended use
```

**When to use:** For attributes that are genuinely part of your public API and safe to access/modify directly.

---

## Protected Attributes (Single Underscore)

A single underscore signals "internal use" — it's a hint, not a barrier:

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self._salary = salary  # Protected: internal

    def get_annual_salary(self):
        return self._salary * 12

emp = Employee("Alice", 5000)
print(emp.name)              # Public, intended
print(emp._salary)           # Works but discouraged
emp._salary = 9999           # Works but you're warned!
```

**The convention says:** "You can access this, but you probably shouldn't. It might change."

**When to use:**
- Implementation details that subclasses might need
- Internal helper methods
- Attributes that shouldn't be part of the public API

---

## Private Attributes (Double Underscore)

Double underscores trigger **name mangling** — Python changes the attribute name:

```python
class Secret:
    def __init__(self):
        self.__data = "confidential"  # Private

    def reveal(self):
        return self.__data

s = Secret()
print(s.reveal())      # Works: "confidential"
print(s.__data)        # AttributeError!
print(s._Secret__data) # Works but NEVER do this: "confidential"
```

Python transforms `__data` to `_Secret__data`. This prevents accidental access and name collisions in inheritance.

---

## Name Mangling in Inheritance

The main purpose of name mangling is preventing name collisions in subclasses:

```python
class Parent:
    def __init__(self):
        self.__value = "parent value"

    def get_value(self):
        return self.__value

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.__value = "child value"  # Different variable!

    def get_child_value(self):
        return self.__value

c = Child()
print(c.get_value())       # "parent value" (_Parent__value)
print(c.get_child_value()) # "child value" (_Child__value)
```

Without mangling, the child's `__value` would overwrite the parent's.

---

## When to Use Each Level

### Use Public When:
- The attribute is part of your intended API
- External code should read/write it freely
- You want maximum flexibility for users

### Use `_protected` When:
- The attribute is an implementation detail
- You might change it in future versions
- It's useful for subclasses but not external code
- You want to signal "proceed with caution"

### Use `__private` When:
- You need to prevent name collisions in inheritance
- The attribute should absolutely not be touched
- You're writing a library and want stronger protection

---

## Best Practices

### 1. Start Public, Protect as Needed
Don't over-protect. Most attributes can be public:

```python
# Probably fine as public
class Point:
    def __init__(self, x, y):
        self.x = x  # Public is OK
        self.y = y
```

### 2. Use `_protected` for Implementation Details
```python
class HTTPClient:
    def __init__(self):
        self._session = create_session()  # Implementation detail
        self._retry_count = 3

    def get(self, url):
        # Uses _session internally
        pass
```

### 3. Reserve `__private` for Framework Code
```python
class ORMBase:
    def __init__(self):
        self.__dirty_fields = set()  # Framework internal

    def __mark_dirty(self, field):
        self.__dirty_fields.add(field)
```

### 4. Document Your Intent
```python
class CacheManager:
    def __init__(self):
        # Internal cache structure, do not access directly
        self._cache = {}
        self._max_size = 1000

    # Public API
    def get(self, key):
        """Get item from cache."""
        return self._cache.get(key)
```

---

## Common Mistakes

### Overusing `__private`
```python
# OVERKILL: Everything is "private"
class OverProtected:
    def __init__(self):
        self.__x = 0
        self.__y = 0

    def __calculate(self):  # Can't even be overridden!
        pass
```

### Ignoring Conventions
```python
# BAD: Using _ for public attributes
class Confusing:
    def __init__(self):
        self._name = "Alice"  # Is this public or not?
        self.age_ = 25        # Trailing underscore is different!

    def _public_method(self):  # Misleading name
        pass
```

### Accessing Mangled Names
```python
# NEVER do this
obj._ClassName__private_attr = "hacked"
```

---

## The "Consenting Adults" Philosophy

Python's approach is deliberate:

> "We're all consenting adults here. If you want to shoot yourself in the foot, Python won't stop you—but it will raise an eyebrow with naming conventions."

The conventions work because:
1. IDEs highlight underscore attributes differently
2. Documentation tools skip `_` attributes by default
3. The Python community respects these conventions

---

## Key Takeaways

- Public (no prefix): Part of your API, use freely
- `_protected`: Implementation detail, access with caution
- `__private`: Name-mangled to prevent inheritance collisions
- Start public, add protection only when needed
- Python uses conventions, not enforcement—respect them
- Use `__private` sparingly, mainly for framework/library code
