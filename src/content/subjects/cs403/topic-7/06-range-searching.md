# Range Searching: Kd-Trees and Range Trees

Efficiently query points in geometric ranges.

## Kd-Tree
Binary space partitioning, alternating dimensions.

**Build**: $O(n \log n)$, **Query**: $O(\sqrt{n} + k)$ for $k$ results

## Range Tree
Layered balanced trees.

**Space**: $O(n \log^{d-1} n)$ for $d$ dimensions, **Query**: $O(\log^d n + k)$

## Applications
Database queries, GIS, collision detection
