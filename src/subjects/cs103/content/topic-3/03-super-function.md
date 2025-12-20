---
id: cs103-t3-super
title: "The super() Function"
order: 3
---

## The `super()` Function

The `super()` function is your connection to parent classes. It lets you call parent methods, extend their behavior, and properly initialize inherited attributes.

---

## Basic Usage

`super()` returns a proxy object that delegates method calls to the parent:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent's __init__
        self.breed = breed

    def speak(self):
        parent_says = super().speak()  # Call parent's speak
        return f"{parent_says} and woof!"

buddy = Dog("Buddy", "Lab")
print(buddy.name)     # "Buddy" (initialized via super)
print(buddy.breed)    # "Lab" (Dog-specific)
print(buddy.speak())  # "Some sound and woof!"
```

---

## Why Use `super()`?

### 1. Proper Initialization
Without `super()`, parent attributes aren't initialized:

```python
# WRONG - missing super().__init__()
class Dog(Animal):
    def __init__(self, name, breed):
        self.breed = breed
        # self.name is never set!

buddy = Dog("Buddy", "Lab")
print(buddy.name)  # AttributeError: 'Dog' has no attribute 'name'
```

### 2. Code Reuse
Extend parent behavior without duplicating code:

```python
class Logger:
    def log(self, message):
        print(f"[LOG] {message}")

class TimestampLogger(Logger):
    def log(self, message):
        from datetime import datetime
        timestamp = datetime.now().strftime("%H:%M:%S")
        super().log(f"[{timestamp}] {message}")

logger = TimestampLogger()
logger.log("Server started")
# Output: [LOG] [14:32:15] Server started
```

### 3. Maintainability
If the parent class changes, children automatically get updates:

```python
class Shape:
    def __init__(self, color="black"):
        self.color = color
        self.created_at = datetime.now()  # Added later

class Circle(Shape):
    def __init__(self, radius, color="black"):
        super().__init__(color)  # Automatically gets created_at too!
        self.radius = radius
```

---

## `super()` with `__init__`

The most common use is initializing parent attributes:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Initialize Person attributes
        self.student_id = student_id

class GraduateStudent(Student):
    def __init__(self, name, age, student_id, thesis_topic):
        super().__init__(name, age, student_id)  # Initialize Student
        self.thesis_topic = thesis_topic

grad = GraduateStudent("Alice", 25, "G12345", "Machine Learning")
print(grad.name)          # From Person
print(grad.student_id)    # From Student
print(grad.thesis_topic)  # From GraduateStudent
```

---

## `super()` with Other Methods

Use `super()` to extend any parent method:

```python
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(f"+{amount}")

class PremiumAccount(BankAccount):
    def deposit(self, amount):
        bonus = amount * 0.01  # 1% bonus
        super().deposit(amount + bonus)
        print(f"Bonus applied: +{bonus}")

acc = PremiumAccount(100)
acc.deposit(1000)
# Bonus applied: +10.0
print(acc.balance)  # 1110.0
print(acc.transactions)  # ['+1010.0']
```

---

## How `super()` Finds the Parent

`super()` uses the Method Resolution Order (MRO) to find the next class:

```python
class A:
    def greet(self):
        return "Hello from A"

class B(A):
    def greet(self):
        return f"Hello from B, {super().greet()}"

class C(A):
    def greet(self):
        return f"Hello from C, {super().greet()}"

class D(B, C):
    def greet(self):
        return f"Hello from D, {super().greet()}"

d = D()
print(d.greet())
# Hello from D, Hello from B, Hello from C, Hello from A

print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)
```

`super()` follows the MRO, not just the direct parent.

---

## `super()` with Arguments (Legacy)

In Python 2 (and for advanced uses), `super()` takes arguments:

```python
# Python 2 style (still works in Python 3)
class Child(Parent):
    def __init__(self):
        super(Child, self).__init__()

# Python 3 style (preferred)
class Child(Parent):
    def __init__(self):
        super().__init__()  # No arguments needed
```

---

## Common Patterns

### Call Parent, Then Customize
```python
class Widget:
    def render(self):
        return "<widget>"

class Button(Widget):
    def render(self):
        base = super().render()
        return base.replace("widget", "button")
```

### Customize, Then Call Parent
```python
class EventHandler:
    def handle(self, event):
        print(f"Handling: {event}")

class LoggingHandler(EventHandler):
    def handle(self, event):
        print(f"Received event: {event}")  # Log first
        super().handle(event)               # Then handle
```

### Conditional Parent Call
```python
class Validator:
    def validate(self, data):
        return True

class StrictValidator(Validator):
    def validate(self, data):
        if not data:
            return False
        return super().validate(data)  # Only call if data exists
```

---

## Common Mistakes

### Forgetting `super().__init__()`
```python
# WRONG
class Child(Parent):
    def __init__(self, extra):
        self.extra = extra  # Parent not initialized!

# CORRECT
class Child(Parent):
    def __init__(self, extra):
        super().__init__()
        self.extra = extra
```

### Wrong Argument Order
```python
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# WRONG - mixing up arguments
class Dog(Animal):
    def __init__(self, breed, name, age):
        super().__init__(age, name)  # Swapped!

# CORRECT
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)
        self.breed = breed
```

---

## Key Takeaways

- `super()` returns a proxy to call parent methods
- Always use `super().__init__()` when overriding `__init__`
- `super()` follows the MRO, which matters for multiple inheritance
- Use `super()` to extend (not replace) parent behavior
- Python 3's `super()` needs no arguments
