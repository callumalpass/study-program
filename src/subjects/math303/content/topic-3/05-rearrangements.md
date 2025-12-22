---
title: "Rearrangements of Series"
slug: "rearrangements"
description: "Riemann's Rearrangement Theorem and the behavior of rearranged series"
---

# Rearrangements of Series

## Introduction

One of the most striking results in real analysis reveals a fundamental difference between absolutely and conditionally convergent series: while absolutely convergent series are immune to rearrangement, conditionally convergent series can be rearranged to converge to any value whatsoever—or to diverge. This phenomenon, formalized by Riemann in 1854, demonstrates the delicate nature of infinite summation and underscores why absolute convergence is preferred when possible.

## Formal Definition of Rearrangement

**Definition:** Given a series $\sum_{n=1}^{\infty} a_n$ and a bijection $\sigma: \mathbb{N} \to \mathbb{N}$, the series $\sum_{n=1}^{\infty} b_n$ where $b_n = a_{\sigma(n)}$ is called a **rearrangement** of the original series.

The key requirement is that $\sigma$ be a bijection—every term of the original series appears exactly once in the rearrangement, just potentially in a different position.

**Example:** The series $1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots$ can be rearranged as:
$$
1 + \frac{1}{3} - \frac{1}{2} + \frac{1}{5} + \frac{1}{7} - \frac{1}{4} + \cdots
$$
(taking two positive terms, then one negative, repeating).

## Absolutely Convergent Series are Rearrangement-Invariant

**Theorem (Rearrangement Invariance for Absolute Convergence):** If $\sum_{n=1}^{\infty} a_n$ converges absolutely to $S$, then every rearrangement $\sum_{n=1}^{\infty} a_{\sigma(n)}$ also converges absolutely to the same sum $S$.

**Proof:** Let $\epsilon > 0$ be given. Since $\sum |a_n|$ converges, we can choose $N$ large enough that:
$$
\sum_{n=N+1}^{\infty} |a_n| < \frac{\epsilon}{2}
$$

Since $\sigma$ is a bijection, there exists $M$ such that $\{1, 2, \ldots, N\} \subseteq \{\sigma(1), \sigma(2), \ldots, \sigma(M)\}$. That is, all the "important" first $N$ terms appear among the first $M$ terms of the rearrangement.

For any $m \geq M$, the partial sum $\sum_{k=1}^{m} a_{\sigma(k)}$ contains all terms $a_1, \ldots, a_N$, plus possibly some terms $a_j$ with $j > N$. Therefore:
$$
\left|\sum_{k=1}^{m} a_{\sigma(k)} - \sum_{k=1}^{N} a_k\right| \leq \sum_{j > N} |a_j| < \frac{\epsilon}{2}
$$

Since $\sum_{k=1}^{N} a_k \to S$ as $N \to \infty$, we can also ensure $|S_N - S| < \epsilon/2$ for large $N$. Combining:
$$
\left|\sum_{k=1}^{m} a_{\sigma(k)} - S\right| < \epsilon
$$

Hence the rearrangement converges to $S$. □

**Intuition:** For absolutely convergent series, the terms become so small so fast that we can "afford" to delay any finite collection of terms—their eventual contribution doesn't affect the sum.

## The Riemann Rearrangement Theorem

The situation is dramatically different for conditionally convergent series.

**Theorem (Riemann, 1854):** If $\sum_{n=1}^{\infty} a_n$ converges conditionally, then for any $L \in \mathbb{R} \cup \{-\infty, +\infty\}$, there exists a rearrangement of the series that converges to $L$ (or diverges to $\pm\infty$).

This remarkable theorem says that a conditionally convergent series can be rearranged to sum to literally any desired real number, or to diverge.

**Proof for the Case $L \in \mathbb{R}$:**

Let $p_1, p_2, p_3, \ldots$ denote the positive terms of $(a_n)$ in their original order, and let $n_1, n_2, n_3, \ldots$ denote the negative terms (in absolute value) in their original order.

Since $\sum a_n$ converges conditionally:
- $\sum p_k = +\infty$ (the positive terms diverge)
- $\sum |n_k| = +\infty$ (the negative terms diverge in absolute value)
- $p_k \to 0$ and $n_k \to 0$ as $k \to \infty$

**Algorithm to construct a rearrangement converging to $L$:**

1. Add positive terms $p_1, p_2, \ldots$ until the partial sum first exceeds $L$.
2. Add negative terms $n_1, n_2, \ldots$ until the partial sum first drops below $L$.
3. Add more positive terms until the sum exceeds $L$ again.
4. Add more negative terms until the sum drops below $L$ again.
5. Repeat indefinitely.

