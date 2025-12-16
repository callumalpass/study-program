# Cache Organization

The way a cache is organized—how it maps memory addresses to cache locations—significantly impacts hit rate and hardware complexity. This section covers the three main cache organizations: direct-mapped, fully associative, and set-associative.

## Direct-Mapped Cache

In a **direct-mapped cache**, each memory block maps to exactly one cache location.

### Mapping Function

```
Cache Index = (Block Address) mod (Number of Cache Blocks)
```

Or equivalently, use specific address bits as the index.

### Structure

```
Address: [Tag | Index | Offset]

                ┌──────────────────────────────────────┐
  Index         │ Cache                                │
  ────────────► ├──────┬───────┬────────────────────────┤
                │Valid │  Tag  │        Data           │
                ├──────┼───────┼────────────────────────┤
   0            │  1   │ 0x1A  │  [...data...]        │
                ├──────┼───────┼────────────────────────┤
   1            │  1   │ 0x3F  │  [...data...]        │
                ├──────┼───────┼────────────────────────┤
   2            │  0   │  --   │  [invalid]           │
                ├──────┼───────┼────────────────────────┤
   3            │  1   │ 0x22  │  [...data...]        │
                └──────┴───────┴────────────────────────┘
                            │
                            ▼
                       Compare Tag
                            │
                            ▼
                     Hit if match AND valid
```

### Lookup Process

1. Extract index bits from address
2. Access the cache line at that index
3. Compare tag bits with stored tag
4. Hit if tags match AND valid bit is set

### Example

8-entry cache, 4-byte blocks, 16-bit addresses:

```
Block offset: 2 bits (4 bytes)
Index: 3 bits (8 entries)
Tag: 11 bits

Address 0x0305:
Binary: 0000001100000101
Tag: 00000011000 = 0x18
Index: 001 = 1
Offset: 01 = 1

Maps to cache line 1, byte 1 within block
```

### Advantages

- **Simple hardware**: One comparison, one data access
- **Fast lookup**: Single cycle possible
- **Low power**: Minimal comparators

### Disadvantages

- **Conflict misses**: Multiple blocks competing for same line

```
Accessing: 0x0000, 0x1000, 0x0000, 0x1000, ... (ping-pong)
Both map to same index = 100% miss rate!
```

## Fully Associative Cache

In a **fully associative cache**, any memory block can go in any cache location.

### Structure

```
Address: [Tag | Offset]  (no index!)

           ┌──────────────────────────────────────────────────┐
           │ Cache                                            │
           ├──────┬───────┬─────────────────────────────────────┤
           │Valid │  Tag  │              Data                  │
           ├──────┼───────┼─────────────────────────────────────┤
           │  1   │ 0x1A  │  [...data...]                     │
           ├──────┼───────┼─────────────────────────────────────┤
           │  1   │ 0x3F  │  [...data...]  ◄── Could be here  │
           ├──────┼───────┼─────────────────────────────────────┤
           │  1   │ 0x07  │  [...data...]                     │
           ├──────┼───────┼─────────────────────────────────────┤
           │  1   │ 0x22  │  [...data...]                     │
           └──────┴───────┴─────────────────────────────────────┘
                     │
                     ▼
              Compare ALL tags simultaneously
                     │
                     ▼
              Hit if ANY match AND valid
```

### Lookup Process

1. Compare tag with ALL cache entries simultaneously
2. Hit if any entry matches and is valid
3. Select data from matching entry

### Advantages

- **No conflict misses**: Any block can go anywhere
- **Maximum flexibility**: Best possible hit rate for given size

### Disadvantages

- **Expensive hardware**: Need N comparators for N-entry cache
- **Slow lookup**: All comparisons in parallel adds delay
- **High power**: Many active comparators

### Use Cases

Fully associative is practical only for small caches:
- TLBs (64-256 entries)
- Victim caches (4-16 entries)
- Small specialized buffers

## Set-Associative Cache

**Set-associative caches** combine direct-mapped and fully associative approaches.

### N-Way Set Associative

- Cache divided into **sets**
- Each set contains **N ways** (blocks)
- Memory block maps to one set, but can be in any way within that set

### Structure (4-way example)

