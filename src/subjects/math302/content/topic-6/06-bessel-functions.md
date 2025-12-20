---
title: "Bessel Functions"
---

# Bessel Functions

## Introduction

Bessel functions are among the most important special functions in mathematical physics. They arise naturally when solving problems in cylindrical or spherical coordinates, including heat conduction in cylinders, wave propagation, electromagnetic fields, and quantum mechanics. Named after Friedrich Bessel, these functions are solutions to Bessel's differential equation.

## Bessel's Differential Equation

The **Bessel equation of order $\nu$** is:

$$x^2y'' + xy' + (x^2 - \nu^2)y = 0$$

where $\nu \geq 0$ is a parameter called the **order** of the Bessel function.

Standard form:

$$y'' + \frac{1}{x}y' + \frac{x^2-\nu^2}{x^2}y = 0$$

The point $x = 0$ is a regular singular point.

## Bessel Functions of the First Kind

### Definition via Frobenius Method

Using the Frobenius method with $r = \nu$, we obtain the **Bessel function of the first kind of order $\nu$**:

$$J_{\nu}(x) = \sum_{m=0}^{\infty} \frac{(-1)^m}{m! \Gamma(\nu + m + 1)} \left(\frac{x}{2}\right)^{2m+\nu}$$

where $\Gamma$ is the gamma function (generalization of factorial):

$$\Gamma(n+1) = n! \quad \text{for non-negative integers } n$$

$$\Gamma(z+1) = z\Gamma(z) \quad \text{(recurrence relation)}$$

### Integer Order: $J_n(x)$

For integer order $n$:

$$J_n(x) = \sum_{m=0}^{\infty} \frac{(-1)^m}{m!(n+m)!} \left(\frac{x}{2}\right)^{2m+n}$$

### Order Zero: $J_0(x)$

$$J_0(x) = \sum_{m=0}^{\infty} \frac{(-1)^m}{(m!)^2} \left(\frac{x}{2}\right)^{2m} = 1 - \frac{x^2}{2^2} + \frac{x^4}{2^2 \cdot 4^2} - \frac{x^6}{2^2 \cdot 4^2 \cdot 6^2} + \cdots$$

### Order One: $J_1(x)$

$$J_1(x) = \sum_{m=0}^{\infty} \frac{(-1)^m}{m!(m+1)!} \left(\frac{x}{2}\right)^{2m+1} = \frac{x}{2} - \frac{x^3}{2^3 \cdot 2!} + \frac{x^5}{2^5 \cdot 2! \cdot 3!} - \cdots$$

### Properties of $J_{\nu}(x)$

1. **Domain**: Converges for all $x$ (radius of convergence $R = \infty$)
2. **Oscillatory behavior**: For large $x$, behaves like damped oscillations
3. **Initial value**: $J_0(0) = 1$, $J_n(0) = 0$ for $n > 0$
4. **Even/Odd**: $J_{-n}(x) = (-1)^n J_n(x)$ for integer $n$

## Bessel Functions of the Second Kind

For non-integer $\nu$, the second linearly independent solution is $J_{-\nu}(x)$.

For integer order $n$, $J_{-n}(x) = (-1)^n J_n(x)$ is not independent. The second solution is the **Bessel function of the second kind** (also called Neumann function or Weber function):

$$Y_n(x) = \frac{J_n(x) \cos(n\pi) - J_{-n}(x)}{\sin(n\pi)}$$

For integer $n$, this is defined as a limit:

$$Y_n(x) = \lim_{\nu \to n} \frac{J_{\nu}(x) \cos(\nu\pi) - J_{-\nu}(x)}{\sin(\nu\pi)}$$

### Order Zero: $Y_0(x)$

$$Y_0(x) = \frac{2}{\pi}\left[J_0(x)\ln(x) + \sum_{m=1}^{\infty} \frac{(-1)^{m-1} H_m}{(m!)^2}\left(\frac{x}{2}\right)^{2m}\right]$$

where $H_m = 1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{m}$ (harmonic numbers).

### Properties of $Y_n(x)$

1. **Singular at origin**: $Y_n(x) \to -\infty$ as $x \to 0^+$
2. **Oscillatory**: For large $x$, oscillates like $J_n(x)$ but phase-shifted
3. **General solution**: $y = c_1 J_n(x) + c_2 Y_n(x)$

## Recurrence Relations

Bessel functions satisfy many useful recurrence relations:

$$J_{\nu-1}(x) + J_{\nu+1}(x) = \frac{2\nu}{x} J_{\nu}(x)$$

$$J_{\nu-1}(x) - J_{\nu+1}(x) = 2J'_{\nu}(x)$$

$$\frac{d}{dx}[x^{\nu} J_{\nu}(x)] = x^{\nu} J_{\nu-1}(x)$$

$$\frac{d}{dx}[x^{-\nu} J_{\nu}(x)] = -x^{-\nu} J_{\nu+1}(x)$$

