---
id: math301-topic-6-2
title: "Line Integrals of Vector Fields"
order: 2
---

# Line Integrals of Vector Fields

## Introduction

Vector fields appear throughout physics and engineering: gravitational and electric fields, velocity fields of fluids, force fields, and magnetic fields. Line integrals of vector fields allow us to compute fundamental quantities like work done by a force along a path and circulation of a fluid around a closed loop. These integrals form the foundation for the fundamental theorems of vector calculus.

## Vector Fields

A **vector field** in two dimensions assigns a vector to each point in a region of the plane:

$$\mathbf{F}(x, y) = \langle P(x, y), Q(x, y) \rangle = P(x, y)\mathbf{i} + Q(x, y)\mathbf{j}$$

A **vector field** in three dimensions assigns a vector to each point in space:

$$\mathbf{F}(x, y, z) = \langle P(x, y, z), Q(x, y, z), R(x, y, z) \rangle$$

**Examples:**
- Gravitational field: $\mathbf{F}(x, y, z) = -\frac{Gm}{(x^2+y^2+z^2)^{3/2}} \langle x, y, z \rangle$
- Velocity field of rotating fluid: $\mathbf{F}(x, y) = \langle -y, x \rangle$
- Gradient field: $\mathbf{F} = \nabla f$ for some scalar function $f$

## Definition of Line Integrals of Vector Fields

Let $\mathbf{F}$ be a continuous vector field and $C$ a smooth curve given by $\mathbf{r}(t)$, $a \leq t \leq b$.

### The Tangential Line Integral

The **line integral** of $\mathbf{F}$ along $C$ is defined as:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) \, dt$$

This is also called the **work integral** or **circulation integral**.

### Alternative Notations

Several equivalent notations are used:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_C \mathbf{F} \cdot \mathbf{T} \, ds = \int_C P \, dx + Q \, dy + R \, dz$$

where:
- $\mathbf{T} = \frac{\mathbf{r}'(t)}{|\mathbf{r}'(t)|}$ is the unit tangent vector
- $ds = |\mathbf{r}'(t)| \, dt$ is the arc length element
- $d\mathbf{r} = \mathbf{r}'(t) \, dt = \langle dx, dy, dz \rangle$

### Component Form

If $\mathbf{F} = \langle P, Q, R \rangle$ and $\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle$:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b [P(x(t), y(t), z(t))x'(t) + Q(x(t), y(t), z(t))y'(t) + R(x(t), y(t), z(t))z'(t)] \, dt$$

## Physical Interpretation: Work

The most important physical interpretation is **work done by a force**.

If $\mathbf{F}$ represents a force field and an object moves along curve $C$ from point $A$ to point $B$, the work done by the force is:

$$W = \int_C \mathbf{F} \cdot d\mathbf{r}$$

The integrand $\mathbf{F} \cdot d\mathbf{r} = \mathbf{F} \cdot \mathbf{T} \, ds$ represents the component of force in the direction of motion times the distance traveled, which is precisely the definition of work.

### Key Observations

- If $\mathbf{F}$ is perpendicular to the motion ($\mathbf{F} \perp \mathbf{T}$), no work is done
- If $\mathbf{F}$ points in the direction of motion ($\mathbf{F} \cdot \mathbf{T} > 0$), work is positive
- If $\mathbf{F}$ opposes the motion ($\mathbf{F} \cdot \mathbf{T} < 0$), work is negative

## Properties of Vector Line Integrals

1. **Linearity**: $\int_C (a\mathbf{F} + b\mathbf{G}) \cdot d\mathbf{r} = a\int_C \mathbf{F} \cdot d\mathbf{r} + b\int_C \mathbf{G} \cdot d\mathbf{r}$

2. **Additivity**: If $C = C_1 \cup C_2$:
   $$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_{C_1} \mathbf{F} \cdot d\mathbf{r} + \int_{C_2} \mathbf{F} \cdot d\mathbf{r}$$

3. **Reversal of orientation**: If $-C$ denotes $C$ with opposite orientation:
   $$\int_{-C} \mathbf{F} \cdot d\mathbf{r} = -\int_C \mathbf{F} \cdot d\mathbf{r}$$

4. **Independence of parametrization** (orientation-preserving): The integral depends on the curve and its orientation, not on the specific parametrization.

## Examples

### Example 1: Work Along a Line Segment

Compute $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F}(x, y) = \langle x, y \rangle$ and $C$ is the line segment from $(0, 0)$ to $(1, 1)$.

