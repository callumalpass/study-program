---
id: math301-topic-3-3
title: "Tangent Planes"
order: 3
---

# Tangent Planes and Normal Lines

## Introduction

Tangent planes generalize the concept of tangent lines from single-variable calculus to surfaces in three-dimensional space. Just as a tangent line locally approximates a curve, a tangent plane locally approximates a surface. The tangent plane at a point on a surface provides the best linear approximation to the surface near that point and is essential for understanding differentiability, linear approximation, and the geometry of surfaces. Normal lines, perpendicular to tangent planes, describe directions of steepest change and surface orientation.

## Tangent Plane to a Graph

### Surface as a Graph

For a surface given explicitly as $z = f(x, y)$, the tangent plane at point $(a, b, f(a, b))$ has equation:

$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

This is the linear approximation to $f$ at $(a, b)$.

### Derivation

The plane passing through $(a, b, f(a, b))$ with normal vector $\mathbf{n} = \langle A, B, C \rangle$ has equation:

$$A(x - a) + B(y - b) + C(z - f(a, b)) = 0$$

For the tangent plane to the surface $z = f(x, y)$:
- The plane must contain the tangent line in the $x$-direction (slope $f_x$)
- The plane must contain the tangent line in the $y$-direction (slope $f_y$)

The normal vector is $\mathbf{n} = \langle -f_x, -f_y, 1 \rangle$ or equivalently $\langle f_x, f_y, -1 \rangle$.

Using $\mathbf{n} = \langle -f_x(a,b), -f_y(a,b), 1 \rangle$:

$$-f_x(a,b)(x - a) - f_y(a,b)(y - b) + (z - f(a,b)) = 0$$

$$z = f(a,b) + f_x(a,b)(x - a) + f_y(a,b)(y - b)$$

### Example 1

Find the tangent plane to $z = x^2 + y^2$ at $(1, 2, 5)$.

$$f_x = 2x, \quad f_y = 2y$$

$$f_x(1, 2) = 2, \quad f_y(1, 2) = 4$$

Tangent plane:

$$z = 5 + 2(x - 1) + 4(y - 2)$$

$$z = 5 + 2x - 2 + 4y - 8$$

$$z = 2x + 4y - 5$$

### Example 2

Find the tangent plane to $z = e^{x}\sin(y)$ at $(0, \pi/2, 1)$.

$$f_x = e^x\sin(y), \quad f_y = e^x\cos(y)$$

$$f_x(0, \pi/2) = 1, \quad f_y(0, \pi/2) = 0$$

Tangent plane:

$$z = 1 + 1(x - 0) + 0(y - \pi/2) = 1 + x$$

## Tangent Plane to an Implicit Surface

### Implicit Form

For a surface given implicitly by $F(x, y, z) = 0$, the tangent plane at $(a, b, c)$ is:

$$F_x(a, b, c)(x - a) + F_y(a, b, c)(y - b) + F_z(a, b, c)(z - c) = 0$$

The normal vector is $\mathbf{n} = \nabla F(a, b, c) = \langle F_x, F_y, F_z \rangle$.

### Derivation

The gradient $\nabla F$ is perpendicular to the level surface $F(x, y, z) = 0$, so it serves as the normal vector to the tangent plane.

### Example 3

Find the tangent plane to the sphere $x^2 + y^2 + z^2 = 14$ at $(1, 2, 3)$.

Let $F(x, y, z) = x^2 + y^2 + z^2 - 14$.

$$\nabla F = \langle 2x, 2y, 2z \rangle$$

$$\nabla F(1, 2, 3) = \langle 2, 4, 6 \rangle$$

Tangent plane:

$$2(x - 1) + 4(y - 2) + 6(z - 3) = 0$$

$$2x + 4y + 6z = 2 + 8 + 18 = 28$$

$$x + 2y + 3z = 14$$

### Example 4

Find the tangent plane to $x^2 - y^2 + z^2 = 4$ at $(2, 1, 1)$.

$$F(x, y, z) = x^2 - y^2 + z^2 - 4$$

$$\nabla F = \langle 2x, -2y, 2z \rangle$$

$$\nabla F(2, 1, 1) = \langle 4, -2, 2 \rangle$$

Tangent plane:

$$4(x - 2) - 2(y - 1) + 2(z - 1) = 0$$

$$4x - 2y + 2z = 8 - 2 + 2 = 8$$

$$2x - y + z = 4$$

## Normal Line

### Definition

The **normal line** to a surface at a point is the line perpendicular to the tangent plane at that point.

### For a Graph $z = f(x, y)$

