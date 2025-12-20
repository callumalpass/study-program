---
id: math201-t5-properties
title: "Properties of Determinants"
order: 3
---

# Properties of Determinants

Determinants have elegant algebraic properties that make them easier to compute and understand. These properties reveal deep connections between matrix operations and their geometric interpretations.

## Effect of Elementary Row Operations

Elementary row operations change the determinant in predictable ways. Understanding these effects allows us to simplify determinant calculations dramatically.

### Property 1: Row Swap Changes Sign

Swapping two rows of a matrix **negates** the determinant.

$$\text{If } B \text{ is obtained from } A \text{ by swapping two rows, then } \det(B) = -\det(A)$$

**Example**:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$$

$$\det(A) = (1)(4) - (2)(3) = -2$$
$$\det(B) = (3)(2) - (4)(1) = 2 = -\det(A)$$

**Consequence**: If a matrix has two identical rows, its determinant is zero. Why? Swapping the identical rows gives the same matrix but negates the determinant, so $\det(A) = -\det(A)$, which implies $\det(A) = 0$.

### Property 2: Scalar Multiple of a Row

Multiplying a single row by scalar $k$ **multiplies the determinant by $k$**.

$$\text{If } B \text{ is obtained from } A \text{ by multiplying row } i \text{ by } k, \text{ then } \det(B) = k \cdot \det(A)$$

**Example**:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 2 & 4 \\ 3 & 4 \end{bmatrix} \quad (\text{row 1 multiplied by 2})$$

$$\det(A) = -2$$
$$\det(B) = (2)(4) - (4)(3) = -4 = 2 \cdot \det(A)$$

**Important Warning**: Multiplying the entire matrix by $k$ (all entries) is different. For an $n \times n$ matrix:
$$\det(kA) = k^n \det(A)$$

This is because each of the $n$ rows gets multiplied by $k$.

**Example**:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad 2A = \begin{bmatrix} 2 & 4 \\ 6 & 8 \end{bmatrix}$$

$$\det(2A) = (2)(8) - (4)(6) = 16 - 24 = -8 = 2^2 \cdot (-2) = 4 \cdot \det(A)$$

### Property 3: Row Addition Doesn't Change Determinant

Adding a multiple of one row to another row **does not change** the determinant.

$$\text{If } B \text{ is obtained from } A \text{ by adding } k \times (\text{row } i) \text{ to row } j, \text{ then } \det(B) = \det(A)$$

**Example**:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 1 & 2 \\ 5 & 8 \end{bmatrix} \quad (R_2 + 2R_1 \to R_2)$$

$$\det(A) = -2$$
$$\det(B) = (1)(8) - (2)(5) = -2 = \det(A)$$

This property is crucial for efficient computation using row reduction.

## Determinant of Transpose

The determinant of a matrix equals the determinant of its transpose.

$$\det(A^T) = \det(A)$$

**Example**:
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}, \quad A^T = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$

Both matrices have the same determinant (which happens to be 0 because the rows are linearly dependent).

**Consequence**: All properties about rows also apply to columns. For instance:
- Swapping two columns negates the determinant
- Adding a multiple of one column to another doesn't change the determinant
- Multiplying a column by $k$ multiplies the determinant by $k$

## Product of Determinants

The determinant of a product equals the product of the determinants.

$$\det(AB) = \det(A) \cdot \det(B)$$

This is a remarkable property because matrix multiplication is complex, yet the determinant simplifies beautifully.

### Example: Product Rule

$$A = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}, \quad B = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$$

$$\det(A) = (2)(3) - (1)(1) = 5$$
$$\det(B) = (1)(1) - (2)(0) = 1$$

$$AB = \begin{bmatrix} 2 & 1 \\ 1 & 3 \end{bmatrix}\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 5 \\ 1 & 5 \end{bmatrix}$$

$$\det(AB) = (2)(5) - (5)(1) = 5 = \det(A) \cdot \det(B)$$

### Consequence: Inverse Matrices

If $A$ is invertible, then $AA^{-1} = I$, so:
$$\det(AA^{-1}) = \det(I) = 1$$
$$\det(A) \cdot \det(A^{-1}) = 1$$
$$\det(A^{-1}) = \frac{1}{\det(A)}$$

This confirms that a matrix is invertible if and only if $\det(A) \neq 0$.

### Important Non-Property: Sum of Determinants

