# Volumes of Solids of Revolution: Disk and Washer Methods

When a region in the plane is rotated about a line (axis of revolution), it sweeps out a three-dimensional solid. Computing the volume of such solids is one of the most elegant applications of integration. The disk and washer methods provide systematic techniques for finding these volumes by slicing the solid perpendicular to the axis of revolution.

## The Disk Method

The **disk method** applies when rotating a region between a curve and the axis of revolution, creating a solid with no hole through the middle.

### Rotation About the x-axis

Consider rotating the region under the curve $y = f(x)$ from $x = a$ to $x = b$ about the x-axis, where $f(x) \geq 0$.

When we slice the solid perpendicular to the x-axis at position $x$, we get a circular disk with:
- Radius: $r = f(x)$
- Area: $A(x) = \pi [f(x)]^2$
- Thickness: $dx$

The volume of one thin disk is $dV = \pi [f(x)]^2 \, dx$, so the total volume is:

$$V = \int_a^b \pi [f(x)]^2 \, dx$$

**Example 1:** Find the volume when the region under $y = \sqrt{x}$ from $x = 0$ to $x = 4$ is rotated about the x-axis.

**Solution:**
$$V = \int_0^4 \pi (\sqrt{x})^2 \, dx = \pi \int_0^4 x \, dx = \pi \left[\frac{x^2}{2}\right]_0^4 = \pi \cdot \frac{16}{2} = 8\pi$$

The volume is $8\pi$ cubic units.

### Rotation About the y-axis

For rotation about the y-axis, we integrate with respect to $y$. If the region is bounded by $x = g(y)$ from $y = c$ to $y = d$:

$$V = \int_c^d \pi [g(y)]^2 \, dy$$

**Example 2:** Find the volume when the region bounded by $x = y^2$ and $x = 4$ is rotated about the y-axis.

**Solution:** First, find the intersection points: $y^2 = 4$ gives $y = \pm 2$.

The outer radius is $R = 4$ and the inner radius is $r = y^2$ (this is actually a washer—see next section). But if we consider just rotating $x = 4$ alone from $y = -2$ to $y = 2$:

For the region between the parabola and the y-axis, we use:
$$V = \int_{-2}^2 \pi (y^2)^2 \, dy = 2\pi \int_0^2 y^4 \, dy = 2\pi \left[\frac{y^5}{5}\right]_0^2 = 2\pi \cdot \frac{32}{5} = \frac{64\pi}{5}$$

## The Washer Method

When the solid has a hole through the middle (like a donut or washer), we need the **washer method**. This occurs when rotating a region between two curves.

### Formula for Washers

For rotation about the x-axis, if the region is between $y = f(x)$ (outer) and $y = g(x)$ (inner) from $x = a$ to $x = b$:

$$V = \int_a^b \pi \left([f(x)]^2 - [g(x)]^2\right) \, dx$$

The integrand represents:
- Outer disk area: $\pi [f(x)]^2$
- Inner disk area: $\pi [g(x)]^2$
- Washer area: $\pi \left([f(x)]^2 - [g(x)]^2\right) = \pi(R^2 - r^2)$

**Example 3:** Find the volume when the region between $y = x$ and $y = x^2$ is rotated about the x-axis.

**Solution:** First, find intersections: $x = x^2$ gives $x = 0$ or $x = 1$.

For $0 \leq x \leq 1$, we have $x \geq x^2$, so:
- Outer radius: $R = x$
- Inner radius: $r = x^2$

$$V = \int_0^1 \pi(x^2 - x^4) \, dx = \pi \left[\frac{x^3}{3} - \frac{x^5}{5}\right]_0^1 = \pi\left(\frac{1}{3} - \frac{1}{5}\right) = \pi \cdot \frac{2}{15} = \frac{2\pi}{15}$$

### Rotation About Horizontal Lines

