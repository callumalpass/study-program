---
title: "Convex Functions"
description: "Definition and properties of convex functions"
---

# Convex Functions

Optimization problems minimize functions. If the function is **convex**, we are in luck: any local minimum is a global minimum. This simple fact is the cornerstone of convex optimization and explains why convex problems are fundamentally easier than general non-convex problems. Understanding convex functions is essential for recognizing when optimization problems are tractable.

## Definition

A function $f: \mathbb{R}^n \to \mathbb{R}$ is **convex** if its domain $\textbf{dom} f$ is a convex set and for all $x, y \in \textbf{dom} f$ and $\theta \in [0, 1]$:

$$ f(\theta x + (1 - \theta)y) \leq \theta f(x) + (1 - \theta)f(y) $$

This is sometimes called Jensen's inequality for two points.

**Geometric Interpretation:** The graph of the function lies **below** the chord (line segment) connecting any two points on the graph. It looks like a bowl (or a valley). If you draw a line between any two points on the graph, the function never goes above that line.

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

### Strict Convexity

A function is **strictly convex** if the inequality is strict for $x \neq y$ and $\theta \in (0, 1)$:
$$ f(\theta x + (1 - \theta)y) < \theta f(x) + (1 - \theta)f(y) $$

For strictly convex functions, not only is every local minimum a global minimum, but the global minimum is **unique** (if it exists).

### Strong Convexity

A function is **$\mu$-strongly convex** (for $\mu > 0$) if:
$$ f(y) \geq f(x) + \nabla f(x)^T (y-x) + \frac{\mu}{2} \|y - x\|^2 $$

This is a quantitative strengthening of convexity that guarantees the function curves upward at least as fast as a quadratic. Strong convexity provides important convergence rate guarantees for optimization algorithms.

### Concave Functions

A function is **concave** if $-f$ is convex. Concave functions look like hills or domes. The maximum of a concave function has the same nice properties as the minimum of a convex function.

## First-Order Condition (Gradient)

If $f$ is differentiable (smooth), then $f$ is convex if and only if its domain is convex and for all $x, y \in \textbf{dom} f$:

$$ f(y) \geq f(x) + \nabla f(x)^T (y - x) $$

**Interpretation:**
The first-order Taylor approximation (the tangent plane) is a **global underestimator** of the function.
- If you stand at any point $x$ and look at the tangent plane, the entire function graph is above you.
- This is incredibly useful for optimization: if $\nabla f(x^*) = 0$, then $f(y) \geq f(x^*) + 0$ for all $y$, so $x^*$ is a global minimum.

### Why This Matters for Optimization

The first-order condition tells us that for convex functions:
- **Gradient descent works globally:** Any stationary point ($\nabla f = 0$) is a global minimum.
- **No local traps:** We never get stuck in local minima because there aren't any (other than the global one).
- **Verifiable optimality:** If we find a point where the gradient is zero, we can certify it's optimal.

## Second-Order Condition (Hessian)

If $f$ is twice differentiable, then $f$ is convex if and only if its domain is convex and its **Hessian matrix** is positive semidefinite everywhere:

$$ \nabla^2 f(x) \succeq 0 \quad \forall x \in \textbf{dom} f $$

Recall that a matrix $H$ is positive semidefinite ($H \succeq 0$) if $v^T H v \geq 0$ for all vectors $v$.

- In 1D ($n=1$): $f''(x) \geq 0$. (Curve bends upward).
- In $n$D: The curvature is non-negative in every direction.

### Checking Positive Semidefiniteness

