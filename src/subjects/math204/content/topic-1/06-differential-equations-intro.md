---
id: math204-t1-diffeq
title: "Introduction to Differential Equations"
order: 6
---

# Introduction to Differential Equations

A differential equation is an equation involving a function and its derivatives. While we've been solving simple differential equations all along (every time we integrate $\frac{dy}{dx} = f(x)$, we're solving a differential equation), many real-world problems lead to more complex forms. This section introduces differential equations systematically, focusing on separable equations and their applications to growth, decay, and natural phenomena.

## What is a Differential Equation?

A **differential equation** is an equation that relates a function to one or more of its derivatives.

**Examples:**
- $\frac{dy}{dx} = 3x^2$ (first-order)
- $\frac{d^2y}{dx^2} + 4y = 0$ (second-order)
- $\frac{dP}{dt} = kP$ (exponential growth/decay)
- $\frac{dy}{dx} = x + y$ (involves both $x$ and $y$)

The **order** of a differential equation is the highest derivative that appears.

## Why Differential Equations Matter

Differential equations are the language of change. They model:
- **Physics:** Newton's laws ($F = ma = m\frac{d^2x}{dt^2}$)
- **Biology:** Population growth ($\frac{dP}{dt} = rP$)
- **Chemistry:** Reaction rates ($\frac{dC}{dt} = -kC$)
- **Economics:** Supply and demand dynamics
- **Engineering:** Electrical circuits, heat transfer, fluid flow
- **Epidemiology:** Disease spread (SIR models)

Instead of directly giving us a function, nature often gives us a relationship between quantities and their rates of change. Solving the differential equation reveals the underlying function.

## Solutions to Differential Equations

A **solution** to a differential equation is a function that satisfies the equation when substituted in.

**Example:** Consider $\frac{dy}{dx} = 2x$.

The **general solution** is $y = x^2 + C$ (a family of functions).

A **particular solution** is obtained when we specify an initial condition, e.g., $y(0) = 3$ gives $y = x^2 + 3$.

## Separable Differential Equations

A differential equation is **separable** if it can be written in the form:

$$\frac{dy}{dx} = g(x)h(y)$$

or equivalently, if all terms involving $y$ can be moved to one side and all terms involving $x$ to the other:

$$\frac{1}{h(y)} \, dy = g(x) \, dx$$

We then integrate both sides:

$$\int \frac{1}{h(y)} \, dy = \int g(x) \, dx$$

### Example 1: Basic Separable Equation

**Problem:** Solve $\frac{dy}{dx} = xy$

**Solution:**

This is separable: $\frac{dy}{dx} = x \cdot y$, so $g(x) = x$ and $h(y) = y$.

Separate variables:
$$\frac{1}{y} \, dy = x \, dx$$

Integrate both sides:
$$\int \frac{1}{y} \, dy = \int x \, dx$$

$$\ln|y| = \frac{x^2}{2} + C_1$$

Exponentiate to solve for $y$:
$$|y| = e^{x^2/2 + C_1} = e^{C_1} \cdot e^{x^2/2}$$

Let $C = \pm e^{C_1}$ (an arbitrary constant):
$$y = Ce^{x^2/2}$$

**Note:** We absorbed the $\pm$ and $e^{C_1}$ into a single constant $C$ because the general solution allows any constant value.

### Example 2: With Initial Condition

**Problem:** Solve $\frac{dy}{dx} = \frac{y}{x}$, $y(1) = 2$

**Solution:**

Separate:
$$\frac{1}{y} \, dy = \frac{1}{x} \, dx$$

Integrate:
$$\ln|y| = \ln|x| + C_1$$

Exponentiate:
$$|y| = e^{\ln|x| + C_1} = e^{C_1} \cdot |x|$$

General solution:
$$y = Cx$$

Apply initial condition $y(1) = 2$:
$$2 = C(1) \implies C = 2$$

Particular solution:
$$y = 2x$$

## Exponential Growth and Decay

One of the most important differential equations in applications is:

$$\frac{dP}{dt} = kP$$

This says "the rate of change is proportional to the current amount."

**Solution:** This is separable.

$$\frac{1}{P} \, dP = k \, dt$$

$$\int \frac{1}{P} \, dP = \int k \, dt$$

$$\ln|P| = kt + C_1$$

$$P = e^{kt + C_1} = e^{C_1} \cdot e^{kt}$$

Let $P_0 = e^{C_1}$ (the initial amount when $t = 0$):

$$P(t) = P_0 e^{kt}$$

**Interpretation:**
- If $k > 0$: **exponential growth** (population, compound interest, bacteria)
- If $k < 0$: **exponential decay** (radioactive decay, drug elimination, cooling)

### Example 3: Bacterial Growth

**Problem:** A bacterial culture grows at a rate proportional to its size. Initially, there are 1000 bacteria. After 3 hours, there are 4000 bacteria. How many bacteria are there after 6 hours?

**Solution:**

The equation is $\frac{dP}{dt} = kP$ with solution $P(t) = P_0 e^{kt}$.

Given: $P(0) = 1000$, so $P_0 = 1000$.

Thus $P(t) = 1000e^{kt}$.

Use $P(3) = 4000$:
$$1000e^{3k} = 4000$$
$$e^{3k} = 4$$
$$3k = \ln(4)$$
$$k = \frac{\ln(4)}{3}$$

So $P(t) = 1000e^{t\ln(4)/3} = 1000 \cdot 4^{t/3}$.

After 6 hours:
$$P(6) = 1000 \cdot 4^{6/3} = 1000 \cdot 4^2 = 1000 \cdot 16 = 16000$$

There will be 16,000 bacteria.

