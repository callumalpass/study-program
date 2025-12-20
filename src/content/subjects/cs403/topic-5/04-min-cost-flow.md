# Minimum Cost Flow: Successive Shortest Paths

## Introduction

Minimum cost flow extends maximum flow by adding costs to edges: not only do we want to move flow from source to sink, but we want to do so as cheaply as possible. This optimization adds a new dimension to network problems, enabling modeling of transportation costs, resource allocation with prices, and economic optimization.

The minimum cost flow problem unifies several important optimization problems—shortest paths, maximum flow, bipartite matching, and transportation problems are all special cases. Algorithms for min-cost flow combine techniques from shortest path algorithms with flow augmentation.

## Problem Definition

**Network**: Directed graph $G = (V, E)$ with:
- Capacities $c(u, v) \geq 0$ for each edge
- Costs $a(u, v)$ per unit of flow on each edge (can be negative)
- Source $s$ with supply $d$ and sink $t$ with demand $d$

**Flow**: Function $f: E \to \mathbb{R}_{\geq 0}$ satisfying:
- Capacity: $0 \leq f(u, v) \leq c(u, v)$
- Conservation: flow in = flow out for intermediate vertices
- Value: total flow from $s$ to $t$ equals $d$

**Cost of flow**: $\sum_{(u,v) \in E} a(u, v) \cdot f(u, v)$

**Goal**: Find flow of value $d$ with minimum total cost.

**Generalization (supply/demand)**: Some vertices have supply $b(v) > 0$, others have demand $b(v) < 0$. Require $\sum_v b(v) = 0$. Flow must satisfy $\text{flow out} - \text{flow in} = b(v)$.

## Residual Network with Costs

The residual network for min-cost flow includes edge costs.

**Residual cost**: For residual edge $(u, v)$:
$$a_f(u, v) = \begin{cases}
a(u, v) & \text{if forward edge} \\
-a(v, u) & \text{if backward (cancellation) edge}
\end{cases}$$

**Intuition**: Canceling flow on $(v, u)$ with cost $a(v, u)$ saves that cost, hence negative residual cost.

**Negative cycles**: If residual network has a negative cost cycle, flow can be improved by pushing flow around the cycle.

**Optimality condition**: Flow is optimal if and only if the residual network has no negative cost cycles.

## Successive Shortest Paths Algorithm

The algorithm repeatedly finds shortest (minimum cost) paths and augments flow along them.

```typescript
function minCostFlow(
    G: CostNetwork,
    s: number,
    t: number,
    demand: number
): { flow: number[][]; cost: number } {
    const n = G.vertexCount();
    const flow: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    let totalCost = 0;
    let totalFlow = 0;

    while (totalFlow < demand) {
        // Find shortest path in residual network
        const { dist, parent } = bellmanFord(G, flow, s);

        if (dist[t] === Infinity) {
            throw new Error("Demand cannot be satisfied");
        }

        // Find bottleneck capacity along path
        let bottleneck = demand - totalFlow;
        let v = t;
        while (v !== s) {
            const u = parent[v];
            const residual = getResidual(G, flow, u, v);
            bottleneck = Math.min(bottleneck, residual);
            v = u;
        }

        // Augment flow along path
        v = t;
        while (v !== s) {
            const u = parent[v];
            if (G.hasEdge(u, v)) {
                flow[u][v] += bottleneck;
                totalCost += bottleneck * G.cost(u, v);
            } else {
                flow[v][u] -= bottleneck;
                totalCost -= bottleneck * G.cost(v, u);
            }
            v = u;
        }

        totalFlow += bottleneck;
    }

    return { flow, cost: totalCost };
}

function bellmanFord(
    G: CostNetwork,
    flow: number[][],
    s: number
): { dist: number[]; parent: number[] } {
    const n = G.vertexCount();
    const dist = Array(n).fill(Infinity);
    const parent = Array(n).fill(-1);
    dist[s] = 0;

    // Relax edges V-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const [u, v] of allResidualEdges(G, flow)) {
            const cost = getResidualCost(G, u, v);
            if (dist[u] + cost < dist[v]) {
                dist[v] = dist[u] + cost;
                parent[v] = u;
            }
        }
    }

    return { dist, parent };
}
```

