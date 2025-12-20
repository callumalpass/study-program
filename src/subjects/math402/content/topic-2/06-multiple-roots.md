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

## Worked Example: Complete Analysis

Let's work through a complete example of finding a triple root.

**Problem**: Find the root of $f(x) = (x - 3)^3 = x^3 - 9x^2 + 27x - 27$

### Step 1: Standard Newton's Method

```python
def worked_example_standard():
    """Complete worked example with standard Newton."""
    f = lambda x: x**3 - 9*x**2 + 27*x - 27
    f_prime = lambda x: 3*x**2 - 18*x + 27

    x = 2.5
    true_root = 3.0

    print("Standard Newton's Method on (x-3)³ = 0")
    print("=" * 70)
    print(f"{'Iter':<6} {'x_n':<18} {'f(x_n)':<15} {'Error':<15} {'Ratio':<12}")
    print("-" * 70)

    errors = []
    for i in range(12):
        fx = f(x)
        fpx = f_prime(x)
        error = abs(x - true_root)
        errors.append(error)

        ratio = errors[i] / errors[i-1] if i > 0 else 0

        print(f"{i:<6} {x:<18.12f} {fx:<15.2e} {error:<15.2e} {ratio:<12.5f}")

        x = x - fx / fpx

    # Estimate multiplicity from convergence ratio
    avg_ratio = np.mean([errors[i]/errors[i-1] for i in range(-5, -1)])
    estimated_m = 1 / (1 - avg_ratio)

    print(f"\nAverage convergence ratio: {avg_ratio:.5f}")
    print(f"Estimated multiplicity: {estimated_m:.1f}")
    print(f"Theoretical ratio for m=3: {2/3:.5f}")

worked_example_standard()
```

### Step 2: Modified Newton with Known Multiplicity

```python
def worked_example_modified():
    """Modified Newton knowing m=3."""
    f = lambda x: x**3 - 9*x**2 + 27*x - 27
    f_prime = lambda x: 3*x**2 - 18*x + 27

    x = 2.5
    true_root = 3.0
    m = 3

    print("\n\nModified Newton's Method (m=3)")
    print("=" * 70)
    print(f"{'Iter':<6} {'x_n':<18} {'f(x_n)':<15} {'Error':<15} {'Reduction':<12}")
    print("-" * 70)

    errors = []
    for i in range(6):
        fx = f(x)
        fpx = f_prime(x)
        error = abs(x - true_root)
        errors.append(error)

        reduction = errors[i-1]/errors[i] if i > 0 else 0

        print(f"{i:<6} {x:<18.12f} {fx:<15.2e} {error:<15.2e} {reduction:<12.1f}x")

        x = x - m * fx / fpx

    print(f"\nFinal error: {errors[-1]:.2e}")
    print("Note: Quadratic convergence - error squared each iteration")

worked_example_modified()
```

### Step 3: Ratio Method (Unknown Multiplicity)

```python
def worked_example_ratio():
    """Newton on u(x) = f/f' ratio."""
    f = lambda x: x**3 - 9*x**2 + 27*x - 27
    f_prime = lambda x: 3*x**2 - 18*x + 27
    f_double = lambda x: 6*x - 18

    x = 2.5
    true_root = 3.0

    print("\n\nRatio Method: Newton on u(x) = f/f'")
    print("=" * 70)
    print(f"{'Iter':<6} {'x_n':<18} {'u(x_n)':<15} {'Error':<15} {'Reduction':<12}")
    print("-" * 70)

    errors = []
    for i in range(6):
        fx = f(x)
        fpx = f_prime(x)
        fppx = f_double(x)

        error = abs(x - true_root)
        errors.append(error)

        u = fx / fpx
        reduction = errors[i-1]/errors[i] if i > 0 else 0

        print(f"{i:<6} {x:<18.12f} {u:<15.2e} {error:<15.2e} {reduction:<12.1f}x")

        # Newton on u: x - u/u'
        # u' = (f'² - f*f'')/f'²
        u_prime = 1 - fx * fppx / (fpx * fpx)

        if abs(u_prime) > 1e-15:
            x = x - u / u_prime
        else:
            break

    print(f"\nFinal error: {errors[-1]:.2e}")
    print("Automatically handles unknown multiplicity!")

worked_example_ratio()
```

