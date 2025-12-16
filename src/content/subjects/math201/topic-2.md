## Introduction

Matrix operations form the computational heart of linear algebra. While vectors and systems of equations provide the conceptual foundation, matrices give us the algebraic machinery to solve problems efficiently. This topic develops your fluency with matrix arithmetic—addition, multiplication, transposition, and inversion—and reveals how these operations encode fundamental concepts like linear transformations and system solving.

**Why This Matters:**
Matrix operations appear throughout mathematics, science, and engineering. They enable computer graphics transformations, solve systems of linear equations, model economic interdependencies, analyze networks, process digital images, and underpin machine learning algorithms. Mastering matrix operations is essential for anyone working with data, optimization, or computational methods.

**Learning Objectives:**
- Understand matrix dimensions, notation, and special matrices
- Perform matrix addition, subtraction, and scalar multiplication
- Compute matrix products and understand non-commutativity
- Calculate and apply the matrix transpose
- Determine when matrices are invertible and compute inverses
- Represent row operations as elementary matrices
- Apply matrices to computer graphics, Markov chains, and economic models

---

## Core Concepts

### Matrix Fundamentals

A **matrix** is a rectangular array of numbers with $m$ rows and $n$ columns, denoted as an $m \times n$ matrix. Entry $a_{ij}$ is in row $i$, column $j$.

**Special matrices:**
- **Zero matrix** $O$: all entries are zero (additive identity)
- **Identity matrix** $I_n$: ones on diagonal, zeros elsewhere (multiplicative identity)
- **Diagonal matrix**: nonzero entries only on main diagonal
- **Triangular matrices**: zeros above (lower triangular) or below (upper triangular) diagonal

**Example:**
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \text{ is } 2 \times 3, \quad I_2 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$

### Matrix Addition and Scalar Multiplication

**Addition:** Matrices must have the same dimensions. Add entry-wise:
$$A + B = [a_{ij} + b_{ij}]$$

**Scalar multiplication:** Multiply every entry by scalar $c$:
$$cA = [ca_{ij}]$$

**Properties:**
- Addition is commutative: $A + B = B + A$
- Addition is associative: $(A + B) + C = A + (B + C)$
- Distributive: $c(A + B) = cA + cB$ and $(c + d)A = cA + dA$
- Additive identity: $A + O = A$

**Example:**
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 6 & 8 \\ 10 & 12 \end{bmatrix}$$

$$3\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix}$$

### Matrix Multiplication

For $A$ ($m \times n$) and $B$ ($n \times p$), the product $AB$ is $m \times p$ where:
$$(AB)_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj}$$

Entry $(i,j)$ is the dot product of row $i$ of $A$ with column $j$ of $B$.

**Critical:** The number of columns in $A$ must equal the number of rows in $B$.

**Non-commutativity:** In general, $AB \neq BA$. Order matters!

**Properties:**
- Associative: $(AB)C = A(BC)$
- Distributive: $A(B + C) = AB + AC$ and $(A + B)C = AC + BC$
- Identity: $AI = IA = A$
- NOT commutative: $AB \neq BA$ in general

**Example:**
$$\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

But:
$$\begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 23 & 34 \\ 31 & 46 \end{bmatrix}$$

### Matrix Transpose

The **transpose** $A^T$ interchanges rows and columns: if $A = [a_{ij}]$, then $A^T = [a_{ji}]$.

An $m \times n$ matrix becomes $n \times m$.

**Properties:**
- $(A^T)^T = A$
- $(A + B)^T = A^T + B^T$
- $(cA)^T = c(A^T)$
- **Reversal rule:** $(AB)^T = B^T A^T$

**Symmetric matrices:** $A^T = A$ (entries satisfy $a_{ij} = a_{ji}$)

**Skew-symmetric matrices:** $A^T = -A$ (diagonal must be zero)

**Example:**
$$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}^T = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}$$

### Matrix Inverse

A square matrix $A$ is **invertible** if there exists $A^{-1}$ such that:
$$AA^{-1} = A^{-1}A = I$$

**For $2 \times 2$ matrices:**
$$\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

Invertible if and only if $\det(A) = ad - bc \neq 0$.

**Properties:**
- $(A^{-1})^{-1} = A$
- **Reversal rule:** $(AB)^{-1} = B^{-1}A^{-1}$
- $(A^T)^{-1} = (A^{-1})^T$

**Computing inverses:** Use row reduction: $[A \mid I] \xrightarrow{\text{row ops}} [I \mid A^{-1}]$

**Solving systems:** If $A$ is invertible, $A\mathbf{x} = \mathbf{b}$ has solution $\mathbf{x} = A^{-1}\mathbf{b}$.

### Elementary Matrices

An **elementary matrix** is obtained by performing a single row operation on $I$.

**Three types:**
1. **Row swap:** interchange two rows
2. **Row scaling:** multiply a row by nonzero scalar
3. **Row replacement:** add a multiple of one row to another

