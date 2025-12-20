---
id: cs103-t4-best-practices
title: "Best Practices"
order: 7
---

## Best Practices and Common Mistakes

Polymorphism is powerful, but misuse leads to confusing code. Follow these practices to write clean, predictable polymorphic code.

---

## Best Practice 1: Keep Interfaces Small

Small interfaces are easier to implement and understand:

```python
# BAD: Giant interface
class DataHandler(Protocol):
    def read(self) -> str: ...
    def write(self, data: str) -> None: ...
    def delete(self) -> None: ...
    def backup(self) -> None: ...
    def restore(self) -> None: ...
    def validate(self) -> bool: ...
    def compress(self) -> bytes: ...
    def encrypt(self) -> bytes: ...

# GOOD: Focused interfaces
class Readable(Protocol):
    def read(self) -> str: ...

class Writable(Protocol):
    def write(self, data: str) -> None: ...

class Deletable(Protocol):
    def delete(self) -> None: ...

# Combine as needed
def process(source: Readable, dest: Writable) -> None:
    dest.write(source.read())
```

---

## Best Practice 2: Define `__repr__` for All Classes

Debugging polymorphic code is much easier with good representations:

```python
class Shape:
    pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def __repr__(self):
        return f"Circle(radius={self.radius})"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __repr__(self):
        return f"Rectangle(width={self.width}, height={self.height})"

# Easy to debug
shapes = [Circle(5), Rectangle(3, 4), Circle(2)]
print(shapes)  # [Circle(radius=5), Rectangle(width=3, height=4), Circle(radius=2)]
```

---

## Best Practice 3: Return NotImplemented, Don't Raise

For operators that can't handle a type:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        # DON'T: raise TypeError("Can't add Vector and ...")
        return NotImplemented  # Let Python try other.__radd__

    def __radd__(self, other):
        return self.__add__(other)
```

---

## Best Practice 4: Use `@total_ordering`

Don't implement all six comparison methods manually:

```python
from functools import total_ordering

@total_ordering
class Priority:
    def __init__(self, level, name):
        self.level = level
        self.name = name

    def __eq__(self, other):
        if not isinstance(other, Priority):
            return NotImplemented
        return self.level == other.level

    def __lt__(self, other):
        if not isinstance(other, Priority):
            return NotImplemented
        return self.level < other.level

    # __le__, __gt__, __ge__ are auto-generated!
```

---

## Best Practice 5: Prefer Duck Typing Over isinstance()

Write for capabilities, not types:

```python
# BAD: Type checking
def save(storage):
    if isinstance(storage, FileStorage):
        storage.write_to_file()
    elif isinstance(storage, DatabaseStorage):
        storage.insert()
    elif isinstance(storage, CloudStorage):
        storage.upload()

# GOOD: Duck typing
def save(storage):
    storage.save()  # All storage types implement save()
```

---

## Best Practice 6: Keep Operator Semantics Intuitive

`+` should mean addition or concatenation, not something unexpected:

```python
# GOOD: Intuitive
class Vector:
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

class String:
    def __add__(self, other):
        return String(self.value + other.value)

# BAD: Confusing
class User:
    def __add__(self, other):
        return Team(self, other)  # What? Users + Users = Team?

class File:
    def __mul__(self, n):
        return [self.copy() for _ in range(n)]  # Weird!
```

---

## Common Mistake 1: Forgetting `__ne__` Implications

Python 3 auto-generates `__ne__` from `__eq__`, but be careful:

```python
class Item:
    def __init__(self, id):
        self.id = id

    def __eq__(self, other):
        if not isinstance(other, Item):
            return NotImplemented
        return self.id == other.id

    # Python 3 auto-generates __ne__ as "not __eq__"
    # But if __eq__ returns NotImplemented, __ne__ might not work right

    # Explicit is safer:
    def __ne__(self, other):
        result = self.__eq__(other)
        if result is NotImplemented:
            return result
        return not result
```

---

## Common Mistake 2: Inconsistent Comparison Methods

Make sure your comparisons are consistent:

```python
# BAD: Inconsistent
class Confusing:
    def __lt__(self, other):
        return self.a < other.a

    def __eq__(self, other):
        return self.b == other.b  # Different attribute!

# GOOD: Consistent
class Consistent:
    def __lt__(self, other):
        return (self.a, self.b) < (other.a, other.b)

    def __eq__(self, other):
        return (self.a, self.b) == (other.a, other.b)
```

---

## Common Mistake 3: Breaking Substitutability

Children must honor parent contracts:

```python
# BAD: Child breaks contract
class Bird:
    def fly(self) -> str:
        return "flying"

class Penguin(Bird):
    def fly(self) -> str:
        raise NotImplementedError("Penguins can't fly!")

def make_fly(bird: Bird) -> None:
    print(bird.fly())  # Crashes for Penguin!

# GOOD: Redesign the hierarchy
class Bird:
    def move(self) -> str:
        raise NotImplementedError

class FlyingBird(Bird):
    def move(self) -> str:
        return "flying"

class SwimmingBird(Bird):
    def move(self) -> str:
        return "swimming"
```

---

## Common Mistake 4: Missing `__hash__` with `__eq__`

If you define `__eq__`, objects become unhashable by default:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    # Without __hash__, can't use in sets or as dict keys!

p = Point(1, 2)
{p}  # TypeError: unhashable type: 'Point'

# Fix: Add __hash__
def __hash__(self):
    return hash((self.x, self.y))
```

---

## Summary Checklist

When writing polymorphic code:

- [ ] Keep interfaces small and focused
- [ ] Implement `__repr__` for debugging
- [ ] Return `NotImplemented` for unsupported operator types
- [ ] Use `@total_ordering` for comparable classes
- [ ] Prefer duck typing over `isinstance()`
- [ ] Keep operator semantics intuitive
- [ ] Ensure comparison methods are consistent
- [ ] Add `__hash__` when defining `__eq__`
- [ ] Don't break substitutability in child classes

---

## Key Takeaways

- Small interfaces are better than large ones
- Always implement `__repr__` for debugging
- Return `NotImplemented`, don't raise TypeError
- Use `@total_ordering` to reduce boilerplate
- Duck typing is more Pythonic than type checking
- Keep operator meanings intuitive and obvious
- Maintain consistency in comparison methods
