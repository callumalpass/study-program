# Dijkstra's Algorithm

Dijkstra's algorithm is perhaps the most famous greedy graph algorithm, finding shortest paths from a source to all other vertices. Every GPS navigation system, every network routing protocol, every game pathfinding system uses variations of Dijkstra. The algorithm's greedy strategy—always process the unvisited vertex with smallest known distance—produces correct results when all edge weights are non-negative.

The algorithm's correctness rests on a beautiful invariant: vertices are finalized in order of increasing distance from the source. When we extract a vertex with minimum tentative distance, no alternative path could be shorter because any such path would traverse another unvisited vertex with even smaller distance (which would have been extracted first). This greedy choice property, combined with optimal substructure (shortest paths contain shortest subpaths), guarantees optimality.

Understanding why Dijkstra fails with negative weights deepens understanding of greedy algorithms. Negative edges break the distance-ordering invariant: a path through a far vertex might become shorter after traversing negative edges. This limitation motivates Bellman-Ford (handles negative edges) and Floyd-Warshall (all pairs shortest paths). Knowing when Dijkstra applies—and when it doesn't—is essential algorithmic knowledge.

## The Problem

**Input**: Weighted directed graph G = (V, E), source vertex s

**Output**: Shortest path distances from s to all vertices

**Constraint**: All edge weights must be non-negative

## The Algorithm

### Intuition

Maintain a "frontier" of discovered vertices. Always process the vertex with smallest known distance—its distance is final.

### Implementation

```python
import heapq

def dijkstra(graph, source):
    """graph[u] = [(weight, v), ...]"""
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0
    visited = [False] * n

    # Priority queue: (distance, vertex)
    heap = [(0, source)]

    while heap:
        d, u = heapq.heappop(heap)

        if visited[u]:
            continue
        visited[u] = True

        for weight, v in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(heap, (dist[v], v))

    return dist
```

### Path Reconstruction

```python
def dijkstra_with_path(graph, source):
    n = len(graph)
    dist = [float('inf')] * n
    prev = [-1] * n
    dist[source] = 0
    visited = [False] * n
    heap = [(0, source)]

    while heap:
        d, u = heapq.heappop(heap)

        if visited[u]:
            continue
        visited[u] = True

        for weight, v in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                prev[v] = u
                heapq.heappush(heap, (dist[v], v))

    return dist, prev

def reconstruct_path(prev, target):
    path = []
    current = target
    while current != -1:
        path.append(current)
        current = prev[current]
    return path[::-1]
```

## Why It Works

### Greedy Choice Property

**Claim**: When a vertex u is popped from the heap with distance d, d is the true shortest path distance.

**Proof by induction**:
- Base: Source has distance 0 ✓
- Inductive step: Assume all popped vertices have correct distances
- When u is popped, any alternative path to u must go through some unvisited vertex v
- Since v is unvisited, dist[v] ≥ dist[u] (u was chosen first)
- Path through v has length ≥ dist[v] + (non-negative edges to u) ≥ dist[u]
- Therefore dist[u] is optimal

### Why Non-Negative Weights?

With negative weights, the greedy choice fails:

```
    A --1--> B
    |        |
   10       -15
    |        |
    v        v
    C <--1-- D
```

Processing B first gives dist[C] = ∞, but A→B→D→C = 1-15+1 = -13.

## Complexity Analysis

### With Binary Heap

- Each vertex popped once: O(V)
- Each edge relaxed once: O(E)
- Heap operations: O(log V)
- **Total**: O((V + E) log V) = O(E log V)

### With Fibonacci Heap

- Extract-min: O(log V) amortized
- Decrease-key: O(1) amortized
- **Total**: O(E + V log V)

Better for dense graphs (E >> V).

### With Array (No Heap)

For dense graphs (adjacency matrix):

```python
def dijkstra_array(adj_matrix, source):
    n = len(adj_matrix)
    dist = [float('inf')] * n
    dist[source] = 0
    visited = [False] * n

    for _ in range(n):
        # Find minimum distance unvisited vertex
        u = -1
        for v in range(n):
            if not visited[v] and (u == -1 or dist[v] < dist[u]):
                u = v

        if dist[u] == float('inf'):
            break

        visited[u] = True

        for v in range(n):
            if adj_matrix[u][v] and not visited[v]:
                dist[v] = min(dist[v], dist[u] + adj_matrix[u][v])

    return dist
```

