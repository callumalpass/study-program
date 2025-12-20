---
id: math401-topic-7-3
title: "Mobius Transformations"
order: 3
---

# Elementary Conformal Mappings

Beyond Möbius transformations, several elementary complex functions provide powerful conformal mappings for geometric transformations. Understanding these basic mappings allows constructing solutions to boundary value problems by composing simple transformations. Each elementary mapping has characteristic geometric properties that make it useful for specific applications in physics and engineering.

## Linear Transformations

### Translation

$$f(z) = z + b$$

- Shifts entire plane by vector $b$
- Conformal everywhere
- Preserves shape and size

**Geometric Properties**: Translation is the simplest conformal map. Every point in the complex plane is shifted by the same complex number $b = b_1 + ib_2$, which can be thought of as a vector. The real part $b_1$ shifts horizontally, while the imaginary part $b_2$ shifts vertically.

**Example**: The transformation $f(z) = z + 3 + 2i$ shifts every point 3 units to the right and 2 units up. A circle centered at the origin with radius $r$ is mapped to a circle centered at $3 + 2i$ with the same radius $r$.

**Derivative**: $f'(z) = 1$ for all $z$, so the map is conformal everywhere with magnification factor 1 and rotation angle 0. This means translations preserve both angles and distances—they are isometries of the Euclidean plane.

### Rotation and Scaling

$$f(z) = az, \quad a = re^{i\theta}$$

- Rotates by angle $\theta = \arg(a)$
- Scales by factor $r = |a|$
- Conformal everywhere (if $a \neq 0$)
- Fixes origin

**Geometric Properties**: This transformation combines rotation and uniform scaling. Writing $a = re^{i\theta}$:
- Points are rotated counterclockwise by angle $\theta$ about the origin
- Distances from the origin are multiplied by $r$
- Angles between curves are preserved

**Example 1**: $f(z) = iz$ rotates the plane by $90°$ counterclockwise. The point $1$ maps to $i$, the point $i$ maps to $-1$, etc. The right half-plane maps to the upper half-plane.

**Example 2**: $f(z) = 2z$ scales the plane by factor 2. A circle of radius 1 maps to a circle of radius 2. Every distance from the origin is doubled.

**Example 3**: $f(z) = 2e^{i\pi/4}z = 2(\cos(\pi/4) + i\sin(\pi/4))z = \sqrt{2}(1+i)z$ rotates by $45°$ and scales by 2.

**Derivative**: $f'(z) = a$, which is constant. The magnification factor is $|a| = r$ and the rotation angle is $\arg(a) = \theta$ everywhere.

## Power Functions

### Squaring Function

$$f(z) = z^2$$

**Properties**:
- Conformal except at $z = 0$
- Maps rays from origin to rays, doubling angles
- Upper half-plane maps to full plane with slit along negative real axis
- Right half-plane maps to plane with slit along negative real axis

**Detailed Analysis**: Writing $z = re^{i\theta}$ in polar form:
$$f(z) = z^2 = r^2 e^{2i\theta}$$

This shows:
- Modulus is squared: $|f(z)| = r^2$
- Argument is doubled: $\arg(f(z)) = 2\theta$ (modulo $2\pi$)

**Derivative**: $f'(z) = 2z$, which vanishes at $z = 0$. At the origin, angles are doubled rather than preserved, so the map is not conformal there.

**Example 1**: Maps sector $0 < \arg(z) < \pi/2$ (first quadrant) to upper half-plane $0 < \arg(w) < \pi$.

**Proof**: If $0 < \theta < \pi/2$, then $0 < 2\theta < \pi$, so the image lies in the upper half-plane. Since $f$ is continuous and the sector is connected, the image is connected. As $z$ traces the boundary of the sector (positive real and imaginary axes), $w$ traces the boundary of the upper half-plane (real axis). By continuity and the fact that $f$ is open, the sector maps onto the upper half-plane.

**Example 2**: The upper half-plane $\{z : \text{Im}(z) > 0\}$ (corresponding to $0 < \arg(z) < \pi$) maps to the plane with a slit along the negative real axis (corresponding to $0 < \arg(w) < 2\pi$, which excludes the negative real axis).

