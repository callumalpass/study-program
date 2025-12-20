# Conservative Vector Fields

## Introduction

Not all vector fields are conservative. Given a vector field $\mathbf{F}$, how can we determine whether it's a gradient field? And if it is, how do we systematically find a potential function? This section provides the theoretical framework and practical tests for identifying conservative fields, which is essential for both theoretical understanding and practical problem-solving in physics and engineering.

## The Curl Criterion

The most important test for conservative fields in three dimensions involves the **curl** of the vector field.

### Definition of Curl

For a vector field $\mathbf{F} = \langle P, Q, R \rangle$ in three dimensions, the **curl** is:

$$\text{curl } \mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$

$$= \left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right)\mathbf{i} - \left(\frac{\partial R}{\partial x} - \frac{\partial P}{\partial z}\right)\mathbf{j} + \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\mathbf{k}$$

$$= \left\langle \frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}, \frac{\partial P}{\partial z} - \frac{\partial R}{\partial x}, \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right\rangle$$

### Curl in Two Dimensions

For a 2D vector field $\mathbf{F} = \langle P, Q \rangle$, we can embed it in 3D as $\mathbf{F} = \langle P, Q, 0 \rangle$. The curl simplifies to:

$$\text{curl } \mathbf{F} = \left\langle 0, 0, \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right\rangle$$

The scalar $\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ is often called the **scalar curl** in 2D.

## The Fundamental Theorem: Curl of a Gradient

**Theorem:** If $f$ is a function with continuous second partial derivatives, then:

$$\text{curl}(\nabla f) = \nabla \times (\nabla f) = \mathbf{0}$$

**Proof:** Let $\mathbf{F} = \nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}, \frac{\partial f}{\partial z} \right\rangle$.

The $\mathbf{k}$-component of the curl is:

$$\frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right) - \frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right) = \frac{\partial^2 f}{\partial x \partial y} - \frac{\partial^2 f}{\partial y \partial x}$$

By Clairaut's theorem (equality of mixed partials), this equals zero. Similarly, the other components are zero.

### Contrapositive: The Curl Test

**Corollary:** If $\text{curl } \mathbf{F} \neq \mathbf{0}$, then $\mathbf{F}$ is NOT conservative.

This provides a quick test to rule out conservative fields.

## Conservative Field Test

**Theorem (Test for Conservative Fields in Simply Connected Regions):**

Let $\mathbf{F} = \langle P, Q, R \rangle$ be a vector field defined on an open, simply connected region $D$ in space. If $P$, $Q$, and $R$ have continuous first partial derivatives and:

$$\text{curl } \mathbf{F} = \mathbf{0}$$

everywhere in $D$, then $\mathbf{F}$ is conservative (i.e., $\mathbf{F} = \nabla f$ for some function $f$).

**Note:** The region must be **simply connected** (no holes). This condition is crucial.

### Two-Dimensional Version

For $\mathbf{F} = \langle P, Q \rangle$ in a simply connected region of the plane:

$\mathbf{F}$ is conservative if and only if:

$$\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$$

## Examples: Testing for Conservative Fields

### Example 1: Conservative Field

Test whether $\mathbf{F}(x, y, z) = \langle yz, xz, xy \rangle$ is conservative.

**Solution:**

Compute the curl:
$$P = yz, \quad Q = xz, \quad R = xy$$

$$\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} = x - x = 0$$

$$\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} = y - y = 0$$

$$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = z - z = 0$$

Since $\text{curl } \mathbf{F} = \mathbf{0}$, the field is conservative (assuming the domain is simply connected, which it is for this case).

We already found $f(x, y, z) = xyz$ in the previous section.

### Example 2: Non-Conservative Field

Test whether $\mathbf{F}(x, y) = \langle -y, x \rangle$ is conservative.

**Solution:**

$$P = -y, \quad Q = x$$

$$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 1 - (-1) = 2 \neq 0$$

The field is NOT conservative. This is the rotational field representing counterclockwise circulation.

### Example 3: Testing in Three Dimensions

Determine if $\mathbf{F}(x, y, z) = \langle y^2, 2xy + e^{3z}, 3ye^{3z} \rangle$ is conservative.

**Solution:**

$$P = y^2, \quad Q = 2xy + e^{3z}, \quad R = 3ye^{3z}$$

Check the three curl components:

$$\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z} = 3e^{3z} - 3e^{3z} = 0 \quad \checkmark$$

$$\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x} = 0 - 0 = 0 \quad \checkmark$$

$$\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} = 2y - 2y = 0 \quad \checkmark$$

The field is conservative. Let's find the potential function.

## Finding Potential Functions: Systematic Approach

Once we've verified that $\mathbf{F}$ is conservative, we can find $f$ such that $\nabla f = \mathbf{F}$.

### Method: Sequential Integration

**For Example 3 above:**

From $\frac{\partial f}{\partial x} = y^2$:
$$f(x, y, z) = xy^2 + g(y, z)$$

From $\frac{\partial f}{\partial y} = 2xy + e^{3z}$:
$$\frac{\partial}{\partial y}[xy^2 + g(y, z)] = 2xy + \frac{\partial g}{\partial y} = 2xy + e^{3z}$$

Therefore: $\frac{\partial g}{\partial y} = e^{3z}$, which gives $g(y, z) = ye^{3z} + h(z)$.

