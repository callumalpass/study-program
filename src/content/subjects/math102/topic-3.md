## Introduction

Graph theory is the mathematical study of relationships between objects. A graph consists of vertices (nodes) connected by edges, providing an elegant way to model networks, social connections, dependencies, state machines, and countless other discrete structures. Understanding graph theory is essential for algorithm design, database systems, networking, and artificial intelligence.

**Learning Objectives:**
- Define graphs, vertices, and edges formally
- Distinguish between directed and undirected graphs
- Calculate vertex degrees and apply the handshaking lemma
- Identify special graph types (trees, complete graphs, bipartite graphs)
- Understand paths, cycles, and connectivity
- Recognize Eulerian and Hamiltonian paths

---

## Core Concepts

### Graph Definition

A **graph** G = (V, E) consists of:
- **V**: A set of **vertices** (or nodes)
- **E**: A set of **edges** connecting pairs of vertices

```python
# Adjacency list representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'C', 'D'],
    'C': ['A', 'B', 'D'],
    'D': ['B', 'C']
}

# Edge list representation
edges = [('A', 'B'), ('A', 'C'), ('B', 'C'), ('B', 'D'), ('C', 'D')]
```

### Directed vs Undirected Graphs

**Undirected graph**: Edges have no direction (A—B means A connects to B and B connects to A)

**Directed graph (digraph)**: Edges have direction (A→B means only A connects to B)

```python
# Undirected: add both directions
def add_undirected_edge(graph, u, v):
    graph.setdefault(u, []).append(v)
    graph.setdefault(v, []).append(u)

# Directed: add one direction only
def add_directed_edge(graph, u, v):
    graph.setdefault(u, []).append(v)
    graph.setdefault(v, [])  # Ensure v exists
```

### Weighted Graphs

Edges can have **weights** (costs, distances, capacities):

```python
# Weighted adjacency list: {vertex: [(neighbor, weight), ...]}
weighted_graph = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('C', 1), ('D', 5)],
    'C': [('A', 2), ('B', 1), ('D', 8)],
    'D': [('B', 5), ('C', 8)]
}
```

### Vertex Degree

The **degree** of a vertex is the number of edges incident to it.

```python
def degree(adj_list, vertex):
    """Calculate degree of a vertex"""
    return len(adj_list.get(vertex, []))

# In-degree and out-degree for directed graphs
def in_degree(adj_list, vertex):
    count = 0
    for v in adj_list:
        if vertex in adj_list[v]:
            count += 1
    return count

def out_degree(adj_list, vertex):
    return len(adj_list.get(vertex, []))
```

### The Handshaking Lemma

> The sum of all vertex degrees equals twice the number of edges.

$$\sum_{v \in V} \deg(v) = 2|E|$$

**Consequence:** The number of vertices with odd degree is always even.

```python
def verify_handshaking(adj_list):
    """Verify handshaking lemma: sum of degrees = 2 * edges"""
    total_degree = sum(len(neighbors) for neighbors in adj_list.values())
    num_edges = total_degree // 2  # For undirected graph
    print(f"Sum of degrees: {total_degree}")
    print(f"Number of edges: {num_edges}")
    print(f"2 × edges: {2 * num_edges}")
    return total_degree == 2 * num_edges
```

### Paths and Cycles

- **Walk**: A sequence of vertices where consecutive vertices are connected by edges
- **Path**: A walk with no repeated vertices
- **Cycle**: A path that starts and ends at the same vertex

```python
def find_path_dfs(graph, start, end, path=None):
    """Find a path from start to end using DFS"""
    if path is None:
        path = []
    path = path + [start]

    if start == end:
        return path

    for neighbor in graph.get(start, []):
        if neighbor not in path:
            new_path = find_path_dfs(graph, neighbor, end, path)
            if new_path:
                return new_path
    return None
```

### Connectivity

- **Connected graph** (undirected): There's a path between every pair of vertices
- **Strongly connected** (directed): There's a directed path in both directions between every pair
- **Weakly connected** (directed): Connected when treating edges as undirected

```python
def is_connected(adj_list):
    """Check if undirected graph is connected"""
    if not adj_list:
        return True

    start = next(iter(adj_list))
    visited = set()
    stack = [start]

    while stack:
        v = stack.pop()
        if v not in visited:
            visited.add(v)
            stack.extend(adj_list.get(v, []))

    return len(visited) == len(adj_list)
```

### Special Graph Types

**Complete Graph (Kₙ)**: Every pair of vertices is connected
- Number of edges: n(n-1)/2

```python
def is_complete(adj_list):
    n = len(adj_list)
    for v in adj_list:
        if len(adj_list[v]) != n - 1:
            return False
    return True
```

**Tree**: A connected acyclic graph
- n vertices, exactly n-1 edges
- Unique path between any two vertices

```python
def is_tree(adj_list):
    """Check if graph is a tree"""
    n = len(adj_list)
    if n == 0:
        return True

    # Count edges (each edge counted twice in undirected adj list)
    edges = sum(len(neighbors) for neighbors in adj_list.values()) // 2

    # Tree has exactly n-1 edges and is connected
    if edges != n - 1:
        return False
    return is_connected(adj_list)
```

**Bipartite Graph**: Vertices can be partitioned into two sets where all edges connect vertices from different sets