**Application**: The squaring function can be used to "straighten corners." A region with a corner can be mapped to a region with a straight boundary.

### General Power

$$f(z) = z^n$$

- Conformal except at origin
- Maps sector $0 < \arg(z) < \alpha$ to sector $0 < \arg(w) < n\alpha$
- Useful for straightening corners

**Analysis**: Writing $z = re^{i\theta}$:
$$f(z) = r^n e^{in\theta}$$

The argument is multiplied by $n$: $\arg(f(z)) = n\arg(z)$.

**Derivative**: $f'(z) = nz^{n-1}$, which vanishes only at $z = 0$.

**Example**: To map a $60°$ sector to a half-plane, use $f(z) = z^3$:
- Sector $0 < \arg(z) < \pi/3$ maps to $0 < \arg(w) < \pi$ (upper half-plane)

**Application in solving PDEs**: If we need to solve Laplace's equation in a sector-shaped region, we can use a power function to map it to a half-plane, solve the simpler problem there, and transform back.

### Root Function

$$f(z) = z^{1/n}$$

- Inverse of $z^n$
- Opens sectors: sector of angle $n\alpha$ maps to sector of angle $\alpha$
- Multi-valued; requires branch cut

**Analysis**: The $n$-th root function is the inverse of $z^n$. It "divides" angles by $n$:
$$\arg(z^{1/n}) = \frac{\arg(z)}{n}$$

**Multi-valued nature**: For any $z \neq 0$, there are $n$ distinct $n$-th roots. The principal branch is typically defined by:
$$z^{1/n} = |z|^{1/n} e^{i\arg(z)/n}, \quad -\pi < \arg(z) \leq \pi$$

**Example**: $f(z) = \sqrt{z}$ maps the upper half-plane $0 < \arg(z) < \pi$ to the first quadrant $0 < \arg(w) < \pi/2$.

**Derivative**: $f'(z) = \frac{1}{n}z^{(1/n)-1} = \frac{1}{n}z^{(1-n)/n}$, which is non-zero away from $z = 0$ and the branch cut.

**Branch cut consideration**: The standard branch cut for $z^{1/n}$ is along the negative real axis. On the branch cut, the function is discontinuous.

## Exponential Function

$$f(z) = e^z$$

**Mapping Properties**:
- Entire function, conformal everywhere
- Vertical line $x = c$ maps to circle $|w| = e^c$
- Horizontal line $y = c$ maps to ray $\arg(w) = c$
- Infinite vertical strip maps to angular sector

**Detailed Analysis**: Writing $z = x + iy$:
$$e^z = e^{x+iy} = e^x(\cos y + i\sin y)$$

This gives:
- $|e^z| = e^x$ (modulus depends only on real part)
- $\arg(e^z) = y$ (argument depends only on imaginary part)

**Derivative**: $f'(z) = e^z$, which is never zero. The function is conformal throughout the complex plane.

**Key Application**: Strip $-\pi < \text{Im}(z) < \pi$ maps bijectively to $\mathbb{C} \setminus \{0\}$.

**Proof**: The exponential has period $2\pi i$: $e^{z+2\pi i} = e^z$. Therefore, horizontal strips of height $2\pi$ all map to the same region. The fundamental strip $-\pi < \text{Im}(z) \leq \pi$ covers exactly one period, so it maps bijectively onto $\mathbb{C} \setminus \{0\}$ (the punctured plane).

**Example 1**: Horizontal strip $0 < \text{Im}(z) < \pi$ maps to upper half-plane $\{w : \text{Im}(w) > 0$ or $\text{Re}(w) > 0, \text{Im}(w) = 0\}$.

More precisely: If $0 < y < \pi$, then $0 < \arg(w) < \pi$, giving the upper half-plane minus the positive real axis. The boundary $y = 0$ maps to the positive real axis, and $y = \pi$ maps to the negative real axis.

**Example 2**: Vertical strip $0 < \text{Re}(z) < 1$ maps to annulus $1 < |w| < e$.

