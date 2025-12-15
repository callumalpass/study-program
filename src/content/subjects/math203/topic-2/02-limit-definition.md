# The Limit Definition of the Derivative

The derivative transforms the intuitive notion of "rate of change" into a precise mathematical concept using limits. This definition is the foundation of differential calculus.

## The Definition

The **derivative of $f$ at $x = a$** is:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

provided this limit exists.

**Alternative form:** Using $x$ instead of $a + h$:

$$f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$$

Both definitions are equivalent (let $x = a + h$).

## The Derivative Function

If the derivative exists for all $x$ in some interval, we get the **derivative function**:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

This gives a new function that tells us the slope of the tangent line at each point.

## Computing Derivatives from the Definition

**Example 1:** Find the derivative of $f(x) = x^2$.

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h}$$

Expand $(x+h)^2 = x^2 + 2xh + h^2$:

$$= \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h} = \lim_{h \to 0} \frac{2xh + h^2}{h}$$

Factor out $h$:

$$= \lim_{h \to 0} \frac{h(2x + h)}{h} = \lim_{h \to 0} (2x + h) = 2x$$

Therefore, $f'(x) = 2x$.

**Example 2:** Find the derivative of $f(x) = \frac{1}{x}$.

$$f'(x) = \lim_{h \to 0} \frac{\frac{1}{x+h} - \frac{1}{x}}{h}$$

Find common denominator:

$$= \lim_{h \to 0} \frac{\frac{x - (x+h)}{x(x+h)}}{h} = \lim_{h \to 0} \frac{-h}{h \cdot x(x+h)}$$

Cancel $h$:

$$= \lim_{h \to 0} \frac{-1}{x(x+h)} = \frac{-1}{x \cdot x} = -\frac{1}{x^2}$$

Therefore, $f'(x) = -\frac{1}{x^2}$.

**Example 3:** Find the derivative of $f(x) = \sqrt{x}$.

$$f'(x) = \lim_{h \to 0} \frac{\sqrt{x+h} - \sqrt{x}}{h}$$

Rationalize the numerator:

$$= \lim_{h \to 0} \frac{(\sqrt{x+h} - \sqrt{x})(\sqrt{x+h} + \sqrt{x})}{h(\sqrt{x+h} + \sqrt{x})}$$

$$= \lim_{h \to 0} \frac{(x+h) - x}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{h}{h(\sqrt{x+h} + \sqrt{x})}$$

$$= \lim_{h \to 0} \frac{1}{\sqrt{x+h} + \sqrt{x}} = \frac{1}{2\sqrt{x}}$$

Therefore, $f'(x) = \frac{1}{2\sqrt{x}}$.

## Common Derivatives from the Definition

| Function | Derivative | Process |
|----------|------------|---------|
| $f(x) = c$ | $f'(x) = 0$ | $\frac{c - c}{h} = 0$ |
| $f(x) = x$ | $f'(x) = 1$ | $\frac{(x+h) - x}{h} = 1$ |
| $f(x) = x^2$ | $f'(x) = 2x$ | Expand, cancel |
| $f(x) = x^3$ | $f'(x) = 3x^2$ | Expand, cancel |
| $f(x) = x^n$ | $f'(x) = nx^{n-1}$ | Binomial theorem |
| $f(x) = \frac{1}{x}$ | $f'(x) = -\frac{1}{x^2}$ | Common denominator |
| $f(x) = \sqrt{x}$ | $f'(x) = \frac{1}{2\sqrt{x}}$ | Rationalize |

## The Algebra of Finding Limits

When using the definition, the goal is to:
1. Set up the difference quotient
2. Simplify algebraically until you can cancel the $h$ in the denominator
3. Evaluate the limit by substituting $h = 0$

**Key techniques:**
- **Expand powers:** $(x+h)^n$ using binomial theorem
- **Find common denominators:** For fractions
- **Rationalize:** For square roots
- **Factor:** To cancel the $h$

## When the Derivative Doesn't Exist

The limit might not exist at certain points. We'll explore this in the next section on differentiability.

## Derivative at a Specific Point

To find $f'(a)$ for a specific value $a$, you can either:

1. Find $f'(x)$ first, then substitute $x = a$
2. Use the definition directly with the specific value

**Example:** Find the derivative of $f(x) = x^2 - 3x$ at $x = 2$.

**Method 1:** Find $f'(x) = 2x - 3$, then $f'(2) = 4 - 3 = 1$.

**Method 2:**
$$f'(2) = \lim_{h \to 0} \frac{[(2+h)^2 - 3(2+h)] - [4 - 6]}{h}$$
$$= \lim_{h \to 0} \frac{4 + 4h + h^2 - 6 - 3h + 2}{h} = \lim_{h \to 0} \frac{h + h^2}{h} = 1$$

## Summary

- The derivative is defined as $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$
- The derivative function is $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
- Computing requires algebraic manipulation to cancel the $h$ in the denominator
- Key techniques: expand powers, find common denominators, rationalize
- The derivative may not exist at every point
