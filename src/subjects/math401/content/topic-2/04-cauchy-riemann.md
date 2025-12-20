---
id: math401-topic-2-4
title: "Cauchy-Riemann Equations"
order: 4
---

# The Cauchy-Riemann Equations

The Cauchy-Riemann equations are fundamental necessary conditions for complex differentiability. These elegant partial differential equations connect the real and imaginary parts of a complex function, revealing the deep relationship between complex analysis and real multivariable calculus. They are named after Augustin-Louis Cauchy and Bernhard Riemann, who independently discovered their significance.

## Derivation and Statement

### The Classical Form

Let $f(z) = u(x, y) + iv(x, y)$ where $z = x + iy$. If $f$ is differentiable at $z_0 = x_0 + iy_0$, then the **Cauchy-Riemann equations** hold at $(x_0, y_0)$:

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}$$

$$\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$$

### Derivation

Suppose $f'(z_0)$ exists. Then for any $h = h_1 + ih_2 \to 0$:

$$\lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h} = f'(z_0)$$

**Approach 1**: Let $h = h_1$ be real (so $h_2 = 0$):

$$f'(z_0) = \lim_{h_1 \to 0} \frac{f(x_0 + h_1, y_0) - f(x_0, y_0)}{h_1}$$

$$= \lim_{h_1 \to 0} \frac{[u(x_0 + h_1, y_0) - u(x_0, y_0)] + i[v(x_0 + h_1, y_0) - v(x_0, y_0)]}{h_1}$$

$$= \frac{\partial u}{\partial x}(x_0, y_0) + i\frac{\partial v}{\partial x}(x_0, y_0)$$

**Approach 2**: Let $h = ih_2$ be purely imaginary (so $h_1 = 0$):

$$f'(z_0) = \lim_{h_2 \to 0} \frac{f(x_0, y_0 + h_2) - f(x_0, y_0)}{ih_2}$$

$$= \lim_{h_2 \to 0} \frac{[u(x_0, y_0 + h_2) - u(x_0, y_0)] + i[v(x_0, y_0 + h_2) - v(x_0, y_0)]}{ih_2}$$

$$= \frac{1}{i}\left(\frac{\partial u}{\partial y} + i\frac{\partial v}{\partial y}\right) = -i\frac{\partial u}{\partial y} + \frac{\partial v}{\partial y}$$

$$= \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

Since both approaches must yield the same value:

$$\frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = \frac{\partial v}{\partial y} - i\frac{\partial u}{\partial y}$$

Equating real and imaginary parts:

$$\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \quad \frac{\partial v}{\partial x} = -\frac{\partial u}{\partial y}$$

These are the **Cauchy-Riemann equations**.

### Alternative Forms

**Matrix form**:
$$\begin{pmatrix} u_x & u_y \\ v_x & v_y \end{pmatrix} = \begin{pmatrix} u_x & -v_x \\ v_x & u_x \end{pmatrix}$$

The Jacobian matrix has a special structure.

**Polar form**: For $f(re^{i\theta}) = u(r, \theta) + iv(r, \theta)$:

$$\frac{\partial u}{\partial r} = \frac{1}{r}\frac{\partial v}{\partial \theta}$$

$$\frac{\partial v}{\partial r} = -\frac{1}{r}\frac{\partial u}{\partial \theta}$$

**Complex notation**: Define:
$$\frac{\partial}{\partial z} = \frac{1}{2}\left(\frac{\partial}{\partial x} - i\frac{\partial}{\partial y}\right), \quad \frac{\partial}{\partial \bar{z}} = \frac{1}{2}\left(\frac{\partial}{\partial x} + i\frac{\partial}{\partial y}\right)$$

Then $f$ satisfies Cauchy-Riemann iff $\frac{\partial f}{\partial \bar{z}} = 0$.

## Examples Satisfying Cauchy-Riemann

### Example 1: $f(z) = z^2$

$$u(x, y) = x^2 - y^2, \quad v(x, y) = 2xy$$

$$\frac{\partial u}{\partial x} = 2x, \quad \frac{\partial v}{\partial y} = 2x \quad \checkmark$$

$$\frac{\partial u}{\partial y} = -2y, \quad \frac{\partial v}{\partial x} = 2y \implies -\frac{\partial v}{\partial x} = -2y \quad \checkmark$$

The Cauchy-Riemann equations are satisfied everywhere.

Moreover:
$$f'(z) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = 2x + 2iy = 2z$$

### Example 2: $f(z) = e^z$

$$e^z = e^{x+iy} = e^x(\cos y + i\sin y)$$

$$u(x, y) = e^x \cos y, \quad v(x, y) = e^x \sin y$$

$$\frac{\partial u}{\partial x} = e^x \cos y, \quad \frac{\partial v}{\partial y} = e^x \cos y \quad \checkmark$$

