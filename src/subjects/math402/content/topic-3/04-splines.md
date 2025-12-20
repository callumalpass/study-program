---
title: "Spline Interpolation"
description: "Piecewise polynomial interpolation with smoothness constraints for practical curve fitting"
---

# Spline Interpolation

Spline interpolation constructs smooth piecewise polynomial functions that avoid the oscillatory behavior of high-degree polynomial interpolation while maintaining continuity and differentiability across the entire domain.

## Introduction

High-degree polynomial interpolation suffers from several problems:
- **Runge's phenomenon**: Wild oscillations between data points
- **Computational instability**: Small changes in data cause large changes in the polynomial
- **Poor local control**: Changing one data point affects the entire polynomial

Splines solve these problems by using **low-degree polynomials on each subinterval** connected smoothly at the data points. The name "spline" comes from flexible strips of wood used by draftsmen to draw smooth curves.

## Piecewise Polynomial Functions

Given data points $(x_0, f_0), (x_1, f_1), \ldots, (x_n, f_n)$ with $x_0 < x_1 < \cdots < x_n$, a **spline of degree $k$** is a function $S(x)$ such that:

1. On each subinterval $[x_i, x_{i+1}]$, $S(x)$ is a polynomial of degree at most $k$
2. $S(x)$ and its derivatives up to order $k-1$ are continuous on $[x_0, x_n]$
3. $S(x_i) = f_i$ for all $i$ (interpolation condition)

The points $x_0, x_1, \ldots, x_n$ are called **knots** or **breakpoints**.

## Cubic Splines

**Cubic splines** (degree $k=3$) are the most commonly used splines, providing an excellent balance between flexibility and smoothness.

### Definition

A cubic spline $S(x)$ consists of cubic polynomials $S_i(x)$ on each interval $[x_i, x_{i+1}]$:

$$S_i(x) = a_i + b_i(x - x_i) + c_i(x - x_i)^2 + d_i(x - x_i)^3$$

for $i = 0, 1, \ldots, n-1$.

### Continuity Conditions

At each interior knot $x_i$ (for $i = 1, \ldots, n-1$):

**Function continuity** ($C^0$):
$$S_{i-1}(x_i) = S_i(x_i) = f_i$$

**First derivative continuity** ($C^1$):
$$S_{i-1}'(x_i) = S_i'(x_i)$$

**Second derivative continuity** ($C^2$):
$$S_{i-1}''(x_i) = S_i''(x_i)$$

### Counting Constraints

For $n+1$ data points, we have $n$ cubic polynomials, giving $4n$ unknown coefficients.

Constraints:
- Interpolation at left endpoints: $n$ equations
- Interpolation at $x_n$: 1 equation
- $C^1$ continuity at interior knots: $n-1$ equations
- $C^2$ continuity at interior knots: $n-1$ equations

Total: $n + 1 + (n-1) + (n-1) = 4n - 2$ equations

We need **2 more conditions** to uniquely determine the spline.

## Boundary Conditions

Common choices for the two additional boundary conditions:

### Natural Spline
$$S''(x_0) = 0, \quad S''(x_n) = 0$$

The spline is linear beyond the endpoints (minimum curvature).

### Clamped Spline
$$S'(x_0) = f_0', \quad S'(x_n) = f_n'$$

Specified derivatives at endpoints (useful when derivative information is available).

### Not-a-Knot Spline
$$S'''(x_1^-) = S'''(x_1^+), \quad S'''(x_{n-1}^-) = S'''(x_{n-1}^+)$$

The first and last interior knots are not actually knots (continuous third derivative).

## Construction Algorithm

A practical approach uses the **second derivatives** $M_i = S''(x_i)$ at the knots.

### Step 1: Express $S_i(x)$ in terms of $M_i$

On $[x_i, x_{i+1}]$ with $h_i = x_{i+1} - x_i$:

$$S_i(x) = \frac{M_i}{6h_i}(x_{i+1} - x)^3 + \frac{M_{i+1}}{6h_i}(x - x_i)^3$$
$$+ \left(\frac{f_i}{h_i} - \frac{M_i h_i}{6}\right)(x_{i+1} - x) + \left(\frac{f_{i+1}}{h_i} - \frac{M_{i+1} h_i}{6}\right)(x - x_i)$$

This automatically satisfies interpolation and $C^2$ continuity.

### Step 2: Enforce $C^1$ Continuity

