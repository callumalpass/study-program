---
title: "Finite Differences"
description: "Comprehensive guide to finite differences with theoretical foundations and Python implementations"
---

# Finite Differences

Finite difference methods approximate derivatives numerically by replacing differential quotients with difference quotients, forming the foundation of numerical differentiation.

## Introduction

Computing derivatives numerically is essential when:
- **Analytical derivatives are unavailable**: Complex functions, black-box simulations
- **Data is discrete**: Experimental measurements, sensor readings
- **Function is defined implicitly**: Solutions to differential equations

The key idea is to approximate the derivative using the **limit definition**:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

For small but finite $h$, we replace the limit with a difference quotient.

## Forward Difference Formula

The simplest approximation uses a **forward step**:

$$f'(x) \approx \frac{f(x+h) - f(x)}{h}$$

### Derivation via Taylor Series

Expand $f(x+h)$ about $x$:

$$f(x+h) = f(x) + hf'(x) + \frac{h^2}{2}f''(x) + \frac{h^3}{6}f'''(x) + \cdots$$

Rearranging:

$$f'(x) = \frac{f(x+h) - f(x)}{h} - \frac{h}{2}f''(x) - \frac{h^2}{6}f'''(x) - \cdots$$

The **truncation error** is:

$$E_{\text{forward}} = -\frac{h}{2}f''(\xi) = O(h)$$

where $\xi \in (x, x+h)$ by Taylor's theorem with remainder.

**Conclusion**: Forward difference has **first-order accuracy** $O(h)$.

## Backward Difference Formula

Using a **backward step** instead:

$$f'(x) \approx \frac{f(x) - f(x-h)}{h}$$

Taylor expansion of $f(x-h)$:

$$f(x-h) = f(x) - hf'(x) + \frac{h^2}{2}f''(x) - \frac{h^3}{6}f'''(x) + \cdots$$

Solving for $f'(x)$:

$$f'(x) = \frac{f(x) - f(x-h)}{h} + \frac{h}{2}f''(\xi)$$

Again, **first-order accuracy** $O(h)$ with opposite sign in the leading error term.

## Central Difference Formula

Combining forward and backward differences yields higher accuracy.

Subtract the Taylor expansions:

$$f(x+h) - f(x-h) = 2hf'(x) + \frac{2h^3}{6}f'''(x) + O(h^5)$$

Solving for $f'(x)$:

$$f'(x) \approx \frac{f(x+h) - f(x-h)}{2h}$$

**Truncation error**:

