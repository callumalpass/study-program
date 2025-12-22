---
id: math203-t6-advanced
title: "Advanced Related Rates"
order: 7
---

# Advanced Related Rates

This section tackles more challenging related rates problems that require combining multiple techniques, handling unusual geometric relationships, or working with less common formulas. Mastering these problems develops problem-solving flexibility and deeper understanding.

## Problems with Multiple Related Quantities

Some problems involve three or more rates connected through multiple relationships.

### Example 1: Three Connected Variables

A spherical balloon is being inflated at a rate of 2 cubic feet per minute. At the same time, it's losing air at a rate proportional to its surface area: the loss rate is $0.01S$ cubic feet per minute, where $S$ is the surface area.

Find how fast the radius is changing when $r = 3$ feet.

**Setup:**
- Volume: $V = \frac{4}{3}\pi r^3$
- Surface area: $S = 4\pi r^2$
- Net rate of volume change: $\frac{dV}{dt} = 2 - 0.01S = 2 - 0.01(4\pi r^2) = 2 - 0.04\pi r^2$

**Differentiate volume:**
$$\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$$

**At $r = 3$:**
$$\frac{dV}{dt} = 2 - 0.04\pi(9) = 2 - 0.36\pi \approx 0.869 \text{ ft}^3/\text{min}$$

$$0.869 = 4\pi(9)\frac{dr}{dt}$$
$$\frac{dr}{dt} = \frac{0.869}{36\pi} \approx 0.0077 \text{ ft/min}$$

**Answer:** The radius is increasing at approximately 0.0077 feet per minute.

## Problems with Implicit Relationships

When the relationship between variables is given implicitly, we differentiate the implicit equation.

### Example 2: Elliptical Path

A point moves along the ellipse $\frac{x^2}{25} + \frac{y^2}{9} = 1$. When $x = 3$ and $y > 0$, the x-coordinate is increasing at 2 units per second. How fast is the y-coordinate changing?

**Find y when x = 3:**
$$\frac{9}{25} + \frac{y^2}{9} = 1$$
$$\frac{y^2}{9} = \frac{16}{25}$$
$$y^2 = \frac{144}{25}$$
$$y = \frac{12}{5} = 2.4$$

**Differentiate implicitly:**
$$\frac{2x}{25}\frac{dx}{dt} + \frac{2y}{9}\frac{dy}{dt} = 0$$

**Substitute values:** $x = 3$, $y = 2.4$, $\frac{dx}{dt} = 2$
$$\frac{6}{25}(2) + \frac{4.8}{9}\frac{dy}{dt} = 0$$
$$0.48 + 0.533\frac{dy}{dt} = 0$$
$$\frac{dy}{dt} = -0.9$$

**Answer:** The y-coordinate is decreasing at 0.9 units per second.

## Rotating Objects and Angular Velocity

### Example 3: Rotating Searchlight

A searchlight is 100 meters from a straight wall. It rotates at 2 revolutions per minute. How fast is the light spot moving along the wall when the beam makes a 60° angle with the wall?

**Setup:**
- Distance to wall: $d = 100$ m
- Let $\theta$ = angle between beam and the perpendicular to wall
- Let $x$ = distance from closest point on wall to light spot

**Relationship:** $\tan\theta = \frac{x}{100}$, so $x = 100\tan\theta$

**Angular rate:** 2 rev/min = $4\pi$ rad/min

**Differentiate:**
$$\frac{dx}{dt} = 100\sec^2\theta \cdot \frac{d\theta}{dt}$$

**When beam makes 60° with wall:** The angle with the perpendicular is 30°.

$$\sec^2(30°) = \frac{1}{\cos^2(30°)} = \frac{1}{({\sqrt{3}/2})^2} = \frac{4}{3}$$

$$\frac{dx}{dt} = 100 \cdot \frac{4}{3} \cdot 4\pi = \frac{1600\pi}{3} \approx 1676 \text{ m/min}$$

**Answer:** The light spot is moving at approximately 1676 meters per minute (about 28 m/s).

### Example 4: Camera Tracking

A camera at ground level is 50 meters from the base of a building. It tracks a window washer descending at 0.5 m/s. How fast must the camera angle decrease when the washer is 30 meters above the ground?

**Setup:**
- Let $h$ = height of washer above ground
- Let $\theta$ = angle of elevation of camera

**Relationship:** $\tan\theta = \frac{h}{50}$

**Differentiate:**
$$\sec^2\theta \cdot \frac{d\theta}{dt} = \frac{1}{50}\frac{dh}{dt}$$

