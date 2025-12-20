---
id: math401-topic-7-2
title: "Linear Transformations"
order: 2
---

# Möbius Transformations

Möbius transformations (linear fractional transformations) are functions of the form $f(z) = \frac{az+b}{cz+d}$ with $ad - bc \neq 0$. These transformations are the most important conformal maps, forming a group under composition and mapping circles to circles (including lines as circles through infinity). They are fundamental tools in complex analysis, hyperbolic geometry, and many areas of physics including special relativity and quantum mechanics.

## Definition

A **Möbius transformation** is:
$$f(z) = \frac{az + b}{cz + d}$$

where $a, b, c, d \in \mathbb{C}$ and $ad - bc \neq 0$ (to ensure non-degeneracy).

The condition $ad - bc \neq 0$ ensures that the transformation is not constant. Note that if we multiply all coefficients by the same non-zero constant, we get the same transformation, so Möbius transformations are determined up to scalar multiplication.

**Extended to $\widehat{\mathbb{C}}$**:
- $f(\infty) = a/c$ if $c \neq 0$, $f(\infty) = \infty$ if $c = 0$
- $f(-d/c) = \infty$ if $c \neq 0$

The extended complex plane $\widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$ is also called the Riemann sphere. By extending to include infinity, Möbius transformations become bijective mappings from the Riemann sphere to itself.

## Basic Examples

- **Translation**: $f(z) = z + b$ (corresponds to $a=1, c=0, d=1$)
- **Scaling**: $f(z) = az$ (corresponds to $b=0, c=0, d=1$)
- **Rotation**: $f(z) = e^{i\theta}z$ (special case of scaling)
- **Inversion**: $f(z) = 1/z$ (corresponds to $a=0, b=1, c=1, d=0$)
- **General**: Composition of above

Every Möbius transformation can be decomposed as a composition of these basic types. Specifically, when $c \neq 0$, we can write:
$$f(z) = \frac{az+b}{cz+d} = \frac{a}{c} + \frac{bc-ad}{c(cz+d)} = \frac{a}{c} - \frac{ad-bc}{c^2} \cdot \frac{1}{z+d/c}$$

This shows that $f$ is the composition of:
1. Translation by $d/c$
2. Inversion $z \mapsto 1/z$
3. Scaling by $-(ad-bc)/c^2$
4. Translation by $a/c$

## Properties

1. **Bijection**: Maps $\widehat{\mathbb{C}} \to \widehat{\mathbb{C}}$ bijectively
2. **Group**: Compositions of Möbius transforms are Möbius
3. **Three-point determination**: Uniquely determined by images of three points
4. **Circle preservation**: Maps circles to circles (lines are circles through $\infty$)
5. **Conformal**: Everywhere except possibly at $\infty$ and $-d/c$

Let's explore these properties in detail:

### Bijection Property

Every Möbius transformation is a one-to-one mapping from the Riemann sphere onto itself. The inverse of $f(z) = \frac{az+b}{cz+d}$ is:
$$f^{-1}(w) = \frac{dw - b}{-cw + a} = \frac{-b + dw}{a - cw}$$

We can verify this is also a Möbius transformation with coefficients satisfying the non-degeneracy condition:
$$(-b)(a) - (d)(-c) = -ab + cd = -(ad - bc) \neq 0$$

### Group Structure

The set of all Möbius transformations forms a group under composition. If:
$$f(z) = \frac{az+b}{cz+d}, \quad g(z) = \frac{\alpha z + \beta}{\gamma z + \delta}$$

then their composition $(f \circ g)(z) = f(g(z))$ is also a Möbius transformation. The identity element is $e(z) = z$, and every element has an inverse as shown above.

This group is isomorphic to $\text{PSL}(2, \mathbb{C})$, the projective special linear group, which is the quotient of $\text{SL}(2, \mathbb{C})$ by its center $\{\pm I\}$. This connection to linear algebra provides powerful algebraic tools for studying Möbius transformations.

### Three-Point Determination

