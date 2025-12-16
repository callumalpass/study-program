# Parametric Surfaces

## Introduction

Just as curves in space can be described parametrically, surfaces can also be represented by vector functions of two parameters. Parametric surfaces provide a flexible framework for describing complex shapes and are essential for defining surface integrals. Understanding how to parametrize surfaces and compute their geometric properties is fundamental to surface integration and vector calculus.

## Parametric Representation of Surfaces

A **parametric surface** $S$ in three-dimensional space is described by a vector function of two parameters:

$$\mathbf{r}(u, v) = \langle x(u, v), y(u, v), z(u, v) \rangle$$

where $(u, v)$ varies over some domain $D$ in the $uv$-plane (the **parameter domain**).

### Component Form

Equivalently, we can write:
$$x = x(u, v), \quad y = y(u, v), \quad z = z(u, v), \quad (u, v) \in D$$

For each point $(u, v)$ in $D$, we get a point $(x, y, z)$ on the surface $S$.

## Examples of Parametric Surfaces

### Example 1: Plane

A plane passing through point $\mathbf{r}_0$ with direction vectors $\mathbf{a}$ and $\mathbf{b}$:

$$\mathbf{r}(u, v) = \mathbf{r}_0 + u\mathbf{a} + v\mathbf{b}$$

For instance, the plane $z = 2x + 3y$ can be parametrized as:
$$\mathbf{r}(u, v) = \langle u, v, 2u + 3v \rangle$$

### Example 2: Cylinder

A circular cylinder of radius $R$ with axis along the $z$-axis:

$$\mathbf{r}(u, v) = \langle R\cos u, R\sin u, v \rangle, \quad 0 \leq u \leq 2\pi, \quad c \leq v \leq d$$

Here $u$ is the angle around the axis, and $v$ is the height.

### Example 3: Sphere

A sphere of radius $R$ centered at the origin using spherical coordinates:

$$\mathbf{r}(\phi, \theta) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$$

where $0 \leq \phi \leq \pi$ (polar angle from $z$-axis) and $0 \leq \theta \leq 2\pi$ (azimuthal angle).

### Example 4: Graph of a Function

If $S$ is the graph of $z = f(x, y)$, a natural parametrization is:

$$\mathbf{r}(x, y) = \langle x, y, f(x, y) \rangle$$

For example, the paraboloid $z = x^2 + y^2$:
$$\mathbf{r}(x, y) = \langle x, y, x^2 + y^2 \rangle$$

### Example 5: Surface of Revolution

A surface formed by rotating the curve $z = f(r)$ around the $z$-axis:

$$\mathbf{r}(r, \theta) = \langle r\cos\theta, r\sin\theta, f(r) \rangle$$

For instance, rotating $z = r^2$ gives a paraboloid:
$$\mathbf{r}(r, \theta) = \langle r\cos\theta, r\sin\theta, r^2 \rangle, \quad 0 \leq r \leq R, \quad 0 \leq \theta \leq 2\pi$$

## Tangent Vectors and the Tangent Plane

Given a parametric surface $\mathbf{r}(u, v)$, we can compute partial derivatives:

$$\mathbf{r}_u = \frac{\partial \mathbf{r}}{\partial u} = \left\langle \frac{\partial x}{\partial u}, \frac{\partial y}{\partial u}, \frac{\partial z}{\partial u} \right\rangle$$

$$\mathbf{r}_v = \frac{\partial \mathbf{r}}{\partial v} = \left\langle \frac{\partial x}{\partial v}, \frac{\partial y}{\partial v}, \frac{\partial z}{\partial v} \right\rangle$$

These vectors are **tangent** to the surface:
- $\mathbf{r}_u$ is tangent to the curve obtained by varying $u$ while holding $v$ fixed
- $\mathbf{r}_v$ is tangent to the curve obtained by varying $v$ while holding $u$ fixed

### The Tangent Plane

