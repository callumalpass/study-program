---
title: "Sublevel Sets"
description: "Geometric representation of convex functions"
---

# Sublevel Sets

While the epigraph links a convex function to a convex set in $\mathbb{R}^{n+1}$, **sublevel sets** link it to a family of convex sets in $\mathbb{R}^n$ (the domain).

## Definition

The $\alpha$-sublevel set of a function $f: \mathbb{R}^n \to \mathbb{R}$ is defined as:

$$ C_\alpha = \{ x \in \textbf{dom} f \mid f(x) \leq \alpha \} $$

**Theorem:** If $f$ is a convex function, then **all** of its sublevel sets $C_\alpha$ are convex sets, for any $\alpha \in \mathbb{R}$.

*Proof:*
Let $x, y \in C_\alpha$. This means $f(x) \leq \alpha$ and $f(y) \leq \alpha$.
Let $\theta \in [0, 1]$ and $z = \theta x + (1 - \theta)y$.
Since $f$ is convex:
$f(z) \leq \theta f(x) + (1 - \theta)f(y) \leq \theta \alpha + (1 - \theta)\alpha = \alpha$.
So $f(z) \leq \alpha$, which means $z \in C_\alpha$.
Thus $C_\alpha$ is convex.

## Converse is False

The converse is **not true**. A function can have convex sublevel sets but **not** be convex. These functions are called **quasiconvex**.

*Example:* $f(x) = \sqrt{|x|}$ on $\mathbb{R}$.
- Sublevel set for $\alpha=1$: {x | $\sqrt{|x|} \leq 1$} = {x | $|x| \leq 1$} = [-1, 1]. Convex.
- Function graph: Shape of a bird flying away. Not convex (midpoint is above curve).
- $f(0)=0, f(2)=\sqrt{2} \approx 1.41$. Midpoint $f(1)=1$.
  Average: $0.5(0) + 0.5(1.41) = 0.7$.
  $f(1) = 1 > 0.7$. Violation of convexity.

## Quasiconvex Functions

A function $f$ is **quasiconvex** if its domain is convex and all sublevel sets $S_\alpha$ are convex.

Mathematically:
$$ f(\theta x + (1 - \theta)y) \leq \max \{ f(x), f(y) \} $$

**Geometric interpretation:** Along any line segment, the function does not have a "local maximum" in the middle. It can go down and up (like a valley), or just up, or just down, but it can't go up and then down (like a hill).

### Examples
1.  **Distribution Functions:** The Cumulative Distribution Function (CDF) of a Gaussian is not convex (it's S-shaped), but it is quasiconvex (actually log-concave).
2.  **Fractional Functions:** $f(x) = \frac{a^T x + b}{c^T x + d}$ on domain where denominator $>0$. This is quasiconvex (and quasiconcave).

## Optimization Implications

**Convex Function:**
- Local min is Global min.
- Any stationary point ($\nabla f = 0$) is Global min.
- Efficient to minimize.

**Quasiconvex Function:**
- Local min is Global min (mostly).
- Stationary point ($\nabla f = 0$) might be an inflection point or max (think $x^3$).
- Can be minimized via **Bisection Method** (Quasiconvex optimization).
  - Solve feasibility problem $f(x) \leq t$ for fixed $t$ (convex set check).
  - Binary search on $t$.

**Non-convex Function:**
- Local min may not be Global min.
- Hard to minimize.

## Role in Constraint Design

When designing an optimization model, constraints must define a convex set.
$$ g_i(x) \leq 0 $$
For the feasible region {x | $g_i(x) \leq 0$} to be convex, we typically require $g_i$ to be a convex function.
However, it is sufficient for $g_i$ to be **quasiconvex**, since the 0-sublevel set of a quasiconvex function is convex.

Example:
$$ \frac{a^T x + b}{c^T x + d} \leq 1 \iff a^T x + b \leq c^T x + d \iff (a-c)^T x + (b-d) \leq 0 $$
The fractional function is quasiconvex, and its sublevel set is a halfspace (convex).