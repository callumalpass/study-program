# Dimension

## Introduction

The dimension of a vector space is one of the most fundamental invariants in linear algebra. It measures the "size" of a vector space in terms of the number of independent directions it contains. Understanding dimension helps us classify vector spaces, understand their structure, and determine the number of parameters needed to specify any vector in the space.

## Definition

The **dimension** of a vector space $V$, denoted $\dim(V)$, is the number of vectors in any basis for $V$.

This definition is well-defined because of the following crucial theorem:

**Theorem (Basis Size Consistency)**: All bases for a given vector space contain the same number of vectors.

### Special Cases

- The dimension of the zero vector space $\{\mathbf{0}\}$ is defined to be 0
- If a vector space has a finite basis, it is **finite-dimensional**
- If a vector space has no finite basis, it is **infinite-dimensional**

## Dimensions of Common Vector Spaces

### Euclidean Spaces

$$\dim(\mathbb{R}^n) = n$$

The standard basis $\{\mathbf{e}_1, \mathbf{e}_2, \ldots, \mathbf{e}_n\}$ has $n$ vectors.

**Examples**:
- $\dim(\mathbb{R}^2) = 2$ (the plane)
- $\dim(\mathbb{R}^3) = 3$ (three-dimensional space)
- $\dim(\mathbb{R}^{100}) = 100$

### Polynomial Spaces

$$\dim(P_n) = n + 1$$

The standard basis $\{1, x, x^2, \ldots, x^n\}$ has $n+1$ vectors.

**Examples**:
- $\dim(P_2) = 3$ (polynomials like $a + bx + cx^2$)
- $\dim(P_5) = 6$

### Matrix Spaces

$$\dim(M_{m \times n}) = mn$$

An $m \times n$ matrix has $mn$ entries, and the standard basis consists of $mn$ matrices $E_{ij}$.

**Examples**:
- $\dim(M_{2 \times 2}) = 4$
- $\dim(M_{3 \times 4}) = 12$

### Infinite-Dimensional Spaces

Some important vector spaces are infinite-dimensional:

- $P$ (all polynomials): $\dim(P) = \infty$
- $C[0,1]$ (continuous functions on $[0,1]$): $\dim(C[0,1]) = \infty$
- $\mathbb{R}^\infty$ (sequences): $\dim(\mathbb{R}^\infty) = \infty$

## Finding Dimension

To find the dimension of a vector space or subspace:

1. Find a basis for the space
2. Count the number of vectors in the basis

### Example 1: Dimension of a Subspace

Find the dimension of $W = \left\{\begin{bmatrix} x \\ y \\ z \end{bmatrix} \in \mathbb{R}^3 : x + 2y - z = 0\right\}$.

**Solution**:

$W$ is the null space of the matrix $A = \begin{bmatrix} 1 & 2 & -1 \end{bmatrix}$.

To find a basis, we solve $A\mathbf{x} = 0$:

$$x + 2y - z = 0 \implies z = x + 2y$$

The general solution is:

$$\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} x \\ y \\ x + 2y \end{bmatrix} = x\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + y\begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}$$

A basis for $W$ is $\left\{\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 2 \end{bmatrix}\right\}$.

Therefore, $\dim(W) = 2$.

**Geometric interpretation**: $W$ is a plane through the origin in $\mathbb{R}^3$.

### Example 2: Dimension from Spanning Set

Find the dimension of $U = \text{Span}\left\{\begin{bmatrix} 1 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 1 \\ 2 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 1 \end{bmatrix}\right\}$.

**Solution**:

Form a matrix with these vectors as columns and row reduce:

$$A = \begin{bmatrix} 1 & 0 & 1 & 0 \\ 1 & 1 & 2 & 0 \\ 0 & 1 & 1 & 1 \\ 0 & 0 & 0 & 1 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 0 & 1 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Columns 1, 2, and 4 have pivots, so the dimension is the number of pivot columns:

$$\dim(U) = 3$$

A basis for $U$ consists of the original vectors in positions 1, 2, and 4:

$$\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 1 \end{bmatrix}\right\}$$

## The Dimension Theorem

Several important results relate dimension to other properties of vector spaces.

### Theorem 1: Subspace Dimension

If $W$ is a subspace of a finite-dimensional vector space $V$, then:

$$\dim(W) \leq \dim(V)$$

with equality if and only if $W = V$.

**Example**: Any subspace of $\mathbb{R}^3$ has dimension 0, 1, 2, or 3:
- Dimension 0: $\{\mathbf{0}\}$ (just the origin)
- Dimension 1: Lines through the origin
- Dimension 2: Planes through the origin
- Dimension 3: All of $\mathbb{R}^3$

### Theorem 2: Size Constraints for Independence and Spanning

In an $n$-dimensional vector space $V$:

1. **Any set of more than $n$ vectors is linearly dependent**
2. **Any set of fewer than $n$ vectors cannot span $V$**
3. **A set of exactly $n$ vectors is a basis if it is either linearly independent OR if it spans $V$**

**Example 3**: In $\mathbb{R}^4$:
- Any 5 or more vectors must be linearly dependent
- Any 3 or fewer vectors cannot span $\mathbb{R}^4$
- If 4 vectors are linearly independent, they automatically span $\mathbb{R}^4$ (and vice versa)

### Theorem 3: Basis Extension