At a point $\mathbf{r}(u_0, v_0)$, the vectors $\mathbf{r}_u(u_0, v_0)$ and $\mathbf{r}_v(u_0, v_0)$ span the **tangent plane** to the surface.

### Example 6: Tangent Vectors to a Sphere

For the sphere $\mathbf{r}(\phi, \theta) = \langle R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi \rangle$:

$$\mathbf{r}_\phi = \langle R\cos\phi\cos\theta, R\cos\phi\sin\theta, -R\sin\phi \rangle$$

$$\mathbf{r}_\theta = \langle -R\sin\phi\sin\theta, R\sin\phi\cos\theta, 0 \rangle$$

At the point $(\phi, \theta) = (\pi/2, 0)$ (the point $(R, 0, 0)$ on the equator):

$$\mathbf{r}_\phi = \langle 0, 0, -R \rangle, \quad \mathbf{r}_\theta = \langle 0, R, 0 \rangle$$

These are tangent to the sphere at that point.

## The Normal Vector

The **normal vector** to the surface at a point is perpendicular to the tangent plane and is given by the cross product:

$$\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$$

This vector is perpendicular to both $\mathbf{r}_u$ and $\mathbf{r}_v$, hence perpendicular to the surface.

The **unit normal vector** is:

$$\mathbf{N} = \frac{\mathbf{r}_u \times \mathbf{r}_v}{|\mathbf{r}_u \times \mathbf{r}_v|}$$

### Example 7: Normal to a Plane

For the plane $\mathbf{r}(u, v) = \langle u, v, 2u + 3v \rangle$:

$$\mathbf{r}_u = \langle 1, 0, 2 \rangle, \quad \mathbf{r}_v = \langle 0, 1, 3 \rangle$$

$$\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 0 & 2 \\ 0 & 1 & 3 \end{vmatrix} = \langle -2, -3, 1 \rangle$$

This is perpendicular to the plane $z = 2x + 3y$, or $2x + 3y - z = 0$.

### Example 8: Normal to a Sphere

For the sphere with $\mathbf{r}_\phi$ and $\mathbf{r}_\theta$ computed above:

$$\mathbf{n} = \mathbf{r}_\phi \times \mathbf{r}_\theta = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ R\cos\phi\cos\theta & R\cos\phi\sin\theta & -R\sin\phi \\ -R\sin\phi\sin\theta & R\sin\phi\cos\theta & 0 \end{vmatrix}$$

