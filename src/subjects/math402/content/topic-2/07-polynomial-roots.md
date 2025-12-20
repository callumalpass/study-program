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

## Durand-Kerner Method

Finds all roots simultaneously using iteration:

$$z_i^{(k+1)} = z_i^{(k)} - \frac{p(z_i^{(k)})}{\prod_{j \neq i}(z_i^{(k)} - z_j^{(k)})}$$

```python
def durand_kerner(coeffs, max_iter=100, tol=1e-10):
    """
    Durand-Kerner (Weierstrass) method.

    Finds all roots simultaneously.
    coeffs: [a_n, a_{n-1}, ..., a_0]
    """
    n = len(coeffs) - 1
    if n == 0:
        return []

    # Initialize roots on unit circle
    theta = 2 * np.pi / n
    roots = [0.4 + np.exp(1j * k * theta) for k in range(n)]

    def eval_poly(x):
        """Evaluate polynomial using Horner's method."""
        result = coeffs[0]
        for c in coeffs[1:]:
            result = result * x + c
        return result

    print(f"Durand-Kerner Method (n={n})")
    print("=" * 60)

    for iteration in range(max_iter):
        roots_new = []
        max_change = 0

        for i in range(n):
            # Compute product of differences
            denominator = 1.0
            for j in range(n):
                if i != j:
                    denominator *= (roots[i] - roots[j])

            # Update root
            if abs(denominator) > 1e-15:
                root_new = roots[i] - eval_poly(roots[i]) / denominator
            else:
                root_new = roots[i]

            roots_new.append(root_new)
            max_change = max(max_change, abs(root_new - roots[i]))

        roots = roots_new

        if iteration % 10 == 0 or max_change < tol:
            print(f"Iter {iteration:3d}: max change = {max_change:.2e}")

        if max_change < tol:
            print(f"\nConverged in {iteration + 1} iterations")
            break

    return sorted(roots, key=lambda z: (z.real, z.imag))

# Test: (x-1)(x-2)(x-3) = x³ - 6x² + 11x - 6
coeffs = [1, -6, 11, -6]
roots = durand_kerner(coeffs)

print("\nRoots found:")
for i, root in enumerate(roots):
    print(f"  z_{i+1} = {root:.10f}")
```

## Bairstow's Method

Finds quadratic factors of real polynomials:

Seeks $(x^2 + px + q)$ such that it divides $p_n(x)$ with minimal remainder.

```python
def bairstow(coeffs, p_init=-1.0, q_init=-1.0, tol=1e-10, max_iter=100):
    """
    Bairstow's method for finding quadratic factors.

    Returns a quadratic factor [1, p, q] of polynomial.
    coeffs: [a_n, a_{n-1}, ..., a_0]
    """
    n = len(coeffs) - 1
    p, q = p_init, q_init

    print(f"Bairstow's Method")
    print("=" * 60)
    print(f"{'Iter':<6} {'p':<15} {'q':<15} {'|Δp|':<12} {'|Δq|':<12}")
    print("-" * 60)

    for iteration in range(max_iter):
        # Synthetic division to get remainder
        b = [coeffs[0]]
        c = [coeffs[0]]

        for i in range(1, n + 1):
            if i == 1:
                b.append(coeffs[i] - p * b[i-1])
                c.append(b[i] - p * c[i-1])
            elif i == 2:
                b.append(coeffs[i] - p * b[i-1] - q * b[i-2])
                c.append(b[i] - p * c[i-1] - q * c[i-2])
            else:
                b.append(coeffs[i] - p * b[i-1] - q * b[i-2])
                if i < n:
                    c.append(b[i] - p * c[i-1] - q * c[i-2])

        # Remainder terms
        R = b[n]
        S = b[n-1]

        # Form linear system for corrections
        det = c[n-2]**2 - c[n-3] * (c[n-1] - R) if n >= 3 else c[n-2]**2

        if abs(det) < 1e-15:
            break

        dp = (S * c[n-3] - R * c[n-2]) / det if n >= 3 else -R / c[n-2]
        dq = (R * (c[n-1] - R) - S * c[n-2]) / det if n >= 3 else 0

        p += dp
        q += dq

        print(f"{iteration:<6} {p:<15.8f} {q:<15.8f} {abs(dp):<12.2e} {abs(dq):<12.2e}")

        if abs(dp) < tol and abs(dq) < tol:
            print(f"\nConverged in {iteration + 1} iterations")
            break

    # Find roots of quadratic x² + px + q
    disc = p**2 - 4*q
    if disc >= 0:
        roots = [(-p + np.sqrt(disc))/2, (-p - np.sqrt(disc))/2]
    else:
        roots = [(-p + 1j*np.sqrt(-disc))/2, (-p - 1j*np.sqrt(-disc))/2]

    return [1, p, q], roots

# Test: x⁴ - 5x² + 4 = (x²-1)(x²-4)
coeffs = [1, 0, -5, 0, 4]
factor, roots = bairstow(coeffs)

print(f"\nQuadratic factor: x² + ({factor[1]:.6f})x + ({factor[2]:.6f})")
print(f"Roots: {roots[0]:.6f}, {roots[1]:.6f}")
```

