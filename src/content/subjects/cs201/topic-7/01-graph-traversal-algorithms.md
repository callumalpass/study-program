# Graph Algorithms Overview

Graphs model relationships and connections. Graph algorithms solve problems like finding paths, detecting cycles, and computing minimum spanning trees.

## Graph Representations Recap

### Adjacency List

```python
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}
```

**Space**: O(V + E)
**Edge check**: O(degree)
**Best for**: Sparse graphs, traversals

### Adjacency Matrix

```python
#      A  B  C  D
# A  [[0, 1, 1, 0],
# B   [1, 0, 0, 1],
# C   [1, 0, 0, 1],
# D   [0, 1, 1, 0]]
```

**Space**: O(V²)
**Edge check**: O(1)
**Best for**: Dense graphs, edge existence queries

## Breadth-First Search (BFS)

Explores vertices level by level using a queue.

```python
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        vertex = queue.popleft()
        order.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order
```

**Time**: O(V + E)
**Space**: O(V)
**Applications**: Shortest path (unweighted), level-order, bipartiteness check

## Depth-First Search (DFS)

Explores as deep as possible before backtracking.

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result
```

**Time**: O(V + E)
**Space**: O(V) for recursion stack
**Applications**: Cycle detection, topological sort, connected components

## Shortest Path Algorithms

### BFS for Unweighted Graphs

```python
def bfs_shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}

    while queue:
        vertex, path = queue.popleft()

        if vertex == end:
            return path

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None  # No path
```

### Dijkstra's Algorithm

For graphs with non-negative weights.

```python
import heapq

def dijkstra(graph, start):
    distances = {v: float('inf') for v in graph}
    distances[start] = 0
    pq = [(0, start)]

    while pq:
        dist, vertex = heapq.heappop(pq)

        if dist > distances[vertex]:
            continue

        for neighbor, weight in graph[vertex]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))

    return distances
```

**Time**: O((V + E) log V) with binary heap

### Bellman-Ford Algorithm

Handles negative weights.

```python
def bellman_ford(vertices, edges, start):
    dist = {v: float('inf') for v in vertices}
    dist[start] = 0

    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            raise ValueError("Negative cycle detected")

    return dist
```

**Time**: O(VE)

## Minimum Spanning Tree

### Kruskal's Algorithm

```python
def kruskal(vertices, edges):
    """edges = [(weight, u, v), ...]"""
    edges = sorted(edges)
    parent = {v: v for v in vertices}

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    mst = []
    for weight, u, v in edges:
        if find(u) != find(v):
            parent[find(u)] = find(v)
            mst.append((u, v, weight))

    return mst
```

**Time**: O(E log E)

### Prim's Algorithm

```python
def prim(graph, start):
    mst = []
    visited = {start}
    edges = [(w, start, v) for v, w in graph[start]]
    heapq.heapify(edges)

    while edges:
        weight, u, v = heapq.heappop(edges)

        if v in visited:
            continue

        visited.add(v)
        mst.append((u, v, weight))

        for next_v, next_w in graph[v]:
            if next_v not in visited:
                heapq.heappush(edges, (next_w, v, next_v))

    return mst
```

**Time**: O(E log V)

## Topological Sort

For directed acyclic graphs (DAGs).

```python
def topological_sort(graph):
    in_degree = {v: 0 for v in graph}
    for v in graph:
        for neighbor in graph[v]:
            in_degree[neighbor] += 1

    queue = deque([v for v in graph if in_degree[v] == 0])
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        for neighbor in graph[vertex]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result if len(result) == len(graph) else None
```

**Time**: O(V + E)
**Applications**: Build systems, course prerequisites, task scheduling

## Cycle Detection

### Undirected Graph

```python
def has_cycle_undirected(graph):
    visited = set()

    def dfs(v, parent):
        visited.add(v)
        for neighbor in graph[v]:
            if neighbor not in visited:
                if dfs(neighbor, v):
                    return True
            elif neighbor != parent:
                return True
        return False

    for v in graph:
        if v not in visited and dfs(v, None):
            return True
    return False
```

### Directed Graph

```python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {v: WHITE for v in graph}

    def dfs(v):
        color[v] = GRAY
        for neighbor in graph[v]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[v] = BLACK
        return False

    return any(color[v] == WHITE and dfs(v) for v in graph)
```

## Algorithm Selection Guide

| Problem | Algorithm | Time |
|---------|-----------|------|
| Shortest path (unweighted) | BFS | O(V + E) |
| Shortest path (non-negative) | Dijkstra | O((V+E) log V) |
| Shortest path (general) | Bellman-Ford | O(VE) |
| All pairs shortest | Floyd-Warshall | O(V³) |
| MST | Kruskal/Prim | O(E log V) |
| Topological sort | Kahn's/DFS | O(V + E) |
| Cycle detection | DFS | O(V + E) |
| Connected components | BFS/DFS | O(V + E) |
