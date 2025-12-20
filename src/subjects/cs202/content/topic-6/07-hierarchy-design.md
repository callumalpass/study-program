---
id: cs202-t6-design
title: "Hierarchy Design"
order: 7
---

# Memory Hierarchy Design Principles

Designing an effective memory hierarchy requires balancing many competing constraints: performance, cost, power, and complexity. This section explores the principles and trade-offs that guide memory hierarchy design in real systems.

## Design Objectives

### Primary Goals

```
1. Performance: Minimize average memory access time (AMAT)
2. Cost: Maximize performance per dollar
3. Power: Minimize energy per access
4. Scalability: Support growing memory demands
5. Reliability: Ensure data integrity
```

### The Fundamental Trade-off

```
                Fast
                  │
                  │     SRAM
                  │        ╲
                  │         ╲
                  │          ╲ Trade-off curve
                  │           ╲
                  │            ╲ DRAM
                  │             ╲
                  │              ╲ Flash
                  │               ╲
                  │                ╲ HDD
                  └──────────────────────────► Cheap
                              (per bit)

No single technology is both fast AND cheap
→ Use hierarchy to get best of both
```

## Cache Design Space

### Size Selection

**Larger cache**:
- ✓ Higher hit rate
- ✗ Higher latency
- ✗ More power
- ✗ More area/cost

```
L1 Cache Sizing:
┌──────────┬───────────┬──────────┬─────────────┐
│ Size     │ Hit Rate  │ Latency  │ Power       │
├──────────┼───────────┼──────────┼─────────────┤
│ 16 KB    │ 92%       │ 2 cycles │ Low         │
│ 32 KB    │ 95%       │ 3 cycles │ Medium      │
│ 64 KB    │ 97%       │ 4 cycles │ Higher      │
│ 128 KB   │ 98%       │ 5 cycles │ High        │
└──────────┴───────────┴──────────┴─────────────┘

Sweet spot: 32-64 KB for L1 (high hit rate, low latency)
```

### Block Size Selection

**Larger blocks**:
- ✓ Better spatial locality exploitation
- ✓ Lower tag overhead
- ✗ Higher miss penalty (more data to fetch)
- ✗ Potential waste if locality is poor

```
Block Size vs. Miss Rate:
Block Size    Miss Rate    Transfer Time
16 bytes      8%           4 ns
32 bytes      5%           8 ns
64 bytes      3.5%         16 ns  ← Common choice
128 bytes     3%           32 ns
256 bytes     3.5%         64 ns  ← Too large
```

64-byte blocks are standard: good locality, manageable miss penalty.

### Associativity Selection

```
Associativity vs. Miss Rate (32KB cache):

Direct-mapped:  5% miss rate, 1-cycle hit
2-way:          3.5% miss rate, 1-cycle hit
4-way:          2.5% miss rate, 1-2 cycle hit
8-way:          2% miss rate, 2-cycle hit
16-way:         1.8% miss rate, 3-cycle hit

Observation: 4-8 way gives good miss reduction without significant hit time penalty
```

### Design Rules of Thumb

1. **L1 Cache**: Small (32-64KB), low associativity (4-8 way), fast (1-4 cycles)
2. **L2 Cache**: Medium (256KB-1MB), higher associativity (8-16 way)
3. **L3 Cache**: Large (8-64MB), high associativity (16-20 way), shared
4. **Block size**: 64 bytes (matches DRAM burst, good locality)

## Multi-Level Hierarchy Design

### Why Multiple Levels?

Single large cache cannot be both fast and large:

```
Single 16MB cache: 40-cycle hit time
→ Every access takes 40 cycles!

Hierarchy:
L1 (32KB): 95% hits at 3 cycles
L2 (512KB): 90% of L1 misses hit at 12 cycles
L3 (16MB): 85% of L2 misses hit at 40 cycles

AMAT = 0.95×3 + 0.05×(0.90×12 + 0.10×(0.85×40 + 0.15×200))
     = 2.85 + 0.05×(10.8 + 0.10×(34 + 30))
     = 2.85 + 0.05×(10.8 + 6.4)
     = 2.85 + 0.86
     = 3.71 cycles

Much better than 40 cycles!
```

### Level Sizing

**Ratio between levels**:
```
Common ratios:
L1:L2 = 1:8 to 1:32
L2:L3 = 1:16 to 1:64

Example: 32KB L1, 512KB L2, 16MB L3
L1:L2 = 1:16, L2:L3 = 1:32
```

### Inclusion Policies

```
Inclusive (Intel approach):
- L3 contains all L2 data, L2 contains all L1 data
- Simple coherence: invalidate L3 → invalidate all
- Wastes capacity (duplicated data)

Exclusive (AMD approach):
- Each level holds unique data
- Effective capacity = sum of all levels
- More complex coherence

NINE (Non-Inclusive Non-Exclusive):
- Hybrid approach, common in modern designs
- L2 eviction may or may not evict L1
- Complexity vs. capacity trade-off
```

