---
id: math401-topic-7-1
title: "Introduction to Conformal Mappings"
order: 1
---

# Conformal Mappings

Conformal mappings are transformations that preserve angles locally. In complex analysis, analytic functions with non-zero derivatives are conformal, making them powerful tools for solving problems in geometry, physics, and engineering. These mappings transform complicated regions into simpler ones while preserving the geometric structure, allowing us to solve difficult problems by transferring them to domains where solutions are more easily obtained.

## Definition

A function $f: D \to \mathbb{C}$ is **conformal** at $z_0 \in D$ if it preserves angles between curves passing through $z_0$.

**Precisely**: If $\gamma_1$ and $\gamma_2$ are smooth curves intersecting at $z_0$ with angle $\theta$, then $f(\gamma_1)$ and $f(\gamma_2)$ intersect at $f(z_0)$ with the same angle $\theta$ (in both magnitude and orientation).

More formally, if $\gamma_1(t)$ and $\gamma_2(t)$ are two smooth curves with $\gamma_1(0) = \gamma_2(0) = z_0$, the angle between them is defined as:
$$\theta = \arg\left(\frac{\gamma_1'(0)}{\gamma_2'(0)}\right)$$

After applying the conformal map $f$, the angle between the image curves $f \circ \gamma_1$ and $f \circ \gamma_2$ at $f(z_0)$ is:
$$\arg\left(\frac{(f \circ \gamma_1)'(0)}{(f \circ \gamma_2)'(0)}\right) = \arg\left(\frac{f'(z_0)\gamma_1'(0)}{f'(z_0)\gamma_2'(0)}\right) = \arg\left(\frac{\gamma_1'(0)}{\gamma_2'(0)}\right) = \theta$$

The factor $f'(z_0)$ cancels out, showing that angles are preserved when $f'(z_0) \neq 0$.

## Theorem: Analyticity Implies Conformality

**Theorem**: If $f$ is analytic at $z_0$ and $f'(z_0) \neq 0$, then $f$ is conformal at $z_0$.

**Proof**: Write $f(z_0 + h) \approx f(z_0) + f'(z_0)h$ for small $h$.

Multiplication by $f'(z_0) = re^{i\phi}$ rotates by $\phi$ and scales by $r$. Since the transformation is linear (for small $h$), angles are preserved.

More rigorously, consider two curves $\gamma_1$ and $\gamma_2$ passing through $z_0$ with tangent vectors $v_1$ and $v_2$ respectively. Under the mapping $f$, these tangent vectors are transformed to:
$$f'(z_0)v_1 \quad \text{and} \quad f'(z_0)v_2$$

The angle between the transformed vectors is:
$$\arg\left(\frac{f'(z_0)v_1}{f'(z_0)v_2}\right) = \arg\left(\frac{v_1}{v_2}\right)$$

since $f'(z_0)$ is a non-zero complex number that acts as a rotation and scaling, preserving the angle between vectors.

**Converse**: If $f$ is conformal on a domain and has continuous first partial derivatives, then $f$ is analytic.

This remarkable result means that in complex analysis, conformality and analyticity (with non-zero derivative) are essentially equivalent concepts. This is unique to complex functions; real functions of two real variables can be angle-preserving without being differentiable in the complex sense.

## Geometric Interpretation

At points where $f'(z_0) \neq 0$:
- $f$ locally acts like multiplication by $f'(z_0)$
- Rotation by $\arg(f'(z_0))$
- Scaling by $|f'(z_0)|$
- Angles preserved, but distances scaled

This geometric interpretation provides powerful intuition. Near any point where the derivative is non-zero, the conformal map behaves like a similarity transformation: it rotates and scales uniformly in all directions, which is why angles are preserved even though distances change.

The scaling factor $|f'(z_0)|$ is called the **magnification factor** at $z_0$. If $|f'(z_0)| > 1$, the map expands near $z_0$; if $|f'(z_0)| < 1$, it contracts. The rotation angle $\arg(f'(z_0))$ determines how the local coordinate system is rotated.

## Examples

### Linear Transformations

$f(z) = az + b$ with $a \neq 0$:
- Rotation by $\arg(a)$
- Scaling by $|a|$
- Translation by $b$
- Conformal everywhere

**Detailed Analysis**: Let's write $a = re^{i\theta}$ where $r = |a|$ and $\theta = \arg(a)$. Then:
$$f(z) = re^{i\theta}z + b$$

This transformation first rotates the entire complex plane by angle $\theta$, then scales all distances by factor $r$, and finally translates by the vector $b$. Since $f'(z) = a$ is constant and non-zero everywhere, the function is conformal throughout the complex plane.

**Example**: Consider $f(z) = (1+i)z + 2$. Here $a = 1+i = \sqrt{2}e^{i\pi/4}$, so the map rotates by $45°$, scales by $\sqrt{2}$, and translates by $2$. A small circle around any point will be mapped to a circle of radius $\sqrt{2}$ times the original radius, rotated by $45°$.

### Squaring Function

