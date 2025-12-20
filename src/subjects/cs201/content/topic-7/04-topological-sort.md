---
id: cs201-t7-topo
title: "Topological Sort and DAGs"
order: 4
---

# Topological Sort and DAGs

Topological sorting addresses a fundamental question in dependency management: given a set of tasks with dependencies, in what order should we execute them? This problem appears constantly in software engineering—compiling source files in the right order, scheduling database migrations, resolving package dependencies, and planning project tasks. The elegant solution relies on directed acyclic graphs (DAGs) and their special properties.

A DAG's acyclicity is essential: cycles would create circular dependencies that no linear ordering can satisfy. If task A depends on B and B depends on A, neither can go first. Topological sort algorithms either produce a valid ordering or detect that the graph contains cycles, making them useful for both scheduling and validation.

Two classic algorithms solve topological sorting: DFS-based (using finish times) and Kahn's algorithm (using in-degrees). Both achieve O(V + E) time but offer different advantages. Understanding both reveals different perspectives on dependency resolution.

## What is Topological Order?

**Definition**: A linear ordering of vertices such that for every directed edge (u, v), u comes before v. Intuitively, all dependencies appear before the tasks that depend on them.

**Exists only for**: Directed Acyclic Graphs (DAGs). Any cycle makes topological ordering impossible—you cannot place cyclic dependencies in a linear order where all edges point forward.

**Not unique**: Multiple valid orderings typically exist. If A depends on B and C but B and C are independent, we could order as B, C, A or C, B, A.

## Applications

### Build Systems

```
main.c → main.o → app
util.c → util.o ↗
```

Compile in topological order: sources before objects before executables.

### Course Prerequisites

```
Calc I → Calc II → Diff Eq
       ↘ Linear Alg ↗
```

Take courses in topological order.

### Package Managers

Install dependencies before packages that need them.

## DFS-Based Algorithm (Kahn's Alternative)

Finish vertices in reverse topological order.

```python
def topological_sort_dfs(graph):
    """graph[u] = [v, ...] for edge u→v"""
    n = len(graph)
    visited = [False] * n
    result = []

    def dfs(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs(v)
        result.append(u)  # Post-order: add when done

    for u in range(n):
        if not visited[u]:
            dfs(u)

    return result[::-1]  # Reverse post-order
```

### Why It Works

When we finish processing vertex u:
- All descendants of u are already in result
- Adding u to front (by reversing) places u before descendants

### Detecting Cycles

Add cycle detection during DFS:

```python
def topological_sort_with_cycle_check(graph):
    n = len(graph)
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    result = []

    def dfs(u):
        color[u] = GRAY  # In progress

        for v in graph[u]:
            if color[v] == GRAY:
                return False  # Back edge = cycle!
            if color[v] == WHITE:
                if not dfs(v):
                    return False

        color[u] = BLACK  # Finished
        result.append(u)
        return True

    for u in range(n):
        if color[u] == WHITE:
            if not dfs(u):
                return None  # Graph has cycle

    return result[::-1]
```

**Time**: O(V + E)

## Kahn's Algorithm (BFS-Based)

Remove vertices with no incoming edges iteratively.

```python
from collections import deque

def kahn_topological_sort(graph):
    n = len(graph)
    in_degree = [0] * n

    # Calculate in-degrees
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1

    # Start with zero in-degree vertices
    queue = deque([u for u in range(n) if in_degree[u] == 0])
    result = []

    while queue:
        u = queue.popleft()
        result.append(u)

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # Check for cycle
    if len(result) != n:
        return None  # Graph has cycle

    return result
```

**Time**: O(V + E)

## All Topological Orderings

Generate all valid orderings (for small graphs):

```python
def all_topological_sorts(graph):
    n = len(graph)
    in_degree = [0] * n
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1

    result = []
    path = []
    visited = [False] * n

    def backtrack():
        if len(path) == n:
            result.append(path[:])
            return

        for u in range(n):
            if not visited[u] and in_degree[u] == 0:
                visited[u] = True
                for v in graph[u]:
                    in_degree[v] -= 1
                path.append(u)

                backtrack()

                path.pop()
                visited[u] = False
                for v in graph[u]:
                    in_degree[v] += 1

    backtrack()
    return result
```

