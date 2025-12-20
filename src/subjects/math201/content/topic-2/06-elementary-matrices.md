---
id: math201-t2-elementary
title: "Elementary Matrices"
order: 6
---

# Elementary Matrices

Elementary matrices are simple but powerful tools that encode row operations as matrix multiplication. They provide the bridge between the algorithmic process of Gaussian elimination and the theoretical structure of matrix algebra. Understanding elementary matrices reveals why row operations preserve solutions and how they relate to matrix inverses.

## What is an Elementary Matrix?

An **elementary matrix** is a matrix obtained by performing a single elementary row operation on an identity matrix.

There are three types of elementary row operations, and therefore three types of elementary matrices:

1. **Type I:** Swap two rows
2. **Type II:** Multiply a row by a nonzero scalar
3. **Type III:** Add a multiple of one row to another row

**Key insight:** Performing a row operation on matrix $A$ is equivalent to multiplying $A$ on the left by the corresponding elementary matrix.

## Type I: Row Swap

**Operation:** Interchange rows $i$ and $j$.

**Elementary matrix:** Swap rows $i$ and $j$ of the identity matrix.

**Example:** The matrix that swaps rows 1 and 2 in a $3 \times 3$ system:

$$E_1 = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

**Verification:** Apply to $A = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix}$:

$$E_1 A = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} = \begin{bmatrix} d & e & f \\ a & b & c \\ g & h & i \end{bmatrix}$$

Rows 1 and 2 have been swapped! ✓

## Type II: Row Scaling

**Operation:** Multiply row $i$ by nonzero scalar $c$.

**Elementary matrix:** Multiply row $i$ of the identity matrix by $c$.

**Example:** The matrix that multiplies row 2 by 3 in a $3 \times 3$ system:

$$E_2 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

**Verification:** Apply to $A$:

$$E_2 A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} = \begin{bmatrix} a & b & c \\ 3d & 3e & 3f \\ g & h & i \end{bmatrix}$$

Row 2 has been tripled! ✓

## Type III: Row Replacement

**Operation:** Add $c$ times row $j$ to row $i$ (where $i \neq j$).

**Elementary matrix:** Add $c$ times row $j$ to row $i$ of the identity matrix.

**Example:** The matrix that adds 2 times row 1 to row 3:

$$E_3 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 2 & 0 & 1 \end{bmatrix}$$

**Verification:**

$$E_3 A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 2 & 0 & 1 \end{bmatrix}\begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i \end{bmatrix} = \begin{bmatrix} a & b & c \\ d & e & f \\ 2a+g & 2b+h & 2c+i \end{bmatrix}$$

Row 3 has been replaced by (row 3) + 2(row 1)! ✓

## General Pattern

If we perform row operation $R$ on identity matrix $I$ to get elementary matrix $E$, then:

$$EA = (\text{result of performing } R \text{ on } A)$$

This is why we say "row operations correspond to left-multiplication by elementary matrices."

## Inverses of Elementary Matrices

**All elementary matrices are invertible**, and their inverses are also elementary matrices of the same type.

### Type I Inverse: Swap
Swapping rows $i$ and $j$ is its own inverse.

$$E^{-1} = E$$

**Example:** If $E = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$, then $E^{-1} = E$ because swapping twice returns to original.

### Type II Inverse: Scale
If row $i$ was multiplied by $c \neq 0$, multiply row $i$ by $1/c$.

**Example:** If $E = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{bmatrix}$, then $E^{-1} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1/3 & 0 \\ 0 & 0 & 1 \end{bmatrix}$.

**Verification:**
$$EE^{-1} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1/3 & 0 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = I$$ ✓

### Type III Inverse: Row Replacement
If $c$ times row $j$ was added to row $i$, add $-c$ times row $j$ to row $i$.

**Example:** If $E = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 2 & 0 & 1 \end{bmatrix}$, then $E^{-1} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ -2 & 0 & 1 \end{bmatrix}$.

**Verification:**
$$EE^{-1} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 2 & 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ -2 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = I$$ ✓

## Row Reduction as Matrix Multiplication

When we row-reduce $A$ to row echelon form (or reduced row echelon form), we perform a sequence of row operations. Each operation corresponds to left-multiplication by an elementary matrix.

If row operations $E_k, E_{k-1}, \ldots, E_2, E_1$ (applied in that order) reduce $A$ to $U$ (upper triangular or row echelon form), then:

$$E_k E_{k-1} \cdots E_2 E_1 A = U$$

**Example:** Reduce $A = \begin{bmatrix} 2 & 4 \\ 1 & 1 \end{bmatrix}$ to $I$ using elementary matrices.

**Step 1:** $\frac{1}{2}R_1 \to R_1$ (divide row 1 by 2)

