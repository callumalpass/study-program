---
id: math301-topic-6-7
title: "Flux Integrals"
order: 7
---

# Flux Integrals

## Introduction

While surface integrals of scalar fields compute quantities like mass distributed over a surface, **flux integrals** (surface integrals of vector fields) measure the flow of a vector field through a surface. Flux is fundamental in physics, describing fluid flow through membranes, electric field through surfaces, heat flow, and many other phenomena. The concept of flux through a surface is central to the major theorems of vector calculus, including the Divergence Theorem.

## The Concept of Flux

Imagine a vector field $\mathbf{F}$ representing fluid velocity. The **flux** of $\mathbf{F}$ through an oriented surface $S$ measures the volume of fluid passing through $S$ per unit time.

More generally, flux measures "how much of the vector field passes through the surface."

### Orientation of Surfaces

For flux to be well-defined, we need an **oriented surface**: a choice of which side is "positive" and which is "negative."

For a surface $S$ parametrized by $\mathbf{r}(u, v)$, the normal vector $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$ determines an orientation. The **unit normal vector** is:

$$\mathbf{N} = \frac{\mathbf{r}_u \times \mathbf{r}_v}{|\mathbf{r}_u \times \mathbf{r}_v|}$$

Reversing the order of parameters (swapping $u$ and $v$) reverses the orientation.

For **closed surfaces** (like a sphere or cube), we typically choose the **outward normal** (pointing away from the enclosed region).

## Definition of Flux Integral

Let $\mathbf{F}$ be a continuous vector field and $S$ an oriented surface with unit normal $\mathbf{N}$. The **flux** of $\mathbf{F}$ through $S$ is:

$$\iint_S \mathbf{F} \cdot \mathbf{N} \, dS = \iint_S \mathbf{F} \cdot d\mathbf{S}$$

where $d\mathbf{S} = \mathbf{N} \, dS$ is the **vector surface element**.

### Evaluation Using Parametrization

If $S$ is parametrized by $\mathbf{r}(u, v)$ for $(u, v) \in D$:

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(u, v)) \cdot (\mathbf{r}_u \times \mathbf{r}_v) \, du \, dv$$

Note that we use $\mathbf{r}_u \times \mathbf{r}_v$ (not its magnitude), which incorporates both the magnitude $dS$ and the direction $\mathbf{N}$.

### For Graphs of Functions

If $S$ is the graph of $z = g(x, y)$ over a region $D$ in the $xy$-plane, oriented upward:

$$\mathbf{r}(x, y) = \langle x, y, g(x, y) \rangle$$

$$\mathbf{r}_x \times \mathbf{r}_y = \langle -g_x, -g_y, 1 \rangle$$

For $\mathbf{F} = \langle P, Q, R \rangle$:

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F} \cdot \langle -g_x, -g_y, 1 \rangle \, dA$$

$$= \iint_D (-Pg_x - Qg_y + R) \, dA$$

## Physical Interpretation

### Fluid Flow

If $\mathbf{F}$ represents the velocity field of a fluid (with units m/s) and the fluid has density 1, then:

$$\text{Flux} = \iint_S \mathbf{F} \cdot d\mathbf{S}$$

measures the **volume of fluid per unit time** flowing through $S$ in the positive normal direction.

- **Positive flux**: Net flow in the direction of $\mathbf{N}$ (through the surface)
- **Negative flux**: Net flow opposite to $\mathbf{N}$ (back through the surface)
- **Zero flux**: Equal flow in both directions, or flow tangent to the surface

### Electric Flux

In electromagnetism, if $\mathbf{E}$ is the electric field, then:

$$\Phi_E = \iint_S \mathbf{E} \cdot d\mathbf{S}$$

is the **electric flux** through $S$, which is related to the enclosed charge by Gauss's law.

## Examples

### Example 1: Flux Through a Plane

Find the flux of $\mathbf{F}(x, y, z) = \langle 0, 0, z \rangle$ through the square $S$ in the plane $z = 1$ with $0 \leq x \leq 1$, $0 \leq y \leq 1$, oriented upward.

**Solution:**

Parametrize: $\mathbf{r}(x, y) = \langle x, y, 1 \rangle$, $0 \leq x \leq 1$, $0 \leq y \leq 1$.

$$\mathbf{r}_x = \langle 1, 0, 0 \rangle, \quad \mathbf{r}_y = \langle 0, 1, 0 \rangle$$

$$\mathbf{r}_x \times \mathbf{r}_y = \langle 0, 0, 1 \rangle$$ (upward normal)

