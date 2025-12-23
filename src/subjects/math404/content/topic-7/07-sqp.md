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

## Detailed Example: Constrained Rosenbrock Problem

Consider minimizing the Rosenbrock function subject to a circular constraint:
$$
\begin{align}
\min \quad & (1 - x_1)^2 + 100(x_2 - x_1^2)^2 \\
\text{s.t.} \quad & x_1^2 + x_2^2 \leq 2
\end{align}
$$

The unconstrained minimum is at $(1, 1)$, but this violates the constraint since $1^2 + 1^2 = 2$.

**Iteration 0:** Start at $x_0 = (0, 0)$ (feasible), $\lambda_0 = 0$.

**Gradient and Hessian of Objective:**
$$ \nabla f(x) = \begin{bmatrix} -2(1-x_1) - 400x_1(x_2 - x_1^2) \\ 200(x_2 - x_1^2) \end{bmatrix} $$

At $x_0 = (0, 0)$:
$$ \nabla f(x_0) = \begin{bmatrix} -2 \\ 0 \end{bmatrix} $$

The Hessian of $f$ is complex; for SQP we need the Hessian of the Lagrangian. Initially (with $\lambda_0 = 0$), this is just $\nabla^2 f(x_0)$ (we can use BFGS approximation).

**Constraint:**
$$ g(x) = x_1^2 + x_2^2 - 2 \leq 0 $$
$$ \nabla g(x) = \begin{bmatrix} 2x_1 \\ 2x_2 \end{bmatrix} $$

At $x_0 = (0, 0)$:
$$ g(x_0) = -2 < 0 \quad \text{(inactive)} $$
$$ \nabla g(x_0) = \begin{bmatrix} 0 \\ 0 \end{bmatrix} $$

**QP Subproblem:**
Since the constraint is inactive and its gradient is zero at the origin, the QP is essentially unconstrained:
$$ \min_p \nabla f(x_0)^T p + \frac{1}{2} p^T B_0 p $$

Using a simple identity approximation $B_0 = I$:
$$ \min_p -2p_1 + \frac{1}{2}(p_1^2 + p_2^2) $$

Solution: $p_1 = 2, p_2 = 0$, so $x_1 = (2, 0)$.

But wait—does this satisfy the constraint? $2^2 + 0^2 = 4 > 2$. Infeasible!

This illustrates a key point: The QP linearizes constraints, so the full step might violate the original nonlinear constraint. We need a **line search** with a merit function.

**Merit Function (L1 penalty):**
$$ \phi(x; \nu) = f(x) + \nu \max(0, g(x)) $$

Choose $\nu$ large enough (e.g., $\nu = 2|\lambda_0| + 1 = 1$).

Line search to find $\alpha$ such that $\phi(x_0 + \alpha p) < \phi(x_0)$ and $x_0 + \alpha p$ is feasible.

Through backtracking, we might find $\alpha \approx 0.7$, giving $x_1 \approx (1.4, 0)$.

**Subsequent Iterations:** The BFGS update refines the Hessian approximation, and the active set (whether the constraint is active) is determined by the QP solver. After several iterations, SQP converges to the constrained optimum.

(The exact optimum can be found via KKT: At the boundary with $x_1^2 + x_2^2 = 2$, the gradients must align. Solving yields $x^* \approx (1, 1)$ on the boundary, i.e., the unconstrained minimum projected onto the constraint.)

## Trust Region SQP

Instead of using a line search, we can impose a **trust region** on the QP subproblem:
$$
\begin{align}
\min_p \quad & \nabla f(x_k)^T p + \frac{1}{2} p^T B_k p \\
\text{s.t.} \quad & \nabla g(x_k)^T p + g(x_k) \leq 0 \\
& \|p\| \leq \Delta_k
\end{align}
$$

where $\Delta_k > 0$ is the trust region radius.

**Advantages:**
1. **Guarantees QP feasibility**: The trust region prevents the step from being too large.
2. **Better globalization**: Trust regions can be more robust than line search in difficult regions.

**Updating $\Delta_k$:**
- If the actual reduction in $f$ is close to the predicted reduction from the QP, increase $\Delta_k$ (trust the model more).
- If the actual reduction is much worse, decrease $\Delta_k$ (trust the model less).

This is the approach used in **fmincon** (MATLAB) and **SNOPT**.

## BFGS Updates for the Lagrangian Hessian

The Hessian of the Lagrangian is:
$$ \nabla_{xx}^2 L(x, \lambda) = \nabla^2 f(x) + \sum_{i=1}^m \lambda_i \nabla^2 g_i(x) $$

Computing this exactly requires second derivatives of all constraints. Instead, use **BFGS** to approximate it.

**BFGS Update:**
$$ B_{k+1} = B_k + \frac{y_k y_k^T}{y_k^T s_k} - \frac{B_k s_k s_k^T B_k}{s_k^T B_k s_k} $$

where:
- $s_k = x_{k+1} - x_k$ (step)
- $y_k = \nabla_x L(x_{k+1}, \lambda_{k+1}) - \nabla_x L(x_k, \lambda_k)$ (change in gradient of Lagrangian)

This is the **Lagrangian gradient**, not just the objective gradient!

**Key Point:** The BFGS update uses information about the **Lagrangian**, incorporating constraint curvature. This is crucial for superlinear convergence.

## Handling Infeasible QP Subproblems

Sometimes the linearized constraints are inconsistent:
$$ \nexists p : \nabla g_i(x_k)^T p + g_i(x_k) \leq 0 \text{ for all } i $$

This happens when the constraints curve away from the linearization.

**Solution: Relaxation**

