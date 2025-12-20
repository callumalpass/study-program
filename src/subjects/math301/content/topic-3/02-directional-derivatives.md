# Directional Derivatives

## Introduction

While partial derivatives measure the rate of change of a function along coordinate axes, **directional derivatives** measure the rate of change in any specified direction. This generalization is crucial for understanding how functions change in arbitrary directions, analyzing optimization problems, and studying gradient descent algorithms. The directional derivative connects intimately with the gradient vector, providing both computational efficiency and geometric insight.

## Definition

### Directional Derivative

The **directional derivative** of $f$ at point $(a, b)$ in the direction of a unit vector $\mathbf{u} = \langle u_1, u_2 \rangle$ is:

$$D_{\mathbf{u}} f(a, b) = \lim_{h \to 0} \frac{f(a + hu_1, b + hu_2) - f(a, b)}{h}$$

This measures the instantaneous rate of change of $f$ as we move from $(a, b)$ in the direction $\mathbf{u}$.

### Requirement: Unit Vector

The direction vector $\mathbf{u}$ must be a **unit vector** ($|\mathbf{u}| = 1$) for the standard definition. If given a non-unit direction $\mathbf{v}$, normalize it first:

$$\mathbf{u} = \frac{\mathbf{v}}{|\mathbf{v}|}$$

## Computing Directional Derivatives

### Theorem: Gradient Formula

If $f$ is differentiable at $(a, b)$ and $\mathbf{u}$ is a unit vector, then:

$$D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}$$

This formula reduces directional derivative computation to a dot product.

### Proof Sketch

Consider the path $\mathbf{r}(t) = \langle a, b \rangle + t\mathbf{u}$ through $(a, b)$ in direction $\mathbf{u}$.

The rate of change of $f$ along this path is:

$$\frac{d}{dt}f(\mathbf{r}(t)) = \nabla f \cdot \mathbf{r}'(t) = \nabla f \cdot \mathbf{u}$$

At $t = 0$, this equals $D_{\mathbf{u}} f$.

### Example 1

For $f(x, y) = x^2 + 2xy - y^2$, find the directional derivative at $(1, 2)$ in the direction of $\mathbf{v} = \langle 3, 4 \rangle$.

First, normalize $\mathbf{v}$:

$$|\mathbf{v}| = \sqrt{9 + 16} = 5$$

$$\mathbf{u} = \frac{1}{5}\langle 3, 4 \rangle = \left\langle \frac{3}{5}, \frac{4}{5} \right\rangle$$

Compute the gradient:

$$\nabla f = \langle 2x + 2y, 2x - 2y \rangle$$

$$\nabla f(1, 2) = \langle 6, -2 \rangle$$

Directional derivative:

$$D_{\mathbf{u}} f(1, 2) = \langle 6, -2 \rangle \cdot \left\langle \frac{3}{5}, \frac{4}{5} \right\rangle = \frac{18}{5} - \frac{8}{5} = \frac{10}{5} = 2$$

### Example 2

For $f(x, y) = e^{xy}$, find $D_{\mathbf{u}} f(0, 1)$ where $\mathbf{u} = \langle 1/\sqrt{2}, 1/\sqrt{2} \rangle$.

$$\nabla f = \langle ye^{xy}, xe^{xy} \rangle$$

$$\nabla f(0, 1) = \langle 1, 0 \rangle$$

$$D_{\mathbf{u}} f(0, 1) = \langle 1, 0 \rangle \cdot \left\langle \frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}} \right\rangle = \frac{1}{\sqrt{2}}$$

## Partial Derivatives as Special Cases

Partial derivatives are directional derivatives along coordinate axes:

$$\frac{\partial f}{\partial x} = D_{\mathbf{i}} f, \quad \frac{\partial f}{\partial y} = D_{\mathbf{j}} f$$

where $\mathbf{i} = \langle 1, 0 \rangle$ and $\mathbf{j} = \langle 0, 1 \rangle$.

## Maximum and Minimum Rates of Change

### Theorem

The directional derivative $D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u} = |\nabla f||\mathbf{u}|\cos\theta = |\nabla f|\cos\theta$ (since $|\mathbf{u}| = 1$), where $\theta$ is the angle between $\nabla f$ and $\mathbf{u}$.

