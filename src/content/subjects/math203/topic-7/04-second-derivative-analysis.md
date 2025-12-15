# Second Derivative Analysis

The second derivative reveals concavity—whether the graph curves upward or downward. Combined with first derivative analysis, it provides a complete picture of a function's shape.

## Concavity

**Concave up:** Graph opens upward, like a cup (holds water)
- $f''(x) > 0$
- Tangent lines lie below the curve
- Rate of change is increasing

**Concave down:** Graph opens downward
- $f''(x) < 0$
- Tangent lines lie above the curve
- Rate of change is decreasing

**Visual intuition:**
- Concave up: smile 😊
- Concave down: frown ☹️

## Finding Intervals of Concavity

**Process:**
1. Find $f''(x)$
2. Find where $f'' = 0$ or undefined
3. Create a sign chart for $f''$
4. Test each interval

**Example:** $f(x) = x^3 - 6x^2 + 9x + 1$

$f'(x) = 3x^2 - 12x + 9$
$f''(x) = 6x - 12 = 6(x - 2)$

$f''(x) = 0$ when $x = 2$

**Sign chart:**
```
            2
    --------+--------
f''    (−)  |  (+)
    conc dn | conc up
```

**Conclusion:**
- Concave down on $(-\infty, 2)$
- Concave up on $(2, \infty)$

## Inflection Points

An **inflection point** occurs where concavity changes—from up to down or down to up.

**Requirements:**
1. $f''(x) = 0$ (or undefined) at the point
2. $f''$ changes sign at the point
3. $f$ is continuous at the point

**Example (continued):**
At $x = 2$: $f''$ changes from negative to positive

$f(2) = 8 - 24 + 18 + 1 = 3$

Inflection point: $(2, 3)$

**Caution:** $f''(c) = 0$ doesn't guarantee an inflection point. Must verify sign change.

**Counter-example:** $f(x) = x^4$

$f''(x) = 12x^2$
$f''(0) = 0$

But $f''(x) > 0$ for all $x \neq 0$. No sign change!
The point $(0, 0)$ is NOT an inflection point.

## The Second Derivative Test

For finding local maxima and minima at critical points where $f'(c) = 0$:

| $f''(c)$ | Conclusion |
|----------|------------|
| $> 0$ | Local minimum at $c$ |
| $< 0$ | Local maximum at $c$ |
| $= 0$ | Test inconclusive; use first derivative test |

**Intuition:**
- $f''(c) > 0$ → concave up → cup shape → minimum
- $f''(c) < 0$ → concave down → dome shape → maximum

**Example:** $f(x) = x^4 - 4x^3 + 4x^2$

$f'(x) = 4x^3 - 12x^2 + 8x = 4x(x^2 - 3x + 2) = 4x(x-1)(x-2)$

Critical points: $x = 0, 1, 2$

$f''(x) = 12x^2 - 24x + 8$

Test each:
- $f''(0) = 8 > 0$ → local minimum at $x = 0$
- $f''(1) = 12 - 24 + 8 = -4 < 0$ → local maximum at $x = 1$
- $f''(2) = 48 - 48 + 8 = 8 > 0$ → local minimum at $x = 2$

Values:
- $f(0) = 0$ → local min at $(0, 0)$
- $f(1) = 1 - 4 + 4 = 1$ → local max at $(1, 1)$
- $f(2) = 16 - 32 + 16 = 0$ → local min at $(2, 0)$

## Complete Second Derivative Analysis

**Example:** $f(x) = \frac{x}{x^2 + 1}$

**First derivative:**
$$f'(x) = \frac{(x^2+1) - x(2x)}{(x^2+1)^2} = \frac{1 - x^2}{(x^2+1)^2}$$

Critical points: $x = \pm 1$

**Second derivative:**
This is complex; use the quotient rule on $f'$:

$$f''(x) = \frac{-2x(x^2+1)^2 - (1-x^2) \cdot 2(x^2+1)(2x)}{(x^2+1)^4}$$

Factor out $2x(x^2+1)$:
$$= \frac{2x(x^2+1)[-(x^2+1) - 2(1-x^2)]}{(x^2+1)^4} = \frac{2x[-x^2-1-2+2x^2]}{(x^2+1)^3}$$
$$= \frac{2x(x^2-3)}{(x^2+1)^3}$$

**Inflection points:** $f'' = 0$ when $x = 0$ or $x = \pm\sqrt{3}$

**Sign of $f''$:**
Denominator always positive. Numerator: $2x(x^2-3) = 2x(x-\sqrt{3})(x+\sqrt{3})$

```
        −√3      0       √3
    -----+-------+-------+----
f''    (−)  | (+)  | (−) | (+)
```

**Concavity:**
- Concave down: $(-\infty, -\sqrt{3})$ and $(0, \sqrt{3})$
- Concave up: $(-\sqrt{3}, 0)$ and $(\sqrt{3}, \infty)$

**Inflection points:** at $x = -\sqrt{3}, 0, \sqrt{3}$

## Combining First and Second Derivative Information

| $f'$ | $f''$ | Shape |
|------|-------|-------|
| $+$ | $+$ | Increasing, concave up ↗ curving up |
| $+$ | $-$ | Increasing, concave down ↗ curving down |
| $-$ | $+$ | Decreasing, concave up ↘ curving up |
| $-$ | $-$ | Decreasing, concave down ↘ curving down |

At a local maximum: $f' = 0$, $f'' < 0$ (or $f'$ changes + to -)
At a local minimum: $f' = 0$, $f'' > 0$ (or $f'$ changes - to +)
At an inflection point: $f''$ changes sign

## When Second Derivative Test Fails

If $f''(c) = 0$, the second derivative test is inconclusive. Use the first derivative test.

**Example:** $f(x) = x^4$

$f'(x) = 4x^3$, critical point at $x = 0$
$f''(x) = 12x^2$, $f''(0) = 0$ — inconclusive

First derivative test: $f'(x) < 0$ for $x < 0$, $f'(x) > 0$ for $x > 0$
→ Local minimum at $x = 0$

**Example:** $f(x) = x^3$

$f'(x) = 3x^2$, critical point at $x = 0$
$f''(x) = 6x$, $f''(0) = 0$ — inconclusive

First derivative test: $f'(x) > 0$ for both $x < 0$ and $x > 0$
→ Neither max nor min (it's an inflection point)

## Summary

- $f''(x) > 0$ → concave up; $f''(x) < 0$ → concave down
- Inflection points: where concavity changes (must verify sign change)
- Second derivative test: $f''(c) > 0$ → min; $f''(c) < 0$ → max at critical point
- If $f''(c) = 0$, test is inconclusive—use first derivative test
- Complete analysis: find both $f'$ and $f''$, create sign charts for each
- Combine information to understand shape at every point
