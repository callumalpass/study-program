---
title: "Multiple Roots"
description: "Handling multiple roots and their impact on convergence of numerical root-finding methods"
---

# Multiple Roots

Multiple roots present special challenges for root-finding algorithms, often degrading convergence rates.

## Definition

A value $r$ is a **root of multiplicity** $m$ of $f$ if:

$$f(r) = f'(r) = f''(r) = \cdots = f^{(m-1)}(r) = 0$$
$$f^{(m)}(r) \neq 0$$

Equivalently: $f(x) = (x - r)^m q(x)$ where $q(r) \neq 0$.

## Impact on Newton's Method

For multiplicity $m$, Newton's method has only **linear** convergence:

$$e_{n+1} \approx \left(1 - \frac{1}{m}\right) e_n$$

```python
import numpy as np

def test_newton_multiple_root():
    """Demonstrate slow convergence at multiple root."""
    # f(x) = (x - 2)³
    f = lambda x: (x - 2)**3
    f_prime = lambda x: 3*(x - 2)**2
    
    x = 1.5
    errors = []
    true_root = 2.0
    
    print("Newton's Method: (x - 2)³ = 0")
    print(f"{'Iter':<6} {'x_n':<18} {'Error':<15} {'Ratio':<12}")
    print("=" * 55)
    
    for i in range(15):
        error = abs(x - true_root)
        errors.append(error)
        
        if i > 0:
            ratio = errors[i] / errors[i-1]
        else:
            ratio = 0
        
        print(f"{i:<6} {x:<18.12f} {error:<15.2e} {ratio:<12.5f}")
        
        x = x - f(x) / f_prime(x)
    
    print(f"\nTheoretical ratio: 1 - 1/m = 1 - 1/3 = {2/3:.5f}")

test_newton_multiple_root()
```

## Modified Newton's Method

If multiplicity $m$ is known:

$$x_{n+1} = x_n - m \frac{f(x_n)}{f'(x_n)}$$

This restores quadratic convergence.

```python
def modified_newton(f, f_prime, x0, m, tol=1e-10, max_iter=50):
    """Newton's method with known multiplicity."""
    x = x0
    history = [x0]
    
    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)
        
        if abs(fpx) < 1e-15:
            break
        
        x_new = x - m * fx / fpx
        history.append(x_new)
        
        if abs(x_new - x) < tol:
            return x_new, i + 1, history
        
        x = x_new
    
    return x, max_iter, history

# Compare standard vs modified
f = lambda x: (x - 2)**3
f_prime = lambda x: 3*(x - 2)**2

# Standard
x_std = 1.5
errors_std = []
for _ in range(15):
    errors_std.append(abs(x_std - 2.0))
    x_std = x_std - f(x_std) / f_prime(x_std)

# Modified
x_mod, iters_mod, hist_mod = modified_newton(f, f_prime, 1.5, m=3)
errors_mod = [abs(h - 2.0) for h in hist_mod]

print(f"\n\nComparison:")
print(f"Standard (15 iter): error = {errors_std[-1]:.2e}")
print(f"Modified ({iters_mod} iter): error = {errors_mod[-1]:.2e}")
```

## Detecting Multiplicity

Use ratio of function and derivative:

$$u(x) = \frac{f(x)}{f'(x)}$$

Then $u$ has a simple root at $r$, and Newton's method on $u$ converges quadratically.

```python
def newton_with_ratio(f, f_prime, x0, tol=1e-10, max_iter=50):
    """
    Newton's method on u(x) = f(x)/f'(x).
    
    Automatically handles multiple roots.
    """
    x = x0
    
    for i in range(max_iter):
        fx = f(x)
        fpx = f_prime(x)
        
        if abs(fpx) < 1e-15:
            break
        
        # u(x) = f/f', u'(x) = (f'² - ff'')/f'²
        # Newton on u: x - u/u' = x - f/f' / (1 - ff''/f'²)
        
        # Approximate f'' with finite difference
        h = 1e-8
        fppx = (f_prime(x + h) - f_prime(x)) / h
        
        denom = fpx - fx * fppx / fpx
        if abs(denom) < 1e-15:
            break
        
        x_new = x - fx / denom
        
        if abs(x_new - x) < tol:
            return x_new, i + 1
        
        x = x_new
    
    return x, max_iter

# Test on triple root
root, iters = newton_with_ratio(f, f_prime, 1.5)
print(f"\nNewton on u(x) = f/f':")
print(f"Root: {root:.15f}")
print(f"Iterations: {iters}")
```

## Estimating Multiplicity

From convergence rate:

$$m \approx \frac{1}{1 - r}$$

where $r$ is the convergence ratio.

```python
def estimate_multiplicity(f, f_prime, x0, n_iters=20):
    """Estimate multiplicity from convergence ratio."""
    x = x0
    errors = []
    
    # Run iterations
    for _ in range(n_iters):
        x_new = x - f(x) / f_prime(x)
        errors.append(abs(x_new - x))
        x = x_new
    
    # Estimate ratio from last few iterations
    if len(errors) >= 5:
        ratios = [errors[i+1]/errors[i] for i in range(-5, -1)]
        avg_ratio = np.mean(ratios)
        estimated_m = 1 / (1 - avg_ratio) if avg_ratio < 0.99 else None
        
        print(f"Convergence ratio: {avg_ratio:.5f}")
        print(f"Estimated multiplicity: {estimated_m:.1f}" if estimated_m else "Unable to estimate")
        
        return estimated_m
    
    return None

# Test
print("\nMultiplicity Estimation:")
estimate_multiplicity(f, f_prime, 1.5)
```

## Deflation

After finding root $r$, factor it out:

$$f_1(x) = \frac{f(x)}{x - r}$$

Then find roots of $f_1(x)$.

```python
def polynomial_deflation(coeffs, root):
    """
    Deflate polynomial by known root.
    
    Uses synthetic division.
    """
    n = len(coeffs) - 1
    new_coeffs = [coeffs[0]]
    
    for i in range(1, n):
        new_coeffs.append(coeffs[i] + root * new_coeffs[-1])
    
    return new_coeffs

# Example: (x-1)(x-2)(x-3) = x³ - 6x² + 11x - 6
coeffs = [1, -6, 11, -6]

print("\nPolynomial Deflation:")
print(f"Original: {coeffs}")

# Find and deflate root x = 1
coeffs1 = polynomial_deflation(coeffs, 1)
print(f"After deflating x=1: {coeffs1}")

# Deflate x = 2
coeffs2 = polynomial_deflation(coeffs1, 2)
print(f"After deflating x=2: {coeffs2}")
```

## Summary

Multiple roots require special handling:
- **Standard Newton**: Linear convergence only
- **Modified Newton**: Quadratic if $m$ known
- **Ratio method**: Handles unknown multiplicity
- **Deflation**: Remove known roots
- **Detection**: Use convergence ratios
