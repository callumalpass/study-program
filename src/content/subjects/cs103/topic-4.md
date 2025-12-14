## Introduction

The word "polymorphism" comes from Greek, meaning "many forms." In programming, it means that the same interface can work with objects of different types. When you call `len()` on a string, list, or dictionary, you're using polymorphism—the same function adapts to different types.

**Why This Matters:**
Polymorphism is what makes object-oriented code truly flexible. It lets you write generic code that works with any object that follows a certain interface, without knowing the specific type at compile time. This is the foundation of plugin architectures, framework extensibility, and clean API design.

**Learning Objectives:**
- Understand method overriding as a form of polymorphism
- Apply duck typing: "if it walks like a duck..."
- Implement operator overloading with special methods
- Create polymorphic functions that work with multiple types
- Distinguish between compile-time and runtime polymorphism

---

## Core Concepts

### Method Overriding (Subtype Polymorphism)

Different classes can implement the same method differently:

```python
class Shape:
    def area(self):
        raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

# Polymorphic function - works with any Shape
def print_area(shape):
    print(f"Area: {shape.area()}")

# Same function, different behaviors
print_area(Rectangle(4, 5))  # Area: 20
print_area(Circle(3))        # Area: 28.27431
print_area(Triangle(4, 6))   # Area: 12.0
```

### Duck Typing

Python doesn't require explicit interfaces or inheritance for polymorphism. If an object has the right methods, it works:

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Robot:
    def speak(self):
        return "Beep boop!"

# No common parent class needed!
def make_it_speak(thing):
    print(thing.speak())

make_it_speak(Dog())    # Woof!
make_it_speak(Cat())    # Meow!
make_it_speak(Robot())  # Beep boop!
```

**"If it walks like a duck and quacks like a duck, then it must be a duck."**

### Operator Overloading

Special methods let your classes work with Python's built-in operators:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        """Overload + operator"""
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """Overload - operator"""
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        """Overload * (vector * scalar)"""
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):
        """Overload * (scalar * vector)"""
        return self.__mul__(scalar)

    def __eq__(self, other):
        """Overload == operator"""
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1 + v2)     # Vector(4, 6)
print(v2 - v1)     # Vector(2, 2)
print(v1 * 3)      # Vector(3, 6)
print(2 * v1)      # Vector(2, 4) - uses __rmul__
print(v1 == Vector(1, 2))  # True
```

### Common Special Methods for Operators

| Operator | Method | Example |
|----------|--------|---------|
| `+` | `__add__` | `a + b` |
| `-` | `__sub__` | `a - b` |
| `*` | `__mul__` | `a * b` |
| `/` | `__truediv__` | `a / b` |
| `//` | `__floordiv__` | `a // b` |
| `%` | `__mod__` | `a % b` |
| `**` | `__pow__` | `a ** b` |
| `==` | `__eq__` | `a == b` |
| `!=` | `__ne__` | `a != b` |
| `<` | `__lt__` | `a < b` |
| `<=` | `__le__` | `a <= b` |
| `>` | `__gt__` | `a > b` |
| `>=` | `__ge__` | `a >= b` |
| `len()` | `__len__` | `len(a)` |
| `str()` | `__str__` | `str(a)` |
| `[]` | `__getitem__` | `a[key]` |
| `in` | `__contains__` | `x in a` |
| `()` | `__call__` | `a()` |

### Making Objects Callable

The `__call__` method lets objects be used like functions:

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Useful for function-like objects with state
numbers = [1, 2, 3, 4, 5]
print(list(map(double, numbers)))  # [2, 4, 6, 8, 10]
```

### Making Objects Iterable

Implement `__iter__` and `__next__` for iteration support:

```python
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1
```

---

## Common Patterns and Idioms

### The Strategy Pattern

Use polymorphism to swap algorithms at runtime:

```python
class Sorter:
    def sort(self, data):
        raise NotImplementedError