On the surface, $\mathbf{F} = \langle 0, 0, 1 \rangle$.

$$\text{Flux} = \iint_S \mathbf{F} \cdot d\mathbf{S} = \int_0^1 \int_0^1 \langle 0, 0, 1 \rangle \cdot \langle 0, 0, 1 \rangle \, dx \, dy$$

$$= \int_0^1 \int_0^1 1 \, dx \, dy = 1$$

### Example 2: Flux Through a Cylinder

Find the flux of $\mathbf{F}(x, y, z) = \langle x, y, 0 \rangle$ outward through the lateral surface of the cylinder $x^2 + y^2 = R^2$, $0 \leq z \leq h$.

**Solution:**

Parametrize: $\mathbf{r}(u, v) = \langle R\cos u, R\sin u, v \rangle$, $0 \leq u \leq 2\pi$, $0 \leq v \leq h$.

$$\mathbf{r}_u = \langle -R\sin u, R\cos u, 0 \rangle, \quad \mathbf{r}_v = \langle 0, 0, 1 \rangle$$

$$\mathbf{r}_u \times \mathbf{r}_v = \langle R\cos u, R\sin u, 0 \rangle$$ (outward normal)

On the surface:
$$\mathbf{F} = \langle R\cos u, R\sin u, 0 \rangle$$

$$\mathbf{F} \cdot (\mathbf{r}_u \times \mathbf{r}_v) = R^2\cos^2 u + R^2\sin^2 u = R^2$$

$$\text{Flux} = \int_0^{2\pi} \int_0^h R^2 \, dv \, du = R^2 \cdot h \cdot 2\pi = 2\pi R^2h$$

This makes physical sense: the radial field $\langle x, y, 0 \rangle$ points outward everywhere on the cylinder.

### Example 3: Flux Through a Sphere

Find the flux of $\mathbf{F}(x, y, z) = \langle x, y, z \rangle$ outward through the sphere $x^2 + y^2 + z^2 = R^2$.

**Solution:**

Parametrize using spherical coordinates:
$$\mathbf{r}(\phi, \theta) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$$

where $0 \leq \phi \leq \pi$, $0 \leq \theta \leq 2\pi$.

From earlier: $\mathbf{r}_\phi \times \mathbf{r}_\theta = R^2\sin\phi \langle \sin\phi\cos\theta, \sin\phi\sin\theta, \cos\phi \rangle$ (outward).

On the sphere: $\mathbf{F} = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle = R\mathbf{r}/R = \mathbf{r}$ (for unit sphere).

$$\mathbf{F} \cdot (\mathbf{r}_\phi \times \mathbf{r}_\theta) = R^2\sin\phi (\sin^2\phi\cos^2\theta + \sin^2\phi\sin^2\theta + \cos^2\phi)$$

$$= R^2\sin\phi (\sin^2\phi + \cos^2\phi) = R^2\sin\phi$$

Wait, let me recalculate. On the sphere, $\mathbf{F} = \mathbf{r} = R\langle \sin\phi\cos\theta, \sin\phi\sin\theta, \cos\phi \rangle$.

$$\mathbf{F} \cdot (\mathbf{r}_\phi \times \mathbf{r}_\theta) = R \cdot R^2\sin\phi = R^3\sin\phi$$

$$\text{Flux} = \int_0^{2\pi} \int_0^\pi R^3\sin\phi \, d\phi \, d\theta = R^3 \int_0^{2\pi} 2 \, d\theta = 4\pi R^3$$

This equals the volume of the sphere! This is a special case of the Divergence Theorem, which we'll study later.

### Example 4: Flux of a Uniform Field

Find the flux of the constant field $\mathbf{F} = \langle 0, 0, 1 \rangle$ through any closed surface $S$.

**Solution:**

For a closed surface, imagine a rectangular box. The upward flux through the top equals the downward flux through the bottom (with opposite signs), and the flux through the four vertical sides is zero (field is perpendicular to the normal).

For any closed surface, by similar reasoning or by the Divergence Theorem (since $\nabla \cdot \mathbf{F} = 0$):

$$\oint_S \mathbf{F} \cdot d\mathbf{S} = 0$$

### Example 5: Flux Through a Paraboloid

Find the flux of $\mathbf{F} = \langle 0, 0, z^2 \rangle$ upward through the paraboloid $z = x^2 + y^2$ for $0 \leq z \leq 4$.

**Solution:**

