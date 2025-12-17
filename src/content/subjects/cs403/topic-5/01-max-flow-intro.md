# Maximum Flow: Ford-Fulkerson, Edmonds-Karp

## Introduction

Network flow problems model transportation, communication, and assignment problems. Maximum flow finds the maximum amount that can flow from source to sink in a network, respecting capacity constraints.

## Flow Network

**Directed graph** $G = (V, E)$ with:
- Source $s \in V$
- Sink $t \in V$  
- Capacity $c(u,v) \geq 0$ for each edge $(u,v)$

**Flow** $f: E \to \mathbb{R}$ satisfies:
1. **Capacity**: $0 \leq f(u,v) \leq c(u,v)$
2. **Conservation**: $\sum_{v} f(v,u) = \sum_{v} f(u,v)$ for all $u \neq s,t$

**Value**: $|f| = \sum_{v} f(s,v) - \sum_{v} f(v,s)$

## Ford-Fulkerson Method

**Idea**: Repeatedly find augmenting paths, increase flow.

**Residual network**: $G_f$ has residual capacity $c_f(u,v) = c(u,v) - f(u,v)$ for forward edges and $c_f(v,u) = f(u,v)$ for backward edges.

**Augmenting path**: Path $s \leadsto t$ in $G_f$ with positive residual capacity.

```typescript
function fordFulkerson(G: Network, s: Node, t: Node): number {
    let flow = 0;
    while (true) {
        const path = findAugmentingPath(G, s, t); // BFS/DFS
        if (!path) break;
        
        const bottleneck = Math.min(...path.map(e => G.residual(e)));
        for (const edge of path) {
            G.addFlow(edge, bottleneck);
        }
        flow += bottleneck;
    }
    return flow;
}
```

**Time**: $O(E \cdot |f^*|)$ where $|f^*|$ is max flow value (pseudo-polynomial!)

## Edmonds-Karp Algorithm

**Improvement**: Use BFS to find shortest augmenting path.

**Time**: $O(VE^2)$ - polynomial!

**Key insight**: Each edge becomes saturated at most $O(V)$ times.

## Max-Flow Min-Cut Theorem

**Cut**: Partition $(S, T)$ with $s \in S, t \in T$

**Capacity**: $c(S,T) = \sum_{u \in S, v \in T} c(u,v)$

**Theorem**: Max flow = Min cut capacity

**Proof**: 
1. Flow $\leq$ any cut capacity (obvious)
2. When no augmenting path exists, cut defined by reachable vertices from $s$ in $G_f$ equals flow (equality!)

## Applications

**Transportation**: Maximize goods from factories to markets
**Communication**: Maximize data transfer in networks
**Matching**: Bipartite matching via flow network
**Project selection**: Maximize profit subject to constraints

## Conclusion

Ford-Fulkerson with BFS (Edmonds-Karp) solves max flow in $O(VE^2)$ time. The max-flow min-cut theorem connects flow and cut problems, enabling powerful algorithms and applications.
