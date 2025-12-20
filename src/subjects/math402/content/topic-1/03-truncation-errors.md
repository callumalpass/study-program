---
title: "Truncation Errors"
description: "Understanding truncation errors in numerical approximations, Taylor series, and discretization methods"
---

# Truncation Errors

Truncation errors arise when an infinite mathematical process is approximated by a finite one, distinct from rounding errors which come from finite precision arithmetic.

## Definition and Distinction

**Truncation Error**: Error from using a finite approximation to an infinite process.

**Rounding Error**: Error from finite precision representation.

**Total Error** = Truncation Error + Rounding Error

Consider computing $e^x$ with Taylor series:

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

- **Truncation error**: From stopping after $n$ terms
- **Rounding error**: From floating-point arithmetic in each operation

## Taylor Series and Taylor's Theorem

### Taylor's Theorem

If $f$ has $n+1$ continuous derivatives on $[a,b]$, then for any $x$ in $[a,b]$:

$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n + R_n(x)$$

where the remainder (truncation error) is:

$$R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$

for some $\xi \in (a,x)$ or $\xi \in (x,a)$.

### Alternative Forms of Remainder

**Lagrange Form**:
$$R_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$$

**Cauchy Form**:
$$R_n(x) = \frac{f^{(n+1)}(\xi)}{n!}(x-\xi)^n(x-a)$$

**Integral Form**:
$$R_n(x) = \int_a^x \frac{f^{(n+1)}(t)}{n!}(x-t)^n \, dt$$

## Big-O and Little-o Notation

### Big-O Notation

$f(h) = O(h^p)$ means:

$$\left|\frac{f(h)}{h^p}\right| \leq C$$

for some constant $C$ as $h \to 0$.

**Example**: $\sin(h) = O(h)$ because $\left|\frac{\sin(h)}{h}\right| \leq 1$ for small $h$.

### Little-o Notation

$f(h) = o(h^p)$ means:

$$\lim_{h \to 0} \frac{f(h)}{h^p} = 0$$

This is a stronger statement than big-O.

**Example**: $h^2 = o(h)$ because $\lim_{h \to 0} \frac{h^2}{h} = 0$.

### Common Taylor Expansions

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + O(x^4)$$

$$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + O(x^9)$$

$$\cos(x) = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + O(x^8)$$

$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + O(x^5)$$

$$(1+x)^{\alpha} = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + O(x^3)$$

## Numerical Differentiation Truncation Errors

### Forward Difference

$$f'(x) \approx \frac{f(x+h) - f(x)}{h}$$

Taylor expansion:

$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(\xi)$$

Therefore:

$$\frac{f(x+h) - f(x)}{h} = f'(x) + \frac{h}{2}f''(x) + O(h^2)$$

**Truncation error**: $O(h)$ (first-order accurate)

### Backward Difference

$$f'(x) \approx \frac{f(x) - f(x-h)}{h}$$

Similarly, truncation error is $O(h)$.

### Central Difference

$$f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$$

Taylor expansions:

$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + \frac{h^4}{24}f^{(4)}(\xi_1)$$

$$f(x-h) = f(x) - hf'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x) + \frac{h^4}{24}f^{(4)}(\xi_2)$$

Subtracting:

$$\frac{f(x+h) - f(x-h)}{2h} = f'(x) + \frac{h^2}{6}f'''(x) + O(h^4)$$

**Truncation error**: $O(h^2)$ (second-order accurate)

