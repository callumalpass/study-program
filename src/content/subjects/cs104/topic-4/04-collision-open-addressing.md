# Collision Resolution: Open Addressing

Open addressing is an alternative to chaining where all entries are stored directly in the bucket array. When a collision occurs, we probe for an empty slot using a deterministic sequence. This approach can be more cache-efficient than chaining.

## How Open Addressing Works

Instead of storing collided entries in a linked list, we find another empty slot in the array:

```
Insert "apple" (hash=5): Put at index 5
Insert "melon" (hash=5): Collision! Probe to find empty slot

Array: [None, None, None, None, None, "apple", "melon", None, ...]
                                        ^         ^
                                      index 5   index 6 (probed)
```

## Linear Probing

The simplest probing strategy: check consecutive slots.

```python
class HashTableLinearProbing:
    def __init__(self, size=10):
        self.size = size
        self.keys = [None] * size
        self.values = [None] * size
        self.count = 0
        self.DELETED = object()  # Sentinel for deleted entries

    def _hash(self, key):
        return hash(key) % self.size

    def _probe(self, key):
        """Generate probe sequence."""
        index = self._hash(key)
        for i in range(self.size):
            yield (index + i) % self.size

    def put(self, key, value):
        if self.count >= self.size * 0.7:  # Load factor check
            self._resize()

        for index in self._probe(key):
            if self.keys[index] is None or self.keys[index] is self.DELETED:
                # Found empty slot
                self.keys[index] = key
                self.values[index] = value
                self.count += 1
                return
            elif self.keys[index] == key:
                # Key exists - update value
                self.values[index] = value
                return

    def get(self, key):
        for index in self._probe(key):
            if self.keys[index] is None:
                raise KeyError(key)  # Empty slot means key doesn't exist
            if self.keys[index] == key:
                return self.values[index]
            # Continue probing (skip DELETED markers)
        raise KeyError(key)

    def remove(self, key):
        for index in self._probe(key):
            if self.keys[index] is None:
                raise KeyError(key)
            if self.keys[index] == key:
                self.keys[index] = self.DELETED
                self.values[index] = None
                self.count -= 1
                return
        raise KeyError(key)
```

### Clustering Problem

Linear probing suffers from **primary clustering**: groups of occupied slots grow larger, increasing probe lengths.

```
Insertions with hash values 5, 5, 6, 7, 5:

[_, _, _, _, _, A, _, _, _, _]  # A at 5
[_, _, _, _, _, A, B, _, _, _]  # B probes to 6
[_, _, _, _, _, A, B, C, _, _]  # C at 7 (no collision)
[_, _, _, _, _, A, B, C, D, _]  # D probes to 8
[_, _, _, _, _, A, B, C, D, E]  # E probes all the way to 9!
                ^^^^^^^^^^^
                  cluster
```

## Quadratic Probing

Instead of probing linearly, use quadratic increments: index + 1², index + 2², index + 3², ...

```python
def _probe_quadratic(self, key):
    index = self._hash(key)
    for i in range(self.size):
        yield (index + i * i) % self.size
```

Quadratic probing reduces primary clustering but can cause **secondary clustering**: keys with the same initial hash follow the same probe sequence.

**Important**: With quadratic probing, you may not visit all slots! Choose table size carefully (prime numbers work well).

## Double Hashing

Use a second hash function to determine the probe increment:

```python
def _hash2(self, key):
    """Second hash function - must never return 0."""
    return 7 - (hash(key) % 7)  # Common choice: prime - (hash % prime)

def _probe_double(self, key):
    index = self._hash(key)
    step = self._hash2(key)
    for i in range(self.size):
        yield (index + i * step) % self.size
```

Double hashing minimizes clustering because different keys have different probe sequences.

## Comparison of Probing Methods

| Method | Primary Clustering | Secondary Clustering | Cache Performance |
|--------|-------------------|---------------------|-------------------|
| Linear | Severe | Severe | Best (sequential) |
| Quadratic | None | Moderate | Good |
| Double Hashing | None | None | Fair (non-sequential) |

## Deletion Challenges

Open addressing makes deletion tricky. Simply setting a slot to `None` breaks the probe sequence:

```python
# Problem scenario:
# Insert A at 5, B at 6 (collision with A), C at 7
# Delete A: [_, _, _, _, _, None, B, C, ...]
# Search for B: hash(B)=5, find None, conclude B not in table - WRONG!
```

**Solution**: Use a special DELETED marker (tombstone):

```python
class HashTableWithTombstones:
    DELETED = object()

    def remove(self, key):
        for index in self._probe(key):
            if self.keys[index] is None:
                raise KeyError(key)
            if self.keys[index] == key:
                self.keys[index] = self.DELETED  # Tombstone, not None
                return
```

Over time, tombstones accumulate and degrade performance. Periodically rehash to clean them up.

## Load Factor Constraints

Open addressing requires stricter load factor limits than chaining:
- **Maximum recommended**: λ ≤ 0.7
- **As λ → 1**: Performance degrades severely

```python
def _resize(self):
    old_keys = self.keys
    old_values = self.values

    self.size *= 2
    self.keys = [None] * self.size
    self.values = [None] * self.size
    self.count = 0

    for i, key in enumerate(old_keys):
        if key is not None and key is not self.DELETED:
            self.put(key, old_values[i])
```

## Robin Hood Hashing

An optimization that reduces variance in probe lengths:

```python
def put_robin_hood(self, key, value):
    """
    If current entry has probed less than the entry we're inserting,
    swap them and continue inserting the displaced entry.
    """
    probe_length = 0
    index = self._hash(key)

    while True:
        if self.keys[index] is None:
            self.keys[index] = key
            self.values[index] = value
            self.probe_lengths[index] = probe_length
            return

        # "Rob from the rich": if resident has shorter probe, swap
        if self.probe_lengths[index] < probe_length:
            # Swap
            key, self.keys[index] = self.keys[index], key
            value, self.values[index] = self.values[index], value
            probe_length, self.probe_lengths[index] = self.probe_lengths[index], probe_length

        index = (index + 1) % self.size
        probe_length += 1
```

Robin Hood hashing ensures more uniform probe lengths, making worst-case performance more predictable.

## Chaining vs Open Addressing

| Aspect | Chaining | Open Addressing |
|--------|----------|-----------------|
| Memory | Extra (pointers) | Compact |
| Cache | Poor | Good |
| Load factor | Can exceed 1 | Must stay < 1 |
| Deletion | Easy | Needs tombstones |
| Implementation | Simpler | More complex |

**Use open addressing when:**
- Memory is constrained
- Cache performance matters
- Entries are small
- Deletions are rare

## Summary

Open addressing stores all entries in the main array, using probing to handle collisions. Linear probing is simple but suffers from clustering. Quadratic probing and double hashing reduce clustering. Deletion requires tombstones. Keep load factor below 0.7 for good performance. Open addressing offers better cache performance than chaining but requires more careful management.
