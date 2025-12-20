---
id: math401-topic-1-5
title: "Roots of Unity"
order: 5
---

# De Moivre's Theorem

De Moivre's theorem is a powerful result connecting complex numbers, trigonometry, and algebra. Named after Abraham de Moivre (1667-1754), it provides a formula for computing powers of complex numbers in polar form and extracting roots. The theorem has profound implications for solving polynomial equations, deriving trigonometric identities, and understanding the structure of complex numbers.

## Statement of De Moivre's Theorem

**De Moivre's Theorem**: For any real number $\theta$ and any integer $n$:

$$(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$$

Equivalently, using the exponential form from Euler's formula:

$$(e^{i\theta})^n = e^{in\theta}$$

The theorem holds for positive integers, negative integers, and indeed all real numbers $n$ (with appropriate interpretation for non-integer powers).

## Historical Context

Abraham de Moivre discovered this theorem in 1707, well before Euler developed the exponential form of complex numbers. De Moivre's original formulation was purely trigonometric, making his achievement even more remarkable.

The theorem was instrumental in:
- Developing formulas for $\cos(n\theta)$ and $\sin(n\theta)$
- Finding roots of complex numbers systematically
- Solving cubic and quartic equations
- Advancing probability theory (De Moivre also derived the normal distribution)

## Proof for Positive Integers

We prove the theorem for positive integers $n$ by mathematical induction.

**Base case** ($n = 1$):
$$(\cos\theta + i\sin\theta)^1 = \cos(1 \cdot \theta) + i\sin(1 \cdot \theta)$$ ✓

**Inductive step**: Assume the formula holds for some positive integer $k$:
$$(\cos\theta + i\sin\theta)^k = \cos(k\theta) + i\sin(k\theta)$$

We must show it holds for $k + 1$:

$$(\cos\theta + i\sin\theta)^{k+1} = (\cos\theta + i\sin\theta)^k \cdot (\cos\theta + i\sin\theta)$$

By the inductive hypothesis:
$$= [\cos(k\theta) + i\sin(k\theta)] \cdot [\cos\theta + i\sin\theta]$$

Expanding:
$$= \cos(k\theta)\cos\theta + i\cos(k\theta)\sin\theta + i\sin(k\theta)\cos\theta + i^2\sin(k\theta)\sin\theta$$

$$= \cos(k\theta)\cos\theta - \sin(k\theta)\sin\theta + i[\cos(k\theta)\sin\theta + \sin(k\theta)\cos\theta]$$

Using the angle addition formulas:
$$= \cos(k\theta + \theta) + i\sin(k\theta + \theta)$$

$$= \cos[(k+1)\theta] + i\sin[(k+1)\theta]$$

By mathematical induction, the theorem holds for all positive integers $n$.

## Proof for Negative Integers

For negative integers, let $n = -m$ where $m > 0$.

$$(\cos\theta + i\sin\theta)^{-m} = \frac{1}{(\cos\theta + i\sin\theta)^m}$$

By the theorem for positive integers:
$$= \frac{1}{\cos(m\theta) + i\sin(m\theta)}$$

Multiply numerator and denominator by the conjugate:
$$= \frac{\cos(m\theta) - i\sin(m\theta)}{\cos^2(m\theta) + \sin^2(m\theta)} = \cos(m\theta) - i\sin(m\theta)$$

$$= \cos(-m\theta) + i\sin(-m\theta)$$

So the theorem holds for negative integers as well.

## Proof via Euler's Formula

With Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$, the proof becomes trivial:

$$(e^{i\theta})^n = e^{in\theta} = \cos(n\theta) + i\sin(n\theta)$$

This modern proof showcases the power of exponential notation.

## Computing Powers

De Moivre's theorem dramatically simplifies computing powers of complex numbers.

### Example 1: $(1 + i)^{20}$

**Step 1**: Convert to polar form.
$$1 + i = \sqrt{2}(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}) = \sqrt{2} \cdot e^{i\pi/4}$$

**Step 2**: Apply De Moivre's theorem.
$$(1 + i)^{20} = (\sqrt{2})^{20} \left(\cos\frac{20\pi}{4} + i\sin\frac{20\pi}{4}\right)$$

$$= 2^{10} (\cos 5\pi + i\sin 5\pi) = 1024(-1 + 0i) = -1024$$

Compare this to expanding $(1 + i)^{20}$ directly using the binomial theorem!

