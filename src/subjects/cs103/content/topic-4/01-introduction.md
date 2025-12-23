---
id: cs103-t4-intro
title: "Introduction to Polymorphism"
order: 1
---

## Introduction to Polymorphism

The word "polymorphism" comes from Greek, meaning "many forms." In programming, it means that the same interface can work with objects of different types. When you call `len()` on a string, list, or dictionary, you're using polymorphism—the same function adapts to different types.

Polymorphism is perhaps the most powerful concept in object-oriented programming. While encapsulation protects data and inheritance provides code reuse, polymorphism is what enables truly flexible, extensible designs. It's the reason you can write code that works with objects you haven't even created yet.

Consider Python's built-in `print()` function. It can print integers, strings, lists, dictionaries, and custom objects. It doesn't know about all possible types—it just calls `str()` on whatever you pass it, and your object's `__str__` method determines how it appears. That's polymorphism in action.

---

## Why Polymorphism Matters

Polymorphism is what makes object-oriented code truly flexible and maintainable:

### 1. Generic Code
Write once, work with many types:

```python
def print_all(items):
    for item in items:
        print(item)  # Works with any printable object

print_all([1, 2, 3])           # List of ints
print_all(["a", "b", "c"])     # List of strings
print_all([Dog(), Cat()])      # List of custom objects
```

### 2. Extensibility
Add new types without changing existing code:

```python
def calculate_total_area(shapes):
    return sum(shape.area() for shape in shapes)

# Works with any object that has area()
shapes = [Rectangle(4, 5), Circle(3), Triangle(3, 4)]
print(calculate_total_area(shapes))

# Add new shape later - existing code still works
shapes.append(Hexagon(2))
print(calculate_total_area(shapes))
```

### 3. Abstraction
Work with interfaces, not implementations:

```python
def save_data(storage, data):
    storage.save(data)  # Don't care what storage is

# Same function, different behaviors
save_data(FileStorage(), data)
save_data(DatabaseStorage(), data)
save_data(CloudStorage(), data)
```

---

## Types of Polymorphism

Python supports several forms of polymorphism:

### 1. Subtype Polymorphism (Method Overriding)
Children override parent methods:

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

### 2. Duck Typing
"If it walks like a duck and quacks like a duck...":

```python
# No inheritance required!
class Dog:
    def speak(self):
        return "Woof!"

class Robot:
    def speak(self):
        return "Beep!"

# Works with anything that has speak()
def make_it_speak(thing):
    print(thing.speak())
```

### 3. Operator Overloading
Custom behavior for operators:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # Uses __add__
```

---

## Polymorphism in Action

Consider a real-world example—a notification system:

```python
class Notification:
    def send(self, message):
        raise NotImplementedError

class EmailNotification(Notification):
    def __init__(self, email):
        self.email = email

    def send(self, message):
        print(f"Sending email to {self.email}: {message}")

class SMSNotification(Notification):
    def __init__(self, phone):
        self.phone = phone

    def send(self, message):
        print(f"Sending SMS to {self.phone}: {message}")

class PushNotification(Notification):
    def __init__(self, device_id):
        self.device_id = device_id

    def send(self, message):
        print(f"Pushing to {self.device_id}: {message}")

# Polymorphic function - works with any notification type
def notify_user(notification, message):
    notification.send(message)

# Same interface, different implementations
notify_user(EmailNotification("alice@example.com"), "Hello!")
notify_user(SMSNotification("555-1234"), "Hello!")
notify_user(PushNotification("device-abc"), "Hello!")
```

---

## Polymorphism vs Conditional Logic

Without polymorphism, you'd need conditionals everywhere:

```python
# WITHOUT polymorphism - fragile, hard to extend
def process_shape(shape):
    if isinstance(shape, Circle):
        return 3.14 * shape.radius ** 2
    elif isinstance(shape, Rectangle):
        return shape.width * shape.height
    elif isinstance(shape, Triangle):
        return 0.5 * shape.base * shape.height
    else:
        raise ValueError("Unknown shape")

# WITH polymorphism - clean, extensible
def process_shape(shape):
    return shape.area()  # Each shape knows its own area
```

The conditional approach has serious problems:
- **Every function** that works with shapes needs all those conditionals
- **Adding a new shape** means finding and updating every such function
- **Missing a case** causes runtime errors that might not surface until production

Polymorphism inverts this: instead of the caller knowing about every type, each type knows how to perform its own operations. The knowledge is where it belongs—inside the class itself.

---

## What You'll Learn

In this topic, you'll master:

1. **Method overriding** for subtype polymorphism—how child classes customize parent behavior
2. **Duck typing** for structural polymorphism—Python's "if it looks like a duck" philosophy
3. **Operator overloading** with special methods—making `+`, `==`, `<` work with your objects
4. **Callable and iterable objects**—making objects behave like functions and sequences
5. **Protocols** for typed duck typing—combining duck typing with type hints
6. **Best practices** for polymorphic design—when to use each approach

By the end of this topic, you'll understand how to design classes that can be used interchangeably, enabling flexible architectures that are easy to extend.

---

## The Open/Closed Principle Preview

Polymorphism is key to the Open/Closed Principle, which states that software should be open for extension but closed for modification. With polymorphic code:

- **Open for extension:** Add new types that implement the same interface
- **Closed for modification:** Existing code that uses that interface doesn't need to change

We'll explore this principle in detail in Topic 7 (Design Principles).

---

## Key Takeaways

- Polymorphism lets the same interface work with different types
- Python supports subtype, duck typing, and operator polymorphism
- Polymorphic code is more flexible and extensible
- Design around interfaces/behaviors, not specific types
- Duck typing is Python's primary polymorphism mechanism—inheritance is optional
- Polymorphism eliminates the need for type-checking conditionals
