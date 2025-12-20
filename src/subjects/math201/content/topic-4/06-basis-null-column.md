# Basis for Null Space, Column Space, and Row Space

## Introduction

Every matrix has three fundamental subspaces associated with it: the null space, the column space, and the row space. Understanding how to find bases for these spaces is essential for solving linear systems, analyzing linear transformations, and understanding the structure of matrices. Each of these spaces captures different aspects of the matrix's behavior.

## The Three Fundamental Subspaces

For an $m \times n$ matrix $A$:

1. **Null Space** (Nul $A$ or Ker $A$): The set of all solutions to $A\mathbf{x} = \mathbf{0}$
   - Subspace of $\mathbb{R}^n$
   - Dimension: nullity$(A) = n - \text{rank}(A)$

2. **Column Space** (Col $A$ or Im $A$): The span of the columns of $A$
   - Subspace of $\mathbb{R}^m$
   - Dimension: rank$(A)$

3. **Row Space** (Row $A$): The span of the rows of $A$ (or Col $A^T$)
   - Subspace of $\mathbb{R}^n$
   - Dimension: rank$(A)$

## Finding a Basis for the Null Space

The null space consists of all vectors $\mathbf{x}$ satisfying $A\mathbf{x} = \mathbf{0}$.

### Algorithm

1. Write the homogeneous system $A\mathbf{x} = \mathbf{0}$
2. Row reduce $A$ to RREF
3. Identify the free variables
4. Express the basic variables in terms of the free variables
5. Write the general solution as a linear combination
6. The coefficient vectors form a basis for Nul $A$

### Example 1: Finding a Basis for Nul $A$

Find a basis for the null space of $A = \begin{bmatrix} 1 & 3 & 5 & 0 \\ 2 & 6 & 8 & 1 \\ -1 & -3 & -7 & 2 \end{bmatrix}$.

**Solution**:

**Step 1**: Row reduce to RREF:

$$\begin{bmatrix} 1 & 3 & 5 & 0 \\ 2 & 6 & 8 & 1 \\ -1 & -3 & -7 & 2 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Step 2**: Identify variables. Pivot columns: 1, 3, 4. Free variable: $x_2$.

**Step 3**: Express basic variables in terms of free variables:
- From row 1: $x_1 + 3x_2 = 0 \implies x_1 = -3x_2$
- From row 2: $x_3 = 0$
- From row 3: $x_4 = 0$

**Step 4**: Write the general solution:

$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} -3x_2 \\ x_2 \\ 0 \\ 0 \end{bmatrix} = x_2\begin{bmatrix} -3 \\ 1 \\ 0 \\ 0 \end{bmatrix}$$

**Step 5**: The basis for Nul $A$ is:

$$\mathcal{B}_{\text{null}} = \left\{\begin{bmatrix} -3 \\ 1 \\ 0 \\ 0 \end{bmatrix}\right\}$$

**Verification**: $\dim(\text{Nul } A) = 1$ and rank$(A) = 3$, so $1 + 3 = 4$ ✓

### Example 2: Multiple Free Variables

Find a basis for Nul $A$ where $A = \begin{bmatrix} 1 & 2 & -1 & 3 & 5 \\ 2 & 4 & -1 & 7 & 11 \\ -1 & -2 & 0 & -4 & -6 \end{bmatrix}$.

**Solution**:

Row reduce:

$$A \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 & 4 & 6 \\ 0 & 0 & 1 & 1 & 1 \\ 0 & 0 & 0 & 0 & 0 \end{bmatrix}$$

Pivot columns: 1, 3. Free variables: $x_2, x_4, x_5$.

From the RREF:
- $x_1 = -2x_2 - 4x_4 - 6x_5$
- $x_3 = -x_4 - x_5$

General solution:

$$\mathbf{x} = x_2\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix} + x_4\begin{bmatrix} -4 \\ 0 \\ -1 \\ 1 \\ 0 \end{bmatrix} + x_5\begin{bmatrix} -6 \\ 0 \\ -1 \\ 0 \\ 1 \end{bmatrix}$$

Basis for Nul $A$:

$$\mathcal{B}_{\text{null}} = \left\{\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} -4 \\ 0 \\ -1 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} -6 \\ 0 \\ -1 \\ 0 \\ 1 \end{bmatrix}\right\}$$

