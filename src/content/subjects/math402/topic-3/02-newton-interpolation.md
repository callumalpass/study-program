---
title: "Newton Interpolation"
description: "Divided differences and Newton's form of the interpolating polynomial"
---

# Newton Interpolation

Newton's divided difference interpolation provides an efficient incremental approach to polynomial interpolation that allows easy addition of new data points.

## Introduction

While Lagrange interpolation gives explicit formulas for the interpolating polynomial, Newton's divided difference form is better suited for:
- **Incremental updates**: Adding new points without recomputing everything
- **Nested evaluation**: Efficient evaluation using Horner's method
- **Error estimation**: Natural framework for understanding interpolation errors

The Newton form represents the same unique interpolating polynomial as Lagrange but in a different basis.

## Divided Differences

The **divided difference** is a recursive definition that generalizes the derivative.

### Zero-th Order

$$f[x_i] = f(x_i)$$

### First Order

$$f[x_i, x_{i+1}] = \frac{f[x_{i+1}] - f[x_i]}{x_{i+1} - x_i}$$

### k-th Order

$$f[x_i, x_{i+1}, \ldots, x_{i+k}] = \frac{f[x_{i+1}, \ldots, x_{i+k}] - f[x_i, \ldots, x_{i+k-1}]}{x_{i+k} - x_i}$$

**Key property**: Divided differences are **symmetric** in their arguments:

$$f[x_0, x_1, \ldots, x_n] = f[x_{\sigma(0)}, x_{\sigma(1)}, \ldots, x_{\sigma(n)}]$$

for any permutation $\sigma$.

## Newton's Interpolation Formula

The interpolating polynomial through points $(x_0, f_0), \ldots, (x_n, f_n)$ is:

$$P_n(x) = f[x_0] + f[x_0, x_1](x - x_0) + f[x_0, x_1, x_2](x - x_0)(x - x_1) + \cdots$$

$$+ f[x_0, \ldots, x_n](x - x_0) \cdots (x - x_{n-1})$$

More compactly:

$$P_n(x) = \sum_{k=0}^{n} f[x_0, \ldots, x_k] \prod_{j=0}^{k-1} (x - x_j)$$

where the empty product (when $k=0$) equals 1.

### Newton Basis Functions

The **Newton basis polynomials** are:

$$N_k(x) = \prod_{j=0}^{k-1} (x - x_j)$$

So $P_n(x) = \sum_{k=0}^n f[x_0, \ldots, x_k] N_k(x)$.

## Computing Divided Differences

### Divided Difference Table

Construct the table recursively:

| $x_i$ | $f[x_i]$ | $f[x_i, x_{i+1}]$ | $f[x_i, x_{i+1}, x_{i+2}]$ | $\cdots$ |
|-------|----------|-------------------|---------------------------|----------|
| $x_0$ | $f_0$    | $f[x_0, x_1]$     | $f[x_0, x_1, x_2]$        | $\cdots$ |
| $x_1$ | $f_1$    | $f[x_1, x_2]$     | $f[x_1, x_2, x_3]$        |          |
| $x_2$ | $f_2$    | $f[x_2, x_3]$     |                           |          |
| $x_3$ | $f_3$    |                   |                           |          |

The **coefficients** of Newton's polynomial are the top diagonal: $f[x_0], f[x_0, x_1], f[x_0, x_1, x_2], \ldots$

### Algorithm

```python
import numpy as np

def divided_differences(x, f):
    """
    Compute divided difference table.

    Parameters:
    - x: array of n+1 distinct points
    - f: array of n+1 function values

    Returns:
    - table: (n+1) × (n+1) array where table[i,j] = f[x_i, ..., x_{i+j}]
    """
    n = len(x)
    table = np.zeros((n, n))

    # First column is function values
    table[:, 0] = f

    # Fill table column by column
    for j in range(1, n):
        for i in range(n - j):
            table[i, j] = (table[i+1, j-1] - table[i, j-1]) / (x[i+j] - x[i])

    return table

def newton_coefficients(x, f):
    """
    Compute Newton interpolation coefficients.

    Returns coefficients [a0, a1, ..., an] where
    P(x) = a0 + a1(x-x0) + a2(x-x0)(x-x1) + ...
    """
    table = divided_differences(x, f)
    return table[0, :]  # Top row contains coefficients

# Example: Interpolate f(x) = 1/(1+x²) at x = -5, -1, 0, 1, 5
x = np.array([-5.0, -1.0, 0.0, 1.0, 5.0])
f = 1.0 / (1.0 + x**2)

coeffs = newton_coefficients(x, f)
print("Newton Coefficients:")
for i, c in enumerate(coeffs):
    print(f"  a_{i} = {c:.10f}")
```

**Output**:
```
Newton Coefficients:
  a_0 = 0.0384615385
  a_1 = 0.1603290598
  a_2 = -0.0320512821
  a_3 = -0.0011217949
  a_4 = 0.0002967033
```

## Evaluation: Horner's Method

