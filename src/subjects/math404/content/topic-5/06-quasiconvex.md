---
title: "Quasiconvex Optimization"
description: "Optimization of unimodal functions via bisection"
---

# Quasiconvex Optimization

Some problems are not convex but still have the nice property that local minima are global minima (or at least, the set of optimal points is convex). These often fall under **Quasiconvex Optimization**.

## Definition (Review)

A function $f: \mathbb{R}^n \to \mathbb{R}$ is **quasiconvex** if all its sublevel sets $S_\alpha = \{x \mid f(x) \leq \alpha\}$ are convex.

Alternatively:
$$ f(\theta x + (1-\theta)y) \leq \max \{ f(x), f(y) \} $$

**Quasilinear:** If $f$ is both quasiconvex and quasiconcave (e.g., $\log x$, $x^3$).

## Generalized Eigenvalue Problems

A classic example involves linear fractional functions:
$$ f(x) = \frac{a^T x + b}{c^T x + d}, \quad \text{dom } f = \{ x \mid c^T x + d > 0 \} $$
This is quasiconvex (and quasiconcave).
Minimizing this over a polyhedron is a **Linear-Fractional Program**.

It can be transformed into an LP via the **Charnes-Cooper transformation**:
Let $y = \frac{x}{c^T x + d}$ and $t = \frac{1}{c^T x + d}$.
Substitute and solve for $(y, t)$.

## Solving Quasiconvex Problems

A general quasiconvex problem:
$$ \min f_0(x) \quad \text{s.t.} \quad f_i(x) \leq 0, Ax = b $$
where $f_0$ is quasiconvex and $f_i$ are convex.

We can solve this using a sequence of convex feasibility problems via **Bisection on the optimal value**.

### Bisection Algorithm

Let $p^*$ be the optimal value. Assume we know $p^* \in [l, u]$.

1.  Pick midpoint $t = (l + u)/2$.
2.  Check if the sublevel set is feasible:
    Find $x$ s.t.
    $$ f_0(x) \leq t $$
    $$ f_i(x) \leq 0 $$
    $$ Ax = b $$
    Since $f_0$ is quasiconvex, the constraint $f_0(x) \leq t$ defines a **convex set**.
    So this is a **Convex Feasibility Problem**.
3.  If feasible:
    - We found a point with value $\leq t$.
    - So $p^* \leq t$.
    - Update upper bound: $u = t$.
4.  If infeasible:
    - No point has value $\leq t$.
    - So $p^* > t$.
    - Update lower bound: $l = t$.
5.  Repeat until $u - l \leq \epsilon$.

### Complexity
The interval shrinks by half each step.
To get $\epsilon$ accuracy starting from range $R$, we need $\log_2 (R/\epsilon)$ steps.
Each step solves one convex feasibility problem.
This is extremely efficient.

## Example: Von Neumann Growth Model

Maximize the growth rate $\lambda$ of an economy.
$$ \max \lambda \quad \text{s.t.} \quad Bx \geq \lambda Ax, \quad x \geq 0, \quad \sum x_i = 1 $$
This is equivalent to finding the largest $\lambda$ such that the linear system $(B - \lambda A)x \geq 0$ is feasible.
This is a Generalized Eigenvalue Problem (GEVP), which is quasiconvex.
We solve it by bisecting on $\lambda$.

## Example: Minimum Length Curve

Find the shortest path between two points avoiding convex obstacles.
Length is convex. Constraints are non-convex (outside a circle).
Wait, this is NOT quasiconvex.

But consider finding the minimum time to travel a path where speed depends on position.
If speed $v(x)$ is concave, travel time $\int ds/v(x)$ might be convex or quasiconvex.

## Summary

If your objective function is a ratio, or depends on a single parameter monotonically, or involves finding the "best worst-case" parameter, it might be quasiconvex.
Look for the "Bisection Property": If fixing the objective value turns the problem into a convex feasibility check, you can solve it!

## Detailed Bisection Algorithm

**Setup:** Minimize quasiconvex $f_0(x)$ subject to convex constraints $f_i(x) \leq 0$, $Ax = b$.

**Assumption:** We know bounds $l \leq p^* \leq u$ where $p^*$ is the optimal value.

**Algorithm:**

```
Initialize: l = lower_bound, u = upper_bound, ε = tolerance
while u - l > ε do:
    t = (l + u) / 2
    Solve feasibility problem:
        Find x such that:
            f_0(x) ≤ t
            f_i(x) ≤ 0, i = 1,...,m
            Ax = b

    if feasible:
        u = t  (we can achieve value ≤ t)
        x_best = x  (save this solution)
    else:
        l = t  (we cannot achieve value ≤ t)
    end
end
return x_best, (l + u)/2
```

**Complexity:**
- Number of iterations: $\lceil \log_2((u - l)/\epsilon) \rceil$
- Each iteration: solve one convex feasibility problem

