---
id: cs104-t4-functions
title: "Hash Functions"
order: 2
---

# Hash Functions

The hash function is the heart of a hash table. A good hash function distributes keys uniformly across buckets, minimizing collisions and ensuring O(1) performance. Understanding hash function design helps you choose or implement appropriate hashing for your needs.

## Properties of Good Hash Functions

### 1. Deterministic

The same input must always produce the same output:

```python
# Good: deterministic
def hash_string(s):
    result = 0
    for char in s:
        result = result * 31 + ord(char)
    return result

# Bad: non-deterministic (includes randomness)
import random
def bad_hash(s):
    return random.randint(0, 100)  # Different each time!
```

### 2. Uniform Distribution

Keys should spread evenly across all buckets:

```python
# Visualize distribution
def test_distribution(hash_func, keys, num_buckets):
    counts = [0] * num_buckets
    for key in keys:
        index = hash_func(key) % num_buckets
        counts[index] += 1
    return counts

# Good distribution: [10, 11, 9, 10, 10, 10, 11, 9, 10, 10]
# Bad distribution:  [0, 0, 100, 0, 0, 0, 0, 0, 0, 0]
```

### 3. Fast Computation

Hash function should be O(1) for fixed-size inputs, O(n) for variable-length inputs like strings:

```python
# O(n) for string of length n - acceptable
def string_hash(s):
    h = 0
    for c in s:  # O(n)
        h = h * 31 + ord(c)
    return h

# Avoid expensive operations
import hashlib
def slow_hash(s):
    return int(hashlib.sha256(s.encode()).hexdigest(), 16)  # Overkill for hash table
```

### 4. Avalanche Effect

Small changes in input should cause significant changes in output:

```python
# With avalanche effect
hash("cat")   # -> 98262
hash("bat")   # -> 97731 (different despite one char change)

# Poor avalanche (bad hash function)
def bad_hash(s):
    return ord(s[0])  # Only considers first character
# "cat" and "car" would hash the same!
```

## Common Hash Functions

### Division Method

```python
def division_hash(key, table_size):
    return key % table_size
```

Choose table_size carefully:
- **Good**: Prime numbers far from powers of 2
- **Bad**: Powers of 2 (only uses low-order bits)

### Multiplication Method

```python
def multiplication_hash(key, table_size):
    A = 0.6180339887  # (sqrt(5) - 1) / 2
    return int(table_size * ((key * A) % 1))
```

Works well regardless of table size.

### String Hashing

```python
def polynomial_hash(s, table_size, base=31):
    """
    Polynomial rolling hash: s[0]*base^(n-1) + s[1]*base^(n-2) + ... + s[n-1]
    """
    h = 0
    for char in s:
        h = h * base + ord(char)
    return h % table_size

def djb2_hash(s):
    """
    Classic DJB2 hash - simple and effective.
    """
    h = 5381
    for char in s:
        h = ((h << 5) + h) + ord(char)  # h * 33 + char
    return h
```

### Python's Built-in Hash

```python
# Python's hash() is type-specific and well-designed
hash("hello")      # String hash
hash(42)           # 42 (small integers hash to themselves)
hash((1, 2, 3))    # Tuple hash (tuples are hashable)
hash([1, 2, 3])    # TypeError: lists are unhashable (mutable)
```

## Designing Hash Functions for Custom Objects

To use custom objects as dictionary keys, implement `__hash__` and `__eq__`:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __hash__(self):
        # Combine hashes of components
        return hash((self.x, self.y))

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# Now Point can be used as dict key
locations = {Point(0, 0): "origin", Point(1, 1): "diagonal"}
```

**Important rules:**
1. If `a == b`, then `hash(a) == hash(b)` (required)
2. If `hash(a) == hash(b)`, `a == b` is NOT required (collisions allowed)
3. Hash value must not change while object is in hash table

## Cryptographic vs Non-Cryptographic Hashes

| Aspect | Non-Cryptographic | Cryptographic |
|--------|-------------------|---------------|
| Purpose | Hash tables | Security |
| Speed | Very fast | Slower |
| Examples | DJB2, MurmurHash | SHA-256, bcrypt |
| Collision resistance | Good enough | Extremely high |

Don't use cryptographic hashes for hash tables - they're overkill and slower.

## Universal Hashing

To defend against adversarial inputs (where attacker knows your hash function), use **universal hashing**: randomly select from a family of hash functions at runtime.

```python
import random

class UniversalHashFamily:
    def __init__(self, table_size, prime=2147483647):
        self.table_size = table_size
        self.prime = prime
        # Random coefficients chosen once at initialization
        self.a = random.randint(1, prime - 1)
        self.b = random.randint(0, prime - 1)

    def hash(self, key):
        return ((self.a * key + self.b) % self.prime) % self.table_size
```

## Hash Function Attacks

If attackers know your hash function, they can craft inputs that all hash to the same bucket, degrading O(1) to O(n).

**Defenses:**
1. Universal hashing (randomized)
2. Python's hash randomization (PYTHONHASHSEED)
3. Use tree-based collision resolution (O(log n) worst case)

## Testing Hash Quality

```python
def chi_square_test(hash_func, keys, num_buckets):
    """
    Chi-square test for uniformity.
    Lower values indicate more uniform distribution.
    """
    counts = [0] * num_buckets
    for key in keys:
        counts[hash_func(key) % num_buckets] += 1

    expected = len(keys) / num_buckets
    chi_sq = sum((c - expected) ** 2 / expected for c in counts)
    return chi_sq
```

## Summary

Good hash functions are deterministic, uniformly distributed, fast, and exhibit the avalanche effect. For strings, polynomial hashing (like DJB2) works well. For custom objects, combine component hashes. Avoid cryptographic hashes for hash tables - they're slower than needed. Consider universal hashing when defending against adversarial inputs.
