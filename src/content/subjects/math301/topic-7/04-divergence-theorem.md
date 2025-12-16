# Divergence Theorem

## Introduction

The Divergence Theorem, also known as Gauss's Theorem or Gauss-Ostrogradsky Theorem, is the final fundamental theorem of vector calculus. While Stokes' Theorem relates line integrals to surface integrals, the Divergence Theorem relates surface integrals over closed surfaces to triple integrals over the enclosed volumes. This theorem is fundamental in physics, particularly in electromagnetism, fluid dynamics, and heat transfer.

## Statement of the Divergence Theorem

Let $E$ be a simple solid region in three-dimensional space whose boundary surface $S$ is piecewise smooth and oriented by outward unit normals. Let $\mathbf{F}$ be a vector field whose component functions have continuous partial derivatives on an open region containing $E$. Then:

$$\iiint_E \nabla \cdot \mathbf{F} \, dV = \iint_S \mathbf{F} \cdot d\mathbf{S}$$

or equivalently:

$$\iiint_E \nabla \cdot \mathbf{F} \, dV = \iint_S \mathbf{F} \cdot \mathbf{n} \, dS$$

### Key Components

- **Left side**: Triple integral of the divergence over the solid region $E$
- **Right side**: Surface integral of $\mathbf{F}$ over the boundary surface $S$ (flux through the boundary)
- The surface $S$ is oriented with **outward normals** (pointing away from $E$)

## Geometric Interpretation

The Divergence Theorem states that the total flux of a vector field through a closed surface equals the total divergence (source strength) inside the volume.

- **Positive divergence**: Sources of the field (flow emanating outward)
- **Negative divergence**: Sinks (flow converging inward)
- The surface integral measures the net flow out, while the volume integral sums all the sources and sinks inside

## Examples

### Example 1: Verifying the Divergence Theorem

Verify the Divergence Theorem for $\mathbf{F} = \langle x, y, z \rangle$ where $E$ is the unit ball $x^2 + y^2 + z^2 \leq 1$.

**Solution:**

**Volume integral:**

$$\nabla \cdot \mathbf{F} = \frac{\partial x}{\partial x} + \frac{\partial y}{\partial y} + \frac{\partial z}{\partial z} = 1 + 1 + 1 = 3$$

$$\iiint_E 3 \, dV = 3 \cdot \text{Volume of unit ball} = 3 \cdot \frac{4\pi}{3} = 4\pi$$

**Surface integral:**

The boundary is the unit sphere $S: x^2 + y^2 + z^2 = 1$ with outward normal $\mathbf{n} = \langle x, y, z \rangle$ (since points on the sphere satisfy $|\mathbf{n}| = 1$).

On the sphere, $\mathbf{F} = \langle x, y, z \rangle = \mathbf{n}$.

$$\mathbf{F} \cdot \mathbf{n} = \mathbf{n} \cdot \mathbf{n} = |\mathbf{n}|^2 = 1$$

$$\iint_S \mathbf{F} \cdot \mathbf{n} \, dS = \iint_S 1 \, dS = \text{Surface area of unit sphere} = 4\pi$$

Both give $4\pi$, verifying the Divergence Theorem.

### Example 2: Computing Flux Using the Divergence Theorem

Find the flux of $\mathbf{F} = \langle x^3, y^3, z^3 \rangle$ outward through the surface of the cube $0 \leq x \leq 1$, $0 \leq y \leq 1$, $0 \leq z \leq 1$.

**Solution:**

Computing the flux directly would require integrating over six faces. Instead, use the Divergence Theorem.

$$\nabla \cdot \mathbf{F} = 3x^2 + 3y^2 + 3z^2$$

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (3x^2 + 3y^2 + 3z^2) \, dV$$

$$= 3\int_0^1 \int_0^1 \int_0^1 (x^2 + y^2 + z^2) \, dx \, dy \, dz$$

By symmetry:

$$= 3 \cdot 3 \int_0^1 \int_0^1 \int_0^1 x^2 \, dx \, dy \, dz = 9 \int_0^1 x^2 \, dx \int_0^1 dy \int_0^1 dz$$

$$= 9 \cdot \frac{1}{3} \cdot 1 \cdot 1 = 3$$

### Example 3: Zero Divergence

Find the flux of $\mathbf{F} = \langle yz, xz, xy \rangle$ through any closed surface $S$.

