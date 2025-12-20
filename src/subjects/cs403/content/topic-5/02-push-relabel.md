# Push-Relabel Algorithm: Preflow and Height Functions

## Introduction

The push-relabel algorithm represents a fundamentally different approach to maximum flow than augmenting path methods. Instead of finding paths from source to sink, it works locally—pushing excess flow from vertices and relabeling to enable more pushes.

Invented by Goldberg and Tarjan in 1988, push-relabel algorithms achieve the same worst-case complexity as Edmonds-Karp but often perform better in practice, especially on dense graphs. They also parallelize naturally, making them attractive for high-performance computing.

The key insight is maintaining a "preflow" (where flow conservation can be violated) and systematically converting it to a valid flow through local operations.

## Preflow Concept

A **preflow** relaxes the conservation constraint, allowing vertices to accumulate excess flow.

**Definition**: A preflow $f$ satisfies:
- Capacity constraint: $0 \leq f(u, v) \leq c(u, v)$ for all $(u, v)$
- Relaxed conservation: $\sum_v f(v, u) \geq \sum_v f(u, v)$ for all $u \neq s$

**Excess**: The excess at vertex $u$ is:
$$e(u) = \sum_v f(v, u) - \sum_v f(u, v)$$

For a preflow: $e(u) \geq 0$ for all $u \neq s$.

**Active vertex**: A vertex $u \neq s, t$ with $e(u) > 0$.

**Goal**: Start with a preflow and eliminate all excesses, yielding a valid maximum flow.

## Height Function

The algorithm uses a height function to guide flow toward the sink.

**Definition**: A height function $h: V \to \mathbb{N}$ satisfies:
- $h(s) = n$ (source at highest level)
- $h(t) = 0$ (sink at lowest level)
- $h(u) \leq h(v) + 1$ for all residual edges $(u, v) \in E_f$

**Intuition**: Flow can only be pushed "downhill"—from higher vertices to lower adjacent vertices. Heights represent a lower bound on distance to sink in the residual network.

**Valid labeling**: A height function satisfying all constraints.

## Push and Relabel Operations

The algorithm uses two operations to move flow and adjust heights.

**Push operation**: If vertex $u$ is active, $(u, v) \in E_f$, and $h(u) = h(v) + 1$:
1. Compute push amount: $\delta = \min(e(u), c_f(u, v))$
2. Send $\delta$ flow from $u$ to $v$

```typescript
function push(u: number, v: number): void {
    const delta = Math.min(excess[u], residual(u, v));

    if (hasForwardEdge(u, v)) {
        flow[u][v] += delta;
    } else {
        flow[v][u] -= delta;
    }

    excess[u] -= delta;
    excess[v] += delta;
}
```

**Saturating push**: When $\delta = c_f(u, v)$, the residual edge becomes saturated.

**Non-saturating push**: When $\delta = e(u) < c_f(u, v)$, all excess at $u$ is pushed.

**Relabel operation**: If vertex $u$ is active and has no valid push target (no neighbor $v$ with $h(u) = h(v) + 1$ and $c_f(u, v) > 0$):
$$h(u) \leftarrow 1 + \min\{h(v) : (u, v) \in E_f\}$$

```typescript
function relabel(u: number): void {
    let minHeight = Infinity;

    for (const v of vertices) {
        if (residual(u, v) > 0) {
            minHeight = Math.min(minHeight, height[v]);
        }
    }

    height[u] = minHeight + 1;
}
```

## Generic Push-Relabel Algorithm