```python
def is_bipartite(adj_list):
    """Check if graph is bipartite using 2-coloring"""
    color = {}

    for start in adj_list:
        if start in color:
            continue

        stack = [(start, 0)]
        while stack:
            v, c = stack.pop()
            if v in color:
                if color[v] != c:
                    return False
                continue

            color[v] = c
            for neighbor in adj_list.get(v, []):
                stack.append((neighbor, 1 - c))

    return True
```

### Graph Representations

**1. Adjacency List** (preferred for sparse graphs)
- Space: O(V + E)
- Check edge existence: O(degree)
- Iterate neighbors: O(degree)

**2. Adjacency Matrix** (preferred for dense graphs)
- Space: O(V²)
- Check edge existence: O(1)
- Iterate neighbors: O(V)

```python
def adj_list_to_matrix(adj_list, n):
    """Convert adjacency list to matrix"""
    matrix = [[0] * n for _ in range(n)]
    for v in adj_list:
        for u in adj_list[v]:
            matrix[v][u] = 1
    return matrix

def adj_matrix_to_list(matrix):
    """Convert adjacency matrix to list"""
    n = len(matrix)
    adj_list = {i: [] for i in range(n)}
    for i in range(n):
        for j in range(n):
            if matrix[i][j]:
                adj_list[i].append(j)
    return adj_list
```

### Eulerian Paths and Circuits

**Eulerian path**: Visits every edge exactly once
**Eulerian circuit**: Eulerian path that starts and ends at same vertex

**Conditions (undirected graph):**
- Eulerian circuit exists ⟺ all vertices have even degree
- Eulerian path exists ⟺ exactly 0 or 2 vertices have odd degree

```python
def has_eulerian_circuit(adj_list):
    """Check if graph has Eulerian circuit"""
    if not is_connected(adj_list):
        return False
    return all(len(neighbors) % 2 == 0 for neighbors in adj_list.values())

def has_eulerian_path(adj_list):
    """Check if graph has Eulerian path"""
    if not is_connected(adj_list):
        return False
    odd_degree_count = sum(1 for neighbors in adj_list.values()
                          if len(neighbors) % 2 == 1)
    return odd_degree_count in (0, 2)
```

### Hamiltonian Paths and Circuits

**Hamiltonian path**: Visits every vertex exactly once
**Hamiltonian circuit**: Hamiltonian path that returns to start

Unlike Eulerian problems, there's no simple characterization. Testing is NP-complete!

---

## Common Patterns and Applications

### Graph Modeling Examples

**Social Network**: Vertices = people, Edges = friendships (undirected)
**Web Graph**: Vertices = pages, Edges = hyperlinks (directed)
**Road Network**: Vertices = intersections, Edges = roads (weighted)
**Dependencies**: Vertices = tasks, Edges = prerequisites (directed)

### Counting Problems

```python
# Maximum edges in simple undirected graph with n vertices
def max_edges(n):
    return n * (n - 1) // 2

# Number of trees with n labeled vertices (Cayley's formula)
def num_labeled_trees(n):
    return n ** (n - 2) if n >= 2 else 1
```

---

## Common Mistakes and Debugging

### Mistake 1: Confusing Directed and Undirected

```python
# Wrong: Adding only one direction for undirected graph
graph = {}
graph['A'] = ['B']  # Missing B -> A!

# Correct: Add both directions
def add_undirected(graph, u, v):
    graph.setdefault(u, []).append(v)
    graph.setdefault(v, []).append(u)
```

### Mistake 2: Forgetting Isolated Vertices

```python
# Wrong: Isolated vertex not in adjacency list
graph = {'A': ['B'], 'B': ['A']}
# Missing vertex 'C' that has no edges!

# Correct: Include all vertices
graph = {'A': ['B'], 'B': ['A'], 'C': []}
```

### Mistake 3: Self-Loops and Multi-Edges

Simple graphs don't allow self-loops (v→v) or multiple edges between same vertices. Make sure your representation matches your assumptions.

### Mistake 4: Confusing Path and Walk

A path has no repeated vertices. A walk can revisit vertices.

---

## Best Practices

1. **Choose the right representation**:
   - Sparse graph (E << V²): Adjacency list
   - Dense graph (E ≈ V²): Adjacency matrix
   - Need to check edge existence quickly: Matrix or hash set

2. **Handle edge cases**: Empty graphs, single vertex, disconnected components

3. **Verify graph properties** before running algorithms:
   - Connected for single-source shortest path
   - No negative cycles for Bellman-Ford
   - DAG for topological sort

4. **Use sets for visited vertices** to avoid O(n) lookup in lists

5. **Document whether your graph is directed** in your code

---

## Summary

Graph theory provides the foundation for modeling relationships:

- **G = (V, E)**: Vertices and edges define a graph
- **Degree**: Number of edges at a vertex; sum of degrees = 2|E|
- **Directed vs Undirected**: Whether edges have direction
- **Special graphs**: Complete (Kₙ), Trees, Bipartite
- **Connectivity**: Whether paths exist between all vertex pairs
- **Eulerian paths**: Visit all edges once (degree conditions)
- **Hamiltonian paths**: Visit all vertices once (NP-complete)

**Key Formulas:**
- Complete graph Kₙ: n(n-1)/2 edges
- Tree with n vertices: n-1 edges
- Handshaking lemma: Σdeg(v) = 2|E|

---

## Further Exploration

- **Planar graphs**: Can be drawn without edge crossings
- **Graph coloring**: Minimum colors to color vertices so no adjacent pair shares a color
- **Network flow**: Maximum flow through a directed weighted graph
- **Graph isomorphism**: When two graphs have the same structure
