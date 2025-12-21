---
title: "Operations Preserving Convexity"
description: "Calculus of convex functions"
---

# Operations Preserving Convexity

To use convex optimization effectively, we need a library of building blocks and a set of rules for combining them. If we can verify that our objective function is constructed from convex components using valid operations, we know the problem is convex. This approach is called **Disciplined Convex Programming (DCP)**.

## Basic Operations

### 1. Non-negative Weighted Sums
If $f_1, \dots, f_k$ are convex and $w_1, \dots, w_k \geq 0$, then:
$$ f(x) = \sum_{i=1}^k w_i f_i(x) $$
is convex.
*Intuition:* Adding two bowls results in a steeper bowl.

### 2. Composition with Affine Function
If $f$ is convex, then $g(x) = f(Ax + b)$ is convex.
*Example:* Since $\|y\|$ is convex, $\|Ax - b\|$ is convex. This justifies least squares and many other regression formulations.

### 3. Pointwise Maximum
If $f_1, \dots, f_m$ are convex, then:
$$ f(x) = \max \{ f_1(x), \dots, f_m(x) \} $$
is convex.
*Proof:* The epigraph of the max is the intersection of the epigraphs of the individual functions. Intersection of convex sets is convex.
*Example:* Piecewise linear functions $f(x) = \max_i (a_i^T x + b_i)$ are convex.

### 4. Composition Rules
Let $f(x) = h(g(x))$. When is $f$ convex?
It's tricky because of curvature interactions.

**Scalar Case ($g: \mathbb{R}^n \to \mathbb{R}, h: \mathbb{R} \to \mathbb{R}$):**
$f$ is convex if:
- $h$ is convex and non-decreasing, and $g$ is convex.
  Example: $e^{x^2}$ ($e^u$ is convex increasing, $x^2$ is convex).
- $h$ is convex and non-increasing, and $g$ is concave.
  Example: $-\log(x)$ (not quite composition, but follows similar logic).

**Vector Case ($g: \mathbb{R}^n \to \mathbb{R}^k, h: \mathbb{R}^k \to \mathbb{R}$):**
$f(x) = h(g_1(x), \dots, g_k(x))$ is convex if:
- $h$ is convex and non-decreasing in each argument, and each $g_i$ is convex.

## Perspective Function

The **perspective** of a function $f: \mathbb{R}^n \to \mathbb{R}$ is the function $g: \mathbb{R}^{n+1} \to \mathbb{R}$ defined by:
$$ g(x, t) = t f(x/t), \quad \textbf{dom} g = \{ (x,t) \mid x/t \in \textbf{dom} f, t > 0 \} $$

**Theorem:** If $f$ is convex, its perspective $g$ is convex.

*Example:* $f(x) = x^2$ is convex.
Perspective: $g(x, t) = t (x/t)^2 = x^2/t$.
The function $x^2/t$ is convex on $\mathbb{R} \times \mathbb{R}_{++}$.
This is extremely useful for handling ratio constraints.

## Minimization

### Partial Minimization
If $f(x, y)$ is convex in $(x, y)$ and $C$ is a convex non-empty set, then:
$$ g(x) = \inf_{y \in C} f(x, y) $$
is convex in $x$.

*Example:* Given a convex cost function of distance $f(z) = \|z\|^2$, the distance from a point $x$ to a set $S$, $d(x, S) = \inf_{y \in S} \|x - y\|$, is convex if $S$ is convex.

## Constructive Convex Analysis (DCP)

Tools like **CVX**, **CVXPY**, and **Convex.jl** use these rules to automate convexity verification.
You define variables and combine them using only allowed operations. The software tracks the curvature (constant, affine, convex, concave) and sign (positive, negative) of every expression.

Example check for $\sqrt{x^2 + 1}$:
1. $x$ is affine.
2. $x^2$ is convex (square of affine).
3. $x^2 + 1$ is convex (sum of convex and constant).
4. $\sqrt{\cdot}$ is concave non-decreasing.
5. Composition rule: concave(convex) is... **not necessarily convex or concave!**
   Actually, $\sqrt{x^2+1}$ IS convex (it's a hyperbola), but the basic rules don't prove it.
   DCP would reject this unless you rewrite it as `norm([x, 1])` (L2 norm is convex).

This highlights the art of convex modeling: rewriting your problem to fit the rules.