## Jenkins-Traub Algorithm

State-of-the-art polynomial root finder (used by NumPy):

1. **Stage 1**: Scale polynomial
2. **Stage 2**: Iterate to find approximate zero
3. **Stage 3**: Refine using modified Newton

```python
def jenkins_traub_simple(coeffs, max_iter=50, tol=1e-10):
    """
    Simplified Jenkins-Traub for demonstration.

    Full algorithm is more complex; this shows the basic idea.
    """
    n = len(coeffs) - 1
    roots = []

    # Work with a copy
    current_coeffs = coeffs.copy()

    print("Jenkins-Traub Algorithm (Simplified)")
    print("=" * 60)

    while len(current_coeffs) > 2:
        n_current = len(current_coeffs) - 1

        # Stage 1: Use Cauchy bound for initial estimate
        # |root| < 1 + max(|a_i/a_n|)
        cauchy_bound = 1 + max(abs(current_coeffs[i]/current_coeffs[0])
                               for i in range(1, len(current_coeffs)))

        # Initial guess on circle
        z = cauchy_bound * np.exp(2j * np.pi * np.random.random())

        # Stage 2 & 3: Modified Newton iteration
        for iteration in range(max_iter):
            # Evaluate polynomial and derivative
            p_val = current_coeffs[0]
            p_deriv = 0

            for i, c in enumerate(current_coeffs):
                if i > 0:
                    p_deriv = p_deriv * z + p_val
                    p_val = p_val * z + c

            if abs(p_deriv) < 1e-15:
                break

            z_new = z - p_val / p_deriv

            if abs(z_new - z) < tol:
                break

            z = z_new

        roots.append(z)
        print(f"Root {len(roots)}: {z:.10f}")

        # Deflate polynomial
        current_coeffs = polynomial_deflation(current_coeffs, z)

    # Handle remaining roots (degree 1 or 0)
    if len(current_coeffs) == 2:
        root = -current_coeffs[1] / current_coeffs[0]
        roots.append(root)
        print(f"Root {len(roots)}: {root:.10f}")

    return roots

# Note: This is simplified; real Jenkins-Traub is more sophisticated
```

## Worked Example: Complete Polynomial Analysis

Let's analyze $p(x) = x^4 - 5x^3 + 5x^2 + 5x - 6$

This factors as $(x-1)(x-2)(x-3)(x+1)$

