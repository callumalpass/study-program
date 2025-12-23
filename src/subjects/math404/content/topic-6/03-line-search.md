---
title: "Line Search Methods"
description: "Strategies for choosing the step size"
---

# Line Search Methods

In many optimization algorithms (Gradient Descent, Newton's Method, Conjugate Gradient), the update rule is:
$$ x_{k+1} = x_k + \alpha_k p_k $$
where $p_k$ is a search direction (e.g., $-\nabla f$) and $\alpha_k > 0$ is the **step length**.

Choosing $\alpha_k$ is a 1D optimization problem:
$$ \phi(\alpha) = f(x_k + \alpha p_k) $$
We want to find $\alpha > 0$ that significantly reduces $\phi(\alpha)$.

## Exact Line Search

The ideal choice is the global minimizer:
$$ \alpha^* = \arg \min_{\alpha > 0} \phi(\alpha) $$
This is called **Exact Line Search**.
- **Pros:** Guaranteed best reduction.
- **Cons:** Expensive. Requires iterating inside an iteration.
- **Use case:** Only when the minimization is cheap (e.g., quadratic functions).

For a quadratic $f(x) = \frac{1}{2}x^T Q x - b^T x$, the optimal $\alpha$ has a closed form:
$$ \alpha^* = \frac{g_k^T g_k}{g_k^T Q g_k} $$
(for Steepest Descent).

## Inexact Line Search

In practice, we don't need the *best* $\alpha$; we just need a *good* one that guarantees convergence. This is **Inexact Line Search**.
We rely on conditions that ensure we make "sufficient progress."

### 1. Sufficient Decrease (Armijo Condition)

We require that the function value decreases at least proportional to the slope at $\alpha=0$.
$$ f(x_k + \alpha p_k) \leq f(x_k) + c_1 \alpha \nabla f(x_k)^T p_k $$
where $c_1 \in (0, 1)$ (typically $10^{-4}$). 

Geometric meaning: The function value must lie below the line starting at $f(x_k)$ with slope $c_1 \nabla f^T p$.
This ensures we don't take a step that increases $f$ or decreases it negligibly.

However, this condition is satisfied for very small $\alpha$. To avoid tiny steps, we need a second condition.

### 2. Curvature Condition (Wolfe Condition)

We ensure the slope at the new point is less steep than the initial slope (or at least, has increased significantly).
$$ \nabla f(x_k + \alpha p_k)^T p_k \geq c_2 \nabla f(x_k)^T p_k $$
where $c_2 \in (c_1, 1)$ (typically $0.9$ for Newton, $0.1$ for Conjugate Gradient).

Meaning: We've gone far enough that the descent is slowing down. If the slope is still very negative, we should go further.

**Strong Wolfe Conditions:**
Force the slope to be small in magnitude (close to zero).
$$ |\nabla f(x_k + \alpha p_k)^T p_k| \leq c_2 |\nabla f(x_k)^T p_k| $$

## Backtracking Line Search

This is the simplest and most common implementation of the Armijo condition.

**Algorithm:**
1.  Choose parameters $\bar{\alpha} > 0$ (e.g., 1), $\rho \in (0, 1)$ (e.g., 0.5), $c \in (0, 1)$ (e.g., $10^{-4}$).
2.  Set $\alpha \leftarrow \bar{\alpha}$.
3.  While $f(x_k + \alpha p_k) > f(x_k) + c \alpha \nabla f(x_k)^T p_k$:
    - $\alpha \leftarrow \rho \alpha$ (Shrink step).
4.  Return $\alpha_k = \alpha$.

**Why it works:**
Since $p_k$ is a descent direction ($\nabla f^T p < 0$), for sufficiently small $\alpha$, the condition will hold (Taylor's theorem). The loop always terminates.

## Comparison

- **Constant Step Size:** No computation cost, but dangerous. Can diverge or crawl.
- **Exact Line Search:** Too expensive for general non-linear functions.
- **Backtracking:** Good balance. Robust.
- **Wolfe Search:** More complex to implement (requires zooming in/out), but theoretically superior for Quasi-Newton methods (BFGS) because it preserves positive definiteness of the Hessian approximation.

## Implementation Note

In code (Python/SciPy):
- Simple implementation: Use Backtracking.
- Library implementation: `scipy.optimize.line_search` uses Wolfe conditions (More-Thuente algorithm).

## Detailed Example: Line Search on a Quadratic

Consider $f(x) = \frac{1}{2}(x_1^2 + 10x_2^2)$. Start at $x^{(0)} = [10, 1]^T$ with search direction $p = -\nabla f(x^{(0)}) = [-10, -20]^T$.

The 1D function along the ray is:
$$ \phi(\alpha) = f(x^{(0)} + \alpha p) = f([10-10\alpha, 1-20\alpha]^T) $$
$$ = \frac{1}{2}((10-10\alpha)^2 + 10(1-20\alpha)^2) $$
$$ = \frac{1}{2}(100 - 200\alpha + 100\alpha^2 + 10 - 400\alpha + 4000\alpha^2) $$
$$ = \frac{1}{2}(110 - 600\alpha + 4100\alpha^2) $$

**Exact Line Search:**
Minimize $\phi(\alpha)$ by setting $\phi'(\alpha) = 0$:
$$ \phi'(\alpha) = \frac{1}{2}(-600 + 8200\alpha) = 0 $$
$$ \alpha^* = \frac{600}{8200} = \frac{3}{41} \approx 0.0732 $$

At this $\alpha$, $\phi(\alpha^*) = \frac{1}{2}(110 - 600 \cdot \frac{3}{41} + 4100 \cdot \frac{9}{1681}) = 33.05$

Compare to $\phi(0) = 55$, a reduction of 40%.

**Backtracking Line Search:**
Starting with $\alpha = 1$, $c = 0.1$, $\rho = 0.5$:
- Try $\alpha = 1$: $\phi(1) = 2055$ > $\phi(0) + 0.1 \cdot 1 \cdot \phi'(0) = 55 - 30 = 25$. Reject.
- Try $\alpha = 0.5$: $\phi(0.5) = 302.5$ > $25$. Reject.
- Try $\alpha = 0.25$: $\phi(0.25) = 83.1$ > $25$. Reject.
- Try $\alpha = 0.125$: $\phi(0.125) = 36.5$ > $25$. Reject.
- Try $\alpha = 0.0625$: $\phi(0.0625) = 33.7$ < $25$. Accept!

The backtracking gives $\alpha = 0.0625$, close to the optimal $0.0732$.

## Zoom Algorithm for Wolfe Conditions

The Wolfe conditions are more complex to satisfy than Armijo alone. A common implementation is the **zoom** procedure:

1. **Bracketing phase:** Find an interval $[\alpha_{\text{lo}}, \alpha_{\text{hi}}]$ containing acceptable step sizes.
2. **Zoom phase:** Bisect or interpolate within the bracket to find $\alpha$ satisfying both conditions.

The More-Thuente algorithm (used in SciPy) is a sophisticated zoom implementation using cubic interpolation for efficiency.

## Visual Interpretation

```plot
{
  "xAxis": { "domain": [0, 1], "label": "Step size α" },
  "yAxis": { "domain": [0, 15], "label": "φ(α)" },
  "data": [
    { "fn": "10 - 15*x + 8*x^2", "color": "#2563eb", "title": "φ(α)" },
    { "fn": "10 - 7.5*x", "color": "#dc2626", "title": "Armijo bound (c₁=0.5)" },
    { "fn": "10 - 3*x", "color": "#16a34a", "title": "Armijo bound (c₁=0.2)" }
  ]
}
```

In this plot, $\phi(\alpha)$ must lie below the Armijo bound line. The gentler the bound (smaller $c_1$), the easier to satisfy, but we might accept steps with little progress.

## Choosing Between Line Search Strategies

### When to Use Exact Line Search
- Cheap to compute: Quadratic functions, where $\alpha^*$ has a closed form
- Few variables: When the 1D minimization is fast
- Academic problems: For theoretical analysis

### When to Use Backtracking
- General non-linear functions
- Gradient descent or steepest descent
- When simplicity is valued
- When derivatives are expensive (don't want to evaluate gradient at many points)

### When to Use Wolfe Line Search
- Quasi-Newton methods (BFGS, L-BFGS): The curvature condition preserves positive definiteness
- Conjugate gradient: Ensures sufficient orthogonality
- When iteration count matters more than per-iteration cost
- Professional optimization libraries

## Common Mistakes with Line Search

### 1. Starting $\bar{\alpha}$ Too Small
If you always start with $\bar{\alpha} = 0.01$, you'll never explore larger step sizes. Better: start with $\bar{\alpha} = 1$ and shrink if needed.

### 2. Too Strict $c_1$ in Armijo
Using $c_1 = 0.9$ is too strict—almost no step will satisfy it. Typical: $c_1 = 10^{-4}$.

### 3. Incompatible Wolfe Parameters
Must have $0 < c_1 < c_2 < 1$. A common error is setting $c_1 = 0.5, c_2 = 0.1$ (backward!).

### 4. Not Checking for Descent Direction
Line search assumes $\nabla f^T p < 0$ (descent direction). If this fails, the algorithm can loop forever. Always verify:
```
if gradient.dot(direction) >= 0:
    raise ValueError("Not a descent direction!")
```

### 5. Ignoring Line Search Failure
Sometimes line search fails (e.g., numerical issues, bad direction). Don't silently continue—reset or use a fallback strategy.

## Efficiency Considerations

### Function Evaluations vs Gradient Evaluations
- Backtracking requires only function values $f(x)$
- Wolfe requires gradients $\nabla f(x)$ at trial points
- If gradients are expensive, backtracking is preferred

### Interpolation vs Halving
Simple backtracking uses $\alpha \leftarrow \rho \alpha$ (geometric shrinking).
More sophisticated: Use quadratic or cubic interpolation to guess the minimizer:
$$ \alpha_{\text{new}} = -\frac{\phi'(0) \alpha^2}{2(\phi(\alpha) - \phi(0) - \phi'(0)\alpha)} $$
This can reduce the number of function evaluations.

### Caching Gradients
When moving from $x^{(k)}$ to $x^{(k+1)}$, you compute $\nabla f(x^{(k+1)})$ during line search. Cache it for the next iteration!

## Line Search in Trust Region Methods

Trust region methods take a different approach: Instead of choosing $\alpha$ along a direction $p$, they choose $p$ within a ball of radius $\Delta$ (the trust region). If the step is good, increase $\Delta$; if bad, decrease $\Delta$.

This is more robust for non-convex problems but requires solving a constrained subproblem (typically using the Steihaug-Toint CG method).

## Globalization Strategies

Line search is a **globalization** technique: It ensures convergence from any starting point (not just near the solution).

Other globalization techniques:
- **Trust regions:** Limit step size by radius
- **Filter methods:** For constrained optimization
- **Monotone vs non-monotone:** Allow occasional increases in $f$ to escape plateaus

## Practical Pseudocode

**Backtracking Line Search:**
```
function backtracking_line_search(f, grad_f, x, p, alpha_init=1.0, rho=0.5, c=1e-4):
    alpha = alpha_init
    fx = f(x)
    grad_fx = grad_f(x)
    slope = grad_fx.dot(p)

    while f(x + alpha * p) > fx + c * alpha * slope:
        alpha = rho * alpha
        if alpha < 1e-10:  # safeguard
            break

    return alpha
```

**Wolfe Line Search (simplified):**
```
function wolfe_line_search(f, grad_f, x, p, c1=1e-4, c2=0.9):
    # Find alpha satisfying Armijo and curvature conditions
    # (Full implementation is complex; use library!)
    return scipy.optimize.line_search(f, grad_f, x, p, c1=c1, c2=c2)[0]
```

## Key Takeaways

1. **Line search chooses the step length** $\alpha$ along a search direction $p$ to ensure sufficient decrease in the objective.

2. **Exact line search is optimal but expensive**—only practical for special cases like quadratics.

3. **Backtracking (Armijo) is simple and robust**, requiring only function values. It's the go-to for basic implementations.

4. **Wolfe conditions add a curvature requirement**, ensuring the step goes far enough. Essential for BFGS and conjugate gradient.

5. **Parameter choices matter:** Typical values are $c_1 = 10^{-4}$, $c_2 = 0.9$ (Newton) or $0.1$ (CG), $\rho = 0.5$.

6. **Line search is a globalization technique** that makes local methods (like Newton) work from poor initializations.

7. **Trade-offs:** Simplicity (backtracking) vs optimality (Wolfe), function evals vs gradient evals.

8. **In practice:** Use library implementations (SciPy, Optim.jl) rather than rolling your own for Wolfe conditions.