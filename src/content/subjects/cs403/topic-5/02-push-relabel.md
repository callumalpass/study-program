# Push-Relabel Algorithm: Preflow and Height Functions

## Introduction

Push-relabel algorithms represent a different paradigm for max flow. Instead of augmenting paths, they maintain a preflow (flow that can violate conservation) and use local operations to push flow and relabel vertices.

## Preflow

**Preflow**: Relaxes conservation - flow in $\geq$ flow out for all $v \neq s,t$

**Excess**: $e(v) = \sum_{u} f(u,v) - \sum_{w} f(v,w)$ 

**Active vertex**: $e(v) > 0$ and $v \neq s,t$

## Height Function

**Height** $h: V \to \mathbb{N}$ satisfies:
- $h(s) = n$, $h(t) = 0$
- $h(u) \leq h(v) + 1$ for all $(u,v) \in E_f$ (residual)

**Intuition**: Flow goes "downhill" in height

## Operations

**Push**: If $e(u) > 0$ and $c_f(u,v) > 0$ and $h(u) = h(v) + 1$:
- Send $\delta = \min(e(u), c_f(u,v))$ from $u$ to $v$

**Relabel**: If $e(u) > 0$ and no valid push:
- $h(u) = 1 + \min_{(u,v) \in E_f} h(v)$

```typescript
function pushRelabel(G: Network, s: Node, t: Node): number {
    const h = Array(G.n).fill(0);
    h[s] = G.n;
    const e = Array(G.n).fill(0);
    
    // Saturate edges from source
    for (const v of G.neighbors(s)) {
        const cap = G.capacity(s, v);
        G.flow[s][v] = cap;
        e[v] = cap;
        e[s] -= cap;
    }
    
    // Process active vertices
    while (hasActive()) {
        const u = getActive();
        if (canPush(u)) {
            push(u);
        } else {
            relabel(u);
        }
    }
    
    return e[t];
}
```

**Time**: $O(V^2 E)$ basic version

**Optimized**: $O(V^3)$ with proper data structures

## FIFO Push-Relabel

**Order**: Process active vertices in FIFO order

**Time**: $O(V^3)$ 

**Best known**: $O(VE \log(V^2/E))$ with dynamic trees

## Advantages

**Local operations**: No global path search

**Parallelizable**: Multiple pushes can happen simultaneously

**Practical**: Often faster than Edmonds-Karp despite same worst-case

## Applications

Same as max flow, but better for:
- Dense graphs
- Parallel computing
- Real-time flow updates

## Conclusion

Push-relabel provides alternative max-flow paradigm. Local operations and height-based routing enable efficient implementations and parallelization.
