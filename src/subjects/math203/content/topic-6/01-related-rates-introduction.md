# Introduction to Related Rates

Related rates problems involve quantities that change with time and are connected by an equation. When one quantity changes, the others change too—at rates that are *related* through calculus.

## The Core Idea

If two quantities $x$ and $y$ are both functions of time $t$ and are related by an equation, then their rates of change $\frac{dx}{dt}$ and $\frac{dy}{dt}$ are also related.

**The chain rule connects them:** If $y = f(x)$ and $x$ changes with time, then:

$$\frac{dy}{dt} = \frac{dy}{dx} \cdot \frac{dx}{dt}$$

More generally, for any equation relating $x$, $y$, and possibly other variables, implicit differentiation with respect to $t$ reveals how their rates are connected.

## A Simple Example

**Problem:** A circle's radius is increasing at 3 cm/s. How fast is the area increasing when the radius is 10 cm?

**Given:**
- $\frac{dr}{dt} = 3$ cm/s
- $r = 10$ cm at the moment we're analyzing

**Relationship:** $A = \pi r^2$

**Differentiate with respect to $t$:**
$$\frac{dA}{dt} = 2\pi r \cdot \frac{dr}{dt}$$

**Substitute known values:**
$$\frac{dA}{dt} = 2\pi (10)(3) = 60\pi \approx 188.5 \text{ cm}^2/\text{s}$$

## Why "Related"?

The rates are "related" because:
- Both $A$ and $r$ depend on time
- They're connected by the equation $A = \pi r^2$
- A change in $r$ causes a corresponding change in $A$
- The chain rule captures this relationship

## The General Process

**Step 1: Identify the variables**
- What quantities are changing?
- Which rates are given? Which are asked for?

**Step 2: Find a relationship**
- Write an equation connecting the variables
- This usually comes from geometry, physics, or the problem setup

**Step 3: Differentiate with respect to time**
- Apply implicit differentiation to both sides
- Remember: every variable is a function of $t$

**Step 4: Substitute and solve**
- Plug in known values (at the specific moment)
- Solve for the unknown rate

## Key Notation

- $\frac{dx}{dt}$: rate of change of $x$ with respect to time
- All variables are implicitly functions of time
- Positive rate = increasing; negative rate = decreasing

## Common Relationship Equations

**Circles:**
- Circumference: $C = 2\pi r$
- Area: $A = \pi r^2$

**Spheres:**
- Surface area: $S = 4\pi r^2$
- Volume: $V = \frac{4}{3}\pi r^3$

**Cylinders:**
- Lateral surface: $S = 2\pi rh$
- Volume: $V = \pi r^2 h$

**Cones:**
- Volume: $V = \frac{1}{3}\pi r^2 h$

**Pythagorean theorem:** $a^2 + b^2 = c^2$

**Distance formula:** $D = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$

## Example: Sphere Volume

**Problem:** A balloon is being inflated at 100 cm³/s. How fast is the radius increasing when $r = 5$ cm?

**Given:** $\frac{dV}{dt} = 100$ cm³/s, $r = 5$ cm

**Relationship:** $V = \frac{4}{3}\pi r^3$

**Differentiate:**
$$\frac{dV}{dt} = 4\pi r^2 \cdot \frac{dr}{dt}$$

**Solve for $\frac{dr}{dt}$:**
$$\frac{dr}{dt} = \frac{\frac{dV}{dt}}{4\pi r^2} = \frac{100}{4\pi(25)} = \frac{100}{100\pi} = \frac{1}{\pi} \approx 0.318 \text{ cm/s}$$

**Observation:** As the balloon gets larger, the same volume rate of change produces a smaller radius rate of change. This makes physical sense—larger balloons have more surface area to distribute the added volume.

## "At What Moment?"

Related rates problems ask about rates **at a specific instant**. The rates themselves may be changing over time, so we must:

1. Set up the general rate equation (differentiate)
2. Substitute values that apply **at the moment** we're analyzing
3. Report the rate at that specific instant

## Multiple Variables

Sometimes three or more quantities are related:

**Example:** For a cylinder where both $r$ and $h$ are changing:
$$V = \pi r^2 h$$
$$\frac{dV}{dt} = \pi \left(2rh\frac{dr}{dt} + r^2\frac{dh}{dt}\right)$$

This requires the product rule since both $r$ and $h$ depend on $t$.

## Summary

- Related rates problems connect rates of change through equations
- The chain rule (via implicit differentiation) relates the rates
- Always identify: what's changing, what equation connects them, what's asked
- Differentiate with respect to $t$, then substitute known values
- Answer represents the rate at a specific instant