```
Address: [Tag | Index | Offset]

               ┌───────────────────────────────────────────────────────┐
  Index        │                     Cache                             │
  ──────────►  │   Way 0      Way 1      Way 2      Way 3             │
               ├──────────┬──────────┬──────────┬──────────────────────┤
   Set 0       │V|Tag|Data│V|Tag|Data│V|Tag|Data│V|Tag|Data          │
               ├──────────┼──────────┼──────────┼──────────────────────┤
   Set 1       │V|Tag|Data│V|Tag|Data│V|Tag|Data│V|Tag|Data          │
               ├──────────┼──────────┼──────────┼──────────────────────┤
   Set 2       │V|Tag|Data│V|Tag|Data│V|Tag|Data│V|Tag|Data          │
               ├──────────┼──────────┼──────────┼──────────────────────┤
   Set 3       │V|Tag|Data│V|Tag|Data│V|Tag|Data│V|Tag|Data          │
               └──────────┴──────────┴──────────┴──────────────────────┘
                    │          │          │          │
                    └──────────┴──────────┴──────────┘
                                    │
                             Compare 4 tags
                                    │
                               Hit if any match
```

### Lookup Process

1. Extract index → select one set
2. Compare tag with all ways in that set (4 comparisons for 4-way)
3. Hit if any way matches and is valid

### Associativity Spectrum

| Associativity | Sets | Ways | Characteristics |
|---------------|------|------|-----------------|
| Direct-mapped | N | 1 | Simple, conflict-prone |
| 2-way | N/2 | 2 | Good balance |
| 4-way | N/4 | 4 | Common for L1 |
| 8-way | N/8 | 8 | Common for L2/L3 |
| Fully associative | 1 | N | No conflicts, expensive |

### Example: 256KB, 8-way, 64-byte blocks

```
Cache size = 256 KB = 262,144 bytes
Block size = 64 bytes
Total blocks = 262,144 / 64 = 4,096 blocks
Sets = 4,096 / 8 = 512 sets

Address bits (32-bit):
Block offset: log₂(64) = 6 bits
Index: log₂(512) = 9 bits
Tag: 32 - 9 - 6 = 17 bits
```

## Comparison

### Conflict Miss Rate vs. Associativity

| Associativity | Relative Miss Rate |
|---------------|-------------------|
| Direct-mapped | 1.0× |
| 2-way | 0.7× |
| 4-way | 0.6× |
| 8-way | 0.55× |
| Fully assoc | 0.5× |

Diminishing returns beyond 8-way.

### Hardware Cost vs. Associativity

| Associativity | Comparators | Mux Size | Delay |
|---------------|-------------|----------|-------|
| Direct-mapped | 1 | 1 | Lowest |
| 2-way | 2 | 2:1 | Low |
| 4-way | 4 | 4:1 | Medium |
| 8-way | 8 | 8:1 | Higher |

### Typical Choices

| Cache Level | Typical Associativity | Why |
|-------------|----------------------|-----|
| L1 I-cache | 4-8 way | Low latency critical |
| L1 D-cache | 4-8 way | Low latency critical |
| L2 | 8-16 way | Miss rate more important |
| L3 | 16-20 way | Size makes conflicts less likely |

## Replacement Policies

For set-associative caches, when a set is full and we need to load a new block, which way do we replace?

### LRU (Least Recently Used)

Replace the block that hasn't been accessed longest.

- Best at exploiting temporal locality
- Requires tracking access order
- Expensive for high associativity

### Pseudo-LRU (Tree-based)

Approximate LRU using a binary tree:

```
For 4-way:
         [0]
        /   \
      [1]   [2]
      / \   / \
     W0 W1 W2 W3

Bits point to "more recently used" half
```

### Random

Replace a randomly selected way.

- Simple hardware
- Surprisingly competitive (within 10% of LRU)
- Used in some L2/L3 caches

### FIFO (First In, First Out)

Replace oldest block regardless of access pattern.

- Simple to implement
- Can perform poorly with some access patterns

## Key Takeaways

- Direct-mapped: Simple but conflict-prone
- Fully associative: No conflicts but expensive
- Set-associative: Best tradeoff, most common
- Higher associativity reduces conflict misses with diminishing returns
- 4-8 way common for L1, 8-16 way for L2/L3
- LRU replacement exploits temporal locality but is complex
- Cache organization significantly impacts performance and hardware cost
