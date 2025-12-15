# Locality and Caches

CPU speeds grew much faster than main memory speeds. Caches exist to close that gap by keeping recently used data close to the CPU.

## The principle of locality

Programs tend to access memory with patterns:

- **Temporal locality**: if you used data recently, you’re likely to use it again soon.
- **Spatial locality**: if you used an address, you’re likely to use nearby addresses soon.

Caches exploit these patterns.

## Cache basics

A cache stores memory in fixed-size blocks called **cache lines** (e.g., 64 bytes).

When the CPU requests an address:
- If the line is in cache → **hit** (fast)
- If not → **miss** (fetch from lower level, slower)

## Levels of cache

Common hierarchy:
- L1 (smallest, fastest)
- L2 (larger, slower)
- L3 (shared, larger, slower)
- RAM (much slower)

## Key takeaways

- Locality predicts why caching works.
- Caches store lines/blocks, not single bytes.
- Hit/miss behavior dominates performance in many programs.

