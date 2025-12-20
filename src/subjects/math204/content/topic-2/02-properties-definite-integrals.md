---
id: math204-t2-properties
title: "Properties of Definite Integrals"
order: 2
---

# Properties of Definite Integrals

Definite integrals possess several algebraic and geometric properties that simplify computation and reveal important relationships between functions and their integrals. Understanding these properties is essential for efficient problem-solving and provides insight into the structure of integration.

## Linearity Properties

The definite integral is a **linear operator**, meaning it respects addition and scalar multiplication.

### Constant Multiple Rule

If $c$ is a constant, then:
$$\int_a^b c \cdot f(x) \, dx = c \int_a^b f(x) \, dx$$

**Interpretation:** Scaling a function by a constant scales its integral by the same constant. If you double the height of a region, you double its area.

**Example:**
$$\int_0^2 3x^2 \, dx = 3 \int_0^2 x^2 \, dx$$

If we know that $\int_0^2 x^2 \, dx = \frac{8}{3}$, then:
$$\int_0^2 3x^2 \, dx = 3 \cdot \frac{8}{3} = 8$$

### Sum Rule

For any functions $f$ and $g$:
$$\int_a^b [f(x) + g(x)] \, dx = \int_a^b f(x) \, dx + \int_a^b g(x) \, dx$$

**Interpretation:** The integral of a sum is the sum of the integrals. You can break complicated functions into simpler pieces.

**Example:**
$$\int_1^3 (x^2 + 2x) \, dx = \int_1^3 x^2 \, dx + \int_1^3 2x \, dx$$

### Difference Rule

Similarly:
$$\int_a^b [f(x) - g(x)] \, dx = \int_a^b f(x) \, dx - \int_a^b g(x) \, dx$$

### Combined Linearity

In general, for constants $c$ and $d$:
$$\int_a^b [c \cdot f(x) + d \cdot g(x)] \, dx = c \int_a^b f(x) \, dx + d \int_a^b g(x) \, dx$$

**Example:** If $\int_0^1 f(x) \, dx = 5$ and $\int_0^1 g(x) \, dx = -2$, find $\int_0^1 [3f(x) - 4g(x)] \, dx$.

$$\int_0^1 [3f(x) - 4g(x)] \, dx = 3 \int_0^1 f(x) \, dx - 4 \int_0^1 g(x) \, dx$$
$$= 3(5) - 4(-2) = 15 + 8 = 23$$

## Properties Involving Limits of Integration

### Zero-Width Interval

If the upper and lower limits are the same, the integral is zero:
$$\int_a^a f(x) \, dx = 0$$

**Interpretation:** The "area" under a curve over an interval of zero width is zero.

### Reversing Limits

Reversing the order of integration changes the sign:
$$\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$$

**Example:**
$$\int_2^5 x^2 \, dx = -\int_5^2 x^2 \, dx$$

This makes sense geometrically: if we think of integration as moving from left to right, reversing direction should negate the result.

### Additivity Over Intervals

For any three points $a$, $b$, and $c$:
$$\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx$$