**When $h = 30$:**
$$\tan\theta = \frac{30}{50} = 0.6$$
$$\sec^2\theta = 1 + \tan^2\theta = 1 + 0.36 = 1.36$$

**Substitute:** $\frac{dh}{dt} = -0.5$ (descending)
$$1.36 \cdot \frac{d\theta}{dt} = \frac{-0.5}{50} = -0.01$$
$$\frac{d\theta}{dt} = \frac{-0.01}{1.36} \approx -0.00735 \text{ rad/s}$$

Converting: $-0.00735 \times \frac{180}{\pi} \approx -0.42°/\text{s}$

**Answer:** The camera angle must decrease at about 0.42° per second (or 0.00735 rad/s).

## Problems with Non-Standard Shapes

### Example 5: Water in a Trough

A trough is 10 feet long with triangular cross-section: 2 feet across the top and 1 foot deep. Water is being pumped in at 3 cubic feet per minute. How fast is the water level rising when the water is 6 inches deep?

**Cross-section analysis:**
When water is at depth $h$ (in feet), use similar triangles.

Full triangle: width 2 ft at height 1 ft
At height $h$: width $w = 2h$ (proportional)

**Volume of water:**
$$V = \frac{1}{2} \times w \times h \times \text{length} = \frac{1}{2}(2h)(h)(10) = 10h^2$$

**Differentiate:**
$$\frac{dV}{dt} = 20h\frac{dh}{dt}$$

**At $h = 0.5$ ft (6 inches):**
$$3 = 20(0.5)\frac{dh}{dt}$$
$$\frac{dh}{dt} = \frac{3}{10} = 0.3 \text{ ft/min}$$

**Answer:** The water level is rising at 0.3 feet (3.6 inches) per minute.

### Example 6: Conical Pile of Sand

Sand falls onto a conical pile at 10 cubic feet per minute. The height is always twice the radius. How fast is the height increasing when the pile is 6 feet tall?

**Setup:**
- Volume: $V = \frac{1}{3}\pi r^2 h$
- Constraint: $h = 2r$, so $r = \frac{h}{2}$

**Eliminate $r$:**
$$V = \frac{1}{3}\pi \left(\frac{h}{2}\right)^2 h = \frac{1}{3}\pi \cdot \frac{h^2}{4} \cdot h = \frac{\pi h^3}{12}$$

**Differentiate:**
$$\frac{dV}{dt} = \frac{3\pi h^2}{12}\frac{dh}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt}$$

**At $h = 6$:**
$$10 = \frac{\pi(36)}{4}\frac{dh}{dt} = 9\pi\frac{dh}{dt}$$
$$\frac{dh}{dt} = \frac{10}{9\pi} \approx 0.354 \text{ ft/min}$$

**Answer:** The height is increasing at approximately 0.354 feet per minute.

## Combining Related Rates with Other Calculus

### Example 7: Rate of Change of Area Under a Curve

The area under $y = x^2$ from $x = 0$ to $x = a$ is $A = \frac{a^3}{3}$. If $a$ is increasing at 2 units per second, how fast is the area increasing when $a = 3$?

**Differentiate:**
$$\frac{dA}{dt} = \frac{3a^2}{3}\frac{da}{dt} = a^2 \frac{da}{dt}$$

**At $a = 3$, $\frac{da}{dt} = 2$:**
$$\frac{dA}{dt} = 9 \cdot 2 = 18 \text{ square units/second}$$

**Answer:** The area is increasing at 18 square units per second.

## Troubleshooting Difficult Problems

### When You're Stuck

1. **Re-read the problem:** What exactly is changing? What's constant?
2. **Simplify the diagram:** Label only the variables that matter
3. **Check units:** Rate in m/s? Make sure all lengths are in meters
4. **Try different relationships:** Pythagorean, similar triangles, trig?
5. **Verify algebra:** Sign errors and calculation mistakes are common

### Red Flags

- **Negative where positive expected:** Check signs on rates
- **Rate seems too large/small:** Verify units match
- **Equation doesn't simplify:** May have wrong relationship

## Summary

- Complex problems may involve multiple connected rates—track all relationships
- Implicit curves require differentiating the implicit equation
- Angular problems often use $\tan\theta$ or $\sin\theta$ relationships
- Non-standard shapes: find volume/area formula using geometry (similar triangles, etc.)
- Combine related rates with other calculus concepts as needed
- When stuck, simplify and verify each step carefully
- Always check that your answer has the right sign and reasonable magnitude
