---
title: "Step Functions and Piecewise Inputs"
---

# Step Functions and Piecewise Inputs

## Introduction

Many physical systems are subject to inputs that change abruptly or are applied only during specific time intervals. Examples include switches being turned on or off, forces applied for limited durations, or inputs that change value at specific times. The unit step function (Heaviside function) and its Laplace transform properties provide elegant tools for handling such piecewise-defined forcing functions.

## The Unit Step Function

### Definition

The unit step function, denoted $u(t)$ or $H(t)$ (Heaviside function), is defined as:

$$u(t) = \begin{cases} 0 & t < 0 \\ 1 & t \geq 0 \end{cases}$$

More generally, the shifted unit step function is:

$$u(t-a) = \begin{cases} 0 & t < a \\ 1 & t \geq a \end{cases}$$

This function "turns on" at $t = a$.

### Properties

1. $u(t-a) \cdot u(t-b) = u(t-\max(a,b))$
2. $1 - u(t-a)$ is a function that "turns off" at $t = a$
3. $u(t-a) - u(t-b)$ creates a "window" function (equals 1 for $a \leq t < b$, 0 otherwise)

## Laplace Transform of the Unit Step Function

### Basic Transform

$$\mathcal{L}\{u(t-a)\} = \int_0^{\infty} e^{-st} u(t-a) \, dt = \int_a^{\infty} e^{-st} \, dt = \frac{e^{-as}}{s}, \quad s > 0$$

For $a = 0$:

$$\mathcal{L}\{u(t)\} = \mathcal{L}\{1\} = \frac{1}{s}$$

### Second Translation Theorem

This is the key property for handling time-shifted functions.

**Theorem**: If $\mathcal{L}\{f(t)\} = F(s)$, then:

$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s), \quad a \geq 0$$

**Inverse form**:

$$\mathcal{L}^{-1}\{e^{-as}F(s)\} = f(t-a)u(t-a)$$

The theorem states that multiplying $F(s)$ by $e^{-as}$ corresponds to shifting $f(t)$ to the right by $a$ units and turning it on at $t = a$.

### Example 1

Find $\mathcal{L}\{(t-2)^3 u(t-2)\}$.

Let $f(t) = t^3$, so $F(s) = \frac{6}{s^4}$. Then:

$$\mathcal{L}\{(t-2)^3 u(t-2)\} = e^{-2s} \cdot \frac{6}{s^4}$$

### Example 2

Find $\mathcal{L}^{-1}\left\{\frac{e^{-3s}}{s^2+1}\right\}$.

Since $\mathcal{L}^{-1}\left\{\frac{1}{s^2+1}\right\} = \sin(t)$:

$$\mathcal{L}^{-1}\left\{\frac{e^{-3s}}{s^2+1}\right\} = \sin(t-3)u(t-3)$$

This is a sine wave that starts at $t = 3$.

## Piecewise Continuous Functions

### Expressing Piecewise Functions Using Step Functions

A piecewise function can be written as a sum involving step functions.

**Example**: Express the following function using step functions:

$$f(t) = \begin{cases} 0 & 0 \leq t < 2 \\ 3 & 2 \leq t < 5 \\ 1 & t \geq 5 \end{cases}$$

Solution:

$$f(t) = 3u(t-2) - 2u(t-5)$$

or equivalently:

$$f(t) = 3[u(t-2) - u(t-5)] + u(t-5)$$

### Rectangular Pulse

A pulse that is "on" between $t = a$ and $t = b$ can be written as:

$$\text{pulse}(t) = u(t-a) - u(t-b)$$

For a pulse of height $h$:

$$f(t) = h[u(t-a) - u(t-b)]$$

The Laplace transform is:

$$\mathcal{L}\{h[u(t-a) - u(t-b)]\} = h\left(\frac{e^{-as}}{s} - \frac{e^{-bs}}{s}\right) = \frac{h(e^{-as} - e^{-bs})}{s}$$

## Solving Differential Equations with Step Functions

### Example 3: Step Input

Solve $y'' + y = u(t-\pi)$ with $y(0) = 0, y'(0) = 0$.

Taking Laplace transforms:

$$s^2Y(s) + Y(s) = \frac{e^{-\pi s}}{s}$$

$$Y(s) = \frac{e^{-\pi s}}{s(s^2+1)}$$

Use partial fractions on $\frac{1}{s(s^2+1)}$:

$$\frac{1}{s(s^2+1)} = \frac{A}{s} + \frac{Bs+C}{s^2+1}$$

$$1 = A(s^2+1) + (Bs+C)s$$

Setting $s = 0$: $A = 1$

Comparing coefficients: $B = -1, C = 0$

$$\frac{1}{s(s^2+1)} = \frac{1}{s} - \frac{s}{s^2+1}$$

Therefore:

$$Y(s) = e^{-\pi s}\left[\frac{1}{s} - \frac{s}{s^2+1}\right]$$

