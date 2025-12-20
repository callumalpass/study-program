# Matrix Chain Multiplication: Optimal Parenthesization

## Introduction

Matrix chain multiplication is a classic dynamic programming problem that asks: given a sequence of matrices to multiply, how should we parenthesize the product to minimize the total number of scalar multiplications?

This problem exemplifies optimal substructure and overlapping subproblems—the hallmarks of dynamic programming. The techniques developed here extend to many combinatorial optimization problems, including optimal binary search trees, polygon triangulation, and parsing.

## Problem Definition

**Input**: A sequence of $n$ matrices $A_1, A_2, \ldots, A_n$ where matrix $A_i$ has dimensions $p_{i-1} \times p_i$.

**Constraint**: The product $A_1 \cdot A_2 \cdot \ldots \cdot A_n$ is well-defined (adjacent dimensions match).

**Cost model**: Multiplying a $p \times q$ matrix by a $q \times r$ matrix requires $p \cdot q \cdot r$ scalar multiplications.

**Goal**: Parenthesize the product to minimize total scalar multiplications.

**Key insight**: Matrix multiplication is associative but not commutative—different parenthesizations give the same result but have different computational costs.

## Example

Consider matrices $A_1$ (10×30), $A_2$ (30×5), $A_3$ (5×60):

**Parenthesization 1**: $(A_1 \cdot A_2) \cdot A_3$
- $A_1 \cdot A_2$: 10×30×5 = 1,500 operations → result is 10×5
- Result × $A_3$: 10×5×60 = 3,000 operations
- **Total**: 4,500 operations

**Parenthesization 2**: $A_1 \cdot (A_2 \cdot A_3)$
- $A_2 \cdot A_3$: 30×5×60 = 9,000 operations → result is 30×60
- $A_1$ × Result: 10×30×60 = 18,000 operations
- **Total**: 27,000 operations

The first parenthesization is 6× faster—demonstrating that order matters significantly.

## Recursive Structure

The problem has optimal substructure: an optimal solution contains optimal solutions to subproblems.

**Observation**: Any parenthesization of $A_i \cdot \ldots \cdot A_j$ must split at some point $k$:
$$(A_i \cdot \ldots \cdot A_k) \cdot (A_{k+1} \cdot \ldots \cdot A_j)$$

**Subproblem**: Let $m[i,j]$ = minimum cost to compute $A_i \cdot \ldots \cdot A_j$.

**Recurrence**:
$$m[i,j] = \begin{cases}
0 & \text{if } i = j \\
\min_{i \leq k < j} \{m[i,k] + m[k+1,j] + p_{i-1} \cdot p_k \cdot p_j\} & \text{if } i < j
\end{cases}$$

The term $p_{i-1} \cdot p_k \cdot p_j$ is the cost of multiplying the two resulting matrices.

## Dynamic Programming Solution

```typescript
function matrixChainMultiplication(dimensions: number[]): {
    cost: number;
    parenthesization: string;
} {
    const n = dimensions.length - 1;  // Number of matrices

    // m[i][j] = minimum cost to multiply A_i through A_j
    const m: number[][] = Array(n + 1).fill(null)
        .map(() => Array(n + 1).fill(0));

    // s[i][j] = optimal split point for A_i through A_j
    const s: number[][] = Array(n + 1).fill(null)
        .map(() => Array(n + 1).fill(0));

    // Fill table for chains of increasing length
    for (let len = 2; len <= n; len++) {
        for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;
            m[i][j] = Infinity;

            // Try all split points
            for (let k = i; k < j; k++) {
                const cost = m[i][k] + m[k + 1][j] +
                    dimensions[i - 1] * dimensions[k] * dimensions[j];

                if (cost < m[i][j]) {
                    m[i][j] = cost;
                    s[i][j] = k;
                }
            }
        }
    }

    // Reconstruct optimal parenthesization
    function buildParens(i: number, j: number): string {
        if (i === j) return `A${i}`;
        return `(${buildParens(i, s[i][j])} × ${buildParens(s[i][j] + 1, j)})`;
    }

    return {
        cost: m[1][n],
        parenthesization: buildParens(1, n)
    };
}
```

## Complexity Analysis

**Time complexity**: $O(n^3)$
- $O(n^2)$ subproblems
- Each subproblem considers $O(n)$ split points

**Space complexity**: $O(n^2)$ for the DP tables.

## Memoization Alternative

Top-down with memoization offers the same asymptotic complexity:

```typescript
function matrixChainMemo(dimensions: number[]): number {
    const n = dimensions.length - 1;
    const memo: Map<string, number> = new Map();

    function dp(i: number, j: number): number {
        if (i === j) return 0;

        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key)!;

        let minCost = Infinity;
        for (let k = i; k < j; k++) {
            const cost = dp(i, k) + dp(k + 1, j) +
                dimensions[i - 1] * dimensions[k] * dimensions[j];
            minCost = Math.min(minCost, cost);
        }

        memo.set(key, minCost);
        return minCost;
    }

    return dp(1, n);
}
```

## Number of Parenthesizations

The number of ways to parenthesize $n$ matrices is the $(n-1)$-th Catalan number:
$$C_{n-1} = \frac{1}{n}\binom{2(n-1)}{n-1} = \Omega(4^n / n^{1.5})$$

This exponential growth makes brute-force enumeration infeasible, justifying dynamic programming.

## Applications

**Database query optimization**: Join ordering in relational databases is equivalent to matrix chain multiplication. Finding optimal join order minimizes intermediate result sizes.

**Compiler optimization**: Expression evaluation order affects register usage and cache performance.

**Signal processing**: Chained convolutions and FFT compositions.

**Neural network inference**: Layer-by-layer computation order in certain architectures.

## Key Takeaways

- Matrix chain multiplication demonstrates optimal substructure and overlapping subproblems
- Different parenthesizations can have dramatically different costs
- DP achieves $O(n^3)$ time versus exponential brute force
- The technique extends to optimal BST, polygon triangulation, and CKY parsing
- Practical applications include database query optimization and compiler design