### Example 4: Radioactive Decay

**Problem:** Carbon-14 has a half-life of 5730 years. If a sample initially contains 100 grams, how much remains after 10,000 years?

**Solution:**

The decay equation is $\frac{dA}{dt} = -kA$ (negative because it's decaying).

Solution: $A(t) = A_0 e^{-kt}$ where $A_0 = 100$ grams.

Use the half-life to find $k$: when $t = 5730$, $A = 50$:
$$50 = 100e^{-5730k}$$
$$\frac{1}{2} = e^{-5730k}$$
$$\ln\left(\frac{1}{2}\right) = -5730k$$
$$k = \frac{\ln(2)}{5730}$$

So $A(t) = 100e^{-t\ln(2)/5730} = 100 \cdot \left(\frac{1}{2}\right)^{t/5730}$.

After 10,000 years:
$$A(10000) = 100 \cdot \left(\frac{1}{2}\right)^{10000/5730} \approx 100 \cdot 0.297 \approx 29.7 \text{ grams}$$

### Example 5: Newton's Law of Cooling

**Problem:** A cup of coffee at 90°C is placed in a room at 20°C. After 5 minutes, its temperature is 70°C. When will it reach 50°C?

**Solution:**

Newton's Law of Cooling states that the rate of temperature change is proportional to the difference between the object's temperature and the ambient temperature:

$$\frac{dT}{dt} = -k(T - T_{\text{ambient}})$$

With $T_{\text{ambient}} = 20$:
$$\frac{dT}{dt} = -k(T - 20)$$

This is separable:
$$\frac{1}{T - 20} \, dT = -k \, dt$$

$$\ln|T - 20| = -kt + C_1$$

$$T - 20 = Ce^{-kt}$$

$$T(t) = 20 + Ce^{-kt}$$

At $t = 0$: $T(0) = 90$, so $90 = 20 + C \implies C = 70$.

Thus $T(t) = 20 + 70e^{-kt}$.

At $t = 5$: $T(5) = 70$:
$$70 = 20 + 70e^{-5k}$$
$$50 = 70e^{-5k}$$
$$e^{-5k} = \frac{5}{7}$$
$$-5k = \ln\left(\frac{5}{7}\right)$$
$$k = -\frac{1}{5}\ln\left(\frac{5}{7}\right) = \frac{1}{5}\ln\left(\frac{7}{5}\right)$$

To find when $T = 50$:
$$50 = 20 + 70e^{-kt}$$
$$30 = 70e^{-kt}$$
$$e^{-kt} = \frac{3}{7}$$
$$-kt = \ln\left(\frac{3}{7}\right)$$
$$t = -\frac{\ln(3/7)}{k} = -\frac{\ln(3/7)}{\frac{1}{5}\ln(7/5)} = \frac{5\ln(7/3)}{\ln(7/5)}$$

$$t = \frac{5\ln(7/3)}{\ln(7/5)} \approx \frac{5(0.847)}{0.336} \approx 12.6 \text{ minutes}$$

## Logistic Growth (Preview)

Exponential growth is unrealistic for populations—resources become limited. The **logistic equation** models bounded growth:

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{M}\right)$$

where $M$ is the carrying capacity (maximum sustainable population).

This is also separable, though the algebra is more involved. Its solution is:

$$P(t) = \frac{M}{1 + Ae^{-kt}}$$

where $A$ depends on initial conditions. This produces an S-shaped curve that starts with exponential growth and levels off at $M$.

## Solving Strategy for Separable Equations

1. **Identify if separable:** Can you write $\frac{dy}{dx} = g(x)h(y)$?
2. **Separate variables:** Move all $y$ terms to one side, all $x$ terms to the other
3. **Integrate both sides:** Don't forget $+C$ on one side (not both)
4. **Solve for $y$:** May require exponentiation or algebraic manipulation
5. **Apply initial conditions:** If given, solve for the constant
6. **Verify:** Substitute back into the original equation

## Common Mistakes

**Mistake 1: Dividing by zero**

When separating $\frac{dy}{dx} = y$, we divide by $y$. This assumes $y \neq 0$. We might lose the solution $y = 0$ (which is indeed a solution). Always check if constant functions satisfy the equation.

**Mistake 2: Forgetting absolute value**

$$\int \frac{1}{y} \, dy = \ln(y) + C \quad \text{WRONG}$$
$$\int \frac{1}{y} \, dy = \ln|y| + C \quad \text{RIGHT}$$

**Mistake 3: Adding $+C$ to both sides**

$$\ln|y| + C_1 = \ln|x| + C_2$$

This is correct but redundant. Combine into one constant: $\ln|y| = \ln|x| + C$ where $C = C_2 - C_1$.

## Summary

- A **differential equation** relates a function to its derivatives
- **Separable equations** have the form $\frac{dy}{dx} = g(x)h(y)$
- **Separation of variables:** Rearrange so all $y$ terms are on one side, integrate
- **Exponential growth/decay:** $\frac{dP}{dt} = kP$ has solution $P = P_0 e^{kt}$
- **Half-life problems:** Use $A(t) = A_0(1/2)^{t/t_{1/2}}$
- **Newton's Law of Cooling:** $\frac{dT}{dt} = -k(T - T_{\text{ambient}})$
- **Always verify** your solution satisfies the original equation
- **Check for lost solutions** when dividing by expressions involving the dependent variable

Differential equations transform abstract calculus into a powerful modeling tool. They bridge mathematics and reality, describing how systems evolve over time. From population dynamics to radioactive decay to cooling coffee, separable differential equations provide a window into understanding change in the natural world. This is just the beginning—higher-order equations, systems of equations, and numerical methods open even more possibilities.
