---
id: math301-topic-1-3
title: "The Dot Product"
order: 3
---

# Dot Product

## Introduction

The dot product (also called the scalar product or inner product) is a fundamental operation that combines two vectors to produce a scalar quantity. Unlike vector addition and scalar multiplication, which yield vectors, the dot product yields a real number. This operation encodes geometric information about angles and projections, making it indispensable in physics, engineering, and computer graphics. The dot product provides a way to measure how much two vectors "align" with each other.

## Definition

### Algebraic Definition

For vectors $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$ and $\mathbf{v} = \langle v_1, v_2, v_3 \rangle$ in $\mathbb{R}^3$, the **dot product** is:

$$\mathbf{u} \cdot \mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3$$

The definition extends naturally to vectors in $\mathbb{R}^2$ or $\mathbb{R}^n$.

### Example

For $\mathbf{u} = \langle 2, -3, 1 \rangle$ and $\mathbf{v} = \langle 4, 0, -2 \rangle$:

$$\mathbf{u} \cdot \mathbf{v} = (2)(4) + (-3)(0) + (1)(-2) = 8 + 0 - 2 = 6$$

### Geometric Definition

The dot product can also be expressed geometrically:

$$\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}| |\mathbf{v}| \cos \theta$$

where $\theta$ is the angle between the vectors when they are placed tail-to-tail, with $0 \le \theta \le \pi$.

This geometric interpretation reveals that the dot product measures the extent to which two vectors point in the same direction.

## Properties of the Dot Product

The dot product satisfies several algebraic properties:

1. **Commutativity**: $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$

2. **Distributivity**: $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = \mathbf{u} \cdot \mathbf{v} + \mathbf{u} \cdot \mathbf{w}$

3. **Scalar Multiplication**: $(c\mathbf{u}) \cdot \mathbf{v} = c(\mathbf{u} \cdot \mathbf{v}) = \mathbf{u} \cdot (c\mathbf{v})$

4. **Positive Definiteness**: $\mathbf{v} \cdot \mathbf{v} = |\mathbf{v}|^2 \ge 0$, with equality if and only if $\mathbf{v} = \mathbf{0}$

These properties make the dot product a **bilinear form** on the vector space.

### Proof of Property 4

$$\mathbf{v} \cdot \mathbf{v} = v_1^2 + v_2^2 + v_3^2 = |\mathbf{v}|^2$$

This provides an alternative way to compute magnitude:

$$|\mathbf{v}| = \sqrt{\mathbf{v} \cdot \mathbf{v}}$$

## Angle Between Vectors

### Formula

Rearranging the geometric definition gives the angle between two non-zero vectors:

$$\cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}| |\mathbf{v}|}$$

$$\theta = \arccos\left(\frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}| |\mathbf{v}|}\right)$$

### Example

Find the angle between $\mathbf{u} = \langle 1, 2, 2 \rangle$ and $\mathbf{v} = \langle 2, 1, -2 \rangle$.

First, compute the dot product:

$$\mathbf{u} \cdot \mathbf{v} = (1)(2) + (2)(1) + (2)(-2) = 2 + 2 - 4 = 0$$

Next, find the magnitudes:

$$|\mathbf{u}| = \sqrt{1 + 4 + 4} = 3$$
$$|\mathbf{v}| = \sqrt{4 + 1 + 4} = 3$$

Therefore:

$$\cos \theta = \frac{0}{3 \cdot 3} = 0$$

$$\theta = \arccos(0) = \frac{\pi}{2} = 90°$$

The vectors are perpendicular.

## Orthogonality

### Definition

Two vectors $\mathbf{u}$ and $\mathbf{v}$ are **orthogonal** (perpendicular) if and only if:

$$\mathbf{u} \cdot \mathbf{v} = 0$$

This follows immediately from the geometric definition: when $\theta = \pi/2$, $\cos \theta = 0$.

### Standard Basis Vectors

The standard unit vectors are mutually orthogonal:

$$\mathbf{i} \cdot \mathbf{j} = 0, \quad \mathbf{j} \cdot \mathbf{k} = 0, \quad \mathbf{k} \cdot \mathbf{i} = 0$$

and each has magnitude 1:

$$\mathbf{i} \cdot \mathbf{i} = \mathbf{j} \cdot \mathbf{j} = \mathbf{k} \cdot \mathbf{k} = 1$$

This makes $\{\mathbf{i}, \mathbf{j}, \mathbf{k}\}$ an **orthonormal basis**.

### Example

Verify that $\mathbf{u} = \langle 2, -1, 3 \rangle$ and $\mathbf{v} = \langle 1, 5, 1 \rangle$ are orthogonal:

$$\mathbf{u} \cdot \mathbf{v} = 2 + (-5) + 3 = 0$$ ✓

## Direction Angles and Direction Cosines

The dot product provides an elegant way to compute direction cosines. For a vector $\mathbf{v} = \langle a, b, c \rangle$:

$$\cos \alpha = \frac{\mathbf{v} \cdot \mathbf{i}}{|\mathbf{v}|} = \frac{a}{|\mathbf{v}|}$$

$$\cos \beta = \frac{\mathbf{v} \cdot \mathbf{j}}{|\mathbf{v}|} = \frac{b}{|\mathbf{v}|}$$

$$\cos \gamma = \frac{\mathbf{v} \cdot \mathbf{k}}{|\mathbf{v}|} = \frac{c}{|\mathbf{v}|}$$

These represent the angles $\mathbf{v}$ makes with the coordinate axes.

## Vector Projections

### Scalar Projection