Since $0 < x < 1$ means $1 = e^0 < e^x < e^1 = e$, and the argument $y$ can take any value, we get all points with modulus between 1 and $e$.

**Example 3**: Rectangle $0 < \text{Re}(z) < 1$, $0 < \text{Im}(z) < \pi/2$ maps to region $1 < |w| < e$, $0 < \arg(w) < \pi/2$ (portion of annulus in first quadrant).

## Logarithm Function

$$f(z) = \log z = \ln|z| + i\arg(z)$$

**Properties**:
- Inverse of exponential
- Multi-valued; principal branch defined by $-\pi < \text{Im}(\log z) \leq \pi$
- Conformal on $\mathbb{C} \setminus \{0\}$ away from branch cut
- Maps circles to vertical lines, rays to horizontal lines

**Detailed Analysis**: For the principal branch $\text{Log } z$:
- $\text{Re}(\text{Log } z) = \ln|z|$
- $\text{Im}(\text{Log } z) = \arg(z)$ with $-\pi < \arg(z) \leq \pi$

**Derivative**: $f'(z) = 1/z$, which is non-zero for $z \neq 0$.

**Application**: Angular sector $\alpha < \arg(z) < \beta$ maps to horizontal strip $\alpha < \text{Im}(w) < \beta$.

**Example 1**: The right half-plane $\{z : \text{Re}(z) > 0\}$ (equivalent to $-\pi/2 < \arg(z) < \pi/2$) maps to the horizontal strip $-\pi/2 < \text{Im}(w) < \pi/2$.

**Example 2**: The annulus $1 < |z| < e$ maps to the rectangle $0 < \text{Re}(w) < 1$, $-\pi < \text{Im}(w) \leq \pi$.

Since $\ln 1 = 0$ and $\ln e = 1$, and the argument can be any value in $(-\pi, \pi]$, we get this rectangle.

**Branch cut**: The standard branch cut for the principal logarithm is along the negative real axis $(-\infty, 0]$. The function is discontinuous across this cut: approaching from above gives $\text{Im}(\log z) \to \pi$, while approaching from below gives $\text{Im}(\log z) \to -\pi$.

## Inverse Function

$$f(z) = \frac{1}{z}$$

**Geometric Properties**:
- Inversion in unit circle
- Maps circles/lines to circles/lines
- Exchanges interior and exterior of unit circle
- Reflects across real axis and inverts modulus

**Detailed Analysis**: Writing $z = re^{i\theta}$:
$$f(z) = \frac{1}{z} = \frac{1}{r}e^{-i\theta}$$

This shows:
- Modulus is inverted: $|f(z)| = 1/r$
- Argument is negated: $\arg(f(z)) = -\theta$

**Derivative**: $f'(z) = -1/z^2$, which is non-zero for $z \neq 0$.

**Specific Mappings**:
- Circle $|z| = r$ maps to circle $|w| = 1/r$
- Ray $\arg(z) = \theta$ maps to ray $\arg(w) = -\theta$
- Line through origin maps to itself
- Circle not through origin maps to circle not through origin
- Line not through origin maps to circle through origin
- Circle through origin maps to line not through origin

**Example 1**: The unit disk $|z| < 1$ maps to the exterior of the unit disk $|w| > 1$.

If $|z| < 1$, then $|w| = 1/|z| > 1$.

**Example 2**: The right half-plane $\{z : \text{Re}(z) > 0\}$ maps to a circle.

To see this, note that $\text{Re}(z) > 0$ means $z + \overline{z} > 0$. Writing $w = 1/z$, we have $z = 1/w$, so:
$$\frac{1}{w} + \frac{1}{\overline{w}} > 0$$
$$\frac{\overline{w} + w}{|w|^2} > 0$$
$$\text{Re}(w) > 0$$

So the right half-plane maps to itself! This is a special property of inversion.

Actually, let me reconsider: A half-plane is a special case of a generalized circle (line). Under inversion, it maps to a circle through the origin if it doesn't pass through the origin itself.

