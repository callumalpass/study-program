---
id: math301-topic-2-3
title: "Partial Derivatives"
order: 3
---

# Introduction to Partial Derivatives

## Introduction

Partial derivatives extend the concept of derivatives to functions of several variables by measuring the rate of change of the function with respect to one variable while holding all other variables constant. This fundamental concept enables us to analyze how multivariable functions change locally and forms the foundation for gradient vectors, directional derivatives, optimization, and applications throughout science and engineering. While single-variable derivatives measure slopes of curves, partial derivatives measure slopes of surfaces along specific directions.

## Motivation

Consider a function $z = f(x, y)$ representing the temperature at position $(x, y)$ in a room. We might ask:

- How does temperature change as we move in the $x$-direction (east-west)?
- How does temperature change as we move in the $y$-direction (north-south)?

Partial derivatives answer these questions by isolating the effect of changing one variable at a time.

## Definition of Partial Derivatives

### Partial Derivative with Respect to $x$

The **partial derivative of $f$ with respect to $x$** at $(a, b)$ is:

$$\frac{\partial f}{\partial x}(a, b) = \lim_{h \to 0} \frac{f(a + h, b) - f(a, b)}{h}$$

This measures the instantaneous rate of change of $f$ in the $x$-direction while $y$ is held constant at $b$.

### Partial Derivative with Respect to $y$

The **partial derivative of $f$ with respect to $y$** at $(a, b)$ is:

$$\frac{\partial f}{\partial y}(a, b) = \lim_{h \to 0} \frac{f(a, b + h) - f(a, b)}{h}$$

This measures the instantaneous rate of change of $f$ in the $y$-direction while $x$ is held constant at $a$.

### Notation

Common notations for partial derivatives include:

$$\frac{\partial f}{\partial x} = f_x = \partial_x f = D_x f$$

$$\frac{\partial f}{\partial y} = f_y = \partial_y f = D_y f$$

The symbol $\partial$ (a stylized "d") distinguishes partial derivatives from ordinary derivatives.

## Computing Partial Derivatives

### Rule

To compute $\frac{\partial f}{\partial x}$:

1. Treat $y$ (and any other variables) as constants
2. Differentiate $f$ with respect to $x$ using standard differentiation rules

Similarly, to compute $\frac{\partial f}{\partial y}$, treat $x$ as a constant and differentiate with respect to $y$.

### Example 1: Polynomial Function

Let $f(x, y) = x^3 + 2x^2y - y^2 + 5$.

**Partial derivative with respect to $x$**:

Treat $y$ as constant:

$$\frac{\partial f}{\partial x} = 3x^2 + 4xy$$

**Partial derivative with respect to $y$**:

Treat $x$ as constant:

$$\frac{\partial f}{\partial y} = 2x^2 - 2y$$

### Example 2: Product of Functions

Let $f(x, y) = x^2\sin(y)$.

$$\frac{\partial f}{\partial x} = 2x\sin(y)$$

(The $\sin(y)$ term is treated as a constant.)

$$\frac{\partial f}{\partial y} = x^2\cos(y)$$

(The $x^2$ term is treated as a constant.)

### Example 3: Exponential Function

Let $f(x, y) = e^{xy}$.

$$\frac{\partial f}{\partial x} = ye^{xy}$$

(Using the chain rule: the derivative of $e^{xy}$ with respect to $x$ is $y \cdot e^{xy}$.)

$$\frac{\partial f}{\partial y} = xe^{xy}$$

### Example 4: Rational Function

Let $f(x, y) = \frac{x}{y}$.

$$\frac{\partial f}{\partial x} = \frac{1}{y}$$

$$\frac{\partial f}{\partial y} = -\frac{x}{y^2}$$

(Using the power rule: $\frac{x}{y} = xy^{-1}$, so $\frac{\partial}{\partial y}(xy^{-1}) = x \cdot (-1)y^{-2} = -\frac{x}{y^2}$.)

## Geometric Interpretation

### Tangent Lines to Curves

The partial derivative $\frac{\partial f}{\partial x}(a, b)$ is the slope of the tangent line to the curve obtained by intersecting the surface $z = f(x, y)$ with the vertical plane $y = b$.

Similarly, $\frac{\partial f}{\partial y}(a, b)$ is the slope of the tangent line to the curve obtained by intersecting the surface with the vertical plane $x = a$.

### Example: Paraboloid

For $f(x, y) = x^2 + y^2$:

$$\frac{\partial f}{\partial x} = 2x, \quad \frac{\partial f}{\partial y} = 2y$$

At point $(1, 2)$, where $f(1, 2) = 5$:

$$\frac{\partial f}{\partial x}(1, 2) = 2, \quad \frac{\partial f}{\partial y}(1, 2) = 4$$

The surface slopes upward with slope 2 in the $x$-direction and slope 4 in the $y$-direction at this point.

## Functions of Three or More Variables

### Three Variables

For $w = f(x, y, z)$, there are three partial derivatives:

$$\frac{\partial f}{\partial x}, \quad \frac{\partial f}{\partial y}, \quad \frac{\partial f}{\partial z}$$

### Example

Let $f(x, y, z) = x^2y + yz^2 - xz$.

$$\frac{\partial f}{\partial x} = 2xy - z$$

$$\frac{\partial f}{\partial y} = x^2 + z^2$$

