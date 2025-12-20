# Span and Spanning Sets

The span of a set of vectors is one of the most important concepts in linear algebra. It describes all the vectors you can create using linear combinations, and it provides a way to build subspaces from simple building blocks. Understanding span is essential for solving systems of equations, finding bases, and working with coordinates.

## Linear Combinations Review

A **linear combination** of vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$ is any expression of the form:

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_p\mathbf{v}_p$$

where $c_1, c_2, \ldots, c_p$ are scalars (called **coefficients** or **weights**).

**Example in $\mathbb{R}^3$:**

Let $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$.

The linear combination $2\mathbf{v}_1 + 3\mathbf{v}_2$ is:

$$2\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + 3\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 2 \\ 0 \\ 2 \end{bmatrix} + \begin{bmatrix} 0 \\ 3 \\ 3 \end{bmatrix} = \begin{bmatrix} 2 \\ 3 \\ 5 \end{bmatrix}$$

By varying the coefficients, we generate different vectors.

## Definition of Span

The **span** of vectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$ is the set of all possible linear combinations:

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p\} = \{c_1\mathbf{v}_1 + c_2\mathbf{v}_2 + \cdots + c_p\mathbf{v}_p : c_1, c_2, \ldots, c_p \in \mathbb{R}\}$$

**Read as:** "The span of $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$" or "the set spanned by $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p$."

**Key insight:** The span is the set of all vectors you can reach by combining the given vectors using addition and scalar multiplication.

## Span is a Subspace

**Theorem:** For any vectors $\mathbf{v}_1, \ldots, \mathbf{v}_p$ in vector space $V$, the span Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$ is a subspace of $V$.

**Proof:** We verify the three subspace conditions.

1. **Zero vector:** Setting all coefficients to 0 gives:
   $$0\mathbf{v}_1 + 0\mathbf{v}_2 + \cdots + 0\mathbf{v}_p = \mathbf{0}$$
   So $\mathbf{0} \in \text{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$. ✓

2. **Closed under addition:** Let $\mathbf{u} = a_1\mathbf{v}_1 + \cdots + a_p\mathbf{v}_p$ and $\mathbf{w} = b_1\mathbf{v}_1 + \cdots + b_p\mathbf{v}_p$ be in the span. Then:
   $$\mathbf{u} + \mathbf{w} = (a_1 + b_1)\mathbf{v}_1 + \cdots + (a_p + b_p)\mathbf{v}_p$$
   This is a linear combination of $\mathbf{v}_1, \ldots, \mathbf{v}_p$, so it's in the span. ✓

3. **Closed under scalar multiplication:** Let $\mathbf{u} = a_1\mathbf{v}_1 + \cdots + a_p\mathbf{v}_p$ be in the span and $c$ a scalar. Then:
   $$c\mathbf{u} = c(a_1\mathbf{v}_1 + \cdots + a_p\mathbf{v}_p) = (ca_1)\mathbf{v}_1 + \cdots + (ca_p)\mathbf{v}_p$$
   This is a linear combination of $\mathbf{v}_1, \ldots, \mathbf{v}_p$, so it's in the span. ✓

Therefore, the span is a subspace. ∎

**Consequence:** The span gives us a systematic way to construct subspaces: take any set of vectors and form all their linear combinations.

## Geometric Interpretation in $\mathbb{R}^2$ and $\mathbb{R}^3$

### Span of One Vector in $\mathbb{R}^2$

Let $\mathbf{v} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$.

$$\text{Span}\{\mathbf{v}\} = \left\{c\begin{bmatrix} 2 \\ 1 \end{bmatrix} : c \in \mathbb{R}\right\} = \left\{\begin{bmatrix} 2c \\ c \end{bmatrix} : c \in \mathbb{R}\right\}$$

This is the line through the origin in the direction of $\mathbf{v}$. It's the line $y = \frac{1}{2}x$.

**General principle:** In $\mathbb{R}^n$, Span$\{\mathbf{v}\}$ is the line through the origin in the direction of $\mathbf{v}$ (assuming $\mathbf{v} \neq \mathbf{0}$).

If $\mathbf{v} = \mathbf{0}$, then Span$\{\mathbf{0}\} = \{\mathbf{0}\}$ (just the origin).

### Span of Two Vectors in $\mathbb{R}^2$

Let $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$.

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2\} = \left\{c_1\begin{bmatrix} 1 \\ 0 \end{bmatrix} + c_2\begin{bmatrix} 0 \\ 1 \end{bmatrix} : c_1, c_2 \in \mathbb{R}\right\} = \left\{\begin{bmatrix} c_1 \\ c_2 \end{bmatrix} : c_1, c_2 \in \mathbb{R}\right\} = \mathbb{R}^2$$

