## Introduction

Graph algorithms provide systematic methods for traversing, searching, and analyzing graph structures. These algorithms form the backbone of countless applications: navigation systems use shortest path algorithms, social networks use traversal for recommendations, compilers use topological sorting for dependency resolution, and network protocols use minimum spanning trees for efficient routing.

**Learning Objectives:**
- Implement Breadth-First Search (BFS) and Depth-First Search (DFS)
- Apply BFS for shortest paths in unweighted graphs
- Use DFS for cycle detection and topological sorting
- Implement Dijkstra's algorithm for weighted shortest paths
- Understand and implement minimum spanning tree algorithms
- Analyze the time and space complexity of graph algorithms

---

## Core Concepts

### Breadth-First Search (BFS)

BFS explores vertices level by level, visiting all neighbors before moving to the next depth level. It uses a **queue** (FIFO) data structure.

**Properties:**
- Time complexity: O(V + E)
- Space complexity: O(V)
- Finds shortest path in unweighted graphs

```python
from collections import deque

def bfs(graph, start):
    """Basic BFS traversal"""
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        vertex = queue.popleft()
        order.append(vertex)

        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

def bfs_shortest_path(graph, start, end):
    """Find shortest path using BFS"""
    if start == end:
        return [start]

    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        vertex, path = queue.popleft()

        for neighbor in graph.get(vertex, []):
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None  # No path exists
```

### Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. It uses a **stack** (LIFO) or recursion.

**Properties:**
- Time complexity: O(V + E)
- Space complexity: O(V)
- Useful for cycle detection, topological sorting, connected components

```python
def dfs_iterative(graph, start):
    """DFS using explicit stack"""
    visited = set()
    stack = [start]
    order = []

    while stack:
        vertex = stack.pop()
        if vertex not in visited:
            visited.add(vertex)
            order.append(vertex)
            # Add neighbors in reverse for consistent ordering
            for neighbor in reversed(graph.get(vertex, [])):
                if neighbor not in visited:
                    stack.append(neighbor)

    return order

def dfs_recursive(graph, vertex, visited=None):
    """DFS using recursion"""
    if visited is None:
        visited = set()

    visited.add(vertex)
    print(vertex, end=' ')

    for neighbor in graph.get(vertex, []):
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)

    return visited
```

### BFS vs DFS Comparison

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data structure | Queue | Stack/Recursion |
| Path found | Shortest (unweighted) | Any path |
| Memory | O(width of graph) | O(depth of graph) |
| Best for | Shortest path, level-order | Cycle detection, topological sort |

### Cycle Detection

**In Undirected Graphs:**
```python
def has_cycle_undirected(graph):
    """Detect cycle in undirected graph"""
    visited = set()

    def dfs(vertex, parent):
        visited.add(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                if dfs(neighbor, vertex):
                    return True
            elif neighbor != parent:
                return True  # Back edge found
        return False

    for v in graph:
        if v not in visited:
            if dfs(v, None):
                return True
    return False
```

**In Directed Graphs:**
```python
def has_cycle_directed(graph):
    """Detect cycle in directed graph using colors"""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {v: WHITE for v in graph}

    def dfs(vertex):
        color[vertex] = GRAY  # Currently exploring

        for neighbor in graph.get(vertex, []):
            if color.get(neighbor, WHITE) == GRAY:
                return True  # Back edge to ancestor
            if color.get(neighbor, WHITE) == WHITE:
                if dfs(neighbor):
                    return True

        color[vertex] = BLACK  # Done exploring
        return False

    for v in graph:
        if color[v] == WHITE:
            if dfs(v):
                return True
    return False
```

### Topological Sort

Orders vertices in a DAG such that for every edge (u,v), u comes before v.

```python
def topological_sort(graph):
    """Topological sort using DFS"""
    visited = set()
    result = []

    def dfs(vertex):
        visited.add(vertex)
        for neighbor in graph.get(vertex, []):
            if neighbor not in visited:
                dfs(neighbor)
        result.append(vertex)

    for v in graph:
        if v not in visited:
            dfs(v)

    return result[::-1]  # Reverse postorder

def topological_sort_kahn(graph):
    """Topological sort using Kahn's algorithm (BFS-based)"""
    from collections import deque

    # Calculate in-degrees
    in_degree = {v: 0 for v in graph}
    for v in graph:
        for neighbor in graph[v]:
            in_degree[neighbor] = in_degree.get(neighbor, 0) + 1

    # Start with zero in-degree vertices
    queue = deque([v for v in in_degree if in_degree[v] == 0])
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        for neighbor in graph.get(vertex, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check for cycle
    if len(result) != len(graph):
        return None  # Graph has a cycle
    return result
```

### Dijkstra's Algorithm

Finds shortest paths from a source to all vertices in a weighted graph with **non-negative** weights.

**Time complexity:** O((V + E) log V) with binary heap

```python
import heapq

def dijkstra(graph, start):
    """
    Dijkstra's shortest path algorithm.
    graph: {vertex: [(neighbor, weight), ...]}
    Returns: {vertex: shortest_distance}
    """
    distances = {v: float('inf') for v in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, vertex)
    visited = set()

    while pq:
        dist, vertex = heapq.heappop(pq)

        if vertex in visited:
            continue
        visited.add(vertex)

        for neighbor, weight in graph.get(vertex, []):
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                heapq.heappush(pq, (new_dist, neighbor))

    return distances

def dijkstra_with_path(graph, start, end):
    """Dijkstra's with path reconstruction"""
    distances = {v: float('inf') for v in graph}
    distances[start] = 0
    previous = {v: None for v in graph}
    pq = [(0, start)]
    visited = set()

    while pq:
        dist, vertex = heapq.heappop(pq)

        if vertex == end:
            break

        if vertex in visited:
            continue
        visited.add(vertex)

        for neighbor, weight in graph.get(vertex, []):
            new_dist = dist + weight
            if new_dist < distances.get(neighbor, float('inf')):
                distances[neighbor] = new_dist
                previous[neighbor] = vertex
                heapq.heappush(pq, (new_dist, neighbor))

    # Reconstruct path
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = previous[current]

    return distances[end], path[::-1]
```

