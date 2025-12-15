# Performance Tradeoffs Across the Memory Hierarchy

Performance is shaped by orders-of-magnitude differences in latency and bandwidth across the hierarchy:

registers → caches → RAM → storage → network

## Latency vs bandwidth

- **Latency**: time to get the first byte
- **Bandwidth**: how much data per second once streaming

A cache miss is a latency event; bulk transfers (DMA, disk reads) emphasize bandwidth.

## Why “big-O” isn’t the whole story

Two algorithms with the same asymptotic complexity can differ drastically if one has poor locality (many cache misses).

Example intuition:
- Iterating an array sequentially is cache-friendly.
- Following pointers in a linked list can cause many cache misses.

## Practical rules of thumb

- Prefer contiguous data structures when possible.
- Batch work to improve locality (process in blocks).
- Minimize unpredictable branches and random memory access in hot loops.

## Key takeaways

- Real performance is dominated by memory hierarchy effects, not just instruction counts.
- Locality-aware programming can outperform “theoretically similar” alternatives.
- Understanding caches, virtual memory, and I/O gives you a more accurate performance mental model.

