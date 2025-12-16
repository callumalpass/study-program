# Network Flow Algorithms

Network flow models the maximum amount of "stuff" that can flow through a network from source to sink, with applications from transportation to matching.

## The Maximum Flow Problem

**Input**: Directed graph G = (V, E), source s, sink t, capacity c(u,v) for each edge

**Output**: Maximum total flow from s to t respecting capacities

**Constraints**:
- Flow on edge ≤ capacity
- Flow conservation: inflow = outflow (except s and t)

## Ford-Fulkerson Method

### Core Idea

1. Find an augmenting path (path with available capacity)
2. Push maximum possible flow along it
3. Repeat until no augmenting path exists

### Residual Graph

For flow f on edge (u,v) with capacity c:
- **Forward edge**: residual capacity c - f (room to add flow)
- **Backward edge**: residual capacity f (can cancel flow)

```python
def ford_fulkerson(graph, source, sink):
    """graph[u] = {v: capacity, ...}"""
    # Initialize residual graph
    residual = defaultdict(lambda: defaultdict(int))
    for u in graph:
        for v, cap in graph[u].items():
            residual[u][v] = cap

    def bfs():
        """Find augmenting path using BFS."""
        parent = {source: None}
        queue = deque([source])

        while queue:
            u = queue.popleft()
            if u == sink:
                return parent

            for v in residual[u]:
                if v not in parent and residual[u][v] > 0:
                    parent[v] = u
                    queue.append(v)

        return None

    max_flow = 0

    while True:
        parent = bfs()
        if parent is None:
            break

        # Find bottleneck capacity
        path_flow = float('inf')
        v = sink
        while v != source:
            u = parent[v]
            path_flow = min(path_flow, residual[u][v])
            v = u

        # Update residual graph
        v = sink
        while v != source:
            u = parent[v]
            residual[u][v] -= path_flow
            residual[v][u] += path_flow
            v = u

        max_flow += path_flow

    return max_flow
```

**Time with BFS** (Edmonds-Karp): O(VE²)

## Min-Cut Max-Flow Theorem

**Theorem**: Maximum flow = Minimum cut capacity

**Cut**: Partition of vertices into S (containing s) and T (containing t)

**Cut capacity**: Sum of capacities of edges from S to T

**Implication**: Finding max flow also finds min cut!

### Finding Min Cut

After max flow, unreachable vertices from s in residual graph form T:

```python
def min_cut(residual, source):
    """Returns vertices reachable from source in residual graph."""
    visited = {source}
    queue = deque([source])

    while queue:
        u = queue.popleft()
        for v in residual[u]:
            if v not in visited and residual[u][v] > 0:
                visited.add(v)
                queue.append(v)

    # S = visited, T = all others
    # Cut edges: (u, v) where u in S, v in T, original capacity > 0
    return visited
```

## Dinic's Algorithm

Faster through level graphs and blocking flows.

```python
def dinic(graph, source, sink):
    residual = defaultdict(lambda: defaultdict(int))
    for u in graph:
        for v, cap in graph[u].items():
            residual[u][v] = cap

    def bfs():
        """Build level graph."""
        level = {source: 0}
        queue = deque([source])

        while queue:
            u = queue.popleft()
            for v in residual[u]:
                if v not in level and residual[u][v] > 0:
                    level[v] = level[u] + 1
                    queue.append(v)

        return level if sink in level else None

    def dfs(u, pushed, level):
        """Find blocking flow."""
        if u == sink:
            return pushed

        for v in residual[u]:
            if residual[u][v] > 0 and level.get(v, -1) == level[u] + 1:
                flow = dfs(v, min(pushed, residual[u][v]), level)
                if flow > 0:
                    residual[u][v] -= flow
                    residual[v][u] += flow
                    return flow

        return 0

    max_flow = 0
    while True:
        level = bfs()
        if level is None:
            break

        while True:
            flow = dfs(source, float('inf'), level)
            if flow == 0:
                break
            max_flow += flow

    return max_flow
```

**Time**: O(V²E) general, O(E√V) for unit capacity

## Applications

### Bipartite Matching

Maximum matching in bipartite graph (L, R):

```python
def max_bipartite_matching(left, right, edges):
    """edges = [(l, r), ...] where l in left, r in right"""
    # Create flow network
    source = 'S'
    sink = 'T'
    graph = defaultdict(dict)

    for l in left:
        graph[source][l] = 1

    for l, r in edges:
        graph[l][r] = 1

    for r in right:
        graph[r][sink] = 1

    return dinic(graph, source, sink)
```

**Time**: O(E√V) with Hopcroft-Karp or Dinic

### Edge-Disjoint Paths

Maximum paths from s to t sharing no edges = max flow with unit capacities.

### Vertex-Disjoint Paths

Split each vertex into in-node and out-node connected by unit capacity edge.

### Project Selection

Select subset of projects to maximize profit:
- Each project has value (positive or negative)
- Dependencies: if take A, must take B

Model as min-cut problem.

### Image Segmentation

Separate foreground from background:
- Pixel = vertex
- Adjacent pixels connected
- Source = definite foreground, sink = definite background

Min cut separates optimally.

## Minimum Cost Maximum Flow

Find max flow minimizing total cost (each edge has cost per unit flow).

```python
def min_cost_max_flow(graph, source, sink):
    """graph[u] = {v: (capacity, cost), ...}"""
    # Use Bellman-Ford or SPFA to find shortest augmenting path
    # Augment along shortest path
    # Repeat until no more flow possible
    pass  # Complex implementation
```

**Time**: O(VE × flow) or O(VE × log V × flow) with potentials

## Push-Relabel Algorithm

Alternative paradigm: push excess flow toward sink.

```python
def push_relabel(graph, source, sink):
    """Higher-level push-relabel framework."""
    n = len(graph)
    height = [0] * n
    excess = [0] * n
    height[source] = n

    # Initial push from source
    for v in graph[source]:
        flow = graph[source][v]
        excess[v] += flow
        excess[source] -= flow
        # Update residual...

    # While there's excess not at source/sink
    while any(excess[v] > 0 for v in range(n) if v not in (source, sink)):
        # Find vertex with excess
        # Push or relabel
        pass

    return excess[sink]
```

**Time**: O(V²E) basic, O(V³) with FIFO selection

## Comparison

| Algorithm | Time | Best For |
|-----------|------|----------|
| Ford-Fulkerson (DFS) | O(E × max_flow) | Small integer capacities |
| Edmonds-Karp (BFS) | O(VE²) | General |
| Dinic | O(V²E) | General |
| Dinic (unit capacity) | O(E√V) | Bipartite matching |
| Push-Relabel | O(V²E) or O(V³) | Dense graphs |

## Summary

| Problem | Model | Time |
|---------|-------|------|
| Max Flow | Direct | O(V²E) |
| Min Cut | = Max Flow | O(V²E) |
| Bipartite Matching | Unit capacities | O(E√V) |
| Edge-Disjoint Paths | Unit capacities | O(E√V) |
| Min Cost Max Flow | Shortest paths | O(VE × flow) |

Network flow is a powerful modeling technique—many seemingly unrelated problems reduce to flow, enabling polynomial-time solutions.
