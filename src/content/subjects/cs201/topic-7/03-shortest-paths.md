# Shortest Path Algorithms

Shortest path computation is perhaps the most practically important graph algorithm. Every time you use a navigation app, your device computes shortest paths through road networks. Every packet on the internet follows paths determined by routing algorithms. Every game AI that moves toward a goal uses pathfinding. Understanding shortest path algorithms—their capabilities, limitations, and appropriate use cases—is essential for any software engineer.

The richness of shortest path problems comes from the interplay between problem variants (single-source vs all-pairs, weighted vs unweighted) and graph properties (non-negative weights vs arbitrary weights, presence of cycles). Each combination calls for a different algorithm. Choosing correctly means the difference between millisecond responses and timeouts, between scalable solutions and ones that fail on larger inputs.

This diversity of algorithms reflects a fundamental principle: exploit structure when it exists. Unweighted graphs have the simplest structure and the fastest algorithms. Non-negative weights enable Dijkstra's elegant greedy approach. Negative weights require more sophisticated techniques. Understanding why each algorithm works—and fails—provides insight into algorithm design more broadly.

## Problem Variants

### Single-Source Shortest Path (SSSP)

Find shortest paths from one source to all other vertices. This is the most common variant: given a starting point, compute distances to all reachable destinations. Navigation systems, network routing, and game AI typically solve SSSP.

### All-Pairs Shortest Path (APSP)

Find shortest paths between all pairs of vertices. This is necessary when many different source-destination queries will be made, making it worthwhile to precompute all answers. APSP algorithms either run SSSP from each vertex or use dynamic programming approaches like Floyd-Warshall.

### Considerations

- **Edge weights**: Unweighted, non-negative, arbitrary (including negative)
- **Graph type**: Directed vs undirected (undirected can be modeled as directed with edges in both directions)
- **Negative cycles**: If present, shortest path may not exist (can decrease indefinitely by repeating the cycle)

## BFS for Unweighted Graphs

When all edges have weight 1, BFS gives shortest paths.

```python
from collections import deque

def bfs_shortest_paths(adj, source):
    n = len(adj)
    dist = [-1] * n
    parent = [-1] * n
    dist[source] = 0

    queue = deque([source])

    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                parent[v] = u
                queue.append(v)

    return dist, parent
```

**Time**: O(V + E)

## Dijkstra's Algorithm

For graphs with **non-negative** edge weights.

### Algorithm

```python
import heapq

def dijkstra(adj, source):
    """
    adj: adjacency list where adj[u] = [(v, weight), ...]
    Returns: distances from source
    """
    n = len(adj)
    dist = [float('inf')] * n
    dist[source] = 0
    visited = [False] * n

    # Priority queue: (distance, vertex)
    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if visited[u]:
            continue
        visited[u] = True

        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))

    return dist
```

### Complexity

- **Binary heap**: O((V + E) log V)
- **Fibonacci heap**: O(E + V log V)
- **Dense graphs**: O(V²) with array instead of heap

### Correctness

**Invariant**: When vertex u is extracted, dist[u] is the true shortest distance.

**Proof**: By contradiction. If a shorter path exists, it must go through an unvisited vertex v with dist[v] < dist[u], but then v would be extracted first.

### Path Reconstruction

```python
def dijkstra_with_path(adj, source):
    n = len(adj)
    dist = [float('inf')] * n
    parent = [-1] * n
    dist[source] = 0
    visited = [False] * n
    pq = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)
        if visited[u]:
            continue
        visited[u] = True

        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                parent[v] = u
                heapq.heappush(pq, (dist[v], v))

    return dist, parent

def get_path(parent, target):
    path = []
    while target != -1:
        path.append(target)
        target = parent[target]
    return path[::-1]
```

## Bellman-Ford Algorithm

Handles **negative edge weights** (but not negative cycles).

### Algorithm

```python
def bellman_ford(edges, n, source):
    """
    edges: list of (u, v, weight)
    n: number of vertices
    Returns: distances, or None if negative cycle
    """
    dist = [float('inf')] * n
    dist[source] = 0

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # Negative cycle detected

    return dist
```

### Complexity

**Time**: O(VE)

### Why It Works

After i iterations, dist[v] equals the shortest path using at most i edges. Since any shortest path has at most V-1 edges, V-1 iterations suffice.

### Negative Cycle Detection

If any edge can still be relaxed after V-1 iterations, a negative cycle exists.

