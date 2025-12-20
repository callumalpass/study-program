---
id: cs103-t1-defining
title: "Defining Classes"
order: 2
---

## Defining Classes: The Blueprint

A **class** is a template that defines the structure and behavior of objects. Think of it as a cookie cutter—the class defines the shape, and each cookie (object) is made from that template.

---

## Basic Class Syntax

The simplest class definition in Python:

```python
class Dog:
    pass  # Empty class (placeholder)
```

Classes are defined using the `class` keyword, followed by the class name (conventionally in PascalCase), and a colon. The body is indented.

---

## Adding Attributes and Methods

A useful class has **attributes** (data) and **methods** (functions):

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
        return f"{self.name} is now {self.age}!"
```

Let's break this down:

### Class Variables
```python
species = "Canis familiaris"
```
Defined directly in the class body, shared by all instances. Every `Dog` object has the same species.

### The Constructor (`__init__`)
```python
def __init__(self, name, age):
    self.name = name
    self.age = age
```
This special method runs automatically when you create an object. It initializes the object's state.

### Instance Variables
```python
self.name = name
self.age = age
```
Created with `self.`, these are unique to each object. Each dog has its own name and age.

### Instance Methods
```python
def bark(self):
    return f"{self.name} says woof!"
```
Functions defined inside a class. The first parameter is always `self`, which refers to the specific object.

---

## Naming Conventions

Python has strong conventions for class design:

| Element | Convention | Example |
|---------|------------|---------|
| Class names | PascalCase | `BankAccount`, `HttpRequest` |
| Method names | snake_case | `get_balance`, `calculate_interest` |
| Private attributes | Leading underscore | `_internal_data` |
| Constants | UPPER_CASE | `MAX_BALANCE` |

---

## Class Documentation

Use docstrings to document your classes:

```python
class BankAccount:
    """A simple bank account model.

    Attributes:
        owner (str): The account holder's name.
        balance (float): Current account balance.

    Example:
        >>> acc = BankAccount("Alice", 1000)
        >>> acc.deposit(500)
        >>> acc.balance
        1500
    """

    def __init__(self, owner, balance=0):
        """Initialize account with owner and optional starting balance."""
        self.owner = owner
        self.balance = balance
```

---

## Type Hints (Python 3.5+)

Add type hints for clarity and IDE support:

```python
class Person:
    def __init__(self, name: str, age: int) -> None:
        self.name: str = name
        self.age: int = age

    def greet(self) -> str:
        return f"Hello, I'm {self.name}"

    def is_adult(self) -> bool:
        return self.age >= 18
```

Type hints don't enforce types at runtime but help with documentation and IDE autocompletion.

---

## Methods Without `self`

Sometimes you need methods that don't operate on an instance:

### Static Methods
```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

# Called on the class, not an instance
result = MathUtils.add(5, 3)
```

### Class Methods
```python
class Dog:
    count = 0

    def __init__(self, name):
        self.name = name
        Dog.count += 1

    @classmethod
    def get_count(cls):
        return f"Total dogs: {cls.count}"

d1 = Dog("Buddy")
d2 = Dog("Max")
print(Dog.get_count())  # "Total dogs: 2"
```

---

## Key Takeaways

- Classes are blueprints defined with the `class` keyword
- Use `__init__` to initialize instance attributes
- Instance variables use `self.name`, class variables are defined in the class body
- Methods are functions inside a class; the first parameter is `self`
- Use PascalCase for class names, snake_case for methods
- Add docstrings and type hints for better documentation
