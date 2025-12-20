# Introduction to the Laplace Transform

The Laplace transform is one of the most powerful tools in applied mathematics and engineering. It converts differential equations into algebraic equations, making them easier to solve. This transform, defined as an improper integral, is essential for analyzing control systems, electrical circuits, mechanical vibrations, and signal processing.

## Definition

The **Laplace transform** of a function $f(t)$ is defined as:

$$\mathcal{L}\{f(t)\} = F(s) = \int_0^\infty e^{-st} f(t)\,dt$$

where:
- $f(t)$ is defined for $t \geq 0$ (the "time domain" function)
- $s$ is a complex variable (often real and positive in introductory applications)
- $F(s)$ is the "frequency domain" or "s-domain" representation

**Key idea:** The Laplace transform is an improper integral that may or may not converge depending on $f(t)$ and $s$.

## Why the Laplace Transform Matters

**Problem:** Solving differential equations like:
$$y'' + 3y' + 2y = e^{-t}, \quad y(0) = 1, y'(0) = 0$$

is challenging using classical methods.

**Solution:** Apply the Laplace transform:
1. Transform converts derivatives to algebraic operations
2. Solve the resulting algebraic equation for $Y(s) = \mathcal{L}\{y(t)\}$
3. Apply the inverse transform to find $y(t)$

The Laplace transform handles discontinuous forcing functions, impulses, and initial conditions systematically.

## Basic Transforms

Let's compute the Laplace transforms of fundamental functions.

### Transform of $f(t) = 1$

$$\mathcal{L}\{1\} = \int_0^\infty e^{-st} \cdot 1\,dt = \lim_{b \to \infty} \int_0^b e^{-st}\,dt$$

For $s > 0$:
$$= \lim_{b \to \infty} \left[-\frac{1}{s}e^{-st}\right]_0^b = \lim_{b \to \infty} \left(-\frac{1}{s}e^{-sb} + \frac{1}{s}\right) = \frac{1}{s}$$

**Result:** $\mathcal{L}\{1\} = \frac{1}{s}$ for $s > 0$

### Transform of $f(t) = e^{at}$

$$\mathcal{L}\{e^{at}\} = \int_0^\infty e^{-st} \cdot e^{at}\,dt = \int_0^\infty e^{-(s-a)t}\,dt$$

For $s > a$:
$$= \lim_{b \to \infty} \left[-\frac{1}{s-a}e^{-(s-a)t}\right]_0^b = \frac{1}{s-a}$$

**Result:** $\mathcal{L}\{e^{at}\} = \frac{1}{s-a}$ for $s > a$

**Special cases:**
- $\mathcal{L}\{e^{-t}\} = \frac{1}{s+1}$ for $s > -1$
- $\mathcal{L}\{e^{2t}\} = \frac{1}{s-2}$ for $s > 2$

### Transform of $f(t) = t^n$

$$\mathcal{L}\{t^n\} = \int_0^\infty e^{-st} t^n\,dt$$

For $s > 0$, substitute $u = st$, so $t = u/s$ and $dt = du/s$:

$$= \int_0^\infty e^{-u} \left(\frac{u}{s}\right)^n \frac{du}{s} = \frac{1}{s^{n+1}} \int_0^\infty u^n e^{-u}\,du$$

By the gamma function:
$$= \frac{1}{s^{n+1}} \Gamma(n+1) = \frac{n!}{s^{n+1}}$$

**Result:** $\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}$ for $s > 0$

**Special cases:**
- $\mathcal{L}\{t\} = \frac{1}{s^2}$
- $\mathcal{L}\{t^2\} = \frac{2}{s^3}$
- $\mathcal{L}\{t^3\} = \frac{6}{s^4}$

### Transform of $f(t) = \sin(at)$

$$\mathcal{L}\{\sin(at)\} = \int_0^\infty e^{-st} \sin(at)\,dt$$

