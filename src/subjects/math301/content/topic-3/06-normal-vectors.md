# Normal Vectors to Surfaces

## Introduction

Normal vectors are fundamental in the geometry of surfaces, providing directional information perpendicular to the surface at each point. They arise naturally from the gradient of level surface equations and are essential for defining tangent planes, computing surface area, analyzing reflections, and solving physics problems involving fluxes and boundary conditions. Normal vectors connect analytic descriptions of surfaces with their geometric properties.

## Normal Vectors from Gradients

### Level Surface

For a surface defined implicitly by $F(x, y, z) = 0$, the gradient:

$$\mathbf{n} = \nabla F = \langle F_x, F_y, F_z \rangle$$

is a **normal vector** to the surface at each point.

### Why the Gradient is Normal

Any curve $\mathbf{r}(t)$ lying on the surface satisfies $F(\mathbf{r}(t)) = 0$ for all $t$. Differentiating:

$$\frac{d}{dt}[F(\mathbf{r}(t))] = \nabla F \cdot \mathbf{r}'(t) = 0$$

Since $\mathbf{r}'(t)$ is tangent to the surface and $\nabla F \cdot \mathbf{r}'(t) = 0$, the gradient $\nabla F$ is perpendicular to all tangent vectors, hence normal to the surface.

### Example 1: Sphere

For the sphere $x^2 + y^2 + z^2 = 25$, let $F(x, y, z) = x^2 + y^2 + z^2 - 25$.

$$\nabla F = \langle 2x, 2y, 2z \rangle$$

At point $(3, 0, 4)$:

$$\mathbf{n} = \langle 6, 0, 8 \rangle$$

or simplified: $\langle 3, 0, 4 \rangle$

This points radially outward from the origin.

### Example 2: Ellipsoid

For $\frac{x^2}{4} + \frac{y^2}{9} + z^2 = 1$:

$$F(x, y, z) = \frac{x^2}{4} + \frac{y^2}{9} + z^2 - 1$$

$$\nabla F = \left\langle \frac{x}{2}, \frac{2y}{9}, 2z \right\rangle$$

At $(2, 0, 0)$:

$$\mathbf{n} = \langle 1, 0, 0 \rangle$$

## Normal Vectors for Graphs

### Surface as Graph $z = f(x, y)$

Rewrite as $F(x, y, z) = f(x, y) - z = 0$.

$$\nabla F = \langle f_x, f_y, -1 \rangle$$

This provides a normal vector pointing "upward" (positive $z$-component).

Alternatively, we can use $\langle -f_x, -f_y, 1 \rangle$ pointing in the opposite direction.

### Example 3: Paraboloid

For $z = x^2 + y^2$, let $F = x^2 + y^2 - z$.

$$\nabla F = \langle 2x, 2y, -1 \rangle$$

At $(1, 2, 5)$:

$$\mathbf{n} = \langle 2, 4, -1 \rangle$$

## Unit Normal Vectors

For many applications, we need a **unit normal vector**:

$$\hat{\mathbf{n}} = \frac{\nabla F}{|\nabla F|}$$

### Example 4

For the sphere $x^2 + y^2 + z^2 = 25$ at $(3, 0, 4)$:

$$\mathbf{n} = \langle 6, 0, 8 \rangle$$

$$|\mathbf{n}| = \sqrt{36 + 64} = 10$$

$$\hat{\mathbf{n}} = \langle 0.6, 0, 0.8 \rangle$$

This can also be written as $\langle 3/5, 0, 4/5 \rangle$.

## Tangent Planes Using Normal Vectors

The tangent plane to surface $F(x, y, z) = 0$ at $(a, b, c)$ has equation:

$$\mathbf{n} \cdot \langle x - a, y - b, z - c \rangle = 0$$

$$F_x(a, b, c)(x - a) + F_y(a, b, c)(y - b) + F_z(a, b, c)(z - c) = 0$$

### Example 5

Find the tangent plane to $x^2 + y^2 - z^2 = 0$ (cone) at $(3, 4, 5)$.

$$\nabla F = \langle 2x, 2y, -2z \rangle$$

$$\nabla F(3, 4, 5) = \langle 6, 8, -10 \rangle$$

Tangent plane:

$$6(x - 3) + 8(y - 4) - 10(z - 5) = 0$$

$$6x + 8y - 10z = 18 + 32 - 50 = 0$$

$$3x + 4y - 5z = 0$$

## Normal Lines

The **normal line** to a surface at a point has direction parallel to the normal vector.

For surface $F(x, y, z) = 0$ at $(a, b, c)$:

$$\mathbf{r}(t) = \langle a, b, c \rangle + t\nabla F(a, b, c)$$

