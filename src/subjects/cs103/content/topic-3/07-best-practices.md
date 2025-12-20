## Best Practices and Common Mistakes

Inheritance is powerful but easy to misuse. Understanding when to use it—and when not to—separates good OOP design from tangled hierarchies.

---

## Best Practice 1: Favor Composition Over Inheritance

The most important rule: ask "is-a" vs "has-a".

```python
# BAD: A car is NOT an engine!
class Engine:
    def start(self):
        return "Vroom!"

class Car(Engine):  # Wrong relationship
    pass

# GOOD: A car HAS an engine
class Car:
    def __init__(self):
        self.engine = Engine()

    def start(self):
        return self.engine.start()
```

**Benefits of composition:**
- Looser coupling
- Easier to change implementations
- More flexible at runtime
- Clearer relationships

---

## Best Practice 2: Keep Hierarchies Shallow

Deep hierarchies are hard to understand and maintain:

```python
# BAD: Too deep (7 levels!)
class Animal: pass
class Mammal(Animal): pass
class Canine(Mammal): pass
class DomesticCanine(Canine): pass
class Dog(DomesticCanine): pass
class Labrador(Dog): pass
class YellowLabrador(Labrador): pass

# BETTER: Flat with composition
class Dog:
    def __init__(self, breed, color):
        self.breed = breed
        self.color = color
        self.behavior = DomesticBehavior()
```

**Rule of thumb:** Keep hierarchies to 2-3 levels.

---

## Best Practice 3: Always Call `super().__init__()`

Unless you have a very specific reason not to:

```python
class Parent:
    def __init__(self, name):
        self.name = name

# WRONG
class Child(Parent):
    def __init__(self, name, age):
        self.age = age  # Forgot parent!
        # self.name doesn't exist!

# CORRECT
class Child(Parent):
    def __init__(self, name, age):
        super().__init__(name)
        self.age = age
```

---

## Best Practice 4: Respect the Liskov Substitution Principle

Child classes must be usable anywhere parent classes are expected:

```python
# BAD: Child breaks parent's contract
class Bird:
    def fly(self):
        return "Flying"

class Penguin(Bird):
    def fly(self):
        raise Exception("Can't fly!")  # Breaks the contract!

def make_birds_fly(birds):
    for bird in birds:
        bird.fly()  # Crashes on Penguin!

# BETTER: Redesign the hierarchy
class Bird:
    def move(self):
        pass

class FlyingBird(Bird):
    def move(self):
        return "Flying"

class SwimmingBird(Bird):
    def move(self):
        return "Swimming"
```

---

## Best Practice 5: Use ABCs for Interface Contracts

Make requirements explicit:

```python
from abc import ABC, abstractmethod

class Repository(ABC):
    @abstractmethod
    def save(self, item):
        pass

    @abstractmethod
    def find(self, id):
        pass

    @abstractmethod
    def delete(self, id):
        pass

# Now any Repository implementation must have all three methods
class DatabaseRepository(Repository):
    def save(self, item): ...
    def find(self, id): ...
    def delete(self, id): ...
```

---

## Best Practice 6: Document Inheritance Expectations

Be clear about what should and shouldn't be overridden:

```python
class Framework:
    def process(self):
        """
        Main entry point. DO NOT OVERRIDE.
        Override before_process(), do_process(), and after_process() instead.
        """
        self.before_process()
        result = self.do_process()
        self.after_process()
        return result

    def before_process(self):
        """Override to add pre-processing. Call super() to chain."""
        pass

    def do_process(self):
        """MUST OVERRIDE: Implement your processing logic here."""
        raise NotImplementedError

    def after_process(self):
        """Override to add post-processing. Call super() to chain."""
        pass
```

---

## Common Mistake 1: Forgetting `super().__init__()`

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        self.breed = breed  # Missing super()!

buddy = Dog("Buddy", "Lab")
print(buddy.name)  # AttributeError!
```

---

## Common Mistake 2: Overusing Inheritance for Code Reuse

```python
# BAD: Using inheritance just to reuse log()
class Logger:
    def log(self, msg):
        print(f"[LOG] {msg}")

class UserService(Logger):  # UserService is-not-a Logger!
    def create_user(self, name):
        self.log(f"Creating user {name}")

# BETTER: Composition
class UserService:
    def __init__(self, logger):
        self.logger = logger

    def create_user(self, name):
        self.logger.log(f"Creating user {name}")
```

---

## Common Mistake 3: Changing Method Signatures

```python
# BAD: Child has different signature
class Saver:
    def save(self, data):
        pass

class FileSaver(Saver):
    def save(self, data, filename):  # Different signature!
        pass

# GOOD: Compatible signature
class FileSaver(Saver):
    def save(self, data, filename=None):  # Optional parameter
        pass
```

---

## Common Mistake 4: Multiple Inheritance Chaos

```python
# CONFUSING: Multiple parents with conflicting methods
class A:
    def process(self):
        return "A"

class B:
    def process(self):
        return "B"

class C(A, B):  # Which process()?
    pass

# CLEARER: Use mixins for orthogonal concerns
class LoggingMixin:
    def log(self, msg):
        print(msg)

class CachingMixin:
    def cache(self, key, value):
        self._cache[key] = value

class Service(LoggingMixin, CachingMixin):
    pass  # No conflicts - different methods
```

---

## When to Use Inheritance

**Use inheritance when:**
- There's a clear "is-a" relationship
- You need polymorphism (treating children as parents)
- Framework requires it
- Template method pattern fits well

**Use composition when:**
- There's a "has-a" relationship
- You need runtime flexibility
- You want to avoid tight coupling
- Multiple behaviors need to be combined

---

## Summary Checklist

Before using inheritance, verify:

- [ ] Is this a true "is-a" relationship?
- [ ] Would composition be simpler?
- [ ] Is the hierarchy shallow (2-3 levels)?
- [ ] Does `super().__init__()` get called?
- [ ] Do children respect the parent's contract?
- [ ] Are method signatures compatible?
- [ ] Is the inheritance documented?

---

## Key Takeaways

- Prefer composition over inheritance for most code reuse
- Keep hierarchies shallow (2-3 levels maximum)
- Always call `super().__init__()` in child constructors
- Respect Liskov Substitution: children must work like parents
- Use ABCs for explicit interface contracts
- Document what should and shouldn't be overridden
