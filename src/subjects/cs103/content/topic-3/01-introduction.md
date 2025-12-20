## Introduction to Inheritance

Nature is full of hierarchies: all dogs are mammals, all mammals are animals. Inheritance brings this natural organization into programming. When you create a new class based on an existing one, the new class automatically gets all the attributes and methods of the parent—and can add or modify them.

---

## Why Inheritance Matters

Inheritance is fundamental to code reuse and polymorphism:

### 1. Code Reuse
Instead of duplicating code across similar classes, define it once in a parent class:

```python
# Without inheritance: duplicated code
class Dog:
    def __init__(self, name):
        self.name = name
    def eat(self):
        return f"{self.name} is eating"

class Cat:
    def __init__(self, name):
        self.name = name
    def eat(self):
        return f"{self.name} is eating"  # Duplicated!

# With inheritance: shared code
class Animal:
    def __init__(self, name):
        self.name = name
    def eat(self):
        return f"{self.name} is eating"

class Dog(Animal):
    pass  # Inherits everything from Animal

class Cat(Animal):
    pass  # Inherits everything from Animal
```

### 2. Specialization
Child classes can specialize behavior while keeping common functionality:

```python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"
```

### 3. Extensibility
Add new types without modifying existing code:

```python
# Later, add a new animal without changing Animal, Dog, or Cat
class Bird(Animal):
    def speak(self):
        return "Tweet!"
```

---

## Core Terminology

| Term | Description |
|------|-------------|
| **Parent class** | The class being inherited from (also: base class, superclass) |
| **Child class** | The class that inherits (also: derived class, subclass) |
| **Inherit** | To receive attributes and methods from a parent |
| **Override** | To replace a parent's method with a new implementation |
| **Extend** | To add to a parent's behavior |

---

## The "Is-A" Relationship

Inheritance models an "is-a" relationship:
- A Dog **is-a** Animal ✓
- A Rectangle **is-a** Shape ✓
- A Student **is-a** Person ✓

This is different from "has-a" (composition):
- A Car **has-a** Engine (not inheritance)
- A Team **has-a** list of Players (not inheritance)

```python
# IS-A: Use inheritance
class Student(Person):
    pass  # A student is a person

# HAS-A: Use composition
class Car:
    def __init__(self):
        self.engine = Engine()  # A car has an engine
```

---

## What Gets Inherited

When a class inherits from a parent, it receives:

1. **All attributes** (instance and class variables)
2. **All methods** (except those starting with __)
3. **All properties**

```python
class Animal:
    species = "Unknown"  # Class variable

    def __init__(self, name):
        self.name = name  # Instance variable

    def describe(self):  # Method
        return f"{self.name} is a {self.species}"

class Dog(Animal):
    species = "Canis familiaris"  # Override class variable

buddy = Dog("Buddy")
print(buddy.name)        # Inherited instance variable
print(buddy.species)     # Overridden class variable
print(buddy.describe())  # Inherited method
# Output: Buddy is a Canis familiaris
```

---

## Inheritance in Frameworks

Understanding inheritance is crucial for working with popular frameworks:

**Django:**
```python
from django.db import models

class Book(models.Model):  # Inherits from Model
    title = models.CharField(max_length=200)
```

**Flask:**
```python
from flask import Flask
from flask.views import View

class MyView(View):  # Inherits from View
    def dispatch_request(self):
        return "Hello!"
```

**Testing:**
```python
import unittest

class TestMath(unittest.TestCase):  # Inherits test capabilities
    def test_addition(self):
        self.assertEqual(2 + 2, 4)
```

---

## What You'll Learn

In this topic, you'll master:

1. **Creating child classes** that inherit from parents
2. **Using `super()`** to call parent methods
3. **Overriding methods** to provide specialized behavior
4. **Multiple inheritance** and the Method Resolution Order
5. **Abstract base classes** for defining interfaces
6. **When to use inheritance** vs composition
7. **Common mistakes** and best practices

---

## Key Takeaways

- Inheritance lets classes share code through parent-child relationships
- Child classes inherit all attributes and methods from parents
- Use inheritance for "is-a" relationships
- Inheritance enables code reuse, specialization, and extensibility
- Understanding inheritance is essential for working with frameworks
