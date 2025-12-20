# Path Independence and Conservative Fields

In real calculus, certain line integrals depend only on the endpoints, not the path taken. This property, called path independence, extends to complex contour integrals and is intimately connected to the existence of antiderivatives. Path independence is a crucial concept that leads directly to Cauchy's theorem, one of the most important results in complex analysis.

## Path Independence

### Definition

A contour integral $\int_\gamma f(z) \, dz$ is **path-independent** in a domain $D$ if for any two contours $\gamma_1$ and $\gamma_2$ in $D$ with the same initial point $z_0$ and terminal point $z_1$:

$$\int_{\gamma_1} f(z) \, dz = \int_{\gamma_2} f(z) \, dz$$

The integral depends only on the endpoints, not the specific path.

### Equivalent Condition

Path independence is equivalent to:

**For every closed contour $\gamma$ in $D$**:
$$\oint_\gamma f(z) \, dz = 0$$

**Proof**: If integrals are path-independent, take $\gamma_1$ and $\gamma_2$ from $z_0$ to $z_1$. Then $\gamma_1 + (-\gamma_2)$ is a closed curve, and:

$$0 = \int_{\gamma_1} f - \int_{\gamma_2} f \implies \int_{\gamma_1} f = \int_{\gamma_2} f$$

Conversely, if all closed contour integrals vanish, any two paths from $z_0$ to $z_1$ give the same integral (by considering their concatenation as a closed curve).

## Antiderivatives and Path Independence

### Antiderivatives

A function $F$ is an **antiderivative** (or **primitive**) of $f$ on domain $D$ if:

$$F'(z) = f(z) \quad \text{for all } z \in D$$

### Fundamental Theorem of Complex Integration

**Theorem**: If $F$ is an antiderivative of $f$ on domain $D$, and $\gamma$ is any contour in $D$ from $z_0$ to $z_1$, then:

$$\int_\gamma f(z) \, dz = F(z_1) - F(z_0)$$

**Proof**: Let $\gamma(t)$ for $t \in [a, b]$ parametrize the curve.

$$\int_\gamma f(z) \, dz = \int_a^b f(\gamma(t)) \gamma'(t) \, dt = \int_a^b F'(\gamma(t)) \gamma'(t) \, dt$$

By the chain rule:
$$\frac{d}{dt} F(\gamma(t)) = F'(\gamma(t)) \gamma'(t)$$

So:
$$\int_a^b F'(\gamma(t)) \gamma'(t) \, dt = [F(\gamma(t))]_a^b = F(\gamma(b)) - F(\gamma(a)) = F(z_1) - F(z_0)$$

**Corollary**: If $F$ is an antiderivative of $f$ on $D$, then integrals of $f$ are path-independent in $D$.

**Corollary**: If $\gamma$ is a closed contour and $F'= f$, then:
$$\oint_\gamma f(z) \, dz = F(\gamma(b)) - F(\gamma(a)) = 0$$

### Examples Using Antiderivatives

1. **$\int_\gamma z^n \, dz$** for $n \neq -1$, $n \in \mathbb{Z}$:

   An antiderivative is $F(z) = \frac{z^{n+1}}{n+1}$, so:
   $$\int_\gamma z^n \, dz = \frac{z_1^{n+1}}{n+1} - \frac{z_0^{n+1}}{n+1}$$

2. **$\int_\gamma e^z \, dz$**:

   An antiderivative is $F(z) = e^z$, so:
   $$\int_\gamma e^z \, dz = e^{z_1} - e^{z_0}$$

3. **$\int_\gamma \sin z \, dz$**:

   An antiderivative is $F(z) = -\cos z$, so:
   $$\int_\gamma \sin z \, dz = -\cos z_1 + \cos z_0$$

4. **$\int_0^{1+i} z^2 \, dz$** along any path:

   $$\int_0^{1+i} z^2 \, dz = \left[\frac{z^3}{3}\right]_0^{1+i} = \frac{(1+i)^3}{3} = \frac{1 + 3i - 3 - i}{3} = \frac{-2 + 2i}{3}$$

