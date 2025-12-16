# Optimization with Multiple Constraints

## Introduction

Many real-world optimization problems involve multiple simultaneous constraints. For instance, manufacturing might require meeting multiple specifications, resource allocation problems often have several budget limitations, and physical systems may be governed by multiple conservation laws. The method of Lagrange multipliers extends naturally to handle multiple constraints by introducing one multiplier for each constraint, though the resulting systems become more complex. This topic develops the theory and techniques for multi-constraint optimization.

## Problem Formulation

### General Form

**Optimize** $f(\mathbf{x})$ **subject to**:
$$g_1(\mathbf{x}) = c_1$$
$$g_2(\mathbf{x}) = c_2$$
$$\vdots$$
$$g_m(\mathbf{x}) = c_m$$

where $f$ is the objective function and $g_1, \ldots, g_m$ are constraint functions.

### Two Constraints in Three Variables

The most common case:

Optimize $f(x, y, z)$ subject to:
$$g(x, y, z) = k_1$$
$$h(x, y, z) = k_2$$

## Lagrange Multipliers for Two Constraints

### Theorem

If $f(x, y, z)$ has an extremum at $(x_0, y_0, z_0)$ subject to constraints $g = k_1$ and $h = k_2$, and if $\nabla g$ and $\nabla h$ are linearly independent at $(x_0, y_0, z_0)$, then there exist constants $\lambda$ and $\mu$ such that:

$$\nabla f = \lambda \nabla g + \mu \nabla h$$

### System of Equations

This gives **five equations** in **five unknowns** $(x, y, z, \lambda, \mu)$:

$$f_x = \lambda g_x + \mu h_x$$
$$f_y = \lambda g_y + \mu h_y$$
$$f_z = \lambda g_z + \mu h_z$$
$$g(x, y, z) = k_1$$
$$h(x, y, z) = k_2$$

### Geometric Interpretation

The two constraints define curves in 3D space (intersection of two surfaces). The extremum occurs where $\nabla f$ lies in the plane spanned by $\nabla g$ and $\nabla h$, i.e., $\nabla f$ is a linear combination of the constraint gradients.

## Examples

### Example 1: Maximize on Intersection

Maximize $f(x, y, z) = x + 2y + 3z$ subject to:
$$x^2 + y^2 = 5$$
$$x + z = 1$$

$$\nabla f = \langle 1, 2, 3 \rangle$$

$$\nabla g = \langle 2x, 2y, 0 \rangle \quad (g = x^2 + y^2)$$

$$\nabla h = \langle 1, 0, 1 \rangle \quad (h = x + z)$$

System:

$$1 = 2\lambda x + \mu \quad (1)$$
$$2 = 2\lambda y \quad (2)$$
$$3 = \mu \quad (3)$$
$$x^2 + y^2 = 5 \quad (4)$$
$$x + z = 1 \quad (5)$$

From (3): $\mu = 3$.

From (1): $1 = 2\lambda x + 3 \implies \lambda x = -1 \implies x = -1/\lambda$.

From (2): $\lambda y = 1 \implies y = 1/\lambda$.

Substitute into (4):

$$\frac{1}{\lambda^2} + \frac{1}{\lambda^2} = 5 \implies \frac{2}{\lambda^2} = 5 \implies \lambda^2 = \frac{2}{5} \implies \lambda = \pm\sqrt{2/5}$$

If $\lambda = \sqrt{2/5}$:

$$x = -\sqrt{5/2}, \quad y = \sqrt{5/2}$$

From (5): $z = 1 - x = 1 + \sqrt{5/2}$

$$f = -\sqrt{5/2} + 2\sqrt{5/2} + 3(1 + \sqrt{5/2}) = \sqrt{5/2} + 3 + 3\sqrt{5/2} = 3 + 4\sqrt{5/2}$$

If $\lambda = -\sqrt{2/5}$:

$$x = \sqrt{5/2}, \quad y = -\sqrt{5/2}$$

$$z = 1 - \sqrt{5/2}$$

$$f = \sqrt{5/2} - 2\sqrt{5/2} + 3(1 - \sqrt{5/2}) = 3 - 4\sqrt{5/2}$$

**Maximum**: $3 + 4\sqrt{5/2} \approx 9.32$ at $(-\sqrt{5/2}, \sqrt{5/2}, 1 + \sqrt{5/2})$

### Example 2: Minimum Distance

Find the point on the curve of intersection of $x^2 + y^2 = 1$ and $x + y + z = 1$ closest to the origin.

Minimize $f(x, y, z) = x^2 + y^2 + z^2$ subject to:
$$g: x^2 + y^2 = 1$$
$$h: x + y + z = 1$$

$$\nabla f = \langle 2x, 2y, 2z \rangle, \quad \nabla g = \langle 2x, 2y, 0 \rangle, \quad \nabla h = \langle 1, 1, 1 \rangle$$

System:

$$2x = 2\lambda x + \mu$$
$$2y = 2\lambda y + \mu$$
$$2z = \mu$$
$$x^2 + y^2 = 1$$
$$x + y + z = 1$$

From the third equation: $\mu = 2z$.

From the first two:

$$2x(1 - \lambda) = 2z$$
$$2y(1 - \lambda) = 2z$$

If $\lambda \neq 1$: $x = y = \frac{z}{1 - \lambda}$.

From constraint 1: $2x^2 = 1 \implies x = \pm 1/\sqrt{2}$.

From constraint 2: $2x + z = 1 \implies z = 1 - 2x$.

If $x = 1/\sqrt{2}$: $z = 1 - \sqrt{2}$, and $x = y = 1/\sqrt{2}$.

$$f = 1/2 + 1/2 + (1 - \sqrt{2})^2 = 1 + 1 - 2\sqrt{2} + 2 = 4 - 2\sqrt{2} \approx 1.17$$

If $x = -1/\sqrt{2}$: $z = 1 + \sqrt{2}$, and $x = y = -1/\sqrt{2}$.

$$f = 1/2 + 1/2 + (1 + \sqrt{2})^2 = 1 + 1 + 2\sqrt{2} + 2 = 4 + 2\sqrt{2} \approx 6.83$$

**Minimum distance**: $\sqrt{4 - 2\sqrt{2}} \approx 1.08$ at $(1/\sqrt{2}, 1/\sqrt{2}, 1 - \sqrt{2})$.

### Example 3: Economics - Multiple Resource Constraints

Maximize production $P(L, K) = L^{0.3}K^{0.7}$ subject to:
$$2L + 3K = 120 \quad \text{(budget)}$$
$$L + K \le 50 \quad \text{(capacity)}$$

(If the inequality constraint is active, treat it as an equality and apply Lagrange multipliers; otherwise, solve with just the equality constraint.)

## Three or More Constraints

For $m$ constraints $g_1 = c_1, \ldots, g_m = c_m$:

$$\nabla f = \lambda_1 \nabla g_1 + \lambda_2 \nabla g_2 + \cdots + \lambda_m \nabla g_m$$

This gives $n + m$ equations in $n + m$ unknowns (where $n$ is the dimension of $\mathbf{x}$).

### Example 4: Four Variables, Two Constraints

Minimize $f(x, y, z, w) = x^2 + y^2 + z^2 + w^2$ subject to:
$$x + y + z + w = 4$$
$$x + y = z + w$$

By symmetry, the solution is $x = y = z = w = 1$, giving $f = 4$.

## Lagrangian Function

For multiple constraints:

$$\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda}) = f(\mathbf{x}) - \sum_{i=1}^{m} \lambda_i(g_i(\mathbf{x}) - c_i)$$

Critical points satisfy:

$$\nabla_{\mathbf{x}} \mathcal{L} = \mathbf{0}$$
$$\nabla_{\boldsymbol{\lambda}} \mathcal{L} = \mathbf{0}$$

The second set of equations recovers the constraints.

## Interpretation of Multipliers

Each $\lambda_i$ represents the sensitivity of the optimal value to changes in the corresponding constraint $c_i$:

$$\lambda_i \approx \frac{\partial f^*}{\partial c_i}$$

In economics, these are **shadow prices** for each resource.

## Linear Independence Condition

The constraint qualification requires $\nabla g_1, \ldots, \nabla g_m$ to be linearly independent at the optimum. This ensures the constraints define a well-behaved feasible set.

If this fails, the method may not work, and more sophisticated techniques are needed.

## Applications

### Engineering Design

Optimize performance subject to multiple specifications:
- Strength requirements
- Weight limitations
- Cost constraints
- Safety factors

### Portfolio Optimization

Maximize return subject to:
- Total investment budget
- Risk tolerance
- Diversification requirements
- Regulatory constraints

### Physics: Constrained Mechanics

Particle motion subject to:
- Staying on a surface (holonomic constraint)
- Conservation of energy
- Conservation of momentum

### Example 5: Rocket Trajectory

Minimize fuel consumption subject to:
- Reaching target position
- Achieving target velocity
- Thrust limitations
- Atmospheric constraints

## Computational Complexity

With $m$ constraints and $n$ variables, we solve a system of $n + m$ equations. As $m$ and $n$ grow, numerical methods become essential:

- **Newton's method** for systems
- **Sequential quadratic programming**
- **Interior point methods**

## Summary

Optimization with multiple constraints extends Lagrange multipliers by introducing one multiplier per constraint. For $m$ constraints, we solve $\nabla f = \sum_{i=1}^{m} \lambda_i \nabla g_i$ along with the $m$ constraint equations. This gives $n + m$ equations in $n + m$ unknowns. Geometrically, extrema occur where $\nabla f$ lies in the span of the constraint gradients. Each multiplier $\lambda_i$ represents the shadow price of the corresponding constraint. Applications include engineering design with multiple specifications, economics with several resource constraints, and physics with multiple conservation laws. As the number of constraints grows, numerical solution methods become necessary.
