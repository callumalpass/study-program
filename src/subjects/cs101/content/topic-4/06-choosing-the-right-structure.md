---
id: cs101-t4-choosing
title: "Choosing the Right Structure"
order: 6
---

## Choosing Between List and Dictionary

Knowing when to use a list versus a dictionary is a fundamental skill. Each data structure has strengths, and choosing the right one makes your code clearer and more efficient.

---

## Lists: Ordered Collections

Use a **list** when:

1. **Order matters** - Items have a meaningful sequence
2. **You need duplicates** - Same value can appear multiple times
3. **You access by position** - First, second, last, etc.
4. **You iterate through all items** - Processing each element

```python
# Good list use cases
shopping_list = ["milk", "eggs", "bread", "milk"]  # Order and duplicates matter
high_scores = [1000, 950, 900, 850, 800]  # Ranked order
steps = ["preheat oven", "mix ingredients", "bake"]  # Sequential order
```

### List Access Patterns

```python
items = ["first", "second", "third"]

# Position-based access
items[0]     # First item
items[-1]    # Last item
items[1:3]   # Slice

# Iteration (most common)
for item in items:
    process(item)
```

---

## Dictionaries: Key-Value Lookups

Use a **dictionary** when:

1. **You need fast lookup by key** - Finding data by name, ID, etc.
2. **Data has natural "labels"** - Fields like name, age, email
3. **Each key is unique** - No duplicate keys allowed
4. **You need to associate values** - Map one thing to another

```python
# Good dictionary use cases
user = {"name": "Alice", "email": "alice@example.com", "age": 30}
word_counts = {"the": 100, "a": 85, "an": 42}
config = {"debug": True, "port": 8080, "host": "localhost"}
lookup_table = {"US": "United States", "UK": "United Kingdom"}
```

### Dictionary Access Patterns

```python
user = {"name": "Alice", "age": 30}

# Key-based access
user["name"]            # Direct lookup
user.get("email", "")   # Safe lookup with default

# Iteration patterns
for key in user:
    print(key, user[key])

for key, value in user.items():
    print(f"{key}: {value}")
```

---

## Performance Comparison (Big-O Basics)

Understanding performance helps you choose the right structure:

| Operation | List | Dictionary |
|-----------|------|------------|
| Access by index | O(1) - fast | N/A |
| Access by key | N/A | O(1) - fast |
| Search for value | O(n) - slow | O(n) for values |
| Check membership | O(n) - slow | O(1) - fast |
| Add to end | O(1) - fast | O(1) - fast |
| Insert/delete middle | O(n) - slow | O(1) - fast |

### What Does This Mean?

- **O(1)**: Same speed regardless of size (constant time)
- **O(n)**: Time grows with size (linear time)

```python
# Searching a list: O(n) - must check each element
names = ["alice", "bob", "charlie", ..., "zoe"]  # 1000 names
if "zoe" in names:  # Might check all 1000 names
    print("found")

# Dictionary lookup: O(1) - direct access
users = {"alice": ..., "bob": ..., ..., "zoe": ...}  # 1000 users
if "zoe" in users:  # Instant lookup, regardless of size
    print("found")
```

This is why dictionaries are so important - they make lookups fast even with large datasets.

---

## Conversion Examples

### When to Convert List to Dict

If you're frequently searching a list, consider converting to a dict:

```python
# Slow: searching list repeatedly
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 3, "name": "Charlie"}
]

# Finding user by ID requires searching
def find_user(user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    return None

# Fast: convert to dict for lookups
users_by_id = {user["id"]: user for user in users}
# {1: {"id": 1, "name": "Alice"}, 2: {...}, 3: {...}}

# Now lookup is instant
user = users_by_id.get(2)  # O(1)
```

### When to Keep a List

Sometimes a list is the right choice even when you could use a dict:

```python
# List is fine when:
# - You process all items sequentially
# - Order is meaningful
# - You need to sort, reverse, slice

scores = [95, 87, 92, 78, 88]
sorted_scores = sorted(scores, reverse=True)
top_three = sorted_scores[:3]
```

---

## Related Data Structures

Python has other built-in structures for specific use cases:

### Tuples: Immutable Sequences

Use tuples for fixed groups of related values:

```python
# Tuple - immutable, ordered
point = (10, 20)          # x, y coordinates
rgb = (255, 128, 0)       # Red, green, blue
person = ("Alice", 30)    # Name, age

# Unpacking
x, y = point
name, age = person

# Can be dict keys (lists cannot)
locations = {(0, 0): "origin", (1, 0): "right"}
```

### Sets: Unique Unordered Collections

Use sets when you only care about membership and uniqueness:

```python
# Set - unique elements, unordered
tags = {"python", "programming", "tutorial"}
visited = {1, 2, 3, 4, 5}

# Fast membership testing (like dict keys)
if "python" in tags:  # O(1)
    print("found")

# Removing duplicates from a list
numbers = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(numbers))  # [1, 2, 3, 4] (order may vary)

# Set operations
a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)  # Union: {1, 2, 3, 4}
print(a & b)  # Intersection: {2, 3}
print(a - b)  # Difference: {1}
```

---

## Decision Guide

Ask yourself these questions:

1. **Do I need to look up by a key (name, ID, etc.)?**
   - Yes → Dictionary
   - No → Continue...

2. **Does order matter?**
   - Yes → List (or OrderedDict for key-value)
   - No → Continue...

3. **Do I need unique items only?**
   - Yes → Set
   - No → List

4. **Is the data fixed/immutable?**
   - Yes → Tuple
   - No → List

5. **Am I mapping keys to values?**
   - Yes → Dictionary
   - No → Probably a list

---

## Practical Examples

### User Management System

```python
# List: when order/ranking matters
leaderboard = ["alice", "bob", "charlie"]  # Ranked 1st, 2nd, 3rd

# Dict: for user profiles (lookup by username)
users = {
    "alice": {"email": "alice@example.com", "score": 1000},
    "bob": {"email": "bob@example.com", "score": 950}
}

# Set: for tracking unique visitors
visitors = {"alice", "bob", "charlie", "alice"}  # Only 3 unique
```

### Configuration

```python
# Dict for named settings
config = {
    "debug": True,
    "database": "postgresql",
    "allowed_hosts": ["localhost", "example.com"]  # List inside dict
}

# Tuple for immutable coordinates
default_position = (0, 0)
```

### Data Processing

```python
# List: processing items in order
tasks = ["download", "process", "upload"]
for task in tasks:
    execute(task)

# Dict: counting occurrences
word_counts = {}
for word in words:
    word_counts[word] = word_counts.get(word, 0) + 1

# Set: finding unique items
unique_words = set(words)
```

---

## Key Takeaways

- **List**: Ordered, allows duplicates, access by index, O(n) search
- **Dictionary**: Key-value pairs, unique keys, O(1) lookup by key
- **Tuple**: Immutable sequence, good for fixed data, can be dict keys
- **Set**: Unique elements, O(1) membership testing, no duplicates
- Choose based on how you'll access the data, not just how you'll store it
- Convert between structures when access patterns change
- Dict lookup by key is fast (O(1)); list search is slow (O(n))
- When in doubt: list for sequences, dict for lookups

