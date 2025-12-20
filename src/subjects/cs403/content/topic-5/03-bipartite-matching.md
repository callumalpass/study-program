# Bipartite Matching via Maximum Flow

## Introduction

The maximum bipartite matching problem asks for the largest set of non-conflicting pairings between two disjoint sets. This fundamental problem appears in job assignment, course scheduling, network design, and countless other applications.

Remarkably, bipartite matching reduces elegantly to maximum flow, demonstrating the power and generality of network flow techniques. This reduction also reveals structural properties through the König-Egerváry theorem, connecting matching size to vertex covers.

Understanding this connection illuminates why flow algorithms are so widely applicable in combinatorial optimization.

## Problem Definition

**Bipartite graph**: Graph $G = (L \cup R, E)$ where $L$ and $R$ are disjoint vertex sets, and every edge connects a vertex in $L$ to a vertex in $R$.

**Matching**: A set of edges $M \subseteq E$ such that no two edges share a vertex. Each vertex is "matched" to at most one partner.

**Maximum matching**: Matching $M$ with maximum cardinality $|M|$.

**Perfect matching**: Matching that covers all vertices (exists only if $|L| = |R|$).

**Example**: Assigning $n$ workers to $n$ jobs, where each worker can do certain jobs.

```
Workers:    w1  w2  w3
            |\ /|  |
            | X |  |
            |/ \|  |
Jobs:       j1  j2  j3

Matching: {(w1,j2), (w2,j1), (w3,j3)}
```

## Reduction to Maximum Flow

Transform bipartite matching to max flow:

**Construction**:
1. Add source $s$ connected to all vertices in $L$
2. Add sink $t$ connected from all vertices in $R$
3. Direct all edges from $L$ to $R$
4. Set all edge capacities to 1

```typescript
function bipartiteToFlow(L: number[], R: number[], edges: [number, number][]): FlowNetwork {
    const n = L.length + R.length + 2;
    const s = n - 2;  // Source
    const t = n - 1;  // Sink

    const network = new FlowNetwork(n);

    // Source to L
    for (const l of L) {
        network.addEdge(s, l, 1);
    }

    // L to R (original edges)
    for (const [l, r] of edges) {
        network.addEdge(l, r, 1);
    }

    // R to sink
    for (const r of R) {
        network.addEdge(r, t, 1);
    }

    return network;
}
```

**Theorem**: Maximum flow value equals maximum matching size.

**Proof**:
- Any matching $M$ induces a valid flow of value $|M|$
- Any integral flow induces a matching of the same size (flow 1 on edge means include in matching)
- Max flow with unit capacities is integral (by augmenting path argument)

## Extracting the Matching

```typescript
function extractMatching(
    G: FlowNetwork,
    flow: number[][],
    L: number[],
    R: number[]
): [number, number][] {
    const matching: [number, number][] = [];

    for (const l of L) {
        for (const r of R) {
            if (flow[l][r] === 1) {
                matching.push([l, r]);
            }
        }
    }

    return matching;
}
```

**Time complexity**: $O(VE)$ using Edmonds-Karp on the flow network.

**Specialized algorithm**: Hopcroft-Karp achieves $O(E\sqrt{V})$ for bipartite matching specifically.

## Hall's Theorem

**Hall's Marriage Theorem**: Bipartite graph $G = (L \cup R, E)$ has a matching saturating $L$ if and only if for every subset $S \subseteq L$:
$$|N(S)| \geq |S|$$

where $N(S)$ is the set of neighbors of $S$ in $R$.

**Connection to max-flow min-cut**: The Hall condition is equivalent to the minimum cut having capacity $|L|$.

**Constructive proof via max flow**: If Hall's condition fails for some $S$, then $\{s\} \cup S \cup N(S) \cup (R \setminus N(S))$ defines a cut of capacity $< |L|$.

## König-Egerváry Theorem