$$E_{\text{central}} = -\frac{h^2}{6}f'''(\xi) = O(h^2)$$

**Conclusion**: Central difference has **second-order accuracy** $O(h^2)$, much better than forward/backward!

## Higher-Order Derivatives

### Second Derivative

Add the Taylor expansions for $f(x+h)$ and $f(x-h)$:

$$f(x+h) + f(x-h) = 2f(x) + h^2f''(x) + \frac{h^4}{12}f^{(4)}(x) + O(h^6)$$

Solving for $f''(x)$:

$$f''(x) \approx \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}$$

**Truncation error**: $E = -\frac{h^2}{12}f^{(4)}(\xi) = O(h^2)$

### Higher Derivatives

The pattern extends to any order using more points. For example, the fourth derivative:

$$f^{(4)}(x) \approx \frac{f(x-2h) - 4f(x-h) + 6f(x) - 4f(x+h) + f(x+2h)}{h^4}$$

These formulas come from fitting polynomials through multiple points.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def forward_difference(f, x, h):
    """Forward difference approximation of f'(x)."""
    return (f(x + h) - f(x)) / h

def backward_difference(f, x, h):
    """Backward difference approximation of f'(x)."""
    return (f(x) - f(x - h)) / h

def central_difference(f, x, h):
    """Central difference approximation of f'(x)."""
    return (f(x + h) - f(x - h)) / (2 * h)

def second_derivative(f, x, h):
    """Central difference for second derivative."""
    return (f(x + h) - 2*f(x) + f(x - h)) / h**2

# Example: f(x) = sin(x), f'(x) = cos(x)
f = lambda x: np.sin(x)
f_prime_exact = lambda x: np.cos(x)

x = np.pi / 4
h_values = np.logspace(-1, -10, 50)

print(f"Approximating f'(π/4) where f(x) = sin(x)")
print(f"Exact value: {f_prime_exact(x):.15f}\n")
print(f"{'h':<15} {'Forward':<15} {'Backward':<15} {'Central':<15}")
print("="*60)

for h in [1e-1, 1e-2, 1e-4, 1e-6]:
    fwd = forward_difference(f, x, h)
    bwd = backward_difference(f, x, h)
    ctr = central_difference(f, x, h)
    print(f"{h:<15.0e} {fwd:<15.12f} {bwd:<15.12f} {ctr:<15.12f}")
```

## Error Analysis

### Truncation Error vs Round-off Error

Two competing error sources:

1. **Truncation error**: $O(h)$ or $O(h^2)$, decreases as $h \to 0$
2. **Round-off error**: $O(\epsilon/h)$ where $\epsilon$ is machine precision, increases as $h \to 0$

**Total error**:

$$E_{\text{total}} \approx Ch + \frac{\epsilon}{h}$$

Minimizing with respect to $h$:

$$\frac{dE}{dh} = C - \frac{\epsilon}{h^2} = 0 \implies h_{\text{opt}} = \sqrt{\frac{\epsilon}{C}}$$

For central difference with $\epsilon \approx 10^{-16}$:

$$h_{\text{opt}} \approx \sqrt{10^{-16}} = 10^{-8}$$

This explains why $h = 10^{-8}$ typically works well for double precision!

### Practical Example

```python
def analyze_errors():
    """Demonstrate truncation vs round-off error trade-off."""
    f = lambda x: np.sin(x)
    f_prime_exact = lambda x: np.cos(x)
    x = 1.0

    h_values = np.logspace(-1, -16, 100)
    errors = []

    for h in h_values:
        approx = central_difference(f, x, h)
        error = abs(approx - f_prime_exact(x))
        errors.append(error)

    # Find optimal h
    min_idx = np.argmin(errors)
    h_opt = h_values[min_idx]

    plt.figure(figsize=(10, 6))
    plt.loglog(h_values, errors, 'b-', label='Actual error')
    plt.axvline(h_opt, color='r', linestyle='--',
                label=f'Optimal h ≈ {h_opt:.2e}')
    plt.xlabel('Step size h')
    plt.ylabel('Absolute error')
    plt.title('Error vs Step Size for Central Difference')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.show()

    print(f"Optimal h: {h_opt:.2e}")
    print(f"Minimum error: {errors[min_idx]:.2e}")

analyze_errors()
```

## Non-uniform Grids

For unevenly spaced data points $(x_0, f_0), (x_1, f_1), (x_2, f_2)$:

Fit a quadratic through three points and differentiate:

$$f'(x_1) \approx \frac{(x_1 - x_2)^2(f_1 - f_0) + (x_0 - x_1)^2(f_2 - f_1)}{(x_1 - x_0)(x_2 - x_1)(x_2 - x_0)}$$

This reduces to standard central difference when $x_2 - x_1 = x_1 - x_0 = h$.

## Applications

### Numerical Gradient

For multivariate functions $f: \mathbb{R}^n \to \mathbb{R}$:

$$\nabla f(x) \approx \begin{bmatrix}
\frac{f(x + he_1) - f(x - he_1)}{2h} \\
\frac{f(x + he_2) - f(x - he_2)}{2h} \\
\vdots \\
\frac{f(x + he_n) - f(x - he_n)}{2h}
\end{bmatrix}$$

where $e_i$ are standard basis vectors.

### Numerical PDE Solution

Finite differences discretize partial differential equations. For the heat equation:

$$\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$$

Discretize:

$$\frac{u_i^{n+1} - u_i^n}{\Delta t} = \alpha \frac{u_{i+1}^n - 2u_i^n + u_{i-1}^n}{(\Delta x)^2}$$

This converts the PDE to a system of algebraic equations.

## Key Takeaways

- **Forward/backward differences**: First-order accuracy $O(h)$
- **Central difference**: Second-order accuracy $O(h^2)$, preferred when possible
- **Optimal step size**: Balance truncation ($\sim h^2$) and round-off ($\sim \epsilon/h$) errors
- **Typical choice**: $h \approx 10^{-8}$ for double precision central differences
- **Higher derivatives**: Require more function evaluations, larger errors
- **Non-uniform grids**: Use polynomial interpolation formulas

## Common Mistakes

1. **Using $h$ too small**: Round-off error dominates, causing nonsensical results
2. **Using $h$ too large**: Truncation error dominates, poor approximation
3. **Forward difference when central is possible**: Unnecessarily sacrificing accuracy
4. **Ignoring cancellation error**: Subtracting nearly equal numbers loses precision
5. **Applying to noisy data**: Amplifies noise, consider smoothing first
6. **Forgetting boundary conditions**: Forward/backward needed at endpoints
