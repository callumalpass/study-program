---
id: math301-topic-1-1
title: "Introduction to Vectors"
order: 1
---

# Vectors in 2D and 3D

## Introduction

Vectors are fundamental mathematical objects that represent quantities possessing both magnitude and direction. Unlike scalars, which are characterized solely by their numerical value, vectors encode directional information, making them essential tools in physics, engineering, computer graphics, and numerous other fields. This introduction explores vectors in two-dimensional and three-dimensional Euclidean space, establishing the foundation for multivariable calculus.

## Vectors in Two Dimensions

### Geometric Representation

In the Cartesian plane, a vector can be visualized as an arrow extending from one point to another. The **initial point** (or tail) and **terminal point** (or head) define the vector's direction and length. A vector is typically denoted by a bold letter such as $\mathbf{v}$ or with an arrow notation $\vec{v}$.

The **position vector** from the origin to a point $P(x, y)$ is written in component form as:

$$\mathbf{v} = \langle x, y \rangle = x\mathbf{i} + y\mathbf{j}$$

where $\mathbf{i} = \langle 1, 0 \rangle$ and $\mathbf{j} = \langle 0, 1 \rangle$ are the standard unit vectors along the $x$ and $y$ axes, respectively.

### Vector Equality

Two vectors are equal if and only if their corresponding components are equal. Geometrically, equal vectors have the same magnitude and direction, regardless of their position in space. This property makes vectors **free vectors**—they can be translated parallel to themselves without changing their identity.

For vectors $\mathbf{u} = \langle u_1, u_2 \rangle$ and $\mathbf{v} = \langle v_1, v_2 \rangle$:

$$\mathbf{u} = \mathbf{v} \iff u_1 = v_1 \text{ and } u_2 = v_2$$

### Finding Components

Given two points $A(x_1, y_1)$ and $B(x_2, y_2)$, the vector from $A$ to $B$ is:

$$\overrightarrow{AB} = \langle x_2 - x_1, y_2 - y_1 \rangle$$

This represents the displacement from point $A$ to point $B$.

## Vectors in Three Dimensions

### Spatial Representation

Three-dimensional vectors extend the concept to space, requiring three components to specify position. The standard basis vectors in $\mathbb{R}^3$ are:

$$\mathbf{i} = \langle 1, 0, 0 \rangle, \quad \mathbf{j} = \langle 0, 1, 0 \rangle, \quad \mathbf{k} = \langle 0, 0, 1 \rangle$$

A general vector in three-dimensional space is written as:

$$\mathbf{v} = \langle x, y, z \rangle = x\mathbf{i} + y\mathbf{j} + z\mathbf{k}$$

The geometric interpretation involves the three-dimensional Cartesian coordinate system with mutually perpendicular axes.

### Displacement in Space

For points $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$ in three-dimensional space:

$$\overrightarrow{AB} = \langle x_2 - x_1, y_2 - y_1, z_2 - z_1 \rangle$$

## Magnitude of Vectors

### Definition

The **magnitude** (or **length** or **norm**) of a vector represents its size and is always a non-negative scalar. It is denoted by $|\mathbf{v}|$ or $\|\mathbf{v}\|$.

### Two-Dimensional Magnitude

For a vector $\mathbf{v} = \langle x, y \rangle$ in $\mathbb{R}^2$, the magnitude is computed using the Pythagorean theorem:

$$|\mathbf{v}| = \sqrt{x^2 + y^2}$$

This represents the Euclidean distance from the origin to the point $(x, y)$.

### Three-Dimensional Magnitude

For a vector $\mathbf{v} = \langle x, y, z \rangle$ in $\mathbb{R}^3$:

$$|\mathbf{v}| = \sqrt{x^2 + y^2 + z^2}$$

This can be derived by applying the Pythagorean theorem twice: first in the $xy$-plane to obtain $\sqrt{x^2 + y^2}$, then incorporating the $z$-component.

### Distance Between Points

The distance between two points $A$ and $B$ equals the magnitude of the displacement vector:

$$d(A, B) = |\overrightarrow{AB}|$$

For example, the distance between $A(1, 2, 3)$ and $B(4, 6, 8)$ is:

$$d(A, B) = \sqrt{(4-1)^2 + (6-2)^2 + (8-3)^2} = \sqrt{9 + 16 + 25} = \sqrt{50} = 5\sqrt{2}$$

