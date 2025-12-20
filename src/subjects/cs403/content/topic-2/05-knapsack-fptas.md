# Knapsack FPTAS: Scaling and Rounding

## Introduction

The 0/1 Knapsack problem is weakly NP-complete and admits a Fully Polynomial-Time Approximation Scheme (FPTAS). This is significant: we can get arbitrarily close to optimal in time polynomial in both input size and accuracy parameter.

The FPTAS for knapsack demonstrates the power of scaling and rounding - transforming a pseudo-polynomial algorithm into a polynomial approximation scheme.

## Knapsack Problem

**Input**:
- $n$ items, each with value $v_i$ and weight $w_i$
- Capacity $W$

**Output**: Subset $S \subseteq \{1,\ldots,n\}$ maximizing $\sum_{i \in S} v_i$

**Constraint**: $\sum_{i \in S} w_i \leq W$

### Example

Items:
- Item 1: value=10, weight=5
- Item 2: value=40, weight=20  
- Item 3: value=30, weight=10
- Item 4: value=50, weight=25

Capacity: $W = 30$

**Optimal**: Items {1,3,4} won't fit. Items {2,3} give value 70. ✓

## Pseudo-Polynomial DP

```typescript
function knapsackDP(items: Item[], capacity: number): number {
    const n = items.length;
    const dp: number[][] = Array(n+1).fill(null)
        .map(() => Array(capacity+1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        const {value, weight} = items[i-1];
        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i-1][w]; // Don't take
            if (w >= weight) {
                dp[i][w] = Math.max(dp[i][w], dp[i-1][w-weight] + value);
            }
        }
    }
    
    return dp[n][capacity];
}
```

**Time**: $O(nW)$ - pseudo-polynomial (exponential in $\log W$)

**Space**: $O(nW)$

## FPTAS via Scaling

**Key idea**: Scale values down, solve scaled problem, scale back up.

### Algorithm

```typescript
function knapsackFPTAS(items: Item[], capacity: number, epsilon: number): number {
    const n = items.length;
    const maxValue = Math.max(...items.map(it => it.value));
    
    // Scaling factor
    const K = (epsilon * maxValue) / n;
    
    // Round values down
    const scaledItems = items.map(item => ({
        weight: item.weight,
        value: Math.floor(item.value / K)
    }));
    
    // Solve scaled problem
    const scaledSolution = knapsackValueDP(scaledItems, capacity);
    
    // Return corresponding value in original problem
    return scaledSolution * K;
}
```

**Time**: $O(n^3 / \epsilon)$

**Approximation**: $(1-\epsilon)$ of optimal

### Value-Based DP

For FPTAS, use DP indexed by value instead of weight:

```typescript
function knapsackValueDP(items: Item[], capacity: number): number {
    const n = items.length;
    const maxValue = items.reduce((sum, it) => sum + it.value, 0);
    
    // dp[i][v] = minimum weight to achieve value v using first i items
    const dp: number[][] = Array(n+1).fill(null)
        .map(() => Array(maxValue+1).fill(Infinity));
    
    dp[0][0] = 0;
    
    for (let i = 1; i <= n; i++) {
        const {value, weight} = items[i-1];
        for (let v = 0; v <= maxValue; v++) {
            dp[i][v] = dp[i-1][v]; // Don't take
            if (v >= value) {
                dp[i][v] = Math.min(dp[i][v], dp[i-1][v-value] + weight);
            }
        }
    }
    
    // Find maximum achievable value
    for (let v = maxValue; v >= 0; v--) {
        if (dp[n][v] <= capacity) return v;
    }
    return 0;
}
```

**Time**: $O(n \cdot \sum v_i)$

After scaling: $O(n \cdot n/\epsilon) = O(n^2/\epsilon)$

## Correctness Proof

**Theorem**: FPTAS achieves $(1-\epsilon)$-approximation.

**Proof**:

Let OPT = optimal value, ALG = algorithm output.

**Claim 1**: Each scaled value differs from original by at most $K$:
$$v_i - K \leq \bar{v}_i \cdot K \leq v_i$$

where $\bar{v}_i = \lfloor v_i / K \rfloor$ is scaled value.

**Claim 2**: Optimal scaled solution loses at most $nK$ value:
$$\text{OPT}_{scaled} \cdot K \geq \text{OPT} - nK$$

**Claim 3**: We find optimal scaled solution:
$$\text{ALG}_{scaled} = \text{OPT}_{scaled}$$

**Claim 4**: Converting back:
$$\text{ALG} = \text{ALG}_{scaled} \cdot K = \text{OPT}_{scaled} \cdot K \geq \text{OPT} - nK$$

**Claim 5**: Substituting $K = \epsilon \cdot \text{OPT} / n$:
$$\text{ALG} \geq \text{OPT} - n \cdot \frac{\epsilon \cdot \text{OPT}}{n} = (1-\epsilon) \cdot \text{OPT}$$

Therefore, FPTAS achieves $(1-\epsilon)$-approximation. ✓

## Practical Considerations

### Choosing $\epsilon$

| $\epsilon$ | Approximation | Time | Use case |
|------------|---------------|------|----------|
| 0.1 | 90% of optimal | $O(10n^3)$ | Quick estimates |
| 0.01 | 99% of optimal | $O(100n^3)$ | Good solutions |
| 0.001 | 99.9% of optimal | $O(1000n^3)$ | High accuracy |

### Space Optimization

```typescript
function knapsackFPTASOptimized(items: Item[], capacity: number, epsilon: number): number {
    // Use rolling array for O(n^2/epsilon) space instead of O(n^3/epsilon)
    const n = items.length;
    const maxValue = Math.max(...items.map(it => it.value));
    const K = (epsilon * maxValue) / n;
    
    const scaledMax = Math.floor(n * maxValue / K);
    let dp = Array(scaledMax + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const item of items) {
        const scaledValue = Math.floor(item.value / K);
        const newDp = [...dp];
        
        for (let v = scaledValue; v <= scaledMax; v++) {
            newDp[v] = Math.min(newDp[v], dp[v - scaledValue] + item.weight);
        }
        
        dp = newDp;
    }
    
    for (let v = scaledMax; v >= 0; v--) {
        if (dp[v] <= capacity) return v * K;
    }
    return 0;
}
```

## Variants

### Multiple Knapsack
$m$ knapsacks, assign items to maximize total value.
FPTAS exists with time $O(n^m / \epsilon^m)$.

### Unbounded Knapsack  
Unlimited copies of each item.
FPTAS with same structure.

### Multidimensional Knapsack
Multiple constraints (weight, volume, etc.).
FPTAS exists but time depends exponentially on dimension.

## Conclusion

Knapsack FPTAS demonstrates key approximation algorithm techniques:
1. Scaling to control problem size
2. Rounding to lose minimal accuracy
3. Converting pseudo-polynomial to polynomial approximation

The existence of FPTAS for knapsack (but not for strongly NP-complete problems) highlights the important distinction between weak and strong NP-completeness.