**Solution:**

$$\nabla \cdot \mathbf{F} = \frac{\partial(yz)}{\partial x} + \frac{\partial(xz)}{\partial y} + \frac{\partial(xy)}{\partial z} = 0 + 0 + 0 = 0$$

By the Divergence Theorem:

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E 0 \, dV = 0$$

The flux is zero through any closed surface! This makes sense because $\mathbf{F}$ is conservative ($\mathbf{F} = \nabla(xyz)$).

### Example 4: Computing a Volume Integral

Use the Divergence Theorem to find $\iiint_E (x + y + z) \, dV$ where $E$ is the tetrahedron with vertices $(0, 0, 0)$, $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$.

**Solution:**

We need a vector field $\mathbf{F}$ such that $\nabla \cdot \mathbf{F} = x + y + z$.

One choice: $\mathbf{F} = \langle \frac{x^2}{2}, \frac{y^2}{2}, \frac{z^2}{2} \rangle$ (since $\frac{\partial(x^2/2)}{\partial x} = x$, etc.).

Then:

$$\iiint_E (x + y + z) \, dV = \iint_S \mathbf{F} \cdot d\mathbf{S}$$

However, computing the surface integral over the four faces of the tetrahedron is still tedious. In this case, direct integration might be easier, but the Divergence Theorem provides an alternative approach.

## Applications

### Conservation of Mass (Continuity Equation)

In fluid dynamics, let $\rho(\mathbf{r}, t)$ be the density and $\mathbf{v}(\mathbf{r}, t)$ be the velocity field. The mass flux is $\mathbf{F} = \rho\mathbf{v}$.

The Divergence Theorem relates the rate of mass change in a region to the flux through its boundary:

$$\frac{d}{dt}\iiint_E \rho \, dV = -\iint_S \rho\mathbf{v} \cdot \mathbf{n} \, dS = -\iiint_E \nabla \cdot (\rho\mathbf{v}) \, dV$$

This leads to the **continuity equation**:

$$\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho\mathbf{v}) = 0$$

For incompressible flow ($\rho$ constant): $\nabla \cdot \mathbf{v} = 0$.

### Gauss's Law (Electrostatics)

The electric flux through a closed surface equals the enclosed charge divided by $\epsilon_0$:

$$\iint_S \mathbf{E} \cdot d\mathbf{S} = \frac{Q_{\text{enc}}}{\epsilon_0}$$

Using the Divergence Theorem:

$$\iiint_E \nabla \cdot \mathbf{E} \, dV = \frac{1}{\epsilon_0}\iiint_E \rho \, dV$$

where $\rho$ is the charge density. This gives the differential form of Gauss's law:

$$\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}$$

### Heat Flow

If $\mathbf{q}$ is the heat flux vector, the Divergence Theorem relates the heat flow out of a region to the heat sources inside:

$$\iint_S \mathbf{q} \cdot d\mathbf{S} = \iiint_E \nabla \cdot \mathbf{q} \, dV$$

Combined with Fourier's law ($\mathbf{q} = -k\nabla T$) and conservation of energy, this leads to the heat equation.

## Examples with Physical Interpretation

### Example 5: Inverse Square Law Field

For the electric field of a point charge $q$ at the origin:

$$\mathbf{E} = \frac{q}{4\pi\epsilon_0} \frac{\mathbf{r}}{|\mathbf{r}|^3}$$

One can show that $\nabla \cdot \mathbf{E} = 0$ for $\mathbf{r} \neq \mathbf{0}$.

For a sphere of radius $R$ centered at the origin:

$$\iint_S \mathbf{E} \cdot d\mathbf{S} = \frac{q}{4\pi\epsilon_0} \iint_S \frac{\mathbf{r}}{R^3} \cdot \frac{\mathbf{r}}{R} \, dS = \frac{q}{4\pi\epsilon_0 R^2} \cdot 4\pi R^2 = \frac{q}{\epsilon_0}$$

This verifies Gauss's law for a point charge.

### Example 6: Incompressible Flow

For an incompressible fluid ($\nabla \cdot \mathbf{v} = 0$), the Divergence Theorem gives:

$$\iint_S \mathbf{v} \cdot d\mathbf{S} = \iiint_E 0 \, dV = 0$$

The net flux through any closed surface is zero: whatever flows in must flow out.

