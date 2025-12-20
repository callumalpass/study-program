---
id: math203-t2-rates
title: "Rates of Change"
order: 1
---

# Rates of Change

The derivative measures how fast one quantity changes relative to another. Before diving into the formal definition, let's build intuition through the concept of rates of change, which appears everywhere in science, engineering, and daily life.

## Average Rate of Change

The **average rate of change** of a function $f$ over an interval $[a, b]$ is:

$$\text{Average rate of change} = \frac{f(b) - f(a)}{b - a} = \frac{\Delta y}{\Delta x}$$

This is the slope of the **secant line** connecting the points $(a, f(a))$ and $(b, f(b))$.

**Example: Distance and Velocity**

A car travels along a highway with position $s(t) = t^2 + 2t$ miles after $t$ hours.

Average velocity from $t = 1$ to $t = 3$:
$$\frac{s(3) - s(1)}{3 - 1} = \frac{(9 + 6) - (1 + 2)}{2} = \frac{15 - 3}{2} = 6 \text{ mph}$$

This tells us the car averaged 6 mph over those 2 hours, but not how fast it was going at any specific moment.

## The Problem of Instantaneous Rate

What's the velocity at exactly $t = 2$?

We can't compute $\frac{s(2) - s(2)}{2 - 2} = \frac{0}{0}$.

Instead, we compute average velocities over smaller and smaller intervals around $t = 2$:

| Interval | Average Velocity |
|----------|------------------|
| $[2, 3]$ | $\frac{s(3) - s(2)}{1} = \frac{15 - 8}{1} = 7$ mph |
| $[2, 2.5]$ | $\frac{s(2.5) - s(2)}{0.5} = \frac{11.25 - 8}{0.5} = 6.5$ mph |
| $[2, 2.1]$ | $\frac{s(2.1) - s(2)}{0.1} = \frac{8.61 - 8}{0.1} = 6.1$ mph |
| $[2, 2.01]$ | $\frac{s(2.01) - s(2)}{0.01} = 6.01$ mph |

The average velocities approach 6 mph as the interval shrinks.

**The instantaneous velocity at $t = 2$ is $\lim_{h \to 0} \frac{s(2+h) - s(2)}{h} = 6$ mph.**

## The Difference Quotient

The expression $\frac{f(a+h) - f(a)}{h}$ is called the **difference quotient**. It represents:

- The average rate of change of $f$ from $x = a$ to $x = a + h$
- The slope of the secant line through $(a, f(a))$ and $(a+h, f(a+h))$

As $h \to 0$, the secant line approaches the **tangent line** at $(a, f(a))$.

## Geometric Interpretation

Consider the graph of $y = f(x)$:

1. **Secant line:** Connects two points on the curve. Slope = average rate of change.

2. **Tangent line:** Touches the curve at exactly one point (locally). Slope = instantaneous rate of change.

The derivative at a point is the slope of the tangent line at that point.

## Real-World Examples

**Physics:**
- Position $s(t)$ → Velocity $v(t) = s'(t)$ → Acceleration $a(t) = v'(t)$
- Charge $Q(t)$ → Current $I(t) = Q'(t)$
- Temperature $T(x)$ → Temperature gradient $T'(x)$

**Economics:**
- Total cost $C(q)$ → Marginal cost $C'(q)$
- Revenue $R(q)$ → Marginal revenue $R'(q)$
- Profit $P(q)$ → Marginal profit $P'(q)$

**Biology:**
- Population $P(t)$ → Growth rate $P'(t)$
- Drug concentration $C(t)$ → Rate of absorption/elimination $C'(t)$

**Chemistry:**
- Concentration $[A](t)$ → Reaction rate $[A]'(t)$

## The Transition to Derivatives

The derivative formalizes "instantaneous rate of change" using limits:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

This limit, if it exists, gives:
- The slope of the tangent line at $(a, f(a))$
- The instantaneous rate of change of $f$ at $x = a$
- The "best linear approximation" to $f$ near $x = a$

## Example Calculation

Find the instantaneous rate of change of $f(x) = x^2$ at $x = 3$.

$$f'(3) = \lim_{h \to 0} \frac{f(3+h) - f(3)}{h} = \lim_{h \to 0} \frac{(3+h)^2 - 9}{h}$$

Expand:
$$= \lim_{h \to 0} \frac{9 + 6h + h^2 - 9}{h} = \lim_{h \to 0} \frac{6h + h^2}{h} = \lim_{h \to 0} (6 + h) = 6$$

The tangent line to $y = x^2$ at $x = 3$ has slope 6.

## Summary

- Average rate of change = slope of secant line = $\frac{\Delta y}{\Delta x}$
- Instantaneous rate of change = slope of tangent line = limit of average rates
- The difference quotient $\frac{f(a+h) - f(a)}{h}$ connects average and instantaneous rates
- Derivatives appear throughout science as rates of change
- The derivative at a point is defined as a limit of difference quotients
