---
title: "Newton's Method"
description: "Second-order optimization using the Hessian"
---

# Newton's Method

Gradient Descent uses only the first derivative (slope). It treats the function as a plane locally.
**Newton's Method** uses the second derivative (curvature) as well. It treats the function as a quadratic bowl locally. This allows it to adapt to the geometry of the function, correcting for ill-conditioning.

## The Derivation

Consider the second-order Taylor expansion of $f(x)$ around $x_k$:
$$ f(x_k + p) \approx f(x_k) + \nabla f(x_k)^T p + \frac{1}{2} p^T \nabla^2 f(x_k) p $$
Let $m_k(p)$ be this quadratic approximation.
We want to choose the step $p$ that minimizes $m_k(p)$.

Take the gradient with respect to $p$ and set to zero:
$$ \nabla_p m_k(p) = \nabla f(x_k) + \nabla^2 f(x_k) p = 0 $$
$$ \implies \nabla^2 f(x_k) p = -\nabla f(x_k) $$

Assuming the Hessian $\nabla^2 f(x_k)$ is positive definite (invertible), the optimal step is:
$$ p_k = -(\nabla^2 f(x_k))^{-1} \nabla f(x_k) $$

This is the **Newton Step**.

## The Algorithm

1.  Start at $x_0$.
2.  Compute gradient $g_k = \nabla f(x_k)$ and Hessian $H_k = \nabla^2 f(x_k)$.
3.  Solve linear system $H_k p_k = -g_k$ for $p_k$.
4.  Update $x_{k+1} = x_k + \alpha_k p_k$. (Pure Newton uses $\alpha_k = 1$).
5.  Repeat until convergence.

## Properties

1.  **Affine Invariance:** Newton's method is independent of linear scaling of coordinates. If you change units (meters to millimeters), Newton's method takes the exact same path. Gradient descent does not.
2.  **Quadratic Convergence:** Near the minimum, the number of correct digits doubles every iteration.
3.  **Self-Correcting:** It naturally handles ill-conditioned problems (valleys). The Hessian inverse scales the step large in flat directions and small in steep directions.

## The Catch (Drawbacks)

1.  **Computation Cost:** Requires computing the Hessian ($O(n^2)$) and inverting it (solving system) ($O(n^3)$). For $n=10,000$, this is impossible.
2.  **Memory:** Need to store $n \times n$ matrix.
3.  **Non-Convexity:** If $H_k$ is not positive definite (e.g., saddle point), the Newton step might move towards the saddle or maximum, not minimum.
4.  **Global Convergence:** Pure Newton ($\alpha=1$) may diverge if started far from optimum. (Use Damped Newton with line search to fix this).

## Modifications

### Damped Newton
Use line search to choose $\alpha_k$. Ensures global convergence.

### Newton-CG
Instead of solving $H_k p_k = -g_k$ exactly (expensive $O(n^3)$), use Conjugate Gradient method to solve it approximately. Since we only need matrix-vector products $H_k v$, we don't even need to form the Hessian explicitly!

### Quasi-Newton (BFGS)
Approximates the Hessian inverse using gradient information (Topic 6.5).

## Example Comparison

Minimize Rosenbrock function (banana valley).
- **Gradient Descent:** Zig-zags wildly down the valley. Thousands of steps.
- **Newton's Method:** Curves correctly along the valley floor. Typically < 20 steps.

## Equality Constrained Newton

Newton's method naturally extends to equality constraints $Ax=b$.
We minimize the quadratic approximation subject to linearized constraints.
This leads to the **KKT System**:
$$
\begin{bmatrix}
\nabla^2 f(x) & A^T \\
A & 0
\end{bmatrix}
\begin{bmatrix}
 p \\
w
\end{bmatrix}
=
\begin{bmatrix}
-\nabla f(x) \\
0
\end{bmatrix}
$$
Solving this one linear system gives the primal step $p$ and dual step $w$.