---
title: "Power Series Functions"
slug: "power-series-functions"
description: "Analytic functions and power series"
---

# Power Series Functions

## Introduction

Power series are among the most important and well-behaved objects in analysis. They represent functions as infinite polynomials, allowing us to extend many algebraic techniques to the realm of analysis. The theory we have developed—uniform convergence, the Weierstrass M-test, term-by-term integration and differentiation—all come together beautifully in the context of power series.

A power series is a series of the form $\sum_{n=0}^{\infty} a_n (x - c)^n$, where $c$ is the center and $\{a_n\}$ are the coefficients. By translation, we can always assume $c = 0$, giving the standard form $\sum_{n=0}^{\infty} a_n x^n$. The fundamental question is: for which values of $x$ does such a series converge?

## Radius and Interval of Convergence

**Theorem 6.1 (Cauchy-Hadamard Theorem):** Let $\sum_{n=0}^{\infty} a_n x^n$ be a power series. Define:
$$
R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|a_n|}}
$$

with the conventions that $R = \infty$ if $\limsup \sqrt[n]{|a_n|} = 0$ and $R = 0$ if $\limsup \sqrt[n]{|a_n|} = \infty$.

Then:
1. The series converges absolutely for all $|x| < R$
2. The series diverges for all $|x| > R$
3. At $x = \pm R$, the series may converge or diverge (endpoint behavior must be checked separately)

The number $R$ is called the **radius of convergence**, and $(-R, R)$ is the **interval of convergence** (possibly including one or both endpoints).

**Proof Sketch:** This follows from the root test. For $|x| < R$:
$$
\limsup_{n \to \infty} \sqrt[n]{|a_n x^n|} = |x| \limsup_{n \to \infty} \sqrt[n]{|a_n|} = \frac{|x|}{R} < 1
$$

so the series converges absolutely by the root test. For $|x| > R$, the root test gives divergence. $\square$

**Alternative Formula (Ratio Test):** If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right|$ exists, then:
$$
R = \lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right|
$$

**Example 6.2:** For $\sum_{n=0}^{\infty} x^n$:
$$
R = \lim_{n \to \infty} \left|\frac{1}{1}\right| = 1
$$

The interval of convergence is $(-1, 1)$. At $x = 1$, the series diverges. At $x = -1$, the series diverges.

**Example 6.3:** For $\sum_{n=1}^{\infty} \frac{x^n}{n}$:
$$
R = \lim_{n \to \infty} \frac{n}{n+1} = 1
$$

The interval of convergence includes $(-1, 1)$. At $x = 1$, we get $\sum \frac{1}{n}$, which diverges. At $x = -1$, we get $\sum \frac{(-1)^n}{n}$, which converges. So the interval of convergence is $[-1, 1)$.

**Example 6.4:** For $\sum_{n=0}^{\infty} \frac{x^n}{n!}$:
$$
R = \lim_{n \to \infty} \frac{n!}{(n+1)!} = \lim_{n \to \infty} \frac{1}{n+1} = 0 \cdot \infty = \infty
$$

Wait, this is incorrect. Let's use the ratio test properly:
$$
\lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right| = \lim_{n \to \infty} \frac{(n+1)!}{n!} = \lim_{n \to \infty} (n+1) = \infty
$$

So $R = \infty$, and the series converges for all $x \in \mathbb{R}$.

**Example 6.5:** For $\sum_{n=0}^{\infty} n! x^n$:
$$
R = \lim_{n \to \infty} \frac{n!}{(n+1)!} = \lim_{n \to \infty} \frac{1}{n+1} = 0
$$

The series converges only at $x = 0$.

## Uniform Convergence on Compact Subsets

**Theorem 6.6:** Let $\sum_{n=0}^{\infty} a_n x^n$ have radius of convergence $R > 0$. Then for any $0 < r < R$, the series converges uniformly on $[-r, r]$.

**Proof:** Since $r < R$, the series $\sum_{n=0}^{\infty} a_n r^n$ converges absolutely. For $|x| \leq r$:
$$
|a_n x^n| \leq |a_n| r^n
$$

By the Weierstrass M-test with $M_n = |a_n| r^n$, the series converges uniformly on $[-r, r]$. $\square$

**Corollary 6.7:** A power series defines a continuous function on its interval of convergence.

**Proof:** Let $f(x) = \sum_{n=0}^{\infty} a_n x^n$ with radius $R > 0$. For any $x_0 \in (-R, R)$, choose $r$ such that $|x_0| < r < R$. By Theorem 6.6, the series converges uniformly on $[-r, r]$. Each term $a_n x^n$ is continuous, so by Theorem 4.1, $f$ is continuous at $x_0$. $\square$

## Differentiation and Integration of Power Series

