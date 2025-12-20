---
id: math301-topic-5-4
title: "Double Integrals in Polar Coordinates"
order: 4
---

# Double Integrals in Polar Coordinates

## Introduction

Many regions in the plane exhibit circular or radial symmetry, making them awkward to describe in Cartesian coordinates but natural in polar coordinates. Double integrals in polar coordinates provide an elegant approach for such regions, often dramatically simplifying both the setup and evaluation of integrals.

## Review of Polar Coordinates

In the **polar coordinate system**, a point in the plane is specified by $(r, \theta)$ where:
- $r$ is the distance from the origin (radius)
- $\theta$ is the angle measured counterclockwise from the positive $x$-axis

The relationship between polar coordinates $(r, \theta)$ and Cartesian coordinates $(x, y)$ is:

$$x = r\cos\theta, \quad y = r\sin\theta$$

$$r = \sqrt{x^2 + y^2}, \quad \theta = \arctan(y/x)$$

### Polar Regions

Regions that are simple to describe in polar coordinates include:
- Disks and annuli (rings)
- Sectors of circles
- Cardioids, rose curves, and other polar curves
- Spirals

A **polar rectangle** is a region of the form:

$$R = \{(r, \theta) \mid a \leq r \leq b, \, \alpha \leq \theta \leq \beta\}$$

This represents the region between two circular arcs of radii $a$ and $b$, and between two rays at angles $\alpha$ and $\beta$.

## The Area Element in Polar Coordinates

The key to double integrals in polar coordinates is determining the correct area element. Unlike Cartesian coordinates where $dA = dx \, dy$, in polar coordinates we have:

$$dA = r \, dr \, d\theta$$

### Derivation of the Area Element

Consider a small polar rectangle with:
- Radial extent from $r$ to $r + \Delta r$
- Angular extent from $\theta$ to $\theta + \Delta\theta$

The area of this region is approximately:
- Inner arc length: $r \Delta\theta$
- Outer arc length: $(r + \Delta r) \Delta\theta$
- Radial extent: $\Delta r$

The area is approximately a rectangle with:
- Width: $r \Delta\theta$ (arc length at radius $r$)
- Height: $\Delta r$
- Area: $\Delta A \approx r \Delta r \Delta\theta$

Taking the limit as $\Delta r, \Delta\theta \to 0$ gives $dA = r \, dr \, d\theta$.

**The factor of $r$ is crucial!** This is the Jacobian of the transformation from Cartesian to polar coordinates, which we'll study more generally later.

## Double Integrals in Polar Coordinates

For a function $f(x, y)$ expressed in polar coordinates as $f(r\cos\theta, r\sin\theta) = F(r, \theta)$:

$$\iint_R f(x, y) \, dA = \iint_R F(r, \theta) \cdot r \, dr \, d\theta$$

For a polar rectangle $R = \{(r, \theta) \mid a \leq r \leq b, \, \alpha \leq \theta \leq \beta\}$:

$$\iint_R F(r, \theta) \, r \, dr \, d\theta = \int_\alpha^\beta \int_a^b F(r, \theta) \cdot r \, dr \, d\theta$$

## Examples with Polar Rectangles

### Example 1: Annular Region

Evaluate $\iint_R (x^2 + y^2) \, dA$ where $R$ is the annulus (ring) $1 \leq x^2 + y^2 \leq 4$.

**Solution:**

In polar coordinates: $x^2 + y^2 = r^2$, and the region is $1 \leq r \leq 2$, $0 \leq \theta \leq 2\pi$.

$$\iint_R (x^2 + y^2) \, dA = \int_0^{2\pi} \int_1^2 r^2 \cdot r \, dr \, d\theta = \int_0^{2\pi} \int_1^2 r^3 \, dr \, d\theta$$

Inner integral:
$$\int_1^2 r^3 \, dr = \left[\frac{r^4}{4}\right]_1^2 = \frac{16}{4} - \frac{1}{4} = \frac{15}{4}$$

Outer integral:
$$\int_0^{2\pi} \frac{15}{4} \, d\theta = \frac{15}{4} \cdot 2\pi = \frac{15\pi}{2}$$

### Example 2: Circular Sector

Find the area of a circular sector of radius $R$ and central angle $\alpha$.

**Solution:**

The region is $0 \leq r \leq R$, $0 \leq \theta \leq \alpha$.

$$\text{Area} = \int_0^\alpha \int_0^R r \, dr \, d\theta$$

Inner integral:
$$\int_0^R r \, dr = \left[\frac{r^2}{2}\right]_0^R = \frac{R^2}{2}$$

Outer integral:
$$\int_0^\alpha \frac{R^2}{2} \, d\theta = \frac{R^2}{2} \cdot \alpha = \frac{R^2\alpha}{2}$$

This confirms the familiar formula for the area of a sector.

## General Polar Regions

More generally, a polar region can be described as:

$$D = \{(r, \theta) \mid \alpha \leq \theta \leq \beta, \, r_1(\theta) \leq r \leq r_2(\theta)\}$$

where $r_1(\theta)$ and $r_2(\theta)$ are continuous functions giving the inner and outer radii for each angle $\theta$.

For such a region:

$$\iint_D f(x, y) \, dA = \int_\alpha^\beta \int_{r_1(\theta)}^{r_2(\theta)} F(r, \theta) \cdot r \, dr \, d\theta$$

### Example 3: Cardioid

Find the area enclosed by the cardioid $r = 1 + \cos\theta$.

**Solution:**

The cardioid is traced once as $\theta$ goes from $0$ to $2\pi$, with $0 \leq r \leq 1 + \cos\theta$.

$$\text{Area} = \int_0^{2\pi} \int_0^{1+\cos\theta} r \, dr \, d\theta$$