$\dim(\text{Nul } A) = 3$

## Finding a Basis for the Column Space

The column space is the span of the columns of $A$.

### Algorithm

1. Row reduce $A$ to echelon form
2. Identify the pivot columns
3. The corresponding columns from the **original matrix** $A$ form a basis for Col $A$

**IMPORTANT**: Use the original matrix columns, not the reduced form!

### Example 3: Finding a Basis for Col $A$

Find a basis for the column space of $A = \begin{bmatrix} 1 & 3 & 0 & -1 \\ 2 & 6 & 1 & 4 \\ 1 & 3 & 1 & 5 \end{bmatrix}$.

**Solution**:

**Step 1**: Row reduce to echelon form:

$$\begin{bmatrix} 1 & 3 & 0 & -1 \\ 2 & 6 & 1 & 4 \\ 1 & 3 & 1 & 5 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 3 & 0 & -1 \\ 0 & 0 & 1 & 6 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

**Step 2**: Pivot columns are 1 and 3.

**Step 3**: Take columns 1 and 3 from the **original** matrix:

$$\mathcal{B}_{\text{col}} = \left\{\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}\right\}$$

This basis spans Col $A$ and $\dim(\text{Col } A) = 2 = \text{rank}(A)$.

### Why Use Original Columns?

The row operations preserve the dependence relationships between columns but change the column space itself. The pivot positions tell us which original columns are independent.

**Example**: For $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix} \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix}$

- Col $A = \text{Span}\left\{\begin{bmatrix} 1 \\ 2 \end{bmatrix}\right\}$ (a line in $\mathbb{R}^2$)
- The RREF column is $\begin{bmatrix} 1 \\ 0 \end{bmatrix}$, which is NOT in Col $A$

## Finding a Basis for the Row Space

The row space is the span of the rows of $A$ (equivalently, the column space of $A^T$).

### Method 1: Using RREF Rows

The nonzero rows of the RREF form a basis for Row $A$.

**Example 4**: Find a basis for the row space of $A = \begin{bmatrix} 1 & 3 & 5 & 7 \\ 2 & 6 & 11 & 16 \\ 1 & 3 & 6 & 9 \end{bmatrix}$.

**Solution**:

Row reduce:

$$A \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 3 & 0 & -1 \\ 0 & 0 & 1 & 2 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

The nonzero rows form a basis for Row $A$:

$$\mathcal{B}_{\text{row}} = \left\{\begin{bmatrix} 1 \\ 3 \\ 0 \\ -1 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 2 \end{bmatrix}\right\}$$

(Written as column vectors for consistency, though they represent rows.)

$\dim(\text{Row } A) = 2 = \text{rank}(A)$

### Method 2: Using Column Space of $A^T$

Since Row $A$ = Col $A^T$, we can:
1. Compute $A^T$
2. Find a basis for Col $A^T$ using the standard method

This gives us rows from the original matrix.

### Why RREF Rows Work

Row operations preserve the row space (each row in RREF is a linear combination of original rows, and vice versa). The nonzero rows in RREF are automatically linearly independent and span the same space.

## Relationships Between Subspaces

### Dimension Relationships

For an $m \times n$ matrix $A$:

1. $\dim(\text{Col } A) = \dim(\text{Row } A) = \text{rank}(A)$
2. $\dim(\text{Nul } A) = n - \text{rank}(A)$
3. $\dim(\text{Col } A) + \dim(\text{Nul } A) = n$

### Orthogonality

The row space and null space are **orthogonal complements** in $\mathbb{R}^n$:
- Every vector in Row $A$ is orthogonal to every vector in Nul $A$
- Row $A \oplus$ Nul $A = \mathbb{R}^n$

**Example**: If $\mathbf{v} \in \text{Row } A$ and $\mathbf{w} \in \text{Nul } A$, then $\mathbf{v} \cdot \mathbf{w} = 0$.

## Complete Example: All Three Bases

**Problem**: Find bases for Nul $A$, Col $A$, and Row $A$ where:

$$A = \begin{bmatrix} 1 & 2 & 3 & 2 \\ 2 & 4 & 8 & 6 \\ 3 & 6 & 11 & 8 \end{bmatrix}$$

