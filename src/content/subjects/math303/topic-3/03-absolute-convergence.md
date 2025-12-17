---
title: "Absolute Convergence"
slug: "absolute-convergence"
description: "Absolutely convergent series and rearrangements"
---

# Absolute Convergence

## Definition

**Definition:** A series $\sum a_n$ **converges absolutely** if $\sum |a_n|$ converges.

**Example 1:** The series $\sum \frac{(-1)^n}{n^2}$ converges absolutely because:
$$
\sum \left|\frac{(-1)^n}{n^2}\right| = \sum \frac{1}{n^2}
$$
converges (p-series with $p = 2 > 1$).

**Example 2:** The alternating harmonic series $\sum \frac{(-1)^n}{n}$ converges (by the alternating series test) but does not converge absolutely, since $\sum \frac{1}{n}$ diverges.

## Absolute Convergence Implies Convergence

**Theorem 3.1:** If $\sum a_n$ converges absolutely, then $\sum a_n$ converges.

**Proof:** Suppose $\sum |a_n|$ converges. We use the Cauchy criterion.

Let $\epsilon > 0$. Since $\sum |a_n|$ converges, there exists $N$ such that for $m > n \geq N$:
$$
\sum_{k=n+1}^{m} |a_k| < \epsilon
$$

By the triangle inequality:
$$
\left|\sum_{k=n+1}^{m} a_k\right| \leq \sum_{k=n+1}^{m} |a_k| < \epsilon
$$

Thus, $\sum a_n$ satisfies the Cauchy criterion and converges.

**Remark:** The converse is false, as shown by the alternating harmonic series.

## Conditional Convergence

**Definition:** A series $\sum a_n$ **converges conditionally** if it converges but does not converge absolutely.

**Example 3:** $\sum \frac{(-1)^n}{n}$ converges conditionally.

**Example 4:** $\sum \frac{(-1)^n}{\sqrt{n}}$ converges conditionally (alternating series test, but $\sum \frac{1}{\sqrt{n}}$ diverges).

## Tests for Absolute Convergence

All the tests for positive series (comparison, ratio, root, integral) can be applied to $\sum |a_n|$ to test for absolute convergence.

**Example 5:** Test $\sum \frac{(-1)^n n}{2^n}$ for absolute convergence.

**Solution:** Consider $\sum \frac{n}{2^n}$. Using the ratio test:
$$
\frac{a_{n+1}}{a_n} = \frac{(n+1)/2^{n+1}}{n/2^n} = \frac{n+1}{2n} \to \frac{1}{2} < 1
$$

So $\sum \frac{n}{2^n}$ converges, hence $\sum \frac{(-1)^n n}{2^n}$ converges absolutely.

**Example 6:** Test $\sum \frac{\sin n}{n^2}$ for absolute convergence.

**Solution:** Since $|\sin n| \leq 1$:
$$
\left|\frac{\sin n}{n^2}\right| \leq \frac{1}{n^2}
$$

Since $\sum \frac{1}{n^2}$ converges, by comparison, $\sum \left|\frac{\sin n}{n^2}\right|$ converges.

## Algebra of Absolutely Convergent Series

**Theorem 3.2:** If $\sum a_n$ and $\sum b_n$ converge absolutely, then:
1. $\sum (a_n + b_n)$ converges absolutely
2. $\sum (c a_n)$ converges absolutely for any $c \in \mathbb{R}$

**Proof:** (1) We have:
$$
|a_n + b_n| \leq |a_n| + |b_n|
$$

Since $\sum (|a_n| + |b_n|) = \sum |a_n| + \sum |b_n|$ converges, by comparison, $\sum |a_n + b_n|$ converges.

## Cauchy Product of Absolutely Convergent Series

**Definition:** Given two series $\sum a_n$ and $\sum b_n$, their **Cauchy product** is:
$$
\sum_{n=0}^{\infty} c_n \quad \text{where} \quad c_n = \sum_{k=0}^{n} a_k b_{n-k}
$$

**Theorem 3.3 (Mertens' Theorem):** If $\sum a_n$ converges absolutely to $A$ and $\sum b_n$ converges to $B$, then the Cauchy product converges to $AB$.

**Theorem 3.4 (Stronger version):** If both $\sum a_n$ and $\sum b_n$ converge absolutely, then their Cauchy product converges absolutely to $AB$.

**Example 7:** Consider $\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}$ for $|x| < 1$. The Cauchy product of this series with itself is:
$$
c_n = \sum_{k=0}^{n} x^k x^{n-k} = (n+1)x^n
$$

So:
$$
\sum_{n=0}^{\infty} c_n = \sum_{n=0}^{\infty} (n+1)x^n = \frac{1}{(1-x)^2}
$$