**Time complexity**: $O(d \cdot VE)$ where $d$ is the demand (number of flow units).

**With Dijkstra and potentials**: Can achieve $O(d \cdot E \log V)$ using Johnson's technique to handle negative costs.

## Using Dijkstra with Reduced Costs

To use Dijkstra (faster than Bellman-Ford), we need non-negative edge weights.

**Reduced costs**: Define potential $\pi(v)$ for each vertex. Reduced cost:
$$\bar{a}(u, v) = a(u, v) + \pi(u) - \pi(v)$$

**Property**: If $\pi(v) = $ shortest path distance from $s$ to $v$, then $\bar{a}(u, v) \geq 0$ for all edges.

```typescript
function minCostFlowDijkstra(
    G: CostNetwork,
    s: number,
    t: number,
    demand: number
): { flow: number[][]; cost: number } {
    const n = G.vertexCount();
    const flow = Array(n).fill(null).map(() => Array(n).fill(0));
    const potential = Array(n).fill(0);
    let totalCost = 0;
    let totalFlow = 0;

    // Initial potentials via Bellman-Ford (handles negative costs)
    const { dist: initialDist } = bellmanFord(G, flow, s);
    for (let v = 0; v < n; v++) {
        potential[v] = initialDist[v];
    }

    while (totalFlow < demand) {
        // Dijkstra with reduced costs
        const { dist, parent } = dijkstraReduced(G, flow, s, potential);

        if (dist[t] === Infinity) break;

        // Update potentials
        for (let v = 0; v < n; v++) {
            if (dist[v] < Infinity) {
                potential[v] += dist[v];
            }
        }

        // Augment along shortest path
        // ... (same as before)

        totalFlow += bottleneck;
    }

    return { flow, cost: totalCost };
}
```

**Time complexity**: $O(d \cdot E \log V)$ with binary heap.

## Cycle Canceling Algorithm

Alternative approach: start with any feasible flow, improve by canceling negative cycles.

```typescript
function cycleCanceling(G: CostNetwork, s: number, t: number, d: number): number[][] {
    // Phase 1: Find any feasible flow (ignore costs)
    const flow = maxFlow(G, s, t);
    if (flowValue(flow) < d) throw new Error("Infeasible");

    // Phase 2: Cancel negative cycles
    while (true) {
        const cycle = findNegativeCycle(G, flow);
        if (cycle === null) break;

        // Push flow around cycle
        const bottleneck = minResidualOnCycle(G, flow, cycle);
        augmentCycle(flow, cycle, bottleneck);
    }

    return flow;
}
```

**Time**: $O(VE^2 C)$ where $C$ is maximum cost magnitude. Can be improved with minimum mean cycle canceling.

## Special Cases

**Shortest path**: Min-cost flow with $d = 1$ on network with unit capacities.

**Maximum flow**: Min-cost flow with zero costs.

**Assignment problem**: Min-cost perfect matching in bipartite graph.

**Transportation problem**: Supplies at sources, demands at sinks, costs for shipping.

## Applications

**Transportation logistics**: Ship goods from warehouses to stores minimizing shipping cost while meeting demand.

**Airline scheduling**: Assign aircraft to routes minimizing fuel/crew costs.

**Network design**: Route traffic minimizing latency or bandwidth cost.

**Job scheduling**: Assign jobs to machines with processing costs and deadlines.

**Supply chain optimization**: Balance inventory levels across distribution network.

**Telecommunications**: Route calls through network minimizing connection costs.

## Integrality

**Theorem**: If all capacities and demands are integers, and costs are integers, then there exists an optimal integral flow.

**Consequence**: Min-cost flow can solve integer programming problems that would otherwise require more complex techniques.

## Key Takeaways

- Minimum cost flow finds cheapest way to send required flow through a network
- Successive shortest paths: augment along minimum cost paths
- Optimality condition: no negative cost cycles in residual network
- Use potentials/reduced costs to enable Dijkstra for negative-cost edges
- Time: $O(d \cdot E \log V)$ with potential-based Dijkstra
- Special cases include shortest paths, max flow, and assignment
- Applications span logistics, scheduling, and network optimization
