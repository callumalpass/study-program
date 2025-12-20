---
title: "Adaptive Step Size Control"
description: "Comprehensive guide to adaptive step size control with theoretical foundations and Python implementations"
---

# Adaptive Step Size Control

## Introduction

Adaptive step size control represents one of the most significant advances in practical ODE solving. Rather than using a fixed step size throughout the integration, adaptive methods automatically adjust the step size based on the local behavior of the solution. This approach increases step sizes in smooth regions where the solution is well-behaved and decreases them where the solution changes rapidly or has complex structure. The result is a dramatic improvement in efficiency, often reducing computational cost by orders of magnitude compared to fixed-step methods while maintaining accuracy.

The fundamental challenge in adaptive methods is estimating the local error without knowing the true solution. This is typically accomplished using embedded methods that compute two approximations of different orders using the same function evaluations, with the difference providing an error estimate. The most popular embedded methods include Runge-Kutta-Fehlberg (RK45) and Dormand-Prince (DP45), which are the workhorses of modern ODE solver libraries.

## Error Estimation

The key to adaptive step size control is estimating the local truncation error without computing the exact solution. For an embedded Runge-Kutta pair, we compute two approximations:

- A lower-order approximation: $\hat{y}_{n+1}$ of order $p$
- A higher-order approximation: $y_{n+1}$ of order $p+1$

The difference between these approximations estimates the local truncation error:

$$\text{EST} = |y_{n+1} - \hat{y}_{n+1}|$$

This estimate reflects the error in the lower-order method. For a $p$-th order method, the local error scales as $O(h^{p+1})$.

## Tolerance and Step Size Selection

The user specifies error tolerances:
- **Absolute tolerance** $\epsilon_{\text{abs}}$: acceptable error regardless of solution magnitude
- **Relative tolerance** $\epsilon_{\text{rel}}$: acceptable error as a fraction of the solution

The combined tolerance at step $n$ is:

$$\text{TOL}_n = \epsilon_{\text{abs}} + \epsilon_{\text{rel}} |y_n|$$

We accept the step if $\text{EST} \leq \text{TOL}_n$. If the estimate is too large, we reject the step and retry with a smaller $h$. If the estimate is much smaller than needed, we increase $h$ for the next step.

## Step Size Update Formula

Based on the error estimate, we update the step size using:

$$h_{\text{new}} = h \cdot \left(\frac{\text{TOL}}{\text{EST}}\right)^{1/(p+1)} \cdot S$$

where:
- $p$ is the order of the lower-order method
- $S$ is a safety factor (typically $0.8$ to $0.9$) to avoid repeated rejections
- The exponent $1/(p+1)$ comes from the error scaling with step size

In practice, we often limit the rate of change to prevent too aggressive adjustments:

$$h_{\text{new}} = h \cdot \max\left(f_{\min}, \min\left(f_{\max}, \left(\frac{\text{TOL}}{\text{EST}}\right)^{1/(p+1)} S\right)\right)$$

where $f_{\min} \approx 0.2$ and $f_{\max} \approx 5.0$ are typical bounds.

## Runge-Kutta-Fehlberg (RK45)

The RK45 method uses six function evaluations to compute both a fourth-order and fifth-order approximation. The coefficients are carefully chosen so that the fifth-order result uses the same function evaluations as the fourth-order result.

**Fourth-order approximation**:
$$\hat{y}_{n+1} = y_n + h\left(\frac{25}{216}k_1 + \frac{1408}{2565}k_3 + \frac{2197}{4104}k_4 - \frac{1}{5}k_5\right)$$

**Fifth-order approximation**:
$$y_{n+1} = y_n + h\left(\frac{16}{135}k_1 + \frac{6656}{12825}k_3 + \frac{28561}{56430}k_4 - \frac{9}{50}k_5 + \frac{2}{55}k_6\right)$$

The error estimate is:
$$\text{EST} = |y_{n+1} - \hat{y}_{n+1}|$$

The method advances using the more accurate fifth-order result.

## Worked Example

**Problem**: Use adaptive step size control to solve $y' = -y + \sin(t)$, $y(0) = 1$ with $\epsilon_{\text{rel}} = 10^{-6}$, $\epsilon_{\text{abs}} = 10^{-8}$, starting with $h = 0.1$.

**Solution** (first step):

Suppose we compute (using RK45 coefficients):
- $\hat{y}_1 = 0.9048$ (4th order)
- $y_1 = 0.9052$ (5th order)

**Error estimate**:
$$\text{EST} = |0.9052 - 0.9048| = 0.0004$$

**Tolerance**:
$$\text{TOL} = 10^{-8} + 10^{-6} \cdot |1| = 1.01 \times 10^{-6}$$

**Comparison**: $\text{EST} = 0.0004 > \text{TOL} = 1.01 \times 10^{-6}$

The step is rejected! We need a smaller step size.

**New step size** (using $p = 4$ and $S = 0.9$):
$$h_{\text{new}} = 0.1 \cdot \left(\frac{1.01 \times 10^{-6}}{0.0004}\right)^{1/5} \cdot 0.9$$
$$h_{\text{new}} = 0.1 \cdot (0.002525)^{0.2} \cdot 0.9 = 0.1 \cdot 0.303 \cdot 0.9 \approx 0.027$$

