# Lagrange Multipliers

## Introduction

Lagrange multipliers provide an elegant and powerful method for finding extrema of functions subject to constraints. Many real-world optimization problems involve constraints: maximizing profit with limited resources, minimizing cost subject to production requirements, or finding extreme temperatures on a surface. The method of Lagrange multipliers transforms constrained optimization into a system of equations involving a new variable (the multiplier $\lambda$) that encodes information about the constraint. This technique is fundamental in economics, physics, engineering, and optimization theory.

## The Method

### Problem Statement

**Optimize** (maximize or minimize) $f(x, y)$ **subject to** the constraint $g(x, y) = k$.

### Lagrange Multiplier Theorem

If $f$ has an extremum at $(x_0, y_0)$ subject to the constraint $g(x, y) = k$, and if $\nabla g \neq \mathbf{0}$ at $(x_0, y_0)$, then there exists a constant $\lambda$ (the **Lagrange multiplier**) such that:

$$\nabla f(x_0, y_0) = \lambda \nabla g(x_0, y_0)$$

### System of Equations

This gives three equations in three unknowns $(x, y, \lambda)$:

$$f_x = \lambda g_x$$
$$f_y = \lambda g_y$$
$$g(x, y) = k$$

Solve this system to find candidate points, then evaluate $f$ to determine which is the maximum or minimum.

### Geometric Interpretation

At the extremum, the gradient $\nabla f$ is parallel to $\nabla g$. The level curves of $f$ and $g$ are tangent at the optimal point.

**Intuition**: To maximize/minimize $f$ on the constraint curve $g = k$, move along the curve until you can't increase/decrease $f$ anymore. This happens when the gradient of $f$ (direction of steepest ascent) is perpendicular to the constraint curve, i.e., parallel to $\nabla g$ (which is perpendicular to the curve).

## Examples

### Example 1: Maximize Subject to Circle

Maximize $f(x, y) = xy$ subject to $x^2 + y^2 = 1$.

Let $g(x, y) = x^2 + y^2$.

$$\nabla f = \langle y, x \rangle, \quad \nabla g = \langle 2x, 2y \rangle$$

System:

$$y = \lambda(2x) \quad (1)$$
$$x = \lambda(2y) \quad (2)$$
$$x^2 + y^2 = 1 \quad (3)$$

From (1): $y = 2\lambda x$

Substitute into (2): $x = 2\lambda(2\lambda x) = 4\lambda^2 x$

If $x \neq 0$: $1 = 4\lambda^2 \implies \lambda = \pm 1/2$

If $\lambda = 1/2$: $y = x$. From (3): $2x^2 = 1 \implies x = \pm 1/\sqrt{2}$

Points: $(1/\sqrt{2}, 1/\sqrt{2})$ and $(-1/\sqrt{2}, -1/\sqrt{2})$

If $\lambda = -1/2$: $y = -x$. From (3): $2x^2 = 1 \implies x = \pm 1/\sqrt{2}$

Points: $(1/\sqrt{2}, -1/\sqrt{2})$ and $(-1/\sqrt{2}, 1/\sqrt{2})$

Also check $x = 0$: then $y = \pm 1$, giving $(0, 1)$ and $(0, -1)$ with $f = 0$.

Evaluate $f$:

$$f(1/\sqrt{2}, 1/\sqrt{2}) = 1/2$$
$$f(-1/\sqrt{2}, -1/\sqrt{2}) = 1/2$$
$$f(1/\sqrt{2}, -1/\sqrt{2}) = -1/2$$
$$f(-1/\sqrt{2}, 1/\sqrt{2}) = -1/2$$
$$f(0, \pm 1) = 0$$

**Maximum**: $1/2$ at $(\pm 1/\sqrt{2}, \pm 1/\sqrt{2})$ (same signs)
**Minimum**: $-1/2$ at $(\pm 1/\sqrt{2}, \mp 1/\sqrt{2})$ (opposite signs)

### Example 2: Minimize Distance

Find the point on the line $x + y = 4$ closest to the origin.

**Minimize** $f(x, y) = x^2 + y^2$ subject to $g(x, y) = x + y = 4$.

$$\nabla f = \langle 2x, 2y \rangle, \quad \nabla g = \langle 1, 1 \rangle$$

System:

$$2x = \lambda$$
$$2y = \lambda$$
$$x + y = 4$$

From the first two: $2x = 2y \implies x = y$.

Substitute into constraint: $2x = 4 \implies x = 2, y = 2$.

