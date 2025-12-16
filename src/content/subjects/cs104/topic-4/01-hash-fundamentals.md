# Hash Table Fundamentals

Hash tables are among the most important data structures in computer science, providing average O(1) time complexity for insertions, deletions, and lookups. Understanding how they work is essential for every programmer.

## What is a Hash Table?

A hash table (also called hash map, dictionary, or associative array) stores key-value pairs and uses a **hash function** to compute an index into an array of buckets, where the desired value can be found.

```python
# Conceptual model
keys:   ["apple", "banana", "cherry"]
          |         |         |
          v         v         v
hash():   42        17        42  # Hash collision!
          |         |         |
          v         v         v
buckets: [None, None, ..., [("banana", 5)], ..., [("apple", 3), ("cherry", 7)], ...]
```

## The Hash Function

A hash function takes input of any size and produces a fixed-size output (the hash code). Good hash functions have these properties:

1. **Deterministic**: Same input always produces same output
2. **Uniform distribution**: Outputs are spread evenly across the range
3. **Fast to compute**: O(1) for fixed-size inputs
4. **Avalanche effect**: Small input changes cause large output changes

```python
# Simple hash function example (not recommended for production)
def simple_hash(key, size):
    if isinstance(key, str):
        total = 0
        for char in key:
            total += ord(char)
        return total % size
    return hash(key) % size

# Python's built-in hash function
print(hash("hello"))  # Some integer
print(hash(42))       # 42 (integers hash to themselves)
```

## Array-Based Storage

Hash tables use arrays for O(1) access. The hash function converts keys to array indices:

```python
class SimpleHashTable:
    def __init__(self, size=100):
        self.size = size
        self.buckets = [None] * size

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)
        self.buckets[index] = (key, value)  # Overwrites on collision!

    def get(self, key):
        index = self._hash(key)
        if self.buckets[index] is not None:
            stored_key, value = self.buckets[index]
            if stored_key == key:
                return value
        return None
```

This simple version has a critical flaw: collisions overwrite data!

## Understanding Collisions

A **collision** occurs when two different keys hash to the same index:

```python
size = 10
hash("apple") % size  # -> 5
hash("melon") % size  # -> 5  # Collision!
```

Collisions are inevitable due to the **pigeonhole principle**: if you have more keys than buckets, at least two keys must share a bucket.

The **birthday paradox** shows collisions occur sooner than intuition suggests: in a room of just 23 people, there's a 50% chance two share a birthday!

## Basic Operations

### Insert (Put)

1. Compute hash of key
2. Find bucket at that index
3. Add/update key-value pair (handling collisions)

### Search (Get)

1. Compute hash of key
2. Go to bucket at that index
3. Find key in bucket (may need to search within bucket)

### Delete

1. Compute hash of key
2. Go to bucket at that index
3. Remove key-value pair if found

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert    | O(1)    | O(n)       |
| Search    | O(1)    | O(n)       |
| Delete    | O(1)    | O(n)       |

Worst case occurs when all keys hash to the same bucket. Good hash functions and appropriate sizing make this extremely rare.

## Python's dict

Python's `dict` is implemented as a hash table:

```python
# Creating dictionaries
d = {}
d = dict()
d = {"name": "Alice", "age": 30}

# Operations - all O(1) average
d["key"] = "value"     # Insert
value = d["key"]       # Access
del d["key"]           # Delete
"key" in d             # Membership check
```

Python uses several optimizations:
- **Open addressing** with random probing
- **Compact layout** for cache efficiency
- **Automatic resizing** when load factor exceeds threshold

## Hash Table vs Array

| Aspect | Hash Table | Array |
|--------|------------|-------|
| Access by key | O(1) average | N/A (needs index) |
| Access by index | N/A | O(1) |
| Search by value | O(n) | O(n) |
| Memory | More (overhead) | Less |
| Order | Unordered* | Ordered |

*Python 3.7+ dicts maintain insertion order as implementation detail.

## When to Use Hash Tables

**Good use cases:**
- Counting occurrences
- Caching/memoization
- Removing duplicates
- Group/categorize items
- Fast lookup tables

**Poor use cases:**
- Need sorted data
- Need to find min/max efficiently
- Memory is extremely limited
- All keys hash to same value

## Summary

Hash tables provide O(1) average-case operations by using hash functions to map keys to array indices. Collisions are inevitable but manageable with proper techniques. Understanding the fundamentals prepares you for collision resolution strategies and practical applications covered in following sections.
