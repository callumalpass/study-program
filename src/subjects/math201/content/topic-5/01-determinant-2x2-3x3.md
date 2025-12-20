---
id: math201-t5-2x2-3x3
title: "Determinants of 2x2 and 3x3 Matrices"
order: 1
---

# Determinants of 2×2 and 3×3 Matrices

The determinant is a special scalar value computed from a square matrix that encodes important information about the matrix. It tells us whether a matrix is invertible, provides information about linear transformations, and has rich geometric interpretations.

## Definition for 2×2 Matrices

For a 2×2 matrix, the determinant has a simple, memorable formula:

$$A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$$

$$\det(A) = ad - bc$$

The determinant is often written as $\det(A)$ or $|A|$.

### Example: Computing a 2×2 Determinant

Calculate the determinant of $A = \begin{bmatrix} 3 & 5 \\ 2 & 4 \end{bmatrix}$

$$\det(A) = (3)(4) - (5)(2) = 12 - 10 = 2$$

### Example: Zero Determinant

Calculate the determinant of $B = \begin{bmatrix} 2 & 6 \\ 1 & 3 \end{bmatrix}$

$$\det(B) = (2)(3) - (6)(1) = 6 - 6 = 0$$

When the determinant is zero, the matrix is **singular** (not invertible). Notice that the second row is exactly half of the first row—the rows are linearly dependent.

## Geometric Interpretation in 2D

The determinant of a 2×2 matrix has a beautiful geometric meaning: **it represents the signed area of the parallelogram** formed by the column vectors of the matrix.

Consider the matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$. The column vectors are:
- $\mathbf{v}_1 = \begin{bmatrix} a \\ c \end{bmatrix}$
- $\mathbf{v}_2 = \begin{bmatrix} b \\ d \end{bmatrix}$

These vectors define a parallelogram with one vertex at the origin. The area of this parallelogram is exactly $|\det(A)|$.

### Example: Area Calculation

Find the area of the parallelogram formed by vectors $\mathbf{v}_1 = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 2 \\ 4 \end{bmatrix}$

$$A = \begin{bmatrix} 3 & 2 \\ 1 & 4 \end{bmatrix}$$

$$\det(A) = (3)(4) - (2)(1) = 12 - 2 = 10$$

The area of the parallelogram is $|\det(A)| = 10$ square units.

### Sign Interpretation

The **sign** of the determinant indicates orientation:
- **Positive determinant**: The transformation preserves orientation (counterclockwise rotation)
- **Negative determinant**: The transformation reverses orientation (reflection)
- **Zero determinant**: The transformation collapses the area to zero (degenerate)

## Definition for 3×3 Matrices

For a 3×3 matrix, the determinant formula is more complex:

$$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$$

$$\det(A) = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})$$

This formula comes from expanding along the first row (we'll explore this more in cofactor expansion).

### Alternative Pattern (Sarrus' Rule)

For 3×3 matrices only, there's a visual pattern called Sarrus' Rule:

1. Write the first two columns again to the right of the matrix
2. Sum the products of the three main diagonals (top-left to bottom-right)
3. Subtract the products of the three anti-diagonals (bottom-left to top-right)

$$\det(A) = (a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}) - (a_{13}a_{22}a_{31} + a_{11}a_{23}a_{32} + a_{12}a_{21}a_{33})$$

**Warning**: Sarrus' Rule works ONLY for 3×3 matrices. Don't try to extend it to larger matrices.

### Example: Computing a 3×3 Determinant

Calculate $\det(A)$ for $A = \begin{bmatrix} 2 & 3 & 1 \\ 1 & 4 & 2 \\ 3 & 1 & 5 \end{bmatrix}$

Using the row expansion formula:
$$\det(A) = 2(4 \cdot 5 - 2 \cdot 1) - 3(1 \cdot 5 - 2 \cdot 3) + 1(1 \cdot 1 - 4 \cdot 3)$$

