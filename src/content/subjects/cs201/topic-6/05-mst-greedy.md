# Minimum Spanning Trees

Finding minimum spanning trees showcases multiple greedy strategies—Kruskal's and Prim's algorithms—each optimal through different approaches.

## The Problem

**Input**: Connected, weighted, undirected graph G = (V, E)

**Output**: Tree T ⊆ E connecting all vertices with minimum total weight

**Properties of spanning tree**:
- Contains all V vertices
- Has exactly V - 1 edges
- Connected and acyclic

## Kruskal's Algorithm

**Strategy**: Add edges in order of increasing weight, skip if creates cycle.

### Algorithm

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def kruskal(n, edges):
    """edges = [(weight, u, v), ...]"""
    edges.sort()
    uf = UnionFind(n)
    mst = []

    for weight, u, v in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            if len(mst) == n - 1:
                break

    return mst
```

### Analysis

- Sorting edges: O(E log E)
- Union-Find operations: O(E × α(V)) ≈ O(E)
- **Total**: O(E log E) = O(E log V)

### Why It Works

**Cut Property**: For any cut (partition of vertices), the minimum-weight edge crossing the cut is safe to add to MST.

Kruskal's always adds the globally smallest safe edge.

## Prim's Algorithm

**Strategy**: Grow tree from a starting vertex, always adding the cheapest edge to a new vertex.

### Algorithm

```python
import heapq

def prim(n, adj):
    """adj[u] = [(weight, v), ...]"""
    mst = []
    visited = [False] * n
    # Min-heap: (weight, from_vertex, to_vertex)
    heap = [(0, -1, 0)]  # Start from vertex 0

    total_weight = 0

    while heap and len(mst) < n:
        weight, u, v = heapq.heappop(heap)

        if visited[v]:
            continue

        visited[v] = True
        if u != -1:
            mst.append((u, v, weight))
        total_weight += weight

        for edge_weight, neighbor in adj[v]:
            if not visited[neighbor]:
                heapq.heappush(heap, (edge_weight, v, neighbor))

    return mst, total_weight
```

### Analysis

With binary heap:
- Each edge pushed/popped once: O(E log V)
- **Total**: O(E log V)

With Fibonacci heap:
- Decrease-key: O(1) amortized
- **Total**: O(E + V log V)

### Why It Works

Prim's maintains a cut between visited and unvisited vertices. By cut property, minimum edge across this cut is always safe.

## Comparison

| Aspect | Kruskal's | Prim's |
|--------|-----------|--------|
| Strategy | Global edge order | Local growth |
| Data structure | Union-Find | Priority Queue |
| Best for | Sparse graphs | Dense graphs |
| Time | O(E log V) | O(E log V) or O(E + V log V) |
| Parallel? | Yes (edge sorting) | Less so |

## Correctness Proofs

### Cut Property Proof

**Claim**: Let S be any cut (partition V into S and V-S). The minimum-weight edge (u,v) crossing the cut is in some MST.

**Proof**:
- Let T be an MST not containing (u,v)
- T has some path from u to v
- This path crosses the cut via some edge (x,y)
- T' = T - {(x,y)} + {(u,v)} is also a spanning tree
- weight(T') ≤ weight(T) since (u,v) is minimum
- Therefore T' is also an MST containing (u,v)

### Cycle Property

**Claim**: Maximum-weight edge in any cycle is NOT in any MST.

**Proof**: Removing it keeps graph connected (cycle provides alternate path). Adding it back creates a cycle. Must remove some edge from cycle for MST, so remove the maximum.

## Borůvka's Algorithm

**Historical note**: First MST algorithm (1926), predates Kruskal and Prim.

```python
def boruvka(n, edges):
    uf = UnionFind(n)
    mst = []

    while len(mst) < n - 1:
        # Find minimum edge for each component
        min_edge = [None] * n

        for weight, u, v in edges:
            pu, pv = uf.find(u), uf.find(v)
            if pu != pv:
                if min_edge[pu] is None or weight < min_edge[pu][0]:
                    min_edge[pu] = (weight, u, v)
                if min_edge[pv] is None or weight < min_edge[pv][0]:
                    min_edge[pv] = (weight, u, v)

        # Add all minimum edges
        for i in range(n):
            if min_edge[i] is not None:
                weight, u, v = min_edge[i]
                if uf.union(u, v):
                    mst.append((u, v, weight))

    return mst
```

**Time**: O(E log V) — log V rounds, O(E) per round

**Advantage**: Highly parallelizable (each component works independently)

## Applications

### Network Design

Minimum cost to connect all nodes:
- Computer networks
- Electrical grids
- Pipeline systems

### Clustering

Remove k-1 longest MST edges to get k clusters:
- Approximation for k-means
- Image segmentation

### Approximation Algorithms

MST provides bounds for:
- Traveling Salesman (TSP ≤ 2 × MST weight)
- Steiner Tree

## Variants

### Maximum Spanning Tree

Negate weights and run standard MST:
```python
def max_spanning_tree(n, edges):
    negated = [(-w, u, v) for w, u, v in edges]
    return kruskal(n, negated)
```

### Second-Best MST

For each MST edge, find best replacement if removed.

```python
def second_best_mst(n, edges):
    mst = kruskal(n, edges)
    mst_set = set((min(u,v), max(u,v)) for u, v, w in mst)
    mst_weight = sum(w for u, v, w in mst)

    best_second = float('inf')
    for u, v, w in edges:
        key = (min(u,v), max(u,v))
        if key not in mst_set:
            # Try adding this edge
            # Find max edge on MST path from u to v
            max_on_path = find_max_edge_on_path(mst, u, v)
            alt_weight = mst_weight - max_on_path + w
            best_second = min(best_second, alt_weight)

    return best_second
```

### Minimum Spanning Forest

For disconnected graphs, find MST of each component.

## Efficient Implementations

### Prim with Adjacency Matrix

For dense graphs (E ≈ V²):

```python
def prim_dense(adj_matrix):
    n = len(adj_matrix)
    key = [float('inf')] * n
    in_mst = [False] * n
    parent = [-1] * n

    key[0] = 0

    for _ in range(n):
        # Find min key vertex not in MST
        u = min((k, i) for i, k in enumerate(key) if not in_mst[i])[1]
        in_mst[u] = True

        for v in range(n):
            if adj_matrix[u][v] and not in_mst[v] and adj_matrix[u][v] < key[v]:
                key[v] = adj_matrix[u][v]
                parent[v] = u

    return [(parent[v], v, key[v]) for v in range(1, n)]
```

**Time**: O(V²) — better than O(E log V) when E ≈ V²

## Summary

| Algorithm | Time | Space | Best For |
|-----------|------|-------|----------|
| Kruskal | O(E log V) | O(V) | Sparse, parallel |
| Prim (heap) | O(E log V) | O(V) | General |
| Prim (Fib) | O(E + V log V) | O(V) | Dense, theoretical |
| Prim (matrix) | O(V²) | O(V²) | Dense graphs |
| Borůvka | O(E log V) | O(V) | Parallel |

MST algorithms demonstrate that different greedy strategies can all achieve optimal solutions, with trade-offs in implementation and efficiency for different graph types.
