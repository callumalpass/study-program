---
id: math201-t7-composition
title: "Composition and Inverse"
order: 5
---

# Composition and Inverse of Linear Transformations

## Introduction

Just as functions can be composed and inverted, linear transformations can be combined through composition and, under certain conditions, can be inverted. These operations allow us to build complex transformations from simpler ones and to "undo" transformations.

## Composition of Linear Transformations

### Definition

If $T: U \to V$ and $S: V \to W$ are linear transformations, their **composition** $S \circ T: U \to W$ is defined by:

$$(S \circ T)(\mathbf{u}) = S(T(\mathbf{u}))$$

for all $\mathbf{u} \in U$.

We first apply $T$, then apply $S$ to the result. Note the order: $S \circ T$ means "$S$ after $T$" or "$S$ composed with $T$".

### Theorem: Composition Preserves Linearity

If $T: U \to V$ and $S: V \to W$ are linear transformations, then $S \circ T: U \to W$ is also a linear transformation.

**Proof**: For any $\mathbf{u}_1, \mathbf{u}_2 \in U$ and scalars $c_1, c_2$:

$$(S \circ T)(c_1\mathbf{u}_1 + c_2\mathbf{u}_2) = S(T(c_1\mathbf{u}_1 + c_2\mathbf{u}_2))$$
$$= S(c_1T(\mathbf{u}_1) + c_2T(\mathbf{u}_2)) \quad \text{(T is linear)}$$
$$= c_1S(T(\mathbf{u}_1)) + c_2S(T(\mathbf{u}_2)) \quad \text{(S is linear)}$$
$$= c_1(S \circ T)(\mathbf{u}_1) + c_2(S \circ T)(\mathbf{u}_2)$$

Therefore, $S \circ T$ is linear.

### Matrix Representation of Composition

**Theorem**: If $T: \mathbb{R}^n \to \mathbb{R}^m$ has standard matrix $A$ and $S: \mathbb{R}^m \to \mathbb{R}^p$ has standard matrix $B$, then $S \circ T: \mathbb{R}^n \to \mathbb{R}^p$ has standard matrix $BA$ (not $AB$!).

The key point: **The matrix of the composition is the product of the matrices in the same order**.

$$(S \circ T)(\mathbf{x}) = S(T(\mathbf{x})) = S(A\mathbf{x}) = B(A\mathbf{x}) = (BA)\mathbf{x}$$

### Example 1: Computing a Composition

Let $T: \mathbb{R}^2 \to \mathbb{R}^3$ be defined by $T(x, y) = (x + y, x - y, 2y)$ and $S: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by $S(x, y, z) = (x + z, y - z)$.

Find the standard matrix of $S \circ T$ and compute $(S \circ T)(3, -1)$.

**Solution**:

**Step 1**: Find the standard matrices.

For $T$:
$$A = \begin{bmatrix} 1 & 1 \\ 1 & -1 \\ 0 & 2 \end{bmatrix}$$

For $S$:
$$B = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \end{bmatrix}$$

**Step 2**: Compute $BA$:
$$BA = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & -1 \end{bmatrix}\begin{bmatrix} 1 & 1 \\ 1 & -1 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} 1 & 3 \\ 1 & -3 \end{bmatrix}$$

**Step 3**: Verify by direct computation:
$$(S \circ T)(x, y) = S(T(x, y)) = S(x + y, x - y, 2y)$$
$$= ((x + y) + 2y, (x - y) - 2y) = (x + 3y, x - 3y)$$

This corresponds to the matrix:
$$\begin{bmatrix} 1 & 3 \\ 1 & -3 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} x + 3y \\ x - 3y \end{bmatrix}$$ ✓

**Step 4**: Compute $(S \circ T)(3, -1)$:
$$\begin{bmatrix} 1 & 3 \\ 1 & -3 \end{bmatrix}\begin{bmatrix} 3 \\ -1 \end{bmatrix} = \begin{bmatrix} 3 - 3 \\ 3 + 3 \end{bmatrix} = \begin{bmatrix} 0 \\ 6 \end{bmatrix}$$

### Example 2: Composition of Geometric Transformations