$$\frac{\partial u}{\partial y} = -e^x \sin y, \quad \frac{\partial v}{\partial x} = e^x \sin y \implies -\frac{\partial v}{\partial x} = -e^x \sin y \quad \checkmark$$

$$f'(z) = \frac{\partial u}{\partial x} + i\frac{\partial v}{\partial x} = e^x \cos y + ie^x \sin y = e^z$$

### Example 3: $f(z) = \frac{1}{z}$ for $z \neq 0$

$$\frac{1}{z} = \frac{1}{x + iy} = \frac{x - iy}{x^2 + y^2}$$

$$u(x, y) = \frac{x}{x^2 + y^2}, \quad v(x, y) = \frac{-y}{x^2 + y^2}$$

$$\frac{\partial u}{\partial x} = \frac{(x^2 + y^2) - x(2x)}{(x^2 + y^2)^2} = \frac{-x^2 + y^2}{(x^2 + y^2)^2}$$

$$\frac{\partial v}{\partial y} = \frac{-(x^2 + y^2) - (-y)(2y)}{(x^2 + y^2)^2} = \frac{-x^2 + y^2}{(x^2 + y^2)^2} \quad \checkmark$$

$$\frac{\partial u}{\partial y} = \frac{-x(2y)}{(x^2 + y^2)^2} = \frac{-2xy}{(x^2 + y^2)^2}$$

$$\frac{\partial v}{\partial x} = \frac{-(-y)(2x)}{(x^2 + y^2)^2} = \frac{2xy}{(x^2 + y^2)^2} \implies -\frac{\partial v}{\partial x} = \frac{-2xy}{(x^2 + y^2)^2} \quad \checkmark$$

$$f'(z) = \frac{-x^2 + y^2}{(x^2 + y^2)^2} + i\frac{2xy}{(x^2 + y^2)^2} = \frac{-(x - iy)^2}{(x^2 + y^2)^2} = -\frac{1}{z^2}$$

## Examples Violating Cauchy-Riemann

### Example 1: $f(z) = \bar{z}$

$$u(x, y) = x, \quad v(x, y) = -y$$

$$\frac{\partial u}{\partial x} = 1, \quad \frac{\partial v}{\partial y} = -1 \quad \text{(not equal!)}$$

The Cauchy-Riemann equations fail everywhere, confirming that $\bar{z}$ is nowhere differentiable.

### Example 2: $f(z) = |z|^2 = z\bar{z}$

$$u(x, y) = x^2 + y^2, \quad v(x, y) = 0$$

$$\frac{\partial u}{\partial x} = 2x, \quad \frac{\partial v}{\partial y} = 0$$

These are equal only when $x = 0$.

$$\frac{\partial u}{\partial y} = 2y, \quad \frac{\partial v}{\partial x} = 0$$

These satisfy $\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}$ only when $y = 0$.

Both conditions hold simultaneously only at $z = 0$. So Cauchy-Riemann holds only at the origin, yet $|z|^2$ is not differentiable even there (approaching from different directions gives different values for the difference quotient).

This example shows that Cauchy-Riemann equations are **necessary but not sufficient** for differentiability.

### Example 3: $f(z) = \text{Re}(z)$

$$u(x, y) = x, \quad v(x, y) = 0$$

$$\frac{\partial u}{\partial x} = 1, \quad \frac{\partial v}{\partial y} = 0 \quad \text{(not equal!)}$$

Cauchy-Riemann fails everywhere.

## Sufficient Conditions for Differentiability

The Cauchy-Riemann equations alone are not sufficient for differentiability, as the $|z|^2$ example shows. We need an additional smoothness condition.

**Theorem (Sufficient Conditions)**: Let $f(z) = u(x, y) + iv(x, y)$ be defined in an open set $D$. If:
1. The partial derivatives $u_x, u_y, v_x, v_y$ exist in $D$
2. The partial derivatives are continuous at $z_0 \in D$
3. The Cauchy-Riemann equations hold at $z_0$

then $f$ is differentiable at $z_0$, and:
$$f'(z_0) = u_x(x_0, y_0) + iv_x(x_0, y_0) = v_y(x_0, y_0) - iu_y(x_0, y_0)$$

**Proof sketch**: Write $f(z_0 + h) - f(z_0)$ using Taylor expansion of $u$ and $v$, apply Cauchy-Riemann to simplify, and show the difference quotient has limit $u_x + iv_x$.

## Necessary and Sufficient Form

**Theorem**: $f$ is differentiable at $z_0$ if and only if:
1. $u$ and $v$ are differentiable at $(x_0, y_0)$ (in the real sense)
2. The Cauchy-Riemann equations hold at $(x_0, y_0)$

This provides a complete characterization of complex differentiability in terms of real analysis.

## Polar Form of Cauchy-Riemann

For $f(re^{i\theta}) = u(r, \theta) + iv(r, \theta)$:

$$r\frac{\partial u}{\partial r} = \frac{\partial v}{\partial \theta}$$

