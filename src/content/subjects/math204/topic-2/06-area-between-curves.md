# Area Between Curves

One of the most practical applications of definite integrals is finding the area of regions bounded by curves. While the basic definite integral gives the area between a curve and the $x$-axis, we often need to find areas between two curves, or areas bounded by multiple curves. This requires careful setup of integrals and strategic choices about integration direction.

## Area Between Two Curves

Consider two continuous functions $f(x)$ and $g(x)$ on an interval $[a, b]$ where $f(x) \geq g(x)$ for all $x$ in $[a, b]$. The area of the region between these curves is:

$$A = \int_a^b [f(x) - g(x)] \, dx$$

**Interpretation:** At each $x$-value, the vertical "slice" has height $f(x) - g(x)$. We integrate (sum up) these heights over the interval to get the total area.

**Key insight:** We subtract the lower function from the upper function. The result is always positive because $f(x) \geq g(x)$.

### Formula for Area Between Curves (Vertical Slices)

$$A = \int_a^b [\text{upper curve} - \text{lower curve}] \, dx$$

## Basic Examples

**Example 1:** Find the area between $f(x) = x^2$ and $g(x) = x$ from $x = 0$ to $x = 1$.

First, determine which function is on top. At $x = 0.5$: $f(0.5) = 0.25$ and $g(0.5) = 0.5$, so $g(x) \geq f(x)$ on this interval.

$$A = \int_0^1 [x - x^2] \, dx = \left[ \frac{x^2}{2} - \frac{x^3}{3} \right]_0^1 = \frac{1}{2} - \frac{1}{3} = \frac{3 - 2}{6} = \frac{1}{6}$$

**Example 2:** Find the area between $y = \sqrt{x}$ and $y = x^2$ from $x = 0$ to $x = 1$.

At $x = 0.5$: $\sqrt{0.5} \approx 0.707$ and $(0.5)^2 = 0.25$, so $\sqrt{x} \geq x^2$ on $[0, 1]$.

$$A = \int_0^1 [\sqrt{x} - x^2] \, dx = \int_0^1 [x^{1/2} - x^2] \, dx$$
$$= \left[ \frac{2x^{3/2}}{3} - \frac{x^3}{3} \right]_0^1 = \frac{2}{3} - \frac{1}{3} = \frac{1}{3}$$

## Finding Intersection Points

Often, the limits of integration are determined by where the curves intersect. To find intersection points, solve $f(x) = g(x)$.

**Example 3:** Find the area between $y = x^2$ and $y = 2x + 3$.

Find intersections:
$$x^2 = 2x + 3$$
$$x^2 - 2x - 3 = 0$$
$$(x - 3)(x + 1) = 0$$

So $x = -1$ or $x = 3$.

Determine which is on top: at $x = 0$, we have $x^2 = 0$ and $2x + 3 = 3$, so the line is above the parabola.

$$A = \int_{-1}^3 [(2x + 3) - x^2] \, dx = \int_{-1}^3 (-x^2 + 2x + 3) \, dx$$
$$= \left[ -\frac{x^3}{3} + x^2 + 3x \right]_{-1}^3$$
$$= \left[-9 + 9 + 9\right] - \left[\frac{1}{3} + 1 - 3\right] = 9 - \left(-\frac{5}{3}\right) = 9 + \frac{5}{3} = \frac{32}{3}$$

## Curves That Cross

When curves cross each other within the region of interest, we must split the integral at the crossing points.

**Example 4:** Find the area between $y = \sin(x)$ and $y = \cos(x)$ from $x = 0$ to $x = \frac{\pi}{2}$.

Find where they intersect:
$$\sin(x) = \cos(x)$$
$$\tan(x) = 1$$
$$x = \frac{\pi}{4}$$

On $[0, \pi/4]$: $\cos(x) \geq \sin(x)$

On $[\pi/4, \pi/2]$: $\sin(x) \geq \cos(x)$

$$A = \int_0^{\pi/4} [\cos(x) - \sin(x)] \, dx + \int_{\pi/4}^{\pi/2} [\sin(x) - \cos(x)] \, dx$$

$$= \left[ \sin(x) + \cos(x) \right]_0^{\pi/4} + \left[ -\cos(x) - \sin(x) \right]_{\pi/4}^{\pi/2}$$

$$= \left[\frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} - 0 - 1\right] + \left[0 - 1 - \left(-\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}\right)\right]$$

$$= [\sqrt{2} - 1] + [-1 + \sqrt{2}] = 2\sqrt{2} - 2 = 2(\sqrt{2} - 1)$$

## Horizontal Slicing (Integrating with Respect to $y$)

Sometimes it's easier to integrate with respect to $y$ instead of $x$. This is especially useful when:
- Functions are naturally expressed as $x = f(y)$
- Vertical slicing would require splitting the region into multiple integrals
- The region is easier to describe in terms of horizontal slices

For horizontal slices between $y = c$ and $y = d$:

$$A = \int_c^d [\text{right curve} - \text{left curve}] \, dy$$

**Example 5:** Find the area between $x = y^2$ and $x = y + 2$.

Find intersections by setting $y^2 = y + 2$:
$$y^2 - y - 2 = 0$$
$$(y - 2)(y + 1) = 0$$

So $y = -1$ or $y = 2$.

For $y = 0$: $x = 0$ (parabola) and $x = 2$ (line), so the line is to the right.

Using horizontal slices:
$$A = \int_{-1}^2 [(y + 2) - y^2] \, dy = \left[ \frac{y^2}{2} + 2y - \frac{y^3}{3} \right]_{-1}^2$$
$$= \left[2 + 4 - \frac{8}{3}\right] - \left[\frac{1}{2} - 2 + \frac{1}{3}\right]$$
$$= \left[6 - \frac{8}{3}\right] - \left[\frac{1}{2} - 2 + \frac{1}{3}\right]$$
$$= \frac{18 - 8}{3} - \frac{3 - 12 + 2}{6} = \frac{10}{3} - \left(-\frac{7}{6}\right) = \frac{20 + 7}{6} = \frac{27}{6} = \frac{9}{2}$$

**Why horizontal slicing is better here:** If we used vertical slicing, we'd need to split the region because the parabola $x = y^2$ is not a function of $x$ (it fails the vertical line test). We'd need to write $y = \pm\sqrt{x}$ and handle the upper and lower branches separately.

## Strategy for Setting Up Area Integrals

1. **Sketch the region:** Draw the curves to visualize the bounded region.

2. **Find intersection points:** Solve equations to find where curves meet.

3. **Choose integration direction:**
   - Vertical slices (integrate with respect to $x$) if the region is naturally bounded by functions of $x$
   - Horizontal slices (integrate with respect to $y$) if the region is naturally bounded by functions of $y$, or if vertical slicing requires multiple integrals

4. **Identify which curve is "upper" or "right":** Determine which function is larger in the region.

5. **Set up the integral:**
   - Vertical: $A = \int_a^b [\text{top} - \text{bottom}] \, dx$
   - Horizontal: $A = \int_c^d [\text{right} - \text{left}] \, dy$

6. **Evaluate:** Use the Fundamental Theorem of Calculus.

## Complex Regions

**Example 6:** Find the area of the region bounded by $y = x^2 - 2$ and $y = -x^2 + 4$.

Find intersections:
$$x^2 - 2 = -x^2 + 4$$
$$2x^2 = 6$$
$$x^2 = 3$$
$$x = \pm\sqrt{3}$$

The parabola $y = -x^2 + 4$ opens downward and is on top.

$$A = \int_{-\sqrt{3}}^{\sqrt{3}} [(-x^2 + 4) - (x^2 - 2)] \, dx = \int_{-\sqrt{3}}^{\sqrt{3}} (-2x^2 + 6) \, dx$$

Since the integrand is even:
$$A = 2\int_0^{\sqrt{3}} (-2x^2 + 6) \, dx = 2 \left[ -\frac{2x^3}{3} + 6x \right]_0^{\sqrt{3}}$$
$$= 2 \left[ -\frac{2(\sqrt{3})^3}{3} + 6\sqrt{3} \right] = 2 \left[ -\frac{2 \cdot 3\sqrt{3}}{3} + 6\sqrt{3} \right]$$
$$= 2 \left[ -2\sqrt{3} + 6\sqrt{3} \right] = 2 \cdot 4\sqrt{3} = 8\sqrt{3}$$

## Example: Region Bounded by Three Curves

**Example 7:** Find the area of the region in the first quadrant bounded by $y = x$, $y = 2x$, and $x = 2$.

The region is a triangle with vertices at $(0, 0)$, $(2, 2)$, and $(2, 4)$.

$$A = \int_0^2 [2x - x] \, dx = \int_0^2 x \, dx = \left[ \frac{x^2}{2} \right]_0^2 = 2$$

Alternatively, using geometry: This is a triangle with base 2 (from $x = 0$ to $x = 2$) and height 2 (from $y = 2$ to $y = 4$), so area is $\frac{1}{2} \cdot 2 \cdot 2 = 2$.

## Summary

- **Area between curves:** $A = \int_a^b [\text{upper} - \text{lower}] \, dx$ (vertical slices)
- **Horizontal slicing:** $A = \int_c^d [\text{right} - \text{left}] \, dy$ when more convenient
- **Find intersection points** by solving $f(x) = g(x)$ or $f(y) = g(y)$
- **When curves cross:** split the integral at crossing points
- **Strategy:**
  1. Sketch the region
  2. Find intersections
  3. Choose vertical or horizontal slicing
  4. Identify which curve is upper/right
  5. Set up and evaluate integral
- Always **sketch the region** before setting up integrals—visualization prevents errors
- Check your answer with geometric formulas when possible
