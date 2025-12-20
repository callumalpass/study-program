# Maximum Flow: Ford-Fulkerson and Edmonds-Karp

## Introduction

Network flow problems are among the most versatile and practically important optimization problems in computer science. The maximum flow problem asks: given a network of pipes with varying capacities, what is the maximum rate at which material can flow from a source to a sink?

This seemingly simple question connects to a remarkable variety of applications—transportation logistics, communication networks, bipartite matching, project selection, and image segmentation. The max-flow min-cut theorem, one of the deepest results in combinatorial optimization, establishes a beautiful duality between flows and cuts.

The algorithms we study—Ford-Fulkerson and Edmonds-Karp—introduced fundamental techniques that remain central to network optimization today.

## Flow Network Definition

A **flow network** is a directed graph $G = (V, E)$ with:

**Source and sink**: Distinguished vertices $s$ (source) and $t$ (sink).

**Capacities**: A function $c: E \to \mathbb{R}_{\geq 0}$ assigning non-negative capacity to each edge.

**Convention**: If $(u, v) \notin E$, then $c(u, v) = 0$.

A **flow** in $G$ is a function $f: V \times V \to \mathbb{R}$ satisfying:

**Capacity constraint**: $0 \leq f(u, v) \leq c(u, v)$ for all $u, v \in V$

**Flow conservation**: For all $u \in V \setminus \{s, t\}$:
$$\sum_{v \in V} f(v, u) = \sum_{v \in V} f(u, v)$$

The **value of a flow** is:
$$|f| = \sum_{v \in V} f(s, v) - \sum_{v \in V} f(v, s)$$

This represents the net flow leaving the source, which equals the net flow entering the sink.

## Residual Network

The **residual network** $G_f$ captures remaining capacity after flow $f$ is established.

**Residual capacity**:
$$c_f(u, v) = \begin{cases}
c(u, v) - f(u, v) & \text{if } (u, v) \in E \\
f(v, u) & \text{if } (v, u) \in E \\
0 & \text{otherwise}
\end{cases}$$

The first case represents unused forward capacity. The second case represents the ability to "cancel" existing flow by sending flow in the opposite direction.

**Residual edges**: $E_f = \{(u, v) : c_f(u, v) > 0\}$

An **augmenting path** is a simple path from $s$ to $t$ in $G_f$ using only residual edges.

## Ford-Fulkerson Method

The Ford-Fulkerson method repeatedly finds augmenting paths and pushes flow along them.

```typescript
function fordFulkerson(G: FlowNetwork, s: number, t: number): number {
    // Initialize flow to zero
    const flow: number[][] = G.vertices.map(() =>
        G.vertices.map(() => 0)
    );

    let maxFlow = 0;

    // While there exists an augmenting path
    while (true) {
        // Find path from s to t in residual network
        const { path, bottleneck } = findAugmentingPath(G, flow, s, t);

        if (path === null) break;

        // Augment flow along path
        for (let i = 0; i < path.length - 1; i++) {
            const u = path[i];
            const v = path[i + 1];

            if (G.hasEdge(u, v)) {
                flow[u][v] += bottleneck;
            } else {
                flow[v][u] -= bottleneck;  // Cancel flow
            }
        }

        maxFlow += bottleneck;
    }

    return maxFlow;
}

function findAugmentingPath(
    G: FlowNetwork,
    flow: number[][],
    s: number,
    t: number
): { path: number[] | null; bottleneck: number } {
    // BFS to find path with minimum edges (Edmonds-Karp)
    const parent: number[] = new Array(G.n).fill(-1);
    const visited: boolean[] = new Array(G.n).fill(false);
    const queue: number[] = [s];
    visited[s] = true;

    while (queue.length > 0) {
        const u = queue.shift()!;

        for (const v of G.allVertices()) {
            const residual = G.capacity(u, v) - flow[u][v] + flow[v][u];

            if (!visited[v] && residual > 0) {
                visited[v] = true;
                parent[v] = u;
                queue.push(v);
            }
        }
    }

    if (!visited[t]) return { path: null, bottleneck: 0 };

    // Reconstruct path and find bottleneck
    const path: number[] = [];
    let v = t;
    let bottleneck = Infinity;

    while (v !== s) {
        path.unshift(v);
        const u = parent[v];
        const residual = G.capacity(u, v) - flow[u][v] + flow[v][u];
        bottleneck = Math.min(bottleneck, residual);
        v = u;
    }
    path.unshift(s);

    return { path, bottleneck };
}
```

