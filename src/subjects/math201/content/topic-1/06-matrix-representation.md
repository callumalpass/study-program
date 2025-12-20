---
id: math201-t1-matrix-rep
title: "Matrix Representation"
order: 6
---

# Matrix Representation of Linear Systems

## Introduction

The matrix representation of linear systems provides a compact, elegant notation that reveals deep structural relationships. This representation is not merely notational convenience—it transforms our understanding of linear systems and enables powerful computational and theoretical tools. In this section, we develop three equivalent ways to represent linear systems: using coefficient matrices, augmented matrices, and matrix-vector equations.

## From Systems to Matrices

### The Coefficient Matrix

Consider a general system of $m$ linear equations in $n$ unknowns:

$$\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
\end{cases}$$

**Definition 6.1 (Coefficient Matrix):** The **coefficient matrix** $A$ is the $m \times n$ matrix whose entries are the coefficients of the variables:

$$A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}$$

The entry $a_{ij}$ is in row $i$, column $j$, representing the coefficient of $x_j$ in equation $i$.

### The Augmented Matrix

**Definition 6.2 (Augmented Matrix):** The **augmented matrix** $[A \mid \mathbf{b}]$ is the $m \times (n+1)$ matrix formed by appending the constant terms as an additional column:

$$[A \mid \mathbf{b}] = \left[\begin{array}{cccc|c}
a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{array}\right]$$

The vertical bar separates the coefficient matrix from the constants vector.

### Example 1: Forming Matrices

Write the coefficient and augmented matrices for:
$$\begin{cases}
2x_1 + 3x_2 - x_3 = 5 \\
x_1 - x_2 + 2x_3 = -1 \\
3x_1 + x_2 + x_3 = 4
\end{cases}$$

**Solution:**

**Coefficient matrix:**
$$A = \begin{pmatrix}
2 & 3 & -1 \\
1 & -1 & 2 \\
3 & 1 & 1
\end{pmatrix}$$

**Constants vector:**
$$\mathbf{b} = \begin{pmatrix} 5 \\ -1 \\ 4 \end{pmatrix}$$

**Augmented matrix:**
$$[A \mid \mathbf{b}] = \left[\begin{array}{ccc|c}
2 & 3 & -1 & 5 \\
1 & -1 & 2 & -1 \\
3 & 1 & 1 & 4
\end{array}\right]$$

## Matrix-Vector Multiplication

To write systems in the compact form $A\mathbf{x} = \mathbf{b}$, we need to define matrix-vector multiplication.

**Definition 6.3 (Matrix-Vector Product):** If $A$ is an $m \times n$ matrix with columns $\mathbf{a}_1, \mathbf{a}_2, \ldots, \mathbf{a}_n$, and $\mathbf{x}$ is a vector in $\mathbb{R}^n$:

$$\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$$

then the product $A\mathbf{x}$ is the linear combination of the columns of $A$ using the entries of $\mathbf{x}$ as weights:

$$A\mathbf{x} = x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \cdots + x_n\mathbf{a}_n$$

**Equivalently (row-wise view):**
$$A\mathbf{x} = \begin{pmatrix}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n
\end{pmatrix}$$

**Important:** The number of columns in $A$ must equal the number of entries in $\mathbf{x}$.

### Example 2: Computing Matrix-Vector Products

Compute $A\mathbf{x}$ where:
$$A = \begin{pmatrix}
1 & 2 & -1 \\
3 & 0 & 2 \\
-1 & 4 & 1
\end{pmatrix}, \quad \mathbf{x} = \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix}$$

**Solution (using linear combination of columns):**

The columns of $A$ are:
$$\mathbf{a}_1 = \begin{pmatrix} 1 \\ 3 \\ -1 \end{pmatrix}, \quad \mathbf{a}_2 = \begin{pmatrix} 2 \\ 0 \\ 4 \end{pmatrix}, \quad \mathbf{a}_3 = \begin{pmatrix} -1 \\ 2 \\ 1 \end{pmatrix}$$

Therefore:
$$A\mathbf{x} = 2\begin{pmatrix} 1 \\ 3 \\ -1 \end{pmatrix} + (-1)\begin{pmatrix} 2 \\ 0 \\ 4 \end{pmatrix} + 3\begin{pmatrix} -1 \\ 2 \\ 1 \end{pmatrix}$$

$$= \begin{pmatrix} 2 \\ 6 \\ -2 \end{pmatrix} + \begin{pmatrix} -2 \\ 0 \\ -4 \end{pmatrix} + \begin{pmatrix} -3 \\ 6 \\ 3 \end{pmatrix} = \begin{pmatrix} -3 \\ 12 \\ -3 \end{pmatrix}$$

