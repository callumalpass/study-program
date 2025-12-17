---
title: "Weierstrass M-Test"
slug: "weierstrass-mtest"
description: "Sufficient condition for uniform convergence"
---

# Weierstrass M-Test

## Introduction

While the definition of uniform convergence provides a clear criterion, directly verifying it can be challenging. Computing $\sup_{x \in D} |f_n(x) - f(x)|$ often requires first determining the pointwise limit $f$, then analyzing the supremum of the difference, which may involve complicated optimization problems.

The Weierstrass M-test provides a powerful and easy-to-apply sufficient condition for uniform convergence of series. It is one of the most important practical tools in analysis, particularly for power series, Fourier series, and other series of functions that arise throughout mathematics. The test uses simple comparison with convergent series of constants to establish uniform convergence.

## The Weierstrass M-Test

**Theorem 3.1 (Weierstrass M-Test):** Let $(f_n)_{n=1}^{\infty}$ be a sequence of functions $f_n: D \to \mathbb{R}$. Suppose there exists a sequence of non-negative constants $(M_n)_{n=1}^{\infty}$ such that:
1. $|f_n(x)| \leq M_n$ for all $x \in D$ and all $n \in \mathbb{N}$
2. $\sum_{n=1}^{\infty} M_n$ converges

Then $\sum_{n=1}^{\infty} f_n$ converges uniformly (and absolutely) on $D$.

**Proof:** Let $s_n(x) = \sum_{k=1}^{n} f_k(x)$ denote the $n$-th partial sum. We will use the Cauchy criterion for uniform convergence.

Let $\epsilon > 0$. Since $\sum_{n=1}^{\infty} M_n$ converges, the sequence of partial sums $\sum_{k=1}^{n} M_k$ is Cauchy. Therefore, there exists $N \in \mathbb{N}$ such that for all $m > n \geq N$:
$$
\sum_{k=n+1}^{m} M_k < \epsilon
$$

For any $x \in D$ and $m > n \geq N$:
$$
\begin{align}
|s_m(x) - s_n(x)| &= \left|\sum_{k=n+1}^{m} f_k(x)\right| \\
&\leq \sum_{k=n+1}^{m} |f_k(x)| \\
&\leq \sum_{k=n+1}^{m} M_k \\
&< \epsilon
\end{align}
$$

Taking the supremum over $x \in D$:
$$
\sup_{x \in D} |s_m(x) - s_n(x)| \leq \epsilon
$$

By the Cauchy criterion (Theorem 2.9), $(s_n)$ converges uniformly on $D$.

To show absolute convergence, note that for each fixed $x \in D$:
$$
\sum_{n=1}^{\infty} |f_n(x)| \leq \sum_{n=1}^{\infty} M_n < \infty
$$

by the comparison test. Therefore, $\sum_{n=1}^{\infty} f_n(x)$ converges absolutely for each $x \in D$. $\square$

**Remark:** The Weierstrass M-test is only a sufficient condition, not a necessary one. A series may converge uniformly even if the M-test does not apply.

**Remark:** The key idea is to bound each term uniformly (independent of $x$) and ensure the bounds are summable. This immediately gives uniform convergence without needing to find the limit function explicitly.

## Examples

**Example 3.2:** Consider $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}$ on $\mathbb{R}$.

For all $x \in \mathbb{R}$:
$$
\left|\frac{\sin(nx)}{n^2}\right| \leq \frac{1}{n^2}
$$

Since $\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$ converges (by the Basel problem), the Weierstrass M-test applies with $M_n = \frac{1}{n^2}$.

Therefore, $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^2}$ converges uniformly on $\mathbb{R}$.

**Example 3.3:** Consider $\sum_{n=1}^{\infty} \frac{x^n}{n}$ on $[-r, r]$ where $0 < r < 1$.

For $x \in [-r, r]$:
$$
\left|\frac{x^n}{n}\right| \leq \frac{r^n}{n}
$$

Since $0 < r < 1$, the series $\sum_{n=1}^{\infty} \frac{r^n}{n}$ converges (by the ratio test or comparison with the geometric series). The M-test applies with $M_n = \frac{r^n}{n}$.

Therefore, $\sum_{n=1}^{\infty} \frac{x^n}{n}$ converges uniformly on $[-r, r]$ for any $r < 1$.

Note: The series does not converge uniformly on $(-1, 1)$, showing that uniform convergence on every compact subset does not imply uniform convergence on the whole set.

**Example 3.4:** Consider $\sum_{n=0}^{\infty} x^n$ on $[-r, r]$ where $0 < r < 1$.

For $x \in [-r, r]$:
$$
|x^n| \leq r^n
$$

Since $\sum_{n=0}^{\infty} r^n = \frac{1}{1-r}$ converges, the M-test applies with $M_n = r^n$.

Therefore, $\sum_{n=0}^{\infty} x^n$ converges uniformly to $\frac{1}{1-x}$ on $[-r, r]$.

