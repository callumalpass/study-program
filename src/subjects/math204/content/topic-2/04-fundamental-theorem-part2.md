---
id: math204-t2-ftc2
title: "Fundamental Theorem of Calculus (Part 2)"
order: 4
---

# Fundamental Theorem of Calculus, Part 2

While Part 1 of the Fundamental Theorem of Calculus tells us that differentiation undoes integration, Part 2 provides the computational power that makes definite integrals practical to evaluate. Instead of computing limits of Riemann sums, we can evaluate definite integrals using antiderivatives. This transforms integration from a difficult limiting process into a straightforward algebraic task.

## Statement of FTC Part 2

**Fundamental Theorem of Calculus, Part 2:**

If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$ (meaning $F'(x) = f(x)$), then:

$$\int_a^b f(x) \, dx = F(b) - F(a)$$

**Notation:** We write $F(b) - F(a)$ as $\left[ F(x) \right]_a^b$ or $F(x) \Big|_a^b$.

**In words:** To evaluate a definite integral, find any antiderivative of the integrand, then subtract its value at the lower limit from its value at the upper limit.

## Why FTC Part 2 Works

The key insight comes from FTC Part 1. We know that:
$$A(x) = \int_a^x f(t) \, dt$$

is an antiderivative of $f$ (since $A'(x) = f(x)$ by FTC Part 1).

If $F$ is any other antiderivative of $f$, then $F(x) = A(x) + C$ for some constant $C$ (since antiderivatives differ by a constant).

Now:
$$\int_a^b f(x) \, dx = A(b) = A(b) - A(a) \quad \text{(since } A(a) = 0 \text{)}$$

Since $F(x) = A(x) + C$:
$$F(b) - F(a) = [A(b) + C] - [A(a) + C] = A(b) - A(a) = A(b)$$

Therefore:
$$\int_a^b f(x) \, dx = F(b) - F(a)$$

**Crucial observation:** The constant $C$ cancels when we compute $F(b) - F(a)$, so we can use any antiderivative—we don't need to worry about the $+C$.

## Basic Examples

**Example 1:** Evaluate $\int_1^3 x^2 \, dx$.

An antiderivative of $x^2$ is $F(x) = \frac{x^3}{3}$ (we can ignore the $+C$).

$$\int_1^3 x^2 \, dx = \left[ \frac{x^3}{3} \right]_1^3 = \frac{3^3}{3} - \frac{1^3}{3} = \frac{27}{3} - \frac{1}{3} = 9 - \frac{1}{3} = \frac{26}{3}$$

**Example 2:** Evaluate $\int_0^{\pi} \sin(x) \, dx$.

An antiderivative of $\sin(x)$ is $F(x) = -\cos(x)$.

$$\int_0^{\pi} \sin(x) \, dx = \left[ -\cos(x) \right]_0^{\pi} = -\cos(\pi) - (-\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$$

**Example 3:** Evaluate $\int_1^e \frac{1}{x} \, dx$.

An antiderivative of $\frac{1}{x}$ is $F(x) = \ln|x| = \ln(x)$ for $x > 0$.

$$\int_1^e \frac{1}{x} \, dx = \left[ \ln(x) \right]_1^e = \ln(e) - \ln(1) = 1 - 0 = 1$$

## Working with Algebraic Functions

**Example 4:** Evaluate $\int_0^2 (3x^2 - 4x + 5) \, dx$.

Find the antiderivative term by term:
$$F(x) = x^3 - 2x^2 + 5x$$

Evaluate:
$$\int_0^2 (3x^2 - 4x + 5) \, dx = \left[ x^3 - 2x^2 + 5x \right]_0^2$$
$$= [8 - 8 + 10] - [0 - 0 + 0] = 10$$

**Example 5:** Evaluate $\int_1^4 \sqrt{x} \, dx$.

Rewrite as $x^{1/2}$ and find the antiderivative:
$$F(x) = \frac{x^{3/2}}{3/2} = \frac{2}{3}x^{3/2}$$

$$\int_1^4 \sqrt{x} \, dx = \left[ \frac{2}{3}x^{3/2} \right]_1^4 = \frac{2}{3}(4)^{3/2} - \frac{2}{3}(1)^{3/2}$$
$$= \frac{2}{3}(8) - \frac{2}{3}(1) = \frac{16}{3} - \frac{2}{3} = \frac{14}{3}$$

## Exponential and Logarithmic Functions

**Example 6:** Evaluate $\int_0^1 e^{2x} \, dx$.

The antiderivative of $e^{2x}$ is $\frac{1}{2}e^{2x}$ (using the chain rule in reverse):

$$\int_0^1 e^{2x} \, dx = \left[ \frac{1}{2}e^{2x} \right]_0^1 = \frac{1}{2}e^2 - \frac{1}{2}e^0 = \frac{1}{2}(e^2 - 1)$$

**Example 7:** Evaluate $\int_1^{10} \frac{1}{x} \, dx$.

$$\int_1^{10} \frac{1}{x} \, dx = \left[ \ln|x| \right]_1^{10} = \ln(10) - \ln(1) = \ln(10)$$

## Trigonometric Functions

**Example 8:** Evaluate $\int_0^{\pi/4} \sec^2(x) \, dx$.

The antiderivative of $\sec^2(x)$ is $\tan(x)$:

$$\int_0^{\pi/4} \sec^2(x) \, dx = \left[ \tan(x) \right]_0^{\pi/4} = \tan\left(\frac{\pi}{4}\right) - \tan(0) = 1 - 0 = 1$$

**Example 9:** Evaluate $\int_0^{\pi/2} \cos(2x) \, dx$.

The antiderivative of $\cos(2x)$ is $\frac{1}{2}\sin(2x)$:

$$\int_0^{\pi/2} \cos(2x) \, dx = \left[ \frac{1}{2}\sin(2x) \right]_0^{\pi/2} = \frac{1}{2}\sin(\pi) - \frac{1}{2}\sin(0) = 0 - 0 = 0$$

## The Net Change Theorem

FTC Part 2 has a powerful interpretation in terms of net change. If $F'(x) = f(x)$, then $f$ represents the rate of change of $F$, and:

$$\int_a^b f(x) \, dx = F(b) - F(a)$$

This is the **net change** in $F$ from $x = a$ to $x = b$.

### Applications

**Position and Displacement:** If $v(t)$ is velocity, then position is $s(t)$ where $s'(t) = v(t)$. The net change in position (displacement) from time $t = a$ to $t = b$ is:

$$\int_a^b v(t) \, dt = s(b) - s(a)$$

**Example 10:** A particle has velocity $v(t) = t^2 - 3t + 2$ m/s. Find the displacement from $t = 0$ to $t = 4$ seconds.

$$\int_0^4 (t^2 - 3t + 2) \, dt = \left[ \frac{t^3}{3} - \frac{3t^2}{2} + 2t \right]_0^4$$
$$= \left[ \frac{64}{3} - 24 + 8 \right] - [0] = \frac{64}{3} - 16 = \frac{64 - 48}{3} = \frac{16}{3} \text{ meters}$$

**Cost and Marginal Cost:** If $C'(x)$ is the marginal cost (cost per additional unit), then:

$$\int_a^b C'(x) \, dx = C(b) - C(a)$$

is the total cost of increasing production from $a$ to $b$ units.

**Population Growth:** If $P'(t)$ is the growth rate, then:

$$\int_a^b P'(t) \, dt = P(b) - P(a)$$

is the net change in population.

## Integrals with Negative Values

Remember that definite integrals represent signed area. When the function is negative, the integral is negative.

**Example 11:** Evaluate $\int_0^{\pi} \cos(x) \, dx$.

$$\int_0^{\pi} \cos(x) \, dx = \left[ \sin(x) \right]_0^{\pi} = \sin(\pi) - \sin(0) = 0 - 0 = 0$$

This makes sense geometrically: $\cos(x)$ is positive on $[0, \pi/2]$ and negative on $[\pi/2, \pi]$. The positive and negative areas cancel.

**Example 12:** Find the total area between $y = \sin(x)$ and the $x$-axis from $0$ to $2\pi$.

The signed area is:
$$\int_0^{2\pi} \sin(x) \, dx = \left[ -\cos(x) \right]_0^{2\pi} = -\cos(2\pi) + \cos(0) = -1 + 1 = 0$$

But the total area (ignoring sign) is:
$$\int_0^{\pi} \sin(x) \, dx + \left| \int_{\pi}^{2\pi} \sin(x) \, dx \right| = 2 + |-2| = 4$$

## Common Mistakes

**Mistake 1:** Forgetting to subtract $F(a)$
$$\int_1^3 x \, dx \neq \frac{3^2}{2} \quad \text{(wrong!)}$$

You must subtract:
$$\int_1^3 x \, dx = \left[ \frac{x^2}{2} \right]_1^3 = \frac{9}{2} - \frac{1}{2} = 4$$

**Mistake 2:** Including the $+C$ in the final answer
$$\int_0^1 x \, dx \neq \frac{x^2}{2} + C \Big|_0^1 \quad \text{(wrong!)}$$

The $+C$ is not needed for definite integrals—it cancels out.

**Mistake 3:** Reversing the order of subtraction
$$F(b) - F(a) \neq F(a) - F(b)$$

Always subtract the value at the lower limit from the value at the upper limit.

## Summary

- **FTC Part 2:** $\int_a^b f(x) \, dx = F(b) - F(a)$ where $F'(x) = f(x)$
- To evaluate a definite integral:
  1. Find an antiderivative $F(x)$ of $f(x)$
  2. Compute $F(b) - F(a)$
- The constant of integration $+C$ cancels and can be ignored
- **Net Change Theorem:** $\int_a^b f(x) \, dx = F(b) - F(a)$ represents the net change in $F$
- Definite integrals can be negative (when the function is below the $x$-axis)
- FTC Part 2 transforms the difficult problem of computing limits of Riemann sums into the straightforward task of finding antiderivatives
