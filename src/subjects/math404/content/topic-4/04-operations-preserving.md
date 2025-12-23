---
title: "Operations Preserving Convexity"
description: "Calculus of convex functions"
---

# Operations Preserving Convexity

To use convex optimization effectively, we need a library of building blocks and a set of rules for combining them. If we can verify that our objective function is constructed from convex components using valid operations, we know the problem is convex. This approach is called **Disciplined Convex Programming (DCP)** and forms the basis of modern convex optimization software.

Rather than checking the definition of convexity for every new function we encounter, we can establish convexity by construction: start with known convex building blocks and combine them using operations that preserve convexity.

## Basic Operations

### 1. Non-negative Weighted Sums

If $f_1, \dots, f_k$ are convex and $w_1, \dots, w_k \geq 0$, then:
$$ f(x) = \sum_{i=1}^k w_i f_i(x) $$
is convex.

*Proof:* Let $\theta \in [0,1]$. Then:
$$f(\theta x + (1-\theta)y) = \sum_i w_i f_i(\theta x + (1-\theta)y) \leq \sum_i w_i [\theta f_i(x) + (1-\theta) f_i(y)]$$
$$ = \theta \sum_i w_i f_i(x) + (1-\theta) \sum_i w_i f_i(y) = \theta f(x) + (1-\theta) f(y) $$

*Intuition:* Adding two bowls results in a steeper bowl. Scaling a bowl by a positive constant keeps it bowl-shaped.

*Corollary:* The sum of convex functions is convex. The non-negative multiple of a convex function is convex.

### 2. Composition with Affine Function

If $f$ is convex, then $g(x) = f(Ax + b)$ is convex for any matrix $A$ and vector $b$.

*Proof:* The domain of $g$ is the preimage of a convex set under an affine map, hence convex. For the function value:
$$g(\theta x + (1-\theta)y) = f(A(\theta x + (1-\theta)y) + b) = f(\theta(Ax+b) + (1-\theta)(Ay+b))$$
$$\leq \theta f(Ax+b) + (1-\theta) f(Ay+b) = \theta g(x) + (1-\theta) g(y)$$

*Example:* Since $\|y\|$ is convex, $\|Ax - b\|$ is convex. This justifies least squares and many other regression formulations.

*Example:* If $f(x) = x^2$ is convex, then $f(3x - 2) = (3x-2)^2$ is convex.

### 3. Pointwise Maximum

If $f_1, \dots, f_m$ are convex, then:
$$ f(x) = \max \{ f_1(x), \dots, f_m(x) \} $$
is convex.

*Proof:* The epigraph of the max is the intersection of the epigraphs:
$$\textbf{epi}(\max_i f_i) = \bigcap_i \textbf{epi}(f_i)$$
Intersection of convex sets is convex, so the epigraph is convex, hence the function is convex.

*Example:* Piecewise linear functions $f(x) = \max_i (a_i^T x + b_i)$ are convex. These arise naturally in many applications including hinge loss in SVMs.

*Extension:* The pointwise supremum of an arbitrary family of convex functions is convex (if well-defined):
$$f(x) = \sup_{\alpha \in A} f_\alpha(x)$$

### 4. Pointwise Minimum (Concave!)

**Warning:** The pointwise minimum of convex functions is generally **not** convex. However, the minimum of concave functions is concave.

*Example:* $\min(x, 1-x)$ is concave (tent function).

### 5. Infimal Convolution

The **infimal convolution** (or epi-sum) of functions $f$ and $g$ is:
$$(f \square g)(x) = \inf_y \{f(y) + g(x-y)\}$$

If both $f$ and $g$ are convex, then $f \square g$ is convex. This operation is important in duality theory and control.

## Composition Rules

Let $f(x) = h(g(x))$. When is $f$ convex? This is tricky because of curvature interactions.

### Scalar Case

For $g: \mathbb{R}^n \to \mathbb{R}$ and $h: \mathbb{R} \to \mathbb{R}$, the composition $f = h \circ g$ is:

| Condition | Result |
|-----------|--------|
| $h$ convex non-decreasing, $g$ convex | $f$ convex |
| $h$ convex non-increasing, $g$ concave | $f$ convex |
| $h$ concave non-decreasing, $g$ concave | $f$ concave |
| $h$ concave non-increasing, $g$ convex | $f$ concave |

*Example:* $e^{x^2}$ is convex because $e^u$ is convex and increasing, and $x^2$ is convex.

*Example:* $1/g(x)$ is convex if $g$ is concave and positive (since $1/u$ is convex and decreasing on $\mathbb{R}_{++}$).

