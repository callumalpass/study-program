---
id: math201-t2-fundamentals
title: "Matrix Fundamentals"
order: 1
---

# Matrix Fundamentals

Matrices are rectangular arrays of numbers that form the language of linear algebra. They appear everywhere in modern mathematics, science, and engineering—from solving systems of equations to representing data in machine learning, from computer graphics to quantum mechanics. Understanding matrices is essential for anyone working with linear transformations, data science, or computational mathematics.

## What is a Matrix?

A **matrix** is a rectangular array of numbers arranged in rows and columns. We denote matrices with capital letters and their entries with lowercase subscripted letters:

$$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \end{bmatrix}$$

The entry $a_{ij}$ is in the $i$-th row and $j$-th column. This is called **subscript notation**.

## Matrix Dimensions

The **size** or **dimension** of a matrix is given by the number of rows $m$ and columns $n$, written as $m \times n$ (read "$m$ by $n$").

**Example:**
$$B = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 5 & 6 & 7 & 8 \\ 9 & 10 & 11 & 12 \end{bmatrix}$$

Matrix $B$ is $3 \times 4$ (3 rows, 4 columns).

**Special cases:**
- A $1 \times n$ matrix is called a **row vector**
- An $m \times 1$ matrix is called a **column vector**
- An $n \times n$ matrix is called a **square matrix** of order $n$

## Matrix Notation

There are several ways to denote matrices:

1. **Bracket notation:** $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$
2. **Parenthesis notation:** $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$
3. **Compact notation:** $A = [a_{ij}]$ where the subscripts indicate the general form

**Example:** If $A = [a_{ij}]$ is a $2 \times 3$ matrix where $a_{ij} = i + 2j$, then:

$$a_{11} = 1 + 2(1) = 3, \quad a_{12} = 1 + 2(2) = 5, \quad a_{13} = 1 + 2(3) = 7$$
$$a_{21} = 2 + 2(1) = 4, \quad a_{22} = 2 + 2(2) = 6, \quad a_{23} = 2 + 2(3) = 8$$

Therefore:
$$A = \begin{bmatrix} 3 & 5 & 7 \\ 4 & 6 & 8 \end{bmatrix}$$

## Special Matrices

### Zero Matrix

A **zero matrix** (denoted $O$ or $0$) has all entries equal to zero:

$$O_{2 \times 3} = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

The zero matrix acts as the additive identity in matrix algebra.

### Identity Matrix

An **identity matrix** (denoted $I_n$ or simply $I$) is a square $n \times n$ matrix with ones on the main diagonal and zeros elsewhere:

$$I_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

More formally: $I = [δ_{ij}]$ where $δ_{ij}$ is the **Kronecker delta**:
$$δ_{ij} = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \neq j \end{cases}$$

The identity matrix acts as the multiplicative identity: $AI = IA = A$ for any compatible square matrix $A$.

### Diagonal Matrix

A **diagonal matrix** is a square matrix with nonzero entries only on the main diagonal:

$$D = \begin{bmatrix} 5 & 0 & 0 \\ 0 & -2 & 0 \\ 0 & 0 & 7 \end{bmatrix}$$

We can write this compactly as $D = \text{diag}(5, -2, 7)$.

**Properties:**
- All diagonal matrices commute with each other under multiplication
- Identity and zero matrices are special cases of diagonal matrices
- Diagonal matrices are easy to compute with: powers and inverses are straightforward

### Upper and Lower Triangular Matrices

An **upper triangular matrix** has all zeros below the main diagonal:

$$U = \begin{bmatrix} 2 & 3 & 1 \\ 0 & 5 & 4 \\ 0 & 0 & -1 \end{bmatrix}$$

A **lower triangular matrix** has all zeros above the main diagonal:

$$L = \begin{bmatrix} 2 & 0 & 0 \\ 3 & 5 & 0 \\ 1 & 4 & -1 \end{bmatrix}$$

**Properties:**
- The product of upper (or lower) triangular matrices is upper (or lower) triangular
- The determinant is the product of diagonal entries
- Triangular matrices are crucial in solving systems via Gaussian elimination

## Matrix Equality

Two matrices $A$ and $B$ are **equal** if and only if:
1. They have the same dimensions ($m \times n$)
2. All corresponding entries are equal: $a_{ij} = b_{ij}$ for all $i, j$

**Example:**
$$\begin{bmatrix} x + 1 & 2y \\ 3 & z \end{bmatrix} = \begin{bmatrix} 4 & 6 \\ 3 & -2 \end{bmatrix}$$

This equality holds if and only if:
- $x + 1 = 4 \Rightarrow x = 3$
- $2y = 6 \Rightarrow y = 3$
- $z = -2$

## Working Example: Building Matrices

**Problem:** Construct a $4 \times 4$ matrix $M = [m_{ij}]$ where $m_{ij} = |i - j|$.

**Solution:**

We calculate each entry using the given formula:

Row 1: $m_{11} = |1-1| = 0, m_{12} = |1-2| = 1, m_{13} = |1-3| = 2, m_{14} = |1-4| = 3$

Row 2: $m_{21} = |2-1| = 1, m_{22} = |2-2| = 0, m_{23} = |2-3| = 1, m_{24} = |2-4| = 2$

Row 3: $m_{31} = |3-1| = 2, m_{32} = |3-2| = 1, m_{33} = |3-3| = 0, m_{34} = |3-4| = 1$

Row 4: $m_{41} = |4-1| = 3, m_{42} = |4-2| = 2, m_{43} = |4-3| = 1, m_{44} = |4-4| = 0$

Therefore:
$$M = \begin{bmatrix} 0 & 1 & 2 & 3 \\ 1 & 0 & 1 & 2 \\ 2 & 1 & 0 & 1 \\ 3 & 2 & 1 & 0 \end{bmatrix}$$

Notice this matrix is symmetric (equal to its transpose) and has a distinctive band structure.

## Applications Preview

Matrices represent:
- **Systems of linear equations:** Coefficient matrix, augmented matrix
- **Linear transformations:** Rotation, scaling, shearing in computer graphics
- **Data tables:** Rows as observations, columns as features
- **Networks:** Adjacency matrices for graphs
- **Quantum states:** State vectors and operators in quantum mechanics
- **Markov processes:** Transition probability matrices

## Summary

- A matrix is a rectangular array of numbers with specified dimensions $m \times n$
- Matrix entries are indexed by row $i$ and column $j$ as $a_{ij}$
- The zero matrix has all zeros; the identity matrix has ones on the diagonal
- Diagonal matrices have nonzero entries only on the main diagonal
- Triangular matrices have zeros above or below the diagonal
- Matrix equality requires same dimensions and all corresponding entries equal
- Special matrices have distinctive properties that simplify computation