## Theoretical Background

### Why Newton Fails

For a root of multiplicity $m$, we can write:
$$f(x) = (x - r)^m g(x)$$

where $g(r) \neq 0$. Then:
$$f'(x) = m(x - r)^{m-1} g(x) + (x - r)^m g'(x)$$

The Newton iteration becomes:
$$x_{n+1} = x_n - \frac{(x_n - r)^m g(x_n)}{m(x_n - r)^{m-1} g(x_n) + (x_n - r)^m g'(x_n)}$$

Factoring out $(x_n - r)^{m-1}$:
$$x_{n+1} = x_n - \frac{(x_n - r) g(x_n)}{m g(x_n) + (x_n - r) g'(x_n)}$$

As $x_n \to r$:
$$x_{n+1} - r \approx (x_n - r) - \frac{(x_n - r) g(r)}{m g(r)} = \left(1 - \frac{1}{m}\right)(x_n - r)$$

This proves linear convergence with ratio $\lambda = 1 - 1/m$.

### Why Modified Newton Works

With the factor $m$:
$$x_{n+1} = x_n - m \frac{f(x_n)}{f'(x_n)}$$

Following the same analysis:
$$x_{n+1} - r \approx (x_n - r) - m \cdot \frac{(x_n - r) g(r)}{m g(r)} = (x_n - r) - (x_n - r) = 0$$

Actually, the higher-order terms give quadratic convergence.

## Advanced Techniques

### Schröder's Method

General form for known multiplicity:
$$x_{n+1} = x_n - m \frac{f(x_n)}{f'(x_n)}$$

Can be derived as Newton's method applied to $f(x)^{1/m}$.

### Using Higher Derivatives

Alternative formulation using second derivative:
$$m = \frac{f(x) f''(x)}{[f'(x)]^2}$$

Near the root, this ratio approaches $m$.

```python
def estimate_multiplicity_derivative(f, f_prime, f_double, x0):
    """
    Estimate multiplicity using derivative ratio.

    m ≈ f*f'' / (f')²
    """
    x = x0

    # Take several Newton steps to get close
    for _ in range(10):
        fx = f(x)
        fpx = f_prime(x)
        if abs(fpx) > 1e-15:
            x = x - fx / fpx

    # Estimate multiplicity
    fx = f(x)
    fpx = f_prime(x)
    fppx = f_double(x)

    if abs(fpx) > 1e-15:
        m_estimate = abs(fx * fppx / (fpx * fpx))
        return round(m_estimate)

    return None

# Test on triple root
f = lambda x: (x - 3)**3
f_prime = lambda x: 3*(x - 3)**2
f_double = lambda x: 6*(x - 3)

m = estimate_multiplicity_derivative(f, f_prime, f_double, 2.5)
print(f"\nEstimated multiplicity using derivatives: {m}")
```

### Multiple Multiple Roots

For polynomials with several repeated roots:

```python
def handle_multiple_multiple_roots():
    """
    Example: (x-1)²(x-2)³ = x⁵ - 8x⁴ + 25x³ - 38x² + 28x - 8
    """
    import numpy.polynomial.polynomial as P

    # Polynomial coefficients [a_0, a_1, ..., a_n]
    coeffs = [-8, 28, -38, 25, -8, 1]

    # Find roots with multiplicities
    def find_roots_with_deflation():
        current_coeffs = coeffs[::-1]  # Reverse for standard form
        roots_found = []

        while len(current_coeffs) > 1:
            # Use numpy to find a root
            roots = np.roots(current_coeffs)
            # Take the real root closest to real axis
            root = min(roots, key=lambda r: abs(r.imag))
            root = root.real

            print(f"\nFound root: {root:.6f}")

            # Determine multiplicity
            multiplicity = 1
            test_coeffs = current_coeffs

            while len(test_coeffs) > 1:
                # Deflate
                new_coeffs = polynomial_deflation(test_coeffs, root)

                # Check if root still exists
                val = np.polyval(new_coeffs, root)

                if abs(val) < 1e-6 and len(new_coeffs) > 1:
                    multiplicity += 1
                    test_coeffs = new_coeffs
                else:
                    break

            print(f"  Multiplicity: {multiplicity}")
            roots_found.append((root, multiplicity))

            # Deflate by full multiplicity
            for _ in range(multiplicity):
                current_coeffs = polynomial_deflation(current_coeffs, root)

        return roots_found

    roots = find_roots_with_deflation()

    print("\n\nSummary:")
    print(f"Polynomial: (x-1)²(x-2)³")
    print(f"Found roots:")
    for root, mult in roots:
        print(f"  x = {root:.6f}, multiplicity = {mult}")

handle_multiple_multiple_roots()
```

## Numerical Stability Considerations

### Ill-Conditioning

Multiple roots are inherently ill-conditioned: small perturbations in coefficients can cause large changes in root locations.

**Example**: Consider $p(x) = (x - 1)^5$ vs $p(x) = (x - 1)^5 + \epsilon x^4$

```python
def demonstrate_ill_conditioning():
    """Show sensitivity of multiple roots to perturbations."""
    import numpy.polynomial.polynomial as P

    # (x-1)⁵ = x⁵ - 5x⁴ + 10x³ - 10x² + 5x - 1
    coeffs_exact = [1, -5, 10, -10, 5, -1]

    # Add small perturbation
    epsilon = 0.001
    coeffs_perturbed = coeffs_exact.copy()
    coeffs_perturbed[4] += epsilon  # Perturb x⁴ coefficient

    roots_exact = np.roots(coeffs_exact)
    roots_perturbed = np.roots(coeffs_perturbed)

    print("Sensitivity of Multiple Roots:")
    print("=" * 50)
    print(f"Exact polynomial: (x-1)⁵")
    print(f"Exact roots: {roots_exact}")
    print(f"\nPerturbed (ε={epsilon} on x⁴ term):")
    print(f"Roots: {roots_perturbed}")
    print(f"\nNote: Small coefficient change → roots spread in complex plane")

demonstrate_ill_conditioning()
```

### Avoiding Numerical Issues

1. **Use exact arithmetic** when possible
2. **Deflate carefully**: Errors accumulate in sequential deflation
3. **Refine solutions**: Polish roots after deflation
4. **Consider symbolic methods**: For polynomials with known structure

## Key Takeaways

1. **Multiple roots degrade convergence**: Standard Newton becomes linearly convergent
2. **Modified Newton restores quadratic convergence** if multiplicity is known
3. **Ratio method** $u(x) = f(x)/f'(x)$ automatically handles unknown multiplicities
4. **Convergence ratio reveals multiplicity**: $m \approx 1/(1-\lambda)$
5. **Deflation enables finding multiple roots** sequentially
6. **Multiple roots are ill-conditioned**: Small perturbations cause large changes
7. **Practical strategy**: Use ratio method or estimate multiplicity from convergence

## Common Mistakes

1. **Assuming all roots are simple**: Always check convergence behavior
2. **Not recognizing linear convergence**: Slow convergence may indicate multiple root
3. **Dividing by near-zero derivatives**: Multiple roots make $f'(r) = 0$
4. **Ignoring numerical stability**: Deflation accumulates errors
5. **Forgetting to verify multiplicity**: Convergence ratio should stabilize if estimate is correct
