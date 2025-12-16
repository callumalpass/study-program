# Computing Inverses Using the Adjugate Matrix

The adjugate (or classical adjoint) matrix provides an explicit formula for computing matrix inverses using determinants and cofactors. While not the most efficient computational method, it offers deep theoretical insight and works well for small matrices and symbolic computation.

## The Adjugate Matrix

**Definition**: The **adjugate** of a square matrix $A$, denoted $\text{adj}(A)$, is the transpose of the cofactor matrix.

$$\text{adj}(A) = C^T$$

where $C$ is the matrix of cofactors: $C_{ij} = (-1)^{i+j}M_{ij}$.

### Construction Process

1. Compute all cofactors $C_{ij}$ of matrix $A$
2. Form the cofactor matrix $C = [C_{ij}]$
3. Transpose: $\text{adj}(A) = C^T$

**Note**: The adjugate is sometimes called the "classical adjoint" or "adjunct," but "adjugate" is the preferred modern term to avoid confusion with the Hermitian adjoint.

## The Inverse Formula

For an invertible matrix $A$ (i.e., $\det(A) \neq 0$):

$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$

This gives an explicit formula for the inverse in terms of determinants and cofactors.

## Example: 2×2 Matrix

Find the inverse of $A = \begin{bmatrix} 3 & 5 \\ 2 & 4 \end{bmatrix}$

**Step 1**: Compute $\det(A)$.
$$\det(A) = (3)(4) - (5)(2) = 12 - 10 = 2$$

Since $\det(A) \neq 0$, the matrix is invertible.

**Step 2**: Compute the four cofactors.

$$C_{11} = (-1)^{1+1}M_{11} = (+1)(4) = 4$$
$$C_{12} = (-1)^{1+2}M_{12} = (-1)(2) = -2$$
$$C_{21} = (-1)^{2+1}M_{21} = (-1)(5) = -5$$
$$C_{22} = (-1)^{2+2}M_{22} = (+1)(3) = 3$$

**Step 3**: Form the cofactor matrix.
$$C = \begin{bmatrix} 4 & -2 \\ -5 & 3 \end{bmatrix}$$

**Step 4**: Transpose to get the adjugate.
$$\text{adj}(A) = C^T = \begin{bmatrix} 4 & -5 \\ -2 & 3 \end{bmatrix}$$

**Step 5**: Apply the inverse formula.
$$A^{-1} = \frac{1}{2}\begin{bmatrix} 4 & -5 \\ -2 & 3 \end{bmatrix} = \begin{bmatrix} 2 & -5/2 \\ -1 & 3/2 \end{bmatrix}$$

**Verification**:
$$AA^{-1} = \begin{bmatrix} 3 & 5 \\ 2 & 4 \end{bmatrix}\begin{bmatrix} 2 & -5/2 \\ -1 & 3/2 \end{bmatrix} = \begin{bmatrix} 6-5 & -15/2+15/2 \\ 4-4 & -5+6 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$ ✓

### Special Formula for 2×2 Matrices

For a 2×2 matrix, the adjugate has a simple pattern:

$$A = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \implies \text{adj}(A) = \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

Therefore:
$$A^{-1} = \frac{1}{ad-bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

**Pattern**: Swap the diagonal elements, negate the off-diagonal elements, and divide by the determinant.

## Example: 3×3 Matrix

Find the inverse of $A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix}$

**Step 1**: Compute $\det(A)$ (expanding along row 1).
$$\det(A) = 1\det\begin{bmatrix} 1 & 4 \\ 6 & 0 \end{bmatrix} - 2\det\begin{bmatrix} 0 & 4 \\ 5 & 0 \end{bmatrix} + 3\det\begin{bmatrix} 0 & 1 \\ 5 & 6 \end{bmatrix}$$

$$= 1(0-24) - 2(0-20) + 3(0-5) = -24 + 40 - 15 = 1$$

**Step 2**: Compute all nine cofactors.

$$C_{11} = (+1)\det\begin{bmatrix} 1 & 4 \\ 6 & 0 \end{bmatrix} = -24$$

$$C_{12} = (-1)\det\begin{bmatrix} 0 & 4 \\ 5 & 0 \end{bmatrix} = -(-20) = 20$$

$$C_{13} = (+1)\det\begin{bmatrix} 0 & 1 \\ 5 & 6 \end{bmatrix} = -5$$

$$C_{21} = (-1)\det\begin{bmatrix} 2 & 3 \\ 6 & 0 \end{bmatrix} = -(-18) = 18$$

$$C_{22} = (+1)\det\begin{bmatrix} 1 & 3 \\ 5 & 0 \end{bmatrix} = -15$$

$$C_{23} = (-1)\det\begin{bmatrix} 1 & 2 \\ 5 & 6 \end{bmatrix} = -(6-10) = 4$$

$$C_{31} = (+1)\det\begin{bmatrix} 2 & 3 \\ 1 & 4 \end{bmatrix} = 8-3 = 5$$

$$C_{32} = (-1)\det\begin{bmatrix} 1 & 3 \\ 0 & 4 \end{bmatrix} = -4$$

$$C_{33} = (+1)\det\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} = 1$$

