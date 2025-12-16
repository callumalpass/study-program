# Gaussian Elimination

## Introduction

**Gaussian elimination** is a systematic algorithm for solving systems of linear equations. Named after Carl Friedrich Gauss, this method transforms a system into an equivalent but simpler form that can be solved by back substitution. It is one of the most important algorithms in linear algebra and forms the basis for many computational methods.

## Elementary Row Operations

Gaussian elimination relies on three types of **elementary row operations** that transform a system into an equivalent system (one with the same solution set):

**Operation 1 (Replacement):** Replace one row by the sum of itself and a multiple of another row.
- Notation: $R_i \rightarrow R_i + cR_j$

**Operation 2 (Interchange):** Interchange two rows.
- Notation: $R_i \leftrightarrow R_j$

**Operation 3 (Scaling):** Multiply all entries in a row by a nonzero constant.
- Notation: $R_i \rightarrow cR_i$ (where $c \neq 0$)

**Theorem 2.1:** Elementary row operations produce equivalent systems.

**Proof sketch:** Each operation is reversible, so any solution to the original system remains a solution to the transformed system, and vice versa.

## The Augmented Matrix

To streamline the elimination process, we represent the system using an **augmented matrix**, which combines the coefficients and constants.

For the system:
$$\begin{cases}
2x_1 + 3x_2 - x_3 = 5 \\
x_1 - x_2 + 2x_3 = -1 \\
3x_1 + x_2 + x_3 = 4
\end{cases}$$

The augmented matrix is:
$$\left[\begin{array}{ccc|c}
2 & 3 & -1 & 5 \\
1 & -1 & 2 & -1 \\
3 & 1 & 1 & 4
\end{array}\right]$$

The vertical bar separates the coefficient matrix from the constant vector.

## Row Echelon Form (REF)

A matrix is in **row echelon form** if it satisfies:

1. All nonzero rows are above any rows of all zeros
2. The **leading entry** (first nonzero entry, called a **pivot**) of each nonzero row is to the right of the leading entry of the row above it
3. All entries in a column below a pivot are zeros

**Example of REF:**
$$\left[\begin{array}{cccc|c}
\boxed{2} & 3 & -1 & 4 & 7 \\
0 & \boxed{1} & 2 & -3 & 5 \\
0 & 0 & \boxed{-2} & 1 & 3 \\
0 & 0 & 0 & 0 & 0
\end{array}\right]$$

The boxed entries are pivots. Notice each pivot is to the right of the one above it, and all entries below each pivot are zero.

## The Gaussian Elimination Algorithm

**Forward Elimination Phase:**

**Step 1:** Identify the leftmost nonzero column (the **pivot column**)

**Step 2:** Select a nonzero entry in the pivot column as the **pivot**. If necessary, interchange rows to move this entry to the top position.

**Step 3:** Use row replacement operations to create zeros in all positions below the pivot.

**Step 4:** Cover (ignore) the row containing the pivot and repeat steps 1-3 for the remaining submatrix.

**Step 5:** Continue until the matrix is in row echelon form.

### Example 1: Complete Gaussian Elimination

Solve the system:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 2 \\
2x_1 + 3x_2 + 3x_3 = 5 \\
x_1 - x_2 + 2x_3 = 1
\end{cases}$$

**Solution:**

**Step 1:** Write the augmented matrix
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
2 & 3 & 3 & 5 \\
1 & -1 & 2 & 1
\end{array}\right]$$

**Step 2:** First pivot column is column 1, pivot is $1$ in row 1

**Step 3:** Eliminate below the first pivot

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

**Step 4:** Next pivot column is column 2, pivot is $-1$ in row 2

**Step 5:** Eliminate below the second pivot

$R_3 \rightarrow R_3 - 3R_2$:
$$\left[\begin{array}{ccc|c}
1 & 2 & 1 & 2 \\
0 & -1 & 1 & 1 \\
0 & 0 & -2 & -4
\end{array}\right]$$

This matrix is now in **row echelon form**.

## Back Substitution

Once in row echelon form, we solve the system using **back substitution**, starting from the bottom row and working upward.

**Continuing Example 1:**

The REF corresponds to the system:
$$\begin{cases}
x_1 + 2x_2 + x_3 = 2 \\
-x_2 + x_3 = 1 \\
-2x_3 = -4
\end{cases}$$

**From the third equation:**
$$-2x_3 = -4 \Rightarrow x_3 = 2$$

**Substitute into the second equation:**
$$-x_2 + 2 = 1 \Rightarrow x_2 = 1$$

