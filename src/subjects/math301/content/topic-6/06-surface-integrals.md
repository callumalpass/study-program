---
id: math301-topic-6-6
title: "Surface Integrals"
order: 6
---

# Surface Integrals of Scalar Fields

## Introduction

Surface integrals extend the concept of integration to two-dimensional surfaces in three-dimensional space. Just as line integrals allow us to integrate along curves, surface integrals allow us to integrate over surfaces. These integrals are fundamental in physics and engineering, appearing in calculations of mass, charge distribution, heat flow, and fluid flux through surfaces.

## Definition of Surface Integrals

Let $f(x, y, z)$ be a scalar function defined on a surface $S$. The **surface integral** of $f$ over $S$ is:

$$\iint_S f(x, y, z) \, dS$$

where $dS$ is the surface area element.

### Evaluation Using Parametrization

If $S$ is parametrized by $\mathbf{r}(u, v) = \langle x(u, v), y(u, v), z(u, v) \rangle$ for $(u, v) \in D$:

$$\iint_S f(x, y, z) \, dS = \iint_D f(\mathbf{r}(u, v)) |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$$

The magnitude $|\mathbf{r}_u \times \mathbf{r}_v|$ is the surface area element in the parameter space.

### For Graphs of Functions

If $S$ is the graph of $z = g(x, y)$ over a region $D$ in the $xy$-plane:

$$\iint_S f(x, y, z) \, dS = \iint_D f(x, y, g(x, y)) \sqrt{1 + \left(\frac{\partial g}{\partial x}\right)^2 + \left(\frac{\partial g}{\partial y}\right)^2} \, dA$$

This is the most common form for surfaces that are graphs of functions.

## Geometric Interpretation

When $f(x, y, z) = 1$, the surface integral gives the **surface area**:

$$\text{Area}(S) = \iint_S 1 \, dS$$

When $f(x, y, z) \geq 0$, the integral represents a generalized "volume" where $f$ acts as a density or weight function over the surface.

## Physical Interpretation: Mass of a Surface

If $S$ represents a thin shell with surface density (mass per unit area) $\rho(x, y, z)$, the total mass is:

$$m = \iint_S \rho(x, y, z) \, dS$$

## Examples

### Example 1: Surface Integral over a Plane

Evaluate $\iint_S y \, dS$ where $S$ is the part of the plane $z = 1 + x + y$ over the square $0 \leq x \leq 1$, $0 \leq y \leq 1$.

**Solution:**

The surface is $z = g(x, y) = 1 + x + y$.

$$g_x = 1, \quad g_y = 1$$

$$\sqrt{1 + g_x^2 + g_y^2} = \sqrt{1 + 1 + 1} = \sqrt{3}$$

$$\iint_S y \, dS = \int_0^1 \int_0^1 y \cdot \sqrt{3} \, dx \, dy = \sqrt{3} \int_0^1 y \, dy \int_0^1 dx$$

$$= \sqrt{3} \cdot \frac{1}{2} \cdot 1 = \frac{\sqrt{3}}{2}$$

### Example 2: Surface Integral over a Cylinder

Evaluate $\iint_S z \, dS$ where $S$ is the lateral surface of the cylinder $x^2 + y^2 = 4$, $0 \leq z \leq 3$.

**Solution:**

Parametrize: $\mathbf{r}(u, v) = \langle 2\cos u, 2\sin u, v \rangle$, $0 \leq u \leq 2\pi$, $0 \leq v \leq 3$.

$$\mathbf{r}_u = \langle -2\sin u, 2\cos u, 0 \rangle, \quad \mathbf{r}_v = \langle 0, 0, 1 \rangle$$

$$\mathbf{r}_u \times \mathbf{r}_v = \langle 2\cos u, 2\sin u, 0 \rangle$$

$$|\mathbf{r}_u \times \mathbf{r}_v| = 2$$

On the surface, $z = v$, so:

$$\iint_S z \, dS = \int_0^{2\pi} \int_0^3 v \cdot 2 \, dv \, du = 2 \int_0^{2\pi} \left[\frac{v^2}{2}\right]_0^3 du$$

$$= 2 \int_0^{2\pi} \frac{9}{2} \, du = 9 \int_0^{2\pi} du = 18\pi$$

### Example 3: Surface Integral over a Sphere

Evaluate $\iint_S (x^2 + y^2 + z^2) \, dS$ where $S$ is the sphere $x^2 + y^2 + z^2 = R^2$.

**Solution:**

Parametrize using spherical coordinates:
$$\mathbf{r}(\phi, \theta) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$$

where $0 \leq \phi \leq \pi$, $0 \leq \theta \leq 2\pi$.

From earlier work: $|\mathbf{r}_\phi \times \mathbf{r}_\theta| = R^2\sin\phi$.

On the sphere, $x^2 + y^2 + z^2 = R^2$, so:

$$\iint_S (x^2 + y^2 + z^2) \, dS = \int_0^{2\pi} \int_0^\pi R^2 \cdot R^2\sin\phi \, d\phi \, d\theta$$

$$= R^4 \int_0^{2\pi} \int_0^\pi \sin\phi \, d\phi \, d\theta = R^4 \int_0^{2\pi} 2 \, d\theta = 4\pi R^4$$

### Example 4: Mass of a Conical Surface

A conical surface $S$ is defined by $z = \sqrt{x^2 + y^2}$ for $0 \leq z \leq h$. If the surface density is $\rho(x, y, z) = z$, find the total mass.

**Solution:**

Using cylindrical coordinates: $x = r\cos\theta$, $y = r\sin\theta$, $z = r$ (since $z = \sqrt{x^2+y^2}$).

