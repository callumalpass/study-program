## Lists (Ordered, Mutable Collections)

A **list** is one of Python's most versatile data structures. It stores multiple items in a specific order and allows you to modify both the items and the order. Lists are your go-to choice when you need to work with collections of data.

```python
numbers = [10, 20, 30]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", True, 3.14]  # Lists can hold different types
empty = []  # An empty list
```

---

## Creating Lists

There are several ways to create lists:

```python
# Literal syntax
colors = ["red", "green", "blue"]

# From another iterable
letters = list("hello")  # ['h', 'e', 'l', 'l', 'o']
numbers = list(range(5))  # [0, 1, 2, 3, 4]

# Empty list
empty1 = []
empty2 = list()

# Repeated elements
zeros = [0] * 5  # [0, 0, 0, 0, 0]
```

---

## Indexing (0-Based)

Like strings, lists use zero-based indexing. The first element is at index 0:

```python
names = ["Alice", "Bob", "Charlie", "Diana"]

# Positive indexing (from start)
names[0]   # "Alice" - first element
names[1]   # "Bob" - second element
names[2]   # "Charlie" - third element

# Negative indexing (from end)
names[-1]  # "Diana" - last element
names[-2]  # "Charlie" - second to last
names[-4]  # "Alice" - same as names[0]
```

### Index Out of Range

Accessing an invalid index raises an `IndexError`:

```python
names = ["Alice", "Bob", "Charlie"]

names[10]   # IndexError: list index out of range
names[-10]  # IndexError: list index out of range
```

### Checking Length First

If you're unsure whether an index is valid:

```python
names = ["Alice", "Bob", "Charlie"]
index = 5

if index < len(names):
    print(names[index])
else:
    print("Index out of range")

# Or use try/except
try:
    print(names[index])
except IndexError:
    print("Index out of range")
```

---

## Mutability (Lists Can Change)

Unlike strings, lists are **mutable** - you can change their contents:

```python
numbers = [1, 2, 3]

# Change an element by index
numbers[0] = 99
print(numbers)  # [99, 2, 3]

# Change multiple elements with slicing
numbers[1:3] = [100, 200]
print(numbers)  # [99, 100, 200]
```

This is a fundamental difference from strings:

```python
# Strings are immutable
text = "hello"
# text[0] = "H"  # TypeError: 'str' object does not support item assignment

# You must create a new string
text = "H" + text[1:]  # "Hello"
```

---

## Common List Methods

Python lists have many built-in methods for adding, removing, and manipulating elements.

### Adding Elements

```python
items = ["a", "b", "c"]

# append() - add to end (most common)
items.append("d")
print(items)  # ['a', 'b', 'c', 'd']

# insert() - add at specific index
items.insert(1, "x")  # Insert "x" at index 1
print(items)  # ['a', 'x', 'b', 'c', 'd']

# extend() - add multiple elements
items.extend(["e", "f"])
print(items)  # ['a', 'x', 'b', 'c', 'd', 'e', 'f']

# Using += (same as extend)
items += ["g", "h"]
```

### Removing Elements

```python
items = ["a", "b", "c", "d", "b"]

# remove() - remove first occurrence of value
items.remove("b")
print(items)  # ['a', 'c', 'd', 'b']

# pop() - remove and return item at index (default: last)
last = items.pop()      # Remove and return last item
print(last)             # 'b'
print(items)            # ['a', 'c', 'd']

first = items.pop(0)    # Remove and return first item
print(first)            # 'a'

# clear() - remove all elements
items.clear()
print(items)  # []

# del - remove by index or slice
numbers = [0, 1, 2, 3, 4, 5]
del numbers[0]      # [1, 2, 3, 4, 5]
del numbers[1:3]    # [1, 4, 5]
```

### Sorting and Reversing

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# sort() - sort in place (modifies the list)
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# Sort in reverse order
numbers.sort(reverse=True)
print(numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]

# reverse() - reverse in place
numbers.reverse()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]
```

**Important distinction:**
- `list.sort()` modifies the list in place and returns `None`
- `sorted(list)` returns a new sorted list, leaving the original unchanged

```python
original = [3, 1, 4]

# sort() modifies in place
result = original.sort()
print(result)    # None (!)
print(original)  # [1, 3, 4]

# sorted() returns new list
original = [3, 1, 4]
result = sorted(original)
print(result)    # [1, 3, 4]
print(original)  # [3, 1, 4] - unchanged
```

### Searching and Counting

```python
items = ["apple", "banana", "cherry", "banana"]

# index() - find first occurrence
pos = items.index("banana")
print(pos)  # 1

# index() raises ValueError if not found
# items.index("grape")  # ValueError

# count() - count occurrences
count = items.count("banana")
print(count)  # 2

# in - check membership
print("apple" in items)   # True
print("grape" in items)   # False
print("grape" not in items)  # True
```

---

## List Operations

### Concatenation

```python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

# Using +
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# Note: + creates a new list
print(list1)  # [1, 2, 3] - unchanged
```

### Repetition

```python
# Repeat a list
repeated = [0] * 5
print(repeated)  # [0, 0, 0, 0, 0]

pattern = [1, 2] * 3
print(pattern)  # [1, 2, 1, 2, 1, 2]
```

### Length and Membership

```python
names = ["Alice", "Bob", "Charlie"]

print(len(names))           # 3
print("Alice" in names)     # True
print("Diana" not in names) # True
```

---

## Nested Lists (Lists of Lists)

Lists can contain other lists, creating multi-dimensional structures:

```python
# 2D list (like a grid or matrix)
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Accessing elements
print(grid[0])      # [1, 2, 3] - first row
print(grid[0][0])   # 1 - first element of first row
print(grid[1][2])   # 6 - third element of second row

# Modifying nested elements
grid[1][1] = 99
print(grid)  # [[1, 2, 3], [4, 99, 6], [7, 8, 9]]
```

### Iterating Over Nested Lists

```python
grid = [
    [1, 2, 3],
    [4, 5, 6]
]

# Iterate over rows
for row in grid:
    print(row)

# Iterate over all elements
for row in grid:
    for value in row:
        print(value, end=" ")
    print()  # Newline after each row
```

---

## Lists vs Other Sequences

| Feature | List | Tuple | String |
|---------|------|-------|--------|
| Mutable | Yes | No | No |
| Ordered | Yes | Yes | Yes |
| Heterogeneous | Yes | Yes | No (chars only) |
| Syntax | `[]` | `()` | `""` or `''` |

```python
my_list = [1, 2, 3]      # Mutable
my_tuple = (1, 2, 3)     # Immutable
my_string = "123"        # Immutable

my_list[0] = 99          # Works
# my_tuple[0] = 99       # Error
# my_string[0] = "9"     # Error
```

---

## Key Takeaways

- Lists store ordered collections of items in square brackets `[]`
- Indexing is 0-based; negative indices count from the end
- Lists are mutable - you can change, add, and remove elements
- `append()` adds to end; `insert()` adds at index; `extend()` adds multiple
- `remove()` removes by value; `pop()` removes by index
- `sort()` modifies in place; `sorted()` returns a new list
- Use `in` to check membership; `len()` for length; `index()` to find position
- Lists can be nested to create multi-dimensional structures
- `IndexError` occurs when accessing invalid indices

