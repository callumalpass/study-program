---
id: cs201-t3-bloom
title: "Bloom Filters and Probabilistic Structures"
order: 6
---

# Bloom Filters and Probabilistic Data Structures

Traditional data structures provide exact answers: an element is either in the set or not, a counter holds the precise count, cardinality is an exact number. But exactness comes at a cost—typically O(n) space for n elements. When dealing with billions of elements, this becomes prohibitive: storing 1 billion URLs requires tens of gigabytes minimum.

Probabilistic data structures offer a radical trade-off: accept a small error rate in exchange for dramatic space savings. A Bloom filter can tell you whether an element might be in a set using only a few bits per element. HyperLogLog estimates cardinality using mere kilobytes regardless of set size. Count-Min Sketch tracks frequencies in sublinear space.

These structures are essential for big data applications where exact answers are either impossible (the data is too large) or unnecessary (approximate answers suffice for the application). Web caches, network routers, databases, and streaming analytics all rely on probabilistic data structures.

## The Problem

Checking set membership:
- Hash set: O(1) time, O(n) space
- Sorted array: O(log n) time, O(n) space

What if we have billions of elements? Storing billion-element sets requires gigabytes of memory. Yet many applications need only to check whether elements are probably present—not to retrieve associated values.

**Solution**: Accept small false positive rate for huge space reduction. A 1% error rate might be perfectly acceptable if it means using 40x less memory.

## Bloom Filters

Burton Howard Bloom introduced this structure in 1970, and it remains one of the most widely deployed probabilistic data structures. A Bloom filter is a space-efficient probabilistic set membership test—it can definitively say an element is NOT in the set, or say the element MIGHT be in the set.

A probabilistic set membership test.

### Key Properties

- **No false negatives**: If filter says "not present," definitely not present
- **Possible false positives**: If filter says "present," might not be
- **Space efficient**: ~10 bits per element for 1% error rate
- **No deletions**: Can't remove elements

### Structure

```python
class BloomFilter:
    def __init__(self, size, num_hashes):
        self.bits = [False] * size
        self.size = size
        self.num_hashes = num_hashes

    def _hashes(self, item):
        """Generate k hash values."""
        h1 = hash(item)
        h2 = hash(str(item) + "salt")
        for i in range(self.num_hashes):
            yield (h1 + i * h2) % self.size

    def add(self, item):
        for pos in self._hashes(item):
            self.bits[pos] = True

    def might_contain(self, item):
        return all(self.bits[pos] for pos in self._hashes(item))
```

### How It Works

**Add element**: Set k bit positions (from k hash functions)

**Query element**: Check if all k positions are set

**False positive**: All positions happen to be set by other elements

### Analysis

**Probability of false positive**:

After inserting n elements with k hash functions into m bits:

```
P(false positive) ≈ (1 - e^(-kn/m))^k
```

**Optimal number of hash functions**:

```
k = (m/n) × ln(2) ≈ 0.7 × (m/n)
```

**Space for desired error rate**:

```
m = -n × ln(p) / (ln(2))²
```

For 1% error rate: m ≈ 9.6 bits per element

### Example Calculation

Store 1 billion URLs with 1% false positive rate:
- Space needed: 9.6 billion bits ≈ 1.2 GB
- Hash functions: 7
- Compare to actual storage: ~50 GB minimum

40× space reduction!

This calculation reveals why Bloom filters are so practical: a few bits per element with a few hash functions achieves very low false positive rates. The trade-off between space and accuracy is tunable—using more bits reduces errors.

## Counting Bloom Filters

Standard Bloom filters have one significant limitation: elements cannot be removed. Once a bit is set to 1, we can't know whether one or many elements contributed to that bit. Removing an element by clearing its bits might incorrectly remove other elements that share those bits.

Counting Bloom filters solve this by using counters instead of bits. Each slot holds a count of how many elements have set it. Insertion increments counters; deletion decrements them.

