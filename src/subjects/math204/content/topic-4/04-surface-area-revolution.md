---
id: math204-t4-surface
title: "Surface Area of Revolution"
order: 4
---

# Surface Area of Solids of Revolution

When a curve is rotated about an axis, it sweeps out a surface. Computing the area of this surface combines the concepts of arc length and solids of revolution. Surface area formulas are essential in engineering applications involving containers, pipes, and structural design.

## The Surface Area Formula

The key insight is that a small piece of curve, when rotated, sweeps out a thin band (or frustum of a cone). The surface area of this band is approximately:

$$dS = 2\pi r \, ds$$

where:
- $r$ is the radius (distance from the axis of revolution)
- $ds$ is the arc length element: $ds = \sqrt{1 + [f'(x)]^2} \, dx$

This formula says: the surface area of a thin band equals its circumference ($2\pi r$) times its slant height ($ds$).

### Rotation About the x-axis

For a curve $y = f(x)$ from $x = a$ to $x = b$ rotated about the x-axis:
- Radius: $r = f(x)$ (distance from x-axis)
- Arc length element: $ds = \sqrt{1 + [f'(x)]^2} \, dx$

$$S = \int_a^b 2\pi f(x) \sqrt{1 + [f'(x)]^2} \, dx$$

### Rotation About the y-axis

For the same curve rotated about the y-axis:
- Radius: $r = x$ (distance from y-axis)
- Arc length element: same as before

$$S = \int_a^b 2\pi x \sqrt{1 + [f'(x)]^2} \, dx$$

Alternatively, if given as $x = g(y)$ from $y = c$ to $y = d$:

$$S = \int_c^d 2\pi g(y) \sqrt{1 + [g'(y)]^2} \, dy$$

## Understanding the Frustum Approximation

A **frustum** is the portion of a cone between two parallel planes. When we rotate a small line segment about an axis, we get a frustum.

For a frustum with:
- Radii $r_1$ and $r_2$ at the two ends
- Slant height $\ell$

The lateral surface area is:
$$S = \pi(r_1 + r_2)\ell$$

For a small piece of curve from $(x, f(x))$ to $(x + dx, f(x + dx))$:
- $r_1 \approx f(x)$
- $r_2 \approx f(x)$ (approximately equal for small $dx$)
- $\ell \approx ds$

This gives:
$$dS \approx \pi(f(x) + f(x)) \, ds = 2\pi f(x) \, ds$$

Integrating yields the surface area formula.

## Examples: Rotation About the x-axis

The following plot shows the curve $y = \sqrt{x}$ which, when rotated about the x-axis, creates a surface of revolution:

```plot
{
  "xAxis": { "domain": [-0.5, 5], "label": "x" },
  "yAxis": { "domain": [-0.5, 2.5], "label": "y" },
  "data": [
    { "fn": "sqrt(x)", "color": "#8b5cf6", "title": "y = √x" }
  ]
}
```

**Example 1:** Find the surface area when $y = \sqrt{x}$ from $x = 0$ to $x = 4$ is rotated about the x-axis.

**Solution:**
$$f(x) = \sqrt{x} = x^{1/2}$$
$$f'(x) = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$$
$$[f'(x)]^2 = \frac{1}{4x}$$
$$1 + [f'(x)]^2 = 1 + \frac{1}{4x} = \frac{4x + 1}{4x}$$

$$S = \int_0^4 2\pi \sqrt{x} \sqrt{\frac{4x+1}{4x}} \, dx = 2\pi \int_0^4 \sqrt{x} \cdot \frac{\sqrt{4x+1}}{2\sqrt{x}} \, dx$$

$$= \pi \int_0^4 \sqrt{4x+1} \, dx$$

Substitution: $u = 4x + 1$, $du = 4 \, dx$, so $dx = \frac{1}{4} du$.

When $x = 0$, $u = 1$; when $x = 4$, $u = 17$.

$$S = \pi \int_1^{17} \frac{1}{4}\sqrt{u} \, du = \frac{\pi}{4} \cdot \frac{2u^{3/2}}{3}\bigg|_1^{17} = \frac{\pi}{6}(17^{3/2} - 1)$$

$$= \frac{\pi}{6}(17\sqrt{17} - 1)$$

**Example 2:** Find the surface area when $y = x^3$ from $x = 0$ to $x = 1$ is rotated about the x-axis.

**Solution:**
$$f'(x) = 3x^2$$
$$1 + [f'(x)]^2 = 1 + 9x^4$$

$$S = \int_0^1 2\pi x^3 \sqrt{1 + 9x^4} \, dx$$

Substitution: $u = 1 + 9x^4$, $du = 36x^3 \, dx$, so $x^3 \, dx = \frac{1}{36} du$.

When $x = 0$, $u = 1$; when $x = 1$, $u = 10$.

$$S = \int_1^{10} 2\pi \cdot \frac{1}{36}\sqrt{u} \, du = \frac{\pi}{18} \cdot \frac{2u^{3/2}}{3}\bigg|_1^{10} = \frac{\pi}{27}(10^{3/2} - 1)$$

$$= \frac{\pi}{27}(10\sqrt{10} - 1)$$

## Examples: Rotation About the y-axis

**Example 3:** Find the surface area when $y = x^2$ from $x = 0$ to $x = 2$ is rotated about the y-axis.

**Solution:**
$$f'(x) = 2x$$
$$1 + [f'(x)]^2 = 1 + 4x^2$$

$$S = \int_0^2 2\pi x \sqrt{1 + 4x^2} \, dx$$

Substitution: $u = 1 + 4x^2$, $du = 8x \, dx$, so $x \, dx = \frac{1}{8} du$.

When $x = 0$, $u = 1$; when $x = 2$, $u = 17$.

$$S = \int_1^{17} 2\pi \cdot \frac{1}{8}\sqrt{u} \, du = \frac{\pi}{4} \cdot \frac{2u^{3/2}}{3}\bigg|_1^{17} = \frac{\pi}{6}(17^{3/2} - 1)$$

$$= \frac{\pi}{6}(17\sqrt{17} - 1)$$

Interestingly, this is the same as Example 1, though the surfaces are geometrically different!

**Example 4 (Sphere):** Find the surface area of a sphere of radius $r$ by rotating the semicircle $y = \sqrt{r^2 - x^2}$ from $x = -r$ to $x = r$ about the x-axis.

**Solution:**
$$f(x) = \sqrt{r^2 - x^2}$$
$$f'(x) = \frac{-2x}{2\sqrt{r^2 - x^2}} = \frac{-x}{\sqrt{r^2 - x^2}}$$
$$[f'(x)]^2 = \frac{x^2}{r^2 - x^2}$$
$$1 + [f'(x)]^2 = \frac{r^2 - x^2 + x^2}{r^2 - x^2} = \frac{r^2}{r^2 - x^2}$$
$$\sqrt{1 + [f'(x)]^2} = \frac{r}{\sqrt{r^2 - x^2}}$$

$$S = \int_{-r}^r 2\pi \sqrt{r^2 - x^2} \cdot \frac{r}{\sqrt{r^2 - x^2}} \, dx = \int_{-r}^r 2\pi r \, dx$$

$$= 2\pi r \cdot x \bigg|_{-r}^r = 2\pi r(r - (-r)) = 4\pi r^2$$

The familiar formula for the surface area of a sphere!

## Parametric Surfaces

For a parametric curve $x = f(t)$, $y = g(t)$ from $t = a$ to $t = b$:

**Rotation about the x-axis:**
$$S = \int_a^b 2\pi g(t) \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

**Rotation about the y-axis:**
$$S = \int_a^b 2\pi f(t) \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

**Example 5:** Find the surface area when the curve $x = t^2$, $y = 2t$ from $t = 0$ to $t = 1$ is rotated about the x-axis.

**Solution:**
$$\frac{dx}{dt} = 2t, \quad \frac{dy}{dt} = 2$$
$$\sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} = \sqrt{4t^2 + 4} = 2\sqrt{t^2 + 1}$$

$$S = \int_0^1 2\pi(2t) \cdot 2\sqrt{t^2 + 1} \, dt = 8\pi \int_0^1 t\sqrt{t^2 + 1} \, dt$$

Substitution: $u = t^2 + 1$, $du = 2t \, dt$, so $t \, dt = \frac{1}{2} du$.

When $t = 0$, $u = 1$; when $t = 1$, $u = 2$.

$$S = 8\pi \int_1^2 \frac{1}{2}\sqrt{u} \, du = 4\pi \cdot \frac{2u^{3/2}}{3}\bigg|_1^2 = \frac{8\pi}{3}(2^{3/2} - 1)$$

$$= \frac{8\pi}{3}(2\sqrt{2} - 1)$$

## Common Patterns and Simplifications

Many textbook problems are designed so that the square root simplifies:

1. **Perfect squares under the radical**: Look for $1 + [f'(x)]^2 = [g(x)]^2$

2. **Cancellation**: The radius function $f(x)$ often cancels with part of $\sqrt{1 + [f'(x)]^2}$

3. **Linear functions**: For $y = mx + b$, we have $f'(x) = m$, so $\sqrt{1 + m^2}$ is constant

**Example 6 (Cone):** Rotate $y = 2x$ from $x = 0$ to $x = 3$ about the x-axis.

**Solution:**
$$f'(x) = 2, \quad \sqrt{1 + 4} = \sqrt{5}$$

$$S = \int_0^3 2\pi(2x)\sqrt{5} \, dx = 2\pi\sqrt{5} \int_0^3 2x \, dx = 2\pi\sqrt{5} \cdot x^2\bigg|_0^3 = 18\pi\sqrt{5}$$

## Strategy for Surface Area Problems

1. **Identify the axis of rotation** and determine the radius function
2. **Compute the derivative** and $\sqrt{1 + [f'(x)]^2}$
3. **Check for simplifications**—perfect squares, cancellations
4. **Set up the integral**: $S = \int 2\pi r \, ds$
5. **Use appropriate substitution** (often $u = 1 + [f'(x)]^2$ or related)
6. **Evaluate and simplify**

## Common Mistakes

1. **Confusing surface area with volume**: Surface area uses $2\pi r \, ds$, volume uses $\pi r^2 \, dx$

2. **Forgetting the arc length factor**: It's not just $2\pi f(x) \, dx$; you need $\sqrt{1 + [f'(x)]^2}$

3. **Wrong radius**: For rotation about the y-axis, radius is $x$, not $y$

4. **Limits of integration**: Ensure they correspond to the variable of integration

## Summary

- **Surface area formula**: $S = \int 2\pi r \, ds$ where $r$ is the radius and $ds$ is the arc length element
- **Rotation about x-axis**: $S = \int_a^b 2\pi f(x) \sqrt{1 + [f'(x)]^2} \, dx$
- **Rotation about y-axis**: $S = \int_a^b 2\pi x \sqrt{1 + [f'(x)]^2} \, dx$
- Based on the frustum approximation: thin bands of surface
- Combines arc length ($ds$) with rotation (circumference $2\pi r$)
- Classic applications: spheres, cones, and other surfaces of revolution
- Often requires clever substitution to evaluate the integral
