# One-to-One and Onto Transformations

## Introduction

Linear transformations can have special properties that make them particularly useful: being one-to-one (injective) means no two inputs produce the same output, while being onto (surjective) means every possible output is achieved. Transformations that are both are called isomorphisms and establish that two vector spaces are essentially the same.

## One-to-One (Injective) Transformations

### Definition

A linear transformation $T: V \to W$ is **one-to-one** (or **injective**) if different inputs always produce different outputs. Formally:

$$T(\mathbf{u}) = T(\mathbf{v}) \implies \mathbf{u} = \mathbf{v}$$

for all $\mathbf{u}, \mathbf{v} \in V$.

### Equivalent Characterization

**Theorem**: A linear transformation $T: V \to W$ is one-to-one if and only if $\ker(T) = \{\mathbf{0}\}$.

**Proof**:
($\Rightarrow$) Suppose $T$ is one-to-one. Since $T(\mathbf{0}) = \mathbf{0}$, if $T(\mathbf{v}) = \mathbf{0}$, then $T(\mathbf{v}) = T(\mathbf{0})$, which implies $\mathbf{v} = \mathbf{0}$ by the one-to-one property.

($\Leftarrow$) Suppose $\ker(T) = \{\mathbf{0}\}$. If $T(\mathbf{u}) = T(\mathbf{v})$, then:
$$T(\mathbf{u}) - T(\mathbf{v}) = \mathbf{0}$$
$$T(\mathbf{u} - \mathbf{v}) = \mathbf{0}$$

This means $\mathbf{u} - \mathbf{v} \in \ker(T) = \{\mathbf{0}\}$, so $\mathbf{u} - \mathbf{v} = \mathbf{0}$, thus $\mathbf{u} = \mathbf{v}$.

### Matrix Criterion

For $T: \mathbb{R}^n \to \mathbb{R}^m$ with standard matrix $A$:

**$T$ is one-to-one $\iff$ the columns of $A$ are linearly independent $\iff$ $A$ has $n$ pivot columns**

### Example 1: Verifying One-to-One

Determine if $T: \mathbb{R}^3 \to \mathbb{R}^3$ defined by $T(x, y, z) = (x + y, 2x + 2y + z, x + y - z)$ is one-to-one.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 1 & 1 & 0 \\ 2 & 2 & 1 \\ 1 & 1 & -1 \end{bmatrix}$$

Find the kernel by solving $A\mathbf{x} = \mathbf{0}$:

Row reduce:
$$\begin{bmatrix} 1 & 1 & 0 \\ 2 & 2 & 1 \\ 1 & 1 & -1 \end{bmatrix} \sim \begin{bmatrix} 1 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & -1 \end{bmatrix} \sim \begin{bmatrix} 1 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{bmatrix}$$

From the RREF: $x + y = 0$ and $z = 0$, so $x = -y$ and $z = 0$.

With $y = t$:
$$\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} -t \\ t \\ 0 \end{bmatrix} = t\begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix}$$

Since $\ker(T) \neq \{\mathbf{0}\}$, **$T$ is NOT one-to-one**.

### Example 2: One-to-One Transformation

Determine if $T: \mathbb{R}^2 \to \mathbb{R}^3$ defined by $T(x, y) = (x - y, 2x + y, 3y)$ is one-to-one.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 1 & -1 \\ 2 & 1 \\ 0 & 3 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} 1 & -1 \\ 2 & 1 \\ 0 & 3 \end{bmatrix} \sim \begin{bmatrix} 1 & -1 \\ 0 & 3 \\ 0 & 3 \end{bmatrix} \sim \begin{bmatrix} 1 & -1 \\ 0 & 3 \\ 0 & 0 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}$$

The matrix has 2 pivot columns (all columns are pivot columns), so the columns are linearly independent.

Therefore, **$T$ is one-to-one**.

Alternatively: $\ker(T) = \{\mathbf{0}\}$, so $T$ is one-to-one.

## Onto (Surjective) Transformations

### Definition

A linear transformation $T: V \to W$ is **onto** (or **surjective**) if every vector in $W$ is the image of at least one vector in $V$. Formally:

$$\text{range}(T) = W$$

or equivalently:

$$\text{For every } \mathbf{w} \in W, \text{ there exists } \mathbf{v} \in V \text{ such that } T(\mathbf{v}) = \mathbf{w}$$

### Matrix Criterion

For $T: \mathbb{R}^n \to \mathbb{R}^m$ with standard matrix $A$:

**$T$ is onto $\iff$ the columns of $A$ span $\mathbb{R}^m$ $\iff$ $A$ has $m$ pivot rows (a pivot in every row)**

### Example 3: Verifying Onto

Determine if the transformation from Example 1 is onto.

**Solution**:

From Example 1, the RREF of $A$ is:
$$\begin{bmatrix} 1 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{bmatrix}$$

This has only 2 pivot rows (rows 1 and 2), not 3. Therefore, the columns do not span $\mathbb{R}^3$.

**$T$ is NOT onto**.

We can verify: $\text{rank}(T) = 2 < 3 = \dim(\mathbb{R}^3)$.