**Step 3**: Form the cofactor matrix.
$$C = \begin{bmatrix} -24 & 20 & -5 \\ 18 & -15 & 4 \\ 5 & -4 & 1 \end{bmatrix}$$

**Step 4**: Transpose to get the adjugate.
$$\text{adj}(A) = C^T = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix}$$

**Step 5**: Apply the formula (since $\det(A) = 1$).
$$A^{-1} = \frac{1}{1}\begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix} = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix}$$

**Verification** (checking first row of $AA^{-1}$):
$$\begin{bmatrix} 1 & 2 & 3 \end{bmatrix}\begin{bmatrix} -24 \\ 20 \\ -5 \end{bmatrix} = -24 + 40 - 15 = 1$$ ✓

## The Adjugate-Determinant Relationship

A fundamental identity connects the adjugate and determinant:

$$A \cdot \text{adj}(A) = \text{adj}(A) \cdot A = \det(A) \cdot I$$

This identity holds for **any** square matrix, even singular ones.

### Proof Sketch for One Entry

Consider the $(i,j)$ entry of $A \cdot \text{adj}(A)$:

$$(A \cdot \text{adj}(A))_{ij} = \sum_{k=1}^{n} a_{ik}[\text{adj}(A)]_{kj} = \sum_{k=1}^{n} a_{ik}C_{jk}$$

**When $i = j$**: This sum is the cofactor expansion of $\det(A)$ along row $i$, so the result is $\det(A)$.

**When $i \neq j$**: This sum equals the determinant of a matrix with two identical rows (row $i$ and row $j$), which is zero.

Therefore: $(A \cdot \text{adj}(A))_{ij} = \begin{cases} \det(A) & \text{if } i=j \\ 0 & \text{if } i \neq j \end{cases} = \det(A) \cdot I_{ij}$

## Singular Matrices

When $\det(A) = 0$, the matrix is not invertible, but we can still compute $\text{adj}(A)$.

The identity $A \cdot \text{adj}(A) = 0 \cdot I = 0$ tells us that every column of $\text{adj}(A)$ is in the null space of $A$.

### Example: Singular Matrix

$$A = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$$

$$\det(A) = 4 - 4 = 0$$

Compute the adjugate anyway:
$$C_{11} = 2, \quad C_{12} = -1, \quad C_{21} = -4, \quad C_{22} = 2$$

$$\text{adj}(A) = \begin{bmatrix} 2 & -4 \\ -1 & 2 \end{bmatrix}$$

Verify the identity:
$$A \cdot \text{adj}(A) = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} 2 & -4 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} = 0 \cdot I$$ ✓

## Computational Comparison

**Adjugate method**:
- Requires computing $n^2$ cofactors, each involving an $(n-1) \times (n-1)$ determinant
- Complexity: $O(n \cdot n!)$ operations (very expensive)
- Plus one $n \times n$ determinant: $O(n!)$ operations

**Row reduction method** (Gauss-Jordan):
- Augment $[A \mid I]$ and row reduce to $[I \mid A^{-1}]$
- Complexity: $O(n^3)$ operations

**For a 4×4 matrix**:
- Adjugate: ~600 operations
- Row reduction: ~64 operations

The adjugate method is practical only for small matrices (2×2, 3×3) or symbolic computation.

## When to Use the Adjugate Method

**Advantages**:
- Explicit formula for the inverse
- Good for theoretical proofs
- Useful for symbolic matrices with parameters
- Natural for small matrices (especially 2×2)

**Disadvantages**:
- Computationally expensive for large matrices
- Numerically unstable
- Requires many determinant calculations

**Best applications**:
- 2×2 and 3×3 matrices
- Symbolic/parametric matrices
- Theoretical derivations
- When you need the determinant anyway

## Connection to Cramer's Rule

The adjugate formula for the inverse connects directly to Cramer's Rule.

If $A\mathbf{x} = \mathbf{b}$ and $A$ is invertible:
$$\mathbf{x} = A^{-1}\mathbf{b} = \frac{1}{\det(A)}\text{adj}(A) \cdot \mathbf{b}$$

The $i$-th component is:
$$x_i = \frac{1}{\det(A)}\sum_{j=1}^{n} C_{ji}b_j$$

This sum is precisely the cofactor expansion of $\det(A_i)$ along the $i$-th column, giving Cramer's formula:
$$x_i = \frac{\det(A_i)}{\det(A)}$$

## Summary

- The **adjugate** is the transpose of the cofactor matrix: $\text{adj}(A) = C^T$
- **Inverse formula**: $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$ when $\det(A) \neq 0$
- **2×2 shortcut**: Swap diagonal, negate off-diagonal, divide by determinant
- **Fundamental identity**: $A \cdot \text{adj}(A) = \det(A) \cdot I$ for any square matrix
- **Computation**: Calculate all cofactors, form matrix, transpose, divide by $\det(A)$
- **Complexity**: $O(n \cdot n!)$ vs $O(n^3)$ for row reduction
- **Best for**: Small matrices, symbolic computation, theoretical analysis
- **Connection**: Provides explicit formulas that underlie Cramer's Rule
