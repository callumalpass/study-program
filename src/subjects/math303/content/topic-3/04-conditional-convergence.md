---
title: "Conditional Convergence and Its Properties"
slug: "conditional-convergence"
description: "Understanding conditionally convergent series and their fundamental properties"
---

# Conditional Convergence and Its Properties

## Introduction to Conditional Convergence

In our study of infinite series, we have encountered two fundamentally different types of convergent behavior. A series $\sum_{n=1}^{\infty} a_n$ converges **absolutely** if the series of absolute values $\sum_{n=1}^{\infty} |a_n|$ also converges. However, many important series converge without their absolute values converging—these are called **conditionally convergent** series. Understanding this distinction is crucial for working rigorously with infinite series in analysis.

**Definition (Conditional Convergence):** A series $\sum_{n=1}^{\infty} a_n$ is said to **converge conditionally** if:
1. The series $\sum_{n=1}^{\infty} a_n$ converges, and
2. The series $\sum_{n=1}^{\infty} |a_n|$ diverges.

In other words, conditional convergence occurs when a series converges only because of the cancellation between positive and negative terms, not because the terms become small fast enough to guarantee absolute convergence.

## The Alternating Harmonic Series: A Paradigmatic Example

The most important example of conditional convergence is the **alternating harmonic series**:

$$
\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \frac{1}{5} - \frac{1}{6} + \cdots
$$

**Claim:** This series converges conditionally to $\ln 2$.

**Proof of Convergence:** By the Alternating Series Test (Leibniz test), a series $\sum (-1)^{n+1} b_n$ converges if:
- The terms $b_n$ are positive
- The sequence $(b_n)$ is decreasing
- $\lim_{n \to \infty} b_n = 0$

For $b_n = 1/n$, all three conditions hold, so the alternating harmonic series converges.

**Proof of Conditional Convergence:** The series of absolute values is $\sum_{n=1}^{\infty} \frac{1}{n}$, the harmonic series, which diverges. Hence the convergence is conditional.

**The Sum Equals $\ln 2$:** This remarkable fact follows from the Taylor series expansion of $\ln(1+x)$ evaluated at $x = 1$, which requires careful justification using uniform convergence (covered in Topic 7). We have:
$$
\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots
$$
Setting $x = 1$ gives $\ln 2 = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots$.

## Characterization via Positive and Negative Parts

For any series $\sum a_n$, we can decompose the terms into positive and negative parts:

**Definition:** The **positive part** and **negative part** of $a_n$ are:
$$
a_n^+ = \max(a_n, 0) = \frac{a_n + |a_n|}{2}, \quad a_n^- = \max(-a_n, 0) = \frac{|a_n| - a_n}{2}
$$

Note that $a_n^+ \geq 0$, $a_n^- \geq 0$, and $a_n = a_n^+ - a_n^-$, $|a_n| = a_n^+ + a_n^-$.

**Theorem (Characterization of Conditional Convergence):** A series $\sum a_n$ converges conditionally if and only if:
1. $\sum a_n$ converges
2. $\sum a_n^+ = +\infty$
3. $\sum a_n^- = +\infty$

**Proof:** If $\sum a_n$ converges absolutely, then both $\sum a_n^+$ and $\sum a_n^-$ converge (since each is bounded by $\sum |a_n|$). Conversely, if $\sum a_n$ converges conditionally, then $\sum |a_n| = \sum a_n^+ + \sum a_n^-$ diverges. But if one of $\sum a_n^+$ or $\sum a_n^-$ converged, then since $a_n = a_n^+ - a_n^-$, the convergence of $\sum a_n$ would imply convergence of the other, contradicting divergence of $\sum |a_n|$. Hence both must diverge. □

This characterization is crucial for understanding why conditionally convergent series are "fragile"—the convergence depends on a precise balance between infinitely large positive and negative sums.

## Additional Examples of Conditional Convergence

**Example 1:** The series $\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}$ converges conditionally.

*Proof:* The terms $b_n = 1/\ln n$ decrease to 0, so the Alternating Series Test applies. For absolute convergence, we note that $1/\ln n > 1/n$ for $n \geq 3$, so $\sum 1/\ln n$ diverges by comparison with the harmonic series.

