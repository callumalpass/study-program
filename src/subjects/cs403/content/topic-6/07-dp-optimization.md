# DP Optimizations: Convex Hull Trick and Divide-and-Conquer

## Introduction

Standard dynamic programming often yields $O(n^2)$ or $O(n^3)$ algorithms. For large inputs, these may be too slow. DP optimization techniques exploit structural properties of recurrences to achieve significant speedups—often reducing $O(n^3)$ to $O(n^2)$ or even $O(n^2)$ to $O(n \log n)$.

These advanced techniques require careful analysis of the recurrence structure, but when applicable, they provide dramatic improvements that make previously infeasible problems tractable.

## Knuth's Optimization

**Applicable when**: Computing optimal split points for interval DP.

**Recurrence form**:
$$dp[i][j] = \min_{i < k < j} \{dp[i][k] + dp[k][j]\} + C[i][j]$$

**Condition**: Optimal split points $opt[i][j]$ satisfy monotonicity:
$$opt[i][j-1] \leq opt[i][j] \leq opt[i+1][j]$$

**Effect**: Reduces search space from $O(n)$ per subproblem to amortized $O(1)$.

```typescript
function knuthOptimization(cost: (i: number, j: number) => number, n: number): number {
    const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    const opt: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));

    // Base case
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
        opt[i][i] = i;
    }

    // Fill by increasing length
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            // Search only in range [opt[i][j-1], opt[i+1][j]]
            const lo = opt[i][j - 1];
            const hi = (j + 1 < n) ? opt[i + 1][j] : j - 1;

            for (let k = lo; k <= hi; k++) {
                const val = dp[i][k] + dp[k + 1][j] + cost(i, j);
                if (val < dp[i][j]) {
                    dp[i][j] = val;
                    opt[i][j] = k;
                }
            }
        }
    }

    return dp[0][n - 1];
}
```

**Time**: $O(n^2)$ instead of $O(n^3)$.

**Applications**: Optimal BST, polygon triangulation, paragraph formatting.

## Convex Hull Trick

**Applicable when**: DP transitions can be expressed as minimizing/maximizing linear functions.

**Recurrence form**:
$$dp[i] = \min_{j < i} \{a_j \cdot x_i + b_j\} + c_i$$

where $a_j$ and $b_j$ depend only on $j$, and $x_i$ depends only on $i$.

**Key insight**: The minimum of linear functions at point $x$ is the lower envelope—a convex hull.

```typescript
class ConvexHullTrick {
    private lines: Array<{ m: number; b: number }> = [];

    // Add line y = mx + b (assuming m is decreasing)
    addLine(m: number, b: number): void {
        while (this.lines.length >= 2) {
            const l1 = this.lines[this.lines.length - 2];
            const l2 = this.lines[this.lines.length - 1];

            // Check if l2 is dominated by l1 and new line
            if (this.intersectionX(l1, l2) >= this.intersectionX(l2, { m, b })) {
                this.lines.pop();
            } else {
                break;
            }
        }
        this.lines.push({ m, b });
    }

    // Query minimum at x (assuming x is increasing)
    query(x: number): number {
        // Binary search or pointer technique
        let lo = 0, hi = this.lines.length - 1;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (this.eval(this.lines[mid], x) > this.eval(this.lines[mid + 1], x)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return this.eval(this.lines[lo], x);
    }

    private intersectionX(l1: { m: number; b: number }, l2: { m: number; b: number }): number {
        return (l2.b - l1.b) / (l1.m - l2.m);
    }

    private eval(line: { m: number; b: number }, x: number): number {
        return line.m * x + line.b;
    }
}
```

**Time**: $O(n \log n)$ or $O(n)$ if slopes/queries are monotonic.

**Applications**: Least cost optimization, line breaking, certain graph problems.

## Divide and Conquer Optimization

**Applicable when**: DP has the form:
$$dp[i][j] = \min_{k < j} \{dp[i-1][k] + C[k][j]\}$$

with the monotonicity condition on optimal $k$:
$$opt[i][j] \leq opt[i][j+1]$$

**Idea**: Use divide and conquer on $j$. For each level, the optimal $k$ range is restricted.

```typescript
function divideAndConquerDP(n: number, m: number, cost: (k: number, j: number) => number): number {
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(Infinity));
    dp[0][0] = 0;

    for (let i = 1; i <= m; i++) {
        compute(i, 1, n, 0, n - 1);
    }

    function compute(level: number, lo: number, hi: number, optLo: number, optHi: number): void {
        if (lo > hi) return;

        const mid = Math.floor((lo + hi) / 2);
        let bestK = optLo;
        dp[level][mid] = Infinity;

        for (let k = optLo; k <= Math.min(optHi, mid - 1); k++) {
            const val = dp[level - 1][k] + cost(k, mid);
            if (val < dp[level][mid]) {
                dp[level][mid] = val;
                bestK = k;
            }
        }

        // Recurse
        compute(level, lo, mid - 1, optLo, bestK);
        compute(level, mid + 1, hi, bestK, optHi);
    }

    return dp[m][n];
}
```

**Time**: $O(mn \log n)$ instead of $O(mn^2)$.

**Applications**: Partitioning problems, batch scheduling.

## Li Chao Tree

For dynamic convex hull queries (insertions and queries in any order):

```typescript
class LiChaoTree {
    // Segment tree storing lines, supports arbitrary insertion order
    // Query minimum at any x in O(log range)
    // Insert line in O(log range)
}
```

**Time**: $O(\log \text{range})$ per operation.

**When to use**: When slopes or queries aren't monotonic.

## Comparison of Techniques

| Technique | Condition | Improvement |
|-----------|-----------|-------------|
| Knuth's | Optimal split monotonic | $O(n^3) \to O(n^2)$ |
| Convex Hull | Linear functions | $O(n^2) \to O(n \log n)$ |
| D&C Optimization | Optimal $k$ monotonic | $O(n^2) \to O(n \log n)$ |
| Li Chao Tree | General linear queries | $O(n) \to O(\log n)$ per query |

## Verifying Conditions

**Quadrangle inequality** (for Knuth's): $C[a][c] + C[b][d] \leq C[a][d] + C[b][c]$ for $a \leq b \leq c \leq d$.

**Concave/convex functions**: For convex hull trick, verify slope ordering.

**Monotonicity**: Often provable from problem structure or verified empirically.

## Key Takeaways

- Knuth's optimization: $O(n^3) \to O(n^2)$ for interval DP with monotonic splits
- Convex hull trick: $O(n^2) \to O(n \log n)$ for linear function minimization
- Divide and conquer: $O(n^2) \to O(n \log n)$ with monotonic optimal choices
- Always verify applicable conditions before applying
- These techniques are essential for competitive programming and large-scale optimization
