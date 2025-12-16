# Network Flow

Network flow problems model transportation, communication, and resource allocation. The max-flow min-cut theorem connects flows to cuts, enabling efficient algorithms.

## Flow Networks

### Definition

A **flow network** is a directed graph G = (V, E) with:
- **Source s:** node with only outgoing edges
- **Sink t:** node with only incoming edges
- **Capacity c(u,v):** maximum flow allowed on edge (u,v)

### Flow

A **flow** f assigns values to edges satisfying:
- **Capacity constraint:** 0 ≤ f(u,v) ≤ c(u,v)
- **Conservation:** For all v ≠ s,t: ∑f(u,v) = ∑f(v,w)
  (flow in = flow out)

**Value of flow:** |f| = net flow out of source = net flow into sink

### Max-Flow Problem

Find a flow with maximum value.

## Cuts

### Definition

An **(s,t)-cut** partitions V into (S, T) where s ∈ S and t ∈ T.

**Capacity of cut:** c(S,T) = ∑c(u,v) for all u ∈ S, v ∈ T

### Min-Cut Problem

Find a cut with minimum capacity.

## Max-Flow Min-Cut Theorem

**Theorem:** The maximum flow value equals the minimum cut capacity.

**Proof outline:**
1. Flow ≤ any cut capacity (flow must cross every cut)
2. When no augmenting paths exist, reachable vertices from s form a cut with capacity = current flow

## Ford-Fulkerson Method

**Idea:** Repeatedly find augmenting paths and push flow.

### Residual Graph

Given flow f, the **residual graph** G_f has:
- Forward edge (u,v) with capacity c(u,v) - f(u,v) if positive
- Backward edge (v,u) with capacity f(u,v) if positive

### Augmenting Path

A path from s to t in residual graph. We can push additional flow along it.

### Algorithm

```python
def ford_fulkerson(graph, source, sink):
    """
    Ford-Fulkerson max flow.
    graph: dict mapping (u,v) to capacity
    Returns: maximum flow value
    """
    def bfs_path(residual, s, t):
        """Find augmenting path using BFS (Edmonds-Karp)."""
        from collections import deque
        visited = {s: None}
        queue = deque([s])

        while queue:
            u = queue.popleft()
            if u == t:
                # Reconstruct path
                path = []
                while u is not None:
                    path.append(u)
                    u = visited[u]
                return path[::-1]

            for v, cap in residual.get(u, {}).items():
                if cap > 0 and v not in visited:
                    visited[v] = u
                    queue.append(v)
        return None

    # Build residual graph
    residual = {}
    for (u, v), cap in graph.items():
        if u not in residual:
            residual[u] = {}
        residual[u][v] = cap
        if v not in residual:
            residual[v] = {}
        if u not in residual[v]:
            residual[v][u] = 0

    max_flow = 0

    while True:
        path = bfs_path(residual, source, sink)
        if not path:
            break

        # Find bottleneck
        flow = float('inf')
        for i in range(len(path) - 1):
            u, v = path[i], path[i+1]
            flow = min(flow, residual[u][v])

        # Update residual graph
        for i in range(len(path) - 1):
            u, v = path[i], path[i+1]
            residual[u][v] -= flow
            residual[v][u] += flow

        max_flow += flow

    return max_flow
```

### Complexity

- **Ford-Fulkerson (DFS):** O(E × max_flow) - can be exponential
- **Edmonds-Karp (BFS):** O(VE²) - polynomial

## Applications

### Bipartite Matching

**Reduction to max-flow:**
1. Add source s connected to all left vertices (capacity 1)
2. Add sink t connected from all right vertices (capacity 1)
3. Original edges have capacity 1
4. Max flow = max matching size

### Edge-Disjoint Paths

**Problem:** Find maximum number of edge-disjoint s-t paths.

**Solution:** Set all capacities to 1. Max flow = max edge-disjoint paths.

### Vertex-Disjoint Paths

**Problem:** Find maximum vertex-disjoint s-t paths.

**Solution:** Split each vertex v into v_in and v_out with edge of capacity 1. Replace edges accordingly.

### Project Selection

**Problem:** Select projects to maximize profit, respecting dependencies.

**Reduction:**
- Source connects to positive-profit projects
- Negative-profit projects connect to sink
- Dependencies become infinite-capacity edges
- Min cut gives optimal selection

## Minimum Cut

### Finding Min-Cut from Max-Flow

After Ford-Fulkerson terminates:
- S = vertices reachable from s in residual graph
- T = V - S
- (S, T) is a minimum cut

### All Minimum Cuts

**Theorem:** The minimum cuts form a lattice under set inclusion.

## Special Networks

### Unit Capacity Networks

All edges have capacity 1.
- Max flow ≤ min(out-degree(s), in-degree(t))
- Can find in O(E√V) using blocking flows

### DAG Networks

For directed acyclic graphs:
- Process in topological order
- Can find max flow in O(VE)

## Advanced Algorithms

### Dinic's Algorithm

Uses blocking flows and level graphs.
- Complexity: O(V²E)
- For unit capacity: O(E√V)

### Push-Relabel

Maintains preflow (may have excess at vertices).
- Push excess toward sink
- Relabel vertices to maintain valid labeling
- Complexity: O(V²E) or O(V³)

### Highest-Label Push-Relabel

O(V²√E) with gap heuristic.

## Integer Flows

**Theorem:** If all capacities are integers, there exists a maximum flow where all edge flows are integers.

**Corollary:** For unit capacities, max flow equals number of edge-disjoint paths.

## Flow Decomposition

Any flow can be decomposed into:
- At most E paths from s to t
- Possibly some cycles

Each path/cycle carries positive flow.

## Practice Problems

1. **Find** max flow in network with edges: s→a(3), s→b(2), a→b(1), a→t(2), b→t(3).

2. **Prove:** If all capacities are 1, max flow = max number of edge-disjoint s-t paths.

3. **Design:** Algorithm to find if graph has unique max flow.

4. **Apply:** Use max-flow to solve job assignment problem.

## Summary

Network flow concepts:
- Flow networks with source, sink, capacities
- Max-flow min-cut theorem: fundamental duality
- Ford-Fulkerson: augmenting path method
- Edmonds-Karp: O(VE²) using BFS
- Applications: matching, paths, project selection
