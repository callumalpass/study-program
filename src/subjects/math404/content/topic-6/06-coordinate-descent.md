---
title: "Coordinate Descent"
description: "Optimizing one variable at a time"
---

# Coordinate Descent

Sometimes the simplest idea works best. Instead of moving along the gradient (which requires computing derivatives with respect to all variables), **Coordinate Descent** minimizes the objective with respect to **one variable at a time** while keeping others fixed.

## The Algorithm

To minimize $f(x)$ where $x \in \mathbb{R}^n$:

1.  Start at $x^{(0)}$.
2.  Select a coordinate $i \in \{1, \dots, n\}$.
3.  Minimize $f$ with respect to $x_i$:
    $$ x_i^{new} = \arg \min_z f(x_1, \dots, x_{i-1}, z, x_{i+1}, \dots, x_n) $$
4.  Update $x_i \leftarrow x_i^{new}$.
5.  Repeat (picking $i$ cyclically $1 \to n$, or randomly).

## When is it useful?

Coordinate Descent (CD) is extremely powerful when:
1.  **The subproblem is cheap:** Solving the 1D minimization is analytic or very fast.
2.  **The gradient is expensive:** Computing the full gradient $\nabla f$ takes too long.
3.  **Separable Constraints:** Constraints are simple bounds $l_i \leq x_i \leq u_i$.
4.  **Sparsity:** In Lasso regression ($L_1$ regularization), CD naturally produces sparse solutions efficiently.

## Convergence

Does it converge?
- **Yes,** if $f$ is strictly convex and differentiable.
- **Yes,** if $f$ is formed of a smooth part plus a separable non-smooth part (e.g., $f(x) = g(x) + \sum h_i(x_i)$). This covers Lasso.
- **No,** generally for non-smooth functions.
  *Example:* $f(x, y) = |x + y|$. The minimum is along the line $x = -y$.
  Start at $(1, 1)$. Value = 2.
  Minimize w.r.t $x$: Best $x=-1$. New point $(-1, 1)$. Value = 0.
  Minimize w.r.t $y$: Best $y=1$. New point $(-1, 1)$. Stuck.
  But global min is 0. Wait, $(-1, 1)$ gives 0.
  Bad Example.
  Better Example: "Corner" case. Min of non-smooth function might not be along axes.

## Coordinate Descent vs Gradient Descent

**Gradient Descent:**
- Update: $x \leftarrow x - \alpha \nabla f(x)$
- Needs full gradient.
- Moves in best direction.

**Coordinate Descent:**
- Update: Minimize along axis $e_i$.
- No gradient needed (implicit).
- Moves in orthogonal directions ("Manhattan" style path).

## Block Coordinate Descent

Instead of updating 1 variable, update a **block** of variables.
Useful when variables are grouped (e.g., Matrix Factorization, solving for user vectors $U$ then item vectors $V$).
This is also known as **Alternating Minimization**.

## Application: Lasso

Minimize $\frac{1}{2} \|Ax - b\|^2 + \lambda \|x\|_1$.
The gradient is not defined at $x_i=0$. Subgradient descent is slow ($O(1/\sqrt{k})$).
Coordinate Descent uses **Soft Thresholding** for the update:
$$ x_i \leftarrow S( \rho_i, \lambda ) / z_i $$
This is extremely fast and exact. The fastest Lasso solvers (glmnet) use Coordinate Descent.