---
id: math301-topic-5-5
title: "Triple Integrals"
order: 5
---

# Triple Integrals

## Introduction

Just as double integrals extend integration to two dimensions, triple integrals extend the concept to three-dimensional space. While double integrals can compute volumes under surfaces, triple integrals can compute mass, total charge, moments of inertia, and other physical quantities over three-dimensional solids. They also provide a way to compute volumes of three-dimensional regions directly.

## Definition of Triple Integrals

Let $f(x, y, z)$ be a function defined on a three-dimensional region $E$ in space. The **triple integral** of $f$ over $E$ is denoted:

$$\iiint_E f(x, y, z) \, dV$$

where $dV$ represents a volume element in three-dimensional space.

### Construction via Riemann Sums

The definition follows the pattern established for double integrals. For a rectangular box $B = [a, b] \times [c, d] \times [p, q]$:

1. Partition each dimension into subintervals
2. Create a three-dimensional grid of sub-boxes $B_{ijk}$
3. Choose a sample point $(x_{ijk}^*, y_{ijk}^*, z_{ijk}^*)$ in each sub-box
4. Form the Riemann sum: $\sum_{i,j,k} f(x_{ijk}^*, y_{ijk}^*, z_{ijk}^*) \Delta V_{ijk}$

The triple integral is the limit of these Riemann sums as the norm of the partition approaches zero.

## Iterated Integrals in Three Dimensions

Just as Fubini's theorem reduces double integrals to iterated single integrals, triple integrals can be evaluated as iterated integrals in three steps.

For a rectangular box $B = [a, b] \times [c, d] \times [p, q]$:

$$\iiint_B f(x, y, z) \, dV = \int_a^b \int_c^d \int_p^q f(x, y, z) \, dz \, dy \, dx$$

This can be computed in any of the $3! = 6$ possible orders of integration.

### Example 1: Rectangular Box

Evaluate $\iiint_B xyz \, dV$ where $B = [0, 1] \times [0, 2] \times [0, 3]$.

**Solution:**

$$\int_0^1 \int_0^2 \int_0^3 xyz \, dz \, dy \, dx$$

Integrate with respect to $z$ (treating $x$ and $y$ as constants):
$$\int_0^3 xyz \, dz = xy \cdot \left[\frac{z^2}{2}\right]_0^3 = \frac{9xy}{2}$$

Integrate with respect to $y$:
$$\int_0^2 \frac{9xy}{2} \, dy = \frac{9x}{2} \cdot \left[\frac{y^2}{2}\right]_0^2 = \frac{9x}{2} \cdot 2 = 9x$$

Integrate with respect to $x$:
$$\int_0^1 9x \, dx = 9 \cdot \left[\frac{x^2}{2}\right]_0^1 = \frac{9}{2}$$

### Example 2: Separable Function

If $f(x, y, z) = g(x)h(y)k(z)$, the integral factors completely:

$$\iiint_B g(x)h(y)k(z) \, dV = \left[\int_a^b g(x) \, dx\right]\left[\int_c^d h(y) \, dy\right]\left[\int_p^q k(z) \, dz\right]$$

For instance, $\iiint_B x^2 y \sin(z) \, dV$ over $[0, 1] \times [0, 2] \times [0, \pi]$:

$$\left[\int_0^1 x^2 \, dx\right]\left[\int_0^2 y \, dy\right]\left[\int_0^\pi \sin(z) \, dz\right] = \frac{1}{3} \cdot 2 \cdot 2 = \frac{4}{3}$$

## Triple Integrals over General Regions

Most applications involve non-rectangular regions. We classify these by how they can be described.

### Type 1 Regions (z-simple)

A region $E$ is **Type 1** if it lies between the graphs of two functions of $(x, y)$:

$$E = \{(x, y, z) \mid (x, y) \in D, \, u_1(x, y) \leq z \leq u_2(x, y)\}$$

where $D$ is a region in the $xy$-plane.

For Type 1 regions:

$$\iiint_E f(x, y, z) \, dV = \iint_D \left[\int_{u_1(x,y)}^{u_2(x,y)} f(x, y, z) \, dz\right] dA$$

The double integral over $D$ can then be evaluated using techniques from earlier sections.

### Example 3: Tetrahedron

Find the volume of the tetrahedron bounded by the coordinate planes and the plane $x + 2y + z = 2$.

**Solution:**

The region is bounded below by $z = 0$ and above by $z = 2 - x - 2y$.

The projection onto the $xy$-plane is the triangular region $D$ where $x + 2y \leq 2$, $x \geq 0$, $y \geq 0$.

$$\text{Volume} = \iiint_E 1 \, dV = \iint_D \int_0^{2-x-2y} 1 \, dz \, dA$$

The inner integral:
$$\int_0^{2-x-2y} 1 \, dz = 2 - x - 2y$$

Now we need to integrate over $D$. The region $D$ is bounded by $x = 0$, $y = 0$, and $x + 2y = 2$.

As a Type I region in the $xy$-plane: $0 \leq x \leq 2$, $0 \leq y \leq (2-x)/2$.

$$\int_0^2 \int_0^{(2-x)/2} (2 - x - 2y) \, dy \, dx$$