Given three distinct points $z_1, z_2, z_3 \in \widehat{\mathbb{C}}$ and their images $w_1, w_2, w_3 \in \widehat{\mathbb{C}}$, there exists a unique Möbius transformation mapping $z_i$ to $w_i$ for $i = 1, 2, 3$.

This is a consequence of the fact that Möbius transformations have four complex coefficients determined up to scalar multiplication, giving three degrees of freedom. Three point constraints thus uniquely determine the transformation.

## Cross-Ratio

The **cross-ratio** of four points:
$$(z_1, z_2; z_3, z_4) = \frac{(z_1-z_3)(z_2-z_4)}{(z_1-z_4)(z_2-z_3)}$$

is preserved by Möbius transformations.

**Theorem**: If $f$ is a Möbius transformation, then:
$$(f(z_1), f(z_2); f(z_3), f(z_4)) = (z_1, z_2; z_3, z_4)$$

This invariance is fundamental to many applications. The cross-ratio provides a way to define a projective invariant that characterizes the relative positions of four points in a way that is preserved under Möbius transformations.

**Geometric interpretation**: The cross-ratio can be interpreted as the ratio of ratios. If we think of $(z_1, z_2; z_3, z_4)$ as:
$$\frac{(z_1-z_3)/(z_1-z_4)}{(z_2-z_3)/(z_2-z_4)}$$

we see it compares how $z_1$ and $z_2$ are positioned relative to $z_3$ and $z_4$.

**Special cases**:
- If $(z_1, z_2; z_3, z_4) \in \mathbb{R}$, then the four points lie on a circle or line
- If $(z_1, z_2; z_3, z_4) = -1$, the four points form a harmonic range

## Finding Möbius Transformations

To find $f$ mapping $z_1, z_2, z_3$ to $w_1, w_2, w_3$:

$$(w, w_1; w_2, w_3) = (z, z_1; z_2, z_3)$$

Solve for $w = f(z)$.

**Example 1**: Find the Möbius transformation mapping $0, 1, \infty$ to $1, i, -1$.

**Solution**: Using the cross-ratio formula:
$$(w, 1; i, -1) = (z, 0; 1, \infty)$$

Expanding the left side:
$$\frac{(w-i)(1-(-1))}{(w-(-1))(1-i)} = \frac{2(w-i)}{(w+1)(1-i)}$$

Expanding the right side (with care at $\infty$):
$$\frac{(z-1)(0-\infty)}{(z-\infty)(0-1)} = \frac{z}{1} = z$$

Therefore:
$$\frac{2(w-i)}{(w+1)(1-i)} = z$$

Solving for $w$:
$$2(w-i) = z(w+1)(1-i)$$
$$2w - 2i = z(1-i)w + z(1-i)$$
$$w[2 - z(1-i)] = 2i + z(1-i)$$
$$w = \frac{2i + z(1-i)}{2 - z(1-i)} = \frac{z(1-i) + 2i}{2 - z(1-i)}$$

**Example 2**: Find the Möbius transformation mapping the upper half-plane to the unit disk with $i \mapsto 0$.

**Solution**: We need three point pairs. Choose:
- $i \mapsto 0$
- $0 \mapsto$ some point on $|w| = 1$
- $\infty \mapsto$ some point on $|w| = 1$

A natural choice is the transformation:
$$f(z) = \frac{z - i}{z + i}$$

Let's verify:
- $f(i) = \frac{i-i}{i+i} = 0$ ✓
- $f(0) = \frac{-i}{i} = -1$ (on unit circle) ✓
- $f(\infty) = 1$ (on unit circle) ✓
- For $\text{Im}(z) > 0$: we can verify $|f(z)| < 1$

## Circle Preservation

**Theorem**: Möbius transformations map circles to circles (where lines are considered circles through $\infty$).

**Proof sketch**: It suffices to show this for the basic transformations:
- **Translation** $z \mapsto z + b$: Obviously preserves circles and lines
- **Rotation/Scaling** $z \mapsto az$: Preserves circles (scaled/rotated) and lines through origin
- **Inversion** $z \mapsto 1/z$: This is the key case