**Correctness**: When no augmenting path exists, the flow is maximum. This follows from the max-flow min-cut theorem.

**Time complexity**: $O(E \cdot |f^*|)$ where $|f^*|$ is the maximum flow value. This is pseudo-polynomial—it depends on the magnitude of capacities, not just input size.

**Potential issue**: With irrational capacities, Ford-Fulkerson may not terminate. With poor path choices, it can be extremely slow even with integer capacities.

## Edmonds-Karp Algorithm

Edmonds-Karp improves Ford-Fulkerson by always choosing the shortest augmenting path (fewest edges) using BFS.

**Theorem**: Edmonds-Karp runs in $O(VE^2)$ time.

**Proof sketch**:
1. For any vertex $v$, $\text{dist}_{G_f}(s, v)$ never decreases during the algorithm
2. An edge $(u, v)$ can become saturated at most $O(V)$ times
3. Each iteration saturates at least one edge
4. Total iterations: $O(VE)$
5. Each BFS takes $O(E)$ time

**Key insight**: Using shortest paths ensures systematic progress toward termination.

## Max-Flow Min-Cut Theorem

An **$s$-$t$ cut** is a partition $(S, T)$ of $V$ with $s \in S$ and $t \in T$.

**Cut capacity**: $c(S, T) = \sum_{u \in S, v \in T} c(u, v)$

**Flow across cut**: $f(S, T) = \sum_{u \in S, v \in T} f(u, v) - \sum_{u \in S, v \in T} f(v, u)$

**Lemma**: For any flow $f$ and cut $(S, T)$: $|f| = f(S, T) \leq c(S, T)$

**Max-Flow Min-Cut Theorem**: The maximum value of any flow equals the minimum capacity of any cut.
$$\max_f |f| = \min_{(S,T)} c(S, T)$$

**Proof**:
- $\leq$: Any flow is bounded by any cut capacity (lemma)
- $\geq$: When Ford-Fulkerson terminates, let $S$ = vertices reachable from $s$ in $G_f$. This cut has capacity exactly equal to the flow value.

## Applications

**Transportation networks**: Maximize goods flow from factories to distribution centers.

**Communication networks**: Maximum data rate between nodes, considering link capacities.

**Bipartite matching**: Maximum matching reduces to max flow (covered in detail separately).

**Project selection**: Given projects with profits and dependencies, select subset maximizing profit.

**Baseball elimination**: Determine if a team can still win the league.

**Image segmentation**: Partition image into foreground/background minimizing cut cost.

## Comparison of Algorithms

| Algorithm | Time Complexity | When to Use |
|-----------|-----------------|-------------|
| Ford-Fulkerson (DFS) | $O(E \cdot |f^*|)$ | Small integer capacities |
| Edmonds-Karp (BFS) | $O(VE^2)$ | General purpose |
| Dinic's | $O(V^2 E)$ | Unit capacity networks |
| Push-Relabel | $O(V^2 E)$ or $O(V^3)$ | Dense graphs |

## Key Takeaways

- Maximum flow finds the maximum rate of transmission through a capacitated network
- Ford-Fulkerson iteratively augments flow along paths in the residual network
- Edmonds-Karp uses BFS for $O(VE^2)$ polynomial time complexity
- The max-flow min-cut theorem establishes duality between flows and cuts
- Applications span transportation, networking, matching, and optimization
- The residual network captures both unused capacity and cancellation potential