**Example:** If initial range is $[0, 100]$ and we want $\epsilon = 0.01$ accuracy:
$$ \text{Iterations} = \lceil \log_2(100/0.01) \rceil = \lceil \log_2(10000) \rceil = 14 $$

Only 14 convex feasibility problems to solve!

## Worked Example: Linear Fractional Programming

**Problem:** Minimize the ratio of linear functions:
$$ \min \frac{c^T x + d}{e^T x + f} \quad \text{s.t.} \quad Ax \leq b, \quad e^T x + f > 0 $$

This is quasiconvex (and quasiconcave), so we can use bisection.

**Bisection Approach:**
At each iteration with test value $t$, check if:
$$ \frac{c^T x + d}{e^T x + f} \leq t $$

is feasible. This is equivalent to:
$$ c^T x + d \leq t(e^T x + f) $$
$$ c^T x + d \leq te^T x + tf $$
$$ (c - te)^T x \leq tf - d $$

This is a **linear constraint**! So the feasibility problem at each iteration is an LP.

**Alternative: Direct Transformation**
The Charnes-Cooper transformation converts this directly to an LP without bisection.

Let $y = \frac{x}{e^T x + f}$ and $z = \frac{1}{e^T x + f}$. Then $x = y/z$ and:
$$ \frac{c^T x + d}{e^T x + f} = c^T y + dz $$

The constraints $Ax \leq b$ become $Ay \leq bz$, and $e^T x + f > 0$ becomes $e^T y + fz = 1$, $z > 0$.

**Transformed LP:**
$$
\begin{align}
\min \quad & c^T y + dz \\
\text{s.t.} \quad & Ay \leq bz \\
& e^T y + fz = 1 \\
& z > 0
\end{align}
$$

This is a standard LP. After solving for $(y^*, z^*)$, recover $x^* = y^* / z^*$.

**Comparison:**
- Bisection: Requires $O(\log(1/\epsilon))$ LPs.
- Charnes-Cooper: Solves a single LP (slightly larger).

For linear-fractional programs, Charnes-Cooper is preferred. But bisection generalizes to more complex quasiconvex functions.

## Extended Example: Maximum Eigenvalue Minimization

**Problem:** Given symmetric matrices $A_0, A_1, \ldots, A_k$, minimize the maximum eigenvalue:
$$ \min_{x \in \mathbb{R}^k} \lambda_{\max}(A_0 + x_1 A_1 + \cdots + x_k A_k) $$

**Is this quasiconvex?**
The maximum eigenvalue function $\lambda_{\max}(A)$ is convex (not just quasiconvex). So this is actually a **convex** optimization problem.

**SDP Formulation (direct):**
$$ \min t \quad \text{s.t.} \quad A_0 + \sum x_i A_i \preceq tI $$

This is an SDP. No need for bisection.

**Quasiconvex Example (Generalized Eigenvalue):**
Minimize the generalized eigenvalue:
$$ \min \lambda_{\max}(A(x), B(x)) $$

where $\lambda_{\max}(A, B)$ is the largest $\lambda$ satisfying $\det(A - \lambda B) = 0$.

This is quasiconvex (not convex). Use bisection:
- At each step, check if $\lambda_{\max}(A(x), B(x)) \leq t$.
- Equivalent to: $A(x) \preceq t B(x)$, i.e., $A(x) - t B(x) \preceq 0$.
- This is an LMI (convex) if $B(x)$ is positive definite.

## Properties of Quasiconvex Functions

**Sublevel Set Characterization:**
$f$ is quasiconvex $\iff$ all sublevel sets $S_\alpha = \{x : f(x) \leq \alpha\}$ are convex.

**First-Order Condition:**
For differentiable quasiconvex $f$, if $f(y) \leq f(x)$, then:
$$ \nabla f(x)^T (y - x) \leq 0 $$

**Note:** This is weaker than the convex case. For convex $f$:
$$ f(y) \geq f(x) + \nabla f(x)^T (y - x) $$

**Monotonicity:** If $f$ is quasiconvex and $h$ is increasing, then $h \circ f$ is quasiconvex.

**Example:** $f(x) = |x|$ is convex (hence quasiconvex). $h(t) = t^2$ is increasing on $t \geq 0$. So $h(f(x)) = x^2$ is quasiconvex (and actually convex).

## When Bisection Fails

Bisection requires:
1. The objective is quasiconvex.
2. Fixing the objective value creates a convex feasibility problem.

**Failure Case 1: Non-Convex Constraints**
If the constraints themselves are non-convex, fixing the objective doesn't help.

**Example:**
$$ \min \frac{x_1}{x_2} \quad \text{s.t.} \quad x_1^2 + x_2^2 = 1, \quad x_2 > 0 $$

The objective is quasiconvex, but the constraint $x_1^2 + x_2^2 = 1$ is non-convex (circle). Bisection doesn't apply.

**Failure Case 2: Non-Quasiconvex Objective**
If the objective is not quasiconvex, bisection has no guarantee.

