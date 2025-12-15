# L'Hôpital's Rule

When evaluating limits results in indeterminate forms like $\frac{0}{0}$ or $\frac{\infty}{\infty}$, L'Hôpital's Rule provides a powerful shortcut using derivatives. Named after the French mathematician Guillaume de l'Hôpital (who purchased it from Johann Bernoulli), this rule transforms difficult limits into potentially simpler ones.

## Statement of L'Hôpital's Rule

If $\lim_{x \to a} \frac{f(x)}{g(x)}$ has the indeterminate form $\frac{0}{0}$ or $\frac{\pm\infty}{\pm\infty}$, and if $\lim_{x \to a} \frac{f'(x)}{g'(x)}$ exists (or equals $\pm\infty$), then:

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$

The rule also works for $x \to \pm\infty$.

**Key requirements:**
1. The limit must be an indeterminate form ($\frac{0}{0}$ or $\frac{\infty}{\infty}$)
2. Both $f$ and $g$ must be differentiable near $a$ (except possibly at $a$)
3. $g'(x) \neq 0$ near $a$ (except possibly at $a$)

## Indeterminate Forms

**Direct indeterminate forms** (L'Hôpital applies directly):
- $\frac{0}{0}$
- $\frac{\infty}{\infty}$

**Other indeterminate forms** (require transformation first):
- $0 \cdot \infty$
- $\infty - \infty$
- $0^0$
- $1^\infty$
- $\infty^0$

## Basic Examples

### Example 1: $\frac{0}{0}$ form

$$\lim_{x \to 0} \frac{e^x - 1}{x}$$

Check: $\frac{e^0 - 1}{0} = \frac{0}{0}$ ✓

Apply L'Hôpital:
$$= \lim_{x \to 0} \frac{(e^x)'}{(x)'} = \lim_{x \to 0} \frac{e^x}{1} = e^0 = 1$$

### Example 2: $\frac{\infty}{\infty}$ form

$$\lim_{x \to \infty} \frac{\ln x}{x}$$

Check: $\frac{\infty}{\infty}$ ✓

Apply L'Hôpital:
$$= \lim_{x \to \infty} \frac{1/x}{1} = \lim_{x \to \infty} \frac{1}{x} = 0$$

### Example 3: Multiple applications

$$\lim_{x \to 0} \frac{\sin x - x}{x^3}$$

Check: $\frac{0 - 0}{0} = \frac{0}{0}$ ✓

First application:
$$= \lim_{x \to 0} \frac{\cos x - 1}{3x^2}$$

Still $\frac{0}{0}$, apply again:
$$= \lim_{x \to 0} \frac{-\sin x}{6x}$$

Still $\frac{0}{0}$, apply once more:
$$= \lim_{x \to 0} \frac{-\cos x}{6} = \frac{-1}{6}$$

## Transforming Other Indeterminate Forms

### Form $0 \cdot \infty$

Rewrite the product as a quotient:
$$f \cdot g = \frac{f}{1/g} \quad \text{or} \quad \frac{g}{1/f}$$

**Example:** $\lim_{x \to 0^+} x \ln x$

This is $0 \cdot (-\infty)$. Rewrite:
$$x \ln x = \frac{\ln x}{1/x}$$

Now it's $\frac{-\infty}{\infty}$. Apply L'Hôpital:
$$= \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} \frac{-x^2}{x} = \lim_{x \to 0^+} (-x) = 0$$

### Form $\infty - \infty$

Combine into a single fraction.

**Example:** $\lim_{x \to 0} \left(\frac{1}{x} - \frac{1}{\sin x}\right)$

Combine:
$$= \lim_{x \to 0} \frac{\sin x - x}{x \sin x}$$

Now $\frac{0}{0}$. Apply L'Hôpital:
$$= \lim_{x \to 0} \frac{\cos x - 1}{\sin x + x \cos x} = \frac{0}{0}$$

Apply again:
$$= \lim_{x \to 0} \frac{-\sin x}{\cos x + \cos x - x \sin x} = \frac{0}{2} = 0$$

### Exponential Forms: $0^0$, $1^\infty$, $\infty^0$

For $f(x)^{g(x)}$, take the logarithm:

Let $y = f(x)^{g(x)}$, then $\ln y = g(x) \ln f(x)$

Evaluate $\lim \ln y$, then exponentiate: $\lim y = e^{\lim \ln y}$

**Example:** $\lim_{x \to 0^+} x^x$ (form $0^0$)

Let $y = x^x$, so $\ln y = x \ln x$.

We showed $\lim_{x \to 0^+} x \ln x = 0$.

Therefore: $\lim_{x \to 0^+} x^x = e^0 = 1$

**Example:** $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x$ (form $1^\infty$)

Let $y = \left(1 + \frac{1}{x}\right)^x$, so $\ln y = x \ln\left(1 + \frac{1}{x}\right)$.

Rewrite: $\ln y = \frac{\ln(1 + 1/x)}{1/x}$ (form $\frac{0}{0}$)

Apply L'Hôpital:
$$= \lim_{x \to \infty} \frac{\frac{-1/x^2}{1 + 1/x}}{-1/x^2} = \lim_{x \to \infty} \frac{1}{1 + 1/x} = 1$$

Therefore: $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e^1 = e$

## Common Mistakes

1. **Applying to non-indeterminate forms:**
   $\lim_{x \to 0} \frac{\sin x + 1}{x}$ is not $\frac{0}{0}$ (it's $\frac{1}{0}$, which is $\pm\infty$)

2. **Using quotient rule instead of differentiating separately:**
   L'Hôpital says $\frac{f'(x)}{g'(x)}$, NOT $\left(\frac{f}{g}\right)'$

3. **Forgetting to verify the form after each application:**
   Always check you still have an indeterminate form

4. **Getting stuck in a loop:**
   Some limits cycle back to the original form; try a different technique

## When NOT to Use L'Hôpital

- When direct substitution works
- When simple algebraic manipulation (factoring, rationalizing) is easier
- When the form is not indeterminate ($\frac{5}{0}$, $\frac{3}{\infty}$, etc.)
- When differentiation makes things more complicated

## Summary

- L'Hôpital's Rule converts $\frac{0}{0}$ or $\frac{\infty}{\infty}$ into derivative quotients
- Verify the indeterminate form before applying
- May need multiple applications
- Other forms ($0 \cdot \infty$, $\infty - \infty$, exponential forms) require transformation first
- For exponential indeterminates, take logarithms first
- Always check if simpler methods work before reaching for L'Hôpital
