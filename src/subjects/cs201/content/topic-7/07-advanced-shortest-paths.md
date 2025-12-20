---
id: cs201-t7-advanced
title: "Advanced Shortest Paths"
order: 7
---

# Advanced Shortest Path Algorithms

While Dijkstra's algorithm efficiently handles graphs with non-negative edge weights, many real-world problems involve negative weights or require shortest paths between all pairs of vertices. Financial modeling may involve negative costs (rebates, arbitrage). Differential constraints in scheduling naturally produce negative weights. All-pairs queries arise when building distance matrices or precomputing routing tables.

This section explores algorithms that extend beyond Dijkstra's capabilities: Bellman-Ford for negative weights, Floyd-Warshall for all-pairs shortest paths, Johnson's algorithm combining both techniques efficiently, and specialized algorithms like 0-1 BFS for binary weights. Understanding when to apply each algorithm—based on graph structure, weight properties, and query patterns—is essential for choosing efficient solutions.

The unifying theme is exploiting structure: DAGs allow linear-time shortest paths, 0-1 weights enable deque-based BFS, and sparse graphs favor Johnson's algorithm over Floyd-Warshall. Each specialized algorithm trades generality for efficiency in its domain.

## Bellman-Ford Algorithm

Bellman-Ford is the workhorse algorithm for shortest paths with negative edges. Unlike Dijkstra, which greedily finalizes vertices, Bellman-Ford relaxes all edges V-1 times, guaranteeing correct distances even when negative edges create non-monotonic distance updates.

Handles negative edge weights; detects negative cycles.

### Algorithm

```python
def bellman_ford(n, edges, source):
    """edges = [(u, v, weight), ...]"""
    dist = [float('inf')] * n
    dist[source] = 0
    predecessor = [-1] * n

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                predecessor[v] = u

    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # Negative cycle exists

    return dist, predecessor
```

### Why V-1 Iterations?

Shortest path has at most V-1 edges. Each iteration "extends" paths by one edge.

**Time**: O(VE)

### Finding Negative Cycles

```python
def find_negative_cycle(n, edges):
    dist = [0] * n  # Start from all vertices

    predecessor = [-1] * n
    last_relaxed = -1

    for i in range(n):
        last_relaxed = -1
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                predecessor[v] = u
                last_relaxed = v

    if last_relaxed == -1:
        return None  # No negative cycle

    # Find a vertex in the cycle
    v = last_relaxed
    for _ in range(n):
        v = predecessor[v]

    # Extract cycle
    cycle = []
    u = v
    while True:
        cycle.append(u)
        u = predecessor[u]
        if u == v:
            break

    return cycle[::-1]
```

## SPFA (Shortest Path Faster Algorithm)

Optimization of Bellman-Ford using a queue.

```python
from collections import deque

def spfa(graph, source):
    """graph[u] = [(weight, v), ...]"""
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0
    in_queue = [False] * n
    in_queue[source] = True
    count = [0] * n  # For cycle detection

    queue = deque([source])

    while queue:
        u = queue.popleft()
        in_queue[u] = False

        for w, v in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    count[v] += 1
                    if count[v] >= n:
                        return None  # Negative cycle

    return dist
```

**Time**: O(VE) worst case, often much faster in practice.

## Floyd-Warshall Algorithm

All-pairs shortest paths in O(V³).

```python
def floyd_warshall(n, edges):
    """Returns distance matrix."""
    # Initialize
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = min(dist[u][v], w)

    # DP: consider each vertex as intermediate
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    # Check for negative cycles
    for i in range(n):
        if dist[i][i] < 0:
            return None  # Negative cycle

    return dist
```

### Path Reconstruction

```python
def floyd_warshall_with_paths(n, edges):
    dist = [[float('inf')] * n for _ in range(n)]
    next_node = [[None] * n for _ in range(n)]

    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        if w < dist[u][v]:
            dist[u][v] = w
            next_node[u][v] = v

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_node[i][j] = next_node[i][k]

    return dist, next_node

def get_path(next_node, u, v):
    if next_node[u][v] is None:
        return None
    path = [u]
    while u != v:
        u = next_node[u][v]
        path.append(u)
    return path
```