**Example 2:** The series $\sum_{n=1}^{\infty} \frac{\sin n}{n}$ converges conditionally.

*Proof:* This is not obviously alternating, but it can be shown to converge using **Dirichlet's test**. The partial sums of $\sin n$ are bounded (they can be computed using the formula for geometric sums of complex exponentials), and $1/n$ decreases to 0. Hence the series converges.

For absolute convergence, note that $|\sin n| \geq \sin^2 n = (1 - \cos 2n)/2$. Since $\sum 1/(2n) = \infty$ and $\sum \cos(2n)/n$ converges by Dirichlet's test, we get $\sum |\sin n|/n = \infty$.

**Example 3:** The series $\sum_{n=1}^{\infty} \frac{(-1)^n \ln n}{n}$ converges conditionally.

*Proof:* The terms $b_n = \ln n / n$ eventually decrease (for $n \geq 3$) and approach 0 as $n \to \infty$ (by L'Hôpital's rule). The Alternating Series Test applies. The series of absolute values diverges since $\ln n / n > 1/(n)$ for large $n$ would suggest convergence, but more carefully, $\sum \ln n / n$ diverges by the integral test:
$$
\int_2^{\infty} \frac{\ln x}{x} dx = \frac{(\ln x)^2}{2} \Big|_2^{\infty} = \infty
$$

## Non-Example: Not Every Convergent Series with Alternating Signs is Conditionally Convergent

**Example 4:** Consider $\sum_{n=1}^{\infty} \frac{(-1)^n}{n^2}$.

This series converges by the Alternating Series Test, but the series of absolute values $\sum 1/n^2$ also converges (it's a $p$-series with $p = 2 > 1$). Hence this series converges **absolutely**, not conditionally.

**Key Insight:** The alternating signs help convergence, but if the terms decrease fast enough, the series would converge absolutely regardless of signs. Conditional convergence specifically captures the case where cancellation is essential.

## The Fragility of Conditional Convergence

Conditionally convergent series exhibit a remarkable fragility that absolutely convergent series do not share:

**Observation 1 (Sensitivity to Grouping):** While grouping consecutive terms of a convergent series preserves convergence, the way we group terms can reveal the delicate balance in conditional convergence.

For the alternating harmonic series:
$$
(1 - \frac{1}{2}) + (\frac{1}{3} - \frac{1}{4}) + \cdots = \sum_{n=1}^{\infty} \frac{1}{2n(2n-1)}
$$

This grouped series also converges (by comparison with $\sum 1/n^2$), demonstrating that grouping preserves convergence.

**Observation 2 (Sensitivity to Rearrangement):** Unlike absolutely convergent series, conditionally convergent series can have their sums completely changed—or made to diverge—by rearranging terms. This is the content of the Riemann Rearrangement Theorem, discussed in the next section.

## Connection to Analysis and Applications

Conditional convergence appears throughout analysis:

1. **Fourier Series:** Many Fourier series converge conditionally at points of discontinuity, making the order of summation crucial.

2. **Analytic Number Theory:** Series like $\sum (-1)^n/n$ and related Dirichlet series exhibit conditional convergence with deep connections to the distribution of prime numbers.

3. **Probability Theory:** Conditional convergence affects the calculation of expected values for random variables that can take both positive and negative values.

## Key Takeaways

- **Conditional convergence** means a series converges, but the series of absolute values diverges.
- The alternating harmonic series $\sum (-1)^{n+1}/n$ is the archetypal example, converging to $\ln 2$.
- Conditionally convergent series have both $\sum a_n^+ = \infty$ and $\sum a_n^- = \infty$—convergence depends on cancellation.
- Conditional convergence is "fragile" compared to absolute convergence: rearrangement can change the sum.
- Common tests (Alternating Series Test, Dirichlet's Test) help identify conditionally convergent series.

## Common Mistakes to Avoid

1. **Assuming alternating series are conditionally convergent:** Many alternating series converge absolutely (e.g., $\sum (-1)^n/n^2$).

2. **Forgetting to check absolute convergence:** When applying the Alternating Series Test, always separately check whether $\sum |a_n|$ converges.

3. **Treating conditional and absolute convergence identically:** Operations valid for absolutely convergent series (like rearrangement) may fail for conditionally convergent ones.
