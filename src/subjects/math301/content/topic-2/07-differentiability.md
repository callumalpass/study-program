---
id: math301-topic-2-7
title: "Differentiability"
order: 7
---

# Differentiability and the Total Differential

## Introduction

In single-variable calculus, differentiability implies continuity, and the derivative measures the rate of change. For multivariable functions, the situation is more subtle: the existence of partial derivatives does not guarantee differentiability, and differentiability is a stronger condition. A differentiable function can be approximated locally by a linear function (its tangent plane), and this linear approximation is expressed through the **total differential**. Understanding differentiability is crucial for ensuring the validity of the chain rule, Taylor series, and optimization theorems.

## Differentiability in One Variable: Review

For a function $y = f(x)$ of one variable, $f$ is **differentiable** at $x = a$ if:

$$\lim_{h \to 0} \frac{f(a + h) - f(a)}{h} = f'(a)$$

exists. This means:

$$f(a + h) = f(a) + f'(a)h + \varepsilon(h)h$$

where $\varepsilon(h) \to 0$ as $h \to 0$.

The linear approximation $L(x) = f(a) + f'(a)(x - a)$ is the tangent line at $x = a$.

**Key fact**: Differentiability implies continuity.

## Differentiability for Functions of Two Variables

### Definition

A function $z = f(x, y)$ is **differentiable** at $(a, b)$ if it can be approximated by a linear function near $(a, b)$:

$$f(a + \Delta x, b + \Delta y) = f(a, b) + f_x(a, b)\Delta x + f_y(a, b)\Delta y + \varepsilon_1\Delta x + \varepsilon_2\Delta y$$

where $\varepsilon_1, \varepsilon_2 \to 0$ as $(\Delta x, \Delta y) \to (0, 0)$.

Equivalently, the error in the linear approximation is small compared to the distance from $(a, b)$:

$$\lim_{(\Delta x, \Delta y) \to (0, 0)} \frac{f(a + \Delta x, b + \Delta y) - f(a, b) - f_x(a, b)\Delta x - f_y(a, b)\Delta y}{\sqrt{(\Delta x)^2 + (\Delta y)^2}} = 0$$

### Geometric Interpretation

If $f$ is differentiable at $(a, b)$, the graph of $f$ has a well-defined **tangent plane** at $(a, b, f(a, b))$. The tangent plane is the graph of the linear approximation.

## Total Differential

### Definition

For a differentiable function $z = f(x, y)$, the **total differential** $dz$ is:

$$dz = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy = f_x\,dx + f_y\,dy$$

where $dx$ and $dy$ represent small changes in $x$ and $y$.

The total differential approximates the change in $f$:

$$\Delta z \approx dz$$

where $\Delta z = f(x + \Delta x, y + \Delta y) - f(x, y)$.

### Example 1: Linear Approximation

For $f(x, y) = x^2 + 3xy - y^2$ at $(1, 2)$:

$$f(1, 2) = 1 + 6 - 4 = 3$$

$$f_x = 2x + 3y, \quad f_y = 3x - 2y$$

$$f_x(1, 2) = 2 + 6 = 8, \quad f_y(1, 2) = 3 - 4 = -1$$

Total differential:

$$dz = 8\,dx - 1\,dy$$

To approximate $f(1.1, 2.05)$, use $\Delta x = 0.1$, $\Delta y = 0.05$:

$$\Delta z \approx dz = 8(0.1) - 1(0.05) = 0.8 - 0.05 = 0.75$$

$$f(1.1, 2.05) \approx f(1, 2) + \Delta z = 3 + 0.75 = 3.75$$

Actual value:

$$f(1.1, 2.05) = (1.1)^2 + 3(1.1)(2.05) - (2.05)^2 = 1.21 + 6.765 - 4.2025 = 3.7725$$

The approximation is quite good.

## Sufficient Condition for Differentiability

### Theorem

If the partial derivatives $f_x$ and $f_y$ exist near $(a, b)$ and are **continuous** at $(a, b)$, then $f$ is differentiable at $(a, b)$.

This provides a practical test: for functions with continuous partial derivatives (called $C^1$ functions), differentiability is guaranteed.

### Example 2

$f(x, y) = x^3 + \sin(xy) + e^{y^2}$ has partial derivatives:

$$f_x = 3x^2 + y\cos(xy)$$
$$f_y = x\cos(xy) + 2ye^{y^2}$$

Both are continuous everywhere, so $f$ is differentiable everywhere.

## Counterexample: Existence of Partials $\not\Rightarrow$ Differentiability

### Example 3

Consider:

$$f(x, y) = \begin{cases} \frac{xy}{\sqrt{x^2 + y^2}} & \text{if } (x, y) \neq (0, 0) \\ 0 & \text{if } (x, y) = (0, 0) \end{cases}$$

At $(0, 0)$:

$$f_x(0, 0) = \lim_{h \to 0} \frac{f(h, 0) - f(0, 0)}{h} = \lim_{h \to 0} \frac{0 - 0}{h} = 0$$

$$f_y(0, 0) = \lim_{h \to 0} \frac{f(0, h) - f(0, 0)}{h} = 0$$

So both partial derivatives exist at $(0, 0)$.

However, along the line $y = x$:

$$\lim_{(x, x) \to (0, 0)} \frac{f(x, x) - f(0, 0) - f_x(0, 0) \cdot x - f_y(0, 0) \cdot x}{\sqrt{x^2 + x^2}} = \lim_{x \to 0} \frac{x^2/\sqrt{2x^2}}{\sqrt{2}x} = \lim_{x \to 0} \frac{x/\sqrt{2}}{\sqrt{2}x} = \frac{1}{2} \neq 0$$

The limit is not zero, so $f$ is **not differentiable** at $(0, 0)$, despite having partial derivatives there.

## Differentiability Implies Continuity

### Theorem

If $f(x, y)$ is differentiable at $(a, b)$, then $f$ is continuous at $(a, b)$.

### Proof Sketch

From differentiability:

$$f(a + \Delta x, b + \Delta y) = f(a, b) + f_x(a, b)\Delta x + f_y(a, b)\Delta y + \varepsilon_1\Delta x + \varepsilon_2\Delta y$$

As $(\Delta x, \Delta y) \to (0, 0)$, all terms on the right except $f(a, b)$ approach 0, so:

$$\lim_{(\Delta x, \Delta y) \to (0, 0)} f(a + \Delta x, b + \Delta y) = f(a, b)$$

Thus $f$ is continuous at $(a, b)$.

## Tangent Plane Equation

For a differentiable function $z = f(x, y)$, the **tangent plane** at $(a, b, f(a, b))$ is:

$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

This is the linear approximation to the surface.

### Example 4

Find the tangent plane to $z = x^2 + y^2$ at $(1, 2, 5)$.

$$f_x = 2x, \quad f_y = 2y$$

$$f_x(1, 2) = 2, \quad f_y(1, 2) = 4$$

Tangent plane:

$$z = 5 + 2(x - 1) + 4(y - 2) = 5 + 2x - 2 + 4y - 8 = 2x + 4y - 5$$

## Total Differential for Three or More Variables

For $w = f(x, y, z)$:

$$dw = \frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy + \frac{\partial f}{\partial z}dz = f_x\,dx + f_y\,dy + f_z\,dz$$

### Example 5

For $w = x^2yz$:

$$dw = 2xyz\,dx + x^2z\,dy + x^2y\,dz$$

At $(1, 2, 3)$ with $dx = 0.1, dy = -0.05, dz = 0.02$:

$$dw = 2(1)(2)(3)(0.1) + (1)^2(3)(-0.05) + (1)^2(2)(0.02)$$

$$= 1.2 - 0.15 + 0.04 = 1.09$$

## Differential Notation and the Chain Rule

The total differential provides intuition for the chain rule. If $z = f(x, y)$ and $x = x(t), y = y(t)$:

$$dz = f_x\,dx + f_y\,dy$$

Dividing by $dt$:

$$\frac{dz}{dt} = f_x\frac{dx}{dt} + f_y\frac{dy}{dt}$$

This is the chain rule for one independent variable.

## Applications

### Error Propagation

The total differential estimates how errors in measurements of $x$ and $y$ propagate to errors in $f(x, y)$.

### Example 6

The volume of a cylinder is $V = \pi r^2 h$. If $r = 5$ cm with possible error $\pm 0.1$ cm, and $h = 10$ cm with possible error $\pm 0.2$ cm, estimate the maximum error in $V$.

$$dV = \frac{\partial V}{\partial r}dr + \frac{\partial V}{\partial h}dh = 2\pi rh\,dr + \pi r^2\,dh$$

At $r = 5, h = 10$:

$$dV = 2\pi(5)(10)\,dr + \pi(25)\,dh = 100\pi\,dr + 25\pi\,dh$$

Maximum error (taking $|dr| = 0.1, |dh| = 0.2$):

$$|dV| \le 100\pi(0.1) + 25\pi(0.2) = 10\pi + 5\pi = 15\pi \approx 47.1 \text{ cm}^3$$

### Sensitivity Analysis

In engineering and economics, the total differential indicates sensitivity to parameter changes.

## Increments vs. Differentials

### Increments

The **actual change** in $f$:

$$\Delta z = f(x + \Delta x, y + \Delta y) - f(x, y)$$

### Differentials

The **approximate change** using the linear approximation:

$$dz = f_x\,dx + f_y\,dy$$

where $dx = \Delta x$ and $dy = \Delta y$.

For small $\Delta x, \Delta y$, $\Delta z \approx dz$.

## Higher-Order Differentials

The second-order total differential involves second partial derivatives:

$$d^2z = f_{xx}(dx)^2 + 2f_{xy}\,dx\,dy + f_{yy}(dy)^2$$

This appears in the second-order Taylor approximation and the second derivative test for optimization.

## Relationship to Gradient

The total differential can be written using the gradient:

$$df = \nabla f \cdot d\mathbf{r}$$

where $d\mathbf{r} = \langle dx, dy \rangle$ or $\langle dx, dy, dz \rangle$.

This form shows that $df$ measures the rate of change in the direction $d\mathbf{r}$.

## Summary

A function $f(x, y)$ is differentiable at $(a, b)$ if it can be approximated by a linear function (its tangent plane) near that point. Differentiability is stronger than the existence of partial derivatives: continuity of partials is sufficient for differentiability. The total differential $dz = f_x\,dx + f_y\,dy$ provides the linear approximation and is used for estimating changes, error propagation, and understanding the chain rule. Differentiable functions are continuous and have well-defined tangent planes. The total differential extends naturally to functions of three or more variables and is a fundamental tool in multivariable calculus.