**Warning**: Exponentially many orderings possible!

## DAG Shortest/Longest Paths

Topological order enables efficient path algorithms.

### Shortest Path in DAG

```python
def dag_shortest_path(graph, source):
    """graph[u] = [(weight, v), ...]"""
    order = topological_sort_dfs(graph)
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0

    for u in order:
        if dist[u] == float('inf'):
            continue
        for weight, v in graph[u]:
            dist[v] = min(dist[v], dist[u] + weight)

    return dist
```

**Time**: O(V + E)—faster than Dijkstra for DAGs!

### Longest Path in DAG

```python
def dag_longest_path(graph, source):
    order = topological_sort_dfs(graph)
    n = len(graph)
    dist = [float('-inf')] * n
    dist[source] = 0

    for u in order:
        if dist[u] == float('-inf'):
            continue
        for weight, v in graph[u]:
            dist[v] = max(dist[v], dist[u] + weight)

    return dist
```

**Note**: Longest path is NP-hard for general graphs, but O(V + E) for DAGs!

## Critical Path Method (CPM)

Find longest path in project scheduling DAG.

```python
def critical_path(tasks, dependencies):
    """
    tasks = {name: duration, ...}
    dependencies = [(before, after), ...]
    """
    # Build graph
    graph = {t: [] for t in tasks}
    for before, after in dependencies:
        graph[before].append((tasks[before], after))

    # Topological order
    order = topological_sort(graph)

    # Find earliest start times
    earliest = {t: 0 for t in tasks}
    for u in order:
        for duration, v in graph[u]:
            earliest[v] = max(earliest[v], earliest[u] + duration)

    # Find latest start times (backward pass)
    project_end = max(earliest[t] + tasks[t] for t in tasks)
    latest = {t: project_end - tasks[t] for t in tasks}
    for u in reversed(order):
        for duration, v in graph[u]:
            latest[u] = min(latest[u], latest[v] - tasks[u])

    # Critical tasks: no slack
    critical = [t for t in tasks if earliest[t] == latest[t]]

    return project_end, critical
```

## Counting Paths

Number of paths from source to each vertex:

```python
def count_paths(graph, source):
    order = topological_sort_dfs(graph)
    n = len(graph)
    count = [0] * n
    count[source] = 1

    for u in order:
        for v in graph[u]:
            count[v] += count[u]

    return count
```

**Time**: O(V + E)

## Lexicographically Smallest Order

Use priority queue instead of regular queue in Kahn's:

```python
import heapq

def lex_smallest_topological(graph):
    n = len(graph)
    in_degree = [0] * n
    for u in range(n):
        for v in graph[u]:
            in_degree[v] += 1

    heap = [u for u in range(n) if in_degree[u] == 0]
    heapq.heapify(heap)
    result = []

    while heap:
        u = heapq.heappop(heap)  # Smallest available
        result.append(u)
        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                heapq.heappush(heap, v)

    return result if len(result) == n else None
```

## Parallel Scheduling

Minimize makespan with unlimited resources:

```python
def parallel_schedule(graph, durations):
    """Returns start time for each task."""
    order = topological_sort_dfs(graph)
    n = len(graph)
    start = [0] * n

    for u in order:
        for v in graph[u]:
            start[v] = max(start[v], start[u] + durations[u])

    return start
```

With limited resources, problem becomes NP-hard.

## Summary

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| DFS-based | O(V + E) | O(V) | General |
| Kahn's (BFS) | O(V + E) | O(V) | Cycle detection |
| Lex smallest | O(V + E log V) | O(V) | Tie-breaking |
| All orderings | O(V! × (V + E)) | O(V) | Enumeration |

Topological sort is a building block for many graph algorithms on DAGs, enabling efficient solutions for problems that would be hard on general graphs.
