---
title: "Rearrangements of Series"
slug: "rearrangements"
description: "Detailed study of rearrangements and Riemann's theorem"
---

# Rearrangements of Series

## Formal Definition

**Definition:** Given a series $\sum_{n=1}^{\infty} a_n$ and a bijection $\sigma: \mathbb{N} \to \mathbb{N}$, the series $\sum_{n=1}^{\infty} b_n$ where $b_n = a_{\sigma(n)}$ is called a **rearrangement** of the original series.

## Absolutely Convergent Series are Rearrangement-Invariant

**Theorem 5.1 (Rearrangement Theorem for Absolute Convergence):** If $\sum a_n$ converges absolutely to $S$, then every rearrangement also converges absolutely to $S$.

**Proof:** (Already outlined in previous section; key idea is that tail sums $\sum_{n>N} |a_n|$ can be made arbitrarily small, and finite rearrangements don't affect limits.)

## Riemann's Rearrangement Theorem

**Theorem 5.2 (Riemann, 1854):** If $\sum a_n$ converges conditionally, then:

1. For any $L \in \mathbb{R}$, there exists a rearrangement converging to $L$
2. There exists a rearrangement diverging to $+\infty$
3. There exists a rearrangement diverging to $-\infty$
4. There exists a rearrangement that diverges (oscillates)

**Proof of (1):** Let $p_1, p_2, \ldots$ be the positive terms and $n_1, n_2, \ldots$ the negative terms (preserving order).

Since $\sum a_n$ converges conditionally:
- $\sum p_k = +\infty$ and $\sum n_k = -\infty$
- But $p_k \to 0$ and $n_k \to 0$

Algorithm to rearrange to sum to $L$:
1. Add positive terms $p_1, p_2, \ldots$ until partial sum $\geq L$
2. Add negative terms $n_1, n_2, \ldots$ until partial sum $< L$
3. Add positive terms until $\geq L$ again
4. Repeat

Since $p_k, n_k \to 0$, the "overshoots" shrink, and the partial sums converge to $L$.

**Example:** Rearrange $1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots$ to sum to 0:

Take equal numbers of positive and negative terms in a pattern that balances out.

## Explicit Constructions

**Example 1:** To make $\sum \frac{(-1)^{n+1}}{n}$ diverge to $+\infty$:

$$
1 + \frac{1}{3} + \frac{1}{5} + \frac{1}{7} + \cdots - \frac{1}{2} + \frac{1}{9} + \frac{1}{11} + \cdots - \frac{1}{4} + \cdots
$$

Add many positive terms before each negative, choosing the number to ensure divergence.

**Example 2:** To converge to $\pi$:

Use the algorithm in Riemann's theorem, adding positives until sum $\geq \pi$, then negatives until $< \pi$, etc.

## Double Series and Rearrangements

For double series $\sum_{m,n} a_{m,n}$, summation order matters unless absolute convergence holds.

**Example 3:**
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{(-1)^{m+n}}{mn}
$$

Different summation orders can give different results if not absolutely convergent.

## Steinitz's Theorem

**Theorem 5.3 (Steinitz):** The set of possible sums of rearrangements of $\sum a_n$ is:
- $\{S\}$ if $\sum a_n$ converges absolutely to $S$
- $\mathbb{R} \cup \{-\infty, +\infty\}$ if $\sum a_n$ converges conditionally
- $\{-\infty, +\infty\}$ if $\sum a_n$ diverges but $\sum a_n^+$ and $\sum a_n^-$ both diverge
- $\{\pm\infty\}$ or $\emptyset$ in other cases

## Applications

**Application 1:** This theorem shows why we must be careful in manipulating infinite series, especially in Fourier analysis.

**Application 2:** In probability, conditional convergence of series affects summation of expectations.

## Exercises

1. Rearrange $\sum \frac{(-1)^{n+1}}{n}$ to sum to $-5$.

2. Prove that if $\sum a_n$ diverges to $+\infty$, every rearrangement also diverges to $+\infty$.

3. Show that no rearrangement of $\sum \frac{1}{n}$ converges.

4. Construct a rearrangement of $\sum \frac{(-1)^n}{\sqrt{n}}$ that oscillates.

## Conclusion

Rearrangements reveal fundamental differences between absolute and conditional convergence. Riemann's theorem demonstrates that conditionally convergent series are extremely fragile: their sums depend entirely on the ordering. This motivates the preference for absolute convergence in analysis and the careful treatment of series in applications.
