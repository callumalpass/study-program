---
title: "Error Bounds and Estimates"
description: "Techniques for bounding and estimating errors in numerical computations to ensure reliability"
---

# Error Bounds and Estimates

Error bounds provide guarantees on computational accuracy, allowing us to quantify uncertainty and validate numerical results.

## Types of Error Bounds

### A Priori Bounds

**A priori** bounds are known before computation, based on problem parameters:

$$\|e\| \leq f(h, \text{derivatives}, \text{parameters})$$

Example: For trapezoidal rule on $[a,b]$:

$$E \leq \frac{(b-a)^3}{12n^2} \max_{x \in [a,b]} |f''(x)|$$

### A Posteriori Bounds

**A posteriori** bounds are computed after using the computed solution:

$$\|e\| \leq g(\text{computed values}, \text{residuals})$$

More practical but may underestimate true error.

## Taylor Remainder Bounds

For Taylor series $f(x) = \sum_{k=0}^n \frac{f^{(k)}(a)}{k!}(x-a)^k + R_n(x)$:

**Lagrange remainder**:

$$|R_n(x)| = \left|\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}\right| \leq \frac{M_{n+1}}{(n+1)!}|x-a|^{n+1}$$

where $M_{n+1} = \max_{\xi \in [a,x]} |f^{(n+1)}(\xi)|$.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.misc import derivative

def taylor_error_bound(f, a, x, n, M=None):
    """
    Compute Taylor series approximation and error bound.

    Parameters:
    - f: function to approximate
    - a: expansion point
    - x: evaluation point
    - n: degree of Taylor polynomial
    - M: bound on (n+1)-th derivative (estimated if not provided)
    """
    # Compute Taylor coefficients
    coeffs = []
    for k in range(n+1):
        deriv = derivative(f, a, n=k, dx=1e-5)
        coeffs.append(deriv / np.math.factorial(k))

    # Taylor approximation
    taylor_approx = sum(c * (x - a)**k for k, c in enumerate(coeffs))

    # Estimate M if not provided
    if M is None:
        # Sample derivative at several points
        points = np.linspace(min(a, x), max(a, x), 100)
        M = max(abs(derivative(f, p, n=n+1, dx=1e-5)) for p in points)

    # Error bound
    error_bound = M * abs(x - a)**(n+1) / np.math.factorial(n+1)

    # Actual error
    actual_error = abs(f(x) - taylor_approx)

    return taylor_approx, error_bound, actual_error

# Test with f(x) = exp(x)
f = np.exp
a = 0
x = 1.0

print(f"Taylor Series Approximation of e^x at x={x}, centered at a={a}\n")
print(f"{'Degree':<8} {'Approximation':<18} {'Error Bound':<15} {'Actual Error':<15} {'Ratio'}")
print("=" * 75)

for n in range(1, 11):
    approx, bound, error = taylor_error_bound(f, a, x, n)
    ratio = bound / error if error > 0 else float('inf')
    print(f"{n:<8} {approx:<18.12f} {bound:<15.2e} {error:<15.2e} {ratio:<15.2f}")

print(f"\nExact value: {f(x):.12f}")
```

## Finite Difference Error Bounds

### Forward Difference

$$f'(x) = \frac{f(x+h) - f(x)}{h} - \frac{h}{2}f''(\xi)$$

**Error bound**:

$$|E| \leq \frac{h}{2} \max_{\xi \in [x, x+h]} |f''(\xi)|$$

### Central Difference

$$f'(x) = \frac{f(x+h) - f(x-h)}{2h} - \frac{h^2}{6}f'''(\xi)$$

**Error bound**:

$$|E| \leq \frac{h^2}{6} \max_{\xi \in [x-h, x+h]} |f'''(\xi)|$$

```python
def differentiation_error_analysis(f, f_prime, x, h_values):
    """Analyze differentiation errors and compare with bounds."""
    # Estimate third derivative for central difference bound
    f_triple_prime_max = max(
        abs(derivative(f, x + h, n=3, dx=1e-6)) for h in h_values
    )

    print(f"{'h':<12} {'Forward':<12} {'Central':<12} {'Bound(Fwd)':<12} {'Bound(Ctr)':<12}")
    print("=" * 60)

    for h in h_values:
        # Compute approximations
        forward = (f(x + h) - f(x)) / h
        central = (f(x + h) - f(x - h)) / (2 * h)
        exact = f_prime(x)

        # Actual errors
        error_forward = abs(forward - exact)
        error_central = abs(central - exact)

        # Error bounds (assuming smooth function)
        # Estimate f''(ξ) for forward difference
        f_double_prime = abs(derivative(f, x + h/2, n=2, dx=1e-6))
        bound_forward = h * f_double_prime / 2

        # Error bound for central difference
        bound_central = h**2 * f_triple_prime_max / 6

        print(f"{h:<12.2e} {error_forward:<12.2e} {error_central:<12.2e} "
              f"{bound_forward:<12.2e} {bound_central:<12.2e}")

