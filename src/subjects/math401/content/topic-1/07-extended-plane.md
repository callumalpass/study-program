# The Extended Complex Plane and Riemann Sphere

The extended complex plane, obtained by adjoining a single "point at infinity" to $\mathbb{C}$, provides a natural compactification of the complex plane. This construction, visualized as the Riemann sphere, unifies many concepts in complex analysis and has profound applications in geometry, complex dynamics, and mathematical physics.

## Motivation: The Point at Infinity

In the complex plane, many functions and geometric objects behave differently "near infinity." For example:

- The function $f(z) = 1/z$ maps small circles around $0$ to large circles far from the origin
- Sequences like $z_n = n$ grow without bound
- Lines in the plane "meet at infinity" in projective geometry

To handle these phenomena systematically, we adjoin a single **point at infinity**, denoted $\infty$, to $\mathbb{C}$.

## The Extended Complex Plane

The **extended complex plane** (or **Riemann sphere**) is:

$$\widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$$

This is also written $\mathbb{C}_\infty$ or $\mathbb{P}^1(\mathbb{C})$ (the complex projective line).

### Neighborhoods of Infinity

We define **neighborhoods of $\infty$** as sets of the form:

$$N_\epsilon(\infty) = \{z \in \mathbb{C} : |z| > 1/\epsilon\} \cup \{\infty\}$$

for $\epsilon > 0$. Intuitively, $N_\epsilon(\infty)$ consists of all points "far from the origin" plus $\infty$ itself.

With this topology, $\widehat{\mathbb{C}}$ becomes a compact topological space (homeomorphic to the 2-sphere $S^2$).

### Extended Arithmetic

We extend arithmetic operations to include $\infty$:

**Addition**:
- $z + \infty = \infty$ for all $z \in \mathbb{C}$
- $\infty + \infty = \infty$
- $\infty - z = \infty$ for all $z \in \mathbb{C}$
- $\infty + \infty = \infty$

**Multiplication**:
- $z \cdot \infty = \infty$ for all $z \in \mathbb{C} \setminus \{0\}$
- $\infty \cdot \infty = \infty$
- $0 \cdot \infty$ is **undefined**

**Division**:
- $z / \infty = 0$ for all $z \in \mathbb{C}$
- $z / 0 = \infty$ for all $z \in \mathbb{C} \setminus \{0\}$
- $\infty / z = \infty$ for all $z \in \mathbb{C} \setminus \{0\}$
- $\infty / \infty$ and $0/0$ are **undefined**

**Undefined expressions**: $0 \cdot \infty$, $\infty - \infty$, $0/0$, $\infty/\infty$

These rules make many limiting processes more natural. For example, $\lim_{z \to 0} 1/z = \infty$ in $\widehat{\mathbb{C}}$.

## Stereographic Projection

The Riemann sphere is most beautifully understood via **stereographic projection**, which establishes a bijection between $\widehat{\mathbb{C}}$ and the unit sphere $S^2 \subset \mathbb{R}^3$.

### The Construction

Consider the unit sphere:
$$S^2 = \{(x, y, z) \in \mathbb{R}^3 : x^2 + y^2 + z^2 = 1\}$$

with **north pole** $N = (0, 0, 1)$ and **south pole** $S = (0, 0, -1)$.

Identify the complex plane $\mathbb{C}$ with the $xy$-plane in $\mathbb{R}^3$ via $a + bi \leftrightarrow (a, b, 0)$.

For each point $P = (a, b, 0)$ in the plane, draw the line from $N$ through $P$. This line intersects the sphere at exactly one point $Q \neq N$.

This establishes a bijection:
$$\phi: \mathbb{C} \to S^2 \setminus \{N\}$$

We complete the bijection by defining $\phi(\infty) = N$.

### Explicit Formulas

For $z = a + bi \in \mathbb{C}$, the stereographic projection $\phi(z) = (X, Y, Z) \in S^2$ is given by:

