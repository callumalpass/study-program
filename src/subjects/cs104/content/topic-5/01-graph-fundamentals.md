---
id: cs104-t5-fundamentals
title: "Graph Fundamentals"
order: 1
---

# Graph Fundamentals

Graphs are one of the most versatile data structures in computer science, modeling relationships between objects. From social networks to road maps, from web pages to molecular structures, graphs appear everywhere. Understanding graphs is essential for solving complex real-world problems.

## What is a Graph?

A graph G = (V, E) consists of:
- **V**: A set of vertices (or nodes)
- **E**: A set of edges connecting pairs of vertices

```
Example: Social network
Vertices: {Alice, Bob, Carol, David}
Edges: {(Alice, Bob), (Bob, Carol), (Carol, David), (Alice, Carol)}

    Alice --- Bob
      |       |
      +--- Carol --- David
```

## Graph Terminology

### Basic Terms

- **Vertex (Node)**: A fundamental unit of a graph
- **Edge**: A connection between two vertices
- **Adjacent**: Two vertices connected by an edge
- **Neighbor**: A vertex adjacent to another vertex
- **Degree**: Number of edges incident to a vertex

```python
# In this graph:
#    A -- B
#    |    |
#    C -- D

# Vertices: {A, B, C, D}
# Edges: {(A,B), (A,C), (B,D), (C,D)}
# A is adjacent to B and C
# Neighbors of A: {B, C}
# Degree of A: 2
```

### More Terminology

- **Path**: A sequence of vertices connected by edges
- **Cycle**: A path that starts and ends at the same vertex
- **Connected**: A graph where a path exists between every pair of vertices
- **Component**: A maximal connected subgraph
- **Tree**: A connected graph with no cycles

## Types of Graphs

### Directed vs Undirected

**Undirected**: Edges have no direction (friendship is mutual)
```
A --- B    # A and B can reach each other
```

**Directed (Digraph)**: Edges have direction (following on Twitter)
```
A --> B    # A can reach B, but B cannot reach A directly
```

### Weighted vs Unweighted

**Unweighted**: All edges have equal weight (or weight = 1)
```
A --- B    # Distance/cost = 1
```

**Weighted**: Edges have associated costs
```
A --5-- B    # Distance/cost = 5
```

### Other Types

- **Simple Graph**: No self-loops or multiple edges
- **Multigraph**: Multiple edges between same vertices allowed
- **Complete Graph (K_n)**: Every vertex connected to every other
- **Bipartite Graph**: Vertices can be divided into two sets with edges only between sets
- **DAG (Directed Acyclic Graph)**: Directed graph with no cycles

## Special Properties

### Degree Properties

For undirected graphs:
- Sum of all degrees = 2 × |E| (each edge contributes 2 to total degree)
- In a complete graph K_n: |E| = n(n-1)/2

For directed graphs:
- **In-degree**: Number of incoming edges
- **Out-degree**: Number of outgoing edges
- Sum of in-degrees = Sum of out-degrees = |E|

### Connectivity

A graph is **connected** if there's a path between every pair of vertices.

A directed graph is:
- **Weakly connected**: Connected if we ignore edge directions
- **Strongly connected**: A path exists from every vertex to every other vertex

```python
def is_connected(graph):
    """Check if undirected graph is connected using BFS."""
    if not graph:
        return True

    start = next(iter(graph))
    visited = set()
    queue = [start]

    while queue:
        node = queue.pop(0)
        if node in visited:
            continue
        visited.add(node)
        queue.extend(neighbor for neighbor in graph[node] if neighbor not in visited)

    return len(visited) == len(graph)
```

## Graph Density

**Sparse Graph**: |E| ≈ |V| (few edges)
- Example: Road network, most cities connect to few others

**Dense Graph**: |E| ≈ |V|² (many edges)
- Example: Complete graph, social network of a small group

Density affects which algorithms and representations are efficient.

## Trees as Graphs

A tree is a special graph that is:
- Connected
- Acyclic
- Has |V| - 1 edges

```
        A
       /|\
      B C D
     /|   |
    E F   G

Properties:
- Exactly one path between any two vertices
- Removing any edge disconnects the graph
- Adding any edge creates a cycle
```

## Paths and Cycles

**Simple Path**: A path with no repeated vertices
**Simple Cycle**: A cycle with no repeated vertices (except start/end)

```python
def has_path(graph, start, end, visited=None):
    """Check if path exists between start and end."""
    if visited is None:
        visited = set()

    if start == end:
        return True

    visited.add(start)

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            if has_path(graph, neighbor, end, visited):
                return True

    return False
```

## Applications

Graphs model countless real-world scenarios:

| Domain | Vertices | Edges |
|--------|----------|-------|
| Social Network | People | Friendships |
| Web | Pages | Hyperlinks |
| Maps | Locations | Roads |
| Dependencies | Tasks | Prerequisites |
| Networks | Computers | Connections |
| Molecules | Atoms | Bonds |

## Summary

Graphs consist of vertices and edges, modeling relationships. Key properties include direction (directed vs undirected), weight, connectivity, and density. Understanding graph terminology is essential for implementing graph algorithms. Graphs appear in countless applications from social networks to road maps.
