---
title: "Numerical Methods for ODEs"
---

# Numerical Methods for ODEs

## Introduction

While many differential equations can be solved analytically, most real-world problems require numerical methods. Numerical techniques approximate solutions at discrete points, allowing us to solve nonlinear equations, systems with variable coefficients, and problems without closed-form solutions. Understanding these methods is essential for practical applications in science and engineering.

## Initial Value Problems

Consider the general first-order initial value problem (IVP):

$$\frac{dy}{dt} = f(t, y), \quad y(t_0) = y_0$$

We seek to approximate $y(t)$ at discrete points $t_1, t_2, \ldots, t_n$.

## Euler's Method

### The Basic Algorithm

Euler's method is the simplest numerical technique, based on linear approximation.

Given step size $h$, compute:

$$y_{n+1} = y_n + hf(t_n, y_n)$$

where $t_n = t_0 + nh$.

This approximates the solution using the tangent line at each step.

### Derivation

From Taylor expansion:

$$y(t + h) = y(t) + hy'(t) + O(h^2)$$

Since $y'(t) = f(t, y(t))$:

$$y(t + h) \approx y(t) + hf(t, y(t))$$

### Example: Euler's Method

Solve $\frac{dy}{dt} = y$, $y(0) = 1$ from $t = 0$ to $t = 1$ with $h = 0.2$.

Exact solution: $y(t) = e^t$

| $n$ | $t_n$ | $y_n$ (Euler) | $e^{t_n}$ (exact) | Error |
|-----|-------|---------------|-------------------|-------|
| 0 | 0.0 | 1.0000 | 1.0000 | 0.0000 |
| 1 | 0.2 | 1.2000 | 1.2214 | 0.0214 |
| 2 | 0.4 | 1.4400 | 1.4918 | 0.0518 |
| 3 | 0.6 | 1.7280 | 1.8221 | 0.0941 |
| 4 | 0.8 | 2.0736 | 2.2255 | 0.1519 |
| 5 | 1.0 | 2.4883 | 2.7183 | 0.2300 |

Calculations:
- $y_1 = 1 + 0.2(1) = 1.2$
- $y_2 = 1.2 + 0.2(1.2) = 1.44$
- $y_3 = 1.44 + 0.2(1.44) = 1.728$
- etc.

### Error Analysis

**Local truncation error** (error in one step): $O(h^2)$

**Global error** (accumulated error after $n$ steps): $O(h)$

Euler's method is **first-order accurate**: halving $h$ roughly halves the error.

### Limitations

- Low accuracy (first-order)
- Can be unstable for stiff equations
- Requires very small step size for acceptable accuracy

## Improved Euler Method (Heun's Method)

### Algorithm

Uses a predictor-corrector approach:

**Predictor**:

$$\tilde{y}_{n+1} = y_n + hf(t_n, y_n)$$

**Corrector**:

$$y_{n+1} = y_n + \frac{h}{2}[f(t_n, y_n) + f(t_{n+1}, \tilde{y}_{n+1})]$$

This averages the slopes at the beginning and predicted end of the interval.

### Example

Same problem: $\frac{dy}{dt} = y$, $y(0) = 1$, $h = 0.2$

First step:
- Predictor: $\tilde{y}_1 = 1 + 0.2(1) = 1.2$
- Corrector: $y_1 = 1 + \frac{0.2}{2}[1 + 1.2] = 1 + 0.22 = 1.22$

