---
title: "Sublevel Sets"
description: "Geometric representation of convex functions"
---

# Sublevel Sets

While the epigraph links a convex function to a convex set in $\mathbb{R}^{n+1}$, **sublevel sets** link it to a family of convex sets in $\mathbb{R}^n$ (the domain). Understanding sublevel sets provides geometric insight into optimization and connects to the important class of quasiconvex functions.

## Definition

The $\alpha$-sublevel set of a function $f: \mathbb{R}^n \to \mathbb{R}$ is defined as:

$$ C_\alpha = \{ x \in \textbf{dom} f \mid f(x) \leq \alpha \} $$

Similarly, the $\alpha$-superlevel set is $\{x \mid f(x) \geq \alpha\}$, and the $\alpha$-level set is $\{x \mid f(x) = \alpha\}$.

**Theorem:** If $f$ is a convex function, then **all** of its sublevel sets $C_\alpha$ are convex sets, for any $\alpha \in \mathbb{R}$.

*Proof:*
Let $x, y \in C_\alpha$. This means $f(x) \leq \alpha$ and $f(y) \leq \alpha$.
Let $\theta \in [0, 1]$ and $z = \theta x + (1 - \theta)y$.
Since $f$ is convex:
$$f(z) \leq \theta f(x) + (1 - \theta)f(y) \leq \theta \alpha + (1 - \theta)\alpha = \alpha$$
So $f(z) \leq \alpha$, which means $z \in C_\alpha$.
Thus $C_\alpha$ is convex. $\square$

### Nested Structure

Sublevel sets are nested: if $\alpha_1 < \alpha_2$, then $C_{\alpha_1} \subseteq C_{\alpha_2}$. As you increase $\alpha$, the sublevel sets grow monotonically. The infimum of $f$ corresponds to the first non-empty sublevel set.

### Relationship to Optimization

Finding $\min f(x)$ is equivalent to finding the smallest $\alpha$ such that $C_\alpha$ is non-empty. This geometric view underlies the bisection method for optimization.

## Converse is False

The converse is **not true**. A function can have convex sublevel sets but **not** be convex. These functions are called **quasiconvex**.

*Example:* $f(x) = \sqrt{|x|}$ on $\mathbb{R}$.
- Sublevel set for $\alpha=1$: $\{x \mid \sqrt{|x|} \leq 1\} = \{x \mid |x| \leq 1\} = [-1, 1]$. This is convex (an interval).
- Function graph: Shape of a bird flying away. Not convex because the midpoint lies above the chord.
- Check: $f(0) = 0$, $f(2) = \sqrt{2} \approx 1.41$. Midpoint is $x = 1$ with $f(1) = 1$.
  Chord average: $0.5 \cdot 0 + 0.5 \cdot 1.41 = 0.705$.
  Since $f(1) = 1 > 0.705$, convexity is violated.

This shows that convex sublevel sets are **necessary but not sufficient** for convexity.

## Quasiconvex Functions

A function $f$ is **quasiconvex** if its domain is convex and all sublevel sets $C_\alpha$ are convex.

Equivalently, $f$ is quasiconvex if for all $x, y \in \textbf{dom} f$ and $\theta \in [0,1]$:
$$ f(\theta x + (1 - \theta)y) \leq \max \{ f(x), f(y) \} $$

This condition says the function value along any line segment never exceeds the maximum of the endpoint values.

### Geometric Interpretation

Along any line segment, a quasiconvex function does not have a "local maximum" in the middle:
- It can go down then up (like a valley ∨)
- It can just go up or just go down (monotonic)
- It **cannot** go up then down (like a hill ∧)

### Examples of Quasiconvex Functions

1. **All convex functions** are quasiconvex (convexity is stronger).

2. **Monotonic functions:** Any monotonic function of a single variable is quasiconvex.

3. **Distribution Functions:** The Cumulative Distribution Function (CDF) of a Gaussian is S-shaped — not convex, but quasiconvex (and quasiconcave, hence quasilinear).

4. **Fractional linear functions:**
$$f(x) = \frac{a^T x + b}{c^T x + d}$$
on the domain where $c^T x + d > 0$. This is both quasiconvex and quasiconcave.