## Memory System Integration

### Bandwidth Matching

Each level should provide adequate bandwidth:

```
CPU demand: 50 GB/s (hypothetical)

L1 bandwidth: 200 GB/s (4× CPU demand) ✓
L2 bandwidth: 100 GB/s (2× CPU demand) ✓
L3 bandwidth: 75 GB/s (1.5× CPU demand) ✓
Memory bandwidth: 50 GB/s (matches demand) ✓

Each level filters requests for the next
```

### Latency Hiding

Design for overlap:

```
Non-blocking caches:
- Multiple outstanding misses (MSHRs)
- Hit under miss
- Enables memory-level parallelism

Out-of-order execution:
- Execute independent instructions during cache miss
- Hide memory latency with useful work

Prefetching:
- Start fetches before needed
- Overlaps fetch with previous work
```

## Power Considerations

### Power vs. Performance

```
Cache Power = Dynamic + Static

Dynamic: Proportional to activity
Static: Proportional to size (leakage)

Larger cache:
- Less memory traffic → Less dynamic power
- More transistors → More static power

Optimal size depends on workload
```

### Power-Saving Techniques

**Clock gating**:
```
Disable clock to idle cache banks
Saves dynamic power
```

**Way prediction**:
```
Access predicted way first
Power one way instead of all
Miss: Access other ways (rare)
```

**Drowsy caches**:
```
Reduce voltage to idle lines
Preserve data but slow access
Wake on access
```

**Cache decay**:
```
Turn off lines not accessed recently
Risk: May need to re-fetch from memory
```

## Reliability and RAS

### Error Detection and Correction

```
ECC (Error Correcting Code):
- SECDED: Single Error Correct, Double Error Detect
- Common for L2, L3, and main memory
- Overhead: ~12.5% (8 bits per 64 bits)

Parity:
- Single bit error detect only
- Lower overhead, used for L1
```

### Scrubbing

Proactively check and correct errors:

```
Background scrubbing:
1. Read memory location
2. Check ECC
3. If error, correct and write back
4. Move to next location

Prevents accumulation of soft errors
```

### Redundancy

For critical systems:

```
Lockstep execution:
- Two cores execute same instructions
- Compare results
- Detect errors immediately

Memory mirroring:
- Write to two memory modules
- Read from either
- Survive module failure
```

## Real-World Design Examples

### Intel Core i9-13900K

```
L1 I-Cache: 32 KB, 8-way, 5-cycle
L1 D-Cache: 48 KB, 12-way, 5-cycle
L2 Cache:   2 MB, 16-way, 14-cycle (per P-core)
L3 Cache:   36 MB, 12-way, ~55 cycles (shared)

Design choices:
- Large L1 D-cache for complex OoO core
- Private L2 for each P-core
- Large shared L3 for inter-core sharing
```

### Apple M2

```
L1 I-Cache: 192 KB, 6-way, ~3 cycles
L1 D-Cache: 128 KB, 8-way, ~3 cycles
L2 Cache:   16 MB shared, ~15 cycles
SLC (System Level Cache): 32 MB

Design choices:
- Unusually large L1 caches
- Lower latency than Intel
- Shared L2 between P-cores
- System-level cache for memory bandwidth
```

### AMD Zen 4

```
L1 I-Cache: 32 KB, 8-way, 4-cycle
L1 D-Cache: 32 KB, 8-way, 4-cycle
L2 Cache:   1 MB, 8-way, 12-cycle (per core)
L3 Cache:   32 MB, 16-way (per CCD)

Design choices:
- Smaller L1 than Apple (cost/power)
- Large per-core L2
- CCD-based L3 (chiplet architecture)
- 3D V-Cache option adds 64 MB L3
```

## Future Trends

### 3D Stacking

```
Stack cache on top of logic:
- Shorter wires = lower latency
- Higher bandwidth
- Examples: HBM, AMD 3D V-Cache
```

### Heterogeneous Memory

```
Mix different memory technologies:
Tier 0: HBM (hot data, bandwidth)
Tier 1: DDR5 (warm data, capacity)
Tier 2: CXL memory (cold data, cost)
Tier 3: Persistent memory (archival)
```

### Intelligent Management

```
ML-based prefetching:
- Learn access patterns
- More accurate than heuristics

Adaptive caching:
- Adjust policy based on workload
- Dynamic partitioning
```

## Key Takeaways

- Memory hierarchy exploits locality to bridge speed-cost gap
- Cache design balances size, associativity, and latency
- Multiple levels filter requests, reducing lower-level traffic
- Block size of 64 bytes standard for DRAM compatibility
- 4-8 way associativity provides good miss reduction
- Power is significant constraint alongside performance
- ECC essential for reliability in larger caches/memory
- Real designs balance many competing factors
- Future: 3D stacking, heterogeneous memory, ML management

