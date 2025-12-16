# Initial Value Problems

Finding the general antiderivative gives us a family of functions. But in real applications—physics, engineering, economics—we often need one specific function. Initial value problems (IVPs) use given information to pin down the exact solution from this infinite family. This bridges the gap between abstract mathematics and practical problem-solving.

## What is an Initial Value Problem?

An **initial value problem** consists of:
1. A differential equation (an equation involving derivatives)
2. An initial condition (a specific value at a particular point)

**General form:**
$$\frac{dy}{dx} = f(x), \quad y(x_0) = y_0$$

The differential equation tells us the rate of change. The initial condition tells us where we start. Together, they determine a unique solution.

## Solving First-Order IVPs

**Strategy:**
1. Integrate both sides to find the general solution
2. Apply the initial condition to solve for $C$
3. Write the particular solution

**Example 1:** Solve $\frac{dy}{dx} = 3x^2 - 2x$, $y(1) = 4$.

**Solution:**

Step 1: Integrate both sides
$$y = \int (3x^2 - 2x) \, dx = x^3 - x^2 + C$$

Step 2: Apply initial condition $y(1) = 4$
$$1^3 - 1^2 + C = 4$$
$$1 - 1 + C = 4$$
$$C = 4$$

Step 3: Particular solution
$$y = x^3 - x^2 + 4$$

**Verification:** Check that $y(1) = 1 - 1 + 4 = 4$ ✓ and $\frac{dy}{dx} = 3x^2 - 2x$ ✓

## Higher-Order IVPs

For second-order differential equations, we integrate twice and need two initial conditions.

**Example 2:** Solve $\frac{d^2y}{dx^2} = 6x - 2$, $y(0) = 1$, $y'(0) = 3$.

**Solution:**