### Example 6

Find the normal line to $z = x^2 + y^2$ at $(1, 2, 5)$.

From Example 3: $\mathbf{n} = \langle 2, 4, -1 \rangle$

$$\mathbf{r}(t) = \langle 1, 2, 5 \rangle + t\langle 2, 4, -1 \rangle$$

$$x = 1 + 2t, \quad y = 2 + 4t, \quad z = 5 - t$$

## Orientation of Surfaces

A normal vector defines an **orientation** for a surface. Surfaces can have two orientations, corresponding to the two possible directions of the normal vector.

- **Outward-pointing**: For closed surfaces like spheres, pointing away from the interior
- **Upward-pointing**: For graphs $z = f(x, y)$, with positive $z$-component

Some surfaces (like the Möbius strip) are **non-orientable** and cannot have a consistently defined normal vector.

## Applications

### Surface Area

The normal vector is used to compute surface area through the formula:

$$\text{Surface Area} = \iint_D |\mathbf{n}|\,dA$$

(with appropriate normalization)

### Flux Integrals

In physics, flux of a vector field $\mathbf{F}$ through a surface $S$ is:

$$\Phi = \iint_S \mathbf{F} \cdot \hat{\mathbf{n}}\,dS$$

The normal vector determines which direction counts as "through" the surface.

### Reflection

Light reflects off a surface according to the law of reflection: the angle of incidence equals the angle of reflection, both measured relative to the normal vector.

### Computer Graphics

Normal vectors are essential for:
- **Lighting calculations** (Phong shading, Lambertian reflection)
- **Backface culling** (determining which faces are visible)
- **Bump mapping** and texture effects

### Gradient Fields

In electromagnetism, the electric field is related to potential:

$$\mathbf{E} = -\nabla V$$

Equipotential surfaces have normal vectors in the direction of $\mathbf{E}$.

## Multiple Representations

A surface can often be represented in multiple ways:

**Implicit**: $F(x, y, z) = 0$
**Explicit**: $z = f(x, y)$
**Parametric**: $\mathbf{r}(u, v) = \langle x(u,v), y(u,v), z(u,v) \rangle$

Each representation provides a way to compute normal vectors.

### Parametric Surfaces

For $\mathbf{r}(u, v)$, the normal vector is:

$$\mathbf{n} = \frac{\partial \mathbf{r}}{\partial u} \times \frac{\partial \mathbf{r}}{\partial v}$$

### Example 7

For the sphere parametrized by:

$$\mathbf{r}(\theta, \phi) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$$

$$\mathbf{r}_\theta = \langle -R\sin\phi\sin\theta, R\sin\phi\cos\theta, 0 \rangle$$

$$\mathbf{r}_\phi = \langle R\cos\phi\cos\theta, R\cos\phi\sin\theta, -R\sin\phi \rangle$$

$$\mathbf{n} = \mathbf{r}_\theta \times \mathbf{r}_\phi$$

(computation yields $\mathbf{n}$ pointing radially outward)

## Perpendicularity Conditions

Two surfaces $F(x, y, z) = 0$ and $G(x, y, z) = 0$ intersect **orthogonally** if their normal vectors are perpendicular at the intersection:

$$\nabla F \cdot \nabla G = 0$$

### Example 8

Do the sphere $x^2 + y^2 + z^2 = 14$ and the cylinder $x^2 + y^2 = 9$ intersect orthogonally?

$$\nabla F_{\text{sphere}} = \langle 2x, 2y, 2z \rangle$$

$$\nabla F_{\text{cylinder}} = \langle 2x, 2y, 0 \rangle$$

$$\nabla F_{\text{sphere}} \cdot \nabla F_{\text{cylinder}} = 4x^2 + 4y^2$$

On the cylinder, $x^2 + y^2 = 9$, so:

$$\nabla F_{\text{sphere}} \cdot \nabla F_{\text{cylinder}} = 4(9) = 36 \neq 0$$

The surfaces do **not** intersect orthogonally.

## Summary

Normal vectors to surfaces are given by the gradient $\nabla F$ for implicit surfaces $F(x, y, z) = 0$, and are perpendicular to all tangent vectors to the surface. For graphs $z = f(x, y)$, the normal is $\langle f_x, f_y, -1 \rangle$. Unit normal vectors $\hat{\mathbf{n}}$ are obtained by normalization. Normal vectors define tangent planes, normal lines, surface orientation, and are essential for applications in physics (flux integrals, electric fields), computer graphics (lighting, rendering), and geometry (surface area, reflections). Understanding normal vectors is fundamental for analyzing the local geometry of surfaces in multivariable calculus.
