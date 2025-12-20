## Introduction

Nature is full of hierarchies: all dogs are mammals, all mammals are animals. Inheritance brings this natural organization into programming. When you create a new class based on an existing one, the new class automatically gets all the attributes and methods of the parent—and can add or modify them.

**Why This Matters:**
Inheritance is fundamental to code reuse and polymorphism. It allows you to build on existing code without duplicating it, create specialized versions of general concepts, and design extensible systems. Understanding inheritance is crucial for working with frameworks like Django, Flask, or any GUI toolkit.

## Learning Objectives

- Create child classes that inherit from parent classes
- Override methods to provide specialized behavior
- Use `super()` to call parent class methods
- Understand the Method Resolution Order (MRO)
- Know when to use inheritance vs composition
- Implement multiple inheritance safely

---

## Core Concepts

### Basic Inheritance

A child class (subclass) inherits everything from its parent class (superclass):

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some generic sound"

    def eat(self):
        return f"{self.name} is eating"

class Dog(Animal):  # Dog inherits from Animal
    def speak(self):  # Override parent method
        return f"{self.name} says woof!"

    def fetch(self):  # Add new method
        return f"{self.name} fetches the ball"

# Dog has everything Animal has, plus more
buddy = Dog("Buddy")
print(buddy.name)      # Inherited attribute
print(buddy.eat())     # Inherited method: "Buddy is eating"
print(buddy.speak())   # Overridden method: "Buddy says woof!"
print(buddy.fetch())   # New method: "Buddy fetches the ball"
```

### The `super()` Function

Use `super()` to call the parent class's methods. This is essential for extending (rather than replacing) parent behavior:

```python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Call parent's __init__
        self.breed = breed           # Add child-specific attribute

class Cat(Animal):
    def __init__(self, name, age, indoor=True):
        super().__init__(name, age)
        self.indoor = indoor

buddy = Dog("Buddy", 3, "Golden Retriever")
print(buddy.name, buddy.age, buddy.breed)  # Buddy 3 Golden Retriever
```

### Method Override vs Extension

**Override:** Completely replace parent behavior
```python
class Bird(Animal):
    def speak(self):
        return "Tweet!"  # Replaces Animal.speak entirely
```

**Extension:** Add to parent behavior
```python
class LoggedAnimal(Animal):
    def speak(self):
        result = super().speak()  # Get parent's result
        print(f"[LOG] {self.name} spoke")
        return result  # Return original result
```

### Checking Inheritance

Python provides tools to check class relationships:

```python
class Animal: pass
class Dog(Animal): pass
class Cat(Animal): pass

buddy = Dog()

# Check if object is instance of class
print(isinstance(buddy, Dog))     # True
print(isinstance(buddy, Animal))  # True (parent counts)
print(isinstance(buddy, Cat))     # False

# Check class hierarchy
print(issubclass(Dog, Animal))    # True
print(issubclass(Cat, Dog))       # False
```

### Method Resolution Order (MRO)

When you call a method, Python searches classes in a specific order. Use `ClassName.__mro__` or `ClassName.mro()` to see it:

```python
class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return "B"

class C(A):
    def greet(self):
        return "C"

class D(B, C):
    pass

print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

d = D()
print(d.greet())  # "B" - first match in MRO
```

---

## Multiple Inheritance

Python supports inheriting from multiple parent classes:

```python
class Flyer:
    def fly(self):
        return "Flying through the air"

class Swimmer:
    def swim(self):
        return "Swimming through water"

class Duck(Flyer, Swimmer):  # Multiple inheritance
    def quack(self):
        return "Quack!"

donald = Duck()
print(donald.fly())    # From Flyer
print(donald.swim())   # From Swimmer
print(donald.quack())  # From Duck
```

### The Diamond Problem

Multiple inheritance can cause ambiguity when two parents share a common ancestor:

```python
class Animal:
    def __init__(self):
        print("Animal init")

class Flyer(Animal):
    def __init__(self):
        print("Flyer init")
        super().__init__()

class Swimmer(Animal):
    def __init__(self):
        print("Swimmer init")
        super().__init__()

class Duck(Flyer, Swimmer):
    def __init__(self):
        print("Duck init")
        super().__init__()

# Without super(), Animal.__init__ might run twice
# With super() and MRO, each __init__ runs exactly once
d = Duck()
# Output:
# Duck init
# Flyer init
# Swimmer init
# Animal init
```

### Mixins: A Safe Pattern

Mixins are small classes designed to be combined with other classes. They add functionality without being a complete class on their own:

```python
class JSONMixin:
    """Mixin that adds JSON serialization"""
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LoggingMixin:
    """Mixin that adds logging"""
    def log(self, message):
        print(f"[{self.__class__.__name__}] {message}")

