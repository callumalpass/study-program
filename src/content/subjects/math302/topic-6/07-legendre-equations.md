---
title: "Legendre Polynomials"
---

# Legendre Polynomials

## Introduction

Legendre polynomials are a family of orthogonal polynomials that arise naturally in problems with spherical symmetry, such as gravitational and electrostatic potentials, quantum angular momentum, and solutions to Laplace's equation in spherical coordinates. They are named after Adrien-Marie Legendre and form a complete orthogonal basis for square-integrable functions on $[-1, 1]$.

## Legendre's Differential Equation

The **Legendre equation** is:

$$(1-x^2)y'' - 2xy' + n(n+1)y = 0$$

where $n$ is a non-negative parameter.

Standard form:

$$y'' - \frac{2x}{1-x^2}y' + \frac{n(n+1)}{1-x^2}y = 0$$

The points $x = \pm 1$ are regular singular points.

## Power Series Solution

At the ordinary point $x = 0$, assume:

$$y = \sum_{k=0}^{\infty} a_k x^k$$

Substituting into the equation yields the recurrence relation:

$$a_{k+2} = \frac{k(k+1) - n(n+1)}{(k+2)(k+1)} a_k = \frac{(k-n)(k+n+1)}{(k+2)(k+1)} a_k$$

This produces two independent series (even and odd powers).

### Termination Condition

When $n$ is a non-negative integer, one of the series terminates, producing a **polynomial solution**.

- If $n$ is even, the even series terminates at $x^n$
- If $n$ is odd, the odd series terminates at $x^n$

These polynomial solutions are the **Legendre polynomials** $P_n(x)$.

## Legendre Polynomials $P_n(x)$

### Definition

The Legendre polynomials are normalized so that $P_n(1) = 1$.

### First Few Legendre Polynomials

$$P_0(x) = 1$$

$$P_1(x) = x$$

$$P_2(x) = \frac{1}{2}(3x^2 - 1)$$

$$P_3(x) = \frac{1}{2}(5x^3 - 3x)$$

$$P_4(x) = \frac{1}{8}(35x^4 - 30x^2 + 3)$$

$$P_5(x) = \frac{1}{8}(63x^5 - 70x^3 + 15x)$$

### Rodrigues' Formula

A compact representation:

$$P_n(x) = \frac{1}{2^n n!} \frac{d^n}{dx^n}[(x^2-1)^n]$$

This formula allows direct computation of any Legendre polynomial.

### Example: $P_3(x)$ via Rodrigues

$$(x^2-1)^3 = x^6 - 3x^4 + 3x^2 - 1$$

$$\frac{d^3}{dx^3}[(x^2-1)^3] = \frac{d^3}{dx^3}[x^6 - 3x^4 + 3x^2 - 1]$$

$$= 6 \cdot 5 \cdot 4 x^3 - 3 \cdot 4 \cdot 3 \cdot 2 x = 120x^3 - 72x$$

$$P_3(x) = \frac{1}{2^3 \cdot 3!} (120x^3 - 72x) = \frac{1}{48}(120x^3 - 72x) = \frac{5x^3 - 3x}{2}$$

## Properties of Legendre Polynomials

### Parity

$$P_n(-x) = (-1)^n P_n(x)$$

Legendre polynomials of even order are even functions, and those of odd order are odd functions.

### Normalization

$$P_n(1) = 1, \quad P_n(-1) = (-1)^n$$

### Zeros

All zeros of $P_n(x)$ are real, distinct, and lie in $(-1, 1)$.

### Orthogonality

The most important property:

$$\int_{-1}^{1} P_m(x) P_n(x) \, dx = \begin{cases} 0 & m \neq n \\ \frac{2}{2n+1} & m = n \end{cases}$$

This orthogonality relation makes Legendre polynomials ideal for expanding functions as series.

### Recurrence Relations

$$(n+1)P_{n+1}(x) = (2n+1)xP_n(x) - nP_{n-1}(x)$$

This three-term recurrence allows efficient computation.

Derivative relation:

$$P'_{n+1}(x) - P'_{n-1}(x) = (2n+1)P_n(x)$$

$$(x^2-1)P'_n(x) = nxP_n(x) - nP_{n-1}(x)$$

## Generating Function

$$\frac{1}{\sqrt{1-2xt+t^2}} = \sum_{n=0}^{\infty} P_n(x) t^n, \quad |t| < 1$$

Expanding the left side in powers of $t$ and comparing coefficients yields the Legendre polynomials.

## Associated Legendre Functions

The **associated Legendre equation** is:

$$(1-x^2)y'' - 2xy' + \left[n(n+1) - \frac{m^2}{1-x^2}\right]y = 0$$

Solutions are the **associated Legendre functions**:

$$P_n^m(x) = (1-x^2)^{m/2} \frac{d^m}{dx^m} P_n(x)$$

