---
title: "Cholesky Factorization"
description: "Comprehensive guide to cholesky factorization with theoretical foundations and Python implementations"
---

# Cholesky Factorization

Cholesky factorization is a specialized and highly efficient matrix decomposition for symmetric positive definite matrices. For such matrices, we can factor $A = LL^T$ where $L$ is a lower triangular matrix with positive diagonal entries. This factorization requires only half the storage and computation of standard LU decomposition, making it invaluable for large-scale problems in optimization, statistics, and finite element analysis.

The existence of Cholesky factorization is guaranteed for symmetric positive definite matrices, and the factorization is unique when we require positive diagonal entries. This special structure arises naturally in many applications, particularly in least squares problems, where the normal equations $A^T A x = A^T b$ always produce a symmetric positive definite coefficient matrix.

## Symmetric Positive Definite Matrices

A matrix $A$ is **symmetric positive definite** (SPD) if:

1. $A = A^T$ (symmetry)
2. $x^T A x > 0$ for all non-zero vectors $x$ (positive definiteness)

**Equivalent characterizations:**
- All eigenvalues of $A$ are positive
- All leading principal minors are positive
- $A$ can be written as $A = B^T B$ for some non-singular matrix $B$

Common sources of SPD matrices include:
- Normal equations in least squares: $A^T A$
- Covariance matrices in statistics
- Stiffness matrices in structural mechanics
- Kernel matrices in machine learning

## The Cholesky Factorization

For an SPD matrix $A$, the Cholesky factorization is:
$$A = LL^T$$

where $L$ is lower triangular with positive diagonal entries. This is essentially an LU factorization with $U = L^T$.

### Cholesky Algorithm

The algorithm computes $L$ column by column. For $j = 1, 2, \ldots, n$:

**Diagonal entry:**
$$l_{jj} = \sqrt{a_{jj} - \sum_{k=1}^{j-1} l_{jk}^2}$$

**Below diagonal ($i > j$):**
$$l_{ij} = \frac{1}{l_{jj}} \left( a_{ij} - \sum_{k=1}^{j-1} l_{ik} l_{jk} \right)$$

The square root in the diagonal formula is always real and positive because $A$ is positive definite.

### Computational Cost

The operation count for Cholesky factorization is approximately:
$$\frac{n^3}{3} \text{ operations}$$

This is **half** the cost of LU decomposition ($\frac{2n^3}{3}$), because we exploit symmetry and compute only $L$ instead of both $L$ and $U$.

Additionally, Cholesky requires only $\frac{n(n+1)}{2}$ storage locations (the lower triangle) compared to $n^2$ for general LU.

## Worked Example

Factor the matrix:
$$A = \begin{bmatrix} 4 & 2 & 2 \\ 2 & 5 & 1 \\ 2 & 1 & 6 \end{bmatrix}$$

First, verify $A$ is symmetric (clearly true) and check positive definiteness by computing leading principal minors:
- $\det(A_1) = 4 > 0$
- $\det(A_2) = 4 \cdot 5 - 2 \cdot 2 = 16 > 0$
- $\det(A_3) = 4(30-1) - 2(12-2) + 2(2-10) = 116 - 20 - 16 = 80 > 0$

All positive, so Cholesky factorization exists.

**Step 1: First column**

$$l_{11} = \sqrt{a_{11}} = \sqrt{4} = 2$$
$$l_{21} = \frac{a_{21}}{l_{11}} = \frac{2}{2} = 1$$
$$l_{31} = \frac{a_{31}}{l_{11}} = \frac{2}{2} = 1$$

**Step 2: Second column**

$$l_{22} = \sqrt{a_{22} - l_{21}^2} = \sqrt{5 - 1^2} = \sqrt{4} = 2$$
$$l_{32} = \frac{1}{l_{22}}(a_{32} - l_{31}l_{21}) = \frac{1}{2}(1 - 1 \cdot 1) = 0$$

**Step 3: Third column**

$$l_{33} = \sqrt{a_{33} - l_{31}^2 - l_{32}^2} = \sqrt{6 - 1 - 0} = \sqrt{5}$$

**Result:**
$$L = \begin{bmatrix} 2 & 0 & 0 \\ 1 & 2 & 0 \\ 1 & 0 & \sqrt{5} \end{bmatrix}$$