**Vertex cover**: Set $C \subseteq V$ such that every edge has at least one endpoint in $C$.

**Theorem** (König, 1931): In a bipartite graph, maximum matching size equals minimum vertex cover size.

**Proof via LP duality**: The maximum matching LP and minimum vertex cover LP are duals. For bipartite graphs, the LP solutions are integral.

**Algorithmic consequence**: Find max matching, then construct min vertex cover from residual graph.

```typescript
function findMinVertexCover(
    L: number[], R: number[],
    matching: [number, number][],
    flow: number[][],
    G: FlowNetwork
): Set<number> {
    // Vertices reachable from unmatched L vertices via alternating paths
    const unmatchedL = new Set(L);
    for (const [l, r] of matching) {
        unmatchedL.delete(l);
    }

    const reachable = new Set<number>();
    const queue = [...unmatchedL];
    for (const u of queue) reachable.add(u);

    while (queue.length > 0) {
        const u = queue.shift()!;

        for (const v of G.neighbors(u)) {
            if (!reachable.has(v)) {
                // Alternating: unmatched edges L→R, matched edges R→L
                if (L.includes(u) && flow[u][v] === 0) {
                    reachable.add(v);
                    queue.push(v);
                } else if (R.includes(u) && flow[v][u] === 1) {
                    reachable.add(v);
                    queue.push(v);
                }
            }
        }
    }

    // Vertex cover: L \ reachable ∪ R ∩ reachable
    const cover = new Set<number>();
    for (const l of L) {
        if (!reachable.has(l)) cover.add(l);
    }
    for (const r of R) {
        if (reachable.has(r)) cover.add(r);
    }

    return cover;
}
```

## Weighted Bipartite Matching

When edges have weights, find matching maximizing total weight.

**Hungarian algorithm**: $O(V^3)$ for maximum weight matching.

**Reduction to min-cost flow**: Set all capacities to 1, costs to negative weights, find min-cost max flow.

```typescript
function weightedMatchingToMinCostFlow(
    L: number[], R: number[],
    edges: [number, number, number][]  // [l, r, weight]
): MinCostFlowNetwork {
    // Similar construction but with edge costs
    const network = new MinCostFlowNetwork(L.length + R.length + 2);

    for (const l of L) {
        network.addEdge(s, l, 1, 0);  // capacity 1, cost 0
    }

    for (const [l, r, weight] of edges) {
        network.addEdge(l, r, 1, -weight);  // cost is negative weight
    }

    for (const r of R) {
        network.addEdge(r, t, 1, 0);
    }

    return network;
}
```

## Applications

**Job assignment**: Match workers to jobs based on qualifications.

**Course scheduling**: Match students to courses respecting preferences and capacity.

**Stable marriage**: Match applicants to positions (requires additional stability constraints).

**Network design**: Match servers to clients minimizing latency.

**Kidney exchange**: Match donor-recipient pairs for transplant chains.

**Crew scheduling**: Assign crews to flights respecting rest requirements.

**Resource allocation**: Assign tasks to processors balancing load.

## Hopcroft-Karp Algorithm

Specialized algorithm achieving $O(E\sqrt{V})$ for unweighted bipartite matching.

**Idea**: Find maximal set of vertex-disjoint shortest augmenting paths in each phase.

**Key insight**: After $\sqrt{V}$ phases, remaining augmenting paths have length $> \sqrt{V}$, and at most $\sqrt{V}$ such paths exist.

**Practical**: Faster than general max flow for sparse bipartite graphs.

## Key Takeaways

- Maximum bipartite matching reduces to maximum flow with unit capacities
- Hall's theorem characterizes when perfect matchings exist
- König-Egerváry theorem: max matching = min vertex cover in bipartite graphs
- Weighted matching reduces to min-cost max flow
- Hopcroft-Karp achieves $O(E\sqrt{V})$ for unweighted matching
- Applications span job assignment, scheduling, and resource allocation
