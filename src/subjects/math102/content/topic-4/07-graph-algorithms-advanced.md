# Advanced Graph Algorithms

This section covers sophisticated graph algorithms including strongly connected components, articulation points, and advanced traversal techniques.

## Strongly Connected Components

### Definition

In a directed graph, a **strongly connected component (SCC)** is a maximal set of vertices where every vertex is reachable from every other.

### Properties

- SCCs partition the vertices
- Condensation graph (SCCs as nodes) is a DAG
- Useful for understanding graph structure

### Kosaraju's Algorithm

Uses two DFS passes:

```python
def kosaraju_scc(graph, n):
    """
    Find strongly connected components.
    graph: adjacency list (directed)
    Returns: list of SCCs (each SCC is a list of vertices)
    """
    # First DFS: compute finishing times
    visited = [False] * n
    finish_order = []

    def dfs1(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs1(v)
        finish_order.append(u)

    for u in range(n):
        if not visited[u]:
            dfs1(u)

    # Build reverse graph
    reverse = [[] for _ in range(n)]
    for u in range(n):
        for v in graph[u]:
            reverse[v].append(u)

    # Second DFS on reverse graph in reverse finish order
    visited = [False] * n
    sccs = []

    def dfs2(u, scc):
        visited[u] = True
        scc.append(u)
        for v in reverse[u]:
            if not visited[v]:
                dfs2(v, scc)

    for u in reversed(finish_order):
        if not visited[u]:
            scc = []
            dfs2(u, scc)
            sccs.append(scc)

    return sccs
```

**Complexity:** O(V + E)

### Tarjan's Algorithm

Single DFS with low-link values:

```python
def tarjan_scc(graph, n):
    """Tarjan's SCC algorithm."""
    index = [0]
    indices = [-1] * n
    low_link = [0] * n
    on_stack = [False] * n
    stack = []
    sccs = []

    def strong_connect(u):
        indices[u] = low_link[u] = index[0]
        index[0] += 1
        stack.append(u)
        on_stack[u] = True

        for v in graph[u]:
            if indices[v] == -1:
                strong_connect(v)
                low_link[u] = min(low_link[u], low_link[v])
            elif on_stack[v]:
                low_link[u] = min(low_link[u], indices[v])

        if low_link[u] == indices[u]:
            scc = []
            while True:
                v = stack.pop()
                on_stack[v] = False
                scc.append(v)
                if v == u:
                    break
            sccs.append(scc)

    for u in range(n):
        if indices[u] == -1:
            strong_connect(u)

    return sccs
```

**Key idea:** Track lowest reachable index. If low_link[u] = indices[u], u is root of an SCC.

## Articulation Points and Bridges

### Definitions

- **Articulation point:** Vertex whose removal disconnects the graph
- **Bridge:** Edge whose removal disconnects the graph

### Finding Articulation Points

```python
def find_articulation_points(graph, n):
    """Find articulation points in undirected graph."""
    visited = [False] * n
    disc = [0] * n  # Discovery time
    low = [0] * n   # Lowest reachable discovery time
    parent = [-1] * n
    ap = set()
    time = [0]

    def dfs(u):
        children = 0
        visited[u] = True
        disc[u] = low[u] = time[0]
        time[0] += 1

        for v in graph[u]:
            if not visited[v]:
                children += 1
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])

                # u is articulation point if:
                # 1. u is root and has 2+ children
                # 2. u is not root and low[v] >= disc[u]
                if parent[u] == -1 and children > 1:
                    ap.add(u)
                if parent[u] != -1 and low[v] >= disc[u]:
                    ap.add(u)
            elif v != parent[u]:
                low[u] = min(low[u], disc[v])

    for u in range(n):
        if not visited[u]:
            dfs(u)

    return ap
```

### Finding Bridges

Similar approach: edge (u,v) is a bridge if low[v] > disc[u].

## Biconnected Components

A graph is **biconnected** if it has no articulation points (removing any single vertex keeps it connected).

### 2-Edge-Connected Components

Partition vertices by removing bridges.

### Block-Cut Tree

- Nodes: biconnected components and articulation points
- Edges: articulation point belongs to adjacent biconnected components

## Cycle Detection

### In Directed Graphs

Use DFS with three states: unvisited, in-progress, completed.

```python
def has_cycle_directed(graph, n):
    """Detect cycle in directed graph."""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(u):
        color[u] = GRAY
        for v in graph[u]:
            if color[v] == GRAY:  # Back edge
                return True
            if color[v] == WHITE and dfs(v):
                return True
        color[u] = BLACK
        return False

    return any(color[u] == WHITE and dfs(u) for u in range(n))
```

### In Undirected Graphs

Track parent to avoid trivial back-edge.

## Euler Tour

### Hierholzer's Algorithm

Find Eulerian path/circuit efficiently:

```python
def find_eulerian_path(graph, n):
    """
    Find Eulerian path in directed graph.
    Assumes path exists (at most one vertex with out-in=1,
    at most one with in-out=1).
    """
    from collections import defaultdict

    # Make mutable copy of adjacency lists
    adj = defaultdict(list)
    in_degree = [0] * n
    out_degree = [0] * n

    for u in range(n):
        for v in graph[u]:
            adj[u].append(v)
            out_degree[u] += 1
            in_degree[v] += 1

    # Find start vertex
    start = 0
    for u in range(n):
        if out_degree[u] - in_degree[u] == 1:
            start = u
            break
        if out_degree[u] > 0:
            start = u

    path = []
    stack = [start]

    while stack:
        u = stack[-1]
        if adj[u]:
            v = adj[u].pop()
            stack.append(v)
        else:
            path.append(stack.pop())

    return path[::-1]
```

## Heavy-Light Decomposition

Decompose tree into paths for efficient path queries.

**Idea:**
- Each vertex connects to its "heavy" child (largest subtree)
- Light edges lead to smaller subtrees
- Any path crosses O(log n) light edges

**Applications:**
- Path queries in O(log² n)
- Combine with segment trees

## Centroid Decomposition

Recursively find tree centroids for divide-and-conquer.

**Centroid:** Vertex whose removal creates subtrees all of size ≤ n/2.

**Properties:**
- Every tree has a centroid
- Centroid decomposition has depth O(log n)

**Applications:**
- Distance queries
- Path counting

## 2-SAT

**Problem:** Satisfiability of CNF formula with clauses of size 2.

**Graph construction:**
- Variable x → vertices x and ¬x
- Clause (a ∨ b) → edges ¬a→b and ¬b→a

**Solution:**
1. Find SCCs
2. Satisfiable iff no variable and its negation in same SCC
3. Assign values based on SCC order in condensation DAG

**Complexity:** O(V + E)

## All-Pairs Shortest Paths

### Floyd-Warshall

```python
def floyd_warshall(dist, n):
    """
    All-pairs shortest paths.
    dist: n×n matrix, dist[i][j] = edge weight or infinity
    Modifies dist in place.
    """
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
```

**Complexity:** O(V³)

**Negative cycle detection:** Check if any dist[i][i] < 0.

## Summary

Advanced graph algorithms:
- **SCC:** Kosaraju's and Tarjan's algorithms, O(V+E)
- **Articulation points/bridges:** Single DFS with low-link values
- **Biconnected components:** Partition by articulation points
- **Cycle detection:** DFS with coloring for directed graphs
- **Euler tour:** Hierholzer's algorithm
- **Tree decompositions:** Heavy-light, centroid
- **2-SAT:** Reduce to SCC

These algorithms form the foundation for solving complex graph problems efficiently.
