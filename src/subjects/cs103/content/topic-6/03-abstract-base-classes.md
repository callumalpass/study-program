---
id: cs103-t6-abc
title: "Abstract Base Classes"
order: 3
---

## Abstract Base Classes (ABCs)

Abstract Base Classes let you define a *required set of methods* that subclasses must implement. Python prevents instantiation of incomplete implementations.

---

## Why ABCs?

Without ABCs, missing methods fail at runtime:

```python
class Storage:
    def save(self, data):
        raise NotImplementedError

    def load(self, key):
        raise NotImplementedError

class FileStorage(Storage):
    def save(self, data):
        # Implemented
        pass
    # Forgot to implement load()!

storage = FileStorage()  # Creates successfully
storage.load("key")       # NotImplementedError at runtime!
```

With ABCs, missing methods fail at instantiation:

```python
from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, data):
        pass

    @abstractmethod
    def load(self, key):
        pass

class FileStorage(Storage):
    def save(self, data):
        pass
    # Forgot load()!

storage = FileStorage()  # TypeError: Can't instantiate!
```

---

## Creating ABCs

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    """Abstract base class for shapes."""

    @abstractmethod
    def area(self):
        """Calculate the area of the shape."""
        pass

    @abstractmethod
    def perimeter(self):
        """Calculate the perimeter of the shape."""
        pass

# Cannot instantiate ABC
shape = Shape()  # TypeError: Can't instantiate abstract class

# Must implement all abstract methods
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Now it works
circle = Circle(5)
print(circle.area())  # 78.53975
```

---

## Concrete Methods in ABCs

ABCs can have both abstract and concrete methods:

```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    """Process data with validation and logging."""

    def process(self, data):
        """Template method - concrete."""
        self.validate(data)
        result = self.transform(data)  # Abstract
        self.log(result)
        return result

    def validate(self, data):
        """Concrete method - shared implementation."""
        if not data:
            raise ValueError("Data cannot be empty")

    def log(self, result):
        """Concrete method - can be overridden."""
        print(f"Processed: {result}")

    @abstractmethod
    def transform(self, data):
        """Abstract method - subclasses must implement."""
        pass

class UppercaseProcessor(DataProcessor):
    def transform(self, data):
        return data.upper()

class ReverseProcessor(DataProcessor):
    def transform(self, data):
        return data[::-1]

# Use inherited concrete methods
processor = UppercaseProcessor()
result = processor.process("hello")  # HELLO
```

---

## Abstract Properties

Properties can be abstract:

```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    @property
    @abstractmethod
    def max_speed(self):
        """Maximum speed in km/h."""
        pass

    @property
    @abstractmethod
    def fuel_type(self):
        """Type of fuel used."""
        pass

class Car(Vehicle):
    @property
    def max_speed(self):
        return 200

    @property
    def fuel_type(self):
        return "gasoline"

class Bicycle(Vehicle):
    @property
    def max_speed(self):
        return 40

    @property
    def fuel_type(self):
        return "human power"
```

---

## Abstract Class Methods

```python
from abc import ABC, abstractmethod

class Serializable(ABC):
    @classmethod
    @abstractmethod
    def from_dict(cls, data):
        """Create instance from dictionary."""
        pass

    @abstractmethod
    def to_dict(self):
        """Convert instance to dictionary."""
        pass

class User(Serializable):
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @classmethod
    def from_dict(cls, data):
        return cls(data['name'], data['email'])

    def to_dict(self):
        return {'name': self.name, 'email': self.email}

# Usage
user = User.from_dict({'name': 'Alice', 'email': 'alice@example.com'})
print(user.to_dict())
```

---

## Checking ABC Implementation

Use `isinstance()` to check if an object satisfies an ABC:

```python
from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

class Circle(Drawable):
    def draw(self):
        print("Drawing circle")

class NotDrawable:
    pass

c = Circle()
nd = NotDrawable()

print(isinstance(c, Drawable))   # True
print(isinstance(nd, Drawable))  # False
```

---

## Registering Virtual Subclasses

Classes can be registered as "virtually" implementing an ABC:

```python
from abc import ABC, abstractmethod

class Printable(ABC):
    @abstractmethod
    def print_it(self):
        pass

# Third-party class we can't modify
class ExternalDocument:
    def print_it(self):
        print("Printing external document")

# Register as virtual subclass
Printable.register(ExternalDocument)

doc = ExternalDocument()
print(isinstance(doc, Printable))  # True
```

**Warning:** Virtual subclasses bypass abstract method checks!

---

## Built-in ABCs

Python's `collections.abc` provides useful ABCs:

```python
from collections.abc import Iterable, Sequence, Mapping, Callable

# Check capabilities
print(isinstance([1, 2, 3], Iterable))    # True
print(isinstance([1, 2, 3], Sequence))    # True
print(isinstance({'a': 1}, Mapping))       # True
print(isinstance(len, Callable))           # True

# Create custom sequences
from collections.abc import Sequence

class MyList(Sequence):
    def __init__(self, items):
        self._items = list(items)

    def __getitem__(self, index):
        return self._items[index]

    def __len__(self):
        return len(self._items)

    # Sequence provides: __contains__, __iter__, __reversed__,
    # index, and count for free!

my_list = MyList([1, 2, 3])
print(2 in my_list)  # True - uses inherited __contains__
```

---

## When to Use ABCs

**Good for:**
- Defining interfaces that must be fully implemented
- Framework base classes
- When you need `isinstance()` checks
- Sharing concrete methods among implementations

**Not ideal for:**
- Simple duck typing scenarios
- When implementations vary widely
- Maximum flexibility needed

---

## Key Takeaways

- ABCs define required methods with `@abstractmethod`
- Incomplete implementations can't be instantiated
- ABCs can mix abstract and concrete methods
- Properties and class methods can be abstract
- `collections.abc` provides many useful built-in ABCs
- Use ABCs when you need enforced contracts