$$X = \frac{2a}{a^2 + b^2 + 1}, \quad Y = \frac{2b}{a^2 + b^2 + 1}, \quad Z = \frac{a^2 + b^2 - 1}{a^2 + b^2 + 1}$$

Or more compactly, using $r^2 = |z|^2 = a^2 + b^2$:

$$\phi(z) = \left(\frac{2a}{r^2 + 1}, \frac{2b}{r^2 + 1}, \frac{r^2 - 1}{r^2 + 1}\right)$$

### Inverse Formula

Given $(X, Y, Z) \in S^2 \setminus \{N\}$ (i.e., $Z \neq 1$), the inverse map is:

$$\phi^{-1}(X, Y, Z) = \frac{X + iY}{1 - Z}$$

**Verification** that $\phi$ maps to $S^2$:

$$X^2 + Y^2 + Z^2 = \frac{4a^2 + 4b^2 + (a^2 + b^2 - 1)^2}{(a^2 + b^2 + 1)^2}$$

$$= \frac{4a^2 + 4b^2 + a^4 + 2a^2b^2 + b^4 - 2a^2 - 2b^2 + 1}{(a^2 + b^2 + 1)^2}$$

$$= \frac{(a^2 + b^2)^2 + 2(a^2 + b^2) + 1}{(a^2 + b^2 + 1)^2} = \frac{(a^2 + b^2 + 1)^2}{(a^2 + b^2 + 1)^2} = 1$$ ✓

### Special Cases

1. **Origin**: $\phi(0) = (0, 0, -1) = S$ (the south pole)

2. **Real axis**: $\phi(x) = \left(\frac{2x}{x^2 + 1}, 0, \frac{x^2 - 1}{x^2 + 1}\right)$ lies on the intersection of $S^2$ with the $xz$-plane

3. **Imaginary axis**: $\phi(iy) = \left(0, \frac{2y}{y^2 + 1}, \frac{y^2 - 1}{y^2 + 1}\right)$ lies on the intersection of $S^2$ with the $yz$-plane

4. **Unit circle**: Points with $|z| = 1$ map to the equator $Z = 0$

5. **Interior of unit disk**: $|z| < 1$ maps to the southern hemisphere $Z < 0$

6. **Exterior of unit disk**: $|z| > 1$ maps to the northern hemisphere $Z > 0$

## Properties of Stereographic Projection

### Conformality

Stereographic projection is **conformal**: it preserves angles between curves. If two curves in $\mathbb{C}$ intersect at angle $\theta$, their images on $S^2$ also intersect at angle $\theta$.

This property makes stereographic projection invaluable in cartography and physics.

### Circles Map to Circles

A fundamental property: stereographic projection maps circles in $\mathbb{C}$ to circles on $S^2$, and vice versa.

Here, we interpret "circle" broadly:
- A **circle** is $\{z : |z - z_0| = r\}$ for some $z_0 \in \mathbb{C}$ and $r > 0$
- A **line** is considered a circle through $\infty$

Thus, circles and lines in $\mathbb{C}$ map to circles on $S^2$ (with lines corresponding to circles through $N$).

**Example**: The real axis (a line in $\mathbb{C}$) maps to the circle on $S^2$ through $N$ and $S$ in the $xz$-plane.

### Antipodal Points

Points $z$ and $-1/\bar{z}$ are **antipodal** on the Riemann sphere: they map to opposite points on $S^2$ (i.e., $(X, Y, Z)$ and $(-X, -Y, -Z)$).

**Proof**: If $\phi(z) = (X, Y, Z)$, then:

$$\phi\left(-\frac{1}{\bar{z}}\right) = \phi\left(-\frac{1}{a - bi}\right) = \phi\left(-\frac{a + bi}{a^2 + b^2}\right)$$

Computing:
$$= \phi\left(-\frac{a}{a^2 + b^2} - \frac{bi}{a^2 + b^2}\right) = (-X, -Y, -Z)$$

