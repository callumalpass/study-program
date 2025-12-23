---
title: "Convex Functions"
description: "Definition and properties of convex functions"
---

# Convex Functions

Optimization problems minimize functions. If the function is **convex**, we are in luck: any local minimum is a global minimum.

## Definition

A function $f: \mathbb{R}^n \to \mathbb{R}$ is **convex** if its domain $\textbf{dom} f$ is a convex set and for all $x, y \in \textbf{dom} f$ and $\theta \in [0, 1]$:

$$ f(\theta x + (1 - \theta)y) \leq \theta f(x) + (1 - \theta)f(y) $$

**Geometric Interpretation:** The graph of the function lies **below** the chord (line segment) connecting any two points on the graph. It looks like a bowl (or a valley).

The following plot compares convex, concave, and non-convex functions:

```plot
{
  "xAxis": { "domain": [-2, 2] },
  "yAxis": { "domain": [-2, 5] },
  "data": [
    { "fn": "x^2", "color": "#2563eb", "title": "Convex: x²" },
    { "fn": "-x^2 + 3", "color": "#dc2626", "title": "Concave: -x² + 3" },
    { "fn": "x^3 - x", "color": "#16a34a", "title": "Neither: x³ - x" }
  ]
}
```

A function is **strictly convex** if the inequality is strict for $x \neq y$ and $\theta \in (0, 1)$.
A function is **concave** if $-f$ is convex. Concave functions look like hills or domes.

## First-Order Condition (Gradient)

If $f$ is differentiable (smooth), then $f$ is convex if and only if its domain is convex and for all $x, y \in \textbf{dom} f$:

$$ f(y) \geq f(x) + \nabla f(x)^T (y - x) $$

**Interpretation:**
The first-order Taylor approximation (the tangent plane) is a **global underestimator** of the function.
- If you stand at any point $x$ and look at the tangent plane, the entire function graph is above you.
- This is incredibly useful for optimization: if $\nabla f(x) = 0$, then $f(y) \geq f(x) + 0$, so $f(x)$ is a global minimum.

## Second-Order Condition (Hessian)

If $f$ is twice differentiable, then $f$ is convex if and only if its domain is convex and its **Hessian matrix** is positive semidefinite everywhere:

$$ \nabla^2 f(x) \succeq 0 \quad \forall x \in \textbf{dom} f $$

Recall that a matrix $H$ is positive semidefinite ($H \succeq 0$) if $v^T H v \geq 0$ for all vectors $v$.
- In 1D ($n=1$): $f''(x) \geq 0$. (Curve bends upward).
- In $n$D: The curvature is non-negative in every direction.

## Examples of Convex Functions

1.  **Exponential:** $e^{ax}$ is convex on $\mathbb{R}$.
2.  **Powers:** $x^a$ is convex on $\mathbb{R}_{++}$ for $a \geq 1$ or $a \leq 0$. (Note: concave for $0 < a < 1$).
3.  **Logarithm:** $-\log x$ is convex on $\mathbb{R}_{++}$ ($\log x$ is concave).
4.  **Norms:** Every norm on $\mathbb{R}^n$ is convex. $\|x\|_p$ for $p \geq 1$.
    *Triangle inequality is basically the definition of convexity.*
5.  **Quadratic:** $f(x) = \frac{1}{2} x^T P x + q^T x + r$ is convex if and only if $P \succeq 0$.
6.  **Max Function:** $f(x) = \max(x_1, \dots, x_n)$ is convex.
7.  **Log-Sum-Exp:** $f(x) = \log(\sum e^{x_i})$ is convex. (Used in machine learning as a smooth approximation to max).

## Epigraph

The connection between convex sets and convex functions is provided by the **epigraph**.
The epigraph of a function $f$ is the set of points lying on or above its graph:
$$ \textbf{epi} f = \{ (x, t) \in \mathbb{R}^{n+1} \mid x \in \textbf{dom} f, f(x) \leq t \} $$

**Theorem:** A function $f$ is convex if and only if its epigraph is a convex set.

This allows us to translate problems involving functions into problems involving geometric sets.
Minimizing $f(x)$ is equivalent to finding the lowest point in $\textbf{epi} f$.

## Jensen's Inequality

The definition of convexity can be extended to probabilistic expectations.

**Theorem (Jensen):**
If $f$ is convex and $X$ is a random variable, then:
$$ f(\mathbb{E}[X]) \leq \mathbb{E}[f(X)] $$

*Example:* Since $f(x) = x^2$ is convex, $(\mathbb{E}[X])^2 \leq \mathbb{E}[X^2]$.
This implies variance $\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2 \geq 0$.