class BubbleSort(Sorter):
    def sort(self, data):
        arr = list(data)
        for i in range(len(arr)):
            for j in range(len(arr) - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

class QuickSort(Sorter):
    def sort(self, data):
        if len(data) <= 1:
            return list(data)
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        middle = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + middle + self.sort(right)

# Switch algorithms without changing client code
def process_data(data, sorter):
    return sorter.sort(data)

data = [3, 1, 4, 1, 5, 9, 2, 6]
print(process_data(data, BubbleSort()))  # [1, 1, 2, 3, 4, 5, 6, 9]
print(process_data(data, QuickSort()))   # [1, 1, 2, 3, 4, 5, 6, 9]
```

### Protocol Classes (Python 3.8+)

Define structural types without inheritance:

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None:
        ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class Square:
    def draw(self) -> None:
        print("Drawing square")

def render(shape: Drawable) -> None:
    shape.draw()

# No explicit inheritance needed!
render(Circle())  # Drawing circle
render(Square())  # Drawing square
```

### Total Ordering

Implement comparison operators efficiently:

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade

    # total_ordering fills in __le__, __gt__, __ge__

alice = Student("Alice", 90)
bob = Student("Bob", 85)
print(alice > bob)   # True
print(alice >= bob)  # True (auto-generated)
```

---

## Common Mistakes and Pitfalls

### Mistake 1: Not Returning NotImplemented

When an operator can't handle a type, return `NotImplemented` (not raise):

```python
class Money:
    def __init__(self, amount):
        self.amount = amount

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented  # Let Python try other.__radd__
        return Money(self.amount + other.amount)

# Now Python can try: number + money → money.__radd__(number)
```

### Mistake 2: Forgetting __ne__ When Defining __eq__

Python 3 auto-generates `__ne__`, but be explicit if you override one:

```python
class Item:
    def __eq__(self, other):
        return self.id == other.id

    # In Python 3, __ne__ is auto-generated as "not __eq__"
    # But explicitly defining it is clearer
    def __ne__(self, other):
        return not self.__eq__(other)
```

### Mistake 3: Inconsistent Comparison Operations

```python
# BAD: __lt__ and __eq__ disagree
class Confusing:
    def __init__(self, value):
        self.value = value

    def __lt__(self, other):
        return self.value < other.value

    def __eq__(self, other):
        return True  # Always equal? But lt says otherwise!
```

**Fix:** Use `@total_ordering` or ensure consistency.

### Mistake 4: Breaking Substitutability

```python
class Bird:
    def fly(self):
        return "flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Can't fly!")  # Breaks polymorphism!

def make_it_fly(bird):
    return bird.fly()  # Will crash for Penguin
```

**Fix:** Redesign—maybe `Bird` shouldn't have `fly()`, or use composition.

---

## Best Practices

1. **Define `__repr__` for all classes:** Debugging becomes much easier.

2. **Use `@total_ordering` for comparable classes:** Don't manually implement all six comparison methods.

3. **Return `NotImplemented`, don't raise TypeError:** Let Python try reverse operations.

4. **Keep operator semantics intuitive:** `+` should mean addition or concatenation, not something weird.

5. **Prefer duck typing over isinstance():** Write for capabilities, not types.

6. **Use Protocol for structural typing:** Cleaner than ABC for pure interface contracts.

---

## Real-World Applications

**Data Processing:**
```python
class DataSource:
    def read(self):
        raise NotImplementedError

class CSVSource(DataSource):
    def read(self):
        return csv_data

class APISource(DataSource):
    def read(self):
        return api_data

# Same pipeline works with any source
def process(source: DataSource):
    data = source.read()
    # ... process data
```

**Testing with Mocks:**
```python
class Database:
    def query(self, sql):
        # Real database call
        pass

class MockDatabase:
    def query(self, sql):
        return {"fake": "data"}

# Duck typing lets us swap in mocks
def get_user(db, user_id):
    return db.query(f"SELECT * FROM users WHERE id={user_id}")
```

**Plugin Systems:**
```python
class Plugin:
    def process(self, data):
        raise NotImplementedError

# Plugins can be loaded dynamically
plugins = [CompressionPlugin(), EncryptionPlugin(), LoggingPlugin()]
for plugin in plugins:
    data = plugin.process(data)  # Polymorphism!
```

---

## Further Exploration

- **`functools.singledispatch`:** Function overloading based on argument type.
- **`__getattr__` and `__setattr__`:** Dynamic attribute access for proxy objects.
- **Numeric Types:** Implement `__radd__`, `__iadd__` for complete numeric support.
- **Context Managers:** `__enter__` and `__exit__` for `with` statement support.
