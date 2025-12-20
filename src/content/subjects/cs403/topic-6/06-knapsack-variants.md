# Knapsack Variants and Extensions

## Introduction

The knapsack problem is a cornerstone of combinatorial optimization: given items with weights and values, select items to maximize value while respecting a weight capacity. This seemingly simple problem has many variants, each modeling different real-world constraints.

Understanding knapsack variants reveals the spectrum from polynomial-time solvable problems to NP-hard problems, and demonstrates how small changes in constraints dramatically affect algorithmic approaches.

## 0/1 Knapsack

**Problem**: Select a subset of $n$ items with weights $w_i$ and values $v_i$ to maximize total value, subject to total weight $\leq W$.

**Constraint**: Each item is either fully included or excluded.

**Recurrence**: $K[i, w]$ = maximum value using items $1..i$ with capacity $w$.
$$K[i, w] = \max(K[i-1, w], K[i-1, w-w_i] + v_i)$$

```typescript
function knapsack01(weights: number[], values: number[], W: number): number {
    const n = weights.length;
    const K: number[][] = Array(n + 1).fill(null)
        .map(() => Array(W + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            K[i][w] = K[i - 1][w];  // Don't include item i

            if (weights[i - 1] <= w) {
                K[i][w] = Math.max(
                    K[i][w],
                    K[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            }
        }
    }

    return K[n][W];
}
```

**Time**: $O(nW)$ — pseudo-polynomial (polynomial in $n$ but exponential in $\log W$).

**Space**: $O(W)$ with rolling array optimization.

## Unbounded Knapsack

**Variant**: Unlimited copies of each item available.

**Recurrence**: $K[w]$ = maximum value with capacity $w$.
$$K[w] = \max_{i: w_i \leq w}(K[w - w_i] + v_i)$$

```typescript
function unboundedKnapsack(weights: number[], values: number[], W: number): number {
    const K = Array(W + 1).fill(0);

    for (let w = 1; w <= W; w++) {
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] <= w) {
                K[w] = Math.max(K[w], K[w - weights[i]] + values[i]);
            }
        }
    }

    return K[W];
}
```

**Time**: $O(nW)$, **Space**: $O(W)$

**Applications**: Cutting stock (how many pieces of each length), coin change (minimum coins).

## Bounded Knapsack

**Variant**: Item $i$ has at most $c_i$ copies available.

**Naive approach**: Treat each copy as separate item → $O(nCW)$ where $C = \max c_i$.

**Binary decomposition**: Represent $c_i$ copies using $O(\log c_i)$ items:
- Items of sizes $1, 2, 4, \ldots, 2^k, c_i - (2^{k+1} - 1)$
- Can form any count from $0$ to $c_i$

```typescript
function boundedKnapsack(
    weights: number[], values: number[], counts: number[], W: number
): number {
    // Binary decomposition
    const expandedW: number[] = [];
    const expandedV: number[] = [];

    for (let i = 0; i < weights.length; i++) {
        let remaining = counts[i];
        let k = 1;

        while (remaining > 0) {
            const take = Math.min(k, remaining);
            expandedW.push(weights[i] * take);
            expandedV.push(values[i] * take);
            remaining -= take;
            k *= 2;
        }
    }

    return knapsack01(expandedW, expandedV, W);
}
```

**Time**: $O(nW \log C)$ with binary decomposition.

## Fractional Knapsack

**Variant**: Can take fractional amounts of items.

**Greedy solution**: Sort by value/weight ratio, take items in order.

```typescript
function fractionalKnapsack(
    weights: number[], values: number[], W: number
): number {
    const items = weights.map((w, i) => ({
        weight: w,
        value: values[i],
        ratio: values[i] / w
    }));

    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let remainingCapacity = W;

    for (const item of items) {
        if (item.weight <= remainingCapacity) {
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            totalValue += item.ratio * remainingCapacity;
            break;
        }
    }

    return totalValue;
}
```

**Time**: $O(n \log n)$ — polynomial! The fractions make greedy optimal.

## Multidimensional Knapsack

**Variant**: Multiple constraints (weight, volume, count, etc.).

**Example**: Items have weight $w_i$ and volume $v_i$. Capacity limits $W$ (weight) and $V$ (volume).

**Recurrence**: $K[i, w, v]$ = max value with capacity $(w, v)$ using items $1..i$.

```typescript
function multiDimensionalKnapsack(
    weights: number[], volumes: number[], values: number[],
    W: number, V: number
): number {
    const n = weights.length;
    const K: number[][][] = Array(n + 1).fill(null)
        .map(() => Array(W + 1).fill(null)
            .map(() => Array(V + 1).fill(0)));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            for (let v = 0; v <= V; v++) {
                K[i][w][v] = K[i - 1][w][v];

                if (weights[i-1] <= w && volumes[i-1] <= v) {
                    K[i][w][v] = Math.max(
                        K[i][w][v],
                        K[i-1][w - weights[i-1]][v - volumes[i-1]] + values[i-1]
                    );
                }
            }
        }
    }

    return K[n][W][V];
}
```

**Time**: $O(nWV)$ for 2D; $O(nW_1W_2\cdots W_d)$ for $d$ dimensions.

## Subset Sum

**Special case**: All values equal weights. Can we achieve exactly target sum?

```typescript
function subsetSum(nums: number[], target: number): boolean {
    const possible = new Set<number>([0]);

    for (const num of nums) {
        const newSums: number[] = [];
        for (const sum of possible) {
            if (sum + num <= target) {
                newSums.push(sum + num);
            }
        }
        newSums.forEach(s => possible.add(s));
    }

    return possible.has(target);
}
```

**Applications**: Balanced partition, resource allocation.

## Applications

**Resource allocation**: Allocate budget across projects for maximum return.

**Cargo loading**: Load containers maximizing value within weight/volume limits.

**Portfolio selection**: Select investments within budget constraints.

**Cryptography**: Subset sum is basis for some cryptographic protocols.

**Cutting problems**: Cut material to fill orders with minimum waste.

## Key Takeaways

- 0/1 knapsack: Each item used once; $O(nW)$ pseudo-polynomial
- Unbounded: Unlimited copies; same complexity, simpler recurrence
- Bounded: Limited copies; binary decomposition for efficiency
- Fractional: Greedy in $O(n \log n)$—polynomial
- Multidimensional: Complexity multiplies across dimensions
- Subset sum: Special case; basis for cryptographic hardness
