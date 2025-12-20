# Center of Mass and Centroids

The center of mass is the balance point of an object—the point where the object's entire mass can be considered concentrated. For continuous objects, finding the center of mass requires integration. This concept has applications in engineering, physics, architecture, and even economics.

## Center of Mass vs. Centroid

- **Center of mass**: The balance point considering mass distribution (varies with density)
- **Centroid**: The geometric center of a region (assumes uniform density)

For objects with uniform density, the center of mass coincides with the centroid. We'll focus primarily on centroids, then extend to variable density.

## Mass and Moments in One Dimension

For discrete point masses $m_1, m_2, \ldots, m_n$ located at positions $x_1, x_2, \ldots, x_n$ on a line:

**Total mass:**
$$m = \sum_{i=1}^n m_i$$

**Moment about the origin:**
$$M = \sum_{i=1}^n x_i m_i$$

**Center of mass:**
$$\bar{x} = \frac{M}{m} = \frac{\sum x_i m_i}{\sum m_i}$$

This is a weighted average of positions.

### Continuous Case: Thin Rod

For a thin rod along the x-axis from $x = a$ to $x = b$ with linear density $\rho(x)$ (mass per unit length):

**Total mass:**
$$m = \int_a^b \rho(x) \, dx$$

**Moment about the origin:**
$$M = \int_a^b x \rho(x) \, dx$$

**Center of mass:**
$$\bar{x} = \frac{M}{m} = \frac{\int_a^b x \rho(x) \, dx}{\int_a^b \rho(x) \, dx}$$

**Example 1:** A rod of length 2 m has density $\rho(x) = 1 + x^2$ kg/m, where $x$ is measured from one end. Find the center of mass.

**Solution:**
$$m = \int_0^2 (1 + x^2) \, dx = \left[x + \frac{x^3}{3}\right]_0^2 = 2 + \frac{8}{3} = \frac{14}{3} \text{ kg}$$

$$M = \int_0^2 x(1 + x^2) \, dx = \int_0^2 (x + x^3) \, dx = \left[\frac{x^2}{2} + \frac{x^4}{4}\right]_0^2 = 2 + 4 = 6$$

$$\bar{x} = \frac{6}{14/3} = \frac{18}{14} = \frac{9}{7} \approx 1.29 \text{ m}$$

The center of mass is closer to the denser (right) end.

## Centroids of Plane Regions

For a lamina (thin plate) occupying region $R$ in the plane with uniform density:

**Area:**
$$A = \iint_R dA$$

**Moments about the axes:**
- **Moment about the y-axis:** $M_y = \iint_R x \, dA$ (measures horizontal distribution)
- **Moment about the x-axis:** $M_x = \iint_R y \, dA$ (measures vertical distribution)

**Centroid:**
$$\bar{x} = \frac{M_y}{A}, \quad \bar{y} = \frac{M_x}{A}$$

For regions bounded by curves, we can reduce these to single integrals.

### Region Between Two Curves

For the region between $y = f(x)$ (top) and $y = g(x)$ (bottom) from $x = a$ to $x = b$:

**Area:**
$$A = \int_a^b [f(x) - g(x)] \, dx$$

**Moments:**
$$M_y = \int_a^b x[f(x) - g(x)] \, dx$$

$$M_x = \int_a^b \frac{1}{2}[f(x)^2 - g(x)^2] \, dx$$

The factor $\frac{1}{2}$ in $M_x$ comes from averaging the $y$-values in a vertical strip from $g(x)$ to $f(x)$.

**Centroid:**
$$\bar{x} = \frac{M_y}{A} = \frac{\int_a^b x[f(x) - g(x)] \, dx}{\int_a^b [f(x) - g(x)] \, dx}$$

$$\bar{y} = \frac{M_x}{A} = \frac{\int_a^b \frac{1}{2}[f(x)^2 - g(x)^2] \, dx}{\int_a^b [f(x) - g(x)] \, dx}$$

### Example 2: Triangle

Find the centroid of the region bounded by $y = 0$, $x = 0$, and $y = 2 - 2x$ (a right triangle with vertices at $(0,0)$, $(1,0)$, and $(0,2)$).

**Solution:** The region is between $y = 0$ (bottom) and $y = 2 - 2x$ (top) for $0 \leq x \leq 1$.

