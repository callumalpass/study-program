---
id: math401-topic-1-3
title: "Polar Form and Modulus-Argument"
order: 3
---

# Polar Form of Complex Numbers

The polar representation of complex numbers leverages the geometry of the complex plane, expressing numbers in terms of their distance from the origin and angle. This form makes multiplication, division, and powers remarkably simple and reveals deep connections between algebra and trigonometry.

## Polar Coordinates

Any nonzero complex number $z = a + bi$ can be written in terms of its modulus $r = |z|$ and argument $\theta = \arg(z)$:

$$a = r\cos\theta, \quad b = r\sin\theta$$

Therefore:
$$z = a + bi = r\cos\theta + ir\sin\theta = r(\cos\theta + i\sin\theta)$$

This is the **polar form** (or **trigonometric form**) of $z$.

### Notation

We often abbreviate $\cos\theta + i\sin\theta$ as $\text{cis}\,\theta$:

$$z = r\,\text{cis}\,\theta$$

The **polar coordinates** of $z$ are $(r, \theta)$, while the **Cartesian coordinates** are $(a, b)$.

### Conversion Formulas

**Cartesian to Polar**:
$$r = \sqrt{a^2 + b^2}, \quad \theta = \arctan(b/a) \text{ (with quadrant adjustment)}$$

**Polar to Cartesian**:
$$a = r\cos\theta, \quad b = r\sin\theta$$

### Examples

1. **$z = 1 + i$**:
   - $r = \sqrt{1 + 1} = \sqrt{2}$
   - $\theta = \arctan(1) = \frac{\pi}{4}$
   - Polar form: $z = \sqrt{2}\,\text{cis}\,\frac{\pi}{4} = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$

2. **$z = -\sqrt{3} + i$**:
   - $r = \sqrt{3 + 1} = 2$
   - $\theta = \pi - \arctan\frac{1}{\sqrt{3}} = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$
   - Polar form: $z = 2\,\text{cis}\,\frac{5\pi}{6}$

3. **$z = -4i$**:
   - $r = 4$
   - $\theta = -\frac{\pi}{2}$ (or equivalently $\frac{3\pi}{2}$)
   - Polar form: $z = 4\,\text{cis}\,\left(-\frac{\pi}{2}\right)$

## Non-Uniqueness of Polar Form

Since $\cos$ and $\sin$ are periodic with period $2\pi$:

$$r\,\text{cis}\,\theta = r\,\text{cis}\,(\theta + 2\pi k)$$

for any integer $k$. The same complex number has infinitely many polar representations, differing by multiples of $2\pi$ in the angle.

To make the representation unique, we typically restrict to the **principal argument** $\theta \in (-\pi, \pi]$.

### The Case $z = 0$

The zero complex number has $r = 0$ but undefined argument. We can write $0 = 0 \cdot \text{cis}\,\theta$ for any $\theta$.

## Multiplication in Polar Form

The power of polar form becomes evident when multiplying. Given:
$$z_1 = r_1(\cos\theta_1 + i\sin\theta_1), \quad z_2 = r_2(\cos\theta_2 + i\sin\theta_2)$$

We have:
$$z_1 z_2 = r_1 r_2 [(\cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2) + i(\sin\theta_1\cos\theta_2 + \cos\theta_1\sin\theta_2)]$$

Using the angle addition formulas:
$$\cos(\theta_1 + \theta_2) = \cos\theta_1\cos\theta_2 - \sin\theta_1\sin\theta_2$$
$$\sin(\theta_1 + \theta_2) = \sin\theta_1\cos\theta_2 + \cos\theta_1\sin\theta_2$$

We obtain:
$$z_1 z_2 = r_1 r_2 [\cos(\theta_1 + \theta_2) + i\sin(\theta_1 + \theta_2)]$$

**Multiplication Rule in Polar Form**:
$$r_1\,\text{cis}\,\theta_1 \cdot r_2\,\text{cis}\,\theta_2 = r_1 r_2\,\text{cis}\,(\theta_1 + \theta_2)$$

