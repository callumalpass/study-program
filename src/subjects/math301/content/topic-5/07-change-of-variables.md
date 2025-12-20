# Change of Variables for Multiple Integrals

## Introduction

The substitution method for single-variable integrals, $\int f(x) \, dx = \int f(g(u)) g'(u) \, du$, is an indispensable tool for simplifying integrals. For multiple integrals, the change of variables formula generalizes this idea, allowing us to transform integrals from one coordinate system to another. This powerful technique explains the volume elements in polar, cylindrical, and spherical coordinates, and enables us to create custom coordinate systems tailored to specific problems.

## The Jacobian

The key to changing variables in multiple integrals is the **Jacobian determinant**, which generalizes the derivative $g'(u)$ from single-variable substitution.

### The Jacobian for Two Variables

Consider a transformation from $(u, v)$ coordinates to $(x, y)$ coordinates given by:

$$x = x(u, v), \quad y = y(u, v)$$

The **Jacobian matrix** of this transformation is:

$$J = \begin{pmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{pmatrix}$$

The **Jacobian determinant** (often just called "the Jacobian") is:

$$\frac{\partial(x, y)}{\partial(u, v)} = \det(J) = \begin{vmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{vmatrix} = \frac{\partial x}{\partial u}\frac{\partial y}{\partial v} - \frac{\partial x}{\partial v}\frac{\partial y}{\partial u}$$

### The Jacobian for Three Variables

For a transformation from $(u, v, w)$ to $(x, y, z)$:

$$\frac{\partial(x, y, z)}{\partial(u, v, w)} = \begin{vmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} & \frac{\partial x}{\partial w} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} & \frac{\partial y}{\partial w} \\ \frac{\partial z}{\partial u} & \frac{\partial z}{\partial v} & \frac{\partial z}{\partial w} \end{vmatrix}$$

## Change of Variables Theorem

**Theorem (Change of Variables in Double Integrals):** Let $T$ be a one-to-one transformation from a region $S$ in the $uv$-plane to a region $R$ in the $xy$-plane given by $x = x(u, v)$, $y = y(u, v)$. If the Jacobian $\frac{\partial(x, y)}{\partial(u, v)}$ is continuous and nonzero on $S$, then:

$$\iint_R f(x, y) \, dx \, dy = \iint_S f(x(u, v), y(u, v)) \left|\frac{\partial(x, y)}{\partial(u, v)}\right| du \, dv$$

**Note:** The absolute value of the Jacobian is crucial for ensuring positive area/volume.

The triple integral version is analogous:

$$\iiint_E f(x, y, z) \, dx \, dy \, dz = \iiint_D f(x(u,v,w), y(u,v,w), z(u,v,w)) \left|\frac{\partial(x, y, z)}{\partial(u, v, w)}\right| du \, dv \, dw$$

## Deriving Polar Coordinates

Let's verify the polar coordinate formula using the change of variables theorem.

The transformation is:
$$x = r\cos\theta, \quad y = r\sin\theta$$

The Jacobian is:

$$\frac{\partial(x, y)}{\partial(r, \theta)} = \begin{vmatrix} \frac{\partial x}{\partial r} & \frac{\partial x}{\partial \theta} \\ \frac{\partial y}{\partial r} & \frac{\partial y}{\partial \theta} \end{vmatrix} = \begin{vmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{vmatrix}$$

$$= r\cos^2\theta - (-r\sin^2\theta) = r\cos^2\theta + r\sin^2\theta = r(\cos^2\theta + \sin^2\theta) = r$$

Therefore: $dx \, dy = r \, dr \, d\theta$, confirming our earlier formula.

## Deriving Cylindrical Coordinates

For cylindrical coordinates:
$$x = r\cos\theta, \quad y = r\sin\theta, \quad z = z$$

The Jacobian is:

$$\frac{\partial(x, y, z)}{\partial(r, \theta, z)} = \begin{vmatrix} \cos\theta & -r\sin\theta & 0 \\ \sin\theta & r\cos\theta & 0 \\ 0 & 0 & 1 \end{vmatrix}$$

Expanding along the third row:

$$= 1 \cdot \begin{vmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{vmatrix} = r$$

Therefore: $dx \, dy \, dz = r \, dr \, d\theta \, dz$.

## Deriving Spherical Coordinates

For spherical coordinates:
$$x = \rho\sin\phi\cos\theta, \quad y = \rho\sin\phi\sin\theta, \quad z = \rho\cos\phi$$

The Jacobian matrix is:

$$J = \begin{pmatrix} \sin\phi\cos\theta & \rho\cos\phi\cos\theta & -\rho\sin\phi\sin\theta \\ \sin\phi\sin\theta & \rho\cos\phi\sin\theta & \rho\sin\phi\cos\theta \\ \cos\phi & -\rho\sin\phi & 0 \end{pmatrix}$$

Computing the determinant (expand along the third row):

$$\det(J) = \cos\phi \begin{vmatrix} \rho\cos\phi\cos\theta & -\rho\sin\phi\sin\theta \\ \rho\cos\phi\sin\theta & \rho\sin\phi\cos\theta \end{vmatrix}$$

$$- (-\rho\sin\phi) \begin{vmatrix} \sin\phi\cos\theta & -\rho\sin\phi\sin\theta \\ \sin\phi\sin\theta & \rho\sin\phi\cos\theta \end{vmatrix}$$

After algebraic simplification (which we'll spare the details):

$$\frac{\partial(x, y, z)}{\partial(\rho, \theta, \phi)} = \rho^2\sin\phi$$

Therefore: $dx \, dy \, dz = \rho^2\sin\phi \, d\rho \, d\theta \, d\phi$.

## Examples of Custom Transformations

### Example 1: Linear Transformation

Evaluate $\iint_R (x + y) \, dA$ where $R$ is the parallelogram with vertices $(0, 0)$, $(2, 3)$, $(4, 2)$, $(6, 5)$.

**Solution:**

Notice that the sides of the parallelogram are:
- $3x - 2y = 0$ and $3x - 2y = 6$
- $x + 2y = 6$ and $x + 2y = 14$

Define: $u = 3x - 2y$, $v = x + 2y$.

The region becomes the rectangle $S: 0 \leq u \leq 6$, $6 \leq v \leq 14$ in the $uv$-plane.

To find the Jacobian, we need $x(u, v)$ and $y(u, v)$. Solving the system:
$$3x - 2y = u$$
$$x + 2y = v$$

Adding: $4x = u + v$, so $x = \frac{u + v}{4}$.

From the second equation: $y = \frac{v - x}{2} = \frac{v - (u+v)/4}{2} = \frac{v - u/4 - v/4}{2} = \frac{3v - u}{8}$.

The Jacobian:

$$\frac{\partial(x, y)}{\partial(u, v)} = \begin{vmatrix} 1/4 & 1/4 \\ -1/8 & 3/8 \end{vmatrix} = \frac{1}{4} \cdot \frac{3}{8} - \frac{1}{4} \cdot \left(-\frac{1}{8}\right) = \frac{3}{32} + \frac{1}{32} = \frac{1}{8}$$

In the new coordinates: $x + y = \frac{u + v}{4} + \frac{3v - u}{8} = \frac{2u + 2v + 3v - u}{8} = \frac{u + 5v}{8}$.

$$\iint_R (x + y) \, dA = \int_6^{14} \int_0^6 \frac{u + 5v}{8} \cdot \frac{1}{8} \, du \, dv$$

$$= \frac{1}{64} \int_6^{14} \int_0^6 (u + 5v) \, du \, dv$$

$$= \frac{1}{64} \int_6^{14} \left[\frac{u^2}{2} + 5vu\right]_0^6 dv = \frac{1}{64} \int_6^{14} (18 + 30v) \, dv$$

$$= \frac{1}{64} \left[18v + 15v^2\right]_6^{14} = \frac{1}{64}[(252 + 2940) - (108 + 540)]$$

$$= \frac{1}{64}(3192 - 648) = \frac{2544}{64} = \frac{159}{4}$$

### Example 2: Ellipse

Find the area of the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} \leq 1$.

**Solution:**

Use the transformation:
$$x = au, \quad y = bv$$

The ellipse in the $xy$-plane becomes the unit disk $u^2 + v^2 \leq 1$ in the $uv$-plane.

The Jacobian:

$$\frac{\partial(x, y)}{\partial(u, v)} = \begin{vmatrix} a & 0 \\ 0 & b \end{vmatrix} = ab$$

$$\text{Area} = \iint_R 1 \, dx \, dy = \iint_S ab \, du \, dv = ab \cdot \text{Area of unit disk} = ab \cdot \pi = \pi ab$$

### Example 3: Transformation for a Wedge

Evaluate $\iiint_E z \, dV$ where $E$ is the wedge cut from the cylinder $x^2 + y^2 \leq 1$ by the planes $z = 0$ and $z = x$.

**Solution:**

This is naturally suited to cylindrical coordinates, but with a twist. Let:
$$x = r\cos\theta, \quad y = r\sin\theta, \quad z = z$$

The region: $0 \leq r \leq 1$, $0 \leq \theta \leq 2\pi$, $0 \leq z \leq x = r\cos\theta$.

But we need $z \geq 0$, so $r\cos\theta \geq 0$, meaning $-\pi/2 \leq \theta \leq \pi/2$.

$$\iiint_E z \, dV = \int_{-\pi/2}^{\pi/2} \int_0^1 \int_0^{r\cos\theta} z \cdot r \, dz \, dr \, d\theta$$

$$= \int_{-\pi/2}^{\pi/2} \int_0^1 r \left[\frac{z^2}{2}\right]_0^{r\cos\theta} dr \, d\theta$$

$$= \int_{-\pi/2}^{\pi/2} \int_0^1 \frac{r^3\cos^2\theta}{2} \, dr \, d\theta$$

$$= \int_{-\pi/2}^{\pi/2} \frac{\cos^2\theta}{2} \left[\frac{r^4}{4}\right]_0^1 d\theta = \int_{-\pi/2}^{\pi/2} \frac{\cos^2\theta}{8} \, d\theta$$

Using $\cos^2\theta = \frac{1 + \cos(2\theta)}{2}$:

$$= \frac{1}{8} \int_{-\pi/2}^{\pi/2} \frac{1 + \cos(2\theta)}{2} \, d\theta = \frac{1}{16} \left[\theta + \frac{\sin(2\theta)}{2}\right]_{-\pi/2}^{\pi/2}$$

$$= \frac{1}{16}[(\pi/2 + 0) - (-\pi/2 + 0)] = \frac{1}{16} \cdot \pi = \frac{\pi}{16}$$

## Geometric Interpretation of the Jacobian

The Jacobian $\left|\frac{\partial(x,y)}{\partial(u,v)}\right|$ represents the **local scaling factor** for area. If we consider a small rectangle in the $uv$-plane with dimensions $\Delta u \times \Delta v$ (area $\Delta u \Delta v$), the transformation maps it to a region in the $xy$-plane with approximate area:

$$\Delta x \Delta y \approx \left|\frac{\partial(x,y)}{\partial(u,v)}\right| \Delta u \Delta v$$

The Jacobian tells us how much the transformation "stretches" or "compresses" area locally.

## The Inverse Jacobian

Sometimes it's easier to compute the Jacobian of the inverse transformation. There's a useful relationship:

$$\frac{\partial(x, y)}{\partial(u, v)} \cdot \frac{\partial(u, v)}{\partial(x, y)} = 1$$

So: $\frac{\partial(x, y)}{\partial(u, v)} = \frac{1}{\frac{\partial(u, v)}{\partial(x, y)}}$

For example, in polar coordinates, instead of computing $\frac{\partial(x,y)}{\partial(r,\theta)}$, we could compute:

$$\frac{\partial(r, \theta)}{\partial(x, y)} = \begin{vmatrix} \frac{\partial r}{\partial x} & \frac{\partial r}{\partial y} \\ \frac{\partial \theta}{\partial x} & \frac{\partial \theta}{\partial y} \end{vmatrix}$$

where $r = \sqrt{x^2 + y^2}$ and $\theta = \arctan(y/x)$.

This gives $\frac{\partial r}{\partial x} = \frac{x}{\sqrt{x^2+y^2}} = \frac{x}{r}$, etc., and ultimately yields $\frac{\partial(r,\theta)}{\partial(x,y)} = \frac{1}{r}$, confirming $\frac{\partial(x,y)}{\partial(r,\theta)} = r$.

## Conclusion

The change of variables theorem, powered by the Jacobian determinant, provides a rigorous foundation for transforming multiple integrals between coordinate systems. This technique not only explains the familiar volume elements in polar, cylindrical, and spherical coordinates but also enables custom transformations tailored to specific geometric regions. The Jacobian encodes how the transformation scales areas and volumes, ensuring that integrals are correctly evaluated in the new coordinate system. This completes our study of multiple integrals, setting the stage for line and surface integrals in the next topic.
