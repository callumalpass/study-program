---
id: math201-t5-cofactor
title: "Cofactor Expansion"
order: 2
---

# Cofactor Expansion

While 2×2 determinants have a simple formula and 3×3 determinants can use Sarrus' Rule, larger matrices require a systematic method. Cofactor expansion (also called Laplace expansion) provides a recursive technique for computing determinants of any size.

## Minors

Before we can understand cofactors, we need to understand minors.

**Definition**: The **minor** $M_{ij}$ of element $a_{ij}$ in matrix $A$ is the determinant of the submatrix formed by deleting row $i$ and column $j$ from $A$.

### Example: Computing Minors

For the matrix $A = \begin{bmatrix} 2 & 3 & 1 \\ 5 & 4 & 6 \\ 7 & 8 & 9 \end{bmatrix}$, find $M_{12}$ and $M_{23}$.

**Finding $M_{12}$**: Delete row 1 and column 2:

$$A \to \begin{bmatrix} 2 & \boxed{3} & 1 \\ 5 & \boxed{4} & 6 \\ 7 & \boxed{8} & 9 \end{bmatrix} \to \begin{bmatrix} 5 & 6 \\ 7 & 9 \end{bmatrix}$$

$$M_{12} = \det\begin{bmatrix} 5 & 6 \\ 7 & 9 \end{bmatrix} = (5)(9) - (6)(7) = 45 - 42 = 3$$

**Finding $M_{23}$**: Delete row 2 and column 3:

$$A \to \begin{bmatrix} 2 & 3 & \boxed{1} \\ 5 & 4 & \boxed{6} \\ 7 & 8 & \boxed{9} \end{bmatrix} \to \begin{bmatrix} 2 & 3 \\ 7 & 8 \end{bmatrix}$$

$$M_{23} = \det\begin{bmatrix} 2 & 3 \\ 7 & 8 \end{bmatrix} = (2)(8) - (3)(7) = 16 - 21 = -5$$

## Cofactors

The cofactor incorporates a sign pattern into the minor.

**Definition**: The **cofactor** $C_{ij}$ of element $a_{ij}$ is:

$$C_{ij} = (-1)^{i+j} M_{ij}$$

The factor $(-1)^{i+j}$ creates a checkerboard pattern of signs:

$$\begin{bmatrix} + & - & + & - & \cdots \\ - & + & - & + & \cdots \\ + & - & + & - & \cdots \\ - & + & - & + & \cdots \\ \vdots & \vdots & \vdots & \vdots & \ddots \end{bmatrix}$$

### Example: Computing Cofactors

Using the same matrix $A = \begin{bmatrix} 2 & 3 & 1 \\ 5 & 4 & 6 \\ 7 & 8 & 9 \end{bmatrix}$, find $C_{12}$ and $C_{23}$.

**Finding $C_{12}$**:
$$C_{12} = (-1)^{1+2} M_{12} = (-1)^3 \cdot 3 = -3$$

**Finding $C_{23}$**:
$$C_{23} = (-1)^{2+3} M_{23} = (-1)^5 \cdot (-5) = (-1)(-5) = 5$$

## Cofactor Expansion Along a Row

The determinant of any matrix can be computed by expanding along any row.

**Expansion along row $i$**:
$$\det(A) = a_{i1}C_{i1} + a_{i2}C_{i2} + a_{i3}C_{i3} + \cdots + a_{in}C_{in}$$

$$= \sum_{j=1}^{n} a_{ij}C_{ij}$$

### Example: Expansion Along Row 1

Compute $\det(A)$ for $A = \begin{bmatrix} 2 & 3 & 1 \\ 5 & 4 & 6 \\ 7 & 8 & 9 \end{bmatrix}$ by expanding along the first row.

$$\det(A) = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}$$

**Compute $C_{11}$**:
$$M_{11} = \det\begin{bmatrix} 4 & 6 \\ 8 & 9 \end{bmatrix} = 36 - 48 = -12$$
$$C_{11} = (-1)^{1+1}(-12) = -12$$

**Compute $C_{12}$**:
$$M_{12} = \det\begin{bmatrix} 5 & 6 \\ 7 & 9 \end{bmatrix} = 45 - 42 = 3$$
$$C_{12} = (-1)^{1+2}(3) = -3$$

**Compute $C_{13}$**:
$$M_{13} = \det\begin{bmatrix} 5 & 4 \\ 7 & 8 \end{bmatrix} = 40 - 28 = 12$$
$$C_{13} = (-1)^{1+3}(12) = 12$$

**Final calculation**:
$$\det(A) = 2(-12) + 3(-3) + 1(12) = -24 - 9 + 12 = -21$$

## Cofactor Expansion Along a Column

We can also expand along any column.

**Expansion along column $j$**:
$$\det(A) = a_{1j}C_{1j} + a_{2j}C_{2j} + a_{3j}C_{3j} + \cdots + a_{nj}C_{nj}$$

$$= \sum_{i=1}^{n} a_{ij}C_{ij}$$

