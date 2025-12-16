## Common Mistakes with Lists and Dictionaries

Understanding common pitfalls helps you avoid bugs and write more robust code. This section covers frequent mistakes with lists and dictionaries, plus how to fix them.

---

## IndexError and KeyError

### IndexError: List Index Out of Range

Accessing an index that doesn't exist raises `IndexError`:

```python
items = [1, 2, 3]

# Bug: index 3 doesn't exist (valid indices: 0, 1, 2)
value = items[3]  # IndexError: list index out of range

# Bug: common with empty lists
empty = []
first = empty[0]  # IndexError
```

**Fix: Check length first or use try/except:**

```python
items = [1, 2, 3]
index = 5

# Option 1: Check bounds
if index < len(items):
    value = items[index]
else:
    value = None

# Option 2: Try/except
try:
    value = items[index]
except IndexError:
    value = None

# Option 3: Use slicing (returns empty list, not error)
value = items[5:6]  # Returns [] instead of raising error
```

### KeyError: Key Not Found

Accessing a missing key with `[]` raises `KeyError`:

```python
person = {"name": "Alice"}

# Bug: key doesn't exist
age = person["age"]  # KeyError: 'age'
```

**Fix: Use `.get()` or check first:**

```python
person = {"name": "Alice"}

# Option 1: Use .get() with default
age = person.get("age", 0)  # Returns 0 if missing

# Option 2: Check first
if "age" in person:
    age = person["age"]
else:
    age = 0

# Option 3: Try/except
try:
    age = person["age"]
except KeyError:
    age = 0
```

---

## Modifying While Iterating

One of the most common bugs: changing a collection while looping over it.

### Lists: Don't Remove While Iterating

```python
# Bug: items get skipped
numbers = [1, 2, 3, 4, 5, 6]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # [1, 3, 5] - looks right, but...

# Try with this:
numbers = [2, 4, 6, 8]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # [4, 8] - wrong! Items were skipped
```

When you remove an item, everything shifts, but the loop index advances, skipping the next item.

**Fix: Create a new list or iterate over a copy:**

```python
# Option 1: List comprehension (best)
numbers = [1, 2, 3, 4, 5, 6]
numbers = [n for n in numbers if n % 2 != 0]
print(numbers)  # [1, 3, 5]

# Option 2: Iterate over a copy
numbers = [2, 4, 6, 8]
for n in numbers[:]:  # [:] creates a copy
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # []

# Option 3: Iterate backwards
numbers = [2, 4, 6, 8]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        del numbers[i]
```

### Dictionaries: Can't Change Size While Iterating

```python
# Bug: RuntimeError
data = {"a": 1, "b": 2, "c": 3}
for key in data:
    if data[key] < 2:
        del data[key]  # RuntimeError: dictionary changed size during iteration
```

**Fix: Iterate over a copy of keys:**

```python
data = {"a": 1, "b": 2, "c": 3}

# Option 1: List of keys
for key in list(data.keys()):
    if data[key] < 2:
        del data[key]

# Option 2: Dictionary comprehension
data = {k: v for k, v in data.items() if v >= 2}
```

---

## Accidental Aliasing

Remember: assigning a list/dict to a new variable creates an alias, not a copy.

```python
# Bug: both variables point to same list
original = [1, 2, 3]
supposed_copy = original
supposed_copy.append(4)
print(original)  # [1, 2, 3, 4] - oops!
```

**Fix: Create an explicit copy:**

```python
# For lists
original = [1, 2, 3]
copy1 = original[:]
copy2 = original.copy()
copy3 = list(original)

# For dictionaries
original = {"a": 1, "b": 2}
copy1 = original.copy()
copy2 = dict(original)
```

---

## The Shared Nested List Bug

This is one of the trickiest bugs for beginners:

```python
# Bug: all rows share the same inner list
grid = [[0] * 3] * 2
print(grid)  # [[0, 0, 0], [0, 0, 0]] - looks fine

grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0]] - both rows changed!
```

**Why?** `[[0] * 3] * 2` creates one inner list and makes two references to it.

**Fix: Use a comprehension:**

```python
# Each row is a separate list
grid = [[0] * 3 for _ in range(2)]

grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0]] - correct!
```

---

## Mutable Default Arguments

This applies to functions with list/dict defaults:

```python
# Bug: default list is shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] - accumulated!
print(add_item("c"))  # ['a', 'b', 'c']
```

**Fix: Use `None` as default:**

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['b'] - fresh list each time
```

---

## Forgetting That `sort()` Returns None

```python
numbers = [3, 1, 4, 1, 5]

# Bug: sort() returns None
sorted_numbers = numbers.sort()
print(sorted_numbers)  # None!
print(numbers)         # [1, 1, 3, 4, 5] - original was modified
```

**Fix: Use `sorted()` for a new list, or don't capture `sort()`'s return:**

```python
numbers = [3, 1, 4, 1, 5]

# Option 1: sorted() returns new list
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # [1, 1, 3, 4, 5]
print(numbers)         # [3, 1, 4, 1, 5] - unchanged

# Option 2: sort() in place, don't capture return
numbers.sort()
print(numbers)  # [1, 1, 3, 4, 5]
```

---

## Using Lists When Sets Would Be Better

```python
# Slow: checking membership in a list
allowed_users = ["alice", "bob", "charlie", ...]  # 10000 users

if username in allowed_users:  # O(n) - slow for large lists
    allow_access()
```

**Fix: Use a set for membership testing:**

```python
# Fast: checking membership in a set
allowed_users = {"alice", "bob", "charlie", ...}  # 10000 users

if username in allowed_users:  # O(1) - fast regardless of size
    allow_access()
```

---

## Practice Exercises

Test your understanding with these exercises:

### Exercise 1: Word Counter

Count how many times each word appears in a list:

```python
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
# Expected: {"apple": 3, "banana": 2, "cherry": 1}
```

### Exercise 2: List to Dictionary

Convert a list of (name, score) tuples to a dictionary:

```python
data = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
# Expected: {"Alice": 85, "Bob": 92, "Charlie": 78}
```

### Exercise 3: Filter and Transform

From a list of numbers, create a new list with only even numbers, squared:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Expected: [4, 16, 36, 64, 100]
```

### Exercise 4: Find Top Scorer

Given a dictionary of names to scores, find the name with the highest score:

```python
scores = {"Alice": 85, "Bob": 92, "Charlie": 78, "Diana": 95}
# Expected: "Diana"
```

### Exercise 5: Diagonal Grid

Create a 5×5 grid (2D list) filled with 0s, then set the diagonal to 1s:

```python
# Expected:
# [[1, 0, 0, 0, 0],
#  [0, 1, 0, 0, 0],
#  [0, 0, 1, 0, 0],
#  [0, 0, 0, 1, 0],
#  [0, 0, 0, 0, 1]]
```

---

## Key Takeaways

- Use `.get()` for safe dictionary access; check bounds for list access
- Never modify a list while iterating - use comprehensions or iterate over a copy
- Assignment creates aliases, not copies - use `.copy()` or `[:]` for true copies
- Create 2D lists with comprehensions, never `[[x] * n] * m`
- Use `None` as default instead of mutable objects like `[]` or `{}`
- `sort()` modifies in place and returns `None`; `sorted()` returns a new list
- Use sets for fast membership testing on large collections
- Most bugs come from not understanding mutability and references

