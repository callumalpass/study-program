---
id: cs101-t4-iteration
title: "Iteration and Comprehensions"
order: 3
---

## Iterating Over Lists

Iteration is how you process each element in a list. Python provides several ways to iterate, each suited to different situations.

---

## Direct Iteration (Most Common)

The simplest and most readable way to iterate is directly over the elements:

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry
```

This is the preferred approach when you don't need the index. It's:
- More readable
- Less error-prone
- Works with any iterable (not just lists)

---

## When You Need the Index

Sometimes you need to know the position of each element. Use `enumerate()`:

```python
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

# Start counting from 1 instead of 0
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry
```

### Avoid Manual Index Tracking

Don't do this:

```python
# Bad: manual index tracking
i = 0
for fruit in fruits:
    print(f"{i}: {fruit}")
    i += 1

# Also bad: using range(len())
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")
```

Use `enumerate()` instead - it's cleaner and less error-prone.

---

## Iterating Over Multiple Lists

Use `zip()` to iterate over multiple lists in parallel:

```python
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]

for name, score in zip(names, scores):
    print(f"{name}: {score}")
# Alice: 85
# Bob: 92
# Charlie: 78
```

`zip()` stops at the shortest list:

```python
a = [1, 2, 3, 4, 5]
b = ["a", "b", "c"]

for x, y in zip(a, b):
    print(x, y)
# 1 a
# 2 b
# 3 c
# (4 and 5 are ignored)
```

### Combining enumerate and zip

```python
names = ["Alice", "Bob"]
scores = [85, 92]

for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{i}. {name}: {score}")
# 1. Alice: 85
# 2. Bob: 92
```

---

## Iterating Backwards

Several approaches to iterate in reverse:

```python
nums = [1, 2, 3, 4, 5]

# Method 1: reversed() - most readable
for n in reversed(nums):
    print(n)

# Method 2: Slice with negative step
for n in nums[::-1]:
    print(n)

# Method 3: Range with negative step (when you need indices)
for i in range(len(nums) - 1, -1, -1):
    print(nums[i])
```

`reversed()` is preferred for readability and doesn't create a copy.

---

## List Comprehensions

List comprehensions are a concise way to create new lists by transforming or filtering existing iterables.

### Basic Syntax

```python
# Standard pattern
new_list = [expression for item in iterable]

# Examples
numbers = [1, 2, 3, 4, 5]

# Transform each element
squares = [n * n for n in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# Apply a function
words = ["hello", "world"]
upper = [w.upper() for w in words]
print(upper)  # ['HELLO', 'WORLD']
```

### Comprehension with Condition (Filtering)

Add an `if` clause to filter elements:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Transform and filter
even_squares = [n * n for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]
```

### Comprehension vs Loop

A list comprehension is equivalent to a `for` loop that builds a list:

```python
# Loop version
squares = []
for n in range(5):
    squares.append(n * n)

# Comprehension version (equivalent)
squares = [n * n for n in range(5)]
```

Both produce `[0, 1, 4, 9, 16]`, but the comprehension is more concise.

---

## When to Use Comprehensions vs Loops

### Use Comprehensions When:

1. **You're building a new list** from an existing iterable
2. **The logic is simple** - one expression, maybe one condition
3. **It fits on one line** without sacrificing readability

```python
# Good comprehension use cases
squares = [x * x for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]
words = [line.strip() for line in lines if line.strip()]
```

### Use Regular Loops When:

1. **The logic is complex** - multiple statements or conditions
2. **You need side effects** - printing, modifying external state
3. **You're not building a list** - just processing items
4. **You need to break early** - comprehensions process all items

```python
# Better as a loop: multiple statements per item
results = []
for item in items:
    processed = process(item)
    if is_valid(processed):
        log_success(item)
        results.append(processed)
    else:
        log_failure(item)

# Better as a loop: breaking early
found = None
for item in items:
    if matches_criteria(item):
        found = item
        break
```

---

## Nested Comprehensions

You can nest comprehensions for 2D operations:

```python
# Create pairs from two ranges
pairs = [(x, y) for x in range(3) for y in range(2)]
print(pairs)  # [(0,0), (0,1), (1,0), (1,1), (2,0), (2,1)]

# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [n for row in matrix for n in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Create a 2D grid
grid = [[0 for col in range(3)] for row in range(2)]
print(grid)  # [[0, 0, 0], [0, 0, 0]]
```

### Reading Nested Comprehensions

Read nested comprehensions from left to right, like nested loops:

```python
# Comprehension
result = [x * y for x in range(3) for y in range(3) if x != y]

# Equivalent nested loops
result = []
for x in range(3):
    for y in range(3):
        if x != y:
            result.append(x * y)
```

### When Nesting Gets Too Complex

If a comprehension is hard to read, use regular loops:

```python
# Too complex - hard to understand
result = [f(x, y, z) for x in xs if p(x) for y in ys if q(x, y) for z in zs if r(x, y, z)]

# Better as nested loops with comments
result = []
for x in xs:
    if not p(x):
        continue
    for y in ys:
        if not q(x, y):
            continue
        for z in zs:
            if r(x, y, z):
                result.append(f(x, y, z))
```

---

## Generator Expressions (Memory-Efficient Alternative)

Generator expressions look like comprehensions but use parentheses. They don't build the entire list in memory:

```python
# List comprehension - builds full list in memory
squares_list = [x * x for x in range(1000000)]

# Generator expression - produces values on demand
squares_gen = (x * x for x in range(1000000))

# Use generators when you only need to iterate once
total = sum(x * x for x in range(1000000))  # Memory efficient
```

Generators are covered more in later topics, but know they exist for large datasets.

---

## Common Iteration Patterns

### Processing and Filtering

```python
# Keep items that meet a condition
valid_users = [u for u in users if u.is_active]

# Transform items
names = [user.name for user in users]

# Both together
active_names = [u.name for u in users if u.is_active]
```

### Building Dictionaries

```python
words = ["apple", "banana", "cherry"]

# Word to length
lengths = {word: len(word) for word in words}
# {'apple': 5, 'banana': 6, 'cherry': 6}
```

### Building Sets

```python
numbers = [1, 2, 2, 3, 3, 3, 4]
unique_squares = {n * n for n in numbers}
# {1, 4, 9, 16}
```

---

## Key Takeaways

- Direct iteration (`for x in list`) is cleanest when you don't need indices
- Use `enumerate()` when you need both index and value
- Use `zip()` to iterate multiple lists in parallel
- Use `reversed()` to iterate backwards
- List comprehensions: `[expression for item in iterable if condition]`
- Comprehensions are great for simple transforms and filters
- Use regular loops for complex logic, side effects, or early breaks
- Keep comprehensions readable - if it's complex, use a loop
- Generator expressions `()` are memory-efficient for large data

