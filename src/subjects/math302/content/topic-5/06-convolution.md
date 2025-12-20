---
title: "Convolution Theorem"
---

# Convolution Theorem

## Introduction

The convolution theorem provides a powerful method for finding inverse Laplace transforms of products of functions and for solving integral equations. It establishes a fundamental relationship between multiplication in the $s$-domain and convolution in the $t$-domain, making it an essential tool in the analysis of linear systems.

## Definition of Convolution

### The Convolution Integral

For two functions $f(t)$ and $g(t)$ defined for $t \geq 0$, their convolution, denoted $f * g$, is defined as:

$$(f * g)(t) = \int_0^t f(\tau)g(t-\tau) \, d\tau$$

Equivalently, by a change of variables ($u = t - \tau$):

$$(f * g)(t) = \int_0^t f(t-\tau)g(\tau) \, d\tau$$

This shows that convolution is commutative: $f * g = g * f$.

### Physical Interpretation

The convolution integral arises naturally in many physical contexts:

- **System response**: If $h(t)$ is the impulse response of a linear system and $f(t)$ is the input, then the output is $(f * h)(t)$
- **Probability**: The sum of independent random variables has a PDF that is the convolution of individual PDFs
- **Signal processing**: Filtering operations are convolutions

## The Convolution Theorem

### Statement

If $\mathcal{L}\{f(t)\} = F(s)$ and $\mathcal{L}\{g(t)\} = G(s)$, then:

$$\mathcal{L}\{(f * g)(t)\} = F(s) \cdot G(s)$$

Equivalently, in inverse form:

$$\mathcal{L}^{-1}\{F(s) \cdot G(s)\} = (f * g)(t) = \int_0^t f(\tau)g(t-\tau) \, d\tau$$

### Proof

Starting with the definition of convolution:

$$\mathcal{L}\{(f * g)(t)\} = \int_0^{\infty} e^{-st} \left[\int_0^t f(\tau)g(t-\tau) \, d\tau\right] dt$$

This is a double integral over the region $0 \leq \tau \leq t < \infty$. Changing the order of integration (integrating first over $t$ from $\tau$ to $\infty$):

$$= \int_0^{\infty} f(\tau) \left[\int_{\tau}^{\infty} e^{-st}g(t-\tau) \, dt\right] d\tau$$

Let $u = t - \tau$, so $du = dt$:

$$= \int_0^{\infty} f(\tau) \left[\int_0^{\infty} e^{-s(u+\tau)}g(u) \, du\right] d\tau$$

$$= \int_0^{\infty} f(\tau)e^{-s\tau} d\tau \cdot \int_0^{\infty} e^{-su}g(u) \, du = F(s) \cdot G(s)$$

## Properties of Convolution

1. **Commutativity**: $f * g = g * f$

2. **Associativity**: $f * (g * h) = (f * g) * h$

3. **Distributivity**: $f * (g + h) = f * g + f * h$

4. **Identity**: $f * \delta = f$, where $\delta$ is the Dirac delta function

5. **Zero element**: $f * 0 = 0$

## Computing Convolutions

### Example 1: Simple Polynomial

Find $(1 * t)(t)$.

$$(1 * t)(t) = \int_0^t 1 \cdot \tau \, d\tau = \left[\frac{\tau^2}{2}\right]_0^t = \frac{t^2}{2}$$

**Verification using Laplace transforms**:

$$\mathcal{L}\{1\} \cdot \mathcal{L}\{t\} = \frac{1}{s} \cdot \frac{1}{s^2} = \frac{1}{s^3}$$

$$\mathcal{L}^{-1}\left\{\frac{1}{s^3}\right\} = \frac{t^2}{2!} = \frac{t^2}{2}$$ ✓

### Example 2: Exponentials

Find $(e^{at} * e^{bt})(t)$ for $a \neq b$.

$$(e^{at} * e^{bt})(t) = \int_0^t e^{a\tau}e^{b(t-\tau)} \, d\tau = e^{bt}\int_0^t e^{(a-b)\tau} \, d\tau$$

$$= e^{bt} \left[\frac{e^{(a-b)\tau}}{a-b}\right]_0^t = e^{bt} \cdot \frac{e^{(a-b)t} - 1}{a-b}$$

$$= \frac{e^{at} - e^{bt}}{a-b}$$

**Verification**:

$$\mathcal{L}\{e^{at}\} \cdot \mathcal{L}\{e^{bt}\} = \frac{1}{s-a} \cdot \frac{1}{s-b} = \frac{1}{(s-a)(s-b)}$$

Using partial fractions:

$$\frac{1}{(s-a)(s-b)} = \frac{1/(a-b)}{s-a} - \frac{1/(a-b)}{s-b}$$

$$\mathcal{L}^{-1}\left\{\frac{1}{(s-a)(s-b)}\right\} = \frac{e^{at} - e^{bt}}{a-b}$$ ✓

### Example 3: Sine and Cosine

Find $(\sin(t) * \cos(t))(t)$.

$$(\sin(t) * \cos(t))(t) = \int_0^t \sin(\tau)\cos(t-\tau) \, d\tau$$

Using the product-to-sum formula: $\sin(A)\cos(B) = \frac{1}{2}[\sin(A+B) + \sin(A-B)]$:

$$= \int_0^t \frac{1}{2}[\sin(t) + \sin(2\tau - t)] \, d\tau$$

$$= \frac{1}{2}\left[t\sin(t) + \left[-\frac{\cos(2\tau-t)}{2}\right]_0^t\right]$$

