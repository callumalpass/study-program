---
id: cs103-t1-creating
title: "Creating Objects"
order: 3
---

## Creating Objects: Instances in Action

An **object** (or **instance**) is a specific realization of a class. While the class defines the structure, each object has its own identity and state. Creating an object is called **instantiation**—you're creating an "instance" of the class.

Think of it this way: if `Dog` is the concept of a dog (the class), then `buddy` and `max_dog` are actual, specific dogs (objects). The class tells us that dogs have names, ages, and can bark. Each object fills in those details with specific values.

---

## Basic Instantiation

Create objects by calling the class like a function:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

# Creating objects (instantiation)
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)
luna = Dog("Luna", 2)
```

Each call to `Dog(...)` creates a new, independent object with its own state. Here's what happens behind the scenes when you write `buddy = Dog("Buddy", 3)`:

1. Python creates a new, empty object
2. Python calls `__init__(self, "Buddy", 3)` with the new object as `self`
3. `__init__` sets up the object's attributes
4. The finished object is assigned to `buddy`

You never call `__init__` directly—Python handles that automatically.

---

## Object Identity and State

Every object has three fundamental characteristics:

1. **Identity:** A unique identifier (memory address) that distinguishes it from all other objects
2. **State:** The values of its attributes at any given moment
3. **Behavior:** The methods it can perform

```python
# Each object has its own state
print(buddy.name)      # "Buddy"
print(max_dog.name)    # "Max"

# Different objects, different identities
print(buddy is max_dog)    # False
print(id(buddy))           # Unique memory address
print(id(max_dog))         # Different address

# But they share behavior (methods)
print(buddy.bark())        # "Buddy says woof!"
print(max_dog.bark())      # "Max says woof!"
```

The `id()` function returns an object's unique identifier (its memory address in CPython). Two objects created separately will always have different identities, even if their attribute values are the same:

```python
dog1 = Dog("Buddy", 3)
dog2 = Dog("Buddy", 3)

print(dog1.name == dog2.name)  # True - same value
print(dog1 == dog2)            # False (by default) - different objects
print(dog1 is dog2)            # False - different identities
```

This distinction between **value equality** (`==`) and **identity** (`is`) is crucial in Python.

---

## Modifying Object State

Objects are mutable—you can change their attributes after creation:

```python
class Counter:
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1

    def reset(self):
        self.value = 0

# Create and modify
counter = Counter()
print(counter.value)    # 0

counter.increment()
counter.increment()
print(counter.value)    # 2

counter.reset()
print(counter.value)    # 0
```

---

## Direct Attribute Access

You can access and modify attributes directly:

```python
buddy = Dog("Buddy", 3)

# Read attributes
print(buddy.name)       # "Buddy"
print(buddy.age)        # 3

# Modify attributes
buddy.age = 4
print(buddy.age)        # 4

# Add new attributes (Python allows this!)
buddy.breed = "Golden Retriever"
print(buddy.breed)      # "Golden Retriever"
```

> **Note:** While Python allows adding attributes dynamically, it's generally better practice to define all attributes in `__init__` for predictability.

---

## Multiple Objects, Independent State

Each object maintains its own copy of instance variables:

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            return True
        return False

# Create two independent accounts
alice_account = BankAccount("Alice", 1000)
bob_account = BankAccount("Bob", 500)

# Operations on one don't affect the other
alice_account.deposit(200)
print(alice_account.balance)  # 1200
print(bob_account.balance)    # 500 (unchanged)
```

---

## Objects in Collections

Objects can be stored in lists, dictionaries, and other collections:

```python
# List of objects
dogs = [
    Dog("Buddy", 3),
    Dog("Max", 5),
    Dog("Luna", 2)
]

# Iterate and use
for dog in dogs:
    print(f"{dog.name} is {dog.age} years old")

# Find specific objects
oldest = max(dogs, key=lambda d: d.age)
print(f"Oldest dog: {oldest.name}")

# Dictionary with objects
pets = {
    "dog": Dog("Buddy", 3),
    "age_sum": sum(d.age for d in dogs)
}
```

---

## Object References

Variables hold **references** to objects, not the objects themselves:

```python
dog1 = Dog("Buddy", 3)
dog2 = dog1  # dog2 points to the SAME object

dog2.age = 10
print(dog1.age)  # 10 - both variables point to same object!

# To create a copy, make a new object
dog3 = Dog(dog1.name, dog1.age)  # New, independent object
dog3.age = 5
print(dog1.age)  # 10 (unchanged)
```

---

## Checking Object Types

Use `type()` and `isinstance()` to check object types:

```python
buddy = Dog("Buddy", 3)

# Check exact type
print(type(buddy))              # <class '__main__.Dog'>
print(type(buddy) == Dog)       # True

# Check if instance of class (preferred)
print(isinstance(buddy, Dog))   # True
print(isinstance(buddy, object))  # True (everything is an object)
```

---

## Common Mistakes

**Forgetting that variables hold references:**
```python
dog1 = Dog("Buddy", 3)
dog2 = dog1  # Not a copy!
dog2.age = 10
print(dog1.age)  # 10 - oops, we changed dog1 too!
```

**Comparing with `==` when you mean `is` (or vice versa):**
```python
dog1 = Dog("Buddy", 3)
dog2 = Dog("Buddy", 3)

# These two dogs have the same values but are different objects
if dog1 == dog2:  # False by default
    print("Same dog")  # Won't print

# To compare values, you'd need to implement __eq__ (covered later)
```

**Adding attributes outside `__init__`:**
```python
buddy = Dog("Buddy", 3)
buddy.breed = "Golden"  # Works, but not recommended

max_dog = Dog("Max", 5)
print(max_dog.breed)  # AttributeError! Max doesn't have breed
```

Always define all expected attributes in `__init__` for consistency.

---

## Key Takeaways

- Objects are created by calling the class: `obj = ClassName(args)`
- Each object has its own identity, state (attributes), and behavior (methods)
- Instance variables are independent per object
- Variables hold references to objects, not the objects themselves
- Use `isinstance()` to check object types (preferred over `type()`)
- Objects can be stored in any collection (lists, dicts, sets)
- Understand the difference between value equality (`==`) and identity (`is`)
- When you assign one object variable to another, both point to the same object
