---
id: math204-t4-hydrostatic
title: "Hydrostatic Force"
order: 6
---

# Hydrostatic Force and Pressure

When a surface is submerged in a fluid, it experiences force due to the fluid's pressure. This **hydrostatic force** varies with depth, requiring integration to compute. Applications range from dam design to submarine engineering, where understanding pressure distribution is critical for structural integrity.

## Pressure and Depth

**Pressure** is force per unit area. In a fluid at rest, pressure increases with depth due to the weight of the fluid above.

### Pressure Formula

At depth $h$ below the surface of a fluid:

$$P = \rho g h = \delta h$$

where:
- $\rho$ = density of the fluid (kg/m³ or slugs/ft³)
- $g$ = gravitational acceleration (9.8 m/s² or 32 ft/s²)
- $\delta = \rho g$ = weight density (N/m³ or lb/ft³)
- $h$ = depth below the surface

**Key insight:** Pressure is the same at all points at the same depth (Pascal's Principle).

**Common values:**
- Water: $\delta = 9800$ N/m³ = 62.5 lb/ft³
- Seawater: $\delta = 10,000$ N/m³ = 64 lb/ft³
- Gasoline: $\delta \approx 42$ lb/ft³

### Atmospheric Pressure

At the surface, atmospheric pressure adds approximately:
- 101,325 Pa = 101.3 kPa (SI)
- 14.7 lb/in² (psi) = 2116 lb/ft²

For most hydrostatic force problems, we compute **gauge pressure** (pressure relative to atmosphere) and ignore atmospheric pressure, since it acts on both sides of a surface.

## Hydrostatic Force on a Horizontal Surface

For a horizontal surface at depth $h$ with area $A$:

$$F = P \cdot A = \delta h A$$

This is straightforward because pressure is constant across the horizontal surface.

**Example 1:** A rectangular pool bottom is 10 m by 5 m at depth 2 m. Find the hydrostatic force on the bottom.

**Solution:**
$$F = \delta h A = 9800 \cdot 2 \cdot (10 \times 5) = 9800 \cdot 2 \cdot 50 = 980,000 \text{ N} = 980 \text{ kN}$$

## Hydrostatic Force on a Vertical Surface

For a vertical surface, pressure varies with depth, so we must integrate.

### Setup

Consider a vertical surface submerged in a fluid. Set up coordinates with:
- Origin at the fluid surface
- $y$-axis pointing down (depth is positive $y$)
- The submerged surface extends from depth $y = a$ to $y = b$

A thin horizontal strip at depth $y$ with thickness $dy$ has:
- **Pressure**: $P(y) = \delta y$
- **Width**: $w(y)$ (depends on the shape of the surface)
- **Area**: $dA = w(y) \, dy$
- **Force**: $dF = P(y) \, dA = \delta y \cdot w(y) \, dy$

**Total force:**

$$F = \int_a^b \delta y \cdot w(y) \, dy$$

### Example 2: Rectangular Dam

A vertical dam face is rectangular, 20 m wide and 15 m high, and holds back water to its full height. Find the hydrostatic force on the dam.

**Solution:** Place origin at the water surface. The dam extends from $y = 0$ to $y = 15$, with constant width $w = 20$ m.

$$F = \int_0^{15} 9800 \cdot y \cdot 20 \, dy = 196000 \int_0^{15} y \, dy = 196000 \cdot \frac{y^2}{2}\bigg|_0^{15}$$

$$= 196000 \cdot \frac{225}{2} = 22,050,000 \text{ N} = 22.05 \text{ MN}$$

### Example 3: Trapezoidal Gate

A trapezoidal gate in a dam has a top edge (at the surface) of width 4 m and a bottom edge (at depth 6 m) of width 10 m. Find the hydrostatic force.

**Solution:** The width varies linearly with depth. At $y = 0$, $w = 4$; at $y = 6$, $w = 10$.

The width function is:
$$w(y) = 4 + \frac{10 - 4}{6}y = 4 + y$$

$$F = \int_0^6 9800 \cdot y(4 + y) \, dy = 9800 \int_0^6 (4y + y^2) \, dy$$

$$= 9800\left[2y^2 + \frac{y^3}{3}\right]_0^6 = 9800\left(72 + 72\right) = 9800 \cdot 144 = 1,411,200 \text{ N}$$

## Tilted or Inclined Surfaces

For surfaces that are tilted (not vertical), we must account for the angle.

### Setup for Inclined Surface

If a surface makes angle $\theta$ with the horizontal:
- A strip at depth $y$ has **pressure** $P = \delta y$
- If the strip has width $w(y)$ measured **along the surface**, its area is $dA = w(y) \, ds$
- But we need to relate $y$ (depth) to position along the surface

Often easier: use a coordinate along the surface and convert to depth.

**Example 4:** A triangular plate with base 4 m and height 3 m is submerged vertically with its base at the surface and vertex pointing down. Find the force.

**Solution:** Place origin at the surface. At depth $y$, the width of the triangle is determined by similar triangles.

At $y = 0$ (top), width is 4 m. At $y = 3$ (bottom), width is 0. The width decreases linearly:
$$w(y) = 4 - \frac{4}{3}y = \frac{4(3 - y)}{3}$$

$$F = \int_0^3 9800 \cdot y \cdot \frac{4(3-y)}{3} \, dy = \frac{39200}{3} \int_0^3 y(3 - y) \, dy$$

$$= \frac{39200}{3} \int_0^3 (3y - y^2) \, dy = \frac{39200}{3}\left[\frac{3y^2}{2} - \frac{y^3}{3}\right]_0^3$$

$$= \frac{39200}{3}\left(\frac{27}{2} - 9\right) = \frac{39200}{3} \cdot \frac{9}{2} = 58,800 \text{ N}$$

### Example 5: Circular Porthole

A circular porthole with radius 0.5 m is centered at depth 10 m on the vertical side of a submarine. Find the force.

**Solution:** Place origin at the center of the porthole. Let $y$ measure depth, with the porthole center at $y = 10$.

The porthole extends from $y = 9.5$ to $y = 10.5$. At depth $y$, the horizontal distance from center is:
$$x = \sqrt{0.5^2 - (y - 10)^2} = \sqrt{0.25 - (y - 10)^2}$$

The width at depth $y$ is $w(y) = 2x = 2\sqrt{0.25 - (y - 10)^2}$.

$$F = \int_{9.5}^{10.5} 9800 \cdot y \cdot 2\sqrt{0.25 - (y-10)^2} \, dy$$

Substitution: $u = y - 10$, $du = dy$. When $y = 9.5$, $u = -0.5$; when $y = 10.5$, $u = 0.5$.

$$F = \int_{-0.5}^{0.5} 9800(u + 10) \cdot 2\sqrt{0.25 - u^2} \, du$$

$$= 19600 \int_{-0.5}^{0.5} u\sqrt{0.25 - u^2} \, du + 196000 \int_{-0.5}^{0.5} \sqrt{0.25 - u^2} \, du$$

The first integral is zero (odd function over symmetric interval). The second integral is the area of a semicircle with radius 0.5:

$$\int_{-0.5}^{0.5} \sqrt{0.25 - u^2} \, du = \frac{1}{2}\pi(0.5)^2 = \frac{\pi}{8}$$

$$F = 196000 \cdot \frac{\pi}{8} = 24500\pi \approx 76,969 \text{ N}$$

Alternatively, notice the force on a horizontal surface at depth 10 m with area $\pi(0.5)^2$:
$$F = 9800 \cdot 10 \cdot \frac{\pi}{4} = 24500\pi \text{ N}$$

This works because the porthole is small enough that depth variation is negligible—but the integral is the rigorous approach.

## Moments and Center of Pressure

The **center of pressure** is the point where the resultant force acts. For a vertical surface, it's below the centroid because pressure increases with depth.

The **moment** about the surface (at $y = 0$) is:
$$M = \int_a^b y \cdot dF = \int_a^b \delta y^2 w(y) \, dy$$

The center of pressure is at:
$$\bar{y} = \frac{M}{F} = \frac{\int_a^b \delta y^2 w(y) \, dy}{\int_a^b \delta y w(y) \, dy}$$

**Example 6:** Find the center of pressure for the rectangular dam in Example 2.

**Solution:**
$$M = \int_0^{15} 9800 \cdot y^2 \cdot 20 \, dy = 196000 \int_0^{15} y^2 \, dy = 196000 \cdot \frac{y^3}{3}\bigg|_0^{15}$$

$$= 196000 \cdot \frac{3375}{3} = 220,500,000$$

$$\bar{y} = \frac{220,500,000}{22,050,000} = 10 \text{ m}$$

The center of pressure is at depth 10 m, which is $\frac{2}{3}$ of the total depth—consistent with the centroid of a triangle (the pressure distribution is triangular).

## Strategy for Hydrostatic Force Problems

1. **Sketch the surface** and choose coordinates (usually origin at fluid surface, $y$ pointing down)
2. **Identify depth range** $[a, b]$
3. **Find the width function** $w(y)$ at depth $y$
4. **Set up the integral**: $F = \int_a^b \delta y \cdot w(y) \, dy$
5. **Evaluate** using appropriate techniques
6. **Check units**: Force in newtons (N) or pounds (lb)

## Common Mistakes

1. **Forgetting that pressure varies**: Don't use $F = PA$ for vertical surfaces
2. **Using wrong coordinate**: Ensure $y$ represents depth, not position along surface
3. **Sign errors**: Depth should be positive downward
4. **Units**: Mixing metric and imperial, or forgetting to convert

## Summary

- **Pressure at depth**: $P = \delta h$, where $\delta$ is weight density
- **Horizontal surfaces**: $F = \delta h A$ (constant pressure)
- **Vertical surfaces**: $F = \int_a^b \delta y \cdot w(y) \, dy$ (varying pressure)
- The integrand represents pressure times area of a thin strip
- Pressure increases linearly with depth, leading to parabolic or higher-order integrals
- Center of pressure is below the geometric centroid for vertical surfaces
- Applications: dam design, underwater structures, portholes, gates
