---
id: math301-topic-6-1
title: "Line Integrals of Scalar Functions"
order: 1
---

# Line Integrals of Scalar Fields

## Introduction

While single integrals integrate over intervals and double/triple integrals integrate over regions in the plane or space, **line integrals** integrate along curves. Line integrals are fundamental in physics and engineering, allowing us to compute work done by forces, mass of wire with variable density, circulation of fluids, and many other quantities where integration occurs along a path rather than over a region.

## Curves in Space

Before defining line integrals, we need to describe curves mathematically.

### Parametric Curves

A **parametric curve** $C$ in space is given by a vector function:

$$\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle, \quad a \leq t \leq b$$

or in component form:
$$x = x(t), \quad y = y(t), \quad z = z(t)$$

The parameter $t$ often represents time, but it can be any convenient parameter.

**Examples:**
- A line segment from $(0, 0, 0)$ to $(1, 2, 3)$: $\mathbf{r}(t) = \langle t, 2t, 3t \rangle$, $0 \leq t \leq 1$
- A circle of radius $R$ in the $xy$-plane: $\mathbf{r}(t) = \langle R\cos t, R\sin t, 0 \rangle$, $0 \leq t \leq 2\pi$
- A helix: $\mathbf{r}(t) = \langle \cos t, \sin t, t \rangle$, $0 \leq t \leq 4\pi$

### Smooth Curves

A curve is **smooth** if $\mathbf{r}'(t)$ is continuous and $\mathbf{r}'(t) \neq \mathbf{0}$ for all $t$ in $[a, b]$. The condition $\mathbf{r}'(t) \neq \mathbf{0}$ ensures the curve has no cusps or sharp corners.

A curve is **piecewise smooth** if it consists of a finite number of smooth pieces joined end-to-end.

## Arc Length

The **arc length** of a smooth curve $C$ given by $\mathbf{r}(t)$, $a \leq t \leq b$, is:

$$L = \int_a^b |\mathbf{r}'(t)| \, dt = \int_a^b \sqrt{(x'(t))^2 + (y'(t))^2 + (z'(t))^2} \, dt$$

The quantity $ds = |\mathbf{r}'(t)| \, dt$ is called the **arc length element** or **differential arc length**.

### Example 1: Arc Length of a Helix

Find the length of one complete turn of the helix $\mathbf{r}(t) = \langle 2\cos t, 2\sin t, 3t \rangle$, $0 \leq t \leq 2\pi$.

**Solution:**

$$\mathbf{r}'(t) = \langle -2\sin t, 2\cos t, 3 \rangle$$

$$|\mathbf{r}'(t)| = \sqrt{4\sin^2 t + 4\cos^2 t + 9} = \sqrt{4 + 9} = \sqrt{13}$$

$$L = \int_0^{2\pi} \sqrt{13} \, dt = 2\pi\sqrt{13}$$

## Line Integrals of Scalar Functions

Let $f(x, y, z)$ be a scalar function (a scalar field) defined on a curve $C$ given by $\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle$, $a \leq t \leq b$.

### Definition

The **line integral** of $f$ along $C$ with respect to arc length is:

$$\int_C f(x, y, z) \, ds = \int_a^b f(x(t), y(t), z(t)) |\mathbf{r}'(t)| \, dt$$

This can also be written as:

$$\int_C f \, ds = \int_a^b f(\mathbf{r}(t)) \|\mathbf{r}'(t)\| \, dt$$

### Geometric Interpretation

If $f(x, y, z) \geq 0$, the line integral $\int_C f \, ds$ represents the area of the "curtain" or "fence" standing on the curve $C$ with height $f(x, y, z)$ at each point. More precisely, if $C$ is a curve in the $xy$-plane, this is the area of the surface between $C$ and the surface $z = f(x, y)$.

### Physical Interpretation: Mass of a Wire

If $C$ represents a thin wire and $\rho(x, y, z)$ is the linear density (mass per unit length) at each point, then the total mass is:

$$m = \int_C \rho(x, y, z) \, ds$$

## Properties of Line Integrals

1. **Linearity**: $\int_C (af + bg) \, ds = a\int_C f \, ds + b\int_C g \, ds$

2. **Additivity**: If $C = C_1 \cup C_2$ (curve $C$ is the union of two curves):
   $$\int_C f \, ds = \int_{C_1} f \, ds + \int_{C_2} f \, ds$$

3. **Independence of parametrization**: The line integral is independent of how we parametrize the curve (though orientation matters for vector line integrals).

