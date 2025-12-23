---
title: "Quasi-Newton Methods"
description: "BFGS and methods avoiding Hessian computation"
---

# Quasi-Newton Methods

Newton's method is fast (quadratic convergence) but expensive (Hessian computation $O(n^2)$ and inversion $O(n^3)$).
Gradient Descent is cheap ($O(n)$) but slow (linear convergence).

**Quasi-Newton Methods** strike a balance. They achieve **superlinear convergence** while only using gradient information ($O(n^2)$ or $O(n)$ per step).

## The Idea

Instead of computing the true Hessian $H = \nabla^2 f(x)$, we maintain an **approximation** $B_k \approx H_k$.
At each step, we update $B_k$ to satisfy the **Secant Equation**.

Let:
- $s_k = x_{k+1} - x_k$ (Step taken)
- $y_k = \nabla f(x_{k+1}) - \nabla f(x_k)$ (Change in gradient)

By Taylor expansion: $\nabla f(x_{k+1}) \approx \nabla f(x_k) + H_k(x_{k+1} - x_k)$.
So we require our approximation to satisfy:
$$ B_{k+1} s_k = y_k $$
(The matrix should map the step to the gradient change).

There are many matrices $B_{k+1}$ that satisfy this. We want the one closest to the current $B_k$.

## BFGS (Broyden-Fletcher-Goldfarb-Shanno)

BFGS is the most popular Quasi-Newton algorithm.
Instead of updating $B_k$, it's often easier to update the **inverse Hessian approximation** $H_k \approx (\nabla^2 f)^{-1}$ directly. (Note: standard notation usually flips: $B$ for Hessian, $H$ for inverse. I will use $H$ for inverse here).

**Update Rule:**
$$ H_{k+1} = (I - \rho_k s_k y_k^T) H_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T $$
where $\rho_k = \frac{1}{y_k^T s_k}$.

**Properties:**
1.  **Positive Definite:** If $H_k \succ 0$ and $y_k^T s_k > 0$ (curvature condition), then $H_{k+1} \succ 0$.
2.  **Cost:** Matrix-vector ops and rank-2 updates. $O(n^2)$ per iteration.
3.  **Convergence:** Superlinear.

## L-BFGS (Limited-memory BFGS)

For very large problems ($n > 1000$), storing the $n \times n$ matrix $H_k$ is too expensive.
**L-BFGS** does not store the matrix. Instead, it stores the last $m$ pairs of vectors $(s_i, y_i)$ (typically $m=10$).
Using these vectors, it computes the product $H_k \nabla f_k$ on the fly using a two-loop recursion.

- **Memory:** $O(mn)$.
- **Time:** $O(mn)$.
- **Convergence:** Linear (but very fast constant). Often better than pure Gradient Descent.
- **Industry Standard:** This is the default solver for large-scale machine learning (e.g., logistic regression in sklearn).

## DFP (Davidon-Fletcher-Powell)

The precursor to BFGS. It updates the Hessian approximation $B_k$ (not the inverse). It is the "dual" of BFGS. Generally less robust than BFGS.

## SR1 (Symmetric Rank-1)

A simpler rank-1 update.
$$ B_{k+1} = B_k + \frac{(y_k - B_k s_k)(y_k - B_k s_k)^T}{(y_k - B_k s_k)^T s_k} $$
- **Pros:** Does not require positive definiteness. Good for non-convex problems or trust-region methods.
- **Cons:** Denominator can vanish.

## Summary

If you have a smooth, unconstrained optimization problem:
- $n < 1000$: Use **BFGS**.
- $n \geq 1000$: Use **L-BFGS**.
- Only use Gradient Descent if you really can't afford $O(mn)$ memory or if the problem is extremely simple.

## The BFGS Algorithm in Detail

Here's the complete BFGS algorithm:

**Input:** Starting point $x_0$, initial Hessian approximation $H_0 = I$ (or scaled identity).

