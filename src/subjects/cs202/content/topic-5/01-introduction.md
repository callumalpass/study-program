---
id: cs202-t5-intro
title: "Introduction to Caches"
order: 1
---

# Introduction to Cache Memory

**Cache memory** is a small, fast memory that stores copies of frequently accessed data from main memory. Caches exploit the principle of locality to dramatically reduce average memory access time, bridging the speed gap between the CPU and main memory.

## The Memory Speed Gap

Modern processors operate at billions of cycles per second, but main memory (DRAM) takes tens to hundreds of cycles to respond:

| Component | Access Time | Relative Speed |
|-----------|-------------|----------------|
| Register | 0.25-0.5 ns | 1× |
| L1 Cache | 1-2 ns | 4-8× |
| L2 Cache | 3-10 ns | 12-40× |
| L3 Cache | 10-30 ns | 40-120× |
| Main Memory (DRAM) | 50-100 ns | 200-400× |
| SSD | 50-150 μs | 200,000-600,000× |
| HDD | 5-10 ms | 20,000,000-40,000,000× |

Without caches, a CPU would spend most of its time waiting for memory!

## The Principle of Locality

Caches work because programs exhibit **locality**:

### Temporal Locality

Recently accessed data is likely to be accessed again soon.

```c
// Example: Loop counter accessed repeatedly
for (int i = 0; i < 1000; i++) {
    sum += array[i];  // i accessed every iteration
}
```

### Spatial Locality

Data near recently accessed data is likely to be accessed soon.

```c
// Example: Array elements accessed sequentially
for (int i = 0; i < 1000; i++) {
    sum += array[i];  // array[i+1] likely accessed next
}
```

Caches exploit both types: they keep recent data (temporal) and fetch entire blocks at once (spatial).

## Basic Cache Operation

### Read Hit

Data found in cache—fast access:

```
1. CPU requests address
2. Cache checks if address is present (tag comparison)
3. Data returned in 1-4 cycles
```

### Read Miss

Data not in cache—must fetch from memory:

```
1. CPU requests address
2. Cache checks—miss detected
3. Fetch block from main memory (50-100 cycles)
4. Store block in cache
5. Return data to CPU
```

### Write (more complex—discussed later)

## Cache Structure

A cache contains multiple **cache lines** (or blocks):

```
┌────────────────────────────────────────────────────────┐
│                      Cache                              │
├──────┬───────┬──────────────────────────────────────────┤
│Valid │  Tag  │                Data Block               │
├──────┼───────┼──────────────────────────────────────────┤
│  1   │ 0x1A  │ [64 bytes of data from address 0x1A...]│
├──────┼───────┼──────────────────────────────────────────┤
│  1   │ 0x3F  │ [64 bytes of data from address 0x3F...]│
├──────┼───────┼──────────────────────────────────────────┤
│  0   │  --   │ [invalid]                               │
├──────┼───────┼──────────────────────────────────────────┤
│  1   │ 0x22  │ [64 bytes of data from address 0x22...]│
└──────┴───────┴──────────────────────────────────────────┘
```

Each line contains:
- **Valid bit**: Is this line holding valid data?
- **Tag**: Which memory block is stored here?
- **Data block**: The actual cached data (typically 64 bytes)

## Address Breakdown

A memory address is divided for cache lookup:

```
┌────────────────┬───────────────┬──────────────────┐
│      Tag       │     Index     │   Block Offset   │
└────────────────┴───────────────┴──────────────────┘
```

- **Block offset**: Which byte within the block (log₂(block size) bits)
- **Index**: Which cache set to check (log₂(number of sets) bits)
- **Tag**: Identifies which memory block (remaining bits)

### Example

32-bit address, 256 cache lines, 64-byte blocks:

```
Block offset: log₂(64) = 6 bits
Index: log₂(256) = 8 bits
Tag: 32 - 8 - 6 = 18 bits

Address: 0x12345678
─────────────────────────────────────
Tag (18 bits):    0x048D1
Index (8 bits):   0x59
Offset (6 bits):  0x38
```

## Cache Parameters

| Parameter | Typical Values | Effect |
|-----------|---------------|--------|
| Size | 32KB - 32MB | Larger = more data cached |
| Block size | 32-128 bytes | Larger = more spatial locality |
| Associativity | 1-16 way | Higher = fewer conflicts |
| Levels | 2-3 levels | More levels = bridge bigger gaps |

### Trade-offs

**Larger cache**:
- ✓ Lower miss rate
- ✗ Higher latency, more power, more area

**Larger block size**:
- ✓ Exploits spatial locality
- ✗ Wastes bandwidth if locality is poor

**Higher associativity**:
- ✓ Fewer conflict misses
- ✗ Higher latency, more complex lookup

## Cache Performance Metrics

### Hit Rate and Miss Rate

```
Hit Rate = Hits / Total Accesses
Miss Rate = Misses / Total Accesses = 1 - Hit Rate
```

**Typical values**:
- L1: 95-99% hit rate
- L2: 90-95% hit rate (for L1 misses)
- L3: 80-95% hit rate (for L2 misses)

### Average Memory Access Time (AMAT)

```
AMAT = Hit Time + Miss Rate × Miss Penalty
```

**Example**:
- Hit time: 2 cycles
- Miss rate: 5%
- Miss penalty: 100 cycles

```
AMAT = 2 + 0.05 × 100 = 2 + 5 = 7 cycles
```

Compare to 100 cycles without cache!

### Multi-Level AMAT

```
AMAT = L1_Hit_Time + L1_Miss_Rate × (L2_Hit_Time + L2_Miss_Rate × L2_Miss_Penalty)
```

## Cache in a System

```
         ┌──────────────────────────────────────────────────────┐
         │                      CPU Core                        │
         │                                                      │
         │   ┌─────────┐    ┌─────────┐    ┌─────────┐         │
         │   │ I-Cache │    │Registers│    │ D-Cache │         │
         │   │   L1    │    │         │    │   L1    │         │
         │   │ 32-64KB │    │         │    │ 32-64KB │         │
         │   └────┬────┘    └─────────┘    └────┬────┘         │
         │        │                             │               │
         │        └──────────────┬──────────────┘               │
         │                       │                              │
         │               ┌───────▼───────┐                     │
         │               │    L2 Cache   │                     │
         │               │   256KB-1MB   │                     │
         │               └───────┬───────┘                     │
         └───────────────────────┼─────────────────────────────┘
                                 │
                         ┌───────▼───────┐
                         │    L3 Cache   │  (shared across cores)
                         │    8-64MB     │
                         └───────┬───────┘
                                 │
                         ┌───────▼───────┐
                         │  Main Memory  │
                         │    8-64GB     │
                         └───────────────┘
```

## Key Takeaways

- Caches bridge the CPU-memory speed gap
- Locality (temporal and spatial) makes caching effective
- Cache lines contain valid bit, tag, and data block
- Address is split into tag, index, and offset
- AMAT combines hit time and miss penalty
- Modern systems use multiple cache levels
- Cache design involves trade-offs between size, speed, and complexity
- Typical L1 hit rates are 95%+ but even small miss rates impact performance
