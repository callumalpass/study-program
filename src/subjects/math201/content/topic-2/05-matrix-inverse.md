# Matrix Inverse

The matrix inverse is the multiplicative analog of division for matrices. Just as dividing by a number $a$ means multiplying by $a^{-1}$, solving matrix equations often requires finding an inverse matrix. Not all matrices have inverses—only square matrices with certain properties are invertible. Understanding when and how to compute inverses is fundamental to solving linear systems and analyzing linear transformations.

## Definition

A square matrix $A$ is **invertible** (or **nonsingular**) if there exists a matrix $A^{-1}$ such that:

$$A A^{-1} = A^{-1} A = I$$

The matrix $A^{-1}$ is called the **inverse** of $A$.

If no such matrix exists, $A$ is called **singular** or **noninvertible**.

**Key facts:**
- Only square matrices can have inverses
- If an inverse exists, it is unique
- Not all square matrices are invertible

## The 2×2 Case: An Explicit Formula

For a $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, the inverse (if it exists) is:

$$A^{-1} = \frac{1}{ad - bc}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

The quantity $ad - bc$ is called the **determinant** of $A$, denoted $\det(A)$ or $|A|$.

**Invertibility criterion:** $A$ is invertible if and only if $\det(A) = ad - bc \neq 0$.

**Example 1:** Find the inverse of $A = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix}$.

**Solution:**

Calculate the determinant:
$$\det(A) = (3)(2) - (1)(5) = 6 - 5 = 1$$

Since $\det(A) \neq 0$, the matrix is invertible:
$$A^{-1} = \frac{1}{1}\begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix} = \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix}$$

**Verification:**
$$AA^{-1} = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix}\begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$$ ✓

**Example 2:** Determine if $B = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$ is invertible.

**Solution:**

$$\det(B) = (2)(2) - (4)(1) = 4 - 4 = 0$$

Since $\det(B) = 0$, the matrix $B$ is **not invertible** (singular).

## Properties of Matrix Inverses

### 1. Uniqueness
If $A$ is invertible, its inverse is unique.

### 2. Inverse of Inverse
$$(A^{-1})^{-1} = A$$

### 3. Inverse of Product (Reversal Rule)
$$(AB)^{-1} = B^{-1}A^{-1}$$

The inverse of a product is the product of inverses in **reverse order**.

**Example:** If $A = \begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$:

$$A^{-1} = \begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix}, \quad B^{-1} = \begin{bmatrix} 1 & -2 \\ 0 & 1 \end{bmatrix}$$

$$AB = \begin{bmatrix} 2 & 5 \\ 1 & 3 \end{bmatrix}, \quad (AB)^{-1} = \begin{bmatrix} 3 & -5 \\ -1 & 2 \end{bmatrix}$$

$$B^{-1}A^{-1} = \begin{bmatrix} 1 & -2 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & -1 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} 3 & -5 \\ -1 & 2 \end{bmatrix}$$ ✓

### 4. Inverse of Transpose
$$(A^T)^{-1} = (A^{-1})^T$$

The inverse and transpose operations commute.

### 5. Inverse of Scalar Multiple
$$(cA)^{-1} = \frac{1}{c}A^{-1}$$ for $c \neq 0$

### 6. Power Rule
$$(A^n)^{-1} = (A^{-1})^n$$

We often write this as $A^{-n} = (A^{-1})^n$.

## Computing Inverses: Row Reduction Method

For matrices larger than $2 \times 2$, we use **Gaussian elimination** with row operations.

**Algorithm:** To find $A^{-1}$:
1. Form the augmented matrix $[A \mid I]$
2. Use row operations to transform it to $[I \mid B]$
3. Then $B = A^{-1}$

If you cannot reduce $A$ to $I$, then $A$ is not invertible.

**Example:** Find the inverse of $A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix}$.

**Solution:**

Set up the augmented matrix:
$$\left[\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 5 & 6 & 0 & 0 & 0 & 1 \end{array}\right]$$

**Step 1:** $R_3 - 5R_1 \to R_3$
$$\left[\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 0 & -4 & -15 & -5 & 0 & 1 \end{array}\right]$$

**Step 2:** $R_3 + 4R_2 \to R_3$
$$\left[\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 4 & 0 & 1 & 0 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right]$$

**Step 3:** $R_2 - 4R_3 \to R_2$
$$\left[\begin{array}{ccc|ccc} 1 & 2 & 3 & 1 & 0 & 0 \\ 0 & 1 & 0 & 20 & -15 & -4 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right]$$