```typescript
function pushRelabel(G: FlowNetwork, s: number, t: number): number {
    const n = G.vertexCount();
    const height: number[] = new Array(n).fill(0);
    const excess: number[] = new Array(n).fill(0);
    const flow: number[][] = G.vertices.map(() => G.vertices.map(() => 0));

    // Initialize: source at height n
    height[s] = n;

    // Saturate all edges from source
    for (const v of G.neighbors(s)) {
        const cap = G.capacity(s, v);
        flow[s][v] = cap;
        excess[v] = cap;
        excess[s] -= cap;
    }

    // Get active vertices (exclude s and t)
    function getActiveVertex(): number | null {
        for (let u = 0; u < n; u++) {
            if (u !== s && u !== t && excess[u] > 0) {
                return u;
            }
        }
        return null;
    }

    // Main loop
    while (true) {
        const u = getActiveVertex();
        if (u === null) break;

        // Try to push
        let pushed = false;
        for (const v of G.allVertices()) {
            const res = G.capacity(u, v) - flow[u][v] + flow[v][u];
            if (res > 0 && height[u] === height[v] + 1) {
                push(u, v);
                pushed = true;
                if (excess[u] === 0) break;
            }
        }

        // Relabel if no push possible
        if (!pushed && excess[u] > 0) {
            relabel(u);
        }
    }

    return excess[t];
}
```

## Complexity Analysis

**Lemma 1**: Heights never decrease, and $h(u) \leq 2n - 1$ for all $u$.

**Proof**: Relabeling only increases heights. Since there must always be a path from any active vertex to $s$ in the residual network, $h(u)$ is bounded.

**Lemma 2**: Number of relabel operations is $O(V^2)$.

**Proof**: Each vertex's height can increase at most $2n - 1$ times.

**Lemma 3**: Number of saturating pushes is $O(VE)$.

**Proof**: After saturating $(u, v)$, heights must change before it can be saturated again.

**Lemma 4**: Number of non-saturating pushes is $O(V^2 E)$.

**Proof**: Use potential function $\Phi = \sum_{u \text{ active}} h(u)$.

**Theorem**: Generic push-relabel runs in $O(V^2 E)$ time.

## FIFO Push-Relabel

Improved vertex selection yields better performance.

**FIFO ordering**: Maintain queue of active vertices. Process front of queue.

```typescript
function fifooPushRelabel(G: FlowNetwork, s: number, t: number): number {
    // ... initialization ...

    const queue: number[] = [];
    for (let v = 0; v < n; v++) {
        if (v !== s && v !== t && excess[v] > 0) {
            queue.push(v);
        }
    }

    while (queue.length > 0) {
        const u = queue.shift()!;

        while (excess[u] > 0) {
            // Try to push to any eligible neighbor
            let pushed = false;
            for (const v of neighbors(u)) {
                if (residual(u, v) > 0 && height[u] === height[v] + 1) {
                    const wasPreviouslyInactive = (v !== s && v !== t && excess[v] === 0);
                    push(u, v);
                    if (wasPreviouslyInactive && excess[v] > 0) {
                        queue.push(v);
                    }
                    pushed = true;
                    if (excess[u] === 0) break;
                }
            }

            if (!pushed && excess[u] > 0) {
                relabel(u);
            }
        }
    }

    return excess[t];
}
```

**Theorem**: FIFO push-relabel runs in $O(V^3)$ time.

## Highest-Label Push-Relabel

**Strategy**: Always process the active vertex with highest label.

**Implementation**: Use bucket data structure—array of lists indexed by height.

**Time**: $O(V^2 \sqrt{E})$ with careful implementation.

## Comparison with Augmenting Path Methods

| Aspect | Ford-Fulkerson/Edmonds-Karp | Push-Relabel |
|--------|----------------------------|--------------|
| Approach | Global path finding | Local operations |
| Data structure | BFS queue | Active vertex set |
| Parallelism | Difficult | Natural |
| Cache behavior | Many cache misses | Better locality |
| Dense graphs | OK | Better |
| Sparse graphs | Better | OK |

## Applications

Push-relabel is preferred when:

**Dense graphs**: More edges mean BFS is expensive but local pushes remain cheap.

**Parallel computing**: Multiple active vertices can be processed simultaneously with appropriate synchronization.

**Incremental updates**: Adding flow or modifying capacities requires less recomputation.

**Real-time systems**: Bounded per-operation cost suits latency-sensitive applications.

## Key Takeaways

- Push-relabel uses local operations instead of global path finding
- Preflow allows temporary violation of conservation, fixed through pushes
- Height function ensures flow moves toward sink
- Generic algorithm: $O(V^2 E)$; FIFO: $O(V^3)$; highest-label: $O(V^2\sqrt{E})$
- Better suited for dense graphs and parallel implementations
- Practical performance often beats augmenting path methods
