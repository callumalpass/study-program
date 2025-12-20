---
id: cs202-t5-multi
title: "Multi-Level Caches"
order: 5
---

# Multi-Level Cache Hierarchy

Modern processors use multiple levels of cache to balance speed, capacity, and cost. Each level trades off latency against size, creating a hierarchy that delivers both fast common-case access and large effective capacity.

## Why Multiple Levels?

### The Trade-off Problem

**Fast caches must be small** (physical constraints):
- Larger cache = longer wire delays
- More entries = slower tag comparison
- More data = higher access latency

**But programs need large working sets**:
- Code, data, stack all compete for space
- Applications growing larger over time

**Solution**: Multiple levels with different characteristics.

### Cache Hierarchy

```
         ┌──────────────────────────────────────┐
         │                 CPU                   │
         │              ┌─────┐                  │
         │              │ Reg │ ◄── ~0.25ns      │
         │              └──┬──┘                  │
         │                 │                     │
         │   ┌─────────────┴─────────────┐      │
         │   │         L1 Cache          │      │
         │   │  32-64KB, 1-4 cycles      │      │
         │   └─────────────┬─────────────┘      │
         │                 │                     │
         │   ┌─────────────┴─────────────┐      │
         │   │         L2 Cache          │      │
         │   │ 256KB-1MB, 10-20 cycles   │      │
         │   └─────────────┬─────────────┘      │
         └─────────────────┼────────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         │            L3 Cache               │
         │   8-64MB, 30-50 cycles (shared)   │
         └─────────────────┬─────────────────┘
                           │
         ┌─────────────────┴─────────────────┐
         │          Main Memory              │
         │        100-300 cycles             │
         └───────────────────────────────────┘
```

## Level Characteristics

### L1 Cache

**Primary goals**: Speed, speed, speed.

| Parameter | Typical Value |
|-----------|---------------|
| Size | 32-64 KB |
| Associativity | 4-8 way |
| Latency | 1-4 cycles |
| Block size | 64 bytes |
| Split | Separate I-cache and D-cache |

**Design choices**:
- Small size for fast access
- Pipelined for single-cycle access
- Write-through or write-back
- Critical to CPU performance

### L2 Cache

**Primary goals**: Bridge L1 misses, reasonable latency.

| Parameter | Typical Value |
|-----------|---------------|
| Size | 256 KB - 1 MB |
| Associativity | 8-16 way |
| Latency | 10-20 cycles |
| Block size | 64 bytes |
| Unified | Instructions and data together |

**Design choices**:
- Larger to catch L1 misses
- Higher associativity to reduce conflicts
- Usually private per core
- Write-back typical

### L3 Cache (LLC)

**Primary goals**: Large capacity, shared resource.

| Parameter | Typical Value |
|-----------|---------------|
| Size | 8-64 MB |
| Associativity | 16-20 way |
| Latency | 30-50 cycles |
| Block size | 64 bytes |
| Shared | Across all cores |

**Design choices**:
- Very large to reduce memory accesses
- High associativity (virtually eliminates conflicts)
- Serves as victim cache for L2
- Manages coherence between cores

## Inclusion Policies

### Inclusive Cache

**Every block in L1 is also in L2 (and L3)**.

```
L1: [A] [B] [C] [D]
L2: [A] [B] [C] [D] [E] [F] [G] [H]
```

**Advantages**:
- Simple coherence: invalidate in L2 → invalidate in L1
- Easy to check if data in hierarchy

**Disadvantages**:
- Wastes space (duplicated data)
- L2 eviction forces L1 eviction

### Exclusive Cache

**Blocks exist in only one level**.

```
L1: [A] [B] [C] [D]
L2: [E] [F] [G] [H]  (different blocks)
```

**Advantages**:
- Effective capacity = L1 + L2
- No wasted space

**Disadvantages**:
- Complex coherence
- L1 eviction → move to L2
- Miss in L1, hit in L2 → swap blocks

### Non-Inclusive, Non-Exclusive (NINE)

**Neither strictly inclusive nor exclusive**.

```
L1: [A] [B] [C] [D]
L2: [A] [E] [F] [G]  (some overlap)
```

Common in modern processors. Blocks may or may not be duplicated.

## Performance Analysis

### Multi-Level AMAT

```
AMAT = L1_HitTime + L1_MissRate × L1_MissPenalty

Where L1_MissPenalty = L2_HitTime + L2_MissRate × L2_MissPenalty

Expanding:
AMAT = L1_HitTime + L1_MissRate × (L2_HitTime + L2_MissRate × L2_MissPenalty)
```

### Three-Level Example