**For** $k = 0, 1, 2, \ldots$:
1. Compute gradient $g_k = \nabla f(x_k)$
2. Compute search direction $p_k = -H_k g_k$
3. Line search: Find $\alpha_k$ satisfying Wolfe conditions
4. Update position: $x_{k+1} = x_k + \alpha_k p_k$
5. Compute new gradient: $g_{k+1} = \nabla f(x_{k+1})$
6. Set $s_k = x_{k+1} - x_k = \alpha_k p_k$
7. Set $y_k = g_{k+1} - g_k$
8. Check curvature condition: If $y_k^T s_k \leq 0$, skip update (keep $H_{k+1} = H_k$)
9. Otherwise, update Hessian inverse:
   $$ H_{k+1} = (I - \rho_k s_k y_k^T) H_k (I - \rho_k y_k s_k^T) + \rho_k s_k s_k^T $$
   where $\rho_k = \frac{1}{y_k^T s_k}$

**Stop** when $\|g_k\| < \epsilon$.

The Wolfe line search is essential: It ensures $y_k^T s_k > 0$, which preserves positive definiteness.

## L-BFGS Algorithm: The Two-Loop Recursion

L-BFGS stores only the last $m$ pairs $(s_i, y_i)$ and computes $H_k g_k$ implicitly.

**Input:** Gradient $g$, history $\{s_i, y_i\}_{i=k-m}^{k-1}$, initial scaling $\gamma_k = \frac{y_{k-1}^T s_{k-1}}{y_{k-1}^T y_{k-1}}$

**First Loop (backward):**
```
q = g
for i = k-1, k-2, ..., k-m:
    ρ_i = 1 / (y_i^T s_i)
    α_i = ρ_i s_i^T q
    q = q - α_i y_i
```

**Initialize:**
```
r = γ_k q  # Scale by H_0 approximation
```

**Second Loop (forward):**
```
for i = k-m, k-m+1, ..., k-1:
    β = ρ_i y_i^T r
    r = r + s_i (α_i - β)
```

**Return:** $r \approx H_k g$

This beautiful recursion requires only $O(mn)$ operations and storage!

## Why Does BFGS Work? Intuition

The Secant equation $B_{k+1} s_k = y_k$ says: "The approximate Hessian should map the step we took to the gradient change we observed."

Think of it as fitting a quadratic model to the function behavior. Each step gives us one constraint. Over many steps, the approximation improves.

**Key insight:** We don't need the exact Hessian—just a good enough approximation of its action on vectors.

## Numerical Example: BFGS on a Quadratic

Minimize $f(x) = \frac{1}{2}x^T Q x$ where $Q = \text{diag}(1, 10)$.

Start at $x_0 = [10, 10]^T$ with $H_0 = I$.

**Iteration 0:**
- $g_0 = Qx_0 = [10, 100]^T$
- $p_0 = -H_0 g_0 = [-10, -100]^T$
- Exact line search: $\alpha_0 = \frac{g_0^T g_0}{g_0^T Q g_0} = \frac{10{,}100}{10{,}000 + 100{,}000} = 0.0918$
- $x_1 = [9.08, -0.82]^T$

**Iteration 1:**
- $g_1 = [9.08, -8.2]^T$
- $s_0 = x_1 - x_0 = [-0.92, -10.82]^T$
- $y_0 = g_1 - g_0 = [-0.92, -108.2]^T$
- Update $H_1$ via BFGS formula
- $p_1 = -H_1 g_1$ (now scaled differently for each coordinate)
- After this step, BFGS recognizes the diagonal structure!

For a quadratic in $n$ dimensions, BFGS converges in at most $n$ steps (finite termination property).

## Comparison: BFGS vs SR1 vs DFP

| Property | BFGS | SR1 | DFP |
| :--- | :---: | :---: | :---: |
| Rank of update | 2 | 1 | 2 |
| Positive definite? | Yes (with Wolfe) | No | Yes (with Wolfe) |
| Robustness | High | Medium | Medium |
| Superlinear convergence | Yes | Yes | Yes |
| Preferred for line search | ✓ | | |
| Preferred for trust region | | ✓ | |

**Why BFGS dominates DFP:** Empirically, BFGS is more robust to errors in line search and numerical issues. Theoretical analysis shows BFGS has better self-correcting properties.

## When Quasi-Newton Methods Fail

### 1. Non-smooth Functions
Quasi-Newton requires gradient information. For non-smooth $f$ (e.g., $|x|$), gradients don't exist.

**Fix:** Use subgradient methods or bundle methods.