Compare: exact $e^{0.2} \approx 1.2214$ (much better than Euler's 1.2!)

### Accuracy

Global error: $O(h^2)$ (second-order method)

## Runge-Kutta Methods

### Fourth-Order Runge-Kutta (RK4)

The most widely used numerical method for ODEs, balancing accuracy and computational cost.

**Algorithm**:

$$k_1 = f(t_n, y_n)$$

$$k_2 = f\left(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_1\right)$$

$$k_3 = f\left(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_2\right)$$

$$k_4 = f(t_n + h, y_n + hk_3)$$

$$y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

The $k_i$ represent slopes at different points, and the final formula is a weighted average.

### Interpretation

- $k_1$: slope at beginning of interval
- $k_2$: slope at midpoint using $k_1$
- $k_3$: improved slope at midpoint using $k_2$
- $k_4$: slope at end using $k_3$
- Weighted average emphasizes midpoint slopes

### Example: RK4

Same problem: $\frac{dy}{dt} = y$, $y(0) = 1$, $h = 0.2$

$$k_1 = 1$$

$$k_2 = y_0 + \frac{0.2}{2}(1) = 1.1$$

$$k_3 = y_0 + \frac{0.2}{2}(1.1) = 1.11$$

$$k_4 = y_0 + 0.2(1.11) = 1.222$$

$$y_1 = 1 + \frac{0.2}{6}(1 + 2(1.1) + 2(1.11) + 1.222)$$

$$= 1 + \frac{0.2}{6}(6.642) = 1 + 0.2214 = 1.2214$$

Exact: $e^{0.2} = 1.2214$ (agreement to 4 decimal places!)

### Accuracy

Global error: $O(h^4)$ (fourth-order method)

Extremely accurate for smooth functions; industry standard for general ODE solving.

### Comparison for $y' = y$, $y(0) = 1$, $t = 1$

| Method | $h = 0.2$ | $h = 0.1$ | Exact |
|--------|-----------|-----------|-------|
| Euler | 2.4883 | 2.5937 | 2.7183 |
| Improved Euler | 2.6533 | 2.7048 | 2.7183 |
| RK4 | 2.7183 | 2.7183 | 2.7183 |

RK4 achieves full accuracy even with relatively large step size!

## Systems of Differential Equations

Numerical methods extend naturally to systems.

For:

$$\frac{dy_1}{dt} = f_1(t, y_1, y_2), \quad \frac{dy_2}{dt} = f_2(t, y_1, y_2)$$

**Euler for systems**:

$$y_{1,n+1} = y_{1,n} + hf_1(t_n, y_{1,n}, y_{2,n})$$

$$y_{2,n+1} = y_{2,n} + hf_2(t_n, y_{1,n}, y_{2,n})$$

**RK4 for systems**: Apply the RK4 formula to each component simultaneously.

### Example: Predator-Prey

$$\frac{dx}{dt} = 2x - 0.01xy, \quad \frac{dy}{dt} = -y + 0.005xy$$

with $x(0) = 100, y(0) = 20$.

Using RK4 with small step size produces accurate trajectories showing the characteristic population cycles.

## Higher-Order Equations

Convert to first-order system:

For $y'' = f(t, y, y')$:

Let $u = y, v = y'$:

$$\frac{du}{dt} = v$$

$$\frac{dv}{dt} = f(t, u, v)$$

Then apply numerical methods to the system.

### Example: Second-Order ODE

Solve $y'' + y = 0$, $y(0) = 0, y'(0) = 1$

System: $u' = v, v' = -u$ with $u(0) = 0, v(0) = 1$

Apply RK4 to both equations.

## Error Control and Adaptive Methods

### Sources of Error

1. **Truncation error**: From approximating derivatives
2. **Roundoff error**: From finite precision arithmetic

### Adaptive Step Size

Sophisticated methods (like RK45) adjust $h$ dynamically:
- Increase $h$ when error is small (efficiency)
- Decrease $h$ when error is large (accuracy)

**Error estimation**: Compare results from methods of different orders.

### Example: Runge-Kutta-Fehlberg (RK45)

Uses both 4th and 5th order formulas:
- 5th order for accurate solution
- Difference estimates error
- Adjusts $h$ to maintain error tolerance

Most modern ODE solvers use adaptive methods.

## Stability

### Definition

A numerical method is **stable** if errors do not grow unboundedly.

### Stiff Equations

Equations with widely different time scales (e.g., $y' = -1000y + 999e^{-t}$).

Explicit methods (Euler, RK4) require very small $h$ for stability.

**Implicit methods** (backward Euler, BDF) handle stiff equations better:

$$y_{n+1} = y_n + hf(t_{n+1}, y_{n+1})$$

Requires solving (possibly nonlinear) equation for $y_{n+1}$ at each step.

## Practical Considerations

### Choosing a Method

- **Euler**: Educational purposes, quick rough estimates
- **RK4**: General-purpose, good accuracy, reasonable cost
- **Adaptive RK**: Production code, automatic error control
- **Implicit methods**: Stiff equations

### Software

Modern software (MATLAB `ode45`, Python `scipy.integrate.solve_ivp`, etc.) uses sophisticated adaptive methods with error control.

### Example: MATLAB

```matlab
[t, y] = ode45(@(t,y) -2*y, [0 5], 1);
plot(t, y);
```

### Verification

Always verify numerical solutions:
1. Check against known solutions when available
2. Reduce $h$ and confirm convergence
3. Use conservation laws or invariants
4. Compare different methods

## Example Application: Projectile with Drag

$$\frac{dv_x}{dt} = -cv_x\sqrt{v_x^2+v_y^2}$$

$$\frac{dv_y}{dt} = -g - cv_y\sqrt{v_x^2+v_y^2}$$

where $c$ is drag coefficient. No analytical solution; requires numerics.

## Summary

| Method | Order | Error per step | Global Error | Effort/step |
|--------|-------|----------------|--------------|-------------|
| Euler | 1 | $O(h^2)$ | $O(h)$ | 1 evaluation |
| Improved Euler | 2 | $O(h^3)$ | $O(h^2)$ | 2 evaluations |
| RK4 | 4 | $O(h^5)$ | $O(h^4)$ | 4 evaluations |

**Key Points**:
- Higher-order methods achieve better accuracy with larger step sizes
- RK4 is the standard workhorse method
- Adaptive methods provide automatic error control
- Stiff equations require special implicit methods
- Always verify numerical results

Numerical methods are indispensable tools for solving differential equations in practice, enabling analysis of systems far beyond the reach of analytical techniques.
