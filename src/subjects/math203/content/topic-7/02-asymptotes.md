---
id: math203-t7-asymptotes
title: "Asymptotes"
order: 2
---

# Asymptotes

Asymptotes describe the behavior of a function near boundaries of its domain or as $x \to \pm\infty$. They are essential for understanding rational functions and many transcendental functions.

## Vertical Asymptotes

A **vertical asymptote** occurs at $x = a$ if:
$$\lim_{x \to a^+} f(x) = \pm\infty \quad \text{or} \quad \lim_{x \to a^-} f(x) = \pm\infty$$

The function "blows up" as it approaches $x = a$.

### Finding Vertical Asymptotes

For rational functions $f(x) = \frac{p(x)}{q(x)}$:
1. Find where $q(x) = 0$
2. Check that $p(x) \neq 0$ at those points
3. If both are zero, simplify first (may be a hole, not an asymptote)

**Example:** $f(x) = \frac{1}{x-2}$

$q(x) = x - 2 = 0$ when $x = 2$
$p(2) = 1 \neq 0$

Vertical asymptote at $x = 2$.

Behavior:
- As $x \to 2^+$: $f(x) \to +\infty$
- As $x \to 2^-$: $f(x) \to -\infty$

**Example:** $f(x) = \frac{x^2 - 1}{x - 1}$

$q(x) = 0$ at $x = 1$
$p(1) = 1 - 1 = 0$ also!

Factor: $f(x) = \frac{(x-1)(x+1)}{x-1} = x + 1$ for $x \neq 1$

This is a **hole** at $x = 1$, not an asymptote. The graph is the line $y = x + 1$ with a hole at $(1, 2)$.

### Behavior Near Vertical Asymptotes

Determine the sign on each side:

**Example:** $f(x) = \frac{2x}{(x-1)(x+3)}$

Vertical asymptotes at $x = 1$ and $x = -3$.

Near $x = 1$:
- As $x \to 1^+$: numerator $\approx 2$, $(x-1) \approx 0^+$, $(x+3) \approx 4$ → $f \to +\infty$
- As $x \to 1^-$: $(x-1) \approx 0^-$ → $f \to -\infty$

Near $x = -3$:
- As $x \to -3^+$: numerator $\approx -6$, $(x-1) \approx -4$, $(x+3) \approx 0^+$ → $f \to +\infty$
- As $x \to -3^-$: $(x+3) \approx 0^-$ → $f \to -\infty$

## Horizontal Asymptotes

A **horizontal asymptote** occurs if:
$$\lim_{x \to \infty} f(x) = L \quad \text{or} \quad \lim_{x \to -\infty} f(x) = L$$

The function approaches the line $y = L$ as $x \to \pm\infty$.

### Finding Horizontal Asymptotes

For rational functions $f(x) = \frac{a_n x^n + \ldots}{b_m x^m + \ldots}$:

| Degrees | Horizontal Asymptote |
|---------|---------------------|
| $n < m$ | $y = 0$ |
| $n = m$ | $y = \frac{a_n}{b_m}$ (ratio of leading coefficients) |
| $n > m$ | None (see oblique asymptotes) |

**Example:** $f(x) = \frac{3x^2 - 1}{2x^2 + 5}$

Degrees equal ($n = m = 2$), so horizontal asymptote is:
$$y = \frac{3}{2}$$

**Example:** $f(x) = \frac{x + 1}{x^2 - 4}$

Degree of numerator (1) < degree of denominator (2), so:
$$y = 0$$

**Example:** $f(x) = \frac{2x^3}{x^2 + 1}$

Degree of numerator > degree of denominator → no horizontal asymptote.

### Verifying with Limits

For $f(x) = \frac{3x^2 - 1}{2x^2 + 5}$:

$$\lim_{x \to \infty} \frac{3x^2 - 1}{2x^2 + 5} = \lim_{x \to \infty} \frac{3 - 1/x^2}{2 + 5/x^2} = \frac{3 - 0}{2 + 0} = \frac{3}{2}$$

## Oblique (Slant) Asymptotes

When the numerator's degree is exactly one more than the denominator's, there's an **oblique asymptote**.

**Example:** $f(x) = \frac{x^2 + 1}{x - 1}$

Perform polynomial long division:
$$\frac{x^2 + 1}{x - 1} = x + 1 + \frac{2}{x - 1}$$

As $x \to \pm\infty$, the remainder $\frac{2}{x-1} \to 0$.

Oblique asymptote: $y = x + 1$

### Finding Oblique Asymptotes

1. Divide $p(x)$ by $q(x)$
2. The quotient (without remainder) is the asymptote
3. Oblique asymptote exists only when deg$(p)$ = deg$(q)$ + 1

**Example:** $f(x) = \frac{2x^2 - 3x + 1}{x + 2}$

Long division:
$$2x^2 - 3x + 1 = (x + 2)(2x - 7) + 15$$

So $f(x) = 2x - 7 + \frac{15}{x+2}$

Oblique asymptote: $y = 2x - 7$

## Other Functions

### Exponential Functions

$f(x) = e^x$: horizontal asymptote $y = 0$ as $x \to -\infty$

$f(x) = e^{-x}$: horizontal asymptote $y = 0$ as $x \to +\infty$

### Logarithmic Functions

$f(x) = \ln x$: vertical asymptote at $x = 0^+$

No horizontal asymptote (grows without bound).

### Arctangent

$f(x) = \arctan x$: horizontal asymptotes at $y = \pm\frac{\pi}{2}$

### Combinations

**Example:** $f(x) = \frac{e^x}{e^x + 1}$

As $x \to \infty$: $\frac{e^x}{e^x + 1} = \frac{1}{1 + e^{-x}} \to 1$
As $x \to -\infty$: $\frac{e^x}{e^x + 1} \to 0$

Horizontal asymptotes: $y = 0$ (left) and $y = 1$ (right).

## Crossing Asymptotes

A function can cross a horizontal asymptote (just not "at infinity").

**Example:** $f(x) = \frac{x}{x^2 + 1}$

Horizontal asymptote: $y = 0$

Does $f(x) = 0$? Yes, when $x = 0$.

The function crosses its horizontal asymptote at the origin.

However, a function cannot cross a vertical asymptote (it's not defined there).

## Summary of Asymptote Types

| Type | Occurs When | Equation |
|------|-------------|----------|
| Vertical | $\lim_{x \to a} f(x) = \pm\infty$ | $x = a$ |
| Horizontal | $\lim_{x \to \pm\infty} f(x) = L$ | $y = L$ |
| Oblique | deg(num) = deg(den) + 1 | $y = $ quotient |

## Summary

- Vertical asymptotes: where denominator is zero (and numerator isn't)
- Horizontal asymptotes: compare degrees of numerator and denominator
- Oblique asymptotes: when numerator degree is one more than denominator
- Check behavior on both sides of vertical asymptotes
- A function can cross horizontal (not vertical) asymptotes
- Non-rational functions may have asymptotes found by limits
