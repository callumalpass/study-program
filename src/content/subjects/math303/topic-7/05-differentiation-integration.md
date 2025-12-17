---
title: "Differentiation and Integration"
slug: "differentiation-integration"
description: "Term-by-term differentiation and integration"
---

# Differentiation and Integration

## Introduction

Having established that uniform convergence preserves continuity and allows interchange of limits, we now turn to the more delicate questions of integration and differentiation. Can we integrate or differentiate a series term by term? Under what conditions is:
$$
\frac{d}{dx} \sum_{n=1}^{\infty} f_n(x) = \sum_{n=1}^{\infty} \frac{d}{dx} f_n(x)
$$
or:
$$
\int_a^b \sum_{n=1}^{\infty} f_n(x) \, dx = \sum_{n=1}^{\infty} \int_a^b f_n(x) \, dx
$$

The answers are elegant: integration is easy (uniform convergence suffices), while differentiation is harder (we need uniform convergence of the derivatives).

## Integration of Sequences

**Theorem 5.1 (Integration of Uniform Limits):** Let $[a, b]$ be a closed bounded interval, and let $(f_n)$ be a sequence of Riemann integrable functions $f_n: [a, b] \to \mathbb{R}$. If $f_n \rightrightarrows f$ on $[a, b]$, then $f$ is Riemann integrable on $[a, b]$ and:
$$
\lim_{n \to \infty} \int_a^b f_n(x) \, dx = \int_a^b f(x) \, dx
$$

**Proof:** Let $\epsilon > 0$. By uniform convergence, choose $N$ such that for all $n \geq N$:
$$
\sup_{x \in [a,b]} |f_n(x) - f(x)| < \frac{\epsilon}{3(b-a)}
$$

Since $f_N$ is integrable, it is bounded. By Theorem 2.15, $f$ is also bounded.

For $n \geq N$:
$$
\begin{align}
\left|\int_a^b f_n(x) \, dx - \int_a^b f(x) \, dx\right| &= \left|\int_a^b (f_n(x) - f(x)) \, dx\right| \\
&\leq \int_a^b |f_n(x) - f(x)| \, dx \\
&\leq \int_a^b \frac{\epsilon}{3(b-a)} \, dx \\
&= \frac{\epsilon}{3(b-a)} \cdot (b-a) = \frac{\epsilon}{3} < \epsilon
\end{align}
$$

To show $f$ is Riemann integrable, we use the fact that $f$ is the uniform limit of integrable functions. For a detailed proof of this fact, one shows that the upper and lower Riemann sums of $f$ can be made arbitrarily close by approximating with $f_N$ for large $N$. We omit the technical details. $\square$

**Corollary 5.2:** If each $f_n$ is continuous on $[a, b]$ and $f_n \rightrightarrows f$ on $[a, b]$, then:
$$
\lim_{n \to \infty} \int_a^b f_n(x) \, dx = \int_a^b \lim_{n \to \infty} f_n(x) \, dx
$$

**Example 5.3:** Consider $f_n(x) = nx(1-x^2)^n$ on $[0, 1]$.

For $x \in [0, 1)$, we have $1-x^2 < 1$, so $(1-x^2)^n \to 0$. Thus $f_n(x) \to 0$ pointwise.

However:
$$
\int_0^1 f_n(x) \, dx = \int_0^1 nx(1-x^2)^n \, dx
$$

Using the substitution $u = 1-x^2$:
$$
\int_0^1 nx(1-x^2)^n \, dx = \frac{n}{2} \int_0^1 u^n \, du = \frac{n}{2} \cdot \frac{1}{n+1} = \frac{n}{2(n+1)} \to \frac{1}{2}
$$

So:
$$
\lim_{n \to \infty} \int_0^1 f_n(x) \, dx = \frac{1}{2} \neq 0 = \int_0^1 \lim_{n \to \infty} f_n(x) \, dx
$$

This shows that pointwise convergence is not enough! Indeed, $f_n$ does not converge uniformly on $[0, 1]$. To see this, note that $f_n$ achieves its maximum at $x_n = (2n)^{-1/2}$, giving $f_n(x_n) = \frac{1}{2}(1 - \frac{1}{2n})^n \to \frac{1}{2e^{1/2}}$, which does not approach 0.

