---
id: math401-topic-1-4
title: "Exponential Form and Euler\"
order: 4
---

# Euler's Formula

Euler's formula, $e^{i\theta} = \cos\theta + i\sin\theta$, is one of the most profound and beautiful equations in mathematics. It establishes a deep connection between exponential functions, trigonometry, and complex numbers, unifying seemingly disparate areas of mathematics.

## Statement of Euler's Formula

For any real number $\theta$:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

This formula extends the exponential function to complex arguments in a natural way that preserves the fundamental property $e^{a+b} = e^a e^b$.

## Historical Context

Leonhard Euler (1707-1783) discovered this relationship in the 18th century, though he initially expressed it through infinite series rather than the modern complex exponential notation. The formula was revolutionary because it connected:

- **Algebra** (exponential functions)
- **Geometry** (circular motion)
- **Trigonometry** (sine and cosine)
- **Analysis** (calculus and series)

Roger Cotes had earlier found a related formula in 1714, but Euler's systematic development and the notation $e^{i\theta}$ made it fundamental to mathematical practice.

## Proof via Taylor Series

The most rigorous elementary proof uses the Taylor series expansions of $e^x$, $\cos x$, and $\sin x$.

### Taylor Series

For real $x$:

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

$$\cos x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!} = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$$

$$\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$

### Complex Extension

We define $e^z$ for complex $z$ by the same series:

$$e^z = \sum_{n=0}^{\infty} \frac{z^n}{n!}$$

This series converges absolutely for all $z \in \mathbb{C}$ (the radius of convergence is infinite).

### The Proof

Substitute $z = i\theta$ where $\theta \in \mathbb{R}$:

$$e^{i\theta} = \sum_{n=0}^{\infty} \frac{(i\theta)^n}{n!} = \sum_{n=0}^{\infty} \frac{i^n \theta^n}{n!}$$

Separate into even and odd terms:

$$e^{i\theta} = \sum_{n=0}^{\infty} \frac{i^{2n} \theta^{2n}}{(2n)!} + \sum_{n=0}^{\infty} \frac{i^{2n+1} \theta^{2n+1}}{(2n+1)!}$$

Since $i^{2n} = (i^2)^n = (-1)^n$ and $i^{2n+1} = i \cdot i^{2n} = i(-1)^n$:

$$e^{i\theta} = \sum_{n=0}^{\infty} \frac{(-1)^n \theta^{2n}}{(2n)!} + i\sum_{n=0}^{\infty} \frac{(-1)^n \theta^{2n+1}}{(2n+1)!}$$

$$= \cos\theta + i\sin\theta$$

This completes the proof.

## Alternative Proof via Differential Equations

Consider the function $f(\theta) = e^{i\theta}$. We'll show it satisfies the same differential equation and initial condition as $\cos\theta + i\sin\theta$.

### Step 1: Compute the derivative

Using the chain rule (extending calculus to complex-valued functions):

$$\frac{d}{d\theta} e^{i\theta} = i e^{i\theta}$$

### Step 2: The differential equation

This means $f'(\theta) = if(\theta)$, a first-order linear ODE.

Now consider $g(\theta) = \cos\theta + i\sin\theta$:

$$g'(\theta) = -\sin\theta + i\cos\theta = i(\cos\theta + i\sin\theta) = ig(\theta)$$

Both functions satisfy the same ODE: $h'(\theta) = ih(\theta)$.

### Step 3: Initial conditions

At $\theta = 0$:
- $f(0) = e^{i \cdot 0} = e^0 = 1$
- $g(0) = \cos 0 + i\sin 0 = 1 + 0i = 1$

### Step 4: Uniqueness

The solution to the initial value problem $h' = ih$, $h(0) = 1$ is unique. Therefore $f(\theta) = g(\theta)$ for all $\theta$.

This proves Euler's formula.

## Euler's Identity

Setting $\theta = \pi$ in Euler's formula yields the famous **Euler's identity**:

$$e^{i\pi} = \cos\pi + i\sin\pi = -1 + 0i = -1$$

Rearranging:
$$e^{i\pi} + 1 = 0$$

This single equation connects five of the most fundamental constants in mathematics:
- $e$ (the base of natural logarithms)
- $i$ (the imaginary unit)
- $\pi$ (the ratio of circumference to diameter)
- $1$ (the multiplicative identity)
- $0$ (the additive identity)

