---
id: math102-t3-paths
title: "Paths and Cycles"
order: 3
---

# Paths, Walks, and Cycles

Understanding connectivity in graphs requires precise definitions of movement through vertices and edges. These concepts are fundamental to graph algorithms.

## Walks

A **walk** is a sequence of vertices where consecutive vertices are adjacent:

```
v₀ - v₁ - v₂ - ... - vₖ
```

**Length** of walk: Number of edges traversed (k, not k+1 vertices)

Walks may repeat vertices and edges.

### Example

```
    A --- B
    |     |
    |     |
    C --- D
```

Walk: A - B - D - C - A - B (length 5)

This walk visits A and B twice, and traverses edge A-B twice.

## Trails

A **trail** is a walk with no repeated edges.

Vertices may repeat, but each edge is used at most once.

### Example

Trail: A - B - D - C - A (length 4)

Uses each edge once. Vertex A appears twice, which is allowed.

## Paths

A **path** is a walk with no repeated vertices (and hence no repeated edges).

### Example

Path: A - B - D - C (length 3)

Each vertex appears exactly once.

**Notation**: Pₙ denotes the path graph with n vertices.

## Cycles

A **cycle** is a trail where start and end vertices are the same (and only they repeat).

Equivalently: A path plus one edge returning to the start.

### Example

Cycle: A - B - D - C - A (length 4)

Only A appears twice (as start/end).

**Notation**: Cₙ denotes the cycle graph with n vertices.

## Summary of Terminology

| Term | Repeated Vertices | Repeated Edges |
|------|-------------------|----------------|
| Walk | Allowed | Allowed |
| Trail | Allowed | Not allowed |
| Path | Not allowed | Not allowed |
| Cycle | Only start/end | Not allowed |

## Connectivity via Paths

**Connected vertices**: u and v are connected if a path exists between them.

**Connected graph**: Every pair of vertices is connected.

**Distance** d(u,v): Length of shortest path from u to v. If no path exists, d(u,v) = ∞.

### Properties of Distance

1. d(v,v) = 0
2. d(u,v) = d(v,u) (undirected graphs)
3. d(u,v) ≤ d(u,w) + d(w,v) (triangle inequality)

**Diameter**: Maximum distance between any two vertices.

**Radius**: Minimum eccentricity, where eccentricity of v = max distance from v to any other vertex.

## Eulerian Paths and Cycles

An **Eulerian path** visits every edge exactly once.

An **Eulerian cycle** is an Eulerian path that starts and ends at the same vertex.

### Existence Theorems

**Eulerian cycle exists** iff:
- Graph is connected (ignoring isolated vertices)
- Every vertex has even degree

**Eulerian path exists** iff:
- Graph is connected
- Exactly 0 or 2 vertices have odd degree
- (If 2 odd vertices, path starts at one and ends at the other)

### Example: Königsberg Bridges

```
    A
   /|\
  / | \
 B--+--C
  \ | /
   \|/
    D
```

Each vertex has odd degree (3), so no Eulerian path exists.

### Finding Eulerian Paths: Hierholzer's Algorithm

```python
def hierholzer(graph, start):
    stack = [start]
    path = []

    while stack:
        v = stack[-1]
        if graph[v]:  # Has unused edges
            u = graph[v].pop()
            graph[u].remove(v)  # Remove edge
            stack.append(u)
        else:
            path.append(stack.pop())

    return path[::-1]
```

## Hamiltonian Paths and Cycles

A **Hamiltonian path** visits every vertex exactly once.

A **Hamiltonian cycle** is a Hamiltonian path that returns to start.

### No Simple Criterion

Unlike Eulerian circuits, there's no easy necessary and sufficient condition.

**Sufficient conditions** (but not necessary):
- **Dirac's Theorem**: If n ≥ 3 and every vertex has degree ≥ n/2, then G has a Hamiltonian cycle.
- **Ore's Theorem**: If deg(u) + deg(v) ≥ n for all non-adjacent pairs, then Hamiltonian cycle exists.

### Computational Complexity

Determining if a Hamiltonian path/cycle exists is NP-complete.

Contrast: Eulerian path/cycle can be found in O(E) time.

## Cycle Detection

### Undirected Graphs

A cycle exists iff |E| ≥ |V| (in a connected graph).

More precisely: After building a spanning tree with |V|-1 edges, any additional edge creates a cycle.

**Using DFS**:
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
                return True  # Back edge found
        return False

    for v in graph:
        if v not in visited:
            if dfs(v, None):
                return True
    return False
```

### Directed Graphs

Use DFS with three states: unvisited, in-progress, completed.

A back edge to an in-progress vertex indicates a cycle.

```python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {v: WHITE for v in graph}

    def dfs(v):
        color[v] = GRAY
        for neighbor in graph[v]:
            if color[neighbor] == GRAY:
                return True  # Back edge
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[v] = BLACK
        return False

    return any(dfs(v) for v in graph if color[v] == WHITE)
```

## Shortest Paths

Finding shortest paths is a fundamental problem:

- **Unweighted**: BFS gives shortest paths in O(V + E)
- **Non-negative weights**: Dijkstra's algorithm O((V + E) log V)
- **General weights**: Bellman-Ford O(VE)
- **All pairs**: Floyd-Warshall O(V³)

## Girth

The **girth** of a graph is the length of its shortest cycle.

- Trees have infinite girth (no cycles)
- Kₙ (n ≥ 3) has girth 3
- Cycle Cₙ has girth n
- Petersen graph has girth 5

Graphs with large girth are important in coding theory and network design.