## Extensions and Generalizations

### Regions with Holes

The Divergence Theorem extends to regions with cavities. If $E$ has an outer boundary $S_{\text{outer}}$ and inner boundaries $S_1, S_2, \ldots$ (all with outward normals):

$$\iiint_E \nabla \cdot \mathbf{F} \, dV = \iint_{S_{\text{outer}}} \mathbf{F} \cdot d\mathbf{S} - \sum_i \iint_{S_i} \mathbf{F} \cdot d\mathbf{S}$$

The minus signs appear because the outward normal for the inner surfaces points inward with respect to the region.

### Green's Identities

Applying the Divergence Theorem to special vector fields gives useful identities:

**Green's First Identity:** For scalar functions $f$ and $g$:

$$\iiint_E (f\nabla^2 g + \nabla f \cdot \nabla g) \, dV = \iint_S f(\nabla g) \cdot \mathbf{n} \, dS$$

**Green's Second Identity:**

$$\iiint_E (f\nabla^2 g - g\nabla^2 f) \, dV = \iint_S (f\nabla g - g\nabla f) \cdot \mathbf{n} \, dS$$

These are important in the theory of partial differential equations.

## Computational Examples

### Example 7: Sphere with Varying Field

Find the flux of $\mathbf{F} = \langle x^2, y^2, z^2 \rangle$ outward through the sphere $x^2 + y^2 + z^2 = a^2$.

**Solution:**

$$\nabla \cdot \mathbf{F} = 2x + 2y + 2z$$

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (2x + 2y + 2z) \, dV$$

By symmetry over the ball centered at the origin:

$$\iiint_E x \, dV = \iiint_E y \, dV = \iiint_E z \, dV = 0$$

Therefore: $\iint_S \mathbf{F} \cdot d\mathbf{S} = 0$.

### Example 8: Cylinder

Find the flux of $\mathbf{F} = \langle x, y, z^2 \rangle$ outward through the closed surface of the cylinder $x^2 + y^2 \leq R^2$, $0 \leq z \leq h$ (including top and bottom).

**Solution:**

$$\nabla \cdot \mathbf{F} = 1 + 1 + 2z = 2 + 2z$$

Using cylindrical coordinates:

$$\iiint_E (2 + 2z) \, dV = \int_0^{2\pi} \int_0^R \int_0^h (2 + 2z) r \, dz \, dr \, d\theta$$

$$= 2\pi \int_0^R r \, dr \int_0^h (2 + 2z) \, dz = 2\pi \cdot \frac{R^2}{2} \cdot [2z + z^2]_0^h$$

$$= \pi R^2(2h + h^2)$$

## Proof Sketch

The proof of the Divergence Theorem involves:
1. Subdividing the region $E$ into small boxes
2. Applying the theorem to each box
3. Summing (interior faces cancel)
4. Taking a limit

For a box $[x_0, x_1] \times [y_0, y_1] \times [z_0, z_1]$, one can directly verify that the flux out equals the integral of divergence.

## Relationship to Other Theorems

All the fundamental theorems of calculus share a common structure:

$$\int_{\text{region}} (\text{derivative}) = \int_{\text{boundary}} (\text{function})$$

- **FTC**: $\int_a^b f'(x) \, dx = f(b) - f(a)$
- **FTLI**: $\int_C \nabla f \cdot d\mathbf{r} = f(B) - f(A)$
- **Green**: $\iint_D (\nabla \times \mathbf{F})_z \, dA = \oint_C \mathbf{F} \cdot d\mathbf{r}$
- **Stokes**: $\iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \oint_C \mathbf{F} \cdot d\mathbf{r}$
- **Divergence**: $\iiint_E \nabla \cdot \mathbf{F} \, dV = \iint_S \mathbf{F} \cdot d\mathbf{S}$

## Conclusion

The Divergence Theorem is the culminating result of vector calculus, relating volume integrals of divergence to surface integrals of flux. It provides both a powerful computational tool and deep physical insight into the relationship between sources/sinks inside a region and flow through the boundary. The theorem is fundamental in physics, underlying many conservation laws and field equations in electromagnetism, fluid dynamics, and heat transfer. Together with Green's Theorem and Stokes' Theorem, it completes the trilogy of fundamental theorems that connect differential and integral formulations of vector calculus.