**Geometric interpretation**: To multiply complex numbers, multiply their moduli and add their arguments.

### Example

Multiply $z_1 = 2\,\text{cis}\,\frac{\pi}{3}$ and $z_2 = 3\,\text{cis}\,\frac{\pi}{4}$.

$$z_1 z_2 = 2 \cdot 3\,\text{cis}\,\left(\frac{\pi}{3} + \frac{\pi}{4}\right) = 6\,\text{cis}\,\frac{7\pi}{12}$$

In Cartesian form:
$$z_1 = 2\left(\cos\frac{\pi}{3} + i\sin\frac{\pi}{3}\right) = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3}$$

$$z_2 = 3\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right) = 3\left(\frac{\sqrt{2}}{2} + i\frac{\sqrt{2}}{2}\right) = \frac{3\sqrt{2}}{2}(1 + i)$$

$$z_1 z_2 = (1 + i\sqrt{3}) \cdot \frac{3\sqrt{2}}{2}(1 + i) = \frac{3\sqrt{2}}{2}(1 + i + i\sqrt{3} - \sqrt{3})$$
$$= \frac{3\sqrt{2}}{2}[(1 - \sqrt{3}) + i(1 + \sqrt{3})]$$

This matches $6\,\text{cis}\,\frac{7\pi}{12}$ when we compute $\cos\frac{7\pi}{12}$ and $\sin\frac{7\pi}{12}$.

## Division in Polar Form

Division is equally simple in polar form:

$$\frac{z_1}{z_2} = \frac{r_1\,\text{cis}\,\theta_1}{r_2\,\text{cis}\,\theta_2} = \frac{r_1}{r_2}\,\text{cis}\,(\theta_1 - \theta_2)$$

**Division Rule**: Divide moduli and subtract arguments.

### Proof

$$\frac{z_1}{z_2} = \frac{r_1(\cos\theta_1 + i\sin\theta_1)}{r_2(\cos\theta_2 + i\sin\theta_2)}$$

Multiply numerator and denominator by $\cos\theta_2 - i\sin\theta_2$:

$$= \frac{r_1(\cos\theta_1 + i\sin\theta_1)(\cos\theta_2 - i\sin\theta_2)}{r_2(\cos^2\theta_2 + \sin^2\theta_2)}$$

$$= \frac{r_1}{r_2}[(\cos\theta_1\cos\theta_2 + \sin\theta_1\sin\theta_2) + i(\sin\theta_1\cos\theta_2 - \cos\theta_1\sin\theta_2)]$$

$$= \frac{r_1}{r_2}[\cos(\theta_1 - \theta_2) + i\sin(\theta_1 - \theta_2)]$$

### Example

Divide $z_1 = 6\,\text{cis}\,\frac{5\pi}{6}$ by $z_2 = 2\,\text{cis}\,\frac{\pi}{3}$.

$$\frac{z_1}{z_2} = \frac{6}{2}\,\text{cis}\,\left(\frac{5\pi}{6} - \frac{\pi}{3}\right) = 3\,\text{cis}\,\frac{\pi}{2} = 3i$$

## Exponential Form: Euler's Formula

One of the most beautiful formulas in mathematics, discovered by Leonhard Euler, states:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

We'll prove this rigorously in the next section, but accepting it for now, we can write the polar form as:

$$z = r e^{i\theta}$$

This is the **exponential form** of a complex number.

### Advantages of Exponential Form

1. **Concise notation**: $re^{i\theta}$ vs. $r(\cos\theta + i\sin\theta)$
2. **Exponential laws apply**: $e^{i\theta_1} \cdot e^{i\theta_2} = e^{i(\theta_1 + \theta_2)}$
3. **Natural for differentiation and integration**
4. **Generalizes to complex exponents**

### Multiplication and Division

With exponential form, operations become trivial:

$$z_1 z_2 = r_1 e^{i\theta_1} \cdot r_2 e^{i\theta_2} = r_1 r_2 e^{i(\theta_1 + \theta_2)}$$

$$\frac{z_1}{z_2} = \frac{r_1 e^{i\theta_1}}{r_2 e^{i\theta_2}} = \frac{r_1}{r_2} e^{i(\theta_1 - \theta_2)}$$

### Complex Conjugate

In exponential form:
$$\bar{z} = \overline{re^{i\theta}} = re^{-i\theta}$$

Since $\overline{\cos\theta + i\sin\theta} = \cos\theta - i\sin\theta = \cos(-\theta) + i\sin(-\theta)$.

### Special Cases

1. $e^{i \cdot 0} = 1$
2. $e^{i\pi/2} = i$
3. $e^{i\pi} = -1$ (Euler's identity: $e^{i\pi} + 1 = 0$)
4. $e^{-i\pi/2} = -i$
5. $e^{2\pi i} = 1$

Euler's identity $e^{i\pi} + 1 = 0$ is often called the most beautiful equation in mathematics, as it relates five fundamental constants: $e$, $i$, $\pi$, $1$, and $0$.

## Powers in Polar Form

Raising a complex number to an integer power is remarkably simple in polar form:

$$z^n = (re^{i\theta})^n = r^n e^{in\theta}$$

Or in trigonometric form:
$$[r(\cos\theta + i\sin\theta)]^n = r^n(\cos n\theta + i\sin n\theta)$$

### De Moivre's Formula

For any integer $n$:
$$(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$$

This is **De Moivre's formula**, which we'll explore in depth in a dedicated section.

### Examples

1. **$(1 + i)^{10}$**:

   First, convert to polar: $1 + i = \sqrt{2} e^{i\pi/4}$

   $$(1 + i)^{10} = (\sqrt{2})^{10} e^{i \cdot 10\pi/4} = 2^5 e^{i5\pi/2} = 32 e^{i\pi/2} = 32i$$

2. **$\left(\frac{1 + i\sqrt{3}}{2}\right)^{12}$**:

   Convert to polar: $\frac{1 + i\sqrt{3}}{2} = 1 \cdot e^{i\pi/3}$

   $$\left(\frac{1 + i\sqrt{3}}{2}\right)^{12} = e^{i \cdot 12\pi/3} = e^{i4\pi} = 1$$

3. **$(1 - i)^{-6}$**:

   Convert to polar: $1 - i = \sqrt{2} e^{-i\pi/4}$

   $$(1 - i)^{-6} = (\sqrt{2})^{-6} e^{i6\pi/4} = \frac{1}{8} e^{i3\pi/2} = \frac{1}{8} \cdot (-i) = -\frac{i}{8}$$

### Deriving Trigonometric Identities

De Moivre's formula provides an elegant method for deriving multiple-angle formulas.

**Example**: Find $\cos 3\theta$ and $\sin 3\theta$ in terms of $\cos\theta$ and $\sin\theta$.

By De Moivre:
$$\cos 3\theta + i\sin 3\theta = (\cos\theta + i\sin\theta)^3$$

Expand the right side:
$$(\cos\theta + i\sin\theta)^3 = \cos^3\theta + 3\cos^2\theta(i\sin\theta) + 3\cos\theta(i\sin\theta)^2 + (i\sin\theta)^3$$

$$= \cos^3\theta + 3i\cos^2\theta\sin\theta - 3\cos\theta\sin^2\theta - i\sin^3\theta$$

$$= (\cos^3\theta - 3\cos\theta\sin^2\theta) + i(3\cos^2\theta\sin\theta - \sin^3\theta)$$

Equating real and imaginary parts:
$$\cos 3\theta = \cos^3\theta - 3\cos\theta\sin^2\theta = 4\cos^3\theta - 3\cos\theta$$

$$\sin 3\theta = 3\cos^2\theta\sin\theta - \sin^3\theta = 3\sin\theta - 4\sin^3\theta$$

## Roots in Polar Form

If $z = re^{i\theta}$, then the $n$-th roots of $z$ are:

$$w_k = r^{1/n} e^{i(\theta + 2\pi k)/n}, \quad k = 0, 1, 2, \ldots, n-1$$

These $n$ roots are equally spaced around a circle of radius $r^{1/n}$.

### Derivation

We seek $w$ such that $w^n = z$. Write $w = \rho e^{i\phi}$ and $z = re^{i\theta}$.

$$(\rho e^{i\phi})^n = re^{i\theta}$$
$$\rho^n e^{in\phi} = re^{i\theta}$$

Equating moduli: $\rho^n = r \implies \rho = r^{1/n}$ (taking the positive real root)

Equating arguments: $n\phi = \theta + 2\pi k$ for integer $k$

$$\phi = \frac{\theta + 2\pi k}{n}$$

For $k = 0, 1, \ldots, n-1$, we get $n$ distinct values. For $k = n$, we return to $\phi_0$ since:
$$\frac{\theta + 2\pi n}{n} = \frac{\theta}{n} + 2\pi \equiv \frac{\theta}{n} \pmod{2\pi}$$

### Example: Cube Roots of $-8$

Write $-8 = 8e^{i\pi}$.

The cube roots are:
$$w_k = 8^{1/3} e^{i(\pi + 2\pi k)/3} = 2e^{i\pi(1 + 2k)/3}, \quad k = 0, 1, 2$$

$$w_0 = 2e^{i\pi/3} = 2\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = 1 + i\sqrt{3}$$

$$w_1 = 2e^{i\pi} = -2$$

$$w_2 = 2e^{i5\pi/3} = 2\left(\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = 1 - i\sqrt{3}$$

These three points form an equilateral triangle centered at the origin.

### Roots of Unity

The $n$-th roots of unity are the solutions to $z^n = 1$:

$$\omega_k = e^{2\pi i k/n}, \quad k = 0, 1, \ldots, n-1$$

The **principal $n$-th root of unity** is:
$$\omega = e^{2\pi i/n}$$

All other roots are powers: $\omega_k = \omega^k$.

These roots form a regular $n$-gon on the unit circle, with vertices at angles $\frac{2\pi k}{n}$.

**Properties**:
1. $\omega^n = 1$
2. $1 + \omega + \omega^2 + \cdots + \omega^{n-1} = 0$ (for $n > 1$)
3. $\omega^k \cdot \omega^j = \omega^{k+j}$
4. The roots form a cyclic group under multiplication

## Applications of Polar Form

### Signal Processing

In electrical engineering, sinusoidal signals are represented as complex exponentials:
$$A\cos(\omega t + \phi) = \text{Re}(Ae^{i(\omega t + \phi)})$$

This simplifies analysis of linear circuits and filters.

### Quantum Mechanics

Quantum states are complex vectors. The phase $e^{i\theta}$ represents quantum phase, crucial for interference phenomena.

### Mandelbrot Set

The famous fractal is defined by iterating $z_{n+1} = z_n^2 + c$ in the complex plane. Polar form helps analyze the dynamics.

### Geometric Transformations

Multiplication by $e^{i\theta}$ rotates by angle $\theta$. Multiplication by $r$ scales by factor $r$. Combined: $z \mapsto re^{i\theta} z$ is a rotation-scaling transformation.

## Summary

- Polar form: $z = r(\cos\theta + i\sin\theta) = r\,\text{cis}\,\theta = re^{i\theta}$
- $r = |z|$ is the modulus, $\theta = \arg(z)$ is the argument
- Multiplication: multiply moduli, add arguments
- Division: divide moduli, subtract arguments
- Powers: $z^n = r^n e^{in\theta}$ (De Moivre's formula)
- $n$-th roots: $n$ equally spaced points on a circle
- Exponential form $re^{i\theta}$ leverages Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$
- Polar form transforms algebraic complexity into geometric simplicity