Using the second translation theorem:

$$y(t) = [1 - \cos(t-\pi)]u(t-\pi)$$

Since $\cos(t-\pi) = -\cos(t)$:

$$y(t) = [1 + \cos(t)]u(t-\pi)$$

This means the system is at rest until $t = \pi$, then oscillates with a vertical shift.

### Example 4: Piecewise Forcing Function

Solve $y' + y = f(t)$ with $y(0) = 0$, where:

$$f(t) = \begin{cases} 1 & 0 \leq t < 1 \\ 0 & t \geq 1 \end{cases}$$

Express $f(t) = u(t) - u(t-1)$ or simply $f(t) = 1 - u(t-1)$ for $t \geq 0$.

Taking transforms:

$$sY(s) + Y(s) = \frac{1}{s} - \frac{e^{-s}}{s}$$

$$Y(s) = \frac{1 - e^{-s}}{s(s+1)}$$

Using partial fractions on $\frac{1}{s(s+1)}$:

$$\frac{1}{s(s+1)} = \frac{1}{s} - \frac{1}{s+1}$$

$$Y(s) = (1-e^{-s})\left[\frac{1}{s} - \frac{1}{s+1}\right] = \frac{1}{s} - \frac{1}{s+1} - e^{-s}\left[\frac{1}{s} - \frac{1}{s+1}\right]$$

$$y(t) = (1 - e^{-t}) - (1 - e^{-(t-1)})u(t-1)$$

For $0 \leq t < 1$: $y(t) = 1 - e^{-t}$

For $t \geq 1$: $y(t) = 1 - e^{-t} - 1 + e^{-(t-1)} = e^{-(t-1)} - e^{-t} = e^{-t}(e - 1)$

### Example 5: Multiple Discontinuities

Solve $y'' + 4y = g(t)$ with $y(0) = 0, y'(0) = 0$, where:

$$g(t) = \begin{cases} 0 & 0 \leq t < \pi \\ \sin(t) & \pi \leq t < 2\pi \\ 0 & t \geq 2\pi \end{cases}$$

Express using step functions:

$$g(t) = \sin(t)[u(t-\pi) - u(t-2\pi)]$$

This can be rewritten by noting that we need $\sin(t)$ to match $\sin(t-\pi + \pi) = \sin((t-\pi) + \pi) = -\sin(t-\pi)$:

Actually, it's easier to write:

$$g(t) = \sin(t)u(t-\pi) - \sin(t)u(t-2\pi)$$

But for the Laplace transform, we need functions of $(t-a)$ with $u(t-a)$. Using $\sin(t) = -\sin(t-\pi)$ for $t \geq \pi$:

$$g(t) = -\sin(t-\pi)u(t-\pi) + \sin(t-2\pi)u(t-2\pi)$$

Taking transforms:

$$s^2Y(s) + 4Y(s) = -e^{-\pi s} \cdot \frac{1}{s^2+1} + e^{-2\pi s} \cdot \frac{1}{s^2+1}$$

$$Y(s) = \frac{-e^{-\pi s} + e^{-2\pi s}}{(s^2+1)(s^2+4)}$$

Using partial fractions:

$$\frac{1}{(s^2+1)(s^2+4)} = \frac{As+B}{s^2+1} + \frac{Cs+D}{s^2+4}$$

Solving: $A = 0, B = \frac{1}{3}, C = 0, D = -\frac{1}{3}$

$$\frac{1}{(s^2+1)(s^2+4)} = \frac{1/3}{s^2+1} - \frac{1/6} \cdot \frac{2}{s^2+4}$$

$$Y(s) = (-e^{-\pi s} + e^{-2\pi s})\left[\frac{1/3}{s^2+1} - \frac{1/6} \cdot \frac{2}{s^2+4}\right]$$

$$y(t) = \left[-\frac{1}{3}\sin(t-\pi) + \frac{1}{6}\sin(2(t-\pi))\right]u(t-\pi) + \left[\frac{1}{3}\sin(t-2\pi) - \frac{1}{6}\sin(2(t-2\pi))\right]u(t-2\pi)$$

## Applications

### On-Off Switches

Electronic circuits with switches that turn on or off at specific times are naturally modeled with step functions.

### Impulse Loads

Loads applied to structures for limited time periods (like a weight placed on a beam and then removed) use window functions $u(t-a) - u(t-b)$.

### Control Systems

Step inputs are standard test signals in control theory, used to analyze system response and stability.

## Summary

The unit step function $u(t-a)$ and the second translation theorem provide powerful tools for:

1. **Expressing piecewise functions** in a form suitable for Laplace transforms
2. **Handling discontinuous inputs** in differential equations
3. **Modeling switching behavior** in physical systems
4. **Analyzing transient responses** to sudden changes

The key formula to remember is:

$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$$

This allows us to transform time-shifted functions and solve differential equations with piecewise or discontinuous forcing functions systematically.