## Unit Vectors

### Definition

A **unit vector** is a vector with magnitude equal to 1. Unit vectors are crucial for specifying direction independent of magnitude.

### Finding Unit Vectors

To obtain a unit vector in the direction of a non-zero vector $\mathbf{v}$, divide $\mathbf{v}$ by its magnitude:

$$\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|}$$

This process is called **normalization**.

### Verification

The unit vector $\mathbf{u}$ has magnitude 1:

$$|\mathbf{u}| = \left|\frac{\mathbf{v}}{|\mathbf{v}|}\right| = \frac{|\mathbf{v}|}{|\mathbf{v}|} = 1$$

### Example

Find the unit vector in the direction of $\mathbf{v} = \langle 3, -4 \rangle$.

First, compute the magnitude:

$$|\mathbf{v}| = \sqrt{3^2 + (-4)^2} = \sqrt{9 + 16} = 5$$

Then normalize:

$$\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|} = \frac{\langle 3, -4 \rangle}{5} = \left\langle \frac{3}{5}, -\frac{4}{5} \right\rangle$$

Verification: $|\mathbf{u}| = \sqrt{(3/5)^2 + (-4/5)^2} = \sqrt{9/25 + 16/25} = \sqrt{25/25} = 1$ ✓

### Standard Unit Vectors

The standard unit vectors $\mathbf{i}$, $\mathbf{j}$, and $\mathbf{k}$ point along the positive coordinate axes and form an **orthonormal basis** for $\mathbb{R}^2$ or $\mathbb{R}^3$. Any vector can be expressed as a linear combination of these basis vectors.

## Direction Angles and Direction Cosines

### Direction Angles

In three dimensions, a vector's direction can be specified by the angles it makes with the positive coordinate axes. For a vector $\mathbf{v} = \langle a, b, c \rangle$, the **direction angles** $\alpha$, $\beta$, and $\gamma$ are the angles between $\mathbf{v}$ and the positive $x$, $y$, and $z$ axes, respectively.

### Direction Cosines

The **direction cosines** are the cosines of the direction angles:

$$\cos \alpha = \frac{a}{|\mathbf{v}|}, \quad \cos \beta = \frac{b}{|\mathbf{v}|}, \quad \cos \gamma = \frac{c}{|\mathbf{v}|}$$

These satisfy the fundamental identity:

$$\cos^2 \alpha + \cos^2 \beta + \cos^2 \gamma = 1$$

The unit vector in the direction of $\mathbf{v}$ is:

$$\mathbf{u} = \langle \cos \alpha, \cos \beta, \cos \gamma \rangle$$

### Example

For $\mathbf{v} = \langle 1, 2, 2 \rangle$, we have $|\mathbf{v}| = \sqrt{1 + 4 + 4} = 3$.

The direction cosines are:

$$\cos \alpha = \frac{1}{3}, \quad \cos \beta = \frac{2}{3}, \quad \cos \gamma = \frac{2}{3}$$

Verification: $(1/3)^2 + (2/3)^2 + (2/3)^2 = 1/9 + 4/9 + 4/9 = 9/9 = 1$ ✓

## The Zero Vector

The **zero vector** $\mathbf{0} = \langle 0, 0 \rangle$ (in 2D) or $\mathbf{0} = \langle 0, 0, 0 \rangle$ (in 3D) has magnitude zero and no specific direction. It serves as the additive identity in vector spaces and represents the absence of displacement.

## Applications

Vectors appear throughout science and engineering:

- **Physics**: Displacement, velocity, acceleration, force, momentum
- **Computer Graphics**: Position, direction, normal vectors for lighting
- **Navigation**: Direction and distance traveled
- **Engineering**: Stress, strain, electric and magnetic fields

Understanding vectors in 2D and 3D provides the essential groundwork for exploring vector operations, calculus of vector-valued functions, and applications in multivariable analysis.

## Summary

Vectors are directed quantities characterized by magnitude and direction. In 2D and 3D, they are represented by ordered pairs or triples of real numbers. The magnitude of a vector is computed using the Euclidean norm, and unit vectors provide pure directional information. These foundational concepts enable the study of vector operations and their applications across mathematics, physics, and engineering.
