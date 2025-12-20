---
title: "LU Decomposition"
description: "Comprehensive guide to lu decomposition with theoretical foundations and Python implementations"
---

# LU Decomposition

LU decomposition is one of the most important matrix factorizations in numerical linear algebra. It factors a square matrix $A$ into the product of a lower triangular matrix $L$ and an upper triangular matrix $U$, such that $A = LU$. This factorization is particularly valuable because once computed, it can be used to efficiently solve multiple systems with the same coefficient matrix but different right-hand sides.

The connection between LU decomposition and Gaussian elimination is fundamental: the $L$ matrix records the multipliers used during elimination, while $U$ is the resulting upper triangular matrix. This insight transforms Gaussian elimination from a one-time algorithm into a reusable factorization, making it essential for applications requiring repeated solutions.

## The LU Factorization

For an $n \times n$ matrix $A$, we seek matrices $L$ and $U$ such that:
$$A = LU$$

where $L$ is lower triangular with ones on the diagonal (unit lower triangular), and $U$ is upper triangular.

### Doolittle's Method

The most common algorithm is Doolittle's method, which computes $L$ and $U$ simultaneously. For each row $i$ and column $j$:

**For $U$ (upper triangular part, $i \leq j$):**
$$u_{ij} = a_{ij} - \sum_{k=1}^{i-1} l_{ik} u_{kj}$$

**For $L$ (lower triangular part, $i > j$):**
$$l_{ij} = \frac{1}{u_{jj}} \left( a_{ij} - \sum_{k=1}^{j-1} l_{ik} u_{kj} \right)$$

The diagonal entries of $L$ are always 1, by convention.

### Connection to Gaussian Elimination

LU decomposition is essentially Gaussian elimination with bookkeeping. When we eliminate $a_{ij}$ using the multiplier:
$$m_{ij} = \frac{a_{ij}}{a_{jj}}$$

this multiplier becomes $l_{ij}$ in the $L$ matrix. The final upper triangular form after elimination is the $U$ matrix.

## Solving Linear Systems with LU

Once $A = LU$ is computed, solving $Ax = b$ becomes a two-step process:

1. **Forward substitution**: Solve $Ly = b$ for $y$
2. **Back substitution**: Solve $Ux = y$ for $x$

Since $Ax = LUx = L(Ux) = Ly = b$, this gives the correct solution.

**Cost Analysis:**
- LU factorization: $\frac{2n^3}{3}$ operations (same as Gaussian elimination)
- Each forward/back substitution: $n^2$ operations
- Solving $k$ systems: $\frac{2n^3}{3} + 2kn^2$ operations

For $k > 1$, this is much more efficient than applying Gaussian elimination $k$ times, which would cost $\frac{2kn^3}{3}$ operations.

## Worked Example

Factor the matrix:
$$A = \begin{bmatrix} 4 & 3 & 0 \\ 8 & 10 & 2 \\ 0 & 6 & 5 \end{bmatrix}$$

**Step 1: First column of L and first row of U**

For $U$: First row of $U$ equals first row of $A$:
$$u_{11} = 4, \quad u_{12} = 3, \quad u_{13} = 0$$

For $L$: First column below diagonal:
$$l_{21} = \frac{a_{21}}{u_{11}} = \frac{8}{4} = 2$$
$$l_{31} = \frac{a_{31}}{u_{11}} = \frac{0}{4} = 0$$

**Step 2: Second column of L and second row of U**

For $U$: Second row, starting from diagonal:
$$u_{22} = a_{22} - l_{21} u_{12} = 10 - 2(3) = 4$$
$$u_{23} = a_{23} - l_{21} u_{13} = 2 - 2(0) = 2$$

For $L$: Second column below diagonal:
$$l_{32} = \frac{1}{u_{22}} (a_{32} - l_{31} u_{12}) = \frac{1}{4} (6 - 0 \cdot 3) = \frac{3}{2}$$

**Step 3: Third column (just U)**

$$u_{33} = a_{33} - l_{31} u_{13} - l_{32} u_{23} = 5 - 0(0) - \frac{3}{2}(2) = 2$$

**Result:**
$$L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 0 & \frac{3}{2} & 1 \end{bmatrix}, \quad U = \begin{bmatrix} 4 & 3 & 0 \\ 0 & 4 & 2 \\ 0 & 0 & 2 \end{bmatrix}$$

