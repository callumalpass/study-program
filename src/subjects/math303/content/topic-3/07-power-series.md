---
title: "Power Series"
slug: "power-series"
description: "Radius of convergence, properties of power series, and term-by-term operations"
---

# Power Series

## Introduction

Power series provide a bridge between infinite series and functions, allowing us to represent functions as "infinite polynomials." They are foundational to complex analysis, differential equations, and many applications in physics and engineering. In this section, we develop the theory of power series from the perspective of real analysis, focusing on convergence properties and the operations we can perform.

## Definition of Power Series

**Definition:** A **power series** centered at $a \in \mathbb{R}$ is a series of the form:
$$
\sum_{n=0}^{\infty} c_n (x - a)^n = c_0 + c_1(x-a) + c_2(x-a)^2 + c_3(x-a)^3 + \cdots
$$

where $(c_n)$ is a sequence of real numbers called the **coefficients**, and $x$ is a variable.

For simplicity, we often work with power series centered at $a = 0$:
$$
\sum_{n=0}^{\infty} c_n x^n = c_0 + c_1 x + c_2 x^2 + c_3 x^3 + \cdots
$$

The theory for general $a$ follows by the substitution $y = x - a$.

**Question:** For which values of $x$ does a power series converge?

## The Radius of Convergence

Unlike Taylor series in calculus, where convergence was often taken for granted, in real analysis we must carefully characterize the domain of convergence.

**Theorem (Radius of Convergence):** For every power series $\sum_{n=0}^{\infty} c_n x^n$, there exists a unique number $R \in [0, \infty]$, called the **radius of convergence**, such that:

1. The series converges absolutely for all $|x| < R$
2. The series diverges for all $|x| > R$
3. The behavior at $|x| = R$ (the boundary) must be checked separately for each case

**Proof:** Define:
$$
R = \sup\{r \geq 0 : \sum |c_n| r^n \text{ converges}\}
$$

(with $R = 0$ if this set is $\{0\}$, and $R = \infty$ if the set is unbounded).

**For $|x| < R$:** Choose $r$ with $|x| < r < R$. By definition of $R$, the series $\sum |c_n| r^n$ converges. Since $|c_n x^n| = |c_n| |x|^n \leq |c_n| r^n$ for all $n$ (because $|x| < r$), the comparison test gives absolute convergence of $\sum c_n x^n$.

**For $|x| > R$:** If $\sum c_n x^n$ converged, then $c_n x^n \to 0$, which would imply $|c_n| |x|^n$ is bounded. But then $\sum |c_n| r^n$ would converge for some $r < |x|$ by comparison, contradicting the definition of $R$. Hence the series diverges. □

The set $\{x : |x| < R\}$ is called the **interval of convergence** (excluding endpoints), and the full interval including endpoints that converge is the **domain of convergence**.

## Computing the Radius of Convergence

Two formulas are commonly used:

**Theorem (Cauchy-Hadamard Formula):**
$$
R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|c_n|}}
$$

This formula always works, using the conventions $1/0 = \infty$ and $1/\infty = 0$.

**Theorem (Ratio Test Formula):** If $\lim_{n \to \infty} \left|\frac{c_{n+1}}{c_n}\right|$ exists (including $\infty$), then:
$$
R = \lim_{n \to \infty} \left|\frac{c_n}{c_{n+1}}\right|
$$

This formula is often easier to compute when the limit exists.

## Examples of Radius of Convergence

**Example 1: The exponential series** $\sum_{n=0}^{\infty} \frac{x^n}{n!}$

Using the ratio test:
$$
\left|\frac{c_{n+1}}{c_n}\right| = \frac{1/(n+1)!}{1/n!} = \frac{1}{n+1} \to 0
$$

Hence $R = 1/0 = \infty$. The series converges for all $x \in \mathbb{R}$, and its sum is $e^x$.

**Example 2: The factorial series** $\sum_{n=0}^{\infty} n! x^n$

Using the ratio test:
$$
\left|\frac{c_{n+1}}{c_n}\right| = \frac{(n+1)!}{n!} = n+1 \to \infty
$$

Hence $R = 0$. The series converges only at $x = 0$.

**Example 3: The geometric series** $\sum_{n=0}^{\infty} x^n$

Here $c_n = 1$ for all $n$, so $\limsup \sqrt[n]{|c_n|} = 1$, giving $R = 1$. The series converges for $|x| < 1$ and diverges for $|x| \geq 1$.

**Example 4: The logarithmic series** $\sum_{n=1}^{\infty} \frac{x^n}{n}$

Using the ratio test: $|c_{n+1}/c_n| = n/(n+1) \to 1$, so $R = 1$.

At $x = 1$: $\sum 1/n$ diverges (harmonic series).
At $x = -1$: $\sum (-1)^n/n$ converges (alternating harmonic series).