**Theorem 6.8:** Let $f(x) = \sum_{n=0}^{\infty} a_n x^n$ have radius of convergence $R > 0$. Then:
1. $f$ is infinitely differentiable on $(-R, R)$
2. The derivative is obtained by term-by-term differentiation:
   $$f'(x) = \sum_{n=1}^{\infty} n a_n x^{n-1}$$
3. The derived series has the same radius of convergence $R$
4. Higher derivatives satisfy:
   $$f^{(k)}(x) = \sum_{n=k}^{\infty} n(n-1) \cdots (n-k+1) a_n x^{n-k}$$

**Proof:**
For (3), note that:
$$
\limsup_{n \to \infty} \sqrt[n]{|n a_n|} = \limsup_{n \to \infty} \sqrt[n]{n} \cdot \sqrt[n]{|a_n|}
$$

Since $\sqrt[n]{n} \to 1$, we have:
$$
\limsup_{n \to \infty} \sqrt[n]{|n a_n|} = \limsup_{n \to \infty} \sqrt[n]{|a_n|}
$$

So the derived series has the same radius of convergence.

For (2), on any $[-r, r]$ with $r < R$, both the original series and the derived series converge uniformly (by Theorem 6.6 applied to both). By Theorem 5.12, we can differentiate term by term. Since this holds for any $r < R$, it holds throughout $(-R, R)$.

(1) and (4) follow by induction. $\square$

**Theorem 6.9:** Let $f(x) = \sum_{n=0}^{\infty} a_n x^n$ have radius of convergence $R > 0$. Then for $|x| < R$:
$$
\int_0^x f(t) \, dt = \sum_{n=0}^{\infty} \frac{a_n x^{n+1}}{n+1}
$$

The integrated series also has radius of convergence $R$.

**Proof:** Similar to Theorem 6.8, using Theorem 5.5 instead of Theorem 5.12. $\square$

**Example 6.10:** Starting with $\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$ for $|x| < 1$:

Differentiate:
$$
\frac{1}{(1-x)^2} = \sum_{n=1}^{\infty} n x^{n-1}
$$

Integrate:
$$
-\ln(1-x) = \sum_{n=0}^{\infty} \frac{x^{n+1}}{n+1} = \sum_{n=1}^{\infty} \frac{x^n}{n}
$$

(The last equality uses the constant of integration, which is 0 since both sides vanish at $x = 0$.)

**Example 6.11:** Starting with $e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$:

Differentiate:
$$
e^x = \sum_{n=1}^{\infty} \frac{n x^{n-1}}{n!} = \sum_{n=1}^{\infty} \frac{x^{n-1}}{(n-1)!} = \sum_{m=0}^{\infty} \frac{x^m}{m!}
$$

This confirms $(e^x)' = e^x$.

## Taylor Series and Analytic Functions

**Definition 6.12:** A function $f: (a, b) \to \mathbb{R}$ is **analytic** at $c \in (a, b)$ if there exists $r > 0$ such that $f$ equals its Taylor series centered at $c$ for all $x \in (c-r, c+r) \cap (a, b)$:
$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(c)}{n!} (x-c)^n
$$

A function is **analytic on $(a, b)$** if it is analytic at every point in $(a, b)$.

**Theorem 6.13:** If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ for $|x| < R$, then $f$ is analytic on $(-R, R)$, and:
$$
a_n = \frac{f^{(n)}(0)}{n!}
$$

**Proof:** By Theorem 6.8, $f^{(n)}(0)$ exists for all $n$. Computing:
$$
f^{(n)}(0) = \sum_{k=n}^{\infty} k(k-1) \cdots (k-n+1) a_k \cdot 0^{k-n} = n! a_n
$$

Therefore, $a_n = \frac{f^{(n)}(0)}{n!}$. This shows that the power series equals the Taylor series centered at 0. $\square$

**Remark:** Not every infinitely differentiable function is analytic. The classic example is:
$$
f(x) = \begin{cases}
e^{-1/x^2} & x \neq 0 \\
0 & x = 0
\end{cases}
$$

One can show that $f^{(n)}(0) = 0$ for all $n$, so the Taylor series at 0 is identically 0, which does not equal $f(x)$ for $x \neq 0$.

## Uniqueness of Power Series

**Theorem 6.14 (Uniqueness of Power Series):** If $\sum_{n=0}^{\infty} a_n x^n = \sum_{n=0}^{\infty} b_n x^n$ for all $|x| < r$ for some $r > 0$, then $a_n = b_n$ for all $n$.

**Proof:** Set $x = 0$: $a_0 = b_0$.

Differentiate both sides and set $x = 0$: $a_1 = b_1$.

Continue differentiating: $k! a_k = k! b_k$, so $a_k = b_k$ for all $k$. $\square$

**Corollary 6.15:** If $f$ and $g$ are analytic on an interval and $f(x) = g(x)$ for all $x$ in that interval, then their Taylor series coefficients are identical.

This is the **identity theorem** for power series: if two power series agree on an interval, they are identical.

## Algebraic Operations on Power Series

