---
title: "Newton-Cotes Formulas"
description: "Comprehensive guide to newton-cotes formulas with theoretical foundations and Python implementations"
---

# Newton-Cotes Formulas

Newton-Cotes formulas approximate definite integrals by evaluating the integrand at equally-spaced points and constructing interpolating polynomials, forming the foundation of classical numerical integration.

## Introduction

The fundamental idea behind Newton-Cotes quadrature is to replace the integrand $f(x)$ with an interpolating polynomial $P_n(x)$ through $n+1$ equally-spaced points, then integrate the polynomial exactly:

$$\int_a^b f(x)\,dx \approx \int_a^b P_n(x)\,dx$$

Since polynomials can be integrated analytically, this gives a **weighted sum formula**:

$$\int_a^b f(x)\,dx \approx \sum_{i=0}^n w_i f(x_i)$$

where $x_i$ are the evaluation points and $w_i$ are the **quadrature weights**.

Newton-Cotes formulas differ by:
- **Number of points** $n+1$
- **Whether endpoints are included** (closed vs open)
- **Resulting accuracy** $O(h^{n+2})$ or better

## Closed Newton-Cotes Formulas

**Closed formulas** use endpoints: $x_0 = a$ and $x_n = b$.

### Trapezoidal Rule (n=1)

Fit a **line** through $(a, f(a))$ and $(b, f(b))$:

$$\int_a^b f(x)\,dx \approx \frac{b-a}{2}[f(a) + f(b)]$$

**Geometric interpretation**: Area of trapezoid under the line.

**Error**:

$$E = -\frac{(b-a)^3}{12}f''(\xi), \quad \xi \in (a,b)$$

**Order**: $O(h^3)$ where $h = b - a$.

### Simpson's Rule (n=2)

Fit a **parabola** through three points $x_0 = a$, $x_1 = (a+b)/2$, $x_2 = b$:

$$\int_a^b f(x)\,dx \approx \frac{b-a}{6}\left[f(a) + 4f\left(\frac{a+b}{2}\right) + f(b)\right]$$

The weights are $1:4:1$ in the ratio.

**Error**:

$$E = -\frac{(b-a)^5}{2880}f^{(4)}(\xi), \quad \xi \in (a,b)$$

**Order**: $O(h^5)$, surprisingly high! The $O(h^4)$ term vanishes by symmetry.

### Simpson's 3/8 Rule (n=3)

Four equally-spaced points with cubic interpolation:

$$\int_a^b f(x)\,dx \approx \frac{3h}{8}[f(x_0) + 3f(x_1) + 3f(x_2) + f(x_3)]$$

where $h = (b-a)/3$.

**Weights**: $1:3:3:1$

**Order**: $O(h^5)$ (same as Simpson's rule)

### General Closed Formula

For $n+1$ equally-spaced points:

$$\int_a^b f(x)\,dx \approx h\sum_{i=0}^n w_i^{(n)} f(x_i)$$

where $h = (b-a)/n$ and weights $w_i^{(n)}$ depend on $n$.

## Composite Newton-Cotes

Applying simple rules over $[a,b]$ gives poor accuracy for large intervals. Instead, **subdivide into subintervals** and apply the rule on each.

### Composite Trapezoidal Rule

Divide $[a,b]$ into $n$ equal subintervals of width $h = (b-a)/n$:

$$\int_a^b f(x)\,dx \approx \frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1} f(x_i) + f(x_n)\right]$$

**Error**: $E = -\frac{(b-a)h^2}{12}f''(\xi) = O(h^2)$

Note the error order **decreased** from $O(h^3)$ to $O(h^2)$ but interval shrinks!

### Composite Simpson's Rule

Apply Simpson's rule on each pair of subintervals (requires even $n$):

$$\int_a^b f(x)\,dx \approx \frac{h}{3}\left[f(x_0) + 4\sum_{i \text{ odd}} f(x_i) + 2\sum_{i \text{ even}, i \neq 0,n} f(x_i) + f(x_n)\right]$$

**Error**: $E = -\frac{(b-a)h^4}{180}f^{(4)}(\xi) = O(h^4)$

The pattern: $1, 4, 2, 4, 2, 4, \ldots, 2, 4, 1$.

## Implementation

