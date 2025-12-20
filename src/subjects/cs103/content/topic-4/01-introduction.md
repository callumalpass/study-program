## Introduction to Polymorphism

The word "polymorphism" comes from Greek, meaning "many forms." In programming, it means that the same interface can work with objects of different types. When you call `len()` on a string, list, or dictionary, you're using polymorphism—the same function adapts to different types.

---

## Why Polymorphism Matters

Polymorphism is what makes object-oriented code truly flexible:

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

Without polymorphism, you'd need conditionals:

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

---

## What You'll Learn

In this topic, you'll master:

1. **Method overriding** for subtype polymorphism
2. **Duck typing** for structural polymorphism
3. **Operator overloading** with special methods
4. **Callable and iterable objects**
5. **Protocols** for typed duck typing
6. **Best practices** for polymorphic design

---

## Key Takeaways

- Polymorphism lets the same interface work with different types
- Python supports subtype, duck typing, and operator polymorphism
- Polymorphic code is more flexible and extensible
- Design around interfaces/behaviors, not specific types
