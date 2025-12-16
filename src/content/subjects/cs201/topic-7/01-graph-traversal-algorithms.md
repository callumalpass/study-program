# Graph Algorithms Overview

Graphs are among the most versatile data structures in computer science, capable of modeling an extraordinary range of real-world systems: social networks connect people, road networks connect cities, the internet connects computers, dependency graphs connect software modules, and neural networks connect neurons. The power of graphs lies in their ability to capture relationships and connections in a way that enables efficient algorithmic solutions.

Graph algorithms form a core pillar of computer science, with applications spanning from route planning and network analysis to compiler optimization and machine learning. Understanding graph algorithms means understanding how to navigate, analyze, and optimize systems of interconnected entities. The algorithms in this topic—traversals, shortest paths, spanning trees, and flows—provide the foundation for solving problems that arise constantly in practice.

The two fundamental traversal strategies, breadth-first search (BFS) and depth-first search (DFS), form the basis for nearly all graph algorithms. BFS explores outward level by level, naturally finding shortest paths in unweighted graphs. DFS explores as deep as possible before backtracking, revealing structure like cycles, connected components, and topological orderings. Mastering these traversals and their variations is essential for tackling more advanced graph problems.

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

The choice between representations has significant algorithmic implications. Most graph algorithms process all edges incident to each vertex, making adjacency lists the natural choice for sparse graphs (E << V²). For dense graphs where most vertex pairs are connected, the adjacency matrix's O(1) edge lookup can be advantageous. In practice, adjacency lists dominate because most real-world graphs are sparse.

## Breadth-First Search (BFS)

Breadth-first search explores vertices in order of their distance from the starting vertex, processing all vertices at distance k before any vertex at distance k+1. This level-by-level exploration uses a queue data structure: when we visit a vertex, we add its unvisited neighbors to the back of the queue. The queue ensures first-in-first-out processing, which maintains the distance ordering.

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

The O(V + E) complexity reflects that we visit each vertex once and examine each edge once (twice for undirected graphs). The visited set prevents revisiting vertices, ensuring termination and linear time. BFS naturally computes shortest paths in unweighted graphs because it processes vertices in distance order—when we first reach a vertex, we've taken the minimum number of edges.

## Depth-First Search (DFS)

Depth-first search takes the opposite approach: instead of exploring broadly, it explores as deeply as possible before backtracking. DFS uses a stack (implicitly via recursion, or explicitly) rather than a queue. When we visit a vertex, we immediately explore one of its neighbors, then one of that neighbor's neighbors, and so on until we reach a dead end, at which point we backtrack.

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

DFS reveals more structural information than BFS. The recursive nature creates a natural tree structure (the DFS tree) where we can classify edges as tree edges, back edges (to ancestors), forward edges (to descendants), and cross edges (to neither). Back edges indicate cycles; their absence indicates the graph is acyclic. This classification is fundamental to algorithms for topological sorting, finding strongly connected components, and detecting articulation points.

## Shortest Path Algorithms

Finding shortest paths is one of the most practically important graph problems. Navigation systems, network routing protocols, and game AI all require efficient shortest path computation. The appropriate algorithm depends on edge weights: BFS for unweighted graphs, Dijkstra for non-negative weights, and Bellman-Ford for graphs that may contain negative weights.

### BFS for Unweighted Graphs

When all edges have equal weight (or weight 1), BFS directly computes shortest paths. The level-by-level exploration ensures we discover each vertex via a shortest path.

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

Dijkstra's algorithm (1959) is one of the most celebrated algorithms in computer science, solving single-source shortest paths for graphs with non-negative edge weights. It uses a greedy strategy: always process the unvisited vertex with the smallest known distance. This works because non-negative weights guarantee that once we've found the shortest path to a vertex, no later discovery can improve it.

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

When graphs may contain negative edge weights—common in financial modeling (arbitrage detection) or when modeling costs that can be negative—Dijkstra's algorithm fails because a negative edge might provide a shortcut discovered after we've already finalized a vertex. Bellman-Ford handles negative weights by relaxing all edges V-1 times, guaranteeing that shortest path information propagates through the entire graph.

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

A key feature of Bellman-Ford is its ability to detect negative cycles—cycles whose total weight is negative. If such cycles exist, shortest paths are undefined (we could traverse the cycle indefinitely to make path cost arbitrarily negative). Bellman-Ford detects this by checking if any edge can still be relaxed after V-1 iterations.

## Minimum Spanning Tree

A minimum spanning tree (MST) connects all vertices with minimum total edge weight. MSTs have applications in network design (minimizing cable or road construction), clustering (single-linkage hierarchical clustering), and approximation algorithms (the MST gives a 2-approximation for the traveling salesman problem on metric spaces).

Two classic algorithms solve the MST problem: Kruskal's and Prim's. Both are greedy algorithms that make locally optimal choices, yet they're guaranteed to find a globally optimal MST. This optimality follows from the cut property: for any partition of vertices, the minimum-weight edge crossing the partition belongs to some MST.

### Kruskal's Algorithm

Kruskal's algorithm processes edges globally, adding the minimum-weight edge that doesn't create a cycle. The union-find data structure efficiently tracks which vertices are already connected.

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

Prim's algorithm grows the MST from a starting vertex, always adding the minimum-weight edge connecting the tree to a new vertex. It uses a priority queue to efficiently find the next edge to add.

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

Topological sorting orders the vertices of a directed acyclic graph (DAG) so that for every edge (u, v), vertex u appears before vertex v in the ordering. This ordering is essential for scheduling tasks with dependencies: compile source files before linking, complete prerequisites before advanced courses, install dependencies before packages that require them.

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

The algorithm maintains in-degrees (number of incoming edges) for each vertex. Vertices with zero in-degree have no dependencies and can be processed first. Removing a vertex from consideration decrements the in-degrees of its neighbors, potentially making them ready for processing. If we process all vertices, the graph is acyclic; if some remain, a cycle exists.

## Cycle Detection

Detecting cycles is fundamental to graph analysis. Cycles in a dependency graph indicate circular dependencies—impossible to resolve sequentially. Cycles in a financial network might indicate arbitrage opportunities. The detection technique differs for directed and undirected graphs because the definition of a cycle differs.

### Undirected Graph

In an undirected graph, a cycle exists if we can reach a vertex via two different paths—equivalently, if we encounter a visited vertex that isn't the parent we just came from. The parent check prevents counting an edge traversed in both directions as a cycle.

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

Directed cycle detection uses a three-color scheme: WHITE (unvisited), GRAY (currently being explored), and BLACK (fully explored). A back edge to a GRAY vertex indicates a cycle—we've found a path back to a vertex in our current exploration path. This technique is more sophisticated than undirected cycle detection because direction matters.

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

Choosing the right graph algorithm requires understanding the problem constraints and graph properties. The table below summarizes the key algorithms and their complexities.

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

Graph algorithms exemplify how problem structure determines algorithmic approach. The same underlying traversal techniques—BFS and DFS—power solutions to remarkably diverse problems: finding paths, detecting structure, computing spanning trees, and scheduling tasks. Mastering these fundamental algorithms provides the foundation for tackling advanced graph problems in network flow, matching, and optimization.
