## Introduction

Everything in the real world can be thought of as an "object": a car has properties (color, speed) and behaviors (accelerate, brake). Object-Oriented Programming (OOP) brings this natural way of thinking into code. Instead of writing procedures that operate on data, we create objects that contain both data and the methods to manipulate it.

**Why This Matters:**
OOP is the dominant paradigm in modern software development. From web applications to mobile apps to game engines, understanding classes and objects is essential for writing maintainable, scalable code. Most job interviews will test your OOP knowledge, and most codebases you'll work with use these concepts daily.

**Learning Objectives:**
- Understand the difference between classes and objects (blueprints vs instances)
- Create classes with attributes and methods in Python
- Use the `__init__` constructor to initialize objects
- Understand the role of `self` in instance methods
- Distinguish between instance variables and class variables
- Implement special methods like `__str__` and `__repr__`

---

## Core Concepts

### Classes: The Blueprint

A **class** is a template that defines the structure and behavior of objects. Think of it as a cookie cutter—the class defines the shape, and each cookie (object) is made from that template.

```python
class Dog:
    # Class variable - shared by ALL instances
    species = "Canis familiaris"

    # Constructor - runs when creating a new object
    def __init__(self, name, age):
        # Instance variables - unique to each object
        self.name = name
        self.age = age

    # Instance method - operates on specific object
    def bark(self):
        return f"{self.name} says woof!"

    # Another instance method
    def birthday(self):
        self.age += 1
```

### Objects: The Instances

An **object** is a specific instance of a class. Each object has its own copy of instance variables but shares class variables.

```python
# Creating objects (instantiation)
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)

# Each has its own state
print(buddy.name)      # "Buddy"
print(max_dog.name)    # "Max"

# But they share class variables
print(buddy.species)   # "Canis familiaris"
print(max_dog.species) # "Canis familiaris"

# Calling methods
print(buddy.bark())    # "Buddy says woof!"
buddy.birthday()
print(buddy.age)       # 4
```

### The `self` Parameter

The `self` parameter is Python's way of referring to the current instance. When you call `buddy.bark()`, Python automatically passes `buddy` as the first argument.

```python
# These two calls are equivalent:
buddy.bark()           # Python adds self automatically
Dog.bark(buddy)        # Explicit call showing self
```

**Critical insight:** `self` is just a convention—you could name it anything, but always use `self` for clarity.

### The `__init__` Constructor

The `__init__` method is called automatically when you create a new object. It's your chance to set up the object's initial state.

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []  # Initialize an empty list
        print(f"Account created for {owner}")

# Creating an account triggers __init__
acc = BankAccount("Alice", 1000)  # Prints: Account created for Alice
```

### Instance vs Class Variables

| Aspect | Instance Variables | Class Variables |
|--------|-------------------|-----------------|
| Defined in | `__init__` (using `self.`) | Class body (outside methods) |
| Scope | Unique to each object | Shared by all instances |
| Access | `self.variable` or `obj.variable` | `ClassName.variable` or `self.variable` |
| Use case | Object-specific data | Constants, counters, defaults |

```python
class Student:
    school = "Python Academy"  # Class variable
    student_count = 0          # Class variable (counter)

    def __init__(self, name):
        self.name = name                  # Instance variable
        Student.student_count += 1        # Modify class variable

s1 = Student("Alice")
s2 = Student("Bob")
print(Student.student_count)  # 2
```

---

## Common Patterns and Idioms

### Special (Dunder) Methods

Python uses "dunder" (double underscore) methods to define how objects behave with built-in operations.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """Human-readable string (for print)"""
        return f"Point({self.x}, {self.y})"

    def __repr__(self):
        """Developer string (for debugging)"""
        return f"Point(x={self.x}, y={self.y})"

    def __eq__(self, other):
        """Define equality (==)"""
        return self.x == other.x and self.y == other.y

p1 = Point(3, 4)
p2 = Point(3, 4)
print(p1)           # Point(3, 4) - uses __str__
print(p1 == p2)     # True - uses __eq__
```

### Properties for Computed Attributes

Use `@property` to create attributes that are computed on access:

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return 3.14159 * self.radius ** 2

    @property
    def diameter(self):
        return self.radius * 2

c = Circle(5)
print(c.area)      # 78.53975 - accessed like an attribute, not c.area()
print(c.diameter)  # 10
```

---

## Common Mistakes and Pitfalls

### Mistake 1: Forgetting `self`

```python
class Counter:
    def __init__(self):
        count = 0  # WRONG: local variable, lost after __init__

    def increment(self):
        self.count += 1  # ERROR: self.count doesn't exist
```

**Fix:** Always use `self.` for instance variables:
```python
def __init__(self):
    self.count = 0  # CORRECT: instance variable
```

### Mistake 2: Mutable Default Arguments

```python
class ShoppingCart:
    def __init__(self, items=[]):  # DANGER: shared list!
        self.items = items

cart1 = ShoppingCart()
cart1.items.append("apple")
cart2 = ShoppingCart()
print(cart2.items)  # ['apple'] - WRONG! Should be empty
```

**Fix:** Use `None` as default and create list inside:
```python
def __init__(self, items=None):
    self.items = items if items is not None else []
```

### Mistake 3: Modifying Class Variables via Instances

```python
class Config:
    debug = False

c1 = Config()
c1.debug = True    # Creates INSTANCE variable, doesn't change class variable!
c2 = Config()
print(c2.debug)    # False - class variable unchanged
print(Config.debug) # False
```

**Fix:** Modify class variables through the class name:
```python
Config.debug = True  # Changes for all instances
```

---

## Best Practices

1. **Keep classes focused:** Each class should have a single responsibility. If a class is doing too many things, split it up.

2. **Use meaningful names:** Classes are nouns (Dog, BankAccount, HttpRequest). Methods are verbs (bark, deposit, send).

3. **Initialize all attributes in `__init__`:** Don't add attributes in random methods—it makes objects unpredictable.

4. **Prefer instance variables:** Use class variables only for true constants or counters. Instance variables are safer and more predictable.

5. **Implement `__str__` and `__repr__`:** These make debugging much easier.

6. **Use type hints for clarity:**
   ```python
   class Person:
       def __init__(self, name: str, age: int) -> None:
           self.name = name
           self.age = age
   ```

---

## Real-World Applications

**Web Development (Django/Flask):**
```python
class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.is_authenticated = False
```

**Game Development:**
```python
class Player:
    def __init__(self, x, y, health=100):
        self.x = x
        self.y = y
        self.health = health

    def move(self, dx, dy):
        self.x += dx
        self.y += dy
```

**Data Science:**
```python
class DataPipeline:
    def __init__(self, source):
        self.source = source
        self.transformations = []

    def add_transform(self, func):
        self.transformations.append(func)
```

---

## Further Exploration

- **Dataclasses:** Python 3.7+ provides `@dataclass` decorator that auto-generates `__init__`, `__repr__`, and `__eq__`.
- **Named Tuples:** Lightweight alternative to classes for simple data containers.
- **Slots:** Use `__slots__` to restrict attributes and save memory for many instances.
- **Class Methods vs Static Methods:** Learn when to use `@classmethod` and `@staticmethod`.
