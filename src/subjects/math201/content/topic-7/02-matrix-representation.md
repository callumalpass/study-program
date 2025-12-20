# Matrix Representation of Linear Transformations

## Introduction

One of the most powerful results in linear algebra is that every linear transformation between finite-dimensional vector spaces can be represented by a matrix. This connection allows us to translate abstract questions about transformations into concrete matrix computations.

## The Standard Matrix

For a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$, there exists a unique $m \times n$ matrix $A$ such that:

$$T(\mathbf{x}) = A\mathbf{x}$$

for all $\mathbf{x} \in \mathbb{R}^n$. This matrix $A$ is called the **standard matrix** of $T$.

## Finding the Standard Matrix

The key insight is that a linear transformation is completely determined by its action on a basis. For $\mathbb{R}^n$, we typically use the standard basis:

$$\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{bmatrix}, \quad \ldots, \quad \mathbf{e}_n = \begin{bmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{bmatrix}$$

**Theorem**: If $T: \mathbb{R}^n \to \mathbb{R}^m$ is a linear transformation, then the standard matrix $A$ of $T$ is:

$$A = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & \cdots & T(\mathbf{e}_n) \end{bmatrix}$$

where each $T(\mathbf{e}_i)$ is written as a column vector.

**Proof**: Any vector $\mathbf{x} \in \mathbb{R}^n$ can be written as:

$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} = x_1\mathbf{e}_1 + x_2\mathbf{e}_2 + \cdots + x_n\mathbf{e}_n$$

By linearity:

$$T(\mathbf{x}) = T(x_1\mathbf{e}_1 + x_2\mathbf{e}_2 + \cdots + x_n\mathbf{e}_n)$$
$$= x_1T(\mathbf{e}_1) + x_2T(\mathbf{e}_2) + \cdots + x_nT(\mathbf{e}_n)$$
$$= \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & \cdots & T(\mathbf{e}_n) \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix} = A\mathbf{x}$$

## Examples

### Example 1: Basic Transformation

Find the standard matrix of $T: \mathbb{R}^2 \to \mathbb{R}^3$ defined by:

$$T(x, y) = (2x + y, x - 3y, 4x)$$

**Solution**:

First, find $T(\mathbf{e}_1)$ where $\mathbf{e}_1 = (1, 0)$:
$$T(1, 0) = (2(1) + 0, 1 - 3(0), 4(1)) = (2, 1, 4)$$

Next, find $T(\mathbf{e}_2)$ where $\mathbf{e}_2 = (0, 1)$:
$$T(0, 1) = (2(0) + 1, 0 - 3(1), 4(0)) = (1, -3, 0)$$

The standard matrix is:
$$A = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & -3 \\ 4 & 0 \end{bmatrix}$$

**Verification**: Check that $T(3, -2) = A\begin{bmatrix} 3 \\ -2 \end{bmatrix}$:

$$T(3, -2) = (2(3) + (-2), 3 - 3(-2), 4(3)) = (4, 9, 12)$$

$$A\begin{bmatrix} 3 \\ -2 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & -3 \\ 4 & 0 \end{bmatrix} \begin{bmatrix} 3 \\ -2 \end{bmatrix} = \begin{bmatrix} 6 - 2 \\ 3 + 6 \\ 12 \end{bmatrix} = \begin{bmatrix} 4 \\ 9 \\ 12 \end{bmatrix}$$ ✓

### Example 2: Projection onto a Line

Find the standard matrix for the projection onto the line $y = 2x$ in $\mathbb{R}^2$.

**Solution**:

The projection of a vector $\mathbf{v}$ onto a vector $\mathbf{u}$ is given by:
$$\text{proj}_{\mathbf{u}}(\mathbf{v}) = \frac{\mathbf{v} \cdot \mathbf{u}}{\mathbf{u} \cdot \mathbf{u}}\mathbf{u}$$

The line $y = 2x$ has direction vector $\mathbf{u} = (1, 2)$, with $\mathbf{u} \cdot \mathbf{u} = 1 + 4 = 5$.

For $\mathbf{e}_1 = (1, 0)$:
$$T(\mathbf{e}_1) = \frac{(1, 0) \cdot (1, 2)}{5}(1, 2) = \frac{1}{5}(1, 2) = \left(\frac{1}{5}, \frac{2}{5}\right)$$

For $\mathbf{e}_2 = (0, 1)$:
$$T(\mathbf{e}_2) = \frac{(0, 1) \cdot (1, 2)}{5}(1, 2) = \frac{2}{5}(1, 2) = \left(\frac{2}{5}, \frac{4}{5}\right)$$

The standard matrix is:
$$A = \begin{bmatrix} 1/5 & 2/5 \\ 2/5 & 4/5 \end{bmatrix} = \frac{1}{5}\begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$$

### Example 3: Rotation

