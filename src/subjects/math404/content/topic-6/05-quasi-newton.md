---
title: "Quasi-Newton Methods"
description: "BFGS and methods avoiding Hessian computation"
---

# Quasi-Newton Methods

Newton's method is fast (quadratic convergence) but expensive (Hessian computation $O(n^2)$ and inversion $O(n^3)$).
Gradient Descent is cheap ($O(n)$) but slow (linear convergence).

**Quasi-Newton Methods** strike a balance. They achieve **superlinear convergence** while only using gradient information ($O(n^2)$ or $O(n)$ per step).

## The Idea

Instead of computing the true Hessian $H = \nabla^2 f(x)$, we maintain an **approximation** $B_k \approx H_k$.
At each step, we update $B_k$ to satisfy the **Secant Equation**.

Let:
- $s_k = x_{k+1} - x_k$ (Step taken)
- $y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$ (Change in gradient)

By Taylor expansion: $\nabla f(x_{k+1}) \approx \nabla f(x_k) + H_k(x_{k+1} - x_k)$.
So we require our approximation to satisfy:
$$ B_{k+1} s_k = y_k $$
(The matrix should map the step to the gradient change).

There are many matrices $B_{k+1}$ that satisfy this. We want the one closest to the current $B_k$.

## BFGS (Broyden-Fletcher-Goldfarb-Shanno)

BFGS is the most popular Quasi-Newton algorithm.
Instead of updating $B_k$, it's often easier to update the **inverse Hessian approximation** $H_k \approx (\nabla^2 f)^{-1}$ directly. (Note: standard notation usually flips: $B$ for Hessian, $H$ for inverse. I will use $H$ for inverse here).

**Update Rule:**
$$ H_{k+1} = (I - \rho_k s_k y_k^T) H_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T $$
where $\rho_k = \frac{1}{y_k^T s_k}$.

**Properties:**
1.  **Positive Definite:** If $H_k \succ 0$ and $y_k^T s_k > 0$ (curvature condition), then $H_{k+1} \succ 0$.
2.  **Cost:** Matrix-vector ops and rank-2 updates. $O(n^2)$ per iteration.
3.  **Convergence:** Superlinear.

## L-BFGS (Limited-memory BFGS)

For very large problems ($n > 1000$), storing the $n \times n$ matrix $H_k$ is too expensive.
**L-BFGS** does not store the matrix. Instead, it stores the last $m$ pairs of vectors $(s_i, y_i)$ (typically $m=10$).
Using these vectors, it computes the product $H_k \nabla f_k$ on the fly using a two-loop recursion.

- **Memory:** $O(mn)$.
- **Time:** $O(mn)$.
- **Convergence:** Linear (but very fast constant). Often better than pure Gradient Descent.
- **Industry Standard:** This is the default solver for large-scale machine learning (e.g., logistic regression in sklearn).

## DFP (Davidon-Fletcher-Powell)

The precursor to BFGS. It updates the Hessian approximation $B_k$ (not the inverse). It is the "dual" of BFGS. Generally less robust than BFGS.

## SR1 (Symmetric Rank-1)

A simpler rank-1 update.
$$ B_{k+1} = B_k + \frac{(y_k - B_k s_k)(y_k - B_k s_k)^T}{(y_k - B_k s_k)^T s_k} $$
- **Pros:** Does not require positive definiteness. Good for non-convex problems or trust-region methods.
- **Cons:** Denominator can vanish.

## Summary

If you have a smooth, unconstrained optimization problem:
- $n < 1000$: Use **BFGS**.
- $n \geq 1000$: Use **L-BFGS**.
- Only use Gradient Descent if you really can't afford $O(mn)$ memory or if the problem is extremely simple.