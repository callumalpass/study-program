# The Product and Quotient Rules

When functions are multiplied or divided, we need special rules. Contrary to what you might hope, the derivative of a product is NOT the product of the derivatives.

## The Product Rule

If $f$ and $g$ are differentiable, then:

$$\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$

Or in compact notation: $(fg)' = f'g + fg'$

**Memory aids:**
- "First times derivative of second, plus second times derivative of first"
- "Left d-right plus right d-left" (d = derivative)

## Product Rule Examples

**Example 1:** Find $\frac{d}{dx}[x^2 \cdot \sin x]$

Let $f(x) = x^2$ and $g(x) = \sin x$

$f'(x) = 2x$ and $g'(x) = \cos x$

$$\frac{d}{dx}[x^2 \sin x] = 2x \cdot \sin x + x^2 \cdot \cos x = 2x\sin x + x^2\cos x$$

**Example 2:** Find $\frac{d}{dx}[(2x+1)(x^3-1)]$

Let $f(x) = 2x+1$ and $g(x) = x^3-1$

$f'(x) = 2$ and $g'(x) = 3x^2$

$$\frac{d}{dx}[(2x+1)(x^3-1)] = 2(x^3-1) + (2x+1)(3x^2)$$
$$= 2x^3 - 2 + 6x^3 + 3x^2 = 8x^3 + 3x^2 - 2$$

**Verification:** Expand first: $(2x+1)(x^3-1) = 2x^4 + x^3 - 2x - 1$

Differentiate: $8x^3 + 3x^2 - 2$ ✓

**Example 3:** Find $\frac{d}{dx}[e^x \cdot x]$

$$\frac{d}{dx}[xe^x] = 1 \cdot e^x + x \cdot e^x = e^x + xe^x = e^x(1+x)$$

## Why Isn't $(fg)' = f'g'$?

Consider $f(x) = x$ and $g(x) = x$. Then $fg = x^2$.

If $(fg)' = f'g'$, we'd get $(x^2)' = 1 \cdot 1 = 1$. But actually $(x^2)' = 2x$!

The product rule correctly gives: $(x \cdot x)' = 1 \cdot x + x \cdot 1 = 2x$ ✓

## The Quotient Rule

If $f$ and $g$ are differentiable and $g(x) \neq 0$, then:

$$\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}$$

Or: $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$

**Memory aids:**
- "Low d-high minus high d-low, over low squared" (low = denominator, high = numerator)
- "Bottom times derivative of top, minus top times derivative of bottom, all over bottom squared"

## Quotient Rule Examples

**Example 1:** Find $\frac{d}{dx}\left[\frac{x^2}{x+1}\right]$

$f(x) = x^2$, $g(x) = x+1$
$f'(x) = 2x$, $g'(x) = 1$

$$\frac{d}{dx}\left[\frac{x^2}{x+1}\right] = \frac{2x(x+1) - x^2(1)}{(x+1)^2} = \frac{2x^2 + 2x - x^2}{(x+1)^2} = \frac{x^2 + 2x}{(x+1)^2}$$

Can simplify: $= \frac{x(x+2)}{(x+1)^2}$

**Example 2:** Find $\frac{d}{dx}\left[\frac{\sin x}{x}\right]$

$$\frac{d}{dx}\left[\frac{\sin x}{x}\right] = \frac{\cos x \cdot x - \sin x \cdot 1}{x^2} = \frac{x\cos x - \sin x}{x^2}$$

**Example 3:** Find $\frac{d}{dx}\left[\frac{e^x}{x^2}\right]$

$$\frac{d}{dx}\left[\frac{e^x}{x^2}\right] = \frac{e^x \cdot x^2 - e^x \cdot 2x}{x^4} = \frac{e^x(x^2 - 2x)}{x^4} = \frac{e^x(x-2)}{x^3}$$

## Deriving the Quotient Rule from the Product Rule

We can derive the quotient rule using the product rule:

$$\frac{f}{g} = f \cdot g^{-1}$$

$$\left(\frac{f}{g}\right)' = f' \cdot g^{-1} + f \cdot (g^{-1})'$$

Since $(g^{-1})' = -g^{-2} \cdot g' = -\frac{g'}{g^2}$:

$$= \frac{f'}{g} + f \cdot \left(-\frac{g'}{g^2}\right) = \frac{f'}{g} - \frac{fg'}{g^2} = \frac{f'g - fg'}{g^2}$$

## When to Use Each Rule

**Product Rule:** When multiplying functions that can't be easily expanded
- $x^2 \sin x$ (can't simplify)
- $e^x \cos x$ (can't simplify)
- $(x+1)(x-1)$ (could expand, but product rule works too)

**Quotient Rule:** When dividing functions
- But sometimes rewriting is easier: $\frac{x^3}{x^2} = x$ is simpler than quotient rule!

**Tip:** Sometimes it's easier to rewrite a quotient as a product with negative exponent and use the product rule.

## Extended Product Rule

For three or more functions:

$$(fgh)' = f'gh + fg'h + fgh'$$

**Pattern:** Differentiate each factor in turn, keeping others unchanged, then add.

**Example:** $\frac{d}{dx}[x^2 \sin x \cos x]$

$$= 2x \sin x \cos x + x^2 \cos x \cos x + x^2 \sin x (-\sin x)$$
$$= 2x \sin x \cos x + x^2 \cos^2 x - x^2 \sin^2 x$$

## Summary

- **Product Rule:** $(fg)' = f'g + fg'$
- **Quotient Rule:** $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$
- The derivative of a product is NOT the product of derivatives
- The quotient rule can be derived from the product rule
- Sometimes algebraic simplification before differentiating is easier
- Extended product rule: differentiate each factor in turn and add
