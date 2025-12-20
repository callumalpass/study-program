---
id: math201-t4-rank
title: "Rank"
order: 5
---

# Rank

## Introduction

The rank of a matrix is one of the most important numerical invariants in linear algebra. It measures the "amount of information" contained in a matrix and has profound implications for solving linear systems, understanding linear transformations, and analyzing data. The rank connects the column space, row space, and solutions of matrix equations in elegant and useful ways.

## Definition

The **rank** of a matrix $A$, denoted $\text{rank}(A)$ or $\text{rk}(A)$, can be defined in several equivalent ways:

1. **Column rank**: The dimension of the column space of $A$
2. **Row rank**: The dimension of the row space of $A$
3. **Pivot count**: The number of pivot positions in any echelon form of $A$
4. **Maximum independent set**: The maximum number of linearly independent columns (or rows)

A fundamental theorem states that all these definitions give the same value.

**Theorem (Row Rank = Column Rank)**: For any matrix, the row rank equals the column rank.

## Computing Rank

### Method 1: Row Reduction

The most practical method to find rank is to row reduce the matrix to echelon form and count the pivots.

**Example 1**: Find the rank of $A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \\ 1 & 3 & 5 & 7 \end{bmatrix}$.

**Solution**:

Row reduce to echelon form:

$$\begin{bmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \\ 1 & 3 & 5 & 7 \end{bmatrix} \xrightarrow{R_2 - 2R_1, R_3 - R_1} \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 0 & 0 \\ 0 & 1 & 2 & 3 \end{bmatrix}$$

$$\xrightarrow{R_2 \leftrightarrow R_3} \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 1 & 2 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

There are **2 pivots**, so $\text{rank}(A) = 2$.

### Method 2: Linear Independence Check

Find the maximum number of linearly independent columns.

**Example 2**: Determine which columns of $A = \begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 3 \\ 0 & 0 & 0 \end{bmatrix}$ form a maximal independent set.

**Solution**:

This matrix is already in echelon form. Columns 1 and 2 have pivots, so they form a maximal linearly independent set. Column 3 can be written as $2 \times \text{column 1} + 3 \times \text{column 2}$.

Therefore, $\text{rank}(A) = 2$.

## Properties of Rank

### Basic Properties

1. **Non-negativity**: $\text{rank}(A) \geq 0$
2. **Upper bounds**: For an $m \times n$ matrix $A$:
   $$\text{rank}(A) \leq \min(m, n)$$
3. **Zero rank**: $\text{rank}(A) = 0$ if and only if $A = O$ (the zero matrix)
4. **Transpose**: $\text{rank}(A) = \text{rank}(A^T)$

### Rank and Matrix Operations

1. **Multiplication bound**: $\text{rank}(AB) \leq \min(\text{rank}(A), \text{rank}(B))$
2. **Sum bound**: $\text{rank}(A + B) \leq \text{rank}(A) + \text{rank}(B)$
3. **Elementary operations**: Row and column operations do not change the rank

**Example 3**: If $A$ is $3 \times 5$ and $B$ is $5 \times 4$ with $\text{rank}(A) = 3$ and $\text{rank}(B) = 4$, what can we say about $\text{rank}(AB)$?

**Solution**:

$AB$ is a $3 \times 4$ matrix, so:

$$\text{rank}(AB) \leq \min(3, 4) = 3$$

Also, by the multiplication bound:

$$\text{rank}(AB) \leq \min(\text{rank}(A), \text{rank}(B)) = \min(3, 4) = 3$$

Therefore, $\text{rank}(AB) \leq 3$. We cannot determine the exact rank without more information.

## Special Matrices and Rank

### Full Rank Matrices

A matrix has **full rank** if its rank equals the maximum possible value:
- An $m \times n$ matrix has full rank if $\text{rank}(A) = \min(m, n)$

**Types of full rank**:
- **Full column rank**: $\text{rank}(A) = n$ (for $m \times n$ matrix with $m \geq n$)
  - Columns are linearly independent
  - $A\mathbf{x} = \mathbf{0}$ has only the trivial solution
  - $A\mathbf{x} = \mathbf{b}$ has at most one solution

- **Full row rank**: $\text{rank}(A) = m$ (for $m \times n$ matrix with $m \leq n$)
  - Rows are linearly independent
  - $A\mathbf{x} = \mathbf{b}$ is consistent for all $\mathbf{b}$
  - $A\mathbf{x} = \mathbf{b}$ has infinitely many solutions (unless $m = n$)

**Example 4**: Classify the matrix $A = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}$.

