---
title: "Adaptive Integration"
description: "Comprehensive guide to adaptive integration with theoretical foundations and Python implementations"
---

# Adaptive Integration

Adaptive integration automatically adjusts the step size based on local function behavior, concentrating computational effort where needed for efficient, reliable integration of challenging functions.

## Introduction

Fixed-step integration methods waste computational resources:
- **Smooth regions**: Over-sampled, unnecessary function evaluations
- **Difficult regions**: Under-sampled, large errors

**Adaptive integration** solves this by:
1. Estimating local error
2. Refining subintervals where error exceeds tolerance
3. Accepting coarse approximations where error is small

This achieves a **specified global tolerance** with **minimal function evaluations**.

## The Core Idea

Given tolerance $\epsilon$, divide $[a,b]$ into subintervals $[x_i, x_{i+1}]$ such that:

$$\sum_{i} E_i < \epsilon$$

where $E_i$ is the error on $[x_i, x_{i+1}]$.

**Strategy**:
1. Apply quadrature rule on $[a,b]$ with step $h$
2. Apply same rule with step $h/2$
3. Estimate error from difference
4. If error too large, recursively subdivide
5. If error acceptable, accept result and move on

## Adaptive Simpson's Rule

The most common adaptive method uses Simpson's rule as the base quadrature.

### Error Estimation

Compare two Simpson approximations:

$$S(a,b) = \frac{b-a}{6}\left[f(a) + 4f\left(\frac{a+b}{2}\right) + f(b)\right]$$

$$S(a,c) + S(c,b) = \text{Simpson on two halves, } c = \frac{a+b}{2}$$

**Error estimate**:

$$E \approx \frac{|S(a,c) + S(c,b) - S(a,b)|}{15}$$

The factor 15 comes from $2^4 - 1$ (Simpson has $O(h^4)$ convergence).

### Recursion Criterion

If $E < \epsilon(b-a)/(B-A)$, accept the refined value:

$$I \approx S(a,c) + S(c,b) + E$$

Otherwise, recursively apply to $[a,c]$ and $[c,b]$ with tolerance $\epsilon/2$ each.

## Implementation

```python
import numpy as np

def simpsons_basic(f, a, b):
    """Basic Simpson's rule on [a,b]."""
    c = (a + b) / 2
    return (b - a) / 6 * (f(a) + 4*f(c) + f(b))

def adaptive_simpson(f, a, b, tol=1e-10, max_depth=50):
    """
    Adaptive Simpson's rule.

    Parameters:
    - f: function to integrate
    - a, b: integration limits
    - tol: global tolerance
    - max_depth: maximum recursion depth

    Returns:
    - Approximation to integral
    """
    def recursive_simpson(a, b, fa, fb, fc, S_ab, tol, depth):
        """Recursive helper function."""
        if depth > max_depth:
            print(f"Warning: Maximum depth {max_depth} reached")
            return S_ab

        # Midpoints of subintervals
        c = (a + b) / 2
        d = (a + c) / 2
        e = (c + b) / 2

        # Function values at new points
        fd = f(d)
        fe = f(e)

        # Simpson on two halves
        S_ac = (c - a) / 6 * (fa + 4*fd + fc)
        S_cb = (b - c) / 6 * (fc + 4*fe + fb)
        S_split = S_ac + S_cb

        # Error estimate
        error = abs(S_split - S_ab) / 15

        if error < tol:
            # Accept refined value with correction
            return S_split + error
        else:
            # Recursively subdivide
            left = recursive_simpson(a, c, fa, fc, fd, S_ac, tol/2, depth+1)
            right = recursive_simpson(c, b, fc, fb, fe, S_cb, tol/2, depth+1)
            return left + right

    # Initial values
    c = (a + b) / 2
    fa, fb, fc = f(a), f(b), f(c)
    S_ab = simpsons_basic(f, a, b)

    return recursive_simpson(a, b, fa, fb, fc, S_ab, tol, 0)

# Example: Smooth function
f1 = lambda x: np.sin(x)
result1 = adaptive_simpson(f1, 0, np.pi, tol=1e-12)
print(f"∫₀^π sin(x)dx = {result1:.15f}")
print(f"Exact: {2.0}")
print(f"Error: {abs(result1 - 2.0):.2e}\n")

# Example: Function with sharp peak
f2 = lambda x: np.exp(-100*(x-0.5)**2)
result2 = adaptive_simpson(f2, 0, 1, tol=1e-12)
print(f"∫₀¹ exp(-100(x-0.5)²)dx = {result2:.15f}")
```