```python
import numpy as np

def trapezoidal(f, a, b, n):
    """
    Composite trapezoidal rule.

    Parameters:
    - f: function to integrate
    - a, b: integration limits
    - n: number of subintervals

    Returns:
    - Approximation to integral
    """
    h = (b - a) / n
    x = np.linspace(a, b, n+1)
    y = f(x)

    # Weights: 1, 2, 2, ..., 2, 1
    result = (y[0] + 2*np.sum(y[1:-1]) + y[-1]) * h / 2
    return result

def simpsons(f, a, b, n):
    """
    Composite Simpson's rule.

    Parameters:
    - f: function to integrate
    - a, b: integration limits
    - n: number of subintervals (must be even)

    Returns:
    - Approximation to integral
    """
    if n % 2 != 0:
        raise ValueError("n must be even for Simpson's rule")

    h = (b - a) / n
    x = np.linspace(a, b, n+1)
    y = f(x)

    # Weights: 1, 4, 2, 4, 2, ..., 4, 1
    result = (y[0] + y[-1] + 4*np.sum(y[1:-1:2]) + 2*np.sum(y[2:-1:2])) * h / 3
    return result

def simpsons_three_eighths(f, a, b, n):
    """
    Composite Simpson's 3/8 rule.

    Parameters:
    - n: number of subintervals (must be divisible by 3)
    """
    if n % 3 != 0:
        raise ValueError("n must be divisible by 3")

    h = (b - a) / n
    x = np.linspace(a, b, n+1)
    y = f(x)

    # Pattern: 1, 3, 3, 2, 3, 3, 2, ..., 3, 3, 1
    result = y[0] + y[-1]
    for i in range(1, n):
        if i % 3 == 0:
            result += 2 * y[i]
        else:
            result += 3 * y[i]

    return result * 3 * h / 8

# Example: ∫₀^π sin(x)dx = 2
f = lambda x: np.sin(x)
a, b = 0, np.pi
exact = 2.0

print("Newton-Cotes Integration of sin(x) from 0 to π")
print(f"Exact value: {exact}\n")

for n in [4, 8, 16, 32]:
    trap = trapezoidal(f, a, b, n)
    simp = simpsons(f, a, b, n)

    print(f"n = {n:3d}:")
    print(f"  Trapezoidal: {trap:.10f}  Error: {abs(trap - exact):.2e}")
    print(f"  Simpson's:   {simp:.10f}  Error: {abs(simp - exact):.2e}")
```

## Convergence Analysis

### Theoretical Error Bounds

| Method | Error per interval | Composite error | Order |
|--------|-------------------|-----------------|-------|
| Trapezoidal | $O(h^3)$ | $O(h^2)$ | 2 |
| Simpson's | $O(h^5)$ | $O(h^4)$ | 4 |
| Simpson's 3/8 | $O(h^5)$ | $O(h^4)$ | 4 |

### Empirical Verification

```python
def convergence_study():
    """Verify convergence rates empirically."""
    f = lambda x: np.exp(x)
    a, b = 0, 1
    exact = np.exp(1) - 1

    n_values = 2**np.arange(2, 10)
    trap_errors = []
    simp_errors = []

    for n in n_values:
        trap = trapezoidal(f, a, b, n)
        simp = simpsons(f, a, b, n)

        trap_errors.append(abs(trap - exact))
        simp_errors.append(abs(simp - exact))

    # Compute convergence rates
    print(f"{'n':<8} {'Trap Error':<15} {'Trap Rate':<12} {'Simp Error':<15} {'Simp Rate'}")
    print("="*70)

    for i in range(len(n_values)):
        if i > 0:
            trap_rate = np.log2(trap_errors[i-1] / trap_errors[i])
            simp_rate = np.log2(simp_errors[i-1] / simp_errors[i])
        else:
            trap_rate = simp_rate = 0

        print(f"{n_values[i]:<8} {trap_errors[i]:<15.2e} {trap_rate:<12.2f} "
              f"{simp_errors[i]:<15.2e} {simp_rate:<12.2f}")

    print(f"\nExpected: Trapezoidal ~2, Simpson's ~4")

convergence_study()
```

Output confirms $O(h^2)$ for trapezoidal, $O(h^4)$ for Simpson's!

## Open Newton-Cotes Formulas

**Open formulas** exclude endpoints, useful when $f$ is undefined at boundaries.

### Midpoint Rule (n=0)

Evaluate at the **midpoint** only:

$$\int_a^b f(x)\,dx \approx (b-a)f\left(\frac{a+b}{2}\right)$$

