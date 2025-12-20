---
id: math204-t1-applications
title: "Antiderivative Applications"
order: 7
---

# Applications of Antiderivatives

Antiderivatives aren't just abstract mathematical operations—they're essential tools for solving real-world problems. By reversing differentiation, we can recover original functions from their rates of change. This section explores practical applications, focusing on motion problems where we find position from velocity and velocity from acceleration, along with other important applications in physics and beyond.

## The Motion Connection

In physics, position, velocity, and acceleration are intimately related through calculus:

- **Velocity** is the rate of change of position: $v(t) = \frac{ds}{dt}$
- **Acceleration** is the rate of change of velocity: $a(t) = \frac{dv}{dt}$

Reversing these relationships through antiderivatives:

- **Position from velocity:** $s(t) = \int v(t) \, dt$
- **Velocity from acceleration:** $v(t) = \int a(t) \, dt$

## Finding Position from Velocity

**Example 1:** A particle moves along a line with velocity $v(t) = 3t^2 - 2t + 1$ m/s. At $t = 0$, its position is $s(0) = 5$ meters. Find its position at any time $t$.

**Solution:**

Integrate velocity to find position:
$$s(t) = \int v(t) \, dt = \int (3t^2 - 2t + 1) \, dt = t^3 - t^2 + t + C$$

Apply initial condition $s(0) = 5$:
$$0 - 0 + 0 + C = 5 \implies C = 5$$

Therefore:
$$s(t) = t^3 - t^2 + t + 5$$

**Interpretation:** At $t = 2$ seconds, the particle is at position:
$$s(2) = 8 - 4 + 2 + 5 = 11 \text{ meters}$$

## Finding Velocity from Acceleration

**Example 2:** A car accelerates at $a(t) = 2 - 0.5t$ m/s². At $t = 0$, its velocity is 10 m/s. Find its velocity function and determine when it stops accelerating.

**Solution:**

Integrate acceleration to find velocity:
$$v(t) = \int (2 - 0.5t) \, dt = 2t - 0.25t^2 + C$$

Apply $v(0) = 10$:
$$0 - 0 + C = 10 \implies C = 10$$

So:
$$v(t) = 2t - 0.25t^2 + 10$$

The car stops accelerating when $a(t) = 0$:
$$2 - 0.5t = 0 \implies t = 4 \text{ seconds}$$

At this moment, velocity is:
$$v(4) = 2(4) - 0.25(16) + 10 = 8 - 4 + 10 = 14 \text{ m/s}$$

## Free Fall and Gravity

Near Earth's surface, acceleration due to gravity is constant: $a = -g$ where $g \approx 9.8$ m/s² (negative because downward is typically negative).

**Standard equations** (derived by integrating):
- Velocity: $v(t) = -gt + v_0$
- Position: $s(t) = -\frac{1}{2}gt^2 + v_0 t + s_0$

**Example 3:** A ball is thrown upward from a 50-meter cliff with initial velocity 20 m/s. When does it hit the ground?

**Solution:**

Using $g = 9.8$ m/s², $v_0 = 20$ m/s, $s_0 = 50$ m:

$$s(t) = -\frac{1}{2}(9.8)t^2 + 20t + 50 = -4.9t^2 + 20t + 50$$

The ball hits the ground when $s(t) = 0$:
$$-4.9t^2 + 20t + 50 = 0$$

Using the quadratic formula:
$$t = \frac{-20 \pm \sqrt{400 + 4(4.9)(50)}}{2(-4.9)} = \frac{-20 \pm \sqrt{400 + 980}}{-9.8}$$

$$= \frac{-20 \pm \sqrt{1380}}{-9.8} = \frac{-20 \pm 37.15}{-9.8}$$

Taking the positive root:
$$t = \frac{-20 + 37.15}{-9.8} \approx \frac{17.15}{-9.8} \text{ (negative, reject)}$$

$$t = \frac{-20 - 37.15}{-9.8} = \frac{-57.15}{-9.8} \approx 5.84 \text{ seconds}$$

## Displacement vs. Distance Traveled

**Displacement** is the change in position: $\Delta s = s(t_2) - s(t_1)$

**Distance traveled** accounts for changes in direction and is always positive.

**Example 4:** A particle has velocity $v(t) = t^2 - 4t + 3$ m/s for $0 \leq t \leq 4$. Find both displacement and total distance traveled.

**Solution:**

First, find when the particle changes direction (when $v(t) = 0$):
$$t^2 - 4t + 3 = 0$$
$$(t - 1)(t - 3) = 0$$
$$t = 1 \text{ or } t = 3$$

**Displacement:** Integrate velocity over the entire interval:
$$\text{Displacement} = \int_0^4 v(t) \, dt = \int_0^4 (t^2 - 4t + 3) \, dt$$

$$= \left[\frac{t^3}{3} - 2t^2 + 3t\right]_0^4 = \frac{64}{3} - 32 + 12 = \frac{64}{3} - 20 = \frac{64 - 60}{3} = \frac{4}{3} \text{ meters}$$

**Distance traveled:** The particle changes direction at $t = 1$ and $t = 3$, so we integrate the absolute value by splitting at these points:

For $0 \leq t \leq 1$: $v(t) = (t-1)(t-3) > 0$ (moving forward)

For $1 \leq t \leq 3$: $v(t) < 0$ (moving backward)

For $3 \leq t \leq 4$: $v(t) > 0$ (moving forward)

$$\text{Distance} = \int_0^1 v(t) \, dt - \int_1^3 v(t) \, dt + \int_3^4 v(t) \, dt$$

