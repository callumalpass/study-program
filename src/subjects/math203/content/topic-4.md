## Introduction

Derivatives aren't just mathematical abstractions—they're powerful tools for analyzing functions and solving real problems. This topic explores how derivatives reveal function behavior: where functions increase or decrease, where they have peaks and valleys, and how their graphs bend.

**Why This Matters:**
Applications of derivatives appear throughout science and engineering. Finding maximum efficiency, minimum cost, optimal design parameters, or equilibrium points all require understanding how derivatives characterize function behavior. These skills are essential for optimization, which underlies much of applied mathematics.

**Learning Objectives:**
- Use the first derivative to find intervals of increase and decrease
- Locate and classify critical points as local maxima, minima, or neither
- Apply the first and second derivative tests
- Use the second derivative to determine concavity and inflection points
- Apply the Mean Value Theorem and understand its implications
- Find absolute extrema on closed intervals

---

## Core Concepts

### Critical Points

A **critical point** of $f$ is a value $c$ in the domain where:
- $f'(c) = 0$ (horizontal tangent), or
- $f'(c)$ does not exist (corner, cusp, or vertical tangent)

Critical points are the *only* places where local extrema can occur.

**Example:** For $f(x) = x^3 - 3x$:
$$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$$
Critical points: $x = -1$ and $x = 1$

### Increasing and Decreasing Functions

On an interval $I$:
- $f$ is **increasing** if $f'(x) > 0$ for all $x$ in $I$
- $f$ is **decreasing** if $f'(x) < 0$ for all $x$ in $I$

**Procedure for finding intervals:**
1. Find all critical points
2. Create a sign chart for $f'(x)$
3. Test a value in each interval
4. Conclude increase/decrease based on sign

### The First Derivative Test

To classify a critical point $c$:

| $f'$ sign change | Conclusion |
|------------------|------------|
| $+$ to $-$ | Local maximum at $c$ |
| $-$ to $+$ | Local minimum at $c$ |
| No sign change | Neither (saddle point or plateau) |

**Example:** For $f(x) = x^3 - 3x$:
- At $x = -1$: $f'$ changes from $+$ to $-$ → local maximum
- At $x = 1$: $f'$ changes from $-$ to $+$ → local minimum

### Concavity

**Concave up:** Graph curves upward (holds water) — $f''(x) > 0$
**Concave down:** Graph curves downward (spills water) — $f''(x) < 0$

Alternatively:
- Concave up: tangent lines lie below the curve
- Concave down: tangent lines lie above the curve

### Inflection Points

An **inflection point** is where concavity changes.

At an inflection point:
- $f''(x) = 0$ or $f''(x)$ doesn't exist, AND
- $f''$ actually changes sign

**Warning:** $f''(c) = 0$ alone doesn't guarantee an inflection point. You must verify a sign change.

**Example:** For $f(x) = x^4$:
$f''(x) = 12x^2$, so $f''(0) = 0$
But $f''(x) > 0$ for all $x \neq 0$, so no inflection point at $x = 0$.

### The Second Derivative Test

At a critical point $c$ where $f'(c) = 0$:

| $f''(c)$ | Conclusion |
|----------|------------|
| $f''(c) > 0$ | Local minimum (concave up) |
| $f''(c) < 0$ | Local maximum (concave down) |
| $f''(c) = 0$ | Test inconclusive—use first derivative test |

**Advantage:** Often faster than first derivative test
**Disadvantage:** Inconclusive when $f''(c) = 0$

### Absolute Extrema

**Extreme Value Theorem:** If $f$ is continuous on $[a, b]$, then $f$ attains both an absolute maximum and absolute minimum on $[a, b]$.

**Procedure for finding absolute extrema on $[a, b]$:**
1. Find all critical points in $(a, b)$
2. Evaluate $f$ at critical points and endpoints $a$, $b$
3. The largest value is the absolute maximum
4. The smallest value is the absolute minimum

**Example:** Find absolute extrema of $f(x) = x^3 - 3x$ on $[-2, 2]$

Critical points: $x = \pm 1$
Evaluate:
- $f(-2) = -8 + 6 = -2$
- $f(-1) = -1 + 3 = 2$ ← absolute maximum
- $f(1) = 1 - 3 = -2$ ← absolute minimum (tie)
- $f(2) = 8 - 6 = 2$ ← absolute maximum (tie)

### Mean Value Theorem

If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists $c \in (a, b)$ such that:

$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

**Interpretation:** At some point, the instantaneous rate of change equals the average rate of change.

**Geometric meaning:** There's a point where the tangent line is parallel to the secant line through $(a, f(a))$ and $(b, f(b))$.

### Rolle's Theorem

Special case of MVT where $f(a) = f(b)$:

If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there exists $c \in (a, b)$ such that:
$$f'(c) = 0$$

**Interpretation:** Between two equal values, there must be a horizontal tangent.

---

## Applications

### Graphing Functions

Combine all tools for a complete picture:

1. **Domain:** Where is $f$ defined?
2. **Intercepts:** Where does $f$ cross axes?
3. **Symmetry:** Even, odd, or periodic?
4. **Asymptotes:** Horizontal and vertical
5. **Critical points:** Where $f' = 0$ or undefined
6. **Intervals of increase/decrease**
7. **Local extrema:** Via first or second derivative test
8. **Concavity and inflection points**

### Motion Analysis

For position $s(t)$:
- $s'(t) = v(t)$ — velocity
- $s''(t) = v'(t) = a(t)$ — acceleration

**Speeding up:** velocity and acceleration have the same sign
**Slowing down:** velocity and acceleration have opposite signs

### Antiderivative Applications

If you know the derivative behavior, you can deduce function behavior:
- If $f'(x) > 0$ everywhere, $f$ is strictly increasing
- If $f'(x) = 0$ everywhere, $f$ is constant

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Check Endpoints
For absolute extrema on $[a, b]$, always include $f(a)$ and $f(b)$.

### Mistake 2: Assuming $f''(c) = 0$ Means Inflection Point
You need a sign change in $f''$. Check values on both sides.

### Mistake 3: Wrong Interval Analysis
Be careful with sign charts. Test actual values, don't guess.

### Mistake 4: Ignoring Domain Restrictions
Critical points must be in the domain. $f(x) = \sqrt{x}$ has no critical point at $x = -1$.

### Mistake 5: Confusing Local and Absolute Extrema
A local maximum might not be the absolute maximum. Check all candidates.

---

## Best Practices

1. **Make a sign chart** for $f'$ and $f''$
2. **Check boundary behavior** — what happens as $x \to \pm\infty$?
3. **Verify classifications** — don't assume, check!
4. **Sketch intermediate results** — visualizing helps catch errors
5. **State the theorem you're using** — especially MVT applications
6. **Consider the problem context** — physical constraints may limit domain

---

## Summary

- **Critical points** where $f' = 0$ or doesn't exist—only candidates for local extrema
- **First Derivative Test:** Sign change in $f'$ determines max/min
- **Second Derivative Test:** $f''(c) > 0$ → min, $f''(c) < 0$ → max
- **Concavity:** $f'' > 0$ is concave up, $f'' < 0$ is concave down
- **Inflection points:** Where concavity changes
- **Absolute extrema:** Compare critical points and endpoints
- **Mean Value Theorem:** Connects average and instantaneous rates

---

## Further Exploration

- **L'Hôpital's Rule:** Uses derivatives to evaluate limits
- **Optimization Problems:** Applying extrema to word problems
- **Related Rates:** Connecting rates of change of related quantities
- **Curve Sketching:** Complete graphing synthesis