First integration (find $y'$):
$$y' = \int (6x - 2) \, dx = 3x^2 - 2x + C_1$$

Apply $y'(0) = 3$:
$$0 - 0 + C_1 = 3 \implies C_1 = 3$$

So $y' = 3x^2 - 2x + 3$

Second integration (find $y$):
$$y = \int (3x^2 - 2x + 3) \, dx = x^3 - x^2 + 3x + C_2$$

Apply $y(0) = 1$:
$$0 - 0 + 0 + C_2 = 1 \implies C_2 = 1$$

Therefore:
$$y = x^3 - x^2 + 3x + 1$$

**Pattern:** For an $n$th-order differential equation, we need $n$ initial conditions (values of $y$, $y'$, $y''$, etc., at some point).

## Applications to Physics: Motion Problems

In physics, position, velocity, and acceleration are related by derivatives:
- Acceleration: $a(t) = \frac{dv}{dt} = \frac{d^2s}{dt^2}$
- Velocity: $v(t) = \frac{ds}{dt}$
- Position: $s(t)$

Given acceleration and initial conditions, we can find velocity and position.

### Constant Acceleration

**Example 3:** A ball is thrown upward with initial velocity 20 m/s from a height of 2 meters. Acceleration due to gravity is $a = -9.8$ m/s² (negative because it acts downward). Find the position function.

**Solution:**

Given: $a(t) = -9.8$, $v(0) = 20$, $s(0) = 2$

Find velocity:
$$v(t) = \int a(t) \, dt = \int -9.8 \, dt = -9.8t + C_1$$

Apply $v(0) = 20$:
$$-9.8(0) + C_1 = 20 \implies C_1 = 20$$

So $v(t) = -9.8t + 20$

Find position:
$$s(t) = \int v(t) \, dt = \int (-9.8t + 20) \, dt = -4.9t^2 + 20t + C_2$$

Apply $s(0) = 2$:
$$-4.9(0)^2 + 20(0) + C_2 = 2 \implies C_2 = 2$$

Therefore:
$$s(t) = -4.9t^2 + 20t + 2$$

**Physical Interpretation:**
- At $t = 0$: height is 2 m, velocity is 20 m/s upward
- Maximum height occurs when $v(t) = 0$: $-9.8t + 20 = 0 \implies t \approx 2.04$ s
- Maximum height: $s(2.04) \approx -4.9(2.04)^2 + 20(2.04) + 2 \approx 22.4$ m
- Ball hits ground when $s(t) = 0$: solve $-4.9t^2 + 20t + 2 = 0$ to get $t \approx 4.18$ s

### Variable Acceleration

**Example 4:** A particle moves along a line with acceleration $a(t) = 6t - 4$ m/s². At $t = 0$, it's at position $s = 5$ m with velocity $v = -3$ m/s. Find $s(t)$.

**Solution:**

First integration:
$$v(t) = \int (6t - 4) \, dt = 3t^2 - 4t + C_1$$

Apply $v(0) = -3$:
$$0 - 0 + C_1 = -3 \implies C_1 = -3$$

So $v(t) = 3t^2 - 4t - 3$

Second integration:
$$s(t) = \int (3t^2 - 4t - 3) \, dt = t^3 - 2t^2 - 3t + C_2$$

Apply $s(0) = 5$:
$$0 - 0 - 0 + C_2 = 5 \implies C_2 = 5$$

Therefore:
$$s(t) = t^3 - 2t^2 - 3t + 5$$

## Applications Beyond Motion

### Growth and Decay

**Example 5:** The rate of change of a population is proportional to its size: $\frac{dP}{dt} = kP$. If $P(0) = 1000$ and $k = 0.03$ (3% growth rate), find $P(t)$.

**Note:** This is a **separable differential equation** (we'll study these in detail later). For now, we note that the solution to $\frac{dP}{dt} = kP$ is:
$$P(t) = P_0 e^{kt}$$

With $P_0 = 1000$ and $k = 0.03$:
$$P(t) = 1000e^{0.03t}$$

At $t = 10$ years: $P(10) = 1000e^{0.3} \approx 1350$ people.

### Marginal Cost in Economics

**Example 6:** The marginal cost (cost to produce one more unit) is $C'(x) = 3x^2 - 2x + 5$ dollars per unit. Fixed costs (cost when producing zero units) are $C(0) = 1000$ dollars. Find the total cost function.

**Solution:**

Integrate:
$$C(x) = \int (3x^2 - 2x + 5) \, dx = x^3 - x^2 + 5x + C$$

Apply $C(0) = 1000$:
$$0 - 0 + 0 + C = 1000 \implies C = 1000$$

Therefore:
$$C(x) = x^3 - x^2 + 5x + 1000$$

To produce 10 units: $C(10) = 1000 - 100 + 50 + 1000 = 1950$ dollars.

## Interpretation of Constants

The constant of integration always has physical meaning:

| Application | Constant Represents |
|-------------|---------------------|
| **Motion** | Initial position or velocity |
| **Economics** | Fixed costs or initial value |
| **Population** | Initial population size |
| **Temperature** | Initial temperature |
| **Chemistry** | Initial concentration |

Understanding what $C$ represents helps verify solutions and interpret results.

## Common Pitfalls

**Pitfall 1: Forgetting to apply initial conditions**

Wrong: $\frac{dy}{dx} = 2x, \, y(1) = 3 \implies y = x^2 + C$

Right: $y = x^2 + C$, then $3 = 1 + C \implies C = 2$, so $y = x^2 + 2$

**Pitfall 2: Using the wrong initial condition**

For second-order problems, don't confuse conditions on $y$ and $y'$.

**Pitfall 3: Arithmetic errors**

Always substitute back to verify: check that your solution satisfies both the differential equation and initial condition.

## Problem-Solving Checklist

When solving an IVP:

1. **Identify what you're given:** differential equation and initial condition(s)
2. **Integrate** the appropriate number of times
3. **Apply initial conditions** immediately after each integration
4. **Solve for each constant** before integrating again
5. **Write the final particular solution** clearly
6. **Verify:** substitute into the original equation and check the initial condition

## A Deeper Look: Existence and Uniqueness

**Theorem (Existence and Uniqueness):** Under reasonable conditions (continuous $f$ and initial condition), the IVP
$$\frac{dy}{dx} = f(x), \quad y(x_0) = y_0$$
has exactly one solution.

This guarantees:
- A solution exists
- The solution is unique

This is why specifying the initial condition pins down one particular antiderivative from the infinite family.

## Summary

- An **initial value problem** combines a differential equation with initial condition(s)
- **First-order IVPs** need one initial condition; solve by integrating once
- **Second-order IVPs** need two initial conditions; integrate twice
- The constant of integration represents physically meaningful quantities
- **Motion problems** relate acceleration, velocity, and position through integration
- **Verification** is essential: always check your solution satisfies the IVP
- Applications span physics (motion), economics (marginal analysis), biology (growth), and beyond

Initial value problems transform abstract antiderivatives into concrete, applicable solutions. They're the bridge between pure mathematics and real-world modeling, appearing throughout science and engineering whenever we know rates of change and initial states.