Inner integral:
$$\int_0^{(2-x)/2} (2 - x - 2y) \, dy = \left[(2-x)y - y^2\right]_0^{(2-x)/2}$$

$$= (2-x) \cdot \frac{2-x}{2} - \frac{(2-x)^2}{4} = \frac{(2-x)^2}{2} - \frac{(2-x)^2}{4} = \frac{(2-x)^2}{4}$$

Outer integral:
$$\int_0^2 \frac{(2-x)^2}{4} \, dx = \frac{1}{4}\int_0^2 (2-x)^2 \, dx = \frac{1}{4} \cdot \left[-\frac{(2-x)^3}{3}\right]_0^2$$

$$= \frac{1}{4} \cdot \frac{8}{3} = \frac{2}{3}$$

### Example 4: Region Between Paraboloids

Evaluate $\iiint_E z \, dV$ where $E$ is the region between $z = x^2 + y^2$ and $z = 4 - x^2 - y^2$.

**Solution:**

The surfaces intersect where $x^2 + y^2 = 4 - x^2 - y^2$, giving $x^2 + y^2 = 2$.

The region is Type 1: $x^2 + y^2 \leq 2$ in the $xy$-plane, with $x^2 + y^2 \leq z \leq 4 - x^2 - y^2$.

$$\iiint_E z \, dV = \iint_D \int_{x^2+y^2}^{4-x^2-y^2} z \, dz \, dA$$

Inner integral:
$$\int_{x^2+y^2}^{4-x^2-y^2} z \, dz = \left[\frac{z^2}{2}\right]_{x^2+y^2}^{4-x^2-y^2}$$

$$= \frac{(4-x^2-y^2)^2}{2} - \frac{(x^2+y^2)^2}{2}$$

This is most easily evaluated in polar coordinates. Let $r^2 = x^2 + y^2$, so the double integral becomes:

$$\int_0^{2\pi} \int_0^{\sqrt{2}} \left[\frac{(4-r^2)^2 - r^4}{2}\right] r \, dr \, d\theta$$

Expanding $(4-r^2)^2 = 16 - 8r^2 + r^4$:

$$= \int_0^{2\pi} \int_0^{\sqrt{2}} \frac{16 - 8r^2 + r^4 - r^4}{2} \cdot r \, dr \, d\theta$$

$$= \int_0^{2\pi} \int_0^{\sqrt{2}} (8r - 4r^3) \, dr \, d\theta$$

$$= \int_0^{2\pi} \left[4r^2 - r^4\right]_0^{\sqrt{2}} d\theta = \int_0^{2\pi} (8 - 4) \, d\theta = 4 \cdot 2\pi = 8\pi$$

## Other Region Types

### Type 2 Regions (y-simple)

$$E = \{(x, y, z) \mid (x, z) \in D, \, u_1(x, z) \leq y \leq u_2(x, z)\}$$

with projection onto the $xz$-plane.

### Type 3 Regions (x-simple)

$$E = \{(x, y, z) \mid (y, z) \in D, \, u_1(y, z) \leq x \leq u_2(y, z)\}$$

with projection onto the $yz$-plane.

## Order of Integration

The six possible orders for integrating over a general region are:
1. $dz \, dy \, dx$
2. $dz \, dx \, dy$
3. $dy \, dz \, dx$
4. $dy \, dx \, dz$
5. $dx \, dy \, dz$
6. $dx \, dz \, dy$

The choice depends on:
- How the region is most naturally described
- Which order produces the simplest limits of integration
- Which order leads to the easiest antiderivatives

### Example 5: Changing Order of Integration

Consider $\int_0^1 \int_0^x \int_0^y f(x, y, z) \, dz \, dy \, dx$.

The region is: $0 \leq x \leq 1$, $0 \leq y \leq x$, $0 \leq z \leq y$.

This is the region where $0 \leq z \leq y \leq x \leq 1$.

To integrate in order $dx \, dy \, dz$, we need:
- $z$ ranges from $0$ to $1$
- For fixed $z$, $y$ ranges from $z$ to $1$
- For fixed $z$ and $y$, $x$ ranges from $y$ to $1$

Thus: $\int_0^1 \int_z^1 \int_y^1 f(x, y, z) \, dx \, dy \, dz$.

## Applications

### Volume

The volume of a region $E$ is:
$$\text{Volume}(E) = \iiint_E 1 \, dV$$

### Mass

If $\rho(x, y, z)$ is the density at point $(x, y, z)$, the total mass is:
$$m = \iiint_E \rho(x, y, z) \, dV$$

### Average Value

The average value of $f$ over $E$ is:
$$f_{\text{avg}} = \frac{1}{\text{Volume}(E)} \iiint_E f(x, y, z) \, dV$$

## Conclusion

Triple integrals extend integration to three dimensions, allowing us to compute volumes, masses, and other physical quantities over three-dimensional regions. The key to evaluating triple integrals is choosing an appropriate coordinate system and order of integration based on the geometry of the region. In the next section, we explore cylindrical and spherical coordinates, which provide natural alternatives to Cartesian coordinates for regions with cylindrical or spherical symmetry.