### Example 2: $\left(\frac{\sqrt{3} - i}{2}\right)^{12}$

**Step 1**: Convert to polar form.
$$\frac{\sqrt{3} - i}{2} = \frac{\sqrt{3}}{2} - \frac{1}{2}i$$

$$r = \sqrt{\frac{3}{4} + \frac{1}{4}} = 1$$

$$\theta = \arctan\left(\frac{-1/2}{\sqrt{3}/2}\right) = \arctan\left(-\frac{1}{\sqrt{3}}\right) = -\frac{\pi}{6}$$

So: $\frac{\sqrt{3} - i}{2} = e^{-i\pi/6}$

**Step 2**: Apply De Moivre's theorem.
$$\left(\frac{\sqrt{3} - i}{2}\right)^{12} = e^{-i12\pi/6} = e^{-2\pi i} = \cos(-2\pi) + i\sin(-2\pi) = 1$$

### Example 3: $\left(\frac{-1 + i\sqrt{3}}{2}\right)^{100}$

Convert: $r = 1$, $\theta = \frac{2\pi}{3}$

$$\left(\frac{-1 + i\sqrt{3}}{2}\right)^{100} = e^{i \cdot 100 \cdot 2\pi/3} = e^{i200\pi/3}$$

Since $200\pi/3 = 66\frac{2}{3}\pi = 66\pi + \frac{2\pi}{3}$:

$$= e^{i(66\pi + 2\pi/3)} = e^{i66\pi} \cdot e^{i2\pi/3} = 1 \cdot e^{i2\pi/3}$$

$$= \cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3} = -\frac{1}{2} + i\frac{\sqrt{3}}{2}$$

## Deriving Trigonometric Identities

De Moivre's theorem provides a systematic method for deriving formulas for $\cos(n\theta)$ and $\sin(n\theta)$.

### Multiple Angle Formulas

**For $n = 2$**:

$$(\cos\theta + i\sin\theta)^2 = \cos 2\theta + i\sin 2\theta$$

Expand the left side:
$$\cos^2\theta + 2i\cos\theta\sin\theta - \sin^2\theta = \cos 2\theta + i\sin 2\theta$$

Equating real and imaginary parts:
$$\cos 2\theta = \cos^2\theta - \sin^2\theta$$
$$\sin 2\theta = 2\sin\theta\cos\theta$$

**For $n = 3$**:

$$(\cos\theta + i\sin\theta)^3 = \cos 3\theta + i\sin 3\theta$$

$$\cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta = \cos 3\theta + i\sin 3\theta$$

Real part:
$$\cos 3\theta = \cos^3\theta - 3\cos\theta\sin^2\theta = \cos^3\theta - 3\cos\theta(1 - \cos^2\theta)$$
$$= 4\cos^3\theta - 3\cos\theta$$

Imaginary part:
$$\sin 3\theta = 3\cos^2\theta\sin\theta - \sin^3\theta = 3(1 - \sin^2\theta)\sin\theta - \sin^3\theta$$
$$= 3\sin\theta - 4\sin^3\theta$$

**For $n = 4$**:

Following the same process:
$$\cos 4\theta = \cos^4\theta - 6\cos^2\theta\sin^2\theta + \sin^4\theta = 8\cos^4\theta - 8\cos^2\theta + 1$$

$$\sin 4\theta = 4\cos^3\theta\sin\theta - 4\cos\theta\sin^3\theta = 4\sin\theta\cos\theta(1 - 2\sin^2\theta)$$

### Expressing Powers in Terms of Multiple Angles

Using De Moivre and the binomial theorem, we can express $\cos^n\theta$ and $\sin^n\theta$ in terms of $\cos(k\theta)$ and $\sin(k\theta)$.

**Example**: Express $\cos^4\theta$ in terms of multiple angles.

From $\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$:

$$\cos^4\theta = \left(\frac{e^{i\theta} + e^{-i\theta}}{2}\right)^4 = \frac{1}{16}(e^{i\theta} + e^{-i\theta})^4$$

By the binomial theorem:
$$= \frac{1}{16}\sum_{k=0}^{4} \binom{4}{k} e^{ik\theta} e^{-i(4-k)\theta} = \frac{1}{16}\sum_{k=0}^{4} \binom{4}{k} e^{i(2k-4)\theta}$$

$$= \frac{1}{16}[e^{-4i\theta} + 4e^{-2i\theta} + 6 + 4e^{2i\theta} + e^{4i\theta}]$$

