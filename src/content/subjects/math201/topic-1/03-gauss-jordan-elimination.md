# Gauss-Jordan Elimination

## Introduction

**Gauss-Jordan elimination** is an extension of Gaussian elimination that produces a matrix in **reduced row echelon form** (RREF). This form makes the solution immediately visible without requiring back substitution. The method is named after Carl Friedrich Gauss and Wilhelm Jordan, and while computationally more expensive than standard Gaussian elimination, it provides elegant theoretical insights and is extremely useful for certain applications.

## Reduced Row Echelon Form (RREF)

A matrix is in **reduced row echelon form** if it satisfies:

1. It is in row echelon form (REF)
2. Each pivot (leading entry) is equal to 1
3. Each pivot is the **only** nonzero entry in its column

**Definition 3.1 (RREF):** A matrix is in reduced row echelon form if:
- All properties of REF hold
- Every pivot equals 1
- Each pivot column has zeros everywhere except the pivot position

### Examples

**Example of RREF:**
$$\left[\begin{array}{ccccc|c}
\boxed{1} & 0 & 2 & 0 & -1 & 3 \\
0 & \boxed{1} & -1 & 0 & 2 & 4 \\
0 & 0 & 0 & \boxed{1} & 3 & -2 \\
0 & 0 & 0 & 0 & 0 & 0
\end{array}\right]$$

Notice: Each pivot is 1, and each pivot column (columns 1, 2, and 4) has zeros in all other positions.

**Example NOT in RREF (but in REF):**
$$\left[\begin{array}{ccc|c}
\boxed{2} & 3 & 1 & 5 \\
0 & \boxed{1} & -2 & 3 \\
0 & 0 & \boxed{1} & 4
\end{array}\right]$$

This is REF but not RREF because:
- First pivot is 2, not 1
- Second pivot column has 3 in the first row
- Third pivot column has 1 and -2 above the pivot

## The Gauss-Jordan Algorithm

Gauss-Jordan elimination extends Gaussian elimination by adding two additional steps:

**Phase 1: Forward Elimination** (same as Gaussian elimination)
- Transform the matrix to row echelon form

**Phase 2: Pivot Normalization**
- Scale each pivot row so the pivot becomes 1

**Phase 3: Backward Elimination**
- Create zeros above each pivot, working from bottom to top

### Detailed Steps

**Step 1-5:** Perform Gaussian elimination to obtain REF

**Step 6:** Starting with the rightmost pivot, scale its row so the pivot becomes 1

**Step 7:** Use row operations to create zeros above this pivot

**Step 8:** Move to the next pivot to the left and repeat steps 6-7

**Step 9:** Continue until all pivots are 1 and all entries above and below pivots are 0

### Example 1: Complete Gauss-Jordan Elimination

Solve using Gauss-Jordan elimination:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 2 \\
2x_1 + 3x_2 + 3x_3 = 5 \\
x_1 - x_2 + 2x_3 = 1
\end{cases}$$

**Solution:**

**Initial augmented matrix:**
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
2 & 3 & 3 & 5 \\
1 & -1 & 2 & 1
\end{array}\right]$$

**Forward Elimination:**

$R_2 \rightarrow R_2 - 2R_1$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 1 & 1 \\
1 & -1 & 2 & 1
\end{array}\right]$$

$R_3 \rightarrow R_3 - R_1$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 1 & 1 \\
0 & -3 & 1 & -1
\end{array}\right]$$

$R_3 \rightarrow R_3 - 3R_2$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 1 & 1 \\
0 & 0 & -2 & -4
\end{array}\right]$$

**Now in REF. Continue to RREF:**

**Normalize pivot in row 3:**

$R_3 \rightarrow -\frac{1}{2}R_3$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 1 & 1 \\
0 & 0 & 1 & 2
\end{array}\right]$$

**Eliminate above third pivot:**

$R_2 \rightarrow R_2 - R_3$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 0 & -1 \\
0 & 0 & 1 & 2
\end{array}\right]$$

$R_1 \rightarrow R_1 - R_3$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 0 & 0 \\
0 & -1 & 0 & -1 \\
0 & 0 & 1 & 2
\end{array}\right]$$

**Normalize pivot in row 2:**

$R_2 \rightarrow -R_2$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 0 & 0 \\
0 & 1 & 0 & 1 \\
0 & 0 & 1 & 2
\end{array}\right]$$

**Eliminate above second pivot:**

$R_1 \rightarrow R_1 - 2R_2$:
$$\left[\begin{array}{ccc|c}
1 & 0 & 0 & -2 \\
0 & 1 & 0 & 1 \\
0 & 0 & 1 & 2
\end{array}\right]$$

**This is RREF!**

The solution is immediately visible: $x_1 = -2$, $x_2 = 1$, $x_3 = 2$

### Example 2: System with Free Variables

Solve:
$$\begin{cases}
x_1 + 2x_2 - x_3 + x_4 = 3 \\
2x_1 + 4x_2 + x_3 - x_4 = 2 \\
x_1 + 2x_2 - 2x_3 + 2x_4 = 5
\end{cases}$$

**Solution:**

**Initial matrix:**
$$\left[\begin{array}{cccc|c}
1 & 2 & -1 & 1 & 3 \\
2 & 4 & 1 & -1 & 2 \\
1 & 2 & -2 & 2 & 5
\end{array}\right]$$