**Key insight:** Multiplying $EA$ performs the corresponding row operation on $A$.

**Inverses:** All elementary matrices are invertible:
- Swapping reverses by swapping again
- Scaling by $c$ reverses by scaling by $1/c$
- Adding $c$ times row $j$ to row $i$ reverses by adding $-c$ times row $j$ to row $i$

**Theorem:** A matrix is invertible if and only if it is a product of elementary matrices.

---

## Common Patterns and Techniques

### Matrix Multiplication Strategies

**Row-column method:** Entry $(i,j)$ of $AB$ = (row $i$ of $A$) $\cdot$ (column $j$ of $B$)

**Column perspective:** Each column of $AB$ is a linear combination of columns of $A$

**Row perspective:** Each row of $AB$ is a linear combination of rows of $B$

### Verifying Inverses

To check if $B = A^{-1}$, verify $AB = I$ (or $BA = I$, either suffices).

### Transpose Shortcuts

- Diagonal matrices: $D^T = D$
- Identity: $I^T = I$
- Symmetric matrices are their own transpose

### Pattern Recognition

- Powers of diagonal matrices: $D^n$ has diagonal entries raised to $n$-th power
- Powers of certain matrices follow patterns (use induction to prove)

---

## Common Mistakes and Debugging

### Mistake 1: Assuming Commutativity
**Wrong:** $AB = BA$

Matrix multiplication is **not** commutative. Always maintain order.

### Mistake 2: Incorrect Dimension Matching
Trying to multiply $A$ ($m \times n$) with $B$ ($p \times q$) where $n \neq p$ is undefined.

### Mistake 3: Entry-wise Multiplication
**Wrong:** $(AB)_{ij} = a_{ij}b_{ij}$

Matrix multiplication is **not** entry-wise; use dot products of rows and columns.

### Mistake 4: Transpose Product Order
**Wrong:** $(AB)^T = A^T B^T$

**Correct:** $(AB)^T = B^T A^T$ (order reverses)

### Mistake 5: Inverse Product Order
**Wrong:** $(AB)^{-1} = A^{-1} B^{-1}$

**Correct:** $(AB)^{-1} = B^{-1} A^{-1}$ (order reverses)

### Mistake 6: Dividing by Matrices
There is no "division" operation for matrices. Instead, multiply by the inverse: solve $AX = B$ as $X = A^{-1}B$ (if $A$ is invertible).

---

## Best Practices

1. **Check dimensions first** before attempting operations
2. **Verify special properties** (symmetry, triangular form) to simplify computation
3. **Use block matrix techniques** for large structured matrices
4. **Verify inverses** by checking $AA^{-1} = I$
5. **Preserve order** in products—write $AB$ and $BA$ as distinct
6. **Use row reduction systematically** for inverses and solving systems
7. **Think geometrically** for transformations (rotation, scaling, reflection)

---

## Applications Preview

### Computer Graphics
Matrices encode geometric transformations:
- **Scaling:** $\begin{bmatrix} s_x & 0 \\ 0 & s_y \end{bmatrix}$
- **Rotation:** $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$
- **Composition:** Multiple transformations via matrix products

### Markov Chains
Transition matrices model probabilistic systems:
- State evolution: $\mathbf{x}_{n+1} = P^T \mathbf{x}_n$
- Steady-state distributions from eigenvectors
- Applications: PageRank, weather, finance

### Input-Output Economics
Leontief models use matrices to describe economic interdependencies:
- Production equation: $\mathbf{x} = (I - A)^{-1}\mathbf{d}$
- Consumption matrix $A$ describes inter-sector requirements
- Economic multipliers from the Leontief inverse

---

## Summary

- Matrices are rectangular arrays with dimension $m \times n$
- Addition is entry-wise; requires matching dimensions
- Multiplication uses row-column dot products; inner dimensions must match
- **Matrix multiplication is NOT commutative:** $AB \neq BA$
- Transpose flips rows and columns; **reversal rule:** $(AB)^T = B^T A^T$
- Symmetric matrices satisfy $A^T = A$
- Invertible matrices satisfy $AA^{-1} = I$; **reversal rule:** $(AB)^{-1} = B^{-1}A^{-1}$
- Elementary matrices encode row operations
- Applications span graphics, probability, economics, and beyond

---

## Further Exploration

- **Determinants:** Formula for computing $\det(A)$, relation to invertibility
- **Eigenvalues and Eigenvectors:** $A\mathbf{v} = \lambda\mathbf{v}$, diagonalization
- **Matrix Factorizations:** LU, QR, SVD decompositions
- **Numerical Stability:** Condition numbers, avoiding numerical errors
- **Sparse Matrices:** Efficient storage and computation for matrices with many zeros
- **Block Matrices:** Partitioning large matrices into submatrices
