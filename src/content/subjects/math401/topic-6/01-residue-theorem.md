# The Residue Theorem

The residue theorem is the crown jewel of complex integration. It states that the integral of a function around a closed contour equals $2\pi i$ times the sum of residues at singularities inside the contour. This remarkable result transforms difficult integration problems into simple algebraic calculations and has countless applications in mathematics, physics, and engineering.

## Statement

**Theorem (Residue Theorem)**: Let $f$ be analytic in a domain $D$ except for isolated singularities at $z_1, \ldots, z_n$. Let $\gamma$ be a simple closed contour in $D$ enclosing these singularities (and no others). Then:

$$\oint_\gamma f(z) \, dz = 2\pi i \sum_{k=1}^n \text{Res}(f, z_k)$$

## Proof

By contour deformation, replace $\gamma$ with small circles $C_k$ around each $z_k$:

$$\oint_\gamma f = \sum_{k=1}^n \oint_{C_k} f$$

For each circle:
$$\oint_{C_k} f(z) \, dz = \oint_{C_k} \sum_{n=-\infty}^{\infty} a_n^{(k)}(z - z_k)^n \, dz$$

Only the $n = -1$ term contributes:
$$= 2\pi i \cdot a_{-1}^{(k)} = 2\pi i \cdot \text{Res}(f, z_k)$$

Summing over all singularities gives the result.

## Examples

### Example 1: Simple Poles

$$\oint_{|z|=2} \frac{1}{z(z-1)} \, dz$$

Singularities: $z = 0$ (simple), $z = 1$ (simple), both inside $|z| = 2$.

Residues:
- $\text{Res}(f, 0) = \lim_{z \to 0} z \cdot \frac{1}{z(z-1)} = -1$
- $\text{Res}(f, 1) = \lim_{z \to 1} (z-1) \cdot \frac{1}{z(z-1)} = 1$

$$\oint_{|z|=2} f = 2\pi i(-1 + 1) = 0$$

### Example 2: Higher Order Pole

$$\oint_{|z|=1} \frac{e^z}{z^3} \, dz$$

Pole of order 3 at $z = 0$ (inside).

$$\text{Res}(e^z/z^3, 0) = \frac{1}{2!}\lim_{z \to 0} \frac{d^2}{dz^2}[e^z] = \frac{1}{2}$$

$$\oint_{|z|=1} \frac{e^z}{z^3} \, dz = 2\pi i \cdot \frac{1}{2} = \pi i$$

### Example 3: Multiple Singularities

$$\oint_{|z|=3} \frac{z}{(z^2+1)(z-2)} \, dz$$

Singularities: $z = i, -i, 2$ (all simple, all inside).

Compute residues using formula for rational functions, then sum and multiply by $2\pi i$.

## Summary

- $\oint_\gamma f = 2\pi i \sum \text{Res}(f, z_k)$
- Transforms contour integrals into residue calculations
- One of the most powerful tools in mathematics
- Applications: evaluating real integrals, summing series, inverse transforms