**Solution**:

**Step 1**: Row reduce to RREF:

$$A \xrightarrow{\text{RREF}} \begin{bmatrix} 1 & 2 & 0 & -1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Pivot columns: 1, 3. Free variables: $x_2, x_4$. Rank = 2.

**Step 2**: Basis for Nul $A$.

From RREF:
- $x_1 = -2x_2 + x_4$
- $x_3 = -x_4$

Setting $x_2 = 1, x_4 = 0$: $\mathbf{v}_1 = \begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}$

Setting $x_2 = 0, x_4 = 1$: $\mathbf{v}_2 = \begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}$

$$\boxed{\mathcal{B}_{\text{null}} = \left\{\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 1 \\ 0 \\ -1 \\ 1 \end{bmatrix}\right\}}$$

**Step 3**: Basis for Col $A$.

Pivot columns 1 and 3 from the original matrix:

$$\boxed{\mathcal{B}_{\text{col}} = \left\{\begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \begin{bmatrix} 3 \\ 8 \\ 11 \end{bmatrix}\right\}}$$

**Step 4**: Basis for Row $A$.

Nonzero rows from RREF:

$$\boxed{\mathcal{B}_{\text{row}} = \left\{\begin{bmatrix} 1 \\ 2 \\ 0 \\ -1 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 1 \end{bmatrix}\right\}}$$

**Verification**:
- $\dim(\text{Nul } A) = 2$
- $\dim(\text{Col } A) = 2$
- $\dim(\text{Row } A) = 2$
- $2 + 2 = 4 = n$ ✓

## Applications

### Solving $A\mathbf{x} = \mathbf{b}$

- **Col $A$**: Determines which $\mathbf{b}$ make the system consistent
- **Nul $A$**: Gives the homogeneous solutions; $\mathbf{x}_h \in \text{Nul } A$
- General solution: $\mathbf{x} = \mathbf{x}_p + \mathbf{x}_h$ where $\mathbf{x}_p$ is a particular solution

### Linear Transformations

If $T: \mathbb{R}^n \to \mathbb{R}^m$ has matrix $A$:
- Col $A$ = Im$(T)$ (range/image)
- Nul $A$ = Ker$(T)$ (kernel)
- Row $A$ relates to the "input directions" that matter

### Data Analysis

For a data matrix:
- Col $A$: Shows relationships between observations
- Row $A$: Shows relationships between features
- Nul $A$: Redundant feature combinations

## Common Mistakes to Avoid

1. **Using RREF columns for Col $A$**: Always use original matrix columns at pivot positions
2. **Using original rows for Row $A$**: RREF nonzero rows are simpler and work perfectly
3. **Forgetting to check dimensions**: Verify that $\dim(\text{Nul } A) + \text{rank}(A) = n$
4. **Mixing up which space lives where**: Nul $A$ and Row $A$ are in $\mathbb{R}^n$; Col $A$ is in $\mathbb{R}^m$

## Practice Problems

1. Find bases for Nul $A$, Col $A$, and Row $A$ for $A = \begin{bmatrix} 1 & -1 & 2 & 0 \\ 2 & -2 & 5 & 1 \\ -1 & 1 & -3 & 1 \end{bmatrix}$.

2. If $A$ is $5 \times 7$ with a 3-dimensional null space, what is dim(Row $A$)?

3. Show that if $\mathbf{v} \in \text{Row } A$ and $\mathbf{w} \in \text{Nul } A$, then $\mathbf{v} \cdot \mathbf{w} = 0$.

4. Find a basis for the null space of $\begin{bmatrix} 1 & 1 & 1 & 1 \\ 1 & 2 & 3 & 4 \end{bmatrix}$.

## Summary

The null space, column space, and row space are three fundamental subspaces associated with any matrix. To find a basis for Nul $A$, solve $A\mathbf{x} = \mathbf{0}$ and express the solution parametrically. To find a basis for Col $A$, identify pivot columns via row reduction and take those columns from the original matrix. To find a basis for Row $A$, take the nonzero rows from the RREF. These subspaces satisfy important dimension relationships through the rank-nullity theorem and provide crucial information for solving linear systems and understanding linear transformations.