**Correction**: The right half-plane does not pass through the origin, so $f(z) = 1/z$ maps it to a circle. Specifically:
$$\{z : \text{Re}(z) > 0\} \to \{w : \text{Re}(1/w) > 0\}$$

But $\text{Re}(1/w) = \text{Re}(w/|w|^2) = \text{Re}(w)/|w|^2$. The condition $\text{Re}(w)/|w|^2 > 0$ is equivalent to $\text{Re}(w) > 0$, so actually the right half-plane maps to itself.

**General formula**: A line $az + \overline{a}\overline{z} + b = 0$ (where $a \in \mathbb{C}$, $b \in \mathbb{R}$) not through the origin ($b \neq 0$) maps under $w = 1/z$ to:
$$\frac{a}{w} + \frac{\overline{a}}{\overline{w}} + b = 0$$
$$\frac{a\overline{w} + \overline{a}w}{|w|^2} + b = 0$$
$$a\overline{w} + \overline{a}w + b|w|^2 = 0$$

This is a circle equation (if $b \neq 0$).

## Joukowski Map

$$f(z) = \frac{1}{2}\left(z + \frac{1}{z}\right)$$

**Properties**:
- Maps circles around origin to ellipses
- Unit circle maps to interval $[-1, 1]$
- Conformal except at $z = \pm 1$
- Used in airfoil theory

**Analysis**: The Joukowski map is fundamental in aerodynamics. Let's analyze its behavior:

**On the unit circle**: If $z = e^{i\theta}$, then:
$$f(e^{i\theta}) = \frac{1}{2}(e^{i\theta} + e^{-i\theta}) = \cos\theta$$

This is real and lies in $[-1, 1]$, so the unit circle collapses to the interval $[-1, 1]$ on the real axis.

**Derivative**:
$$f'(z) = \frac{1}{2}\left(1 - \frac{1}{z^2}\right) = \frac{1}{2} \cdot \frac{z^2 - 1}{z^2}$$

This vanishes when $z^2 = 1$, i.e., at $z = \pm 1$. These are critical points where the map is not conformal.

**On circles $|z| = r$**: Writing $z = re^{i\theta}$:
$$f(z) = \frac{1}{2}\left(re^{i\theta} + \frac{1}{r}e^{-i\theta}\right) = \frac{1}{2}\left[\left(r + \frac{1}{r}\right)\cos\theta + i\left(r - \frac{1}{r}\right)\sin\theta\right]$$

Setting $x = \frac{1}{2}(r + 1/r)\cos\theta$ and $y = \frac{1}{2}(r - 1/r)\sin\theta$, we have:
$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = \cos^2\theta + \sin^2\theta = 1$$

where $a = \frac{1}{2}(r + 1/r)$ and $b = \frac{1}{2}|r - 1/r|$. This is an ellipse with semi-major axis $a$ and semi-minor axis $b$.

**Application**: Exterior of unit circle maps to exterior of $[-1, 1]$, modeling flow around airfoils.

In aerodynamics, fluid flow around a circular cylinder (easily analyzed) can be transformed to flow around an airfoil-shaped object using the Joukowski transformation. This was one of the first successful applications of complex analysis to practical engineering problems.

## Combining Elementary Mappings

Complex mappings are built by composing elementary ones:

**Strategy**:
1. Identify source and target domains
2. Break transformation into simpler steps
3. Use elementary functions for each step
4. Compose transformations

**Example**: Map upper half-plane to unit disk.

**Solution**: We can use the Möbius transformation $f(z) = \frac{z - i}{z + i}$.

Let's verify this works:
- $f(i) = 0$ (center of disk)
- $f(0) = \frac{-i}{i} = -1$ (on unit circle)
- $f(\infty) = 1$ (on unit circle)
- For $\text{Im}(z) > 0$: We can show $|f(z)| < 1$

**Proof that upper half-plane maps to unit disk**: For $\text{Im}(z) > 0$:
$$|f(z)|^2 = \left|\frac{z-i}{z+i}\right|^2 = \frac{|z-i|^2}{|z+i|^2}$$