For rotation about the line $y = k$ (instead of the x-axis), adjust the radii:
- If $f(x) \geq g(x) \geq k$: outer radius $R = f(x) - k$, inner radius $r = g(x) - k$
- If $k \geq f(x) \geq g(x)$: outer radius $R = k - g(x)$, inner radius $r = k - f(x)$

**Example 4:** Rotate the region between $y = x^2$ and $y = 4$ about the line $y = 5$.

**Solution:** The curves intersect where $x^2 = 4$, so $x = \pm 2$.

Since both curves are below $y = 5$:
- Outer radius: $R = 5 - x^2$ (distance from $y = x^2$ to $y = 5$)
- Inner radius: $r = 5 - 4 = 1$ (distance from $y = 4$ to $y = 5$)

$$V = \int_{-2}^2 \pi\left[(5-x^2)^2 - 1^2\right] \, dx = 2\pi \int_0^2 \left[(5-x^2)^2 - 1\right] \, dx$$

$$= 2\pi \int_0^2 (25 - 10x^2 + x^4 - 1) \, dx = 2\pi \int_0^2 (24 - 10x^2 + x^4) \, dx$$

$$= 2\pi \left[24x - \frac{10x^3}{3} + \frac{x^5}{5}\right]_0^2 = 2\pi\left(48 - \frac{80}{3} + \frac{32}{5}\right)$$

$$= 2\pi\left(\frac{720 - 400 + 96}{15}\right) = 2\pi \cdot \frac{416}{15} = \frac{832\pi}{15}$$

### Rotation About Vertical Lines

For rotation about the line $x = h$, express everything in terms of $y$ and integrate with respect to $y$.

**Example 5:** Rotate the region between $x = y^2$ and $x = 2y$ about the line $x = -1$.

**Solution:** The curves intersect where $y^2 = 2y$, giving $y = 0$ and $y = 2$.

For $0 \leq y \leq 2$, we have $2y \geq y^2$. Both curves are to the right of $x = -1$:
- Outer radius: $R = 2y - (-1) = 2y + 1$
- Inner radius: $r = y^2 - (-1) = y^2 + 1$

$$V = \int_0^2 \pi\left[(2y+1)^2 - (y^2+1)^2\right] \, dy$$

$$= \pi \int_0^2 \left[4y^2 + 4y + 1 - y^4 - 2y^2 - 1\right] \, dy$$

$$= \pi \int_0^2 (2y^2 + 4y - y^4) \, dy = \pi\left[\frac{2y^3}{3} + 2y^2 - \frac{y^5}{5}\right]_0^2$$

$$= \pi\left(\frac{16}{3} + 8 - \frac{32}{5}\right) = \pi\left(\frac{80 + 120 - 96}{15}\right) = \frac{104\pi}{15}$$

## Choosing Between Disk and Washer

- **Use the disk method** when there's no hole—rotating a region bounded by one curve and an axis
- **Use the washer method** when there's a hole—rotating a region between two curves
- The washer method generalizes the disk method (set inner radius to zero for a disk)

## Strategy for Setting Up Volume Integrals

1. **Sketch the region** and identify the axis of revolution
2. **Determine the orientation**: integrate with respect to $x$ or $y$?
   - Perpendicular slices to the axis determine this
   - For rotation about horizontal line: use $dx$
   - For rotation about vertical line: use $dy$
3. **Find the limits of integration** (intersection points)
4. **Identify outer and inner radii** as functions
5. **Write the integral**: $V = \int \pi(R^2 - r^2) \, dx$ or $dy$
6. **Evaluate the integral**

## Summary

- **Disk method**: $V = \int_a^b \pi [f(x)]^2 \, dx$ for rotation about the x-axis
- **Washer method**: $V = \int_a^b \pi(R^2 - r^2) \, dx$ for regions between curves
- **Key principle**: Cross-sectional areas are disks or washers perpendicular to the axis
- **Radii are distances** from the axis of revolution to the curves
- Always sketch the region and visualize the solid before setting up integrals