$$= \frac{1}{16}[(e^{4i\theta} + e^{-4i\theta}) + 4(e^{2i\theta} + e^{-2i\theta}) + 6]$$

$$= \frac{1}{16}[2\cos 4\theta + 8\cos 2\theta + 6]$$

$$= \frac{1}{8}\cos 4\theta + \frac{1}{2}\cos 2\theta + \frac{3}{8}$$

This formula is useful in integration and Fourier analysis.

## Roots of Complex Numbers

De Moivre's theorem extends to fractional powers, providing a systematic way to find $n$-th roots.

### The $n$-th Root Theorem

If $z = r(\cos\theta + i\sin\theta) = re^{i\theta}$, then the $n$ distinct $n$-th roots of $z$ are:

$$w_k = r^{1/n} \left[\cos\left(\frac{\theta + 2\pi k}{n}\right) + i\sin\left(\frac{\theta + 2\pi k}{n}\right)\right]$$

for $k = 0, 1, 2, \ldots, n-1$.

In exponential form:
$$w_k = r^{1/n} e^{i(\theta + 2\pi k)/n}$$

### Derivation

We seek $w$ such that $w^n = z$. Let $w = \rho e^{i\phi}$.

$$(\rho e^{i\phi})^n = re^{i\theta}$$

By De Moivre:
$$\rho^n e^{in\phi} = re^{i\theta}$$

Equating moduli: $\rho^n = r \implies \rho = r^{1/n}$ (the positive real $n$-th root)

Equating arguments: $n\phi = \theta + 2\pi k$ for integer $k$

$$\phi = \frac{\theta + 2\pi k}{n}$$

For $k = 0, 1, \ldots, n-1$, we get $n$ distinct values differing by $\frac{2\pi}{n}$. For $k \geq n$, the values repeat.

### Geometric Interpretation

The $n$-th roots of $z$ are equally spaced points on a circle of radius $r^{1/n}$, forming a regular $n$-gon. The angular spacing is $\frac{2\pi}{n}$ radians.

### Example: Square Roots of $i$

Write $i = 1 \cdot e^{i\pi/2}$ (using the principal argument).

The two square roots are:
$$w_0 = 1^{1/2} e^{i(\pi/2 + 2\pi \cdot 0)/2} = e^{i\pi/4} = \frac{1}{\sqrt{2}} + i\frac{1}{\sqrt{2}} = \frac{1 + i}{\sqrt{2}}$$

$$w_1 = e^{i(\pi/2 + 2\pi)/2} = e^{i5\pi/4} = -\frac{1}{\sqrt{2}} - i\frac{1}{\sqrt{2}} = -\frac{1 + i}{\sqrt{2}}$$

Note: $w_1 = -w_0$, as expected for square roots.

**Verification**:
$$\left(\frac{1+i}{\sqrt{2}}\right)^2 = \frac{(1+i)^2}{2} = \frac{1 + 2i - 1}{2} = \frac{2i}{2} = i$$ ✓

### Example: Cube Roots of 8

Write $8 = 8e^{i \cdot 0}$.

$$w_k = 8^{1/3} e^{i \cdot 2\pi k/3} = 2e^{i2\pi k/3}, \quad k = 0, 1, 2$$

$$w_0 = 2e^{i \cdot 0} = 2$$

$$w_1 = 2e^{i2\pi/3} = 2\left(\cos\frac{2\pi}{3} + i\sin\frac{2\pi}{3}\right) = 2\left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = -1 + i\sqrt{3}$$

$$w_2 = 2e^{i4\pi/3} = 2\left(\cos\frac{4\pi}{3} + i\sin\frac{4\pi}{3}\right) = 2\left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = -1 - i\sqrt{3}$$

These three points form an equilateral triangle in the complex plane.

### Example: Fifth Roots of $-1$

Write $-1 = e^{i\pi}$.

$$w_k = e^{i(\pi + 2\pi k)/5} = e^{i\pi(1 + 2k)/5}, \quad k = 0, 1, 2, 3, 4$$

$$w_0 = e^{i\pi/5}, \quad w_1 = e^{i3\pi/5}, \quad w_2 = e^{i\pi} = -1$$

$$w_3 = e^{i7\pi/5} = e^{-i3\pi/5}, \quad w_4 = e^{i9\pi/5} = e^{-i\pi/5}$$

Note that $w_3 = \overline{w_1}$ and $w_4 = \overline{w_0}$ (conjugate pairs).