So far: $f(x, y, z) = xy^2 + ye^{3z} + h(z)$.

From $\frac{\partial f}{\partial z} = 3ye^{3z}$:
$$\frac{\partial}{\partial z}[xy^2 + ye^{3z} + h(z)] = 3ye^{3z} + h'(z) = 3ye^{3z}$$

Therefore: $h'(z) = 0$, so $h(z) = C$.

**Potential function:** $f(x, y, z) = xy^2 + ye^{3z} + C$

### Example 4: Complete Problem

Determine if $\mathbf{F}(x, y) = \langle 2x\cos y - 3, -x^2\sin y \rangle$ is conservative, and if so, find a potential function.

**Solution:**

Test: $\frac{\partial Q}{\partial x} = -2x\sin y$ and $\frac{\partial P}{\partial y} = -2x\sin y$.

Since $\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$, the field is conservative.

From $\frac{\partial f}{\partial x} = 2x\cos y - 3$:
$$f(x, y) = \int (2x\cos y - 3) \, dx = x^2\cos y - 3x + g(y)$$

From $\frac{\partial f}{\partial y} = -x^2\sin y$:
$$\frac{\partial}{\partial y}[x^2\cos y - 3x + g(y)] = -x^2\sin y + g'(y) = -x^2\sin y$$

Therefore: $g'(y) = 0$, so $g(y) = C$.

**Potential function:** $f(x, y) = x^2\cos y - 3x + C$

## Applications

### Example 5: Computing a Line Integral

Evaluate $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F}(x, y) = \langle 2x\cos y - 3, -x^2\sin y \rangle$ and $C$ is the arc of the parabola $y = x^2$ from $(0, 0)$ to $(2, 4)$.

**Solution:**

From Example 4, $\mathbf{F}$ is conservative with potential $f(x, y) = x^2\cos y - 3x$.

By the Fundamental Theorem for Line Integrals:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = f(2, 4) - f(0, 0)$$

$$= [4\cos 4 - 6] - [0] = 4\cos 4 - 6$$

No parametrization needed!

### Example 6: Showing a Field is Not Conservative

Show that $\mathbf{F}(x, y) = \langle x^2, xy \rangle$ is not conservative.

**Solution:**

Test: $P = x^2$, $Q = xy$.

$$\frac{\partial Q}{\partial x} = y, \quad \frac{\partial P}{\partial y} = 0$$

Since $y \neq 0$ in general, $\frac{\partial Q}{\partial x} \neq \frac{\partial P}{\partial y}$, so $\mathbf{F}$ is not conservative.

As a consequence, $\int_C \mathbf{F} \cdot d\mathbf{r}$ depends on the path, not just the endpoints.

## Physical Interpretation of Curl

The curl measures the **rotation** or **circulation** of a vector field at a point. A field with zero curl has no local rotation—it's **irrotational**.

- **Conservative fields**: Zero curl everywhere (irrotational)
- **Rotational fields**: Nonzero curl (like $\langle -y, x \rangle$)

In fluid dynamics:
- $\text{curl } \mathbf{v} = \mathbf{0}$: irrotational flow
- $\text{curl } \mathbf{v} \neq \mathbf{0}$: rotational flow (vorticity)

## Simply Connected Regions

The requirement that the region be **simply connected** is essential for the curl test to guarantee a conservative field.

### Definition

A region $D$ is **simply connected** if every closed curve in $D$ can be continuously shrunk to a point without leaving $D$. Informally, $D$ has no "holes."

**Simply connected:** The entire plane $\mathbb{R}^2$, a disk, a rectangle.

**Not simply connected:** $\mathbb{R}^2$ minus the origin, an annulus (ring), a torus.

### Counterexample in Non-Simply Connected Region

Consider $\mathbf{F}(x, y) = \frac{1}{x^2+y^2}\langle -y, x \rangle$ on $\mathbb{R}^2 \setminus \{(0,0)\}$.

One can verify that $\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$ (after calculation), suggesting it might be conservative.

However, for the unit circle $C$ traversed counterclockwise:

$$\oint_C \mathbf{F} \cdot d\mathbf{r} = 2\pi \neq 0$$

This shows $\mathbf{F}$ is NOT conservative, despite having zero curl! The issue is that the domain (plane minus origin) is not simply connected.

## Summary of Tests

To determine if $\mathbf{F}$ is conservative in a region $D$:

1. **Check the domain**: Is $D$ simply connected?

2. **Compute curl**: Is $\nabla \times \mathbf{F} = \mathbf{0}$?
   - If NO: $\mathbf{F}$ is not conservative
   - If YES and $D$ is simply connected: $\mathbf{F}$ is conservative

3. **Find potential**: Use sequential integration to find $f$ with $\nabla f = \mathbf{F}$

4. **Verify** (optional): Check that $\nabla f = \mathbf{F}$

## Conclusion

Conservative vector fields can be identified using the curl test: if $\nabla \times \mathbf{F} = \mathbf{0}$ in a simply connected region, then $\mathbf{F}$ is conservative. This allows us to find potential functions systematically and use the Fundamental Theorem for Line Integrals to greatly simplify calculations. The curl measures local rotation, and zero curl characterizes irrotational (conservative) fields. Understanding these concepts is crucial for applications in physics, where conservative forces lead to energy conservation. In the next section, we extend integration to surfaces, introducing parametric surfaces and surface area.