class User(JSONMixin, LoggingMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email

user = User("Alice", "alice@example.com")
print(user.to_json())  # '{"name": "Alice", "email": "alice@example.com"}'
user.log("User created")  # [User] User created
```

---

## Common Patterns and Idioms

### Template Method Pattern

Parent defines algorithm structure; children fill in specifics:

```python
class DataProcessor:
    def process(self):
        data = self.load_data()      # Abstract - child must implement
        cleaned = self.clean(data)   # Concrete - uses default
        return self.transform(cleaned)  # Abstract

    def clean(self, data):
        return data.strip()

    def load_data(self):
        raise NotImplementedError

    def transform(self, data):
        raise NotImplementedError

class CSVProcessor(DataProcessor):
    def load_data(self):
        return "  csv,data,here  "

    def transform(self, data):
        return data.split(",")
```

### Abstract Base Classes

Use `ABC` module to define classes that cannot be instantiated directly:

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

# shape = Shape()  # TypeError: Can't instantiate abstract class
rect = Rectangle(5, 3)  # Works!
```

---

## Common Mistakes and Pitfalls

### Mistake 1: Forgetting `super().__init__()`

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        self.breed = breed  # Forgot super()!
        # self.name is never set!

buddy = Dog("Buddy", "Lab")
print(buddy.name)  # AttributeError!
```

**Fix:** Always call `super().__init__()` when overriding `__init__`.

### Mistake 2: Overusing Inheritance

```python
# BAD: Using inheritance for "has-a" relationship
class Car(Engine):  # A car is NOT an engine!
    pass

# GOOD: Using composition
class Car:
    def __init__(self):
        self.engine = Engine()  # A car HAS an engine
```

**Rule of thumb:** Use inheritance for "is-a" relationships, composition for "has-a".

### Mistake 3: Deep Inheritance Hierarchies

```python
# BAD: Too deep
class Animal: pass
class Mammal(Animal): pass
class Canine(Mammal): pass
class DomesticCanine(Canine): pass
class Dog(DomesticCanine): pass
class Labrador(Dog): pass
class YellowLabrador(Labrador): pass  # 7 levels deep!
```

**Fix:** Keep hierarchies shallow (2-3 levels). Prefer composition.

### Mistake 4: Breaking the Liskov Substitution Principle

Child classes should be usable anywhere parent classes are expected:

```python
# BAD: Child breaks parent's contract
class Bird:
    def fly(self):
        return "Flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Penguins can't fly!")  # Breaks contract!
```

**Fix:** Redesign the hierarchy or use composition.

---

## Best Practices

1. **Favor composition over inheritance:** Ask "is-a" vs "has-a". If in doubt, use composition.

2. **Keep hierarchies shallow:** Deep hierarchies are hard to understand and maintain.

3. **Always call `super()` in `__init__`:** Unless you have a very specific reason not to.

4. **Use abstract base classes:** Make contracts explicit with `@abstractmethod`.

5. **Use mixins carefully:** Keep them small, focused, and independent.

6. **Document inheritance expectations:** What methods should be overridden? What shouldn't?

---

## Real-World Applications

**Web Frameworks (Django):**
```python
from django.views import View

class MyView(View):
    def get(self, request):  # Override to handle GET
        return HttpResponse("Hello!")
```

**GUI Frameworks (Tkinter):**
```python
class CustomButton(tk.Button):
    def __init__(self, master, **kwargs):
        super().__init__(master, **kwargs)
        self.configure(bg="blue", fg="white")
```

**Testing:**
```python
class TestCase:
    def setUp(self):
        pass  # Override to set up test fixtures

    def tearDown(self):
        pass  # Override to clean up

class MyTest(TestCase):
    def setUp(self):
        self.data = load_test_data()
```

---

## Summary

- Inheritance models “is-a” relationships and enables reuse through base classes.
- Overriding and `super()` let subclasses extend behavior while preserving base guarantees.
- Multiple inheritance uses MRO; use it carefully and keep hierarchies simple.
- Prefer composition when inheritance creates tight coupling or fragility.

## Further Exploration

- **Protocols (Structural Subtyping):** Python 3.8+ typing.Protocol for duck typing with type hints.
- **super() with arguments:** `super(ClassName, self)` for Python 2 compatibility and advanced uses.
- **C3 Linearization:** The algorithm behind Python's MRO.
- **Cooperative Multiple Inheritance:** Design patterns for safe multiple inheritance.
