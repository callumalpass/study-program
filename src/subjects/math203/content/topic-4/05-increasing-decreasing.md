---
id: math203-t4-increasing
title: "Increasing and Decreasing Functions"
order: 5
---

# Increasing and Decreasing Functions

The first derivative tells us exactly where a function is going up and where it's going down. This information is crucial for sketching graphs and understanding function behavior.

## Definitions

A function $f$ is **increasing** on an interval if for any $x_1 < x_2$ in the interval, $f(x_1) < f(x_2)$.

A function $f$ is **decreasing** on an interval if for any $x_1 < x_2$ in the interval, $f(x_1) > f(x_2)$.

**Strictly** increasing/decreasing means the inequalities are strict (not $\leq$ or $\geq$).

## The Increasing/Decreasing Test

Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$:

- If $f'(x) > 0$ for all $x$ in $(a, b)$, then $f$ is **increasing** on $[a, b]$
- If $f'(x) < 0$ for all $x$ in $(a, b)$, then $f$ is **decreasing** on $[a, b]$
- If $f'(x) = 0$ for all $x$ in $(a, b)$, then $f$ is **constant** on $[a, b]$

**Why it works:** $f'(x) > 0$ means the slope is always positive—the function is always going uphill.

## Finding Intervals of Increase/Decrease

**Method:**
1. Find $f'(x)$
2. Find critical points (where $f' = 0$ or undefined)
3. Create a sign chart: test $f'$ in each interval between critical points
4. Conclude: $f' > 0$ → increasing, $f' < 0$ → decreasing

## Example 1: Polynomial

Find where $f(x) = 2x^3 - 9x^2 + 12x - 3$ is increasing and decreasing.

$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x-1)(x-2)$

Critical points: $x = 1$ and $x = 2$

**Sign chart:**

| Interval | Test point | $f'(x)$ sign | Conclusion |
|----------|------------|--------------|------------|
| $(-\infty, 1)$ | $x = 0$ | $6(-)(-) = +$ | Increasing |
| $(1, 2)$ | $x = 1.5$ | $6(+)(-) = -$ | Decreasing |
| $(2, \infty)$ | $x = 3$ | $6(+)(+) = +$ | Increasing |

**Result:** Increasing on $(-\infty, 1]$ and $[2, \infty)$; decreasing on $[1, 2]$.

## Example 2: With Undefined Derivative

Find where $f(x) = x^{2/3}$ is increasing and decreasing.

$f'(x) = \frac{2}{3}x^{-1/3} = \frac{2}{3\sqrt[3]{x}}$

$f'(x)$ is undefined at $x = 0$, never equals 0.

**Sign analysis:**
- For $x < 0$: $\sqrt[3]{x} < 0$, so $f'(x) < 0$
- For $x > 0$: $\sqrt[3]{x} > 0$, so $f'(x) > 0$

**Result:** Decreasing on $(-\infty, 0]$; increasing on $[0, \infty)$.

Local minimum at $x = 0$.

## Example 3: Rational Function

Find where $f(x) = \frac{x^2}{x-1}$ is increasing and decreasing.

Using quotient rule:
$f'(x) = \frac{2x(x-1) - x^2(1)}{(x-1)^2} = \frac{2x^2 - 2x - x^2}{(x-1)^2} = \frac{x^2 - 2x}{(x-1)^2} = \frac{x(x-2)}{(x-1)^2}$

Critical points: $f'(x) = 0$ when $x = 0$ or $x = 2$
$f'$ undefined at $x = 1$ (but $f$ is also undefined there)

**Sign chart:** (Note: $(x-1)^2 > 0$ always when $x \neq 1$)

| Interval | Sign of $x(x-2)$ | Conclusion |
|----------|------------------|------------|
| $(-\infty, 0)$ | $(-)(-)= +$ | Increasing |
| $(0, 1)$ | $(+)(-)= -$ | Decreasing |
| $(1, 2)$ | $(+)(-)= -$ | Decreasing |
| $(2, \infty)$ | $(+)(+)= +$ | Increasing |

**Result:** Increasing on $(-\infty, 0]$ and $[2, \infty)$; decreasing on $[0, 1)$ and $(1, 2]$.

## Connecting to Extrema

The transition from increasing to decreasing (or vice versa) identifies local extrema:

- Increasing then decreasing → local maximum
- Decreasing then increasing → local minimum
- Same direction on both sides → no extremum

This is the **first derivative test** from the previous section.

## Strictly vs. Non-Strictly Monotonic

If $f'(x) \geq 0$ (with equality possible), $f$ is non-decreasing (increasing or constant).

If $f'(x) > 0$ everywhere (strictly), $f$ is strictly increasing.

**Example:** $f(x) = x^3$ has $f'(x) = 3x^2 \geq 0$.

$f'(0) = 0$, but $f$ is still strictly increasing overall (one point with $f' = 0$ doesn't break strict monotonicity).

## Using Increasing/Decreasing for Inequalities

**Example:** Prove that $e^x > 1 + x$ for all $x \neq 0$.

Let $f(x) = e^x - 1 - x$. Then $f(0) = 0$.

$f'(x) = e^x - 1$

- For $x < 0$: $e^x < 1$, so $f'(x) < 0$ (decreasing)
- For $x > 0$: $e^x > 1$, so $f'(x) > 0$ (increasing)

$f$ has a minimum at $x = 0$ where $f(0) = 0$.

For $x \neq 0$: $f(x) > f(0) = 0$, so $e^x - 1 - x > 0$, meaning $e^x > 1 + x$.

## Common Mistakes

**Mistake 1: Including critical points in the wrong intervals**

When stating intervals of increase/decrease, be careful about whether to include endpoints. At a critical point where $f'(c) = 0$, the function is neither increasing nor decreasing at that exact point.

**Mistake 2: Ignoring points where $f'$ is undefined**

If $f'$ is undefined at a point in the domain (like $x = 0$ for $f(x) = |x|$), that point is a critical point and should divide your intervals.

**Mistake 3: Confusing local and global behavior**

A function can be increasing on an interval but still have a smaller value later due to a decrease on another interval. "Increasing on $[1, 3]$" only means $f(1) < f(2) < f(3)$, not that these are the largest values overall.

## Connection to Antiderivatives

If you know $f'(x) > 0$ everywhere, then $f$ is increasing. This is one direction of the relationship between a function and its derivative. The reverse—reconstructing $f$ from $f'$—is the subject of integration, coming in Calculus II.

## Summary

- $f'(x) > 0$ → $f$ is increasing
- $f'(x) < 0$ → $f$ is decreasing
- Critical points divide the domain into intervals
- Create sign chart to determine behavior on each interval
- Transitions between increasing/decreasing identify extrema
- This analysis is essential for curve sketching
