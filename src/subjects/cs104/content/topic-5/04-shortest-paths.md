# Shortest Path Algorithms

Finding the shortest path between vertices is one of the most important graph problems. Different algorithms handle different scenarios: unweighted graphs, weighted graphs, and graphs with negative edges.

## Shortest Path in Unweighted Graphs

BFS finds shortest paths when all edges have equal weight:

```python
from collections import deque

def shortest_path_unweighted(graph, start, end):
    """Find shortest path in unweighted graph using BFS."""
    if start == end:
        return [start], 0

    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        vertex, path = queue.popleft()

        for neighbor in graph[vertex]:
            if neighbor == end:
                return path + [neighbor], len(path)

            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None, float('inf')  # No path
```

## Dijkstra's Algorithm

For weighted graphs with **non-negative** edge weights, Dijkstra's algorithm finds the shortest path from a source to all other vertices.

### Core Idea

Greedily select the unvisited vertex with minimum distance, then relax its neighbors.

```python
import heapq

def dijkstra(graph, start):
    """
    Find shortest distances from start to all vertices.
    graph: {vertex: [(neighbor, weight), ...]}
    Returns: {vertex: distance}
    """
    distances = {vertex: float('inf') for vertex in graph}
    distances[start] = 0

    # Priority queue: (distance, vertex)
    pq = [(0, start)]

    while pq:
        current_dist, current = heapq.heappop(pq)

        # Skip if we've found a better path
        if current_dist > distances[current]:
            continue

        for neighbor, weight in graph[current]:
            distance = current_dist + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))

    return distances
```

### With Path Reconstruction

```python
def dijkstra_with_path(graph, start, end):
    """Find shortest path and distance from start to end."""
    distances = {vertex: float('inf') for vertex in graph}
    distances[start] = 0
    previous = {vertex: None for vertex in graph}

    pq = [(0, start)]

    while pq:
        current_dist, current = heapq.heappop(pq)

        if current == end:
            break

        if current_dist > distances[current]:
            continue

        for neighbor, weight in graph[current]:
            distance = current_dist + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current
                heapq.heappush(pq, (distance, neighbor))

    # Reconstruct path
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = previous[current]

    return path[::-1], distances[end]
```

### Complexity

- **Time**: O((V + E) log V) with binary heap
- **Space**: O(V)

### Limitation

Dijkstra's fails with negative edge weights:

```
    A --1--> B --(-5)--> C
    |                    ^
    +--------10----------+

Dijkstra visits A->C (cost 10), then A->B (cost 1)
But never reconsiders C, missing A->B->C (cost -4)
```

## Bellman-Ford Algorithm

Handles **negative edge weights** (but not negative cycles).

```python
def bellman_ford(graph, start, num_vertices):
    """
    Find shortest paths with possible negative edges.
    graph: list of (u, v, weight) edges
    Returns: distances dict, or None if negative cycle exists
    """
    distances = {v: float('inf') for v in range(num_vertices)}
    distances[start] = 0

    # Relax all edges V-1 times
    for _ in range(num_vertices - 1):
        for u, v, weight in graph:
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight

    # Check for negative cycles
    for u, v, weight in graph:
        if distances[u] + weight < distances[v]:
            return None  # Negative cycle detected

    return distances
```

### Complexity

- **Time**: O(V × E)
- **Space**: O(V)

## Floyd-Warshall Algorithm

Finds shortest paths between **all pairs** of vertices.

```python
def floyd_warshall(graph, num_vertices):
    """
    Find shortest paths between all pairs.
    graph: adjacency matrix with weights (inf for no edge)
    Returns: distance matrix
    """
    dist = [[float('inf')] * num_vertices for _ in range(num_vertices)]

    # Initialize with direct edges
    for i in range(num_vertices):
        dist[i][i] = 0
    for u, v, weight in graph:  # Or copy from adjacency matrix
        dist[u][v] = weight

    # Consider each vertex as intermediate
    for k in range(num_vertices):
        for i in range(num_vertices):
            for j in range(num_vertices):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist
```

### Complexity

- **Time**: O(V³)
- **Space**: O(V²)

Good for dense graphs when you need all-pairs shortest paths.

## Algorithm Comparison

| Algorithm | Graph Type | Negative Edges | Time | Use Case |
|-----------|------------|----------------|------|----------|
| BFS | Unweighted | N/A | O(V + E) | Unweighted shortest path |
| Dijkstra | Weighted | No | O((V+E) log V) | Single-source, non-negative |
| Bellman-Ford | Weighted | Yes (no neg cycles) | O(VE) | Negative edges, detect neg cycles |
| Floyd-Warshall | Weighted | Yes | O(V³) | All-pairs shortest paths |

## A* Algorithm (Informed Search)

When you have a heuristic estimate of distance to goal, A* can be faster than Dijkstra:

```python
def astar(graph, start, goal, heuristic):
    """
    A* search using heuristic function.
    heuristic(node): estimated distance from node to goal
    """
    open_set = [(heuristic(start), 0, start, [start])]
    visited = set()

    while open_set:
        f, g, current, path = heapq.heappop(open_set)

        if current == goal:
            return path, g

        if current in visited:
            continue
        visited.add(current)

        for neighbor, weight in graph[current]:
            if neighbor not in visited:
                new_g = g + weight
                new_f = new_g + heuristic(neighbor)
                heapq.heappush(open_set, (new_f, new_g, neighbor, path + [neighbor]))

    return None, float('inf')

# Example: Grid navigation with Manhattan distance heuristic
def manhattan_distance(pos, goal):
    return abs(pos[0] - goal[0]) + abs(pos[1] - goal[1])
```

**A* guarantee**: If heuristic is **admissible** (never overestimates), A* finds optimal path.

## Practical Tips

1. **Check for negative edges**: If possible, use Dijkstra (faster)
2. **Dense vs sparse**: Floyd-Warshall for dense all-pairs, run Dijkstra V times for sparse
3. **Use A* when possible**: With a good heuristic, much faster than Dijkstra
4. **Early termination**: For single-target, stop when target is popped from queue

## Summary

BFS for unweighted graphs, Dijkstra for weighted non-negative, Bellman-Ford when negative edges exist, Floyd-Warshall for all-pairs. A* uses heuristics for faster informed search. Choose based on graph properties and what paths you need.
