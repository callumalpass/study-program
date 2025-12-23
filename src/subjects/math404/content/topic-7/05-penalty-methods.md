---
title: "Penalty Methods"
description: "Approximating constrained problems via unconstrained ones"
---

# Penalty Methods

The philosophy of **Penalty Methods** is simple: If constraints are hard to handle directly, turn them into costs. Replace "You MUST NOT step on the grass" with "You pay $1,000 if you step on the grass."

## Quadratic Penalty Method

To solve:
$$ \min f(x) \quad \text{s.t.} \quad h_i(x) = 0 $$

Define the penalty function:
$$ P(x; \mu) = f(x) + \frac{\mu}{2} \sum h_i(x)^2 $$
where $\mu > 0$ is a penalty parameter.

**Algorithm:**
1.  Start with small $\mu$. Minimize $P(x; \mu)$.
2.  Increase $\mu$ (e.g., $\mu \leftarrow 10 \mu$).
3.  Minimize $P(x; \mu)$ starting from previous solution.
4.  Repeat until constraints satisfied within tolerance.

**Intuition:**
As $\mu \to \infty$, the cost of violating $h_i(x)=0$ becomes infinite. The minimizer is forced onto the feasible manifold.

**Drawback (Ill-conditioning):**
As $\mu \to \infty$, the Hessian of $P$ becomes dominated by $\mu \nabla h \nabla h^T$. The condition number $\kappa \to \infty$.
Gradient descent fails. Newton's method works but linear systems become singular.
*This is why Augmented Lagrangian is preferred (finite $\rho$).*

## Barrier Methods (Interior Point)

For inequality constraints $f_i(x) \leq 0$:
We want a penalty that is:
- 0 if $f_i(x) < 0$.
- $\infty$ if $f_i(x) > 0$.
(Ideally, the "indicator function").

**Logarithmic Barrier:**
Approximate the indicator with a smooth function:
$$ B(x; \mu) = f_0(x) - \mu \sum_{i=1}^m \log(-f_i(x)) $$
where $\mu > 0$ here is a "temperature" parameter (goes to 0, not infinity).
*Note: Some texts use $1/t$ instead of $\mu$. Let's stick to $\mu \to 0$.*

**Properties:**
- If $f_i(x) \to 0^-$ (approaching boundary), $-\log(-f_i) \to \infty$.
- The term "pushes" the solution away from the boundary into the **interior**.
- As $\mu \to 0$, the push becomes weaker, allowing convergence to boundary active constraints.

**Central Path:**
The set of minimizers $x^*(\mu)$ for $\mu > 0$ forms a smooth curve called the **Central Path**, leading to the optimal solution $x^*$.

## Interior Point Method Algorithm

1.  Start with strictly feasible $x$, large $\mu$.
2.  Minimize $B(x; \mu)$ using Newton's Method (unconstrained).
3.  Decrease $\mu$ (e.g., $\mu \leftarrow \mu / 10$).
4.  Repeat.

**Complexity:**
Newton's method works very well here because the barrier function is **self-concordant** (its 3rd derivative is bounded by its 2nd).
Nesterov & Nemirovski proved that this method solves convex problems to $\epsilon$ accuracy in $O(\sqrt{n} \log(1/\epsilon))$ Newton steps.
This is **polynomial time**.

This algorithm is what is inside solvers like **CVXOPT**, **Mosek**, and **IPOPT**.

## Exact Penalty Methods

Can we pick a finite $\mu$ and get the exact solution in one shot?
Yes, using non-smooth penalties like $L_1$:
$$ P(x) = f(x) + \mu \sum |h_i(x)| + \mu \sum \max(0, f_i(x)) $$
If $\mu > \|\lambda^*\|_\infty$ (max dual multiplier), the minimizer of $P(x)$ is exactly $x^*$.
**Trade-off:** The objective is now non-smooth. Harder to minimize (requires subgradient method).

## Detailed Example: Quadratic Penalty for Equality Constraints

Consider:
$$ \min x_1 + x_2 \quad \text{s.t.} \quad x_1^2 + x_2^2 = 1 $$

The constrained optimum is at $x^* = (-1/\sqrt{2}, -1/\sqrt{2})$ with objective value $-\sqrt{2} \approx -1.414$.

**Penalty Function:**
$$ P(x; \mu) = x_1 + x_2 + \frac{\mu}{2} (x_1^2 + x_2^2 - 1)^2 $$