**Verification (using row-wise computation):**
- First entry: $1(2) + 2(-1) + (-1)(3) = 2 - 2 - 3 = -3$ ✓
- Second entry: $3(2) + 0(-1) + 2(3) = 6 + 0 + 6 = 12$ ✓
- Third entry: $(-1)(2) + 4(-1) + 1(3) = -2 - 4 + 3 = -3$ ✓

## The Matrix Equation $A\mathbf{x} = \mathbf{b}$

With matrix-vector multiplication defined, we can write any linear system in the compact form:

$$A\mathbf{x} = \mathbf{b}$$

where:
- $A$ is the $m \times n$ coefficient matrix
- $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$ is the vector of unknowns
- $\mathbf{b} = \begin{pmatrix} b_1 \\ b_2 \\ \vdots \\ b_m \end{pmatrix}$ is the vector of constants

### Example 3: Writing Systems as Matrix Equations

Express the system in matrix form:
$$\begin{cases}
x_1 + 2x_2 - x_3 = 4 \\
3x_2 + x_3 = 7 \\
2x_1 - x_2 + 3x_3 = -1
\end{cases}$$

**Solution:**

$$\begin{pmatrix}
1 & 2 & -1 \\
0 & 3 & 1 \\
2 & -1 & 3
\end{pmatrix}
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix}
= \begin{pmatrix} 4 \\ 7 \\ -1 \end{pmatrix}$$

Or: $A\mathbf{x} = \mathbf{b}$ where $A = \begin{pmatrix} 1 & 2 & -1 \\ 0 & 3 & 1 \\ 2 & -1 & 3 \end{pmatrix}$, etc.

## Three Perspectives on Linear Systems

The matrix representation reveals three equivalent ways to think about linear systems:

### Perspective 1: Equation Form (Traditional)
$$\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
\end{cases}$$

**Interpretation:** Find values satisfying all equations simultaneously.

### Perspective 2: Matrix Equation
$$A\mathbf{x} = \mathbf{b}$$

**Interpretation:** Find vector $\mathbf{x}$ that transforms to $\mathbf{b}$ under the linear transformation defined by $A$.

### Perspective 3: Column Perspective (Linear Combination)

If $A = [\mathbf{a}_1 \mid \mathbf{a}_2 \mid \cdots \mid \mathbf{a}_n]$, then:
$$x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \cdots + x_n\mathbf{a}_n = \mathbf{b}$$

**Interpretation:** Express $\mathbf{b}$ as a linear combination of the columns of $A$.

### Example 4: Column Perspective

Consider:
$$\begin{pmatrix} 1 & 3 \\ 2 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = \begin{pmatrix} 7 \\ 4 \end{pmatrix}$$

**Column perspective:** Find $x_1, x_2$ such that:
$$x_1\begin{pmatrix} 1 \\ 2 \end{pmatrix} + x_2\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 7 \\ 4 \end{pmatrix}$$

**Question:** Can we write $(7, 4)$ as a combination of $(1, 2)$ and $(3, 1)$?

**Geometric interpretation:** In the plane, can we reach point $(7, 4)$ by walking $x_1$ units in direction $(1, 2)$ and $x_2$ units in direction $(3, 1)$?

**Solution:** Solving gives $x_1 = 1$, $x_2 = 2$:
$$1\begin{pmatrix} 1 \\ 2 \end{pmatrix} + 2\begin{pmatrix} 3 \\ 1 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 6 \\ 2 \end{pmatrix} = \begin{pmatrix} 7 \\ 4 \end{pmatrix}$$ ✓

## Existence and Uniqueness in Matrix Form

**Theorem 6.1 (Existence):** The equation $A\mathbf{x} = \mathbf{b}$ is consistent if and only if $\mathbf{b}$ is a linear combination of the columns of $A$.

**Equivalently:** $A\mathbf{x} = \mathbf{b}$ has a solution if and only if $\mathbf{b}$ is in the **span** of the columns of $A$.

**Definition 6.4 (Span):** The span of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_k\}$ is the set of all linear combinations:
$$\text{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_k\} = \{c_1\mathbf{v}_1 + \cdots + c_k\mathbf{v}_k : c_i \in \mathbb{R}\}$$

**Theorem 6.2 (Uniqueness):** The solution to $A\mathbf{x} = \mathbf{b}$ is unique if and only if the columns of $A$ are **linearly independent**.

### Example 5: Existence Question

Does the equation $A\mathbf{x} = \mathbf{b}$ have a solution?

$$A = \begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix}, \quad \mathbf{b} = \begin{pmatrix} 3 \\ 7 \end{pmatrix}$$

