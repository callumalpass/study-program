---
id: math203-t1-continuity
title: "Continuity"
order: 4
---

# Continuity

Continuity formalizes the intuitive idea of a function with no breaks, jumps, or holes. A continuous function can be drawn without lifting your pen from the paper. This concept is fundamental to calculus and connects limits to function values.

## Definition of Continuity at a Point

A function $f$ is **continuous at $x = a$** if three conditions hold:

1. **$f(a)$ is defined** (the function has a value at $a$)
2. **$\lim_{x \to a} f(x)$ exists** (the limit exists)
3. **$\lim_{x \to a} f(x) = f(a)$** (the limit equals the function value)

In other words: you can evaluate the limit by direct substitution.

If any condition fails, the function is **discontinuous** at $a$.

## Types of Discontinuities

When a function fails to be continuous, we classify the discontinuity by which condition(s) fail:

### Removable Discontinuity

The limit exists, but either:
- The function is undefined at $a$, or
- The function value differs from the limit

**Example:** $f(x) = \frac{x^2 - 4}{x - 2}$

At $x = 2$: The function is undefined (division by zero), but:
$$\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} \frac{(x-2)(x+2)}{x-2} = 4$$

This is a "hole" in the graph. We could "remove" the discontinuity by defining $f(2) = 4$.

### Jump Discontinuity

Both one-sided limits exist, but they're different.

**Example:**
$$f(x) = \begin{cases} x + 1 & \text{if } x < 0 \\ x^2 & \text{if } x \geq 0 \end{cases}$$

At $x = 0$:
- $\lim_{x \to 0^-} f(x) = 1$
- $\lim_{x \to 0^+} f(x) = 0$
- $f(0) = 0$

The graph "jumps" from height 1 to height 0 at $x = 0$.

### Infinite Discontinuity

The function approaches $\pm\infty$ near the point.

**Example:** $f(x) = \frac{1}{x}$ at $x = 0$

The function has a vertical asymptote. The limit does not exist (as a real number).

### Oscillating Discontinuity

The function oscillates without approaching any value.

**Example:** $f(x) = \sin\left(\frac{1}{x}\right)$ at $x = 0$

As $x \to 0$, the function oscillates infinitely between $-1$ and $1$ without settling.

## Continuity on an Interval

A function is **continuous on an open interval** $(a, b)$ if it's continuous at every point in the interval.

A function is **continuous on a closed interval** $[a, b]$ if:
- It's continuous on $(a, b)$
- $\lim_{x \to a^+} f(x) = f(a)$ (right-continuous at left endpoint)
- $\lim_{x \to b^-} f(x) = f(b)$ (left-continuous at right endpoint)

## Functions Continuous Everywhere

The following functions are continuous on their entire domains:

- **Polynomials:** continuous for all real $x$
- **Rational functions:** continuous except where denominator = 0
- **$\sin x$, $\cos x$:** continuous for all real $x$
- **$\tan x$, $\sec x$:** continuous except at odd multiples of $\frac{\pi}{2}$
- **$e^x$:** continuous for all real $x$
- **$\ln x$:** continuous for $x > 0$
- **$\sqrt{x}$:** continuous for $x \geq 0$
- **$\sqrt[n]{x}$:** continuous for $x \geq 0$ (even $n$) or all $x$ (odd $n$)

## Continuity of Composite Functions

If $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f \circ g$ is continuous at $a$:

$$\lim_{x \to a} f(g(x)) = f\left(\lim_{x \to a} g(x)\right) = f(g(a))$$

**Example:** $h(x) = e^{\sin x}$

Both $e^u$ and $\sin x$ are continuous everywhere, so $e^{\sin x}$ is continuous everywhere.

## Finding Points of Discontinuity

To find where a function might be discontinuous:

1. **Rational functions:** Check where denominator = 0
2. **Piecewise functions:** Check boundary points between pieces
3. **Functions with radicals:** Check where radicand could be negative (even roots)
4. **Logarithms:** Check where argument could be $\leq 0$

**Example:** Find discontinuities of $f(x) = \frac{x}{\ln(x-1)}$

Potential issues:
- $\ln(x-1)$ undefined when $x - 1 \leq 0$, i.e., $x \leq 1$
- $\ln(x-1) = 0$ when $x - 1 = 1$, i.e., $x = 2$

Domain: $x > 1$ and $x \neq 2$

The function has an infinite discontinuity at $x = 2$ (vertical asymptote).

## Making Functions Continuous

Sometimes we can remove a discontinuity by defining or redefining the function at a point.

**Example:** Define $f(2)$ to make $f(x) = \frac{x^2 - x - 2}{x - 2}$ continuous.

$$\lim_{x \to 2} \frac{x^2 - x - 2}{x - 2} = \lim_{x \to 2} \frac{(x-2)(x+1)}{x-2} = \lim_{x \to 2} (x + 1) = 3$$

Define $f(2) = 3$ to make the function continuous at $x = 2$.

## Why Continuity Matters

Continuous functions have many nice properties:
- They can be graphed without lifting your pen
- Limits can be evaluated by substitution
- They satisfy the Intermediate Value Theorem
- They satisfy the Extreme Value Theorem on closed intervals
- They're differentiable "almost everywhere" (with some exceptions)

## Summary

- Continuity requires: function defined, limit exists, and limit equals function value
- Discontinuities are classified as removable, jump, infinite, or oscillating
- Most elementary functions are continuous on their domains
- Compositions of continuous functions are continuous
- Check potential trouble spots: zeros of denominators, piecewise boundaries, domain restrictions