Support deletions by using counters instead of bits.

```python
class CountingBloomFilter:
    def __init__(self, size, num_hashes):
        self.counts = [0] * size
        self.size = size
        self.num_hashes = num_hashes

    def add(self, item):
        for pos in self._hashes(item):
            self.counts[pos] += 1

    def remove(self, item):
        if self.might_contain(item):
            for pos in self._hashes(item):
                self.counts[pos] -= 1

    def might_contain(self, item):
        return all(self.counts[pos] > 0 for pos in self._hashes(item))
```

**Tradeoff**: 4× space (4-bit counters typically sufficient)

## Cuckoo Filters

Cuckoo filters (2014) represent the modern evolution of Bloom filters, addressing key limitations while often achieving better space efficiency. They support deletion naturally and provide faster lookups.

Modern alternative with deletions and better space.

### Structure

The key innovation is storing fingerprints (compact hash values) rather than just setting bits. Each fingerprint identifies which element set the slot, enabling deletion. The name comes from cuckoo hashing, where elements can be relocated to make room for new insertions.

Based on cuckoo hashing:
- Store fingerprints (partial hashes) in buckets
- Each element can be in one of two buckets
- Supports deletion

```python
class CuckooFilter:
    def __init__(self, capacity, bucket_size=4):
        self.buckets = [[None] * bucket_size
                        for _ in range(capacity)]
        self.capacity = capacity
        self.bucket_size = bucket_size

    def _fingerprint(self, item):
        return hash(item) % 256  # 8-bit fingerprint

    def _bucket_indices(self, item, fp):
        h1 = hash(item) % self.capacity
        h2 = (h1 ^ hash(fp)) % self.capacity
        return h1, h2

    def insert(self, item):
        fp = self._fingerprint(item)
        b1, b2 = self._bucket_indices(item, fp)

        # Try to insert in primary bucket
        for i in range(self.bucket_size):
            if self.buckets[b1][i] is None:
                self.buckets[b1][i] = fp
                return True

        # Try alternate bucket
        for i in range(self.bucket_size):
            if self.buckets[b2][i] is None:
                self.buckets[b2][i] = fp
                return True

        # Relocate existing entries
        return self._relocate(b1, fp)
```

### Advantages Over Bloom Filters

| Feature | Bloom Filter | Cuckoo Filter |
|---------|--------------|---------------|
| Deletion | No | Yes |
| Space efficiency | Good | Better |
| Lookup speed | O(k) | O(1) |
| False positive rate | Configurable | Configurable |

## HyperLogLog

HyperLogLog solves a fundamental streaming problem: counting distinct elements (cardinality estimation) in a stream too large to store. How many unique IP addresses visited a website? How many distinct queries did users make? Exact answers require storing all elements; HyperLogLog provides accurate estimates using tiny space.

Count distinct elements in a stream.

### The Problem

Count unique visitors to a website. Stream is too large to store. Exact counting requires remembering all seen elements—O(n) space. HyperLogLog achieves ~1% accuracy using only O(log log n) space.

### Key Insight

The algorithm exploits a probabilistic observation: if you hash elements uniformly, the maximum number of leading zeros seen in any hash is a good estimator of how many distinct elements you've processed. Seeing 5 leading zeros suggests roughly 2^5 = 32 distinct elements, because getting 5 leading zeros happens with probability 1/32.

Hash each element. Track maximum number of leading zeros seen.

If maximum leading zeros = k, estimate ≈ 2^k unique elements. The full HyperLogLog algorithm uses many registers to reduce variance, taking a harmonic mean of estimates.

```python
class HyperLogLog:
    def __init__(self, precision=14):
        self.p = precision
        self.m = 2 ** precision
        self.registers = [0] * self.m

    def add(self, item):
        h = hash(item)
        # First p bits determine register
        register = h & (self.m - 1)
        # Remaining bits for leading zero count
        remaining = h >> self.p
        leading_zeros = self._count_leading_zeros(remaining)
        self.registers[register] = max(self.registers[register],
                                        leading_zeros + 1)

    def count(self):
        # Harmonic mean of estimates
        Z = sum(2 ** -r for r in self.registers)
        estimate = self.alpha * self.m ** 2 / Z
        return int(estimate)
```

