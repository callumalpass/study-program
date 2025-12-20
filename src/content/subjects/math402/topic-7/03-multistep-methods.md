---
title: "Multistep Methods"
description: "Comprehensive guide to multistep methods with theoretical foundations and Python implementations"
---

# Multistep Methods

## Introduction

Multistep methods represent a different paradigm for solving ordinary differential equations compared to Runge-Kutta methods. Instead of evaluating the derivative function multiple times at intermediate points within a single step, multistep methods use information from several previous steps to compute the next solution value. This approach can achieve high accuracy with fewer function evaluations per step, making them computationally efficient for problems where function evaluations are expensive.

The two main families of multistep methods are Adams methods and backward differentiation formulas (BDF). Adams methods come in explicit (Adams-Bashforth) and implicit (Adams-Moulton) variants, while BDF methods are particularly effective for stiff differential equations. The key trade-off is that multistep methods are not self-starting and require a single-step method like Runge-Kutta to generate the initial values.

## General Form of Multistep Methods

A general $k$-step linear multistep method has the form:

$$\sum_{j=0}^{k} \alpha_j y_{n+j} = h \sum_{j=0}^{k} \beta_j f_{n+j}$$

where $f_{n+j} = f(t_{n+j}, y_{n+j})$. The method is:
- **Explicit** if $\beta_k = 0$ (the new value $y_{n+k}$ appears only on the left side)
- **Implicit** if $\beta_k \neq 0$ (the new value appears in $f_{n+k}$ on the right side)

The choice of coefficients $\alpha_j$ and $\beta_j$ determines the specific method and its order of accuracy.

## Adams-Bashforth Methods (Explicit)

Adams-Bashforth methods are explicit multistep methods that use past values to extrapolate forward. The most commonly used are:

**Two-step Adams-Bashforth (AB2)**:
$$y_{n+1} = y_n + \frac{h}{2}(3f_n - f_{n-1})$$

This method is second-order accurate and requires values at $t_n$ and $t_{n-1}$.

**Three-step Adams-Bashforth (AB3)**:
$$y_{n+1} = y_n + \frac{h}{12}(23f_n - 16f_{n-1} + 5f_{n-2})$$

This is third-order accurate and requires three previous points.

**Four-step Adams-Bashforth (AB4)**:
$$y_{n+1} = y_n + \frac{h}{24}(55f_n - 59f_{n-1} + 37f_{n-2} - 9f_{n-3})$$

This is fourth-order accurate, matching RK4's order while requiring only one function evaluation per step (after initialization).

## Adams-Moulton Methods (Implicit)

Adams-Moulton methods are implicit variants that include the function evaluation at the new point, generally providing better stability:

**Two-step Adams-Moulton (AM2, Trapezoidal Rule)**:
$$y_{n+1} = y_n + \frac{h}{2}(f_{n+1} + f_n)$$

This is second-order accurate and identical to the trapezoidal rule.

**Three-step Adams-Moulton (AM3)**:
$$y_{n+1} = y_n + \frac{h}{12}(5f_{n+1} + 8f_n - f_{n-1})$$

This is third-order accurate with improved stability over AB3.

Since implicit methods require solving a nonlinear equation at each step, they are often used in predictor-corrector pairs with Adams-Bashforth methods.

## Predictor-Corrector Methods

A common strategy combines explicit and implicit methods in a predictor-corrector scheme:

1. **Predict**: Use an explicit method (e.g., AB4) to get an initial estimate $y_{n+1}^{(0)}$
2. **Evaluate**: Compute $f_{n+1}^{(0)} = f(t_{n+1}, y_{n+1}^{(0)})$
3. **Correct**: Use an implicit method (e.g., AM4) with the predicted value to refine the solution
4. **Iterate**: Optionally repeat steps 2-3 until convergence

This approach combines the simplicity of explicit methods with the stability of implicit methods.

## Worked Example

**Problem**: Solve $y' = -y + t + 1$ with $y(0) = 1$ using the three-step Adams-Bashforth method with $h = 0.1$ for one step starting from $t = 0.3$ (assume we have $y_1 = 1.09516$, $y_2 = 1.18127$, $y_3 = 1.25918$).

**Solution**:

We need to compute $y_4$ at $t_4 = 0.4$ using AB3:

$$y_{n+1} = y_n + \frac{h}{12}(23f_n - 16f_{n-1} + 5f_{n-2})$$

**Step 1**: Calculate function values at previous points:

$$f_3 = f(0.3, 1.25918) = -1.25918 + 0.3 + 1 = 0.04082$$
$$f_2 = f(0.2, 1.18127) = -1.18127 + 0.2 + 1 = 0.01873$$
$$f_1 = f(0.1, 1.09516) = -1.09516 + 0.1 + 1 = 0.00484$$

**Step 2**: Apply the AB3 formula:

$$y_4 = 1.25918 + \frac{0.1}{12}(23(0.04082) - 16(0.01873) + 5(0.00484))$$
$$y_4 = 1.25918 + \frac{0.1}{12}(0.93886 - 0.29968 + 0.02420)$$
$$y_4 = 1.25918 + \frac{0.1}{12}(0.66338)$$
$$y_4 = 1.25918 + 0.00553 = 1.26471$$

The exact solution is $y(t) = t + e^{-t}$, giving $y(0.4) = 1.27032$. The error is about 0.00561.

## Implementation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def rk4_startup(f, t0, y0, h, n_steps):
    """Generate initial values using RK4 for multistep methods."""
    t = np.zeros(n_steps)
    y = np.zeros(n_steps)
    t[0] = t0
    y[0] = y0

    for i in range(n_steps - 1):
        k1 = f(t[i], y[i])
        k2 = f(t[i] + h/2, y[i] + h*k1/2)
        k3 = f(t[i] + h/2, y[i] + h*k2/2)
        k4 = f(t[i] + h, y[i] + h*k3)
        y[i+1] = y[i] + (h/6) * (k1 + 2*k2 + 2*k3 + k4)
        t[i+1] = t[i] + h

    return t, y

def adams_bashforth_4(f, t0, y0, t_final, h):
    """
    Solve ODE using four-step Adams-Bashforth method.

    Parameters:
    -----------
    f : function
        The function f(t, y) defining the ODE y' = f(t, y)
    t0 : float
        Initial time
    y0 : float
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
        Solution values
    """
    n_steps = int((t_final - t0) / h)
    t = np.zeros(n_steps + 1)
    y = np.zeros(n_steps + 1)

    # Use RK4 to generate first 4 values
    t_start, y_start = rk4_startup(f, t0, y0, h, 4)
    t[:4] = t_start
    y[:4] = y_start

    # Store function evaluations
    fn = [f(t[i], y[i]) for i in range(4)]

    # Adams-Bashforth steps
    for i in range(3, n_steps):
        # AB4 formula
        y[i+1] = y[i] + (h/24) * (55*fn[3] - 59*fn[2] + 37*fn[1] - 9*fn[0])
        t[i+1] = t[i] + h

        # Update stored function values
        fn[0] = fn[1]
        fn[1] = fn[2]
        fn[2] = fn[3]
        fn[3] = f(t[i+1], y[i+1])

    return t, y

# Example: Solve y' = -y + t + 1, y(0) = 1
def f(t, y):
    return -y + t + 1

t, y = adams_bashforth_4(f, 0, 1, 2, 0.1)

# Compare with exact solution
t_exact = np.linspace(0, 2, 100)
y_exact = t_exact + np.exp(-t_exact)

plt.plot(t, y, 'bo-', label='AB4 method', markersize=4)
plt.plot(t_exact, y_exact, 'r-', label='Exact solution')
plt.xlabel('t')
plt.ylabel('y')
plt.title('Adams-Bashforth 4 vs Exact Solution')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

## Stability and Convergence

The stability of multistep methods is more complex than single-step methods. A multistep method must satisfy two conditions:

**Consistency**: The local truncation error must approach zero as $h \to 0$.

**Zero-stability**: The method must not amplify errors from previous steps, which requires that all roots of the characteristic polynomial satisfy $|\rho| \leq 1$, with roots of magnitude 1 being simple.

The Dahlquist stability theorem states that explicit multistep methods cannot have order greater than their step number plus one while maintaining stability.

## Key Takeaways

- Multistep methods use information from multiple previous steps to compute the next value
- Adams-Bashforth methods are explicit and easier to implement but less stable
- Adams-Moulton methods are implicit with better stability properties
- Predictor-corrector schemes combine the best of explicit and implicit approaches
- Multistep methods are more efficient per step than Runge-Kutta but require startup values
- AB4 achieves fourth-order accuracy with only one function evaluation per step
- Zero-stability is crucial and limits the maximum order of explicit multistep methods
- BDF methods (not covered here) are particularly effective for stiff problems

## Common Mistakes

**Forgetting to generate startup values**: Multistep methods require $k$ previous values before they can start. Always use a reliable single-step method like RK4 for initialization.

**Using inconsistent step sizes**: Multistep methods with variable coefficients assume uniform step sizes. Changing $h$ during integration requires restarting the method.

**Ignoring zero-stability**: High-order multistep methods may be zero-unstable, causing solutions to diverge even with small step sizes. Always verify stability properties.

**Improper predictor-corrector iteration**: In predictor-corrector methods, iterating too many times wastes computation, while too few iterations sacrifices accuracy.

**Applying explicit methods to stiff problems**: Adams-Bashforth methods have limited stability regions and perform poorly on stiff equations. Use implicit methods or BDF instead.
