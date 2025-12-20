---
id: math301-topic-4-5
title: "Constrained Optimization"
order: 5
---

# Constrained Optimization with Single Constraint

## Introduction

Constrained optimization problems arise naturally throughout science, engineering, and economics when we seek to optimize an objective function while satisfying physical, economic, or geometric constraints. This topic explores the theory and practice of single-constraint optimization using Lagrange multipliers, developing the mathematical framework, geometric intuition, and computational techniques. Understanding constrained optimization is essential for solving real-world problems where resources are limited or physical laws impose restrictions.

## Problem Formulation

### General Form

**Optimize** $f(\mathbf{x})$ **subject to** $g(\mathbf{x}) = c$

where:
- $f$ is the **objective function** (quantity to maximize or minimize)
- $g(\mathbf{x}) = c$ is the **constraint equation**
- $\mathbf{x} = (x_1, \ldots, x_n)$ represents decision variables

### Two Variables

Optimize $f(x, y)$ subject to $g(x, y) = k$.

### Three Variables

Optimize $f(x, y, z)$ subject to $g(x, y, z) = k$.

## Lagrange Function

### Definition

The **Lagrangian** or **Lagrange function** combines the objective and constraint:

$$\mathcal{L}(x, y, \lambda) = f(x, y) - \lambda(g(x, y) - k)$$

The factor $\lambda$ is the **Lagrange multiplier**.

### Alternative Form

Sometimes written as:

$$\mathcal{L}(x, y, \lambda) = f(x, y) + \lambda(k - g(x, y))$$

Both forms are equivalent; the sign of $\lambda$ may differ.

### Optimality Conditions

Critical points of $\mathcal{L}$ satisfy:

$$\frac{\partial \mathcal{L}}{\partial x} = 0, \quad \frac{\partial \mathcal{L}}{\partial y} = 0, \quad \frac{\partial \mathcal{L}}{\partial \lambda} = 0$$

This gives:

$$f_x = \lambda g_x$$
$$f_y = \lambda g_y$$
$$g(x, y) = k$$

These are the Lagrange multiplier equations.

## Geometric Interpretation

### Level Curves

At the optimum, the level curve of $f$ is **tangent** to the constraint curve $g(x, y) = k$.

### Gradients

At the optimum:

$$\nabla f = \lambda \nabla g$$

The gradients are parallel, meaning they point in the same (or opposite) directions.

### Why Tangency?

If level curves of $f$ crossed the constraint curve transversely, we could move along the constraint to increase/decrease $f$ further. The optimum occurs when no such improvement is possible, i.e., when the curves are tangent.

## Step-by-Step Procedure

### Solving Constrained Optimization Problems

1. **Set up the system**: Write $\nabla f = \lambda \nabla g$ and $g(x, y) = k$
2. **Solve algebraically**: Use substitution, elimination, or other techniques
3. **Find critical points**: Determine all $(x, y, \lambda)$ satisfying the system
4. **Evaluate $f$**: Compute $f$ at each critical point
5. **Compare values**: Identify maximum and minimum

## Examples

### Example 1: Maximize Product

Maximize $f(x, y) = x^2y$ subject to $x^2 + y^2 = 3$.

$$\nabla f = \langle 2xy, x^2 \rangle, \quad \nabla g = \langle 2x, 2y \rangle$$

System:

$$2xy = 2\lambda x \quad (1)$$
$$x^2 = 2\lambda y \quad (2)$$
$$x^2 + y^2 = 3 \quad (3)$$

From (1): If $x \neq 0$, $y = \lambda$.

Substitute into (2): $x^2 = 2\lambda^2 = 2y^2$.

Substitute into (3): $2y^2 + y^2 = 3 \implies y^2 = 1 \implies y = \pm 1$.

If $y = 1$: $x^2 = 2$, so $x = \pm\sqrt{2}$.

If $y = -1$: $x^2 = 2$, so $x = \pm\sqrt{2}$.

Also check $x = 0$: From (2), $0 = 2\lambda y$. If $y \neq 0$, $\lambda = 0$, but (1) becomes $0 = 0$ (satisfied). From (3), $y^2 = 3$, so $y = \pm\sqrt{3}$.

Candidates:
- $(\sqrt{2}, 1)$: $f = 2$
- $(-\sqrt{2}, 1)$: $f = 2$
- $(\sqrt{2}, -1)$: $f = -2$
- $(-\sqrt{2}, -1)$: $f = -2$
- $(0, \sqrt{3})$: $f = 0$
- $(0, -\sqrt{3})$: $f = 0$

**Maximum**: $2$ at $(\pm\sqrt{2}, 1)$
**Minimum**: $-2$ at $(\pm\sqrt{2}, -1)$

### Example 2: Minimize Distance to Curve

Find the points on $y = x^2$ closest to $(0, 2)$.

