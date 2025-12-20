## Special Methods (Dunder Methods)

Python uses "dunder" methods (double underscore, like `__init__`) to define how objects behave with built-in operations. These special methods let your classes integrate seamlessly with Python's syntax and built-in functions.

---

## String Representation: `__str__` and `__repr__`

Control how objects are displayed as strings:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """Human-readable string (for print, str())"""
        return f"Point at ({self.x}, {self.y})"

    def __repr__(self):
        """Developer string (for debugging, repr())"""
        return f"Point(x={self.x}, y={self.y})"

p = Point(3, 4)
print(p)           # Point at (3, 4) - uses __str__
print(repr(p))     # Point(x=3, y=4) - uses __repr__
print([p])         # [Point(x=3, y=4)] - uses __repr__ in containers
```

**Best practices:**
- `__repr__`: Should be unambiguous, ideally valid Python to recreate the object
- `__str__`: Should be readable and user-friendly
- If you only implement one, implement `__repr__`—Python uses it as fallback for `__str__`

---

## Equality: `__eq__` and `__hash__`

Define when two objects are considered equal:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

p1 = Point(3, 4)
p2 = Point(3, 4)
p3 = Point(1, 2)

print(p1 == p2)    # True
print(p1 == p3)    # False

# With __hash__, points can be used in sets and as dict keys
points = {p1, p2, p3}
print(len(points))  # 2 (p1 and p2 are equal)
```

**Note:** If you define `__eq__`, Python sets `__hash__` to `None` by default (making objects unhashable). Define `__hash__` explicitly if you need hashability.

---

## Comparison Operators

Implement rich comparison for sorting and comparing:

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __lt__(self, other):
        """Less than (<)"""
        return self.grade < other.grade

    def __le__(self, other):
        """Less than or equal (<=)"""
        return self.grade <= other.grade

    def __gt__(self, other):
        """Greater than (>)"""
        return self.grade > other.grade

    def __ge__(self, other):
        """Greater than or equal (>=)"""
        return self.grade >= other.grade

students = [Student("Alice", 90), Student("Bob", 85), Student("Charlie", 95)]
students.sort()  # Uses __lt__
print([s.name for s in students])  # ['Bob', 'Alice', 'Charlie']
```

**Shortcut:** Use `@functools.total_ordering` to only define `__eq__` and one comparison:

```python
from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade
    # __le__, __gt__, __ge__ are auto-generated!
```

---

## Length and Boolean: `__len__` and `__bool__`

Control behavior with `len()` and in boolean contexts:

```python
class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

    def __bool__(self):
        return len(self.songs) > 0

playlist = Playlist()
print(len(playlist))     # 0
print(bool(playlist))    # False

playlist.add("Song 1")
print(len(playlist))     # 1
print(bool(playlist))    # True

# Works in if statements
if playlist:
    print("Playlist has songs!")
```

---

## Container Protocol: `__getitem__`, `__setitem__`, `__contains__`

Make objects indexable and iterable:

```python
class Matrix:
    def __init__(self, rows, cols):
        self.data = [[0] * cols for _ in range(rows)]
        self.rows = rows
        self.cols = cols

    def __getitem__(self, pos):
        """Access: matrix[row, col]"""
        row, col = pos
        return self.data[row][col]

    def __setitem__(self, pos, value):
        """Assign: matrix[row, col] = value"""
        row, col = pos
        self.data[row][col] = value

    def __contains__(self, value):
        """Check: value in matrix"""
        return any(value in row for row in self.data)

m = Matrix(3, 3)
m[0, 0] = 5
m[1, 1] = 10

print(m[0, 0])       # 5
print(5 in m)        # True
print(99 in m)       # False
```

---

## Callable Objects: `__call__`

Make instances callable like functions:

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))    # 10
print(triple(5))    # 15

# Useful with higher-order functions
numbers = [1, 2, 3, 4]
print(list(map(double, numbers)))  # [2, 4, 6, 8]
```

---

## Context Managers: `__enter__` and `__exit__`

Support the `with` statement for resource management:

```python
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.elapsed = time.time() - self.start
        print(f"Elapsed: {self.elapsed:.4f} seconds")
        return False  # Don't suppress exceptions

with Timer() as t:
    # Some operation
    sum(range(1000000))
# Prints: Elapsed: 0.0234 seconds
```

---

## Common Special Methods Reference

| Method | Trigger | Example |
|--------|---------|---------|
| `__init__` | Object creation | `obj = Class()` |
| `__str__` | `str()`, `print()` | `print(obj)` |
| `__repr__` | `repr()`, debugging | `repr(obj)` |
| `__eq__` | `==` | `a == b` |
| `__lt__` | `<` | `a < b` |
| `__len__` | `len()` | `len(obj)` |
| `__bool__` | Boolean context | `if obj:` |
| `__getitem__` | Indexing | `obj[key]` |
| `__setitem__` | Assignment | `obj[key] = val` |
| `__contains__` | `in` operator | `x in obj` |
| `__call__` | Calling | `obj()` |
| `__iter__` | Iteration | `for x in obj:` |
| `__add__` | `+` operator | `a + b` |

---

## Key Takeaways

- Dunder methods let objects work with Python's built-in syntax
- Implement `__repr__` at minimum for debugging; add `__str__` for user output
- `__eq__` defines equality; remember to implement `__hash__` for hashability
- Use `@total_ordering` to simplify comparison method implementation
- `__call__` makes objects behave like functions
- Container protocols (`__getitem__`, etc.) enable indexing and iteration