These two vectors span all of $\mathbb{R}^2$.

**What if the vectors are parallel?** Let $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 2 \\ 4 \end{bmatrix} = 2\mathbf{v}_1$.

$$c_1\mathbf{v}_1 + c_2\mathbf{v}_2 = c_1\mathbf{v}_1 + c_2(2\mathbf{v}_1) = (c_1 + 2c_2)\mathbf{v}_1$$

Every linear combination is just a scalar multiple of $\mathbf{v}_1$, so:

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2\} = \text{Span}\{\mathbf{v}_1\}$$

This is just a line, not the entire plane.

**Conclusion:** Two vectors in $\mathbb{R}^2$ span the whole plane if and only if they are not parallel (not scalar multiples of each other).

### Span of Two Vectors in $\mathbb{R}^3$

Let $\mathbf{v}_1 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$ and $\mathbf{v}_2 = \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}$.

$$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2\} = \left\{\begin{bmatrix} c_1 \\ c_2 \\ 0 \end{bmatrix} : c_1, c_2 \in \mathbb{R}\right\}$$

This is the $xy$-plane in $\mathbb{R}^3$.

**General principle:** In $\mathbb{R}^3$:
- Span of one non-zero vector: a line through the origin
- Span of two non-parallel vectors: a plane through the origin
- Span of three non-coplanar vectors: all of $\mathbb{R}^3$

## Determining if a Vector is in a Span

**Question:** Is $\mathbf{b}$ in Span$\{\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_p\}$?

**Answer:** Yes, if and only if the equation:

$$x_1\mathbf{v}_1 + x_2\mathbf{v}_2 + \cdots + x_p\mathbf{v}_p = \mathbf{b}$$

has a solution (for the unknowns $x_1, \ldots, x_p$).

This is a **vector equation**, which can be written as a linear system or as a matrix equation $A\mathbf{x} = \mathbf{b}$ where the columns of $A$ are $\mathbf{v}_1, \ldots, \mathbf{v}_p$.

### Example: Checking Membership in $\mathbb{R}^3$

Is $\mathbf{b} = \begin{bmatrix} 3 \\ 1 \\ 5 \end{bmatrix}$ in Span$\left\{\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}\right\}$?

We need to solve:

$$x_1\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + x_2\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 1 \\ 5 \end{bmatrix}$$

This gives the system:
$$\begin{align}
x_1 &= 3 \\
x_2 &= 1 \\
x_1 + x_2 &= 5
\end{align}$$

From the first two equations: $x_1 = 3$, $x_2 = 1$. Checking the third: $3 + 1 = 4 \neq 5$.

The system is inconsistent, so $\mathbf{b}$ is **not** in the span.

**Geometric interpretation:** The span is a plane through the origin containing $(1, 0, 1)$ and $(0, 1, 1)$. The point $(3, 1, 5)$ is not on this plane.

### Example: Vector in the Span

Is $\mathbf{b} = \begin{bmatrix} 3 \\ 1 \\ 4 \end{bmatrix}$ in Span$\left\{\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}\right\}$?

The system is:
$$\begin{align}
x_1 &= 3 \\
x_2 &= 1 \\
x_1 + x_2 &= 4
\end{align}$$

This time: $3 + 1 = 4$. ✓ The system is consistent with solution $x_1 = 3$, $x_2 = 1$.

Therefore: $\mathbf{b} = 3\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + 1\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$ is in the span.

## Spanning Sets

If Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\} = V$ (the entire vector space), we say that $\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$ **spans** $V$, or is a **spanning set** for $V$.

**Example:** The standard unit vectors $\mathbf{e}_1, \mathbf{e}_2, \ldots, \mathbf{e}_n$ span $\mathbb{R}^n$ because:

$$\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} = x_1\mathbf{e}_1 + x_2\mathbf{e}_2 + \cdots + x_n\mathbf{e}_n$$

Every vector in $\mathbb{R}^n$ is a linear combination of the $\mathbf{e}_i$.

**Example:** The set $\{1, x, x^2, \ldots, x^n\}$ spans $\mathcal{P}_n$ (polynomials of degree at most $n$) because every such polynomial is:

$$a_0 \cdot 1 + a_1 \cdot x + a_2 \cdot x^2 + \cdots + a_n \cdot x^n$$

