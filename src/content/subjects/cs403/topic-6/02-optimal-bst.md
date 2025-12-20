# Optimal Binary Search Tree: Minimizing Expected Search Cost

## Introduction

An optimal binary search tree minimizes the expected search cost given known access frequencies. Unlike balanced BSTs that optimize worst-case height, optimal BSTs place frequently accessed keys near the root, accepting imbalance in exchange for reduced average access time.

This problem combines the interval structure of matrix chain multiplication with probability-weighted costs. The solution demonstrates how domain-specific knowledge (access patterns) can dramatically improve data structure performance.

## Problem Definition

**Input**:
- Sorted keys $k_1 < k_2 < \ldots < k_n$
- Search frequencies $p_i$ = probability of searching for $k_i$
- Miss frequencies $q_i$ = probability of searching between $k_i$ and $k_{i+1}$ (including before $k_1$ and after $k_n$)

**Constraint**: $\sum_{i=1}^{n} p_i + \sum_{i=0}^{n} q_i = 1$

**Cost model**: Expected search cost = $\sum_{i=1}^{n} p_i \cdot (\text{depth}(k_i) + 1) + \sum_{i=0}^{n} q_i \cdot (\text{depth of miss } i)$

**Goal**: Construct BST minimizing expected search cost.

## Example

Keys: $\{10, 20, 30\}$ with frequencies $p = [0.3, 0.1, 0.2]$, $q = [0.1, 0.1, 0.1, 0.1]$.

**Balanced BST** (20 at root):
```
       20
      /  \
    10    30
```
Cost = $0.3(2) + 0.1(1) + 0.2(2) + \ldots = 1.7$

**Optimal BST** (10 at root):
```
    10
      \
       20
         \
          30
```
Favors most frequent key (10) at root. Cost = 1.5.

## Recursive Structure

**Subproblem**: $e[i,j]$ = minimum expected cost for keys $k_i, \ldots, k_j$ (and misses $q_{i-1}, \ldots, q_j$).

**Weight**: $w[i,j] = \sum_{l=i}^{j} p_l + \sum_{l=i-1}^{j} q_l$ = total probability of searching in range $[i,j]$.

**Key observation**: When we make $k_r$ the root of subtree $[i,j]$:
- Left subtree contains $k_i, \ldots, k_{r-1}$
- Right subtree contains $k_{r+1}, \ldots, k_j$
- All nodes increase depth by 1, adding $w[i,j]$ to cost

**Recurrence**:
$$e[i,j] = \begin{cases}
q_{i-1} & \text{if } i > j \text{ (empty subtree)} \\
\min_{i \leq r \leq j} \{e[i,r-1] + e[r+1,j] + w[i,j]\} & \text{if } i \leq j
\end{cases}$$

## Dynamic Programming Solution

```typescript
function optimalBST(
    p: number[],     // p[1..n] key frequencies
    q: number[],     // q[0..n] miss frequencies
    n: number
): { cost: number; root: number[][] } {
    // e[i][j] = expected cost for subtree with keys i..j
    const e: number[][] = Array(n + 2).fill(null)
        .map(() => Array(n + 1).fill(0));

    // w[i][j] = total probability for range i..j
    const w: number[][] = Array(n + 2).fill(null)
        .map(() => Array(n + 1).fill(0));

    // root[i][j] = root of optimal subtree for keys i..j
    const root: number[][] = Array(n + 1).fill(null)
        .map(() => Array(n + 1).fill(0));

    // Base case: empty subtrees
    for (let i = 1; i <= n + 1; i++) {
        e[i][i - 1] = q[i - 1];
        w[i][i - 1] = q[i - 1];
    }

    // Fill tables for increasing subtree sizes
    for (let len = 1; len <= n; len++) {
        for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;

            e[i][j] = Infinity;
            w[i][j] = w[i][j - 1] + p[j] + q[j];

            // Try each key as root
            for (let r = i; r <= j; r++) {
                const cost = e[i][r - 1] + e[r + 1][j] + w[i][j];

                if (cost < e[i][j]) {
                    e[i][j] = cost;
                    root[i][j] = r;
                }
            }
        }
    }

    return { cost: e[1][n], root };
}

function buildTree(root: number[][], i: number, j: number): TreeNode | null {
    if (i > j) return null;

    const r = root[i][j];
    return {
        key: r,
        left: buildTree(root, i, r - 1),
        right: buildTree(root, r + 1, j)
    };
}
```

## Knuth's Optimization

**Observation** (Knuth, 1971): The optimal root $r[i,j]$ satisfies:
$$r[i,j-1] \leq r[i,j] \leq r[i+1,j]$$

This monotonicity allows us to reduce the search range for each subproblem.

```typescript
function optimalBSTKnuth(p: number[], q: number[], n: number): number {
    const e: number[][] = /* ... */;
    const root: number[][] = /* ... */;

    // Initialize root[i][i] = i
    for (let i = 1; i <= n; i++) {
        root[i][i] = i;
    }

    for (let len = 2; len <= n; len++) {
        for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;

            // Search only in range [root[i][j-1], root[i+1][j]]
            for (let r = root[i][j - 1]; r <= root[i + 1][j]; r++) {
                const cost = e[i][r - 1] + e[r + 1][j] + w[i][j];
                if (cost < e[i][j]) {
                    e[i][j] = cost;
                    root[i][j] = r;
                }
            }
        }
    }

    return e[1][n];
}
```

**Time complexity**: $O(n^2)$ with Knuth's optimization (down from $O(n^3)$).

## Static vs Dynamic

Optimal BST assumes static frequencies—they don't change over time. For dynamic access patterns:

**Splay trees**: Self-adjusting; recently accessed near root.

**Treaps**: Randomized; expected $O(\log n)$ operations.

**Weight-balanced trees**: Maintain balance based on subtree sizes.

## Applications

**Compiler symbol tables**: Frequently used identifiers near root for faster lookup.

**Database indexing**: Optimize B-tree for known query distribution.

**Huffman coding**: Similar structure for prefix-free codes (greedy, not DP).

**Text compression**: Optimal prefix codes for character frequencies.

## Key Takeaways

- Optimal BST minimizes expected search cost given access frequencies
- Structure similar to matrix chain multiplication but with probability weights
- Basic DP: $O(n^3)$; Knuth's optimization: $O(n^2)$
- Monotonicity of optimal roots enables significant speedup
- Practical when access patterns are known and relatively stable
