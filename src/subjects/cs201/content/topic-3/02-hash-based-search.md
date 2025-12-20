---
id: cs201-t3-hash
title: "Hash-Based Search"
order: 2
---

# Hash-Based Search

Hash tables provide O(1) average-case search, insert, and delete operations—a remarkable achievement that underpins countless applications from databases and caches to compilers and network routers. While arrays offer O(1) access by index, hash tables extend this efficiency to arbitrary keys: strings, objects, or any hashable data.

The fundamental idea is deceptively simple: use a function to compute an index from a key, then store the value at that index. The challenge lies in handling the inevitable collisions when different keys map to the same index. Understanding hash functions and collision resolution strategies is essential for designing efficient algorithms and diagnosing performance problems.

Hash tables exemplify a common trade-off in algorithm design: we sacrifice worst-case guarantees for excellent average-case performance. With a good hash function and reasonable load factor, operations are effectively constant time. With a poor hash function or adversarial inputs, performance degrades to linear time. This tension between typical and worst case makes understanding hash tables deeply important.

## Hash Table Fundamentals

A hash table maps keys to values using a hash function that computes an array index from a key. The hash function determines where to look for a key—ideally spreading keys uniformly across available slots to minimize collisions.

The basic operations are straightforward: to insert a key-value pair, compute the hash and store at that position (handling collisions appropriately). To find a value, compute the hash and search the corresponding location. Deletion requires care to maintain the ability to find other elements.

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

This implementation uses chaining: each bucket holds a list of key-value pairs that hash to that index. When inserting, we either update an existing key or append a new entry. When searching, we scan the bucket for the matching key.

## Hash Functions

The quality of a hash table depends critically on its hash function. A good hash function has three essential properties:

1. **Uniform distribution**: Keys should spread evenly across buckets. Clustering leads to long chains and poor performance.

2. **Deterministic**: The same key must always produce the same hash. Randomness in the hash function would make retrieval impossible.

3. **Efficient computation**: Hash computation happens on every operation, so it must be fast. A complex hash function defeats the purpose of O(1) operations.

### Common Hash Functions

**Division method**: The simplest approach uses modular arithmetic. The key insight is that the divisor should be prime and not close to a power of 2, which helps distribute keys even when input patterns exist.

```python
def hash_division(key, m):
    return key % m
# m should be prime, not close to power of 2
```

**Multiplication method**: This approach is less sensitive to the choice of table size. Multiply the key by a constant, extract the fractional part, and scale to the table size. The golden ratio constant produces particularly good distributions.

```python
def hash_multiply(key, m):
    A = 0.6180339887  # (√5 - 1) / 2
    return int(m * ((key * A) % 1))
```

**Polynomial rolling hash**: For strings and sequences, we treat characters as coefficients of a polynomial and evaluate at a base point. This approach supports efficient updates when the string changes by one character.

```python
def hash_string(s, base=31, mod=10**9 + 7):
    h = 0
    for c in s:
        h = (h * base + ord(c)) % mod
    return h
```

The choice of base affects distribution (typically a small prime like 31 or 37), while the modulus determines the hash range (often a large prime near 10^9).

## Collision Handling

Collisions are inevitable: with more possible keys than table slots, the pigeonhole principle guarantees that some keys will hash to the same location. The two main strategies are chaining and open addressing.

### Chaining (Separate Chaining)

Each bucket maintains a linked list (or other collection) of entries that hash to that index. Collisions simply add to the chain.

```
Bucket 0: → (key1, val1) → (key5, val5)
Bucket 1: → (key2, val2)
Bucket 2: → (key3, val3) → (key4, val4) → (key6, val6)
```

**Performance analysis**:
- Average: O(1 + α) where α = n/m is the load factor (items per bucket)
- Worst: O(n) if all keys hash to the same bucket

Chaining handles high load factors gracefully—chains grow longer but the table still functions. Memory overhead includes pointers for the linked structure.

### Open Addressing

All entries are stored directly in the table array. When a collision occurs, we probe for the next available slot according to a probing sequence. Open addressing uses memory more efficiently but requires careful management of deleted entries.

**Linear probing**: Check consecutive slots until finding an empty one. Simple but susceptible to clustering—runs of occupied slots tend to grow.

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

**Quadratic probing**: Probes follow a quadratic sequence (1, 4, 9, 16, ...), reducing primary clustering. However, two keys with the same initial hash still follow the same probe sequence (secondary clustering).

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

**Double hashing**: Uses a second hash function to determine the probe step, eliminating secondary clustering. Each key has its own unique probe sequence.

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

The **load factor** α = n/m measures how full the table is (n items in m slots). Performance degrades as load factor increases—more collisions mean longer searches.

Guidelines for load factor:
- α < 0.7: Good performance for most applications
- α > 0.7: Consider resizing to maintain efficiency
- α > 1: Impossible with open addressing (more items than slots)

**Dynamic resizing** maintains performance by growing the table when load factor exceeds a threshold:

```python
def resize(self):
    old_buckets = self.buckets
    self.size *= 2
    self.buckets = [[] for _ in range(self.size)]

    for bucket in old_buckets:
        for key, value in bucket:
            self.put(key, value)
```

Resizing is expensive—O(n) to rehash all elements—but happens rarely enough that amortized insertion cost remains O(1).

## Time Complexity

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | O(1) | O(n) |
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |

Worst case occurs with a poor hash function, adversarial input designed to cause collisions, or a heavily loaded table. Good design minimizes these risks through careful hash function selection and dynamic resizing.

## Hash Table Applications

Hash tables enable efficient solutions to many common problems.

### Two Sum

Given an array and target sum, find two numbers that add to the target. A hash table turns O(n²) brute force into O(n) by remembering previously seen values.

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

Hash tables naturally count occurrences—each key maps to its count.

```python
from collections import Counter

def most_frequent(nums, k):
    counts = Counter(nums)
    return [item for item, _ in counts.most_common(k)]
```

### Anagram Detection

Anagrams contain the same characters in different orders. Comparing sorted characters or character frequency maps solves this efficiently.

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

Hash tables provide natural caching—store computed results keyed by their inputs.

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

A hash set stores keys without values, supporting efficient membership testing. All set operations achieve O(1) average time.

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

Python's dict implementation is highly optimized, using open addressing with:
- Randomized hash seed (PYTHONHASHSEED) to prevent adversarial attacks
- Compact dict representation (Python 3.6+) that preserves insertion order
- Load factor kept ≤ 2/3 through automatic resizing

```python
# Dictionary operations - all O(1) average
d = {}
d[key] = value      # Insert/update
value = d[key]      # Lookup
key in d            # Membership test
del d[key]          # Deletion
```

## When to Use Hash Tables

**Hash tables excel at**:
- Fast lookup by key when order doesn't matter
- Counting and frequency problems
- Deduplication (removing duplicates)
- Caching and memoization

**Consider alternatives when**:
- Need sorted order → Use balanced BST (TreeMap)
- Need range queries → Use BST or segment tree
- Memory constrained → Consider Bloom filter for membership
- Adversarial inputs possible → Use cryptographic hash or randomized structure
- Need worst-case guarantees → Use balanced trees

Hash tables represent one of the most practical data structures in computing, offering a compelling combination of simplicity and efficiency that makes them the default choice for associative lookup across virtually all programming domains.