### Example: Expansion Along Column 2

Using the same matrix $A = \begin{bmatrix} 2 & 3 & 1 \\ 5 & 4 & 6 \\ 7 & 8 & 9 \end{bmatrix}$, expand along column 2.

$$\det(A) = a_{12}C_{12} + a_{22}C_{22} + a_{32}C_{32}$$

**Compute $C_{12}$**: (Already computed) $C_{12} = -3$

**Compute $C_{22}$**:
$$M_{22} = \det\begin{bmatrix} 2 & 1 \\ 7 & 9 \end{bmatrix} = 18 - 7 = 11$$
$$C_{22} = (-1)^{2+2}(11) = 11$$

**Compute $C_{32}$**:
$$M_{32} = \det\begin{bmatrix} 2 & 1 \\ 5 & 6 \end{bmatrix} = 12 - 5 = 7$$
$$C_{32} = (-1)^{3+2}(7) = -7$$

**Final calculation**:
$$\det(A) = 3(-3) + 4(11) + 8(-7) = -9 + 44 - 56 = -21$$

The result is the same, confirming that we can expand along any row or column.

## Strategic Choice of Row or Column

Since we can expand along any row or column, we should choose strategically to minimize computation.

**Strategy**: Expand along the row or column with the most zeros.

### Example: Matrix with Zeros

Compute $\det(B)$ for $B = \begin{bmatrix} 3 & 0 & 2 & 0 \\ 1 & 5 & 0 & 0 \\ 2 & 0 & 6 & 1 \\ 4 & 0 & 3 & 2 \end{bmatrix}$

Notice that column 2 has three zeros. Expanding along column 2:

$$\det(B) = a_{12}C_{12} + a_{22}C_{22} + a_{32}C_{32} + a_{42}C_{42}$$

Since $a_{12} = a_{32} = a_{42} = 0$, only one term survives:

$$\det(B) = a_{22}C_{22} = 5 \cdot C_{22}$$

$$C_{22} = (-1)^{2+2}M_{22} = M_{22} = \det\begin{bmatrix} 3 & 2 & 0 \\ 2 & 6 & 1 \\ 4 & 3 & 2 \end{bmatrix}$$

Now we can expand this 3×3 determinant along row 1 (which has one zero):

$$M_{22} = 3\det\begin{bmatrix} 6 & 1 \\ 3 & 2 \end{bmatrix} - 2\det\begin{bmatrix} 2 & 1 \\ 4 & 2 \end{bmatrix} + 0$$

$$= 3(12 - 3) - 2(4 - 4) = 3(9) - 2(0) = 27$$

Therefore:
$$\det(B) = 5 \cdot 27 = 135$$

By choosing wisely, we avoided computing three 3×3 determinants!

## Recursive Nature

Cofactor expansion is recursive: computing an $n \times n$ determinant requires computing $n$ determinants of size $(n-1) \times (n-1)$, which in turn require smaller determinants, until we reach 2×2 determinants.

For a 4×4 matrix with no zeros:
- 4 cofactors, each requiring a 3×3 determinant
- Each 3×3 requires 3 cofactors with 2×2 determinants
- Total: $4 \times 3 \times 2 = 24$ multiplications (plus signs and additions)

This grows factorially, making cofactor expansion impractical for large matrices without zeros. That's why row reduction methods are preferred for computation.

## Cofactor Matrix

The **cofactor matrix** $C$ of matrix $A$ has entries $C_{ij}$ (all cofactors):

$$C = \begin{bmatrix} C_{11} & C_{12} & \cdots & C_{1n} \\ C_{21} & C_{22} & \cdots & C_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ C_{n1} & C_{n2} & \cdots & C_{nn} \end{bmatrix}$$

The cofactor matrix plays a crucial role in computing matrix inverses, which we'll explore in a later section.

## Key Pattern Verification

Let's verify that cofactor expansion along row 1 for a 3×3 matrix matches our earlier formula:

$$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$$

$$\det(A) = a_{11}(-1)^{1+1}\det\begin{bmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{bmatrix} + a_{12}(-1)^{1+2}\det\begin{bmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{bmatrix} + a_{13}(-1)^{1+3}\det\begin{bmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{bmatrix}$$

$$= a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})$$

This is exactly the formula we saw earlier!

## Summary

- A **minor** $M_{ij}$ is the determinant of the submatrix obtained by deleting row $i$ and column $j$
- A **cofactor** $C_{ij} = (-1)^{i+j}M_{ij}$ incorporates a checkerboard sign pattern
- The determinant can be computed by expanding along any row or column:
  - Row expansion: $\det(A) = \sum_{j=1}^{n} a_{ij}C_{ij}$
  - Column expansion: $\det(A) = \sum_{i=1}^{n} a_{ij}C_{ij}$
- Choose the row or column with the most zeros to minimize computation
- Cofactor expansion is recursive and becomes impractical for large matrices
- The cofactor matrix is used in computing inverses via the adjugate method