**Theorem 6.16:** Let $f(x) = \sum_{n=0}^{\infty} a_n x^n$ and $g(x) = \sum_{n=0}^{\infty} b_n x^n$ have radii of convergence $R_f$ and $R_g$ respectively. Let $R = \min\{R_f, R_g\}$.

1. **Addition:** For $|x| < R$:
   $$f(x) + g(x) = \sum_{n=0}^{\infty} (a_n + b_n) x^n$$

2. **Multiplication:** For $|x| < R$:
   $$f(x) \cdot g(x) = \sum_{n=0}^{\infty} c_n x^n$$
   where $c_n = \sum_{k=0}^{n} a_k b_{n-k}$ (Cauchy product)

3. **Composition:** If $|g(x)| < R_f$ for $|x| < R_g$, then:
   $$f(g(x)) = \sum_{n=0}^{\infty} a_n (g(x))^n$$

**Example 6.17:** Multiplying $e^x$ by itself:
$$
e^x \cdot e^x = \left(\sum_{n=0}^{\infty} \frac{x^n}{n!}\right) \left(\sum_{m=0}^{\infty} \frac{x^m}{m!}\right) = \sum_{n=0}^{\infty} c_n x^n
$$

where:
$$
c_n = \sum_{k=0}^{n} \frac{1}{k!} \cdot \frac{1}{(n-k)!} = \frac{1}{n!} \sum_{k=0}^{n} \binom{n}{k} = \frac{2^n}{n!}
$$

This gives $e^x \cdot e^x = e^{2x}$, verifying $\sum_{n=0}^{\infty} \frac{(2x)^n}{n!}$.

Actually, let's recalculate: by the binomial theorem,
$$
c_n = \sum_{k=0}^{n} \frac{1}{k!(n-k)!} = \frac{1}{n!} \sum_{k=0}^{n} \frac{n!}{k!(n-k)!} = \frac{1}{n!} \sum_{k=0}^{n} \binom{n}{k} = \frac{2^n}{n!}
$$

But we expect $e^x \cdot e^x = e^{2x} = \sum \frac{(2x)^n}{n!}$, which has coefficient $\frac{2^n}{n!}$. This matches!

## Important Power Series

**Example 6.18:** The exponential function:
$$
e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}, \quad R = \infty
$$

**Example 6.19:** Trigonometric functions:
$$
\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}, \quad R = \infty
$$
$$
\cos x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{(2n)!}, \quad R = \infty
$$

**Example 6.20:** The logarithm:
$$
\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}, \quad R = 1
$$

(Converges at $x = 1$ but diverges at $x = -1$, so the interval of convergence is $(-1, 1]$.)

**Example 6.21:** The binomial series: For $\alpha \in \mathbb{R}$ and $|x| < 1$:
$$
(1+x)^{\alpha} = \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n
$$

where:
$$
\binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}
$$

## Applications

**Example 6.22 (Solving Differential Equations):** Consider $y' = y$ with $y(0) = 1$.

Assume $y(x) = \sum_{n=0}^{\infty} a_n x^n$. Then:
$$
y'(x) = \sum_{n=1}^{\infty} n a_n x^{n-1}
$$

From $y' = y$:
$$
\sum_{n=1}^{\infty} n a_n x^{n-1} = \sum_{n=0}^{\infty} a_n x^n
$$

Equating coefficients of $x^n$:
$$
(n+1) a_{n+1} = a_n
$$

So $a_{n+1} = \frac{a_n}{n+1}$. With $a_0 = y(0) = 1$:
$$
a_n = \frac{1}{n!}
$$

Therefore, $y(x) = \sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x$.

**Example 6.23 (Evaluating Sums):** Using $\ln(1+x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n}$:

At $x = 1$:
$$
\ln 2 = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots
$$

## Summary

Power series are the quintessential example of well-behaved infinite series:

1. **Convergence**: Determined by the radius of convergence $R = \frac{1}{\limsup \sqrt[n]{|a_n|}}$

2. **Uniform Convergence**: On any $[-r, r]$ with $r < R$, convergence is uniform

3. **Continuity**: Power series define continuous functions on their interval of convergence

4. **Differentiation**: Can be differentiated term by term infinitely many times, with the same radius of convergence

5. **Integration**: Can be integrated term by term, preserving the radius of convergence

6. **Uniqueness**: Power series representation is unique; coefficients are determined by Taylor's formula

7. **Algebra**: Can be added, multiplied, and composed like polynomials

Power series provide a bridge between algebra and analysis, allowing us to treat transcendental functions (exponentials, logarithms, trigonometric functions) with algebraic methods. They are fundamental to complex analysis, differential equations, and many areas of applied mathematics and physics.

The machinery we have developed—uniform convergence, the M-test, term-by-term operations—all finds its most elegant application in the theory of power series. These functions are so well-behaved that we can manipulate them almost as if they were finite polynomials, yet they capture the full richness of analytic functions.