Let $R$ be rotation by $90°$ counterclockwise in $\mathbb{R}^2$ and $S$ be reflection across the $x$-axis. Find the standard matrices of $R \circ S$ and $S \circ R$, and determine if composition is commutative.

**Solution**:

**Standard matrix of $R$**:
$$M_R = \begin{bmatrix} \cos 90° & -\sin 90° \\ \sin 90° & \cos 90° \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

**Standard matrix of $S$** (reflection across $x$-axis maps $(x, y) \to (x, -y)$):
$$M_S = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$$

**Compute $R \circ S$** (first reflect, then rotate):
$$M_R M_S = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$$

**Compute $S \circ R$** (first rotate, then reflect):
$$M_S M_R = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ -1 & 0 \end{bmatrix}$$

Since $M_R M_S \neq M_S M_R$, **composition is NOT commutative** in general.

Geometrically:
- $R \circ S$ is reflection across the line $y = x$
- $S \circ R$ is reflection across the line $y = -x$

### Properties of Composition

1. **Associativity**: $(R \circ S) \circ T = R \circ (S \circ T)$
2. **Identity**: $I \circ T = T \circ I = T$
3. **NOT Commutative** (in general): $S \circ T \neq T \circ S$

## Inverse Linear Transformations

### Definition

A linear transformation $T: V \to W$ is **invertible** if there exists a linear transformation $T^{-1}: W \to V$ such that:

$$T^{-1}(T(\mathbf{v})) = \mathbf{v} \text{ for all } \mathbf{v} \in V$$
$$T(T^{-1}(\mathbf{w})) = \mathbf{w} \text{ for all } \mathbf{w} \in W$$

Equivalently: $T^{-1} \circ T = I_V$ and $T \circ T^{-1} = I_W$.

### Theorem: Conditions for Invertibility

A linear transformation $T: V \to W$ is invertible if and only if it is an isomorphism (both one-to-one and onto).

**Consequences**:
- If $T: \mathbb{R}^n \to \mathbb{R}^m$ is invertible, then $n = m$
- The inverse transformation $T^{-1}$, if it exists, is unique
- If $T$ is invertible, then $(T^{-1})^{-1} = T$

### Matrix Criterion for Invertibility

For $T: \mathbb{R}^n \to \mathbb{R}^n$ with standard matrix $A$:

**$T$ is invertible $\iff$ $A$ is invertible $\iff$ $\det(A) \neq 0$**

When $T$ is invertible, the standard matrix of $T^{-1}$ is $A^{-1}$.

### Example 3: Finding an Inverse Transformation

Let $T: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $T(x, y) = (3x + 2y, 5x + 4y)$.

Determine if $T$ is invertible, and if so, find $T^{-1}$.

**Solution**:

**Step 1**: Find the standard matrix:
$$A = \begin{bmatrix} 3 & 2 \\ 5 & 4 \end{bmatrix}$$

**Step 2**: Check invertibility:
$$\det(A) = 3(4) - 2(5) = 12 - 10 = 2 \neq 0$$

Therefore, $A$ is invertible, so **$T$ is invertible**.

**Step 3**: Find $A^{-1}$:
$$A^{-1} = \frac{1}{\det(A)}\begin{bmatrix} 4 & -2 \\ -5 & 3 \end{bmatrix} = \frac{1}{2}\begin{bmatrix} 4 & -2 \\ -5 & 3 \end{bmatrix} = \begin{bmatrix} 2 & -1 \\ -5/2 & 3/2 \end{bmatrix}$$

**Step 4**: Express $T^{-1}$:
$$T^{-1}(x, y) = \begin{bmatrix} 2 & -1 \\ -5/2 & 3/2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 2x - y \\ -\frac{5}{2}x + \frac{3}{2}y \end{bmatrix}$$

So $T^{-1}(x, y) = \left(2x - y, -\frac{5}{2}x + \frac{3}{2}y\right)$.

**Verification**: Check $T(T^{-1}(x, y)) = (x, y)$:
$$T\left(2x - y, -\frac{5}{2}x + \frac{3}{2}y\right) = \left(3(2x - y) + 2\left(-\frac{5}{2}x + \frac{3}{2}y\right), 5(2x - y) + 4\left(-\frac{5}{2}x + \frac{3}{2}y\right)\right)$$
$$= (6x - 3y - 5x + 3y, 10x - 5y - 10x + 6y) = (x, y)$$ ✓