**Verification:**
$$LL^T = \begin{bmatrix} 2 & 0 & 0 \\ 1 & 2 & 0 \\ 1 & 0 & \sqrt{5} \end{bmatrix} \begin{bmatrix} 2 & 1 & 1 \\ 0 & 2 & 0 \\ 0 & 0 & \sqrt{5} \end{bmatrix} = \begin{bmatrix} 4 & 2 & 2 \\ 2 & 5 & 1 \\ 2 & 1 & 6 \end{bmatrix} = A$$

## Solving Systems with Cholesky

To solve $Ax = b$ where $A = LL^T$:

1. **Forward substitution**: Solve $Ly = b$ for $y$
2. **Back substitution**: Solve $L^T x = y$ for $x$

**Example:** Solve $Ax = b$ with the above $L$ and $b = [8, 8, 9]^T$

Forward substitution ($Ly = b$):
$$y_1 = \frac{8}{2} = 4$$
$$y_2 = \frac{8 - 1(4)}{2} = 2$$
$$y_3 = \frac{9 - 1(4) - 0(2)}{\sqrt{5}} = \frac{5}{\sqrt{5}} = \sqrt{5}$$

Back substitution ($L^T x = y$):
$$x_3 = \frac{\sqrt{5}}{\sqrt{5}} = 1$$
$$x_2 = \frac{2 - 0(1)}{2} = 1$$
$$x_1 = \frac{4 - 1(1) - 1(1)}{2} = 1$$

**Solution:** $x = [1, 1, 1]^T$

## Numerical Stability

Cholesky factorization is **numerically stable** for SPD matrices. Unlike LU decomposition, it does not require pivoting because:

1. All pivot elements $l_{jj}$ are guaranteed to be positive (from positive definiteness)
2. The factorization naturally produces bounded multipliers
3. No element growth occurs during the algorithm

If the algorithm encounters a non-positive value under a square root, the matrix is not positive definite, and the factorization fails gracefully.

## Modified Cholesky for Stability

For matrices that are nearly singular or only semi-definite, the **modified Cholesky** algorithm adds small perturbations to ensure numerical stability:

$$A + E = LL^T$$

where $E$ is a small diagonal matrix chosen to guarantee positive definiteness. This is useful in optimization when the Hessian matrix is theoretically SPD but numerically unreliable.

## Cholesky-Banachiewicz vs Cholesky-Crout

There are two common variants:

**Cholesky-Banachiewicz** (row-oriented):
- Computes $L$ row by row
- Formula: $l_{ij} = \frac{1}{l_{jj}}(a_{ij} - \sum_{k=1}^{j-1} l_{ik}l_{jk})$

**Cholesky-Crout** (column-oriented):
- Computes $L$ column by column (shown earlier)
- Better for modern cache architectures

Both produce the same result but differ in memory access patterns, affecting performance on modern computers.

## Key Takeaways

- Cholesky factorization applies only to symmetric positive definite matrices, factoring $A = LL^T$
- The algorithm requires $\frac{n^3}{3}$ operations, half the cost of LU decomposition
- Only the lower triangle needs to be stored, requiring $\frac{n(n+1)}{2}$ storage
- No pivoting is needed; the factorization is numerically stable for SPD matrices
- Failure of the algorithm (negative value under square root) indicates the matrix is not positive definite
- Applications include solving least squares normal equations, computing matrix determinants, and sampling from multivariate Gaussian distributions
- The factorization is unique when diagonal entries are required to be positive

## Common Mistakes

**Applying Cholesky to non-SPD matrices:** Cholesky factorization only works for symmetric positive definite matrices. Applying it to a general matrix, even if symmetric, will fail if the matrix has non-positive eigenvalues. Always verify positive definiteness first, either by checking leading principal minors or attempting the factorization and checking for breakdowns.

**Ignoring symmetry in storage:** When implementing Cholesky, you should exploit symmetry by storing only the lower triangle of $A$. Storing the full matrix wastes half your memory. Similarly, don't compute the upper triangle of $L$ since it's all zeros.

**Forgetting the square root:** The diagonal entries require a square root computation: $l_{jj} = \sqrt{\cdots}$. Forgetting this is a common error that produces incorrect results. Remember that $L$ is not unit lower triangular like in standard LU decomposition.

**Not checking for numerical breakdown:** Even if a matrix is theoretically SPD, rounding errors can cause the argument of a square root to become slightly negative. Always check that the value under the square root is positive before computing it, and handle near-zero or negative values appropriately.

**Using Cholesky when solving only once:** While Cholesky is efficient, for a single solve of $Ax = b$, consider whether the overhead of verifying positive definiteness is worth it. For one-time solves without guaranteed SPD structure, standard LU with partial pivoting might be simpler and equally fast.