$$A = \int_0^1 (2 - 2x) \, dx = \left[2x - x^2\right]_0^1 = 2 - 1 = 1$$

$$M_y = \int_0^1 x(2 - 2x) \, dx = \int_0^1 (2x - 2x^2) \, dx = \left[x^2 - \frac{2x^3}{3}\right]_0^1 = 1 - \frac{2}{3} = \frac{1}{3}$$

$$M_x = \int_0^1 \frac{1}{2}[(2-2x)^2 - 0] \, dx = \frac{1}{2}\int_0^1 4(1-x)^2 \, dx = 2\int_0^1 (1 - 2x + x^2) \, dx$$

$$= 2\left[x - x^2 + \frac{x^3}{3}\right]_0^1 = 2\left(1 - 1 + \frac{1}{3}\right) = \frac{2}{3}$$

$$\bar{x} = \frac{1/3}{1} = \frac{1}{3}, \quad \bar{y} = \frac{2/3}{1} = \frac{2}{3}$$

The centroid is at $\left(\frac{1}{3}, \frac{2}{3}\right)$, which is $\frac{1}{3}$ of the way along each leg from the right angle—consistent with the known formula for a triangle's centroid.

### Example 3: Parabolic Region

Find the centroid of the region bounded by $y = x^2$ and $y = 4$.

**Solution:** The curves intersect where $x^2 = 4$, so $x = \pm 2$.

By symmetry, $\bar{x} = 0$ (the region is symmetric about the y-axis). We only need to find $\bar{y}$.

$$A = \int_{-2}^2 (4 - x^2) \, dx = 2\int_0^2 (4 - x^2) \, dx = 2\left[4x - \frac{x^3}{3}\right]_0^2 = 2\left(8 - \frac{8}{3}\right) = \frac{32}{3}$$

$$M_x = \int_{-2}^2 \frac{1}{2}[16 - x^4] \, dx = \int_{-2}^2 (8 - \frac{x^4}{2}) \, dx = 2\int_0^2 \left(8 - \frac{x^4}{2}\right) \, dx$$

$$= 2\left[8x - \frac{x^5}{10}\right]_0^2 = 2\left(16 - \frac{32}{10}\right) = 2 \cdot \frac{128}{10} = \frac{128}{5}$$

$$\bar{y} = \frac{128/5}{32/3} = \frac{128}{5} \cdot \frac{3}{32} = \frac{12}{5} = 2.4$$

The centroid is at $(0, 2.4)$.

## Centroids with Respect to y

If the region is more naturally described by horizontal strips (between $x = g(y)$ on the left and $x = f(y)$ on the right, from $y = c$ to $y = d$):

$$A = \int_c^d [f(y) - g(y)] \, dy$$

$$M_x = \int_c^d y[f(y) - g(y)] \, dy$$

$$M_y = \int_c^d \frac{1}{2}[f(y)^2 - g(y)^2] \, dy$$

### Example 4: Same Region, Different Setup

Find the centroid of the region in Example 3 using horizontal strips.

**Solution:** Describe as $x = \sqrt{y}$ (right) and $x = -\sqrt{y}$ (left) for $0 \leq y \leq 4$.

By symmetry, $\bar{x} = 0$.

$$A = \int_0^4 (\sqrt{y} - (-\sqrt{y})) \, dy = \int_0^4 2\sqrt{y} \, dy = 2 \cdot \frac{2y^{3/2}}{3}\bigg|_0^4 = \frac{4}{3} \cdot 8 = \frac{32}{3}$$

$$M_x = \int_0^4 y \cdot 2\sqrt{y} \, dy = 2\int_0^4 y^{3/2} \, dy = 2 \cdot \frac{2y^{5/2}}{5}\bigg|_0^4 = \frac{4}{5} \cdot 32 = \frac{128}{5}$$

$$\bar{y} = \frac{128/5}{32/3} = \frac{12}{5}$$

Same result!

## Pappus's Theorem

**Theorem of Pappus** (Volume): The volume of a solid of revolution generated by rotating a plane region about an external axis is:

$$V = 2\pi \bar{r} A$$

where $A$ is the area of the region and $\bar{r}$ is the distance from the centroid to the axis.