Find the standard matrix for a counterclockwise rotation by angle $\theta$ in $\mathbb{R}^2$.

**Solution**:

We need to determine where the standard basis vectors land after rotation:

For $\mathbf{e}_1 = (1, 0)$:
- After rotating by $\theta$, this unit vector along the positive $x$-axis moves to $(\cos\theta, \sin\theta)$
- Thus $T(\mathbf{e}_1) = (\cos\theta, \sin\theta)$

For $\mathbf{e}_2 = (0, 1)$:
- This unit vector starts at angle $90°$ from the positive $x$-axis
- After rotating by $\theta$, it's at angle $90° + \theta$
- Thus $T(\mathbf{e}_2) = (\cos(90° + \theta), \sin(90° + \theta)) = (-\sin\theta, \cos\theta)$

The standard matrix is:
$$A = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

**Example**: For $\theta = 90°$:
$$A = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$$

Check: $T(1, 0) = (0, 1)$ and $T(0, 1) = (-1, 0)$. ✓

### Example 4: Given Matrix, Find the Transformation

Given the matrix $A = \begin{bmatrix} 3 & 0 \\ 0 & -2 \end{bmatrix}$, describe the linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $T(\mathbf{x}) = A\mathbf{x}$.

**Solution**:

$$T\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 3 & 0 \\ 0 & -2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 3x \\ -2y \end{bmatrix}$$

So $T(x, y) = (3x, -2y)$.

This transformation scales the $x$-coordinate by 3 and the $y$-coordinate by -2 (which includes a reflection across the $x$-axis).

## Matrix Representation in General Bases

For a linear transformation $T: V \to W$ where $V$ has basis $\mathcal{B} = \{\mathbf{v}_1, \ldots, \mathbf{v}_n\}$ and $W$ has basis $\mathcal{C} = \{\mathbf{w}_1, \ldots, \mathbf{w}_m\}$, the matrix representation is:

$$[T]_{\mathcal{B}}^{\mathcal{C}} = \begin{bmatrix} [T(\mathbf{v}_1)]_{\mathcal{C}} & [T(\mathbf{v}_2)]_{\mathcal{C}} & \cdots & [T(\mathbf{v}_n)]_{\mathcal{C}} \end{bmatrix}$$

where $[T(\mathbf{v}_i)]_{\mathcal{C}}$ denotes the coordinate vector of $T(\mathbf{v}_i)$ with respect to basis $\mathcal{C}$.

### Example 5: Non-Standard Basis

Let $T: P_2 \to P_1$ be defined by $T(p(t)) = p'(t)$ (differentiation). Find the matrix of $T$ with respect to the standard bases $\mathcal{B} = \{1, t, t^2\}$ for $P_2$ and $\mathcal{C} = \{1, t\}$ for $P_1$.

**Solution**:

Apply $T$ to each basis vector of $\mathcal{B}$:
- $T(1) = 0 = 0 \cdot 1 + 0 \cdot t$, so $[T(1)]_{\mathcal{C}} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$
- $T(t) = 1 = 1 \cdot 1 + 0 \cdot t$, so $[T(t)]_{\mathcal{C}} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$
- $T(t^2) = 2t = 0 \cdot 1 + 2 \cdot t$, so $[T(t^2)]_{\mathcal{C}} = \begin{bmatrix} 0 \\ 2 \end{bmatrix}$

The matrix is:
$$[T]_{\mathcal{B}}^{\mathcal{C}} = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}$$

**Verification**: For $p(t) = 3 + 5t - 2t^2$:
- Coordinate vector: $[p(t)]_{\mathcal{B}} = \begin{bmatrix} 3 \\ 5 \\ -2 \end{bmatrix}$
- $p'(t) = 5 - 4t$, so $[p'(t)]_{\mathcal{C}} = \begin{bmatrix} 5 \\ -4 \end{bmatrix}$
- Check: $[T]_{\mathcal{B}}^{\mathcal{C}}[p(t)]_{\mathcal{B}} = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}\begin{bmatrix} 3 \\ 5 \\ -2 \end{bmatrix} = \begin{bmatrix} 5 \\ -4 \end{bmatrix}$ ✓

## Key Properties

1. **Uniqueness**: The matrix representation of a linear transformation with respect to given bases is unique.

2. **Composition**: If $S: U \to V$ and $T: V \to W$ are linear transformations, then:
   $$[T \circ S] = [T][S]$$

3. **Identity**: The identity transformation $I: V \to V$ is represented by the identity matrix.

4. **Invertibility**: A linear transformation $T$ is invertible if and only if its matrix representation is invertible.

## Summary

The matrix representation of linear transformations provides a concrete computational framework for abstract linear maps. By computing the image of basis vectors, we can construct the standard matrix and then use matrix multiplication to evaluate the transformation on any vector. This fundamental connection between transformations and matrices is central to applied linear algebra.