$$= 2(20 - 2) - 3(5 - 6) + 1(1 - 12)$$

$$= 2(18) - 3(-1) + 1(-11)$$

$$= 36 + 3 - 11 = 28$$

Using Sarrus' Rule (visualize the diagonal products):
$$\det(A) = (2 \cdot 4 \cdot 5 + 3 \cdot 2 \cdot 3 + 1 \cdot 1 \cdot 1) - (1 \cdot 4 \cdot 3 + 2 \cdot 2 \cdot 1 + 3 \cdot 1 \cdot 5)$$

$$= (40 + 18 + 1) - (12 + 4 + 15)$$

$$= 59 - 31 = 28$$

Both methods give the same result, as expected.

## Geometric Interpretation in 3D

For a 3×3 matrix, the determinant represents the **signed volume of the parallelepiped** (3D parallelogram) formed by the three column vectors.

If $A = [\mathbf{v}_1 \; \mathbf{v}_2 \; \mathbf{v}_3]$, then:
- $|\det(A)|$ = volume of the parallelepiped spanned by $\mathbf{v}_1$, $\mathbf{v}_2$, and $\mathbf{v}_3$
- Sign indicates whether the vectors form a right-handed or left-handed coordinate system

### Example: Volume Calculation

Find the volume of the parallelepiped formed by:
- $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$
- $\mathbf{v}_2 = \begin{bmatrix} 0 \\ 2 \\ 0 \end{bmatrix}$
- $\mathbf{v}_3 = \begin{bmatrix} 0 \\ 0 \\ 3 \end{bmatrix}$

$$A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$$

$$\det(A) = 1(2 \cdot 3 - 0 \cdot 0) - 0 + 0 = 6$$

The volume is 6 cubic units. This makes sense: these vectors form a rectangular box with dimensions 1 × 2 × 3.

## Key Properties from the Definition

From these definitions, we can observe several important properties:

**1. Diagonal Matrices**: If a matrix is diagonal (all off-diagonal entries are zero), the determinant is simply the product of the diagonal entries.

$$\det\begin{bmatrix} a & 0 \\ 0 & d \end{bmatrix} = ad$$

$$\det\begin{bmatrix} a & 0 & 0 \\ 0 & b & 0 \\ 0 & 0 & c \end{bmatrix} = abc$$

**2. Triangular Matrices**: Upper or lower triangular matrices also have determinants equal to the product of diagonal entries.

**3. Identity Matrix**: $\det(I) = 1$ for any size identity matrix.

**4. Zero Determinant**: If any row or column is all zeros, or if rows/columns are linearly dependent, $\det(A) = 0$.

## Example: Determining Invertibility

Determine which of these matrices are invertible:

$$A = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}, \quad B = \begin{bmatrix} 3 & 6 \\ 1 & 2 \end{bmatrix}, \quad C = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{bmatrix}$$

**Matrix A**:
$$\det(A) = (2)(3) - (1)(4) = 6 - 4 = 2 \neq 0$$
A is invertible.

**Matrix B**:
$$\det(B) = (3)(2) - (6)(1) = 6 - 6 = 0$$
B is not invertible (singular). Note that column 2 is exactly twice column 1.

**Matrix C** (upper triangular):
$$\det(C) = (1)(4)(6) = 24 \neq 0$$
C is invertible.

## Summary

- The determinant is a scalar value computed from a square matrix
- For 2×2 matrices: $\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$
- For 3×3 matrices: Use row expansion or Sarrus' Rule
- Geometrically, $|\det(A)|$ represents:
  - Area of a parallelogram (2×2 case)
  - Volume of a parallelepiped (3×3 case)
- The sign indicates orientation or handedness
- $\det(A) = 0$ if and only if the matrix is singular (not invertible)
- Diagonal and triangular matrices have determinants equal to the product of diagonal entries

The determinant is a powerful tool that connects algebra, geometry, and the theory of linear transformations.
