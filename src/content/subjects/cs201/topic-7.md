# Graph Algorithms

## Introduction

Graphs are versatile data structures used to model relationships: social networks, maps, computer networks, and dependencies. Understanding how to traverse and analyze graphs is fundamental to solving connectivity and optimization problems.

## Learning Objectives

By the end of this topic, you will be able to:
1.  Represent graphs using **Adjacency Matrix** and **Adjacency List**.
2.  Implement and compare **BFS** (Breadth-First Search) and **DFS** (Depth-First Search).
3.  Implement **Dijkstra's Algorithm** for shortest paths.
4.  Implement **Bellman-Ford** for graphs with negative weights.
5.  Understand **Topological Sort** for Directed Acyclic Graphs (DAGs).

## Core Concepts

### 1. Representations

-   **Adjacency Matrix:** 2D array `A[i][j] = 1` if edge exists. Space $O(V^2)$. Fast lookup $O(1)$. Good for dense graphs.
-   **Adjacency List:** Array of lists. `Adj[i]` contains neighbors of `i`. Space $O(V+E)$. Slow lookup. Good for sparse graphs (most real-world graphs).

### 2. Traversal

-   **BFS (Queue):** Explores neighbors layer by layer. Finds **shortest path** in unweighted graphs. Time $O(V+E)$.
-   **DFS (Stack/Recursion):** Explores as deep as possible. Used for cycle detection, topological sort, maze solving. Time $O(V+E)$.

### 3. Shortest Path Algorithms

-   **Dijkstra:** Greedy approach using a Min-Heap.
    *   *Constraint:* No negative edge weights.
    *   *Time:* $O(E \log V)$.
-   **Bellman-Ford:** Relax all edges $V-1$ times.
    *   *Capability:* Handles negative weights. Detects negative cycles.
    *   *Time:* $O(VE)$.

### 4. Topological Sort

Linear ordering of vertices such that for every edge $u \to v$, vertex $u$ comes before $v$.
*   Only possible in **Directed Acyclic Graphs (DAGs)**.
*   Applications: Build systems (Makefile), Task scheduling.

### 5. Code Example: BFS

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=" ")
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

## Common Mistakes

1.  **Forgetting Visited Set:** In graphs with cycles, BFS/DFS will loop infinitely without tracking visited nodes.
2.  **Using DFS for Shortest Path:** DFS finds *a* path, not necessarily the shortest. Use BFS for unweighted shortest paths.
3.  **Dijkstra with Negatives:** Dijkstra fails with negative edges because once a node is "closed", it assumes the shortest path is found. Negative edges can break this assumption.

## Best Practices

-   **Choose the Right Representation:** Default to Adjacency List ($O(V+E)$ space) unless the graph is extremely dense.
-   **Bi-directional Search:** To find the shortest path between A and B, run BFS from A and BFS from B simultaneously. They meet in the middle much faster.
-   **Union-Find:** For keeping track of connected components (e.g., in Kruskal's algorithm), use the Disjoint Set Union (DSU) data structure.

## Summary

Graphs allow us to model complex systems.
-   **BFS:** Shortest path (unweighted), levels.
-   **DFS:** Connectivity, cycles, ordering.
-   **Dijkstra:** Shortest path (weighted, non-negative).
-   **Topological Sort:** Dependency resolution.

Mastering these opens the door to solving advanced problems like network flow and traveling salesman approximations.