**Theorem of Pappus** (Surface Area): The surface area generated by rotating a curve about an external axis is:

$$S = 2\pi \bar{r} L$$

where $L$ is the length of the curve and $\bar{r}$ is the distance from the centroid of the curve to the axis.

### Example 5: Torus Volume

A circle of radius $r$ is centered at $(R, 0)$ where $R > r$. Find the volume of the torus generated by rotating this circle about the y-axis.

**Solution:** The centroid of the circle is at $(R, 0)$, so $\bar{r} = R$. The area is $A = \pi r^2$.

$$V = 2\pi \bar{r} A = 2\pi R \cdot \pi r^2 = 2\pi^2 R r^2$$

### Example 6: Using Pappus to Find Centroid

A semicircular region of radius $r$ (in the upper half-plane, with diameter along the x-axis) is rotated about the x-axis, generating a sphere of volume $\frac{4}{3}\pi r^3$. Find the centroid of the semicircle.

**Solution:** The area of the semicircle is $A = \frac{1}{2}\pi r^2$. By symmetry, $\bar{x} = 0$. Let $\bar{y}$ be the y-coordinate of the centroid.

By Pappus:
$$V = 2\pi \bar{y} A$$
$$\frac{4}{3}\pi r^3 = 2\pi \bar{y} \cdot \frac{1}{2}\pi r^2$$
$$\frac{4}{3}\pi r^3 = \pi^2 \bar{y} r^2$$
$$\bar{y} = \frac{4r}{3\pi}$$

## Variable Density

For a lamina with density $\delta(x, y)$ (mass per unit area):

**Mass:**
$$m = \iint_R \delta(x, y) \, dA$$

**Moments:**
$$M_y = \iint_R x \delta(x, y) \, dA, \quad M_x = \iint_R y \delta(x, y) \, dA$$

**Center of mass:**
$$\bar{x} = \frac{M_y}{m}, \quad \bar{y} = \frac{M_x}{m}$$

### Example 7: Variable Density

A rectangular lamina occupies $0 \leq x \leq 2$, $0 \leq y \leq 3$ with density $\delta(x, y) = 1 + x$. Find the center of mass.

**Solution:**
$$m = \int_0^2 \int_0^3 (1 + x) \, dy \, dx = \int_0^2 (1+x) \cdot 3 \, dx = 3\left[x + \frac{x^2}{2}\right]_0^2 = 3(2 + 2) = 12$$

$$M_y = \int_0^2 \int_0^3 x(1+x) \, dy \, dx = \int_0^2 x(1+x) \cdot 3 \, dx = 3\int_0^2 (x + x^2) \, dx$$

$$= 3\left[\frac{x^2}{2} + \frac{x^3}{3}\right]_0^2 = 3\left(2 + \frac{8}{3}\right) = 3 \cdot \frac{14}{3} = 14$$

$$M_x = \int_0^2 \int_0^3 y(1+x) \, dy \, dx = \int_0^2 (1+x)\left[\frac{y^2}{2}\right]_0^3 \, dx = \int_0^2 (1+x) \cdot \frac{9}{2} \, dx$$

$$= \frac{9}{2}\left[x + \frac{x^2}{2}\right]_0^2 = \frac{9}{2} \cdot 4 = 18$$

$$\bar{x} = \frac{14}{12} = \frac{7}{6}, \quad \bar{y} = \frac{18}{12} = \frac{3}{2}$$

The center of mass is at $\left(\frac{7}{6}, \frac{3}{2}\right)$, shifted right from the geometric center $(1, 1.5)$ due to higher density on the right.

## Summary

- **Centroid**: Geometric center of a region (uniform density)
- **Center of mass**: Balance point considering mass distribution
- **One dimension**: $\bar{x} = \frac{\int x \rho(x) \, dx}{\int \rho(x) \, dx}$
- **Two dimensions**: $\bar{x} = \frac{M_y}{A}$, $\bar{y} = \frac{M_x}{A}$
- **Moments**: $M_x$ measures vertical distribution, $M_y$ measures horizontal distribution
- **Pappus's Theorem**: Relates volumes/areas of revolution to centroids
- Symmetry simplifies calculations—use it whenever possible
- For variable density, integrate $\delta(x,y)$ instead of just $dA$