### 2. Stochastic Gradients
BFGS assumes gradients are exact. For noisy gradients (e.g., mini-batch SGD), the Secant equation is violated.

**Fix:** Use L-BFGS with careful noise handling, or stick with Adam/SGD with momentum.

### 3. Very Large Scale ($n > 10^6$)
Even L-BFGS with $m=10$ requires $O(mn) = 10^7$ memory and operations.

**Fix:** Use gradient descent, coordinate descent, or stochastic methods.

### 4. Badly Scaled Problems Without Line Search
If you use a fixed step size instead of line search, BFGS can fail (curvature condition violated).

**Always use Wolfe line search with BFGS!**

## Practical Considerations

### Choosing $m$ for L-BFGS
- Small $m$ (3-7): Low memory, faster per iteration, but slower convergence
- Large $m$ (10-20): More memory, slower per iteration, but faster convergence
- Default: $m=10$ is a good balance for most problems

### Initialization of $H_0$
Options:
1. **Identity:** $H_0 = I$ (simple, but ignores scaling)
2. **Scaled identity:** $H_0 = \gamma I$ where $\gamma = \frac{y_0^T s_0}{y_0^T y_0}$ (adapts to problem scale)
3. **Diagonal from gradient:** Use diagonal preconditioning

### Restarting
If BFGS gets stuck or accumulates errors, restart with $H_k = I$ and continue. Typically restart every $n$ iterations or when progress stalls.

### Combining with Other Techniques
- **BFGS + Stochastic Sampling:** Use BFGS on small batches (stochastic L-BFGS)
- **BFGS + Constraints:** L-BFGS-B adds simple bounds $l \leq x \leq u$
- **BFGS + Regularization:** Common in machine learning (e.g., logistic regression with L2 penalty)

## Applications

### 1. Machine Learning
L-BFGS is the default for:
- Logistic regression (sklearn uses it)
- Neural network training (before Adam became popular)
- Parameter estimation in probabilistic models

### 2. Scientific Computing
- Parameter fitting in ODEs/PDEs
- Inverse problems (reconstruction from measurements)
- Optimal control

### 3. Computational Chemistry
- Molecular geometry optimization
- Electronic structure calculations

### 4. Computer Graphics
- Mesh deformation
- Inverse kinematics
- Shape optimization

## Implementation in Practice

**Python (SciPy):**
```python
from scipy.optimize import minimize

result = minimize(f, x0, method='BFGS', jac=grad_f)
# or
result = minimize(f, x0, method='L-BFGS-B', jac=grad_f, bounds=bounds)
```

**Julia (Optim.jl):**
```julia
using Optim
result = optimize(f, g!, x0, BFGS())
# or
result = optimize(f, g!, x0, LBFGS())
```

**MATLAB:**
```matlab
options = optimoptions('fminunc', 'Algorithm', 'quasi-newton');
[x, fval] = fminunc(@f, x0, options);
```

Most libraries handle line search, Hessian updating, and convergence checks automatically.

## Historical Note

BFGS is named after **Broyden, Fletcher, Goldfarb, and Shanno**, who independently discovered the formula in 1970. It's one of the most successful algorithms in optimization history—simple, robust, and efficient.

L-BFGS was developed by **Nocedal** in 1980, making BFGS practical for large-scale problems.

## Key Takeaways

1. **Quasi-Newton methods approximate the Hessian inverse** using only gradient information, achieving superlinear convergence.

2. **BFGS is the most popular quasi-Newton method**, with proven robustness and self-correcting properties.

3. **L-BFGS is the large-scale variant**, requiring only $O(mn)$ memory and computation by storing recent history.

4. **Secant equation $B_{k+1} s_k = y_k$** is the core principle: the approximate Hessian should predict gradient changes.

5. **Wolfe line search is essential** to maintain positive definiteness and ensure convergence.

6. **Convergence is superlinear** (faster than linear, slower than quadratic), making it much faster than gradient descent.

7. **For most smooth unconstrained problems:**
   - Small scale ($n < 1000$): Use BFGS
   - Large scale ($n \geq 1000$): Use L-BFGS
   - Very large scale ($n > 10^6$): Use gradient-based methods (SGD, Adam)

8. **Quasi-Newton is the sweet spot** between cheap first-order methods and expensive second-order methods, used widely in practice.