Use integration by parts twice (or Euler's formula $\sin(at) = \frac{e^{iat} - e^{-iat}}{2i}$):

**Result:** $\mathcal{L}\{\sin(at)\} = \frac{a}{s^2 + a^2}$ for $s > 0$

**Derivation using integration by parts:**

Let $I = \int_0^\infty e^{-st} \sin(at)\,dt$.

First integration by parts: $u = \sin(at)$, $dv = e^{-st}dt$:
$$I = \left[-\frac{1}{s}e^{-st}\sin(at)\right]_0^\infty + \frac{a}{s}\int_0^\infty e^{-st}\cos(at)\,dt$$

The boundary term vanishes, giving:
$$I = \frac{a}{s}\int_0^\infty e^{-st}\cos(at)\,dt$$

Second integration by parts on the new integral: $u = \cos(at)$, $dv = e^{-st}dt$:
$$\int_0^\infty e^{-st}\cos(at)\,dt = \left[-\frac{1}{s}e^{-st}\cos(at)\right]_0^\infty - \frac{a}{s}\int_0^\infty e^{-st}\sin(at)\,dt$$

$$= \frac{1}{s} - \frac{a}{s}I$$

Substituting back:
$$I = \frac{a}{s}\left(\frac{1}{s} - \frac{a}{s}I\right) = \frac{a}{s^2} - \frac{a^2}{s^2}I$$

Solving for $I$:
$$I + \frac{a^2}{s^2}I = \frac{a}{s^2}$$
$$I\left(1 + \frac{a^2}{s^2}\right) = \frac{a}{s^2}$$
$$I = \frac{a}{s^2 + a^2}$$

### Transform of $f(t) = \cos(at)$

Similarly:
$$\mathcal{L}\{\cos(at)\} = \frac{s}{s^2 + a^2}$$ for $s > 0$

## Table of Basic Laplace Transforms

| $f(t)$ | $F(s) = \mathcal{L}\{f(t)\}$ | Convergence |
|--------|------------------------------|-------------|
| $1$ | $\frac{1}{s}$ | $s > 0$ |
| $t$ | $\frac{1}{s^2}$ | $s > 0$ |
| $t^n$ | $\frac{n!}{s^{n+1}}$ | $s > 0$ |
| $e^{at}$ | $\frac{1}{s-a}$ | $s > a$ |
| $\sin(at)$ | $\frac{a}{s^2+a^2}$ | $s > 0$ |
| $\cos(at)$ | $\frac{s}{s^2+a^2}$ | $s > 0$ |
| $t e^{at}$ | $\frac{1}{(s-a)^2}$ | $s > a$ |
| $e^{at}\sin(bt)$ | $\frac{b}{(s-a)^2+b^2}$ | $s > a$ |
| $e^{at}\cos(bt)$ | $\frac{s-a}{(s-a)^2+b^2}$ | $s > a$ |

## Properties of the Laplace Transform

### 1. Linearity

$$\mathcal{L}\{af(t) + bg(t)\} = a\mathcal{L}\{f(t)\} + b\mathcal{L}\{g(t)\}$$

**Example 1:** Find $\mathcal{L}\{3e^{2t} + 5\sin(4t)\}$.

$$\mathcal{L}\{3e^{2t} + 5\sin(4t)\} = 3\mathcal{L}\{e^{2t}\} + 5\mathcal{L}\{\sin(4t)\}$$

$$= 3 \cdot \frac{1}{s-2} + 5 \cdot \frac{4}{s^2+16} = \frac{3}{s-2} + \frac{20}{s^2+16}$$

### 2. Transform of Derivatives

$$\mathcal{L}\{f'(t)\} = s\mathcal{L}\{f(t)\} - f(0)$$

$$\mathcal{L}\{f''(t)\} = s^2\mathcal{L}\{f(t)\} - sf(0) - f'(0)$$

**This is why the Laplace transform is powerful for differential equations!** Derivatives become algebraic operations.

**Derivation for first derivative:**

$$\mathcal{L}\{f'(t)\} = \int_0^\infty e^{-st} f'(t)\,dt$$

Integration by parts: $u = e^{-st}$, $dv = f'(t)dt$:

$$= \left[e^{-st}f(t)\right]_0^\infty + s\int_0^\infty e^{-st}f(t)\,dt$$

Assuming $f(t)$ doesn't grow faster than exponential, $\lim_{t \to \infty} e^{-st}f(t) = 0$:

$$= (0 - f(0)) + sF(s) = sF(s) - f(0)$$

### 3. First Shifting Theorem (s-shift)

$$\mathcal{L}\{e^{at}f(t)\} = F(s-a)$$

**Example 2:** Find $\mathcal{L}\{e^{3t}\cos(2t)\}$.

We know $\mathcal{L}\{\cos(2t)\} = \frac{s}{s^2+4}$.

By shifting theorem:
$$\mathcal{L}\{e^{3t}\cos(2t)\} = \frac{s-3}{(s-3)^2+4}$$

### 4. Second Shifting Theorem (t-shift)

For the unit step function $u(t-a)$ (equals 0 for $t < a$, equals 1 for $t \geq a$):

$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$$

This handles delayed or shifted functions.

## Solving Differential Equations

**Example 3:** Solve $y' + 2y = e^{-t}$ with $y(0) = 3$.

**Step 1:** Take Laplace transform of both sides.

$$\mathcal{L}\{y' + 2y\} = \mathcal{L}\{e^{-t}\}$$

$$\mathcal{L}\{y'\} + 2\mathcal{L}\{y\} = \mathcal{L}\{e^{-t}\}$$

**Step 2:** Apply derivative property.

$$sY(s) - y(0) + 2Y(s) = \frac{1}{s+1}$$

$$sY(s) - 3 + 2Y(s) = \frac{1}{s+1}$$

**Step 3:** Solve for $Y(s)$.

$$(s + 2)Y(s) = \frac{1}{s+1} + 3$$

$$Y(s) = \frac{1}{(s+1)(s+2)} + \frac{3}{s+2}$$

**Step 4:** Use partial fractions.

For $\frac{1}{(s+1)(s+2)}$:
$$\frac{1}{(s+1)(s+2)} = \frac{A}{s+1} + \frac{B}{s+2}$$

Solving: $A = 1$, $B = -1$.

$$Y(s) = \frac{1}{s+1} - \frac{1}{s+2} + \frac{3}{s+2} = \frac{1}{s+1} + \frac{2}{s+2}$$

**Step 5:** Take inverse transform.

$$y(t) = \mathcal{L}^{-1}\left\{\frac{1}{s+1}\right\} + \mathcal{L}^{-1}\left\{\frac{2}{s+2}\right\}$$

$$y(t) = e^{-t} + 2e^{-2t}$$

**Verification:** $y(0) = 1 + 2 = 3$ ✓

$y' = -e^{-t} - 4e^{-2t}$

$y' + 2y = (-e^{-t} - 4e^{-2t}) + 2(e^{-t} + 2e^{-2t}) = e^{-t}$ ✓

## Second-Order Differential Equations

**Example 4:** Solve $y'' + 4y = 0$ with $y(0) = 2$, $y'(0) = 0$.

**Step 1:** Take Laplace transform.

$$\mathcal{L}\{y''\} + 4\mathcal{L}\{y\} = 0$$

$$s^2Y(s) - sy(0) - y'(0) + 4Y(s) = 0$$

$$s^2Y(s) - 2s + 4Y(s) = 0$$

**Step 2:** Solve for $Y(s)$.

$$(s^2 + 4)Y(s) = 2s$$

$$Y(s) = \frac{2s}{s^2 + 4}$$

**Step 3:** Inverse transform.

$$Y(s) = 2 \cdot \frac{s}{s^2 + 4}$$

We recognize $\mathcal{L}\{\cos(2t)\} = \frac{s}{s^2+4}$:

$$y(t) = 2\cos(2t)$$

## Region of Convergence

Not all functions have Laplace transforms. The integral $\int_0^\infty e^{-st}f(t)\,dt$ must converge.

**Example 5:** Does $f(t) = e^{t^2}$ have a Laplace transform?

$$\mathcal{L}\{e^{t^2}\} = \int_0^\infty e^{-st} e^{t^2}\,dt = \int_0^\infty e^{t^2 - st}\,dt$$

For any fixed $s$, as $t \to \infty$, $t^2 - st \to \infty$, so $e^{t^2-st} \to \infty$.

The integral diverges. $f(t) = e^{t^2}$ has no Laplace transform.

**General principle:** Functions of **exponential order** have Laplace transforms. A function is of exponential order if $|f(t)| \leq Me^{at}$ for some constants $M, a$.

## Applications

### 1. Electrical Circuits

RLC circuits with voltage source $V(t)$ satisfy:
$$L\frac{dI}{dt} + RI + \frac{1}{C}\int I\,dt = V(t)$$

The Laplace transform converts this to algebra.

### 2. Mechanical Vibrations

Spring-mass-damper systems:
$$m\frac{d^2x}{dt^2} + c\frac{dx}{dt} + kx = F(t)$$

Laplace transform handles impulse forces and discontinuous inputs elegantly.

### 3. Control Systems

Transfer functions $H(s) = \frac{Y(s)}{X(s)}$ characterize system behavior, enabling stability analysis and controller design.

## Summary

- The **Laplace transform** $\mathcal{L}\{f(t)\} = \int_0^\infty e^{-st}f(t)\,dt$ converts time-domain functions to s-domain
- **Basic transforms:** $\mathcal{L}\{1\} = \frac{1}{s}$, $\mathcal{L}\{t^n\} = \frac{n!}{s^{n+1}}$, $\mathcal{L}\{e^{at}\} = \frac{1}{s-a}$
- **Trigonometric:** $\mathcal{L}\{\sin(at)\} = \frac{a}{s^2+a^2}$, $\mathcal{L}\{\cos(at)\} = \frac{s}{s^2+a^2}$
- **Linearity:** $\mathcal{L}\{af + bg\} = a\mathcal{L}\{f\} + b\mathcal{L}\{g\}$
- **Derivative property:** $\mathcal{L}\{f'\} = sF(s) - f(0)$ (converts ODEs to algebra)
- **Solving ODEs:** Transform equation → solve algebraically → inverse transform
- Functions must be of **exponential order** for transform to exist
- Applications include **circuits**, **mechanics**, and **control systems**

The Laplace transform exemplifies how improper integrals enable powerful mathematical techniques that simplify otherwise difficult problems in science and engineering.