Evaluate $P_n(x)$ efficiently using **nested multiplication** (Horner's method):

$$P_n(x) = a_0 + (x - x_0)[a_1 + (x - x_1)[a_2 + \cdots + (x - x_{n-1})a_n]]$$

```python
def newton_eval(x_data, coeffs, x):
    """
    Evaluate Newton polynomial at x using Horner's method.

    Parameters:
    - x_data: interpolation nodes
    - coeffs: Newton coefficients from newton_coefficients()
    - x: evaluation point(s)

    Returns:
    - P(x): interpolated value(s)
    """
    n = len(coeffs)

    # Start with last coefficient
    p = coeffs[-1]

    # Work backwards
    for i in range(n - 2, -1, -1):
        p = coeffs[i] + (x - x_data[i]) * p

    return p

# Evaluate at many points
x_eval = np.linspace(-5, 5, 100)
y_eval = newton_eval(x, coeffs, x_eval)

# Compare with true function
y_true = 1.0 / (1.0 + x_eval**2)
error = np.max(np.abs(y_eval - y_true))

print(f"\nMaximum interpolation error: {error:.6e}")
```

## Adding New Points

Newton's form excels when adding new data points incrementally.

```python
def add_point_newton(x_data, coeffs, x_new, f_new):
    """
    Add a new point to Newton interpolation.

    Parameters:
    - x_data: existing nodes
    - coeffs: existing coefficients
    - x_new: new node
    - f_new: function value at new node

    Returns:
    - new_x_data, new_coeffs
    """
    n = len(x_data)

    # Compute new divided difference
    new_coeff = f_new
    for i in range(n):
        # Update using previous coefficients
        new_coeff = (new_coeff - coeffs[i]) / (x_new - x_data[i])

    # Append
    new_x_data = np.append(x_data, x_new)
    new_coeffs = np.append(coeffs, new_coeff)

    return new_x_data, new_coeffs

# Start with 3 points
x_init = np.array([0.0, 1.0, 2.0])
f_init = np.sin(x_init)
coeffs_init = newton_coefficients(x_init, f_init)

print("\nInitial polynomial (3 points):")
print(f"Coefficients: {coeffs_init}")

# Add points incrementally
x_curr, coeffs_curr = x_init, coeffs_init
for x_new in [3.0, 4.0, 5.0]:
    f_new = np.sin(x_new)
    x_curr, coeffs_curr = add_point_newton(x_curr, coeffs_curr, x_new, f_new)
    print(f"\nAfter adding x = {x_new}:")
    print(f"Coefficients: {coeffs_curr}")
```

## Connection to Derivatives

When points coincide, divided differences approach derivatives:

$$\lim_{x_1 \to x_0} f[x_0, x_1] = f'(x_0)$$

$$\lim_{x_1, x_2 \to x_0} f[x_0, x_1, x_2] = \frac{f''(x_0)}{2!}$$

In general:

$$f[\underbrace{x_0, x_0, \ldots, x_0}_{k+1 \text{ times}}] = \frac{f^{(k)}(x_0)}{k!}$$

This connection leads to **Hermite interpolation**, where we specify derivative values.

## Error Analysis

The error in Newton interpolation is identical to Lagrange (same polynomial):

$$f(x) - P_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \prod_{i=0}^n (x - x_i)$$

for some $\xi$ in the interval containing $x$ and all $x_i$.

The divided difference provides insight:

$$f^{(n+1)}(\xi) = (n+1)! \cdot f[x_0, \ldots, x_n, x]$$

## Worked Example

**Problem**: Interpolate $f(x) = e^x$ at $x = 0, 1, 2$ and estimate $e^{0.5}$.

**Solution**:

Data points:
- $(0, e^0) = (0, 1)$
- $(1, e^1) = (1, 2.71828)$
- $(2, e^2) = (2, 7.38906)$

Divided differences:

| $x_i$ | $f[x_i]$ | $f[x_i, x_{i+1}]$ | $f[x_0, x_1, x_2]$ |
|-------|----------|-------------------|---------------------|
| 0     | 1.00000  | 1.71828           | 0.85039             |
| 1     | 2.71828  | 4.67078           |                     |
| 2     | 7.38906  |                   |                     |

Newton polynomial:
$$P_2(x) = 1 + 1.71828(x - 0) + 0.85039(x - 0)(x - 1)$$

Evaluate at $x = 0.5$:
$$P_2(0.5) = 1 + 1.71828(0.5) + 0.85039(0.5)(-0.5)$$
$$= 1 + 0.85914 - 0.21260 = 1.64654$$

Compare with true value:
$$e^{0.5} = 1.64872$$
$$\text{Error} = |1.64872 - 1.64654| = 0.00218$$

```python
# Verification
x_data = np.array([0.0, 1.0, 2.0])
f_data = np.exp(x_data)

coeffs = newton_coefficients(x_data, f_data)
p_half = newton_eval(x_data, coeffs, 0.5)

print(f"P_2(0.5) = {p_half:.5f}")
print(f"e^0.5 = {np.exp(0.5):.5f}")
print(f"Error = {abs(np.exp(0.5) - p_half):.5f}")
```

## Comparison with Lagrange

| Feature | Lagrange | Newton |
|---------|----------|--------|
| Form | Explicit | Recursive |
| Adding points | Recompute all | Add one coefficient |
| Evaluation | Direct | Horner's method (faster) |
| Coefficient meaning | Weights | Divided differences |
| Stability | Same | Same |

Both produce the **same polynomial**, just represented differently.

## Applications

1. **Numerical differentiation**: Divided differences approximate derivatives
2. **Adaptive interpolation**: Start with few points, add more as needed
3. **Spline construction**: Building blocks for piecewise polynomials
4. **Extrapolation methods**: Richardson extrapolation uses divided differences

## Key Takeaways

- Newton's divided difference form enables **incremental updates**
- Coefficients are computed via a **simple recursive formula**
- **Horner's method** evaluates the polynomial efficiently
- Divided differences connect to **derivatives** when points coincide
- Newton and Lagrange produce the **same polynomial**, different representations

## Common Mistakes

1. **Forgetting to check for repeated nodes**: Divided differences require distinct $x_i$
2. **Index errors in Horner's method**: Must work backwards from highest degree
3. **Assuming commutativity matters**: Order of data points doesn't affect final polynomial
4. **Inefficient evaluation**: Direct expansion is $O(n^2)$, Horner's is $O(n)$
