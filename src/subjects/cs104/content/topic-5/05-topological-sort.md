# Topological Sort

Topological sort orders vertices of a Directed Acyclic Graph (DAG) so that for every edge u → v, u comes before v in the ordering. This is essential for dependency resolution, task scheduling, and build systems.

## Understanding Topological Order

Consider course prerequisites:

```
CS101 → CS201 → CS301
          ↓
        CS202

Valid topological orders:
- CS101, CS201, CS202, CS301
- CS101, CS201, CS301, CS202
```

**Key insight**: Topological sort is only possible for DAGs (no cycles).

## DFS-Based Topological Sort

Use DFS and add vertices to result when all descendants are processed (post-order):

```python
def topological_sort_dfs(graph):
    """
    Topological sort using DFS.
    graph: {vertex: [neighbors]}
    Returns: list in topological order, or None if cycle exists
    """
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {v: WHITE for v in graph}
    result = []

    def dfs(vertex):
        color[vertex] = GRAY  # Currently processing

        for neighbor in graph.get(vertex, []):
            if color.get(neighbor, WHITE) == GRAY:
                return False  # Cycle detected
            if color.get(neighbor, WHITE) == WHITE:
                if not dfs(neighbor):
                    return False

        color[vertex] = BLACK  # Done processing
        result.append(vertex)  # Add after all descendants
        return True

    for vertex in graph:
        if color[vertex] == WHITE:
            if not dfs(vertex):
                return None  # Has cycle

    return result[::-1]  # Reverse for correct order
```

### Why Post-Order?

When we finish processing a vertex (all its descendants are done), we add it to the result. Since descendants are added first, reversing gives us the correct order.

```
    A → B → D
    ↓   ↓
    C → E

DFS from A:
- Visit A (gray)
- Visit B (gray)
- Visit D (gray), finish D, add D
- Visit E (gray), finish E, add E
- Finish B, add B
- Visit C (gray), finish C, add C
- Finish A, add A

Result before reverse: [D, E, B, C, A]
After reverse: [A, C, B, E, D] or [A, B, C, D, E] (depending on order)
```

## Kahn's Algorithm (BFS-Based)

Use in-degree counting: repeatedly remove vertices with no incoming edges.

```python
from collections import deque

def topological_sort_kahn(graph, vertices):
    """
    Topological sort using Kahn's algorithm (BFS).
    graph: {vertex: [neighbors]}
    vertices: all vertices in graph
    Returns: list in topological order, or None if cycle
    """
    # Calculate in-degrees
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] = in_degree.get(v, 0) + 1

    # Start with vertices having no incoming edges
    queue = deque([v for v in vertices if in_degree[v] == 0])
    result = []

    while queue:
        vertex = queue.popleft()
        result.append(vertex)

        for neighbor in graph.get(vertex, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we processed all vertices, no cycle
    if len(result) == len(vertices):
        return result

    return None  # Cycle exists
```

### Complexity

Both algorithms:
- **Time**: O(V + E)
- **Space**: O(V)

## Detecting Cycles

Both algorithms can detect cycles:
- **DFS**: Back edge to GRAY vertex
- **Kahn's**: Not all vertices processed

```python
def has_cycle(graph, vertices):
    """Check if directed graph has a cycle."""
    result = topological_sort_kahn(graph, vertices)
    return result is None
```

## All Topological Orders

Find all valid orderings (useful for testing):

```python
def all_topological_sorts(graph, vertices):
    """Generate all valid topological orderings."""
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    results = []

    def backtrack(path, in_deg):
        if len(path) == len(vertices):
            results.append(path[:])
            return

        for v in vertices:
            if v not in path and in_deg[v] == 0:
                path.append(v)
                # Decrease in-degree of neighbors
                for neighbor in graph.get(v, []):
                    in_deg[neighbor] -= 1

                backtrack(path, in_deg)

                # Backtrack
                path.pop()
                for neighbor in graph.get(v, []):
                    in_deg[neighbor] += 1

    backtrack([], in_degree.copy())
    return results
```

## Applications

### 1. Build Systems

```python
# Dependencies: A depends on B means B → A
dependencies = {
    'main.o': ['utils.o', 'config.o'],
    'utils.o': ['common.o'],
    'config.o': ['common.o'],
    'common.o': [],
    'app': ['main.o']
}

# Build order: common.o, utils.o, config.o, main.o, app
```

### 2. Course Scheduling

```python
def can_finish_courses(num_courses, prerequisites):
    """
    Check if all courses can be completed.
    prerequisites: [[course, prereq], ...]
    """
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    result = topological_sort_kahn(graph, list(range(num_courses)))
    return result is not None
```

### 3. Task Scheduling with Dependencies

```python
def schedule_tasks(tasks, dependencies):
    """
    Schedule tasks respecting dependencies.
    dependencies: [(task_a, task_b), ...] means a must finish before b
    """
    graph = {t: [] for t in tasks}
    for a, b in dependencies:
        graph[a].append(b)

    return topological_sort_dfs(graph)
```

### 4. Package Installation Order

```python
packages = {
    'numpy': [],
    'pandas': ['numpy'],
    'scikit-learn': ['numpy', 'scipy'],
    'scipy': ['numpy'],
    'matplotlib': ['numpy']
}

# Installation order: numpy, scipy, matplotlib, pandas, scikit-learn
```

## Lexicographically Smallest Order

Use a min-heap instead of a regular queue in Kahn's algorithm:

```python
import heapq

def topological_sort_lex_smallest(graph, vertices):
    """Get lexicographically smallest topological order."""
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    # Use min-heap for lex order
    heap = [v for v in vertices if in_degree[v] == 0]
    heapq.heapify(heap)
    result = []

    while heap:
        vertex = heapq.heappop(heap)
        result.append(vertex)

        for neighbor in graph.get(vertex, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                heapq.heappush(heap, neighbor)

    return result if len(result) == len(vertices) else None
```

## Summary

Topological sort orders DAG vertices so dependencies come first. DFS-based approach uses post-order reversal. Kahn's algorithm uses in-degree counting with BFS. Both detect cycles and run in O(V + E). Applications include build systems, course scheduling, and package management.
