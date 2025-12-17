---
title: "Rounding Errors"
description: "Analysis of rounding errors in floating-point computations and techniques to minimize their impact"
---

# Rounding Errors

Rounding errors are inevitable in floating-point computation and can accumulate to produce significant inaccuracies if not properly managed.

## Types of Errors

### Absolute Error

The absolute error is the difference between the true value and the computed value:

$$E_{abs} = |x - \tilde{x}|$$

where $x$ is the true value and $\tilde{x}$ is the approximation.

### Relative Error

The relative error normalizes by the magnitude of the true value:

$$E_{rel} = \frac{|x - \tilde{x}|}{|x|}, \quad x \neq 0$$

Relative error is often more meaningful than absolute error because it provides scale-independent measurement.

### Ulp (Unit in the Last Place)

The ulp of a floating-point number $x$ is the gap between $x$ and the next representable number:

$$\text{ulp}(x) = |x| \times \epsilon_{mach}$$

An error of 0.5 ulp corresponds to **correctly rounded** arithmetic.

## Sources of Rounding Errors

### 1. Representation Error

Not all real numbers have exact floating-point representations:

```python
import numpy as np

# 0.1 cannot be exactly represented in binary
x = 0.1
print(f"0.1 represented as: {x:.20f}")
print(f"Representation error: {abs(x - 0.1):.5e}")

# Better example: sum of 0.1 ten times
result = sum([0.1] * 10)
print(f"Sum of 0.1 ten times: {result:.20f}")
print(f"Expected: 1.0")
print(f"Error: {abs(result - 1.0):.5e}")
```

### 2. Arithmetic Rounding

Each arithmetic operation may introduce rounding:

$$fl(a \circ b) = (a \circ b)(1 + \delta)$$

where $|\delta| \leq \epsilon_{mach}$ and $\circ \in \{+, -, \times, /\}$.

### 3. Cancellation Errors

Subtracting nearly equal numbers loses significant digits:

$$x = a - b$$

If $a \approx b$, then $x$ is small but the relative error is large.

**Example**: Computing $\sqrt{x+1} - \sqrt{x}$ for large $x$:

```python
def bad_formula(x):
    """Direct computation - suffers from cancellation."""
    return np.sqrt(x + 1) - np.sqrt(x)

def good_formula(x):
    """Rationalized formula - avoids cancellation."""
    return 1.0 / (np.sqrt(x + 1) + np.sqrt(x))

# Test for large x
x = 1e16
print(f"Bad formula: {bad_formula(x)}")
print(f"Good formula: {good_formula(x)}")
print(f"Exact (approx): {1.0 / (2 * np.sqrt(x))}")
```

### 4. Massive Computations

Errors accumulate over many operations:

$$\tilde{x}_n = \tilde{x}_{n-1} + \delta_n$$

Total error is approximately:

$$E_{total} \approx \sum_{i=1}^n \delta_i$$

## Error Propagation in Basic Operations

### Addition and Subtraction

For $z = x + y$:

$$E_{abs}(z) \approx E_{abs}(x) + E_{abs}(y)$$

$$E_{rel}(z) \approx \frac{|x|E_{rel}(x) + |y|E_{rel}(y)}{|x + y|}$$

**Cancellation**: When $x \approx -y$, the denominator is small and relative error explodes.

### Multiplication

For $z = x \times y$:

$$E_{rel}(z) \approx E_{rel}(x) + E_{rel}(y)$$

Relative errors add in multiplication (to first order).

### Division

For $z = x / y$:

$$E_{rel}(z) \approx E_{rel}(x) + E_{rel}(y)$$

Division has similar error behavior to multiplication.

## Catastrophic Cancellation

### The Quadratic Formula

The standard quadratic formula:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

suffers from cancellation when $b^2 \gg 4ac$.

**Solution**: Use alternative formulas:

$$x_1 = \frac{-b - \text{sign}(b)\sqrt{b^2 - 4ac}}{2a}$$

$$x_2 = \frac{c}{ax_1}$$

```python
def quadratic_bad(a, b, c):
    """Naive quadratic formula - may suffer cancellation."""
    discriminant = b**2 - 4*a*c
    sqrt_disc = np.sqrt(discriminant)

    x1 = (-b + sqrt_disc) / (2*a)
    x2 = (-b - sqrt_disc) / (2*a)
    return x1, x2

def quadratic_good(a, b, c):
    """Stable quadratic formula."""
    discriminant = b**2 - 4*a*c
    sqrt_disc = np.sqrt(discriminant)

    # Compute one root with good accuracy
    if b >= 0:
        x1 = (-b - sqrt_disc) / (2*a)
    else:
        x1 = (-b + sqrt_disc) / (2*a)

    # Use Vieta's formula for the other root
    x2 = c / (a * x1)

    return sorted([x1, x2])

# Test case: b^2 >> 4ac
a, b, c = 1.0, 1e8, 1.0

x1_bad, x2_bad = quadratic_bad(a, b, c)
x1_good, x2_good = quadratic_good(a, b, c)

print(f"Bad method: x1 = {x1_bad:.10f}, x2 = {x2_bad:.10f}")
print(f"Good method: x1 = {x1_good:.10f}, x2 = {x2_good:.10f}")
print(f"Verification (bad): a*x1^2 + b*x1 + c = {a*x1_bad**2 + b*x1_bad + c:.5e}")
print(f"Verification (good): a*x2^2 + b*x2 + c = {a*x2_good**2 + b*x2_good + c:.5e}")
```

