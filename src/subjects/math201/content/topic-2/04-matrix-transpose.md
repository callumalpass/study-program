---
id: math201-t2-transpose
title: "Matrix Transpose"
order: 4
---

# Matrix Transpose

The transpose is a fundamental matrix operation that flips a matrix over its main diagonal, interchanging rows and columns. This operation appears throughout linear algebra—in defining symmetric matrices, computing dot products, solving least squares problems, and analyzing linear transformations. Understanding transpose properties is essential for advanced matrix theory.

## Definition

The **transpose** of an $m \times n$ matrix $A$, denoted $A^T$, is the $n \times m$ matrix obtained by writing the rows of $A$ as columns (or equivalently, the columns of $A$ as rows).

Formally: If $A = [a_{ij}]$, then $A^T = [a_{ji}]$.

**Example:**
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \Rightarrow A^T = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$$

Notice that $A$ is $2 \times 3$ while $A^T$ is $3 \times 2$.

**Geometric interpretation:** The transpose reflects the matrix across its main diagonal.

## Computing Transposes

**Example 1:** Square matrix
$$B = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \Rightarrow B^T = \begin{bmatrix} 1 & 4 & 7 \\ 2 & 5 & 8 \\ 3 & 6 & 9 \end{bmatrix}$$

**Example 2:** Row vector
$$\begin{bmatrix} 1 & 2 & 3 & 4 \end{bmatrix}^T = \begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}$$

The transpose converts a row vector to a column vector and vice versa.

**Example 3:** Diagonal matrix
$$D = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & -3 \end{bmatrix} \Rightarrow D^T = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & -3 \end{bmatrix} = D$$

Diagonal matrices are unchanged by transposition.

## Properties of Transpose

### 1. Double Transpose
$$(A^T)^T = A$$

Transposing twice returns the original matrix.

### 2. Transpose of a Sum
$$(A + B)^T = A^T + B^T$$

The transpose of a sum is the sum of transposes.

**Example:**
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$$

$$(A + B)^T = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}^T = \begin{bmatrix} 6 & 10 \\ 8 & 12 \end{bmatrix}$$

$$A^T + B^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} + \begin{bmatrix} 5 & 7 \\ 6 & 8 \end{bmatrix} = \begin{bmatrix} 6 & 10 \\ 8 & 12 \end{bmatrix}$$

### 3. Transpose of a Scalar Multiple
$$(cA)^T = c(A^T)$$

Scalars commute with transposition.

### 4. Transpose of a Product (Reversal Rule)
$$(AB)^T = B^T A^T$$

**Critical:** The order reverses! This is one of the most important transpose properties.

**Example:**
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

$$AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix} \Rightarrow (AB)^T = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$$

$$B^T = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \quad A^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$$

$$B^T A^T = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 1 & 3 \end{bmatrix}$$

Indeed, $(AB)^T = B^T A^T$.

**General case:** For any number of matrices:
$$(ABC \cdots XYZ)^T = Z^T Y^T X^T \cdots C^T B^T A^T$$

The transpose of a product is the product of transposes in **reverse order**.

### 5. Transpose and Identity
$$I^T = I$$

The identity matrix is symmetric.

## Symmetric Matrices

A square matrix $A$ is **symmetric** if $A^T = A$.

Equivalently: $a_{ij} = a_{ji}$ for all $i, j$.

**Examples of symmetric matrices:**

$$\begin{bmatrix} 2 & 3 \\ 3 & 5 \end{bmatrix}, \quad \begin{bmatrix} 1 & 0 & 2 \\ 0 & 4 & -1 \\ 2 & -1 & 3 \end{bmatrix}, \quad \begin{bmatrix} 5 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & -3 \end{bmatrix}$$

**Properties of symmetric matrices:**
- All diagonal matrices are symmetric
- The identity matrix is symmetric
- If $A$ is symmetric, so is $A^n$ for any positive integer $n$
- If $A$ is symmetric, so is $cA$ for any scalar $c$
- The sum of symmetric matrices is symmetric

**Creating symmetric matrices:**

For any matrix $A$, the matrices $A + A^T$ and $AA^T$ (and $A^T A$) are symmetric.

**Proof that $AA^T$ is symmetric:**
$$(AA^T)^T = (A^T)^T A^T = AA^T$$

**Example:** Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{bmatrix}$. Find $AA^T$.

$$A^T = \begin{bmatrix} 1 & 3 & 5 \\ 2 & 4 & 6 \end{bmatrix}$$

