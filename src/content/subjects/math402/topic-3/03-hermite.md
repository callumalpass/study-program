---
title: "Hermite Interpolation"
description: "Interpolation matching both function values and derivatives at specified points"
---

# Hermite Interpolation

Hermite interpolation extends polynomial interpolation by matching not only function values but also derivatives at the interpolation nodes. This provides greater control over the shape of the interpolating polynomial and is essential in applications requiring smooth curves.

## Introduction

Standard polynomial interpolation determines a polynomial that passes through specified points. However, in many applications we also know or require certain derivative values at those points. For example:

- **Computer graphics**: Ensuring smooth curves through control points with specified tangents
- **Trajectory planning**: Matching position and velocity at waypoints
- **Engineering design**: Fitting curves with controlled slopes
- **Numerical solution of ODEs**: Methods requiring derivative matching

Hermite interpolation solves this problem by constructing a polynomial that satisfies both function and derivative constraints.

## Problem Statement

Given $n+1$ distinct points $x_0, x_1, \ldots, x_n$ and corresponding data:
- Function values: $f(x_i) = f_i$ for $i = 0, 1, \ldots, n$
- Derivative values: $f'(x_i) = f_i'$ for $i = 0, 1, \ldots, n$

Find a polynomial $H_{2n+1}(x)$ of degree at most $2n+1$ such that:

$$H_{2n+1}(x_i) = f_i \quad \text{and} \quad H_{2n+1}'(x_i) = f_i'$$

for all $i = 0, 1, \ldots, n$.

**Existence and Uniqueness**: Such a polynomial exists and is unique, as we have $2n+2$ constraints and $2n+2$ coefficients in a polynomial of degree $\leq 2n+1$.

## Hermite Basis Functions

We construct $H_{2n+1}(x)$ using special basis polynomials that satisfy the interpolation conditions.

### Function-Matching Basis

Define $H_i(x)$ such that:
- $H_i(x_j) = \delta_{ij}$ (Kronecker delta)
- $H_i'(x_j) = 0$ for all $j$

These are given by:

$$H_i(x) = [1 - 2L_i'(x_i)(x - x_i)]L_i^2(x)$$

where $L_i(x)$ is the $i$-th Lagrange basis polynomial.

### Derivative-Matching Basis

Define $\hat{H}_i(x)$ such that:
- $\hat{H}_i(x_j) = 0$ for all $j$
- $\hat{H}_i'(x_j) = \delta_{ij}$

These are given by:

$$\hat{H}_i(x) = (x - x_i)L_i^2(x)$$

### Hermite Interpolating Polynomial

The Hermite polynomial is:

$$H_{2n+1}(x) = \sum_{i=0}^n f_i H_i(x) + \sum_{i=0}^n f_i' \hat{H}_i(x)$$

## Divided Differences Approach

Hermite interpolation can also be computed using Newton's divided differences by treating coincident points.

When $x_i$ and $x_{i+1}$ coincide, the divided difference becomes:

$$f[x_i, x_i] = \lim_{x_{i+1} \to x_i} \frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i} = f'(x_i)$$

This connection was mentioned in Newton interpolation and leads to a natural algorithm.

### Modified Divided Difference Table

For points $x_0, x_1$ with derivatives $f_0', f_1'$, construct:

| $z$ | $f[z]$ | $f[z,z]$ | $f[z,z,z]$ |
|-----|--------|----------|------------|
| $x_0$ | $f_0$ | $f_0'$ | $\frac{f[x_0,x_1,x_1] - f[x_0,x_0,x_1]}{x_1 - x_0}$ |
| $x_0$ | $f_0$ | $\frac{f_1 - f_0}{x_1 - x_0}$ | |
| $x_1$ | $f_1$ | $f_1'$ | |
| $x_1$ | $f_1$ | | |

The coefficients of the Newton form are the top diagonal entries.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def hermite_interpolation(x_data, f_data, df_data):
    """
    Hermite interpolation using divided differences.

    Parameters:
    - x_data: array of n+1 distinct interpolation nodes
    - f_data: function values at nodes
    - df_data: derivative values at nodes

    Returns:
    - coeffs: Newton coefficients
    - z_data: expanded node sequence
    """
    n = len(x_data)

    # Create expanded arrays with doubled points
    z_data = np.zeros(2*n)
    Q = np.zeros((2*n, 2*n))

    # Fill z and first column of Q
    for i in range(n):
        z_data[2*i] = x_data[i]
        z_data[2*i + 1] = x_data[i]
        Q[2*i, 0] = f_data[i]
        Q[2*i + 1, 0] = f_data[i]

    # Fill second column
    for i in range(n):
        Q[2*i + 1, 1] = df_data[i]
        if i < n - 1:
            Q[2*i + 2, 1] = (Q[2*i + 2, 0] - Q[2*i + 1, 0]) / (z_data[2*i + 2] - z_data[2*i + 1])

    # Fill remaining columns
    for j in range(2, 2*n):
        for i in range(2*n - j):
            Q[i, j] = (Q[i+1, j-1] - Q[i, j-1]) / (z_data[i+j] - z_data[i])

    # Coefficients are top row
    coeffs = Q[0, :]

    return coeffs, z_data