5. **Length of a vector divided by a sum:** Functions like $\|x\|_2 / (a^T x)$ are often quasiconvex.

### Quasiconcave Functions

A function is **quasiconcave** if $-f$ is quasiconvex, or equivalently if all superlevel sets are convex:
$$ f(\theta x + (1 - \theta)y) \geq \min \{ f(x), f(y) \} $$

### Quasilinear Functions

A function that is both quasiconvex and quasiconcave is called **quasilinear**. All level sets of a quasilinear function are convex.

## Optimization Implications

The properties of sublevel sets determine the tractability of optimization:

### Convex Functions

- **Local min ⇒ Global min:** Any local minimum is the global minimum.
- **Stationary point optimality:** Any point with $\nabla f(x) = 0$ is a global minimizer.
- **Efficient algorithms:** Gradient descent, Newton's method, and interior-point methods converge efficiently.

### Quasiconvex Functions

- **Local min ⇒ Global min:** Still holds (sublevel sets are convex, so there's only one "valley").
- **Stationary points may not be optimal:** $\nabla f(x) = 0$ might be an inflection point, saddle point, or maximum. Consider $f(x) = x^3$: $f'(0) = 0$ but $x = 0$ is neither a min nor max.
- **Bisection optimization:** Can minimize via binary search:
  1. For a target $t$, check if $\{x \mid f(x) \leq t\} \cap C$ is non-empty (convex feasibility)
  2. Binary search on $t$ to find the smallest feasible value

### Non-convex / Non-quasiconvex Functions

- **Local min ≠ Global min:** Many local minima may exist.
- **Hard to minimize:** General non-convex optimization is NP-hard.
- **Heuristics required:** Gradient descent may get stuck; need multiple restarts, global search, etc.

## Role in Constraint Design

When designing an optimization model, constraints must define a convex feasible set.

Given constraints $g_i(x) \leq 0$, the feasible region is:
$$\mathcal{F} = \{x \mid g_i(x) \leq 0 \text{ for all } i\}$$

For $\mathcal{F}$ to be convex, we need each constraint's 0-sublevel set to be convex. This is guaranteed if:
- Each $g_i$ is a **convex function** (standard approach), OR
- Each $g_i$ is a **quasiconvex function** (more general)

### Example: Fractional Constraints

Consider:
$$ \frac{a^T x + b}{c^T x + d} \leq 1 $$

The left side is quasiconvex (on domain where denominator is positive). The constraint can be rewritten:
$$a^T x + b \leq c^T x + d \iff (a-c)^T x + (b-d) \leq 0$$

This is a linear (hence convex) constraint! The sublevel set is a halfspace.

### Perspective Reformulation

Many quasiconvex constraints can be reformulated as convex constraints using perspective transformations. For instance, $f(x)/t \leq 1$ for $t > 0$ can sometimes be written as a convex cone constraint.

## Superlevel Sets and Concave Functions

By symmetry:
- If $f$ is **concave**, all **superlevel sets** $\{x \mid f(x) \geq \alpha\}$ are convex.
- This is useful for maximization: maximizing a concave function over a convex set has a unique maximum.

## Common Mistakes

1. **Assuming convex sublevel sets imply convexity:** Quasiconvex functions have convex sublevel sets but are not convex.

2. **Confusing sublevel and level sets:** Sublevel sets include all points below a threshold; level sets are exactly at the threshold.

3. **Applying gradient conditions to quasiconvex functions:** Stationary points are not necessarily optimal for quasiconvex functions.

4. **Forgetting domain constraints:** The domain must be convex for the function to be quasiconvex.

## Key Takeaways

- Sublevel sets of convex functions are convex sets.
- The converse is false: quasiconvex functions have convex sublevel sets but may not be convex.
- Quasiconvexity: $f(\theta x + (1-\theta)y) \leq \max\{f(x), f(y)\}$.
- Quasiconvex optimization can be done via bisection on the objective value.
- For feasibility, quasiconvex constraint functions still yield convex feasible regions.
- Understanding sublevel sets provides geometric insight into optimization problem structure.