**Solution**:

The matrix is $3 \times 3$ with 2 pivots, so $\text{rank}(A) = 2$.

Since $2 < 3$, the matrix is **rank deficient** (not full rank).

Specifically:
- Not full column rank (columns are dependent)
- Not full row rank (rows are dependent)

### Invertible Matrices

An $n \times n$ matrix $A$ is invertible if and only if $\text{rank}(A) = n$.

**Example 5**: Is $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$ invertible?

**Solution**:

Row reduce:

$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \xrightarrow{\text{reduce}} \begin{bmatrix} 1 & 2 & 3 \\ 0 & -3 & -6 \\ 0 & 0 & 0 \end{bmatrix}$$

$\text{rank}(A) = 2 \neq 3$, so $A$ is **not invertible** (singular).

## The Rank Theorem

The **rank theorem** (also called the rank-nullity theorem) is a fundamental result connecting rank to the dimension of the null space.

**Theorem**: For an $m \times n$ matrix $A$:

$$\text{rank}(A) + \dim(\text{Nul } A) = n$$

Or equivalently:

$$\text{rank}(A) + \text{nullity}(A) = n$$

where nullity$(A) = \dim(\text{Nul } A)$ is the dimension of the null space.

### Implications

This theorem tells us:
- The number of pivot columns plus the number of free variables equals the total number of columns
- Higher rank means smaller null space (fewer solutions to $A\mathbf{x} = \mathbf{0}$)
- Lower rank means larger null space (more solutions)

**Example 6**: A $4 \times 7$ matrix $A$ has rank 3. Find the dimension of Nul $A$ and describe the solution set to $A\mathbf{x} = \mathbf{0}$.

**Solution**:

Using the rank theorem:

$$\text{rank}(A) + \dim(\text{Nul } A) = 7$$

$$3 + \dim(\text{Nul } A) = 7$$

$$\dim(\text{Nul } A) = 4$$

The solution set to $A\mathbf{x} = \mathbf{0}$ is a 4-dimensional subspace of $\mathbb{R}^7$. The general solution can be written as:

$$\mathbf{x} = t_1\mathbf{v}_1 + t_2\mathbf{v}_2 + t_3\mathbf{v}_3 + t_4\mathbf{v}_4$$

where $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3, \mathbf{v}_4\}$ is a basis for Nul $A$ and $t_1, t_2, t_3, t_4$ are free parameters.

## Rank and Solutions to Linear Systems

The rank provides crucial information about solutions to $A\mathbf{x} = \mathbf{b}$.

### Consistency

The system $A\mathbf{x} = \mathbf{b}$ is consistent if and only if:

$$\text{rank}(A) = \text{rank}([A \ | \ \mathbf{b}])$$

where $[A \ | \ \mathbf{b}]$ is the augmented matrix.

**Example 7**: Determine if the system is consistent:

$$\begin{bmatrix} 1 & 2 \\ 2 & 4 \\ 3 & 6 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 3 \\ 6 \\ 8 \end{bmatrix}$$

**Solution**:

Check the ranks:

$$[A \ | \ \mathbf{b}] = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \\ 3 & 6 & 8 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{bmatrix}$$

$\text{rank}(A) = 1$ (first column only)

$\text{rank}([A \ | \ \mathbf{b}]) = 2$ (first and third columns)

Since the ranks differ, the system is **inconsistent** (no solution).

### Number of Solutions

For a consistent system $A\mathbf{x} = \mathbf{b}$ where $A$ is $m \times n$:

- **Unique solution**: $\text{rank}(A) = n$ (full column rank)
- **Infinitely many solutions**: $\text{rank}(A) < n$
- The solution set has dimension $n - \text{rank}(A)$

**Example 8**: A consistent system $A\mathbf{x} = \mathbf{b}$ has $A$ as a $5 \times 8$ matrix with rank 6. Describe the solution set.

**Solution**:

Since the system is consistent and $\text{rank}(A) = 6 < 8$, there are **infinitely many solutions**.

The solution set has dimension:

$$n - \text{rank}(A) = 8 - 6 = 2$$

The general solution has the form:

$$\mathbf{x} = \mathbf{x}_p + t_1\mathbf{v}_1 + t_2\mathbf{v}_2$$

where $\mathbf{x}_p$ is a particular solution and $\{\mathbf{v}_1, \mathbf{v}_2\}$ is a basis for Nul $A$.

## Applications of Rank

### Data Analysis