$$= \left[\frac{t^3}{3} - 2t^2 + 3t\right]_0^1 - \left[\frac{t^3}{3} - 2t^2 + 3t\right]_1^3 + \left[\frac{t^3}{3} - 2t^2 + 3t\right]_3^4$$

$$= \left(\frac{1}{3} - 2 + 3\right) - \left[(9 - 18 + 9) - (\frac{1}{3} - 2 + 3)\right] + \left[(\frac{64}{3} - 32 + 12) - (9 - 18 + 9)\right]$$

$$= \frac{4}{3} - [0 - \frac{4}{3}] + [\frac{4}{3} - 0]$$

$$= \frac{4}{3} + \frac{4}{3} + \frac{4}{3} = 4 \text{ meters}$$

**Interpretation:** The particle ends up $\frac{4}{3}$ meters from its starting position, but it traveled 4 meters total (accounting for back-and-forth motion).

## Work and Force

In physics, **work** is force times distance. When force varies with position, we use integration:

$$W = \int_{x_1}^{x_2} F(x) \, dx$$

**Example 5:** A spring requires a force of $F(x) = 50x$ Newtons to stretch it $x$ meters from its natural length (Hooke's Law). How much work is done stretching it from 0 to 0.3 meters?

**Solution:**

$$W = \int_0^{0.3} 50x \, dx = 50 \left[\frac{x^2}{2}\right]_0^{0.3} = 25[0.09 - 0] = 2.25 \text{ Joules}$$

## Accumulated Change

If $r(t)$ is a rate of change, then the total change from $t = a$ to $t = b$ is:

$$\text{Total change} = \int_a^b r(t) \, dt$$

**Example 6:** Water flows into a tank at a rate of $r(t) = 5 + 2t$ liters per minute. How much water enters the tank in the first 10 minutes?

**Solution:**

$$\text{Water added} = \int_0^{10} (5 + 2t) \, dt = \left[5t + t^2\right]_0^{10}$$

$$= 50 + 100 = 150 \text{ liters}$$

## Net Change Theorem

The **Net Change Theorem** formalizes this idea:

$$\int_a^b F'(x) \, dx = F(b) - F(a)$$

The integral of a rate of change gives the total change in the quantity.

**Example 7:** If a population grows at rate $r(t) = 100e^{0.02t}$ people per year, how much does the population increase from year 0 to year 20?

**Solution:**

$$\text{Population increase} = \int_0^{20} 100e^{0.02t} \, dt$$

Let $u = 0.02t$, $du = 0.02 \, dt$:

$$= 100 \int_0^{20} e^{0.02t} \, dt = 100 \left[\frac{e^{0.02t}}{0.02}\right]_0^{20}$$

$$= \frac{100}{0.02}[e^{0.4} - e^0] = 5000[e^{0.4} - 1]$$

$$\approx 5000[1.4918 - 1] = 5000(0.4918) \approx 2459 \text{ people}$$

## Rectilinear Motion Summary

For motion along a line:

| Given | Find | Method |
|-------|------|--------|
| $a(t)$ | $v(t)$ | $v(t) = \int a(t) \, dt$ |
| $a(t)$ | $s(t)$ | Integrate twice: $s(t) = \int\int a(t) \, dt \, dt$ |
| $v(t)$ | $s(t)$ | $s(t) = \int v(t) \, dt$ |
| $v(t)$ | Displacement | $\int_{t_1}^{t_2} v(t) \, dt$ |
| $v(t)$ | Distance | $\int_{t_1}^{t_2} |v(t)| \, dt$ |

## Common Pitfalls

**Pitfall 1: Confusing displacement and distance**

Displacement can be negative; distance is always positive.

**Pitfall 2: Forgetting initial conditions**

When integrating acceleration to find position, you need both $v(0)$ and $s(0)$.

**Pitfall 3: Sign errors with gravity**

If upward is positive, gravity is $a = -g$. If downward is positive, $a = +g$. Be consistent!

**Pitfall 4: Not checking when velocity changes sign**

To find distance traveled, identify when $v(t) = 0$ and split the integral.

## Problem-Solving Strategy

1. **Identify what you know:** acceleration, velocity, or position?
2. **Identify what you need:** position, velocity, displacement, or distance?
3. **Set up the integral:** integrate the appropriate function
4. **Apply initial conditions:** solve for constants
5. **Answer the question:** compute specific values or functions as requested
6. **Check units:** velocity is m/s, acceleration is m/s², position is m

## Summary

- **Position from velocity:** $s(t) = \int v(t) \, dt$
- **Velocity from acceleration:** $v(t) = \int a(t) \, dt$
- **Displacement:** Net change in position (can be negative)
- **Distance:** Total length of path traveled (always positive)
- **Free fall:** $a = -g$, leading to $v(t) = -gt + v_0$ and $s(t) = -\frac{1}{2}gt^2 + v_0 t + s_0$
- **Net Change Theorem:** $\int_a^b F'(x) \, dx = F(b) - F(a)$
- **Work:** $W = \int F(x) \, dx$ when force varies
- **Accumulated quantities:** Rate integrated over time gives total change

Antiderivatives transform rate information into actual quantities. Whether tracking a falling object, calculating work done by a varying force, or determining accumulated flow, integration lets us move from knowing how things change to knowing the things themselves. This connection between derivatives and integrals—the Fundamental Theorem of Calculus—makes calculus the powerful tool it is for understanding and predicting the physical world.