**Verification:**
$$LU = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 0 & \frac{3}{2} & 1 \end{bmatrix} \begin{bmatrix} 4 & 3 & 0 \\ 0 & 4 & 2 \\ 0 & 0 & 2 \end{bmatrix} = \begin{bmatrix} 4 & 3 & 0 \\ 8 & 10 & 2 \\ 0 & 6 & 5 \end{bmatrix} = A$$

## Example: Solving Multiple Systems

Using the same $A$ and LU factorization, solve $Ax = b_1$ and $Ax = b_2$ where:
$$b_1 = \begin{bmatrix} 7 \\ 20 \\ 11 \end{bmatrix}, \quad b_2 = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$$

**System 1: Solve $Ax = b_1$**

Forward substitution ($Ly = b_1$):
$$y_1 = 7$$
$$y_2 = 20 - 2(7) = 6$$
$$y_3 = 11 - 0(7) - \frac{3}{2}(6) = 2$$

Back substitution ($Ux = y$):
$$x_3 = \frac{2}{2} = 1$$
$$x_2 = \frac{6 - 2(1)}{4} = 1$$
$$x_1 = \frac{7 - 3(1) - 0(1)}{4} = 1$$

**Solution:** $x = [1, 1, 1]^T$

**System 2: Solve $Ax = b_2$** (using same LU factorization)

Forward substitution ($Ly = b_2$):
$$y_1 = 1, \quad y_2 = 2 - 2(1) = 0, \quad y_3 = 3 - 0 - \frac{3}{2}(0) = 3$$

Back substitution:
$$x_3 = \frac{3}{2}, \quad x_2 = \frac{0 - 2(\frac{3}{2})}{4} = -\frac{3}{4}, \quad x_1 = \frac{1 - 3(-\frac{3}{4}) - 0}{4} = \frac{13}{16}$$

**Solution:** $x = [\frac{13}{16}, -\frac{3}{4}, \frac{3}{2}]^T$

## Existence and Uniqueness

LU factorization exists and is unique under certain conditions:

**Theorem:** If all leading principal minors of $A$ are non-zero, then $A$ has a unique LU factorization with $L$ unit lower triangular.

The leading principal minors are the determinants of the upper-left $k \times k$ submatrices for $k = 1, 2, \ldots, n$. This condition ensures that no zero pivots are encountered during the factorization process.

If a zero pivot is encountered, LU factorization may still exist with row exchanges, leading to **PLU decomposition** where $P$ is a permutation matrix: $PA = LU$.

## Key Takeaways

- LU decomposition factors $A = LU$ where $L$ is unit lower triangular and $U$ is upper triangular
- The factorization costs $\frac{2n^3}{3}$ operations, the same as Gaussian elimination, but enables efficient solution of multiple systems
- Solving $k$ systems with the same coefficient matrix costs $\frac{2n^3}{3} + 2kn^2$ instead of $\frac{2kn^3}{3}$ for repeated Gaussian elimination
- The $L$ matrix stores the multipliers from Gaussian elimination, while $U$ is the upper triangular result
- LU factorization exists and is unique when all leading principal minors are non-zero
- The method is equivalent to Gaussian elimination without row exchanges

## Common Mistakes

**Computing the full factorization when only solving once:** If you only need to solve $Ax = b$ for a single right-hand side, Gaussian elimination is simpler and equally efficient. LU decomposition's advantage only appears when solving multiple systems with the same $A$.

**Incorrect indexing in the formulas:** The formulas for $l_{ij}$ and $u_{ij}$ involve sums up to $k < \min(i,j)$. Using the wrong upper limit or forgetting to exclude the current index leads to errors. Always verify that you're summing over previously computed entries only.

**Forgetting the unit diagonal of L:** By convention, $L$ has ones on the diagonal ($l_{ii} = 1$). Some students mistakenly compute diagonal entries for $L$, which leads to an overdetermined system. The unit diagonal is a normalization choice that makes the factorization unique.

**Not checking for zero pivots:** LU decomposition will fail if $u_{jj} = 0$ during computation, as you need to divide by this value to compute $l_{ij}$. Always check for zero or near-zero pivots and use pivoting strategies when necessary.

**Assuming all matrices have LU factorization:** Not all matrices can be factored as $A = LU$ without row exchanges. For example, $\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}$ has no LU factorization because the first pivot is zero. However, with pivoting (PLU decomposition), the factorization exists.