The **scalar projection** (or **component**) of $\mathbf{v}$ onto $\mathbf{u}$ is the signed length of the projection of $\mathbf{v}$ in the direction of $\mathbf{u}$:

$$\text{comp}_{\mathbf{u}} \mathbf{v} = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}|} = |\mathbf{v}| \cos \theta$$

When $\theta < \pi/2$, the projection is positive; when $\theta > \pi/2$, it's negative.

### Vector Projection

The **vector projection** of $\mathbf{v}$ onto $\mathbf{u}$ is the vector in the direction of $\mathbf{u}$ with length equal to the scalar projection:

$$\text{proj}_{\mathbf{u}} \mathbf{v} = \left(\frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}|}\right) \frac{\mathbf{u}}{|\mathbf{u}|} = \frac{\mathbf{u} \cdot \mathbf{v}}{|\mathbf{u}|^2} \mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} \mathbf{u}$$

The vector projection lies along the line defined by $\mathbf{u}$.

### Example

Find the scalar and vector projections of $\mathbf{v} = \langle 3, 4 \rangle$ onto $\mathbf{u} = \langle 1, 0 \rangle$.

Scalar projection:

$$\text{comp}_{\mathbf{u}} \mathbf{v} = \frac{(1)(3) + (0)(4)}{1} = 3$$

Vector projection:

$$\text{proj}_{\mathbf{u}} \mathbf{v} = \frac{3}{1} \langle 1, 0 \rangle = \langle 3, 0 \rangle$$

This is simply the $x$-component of $\mathbf{v}$.

### Orthogonal Decomposition

Any vector $\mathbf{v}$ can be decomposed into components parallel and perpendicular to another vector $\mathbf{u}$:

$$\mathbf{v} = \text{proj}_{\mathbf{u}} \mathbf{v} + \mathbf{v}_{\perp}$$

where the **orthogonal component** is:

$$\mathbf{v}_{\perp} = \mathbf{v} - \text{proj}_{\mathbf{u}} \mathbf{v}$$

These two components are orthogonal:

$$\text{proj}_{\mathbf{u}} \mathbf{v} \cdot \mathbf{v}_{\perp} = 0$$

### Example

Decompose $\mathbf{v} = \langle 5, 1 \rangle$ into components parallel and perpendicular to $\mathbf{u} = \langle 2, 1 \rangle$.

First, find the projection:

$$\text{proj}_{\mathbf{u}} \mathbf{v} = \frac{10 + 1}{4 + 1} \langle 2, 1 \rangle = \frac{11}{5} \langle 2, 1 \rangle = \left\langle \frac{22}{5}, \frac{11}{5} \right\rangle$$

Then the orthogonal component:

$$\mathbf{v}_{\perp} = \langle 5, 1 \rangle - \left\langle \frac{22}{5}, \frac{11}{5} \right\rangle = \left\langle \frac{3}{5}, -\frac{6}{5} \right\rangle$$

Verify orthogonality:

$$\left\langle \frac{22}{5}, \frac{11}{5} \right\rangle \cdot \left\langle \frac{3}{5}, -\frac{6}{5} \right\rangle = \frac{66}{25} - \frac{66}{25} = 0$$ ✓

## Work as a Dot Product

In physics, when a constant force $\mathbf{F}$ acts on an object as it moves along a displacement $\mathbf{d}$, the work done is:

$$W = \mathbf{F} \cdot \mathbf{d} = |\mathbf{F}| |\mathbf{d}| \cos \theta$$

Only the component of force in the direction of motion does work. If the force is perpendicular to the displacement ($\theta = \pi/2$), no work is done.

### Example

A force $\mathbf{F} = \langle 10, 5, 0 \rangle$ N acts on an object moving from $A(0, 0, 0)$ to $B(3, 4, 0)$ m. Find the work done.

Displacement: $\mathbf{d} = \langle 3, 4, 0 \rangle$

Work: $W = \mathbf{F} \cdot \mathbf{d} = 30 + 20 + 0 = 50$ J

## Cauchy-Schwarz Inequality

The dot product satisfies the fundamental inequality:

$$|\mathbf{u} \cdot \mathbf{v}| \le |\mathbf{u}| |\mathbf{v}|$$

with equality if and only if $\mathbf{u}$ and $\mathbf{v}$ are parallel.

This follows from the geometric definition since $|\cos \theta| \le 1$.

### Triangle Inequality

The Cauchy-Schwarz inequality implies the triangle inequality:

$$|\mathbf{u} + \mathbf{v}| \le |\mathbf{u}| + |\mathbf{v}|$$

This states that the length of one side of a triangle cannot exceed the sum of the lengths of the other two sides.

## Applications

### Computer Graphics

The dot product is used to:
- Compute lighting (angle between surface normal and light direction)
- Determine if surfaces face toward or away from the camera
- Project 3D points onto 2D screens

### Machine Learning

The dot product measures similarity between vectors, forming the basis for:
- Cosine similarity metrics
- Neural network computations
- Recommendation systems

### Physics and Engineering

Applications include:
- Calculating work and energy
- Decomposing forces into components
- Finding angles between planes (using normal vectors)

## Summary

The dot product is a bilinear operation that maps two vectors to a scalar, encoding geometric information about angles and projections. It provides a way to compute angles between vectors, test for orthogonality, and decompose vectors into parallel and perpendicular components. The scalar and vector projections derived from the dot product are essential tools in physics, engineering, and computer graphics. The geometric interpretation $\mathbf{u} \cdot \mathbf{v} = |\mathbf{u}| |\mathbf{v}| \cos \theta$ connects algebraic computation with geometric intuition, making the dot product one of the most important operations in vector calculus.
