---
title: "Mean Value Theorem"
slug: "mean-value-theorem"
description: "Rolle's theorem and mean value theorem"
---

# Mean Value Theorem

## Introduction

The Mean Value Theorem is one of the most important theoretical results in differential calculus. It formalizes the intuitive idea that if a function is continuous and differentiable, then at some point its instantaneous rate of change (derivative) equals its average rate of change over an interval. This seemingly simple statement has profound consequences, including applications to proving fundamental inequalities, establishing monotonicity criteria, and laying the groundwork for the Fundamental Theorem of Calculus.

## Extreme Value Theorem (Review)

Before proving the Mean Value Theorem, we recall a key result from continuity theory:

**Theorem 5.3.1 (Extreme Value Theorem):** If $f$ is continuous on a closed bounded interval $[a,b]$, then $f$ attains its maximum and minimum values on $[a,b]$. That is, there exist $c, d \in [a,b]$ such that:
$$
f(c) \leq f(x) \leq f(d) \text{ for all } x \in [a,b]
$$

## Interior Extremum Theorem

**Theorem 5.3.2 (Interior Extremum Theorem):** Let $f$ be defined on an open interval $(a,b)$ and suppose $f$ has a local maximum or local minimum at $c \in (a,b)$. If $f$ is differentiable at $c$, then $f'(c) = 0$.

**Proof:** Suppose $f$ has a local maximum at $c$. Then there exists $\delta > 0$ such that $f(x) \leq f(c)$ for all $x \in (c-\delta, c+\delta)$.

For the right-hand derivative, consider $h > 0$ small enough that $c + h < b$:
$$
\frac{f(c+h) - f(c)}{h} \leq 0
$$
since $f(c+h) \leq f(c)$ and $h > 0$. Taking the limit as $h \to 0^+$:
$$
f'_+(c) = \lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h} \leq 0
$$

For the left-hand derivative, with $h < 0$:
$$
\frac{f(c+h) - f(c)}{h} \geq 0
$$
since $f(c+h) \leq f(c)$ and $h < 0$. Taking the limit as $h \to 0^-$:
$$
f'_-(c) = \lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h} \geq 0
$$

Since $f$ is differentiable at $c$, we have $f'(c) = f'_+(c) = f'_-(c)$. From the above inequalities, $f'(c) \leq 0$ and $f'(c) \geq 0$, so $f'(c) = 0$.

The proof for a local minimum is analogous. $\square$

