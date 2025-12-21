---
title: "Line Search Methods"
description: "Strategies for choosing the step size"
---

# Line Search Methods

In many optimization algorithms (Gradient Descent, Newton's Method, Conjugate Gradient), the update rule is:
$$ x_{k+1} = x_k + \alpha_k p_k $$
where $p_k$ is a search direction (e.g., $-\nabla f$) and $\alpha_k > 0$ is the **step length**.

Choosing $\alpha_k$ is a 1D optimization problem:
$$ \phi(\alpha) = f(x_k + \alpha p_k) $$
We want to find $\alpha > 0$ that significantly reduces $\phi(\alpha)$.

## Exact Line Search

The ideal choice is the global minimizer:
$$ \alpha^* = \arg \min_{\alpha > 0} \phi(\alpha) $$
This is called **Exact Line Search**.
- **Pros:** Guaranteed best reduction.
- **Cons:** Expensive. Requires iterating inside an iteration.
- **Use case:** Only when the minimization is cheap (e.g., quadratic functions).

For a quadratic $f(x) = \frac{1}{2}x^T Q x - b^T x$, the optimal $\alpha$ has a closed form:
$$ \alpha^* = \frac{g_k^T g_k}{g_k^T Q g_k} $$
(for Steepest Descent).

## Inexact Line Search

In practice, we don't need the *best* $\alpha$; we just need a *good* one that guarantees convergence. This is **Inexact Line Search**.
We rely on conditions that ensure we make "sufficient progress."

### 1. Sufficient Decrease (Armijo Condition)

We require that the function value decreases at least proportional to the slope at $\alpha=0$.
$$ f(x_k + \alpha p_k) \leq f(x_k) + c_1 \alpha \nabla f(x_k)^T p_k $$
where $c_1 \in (0, 1)$ (typically $10^{-4}$). 

Geometric meaning: The function value must lie below the line starting at $f(x_k)$ with slope $c_1 \nabla f^T p$.
This ensures we don't take a step that increases $f$ or decreases it negligibly.

However, this condition is satisfied for very small $\alpha$. To avoid tiny steps, we need a second condition.

### 2. Curvature Condition (Wolfe Condition)

We ensure the slope at the new point is less steep than the initial slope (or at least, has increased significantly).
$$ \nabla f(x_k + \alpha p_k)^T p_k \geq c_2 \nabla f(x_k)^T p_k $$
where $c_2 \in (c_1, 1)$ (typically $0.9$ for Newton, $0.1$ for Conjugate Gradient).

Meaning: We've gone far enough that the descent is slowing down. If the slope is still very negative, we should go further.

**Strong Wolfe Conditions:**
Force the slope to be small in magnitude (close to zero).
$$ |\nabla f(x_k + \alpha p_k)^T p_k| \leq c_2 |\nabla f(x_k)^T p_k| $$

## Backtracking Line Search

This is the simplest and most common implementation of the Armijo condition.

**Algorithm:**
1.  Choose parameters $\bar{\alpha} > 0$ (e.g., 1), $\rho \in (0, 1)$ (e.g., 0.5), $c \in (0, 1)$ (e.g., $10^{-4}$).
2.  Set $\alpha \leftarrow \bar{\alpha}$.
3.  While $f(x_k + \alpha p_k) > f(x_k) + c \alpha \nabla f(x_k)^T p_k$:
    - $\alpha \leftarrow \rho \alpha$ (Shrink step).
4.  Return $\alpha_k = \alpha$.

**Why it works:**
Since $p_k$ is a descent direction ($\nabla f^T p < 0$), for sufficiently small $\alpha$, the condition will hold (Taylor's theorem). The loop always terminates.

## Comparison

- **Constant Step Size:** No computation cost, but dangerous. Can diverge or crawl.
- **Exact Line Search:** Too expensive for general non-linear functions.
- **Backtracking:** Good balance. Robust.
- **Wolfe Search:** More complex to implement (requires zooming in/out), but theoretically superior for Quasi-Newton methods (BFGS) because it preserves positive definiteness of the Hessian approximation.

## Implementation Note

In code (Python/SciPy):
- Simple implementation: Use Backtracking.
- Library implementation: `scipy.optimize.line_search` uses Wolfe conditions (More-Thuente algorithm).

```