## Johnson's Algorithm

All-pairs shortest paths, faster for sparse graphs.

### Key Idea

1. Add auxiliary vertex connected to all with weight 0
2. Run Bellman-Ford from auxiliary to get potentials h[v]
3. Reweight edges: w'(u,v) = w(u,v) + h[u] - h[v]
4. Reweighted graph has non-negative edges
5. Run Dijkstra from each vertex

```python
def johnson(n, edges):
    # Add auxiliary vertex n with edges to all others
    augmented = edges + [(n, v, 0) for v in range(n)]

    # Bellman-Ford from auxiliary vertex
    h = bellman_ford(n + 1, augmented, n)
    if h is None:
        return None  # Negative cycle

    h = h[0][:n]  # Discard auxiliary vertex

    # Reweight edges
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        new_weight = w + h[u] - h[v]
        graph[u].append((new_weight, v))

    # Dijkstra from each vertex
    dist = []
    for source in range(n):
        d = dijkstra(graph, source)
        # Restore original distances
        for v in range(n):
            if d[v] != float('inf'):
                d[v] = d[v] - h[source] + h[v]
        dist.append(d)

    return dist
```

**Time**: O(VE + V(E + V log V)) = O(VE + V² log V)

Better than Floyd-Warshall when E << V².

## Comparison

| Algorithm | Negative Edges | Time | Use Case |
|-----------|----------------|------|----------|
| Dijkstra | No | O(E log V) | Single source, non-negative |
| Bellman-Ford | Yes | O(VE) | Negative edges |
| SPFA | Yes | O(VE) avg | Negative edges, faster |
| Floyd-Warshall | Yes | O(V³) | All pairs, dense |
| Johnson | Yes | O(VE + V² log V) | All pairs, sparse |

## Special Cases

### DAG Shortest Paths

Topological order enables O(V + E):

```python
def dag_shortest(graph, source):
    order = topological_sort(graph)
    dist = {v: float('inf') for v in order}
    dist[source] = 0

    for u in order:
        if dist[u] == float('inf'):
            continue
        for w, v in graph[u]:
            dist[v] = min(dist[v], dist[u] + w)

    return dist
```

### Unweighted Graphs

BFS gives O(V + E) shortest paths.

### 0-1 BFS

Edges with weight 0 or 1:

```python
from collections import deque

def bfs_01(graph, source):
    """graph[u] = [(weight, v), ...] where weight in {0, 1}"""
    dist = {source: 0}
    dq = deque([source])

    while dq:
        u = dq.popleft()
        for w, v in graph[u]:
            new_dist = dist[u] + w
            if v not in dist or new_dist < dist[v]:
                dist[v] = new_dist
                if w == 0:
                    dq.appendleft(v)  # Priority to 0-weight
                else:
                    dq.append(v)

    return dist
```

**Time**: O(V + E)

### k Shortest Paths

Find k shortest paths (not just the best):

Yen's algorithm: O(kV(E + V log V))

## Practical Considerations

### Negative Cycle Applications

- Currency arbitrage detection
- Constraint satisfaction

### Preprocessing for Queries

For many point-to-point queries:
- Highway hierarchies
- Contraction hierarchies
- Hub labeling

Can answer queries in microseconds on continental road networks!

## Summary

| Scenario | Best Algorithm |
|----------|----------------|
| Single source, non-negative | Dijkstra |
| Single source, negative | Bellman-Ford/SPFA |
| All pairs, dense | Floyd-Warshall |
| All pairs, sparse | Johnson |
| DAG | Topological + relaxation |
| Unweighted | BFS |
| 0-1 weights | 0-1 BFS |

Understanding which algorithm fits which scenario is key to efficient graph algorithm design.