Introduce slack variables:
$$
\begin{align}
\min_{p, s} \quad & \nabla f(x_k)^T p + \frac{1}{2} p^T B_k p + \rho s \\
\text{s.t.} \quad & \nabla g_i(x_k)^T p + g_i(x_k) \leq s, \quad i = 1, \ldots, m \\
& s \geq 0
\end{align}
$$

where $\rho$ is a large penalty parameter.

This QP is always feasible (set $p = 0$ and $s$ large enough). If the optimal $s^* > 0$, it means the original QP was infeasible, and we're taking a "feasibility restoration" step.

## Filter Methods

An alternative to merit functions: Use a **filter** to accept steps.

A step from $x_k$ to $x_{k+1}$ is accepted if:
1. It reduces the objective: $f(x_{k+1}) < f(x_k)$, OR
2. It reduces constraint violation: $\|h(x_{k+1})\| < \|h(x_k)\|$.

The **filter** is a list of $(f, h)$ pairs that are "non-dominated". A new point is accepted if it's not dominated by any point in the filter.

**Advantages:**
- No need to tune penalty parameter $\nu$.
- Naturally balances objective improvement vs feasibility.

**Disadvantage:**
- More complex to implement.

This is used in **IPOPT** (Interior Point OPTimizer) for large-scale nonlinear programming.

## Convergence Properties

**Local Convergence:**

Under standard assumptions (LICQ, second-order sufficiency conditions), SQP with exact Hessian converges **quadratically**:
$$ \|x_{k+1} - x^*\| = O(\|x_k - x^*\|^2) $$

With BFGS approximation, convergence is **superlinear**:
$$ \|x_{k+1} - x^*\| = o(\|x_k - x^*\|) $$

**Global Convergence:**

With appropriate line search or trust region and merit function, SQP converges to a KKT point from any starting point (under mild conditions).

## Practical Considerations

1. **QP Solver Choice:**
   - **Active Set QP** (e.g., qpOASES): Good for small-to-medium problems, warm-starting.
   - **Interior Point QP** (e.g., OOQP): Better for large-scale.

2. **Constraint Scaling:**
   - Normalize constraints so they have similar magnitudes. This improves conditioning of the QP.

3. **Initial Hessian Approximation:**
   - Start with $B_0 = I$ (identity) or a scaled identity based on gradient magnitudes.

4. **Handling Equality Constraints:**
   - Equality constraints $h(x) = 0$ can be difficult numerically. Consider using a **feasibility restoration phase** if initial point is infeasible.

5. **Second-Order Corrections:**
   - After solving the QP, take an additional step to satisfy nonlinear constraints more accurately. This can prevent Maratos effect (failure to accept steps near the solution).

## SQP vs SCP (Sequential Convex Programming)

**SCP** is a variant where, at each iteration, we form a **convex approximation** of the problem (not necessarily quadratic).

For example, linearize the objective and constraints:
$$
\begin{align}
\min_p \quad & f(x_k) + \nabla f(x_k)^T p \\
\text{s.t.} \quad & g_i(x_k) + \nabla g_i(x_k)^T p \leq 0 \\
& \|p\| \leq \Delta_k
\end{align}
$$

This is a **linear program**, easier to solve than a QP.

**Trade-off:** SCP uses cruder approximations (linear instead of quadratic objective), so it might need more iterations. But each iteration is cheaper.

SCP is popular in **trajectory optimization** and **model predictive control**.

## Example Applications of SQP

1. **Aerospace Design:** Optimize aircraft wing shape subject to lift, drag, stress, and manufacturing constraints.

2. **Chemical Engineering:** Minimize cost in a chemical plant subject to mass balance, energy balance, and safety constraints.

3. **Robotics:** Optimal control of robot motion subject to dynamics, joint limits, and obstacle avoidance.

4. **Economics:** Portfolio optimization with complex constraints (e.g., regulatory requirements, transaction costs).

5. **Machine Learning:** Training neural networks with constraints (e.g., fairness, monotonicity).

## Common Mistakes

1. **Not updating multipliers:** The dual variables $\lambda_k$ must be updated based on the QP solution. They're essential for the BFGS update and convergence.

2. **Using wrong Hessian:** The Hessian should be of the **Lagrangian**, not the objective. This includes constraint curvature.

3. **Ignoring infeasibility:** If the QP is infeasible, you must use a relaxation or restoration procedure. Ignoring it leads to failure.

4. **Poor merit function tuning:** If $\nu$ is too small, the merit function doesn't enforce constraints. If too large, it dominates and prevents progress in the objective.

5. **Not scaling constraints:** Constraints with vastly different magnitudes (e.g., $10^{-6} \leq g_1 \leq 10^6$) cause numerical issues. Always scale.

## Key Takeaways

1. **SQP is Newton's method for constrained optimization:** It applies Newton's method directly to the KKT conditions.

2. **Quadratic subproblem captures local structure:** Using a quadratic approximation of the Lagrangian and linear approximation of constraints gives accurate local models.

3. **BFGS avoids computing Hessians:** Quasi-Newton updates build curvature information from gradient evaluations alone.

4. **Merit functions ensure global convergence:** They balance objective improvement and constraint satisfaction.

5. **Superlinear convergence near the solution:** SQP with BFGS converges very rapidly once close to the optimum.

6. **Active set changes are handled naturally:** The QP solver determines which constraints are active, adapting automatically.

7. **Widely used in practice:** SQP is the method of choice for small-to-medium nonlinear programs with smooth objectives and constraints. Implemented in SNOPT, NLPQL, fmincon, etc.

8. **Flexibility in globalization:** Trust regions, line search, filter methods—many variants exist to ensure robustness.

9. **Not ideal for very large-scale:** For problems with millions of variables, interior point methods or first-order methods are preferred. SQP shines in the 10-10,000 variable range.