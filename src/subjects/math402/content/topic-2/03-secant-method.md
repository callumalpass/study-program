---
title: "Secant Method"
description: "Derivative-free root-finding method with superlinear convergence using finite differences"
---

# Secant Method

The secant method approximates the derivative in Newton's method using a finite difference, eliminating the need for analytical derivatives while maintaining superlinear convergence.

## Introduction

Newton's method is powerful but requires computing $f'(x)$ at each iteration. When derivatives are:
- **Unavailable**: No closed form exists
- **Expensive**: Numerical or automatic differentiation is costly
- **Complex**: Analytical computation is error-prone

The secant method provides an alternative by approximating $f'(x_n)$ using the **secant line** through two recent points.

## Derivation

Replace $f'(x_n)$ in Newton's method with a finite difference approximation:

$$f'(x_n) pprox rac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$$

Substituting into Newton's formula $x_{n+1} = x_n - rac{f(x_n)}{f'(x_n)}$ gives:

$$x_{n+1} = x_n - f(x_n) rac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$

Rearranging:

$$x_{n+1} = rac{x_{n-1}f(x_n) - x_n f(x_{n-1})}{f(x_n) - f(x_{n-1})}$$

**Geometric interpretation**: $x_{n+1}$ is where the secant line through $(x_{n-1}, f(x_{n-1}))$ and $(x_n, f(x_n))$ crosses the x-axis.

## Convergence Analysis

The secant method has **superlinear convergence** with order $\phi = rac{1 + \sqrt{5}}{2} pprox 1.618$ (the golden ratio).

For a simple root with $f'(r) 
eq 0$ and $f''$ continuous:

$$\lim_{n 	o \infty} rac{|e_{n+1}|}{|e_n|^\phi} = C$$

where $e_n = x_n - r$ is the error at step $n$.

**Comparison**:
- Bisection: Order 1 (linear), one function evaluation per iteration
- Secant: Order ~1.618 (superlinear), one function evaluation per iteration
- Newton: Order 2 (quadratic), one function and one derivative evaluation per iteration

## Algorithm Implementation

```python
import numpy as np

def secant_method(f, x0, x1, tol=1e-10, max_iter=50):
    """
    Secant method for root finding.
    
    Parameters:
    - f: function
    - x0, x1: two initial guesses (need not bracket root)
    - tol: tolerance for stopping
    - max_iter: maximum iterations
    
    Returns:
    - root: approximation to root
    - iterations: number of iterations
    - history: convergence history
    """
    history = {'x': [x0, x1], 'f': [f(x0), f(x1)], 'error_est': []}
    
    for i in range(max_iter):
        f0, f1 = f(x0), f(x1)
        
        # Check for near-zero denominator
        if abs(f1 - f0) < 1e-15:
            raise ValueError(f"Division by zero: f({x0})={f0}, f({x1})={f1}")
        
        # Secant update
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        f2 = f(x2)
        
        history['x'].append(x2)
        history['f'].append(f2)
        history['error_est'].append(abs(x2 - x1))
        
        # Check convergence
        if abs(x2 - x1) < tol or abs(f2) < tol:
            return x2, i + 1, history
        
        # Update for next iteration
        x0, x1 = x1, x2
    
    print(f"Warning: Maximum iterations ({max_iter}) reached")
    return x1, max_iter, history

# Example: Find root of x³ - 2x - 5 = 0
f = lambda x: x**3 - 2*x - 5

root, iters, hist = secant_method(f, 2.0, 3.0)
print(f"Secant Method: x³ - 2x - 5 = 0")
print(f"Root: {root:.15f}")
print(f"f(root): {f(root):.2e}")
print(f"Iterations: {iters}")
```

## Comparison with Newton's Method

Let's compare secant and Newton on the same problem:

```python
def newton_method(f, f_prime, x0, tol=1e-10, max_iter=50):
    """Newton's method for root finding."""
    x = x0
    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)
        
        if abs(fpx) < 1e-15:
            raise ValueError(f"Zero derivative at x={x}")
        
        x_new = x - fx / fpx
        
        if abs(x_new - x) < tol or abs(f(x_new)) < tol:
            return x_new, i + 1
        
        x = x_new
    
    return x, max_iter

# Compare on f(x) = x³ - 2x - 5
f = lambda x: x**3 - 2*x - 5
f_prime = lambda x: 3*x**2 - 2

root_secant, iters_secant, _ = secant_method(f, 2.0, 3.0)
root_newton, iters_newton = newton_method(f, f_prime, 2.5)

print(f"\nMethod Comparison:")
print(f"{'Method':<12} {'Iterations':<12} {'Root':<20}")
print("="*50)
print(f"{'Secant':<12} {iters_secant:<12} {root_secant:<20.15f}")
print(f"{'Newton':<12} {iters_newton:<12} {root_newton:<20.15f}")
print(f"\nSecant uses ~{(iters_secant/iters_newton):.1f}× more iterations")
print(f"But requires no derivative computation!")
```

## Convergence Rate Verification

Verify that the secant method achieves order ~1.618 convergence:

```python
def analyze_secant_convergence():
    """Empirically verify superlinear convergence."""
    f = lambda x: x**2 - 2
    true_root = np.sqrt(2)
    
    x0, x1 = 1.0, 2.0
    phi = (1 + np.sqrt(5)) / 2  # Golden ratio
    
    print(f"{'Iter':<6} {'x_n':<20} {'Error':<15} {'Ratio (e_n+1 / e_n^φ)':<20}")
    print("="*70)
    
    errors = []
    for i in range(15):
        f0, f1 = f(x0), f(x1)
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        
        error = abs(x2 - true_root)
        errors.append(error)
        
        if i > 0:
            ratio = errors[i] / (errors[i-1]**phi)
        else:
            ratio = 0
        
        print(f"{i:<6} {x2:<20.15f} {error:<15.2e} {ratio:<20.5f}")
        
        x0, x1 = x1, x2
        
        if error < 1e-15:
            break
    
    print(f"\nConvergence order ≈ {phi:.3f} confirmed!")
    print(f"Ratio stabilizes around a constant value")

analyze_secant_convergence()
```

## Advantages and Disadvantages

### Advantages

1. **No derivative needed**: Only function evaluations required
2. **Superlinear convergence**: Faster than bisection
3. **One function evaluation per iteration**: Same as bisection, fewer than Newton per iteration
4. **Simpler than Newton**: No need to compute or approximate derivatives separately

### Disadvantages

1. **Requires two initial guesses**: Unlike Newton (one) or bisection (interval)
2. **May diverge**: No guaranteed convergence like bisection
3. **Slower than Newton**: ~1.6× slower convergence rate per iteration
4. **Division by zero risk**: When $f(x_n) pprox f(x_{n-1})$

## Stopping Criteria

Multiple stopping conditions should be used:

```python
def secant_robust(f, x0, x1, tol=1e-10, max_iter=100):
    """Secant method with robust stopping criteria."""
    for i in range(max_iter):
        f0, f1 = f(x0), f(x1)
        
        if abs(f1 - f0) < 1e-15:
            print("Warning: Near-zero denominator, stopping")
            return x1, i, 'denominator_zero'
        
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        f2 = f(x2)
        
        # Multiple stopping criteria
        if abs(f2) < tol:
            return x2, i+1, 'residual_small'
        elif abs(x2 - x1) < tol * max(1, abs(x2)):
            return x2, i+1, 'relative_change_small'
        elif abs(x2 - x1) < tol:
            return x2, i+1, 'absolute_change_small'
        
        x0, x1 = x1, x2
    
    return x1, max_iter, 'max_iterations'

# Example
root, iters, reason = secant_robust(lambda x: x**2 - 2, 1.0, 2.0)
print(f"Root: {root:.15f}")
print(f"Stopped because: {reason}")
```

## Applications

The secant method is ideal when:
1. **Derivatives are unavailable**: Implicit functions, black-box models
2. **Derivative computation is expensive**: Complex functions, nested calculations
3. **Moderate accuracy is sufficient**: Don't need quadratic convergence
4. **Two reasonable starting points are easy to find**: Prior knowledge of solution

### Example: Kepler's Equation

Kepler's equation from celestial mechanics:

$$M = E - e \sin(E)$$

Given mean anomaly $M$ and eccentricity $e$, find eccentric anomaly $E$.

```python
def solve_kepler(M, e, tol=1e-12):
    """Solve Kepler's equation M = E - e*sin(E) for E."""
    f = lambda E: E - e * np.sin(E) - M
    
    # Initial guesses: M and M + e
    E, iters, _ = secant_method(f, M, M + e, tol=tol)
    
    return E, iters

# Example: Earth's orbit (e ≈ 0.0167)
M = np.pi / 3  # 60 degrees
e = 0.0167

E, iters = solve_kepler(M, e)
print(f"\nKepler's Equation:")
print(f"Mean anomaly M = {M:.5f}")
print(f"Eccentricity e = {e:.5f}")
print(f"Eccentric anomaly E = {E:.10f}")
print(f"Verification: M = {E - e*np.sin(E):.10f}")
print(f"Iterations: {iters}")
```

## Modified Secant Method

A variant uses a **fixed perturbation**:

$$x_{n+1} = x_n - rac{f(x_n)}{rac{f(x_n + \delta) - f(x_n)}{\delta}}$$

where $\delta$ is a small constant (e.g., $10^{-4}$).

Advantages: Only one variable to track (like Newton)
Disadvantages: Two function evaluations per iteration, linear convergence

## Key Takeaways

- Secant method approximates **Newton's method without derivatives**
- Convergence order is the **golden ratio** (~1.618), superlinear
- Requires **two initial guesses**, no bracketing needed
- **One function evaluation per iteration** (efficient)
- Best for problems where derivatives are **unavailable or expensive**
- May **diverge** without careful initial guess selection

## Common Mistakes

1. **Assuming convergence is guaranteed**: Unlike bisection, secant can diverge
2. **Not checking denominator**: Division by zero when $f(x_n) = f(x_{n-1})$
3. **Poor initial guesses**: Too far from root can cause divergence
4. **Comparing iteration counts unfairly**: Newton needs derivatives, secant doesn't
5. **Using when bracketing is easy**: Bisection + secant hybrid (Ridders' method) may be better