### Computing Standard Deviation

One-pass formula:

$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^n x_i^2 - \left(\frac{1}{n}\sum_{i=1}^n x_i\right)^2}$$

suffers from cancellation when variance is small.

**Better**: Two-pass formula:

$$\sigma = \sqrt{\frac{1}{n}\sum_{i=1}^n (x_i - \bar{x})^2}$$

**Best**: Welford's online algorithm:

```python
def variance_onepass_bad(data):
    """One-pass variance - numerically unstable."""
    n = len(data)
    sum_x = np.sum(data)
    sum_x2 = np.sum(data**2)
    return (sum_x2 / n) - (sum_x / n)**2

def variance_twopass(data):
    """Two-pass variance - stable."""
    n = len(data)
    mean = np.mean(data)
    return np.sum((data - mean)**2) / n

def variance_welford(data):
    """Welford's online algorithm - stable and single-pass."""
    n = 0
    mean = 0.0
    M2 = 0.0

    for x in data:
        n += 1
        delta = x - mean
        mean += delta / n
        delta2 = x - mean
        M2 += delta * delta2

    return M2 / n if n > 0 else 0.0

# Test with data that has small variance
large_mean = 1e9
small_std = 1.0
data = np.random.normal(large_mean, small_std, 1000)

var_bad = variance_onepass_bad(data)
var_twopass = variance_twopass(data)
var_welford = variance_welford(data)
var_numpy = np.var(data)

print(f"One-pass (bad): {var_bad:.10f}")
print(f"Two-pass: {var_twopass:.10f}")
print(f"Welford: {var_welford:.10f}")
print(f"NumPy: {var_numpy:.10f}")
print(f"Expected: ~{small_std**2:.10f}")
```

## Accumulation of Rounding Errors

### Summation

Direct summation accumulates errors:

```python
def sum_forward(data):
    """Forward summation."""
    s = 0.0
    for x in data:
        s += x
    return s

def sum_backward(data):
    """Backward summation."""
    s = 0.0
    for x in reversed(data):
        s += x
    return s

def sum_sorted(data):
    """Sorted summation - add small numbers first."""
    return sum(sorted(data, key=abs))

# Kahan summation algorithm
def sum_kahan(data):
    """Compensated summation for improved accuracy."""
    s = 0.0
    c = 0.0  # Running compensation

    for x in data:
        y = x - c
        t = s + y
        c = (t - s) - y
        s = t

    return s

# Test with challenging data
data = [1.0] + [1e-10] * 10000000

print(f"Forward sum: {sum_forward(data):.15f}")
print(f"Backward sum: {sum_backward(data):.15f}")
print(f"Sorted sum: {sum_sorted(data):.15f}")
print(f"Kahan sum: {sum_kahan(data):.15f}")
print(f"Exact: {1.0 + 10000000 * 1e-10:.15f}")
```

### Kahan Summation Algorithm

The Kahan (or compensated) summation maintains a separate compensation term:

$$y_i = x_i - c_{i-1}$$
$$t_i = s_{i-1} + y_i$$
$$c_i = (t_i - s_{i-1}) - y_i$$
$$s_i = t_i$$

This algorithm reduces error from $O(n\epsilon)$ to $O(\epsilon^2)$.

### Pairwise Summation

Recursively sum pairs of values:

```python
def sum_pairwise(data):
    """Pairwise summation - O(log n) error growth."""
    n = len(data)

    if n == 0:
        return 0.0
    elif n == 1:
        return data[0]
    elif n == 2:
        return data[0] + data[1]
    else:
        mid = n // 2
        return sum_pairwise(data[:mid]) + sum_pairwise(data[mid:])

# Test
data = [1e-10] * 10000000 + [1.0]
print(f"Pairwise sum: {sum_pairwise(data):.15f}")
print(f"NumPy sum (uses pairwise): {np.sum(data):.15f}")
```

Error grows as $O(\log n \epsilon)$ instead of $O(n\epsilon)$.

## Error Analysis Example: Computing $e^x$

Taylor series expansion:

$$e^x = \sum_{n=0}^\infty \frac{x^n}{n!}$$

