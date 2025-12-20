---
id: math102-t4-connected
title: "Connected Components"
order: 4
---

# Connected Components and Strong Connectivity

Understanding connectivity structure reveals how a graph decomposes into independently reachable regions. This is fundamental for analyzing network robustness and relationships.

## Connected Components (Undirected)

A **connected component** is a maximal set of vertices where any two vertices are connected by a path.

### Finding Components

```python
def find_components(graph):
    visited = set()
    components = []

    def dfs(v, component):
        visited.add(v)
        component.append(v)
        for neighbor in graph[v]:
            if neighbor not in visited:
                dfs(neighbor, component)

    for vertex in graph:
        if vertex not in visited:
            component = []
            dfs(vertex, component)
            components.append(component)

    return components
```

### Using Union-Find

For dynamic connectivity, Union-Find is more efficient:

```python
class UnionFind:
    def __init__(self, vertices):
        self.parent = {v: v for v in vertices}
        self.rank = {v: 0 for v in vertices}

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def count_components(vertices, edges):
    uf = UnionFind(vertices)
    for u, v in edges:
        uf.union(u, v)
    return len(set(uf.find(v) for v in vertices))
```

### Complexity

- **DFS/BFS**: O(V + E)
- **Union-Find**: O(α(V) × E) where α is inverse Ackermann (nearly constant)

## Strongly Connected Components (Directed)

In directed graphs, **strongly connected** means there's a path from u to v AND from v to u.

A **strongly connected component (SCC)** is a maximal set of mutually reachable vertices.

### Example

```
    A → B → C
    ↑   ↓   ↓
    └── D ← E

SCCs: {A, B, D}, {C}, {E}
```

Within {A,B,D}, any vertex can reach any other. But C and E can't reach back to {A,B,D}.

## Kosaraju's Algorithm

Two-pass DFS algorithm for finding SCCs.

### Algorithm

```python
def kosaraju(graph, vertices):
    # Pass 1: DFS on original graph, record finish order
    visited = set()
    finish_order = []

    def dfs1(v):
        visited.add(v)
        for neighbor in graph[v]:
            if neighbor not in visited:
                dfs1(neighbor)
        finish_order.append(v)

    for v in vertices:
        if v not in visited:
            dfs1(v)

    # Build reverse graph
    reverse_graph = {v: [] for v in vertices}
    for u in graph:
        for v in graph[u]:
            reverse_graph[v].append(u)

    # Pass 2: DFS on reverse graph in reverse finish order
    visited.clear()
    sccs = []

    def dfs2(v, component):
        visited.add(v)
        component.append(v)
        for neighbor in reverse_graph[v]:
            if neighbor not in visited:
                dfs2(neighbor, component)

    for v in reversed(finish_order):
        if v not in visited:
            component = []
            dfs2(v, component)
            sccs.append(component)

    return sccs
```

### Why It Works

1. First DFS orders vertices by finish time
2. Processing in reverse finish order on reversed graph ensures we start each new SCC from a "sink" SCC
3. The reverse graph has same SCCs but reversed edges

### Complexity

- **Time**: O(V + E)
- **Space**: O(V)

## Tarjan's Algorithm

Single-pass algorithm using DFS with low-link values.

```python
def tarjan(graph, vertices):
    index_counter = [0]
    index = {}
    lowlink = {}
    on_stack = set()
    stack = []
    sccs = []

    def strongconnect(v):
        index[v] = index_counter[0]
        lowlink[v] = index_counter[0]
        index_counter[0] += 1
        stack.append(v)
        on_stack.add(v)

        for w in graph.get(v, []):
            if w not in index:
                strongconnect(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif w in on_stack:
                lowlink[v] = min(lowlink[v], index[w])

        # If v is a root, pop the SCC
        if lowlink[v] == index[v]:
            component = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                component.append(w)
                if w == v:
                    break
            sccs.append(component)

    for v in vertices:
        if v not in index:
            strongconnect(v)

    return sccs
```

### Key Concepts

- **index[v]**: Discovery time of v
- **lowlink[v]**: Smallest index reachable from v's subtree
- **Root of SCC**: Vertex where lowlink[v] == index[v]

### Complexity

- **Time**: O(V + E)
- **Space**: O(V)

## SCC Graph (Condensation)

The **condensation** of a directed graph contracts each SCC to a single vertex:

```python
def condensation(graph, sccs):
    # Map each vertex to its SCC index
    vertex_to_scc = {}
    for i, scc in enumerate(sccs):
        for v in scc:
            vertex_to_scc[v] = i

    # Build condensation graph
    cond_graph = {i: set() for i in range(len(sccs))}
    for u in graph:
        for v in graph[u]:
            su, sv = vertex_to_scc[u], vertex_to_scc[v]
            if su != sv:
                cond_graph[su].add(sv)

    return cond_graph
```

### Properties

- Condensation is always a DAG
- Can apply topological sort to condensation
- Useful for reachability queries

## Bridges and Articulation Points

**Bridge**: Edge whose removal disconnects the graph.

**Articulation point**: Vertex whose removal disconnects the graph.

### Finding Bridges

```python
def find_bridges(graph, vertices):
    index_counter = [0]
    index = {}
    lowlink = {}
    bridges = []

    def dfs(v, parent):
        index[v] = index_counter[0]
        lowlink[v] = index_counter[0]
        index_counter[0] += 1

        for w in graph[v]:
            if w not in index:
                dfs(w, v)
                lowlink[v] = min(lowlink[v], lowlink[w])
                if lowlink[w] > index[v]:
                    bridges.append((v, w))
            elif w != parent:
                lowlink[v] = min(lowlink[v], index[w])

    for v in vertices:
        if v not in index:
            dfs(v, None)

    return bridges
```

An edge (u,v) is a bridge if lowlink[v] > index[u] (no back edge bypasses it).

## Applications

**Network reliability**: Bridges and articulation points are single points of failure.

**Social networks**: SCCs identify tightly-knit communities.

**Web graph**: SCCs reveal the "bow-tie" structure of the web.

**2-SAT**: Satisfiability of 2-SAT formulas reduces to SCC computation.

**Deadlock detection**: Cycles in wait-for graphs indicate deadlocks.
