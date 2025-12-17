---
title: "Properties of Laplace Transforms"
---

# Properties of Laplace Transforms

## Introduction

The power of the Laplace transform lies not only in its ability to transform functions but also in its operational properties. These properties allow us to find transforms of complex functions using known transforms of simpler functions, and they provide the algebraic framework for solving differential equations efficiently.

## Linearity Property

The Laplace transform is a linear operator, meaning it satisfies the superposition principle.

### Theorem

For any constants $a$ and $b$, and functions $f(t)$ and $g(t)$ whose Laplace transforms exist:

$$\mathcal{L}\{af(t) + bg(t)\} = a\mathcal{L}\{f(t)\} + b\mathcal{L}\{g(t)\} = aF(s) + bG(s)$$

### Proof

$$\mathcal{L}\{af(t) + bg(t)\} = \int_0^{\infty} e^{-st}[af(t) + bg(t)] \, dt$$

$$= a\int_0^{\infty} e^{-st}f(t) \, dt + b\int_0^{\infty} e^{-st}g(t) \, dt = aF(s) + bG(s)$$

### Example

Find $\mathcal{L}\{3e^{2t} - 5\sin(4t)\}$:

$$\mathcal{L}\{3e^{2t} - 5\sin(4t)\} = 3\mathcal{L}\{e^{2t}\} - 5\mathcal{L}\{\sin(4t)\} = \frac{3}{s-2} - \frac{20}{s^2+16}$$

## First Translation Theorem (s-shifting)

This property relates the transform of $e^{at}f(t)$ to the transform of $f(t)$.

### Theorem

If $\mathcal{L}\{f(t)\} = F(s)$ for $s > \alpha$, then:

$$\mathcal{L}\{e^{at}f(t)\} = F(s-a), \quad s > a + \alpha$$

### Proof

$$\mathcal{L}\{e^{at}f(t)\} = \int_0^{\infty} e^{-st}e^{at}f(t) \, dt = \int_0^{\infty} e^{-(s-a)t}f(t) \, dt = F(s-a)$$

### Examples

1. **Exponential times sine**: Find $\mathcal{L}\{e^{3t}\sin(2t)\}$

Since $\mathcal{L}\{\sin(2t)\} = \frac{2}{s^2+4}$, we have:

$$\mathcal{L}\{e^{3t}\sin(2t)\} = \frac{2}{(s-3)^2+4} = \frac{2}{s^2-6s+13}$$

2. **Exponential times power**: Find $\mathcal{L}\{e^{-t}t^2\}$

Since $\mathcal{L}\{t^2\} = \frac{2}{s^3}$, we have:

$$\mathcal{L}\{e^{-t}t^2\} = \frac{2}{(s+1)^3}$$

## Transform of Derivatives

This property is crucial for solving differential equations.

### First Derivative