## Existence of Antiderivatives

### Theorem

**Theorem**: Let $f$ be continuous on an open connected domain $D$. The following are equivalent:

1. $f$ has an antiderivative on $D$
2. $\int_\gamma f(z) \, dz$ is path-independent in $D$
3. $\oint_\gamma f(z) \, dz = 0$ for every closed contour $\gamma$ in $D$

We've already shown $(1) \implies (2) \iff (3)$.

**To show $(3) \implies (1)$**: Fix $z_0 \in D$. Define:

$$F(z) = \int_{z_0}^z f(\zeta) \, d\zeta$$

where the integral is along any path from $z_0$ to $z$ (well-defined by path independence).

**Claim**: $F'(z) = f(z)$.

**Proof**: For small $h$:
$$F(z + h) - F(z) = \int_z^{z+h} f(\zeta) \, d\zeta$$

Along the straight line from $z$ to $z + h$:
$$F(z + h) - F(z) = \int_0^1 f(z + th) \cdot h \, dt = h \int_0^1 f(z + th) \, dt$$

$$\frac{F(z + h) - F(z)}{h} = \int_0^1 f(z + th) \, dt$$

As $h \to 0$, by continuity of $f$:
$$\int_0^1 f(z + th) \, dt \to \int_0^1 f(z) \, dt = f(z)$$

Therefore $F'(z) = f(z)$.

## When Does $f$ Have an Antiderivative?

### Simply Connected Domains

A domain $D$ is **simply connected** if every closed curve in $D$ can be continuously shrunk to a point without leaving $D$. Intuitively, $D$ has no "holes."

**Examples**:
- Simply connected: disks, half-planes, $\mathbb{C}$, convex sets
- Not simply connected: annuli, $\mathbb{C} \setminus \{0\}$, punctured plane

**Theorem**: If $f$ is analytic on a simply connected domain $D$, then $f$ has an antiderivative on $D$.

This is a consequence of Cauchy's theorem, which we'll prove later.

### Example: $f(z) = 1/z$

Consider $f(z) = 1/z$ on $\mathbb{C} \setminus \{0\}$ (not simply connected).

We've shown $\oint_{|z|=1} \frac{1}{z} \, dz = 2\pi i \neq 0$.

So $1/z$ does NOT have a single-valued antiderivative on $\mathbb{C} \setminus \{0\}$.

However, on the simply connected domain $D = \mathbb{C} \setminus (-\infty, 0]$, the principal logarithm $F(z) = \text{Log } z$ satisfies $F'(z) = 1/z$, so:

$$\int_\gamma \frac{1}{z} \, dz = \text{Log } z_1 - \text{Log } z_0$$

for any path in $D$ from $z_0$ to $z_1$.

### Example: Path-Dependent Integral

Let $\gamma_1$ and $\gamma_2$ both go from $1$ to $-1$:
- $\gamma_1$: upper semicircle
- $\gamma_2$: lower semicircle

For $f(z) = 1/z$:

$$\int_{\gamma_1} \frac{1}{z} \, dz = \text{Log}(-1) - \text{Log}(1) = i\pi - 0 = i\pi$$

Wait, we need to be careful with branches. Using principal branch on upper semicircle:

Actually, $\gamma_1$ goes through points with $\text{Im}(z) > 0$, so we use $\arg(z) \in (0, \pi)$. At endpoint $-1$: $\arg(-1) = \pi$.

For $\gamma_2$ (lower semicircle), we'd have $\arg(-1) = -\pi$ (depending on how we approach).

This shows the integral is path-dependent when crossing the branch cut.

## Computing Integrals Without Antiderivatives

When $f$ doesn't have an antiderivative (or we don't know it), we must:
1. Parametrize the curve
2. Compute the integral directly
3. Or use Cauchy's theorem/residue theorem (later topics)

### Example: $\int_\gamma \bar{z} \, dz$

The function $\bar{z}$ is not analytic (violates Cauchy-Riemann), so it has no antiderivative.

