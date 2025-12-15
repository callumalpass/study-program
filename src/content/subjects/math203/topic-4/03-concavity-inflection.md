# Concavity and Inflection Points

The second derivative reveals how a function curves—whether it bends upward or downward. This information helps us understand the shape of graphs and locate inflection points where the curvature changes.

## Concavity Definitions

A function is **concave up** on an interval if its graph lies above its tangent lines (curves upward like a cup).

A function is **concave down** on an interval if its graph lies below its tangent lines (curves downward like a frown).

## The Concavity Test

- If $f''(x) > 0$ on an interval, then $f$ is **concave up** on that interval
- If $f''(x) < 0$ on an interval, then $f$ is **concave down** on that interval

**Intuition:**
- $f'' > 0$ means $f'$ is increasing (slopes getting steeper)
- $f'' < 0$ means $f'$ is decreasing (slopes getting less steep)

## Inflection Points

An **inflection point** is a point where the concavity changes (from up to down, or down to up).

**To find inflection points:**
1. Find where $f''(x) = 0$ or $f''(x)$ is undefined
2. Check that concavity actually changes at these points

**Important:** $f''(c) = 0$ does NOT guarantee an inflection point. Concavity must actually change.

## Example: Complete Concavity Analysis

**Analyze:** $f(x) = x^3 - 6x^2 + 9x + 1$

$f'(x) = 3x^2 - 12x + 9$
$f''(x) = 6x - 12 = 6(x - 2)$

$f''(x) = 0$ when $x = 2$

**Sign analysis:**
- For $x < 2$: $f''(x) = 6(x-2) < 0$ → concave down
- For $x > 2$: $f''(x) = 6(x-2) > 0$ → concave up

Concavity changes at $x = 2$, so $(2, f(2)) = (2, 3)$ is an inflection point.

## Example: Multiple Inflection Points

**Analyze:** $f(x) = x^4 - 6x^2$

$f'(x) = 4x^3 - 12x$
$f''(x) = 12x^2 - 12 = 12(x^2 - 1) = 12(x-1)(x+1)$

$f''(x) = 0$ when $x = \pm 1$

**Sign analysis:**

| Interval | Sign of $f''(x)$ | Concavity |
|----------|------------------|-----------|
| $x < -1$ | $(-)(-) = +$ | Up |
| $-1 < x < 1$ | $(-)(+) = -$ | Down |
| $x > 1$ | $(+)(+) = +$ | Up |

Inflection points: $(-1, f(-1)) = (-1, -5)$ and $(1, f(1)) = (1, -5)$

## When f''(c) = 0 Is NOT an Inflection Point

**Example:** $f(x) = x^4$

$f''(x) = 12x^2$
$f''(0) = 0$

But $f''(x) = 12x^2 \geq 0$ for all $x$, so concavity never changes.

The point $(0, 0)$ is NOT an inflection point (the function is always concave up).

## Relationship Between f, f', and f''

| $f''$ | $f'$ | $f$ |
|-------|------|-----|
| $f'' > 0$ | $f'$ increasing | Concave up |
| $f'' < 0$ | $f'$ decreasing | Concave down |
| $f'' = 0$ | $f'$ has critical point | Possible inflection |

## Visual Guide to Concavity

**Concave up ($f'' > 0$):**
- Graph curves like a smile
- Tangent lines lie below the curve
- If you're walking along the graph, you're turning left (for increasing $x$)

**Concave down ($f'' < 0$):**
- Graph curves like a frown
- Tangent lines lie above the curve
- If you're walking along the graph, you're turning right

## Combining Information

A complete analysis of $f(x) = xe^{-x}$:

$f'(x) = e^{-x} - xe^{-x} = e^{-x}(1-x)$
$f''(x) = -e^{-x}(1-x) + e^{-x}(-1) = e^{-x}(x-2)$

**Critical points:** $f'(x) = 0$ when $x = 1$

**Inflection points:** $f''(x) = 0$ when $x = 2$

| Interval | $f'$ sign | $f''$ sign | Behavior |
|----------|-----------|------------|----------|
| $x < 1$ | $+$ | $-$ | Increasing, concave down |
| $1 < x < 2$ | $-$ | $-$ | Decreasing, concave down |
| $x > 2$ | $-$ | $+$ | Decreasing, concave up |

At $x = 1$: local maximum (changes from inc to dec)
At $x = 2$: inflection point (concavity changes)

## Inflection Points and f'

At an inflection point, $f'$ has a local extremum:
- If $f'' > 0$ before and $f'' < 0$ after, then $f'$ has a local max
- If $f'' < 0$ before and $f'' > 0$ after, then $f'$ has a local min

This makes sense: inflection points are where the slope stops increasing and starts decreasing (or vice versa).

## Summary

- Concave up: $f'' > 0$, graph curves upward, tangent lines below
- Concave down: $f'' < 0$, graph curves downward, tangent lines above
- Inflection point: where concavity changes
- Find candidates by solving $f''(x) = 0$ or finding where $f''$ is undefined
- Verify by checking that $f''$ changes sign
- $f''(c) = 0$ alone doesn't guarantee an inflection point
