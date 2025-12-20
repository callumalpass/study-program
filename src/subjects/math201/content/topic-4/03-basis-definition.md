---
id: math201-t4-basis-def
title: "Basis Definition"
order: 3
---

# Basis Definition

## Introduction

A basis is perhaps the most important concept in linear algebra. It represents the minimal set of vectors needed to generate an entire vector space, while ensuring that no vector in the set is redundant. Bases provide coordinate systems for vector spaces and allow us to represent abstract vectors as concrete lists of numbers.

## Definition

A **basis** for a vector space $V$ is a set of vectors $\mathcal{B} = \{\mathbf{b}_1, \mathbf{b}_2, \ldots, \mathbf{b}_n\}$ that satisfies two properties:

1. **Linear Independence**: The vectors are linearly independent
2. **Spanning**: The vectors span $V$ (every vector in $V$ can be written as a linear combination of the basis vectors)

In other words, a basis is a linearly independent spanning set.

### Uniqueness of Representation

A crucial property of bases is that every vector in $V$ can be written **uniquely** as a linear combination of the basis vectors. If $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ is a basis, then for any $\mathbf{v} \in V$, there exist unique scalars $c_1, \ldots, c_n$ such that:

$$\mathbf{v} = c_1\mathbf{b}_1 + c_2\mathbf{b}_2 + \cdots + c_n\mathbf{b}_n$$

The scalars $c_1, \ldots, c_n$ are called the **coordinates** of $\mathbf{v}$ relative to the basis $\mathcal{B}$.

## Standard Bases

### Standard Basis for $\mathbb{R}^n$

The **standard basis** for $\mathbb{R}^n$ consists of the vectors:

$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \ldots, \quad \mathbf{e}_n = \begin{bmatrix} 0 \\ 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$$

Each vector $\mathbf{e}_i$ has a 1 in the $i$-th position and 0s elsewhere.

**Example**: The standard basis for $\mathbb{R}^3$ is:

$$\mathcal{E} = \left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}\right\}$$

Any vector $\mathbf{v} = \begin{bmatrix} a \\ b \\ c \end{bmatrix}$ can be written as $\mathbf{v} = a\mathbf{e}_1 + b\mathbf{e}_2 + c\mathbf{e}_3$.

### Standard Basis for Polynomial Spaces

For $P_n$ (polynomials of degree at most $n$), the standard basis is:

$$\mathcal{B} = \{1, x, x^2, \ldots, x^n\}$$

**Example**: Any polynomial $p(x) = 3 + 2x - 5x^2$ in $P_2$ can be uniquely written as $p(x) = 3(1) + 2(x) + (-5)(x^2)$.

### Standard Basis for Matrix Spaces

For $M_{m \times n}$ (the space of $m \times n$ matrices), the standard basis consists of matrices $E_{ij}$ where $E_{ij}$ has a 1 in position $(i,j)$ and 0s elsewhere.

**Example**: The standard basis for $M_{2 \times 2}$ has 4 elements:

$$E_{11} = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \quad E_{12} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \quad E_{21} = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \quad E_{22} = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}$$

## Verifying a Basis

To verify that a set $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ is a basis for a vector space $V$, you must check both:

1. Linear independence
2. Spanning property

### Method 1: Direct Verification

**Example 1**: Verify that $\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ -1 \end{bmatrix}\right\}$ is a basis for $\mathbb{R}^2$.

**Solution**:

**Check 1: Linear Independence**

Set up the equation $c_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$

This gives us:
$$\begin{cases} c_1 + c_2 = 0 \\ c_1 - c_2 = 0 \end{cases}$$

Adding these equations: $2c_1 = 0 \implies c_1 = 0$, and then $c_2 = 0$.

Since only the trivial solution exists, the vectors are linearly independent.

**Check 2: Spanning**

We need to show that any vector $\begin{bmatrix} a \\ b \end{bmatrix}$ can be written as a linear combination. Solve:

$$c_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} a \\ b \end{bmatrix}$$

This gives:
$$\begin{cases} c_1 + c_2 = a \\ c_1 - c_2 = b \end{cases}$$

Solving: $c_1 = \frac{a+b}{2}$ and $c_2 = \frac{a-b}{2}$.

For any values of $a$ and $b$, we can find $c_1$ and $c_2$, so the vectors span $\mathbb{R}^2$.

**Conclusion**: $\mathcal{B}$ is a basis for $\mathbb{R}^2$.

### Method 2: Matrix Approach (for $\mathbb{R}^n$)

For vectors in $\mathbb{R}^n$, form the matrix $A$ with the proposed basis vectors as columns. The set is a basis if and only if:

1. Every column has a pivot (linear independence)
2. There are $n$ vectors (ensuring spanning for $\mathbb{R}^n$)

Or equivalently: $A$ is invertible (det$(A) \neq 0$ for square matrices).

**Example 2**: Verify that the following vectors form a basis for $\mathbb{R}^3$:

$$\mathbf{b}_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \quad \mathbf{b}_2 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}, \quad \mathbf{b}_3 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$$

**Solution**:

Form the matrix $A = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 1 & 1 \\ 1 & 0 & 1 \end{bmatrix}$

Calculate the determinant:

$$\det(A) = 1 \begin{vmatrix} 1 & 1 \\ 0 & 1 \end{vmatrix} - 1 \begin{vmatrix} 0 & 1 \\ 1 & 1 \end{vmatrix} + 0 = 1(1) - 1(-1) = 2 \neq 0$$

Since det$(A) \neq 0$, the matrix is invertible, and the vectors form a basis for $\mathbb{R}^3$.