where $m = 0, 1, 2, \ldots, n$.

These appear in spherical harmonics and quantum mechanics.

### Example: $P_2^1(x)$

$$P_2(x) = \frac{1}{2}(3x^2-1)$$

$$P_2^1(x) = (1-x^2)^{1/2} \frac{d}{dx}\left[\frac{1}{2}(3x^2-1)\right] = (1-x^2)^{1/2} \cdot 3x = 3x\sqrt{1-x^2}$$

## Fourier-Legendre Series

Any piecewise continuous function $f(x)$ on $[-1, 1]$ can be expanded as:

$$f(x) = \sum_{n=0}^{\infty} c_n P_n(x)$$

where the coefficients are:

$$c_n = \frac{2n+1}{2} \int_{-1}^{1} f(x) P_n(x) \, dx$$

### Example: Expand $f(x) = x^2$

$$c_0 = \frac{1}{2} \int_{-1}^{1} x^2 \cdot 1 \, dx = \frac{1}{2} \cdot \frac{2}{3} = \frac{1}{3}$$

$$c_1 = \frac{3}{2} \int_{-1}^{1} x^2 \cdot x \, dx = \frac{3}{2} \cdot 0 = 0$$

$$c_2 = \frac{5}{2} \int_{-1}^{1} x^2 \cdot \frac{1}{2}(3x^2-1) \, dx = \frac{5}{4} \int_{-1}^{1} (3x^4 - x^2) \, dx$$

$$= \frac{5}{4} \left[\frac{6}{5} - \frac{2}{3}\right] = \frac{5}{4} \cdot \frac{8}{15} = \frac{2}{3}$$

Therefore:

$$x^2 = \frac{1}{3}P_0(x) + \frac{2}{3}P_2(x) = \frac{1}{3} + \frac{2}{3} \cdot \frac{1}{2}(3x^2-1) = \frac{1}{3} + x^2 - \frac{1}{3} = x^2$$ ✓

## Applications

### Gravitational and Electrostatic Potentials

The potential of a point mass or charge can be expanded using Legendre polynomials. For a charge at distance $r$ from the origin, the potential at $(r', \theta)$ is:

$$V(r', \theta) = \frac{q}{4\pi\epsilon_0 r'} \sum_{n=0}^{\infty} \left(\frac{r}{r'}\right)^n P_n(\cos\theta)$$

### Quantum Mechanics

The angular part of the wavefunction for the hydrogen atom involves spherical harmonics:

$$Y_l^m(\theta, \phi) = \sqrt{\frac{2l+1}{4\pi} \frac{(l-m)!}{(l+m)!}} P_l^m(\cos\theta) e^{im\phi}$$

### Scattering Theory

The scattering amplitude in quantum mechanics is expanded in partial waves using Legendre polynomials.

### Multipole Expansion

Electromagnetic multipole moments are expressed using Legendre polynomials.

## Numerical Methods

Legendre polynomials are used in:

- **Gaussian quadrature**: Zeros of $P_n(x)$ are optimal integration points
- **Spectral methods**: Numerical solution of PDEs
- **Approximation theory**: Best polynomial approximations

### Gauss-Legendre Quadrature

$$\int_{-1}^{1} f(x) \, dx \approx \sum_{i=1}^{n} w_i f(x_i)$$

where $x_i$ are zeros of $P_n(x)$ and $w_i$ are weights. This method is exact for polynomials of degree $\leq 2n-1$.

## Comparison with Other Orthogonal Polynomials

| Polynomial | Interval | Weight | Equation |
|------------|----------|--------|----------|
| Legendre $P_n(x)$ | $[-1,1]$ | $1$ | $(1-x^2)y'' - 2xy' + n(n+1)y = 0$ |
| Chebyshev $T_n(x)$ | $[-1,1]$ | $(1-x^2)^{-1/2}$ | $(1-x^2)y'' - xy' + n^2y = 0$ |
| Hermite $H_n(x)$ | $(-\infty,\infty)$ | $e^{-x^2}$ | $y'' - 2xy' + 2ny = 0$ |
| Laguerre $L_n(x)$ | $[0,\infty)$ | $e^{-x}$ | $xy'' + (1-x)y' + ny = 0$ |

## Summary

Legendre polynomials $P_n(x)$:

- Solve $(1-x^2)y'' - 2xy' + n(n+1)y = 0$ for integer $n$
- Form an orthogonal basis on $[-1, 1]$
- Satisfy $P_n(1) = 1$ and $P_n(-x) = (-1)^n P_n(x)$
- Computed via Rodrigues' formula or recurrence relations
- Essential for spherical coordinate problems in physics
- Used in numerical integration (Gauss-Legendre quadrature)

These polynomials are fundamental in applied mathematics, appearing in diverse areas from quantum mechanics to numerical analysis.