These allow efficient computation and manipulation of Bessel functions.

## Zeros of Bessel Functions

Bessel functions have infinitely many real zeros.

For $J_0(x)$, the first few zeros are approximately:

$$x_1 \approx 2.405, \quad x_2 \approx 5.520, \quad x_3 \approx 8.654$$

These zeros are crucial for boundary value problems, such as vibrations of circular membranes.

## Modified Bessel Functions

The **modified Bessel equation** is:

$$x^2y'' + xy' - (x^2 + \nu^2)y = 0$$

(Note the sign change from $+x^2$ to $-x^2$)

### Modified Bessel Functions of the First Kind

$$I_{\nu}(x) = i^{-\nu} J_{\nu}(ix) = \sum_{m=0}^{\infty} \frac{1}{m!\Gamma(\nu+m+1)} \left(\frac{x}{2}\right)^{2m+\nu}$$

Note: No alternating signs, so $I_{\nu}(x) > 0$ for $x > 0$.

For integer order:

$$I_n(x) = \sum_{m=0}^{\infty} \frac{1}{m!(n+m)!} \left(\frac{x}{2}\right)^{2m+n}$$

### Modified Bessel Functions of the Second Kind

$$K_{\nu}(x) = \frac{\pi}{2} \frac{I_{-\nu}(x) - I_{\nu}(x)}{\sin(\nu\pi)}$$

Properties:

- $I_{\nu}(x)$ grows exponentially as $x \to \infty$
- $K_{\nu}(x)$ decays exponentially as $x \to \infty$
- $K_{\nu}(x) \to \infty$ as $x \to 0^+$

## Applications

### Heat Conduction in a Cylinder

The temperature distribution $u(r,t)$ in a cylinder satisfies:

$$\frac{\partial u}{\partial t} = \alpha \left(\frac{\partial^2 u}{\partial r^2} + \frac{1}{r}\frac{\partial u}{\partial r}\right)$$

Separation of variables leads to Bessel's equation in $r$.

### Vibrating Circular Membrane

The displacement $u(r,\theta,t)$ of a vibrating drum satisfies the wave equation in polar coordinates, leading to:

$$u(r,\theta,t) = J_n(\lambda r)[\cos(n\theta) + \sin(n\theta)]\cos(\omega t)$$

The boundary condition $u(a,\theta,t) = 0$ gives $J_n(\lambda a) = 0$, requiring $\lambda a$ to be a zero of $J_n$.

### Electromagnetic Waves in Cylindrical Waveguides

The electric and magnetic fields in a cylindrical waveguide satisfy equations involving Bessel functions.

### Quantum Mechanics

The radial part of the Schrödinger equation in spherical coordinates involves spherical Bessel functions (related to $J_{n+1/2}$).

## Asymptotic Behavior

### For Large $x$

$$J_{\nu}(x) \sim \sqrt{\frac{2}{\pi x}} \cos\left(x - \frac{\nu\pi}{2} - \frac{\pi}{4}\right)$$

$$Y_{\nu}(x) \sim \sqrt{\frac{2}{\pi x}} \sin\left(x - \frac{\nu\pi}{2} - \frac{\pi}{4}\right)$$

This shows the oscillatory, damped behavior for large arguments.

### For Small $x$

$$J_{\nu}(x) \sim \frac{1}{\Gamma(\nu+1)}\left(\frac{x}{2}\right)^{\nu}$$

$$Y_0(x) \sim \frac{2}{\pi}\ln(x)$$

## Integral Representations

$$J_n(x) = \frac{1}{\pi} \int_0^{\pi} \cos(n\theta - x\sin\theta) \, d\theta$$

This is useful for analytical and numerical work.

## Orthogonality

On the interval $[0, a]$ with respect to weight function $r$:

$$\int_0^a r J_{\nu}(\alpha_m r) J_{\nu}(\alpha_n r) \, dr = 0 \quad \text{if } m \neq n$$

where $\alpha_m$ and $\alpha_n$ are different zeros of $J_{\nu}$.

This orthogonality property is crucial for Fourier-Bessel series expansions.

## Summary

Bessel functions:

| Type | Equation | General Solution |
|------|----------|------------------|
| Bessel | $x^2y'' + xy' + (x^2-\nu^2)y = 0$ | $y = c_1 J_{\nu}(x) + c_2 Y_{\nu}(x)$ |
| Modified Bessel | $x^2y'' + xy' - (x^2+\nu^2)y = 0$ | $y = c_1 I_{\nu}(x) + c_2 K_{\nu}(x)$ |

**Key Properties**:
- Arise in cylindrical coordinate problems
- Infinitely many zeros
- Satisfy useful recurrence relations
- Oscillatory (Bessel) or exponential (modified) behavior
- Essential for vibration, heat, and wave problems in cylindrical geometries

Bessel functions are indispensable in applied mathematics, appearing whenever cylindrical symmetry is present in physical problems.
