---
id: math401-topic-3-5
title: "Independence of Path"
order: 5
---

# The Cauchy-Goursat Theorem

The Cauchy-Goursat theorem is one of the most fundamental and powerful results in complex analysis. It states that the integral of an analytic function around a closed curve is zero—a result with no direct analog in real analysis. This theorem leads to profound consequences including Cauchy's integral formula, the residue theorem, and ultimately explains why analytic functions have such remarkable properties.

## Statement of the Theorem

**Cauchy-Goursat Theorem**: Let $f$ be analytic on a simply connected domain $D$. Then for every closed contour $\gamma$ in $D$:

$$\oint_\gamma f(z) \, dz = 0$$

The modern version, due to Édouard Goursat (1900), removes Cauchy's original requirement that $f'$ be continuous. If $f$ is analytic (complex differentiable), then $f'$ is automatically continuous, and the integral vanishes.

## Historical Context

**Augustin-Louis Cauchy** (1825) first proved a version of this theorem assuming $f'$ is continuous.

**Édouard Goursat** (1900) strengthened the result, proving it requires only the existence of $f'(z)$, not its continuity. This was a major improvement, as it shows that complex differentiability alone (without continuity of the derivative) suffices.

The theorem is sometimes called:
- **Cauchy's theorem**
- **Cauchy-Goursat theorem**
- **Cauchy's integral theorem**

## Simple Closed Curve Version

**Cauchy's Theorem for Simple Closed Curves**: Let $\gamma$ be a simple closed contour, and let $f$ be analytic on and inside $\gamma$. Then:

$$\oint_\gamma f(z) \, dz = 0$$

This version is often stated first because it's more intuitive: if $f$ is analytic everywhere inside and on a simple closed curve, the integral around that curve is zero.

## Proof for a Triangle (Goursat's Approach)

We'll prove the theorem for a triangular contour, then extend to general contours.

**Theorem**: If $f$ is analytic on and inside a triangle $T$, then:

$$\oint_{\partial T} f(z) \, dz = 0$$

**Proof**:

**Step 1**: Subdivide the triangle into four congruent triangles by connecting the midpoints of the sides.

Let $T = T_1 \cup T_2 \cup T_3 \cup T_4$.

The integral around $T$ equals the sum of integrals around the four sub-triangles (interior edges cancel):

$$\oint_{\partial T} f = \oint_{\partial T_1} f + \oint_{\partial T_2} f + \oint_{\partial T_3} f + \oint_{\partial T_4} f$$

**Step 2**: At least one sub-triangle satisfies:

$$\left|\oint_{\partial T_j} f\right| \geq \frac{1}{4}\left|\oint_{\partial T} f\right|$$

Call this triangle $T^{(1)}$.

**Step 3**: Repeat the subdivision process on $T^{(1)}$ to get $T^{(2)}$, then $T^{(3)}$, etc.

This produces a nested sequence $T \supseteq T^{(1)} \supseteq T^{(2)} \supseteq \cdots$ with:

$$\left|\oint_{\partial T^{(n)}} f\right| \geq \frac{1}{4^n}\left|\oint_{\partial T} f\right|$$

**Step 4**: The diameters shrink: $\text{diam}(T^{(n)}) = \frac{\text{diam}(T)}{2^n} \to 0$.

By the nested interval theorem, there exists a unique point $z_0 \in \bigcap_{n=1}^\infty T^{(n)}$.

**Step 5**: Since $f$ is analytic at $z_0$:

$$f(z) = f(z_0) + f'(z_0)(z - z_0) + (z - z_0)\epsilon(z)$$

where $\epsilon(z) \to 0$ as $z \to z_0$.

The first two terms have antiderivatives (constant and linear), so their integrals around closed curves vanish:

$$\oint_{\partial T^{(n)}} f = \oint_{\partial T^{(n)}} (z - z_0)\epsilon(z) \, dz$$

