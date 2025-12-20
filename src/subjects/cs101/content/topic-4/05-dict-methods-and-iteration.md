---
id: cs101-t4-dict-iter
title: "Dict Methods and Iteration"
order: 5
---

## Iterating Over Dictionaries

Dictionaries offer several ways to iterate over their contents. Understanding these patterns is essential for working with dictionary data effectively.

---

## Default Iteration (Keys)

When you iterate over a dictionary directly, you get the **keys**:

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

for key in person:
    print(key)
# name
# age
# city

# Accessing values via keys
for key in person:
    print(f"{key}: {person[key]}")
# name: Alice
# age: 30
# city: NYC
```

---

## Explicit Iteration Methods

Python provides explicit methods for iterating over keys, values, or both:

### `.keys()` - Iterate Over Keys

```python
person = {"name": "Alice", "age": 30}

for key in person.keys():
    print(key)
# name
# age

# Check if key exists
if "name" in person.keys():  # Same as: "name" in person
    print("Has name")
```

### `.values()` - Iterate Over Values

```python
person = {"name": "Alice", "age": 30}

for value in person.values():
    print(value)
# Alice
# 30

# Get all values as a list
all_values = list(person.values())  # ["Alice", 30]
```

### `.items()` - Iterate Over Key-Value Pairs

This is the most common pattern when you need both key and value:

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

for key, value in person.items():
    print(f"{key}: {value}")
# name: Alice
# age: 30
# city: NYC
```

`.items()` returns tuples of (key, value), and we use tuple unpacking to get both.

---

## Useful Dictionary Methods

### `.get()` - Safe Value Access

```python
person = {"name": "Alice"}

# Returns None if key missing
age = person.get("age")
print(age)  # None

# Returns default if key missing
age = person.get("age", 0)
print(age)  # 0
```

### `.pop()` - Remove and Return

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Remove and return value
age = person.pop("age")
print(age)      # 30
print(person)   # {"name": "Alice", "city": "NYC"}

# With default (doesn't raise error if missing)
email = person.pop("email", "none")
print(email)    # "none"
```

### `.setdefault()` - Get or Set Default

`.setdefault()` returns the value for a key. If the key doesn't exist, it sets it to the default and returns that:

```python
person = {"name": "Alice"}

# Key exists - returns existing value
name = person.setdefault("name", "Unknown")
print(name)     # "Alice"
print(person)   # {"name": "Alice"}

# Key doesn't exist - sets and returns default
age = person.setdefault("age", 0)
print(age)      # 0
print(person)   # {"name": "Alice", "age": 0}
```

This is especially useful for building dictionaries with list values:

```python
# Group words by first letter
words = ["apple", "banana", "apricot", "blueberry"]
groups = {}

for word in words:
    first_letter = word[0]
    groups.setdefault(first_letter, []).append(word)

print(groups)
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}
```

### `.update()` - Merge Dictionaries

```python
person = {"name": "Alice", "age": 30}

# Update with another dict
person.update({"city": "NYC", "age": 31})
print(person)  # {"name": "Alice", "age": 31, "city": "NYC"}

# Update with keyword arguments
person.update(email="alice@example.com")
print(person)  # {"name": "Alice", "age": 31, "city": "NYC", "email": "alice@example.com"}
```

### `.popitem()` - Remove Last Item

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# Remove and return last inserted item
item = person.popitem()
print(item)     # ("city", "NYC")
print(person)   # {"name": "Alice", "age": 30}
```

---

## Dictionary Comprehensions

Just like list comprehensions, you can create dictionaries with a comprehension:

```python
# Basic syntax
# {key_expr: value_expr for item in iterable}

# Square numbers
squares = {n: n * n for n in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# From two lists
names = ["alice", "bob", "charlie"]
scores = [85, 92, 78]
grade_book = {name: score for name, score in zip(names, scores)}
print(grade_book)  # {"alice": 85, "bob": 92, "charlie": 78}

# With condition
# Only even numbers
even_squares = {n: n * n for n in range(10) if n % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
```

### Transforming Dictionaries