**Along the real axis from $0$ to $1$**: $\gamma(t) = t$, $t \in [0, 1]$:
$$\int_\gamma \bar{z} \, dz = \int_0^1 t \cdot 1 \, dt = \frac{1}{2}$$

**Along the path $0 \to i \to 1 + i \to 1$**:

Segment 1 ($0 \to i$): $\gamma_1(t) = it$, $t \in [0, 1]$:
$$\int_{\gamma_1} \bar{z} \, dz = \int_0^1 (-it) \cdot i \, dt = \int_0^1 t \, dt = \frac{1}{2}$$

Wait, let me recalculate. $\bar{z} = \bar{it} = -it$, and $dz = i \, dt$:
$$\int_{\gamma_1} \bar{z} \, dz = \int_0^1 (-it)(i) \, dt = \int_0^1 -i^2 t \, dt = \int_0^1 t \, dt = \frac{1}{2}$$

Hmm, this is getting the same answer. Let me try a different path.

**Along $y = x$ from $0$ to $1$**: $\gamma(t) = t + it$, $t \in [0, 1]$:
$$\bar{z} = t - it, \quad \gamma'(t) = 1 + i$$

$$\int_\gamma \bar{z} \, dz = \int_0^1 (t - it)(1 + i) \, dt = \int_0^1 (t + it - it + t) \, dt = \int_0^1 2t \, dt = 1$$

Different path, different answer! This confirms $\bar{z}$ has path-dependent integrals.

## Conservative Vector Fields

In real calculus, a vector field $\mathbf{F} = (P, Q)$ is **conservative** if $\oint_C \mathbf{F} \cdot d\mathbf{r} = 0$ for all closed curves $C$.

This is equivalent to $\mathbf{F} = \nabla \phi$ for some potential function $\phi$.

For complex functions $f = u + iv$:
$$\int_\gamma f(z) \, dz = \int_\gamma (u \, dx - v \, dy) + i\int_\gamma (v \, dx + u \, dy)$$

Path independence of the complex integral corresponds to two real vector fields being conservative:
- $\mathbf{F}_1 = (u, -v)$
- $\mathbf{F}_2 = (v, u)$

If $f$ is analytic with antiderivative $F = U + iV$, then:
- $U_x = u, U_y = -v$ (so $\mathbf{F}_1 = \nabla U$)
- $V_x = v, V_y = u$ (so $\mathbf{F}_2 = \nabla V$)

## Applications

### Evaluating Definite Integrals

When an antiderivative exists:
$$\int_{z_0}^{z_1} f(z) \, dz = F(z_1) - F(z_0)$$

This is far simpler than parametrizing a curve.

### Work and Energy

In physics, path-independent integrals correspond to conservative forces. The work done by a conservative force depends only on initial and final positions, not the path taken.

### Logarithmic Integrals

For $f(z) = \frac{g'(z)}{g(z)}$:
$$\int_\gamma \frac{g'(z)}{g(z)} \, dz = \log g(z_1) - \log g(z_0)$$

(with appropriate branch choices).

## Summary

- **Path independence**: $\int_{\gamma_1} f = \int_{\gamma_2} f$ for paths with same endpoints
- Equivalent to: $\oint_\gamma f(z) \, dz = 0$ for all closed curves
- **Antiderivative**: $F'(z) = f(z)$ implies $\int_\gamma f = F(z_1) - F(z_0)$
- **Fundamental theorem**: $\int_\gamma F'(z) \, dz = F(z_1) - F(z_0)$
- Path independence $\iff$ existence of antiderivative (for continuous $f$ on connected domains)
- **Analytic functions on simply connected domains have antiderivatives** (Cauchy's theorem)
- $f(z) = 1/z$ has path-dependent integrals on $\mathbb{C} \setminus \{0\}$ (not simply connected)
- Non-analytic functions (like $\bar{z}$) have path-dependent integrals
- Path independence simplifies integration and connects to conservative fields in physics
- Understanding when integrals are path-independent is crucial for applying Cauchy's theorem