$$\mathcal{L}\{f'(t)\} = s\mathcal{L}\{f(t)\} - f(0) = sF(s) - f(0)$$

### Proof

Using integration by parts with $u = e^{-st}$ and $dv = f'(t)dt$:

$$\mathcal{L}\{f'(t)\} = \int_0^{\infty} e^{-st}f'(t) \, dt = \left[e^{-st}f(t)\right]_0^{\infty} + s\int_0^{\infty} e^{-st}f(t) \, dt$$

$$= 0 - f(0) + sF(s) = sF(s) - f(0)$$

### Higher Derivatives

For the second derivative:

$$\mathcal{L}\{f''(t)\} = s^2F(s) - sf(0) - f'(0)$$

For the $n$-th derivative:

$$\mathcal{L}\{f^{(n)}(t)\} = s^nF(s) - s^{n-1}f(0) - s^{n-2}f'(0) - \cdots - f^{(n-1)}(0)$$

### Example

Given $y'' - 3y' + 2y = 0$ with $y(0) = 1, y'(0) = 0$, taking Laplace transforms:

$$[s^2Y(s) - s(1) - 0] - 3[sY(s) - 1] + 2Y(s) = 0$$

$$s^2Y(s) - s - 3sY(s) + 3 + 2Y(s) = 0$$

$$Y(s)(s^2 - 3s + 2) = s - 3$$

## Transform of Integrals

If $\mathcal{L}\{f(t)\} = F(s)$, then:

$$\mathcal{L}\left\{\int_0^t f(\tau) \, d\tau\right\} = \frac{F(s)}{s}$$

### Proof

Let $g(t) = \int_0^t f(\tau) \, d\tau$. Then $g'(t) = f(t)$ and $g(0) = 0$.

Using the derivative property:

$$\mathcal{L}\{g'(t)\} = sG(s) - g(0) = sG(s) = F(s)$$

Therefore, $G(s) = \frac{F(s)}{s}$.

## Second Translation Theorem (t-shifting)

This property handles time delays and is essential for dealing with piecewise functions.

### Theorem

If $\mathcal{L}\{f(t)\} = F(s)$ and $a > 0$, then:

$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$$

where $u(t-a)$ is the unit step function (Heaviside function) defined as:

$$u(t-a) = \begin{cases} 0 & t < a \\ 1 & t \geq a \end{cases}$$

### Example

Find $\mathcal{L}\{\sin(t-\pi)u(t-\pi)\}$:

Since $\mathcal{L}\{\sin(t)\} = \frac{1}{s^2+1}$, we have:

$$\mathcal{L}\{\sin(t-\pi)u(t-\pi)\} = e^{-\pi s} \cdot \frac{1}{s^2+1}$$

## Derivatives of Transforms

If $\mathcal{L}\{f(t)\} = F(s)$, then:

$$\mathcal{L}\{tf(t)\} = -F'(s)$$

More generally:

$$\mathcal{L}\{t^nf(t)\} = (-1)^n F^{(n)}(s)$$

### Proof

Starting with $F(s) = \int_0^{\infty} e^{-st}f(t) \, dt$, differentiate both sides with respect to $s$:

$$F'(s) = \int_0^{\infty} \frac{\partial}{\partial s}[e^{-st}]f(t) \, dt = -\int_0^{\infty} te^{-st}f(t) \, dt = -\mathcal{L}\{tf(t)\}$$

### Example

Find $\mathcal{L}\{t\sin(at)\}$:

Since $\mathcal{L}\{\sin(at)\} = \frac{a}{s^2+a^2}$:

$$\mathcal{L}\{t\sin(at)\} = -\frac{d}{ds}\left(\frac{a}{s^2+a^2}\right) = -a \cdot \frac{-2s}{(s^2+a^2)^2} = \frac{2as}{(s^2+a^2)^2}$$

## Division by t

If $\mathcal{L}\{f(t)\} = F(s)$ and $\lim_{t \to 0^+} \frac{f(t)}{t}$ exists, then:

$$\mathcal{L}\left\{\frac{f(t)}{t}\right\} = \int_s^{\infty} F(\sigma) \, d\sigma$$

### Example

Find $\mathcal{L}\left\{\frac{\sin(at)}{t}\right\}$:

Since $\mathcal{L}\{\sin(at)\} = \frac{a}{s^2+a^2}$:

$$\mathcal{L}\left\{\frac{\sin(at)}{t}\right\} = \int_s^{\infty} \frac{a}{\sigma^2+a^2} \, d\sigma = \left[\arctan\left(\frac{\sigma}{a}\right)\right]_s^{\infty} = \frac{\pi}{2} - \arctan\left(\frac{s}{a}\right)$$

## Scaling Property

If $\mathcal{L}\{f(t)\} = F(s)$ and $a > 0$, then:

$$\mathcal{L}\{f(at)\} = \frac{1}{a}F\left(\frac{s}{a}\right)$$

### Proof

$$\mathcal{L}\{f(at)\} = \int_0^{\infty} e^{-st}f(at) \, dt$$

Let $u = at$, so $du = a \, dt$:

$$= \int_0^{\infty} e^{-s(u/a)}f(u) \frac{du}{a} = \frac{1}{a}\int_0^{\infty} e^{-(s/a)u}f(u) \, du = \frac{1}{a}F\left(\frac{s}{a}\right)$$

## Summary of Properties

| Property | Time Domain | Frequency Domain |
|----------|-------------|------------------|
| Linearity | $af(t) + bg(t)$ | $aF(s) + bG(s)$ |
| First Translation | $e^{at}f(t)$ | $F(s-a)$ |
| Second Translation | $f(t-a)u(t-a)$ | $e^{-as}F(s)$ |
| Derivative of $f$ | $f^{(n)}(t)$ | $s^nF(s) - s^{n-1}f(0) - \cdots - f^{(n-1)}(0)$ |
| Integral of $f$ | $\int_0^t f(\tau) d\tau$ | $\frac{F(s)}{s}$ |
| Derivative of $F$ | $t^nf(t)$ | $(-1)^nF^{(n)}(s)$ |
| Integral of $F$ | $\frac{f(t)}{t}$ | $\int_s^{\infty} F(\sigma) d\sigma$ |
| Scaling | $f(at)$ | $\frac{1}{a}F(s/a)$ |

These properties form the operational foundation for using Laplace transforms to solve differential equations and analyze linear systems.