$$r\frac{\partial v}{\partial r} = -\frac{\partial u}{\partial \theta}$$

**Derivation**: Use the chain rule with $x = r\cos\theta$, $y = r\sin\theta$.

### Example: $f(z) = z^n$

In polar form: $f(re^{i\theta}) = r^n e^{in\theta} = r^n \cos(n\theta) + ir^n \sin(n\theta)$

$$u(r, \theta) = r^n \cos(n\theta), \quad v(r, \theta) = r^n \sin(n\theta)$$

$$r\frac{\partial u}{\partial r} = r \cdot nr^{n-1}\cos(n\theta) = nr^n\cos(n\theta)$$

$$\frac{\partial v}{\partial \theta} = r^n \cdot n\cos(n\theta) = nr^n\cos(n\theta) \quad \checkmark$$

$$r\frac{\partial v}{\partial r} = r \cdot nr^{n-1}\sin(n\theta) = nr^n\sin(n\theta)$$

$$-\frac{\partial u}{\partial \theta} = -r^n \cdot (-n\sin(n\theta)) = nr^n\sin(n\theta) \quad \checkmark$$

## Connection to Harmonic Functions

From the Cauchy-Riemann equations:
$$u_x = v_y, \quad u_y = -v_x$$

Differentiate the first with respect to $x$, the second with respect to $y$:
$$u_{xx} = v_{yx}, \quad u_{yy} = -v_{xy}$$

If the mixed partials are continuous (which they are for differentiable complex functions), then $v_{xy} = v_{yx}$, so:
$$u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0$$

Thus $u$ satisfies **Laplace's equation** $\nabla^2 u = 0$. Similarly, $v$ satisfies Laplace's equation.

Functions satisfying Laplace's equation are called **harmonic functions**. We'll explore this connection in depth in a later section.

## The Wirtinger Derivatives

Define the **Wirtinger derivatives**:
$$\frac{\partial}{\partial z} = \frac{1}{2}\left(\frac{\partial}{\partial x} - i\frac{\partial}{\partial y}\right)$$

$$\frac{\partial}{\partial \bar{z}} = \frac{1}{2}\left(\frac{\partial}{\partial x} + i\frac{\partial}{\partial y}\right)$$

**Theorem**: $f$ is differentiable (satisfies Cauchy-Riemann) if and only if $\frac{\partial f}{\partial \bar{z}} = 0$.

When this holds, $f'(z) = \frac{\partial f}{\partial z}$.

This notation simplifies many calculations and provides a coordinate-free formulation.

## Applications of Cauchy-Riemann

### Finding Analytic Functions

Given $u$ (or $v$), we can find $v$ (or $u$) using Cauchy-Riemann.

**Example**: Let $u(x, y) = x^3 - 3xy^2$. Find $v$ such that $f = u + iv$ is analytic.

From $u_x = v_y$:
$$v_y = \frac{\partial u}{\partial x} = 3x^2 - 3y^2$$

Integrate with respect to $y$:
$$v(x, y) = \int (3x^2 - 3y^2) dy = 3x^2 y - y^3 + g(x)$$

From $u_y = -v_x$:
$$-v_x = u_y = -6xy \implies v_x = 6xy$$

Differentiate the expression for $v$:
$$v_x = 6xy + g'(x)$$

Comparing: $g'(x) = 0$, so $g(x) = C$ (constant).

$$v(x, y) = 3x^2 y - y^3 + C$$

$$f(z) = (x^3 - 3xy^2) + i(3x^2 y - y^3 + C)$$

In fact, this is $f(z) = z^3 + iC$. (Verify: $(x + iy)^3 = x^3 + 3x^2(iy) + 3x(iy)^2 + (iy)^3 = x^3 - 3xy^2 + i(3x^2y - y^3)$.)

### Checking Differentiability

To verify $f$ is differentiable, check:
1. Partial derivatives exist and are continuous
2. Cauchy-Riemann equations hold

This is often easier than computing the limit definition directly.

## Summary

- **Cauchy-Riemann equations**: $u_x = v_y$ and $u_y = -v_x$
- **Necessary condition**: If $f$ is differentiable, then Cauchy-Riemann holds
- **Sufficient condition**: Cauchy-Riemann + continuous partials $\implies$ differentiability
- When differentiable: $f'(z) = u_x + iv_x = v_y - iu_y$
- **Polar form**: $ru_r = v_\theta$ and $rv_r = -u_\theta$
- **Wirtinger form**: $\frac{\partial f}{\partial \bar{z}} = 0$
- Cauchy-Riemann implies $u$ and $v$ are harmonic: $\nabla^2 u = \nabla^2 v = 0$
- Can construct analytic functions from a given harmonic $u$ or $v$
- The equations reveal the rigid structure of complex differentiable functions
- Fundamental bridge between complex analysis and real multivariable calculus