This matches the expected product $\frac{1}{1-x} \cdot \frac{1}{1-x}$.

## Comparison with Conditional Convergence

Conditionally convergent series have unusual properties:

1. They can be rearranged to converge to any value (Riemann Rearrangement Theorem)
2. The Cauchy product may diverge even if both series converge

**Example 8 (Cauchy product failing):** Consider $\sum \frac{(-1)^n}{\sqrt{n+1}}$, which converges conditionally. Its Cauchy product with itself may diverge.

## The Series $\sum |a_n|$ vs $\sum a_n$

**Theorem 3.5:** For a series $\sum a_n$:
$$
\left|\sum_{n=1}^{\infty} a_n\right| \leq \sum_{n=1}^{\infty} |a_n|
$$

provided both sides make sense.

**Proof:** We have $\left|\sum_{k=1}^{n} a_k\right| \leq \sum_{k=1}^{n} |a_k|$ by repeated triangle inequality. Taking $n \to \infty$ preserves the inequality.

## Decomposition into Positive and Negative Parts

**Definition:** For a series $\sum a_n$, define:
$$
a_n^+ = \max\{a_n, 0\} = \frac{|a_n| + a_n}{2}
$$
$$
a_n^- = \max\{-a_n, 0\} = \frac{|a_n| - a_n}{2}
$$

Then $a_n = a_n^+ - a_n^-$ and $|a_n| = a_n^+ + a_n^-$.

**Theorem 3.6:** A series $\sum a_n$ converges absolutely if and only if both $\sum a_n^+$ and $\sum a_n^-$ converge.

**Proof:** $(\Rightarrow)$ If $\sum |a_n|$ converges, then since $0 \leq a_n^{\pm} \leq |a_n|$, by comparison, $\sum a_n^{\pm}$ converge.

$(\Leftarrow)$ If $\sum a_n^{\pm}$ converge, then $\sum |a_n| = \sum (a_n^+ + a_n^-)$ converges.

**Theorem 3.7:** If $\sum a_n$ converges conditionally, then both $\sum a_n^+$ and $\sum a_n^-$ diverge to $\infty$.

**Proof:** If one converged, the other would have to as well (since $\sum a_n = \sum a_n^+ - \sum a_n^-$ converges), contradicting that $\sum |a_n| = \sum a_n^+ + \sum a_n^-$ diverges.

## Examples and Applications

**Example 9:** Does $\sum_{n=1}^{\infty} \frac{(-1)^n n}{n^2 + 1}$ converge absolutely?

**Solution:** Consider:
$$
\sum \left|\frac{(-1)^n n}{n^2 + 1}\right| = \sum \frac{n}{n^2 + 1}
$$

By limit comparison with $\sum \frac{1}{n}$:
$$
\lim_{n \to \infty} \frac{n/(n^2+1)}{1/n} = \lim_{n \to \infty} \frac{n^2}{n^2+1} = 1
$$

Since $\sum \frac{1}{n}$ diverges, so does $\sum \frac{n}{n^2+1}$. The series does not converge absolutely.

Does it converge conditionally? Check: $\frac{n}{n^2+1} \to 0$ but is not eventually decreasing (it increases to a maximum then decreases). Further analysis needed.

**Example 10:** Show that $\sum_{n=1}^{\infty} \frac{\cos(n)}{n^2}$ converges absolutely.

**Solution:**
$$
\left|\frac{\cos(n)}{n^2}\right| \leq \frac{1}{n^2}
$$

Since $\sum \frac{1}{n^2}$ converges, by comparison, the series converges absolutely.

## Absolute Convergence in Function Spaces

Absolute convergence extends to sequences of functions: $\sum f_n$ converges absolutely if $\sum \|f_n\|$ converges in an appropriate norm.

This leads to important results in functional analysis and Fourier series.

## Exercises

1. Determine if $\sum \frac{(-1)^n n^2}{n^3 + 1}$ converges absolutely, conditionally, or diverges.

2. Show that if $\sum a_n$ converges absolutely, then $\sum a_n^2$ converges.

3. Prove that if $\sum a_n$ converges absolutely and $(b_n)$ is bounded, then $\sum a_n b_n$ converges absolutely.

4. Give an example where $\sum a_n$ and $\sum b_n$ both converge conditionally, but $\sum (a_n + b_n)$ converges absolutely.

5. Show that $\sum \frac{(-1)^n}{n}$ converges but $\sum \left(\frac{(-1)^n}{n}\right)^2$ converges absolutely.

## Conclusion

Absolute convergence is a stronger condition than convergence, guaranteeing better algebraic properties. Absolutely convergent series can be rearranged freely, multiplied via Cauchy products, and combined algebraically. Conditional convergence, while weaker, still provides convergence but with pathological rearrangement behavior (as we'll see in the next section).