**Maximum rate**: When $\theta = 0$ (i.e., $\mathbf{u}$ points in the direction of $\nabla f$):

$$D_{\mathbf{u}} f = |\nabla f|$$

**Minimum rate**: When $\theta = \pi$ (i.e., $\mathbf{u}$ points opposite to $\nabla f$):

$$D_{\mathbf{u}} f = -|\nabla f|$$

**Zero rate**: When $\theta = \pi/2$ ($\mathbf{u}$ perpendicular to $\nabla f$):

$$D_{\mathbf{u}} f = 0$$

### Interpretation

- $\nabla f$ points in the direction of **steepest ascent**
- $-\nabla f$ points in the direction of **steepest descent**
- Directions perpendicular to $\nabla f$ are directions of **no change** (tangent to level curves)

### Example 3

For $f(x, y) = 9 - x^2 - y^2$ at $(1, 2)$:

$$\nabla f = \langle -2x, -2y \rangle$$

$$\nabla f(1, 2) = \langle -2, -4 \rangle$$

$$|\nabla f(1, 2)| = \sqrt{4 + 16} = \sqrt{20} = 2\sqrt{5}$$

Direction of maximum increase: $\mathbf{u} = \frac{\langle -2, -4 \rangle}{2\sqrt{5}} = \left\langle \frac{-1}{\sqrt{5}}, \frac{-2}{\sqrt{5}} \right\rangle$

Maximum rate of increase: $2\sqrt{5}$

Direction of maximum decrease: opposite direction

## Three Dimensions

For $f(x, y, z)$ and unit vector $\mathbf{u} = \langle u_1, u_2, u_3 \rangle$:

$$D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u} = f_x u_1 + f_y u_2 + f_z u_3$$

### Example 4

For $f(x, y, z) = xy + yz + xz$ at $(1, 1, 1)$ in direction $\mathbf{v} = \langle 2, -1, 2 \rangle$:

Normalize: $|\mathbf{v}| = 3$, so $\mathbf{u} = \langle 2/3, -1/3, 2/3 \rangle$

$$\nabla f = \langle y + z, x + z, y + x \rangle$$

$$\nabla f(1, 1, 1) = \langle 2, 2, 2 \rangle$$

$$D_{\mathbf{u}} f = \langle 2, 2, 2 \rangle \cdot \langle 2/3, -1/3, 2/3 \rangle = \frac{4}{3} - \frac{2}{3} + \frac{4}{3} = 2$$

## Geometric Interpretation

The directional derivative $D_{\mathbf{u}} f(a, b)$ is the slope of the surface $z = f(x, y)$ in the direction $\mathbf{u}$ at the point $(a, b, f(a, b))$.

Imagine standing on the surface at $(a, b, f(a, b))$ and facing direction $\mathbf{u}$. The directional derivative measures how steeply the surface rises or falls in that direction.

## Applications

### Gradient Descent

Optimization algorithms move in the direction of $-\nabla f$ (steepest descent) to minimize $f$. Each step is:

$$\mathbf{x}_{n+1} = \mathbf{x}_n - \alpha \nabla f(\mathbf{x}_n)$$

where $\alpha$ is the learning rate.

### Heat Flow

Heat flows in the direction of $-\nabla T$ (from hot to cold), where $T$ is temperature. The heat flux is proportional to $-\nabla T$.

### Fluid Dynamics

Pressure gradients drive fluid motion: $\mathbf{F} = -\nabla P$.

### Physics: Work and Energy

The work done by a force field $\mathbf{F} = -\nabla U$ (conservative field) depends on potential $U$.

## Relationship to Level Curves

Since $\nabla f$ is perpendicular to level curves, the directional derivative $D_{\mathbf{u}} f = 0$ when $\mathbf{u}$ is tangent to a level curve. This confirms that moving along a level curve doesn't change $f$.

## Summary

The directional derivative $D_{\mathbf{u}} f$ measures the rate of change of $f$ in the direction of unit vector $\mathbf{u}$. It is computed via the formula $D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}$, connecting it directly to the gradient. The gradient points in the direction of maximum increase, with magnitude equal to the maximum rate of change. Directional derivatives in directions perpendicular to the gradient are zero, corresponding to tangent directions along level curves. These concepts are fundamental to optimization, gradient descent algorithms, and understanding how multivariable functions change in space.
