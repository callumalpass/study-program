---
id: math201-t7-kernel-range
title: "Kernel and Range"
order: 3
---

# Kernel and Range of Linear Transformations

## Introduction

The kernel and range of a linear transformation are two fundamental subspaces that characterize the transformation's behavior. They reveal important information about solutions to equations involving the transformation and provide insight into the transformation's structure.

## The Kernel (Null Space)

### Definition

The **kernel** (or **null space**) of a linear transformation $T: V \to W$ is the set of all vectors in $V$ that map to the zero vector in $W$:

$$\ker(T) = \{\mathbf{v} \in V : T(\mathbf{v}) = \mathbf{0}\}$$

Alternative notation: $\text{null}(T)$ or $N(T)$.

### Theorem: The Kernel is a Subspace

The kernel of $T$ is a subspace of the domain $V$.

**Proof**:
1. $\mathbf{0} \in \ker(T)$ because $T(\mathbf{0}) = \mathbf{0}$ (proved earlier)
2. If $\mathbf{u}, \mathbf{v} \in \ker(T)$, then $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}) = \mathbf{0} + \mathbf{0} = \mathbf{0}$, so $\mathbf{u} + \mathbf{v} \in \ker(T)$
3. If $\mathbf{v} \in \ker(T)$ and $c$ is a scalar, then $T(c\mathbf{v}) = cT(\mathbf{v}) = c\mathbf{0} = \mathbf{0}$, so $c\mathbf{v} \in \ker(T)$

### Finding the Kernel

For $T: \mathbb{R}^n \to \mathbb{R}^m$ with standard matrix $A$, the kernel of $T$ is the null space of $A$:

$$\ker(T) = \{\mathbf{x} \in \mathbb{R}^n : A\mathbf{x} = \mathbf{0}\}$$

To find $\ker(T)$, solve the homogeneous system $A\mathbf{x} = \mathbf{0}$.

### Example 1: Finding the Kernel

Let $T: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by $T(x, y, z) = (x + 2y - z, 2x + 4y - 2z)$.

**Solution**:

First, find the standard matrix:
$$A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix}$$

Solve $A\mathbf{x} = \mathbf{0}$:
$$\begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix}\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

Row reduce:
$$\begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix} \sim \begin{bmatrix} 1 & 2 & -1 \\ 0 & 0 & 0 \end{bmatrix}$$

The system becomes: $x + 2y - z = 0$, so $x = -2y + z$.

With free variables $y = s$ and $z = t$:
$$\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} -2s + t \\ s \\ t \end{bmatrix} = s\begin{bmatrix} -2 \\ 1 \\ 0 \end{bmatrix} + t\begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}$$

Therefore:
$$\ker(T) = \text{span}\left\{\begin{bmatrix} -2 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}\right\}$$

The dimension of $\ker(T)$ is 2, called the **nullity** of $T$.

## The Range (Image)

### Definition

The **range** (or **image**) of a linear transformation $T: V \to W$ is the set of all vectors in $W$ that are images of vectors in $V$:

$$\text{range}(T) = \{T(\mathbf{v}) : \mathbf{v} \in V\} = \{\mathbf{w} \in W : \mathbf{w} = T(\mathbf{v}) \text{ for some } \mathbf{v} \in V\}$$

Alternative notation: $\text{im}(T)$ or $R(T)$.

### Theorem: The Range is a Subspace

The range of $T$ is a subspace of the codomain $W$.

**Proof**:
1. $\mathbf{0} \in \text{range}(T)$ because $T(\mathbf{0}) = \mathbf{0}$
2. If $\mathbf{w}_1, \mathbf{w}_2 \in \text{range}(T)$, then $\mathbf{w}_1 = T(\mathbf{v}_1)$ and $\mathbf{w}_2 = T(\mathbf{v}_2)$ for some $\mathbf{v}_1, \mathbf{v}_2 \in V$. Then $\mathbf{w}_1 + \mathbf{w}_2 = T(\mathbf{v}_1) + T(\mathbf{v}_2) = T(\mathbf{v}_1 + \mathbf{v}_2)$, so $\mathbf{w}_1 + \mathbf{w}_2 \in \text{range}(T)$
3. If $\mathbf{w} \in \text{range}(T)$ and $c$ is a scalar, then $\mathbf{w} = T(\mathbf{v})$ for some $\mathbf{v} \in V$, so $c\mathbf{w} = cT(\mathbf{v}) = T(c\mathbf{v})$, thus $c\mathbf{w} \in \text{range}(T)$

### Finding the Range

For $T: \mathbb{R}^n \to \mathbb{R}^m$ with standard matrix $A$, the range of $T$ is the column space of $A$:

$$\text{range}(T) = \text{col}(A) = \text{span}\{\text{columns of } A\}$$

To find a basis for the range, find the pivot columns of $A$ in its row echelon form.

### Example 2: Finding the Range

Using the same transformation from Example 1: $T(x, y, z) = (x + 2y - z, 2x + 4y - 2z)$.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix}$$

