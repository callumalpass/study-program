---
title: "Euler Method"
description: "Comprehensive guide to euler method with theoretical foundations and Python implementations"
---

# Euler Method

## Introduction

The Euler method, developed by Leonhard Euler in the 18th century, is the simplest and most fundamental numerical technique for solving ordinary differential equations (ODEs). Despite its simplicity, it serves as the foundation for understanding more sophisticated methods and provides intuition about how numerical ODE solvers work. The method approximates the solution to an initial value problem by following the tangent line at each step, making it both conceptually clear and straightforward to implement.

While the Euler method is rarely used in production scientific computing due to its relatively low accuracy, it remains an essential teaching tool and is useful for quick prototyping and understanding the behavior of differential equations. Its geometric interpretation as a tangent line approximation makes it particularly valuable for building intuition about numerical solutions to ODEs.

## Mathematical Formulation

Consider the initial value problem:

$$y' = f(t, y), \quad y(t_0) = y_0$$

The Euler method approximates the solution at discrete points $t_0, t_1, t_2, \ldots, t_n$ with uniform step size $h = t_{i+1} - t_i$. The basic formula is:

$$y_{n+1} = y_n + h f(t_n, y_n)$$

This formula comes from the Taylor series expansion of $y(t)$ around $t_n$:

$$y(t_{n+1}) = y(t_n) + h y'(t_n) + \frac{h^2}{2} y''(t_n) + O(h^3)$$

By truncating after the linear term and substituting $y'(t_n) = f(t_n, y_n)$, we obtain the Euler method. The truncated terms constitute the local truncation error, which is $O(h^2)$ per step.

## Error Analysis

The Euler method has two types of errors:

**Local Truncation Error**: The error introduced in a single step, assuming all previous values are exact. For the Euler method, this is $O(h^2)$.

**Global Error**: The accumulated error over all steps from $t_0$ to $t_n$. Since we take approximately $n = (t_n - t_0)/h$ steps, the global error is $O(h)$. This makes Euler's method a first-order method.

The global error bound can be expressed as:

$$|y(t_n) - y_n| \leq \frac{Mh}{2L}(e^{L(t_n - t_0)} - 1)$$

where $M$ bounds the second derivative of the true solution and $L$ is the Lipschitz constant of $f$.

## Worked Example

**Problem**: Solve $y' = -2ty^2$ with $y(0) = 1$ on the interval $[0, 1]$ using step size $h = 0.2$.

**Solution**:

Given: $f(t, y) = -2ty^2$, $t_0 = 0$, $y_0 = 1$, $h = 0.2$

**Step 1**: Calculate $y_1$ at $t_1 = 0.2$
$$y_1 = y_0 + h f(t_0, y_0) = 1 + 0.2 \cdot (-2 \cdot 0 \cdot 1^2) = 1 + 0 = 1$$

**Step 2**: Calculate $y_2$ at $t_2 = 0.4$
$$y_2 = y_1 + h f(t_1, y_1) = 1 + 0.2 \cdot (-2 \cdot 0.2 \cdot 1^2) = 1 - 0.08 = 0.92$$

**Step 3**: Calculate $y_3$ at $t_3 = 0.6$
$$y_3 = y_2 + h f(t_2, y_2) = 0.92 + 0.2 \cdot (-2 \cdot 0.4 \cdot 0.92^2)$$
$$y_3 = 0.92 - 0.135296 = 0.784704$$

**Step 4**: Calculate $y_4$ at $t_4 = 0.8$
$$y_4 = y_3 + h f(t_3, y_3) = 0.784704 + 0.2 \cdot (-2 \cdot 0.6 \cdot 0.784704^2)$$
$$y_4 = 0.784704 - 0.147836 = 0.636868$$

**Step 5**: Calculate $y_5$ at $t_5 = 1.0$
$$y_5 = y_4 + h f(t_4, y_4) = 0.636868 + 0.2 \cdot (-2 \cdot 0.8 \cdot 0.636868^2)$$
$$y_5 = 0.636868 - 0.129908 = 0.506960$$

The analytical solution is $y(t) = \frac{1}{1 + t^2}$, giving $y(1) = 0.5$. Our approximation $y_5 = 0.506960$ has an error of about 0.007, demonstrating the method's reasonable accuracy for this step size.

## Implementation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def euler_method(f, t0, y0, t_final, h):
    """
    Solve ODE using Euler's method.

    Parameters:
    -----------
    f : function
        The function f(t, y) defining the ODE y' = f(t, y)
    t0 : float
        Initial time
    y0 : float or array
        Initial condition
    t_final : float
        Final time
    h : float
        Step size

    Returns:
    --------
    t : array
        Time points
    y : array
        Solution values at time points
    """
    n_steps = int((t_final - t0) / h)
    t = np.linspace(t0, t_final, n_steps + 1)
    y = np.zeros(n_steps + 1)
    y[0] = y0

    for i in range(n_steps):
        y[i + 1] = y[i] + h * f(t[i], y[i])

    return t, y

# Example: Solve y' = -2ty^2, y(0) = 1
def f(t, y):
    return -2 * t * y**2

t, y = euler_method(f, 0, 1, 1, 0.2)

# Plot results
plt.plot(t, y, 'bo-', label='Euler method')
t_exact = np.linspace(0, 1, 100)
y_exact = 1 / (1 + t_exact**2)
plt.plot(t_exact, y_exact, 'r-', label='Exact solution')
plt.xlabel('t')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

## Stability Analysis

The Euler method's stability depends on the step size $h$ and the nature of the differential equation. For the test equation $y' = \lambda y$, the Euler method gives:

$$y_{n+1} = y_n + h\lambda y_n = (1 + h\lambda)y_n$$

For stability, we need $|1 + h\lambda| < 1$. When $\lambda < 0$ (a decaying solution), this requires:

$$h < \frac{2}{|\lambda|}$$

This stability restriction can be severe for stiff problems where $|\lambda|$ is very large, requiring impractically small step sizes.

## Key Takeaways

- The Euler method is a first-order method with global error $O(h)$
- It provides a simple, intuitive approach to solving ODEs by following tangent lines
- Local truncation error is $O(h^2)$ per step, but accumulates to $O(h)$ globally
- The method is conditionally stable with step size restrictions for stability
- Smaller step sizes improve accuracy but increase computational cost
- The method serves as the foundation for understanding more advanced ODE solvers
- It is best suited for educational purposes and quick prototyping, not production computing

## Common Mistakes

**Using too large a step size**: The most common error is selecting $h$ too large, leading to poor accuracy or instability. Always start with small $h$ and verify convergence by comparing solutions with different step sizes.

**Ignoring stability constraints**: For problems with rapidly decaying solutions or stiff equations, the step size may need to be much smaller than what accuracy alone would suggest.

**Applying to stiff equations**: The Euler method performs poorly on stiff differential equations due to severe stability restrictions. Use implicit methods instead.

**Confusing local and global error**: Remember that the $O(h^2)$ local truncation error accumulates to $O(h)$ global error over many steps.

**Not validating results**: Always compare with analytical solutions when available, or use solution with different step sizes to verify convergence.
