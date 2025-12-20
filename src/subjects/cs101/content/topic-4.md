## Introduction

Lists and dictionaries are Python's most powerful built-in data structures. Lists store ordered sequences of items, while dictionaries store key-value pairs for fast lookups. Mastering these structures is essential for handling real-world data.

**Learning Objectives:**
- Create and manipulate lists with various methods
- Understand list indexing and slicing
- Use list comprehensions for concise transformations
- Create and access dictionary key-value pairs
- Iterate over lists and dictionaries effectively
- Choose the right data structure for different problems

---

## Core Concepts

### Lists: Ordered Collections

Lists store multiple items in a specific order:

```python
# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]  # Can mix types
empty = []

# Accessing elements (0-indexed)
print(fruits[0])   # "apple" (first element)
print(fruits[-1])  # "cherry" (last element)
print(fruits[-2])  # "banana" (second to last)
```

### List Slicing

Extract portions of a list with `[start:end:step]`:

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])    # [2, 3, 4] (indices 2, 3, 4)
print(numbers[:3])     # [0, 1, 2] (first 3)
print(numbers[7:])     # [7, 8, 9] (from index 7 to end)
print(numbers[::2])    # [0, 2, 4, 6, 8] (every 2nd)
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reversed)
```

### Modifying Lists

Lists are mutable - you can change them:

```python
fruits = ["apple", "banana", "cherry"]

# Change an element
fruits[1] = "blueberry"  # ["apple", "blueberry", "cherry"]

# Add elements
fruits.append("date")    # Add to end
fruits.insert(1, "fig")  # Insert at index 1

# Remove elements
fruits.remove("apple")   # Remove first occurrence
last = fruits.pop()      # Remove and return last item
first = fruits.pop(0)    # Remove and return item at index
```

### List Comprehensions

Create lists with concise syntax:

```python
# Traditional approach
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension (same result)
squares = [x ** 2 for x in range(5)]  # [0, 1, 4, 9, 16]

# With condition (filter)
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
```

### Dictionaries: Key-Value Pairs

Dictionaries store data with unique keys:

```python
# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Accessing values
print(person["name"])      # "Alice"
print(person.get("age"))   # 30
print(person.get("job", "Unknown"))  # "Unknown" (default if key missing)
```

### Modifying Dictionaries

```python
person = {"name": "Alice", "age": 30}

# Add or update
person["email"] = "alice@example.com"  # Add new key
person["age"] = 31                      # Update existing

# Remove
del person["age"]                # Remove key
email = person.pop("email")      # Remove and return value

# Other methods
keys = person.keys()             # All keys
values = person.values()         # All values
items = person.items()           # All key-value pairs as tuples
```

---

## Common Mistakes and Debugging

### Mistake 1: Index Out of Range

```python
fruits = ["apple", "banana", "cherry"]
# print(fruits[3])  # IndexError! Valid indices are 0, 1, 2

# Fix - check length first
if len(fruits) > 3:
    print(fruits[3])
```

### Mistake 2: KeyError in Dictionaries

```python
person = {"name": "Alice"}
# print(person["age"])  # KeyError: 'age'

# Fix - use .get() with default
print(person.get("age", "Unknown"))  # "Unknown"
```

---

## Summary

You've mastered Python's essential data structures:

- **Lists** are ordered, mutable sequences accessed by index
- **Slicing** extracts portions: `list[start:end:step]`
- **List comprehensions** create lists concisely: `[expr for x in seq]`
- **Dictionaries** store key-value pairs for fast lookups
- **Iteration** works with `for...in` and `enumerate()`