However, this series does not converge uniformly on $(-1, 1)$. To see this, note that:
$$
\sup_{x \in (-1,1)} \left|\frac{1}{1-x} - \sum_{k=0}^{n} x^k\right| = \sup_{x \in (-1,1)} \left|\frac{x^{n+1}}{1-x}\right|
$$

As $x \to 1^-$, this supremum approaches infinity, so uniform convergence fails.

**Example 3.5:** Consider $\sum_{n=1}^{\infty} \frac{\cos(nx)}{n^3}$ on $\mathbb{R}$.

For all $x \in \mathbb{R}$:
$$
\left|\frac{\cos(nx)}{n^3}\right| \leq \frac{1}{n^3}
$$

Since $\sum_{n=1}^{\infty} \frac{1}{n^3}$ converges (p-series with $p = 3 > 1$), the M-test applies with $M_n = \frac{1}{n^3}$.

Therefore, $\sum_{n=1}^{\infty} \frac{\cos(nx)}{n^3}$ converges uniformly and absolutely on $\mathbb{R}$.

**Example 3.6 (Negative Example):** Consider $\sum_{n=1}^{\infty} \frac{(-1)^n}{n}$ (constant sequence).

This series converges by the alternating series test. However, we cannot apply the M-test because:
$$
M_n = \frac{1}{n} \text{ and } \sum_{n=1}^{\infty} \frac{1}{n} = \infty
$$

This illustrates that the M-test is only sufficient, not necessary. The series converges but not absolutely, so the M-test doesn't apply.

## Applications to Power Series

**Theorem 3.7:** Let $\sum_{n=0}^{\infty} a_n x^n$ be a power series with radius of convergence $R > 0$. Then for any $0 < r < R$, the series converges uniformly on $[-r, r]$.

**Proof:** Since $r < R$, the series $\sum_{n=0}^{\infty} a_n r^n$ converges (by definition of radius of convergence). Let $M_n = |a_n| r^n$. Then $\sum_{n=0}^{\infty} M_n$ converges.

For $|x| \leq r$:
$$
|a_n x^n| \leq |a_n| r^n = M_n
$$

By the Weierstrass M-test, $\sum_{n=0}^{\infty} a_n x^n$ converges uniformly on $[-r, r]$. $\square$

**Corollary 3.8:** A power series converges uniformly on every closed interval strictly contained within its interval of convergence.

**Corollary 3.9:** If $\sum_{n=0}^{\infty} a_n x^n$ has radius of convergence $R > 0$, then the sum function $f(x) = \sum_{n=0}^{\infty} a_n x^n$ is continuous on $(-R, R)$.

**Proof:** Let $x_0 \in (-R, R)$ and choose $r$ such that $|x_0| < r < R$. The series converges uniformly on $[-r, r]$ by Theorem 3.7. Each partial sum is a polynomial, hence continuous. By Theorem 2.10, the uniform limit is continuous on $[-r, r]$, in particular at $x_0$. Since $x_0$ was arbitrary, $f$ is continuous on $(-R, R)$. $\square$

## Combining with Other Tests

