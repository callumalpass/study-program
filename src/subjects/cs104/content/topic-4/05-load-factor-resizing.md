---
id: cs104-t4-load-factor
title: "Load Factor and Resizing"
order: 5
---

# Load Factor and Dynamic Resizing

A hash table's performance depends critically on how full it is. The **load factor** measures this fullness, and **dynamic resizing** maintains performance as the table grows. Understanding these concepts is essential for implementing efficient hash tables.

## Understanding Load Factor

The load factor (λ) is the ratio of entries to buckets:

```
λ = n / m
where n = number of entries
      m = number of buckets
```

```python
class HashTable:
    def load_factor(self):
        return self.count / self.size
```

### Impact on Performance

As load factor increases:

| Load Factor | Chaining (avg probes) | Open Addressing (avg probes) |
|-------------|----------------------|------------------------------|
| 0.25 | 1.125 | 1.17 |
| 0.50 | 1.25 | 1.50 |
| 0.75 | 1.375 | 2.50 |
| 0.90 | 1.45 | 5.50 |
| 0.99 | 1.495 | 50.5 |

For open addressing with linear probing, average probes ≈ 1/(1-λ) for unsuccessful search.

## Choosing Load Factor Threshold

**Chaining:**
- Typical threshold: 0.75
- Can tolerate higher values (even > 1)
- Performance degrades gradually

**Open Addressing:**
- Typical threshold: 0.5 - 0.7
- Must stay below 1.0
- Performance degrades rapidly near capacity

```python
class HashTableChaining:
    MAX_LOAD_FACTOR = 0.75

class HashTableOpenAddressing:
    MAX_LOAD_FACTOR = 0.5
```

## Dynamic Resizing

When load factor exceeds threshold, double the table size and rehash all entries:

```python
class ResizableHashTable:
    def __init__(self, initial_size=8):
        self.size = initial_size
        self.buckets = [[] for _ in range(self.size)]
        self.count = 0
        self.max_load = 0.75

    def _should_resize(self):
        return self.count / self.size > self.max_load

    def _resize(self):
        old_buckets = self.buckets

        # Double the size
        self.size *= 2
        self.buckets = [[] for _ in range(self.size)]
        self.count = 0

        # Rehash all entries
        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value)

    def put(self, key, value):
        if self._should_resize():
            self._resize()

        index = hash(key) % self.size
        bucket = self.buckets[index]

        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return

        bucket.append((key, value))
        self.count += 1
```

## Amortized Analysis

Individual resize is O(n), but amortized cost per insertion is O(1).

**Intuition**: After resizing to 2m buckets, we need m more insertions before next resize. Those m insertions "pay" for the O(m) resize work.

```
Insertions: 1, 2, 3, 4, [resize: 4 ops], 5, 6, 7, 8, [resize: 8 ops], ...

Total work for n insertions:
= n + 1 + 2 + 4 + 8 + ... + n/2
= n + (n - 1)
= O(n)

Amortized per insertion: O(n)/n = O(1)
```

## Shrinking

Growing isn't enough - without shrinking, a table that grows large then empties wastes memory:

```python
class ShrinkableHashTable:
    MIN_LOAD_FACTOR = 0.125  # Shrink when 1/8 full
    MIN_SIZE = 8  # Never shrink below this

    def _should_shrink(self):
        return (self.size > self.MIN_SIZE and
                self.count / self.size < self.MIN_LOAD_FACTOR)

    def remove(self, key):
        # ... remove logic ...

        if self._should_shrink():
            self._shrink()

    def _shrink(self):
        old_buckets = self.buckets

        self.size //= 2
        self.buckets = [[] for _ in range(self.size)]
        self.count = 0

        for bucket in old_buckets:
            for key, value in bucket:
                self.put(key, value)
```

**Why shrink threshold < grow threshold?**

To prevent thrashing: rapidly alternating between grow and shrink.

```
Threshold: grow at 0.75, shrink at 0.75
- At 75% full, delete one item: shrink to 50%
- Insert one item: 100% full, grow to 25%
- Delete one item: shrink again!

Better: grow at 0.75, shrink at 0.25
- More buffer between thresholds
```

## Size Selection

**Powers of 2:**
- Fast modulo: `hash % size` = `hash & (size - 1)` (bitwise AND)
- May cause clustering if hash function is poor

**Prime numbers:**
- Better distribution
- Slower modulo (division)
- Traditional choice for open addressing

```python
# Python optimization for power-of-2 sizes
class FastHashTable:
    def __init__(self):
        self.size = 8  # Power of 2
        self.mask = self.size - 1

    def _index(self, key):
        return hash(key) & self.mask  # Faster than % for power of 2
```

## Incremental Resizing

Traditional resizing causes a pause during rehashing. **Incremental resizing** spreads the work:

```python
class IncrementalHashTable:
    def __init__(self):
        self.old_buckets = None
        self.new_buckets = [[] for _ in range(8)]
        self.size = 8
        self.rehash_index = 0

    def _incremental_rehash(self, steps=2):
        """Rehash a few buckets per operation."""
        if self.old_buckets is None:
            return

        for _ in range(steps):
            if self.rehash_index >= len(self.old_buckets):
                self.old_buckets = None  # Rehashing complete
                return

            bucket = self.old_buckets[self.rehash_index]
            for key, value in bucket:
                index = hash(key) % self.size
                self.new_buckets[index].append((key, value))

            self.rehash_index += 1

    def put(self, key, value):
        self._incremental_rehash()
        # ... rest of put logic on new_buckets ...

    def get(self, key):
        self._incremental_rehash()
        # Check both old and new buckets during transition
        # ...
```

## Real-World Implementations

**Python dict:**
- Initial size: 8
- Load factor threshold: 2/3 (≈0.67)
- Growth factor: 2× or 4× depending on size
- Uses open addressing with random probing

**Java HashMap:**
- Initial size: 16
- Load factor: 0.75 (configurable)
- Growth factor: 2×
- Converts chains to trees when chain length > 8

## Memory vs Speed Tradeoff

```python
# Memory-efficient: higher load factor, smaller tables
memory_efficient = HashTable(max_load=0.9)  # 10% empty slots

# Speed-efficient: lower load factor, more empty slots
speed_efficient = HashTable(max_load=0.5)   # 50% empty slots
```

## Summary

Load factor measures how full a hash table is. Maintain low load factor (typically ≤ 0.75) for O(1) performance. Resize dynamically when threshold is exceeded. Use amortized analysis to show O(1) average insert cost. Consider incremental resizing for real-time applications. Balance memory usage vs performance based on your needs.
