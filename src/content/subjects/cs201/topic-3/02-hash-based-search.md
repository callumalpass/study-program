# Hash-Based Search

Hash tables provide O(1) average-case search, insert, and delete operations. Understanding hash functions and collision handling is essential for efficient algorithm design.

## Hash Table Fundamentals

A hash table maps keys to values using a hash function.

```python
class HashTable:
    def __init__(self, size=1000):
        self.size = size
        self.buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)
                return
        self.buckets[idx].append((key, value))

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        raise KeyError(key)
```

## Hash Functions

A good hash function:
1. Distributes keys uniformly
2. Is deterministic
3. Is fast to compute

### Common Hash Functions

**Division method**:
```python
def hash_division(key, m):
    return key % m
# m should be prime, not close to power of 2
```

**Multiplication method**:
```python
def hash_multiply(key, m):
    A = 0.6180339887  # (√5 - 1) / 2
    return int(m * ((key * A) % 1))
```

**Polynomial rolling hash** (for strings):
```python
def hash_string(s, base=31, mod=10**9 + 7):
    h = 0
    for c in s:
        h = (h * base + ord(c)) % mod
    return h
```

## Collision Handling

### Chaining (Separate Chaining)

Each bucket is a linked list of entries.

```
Bucket 0: → (key1, val1) → (key5, val5)
Bucket 1: → (key2, val2)
Bucket 2: → (key3, val3) → (key4, val4) → (key6, val6)
```

**Performance**:
- Average: O(1 + α) where α = n/m (load factor)
- Worst: O(n) if all keys hash to same bucket

### Open Addressing

All entries stored in the table itself. Probe for next empty slot.

**Linear probing**:
```python
def insert_linear(table, key, value):
    idx = hash(key) % len(table)
    while table[idx] is not None:
        if table[idx][0] == key:
            table[idx] = (key, value)
            return
        idx = (idx + 1) % len(table)
    table[idx] = (key, value)
```

**Quadratic probing**:
```python
def insert_quadratic(table, key, value):
    idx = hash(key) % len(table)
    i = 1
    while table[idx] is not None:
        if table[idx][0] == key:
            table[idx] = (key, value)
            return
        idx = (idx + i * i) % len(table)
        i += 1
    table[idx] = (key, value)
```

**Double hashing**:
```python
def insert_double(table, key, value):
    h1 = hash1(key) % len(table)
    h2 = hash2(key)
    idx = h1
    while table[idx] is not None:
        if table[idx][0] == key:
            table[idx] = (key, value)
            return
        idx = (idx + h2) % len(table)
    table[idx] = (key, value)
```

## Load Factor and Resizing

**Load factor** α = n/m (items / buckets)

- α < 0.7: Good performance
- α > 0.7: Consider resizing
- α > 1: Not possible with open addressing

**Resizing**:
```python
def resize(self):
    old_buckets = self.buckets
    self.size *= 2
    self.buckets = [[] for _ in range(self.size)]

    for bucket in old_buckets:
        for key, value in bucket:
            self.put(key, value)
```

## Time Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(1) | O(n) |
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |

Worst case occurs with poor hash function or adversarial input.

## Hash Table Applications

### Two Sum

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None
```

### Counting Frequencies

```python
from collections import Counter

def most_frequent(nums, k):
    counts = Counter(nums)
    return [item for item, _ in counts.most_common(k)]
```

### Anagram Detection

```python
def are_anagrams(s1, s2):
    return Counter(s1) == Counter(s2)

def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))
        groups.setdefault(key, []).append(s)
    return list(groups.values())
```

### Caching (Memoization)

```python
def fibonacci(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fibonacci(n-1) + fibonacci(n-2)
    return cache[n]
```

## Hash Sets

Set operations in O(1) average:

```python
seen = set()
seen.add(item)      # O(1)
item in seen        # O(1)
seen.remove(item)   # O(1)

# Set operations
a | b  # Union
a & b  # Intersection
a - b  # Difference
```

## Python's dict and set

Python's dict uses open addressing with:
- Randomized hash (PYTHONHASHSEED)
- Compact dict (Python 3.6+) preserving insertion order
- Load factor ≤ 2/3

```python
# Dictionary operations
d = {}
d[key] = value      # O(1) avg
value = d[key]      # O(1) avg
key in d            # O(1) avg
del d[key]          # O(1) avg
```

## When to Use Hash Tables

**Good for**:
- Fast lookup by key
- Counting/frequency problems
- Deduplication
- Caching

**Consider alternatives when**:
- Need sorted order → balanced BST
- Need range queries → BST or segment tree
- Memory constrained → Bloom filter for membership
- Adversarial inputs → Use randomized hash
