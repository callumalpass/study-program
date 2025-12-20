---
id: cs104-t5-representations
title: "Graph Representations"
order: 2
---

# Graph Representations

How you represent a graph in code significantly affects the performance of operations. The two main representations are **adjacency lists** and **adjacency matrices**, each with distinct tradeoffs.

## Adjacency List

An adjacency list stores, for each vertex, a list of its neighbors. This is the most common representation for sparse graphs.

### Basic Implementation

```python
# Dictionary of lists
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Access neighbors
neighbors_of_A = graph['A']  # ['B', 'C']
```

### Using defaultdict

```python
from collections import defaultdict

class Graph:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.adj[v].append(u)  # For undirected graph

    def neighbors(self, u):
        return self.adj[u]
```

### Weighted Graph with Adjacency List

```python
# Store (neighbor, weight) tuples
weighted_graph = {
    'A': [('B', 5), ('C', 3)],
    'B': [('A', 5), ('D', 2)],
    'C': [('A', 3), ('D', 7)],
    'D': [('B', 2), ('C', 7)]
}

# Or use nested dictionary
weighted_graph = {
    'A': {'B': 5, 'C': 3},
    'B': {'A': 5, 'D': 2},
    'C': {'A': 3, 'D': 7},
    'D': {'B': 2, 'C': 7}
}

# Access weight
weight_A_to_B = weighted_graph['A']['B']  # 5
```

### Directed Graph

```python
# Only add edge in one direction
class DirectedGraph:
    def __init__(self):
        self.adj = defaultdict(list)

    def add_edge(self, u, v):
        self.adj[u].append(v)  # u -> v only

    def has_edge(self, u, v):
        return v in self.adj[u]
```

## Adjacency Matrix

An adjacency matrix is a 2D array where matrix[i][j] indicates an edge from vertex i to vertex j.

### Basic Implementation

```python
# For graph with vertices 0, 1, 2, 3
# Edge (0,1), (0,2), (1,3), (2,3)

matrix = [
    [0, 1, 1, 0],  # Vertex 0's edges
    [1, 0, 0, 1],  # Vertex 1's edges
    [1, 0, 0, 1],  # Vertex 2's edges
    [0, 1, 1, 0]   # Vertex 3's edges
]

# Check if edge exists
has_edge_0_to_1 = matrix[0][1] == 1  # True
```

### Using NumPy

```python
import numpy as np

class GraphMatrix:
    def __init__(self, num_vertices):
        self.n = num_vertices
        self.matrix = np.zeros((num_vertices, num_vertices), dtype=int)

    def add_edge(self, u, v, weight=1):
        self.matrix[u][v] = weight
        self.matrix[v][u] = weight  # For undirected

    def has_edge(self, u, v):
        return self.matrix[u][v] != 0

    def neighbors(self, u):
        return [v for v in range(self.n) if self.matrix[u][v] != 0]
```

### Weighted Adjacency Matrix

```python
# Store weights instead of 0/1
# Use infinity for no edge
INF = float('inf')

weighted_matrix = [
    [0,   5,   3,   INF],
    [5,   0,   INF, 2  ],
    [3,   INF, 0,   7  ],
    [INF, 2,   7,   0  ]
]

# Weight from vertex 0 to 1
weight = weighted_matrix[0][1]  # 5
```

## Comparison

| Operation | Adjacency List | Adjacency Matrix |
|-----------|---------------|------------------|
| Space | O(V + E) | O(V²) |
| Add Edge | O(1) | O(1) |
| Remove Edge | O(degree) | O(1) |
| Check Edge | O(degree) | O(1) |
| Get Neighbors | O(1) | O(V) |
| Iterate All Edges | O(E) | O(V²) |

### When to Use Each

**Adjacency List (preferred for most cases):**
- Sparse graphs (E << V²)
- Need to iterate over neighbors frequently
- Memory is a concern
- Real-world graphs (social networks, maps, web)

**Adjacency Matrix:**
- Dense graphs (E ≈ V²)
- Frequent edge existence checks
- Need to represent edge weights cleanly
- Small graphs where V² isn't prohibitive
- Algorithms that benefit from matrix operations

## Edge List

A simpler representation: just a list of edges.

```python
# List of (u, v) tuples
edges = [('A', 'B'), ('A', 'C'), ('B', 'D'), ('C', 'D')]

# Weighted: list of (u, v, weight)
weighted_edges = [('A', 'B', 5), ('A', 'C', 3), ('B', 'D', 2)]

class EdgeListGraph:
    def __init__(self):
        self.edges = []
        self.vertices = set()

    def add_edge(self, u, v, weight=1):
        self.edges.append((u, v, weight))
        self.vertices.add(u)
        self.vertices.add(v)

    def get_neighbors(self, u):
        neighbors = []
        for (a, b, w) in self.edges:
            if a == u:
                neighbors.append(b)
            elif b == u:  # For undirected
                neighbors.append(a)
        return neighbors
```

**Use edge list when:**
- Building graph incrementally
- Using algorithms that iterate over all edges (Kruskal's)
- Converting to other formats later

## Converting Between Representations

```python
def edge_list_to_adj_list(edges):
    """Convert edge list to adjacency list."""
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)
    return dict(adj)

def adj_list_to_matrix(adj, vertices):
    """Convert adjacency list to matrix."""
    n = len(vertices)
    v_to_idx = {v: i for i, v in enumerate(vertices)}
    matrix = [[0] * n for _ in range(n)]

    for u in adj:
        for v in adj[u]:
            matrix[v_to_idx[u]][v_to_idx[v]] = 1

    return matrix
```

## Implicit Graphs

Sometimes graphs aren't stored explicitly - they're defined by rules:

```python
# Implicit graph: chessboard knight moves
def knight_neighbors(pos):
    """Generate neighbors for knight at position."""
    row, col = pos
    moves = [(-2,-1), (-2,1), (-1,-2), (-1,2),
             (1,-2), (1,2), (2,-1), (2,1)]
    neighbors = []
    for dr, dc in moves:
        nr, nc = row + dr, col + dc
        if 0 <= nr < 8 and 0 <= nc < 8:
            neighbors.append((nr, nc))
    return neighbors

# Use in BFS without storing entire graph
```

## Summary

Choose adjacency list for sparse graphs (O(V + E) space, fast neighbor iteration). Choose adjacency matrix for dense graphs or frequent edge checks (O(V²) space, O(1) edge check). Edge lists are useful for building graphs or edge-centric algorithms. Implicit graphs define neighbors through rules rather than storage.