### Example 4: Onto Transformation

Determine if the transformation from Example 2 is onto.

**Solution**:

The RREF of $A$ from Example 2 is:
$$\begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}$$

This has only 2 pivot rows, but the codomain is $\mathbb{R}^3$, which has dimension 3.

**$T$ is NOT onto**.

Note: A linear transformation from a lower-dimensional space to a higher-dimensional space can never be onto!

### Example 5: Onto Transformation

Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by $T(x, y, z) = (x + 2y - z, 3x - y + 2z)$. Determine if $T$ is onto.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 1 & 2 & -1 \\ 3 & -1 & 2 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} 1 & 2 & -1 \\ 3 & -1 & 2 \end{bmatrix} \sim \begin{bmatrix} 1 & 2 & -1 \\ 0 & -7 & 5 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & * \\ 0 & 1 & * \end{bmatrix}$$

This has 2 pivot rows, and the codomain $\mathbb{R}^2$ has dimension 2.

**$T$ is onto**.

## Isomorphisms

### Definition

A linear transformation $T: V \to W$ is an **isomorphism** if it is both one-to-one and onto. In this case, we say $V$ and $W$ are **isomorphic**, written $V \cong W$.

Isomorphic vector spaces are essentially the same from an algebraic perspective—they have the same dimension and structure, just different labels for their elements.

### Properties of Isomorphisms

1. An isomorphism has an inverse transformation $T^{-1}: W \to V$ that is also an isomorphism.
2. Isomorphisms preserve all vector space operations and properties.
3. $V \cong W$ if and only if $\dim(V) = \dim(W)$.

### Example 6: An Isomorphism

Show that $T: P_2 \to \mathbb{R}^3$ defined by $T(a + bt + ct^2) = (a, b, c)$ is an isomorphism.

**Solution**:

**One-to-one**: Suppose $T(a + bt + ct^2) = (0, 0, 0)$. Then $(a, b, c) = (0, 0, 0)$, so $a = b = c = 0$, which means $a + bt + ct^2 = 0$ (the zero polynomial). Thus $\ker(T) = \{0\}$, so $T$ is one-to-one. ✓

**Onto**: For any $(a, b, c) \in \mathbb{R}^3$, we have $T(a + bt + ct^2) = (a, b, c)$. So every vector in $\mathbb{R}^3$ is in the range. Thus $T$ is onto. ✓

Since $T$ is both one-to-one and onto, **$T$ is an isomorphism**.

This shows $P_2 \cong \mathbb{R}^3$, which makes sense since both have dimension 3.

### Example 7: Not an Isomorphism

Can there be an isomorphism from $\mathbb{R}^2$ to $\mathbb{R}^3$?

**Solution**:

No. For any linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^3$:

By the Rank-Nullity Theorem:
$$\text{nullity}(T) + \text{rank}(T) = 2$$

Since rank$(T) \leq \min(2, 3) = 2 < 3$, we have rank$(T) < 3 = \dim(\mathbb{R}^3)$.

Therefore, $T$ cannot be onto, so it cannot be an isomorphism.

**General principle**: Two vector spaces can be isomorphic only if they have the same dimension.

### Example 8: Matrix Transformation

For what values of $k$ is $T: \mathbb{R}^3 \to \mathbb{R}^3$ defined by the matrix
$$A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & k & 6 \\ 0 & 0 & k-2 \end{bmatrix}$$
an isomorphism?

**Solution**:

Since the domain and codomain have the same dimension, $T$ is an isomorphism if and only if it is one-to-one (equivalently, onto).

$T$ is one-to-one if and only if $A$ has 3 pivot columns. Since $A$ is upper triangular, this happens when all diagonal entries are nonzero:

$$1 \neq 0, \quad k \neq 0, \quad k - 2 \neq 0$$

Therefore, $T$ is an isomorphism when **$k \neq 0$ and $k \neq 2$**.

## Summary Table

| Property | Kernel Condition | Matrix Condition | Rank-Nullity |
|----------|------------------|------------------|--------------|
| One-to-One | $\ker(T) = \{\mathbf{0}\}$ | Columns linearly independent | nullity$(T) = 0$ |
| Onto | range$(T) = W$ | Columns span codomain | rank$(T) = \dim(W)$ |
| Isomorphism | Both above | Square, invertible matrix | $\dim(V) = \dim(W)$ |

## Practical Implications

- **One-to-one**: Solutions to $T(\mathbf{x}) = \mathbf{b}$ are unique (if they exist)
- **Onto**: Solutions to $T(\mathbf{x}) = \mathbf{b}$ always exist (but may not be unique)
- **Isomorphism**: Solutions to $T(\mathbf{x}) = \mathbf{b}$ always exist and are unique

## Summary

The concepts of one-to-one and onto transformations characterize how linear transformations map between vector spaces. One-to-one transformations preserve distinctness, onto transformations achieve full coverage, and isomorphisms do both, establishing a perfect correspondence between vector spaces. These properties are fundamental to understanding the structure and behavior of linear transformations.
