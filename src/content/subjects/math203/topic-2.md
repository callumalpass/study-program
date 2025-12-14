## Introduction

The derivative is one of the most important concepts in all of mathematics. It measures instantaneous rate of change—how fast a quantity changes at a specific moment. This topic develops the derivative from first principles using limits, building the foundation for all differentiation techniques.

**Why This Matters:**
Derivatives power countless applications: velocity and acceleration in physics, marginal cost in economics, gradient descent in machine learning, sensitivity analysis in engineering, and slope calculations in computer graphics. Understanding the limit definition reveals *why* derivative rules work and prepares you for multivariable and numerical calculus.

**Learning Objectives:**
- Understand the derivative as a limit of difference quotients
- Compute derivatives using the limit definition
- Interpret derivatives geometrically as tangent line slopes
- Interpret derivatives physically as instantaneous rates of change
- Determine where functions are differentiable
- Understand the relationship between differentiability and continuity

---

## Core Concepts

### The Derivative as a Limit

The **derivative** of $f$ at $a$, denoted $f'(a)$, is defined as:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

Equivalently, using $x \to a$:

$$f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$$

The expression $\frac{f(a+h) - f(a)}{h}$ is called the **difference quotient**—it represents the slope of the secant line through $(a, f(a))$ and $(a+h, f(a+h))$.

As $h \to 0$, the secant line becomes the **tangent line**, and the difference quotient becomes the derivative.

### The Derivative as a Function

The **derivative function** $f'(x)$ is defined by:

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

This gives the derivative at every point where the limit exists.

**Notation:**
| Notation | Read As |
|----------|---------|
| $f'(x)$ | "f prime of x" |
| $\frac{df}{dx}$ | "df dx" (Leibniz notation) |
| $\frac{d}{dx}[f(x)]$ | "d dx of f of x" |
| $Df(x)$ | "D of f of x" |
| $\dot{y}$ | "y dot" (Newton, for time derivatives) |

### Geometric Interpretation

The derivative $f'(a)$ is the **slope of the tangent line** to the graph of $f$ at the point $(a, f(a))$.

**Tangent Line Equation:**
$$y - f(a) = f'(a)(x - a)$$

or equivalently:
$$y = f(a) + f'(a)(x - a)$$

This is the **linear approximation** of $f$ near $a$.

### Physical Interpretation

If $s(t)$ represents position at time $t$, then:
- $s'(t)$ = **velocity** (rate of change of position)
- $s''(t)$ = **acceleration** (rate of change of velocity)

More generally, if $y = f(x)$:
- $f'(x)$ = instantaneous rate of change of $y$ with respect to $x$

### Computing Derivatives from the Definition

**Example 1:** Find $f'(x)$ for $f(x) = x^2$

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}$$
$$= \lim_{h \to 0} \frac{2xh + h^2}{h} = \lim_{h \to 0} (2x + h) = 2x$$

**Example 2:** Find $f'(x)$ for $f(x) = \sqrt{x}$

$$f'(x) = \lim_{h \to 0} \frac{\sqrt{x+h} - \sqrt{x}}{h}$$

Rationalize:
$$= \lim_{h \to 0} \frac{(\sqrt{x+h} - \sqrt{x})(\sqrt{x+h} + \sqrt{x})}{h(\sqrt{x+h} + \sqrt{x})}$$
$$= \lim_{h \to 0} \frac{(x+h) - x}{h(\sqrt{x+h} + \sqrt{x})} = \lim_{h \to 0} \frac{1}{\sqrt{x+h} + \sqrt{x}} = \frac{1}{2\sqrt{x}}$$

**Example 3:** Find $f'(x)$ for $f(x) = \frac{1}{x}$

$$f'(x) = \lim_{h \to 0} \frac{\frac{1}{x+h} - \frac{1}{x}}{h} = \lim_{h \to 0} \frac{x - (x+h)}{h \cdot x(x+h)}$$
$$= \lim_{h \to 0} \frac{-h}{h \cdot x(x+h)} = \lim_{h \to 0} \frac{-1}{x(x+h)} = -\frac{1}{x^2}$$

### Differentiability

A function $f$ is **differentiable at $a$** if $f'(a)$ exists (the limit defining it exists and is finite).

$f$ is **differentiable on an interval** if it's differentiable at every point in that interval.

**Theorem:** If $f$ is differentiable at $a$, then $f$ is continuous at $a$.

The converse is FALSE: continuous functions need not be differentiable.

