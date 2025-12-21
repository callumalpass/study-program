---
title: "Augmented Lagrangian"
description: "Improving convergence and stability of dual methods"
---

# Augmented Lagrangian

Standard Dual Ascent methods (optimizing the dual function) can be slow or unstable because the dual function is non-smooth. **Augmented Lagrangian** methods fix this by adding a "convexification" term to the primal, which smooths the dual.

## Motivation

Consider equality constrained problem:
$$ \min f(x) \quad \text{s.t.} \quad Ax = b $$

Lagrangian: $L(x, y) = f(x) + y^T (Ax - b)$.
Dual Ascent update:
$x_{k+1} = \arg \min_x L(x, y_k)$
$y_{k+1} = y_k + \alpha (Ax_{k+1} - b)$

Problem: If $f(x)$ is linear ($c^T x$), $\min L$ is unbounded ($-\infty$) unless coefficients match perfectly. The dual is extremely sharp.

## The Augmented Lagrangian

Add a quadratic penalty term $\frac{\rho}{2} \|Ax - b\|^2$.
Since $Ax=b$ is feasible, this term is zero at the solution. It doesn't change the optimum.

$$ L_\rho(x, y) = f(x) + y^T (Ax - b) + \frac{\rho}{2} \|Ax - b\|^2 $$

This is the **Augmented Lagrangian**.
Even if $f$ is linear, $L_\rho$ is strictly convex in $x$ (for $\rho > 0$ and full rank $A$).

## Method of Multipliers

The algorithm is:

1.  **x-update:** Minimize the augmented Lagrangian.
    $$ x_{k+1} = \arg \min_x L_\rho(x, y_k) $$
2.  **y-update:** Update dual variables.
    $$ y_{k+1} = y_k + \rho (Ax_{k+1} - b) $$

**Note:** The step size for $y$ is exactly $\rho$. This is not arbitrary; it comes from the optimality condition.
$\nabla_x L_\rho(x_{k+1}, y_k) = \nabla f(x_{k+1}) + A^T y_k + \rho A^T (Ax_{k+1} - b) = 0$
Rearranging:
$\nabla f(x_{k+1}) + A^T (y_k + \rho (Ax_{k+1} - b)) = 0$
Compare to KKT condition: $\nabla f(x^*) + A^T y^* = 0$.
We see that $y_{k+1} = y_k + \rho (Ax_{k+1} - b)$ effectively estimates $y^*$.

## Advantages

1.  **Convexification:** Works even if $f$ is not strictly convex.
2.  **Robustness:** Much more stable than pure penalty methods (where $\rho \to \infty$ is needed, causing ill-conditioning). Here, $\rho$ can be moderate because $y_k$ does the heavy lifting.
3.  **ADMM:** This leads directly to the Alternating Direction Method of Multipliers.

## ADMM (Alternating Direction Method of Multipliers)

If $f(x)$ separates into $f(x) + g(z)$ with constraint $Ax + Bz = c$.
Augmented Lagrangian has term $\|Ax + Bz - c\|^2$, which couples $x$ and $z$ (quadratic cross term).
Minimizing jointly over $(x, z)$ is hard.
**ADMM** minimizes alternatingly:

1.  $x_{k+1} = \arg \min_x L_\rho(x, z_k, y_k)$
2.  $z_{k+1} = \arg \min_z L_\rho(x_{k+1}, z, y_k)$
3.  $y_{k+1} = y_k + \rho (Ax_{k+1} + Bz_{k+1} - c)$

This algorithm is the standard for large-scale distributed optimization.