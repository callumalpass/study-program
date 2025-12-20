---
title: "Chebyshev Nodes"
description: "Optimal node placement for polynomial interpolation to minimize error and avoid Runge's phenomenon"
---

# Chebyshev Nodes

Chebyshev nodes provide an optimal distribution of interpolation points that dramatically reduces oscillations and minimizes the maximum interpolation error compared to equally spaced nodes.

## Introduction

We have seen that high-degree polynomial interpolation with equally spaced nodes can produce large oscillations near the endpoints (Runge's phenomenon). The key insight is that **node placement matters enormously** for interpolation accuracy.

Runge's phenomenon occurs because equally spaced nodes lead to a nodal polynomial $\prod_{i=0}^n (x - x_i)$ that grows very large near the endpoints. Chebyshev nodes are specifically designed to minimize this growth.

## The Nodal Polynomial Problem

Recall the interpolation error formula:

$$|f(x) - P_n(x)| = \frac{|f^{(n+1)}(\xi)|}{(n+1)!} \left|\prod_{i=0}^n (x - x_i)\right|$$

For fixed $f$ and $n$, we cannot change $f^{(n+1)}(\xi)$, but we **can choose the nodes** $x_0, \ldots, x_n$ to minimize:

$$\max_{x \in [a,b]} \left|\prod_{i=0}^n (x - x_i)\right|$$

This is a **minimax problem**: minimize the maximum value.

## Chebyshev Polynomials

The solution involves **Chebyshev polynomials of the first kind**, defined recursively:

$$T_0(x) = 1$$
$$T_1(x) = x$$
$$T_{n+1}(x) = 2xT_n(x) - T_{n-1}(x)$$

First few Chebyshev polynomials:
- $T_0(x) = 1$
- $T_1(x) = x$
- $T_2(x) = 2x^2 - 1$
- $T_3(x) = 4x^3 - 3x$
- $T_4(x) = 8x^4 - 8x^2 + 1$
- $T_5(x) = 16x^5 - 20x^3 + 5x$

### Trigonometric Form

On the interval $[-1, 1]$:

$$T_n(x) = \cos(n \arccos(x))$$

This remarkable formula shows that Chebyshev polynomials oscillate between $-1$ and $1$ on $[-1, 1]$ with equal amplitude.

### Key Properties

1. **Bounded oscillation**: $|T_n(x)| \leq 1$ for all $x \in [-1, 1]$
2. **Leading coefficient**: The coefficient of $x^n$ in $T_n(x)$ is $2^{n-1}$ for $n \geq 1$
3. **Orthogonality**: $\int_{-1}^1 \frac{T_m(x)T_n(x)}{\sqrt{1-x^2}} dx = 0$ if $m \neq n$
4. **Extrema**: $T_n$ attains $\pm 1$ at $n+1$ points in $[-1, 1]$

## Chebyshev Nodes on $[-1, 1]$

The **zeros of $T_{n+1}(x)$** are:

$$x_i = \cos\left(\frac{2i+1}{2(n+1)}\pi\right), \quad i = 0, 1, \ldots, n$$

These are the **Chebyshev nodes** on $[-1, 1]$.

### Why These Nodes?

The minimax theorem states that among all monic polynomials of degree $n+1$, the polynomial $\frac{1}{2^n}T_{n+1}(x)$ has the smallest maximum absolute value on $[-1, 1]$.

Since the nodal polynomial $\prod_{i=0}^n (x - x_i)$ is monic with roots at the interpolation nodes, choosing nodes at the Chebyshev zeros gives:

$$\prod_{i=0}^n (x - x_i) = \frac{1}{2^n}T_{n+1}(x)$$

Therefore:
$$\max_{x \in [-1,1]} \left|\prod_{i=0}^n (x - x_i)\right| = \frac{1}{2^n}$$

This is **optimal** among all possible node distributions!

## Chebyshev Nodes on $[a, b]$

For a general interval $[a, b]$, transform via:

$$x = \frac{b-a}{2}t + \frac{a+b}{2}$$

where $t \in [-1, 1]$. The Chebyshev nodes become:

$$x_i = \frac{b-a}{2}\cos\left(\frac{2i+1}{2(n+1)}\pi\right) + \frac{a+b}{2}$$

for $i = 0, 1, \ldots, n$.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def chebyshev_nodes(n, a=-1, b=1):
    """
    Compute n+1 Chebyshev nodes on interval [a, b].

    Parameters:
    - n: degree of interpolating polynomial
    - a, b: interval endpoints

    Returns:
    - x: array of n+1 Chebyshev nodes
    """
    k = np.arange(n+1)
    # Nodes on [-1, 1]
    t = np.cos((2*k + 1) * np.pi / (2*(n+1)))

    # Transform to [a, b]
    x = (b - a) / 2 * t + (a + b) / 2

    return x

def compare_node_distributions():
    """
    Compare interpolation with equally spaced vs Chebyshev nodes.
    """
    # Runge's function
    f = lambda x: 1 / (1 + 25*x**2)

    n_values = [5, 10, 15, 20]
    x_eval = np.linspace(-1, 1, 500)
    f_true = f(x_eval)

    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    axes = axes.flatten()

    for idx, n in enumerate(n_values):
        # Equally spaced nodes
        x_equal = np.linspace(-1, 1, n+1)
        y_equal = f(x_equal)

        # Chebyshev nodes
        x_cheb = chebyshev_nodes(n)
        y_cheb = f(x_cheb)

        # Lagrange interpolation (from previous section)
        from numpy.polynomial import polynomial as P
        poly_equal = P.polyfit(x_equal, y_equal, n)
        poly_cheb = P.polyfit(x_cheb, y_cheb, n)

        p_equal = P.polyval(x_eval, poly_equal)
        p_cheb = P.polyval(x_eval, poly_cheb)

        # Compute errors
        err_equal = np.max(np.abs(f_true - p_equal))
        err_cheb = np.max(np.abs(f_true - p_cheb))

        # Plot
        ax = axes[idx]
        ax.plot(x_eval, f_true, 'b-', label='True function', linewidth=2)
        ax.plot(x_eval, p_equal, 'r--', label=f'Equally spaced (err={err_equal:.2e})', linewidth=1.5)
        ax.plot(x_eval, p_cheb, 'g--', label=f'Chebyshev (err={err_cheb:.2e})', linewidth=1.5)
        ax.plot(x_equal, y_equal, 'rs', markersize=4)
        ax.plot(x_cheb, y_cheb, 'g^', markersize=4)
        ax.set_title(f'Degree n = {n}')
        ax.set_ylim([-0.5, 1.5])
        ax.legend(fontsize=8)
        ax.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

compare_node_distributions()

# Visualize node distribution
def visualize_nodes():
    """Compare distribution of equally spaced vs Chebyshev nodes."""
    n = 10
    x_equal = np.linspace(-1, 1, n+1)
    x_cheb = chebyshev_nodes(n)

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))

    # Equally spaced
    ax1.plot(x_equal, np.zeros_like(x_equal), 'ro', markersize=8)
    ax1.set_ylim([-0.5, 0.5])
    ax1.set_xlim([-1.1, 1.1])
    ax1.set_title('Equally Spaced Nodes (n=10)')
    ax1.set_yticks([])
    ax1.grid(True, alpha=0.3)

    # Chebyshev
    ax2.plot(x_cheb, np.zeros_like(x_cheb), 'g^', markersize=8)
    ax2.set_ylim([-0.5, 0.5])
    ax2.set_xlim([-1.1, 1.1])
    ax2.set_title('Chebyshev Nodes (n=10)')
    ax2.set_yticks([])
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

    print("Equally spaced nodes:")
    print(x_equal)
    print("\nChebyshev nodes:")
    print(np.sort(x_cheb))

