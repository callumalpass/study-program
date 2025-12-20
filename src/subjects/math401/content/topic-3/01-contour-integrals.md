---
id: math401-topic-3-1
title: "Complex Paths and Curves"
order: 1
---

# Contour Integrals in the Complex Plane

Complex integration, or contour integration, extends the concept of integration from real analysis to complex-valued functions along curves in the complex plane. This powerful tool is fundamental to complex analysis and leads to remarkable theorems like Cauchy's theorem and the residue theorem, which have profound applications in mathematics, physics, and engineering.

## Curves and Contours

### Parametric Curves

A **curve** (or **path**) in the complex plane is a continuous function:

$$\gamma: [a, b] \to \mathbb{C}$$

where $[a, b] \subseteq \mathbb{R}$. We can write:

$$\gamma(t) = x(t) + iy(t)$$

where $x, y: [a, b] \to \mathbb{R}$ are continuous real-valued functions.

- $\gamma(a)$ is the **initial point**
- $\gamma(b)$ is the **terminal point**
- The set $\{\gamma(t) : t \in [a, b]\}$ is the **trace** or **image** of the curve

### Smooth and Piecewise Smooth Curves

A curve $\gamma$ is **smooth** if $\gamma'(t)$ exists, is continuous, and $\gamma'(t) \neq 0$ for all $t \in [a, b]$.

A curve is **piecewise smooth** (or a **contour**) if it consists of finitely many smooth pieces joined end-to-end.

**Example**: The curve $\gamma(t) = e^{it}$ for $t \in [0, 2\pi]$ traces the unit circle counterclockwise.
- $\gamma'(t) = ie^{it} \neq 0$
- Smooth curve

**Example**: The square with vertices at $0, 1, 1+i, i$:
$$\gamma(t) = \begin{cases}
t & 0 \leq t \leq 1 \\
1 + i(t-1) & 1 \leq t \leq 2 \\
(3-t) + i & 2 \leq t \leq 3 \\
i(4-t) & 3 \leq t \leq 4
\end{cases}$$
This is piecewise smooth (four smooth segments).

### Closed Curves

A curve $\gamma: [a, b] \to \mathbb{C}$ is **closed** if $\gamma(a) = \gamma(b)$ (initial and terminal points coincide).

### Simple Curves

A curve is **simple** if it does not cross itself: $\gamma(t_1) = \gamma(t_2)$ implies $t_1 = t_2$ (except possibly $t_1 = a, t_2 = b$ for closed curves).

A **simple closed curve** is a closed curve that doesn't cross itself.

### Orientation

Curves have a direction determined by increasing parameter values. For closed curves:
- **Positively oriented** (counterclockwise): region enclosed is on the left as you traverse the curve
- **Negatively oriented** (clockwise): region enclosed is on the right

### Reverse of a Curve

The **reverse** of $\gamma: [a, b] \to \mathbb{C}$ is:

$$-\gamma(t) = \gamma(a + b - t)$$

This traverses the same path in the opposite direction.

## Definition of Contour Integrals

### The Integral Along a Curve

Let $f: D \to \mathbb{C}$ be continuous and $\gamma: [a, b] \to D$ be a piecewise smooth curve. The **contour integral** of $f$ along $\gamma$ is:

$$\int_\gamma f(z) \, dz = \int_a^b f(\gamma(t)) \gamma'(t) \, dt$$

The right side is an integral of a complex-valued function of a real variable, defined by:

$$\int_a^b [u(t) + iv(t)] \, dt = \int_a^b u(t) \, dt + i\int_a^b v(t) \, dt$$

### Alternative Notation

$$\int_\gamma f(z) \, dz = \int_\gamma f$$

When the curve is clear from context.

### Interpretation

Writing $f(\gamma(t)) = u(t) + iv(t)$ and $\gamma'(t) = x'(t) + iy'(t)$:

$$f(\gamma(t)) \gamma'(t) = (u + iv)(x' + iy') = (ux' - vy') + i(vx' + uy')$$

So:
$$\int_\gamma f(z) \, dz = \int_a^b (ux' - vy') \, dt + i\int_a^b (vx' + uy') \, dt$$

