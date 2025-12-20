---
id: math401-topic-4-1
title: "Cauchy\"
order: 1
---

# Cauchy's Integral Formula

Cauchy's integral formula is one of the most remarkable theorems in mathematics. It states that the value of an analytic function at any point inside a closed contour can be computed by an integral around that contour. This seemingly magical result has profound consequences: it shows that analytic functions are completely determined by their boundary values, establishes that they are infinitely differentiable, and leads directly to power series representations.

## Statement of Cauchy's Integral Formula

**Theorem (Cauchy's Integral Formula)**: Let $f$ be analytic on and inside a simple closed contour $\gamma$ oriented counterclockwise. Then for any point $z_0$ inside $\gamma$:

$$f(z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - z_0} \, dz$$

This formula expresses the value of $f$ at an interior point entirely in terms of its values on the boundary $\gamma$.

## Proof of Cauchy's Integral Formula

Let $\gamma$ be a simple closed curve with $z_0$ inside. We need to show:

$$\oint_\gamma \frac{f(z)}{z - z_0} \, dz = 2\pi i f(z_0)$$

**Step 1**: The function $g(z) = \frac{f(z)}{z - z_0}$ is NOT analytic at $z = z_0$, so we can't directly apply Cauchy's theorem.

**Step 2**: Choose a small circle $C_r$ centered at $z_0$ with radius $r$ small enough that $C_r$ is inside $\gamma$.

By Cauchy's theorem for multiply connected domains (deformation):

$$\oint_\gamma \frac{f(z)}{z - z_0} \, dz = \oint_{C_r} \frac{f(z)}{z - z_0} \, dz$$

**Step 3**: On $C_r$, parametrize as $z = z_0 + re^{i\theta}$ for $\theta \in [0, 2\pi]$:

$$\oint_{C_r} \frac{f(z)}{z - z_0} \, dz = \int_0^{2\pi} \frac{f(z_0 + re^{i\theta})}{re^{i\theta}} \cdot ire^{i\theta} \, d\theta$$

$$= i\int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta$$

**Step 4**: As $r \to 0$, by continuity of $f$:

$$f(z_0 + re^{i\theta}) \to f(z_0)$$

Therefore:
$$\lim_{r \to 0} i\int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta = i \int_0^{2\pi} f(z_0) \, d\theta = i \cdot f(z_0) \cdot 2\pi = 2\pi i f(z_0)$$

**Step 5**: But this limit equals the integral around $\gamma$ (which doesn't depend on $r$):

$$\oint_\gamma \frac{f(z)}{z - z_0} \, dz = 2\pi i f(z_0)$$

Rearranging gives Cauchy's integral formula.

## Remarkable Consequences

### Value from Boundary

The value of $f$ at ANY interior point is determined by values on the boundary. This is astonishing: knowing $f$ on a circle tells you $f$ everywhere inside!

### No Local Maxima

If $|f|$ had a local maximum at an interior point $z_0$, the integral formula would be contradicted (by the mean value property we'll derive). This leads to the maximum modulus principle.

### Infinite Differentiability

The integral formula can be differentiated under the integral sign (we'll show this), proving $f$ has derivatives of all orders.

## Examples

### Example 1: Circle Around a Point

**Evaluate** $\oint_{|z|=2} \frac{e^z}{z - 1} \, dz$.

The function $f(z) = e^z$ is entire, and $z_0 = 1$ is inside $|z| = 2$.

By Cauchy's formula:
$$\oint_{|z|=2} \frac{e^z}{z - 1} \, dz = 2\pi i \cdot e^1 = 2\pi i e$$

### Example 2: Different Contour

**Evaluate** $\oint_{|z|=1} \frac{\sin z}{z} \, dz$.

Here $f(z) = \sin z$ (entire) and $z_0 = 0$.

$$\oint_{|z|=1} \frac{\sin z}{z} \, dz = 2\pi i \cdot \sin(0) = 0$$

### Example 3: Point Outside Contour

**Evaluate** $\oint_{|z|=1} \frac{1}{z - 3} \, dz$.

Since $z_0 = 3$ is outside $|z| = 1$, the function $\frac{1}{z - 3}$ is analytic inside and on $|z| = 1$.

By Cauchy's theorem:
$$\oint_{|z|=1} \frac{1}{z - 3} \, dz = 0$$

### Example 4: Modified Denominator

**Evaluate** $\oint_{|z|=2} \frac{z^2 + 1}{z - i} \, dz$.

Let $f(z) = z^2 + 1$ (entire) and $z_0 = i$ (inside $|z| = 2$):

$$\oint_{|z|=2} \frac{z^2 + 1}{z - i} \, dz = 2\pi i \cdot f(i) = 2\pi i(i^2 + 1) = 2\pi i \cdot 0 = 0$$

## General Form for Higher Powers

For higher powers in the denominator:

**Theorem**: If $f$ is analytic on and inside $\gamma$, and $z_0$ is inside $\gamma$, then:

$$\oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} \, dz = \frac{2\pi i}{n!} f^{(n)}(z_0)$$

This is the **generalized Cauchy integral formula** and will be proven in the next section.

For $n = 0$, this reduces to the standard Cauchy formula.

## Mean Value Property

**Corollary (Mean Value Property)**: If $f$ is analytic inside and on the circle $|z - z_0| = r$, then:

$$f(z_0) = \frac{1}{2\pi} \int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta$$

The value at the center equals the average over the circle.

**Proof**: Apply Cauchy's formula with $\gamma(t) = z_0 + re^{it}$:

$$f(z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - z_0} \, dz$$

$$= \frac{1}{2\pi i} \int_0^{2\pi} \frac{f(z_0 + re^{i\theta})}{re^{i\theta}} \cdot ire^{i\theta} \, d\theta$$

$$= \frac{1}{2\pi} \int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta$$

This extends to:

$$f(z_0) = \frac{1}{\pi r^2} \iint_{|z - z_0| \leq r} f(z) \, dA$$

The value at the center equals the average over the disk.

## Cauchy's Formula for Unbounded Domains

**Theorem**: If $f$ is entire and $f(z) \to 0$ as $|z| \to \infty$, then $f \equiv 0$.

**Proof**: For any $z_0$, apply Cauchy's formula on a large circle $|z| = R$:

$$|f(z_0)| = \left|\frac{1}{2\pi i} \oint_{|z|=R} \frac{f(z)}{z - z_0} \, dz\right| \leq \frac{1}{2\pi} \cdot \frac{M_R}{R - |z_0|} \cdot 2\pi R$$

$$= \frac{M_R R}{R - |z_0|}$$

where $M_R = \max_{|z|=R} |f(z)| \to 0$ as $R \to \infty$.

Taking $R \to \infty$:
$$|f(z_0)| \leq \lim_{R \to \infty} \frac{M_R R}{R - |z_0|} = 0$$

So $f(z_0) = 0$ for all $z_0$.

## Cauchy's Formula for Derivatives

**Extended Formula**: For derivatives (proven next section):

$$f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_\gamma \frac{f(z)}{(z - z_0)^{n+1}} \, dz$$

This shows derivatives can be computed from boundary integrals!

## Applications

### Evaluating Integrals

Cauchy's formula directly evaluates integrals of the form $\oint \frac{f(z)}{z - z_0}$.

### Proving Theorems

- Liouville's theorem
- Maximum modulus principle
- Fundamental theorem of algebra

### Harmonic Functions

The mean value property for analytic functions implies the mean value property for harmonic functions (since real and imaginary parts of analytic functions are harmonic).

### Numerical Analysis

Cauchy's formula can be used for numerical differentiation and interpolation.

## Comparison with Real Analysis

In real analysis, knowing a function on an interval's boundary (endpoints) tells you NOTHING about interior values.

In complex analysis, knowing $f$ on a curve's boundary completely determines $f$ inside!

This rigidity is unique to analytic functions and has no real analog.

## Connection to Potential Theory

Cauchy's formula is analogous to:
- **Electrostatics**: Electric potential inside a conductor determined by boundary charges
- **Fluid dynamics**: Velocity potential determined by boundary conditions
- **Heat equation**: Temperature distribution from boundary temperatures

The integral formula provides a "reproducing kernel" for analytic functions.

## Summary

- **Cauchy's integral formula**: $f(z_0) = \frac{1}{2\pi i} \oint_\gamma \frac{f(z)}{z - z_0} \, dz$
- Valid for $f$ analytic on and inside simple closed curve $\gamma$, $z_0$ inside $\gamma$
- **Proof**: Deformation to small circle + limiting argument
- **Mean value property**: Value at center = average over circle/disk
- **Consequences**: Values inside determined by boundary values
- **Applications**: Evaluating integrals, proving theorems, numerical methods
- Extends to derivatives: $f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint \frac{f(z)}{(z - z_0)^{n+1}} dz$
- Unique to complex analysis; no real analog
- Foundation for power series, residue theory, and conformal mapping
- One of the most important and beautiful results in mathematics
