# Graph Representations

Choosing how to store a graph affects algorithm efficiency. The two primary representations—adjacency matrices and adjacency lists—offer different trade-offs.

## Adjacency Matrix

An **adjacency matrix** A is an n×n matrix where:

```
A[i][j] = 1 if edge (i,j) exists
A[i][j] = 0 otherwise
```

### Example

```
Graph:           Matrix:
0 --- 1            0 1 2 3
|     |         0 [0 1 1 0]
|     |         1 [1 0 0 1]
2 --- 3         2 [1 0 0 1]
                3 [0 1 1 0]
```

### Properties

**Undirected graphs**: Matrix is symmetric (A[i][j] = A[j][i])

**Directed graphs**: May be asymmetric

**Degree computation**:
- Row sum = out-degree (or degree for undirected)
- Column sum = in-degree

**Weighted graphs**: Store weight instead of 1, use ∞ for non-edges

### Complexity

| Operation | Time |
|-----------|------|
| Check if edge exists | O(1) |
| Find all neighbors | O(n) |
| Add edge | O(1) |
| Remove edge | O(1) |
| Space | O(n²) |

### When to Use

- Dense graphs (|E| close to n²)
- Frequent edge existence queries
- Matrix-based algorithms (transitive closure, shortest paths)

## Adjacency List

An **adjacency list** stores, for each vertex, a list of its neighbors.

### Example

```
Graph:           List:
0 --- 1         0: [1, 2]
|     |         1: [0, 3]
|     |         2: [0, 3]
2 --- 3         3: [1, 2]
```

### Implementation Options

**Array of linked lists**:
```python
adj = [
    [1, 2],      # neighbors of 0
    [0, 3],      # neighbors of 1
    [0, 3],      # neighbors of 2
    [1, 2]       # neighbors of 3
]
```

**Dictionary of sets** (flexible for sparse graphs):
```python
adj = {
    0: {1, 2},
    1: {0, 3},
    2: {0, 3},
    3: {1, 2}
}
```

### Complexity

| Operation | Time |
|-----------|------|
| Check if edge exists | O(deg(v)) |
| Find all neighbors | O(deg(v)) |
| Add edge | O(1) |
| Remove edge | O(deg(v)) |
| Space | O(n + m) |

Where m = |E| (number of edges).

### When to Use

- Sparse graphs (|E| << n²)
- Frequent neighbor traversal (BFS, DFS)
- Space-constrained applications

## Comparison

| Aspect | Adjacency Matrix | Adjacency List |
|--------|-----------------|----------------|
| Space | O(n²) | O(n + m) |
| Edge lookup | O(1) | O(deg) |
| All neighbors | O(n) | O(deg) |
| Add vertex | O(n²) | O(1) |
| Dense graphs | Efficient | Wasteful |
| Sparse graphs | Wasteful | Efficient |

### Breakeven Point

For a graph with n vertices and m edges:
- Matrix uses n² space
- List uses n + 2m space (undirected)

Matrix is better when m > n²/2 (very dense).

Most real-world graphs are sparse, favoring lists.

## Edge List

Simply store all edges as pairs:

```python
edges = [(0,1), (0,2), (1,3), (2,3)]
```

**Space**: O(m)

**Use case**: When you need to iterate over all edges (Kruskal's algorithm)

**Downside**: O(m) for neighbor queries

## Incidence Matrix

An n×m matrix B where:
- Rows represent vertices
- Columns represent edges
- B[v][e] = 1 if vertex v is incident to edge e

### Example

```
Graph:            Incidence Matrix:
0 --- 1           e0 e1 e2 e3
|     |         0 [1  1  0  0]
|     |         1 [1  0  1  0]
2 --- 3         2 [0  1  0  1]
                3 [0  0  1  1]

e0={0,1}, e1={0,2}, e2={1,3}, e3={2,3}
```

**Space**: O(n×m)

**Use case**: Rarely used; theoretical applications in linear algebra over graphs

## Directed Graph Representations

### Adjacency Matrix (Directed)

A[i][j] = 1 means edge from i to j:

```
   a → b            a b c
   ↓               a[0 1 0]
   c               b[0 0 0]
                   c[0 1 0]
```

Row sums = out-degrees, Column sums = in-degrees

### Adjacency List (Directed)

Store only outgoing edges (or maintain separate in/out lists):

```
a: [b, c]    (a → b, a → c)
b: []
c: [b]       (c → b)
```

## Weighted Graphs

### Weighted Adjacency Matrix

Store weights instead of 1:

```
     5
A ------- B           A   B   C
 \       /         A [0   5   3]
  \3   2/          B [5   0   2]
   \   /           C [3   2   0]
    \ /
     C
```

Use ∞ (or None) for non-edges.

### Weighted Adjacency List

Store (neighbor, weight) pairs:

```python
adj = {
    'A': [('B', 5), ('C', 3)],
    'B': [('A', 5), ('C', 2)],
    'C': [('A', 3), ('B', 2)]
}
```

## Implicit Graphs

Some graphs are defined implicitly by rules rather than stored explicitly.

### Example: State Space

Chess positions form a graph where:
- Vertices = board configurations
- Edges = legal moves

Storing all positions is infeasible. Instead, generate neighbors on-demand:

```python
def neighbors(state):
    # Generate all states reachable in one move
    return [apply_move(state, m) for m in legal_moves(state)]
```

### Example: Grid Graph

An m×n grid is implicitly a graph:
- Vertex (i,j) connects to (i±1, j) and (i, j±1)

```python
def grid_neighbors(i, j, m, n):
    result = []
    for di, dj in [(-1,0), (1,0), (0,-1), (0,1)]:
        ni, nj = i + di, j + dj
        if 0 <= ni < m and 0 <= nj < n:
            result.append((ni, nj))
    return result
```

## Choosing a Representation

1. **How dense is the graph?** Sparse → list, Dense → matrix
2. **What operations are common?** Edge queries → matrix, Traversals → list
3. **Are vertices/edges added dynamically?** List handles growth better
4. **Is the graph weighted?** Both work; list may be more natural
5. **Memory constraints?** List for large sparse graphs