This can also be written in terms of line integrals:

$$\int_\gamma f(z) \, dz = \int_\gamma (u \, dx - v \, dy) + i\int_\gamma (v \, dx + u \, dy)$$

## Basic Examples

### Example 1: Integral of a Constant

Let $f(z) = c$ (constant) along any curve $\gamma$ from $z_0$ to $z_1$:

$$\int_\gamma c \, dz = \int_a^b c \gamma'(t) \, dt = c[\gamma(t)]_a^b = c(\gamma(b) - \gamma(a)) = c(z_1 - z_0)$$

The integral depends only on the endpoints, not the path.

### Example 2: Integral Around a Circle

Let $\gamma(t) = re^{it}$ for $t \in [0, 2\pi]$ (circle of radius $r$ centered at origin, counterclockwise).

**Compute** $\int_\gamma z \, dz$:

$$\gamma'(t) = ire^{it}$$

$$\int_\gamma z \, dz = \int_0^{2\pi} re^{it} \cdot ire^{it} \, dt = ir^2 \int_0^{2\pi} e^{2it} \, dt$$

$$= ir^2 \left[\frac{e^{2it}}{2i}\right]_0^{2\pi} = \frac{r^2}{2}(e^{4\pi i} - e^0) = \frac{r^2}{2}(1 - 1) = 0$$

### Example 3: Integral of $1/z$ Around a Circle

Let $\gamma(t) = re^{it}$ for $t \in [0, 2\pi]$.

**Compute** $\int_\gamma \frac{1}{z} \, dz$:

$$\int_\gamma \frac{1}{z} \, dz = \int_0^{2\pi} \frac{1}{re^{it}} \cdot ire^{it} \, dt = \int_0^{2\pi} i \, dt = i \cdot 2\pi = 2\pi i$$

This remarkable result holds for any circle centered at the origin, regardless of radius!

**For a circle centered at $z_0$**: $\gamma(t) = z_0 + re^{it}$

$$\int_\gamma \frac{1}{z - z_0} \, dz = \int_0^{2\pi} \frac{1}{re^{it}} \cdot ire^{it} \, dt = 2\pi i$$

This is a fundamental result in complex analysis.

### Example 4: Power Function

**Compute** $\int_\gamma z^n \, dz$ where $\gamma$ is the unit circle and $n$ is an integer.

For $n \neq -1$:
$$\int_\gamma z^n \, dz = \int_0^{2\pi} e^{int} \cdot ie^{it} \, dt = i\int_0^{2\pi} e^{i(n+1)t} \, dt$$

$$= i\left[\frac{e^{i(n+1)t}}{i(n+1)}\right]_0^{2\pi} = \frac{1}{n+1}(e^{2\pi i(n+1)} - 1) = 0$$

For $n = -1$: We already computed $\int_\gamma \frac{1}{z} \, dz = 2\pi i$.

**Summary**:
$$\int_{|z|=1} z^n \, dz = \begin{cases} 2\pi i & n = -1 \\ 0 & n \neq -1, \, n \in \mathbb{Z} \end{cases}$$

## Properties of Contour Integrals

### Linearity

$$\int_\gamma [af(z) + bg(z)] \, dz = a\int_\gamma f(z) \, dz + b\int_\gamma g(z) \, dz$$

for constants $a, b \in \mathbb{C}$.

### Reversal of Path

$$\int_{-\gamma} f(z) \, dz = -\int_\gamma f(z) \, dz$$

### Additivity of Paths

If $\gamma = \gamma_1 + \gamma_2$ (concatenation of paths):

$$\int_\gamma f(z) \, dz = \int_{\gamma_1} f(z) \, dz + \int_{\gamma_2} f(z) \, dz$$

### Independence of Parametrization

If $\gamma_1$ and $\gamma_2$ have the same trace and orientation (but different parametrizations):

$$\int_{\gamma_1} f(z) \, dz = \int_{\gamma_2} f(z) \, dz$$

The integral depends on the curve's trace and direction, not the specific parametrization.

## Upper Bounds: The ML Inequality

### Modulus of an Integral