```python
prices = {"apple": 1.50, "banana": 0.75, "orange": 2.00}

# Double all prices
doubled = {item: price * 2 for item, price in prices.items()}
print(doubled)  # {"apple": 3.0, "banana": 1.5, "orange": 4.0}

# Filter expensive items
expensive = {item: price for item, price in prices.items() if price > 1.00}
print(expensive)  # {"apple": 1.5, "orange": 2.0}

# Swap keys and values
inverted = {value: key for key, value in prices.items()}
print(inverted)  # {1.5: "apple", 0.75: "banana", 2.0: "orange"}
```

---

## Sorting Dictionary Data

Dictionaries preserve insertion order, but you often want to process data in sorted order.

### Sorting by Keys

```python
scores = {"charlie": 78, "alice": 85, "bob": 92}

# Iterate in key order
for name in sorted(scores):
    print(f"{name}: {scores[name]}")
# alice: 85
# bob: 92
# charlie: 78

# Create a new sorted dict
sorted_scores = {k: scores[k] for k in sorted(scores)}
print(sorted_scores)  # {"alice": 85, "bob": 92, "charlie": 78}
```

### Sorting by Values

```python
scores = {"charlie": 78, "alice": 85, "bob": 92}

# Sort by value (ascending)
for name, score in sorted(scores.items(), key=lambda item: item[1]):
    print(f"{name}: {score}")
# charlie: 78
# alice: 85
# bob: 92

# Sort by value (descending) - highest first
for name, score in sorted(scores.items(), key=lambda item: item[1], reverse=True):
    print(f"{name}: {score}")
# bob: 92
# alice: 85
# charlie: 78
```

The `key` parameter takes a function that extracts the comparison key. `item[1]` gets the value from each (key, value) tuple.

---

## Merging Dictionaries

### Using `.update()` (Modifies Original)

```python
defaults = {"color": "blue", "size": "medium"}
user_prefs = {"size": "large"}

settings = defaults.copy()  # Don't modify defaults
settings.update(user_prefs)
print(settings)  # {"color": "blue", "size": "large"}
```

### Using `|` Operator (Python 3.9+)

```python
defaults = {"color": "blue", "size": "medium"}
user_prefs = {"size": "large"}

# Creates new dict
settings = defaults | user_prefs
print(settings)  # {"color": "blue", "size": "large"}

# Merge multiple
a = {"x": 1}
b = {"y": 2}
c = {"z": 3}
combined = a | b | c
print(combined)  # {"x": 1, "y": 2, "z": 3}
```

### Using `**` Unpacking

```python
defaults = {"color": "blue", "size": "medium"}
user_prefs = {"size": "large"}

settings = {**defaults, **user_prefs}
print(settings)  # {"color": "blue", "size": "large"}
```

---

## Common Patterns

### Counting Occurrences

```python
text = "mississippi"
counts = {}

for char in text:
    counts[char] = counts.get(char, 0) + 1

print(counts)  # {'m': 1, 'i': 4, 's': 4, 'p': 2}

# Or using setdefault
counts = {}
for char in text:
    counts.setdefault(char, 0)
    counts[char] += 1
```

### Grouping Items

```python
students = [
    {"name": "Alice", "grade": "A"},
    {"name": "Bob", "grade": "B"},
    {"name": "Charlie", "grade": "A"},
    {"name": "Diana", "grade": "B"}
]

by_grade = {}
for student in students:
    grade = student["grade"]
    by_grade.setdefault(grade, []).append(student["name"])

print(by_grade)
# {'A': ['Alice', 'Charlie'], 'B': ['Bob', 'Diana']}
```

### Inverting a Dictionary

```python
original = {"a": 1, "b": 2, "c": 3}
inverted = {value: key for key, value in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}
```

Note: This only works correctly if values are unique.

---

## Key Takeaways

- Iterating over a dict gives keys; use `.values()` for values, `.items()` for both
- `.get(key, default)` safely accesses keys without raising `KeyError`
- `.setdefault(key, default)` sets a key if it doesn't exist and returns the value
- `.update()` merges dictionaries; later values overwrite earlier ones
- Dictionary comprehensions: `{k: v for k, v in iterable}`
- Sort by keys: `sorted(dict)` or `sorted(dict.keys())`
- Sort by values: `sorted(dict.items(), key=lambda x: x[1])`
- Merge with `|` (Python 3.9+), `**` unpacking, or `.update()`
- Common patterns: counting with `.get()`, grouping with `.setdefault()`

