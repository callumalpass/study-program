---
id: math204-t4-arc
title: "Arc Length"
order: 3
---

# Arc Length

Arc length measures the distance traveled along a curve, as opposed to the straight-line distance between endpoints. Computing arc length requires integration and leads to some of the most elegant—and challenging—integrals in calculus.

## The Arc Length Formula

Consider a smooth curve $y = f(x)$ from $x = a$ to $x = b$. To find the length of this curve, we approximate it with tiny line segments and take a limit.

For a small piece of the curve over interval $[x, x + dx]$:
- Horizontal change: $dx$
- Vertical change: $dy = f'(x) \, dx$
- Length of line segment: $ds = \sqrt{(dx)^2 + (dy)^2}$

Using the Pythagorean theorem:
$$ds = \sqrt{(dx)^2 + (dy)^2} = \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \, dx = \sqrt{1 + [f'(x)]^2} \, dx$$

Summing these infinitesimal lengths gives the **arc length formula**:

$$L = \int_a^b \sqrt{1 + [f'(x)]^2} \, dx$$

### Why This Formula Makes Sense

The expression $\sqrt{1 + [f'(x)]^2}$ is the length of the hypotenuse when the horizontal leg is 1 and the vertical leg is $f'(x)$ (the slope). For a small interval $dx$, this gives the stretching factor that converts horizontal distance to actual distance along the curve.

- If $f'(x) = 0$ (flat curve): $\sqrt{1 + 0} = 1$, so arc length equals horizontal distance
- If $|f'(x)|$ is large (steep curve): the curve is longer than the horizontal distance
- The formula generalizes the Pythagorean theorem to continuous curves

## Examples in Rectangular Coordinates

**Example 1:** Find the length of the curve $y = \frac{2}{3}x^{3/2}$ from $x = 0$ to $x = 3$.

**Solution:** First, find the derivative:
$$f'(x) = \frac{2}{3} \cdot \frac{3}{2}x^{1/2} = x^{1/2}$$

Then:
$$[f'(x)]^2 = x$$

$$1 + [f'(x)]^2 = 1 + x$$

$$L = \int_0^3 \sqrt{1 + x} \, dx$$

Use substitution: $u = 1 + x$, $du = dx$. When $x = 0$, $u = 1$; when $x = 3$, $u = 4$.

$$L = \int_1^4 \sqrt{u} \, du = \left[\frac{2u^{3/2}}{3}\right]_1^4 = \frac{2}{3}(8 - 1) = \frac{14}{3}$$

**Example 2:** Find the length of $y = \frac{x^3}{3} + \frac{1}{4x}$ from $x = 1$ to $x = 3$.

**Solution:**
$$f'(x) = x^2 - \frac{1}{4x^2}$$

$$[f'(x)]^2 = x^4 - 2 \cdot x^2 \cdot \frac{1}{4x^2} + \frac{1}{16x^4} = x^4 - \frac{1}{2} + \frac{1}{16x^4}$$

$$1 + [f'(x)]^2 = x^4 + \frac{1}{2} + \frac{1}{16x^4}$$

Notice this is a perfect square:
$$1 + [f'(x)]^2 = \left(x^2 + \frac{1}{4x^2}\right)^2$$

Therefore:
$$L = \int_1^3 \sqrt{\left(x^2 + \frac{1}{4x^2}\right)^2} \, dx = \int_1^3 \left(x^2 + \frac{1}{4x^2}\right) \, dx$$

$$= \left[\frac{x^3}{3} - \frac{1}{4x}\right]_1^3 = \left(9 - \frac{1}{12}\right) - \left(\frac{1}{3} - \frac{1}{4}\right)$$

$$= 9 - \frac{1}{12} - \frac{1}{3} + \frac{1}{4} = 9 - \frac{1}{12} - \frac{4}{12} + \frac{3}{12} = 9 - \frac{2}{12} = \frac{53}{6}$$

## Arc Length with Respect to y

If the curve is given as $x = g(y)$ from $y = c$ to $y = d$, the formula becomes:

$$L = \int_c^d \sqrt{1 + [g'(y)]^2} \, dy$$

**Example 3:** Find the length of $x = \frac{y^3}{3} + \frac{1}{4y}$ from $y = 1$ to $y = 3$.

**Solution:** This is the same curve as Example 2, just expressed differently. By symmetry of the formula:

$$g'(y) = y^2 - \frac{1}{4y^2}$$

The calculation proceeds identically, giving $L = \frac{53}{6}$.

## Parametric Curves

For a curve given parametrically as $x = f(t)$, $y = g(t)$ for $t \in [a, b]$, the arc length is:

$$L = \int_a^b \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt = \int_a^b \sqrt{[f'(t)]^2 + [g'(t)]^2} \, dt$$

This formula comes from:
$$ds = \sqrt{(dx)^2 + (dy)^2} = \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

**Example 4:** Find the length of the curve $x = t^2$, $y = t^3$ from $t = 0$ to $t = 2$.

**Solution:**
$$\frac{dx}{dt} = 2t, \quad \frac{dy}{dt} = 3t^2$$

$$L = \int_0^2 \sqrt{4t^2 + 9t^4} \, dt = \int_0^2 \sqrt{t^2(4 + 9t^2)} \, dt = \int_0^2 t\sqrt{4 + 9t^2} \, dt$$

Use substitution: $u = 4 + 9t^2$, $du = 18t \, dt$, so $t \, dt = \frac{1}{18} du$.

When $t = 0$, $u = 4$; when $t = 2$, $u = 40$.

$$L = \int_4^{40} \frac{1}{18}\sqrt{u} \, du = \frac{1}{18} \cdot \frac{2u^{3/2}}{3}\bigg|_4^{40} = \frac{1}{27}(40^{3/2} - 8)$$

$$= \frac{1}{27}(40\sqrt{40} - 8) = \frac{1}{27}(80\sqrt{10} - 8) = \frac{80\sqrt{10} - 8}{27}$$

**Example 5 (Circle):** Find the circumference of a circle of radius $r$ using parametric equations.

**Solution:** Parametrize as $x = r\cos t$, $y = r\sin t$ for $t \in [0, 2\pi]$.

$$\frac{dx}{dt} = -r\sin t, \quad \frac{dy}{dt} = r\cos t$$

$$L = \int_0^{2\pi} \sqrt{r^2\sin^2 t + r^2\cos^2 t} \, dt = \int_0^{2\pi} \sqrt{r^2(\sin^2 t + \cos^2 t)} \, dt$$

$$= \int_0^{2\pi} r \, dt = r \cdot 2\pi = 2\pi r$$

As expected!

## Smooth Curves

A curve is **smooth** on an interval if its derivative (or parametric derivatives) are continuous and not simultaneously zero. Smoothness ensures the curve has no corners or cusps, making the arc length well-defined.

**Example of non-smooth curve:** $y = |x|$ has a corner at $x = 0$, where the derivative is discontinuous.

For smooth curves, the arc length integral converges and gives a finite result.

## Practical Considerations

Arc length integrals are notoriously difficult to evaluate. The square root $\sqrt{1 + [f'(x)]^2}$ rarely simplifies, and many arc length integrals:
- Have no closed form in terms of elementary functions
- Require numerical integration
- Lead to elliptic integrals (special functions beyond elementary calculus)

**Example:** The arc length of $y = x^2$ from $x = 0$ to $x = 1$:

$$L = \int_0^1 \sqrt{1 + 4x^2} \, dx$$

This integral can be evaluated using trigonometric substitution ($x = \frac{1}{2}\tan\theta$), but the result involves inverse hyperbolic functions. Numerical approximation gives $L \approx 1.478$.

## Strategy for Arc Length Problems

1. **Find the derivative** $f'(x)$ or $\frac{dx}{dt}, \frac{dy}{dt}$ for parametric curves
2. **Compute** $1 + [f'(x)]^2$ (or the parametric version)
3. **Check if it's a perfect square**—many textbook problems are designed this way
4. **If not a perfect square**, try:
   - Trigonometric substitution
   - Hyperbolic substitution
   - Numerical methods
5. **Set up the integral** with correct limits
6. **Evaluate** (analytically if possible, numerically otherwise)

## Summary

- **Arc length for $y = f(x)$**: $L = \int_a^b \sqrt{1 + [f'(x)]^2} \, dx$
- **Arc length for $x = g(y)$**: $L = \int_c^d \sqrt{1 + [g'(y)]^2} \, dy$
- **Parametric arc length**: $L = \int_a^b \sqrt{[f'(t)]^2 + [g'(t)]^2} \, dt$
- The formula comes from the Pythagorean theorem applied to infinitesimal segments
- Curves must be smooth (continuous derivatives, no cusps)
- Many arc length integrals require numerical methods or special functions
- Always check if $1 + [f'(x)]^2$ is a perfect square—this makes integration much easier