Inner integral:
$$\int_0^{1+\cos\theta} r \, dr = \left[\frac{r^2}{2}\right]_0^{1+\cos\theta} = \frac{(1+\cos\theta)^2}{2}$$

Outer integral:
$$\int_0^{2\pi} \frac{(1+\cos\theta)^2}{2} \, d\theta = \frac{1}{2}\int_0^{2\pi} (1 + 2\cos\theta + \cos^2\theta) \, d\theta$$

Using $\cos^2\theta = \frac{1 + \cos(2\theta)}{2}$:

$$= \frac{1}{2}\int_0^{2\pi} \left(1 + 2\cos\theta + \frac{1 + \cos(2\theta)}{2}\right) d\theta$$

$$= \frac{1}{2}\int_0^{2\pi} \left(\frac{3}{2} + 2\cos\theta + \frac{\cos(2\theta)}{2}\right) d\theta$$

$$= \frac{1}{2}\left[\frac{3\theta}{2} + 2\sin\theta + \frac{\sin(2\theta)}{4}\right]_0^{2\pi} = \frac{1}{2} \cdot 3\pi = \frac{3\pi}{2}$$

### Example 4: Region Between Two Circles

Integrate $f(x, y) = \sqrt{x^2 + y^2}$ over the region inside $x^2 + y^2 = 4$ and outside $x^2 + y^2 = 1$.

**Solution:**

In polar coordinates: $f(r, \theta) = r$, with $1 \leq r \leq 2$ and $0 \leq \theta \leq 2\pi$.

$$\iint_D \sqrt{x^2 + y^2} \, dA = \int_0^{2\pi} \int_1^2 r \cdot r \, dr \, d\theta = \int_0^{2\pi} \int_1^2 r^2 \, dr \, d\theta$$

$$= \int_0^{2\pi} \left[\frac{r^3}{3}\right]_1^2 d\theta = \int_0^{2\pi} \frac{7}{3} \, d\theta = \frac{14\pi}{3}$$

## Converting Cartesian Integrals to Polar

### Example 5: Circle in First Quadrant

Evaluate $\int_0^a \int_0^{\sqrt{a^2-x^2}} (x^2 + y^2)^{3/2} \, dy \, dx$.

**Solution:**

The region is the quarter-disk in the first quadrant: $x^2 + y^2 \leq a^2$, $x \geq 0$, $y \geq 0$.

In polar coordinates: $0 \leq r \leq a$, $0 \leq \theta \leq \pi/2$, and $(x^2 + y^2)^{3/2} = r^3$.

$$\int_0^{\pi/2} \int_0^a r^3 \cdot r \, dr \, d\theta = \int_0^{\pi/2} \int_0^a r^4 \, dr \, d\theta$$

$$= \int_0^{\pi/2} \left[\frac{r^5}{5}\right]_0^a d\theta = \int_0^{\pi/2} \frac{a^5}{5} \, d\theta = \frac{a^5}{5} \cdot \frac{\pi}{2} = \frac{\pi a^5}{10}$$

### Example 6: Exponential Integral

Evaluate $\int_0^3 \int_0^{\sqrt{9-x^2}} e^{-x^2-y^2} \, dy \, dx$.

**Solution:**

The region is a quarter-disk of radius 3. In polar coordinates: $0 \leq r \leq 3$, $0 \leq \theta \leq \pi/2$, and $e^{-x^2-y^2} = e^{-r^2}$.

$$\int_0^{\pi/2} \int_0^3 e^{-r^2} \cdot r \, dr \, d\theta$$

For the inner integral, use substitution $u = -r^2$, $du = -2r \, dr$:

$$\int_0^3 r e^{-r^2} \, dr = -\frac{1}{2}[e^{-r^2}]_0^3 = -\frac{1}{2}(e^{-9} - 1) = \frac{1 - e^{-9}}{2}$$

$$\int_0^{\pi/2} \frac{1 - e^{-9}}{2} \, d\theta = \frac{1 - e^{-9}}{2} \cdot \frac{\pi}{2} = \frac{\pi(1 - e^{-9})}{4}$$

## When to Use Polar Coordinates

Polar coordinates are advantageous when:

1. **Circular boundaries**: The region is a disk, annulus, or sector
2. **Radial symmetry**: The function has the form $f(x, y) = g(r) = g(\sqrt{x^2 + y^2})$
3. **Polar curves**: The region is naturally described by polar equations like $r = f(\theta)$
4. **Simplification**: The integrand simplifies significantly when expressed in polar form

### Example 7: Famous Gaussian Integral

One of the most celebrated applications uses polar coordinates to evaluate:

$$I = \int_{-\infty}^{\infty} e^{-x^2} \, dx$$

Consider $I^2 = \left(\int_{-\infty}^{\infty} e^{-x^2} \, dx\right)\left(\int_{-\infty}^{\infty} e^{-y^2} \, dy\right) = \int_{-\infty}^{\infty}\int_{-\infty}^{\infty} e^{-x^2-y^2} \, dx \, dy$.

Converting to polar coordinates over the entire plane:

$$I^2 = \int_0^{2\pi} \int_0^{\infty} e^{-r^2} r \, dr \, d\theta = 2\pi \int_0^{\infty} r e^{-r^2} \, dr = 2\pi \cdot \frac{1}{2} = \pi$$

Therefore: $I = \sqrt{\pi}$.

## Conclusion

Polar coordinates provide a powerful tool for evaluating double integrals over regions with circular or radial symmetry. The key is remembering the area element $dA = r \, dr \, d\theta$, where the factor of $r$ accounts for the geometry of polar coordinates. In the next section, we extend these ideas to three dimensions with triple integrals.