### When Derivatives Fail to Exist

A function is not differentiable at $a$ if:

1. **Corner/Cusp:** Left and right derivatives differ
   - Example: $f(x) = |x|$ at $x = 0$

2. **Vertical Tangent:** Derivative is infinite
   - Example: $f(x) = x^{1/3}$ at $x = 0$

3. **Discontinuity:** Function not continuous
   - Example: Step function at the jump

4. **Oscillation:** Wild behavior prevents a limit
   - Example: $f(x) = x \sin(1/x)$ at $x = 0$

### One-Sided Derivatives

**Left derivative:**
$$f'_-(a) = \lim_{h \to 0^-} \frac{f(a+h) - f(a)}{h}$$

**Right derivative:**
$$f'_+(a) = \lim_{h \to 0^+} \frac{f(a+h) - f(a)}{h}$$

The derivative exists if and only if both one-sided derivatives exist and are equal.

---

## Common Patterns and Techniques

### Expanding Binomials
For $(x+h)^n$, use the binomial theorem or expand carefully:
- $(x+h)^2 = x^2 + 2xh + h^2$
- $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$

### Rationalizing
When the numerator has a difference of radicals, multiply by the conjugate.

### Common Algebra
Factor out $h$ from the numerator to cancel with denominator before taking the limit.

### Basic Derivatives (derived from definition)

| Function | Derivative |
|----------|-----------|
| $c$ (constant) | $0$ |
| $x$ | $1$ |
| $x^2$ | $2x$ |
| $x^3$ | $3x^2$ |
| $x^n$ | $nx^{n-1}$ |
| $\sqrt{x} = x^{1/2}$ | $\frac{1}{2\sqrt{x}}$ |
| $\frac{1}{x} = x^{-1}$ | $-\frac{1}{x^2}$ |

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Take the Limit
The derivative is a limit, not just a difference quotient. After simplifying, you must evaluate as $h \to 0$.

### Mistake 2: Algebra Errors in Expansion
Carefully expand $(x+h)^n$. A common error: $(x+h)^2 \neq x^2 + h^2$.

### Mistake 3: Not Simplifying Before Taking Limit
If you try to substitute $h = 0$ directly in $\frac{f(x+h) - f(x)}{h}$, you get $\frac{0}{0}$. You must algebraically simplify to cancel $h$ first.

### Mistake 4: Confusing Average and Instantaneous Rate
$\frac{f(b) - f(a)}{b - a}$ is the **average** rate of change over $[a, b]$.
$f'(a)$ is the **instantaneous** rate of change at $a$.

---

## Best Practices

1. **Write out the definition** before computing—don't skip steps
2. **Expand carefully** and collect like terms
3. **Factor out $h$** from the numerator
4. **Cancel $h$** (valid since $h \neq 0$ in the limit)
5. **Then take $h \to 0$**
6. **Verify with known rules** once you learn them

---

## Higher Derivatives

The **second derivative** is the derivative of the derivative:
$$f''(x) = \frac{d}{dx}[f'(x)] = \frac{d^2f}{dx^2}$$

Higher derivatives continue the pattern:
- $f'''(x)$ or $f^{(3)}(x)$: third derivative
- $f^{(n)}(x)$: $n$th derivative

**Physical meaning:** If position is $s(t)$:
- $s'(t)$ = velocity
- $s''(t)$ = acceleration
- $s'''(t)$ = jerk (rate of change of acceleration)

---

## The Differential

The **differential** $dy$ is defined as:
$$dy = f'(x) \, dx$$

This represents the change in $y$ along the tangent line for a small change $dx$ in $x$.

**Approximation:** For small $\Delta x$:
$$f(x + \Delta x) \approx f(x) + f'(x) \Delta x$$

This is **linear approximation** or **tangent line approximation**.

---

## Summary

- The **derivative** $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$
- **Geometrically**: slope of tangent line at $(a, f(a))$
- **Physically**: instantaneous rate of change
- **Differentiability implies continuity** (but not conversely)
- Derivatives fail at **corners, cusps, vertical tangents, and discontinuities**
- The limit definition is foundational—all differentiation rules are derived from it

---

## Further Exploration

- **Differentiation Rules:** Product, quotient, and chain rules for efficient computation
- **Implicit Differentiation:** Finding derivatives when $y$ is defined implicitly
- **Numerical Differentiation:** Approximating derivatives with finite differences
- **Automatic Differentiation:** How computers compute exact derivatives