## Adaptive Quadrature with Function Counting

Track function evaluations to measure efficiency:

```python
class FunctionCounter:
    """Wrapper to count function evaluations."""
    def __init__(self, f):
        self.f = f
        self.count = 0

    def __call__(self, x):
        self.count += 1
        return self.f(x)

def compare_methods(f, a, b, tol=1e-10):
    """Compare adaptive vs fixed-step integration."""
    # Adaptive Simpson
    f_adaptive = FunctionCounter(f)
    result_adaptive = adaptive_simpson(f_adaptive, a, b, tol)

    # Fixed Simpson with many points
    from scipy.integrate import simpson
    n = 1000
    x_fixed = np.linspace(a, b, n+1)
    f_fixed = FunctionCounter(f)
    y_fixed = f_fixed(x_fixed)
    result_fixed = simpson(y_fixed, x=x_fixed)

    print(f"Adaptive: {f_adaptive.count} evaluations → {result_adaptive:.12f}")
    print(f"Fixed:    {f_fixed.count} evaluations → {result_fixed:.12f}")
    print(f"Speedup:  {f_fixed.count / f_adaptive.count:.1f}×")

# Test on function with localized feature
f = lambda x: np.exp(-100*(x-0.7)**2) + 0.1*np.sin(10*x)
compare_methods(f, 0, 1)
```

Output shows adaptive method uses **10-100× fewer evaluations** for comparable accuracy!

## Adaptive Gauss-Kronrod Quadrature

Gauss-Kronrod extends Gaussian quadrature for adaptive integration.

### Gauss-Kronrod Pairs

**Idea**: Reuse function evaluations from lower-order rule.

**Gauss rule** with $n$ points integrates degree $2n-1$ exactly.

**Kronrod extension** adds $n+1$ points to integrate degree $3n+1$ (or higher) exactly.

The difference estimates error without extra evaluations at the Gauss points.

### Common Pairs

**G7-K15**: 7-point Gauss + 8 new points = 15-point Kronrod
**G15-K31**: 15-point Gauss + 16 new points = 31-point Kronrod

```python
from scipy.integrate import quad

def adaptive_gauss_kronrod(f, a, b, tol=1e-10):
    """
    Adaptive Gauss-Kronrod quadrature (via SciPy).

    Uses G7-K15 rule with automatic subdivision.
    """
    result, error = quad(f, a, b, epsabs=tol, epsrel=0)
    return result, error

# Example
f = lambda x: np.sin(1/x) if x != 0 else 0
result, error = adaptive_gauss_kronrod(f, 0.01, 1, tol=1e-12)
print(f"Result: {result:.15f} ± {error:.2e}")
```

## Handling Difficult Cases

### Oscillatory Functions

High-frequency oscillations require many subdivisions:

```python
# Highly oscillatory
f = lambda x: np.sin(50*x)

result = adaptive_simpson(f, 0, np.pi, tol=1e-10)
exact = (1 - np.cos(50*np.pi)) / 50

print(f"Oscillatory function:")
print(f"Result: {result:.10f}")
print(f"Exact:  {exact:.10f}")
print(f"Error:  {abs(result - exact):.2e}")
```

**Better approach**: Use specialized methods (Filon, Levin) for oscillatory integrals.

### Discontinuities

Break integral at known discontinuities:

```python
def integrate_with_discontinuity(f, a, b, disc_points, tol=1e-10):
    """Integrate function with known discontinuities."""
    points = sorted([a] + disc_points + [b])
    total = 0

    for i in range(len(points) - 1):
        total += adaptive_simpson(f, points[i], points[i+1], tol)

    return total

# Example: f(x) = |x - 0.5|
f = lambda x: abs(x - 0.5)
result = integrate_with_discontinuity(f, 0, 1, [0.5], tol=1e-12)
print(f"Result: {result:.15f}")
print(f"Exact:  {0.25:.15f}")  # ∫|x-0.5|dx from 0 to 1 = 1/4
```

