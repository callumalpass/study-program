---
id: math201-t4-independence
title: "Linear Independence"
order: 1
---

# Linear Independence

## Introduction

Linear independence is one of the most important concepts in linear algebra. It captures the idea that each vector in a set contributes something unique to the space - no vector is "redundant" in the sense of being expressible in terms of the others. Understanding linear independence is crucial for working with bases, solving systems of equations, and many applications in science and engineering.

## Definition

A set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n\}$ in a vector space $V$ is **linearly independent** if the only solution to the equation

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_n\mathbf{v}_n = \mathbf{0}$$

is the trivial solution $c_1 = c_2 = \cdots = c_n = 0$.

In other words, the only way to combine the vectors to get the zero vector is to use all zero coefficients. If there exists a non-trivial solution (where at least one $c_i \neq 0$), then the vectors are **linearly dependent**.

### Alternative Characterization

A set of vectors is linearly independent if and only if no vector in the set can be written as a linear combination of the others. This provides an intuitive understanding: each vector is essential and cannot be "replaced" by combinations of the remaining vectors.

## Testing for Linear Independence

### Method 1: Setting up the Homogeneous System

To test whether vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n$ in $\mathbb{R}^m$ are linearly independent:

1. Form the matrix $A = [\mathbf{v}_1 \ \mathbf{v}_2 \ \cdots \ \mathbf{v}_n]$ with the vectors as columns
2. Row reduce to echelon form
3. The vectors are linearly independent if and only if every column has a pivot position

**Example 1**: Determine whether the vectors are linearly independent:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 7 \\ 8 \\ 9 \end{bmatrix}$$

**Solution**:

Form the matrix with these vectors as columns:

$$A = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$

Row reduce:

$$\begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix} \xrightarrow{R_2 - 2R_1, R_3 - 3R_1} \begin{bmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & -6 & -12 \end{bmatrix}$$

$$\xrightarrow{R_3 - 2R_2} \begin{bmatrix} 1 & 4 & 7 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{bmatrix}$$

Since the third column has no pivot, the vectors are **linearly dependent**. In fact, $\mathbf{v}_3 = 2\mathbf{v}_2 - \mathbf{v}_1$.

### Method 2: Determinant Test (Square Matrices Only)

For $n$ vectors in $\mathbb{R}^n$, form the $n \times n$ matrix $A$ with the vectors as columns. The vectors are linearly independent if and only if $\det(A) \neq 0$.

**Example 2**: Test for independence:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$$

**Solution**:

$$\det\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 1 & 1 & 0 \end{bmatrix} = 1(0-1) - 0 + 1(0-1) = -1 - 1 = -2 \neq 0$$

Since the determinant is non-zero, the vectors are **linearly independent**.

## Geometric Interpretation

### In $\mathbb{R}^2$

Two vectors in $\mathbb{R}^2$ are linearly independent if and only if they are not collinear (not on the same line through the origin). Geometrically, they point in different directions.

**Example**: The vectors $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$ and $\begin{bmatrix} 0 \\ 1 \end{bmatrix}$ are linearly independent - they point along different axes. However, $\begin{bmatrix} 2 \\ 1 \end{bmatrix}$ and $\begin{bmatrix} 4 \\ 2 \end{bmatrix}$ are linearly dependent because they lie on the same line.

### In $\mathbb{R}^3$

- Two vectors are linearly independent if they are not collinear
- Three vectors are linearly independent if they are not coplanar (do not lie in the same plane through the origin)

**Example**: The standard basis vectors $\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$, $\mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$, and $\mathbf{e}_3 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$ are linearly independent because they point along three different spatial directions and do not lie in any common plane.

## Important Properties

### Property 1: Size Constraints

If a set contains more vectors than the dimension of the space, it must be linearly dependent.

**Example**: Any set of 4 or more vectors in $\mathbb{R}^3$ is automatically linearly dependent.

### Property 2: The Zero Vector

Any set containing the zero vector is linearly dependent, since $1 \cdot \mathbf{0} + 0 \cdot \mathbf{v}_2 + \cdots + 0 \cdot \mathbf{v}_n = \mathbf{0}$ provides a non-trivial solution.

### Property 3: Subsets of Independent Sets

Any subset of a linearly independent set is also linearly independent.

### Property 4: Extending Independent Sets

If $\{\mathbf{v}_1, \ldots, \mathbf{v}_k\}$ is linearly independent and $\mathbf{v}_{k+1}$ is not in the span of these vectors, then $\{\mathbf{v}_1, \ldots, \mathbf{v}_k, \mathbf{v}_{k+1}\}$ is linearly independent.

## Step-by-Step Example

**Problem**: Determine whether the following vectors are linearly independent:

$$\mathbf{v}_1 = \begin{bmatrix} 1 \\ -1 \\ 2 \\ 0 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 3 \\ 0 \\ 1 \\ 2 \end{bmatrix}, \quad \mathbf{v}_3 = \begin{bmatrix} 0 \\ 1 \\ -1 \\ 1 \end{bmatrix}$$

**Solution**:

**Step 1**: Form the matrix $A$ with these vectors as columns:

$$A = \begin{bmatrix} 1 & 3 & 0 \\ -1 & 0 & 1 \\ 2 & 1 & -1 \\ 0 & 2 & 1 \end{bmatrix}$$

**Step 2**: Row reduce to echelon form:

$$\begin{bmatrix} 1 & 3 & 0 \\ -1 & 0 & 1 \\ 2 & 1 & -1 \\ 0 & 2 & 1 \end{bmatrix} \xrightarrow{R_2 + R_1, R_3 - 2R_1} \begin{bmatrix} 1 & 3 & 0 \\ 0 & 3 & 1 \\ 0 & -5 & -1 \\ 0 & 2 & 1 \end{bmatrix}$$

$$\xrightarrow{R_3 + \frac{5}{3}R_2, R_4 - \frac{2}{3}R_2} \begin{bmatrix} 1 & 3 & 0 \\ 0 & 3 & 1 \\ 0 & 0 & 2/3 \\ 0 & 0 & 1/3 \end{bmatrix}$$

$$\xrightarrow{R_4 - \frac{1}{2}R_3} \begin{bmatrix} 1 & 3 & 0 \\ 0 & 3 & 1 \\ 0 & 0 & 2/3 \\ 0 & 0 & 0 \end{bmatrix}$$

**Step 3**: Check for pivots. Each of the three columns has a pivot position.

**Conclusion**: The vectors are **linearly independent**.

## Common Mistakes to Avoid

1. **Confusing independence with orthogonality**: Linearly independent vectors need not be perpendicular
2. **Forgetting the trivial solution**: The equation $c_1\mathbf{v}_1 + \cdots + c_n\mathbf{v}_n = \mathbf{0}$ always has at least the trivial solution
3. **Not completing row reduction**: Partial row reduction may not reveal all dependencies
4. **Ignoring dimension constraints**: Remember that in $\mathbb{R}^n$, any set of more than $n$ vectors is dependent

## Practice Problems

1. Determine whether $\begin{bmatrix} 1 \\ 2 \end{bmatrix}$, $\begin{bmatrix} -1 \\ 3 \end{bmatrix}$, and $\begin{bmatrix} 2 \\ 1 \end{bmatrix}$ are linearly independent in $\mathbb{R}^2$.

2. For which values of $k$ are the vectors $\begin{bmatrix} 1 \\ k \\ -1 \end{bmatrix}$, $\begin{bmatrix} k \\ 1 \\ 0 \end{bmatrix}$, and $\begin{bmatrix} 0 \\ 1 \\ k \end{bmatrix}$ linearly independent?

3. Show that if $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\}$ is linearly independent, then so is $\{\mathbf{v}_1, \mathbf{v}_1 + \mathbf{v}_2, \mathbf{v}_1 + \mathbf{v}_2 + \mathbf{v}_3\}$.

## Summary

Linear independence is about ensuring that each vector in a set contributes uniquely to the span. A set is linearly independent if the only way to make a linear combination equal to zero is with all coefficients zero. We can test for independence by row reducing a matrix or computing a determinant. Geometrically, independent vectors point in genuinely different directions, while dependent vectors have some redundancy in their directional information.
