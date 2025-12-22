---
id: math203-t3-logdiff
title: "Logarithmic Differentiation"
order: 7
---

# Logarithmic Differentiation

Some functions are extremely difficult or impossible to differentiate directly using standard rules. Logarithmic differentiation is a powerful technique that uses properties of logarithms to simplify complex differentiation problems, particularly for products, quotients with many factors, and functions with variables in both the base and exponent.

## When to Use Logarithmic Differentiation

This technique is especially useful for:

1. **Products of many factors:** $y = f(x) \cdot g(x) \cdot h(x) \cdots$
2. **Quotients with multiple terms:** $y = \frac{f(x) \cdot g(x)}{h(x) \cdot k(x)}$
3. **Variable bases with variable exponents:** $y = f(x)^{g(x)}$
4. **Expressions where taking ln simplifies the algebra**

## The Basic Method

**Step 1:** Take the natural logarithm of both sides: $\ln y = \ln[\text{expression}]$

**Step 2:** Simplify using logarithm properties:
- $\ln(ab) = \ln a + \ln b$
- $\ln(a/b) = \ln a - \ln b$
- $\ln(a^n) = n \ln a$

**Step 3:** Differentiate both sides implicitly with respect to $x$

**Step 4:** Solve for $\frac{dy}{dx}$

**Step 5:** Substitute back the original expression for $y$

## Key Formula

When you differentiate $\ln y$ with respect to $x$:
$$\frac{d}{dx}[\ln y] = \frac{1}{y} \cdot \frac{dy}{dx}$$

This is implicit differentiation applied to the logarithm.

## Example 1: Product of Many Factors

Find $\frac{dy}{dx}$ for $y = x(x-1)(x-2)(x-3)$.

Using the product rule repeatedly would be tedious. Instead:

**Step 1:** Take logarithm
$$\ln y = \ln[x(x-1)(x-2)(x-3)]$$

**Step 2:** Expand
$$\ln y = \ln x + \ln(x-1) + \ln(x-2) + \ln(x-3)$$

**Step 3:** Differentiate
$$\frac{1}{y}\frac{dy}{dx} = \frac{1}{x} + \frac{1}{x-1} + \frac{1}{x-2} + \frac{1}{x-3}$$

**Step 4:** Solve for $\frac{dy}{dx}$
$$\frac{dy}{dx} = y\left(\frac{1}{x} + \frac{1}{x-1} + \frac{1}{x-2} + \frac{1}{x-3}\right)$$

**Step 5:** Substitute $y$
$$\frac{dy}{dx} = x(x-1)(x-2)(x-3)\left(\frac{1}{x} + \frac{1}{x-1} + \frac{1}{x-2} + \frac{1}{x-3}\right)$$

This can be simplified by distributing, but the form above is often acceptable.

## Example 2: Complex Quotient

Find $\frac{dy}{dx}$ for $y = \frac{x^2\sqrt{x+1}}{(x-1)^3}$.

**Step 1:** Take logarithm
$$\ln y = \ln\left(\frac{x^2\sqrt{x+1}}{(x-1)^3}\right)$$

**Step 2:** Expand using log properties
$$\ln y = 2\ln x + \frac{1}{2}\ln(x+1) - 3\ln(x-1)$$

**Step 3:** Differentiate
$$\frac{1}{y}\frac{dy}{dx} = \frac{2}{x} + \frac{1}{2(x+1)} - \frac{3}{x-1}$$

**Step 4 & 5:** Solve and substitute
$$\frac{dy}{dx} = \frac{x^2\sqrt{x+1}}{(x-1)^3}\left(\frac{2}{x} + \frac{1}{2(x+1)} - \frac{3}{x-1}\right)$$

To simplify further, find a common denominator for the terms in parentheses:
$$= \frac{x^2\sqrt{x+1}}{(x-1)^3} \cdot \frac{2(x+1)(x-1) + \frac{1}{2}x(x-1) - 3x(x+1)}{x(x+1)(x-1)}$$

Often, leaving the answer in the first form is preferred unless further simplification is required.

## Example 3: Variable Base and Exponent

Find $\frac{dy}{dx}$ for $y = x^x$ where $x > 0$.

This is the classic case: neither the power rule ($\frac{d}{dx}[x^n] = nx^{n-1}$) nor the exponential rule ($\frac{d}{dx}[a^x] = a^x \ln a$) applies directly because both base and exponent are variables.