**Substitute into the first equation:**
$$x_1 + 2(1) + 2 = 2 \Rightarrow x_1 = -2$$

**Solution:** $(x_1, x_2, x_3) = (-2, 1, 2)$

**Verification:**
- $-2 + 2(1) + 2 = 2$ ✓
- $2(-2) + 3(1) + 3(2) = -4 + 3 + 6 = 5$ ✓
- $-2 - 1 + 2(2) = -3 + 4 = 1$ ✓

### Example 2: System with Row Interchange

Solve:
$$\begin{cases}
0x_1 + 2x_2 - x_3 = 3 \\
x_1 + x_2 + x_3 = 2 \\
2x_1 + 3x_2 + x_3 = 5
\end{cases}$$

**Solution:**

Augmented matrix:
$$\left[\begin{array}{ccc|c}
0 & 2 & -1 & 3 \\
1 & 1 & 1 & 2 \\
2 & 3 & 1 & 5
\end{array}\right]$$

**Step 1:** First column has zeros in position (1,1), so interchange rows

$R_1 \leftrightarrow R_2$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 2 \\
0 & 2 & -1 & 3 \\
2 & 3 & 1 & 5
\end{array}\right]$$

**Step 2:** Eliminate below first pivot

$R_3 \rightarrow R_3 - 2R_1$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 2 \\
0 & 2 & -1 & 3 \\
0 & 1 & -1 & 1
\end{array}\right]$$

**Step 3:** Eliminate below second pivot

$R_3 \rightarrow R_3 - \frac{1}{2}R_2$:
$$\left[\begin{array}{ccc|c}
1 & 1 & 1 & 2 \\
0 & 2 & -1 & 3 \\
0 & 0 & -\frac{1}{2} & -\frac{1}{2}
\end{array}\right]$$

**Back substitution:**

From row 3: $-\frac{1}{2}x_3 = -\frac{1}{2} \Rightarrow x_3 = 1$

From row 2: $2x_2 - 1 = 3 \Rightarrow x_2 = 2$

From row 1: $x_1 + 2 + 1 = 2 \Rightarrow x_1 = -1$

**Solution:** $(-1, 2, 1)$

## Pivot Positions and Pivot Columns

A **pivot position** in a matrix is a location that corresponds to a leading entry in the row echelon form. A **pivot column** is a column that contains a pivot position.

**Important:** The pivot positions are determined by the structure of the matrix, regardless of the specific values (as long as they remain nonzero).

## Computational Considerations

**Theorem 2.2 (Existence and Uniqueness):** A linear system is consistent if and only if the rightmost column of the augmented matrix is not a pivot column.

If the system is consistent, then:
- The solution is **unique** if there are no free variables (every column of the coefficient matrix is a pivot column)
- There are **infinitely many solutions** if there is at least one free variable (at least one column of the coefficient matrix is not a pivot column)

## Practice Problems

**Problem 1:** Transform the following matrix to row echelon form:
$$\left[\begin{array}{ccc|c}
2 & 4 & -2 & 6 \\
1 & 3 & 1 & 5 \\
3 & 5 & -1 & 8
\end{array}\right]$$

**Problem 2:** Solve using Gaussian elimination:
$$\begin{cases}
x + y + z = 6 \\
2x + y - z = 1 \\
x - y + 2z = 7
\end{cases}$$

**Problem 3:** Solve the system:
$$\begin{cases}
2x_1 + 4x_2 - 6x_3 = 8 \\
x_1 + 2x_2 - 3x_3 = 4 \\
3x_1 + 6x_2 - 9x_3 = 10
\end{cases}$$

What happens during elimination?

**Problem 4:** Determine the pivot positions in:
$$\left[\begin{array}{cccc}
1 & 2 & 0 & 3 \\
0 & 0 & 1 & 4 \\
0 & 0 & 0 & 0
\end{array}\right]$$

**Problem 5:** Solve the system and verify your answer:
$$\begin{cases}
3x_1 - 6x_2 + 9x_3 = 12 \\
x_1 - 2x_2 + 3x_3 = 4 \\
2x_1 - 4x_2 + 6x_3 = 7
\end{cases}$$

## Summary

Gaussian elimination is a powerful, systematic method for solving linear systems. By applying elementary row operations to transform the augmented matrix into row echelon form, we reduce the problem to a simpler triangular system that can be solved by back substitution. The pivot positions reveal crucial information about the solution structure, including whether the system is consistent and whether the solution is unique.