Requiring $S_{i-1}'(x_i) = S_i'(x_i)$ gives:

$$h_{i-1}M_{i-1} + 2(h_{i-1} + h_i)M_i + h_i M_{i+1} = 6\left(\frac{f_{i+1} - f_i}{h_i} - \frac{f_i - f_{i-1}}{h_{i-1}}\right)$$

for $i = 1, 2, \ldots, n-1$.

This is a **tridiagonal linear system** for the unknowns $M_0, M_1, \ldots, M_n$.

### Step 3: Apply Boundary Conditions

For natural spline: $M_0 = 0$ and $M_n = 0$.

For clamped spline with $S'(x_0) = f_0'$ and $S'(x_n) = f_n'$:
$$2h_0 M_0 + h_0 M_1 = 6\left(\frac{f_1 - f_0}{h_0} - f_0'\right)$$
$$h_{n-1} M_{n-1} + 2h_{n-1} M_n = 6\left(f_n' - \frac{f_n - f_{n-1}}{h_{n-1}}\right)$$

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.linalg import solve_banded

def natural_cubic_spline(x_data, f_data):
    """
    Construct natural cubic spline.

    Parameters:
    - x_data: array of n+1 knots
    - f_data: function values at knots

    Returns:
    - M: second derivatives at knots
    - h: interval widths
    """
    n = len(x_data) - 1
    h = np.diff(x_data)

    # Build tridiagonal system
    # Natural boundary conditions: M[0] = M[n] = 0
    A = np.zeros((n-1, n-1))
    b = np.zeros(n-1)

    for i in range(n-1):
        if i > 0:
            A[i, i-1] = h[i]
        A[i, i] = 2 * (h[i] + h[i+1])
        if i < n-2:
            A[i, i+1] = h[i+1]

        b[i] = 6 * ((f_data[i+2] - f_data[i+1])/h[i+1] -
                     (f_data[i+1] - f_data[i])/h[i])

    # Solve for interior M values
    M_interior = np.linalg.solve(A, b)

    # Add boundary values
    M = np.zeros(n+1)
    M[1:-1] = M_interior

    return M, h

def evaluate_spline(x, x_data, f_data, M, h):
    """
    Evaluate cubic spline at points x.

    Parameters:
    - x: evaluation points
    - x_data: knot locations
    - f_data: function values at knots
    - M: second derivatives from natural_cubic_spline
    - h: interval widths

    Returns:
    - S(x): spline values
    """
    n = len(x_data) - 1
    result = np.zeros_like(x, dtype=float)

    for k in range(len(x)):
        # Find interval containing x[k]
        i = np.searchsorted(x_data[1:], x[k])
        i = min(i, n-1)  # Handle x[k] = x_data[-1]

        # Compute spline value on interval [x_i, x_{i+1}]
        dx_left = x_data[i+1] - x[k]
        dx_right = x[k] - x_data[i]

        result[k] = (M[i] * dx_left**3 / (6*h[i]) +
                     M[i+1] * dx_right**3 / (6*h[i]) +
                     (f_data[i] - M[i]*h[i]**2/6) * dx_left / h[i] +
                     (f_data[i+1] - M[i+1]*h[i]**2/6) * dx_right / h[i])

    return result

# Example: Spline interpolation of Runge's function
x_data = np.linspace(-1, 1, 9)
f_data = 1 / (1 + 25*x_data**2)

M, h = natural_cubic_spline(x_data, f_data)

# Evaluate on fine grid
x_fine = np.linspace(-1, 1, 500)
S = evaluate_spline(x_fine, x_data, f_data, M, h)
f_true = 1 / (1 + 25*x_fine**2)

# Comparison with high-degree polynomial
from numpy.polynomial import polynomial as P
poly_coeffs = P.polyfit(x_data, f_data, len(x_data)-1)
poly_vals = P.polyval(x_fine, poly_coeffs)

plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(x_fine, f_true, 'b-', label='True function', linewidth=2)
plt.plot(x_fine, S, 'r--', label='Cubic spline', linewidth=2)
plt.plot(x_data, f_data, 'ko', markersize=6, label='Data points')
plt.title(f'Cubic Spline (max error: {np.max(np.abs(S - f_true)):.3e})')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim([-0.2, 1.2])

plt.subplot(1, 2, 2)
plt.plot(x_fine, f_true, 'b-', label='True function', linewidth=2)
plt.plot(x_fine, poly_vals, 'g--', label='Polynomial deg 8', linewidth=2)
plt.plot(x_data, f_data, 'ko', markersize=6, label='Data points')
plt.title(f'Polynomial (max error: {np.max(np.abs(poly_vals - f_true)):.3e})')
plt.legend()
plt.grid(True, alpha=0.3)
plt.ylim([-0.2, 1.2])

plt.tight_layout()
plt.show()

print(f"Spline max error: {np.max(np.abs(S - f_true)):.6e}")
print(f"Polynomial max error: {np.max(np.abs(poly_vals - f_true)):.6e}")
```

## Worked Example

**Problem**: Construct a natural cubic spline for the data points $(0, 0)$, $(1, 1)$, $(2, 0)$.

**Solution**:

We have $n = 2$ intervals, so we need $M_0, M_1, M_2$.

Natural boundary conditions: $M_0 = 0$, $M_2 = 0$.

Interval widths: $h_0 = h_1 = 1$.

For $i = 1$ (the only interior knot):
$$h_0 M_0 + 2(h_0 + h_1)M_1 + h_1 M_2 = 6\left(\frac{f_2 - f_1}{h_1} - \frac{f_1 - f_0}{h_0}\right)$$

$$1 \cdot 0 + 2(1 + 1)M_1 + 1 \cdot 0 = 6\left(\frac{0 - 1}{1} - \frac{1 - 0}{1}\right)$$

$$4M_1 = 6(-1 - 1) = -12$$

$$M_1 = -3$$

So $M = [0, -3, 0]$.

On $[0, 1]$:
$$S_0(x) = \frac{0}{6}(1-x)^3 + \frac{-3}{6}x^3 + \left(\frac{0}{1} - 0\right)(1-x) + \left(\frac{1}{1} - \frac{-3}{6}\right)x$$
$$= -\frac{1}{2}x^3 + \frac{3}{2}x$$

On $[1, 2]$:
$$S_1(x) = \frac{-3}{6}(2-x)^3 + \frac{0}{6}(x-1)^3 + \left(\frac{1}{1} + \frac{3}{6}\right)(2-x) + \left(\frac{0}{1}\right)(x-1)$$
$$= -\frac{1}{2}(2-x)^3 + \frac{3}{2}(2-x)$$

Verification at $x = 1$:
- $S_0(1) = -\frac{1}{2} + \frac{3}{2} = 1$ ✓
- $S_1(1) = -\frac{1}{2} + \frac{3}{2} = 1$ ✓
- $S_0'(1) = -\frac{3}{2} + \frac{3}{2} = 0$
- $S_1'(1) = \frac{3}{2} - \frac{3}{2} = 0$ ✓

## Properties of Cubic Splines

1. **Minimum curvature**: Natural cubic splines minimize $\int_a^b [S''(x)]^2 \, dx$ among all $C^2$ interpolants
2. **Local support**: Changing one data point affects at most 4 neighboring polynomial pieces
3. **Stability**: Well-conditioned tridiagonal system (efficient to solve)
4. **Shape preservation**: Generally follows the shape of the data without wild oscillations

## Applications

1. **Computer graphics**: Smooth curves and surfaces (Bézier, B-splines)
2. **Data visualization**: Connecting discrete data points smoothly
3. **Numerical solution of PDEs**: Finite element basis functions
4. **Robotics**: Trajectory planning with continuous acceleration
5. **Statistics**: Smoothing splines for regression

## Key Takeaways

- Splines use **low-degree piecewise polynomials** to avoid oscillations
- **Cubic splines** provide $C^2$ continuity with minimal curvature
- Construction requires solving a **tridiagonal linear system** (efficient)
- **Natural splines** use zero second derivative at endpoints
- **Clamped splines** use specified derivatives at endpoints
- Splines provide **local control**: changing data affects only nearby pieces
- Superior to high-degree polynomials for **practical interpolation**

## Common Mistakes

1. **Confusing knots and degrees**: $n+1$ knots give $n$ polynomial pieces, not degree
2. **Wrong boundary conditions**: Natural and clamped splines give different results
3. **Extrapolation beyond knots**: Splines are only reliable within $[x_0, x_n]$
4. **Assuming global polynomials**: Each piece is a different polynomial
5. **Index errors**: Careful with intervals $[x_i, x_{i+1}]$ for $i = 0, \ldots, n-1$