**Example 3.10 (Abel's Test for Uniform Convergence):** This is a more sophisticated test that can handle some cases where the M-test fails.

**Theorem 3.11 (Abel's Test):** Suppose:
1. $\sum_{n=1}^{\infty} f_n(x)$ converges uniformly on $D$
2. Each $g_n$ is monotonic in $n$ for each fixed $x$
3. The sequence $(g_n)$ is uniformly bounded on $D$

Then $\sum_{n=1}^{\infty} f_n(x) g_n(x)$ converges uniformly on $D$.

We will not prove this here, but note that it extends the power of the M-test to series with more complicated behavior.

## Detailed Worked Examples

**Example 3.12:** Show that $\sum_{n=1}^{\infty} \frac{x^n}{n^2}$ converges uniformly on $[-1, 1]$.

**Solution:** For $x \in [-1, 1]$:
$$
\left|\frac{x^n}{n^2}\right| \leq \frac{1}{n^2}
$$

Since $\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$ converges, the Weierstrass M-test applies with $M_n = \frac{1}{n^2}$.

Therefore, $\sum_{n=1}^{\infty} \frac{x^n}{n^2}$ converges uniformly on $[-1, 1]$.

Note that this includes the endpoints, unlike Example 3.3. The stronger decay ($n^{-2}$ vs $n^{-1}$) allows uniform convergence on the closed interval.

**Example 3.13:** Determine whether $\sum_{n=1}^{\infty} \frac{x^{2n}}{1 + x^{2n}}$ converges uniformly on $[0, 1]$.

**Solution:** First, let's find the pointwise limit. For $0 \leq x < 1$:
$$
\frac{x^{2n}}{1 + x^{2n}} \to 0
$$

For $x = 1$:
$$
\frac{1}{1 + 1} = \frac{1}{2}
$$

So the series diverges at $x = 1$.

However, let's check on $[0, r]$ for $r < 1$. For $x \in [0, r]$:
$$
\frac{x^{2n}}{1 + x^{2n}} \leq x^{2n} \leq r^{2n}
$$

Since $\sum_{n=1}^{\infty} r^{2n} = \frac{r^2}{1-r^2}$ converges, the M-test applies with $M_n = r^{2n}$.

Therefore, the series converges uniformly on $[0, r]$ for any $r < 1$, but not on $[0, 1]$.

**Example 3.14:** For what values of $p$ does $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^p}$ converge uniformly on $\mathbb{R}$?

**Solution:** For all $x \in \mathbb{R}$:
$$
\left|\frac{\sin(nx)}{n^p}\right| \leq \frac{1}{n^p}
$$

The series $\sum_{n=1}^{\infty} \frac{1}{n^p}$ converges if and only if $p > 1$ (p-series test).

By the Weierstrass M-test, $\sum_{n=1}^{\infty} \frac{\sin(nx)}{n^p}$ converges uniformly on $\mathbb{R}$ for all $p > 1$.

For $p \leq 1$, the M-test does not apply. In fact:
- For $p < 1$, the series diverges for some values of $x$ (e.g., by Dirichlet's test analysis)
- For $p = 1$, the series converges pointwise but not uniformly (this requires Dirichlet's test to show convergence)

**Example 3.15:** Show that $f(x) = \sum_{n=1}^{\infty} \frac{e^{-nx}}{n}$ is continuous on $(0, \infty)$.

**Solution:** Let $a > 0$ and consider $[a, \infty)$. For $x \geq a$:
$$
\frac{e^{-nx}}{n} \leq \frac{e^{-na}}{n}
$$

The series $\sum_{n=1}^{\infty} \frac{e^{-na}}{n}$ converges (it's a geometric series multiplied by $1/n$, which can be shown to converge using the ratio test or comparison).

By the Weierstrass M-test, the series converges uniformly on $[a, \infty)$ for any $a > 0$.

Each term $\frac{e^{-nx}}{n}$ is continuous, so by Theorem 2.10, the sum $f$ is continuous on $[a, \infty)$.

Since this holds for any $a > 0$, $f$ is continuous on $(0, \infty)$.

## Limitations of the M-Test

**Example 3.16:** The series $\sum_{n=1}^{\infty} \frac{(-1)^n x}{n(1 + nx^2)}$ converges uniformly on $\mathbb{R}$, but the M-test does not apply.

To see that the M-test fails, note that:
$$
\sup_{x \in \mathbb{R}} \left|\frac{x}{n(1 + nx^2)}\right|
$$

Taking the derivative with respect to $x$ and setting it to zero, we find the maximum occurs at $x^2 = \frac{1}{n}$, giving:
$$
\sup_{x \in \mathbb{R}} \frac{x}{n(1 + nx^2)} = \frac{1}{2n^{3/2}}
$$

So $M_n = \frac{1}{2n^{3/2}}$, and $\sum M_n$ converges. However, we need to account for the alternating signs more carefully.

Actually, this can be handled by the M-test after all! The uniform convergence can be established using more sophisticated techniques like Dirichlet's test for uniform convergence.

**Better Example 3.17:** Consider $\sum_{n=1}^{\infty} \frac{(-1)^n}{n + x}$ on $[1, \infty)$.

For each fixed $x \geq 1$, this converges by the alternating series test. However:
$$
\left|\frac{1}{n+x}\right| \geq \frac{1}{n+n} = \frac{1}{2n}
$$

So we cannot find $M_n$ with $\sum M_n < \infty$ that bound all terms. The M-test does not apply.

Nevertheless, the series does converge uniformly on $[a, \infty)$ for any $a > 0$ (this can be shown using Abel's test).

## Summary

The Weierstrass M-test is a cornerstone result in the theory of function series. Its key features are:

1. **Statement**: If $|f_n(x)| \leq M_n$ for all $x \in D$ and $\sum M_n < \infty$, then $\sum f_n$ converges uniformly on $D$

2. **Power**: Provides an easy-to-verify sufficient condition for uniform convergence without knowing the limit function

3. **Applications**:
   - Power series converge uniformly on compact subsets of their interval of convergence
   - Trigonometric series with sufficient decay
   - Many series arising in differential equations and Fourier analysis

4. **Limitations**: Only sufficient, not necessary; some uniformly convergent series don't satisfy the M-test

5. **Technique**: Bound each term uniformly (independent of $x$) and check if bounds are summable

The M-test converts a problem about functions (uniform convergence) into a problem about numbers (convergence of $\sum M_n$), which is usually much easier to verify. Combined with the preservation of continuity under uniform convergence (Theorem 2.10), this provides a powerful tool for constructing and analyzing continuous functions as series.

In practice, when faced with a series of functions, the M-test should be the first tool you try. If it applies, you immediately get uniform convergence and can proceed to study properties like continuity, integration, and differentiation. If it doesn't apply, you may need more sophisticated tools like Abel's test or Dirichlet's test, or you may need to restrict attention to smaller domains.