This holds **regardless of the order** of $a$, $b$, and $c$ (they don't need to satisfy $a < b < c$).

**Interpretation:** You can split an integral over an interval into integrals over subintervals. The total area from $a$ to $c$ equals the area from $a$ to $b$ plus the area from $b$ to $c$.

**Example:** If $\int_0^2 f(x) \, dx = 10$ and $\int_2^5 f(x) \, dx = 7$, then:
$$\int_0^5 f(x) \, dx = \int_0^2 f(x) \, dx + \int_2^5 f(x) \, dx = 10 + 7 = 17$$

**Example with reordering:** Find $\int_0^2 f(x) \, dx$ if $\int_0^5 f(x) \, dx = 17$ and $\int_2^5 f(x) \, dx = 7$.

$$\int_0^5 f(x) \, dx = \int_0^2 f(x) \, dx + \int_2^5 f(x) \, dx$$
$$17 = \int_0^2 f(x) \, dx + 7$$
$$\int_0^2 f(x) \, dx = 10$$

## Comparison Properties

These properties relate the sizes of integrals based on the sizes of integrands.

### Non-negativity

If $f(x) \geq 0$ for all $x$ in $[a, b]$, then:
$$\int_a^b f(x) \, dx \geq 0$$

**Interpretation:** If a function is non-negative, its integral (total signed area) is non-negative.

### Comparison Theorem

If $f(x) \leq g(x)$ for all $x$ in $[a, b]$, then:
$$\int_a^b f(x) \, dx \leq \int_a^b g(x) \, dx$$

**Interpretation:** If one function is always below another, its integral is smaller. Bigger function means bigger area.

**Example:** Since $\sin(x) \leq 1$ for all $x$ in $[0, \pi]$:
$$\int_0^\pi \sin(x) \, dx \leq \int_0^\pi 1 \, dx = \pi$$

Indeed, $\int_0^\pi \sin(x) \, dx = 2$, which is less than $\pi \approx 3.14$.

### Absolute Value Inequality

For any function $f$:
$$\left| \int_a^b f(x) \, dx \right| \leq \int_a^b |f(x)| \, dx$$

**Interpretation:** The absolute value of an integral is at most the integral of the absolute value. Positive and negative contributions can cancel in the left side but not in the right side.

**Example:** $\int_0^{2\pi} \sin(x) \, dx = 0$, but $\int_0^{2\pi} |\sin(x)| \, dx = 4$ (two humps, each with area 2).

## Bounds on Integrals

### Maximum-Minimum Inequality

If $m \leq f(x) \leq M$ for all $x$ in $[a, b]$, then:
$$m(b - a) \leq \int_a^b f(x) \, dx \leq M(b - a)$$

**Interpretation:** The integral is bounded by the area of rectangles with heights equal to the minimum and maximum values of the function.

**Example:** Estimate $\int_1^4 \frac{1}{x} \, dx$.

On $[1, 4]$, the function $f(x) = \frac{1}{x}$ is decreasing, so:
- Maximum: $M = f(1) = 1$
- Minimum: $m = f(4) = \frac{1}{4}$

Therefore:
$$\frac{1}{4}(4 - 1) \leq \int_1^4 \frac{1}{x} \, dx \leq 1(4 - 1)$$
$$\frac{3}{4} \leq \int_1^4 \frac{1}{x} \, dx \leq 3$$

The actual value is $\ln(4) \approx 1.386$, which indeed lies in this range.

## Symmetry Properties

### Even Functions

A function is **even** if $f(-x) = f(x)$ for all $x$. Examples: $x^2$, $\cos(x)$, $|x|$.

For even functions:
$$\int_{-a}^a f(x) \, dx = 2 \int_0^a f(x) \, dx$$

**Interpretation:** The area from $-a$ to $0$ equals the area from $0$ to $a$ (by symmetry), so we can compute one half and double it.

**Example:**
$$\int_{-2}^2 x^4 \, dx = 2 \int_0^2 x^4 \, dx$$

### Odd Functions

A function is **odd** if $f(-x) = -f(x)$ for all $x$. Examples: $x$, $x^3$, $\sin(x)$.

For odd functions:
$$\int_{-a}^a f(x) \, dx = 0$$

**Interpretation:** The area from $-a$ to $0$ exactly cancels the area from $0$ to $a$ (one is the reflection of the other across the origin).

**Example:**
$$\int_{-\pi}^\pi \sin(x) \, dx = 0$$

No computation needed—we immediately know the answer by symmetry!

## Worked Example: Using Properties Together

Suppose $\int_0^4 f(x) \, dx = 10$, $\int_0^4 g(x) \, dx = -3$, and $\int_2^4 f(x) \, dx = 6$. Evaluate:

**(a)** $\int_0^2 f(x) \, dx$

Using additivity:
$$\int_0^4 f(x) \, dx = \int_0^2 f(x) \, dx + \int_2^4 f(x) \, dx$$
$$10 = \int_0^2 f(x) \, dx + 6$$
$$\int_0^2 f(x) \, dx = 4$$

**(b)** $\int_0^4 [2f(x) - 3g(x)] \, dx$

Using linearity:
$$\int_0^4 [2f(x) - 3g(x)] \, dx = 2\int_0^4 f(x) \, dx - 3\int_0^4 g(x) \, dx$$
$$= 2(10) - 3(-3) = 20 + 9 = 29$$

**(c)** $\int_4^2 f(x) \, dx$

Using reversal of limits:
$$\int_4^2 f(x) \, dx = -\int_2^4 f(x) \, dx = -6$$

## Applications of Comparison

**Example:** Show that $\int_0^1 e^{-x^2} \, dx < 1$.

We cannot evaluate $\int_0^1 e^{-x^2} \, dx$ directly (no elementary antiderivative exists), but we can bound it.

For $x$ in $[0, 1]$, we have $x^2 \geq 0$, so $-x^2 \leq 0$, which means $e^{-x^2} \leq e^0 = 1$.

By the comparison theorem:
$$\int_0^1 e^{-x^2} \, dx \leq \int_0^1 1 \, dx = 1$$

Since $e^{-x^2} < 1$ for $x \neq 0$, the inequality is strict:
$$\int_0^1 e^{-x^2} \, dx < 1$$

## Summary

**Linearity:**
- $\int_a^b [c \cdot f(x) + d \cdot g(x)] \, dx = c \int_a^b f(x) \, dx + d \int_a^b g(x) \, dx$

**Limits:**
- $\int_a^a f(x) \, dx = 0$
- $\int_a^b f(x) \, dx = -\int_b^a f(x) \, dx$
- $\int_a^b f(x) \, dx + \int_b^c f(x) \, dx = \int_a^c f(x) \, dx$

**Comparison:**
- If $f(x) \leq g(x)$, then $\int_a^b f(x) \, dx \leq \int_a^b g(x) \, dx$
- $\left| \int_a^b f(x) \, dx \right| \leq \int_a^b |f(x)| \, dx$
- $m(b - a) \leq \int_a^b f(x) \, dx \leq M(b - a)$ when $m \leq f(x) \leq M$

**Symmetry:**
- Even functions: $\int_{-a}^a f(x) \, dx = 2\int_0^a f(x) \, dx$
- Odd functions: $\int_{-a}^a f(x) \, dx = 0$