```python
import numpy as np
import matplotlib.pyplot as plt

def test_differentiation_truncation():
    """Demonstrate truncation errors in numerical differentiation."""
    # Test function: f(x) = sin(x), f'(x) = cos(x)
    f = np.sin
    f_prime_exact = np.cos

    x = 1.0  # Point of differentiation
    h_values = np.logspace(-10, 0, 100)

    errors_forward = []
    errors_backward = []
    errors_central = []

    for h in h_values:
        # Forward difference
        forward = (f(x + h) - f(x)) / h
        errors_forward.append(abs(forward - f_prime_exact(x)))

        # Backward difference
        backward = (f(x) - f(x - h)) / h
        errors_backward.append(abs(backward - f_prime_exact(x)))

        # Central difference
        central = (f(x + h) - f(x - h)) / (2 * h)
        errors_central.append(abs(central - f_prime_exact(x)))

    # Plot
    plt.figure(figsize=(10, 6))
    plt.loglog(h_values, errors_forward, label='Forward Difference O(h)', linewidth=2)
    plt.loglog(h_values, errors_backward, label='Backward Difference O(h)', linewidth=2)
    plt.loglog(h_values, errors_central, label='Central Difference O(h²)', linewidth=2)

    # Reference lines
    plt.loglog(h_values, h_values, 'k--', label='O(h)', alpha=0.5)
    plt.loglog(h_values, h_values**2, 'k:', label='O(h²)', alpha=0.5)

    plt.xlabel('Step size h')
    plt.ylabel('Absolute Error')
    plt.title('Truncation Errors in Numerical Differentiation')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('differentiation_truncation_errors.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Truncation error analysis saved to differentiation_truncation_errors.png")

test_differentiation_truncation()
```

## Numerical Integration Truncation Errors

### Rectangular Rule

$$\int_a^b f(x) \, dx \approx (b-a) f(a)$$

Truncation error: $O(h^2)$ where $h = b - a$

### Trapezoidal Rule

$$\int_a^b f(x) \, dx \approx \frac{b-a}{2}[f(a) + f(b)]$$

Using Taylor expansion:

$$f(b) = f(a) + (b-a)f'(a) + \frac{(b-a)^2}{2}f''(a) + \frac{(b-a)^3}{6}f'''(\xi)$$

Truncation error: $-\frac{(b-a)^3}{12}f''(\xi) = O(h^3)$

### Simpson's Rule

$$\int_a^b f(x) \, dx \approx \frac{b-a}{6}\left[f(a) + 4f\left(\frac{a+b}{2}\right) + f(b)\right]$$

Truncation error: $-\frac{(b-a)^5}{2880}f^{(4)}(\xi) = O(h^5)$

```python
def analyze_integration_truncation():
    """Analyze truncation errors in numerical integration."""
    # Test function: integral of sin(x) from 0 to pi is 2
    f = np.sin
    a, b = 0, np.pi
    exact = 2.0

    n_values = 2 ** np.arange(1, 15)
    errors_rect = []
    errors_trap = []
    errors_simp = []

    for n in n_values:
        h = (b - a) / n
        x = np.linspace(a, b, n + 1)
        y = f(x)

        # Rectangular (left endpoint)
        rect = h * np.sum(y[:-1])
        errors_rect.append(abs(rect - exact))

        # Trapezoidal
        trap = h * (np.sum(y) - 0.5 * (y[0] + y[-1]))
        errors_trap.append(abs(trap - exact))

        # Simpson's rule (requires even n)
        if n % 2 == 0:
            simp = h / 3 * (y[0] + y[-1] + 4 * np.sum(y[1:-1:2]) + 2 * np.sum(y[2:-1:2]))
            errors_simp.append(abs(simp - exact))
        else:
            errors_simp.append(np.nan)

    # Plot
    h_values = (b - a) / n_values

    plt.figure(figsize=(10, 6))
    plt.loglog(h_values, errors_rect, 'o-', label='Rectangular O(h²)', linewidth=2)
    plt.loglog(h_values, errors_trap, 's-', label='Trapezoidal O(h³)', linewidth=2)

    # Filter out nan values for Simpson
    valid_simp = ~np.isnan(errors_simp)
    plt.loglog(h_values[valid_simp], np.array(errors_simp)[valid_simp],
               '^-', label='Simpson O(h⁵)', linewidth=2)

    # Reference lines
    plt.loglog(h_values, h_values**2 * 10, 'k--', label='O(h²)', alpha=0.5)
    plt.loglog(h_values, h_values**3 * 10, 'k:', label='O(h³)', alpha=0.5)
    plt.loglog(h_values, h_values**5 * 1000, 'k-.', label='O(h⁵)', alpha=0.5)

    plt.xlabel('Step size h')
    plt.ylabel('Absolute Error')
    plt.title('Truncation Errors in Numerical Integration')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('integration_truncation_errors.png', dpi=150, bbox_inches='tight')
    plt.close()

    print("Integration truncation error analysis saved to integration_truncation_errors.png")

analyze_integration_truncation()
```