Minimize $f(x, y) = (x - 0)^2 + (y - 2)^2$ subject to $g(x, y) = y - x^2 = 0$.

$$\nabla f = \langle 2x, 2(y-2) \rangle, \quad \nabla g = \langle -2x, 1 \rangle$$

System:

$$2x = -2\lambda x \quad (1)$$
$$2(y-2) = \lambda \quad (2)$$
$$y = x^2 \quad (3)$$

From (1): $2x(1 + \lambda) = 0$, so $x = 0$ or $\lambda = -1$.

**Case 1**: $x = 0$. From (3), $y = 0$. From (2), $\lambda = -4$.

Point: $(0, 0)$ with $f(0, 0) = 4$.

**Case 2**: $\lambda = -1$. From (2), $2(y-2) = -1 \implies y = 3/2$. From (3), $x^2 = 3/2 \implies x = \pm\sqrt{3/2}$.

Points: $(\pm\sqrt{3/2}, 3/2)$ with $f = 3/2 + 1/4 = 7/4 = 1.75$.

**Minimum distance**: $\sqrt{7/4} \approx 1.32$ at $(\pm\sqrt{3/2}, 3/2)$.

### Example 3: Three Variables

Minimize $f(x, y, z) = x^2 + y^2 + z^2$ subject to $x + y + z = 9$.

$$\nabla f = \langle 2x, 2y, 2z \rangle, \quad \nabla g = \langle 1, 1, 1 \rangle$$

System:

$$2x = \lambda, \quad 2y = \lambda, \quad 2z = \lambda$$
$$x + y + z = 9$$

From the first three: $x = y = z = \lambda/2$.

Substitute: $3(\lambda/2) = 9 \implies \lambda = 6 \implies x = y = z = 3$.

**Minimum**: $f(3, 3, 3) = 27$ at $(3, 3, 3)$.

(This minimizes distance from origin to the plane $x + y + z = 9$.)

## Second-Order Conditions

For constrained problems, the bordered Hessian can determine whether critical points are maxima, minima, or saddle points. This involves more advanced analysis beyond the scope of this introduction.

## Economic Applications

### Utility Maximization

Consumer has utility $U(x, y)$ and budget $p_xx + p_yy = I$.

Maximize $U(x, y)$ subject to $p_xx + p_yy = I$.

Optimality:

$$\frac{U_x}{U_y} = \frac{p_x}{p_y}$$

The ratio of marginal utilities equals the price ratio.

### Cost Minimization

Firm minimizes cost $C(L, K) = wL + rK$ subject to production constraint $Q(L, K) = q_0$.

Optimality:

$$\frac{Q_L}{Q_K} = \frac{w}{r}$$

### Example 4: Cobb-Douglas

Maximize $U(x, y) = x^{1/2}y^{1/2}$ subject to $2x + 3y = 120$.

$$\nabla U = \left\langle \frac{1}{2}x^{-1/2}y^{1/2}, \frac{1}{2}x^{1/2}y^{-1/2} \right\rangle, \quad \nabla g = \langle 2, 3 \rangle$$

$$\frac{1}{2}x^{-1/2}y^{1/2} = 2\lambda$$
$$\frac{1}{2}x^{1/2}y^{-1/2} = 3\lambda$$

Dividing:

$$\frac{y}{x} = \frac{2}{3} \implies y = \frac{2x}{3}$$

Substitute into budget:

$$2x + 3 \cdot \frac{2x}{3} = 120 \implies 4x = 120 \implies x = 30, y = 20$$

**Maximum**: $U(30, 20) = \sqrt{600} \approx 24.5$ at $(30, 20)$.

## Physical Applications

### Minimum Surface Area

Find the dimensions of a cylindrical can with volume $V = \pi r^2 h = 1000$ cm³ that minimize surface area $S = 2\pi r^2 + 2\pi rh$.

Using Lagrange multipliers or substitution leads to optimal $r$ and $h$.

## Advantages of Lagrange Multipliers

- **Avoids substitution**: No need to solve constraint for one variable
- **Symmetric treatment**: All variables treated equally
- **Generalizes easily**: Extends to multiple constraints
- **Economic interpretation**: $\lambda$ has meaningful interpretation

## Summary

Constrained optimization with a single constraint seeks extrema of $f(\mathbf{x})$ subject to $g(\mathbf{x}) = k$. The method of Lagrange multipliers transforms this into solving $\nabla f = \lambda \nabla g$ along with the constraint. Geometrically, extrema occur where level curves/surfaces of $f$ are tangent to the constraint. The Lagrangian function $\mathcal{L} = f - \lambda(g - k)$ combines objective and constraint. Applications include utility maximization in economics, cost minimization, and geometric optimization problems. The multiplier $\lambda$ measures sensitivity of the optimal value to changes in the constraint level.