After computation (which we'll spare):

$$\mathbf{n} = R^2\sin\phi \langle \sin\phi\cos\theta, \sin\phi\sin\theta, \cos\phi \rangle = R^2\sin\phi \cdot \frac{\mathbf{r}}{R}$$

The normal points radially outward from the center, as expected.

## Surface Area

The **surface area element** $dS$ is the magnitude of the normal vector:

$$dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$$

The total surface area of $S$ is:

$$\text{Area}(S) = \iint_D |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$$

where $D$ is the parameter domain.

### Example 9: Surface Area of a Cylinder

For the cylinder $\mathbf{r}(u, v) = \langle R\cos u, R\sin u, v \rangle$, $0 \leq u \leq 2\pi$, $0 \leq v \leq h$:

$$\mathbf{r}_u = \langle -R\sin u, R\cos u, 0 \rangle, \quad \mathbf{r}_v = \langle 0, 0, 1 \rangle$$

$$\mathbf{r}_u \times \mathbf{r}_v = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ -R\sin u & R\cos u & 0 \\ 0 & 0 & 1 \end{vmatrix} = \langle R\cos u, R\sin u, 0 \rangle$$

$$|\mathbf{r}_u \times \mathbf{r}_v| = \sqrt{R^2\cos^2 u + R^2\sin^2 u} = R$$

$$\text{Area} = \int_0^{2\pi} \int_0^h R \, dv \, du = R \cdot h \cdot 2\pi = 2\pi Rh$$

This confirms the familiar formula for the lateral surface area of a cylinder.

### Example 10: Surface Area of a Sphere

For the sphere of radius $R$:

From Example 8, $|\mathbf{r}_\phi \times \mathbf{r}_\theta| = R^2\sin\phi$.

$$\text{Area} = \int_0^{2\pi} \int_0^\pi R^2\sin\phi \, d\phi \, d\theta$$

$$= \int_0^{2\pi} R^2[-\cos\phi]_0^\pi d\theta = \int_0^{2\pi} R^2 \cdot 2 \, d\theta = 4\pi R^2$$

The familiar formula for the surface area of a sphere.

## Surface Area of Graphs

For a surface given as the graph of $z = f(x, y)$ over a region $D$ in the $xy$-plane:

$$\mathbf{r}(x, y) = \langle x, y, f(x, y) \rangle$$

$$\mathbf{r}_x = \langle 1, 0, f_x \rangle, \quad \mathbf{r}_y = \langle 0, 1, f_y \rangle$$

$$\mathbf{r}_x \times \mathbf{r}_y = \langle -f_x, -f_y, 1 \rangle$$

$$|\mathbf{r}_x \times \mathbf{r}_y| = \sqrt{f_x^2 + f_y^2 + 1}$$

The surface area is:

$$\text{Area}(S) = \iint_D \sqrt{1 + \left(\frac{\partial f}{\partial x}\right)^2 + \left(\frac{\partial f}{\partial y}\right)^2} \, dA$$

### Example 11: Surface Area of a Paraboloid

Find the surface area of $z = x^2 + y^2$ over the disk $x^2 + y^2 \leq 1$.

**Solution:**

$$f_x = 2x, \quad f_y = 2y$$

$$\sqrt{1 + f_x^2 + f_y^2} = \sqrt{1 + 4x^2 + 4y^2}$$

Using polar coordinates ($x = r\cos\theta$, $y = r\sin\theta$):

$$\text{Area} = \int_0^{2\pi} \int_0^1 \sqrt{1 + 4r^2} \cdot r \, dr \, d\theta$$

Use substitution $u = 1 + 4r^2$, $du = 8r \, dr$:

$$= \int_0^{2\pi} \int_1^5 \frac{\sqrt{u}}{8} \, du \, d\theta = \int_0^{2\pi} \frac{1}{8} \cdot \frac{2u^{3/2}}{3}\Big|_1^5 d\theta$$

$$= \int_0^{2\pi} \frac{1}{12}(5^{3/2} - 1) \, d\theta = \frac{2\pi}{12}(5\sqrt{5} - 1) = \frac{\pi(5\sqrt{5} - 1)}{6}$$

## Smooth Surfaces

A parametric surface is **smooth** if:
1. $\mathbf{r}_u$ and $\mathbf{r}_v$ are continuous
2. $\mathbf{r}_u \times \mathbf{r}_v \neq \mathbf{0}$ everywhere in the parameter domain

This ensures the surface has a well-defined tangent plane at every point (no cusps or self-intersections).

## Orientation of Surfaces

A surface is **orientable** if it's possible to choose a continuous unit normal vector field on the entire surface. This means we can distinguish between the "two sides" of the surface.

**Examples:**
- **Orientable:** Sphere, cylinder, torus, graph of a function
- **Non-orientable:** Möbius strip, Klein bottle

For parametric surfaces, the choice of $\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$ gives an orientation. Swapping $u$ and $v$ reverses the orientation.

## Conclusion

Parametric surfaces extend the concept of parametric curves to two dimensions, providing a flexible framework for describing complex shapes in space. Key concepts include tangent vectors $\mathbf{r}_u$ and $\mathbf{r}_v$, the normal vector $\mathbf{r}_u \times \mathbf{r}_v$, and the surface area element $dS = |\mathbf{r}_u \times \mathbf{r}_v| \, du \, dv$. These tools allow us to compute geometric properties of surfaces and set the stage for surface integrals. In the next section, we define integrals of scalar functions over surfaces, generalizing the concept of line integrals to two-dimensional surfaces.
