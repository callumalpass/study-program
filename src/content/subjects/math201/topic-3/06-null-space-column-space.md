# Null Space and Column Space

Every matrix has associated subspaces that reveal deep information about the linear transformation it represents. The null space captures what the matrix "kills" (sends to zero), while the column space describes what the matrix can "reach" (all possible outputs). These fundamental subspaces are central to understanding solutions to linear systems, matrix rank, and the structure of linear transformations.

## The Null Space (Kernel)

### Definition

For an $m \times n$ matrix $A$, the **null space** (or **kernel**) of $A$ is:

$$\text{Nul}(A) = \{\mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0}\}$$

The null space consists of all vectors that $A$ maps to the zero vector—all solutions to the homogeneous equation $A\mathbf{x} = \mathbf{0}$.

**Key fact:** Nul$(A)$ is a subspace of $\mathbb{R}^n$ (the domain).

### Verification that Nul$(A)$ is a Subspace

We check the three subspace conditions:

1. **Zero vector:** $A\mathbf{0} = \mathbf{0}$, so $\mathbf{0} \in \text{Nul}(A)$. ✓

2. **Closed under addition:** If $\mathbf{u}, \mathbf{v} \in \text{Nul}(A)$, then $A\mathbf{u} = \mathbf{0}$ and $A\mathbf{v} = \mathbf{0}$. Therefore:
   $$A(\mathbf{u} + \mathbf{v}) = A\mathbf{u} + A\mathbf{v} = \mathbf{0} + \mathbf{0} = \mathbf{0}$$
   So $\mathbf{u} + \mathbf{v} \in \text{Nul}(A)$. ✓

3. **Closed under scalar multiplication:** If $\mathbf{v} \in \text{Nul}(A)$ and $c$ is a scalar:
   $$A(c\mathbf{v}) = c(A\mathbf{v}) = c\mathbf{0} = \mathbf{0}$$
   So $c\mathbf{v} \in \text{Nul}(A)$. ✓

Therefore, Nul$(A)$ is a subspace of $\mathbb{R}^n$.

### Finding the Null Space

To find Nul$(A)$, solve the homogeneous system $A\mathbf{x} = \mathbf{0}$:

1. Write the augmented matrix $[A \; | \; \mathbf{0}]$
2. Row reduce to echelon form
3. Express the solution in **parametric vector form**
4. The vectors multiplying the parameters form a **spanning set** for Nul$(A)$

### Example 1: Finding Nul$(A)$

Let $A = \begin{bmatrix} 1 & 2 & -1 & 3 \\ 2 & 4 & 1 & 0 \\ -1 & -2 & 3 & -3 \end{bmatrix}$.

**Step 1:** Form the augmented matrix and row reduce:

$$\begin{bmatrix} 1 & 2 & -1 & 3 & | & 0 \\ 2 & 4 & 1 & 0 & | & 0 \\ -1 & -2 & 3 & -3 & | & 0 \end{bmatrix}$$

Row operations ($R_2 - 2R_1 \to R_2$, $R_3 + R_1 \to R_3$):

$$\begin{bmatrix} 1 & 2 & -1 & 3 & | & 0 \\ 0 & 0 & 3 & -6 & | & 0 \\ 0 & 0 & 2 & 0 & | & 0 \end{bmatrix}$$

Continue reducing ($R_3/2 \to R_3$, $R_2 - 3R_3 \to R_2$):

$$\begin{bmatrix} 1 & 2 & -1 & 3 & | & 0 \\ 0 & 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & 1 & | & 0 \end{bmatrix}$$

Back-substitution ($R_1 + R_2 - 3R_3 \to R_1$):

$$\begin{bmatrix} 1 & 2 & 0 & 0 & | & 0 \\ 0 & 0 & 1 & 0 & | & 0 \\ 0 & 0 & 0 & 1 & | & 0 \end{bmatrix}$$

**Step 2:** Identify pivot and free variables. Pivot columns: 1, 3, 4. Free variables: $x_2$.

**Step 3:** Solve for pivot variables in terms of free variables:
- $x_1 + 2x_2 = 0 \Rightarrow x_1 = -2x_2$
- $x_3 = 0$
- $x_4 = 0$

**Step 4:** Write in parametric vector form (let $x_2 = t$):

$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{bmatrix} = \begin{bmatrix} -2t \\ t \\ 0 \\ 0 \end{bmatrix} = t\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}$$

**Conclusion:**

$$\text{Nul}(A) = \text{Span}\left\{\begin{bmatrix} -2 \\ 1 \\ 0 \\ 0 \end{bmatrix}\right\}$$

This is a line through the origin in $\mathbb{R}^4$.

### Example 2: Null Space with Two Free Variables

Let $A = \begin{bmatrix} 1 & 3 & 0 & 2 \\ 0 & 0 & 1 & 4 \\ 0 & 0 & 0 & 0 \end{bmatrix}$ (already in echelon form).

