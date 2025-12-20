---
id: math203-t3-basic
title: "Basic Differentiation Rules"
order: 1
---

# Basic Differentiation Rules

While we can always compute derivatives from the limit definition, that process is tedious. Differentiation rules provide shortcuts that make finding derivatives fast and systematic. These rules are the workhorses of calculus.

## The Constant Rule

If $c$ is a constant, then:

$$\frac{d}{dx}[c] = 0$$

**Why:** A constant doesn't change as $x$ changes, so its rate of change is zero.

**Examples:**
- $\frac{d}{dx}[5] = 0$
- $\frac{d}{dx}[\pi] = 0$
- $\frac{d}{dx}[-17.3] = 0$

## The Power Rule

For any real number $n$:

$$\frac{d}{dx}[x^n] = nx^{n-1}$$

This is arguably the most important differentiation rule.

**Examples:**
- $\frac{d}{dx}[x^3] = 3x^2$
- $\frac{d}{dx}[x^{10}] = 10x^9$
- $\frac{d}{dx}[x^{-1}] = -x^{-2} = -\frac{1}{x^2}$
- $\frac{d}{dx}[x^{1/2}] = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$
- $\frac{d}{dx}[x] = \frac{d}{dx}[x^1] = 1 \cdot x^0 = 1$

**Special case:** $\frac{d}{dx}[\sqrt{x}] = \frac{d}{dx}[x^{1/2}] = \frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$

**For roots in general:** $\frac{d}{dx}[\sqrt[n]{x}] = \frac{d}{dx}[x^{1/n}] = \frac{1}{n}x^{(1/n)-1} = \frac{1}{n\sqrt[n]{x^{n-1}}}$

## The Constant Multiple Rule

$$\frac{d}{dx}[c \cdot f(x)] = c \cdot \frac{d}{dx}[f(x)] = c \cdot f'(x)$$

Constants "pass through" the derivative.

**Examples:**
- $\frac{d}{dx}[5x^3] = 5 \cdot 3x^2 = 15x^2$
- $\frac{d}{dx}[-7x^4] = -7 \cdot 4x^3 = -28x^3$
- $\frac{d}{dx}\left[\frac{x^2}{3}\right] = \frac{1}{3} \cdot 2x = \frac{2x}{3}$

## The Sum and Difference Rules

$$\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$$

$$\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$$

Differentiate term by term.

**Examples:**

$\frac{d}{dx}[x^3 + x^2] = 3x^2 + 2x$

$\frac{d}{dx}[5x^4 - 3x^2 + 7x - 2] = 20x^3 - 6x + 7$

$\frac{d}{dx}\left[\frac{1}{x} + \sqrt{x}\right] = -\frac{1}{x^2} + \frac{1}{2\sqrt{x}}$

## Differentiating Polynomials

Combining these rules, any polynomial can be differentiated term by term.

**Example:** $f(x) = 4x^5 - 3x^3 + 2x^2 - x + 9$

$f'(x) = 20x^4 - 9x^2 + 4x - 1$

**Example:** $g(x) = x^{100} - 100x$

$g'(x) = 100x^{99} - 100$

## Negative and Fractional Exponents

Rewrite expressions to use the power rule.

**Example:** $f(x) = \frac{3}{x^2}$

Rewrite: $f(x) = 3x^{-2}$

Differentiate: $f'(x) = 3(-2)x^{-3} = -6x^{-3} = -\frac{6}{x^3}$

**Example:** $g(x) = \frac{2}{\sqrt{x}}$

Rewrite: $g(x) = 2x^{-1/2}$

Differentiate: $g'(x) = 2 \cdot (-\frac{1}{2})x^{-3/2} = -x^{-3/2} = -\frac{1}{x^{3/2}} = -\frac{1}{x\sqrt{x}}$

**Example:** $h(x) = x^2\sqrt{x}$

Rewrite: $h(x) = x^2 \cdot x^{1/2} = x^{5/2}$

Differentiate: $h'(x) = \frac{5}{2}x^{3/2}$

## Common Mistakes

1. **Forgetting to subtract 1 from exponent:**
   Wrong: $\frac{d}{dx}[x^5] = 5x^5$
   Correct: $\frac{d}{dx}[x^5] = 5x^4$

2. **Not applying power rule to constants:**
   Wrong: $\frac{d}{dx}[x^0] = 0 \cdot x^{-1}$
   Correct: $x^0 = 1$, which is a constant, so derivative is 0.

3. **Treating $\frac{1}{x}$ incorrectly:**
   Wrong: $\frac{d}{dx}\left[\frac{1}{x}\right] = \frac{1}{1} = 1$
   Correct: $\frac{d}{dx}[x^{-1}] = -x^{-2} = -\frac{1}{x^2}$

## Practice Pattern Recognition

| Function | Rewritten | Derivative |
|----------|-----------|------------|
| $\frac{4}{x^3}$ | $4x^{-3}$ | $-12x^{-4} = -\frac{12}{x^4}$ |
| $\sqrt[3]{x^2}$ | $x^{2/3}$ | $\frac{2}{3}x^{-1/3}$ |
| $x^2 + \frac{1}{x^2}$ | $x^2 + x^{-2}$ | $2x - 2x^{-3}$ |
| $\frac{x^3 + 1}{x}$ | $x^2 + x^{-1}$ | $2x - x^{-2}$ |

## Summary

- **Constant rule:** $\frac{d}{dx}[c] = 0$
- **Power rule:** $\frac{d}{dx}[x^n] = nx^{n-1}$
- **Constant multiple:** $\frac{d}{dx}[cf] = cf'$
- **Sum/difference:** $\frac{d}{dx}[f \pm g] = f' \pm g'$
- Rewrite roots and fractions as powers before differentiating
- Polynomials: differentiate term by term