```python
def complete_polynomial_analysis():
    """Comprehensive analysis of a polynomial."""
    coeffs = [1, -5, 5, 5, -6]  # x⁴ - 5x³ + 5x² + 5x - 6

    print("Complete Polynomial Root-Finding Analysis")
    print("=" * 70)
    print(f"Polynomial: p(x) = x⁴ - 5x³ + 5x² + 5x - 6")
    print(f"Known factorization: (x-1)(x-2)(x-3)(x+1)")
    print()

    # Method 1: Companion Matrix
    print("Method 1: Companion Matrix")
    print("-" * 70)
    roots_companion = companion_matrix_roots(coeffs)
    print("Roots (sorted by real part):")
    for root in sorted(roots_companion, key=lambda z: z.real):
        print(f"  {root:.10f}")
    print()

    # Method 2: NumPy (for comparison)
    print("Method 2: NumPy (Jenkins-Traub)")
    print("-" * 70)
    roots_numpy = np.roots(coeffs)
    print("Roots (sorted by real part):")
    for root in sorted(roots_numpy, key=lambda z: z.real):
        print(f"  {root:.10f}")
    print()

    # Method 3: Durand-Kerner
    print("Method 3: Durand-Kerner (Simultaneous)")
    print("-" * 70)
    roots_dk = durand_kerner(coeffs, max_iter=50)
    print()

    # Method 4: Sequential Newton with Deflation
    print("Method 4: Newton + Deflation")
    print("-" * 70)

    def newton_polynomial(coeffs, x0, max_iter=50, tol=1e-10):
        """Newton's method for polynomial."""
        x = x0

        for i in range(max_iter):
            # Evaluate p(x) and p'(x)
            p = coeffs[0]
            p_prime = 0

            for j in range(1, len(coeffs)):
                p_prime = p_prime * x + p
                p = p * x + coeffs[j]

            if abs(p) < tol:
                return x

            if abs(p_prime) < 1e-15:
                break

            x = x - p / p_prime

        return x

    current_coeffs = coeffs.copy()
    roots_newton = []

    for i in range(4):
        # Find a root
        x0 = -2.0 + i  # Different starting points
        root = newton_polynomial(current_coeffs, x0)
        roots_newton.append(root)
        print(f"  Root {i+1}: {root:.10f}")

        # Deflate
        current_coeffs = polynomial_deflation(current_coeffs, root)

    print()

    # Verify all methods agree
    print("Verification:")
    print("-" * 70)
    true_roots = [-1, 1, 2, 3]

    for method_name, roots in [("Companion", roots_companion),
                                ("NumPy", roots_numpy),
                                ("Durand-Kerner", roots_dk),
                                ("Newton+Deflation", roots_newton)]:
        # Match computed roots to true roots
        roots_real = sorted([r.real for r in roots])
        max_error = max(abs(r - t) for r, t in zip(roots_real, true_roots))
        print(f"{method_name:<20} Max error: {max_error:.2e}")

complete_polynomial_analysis()
```

## Numerical Considerations

### Condition Number

The **condition number** of polynomial root-finding measures sensitivity to coefficient perturbations:

$$\kappa_i = \frac{\sqrt{\sum_{j=0}^n |a_j|^2 |r_i|^{2j}}}{|p'(r_i)|}$$

Large $\kappa_i$ means root $r_i$ is sensitive to coefficient changes.

```python
def polynomial_condition_numbers(coeffs, roots):
    """Compute condition numbers for polynomial roots."""
    n = len(coeffs) - 1

    print("\nPolynomial Condition Numbers:")
    print("=" * 60)
    print(f"{'Root':<20} {'|p\\'(r)|':<15} {'Condition #':<15}")
    print("-" * 60)

    for i, root in enumerate(roots):
        # Compute p'(root)
        p_prime = 0
        for j in range(n):
            p_prime = p_prime * root + (n - j) * coeffs[j]

        # Compute norm of coefficient vector weighted by powers
        norm_squared = sum(abs(coeffs[j])**2 * abs(root)**(2*j)
                          for j in range(n + 1))

        if abs(p_prime) > 1e-15:
            condition_num = np.sqrt(norm_squared) / abs(p_prime)
        else:
            condition_num = float('inf')

        print(f"{root:<20.6f} {abs(p_prime):<15.2e} {condition_num:<15.2e}")

# Test on well-conditioned polynomial
coeffs = [1, -6, 11, -6]  # (x-1)(x-2)(x-3)
roots = [1, 2, 3]
polynomial_condition_numbers(coeffs, roots)
```

### Wilkinson's Polynomial

Famous example of ill-conditioning:

$$W(x) = \prod_{i=1}^{20}(x - i)$$

Tiny coefficient changes cause huge root perturbations.

```python
def wilkinson_sensitivity():
    """Demonstrate Wilkinson's polynomial sensitivity."""
    # Construct W(x) = (x-1)(x-2)...(x-20)
    coeffs = [1]
    for i in range(1, 21):
        # Multiply by (x - i)
        new_coeffs = [0] * (len(coeffs) + 1)
        for j in range(len(coeffs)):
            new_coeffs[j] += coeffs[j]
            new_coeffs[j+1] -= i * coeffs[j]
        coeffs = new_coeffs

    print("Wilkinson's Polynomial W(x) = ∏(x-i) for i=1..20")
    print("=" * 70)

    # Original roots
    roots_exact = list(range(1, 21))

    # Perturb coefficient of x^19 by tiny amount
    coeffs_perturbed = coeffs.copy()
    coeffs_perturbed[1] += 1e-8  # Perturb x^19 coefficient

    # Find roots (this will show significant changes)
    roots_original = np.roots(coeffs)
    roots_perturbed = np.roots(coeffs_perturbed)

    print(f"Original coefficient of x^19: {coeffs[1]}")
    print(f"Perturbed coefficient: {coeffs_perturbed[1]}")
    print(f"Perturbation: {1e-8:.2e} (relative: {1e-8/abs(coeffs[1]):.2e})")
    print()

    print("Impact on roots (real parts):")
    print(f"{'Root':<8} {'Original':<15} {'Perturbed':<15} {'Change':<15}")
    print("-" * 60)

    orig_sorted = sorted(roots_original, key=lambda z: z.real)
    pert_sorted = sorted(roots_perturbed, key=lambda z: z.real)

    for i in range(min(10, len(orig_sorted))):  # Show first 10
        change = abs(pert_sorted[i] - orig_sorted[i])
        print(f"{i+1:<8} {orig_sorted[i].real:<15.6f} "
              f"{pert_sorted[i].real:<15.6f} {change:<15.2e}")

    print("\nNote: Small coefficient change causes large root changes!")
    print("This demonstrates ill-conditioning of polynomial root-finding.")

wilkinson_sensitivity()
```

## Practical Recommendations

### Choosing a Method

**For general polynomials**:
1. **NumPy/SciPy**: Use `np.roots()` (Jenkins-Traub)
2. **High accuracy needed**: Use companion matrix eigenvalue method with high-precision arithmetic
3. **Symbolic known factors**: Use deflation with care

**For special cases**:
- **Real coefficients only**: Bairstow's method finds quadratic factors
- **All roots needed simultaneously**: Durand-Kerner or Aberth-Ehrlich
- **One root at a time**: Newton + deflation (watch for error accumulation)

```python
def practical_polynomial_solver(coeffs, method='auto', refine=True):
    """
    Practical polynomial root finder with multiple options.

    Parameters:
    - coeffs: Polynomial coefficients [a_n, ..., a_0]
    - method: 'auto', 'numpy', 'companion', 'durand-kerner'
    - refine: Whether to refine roots with Newton polish
    """
    n = len(coeffs) - 1

    # Choose method
    if method == 'auto':
        if n <= 4:
            method = 'companion'  # Fast for small degree
        else:
            method = 'numpy'  # Most reliable for large degree

    # Find roots
    if method == 'numpy':
        roots = np.roots(coeffs)
    elif method == 'companion':
        roots = companion_matrix_roots(coeffs)
    elif method == 'durand-kerner':
        roots = durand_kerner(coeffs, max_iter=100)
    else:
        raise ValueError(f"Unknown method: {method}")

    # Refine with Newton polish
    if refine:
        roots_refined = []
        for root in roots:
            # Few Newton iterations
            z = root
            for _ in range(5):
                p = coeffs[0]
                p_prime = 0
                for i in range(1, len(coeffs)):
                    p_prime = p_prime * z + p
                    p = p * z + coeffs[i]

                if abs(p_prime) > 1e-15:
                    z = z - p / p_prime

            roots_refined.append(z)
        roots = roots_refined

    return sorted(roots, key=lambda z: (z.real, z.imag))

# Example usage
coeffs = [1, -10, 35, -50, 24]  # (x-1)(x-2)(x-3)(x-4)
roots = practical_polynomial_solver(coeffs, method='auto', refine=True)

print("\nPractical Solver Results:")
for i, root in enumerate(roots):
    print(f"  Root {i+1}: {root:.12f}")
```

## Key Takeaways

1. **Companion matrix method** is most reliable for general polynomials
2. **Jenkins-Traub algorithm** (NumPy) is production-quality standard
3. **Durand-Kerner** finds all roots simultaneously with good efficiency
4. **Polynomial root-finding is inherently ill-conditioned** for high degrees
5. **Deflation accumulates errors**: refine roots afterward if using sequential methods
6. **Complex roots come in conjugate pairs** for real polynomials
7. **Always verify results**: Evaluate polynomial at computed roots
8. **Consider problem structure**: Special forms may have better algorithms

## Common Mistakes

1. **Using deflation without refinement**: Errors accumulate quickly
2. **Ignoring numerical conditioning**: High-degree polynomials are sensitive
3. **Not checking for complex roots**: Real polynomials can have complex roots
4. **Assuming high-order methods are better**: Companion matrix is often best
5. **Forgetting to normalize**: Leading coefficient should be 1 or handled properly
6. **Not verifying solutions**: Always check $|p(r)|$ for computed roots
7. **Using wrong coefficient order**: Be consistent about $a_n x^n + ... + a_0$ vs $a_0 + ... + a_n x^n$