Pivot columns: 1, 3. Free variables: $x_2, x_4$.

Solve for pivot variables:
- $x_1 + 3x_2 + 2x_4 = 0 \Rightarrow x_1 = -3x_2 - 2x_4$
- $x_3 + 4x_4 = 0 \Rightarrow x_3 = -4x_4$

Let $x_2 = s$ and $x_4 = t$:

$$\mathbf{x} = \begin{bmatrix} -3s - 2t \\ s \\ -4t \\ t \end{bmatrix} = s\begin{bmatrix} -3 \\ 1 \\ 0 \\ 0 \end{bmatrix} + t\begin{bmatrix} -2 \\ 0 \\ -4 \\ 1 \end{bmatrix}$$

**Conclusion:**

$$\text{Nul}(A) = \text{Span}\left\{\begin{bmatrix} -3 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} -2 \\ 0 \\ -4 \\ 1 \end{bmatrix}\right\}$$

This is a 2-dimensional subspace (a plane through the origin) in $\mathbb{R}^4$.

## The Column Space

### Definition

For an $m \times n$ matrix $A = [\mathbf{a}_1 \; \mathbf{a}_2 \; \cdots \; \mathbf{a}_n]$ with columns $\mathbf{a}_1, \ldots, \mathbf{a}_n$, the **column space** is:

$$\text{Col}(A) = \text{Span}\{\mathbf{a}_1, \mathbf{a}_2, \ldots, \mathbf{a}_n\}$$

The column space consists of all linear combinations of $A$'s columns—equivalently, all possible outputs $A\mathbf{x}$.

**Key fact:** Col$(A)$ is a subspace of $\mathbb{R}^m$ (the codomain).

### Column Space and Matrix Equations

The column space has a crucial interpretation:

$$\mathbf{b} \in \text{Col}(A) \iff A\mathbf{x} = \mathbf{b} \text{ is consistent}$$

**Why?** Writing the matrix equation $A\mathbf{x} = \mathbf{b}$ as:

$$x_1\mathbf{a}_1 + x_2\mathbf{a}_2 + \cdots + x_n\mathbf{a}_n = \mathbf{b}$$

shows that $\mathbf{b}$ is in Col$(A)$ if and only if $\mathbf{b}$ is a linear combination of the columns.

**Consequence:** The system $A\mathbf{x} = \mathbf{b}$ is consistent for every $\mathbf{b} \in \mathbb{R}^m$ if and only if Col$(A) = \mathbb{R}^m$.

### Finding a Basis for the Column Space

**Important:** The columns of $A$ span Col$(A)$ by definition, but they may not be **linearly independent**. To find a basis, we need a linearly independent spanning set.

**Algorithm:**
1. Row reduce $A$ to echelon form
2. Identify the **pivot columns** in the echelon form
3. The corresponding columns of the **original matrix** $A$ form a basis for Col$(A)$

**Critical:** Use the columns of the original $A$, not the row-reduced form! Row operations change the column space.

### Example 3: Finding Col$(A)$

Let $A = \begin{bmatrix} 1 & 3 & 0 & 2 \\ 2 & 6 & 1 & 7 \\ 1 & 3 & -1 & 1 \end{bmatrix}$.

**Step 1:** Row reduce to echelon form:

$$A \sim \begin{bmatrix} 1 & 3 & 0 & 2 \\ 0 & 0 & 1 & 3 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

**Step 2:** Pivot columns are columns 1 and 3.

**Step 3:** The corresponding columns of the original $A$ are:

$$\mathbf{a}_1 = \begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \quad \mathbf{a}_3 = \begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}$$

**Conclusion:**

$$\text{Col}(A) = \text{Span}\left\{\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ -1 \end{bmatrix}\right\}$$

This is a 2-dimensional subspace (a plane through the origin) in $\mathbb{R}^3$.

**Note:** Columns 2 and 4 are linear combinations of columns 1 and 3:
- $\mathbf{a}_2 = 3\mathbf{a}_1$
- $\mathbf{a}_4 = 2\mathbf{a}_1 + 3\mathbf{a}_3$

### Example 4: When Col$(A) = \mathbb{R}^m$

Let $A = \begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 3 \\ 0 & 0 & 1 \end{bmatrix}$.

This is already in echelon form with pivots in every row. Therefore, Col$(A) = \mathbb{R}^3$.

**General principle:** Col$(A) = \mathbb{R}^m$ if and only if $A$ has a pivot in every row.

## The Row Space

### Definition

The **row space** of $A$ is the span of the rows of $A$. Equivalently, it's the column space of $A^T$ (the transpose):

$$\text{Row}(A) = \text{Col}(A^T)$$

**Key fact:** Row$(A)$ is a subspace of $\mathbb{R}^n$ (where $A$ is $m \times n$).

### Finding a Basis for the Row Space

**Algorithm:**
1. Row reduce $A$ to echelon form
2. The **non-zero rows** of the echelon form are a basis for Row$(A)$