# Test
f = np.sin
f_prime = np.cos
x = 1.0
h_values = [0.1, 0.01, 0.001, 0.0001]

print("Differentiation Error Analysis for f(x) = sin(x) at x = 1.0\n")
differentiation_error_analysis(f, f_prime, x, h_values)
```

## Integration Error Bounds

### Trapezoidal Rule

For single interval $[a,b]$:

$$E = -\frac{(b-a)^3}{12}f''(\xi)$$

For composite rule with $n$ subintervals:

$$|E| \leq \frac{(b-a)^3}{12n^2} \max_{x \in [a,b]} |f''(x)|$$

### Simpson's Rule

For single interval:

$$E = -\frac{(b-a)^5}{2880}f^{(4)}(\xi)$$

For composite rule with $n$ subintervals ($n$ even):

$$|E| \leq \frac{(b-a)^5}{2880n^4} \max_{x \in [a,b]} |f^{(4)}(x)|$$

```python
from scipy.integrate import quad

def integration_error_bounds(f, a, b, n_values):
    """Analyze integration errors and compare with theoretical bounds."""
    # Exact integral
    exact, _ = quad(f, a, b, epsabs=1e-14)

    # Estimate bounds on derivatives
    x_sample = np.linspace(a, b, 1000)
    f_double_prime_max = max(abs(derivative(f, x, n=2, dx=1e-5)) for x in x_sample)
    f_quad_prime_max = max(abs(derivative(f, x, n=4, dx=1e-5)) for x in x_sample)

    print(f"Integration of f(x) from {a} to {b}")
    print(f"Exact value: {exact:.15f}\n")
    print(f"{'n':<8} {'Trap Error':<15} {'Simp Error':<15} {'Trap Bound':<15} {'Simp Bound'}")
    print("=" * 68)

    for n in n_values:
        h = (b - a) / n
        x = np.linspace(a, b, n + 1)
        y = f(x)

        # Trapezoidal rule
        trap = h * (np.sum(y) - 0.5 * (y[0] + y[-1]))
        error_trap = abs(trap - exact)

        # Simpson's rule (requires even n)
        if n % 2 == 0:
            simp = h / 3 * (y[0] + y[-1] + 4 * np.sum(y[1:-1:2]) + 2 * np.sum(y[2:-1:2]))
            error_simp = abs(simp - exact)
        else:
            simp = np.nan
            error_simp = np.nan

        # Theoretical bounds
        bound_trap = ((b - a)**3 / (12 * n**2)) * f_double_prime_max
        bound_simp = ((b - a)**5 / (2880 * n**4)) * f_quad_prime_max if n % 2 == 0 else np.nan

        print(f"{n:<8} {error_trap:<15.2e} {error_simp if not np.isnan(error_simp) else 'N/A':<15} "
              f"{bound_trap:<15.2e} {bound_simp if not np.isnan(bound_simp) else 'N/A':<15}")

# Test with f(x) = sin(x)
integration_error_bounds(np.sin, 0, np.pi, [4, 8, 16, 32, 64])
```

## Interval Arithmetic for Rigorous Bounds

Interval arithmetic provides **guaranteed** bounds by tracking ranges:

$$[a, b] + [c, d] = [a + c, b + d]$$
$$[a, b] \times [c, d] = [\min(ac, ad, bc, bd), \max(ac, ad, bc, bd)]$$

```python
class Interval:
    """Interval arithmetic for guaranteed error bounds."""

    def __init__(self, lower, upper=None):
        if upper is None:
            upper = lower
        self.lower = float(lower)
        self.upper = float(upper)
        if self.lower > self.upper:
            self.lower, self.upper = self.upper, self.lower

    def __repr__(self):
        return f"[{self.lower:.10e}, {self.upper:.10e}]"

    def width(self):
        return self.upper - self.lower

    def midpoint(self):
        return (self.lower + self.upper) / 2

    def __add__(self, other):
        if isinstance(other, Interval):
            # Account for rounding
            lower = np.nextafter(self.lower + other.lower, -np.inf)
            upper = np.nextafter(self.upper + other.upper, np.inf)
            return Interval(lower, upper)
        else:
            return Interval(self.lower + other, self.upper + other)

    def __mul__(self, other):
        if isinstance(other, Interval):
            products = [
                self.lower * other.lower,
                self.lower * other.upper,
                self.upper * other.lower,
                self.upper * other.upper
            ]
            lower = np.nextafter(min(products), -np.inf)
            upper = np.nextafter(max(products), np.inf)
            return Interval(lower, upper)
        else:
            if other >= 0:
                return Interval(self.lower * other, self.upper * other)
            else:
                return Interval(self.upper * other, self.lower * other)

    def __truediv__(self, other):
        if isinstance(other, Interval):
            if other.lower <= 0 <= other.upper:
                raise ValueError("Division by interval containing zero")
            reciprocals = [1/other.lower, 1/other.upper]
            return self * Interval(min(reciprocals), max(reciprocals))
        else:
            return self * (1 / other)

    def __pow__(self, n):
        """Integer power."""
        if n == 0:
            return Interval(1, 1)
        elif n == 1:
            return Interval(self.lower, self.upper)
        elif n % 2 == 0:  # Even power
            if self.lower >= 0:
                return Interval(self.lower**n, self.upper**n)
            elif self.upper <= 0:
                return Interval(self.upper**n, self.lower**n)
            else:  # Interval contains 0
                return Interval(0, max(self.lower**n, self.upper**n))
        else:  # Odd power
            return Interval(self.lower**n, self.upper**n)