**Solution:**

Parametrize: $\mathbf{r}(t) = \langle t, t \rangle$, $0 \leq t \leq 1$.

$$\mathbf{r}'(t) = \langle 1, 1 \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) = \langle t, t \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) = \langle t, t \rangle \cdot \langle 1, 1 \rangle = t + t = 2t$$

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_0^1 2t \, dt = [t^2]_0^1 = 1$$

### Example 2: Work in a Radial Field

Let $\mathbf{F}(x, y) = \frac{\langle x, y \rangle}{x^2 + y^2}$ (a radial field). Compute $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $C$ is the unit circle traversed counterclockwise.

**Solution:**

Parametrize: $\mathbf{r}(t) = \langle \cos t, \sin t \rangle$, $0 \leq t \leq 2\pi$.

$$\mathbf{r}'(t) = \langle -\sin t, \cos t \rangle$$

On the circle, $x^2 + y^2 = 1$, so:

$$\mathbf{F}(\mathbf{r}(t)) = \frac{\langle \cos t, \sin t \rangle}{1} = \langle \cos t, \sin t \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) = \langle \cos t, \sin t \rangle \cdot \langle -\sin t, \cos t \rangle = -\cos t \sin t + \sin t \cos t = 0$$

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_0^{2\pi} 0 \, dt = 0$$

The radial field is perpendicular to the circular path at every point, so no work is done.

### Example 3: Work Against Gravity

A particle moves along the helix $\mathbf{r}(t) = \langle 2\cos t, 2\sin t, 3t \rangle$, $0 \leq t \leq 2\pi$, under the influence of gravity $\mathbf{F} = \langle 0, 0, -mg \rangle$. Find the work done by gravity.

**Solution:**

$$\mathbf{r}'(t) = \langle -2\sin t, 2\cos t, 3 \rangle$$

$$\mathbf{F} \cdot \mathbf{r}'(t) = \langle 0, 0, -mg \rangle \cdot \langle -2\sin t, 2\cos t, 3 \rangle = -3mg$$

$$W = \int_0^{2\pi} (-3mg) \, dt = -3mg \cdot 2\pi = -6\pi mg$$

The work is negative because gravity opposes the upward motion of the helix. The magnitude equals $mg$ times the vertical distance traveled ($6\pi$).

### Example 4: Circulation

Compute $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F}(x, y) = \langle -y, x \rangle$ and $C$ is the circle of radius $R$ centered at the origin, traversed counterclockwise.

**Solution:**

Parametrize: $\mathbf{r}(t) = \langle R\cos t, R\sin t \rangle$, $0 \leq t \leq 2\pi$.

$$\mathbf{r}'(t) = \langle -R\sin t, R\cos t \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) = \langle -R\sin t, R\cos t \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) = R^2\sin^2 t + R^2\cos^2 t = R^2$$

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_0^{2\pi} R^2 \, dt = 2\pi R^2$$

This vector field represents a rotational flow, and the integral measures the **circulation** around the circle.

## Circulation and Flux

### Circulation

For a closed curve $C$ (denoted $\oint_C$), the line integral $\oint_C \mathbf{F} \cdot d\mathbf{r}$ is called the **circulation** of $\mathbf{F}$ around $C$. It measures the tendency of the field to circulate around the curve.

### Flux Across a Plane Curve

For a plane curve $C$ given by $\mathbf{r}(t) = \langle x(t), y(t) \rangle$, we can define the **flux** of $\mathbf{F} = \langle P, Q \rangle$ across $C$ as:

$$\int_C \mathbf{F} \cdot \mathbf{n} \, ds$$

where $\mathbf{n}$ is the unit normal vector to $C$. If $\mathbf{T} = \frac{\langle x'(t), y'(t) \rangle}{|\mathbf{r}'(t)|}$ is the unit tangent, then $\mathbf{n} = \frac{\langle y'(t), -x'(t) \rangle}{|\mathbf{r}'(t)|}$ is the unit normal (rotated 90° clockwise).

The flux integral can be written as:

$$\int_C \mathbf{F} \cdot \mathbf{n} \, ds = \int_C P \, dy - Q \, dx$$

### Example 5: Flux Through a Line Segment

Find the flux of $\mathbf{F}(x, y) = \langle x, y \rangle$ through the line segment from $(0, 0)$ to $(1, 0)$.

**Solution:**

Parametrize: $\mathbf{r}(t) = \langle t, 0 \rangle$, $0 \leq t \leq 1$.

The outward normal to this horizontal segment is $\mathbf{n} = \langle 0, -1 \rangle$ (pointing downward).

$$\text{Flux} = \int_C \mathbf{F} \cdot \mathbf{n} \, ds = \int_C P \, dy - Q \, dx$$

Since $y = 0$, $dy = 0$, and $dx = dt$:

$$= \int_0^1 x \cdot 0 - y \cdot 1 \, dt = \int_0^1 0 \, dt = 0$$

Alternatively, $\mathbf{F}(\mathbf{r}(t)) = \langle t, 0 \rangle$ is horizontal, and $\mathbf{n}$ is vertical, so they're perpendicular.

## Three-Dimensional Line Integrals

All concepts extend naturally to three dimensions.

### Example 6: 3D Work Integral

Evaluate $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F}(x, y, z) = \langle yz, xz, xy \rangle$ and $C$ is the curve $\mathbf{r}(t) = \langle t, t^2, t^3 \rangle$, $0 \leq t \leq 1$.

**Solution:**

$$\mathbf{r}'(t) = \langle 1, 2t, 3t^2 \rangle$$

$$\mathbf{F}(\mathbf{r}(t)) = \langle t^2 \cdot t^3, t \cdot t^3, t \cdot t^2 \rangle = \langle t^5, t^4, t^3 \rangle$$

$$\mathbf{F} \cdot \mathbf{r}'(t) = t^5 \cdot 1 + t^4 \cdot 2t + t^3 \cdot 3t^2 = t^5 + 2t^5 + 3t^5 = 6t^5$$

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_0^1 6t^5 \, dt = 6 \cdot \frac{1}{6} = 1$$

## Path Dependence

A crucial question: does the value of $\int_C \mathbf{F} \cdot d\mathbf{r}$ depend only on the endpoints of $C$, or does it depend on the specific path taken?

**In general, line integrals are path-dependent.** Different paths between the same two points can give different values.

### Example 7: Path Dependence

Let $\mathbf{F}(x, y) = \langle y, x \rangle$. Compute $\int_C \mathbf{F} \cdot d\mathbf{r}$ from $(0, 0)$ to $(1, 1)$ along:
- Path $C_1$: the line segment $\mathbf{r}(t) = \langle t, t \rangle$, $0 \leq t \leq 1$
- Path $C_2$: the parabola $\mathbf{r}(t) = \langle t, t^2 \rangle$, $0 \leq t \leq 1$

**Path $C_1$:**
$$\mathbf{r}'(t) = \langle 1, 1 \rangle, \quad \mathbf{F}(\mathbf{r}(t)) = \langle t, t \rangle$$
$$\int_{C_1} \mathbf{F} \cdot d\mathbf{r} = \int_0^1 (t + t) \, dt = \int_0^1 2t \, dt = 1$$

**Path $C_2$:**
$$\mathbf{r}'(t) = \langle 1, 2t \rangle, \quad \mathbf{F}(\mathbf{r}(t)) = \langle t^2, t \rangle$$
$$\int_{C_2} \mathbf{F} \cdot d\mathbf{r} = \int_0^1 (t^2 \cdot 1 + t \cdot 2t) \, dt = \int_0^1 3t^2 \, dt = 1$$

Interestingly, both paths give the same answer! This suggests $\mathbf{F}$ might be a special type of field (indeed, it's a gradient field: $\mathbf{F} = \nabla(xy)$). We'll explore this in the next sections.

## Conclusion

Line integrals of vector fields, particularly work integrals $\int_C \mathbf{F} \cdot d\mathbf{r}$, are fundamental tools for computing work, circulation, and other quantities involving vector fields and paths. The key formula $\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) \, dt$ reduces the computation to a parametric integral. In the next section, we investigate when line integrals are path-independent, leading to the fundamental theorem for line integrals and the concept of conservative vector fields.
