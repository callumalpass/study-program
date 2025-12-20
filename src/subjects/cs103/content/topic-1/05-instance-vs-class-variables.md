---
id: cs103-t1-instance-class
title: "Instance vs Class Variables"
order: 5
---

## Instance vs Class Variables

Python classes have two types of variables: **instance variables** (unique to each object) and **class variables** (shared by all objects). Understanding the difference is crucial for avoiding subtle bugs.

---

## Instance Variables

Instance variables are created with `self.` and belong to a specific object:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name  # Instance variable
        self.age = age    # Instance variable

buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)

# Each object has its own copy
print(buddy.name)    # "Buddy"
print(max_dog.name)  # "Max"

# Changing one doesn't affect others
buddy.age = 4
print(max_dog.age)   # Still 5
```

---

## Class Variables

Class variables are defined in the class body and shared by all instances:

```python
class Dog:
    species = "Canis familiaris"  # Class variable
    count = 0                      # Class variable

    def __init__(self, name):
        self.name = name          # Instance variable
        Dog.count += 1            # Modify class variable

buddy = Dog("Buddy")
max_dog = Dog("Max")

# Shared across all instances
print(buddy.species)    # "Canis familiaris"
print(max_dog.species)  # "Canis familiaris"
print(Dog.count)        # 2
```

---

## Comparison Table

| Aspect | Instance Variables | Class Variables |
|--------|-------------------|-----------------|
| **Defined in** | `__init__` (using `self.`) | Class body (outside methods) |
| **Scope** | Unique to each object | Shared by all instances |
| **Access** | `self.variable` or `obj.variable` | `ClassName.variable` or `self.variable` |
| **Use case** | Object-specific data | Constants, counters, defaults |
| **Memory** | One copy per object | One copy total |

---

## How Python Looks Up Attributes

When you access an attribute, Python searches in this order:

1. Instance's `__dict__` (instance variables)
2. Class's `__dict__` (class variables)
3. Parent classes (inheritance)

```python
class Demo:
    class_var = "shared"

    def __init__(self):
        self.instance_var = "unique"

d = Demo()

# Check where variables are stored
print(d.__dict__)       # {'instance_var': 'unique'}
print(Demo.__dict__)    # {'class_var': 'shared', '__init__': ..., ...}
```

---

## The Shadowing Trap

Assigning to `self.variable` creates an *instance* variable, even if a class variable with the same name exists:

```python
class Config:
    debug = False  # Class variable

c1 = Config()
c2 = Config()

# This creates an INSTANCE variable, shadowing the class variable
c1.debug = True

print(c1.debug)       # True (instance variable)
print(c2.debug)       # False (class variable)
print(Config.debug)   # False (class variable unchanged)
```

**To modify the class variable for all instances:**
```python
Config.debug = True   # Changes for all current and future instances
print(c2.debug)       # True
```

---

## When to Use Each

### Use Instance Variables For:
- Data that varies between objects (name, balance, score)
- Object-specific state
- Data that changes during the object's lifetime

```python
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0
        self.health = 100
```

### Use Class Variables For:
- Constants shared by all instances
- Counting instances
- Default values that apply to all objects
- Configuration shared across the class

```python
class Player:
    MAX_HEALTH = 100        # Constant
    player_count = 0        # Counter
    default_speed = 5       # Default value

    def __init__(self, name):
        self.name = name
        self.health = Player.MAX_HEALTH  # Use constant
        Player.player_count += 1
```

---

## Class Variables with Mutable Types

Be careful with mutable class variables—they're shared and can cause unexpected behavior:

```python
class Group:
    members = []  # DANGER: Shared mutable list!

    def add_member(self, name):
        self.members.append(name)

g1 = Group()
g2 = Group()

g1.add_member("Alice")
print(g2.members)  # ['Alice'] - Shared! Probably not intended
```

**Fix:** Initialize mutable containers as instance variables:

```python
class Group:
    def __init__(self):
        self.members = []  # Each instance gets its own list

g1 = Group()
g2 = Group()

g1.add_member("Alice")
print(g2.members)  # [] - Independent
```

---

## Accessing Class Variables

You can access class variables through either the class or an instance:

```python
class Student:
    school = "Python Academy"

s = Student()

# Both work for reading
print(Student.school)  # "Python Academy"
print(s.school)        # "Python Academy"

# For modification, ALWAYS use the class name
Student.school = "Code School"
print(s.school)        # "Code School"
```

---

## Example: Instance Counter

A common pattern using class variables:

```python
class User:
    total_users = 0

    def __init__(self, username):
        self.username = username
        self.user_id = User.total_users  # Assign ID before incrementing
        User.total_users += 1

    @classmethod
    def get_user_count(cls):
        return cls.total_users

# Create users
u1 = User("alice")
u2 = User("bob")
u3 = User("charlie")

print(u1.user_id)           # 0
print(u2.user_id)           # 1
print(User.get_user_count())  # 3
```

---

## Key Takeaways

- Instance variables (`self.x`) are unique to each object
- Class variables are shared by all instances
- Python looks up attributes: instance first, then class
- Assigning to `self.x` creates/shadows an instance variable
- Modify class variables through `ClassName.var`, not `self.var`
- Avoid mutable class variables (lists, dicts) unless intentionally shared
- Use instance variables for object-specific state, class variables for shared constants/counters
