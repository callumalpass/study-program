---
id: math401-topic-4-6
title: "Mean Value Property"
order: 6
---

# Maximum Modulus Principle

The maximum modulus principle is one of the most important and surprising results in complex analysis. It states that if a function is analytic on a region, the maximum of its absolute value cannot occur in the interior—it must occur on the boundary. This principle has profound implications for the behavior of analytic functions and leads to uniqueness theorems and estimates.

## Statement

**Theorem (Maximum Modulus Principle)**: Let $f$ be analytic and non-constant on a domain $D$. Then $|f|$ has no local maximum in $D$.

**Equivalently**: If $|f(z_0)| \geq |f(z)|$ for all $z$ in some neighborhood of $z_0 \in D$, then $f$ is constant on that neighborhood.

**Boundary version**: If $D$ is a bounded domain and $f$ is continuous on $\overline{D} = D \cup \partial D$ and analytic on $D$, then:

$$\max_{z \in \overline{D}} |f(z)| = \max_{z \in \partial D} |f(z)|$$

The maximum of $|f|$ on the closed region occurs on the boundary.

## Proof

**Proof 1 (Via Mean Value Property)**: Suppose $|f|$ has a local maximum at $z_0 \in D$.

Choose $r > 0$ small enough that $|f(z)| \leq |f(z_0)|$ for all $|z - z_0| \leq r$.

By Cauchy's integral formula:
$$f(z_0) = \frac{1}{2\pi} \int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta$$

Taking absolute values:
$$|f(z_0)| = \left|\frac{1}{2\pi} \int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta\right|$$

$$\leq \frac{1}{2\pi} \int_0^{2\pi} |f(z_0 + re^{i\theta})| \, d\theta \leq \frac{1}{2\pi} \int_0^{2\pi} |f(z_0)| \, d\theta = |f(z_0)|$$

Equality holds throughout, which means:
$$\left|\frac{1}{2\pi} \int_0^{2\pi} f(z_0 + re^{i\theta}) \, d\theta\right| = \frac{1}{2\pi} \int_0^{2\pi} |f(z_0 + re^{i\theta})| \, d\theta$$

This happens only if $f(z_0 + re^{i\theta}) = c |f(z_0)|$ for some constant $|c| = 1$.

Since $f$ is continuous, $f$ is constant on $|z - z_0| = r$. By the identity theorem, $f$ is constant on $D$.

**Proof 2 (Via Harmonic Functions)**: Let $u = \log|f|$ (assuming $f \neq 0$ locally). Then $u$ is harmonic (since $f$ is analytic).

Harmonic functions satisfy the mean value property and cannot have interior maxima unless constant. Thus $u$ constant implies $|f|$ constant, hence $f$ constant by the identity theorem.

## Minimum Modulus Principle

**Theorem (Minimum Modulus Principle)**: If $f$ is analytic and non-zero on domain $D$, then $|f|$ has no local minimum in $D$.

**Proof**: Apply the maximum modulus principle to $g(z) = 1/f(z)$.

If $|f|$ had a local minimum at $z_0$, then $|g| = 1/|f|$ would have a local maximum at $z_0$. By the maximum modulus principle, $g$ would be constant, hence $f$ constant.

**Caveat**: If $f$ has zeros, the minimum of $|f|$ can occur at interior points (the zeros themselves).

## Examples

### Example 1: Polynomial on a Disk

Let $p(z) = z^3 + 2z + 1$ on $|z| \leq 1$.

The maximum of $|p(z)|$ occurs on $|z| = 1$, not inside.

We can verify: on $|z| = 1$:
$$|p(z)| \leq |z|^3 + 2|z| + 1 = 4$$

And indeed, the maximum is close to 4 (achieved near some point on the circle).

### Example 2: Exponential Function

On the rectangle $0 \leq x \leq 1$, $0 \leq y \leq 1$:

$$|e^z| = e^x$$

is maximized when $x = 1$ (on the right edge), giving $|e^z| = e$.

The maximum occurs on the boundary, as predicted.

### Example 3: Finding Maximum

**Find** $\max_{|z| \leq 1} |z^2 + z|$.

By the maximum modulus principle, the max occurs on $|z| = 1$.

Parametrize: $z = e^{i\theta}$:
$$|e^{2i\theta} + e^{i\theta}| = |e^{i\theta}||e^{i\theta} + 1| = |e^{i\theta} + 1|$$

$$= |(\cos\theta + 1) + i\sin\theta| = \sqrt{(\cos\theta + 1)^2 + \sin^2\theta}$$

