---
id: cs201-t7-scc
title: "Strongly Connected Components"
order: 5
---

# Strongly Connected Components

Strongly connected components (SCCs) reveal the fundamental structure of directed graphs. Within each SCC, every vertex can reach every other vertex—they form tightly connected clusters of mutual reachability. Between SCCs, edges go only one direction, creating a DAG structure that simplifies analysis. This decomposition is a powerful tool for understanding complex directed graphs.

SCC algorithms discover this hidden structure in linear time, transforming an arbitrary directed graph into a DAG of components. Many problems that seem intractable on general directed graphs become solvable once we recognize the SCC structure: reachability queries, 2-SAT satisfiability, and analysis of web graphs and social networks.

The two classic SCC algorithms—Kosaraju's and Tarjan's—represent different algorithmic philosophies. Kosaraju's runs two DFS passes (forward and reverse), while Tarjan's achieves the same result in a single pass using low-link values. Both are O(V + E), but understanding both provides insight into how the same problem can be solved through different algorithmic lenses.

## Definitions

**Strongly Connected**: Vertices u and v are strongly connected if there's a path from u to v AND from v to u. This is an equivalence relation: reflexive, symmetric, and transitive.

**Strongly Connected Component (SCC)**: A maximal set of vertices where every pair is strongly connected. "Maximal" means we can't add any more vertices while maintaining strong connectivity.

