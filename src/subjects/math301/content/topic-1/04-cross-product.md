---
id: math301-topic-1-4
title: "The Cross Product"
order: 4
---

# Cross Product

## Introduction

The cross product (also called the vector product) is a binary operation on vectors in three-dimensional space that produces another vector. Unlike the dot product, which yields a scalar, the cross product yields a vector that is perpendicular to both input vectors. This operation is fundamental in physics and engineering for computing torques, angular momentum, magnetic forces, and surface normals. The cross product is defined only in three dimensions (and seven dimensions in abstract algebra), making it a distinctly spatial operation.

## Definition

### Algebraic Definition

For vectors $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$ and $\mathbf{v} = \langle v_1, v_2, v_3 \rangle$ in $\mathbb{R}^3$, the **cross product** is:

$$\mathbf{u} \times \mathbf{v} = \langle u_2v_3 - u_3v_2, u_3v_1 - u_1v_3, u_1v_2 - u_2v_1 \rangle$$

### Determinant Formula

The cross product can be expressed as a symbolic determinant:

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix}$$

Expanding along the first row:

$$\mathbf{u} \times \mathbf{v} = \mathbf{i}\begin{vmatrix} u_2 & u_3 \\ v_2 & v_3 \end{vmatrix} - \mathbf{j}\begin{vmatrix} u_1 & u_3 \\ v_1 & v_3 \end{vmatrix} + \mathbf{k}\begin{vmatrix} u_1 & u_2 \\ v_1 & v_2 \end{vmatrix}$$

$$= \mathbf{i}(u_2v_3 - u_3v_2) - \mathbf{j}(u_1v_3 - u_3v_1) + \mathbf{k}(u_1v_2 - u_2v_1)$$

### Example

Compute $\mathbf{u} \times \mathbf{v}$ for $\mathbf{u} = \langle 2, 1, -1 \rangle$ and $\mathbf{v} = \langle 3, 0, 1 \rangle$.

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & 1 & -1 \\ 3 & 0 & 1 \end{vmatrix}$$

$$= \mathbf{i}(1 \cdot 1 - (-1) \cdot 0) - \mathbf{j}(2 \cdot 1 - (-1) \cdot 3) + \mathbf{k}(2 \cdot 0 - 1 \cdot 3)$$

$$= \mathbf{i}(1) - \mathbf{j}(2 + 3) + \mathbf{k}(-3)$$

$$= \langle 1, -5, -3 \rangle$$

## Geometric Interpretation

### Direction: The Right-Hand Rule

The cross product $\mathbf{u} \times \mathbf{v}$ is perpendicular to both $\mathbf{u}$ and $\mathbf{v}$. Its direction is determined by the **right-hand rule**: point your fingers along $\mathbf{u}$, curl them toward $\mathbf{v}$, and your thumb points in the direction of $\mathbf{u} \times \mathbf{v}$.

This makes the cross product **anti-commutative**: reversing the order reverses the direction.

### Magnitude

The magnitude of the cross product is:

$$|\mathbf{u} \times \mathbf{v}| = |\mathbf{u}| |\mathbf{v}| \sin \theta$$

where $\theta$ is the angle between $\mathbf{u}$ and $\mathbf{v}$, with $0 \le \theta \le \pi$.

When $\mathbf{u}$ and $\mathbf{v}$ are parallel ($\theta = 0$ or $\pi$), $\sin \theta = 0$ and $\mathbf{u} \times \mathbf{v} = \mathbf{0}$.

When $\mathbf{u}$ and $\mathbf{v}$ are perpendicular ($\theta = \pi/2$), $\sin \theta = 1$ and $|\mathbf{u} \times \mathbf{v}| = |\mathbf{u}| |\mathbf{v}|$.

## Properties of the Cross Product

### Anti-commutativity

$$\mathbf{u} \times \mathbf{v} = -(\mathbf{v} \times \mathbf{u})$$

Reversing the order reverses the direction of the resulting vector.

### Scalar Multiplication

$$(c\mathbf{u}) \times \mathbf{v} = c(\mathbf{u} \times \mathbf{v}) = \mathbf{u} \times (c\mathbf{v})$$

Scalars can be factored out of the cross product.

### Distributivity

$$\mathbf{u} \times (\mathbf{v} + \mathbf{w}) = \mathbf{u} \times \mathbf{v} + \mathbf{u} \times \mathbf{w}$$

The cross product distributes over vector addition.

### Cross Product with Self

