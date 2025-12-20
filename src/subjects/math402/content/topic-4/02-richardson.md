---
title: "Richardson Extrapolation"
description: "Comprehensive guide to richardson extrapolation with theoretical foundations and Python implementations"
---

# Richardson Extrapolation

Richardson extrapolation is a powerful technique for accelerating the convergence of numerical approximations by systematically eliminating lower-order error terms through strategic combinations of results at different step sizes.

## Introduction

Many numerical methods produce approximations with errors expressible as a power series in the step size $h$:

$$N(h) = L + a_1h + a_2h^2 + a_3h^3 + \cdots$$

where $N(h)$ is the numerical approximation, $L$ is the true value, and $a_i$ are unknown constants.

Richardson extrapolation exploits this structure by **combining results at different step sizes** to eliminate leading error terms, dramatically improving accuracy without needing smaller step sizes.

## The Basic Idea

Suppose we have two approximations:
- $N(h)$ with error $O(h)$
- $N(h/2)$ with error $O(h/2)$

The exact expansion:

$$N(h) = L + a_1h + a_2h^2 + \cdots$$
$$N(h/2) = L + a_1(h/2) + a_2(h^2/4) + \cdots$$

Multiply the second by 2 and subtract the first:

$$2N(h/2) - N(h) = L + O(h^2)$$

The $O(h)$ term **cancels**, leaving only $O(h^2)$ error!

This simple combination creates a **second-order accurate** method from two first-order ones.

## General Richardson Formula

For methods with error $O(h^p)$, the Richardson extrapolation is:

$$N_{\text{improved}} = \frac{r^p N(h/r) - N(h)}{r^p - 1}$$

where $r$ is the reduction factor (typically $r=2$).

**For $r=2$ and first-order method** ($p=1$):

$$N_1(h) = \frac{2N(h/2) - N(h)}{2 - 1} = 2N(h/2) - N(h)$$

**For $r=2$ and second-order method** ($p=2$):

$$N_2(h) = \frac{4N(h/2) - N(h)}{4 - 1} = \frac{4N(h/2) - N(h)}{3}$$

## Romberg Integration

Richardson extrapolation applied systematically to the trapezoidal rule creates **Romberg integration**, one of the most efficient integration methods.

The trapezoidal rule has error expansion:

$$T(h) = I + c_2h^2 + c_4h^4 + c_6h^6 + \cdots$$

Note: Only even powers appear! This allows repeated extrapolation.

### Romberg Table

Organize extrapolations in a triangular table:

$$\begin{array}{ccccc}
T(h) \\
T(h/2) & T_1(h) \\
T(h/4) & T_1(h/2) & T_2(h) \\
T(h/8) & T_1(h/4) & T_2(h/2) & T_3(h) \\
\vdots & \vdots & \vdots & \vdots & \ddots
\end{array}$$

