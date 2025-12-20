---
id: cs103-t1-self-init
title: "self and __init__"
order: 4
---

## The `self` Parameter and `__init__` Constructor

Two concepts are fundamental to understanding Python classes: the `self` parameter and the `__init__` constructor. Together, they explain how Python tracks instance identity and initializes object state.

---

## Understanding `self`

The `self` parameter is Python's way of referring to the current instance. When you call a method on an object, Python automatically passes that object as the first argument.

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof!"

buddy = Dog("Buddy")
```

When you call `buddy.bark()`, Python internally translates this to `Dog.bark(buddy)`. The object `buddy` becomes the `self` parameter.

---

## `self` is Just a Convention

The name `self` is a strong convention, but Python doesn't enforce it:

```python
class Demo:
    def method(this):  # Works, but don't do this!
        return this.value

# Always use 'self' for clarity
class Demo:
    def method(self):  # Standard convention
        return self.value
```

**Always use `self`**—it's what every Python developer expects.

---

## How Method Calls Work

These two calls are equivalent:

```python
class Dog:
    def bark(self):
        return f"{self.name} says woof!"

buddy = Dog("Buddy")

# These are the same:
buddy.bark()           # Python adds self automatically
Dog.bark(buddy)        # Explicit call showing self
```

Understanding this helps explain error messages like "method takes 1 positional argument but 2 were given"—you forgot `self` in the method definition!

---

## The `__init__` Constructor

The `__init__` method is a special method (called a "dunder" method for its double underscores) that Python calls automatically when you create a new object:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        print(f"Creating account for {owner}...")
        self.owner = owner
        self.balance = balance
        self.transactions = []  # Initialize empty list

# Creating an account triggers __init__
acc = BankAccount("Alice", 1000)
# Prints: Creating account for Alice...
```

---

## What `__init__` Should Do

Use `__init__` to:

1. **Initialize all instance attributes:**
```python
def __init__(self, name, age):
    self.name = name
    self.age = age
    self.created_at = datetime.now()  # Derived value
```

2. **Validate input:**
```python
def __init__(self, age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    self.age = age
```

3. **Set up resources:**
```python
def __init__(self, filename):
    self.filename = filename
    self.data = self._load_data()  # Load initial data
```

---

## Default Parameter Values

Use default values for optional parameters:

```python
class User:
    def __init__(self, username, email=None, is_admin=False):
        self.username = username
        self.email = email
        self.is_admin = is_admin

# Various ways to create users
user1 = User("alice")
user2 = User("bob", "bob@example.com")
user3 = User("admin", "admin@example.com", is_admin=True)
```

---

## The Mutable Default Argument Trap

Never use mutable objects (lists, dicts) as default values:

```python
# WRONG - shared list across all instances!
class ShoppingCart:
    def __init__(self, items=[]):
        self.items = items

cart1 = ShoppingCart()
cart1.items.append("apple")
cart2 = ShoppingCart()
print(cart2.items)  # ['apple'] - BUG! Should be empty
```

**Fix:** Use `None` and create the list inside `__init__`:

```python
# CORRECT
class ShoppingCart:
    def __init__(self, items=None):
        self.items = items if items is not None else []

cart1 = ShoppingCart()
cart1.items.append("apple")
cart2 = ShoppingCart()
print(cart2.items)  # [] - Correct!
```

---

## `__init__` vs `__new__`

Python actually has two steps in object creation:

1. `__new__`: Creates the instance (rarely overridden)
2. `__init__`: Initializes the instance (commonly used)

```python
class Demo:
    def __new__(cls):
        print("Creating instance...")
        instance = super().__new__(cls)
        return instance

    def __init__(self):
        print("Initializing instance...")

d = Demo()
# Output:
# Creating instance...
# Initializing instance...
```

You'll typically only use `__init__`. Override `__new__` for advanced patterns like singletons.

---

## Using `self` in Methods

Always use `self` to access instance attributes and other methods:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

    def is_square(self):
        return self.width == self.height

    def scale(self, factor):
        self.width *= factor
        self.height *= factor
        # Can call other methods
        return self.area()  # Return new area
```

---

## Common Mistakes

### Forgetting `self` in method definition:
```python
class Counter:
    def increment():  # WRONG - missing self
        self.count += 1  # NameError: name 'self' is not defined
```

### Forgetting `self.` when accessing attributes:
```python
class Counter:
    def __init__(self):
        count = 0  # WRONG - local variable, lost after __init__

    def increment(self):
        self.count += 1  # ERROR: self.count doesn't exist
```

### Not calling parent `__init__` in inheritance:
```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        # WRONG - forgot to call parent __init__
        self.breed = breed
        # self.name is never set!

# CORRECT:
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent first
        self.breed = breed
```

---

## Key Takeaways

- `self` refers to the current instance; Python passes it automatically
- `__init__` is called automatically when creating objects to initialize state
- Always initialize all attributes in `__init__` for predictability
- Never use mutable defaults (lists, dicts) in `__init__` parameters
- Use `self.` to access instance attributes and methods
- Forgetting `self` is a common source of bugs