## Compactness of the Riemann Sphere

The extended complex plane $\widehat{\mathbb{C}}$ is **compact**. This follows from the homeomorphism with $S^2$, which is a closed and bounded subset of $\mathbb{R}^3$, hence compact.

**Consequences**:

1. Every sequence in $\widehat{\mathbb{C}}$ has a convergent subsequence
2. Every continuous function $f : \widehat{\mathbb{C}} \to \mathbb{R}$ is bounded and attains its maximum
3. Many theorems simplify when formulated on $\widehat{\mathbb{C}}$ rather than $\mathbb{C}$

### Convergence in the Extended Plane

A sequence $(z_n)$ in $\mathbb{C}$ **converges to $\infty$** if for every $M > 0$, there exists $N$ such that $|z_n| > M$ for all $n > N$.

This is equivalent to convergence to $\infty$ in the topology of $\widehat{\mathbb{C}}$.

## Möbius Transformations

**Möbius transformations** (or **linear fractional transformations**) are functions of the form:

$$f(z) = \frac{az + b}{cz + d}$$

where $a, b, c, d \in \mathbb{C}$ with $ad - bc \neq 0$.

Extended to $\widehat{\mathbb{C}}$:
- $f(-d/c) = \infty$ if $c \neq 0$
- $f(\infty) = a/c$ if $c \neq 0$
- $f(\infty) = \infty$ if $c = 0$

### Properties

1. **Bijections**: Möbius transformations are bijections $\widehat{\mathbb{C}} \to \widehat{\mathbb{C}}$
2. **Circles to circles**: They map circles (including lines) to circles
3. **Conformal**: They preserve angles
4. **Group structure**: Compositions of Möbius transformations are Möbius transformations
5. **Three-point determination**: A Möbius transformation is uniquely determined by where it sends three distinct points

### Examples

1. **Translation**: $f(z) = z + b$ (maps $\infty \to \infty$)

2. **Scaling**: $f(z) = az$ for $a \neq 0$ (maps $\infty \to \infty$)

3. **Inversion**: $f(z) = 1/z$ (swaps $0$ and $\infty$)

4. **Cayley transform**: $f(z) = \frac{z - i}{z + i}$ (maps upper half-plane to unit disk)

### Cross-Ratio

The **cross-ratio** of four distinct points $z_1, z_2, z_3, z_4 \in \widehat{\mathbb{C}}$ is:

$$(z_1, z_2; z_3, z_4) = \frac{(z_1 - z_3)(z_2 - z_4)}{(z_1 - z_4)(z_2 - z_3)}$$

Möbius transformations preserve cross-ratios: if $f$ is a Möbius transformation, then:

$$(f(z_1), f(z_2); f(z_3), f(z_4)) = (z_1, z_2; z_3, z_4)$$

## Meromorphic Functions on the Riemann Sphere

A function $f : \widehat{\mathbb{C}} \to \widehat{\mathbb{C}}$ is **meromorphic on the Riemann sphere** if it is meromorphic (analytic except for poles) both on $\mathbb{C}$ and at $\infty$.

### Behavior at Infinity

The behavior of $f$ at $\infty$ is determined by the behavior of $g(w) = f(1/w)$ at $w = 0$.

- $f$ has a **pole at $\infty$** if $g$ has a pole at $0$
- $f$ has a **zero at $\infty$** if $g$ has a zero at $0$
- $f$ is **analytic at $\infty$** if $g$ is analytic at $0$

### Rational Functions

A **rational function** $f(z) = P(z)/Q(z)$ (where $P$ and $Q$ are polynomials) extends to a meromorphic function on $\widehat{\mathbb{C}}$.

**Liouville's Theorem (Extended)**: The only meromorphic functions on $\widehat{\mathbb{C}}$ with no poles are the constant functions.

Equivalently: Every non-constant meromorphic function on $\widehat{\mathbb{C}}$ has at least one pole.

