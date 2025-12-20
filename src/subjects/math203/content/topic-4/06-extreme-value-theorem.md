# The Extreme Value Theorem

The Extreme Value Theorem guarantees that continuous functions on closed intervals achieve their maximum and minimum values. This theorem is fundamental for optimization and ensures that our search for extrema is not in vain.

## Statement of the Theorem

**Extreme Value Theorem (EVT):** If $f$ is continuous on a closed interval $[a, b]$, then $f$ attains an absolute maximum value $f(c)$ and an absolute minimum value $f(d)$ for some $c, d$ in $[a, b]$.

**In other words:** A continuous function on $[a, b]$ has both a highest point and a lowest point somewhere on that interval.

## Why the Hypotheses Matter

**Continuity is required:**

$f(x) = \begin{cases} x & 0 \leq x < 1 \\ 0 & x = 1 \end{cases}$

This function on $[0, 1]$ approaches 1 but never achieves it. No maximum exists because $f$ is discontinuous.

**Closed interval is required:**

$f(x) = x$ on $(0, 1)$

The function gets arbitrarily close to 0 and 1 but never achieves these values. No max or min exists on the open interval.

$f(x) = \frac{1}{x}$ on $(0, 1]$

No maximum (function goes to $\infty$ as $x \to 0^+$), even though the interval is closed on one side.

## Finding Absolute Extrema

**Closed Interval Method:**

For a continuous function $f$ on $[a, b]$:

1. Find all critical points of $f$ in $(a, b)$
2. Evaluate $f$ at each critical point
3. Evaluate $f$ at the endpoints: $f(a)$ and $f(b)$
4. Compare all values: largest is the absolute max, smallest is the absolute min

## Example 1: Polynomial

Find absolute extrema of $f(x) = x^3 - 3x + 1$ on $[-2, 2]$.

**Step 1:** Find critical points.
$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$
Critical points: $x = -1$ and $x = 1$

**Step 2:** Evaluate at critical points and endpoints.
- $f(-2) = -8 + 6 + 1 = -1$
- $f(-1) = -1 + 3 + 1 = 3$
- $f(1) = 1 - 3 + 1 = -1$
- $f(2) = 8 - 6 + 1 = 3$

**Step 3:** Compare.
- Absolute maximum: $3$ (at $x = -1$ and $x = 2$)
- Absolute minimum: $-1$ (at $x = -2$ and $x = 1$)

## Example 2: Trigonometric

Find absolute extrema of $f(x) = \sin x + \cos x$ on $[0, \pi]$.

**Step 1:** Find critical points.
$f'(x) = \cos x - \sin x = 0$
$\cos x = \sin x$
$\tan x = 1$
$x = \frac{\pi}{4}$ (in $[0, \pi]$)

**Step 2:** Evaluate.
- $f(0) = 0 + 1 = 1$
- $f(\frac{\pi}{4}) = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} = \sqrt{2} \approx 1.414$
- $f(\pi) = 0 + (-1) = -1$

**Step 3:** Compare.
- Absolute maximum: $\sqrt{2}$ at $x = \frac{\pi}{4}$
- Absolute minimum: $-1$ at $x = \pi$

## Example 3: Function with Undefined Derivative

Find absolute extrema of $f(x) = x^{2/3}$ on $[-1, 8]$.

**Step 1:** Find critical points.
$f'(x) = \frac{2}{3}x^{-1/3}$

$f'(x) \neq 0$ for any $x$, but $f'(0)$ is undefined. $x = 0$ is a critical point.

**Step 2:** Evaluate.
- $f(-1) = (-1)^{2/3} = 1$
- $f(0) = 0$
- $f(8) = 8^{2/3} = 4$

**Step 3:** Compare.
- Absolute maximum: $4$ at $x = 8$
- Absolute minimum: $0$ at $x = 0$

## Applications

**Optimization problems** often reduce to finding absolute extrema:

- Maximize profit on a production range $[0, M]$
- Minimize cost given constraints
- Find the best dimensions for a container

The EVT guarantees a solution exists, and the closed interval method finds it.

## Uniqueness and Multiplicity

- The absolute max/min values are unique (there's only one "highest" value)
- But they might be achieved at multiple points (as in Example 1)
- The locations $c$ and $d$ guaranteed by EVT might be interior points or endpoints

## Comparison with Local Extrema

| Type | Definition | Where it can occur |
|------|------------|-------------------|
| Local max | Largest nearby | Critical points only |
| Local min | Smallest nearby | Critical points only |
| Absolute max | Largest overall | Critical points or endpoints |
| Absolute min | Smallest overall | Critical points or endpoints |

Every absolute extremum on an open interval is also a local extremum. But on a closed interval, absolute extrema at endpoints might not be local extrema in the usual sense.

## Related Theorems

- **Intermediate Value Theorem:** Continuous functions on $[a,b]$ take all values between $f(a)$ and $f(b)$
- **Mean Value Theorem:** Relates average and instantaneous rates of change
- **Extreme Value Theorem:** Guarantees existence of max and min

Together, these theorems show that continuous functions on closed intervals are "well-behaved."

## Summary

- EVT: Continuous $f$ on $[a,b]$ has absolute max and min
- Both continuity and closed interval are essential
- Closed interval method: check critical points and endpoints
- Compare all values to find absolute extrema
- EVT guarantees optimization problems on closed intervals have solutions
- Absolute extrema can occur at interior critical points or at endpoints