Each column increases accuracy by two orders:
- Column 0: $O(h^2)$ (trapezoidal)
- Column 1: $O(h^4)$ (Simpson's rule)
- Column 2: $O(h^6)$
- Column k: $O(h^{2k+2})$

### Extrapolation Formula

Moving right in the table (increasing $k$):

$$T_k(h) = \frac{4^k T_{k-1}(h/2) - T_{k-1}(h)}{4^k - 1}$$

This is Richardson extrapolation with $r=2$ and $p=2k$.

## Implementation

```python
import numpy as np

def richardson_extrapolation(f, x, h, derivative_order=1, max_level=4):
    """
    Richardson extrapolation for numerical differentiation.

    Parameters:
    - f: function to differentiate
    - x: point at which to compute derivative
    - h: initial step size
    - derivative_order: 1 for first derivative, 2 for second
    - max_level: number of extrapolation levels

    Returns:
    - Extrapolation table (each row is more accurate)
    """
    # Initialize table
    R = np.zeros((max_level, max_level))

    # First column: basic finite differences at different h values
    for i in range(max_level):
        h_i = h / (2**i)
        if derivative_order == 1:
            # Central difference for first derivative
            R[i, 0] = (f(x + h_i) - f(x - h_i)) / (2 * h_i)
        elif derivative_order == 2:
            # Central difference for second derivative
            R[i, 0] = (f(x + h_i) - 2*f(x) + f(x - h_i)) / h_i**2

    # Richardson extrapolation
    for j in range(1, max_level):
        for i in range(j, max_level):
            # p = 2 for central difference (even powers)
            R[i, j] = (4**j * R[i, j-1] - R[i-1, j-1]) / (4**j - 1)

    return R

# Example: f(x) = sin(x), f'(π/4) = cos(π/4) = √2/2
f = lambda x: np.sin(x)
x = np.pi / 4
h = 0.1
exact = np.cos(x)

print("Richardson Extrapolation for f'(π/4) where f(x) = sin(x)")
print(f"Exact value: {exact:.15f}\n")

R = richardson_extrapolation(f, x, h, derivative_order=1, max_level=5)

print(f"{'Level':<8} {'h':<12} {'Approximation':<20} {'Error':<15}")
print("="*60)

for i in range(5):
    h_i = h / (2**i)
    approx = R[i, i]  # Diagonal has best estimate at each level
    error = abs(approx - exact)
    print(f"{i:<8} {h_i:<12.6f} {approx:<20.15f} {error:<15.2e}")
```

## Application to Numerical Differentiation

Central difference has error $O(h^2)$:

$$f'(x) = \frac{f(x+h) - f(x-h)}{2h} + O(h^2)$$

One Richardson extrapolation yields $O(h^4)$:

$$f'_{\text{improved}} = \frac{4D(h/2) - D(h)}{3}$$

where $D(h) = \frac{f(x+h) - f(x-h)}{2h}$.

### Worked Example

**Problem**: Approximate $f'(1)$ for $f(x) = e^x$ using Richardson extrapolation.

**Solution**:

Exact value: $f'(1) = e^1 = 2.71828182845905$

```python
f = lambda x: np.exp(x)
x = 1.0
exact = np.exp(1)

# Basic central differences
h1 = 0.1
h2 = 0.05

D_h1 = (f(x + h1) - f(x - h1)) / (2 * h1)
D_h2 = (f(x + h2) - f(x - h2)) / (2 * h2)

print(f"D(h=0.1):  {D_h1:.10f}  Error: {abs(D_h1 - exact):.2e}")
print(f"D(h=0.05): {D_h2:.10f}  Error: {abs(D_h2 - exact):.2e}")

# Richardson extrapolation
D_rich = (4 * D_h2 - D_h1) / 3

print(f"\nRichardson: {D_rich:.10f}  Error: {abs(D_rich - exact):.2e}")
print(f"Exact:      {exact:.10f}")
```

Output shows error reduction from $10^{-4}$ to $10^{-8}$!

## Romberg Integration Implementation

```python
def romberg_integration(f, a, b, max_level=6):
    """
    Romberg integration using Richardson extrapolation.

    Parameters:
    - f: function to integrate
    - a, b: integration limits
    - max_level: number of refinement levels

    Returns:
    - Romberg table R where R[i,j] has error O(h^(2j+2))
    """
    R = np.zeros((max_level, max_level))

    # First column: Trapezoidal rule with successive refinements
    h = b - a
    R[0, 0] = h * (f(a) + f(b)) / 2

    for i in range(1, max_level):
        h /= 2
        # Add new interior points
        sum_new = sum(f(a + k*h) for k in range(1, 2**i, 2))
        R[i, 0] = R[i-1, 0] / 2 + h * sum_new

    # Richardson extrapolation
    for j in range(1, max_level):
        for i in range(j, max_level):
            R[i, j] = (4**j * R[i, j-1] - R[i-1, j-1]) / (4**j - 1)

    return R

# Example: ∫₀^π sin(x)dx = 2
f = lambda x: np.sin(x)
a, b = 0, np.pi
exact = 2.0

print("\nRomberg Integration of sin(x) from 0 to π")
print(f"Exact value: {exact}\n")

R = romberg_integration(f, a, b, max_level=6)

print(f"{'Level':<8} {'Col 0 (Trap)':<18} {'Col 1 (Simpson)':<18} {'Best Estimate':<18}")
print("="*70)

for i in range(6):
    best = R[i, i]
    print(f"{i:<8} {R[i,0]:<18.12f} ", end="")
    if i >= 1:
        print(f"{R[i,1]:<18.12f} ", end="")
    else:
        print(f"{'N/A':<18} ", end="")
    print(f"{best:<18.15f}")

print(f"\nFinal estimate: {R[5,5]:.15f}")
print(f"Error: {abs(R[5,5] - exact):.2e}")
```

## Convergence Analysis

Richardson extrapolation with $k$ levels achieves error:

$$E_k = O(h^{2k+2})$$

**Efficiency comparison** for integration to $10^{-10}$ accuracy:

| Method | Step Size Needed | Function Evaluations |
|--------|------------------|---------------------|
| Trapezoidal | $h \sim 10^{-5}$ | ~200,000 |
| Simpson's | $h \sim 10^{-3}$ | ~2,000 |
| Romberg (6 levels) | $h = 1$ initially | ~64 |

Romberg achieves **thousand-fold speedup** over basic methods!

## Stopping Criteria

In practice, continue extrapolation until changes become negligible:

```python
def romberg_adaptive(f, a, b, tol=1e-10, max_level=10):
    """Romberg integration with adaptive stopping."""
    R = np.zeros((max_level, max_level))
    h = b - a
    R[0, 0] = h * (f(a) + f(b)) / 2

    for i in range(1, max_level):
        h /= 2
        sum_new = sum(f(a + k*h) for k in range(1, 2**i, 2))
        R[i, 0] = R[i-1, 0] / 2 + h * sum_new

        for j in range(1, i+1):
            R[i, j] = (4**j * R[i, j-1] - R[i-1, j-1]) / (4**j - 1)

        # Check convergence
        if i > 0 and abs(R[i, i] - R[i-1, i-1]) < tol:
            print(f"Converged after {i+1} levels")
            return R[i, i]

    print(f"Warning: Did not converge in {max_level} levels")
    return R[max_level-1, max_level-1]

# Example
result = romberg_adaptive(lambda x: np.exp(-x**2), 0, 1, tol=1e-12)
print(f"Result: {result:.15f}")
```

## Limitations

Richardson extrapolation fails when:

1. **Error expansion doesn't exist**: Discontinuous derivatives
2. **Odd powers present**: Cannot extrapolate effectively
3. **Round-off dominates**: Very small $h$ causes numerical instability
4. **Non-smooth functions**: Singularities or kinks

**Example of failure**:

```python
# f(x) = |x| has no Taylor expansion at x=0
f = lambda x: abs(x)
try:
    R = richardson_extrapolation(f, 0, 0.1, max_level=5)
    print("Extrapolation on |x|:")
    print(R[4, 4])  # Nonsense result!
except:
    print("Richardson fails for non-smooth functions")
```

## Key Takeaways

- Richardson extrapolation **eliminates low-order error terms** by combining results
- Each level **squares the order of accuracy** (roughly)
- **Romberg integration** applies this to trapezoidal rule systematically
- Achieves high accuracy ($10^{-12}$) with **very few function evaluations**
- Requires error expansion in **even powers** for repeated extrapolation
- Fails for **non-smooth functions** or when error structure is wrong
- **Automatic stopping** based on convergence is recommended

## Common Mistakes

1. **Applying to non-smooth functions**: Check for continuity of derivatives
2. **Using odd step size ratios**: Stick to $r=2$ for simplicity
3. **Ignoring round-off**: Don't extrapolate beyond machine precision
4. **Wrong error order**: Must know whether method is $O(h)$, $O(h^2)$, etc.
5. **Not checking convergence**: Always verify extrapolation improves results
6. **Extrapolating too many times**: Diminishing returns after 5-6 levels