**Remark:** This theorem says that critical points (where $f'(c) = 0$) are candidates for local extrema in the interior of the domain. Note that the converse is false: $f'(c) = 0$ does not guarantee a local extremum (consider $f(x) = x^3$ at $x = 0$).

## Rolle's Theorem

**Theorem 5.3.3 (Rolle's Theorem):** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. If $f(a) = f(b)$, then there exists $c \in (a,b)$ such that $f'(c) = 0$.

**Proof:** Since $f$ is continuous on the closed bounded interval $[a,b]$, by the Extreme Value Theorem, $f$ attains its maximum and minimum on $[a,b]$.

Let $M = \max_{x \in [a,b]} f(x)$ and $m = \min_{x \in [a,b]} f(x)$.

**Case 1:** If $M = m$, then $f$ is constant on $[a,b]$, so $f'(x) = 0$ for all $x \in (a,b)$, and we can choose any $c \in (a,b)$.

**Case 2:** If $M > m$, then at least one of $M$ or $m$ is different from $f(a) = f(b)$. Without loss of generality, suppose $M > f(a)$. Then the maximum is attained at some point $c \in (a,b)$ (it cannot be at $a$ or $b$ since $f(a) = f(b) < M$).

Since $c$ is an interior point where $f$ has a local maximum and $f$ is differentiable at $c$, by the Interior Extremum Theorem, $f'(c) = 0$. $\square$

**Geometric Interpretation:** If a differentiable function starts and ends at the same height, there must be at least one point where the tangent line is horizontal.

**Example 5.3.4:** Let $f(x) = x^2 - 4x + 3$ on $[1,3]$. We have $f(1) = 0$ and $f(3) = 0$. By Rolle's Theorem, there exists $c \in (1,3)$ with $f'(c) = 0$.

Computing: $f'(x) = 2x - 4$, so $f'(c) = 0$ gives $c = 2 \in (1,3)$.

**Example 5.3.5:** Let $f(x) = |x|$ on $[-1,1]$. We have $f(-1) = f(1) = 1$, but there is no $c \in (-1,1)$ with $f'(c) = 0$. This does not contradict Rolle's Theorem because $f$ is not differentiable on $(-1,1)$ (it fails at $x = 0$).

## Mean Value Theorem

**Theorem 5.3.6 (Mean Value Theorem):** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then there exists $c \in (a,b)$ such that:
$$
f'(c) = \frac{f(b) - f(a)}{b - a}
$$

**Proof:** The idea is to apply Rolle's Theorem to an auxiliary function that measures the vertical distance between $f(x)$ and the secant line through $(a, f(a))$ and $(b, f(b))$.

The secant line has equation:
$$
y = f(a) + \frac{f(b) - f(a)}{b - a}(x - a)
$$

Define:
$$
g(x) = f(x) - \left[f(a) + \frac{f(b) - f(a)}{b - a}(x - a)\right]
$$

Then $g$ is continuous on $[a,b]$ and differentiable on $(a,b)$ as a difference of such functions. Moreover:
$$
g(a) = f(a) - f(a) = 0
$$
$$
g(b) = f(b) - \left[f(a) + \frac{f(b) - f(a)}{b - a}(b - a)\right] = f(b) - f(b) = 0
$$

By Rolle's Theorem, there exists $c \in (a,b)$ such that $g'(c) = 0$. Computing:
$$
g'(x) = f'(x) - \frac{f(b) - f(a)}{b - a}
$$

Therefore:
$$
0 = g'(c) = f'(c) - \frac{f(b) - f(a)}{b - a}
$$
$$
f'(c) = \frac{f(b) - f(a)}{b - a}
$$
$\square$

**Geometric Interpretation:** The Mean Value Theorem guarantees that there exists at least one point where the tangent line is parallel to the secant line connecting the endpoints.

**Example 5.3.7:** Let $f(x) = x^2$ on $[1,3]$. The average rate of change is:
$$
\frac{f(3) - f(1)}{3 - 1} = \frac{9 - 1}{2} = 4
$$

We need to find $c \in (1,3)$ where $f'(c) = 4$. Since $f'(x) = 2x$, we have $2c = 4$, giving $c = 2 \in (1,3)$.

**Example 5.3.8:** Show that $\sin(b) - \sin(a) \leq b - a$ for $0 \leq a < b \leq \pi/2$.

Let $f(x) = \sin(x)$. By the Mean Value Theorem, there exists $c \in (a,b)$ such that:
$$
\sin(b) - \sin(a) = f'(c)(b - a) = \cos(c)(b - a)
$$

Since $c \in (a,b) \subset (0, \pi/2)$, we have $0 < \cos(c) \leq 1$. Therefore:
$$
\sin(b) - \sin(a) = \cos(c)(b - a) \leq b - a
$$

## Applications of the Mean Value Theorem

### Application 1: Characterizing Constant Functions

**Theorem 5.3.9:** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then $f$ is constant on $[a,b]$ if and only if $f'(x) = 0$ for all $x \in (a,b)$.

**Proof:**
($\Leftarrow$) Suppose $f'(x) = 0$ for all $x \in (a,b)$. Let $x, y \in [a,b]$ with $x < y$. By the Mean Value Theorem applied to $f$ on $[x,y]$, there exists $c \in (x,y)$ such that:
$$
f(y) - f(x) = f'(c)(y - x) = 0 \cdot (y - x) = 0
$$

Therefore $f(y) = f(x)$, showing that $f$ is constant on $[a,b]$.

($\Rightarrow$) If $f$ is constant, say $f(x) = k$ for all $x \in [a,b]$, then clearly $f'(x) = 0$ for all $x \in (a,b)$. $\square$

### Application 2: Monotonicity Test

**Theorem 5.3.10 (Monotonicity Criterion):** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$.
1. If $f'(x) > 0$ for all $x \in (a,b)$, then $f$ is strictly increasing on $[a,b]$.
2. If $f'(x) < 0$ for all $x \in (a,b)$, then $f$ is strictly decreasing on $[a,b]$.
3. If $f'(x) \geq 0$ for all $x \in (a,b)$, then $f$ is (non-strictly) increasing on $[a,b]$.

**Proof:** We prove (1); the others are similar. Let $x, y \in [a,b]$ with $x < y$. By the Mean Value Theorem, there exists $c \in (x,y) \subset (a,b)$ such that:
$$
f(y) - f(x) = f'(c)(y - x)
$$

Since $f'(c) > 0$ and $y - x > 0$, we have $f(y) - f(x) > 0$, i.e., $f(y) > f(x)$. Thus $f$ is strictly increasing. $\square$

**Example 5.3.11:** Show that $f(x) = x^3 - 3x^2 + 4$ is strictly decreasing on $[0,2]$ and strictly increasing on $[2,\infty)$.

We have $f'(x) = 3x^2 - 6x = 3x(x - 2)$.
- For $x \in (0,2)$: $f'(x) < 0$, so $f$ is strictly decreasing on $[0,2]$.
- For $x \in (2,\infty)$: $f'(x) > 0$, so $f$ is strictly increasing on $[2,\infty)$.

### Application 3: Lipschitz Continuity

**Theorem 5.3.12:** Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. If there exists $M > 0$ such that $|f'(x)| \leq M$ for all $x \in (a,b)$, then:
$$
|f(y) - f(x)| \leq M|y - x| \text{ for all } x, y \in [a,b]
$$

Such a function is called **Lipschitz continuous** with Lipschitz constant $M$.

**Proof:** Let $x, y \in [a,b]$ with $x < y$. By the Mean Value Theorem, there exists $c \in (x,y)$ such that:
$$
f(y) - f(x) = f'(c)(y - x)
$$

Therefore:
$$
|f(y) - f(x)| = |f'(c)||y - x| \leq M|y - x|
$$
$\square$

**Example 5.3.13:** Show that $f(x) = \sin(x)$ is Lipschitz continuous on $\mathbb{R}$ with Lipschitz constant 1.

We have $f'(x) = \cos(x)$, so $|f'(x)| = |\cos(x)| \leq 1$ for all $x \in \mathbb{R}$. Therefore, for any $x, y \in \mathbb{R}$:
$$
|\sin(y) - \sin(x)| \leq |y - x|
$$

## Cauchy's Mean Value Theorem

**Theorem 5.3.14 (Cauchy's Mean Value Theorem):** Let $f$ and $g$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then there exists $c \in (a,b)$ such that:
$$
[f(b) - f(a)]g'(c) = [g(b) - g(a)]f'(c)
$$

If additionally $g'(x) \neq 0$ for all $x \in (a,b)$, this can be written as:
$$
\frac{f'(c)}{g'(c)} = \frac{f(b) - f(a)}{g(b) - g(a)}
$$

**Proof:** Define:
$$
h(x) = [f(b) - f(a)]g(x) - [g(b) - g(a)]f(x)
$$

Then $h$ is continuous on $[a,b]$ and differentiable on $(a,b)$. Moreover:
$$
h(a) = [f(b) - f(a)]g(a) - [g(b) - g(a)]f(a)
$$
$$
h(b) = [f(b) - f(a)]g(b) - [g(b) - g(a)]f(b)
$$

Computing $h(b) - h(a)$:
$$
h(b) - h(a) = [f(b) - f(a)][g(b) - g(a)] - [g(b) - g(a)][f(b) - f(a)] = 0
$$

So $h(a) = h(b)$. By Rolle's Theorem, there exists $c \in (a,b)$ such that $h'(c) = 0$.

Computing:
$$
h'(x) = [f(b) - f(a)]g'(x) - [g(b) - g(a)]f'(x)
$$

Therefore $h'(c) = 0$ gives:
$$
[f(b) - f(a)]g'(c) = [g(b) - g(a)]f'(c)
$$
$\square$

**Remark:** The ordinary Mean Value Theorem is the special case where $g(x) = x$.

## Exercises

1. Let $f(x) = x^3 - 2x^2 + x + 1$ on $[0,2]$. Find all values of $c$ guaranteed by the Mean Value Theorem.

2. Prove that $e^x \geq 1 + x$ for all $x \in \mathbb{R}$. (Hint: Consider $f(x) = e^x - 1 - x$.)

3. Show that if $f'(x) = g'(x)$ for all $x \in (a,b)$, then $f$ and $g$ differ by a constant on $[a,b]$.

4. Prove that $|\cos(x) - \cos(y)| \leq |x - y|$ for all $x, y \in \mathbb{R}$.

5. Let $f$ be differentiable on $\mathbb{R}$ with $|f'(x)| \leq k|f(x)|$ for some $k > 0$. If $f(x_0) = 0$ for some $x_0$, prove that $f(x) = 0$ for all $x$.

6. Use Rolle's Theorem to show that between any two roots of $f(x) = 0$ there is at least one root of $f'(x) = 0$.

7. Prove that the equation $x^5 + x + 1 = 0$ has exactly one real root.

8. Show that if $f$ is twice differentiable on $(a,b)$ and $f$ has a local minimum at $c \in (a,b)$, then $f''(c) \geq 0$ (if $f''(c)$ exists).

## Conclusion

The Mean Value Theorem and its variants (Rolle's Theorem and Cauchy's Mean Value Theorem) are central results in differential calculus. They connect local information (the derivative at a point) with global information (the change in function values over an interval). The applications—characterizing constant and monotone functions, establishing Lipschitz continuity, and more—demonstrate the theorem's power. These results will be essential when we develop integration theory and prove the Fundamental Theorem of Calculus.
