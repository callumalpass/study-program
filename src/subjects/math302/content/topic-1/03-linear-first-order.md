---
title: "Linear First-Order Differential Equations"
---

# Linear First-Order Differential Equations

## Standard Form

A **first-order linear differential equation** has the standard form:

$$\frac{dy}{dx} + P(x)y = Q(x)$$

where $P(x)$ and $Q(x)$ are given functions of $x$. The equation is **linear** because $y$ and its derivative appear to the first power and are not multiplied together.

If $Q(x) = 0$, the equation is **homogeneous**:
$$\frac{dy}{dx} + P(x)y = 0$$

Otherwise, it is **nonhomogeneous** (or **inhomogeneous**).

**Examples of linear first-order equations**:
- $\frac{dy}{dx} + 3y = e^x$ (with $P(x) = 3$, $Q(x) = e^x$)
- $\frac{dy}{dx} + \frac{2}{x}y = x^2$ (with $P(x) = \frac{2}{x}$, $Q(x) = x^2$)
- $x\frac{dy}{dx} + 2y = \sin x$ (divide by $x$ to get standard form)

## The Integrating Factor Method

The standard method for solving linear first-order equations is the **integrating factor method**. The key idea is to multiply the equation by a carefully chosen function that makes the left side become the derivative of a product.

### Derivation of the Method

Starting with:
$$\frac{dy}{dx} + P(x)y = Q(x)$$

Multiply both sides by a function $\mu(x)$ (to be determined):
$$\mu(x)\frac{dy}{dx} + \mu(x)P(x)y = \mu(x)Q(x)$$

We want the left side to be the derivative of $\mu(x)y$:
$$\frac{d}{dx}[\mu(x)y] = \mu(x)\frac{dy}{dx} + \mu'(x)y$$

Comparing with our equation, we need:
$$\mu'(x) = \mu(x)P(x)$$

This is a separable equation for $\mu$:
$$\frac{d\mu}{\mu} = P(x)dx$$
$$\ln|\mu| = \int P(x)dx$$
$$\mu(x) = e^{\int P(x)dx}$$

This function $\mu(x)$ is called the **integrating factor**.

### Solution Procedure

**Step 1**: Write the equation in standard form $\frac{dy}{dx} + P(x)y = Q(x)$

**Step 2**: Compute the integrating factor $\mu(x) = e^{\int P(x)dx}$ (omit the constant of integration)

**Step 3**: Multiply the entire equation by $\mu(x)$

**Step 4**: Recognize the left side as $\frac{d}{dx}[\mu(x)y]$

**Step 5**: Integrate both sides:
$$\mu(x)y = \int \mu(x)Q(x)dx + C$$

**Step 6**: Solve for $y$:
$$y = \frac{1}{\mu(x)}\left(\int \mu(x)Q(x)dx + C\right)$$

## Examples

### Example 1: Constant Coefficient

Solve $\frac{dy}{dx} + 2y = 3$.

**Solution**:
Here $P(x) = 2$ and $Q(x) = 3$.

Integrating factor:
$$\mu(x) = e^{\int 2\,dx} = e^{2x}$$

Multiply by $\mu(x)$:
$$e^{2x}\frac{dy}{dx} + 2e^{2x}y = 3e^{2x}$$

The left side is:
$$\frac{d}{dx}[e^{2x}y] = 3e^{2x}$$

Integrate:
$$e^{2x}y = \int 3e^{2x}dx = \frac{3}{2}e^{2x} + C$$

Solve for $y$:
$$y = \frac{3}{2} + Ce^{-2x}$$

### Example 2: Variable Coefficient

Solve $\frac{dy}{dx} + \frac{y}{x} = x^2$ for $x > 0$.

**Solution**:
Here $P(x) = \frac{1}{x}$ and $Q(x) = x^2$.

Integrating factor:
$$\mu(x) = e^{\int \frac{1}{x}dx} = e^{\ln x} = x$$

Multiply by $\mu(x) = x$:
$$x\frac{dy}{dx} + y = x^3$$

The left side is:
$$\frac{d}{dx}[xy] = x^3$$

Integrate:
$$xy = \int x^3\,dx = \frac{x^4}{4} + C$$

Solve for $y$:
$$y = \frac{x^3}{4} + \frac{C}{x}$$

### Example 3: Trigonometric Functions

Solve $\frac{dy}{dx} - y\tan x = \sec x$ on $(-\pi/2, \pi/2)$.

**Solution**:
Here $P(x) = -\tan x$ and $Q(x) = \sec x$.

Integrating factor:
$$\mu(x) = e^{\int -\tan x\,dx} = e^{\ln|\cos x|} = |\cos x| = \cos x$$

(We can use $\cos x$ since $\cos x > 0$ on the given interval.)

Multiply by $\mu(x) = \cos x$:
$$\cos x\frac{dy}{dx} - y\sin x = 1$$

The left side is:
$$\frac{d}{dx}[y\cos x] = 1$$

Integrate:
$$y\cos x = x + C$$

Solve for $y$:
$$y = \frac{x + C}{\cos x} = (x + C)\sec x$$

### Example 4: Initial Value Problem

Solve $\frac{dy}{dx} + 3y = 6e^{2x}$ with $y(0) = 1$.

**Solution**:
Here $P(x) = 3$ and $Q(x) = 6e^{2x}$.

Integrating factor:
$$\mu(x) = e^{\int 3\,dx} = e^{3x}$$

