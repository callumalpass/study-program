---
title: "Pivoting Strategies"
description: "Comprehensive guide to pivoting strategies with theoretical foundations and Python implementations"
---

# Pivoting Strategies

Pivoting is a crucial technique in numerical linear algebra that addresses numerical instability in Gaussian elimination and related algorithms. While Gaussian elimination is theoretically sound, in finite-precision arithmetic, small pivot elements can amplify rounding errors catastrophically. Pivoting strategies systematically reorder equations or variables to select larger pivots, dramatically improving numerical stability.

The need for pivoting arises from a fundamental tension: mathematically, any non-zero pivot allows elimination to proceed, but numerically, dividing by very small numbers magnifies errors. Pivoting resolves this by exchanging rows (partial pivoting) or both rows and columns (complete pivoting) to bring larger elements into the pivot position.

## Why Pivoting is Necessary

Consider solving the system with $\epsilon = 10^{-20}$:
$$\begin{bmatrix} \epsilon & 1 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$$

**Without pivoting** (in 3-digit arithmetic):

The multiplier is $m_{21} = \frac{1}{\epsilon} = 10^{20}$, which is huge. The second row becomes:
$$[1, 1, 2] - 10^{20}[\epsilon, 1, 1] \approx [0, -10^{20}, -10^{20}]$$

This gives $x_2 \approx 1$ and $x_1 \approx 0$, but the exact solution is approximately $x_1 \approx 1, x_2 \approx 1$.

**With pivoting:**

Exchange rows first:
$$\begin{bmatrix} 1 & 1 \\ \epsilon & 1 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

Now $m_{21} = \epsilon \approx 0$, and the elimination is numerically stable, giving the correct answer.

## Partial Pivoting

Partial pivoting (also called row pivoting) is the most commonly used strategy. At stage $k$, we select the row with the largest absolute value in column $k$ (at or below the diagonal) and exchange it with row $k$.

### Algorithm

At elimination stage $k$:

1. Find the pivot row: $p = \arg\max_{i \geq k} |a_{ik}^{(k)}|$
2. Exchange rows $k$ and $p$
3. Proceed with elimination using $a_{kk}^{(k)}$ as the pivot

This ensures $|m_{ik}| = \left|\frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}\right| \leq 1$ for all $i > k$, bounding the multipliers and preventing exponential error growth.

### PLU Decomposition

With partial pivoting, the factorization becomes:
$$PA = LU$$

where $P$ is a **permutation matrix** representing the row exchanges. Each row exchange multiplies $P$ by an elementary permutation matrix.

In practice, $P$ is often stored as a permutation vector rather than a full matrix, recording which original row is in each position.

## Complete Pivoting

Complete pivoting (also called full pivoting) searches for the largest element in the entire remaining submatrix and exchanges both rows and columns to bring it to the pivot position.

### Algorithm

At stage $k$:

1. Find $(p, q) = \arg\max_{i,j \geq k} |a_{ij}^{(k)}|$
2. Exchange rows $k$ and $p$
3. Exchange columns $k$ and $q$
4. Proceed with elimination

This produces a factorization:
$$PAQ = LU$$

where $P$ permutes rows and $Q$ permutes columns.

### Comparison: Partial vs Complete

**Partial Pivoting:**
- Cost: $O(n)$ comparisons per stage
- Total overhead: $O(n^2)$
- Very effective in practice
- Preserves the order of variables

**Complete Pivoting:**
- Cost: $O(n^2)$ comparisons per stage
- Total overhead: $O(n^3)$
- Theoretically more stable
- Reorders variables (must track column exchanges)

In practice, partial pivoting is almost always sufficient. Complete pivoting is rarely needed except for pathological matrices specifically constructed to defeat partial pivoting.

## Worked Example: Partial Pivoting

Solve using partial pivoting:
$$\begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \\ 3 & 4 & 6 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} 6 \\ 9 \\ 13 \end{bmatrix}$$

**Stage 1:**

Column 1 values: $|1| = 1, |2| = 2, |3| = 3$. Largest is row 3, so exchange rows 1 and 3:
$$\begin{bmatrix} 3 & 4 & 6 & | & 13 \\ 2 & 3 & 4 & | & 9 \\ 1 & 2 & 3 & | & 6 \end{bmatrix}$$

Compute multipliers: $m_{21} = \frac{2}{3}, m_{31} = \frac{1}{3}$

After elimination:
$$\begin{bmatrix} 3 & 4 & 6 & | & 13 \\ 0 & \frac{1}{3} & 0 & | & \frac{1}{3} \\ 0 & \frac{2}{3} & 1 & | & \frac{5}{3} \end{bmatrix}$$