*Example:* $\log(g(x))$ is concave if $g$ is concave and positive (since $\log$ is concave and increasing).

### Vector Case

For $g: \mathbb{R}^n \to \mathbb{R}^k$ and $h: \mathbb{R}^k \to \mathbb{R}$:

$f(x) = h(g_1(x), \dots, g_k(x))$ is convex if:
- $h$ is convex and non-decreasing in each argument, and each $g_i$ is convex.

*Example:* $\log(e^{g_1(x)} + e^{g_2(x)})$ is convex if $g_1, g_2$ are convex (log-sum-exp is convex and increasing in each argument).

## Perspective Function

The **perspective** of a function $f: \mathbb{R}^n \to \mathbb{R}$ is the function $g: \mathbb{R}^{n+1} \to \mathbb{R}$ defined by:
$$ g(x, t) = t f(x/t), \quad \textbf{dom} g = \{ (x,t) \mid x/t \in \textbf{dom} f, t > 0 \} $$

**Theorem:** If $f$ is convex, its perspective $g$ is convex.

*Example:* $f(x) = x^2$ is convex.
Perspective: $g(x, t) = t (x/t)^2 = x^2/t$.
The function $x^2/t$ is convex on $\mathbb{R} \times \mathbb{R}_{++}$.

*Example:* The perspective of $-\log x$ is $-t \log(x/t) = t \log(t/x)$, which is the relative entropy.

This operation is extremely useful for handling ratio constraints and appears in information theory, statistics, and finance.

## Partial Minimization

If $f(x, y)$ is convex in $(x, y)$ and $C$ is a convex non-empty set, then:
$$ g(x) = \inf_{y \in C} f(x, y) $$
is convex in $x$ (where defined).

*Proof Sketch:* The epigraph of $g$ is the projection of the epigraph of $f$ intersected with $C$, which preserves convexity.

*Example:* Given a convex cost function of distance $f(z) = \|z\|^2$, the distance from a point $x$ to a set $S$:
$$d(x, S) = \inf_{y \in S} \|x - y\|$$
is convex if $S$ is convex.

*Example:* In Lagrangian relaxation, minimizing over the primal variables gives a convex dual function.

## Constructive Convex Analysis (DCP)

Tools like **CVX** (MATLAB), **CVXPY** (Python), and **Convex.jl** (Julia) use these rules to automate convexity verification. This methodology is called **Disciplined Convex Programming**.

You define variables and combine them using only allowed operations. The software tracks the **curvature** (constant, affine, convex, concave, unknown) and **sign** (positive, negative, unknown) of every expression.

### DCP Atoms

DCP libraries provide a set of basic functions (atoms) with known curvature and monotonicity:
- `square(x)`: convex, increasing for $x \geq 0$
- `sqrt(x)`: concave, increasing
- `exp(x)`: convex, increasing
- `log(x)`: concave, increasing
- `norm(x)`: convex

### Example: Verifying $\sqrt{x^2 + 1}$

1. $x$ is affine.
2. $x^2$ is convex (square of affine).
3. $x^2 + 1$ is convex (sum of convex and constant).
4. $\sqrt{\cdot}$ is concave non-decreasing.
5. Composition rule: concave(convex) is... **not necessarily convex or concave!**

Actually, $\sqrt{x^2+1}$ IS convex (it's a hyperbola), but the basic DCP rules don't prove it. DCP would reject this expression unless you rewrite it as:
```
norm([x, 1])  # L2 norm is convex
```

This highlights the art of convex modeling: rewriting your problem to fit the DCP rules.

### Reformulation Techniques

Common reformulations include:
- Replace $|x|$ with a norm
- Replace max with epigraph form: $t \geq \max(f_1, f_2)$ becomes $t \geq f_1, t \geq f_2$
- Use Schur complements for matrix inequalities
- Introduce auxiliary variables to expose hidden convex structure

## Common Mistakes

1. **Forgetting monotonicity in composition:** $h \circ g$ is not convex just because both are convex. Monotonicity of $h$ matters.

2. **Applying DCP to non-DCP expressions:** Just because a function is convex doesn't mean DCP can verify it. You may need reformulation.

3. **Ignoring domains:** Operations preserve convexity only on the intersection of domains where both functions are defined.

4. **Assuming min preserves convexity:** The minimum of convex functions is generally NOT convex.

## Key Takeaways

- Non-negative weighted sums preserve convexity.
- Composition with affine functions preserves convexity.
- Pointwise maximum of convex functions is convex.
- Composition rules depend on both curvature and monotonicity.
- The perspective operation preserves convexity.
- DCP tools automate convexity verification using these rules.
- Sometimes reformulation is needed to make convexity evident to DCP.