$$E_1 = \begin{bmatrix} 1/2 & 0 \\ 0 & 1 \end{bmatrix}, \quad E_1 A = \begin{bmatrix} 1 & 2 \\ 1 & 1 \end{bmatrix}$$

**Step 2:** $R_2 - R_1 \to R_2$ (subtract row 1 from row 2)

$$E_2 = \begin{bmatrix} 1 & 0 \\ -1 & 1 \end{bmatrix}, \quad E_2 E_1 A = \begin{bmatrix} 1 & 2 \\ 0 & -1 \end{bmatrix}$$

**Step 3:** $-R_2 \to R_2$ (multiply row 2 by -1)

$$E_3 = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}, \quad E_3 E_2 E_1 A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$$

**Step 4:** $R_1 - 2R_2 \to R_1$ (subtract 2 times row 2 from row 1)

$$E_4 = \begin{bmatrix} 1 & -2 \\ 0 & 1 \end{bmatrix}, \quad E_4 E_3 E_2 E_1 A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$$

Therefore: $E_4 E_3 E_2 E_1 A = I$, which means $A^{-1} = E_4 E_3 E_2 E_1$.

## Finding Inverses Using Elementary Matrices

The process above shows that if $A$ can be row-reduced to $I$ using elementary matrices $E_1, E_2, \ldots, E_k$, then:

$$E_k \cdots E_2 E_1 A = I$$

This means:
$$A^{-1} = E_k \cdots E_2 E_1$$

In other words, **the product of elementary matrices that reduces $A$ to $I$ equals $A^{-1}$**.

**Computing strategy:** Apply the same row operations to $I$ as you apply to $A$:

$$[A \mid I] \xrightarrow{\text{row ops}} [I \mid A^{-1}]$$

The right side accumulates the product of elementary matrices.

**Example:** From above, compute $A^{-1}$ where $A = \begin{bmatrix} 2 & 4 \\ 1 & 1 \end{bmatrix}$.

$$A^{-1} = E_4 E_3 E_2 E_1 = \begin{bmatrix} 1 & -2 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ -1 & 1 \end{bmatrix}\begin{bmatrix} 1/2 & 0 \\ 0 & 1 \end{bmatrix}$$

Rather than multiply these out, apply the operations to $I$:

$$E_1 I = \begin{bmatrix} 1/2 & 0 \\ 0 & 1 \end{bmatrix}$$

$$E_2 E_1 I = \begin{bmatrix} 1/2 & 0 \\ -1/2 & 1 \end{bmatrix}$$

$$E_3 E_2 E_1 I = \begin{bmatrix} 1/2 & 0 \\ 1/2 & -1 \end{bmatrix}$$

$$E_4 E_3 E_2 E_1 I = \begin{bmatrix} -1/2 & 2 \\ 1/2 & -1 \end{bmatrix} = A^{-1}$$

**Verification:**
$$AA^{-1} = \begin{bmatrix} 2 & 4 \\ 1 & 1 \end{bmatrix}\begin{bmatrix} -1/2 & 2 \\ 1/2 & -1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$ ✓

## LU Factorization Preview

Elementary matrices of Type III (row replacement) are lower triangular. The inverse process gives:

$$A = E_1^{-1} E_2^{-1} \cdots E_k^{-1} U$$

where $U$ is upper triangular and the product of inverses of lower triangular matrices is lower triangular. This leads to **LU factorization**: $A = LU$.

## Theoretical Implications

**Theorem:** An $n \times n$ matrix $A$ is invertible if and only if it is a product of elementary matrices.

**Proof sketch:**
- If $A$ is invertible, it row-reduces to $I$: $E_k \cdots E_1 A = I$
- So $A = E_1^{-1} \cdots E_k^{-1}$, a product of elementary matrices
- Conversely, products of invertible matrices are invertible

This theorem shows that invertible matrices are precisely those that can be built from simple row operations.

## Applications

**Algorithm verification:** Elementary matrices justify why row operations preserve solutions

**Computing inverses:** The augmented matrix method $[A \mid I] \to [I \mid A^{-1}]$ works because of elementary matrices

**LU decomposition:** Factoring $A = LU$ for efficient system solving

**Theoretical foundations:** Characterizing invertibility and rank

## Summary

- Elementary matrices encode single row operations
- Three types: row swap, row scaling, row replacement
- Multiplying $EA$ performs the corresponding row operation on $A$
- All elementary matrices are invertible
- Inverses reverse the operation: swap twice, scale by reciprocal, add negative multiple
- Row reduction $A \to I$ gives $A^{-1}$ as a product of elementary matrices
- Invertible matrices are exactly products of elementary matrices
- Elementary matrices provide the theoretical foundation for Gaussian elimination
