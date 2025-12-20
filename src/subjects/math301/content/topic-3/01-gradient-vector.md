---
id: math301-topic-3-1
title: "The Gradient Vector"
order: 1
---

# The Gradient Vector

## Introduction

The gradient vector is one of the most important concepts in multivariable calculus, providing a unified way to understand rates of change, directional derivatives, and optimization. While partial derivatives measure change along coordinate axes, the gradient synthesizes this information into a single vector that points in the direction of steepest ascent. The gradient appears throughout mathematics, physics, and engineering: in optimization algorithms, gradient descent in machine learning, force fields in physics, and geometric analysis of surfaces.

## Definition

### Gradient in Two Dimensions

For a function $f(x, y)$, the **gradient** of $f$ is the vector:

$$\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle = \langle f_x, f_y \rangle$$

The symbol $\nabla$ is called "nabla" or "del."

### Gradient in Three Dimensions

For $f(x, y, z)$:

$$\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right\rangle = \langle f_x, f_y, f_z \rangle$$

### General Definition

For $f(x_1, \ldots, x_n)$:

$$\nabla f = \left\langle \frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n} \right\rangle$$

## Examples

### Example 1: Polynomial

For $f(x, y) = x^2 + 3xy - y^2$:

$$\nabla f = \langle 2x + 3y, 3x - 2y \rangle$$

At $(1, 2)$:

$$\nabla f(1, 2) = \langle 2 + 6, 3 - 4 \rangle = \langle 8, -1 \rangle$$

### Example 2: Exponential

For $f(x, y) = e^{x^2 + y^2}$:

$$\nabla f = \langle 2xe^{x^2 + y^2}, 2ye^{x^2 + y^2} \rangle = 2e^{x^2 + y^2}\langle x, y \rangle$$

### Example 3: Three Variables

For $f(x, y, z) = xyz + z^2$:

$$\nabla f = \langle yz, xz, xy + 2z \rangle$$

At $(1, 2, 3)$:

$$\nabla f(1, 2, 3) = \langle 6, 3, 8 \rangle$$

### Example 4: Distance Function

For $f(x, y) = \sqrt{x^2 + y^2}$ (distance from origin):

$$\nabla f = \left\langle \frac{x}{\sqrt{x^2 + y^2}}, \frac{y}{\sqrt{x^2 + y^2}} \right\rangle = \frac{1}{\sqrt{x^2 + y^2}}\langle x, y \rangle$$

This is a unit vector pointing radially outward from the origin.

## Geometric Interpretation

### Direction of Steepest Ascent

The gradient $\nabla f$ at a point indicates the direction in which $f$ increases most rapidly. Moving in the direction of $\nabla f$ produces the maximum rate of increase of $f$.

### Magnitude

The magnitude $|\nabla f|$ equals the maximum rate of change of $f$ at that point.

### Example 5: Temperature

If $T(x, y)$ represents temperature, then $\nabla T$ points in the direction of fastest temperature increase, and $|\nabla T|$ is the rate of increase in that direction.

## Properties of the Gradient

### Linearity

$$\nabla(af + bg) = a\nabla f + b\nabla g$$

for constants $a, b$.

### Product Rule

$$\nabla(fg) = f\nabla g + g\nabla f$$

### Quotient Rule

$$\nabla\left(\frac{f}{g}\right) = \frac{g\nabla f - f\nabla g}{g^2}$$

### Chain Rule

If $h = g \circ f$, then:

$$\nabla h = g'(f) \nabla f$$

### Example 6

For $f(x, y) = e^{x^2 + y^2}$:

Let $g(u) = e^u$ and $u(x, y) = x^2 + y^2$.

$$\nabla u = \langle 2x, 2y \rangle$$

$$\nabla f = g'(u) \nabla u = e^u \langle 2x, 2y \rangle = e^{x^2 + y^2}\langle 2x, 2y \rangle$$

## Relationship to Level Curves and Surfaces

### Perpendicularity to Level Curves

The gradient $\nabla f$ at a point $(a, b)$ is **perpendicular** to the level curve $f(x, y) = c$ passing through $(a, b)$.

### Proof

A level curve $f(x, y) = c$ can be parametrized by $\mathbf{r}(t) = \langle x(t), y(t) \rangle$ where $f(x(t), y(t)) = c$ for all $t$.

Differentiating with respect to $t$:

$$\frac{d}{dt}[f(x(t), y(t))] = 0$$

By the chain rule:

$$f_x\frac{dx}{dt} + f_y\frac{dy}{dt} = 0$$

$$\nabla f \cdot \mathbf{r}'(t) = 0$$

Since $\mathbf{r}'(t)$ is tangent to the level curve and $\nabla f \cdot \mathbf{r}'(t) = 0$, the gradient is perpendicular to the tangent, hence perpendicular to the level curve.

### Level Surfaces

Similarly, $\nabla f(x, y, z)$ is perpendicular to the level surface $f(x, y, z) = c$.

### Example 7

For $f(x, y) = x^2 + y^2$, the level curves are circles $x^2 + y^2 = c$.

$$\nabla f = \langle 2x, 2y \rangle = 2\langle x, y \rangle$$

This vector points radially outward, perpendicular to the concentric circles.

## Gradient as a Normal Vector

Since $\nabla f$ is perpendicular to level curves/surfaces, it serves as a **normal vector** to these geometric objects.

### Tangent Plane to a Surface

For a surface defined implicitly by $F(x, y, z) = 0$, the normal vector at $(a, b, c)$ is:

$$\mathbf{n} = \nabla F(a, b, c) = \langle F_x, F_y, F_z \rangle$$

The tangent plane equation is:

$$F_x(a, b, c)(x - a) + F_y(a, b, c)(y - b) + F_z(a, b, c)(z - c) = 0$$

### Example 8

Find the tangent plane to the sphere $x^2 + y^2 + z^2 = 14$ at $(1, 2, 3)$.

Let $F(x, y, z) = x^2 + y^2 + z^2 - 14$.

$$\nabla F = \langle 2x, 2y, 2z \rangle$$

$$\nabla F(1, 2, 3) = \langle 2, 4, 6 \rangle$$

Tangent plane:

$$2(x - 1) + 4(y - 2) + 6(z - 3) = 0$$

$$2x + 4y + 6z = 2 + 8 + 18 = 28$$

$$x + 2y + 3z = 14$$

## Computing the Gradient

### Step-by-Step Process

1. Compute $\frac{\partial f}{\partial x}$
2. Compute $\frac{\partial f}{\partial y}$ (and $\frac{\partial f}{\partial z}$ if applicable)
3. Form the vector $\nabla f = \langle f_x, f_y \rangle$ or $\langle f_x, f_y, f_z \rangle$

### Example 9

For $f(x, y) = \sin(xy) + x^2$:

$$f_x = y\cos(xy) + 2x$$
$$f_y = x\cos(xy)$$

$$\nabla f = \langle y\cos(xy) + 2x, x\cos(xy) \rangle$$

## Gradient Field

Viewing $\nabla f$ as a function that assigns a vector to each point creates a **gradient field** or **gradient vector field**.

### Visualization

Gradient fields can be visualized by drawing arrows at various points. The arrows point uphill (in the direction of increasing $f$), and their lengths indicate the steepness.

### Example 10: Gravitational Potential

The gravitational potential near Earth's surface is $\phi(x, y, z) = -mgz$.

$$\nabla \phi = \langle 0, 0, -mg \rangle$$

The gravitational force is $\mathbf{F} = -\nabla \phi = \langle 0, 0, mg \rangle$, pointing downward.

## Conservative Vector Fields

A vector field $\mathbf{F}$ is **conservative** if it is the gradient of some scalar function $f$:

$$\mathbf{F} = \nabla f$$

The function $f$ is called a **potential function** for $\mathbf{F}$.

### Path Independence

For conservative fields, the line integral $\int_C \mathbf{F} \cdot d\mathbf{r}$ depends only on the endpoints of the path $C$, not on the specific path taken.

### Example 11

Is $\mathbf{F}(x, y) = \langle 2xy, x^2 + 1 \rangle$ conservative?

If $\mathbf{F} = \nabla f$, then:

$$f_x = 2xy \implies f = x^2y + g(y)$$

$$f_y = x^2 + g'(y) = x^2 + 1 \implies g'(y) = 1 \implies g(y) = y + C$$

Thus $f(x, y) = x^2y + y + C$ is a potential function, and $\mathbf{F}$ is conservative.

## Applications

### Optimization

In optimization, we seek points where $\nabla f = \mathbf{0}$ (critical points). These are candidates for local maxima, minima, or saddle points.

### Machine Learning

Gradient descent algorithms minimize loss functions by iteratively moving in the direction of $-\nabla f$ (steepest descent).

### Physics

- Electric field: $\mathbf{E} = -\nabla V$ (where $V$ is electric potential)
- Gravitational field: $\mathbf{g} = -\nabla \phi$
- Temperature gradient drives heat flow

### Engineering

- Stress analysis: gradient of scalar fields
- Fluid dynamics: pressure gradients drive flow

## Gradient in Different Coordinate Systems

### Polar Coordinates

In polar coordinates $(r, \theta)$:

$$\nabla f = \frac{\partial f}{\partial r}\mathbf{e}_r + \frac{1}{r}\frac{\partial f}{\partial \theta}\mathbf{e}_\theta$$

where $\mathbf{e}_r$ and $\mathbf{e}_\theta$ are unit vectors in the radial and angular directions.

### Cylindrical Coordinates

In cylindrical $(r, \theta, z)$:

$$\nabla f = \frac{\partial f}{\partial r}\mathbf{e}_r + \frac{1}{r}\frac{\partial f}{\partial \theta}\mathbf{e}_\theta + \frac{\partial f}{\partial z}\mathbf{e}_z$$

### Spherical Coordinates

In spherical $(\rho, \theta, \phi)$:

$$\nabla f = \frac{\partial f}{\partial \rho}\mathbf{e}_\rho + \frac{1}{\rho}\frac{\partial f}{\partial \theta}\mathbf{e}_\theta + \frac{1}{\rho\sin\theta}\frac{\partial f}{\partial \phi}\mathbf{e}_\phi$$

## Summary

The gradient $\nabla f = \langle f_x, f_y, f_z \rangle$ is a vector that points in the direction of steepest ascent of the function $f$. Its magnitude equals the maximum rate of change. The gradient is perpendicular to level curves (in 2D) and level surfaces (in 3D), making it a natural normal vector. Gradient vectors satisfy algebraic properties including linearity and product rules. The gradient is fundamental to optimization (finding critical points), directional derivatives, and applications in physics (force fields, heat flow, electric fields). Conservative vector fields are gradients of potential functions, exhibiting path-independent line integrals. Understanding the gradient is essential for advanced topics in multivariable calculus and its applications.