## Richardson Extrapolation

Richardson extrapolation improves accuracy by combining results at different step sizes.

If an approximation $A(h)$ has expansion:

$$A(h) = A_0 + c_1 h^p + c_2 h^{2p} + \cdots$$

Then we can eliminate the $O(h^p)$ term:

$$A_{improved} = \frac{2^p A(h/2) - A(h)}{2^p - 1}$$

```python
def richardson_extrapolation(f, x, h, order=1, levels=4):
    """
    Apply Richardson extrapolation to numerical differentiation.

    Parameters:
    - f: function to differentiate
    - x: point of differentiation
    - h: initial step size
    - order: order of derivative (1 for first derivative)
    - levels: number of extrapolation levels
    """
    # Initialize table
    D = np.zeros((levels, levels))

    # First column: basic finite difference approximations
    for i in range(levels):
        h_i = h / (2**i)
        if order == 1:
            D[i, 0] = (f(x + h_i) - f(x - h_i)) / (2 * h_i)
        elif order == 2:
            D[i, 0] = (f(x + h_i) - 2*f(x) + f(x - h_i)) / h_i**2

    # Richardson extrapolation
    for j in range(1, levels):
        for i in range(j, levels):
            D[i, j] = D[i, j-1] + (D[i, j-1] - D[i-1, j-1]) / (4**j - 1)

    return D

# Test Richardson extrapolation
f = np.sin
x = 1.0
h = 0.1
exact = np.cos(1.0)

D = richardson_extrapolation(f, x, h, order=1, levels=5)

print("Richardson Extrapolation Table:")
print("Exact derivative:", exact)
print("\nApproximations:")
for i in range(5):
    print(f"h/{2**i}: {D[i, 0]:.15f}, error: {abs(D[i, 0] - exact):.5e}")

print("\nExtrapolated values (diagonal):")
for i in range(5):
    print(f"Level {i}: {D[i, i]:.15f}, error: {abs(D[i, i] - exact):.5e}")
```

## Order of Accuracy

An approximation has **order of accuracy** $p$ if:

$$\text{Error} = O(h^p)$$

Higher order means faster convergence as $h \to 0$.

### Determining Order Experimentally

```python
def estimate_convergence_order(h_values, errors):
    """
    Estimate the order of convergence from error data.

    Uses log-log linear regression: log(error) ≈ p*log(h) + c
    """
    # Remove zeros and compute logs
    valid = (errors > 0) & (h_values > 0)
    log_h = np.log(h_values[valid])
    log_err = np.log(errors[valid])

    # Linear regression
    p = np.polyfit(log_h, log_err, 1)
    order = p[0]

    return order

# Example: verify central difference is O(h²)
f = lambda x: np.exp(x)
f_prime = lambda x: np.exp(x)
x = 1.0

h_values = np.logspace(-8, -1, 20)
errors = []

for h in h_values:
    approx = (f(x + h) - f(x - h)) / (2 * h)
    exact = f_prime(x)
    errors.append(abs(approx - exact))

errors = np.array(errors)
order = estimate_convergence_order(h_values, errors)

print(f"Estimated order of convergence: {order:.2f}")
print("Expected: 2.0 (central difference)")
```

## Truncation vs. Rounding Trade-off

As step size $h$ decreases:
- Truncation error $\downarrow$ (better approximation)
- Rounding error $\uparrow$ (more cancellation)

**Optimal step size** balances both errors.