Any linearly independent set in a finite-dimensional vector space can be extended to a basis.

**Example**: In $\mathbb{R}^3$, if we have the independent set $\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}\right\}$, we can extend it to a basis by adding $\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$.

### Theorem 4: Basis Reduction

Any spanning set for a finite-dimensional vector space contains a basis (we can remove vectors until we have a linearly independent set).

## Rank-Nullity Theorem

For a matrix $A$ with $n$ columns:

$$\dim(\text{Nul } A) + \dim(\text{Col } A) = n$$

Or equivalently:

$$\text{nullity}(A) + \text{rank}(A) = n$$

This fundamental theorem relates the dimension of the null space (nullity) to the dimension of the column space (rank).

**Example 4**: If $A$ is a $5 \times 7$ matrix with rank 4, what is the dimension of Nul $A$?

**Solution**:

Using the rank-nullity theorem:

$$\dim(\text{Nul } A) + \text{rank}(A) = 7$$

$$\dim(\text{Nul } A) + 4 = 7$$

$$\dim(\text{Nul } A) = 3$$

## Applications of Dimension

### Solving Linear Systems

The dimension of the null space tells us how many free variables (parameters) appear in the general solution.

**Example**: If $A\mathbf{x} = \mathbf{b}$ has a solution and $\dim(\text{Nul } A) = 2$, then the solution set can be written as:

$$\mathbf{x} = \mathbf{x}_p + t_1\mathbf{v}_1 + t_2\mathbf{v}_2$$

where $\mathbf{x}_p$ is a particular solution and $\{\mathbf{v}_1, \mathbf{v}_2\}$ is a basis for Nul $A$.

### Dimension and Coordinates

In an $n$-dimensional vector space, once we choose a basis, every vector is uniquely determined by $n$ coordinates. This establishes a correspondence between abstract vectors and $\mathbb{R}^n$.

**Example 5**: The space $P_2$ has dimension 3. Relative to the standard basis $\{1, x, x^2\}$, the polynomial $5 - 3x + 7x^2$ corresponds to the coordinate vector $\begin{bmatrix} 5 \\ -3 \\ 7 \end{bmatrix} \in \mathbb{R}^3$.

## Computing Dimension: Step-by-Step Examples

### Example 6: Symmetric Matrices

Find the dimension of the space of $2 \times 2$ symmetric matrices.

**Solution**:

A $2 \times 2$ symmetric matrix has the form:

$$\begin{bmatrix} a & b \\ b & c \end{bmatrix}$$

The general form can be written as:

$$\begin{bmatrix} a & b \\ b & c \end{bmatrix} = a\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + c\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$$

The set $\left\{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\right\}$ is a basis.

Therefore, the dimension is **3**.

### Example 7: Solution Space

Find the dimension of the solution space to the system:

$$\begin{cases} x_1 + 2x_2 - x_3 + x_4 = 0 \\ 2x_1 + 4x_2 - 3x_3 - x_4 = 0 \end{cases}$$

**Solution**:

Form the coefficient matrix and row reduce:

$$A = \begin{bmatrix} 1 & 2 & -1 & 1 \\ 2 & 4 & -3 & -1 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 & 4 \\ 0 & 0 & 1 & 3 \end{bmatrix}$$

There are 2 pivot columns and 4 total columns, so there are $4 - 2 = 2$ free variables.

By the rank-nullity theorem:

$$\dim(\text{Nul } A) = 4 - \text{rank}(A) = 4 - 2 = 2$$

The solution space is **2-dimensional**.

## Geometric Interpretation of Dimension

- **0-dimensional**: A single point (the origin)
- **1-dimensional**: A line through the origin
- **2-dimensional**: A plane through the origin
- **3-dimensional**: All of 3D space (or a 3D "hyperplane" in higher dimensions)
- **$n$-dimensional**: Cannot be visualized directly for $n > 3$, but the algebraic properties remain consistent

## Common Mistakes to Avoid

1. **Counting vectors in a spanning set**: The number of vectors in a spanning set may exceed the dimension; you must find a basis first
2. **Forgetting that dimension counts basis vectors**: Not just any vectors, but those in a basis
3. **Confusing dimension with the size of vectors**: $\mathbb{R}^{10}$ has dimension 10, but a subspace of $\mathbb{R}^{10}$ might have smaller dimension
4. **Not using the rank-nullity theorem**: This theorem provides a quick way to find dimensions

## Practice Problems

1. Find the dimension of the subspace $W = \{(a, b, c, d) \in \mathbb{R}^4 : a + b = 0 \text{ and } c = 2d\}$.

2. What is the dimension of the space of $3 \times 3$ diagonal matrices?

3. If $\dim(V) = 7$ and $W$ is a 4-dimensional subspace of $V$, what can you say about the maximum dimension of a subspace that is disjoint from $W$ (intersects $W$ only at $\mathbf{0}$)?

4. A matrix $A$ has 8 columns and rank 5. What is the dimension of Nul $A$?

## Summary

The dimension of a vector space is the number of vectors in any basis for that space. It provides a fundamental measure of the "size" of a vector space and is invariant across all choices of basis. Understanding dimension helps us classify subspaces, understand solution spaces to linear systems, and work with coordinate representations. The rank-nullity theorem connects the dimensions of the null space and column space of a matrix, providing a powerful tool for computing dimensions.