$$= \sqrt{\cos^2\theta + 2\cos\theta + 1 + \sin^2\theta} = \sqrt{2 + 2\cos\theta} = \sqrt{2(1 + \cos\theta)}$$

Maximum when $\cos\theta = 1$ ($\theta = 0$): $\max = \sqrt{4} = 2$.

Indeed, at $z = 1$: $|1 + 1| = 2$.

## Consequences

### Liouville's Theorem

If $f$ is entire and bounded, then $|f|$ has a maximum on $\mathbb{C}$. But $\mathbb{C}$ has no boundary, so by the maximum modulus principle, $|f|$ must be constant, hence $f$ constant.

### Uniqueness Theorems

**Theorem**: If $f$ and $g$ are analytic on a bounded domain $D$, continuous on $\overline{D}$, and $f = g$ on $\partial D$, then $f = g$ on $D$.

**Proof**: Let $h = f - g$. Then $h$ is analytic on $D$, continuous on $\overline{D}$, and $h = 0$ on $\partial D$.

By maximum modulus: $\max_{\overline{D}} |h| = \max_{\partial D} |h| = 0$.

So $h \equiv 0$, thus $f \equiv g$.

This means boundary values uniquely determine an analytic function!

### Schwarz Lemma

**Theorem (Schwarz Lemma)**: If $f$ is analytic on $|z| < 1$ with $|f(z)| \leq 1$ for all $|z| < 1$ and $f(0) = 0$, then:
1. $|f(z)| \leq |z|$ for all $|z| < 1$
2. $|f'(0)| \leq 1$

If equality holds in either (1) or (2), then $f(z) = e^{i\theta}z$ for some $\theta \in \mathbb{R}$.

**Proof sketch**: Define $g(z) = f(z)/z$ (with $g(0) = f'(0)$ by L'Hôpital). Then $g$ is analytic and bounded by $1/r$ on $|z| = r$.

By maximum modulus, $|g(0)| \leq 1/r$ for all $r < 1$. Taking $r \to 1^-$: $|f'(0)| = |g(0)| \leq 1$.

Similarly, $|f(z)| = |z||g(z)| \leq |z|$.

## Phragmén-Lindelöf Principle

An extension to unbounded domains:

**Theorem**: If $f$ is analytic and bounded in an angular sector $\{z : \alpha < \arg(z) < \beta\}$ with $\beta - \alpha < \pi$, and $|f(z)| \leq M$ on the boundary rays, and $f(z) = O(e^{a|z|})$ for $a < \frac{\pi}{\beta - \alpha}$, then $|f(z)| \leq M$ throughout the sector.

This extends the maximum modulus principle to unbounded regions with growth conditions.

## Applications

### Estimating Integrals

Bounds on $|f|$ lead to bounds on $\left|\int f\right|$ via the ML inequality.

### Numerical Analysis

In approximation theory, the maximum modulus principle helps estimate errors.

### Solving PDEs

The maximum principle for harmonic functions (real and imaginary parts of analytic functions) is crucial in studying Laplace's equation.

### Physics

In potential theory (electrostatics, fluid dynamics), extrema of potentials occur on boundaries, not in the interior.

## Comparison with Real Functions

In real analysis, smooth functions can have interior maxima:
- $f(x) = -x^2$ has a maximum at $x = 0$
- $f(x) = \sin x$ has maxima at $x = \pi/2 + 2\pi k$

The maximum modulus principle is unique to complex analytic functions and reflects their rigidity.

## Open Mapping Theorem

A related result:

**Theorem (Open Mapping Theorem)**: If $f$ is analytic and non-constant on domain $D$, then $f$ maps open sets to open sets.

**Consequence**: $f$ cannot have a local maximum or minimum of $|f|$ (which would contradict the image being open).

## Summary

- **Maximum modulus principle**: For analytic non-constant $f$ on $D$, $|f|$ has no local max in $D$
- **Boundary version**: On bounded domains, $\max_{\overline{D}} |f| = \max_{\partial D} |f|$
- **Proof**: Via mean value property or harmonic function theory
- **Minimum modulus**: $|f|$ has no local min if $f \neq 0$
- **Consequences**:
  - Liouville's theorem
  - Uniqueness from boundary data
  - Schwarz lemma
  - Phragmén-Lindelöf for unbounded domains
- **Applications**: Estimation, uniqueness theorems, PDE theory, physics
- No real analog—unique to complex analysis
- Reflects the rigid, constrained nature of analytic functions
- Maximum of $|f|$ occurs on boundary, not interior