The normal line at $(a, b, f(a, b))$ has direction vector:

$$\mathbf{n} = \langle -f_x(a, b), -f_y(a, b), 1 \rangle$$

or equivalently $\langle f_x(a, b), f_y(a, b), -1 \rangle$.

Parametric equations:

$$x = a - f_x(a, b)t$$
$$y = b - f_y(a, b)t$$
$$z = f(a, b) + t$$

### For an Implicit Surface $F(x, y, z) = 0$

The normal line at $(a, b, c)$ has direction vector $\nabla F(a, b, c)$.

Parametric equations:

$$x = a + F_x(a, b, c)t$$
$$y = b + F_y(a, b, c)t$$
$$z = c + F_z(a, b, c)t$$

### Example 5

Find the normal line to $z = x^2 + y^2$ at $(1, 2, 5)$.

From Example 1, the normal vector is $\langle -2, -4, 1 \rangle$ or $\langle 2, 4, -1 \rangle$.

Using $\langle 2, 4, -1 \rangle$:

$$x = 1 + 2t, \quad y = 2 + 4t, \quad z = 5 - t$$

### Example 6

Find the normal line to $x^2 + y^2 + z^2 = 14$ at $(1, 2, 3)$.

From Example 3, $\nabla F(1, 2, 3) = \langle 2, 4, 6 \rangle$ or simplified $\langle 1, 2, 3 \rangle$.

$$x = 1 + t, \quad y = 2 + 2t, \quad z = 3 + 3t$$

Interestingly, this line passes through the origin (at $t = -1$), which makes sense because for a sphere centered at the origin, the normal line is the radial line.

## Linear Approximation

The tangent plane provides the best linear approximation to a surface near a point:

$$f(x, y) \approx L(x, y) = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

This is the **linearization** of $f$ at $(a, b)$.

### Example 7

Use the tangent plane to approximate $f(1.1, 1.9)$ for $f(x, y) = \sqrt{x^2 + y^2}$ near $(1, 2)$.

$$f(1, 2) = \sqrt{1 + 4} = \sqrt{5}$$

$$f_x = \frac{x}{\sqrt{x^2 + y^2}}, \quad f_y = \frac{y}{\sqrt{x^2 + y^2}}$$

$$f_x(1, 2) = \frac{1}{\sqrt{5}}, \quad f_y(1, 2) = \frac{2}{\sqrt{5}}$$

Linear approximation:

$$L(x, y) = \sqrt{5} + \frac{1}{\sqrt{5}}(x - 1) + \frac{2}{\sqrt{5}}(y - 2)$$

$$L(1.1, 1.9) = \sqrt{5} + \frac{0.1}{\sqrt{5}} + \frac{-0.2}{\sqrt{5}} = \sqrt{5} - \frac{0.1}{\sqrt{5}}$$

$$\approx 2.236 - 0.045 = 2.191$$

Actual: $f(1.1, 1.9) = \sqrt{1.21 + 3.61} = \sqrt{4.82} \approx 2.195$

The approximation is quite close.

## Horizontal Tangent Planes

A tangent plane is **horizontal** when its normal vector is vertical, i.e., $\langle f_x, f_y, -1 \rangle$ is parallel to $\langle 0, 0, 1 \rangle$.

This occurs when $f_x = 0$ and $f_y = 0$, i.e., at **critical points** of $f$.

### Example 8

Find points on $z = x^2 + y^2 - 4x - 2y + 5$ where the tangent plane is horizontal.

$$f_x = 2x - 4 = 0 \implies x = 2$$
$$f_y = 2y - 2 = 0 \implies y = 1$$

At $(2, 1)$:

$$z = 4 + 1 - 8 - 2 + 5 = 0$$

The tangent plane at $(2, 1, 0)$ is $z = 0$ (the $xy$-plane).

## Applications

### Computer Graphics

Tangent planes and normal vectors are used for lighting calculations, determining how surfaces reflect light.

### Differential Geometry

Tangent planes define the local linear structure of smooth surfaces, essential for curvature analysis.

### Physics

Normal vectors represent surface orientations in flux calculations, boundary conditions, and collision detection.

## Summary

The tangent plane to a surface $z = f(x, y)$ at $(a, b, f(a, b))$ is $z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$, providing the best linear approximation to the surface. For implicit surfaces $F(x, y, z) = 0$, the tangent plane uses the gradient as the normal vector. The normal line is perpendicular to the tangent plane and has direction $\nabla F$ or $\langle -f_x, -f_y, 1 \rangle$. Tangent planes are fundamental for linear approximation, differential geometry, computer graphics, and physics applications involving surfaces.