### Properties

- **Space**: O(log log n) bits
- **Error**: ~1.04 / √m (≈1.6% with 16KB)
- **Mergeable**: Combine counts from distributed systems

### Example

Count unique IPs in 1 billion log entries:
- Exact: Store all IPs ≈ 4 GB
- HyperLogLog: 16 KB with 1.6% error

250,000× space reduction!

The mergeability property is crucial for distributed systems: you can count distinct elements across many servers, then merge the HyperLogLog sketches to get the global count. This enables cardinality estimation at massive scale.

## Count-Min Sketch

While HyperLogLog counts distinct elements, Count-Min Sketch tracks how often each element appears—frequency estimation. Given a stream of billions of events, which items appeared most frequently? Exact answers require a counter for each distinct element; Count-Min Sketch provides approximate answers using fixed space.

Estimate frequency of elements in a stream.

```python
class CountMinSketch:
    def __init__(self, width, depth):
        self.width = width
        self.depth = depth
        self.table = [[0] * width for _ in range(depth)]

    def _hashes(self, item):
        for i in range(self.depth):
            yield hash(str(item) + str(i)) % self.width

    def add(self, item, count=1):
        for i, pos in enumerate(self._hashes(item)):
            self.table[i][pos] += count

    def estimate(self, item):
        return min(self.table[i][pos]
                   for i, pos in enumerate(self._hashes(item)))
```

### Properties

- Only overestimates (never undercounts)
- Error proportional to total stream size
- Used for finding frequent items, heavy hitters

## Applications

Probabilistic data structures appear throughout modern systems wherever scale demands approximate solutions.

### Web Caching

Check if URL is cached:
- Bloom filter at proxy
- Avoid expensive cache lookups for uncached URLs

Akamai and other CDNs use Bloom filters to quickly reject requests for uncached content, avoiding expensive disk lookups. A false positive means an unnecessary disk check; a false negative is impossible, so cache correctness is preserved.

### Databases

Before disk read:
- Check Bloom filter
- Skip I/O if definitely not present

LevelDB, RocksDB, and Cassandra use Bloom filters to avoid reading disk blocks that don't contain the requested key. This significantly reduces I/O for negative lookups.

### Spell Checking

Dictionary lookup:
- Bloom filter for common words
- Full dictionary only if uncertain

Memory-constrained spell checkers use Bloom filters containing correct words. A word not in the filter is definitely misspelled; a word that might be in the filter requires verification against the full dictionary.

### Network Security

Block malicious URLs:
- Bloom filter with known bad URLs
- Low latency checking

Browsers use Bloom filters to quickly check URLs against known-malicious lists. The filter must be small enough to download and store locally, making Bloom filters essential for client-side security checking.

## Summary

| Structure | Query | Space | Updates | Use Case |
|-----------|-------|-------|---------|----------|
| Bloom Filter | Membership | O(n) bits | Add only | Set membership |
| Cuckoo Filter | Membership | O(n) bits | Add/Remove | Deletable sets |
| HyperLogLog | Cardinality | O(log n) bits | Add only | Unique counting |
| Count-Min | Frequency | O(1/ε²) | Add only | Frequency estimation |

Probabilistic data structures are essential for big data—enabling queries that would otherwise be impossible due to scale. The key insight is that many applications don't require perfect accuracy: a 1% error rate is acceptable if it means using 40x less memory.

Understanding when approximate answers suffice—and choosing the right probabilistic structure for the task—is increasingly important as data scales grow. These structures represent a fundamental paradigm shift: from demanding exact answers to accepting controlled uncertainty in exchange for feasibility.
