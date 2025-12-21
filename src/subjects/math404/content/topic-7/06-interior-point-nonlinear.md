---
title: "Interior Point Methods"
description: "Solving non-linear convex problems efficiently"
---

# Interior Point Methods

Interior Point Methods (IPMs) revolutionized optimization. Before 1984, Linear Programming was solved by the Simplex Method (exponential worst-case, visits vertices). Karmarkar introduced an algorithm that cuts through the interior of the feasible set, achieving polynomial time complexity. This was later generalized to convex non-linear problems.

## The Barrier Problem

Minimize $f_0(x)$ subject to $f_i(x) \leq 0$ and $Ax = b$.

We convert inequalities to a barrier term in the objective:
$$ \min \quad t f_0(x) - \sum_{i=1}^m \log(-f_i(x)) $$
$$ \text{s.t.} \quad Ax = b $$

Here, $t > 0$ is a parameter (inverse of $\mu$ in previous topic). As $t \to \infty$, we recover the original problem.

## Optimality Conditions (KKT)

The KKT conditions for the barrier problem are:
1.  $\nabla (t f_0(x) - \sum \log(-f_i(x))) + A^T \nu = 0$
    $t \nabla f_0(x) + \sum \frac{1}{-f_i(x)} \nabla f_i(x) + A^T \nu = 0$
2.  $Ax = b$

Let's define dual variables $\lambda_i = \frac{1}{-t f_i(x)}$.
Note that since $f_i(x) < 0$ and $t > 0$, we have $\lambda_i > 0$ (Strictly dual feasible).
Rearranging: $-\lambda_i f_i(x) = 1/t$.

So the conditions become:
1.  $\nabla f_0(x) + \sum \lambda_i \nabla f_i(x) + A^T (\nu/t) = 0$ (Stationarity)
2.  $Ax = b$ (Primal Feasibility)
3.  $-\lambda_i f_i(x) = 1/t$ (Perturbed Complementary Slackness)

Compare to original KKT:
Original: $\lambda_i f_i(x) = 0$.
Barrier: $\lambda_i f_i(x) = -1/t$.
As $t \to \infty$, $1/t \to 0$, and we approach the true solution.

## Primal-Dual Interior Point Methods

Instead of solving the barrier minimization for a sequence of $t$'s (which takes many Newton steps per $t$), we can solve the perturbed KKT system directly using Newton's method.
We treat $x, \lambda, \nu$ as variables and update them simultaneously.

**System of Equations $R(x, \lambda, \nu) = 0$:**
1.  $r_{dual} = \nabla f_0 + Df^T \lambda + A^T \nu$ (Dual residual)
2.  $r_{cent} = -\text{diag}(\lambda) f(x) - (1/t)\mathbf{1}$ (Centrality residual)
3.  $r_{pri} = Ax - b$ (Primal residual)

**Newton Step:**
Linearize $R$ and solve for $(\Delta x, \Delta \lambda, \Delta \nu)$:
$$ \begin{bmatrix}
\nabla^2 L & Df^T & A^T \\
-\text{diag}(\lambda) Df & -\text{diag}(f) & 0 \\
A & 0 & 0
\end{bmatrix} \begin{bmatrix}
\Delta x \\
\Delta \lambda \\
\Delta \nu
\end{bmatrix} =
- \begin{bmatrix}
 r_{dual} \\
 r_{cent} \\
 r_{pri}
\end{bmatrix} $$

**Update:**
$(x, \lambda, \nu) \leftarrow (x, \lambda, \nu) + \alpha (\Delta x, \Delta \lambda, \Delta \nu)$.
Line search $\alpha$ to ensure $f_i(x) < 0$ and $\lambda > 0$ (stay in interior).

**Update $t$:**
Compute duality gap $\eta = -f(x)^T \lambda$.
Set $t = \mu m / \eta$ where $\mu > 1$ (e.g., 10).

## Why is it so fast?

1.  **Newton Convergence:** Each step uses curvature info.
2.  **Central Path:** The path is smooth and easy to follow.
3.  **One Step:** We don't solve to optimality for each $t$. We take one Newton step and then increase $t$.

This **Primal-Dual Predictor-Corrector** algorithm is the state-of-the-art for LP, QP, SOCP, and SDP.