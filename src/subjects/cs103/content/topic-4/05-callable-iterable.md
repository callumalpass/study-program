---
id: cs103-t4-callable
title: "Callable and Iterable"
order: 5
---

## Making Objects Callable and Iterable

Two powerful special methods let objects behave like functions (`__call__`) and work with loops (`__iter__`). These enable elegant, Pythonic APIs.

---

## Callable Objects: `__call__`

The `__call__` method lets instances be called like functions:

```python
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Works with higher-order functions
numbers = [1, 2, 3, 4, 5]
print(list(map(double, numbers)))  # [2, 4, 6, 8, 10]
```

---

## Use Cases for Callable Objects

### Function with State
```python
class RunningAverage:
    def __init__(self):
        self.total = 0
        self.count = 0

    def __call__(self, value):
        self.total += value
        self.count += 1
        return self.total / self.count

avg = RunningAverage()
print(avg(10))  # 10.0
print(avg(20))  # 15.0
print(avg(30))  # 20.0
```

### Configurable Functions
```python
class Validator:
    def __init__(self, min_length, max_length):
        self.min_length = min_length
        self.max_length = max_length

    def __call__(self, value):
        if len(value) < self.min_length:
            raise ValueError(f"Too short (min {self.min_length})")
        if len(value) > self.max_length:
            raise ValueError(f"Too long (max {self.max_length})")
        return True

validate_username = Validator(3, 20)
validate_password = Validator(8, 100)

validate_username("alice")     # True
validate_password("secret")    # ValueError: Too short (min 8)
```

### Memoization
```python
class Memoize:
    def __init__(self, func):
        self.func = func
        self.cache = {}

    def __call__(self, *args):
        if args not in self.cache:
            self.cache[args] = self.func(*args)
        return self.cache[args]

@Memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Fast due to memoization
```

---

## Iterable Objects: `__iter__` and `__next__`

Implement `__iter__` to work with `for` loops:

```python
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1
```

---

## Separating Iterator from Iterable

Better design separates the iterable from its iterator:

```python
class Range:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __iter__(self):
        return RangeIterator(self.start, self.end)

class RangeIterator:
    def __init__(self, current, end):
        self.current = current
        self.end = end

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        self.current += 1
        return self.current - 1

# Can iterate multiple times
r = Range(1, 4)
print(list(r))  # [1, 2, 3]
print(list(r))  # [1, 2, 3] - works again!
```

---

## Container Methods: `__len__` and `__contains__`

```python
class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

    def __contains__(self, song):
        return song in self.songs

    def __iter__(self):
        return iter(self.songs)

playlist = Playlist()
playlist.add("Song A")
playlist.add("Song B")
playlist.add("Song C")

print(len(playlist))           # 3
print("Song A" in playlist)    # True
print("Song D" in playlist)    # False

for song in playlist:
    print(song)
```

---

## Indexing: `__getitem__` and `__setitem__`

```python
class Matrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = [[0] * cols for _ in range(rows)]

    def __getitem__(self, pos):
        row, col = pos
        return self.data[row][col]

    def __setitem__(self, pos, value):
        row, col = pos
        self.data[row][col] = value

    def __repr__(self):
        return '\n'.join(' '.join(str(x) for x in row) for row in self.data)

m = Matrix(3, 3)
m[0, 0] = 1
m[1, 1] = 5
m[2, 2] = 9

print(m[1, 1])  # 5
print(m)
# 1 0 0
# 0 5 0
# 0 0 9
```

---

## Practical Example: Custom Data Structure

```python
class OrderedSet:
    """A set that remembers insertion order."""

    def __init__(self, items=None):
        self._items = []
        if items:
            for item in items:
                self.add(item)

    def add(self, item):
        if item not in self._items:
            self._items.append(item)

    def remove(self, item):
        self._items.remove(item)

    def __contains__(self, item):
        return item in self._items

    def __len__(self):
        return len(self._items)

    def __iter__(self):
        return iter(self._items)

    def __repr__(self):
        return f"OrderedSet({self._items})"

    def __or__(self, other):
        """Union"""
        result = OrderedSet(self._items)
        for item in other:
            result.add(item)
        return result

    def __and__(self, other):
        """Intersection"""
        return OrderedSet(item for item in self if item in other)

s1 = OrderedSet([1, 2, 3])
s2 = OrderedSet([2, 3, 4])

print(s1 | s2)  # OrderedSet([1, 2, 3, 4])
print(s1 & s2)  # OrderedSet([2, 3])
```

---

## Key Takeaways

- `__call__` makes instances callable like functions
- Callable objects are great for functions with state or configuration
- `__iter__` and `__next__` enable iteration
- Separate iterator from iterable for multiple iteration support
- `__len__`, `__contains__`, `__getitem__` complete the container protocol
- Combine these methods to create rich, Pythonic data structures
