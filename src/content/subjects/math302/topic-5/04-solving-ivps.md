---
title: "Solving Initial Value Problems with Laplace Transforms"
---

# Solving Initial Value Problems with Laplace Transforms

## Introduction

The Laplace transform method provides an efficient algebraic approach to solving initial value problems (IVPs) for linear differential equations with constant coefficients. The method transforms the differential equation into an algebraic equation, solves for the transform of the solution, and then applies the inverse transform to obtain the solution in the time domain.

## The General Strategy

To solve an IVP using Laplace transforms:

1. **Take the Laplace transform** of both sides of the differential equation
2. **Use the initial conditions** to simplify the transformed equation
3. **Solve algebraically** for $Y(s) = \mathcal{L}\{y(t)\}$
4. **Find the inverse transform** to obtain $y(t) = \mathcal{L}^{-1}\{Y(s)\}$

This method is particularly powerful because initial conditions are automatically incorporated in step 2, eliminating the need to solve for arbitrary constants.

## First-Order Linear Equations

### Standard Form

Consider the IVP:

$$y' + ay = f(t), \quad y(0) = y_0$$

where $a$ is a constant and $f(t)$ is a given function.

### Solution Method

Taking the Laplace transform of both sides:

$$\mathcal{L}\{y'\} + a\mathcal{L}\{y\} = \mathcal{L}\{f(t)\}$$

Using the derivative property $\mathcal{L}\{y'\} = sY(s) - y(0)$:

$$sY(s) - y_0 + aY(s) = F(s)$$

$$Y(s)(s + a) = F(s) + y_0$$

$$Y(s) = \frac{F(s) + y_0}{s + a}$$

Finally, apply the inverse transform to find $y(t)$.

### Example 1

Solve $y' + 2y = e^{3t}$ with $y(0) = 1$.

Transform both sides:

$$sY(s) - 1 + 2Y(s) = \frac{1}{s-3}$$

$$Y(s)(s+2) = \frac{1}{s-3} + 1 = \frac{1 + s - 3}{s-3} = \frac{s-2}{s-3}$$

$$Y(s) = \frac{s-2}{(s+2)(s-3)}$$

Using partial fractions:

$$\frac{s-2}{(s+2)(s-3)} = \frac{A}{s+2} + \frac{B}{s-3}$$

$$s-2 = A(s-3) + B(s+2)$$

Setting $s = 3$: $1 = 5B$, so $B = \frac{1}{5}$

Setting $s = -2$: $-4 = -5A$, so $A = \frac{4}{5}$

$$Y(s) = \frac{4/5}{s+2} + \frac{1/5}{s-3}$$

$$y(t) = \frac{4}{5}e^{-2t} + \frac{1}{5}e^{3t}$$

### Example 2

Solve $y' - y = \sin(t)$ with $y(0) = 0$.

Transform:

$$sY(s) - 0 - Y(s) = \frac{1}{s^2+1}$$

$$Y(s)(s-1) = \frac{1}{s^2+1}$$

$$Y(s) = \frac{1}{(s-1)(s^2+1)}$$

Partial fractions:

$$\frac{1}{(s-1)(s^2+1)} = \frac{A}{s-1} + \frac{Bs+C}{s^2+1}$$

$$1 = A(s^2+1) + (Bs+C)(s-1)$$

Setting $s = 1$: $1 = 2A$, so $A = \frac{1}{2}$

Setting $s = 0$: $1 = A - C$, so $C = A - 1 = -\frac{1}{2}$

Setting $s = -1$: $1 = 2A + (-B+C)(-2) = 1 + 2B - 2C = 1 + 2B + 1$, so $B = -\frac{1}{2}$

$$Y(s) = \frac{1/2}{s-1} - \frac{1/2} \cdot \frac{s+1}{s^2+1} = \frac{1/2}{s-1} - \frac{1/2} \cdot \frac{s}{s^2+1} - \frac{1/2} \cdot \frac{1}{s^2+1}$$

$$y(t) = \frac{1}{2}e^t - \frac{1}{2}\cos(t) - \frac{1}{2}\sin(t) = \frac{1}{2}[e^t - \cos(t) - \sin(t)]$$

## Second-Order Linear Equations

### Standard Form

Consider:

$$ay'' + by' + cy = f(t), \quad y(0) = y_0, \quad y'(0) = y_1$$

### Solution Method

Taking Laplace transforms:

$$a[s^2Y(s) - sy_0 - y_1] + b[sY(s) - y_0] + cY(s) = F(s)$$

$$Y(s)[as^2 + bs + c] = F(s) + (as + b)y_0 + ay_1$$

$$Y(s) = \frac{F(s) + (as + b)y_0 + ay_1}{as^2 + bs + c}$$

### Example 3: Homogeneous Equation

Solve $y'' + 4y' + 3y = 0$ with $y(0) = 2, y'(0) = -1$.

Transform:

$$[s^2Y(s) - 2s + 1] + 4[sY(s) - 2] + 3Y(s) = 0$$

$$s^2Y(s) - 2s + 1 + 4sY(s) - 8 + 3Y(s) = 0$$

$$Y(s)[s^2 + 4s + 3] = 2s + 7$$

$$Y(s) = \frac{2s + 7}{s^2 + 4s + 3} = \frac{2s + 7}{(s+1)(s+3)}$$

Partial fractions:

$$\frac{2s+7}{(s+1)(s+3)} = \frac{A}{s+1} + \frac{B}{s+3}$$

$$2s+7 = A(s+3) + B(s+1)$$

Setting $s = -1$: $5 = 2A$, so $A = \frac{5}{2}$

Setting $s = -3$: $1 = -2B$, so $B = -\frac{1}{2}$

$$y(t) = \frac{5}{2}e^{-t} - \frac{1}{2}e^{-3t}$$

### Example 4: Non-homogeneous Equation

Solve $y'' - 3y' + 2y = e^{-t}$ with $y(0) = 1, y'(0) = 0$.

Transform:

$$[s^2Y(s) - s] - 3[sY(s) - 1] + 2Y(s) = \frac{1}{s+1}$$

$$s^2Y(s) - s - 3sY(s) + 3 + 2Y(s) = \frac{1}{s+1}$$

$$Y(s)[s^2 - 3s + 2] = s - 3 + \frac{1}{s+1}$$

$$Y(s)(s-1)(s-2) = \frac{(s-3)(s+1) + 1}{s+1} = \frac{s^2 - 2s - 2}{s+1}$$

$$Y(s) = \frac{s^2 - 2s - 2}{(s+1)(s-1)(s-2)}$$

Partial fractions:

$$\frac{s^2-2s-2}{(s+1)(s-1)(s-2)} = \frac{A}{s+1} + \frac{B}{s-1} + \frac{C}{s-2}$$

Setting $s = -1$: $1 = (-2)(-3)A = 6A$, so $A = \frac{1}{6}$

Setting $s = 1$: $-3 = 2(-1)B = -2B$, so $B = \frac{3}{2}$

Setting $s = 2$: $-2 = 3(1)C = 3C$, so $C = -\frac{2}{3}$

$$y(t) = \frac{1}{6}e^{-t} + \frac{3}{2}e^t - \frac{2}{3}e^{2t}$$

## Oscillatory Systems

### Example 5: Undamped Oscillator

Solve $y'' + \omega^2 y = 0$ with $y(0) = A, y'(0) = 0$.

Transform:

$$s^2Y(s) - sA + \omega^2Y(s) = 0$$

$$Y(s) = \frac{sA}{s^2 + \omega^2}$$

$$y(t) = A\cos(\omega t)$$

### Example 6: Forced Oscillator

Solve $y'' + y = \sin(2t)$ with $y(0) = 0, y'(0) = 1$.

Transform:

$$[s^2Y(s) - 1] + Y(s) = \frac{2}{s^2+4}$$

$$Y(s)(s^2+1) = 1 + \frac{2}{s^2+4}$$

$$Y(s) = \frac{1}{s^2+1} + \frac{2}{(s^2+1)(s^2+4)}$$

For the second term, use partial fractions:

$$\frac{2}{(s^2+1)(s^2+4)} = \frac{As+B}{s^2+1} + \frac{Cs+D}{s^2+4}$$

$$2 = (As+B)(s^2+4) + (Cs+D)(s^2+1)$$

By comparing coefficients: $A = 0, B = \frac{2}{3}, C = 0, D = -\frac{2}{3}$

$$Y(s) = \frac{1}{s^2+1} + \frac{2/3}{s^2+1} - \frac{2/3}{s^2+4}$$

$$= \frac{5/3}{s^2+1} - \frac{1/3} \cdot \frac{2}{s^2+4}$$

$$y(t) = \frac{5}{3}\sin(t) - \frac{1}{3}\sin(2t)$$

## Advantages of the Laplace Transform Method

1. **Automatic incorporation of initial conditions**: No need to solve for arbitrary constants afterward
2. **Handles discontinuous forcing functions** naturally (using step functions)
3. **Converts differential equations to algebra**: Easier to manipulate
4. **Systematic approach**: Works the same way for all linear constant-coefficient equations
5. **Handles impulse inputs** (delta functions) elegantly

## When to Use Laplace Transforms

The method is particularly effective for:

- Linear equations with constant coefficients
- Problems with discontinuous or piecewise forcing functions
- Systems with impulsive inputs
- Problems where initial conditions are given at $t = 0$

## Limitations

- Not suitable for variable coefficient equations (in general)
- Initial conditions must be at $t = 0$
- Requires proficiency with partial fractions and inverse transforms
- May be cumbersome for nonlinear equations

## Summary

The Laplace transform method transforms the problem of solving differential equations into an algebraic problem. The key steps are:

1. Transform the equation and initial conditions
2. Solve for $Y(s)$ algebraically
3. Use partial fractions to decompose $Y(s)$
4. Apply inverse transform to obtain $y(t)$

This systematic approach makes solving linear IVPs straightforward and is especially powerful for equations with discontinuous or impulsive forcing terms.
