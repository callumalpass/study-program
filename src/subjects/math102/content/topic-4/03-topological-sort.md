---
id: math102-t4-topo
title: "Topological Sort"
order: 3
---

# Topological Sorting

Topological sorting orders vertices of a directed acyclic graph (DAG) so that for every edge (u,v), vertex u appears before v. This ordering is essential for scheduling tasks with dependencies.

## Definition

A **topological ordering** of a DAG is a linear ordering of its vertices such that for every directed edge (u,v), u comes before v in the ordering.

### Example

```
    A → B → D
    ↓   ↓
    C → E

Valid topological orders:
- A, B, C, D, E
- A, B, C, E, D
- A, C, B, D, E
- A, C, B, E, D
```

### Key Properties

- Topological ordering exists if and only if the graph is a DAG
- A DAG may have multiple valid topological orderings
- The first vertex in any topological ordering has in-degree 0
- The last vertex has out-degree 0

## Kahn's Algorithm (BFS-based)

Process vertices with no incoming edges, removing them as we go.

```python
from collections import deque

def kahn_topological_sort(graph, vertices):
    # Calculate in-degrees
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    # Start with vertices having in-degree 0
    queue = deque([v for v in vertices if in_degree[v] == 0])
    result = []

    while queue:
        u = queue.popleft()
        result.append(u)

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # Check for cycle
    if len(result) != len(vertices):
        raise ValueError("Graph has a cycle")

    return result
```

### Why It Works

A vertex with in-degree 0 has no dependencies—it can come first.

After removing it (and its outgoing edges), new vertices may reach in-degree 0.

If we can't process all vertices, a cycle must exist.

### Complexity

- **Time**: O(V + E)
- **Space**: O(V)

## DFS-based Topological Sort

Use DFS finish times in reverse order.

```python
def dfs_topological_sort(graph, vertices):
    visited = set()
    result = []
    temp_mark = set()  # For cycle detection

    def dfs(v):
        if v in temp_mark:
            raise ValueError("Graph has a cycle")
        if v in visited:
            return

        temp_mark.add(v)
        for neighbor in graph.get(v, []):
            dfs(neighbor)
        temp_mark.remove(v)

        visited.add(v)
        result.append(v)

    for v in vertices:
        if v not in visited:
            dfs(v)

    return result[::-1]  # Reverse for topological order
```

### Why Reverse Finish Times?

If edge (u,v) exists, DFS finishes v before u (v is explored and completed while exploring u's subtree).

Reversing finish times puts u before v.

## Applications

### Course Prerequisites

```
Courses and prerequisites:
CS101 → CS201
CS101 → CS202
CS201 → CS301
CS202 → CS301
```

Topological sort gives a valid course sequence: CS101, CS201, CS202, CS301

### Build Systems

```
Dependencies:
main.c → main.o
utils.c → utils.o
main.o → program
utils.o → program
```

Build order: utils.c, main.c, utils.o, main.o, program

### Task Scheduling

Given tasks with dependencies, find an execution order where all dependencies are satisfied.

```python
def schedule_tasks(tasks, dependencies):
    # Build graph
    graph = {task: [] for task in tasks}
    for before, after in dependencies:
        graph[before].append(after)

    return kahn_topological_sort(graph, tasks)
```

### Spreadsheet Evaluation

Cells may reference other cells. Topological sort determines evaluation order.

```
A1 = 5
B1 = A1 + 10
C1 = A1 * B1
```

Order: A1, B1, C1

## Lexicographically Smallest Ordering

To get the lexicographically smallest topological order, use a min-heap instead of a queue:

```python
import heapq

def lex_smallest_topological(graph, vertices):
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    heap = [v for v in vertices if in_degree[v] == 0]
    heapq.heapify(heap)
    result = []

    while heap:
        u = heapq.heappop(heap)
        result.append(u)

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                heapq.heappush(heap, v)

    return result
```

## Counting Topological Orderings

The number of valid topological orderings can be computed using dynamic programming on subsets, but this is exponential in general.

For special graphs:
- **Chain** (A→B→C→...): 1 ordering
- **Independent vertices**: n! orderings
- **Binary tree**: Catalan-related count

## All Topological Orderings

Generate all valid orderings using backtracking:

```python
def all_topological_sorts(graph, vertices):
    in_degree = {v: 0 for v in vertices}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    results = []

    def backtrack(path, remaining):
        if not remaining:
            results.append(path[:])
            return

        for v in remaining:
            if in_degree[v] == 0:
                # Choose v
                for neighbor in graph.get(v, []):
                    in_degree[neighbor] -= 1
                path.append(v)

                backtrack(path, remaining - {v})

                # Unchoose v
                path.pop()
                for neighbor in graph.get(v, []):
                    in_degree[neighbor] += 1

    backtrack([], set(vertices))
    return results
```

## Relationship to Other Concepts

**Longest path in DAG**: Process in topological order, computing longest path to each vertex.

**Shortest path in DAG**: O(V+E) algorithm processes vertices topologically.

**Dynamic programming on DAGs**: Topological order ensures subproblems are solved before dependent problems.

**Critical path**: In project scheduling, the longest path determines minimum project duration.
