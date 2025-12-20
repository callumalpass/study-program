---
id: math203-t3-exp-log
title: "Exponential and Logarithmic Derivatives"
order: 5
---

# Derivatives of Exponential and Logarithmic Functions

Exponential and logarithmic functions are fundamental in modeling growth, decay, and many natural phenomena. Their derivatives have remarkably simple forms.

## The Natural Exponential Function

$$\frac{d}{dx}[e^x] = e^x$$

The function $e^x$ is its own derivative! This is the defining property of the number $e$.

**Why is this special?**
Among all exponential functions $a^x$, only $e^x$ (where $e \approx 2.71828$) has the property that its derivative at $x = 0$ is exactly 1, which leads to the derivative being itself.

## The Natural Logarithm

$$\frac{d}{dx}[\ln x] = \frac{1}{x} \quad (x > 0)$$

**Proof from inverse function:**
If $y = \ln x$, then $e^y = x$.
Differentiating implicitly: $e^y \cdot \frac{dy}{dx} = 1$
So $\frac{dy}{dx} = \frac{1}{e^y} = \frac{1}{x}$

## General Exponential Functions

For any base $a > 0$, $a \neq 1$:

$$\frac{d}{dx}[a^x] = a^x \ln a$$

**Derivation:** Write $a^x = e^{x \ln a}$ and use chain rule:
$$\frac{d}{dx}[e^{x \ln a}] = e^{x \ln a} \cdot \ln a = a^x \ln a$$

**Special cases:**
- $\frac{d}{dx}[2^x] = 2^x \ln 2$
- $\frac{d}{dx}[10^x] = 10^x \ln 10$
- $\frac{d}{dx}[e^x] = e^x \ln e = e^x \cdot 1 = e^x$ ✓

## General Logarithmic Functions

For any base $a > 0$, $a \neq 1$:

$$\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$$

**Derivation:** Use change of base: $\log_a x = \frac{\ln x}{\ln a}$

$$\frac{d}{dx}\left[\frac{\ln x}{\ln a}\right] = \frac{1}{\ln a} \cdot \frac{1}{x} = \frac{1}{x \ln a}$$

**Special case:** $\frac{d}{dx}[\log_{10} x] = \frac{1}{x \ln 10}$

## With the Chain Rule

$$\frac{d}{dx}[e^{g(x)}] = e^{g(x)} \cdot g'(x)$$

$$\frac{d}{dx}[\ln(g(x))] = \frac{g'(x)}{g(x)}$$

This second formula is particularly useful and often written as:
$$\frac{d}{dx}[\ln u] = \frac{u'}{u}$$

## Examples with Exponentials

**Example 1:** $\frac{d}{dx}[e^{3x}] = e^{3x} \cdot 3 = 3e^{3x}$

**Example 2:** $\frac{d}{dx}[e^{x^2}] = e^{x^2} \cdot 2x = 2xe^{x^2}$

**Example 3:** $\frac{d}{dx}[e^{-x}] = e^{-x} \cdot (-1) = -e^{-x}$

**Example 4:** $\frac{d}{dx}[e^{\sin x}] = e^{\sin x} \cdot \cos x = \cos x \cdot e^{\sin x}$

**Example 5:** $\frac{d}{dx}[xe^x]$ (product rule)
$$= 1 \cdot e^x + x \cdot e^x = e^x(1 + x)$$

## Examples with Logarithms

**Example 1:** $\frac{d}{dx}[\ln(3x)] = \frac{3}{3x} = \frac{1}{x}$

**Alternative:** $\ln(3x) = \ln 3 + \ln x$, so $\frac{d}{dx} = 0 + \frac{1}{x} = \frac{1}{x}$ ✓

**Example 2:** $\frac{d}{dx}[\ln(x^2)] = \frac{2x}{x^2} = \frac{2}{x}$

**Alternative:** $\ln(x^2) = 2\ln x$, so $\frac{d}{dx} = \frac{2}{x}$ ✓

**Example 3:** $\frac{d}{dx}[\ln(\sin x)] = \frac{\cos x}{\sin x} = \cot x$

**Example 4:** $\frac{d}{dx}[\ln(x^2 + 1)] = \frac{2x}{x^2 + 1}$

**Example 5:** $\frac{d}{dx}[x \ln x]$ (product rule)
$$= 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

## Logarithmic Differentiation

For complicated products, quotients, or powers, taking logarithms first can simplify differentiation.

**Example:** Find $\frac{d}{dx}[x^x]$ for $x > 0$.

Let $y = x^x$. Take logarithms: $\ln y = x \ln x$

Differentiate both sides:
$$\frac{1}{y} \cdot \frac{dy}{dx} = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

Solve for $\frac{dy}{dx}$:
$$\frac{dy}{dx} = y(\ln x + 1) = x^x(\ln x + 1)$$

**Example:** Find $\frac{d}{dx}\left[\frac{x^2\sqrt{x+1}}{(x-2)^3}\right]$

Let $y = \frac{x^2\sqrt{x+1}}{(x-2)^3}$

$\ln y = 2\ln x + \frac{1}{2}\ln(x+1) - 3\ln(x-2)$

$\frac{y'}{y} = \frac{2}{x} + \frac{1}{2(x+1)} - \frac{3}{x-2}$

$y' = \frac{x^2\sqrt{x+1}}{(x-2)^3}\left(\frac{2}{x} + \frac{1}{2(x+1)} - \frac{3}{x-2}\right)$

## Summary Table

| Function | Derivative |
|----------|------------|
| $e^x$ | $e^x$ |
| $a^x$ | $a^x \ln a$ |
| $\ln x$ | $\frac{1}{x}$ |
| $\log_a x$ | $\frac{1}{x \ln a}$ |
| $e^{g(x)}$ | $e^{g(x)} \cdot g'(x)$ |
| $\ln(g(x))$ | $\frac{g'(x)}{g(x)}$ |

## Summary

- $e^x$ is its own derivative
- $\frac{d}{dx}[\ln x] = \frac{1}{x}$
- General bases: $\frac{d}{dx}[a^x] = a^x \ln a$
- Chain rule pattern: $\frac{d}{dx}[\ln u] = \frac{u'}{u}$
- Logarithmic differentiation simplifies complex products/quotients/powers
- Use properties of logarithms to simplify before differentiating when possible