**Key insight:** Unlike the column space, row operations preserve the row space. The echelon form has the same row space as $A$, and its non-zero rows are linearly independent.

### Example 5: Finding Row$(A)$

Let $A = \begin{bmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \\ 1 & 3 & 4 & 6 \end{bmatrix}$.

Row reduce:

$$A \sim \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 1 & 1 & 2 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

The non-zero rows are $(1, 2, 3, 4)$ and $(0, 1, 1, 2)$.

**Conclusion:**

$$\text{Row}(A) = \text{Span}\left\{\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \\ 2 \end{bmatrix}\right\}$$

This is a 2-dimensional subspace of $\mathbb{R}^4$.

## Relationships Between Fundamental Subspaces

For an $m \times n$ matrix $A$:

| Subspace | Subset of | Dimension |
|----------|-----------|-----------|
| Nul$(A)$ | $\mathbb{R}^n$ | nullity$(A)$ |
| Col$(A)$ | $\mathbb{R}^m$ | rank$(A)$ |
| Row$(A)$ | $\mathbb{R}^n$ | rank$(A)$ |

**Rank-Nullity Theorem:**

$$\text{rank}(A) + \text{nullity}(A) = n$$

where:
- **rank**$(A)$ = dimension of Col$(A)$ = number of pivot columns
- **nullity**$(A)$ = dimension of Nul$(A)$ = number of free variables

This fundamental relationship says that the dimensions of the column space and null space always sum to the number of columns.

### Example 6: Verifying Rank-Nullity

From Example 1: $A$ is $3 \times 4$ with Nul$(A) = \text{Span}\{\mathbf{v}\}$ (1-dimensional).

The echelon form had 3 pivot columns, so rank$(A) = 3$.

Check: $\text{rank}(A) + \text{nullity}(A) = 3 + 1 = 4 = n$. ✓

From Example 2: $A$ is $3 \times 4$ with Nul$(A)$ having dimension 2.

The echelon form had 2 pivots, so rank$(A) = 2$.

Check: $2 + 2 = 4$. ✓

## Geometric Interpretation

### In $\mathbb{R}^3$

Consider a $3 \times 3$ matrix $A$:
- **Nul$(A)$** could be $\{\mathbf{0}\}$, a line, a plane, or all of $\mathbb{R}^3$
- **Col$(A)$** could be $\{\mathbf{0}\}$, a line, a plane, or all of $\mathbb{R}^3$
- **Row$(A)$** could be $\{\mathbf{0}\}$, a line, a plane, or all of $\mathbb{R}^3$

If rank$(A) = 3$ (full rank):
- Nul$(A) = \{\mathbf{0}\}$ (only the zero vector)
- Col$(A) = \mathbb{R}^3$ (all vectors)
- Row$(A) = \mathbb{R}^3$

If rank$(A) = 2$:
- Nul$(A)$ is a line
- Col$(A)$ is a plane
- Row$(A)$ is a plane

## Applications

### Determining Consistency of $A\mathbf{x} = \mathbf{b}$

The equation $A\mathbf{x} = \mathbf{b}$ has a solution if and only if $\mathbf{b} \in \text{Col}(A)$.

**Test:** Row reduce $[A \; | \; \mathbf{b}]$. If there's a pivot in the augmented column, then $\mathbf{b} \notin \text{Col}(A)$ and the system is inconsistent.

### Describing Solution Sets

If $A\mathbf{x} = \mathbf{b}$ is consistent:
- **Particular solution:** Any specific solution $\mathbf{x}_p$
- **General solution:** $\mathbf{x} = \mathbf{x}_p + \mathbf{x}_h$ where $\mathbf{x}_h \in \text{Nul}(A)$

The solution set is a translated version of the null space.

### Invertibility

An $n \times n$ matrix $A$ is invertible if and only if:
- Nul$(A) = \{\mathbf{0}\}$ (nullity = 0)
- Col$(A) = \mathbb{R}^n$ (rank = $n$)
- Row$(A) = \mathbb{R}^n$

## Summary

- **Null space** Nul$(A) = \{\mathbf{x} : A\mathbf{x} = \mathbf{0}\}$ is a subspace of $\mathbb{R}^n$
- **Column space** Col$(A) = \text{Span}\{\text{columns of } A\}$ is a subspace of $\mathbb{R}^m$
- **Row space** Row$(A) = \text{Col}(A^T)$ is a subspace of $\mathbb{R}^n$
- To find Nul$(A)$: solve $A\mathbf{x} = \mathbf{0}$ and express in parametric vector form
- To find a basis for Col$(A)$: identify pivot columns in echelon form, use corresponding columns from original $A$
- To find a basis for Row$(A)$: row reduce and take non-zero rows
- **Rank-Nullity Theorem:** rank$(A)$ + nullity$(A) = n$
- $A\mathbf{x} = \mathbf{b}$ is consistent if and only if $\mathbf{b} \in \text{Col}(A)$