For inversion $w = 1/z$, consider a circle $|z - z_0| = r$:
$$\left|\frac{1}{w} - z_0\right| = r$$
$$\left|\frac{1 - z_0 w}{w}\right| = r$$
$$|1 - z_0 w| = r|w|$$

Squaring and expanding:
$$(1 - z_0 w)(1 - \overline{z_0 w}) = r^2 |w|^2$$
$$1 - z_0 w - \overline{z_0 w} + |z_0|^2 |w|^2 = r^2 |w|^2$$

This can be rewritten as:
$$(|z_0|^2 - r^2)|w|^2 - (z_0 w + \overline{z_0 w}) + 1 = 0$$

If $|z_0|^2 - r^2 \neq 0$ (circle not through origin), this is again a circle equation. If $|z_0|^2 = r^2$ (circle through origin), the coefficient of $|w|^2$ vanishes, giving a line.

## Fixed Points

A **fixed point** of a Möbius transformation $f$ is a point $z_0$ such that $f(z_0) = z_0$.

To find fixed points of $f(z) = \frac{az+b}{cz+d}$, solve:
$$\frac{az+b}{cz+d} = z$$
$$az + b = z(cz + d)$$
$$cz^2 + (d-a)z - b = 0$$

This quadratic equation yields:
- **Two distinct fixed points** (elliptic or loxodromic)
- **One fixed point** (parabolic, with double root)
- **No finite fixed points** (then $\infty$ is the only fixed point)

**Classification**:
1. **Elliptic**: Two distinct fixed points, conjugate complex (represents rotation)
2. **Hyperbolic**: Two distinct real fixed points (represents dilation)
3. **Loxodromic**: Two distinct fixed points, neither elliptic nor hyperbolic
4. **Parabolic**: Exactly one fixed point (counting multiplicity)

## Applications

### Mapping Half-Plane to Disk

The transformation:
$$f(z) = \frac{z - i}{z + i}$$

maps the upper half-plane $\{z : \text{Im}(z) > 0\}$ conformally onto the unit disk $\{w : |w| < 1\}$.

This is one of the most important Möbius transformations in complex analysis, as it allows us to transfer problems from one standard domain to another.

### Automorphisms of the Disk

The Möbius transformations that map the unit disk to itself (automorphisms of the disk) have the form:
$$f(z) = e^{i\theta} \frac{z - a}{1 - \overline{a}z}$$

where $|a| < 1$ and $\theta \in \mathbb{R}$.

### Hyperbolic Geometry

In the Poincaré disk model of hyperbolic geometry, Möbius transformations preserving the unit disk correspond to isometries of the hyperbolic plane. The hyperbolic distance is preserved under these transformations, making them fundamental to non-Euclidean geometry.

## Common Mistakes

1. **Forgetting the condition $ad - bc \neq 0$**: This ensures the transformation is non-degenerate.

2. **Not extending to the Riemann sphere**: Always consider what happens at $\infty$ and at the pole $-d/c$.

3. **Miscalculating cross-ratios**: Be careful with the order of points and handling $\infty$.

4. **Assuming all Möbius transformations fix a point**: Only parabolic transformations have exactly one fixed point; most have two.

5. **Confusing circle preservation with disk preservation**: Möbius transformations map circles to circles, but the interior of one circle may map to the exterior of another.

## Summary

- $f(z) = \frac{az+b}{cz+d}$, $ad - bc \neq 0$
- Maps circles to circles (including lines as circles through $\infty$)
- Uniquely determined by three point pairs
- Forms a group under composition (isomorphic to $\text{PSL}(2, \mathbb{C})$)
- Cross-ratio is invariant under Möbius transformations
- Fundamental tool for conformal mapping between standard domains
- Classification by fixed points: elliptic, hyperbolic, loxodromic, parabolic
- Applications in complex analysis, hyperbolic geometry, physics

Möbius transformations are the automorphisms of the Riemann sphere and form the backbone of many advanced topics in complex analysis, including modular forms, Kleinian groups, and conformal field theory.