## Roots of Unity

The **$n$-th roots of unity** are the solutions to $z^n = 1$:

$$\omega_k = e^{2\pi i k/n}, \quad k = 0, 1, \ldots, n-1$$

These form the vertices of a regular $n$-gon inscribed in the unit circle.

### The Principal Root

The **principal $n$-th root of unity** is:
$$\omega_n = e^{2\pi i/n}$$

All other roots are powers of $\omega_n$:
$$\omega_k = \omega_n^k$$

### Properties

1. **Closure**: The $n$-th roots of unity form a group under multiplication
2. **Cyclicity**: $\omega_n^n = 1$
3. **Sum to zero**: $\sum_{k=0}^{n-1} \omega_k = 0$ for $n > 1$
4. **Symmetry**: Roots come in conjugate pairs (except possibly $\pm 1$)

**Proof of property 3**:
$$\sum_{k=0}^{n-1} \omega_n^k = \frac{\omega_n^n - 1}{\omega_n - 1} = \frac{1 - 1}{\omega_n - 1} = 0$$

(using the geometric series formula).

### Primitive Roots

A root $\omega$ is **primitive** if $\omega^k \neq 1$ for $1 \leq k < n$. The primitive $n$-th roots are $\omega_k$ where $\gcd(k, n) = 1$. There are $\phi(n)$ primitive $n$-th roots (where $\phi$ is Euler's totient function).

**Example**: The primitive 6th roots of unity are $e^{i\pi/3}$ and $e^{i5\pi/3}$ (since $\gcd(1,6) = \gcd(5,6) = 1$).

## Solving Polynomial Equations

De Moivre's theorem helps solve equations of the form $z^n = c$.

### Example: Solve $z^4 = -16$

Write $-16 = 16e^{i\pi}$.

$$z_k = 16^{1/4} e^{i(\pi + 2\pi k)/4} = 2e^{i\pi(1 + 2k)/4}, \quad k = 0, 1, 2, 3$$

$$z_0 = 2e^{i\pi/4} = \sqrt{2}(1 + i)$$

$$z_1 = 2e^{i3\pi/4} = \sqrt{2}(-1 + i)$$

$$z_2 = 2e^{i5\pi/4} = \sqrt{2}(-1 - i)$$

$$z_3 = 2e^{i7\pi/4} = \sqrt{2}(1 - i)$$

### Example: Solve $z^3 + 8 = 0$

Rewrite: $z^3 = -8 = 8e^{i\pi}$.

$$z_k = 2e^{i\pi(1 + 2k)/3}, \quad k = 0, 1, 2$$

$$z_0 = 2e^{i\pi/3} = 1 + i\sqrt{3}$$

$$z_1 = 2e^{i\pi} = -2$$

$$z_2 = 2e^{i5\pi/3} = 1 - i\sqrt{3}$$

## Applications

### Chebyshev Polynomials

The substitution $x = \cos\theta$ combined with De Moivre's theorem yields:
$$T_n(\cos\theta) = \cos(n\theta)$$

defining the **Chebyshev polynomials** $T_n(x)$, which have applications in approximation theory and numerical analysis.

### Fourier Transforms

The discrete Fourier transform uses the $n$-th roots of unity:
$$X_k = \sum_{j=0}^{n-1} x_j e^{-2\pi i jk/n} = \sum_{j=0}^{n-1} x_j \omega_n^{-jk}$$

### Cyclotomic Polynomials

The polynomial whose roots are the primitive $n$-th roots of unity is the **cyclotomic polynomial** $\Phi_n(x)$. De Moivre's theorem helps analyze these polynomials, which are fundamental in algebraic number theory.

### Quantum Computing

The quantum Fourier transform, central to Shor's algorithm and other quantum algorithms, is based on roots of unity.

## Summary

- **De Moivre's Theorem**: $(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$
- Proven by induction or via Euler's formula
- Simplifies computing powers of complex numbers
- Derives trigonometric identities systematically
- **$n$-th roots**: $w_k = r^{1/n} e^{i(\theta + 2\pi k)/n}$ for $k = 0, 1, \ldots, n-1$
- Roots are equally spaced on a circle, forming a regular $n$-gon
- **Roots of unity**: $\omega_k = e^{2\pi i k/n}$ form a cyclic group
- Applications to polynomial equations, Fourier analysis, and number theory
- Connects algebra, geometry, and trigonometry elegantly