Multiply by $e^{3x}$:
$$e^{3x}\frac{dy}{dx} + 3e^{3x}y = 6e^{5x}$$

This gives:
$$\frac{d}{dx}[e^{3x}y] = 6e^{5x}$$

Integrate:
$$e^{3x}y = \int 6e^{5x}dx = \frac{6}{5}e^{5x} + C$$

Solve for $y$:
$$y = \frac{6}{5}e^{2x} + Ce^{-3x}$$

Apply the initial condition $y(0) = 1$:
$$1 = \frac{6}{5}e^0 + Ce^0 = \frac{6}{5} + C$$
$$C = 1 - \frac{6}{5} = -\frac{1}{5}$$

Therefore:
$$y = \frac{6}{5}e^{2x} - \frac{1}{5}e^{-3x}$$

## Homogeneous Linear Equations

For the homogeneous case $\frac{dy}{dx} + P(x)y = 0$, the equation is separable:

$$\frac{dy}{y} = -P(x)dx$$
$$\ln|y| = -\int P(x)dx + C$$
$$y = Ce^{-\int P(x)dx}$$

Alternatively, using the integrating factor method with $Q(x) = 0$:
$$\mu(x)y = \int 0 \cdot \mu(x)dx + C = C$$
$$y = \frac{C}{\mu(x)} = Ce^{-\int P(x)dx}$$

This is called the **complementary solution** or **homogeneous solution**, denoted $y_h$ or $y_c$.

## General Solution Structure

The general solution to the nonhomogeneous equation has the form:

$$y = y_h + y_p$$

where:
- $y_h = Ce^{-\int P(x)dx}$ is the homogeneous solution
- $y_p$ is a particular solution to the nonhomogeneous equation

This structure (general = homogeneous + particular) is fundamental to all linear differential equations.

**Example**: For $\frac{dy}{dx} + 2y = 3$, we found $y = \frac{3}{2} + Ce^{-2x}$.

Here:
- $y_h = Ce^{-2x}$ (solution to $\frac{dy}{dx} + 2y = 0$)
- $y_p = \frac{3}{2}$ (particular solution to the full equation)

## Applications

### RL Circuits

An RL circuit with resistance $R$, inductance $L$, and voltage source $E(t)$ satisfies:

$$L\frac{dI}{dt} + RI = E(t)$$

Dividing by $L$:
$$\frac{dI}{dt} + \frac{R}{L}I = \frac{E(t)}{L}$$

This is a first-order linear equation with $P = R/L$ and $Q(t) = E(t)/L$.

**Example**: If $R = 10\,\Omega$, $L = 2\,\text{H}$, and $E(t) = 20\,\text{V}$ (constant), find $I(t)$ with $I(0) = 0$.

$$\frac{dI}{dt} + 5I = 10$$

Integrating factor: $\mu = e^{5t}$

$$\frac{d}{dt}[e^{5t}I] = 10e^{5t}$$
$$e^{5t}I = 2e^{5t} + C$$
$$I = 2 + Ce^{-5t}$$

From $I(0) = 0$: $0 = 2 + C$, so $C = -2$.

$$I(t) = 2(1 - e^{-5t})$$

As $t \to \infty$, $I \to 2$ A (steady-state current).

### Dilution Problems

A tank initially contains $V_0$ liters of solution with concentration $c_0$. Pure water flows in at rate $r$ L/min, and the mixture flows out at the same rate. Find the concentration $c(t)$.

The amount of substance is $A(t) = c(t) \cdot V_0$.

$$\frac{dA}{dt} = 0 - rc(t) = -r\frac{A}{V_0}$$
$$\frac{dA}{dt} + \frac{r}{V_0}A = 0$$

This is homogeneous linear:
$$A(t) = A_0 e^{-rt/V_0} = c_0 V_0 e^{-rt/V_0}$$
$$c(t) = c_0 e^{-rt/V_0}$$

The concentration decays exponentially.

### Population with Harvesting

A population grows exponentially but is harvested at a constant rate:

$$\frac{dP}{dt} = kP - h$$

where $k$ is the growth rate and $h$ is the harvesting rate.

Rearranging:
$$\frac{dP}{dt} - kP = -h$$

This is linear with $P(t) = -k$ and $Q(t) = -h$.

Integrating factor: $\mu = e^{-kt}$

$$\frac{d}{dt}[e^{-kt}P] = -he^{-kt}$$
$$e^{-kt}P = \frac{h}{k}e^{-kt} + C$$
$$P(t) = \frac{h}{k} + Ce^{kt}$$

The equilibrium population is $P = h/k$. If the initial population is below this, the population will decline to extinction.

## Reduction to Standard Form

Sometimes an equation must be manipulated to reach standard form.

**Example**: Solve $x\frac{dy}{dx} = 2y + x^3\cos x$ for $x > 0$.

Divide by $x$:
$$\frac{dy}{dx} = \frac{2y}{x} + x^2\cos x$$
$$\frac{dy}{dx} - \frac{2}{x}y = x^2\cos x$$

Now it's in standard form with $P(x) = -2/x$ and $Q(x) = x^2\cos x$.

## Conclusion

The integrating factor method provides a systematic approach to solving any first-order linear differential equation. The key steps—identifying $P(x)$ and $Q(x)$, computing $\mu(x) = e^{\int P(x)dx}$, and integrating—work for all equations of this form. The method's power lies in its generality: unlike separation of variables, which only works for separable equations, the integrating factor method applies to all linear first-order equations. Understanding this technique is essential for more advanced topics in differential equations.
