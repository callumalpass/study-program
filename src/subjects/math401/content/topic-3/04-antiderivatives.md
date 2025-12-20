---
id: math401-topic-3-4
title: "Cauchy-Goursat Theorem"
order: 4
---

# Complex Antiderivatives

An antiderivative (or primitive) of a complex function extends the familiar concept from real calculus. The existence of an antiderivative has profound implications: it guarantees path independence for contour integrals and provides a fundamental theorem analogous to the real case. Understanding when antiderivatives exist and how to find them is essential for evaluating integrals and applying Cauchy's theorem.

## Definition

A function $F: D \to \mathbb{C}$ is an **antiderivative** (or **primitive**) of $f: D \to \mathbb{C}$ on domain $D$ if:

$$F'(z) = f(z) \quad \text{for all } z \in D$$

Just as in real calculus, if $F$ is an antiderivative of $f$, then so is $F + C$ for any constant $C \in \mathbb{C}$.

## Fundamental Theorem of Complex Calculus

**Theorem**: If $F$ is an antiderivative of continuous function $f$ on domain $D$, and $\gamma$ is any piecewise smooth curve in $D$ from $z_0$ to $z_1$, then:

$$\int_\gamma f(z) \, dz = F(z_1) - F(z_0)$$

**Proof**: Parametrize $\gamma: [a, b] \to D$ with $\gamma(a) = z_0$ and $\gamma(b) = z_1$.

$$\int_\gamma f(z) \, dz = \int_a^b f(\gamma(t)) \gamma'(t) \, dt$$

Since $F'(z) = f(z)$:
$$= \int_a^b F'(\gamma(t)) \gamma'(t) \, dt$$

By the chain rule for complex functions:
$$\frac{d}{dt}[F(\gamma(t))] = F'(\gamma(t)) \gamma'(t)$$

Therefore:
$$\int_a^b F'(\gamma(t)) \gamma'(t) \, dt = [F(\gamma(t))]_a^b = F(\gamma(b)) - F(\gamma(a)) = F(z_1) - F(z_0)$$

**Corollaries**:

1. The integral depends only on endpoints, not the path (path independence)
2. For closed curves ($z_1 = z_0$): $\oint_\gamma f(z) \, dz = 0$
3. Integration is the inverse of differentiation

## Finding Antiderivatives

### Power Functions

For $n \in \mathbb{Z}$ with $n \neq -1$:

$$\int z^n \, dz = \frac{z^{n+1}}{n+1} + C$$

**Proof**: $\frac{d}{dz}\left(\frac{z^{n+1}}{n+1}\right) = z^n$

### Exponential Function

$$\int e^z \, dz = e^z + C$$

**Proof**: $\frac{d}{dz}(e^z) = e^z$

More generally, for $a \in \mathbb{C}$ with $a \neq 0$:
$$\int e^{az} \, dz = \frac{e^{az}}{a} + C$$

### Trigonometric Functions

$$\int \sin z \, dz = -\cos z + C$$

$$\int \cos z \, dz = \sin z + C$$

$$\int \sec^2 z \, dz = \tan z + C$$

These follow from the derivatives of the corresponding functions.

### Hyperbolic Functions

$$\int \sinh z \, dz = \cosh z + C$$

$$\int \cosh z \, dz = \sinh z + C$$

### Linear Combinations

If $F_1' = f_1$ and $F_2' = f_2$, then:

$$\int [af_1(z) + bf_2(z)] \, dz = aF_1(z) + bF_2(z) + C$$

for constants $a, b \in \mathbb{C}$.

## The Special Case: $f(z) = 1/z$

The function $f(z) = 1/z$ requires special attention due to its multi-valued antiderivative.

### On Simply Connected Domains

On $D = \mathbb{C} \setminus (-\infty, 0]$ (slit plane), the principal logarithm provides an antiderivative:

$$\int \frac{1}{z} \, dz = \text{Log } z + C$$

where $\text{Log } z = \ln|z| + i\arg(z)$ with $\arg(z) \in (-\pi, \pi]$.

### On $\mathbb{C} \setminus \{0\}$

On the punctured plane (not simply connected), $1/z$ does NOT have a single-valued antiderivative.

**Evidence**: $\oint_{|z|=1} \frac{1}{z} \, dz = 2\pi i \neq 0$

If an antiderivative existed, this integral would be zero by the fundamental theorem.

