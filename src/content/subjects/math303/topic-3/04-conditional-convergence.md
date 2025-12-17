---
title: "Conditional Convergence and Rearrangements"
slug: "conditional-convergence"
description: "Riemann Rearrangement Theorem and properties of conditionally convergent series"
---

# Conditional Convergence and Rearrangements

## Rearrangements of Series

**Definition:** A **rearrangement** of a series $\sum_{n=1}^{\infty} a_n$ is a series $\sum_{n=1}^{\infty} a_{\sigma(n)}$ where $\sigma: \mathbb{N} \to \mathbb{N}$ is a bijection.

**Example 1:** The series $\sum_{n=1}^{\infty} \frac{1}{n^2}$ can be rearranged as:
$$
\frac{1}{1^2} + \frac{1}{3^2} + \frac{1}{2^2} + \frac{1}{5^2} + \frac{1}{4^2} + \cdots
$$

## Absolutely Convergent Series

**Theorem 4.1:** If $\sum a_n$ converges absolutely, then every rearrangement converges to the same sum.

**Proof:** Let $\sum a_{\sigma(n)}$ be a rearrangement and $S = \sum a_n$. Let $\epsilon > 0$.

Since $\sum |a_n|$ converges, choose $N$ such that $\sum_{n=N+1}^{\infty} |a_n| < \epsilon/2$.

Choose $M$ large enough that $\{1, 2, \ldots, N\} \subseteq \{\sigma(1), \ldots, \sigma(M)\}$.

For $m \geq M$, the partial sum $\sum_{k=1}^{m} a_{\sigma(k)}$ differs from $\sum_{k=1}^{N} a_k$ by at most terms with indices $> N$, so:
$$
\left|\sum_{k=1}^{m} a_{\sigma(k)} - S\right| < \epsilon
$$

## Riemann Rearrangement Theorem

**Theorem 4.2 (Riemann Rearrangement Theorem):** If $\sum a_n$ converges conditionally, then for any $L \in \mathbb{R} \cup \{\pm\infty\}$, there exists a rearrangement that converges to (or diverges to) $L$.

**Proof sketch:** Since $\sum a_n$ converges conditionally, both $\sum a_n^+$ and $\sum a_n^-$ diverge to $\infty$.

To rearrange to converge to $L$:
- Add positive terms until the partial sum exceeds $L$
- Add negative terms until it drops below $L$
- Repeat

Since $a_n \to 0$, the oscillations shrink, and the series converges to $L$.

**Example 2:** Consider $\sum \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots = \ln 2$.

Rearrange to get $\frac{3\ln 2}{2}$:
$$
1 + \frac{1}{3} - \frac{1}{2} + \frac{1}{5} + \frac{1}{7} - \frac{1}{4} + \cdots
$$

(Take two positive, one negative, repeating.)

The partial sums can be analyzed to show convergence to $\frac{3\ln 2}{2}$.

## Examples of Conditional Convergence

**Example 3:** $\sum \frac{(-1)^n}{n}$ converges conditionally.

**Example 4:** $\sum \frac{\sin n}{n}$ converges conditionally (by Dirichlet's test).

**Example 5:** $\sum \frac{(-1)^n \ln n}{n}$ converges conditionally.

## Grouping Terms

**Theorem 4.3:** If $\sum a_n$ converges absolutely, then grouping terms (without changing order) doesn't affect convergence or the sum.

For conditional convergence, grouping can change behavior!

**Example 6:** $\sum \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots$

Group as: $(1 - \frac{1}{2}) + (\frac{1}{3} - \frac{1}{4}) + \cdots = \sum \frac{1}{2n(2n-1)}$, which still converges (but the proof requires care).

But grouping incorrectly can yield divergence in pathological cases.

## The Alternating Harmonic Series

**Theorem 4.4:** The series $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}$ converges to $\ln 2$.

**Proof:** Uses the Taylor series for $\ln(1+x)$ evaluated at $x=1$. This requires uniform convergence results we'll develop later.

## Exercises

1. Construct a rearrangement of $\sum \frac{(-1)^{n+1}}{n}$ that diverges to $\infty$.

2. Prove that if $\sum a_n$ converges absolutely to $S$ and $\sum b_n$ is a rearrangement, then $\sum b_n = S$.

3. Show that $\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}$ converges conditionally.

4. Can a rearrangement of a divergent series converge? Provide an example or prove impossibility.

5. Investigate $\sum ((-1)^n + \frac{1}{n^2})$: does it converge absolutely, conditionally, or diverge?

## Conclusion

Conditional convergence reveals the delicate nature of infinite summation. Unlike absolutely convergent series, conditionally convergent series depend critically on the order of terms. The Riemann Rearrangement Theorem shows that conditional convergence is fragile: rearrangement can produce any desired sum. This underscores the importance of absolute convergence in analysis.
