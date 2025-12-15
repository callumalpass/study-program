# Derivative Notation

Different notation systems for derivatives have evolved over centuries, each with advantages in different contexts. Understanding all notations is essential for reading mathematics and physics literature.

## Lagrange Notation (Prime Notation)

The most common notation for functions of a single variable:

| Derivative | Notation |
|------------|----------|
| First derivative | $f'(x)$ |
| Second derivative | $f''(x)$ |
| Third derivative | $f'''(x)$ |
| $n$-th derivative | $f^{(n)}(x)$ |

**Advantages:**
- Compact and clean
- Easy to write
- Shows the function being differentiated

**Example:**
If $f(x) = x^3 - 2x$, then:
- $f'(x) = 3x^2 - 2$
- $f''(x) = 6x$
- $f'''(x) = 6$
- $f^{(4)}(x) = 0$

## Leibniz Notation

Developed by Leibniz, this notation emphasizes the "ratio" interpretation:

| Derivative | Notation |
|------------|----------|
| First derivative | $\frac{dy}{dx}$ or $\frac{df}{dx}$ |
| Second derivative | $\frac{d^2y}{dx^2}$ |
| Third derivative | $\frac{d^3y}{dx^3}$ |
| $n$-th derivative | $\frac{d^ny}{dx^n}$ |

**As an operator:** $\frac{d}{dx}[f(x)]$ means "differentiate $f(x)$ with respect to $x$"

**Advantages:**
- Shows which variable we're differentiating with respect to
- Works well with chain rule: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$
- Useful for implicit differentiation
- Shows units clearly: if $y$ is in meters and $x$ is in seconds, $\frac{dy}{dx}$ is in meters/second

**Example:**
If $y = x^3 - 2x$, then:
- $\frac{dy}{dx} = 3x^2 - 2$
- $\frac{d^2y}{dx^2} = 6x$

**Warning:** Despite the notation, $\frac{dy}{dx}$ is NOT actually a fraction. It's a single symbol representing the derivative. However, in many situations it can be manipulated like a fraction (see the chain rule).

## Newton's Notation (Dot Notation)

Common in physics for time derivatives:

| Derivative | Notation |
|------------|----------|
| First derivative | $\dot{y}$ (y-dot) |
| Second derivative | $\ddot{y}$ (y-double-dot) |

**Advantages:**
- Very compact
- Standard in physics for motion

**Example:**
If position $s(t) = t^2$, then:
- Velocity: $\dot{s} = 2t$
- Acceleration: $\ddot{s} = 2$

## Euler's Notation

Uses the differential operator $D$:

| Derivative | Notation |
|------------|----------|
| First derivative | $Df$ or $D_x f$ |
| Second derivative | $D^2f$ |
| $n$-th derivative | $D^nf$ |

**Advantages:**
- Treats differentiation as an operator (useful in differential equations)
- Compact for repeated differentiation

## Subscript Notation

Common in multivariable calculus and physics:

$$f_x = \frac{\partial f}{\partial x}$$

**Example:** If $f(x, y) = x^2 + xy$, then $f_x = 2x + y$.

## At a Point

To indicate evaluation at a specific point:

- Lagrange: $f'(3)$
- Leibniz: $\left.\frac{dy}{dx}\right|_{x=3}$ or $\frac{dy}{dx}\bigg|_{x=3}$

The vertical bar means "evaluated at."

## When to Use Each Notation

| Context | Preferred Notation |
|---------|-------------------|
| Single-variable calculus | $f'(x)$ or $\frac{dy}{dx}$ |
| Chain rule | $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ |
| Physics (time derivatives) | $\dot{x}$, $\ddot{x}$ |
| Implicit differentiation | $\frac{dy}{dx}$ |
| Higher derivatives | $f^{(n)}(x)$ or $\frac{d^ny}{dx^n}$ |
| Differential equations | $D$ or $\frac{d}{dx}$ |
| Partial derivatives | $\frac{\partial f}{\partial x}$ or $f_x$ |

## Mixed Usage

It's common to mix notations:

$$\frac{d}{dx}[x^2] = 2x$$

$$\frac{d}{dx}[\sin x] = \cos x$$

$$\text{If } y = f(g(x)), \text{ then } y' = f'(g(x)) \cdot g'(x)$$

## Independent and Dependent Variables

The notation makes clear which is which:

- In $y = f(x)$: $x$ is independent, $y$ is dependent
- $\frac{dy}{dx}$ reads "derivative of $y$ with respect to $x$"
- This matters in implicit differentiation and related rates

## Summary

- **Lagrange ($f'$):** Clean, common for single-variable functions
- **Leibniz ($\frac{dy}{dx}$):** Shows variables, works like a fraction in chain rule
- **Newton ($\dot{y}$):** Compact, standard for time derivatives in physics
- **Euler ($Df$):** Operator notation, useful for differential equations
- Choose notation based on context; be fluent in all forms
- $\frac{dy}{dx}$ looks like a fraction and often behaves like one, but technically isn't