### Branch-Dependent Antiderivatives

On different branches (choices of cut), we get different antiderivatives:

- **Standard branch**: Cut along $(-\infty, 0]$, $\arg \in (-\pi, \pi]$
  $$F(z) = \ln|z| + i\arg(z)$$

- **Alternative branch**: Cut along $[0, \infty)$, $\arg \in (0, 2\pi)$
  $$F(z) = \ln|z| + i\arg(z)$$

These differ by a constant on their common domain.

## Constructing Antiderivatives from Path Integrals

**Theorem**: Let $f$ be continuous on an open connected domain $D$ such that $\int_\gamma f(z) \, dz$ is path-independent in $D$. Fix $z_0 \in D$ and define:

$$F(z) = \int_{z_0}^z f(\zeta) \, d\zeta$$

Then $F$ is an antiderivative of $f$ on $D$.

**Proof**: For any $z \in D$ and small $h$ with $z + h \in D$:

$$F(z + h) - F(z) = \int_z^{z+h} f(\zeta) \, d\zeta$$

Taking the straight line from $z$ to $z + h$: $\zeta = z + th$ for $t \in [0, 1]$:

$$F(z + h) - F(z) = \int_0^1 f(z + th) \cdot h \, dt = h \int_0^1 f(z + th) \, dt$$

Therefore:
$$\frac{F(z + h) - F(z)}{h} = \int_0^1 f(z + th) \, dt$$

As $h \to 0$, by continuity of $f$:
$$\lim_{h \to 0} \int_0^1 f(z + th) \, dt = \int_0^1 f(z) \, dt = f(z)$$

Thus $F'(z) = f(z)$.

## When Do Antiderivatives Exist?

**Theorem**: The following are equivalent for continuous $f$ on connected open domain $D$:

1. $f$ has an antiderivative on $D$
2. $\int_\gamma f(z) \, dz$ is path-independent in $D$
3. $\oint_\gamma f(z) \, dz = 0$ for every closed curve $\gamma$ in $D$

**Key Result**: If $f$ is analytic on a simply connected domain $D$, then $f$ has an antiderivative on $D$.

This is a consequence of Cauchy's theorem (proved in the next section).

### Contrast with Real Functions

In real analysis, continuous functions always have antiderivatives (by the fundamental theorem).

In complex analysis, continuity is NOT sufficient:
- $f(z) = \bar{z}$ is continuous but has no antiderivative (not analytic)
- $f(z) = 1/z$ is analytic but has no single-valued antiderivative on $\mathbb{C} \setminus \{0\}$ (not simply connected)

The key requirement is: **analytic + simply connected domain**.

## Examples of Computing Integrals Using Antiderivatives

### Example 1: Polynomial

$$\int_0^{1+i} (z^2 + 3z) \, dz = \left[\frac{z^3}{3} + \frac{3z^2}{2}\right]_0^{1+i}$$

$$= \frac{(1+i)^3}{3} + \frac{3(1+i)^2}{2}$$

$$= \frac{1 + 3i - 3 - i}{3} + \frac{3(1 + 2i - 1)}{2}$$

$$= \frac{-2 + 2i}{3} + \frac{6i}{2} = \frac{-2 + 2i}{3} + 3i = \frac{-2 + 2i + 9i}{3} = \frac{-2 + 11i}{3}$$

### Example 2: Exponential

$$\int_0^{\pi i} e^{2z} \, dz = \left[\frac{e^{2z}}{2}\right]_0^{\pi i} = \frac{e^{2\pi i} - e^0}{2} = \frac{1 - 1}{2} = 0$$

### Example 3: Trigonometric

$$\int_0^{\pi/2} \sin z \, dz = [-\cos z]_0^{\pi/2} = -\cos(\pi/2) + \cos(0) = 0 + 1 = 1$$

### Example 4: Logarithm (with branch)

On the standard branch of $\text{Log}$:

$$\int_1^i \frac{1}{z} \, dz = [\text{Log } z]_1^i = \text{Log}(i) - \text{Log}(1) = i\frac{\pi}{2} - 0 = i\frac{\pi}{2}$$

### Example 5: Rational Function

$$\int_1^2 \frac{1}{z - 3} \, dz = [\text{Log}(z - 3)]_1^2$$

Since $z - 3$ is real and negative on $[1, 2]$, we use $\text{Log}(z - 3) = \ln|z - 3| + i\pi$:

$$= (\ln 1 + i\pi) - (\ln 2 + i\pi) = -\ln 2$$

## Integration by Substitution

**Theorem**: If $F'(z) = f(z)$ and $\phi: [a, b] \to D$ is differentiable, then:

$$\int_a^b f(\phi(t)) \phi'(t) \, dt = F(\phi(b)) - F(\phi(a))$$

This is the **chain rule in reverse** (u-substitution).

### Example

Compute $\int_0^1 2te^{t^2} \, dt$ (real integral):

Let $u = t^2$, so $du = 2t \, dt$:
$$\int_0^1 2te^{t^2} \, dt = \int_0^1 e^{t^2} \cdot 2t \, dt = [e^{t^2}]_0^1 = e - 1$$

This technique extends to complex integrals when the composition is well-defined.

## Integration by Parts

For complex functions with antiderivatives:

$$\int_\gamma u(z) v'(z) \, dz = [u(z)v(z)]_{z_0}^{z_1} - \int_\gamma u'(z) v(z) \, dz$$

**Example**: $\int_0^1 z e^z \, dz$

Let $u = z$, $v' = e^z$, so $u' = 1$, $v = e^z$:

$$\int_0^1 z e^z \, dz = [ze^z]_0^1 - \int_0^1 e^z \, dz = 1 \cdot e - 0 - [e^z]_0^1 = e - (e - 1) = 1$$

## Antiderivatives of Composite Functions

### Example: $f(az + b)$

If $F'(z) = f(z)$, then:

$$\frac{d}{dz}F(az + b) = F'(az + b) \cdot a = af(az + b)$$

So:
$$\int f(az + b) \, dz = \frac{1}{a}F(az + b) + C$$

**Example**: $\int e^{3z + 2} \, dz = \frac{1}{3}e^{3z + 2} + C$

### Example: $f'(z)/f(z)$

$$\frac{d}{dz}\log f(z) = \frac{f'(z)}{f(z)}$$

So:
$$\int \frac{f'(z)}{f(z)} \, dz = \log f(z) + C$$

(with appropriate branch choices).

**Example**: $\int \frac{2z}{z^2 + 1} \, dz = \log(z^2 + 1) + C$

## Uniqueness of Antiderivatives

**Theorem**: If $F_1$ and $F_2$ are both antiderivatives of $f$ on a connected domain $D$, then $F_1 - F_2$ is constant on $D$.

**Proof**: Let $G = F_1 - F_2$. Then $G'(z) = F_1'(z) - F_2'(z) = f(z) - f(z) = 0$ for all $z \in D$.

For any two points $z_0, z_1 \in D$, connect them by a curve $\gamma$ (possible since $D$ is connected):

$$G(z_1) - G(z_0) = \int_\gamma G'(z) \, dz = \int_\gamma 0 \, dz = 0$$

So $G(z_1) = G(z_0)$, meaning $G$ is constant.

## Applications

### Evaluating Definite Integrals

When an antiderivative is known, definite integrals reduce to function evaluation:

$$\int_{z_0}^{z_1} f(z) \, dz = F(z_1) - F(z_0)$$

No need to parametrize curves!

### Solving Differential Equations

The equation $w'(z) = f(z)$ has general solution $w(z) = F(z) + C$ where $F$ is any antiderivative of $f$.

### Conformal Mapping

Antiderivatives appear in constructing conformal maps. For instance, $\int \frac{1}{z^2 - 1} \, dz$ yields logarithmic terms defining mappings between regions.

## Summary

- **Antiderivative**: $F'(z) = f(z)$ throughout domain $D$
- **Fundamental theorem**: $\int_\gamma f = F(z_1) - F(z_0)$ when $F' = f$
- Implies path independence and $\oint f = 0$ for closed curves
- **Existence**: $f$ analytic on simply connected $D$ $\implies$ antiderivative exists
- **Standard formulas**: $\int z^n = \frac{z^{n+1}}{n+1} + C$, $\int e^z = e^z + C$, etc.
- **Special case**: $\int \frac{1}{z} = \log z + C$ (multi-valued on non-simply-connected domains)
- **Uniqueness**: Antiderivatives differ by constants on connected domains
- **Techniques**: substitution, integration by parts work as in real calculus
- Antiderivatives simplify integration and connect to Cauchy's theorem
- Understanding when they exist is crucial for applying the fundamental theorem
