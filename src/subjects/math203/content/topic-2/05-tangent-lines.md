---
id: math203-t2-tangent
title: "Tangent Lines"
order: 5
---

# Tangent Lines and Linear Approximation

The derivative at a point gives the slope of the tangent line. This tangent line provides the best linear approximation to the function near that point, making it a powerful tool for estimation and analysis.

## The Tangent Line

The **tangent line** to $y = f(x)$ at $x = a$ is the line that:
1. Passes through the point $(a, f(a))$
2. Has slope $f'(a)$

Using point-slope form:

$$y - f(a) = f'(a)(x - a)$$

or equivalently:

$$y = f(a) + f'(a)(x - a)$$

## Finding Tangent Lines

**Example 1:** Find the tangent line to $f(x) = x^2$ at $x = 3$.

**Step 1:** Find the point: $f(3) = 9$, so the point is $(3, 9)$

**Step 2:** Find the slope: $f'(x) = 2x$, so $f'(3) = 6$

**Step 3:** Write the equation:
$$y - 9 = 6(x - 3)$$
$$y = 6x - 9$$

```plot
{
  "xAxis": { "domain": [0, 5], "label": "x" },
  "yAxis": { "domain": [-5, 25], "label": "y" },
  "data": [
    { "fn": "x^2", "color": "#8b5cf6" },
    { "fn": "6*x - 9", "color": "#22c55e" }
  ]
}
```

The purple curve is $f(x) = x^2$ and the green line is the tangent $y = 6x - 9$ at the point $(3, 9)$.

**Example 2:** Find the tangent line to $f(x) = \sqrt{x}$ at $x = 4$.

Point: $(4, 2)$

Slope: $f'(x) = \frac{1}{2\sqrt{x}}$, so $f'(4) = \frac{1}{4}$

Tangent line: $y - 2 = \frac{1}{4}(x - 4)$, or $y = \frac{1}{4}x + 1$

## Normal Lines

The **normal line** is perpendicular to the tangent line. If the tangent has slope $m$, the normal has slope $-\frac{1}{m}$ (negative reciprocal).

**Example:** For $f(x) = x^2$ at $x = 3$:
- Tangent slope: 6
- Normal slope: $-\frac{1}{6}$
- Normal line: $y - 9 = -\frac{1}{6}(x - 3)$

## Linear Approximation (Linearization)

Near $x = a$, the function $f(x)$ is approximately equal to its tangent line:

$$f(x) \approx L(x) = f(a) + f'(a)(x - a)$$

The function $L(x)$ is called the **linearization** of $f$ at $a$.

**Why it works:** The tangent line is the best linear approximation to the curve near the point of tangency. As $x$ gets closer to $a$, the approximation gets better.

## Using Linear Approximation

**Example:** Approximate $\sqrt{4.1}$ without a calculator.

Let $f(x) = \sqrt{x}$, $a = 4$ (a nearby "nice" value).

$f(4) = 2$
$f'(x) = \frac{1}{2\sqrt{x}}$, so $f'(4) = \frac{1}{4}$

Linearization: $L(x) = 2 + \frac{1}{4}(x - 4)$

```plot
{
  "xAxis": { "domain": [0, 9], "label": "x" },
  "yAxis": { "domain": [0, 4], "label": "y" },
  "data": [
    { "fn": "sqrt(x)", "color": "#8b5cf6" },
    { "fn": "2 + 0.25*(x - 4)", "color": "#22c55e" }
  ]
}
```

The purple curve is $f(x) = \sqrt{x}$ and the green line is the linearization $L(x) = 2 + \frac{1}{4}(x-4)$. Notice how close they are near $x = 4$.

Approximation: $\sqrt{4.1} \approx L(4.1) = 2 + \frac{1}{4}(0.1) = 2.025$

Actual value: $\sqrt{4.1} \approx 2.0248...$

The approximation is accurate to 2 decimal places!

**Example:** Approximate $\sin(0.1)$.

Let $f(x) = \sin x$, $a = 0$.

$f(0) = 0$
$f'(x) = \cos x$, so $f'(0) = 1$

Linearization: $L(x) = 0 + 1(x - 0) = x$

```plot
{
  "xAxis": { "domain": [-1, 1], "label": "x" },
  "yAxis": { "domain": [-1, 1], "label": "y" },
  "data": [
    { "fn": "sin(x)", "color": "#8b5cf6" },
    { "fn": "x", "color": "#22c55e" }
  ]
}
```

Near the origin, $\sin(x)$ (purple) and its linearization $y = x$ (green) are nearly indistinguishable.

Approximation: $\sin(0.1) \approx 0.1$

Actual value: $\sin(0.1) \approx 0.0998...$

This is why we say $\sin x \approx x$ for small $x$.

## Differentials

The **differential** $dy$ represents the change in $y$ along the tangent line:

$$dy = f'(x) \, dx$$

where $dx$ is a small change in $x$.

**Interpretation:**
- $\Delta y = f(x + \Delta x) - f(x)$ is the actual change in $f$
- $dy = f'(x) \cdot dx$ is the tangent line approximation to $\Delta y$

For small $dx$: $\Delta y \approx dy$

**Example:** If $y = x^3$ and $x$ changes from 2 to 2.01:

$dx = 0.01$
$dy = 3x^2 \cdot dx = 3(4)(0.01) = 0.12$

Actual change: $\Delta y = (2.01)^3 - 2^3 = 8.120601 - 8 = 0.120601$

The differential approximation $dy = 0.12$ is very close.

## Error Estimation

Differentials help estimate how errors in measurement propagate through calculations.

**Example:** A cube's edge is measured as 5 cm with possible error $\pm 0.02$ cm. Estimate the error in the calculated volume.

$V = s^3$
$dV = 3s^2 \, ds = 3(25)(0.02) = 1.5$ cm³

The volume error is approximately $\pm 1.5$ cm³.

Relative error: $\frac{dV}{V} = \frac{1.5}{125} = 0.012 = 1.2\%$

## When Linear Approximation Works Well

The approximation $f(x) \approx f(a) + f'(a)(x-a)$ is best when:

1. $x$ is close to $a$ (small $|x - a|$)
2. $f$ doesn't curve too sharply near $a$ (small $|f''|$)

**Error bound:** If $|f''(x)| \leq M$ for $x$ between $a$ and the point of approximation, then:

$$|f(x) - L(x)| \leq \frac{M}{2}(x - a)^2$$

## Summary

- The tangent line at $(a, f(a))$ has equation $y = f(a) + f'(a)(x - a)$
- The normal line is perpendicular to the tangent
- Linearization: $f(x) \approx f(a) + f'(a)(x - a)$ for $x$ near $a$
- Differentials: $dy = f'(x) \, dx$ approximates actual change $\Delta y$
- Linear approximation is useful for estimation and error analysis
- The approximation improves as $x$ gets closer to $a$
