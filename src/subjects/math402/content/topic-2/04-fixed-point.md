---
title: "Fixed-Point Iteration"
description: "Iterative method for solving equations via x = g(x) transformations"
---

# Fixed-Point Iteration

Fixed-point iteration is a fundamental technique for solving equations by reformulating $f(x) = 0$ as $x = g(x)$ and iterating $x_{n+1} = g(x_n)$ until convergence.

## Introduction

A **fixed point** of a function $g(x)$ is a value $p$ such that:

$$g(p) = p$$

If we can write our equation $f(x) = 0$ in the form $x = g(x)$, then solving $f(x) = 0$ is equivalent to finding a fixed point of $g(x)$.

**Example transformations**:
- $x^2 - x - 2 = 0$ becomes $x = \sqrt{x + 2}$ or $x = x^2 - 2$ or $x = rac{x^2 - 2}{x - 1}$

Each transformation gives a different $g(x)$, and convergence depends on the choice!

## Fixed-Point Theorem

**Theorem (Fixed-Point Theorem)**: Suppose $g \in C[a,b]$ satisfies:
1. $g(x) \in [a,b]$ for all $x \in [a,b]$ (maps interval to itself)
2. $g'(x)$ exists on $(a,b)$ with $|g'(x)| \leq k < 1$ for all $x \in (a,b)$

Then:
- $g$ has a **unique fixed point** $p$ in $[a,b]$
- For any $x_0 \in [a,b]$, the sequence $x_{n+1} = g(x_n)$ **converges to $p$**

**Proof sketch**:
- Existence: By intermediate value theorem applied to $h(x) = g(x) - x$
- Uniqueness: If $p, q$ are fixed points, then $|p - q| = |g(p) - g(q)| \leq k|p - q|$, implying $p = q$
- Convergence: $|e_{n+1}| = |x_{n+1} - p| = |g(x_n) - g(p)| \leq k|x_n - p| = k|e_n|$

## Convergence Analysis

### Linear Convergence

If $g'(p) 
eq 0$, the convergence is **linear** with rate $|g'(p)|$:

$$\lim_{n 	o \infty} rac{|e_{n+1}|}{|e_n|} = |g'(p)|$$

**Implication**: Smaller $|g'(p)|$ means faster convergence.

### Quadratic Convergence

If $g'(p) = 0$ and $g''(p) 
eq 0$, convergence is **quadratic**:

$$\lim_{n 	o \infty} rac{|e_{n+1}|}{|e_n|^2} = rac{|g''(p)|}{2}$$

**Note**: Newton's method is a fixed-point iteration with $g(x) = x - rac{f(x)}{f'(x)}$ and $g'(p) = 0$, explaining its quadratic convergence!

### General Order

For convergence of order $lpha$:

$$g'(p) = g''(p) = \cdots = g^{(lpha-1)}(p) = 0, \quad g^{(lpha)}(p) 
eq 0$$

Then:

$$\lim_{n 	o \infty} rac{|e_{n+1}|}{|e_n|^lpha} = rac{|g^{(lpha)}(p)|}{lpha!}$$

## Algorithm Implementation

```python
import numpy as np

def fixed_point_iteration(g, x0, tol=1e-10, max_iter=100):
    """
    Fixed-point iteration: x_{n+1} = g(x_n).
    
    Parameters:
    - g: iteration function g(x)
    - x0: initial guess
    - tol: tolerance
    - max_iter: maximum iterations
    
    Returns:
    - fixed_point: approximation to fixed point
    - iterations: number of iterations
    - history: convergence history
    """
    history = {'x': [x0], 'error_est': []}
    x = x0
    
    for i in range(max_iter):
        x_new = g(x)
        error_est = abs(x_new - x)
        
        history['x'].append(x_new)
        history['error_est'].append(error_est)
        
        if error_est < tol:
            return x_new, i + 1, history
        
        x = x_new
    
    print(f"Warning: Did not converge in {max_iter} iterations")
    return x, max_iter, history

# Example: Solve x² = x + 2
# Transform to x = sqrt(x + 2)
g = lambda x: np.sqrt(x + 2)

fixed_pt, iters, hist = fixed_point_iteration(g, 1.5)
print(f"Fixed-Point Iteration")
print(f"Equation: x² - x - 2 = 0")
print(f"Iteration function: g(x) = sqrt(x + 2)")
print(f"Fixed point: {fixed_pt:.15f}")
print(f"Verification: g(p) = {g(fixed_pt):.15f}")
print(f"Iterations: {iters}")
```

