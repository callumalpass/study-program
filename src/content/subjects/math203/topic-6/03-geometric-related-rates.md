# Geometric Related Rates

Many related rates problems involve geometric shapes—circles, spheres, cylinders, and cones—where dimensions change over time. These problems rely on standard geometry formulas.

## Circles and Spheres

### Expanding Circle

**Problem:** A stone dropped in a pond creates circular ripples. The radius expands at 2 m/s. Find the rate of change of the circle's area and circumference when $r = 10$ m.

**For circumference** ($C = 2\pi r$):
$$\frac{dC}{dt} = 2\pi \frac{dr}{dt} = 2\pi(2) = 4\pi \text{ m/s}$$

This is constant! The circumference grows at the same rate regardless of size.

**For area** ($A = \pi r^2$):
$$\frac{dA}{dt} = 2\pi r \frac{dr}{dt} = 2\pi(10)(2) = 40\pi \text{ m}^2/\text{s}$$

This depends on $r$—larger circles grow faster in area.

### Inflating Sphere

**Problem:** A spherical balloon is inflated so that its volume increases at 4 cm³/s. Find how fast:
(a) the radius increases when $r = 3$ cm
(b) the surface area increases when $r = 3$ cm

**Part (a):** Volume formula $V = \frac{4}{3}\pi r^3$

$$\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$$

$$4 = 4\pi(9)\frac{dr}{dt}$$

$$\frac{dr}{dt} = \frac{4}{36\pi} = \frac{1}{9\pi} \text{ cm/s}$$

**Part (b):** Surface area $S = 4\pi r^2$

$$\frac{dS}{dt} = 8\pi r \frac{dr}{dt} = 8\pi(3)\left(\frac{1}{9\pi}\right) = \frac{24\pi}{9\pi} = \frac{8}{3} \text{ cm}^2/\text{s}$$

**Alternative approach for part (b):** Find $\frac{dS}{dV}$ directly.

From $V = \frac{4}{3}\pi r^3$, we get $r = \left(\frac{3V}{4\pi}\right)^{1/3}$

Then $S = 4\pi r^2 = 4\pi\left(\frac{3V}{4\pi}\right)^{2/3}$

This allows computing $\frac{dS}{dt} = \frac{dS}{dV} \cdot \frac{dV}{dt}$ directly.

## Cylinders

### Filling a Cylinder

**Problem:** A cylindrical tank with radius 2 m is being filled with water at 5 m³/min. How fast is the water level rising?

Since the radius is constant:
$$V = \pi r^2 h = \pi(4)h = 4\pi h$$

$$\frac{dV}{dt} = 4\pi \frac{dh}{dt}$$

$$5 = 4\pi \frac{dh}{dt}$$

$$\frac{dh}{dt} = \frac{5}{4\pi} \approx 0.398 \text{ m/min}$$

### Cylinder with Changing Dimensions

**Problem:** A cylinder has radius $r$ and height $h$ where both are changing. The radius increases at 2 cm/s and height decreases at 3 cm/s. Find $\frac{dV}{dt}$ when $r = 5$ cm and $h = 10$ cm.

$$V = \pi r^2 h$$

Using the product rule:
$$\frac{dV}{dt} = \pi\left(2rh\frac{dr}{dt} + r^2\frac{dh}{dt}\right)$$

$$= \pi\left(2(5)(10)(2) + (25)(-3)\right)$$

$$= \pi(200 - 75) = 125\pi \text{ cm}^3/\text{s}$$

The volume is increasing despite the decreasing height.

## Cones

### The Water-in-Cone Problem

**Problem:** A conical tank (point down) has height 12 ft and top radius 6 ft. Water is pumped in at 2 ft³/min. How fast is the water level rising when $h = 4$ ft?

**Setup using similar triangles:**
$$\frac{r}{h} = \frac{6}{12} = \frac{1}{2}$$

So $r = \frac{h}{2}$

**Volume in terms of $h$ only:**
$$V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi \left(\frac{h}{2}\right)^2 h = \frac{\pi h^3}{12}$$

**Differentiate:**
$$\frac{dV}{dt} = \frac{\pi(3h^2)}{12}\frac{dh}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt}$$

**Substitute ($h = 4$, $\frac{dV}{dt} = 2$):**
$$2 = \frac{\pi(16)}{4}\frac{dh}{dt} = 4\pi\frac{dh}{dt}$$

$$\frac{dh}{dt} = \frac{2}{4\pi} = \frac{1}{2\pi} \approx 0.159 \text{ ft/min}$$

### Draining Cone

**Problem:** The same tank drains at 2 ft³/min. How fast is the level dropping when $h = 4$ ft?

Same equation, but $\frac{dV}{dt} = -2$ (negative because draining):

$$-2 = 4\pi\frac{dh}{dt}$$

$$\frac{dh}{dt} = -\frac{1}{2\pi} \approx -0.159 \text{ ft/min}$$

The negative confirms the level is falling.

## Rectangles and Boxes

### Expanding Rectangle

**Problem:** A rectangle has length increasing at 3 cm/s and width decreasing at 2 cm/s. Find how fast the area changes when $\ell = 10$ cm and $w = 8$ cm.

$$A = \ell w$$

$$\frac{dA}{dt} = \ell\frac{dw}{dt} + w\frac{d\ell}{dt} = (10)(-2) + (8)(3) = -20 + 24 = 4 \text{ cm}^2/\text{s}$$

The area is increasing.

### Expanding Box

**Problem:** A box has dimensions $x$, $y$, $z$ all increasing at 1 cm/s. Find $\frac{dV}{dt}$ when $x = 2$, $y = 3$, $z = 5$ cm.

$$V = xyz$$

$$\frac{dV}{dt} = yz\frac{dx}{dt} + xz\frac{dy}{dt} + xy\frac{dz}{dt}$$

$$= (3)(5)(1) + (2)(5)(1) + (2)(3)(1) = 15 + 10 + 6 = 31 \text{ cm}^3/\text{s}$$

## General Principles

### When Radius is Constant
If only height changes: $\frac{dV}{dt} = (\text{base area})\frac{dh}{dt}$

### When Height is Constant
If only radius changes: differentiate keeping $h$ as constant

### When Multiple Dimensions Change
Use the product rule carefully.

### Similar Triangles Ratio
For cones filled with liquid: the ratio $r/h$ remains constant (equals the tank's ratio), allowing elimination of one variable.

## Summary Table

| Shape | Formula | Derivative (one variable changing) |
|-------|---------|-----------------------------------|
| Circle area | $A = \pi r^2$ | $\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$ |
| Sphere volume | $V = \frac{4}{3}\pi r^3$ | $\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$ |
| Sphere surface | $S = 4\pi r^2$ | $\frac{dS}{dt} = 8\pi r \frac{dr}{dt}$ |
| Cylinder volume | $V = \pi r^2 h$ | $\frac{dV}{dt} = \pi r^2 \frac{dh}{dt}$ (r const.) |
| Cone volume | $V = \frac{1}{3}\pi r^2 h$ | Use similar triangles to eliminate $r$ |

## Summary

- Geometric related rates use standard area/volume formulas
- Similar triangles often reduce cone problems to one variable
- Multiple changing dimensions require the product rule
- Constant dimensions simplify calculations
- The sign of the rate indicates increasing or decreasing