The domain of convergence is $[-1, 1)$.

**Example 5:** $\sum_{n=1}^{\infty} \frac{x^n}{n^2}$

$R = 1$ by the ratio test. At $x = \pm 1$: $\sum 1/n^2$ converges. The domain is $[-1, 1]$.

## Uniform Convergence on Compact Subsets

A crucial property of power series is that they converge uniformly on compact subsets of their interval of convergence.

**Theorem:** If $\sum c_n x^n$ has radius of convergence $R > 0$, then for any $0 < r < R$, the series converges uniformly on $[-r, r]$.

**Proof:** For $|x| \leq r < R$, we have $|c_n x^n| \leq |c_n| r^n$. Since $\sum |c_n| r^n$ converges (because $r < R$), the Weierstrass M-test gives uniform convergence on $[-r, r]$. □

This uniform convergence is what allows us to perform term-by-term operations.

## Term-by-Term Differentiation

**Theorem:** If $f(x) = \sum_{n=0}^{\infty} c_n x^n$ has radius of convergence $R > 0$, then:

1. $f$ is differentiable on $(-R, R)$
2. $f'(x) = \sum_{n=1}^{\infty} n c_n x^{n-1}$
3. The differentiated series has the same radius of convergence $R$

**Proof Sketch:** The key is that uniform convergence on compact subsets allows interchanging the limit (derivative) with the sum. The radius of convergence is preserved because $\limsup \sqrt[n]{n|c_n|} = \limsup \sqrt[n]{|c_n|}$ (since $\sqrt[n]{n} \to 1$). □

**Corollary:** Power series are infinitely differentiable on their interval of convergence, and:
$$
f^{(k)}(x) = \sum_{n=k}^{\infty} n(n-1)\cdots(n-k+1) c_n x^{n-k}
$$

**Example 6:** For $e^x = \sum \frac{x^n}{n!}$:
$$
\frac{d}{dx} e^x = \sum_{n=1}^{\infty} \frac{n x^{n-1}}{n!} = \sum_{n=1}^{\infty} \frac{x^{n-1}}{(n-1)!} = \sum_{m=0}^{\infty} \frac{x^m}{m!} = e^x
$$

This proves $\frac{d}{dx} e^x = e^x$ from the series definition.

## Term-by-Term Integration

**Theorem:** If $f(x) = \sum_{n=0}^{\infty} c_n x^n$ has radius of convergence $R > 0$, then for $|x| < R$:
$$
\int_0^x f(t) \, dt = \sum_{n=0}^{\infty} \frac{c_n x^{n+1}}{n+1}
$$

The integrated series also has radius of convergence $R$.

**Example 7:** Since $\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$ for $|x| < 1$:
$$
-\ln(1-x) = \int_0^x \frac{1}{1-t} \, dt = \sum_{n=0}^{\infty} \frac{x^{n+1}}{n+1} = \sum_{n=1}^{\infty} \frac{x^n}{n}
$$

This gives the Taylor series for $-\ln(1-x)$ on $(-1, 1)$.

## Abel's Theorem and Endpoint Behavior

**Theorem (Abel's Theorem):** If $\sum c_n$ converges (at $x = 1$), then:
$$
\lim_{x \to 1^-} \sum_{n=0}^{\infty} c_n x^n = \sum_{n=0}^{\infty} c_n
$$

This allows us to extend convergence results to the boundary in certain cases.

**Example 8:** The alternating harmonic series $\sum (-1)^{n+1}/n = \ln 2$, and:
$$
\ln 2 = \lim_{x \to 1^-} \sum_{n=1}^{\infty} \frac{(-1)^{n+1} x^n}{n} = \lim_{x \to 1^-} \ln(1+x) = \ln 2
$$

## Key Takeaways

- Every power series $\sum c_n x^n$ has a **radius of convergence** $R$ determining where it converges.
- Within $(-R, R)$, convergence is **absolute**; outside $(-R, R)$, the series **diverges**.
- **Endpoint behavior** varies and must be checked individually.
- Power series converge **uniformly on compact subsets**, enabling term-by-term operations.
- **Differentiation and integration** can be performed term-by-term, preserving the radius of convergence.
- **Abel's theorem** connects series values at the boundary to limits from within.

## Common Mistakes to Avoid

1. **Forgetting to check endpoints:** The radius $R$ only determines $(-R, R)$; endpoints need separate analysis.

2. **Assuming convergence at endpoints extends inside:** Convergence at $x = R$ doesn't guarantee uniform convergence up to $R$.

3. **Differentiating without checking $R > 0$:** If $R = 0$, the series only converges at one point and isn't differentiable.

4. **Confusing pointwise and uniform convergence:** Power series converge uniformly on compact subsets of $(-R, R)$, but not necessarily on the entire interval.
