---
id: math203-t4-rolles
title: "Rolle's Theorem and Applications"
order: 7
---

# Rolle's Theorem and Applications

Rolle's Theorem is a foundational result that leads directly to the Mean Value Theorem, one of the most important theorems in calculus. Understanding Rolle's Theorem provides insight into why derivatives equal zero at extrema and how this connects to the behavior of functions on intervals.

## Statement of Rolle's Theorem

**Rolle's Theorem:** Let $f$ be a function that satisfies:
1. $f$ is continuous on the closed interval $[a, b]$
2. $f$ is differentiable on the open interval $(a, b)$
3. $f(a) = f(b)$

Then there exists at least one number $c$ in $(a, b)$ such that $f'(c) = 0$.

### Geometric Interpretation

If a smooth curve starts and ends at the same height, it must have a horizontal tangent somewhere in between. Think of a roller coaster that returns to its starting elevation—somewhere along the ride, there must be a peak or a valley where the track is momentarily level.

### Visual Understanding

Consider $f(x) = x^2 - 4x + 3$ on $[1, 3]$:

- $f(1) = 1 - 4 + 3 = 0$
- $f(3) = 9 - 12 + 3 = 0$

So $f(a) = f(b) = 0$. Rolle's Theorem guarantees some $c$ where $f'(c) = 0$.

$f'(x) = 2x - 4 = 0$ gives $c = 2$, which is indeed in $(1, 3)$.

## Why Each Hypothesis Matters

### Continuity is Required

Consider the function:
$$f(x) = \begin{cases} x & 0 \leq x < 1 \\ 0 & x = 1 \end{cases}$$

