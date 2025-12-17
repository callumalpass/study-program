---
title: "Power Series"
slug: "power-series"
description: "Radius of convergence and properties of power series"
---

# Power Series

## Definition

**Definition:** A **power series** centered at $a$ is a series of the form:
$$
\sum_{n=0}^{\infty} c_n (x - a)^n
$$

where $c_n$ are constants (coefficients) and $x$ is a variable.

For simplicity, we often take $a = 0$:
$$
\sum_{n=0}^{\infty} c_n x^n
$$

## Radius of Convergence

**Theorem 7.1:** For every power series $\sum c_n x^n$, there exists $R \in [0, \infty]$ (the **radius of convergence**) such that:
- The series converges absolutely for $|x| < R$
- The series diverges for $|x| > R$
- Behavior at $|x| = R$ varies (must check each endpoint)

**Proof:** Let $S = \{r \geq 0 : \sum c_n r^n \text{ converges}\}$. Set $R = \sup S$ (possibly $\infty$).

If $|x| < R$, choose $r$ with $|x| < r < R$. Then $\sum c_n r^n$ converges, so $\sum |c_n x^n| \leq \sum |c_n| r^n < \infty$.

If $|x| > R$, then $|c_n x^n| \not\to 0$, so the series diverges.

## Computing Radius of Convergence

**Theorem 7.2 (Cauchy-Hadamard):**
$$
R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|c_n|}}
$$

**Theorem 7.3 (Ratio Test):** If $\lim_{n \to \infty} \frac{|c_{n+1}|}{|c_n|}$ exists, then:
$$
R = \lim_{n \to \infty} \frac{|c_n|}{|c_{n+1}|}
$$

**Example 1:** $\sum \frac{x^n}{n!}$

$$
\frac{|c_{n+1}|}{|c_n|} = \frac{1/(n+1)!}{1/n!} = \frac{1}{n+1} \to 0
$$

So $R = \infty$. The series converges for all $x$ (this is $e^x$).

**Example 2:** $\sum n! x^n$

$$
\frac{|c_{n+1}|}{|c_n|} = n+1 \to \infty
$$

So $R = 0$. The series only converges at $x = 0$.

**Example 3:** $\sum x^n$ (geometric series)

$$
R = 1
$$

Converges for $|x| < 1$, diverges for $|x| \geq 1$.

## Endpoint Behavior

**Example 4:** $\sum \frac{x^n}{n}$

$R = 1$. At $x = 1$: $\sum \frac{1}{n}$ diverges. At $x = -1$: $\sum \frac{(-1)^n}{n}$ converges.

**Example 5:** $\sum \frac{x^n}{n^2}$

$R = 1$. Both $x = \pm 1$ give convergent series.

## Uniform Convergence on Compact Sets

**Theorem 7.4:** If $\sum c_n x^n$ has radius of convergence $R > 0$, then for any $r < R$, the series converges uniformly on $|x| \leq r$.

This allows term-by-term differentiation and integration.

## Differentiation and Integration

**Theorem 7.5:** If $f(x) = \sum_{n=0}^{\infty} c_n x^n$ with radius $R > 0$, then:

1. $f$ is differentiable on $(-R, R)$
2. $f'(x) = \sum_{n=1}^{\infty} n c_n x^{n-1}$
3. The derived series has the same radius of convergence

**Example 6:** $e^x = \sum \frac{x^n}{n!}$

$$
\frac{d}{dx} e^x = \sum \frac{n x^{n-1}}{n!} = \sum \frac{x^{n-1}}{(n-1)!} = e^x
$$

## Exercises

1. Find the radius of convergence of $\sum \frac{(2x)^n}{n^2}$.

2. Show that $\sum \frac{x^{2n}}{(2n)!}$ and $\sum \frac{x^{2n+1}}{(2n+1)!}$ both have $R = \infty$.

3. Find $R$ for $\sum \frac{x^n}{1 + n^2}$.

## Conclusion

Power series provide analytic representations of functions. The radius of convergence determines where the series defines a function, and term-by-term operations preserve analyticity. Power series are fundamental to complex analysis and differential equations.