**Example 5.4:** Consider $f_n(x) = \frac{x}{n}$ on $[0, 1]$.

We have $f_n \rightrightarrows 0$ on $[0, 1]$. Therefore:
$$
\lim_{n \to \infty} \int_0^1 \frac{x}{n} \, dx = \lim_{n \to \infty} \frac{1}{2n} = 0 = \int_0^1 0 \, dx
$$

This confirms Theorem 5.1.

## Integration of Series

**Theorem 5.5 (Term-by-Term Integration):** Let $[a, b]$ be a closed bounded interval. If $\sum_{n=1}^{\infty} f_n$ converges uniformly on $[a, b]$ and each $f_n$ is Riemann integrable on $[a, b]$, then:
$$
\int_a^b \sum_{n=1}^{\infty} f_n(x) \, dx = \sum_{n=1}^{\infty} \int_a^b f_n(x) \, dx
$$

**Proof:** Let $s_n = \sum_{k=1}^{n} f_k$ be the sequence of partial sums. Each $s_n$ is Riemann integrable (as a finite sum of integrable functions), and $s_n \rightrightarrows \sum_{n=1}^{\infty} f_n$ by hypothesis.

By Theorem 5.1:
$$
\int_a^b \sum_{n=1}^{\infty} f_n(x) \, dx = \lim_{n \to \infty} \int_a^b s_n(x) \, dx = \lim_{n \to \infty} \sum_{k=1}^{n} \int_a^b f_k(x) \, dx = \sum_{n=1}^{\infty} \int_a^b f_n(x) \, dx
$$
$\square$

**Example 5.6:** Consider $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}$ on $[0, \pi]$.

By the Weierstrass M-test, this converges uniformly on $[0, \pi]$. Therefore:
$$
\int_0^{\pi} \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2} \, dx = \sum_{n=1}^{\infty} \int_0^{\pi} \frac{\sin(nx)}{n^2} \, dx
$$

Computing the integral:
$$
\int_0^{\pi} \frac{\sin(nx)}{n^2} \, dx = \frac{1}{n^2} \left[-\frac{\cos(nx)}{n}\right]_0^{\pi} = \frac{1}{n^3}(1 - \cos(n\pi)) = \frac{1 - (-1)^n}{n^3}
$$

Therefore:
$$
\int_0^{\pi} \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2} \, dx = \sum_{n=1}^{\infty} \frac{1 - (-1)^n}{n^3} = 2\sum_{k=0}^{\infty} \frac{1}{(2k+1)^3}
$$

**Example 5.7:** For the geometric series on $[0, r]$ where $r < 1$:
$$
\int_0^r \sum_{n=0}^{\infty} x^n \, dx = \sum_{n=0}^{\infty} \int_0^r x^n \, dx = \sum_{n=0}^{\infty} \frac{r^{n+1}}{n+1}
$$

We can verify this by computing the left side directly:
$$
\int_0^r \frac{1}{1-x} \, dx = -\ln(1-r)
$$

So we obtain the Taylor series for $-\ln(1-r)$:
$$
-\ln(1-r) = \sum_{n=0}^{\infty} \frac{r^{n+1}}{n+1} = \sum_{n=1}^{\infty} \frac{r^n}{n}
$$

## Differentiation of Sequences