## SPFA (Shortest Path Faster Algorithm)

Optimization of Bellman-Ford using a queue.

```python
from collections import deque

def spfa(adj, source):
    n = len(adj)
    dist = [float('inf')] * n
    dist[source] = 0
    in_queue = [False] * n
    count = [0] * n  # Relaxation count for cycle detection

    queue = deque([source])
    in_queue[source] = True

    while queue:
        u = queue.popleft()
        in_queue[u] = False

        for v, weight in adj[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                count[v] += 1

                if count[v] >= n:
                    return None  # Negative cycle

                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True

    return dist
```

**Average case**: O(kE) where k is small
**Worst case**: O(VE)

## Floyd-Warshall Algorithm

All-pairs shortest paths in O(V³).

```python
def floyd_warshall(adj_matrix):
    """
    adj_matrix[i][j] = weight of edge i→j, or inf if no edge
    """
    n = len(adj_matrix)
    dist = [row[:] for row in adj_matrix]

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

### Key Insight

**dist[i][j] through vertices {0, ..., k}** = min of:
- dist[i][j] through {0, ..., k-1}
- dist[i][k] + dist[k][j]

### Path Reconstruction

```python
def floyd_warshall_paths(adj_matrix):
    n = len(adj_matrix)
    dist = [row[:] for row in adj_matrix]
    next_hop = [[j if adj_matrix[i][j] < float('inf') else -1
                 for j in range(n)] for i in range(n)]

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_hop[i][j] = next_hop[i][k]

    return dist, next_hop

def reconstruct_path(next_hop, u, v):
    if next_hop[u][v] == -1:
        return []
    path = [u]
    while u != v:
        u = next_hop[u][v]
        path.append(u)
    return path
```

## Johnson's Algorithm

All-pairs shortest paths for sparse graphs.

### Approach

1. Add new vertex s with zero-weight edges to all vertices
2. Run Bellman-Ford from s to get potentials h[v]
3. Reweight edges: w'(u,v) = w(u,v) + h[u] - h[v]
4. Run Dijkstra from each vertex on reweighted graph
5. Adjust distances back

```python
def johnson(adj, n):
    # Step 1: Add source s connected to all vertices
    edges = []
    for u in range(n):
        for v, w in adj[u]:
            edges.append((u, v, w))
        edges.append((n, u, 0))  # From new source to all

    # Step 2: Bellman-Ford from new source
    h = bellman_ford(edges, n + 1, n)
    if h is None:
        return None  # Negative cycle

    # Step 3: Reweight
    adj_prime = [[] for _ in range(n)]
    for u in range(n):
        for v, w in adj[u]:
            adj_prime[u].append((v, w + h[u] - h[v]))

    # Step 4: Dijkstra from each vertex
    dist = []
    for u in range(n):
        d = dijkstra(adj_prime, u)
        # Step 5: Adjust back
        adjusted = [d[v] - h[u] + h[v] if d[v] < float('inf') else float('inf')
                   for v in range(n)]
        dist.append(adjusted)

    return dist
```

**Complexity**: O(VE + V² log V)

Better than Floyd-Warshall for sparse graphs.

## Algorithm Selection Guide

| Scenario | Algorithm | Complexity |
|----------|-----------|------------|
| Unweighted | BFS | O(V + E) |
| Non-negative weights | Dijkstra | O((V+E) log V) |
| Negative weights | Bellman-Ford | O(VE) |
| All-pairs, dense | Floyd-Warshall | O(V³) |
| All-pairs, sparse | Johnson | O(VE + V² log V) |

## Special Cases

### DAG Shortest Paths

For directed acyclic graphs, process in topological order.

```python
def dag_shortest_paths(adj, source):
    n = len(adj)
    order = topological_sort(adj)

    dist = [float('inf')] * n
    dist[source] = 0

    for u in order:
        if dist[u] < float('inf'):
            for v, w in adj[u]:
                dist[v] = min(dist[v], dist[u] + w)

    return dist
```

**Time**: O(V + E)

### 0-1 BFS

When edge weights are only 0 or 1, use deque instead of priority queue.

```python
from collections import deque

def bfs_01(adj, source):
    n = len(adj)
    dist = [float('inf')] * n
    dist[source] = 0
    dq = deque([source])

    while dq:
        u = dq.popleft()
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)  # Add to front
                else:
                    dq.append(v)  # Add to back

    return dist
```

**Time**: O(V + E)