Writing $z = x + iy$ with $y > 0$:
$$|z-i|^2 = x^2 + (y-1)^2 = x^2 + y^2 - 2y + 1$$
$$|z+i|^2 = x^2 + (y+1)^2 = x^2 + y^2 + 2y + 1$$

Since $y > 0$, we have $x^2 + y^2 + 2y + 1 > x^2 + y^2 - 2y + 1$, so $|f(z)|^2 < 1$.

## Common Domain Transformations

### Half-Plane to Disk

$$f(z) = \frac{z - z_0}{z - \overline{z_0}}$$

Maps upper half-plane to unit disk, sending $z_0$ to origin (where $\text{Im}(z_0) > 0$).

**Verification**:
- $f(z_0) = 0$ ✓
- For real $x$: $f(x) = \frac{x - z_0}{x - \overline{z_0}}$ has modulus 1 (since numerator and denominator are complex conjugates)
- For $\text{Im}(z) > 0$: Similar argument to above shows $|f(z)| < 1$

### Strip to Half-Plane

$$f(z) = e^{\pi z / a}$$

Maps horizontal strip $0 < \text{Im}(z) < a$ to upper half-plane.

**Proof**: If $0 < \text{Im}(z) < a$, then $0 < \text{Im}(\pi z/a) < \pi$, so $0 < \arg(e^{\pi z/a}) < \pi$, which means $\text{Im}(f(z)) \geq 0$ with equality only on the boundary.

### Sector to Half-Plane

$$f(z) = z^\alpha$$

Maps sector $0 < \arg(z) < \pi/\alpha$ to upper half-plane.

**Proof**: If $0 < \arg(z) < \pi/\alpha$, then $0 < \alpha\arg(z) < \pi$, so $0 < \arg(z^\alpha) < \pi$, which is the upper half-plane.

## Applications

1. **Electrostatics**: Map domain to simpler region, solve Laplace equation

   Example: Finding the electric potential in a sector-shaped region can be done by mapping to a half-plane using $z^\alpha$, solving the Dirichlet problem in the half-plane (which has known solutions), then transforming back.

2. **Fluid Flow**: Transform flow domains

   Example: The Joukowski transformation converts flow around a circular cylinder to flow around an airfoil, allowing calculation of lift forces.

3. **Heat Conduction**: Solve steady-state problems

   Example: Heat distribution in an irregularly shaped conductor can be found by mapping to a standard region like a disk or half-plane.

4. **Potential Theory**: Find harmonic functions

   The key principle: If $f: D_1 \to D_2$ is conformal and $u$ is harmonic on $D_2$, then $u \circ f$ is harmonic on $D_1$. This allows transferring harmonic functions between domains.

## Common Mistakes Students Make

1. **Forgetting to check where functions are conformal**: Always verify $f'(z) \neq 0$ at the points of interest.

2. **Ignoring branch cuts**: Multi-valued functions like $\log z$ and $z^{1/n}$ require careful handling of branch cuts.

3. **Not tracking boundaries carefully**: When mapping regions, carefully trace what happens to each boundary component.

4. **Confusing domains and ranges**: Make sure you understand which region is being mapped to which.

5. **Overlooking critical points**: Points where $f'(z) = 0$ are not conformal, even if the function is analytic there.

## Summary

- **Linear**: $z + b$ (translation), $az$ (rotation and scaling)
- **Power**: $z^n$ (angle multiplication by $n$), $z^{1/n}$ (angle division by $n$)
- **Exponential**: $e^z$ (strips to sectors, conformal everywhere)
- **Logarithm**: $\log z$ (sectors to strips, multi-valued)
- **Inversion**: $1/z$ (circles to circles, exchanges interior/exterior)
- **Joukowski**: $\frac{1}{2}(z + 1/z)$ (airfoil theory, circles to ellipses)
- Compose elementary mappings to solve complex problems
- Each conformal except at critical points ($f' = 0$) or branch points
- Essential for solving boundary value problems in physics and engineering

Understanding these elementary mappings and how to compose them is fundamental to applying complex analysis to real-world problems. The ability to transform complicated domains into standard ones (disks, half-planes, strips) where solutions are known is one of the most powerful techniques in applied mathematics.
