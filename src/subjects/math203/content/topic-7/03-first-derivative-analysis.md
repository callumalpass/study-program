---
id: math203-t7-first
title: "First Derivative Analysis"
order: 3
---

# First Derivative Analysis

The first derivative reveals where a function increases, decreases, and has critical points. This analysis is fundamental to understanding the function's shape.

## The First Derivative Test

### Increasing and Decreasing

If $f$ is differentiable on an interval:
- $f'(x) > 0$ on the interval → $f$ is **increasing** there
- $f'(x) < 0$ on the interval → $f$ is **decreasing** there

**Intuition:** Positive slope means going uphill; negative slope means going downhill.

### Finding Intervals of Increase/Decrease

**Process:**
1. Find $f'(x)$
2. Find critical points (where $f' = 0$ or undefined)
3. Create a sign chart for $f'$
4. Test each interval

**Example:** $f(x) = x^3 - 12x$

$f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x-2)(x+2)$

Critical points: $x = -2$ and $x = 2$

**Sign chart:**
```
        −2        2
    ----+----+----+----
f'  (+) | (−)| (+)
    inc | dec| inc
```

Test points:
- $x = -3$: $f'(-3) = 3(9-4) = 15 > 0$ ✓
- $x = 0$: $f'(0) = -12 < 0$ ✓
- $x = 3$: $f'(3) = 3(9-4) = 15 > 0$ ✓

**Conclusion:**
- Increasing on $(-\infty, -2)$ and $(2, \infty)$
- Decreasing on $(-2, 2)$

## Critical Points

A **critical point** of $f$ occurs at $x = c$ if:
- $f'(c) = 0$, or
- $f'(c)$ does not exist (but $f(c)$ exists)

Critical points are candidates for local maxima and minima.

### Types of Critical Points

**Local maximum:** $f$ changes from increasing to decreasing
- $f'$ changes from positive to negative

**Local minimum:** $f$ changes from decreasing to increasing
- $f'$ changes from negative to positive

**Neither (inflection with horizontal tangent):** $f'$ doesn't change sign
- Example: $f(x) = x^3$ at $x = 0$

### The First Derivative Test

Let $c$ be a critical point of $f$ where $f$ is continuous.

| $f'$ before $c$ | $f'$ after $c$ | Conclusion |
|-----------------|----------------|------------|
| $+$ | $-$ | Local maximum at $c$ |
| $-$ | $+$ | Local minimum at $c$ |
| $+$ | $+$ | Neither (increasing through $c$) |
| $-$ | $-$ | Neither (decreasing through $c$) |

**Example (continued):** For $f(x) = x^3 - 12x$

At $x = -2$: $f'$ changes from $+$ to $-$ → **local maximum**
$f(-2) = -8 + 24 = 16$

At $x = 2$: $f'$ changes from $-$ to $+$ → **local minimum**
$f(2) = 8 - 24 = -16$

Local max: $(-2, 16)$
Local min: $(2, -16)$

## Critical Points Where $f'$ is Undefined

**Example:** $f(x) = x^{2/3}$

$f'(x) = \frac{2}{3}x^{-1/3} = \frac{2}{3\sqrt[3]{x}}$

$f'(0)$ is undefined, but $f(0) = 0$ exists.

Critical point at $x = 0$.

Sign of $f'$:
- $x < 0$: $f'(x) < 0$ (decreasing)
- $x > 0$: $f'(x) > 0$ (increasing)

By first derivative test: local minimum at $(0, 0)$.

Note: The graph has a cusp at the origin.

## Complete First Derivative Analysis

**Example:** $f(x) = \frac{x^2}{x-1}$

**Domain:** All $x \neq 1$

**First derivative:**
Using quotient rule:
$$f'(x) = \frac{2x(x-1) - x^2(1)}{(x-1)^2} = \frac{2x^2 - 2x - x^2}{(x-1)^2} = \frac{x^2 - 2x}{(x-1)^2} = \frac{x(x-2)}{(x-1)^2}$$

**Critical points:**
$f'(x) = 0$ when numerator $= 0$: $x = 0$ or $x = 2$
$f'$ undefined at $x = 1$ (not in domain, so not a critical point)

**Sign chart:**
Denominator $(x-1)^2 > 0$ always (when defined)
Numerator: $x(x-2)$

```
         0       1       2
    -----+-------+-------+----
x       (−)  | (+)  | (+) | (+)
x-2     (−)  | (−)  | (−) | (+)
num     (+)  | (−)  | (−) | (+)
f'      (+)  | (−)  | (−) | (+)
```

**Intervals:**
- Increasing: $(-\infty, 0)$ and $(2, \infty)$
- Decreasing: $(0, 1)$ and $(1, 2)$

**Local extrema:**
- At $x = 0$: $f'$ changes from $+$ to $-$ → local max
  $f(0) = 0$, so local max at $(0, 0)$
- At $x = 2$: $f'$ changes from $-$ to $+$ → local min
  $f(2) = \frac{4}{1} = 4$, so local min at $(2, 4)$

## Rational Function Sign Charts

For rational functions, sign charts are especially useful:

1. Factor numerator and denominator completely
2. Mark all zeros on number line
3. Determine sign in each interval (product/quotient of linear factors)
4. Account for even vs. odd multiplicities

**Example:** $f'(x) = \frac{(x+1)^2(x-3)}{(x-1)}$

Zeros at $x = -1, 3$; undefined at $x = 1$

Sign chart:
```
         −1       1       3
    ------+-------+-------+----
(x+1)²   (+)  | (+)  | (+) | (+)  [always ≥ 0]
(x-3)    (−)  | (−)  | (−) | (+)
(x-1)    (−)  | (−)  | (+) | (+)
f'       (+)  | (+)  | (−) | (+)
```

## Global vs. Local Extrema

**Local (relative):** Extremum in a neighborhood
**Global (absolute):** Extremum over entire domain

On a closed interval $[a, b]$:
- Global extrema exist (Extreme Value Theorem)
- Check: endpoints AND critical points
- Largest value is global max; smallest is global min

On an open or infinite interval:
- Global extrema may or may not exist
- Single critical point that's a local max/min is often global
- Check limits at boundaries

## Summary

- $f'(x) > 0$ → increasing; $f'(x) < 0$ → decreasing
- Critical points: where $f' = 0$ or $f'$ undefined
- First derivative test: check sign change of $f'$ at critical points
- Sign charts organize the analysis systematically
- Local extrema occur where $f'$ changes sign
- For global extrema on closed intervals, check critical points and endpoints