**Theorem**: If $\gamma: [a, b] \to \mathbb{C}$ is a piecewise smooth curve and $f$ is continuous on $\gamma$, then:

$$\left|\int_\gamma f(z) \, dz\right| \leq \int_a^b |f(\gamma(t))| \cdot |\gamma'(t)| \, dt$$

This is the **triangle inequality for integrals**.

### Arc Length

The **length** of a curve $\gamma: [a, b] \to \mathbb{C}$ is:

$$L(\gamma) = \int_a^b |\gamma'(t)| \, dt$$

For a circle of radius $r$: $L = 2\pi r$.

For a line segment from $z_0$ to $z_1$: $L = |z_1 - z_0|$.

### The ML Inequality

**Theorem (ML Inequality)**: If $|f(z)| \leq M$ for all $z$ on the curve $\gamma$ of length $L$, then:

$$\left|\int_\gamma f(z) \, dz\right| \leq ML$$

**Proof**:
$$\left|\int_\gamma f(z) \, dz\right| \leq \int_a^b |f(\gamma(t))| \cdot |\gamma'(t)| \, dt \leq M \int_a^b |\gamma'(t)| \, dt = ML$$

### Example Application

**Estimate** $\left|\int_\gamma \frac{e^z}{z^2 + 1} \, dz\right|$ where $\gamma$ is the circle $|z| = 3$.

On $|z| = 3$:
- $|e^z| = e^{\text{Re}(z)} \leq e^{|z|} = e^3$
- $|z^2 + 1| \geq ||z|^2 - 1| = |9 - 1| = 8$

So:
$$\left|\frac{e^z}{z^2 + 1}\right| \leq \frac{e^3}{8}$$

The length of $\gamma$ is $L = 2\pi \cdot 3 = 6\pi$.

By the ML inequality:
$$\left|\int_\gamma \frac{e^z}{z^2 + 1} \, dz\right| \leq \frac{e^3}{8} \cdot 6\pi = \frac{3\pi e^3}{4}$$

## Integrals with Respect to Arc Length

Sometimes we integrate with respect to arc length rather than $z$:

$$\int_\gamma f(z) \, |dz| = \int_a^b f(\gamma(t)) |\gamma'(t)| \, dt$$

This is always real-valued and non-negative.

**Relationship**:
$$\left|\int_\gamma f(z) \, dz\right| \leq \int_\gamma |f(z)| \, |dz|$$

## Integrals of Real-Valued Functions

If $f$ is real-valued on $\gamma$, the contour integral reduces to a real line integral:

$$\int_\gamma f(z) \, dz = \int_a^b f(\gamma(t)) \gamma'(t) \, dt$$

where both $f$ and $\gamma'$ contribute to the complex result.

## Computing Contour Integrals: Summary

To compute $\int_\gamma f(z) \, dz$:

1. **Parametrize** the curve: $\gamma(t)$, $t \in [a, b]$
2. **Compute** $\gamma'(t)$
3. **Substitute**: $\int_a^b f(\gamma(t)) \gamma'(t) \, dt$
4. **Evaluate** the real integral

## Applications

Contour integrals are fundamental to:

1. **Cauchy's theorem**: Integrals around closed curves in analytic regions vanish
2. **Residue theorem**: Computing integrals via singularities
3. **Evaluation of real integrals**: Using complex methods
4. **Fourier transforms**: Inversion formulas
5. **Quantum mechanics**: Path integrals in Feynman formulation

## Summary

- **Contour integral**: $\int_\gamma f(z) \, dz = \int_a^b f(\gamma(t)) \gamma'(t) \, dt$
- Defined for continuous $f$ along piecewise smooth curves $\gamma$
- **Properties**: linear, reverses with path direction, additive over concatenation
- **ML inequality**: $|\int_\gamma f(z) \, dz| \leq ML$ where $|f| \leq M$ and $L = $ length
- **Key example**: $\int_{|z-z_0|=r} \frac{1}{z-z_0} \, dz = 2\pi i$ (fundamental!)
- **Power functions**: $\int_{|z|=r} z^n \, dz = 0$ for $n \neq -1$
- Contour integration is the foundation for the powerful theorems of complex analysis
- Understanding parametrization and computation is essential for applications
