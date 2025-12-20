# Conformal Mappings

Conformal mappings are transformations that preserve angles locally. In complex analysis, analytic functions with non-zero derivatives are conformal, making them powerful tools for solving problems in geometry, physics, and engineering. These mappings transform complicated regions into simpler ones while preserving the geometric structure.

## Definition

A function $f: D \to \mathbb{C}$ is **conformal** at $z_0 \in D$ if it preserves angles between curves passing through $z_0$.

**Precisely**: If $\gamma_1$ and $\gamma_2$ are smooth curves intersecting at $z_0$ with angle $\theta$, then $f(\gamma_1)$ and $f(\gamma_2)$ intersect at $f(z_0)$ with the same angle $\theta$ (in both magnitude and orientation).

## Theorem: Analyticity Implies Conformality

**Theorem**: If $f$ is analytic at $z_0$ and $f'(z_0) \neq 0$, then $f$ is conformal at $z_0$.

**Proof**: Write $f(z_0 + h) \approx f(z_0) + f'(z_0)h$ for small $h$.

Multiplication by $f'(z_0) = re^{i\phi}$ rotates by $\phi$ and scales by $r$. Since the transformation is linear (for small $h$), angles are preserved.

**Converse**: If $f$ is conformal on a domain and has continuous first partial derivatives, then $f$ is analytic.

## Geometric Interpretation

At points where $f'(z_0) \neq 0$:
- $f$ locally acts like multiplication by $f'(z_0)$
- Rotation by $\arg(f'(z_0))$
- Scaling by $|f'(z_0)|$
- Angles preserved, but distances scaled

## Examples

### Linear Transformations

$f(z) = az + b$ with $a \neq 0$:
- Rotation by $\arg(a)$
- Scaling by $|a|$
- Translation by $b$
- Conformal everywhere

### Squaring Function

$f(z) = z^2$:
- Conformal except at $z = 0$ (where $f'(0) = 0$)
- Angles at origin are doubled
- Maps rays from origin to rays, doubling angles

### Exponential

$f(z) = e^z$:
- Conformal everywhere (entire, $f' = e^z \neq 0$)
- Maps vertical lines to circles, horizontal lines to rays

## Summary

- Conformal: preserves angles
- Analytic with $f' \neq 0$ implies conformal
- Local behavior: rotation + scaling
- Critical points ($f' = 0$): not conformal
- Applications: solving PDEs, fluid flow, electrostatics