$$AA^T = \begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{bmatrix}\begin{bmatrix} 1 & 3 & 5 \\ 2 & 4 & 6 \end{bmatrix} = \begin{bmatrix} 5 & 11 & 17 \\ 11 & 25 & 39 \\ 17 & 39 & 61 \end{bmatrix}$$

This is indeed symmetric.

## Skew-Symmetric Matrices

A square matrix $A$ is **skew-symmetric** (or **antisymmetric**) if $A^T = -A$.

Equivalently: $a_{ij} = -a_{ji}$ for all $i, j$.

**Key observation:** All diagonal entries must be zero (since $a_{ii} = -a_{ii}$ implies $a_{ii} = 0$).

**Example:**
$$A = \begin{bmatrix} 0 & 2 & -1 \\ -2 & 0 & 3 \\ 1 & -3 & 0 \end{bmatrix}$$

Check: $A^T = \begin{bmatrix} 0 & -2 & 1 \\ 2 & 0 & -3 \\ -1 & 3 & 0 \end{bmatrix} = -A$ ✓

**Decomposition theorem:** Every square matrix can be uniquely written as the sum of a symmetric and a skew-symmetric matrix:

$$A = \frac{A + A^T}{2} + \frac{A - A^T}{2}$$

where $\frac{A + A^T}{2}$ is symmetric and $\frac{A - A^T}{2}$ is skew-symmetric.

**Example:** Decompose $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$.

$$A^T = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}$$

**Symmetric part:**
$$\frac{A + A^T}{2} = \frac{1}{2}\begin{bmatrix} 2 & 5 \\ 5 & 8 \end{bmatrix} = \begin{bmatrix} 1 & 5/2 \\ 5/2 & 4 \end{bmatrix}$$

**Skew-symmetric part:**
$$\frac{A - A^T}{2} = \frac{1}{2}\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -1/2 \\ 1/2 & 0 \end{bmatrix}$$

Verification:
$$\begin{bmatrix} 1 & 5/2 \\ 5/2 & 4 \end{bmatrix} + \begin{bmatrix} 0 & -1/2 \\ 1/2 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = A$$ ✓

## Transpose and Matrix Equations

The transpose helps solve certain matrix equations.

**Example:** Find all $2 \times 2$ matrices $X$ such that $X = X^T$ and $X^2 = I$.

**Solution:**

Since $X = X^T$, $X$ is symmetric. Write $X = \begin{bmatrix} a & b \\ b & c \end{bmatrix}$.

Then:
$$X^2 = \begin{bmatrix} a & b \\ b & c \end{bmatrix}\begin{bmatrix} a & b \\ b & c \end{bmatrix} = \begin{bmatrix} a^2+b^2 & ab+bc \\ ab+bc & b^2+c^2 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$

This gives:
- $a^2 + b^2 = 1$
- $ab + bc = 0 \Rightarrow b(a+c) = 0$
- $b^2 + c^2 = 1$

If $b = 0$: then $a^2 = 1$ and $c^2 = 1$, so $a, c \in \{-1, 1\}$.

Solutions: $\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}, \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}, \begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$

If $b \neq 0$: then $a + c = 0$, so $c = -a$. From $a^2 + b^2 = 1$ and $b^2 + c^2 = b^2 + a^2 = 1$ (consistent).

Solutions: $\begin{bmatrix} a & b \\ b & -a \end{bmatrix}$ where $a^2 + b^2 = 1$ (infinitely many).

## Applications

**Dot Products:** $\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v}$ (for column vectors)

**Orthogonal Matrices:** $Q^T Q = I$ (orthonormal columns)

**Quadratic Forms:** $\mathbf{x}^T A \mathbf{x}$ appears in optimization and statistics

**Least Squares:** Normal equations $A^T A\mathbf{x} = A^T \mathbf{b}$

**Covariance Matrices:** Always symmetric, crucial in statistics

**Adjacency Matrices:** Undirected graphs have symmetric adjacency matrices

## Summary

- The transpose $A^T$ interchanges rows and columns
- $(A^T)^T = A$ and $(A+B)^T = A^T + B^T$
- **Reversal rule:** $(AB)^T = B^T A^T$
- A matrix is symmetric if $A^T = A$ (entries satisfy $a_{ij} = a_{ji}$)
- A matrix is skew-symmetric if $A^T = -A$ (diagonal must be zero)
- Every matrix decomposes into symmetric plus skew-symmetric parts
- Symmetric matrices are central to quadratic forms, optimization, and statistics
- Transpose properties simplify many matrix equation manipulations
