---
id: math301-topic-2-4
title: "Higher-Order Partial Derivatives"
order: 4
---

# Higher-Order Partial Derivatives

## Introduction

Just as we can take second, third, and higher derivatives of single-variable functions, we can also compute higher-order partial derivatives of multivariable functions. These derivatives measure how rates of change themselves change and appear in important applications including the wave equation, heat equation, optimization (second derivative test), and Taylor series expansions for multivariable functions. A remarkable theorem—Clairaut's theorem—establishes that under mild conditions, mixed partial derivatives are independent of the order of differentiation.

## Second-Order Partial Derivatives

### Definition

For a function $z = f(x, y)$, there are **four** second-order partial derivatives:

$$\frac{\partial^2 f}{\partial x^2} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial x}\right) = (f_x)_x = f_{xx}$$

$$\frac{\partial^2 f}{\partial y^2} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial y}\right) = (f_y)_y = f_{yy}$$

$$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) = (f_y)_x = f_{yx}$$

$$\frac{\partial^2 f}{\partial y \partial x} = \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = (f_x)_y = f_{xy}$$

The first two are called **pure** second partial derivatives (differentiating twice with respect to the same variable). The last two are called **mixed** partial derivatives (differentiating with respect to different variables).

### Notation Conventions

In the notation $\frac{\partial^2 f}{\partial y \partial x}$, the order of differentiation is **right to left**: first differentiate with respect to $x$, then with respect to $y$.

In the subscript notation $f_{xy}$, the order is **left to right**: first $x$, then $y$.

Both notations represent the same derivative when Clairaut's theorem applies.

## Computing Second-Order Partial Derivatives

### Example 1: Polynomial

Let $f(x, y) = x^3 + 2x^2y - 3y^2 + 4x - 5y + 6$.

First-order partials:
$$f_x = 3x^2 + 4xy + 4$$
$$f_y = 2x^2 - 6y - 5$$

Second-order partials:

$$f_{xx} = \frac{\partial}{\partial x}(3x^2 + 4xy + 4) = 6x + 4y$$

$$f_{yy} = \frac{\partial}{\partial y}(2x^2 - 6y - 5) = -6$$

$$f_{xy} = \frac{\partial}{\partial y}(3x^2 + 4xy + 4) = 4x$$

$$f_{yx} = \frac{\partial}{\partial x}(2x^2 - 6y - 5) = 4x$$

Note that $f_{xy} = f_{yx}$.

### Example 2: Exponential Function

Let $f(x, y) = e^{x^2 + y^2}$.

First-order partials:
$$f_x = 2xe^{x^2 + y^2}$$
$$f_y = 2ye^{x^2 + y^2}$$

Second-order partials:

$$f_{xx} = \frac{\partial}{\partial x}(2xe^{x^2 + y^2}) = 2e^{x^2 + y^2} + 2x \cdot 2xe^{x^2 + y^2} = 2e^{x^2 + y^2}(1 + 2x^2)$$

$$f_{yy} = \frac{\partial}{\partial y}(2ye^{x^2 + y^2}) = 2e^{x^2 + y^2}(1 + 2y^2)$$

$$f_{xy} = \frac{\partial}{\partial y}(2xe^{x^2 + y^2}) = 2x \cdot 2ye^{x^2 + y^2} = 4xye^{x^2 + y^2}$$

$$f_{yx} = \frac{\partial}{\partial x}(2ye^{x^2 + y^2}) = 2y \cdot 2xe^{x^2 + y^2} = 4xye^{x^2 + y^2}$$

Again, $f_{xy} = f_{yx}$.

### Example 3: Trigonometric Function

Let $f(x, y) = \sin(xy)$.

$$f_x = y\cos(xy)$$
$$f_y = x\cos(xy)$$

$$f_{xx} = -y^2\sin(xy)$$
$$f_{yy} = -x^2\sin(xy)$$

$$f_{xy} = \cos(xy) - xy\sin(xy)$$
$$f_{yx} = \cos(xy) - xy\sin(xy)$$

