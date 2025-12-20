---
id: cs104-t5-mst
title: "Minimum Spanning Tree"
order: 6
---

# Minimum Spanning Trees

A Minimum Spanning Tree (MST) of a weighted, connected, undirected graph is a subset of edges that connects all vertices with minimum total edge weight and no cycles. MST algorithms are essential for network design and clustering.

## What is a Spanning Tree?

A **spanning tree** of a graph G:
- Contains all vertices of G
- Is a tree (connected, no cycles)
- Has exactly V - 1 edges

A **minimum spanning tree** is a spanning tree with minimum total edge weight.

```
Original Graph:          MST (total weight: 9):
    A --4-- B                A --4-- B
    |\     /|                 \     /
    1 \   / 2                  \   / 2
    |   C   |            A      C
    D --3-- E                D --3-- E

Multiple edges, we pick minimum weight edges that connect all vertices without cycles.
```

## Prim's Algorithm

Grow the MST from a starting vertex by always adding the minimum weight edge that connects a new vertex.

```python
import heapq

def prim_mst(graph, start):
    """
    Find MST using Prim's algorithm.
    graph: {vertex: [(neighbor, weight), ...]}
    Returns: list of MST edges, total weight
    """
    mst_edges = []
    total_weight = 0
    visited = {start}

    # Priority queue: (weight, from_vertex, to_vertex)
    edges = [(weight, start, neighbor) for neighbor, weight in graph[start]]
    heapq.heapify(edges)

    while edges and len(visited) < len(graph):
        weight, u, v = heapq.heappop(edges)

        if v in visited:
            continue

        # Add edge to MST
        visited.add(v)
        mst_edges.append((u, v, weight))
        total_weight += weight

        # Add new edges from v
        for neighbor, w in graph[v]:
            if neighbor not in visited:
                heapq.heappush(edges, (w, v, neighbor))

    return mst_edges, total_weight
```

### Complexity

- **Time**: O(E log V) with binary heap
- **Space**: O(V + E)

### Visualization

```
Step 1: Start at A, add edge A-D (weight 1)
    A        MST: A-D
    |
    D

Step 2: From {A, D}, minimum edge is D-E (weight 3)
    A        MST: A-D, D-E
    |
    D--E

Step 3: From {A, D, E}, minimum edge is E-C (weight 2)
    A        MST: A-D, D-E, E-C
    |
    D--E--C

Step 4: From {A, D, E, C}, minimum edge is A-B (weight 4)
    A--B     MST: A-D, D-E, E-C, A-B
    |
    D--E--C
```

## Kruskal's Algorithm

Sort all edges by weight and add them to the MST if they don't create a cycle (using Union-Find).

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected

        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1

        return True

def kruskal_mst(vertices, edges):
    """
    Find MST using Kruskal's algorithm.
    vertices: list of vertex labels
    edges: [(u, v, weight), ...]
    Returns: list of MST edges, total weight
    """
    # Map vertices to indices
    v_to_idx = {v: i for i, v in enumerate(vertices)}
    uf = UnionFind(len(vertices))

    # Sort edges by weight
    sorted_edges = sorted(edges, key=lambda x: x[2])

    mst_edges = []
    total_weight = 0

    for u, v, weight in sorted_edges:
        if uf.union(v_to_idx[u], v_to_idx[v]):
            mst_edges.append((u, v, weight))
            total_weight += weight

            if len(mst_edges) == len(vertices) - 1:
                break

    return mst_edges, total_weight
```

### Complexity

- **Time**: O(E log E) for sorting (or O(E log V) since E ≤ V²)
- **Space**: O(V) for Union-Find

## Comparison: Prim vs Kruskal

| Aspect | Prim | Kruskal |
|--------|------|---------|
| Approach | Grow from vertex | Add smallest edges |
| Data Structure | Priority queue | Union-Find |
| Better for | Dense graphs | Sparse graphs |
| Edges processed | Only from visited | All edges sorted |
| Implementation | Slightly simpler | Needs Union-Find |

## Properties of MST

### Cut Property

For any cut (partition of vertices into two sets), the minimum weight edge crossing the cut is in the MST.

### Cycle Property

For any cycle, the maximum weight edge is NOT in the MST (unless multiple edges have the same maximum weight).

### Uniqueness

MST is unique if all edge weights are distinct. With duplicate weights, multiple MSTs may exist.

## Applications

### 1. Network Design

Connect cities with minimum cable cost:

```python
cities = ['A', 'B', 'C', 'D']
connections = [
    ('A', 'B', 10),  # Cost to connect A and B
    ('A', 'C', 15),
    ('B', 'C', 5),
    ('B', 'D', 8),
    ('C', 'D', 12)
]

mst, cost = kruskal_mst(cities, connections)
# MST: B-C (5), B-D (8), A-B (10), total: 23
```

### 2. Clustering

Remove longest edges from MST to create clusters:

```python
def mst_clustering(points, num_clusters):
    """Cluster points using MST."""
    # Build complete graph with distances as weights
    edges = []
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            dist = distance(points[i], points[j])
            edges.append((i, j, dist))

    # Get MST
    mst_edges, _ = kruskal_mst(list(range(len(points))), edges)

    # Remove k-1 longest edges to get k clusters
    mst_edges.sort(key=lambda x: x[2], reverse=True)
    for _ in range(num_clusters - 1):
        mst_edges.pop(0)

    # Remaining edges define clusters
    return mst_edges
```

### 3. Approximation for TSP

MST gives a 2-approximation for Traveling Salesman Problem:

```python
def tsp_mst_approximation(graph):
    """
    2-approximation for TSP using MST.
    Returns a tour that's at most 2x optimal.
    """
    # Build MST
    mst_edges, _ = prim_mst(graph, list(graph.keys())[0])

    # DFS on MST gives tour
    # (Actual implementation would build adjacency list from MST and do DFS)
    pass
```

## Variants

### Second-Best MST

Find MST with second minimum weight:

1. Find MST
2. For each edge in MST, try removing it and adding the best replacement
3. Return minimum among all replacements

### Minimum Bottleneck Spanning Tree

Minimize the maximum edge weight (same as MST!).

## Summary

MST connects all vertices with minimum total edge weight. Prim's algorithm grows from a vertex using a priority queue. Kruskal's algorithm adds smallest edges using Union-Find. Both run in O(E log V). Applications include network design, clustering, and TSP approximation.