def hermite_eval(z_data, coeffs, x):
    """
    Evaluate Hermite polynomial using Horner's method.

    Parameters:
    - z_data: expanded node sequence
    - coeffs: Newton coefficients from hermite_interpolation
    - x: evaluation point(s)

    Returns:
    - H(x): interpolated values
    """
    n = len(coeffs)
    result = coeffs[-1] * np.ones_like(x, dtype=float)

    for i in range(n-2, -1, -1):
        result = coeffs[i] + (x - z_data[i]) * result

    return result

# Example: Interpolate f(x) = sin(x) with derivatives
x_data = np.array([0.0, np.pi/2, np.pi])
f_data = np.sin(x_data)
df_data = np.cos(x_data)

coeffs, z_data = hermite_interpolation(x_data, f_data, df_data)

# Evaluate on fine grid
x_eval = np.linspace(0, np.pi, 200)
H = hermite_eval(z_data, coeffs, x_eval)
f_true = np.sin(x_eval)

# Compute error
max_error = np.max(np.abs(H - f_true))
print(f"Maximum interpolation error: {max_error:.6e}")

# Visualization
plt.figure(figsize=(10, 6))
plt.plot(x_eval, f_true, 'b-', label='sin(x)', linewidth=2)
plt.plot(x_eval, H, 'r--', label='Hermite interpolation', linewidth=2)
plt.plot(x_data, f_data, 'ko', markersize=8, label='Data points')

# Plot tangent lines at nodes
for i in range(len(x_data)):
    x_tangent = np.linspace(x_data[i] - 0.3, x_data[i] + 0.3, 20)
    y_tangent = f_data[i] + df_data[i] * (x_tangent - x_data[i])
    plt.plot(x_tangent, y_tangent, 'g--', alpha=0.5, linewidth=1)

plt.xlabel('x')
plt.ylabel('y')
plt.title('Hermite Interpolation with Derivative Matching')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
```

## Worked Example

**Problem**: Find the Hermite polynomial that interpolates $f(x) = e^x$ at $x = 0$ and $x = 1$ with matching derivatives. Estimate $e^{0.5}$.

**Solution**:

Data:
- $(x_0, f_0, f_0') = (0, 1, 1)$ since $e^0 = 1$ and $(e^x)' = e^x$
- $(x_1, f_1, f_1') = (1, e, e)$ where $e \approx 2.71828$

Using divided differences:

| $z$ | $f[z]$ | $f[z,z]$ | $f[z,z,z]$ | $f[z,z,z,z]$ |
|-----|--------|----------|------------|--------------|
| 0 | 1 | 1 | 0.71828 | 0.14356 |
| 0 | 1 | 1.71828 | 1.00000 | |
| 1 | 2.71828 | 2.71828 | | |
| 1 | 2.71828 | | | |

The Hermite polynomial is:
$$H_3(x) = 1 + 1 \cdot x + 0.71828 \cdot x^2 + 0.14356 \cdot x^2(x-1)$$

Evaluating at $x = 0.5$:
$$H_3(0.5) = 1 + 0.5 + 0.71828(0.25) + 0.14356(0.25)(-0.5)$$
$$= 1 + 0.5 + 0.17957 - 0.01794 = 1.66163$$

True value: $e^{0.5} = 1.64872$

Error: $|1.66163 - 1.64872| = 0.01291$

This is better accuracy than standard Lagrange interpolation with the same points!

## Error Analysis

For $f \in C^{2n+2}[a,b]$, the Hermite interpolation error is:

$$f(x) - H_{2n+1}(x) = \frac{f^{(2n+2)}(\xi)}{(2n+2)!} \prod_{i=0}^n (x - x_i)^2$$

for some $\xi$ in the interval containing $x$ and all $x_i$.

Key observations:
- Error involves $(x - x_i)^2$ instead of $(x - x_i)$
- Requires higher derivative: $f^{(2n+2)}$ instead of $f^{(n+1)}$
- Generally more accurate than Lagrange for same number of points

## Applications

1. **Cubic Hermite splines**: Piecewise cubic polynomials with $C^1$ continuity
2. **Computer-aided design (CAD)**: Bézier curves and surfaces
3. **Animation**: Smooth motion paths through keyframes
4. **Finite element methods**: Shape functions in structural analysis
5. **Numerical differentiation**: Approximating higher derivatives

## Key Takeaways

- Hermite interpolation matches both **function values and derivatives**
- Uses polynomial of degree **$2n+1$** for $n+1$ points
- Can be computed using **modified divided differences**
- Generally provides **better accuracy** than Lagrange interpolation
- Essential for applications requiring **smooth curves** with controlled tangents
- Foundation for **cubic splines** and other piecewise interpolants

## Common Mistakes

1. **Wrong polynomial degree**: Hermite polynomial has degree $2n+1$, not $n$
2. **Forgetting derivative ordering**: When using divided differences, must alternate function values and derivatives correctly
3. **Incorrect basis functions**: $H_i(x)$ and $\hat{H}_i(x)$ are different and serve different purposes
4. **Evaluation errors**: Must use the expanded node sequence in Horner's method
5. **Assuming $C^2$ continuity**: Hermite interpolation guarantees $C^1$, not necessarily $C^2$