Here $f(0) = 0 = f(1)$, but there's no point where $f'(c) = 0$ (the derivative is 1 everywhere it exists, and the function isn't continuous at $x = 1$).

### Differentiability is Required

Consider $f(x) = |x|$ on $[-1, 1]$:

- $f(-1) = 1 = f(1)$
- $f$ is continuous on $[-1, 1]$
- But $f$ is not differentiable at $x = 0$

Even though there's a minimum at $x = 0$, the theorem doesn't apply because differentiability fails. (Of course, the "spirit" of the theorem still holds—there is a minimum, just without a defined derivative there.)

### Equal Endpoint Values Required

Consider $f(x) = x$ on $[0, 1]$:

- $f(0) = 0 \neq 1 = f(1)$
- $f'(x) = 1 \neq 0$ everywhere

Without equal endpoint values, we can't guarantee a horizontal tangent.

## Applications of Rolle's Theorem

### Application 1: Proving Existence of Roots

**Theorem:** If a polynomial $p(x)$ has $n$ distinct real roots, then $p'(x)$ has at least $n - 1$ real roots.

**Proof:** Let $r_1 < r_2 < \cdots < r_n$ be the roots of $p$.

Between consecutive roots $r_i$ and $r_{i+1}$, we have $p(r_i) = 0 = p(r_{i+1})$.

By Rolle's Theorem, there exists $c_i \in (r_i, r_{i+1})$ where $p'(c_i) = 0$.

This gives us $n - 1$ distinct roots of $p'$. ∎

**Example:** $p(x) = x^3 - 3x$ has roots at $x = -\sqrt{3}, 0, \sqrt{3}$ (three roots).

$p'(x) = 3x^2 - 3 = 3(x-1)(x+1)$ has roots at $x = -1, 1$ (two roots).

Indeed, $-1$ is between $-\sqrt{3}$ and $0$, and $1$ is between $0$ and $\sqrt{3}$.

### Application 2: Uniqueness of Solutions

**Claim:** The equation $x^3 + 3x + 1 = 0$ has exactly one real solution.

**Proof:**

*Existence:* Let $f(x) = x^3 + 3x + 1$.
- $f(-1) = -1 - 3 + 1 = -3 < 0$
- $f(0) = 1 > 0$

By the Intermediate Value Theorem, $f$ has at least one root in $(-1, 0)$.

*Uniqueness:* Suppose $f$ has two roots $r_1 < r_2$. Then by Rolle's Theorem, there exists $c$ between them where $f'(c) = 0$.

But $f'(x) = 3x^2 + 3 = 3(x^2 + 1) > 0$ for all $x$.

This contradiction shows $f$ cannot have two roots. ∎

### Application 3: Proving Identities

**Claim:** $\sin^2 x + \cos^2 x = 1$ for all $x$.

**Proof using derivatives:**

Let $f(x) = \sin^2 x + \cos^2 x$.

$f'(x) = 2\sin x \cos x + 2\cos x(-\sin x) = 0$ for all $x$.

Since $f'(x) = 0$ everywhere, $f$ is constant. Since $f(0) = 0 + 1 = 1$, we have $f(x) = 1$ for all $x$. ∎

## The Mean Value Theorem Connection

Rolle's Theorem is a special case of the **Mean Value Theorem** (MVT):

**Mean Value Theorem:** If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists $c$ in $(a, b)$ such that:
$$f'(c) = \frac{f(b) - f(a)}{b - a}$$

When $f(a) = f(b)$, the right side becomes $\frac{0}{b-a} = 0$, and MVT reduces to Rolle's Theorem.

### Intuition for MVT

The MVT says: somewhere on the curve, the instantaneous rate of change equals the average rate of change. In driving terms, if you travel 100 miles in 2 hours (average 50 mph), at some point your speedometer must have shown exactly 50 mph.

## Worked Examples

### Example 1: Finding the Point $c$

Verify that $f(x) = \sin x$ satisfies Rolle's Theorem on $[0, \pi]$ and find $c$.

**Check hypotheses:**
1. $\sin x$ is continuous everywhere ✓
2. $\sin x$ is differentiable everywhere ✓
3. $f(0) = \sin 0 = 0$ and $f(\pi) = \sin \pi = 0$ ✓

**Find $c$:**
$f'(x) = \cos x = 0$

On $(0, \pi)$: $x = \frac{\pi}{2}$

So $c = \frac{\pi}{2}$, and indeed $f\left(\frac{\pi}{2}\right) = 1$ is the maximum.

### Example 2: Multiple Points

For $f(x) = \sin(2x)$ on $[0, \pi]$:

- $f(0) = 0 = f(\pi)$ ✓

$f'(x) = 2\cos(2x) = 0$ when $2x = \frac{\pi}{2}$ or $2x = \frac{3\pi}{2}$

So $x = \frac{\pi}{4}$ or $x = \frac{3\pi}{4}$

Rolle's Theorem guarantees at least one such point, but there can be more!

### Example 3: Why Rolle Fails

Show that Rolle's Theorem doesn't apply to $f(x) = \frac{1}{x}$ on $[-1, 1]$.

$f(-1) = -1$ and $f(1) = 1$, so $f(-1) \neq f(1)$. Hypothesis 3 fails.

Also, $f$ is not continuous on $[-1, 1]$ (undefined at $x = 0$). Hypothesis 1 fails.

Even on $[-2, -1]$ where $f$ is continuous and differentiable:
$f(-2) = -\frac{1}{2}$ and $f(-1) = -1$, so hypothesis 3 still fails.

## Common Mistakes

1. **Applying to non-differentiable functions:**
   The function must be differentiable on the open interval $(a, b)$. Corners, cusps, and vertical tangents violate this.

2. **Confusing necessary and sufficient conditions:**
   Rolle says "if hypotheses, then $f'(c) = 0$." It doesn't say "if $f'(c) = 0$, then hypotheses hold."

3. **Forgetting to verify all hypotheses:**
   All three conditions must be checked before applying the theorem.

## Summary

- Rolle's Theorem: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then $f'(c) = 0$ for some $c \in (a,b)$
- All three hypotheses are necessary—removing any one can cause the theorem to fail
- Applications include proving existence of roots, uniqueness of solutions, and verifying identities
- Rolle's Theorem is the foundation for the Mean Value Theorem
- Between any two roots of $f$, there's at least one root of $f'$
- A function with $f'(x) > 0$ everywhere can have at most one root