def interval_exp(x):
    """Exponential function on intervals."""
    return Interval(np.exp(x.lower), np.exp(x.upper))

def interval_sin(x):
    """Sine function on intervals (simplified)."""
    # Proper implementation requires checking for extrema in interval
    return Interval(min(np.sin(x.lower), np.sin(x.upper)),
                   max(np.sin(x.lower), np.sin(x.upper)))

# Example: compute 0.1 + 0.2 with guaranteed bounds
a = Interval(0.1)
b = Interval(0.2)
result = a + b

print("Interval Arithmetic Example:")
print(f"0.1 + 0.2 = {result}")
print(f"Width of uncertainty: {result.width():.2e}")
print(f"Midpoint: {result.midpoint()}")
print(f"Contains 0.3? {result.lower <= 0.3 <= result.upper}")

# Example: polynomial evaluation with bounds
x = Interval(0.9, 1.1)
p = x**3 + Interval(-2) * x**2 + Interval(1)
print(f"\nPolynomial p(x) = x³ - 2x² + 1 on x ∈ [0.9, 1.1]:")
print(f"Result: {p}")
print(f"Range width: {p.width():.5f}")
```

## Adaptive Error Control

Adaptive methods adjust computation to meet error tolerance:

```python
def adaptive_simpson(f, a, b, tol=1e-6, max_depth=20):
    """
    Adaptive Simpson's rule with error control.

    Uses Richardson extrapolation estimate for error.
    """
    def simpson(f, a, b):
        h = (b - a) / 2
        c = (a + b) / 2
        return h / 3 * (f(a) + 4*f(c) + f(b))

    def adaptive_rec(f, a, b, tol, whole, fa, fm, fb, depth):
        c = (a + b) / 2
        d = (a + c) / 2
        e = (c + b) / 2

        fd = f(d)
        fe = f(e)

        left = (c - a) / 6 * (fa + 4*fd + fm)
        right = (b - c) / 6 * (fm + 4*fe + fb)

        # Error estimate using Richardson extrapolation
        error_estimate = (left + right - whole) / 15

        if depth >= max_depth:
            return left + right, error_estimate

        if abs(error_estimate) <= tol:
            return left + right + error_estimate, error_estimate
        else:
            # Subdivide
            left_val, left_err = adaptive_rec(f, a, c, tol/2, left, fa, fd, fm, depth+1)
            right_val, right_err = adaptive_rec(f, c, b, tol/2, right, fm, fe, fb, depth+1)
            return left_val + right_val, left_err + right_err

    fa = f(a)
    fb = f(b)
    fm = f((a + b) / 2)
    whole = simpson(f, a, b)

    result, error_est = adaptive_rec(f, a, b, tol, whole, fa, fm, fb, 0)
    return result, abs(error_est)

# Test
f = lambda x: np.exp(-x**2)
result, error_est = adaptive_simpson(f, 0, 3, tol=1e-10)
exact, _ = quad(f, 0, 3, epsabs=1e-14)