**Example:** Do the vectors $\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}$, $\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}$, and $\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$ span $\mathbb{R}^3$?

A vector $\mathbf{b} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$ is in the span if:

$$x_1\begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} + x_2\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} + x_3\begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$$

This gives:
$$\begin{align}
x_1 + x_2 &= b_1 \\
x_1 + x_3 &= b_2 \\
x_2 + x_3 &= b_3
\end{align}$$

Form the augmented matrix and row reduce:

$$\begin{bmatrix} 1 & 1 & 0 & | & b_1 \\ 1 & 0 & 1 & | & b_2 \\ 0 & 1 & 1 & | & b_3 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & 0 & | & \frac{b_1 + b_2 - b_3}{2} \\ 0 & 1 & 0 & | & \frac{b_1 - b_2 + b_3}{2} \\ 0 & 0 & 1 & | & \frac{-b_1 + b_2 + b_3}{2} \end{bmatrix}$$

(I'll spare the row operations—verify this yourself!)

The system has a solution for every $\mathbf{b}$, so these three vectors span $\mathbb{R}^3$.

## Matrix Formulation

The question "Does $\mathbf{b} \in \text{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$?" is equivalent to asking whether the matrix equation:

$$A\mathbf{x} = \mathbf{b}$$

is consistent, where $A = [\mathbf{v}_1 \; \mathbf{v}_2 \; \cdots \; \mathbf{v}_p]$ (columns are the spanning vectors).

**Key fact:** Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$ equals the **column space** of $A$ (the set of all linear combinations of $A$'s columns).

The vectors span $\mathbb{R}^m$ (where each $\mathbf{v}_i \in \mathbb{R}^m$) if and only if $A\mathbf{x} = \mathbf{b}$ is consistent for every $\mathbf{b} \in \mathbb{R}^m$.

## Span in Other Vector Spaces

### Span in Polynomial Spaces

In $\mathcal{P}_2$, what is Span$\{1 + x, x + x^2\}$?

A polynomial is in the span if it can be written as:

$$c_1(1 + x) + c_2(x + x^2) = c_1 + (c_1 + c_2)x + c_2x^2$$

This includes polynomials of the form $a_0 + a_1x + a_2x^2$ where we can solve:
- $c_1 = a_0$
- $c_1 + c_2 = a_1$
- $c_2 = a_2$

From the first and third equations: $c_1 = a_0$ and $c_2 = a_2$. The second equation becomes $a_0 + a_2 = a_1$.

So the span consists of polynomials where $a_1 = a_0 + a_2$. This is a 2-dimensional subspace of $\mathcal{P}_2$ (not all of $\mathcal{P}_2$).

For example, $1 + 3x + 2x^2$ is in the span (since $3 = 1 + 2$), but $1 + x + x^2$ is not (since $1 \neq 1 + 1$).

### Span in Matrix Spaces

In $M_{2 \times 2}$, what is Span$\left\{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\right\}$?

$$c_1\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + c_2\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} c_1 & c_2 \\ c_2 & 0 \end{bmatrix}$$

The span consists of matrices of the form $\begin{bmatrix} a & b \\ b & 0 \end{bmatrix}$ (symmetric about the diagonal in the first two entries, bottom-right entry is 0).

## Properties of Span

1. **Span is the smallest subspace containing the vectors:** If $H$ is any subspace containing $\mathbf{v}_1, \ldots, \mathbf{v}_p$, then Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\} \subseteq H$.

2. **Redundancy doesn't change span:** If $\mathbf{v}_3 = 2\mathbf{v}_1 + \mathbf{v}_2$, then:
   $$\text{Span}\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\} = \text{Span}\{\mathbf{v}_1, \mathbf{v}_2\}$$

3. **Adding zero doesn't change span:** Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p, \mathbf{0}\}$ = Span$\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$

## Summary

- The **span** of vectors is the set of all their linear combinations
- Span always forms a **subspace**
- Geometrically in $\mathbb{R}^n$:
  - Span of one vector: line through origin
  - Span of two non-parallel vectors: plane through origin
  - Span of three non-coplanar vectors (in $\mathbb{R}^3$): all of $\mathbb{R}^3$
- To check if $\mathbf{b} \in \text{Span}\{\mathbf{v}_1, \ldots, \mathbf{v}_p\}$: solve $x_1\mathbf{v}_1 + \cdots + x_p\mathbf{v}_p = \mathbf{b}$
- A set **spans** a vector space if every vector can be expressed as a linear combination
- Span is the **column space** of the matrix with the vectors as columns