**Example:** $f(x) = \sin(x)$ on $[0, 2\pi]$ is not quasiconvex (sublevel sets are unions of intervals, not single intervals).

## Quasilinear Functions

A function is **quasilinear** if it is both quasiconvex and quasiconcave.

**Examples:**
- Linear functions $f(x) = a^T x + b$ (both convex and concave).
- Logarithm $f(x) = \log x$ on $x > 0$ (concave, hence quasiconcave and quasiconvex).
- Floor and ceiling functions (piecewise constant).

**Property:** Sublevel sets and superlevel sets are both convex.

**Optimization:** Minimizing or maximizing a quasilinear function over a convex set can be done via bisection (in either direction).

## Application: Resource Allocation

**Problem:** Allocate resources $x_1, \ldots, x_n$ to maximize the minimum utility.

$$ \max \min_{i=1,\ldots,n} u_i(x_i) \quad \text{s.t.} \quad \sum x_i \leq C, \quad x_i \geq 0 $$

where $u_i$ are increasing concave utility functions.

**Reformulation:**
$$ \max t \quad \text{s.t.} \quad u_i(x_i) \geq t, \, i=1,\ldots,n, \quad \sum x_i \leq C, \quad x_i \geq 0 $$

For fixed $t$, the feasibility check is:
$$ u_i(x_i) \geq t \iff x_i \geq u_i^{-1}(t) $$

(since $u_i$ is increasing, it's invertible).

Let $a_i(t) = u_i^{-1}(t)$. The constraint becomes:
$$ \sum x_i \leq C \quad \text{and} \quad x_i \geq a_i(t) $$

This is feasible iff $\sum a_i(t) \leq C$.

**Bisection:** Find the largest $t$ such that $\sum u_i^{-1}(t) \leq C$.

If $u_i$ are concave, $u_i^{-1}$ are convex, so $\sum u_i^{-1}(t)$ is convex in $t$. Use bisection on $t$.

## Visualizing Quasiconvex Functions

```plot
{
  "title": "Quasiconvex but Not Convex",
  "x_label": "x",
  "y_label": "f(x)",
  "functions": [
    {
      "fn": "max(0, x) - max(0, x-2)",
      "label": "f(x) = min(x, 2) for x≥0",
      "color": "green"
    }
  ],
  "x_range": [-1, 4]
}
```

This function is quasiconvex (sublevel sets are convex intervals) but not convex (it's piecewise linear with a peak).

## Common Mistakes

**Mistake 1: Assuming Quasiconvex Implies Convex**
Quasiconvexity is weaker than convexity. Not all quasiconvex functions are convex.

**Example:** $f(x) = \lfloor x \rfloor$ (floor function) is quasiconvex but not convex (not continuous).

**Mistake 2: Bisection Without Bounded Range**
Bisection requires knowing $l \leq p^* \leq u$. If the optimal value is unbounded, bisection doesn't initialize.

**Fix:** Heuristically find a large upper bound (e.g., evaluate the objective at a few feasible points).

**Mistake 3: Non-Convex Feasibility**
Bisection only works if the sublevel set $\{x : f_0(x) \leq t, f_i(x) \leq 0\}$ is convex for all $t$.

**Example:** Minimize $x_1/x_2$ s.t. $x_1 x_2 \geq 1$. The constraint is not convex. Bisection doesn't directly apply (need to reformulate).

## Practical Considerations

**Tolerance:** Choose $\epsilon$ based on the required accuracy. Tighter tolerance means more iterations.

**Initialization:** Good initial bounds $[l, u]$ speed up bisection. Use heuristics or domain knowledge to tighten the range.

**Warm Starting:** If solving a sequence of related problems, use the previous solution to initialize bounds.

**Hybrid Approach:** After bisection narrows the range, switch to a gradient-based method for fine-tuning (if the function is smooth).

## Key Takeaways

1. **Quasiconvexity:** Function $f$ is quasiconvex if all sublevel sets $\{x : f(x) \leq \alpha\}$ are convex.

2. **Bisection Method:** Solve quasiconvex problems by bisecting on the optimal value, solving convex feasibility at each step.

3. **Complexity:** $O(\log(1/\epsilon))$ convex feasibility problems. Very efficient.

4. **Linear Fractional:** Minimizing $\frac{c^T x + d}{e^T x + f}$ is quasiconvex. Use Charnes-Cooper transformation to convert to LP directly.

5. **Generalized Eigenvalue:** Minimizing $\lambda_{\max}(A(x), B(x))$ is quasiconvex. Use bisection with LMI feasibility checks.

6. **Recognition:** Ratios, max-of-convex, min-of-concave, and compositions with monotone functions are often quasiconvex.

7. **Limitation:** Bisection requires convex feasibility at each step. Non-convex constraints break the method.

8. **Tools:** Implement bisection manually or use solvers that support quasiconvex objectives (some advanced convex optimization libraries).