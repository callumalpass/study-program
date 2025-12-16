## Slicing (Extracting Parts of a List)

Slicing lets you extract a portion of a list (or any sequence) into a new list. It's one of Python's most powerful and commonly used features for working with sequences.

---

## Basic Slicing Syntax

The slice syntax is `[start:stop:step]`:

- `start`: Index where the slice begins (inclusive, default: 0)
- `stop`: Index where the slice ends (exclusive, default: end of list)
- `step`: How many items to skip (default: 1)

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Basic slices
nums[2:5]    # [2, 3, 4] - indices 2, 3, 4 (stop is exclusive)
nums[0:3]    # [0, 1, 2] - first 3 elements
nums[7:10]   # [7, 8, 9] - last 3 elements
```

### Omitting Start or Stop

When you omit `start`, slicing begins at the beginning. When you omit `stop`, slicing continues to the end:

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[:3]     # [0, 1, 2] - from start to index 3 (exclusive)
nums[7:]     # [7, 8, 9] - from index 7 to end
nums[:]      # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] - copy entire list
```

### Using Step

The step parameter controls how many indices to skip:

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[::2]    # [0, 2, 4, 6, 8] - every 2nd element
nums[1::2]   # [1, 3, 5, 7, 9] - every 2nd element, starting at index 1
nums[::3]    # [0, 3, 6, 9] - every 3rd element
```

### Negative Indices in Slices

Negative indices work in slices just like regular indexing:

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[-3:]     # [7, 8, 9] - last 3 elements
nums[:-2]     # [0, 1, 2, 3, 4, 5, 6, 7] - all except last 2
nums[-5:-2]   # [5, 6, 7] - from 5th-from-end to 2nd-from-end
```

### Negative Step (Reversing)

A negative step reverses the direction:

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[::-1]   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] - reversed
nums[::-2]   # [9, 7, 5, 3, 1] - reversed, every 2nd
nums[5:2:-1] # [5, 4, 3] - from index 5 down to (but not including) index 2
```

---

## Slices Create New Lists

An important property: slicing always creates a **new list**. The original is unchanged:

```python
original = [1, 2, 3, 4, 5]
slice_copy = original[1:4]

slice_copy[0] = 99
print(slice_copy)  # [99, 3, 4]
print(original)    # [1, 2, 3, 4, 5] - unchanged
```

---

## Slice Assignment

You can assign to a slice to modify the original list:

```python
nums = [0, 1, 2, 3, 4, 5]

# Replace elements 1-3 with new values
nums[1:4] = [10, 20, 30]
print(nums)  # [0, 10, 20, 30, 4, 5]

# Replace with different number of elements
nums = [0, 1, 2, 3, 4, 5]
nums[1:4] = [99]  # Replace 3 elements with 1
print(nums)  # [0, 99, 4, 5]

# Insert without removing
nums = [0, 1, 2, 3, 4, 5]
nums[2:2] = [100, 200]  # Insert at index 2
print(nums)  # [0, 1, 100, 200, 2, 3, 4, 5]

# Delete via slice assignment
nums = [0, 1, 2, 3, 4, 5]
nums[1:4] = []  # Delete elements 1-3
print(nums)  # [0, 4, 5]
```

---

## Common Slicing Patterns

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# First N elements
first_three = nums[:3]      # [0, 1, 2]

# Last N elements
last_three = nums[-3:]      # [7, 8, 9]

# All except first N
without_first_two = nums[2:]  # [2, 3, 4, 5, 6, 7, 8, 9]

# All except last N
without_last_two = nums[:-2]  # [0, 1, 2, 3, 4, 5, 6, 7]

# Middle portion
middle = nums[3:7]          # [3, 4, 5, 6]

# Every Nth element
every_second = nums[::2]    # [0, 2, 4, 6, 8]

# Reversed copy
reversed_list = nums[::-1]  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

# Copy entire list
copy = nums[:]              # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## Aliasing vs Copying (A Common Bug)

One of the most common bugs in Python involves accidentally creating an **alias** instead of a **copy**.

### The Problem: Aliasing

When you assign a list to another variable, you don't create a copy - you create a **reference to the same list**:

```python
a = [1, 2, 3]
b = a         # b is an ALIAS - it points to the same list