Row reduce to find pivot columns:
$$\begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \end{bmatrix} \sim \begin{bmatrix} 1 & 2 & -1 \\ 0 & 0 & 0 \end{bmatrix}$$

Column 1 is a pivot column. The range is:
$$\text{range}(T) = \text{span}\left\{\begin{bmatrix} 1 \\ 2 \end{bmatrix}\right\}$$

The dimension of $\text{range}(T)$ is 1, called the **rank** of $T$.

Notice: $\dim(\ker(T)) + \dim(\text{range}(T)) = 2 + 1 = 3 = \dim(\mathbb{R}^3)$ ✓

## The Rank-Nullity Theorem

### Theorem

For a linear transformation $T: V \to W$ where $V$ is finite-dimensional:

$$\dim(\ker(T)) + \dim(\text{range}(T)) = \dim(V)$$

Equivalently:
$$\text{nullity}(T) + \text{rank}(T) = \dim(V)$$

This fundamental result relates the dimension of the kernel, the dimension of the range, and the dimension of the domain.

### Example 3: Applying Rank-Nullity

Let $T: \mathbb{R}^5 \to \mathbb{R}^3$ be a linear transformation with $\text{rank}(T) = 3$. Find $\text{nullity}(T)$.

**Solution**:

By the Rank-Nullity Theorem:
$$\text{nullity}(T) + \text{rank}(T) = \dim(\mathbb{R}^5)$$
$$\text{nullity}(T) + 3 = 5$$
$$\text{nullity}(T) = 2$$

### Example 4: Rotation in $\mathbb{R}^2$

Find the kernel and range of the rotation transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ by $90°$ counterclockwise.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

**Kernel**: Solve $A\mathbf{x} = \mathbf{0}$:
$$\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

This gives $-y = 0$ and $x = 0$, so $\mathbf{x} = \mathbf{0}$.

$$\ker(T) = \{\mathbf{0}\}, \quad \text{nullity}(T) = 0$$

**Range**: Since the columns are $\begin{bmatrix} 0 \\ 1 \end{bmatrix}$ and $\begin{bmatrix} -1 \\ 0 \end{bmatrix}$, which are linearly independent:

$$\text{range}(T) = \mathbb{R}^2, \quad \text{rank}(T) = 2$$

**Verification**: $0 + 2 = 2$ ✓

### Example 5: Projection

Let $T: \mathbb{R}^3 \to \mathbb{R}^3$ be the projection onto the $xy$-plane, defined by $T(x, y, z) = (x, y, 0)$.

**Solution**:

**Kernel**: Solve $T(x, y, z) = (0, 0, 0)$:
$$(x, y, 0) = (0, 0, 0) \implies x = 0, y = 0$$

So:
$$\ker(T) = \left\{\begin{bmatrix} 0 \\ 0 \\ z \end{bmatrix} : z \in \mathbb{R}\right\} = \text{span}\left\{\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}\right\}$$

$$\text{nullity}(T) = 1$$

**Range**: The range consists of all vectors of the form $(x, y, 0)$:

$$\text{range}(T) = \left\{\begin{bmatrix} x \\ y \\ 0 \end{bmatrix} : x, y \in \mathbb{R}\right\} = \text{span}\left\{\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix}\right\}$$

$$\text{rank}(T) = 2$$

**Verification**: $1 + 2 = 3$ ✓

### Example 6: Differentiation

Let $D: P_3 \to P_2$ be defined by $D(p(t)) = p'(t)$.

**Solution**:

**Kernel**: Find all polynomials $p(t) = a_0 + a_1t + a_2t^2 + a_3t^3$ such that $p'(t) = 0$:

$$p'(t) = a_1 + 2a_2t + 3a_3t^2 = 0$$

This requires $a_1 = a_2 = a_3 = 0$, leaving $p(t) = a_0$ (constant polynomials).

$$\ker(D) = \text{span}\{1\}, \quad \text{nullity}(D) = 1$$

**Range**: For any polynomial $q(t) = b_0 + b_1t + b_2t^2 \in P_2$, we can find $p(t) = b_0t + \frac{b_1}{2}t^2 + \frac{b_2}{3}t^3 \in P_3$ such that $D(p(t)) = q(t)$.

$$\text{range}(D) = P_2, \quad \text{rank}(D) = 3$$

**Verification**: $1 + 3 = 4 = \dim(P_3)$ ✓

## Interpreting Kernel and Range

- **Kernel**: Measures how much information is "lost" by the transformation. A trivial kernel $\{\mathbf{0}\}$ means no information is lost.

- **Range**: Measures the "reach" of the transformation. If range$(T) = W$, the transformation is onto (surjective).

- **Rank-Nullity**: Establishes a trade-off between information preservation (small kernel) and coverage (large range).

## Summary

The kernel and range are fundamental subspaces associated with any linear transformation. The kernel captures vectors that map to zero, while the range captures all possible outputs. The Rank-Nullity Theorem provides a powerful constraint relating these dimensions to the dimension of the domain, making it an essential tool for analyzing linear transformations.