## Non-Standard Bases

Not all bases are standard bases. In fact, there are infinitely many different bases for any vector space of dimension greater than zero.

**Example 3**: Show that $\mathcal{B} = \{1+x, 1-x, x^2\}$ is a basis for $P_2$.

**Solution**:

**Linear Independence**: Suppose $c_1(1+x) + c_2(1-x) + c_3(x^2) = 0$ for all $x$.

Expanding: $(c_1 + c_2) + (c_1 - c_2)x + c_3x^2 = 0$

For this to be the zero polynomial:
- Coefficient of $x^0$: $c_1 + c_2 = 0$
- Coefficient of $x^1$: $c_1 - c_2 = 0$
- Coefficient of $x^2$: $c_3 = 0$

From the first two equations: $c_1 = c_2 = 0$. Combined with $c_3 = 0$, we have only the trivial solution. The set is linearly independent.

**Spanning**: We need to show any polynomial $a + bx + cx^2$ can be written as a combination of our basis vectors.

$$c_1(1+x) + c_2(1-x) + c_3(x^2) = a + bx + cx^2$$

$$(c_1 + c_2) + (c_1 - c_2)x + c_3x^2 = a + bx + cx^2$$

Matching coefficients:
- $c_1 + c_2 = a$
- $c_1 - c_2 = b$
- $c_3 = c$

This system always has a solution: $c_1 = \frac{a+b}{2}$, $c_2 = \frac{a-b}{2}$, $c_3 = c$.

Therefore, $\mathcal{B}$ is a basis for $P_2$.

## Finding Coordinates Relative to a Basis

Given a basis $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ for $\mathbb{R}^n$ and a vector $\mathbf{v}$, to find the coordinates $[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} c_1 \\ \vdots \\ c_n \end{bmatrix}$, solve:

$$c_1\mathbf{b}_1 + \cdots + c_n\mathbf{b}_n = \mathbf{v}$$

This is equivalent to solving $A\mathbf{c} = \mathbf{v}$ where $A = [\mathbf{b}_1 \ \cdots \ \mathbf{b}_n]$.

**Example 4**: Find the coordinates of $\mathbf{v} = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$ relative to the basis $\mathcal{B} = \left\{\begin{bmatrix} 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 3 \end{bmatrix}\right\}$.

**Solution**:

We need to solve:

$$c_1\begin{bmatrix} 2 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} 1 \\ 3 \end{bmatrix} = \begin{bmatrix} 5 \\ 1 \end{bmatrix}$$

This gives the system:
$$\begin{cases} 2c_1 + c_2 = 5 \\ c_1 + 3c_2 = 1 \end{cases}$$

From the second equation: $c_1 = 1 - 3c_2$

Substituting into the first: $2(1 - 3c_2) + c_2 = 5$

$$2 - 6c_2 + c_2 = 5 \implies -5c_2 = 3 \implies c_2 = -\frac{3}{5}$$

Then $c_1 = 1 - 3(-\frac{3}{5}) = 1 + \frac{9}{5} = \frac{14}{5}$

Therefore: $[\mathbf{v}]_\mathcal{B} = \begin{bmatrix} 14/5 \\ -3/5 \end{bmatrix}$

## Bases for Subspaces

Any subspace has a basis. To find a basis for a subspace:

**Method**: If the subspace is given as the span of vectors, use those vectors as columns of a matrix, row reduce, and take the vectors corresponding to pivot columns.

**Example 5**: Find a basis for $W = \text{Span}\left\{\begin{bmatrix} 1 \\ 2 \\ 0 \end{bmatrix}, \begin{bmatrix} 2 \\ 4 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}\right\}$.

**Solution**:

Form the matrix: $A = \begin{bmatrix} 1 & 2 & 0 \\ 2 & 4 & 1 \\ 0 & 0 & 1 \end{bmatrix}$

Row reduce: $\begin{bmatrix} 1 & 2 & 0 \\ 2 & 4 & 1 \\ 0 & 0 & 1 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{bmatrix}$

Columns 1 and 3 have pivots, so a basis for $W$ is:

$$\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 2 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}\right\}$$

## Important Properties

1. **Non-uniqueness**: A vector space has infinitely many different bases (except for the zero space)
2. **Size consistency**: All bases for a given vector space have the same number of elements (this number is the dimension)
3. **Completeness**: You cannot add a vector to a basis and maintain linear independence
4. **Minimality**: You cannot remove a vector from a basis and maintain the spanning property

## Common Mistakes to Avoid

1. **Assuming the standard basis is the only basis**: There are many bases for any space
2. **Forgetting to check both properties**: A basis must be both independent AND spanning
3. **Using row vectors instead of column vectors**: Be consistent with your notation
4. **Not verifying linear independence**: Just because vectors span doesn't mean they're a basis

## Practice Problems

1. Verify that $\left\{\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix}\right\}$ is a basis for $\mathbb{R}^3$.

2. Find the coordinates of $3 - 2x + x^2$ relative to the basis $\{1, 1+x, 1+x+x^2\}$ for $P_2$.

3. Show that $\{e^x, e^{-x}\}$ is a basis for the solution space of $y'' - y = 0$.

## Summary

A basis is a linearly independent spanning set for a vector space. It provides the most efficient way to represent all vectors in the space, with each vector having unique coordinates relative to the basis. While the standard basis is most familiar, every vector space (except $\{\mathbf{0}\}$) has infinitely many bases. To verify a basis, check both linear independence and the spanning property. Bases are fundamental to understanding the structure and dimension of vector spaces.
