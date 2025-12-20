# Multi-Commodity Flow: Concurrent Flow and Approximation

## Introduction

Multi-commodity flow extends network flow to scenarios where multiple distinct commodities share network capacity. Unlike single-commodity flow, where one type of material flows from source to sink, multi-commodity flow models situations where different goods, data streams, or requests must be routed simultaneously through shared infrastructure.

This extension significantly increases problem complexity—while single-commodity max-flow has polynomial-time combinatorial algorithms, multi-commodity flow generally requires linear programming. The problem is fundamental to telecommunications, transportation logistics, and VLSI design.

## Problem Definition

**Network**: Directed graph $G = (V, E)$ with edge capacities $c(e)$ for each $e \in E$.

**Commodities**: $k$ commodities, each with:
- Source $s_i \in V$
- Sink $t_i \in V$
- Demand $d_i$ (amount to route)

**Flow**: For each commodity $i$, a flow $f_i: E \to \mathbb{R}_{\geq 0}$ satisfying:
- Conservation at intermediate vertices
- Total flow from $s_i$ to $t_i$ equals $d_i$

**Capacity constraint**: Total flow on each edge respects capacity:
$$\sum_{i=1}^{k} f_i(e) \leq c(e) \quad \text{for all } e \in E$$

**Goal**: Find feasible multi-commodity flow, or determine that demands cannot be satisfied.

## Variants

**Maximum concurrent flow**: Find maximum $\lambda$ such that $\lambda \cdot d_i$ can be routed for each commodity.

**Maximum multicommodity flow**: Maximize total flow $\sum_i |f_i|$ (each commodity can send any amount).

**Minimum cost multicommodity flow**: Route demands while minimizing total cost.

**Fractional vs integral**: Fractional flows can split across paths; integral flows must use single path per unit.

## Linear Programming Formulation

Multi-commodity flow formulates naturally as an LP.

**Variables**: $f_i(u, v)$ = flow of commodity $i$ on edge $(u, v)$

**Constraints**:
```
Capacity:     ∑_i f_i(u,v) ≤ c(u,v)     for all (u,v) ∈ E
Conservation: ∑_v f_i(u,v) - ∑_v f_i(v,u) = 0   for u ≠ s_i, t_i
Demand:       ∑_v f_i(s_i,v) = d_i       for all commodities i
Non-negative: f_i(u,v) ≥ 0              for all i, (u,v)
```

**Objective** (for max concurrent flow): Maximize $\lambda$ subject to routing $\lambda \cdot d_i$

```typescript
function multiCommodityFlowLP(
    G: Graph,
    commodities: Array<{source: number, sink: number, demand: number}>
): number[][] | null {
    // Build LP
    const lp = new LinearProgram();

    // Variables: f[i][u][v] for each commodity and edge
    const f: number[][][] = [];
    for (let i = 0; i < commodities.length; i++) {
        f[i] = [];
        for (let u = 0; u < G.n; u++) {
            f[i][u] = [];
            for (let v = 0; v < G.n; v++) {
                if (G.hasEdge(u, v)) {
                    f[i][u][v] = lp.addVariable(`f_${i}_${u}_${v}`, 0, Infinity);
                }
            }
        }
    }

    // Capacity constraints
    for (const [u, v] of G.edges) {
        const totalFlow = commodities.map((_, i) => f[i][u][v]);
        lp.addConstraint(sum(totalFlow), '<=', G.capacity(u, v));
    }

    // Conservation constraints
    for (let i = 0; i < commodities.length; i++) {
        const { source, sink } = commodities[i];
        for (let u = 0; u < G.n; u++) {
            if (u !== source && u !== sink) {
                const flowIn = G.inEdges(u).map(([v, _]) => f[i][v][u]);
                const flowOut = G.outEdges(u).map(([_, v]) => f[i][u][v]);
                lp.addConstraint(sum(flowIn), '=', sum(flowOut));
            }
        }
    }

    // Demand constraints
    for (let i = 0; i < commodities.length; i++) {
        const { source, demand } = commodities[i];
        const outFlow = G.outEdges(source).map(([_, v]) => f[i][source][v]);
        lp.addConstraint(sum(outFlow), '=', demand);
    }

    return lp.solve();
}
```

**Time complexity**: Polynomial via interior-point methods, but slower than combinatorial max-flow algorithms.

## Approximation Algorithms

For large networks, LP may be too slow. Approximation algorithms provide faster solutions.

**Garg-Könemann algorithm** (2007): $(1+\epsilon)$-approximation for max concurrent flow in $O(\epsilon^{-2} k m \log m)$ time.

**Idea**: Maintain edge "prices" that increase when edges become congested. Route each commodity along cheapest path, updating prices.

```typescript
function approximateMaxConcurrentFlow(
    G: Graph,
    commodities: Commodity[],
    epsilon: number
): number {
    const delta = Math.pow(1 + epsilon, -1/epsilon) / G.m;
    const lengths: Map<Edge, number> = new Map();

    // Initialize lengths
    for (const e of G.edges) {
        lengths.set(e, delta / G.capacity(e));
    }

    let lambda = 0;

    while (minLength(lengths, G, commodities) < 1) {
        // Find commodity with shortest path
        let bestCommodity = -1;
        let shortestPath: Edge[] = [];
        let shortestLength = Infinity;

        for (let i = 0; i < commodities.length; i++) {
            const { path, length } = shortestPath(G, lengths, commodities[i]);
            if (length < shortestLength) {
                shortestLength = length;
                shortestPath = path;
                bestCommodity = i;
            }
        }

        // Route flow and update lengths
        const bottleneck = minCapacity(shortestPath, G);
        for (const e of shortestPath) {
            const newLength = lengths.get(e)! * (1 + epsilon * bottleneck / G.capacity(e));
            lengths.set(e, newLength);
        }

        lambda += bottleneck / commodities[bestCommodity].demand;
    }

    return lambda / Math.log(1/delta);
}
```

## Integrality Gap

Unlike single-commodity flow, multi-commodity flow has an integrality gap.

**Definition**: Ratio between optimal fractional and optimal integral solutions.

**Result**: Integrality gap can be $\Omega(\log k)$ for $k$ commodities.

**Consequence**: Rounding fractional solutions to integral ones loses significant quality.

**NP-hardness**: Integral multi-commodity flow is NP-complete (even for two commodities on directed graphs).

## Applications

**Telecommunications**: Route multiple data streams (voice, video, internet) through shared network infrastructure.

**Transportation**: Move different goods from various origins to destinations using shared roads/rails.

**VLSI design**: Route wires for different signals through chip without crossing.

**Internet routing**: Allocate bandwidth among competing traffic flows.

**Supply chain**: Distribute multiple product types from factories to warehouses to stores.

## Max-Flow Min-Cut Gap

Unlike single-commodity flow, max-flow ≠ min-cut for multi-commodity.

**Sparsest cut**: Minimum ratio $c(S, V \setminus S) / D(S, V \setminus S)$ where $D$ is demand crossing cut.

**Theorem**: Max concurrent flow $\geq$ sparsest cut / $O(\log k)$.

This gap is tight: some networks have max flow $\Theta(\log k)$ times smaller than sparsest cut.

## Key Takeaways

- Multi-commodity flow routes multiple commodities through shared capacity
- Requires linear programming (no combinatorial polynomial algorithm known)
- Integrality gap means fractional solutions don't round well
- Approximation algorithms achieve $(1+\epsilon)$-factor efficiently
- Max-flow min-cut theorem does not hold (gap up to $O(\log k)$)
- Applications span networking, transportation, and circuit design
