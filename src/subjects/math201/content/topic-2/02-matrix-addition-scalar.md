---
id: math201-t2-addition-scalar
title: "Matrix Addition and Scalar Multiplication"
order: 2
---

# Matrix Addition and Scalar Multiplication

Matrix addition and scalar multiplication are the fundamental arithmetic operations on matrices. They form the foundation of vector space structure and enable us to combine and scale matrices in meaningful ways. These operations are intuitive, computationally simple, and preserve important algebraic properties.

## Matrix Addition

Two matrices can be added if and only if they have the **same dimensions**. Addition is performed **entry-wise** (also called component-wise):

If $A = [a_{ij}]$ and $B = [b_{ij}]$ are both $m \times n$ matrices, then:
$$A + B = [a_{ij} + b_{ij}]$$

**Example:**
$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} + \begin{bmatrix} 7 & 8 & 9 \\ 10 & 11 & 12 \end{bmatrix} = \begin{bmatrix} 8 & 10 & 12 \\ 14 & 16 & 18 \end{bmatrix}$$

**Incompatible addition:** You cannot add matrices of different dimensions. For instance, a $2 \times 3$ matrix cannot be added to a $3 \times 2$ matrix.

## Matrix Subtraction

Matrix subtraction follows the same rule as addition: matrices must have the same dimensions, and subtraction is entry-wise:

$$A - B = [a_{ij} - b_{ij}]$$

**Example:**
$$\begin{bmatrix} 5 & 9 \\ 3 & 7 \end{bmatrix} - \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix} = \begin{bmatrix} 3 & 5 \\ 2 & 4 \end{bmatrix}$$

## Scalar Multiplication

A **scalar** is just a number (a $1 \times 1$ quantity). Scalar multiplication scales every entry of a matrix by the same value:

If $c$ is a scalar and $A = [a_{ij}]$, then:
$$cA = [ca_{ij}]$$

**Example:**
$$3 \begin{bmatrix} 1 & -2 & 0 \\ 4 & 5 & -1 \end{bmatrix} = \begin{bmatrix} 3 & -6 & 0 \\ 12 & 15 & -3 \end{bmatrix}$$

Scalar multiplication allows us to scale matrices up or down, reverse their sign (multiply by $-1$), or create fractional matrices.

## Properties of Matrix Addition

Matrix addition satisfies the following algebraic properties (for matrices of the same size):

### 1. Commutativity
$$A + B = B + A$$

The order of addition doesn't matter.

### 2. Associativity
$$(A + B) + C = A + (B + C)$$

We can add multiple matrices without worrying about grouping, often writing simply $A + B + C$.

### 3. Additive Identity
$$A + O = O + A = A$$

The zero matrix acts as an identity element for addition.

### 4. Additive Inverse
$$A + (-A) = O$$

Every matrix has an additive inverse, obtained by negating all entries: $-A = (-1)A$.

**Example verification of commutativity:**
Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$

$$A + B = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix} = B + A$$

## Properties of Scalar Multiplication

Scalar multiplication satisfies these properties (for scalars $c, d$ and matrices $A, B$):

### 1. Distributivity over Matrix Addition
$$c(A + B) = cA + cB$$

**Example:**
$$2\left(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}\right) = 2\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + 2\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

### 2. Distributivity over Scalar Addition
$$(c + d)A = cA + dA$$

**Example:**
$$(2 + 3)\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = 2\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} + 3\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 5 & 0 \\ 0 & 5 \end{bmatrix}$$

### 3. Associativity
$$c(dA) = (cd)A$$

We can multiply scalars first or multiply the matrix first—the result is the same.

### 4. Multiplicative Identity
$$1 \cdot A = A$$

Multiplying by the scalar 1 leaves the matrix unchanged.

## Combined Operations

We can combine addition and scalar multiplication to form **linear combinations** of matrices:

$$cA + dB$$

**Example:** Find $2A - 3B$ where $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 0 & 1 \\ -1 & 2 \end{bmatrix}$.

**Solution:**
$$2A = \begin{bmatrix} 2 & 4 \\ 6 & 8 \end{bmatrix}$$

