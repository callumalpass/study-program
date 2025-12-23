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

## Detailed ADMM Example: LASSO Regression

Consider the LASSO problem (least squares with L1 regularization):
$$ \min_{x} \frac{1}{2} \|Ax - b\|^2 + \lambda \|x\|_1 $$

This is non-smooth due to the $\|x\|_1$ term, making direct gradient methods fail.

**ADMM Formulation:**

Introduce auxiliary variable $z = x$:
$$
\begin{align}
\min_{x,z} \quad & \frac{1}{2} \|Ax - b\|^2 + \lambda \|z\|_1 \\
\text{s.t.} \quad & x - z = 0
\end{align}
$$

**Augmented Lagrangian:**
$$ L_\rho(x, z, y) = \frac{1}{2} \|Ax - b\|^2 + \lambda \|z\|_1 + y^T (x - z) + \frac{\rho}{2} \|x - z\|^2 $$

**ADMM Updates:**

1. **x-update** (differentiable quadratic):
   $$ x_{k+1} = \arg \min_x \left\{ \frac{1}{2} \|Ax - b\|^2 + y_k^T x + \frac{\rho}{2} \|x - z_k\|^2 \right\} $$

   Taking the gradient and setting to zero:
   $$ A^T(Ax - b) + y_k + \rho(x - z_k) = 0 $$
   $$ (A^T A + \rho I) x = A^T b - y_k + \rho z_k $$

   This is a linear system that can be solved efficiently (especially if we precompute and cache $(A^T A + \rho I)^{-1}$).

2. **z-update** (proximal operator of $\|\cdot\|_1$):
   $$ z_{k+1} = \arg \min_z \left\{ \lambda \|z\|_1 - y_k^T z + \frac{\rho}{2} \|x_{k+1} - z\|^2 \right\} $$

   This is equivalent to:
   $$ z_{k+1} = \arg \min_z \left\{ \lambda \|z\|_1 + \frac{\rho}{2} \left\|z - \left(x_{k+1} + \frac{y_k}{\rho}\right)\right\|^2 \right\} $$

   The solution is the **soft-thresholding operator**:
   $$ z_{k+1} = S_{\lambda/\rho}(x_{k+1} + y_k/\rho) $$

   where $S_\kappa(a) = \text{sign}(a) \max(|a| - \kappa, 0)$ applied elementwise.

3. **y-update** (dual variable):
   $$ y_{k+1} = y_k + \rho (x_{k+1} - z_{k+1}) $$

**Convergence:** Under mild conditions (convexity), ADMM converges to the optimal solution. The rate is typically $O(1/k)$ but can be faster with acceleration.

## Scaled Form of ADMM

We can simplify notation by defining the **scaled dual variable** $u = y/\rho$:

$$ L_\rho(x, z, u) = f(x) + g(z) + \frac{\rho}{2} \|Ax + Bz - c + u\|^2 - \frac{\rho}{2}\|u\|^2 $$

The last term is constant w.r.t. $(x, z)$ and can be dropped during minimization.

**Scaled ADMM:**
1. $x_{k+1} = \arg \min_x \left\{ f(x) + \frac{\rho}{2} \|Ax + Bz_k - c + u_k\|^2 \right\}$
2. $z_{k+1} = \arg \min_z \left\{ g(z) + \frac{\rho}{2} \|Ax_{k+1} + Bz - c + u_k\|^2 \right\}$
3. $u_{k+1} = u_k + Ax_{k+1} + Bz_{k+1} - c$

This form is often more intuitive and easier to implement.

## Comparison: Augmented Lagrangian vs Pure Penalty

| Method | Penalty Parameter | Dual Variables | Conditioning |
|--------|-------------------|----------------|--------------|
| Pure Penalty | $\mu \to \infty$ | None | Ill-conditioned as $\mu \to \infty$ |
| Augmented Lagrangian | Fixed moderate $\rho$ | Yes, updated each iteration | Well-conditioned |

The key insight: **Dual variables do the work that increasing $\mu$ would do in pure penalty methods.**

## Applications of ADMM

1. **Distributed Optimization**: In large-scale problems where data is split across multiple machines, ADMM allows each machine to optimize its local variables, then coordinate via dual updates.

2. **Consensus Problems**: Each node $i$ has a local objective $f_i(x_i)$ and we want consensus $x_1 = x_2 = \cdots = x_N$. ADMM naturally handles this.

3. **Non-Smooth Regularization**: Problems with $\|x\|_1$, $\|x\|_\infty$, nuclear norm, etc., can be split so the non-smooth term is isolated in the $z$-update (which has closed-form proximal operators).

4. **Total Variation Denoising**: Image processing tasks where the objective includes TV regularization (sum of gradient magnitudes).

## Stopping Criteria for ADMM

ADMM should terminate when both primal and dual residuals are small:

**Primal Residual:**
$$ r_{k+1} = Ax_{k+1} + Bz_{k+1} - c $$

**Dual Residual:**
$$ s_{k+1} = \rho A^T B (z_{k+1} - z_k) $$

Stop when:
$$ \|r_{k+1}\| \leq \epsilon_{\text{pri}}, \quad \|s_{k+1}\| \leq \epsilon_{\text{dual}} $$

Typical choices: $\epsilon_{\text{pri}} = \epsilon_{\text{dual}} = 10^{-3}$ or $10^{-4}$.

## Choosing the Penalty Parameter $\rho$

The parameter $\rho$ controls the trade-off between primal and dual convergence:
- **Large $\rho$**: Fast primal residual reduction but slow dual residual reduction.
- **Small $\rho$**: Fast dual residual reduction but slow primal residual reduction.

**Adaptive $\rho$:** Many implementations adaptively adjust $\rho$ during iterations:
$$ \rho_{k+1} = \begin{cases}
\tau \rho_k & \text{if } \|r_k\| > 10 \|s_k\| \\
\rho_k / \tau & \text{if } \|s_k\| > 10 \|r_k\| \\
\rho_k & \text{otherwise}
\end{cases} $$

where $\tau \approx 2$ is typical.

## Common Mistakes

1. **Wrong penalty parameter scaling**: Using too large $\rho$ can make the x-update ill-conditioned; too small $\rho$ leads to slow convergence.

2. **Forgetting the dual update**: Some implementations mistakenly omit or incorrectly compute the dual variable update. This breaks convergence.

3. **Not checking both residuals**: Monitoring only primal or only dual residual can lead to premature stopping.

4. **Coupling terms in wrong subproblem**: When splitting the problem, make sure each subproblem is efficiently solvable. If the x-update becomes as hard as the original problem, ADMM provides no benefit.

## Key Takeaways

1. **Augmented Lagrangian smooths the dual**: By adding a quadratic penalty, we get a well-conditioned dual function even when the primal is poorly conditioned.

2. **Fixed penalty parameter**: Unlike pure penalty methods, we don't need $\rho \to \infty$. A moderate $\rho$ works because dual variables are updated.

3. **ADMM enables problem splitting**: For separable objectives, ADMM alternates between simpler subproblems, each with closed-form or efficient solutions.

4. **Widely applicable**: ADMM handles non-smooth regularizers, distributed optimization, and consensus problems elegantly.

5. **Trade-off in convergence**: The choice of $\rho$ balances primal and dual convergence rates. Adaptive schemes help.

6. **Foundation for modern solvers**: Many state-of-the-art solvers for machine learning (LASSO, SVM, matrix completion) use ADMM or variants.

7. **Primal-dual iteration**: The method simultaneously updates primal variables $(x, z)$ and dual variables $(y)$, converging to a saddle point of the Lagrangian.