For small matrices, you can check positive semidefiniteness by:
1. Computing eigenvalues: all eigenvalues should be $\geq 0$.
2. Checking leading principal minors (Sylvester's criterion): all should be $\geq 0$.
3. Attempting a Cholesky decomposition (succeeds iff PSD).

For strictly convex functions, we require $\nabla^2 f(x) \succ 0$ (positive definite, meaning all eigenvalues are strictly positive).

## Examples of Convex Functions

1. **Affine:** $f(x) = a^T x + b$ is both convex and concave.

2. **Exponential:** $e^{ax}$ is convex on $\mathbb{R}$ for any $a$. The second derivative $a^2 e^{ax} > 0$.

3. **Powers:** $x^a$ is convex on $\mathbb{R}_{++}$ for $a \geq 1$ or $a \leq 0$. (Note: concave for $0 < a < 1$). For example, $x^2$ is convex, $\sqrt{x}$ is concave.

4. **Logarithm:** $-\log x$ is convex on $\mathbb{R}_{++}$ ($\log x$ is concave). This is the basis for barrier methods in interior-point algorithms.

5. **Norms:** Every norm on $\mathbb{R}^n$ is convex: $\|x\|_p$ for $p \geq 1$. The triangle inequality is essentially the definition of convexity for norms.

6. **Quadratic:** $f(x) = \frac{1}{2} x^T P x + q^T x + r$ is convex if and only if $P \succeq 0$. The Hessian is $\nabla^2 f = P$.

7. **Max Function:** $f(x) = \max(x_1, \dots, x_n)$ is convex. It's the pointwise maximum of linear functions $f_i(x) = x_i$.

8. **Log-Sum-Exp:** $f(x) = \log(\sum e^{x_i})$ is convex. (Used in machine learning as a smooth approximation to max).

9. **Negative Entropy:** $f(x) = \sum x_i \log x_i$ is convex on $\mathbb{R}^n_{++}$.

10. **Matrix Trace Norm:** $f(X) = \text{tr}(X^T X)^{1/2}$ is convex.

## Epigraph

The connection between convex sets and convex functions is provided by the **epigraph**.
The epigraph of a function $f$ is the set of points lying on or above its graph:
$$ \textbf{epi} f = \{ (x, t) \in \mathbb{R}^{n+1} \mid x \in \textbf{dom} f, f(x) \leq t \} $$

**Theorem:** A function $f$ is convex if and only if its epigraph is a convex set.

This allows us to translate problems involving functions into problems involving geometric sets:
- Minimizing $f(x)$ is equivalent to finding the lowest point in $\textbf{epi} f$.
- Properties of convex sets (separation theorems, etc.) apply to epigraphs.
- We can verify convexity of a function by checking convexity of its epigraph.

## Jensen's Inequality

The definition of convexity can be extended from finite convex combinations to probabilistic expectations.

**Theorem (Jensen):**
If $f$ is convex and $X$ is a random variable with $\mathbb{E}[X] \in \textbf{dom} f$, then:
$$ f(\mathbb{E}[X]) \leq \mathbb{E}[f(X)] $$

In words: the function of the average is at most the average of the function.

### Applications of Jensen's Inequality

*Example 1:* Since $f(x) = x^2$ is convex, $(\mathbb{E}[X])^2 \leq \mathbb{E}[X^2]$.
This implies variance $\text{Var}(X) = \mathbb{E}[X^2] - (\mathbb{E}[X])^2 \geq 0$.

*Example 2:* Since $f(x) = -\log x$ is convex, $-\log(\mathbb{E}[X]) \leq \mathbb{E}[-\log X]$, or equivalently:
$$ \log(\mathbb{E}[X]) \geq \mathbb{E}[\log X] $$
This proves the AM-GM inequality: the arithmetic mean is at least the geometric mean.

*Example 3:* For a convex loss function $\ell$, training on the expected feature distribution gives lower loss than the expected loss across the distribution.

## Common Mistakes

1. **Confusing convex sets with convex functions:** A convex set is a geometric object; a convex function has the "bowl" property. They're related via epigraphs but distinct.

2. **Forgetting domain requirements:** The domain must be convex for the function to be convex. A function can't be convex on a non-convex domain.

3. **Misapplying the second-order condition:** $\nabla^2 f \succeq 0$ characterizes convexity only for twice-differentiable functions. There are convex functions that are not differentiable (e.g., $|x|$).

4. **Confusing PSD with positive eigenvalues:** A positive semidefinite matrix has non-negative eigenvalues; positive definite requires strictly positive eigenvalues.

5. **Assuming composition preserves convexity:** The composition $f \circ g$ is not automatically convex even if both $f$ and $g$ are convex. Special conditions apply.

## Key Takeaways

- A function is convex if the line segment between any two points on its graph lies above the graph.
- For differentiable functions: convexity means tangent planes underestimate the function.
- For twice-differentiable functions: convexity means positive semidefinite Hessian.
- The epigraph links convex functions to convex sets.
- Jensen's inequality extends the definition to expectations.
- Convexity guarantees local minima are global minima, making optimization tractable.