**Step 1:** Take logarithm
$$\ln y = \ln(x^x) = x \ln x$$

**Step 2:** Already simplified

**Step 3:** Differentiate using product rule
$$\frac{1}{y}\frac{dy}{dx} = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$$

**Step 4 & 5:** Solve and substitute
$$\frac{dy}{dx} = y(\ln x + 1) = x^x(\ln x + 1)$$

## Example 4: General Power Function

Find $\frac{dy}{dx}$ for $y = (\sin x)^{x^2}$ where $\sin x > 0$.

**Step 1:** Take logarithm
$$\ln y = x^2 \ln(\sin x)$$

**Step 3:** Differentiate using product rule
$$\frac{1}{y}\frac{dy}{dx} = 2x \ln(\sin x) + x^2 \cdot \frac{\cos x}{\sin x}$$

$$\frac{1}{y}\frac{dy}{dx} = 2x \ln(\sin x) + x^2 \cot x$$

**Step 4 & 5:** Solve and substitute
$$\frac{dy}{dx} = (\sin x)^{x^2}\left(2x \ln(\sin x) + x^2 \cot x\right)$$

## Example 5: Function of the Form $f(x)^{g(x)}$

**General formula:** For $y = f(x)^{g(x)}$ where $f(x) > 0$:

$$\ln y = g(x) \ln f(x)$$

$$\frac{1}{y}\frac{dy}{dx} = g'(x) \ln f(x) + g(x) \cdot \frac{f'(x)}{f(x)}$$

$$\frac{dy}{dx} = f(x)^{g(x)}\left(g'(x) \ln f(x) + g(x) \cdot \frac{f'(x)}{f(x)}\right)$$

### Applying to $y = x^{\sin x}$:

Here $f(x) = x$, $g(x) = \sin x$

$$\frac{dy}{dx} = x^{\sin x}\left(\cos x \cdot \ln x + \sin x \cdot \frac{1}{x}\right)$$

$$= x^{\sin x}\left(\cos x \ln x + \frac{\sin x}{x}\right)$$

## Comparison: When to Use Which Method

| Function Type | Best Method |
|---------------|-------------|
| $x^n$ (constant exponent) | Power rule |
| $a^x$ (constant base) | Exponential rule: $a^x \ln a$ |
| $e^{f(x)}$ | Chain rule: $e^{f(x)} \cdot f'(x)$ |
| $f(x)^{g(x)}$ | Logarithmic differentiation |
| Complex products/quotients | Logarithmic differentiation |

## Common Mistakes

1. **Forgetting to include $\frac{dy}{dx}$ on the left side:**
   When differentiating $\ln y$, you must use implicit differentiation: $\frac{d}{dx}[\ln y] = \frac{1}{y} \cdot \frac{dy}{dx}$, not just $\frac{1}{y}$.

2. **Not substituting back for $y$:**
   The final answer should be in terms of $x$ only. Replace $y$ with the original expression.

3. **Applying log rules incorrectly:**
   Remember: $\ln(a + b) \neq \ln a + \ln b$. The product rule for logs applies to products, not sums.

4. **Domain restrictions:**
   $\ln y$ requires $y > 0$. If the original function can be negative, logarithmic differentiation may need adjustments or may not apply.

## Verification

You can verify logarithmic differentiation results by:
1. Checking with a specific value of $x$
2. Comparing to numerical differentiation
3. For simple cases, confirming with standard rules

**Verify $y = x^x$ at $x = 2$:**
$$\frac{dy}{dx} = 2^2(\ln 2 + 1) = 4(0.693 + 1) = 4(1.693) \approx 6.77$$

Numerical check: $\frac{2.01^{2.01} - 2^2}{0.01} \approx \frac{4.068 - 4}{0.01} = 6.8$ ✓

## Summary

- Logarithmic differentiation simplifies products, quotients, and variable-exponent functions
- Take ln of both sides, simplify using log properties, differentiate implicitly
- Key: $\frac{d}{dx}[\ln y] = \frac{1}{y}\frac{dy}{dx}$
- Essential for $f(x)^{g(x)}$ forms where both base and exponent are variables
- Always substitute back to express the answer in terms of $x$
- Verify your answer makes sense for specific values