$$\mathbf{u} \times \mathbf{u} = \mathbf{0}$$

A vector's cross product with itself is the zero vector, since parallel vectors have zero cross product.

### Standard Unit Vectors

The cross products of standard unit vectors follow a cyclic pattern:

$$\mathbf{i} \times \mathbf{j} = \mathbf{k}, \quad \mathbf{j} \times \mathbf{k} = \mathbf{i}, \quad \mathbf{k} \times \mathbf{i} = \mathbf{j}$$

$$\mathbf{j} \times \mathbf{i} = -\mathbf{k}, \quad \mathbf{k} \times \mathbf{j} = -\mathbf{i}, \quad \mathbf{i} \times \mathbf{k} = -\mathbf{j}$$

### Non-associativity

Unlike multiplication of real numbers, the cross product is **not associative**:

$$\mathbf{u} \times (\mathbf{v} \times \mathbf{w}) \neq (\mathbf{u} \times \mathbf{v}) \times \mathbf{w}$$

in general.

## Orthogonality

The cross product $\mathbf{u} \times \mathbf{v}$ is orthogonal to both $\mathbf{u}$ and $\mathbf{v}$:

$$\mathbf{u} \cdot (\mathbf{u} \times \mathbf{v}) = 0$$
$$\mathbf{v} \cdot (\mathbf{u} \times \mathbf{v}) = 0$$

### Verification

For $\mathbf{u} = \langle 2, 1, -1 \rangle$, $\mathbf{v} = \langle 3, 0, 1 \rangle$, and $\mathbf{u} \times \mathbf{v} = \langle 1, -5, -3 \rangle$:

$$\mathbf{u} \cdot (\mathbf{u} \times \mathbf{v}) = 2(1) + 1(-5) + (-1)(-3) = 2 - 5 + 3 = 0$$ ✓

$$\mathbf{v} \cdot (\mathbf{u} \times \mathbf{v}) = 3(1) + 0(-5) + 1(-3) = 3 + 0 - 3 = 0$$ ✓

## Parallel Vectors

Two vectors are parallel if and only if their cross product is the zero vector:

$$\mathbf{u} \times \mathbf{v} = \mathbf{0} \iff \mathbf{u} \parallel \mathbf{v}$$

This occurs when $\sin \theta = 0$, i.e., when $\theta = 0$ or $\pi$.

### Example

Verify that $\mathbf{u} = \langle 2, -4, 6 \rangle$ and $\mathbf{v} = \langle -1, 2, -3 \rangle$ are parallel:

$$\mathbf{u} \times \mathbf{v} = \langle (-4)(-3) - (6)(2), (6)(-1) - (2)(-3), (2)(2) - (-4)(-1) \rangle$$

$$= \langle 12 - 12, -6 + 6, 4 - 4 \rangle = \langle 0, 0, 0 \rangle = \mathbf{0}$$

Indeed, $\mathbf{u} = -2\mathbf{v}$, confirming they are parallel.

## Area of a Parallelogram

The magnitude of the cross product gives the area of the parallelogram formed by $\mathbf{u}$ and $\mathbf{v}$:

$$\text{Area} = |\mathbf{u} \times \mathbf{v}| = |\mathbf{u}| |\mathbf{v}| \sin \theta$$

This follows from the formula for the area of a parallelogram: base times height. The base is $|\mathbf{u}|$, and the height is $|\mathbf{v}| \sin \theta$ (the perpendicular distance from $\mathbf{v}$ to the line along $\mathbf{u}$).

### Example

Find the area of the parallelogram determined by $\mathbf{u} = \langle 3, 2, 0 \rangle$ and $\mathbf{v} = \langle 1, 4, 0 \rangle$.

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 3 & 2 & 0 \\ 1 & 4 & 0 \end{vmatrix} = \mathbf{k}(3 \cdot 4 - 2 \cdot 1) = \langle 0, 0, 10 \rangle$$

$$\text{Area} = |\mathbf{u} \times \mathbf{v}| = 10$$

## Area of a Triangle

The area of the triangle with vertices at the origin and terminal points of $\mathbf{u}$ and $\mathbf{v}$ is half the area of the parallelogram:

$$\text{Area} = \frac{1}{2}|\mathbf{u} \times \mathbf{v}|$$

For a triangle with vertices $A$, $B$, and $C$, use:

$$\text{Area} = \frac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$$

### Example

Find the area of the triangle with vertices $A(1, 0, 0)$, $B(0, 1, 0)$, and $C(0, 0, 1)$.