**Step 4:** $R_1 - 3R_3 \to R_1$
$$\left[\begin{array}{ccc|ccc} 1 & 2 & 0 & 16 & -12 & -3 \\ 0 & 1 & 0 & 20 & -15 & -4 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right]$$

**Step 5:** $R_1 - 2R_2 \to R_1$
$$\left[\begin{array}{ccc|ccc} 1 & 0 & 0 & -24 & 18 & 5 \\ 0 & 1 & 0 & 20 & -15 & -4 \\ 0 & 0 & 1 & -5 & 4 & 1 \end{array}\right]$$

Therefore:
$$A^{-1} = \begin{bmatrix} -24 & 18 & 5 \\ 20 & -15 & -4 \\ -5 & 4 & 1 \end{bmatrix}$$

**Verification (partial):** Check that the first column of $AA^{-1}$ equals $\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$:

$$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{bmatrix}\begin{bmatrix} -24 \\ 20 \\ -5 \end{bmatrix} = \begin{bmatrix} -24 + 40 - 15 \\ 0 + 20 - 20 \\ -120 + 120 + 0 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$$ ✓

## Solving Linear Systems with Inverses

If $A$ is invertible, the system $A\mathbf{x} = \mathbf{b}$ has a unique solution:

$$\mathbf{x} = A^{-1}\mathbf{b}$$

**Example:** Solve the system:
$$\begin{cases} 3x + y = 7 \\ 5x + 2y = 12 \end{cases}$$

**Solution:**

Write in matrix form: $A\mathbf{x} = \mathbf{b}$ where $A = \begin{bmatrix} 3 & 1 \\ 5 & 2 \end{bmatrix}$, $\mathbf{b} = \begin{bmatrix} 7 \\ 12 \end{bmatrix}$.

We computed earlier that $A^{-1} = \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix}$.

$$\mathbf{x} = A^{-1}\mathbf{b} = \begin{bmatrix} 2 & -1 \\ -5 & 3 \end{bmatrix}\begin{bmatrix} 7 \\ 12 \end{bmatrix} = \begin{bmatrix} 14 - 12 \\ -35 + 36 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$$

So $x = 2, y = 1$.

**Note:** While this method is elegant, for large systems row reduction is more efficient than computing the full inverse.

## When Does an Inverse Exist?

A square matrix $A$ is invertible if and only if:
- $\det(A) \neq 0$ (for any size)
- The rows (or columns) are linearly independent
- $A$ has full rank (rank equals the number of rows)
- The only solution to $A\mathbf{x} = \mathbf{0}$ is $\mathbf{x} = \mathbf{0}$
- $A$ can be row-reduced to the identity matrix

## Special Inverses

**Diagonal matrices:** If $D = \text{diag}(d_1, d_2, \ldots, d_n)$ with all $d_i \neq 0$:
$$D^{-1} = \text{diag}(1/d_1, 1/d_2, \ldots, 1/d_n)$$

**Example:** $\begin{bmatrix} 2 & 0 & 0 \\ 0 & 5 & 0 \\ 0 & 0 & -3 \end{bmatrix}^{-1} = \begin{bmatrix} 1/2 & 0 & 0 \\ 0 & 1/5 & 0 \\ 0 & 0 & -1/3 \end{bmatrix}$

**Orthogonal matrices:** If $Q^T Q = I$, then $Q^{-1} = Q^T$.

## Applications

**Cryptography:** Invertible matrices encode/decode messages (Hill cipher)

**Computer Graphics:** Inverse transformations (undo rotation, scaling)

**Solving Systems:** $\mathbf{x} = A^{-1}\mathbf{b}$ gives solution

**Change of Basis:** Transition matrices and their inverses

**Differential Equations:** Matrix exponentials and solutions

**Control Theory:** State-space models and feedback design

## Summary

- A matrix $A$ is invertible if $AA^{-1} = A^{-1}A = I$
- For $2 \times 2$ matrices: $A^{-1} = \frac{1}{\det(A)}\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$
- Invertibility requires $\det(A) \neq 0$
- **Reversal rules:** $(AB)^{-1} = B^{-1}A^{-1}$ and $(A^T)^{-1} = (A^{-1})^T$
- Compute inverses via row reduction: $[A \mid I] \to [I \mid A^{-1}]$
- Linear systems: $A\mathbf{x} = \mathbf{b}$ has solution $\mathbf{x} = A^{-1}\mathbf{b}$ if $A$ is invertible
- Not all square matrices are invertible; singular matrices have zero determinant