$$3B = \begin{bmatrix} 0 & 3 \\ -3 & 6 \end{bmatrix}$$

$$2A - 3B = \begin{bmatrix} 2 & 4 \\ 6 & 8 \end{bmatrix} - \begin{bmatrix} 0 & 3 \\ -3 & 6 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 9 & 2 \end{bmatrix}$$

## Solving Matrix Equations

We can solve equations involving matrix addition and scalar multiplication using algebraic properties.

**Example 1:** Solve for $X$ in the equation $2X + A = B$, where:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 5 & 8 \\ 11 & 14 \end{bmatrix}$$

**Solution:**
$$2X + A = B$$
$$2X = B - A$$
$$2X = \begin{bmatrix} 5 & 8 \\ 11 & 14 \end{bmatrix} - \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 4 & 6 \\ 8 & 10 \end{bmatrix}$$
$$X = \frac{1}{2}\begin{bmatrix} 4 & 6 \\ 8 & 10 \end{bmatrix} = \begin{bmatrix} 2 & 3 \\ 4 & 5 \end{bmatrix}$$

**Example 2:** Solve for $X$ and $Y$ in the system:
$$X + 2Y = \begin{bmatrix} 7 & 8 \\ 9 & 10 \end{bmatrix}$$
$$3X - Y = \begin{bmatrix} 5 & 7 \\ 9 & 11 \end{bmatrix}$$

**Solution:**

From the first equation: $X = \begin{bmatrix} 7 & 8 \\ 9 & 10 \end{bmatrix} - 2Y$

Substitute into the second equation:
$$3\left(\begin{bmatrix} 7 & 8 \\ 9 & 10 \end{bmatrix} - 2Y\right) - Y = \begin{bmatrix} 5 & 7 \\ 9 & 11 \end{bmatrix}$$

$$\begin{bmatrix} 21 & 24 \\ 27 & 30 \end{bmatrix} - 6Y - Y = \begin{bmatrix} 5 & 7 \\ 9 & 11 \end{bmatrix}$$

$$\begin{bmatrix} 21 & 24 \\ 27 & 30 \end{bmatrix} - 7Y = \begin{bmatrix} 5 & 7 \\ 9 & 11 \end{bmatrix}$$

$$7Y = \begin{bmatrix} 16 & 17 \\ 18 & 19 \end{bmatrix}$$

$$Y = \begin{bmatrix} 16/7 & 17/7 \\ 18/7 & 19/7 \end{bmatrix}$$

Now find $X$:
$$X = \begin{bmatrix} 7 & 8 \\ 9 & 10 \end{bmatrix} - 2\begin{bmatrix} 16/7 & 17/7 \\ 18/7 & 19/7 \end{bmatrix} = \begin{bmatrix} 17/7 & 22/7 \\ 27/7 & 32/7 \end{bmatrix}$$

## Vector Space Structure

The set of all $m \times n$ matrices, together with matrix addition and scalar multiplication, forms a **vector space** denoted $\mathbb{R}^{m \times n}$.

This means matrices satisfy all vector space axioms:
- Closure under addition and scalar multiplication
- Associativity and commutativity of addition
- Existence of additive identity (zero matrix) and inverses
- Distributive properties of scalar multiplication

The dimension of this vector space is $mn$ (the total number of entries).

## Applications

**Computer Graphics:** Adding translation vectors to all vertices of a shape

**Linear Systems:** Representing coefficients as augmented matrices

**Data Science:** Combining datasets (e.g., adding daily sales matrices)

**Physics:** Superposition of quantum states, combining force matrices

**Economics:** Aggregating input-output matrices across regions

## Summary

- Matrix addition is entry-wise and requires equal dimensions
- Scalar multiplication scales all entries by the same factor
- Matrix addition is commutative and associative with identity $O$
- Scalar multiplication distributes over both matrix and scalar addition
- Linear combinations $cA + dB$ are fundamental in linear algebra
- Matrix equations can be solved using algebraic manipulation
- These operations give matrices a vector space structure