$$\overrightarrow{AB} = \langle -1, 1, 0 \rangle, \quad \overrightarrow{AC} = \langle -1, 0, 1 \rangle$$

$$\overrightarrow{AB} \times \overrightarrow{AC} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{vmatrix} = \langle 1, 1, 1 \rangle$$

$$\text{Area} = \frac{1}{2}|\langle 1, 1, 1 \rangle| = \frac{1}{2}\sqrt{3} = \frac{\sqrt{3}}{2}$$

## Torque

In physics, torque (rotational force) is computed using the cross product. When a force $\mathbf{F}$ is applied at a position $\mathbf{r}$ relative to a pivot point, the torque is:

$$\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F}$$

The magnitude is:

$$|\boldsymbol{\tau}| = |\mathbf{r}| |\mathbf{F}| \sin \theta$$

where $\theta$ is the angle between $\mathbf{r}$ and $\mathbf{F}$. Only the perpendicular component of the force contributes to rotation.

### Example

A force $\mathbf{F} = \langle 0, 10, 0 \rangle$ N is applied at position $\mathbf{r} = \langle 2, 0, 0 \rangle$ m. Find the torque about the origin.

$$\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & 0 & 0 \\ 0 & 10 & 0 \end{vmatrix} = \langle 0, 0, 20 \rangle \text{ N·m}$$

The torque acts in the positive $z$-direction, causing counterclockwise rotation in the $xy$-plane.

## Triple Scalar Product

The **scalar triple product** combines dot and cross products:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})$$

This can be computed as a determinant:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix}$$

The absolute value gives the volume of the parallelepiped formed by the three vectors:

$$\text{Volume} = |\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})|$$

### Properties

The scalar triple product is invariant under cyclic permutations:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \mathbf{v} \cdot (\mathbf{w} \times \mathbf{u}) = \mathbf{w} \cdot (\mathbf{u} \times \mathbf{v})$$

Swapping any two vectors changes the sign:

$$\mathbf{v} \cdot (\mathbf{u} \times \mathbf{w}) = -\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})$$

## Finding Perpendicular Vectors

The cross product provides a method to find a vector perpendicular to two given vectors. This is useful in computer graphics for computing surface normals.

### Example

Find a unit vector perpendicular to both $\mathbf{u} = \langle 1, 1, 0 \rangle$ and $\mathbf{v} = \langle 0, 1, 1 \rangle$.

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{vmatrix} = \langle 1, -1, 1 \rangle$$

$$|\mathbf{u} \times \mathbf{v}| = \sqrt{1 + 1 + 1} = \sqrt{3}$$

Unit vector: $\mathbf{n} = \frac{1}{\sqrt{3}}\langle 1, -1, 1 \rangle$

(The opposite direction $-\mathbf{n}$ is also perpendicular.)

## Lagrange's Identity

For any vectors $\mathbf{u}$ and $\mathbf{v}$ in $\mathbb{R}^3$:

$$|\mathbf{u} \times \mathbf{v}|^2 = |\mathbf{u}|^2 |\mathbf{v}|^2 - (\mathbf{u} \cdot \mathbf{v})^2$$

This relates the cross product to the dot product and can be derived from the identity:

$$|\mathbf{u}|^2 |\mathbf{v}|^2 \sin^2 \theta = |\mathbf{u}|^2 |\mathbf{v}|^2 (1 - \cos^2 \theta) = |\mathbf{u}|^2 |\mathbf{v}|^2 - |\mathbf{u}|^2 |\mathbf{v}|^2 \cos^2 \theta$$

## Applications

### Physics

- Torque and angular momentum
- Lorentz force: $\mathbf{F} = q\mathbf{v} \times \mathbf{B}$ (charged particle in magnetic field)
- Rotational dynamics

### Computer Graphics

- Computing surface normals for lighting calculations
- Determining orientation (clockwise vs. counterclockwise)
- Collision detection

### Engineering

- Moments and couples in statics
- Angular velocity and acceleration
- Structural analysis

## Summary

The cross product is a vector operation unique to three dimensions that produces a vector perpendicular to both input vectors. Its magnitude equals the area of the parallelogram formed by the vectors and is given by $|\mathbf{u}| |\mathbf{v}| \sin \theta$. Unlike the dot product, the cross product is anti-commutative and non-associative. It is essential for computing torques, angular momentum, surface normals, and volumes. The cross product's geometric interpretation and computational utility make it indispensable in physics, engineering, and computer graphics.
