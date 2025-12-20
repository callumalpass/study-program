---
id: math203-t4-mvt
title: "The Mean Value Theorem"
order: 4
---

# The Mean Value Theorem

The Mean Value Theorem (MVT) is one of the most important theoretical results in calculus. It connects the average rate of change of a function over an interval to the instantaneous rate of change at some point within that interval.

## Statement of the Mean Value Theorem

If $f$ is:
1. Continuous on the closed interval $[a, b]$
2. Differentiable on the open interval $(a, b)$

Then there exists at least one point $c$ in $(a, b)$ such that:

$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

## Geometric Interpretation

The right side, $\frac{f(b) - f(a)}{b - a}$, is the slope of the **secant line** connecting $(a, f(a))$ and $(b, f(b))$.

The left side, $f'(c)$, is the slope of the **tangent line** at $x = c$.

**MVT says:** Somewhere between $a$ and $b$, there's a point where the tangent line is parallel to the secant line.

**Physical interpretation:** If you drive 100 miles in 2 hours (average speed 50 mph), at some moment your speedometer must have read exactly 50 mph.

## Rolle's Theorem: A Special Case

**Rolle's Theorem:** If $f$ satisfies the MVT hypotheses AND $f(a) = f(b)$, then there exists $c$ in $(a, b)$ where $f'(c) = 0$.

This is MVT with $\frac{f(b) - f(a)}{b - a} = 0$.

**Interpretation:** If a function starts and ends at the same height, it must have a horizontal tangent somewhere in between.

## Examples

**Example 1:** Verify MVT for $f(x) = x^2$ on $[1, 3]$.

Check hypotheses: $f$ is a polynomial, so it's continuous and differentiable everywhere. ✓

Compute:
- $f(1) = 1$, $f(3) = 9$
- Average rate: $\frac{9 - 1}{3 - 1} = 4$

Find $c$: $f'(x) = 2x = 4$ gives $x = 2$

Since $2 \in (1, 3)$, MVT is verified with $c = 2$.

**Example 2:** Find the value(s) of $c$ guaranteed by MVT for $f(x) = x^3 - x$ on $[0, 2]$.

$\frac{f(2) - f(0)}{2 - 0} = \frac{(8-2) - 0}{2} = 3$

Solve $f'(c) = 3$:
$3c^2 - 1 = 3$
$c^2 = \frac{4}{3}$
$c = \pm\frac{2}{\sqrt{3}}$

Only $c = \frac{2}{\sqrt{3}} \approx 1.15$ is in $(0, 2)$.

**Example 3:** Show that $x^3 + x - 1 = 0$ has exactly one real root.

Let $f(x) = x^3 + x - 1$.

*Existence:* $f(0) = -1 < 0$ and $f(1) = 1 > 0$. By IVT, there's at least one root in $(0, 1)$.

*Uniqueness:* $f'(x) = 3x^2 + 1 > 0$ for all $x$, so $f$ is strictly increasing.

A strictly increasing function can cross the x-axis at most once. Combined with existence, there's exactly one root.

## Consequences of MVT

**1. Functions with zero derivative are constant:**

If $f'(x) = 0$ for all $x$ in an interval, then $f$ is constant on that interval.

*Proof:* For any $a, b$ in the interval, MVT gives $f(b) - f(a) = f'(c)(b-a) = 0 \cdot (b-a) = 0$.

**2. Functions with equal derivatives differ by a constant:**

If $f'(x) = g'(x)$ for all $x$, then $f(x) = g(x) + C$ for some constant $C$.

*Proof:* Let $h = f - g$. Then $h' = 0$, so $h$ is constant.

**3. Sign of derivative determines monotonicity:**

- If $f'(x) > 0$ on $(a, b)$, then $f$ is strictly increasing on $(a, b)$
- If $f'(x) < 0$ on $(a, b)$, then $f$ is strictly decreasing on $(a, b)$

## When MVT Doesn't Apply

The hypotheses must be satisfied!

**Example:** $f(x) = |x|$ on $[-1, 1]$

$f(-1) = f(1) = 1$, so Rolle's Theorem would predict $f'(c) = 0$ somewhere.

But $f'(x) = \pm 1$ (never 0), and $f'(0)$ doesn't exist.

MVT doesn't apply because $f$ isn't differentiable on $(-1, 1)$.

## Applications

**Speed limits:** If you travel 90 miles in 1 hour, MVT guarantees you were going exactly 90 mph at some point—useful for speeding tickets!

**Growth bounds:** If $|f'(x)| \leq M$ on $[a, b]$, then $|f(b) - f(a)| \leq M|b - a|$.

**Proving identities:** Show that $\sin x < x$ for $x > 0$:

Let $f(x) = x - \sin x$. Then $f(0) = 0$ and $f'(x) = 1 - \cos x \geq 0$.

By MVT, for $x > 0$: $f(x) - f(0) = f'(c) \cdot x \geq 0$, so $f(x) \geq 0$, meaning $x \geq \sin x$.

## Summary

- MVT: If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then $f'(c) = \frac{f(b)-f(a)}{b-a}$ for some $c \in (a,b)$
- Rolle's Theorem: Special case when $f(a) = f(b)$
- Geometric meaning: tangent parallel to secant
- Key consequences: constant functions, monotonicity, uniqueness of antiderivatives up to constants
- MVT requires both continuity and differentiability