Differentiation is more delicate than integration. Uniform convergence of $(f_n)$ is not enough; we need uniform convergence of the derivatives $(f_n')$.

**Theorem 5.8 (Differentiation of Uniform Limits):** Let $[a, b]$ be a closed bounded interval, and let $(f_n)$ be a sequence of differentiable functions $f_n: [a, b] \to \mathbb{R}$. Suppose:
1. $(f_n)$ converges pointwise to some function $f$ on $[a, b]$
2. The derivatives $(f_n')$ are continuous on $[a, b]$
3. $(f_n')$ converges uniformly on $[a, b]$ to some function $g$

Then $f$ is differentiable on $[a, b]$ and $f' = g$. That is:
$$
\frac{d}{dx} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \frac{d}{dx} f_n(x)
$$

**Proof:** By the Fundamental Theorem of Calculus, for any $x \in [a, b]$:
$$
f_n(x) = f_n(a) + \int_a^x f_n'(t) \, dt
$$

Since $f_n(a) \to f(a)$ (pointwise convergence at $a$) and $f_n' \rightrightarrows g$, Theorem 5.1 gives:
$$
\lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} f_n(a) + \lim_{n \to \infty} \int_a^x f_n'(t) \, dt = f(a) + \int_a^x g(t) \, dt
$$

Therefore:
$$
f(x) = f(a) + \int_a^x g(t) \, dt
$$

By the Fundamental Theorem of Calculus, $f$ is differentiable and $f'(x) = g(x)$ for all $x \in [a, b]$. $\square$

**Crucial Note:** We need uniform convergence of $(f_n')$, not $(f_n)$. In fact, $(f_n)$ automatically converges uniformly if $(f_n')$ converges uniformly and $(f_n)$ converges at even one point.

**Corollary 5.9:** Under the hypotheses of Theorem 5.8, $(f_n)$ converges uniformly to $f$ on $[a, b]$.

**Proof:** From the proof above:
$$
f_n(x) - f(x) = [f_n(a) - f(a)] + \int_a^x [f_n'(t) - g(t)] \, dt
$$

Since $f_n(a) \to f(a)$ and $f_n' \rightrightarrows g$:
$$
\sup_{x \in [a,b]} |f_n(x) - f(x)| \leq |f_n(a) - f(a)| + (b-a) \sup_{t \in [a,b]} |f_n'(t) - g(t)| \to 0
$$
$\square$

**Example 5.10:** Consider $f_n(x) = \frac{\sin(nx)}{n}$ on $\mathbb{R}$.

We have $f_n \rightrightarrows 0$ uniformly. However:
$$
f_n'(x) = \cos(nx)
$$

which does not converge pointwise (it oscillates). Therefore, we cannot differentiate term by term. Indeed, the derivative of the limit is:
$$
\frac{d}{dx}(0) = 0
$$

but the "limit of the derivatives" doesn't exist.

**Example 5.11:** Consider $f_n(x) = \frac{x^2}{n}$ on $[0, 1]$.

We have $f_n \rightrightarrows 0$ uniformly and:
$$
f_n'(x) = \frac{2x}{n} \rightrightarrows 0
$$

uniformly on $[0, 1]$. By Theorem 5.8:
$$
\frac{d}{dx} \lim_{n \to \infty} \frac{x^2}{n} = \lim_{n \to \infty} \frac{d}{dx} \frac{x^2}{n}
$$

That is:
$$
\frac{d}{dx}(0) = \lim_{n \to \infty} \frac{2x}{n} = 0
$$

## Differentiation of Series

**Theorem 5.12 (Term-by-Term Differentiation):** Let $[a, b]$ be a closed bounded interval. Suppose $\sum_{n=1}^{\infty} f_n$ is a series of differentiable functions on $[a, b]$ such that:
1. $\sum_{n=1}^{\infty} f_n(x_0)$ converges for some $x_0 \in [a, b]$
2. Each $f_n'$ is continuous on $[a, b]$
3. $\sum_{n=1}^{\infty} f_n'$ converges uniformly on $[a, b]$

Then $\sum_{n=1}^{\infty} f_n$ converges uniformly on $[a, b]$ to a differentiable function $f$, and:
$$
f'(x) = \frac{d}{dx} \sum_{n=1}^{\infty} f_n(x) = \sum_{n=1}^{\infty} \frac{d}{dx} f_n(x) = \sum_{n=1}^{\infty} f_n'(x)
$$

**Proof:** Let $s_n = \sum_{k=1}^{n} f_k$ be the partial sums. Then $s_n' = \sum_{k=1}^{n} f_k'$.

By hypothesis (3), $(s_n')$ converges uniformly. By hypothesis (1), $(s_n(x_0))$ converges. By Theorem 5.8, $(s_n)$ converges uniformly to a differentiable function $f$ with:
$$
f'(x) = \lim_{n \to \infty} s_n'(x) = \lim_{n \to \infty} \sum_{k=1}^{n} f_k'(x) = \sum_{n=1}^{\infty} f_n'(x)
$$
$\square$

**Example 5.13:** Consider $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^3}$ on $\mathbb{R}$.

By the M-test with $M_n = \frac{1}{n^3}$, the series converges uniformly.

The derivative is:
$$
\frac{d}{dx} \frac{\sin(nx)}{n^3} = \frac{\cos(nx)}{n^2}
$$

The series $\sum_{n=1}^{\infty} \frac{\cos(nx)}{n^2}$ also converges uniformly (M-test with $M_n = \frac{1}{n^2}$).

Therefore:
$$
\frac{d}{dx} \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^3} = \sum_{n=1}^{\infty} \frac{\cos(nx)}{n^2}
$$

We can differentiate again:
$$
\frac{d^2}{dx^2} \sum_{n=1}^{\infty} \frac{\sin(nx)}{n^3} = \sum_{n=1}^{\infty} \frac{-\sin(nx)}{n} = -\sum_{n=1}^{\infty} \frac{\sin(nx)}{n}
$$

Note that this last series converges pointwise (Dirichlet test) but not uniformly on all of $\mathbb{R}$, so we cannot differentiate further everywhere.

**Example 5.14:** Consider the power series $f(x) = \sum_{n=0}^{\infty} a_n x^n$ with radius of convergence $R > 0$.

On any interval $[-r, r]$ with $r < R$, the series converges uniformly. The derivative is:
$$
\frac{d}{dx} \sum_{n=0}^{\infty} a_n x^n = \sum_{n=1}^{\infty} n a_n x^{n-1}
$$

The derived series $\sum_{n=1}^{\infty} n a_n x^{n-1}$ has the same radius of convergence $R$ (this can be verified using the ratio or root test). On $[-r, r]$ for $r < R$, it converges uniformly.

Therefore, by Theorem 5.12:
$$
f'(x) = \sum_{n=1}^{\infty} n a_n x^{n-1}
$$

This shows that power series are infinitely differentiable within their radius of convergence, with each derivative obtained by term-by-term differentiation.

## Applications to Power Series

**Theorem 5.15:** Let $f(x) = \sum_{n=0}^{\infty} a_n x^n$ have radius of convergence $R > 0$. Then $f$ is infinitely differentiable on $(-R, R)$, and for each $k \in \mathbb{N}$:
$$
f^{(k)}(x) = \sum_{n=k}^{\infty} n(n-1)\cdots(n-k+1) a_n x^{n-k}
$$

In particular:
$$
a_n = \frac{f^{(n)}(0)}{n!}
$$

**Proof:** By induction using Theorem 5.12. $\square$

**Example 5.16:** The exponential function $e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$ has $R = \infty$.

Differentiating term by term:
$$
\frac{d}{dx} e^x = \sum_{n=1}^{\infty} \frac{x^{n-1}}{(n-1)!} = \sum_{m=0}^{\infty} \frac{x^m}{m!} = e^x
$$

This gives an analytic proof that $(e^x)' = e^x$.

**Example 5.17:** For $|x| < 1$:
$$
\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n
$$

Differentiating both sides:
$$
\frac{1}{(1-x)^2} = \sum_{n=1}^{\infty} n x^{n-1}
$$

Multiplying by $x$:
$$
\frac{x}{(1-x)^2} = \sum_{n=1}^{\infty} n x^n
$$

This gives a formula for $\sum_{n=1}^{\infty} n x^n$.

## Summary

The key results on integration and differentiation are:

**Integration** (easier):
1. If $f_n \rightrightarrows f$ on $[a, b]$ and each $f_n$ is integrable, then:
   $$\int_a^b f = \lim_{n \to \infty} \int_a^b f_n$$

2. For series: If $\sum f_n$ converges uniformly, then:
   $$\int_a^b \sum_{n=1}^{\infty} f_n = \sum_{n=1}^{\infty} \int_a^b f_n$$

**Differentiation** (harder):
1. If $f_n \to f$ pointwise, $f_n'$ are continuous, and $f_n' \rightrightarrows g$, then $f' = g$

2. For series: If $\sum f_n$ converges at one point and $\sum f_n'$ converges uniformly, then:
   $$\frac{d}{dx} \sum_{n=1}^{\infty} f_n = \sum_{n=1}^{\infty} \frac{d}{dx} f_n$$

**Key Distinction**: For integration, we need uniform convergence of the functions. For differentiation, we need uniform convergence of the derivatives.

**Power Series**: Within their radius of convergence, power series can be differentiated and integrated term by term infinitely many times. This makes them extremely well-behaved and justifies many formal manipulations in calculus and differential equations.

These theorems are fundamental tools in analysis, applied throughout mathematics and physics wherever series and sequences of functions appear.