### Bellman-Ford Algorithm

Finds shortest paths even with **negative weights** and detects negative cycles.

**Time complexity:** O(V × E)

```python
def bellman_ford(n, edges, start):
    """
    Bellman-Ford algorithm.
    edges: list of (u, v, weight)
    Returns: distances dict or None if negative cycle exists
    """
    distances = {i: float('inf') for i in range(n)}
    distances[start] = 0

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, weight in edges:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Check for negative cycles
    for u, v, weight in edges:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle detected

    return distances
```

### Floyd-Warshall Algorithm

Finds shortest paths between **all pairs** of vertices.

**Time complexity:** O(V³)

```python
def floyd_warshall(n, edges):
    """
    Floyd-Warshall all-pairs shortest paths.
    Returns: n×n distance matrix
    """
    INF = float('inf')
    dist = [[INF] * n for _ in range(n)]

    # Initialize
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w

    # Dynamic programming
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist
```

### Minimum Spanning Tree (MST)

A spanning tree with minimum total edge weight.

**Kruskal's Algorithm:** Sort edges, add smallest that doesn't create cycle

```python
def kruskal(n, edges):
    """
    Kruskal's MST algorithm using Union-Find.
    edges: list of (u, v, weight)
    """
    # Union-Find with path compression and union by rank
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    # Sort edges by weight
    edges = sorted(edges, key=lambda e: e[2])
    mst = []
    total_weight = 0

    for u, v, w in edges:
        if union(u, v):
            mst.append((u, v, w))
            total_weight += w
            if len(mst) == n - 1:
                break

    return mst, total_weight
```

**Prim's Algorithm:** Grow tree from starting vertex

```python
def prim(graph, start=0):
    """
    Prim's MST algorithm.
    graph: {vertex: [(neighbor, weight), ...]}
    """
    mst = []
    visited = {start}
    edges = [(weight, start, neighbor)
             for neighbor, weight in graph.get(start, [])]
    heapq.heapify(edges)

    while edges and len(visited) < len(graph):
        weight, u, v = heapq.heappop(edges)

        if v in visited:
            continue

        visited.add(v)
        mst.append((u, v, weight))

        for neighbor, w in graph.get(v, []):
            if neighbor not in visited:
                heapq.heappush(edges, (w, v, neighbor))

    return mst
```

---

## Algorithm Complexity Summary

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| BFS | O(V + E) | O(V) | Shortest path (unweighted) |
| DFS | O(V + E) | O(V) | Cycle detection, topological sort |
| Dijkstra | O((V+E) log V) | O(V) | Shortest path (non-negative weights) |
| Bellman-Ford | O(V × E) | O(V) | Shortest path (negative weights) |
| Floyd-Warshall | O(V³) | O(V²) | All-pairs shortest path |
| Kruskal | O(E log E) | O(V) | MST (sparse graphs) |
| Prim | O(E log V) | O(V) | MST (dense graphs) |

---

## Common Mistakes and Debugging

### Mistake 1: Using Dijkstra with Negative Weights

```python
# Wrong: Dijkstra gives incorrect results with negative weights
# Use Bellman-Ford instead
```

### Mistake 2: Not Marking Visited Before Enqueuing (BFS)

```python
# Wrong: Mark visited when dequeuing
while queue:
    v = queue.popleft()
    if v in visited:  # Too late!
        continue
    visited.add(v)

# Correct: Mark visited when enqueuing
while queue:
    v = queue.popleft()
    for neighbor in graph[v]:
        if neighbor not in visited:
            visited.add(neighbor)  # Mark immediately
            queue.append(neighbor)
```

### Mistake 3: Topological Sort on Cyclic Graph

Always check for cycles before topological sort, or use Kahn's algorithm which naturally detects them.

---

## Best Practices

1. **Choose the right algorithm** based on:
   - Weighted vs unweighted
   - Negative weights?
   - Single-source vs all-pairs
   - Sparse vs dense graph

2. **Use appropriate data structures**:
   - Priority queue (heap) for Dijkstra/Prim
   - Union-Find for Kruskal

3. **Handle disconnected graphs** by running from all unvisited vertices

4. **Verify input constraints** (no negative cycles for shortest path algorithms)

---

## Summary

Graph algorithms solve fundamental problems on graph structures:

- **BFS**: Level-order traversal, shortest paths in unweighted graphs
- **DFS**: Deep exploration, cycle detection, topological sorting
- **Dijkstra**: Shortest paths with non-negative weights
- **Bellman-Ford**: Shortest paths with negative weights, cycle detection
- **Floyd-Warshall**: All-pairs shortest paths
- **Kruskal/Prim**: Minimum spanning trees

**Decision Tree:**
1. Shortest path? → Unweighted: BFS; Weighted non-negative: Dijkstra; Negative weights: Bellman-Ford; All pairs: Floyd-Warshall
2. MST? → Sparse: Kruskal; Dense: Prim
3. Ordering? → Topological sort (requires DAG)

---

## Further Exploration

- **A* Algorithm**: Heuristic-guided shortest path
- **Network Flow**: Maximum flow, minimum cut
- **Strongly Connected Components**: Tarjan's or Kosaraju's algorithm
- **Articulation Points and Bridges**: Critical vertices and edges