**Properties**:
- Every vertex belongs to exactly one SCC (the equivalence relation partitions vertices)
- SCCs partition the vertex set (together they cover all vertices, with no overlap)
- Condensation (DAG of SCCs) is acyclic (if two SCCs had a cycle between them, they'd be one SCC)

## Why SCCs Matter

### Structure Discovery

Large directed graphs often have meaningful community structure revealed by SCCs.

### Problem Reduction

Many problems on general directed graphs reduce to DAGs via SCC decomposition:
1. Find SCCs
2. Solve on condensation DAG
3. Map solution back

### 2-SAT

Satisfiability of CNF with 2 literals per clause solvable via SCC analysis.

## Kosaraju's Algorithm

Two DFS passes: original and reversed graph.

```python
def kosaraju(graph):
    n = len(graph)

    # Build reverse graph
    reverse = [[] for _ in range(n)]
    for u in range(n):
        for v in graph[u]:
            reverse[v].append(u)

    # First DFS: record finish order
    visited = [False] * n
    finish_order = []

    def dfs1(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs1(v)
        finish_order.append(u)

    for u in range(n):
        if not visited[u]:
            dfs1(u)

    # Second DFS: find SCCs in reverse finish order
    visited = [False] * n
    sccs = []

    def dfs2(u, component):
        visited[u] = True
        component.append(u)
        for v in reverse[u]:
            if not visited[v]:
                dfs2(v, component)

    for u in reversed(finish_order):
        if not visited[u]:
            component = []
            dfs2(u, component)
            sccs.append(component)

    return sccs
```

### Why It Works

**Key insight**: Finish order of first DFS gives a topological order of SCCs.

Processing in reverse finish order on reversed graph:
- Start from SCC with no outgoing edges (in condensation)
- Reversed graph edges stay within SCC
- Can't escape to other SCCs

**Time**: O(V + E)

## Tarjan's Algorithm

Single DFS with low-link values.

```python
def tarjan(graph):
    n = len(graph)
    index_counter = [0]
    stack = []
    lowlinks = [0] * n
    index = [0] * n
    on_stack = [False] * n
    index_initialized = [False] * n
    sccs = []

    def strongconnect(v):
        index[v] = index_counter[0]
        lowlinks[v] = index_counter[0]
        index_counter[0] += 1
        index_initialized[v] = True
        stack.append(v)
        on_stack[v] = True

        for w in graph[v]:
            if not index_initialized[w]:
                strongconnect(w)
                lowlinks[v] = min(lowlinks[v], lowlinks[w])
            elif on_stack[w]:
                lowlinks[v] = min(lowlinks[v], index[w])

        # Root of SCC
        if lowlinks[v] == index[v]:
            component = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                component.append(w)
                if w == v:
                    break
            sccs.append(component)

    for v in range(n):
        if not index_initialized[v]:
            strongconnect(v)

    return sccs
```

### Key Concepts

**Index**: Discovery time in DFS

**Low-link**: Smallest index reachable from subtree (including back edges)

**SCC root**: Vertex where lowlink[v] == index[v]

**Time**: O(V + E)—single pass!

## Comparison

| Aspect | Kosaraju | Tarjan |
|--------|----------|--------|
| DFS passes | 2 | 1 |
| Extra space | O(V + E) for reverse graph | O(V) for stack |
| Simpler to understand | Yes | No |
| In-place output order | Reverse topological | Reverse topological |

## Condensation Graph

Create DAG of SCCs:

```python
def condensation(graph, sccs):
    n = len(graph)

    # Map vertex to its SCC index
    scc_id = [0] * n
    for i, scc in enumerate(sccs):
        for v in scc:
            scc_id[v] = i

    # Build condensation DAG
    num_sccs = len(sccs)
    dag = [set() for _ in range(num_sccs)]

    for u in range(n):
        for v in graph[u]:
            if scc_id[u] != scc_id[v]:
                dag[scc_id[u]].add(scc_id[v])

    return [list(neighbors) for neighbors in dag]
```

## Applications

### Reachability Queries

Precompute SCCs for O(1) same-SCC queries:

```python
def can_reach(u, v, scc_id, condensation_reachable):
    if scc_id[u] == scc_id[v]:
        return True
    return condensation_reachable[scc_id[u]][scc_id[v]]
```

### 2-SAT Problem

For boolean formula (a ∨ b) ∧ (c ∨ ¬d) ∧ ...

**Implication graph**: (a ∨ b) means ¬a → b and ¬b → a

```python
def solve_2sat(n, clauses):
    """
    n = number of variables (0 to n-1)
    clauses = [(a, b), ...] where negative means NOT
    """
    # Build implication graph (2n vertices: x and ¬x)
    graph = [[] for _ in range(2 * n)]

    def var(x):
        return 2 * abs(x) + (0 if x > 0 else 1)

    def neg(x):
        return x ^ 1

    for a, b in clauses:
        # ¬a → b and ¬b → a
        graph[neg(var(a))].append(var(b))
        graph[neg(var(b))].append(var(a))

    # Find SCCs
    sccs = tarjan(graph)

    # Check satisfiability
    scc_id = [0] * (2 * n)
    for i, scc in enumerate(sccs):
        for v in scc:
            scc_id[v] = i

    # Unsatisfiable if x and ¬x in same SCC
    for x in range(n):
        if scc_id[2 * x] == scc_id[2 * x + 1]:
            return None  # Unsatisfiable

    # Assign values (later SCC = True)
    assignment = [False] * n
    for x in range(n):
        assignment[x] = scc_id[2 * x] > scc_id[2 * x + 1]

    return assignment
```

**Time**: O(V + E) = O(n + m) for n variables, m clauses

### Minimum Feedback Arc Set (Approximation)

Remove minimum edges to make graph acyclic:

1. Find SCCs
2. Within each SCC, find back edges
3. Remove back edges

Not optimal, but provides approximation.

## Related Concepts

### Weakly Connected Components

For undirected version of graph:

```python
def weakly_connected(graph):
    n = len(graph)
    undirected = [set() for _ in range(n)]
    for u in range(n):
        for v in graph[u]:
            undirected[u].add(v)
            undirected[v].add(u)

    # Standard connected components
    visited = [False] * n
    components = []

    def dfs(u, component):
        visited[u] = True
        component.append(u)
        for v in undirected[u]:
            if not visited[v]:
                dfs(v, component)

    for u in range(n):
        if not visited[u]:
            component = []
            dfs(u, component)
            components.append(component)

    return components
```

### Bridges and Articulation Points

Find edges/vertices whose removal disconnects graph. Related low-link technique.

## Summary

| Operation | Time | Algorithm |
|-----------|------|-----------|
| Find SCCs | O(V + E) | Kosaraju or Tarjan |
| Build condensation | O(V + E) | Post-process SCCs |
| 2-SAT | O(V + E) | SCC + topological order |
| Reachability preprocess | O(V + E + V²) | Transitive closure of DAG |

SCC decomposition is a fundamental tool for analyzing directed graphs, revealing hidden structure and enabling efficient algorithms for problems that seem intractable on general graphs.
