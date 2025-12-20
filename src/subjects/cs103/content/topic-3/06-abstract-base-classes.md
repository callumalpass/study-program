---
id: cs103-t3-abc
title: "Abstract Base Classes"
order: 6
---

## Abstract Base Classes

Abstract Base Classes (ABCs) define interfaces—contracts that subclasses must fulfill. They prevent instantiation of incomplete classes and make requirements explicit.

---

## The Problem ABCs Solve

Without ABCs, missing method implementations fail at runtime:

```python
class Shape:
    def area(self):
        raise NotImplementedError("Subclass must implement")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    # Forgot to implement area()!

# Creates successfully...
c = Circle(5)

# ...but fails when we try to use it
c.area()  # NotImplementedError - discovered too late!
```

---

## Using the `abc` Module

ABCs catch missing implementations at instantiation time:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Calculate the area of the shape."""
        pass

    @abstractmethod
    def perimeter(self):
        """Calculate the perimeter of the shape."""
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    # Missing perimeter()!

# Error at instantiation, not at use!
c = Circle(5)  # TypeError: Can't instantiate abstract class Circle
               # with abstract method perimeter
```

---

## Complete Implementation

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Both can be instantiated
rect = Rectangle(4, 5)
circle = Circle(3)

# Both satisfy the Shape interface
shapes = [rect, circle]
for shape in shapes:
    print(f"Area: {shape.area()}, Perimeter: {shape.perimeter()}")
```

---

## Abstract Properties

Properties can also be abstract:

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

## Concrete Methods in ABCs

ABCs can have regular (concrete) methods that subclasses inherit:

```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    @abstractmethod
    def process(self, data):
        """Process the data - must be implemented."""
        pass

    def validate(self, data):
        """Validate data - shared implementation."""
        if not data:
            raise ValueError("Data cannot be empty")
        return True

    def run(self, data):
        """Template method using abstract process()."""
        self.validate(data)
        result = self.process(data)
        print(f"Processed {len(data)} items")
        return result

class CSVProcessor(DataProcessor):
    def process(self, data):
        return [row.split(',') for row in data]

processor = CSVProcessor()
processor.run(["a,b,c", "1,2,3"])  # Uses inherited validate() and run()
```

---

## Checking Abstract Implementation

Use `isinstance()` to check if an object satisfies an interface:

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
print(isinstance(c, Drawable))  # True

# Can't check NotDrawable - it's not registered
nd = NotDrawable()
print(isinstance(nd, Drawable))  # False
```

---

## Registering Virtual Subclasses

Classes can be "virtually" registered as implementing an ABC without inheriting:

```python
from abc import ABC, abstractmethod

class Printable(ABC):
    @abstractmethod
    def print_it(self):
        pass

class Document:
    def print_it(self):
        print("Printing document")

# Register Document as virtual subclass
Printable.register(Document)

doc = Document()
print(isinstance(doc, Printable))  # True
```

**Note:** Virtual subclasses bypass the abstract method check—use carefully.

---

## ABCs vs Duck Typing

Python traditionally uses duck typing ("if it quacks like a duck..."):

```python
# Duck typing - no ABC needed
def render(shape):
    return shape.draw()  # Works if shape has draw()

# ABC approach - explicit contract
class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

def render(shape: Drawable):
    return shape.draw()
```

**Use ABCs when:**
- You want to enforce a contract
- Documentation of required methods is important
- You need `isinstance()` checks

**Use duck typing when:**
- Flexibility is more important than safety
- You're writing small scripts or prototypes
- The interface is obvious

---

## Built-in ABCs

Python's `collections.abc` provides useful ABCs:

```python
from collections.abc import Iterable, Sequence, Mapping

# Check if something is iterable
print(isinstance([1, 2, 3], Iterable))  # True
print(isinstance(42, Iterable))          # False

# Create a custom sequence
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
```

---

## Key Takeaways

- ABCs define required methods that subclasses must implement
- Use `@abstractmethod` to mark required methods
- Attempting to instantiate an incomplete subclass raises `TypeError`
- ABCs can have concrete methods that provide shared functionality
- Use ABCs when you need explicit contracts and `isinstance()` checks
- Python's `collections.abc` provides many useful built-in ABCs