The surface is $z = g(x, y) = x^2 + y^2$ over the disk $x^2 + y^2 \leq 4$.

$$g_x = 2x, \quad g_y = 2y$$

$$\mathbf{r}_x \times \mathbf{r}_y = \langle -2x, -2y, 1 \rangle$$

On the surface, $\mathbf{F} = \langle 0, 0, (x^2 + y^2)^2 \rangle$.

$$\mathbf{F} \cdot (\mathbf{r}_x \times \mathbf{r}_y) = (x^2 + y^2)^2 \cdot 1 = (x^2 + y^2)^2$$

Using polar coordinates:

$$\text{Flux} = \int_0^{2\pi} \int_0^2 r^4 \cdot r \, dr \, d\theta = \int_0^{2\pi} \left[\frac{r^6}{6}\right]_0^2 d\theta$$

$$= \int_0^{2\pi} \frac{64}{6} \, d\theta = \frac{64\pi}{3}$$

## Flux Across Closed Surfaces

For a **closed surface** $S$ (like a sphere, cube, or torus), we use the notation:

$$\oint_S \mathbf{F} \cdot d\mathbf{S}$$

to emphasize that the surface is closed. By convention, the normal is chosen to point **outward** from the enclosed region.

### Example 6: Flux Out of a Cube

Find the flux of $\mathbf{F} = \langle x, y, z \rangle$ outward through the surface of the cube $0 \leq x \leq 1$, $0 \leq y \leq 1$, $0 \leq z \leq 1$.

**Solution:**

The cube has six faces. We compute the flux through each:

**Front face** ($x = 1$): Normal is $\langle 1, 0, 0 \rangle$, $\mathbf{F} = \langle 1, y, z \rangle$, flux = $\int_0^1 \int_0^1 1 \, dy \, dz = 1$.

**Back face** ($x = 0$): Normal is $\langle -1, 0, 0 \rangle$, $\mathbf{F} = \langle 0, y, z \rangle$, flux = $\int_0^1 \int_0^1 0 \, dy \, dz = 0$.

**Right face** ($y = 1$): Normal is $\langle 0, 1, 0 \rangle$, $\mathbf{F} = \langle x, 1, z \rangle$, flux = $\int_0^1 \int_0^1 1 \, dx \, dz = 1$.

**Left face** ($y = 0$): Flux = $0$.

**Top face** ($z = 1$): Flux = $1$.

**Bottom face** ($z = 0$): Flux = $0$.

Total flux: $1 + 0 + 1 + 0 + 1 + 0 = 3$.

(This can also be computed using the Divergence Theorem: $\nabla \cdot \mathbf{F} = 1 + 1 + 1 = 3$, and the volume is $1$, so flux = $3 \times 1 = 3$.)

## Sign of Flux

The sign of the flux depends on the orientation:
- **Positive flux**: $\mathbf{F}$ and $\mathbf{N}$ point in generally the same direction
- **Negative flux**: $\mathbf{F}$ and $\mathbf{N}$ point in generally opposite directions
- **Zero flux**: $\mathbf{F}$ is tangent to the surface, or equal flow in both directions

## Applications

### Gauss's Law (Electromagnetism)

The electric flux through a closed surface equals the enclosed charge divided by $\epsilon_0$:

$$\oint_S \mathbf{E} \cdot d\mathbf{S} = \frac{Q_{\text{enc}}}{\epsilon_0}$$

### Heat Flow

If $\mathbf{F}$ represents heat flux (energy per unit area per unit time), then $\iint_S \mathbf{F} \cdot d\mathbf{S}$ is the total heat flowing through $S$.

### Incompressible Fluid Flow

For an incompressible fluid, the flux out of any closed surface equals zero (what flows in must flow out):

$$\oint_S \mathbf{v} \cdot d\mathbf{S} = 0$$

This is related to $\nabla \cdot \mathbf{v} = 0$ (divergence-free flow).

## Conclusion

Flux integrals measure the flow of a vector field through an oriented surface. The key formula $\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_D \mathbf{F}(\mathbf{r}(u,v)) \cdot (\mathbf{r}_u \times \mathbf{r}_v) \, du \, dv$ allows computation using parametric representations. Flux is central to physics, appearing in laws governing electromagnetism, fluid dynamics, and heat transfer. In the next topic, we explore the major theorems of vector calculus—Green's Theorem, Stokes' Theorem, and the Divergence Theorem—which relate these surface integrals to other types of integrals and derivatives, providing deep connections between different areas of calculus.
