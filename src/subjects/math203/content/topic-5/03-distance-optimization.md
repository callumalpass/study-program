# Distance Optimization

Finding the shortest distance—to a curve, between points, or along a path—is a common optimization problem. A key technique is to minimize distance squared instead of distance, which eliminates the square root and simplifies the calculus.

## Distance Formula Review

The distance between points $(x_1, y_1)$ and $(x_2, y_2)$ is:

$$D = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

The **distance squared** is:

$$D^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$$

**Key insight:** Since $D \geq 0$, minimizing $D^2$ is equivalent to minimizing $D$. Working with $D^2$ avoids the square root.

## Closest Point on a Curve

### Example: Point to Parabola

**Problem:** Find the point on the parabola $y = x^2$ closest to the point $(3, 0)$.

**Setup:**
- Point on curve: $(x, x^2)$
- Distance squared to $(3, 0)$:
$$D^2 = (x - 3)^2 + (x^2 - 0)^2 = (x - 3)^2 + x^4$$

**Optimize:**
Let $f(x) = (x-3)^2 + x^4$

$f'(x) = 2(x-3) + 4x^3 = 4x^3 + 2x - 6 = 2(2x^3 + x - 3)$

Finding roots of $2x^3 + x - 3 = 0$:
Testing $x = 1$: $2 + 1 - 3 = 0$ ✓

Factor: $2x^3 + x - 3 = (x - 1)(2x^2 + 2x + 3)$

The quadratic $2x^2 + 2x + 3$ has discriminant $4 - 24 < 0$, so no real roots.

Only critical point: $x = 1$

**Verify minimum:**
$f''(x) = 12x^2 + 2$
$f''(1) = 14 > 0$ → minimum

**Solution:** The closest point is $(1, 1)$.

Distance: $D = \sqrt{(1-3)^2 + 1^2} = \sqrt{5}$

### Example: Point to Line

**Problem:** Find the shortest distance from $(4, 1)$ to the line $y = 2x - 3$.

**Setup:**
- General point on line: $(x, 2x - 3)$
- Distance squared:
$$D^2 = (x - 4)^2 + (2x - 3 - 1)^2 = (x-4)^2 + (2x-4)^2$$

**Optimize:**
$f(x) = (x-4)^2 + 4(x-2)^2$
$f'(x) = 2(x-4) + 8(x-2) = 2x - 8 + 8x - 16 = 10x - 24$
$f'(x) = 0$ when $x = 2.4$

**Solution:** Closest point on line is $(2.4, 1.8)$.

Distance: $D = \sqrt{(2.4-4)^2 + (1.8-1)^2} = \sqrt{2.56 + 0.64} = \sqrt{3.2}$

**Note:** There's a formula for distance from point to line: $\frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$ where line is $ax + by + c = 0$.

## Minimizing Travel Distance

### Example: Walking Then Swimming

**Problem:** A person at point $A$ must reach point $B$ across a river. Walking speed is 5 km/h, swimming speed is 2 km/h. River is 1 km wide, and $B$ is 3 km downstream from the point directly across from $A$. Where should they enter the water?

**Setup:**
- Let $x$ = distance walked downstream before swimming
- Walk distance: $x$
- Swim distance: $\sqrt{1^2 + (3-x)^2} = \sqrt{1 + (3-x)^2}$

**Objective:** Minimize total time
$$T = \frac{x}{5} + \frac{\sqrt{1 + (3-x)^2}}{2}$$

**Optimize:**
$$T'(x) = \frac{1}{5} + \frac{1}{2} \cdot \frac{-2(3-x)}{2\sqrt{1+(3-x)^2}} = \frac{1}{5} - \frac{3-x}{2\sqrt{1+(3-x)^2}}$$

Set $T'(x) = 0$:
$$\frac{1}{5} = \frac{3-x}{2\sqrt{1+(3-x)^2}}$$

$$2\sqrt{1+(3-x)^2} = 5(3-x)$$

Square: $4[1 + (3-x)^2] = 25(3-x)^2$

$4 + 4(3-x)^2 = 25(3-x)^2$
$4 = 21(3-x)^2$
$(3-x)^2 = \frac{4}{21}$
$3-x = \frac{2}{\sqrt{21}}$
$x = 3 - \frac{2}{\sqrt{21}} \approx 2.56$ km

**Solution:** Walk about 2.56 km before swimming.

## Snell's Law Connection

The walking/swimming problem illustrates **Snell's Law** from physics. Light (and optimal paths) bend when crossing media with different speeds, following:

$$\frac{\sin \theta_1}{v_1} = \frac{\sin \theta_2}{v_2}$$

## Reflection Problems

**Problem:** Light travels from point $A$ to point $B$ by reflecting off a mirror. Find the reflection point.

**Solution approach:**
- Reflect $B$ across the mirror to get $B'$
- The shortest path from $A$ to $B$ via the mirror is the straight line $AB'$
- The reflection point is where $AB'$ intersects the mirror

This leads to the **law of reflection:** angle of incidence = angle of reflection.

## Summary

- Minimize $D^2$ instead of $D$ to avoid square roots
- For point to curve: parameterize curve, write $D^2$ as function of parameter
- For travel problems: time = distance/speed
- Single critical point on an unbounded domain usually gives the global optimum
- Many distance problems connect to physics (Snell's law, reflection)
