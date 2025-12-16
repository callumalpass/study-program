# Shortest Path Algorithms

Finding the shortest path between vertices is a fundamental graph problem with applications in routing, navigation, and network optimization.

## Problem Variants

**Single-source shortest paths (SSSP)**: Find shortest paths from one source to all other vertices.

**Single-pair shortest path**: Find shortest path between specific source and target.

**All-pairs shortest paths (APSP)**: Find shortest paths between every pair of vertices.

## Dijkstra's Algorithm

For graphs with non-negative edge weights, Dijkstra's algorithm finds shortest paths from a source to all vertices.

### Algorithm

```python
import heapq

def dijkstra(graph, start):
    dist = {v: float('inf') for v in graph}
    dist[start] = 0
    parent = {start: None}
    pq = [(0, start)]  # (distance, vertex)

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue  # Skip outdated entries

        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                parent[v] = u
                heapq.heappush(pq, (new_dist, v))

    return dist, parent
```

### Example

```
Graph:              Start: A
A --1-- B
|       |           Initial: dist = {A:0, B:∞, C:∞, D:∞}
4       2
|       |           Process A: update B(1), C(4)
C --3-- D           Process B: update D(3)
                    Process D: (no updates)
                    Process C: D already optimal

Result: {A:0, B:1, C:4, D:3}
```

### Complexity

- **With binary heap**: O((V + E) log V)
- **With Fibonacci heap**: O(E + V log V)
- **Limitation**: Cannot handle negative edge weights

### Why No Negative Weights?

Dijkstra assumes: once a vertex is processed, its distance is final.

Negative weights can violate this:
```
A --1-- B
 \     /
  -5  3
   \ /
    C

Processing A→B gives dist[B]=1
But A→C→B = -5+3 = -2 < 1
```

## Bellman-Ford Algorithm

Handles graphs with negative weights (but no negative cycles).

### Algorithm

```python
def bellman_ford(graph, vertices, start):
    dist = {v: float('inf') for v in vertices}
    dist[start] = 0
    parent = {start: None}

    # Relax all edges V-1 times
    for _ in range(len(vertices) - 1):
        for u in graph:
            for v, weight in graph[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight
                    parent[v] = u

    # Check for negative cycles
    for u in graph:
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                raise ValueError("Negative cycle detected")

    return dist, parent
```

### Why V-1 Iterations?

Any shortest path has at most V-1 edges. Each iteration "extends" paths by one edge. After V-1 iterations, all shortest paths are found.

### Complexity

- **Time**: O(VE)
- **Space**: O(V)

### Negative Cycle Detection

If any edge can still be relaxed after V-1 iterations, a negative cycle exists.

## Floyd-Warshall Algorithm

Finds shortest paths between all pairs of vertices.

### Algorithm

```python
def floyd_warshall(graph, vertices):
    n = len(vertices)
    idx = {v: i for i, v in enumerate(vertices)}

    # Initialize distance matrix
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u in graph:
        for v, weight in graph[u]:
            dist[idx[u]][idx[v]] = weight

    # Dynamic programming
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist
```

### Intuition

dist[i][j] through vertices {0,1,...,k} is either:
- dist[i][j] through {0,...,k-1}, or
- dist[i][k] through {0,...,k-1} + dist[k][j] through {0,...,k-1}

### Complexity

- **Time**: O(V³)
- **Space**: O(V²)

### Negative Cycles

Negative cycle exists if dist[i][i] < 0 for any i after algorithm completes.

## Algorithm Selection

| Scenario | Algorithm | Complexity |
|----------|-----------|------------|
| Unweighted SSSP | BFS | O(V + E) |
| Non-negative weights SSSP | Dijkstra | O((V+E) log V) |
| General weights SSSP | Bellman-Ford | O(VE) |
| All pairs | Floyd-Warshall | O(V³) |
| All pairs, sparse | V × Dijkstra | O(V(V+E) log V) |

## Shortest Path in DAGs

For directed acyclic graphs, we can solve SSSP in O(V + E) by processing vertices in topological order.

```python
def dag_shortest_path(graph, vertices_topo_order, start):
    dist = {v: float('inf') for v in vertices_topo_order}
    dist[start] = 0

    for u in vertices_topo_order:
        if dist[u] < float('inf'):
            for v, weight in graph[u]:
                if dist[u] + weight < dist[v]:
                    dist[v] = dist[u] + weight

    return dist
```

This works because when we process vertex u, all paths to u have been considered.

## A* Algorithm

A* is an informed search that uses a heuristic to guide exploration toward the target.

```python
def a_star(graph, start, goal, heuristic):
    open_set = [(heuristic(start, goal), 0, start)]
    g_score = {start: 0}
    parent = {start: None}

    while open_set:
        _, g, current = heapq.heappop(open_set)

        if current == goal:
            return reconstruct_path(parent, goal), g

        if g > g_score.get(current, float('inf')):
            continue

        for neighbor, weight in graph[current]:
            tentative_g = g + weight
            if tentative_g < g_score.get(neighbor, float('inf')):
                g_score[neighbor] = tentative_g
                parent[neighbor] = current
                f = tentative_g + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f, tentative_g, neighbor))

    return None, float('inf')
```

### Heuristics

The heuristic h(n) estimates distance from n to goal.

**Admissible**: h(n) ≤ actual distance (never overestimates)

**Consistent**: h(n) ≤ cost(n,m) + h(m) for all edges (n,m)

Common heuristics for grids:
- Manhattan distance: |x₁-x₂| + |y₁-y₂|
- Euclidean distance: √((x₁-x₂)² + (y₁-y₂)²)

### Properties

- With admissible heuristic, A* finds optimal path
- With consistent heuristic, A* never re-expands vertices
- A* with h = 0 reduces to Dijkstra
