---
id: math203-t2-differentiability
title: "Differentiability"
order: 3
---

# Differentiability

A function is differentiable at a point if its derivative exists there. But not all functions have derivatives everywhere. Understanding when and why derivatives fail to exist is crucial for applying calculus correctly.

## Definition

A function $f$ is **differentiable at $x = a$** if:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

exists as a finite number.

A function is **differentiable on an interval** if it's differentiable at every point in that interval.

## Differentiability Implies Continuity

**Theorem:** If $f$ is differentiable at $a$, then $f$ is continuous at $a$.

**Proof sketch:** If $f'(a)$ exists, then:
$$\lim_{x \to a} [f(x) - f(a)] = \lim_{x \to a} \frac{f(x) - f(a)}{x - a} \cdot (x - a) = f'(a) \cdot 0 = 0$$

So $\lim_{x \to a} f(x) = f(a)$, which is continuity.

**Important:** The converse is FALSE. Continuity does NOT imply differentiability!

## When Derivatives Fail to Exist

### 1. Corners (Sharp Points)

At a corner, the function is continuous but the slope changes abruptly.

**Classic example:** $f(x) = |x|$ at $x = 0$

Left derivative: $\lim_{h \to 0^-} \frac{|h| - 0}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1$

Right derivative: $\lim_{h \to 0^+} \frac{|h| - 0}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1$

Since $-1 \neq 1$, the derivative doesn't exist at $x = 0$.

```plot
{
  "xAxis": { "domain": [-3, 3], "label": "x" },
  "yAxis": { "domain": [-1, 4], "label": "y" },
  "data": [
    { "fn": "abs(x)", "color": "#8b5cf6" }
  ]
}
```

The graph of $f(x) = |x|$ has a sharp corner at $x = 0$ where the slope abruptly changes from $-1$ to $+1$.

**General pattern:** Functions with $|expression|$ often have corners where the expression equals zero.

### 2. Cusps

A cusp is a sharper version of a corner where the tangent lines become vertical on both sides.

**Example:** $f(x) = x^{2/3}$ at $x = 0$

$$f'(x) = \frac{2}{3}x^{-1/3} = \frac{2}{3\sqrt[3]{x}}$$

As $x \to 0$, $f'(x) \to \pm\infty$ (positive from right, negative from left).

```plot
{
  "xAxis": { "domain": [-2, 2], "label": "x" },
  "yAxis": { "domain": [-0.5, 2], "label": "y" },
  "data": [
    { "fn": "x^(2/3)", "color": "#ef4444" }
  ]
}
```

The graph comes to a sharp point with infinite slopes approaching from both sides—this is a cusp.

### 3. Vertical Tangent Lines

The tangent line exists but is vertical (infinite slope).

**Example:** $f(x) = \sqrt[3]{x} = x^{1/3}$ at $x = 0$

$$f'(x) = \frac{1}{3}x^{-2/3} = \frac{1}{3x^{2/3}}$$

As $x \to 0$, $f'(x) \to +\infty$. The tangent line is vertical.

```plot
{
  "xAxis": { "domain": [-2, 2], "label": "x" },
  "yAxis": { "domain": [-1.5, 1.5], "label": "y" },
  "data": [
    { "fn": "x^(1/3)", "color": "#22c55e" }
  ]
}
```

The graph of $f(x) = x^{1/3}$ passes through the origin with a vertical tangent—the slope is infinite at $x = 0$.

The limit in the derivative definition is infinite, so the derivative doesn't exist (as a finite number).

### 4. Discontinuities

If $f$ is not continuous at $a$, then $f$ is not differentiable at $a$.

**Example:** The step function
$$f(x) = \begin{cases} 0 & x < 0 \\ 1 & x \geq 0 \end{cases}$$

This has a jump discontinuity at $x = 0$, so it can't be differentiable there.

### 5. Oscillation

The function might oscillate too wildly for the limit to exist.

**Example:** $f(x) = x \sin\left(\frac{1}{x}\right)$ for $x \neq 0$, $f(0) = 0$

This function is continuous at $x = 0$ (by Squeeze Theorem), but:

$$f'(0) = \lim_{h \to 0} \frac{h \sin(1/h)}{h} = \lim_{h \to 0} \sin\left(\frac{1}{h}\right)$$

This limit doesn't exist because $\sin(1/h)$ oscillates between $-1$ and $1$.

## One-Sided Derivatives

The **left derivative** is $f'_-(a) = \lim_{h \to 0^-} \frac{f(a+h) - f(a)}{h}$

The **right derivative** is $f'_+(a) = \lim_{h \to 0^+} \frac{f(a+h) - f(a)}{h}$

The (two-sided) derivative exists if and only if both one-sided derivatives exist and are equal.

## Testing Differentiability

To check if $f$ is differentiable at $a$:

1. **Check continuity first.** If $f$ is not continuous at $a$, it's not differentiable.

2. **For piecewise functions:** Check if left and right derivatives match at boundaries.

3. **For functions with absolute values:** Check at points where the argument is zero.

4. **For roots:** Check at points where the radicand is zero.

**Example:** Is $f(x) = |x - 2|$ differentiable at $x = 2$?

For $x > 2$: $f(x) = x - 2$, so $f'(x) = 1$
For $x < 2$: $f(x) = -(x - 2) = 2 - x$, so $f'(x) = -1$

Right derivative at $x = 2$: $f'_+(2) = 1$
Left derivative at $x = 2$: $f'_-(2) = -1$

Since $1 \neq -1$, $f$ is not differentiable at $x = 2$.

## Differentiability of Common Functions

| Function Type | Differentiable Where |
|---------------|---------------------|
| Polynomials | Everywhere |
| Rational functions | Where denominator $\neq 0$ |
| $\sin x$, $\cos x$ | Everywhere |
| $e^x$, $\ln x$ | Their domains |
| $\|x\|$ | Everywhere except $x = 0$ |
| $x^{1/n}$ (odd $n$) | Everywhere except $x = 0$ |
| $x^{1/n}$ (even $n$) | $x > 0$ (not at $x = 0$) |

## Summary

- Differentiable means the derivative limit exists and is finite
- Differentiability implies continuity, but NOT vice versa
- Derivatives fail at: corners, cusps, vertical tangents, discontinuities, wild oscillation
- For piecewise functions, check that left and right derivatives match at boundaries
- Most "nice" functions (polynomials, exponentials, trig functions) are differentiable on their domains