visualize_nodes()
```

## Worked Example

**Problem**: Find the 4 Chebyshev nodes on $[-1, 1]$ (for degree 3 interpolation).

**Solution**:

For $n = 3$, we need $n+1 = 4$ nodes (zeros of $T_4(x)$):

$$x_i = \cos\left(\frac{2i+1}{8}\pi\right), \quad i = 0, 1, 2, 3$$

Computing:
- $x_0 = \cos(\pi/8) = \cos(22.5°) \approx 0.9239$
- $x_1 = \cos(3\pi/8) = \cos(67.5°) \approx 0.3827$
- $x_2 = \cos(5\pi/8) = \cos(112.5°) \approx -0.3827$
- $x_3 = \cos(7\pi/8) = \cos(157.5°) \approx -0.9239$

Notice:
- Nodes are **symmetric** about $x = 0$
- Nodes are **denser near the endpoints** $\pm 1$
- Spacing increases toward the center

This clustering near endpoints counteracts the natural tendency of interpolation error to grow near boundaries.

## Error Bound with Chebyshev Nodes

Using Chebyshev nodes on $[-1, 1]$:

$$|f(x) - P_n(x)| \leq \frac{1}{2^n(n+1)!} \max_{x \in [-1,1]} |f^{(n+1)}(x)|$$

For general $[a, b]$:

$$|f(x) - P_n(x)| \leq \frac{1}{2^n(n+1)!} \left(\frac{b-a}{2}\right)^{n+1} \max_{x \in [a,b]} |f^{(n+1)}(x)|$$

The factor $\frac{1}{2^n}$ makes Chebyshev interpolation **exponentially better** than worst-case node placement.

## Comparison: Equally Spaced vs Chebyshev

Consider $f(x) = \frac{1}{1+25x^2}$ on $[-1, 1]$ with $n = 10$:

| Node Type | Maximum Error |
|-----------|---------------|
| Equally spaced | $\approx 2.0$ (oscillations!) |
| Chebyshev | $\approx 0.03$ |

The improvement is **dramatic**: Chebyshev nodes reduce error by a factor of 60!

## Practical Considerations

### Advantages
1. **Near-optimal** error minimization
2. **No oscillations** like Runge's phenomenon
3. **Well-conditioned** interpolation problem
4. **Easy to compute**: simple closed-form formula

### Disadvantages
1. **Non-uniform spacing**: not always compatible with physical measurements
2. **Requires freedom** to choose node locations
3. **Transformation needed** for intervals other than $[-1, 1]$

### When to Use

Use Chebyshev nodes when:
- You have freedom to choose where to sample a function
- High-degree interpolation is necessary
- Minimizing maximum error is critical
- Avoiding oscillations is important

Use equally spaced (or other) nodes when:
- Data points are predetermined (experimental data)
- Physical constraints dictate node locations
- Low-degree interpolation suffices

## Applications

1. **Spectral methods**: Solving differential equations using polynomial approximations
2. **Function approximation**: Constructing polynomial approximations of special functions
3. **Numerical integration**: Clenshaw-Curtis quadrature
4. **Adaptive algorithms**: Choosing optimal sampling points
5. **Signal processing**: Efficient representation of bandlimited signals

## Key Takeaways

- **Chebyshev nodes** are the zeros of Chebyshev polynomials
- They **minimize the maximum interpolation error** for polynomial interpolation
- Nodes cluster **near endpoints**, counteracting error growth
- Provide **exponentially better accuracy** than equally spaced nodes
- The nodal polynomial has **minimum maximum value**: $\frac{1}{2^n}$
- Essential for **high-degree interpolation** to avoid Runge's phenomenon
- Widely used in **spectral methods** and function approximation

## Common Mistakes

1. **Wrong ordering**: Chebyshev nodes are not in increasing order from the formula; sort if needed
2. **Incorrect transformation**: Formula for $[a,b]$ requires both scaling and shifting
3. **Index confusion**: Node $x_i$ uses index $i$, not $i+1$, in the cosine formula
4. **Assuming uniform spacing**: Chebyshev nodes are intentionally non-uniform
5. **Using with predetermined data**: Chebyshev nodes require freedom to choose sample points
6. **Forgetting interval**: Standard Chebyshev nodes are for $[-1, 1]$, not $[0, 1]$