$$\frac{\partial f}{\partial z} = 2yz - x$$

### General Case

For $w = f(x_1, x_2, \ldots, x_n)$, there are $n$ partial derivatives:

$$\frac{\partial f}{\partial x_i}, \quad i = 1, 2, \ldots, n$$

## Applications

### Rate of Change

Partial derivatives represent rates of change. For example:

- In thermodynamics, $\frac{\partial P}{\partial V}$ (pressure with respect to volume) at constant temperature
- In economics, marginal products: $\frac{\partial P}{\partial L}$ (production with respect to labor)

### Example: Cobb-Douglas Production

For the production function $P(L, K) = 100L^{0.6}K^{0.4}$:

**Marginal product of labor**:

$$\frac{\partial P}{\partial L} = 100 \cdot 0.6 \cdot L^{-0.4}K^{0.4} = 60L^{-0.4}K^{0.4}$$

**Marginal product of capital**:

$$\frac{\partial P}{\partial K} = 100 \cdot 0.4 \cdot L^{0.6}K^{-0.6} = 40L^{0.6}K^{-0.6}$$

At $L = 100, K = 200$:

$$\frac{\partial P}{\partial L}(100, 200) = 60 \cdot 100^{-0.4} \cdot 200^{0.4} \approx 134.7$$

$$\frac{\partial P}{\partial K}(100, 200) = 40 \cdot 100^{0.6} \cdot 200^{-0.6} \approx 67.3$$

An additional unit of labor increases production by approximately 134.7 units, while an additional unit of capital increases it by about 67.3 units.

## Evaluating at a Point

To evaluate $\frac{\partial f}{\partial x}$ at a specific point $(a, b)$:

1. Compute $\frac{\partial f}{\partial x}$ as a function of $(x, y)$
2. Substitute $x = a$ and $y = b$

### Example

For $f(x, y) = x^2 + 3xy + y^2$, find $\frac{\partial f}{\partial x}$ at $(2, -1)$.

$$\frac{\partial f}{\partial x} = 2x + 3y$$

$$\frac{\partial f}{\partial x}(2, -1) = 2(2) + 3(-1) = 4 - 3 = 1$$

## Partial Derivatives vs. Ordinary Derivatives

### Single-Variable Function

For $y = f(x)$, the derivative $\frac{dy}{dx}$ measures the total rate of change since there's only one variable.

### Multivariable Function

For $z = f(x, y)$, partial derivatives $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$ measure isolated effects. The total rate of change in an arbitrary direction requires the directional derivative (covered later).

## Common Mistakes

### Mistake 1: Forgetting to Treat Other Variables as Constants

**Incorrect**: For $f(x, y) = x^2y$, computing $\frac{\partial f}{\partial x} = 2x \cdot y$ (incorrect application of product rule)

**Correct**: $\frac{\partial f}{\partial x} = 2xy$ (since $y$ is constant)

### Mistake 2: Confusing Notation

$\frac{\partial f}{\partial x}$ is not the same as $\frac{df}{dx}$. The former is a partial derivative (other variables held constant), while the latter might represent total derivative or be ambiguous in context.

## Implicit Partial Derivatives

If an equation implicitly defines a function, we can find partial derivatives without solving explicitly.

### Example

Given $x^2 + y^2 + z^2 = 1$ (sphere), find $\frac{\partial z}{\partial x}$.

Differentiate both sides with respect to $x$, treating $y$ as constant and $z$ as a function of $x$ and $y$:

$$2x + 0 + 2z\frac{\partial z}{\partial x} = 0$$

$$\frac{\partial z}{\partial x} = -\frac{x}{z}$$

(provided $z \neq 0$)

## Level Curves and Partial Derivatives

The gradient vector (constructed from partial derivatives) is perpendicular to level curves. At a point on level curve $f(x, y) = c$, the direction of steepest ascent is given by $\langle f_x, f_y \rangle$.

## Higher Dimensions

Partial derivatives extend naturally to any number of variables. For $f(x_1, \ldots, x_n)$:

$$\frac{\partial f}{\partial x_i} = \lim_{h \to 0} \frac{f(x_1, \ldots, x_i + h, \ldots, x_n) - f(x_1, \ldots, x_i, \ldots, x_n)}{h}$$

## Physical Interpretation

### Temperature

If $T(x, y, z)$ is temperature at position $(x, y, z)$:

- $\frac{\partial T}{\partial x}$ is the rate of temperature change moving east-west
- $\frac{\partial T}{\partial y}$ is the rate moving north-south
- $\frac{\partial T}{\partial z}$ is the rate moving vertically

### Fluid Velocity

For velocity field $\mathbf{v}(x, y, z, t) = \langle v_x, v_y, v_z \rangle$, partial derivatives with respect to space give strain rates, and with respect to time give acceleration fields.

## Summary

Partial derivatives measure the rate of change of a multivariable function with respect to one variable while holding others constant. They are computed using standard differentiation rules, treating other variables as constants. For $z = f(x, y)$, the partial derivatives $f_x$ and $f_y$ give the slopes of the surface in the $x$ and $y$ directions. Partial derivatives have numerous applications in physics, engineering, and economics, where quantities depend on multiple variables. They form the building blocks for gradient vectors, directional derivatives, and optimization techniques in multivariable calculus.
