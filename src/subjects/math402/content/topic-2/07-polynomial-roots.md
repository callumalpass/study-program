---
title: "Polynomial Roots"
description: "Specialized methods for finding all roots of polynomial equations efficiently"
---

# Polynomial Roots

Polynomials have special structure that enables specialized root-finding algorithms.

## Fundamental Theorem of Algebra

A polynomial of degree $n$ has exactly $n$ roots (counting multiplicity) in $\mathbb{C}$.

$$p(x) = a_n x^n + a_{n-1}x^{n-1} + \cdots + a_1 x + a_0$$

## Companion Matrix Method

Convert polynomial to eigenvalue problem:

$$p(x) = 0 \Leftrightarrow \det(xI - C) = 0$$

where $C$ is the **companion matrix**:

$$C = \begin{bmatrix}
0 & 0 & \cdots & 0 & -a_0/a_n \\
1 & 0 & \cdots & 0 & -a_1/a_n \\
0 & 1 & \cdots & 0 & -a_2/a_n \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
0 & 0 & \cdots & 1 & -a_{n-1}/a_n
\end{bmatrix}$$

```python
import numpy as np

def companion_matrix_roots(coeffs):
    """
    Find all polynomial roots via companion matrix eigenvalues.
    
    coeffs: [a_n, a_{n-1}, ..., a_1, a_0]
    """
    n = len(coeffs) - 1
    if n == 0:
        return []
    
    # Normalize
    coeffs = np.array(coeffs, dtype=complex) / coeffs[0]
    
    # Build companion matrix
    C = np.zeros((n, n), dtype=complex)
    C[1:, :-1] = np.eye(n-1)
    C[:, -1] = -coeffs[1:]
    
    # Roots are eigenvalues
    roots = np.linalg.eigvals(C)
    
    return roots

# Example: x³ - 6x² + 11x - 6 = (x-1)(x-2)(x-3)
coeffs = [1, -6, 11, -6]
roots = companion_matrix_roots(coeffs)

print("Companion Matrix Method:")
print(f"Polynomial: {coeffs}")
print(f"Roots: {sorted(roots.real)}")
print(f"Expected: [1, 2, 3]")
```

## Müller's Method

Generalizes secant method using quadratic interpolation. Works with complex roots.

```python
def mullers_method(f, x0, x1, x2, tol=1e-10, max_iter=50):
    """
    Müller's method using quadratic interpolation.
    
    Can find complex roots from real starting points.
    """
    for i in range(max_iter):
        # Divided differences
        h0 = x1 - x0
        h1 = x2 - x1
        d0 = (f(x1) - f(x0)) / h0
        d1 = (f(x2) - f(x1)) / h1
        d = (d1 - d0) / (h1 + h0)
        
        # Quadratic formula
        b = d1 + h1 * d
        disc = b**2 - 4*f(x2)*d
        
        if abs(b + np.sqrt(disc)) > abs(b - np.sqrt(disc)):
            den = b + np.sqrt(disc)
        else:
            den = b - np.sqrt(disc)
        
        x3 = x2 - 2*f(x2) / den
        
        if abs(x3 - x2) < tol:
            return x3, i + 1
        
        x0, x1, x2 = x1, x2, x3
    
    return x2, max_iter

# Find complex root of x² + 1 = 0
f = lambda x: x**2 + 1
root, iters = mullers_method(f, 0.0+0j, 0.5+0j, 1.0+0j)

print(f"\nMüller's Method: x² + 1 = 0")
print(f"Root: {root}")
print(f"Iterations: {iters}")
```

## Laguerre's Method

Specialized for polynomials, cubic convergence:

$$x_{n+1} = x_n - \frac{n}{G \pm \sqrt{(n-1)(nH - G^2)}}$$

where:
- $G = p'(x_n)/p(x_n)$
- $H = G^2 - p''(x_n)/p(x_n)$

```python
def laguerre_method(coeffs, x0, tol=1e-10, max_iter=50):
    """
    Laguerre's method for polynomial roots.
    
    coeffs: [a_n, ..., a_0]
    """
    def eval_poly_and_derivs(coeffs, x):
        """Evaluate p(x), p'(x), p''(x) using Horner's method."""
        n = len(coeffs) - 1
        
        # p(x)
        p = coeffs[0]
        for c in coeffs[1:]:
            p = p * x + c
        
        # p'(x)
        p_prime = n * coeffs[0]
        for i in range(1, n):
            p_prime = p_prime * x + (n - i) * coeffs[i]
        
        # p''(x)
        p_double = n * (n - 1) * coeffs[0]
        for i in range(1, n - 1):
            p_double = p_double * x + (n - i) * (n - i - 1) * coeffs[i]
        
        return p, p_prime, p_double
    
    n = len(coeffs) - 1
    x = complex(x0)
    
    for i in range(max_iter):
        p, p_prime, p_double = eval_poly_and_derivs(coeffs, x)
        
        if abs(p) < tol:
            return x, i + 1
        
        G = p_prime / p
        H = G**2 - p_double / p
        
        disc = np.sqrt((n - 1) * (n * H - G**2))
        
        if abs(G + disc) > abs(G - disc):
            den = G + disc
        else:
            den = G - disc
        
        x_new = x - n / den
        
        if abs(x_new - x) < tol:
            return x_new, i + 1
        
        x = x_new
    
    return x, max_iter

# Test
coeffs = [1, 0, 1]  # x² + 1
root, iters = laguerre_method(coeffs, 1.0+1.0j)

print(f"\nLaguerre's Method: x² + 1 = 0")
print(f"Root: {root}")
print(f"Iterations: {iters}")
```

## Comparison with NumPy

```python
def compare_polynomial_methods():
    """Compare different polynomial root-finding methods."""
    # Polynomial: (x-1)(x-2)(x²+1) = x⁴ - 3x³ + 3x² - 3x + 2
    coeffs = [1, -3, 3, -3, 2]
    
    # Companion matrix
    roots_comp = companion_matrix_roots(coeffs)
    
    # NumPy
    roots_numpy = np.roots(coeffs)
    
    print("\nPolynomial Root Comparison:")
    print(f"Polynomial: {coeffs}")
    print(f"\nCompanion Matrix:")
    for r in sorted(roots_comp, key=lambda x: (x.real, x.imag)):
        print(f"  {r}")
    
    print(f"\nNumPy:")
    for r in sorted(roots_numpy, key=lambda x: (x.real, x.imag)):
        print(f"  {r}")
    
    print(f"\nExpected: 1, 2, ±i")

compare_polynomial_methods()
```

## Summary

Polynomial root-finding:
- **Companion matrix**: Converts to eigenvalue problem (most reliable)
- **Müller's method**: Finds complex roots, quadratic convergence
- **Laguerre's method**: Cubic convergence, specialized for polynomials
- **Deflation**: Find roots sequentially
- **NumPy**: Uses companion matrix + QR algorithm (production quality)