4. **Reversal of orientation**: For scalar line integrals, $\int_{-C} f \, ds = \int_C f \, ds$ (reversing the direction doesn't change the value).

## Examples

### Example 2: Line Integral over a Line Segment

Evaluate $\int_C y \, ds$ where $C$ is the line segment from $(0, 0)$ to $(4, 3)$.

**Solution:**

Parametrize the line segment: $\mathbf{r}(t) = \langle 4t, 3t \rangle$, $0 \leq t \leq 1$.

$$\mathbf{r}'(t) = \langle 4, 3 \rangle, \quad |\mathbf{r}'(t)| = \sqrt{16 + 9} = 5$$

Along the curve, $y = 3t$, so:

$$\int_C y \, ds = \int_0^1 3t \cdot 5 \, dt = 15 \int_0^1 t \, dt = 15 \cdot \frac{1}{2} = \frac{15}{2}$$

### Example 3: Line Integral over a Circle

Evaluate $\int_C (x^2 + y^2) \, ds$ where $C$ is the circle $x^2 + y^2 = 4$ in the $xy$-plane.

**Solution:**

Parametrize the circle: $\mathbf{r}(t) = \langle 2\cos t, 2\sin t \rangle$, $0 \leq t \leq 2\pi$.

$$\mathbf{r}'(t) = \langle -2\sin t, 2\cos t \rangle, \quad |\mathbf{r}'(t)| = \sqrt{4\sin^2 t + 4\cos^2 t} = 2$$

On the circle, $x^2 + y^2 = 4$, so:

$$\int_C (x^2 + y^2) \, ds = \int_0^{2\pi} 4 \cdot 2 \, dt = 8 \int_0^{2\pi} dt = 16\pi$$

### Example 4: Mass of a Wire with Variable Density

A wire has the shape of the curve $y = x^2$ from $(0, 0)$ to $(1, 1)$ with density $\rho(x, y) = 1 + xy$. Find its mass.

**Solution:**

Parametrize using $x$ as the parameter: $x = t$, $y = t^2$, $0 \leq t \leq 1$.

$$\mathbf{r}(t) = \langle t, t^2 \rangle, \quad \mathbf{r}'(t) = \langle 1, 2t \rangle, \quad |\mathbf{r}'(t)| = \sqrt{1 + 4t^2}$$

The density along the curve: $\rho(t, t^2) = 1 + t \cdot t^2 = 1 + t^3$.

$$m = \int_C (1 + xy) \, ds = \int_0^1 (1 + t^3) \sqrt{1 + 4t^2} \, dt$$

This integral requires substitution or numerical methods. Using $u = 1 + 4t^2$, $du = 8t \, dt$:

The integral $(1 + t^3)\sqrt{1 + 4t^2}$ doesn't have a simple closed form, but we can approximate or use a CAS to get:

$$m \approx 1.568$$

(In practice, such integrals are often evaluated numerically.)

### Example 5: Line Integral in Three Dimensions

Evaluate $\int_C xyz \, ds$ where $C$ is the curve $\mathbf{r}(t) = \langle t, t^2, t^3 \rangle$, $0 \leq t \leq 1$.

**Solution:**

$$\mathbf{r}'(t) = \langle 1, 2t, 3t^2 \rangle, \quad |\mathbf{r}'(t)| = \sqrt{1 + 4t^2 + 9t^4}$$

Along the curve: $x = t$, $y = t^2$, $z = t^3$, so $xyz = t \cdot t^2 \cdot t^3 = t^6$.

$$\int_C xyz \, ds = \int_0^1 t^6 \sqrt{1 + 4t^2 + 9t^4} \, dt$$

This is another integral that typically requires numerical evaluation. The key point is the setup: identify the parametrization, compute $|\mathbf{r}'(t)|$, and substitute.

## Line Integrals with Respect to Coordinates

In addition to line integrals with respect to arc length, we can define line integrals with respect to individual coordinates.

### Definitions

$$\int_C f(x, y, z) \, dx = \int_a^b f(x(t), y(t), z(t)) x'(t) \, dt$$

$$\int_C f(x, y, z) \, dy = \int_a^b f(x(t), y(t), z(t)) y'(t) \, dt$$

$$\int_C f(x, y, z) \, dz = \int_a^b f(x(t), y(t), z(t)) z'(t) \, dt$$

These are **signed** integrals—reversing the orientation of $C$ changes the sign.

### Combined Form

Often we encounter combinations:

$$\int_C P \, dx + Q \, dy + R \, dz$$

where $P$, $Q$, $R$ are functions of $(x, y, z)$. This will be central to vector line integrals in the next section.

### Example 6: Line Integral with Respect to $x$

Evaluate $\int_C y \, dx$ where $C$ is the parabola $y = x^2$ from $(0, 0)$ to $(2, 4)$.

**Solution:**

Parametrize: $x = t$, $y = t^2$, $0 \leq t \leq 2$.

Then $dx = dt$ and $y = t^2$.

$$\int_C y \, dx = \int_0^2 t^2 \cdot 1 \, dt = \left[\frac{t^3}{3}\right]_0^2 = \frac{8}{3}$$

If we reverse the curve (from $(2, 4)$ to $(0, 0)$), we get $-8/3$.

## Applications

### Average Value

The average value of $f$ along a curve $C$ of length $L$ is:

$$f_{\text{avg}} = \frac{1}{L} \int_C f \, ds$$

### Center of Mass

For a wire with shape $C$ and density $\rho(x, y, z)$, the center of mass is $(\bar{x}, \bar{y}, \bar{z})$ where:

$$\bar{x} = \frac{1}{m} \int_C x\rho \, ds, \quad \bar{y} = \frac{1}{m} \int_C y\rho \, ds, \quad \bar{z} = \frac{1}{m} \int_C z\rho \, ds$$

and $m = \int_C \rho \, ds$ is the total mass.

## Conclusion

Line integrals of scalar fields extend the concept of integration to curves in space. The key formula $\int_C f \, ds = \int_a^b f(\mathbf{r}(t)) |\mathbf{r}'(t)| \, dt$ reduces the line integral to a standard single-variable integral. These integrals have important physical interpretations, particularly in computing mass and other quantities distributed along curves. In the next section, we extend line integrals to vector fields, which will lead to the concept of work and circulation.