### Endpoint Singularities

Avoid evaluating at singular points:

```python
# Singularity at x=0
f = lambda x: 1/np.sqrt(x) if x > 0 else 0

# Integrate from small epsilon instead of 0
epsilon = 1e-10
result = adaptive_simpson(f, epsilon, 1, tol=1e-10)

# Exact: ∫₀¹ x^{-1/2}dx = 2
print(f"Result: {result:.10f}")
print(f"Exact:  {2.0:.10f}")
```

## Global vs Local Error Control

**Local error**: Error on each subinterval

**Global error**: Sum of local errors

Controlling local error to $\epsilon/N$ (where $N$ = number of intervals) can be overly conservative.

**Better strategy**: Control global error estimate:

$$\sum_i E_i < \epsilon$$

```python
def adaptive_global_error(f, a, b, tol=1e-10):
    """Adaptive integration with global error control."""
    intervals = [(a, b, simpsons_basic(f, a, b))]
    global_error = float('inf')

    while global_error > tol:
        # Find interval with largest error
        errors = []
        for i, (a_i, b_i, S_i) in enumerate(intervals):
            c_i = (a_i + b_i) / 2
            S_left = simpsons_basic(f, a_i, c_i)
            S_right = simpsons_basic(f, c_i, b_i)
            error = abs(S_left + S_right - S_i) / 15
            errors.append((error, i))

        # Subdivide largest error interval
        errors.sort(reverse=True)
        max_error, idx = errors[0]

        a_i, b_i, _ = intervals[idx]
        c_i = (a_i + b_i) / 2

        intervals[idx] = (a_i, c_i, simpsons_basic(f, a_i, c_i))
        intervals.append((c_i, b_i, simpsons_basic(f, c_i, b_i)))

        # Recompute global error
        global_error = sum(e for e, _ in errors)

        if len(intervals) > 10000:
            break

    return sum(S for _, _, S in intervals)

# Test
result = adaptive_global_error(lambda x: np.exp(x), 0, 1, tol=1e-8)
print(f"Global error control: {result:.10f}")
```

## Practical Considerations

### Choosing Tolerance

**Absolute tolerance**: $|I - I_{\text{approx}}| < \epsilon$

**Relative tolerance**: $\frac{|I - I_{\text{approx}}|}{|I|} < \epsilon$

Combine both:

$$|I - I_{\text{approx}}| < \max(\epsilon_{\text{abs}}, \epsilon_{\text{rel}} \cdot |I|)$$

### Preventing Infinite Recursion

Always set `max_depth` to prevent infinite loops on:
- Non-integrable singularities
- Numerical issues
- Functions that are "too difficult"

### Vectorization

Vectorize function calls to evaluate multiple points simultaneously:

```python
def adaptive_vectorized(f, a, b, tol=1e-10):
    """Adaptive integration with vectorized function calls."""
    # Collect all needed points first
    points = [a, (a+b)/2, b]
    # Evaluate once
    values = f(np.array(points))
    # Continue with cached values...
    pass
```

## Key Takeaways

- Adaptive integration **concentrates effort where needed**
- **Error estimation** drives subdivision decisions
- Achieves **specified tolerance** with **minimal evaluations**
- **10-100× more efficient** than fixed-step methods on difficult functions
- **Simpson-based** methods are simple and effective
- **Gauss-Kronrod** pairs enable high-accuracy adaptive quadrature
- **Handle discontinuities** by breaking into subintervals
- **Set max_depth** to prevent infinite recursion
- Use **libraries** (scipy.integrate.quad) for production code

## Common Mistakes

1. **Not setting max_depth**: Infinite loops on pathological functions
2. **Too tight tolerance**: Wastes computation, hits round-off limits
3. **Ignoring function discontinuities**: Poor convergence or wrong results
4. **Using for oscillatory functions**: Better specialized methods exist
5. **Local error too conservative**: Global error control more efficient
6. **Not vectorizing**: Missing 10-100× speedup from batch evaluation
