# Cache Mapping and Miss Types

Caching performance depends not just on size, but on *how* addresses map to cache storage.

## Mapping strategies (conceptual)

### Direct-mapped cache

Each memory block maps to exactly one cache location.

Pros: simple, fast
Cons: conflict misses if two hot blocks map to the same slot

### Set-associative cache

Each block maps to a set, but can be placed in any line in that set.

Pros: fewer conflicts than direct-mapped
Cons: more complex lookup and replacement

### Fully associative cache

Any block can go anywhere.

Pros: minimal conflict misses
Cons: expensive hardware; uncommon for large caches

## Types of misses

- **Compulsory miss**: first time you access a block
- **Capacity miss**: cache is too small to hold the working set
- **Conflict miss**: mapping forces blocks to evict each other

## Replacement policies (conceptual)

When a set is full, the cache must evict something:
- LRU (least recently used) approximations are common
- Random or FIFO exist in some designs

## Key takeaways

- Mapping strategy controls conflict behavior.
- Misses come from compulsory, capacity, or conflicts.
- Replacement policy affects which blocks survive in cache.

