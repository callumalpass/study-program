# Fundamental Theorem for Line Integrals

## Introduction

The Fundamental Theorem of Calculus states that $\int_a^b f'(x) \, dx = f(b) - f(a)$, connecting derivatives and integrals in a profound way. The Fundamental Theorem for Line Integrals provides an analogous result for vector fields, stating that under certain conditions, a line integral depends only on the endpoints of the curve, not on the path taken. This theorem is central to understanding conservative forces in physics and simplifying calculations in vector calculus.

## Gradient Fields

A vector field $\mathbf{F}$ is called a **gradient field** (or **conservative field**) if there exists a scalar function $f$ such that:

$$\mathbf{F} = \nabla f$$

The function $f$ is called a **potential function** for $\mathbf{F}$.

### In Two Dimensions

If $\mathbf{F}(x, y) = \langle P(x, y), Q(x, y) \rangle = \nabla f$, then:

$$P = \frac{\partial f}{\partial x}, \quad Q = \frac{\partial f}{\partial y}$$

### In Three Dimensions

If $\mathbf{F}(x, y, z) = \langle P, Q, R \rangle = \nabla f$, then:

$$P = \frac{\partial f}{\partial x}, \quad Q = \frac{\partial f}{\partial y}, \quad R = \frac{\partial f}{\partial z}$$

### Examples of Gradient Fields

1. **Gravitational potential**: $\mathbf{F} = -\nabla \left(\frac{GMm}{r}\right)$ where $r = \sqrt{x^2 + y^2 + z^2}$

2. **Simple field**: $\mathbf{F}(x, y) = \langle 2xy, x^2 \rangle = \nabla(x^2y)$

3. **Not a gradient field**: $\mathbf{F}(x, y) = \langle -y, x \rangle$ (rotational field)

## The Fundamental Theorem for Line Integrals

**Theorem:** Let $C$ be a smooth curve given by $\mathbf{r}(t)$, $a \leq t \leq b$, and let $\mathbf{F} = \nabla f$ be a gradient field on an open region containing $C$. Then:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = f(\mathbf{r}(b)) - f(\mathbf{r}(a))$$

In other words, the line integral of a gradient field depends only on the values of the potential function at the endpoints.

### Proof

Using the chain rule:

$$\frac{d}{dt}[f(\mathbf{r}(t))] = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t) = \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t)$$

Therefore:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) \, dt = \int_a^b \frac{d}{dt}[f(\mathbf{r}(t))] \, dt$$

By the Fundamental Theorem of Calculus:

$$= f(\mathbf{r}(b)) - f(\mathbf{r}(a))$$

This completes the proof.

### Alternative Notation

If $A = \mathbf{r}(a)$ and $B = \mathbf{r}(b)$ are the initial and final points:

$$\int_C \nabla f \cdot d\mathbf{r} = f(B) - f(A)$$

## Path Independence

A consequence of the fundamental theorem is **path independence**.

**Corollary:** If $\mathbf{F} = \nabla f$, then $\int_C \mathbf{F} \cdot d\mathbf{r}$ has the same value for any two paths from point $A$ to point $B$ (with the same orientation).

**Proof:** Both integrals equal $f(B) - f(A)$.

### Closed Paths

**Corollary:** If $C$ is a closed curve (so $\mathbf{r}(a) = \mathbf{r}(b)$) and $\mathbf{F} = \nabla f$, then:

$$\oint_C \mathbf{F} \cdot d\mathbf{r} = 0$$

**Proof:** $f(\mathbf{r}(b)) - f(\mathbf{r}(a)) = 0$ since the initial and final points are the same.

## Examples

### Example 1: Computing with a Potential Function

Evaluate $\int_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F}(x, y) = \langle 2xy, x^2 + 2y \rangle$ and $C$ is any path from $(1, 0)$ to $(2, 3)$.

**Solution:**

First, check if $\mathbf{F}$ is a gradient field. We need $f$ such that:
$$\frac{\partial f}{\partial x} = 2xy, \quad \frac{\partial f}{\partial y} = x^2 + 2y$$

Integrating the first equation with respect to $x$:
$$f(x, y) = \int 2xy \, dx = x^2y + g(y)$$

where $g(y)$ is an arbitrary function of $y$.

Taking the partial derivative with respect to $y$:
$$\frac{\partial f}{\partial y} = x^2 + g'(y)$$

Comparing with $\frac{\partial f}{\partial y} = x^2 + 2y$:
$$g'(y) = 2y \implies g(y) = y^2 + C$$

Therefore: $f(x, y) = x^2y + y^2$ (ignoring the constant).

By the fundamental theorem:
$$\int_C \mathbf{F} \cdot d\mathbf{r} = f(2, 3) - f(1, 0) = (4 \cdot 3 + 9) - (0) = 21$$

This works for ANY path from $(1, 0)$ to $(2, 3)$!

### Example 2: Gravitational Work

A particle moves in a gravitational field $\mathbf{F} = -\nabla \left(\frac{k}{r}\right)$ where $r = \sqrt{x^2 + y^2 + z^2}$. Find the work done moving from $(1, 0, 0)$ to $(0, 2, 0)$.

**Solution:**

The potential function is $f = -\frac{k}{r} = -\frac{k}{\sqrt{x^2 + y^2 + z^2}}$.

