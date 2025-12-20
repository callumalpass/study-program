# Elementary Conformal Mappings

Beyond Möbius transformations, several elementary complex functions provide powerful conformal mappings for geometric transformations. Understanding these basic mappings allows constructing solutions to boundary value problems by composing simple transformations.

## Linear Transformations

### Translation

$$f(z) = z + b$$

- Shifts entire plane by vector $b$
- Conformal everywhere
- Preserves shape and size

### Rotation and Scaling

$$f(z) = az, \quad a = re^{i\theta}$$

- Rotates by angle $\theta = \arg(a)$
- Scales by factor $r = |a|$
- Conformal everywhere (if $a \neq 0$)
- Fixes origin

## Power Functions

### Squaring Function

$$f(z) = z^2$$

**Properties**:
- Conformal except at $z = 0$
- Maps rays from origin to rays, doubling angles
- Upper half-plane maps to full plane with slit along negative real axis
- Right half-plane maps to plane with slit along negative real axis

**Example**: Maps sector $0 < \arg(z) < \pi/2$ to upper half-plane.

### General Power

$$f(z) = z^n$$

- Conformal except at origin
- Maps sector $0 < \arg(z) < \alpha$ to sector $0 < \arg(w) < n\alpha$
- Useful for straightening corners

### Root Function

$$f(z) = z^{1/n}$$

- Inverse of $z^n$
- Opens sectors: sector of angle $n\alpha$ maps to sector of angle $\alpha$
- Multi-valued; requires branch cut

## Exponential Function

$$f(z) = e^z$$

**Mapping Properties**:
- Entire function, conformal everywhere
- Vertical line $x = c$ maps to circle $|w| = e^c$
- Horizontal line $y = c$ maps to ray $\arg(w) = c$
- Infinite vertical strip maps to angular sector

**Key Application**: Strip $-\pi < \text{Im}(z) < \pi$ maps bijectively to $\mathbb{C} \setminus \{0\}$.

**Example**: Horizontal strip $a < \text{Im}(z) < b$ maps to angular sector $a < \arg(w) < b$.

## Logarithm Function

$$f(z) = \log z = \ln|z| + i\arg(z)$$

**Properties**:
- Inverse of exponential
- Multi-valued; principal branch defined by $-\pi < \text{Im}(\log z) \leq \pi$
- Conformal on $\mathbb{C} \setminus \{0\}$ away from branch cut
- Maps circles to vertical lines, rays to horizontal lines

**Application**: Angular sector $\alpha < \arg(z) < \beta$ maps to horizontal strip $\alpha < \text{Im}(w) < \beta$.

## Inverse Function

$$f(z) = \frac{1}{z}$$

**Geometric Properties**:
- Inversion in unit circle
- Maps circles/lines to circles/lines
- Exchanges interior and exterior of unit circle
- Reflects across real axis and inverts modulus

**Specific Mappings**:
- Circle $|z| = r$ maps to circle $|w| = 1/r$
- Ray $\arg(z) = \theta$ maps to ray $\arg(w) = -\theta$
- Line through origin maps to itself

## Joukowski Map

$$f(z) = \frac{1}{2}\left(z + \frac{1}{z}\right)$$

**Properties**:
- Maps circles around origin to ellipses
- Unit circle maps to interval $[-1, 1]$
- Conformal except at $z = \pm 1$
- Used in airfoil theory

**Application**: Exterior of unit circle maps to exterior of $[-1, 1]$, modeling flow around airfoils.

## Combining Elementary Mappings

Complex mappings are built by composing elementary ones:

**Strategy**:
1. Identify source and target domains
2. Break transformation into simpler steps
3. Use elementary functions for each step
4. Compose transformations

**Example**: Map upper half-plane to unit disk.

Solution: $f(z) = \frac{z - i}{z + i}$ (Möbius transformation).

## Common Domain Transformations

### Half-Plane to Disk

$$f(z) = \frac{z - z_0}{z - \overline{z_0}}$$

Maps upper half-plane to unit disk, sending $z_0$ to origin.

### Strip to Half-Plane

$$f(z) = e^{\pi z / a}$$

Maps horizontal strip $0 < \text{Im}(z) < a$ to upper half-plane.

### Sector to Half-Plane

$$f(z) = z^\alpha$$

Maps sector $0 < \arg(z) < \pi/\alpha$ to upper half-plane.

## Applications

1. **Electrostatics**: Map domain to simpler region, solve Laplace equation
2. **Fluid Flow**: Transform flow domains
3. **Heat Conduction**: Solve steady-state problems
4. **Potential Theory**: Find harmonic functions

## Summary

- **Linear**: $z + b$, $az$ (translation, rotation, scaling)
- **Power**: $z^n$ (angle multiplication), $z^{1/n}$ (angle division)
- **Exponential**: $e^z$ (strips to sectors)
- **Logarithm**: $\log z$ (sectors to strips)
- **Inversion**: $1/z$ (circles to circles)
- **Joukowski**: $\frac{1}{2}(z + 1/z)$ (airfoil theory)
- Compose elementary mappings to solve complex problems
- Each conformal except at critical points ($f' = 0$)