**Stage 2:**

Column 2 values (below diagonal): $|\frac{1}{3}| = \frac{1}{3}, |\frac{2}{3}| = \frac{2}{3}$. Largest is row 3, so exchange rows 2 and 3:
$$\begin{bmatrix} 3 & 4 & 6 & | & 13 \\ 0 & \frac{2}{3} & 1 & | & \frac{5}{3} \\ 0 & \frac{1}{3} & 0 & | & \frac{1}{3} \end{bmatrix}$$

Compute multiplier: $m_{32} = \frac{1/3}{2/3} = \frac{1}{2}$

After elimination:
$$\begin{bmatrix} 3 & 4 & 6 & | & 13 \\ 0 & \frac{2}{3} & 1 & | & \frac{5}{3} \\ 0 & 0 & -\frac{1}{2} & | & -\frac{1}{2} \end{bmatrix}$$

**Back substitution:**

$x_3 = \frac{-1/2}{-1/2} = 1$

$x_2 = \frac{3}{2}(\frac{5}{3} - 1 \cdot 1) = \frac{3}{2} \cdot \frac{2}{3} = 1$

$x_1 = \frac{1}{3}(13 - 4 \cdot 1 - 6 \cdot 1) = \frac{1}{3} \cdot 3 = 1$

**Solution:** $x = [1, 1, 1]^T$

The permutation vector is $P = [3, 2, 1]$ (row 3 moved to position 1, row 2 to position 2 after second exchange, row 1 to position 3).

## Growth Factor

The effectiveness of pivoting is measured by the **growth factor**:
$$\rho = \frac{\max_{i,j,k} |a_{ij}^{(k)}|}{\max_{i,j} |a_{ij}|}$$

This ratio compares the largest element appearing during elimination to the largest element in the original matrix.

**For partial pivoting:**
- Theoretical worst case: $\rho = 2^{n-1}$ (exponential growth)
- Practical reality: $\rho$ is usually small (often $< 10$)
- Worst-case matrices are extremely rare in practice

**For complete pivoting:**
- Theoretical bound: $\rho \leq n^{1/2} (2 \cdot 3^{1/2} \cdot 4^{1/3} \cdots n^{1/(n-1)})^{1/2}$
- Much better than partial pivoting in theory
- Growth is very slow in practice

## Scaled Partial Pivoting

A refinement of partial pivoting that accounts for the scale of each equation. Instead of choosing the largest pivot in absolute value, we choose the largest **relative** to the row's maximum element.

### Algorithm

Define scale factors: $s_i = \max_j |a_{ij}|$ for each row $i$.

At stage $k$, choose pivot row: $p = \arg\max_{i \geq k} \frac{|a_{ik}^{(k)}|}{s_i}$

This prevents pivoting from being fooled by equations with vastly different magnitudes.

## Key Takeaways

- Pivoting improves numerical stability by avoiding small pivot elements that amplify rounding errors
- Partial pivoting ensures all multipliers satisfy $|m_{ik}| \leq 1$, preventing unbounded error growth
- The factorization with partial pivoting is $PA = LU$ where $P$ is a permutation matrix
- Complete pivoting searches the entire remaining submatrix but is rarely needed in practice
- Partial pivoting adds $O(n^2)$ overhead to Gaussian elimination, while complete pivoting adds $O(n^3)$
- The growth factor $\rho$ measures element growth during elimination; partial pivoting keeps $\rho$ small in practice despite exponential worst-case bounds
- Scaled partial pivoting is useful when equations have very different magnitudes

## Common Mistakes

**Pivoting only when encountering a zero pivot:** Pivoting should be applied throughout the algorithm, not just when absolutely necessary. Even a small but non-zero pivot (like $10^{-15}$) can cause severe numerical instability. Always use a pivoting strategy from the start.

**Comparing pivot candidates incorrectly:** When finding the maximum element in a column, you must search from the current row downward ($i \geq k$), not the entire column. Pivoting above the current row would undo previous elimination steps.

**Forgetting to exchange right-hand side:** When exchanging rows of the coefficient matrix, the corresponding entries of the right-hand side vector must also be exchanged. Failing to do this produces an incorrect system.

**Not tracking permutations properly:** The permutation matrix (or vector) must be updated each time rows are exchanged. If solving multiple systems with the same coefficient matrix, the same permutation sequence must be applied to each right-hand side.

**Using complete pivoting unnecessarily:** Complete pivoting's $O(n^3)$ overhead makes it as expensive as the elimination itself. It's almost never worth the cost, as partial pivoting works excellently in practice. Only use complete pivoting for specially structured problems where you know partial pivoting fails.
