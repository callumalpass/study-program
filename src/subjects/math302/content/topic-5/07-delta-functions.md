---
title: "Dirac Delta Function and Impulse Response"
---

# Dirac Delta Function and Impulse Response

## Introduction

The Dirac delta function, denoted $\delta(t)$, is a fundamental object in the theory of distributions (generalized functions). While not a function in the classical sense, it provides a rigorous mathematical framework for modeling instantaneous impulses and point sources. The Laplace transform handles delta functions naturally, making it an invaluable tool for analyzing impulsive inputs in physical systems.

## The Dirac Delta Function

### Intuitive Definition

The Dirac delta function $\delta(t-a)$ can be thought of as an infinitely tall, infinitely narrow spike at $t = a$ with unit area:

$$\delta(t-a) = \begin{cases} \infty & t = a \\ 0 & t \neq a \end{cases}$$

with the property:

$$\int_{-\infty}^{\infty} \delta(t-a) \, dt = 1$$

### Rigorous Definition via Limits

The delta function can be defined as the limit of a sequence of ordinary functions. For example:

$$\delta_{\epsilon}(t) = \begin{cases} \frac{1}{\epsilon} & 0 \leq t \leq \epsilon \\ 0 & \text{otherwise} \end{cases}$$

Then $\delta(t) = \lim_{\epsilon \to 0^+} \delta_{\epsilon}(t)$ in the sense of distributions.

Another representation uses Gaussians:

$$\delta(t) = \lim_{\epsilon \to 0^+} \frac{1}{\epsilon\sqrt{\pi}}e^{-t^2/\epsilon^2}$$

### Sifting Property

The most important property of the delta function is the sifting (or sampling) property:

$$\int_{-\infty}^{\infty} f(t)\delta(t-a) \, dt = f(a)$$

for any continuous function $f(t)$. This "picks out" the value of $f$ at $t = a$.

For our purposes with Laplace transforms (where $t \geq 0$):

$$\int_0^{\infty} f(t)\delta(t-a) \, dt = \begin{cases} f(a) & a > 0 \\ \frac{1}{2}f(0) & a = 0 \\ 0 & a < 0 \end{cases}$$

In practice, we often use:

$$\int_0^{\infty} f(t)\delta(t-a) \, dt = f(a) \quad \text{for } a > 0$$

## Laplace Transform of the Delta Function

### Transform at $t = 0$

$$\mathcal{L}\{\delta(t)\} = \int_0^{\infty} e^{-st}\delta(t) \, dt = e^{0} = 1$$

This remarkable result shows that a unit impulse at $t = 0$ has a flat frequency spectrum.

### Transform at $t = a$ (shifted)

$$\mathcal{L}\{\delta(t-a)\} = \int_0^{\infty} e^{-st}\delta(t-a) \, dt = e^{-sa}, \quad a \geq 0$$

This follows from the sifting property.

### Derivative of the Step Function

The delta function can be interpreted as the derivative of the unit step function:

$$\delta(t-a) = \frac{d}{dt}u(t-a)$$

This can be verified using Laplace transforms:

$$\mathcal{L}\left\{\frac{d}{dt}u(t-a)\right\} = s\mathcal{L}\{u(t-a)\} - u(0) = s \cdot \frac{e^{-as}}{s} - 0 = e^{-as} = \mathcal{L}\{\delta(t-a)\}$$

## Solving Differential Equations with Impulse Inputs

### Example 1: First-Order System

Solve $y' + 2y = \delta(t-3)$ with $y(0) = 0$.

Taking Laplace transforms:

$$sY(s) - 0 + 2Y(s) = e^{-3s}$$

$$Y(s)(s+2) = e^{-3s}$$

$$Y(s) = \frac{e^{-3s}}{s+2}$$

Using the second translation theorem with $\mathcal{L}^{-1}\left\{\frac{1}{s+2}\right\} = e^{-2t}$:

$$y(t) = e^{-2(t-3)}u(t-3) = e^{-2t+6}u(t-3)$$

This solution is zero until $t = 3$, then decays exponentially.

### Example 2: Second-Order System

Solve $y'' + 4y = \delta(t-\pi)$ with $y(0) = 0, y'(0) = 0$.

Transform:

$$s^2Y(s) + 4Y(s) = e^{-\pi s}$$

$$Y(s) = \frac{e^{-\pi s}}{s^2+4}$$

Since $\mathcal{L}^{-1}\left\{\frac{1}{s^2+4}\right\} = \frac{1}{2}\sin(2t)$:

$$y(t) = \frac{1}{2}\sin(2(t-\pi))u(t-\pi)$$

Using $\sin(2(t-\pi)) = \sin(2t - 2\pi) = \sin(2t)$:

$$y(t) = \frac{1}{2}\sin(2t) \cdot u(t-\pi)$$

The system remains at rest until the impulse at $t = \pi$, then oscillates with amplitude $\frac{1}{2}$.

### Example 3: Multiple Impulses

Solve $y'' + y = \delta(t-\pi) + \delta(t-2\pi)$ with $y(0) = 0, y'(0) = 0$.

Transform:

$$s^2Y(s) + Y(s) = e^{-\pi s} + e^{-2\pi s}$$

$$Y(s) = \frac{e^{-\pi s} + e^{-2\pi s}}{s^2+1}$$

$$y(t) = \sin(t-\pi)u(t-\pi) + \sin(t-2\pi)u(t-2\pi)$$

Since $\sin(t-\pi) = -\sin(t)$ and $\sin(t-2\pi) = \sin(t)$:

$$y(t) = -\sin(t) \cdot u(t-\pi) + \sin(t) \cdot u(t-2\pi)$$

For $0 \leq t < \pi$: $y(t) = 0$

For $\pi \leq t < 2\pi$: $y(t) = -\sin(t)$

For $t \geq 2\pi$: $y(t) = -\sin(t) + \sin(t) = 0$

The system oscillates only between the two impulses!

## Impulse Response and Transfer Functions

### Impulse Response Function

The impulse response $h(t)$ of a linear system is the solution to:

$$L[y] = \delta(t), \quad y(0) = 0, y'(0) = 0, \ldots$$

where $L$ is a linear differential operator.

For the operator $L[y] = y'' + ay' + by$:

$$h(t) = \mathcal{L}^{-1}\left\{\frac{1}{s^2+as+b}\right\}$$

### Transfer Function

The transfer function $H(s)$ is the Laplace transform of the impulse response:

$$H(s) = \mathcal{L}\{h(t)\}$$

For the differential equation $y'' + ay' + by = f(t)$:

$$H(s) = \frac{1}{s^2+as+b}$$

The solution for any input $f(t)$ is:

$$Y(s) = H(s) \cdot F(s)$$

$$y(t) = (h * f)(t) = \int_0^t h(\tau)f(t-\tau) \, d\tau$$

### Example 4: Finding Impulse Response

Find the impulse response of the system $y'' + 3y' + 2y = f(t)$.

The transfer function is:

$$H(s) = \frac{1}{s^2+3s+2} = \frac{1}{(s+1)(s+2)}$$

Using partial fractions:

$$H(s) = \frac{1}{s+1} - \frac{1}{s+2}$$

$$h(t) = e^{-t} - e^{-2t}$$

This is the response to a unit impulse at $t = 0$.

## Physical Interpretation

### Mechanical Systems

In a spring-mass-damper system, an impulse represents a sudden blow or collision. The equation:

$$m\ddot{x} + c\dot{x} + kx = F_0\delta(t)$$

models a mass receiving an instantaneous impulse of magnitude $F_0$.

The impulse imparts an instantaneous change in momentum:

$$\int_0^{\epsilon} F(t) \, dt = F_0 = m\Delta v$$

### Electrical Circuits

In an RLC circuit, a delta function voltage source represents a very short, very high voltage pulse:

$$L\frac{dI}{dt} + RI + \frac{Q}{C} = V_0\delta(t)$$

### Initial Conditions via Impulses

An initial velocity $v_0$ in a second-order system can be modeled as an impulse:

$$y'' + \omega^2 y = v_0\delta(t), \quad y(0) = 0, y'(0) = 0$$

gives the same solution as:

$$y'' + \omega^2 y = 0, \quad y(0) = 0, y'(0) = v_0$$

## Derivatives of the Delta Function

The derivative $\delta'(t)$ is defined via:

$$\int_{-\infty}^{\infty} f(t)\delta'(t-a) \, dt = -f'(a)$$

The Laplace transform is:

$$\mathcal{L}\{\delta'(t)\} = s\mathcal{L}\{\delta(t)\} - \delta(0)$$

Since $\delta(0)$ is not well-defined in the classical sense, we interpret this as:

$$\mathcal{L}\{\delta'(t)\} = s$$

Higher derivatives: $\mathcal{L}\{\delta^{(n)}(t)\} = s^n$

## Summary Table

| Function | Laplace Transform |
|----------|-------------------|
| $\delta(t)$ | $1$ |
| $\delta(t-a)$, $a > 0$ | $e^{-as}$ |
| $\delta'(t)$ | $s$ |
| $\delta''(t)$ | $s^2$ |
| $u(t-a)$ | $\frac{e^{-as}}{s}$ |

## Applications Summary

The delta function is essential for:

1. **Modeling instantaneous impulses**: Collisions, impacts, sudden forces
2. **Initial conditions**: Representing initial velocities as impulses
3. **System analysis**: Characterizing systems via impulse response
4. **Discontinuities**: Representing sudden changes in forcing functions
5. **Green's functions**: Building solutions via superposition of impulse responses

## Conclusion

The Dirac delta function, despite not being a classical function, provides a rigorous and practical tool for handling impulsive inputs in differential equations. The Laplace transform method handles delta functions seamlessly, with the simple transform $\mathcal{L}\{\delta(t-a)\} = e^{-as}$. This makes analyzing systems subject to sudden impacts or discontinuous forces straightforward and elegant.

The impulse response completely characterizes a linear time-invariant system, and any response can be constructed as a convolution of the input with the impulse response. This fundamental principle underpins much of linear systems theory and signal processing.