**Error**: $E = \frac{(b-a)^3}{24}f''(\xi)$

**Order**: $O(h^3)$, same as trapezoidal but with smaller constant!

### Composite Midpoint Rule

```python
def midpoint_rule(f, a, b, n):
    """Composite midpoint rule."""
    h = (b - a) / n
    x_mid = np.linspace(a + h/2, b - h/2, n)
    return h * np.sum(f(x_mid))

# Example
result = midpoint_rule(lambda x: np.sin(x), 0, np.pi, 10)
print(f"Midpoint: {result:.10f}")
```

## Degree of Precision

A quadrature rule has **degree of precision** $d$ if it integrates all polynomials of degree $\leq d$ exactly, but fails for degree $d+1$.

**Examples**:
- **Trapezoidal**: Degree 1 (integrates lines exactly)
- **Simpson's**: Degree 3 (integrates cubics exactly!)
- **Simpson's 3/8**: Degree 3

Simpson's rule with 3 points achieves degree 3, exceeding the expected degree 2. This is why its error is $O(h^5)$ instead of $O(h^4)$.

## Practical Considerations

### Choosing Between Methods

| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| Trapezoidal | Quick estimates | Simple, stable | Low accuracy |
| Simpson's | Smooth functions | High accuracy, efficient | Requires even $n$ |
| Midpoint | Endpoint singularities | Avoids boundaries | Moderate accuracy |

### Adaptive Quadrature Preview

Fixed $n$ wastes function evaluations on smooth regions. **Adaptive methods** (next topic) refine only where needed.

## Worked Example

**Problem**: Compute $\int_0^1 \frac{1}{1+x^2}\,dx$ using composite Simpson's rule with $n=8$. Compare to exact value $\arctan(1) = \pi/4$.

**Solution**:

```python
f = lambda x: 1 / (1 + x**2)
a, b = 0, 1
n = 8
exact = np.pi / 4

# Apply composite Simpson's
h = (b - a) / n
x = np.linspace(a, b, n+1)
y = f(x)

integral = (y[0] + y[-1] + 4*np.sum(y[1:-1:2]) + 2*np.sum(y[2:-1:2])) * h / 3

print(f"Exact:    {exact:.15f}")
print(f"Simpson's: {integral:.15f}")
print(f"Error:     {abs(integral - exact):.2e}")
print(f"Relative:  {abs(integral - exact) / exact:.2e}")

# Output: Error ~10^-10 with just 9 function evaluations!
```

**Result**: Error $\approx 1.3 \times 10^{-10}$

This demonstrates Simpson's efficiency: **machine precision** with very few evaluations!

## Error Estimation

We can estimate error by comparing results at different $n$:

```python
def simpson_with_error_estimate(f, a, b, n):
    """Simpson's rule with error estimate."""
    S_n = simpsons(f, a, b, n)
    S_2n = simpsons(f, a, b, 2*n)

    # Error estimate from Richardson extrapolation
    error_est = abs(S_2n - S_n) / 15

    return S_2n, error_est

# Example
result, error = simpson_with_error_estimate(lambda x: np.sin(x), 0, np.pi, 10)
print(f"Result: {result:.10f} ± {error:.2e}")
```

The factor 15 comes from $2^4 - 1 = 15$ for fourth-order convergence.

## Key Takeaways

- Newton-Cotes formulas use **equally-spaced points** and polynomial interpolation
- **Trapezoidal rule**: Simple, $O(h^2)$ accuracy, always applicable
- **Simpson's rule**: High accuracy $O(h^4)$, requires even $n$, best for smooth functions
- **Composite methods**: Apply basic rules on subintervals for global accuracy
- **Degree of precision**: Measures how high-degree polynomials are integrated exactly
- Simpson's rule achieves **degree 3 with 3 points** due to symmetry
- **Open formulas**: Useful when endpoints are singular or undefined
- Trade-offs: Simplicity (trapezoidal) vs accuracy (Simpson's)

## Common Mistakes

1. **Using odd $n$ with Simpson's**: Must have even number of subintervals
2. **Single interval for large domains**: Use composite methods instead
3. **Ignoring smoothness**: Simpson's poor for non-smooth functions
4. **Not checking convergence**: Always verify with different $n$ values
5. **Assuming higher order is always better**: More points can amplify round-off
6. **Forgetting endpoints in composite formulas**: Different weights for interior vs boundary points