**Solution:**

**Column perspective:** Can we write $\mathbf{b}$ as a combination of the columns?
$$x_1\begin{pmatrix} 1 \\ 2 \end{pmatrix} + x_2\begin{pmatrix} 2 \\ 4 \end{pmatrix} = \begin{pmatrix} 3 \\ 7 \end{pmatrix}$$

**Observation:** The second column is $2 \times$ the first column, so:
$$\text{Span}\left\{\begin{pmatrix} 1 \\ 2 \end{pmatrix}, \begin{pmatrix} 2 \\ 4 \end{pmatrix}\right\} = \text{Span}\left\{\begin{pmatrix} 1 \\ 2 \end{pmatrix}\right\}$$

This is the line through the origin with slope 2.

**Question:** Is $(3, 7)$ on this line?

Check: $7 = 2(3)$? No, $7 \neq 6$.

**Conclusion:** The system is **inconsistent**. The vector $\mathbf{b}$ is not in the span of the columns of $A$.

## Properties of Matrix-Vector Products

**Theorem 6.3 (Linearity of Matrix Multiplication):** If $A$ is an $m \times n$ matrix, $\mathbf{u}, \mathbf{v}$ are vectors in $\mathbb{R}^n$, and $c$ is a scalar, then:

1. $A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v}$
2. $A(c\mathbf{u}) = c(A\mathbf{u})$

**Proof of (1):** Using the column definition, if $A = [\mathbf{a}_1 \mid \cdots \mid \mathbf{a}_n]$ and $\mathbf{u} = \begin{pmatrix} u_1 \\ \vdots \\ u_n \end{pmatrix}$, $\mathbf{v} = \begin{pmatrix} v_1 \\ \vdots \\ v_n \end{pmatrix}$:

$$A(\mathbf{u} + \mathbf{v}) = (u_1+v_1)\mathbf{a}_1 + \cdots + (u_n+v_n)\mathbf{a}_n$$
$$= (u_1\mathbf{a}_1 + \cdots + u_n\mathbf{a}_n) + (v_1\mathbf{a}_1 + \cdots + v_n\mathbf{a}_n)$$
$$= A\mathbf{u} + A\mathbf{v}$$ □

These properties establish that matrix multiplication is a **linear transformation**.

## Practice Problems

**Problem 1:** Write the augmented matrix and matrix equation for:
$$\begin{cases}
3x - 2y + z = 7 \\
x + y - 3z = -2 \\
2x + 4y + z = 5
\end{cases}$$

**Problem 2:** Compute:
$$\begin{pmatrix} 2 & -1 & 3 \\ 1 & 4 & 0 \\ -1 & 2 & 1 \end{pmatrix} \begin{pmatrix} 2 \\ -3 \\ 1 \end{pmatrix}$$

**Problem 3:** Express the linear combination as a matrix equation:
$$3\begin{pmatrix} 1 \\ -2 \\ 3 \end{pmatrix} - 2\begin{pmatrix} 2 \\ 1 \\ 0 \end{pmatrix} + 5\begin{pmatrix} 0 \\ 1 \\ -1 \end{pmatrix} = \begin{pmatrix} -1 \\ -3 \\ 4 \end{pmatrix}$$

**Problem 4:** Can $\mathbf{b}$ be written as a linear combination of $\mathbf{a}_1, \mathbf{a}_2, \mathbf{a}_3$?
$$\mathbf{a}_1 = \begin{pmatrix} 1 \\ 0 \\ 2 \end{pmatrix}, \mathbf{a}_2 = \begin{pmatrix} 2 \\ 1 \\ 1 \end{pmatrix}, \mathbf{a}_3 = \begin{pmatrix} 0 \\ 1 \\ -3 \end{pmatrix}, \mathbf{b} = \begin{pmatrix} 3 \\ 2 \\ 0 \end{pmatrix}$$

**Problem 5:** Prove that $A(\mathbf{u} - \mathbf{v}) = A\mathbf{u} - A\mathbf{v}$ using Theorem 6.3.

## Summary

Matrix representation unifies and simplifies our understanding of linear systems. The three perspectives—equation form, matrix equation $A\mathbf{x} = \mathbf{b}$, and column perspective (linear combinations)—are equivalent but emphasize different aspects. The column perspective is particularly powerful: solving $A\mathbf{x} = \mathbf{b}$ is equivalent to expressing $\mathbf{b}$ as a linear combination of the columns of $A$. This geometric viewpoint provides intuition about existence (is $\mathbf{b}$ in the span?) and uniqueness (are the columns linearly independent?), themes that will recur throughout linear algebra.