**Forward elimination:**

$R_2 \rightarrow R_2 - 2R_1$:
$$\left[\begin{array}{cccc|c}
1 & 2 & -1 & 1 & 3 \\
0 & 0 & 3 & -3 & -4 \\
1 & 2 & -2 & 2 & 5
\end{array}\right]$$

$R_3 \rightarrow R_3 - R_1$:
$$\left[\begin{array}{cccc|c}
1 & 2 & -1 & 1 & 3 \\
0 & 0 & 3 & -3 & -4 \\
0 & 0 & -1 & 1 & 2
\end{array}\right]$$

$R_3 \rightarrow R_3 + \frac{1}{3}R_2$:
$$\left[\begin{array}{cccc|c}
1 & 2 & -1 & 1 & 3 \\
0 & 0 & 3 & -3 & -4 \\
0 & 0 & 0 & 0 & \frac{2}{3}
\end{array}\right]$$

**Analysis:** The last row represents $0 = \frac{2}{3}$, which is impossible!

**Conclusion:** The system is **inconsistent** (no solution).

The RREF would be:
$$\left[\begin{array}{cccc|c}
1 & 2 & 0 & 0 & 0 \\
0 & 0 & 1 & -1 & 0 \\
0 & 0 & 0 & 0 & 1
\end{array}\right]$$

The rightmost column is a pivot column, indicating inconsistency.

### Example 3: Infinite Solutions

Solve:
$$\begin{cases}
x_1 + 2x_2 + 3x_3 = 4 \\
2x_1 + 4x_2 + 5x_3 = 7 \\
x_1 + 2x_2 + 2x_3 = 3
\end{cases}$$

**Solution (showing final RREF):**

After Gauss-Jordan elimination:
$$\left[\begin{array}{ccc|c}
1 & 2 & 0 & 1 \\
0 & 0 & 1 & 1 \\
0 & 0 & 0 & 0
\end{array}\right]$$

**Analysis:**
- Pivot columns: 1 and 3
- Non-pivot column: 2 (corresponds to $x_2$)
- $x_2$ is a **free variable**

**General solution:**

From RREF:
$$\begin{cases}
x_1 + 2x_2 = 1 \\
x_3 = 1
\end{cases}$$

Let $x_2 = t$ (parameter):
- $x_3 = 1$
- $x_1 = 1 - 2t$
- $x_2 = t$

**Solution set:** $\{(1-2t, t, 1) : t \in \mathbb{R}\}$

Or in vector form:
$$\begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} + t\begin{pmatrix} -2 \\ 1 \\ 0 \end{pmatrix}$$

This represents a line in 3D space!

## Basic and Free Variables

**Definition 3.2:** In the RREF of a linear system:
- **Basic variables** correspond to pivot columns
- **Free variables** correspond to non-pivot columns

The number of free variables equals the number of parameters in the general solution.

## Uniqueness of RREF

**Theorem 3.1 (Uniqueness of RREF):** Each matrix has a unique reduced row echelon form.

This is not true for REF—many different row echelon forms can result from the same matrix, depending on the order of operations. However, RREF is unique, making it ideal for determining if two systems are equivalent.

## Advantages and Disadvantages

**Advantages of Gauss-Jordan:**
- Solution is immediately visible (no back substitution)
- RREF is unique (useful for comparison)
- Clear identification of free variables
- Better for theoretical analysis

**Disadvantages:**
- Requires approximately 50% more operations than Gaussian elimination
- Less efficient for large systems
- More susceptible to round-off errors in floating-point arithmetic

## Practice Problems

**Problem 1:** Reduce to RREF:
$$\left[\begin{array}{ccc|c}
2 & 4 & 6 & 8 \\
1 & 3 & 2 & 5 \\
3 & 7 & 8 & 13
\end{array}\right]$$

**Problem 2:** Solve using Gauss-Jordan elimination:
$$\begin{cases}
x + y + z = 6 \\
2x + 3y + z = 13 \\
x + 2y - z = 5
\end{cases}$$

**Problem 3:** Find the general solution:
$$\begin{cases}
x_1 + 2x_2 - x_3 + x_4 = 2 \\
2x_1 + 4x_2 - x_3 - x_4 = 1 \\
x_1 + 2x_2 + x_3 + 5x_4 = 6
\end{cases}$$

**Problem 4:** Determine if the system is consistent. If so, find all solutions:
$$\begin{cases}
x_1 - 3x_2 + 4x_3 = 5 \\
2x_1 - 6x_2 + 8x_3 = 10 \\
-x_1 + 3x_2 - 4x_3 = -5
\end{cases}$$

**Problem 5:** The RREF of a matrix is:
$$\left[\begin{array}{cccc|c}
1 & 0 & -2 & 0 & 3 \\
0 & 1 & 1 & 0 & -1 \\
0 & 0 & 0 & 1 & 4
\end{array}\right]$$

Write the general solution in parametric vector form.

## Summary

Gauss-Jordan elimination extends Gaussian elimination to produce reduced row echelon form, where solutions are immediately visible without back substitution. The RREF is unique and clearly distinguishes basic variables from free variables, making it invaluable for theoretical analysis. While computationally more expensive than standard Gaussian elimination, it provides elegant insights into the structure of solution sets and is essential for understanding the fundamental concepts of linear algebra.