$$= \frac{1}{2}\left[t\sin(t) - \frac{1}{2}(\cos(t) - \cos(-t))\right] = \frac{t\sin(t)}{2}$$

**Verification**:

$$\mathcal{L}\{\sin(t)\} \cdot \mathcal{L}\{\cos(t)\} = \frac{1}{s^2+1} \cdot \frac{s}{s^2+1} = \frac{s}{(s^2+1)^2}$$

Using the derivative of transform property: $\mathcal{L}\{t\sin(t)\} = -\frac{d}{ds}\left[\frac{1}{s^2+1}\right] = \frac{2s}{(s^2+1)^2}$

Therefore: $\mathcal{L}^{-1}\left\{\frac{s}{(s^2+1)^2}\right\} = \frac{t\sin(t)}{2}$ ✓

## Using Convolution to Find Inverse Transforms

The convolution theorem provides an alternative to partial fractions for finding inverse transforms of products.

### Example 4

Find $\mathcal{L}^{-1}\left\{\frac{1}{s^2(s^2+1)}\right\}$.

Recognize this as $\frac{1}{s^2} \cdot \frac{1}{s^2+1}$.

We know:
- $\mathcal{L}^{-1}\left\{\frac{1}{s^2}\right\} = t$
- $\mathcal{L}^{-1}\left\{\frac{1}{s^2+1}\right\} = \sin(t)$

Therefore:

$$\mathcal{L}^{-1}\left\{\frac{1}{s^2(s^2+1)}\right\} = (t * \sin(t))(t) = \int_0^t \tau \sin(t-\tau) \, d\tau$$

Using integration by parts or the result from Example 3 with a shift:

$$= \int_0^t \tau \sin(t-\tau) \, d\tau = t - \sin(t)$$

### Example 5

Find $\mathcal{L}^{-1}\left\{\frac{s}{(s^2+a^2)(s^2+b^2)}\right\}$ for $a \neq b$.

Write as: $\frac{s}{s^2+a^2} \cdot \frac{1}{s^2+b^2}$

We have:
- $f(t) = \cos(at)$
- $g(t) = \frac{\sin(bt)}{b}$

$$\mathcal{L}^{-1}\left\{\frac{s}{(s^2+a^2)(s^2+b^2)}\right\} = \int_0^t \cos(a\tau) \cdot \frac{\sin(b(t-\tau))}{b} \, d\tau$$

$$= \frac{1}{b}\int_0^t \cos(a\tau)\sin(b(t-\tau)) \, d\tau$$

This can be evaluated using product-to-sum formulas, but it's often more efficient to use partial fractions in such cases.

## Solving Integral Equations

The convolution theorem is particularly useful for solving Volterra integral equations of the form:

$$y(t) = f(t) + \int_0^t K(t-\tau)y(\tau) \, d\tau$$

### Example 6

Solve $y(t) = t + \int_0^t (t-\tau)y(\tau) \, d\tau$.

Recognize the integral as a convolution: $\int_0^t (t-\tau)y(\tau) \, d\tau = (t * y)(t)$.

Taking Laplace transforms:

$$Y(s) = \frac{1}{s^2} + \frac{1}{s^2} \cdot Y(s)$$

$$Y(s) - \frac{Y(s)}{s^2} = \frac{1}{s^2}$$

$$Y(s)\left(1 - \frac{1}{s^2}\right) = \frac{1}{s^2}$$

$$Y(s) \cdot \frac{s^2-1}{s^2} = \frac{1}{s^2}$$

$$Y(s) = \frac{1}{s^2-1} = \frac{1}{(s-1)(s+1)}$$

Using partial fractions:

$$Y(s) = \frac{1/2}{s-1} - \frac{1/2}{s+1}$$

$$y(t) = \frac{1}{2}(e^t - e^{-t}) = \sinh(t)$$

### Example 7: Integro-Differential Equation

Solve $y'(t) = 1 + \int_0^t y(\tau) \, d\tau$ with $y(0) = 0$.

Taking Laplace transforms:

$$sY(s) - 0 = \frac{1}{s} + \frac{1}{s} \cdot Y(s)$$

$$sY(s) = \frac{1}{s} + \frac{Y(s)}{s}$$

$$Y(s)\left(s - \frac{1}{s}\right) = \frac{1}{s}$$

$$Y(s) \cdot \frac{s^2-1}{s} = \frac{1}{s}$$

$$Y(s) = \frac{1}{s^2-1} = \sinh(t)$$

(Same result as Example 6)

## Applications

### Transfer Functions

In systems theory, if $H(s)$ is the transfer function and $F(s)$ is the input, the output is:

$$Y(s) = H(s) \cdot F(s)$$

In the time domain:

$$y(t) = (h * f)(t)$$

where $h(t)$ is the impulse response.

### Green's Functions

Solutions to differential equations can be expressed as convolutions with Green's functions, which represent the response to an impulsive input.

## Summary

The convolution theorem states:

$$\mathcal{L}\{(f * g)(t)\} = F(s) \cdot G(s)$$

where $(f * g)(t) = \int_0^t f(\tau)g(t-\tau) \, d\tau$

Key applications include:

1. Finding inverse transforms of products without partial fractions
2. Solving integral equations and integro-differential equations
3. Analyzing linear system responses
4. Computing probability distributions

The convolution operation provides a fundamental link between multiplication in the frequency domain and integration in the time domain, making it indispensable in the study of linear systems and differential equations.