Parametrize: $\mathbf{r}(r, \theta) = \langle r\cos\theta, r\sin\theta, r \rangle$, $0 \leq r \leq h$, $0 \leq \theta \leq 2\pi$.

$$\mathbf{r}_r = \langle \cos\theta, \sin\theta, 1 \rangle, \quad \mathbf{r}_\theta = \langle -r\sin\theta, r\cos\theta, 0 \rangle$$

$$\mathbf{r}_r \times \mathbf{r}_\theta = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \cos\theta & \sin\theta & 1 \\ -r\sin\theta & r\cos\theta & 0 \end{vmatrix}$$

$$= \langle -r\cos\theta, -r\sin\theta, r \rangle$$

$$|\mathbf{r}_r \times \mathbf{r}_\theta| = \sqrt{r^2\cos^2\theta + r^2\sin^2\theta + r^2} = r\sqrt{2}$$

On the surface, $\rho = z = r$, so:

$$m = \int_0^{2\pi} \int_0^h r \cdot r\sqrt{2} \, dr \, d\theta = \sqrt{2} \int_0^{2\pi} \int_0^h r^2 \, dr \, d\theta$$

$$= \sqrt{2} \int_0^{2\pi} \frac{h^3}{3} \, d\theta = \frac{2\pi h^3\sqrt{2}}{3}$$

## Surface Integrals and Symmetry

Symmetry can greatly simplify surface integrals.

### Example 5: Integral of an Odd Function

Evaluate $\iint_S x \, dS$ where $S$ is the sphere $x^2 + y^2 + z^2 = R^2$.

**Solution:**

The integrand $f(x, y, z) = x$ is an **odd function** with respect to $x$: changing $x$ to $-x$ changes the sign of $f$.

The sphere is **symmetric** with respect to reflection across the $yz$-plane (the plane $x = 0$).

For every point $(x, y, z)$ on $S$ with $x > 0$, there's a corresponding point $(-x, y, z)$ with $x < 0$, and these contribute equal and opposite amounts to the integral.

Therefore: $\iint_S x \, dS = 0$.

Similarly, $\iint_S y \, dS = 0$ and $\iint_S z \, dS = 0$ by symmetry.

## Average Value on a Surface

The average value of $f$ over a surface $S$ is:

$$f_{\text{avg}} = \frac{1}{\text{Area}(S)} \iint_S f(x, y, z) \, dS$$

### Example 6: Average Distance from the Origin

Find the average distance from points on the sphere $x^2 + y^2 + z^2 = R^2$ to the origin.

**Solution:**

The distance from any point on the sphere to the origin is $\sqrt{x^2 + y^2 + z^2} = R$ (constant).

Therefore, the average distance is simply $R$.

Alternatively, using the formula:

$$d_{\text{avg}} = \frac{1}{4\pi R^2} \iint_S R \, dS = \frac{R}{4\pi R^2} \cdot 4\pi R^2 = R$$

## Applications

### Center of Mass

For a surface $S$ with density $\rho(x, y, z)$, the center of mass is $(\bar{x}, \bar{y}, \bar{z})$ where:

$$\bar{x} = \frac{1}{m} \iint_S x\rho \, dS, \quad \bar{y} = \frac{1}{m} \iint_S y\rho \, dS, \quad \bar{z} = \frac{1}{m} \iint_S z\rho \, dS$$

and $m = \iint_S \rho \, dS$ is the total mass.

### Moments of Inertia

The moment of inertia about the $z$-axis for a surface with density $\rho$ is:

$$I_z = \iint_S (x^2 + y^2)\rho(x, y, z) \, dS$$

## Piecewise Smooth Surfaces

For a surface $S$ composed of several smooth pieces $S_1, S_2, \ldots, S_n$:

$$\iint_S f \, dS = \iint_{S_1} f \, dS + \iint_{S_2} f \, dS + \cdots + \iint_{S_n} f \, dS$$

### Example 7: Cube

Find $\iint_S z \, dS$ where $S$ is the surface of the cube $0 \leq x \leq 1$, $0 \leq y \leq 1$, $0 \leq z \leq 1$.

**Solution:**

The cube has six faces. By symmetry considerations:
- **Top face** ($z = 1$): $\iint z \, dS = \iint 1 \, dS = 1 \cdot \text{Area} = 1$
- **Bottom face** ($z = 0$): $\iint z \, dS = 0$
- **Four side faces**: On these faces, $z$ varies from $0$ to $1$

For each side face (e.g., $x = 0$, $0 \leq y \leq 1$, $0 \leq z \leq 1$):

$$\iint z \, dS = \int_0^1 \int_0^1 z \, dz \, dy = \int_0^1 \frac{1}{2} \, dy = \frac{1}{2}$$

Four side faces contribute: $4 \times \frac{1}{2} = 2$.

Total: $\iint_S z \, dS = 0 + 1 + 2 = 3$.

## Properties of Surface Integrals

1. **Linearity**: $\iint_S (af + bg) \, dS = a\iint_S f \, dS + b\iint_S g \, dS$

2. **Additivity**: If $S = S_1 \cup S_2$:
   $$\iint_S f \, dS = \iint_{S_1} f \, dS + \iint_{S_2} f \, dS$$

3. **Independence of parametrization**: The value of the integral doesn't depend on the choice of parametrization (though orientation will matter for vector surface integrals).

## Conclusion

Surface integrals of scalar fields extend integration to two-dimensional surfaces in three-dimensional space. The key formula $\iint_S f \, dS = \iint_D f(\mathbf{r}(u,v)) |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$ allows us to evaluate these integrals using parametric representations. These integrals have important physical interpretations, including mass, charge, and other quantities distributed over surfaces. In the next section, we extend surface integrals to vector fields, introducing the concept of flux through a surface.