**Time**: O(V²)—better than O(E log V) when E ≈ V²

## Bidirectional Dijkstra

Search from both source and target; meet in the middle.

```python
def bidirectional_dijkstra(graph, reverse_graph, source, target):
    dist_forward = {source: 0}
    dist_backward = {target: 0}
    heap_forward = [(0, source)]
    heap_backward = [(0, target)]
    processed_forward = set()
    processed_backward = set()

    best = float('inf')

    while heap_forward or heap_backward:
        # Alternate between forward and backward
        if heap_forward:
            d, u = heapq.heappop(heap_forward)
            if u in processed_forward:
                continue
            processed_forward.add(u)

            if u in processed_backward:
                best = min(best, dist_forward[u] + dist_backward[u])

            for weight, v in graph[u]:
                new_dist = d + weight
                if v not in dist_forward or new_dist < dist_forward[v]:
                    dist_forward[v] = new_dist
                    heapq.heappush(heap_forward, (new_dist, v))

        # Similar for backward search...

        # Early termination
        if heap_forward and heap_backward:
            if heap_forward[0][0] + heap_backward[0][0] >= best:
                break

    return best
```

**Speedup**: ~2× in practice for point-to-point queries.

## A* Algorithm

Dijkstra with heuristic guidance toward target.

```python
def a_star(graph, source, target, heuristic):
    """heuristic(v) estimates distance from v to target"""
    g_score = {source: 0}  # Actual distance from source
    f_score = {source: heuristic(source)}  # Estimated total
    heap = [(f_score[source], source)]
    came_from = {}

    while heap:
        _, current = heapq.heappop(heap)

        if current == target:
            return reconstruct_path(came_from, target)

        for weight, neighbor in graph[current]:
            tentative_g = g_score[current] + weight

            if neighbor not in g_score or tentative_g < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score[neighbor] = tentative_g + heuristic(neighbor)
                heapq.heappush(heap, (f_score[neighbor], neighbor))

    return None  # No path
```

**Requirement**: Heuristic must be admissible (never overestimates).

**Common heuristics**:
- Manhattan distance (grid with 4-directional movement)
- Euclidean distance (straight-line)

## Dial's Algorithm

For integer weights in range [0, C]:

```python
def dial(graph, source, max_weight):
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0

    # Buckets for each possible distance
    max_dist = n * max_weight
    buckets = [[] for _ in range(max_dist + 1)]
    buckets[0].append(source)

    for d in range(max_dist + 1):
        while buckets[d]:
            u = buckets[d].pop()
            if dist[u] < d:
                continue

            for weight, v in graph[u]:
                new_dist = d + weight
                if new_dist < dist[v]:
                    dist[v] = new_dist
                    buckets[new_dist].append(v)

    return dist
```

**Time**: O(E + V × C) — faster when C is small.

## Practical Optimizations

### Early Termination

For single-target queries:

```python
if u == target:
    return dist[u]
```

### Priority Queue Optimizations

- Use index-based priority queue with decrease-key
- Or: allow duplicates, skip stale entries (lazy deletion)

### Memory Layout

- Store graph as contiguous arrays for cache efficiency
- Use compact edge representation

## Applications

### Navigation and Maps

- GPS routing
- Google Maps, Waze
- Often with A* and precomputation

### Network Routing

- OSPF protocol uses Dijkstra
- Finding lowest-latency paths

### Game Development

- Pathfinding for NPCs
- Combined with A* and map preprocessing

## Comparison with Other Algorithms

| Algorithm | Negative Edges | Time | Use Case |
|-----------|---------------|------|----------|
| Dijkstra | No | O(E log V) | General, non-negative |
| Bellman-Ford | Yes | O(VE) | Negative edges |
| Floyd-Warshall | Yes | O(V³) | All pairs |
| A* | No | O(E log V) | Point-to-point with heuristic |

## Summary

Dijkstra's algorithm demonstrates greedy correctness through a clean invariant: vertices are finalized in order of increasing distance from the source. With the right data structures, it's efficient enough for practical applications from web mapping to network routing.

Key insights:
- Greedy works because edge weights are non-negative
- Priority queue enables efficient minimum extraction
- Many variants exist for specialized use cases