print(f"\nAdaptive Simpson Integration:")
print(f"Result: {result:.15f}")
print(f"Exact: {exact:.15f}")
print(f"Actual error: {abs(result - exact):.2e}")
print(f"Estimated error: {error_est:.2e}")
```

## Statistical Error Bounds

For Monte Carlo methods, use confidence intervals:

$$P\left(\left|\bar{X} - \mu\right| \leq z_{\alpha/2} \frac{\sigma}{\sqrt{n}}\right) = 1 - \alpha$$

```python
def monte_carlo_integration_with_bounds(f, a, b, n_samples=10000, confidence=0.95):
    """
    Monte Carlo integration with confidence intervals.

    Computes integral of f from a to b using random sampling.
    """
    # Random samples
    x = np.random.uniform(a, b, n_samples)
    y = f(x)

    # Estimate
    estimate = (b - a) * np.mean(y)

    # Standard error
    std_error = (b - a) * np.std(y, ddof=1) / np.sqrt(n_samples)

    # Confidence interval
    from scipy.stats import norm
    z = norm.ppf((1 + confidence) / 2)
    margin = z * std_error

    return estimate, margin, (estimate - margin, estimate + margin)

# Test
f = lambda x: np.sin(x)
estimate, margin, (lower, upper) = monte_carlo_integration_with_bounds(f, 0, np.pi, n_samples=100000)
exact = 2.0

print(f"\nMonte Carlo Integration with Confidence Bounds:")
print(f"Estimate: {estimate:.10f}")
print(f"95% Confidence Interval: [{lower:.10f}, {upper:.10f}]")
print(f"Margin of error: ±{margin:.5e}")
print(f"Exact value: {exact:.10f}")
print(f"Exact in CI? {lower <= exact <= upper}")
```

## Verified Computing

Combining interval arithmetic with adaptive refinement:

```python
def verified_newton(f, f_prime, x0, tol=1e-10, max_iter=100):
    """
    Newton's method with verified error bounds.

    Returns interval containing the true root.
    """
    x = Interval(x0 - 0.1, x0 + 0.1)  # Initial interval

    for i in range(max_iter):
        # Midpoint
        xm = x.midpoint()

        # Newton step at midpoint
        try:
            x_new_center = xm - f(xm) / f_prime(xm)

            # Bound derivative on interval
            # (Simplified: assumes we can bound f' on x)
            f_prime_min = min(abs(f_prime(x.lower)), abs(f_prime(x.upper)))
            f_max = max(abs(f(x.lower)), abs(f(x.upper)))

            # Error bound
            radius = f_max / f_prime_min

            x_new = Interval(x_new_center - radius, x_new_center + radius)

            # Check convergence
            if x_new.width() < tol:
                return x_new, i+1

            # Intersection with previous interval (if overlaps)
            x = Interval(max(x.lower, x_new.lower), min(x.upper, x_new.upper))

        except:
            return x, i+1

    return x, max_iter

# Test
f = lambda x: x**2 - 2
f_prime = lambda x: 2*x

root_interval, iterations = verified_newton(f, f_prime, 1.5)
print(f"\nVerified Newton's Method for x² - 2 = 0:")
print(f"Root interval: {root_interval}")
print(f"Width: {root_interval.width():.2e}")
print(f"Iterations: {iterations}")
print(f"Contains √2? {root_interval.lower <= np.sqrt(2) <= root_interval.upper}")
```

## Practical Error Estimation

### Richardson Extrapolation

Use multiple step sizes to estimate error:

```python
def richardson_error_estimate(compute, h, p):
    """
    Estimate error using Richardson extrapolation.

    Parameters:
    - compute: function that takes step size h
    - h: base step size
    - p: order of method
    """
    A_h = compute(h)
    A_h2 = compute(h / 2)

    # Error estimate for A(h)
    error_estimate = abs(A_h2 - A_h) / (2**p - 1)

    # Improved approximation
    A_improved = A_h2 + (A_h2 - A_h) / (2**p - 1)

    return A_improved, error_estimate

# Example: numerical derivative
f = np.exp
x = 1.0
compute = lambda h: (f(x + h) - f(x - h)) / (2 * h)

improved, error_est = richardson_error_estimate(compute, 0.1, p=2)
exact = f(x)

print(f"\nRichardson Error Estimation:")
print(f"Improved approximation: {improved:.15f}")
print(f"Error estimate: {error_est:.5e}")
print(f"Exact value: {exact:.15f}")
print(f"Actual error: {abs(improved - exact):.5e}")
```

## Summary

Error bounds provide confidence in numerical results:

1. **A priori bounds**: Based on problem parameters before computation
2. **A posteriori bounds**: Computed from results after computation
3. **Interval arithmetic**: Guaranteed rigorous bounds
4. **Adaptive methods**: Automatically achieve error tolerance
5. **Statistical bounds**: Confidence intervals for Monte Carlo
6. **Richardson extrapolation**: Practical error estimation

Key principles:
- Always estimate or bound errors when possible
- Combine multiple error estimation techniques
- Be conservative with error bounds
- Use adaptive methods when accuracy requirements vary
- Verified computing provides mathematical guarantees