At $(1, 0, 0)$: $f(1, 0, 0) = -\frac{k}{1} = -k$

At $(0, 2, 0)$: $f(0, 2, 0) = -\frac{k}{2}$

$$W = \int_C \mathbf{F} \cdot d\mathbf{r} = f(0, 2, 0) - f(1, 0, 0) = -\frac{k}{2} - (-k) = \frac{k}{2}$$

The work is positive, meaning the gravitational field does positive work (the particle moves to a point farther from the origin, so gravity opposes the motion, but our convention for the sign depends on the direction of the field).

### Example 3: Verifying Path Independence

For $\mathbf{F}(x, y) = \langle e^x\cos y, -e^x\sin y \rangle$, verify that $\int_C \mathbf{F} \cdot d\mathbf{r}$ is path-independent by finding a potential function.

**Solution:**

We need $f$ such that:
$$\frac{\partial f}{\partial x} = e^x\cos y, \quad \frac{\partial f}{\partial y} = -e^x\sin y$$

Integrating the first equation:
$$f(x, y) = \int e^x\cos y \, dx = e^x\cos y + g(y)$$

Taking the partial derivative with respect to $y$:
$$\frac{\partial f}{\partial y} = -e^x\sin y + g'(y)$$

Comparing with $\frac{\partial f}{\partial y} = -e^x\sin y$:
$$g'(y) = 0 \implies g(y) = C$$

Therefore: $f(x, y) = e^x\cos y$ is a potential function, confirming path independence.

## Independence of Path: Characterization

The following statements are equivalent for a vector field $\mathbf{F}$ defined on an open connected region $D$:

1. $\mathbf{F}$ is conservative (i.e., $\mathbf{F} = \nabla f$ for some function $f$)
2. $\int_C \mathbf{F} \cdot d\mathbf{r}$ is independent of path in $D$
3. $\oint_C \mathbf{F} \cdot d\mathbf{r} = 0$ for every closed curve $C$ in $D$

These three conditions are logically equivalent, providing multiple ways to recognize conservative fields.

## Finding Potential Functions

Given $\mathbf{F} = \langle P, Q \rangle$ (or $\langle P, Q, R \rangle$ in 3D), to find $f$ such that $\nabla f = \mathbf{F}$:

### Method 1: Integration

1. Integrate $\frac{\partial f}{\partial x} = P$ with respect to $x$ to get $f(x, y) = \int P \, dx + g(y)$
2. Differentiate with respect to $y$ and set equal to $Q$ to find $g'(y)$
3. Integrate to find $g(y)$
4. Combine to get $f(x, y)$

### Method 2: Line Integral from a Base Point

Choose a convenient base point $(x_0, y_0)$ and define:

$$f(x, y) = \int_{(x_0,y_0)}^{(x,y)} \mathbf{F} \cdot d\mathbf{r}$$

This integral is path-independent (if $\mathbf{F}$ is conservative), so we can choose a convenient path, such as:
- From $(x_0, y_0)$ to $(x, y_0)$ along a horizontal line
- Then from $(x, y_0)$ to $(x, y)$ along a vertical line

### Example 4: Finding a Potential Function

Find a potential function for $\mathbf{F}(x, y, z) = \langle yz, xz, xy \rangle$.

**Solution (Method 1):**

$$\frac{\partial f}{\partial x} = yz \implies f(x, y, z) = xyz + g(y, z)$$

$$\frac{\partial f}{\partial y} = xz + \frac{\partial g}{\partial y} = xz \implies \frac{\partial g}{\partial y} = 0$$

So $g(y, z) = h(z)$ for some function of $z$ alone.

$$\frac{\partial f}{\partial z} = xy + h'(z) = xy \implies h'(z) = 0$$

Therefore $h(z) = C$, and $f(x, y, z) = xyz + C$.

Choosing $C = 0$: $f(x, y, z) = xyz$.

## Conservation of Energy

In physics, conservative forces derive from potential energy: $\mathbf{F} = -\nabla U$ where $U$ is potential energy (note the negative sign convention).

The work-energy theorem states that work equals change in kinetic energy:
$$\int_C \mathbf{F} \cdot d\mathbf{r} = \Delta KE$$

For conservative forces:
$$-[U(B) - U(A)] = KE(B) - KE(A)$$

Rearranging:
$$KE(A) + U(A) = KE(B) + U(B)$$

This is **conservation of mechanical energy**: total energy remains constant.

## Limitations: Simply Connected Regions

The equivalence of the three conditions for conservative fields requires that the region $D$ be **simply connected** (roughly, having no "holes").

For example, $\mathbf{F}(x, y) = \frac{\langle -y, x \rangle}{x^2 + y^2}$ has $\oint_C \mathbf{F} \cdot d\mathbf{r} \neq 0$ for circles around the origin, even though $\mathbf{F}$ satisfies certain conditions that would make it conservative in a simply connected region. The issue is that the domain excludes the origin, creating a "hole."

## Conclusion

The Fundamental Theorem for Line Integrals establishes that line integrals of gradient fields depend only on endpoints, dramatically simplifying calculations. This path independence is equivalent to the existence of a potential function and to closed path integrals being zero. These concepts are crucial in physics, where conservative forces allow energy conservation. In the next section, we explore how to test whether a vector field is conservative and systematically find potential functions.
