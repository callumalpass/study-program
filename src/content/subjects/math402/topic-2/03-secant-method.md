---
title: "Secant Method"
description: "Derivative-free root-finding method with superlinear convergence using finite differences"
---

# Secant Method

The secant method approximates the derivative in Newton's method using a finite difference, eliminating the need for analytical derivatives.

## Derivation

Replace $f'(x_n)$ with finite difference approximation:

$$f'(x_n) \approx \frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$$

This gives the **secant method**:

$$x_{n+1} = x_n - f(x_n) \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$

Rearranging:

$$x_{n+1} = \frac{x_{n-1}f(x_n) - x_n f(x_{n-1})}{f(x_n) - f(x_{n-1})}$$

**Geometric interpretation**: $x_{n+1}$ is where the secant line through $(x_{n-1}, f(x_{n-1}))$ and $(x_n, f(x_n))$ crosses the x-axis.

## Convergence

**Convergence order**: Approximately $\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618$ (golden ratio)

$$\lim_{n \to \infty} \frac{|e_{n+1}|}{|e_n|^\phi} = C$$

This is **superlinear** but slower than Newton's quadratic convergence.

```python
import numpy as np
import matplotlib.pyplot as plt

def secant_method(f, x0, x1, tol=1e-10, max_iter=50):
    """
    Secant method for root finding.
    
    Parameters:
    - f: function
    - x0, x1: two initial guesses
    - tol: tolerance
    - max_iter: maximum iterations
    """
    history = {'x': [x0, x1], 'f': [f(x0), f(x1)]}
    
    for i in range(max_iter):
        f0, f1 = f(x0), f(x1)
        
        if abs(f1 - f0) < 1e-15:
            raise ValueError("Function values too close")
        
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        
        history['x'].append(x2)
        history['f'].append(f(x2))
        
        if abs(x2 - x1) < tol or abs(f(x2)) < tol:
            return x2, i + 1, history
        
        x0, x1 = x1, x2
    
    return x1, max_iter, history

# Example: x³ - 2x - 5 = 0
f = lambda x: x**3 - 2*x - 5

root, iters, hist = secant_method(f, 2.0, 3.0)
print(f"Secant Method: x³ - 2x - 5 = 0")
print(f"Root: {root:.15f}")
print(f"f(root): {f(root):.2e}")
print(f"Iterations: {iters}\n")

# Compare with Newton's method
def newton_method(f, f_prime, x0, tol=1e-10, max_iter=50):
    x = x0
    for i in range(max_iter):
        fx = f(x)
        x_new = x - fx / f_prime(x)
        if abs(x_new - x) < tol:
            return x_new, i + 1
        x = x_new
    return x, max_iter

f_prime = lambda x: 3*x**2 - 2
root_newton, iters_newton = newton_method(f, f_prime, 2.5)

print(f"Comparison:")
print(f"Secant: {iters} iterations")
print(f"Newton: {iters_newton} iterations")

# Demonstrate convergence rate
def analyze_convergence():
    """Verify superlinear convergence."""
    f = lambda x: x**2 - 2
    true_root = np.sqrt(2)
    
    x0, x1 = 1.0, 2.0
    errors = []
    
    print(f"\n{'Iter':<6} {'x_n':<20} {'Error':<15} {'Ratio':<15}")
    print("=" * 60)
    
    for i in range(12):
        f0, f1 = f(x0), f(x1)
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        
        error = abs(x2 - true_root)
        errors.append(error)
        
        if i > 0:
            ratio = errors[i] / (errors[i-1]**1.618)
        else:
            ratio = 0
        
        print(f"{i:<6} {x2:<20.15f} {error:<15.2e} {ratio:<15.5f}")
        
        x0, x1 = x1, x2

analyze_convergence()
```

## Advantages and Disadvantages

**Advantages**:
- No derivative needed
- Superlinear convergence
- Simple to implement

**Disadvantages**:
- Requires two initial guesses
- Slower than Newton's method
- May fail if secant line is nearly horizontal

```python
def compare_methods_detailed():
    """Detailed comparison of root-finding methods."""
    f = lambda x: np.cos(x) - x
    f_prime = lambda x: -np.sin(x) - 1
    
    # Secant
    root_sec, iters_sec, hist_sec = secant_method(f, 0.5, 1.0)
    
    # Newton
    root_new, iters_new = newton_method(f, f_prime, 0.7)
    
    # Bisection (for comparison)
    def bisection(f, a, b, tol=1e-10):
        n = 0
        while abs(b - a) > tol:
            c = (a + b) / 2
            if f(a) * f(c) < 0:
                b = c
            else:
                a = c
            n += 1
        return (a + b) / 2, n
    
    root_bis, iters_bis = bisection(f, 0, 1)
    
    print(f"\nMethod Comparison: cos(x) = x")
    print(f"{'Method':<15} {'Iterations':<12} {'Root':<20} {'f(root)':<12}")
    print("=" * 65)
    print(f"{'Bisection':<15} {iters_bis:<12} {root_bis:<20.12f} {f(root_bis):<12.2e}")
    print(f"{'Secant':<15} {iters_sec:<12} {root_sec:<20.12f} {f(root_sec):<12.2e}")
    print(f"{'Newton':<15} {iters_new:<12} {root_new:<20.12f} {f(root_new):<12.2e}")

compare_methods_detailed()
```

## Applications

The secant method is ideal when:
1. Derivatives are difficult/expensive to compute
2. Function evaluations are relatively cheap
3. Reasonable initial guesses are available

```python
# Application: Finding zeros of Bessel functions
from scipy.special import jv

def bessel_root_example():
    """Find first positive zero of J₀(x)."""
    f = lambda x: jv(0, x)
    
    # J₀ has first zero around 2.4
    root, iters, _ = secant_method(f, 2.0, 3.0)
    
    print(f"\nFirst zero of J₀(x):")
    print(f"Secant result: {root:.15f}")
    print(f"Iterations: {iters}")
    print(f"J₀(root): {f(root):.2e}")

bessel_root_example()
```

## Summary

The secant method provides:
- **Superlinear convergence** (order ~1.618)
- **No derivatives required**
- **Good compromise** between speed and simplicity
- **Best when** derivatives unavailable but two starting points are easy to choose
