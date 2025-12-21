---
title: "Sequential Quadratic Programming"
description: "Newton's method for constrained optimization"
---

# Sequential Quadratic Programming (SQP)

Sequential Quadratic Programming (SQP) is one of the most effective methods for solving **non-linearly constrained** optimization problems (which may be non-convex). It can be viewed as applying Newton's method directly to the KKT conditions of the constrained problem.

## The Idea

Consider:
$$ \min f(x) \quad \text{s.t.} \quad h(x) = 0 $$
(Inequalities can be handled, but equalities are simpler to explain).

At iterate $(x_k, \lambda_k)$, we model the problem by a quadratic subproblem.
1.  Replace objective $f$ with a quadratic approximation of the **Lagrangian**.
2.  Replace constraints $h$ with linear approximations.

## The Quadratic Subproblem

$$
\begin{align}
\min_p \quad & \nabla f(x_k)^T p + \frac{1}{2} p^T \nabla_{xx}^2 L(x_k, \lambda_k) p \\
\text{s.t.} \quad & h(x_k) + \nabla h(x_k)^T p = 0
\end{align}
$$

- $p$: The search direction ($x_{k+1} = x_k + p$).
- The objective uses the **Hessian of the Lagrangian**, not just the objective. This captures curvature from constraints (e.g., moving along a curved boundary requires curving the step).
- The constraints are linearizations around $x_k$.

## Equivalence to Newton on KKT

The KKT conditions for the original problem are:
$$ \nabla L(x, \lambda) = \begin{bmatrix} \nabla f(x) + \nabla h(x) \lambda \\ h(x) \end{bmatrix} = 0 $$

If we apply Newton's method to find a zero of this system:
$$ \nabla^2 L(x_k, \lambda_k) \begin{bmatrix} p \ \Delta \lambda \end{bmatrix} = - \nabla L(x_k, \lambda_k) $$

The matrix $\nabla^2 L$ is the Hessian of the Lagrangian w.r.t both variables:
$$ 
\begin{bmatrix}
\nabla_{xx}^2 L & \nabla h \\
\nabla h^T & 0
\end{bmatrix}
$$

It turns out that the first-order optimality conditions for the **Quadratic Subproblem** are exactly this linear system!

So, **SQP = Newton's Method on KKT conditions.**

## Handling Inequalities

If we have $g(x) \leq 0$, the subproblem becomes:
$$ \min \nabla f^T p + \frac{1}{2} p^T H p \quad \text{s.t.} \quad g(x_k) + \nabla g(x_k)^T p \leq 0 $$
This is a **Quadratic Program (QP)**.
We can solve this QP using an inner solver (e.g., Active Set method or Interior Point method).
The Lagrange multipliers of this QP subproblem become the new $\lambda_{k+1}$ estimates.

## The Algorithm

1.  Start with guess $x_0, \lambda_0$. Compute Hessian approx $B_0$.
2.  **Solve QP Subproblem**:
    $$ \min_p \nabla f_k^T p + \frac{1}{2} p^T B_k p \quad \text{s.t.} \quad \nabla h_k^T p + h_k = 0, \nabla g_k^T p + g_k \leq 0 $$
    Get solution $p_k$ and multipliers $\mu_k$.
3.  **Line Search:** Choose step size $\alpha_k$ to minimize a **Merit Function** (e.g., $L_1$ penalty function).
    $$ \phi(\alpha) = f(x + \alpha p) + \nu \|h(x + \alpha p)\_1 + \nu \|\max(0, g(x + \alpha p))\|_1 $$
    This ensures we balance reducing objective vs satisfying constraints.
4.  **Update**:
    $x_{k+1} = x_k + \alpha_k p_k$.
    $\lambda_{k+1} = \lambda_k + \alpha_k (\mu_k - \lambda_k)$.
    Update $B_{k+1}$ using BFGS formula (Quasi-Newton SQP).
5.  Repeat.

## Pros and Cons

**Pros:**
- extremely fast (superlinear convergence) near the solution.
- Handles non-linear constraints efficiently.
- Standard for small-to-medium dense problems (e.g., SNOPT, NLPQL).

**Cons:**
- Solving a QP at every step can be expensive for large problems.
- If the QP is infeasible (linearized constraints inconsistent), needs recovery strategies.
- Hessian of Lagrangian might not be positive definite (needs regularization).

## Comparison to Interior Point

- **SQP:** Active Set approach. Combinatorial changes in active set happen in the QP solver. Good for warm-starting.
- **Interior Point:** Continuous approach. Avoids combinatorial complexity. Better for large-scale.

For typical engineering design problems (100 variables, highly non-linear), SQP is often the solver of choice.