```python
def find_optimal_stepsize():
    """Find optimal step size for numerical differentiation."""
    f = np.sin
    f_prime = np.cos
    x = 1.0

    h_values = np.logspace(-16, 0, 200)
    total_errors = []
    truncation_estimates = []
    rounding_estimates = []

    eps = np.finfo(float).eps

    for h in h_values:
        # Actual error
        approx = (f(x + h) - f(x - h)) / (2 * h)
        exact = f_prime(x)
        total_error = abs(approx - exact)
        total_errors.append(total_error)

        # Estimate truncation error: C * h²
        # For sin, f''' ≈ -cos(x)
        truncation = abs(-np.cos(x)) * h**2 / 6
        truncation_estimates.append(truncation)

        # Estimate rounding error: eps * |f| / h
        rounding = eps * abs(f(x)) / h
        rounding_estimates.append(rounding)

    total_errors = np.array(total_errors)
    truncation_estimates = np.array(truncation_estimates)
    rounding_estimates = np.array(rounding_estimates)

    # Find optimal h (minimum total error)
    optimal_idx = np.argmin(total_errors)
    optimal_h = h_values[optimal_idx]

    # Theoretical optimal h: minimize C*h² + eps/h
    # Derivative: 2*C*h - eps/h² = 0 => h = (eps/(2C))^(1/3)
    C = abs(-np.cos(x)) / 6
    theoretical_optimal = (eps / (2 * C)) ** (1/3)

    plt.figure(figsize=(12, 6))
    plt.loglog(h_values, total_errors, 'b-', linewidth=2, label='Total Error')
    plt.loglog(h_values, truncation_estimates, 'r--', linewidth=2, label='Truncation Error (est)')
    plt.loglog(h_values, rounding_estimates, 'g--', linewidth=2, label='Rounding Error (est)')
    plt.axvline(optimal_h, color='k', linestyle=':', label=f'Optimal h (empirical) = {optimal_h:.2e}')
    plt.axvline(theoretical_optimal, color='m', linestyle=':',
                label=f'Optimal h (theoretical) = {theoretical_optimal:.2e}')

    plt.xlabel('Step size h')
    plt.ylabel('Error')
    plt.title('Truncation vs Rounding Error Trade-off')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.savefig('truncation_rounding_tradeoff.png', dpi=150, bbox_inches='tight')
    plt.close()

    print(f"Empirical optimal h: {optimal_h:.5e}")
    print(f"Theoretical optimal h: {theoretical_optimal:.5e}")
    print(f"Minimum error: {total_errors[optimal_idx]:.5e}")

find_optimal_stepsize()
```

## Adaptive Methods

Adaptive methods automatically adjust step size to meet error tolerance:

```python
def adaptive_integration(f, a, b, tol=1e-6, max_depth=20):
    """
    Adaptive Simpson's rule integration.

    Recursively subdivide until error estimate < tolerance.
    """
    def simpson(f, a, b):
        """Simpson's rule on [a,b]."""
        h = (b - a) / 2
        c = (a + b) / 2
        return h / 3 * (f(a) + 4*f(c) + f(b))

    def adaptive_simpson_rec(f, a, b, tol, whole, depth):
        """Recursive adaptive Simpson."""
        c = (a + b) / 2
        left = simpson(f, a, c)
        right = simpson(f, c, b)
        delta = left + right - whole

        if depth >= max_depth:
            return left + right

        if abs(delta) <= 15 * tol:  # Error estimate
            return left + right + delta / 15
        else:
            # Subdivide
            left_result = adaptive_simpson_rec(f, a, c, tol/2, left, depth+1)
            right_result = adaptive_simpson_rec(f, c, b, tol/2, right, depth+1)
            return left_result + right_result

    whole = simpson(f, a, b)
    return adaptive_simpson_rec(f, a, b, tol, whole, 0)

# Test adaptive integration
f = lambda x: np.exp(-x**2)  # Gaussian
result = adaptive_integration(f, 0, 3, tol=1e-10)
print(f"Adaptive integration result: {result:.15f}")
print(f"Reference (quad): {quad(f, 0, 3)[0]:.15f}")

from scipy.integrate import quad
```

## Summary

Truncation errors arise from finite approximations to infinite processes:

1. **Taylor's Theorem** provides rigorous error bounds
2. **Order of accuracy** characterizes convergence rate
3. **Richardson extrapolation** improves accuracy
4. **Optimal step size** balances truncation and rounding errors
5. **Adaptive methods** automatically control error

Key insights:
- Higher-order methods converge faster
- Central differences are more accurate than forward/backward
- Simpson's rule beats trapezoidal rule
- Too small step sizes increase rounding error
- Adaptive methods provide efficiency and accuracy
