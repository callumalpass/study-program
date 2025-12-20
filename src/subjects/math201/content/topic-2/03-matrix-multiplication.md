---
id: math201-t2-multiplication
title: "Matrix Multiplication"
order: 3
---

# Matrix Multiplication

Matrix multiplication is one of the most important—and initially surprising—operations in linear algebra. Unlike addition, matrix multiplication is not entry-wise, and the order matters. This operation encodes the composition of linear transformations, making it fundamental to everything from solving systems of equations to computer graphics and quantum mechanics.

## The Definition

Let $A$ be an $m \times n$ matrix and $B$ be an $n \times p$ matrix. Their product $AB$ is an $m \times p$ matrix where the entry in row $i$, column $j$ is:

$$(AB)_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

In words: the $(i,j)$-entry of $AB$ is the **dot product** of the $i$-th row of $A$ with the $j$-th column of $B$.

**Critical requirement:** The number of columns in $A$ must equal the number of rows in $B$.

$$\underbrace{A}_{m \times n} \cdot \underbrace{B}_{n \times p} = \underbrace{AB}_{m \times p}$$

The inner dimensions must match; the outer dimensions give the result size.

## Computing Matrix Products: Step by Step

**Example 1:** Compute $AB$ where $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}$.

**Solution:**

Both matrices are $2 \times 2$, so the product exists and will be $2 \times 2$.

**Entry (1,1):** Row 1 of $A$ times column 1 of $B$:
$$(1)(5) + (2)(7) = 5 + 14 = 19$$

**Entry (1,2):** Row 1 of $A$ times column 2 of $B$:
$$(1)(6) + (2)(8) = 6 + 16 = 22$$

**Entry (2,1):** Row 2 of $A$ times column 1 of $B$:
$$(3)(5) + (4)(7) = 15 + 28 = 43$$

**Entry (2,2):** Row 2 of $A$ times column 2 of $B$:
$$(3)(6) + (4)(8) = 18 + 32 = 50$$

Therefore:
$$AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

**Example 2:** Compute $CD$ where $C = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ and $D = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ -1 & 2 \end{bmatrix}$.

**Solution:**

$C$ is $2 \times 3$ and $D$ is $3 \times 2$, so $CD$ is $2 \times 2$.

**Entry (1,1):**
$$(1)(1) + (2)(0) + (3)(-1) = 1 + 0 - 3 = -2$$

**Entry (1,2):**
$$(1)(0) + (2)(1) + (3)(2) = 0 + 2 + 6 = 8$$

**Entry (2,1):**
$$(4)(1) + (5)(0) + (6)(-1) = 4 + 0 - 6 = -2$$

**Entry (2,2):**
$$(4)(0) + (5)(1) + (6)(2) = 0 + 5 + 12 = 17$$

Therefore:
$$CD = \begin{bmatrix} -2 & 8 \\ -2 & 17 \end{bmatrix}$$

## Non-Commutativity: Order Matters!

**Matrix multiplication is NOT commutative:** In general, $AB \neq BA$.

**Example:** Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$.

$$AB = \begin{bmatrix} (1)(0)+(2)(1) & (1)(1)+(2)(0) \\ (3)(0)+(4)(1) & (3)(1)+(4)(0) \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}$$

$$BA = \begin{bmatrix} (0)(1)+(1)(3) & (0)(2)+(1)(4) \\ (1)(1)+(0)(3) & (1)(2)+(0)(4) \end{bmatrix} = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}$$

Clearly $AB \neq BA$.

**Why does this matter?** In applications, the order of operations is critical. Rotating then translating a computer graphic gives a different result than translating then rotating.

## Properties of Matrix Multiplication

Despite non-commutativity, matrix multiplication satisfies many useful properties:

### 1. Associativity
$$(AB)C = A(BC)$$

You can multiply a chain of matrices in any grouping.

### 2. Distributivity (Left and Right)
$$A(B + C) = AB + AC$$
$$(A + B)C = AC + BC$$

### 3. Scalar Multiplication Compatibility
$$c(AB) = (cA)B = A(cB)$$

Scalars can "float through" products.

### 4. Identity Property
$$AI = IA = A$$

for appropriate identity matrices.

### 5. Zero Property
$$A \cdot O = O \cdot A = O$$

Multiplying by zero gives zero (with appropriate dimensions).

**Example verifying associativity:**

Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$, $C = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$

Compute $(AB)C$:
$$AB = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$$
$$(AB)C = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 4 & 5 \\ 10 & 11 \end{bmatrix}$$

Compute $A(BC)$:
$$BC = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$$
$$A(BC) = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 4 & 5 \\ 10 & 11 \end{bmatrix}$$

Indeed, $(AB)C = A(BC)$.

## Matrix Powers

For a square matrix $A$, we define:
$$A^n = \underbrace{A \cdot A \cdot \ldots \cdot A}_{n \text{ times}}$$

**Example:** If $A = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}$, find $A^3$.

**Solution:**
$$A^2 = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$$

$$A^3 = A^2 \cdot A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 3 \\ 0 & 1 \end{bmatrix}$$

**Pattern recognition:** $A^n = \begin{bmatrix} 1 & n \\ 0 & 1 \end{bmatrix}$ (verifiable by induction).

## Row and Column Perspectives

### Row-Column Rule (Standard)
$(AB)_{ij}$ = (row $i$ of $A$) $\cdot$ (column $j$ of $B$)

### Column Perspective
Each column of $AB$ is a linear combination of the columns of $A$, with coefficients from the corresponding column of $B$.

**Example:** If $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 5 & 7 \\ 6 & 8 \end{bmatrix}$:

First column of $AB$: $5\begin{bmatrix} 1 \\ 3 \end{bmatrix} + 6\begin{bmatrix} 2 \\ 4 \end{bmatrix} = \begin{bmatrix} 17 \\ 39 \end{bmatrix}$

Second column of $AB$: $7\begin{bmatrix} 1 \\ 3 \end{bmatrix} + 8\begin{bmatrix} 2 \\ 4 \end{bmatrix} = \begin{bmatrix} 23 \\ 53 \end{bmatrix}$

Thus $AB = \begin{bmatrix} 17 & 23 \\ 39 & 53 \end{bmatrix}$.

### Row Perspective
Each row of $AB$ is a linear combination of the rows of $B$, with coefficients from the corresponding row of $A$.

## Non-Invertibility of Products

Even if $AB = O$ (the zero matrix), we **cannot** conclude that $A = O$ or $B = O$.

**Example:**
$$\begin{bmatrix} 1 & 1 \\ 2 & 2 \end{bmatrix}\begin{bmatrix} 1 & 2 \\ -1 & -2 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

Neither factor is zero, yet their product is zero. This shows matrices can have **zero divisors**.

## Applications

**Linear Transformations:** Composing transformations corresponds to matrix multiplication

**Graph Theory:** Powers of adjacency matrices count paths of given length

**Markov Chains:** Transition matrix multiplication gives multi-step probabilities

**Computer Graphics:** Combining rotation, scaling, and translation matrices

**Quantum Mechanics:** Operators (matrices) act on state vectors; composition is multiplication

## Summary

- Matrix multiplication is defined as row-column dot products
- Inner dimensions must match: $(m \times n)(n \times p) = (m \times p)$
- Matrix multiplication is **not commutative**: $AB \neq BA$ in general
- Matrix multiplication **is associative**: $(AB)C = A(BC)$
- Distributive property holds over addition
- Matrix powers iterate multiplication for square matrices
- Products can be zero even when factors are nonzero
- Order of operations matters critically in applications