Check: $f(2, 2) = 8$, and $\sqrt{8} = 2\sqrt{2}$ is the distance.

**Minimum distance**: $2\sqrt{2}$ at $(2, 2)$.

### Example 3: Maximum Temperature

Find the maximum value of $T(x, y) = 100 - x^2 - y^2$ on the ellipse $\frac{x^2}{4} + y^2 = 1$.

Let $g(x, y) = \frac{x^2}{4} + y^2$.

$$\nabla T = \langle -2x, -2y \rangle, \quad \nabla g = \left\langle \frac{x}{2}, 2y \right\rangle$$

System:

$$-2x = \lambda \frac{x}{2} \quad (1)$$
$$-2y = \lambda(2y) \quad (2)$$
$$\frac{x^2}{4} + y^2 = 1 \quad (3)$$

From (1): If $x \neq 0$, $-2 = \lambda/2 \implies \lambda = -4$.

From (2): If $y \neq 0$, $-2 = 2\lambda \implies \lambda = -1$.

These contradict unless $x = 0$ or $y = 0$.

**Case 1**: $x = 0$. From (3): $y^2 = 1 \implies y = \pm 1$.

$$T(0, 1) = T(0, -1) = 100 - 1 = 99$$

**Case 2**: $y = 0$. From (3): $x^2/4 = 1 \implies x = \pm 2$.

$$T(2, 0) = T(-2, 0) = 100 - 4 = 96$$

**Maximum**: $99$ at $(0, \pm 1)$.

## Three Variables

For $f(x, y, z)$ subject to $g(x, y, z) = k$:

$$\nabla f = \lambda \nabla g$$
$$g(x, y, z) = k$$

This gives four equations in four unknowns.

### Example 4: Box Volume

Maximize the volume $V = xyz$ of a box inscribed in the ellipsoid $\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$ (box in the first octant).

Due to symmetry, the maximum occurs at:

$$x = \frac{a}{\sqrt{3}}, \quad y = \frac{b}{\sqrt{3}}, \quad z = \frac{c}{\sqrt{3}}$$

$$V_{\max} = \frac{8abc}{3\sqrt{3}}$$

(Full derivation involves Lagrange multipliers or symmetry arguments.)

## Interpretation of $\lambda$

The Lagrange multiplier $\lambda$ represents the **rate of change of the optimal value** with respect to the constraint level $k$:

$$\lambda = \frac{d(\text{optimal } f)}{dk}$$

In economics, $\lambda$ is called the **shadow price**: it measures how much the objective function would improve if the constraint were relaxed slightly.

### Example 5

For maximizing production subject to a budget constraint, $\lambda$ indicates how much additional production could be achieved per dollar of additional budget.

## Constrained Optimization vs. Unconstrained

### Unconstrained

Find critical points where $\nabla f = \mathbf{0}$.

### Constrained

Find points where $\nabla f = \lambda \nabla g$ on the constraint surface.

The constraint reduces the feasible region, and extrema occur where level curves of $f$ are tangent to the constraint curve.

## Limitations and Caveats

### Lagrange Only Finds Candidates

Lagrange multipliers identify critical points, not necessarily extrema. You must:
1. Solve the system
2. Evaluate $f$ at all candidate points
3. Compare values to identify max/min

### Constraint Must Be Satisfied

Always verify that solutions satisfy the constraint equation $g(x, y) = k$.

### Multiple Constraints

Handled by introducing multiple multipliers (next topic).

## Applications

### Economics

- **Utility maximization**: Maximize $U(x_1, x_2)$ subject to budget $p_1x_1 + p_2x_2 = I$
- **Cost minimization**: Minimize cost subject to production requirement

### Physics

- **Constrained mechanics**: Particle motion on a surface
- **Thermodynamics**: Entropy maximization subject to energy conservation

### Engineering

- **Design optimization**: Minimize material subject to strength requirements
- **Signal processing**: Optimize filter response subject to bandwidth constraints

## Summary

The method of Lagrange multipliers solves constrained optimization problems by introducing a multiplier $\lambda$ and solving $\nabla f = \lambda \nabla g$ along with the constraint $g = k$. Geometrically, extrema occur where level curves of $f$ are tangent to the constraint curve, i.e., where $\nabla f \parallel \nabla g$. The method provides candidates for extrema; evaluating $f$ at these points identifies the actual maximum and minimum. The multiplier $\lambda$ has an economic interpretation as the shadow price. Lagrange multipliers are fundamental for optimization in economics, physics, and engineering, enabling solution of problems where direct methods are infeasible.
