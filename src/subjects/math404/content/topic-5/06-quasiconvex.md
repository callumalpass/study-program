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