### Example 4: Non-Invertible Transformation

Determine if $T: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $T(x, y) = (2x + 4y, x + 2y)$ is invertible.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}$$

Check the determinant:
$$\det(A) = 2(2) - 4(1) = 4 - 4 = 0$$

Since $\det(A) = 0$, **$T$ is NOT invertible**.

We can verify this by noting that the columns are linearly dependent: the second column is twice the first. This means $\ker(T) \neq \{\mathbf{0}\}$, so $T$ is not one-to-one.

### Example 5: Inverse of a Rotation

Find the inverse of the rotation transformation $R_\theta: \mathbb{R}^2 \to \mathbb{R}^2$ that rotates counterclockwise by angle $\theta$.

**Solution**:

The standard matrix is:
$$A = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

Check invertibility:
$$\det(A) = \cos^2\theta + \sin^2\theta = 1 \neq 0$$

So $R_\theta$ is invertible.

Using the formula for $2 \times 2$ inverse:
$$A^{-1} = \frac{1}{1}\begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix} = \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix}$$

This is the matrix for rotation by $-\theta$ (or equivalently, by $-\theta$ in the clockwise direction):
$$\begin{bmatrix} \cos(-\theta) & -\sin(-\theta) \\ \sin(-\theta) & \cos(-\theta) \end{bmatrix} = \begin{bmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{bmatrix}$$

**Result**: $(R_\theta)^{-1} = R_{-\theta}$

This makes geometric sense: to undo a counterclockwise rotation by $\theta$, rotate clockwise by $\theta$ (or counterclockwise by $-\theta$).

### Example 6: Composition and Inverses

If $S$ and $T$ are invertible linear transformations, show that $S \circ T$ is invertible and find its inverse.

**Solution**:

We claim that $(S \circ T)^{-1} = T^{-1} \circ S^{-1}$ (note the reversed order!).

**Verification**:
$$(T^{-1} \circ S^{-1}) \circ (S \circ T) = T^{-1} \circ (S^{-1} \circ S) \circ T = T^{-1} \circ I \circ T = T^{-1} \circ T = I$$

$$(S \circ T) \circ (T^{-1} \circ S^{-1}) = S \circ (T \circ T^{-1}) \circ S^{-1} = S \circ I \circ S^{-1} = S \circ S^{-1} = I$$

Therefore, $(S \circ T)^{-1} = T^{-1} \circ S^{-1}$.

**Matrix version**: If $A$ and $B$ are invertible matrices, then $(BA)^{-1} = A^{-1}B^{-1}$.

## Applications

### Example 7: Encoding and Decoding

A message is encoded using the transformation $E: \mathbb{R}^2 \to \mathbb{R}^2$ with matrix:
$$A = \begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix}$$

The encoded message is $(7, 18)$. Decode the message.

**Solution**:

To decode, we need $E^{-1}$. First, check that $E$ is invertible:
$$\det(A) = 1(5) - 2(3) = 5 - 6 = -1 \neq 0$$ ✓

Find $A^{-1}$:
$$A^{-1} = \frac{1}{-1}\begin{bmatrix} 5 & -2 \\ -3 & 1 \end{bmatrix} = \begin{bmatrix} -5 & 2 \\ 3 & -1 \end{bmatrix}$$

Decode:
$$E^{-1}(7, 18) = \begin{bmatrix} -5 & 2 \\ 3 & -1 \end{bmatrix}\begin{bmatrix} 7 \\ 18 \end{bmatrix} = \begin{bmatrix} -35 + 36 \\ 21 - 18 \end{bmatrix} = \begin{bmatrix} 1 \\ 3 \end{bmatrix}$$

The original message is $(1, 3)$.

## Summary

Composition allows us to build complex transformations from simpler ones, with the matrix of the composition being the product of the individual matrices. Inverse transformations undo the action of a transformation, existing only when the transformation is an isomorphism. These operations are fundamental to understanding how transformations interact and combine, with important applications in computer graphics, cryptography, and differential equations.