Richard Feynman called it "the most remarkable formula in mathematics." Benjamin Peirce, after proving it to his students, said "Gentlemen, that is surely true, it is absolutely paradoxical; we cannot understand it, and we don't know what it means, but we have proved it, and therefore we know it must be the truth."

### Other Special Values

- $e^{i\pi/2} = \cos\frac{\pi}{2} + i\sin\frac{\pi}{2} = i$
- $e^{i\pi/4} = \cos\frac{\pi}{4} + i\sin\frac{\pi}{4} = \frac{1}{\sqrt{2}}(1 + i)$
- $e^{i\pi/3} = \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} = \frac{1}{2}(1 + i\sqrt{3})$
- $e^{2\pi i} = \cos 2\pi + i\sin 2\pi = 1$
- $e^{-i\pi/2} = \cos\left(-\frac{\pi}{2}\right) + i\sin\left(-\frac{\pi}{2}\right) = -i$

## Properties and Consequences

### Periodicity

Since $\cos$ and $\sin$ have period $2\pi$:

$$e^{i(\theta + 2\pi k)} = e^{i\theta} e^{2\pi i k} = e^{i\theta} \cdot 1 = e^{i\theta}$$

for any integer $k$. The complex exponential is periodic with pure imaginary periods: $e^{i\theta}$ has period $2\pi i$.

### Conjugate Relationship

$$e^{-i\theta} = \cos(-\theta) + i\sin(-\theta) = \cos\theta - i\sin\theta = \overline{e^{i\theta}}$$

Therefore:
$$\overline{e^{i\theta}} = e^{-i\theta}$$

### Extracting Cosine and Sine

Adding and subtracting the equations $e^{i\theta} = \cos\theta + i\sin\theta$ and $e^{-i\theta} = \cos\theta - i\sin\theta$:

$$e^{i\theta} + e^{-i\theta} = 2\cos\theta$$
$$e^{i\theta} - e^{-i\theta} = 2i\sin\theta$$

Thus:
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$$

$$\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$$

These formulas express trigonometric functions in terms of exponentials, which is often more convenient for calculations and proofs.

### Modulus and Argument

For $z = e^{i\theta}$:

$$|e^{i\theta}| = |\cos\theta + i\sin\theta| = \sqrt{\cos^2\theta + \sin^2\theta} = 1$$

$$\arg(e^{i\theta}) = \theta$$

So $e^{i\theta}$ always lies on the unit circle, with argument $\theta$.

## General Complex Exponential

For a general complex number $z = x + iy$ where $x, y \in \mathbb{R}$:

$$e^z = e^{x+iy} = e^x e^{iy} = e^x(\cos y + i\sin y)$$

In polar form:
$$e^{x+iy} = e^x \cdot e^{iy}$$

has modulus $e^x$ and argument $y$.

### Geometric Interpretation

- The real part $x$ controls the modulus (distance from origin)
- The imaginary part $y$ controls the argument (angle)

**Examples**:

1. $e^{1+i\pi/4} = e^1 \cdot e^{i\pi/4} = e \cdot \frac{1}{\sqrt{2}}(1 + i) = \frac{e}{\sqrt{2}}(1 + i)$

2. $e^{-2+i\pi} = e^{-2} \cdot e^{i\pi} = e^{-2} \cdot (-1) = -e^{-2}$

3. $e^{i\pi/2 + \ln 2} = e^{\ln 2} \cdot e^{i\pi/2} = 2i$

## Proving Trigonometric Identities

Euler's formula provides elegant proofs of trigonometric identities.

### Addition Formulas

Consider $e^{i(\alpha + \beta)}$:

$$e^{i(\alpha + \beta)} = \cos(\alpha + \beta) + i\sin(\alpha + \beta)$$

But also:
$$e^{i(\alpha + \beta)} = e^{i\alpha} \cdot e^{i\beta} = (\cos\alpha + i\sin\alpha)(\cos\beta + i\sin\beta)$$

$$= \cos\alpha\cos\beta - \sin\alpha\sin\beta + i(\sin\alpha\cos\beta + \cos\alpha\sin\beta)$$

Equating real and imaginary parts:

$$\cos(\alpha + \beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta$$

$$\sin(\alpha + \beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta$$

These are the angle addition formulas, proven in just a few lines!

### Double Angle Formulas

Set $\alpha = \beta = \theta$:

$$e^{2i\theta} = (e^{i\theta})^2 = (\cos\theta + i\sin\theta)^2$$

$$= \cos^2\theta - \sin^2\theta + 2i\sin\theta\cos\theta$$

Also:
$$e^{2i\theta} = \cos 2\theta + i\sin 2\theta$$

Equating:
$$\cos 2\theta = \cos^2\theta - \sin^2\theta$$

$$\sin 2\theta = 2\sin\theta\cos\theta$$

### Power Reduction Formulas

From $\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$:

$$\cos^2\theta = \left(\frac{e^{i\theta} + e^{-i\theta}}{2}\right)^2 = \frac{e^{2i\theta} + 2 + e^{-2i\theta}}{4}$$

$$= \frac{1}{4}(e^{2i\theta} + e^{-2i\theta}) + \frac{1}{2} = \frac{1}{2}\cos 2\theta + \frac{1}{2}$$

$$= \frac{1 + \cos 2\theta}{2}$$

Similarly:
$$\sin^2\theta = \frac{1 - \cos 2\theta}{2}$$

## Applications

### Fourier Analysis

The Fourier transform represents functions as sums of complex exponentials:

$$f(x) = \int_{-\infty}^{\infty} \hat{f}(\omega) e^{i\omega x} d\omega$$

Without Euler's formula, Fourier analysis would be far more cumbersome.

### Quantum Mechanics

The Schrödinger equation involves complex wave functions that evolve as:

$$\psi(t) = e^{-iEt/\hbar} \psi(0)$$

The phase $e^{-iEt/\hbar}$ is a direct application of Euler's formula.

### Electrical Engineering

AC circuits use phasor analysis, representing sinusoidal currents and voltages as complex exponentials:

$$V(t) = V_0 e^{i(\omega t + \phi)} = V_0 [\cos(\omega t + \phi) + i\sin(\omega t + \phi)]$$

Impedance, reactance, and phase shifts are naturally expressed with complex numbers.

### Differential Equations

The characteristic equation method for solving linear ODEs relies on complex exponentials. For $y'' + y = 0$, the general solution is:

$$y = c_1 e^{it} + c_2 e^{-it} = A\cos t + B\sin t$$

Euler's formula connects these two forms.

## Extending to Hyperbolic Functions

Just as $e^{i\theta}$ relates to circular functions, $e^{\theta}$ relates to **hyperbolic functions**:

$$\cosh\theta = \frac{e^{\theta} + e^{-\theta}}{2}$$

$$\sinh\theta = \frac{e^{\theta} - e^{-\theta}}{2}$$

Notice the parallel with:
$$\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}, \quad \sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$$

This suggests:
$$\cosh(i\theta) = \cos\theta, \quad \sinh(i\theta) = i\sin\theta$$

Indeed, hyperbolic and circular functions are related by replacing $\theta$ with $i\theta$.

## Complex Powers

Euler's formula allows us to define complex powers rigorously.

For $z = re^{i\theta}$ and integer $n$:

$$z^n = r^n e^{in\theta}$$

For rational $n = p/q$:

$$z^{p/q} = r^{p/q} e^{i p\theta/q}$$

(though this is multi-valued for $q > 1$).

For arbitrary complex $w$:

$$z^w = e^{w \log z}$$

where $\log z = \ln r + i\theta$ (the complex logarithm, also multi-valued).

**Example**: What is $i^i$?

Write $i = e^{i\pi/2}$ (using the principal value):

$$i^i = (e^{i\pi/2})^i = e^{i^2 \pi/2} = e^{-\pi/2} \approx 0.2079$$

Surprisingly, $i^i$ is a positive real number!

## Visualization

Euler's formula can be visualized as a rotating vector in the complex plane. As $\theta$ increases from $0$ to $2\pi$:

- $e^{i\theta}$ traces the unit circle counterclockwise
- The real part $\cos\theta$ oscillates between $-1$ and $1$
- The imaginary part $\sin\theta$ oscillates between $-1$ and $1$
- The motion has constant angular velocity if $\theta$ increases linearly with time

This rotational interpretation makes multiplication by $e^{i\theta}$ represent rotation by angle $\theta$, fundamental in 2D geometry and physics.

## Summary

- Euler's formula: $e^{i\theta} = \cos\theta + i\sin\theta$
- Proof via Taylor series or differential equations
- Euler's identity: $e^{i\pi} + 1 = 0$
- $\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$, $\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$
- $e^{i\theta}$ lies on the unit circle with argument $\theta$
- General form: $e^{x+iy} = e^x(\cos y + i\sin y)$
- Provides elegant proofs of trigonometric identities
- Fundamental to Fourier analysis, quantum mechanics, and engineering
- Unifies exponential, trigonometric, and complex number theory