**Gradient:**
$$ \nabla P = \begin{bmatrix} 1 + 2\mu x_1 (x_1^2 + x_2^2 - 1) \\ 1 + 2\mu x_2 (x_1^2 + x_2^2 - 1) \end{bmatrix} $$

Setting $\nabla P = 0$ at the optimum:
$$ 1 + 2\mu x_1 (x_1^2 + x_2^2 - 1) = 0 $$
$$ 1 + 2\mu x_2 (x_1^2 + x_2^2 - 1) = 0 $$

From these equations, $x_1 = x_2$ at the optimum. Substituting:
$$ 1 + 2\mu x_1 (2x_1^2 - 1) = 0 $$

This is a cubic equation in $x_1$ that depends on $\mu$. As $\mu \to \infty$, we need $2x_1^2 - 1 \to 0$ (otherwise the term $2\mu x_1(2x_1^2-1)$ diverges), giving $x_1 = -1/\sqrt{2}$.

Let's check numerically:

| $\mu$ | $x_1(\mu)$ | $x_2(\mu)$ | $x_1^2 + x_2^2$ | Objective |
|-------|------------|------------|-----------------|-----------|
| 1 | -0.577 | -0.577 | 0.667 | -1.155 |
| 10 | -0.690 | -0.690 | 0.952 | -1.381 |
| 100 | -0.706 | -0.706 | 0.995 | -1.411 |
| 1000 | -0.707 | -0.707 | 0.9995 | -1.414 |

We see convergence to $x^* \approx (-0.707, -0.707) = (-1/\sqrt{2}, -1/\sqrt{2})$ as $\mu$ increases.

## Barrier Method Convergence Analysis

For the logarithmic barrier:
$$ B(x; \mu) = f_0(x) - \mu \sum_{i=1}^m \log(-f_i(x)) $$

Let $x^*(\mu)$ be the minimizer of $B(x; \mu)$ for a given $\mu > 0$. These points form the **central path**.

**Key Results:**

1. **Duality Gap:** The duality gap at $x^*(\mu)$ is exactly $m\mu$:
   $$ f_0(x^*(\mu)) - g(\lambda^*(\mu), \nu^*(\mu)) = m\mu $$
   where $m$ is the number of inequality constraints.

2. **Convergence:** As $\mu \to 0$, $x^*(\mu) \to x^*$ (the true optimum).

3. **Self-Concordance:** The barrier function has a special structure (self-concordance) that allows Newton's method to converge in $O(\sqrt{m} \log(1/\epsilon))$ iterations to $\epsilon$-accuracy.

**Proof Sketch of Duality Gap:**

At $x^*(\mu)$, the KKT conditions for the barrier problem give:
$$ \nabla f_0(x^*(\mu)) + \sum_{i=1}^m \frac{\mu}{-f_i(x^*(\mu))} \nabla f_i(x^*(\mu)) = 0 $$

Define $\lambda_i^*(\mu) = \frac{\mu}{-f_i(x^*(\mu))}$. Note that $\lambda_i^*(\mu) > 0$ since $f_i(x^*(\mu)) < 0$.

Then:
$$ \nabla f_0(x^*(\mu)) + \sum_{i=1}^m \lambda_i^*(\mu) \nabla f_i(x^*(\mu)) = 0 $$

This is the stationarity condition for the Lagrangian of the original problem!

The dual function at $(\lambda^*(\mu), \nu^*(\mu))$ gives:
$$ g(\lambda^*(\mu), \nu^*(\mu)) = f_0(x^*(\mu)) + \sum_{i=1}^m \lambda_i^*(\mu) f_i(x^*(\mu)) $$

Since $\lambda_i^*(\mu) f_i(x^*(\mu)) = -\mu$:
$$ g(\lambda^*(\mu), \nu^*(\mu)) = f_0(x^*(\mu)) - m\mu $$

Therefore, the duality gap is $m\mu$.

To achieve $\epsilon$-accuracy, we need $m\mu < \epsilon$, i.e., $\mu < \epsilon/m$.

## Comparison of Penalty Methods

| Method | Type | Parameter | Constraint Handling | Smoothness | Conditioning |
|--------|------|-----------|---------------------|------------|--------------|
| Quadratic Penalty | Exterior | $\mu \to \infty$ | Allows violations | Smooth | Ill-conditioned |
| $L_1$ Penalty | Exterior | Finite (if large enough) | Allows violations | Non-smooth | Good |
| Logarithmic Barrier | Interior | $\mu \to 0$ | Must start feasible | Smooth | Good |
| Inverse Barrier | Interior | $\mu \to 0$ | Must start feasible | Smooth | Good |