```
L1: 2 cycles, 5% miss rate
L2: 15 cycles, 20% miss rate (of L1 misses)
L3: 40 cycles, 30% miss rate (of L2 misses)
Memory: 200 cycles

AMAT = 2 + 0.05 × (15 + 0.20 × (40 + 0.30 × 200))
     = 2 + 0.05 × (15 + 0.20 × (40 + 60))
     = 2 + 0.05 × (15 + 0.20 × 100)
     = 2 + 0.05 × (15 + 20)
     = 2 + 0.05 × 35
     = 2 + 1.75
     = 3.75 cycles
```

Without caches: 200 cycles. With caches: 3.75 cycles. **53× improvement!**

### Global vs. Local Miss Rates

**Local miss rate**: Misses at this level / accesses at this level.

**Global miss rate**: Misses at this level / total CPU accesses.

```
L1: 1000 accesses, 50 misses → Local: 5%, Global: 5%
L2: 50 accesses, 10 misses → Local: 20%, Global: 1%
L3: 10 accesses, 3 misses → Local: 30%, Global: 0.3%
Memory: 3 accesses
```

Global miss rate determines memory bandwidth requirements.

## Split vs. Unified Caches

### L1: Split Cache

Separate instruction cache (I-cache) and data cache (D-cache):

```
         ┌───────────────────────────────┐
         │           CPU Core            │
         │                               │
         │   Fetch ─────► ┌──────────┐  │
         │                │ I-Cache  │  │
         │                │  32KB    │  │
         │                └──────────┘  │
         │                               │
         │   Load/Store ─►┌──────────┐  │
         │                │ D-Cache  │  │
         │                │  32KB    │  │
         │                └──────────┘  │
         └───────────────────────────────┘
```

**Why split?**:
- Separate access ports (no structural hazards)
- Different access patterns (sequential code vs. random data)
- Can optimize each separately

### L2/L3: Unified Cache

Combined instructions and data:

**Why unified?**:
- Dynamically allocates space based on workload
- Simpler design
- Lower-level caches accessed less frequently

## Cache Coherence Across Levels

### Maintaining Consistency

When multiple copies exist (inclusive), they must stay consistent:

```
L1 D-cache: x = 5
L2: x = 5 (same value)
L3: x = 5 (same value)
```

**Write scenarios**:

1. **Write-back at all levels**: Update L1, mark dirty, propagate on eviction
2. **Write-through to L2**: L1 write → immediate L2 update

### Back-Invalidation

For inclusive caches, when L2 evicts a block:

```
L2 evicts block A
     │
     ▼
Check if A in L1
     │
     ▼ Yes
Invalidate A in L1 (back-invalidation)
```

## Modern Examples

### Intel Core (Alder Lake)

| Level | Size | Associativity | Latency |
|-------|------|---------------|---------|
| L1-I | 32 KB | 8-way | 5 cycles |
| L1-D | 48 KB | 12-way | 5 cycles |
| L2 | 1.25 MB | 10-way | 14 cycles |
| L3 | 30 MB | 12-way | 52 cycles |

### AMD Zen 4

| Level | Size | Associativity | Latency |
|-------|------|---------------|---------|
| L1-I | 32 KB | 8-way | 4 cycles |
| L1-D | 32 KB | 8-way | 4 cycles |
| L2 | 1 MB | 8-way | 12 cycles |
| L3 | 32 MB | 16-way | 41 cycles |

### Apple M2

| Level | Size | Associativity | Latency |
|-------|------|---------------|---------|
| L1-I | 192 KB | 6-way | 3 cycles |
| L1-D | 128 KB | 8-way | 3 cycles |
| L2 | 16 MB | 16-way | 15 cycles |
| SLC | 32 MB | Shared | ~30 cycles |

Note Apple's unusually large L1 caches.

## System-Level Cache

Beyond CPU caches, systems have additional caching:

```
CPU L1/L2/L3
     │
     ▼
Memory Controller Cache (DRAM buffer)
     │
     ▼
DRAM (row buffers act as cache)
     │
     ▼
SSD (DRAM cache for flash)
     │
     ▼
Flash storage (internal caching)
```

Each level exploits locality at different time scales.

## Key Takeaways

- Multiple cache levels balance latency vs. capacity
- L1: Smallest, fastest, split I/D, optimized for hit rate
- L2: Medium size, private per core, catches L1 misses
- L3: Largest, shared, reduces memory traffic
- Inclusive caches duplicate data but simplify coherence
- Exclusive caches maximize effective capacity
- Multi-level AMAT compounds miss rates at each level
- Global miss rate determines memory bandwidth needs
- Modern CPUs have 2-3 levels with MB to tens of MB total capacity

