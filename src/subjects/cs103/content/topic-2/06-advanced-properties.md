---
id: cs103-t2-advanced
title: "Advanced Properties"
order: 6
---

## Advanced Property Patterns

Beyond basic getters and setters, properties enable powerful patterns: lazy initialization, caching, defensive copying, and more.

---

## Lazy Initialization

Compute expensive values only when first accessed:

```python
class DataAnalyzer:
    def __init__(self, data):
        self._data = data
        self._statistics = None  # Not computed yet

    @property
    def statistics(self):
        if self._statistics is None:
            print("Computing statistics (expensive)...")
            self._statistics = {
                'mean': sum(self._data) / len(self._data),
                'max': max(self._data),
                'min': min(self._data),
                'count': len(self._data)
            }
        return self._statistics

analyzer = DataAnalyzer([1, 2, 3, 4, 5, 100])
# Statistics not computed yet

print(analyzer.statistics['mean'])  # Computing statistics (expensive)...
# Output: 19.166...

print(analyzer.statistics['max'])   # No recomputation - cached
# Output: 100
```

---

## Cached Property (Python 3.8+)

For simpler caching, use `@functools.cached_property`:

```python
from functools import cached_property

class ExpensiveCalculation:
    def __init__(self, data):
        self.data = data

    @cached_property
    def result(self):
        print("Computing (only happens once)...")
        return sum(x ** 2 for x in self.data)

calc = ExpensiveCalculation(range(1000))
print(calc.result)  # Computing (only happens once)...
print(calc.result)  # Returns cached value, no recomputation
```

**Note:** `cached_property` doesn't support setters. The value is computed once and stored.

---

## Defensive Copying

Protect internal mutable state by returning copies:

```python
class Gradebook:
    def __init__(self):
        self._grades = {}

    def add_grade(self, student, grade):
        if student not in self._grades:
            self._grades[student] = []
        self._grades[student].append(grade)

    @property
    def grades(self):
        # Return a deep copy to prevent external modification
        return {k: list(v) for k, v in self._grades.items()}

    def get_student_grades(self, student):
        # Return a copy of the list
        return list(self._grades.get(student, []))

gradebook = Gradebook()
gradebook.add_grade("Alice", 95)
gradebook.add_grade("Alice", 88)

# External code can't modify internal state
external = gradebook.grades
external["Alice"].append(999)  # Modifies the copy
print(gradebook.get_student_grades("Alice"))  # [95, 88] - unchanged
```

---

## Delete Properties

Control what happens when an attribute is deleted:

```python
class Connection:
    def __init__(self, host):
        self._host = host
        self._socket = None

    @property
    def host(self):
        return self._host

    @host.setter
    def host(self, value):
        if self._socket:
            raise RuntimeError("Cannot change host while connected")
        self._host = value

    @host.deleter
    def host(self):
        if self._socket:
            self._socket.close()
            self._socket = None
        self._host = None

conn = Connection("example.com")
del conn.host  # Triggers cleanup logic
```

---

## Property Factories

Create similar properties dynamically:

```python
def validated_property(name, validator):
    """Factory for creating validated properties."""
    storage_name = f'_{name}'

    @property
    def prop(self):
        return getattr(self, storage_name, None)

    @prop.setter
    def prop(self, value):
        validator(value)
        setattr(self, storage_name, value)

    return prop

def positive_number(value):
    if not isinstance(value, (int, float)) or value <= 0:
        raise ValueError("Must be a positive number")

def non_empty_string(value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError("Must be a non-empty string")

class Product:
    name = validated_property('name', non_empty_string)
    price = validated_property('price', positive_number)
    quantity = validated_property('quantity', positive_number)

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
```

---

## Dependent Property Invalidation

Invalidate cached values when dependencies change:

```python
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height
        self._area_cache = None

    @property
    def width(self):
        return self._width

    @width.setter
    def width(self, value):
        self._width = value
        self._area_cache = None  # Invalidate cache

    @property
    def height(self):
        return self._height

    @height.setter
    def height(self, value):
        self._height = value
        self._area_cache = None  # Invalidate cache

    @property
    def area(self):
        if self._area_cache is None:
            print("Computing area...")
            self._area_cache = self._width * self._height
        return self._area_cache

rect = Rectangle(10, 5)
print(rect.area)  # Computing area... 50
print(rect.area)  # 50 (cached)

rect.width = 20   # Invalidates cache
print(rect.area)  # Computing area... 100
```

---

## Properties with Logging/Auditing

Track when attributes are accessed or modified:

```python
import logging

class AuditedAccount:
    def __init__(self, owner, balance):
        self._owner = owner
        self._balance = balance
        self.logger = logging.getLogger(self.__class__.__name__)

    @property
    def balance(self):
        self.logger.info(f"Balance accessed: {self._balance}")
        return self._balance

    @balance.setter
    def balance(self, value):
        old_value = self._balance
        self._balance = value
        self.logger.warning(
            f"Balance changed: {old_value} -> {value}"
        )
```

---

## Conditional Properties

Properties that behave differently based on state:

```python
class Document:
    def __init__(self):
        self._content = ""
        self._locked = False

    @property
    def content(self):
        return self._content

    @content.setter
    def content(self, value):
        if self._locked:
            raise PermissionError("Document is locked")
        self._content = value

    def lock(self):
        self._locked = True

    def unlock(self):
        self._locked = False

doc = Document()
doc.content = "Hello"
doc.lock()
doc.content = "World"  # PermissionError: Document is locked
```

---

## Key Takeaways

- Lazy initialization defers expensive computations until needed
- `@cached_property` simplifies one-time computation caching
- Return copies of mutable data to protect internal state
- Use deleters for cleanup operations
- Property factories reduce boilerplate for similar validations
- Invalidate caches when dependent values change
- Properties can add logging, auditing, and conditional behavior