Once more, $f_{xy} = f_{yx}$.

## Clairaut's Theorem

### Statement

If $f$ is defined on a disk $D$ containing the point $(a, b)$, and if $f_{xy}$ and $f_{yx}$ are both continuous on $D$, then:

$$f_{xy}(a, b) = f_{yx}(a, b)$$

In other words, the order of differentiation doesn't matter for mixed partial derivatives, provided the second partials are continuous.

### Significance

Clairaut's theorem (also called Schwarz's theorem or Young's theorem) dramatically simplifies calculations. Instead of verifying equality, we can assume mixed partials are equal for smooth functions.

### Conditions

The theorem requires:
1. Both mixed partials exist
2. Both mixed partials are continuous

These conditions are satisfied for most elementary functions (polynomials, exponential, trigonometric, etc.).

### Proof Sketch

The proof involves examining the limit:

$$\lim_{h,k \to 0} \frac{f(a+h, b+k) - f(a+h, b) - f(a, b+k) + f(a, b)}{hk}$$

This limit can be evaluated as either $f_{xy}(a, b)$ or $f_{yx}(a, b)$ by applying the Mean Value Theorem in different orders. Continuity ensures both approaches give the same value.

## Counterexample: When Continuity Fails

### Example

Consider:

$$f(x, y) = \begin{cases} \frac{xy(x^2 - y^2)}{x^2 + y^2} & \text{if } (x, y) \neq (0, 0) \\ 0 & \text{if } (x, y) = (0, 0) \end{cases}$$

At $(0, 0)$, we can show (through careful limit calculations):

$$f_{xy}(0, 0) = -1$$
$$f_{yx}(0, 0) = 1$$

The mixed partials are **not equal** because they are not continuous at the origin. This example demonstrates that Clairaut's theorem's continuity assumption is essential.

## Higher-Order Partial Derivatives

### Third-Order Partials

For $f(x, y)$, there are **eight** third-order partial derivatives:

$$f_{xxx}, \quad f_{xxy}, \quad f_{xyx}, \quad f_{xyy}, \quad f_{yxx}, \quad f_{yxy}, \quad f_{yyx}, \quad f_{yyy}$$

If the function is sufficiently smooth (continuous third partials), Clairaut's theorem extends:

$$f_{xxy} = f_{xyx} = f_{yxx}$$
$$f_{xyy} = f_{yxy} = f_{yyx}$$

In general, the order of differentiation doesn't matter—only the number of times we differentiate with respect to each variable.

### Example

For $f(x, y) = x^4y^3$:

$$f_x = 4x^3y^3, \quad f_y = 3x^4y^2$$

$$f_{xx} = 12x^2y^3, \quad f_{xy} = 12x^3y^2, \quad f_{yy} = 6x^4y$$

$$f_{xxx} = 24xy^3$$
$$f_{xxy} = f_{xyx} = f_{yxx} = 36x^2y^2$$
$$f_{xyy} = f_{yxy} = f_{yyx} = 24x^3y$$
$$f_{yyy} = 6x^4$$

### Compact Notation

The number of distinct $n$th-order partial derivatives (assuming sufficient smoothness) for $f(x, y)$ is:

$$\binom{n + 1}{1} = n + 1$$

For $f(x, y, z)$, it's:

$$\binom{n + 2}{2} = \frac{(n+1)(n+2)}{2}$$

## Functions of Three Variables

For $w = f(x, y, z)$, there are **nine** second-order partial derivatives:

**Pure**: $f_{xx}, f_{yy}, f_{zz}$

**Mixed**: $f_{xy}, f_{xz}, f_{yx}, f_{yz}, f_{zx}, f_{zy}$

Under continuity conditions:

$$f_{xy} = f_{yx}, \quad f_{xz} = f_{zx}, \quad f_{yz} = f_{zy}$$

So there are only **six** distinct second partials.

### Example

For $f(x, y, z) = xyz + x^2z$:

