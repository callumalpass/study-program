# Evaluating Limits

Once we understand what limits mean, we need techniques to compute them. This section covers the fundamental methods for evaluating limits, from simple substitution to algebraic manipulation.

## Direct Substitution

The simplest and most desirable case: if $f$ is continuous at $a$, then:

$$\lim_{x \to a} f(x) = f(a)$$

Just plug in the value!

**Example:**
$$\lim_{x \to 2} (3x^2 - 2x + 1) = 3(4) - 4 + 1 = 9$$

**When does direct substitution work?**
- Polynomials: always continuous everywhere
- Rational functions: continuous where denominator $\neq 0$
- Trigonometric functions: continuous on their domains
- Exponentials and logarithms: continuous on their domains

**Try direct substitution first.** If you get a number, you're done!

## Limit Laws

For functions $f$ and $g$ with existing limits at $a$, and constant $c$:

| Law | Statement |
|-----|-----------|
| **Sum** | $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$ |
| **Difference** | $\lim_{x \to a} [f(x) - g(x)] = \lim_{x \to a} f(x) - \lim_{x \to a} g(x)$ |
| **Constant Multiple** | $\lim_{x \to a} [c \cdot f(x)] = c \cdot \lim_{x \to a} f(x)$ |
| **Product** | $\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$ |
| **Quotient** | $\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)}$ (if denominator $\neq 0$) |
| **Power** | $\lim_{x \to a} [f(x)]^n = \left[\lim_{x \to a} f(x)\right]^n$ |
| **Root** | $\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{\lim_{x \to a} f(x)}$ |

These laws let us break complex limits into simpler pieces.

## The Indeterminate Form $\frac{0}{0}$

When direct substitution gives $\frac{0}{0}$, the limit may still exist! This is called an **indeterminate form** because it doesn't immediately tell us the answer. We need algebraic techniques to resolve it.

### Factoring and Cancellation

The most common technique for rational functions.

**Example:**
$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$$

Direct substitution gives $\frac{0}{0}$. Factor the numerator:
$$= \lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3} (x + 3) = 6$$

**Why can we cancel?** In a limit as $x \to 3$, we consider values *near* 3 but not *equal* to 3. For $x \neq 3$, the factor $(x-3)$ cancels legitimately.

### Useful Factoring Patterns

- **Difference of squares:** $a^2 - b^2 = (a-b)(a+b)$
- **Sum of cubes:** $a^3 + b^3 = (a+b)(a^2 - ab + b^2)$
- **Difference of cubes:** $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$

**Example:**
$$\lim_{x \to -1} \frac{x^3 + 1}{x + 1} = \lim_{x \to -1} \frac{(x+1)(x^2 - x + 1)}{x + 1} = \lim_{x \to -1} (x^2 - x + 1) = 3$$

### Rationalizing

When radicals appear, multiply by the conjugate.

**Example:**
$$\lim_{x \to 0} \frac{\sqrt{x+4} - 2}{x}$$

Direct substitution gives $\frac{0}{0}$. Multiply by the conjugate:
$$= \lim_{x \to 0} \frac{(\sqrt{x+4} - 2)(\sqrt{x+4} + 2)}{x(\sqrt{x+4} + 2)} = \lim_{x \to 0} \frac{(x+4) - 4}{x(\sqrt{x+4} + 2)}$$
$$= \lim_{x \to 0} \frac{x}{x(\sqrt{x+4} + 2)} = \lim_{x \to 0} \frac{1}{\sqrt{x+4} + 2} = \frac{1}{4}$$

## Special Trigonometric Limits

These fundamental limits appear throughout calculus:

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$

**Using the fundamental limit:**

$$\lim_{x \to 0} \frac{\sin(5x)}{x} = \lim_{x \to 0} 5 \cdot \frac{\sin(5x)}{5x} = 5 \cdot 1 = 5$$

$$\lim_{x \to 0} \frac{\tan x}{x} = \lim_{x \to 0} \frac{\sin x}{x \cos x} = 1 \cdot 1 = 1$$

$$\lim_{x \to 0} \frac{\sin(3x)}{\sin(5x)} = \lim_{x \to 0} \frac{\sin(3x)}{3x} \cdot \frac{5x}{\sin(5x)} \cdot \frac{3}{5} = 1 \cdot 1 \cdot \frac{3}{5} = \frac{3}{5}$$

## Special Exponential Limits

$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1$$

$$\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1$$

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$$

## Common Mistakes

1. **Canceling incorrectly:** You can only cancel factors, not terms. $\frac{x^2 + x}{x} \neq x + 1$ in general; you need $\frac{x(x+1)}{x} = x + 1$.

2. **Forgetting conditions:** The quotient law requires the denominator limit to be nonzero.

3. **Stopping at indeterminate forms:** $\frac{0}{0}$ is not an answer! It signals more work is needed.

## Summary

- Try direct substitution first
- Use limit laws to break complex limits into pieces
- For $\frac{0}{0}$ forms: factor, rationalize, or use special limits
- Memorize the fundamental trigonometric and exponential limits
- Always verify your technique applies before using it