**Warning**: The determinant of a sum is **not** the sum of determinants!

$$\det(A + B) \neq \det(A) + \det(B) \quad \text{(in general)}$$

**Counterexample**:
$$A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \quad B = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$

$$\det(A) = 1, \quad \det(B) = 1$$
$$A + B = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$$
$$\det(A + B) = 4 \neq 2 = \det(A) + \det(B)$$

## Determinant and Linear Independence

The determinant reveals whether the rows (or columns) of a matrix are linearly independent.

**Theorem**: For a square matrix $A$:
- $\det(A) \neq 0$ if and only if the rows are linearly independent
- $\det(A) \neq 0$ if and only if the columns are linearly independent
- $\det(A) = 0$ if and only if the matrix is singular (not invertible)

### Example: Testing Linear Independence

Are the vectors $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$, $\mathbf{v}_2 = \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix}$, $\mathbf{v}_3 = \begin{bmatrix} 7 \\ 8 \\ 9 \end{bmatrix}$ linearly independent?

Form the matrix with these as columns:
$$A = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$

Computing the determinant (expand along row 1):
$$\det(A) = 1(45 - 48) - 4(18 - 24) + 7(12 - 15)$$
$$= 1(-3) - 4(-6) + 7(-3) = -3 + 24 - 21 = 0$$

Since $\det(A) = 0$, the vectors are linearly dependent. Indeed, $\mathbf{v}_3 = 2\mathbf{v}_2 - \mathbf{v}_1$.

## Special Matrix Types

### Triangular Matrices

For upper or lower triangular matrices, the determinant equals the product of diagonal entries.

$$\det\begin{bmatrix} a_{11} & a_{12} & a_{13} \\ 0 & a_{22} & a_{23} \\ 0 & 0 & a_{33} \end{bmatrix} = a_{11} \cdot a_{22} \cdot a_{33}$$

This makes determinant calculation trivial for triangular matrices.

### Block Matrices (Triangular Form)

For a block triangular matrix:
$$A = \begin{bmatrix} B & C \\ 0 & D \end{bmatrix}$$

where $B$ and $D$ are square, we have:
$$\det(A) = \det(B) \cdot \det(D)$$

## Practical Application: Simplifying Computation

These properties allow us to simplify determinant calculations by using row operations to create zeros.

### Example: Using Row Operations

Compute $\det(A)$ for $A = \begin{bmatrix} 2 & 4 & 6 \\ 1 & 3 & 2 \\ 3 & 1 & 5 \end{bmatrix}$

**Step 1**: Factor out 2 from row 1:
$$\det(A) = 2 \det\begin{bmatrix} 1 & 2 & 3 \\ 1 & 3 & 2 \\ 3 & 1 & 5 \end{bmatrix}$$

**Step 2**: Use row operations to create zeros (determinant unchanged):
$$R_2 - R_1 \to R_2: \quad 2 \det\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & -1 \\ 3 & 1 & 5 \end{bmatrix}$$

$$R_3 - 3R_1 \to R_3: \quad 2 \det\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & -1 \\ 0 & -5 & -4 \end{bmatrix}$$

**Step 3**: Expand along column 1:
$$2 \cdot 1 \cdot \det\begin{bmatrix} 1 & -1 \\ -5 & -4 \end{bmatrix} = 2[(1)(-4) - (-1)(-5)]$$
$$= 2[-4 - 5] = 2(-9) = -18$$

## Summary of Key Properties

| Property | Formula | Effect |
|----------|---------|--------|
| Row swap | $\det(B) = -\det(A)$ | Negates determinant |
| Row scaling | $\det(B) = k\det(A)$ | Multiplies by scalar |
| Row addition | $\det(B) = \det(A)$ | No change |
| Transpose | $\det(A^T) = \det(A)$ | Unchanged |
| Product | $\det(AB) = \det(A)\det(B)$ | Product of determinants |
| Scalar multiplication | $\det(kA) = k^n\det(A)$ | Multiply by $k^n$ |
| Inverse | $\det(A^{-1}) = \frac{1}{\det(A)}$ | Reciprocal |
| Identity | $\det(I) = 1$ | Always 1 |

**Critical non-property**:
- $\det(A + B) \neq \det(A) + \det(B)$

These properties make determinants powerful computational and theoretical tools, connecting algebra, geometry, and the structure of linear transformations.
