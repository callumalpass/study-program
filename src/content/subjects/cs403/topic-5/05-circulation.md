# Circulation Problems: Lower Bounds and Feasibility

## Introduction

Circulation problems generalize network flow by adding lower bounds on edge flows and removing the source-sink structure. Instead of flow traveling from a source to a sink, flow circulates through the network, satisfying constraints at each vertex.

This generalization is powerful because many practical problems naturally have minimum flow requirements—a pipeline must maintain minimum pressure, a bus route must run minimum service, a communication link must handle minimum traffic. Circulation problems also serve as a unifying framework, as standard max-flow and min-cost flow reduce to circulation.

## Problem Definition

A **circulation network** consists of:
- Directed graph $G = (V, E)$
- Lower bounds $\ell(u, v) \geq 0$ on each edge
- Upper bounds (capacities) $c(u, v) \geq \ell(u, v)$ on each edge
- Demands $d(v)$ at each vertex (positive = demand, negative = supply)

A **circulation** is a function $f: E \to \mathbb{R}$ satisfying:

**Capacity constraints**: $\ell(u, v) \leq f(u, v) \leq c(u, v)$ for all edges

**Flow conservation**: For all vertices $v$:
$$\sum_{u} f(u, v) - \sum_{w} f(v, w) = d(v)$$

**Feasibility**: A circulation exists if and only if total supply equals total demand: $\sum_v d(v) = 0$.

## Reduction to Standard Max Flow

To find a feasible circulation, we reduce to maximum flow.

**Construction**:

1. Create new source $s'$ and sink $t'$

2. For each edge $(u, v)$ with lower bound $\ell(u, v)$:
   - Adjust demands: $d(u) \leftarrow d(u) + \ell(u, v)$, $d(v) \leftarrow d(v) - \ell(u, v)$
   - Set new capacity: $c'(u, v) = c(u, v) - \ell(u, v)$

3. For each vertex $v$:
   - If $d(v) > 0$: add edge $(s', v)$ with capacity $d(v)$
   - If $d(v) < 0$: add edge $(v, t')$ with capacity $-d(v)$

4. Compute max flow from $s'$ to $t'$

5. Feasible circulation exists iff max flow saturates all edges from $s'$

```typescript
function findCirculation(G: CirculationNetwork): number[][] | null {
    const n = G.vertexCount();
    const s = n;      // New source
    const t = n + 1;  // New sink

    // Build max-flow network
    const flowNetwork = new FlowNetwork(n + 2);
    const adjustedDemand = [...G.demands];

    for (const [u, v] of G.edges) {
        const lower = G.lowerBound(u, v);
        const upper = G.capacity(u, v);

        // Adjust demands for lower bounds
        adjustedDemand[u] += lower;
        adjustedDemand[v] -= lower;

        // Add edge with reduced capacity
        if (upper > lower) {
            flowNetwork.addEdge(u, v, upper - lower);
        }
    }

    // Add source/sink edges based on demands
    let totalSupply = 0;
    for (let v = 0; v < n; v++) {
        if (adjustedDemand[v] > 0) {
            flowNetwork.addEdge(s, v, adjustedDemand[v]);
            totalSupply += adjustedDemand[v];
        } else if (adjustedDemand[v] < 0) {
            flowNetwork.addEdge(v, t, -adjustedDemand[v]);
        }
    }

    // Compute max flow
    const { maxFlowValue, flow } = maxFlow(flowNetwork, s, t);

    // Check if all supply is consumed
    if (maxFlowValue < totalSupply) {
        return null;  // No feasible circulation
    }

    // Reconstruct circulation (add back lower bounds)
    const circulation: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    for (const [u, v] of G.edges) {
        circulation[u][v] = G.lowerBound(u, v) + flow[u][v];
    }

    return circulation;
}
```

## Circulation with Costs

When edges have costs, find minimum cost circulation.

**Objective**: Minimize $\sum_{(u,v)} a(u, v) \cdot f(u, v)$

**Algorithm**:
1. Find any feasible circulation (using max-flow reduction)
2. Iteratively improve by canceling negative-cost cycles in residual network

**Optimality**: Circulation is optimal iff residual network has no negative-cost cycles.

## Flow with Lower Bounds

Standard max-flow with lower bounds reduces to circulation.

**Problem**: Find max flow respecting $\ell(u, v) \leq f(u, v) \leq c(u, v)$.

**Reduction**:
1. Add edge $(t, s)$ with capacity $\infty$ and lower bound 0
2. Find max circulation (maximize flow on $(t, s)$ edge)

## Hoffman's Circulation Theorem

**Theorem** (Hoffman, 1960): A feasible circulation exists if and only if for every subset $S \subseteq V$:
$$\sum_{v \in S} d(v) \leq \sum_{u \in S, w \notin S} c(u, w) - \sum_{u \notin S, w \in S} \ell(u, w)$$

**Interpretation**: The total demand within any subset cannot exceed the capacity available to satisfy it from outside, minus the flow that must leave.

## Applications

**Scheduling with constraints**: Jobs require minimum and maximum processing time on machines.

**Transportation with requirements**: Routes must carry minimum traffic (to justify infrastructure) but cannot exceed capacity.

**Network reliability**: Each link must handle minimum traffic for redundancy.

**Production planning**: Factories have minimum production requirements and maximum capacity.

## Key Takeaways

- Circulation generalizes flow with lower bounds and no designated source/sink
- Feasibility reduces to max-flow by adjusting demands for lower bounds
- Min-cost circulation uses negative cycle canceling for optimization
- Hoffman's theorem characterizes when feasible circulations exist
- Applications include scheduling, transportation, and network design