**Corollary**: Every meromorphic function on $\widehat{\mathbb{C}}$ is a rational function.

This shows that rational functions are precisely the "nice" functions on the Riemann sphere.

## Applications

### Complex Dynamics

The iteration of rational functions $f : \widehat{\mathbb{C}} \to \widehat{\mathbb{C}}$ produces beautiful fractals:

- The **Julia set** of $f$ is the boundary of the set of points with bounded orbits
- The **Mandelbrot set** arises from iterating $z \mapsto z^2 + c$

The compactness of $\widehat{\mathbb{C}}$ is essential for studying these dynamics.

### Riemann Surfaces

The Riemann sphere is the simplest compact Riemann surface (a 1-dimensional complex manifold). All compact Riemann surfaces of genus 0 are isomorphic to $\widehat{\mathbb{C}}$.

### Projective Geometry

In projective geometry, lines "meet at infinity." The Riemann sphere provides a natural model where this is literally true: parallel lines in $\mathbb{C}$ become circles through $\infty$ on $S^2$, and they intersect at $\infty$.

### Physics

The Riemann sphere appears in:

- **Quantum mechanics**: The Bloch sphere representing qubit states is the Riemann sphere
- **String theory**: Scattering amplitudes are often computed on the Riemann sphere
- **General relativity**: Null infinity is modeled using the Riemann sphere

### Electrostatics

Under stereographic projection, the electric potential of a point charge at the south pole of $S^2$ corresponds to the logarithmic potential $\log|z|$ in $\mathbb{C}$.

## Topology of the Riemann Sphere

As a topological space, $\widehat{\mathbb{C}}$ has the following properties:

1. **Compact**: Every open cover has a finite subcover
2. **Hausdorff**: Distinct points have disjoint neighborhoods
3. **Connected**: Cannot be written as a disjoint union of open sets
4. **Simply connected**: Every loop can be contracted to a point
5. **Orientable**: Has a consistent notion of "clockwise"

These properties make $\widehat{\mathbb{C}}$ homeomorphic to $S^2$, the 2-dimensional sphere.

## Chordal Metric

An alternative metric on $\widehat{\mathbb{C}}$ is the **chordal metric**, which measures distance via the chord length on $S^2$ after stereographic projection.

For $z, w \in \mathbb{C}$:

$$\chi(z, w) = \frac{2|z - w|}{\sqrt{1 + |z|^2}\sqrt{1 + |w|^2}}$$

For $z \in \mathbb{C}$:

$$\chi(z, \infty) = \frac{2}{\sqrt{1 + |z|^2}}$$

The chordal metric makes $\widehat{\mathbb{C}}$ a complete metric space with finite diameter.

### Properties

1. $\chi(z, w) \leq 2$ for all $z, w \in \widehat{\mathbb{C}}$
2. $\chi$ induces the same topology as stereographic projection
3. Möbius transformations are isometries of $(\widehat{\mathbb{C}}, \chi)$

## Summary

- The **extended complex plane** $\widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$ compactifies $\mathbb{C}$
- **Stereographic projection** establishes a homeomorphism $\widehat{\mathbb{C}} \cong S^2$
- Explicit formulas: $\phi(z) = \left(\frac{2\text{Re}(z)}{|z|^2 + 1}, \frac{2\text{Im}(z)}{|z|^2 + 1}, \frac{|z|^2 - 1}{|z|^2 + 1}\right)$
- Stereographic projection is **conformal** and maps circles to circles
- $\widehat{\mathbb{C}}$ is **compact**, **connected**, and **simply connected**
- **Möbius transformations** $f(z) = \frac{az+b}{cz+d}$ are automorphisms of $\widehat{\mathbb{C}}$
- Meromorphic functions on $\widehat{\mathbb{C}}$ are precisely rational functions
- Applications to dynamics, geometry, and physics
- The Riemann sphere unifies and simplifies many aspects of complex analysis