We retry with $h \approx 0.027$.

## Implementation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def rk45_step(f, t, y, h):
    """
    Perform one RK45 step with error estimate.

    Returns:
    --------
    y_new : float
        Fifth-order approximation
    y_hat : float
        Fourth-order approximation
    """
    # RK45 Butcher tableau
    k1 = f(t, y)
    k2 = f(t + h/4, y + h*k1/4)
    k3 = f(t + 3*h/8, y + h*(3*k1/32 + 9*k2/32))
    k4 = f(t + 12*h/13, y + h*(1932*k1/2197 - 7200*k2/2197 + 7296*k3/2197))
    k5 = f(t + h, y + h*(439*k1/216 - 8*k2 + 3680*k3/513 - 845*k4/4104))
    k6 = f(t + h/2, y + h*(-8*k1/27 + 2*k2 - 3544*k3/2565 + 1859*k4/4104 - 11*k5/40))

    # Fourth-order solution
    y_hat = y + h * (25*k1/216 + 1408*k3/2565 + 2197*k4/4104 - k5/5)

    # Fifth-order solution
    y_new = y + h * (16*k1/135 + 6656*k3/12825 + 28561*k4/56430 - 9*k5/50 + 2*k6/55)

    return y_new, y_hat

def adaptive_rk45(f, t0, y0, t_final, tol_abs=1e-8, tol_rel=1e-6, h_init=0.1):
    """
    Solve ODE using RK45 with adaptive step size control.

    Parameters:
    -----------
    f : function
        The derivative function f(t, y)
    t0 : float
        Initial time
    y0 : float
        Initial condition
    t_final : float
        Final time
    tol_abs : float
        Absolute tolerance
    tol_rel : float
        Relative tolerance
    h_init : float
        Initial step size

    Returns:
    --------
    t_points : list
        Time points (variable spacing)
    y_points : list
        Solution values
    """
    t = t0
    y = y0
    h = h_init
    t_points = [t0]
    y_points = [y0]

    safety = 0.9
    p = 4  # Order of lower method
    min_factor = 0.2
    max_factor = 5.0

    while t < t_final:
        # Don't overshoot
        if t + h > t_final:
            h = t_final - t

        # Try a step
        y_new, y_hat = rk45_step(f, t, y, h)

        # Estimate error
        error_est = abs(y_new - y_hat)
        tolerance = tol_abs + tol_rel * abs(y)

        if error_est <= tolerance:
            # Accept the step
            t += h
            y = y_new
            t_points.append(t)
            y_points.append(y)

        # Update step size for next iteration
        if error_est > 0:
            factor = safety * (tolerance / error_est) ** (1/(p+1))
            factor = max(min_factor, min(max_factor, factor))
            h = h * factor
        else:
            h = h * max_factor

    return np.array(t_points), np.array(y_points)

# Example: Solve y' = -y + sin(t), y(0) = 1
def f(t, y):
    return -y + np.sin(t)

t, y = adaptive_rk45(f, 0, 1, 10, tol_rel=1e-6)

# Plot solution and step sizes
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

ax1.plot(t, y, 'bo-', markersize=3, linewidth=1)
ax1.set_xlabel('t')
ax1.set_ylabel('y')
ax1.set_title('Solution with Adaptive Step Size')
ax1.grid(True)

# Plot step sizes
step_sizes = np.diff(t)
ax2.semilogy(t[:-1], step_sizes, 'ro-', markersize=3)
ax2.set_xlabel('t')
ax2.set_ylabel('Step size h')
ax2.set_title('Adaptive Step Sizes')
ax2.grid(True)

plt.tight_layout()
plt.show()

print(f"Total steps: {len(t)-1}")
print(f"Average step size: {np.mean(step_sizes):.4f}")
\`\`\`

## Key Takeaways

- Adaptive step size control dramatically improves efficiency by using large steps where possible
- Embedded Runge-Kutta methods compute two solutions of different orders using the same function evaluations
- The difference between approximations estimates the local truncation error
- Steps are accepted if the error estimate is below the tolerance, rejected otherwise
- Step size is adjusted using the error estimate to maintain the desired accuracy
- Safety factors and bounds prevent overly aggressive step size changes
- RK45 and DP45 are the most popular adaptive methods, used in MATLAB's ode45 and SciPy's solve_ivp
- Adaptive methods can be orders of magnitude more efficient than fixed-step methods

## Common Mistakes

**Setting tolerances too loose**: Overly relaxed tolerances can lead to inaccurate results, especially over long integration intervals where errors accumulate.

**Setting tolerances too tight**: Extremely tight tolerances may cause the step size to become impractically small, leading to excessive computation time and potential numerical issues.

**Ignoring absolute tolerance**: Using only relative tolerance can cause problems near zero where relative errors become meaningless. Always specify both tolerances.

**Not monitoring rejected steps**: A high rejection rate indicates the initial step size is too large or the tolerances are very tight. Monitor rejection statistics.

**Comparing adaptive solutions at different times**: Since adaptive methods produce solutions at irregular time points, comparing solutions requires interpolation or careful consideration of output times.