## Choice of Iteration Function

Consider $x^2 - x - 2 = 0$ with roots $x = 2$ and $x = -1$.

### Option 1: $g_1(x) = \sqrt{x + 2}$

$$g'_1(x) = rac{1}{2\sqrt{x + 2}}$$

At $x = 2$: $|g'_1(2)| = rac{1}{4} < 1$ → **Converges to 2**

### Option 2: $g_2(x) = x^2 - 2$

$$g'_2(x) = 2x$$

At $x = 2$: $|g'_2(2)| = 4 > 1$ → **Diverges from 2**

### Option 3: $g_3(x) = 1 + rac{2}{x}$

$$g'_3(x) = -rac{2}{x^2}$$

At $x = 2$: $|g'_3(2)| = rac{1}{2} < 1$ → **Converges to 2**

```python
# Compare different g(x) formulations
def compare_fixed_point_functions():
    """Compare convergence of different g(x) for x² - x - 2 = 0."""
    
    g1 = lambda x: np.sqrt(x + 2)
    g2 = lambda x: x**2 - 2
    g3 = lambda x: 1 + 2/x
    
    x0 = 1.5
    
    print(f"{'Function':<25} {'Converges?':<12} {'Iterations':<12} {'Root'}")
    print("="*70)
    
    for name, g in [("g(x) = sqrt(x+2)", g1), 
                     ("g(x) = x²-2", g2), 
                     ("g(x) = 1+2/x", g3)]:
        try:
            root, iters, _ = fixed_point_iteration(g, x0, max_iter=50)
            converged = abs(g(root) - root) < 1e-6
            print(f"{name:<25} {str(converged):<12} {iters:<12} {root:.6f}")
        except:
            print(f"{name:<25} {'False':<12} {'N/A':<12} {'Diverged'}")

compare_fixed_point_functions()
```

## Aitken's Δ² Method

**Aitken's acceleration** speeds up linearly convergent fixed-point iterations.

Given sequence $\{x_n\}$ with linear convergence, construct:

$$\hat{x}_n = x_n - rac{(x_{n+1} - x_n)^2}{x_{n+2} - 2x_{n+1} + x_n}$$

The accelerated sequence $\{\hat{x}_n\}$ often converges faster.

```python
def aitken_acceleration(g, x0, tol=1e-10, max_iter=100):
    """Fixed-point iteration with Aitken's Δ² acceleration."""
    x = x0
    
    for i in range(max_iter):
        x1 = g(x)
        x2 = g(x1)
        
        # Aitken's formula
        denominator = x2 - 2*x1 + x
        
        if abs(denominator) < 1e-15:
            # Fall back to standard iteration
            x_new = x2
        else:
            x_new = x - (x1 - x)**2 / denominator
        
        if abs(x_new - x) < tol:
            return x_new, i + 1
        
        x = x_new
    
    return x, max_iter

# Compare standard vs Aitken
g = lambda x: np.cos(x)  # Find fixed point of cos(x)

std_root, std_iters, _ = fixed_point_iteration(g, 1.0)
ait_root, ait_iters = aitken_acceleration(g, 1.0)

print(f"\nAitken's Acceleration Comparison:")
print(f"Standard FPI: {std_iters} iterations → {std_root:.10f}")
print(f"Aitken FPI:   {ait_iters} iterations → {ait_root:.10f}")
print(f"Speedup: {std_iters/ait_iters:.2f}×")
```

## Steffensen's Method

Steffensen's method applies Aitken acceleration systematically:

$$x_{n+1} = x_n - rac{(g(x_n) - x_n)^2}{g(g(x_n)) - 2g(x_n) + x_n}$$

Achieves **quadratic convergence** without derivatives!

```python
def steffensen(g, x0, tol=1e-10, max_iter=50):
    """Steffensen's method for fixed-point problems."""
    x = x0
    
    for i in range(max_iter):
        gx = g(x)
        ggx = g(gx)
        
        denominator = ggx - 2*gx + x
        
        if abs(denominator) < 1e-15:
            print("Near-zero denominator, stopping")
            return gx, i
        
        x_new = x - (gx - x)**2 / denominator
        
        if abs(x_new - x) < tol:
            return x_new, i + 1
        
        x = x_new
    
    return x, max_iter

# Example: cos(x) = x
root_steff, iters_steff = steffensen(lambda x: np.cos(x), 1.0)

print(f"\nSteffensen's Method:")
print(f"Fixed point of cos(x): {root_steff:.15f}")
print(f"Iterations: {iters_steff}")
print(f"Verification: cos({root_steff:.6f}) = {np.cos(root_steff):.15f}")
```

## Applications

### System of Equations

Fixed-point iteration extends naturally to systems:

$$\mathbf{x}_{n+1} = \mathbf{g}(\mathbf{x}_n)$$

Convergence requires $\|\mathbf{J}_g(\mathbf{p})\| < 1$ (Jacobian spectral radius < 1).

### Banach Fixed-Point Theorem

In complete metric spaces, the fixed-point theorem generalizes to infinite dimensions (ODEs, PDEs, integral equations).

### Optimization

Many optimization algorithms are fixed-point iterations:
- Gradient descent: $x_{n+1} = x_n - lpha 
abla f(x_n)$
- Proximal methods: $x_{n+1} = 	ext{prox}_f(x_n)$

## Worked Example

**Problem**: Find the positive root of $x = \cos(x)$ using fixed-point iteration.

**Solution**:

The equation is already in fixed-point form with $g(x) = \cos(x)$.

Check convergence criterion:
$$g'(x) = -\sin(x)$$

The fixed point $p$ satisfies $p = \cos(p)$, so $p pprox 0.739$ (known result).

At $p$: $|g'(p)| = |\sin(0.739)| pprox 0.674 < 1$ → **Converges!**

```python
# Detailed iteration
g = lambda x: np.cos(x)
x = 1.0  # Initial guess

print(f"{'n':<5} {'x_n':<20} {'g(x_n)':<20} {'|x_n+1 - x_n|':<15}")
print("="*65)

for n in range(15):
    x_new = g(x)
    print(f"{n:<5} {x:<20.15f} {x_new:<20.15f} {abs(x_new - x):<15.2e}")
    
    if abs(x_new - x) < 1e-10:
        print(f"\nConverged to {x_new:.15f}")
        break
    
    x = x_new
```

**Output shows**:
- Monotonic convergence from $x_0 = 1.0$
- Error decreases by factor ~0.67 each iteration (matching $|g'(p)|$)
- Convergence in ~10-12 iterations

## Key Takeaways

- Fixed-point iteration solves $x = g(x)$ via $x_{n+1} = g(x_n)$
- Converges if $|g'(p)| < 1$ at the fixed point
- Convergence rate depends on $|g'(p)|$: smaller is faster
- **Choice of $g(x)$ is critical** for convergence
- Aitken and Steffensen methods accelerate convergence
- Newton's method is a fixed-point iteration with $g'(p) = 0$

## Common Mistakes

1. **Arbitrary choice of $g(x)$**: Must verify $|g'(p)| < 1$
2. **Ignoring divergence**: If $|g'(p)| > 1$, iteration diverges
3. **Poor initial guess**: May converge to different fixed point or diverge
4. **Not checking uniqueness**: Multiple fixed points may exist
5. **Confusing with rootfinding**: Fixed point of $g$ ≠ root of $g$ (unless $g(x) = 0$)