This process is well-defined because:
- We can always exceed $L$ (since $\sum p_k = +\infty$)
- We can always drop below $L$ (since $\sum |n_k| = +\infty$)
- Every term of the original series is eventually used (by the greedy nature of the algorithm)

**Why does this converge to $L$?** After the $k$-th switch from adding positives to adding negatives (or vice versa), the partial sum is within $\max(p_{j_k}, |n_{i_k}|)$ of $L$, where $j_k$ and $i_k$ are the indices of the last positive and negative terms added. Since both $p_k \to 0$ and $n_k \to 0$, these "overshoots" shrink to zero, and the partial sums converge to $L$. □

**Proof Sketch for $L = +\infty$:**

Arrange to add many positive terms before each negative term, ensuring the partial sums grow without bound. For instance, add positive terms until the sum exceeds 1, then one negative term, then positives until the sum exceeds 2, then one negative, and so on.

## Explicit Examples of Rearrangements

**Example 1: Rearranging $\sum (-1)^{n+1}/n$ to sum to $\frac{3\ln 2}{2}$.**

The original sum is $\ln 2 \approx 0.693$. To increase the sum, take more positive terms before each negative term.

Using the pattern: two positive terms, one negative term, we get:
$$
1 + \frac{1}{3} - \frac{1}{2} + \frac{1}{5} + \frac{1}{7} - \frac{1}{4} + \frac{1}{9} + \frac{1}{11} - \frac{1}{6} + \cdots
$$

It can be shown (though the proof is technical) that this rearrangement converges to $\frac{3\ln 2}{2} \approx 1.04$.

**Example 2: Rearranging to diverge to $+\infty$.**

To make $\sum (-1)^{n+1}/n$ diverge to $+\infty$:
$$
1 + \frac{1}{3} + \frac{1}{5} + \frac{1}{7} - \frac{1}{2} + \frac{1}{9} + \frac{1}{11} + \frac{1}{13} + \frac{1}{15} - \frac{1}{4} + \cdots
$$

Add enough positive terms to ensure the partial sums eventually exceed any given bound, despite the occasional negative terms.

**Example 3: Rearranging to converge to 0.**

Take one positive, one negative, one positive, one negative, balancing so the partial sums oscillate around 0 with decreasing amplitude.

## Steinitz's Theorem: The Complete Picture

**Theorem (Steinitz):** The set of all possible sums of rearrangements of a series $\sum a_n$ is:

1. $\{S\}$ if $\sum a_n$ converges absolutely to $S$
2. $\mathbb{R}$ if $\sum a_n$ converges conditionally
3. $\emptyset$ if the terms don't approach 0 (no rearrangement converges)
4. $\{+\infty\}$, $\{-\infty\}$, or $\{+\infty, -\infty\}$ in degenerate cases

For conditionally convergent series, every real number is achievable—plus divergence to $\pm\infty$.

## Why Rearrangement Matters

**Application to Fourier Series:** In Fourier analysis, the order of summation can matter dramatically. Conditionally convergent Fourier series at points of discontinuity may give different values if summed in different orders.

**Application to Numerical Computation:** When computing infinite sums numerically, conditionally convergent series require careful handling. Summing in a careless order can give incorrect results.

**Philosophical Significance:** The Riemann Rearrangement Theorem challenges naive intuitions about infinite sums. Unlike finite sums, which are commutative, infinite sums can depend critically on the order of terms.

## Key Takeaways

- A **rearrangement** reorders terms via a bijection—every term appears exactly once.
- **Absolutely convergent** series are rearrangement-invariant: any rearrangement converges to the same sum.
- **Conditionally convergent** series can be rearranged to converge to any real number, or to diverge (Riemann's theorem).
- The algorithm for Riemann's theorem alternates between adding positive and negative terms to approach any target.
- Steinitz's theorem completely characterizes the possible sums of all rearrangements.

## Common Mistakes to Avoid

1. **Assuming rearrangement doesn't matter:** For conditionally convergent series, it absolutely does!

2. **Confusing rearrangement with grouping:** Grouping preserves convergence but doesn't change the order of individual terms. Rearrangement changes the order.

3. **Applying absolute convergence results to conditional series:** Operations valid for absolute convergence (rearrangement, multiplication of series) may fail for conditional convergence.

4. **Forgetting that $a_n \to 0$ is necessary but not sufficient:** Even though terms approach zero in a conditionally convergent series, rearrangement can still change the sum because both the positive and negative subseries diverge.
