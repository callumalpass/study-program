---
title: "Higher Order Derivatives"
slug: "higher-derivatives"
description: "Second derivatives and beyond"
---

# Higher Order Derivatives

## Introduction

Just as the derivative of a function provides information about its rate of change, higher-order derivatives provide information about how that rate of change itself changes. The second derivative, for instance, measures concavity and acceleration. Higher derivatives appear in Taylor's Theorem, in the characterization of extrema, and in differential equations. This section develops the theory of higher-order derivatives and explores their applications.

## Definition and Notation

**Definition 5.6.1 (Higher-Order Derivatives):** Let $f$ be differentiable on an interval $I$, so that $f'$ is defined on $I$. If $f'$ is itself differentiable at a point $c \in I$, we say $f$ is **twice differentiable** at $c$, and we define the **second derivative** of $f$ at $c$ as:
$$
f''(c) = (f')'(c) = \lim_{h \to 0} \frac{f'(c+h) - f'(c)}{h}
$$

Inductively, if $f^{(n-1)}$ exists and is differentiable at $c$, we define:
$$
f^{(n)}(c) = (f^{(n-1)})'(c)
$$

**Notation:** Various notations are used for higher derivatives:
- $f''(x), f'''(x), f^{(4)}(x), \ldots, f^{(n)}(x)$ (Lagrange notation)
- $\frac{d^2f}{dx^2}, \frac{d^3f}{dx^3}, \ldots, \frac{d^nf}{dx^n}$ (Leibniz notation)
- $D^2f, D^3f, \ldots, D^nf$ (operator notation)

**Convention:** $f^{(0)} = f$ and $f^{(1)} = f'$.

**Example 5.6.2:** Let $f(x) = x^5$. Then:
- $f'(x) = 5x^4$
- $f''(x) = 20x^3$
- $f'''(x) = 60x^2$
- $f^{(4)}(x) = 120x$
- $f^{(5)}(x) = 120$
- $f^{(n)}(x) = 0$ for $n \geq 6$

**Example 5.6.3:** Let $f(x) = e^x$. Then $f^{(n)}(x) = e^x$ for all $n \in \mathbb{N}$.

**Example 5.6.4:** Let $f(x) = \sin x$. The derivatives cycle:
- $f^{(0)}(x) = \sin x$
- $f^{(1)}(x) = \cos x$
- $f^{(2)}(x) = -\sin x$
- $f^{(3)}(x) = -\cos x$
- $f^{(4)}(x) = \sin x$ (back to the start)

In general, $f^{(n)}(x) = \sin(x + n\pi/2)$.

## Leibniz's Rule for Higher Derivatives

**Theorem 5.6.5 (Leibniz's Rule):** If $f$ and $g$ are $n$ times differentiable, then:
$$
(fg)^{(n)} = \sum_{k=0}^{n} \binom{n}{k} f^{(k)}g^{(n-k)}
$$

This generalizes the product rule and resembles the binomial theorem.

**Proof:** By induction on $n$. For $n = 1$, this is the product rule. Assume the formula holds for $n$. Then:
$$
(fg)^{(n+1)} = \left[\sum_{k=0}^{n} \binom{n}{k} f^{(k)}g^{(n-k)}\right]'
$$
$$
= \sum_{k=0}^{n} \binom{n}{k} [f^{(k+1)}g^{(n-k)} + f^{(k)}g^{(n-k+1)}]
$$

Reindexing and using the identity $\binom{n}{k} + \binom{n}{k-1} = \binom{n+1}{k}$:
$$
= \sum_{k=0}^{n+1} \binom{n+1}{k} f^{(k)}g^{(n+1-k)}
$$
$\square$

**Example 5.6.6:** Find the $n$-th derivative of $f(x) = x^2 e^x$.

Using Leibniz's Rule with $u(x) = x^2$ and $v(x) = e^x$:
$$
f^{(n)}(x) = \sum_{k=0}^{n} \binom{n}{k} u^{(k)}(x) v^{(n-k)}(x)
$$

Since $u^{(k)}(x) = 0$ for $k \geq 3$, only $k = 0, 1, 2$ contribute:
$$
f^{(n)}(x) = \binom{n}{0} x^2 e^x + \binom{n}{1} \cdot 2x e^x + \binom{n}{2} \cdot 2 e^x
$$
$$
= e^x\left[x^2 + 2nx + n(n-1)\right]
$$

## The Second Derivative Test

**Theorem 5.6.7 (Second Derivative Test):** Let $f$ be twice differentiable on an interval containing $c$, and suppose $f'(c) = 0$.
1. If $f''(c) > 0$, then $f$ has a local minimum at $c$.
2. If $f''(c) < 0$, then $f$ has a local maximum at $c$.
3. If $f''(c) = 0$, the test is inconclusive.

**Proof:** We prove (1); case (2) is similar. Suppose $f'(c) = 0$ and $f''(c) > 0$. Then:
$$
f''(c) = \lim_{h \to 0} \frac{f'(c+h) - f'(c)}{h} = \lim_{h \to 0} \frac{f'(c+h)}{h} > 0
$$

By the definition of limit, there exists $\delta > 0$ such that $\frac{f'(c+h)}{h} > 0$ for $0 < |h| < \delta$.

For $h \in (0, \delta)$: $f'(c+h) > 0$, so $f$ is increasing on $(c, c+\delta)$.
For $h \in (-\delta, 0)$: $f'(c+h) < 0$, so $f$ is decreasing on $(c-\delta, c)$.

Therefore, $f$ has a local minimum at $c$. $\square$

**Example 5.6.8:** Find and classify the critical points of $f(x) = x^3 - 3x^2 + 2$.

First derivative: $f'(x) = 3x^2 - 6x = 3x(x-2)$.

Critical points: $x = 0$ and $x = 2$.

Second derivative: $f''(x) = 6x - 6 = 6(x-1)$.

At $x = 0$: $f''(0) = -6 < 0$, so $x = 0$ is a local maximum.
At $x = 2$: $f''(2) = 6 > 0$, so $x = 2$ is a local minimum.

**Example 5.6.9 (Inconclusive Test):** Consider $f(x) = x^4$ at $x = 0$.

We have $f'(0) = 0$ and $f''(0) = 0$, so the second derivative test is inconclusive. However, $f(x) = x^4 \geq 0 = f(0)$ for all $x$, so $x = 0$ is actually a global minimum.

For $g(x) = -x^4$, we also have $g'(0) = g''(0) = 0$, but $x = 0$ is a global maximum.

For $h(x) = x^3$, we have $h'(0) = h''(0) = 0$, but $x = 0$ is neither a maximum nor a minimum (it's an inflection point).

## Concavity and Inflection Points

**Definition 5.6.10:** A function $f$ is **concave up** (or **convex**) on an interval $I$ if for all $x, y \in I$ and all $\lambda \in (0,1)$:
$$
f(\lambda x + (1-\lambda)y) \leq \lambda f(x) + (1-\lambda) f(y)
$$

$f$ is **concave down** (or **concave**) if the inequality is reversed.

Geometrically, a function is concave up if the line segment between any two points on the graph lies above the graph, and concave down if it lies below.

**Theorem 5.6.11 (Concavity Test):** Let $f$ be twice differentiable on an interval $I$.
1. If $f''(x) > 0$ for all $x \in I$, then $f$ is concave up on $I$.
2. If $f''(x) < 0$ for all $x \in I$, then $f$ is concave down on $I$.

**Proof:** We prove (1). Let $x, y \in I$ with $x < y$, and let $\lambda \in (0,1)$. Set $c = \lambda x + (1-\lambda)y$, so $c \in (x,y)$.

We need to show that $f(c) \leq \lambda f(x) + (1-\lambda) f(y)$.

By Taylor's Theorem applied to $f$ at $c$:
$$
f(x) = f(c) + f'(c)(x-c) + \frac{f''(\xi_1)}{2}(x-c)^2
$$
for some $\xi_1 \in (x,c)$, and
$$
f(y) = f(c) + f'(c)(y-c) + \frac{f''(\xi_2)}{2}(y-c)^2
$$
for some $\xi_2 \in (c,y)$.

Multiplying the first by $\lambda$ and the second by $(1-\lambda)$ and adding:
$$
\lambda f(x) + (1-\lambda)f(y) = f(c) + f'(c)[\lambda(x-c) + (1-\lambda)(y-c)]
$$
$$
+ \lambda\frac{f''(\xi_1)}{2}(x-c)^2 + (1-\lambda)\frac{f''(\xi_2)}{2}(y-c)^2
$$

Since $c = \lambda x + (1-\lambda)y$, we have $\lambda(x-c) + (1-\lambda)(y-c) = 0$. Also, $f''(\xi_1), f''(\xi_2) > 0$ and $(x-c)^2, (y-c)^2 > 0$. Therefore:
$$
\lambda f(x) + (1-\lambda)f(y) \geq f(c)
$$
$\square$

**Definition 5.6.12:** A point $c$ is an **inflection point** of $f$ if $f$ is continuous at $c$ and the concavity changes at $c$ (from concave up to concave down, or vice versa).

**Theorem 5.6.13:** If $f$ is twice differentiable and $c$ is an inflection point, then $f''(c) = 0$ or $f''(c)$ does not exist.

**Remark:** The converse is false: $f''(c) = 0$ does not guarantee an inflection point (e.g., $f(x) = x^4$ at $x = 0$).

**Example 5.6.14:** Find the inflection points of $f(x) = x^3 - 6x^2 + 9x + 1$.

We have $f''(x) = 6x - 12 = 6(x-2)$.

$f''(x) = 0$ when $x = 2$.

For $x < 2$: $f''(x) < 0$ (concave down).
For $x > 2$: $f''(x) > 0$ (concave up).

So $x = 2$ is an inflection point.

## Continuity of Higher Derivatives

**Remark 5.6.15:** Unlike the first derivative, which is continuous whenever it exists on an open interval (a deep theorem), higher derivatives need not be continuous even when they exist.

**Example 5.6.16:** Let
$$
f(x) = \begin{cases} x^2 \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}
$$

Then $f$ is differentiable everywhere, with:
$$
f'(x) = \begin{cases} 2x\sin(1/x) - \cos(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}
$$

The derivative $f'$ is not continuous at 0 (it oscillates).

## Applications of Higher Derivatives

### Approximation Theory

Higher derivatives appear in Taylor polynomials, providing successively better approximations:
$$
f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots
$$

### Physics

- **Position, Velocity, Acceleration:** If $s(t)$ is position, then $s'(t)$ is velocity, $s''(t)$ is acceleration, and $s'''(t)$ is jerk.
- **Curvature:** The curvature of a curve $y = f(x)$ is given by:
$$
\kappa = \frac{|f''(x)|}{(1 + (f'(x))^2)^{3/2}}
$$

### Optimization

The second derivative test is a standard tool for classifying critical points in optimization problems.

## Exercises

1. Find $f^{(n)}(x)$ for $f(x) = \frac{1}{x}$.

2. Use Leibniz's Rule to find the $n$-th derivative of $f(x) = x^3 \cos x$.

3. Determine all inflection points of $f(x) = x^4 - 4x^3$.

4. Prove that if $f''(x) > 0$ on $(a,b)$, then $f'$ is strictly increasing on $(a,b)$.

5. Let $f(x) = ax^2 + bx + c$. Under what conditions does $f$ have a local minimum?

6. Show that $f(x) = e^{-x^2}$ is concave up on $(-1, 1)$ and concave down on $(-\infty, -1) \cup (1, \infty)$.

7. If $f$ is three times differentiable and has an inflection point at $c$ with $f''(c) = 0$, show that either $f'''(c) \neq 0$ or higher derivatives must be examined.

8. Prove that any polynomial of degree $n$ has at most $n-2$ inflection points.

## Conclusion

Higher-order derivatives provide increasingly refined information about the behavior of functions. The second derivative, in particular, is crucial for understanding concavity and for classifying critical points. Leibniz's Rule for products of functions generalizes the product rule and provides a computational tool for finding higher derivatives. While higher derivatives need not share all the nice properties of first derivatives (such as automatic continuity), they remain essential tools in both theoretical and applied mathematics, appearing prominently in Taylor's Theorem, optimization, and differential equations.