**Step 6**: Estimate using ML inequality. For $n$ large enough that $|\epsilon(z)| < \delta$ on $T^{(n)}$:

$$\left|\oint_{\partial T^{(n)}} (z - z_0)\epsilon(z) \, dz\right| \leq \delta \cdot \text{diam}(T^{(n)}) \cdot L(T^{(n)})$$

$$\leq \delta \cdot \frac{\text{diam}(T)}{2^n} \cdot \frac{3\text{diam}(T)}{2^n} = \frac{3\delta \cdot \text{diam}(T)^2}{4^n}$$

**Step 7**: Combining with the inequality from Step 3:

$$\left|\oint_{\partial T} f\right| \leq 4^n \left|\oint_{\partial T^{(n)}} f\right| \leq 4^n \cdot \frac{3\delta \cdot \text{diam}(T)^2}{4^n} = 3\delta \cdot \text{diam}(T)^2$$

Since $\delta$ can be arbitrarily small (as $n \to \infty$, $\epsilon \to 0$):

$$\left|\oint_{\partial T} f\right| = 0$$

Therefore $\oint_{\partial T} f = 0$.

## Extension to Rectangles

**Corollary**: If $f$ is analytic on and inside a rectangle $R$, then:

$$\oint_{\partial R} f(z) \, dz = 0$$

**Proof**: Divide the rectangle into two triangles by a diagonal. The integral around the rectangle equals the sum of integrals around the triangles (the diagonal is traversed in opposite directions, so cancels). Each triangle integral is zero by the theorem above.

## Extension to Simple Closed Curves

**Theorem**: If $f$ is analytic on a simply connected domain $D$ and $\gamma$ is any simple closed curve in $D$, then:

$$\oint_\gamma f(z) \, dz = 0$$

**Proof sketch**: Approximate $\gamma$ by a polygon (piecewise linear curve). Subdivide the region into triangles. The sum of integrals over all triangles equals the integral around $\gamma$ (interior edges cancel). Each triangle integral is zero, so the total is zero. Taking limits as the approximation improves gives the result.

A rigorous proof requires more topology (Jordan curve theorem, triangulation), but the idea is clear.

## General Version for Simply Connected Domains

**Cauchy-Goursat Theorem (General)**: If $f$ is analytic on a simply connected domain $D$, then for any closed contour $\gamma$ in $D$:

$$\oint_\gamma f(z) \, dz = 0$$

The simply connected assumption is essential: it ensures no "holes" that might contain singularities.

## Examples

### Example 1: Polynomial Around Any Closed Curve

Let $f(z) = z^3 + 2z^2 - 5z + 1$ (entire function).

For any closed curve $\gamma$:
$$\oint_\gamma (z^3 + 2z^2 - 5z + 1) \, dz = 0$$

### Example 2: Exponential

$$\oint_{|z|=5} e^z \, dz = 0$$

Since $e^z$ is entire and the disk $|z| \leq 5$ is simply connected.

### Example 3: Trigonometric

$$\oint_\gamma \sin(z^2 + 3z) \, dz = 0$$

for any closed $\gamma$ (the composition of $\sin$ with a polynomial is entire).

### Example 4: When the Theorem Doesn't Apply

$$\oint_{|z|=1} \frac{1}{z} \, dz = 2\pi i \neq 0$$

The function $f(z) = 1/z$ is NOT analytic at $z = 0$, which is inside the contour. Cauchy's theorem doesn't apply.

However, on the annulus $1 < |z| < 2$ (which is NOT simply connected but doesn't contain $z = 0$), we can apply a modified version (Cauchy's theorem for multiply connected domains).

## Consequences

### Path Independence

**Corollary**: If $f$ is analytic on a simply connected domain $D$, then $\int_\gamma f(z) \, dz$ is path-independent in $D$.

**Proof**: For any two paths $\gamma_1, \gamma_2$ from $z_0$ to $z_1$ in $D$, the closed curve $\gamma = \gamma_1 + (-\gamma_2)$ has:

$$\oint_\gamma f = \int_{\gamma_1} f - \int_{\gamma_2} f = 0$$

So $\int_{\gamma_1} f = \int_{\gamma_2} f$.

### Existence of Antiderivatives

**Corollary**: If $f$ is analytic on a simply connected domain $D$, then $f$ has an antiderivative on $D$.

**Proof**: Fix $z_0 \in D$. Define:

$$F(z) = \int_{z_0}^z f(\zeta) \, d\zeta$$

By path independence (from Cauchy's theorem), this is well-defined. We've shown (in the antiderivatives section) that $F'(z) = f(z)$.

### Morera's Theorem (Converse)

**Theorem (Morera)**: If $f$ is continuous on domain $D$ and $\oint_\gamma f(z) \, dz = 0$ for every closed curve $\gamma$ in $D$, then $f$ is analytic on $D$.

**Proof**: By the vanishing of integrals, $f$ has an antiderivative $F$ on $D$. Since $F' = f$ and $F$ is differentiable (hence analytic), $F$ is infinitely differentiable. Therefore $f = F'$ is also infinitely differentiable, hence analytic.

This provides a way to prove analyticity without checking Cauchy-Riemann equations!

## Cauchy's Theorem for Multiply Connected Domains

For domains with holes, a modified version holds:

**Theorem**: Let $f$ be analytic in a region between two simple closed curves $\gamma_1$ (outer) and $\gamma_2$ (inner), both oriented counterclockwise. Then:

$$\oint_{\gamma_1} f(z) \, dz = \oint_{\gamma_2} f(z) \, dz$$

**Interpretation**: The integral around the outer boundary equals the integral around the inner boundary.

### Example: Annulus

For $f(z) = 1/z$ on the annulus $1 < |z| < 3$:

$$\oint_{|z|=3} \frac{1}{z} \, dz = \oint_{|z|=1} \frac{1}{z} \, dz = 2\pi i$$

Even though the function is analytic on the annulus, both integrals are $2\pi i$ (not zero!) because the domain is not simply connected—it has a hole at $z = 0$.

## Deformation of Contours

**Corollary (Deformation Principle)**: If $\gamma_1$ and $\gamma_2$ are homotopic closed curves in a domain $D$ where $f$ is analytic, then:

$$\oint_{\gamma_1} f = \oint_{\gamma_2} f$$

Two curves are **homotopic** if one can be continuously deformed into the other without leaving $D$.

In a simply connected domain, all closed curves are homotopic (can be shrunk to a point), so all have integral zero.

## Applications

### Simplifying Integration

Instead of computing $\oint_\gamma f$ directly for a complicated curve $\gamma$, we can deform $\gamma$ to a simpler curve (like a circle) as long as $f$ is analytic in the region between them.

### Residue Calculus

Cauchy's theorem is the foundation for residue theory: the integral around a closed curve depends only on the singularities inside, not the specific curve.

### Proving Function Properties

Cauchy's theorem leads to:
- Cauchy's integral formula (derivatives from integrals)
- Liouville's theorem (bounded entire functions are constant)
- Maximum modulus principle
- Taylor and Laurent series

## Summary

- **Cauchy-Goursat theorem**: $\oint_\gamma f = 0$ for $f$ analytic on simply connected domain
- Proved by Goursat using subdivision of triangles and nested sequences
- **Requires**: $f$ analytic (complex differentiable); simply connected domain
- **Consequences**:
  - Path independence of integrals
  - Existence of antiderivatives
  - Morera's theorem (converse)
- **Multiply connected domains**: Integrals around inner and outer boundaries are equal
- **Deformation principle**: Homotopic curves give equal integrals
- Foundation for Cauchy's integral formula and residue theorem
- No analog in real analysis—unique to complex differentiability
- One of the most important theorems in all of mathematics
