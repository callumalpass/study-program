# Riemann Mapping Theorem

The Riemann Mapping Theorem is one of the crown jewels of complex analysis, asserting that any simply connected proper subdomain of the complex plane can be conformally mapped to the unit disk. This profound result demonstrates the remarkable rigidity and uniformity of complex geometry.

## Statement of the Theorem

**Theorem (Riemann Mapping Theorem)**: Let $\Omega \subsetneq \mathbb{C}$ be a simply connected domain. Then there exists a conformal map (biholomorphic function) $f: \Omega \to \mathbb{D}$, where $\mathbb{D} = \{z : |z| < 1\}$ is the unit disk.

Moreover, for any $z_0 \in \Omega$ and any $\theta \in \mathbb{R}$, there is a unique such map with $f(z_0) = 0$ and $\arg(f'(z_0)) = \theta$.

## Significance

1. **Universal model**: Every simply connected domain (except $\mathbb{C}$) is conformally equivalent to the unit disk
2. **Uniqueness**: Normalization conditions determine the map uniquely
3. **Non-constructive**: Proof uses compactness arguments; doesn't provide explicit formula
4. **Dimension-specific**: No analogue in higher dimensions (rigidity phenomenon)

## Key Ideas of Proof

The proof uses several deep techniques from complex analysis:

### Step 1: Existence of Injective Analytic Functions

If $\Omega \neq \mathbb{C}$, there exists a point $a \notin \Omega$. Define:
$$g(z) = \sqrt{z - a}$$

(choosing a branch). Since $\Omega$ is simply connected, $g$ is well-defined and injective on $\Omega$.

### Step 2: Family of Competitors

Let $\mathcal{F}$ be the family of all injective analytic functions $f: \Omega \to \mathbb{D}$ with $f(z_0) = 0$ for fixed $z_0 \in \Omega$.

By previous step, $\mathcal{F}$ is non-empty.

### Step 3: Maximizing Derivative

Consider the quantity $|f'(z_0)|$ for $f \in \mathcal{F}$.

**Claim**: There exists $f \in \mathcal{F}$ maximizing $|f'(z_0)|$.

**Proof**: Use normal families theory. The family $\mathcal{F}$ is locally bounded, hence normal by Montel's theorem. A maximizing sequence has a convergent subsequence. The limit function achieves the maximum and remains in $\mathcal{F}$.

### Step 4: Surjectivity

**Claim**: The maximizer $f$ from Step 3 is surjective.

**Proof** (by contradiction): Suppose $f(\Omega) \subsetneq \mathbb{D}$. Let $w_0 \in \mathbb{D} \setminus f(\Omega)$.

Define automorphism of disk:
$$\phi(w) = \frac{w - w_0}{1 - \overline{w_0}w}$$

Then $\phi \circ f: \Omega \to \mathbb{D}$ is injective, and $\phi(0) \neq 0$.

Compose with rotation and square root to construct $h \in \mathcal{F}$ with $|h'(z_0)| > |f'(z_0)|$, contradicting maximality.

### Step 5: Uniqueness

Given normalizations $f(z_0) = 0$ and $\arg(f'(z_0)) = \theta$, uniqueness follows from the extremal property: any other such map would contradict maximality of $|f'(z_0)|$.

## Examples Where Maps Are Known

Despite non-constructive proof, many domains have explicit mappings:

### Upper Half-Plane

$$f(z) = \frac{z - i}{z + i}$$

Maps $\mathbb{H}$ to $\mathbb{D}$.

### Right Half-Plane

$$f(z) = \frac{z - 1}{z + 1}$$

Maps $\{z : \text{Re}(z) > 0\}$ to $\mathbb{D}$.

### Strip

$$f(z) = \tanh\left(\frac{\pi z}{2}\right)$$

Maps horizontal strip $\{z : |\text{Im}(z)| < 1\}$ to $\mathbb{D}$.

### Sector

For sector $\{z : 0 < \arg(z) < \alpha\}$:

First map to upper half-plane via $z^{\pi/\alpha}$, then to disk.

## Domains Without Explicit Formulas

For many domains (e.g., rectangles, general polygons), no closed-form expressions exist. The Schwarz-Christoffel formula provides integral representations, but these often require numerical evaluation.

## Computational Aspects

**Numerical conformal mapping**: Algorithms exist to approximate Riemann maps:
1. **Zipper algorithm**: Successive approximation method
2. **Schwarz-Christoffel toolbox**: For polygonal domains
3. **Fast multipole methods**: For complicated boundaries

These are implemented in software packages (MATLAB, Python).

## Why $\mathbb{C}$ Is Excluded

The entire complex plane $\mathbb{C}$ cannot be conformally mapped to $\mathbb{D}$.

**Proof**: Suppose $f: \mathbb{C} \to \mathbb{D}$ is conformal. Then $f$ is entire and bounded, hence constant by Liouville's theorem—contradiction.

This shows topological constraint: compactness matters.

## Multiply Connected Domains

The Riemann Mapping Theorem fails for multiply connected domains.

**Example**: Annulus $\{z : 1 < |z| < R\}$ is not conformally equivalent to $\{z : 1 < |z| < R'\}$ unless $R = R'$.

**Moduli**: Multiply connected domains have conformal invariants (moduli) that distinguish non-equivalent domains.

## Applications

### Dirichlet Problem

To solve $\Delta u = 0$ in domain $\Omega$ with boundary condition $u|_{\partial\Omega} = g$:

1. Map $\Omega$ conformally to $\mathbb{D}$ via $f$
2. Solve Dirichlet problem in $\mathbb{D}$ (explicit via Poisson kernel)
3. Transform solution back: $u = \tilde{u} \circ f$

### Prime Number Theorem

Historical application: Riemann used conformal mapping properties in studying the zeta function, which led to the prime number theorem.

### Theoretical Physics

Conformal field theory uses conformal maps extensively. The Riemann mapping theorem guarantees existence of coordinate systems.

## Extensions and Generalizations

1. **Measurable Riemann Mapping**: Extends to quasiconformal maps
2. **Riemann Surfaces**: Uniformization theorem generalizes to all Riemann surfaces
3. **Several Complex Variables**: No analogue; unit ball and polydisk are not biholomorphically equivalent

## Philosophical Implications

The theorem shows that simply connected planar domains are geometrically uniform—conformal geometry of the plane has hidden symmetry. This is unique to dimension 2 (one complex dimension).

## Historical Context

- **Riemann (1851)**: Stated theorem, gave outline of proof
- **Osgood, Carathéodory, Koebe (early 1900s)**: Rigorous proofs
- **Modern approach**: Uses normal families (Montel's theorem)

## Summary

- **Statement**: Simply connected domain $\Omega \subsetneq \mathbb{C}$ is conformally equivalent to unit disk
- **Uniqueness**: Normalization at one point determines map uniquely
- **Proof strategy**: Normal families, extremal property, contradiction
- **Explicit formulas**: Known for simple domains (half-plane, strip, sector)
- **General domains**: Numerical methods required
- **Multiply connected**: Theorem fails; conformal moduli exist
- **Applications**: Solving PDEs, theoretical physics, number theory
- Fundamental result showing uniformity of complex geometry