```python
def exp_taylor_naive(x, terms=100):
    """Naive Taylor series for e^x."""
    result = 0.0
    power = 1.0
    factorial = 1.0

    for n in range(terms):
        result += power / factorial
        power *= x
        factorial *= (n + 1)

    return result

def exp_taylor_stable(x, terms=100):
    """Stable Taylor series using Horner's method."""
    # For negative x, use e^x = 1/e^(-x)
    if x < 0:
        return 1.0 / exp_taylor_stable(-x, terms)

    # Reduce range using e^x = (e^(x/2))^2
    if x > 1:
        half = exp_taylor_stable(x / 2, terms)
        return half * half

    # Horner's method for range-reduced x
    result = 1.0
    for n in range(terms - 1, 0, -1):
        result = 1.0 + x * result / n

    return result

# Compare methods
test_values = [-10, -1, 0.5, 1, 5, 10]
print(f"{'x':<6} {'Naive':<20} {'Stable':<20} {'NumPy':<20} {'Error (Naive)':<15} {'Error (Stable)'}")
print("-" * 100)

for x in test_values:
    naive = exp_taylor_naive(x, 50)
    stable = exp_taylor_stable(x, 50)
    exact = np.exp(x)

    err_naive = abs(naive - exact) / exact
    err_stable = abs(stable - exact) / exact

    print(f"{x:<6} {naive:<20.10f} {stable:<20.10f} {exact:<20.10f} {err_naive:<15.5e} {err_stable:<15.5e}")
```

## Techniques to Minimize Rounding Errors

### 1. Range Reduction

Reduce arguments to smaller ranges where algorithms are more stable.

Example: For $\sin(x)$, use periodicity and symmetry:
- $\sin(x + 2\pi) = \sin(x)$
- $\sin(-x) = -\sin(x)$
- Reduce $x$ to $[0, \pi/4]$

### 2. Reformulation

Rewrite expressions to avoid cancellation:

- Instead of $\sqrt{x+1} - \sqrt{x}$, use $\frac{1}{\sqrt{x+1} + \sqrt{x}}$
- Instead of $(1 - \cos x)$, use $2\sin^2(x/2)$
- Instead of $e^x - 1$ for small $x$, use `expm1(x)` function

### 3. Compensated Arithmetic

Maintain error correction terms (like Kahan summation).

### 4. Extended Precision

Use higher precision for intermediate calculations:

```python
from decimal import Decimal, getcontext

# Set precision
getcontext().prec = 50

# Example: sum with extended precision
def sum_extended_precision(data):
    """Sum using extended precision intermediate values."""
    s = Decimal(0)
    for x in data:
        s += Decimal(str(x))
    return float(s)

data = [0.1] * 10
print(f"Standard sum: {sum(data):.20f}")
print(f"Extended precision sum: {sum_extended_precision(data):.20f}")
```

### 5. Iterative Refinement

Compute residual and correct:

```python
def iterative_refinement_example():
    """Demonstrate iterative refinement concept."""
    # Suppose we're solving Ax = b
    A = np.array([[1.0, 0.5], [0.5, 1.0]])
    b = np.array([1.0, 1.0])

    # Initial solution (possibly inaccurate)
    x = np.linalg.solve(A, b)

    # Compute residual in extended precision
    residual = b - A @ x

    # Solve for correction
    correction = np.linalg.solve(A, residual)

    # Improved solution
    x_improved = x + correction

    print(f"Initial solution: {x}")
    print(f"Residual: {residual}")
    print(f"Improved solution: {x_improved}")

iterative_refinement_example()
```

## Detecting Rounding Error Problems

### Warning Signs

1. **Loss of Significance**: Results have fewer correct digits than expected
2. **Non-reproducibility**: Different execution orders give different results
3. **Sensitivity**: Small input changes cause large output changes
4. **Unrealistic Results**: Probabilities > 1, negative variances, etc.

### Diagnostic Tools

```python
def diagnose_computation(f, x, h=1e-8):
    """Diagnose potential rounding error issues."""
    # Compute at x and x + h
    f_x = f(x)
    f_xh = f(x + h)

    # Relative change
    rel_change = abs(f_xh - f_x) / abs(f_x) if f_x != 0 else float('inf')

    print(f"f({x}) = {f_x}")
    print(f"f({x + h}) = {f_xh}")
    print(f"Absolute change: {abs(f_xh - f_x):.5e}")
    print(f"Relative change: {rel_change:.5e}")

    # Check for loss of significance
    if rel_change > 1e-6 and abs(h/x) < 1e-10:
        print("WARNING: High sensitivity - possible numerical instability")

# Example
diagnose_computation(lambda x: (np.sqrt(x+1) - np.sqrt(x)), 1e10)
```

## Summary

Rounding errors are fundamental to floating-point computation:

1. **Sources**: Representation, arithmetic, cancellation, accumulation
2. **Types**: Absolute, relative, ulp-based measurements
3. **Mitigation**: Range reduction, reformulation, compensated arithmetic, extended precision
4. **Key principle**: Design algorithms to minimize error growth

Understanding rounding errors is essential for:
- Writing robust numerical code
- Debugging unexpected results
- Choosing appropriate algorithms
- Validating computational results