**Exterior methods** allow constraint violations and penalize them.
**Interior methods** require strict feasibility and create a barrier at the boundary.

## Advanced Topic: Barrier Parameter Update Strategies

In practice, we don't just use a fixed sequence $\mu_k = \mu_0 / 10^k$. Adaptive strategies are more efficient:

**Predictor-Corrector:**
1. **Predictor:** Take a large reduction in $\mu$ (e.g., $\mu_k = 0.1 \mu_{k-1}$).
2. **Corrector:** Take a few Newton steps to approximately minimize $B(x; \mu_k)$ starting from $x_{k-1}$.
3. Monitor the residuals. If Newton steps aren't converging well, reduce $\mu$ more conservatively.

**Mehrotra's Predictor-Corrector** (for linear programming) combines predictor and corrector steps in a sophisticated way, achieving excellent practical performance.

## Penalty Methods for Inequality Constraints

For inequalities $f_i(x) \leq 0$, the quadratic penalty is:
$$ P(x; \mu) = f_0(x) + \frac{\mu}{2} \sum_{i=1}^m \max(0, f_i(x))^2 $$

This penalizes only **violated** constraints (where $f_i(x) > 0$).

**Gradient:**
$$ \nabla P = \nabla f_0(x) + \mu \sum_{i: f_i(x) > 0} f_i(x) \nabla f_i(x) $$

The gradient has a **kink** at the boundary where $f_i(x) = 0$ (non-smooth). This can slow down gradient-based methods but doesn't prevent convergence.

## Common Mistakes

1. **Starting with too large $\mu$**: In quadratic penalty methods, starting with $\mu = 10^6$ can cause immediate ill-conditioning. Start small (e.g., $\mu = 1$) and increase gradually.

2. **Not checking feasibility for barrier methods**: Barrier methods require a strictly feasible starting point. If you start at $f_i(x_0) = 0$ or $f_i(x_0) > 0$, the log barrier is undefined or infinite.

3. **Using barrier methods for equality constraints**: Logarithmic barriers only work for inequalities. For equalities, use quadratic penalties or the augmented Lagrangian.

4. **Ignoring ill-conditioning warnings**: When $\mu \to \infty$ (penalty) or $\mu \to 0$ (barrier), the Hessian becomes ill-conditioned. Use robust linear solvers (e.g., iterative methods with preconditioning) or switch to augmented Lagrangian.

5. **Minimizing to high accuracy at each $\mu$**: It's wasteful to minimize $P(x; \mu_k)$ to machine precision before increasing $\mu_k$. A few Newton steps (reducing the gradient norm by a factor of 10) are usually sufficient before updating $\mu$.

## Historical Note

Interior point methods using barrier functions were introduced by **Fiacco and McCormick** in the 1960s. However, they were overshadowed by the simplex method for linear programming.

In **1984**, **Narendra Karmarkar** published a polynomial-time interior point algorithm for LP that reignited interest. This led to the development of modern primal-dual interior point methods by **Megiddo, Ye, Kojima, Mizuno, Yoshise**, and others in the late 1980s and 1990s.

Today, interior point methods are the default for large-scale convex optimization, implemented in solvers like **MOSEK**, **Gurobi**, **CPLEX**, and **CVXOPT**.

## Key Takeaways

1. **Penalty methods convert constrained problems to unconstrained**: By adding penalty terms that discourage constraint violations.

2. **Quadratic penalty requires $\mu \to \infty$**: This causes ill-conditioning, limiting practical performance.

3. **Barrier methods stay in the interior**: They create a "wall" at the constraint boundary using $-\log(-f_i(x))$ or similar terms.

4. **Barrier methods are polynomial-time**: For convex problems, they achieve $\epsilon$-accuracy in $O(\sqrt{m} \log(1/\epsilon))$ iterations.

5. **Duality gap decreases linearly with $\mu$**: In barrier methods, gap $= m\mu$, so we can control accuracy precisely.

6. **Exact penalty methods use $L_1$ norms**: They achieve exact solutions with finite penalty parameters but are non-smooth.

7. **Trade-offs abound**: Smoothness vs exactness, interior vs exterior, conditioning vs convergence. The augmented Lagrangian offers a good compromise for many problems.