$f(z) = z^2$:
- Conformal except at $z = 0$ (where $f'(0) = 0$)
- Angles at origin are doubled
- Maps rays from origin to rays, doubling angles

**Detailed Analysis**: Since $f'(z) = 2z$, the function is conformal at all points except $z = 0$. Writing $z = re^{i\theta}$, we have:
$$f(z) = r^2e^{2i\theta}$$

This shows that:
- The modulus is squared: $|f(z)| = r^2$
- The argument is doubled: $\arg(f(z)) = 2\theta$

A ray from the origin at angle $\theta$ is mapped to a ray at angle $2\theta$. This means that:
- The right half-plane ($-\pi/2 < \theta < \pi/2$) maps to the entire plane minus the negative real axis
- The upper half-plane ($0 < \theta < \pi$) maps to the entire plane with a slit along the negative real axis
- A sector of angle $\alpha$ is mapped to a sector of angle $2\alpha$

**At the origin**: The derivative $f'(0) = 0$ vanishes, so the mapping is not conformal there. Indeed, two curves meeting at angle $\theta$ at the origin will have images meeting at angle $2\theta$ at the image point (also the origin). The angle is doubled, not preserved.

### Exponential

$f(z) = e^z$:
- Conformal everywhere (entire, $f' = e^z \neq 0$)
- Maps vertical lines to circles, horizontal lines to rays

**Detailed Analysis**: Writing $z = x + iy$, we have:
$$e^z = e^x e^{iy} = e^x(\cos y + i\sin y)$$

This gives us:
- $|e^z| = e^x$ (depends only on real part)
- $\arg(e^z) = y$ (depends only on imaginary part)

Vertical lines $x = c$ are mapped to circles $|w| = e^c$ centered at the origin. Horizontal lines $y = c$ are mapped to rays $\arg(w) = c$ from the origin.

A rectangular grid in the $z$-plane (formed by vertical and horizontal lines) is mapped to a polar grid in the $w$-plane (circles and rays). Since the exponential is conformal everywhere, these grids intersect at right angles in both planes.

**The fundamental strip**: The horizontal strip $-\pi < \text{Im}(z) \leq \pi$ is mapped bijectively onto $\mathbb{C} \setminus \{0\}$. This is because the exponential function has period $2\pi i$, so the strips $-\pi + 2\pi k < \text{Im}(z) \leq \pi + 2\pi k$ for different integers $k$ all map to the same punctured plane.

### Logarithm

$f(z) = \log z$:
- Inverse of exponential
- Multi-valued function requiring branch cuts
- Maps circles to vertical lines, rays to horizontal lines
- Conformal away from origin and branch cut

**Example**: The principal branch $\text{Log } z = \ln|z| + i\arg(z)$ with $-\pi < \arg(z) \leq \pi$ maps the punctured plane $\mathbb{C} \setminus (-\infty, 0]$ conformally onto the horizontal strip $-\pi < \text{Im}(w) < \pi$.

## Applications to Boundary Value Problems

One of the most important applications of conformal mappings is solving boundary value problems for Laplace's equation:
$$\nabla^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$$

If $f: D_1 \to D_2$ is conformal and $u$ is harmonic on $D_2$, then $u \circ f$ is harmonic on $D_1$. This allows us to transfer solutions from simple domains (like disks or half-planes) to more complicated domains.

**Strategy**:
1. Find a conformal map $f$ from the complicated domain $D$ to a simple domain $\Omega$ (like a disk or half-plane)
2. Solve the boundary value problem on $\Omega$ (often straightforward)
3. Pull back the solution to $D$ via $u = v \circ f$

This technique is fundamental in:
- **Electrostatics**: Finding electric potentials in regions with complex boundaries
- **Fluid dynamics**: Computing flow patterns around obstacles
- **Heat conduction**: Solving steady-state heat equations
- **Potential theory**: Finding harmonic functions with prescribed boundary values

## Common Mistakes Students Make

1. **Assuming all analytic functions are conformal everywhere**: Remember that $f'(z_0) \neq 0$ is required. Functions like $f(z) = z^2$ are not conformal at $z = 0$.

2. **Confusing angle preservation with distance preservation**: Conformal maps preserve angles but not distances. The distances are scaled by $|f'(z_0)|$, which typically varies with position.

3. **Forgetting that branch points destroy conformality**: Multi-valued functions like $\sqrt{z}$ or $\log z$ have branch points where they are not conformal, even though they satisfy the Cauchy-Riemann equations elsewhere.

4. **Not checking orientation**: Conformal maps preserve both the magnitude and the orientation (sense) of angles. Some texts use "conformal" for maps that preserve only magnitude, allowing reflections.

5. **Overlooking the extended complex plane**: When working with Möbius transformations, remember to consider the point at infinity and that lines are circles through infinity.

## Summary

- Conformal: preserves angles (magnitude and orientation)
- Analytic with $f' \neq 0$ implies conformal
- Local behavior: rotation + scaling (similarity transformation)
- Critical points ($f' = 0$): not conformal, angles are multiplied
- Applications: solving PDEs, fluid flow, electrostatics, heat conduction
- Harmonic functions compose with conformal maps to give harmonic functions
- The condition $f'(z_0) \neq 0$ is crucial and must always be verified

Conformal mappings represent one of the most beautiful and useful aspects of complex analysis, connecting geometry, analysis, and physics in a profound way. The fact that analytic functions with non-zero derivatives automatically preserve angles is a unique feature of complex analysis that has no direct analog in real analysis.
