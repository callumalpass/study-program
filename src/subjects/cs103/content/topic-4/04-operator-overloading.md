---
id: cs103-t4-operator
title: "Operator Overloading"
order: 4
---

## Operator Overloading

Special methods let your classes work with Python's built-in operators. When you write `a + b`, Python calls `a.__add__(b)`. By implementing these methods, you give your objects natural, intuitive syntax.

---

## Basic Operator Overloading

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        """Vector + Vector"""
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """Vector - Vector"""
        return Vector(self.x - other.x, self.y - other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)

print(v1 + v2)  # Vector(4, 6)
print(v2 - v1)  # Vector(2, 2)
```

### Mathematical Interpretation

Vector addition is defined component-wise:

$$\vec{v_1} + \vec{v_2} = \begin{bmatrix} x_1 \\ y_1 \end{bmatrix} + \begin{bmatrix} x_2 \\ y_2 \end{bmatrix} = \begin{bmatrix} x_1 + x_2 \\ y_1 + y_2 \end{bmatrix}$$

For our example:
$$\begin{bmatrix} 1 \\ 2 \end{bmatrix} + \begin{bmatrix} 3 \\ 4 \end{bmatrix} = \begin{bmatrix} 4 \\ 6 \end{bmatrix}$$

Similarly for subtraction:
$$\vec{v_2} - \vec{v_1} = \begin{bmatrix} 3 \\ 4 \end{bmatrix} - \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 2 \\ 2 \end{bmatrix}$$

---

## Arithmetic Operators

| Operator | Method | Example |
|----------|--------|---------|
| `+` | `__add__` | `a + b` |
| `-` | `__sub__` | `a - b` |
| `*` | `__mul__` | `a * b` |
| `/` | `__truediv__` | `a / b` |
| `//` | `__floordiv__` | `a // b` |
| `%` | `__mod__` | `a % b` |
| `**` | `__pow__` | `a ** b` |
| `-` (unary) | `__neg__` | `-a` |
| `+` (unary) | `__pos__` | `+a` |
| `abs()` | `__abs__` | `abs(a)` |

```python
class Money:
    def __init__(self, dollars, cents=0):
        self.total_cents = dollars * 100 + cents

    def __add__(self, other):
        return Money(0, self.total_cents + other.total_cents)

    def __mul__(self, factor):
        return Money(0, int(self.total_cents * factor))

    def __repr__(self):
        return f"${self.total_cents // 100}.{self.total_cents % 100:02d}"

price = Money(19, 99)
print(price + Money(5))      # $24.99
print(price * 3)              # $59.97
```

---

## Reverse Operators

When `a + b` fails (because `a` doesn't know how to add `b`), Python tries `b.__radd__(a)`:

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __mul__(self, scalar):
        """Vector * scalar"""
        return Vector(self.x * scalar, self.y * scalar)

    def __rmul__(self, scalar):
        """scalar * Vector"""
        return self.__mul__(scalar)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(1, 2)
print(v * 3)   # Vector(3, 6) - uses __mul__
print(3 * v)   # Vector(3, 6) - uses __rmul__
```

### Scalar Multiplication

Multiplying a vector by a scalar scales each component:

$$k \cdot \vec{v} = k \cdot \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} k \cdot x \\ k \cdot y \end{bmatrix}$$

For our example:
$$3 \cdot \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ 6 \end{bmatrix}$$

Note that scalar multiplication is **commutative**: $k \cdot \vec{v} = \vec{v} \cdot k$, which is why both `v * 3` and `3 * v` work.

---

## Comparison Operators

| Operator | Method |
|----------|--------|
| `==` | `__eq__` |
| `!=` | `__ne__` |
| `<` | `__lt__` |
| `<=` | `__le__` |
| `>` | `__gt__` |
| `>=` | `__ge__` |

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade

    def __repr__(self):
        return f"{self.name}({self.grade})"

students = [
    Student("Alice", 90),
    Student("Bob", 85),
    Student("Charlie", 92)
]

print(sorted(students))  # [Bob(85), Alice(90), Charlie(92)]
print(max(students))     # Charlie(92)
```

---

## Using `@total_ordering`

Implement just `__eq__` and one comparison, get the rest free:

```python
from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor, patch):
        self.major = major
        self.minor = minor
        self.patch = patch

    def __eq__(self, other):
        return (self.major, self.minor, self.patch) == \
               (other.major, other.minor, other.patch)

    def __lt__(self, other):
        return (self.major, self.minor, self.patch) < \
               (other.major, other.minor, other.patch)

    def __repr__(self):
        return f"v{self.major}.{self.minor}.{self.patch}"

v1 = Version(1, 2, 3)
v2 = Version(1, 2, 4)
v3 = Version(2, 0, 0)

print(v1 < v2)   # True
print(v2 <= v3)  # True (auto-generated)
print(v3 > v1)   # True (auto-generated)
```

### Comparison Relations

The `@total_ordering` decorator automatically generates missing comparison methods based on `__eq__` and `__lt__`:

Given $a < b$, we can derive:
- $a \leq b \equiv (a < b) \lor (a = b)$
- $a > b \equiv \neg(a \leq b)$
- $a \geq b \equiv \neg(a < b)$
- $a \neq b \equiv \neg(a = b)$

For versions: $v_1 = 1.2.3 < v_2 = 1.2.4$ because $(1, 2, 3) < (1, 2, 4)$ lexicographically.

---

## Augmented Assignment

Operators like `+=` can be customized:

```python
class Counter:
    def __init__(self, value=0):
        self.value = value

    def __iadd__(self, amount):
        """c += amount"""
        self.value += amount
        return self  # Must return self!

    def __isub__(self, amount):
        """c -= amount"""
        self.value -= amount
        return self

    def __repr__(self):
        return f"Counter({self.value})"

c = Counter(10)
c += 5
print(c)  # Counter(15)
c -= 3
print(c)  # Counter(12)
```

---

## Returning NotImplemented

When your operator can't handle a type, return `NotImplemented` (don't raise an exception):

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        if isinstance(other, Point):
            return Point(self.x + other.x, self.y + other.y)
        if isinstance(other, (int, float)):
            return Point(self.x + other, self.y + other)
        return NotImplemented  # Let Python try other.__radd__

    def __radd__(self, other):
        return self.__add__(other)  # Same logic

p = Point(1, 2)
print(p + Point(3, 4))  # Uses __add__
print(p + 5)            # Uses __add__
print(5 + p)            # Uses __radd__
```

---

## Keeping Operators Intuitive

Only overload operators when the meaning is obvious:

```python
# GOOD - intuitive meanings
class Vector:
    def __add__(self, other): ...      # Vector addition
    def __mul__(self, scalar): ...     # Scalar multiplication

class Set:
    def __or__(self, other): ...       # Union
    def __and__(self, other): ...      # Intersection

# BAD - confusing meanings
class User:
    def __add__(self, other):          # What does User + User mean?
        return Team(self, other)       # Not intuitive!
```

---

## Key Takeaways

- Implement `__add__`, `__sub__`, etc. for arithmetic operators
- Use `__radd__` for reverse operations (e.g., `5 + obj`)
- Use `@total_ordering` to minimize comparison method implementations
- Return `NotImplemented` when you can't handle a type
- Keep operator semantics intuitive—don't surprise users