$$f_x = yz + 2xz, \quad f_y = xz, \quad f_z = xy + x^2$$

$$f_{xx} = 2z, \quad f_{yy} = 0, \quad f_{zz} = 0$$

$$f_{xy} = z, \quad f_{xz} = y + 2x, \quad f_{yz} = x$$

Verify: $f_{xy} = f_{yx} = z$, $f_{xz} = f_{zx} = y + 2x$, $f_{yz} = f_{zy} = x$ ✓

## Applications

### Laplace's Equation

In physics and engineering, **Laplace's equation** is:

$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} = 0$$

(or in three dimensions, with $+ \frac{\partial^2 f}{\partial z^2}$)

Solutions are called **harmonic functions** and model steady-state phenomena (electrostatics, heat distribution, fluid flow).

### Example: Verify Harmonic Function

Show that $f(x, y) = \ln(x^2 + y^2)$ satisfies Laplace's equation.

$$f_x = \frac{2x}{x^2 + y^2}, \quad f_y = \frac{2y}{x^2 + y^2}$$

$$f_{xx} = \frac{2(x^2 + y^2) - 2x \cdot 2x}{(x^2 + y^2)^2} = \frac{2y^2 - 2x^2}{(x^2 + y^2)^2}$$

$$f_{yy} = \frac{2(x^2 + y^2) - 2y \cdot 2y}{(x^2 + y^2)^2} = \frac{2x^2 - 2y^2}{(x^2 + y^2)^2}$$

$$f_{xx} + f_{yy} = \frac{2y^2 - 2x^2 + 2x^2 - 2y^2}{(x^2 + y^2)^2} = 0$$ ✓

### Wave Equation

The **wave equation** in one spatial dimension is:

$$\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}$$

where $u(x, t)$ represents displacement and $c$ is wave speed.

### Heat Equation

The **heat equation** is:

$$\frac{\partial u}{\partial t} = k\frac{\partial^2 u}{\partial x^2}$$

where $u(x, t)$ is temperature and $k$ is thermal diffusivity.

## Hessian Matrix

For optimization, the **Hessian matrix** collects all second partial derivatives:

$$H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$$

For three variables:

$$H = \begin{pmatrix} f_{xx} & f_{xy} & f_{xz} \\ f_{yx} & f_{yy} & f_{yz} \\ f_{zx} & f_{zy} & f_{zz} \end{pmatrix}$$

By Clairaut's theorem, the Hessian is symmetric when partials are continuous.

### Example

For $f(x, y) = x^3 - 3xy + y^3$:

$$f_x = 3x^2 - 3y, \quad f_y = -3x + 3y^2$$

$$f_{xx} = 6x, \quad f_{xy} = -3, \quad f_{yy} = 6y$$

$$H = \begin{pmatrix} 6x & -3 \\ -3 & 6y \end{pmatrix}$$

At $(1, 1)$:

$$H(1, 1) = \begin{pmatrix} 6 & -3 \\ -3 & 6 \end{pmatrix}$$

## Taylor Series

The multivariable Taylor series uses higher-order partials. For $f(x, y)$ near $(a, b)$:

$$f(x, y) \approx f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$
$$+ \frac{1}{2}[f_{xx}(a, b)(x-a)^2 + 2f_{xy}(a, b)(x-a)(y-b) + f_{yy}(a, b)(y-b)^2] + \cdots$$

Second-order partials appear in the quadratic terms.

## Summary

Higher-order partial derivatives extend differentiation to multiple iterations. For $f(x, y)$, there are four second-order partials: $f_{xx}$, $f_{yy}$, $f_{xy}$, and $f_{yx}$. Clairaut's theorem states that mixed partials are equal ($f_{xy} = f_{yx}$) when they are continuous, simplifying calculations significantly. Higher-order partials appear in important partial differential equations like Laplace's equation, the wave equation, and the heat equation. The Hessian matrix, constructed from second partials, is essential for optimization and characterizing critical points. Understanding higher-order partials is fundamental for advanced topics in multivariable calculus and differential equations.