b.append(4)   # Modifying b...
print(a)      # [1, 2, 3, 4] - a changed too!
print(b)      # [1, 2, 3, 4]

# They are the same object
print(a is b)  # True
```

This happens because lists are **objects**, and variables hold **references** to objects, not the objects themselves.

### Creating True Copies

To create an independent copy, use one of these methods:

```python
original = [1, 2, 3]

# Method 1: Slice copy
copy1 = original[:]

# Method 2: list() constructor
copy2 = list(original)

# Method 3: .copy() method
copy3 = original.copy()

# Now they're independent
copy1.append(4)
print(original)  # [1, 2, 3] - unchanged
print(copy1)     # [1, 2, 3, 4]

# They are different objects
print(original is copy1)  # False
```

---

## Shallow vs Deep Copies

All the methods above create **shallow copies**. A shallow copy creates a new list, but the elements themselves are still references to the original objects. For simple data types (numbers, strings), this doesn't matter. But for nested structures (lists of lists), it can cause problems.

### The Shallow Copy Problem

```python
# Nested list (list of lists)
grid = [[1, 2], [3, 4]]
shallow = grid[:]  # Shallow copy

# The inner lists are still shared!
shallow[0][0] = 99

print(grid)     # [[99, 2], [3, 4]] - inner list changed!
print(shallow)  # [[99, 2], [3, 4]]
```

Why? The shallow copy created a new outer list, but the elements of that list (the inner lists) are still references to the original inner lists.

### Deep Copies

For nested structures, use `copy.deepcopy()`:

```python
import copy

grid = [[1, 2], [3, 4]]
deep = copy.deepcopy(grid)  # Deep copy

deep[0][0] = 99

print(grid)  # [[1, 2], [3, 4]] - unchanged
print(deep)  # [[99, 2], [3, 4]]
```

`deepcopy` recursively copies all nested objects, creating completely independent copies.

---

## Building 2D Lists Safely

A common mistake when creating 2D lists:

```python
# WRONG: This creates 3 references to the SAME inner list
grid = [[0] * 3] * 2
print(grid)  # [[0, 0, 0], [0, 0, 0]]

grid[0][0] = 1
print(grid)  # [[1, 0, 0], [1, 0, 0]] - both rows changed!
```

Why? `[[0] * 3] * 2` creates one inner list and then creates a list with two references to it.

### The Correct Way

Use a list comprehension to create independent inner lists:

```python
# RIGHT: Each row is a separate list
grid = [[0] * 3 for _ in range(2)]
print(grid)  # [[0, 0, 0], [0, 0, 0]]

grid[0][0] = 1
print(grid)  # [[1, 0, 0], [0, 0, 0]] - only first row changed
```

The list comprehension runs `[0] * 3` separately for each row, creating independent lists.

### General Pattern for 2D Lists

```python
# Create rows x cols grid filled with value
def create_grid(rows, cols, value=0):
    return [[value] * cols for _ in range(rows)]

grid = create_grid(3, 4, 0)
# [[0, 0, 0, 0],
#  [0, 0, 0, 0],
#  [0, 0, 0, 0]]
```

---

## Slicing Strings (Same Syntax)

Slicing works identically on strings:

```python
text = "Hello, World!"

text[0:5]    # "Hello"
text[7:]     # "World!"
text[::-1]   # "!dlroW ,olleH"
text[::2]    # "Hlo ol!"
```

The main difference: strings are immutable, so you can't use slice assignment:

```python
text = "Hello"
# text[0:2] = "XX"  # TypeError: 'str' object does not support item assignment
```

---

## Key Takeaways

- Slice syntax: `[start:stop:step]` - start inclusive, stop exclusive
- Omit start/stop to go from beginning/to end
- Negative indices count from the end; negative step reverses direction
- `[:]` creates a shallow copy; `[::-1]` reverses
- Slices create new lists; the original is unchanged
- Aliasing (`b = a`) creates a reference, not a copy
- Use `[:]`, `list()`, or `.copy()` for shallow copies
- Use `copy.deepcopy()` for nested structures
- Create 2D lists with comprehensions: `[[0]*n for _ in range(m)]`
- Never use `[[value] * n] * m` - it creates shared references