In data matrices where rows represent observations and columns represent features:
- Rank measures the number of independent features
- Low rank suggests redundancy in the data
- Rank can guide dimensionality reduction

**Example**: A dataset with 100 features has a data matrix of rank 15, suggesting that only 15 independent features capture all the information.

### Linear Transformations

If $T: \mathbb{R}^n \to \mathbb{R}^m$ is a linear transformation with matrix $A$:
- $\text{rank}(A)$ is the dimension of the range of $T$
- $\text{nullity}(A)$ is the dimension of the kernel of $T$

### System Solvability

**Example 9**: For which value(s) of $k$ does the following system have a unique solution?

$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & k \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$$

**Solution**:

For a unique solution, the matrix must have full rank (rank 3), which means it must be invertible.

Row reduce:

$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & k \end{bmatrix} \xrightarrow{\text{reduce}} \begin{bmatrix} 1 & 2 & 3 \\ 0 & -3 & -6 \\ 0 & 0 & k - 9 \end{bmatrix}$$

For rank 3, we need $k - 9 \neq 0$, so $k \neq 9$.

Answer: The system has a unique solution for all $\mathbf{b}$ if and only if $k \neq 9$.

## Computing Rank: Step-by-Step Example

**Problem**: Find the rank of $A = \begin{bmatrix} 2 & 4 & -2 & 6 \\ 1 & 2 & 0 & 4 \\ 3 & 6 & -3 & 9 \\ 0 & 0 & 1 & 1 \end{bmatrix}$ and determine bases for Col $A$ and Nul $A$.

**Solution**:

**Step 1**: Row reduce to echelon form:

$$\begin{bmatrix} 2 & 4 & -2 & 6 \\ 1 & 2 & 0 & 4 \\ 3 & 6 & -3 & 9 \\ 0 & 0 & 1 & 1 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 & 4 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

**Step 2**: Count pivots. There are 2 pivot positions (columns 1 and 3).

$$\text{rank}(A) = 2$$

**Step 3**: Basis for Col $A$. The pivot columns in the original matrix form a basis:

$$\text{Basis for Col } A = \left\{\begin{bmatrix} 2 \\ 1 \\ 3 \\ 0 \end{bmatrix}, \begin{bmatrix} -2 \\ 0 \\ -3 \\ 1 \end{bmatrix}\right\}$$

**Step 4**: Basis for Nul $A$. The free variables are $x_2$ and $x_4$. From the RREF:

$$x_1 = -2x_2 - 4x_4, \quad x_3 = -x_4$$

Setting $x_2 = 1, x_4 = 0$: $\mathbf{v}_1 = \begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}$

Setting $x_2 = 0, x_4 = 1$: $\mathbf{v}_2 = \begin{bmatrix} -4 \\ 0 \\ -1 \\ 1 \end{bmatrix}$

$$\text{Basis for Nul } A = \left\{\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} -4 \\ 0 \\ -1 \\ 1 \end{bmatrix}\right\}$$

**Verification**: $\dim(\text{Nul } A) = 2$, and $\text{rank}(A) + \dim(\text{Nul } A) = 2 + 2 = 4 = n$ ✓

## Common Mistakes to Avoid

1. **Using RREF rows as a basis for Col $A$**: Use the original matrix columns, not RREF rows
2. **Forgetting that rank equals row rank**: The row space also has dimension equal to the rank
3. **Confusing rank with matrix size**: A $10 \times 10$ matrix can have any rank from 0 to 10
4. **Not checking augmented matrix for consistency**: Always check rank$([A|\mathbf{b}])$ for system consistency

## Practice Problems

1. Find the rank of $\begin{bmatrix} 1 & -1 & 3 & 5 \\ 2 & -1 & 7 & 8 \\ -1 & 2 & -6 & -7 \end{bmatrix}$.

2. If $A$ is $6 \times 9$ with nullity 4, what is rank$(A)$?

3. Show that rank$(A + B) \leq \text{rank}(A) + \text{rank}(B)$ using the column space interpretation.

4. For what values of $h$ does the matrix $\begin{bmatrix} 1 & h & 4 \\ 3 & 6 & 8 \end{bmatrix}$ have rank 1?

## Summary

The rank of a matrix measures the dimension of its column space (and row space) and equals the number of pivot positions. It provides essential information about linear systems: whether they have solutions and how many. The rank theorem connects rank to the dimension of the null space. Understanding rank is crucial for analyzing linear transformations, solving systems of equations, and working with data matrices in applications.
