---
id: cs103-t1-defining
title: "Defining Classes"
order: 2
---

## Defining Classes: The Blueprint

A **class** is a template that defines the structure and behavior of objects. Think of it as a cookie cutter—the class defines the shape, and each cookie (object) is made from that template. More technically, a class defines:

1. **What data** objects of this type will hold (attributes)
2. **What operations** can be performed on that data (methods)
3. **How objects** are initialized when created (constructor)

Understanding how to define classes well is fundamental to OOP. A well-designed class clearly expresses what concept it represents and what responsibilities it has.

---

## Basic Class Syntax

The simplest class definition in Python:

```python
class Dog:
    pass  # Empty class (placeholder)
```

Classes are defined using the `class` keyword, followed by the class name (conventionally in PascalCase), and a colon. The body is indented. While an empty class with `pass` isn't useful, it's valid Python and can serve as a placeholder during development.

Even this empty class can be instantiated:

```python
my_dog = Dog()
print(type(my_dog))  # <class '__main__.Dog'>
```

But without attributes or methods, it doesn't do anything interesting. Let's add some substance.

---

## Adding Attributes and Methods

A useful class has **attributes** (data) and **methods** (functions). Attributes store the object's state, while methods define its behavior.

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

This class has everything a typical class needs:
- A class variable (`species`) shared by all dogs
- A constructor (`__init__`) that sets up each dog's name and age
- Two instance methods (`bark` and `birthday`) that operate on individual dogs

Let's break each component down in detail:

### Class Variables
```python
species = "Canis familiaris"
```
Defined directly in the class body (not inside any method), class variables are shared by all instances. Every `Dog` object has the same species. Use class variables for data that's truly shared—like constants, counters, or default values.

```python
# Class variables are shared
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)
print(buddy.species)    # "Canis familiaris"
print(max_dog.species)  # "Canis familiaris"
print(buddy.species is max_dog.species)  # True - same object in memory
```

### The Constructor (`__init__`)
```python
def __init__(self, name, age):
    self.name = name
    self.age = age
```
This special method (called a "dunder" method for "double underscore") runs automatically when you create an object. It initializes the object's state. The name `__init__` stands for "initialize." You don't call it directly—Python calls it for you when you write `Dog("Buddy", 3)`.

**Common pattern:** The constructor takes parameters and stores them as instance variables. This is where you set up everything the object needs to function.

### Instance Variables
```python
self.name = name
self.age = age
```
Created with `self.`, these are unique to each object. Each dog has its own name and age. The `self` prefix is required—without it, you'd just be creating a local variable that disappears when `__init__` ends.

```python
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)
print(buddy.name)  # "Buddy"
print(max_dog.name)  # "Max" - each has its own
```

### Instance Methods
```python
def bark(self):
    return f"{self.name} says woof!"
```
Functions defined inside a class are called methods. The first parameter is always `self`, which refers to the specific object the method is being called on. When you write `buddy.bark()`, Python automatically passes `buddy` as the `self` parameter.

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

## Common Mistakes

**Forgetting `self` in method definitions:**
```python
class Dog:
    def bark():  # WRONG - missing self
        return "Woof!"

# TypeError: bark() takes 0 positional arguments but 1 was given
```

**Forgetting `self.` when accessing attributes:**
```python
class Dog:
    def __init__(self, name):
        name = name  # WRONG - this creates a local variable
        # self.name is never set!
```

**Using mutable default arguments:**
```python
class Team:
    def __init__(self, members=[]):  # WRONG - shared mutable default
        self.members = members

# All instances share the same list!
```

The correct pattern uses `None`:
```python
class Team:
    def __init__(self, members=None):
        self.members = members if members else []
```

---

## Key Takeaways

- Classes are blueprints defined with the `class` keyword
- Use `__init__` to initialize instance attributes
- Instance variables use `self.name`, class variables are defined in the class body
- Methods are functions inside a class; the first parameter is `self`
- Use PascalCase for class names, snake_case for methods
- Add docstrings and type hints for better documentation
- Always include `self` as the first parameter in instance methods
- Define all instance attributes in `__init__` for clarity
