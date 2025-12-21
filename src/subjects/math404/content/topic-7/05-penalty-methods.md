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
If $\mu > \|\lambda^*\|_	o \infty$ (max dual multiplier), the minimizer of $P(x)$ is exactly $x^*$.
**Trade-off:** The objective is now non-smooth. Harder to minimize (requires subgradient method).