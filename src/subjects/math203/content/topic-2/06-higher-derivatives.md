---
id: math203-t2-higher
title: "Higher Derivatives"
order: 6
---

# Higher-Order Derivatives

Just as we can differentiate a function to get its derivative, we can differentiate the derivative to get the second derivative, and continue this process. Higher-order derivatives reveal deeper information about a function's behavior.

## Definitions

The **second derivative** is the derivative of the first derivative:

$$f''(x) = \frac{d}{dx}[f'(x)] = \frac{d^2f}{dx^2}$$

The **third derivative** is the derivative of the second derivative:

$$f'''(x) = \frac{d}{dx}[f''(x)] = \frac{d^3f}{dx^3}$$

In general, the **$n$-th derivative** is:

$$f^{(n)}(x) = \frac{d^nf}{dx^n}$$

## Computing Higher Derivatives

**Example 1:** Find all derivatives of $f(x) = x^4 - 3x^2 + 2x - 7$.

$f(x) = x^4 - 3x^2 + 2x - 7$
$f'(x) = 4x^3 - 6x + 2$
$f''(x) = 12x^2 - 6$
$f'''(x) = 24x$
$f^{(4)}(x) = 24$
$f^{(5)}(x) = 0$
$f^{(n)}(x) = 0$ for all $n \geq 5$

For polynomials of degree $n$, the $(n+1)$-th and higher derivatives are zero.

**Example 2:** Find all derivatives of $f(x) = e^x$.

$f(x) = e^x$
$f'(x) = e^x$
$f''(x) = e^x$
$f^{(n)}(x) = e^x$ for all $n$

The exponential function is its own derivative at every order!

**Example 3:** Find all derivatives of $f(x) = \sin x$.

$f(x) = \sin x$
$f'(x) = \cos x$
$f''(x) = -\sin x$
$f'''(x) = -\cos x$
$f^{(4)}(x) = \sin x$

The pattern repeats every 4 derivatives.

## Physical Interpretation

For motion along a line, if $s(t)$ is position at time $t$:

| Derivative | Meaning | Units (if $s$ in meters, $t$ in seconds) |
|------------|---------|------------------------------------------|
| $s(t)$ | Position | meters |
| $s'(t) = v(t)$ | Velocity | m/s |
| $s''(t) = v'(t) = a(t)$ | Acceleration | m/s² |
| $s'''(t) = a'(t)$ | Jerk | m/s³ |

**Jerk** is the rate of change of acceleration. High jerk feels uncomfortable (like a jerky car ride). Roller coasters are designed to minimize jerk.

## The Second Derivative and Concavity

The second derivative tells us about the **shape** of the graph:

- If $f''(x) > 0$: the graph is **concave up** (curves upward, like a smile)
- If $f''(x) < 0$: the graph is **concave down** (curves downward, like a frown)
- If $f''(x) = 0$: possible **inflection point** (where concavity changes)

**Intuition:**
- $f'$ tells us if the function is increasing or decreasing
- $f''$ tells us if $f'$ is increasing or decreasing
- Concave up: the slope itself is increasing (even if function is decreasing)

**Example:** $f(x) = x^3$

$f'(x) = 3x^2 \geq 0$ always (function is increasing)
$f''(x) = 6x$

For $x < 0$: $f'' < 0$ (concave down)
For $x > 0$: $f'' > 0$ (concave up)
At $x = 0$: inflection point (concavity changes)

## Second Derivative Test

At a critical point where $f'(c) = 0$:

- If $f''(c) > 0$: local minimum (concave up, like a valley)
- If $f''(c) < 0$: local maximum (concave down, like a peak)
- If $f''(c) = 0$: test is inconclusive

**Example:** Find and classify critical points of $f(x) = x^3 - 3x$.

$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$

Critical points: $x = -1$ and $x = 1$

$f''(x) = 6x$

At $x = -1$: $f''(-1) = -6 < 0$ → local maximum
At $x = 1$: $f''(1) = 6 > 0$ → local minimum

## Patterns in Higher Derivatives

Some functions have predictable patterns:

| Function | $n$-th derivative |
|----------|-------------------|
| $x^m$ | $\frac{m!}{(m-n)!}x^{m-n}$ if $n \leq m$, else $0$ |
| $e^{ax}$ | $a^n e^{ax}$ |
| $\sin(ax)$ | $a^n \sin(ax + n\frac{\pi}{2})$ |
| $\cos(ax)$ | $a^n \cos(ax + n\frac{\pi}{2})$ |
| $\ln x$ | $(-1)^{n-1}\frac{(n-1)!}{x^n}$ for $n \geq 1$ |

## Example: Finding $f^{(100)}(x)$

Find the 100th derivative of $f(x) = \sin(2x)$.

The derivatives of $\sin(2x)$ cycle with period 4:
- $f(x) = \sin(2x)$
- $f'(x) = 2\cos(2x)$
- $f''(x) = -4\sin(2x)$
- $f'''(x) = -8\cos(2x)$
- $f^{(4)}(x) = 16\sin(2x)$

Pattern: $f^{(n)}(x) = 2^n \sin(2x + n\frac{\pi}{2})$

For $n = 100$: $100 = 4 \cdot 25$, so $100 \cdot \frac{\pi}{2} = 50\pi$ (same as 0)

$f^{(100)}(x) = 2^{100} \sin(2x)$

## Applications

Higher derivatives appear in:
- **Physics:** Jerk, snap, crackle, pop (4th, 5th, 6th derivatives of position)
- **Taylor series:** Approximate functions using derivatives of all orders
- **Differential equations:** Many involve second or higher derivatives
- **Curve analysis:** Concavity, inflection points, rate of curvature change

## Common Mistakes with Higher Derivatives

**Mistake 1: Losing track of sign patterns**

For trigonometric functions, the signs cycle: $\sin \to \cos \to -\sin \to -\cos \to \sin$. It's easy to lose track—write out a few terms systematically.

**Mistake 2: Applying the second derivative test incorrectly**

The second derivative test only applies at critical points where $f'(c) = 0$. If $f'(c) \neq 0$, there's no local extremum regardless of $f''(c)$.

**Mistake 3: Confusing concavity with increasing/decreasing**

A function can be concave up while decreasing (like the left side of a parabola $y = x^2$), and concave down while increasing. Concavity describes the curvature, not the direction of the function.

## Preview: Taylor Series

Higher derivatives are essential for approximating functions with polynomials. The Taylor series of $f$ centered at $a$ is:

$$f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots$$

Each derivative contributes one term. This powerful technique is explored in Calculus II.

## Summary

- The $n$-th derivative is obtained by differentiating $n$ times
- Physical meaning: velocity, acceleration, jerk, etc.
- Second derivative determines concavity: $f'' > 0$ means concave up
- Second derivative test: $f''(c) > 0$ at critical point means local min
- Many functions have predictable patterns in their higher derivatives
- Higher derivatives are essential for Taylor series and advanced analysis
