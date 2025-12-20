---
title: "Limit Superior and Limit Inferior"
slug: "limsup-liminf"
description: "Upper and lower limits of sequences"
---

# Limit Superior and Limit Inferior

## Motivation

Not all sequences converge, but we can still extract useful information about their long-term behavior using $\limsup$ and $\liminf$.

**Example:** For $a_n = (-1)^n(1 + \frac{1}{n})$, the sequence oscillates between approximately 1 and $-1$, but the oscillations dampen. We'd like to capture that it oscillates between $-1$ and $1$ asymptotically.

## Definitions

### Via Supremum and Infimum

For a bounded sequence $(a_n)$, define:
$$
b_n = \sup\{a_k : k \geq n\} = \sup\{a_n, a_{n+1}, a_{n+2}, \ldots\}
$$
$$
c_n = \inf\{a_k : k \geq n\} = \inf\{a_n, a_{n+1}, a_{n+2}, \ldots\}
$$

The sequence $(b_n)$ is decreasing (each supremum is over a smaller set), and $(c_n)$ is increasing.

**Definition:** The **limit superior** of $(a_n)$ is:
$$
\limsup_{n \to \infty} a_n = \lim_{n \to \infty} b_n = \lim_{n \to \infty} \sup\{a_k : k \geq n\} = \inf_{n \geq 1} \sup_{k \geq n} a_k
$$

The **limit inferior** of $(a_n)$ is:
$$
\liminf_{n \to \infty} a_n = \lim_{n \to \infty} c_n = \lim_{n \to \infty} \inf\{a_k : k \geq n\} = \sup_{n \geq 1} \inf_{k \geq n} a_k
$$

**Remark:** For unbounded sequences, we extend to $\pm\infty$:
- If $(a_n)$ is unbounded above, $\limsup a_n = \infty$
- If $(a_n)$ is unbounded below, $\liminf a_n = -\infty$

### Via Subsequences

**Theorem 7.1:** For a bounded sequence $(a_n)$:
- $\limsup a_n$ is the largest limit point of $(a_n)$
- $\liminf a_n$ is the smallest limit point of $(a_n)$

More precisely:
$$
\limsup a_n = \sup\{L : \text{some subsequence } a_{n_k} \to L\}
$$
$$
\liminf a_n = \inf\{L : \text{some subsequence } a_{n_k} \to L\}
$$

## Basic Examples

### Example 1: Alternating Sequence

For $a_n = (-1)^n$:
- $b_n = \sup\{(-1)^k : k \geq n\} = 1$ for all $n$
- $c_n = \inf\{(-1)^k : k \geq n\} = -1$ for all $n$
- $\limsup a_n = 1$, $\liminf a_n = -1$

### Example 2: Damped Oscillation

For $a_n = (-1)^n(1 + \frac{1}{n})$:
- For even $n$: $b_n = 1 + \frac{1}{n+1}$ (next odd term)
- For odd $n$: $b_n = 1 + \frac{1}{n}$ (current term)
- $\limsup a_n = \lim_{n \to \infty} b_n = 1$
- Similarly, $\liminf a_n = -1$

### Example 3: Convergent Sequence

For $a_n = \frac{1}{n}$:
- $b_n = \sup\{a_k : k \geq n\} = a_n = \frac{1}{n} \to 0$
- $c_n = \inf\{a_k : k \geq n\} = 0$ for all $n$
- $\limsup a_n = \liminf a_n = 0$

## Properties

### Basic Inequalities

**Theorem 7.2:** For any bounded sequence $(a_n)$:
$$
\liminf_{n \to \infty} a_n \leq \limsup_{n \to \infty} a_n
$$

**Proof:** For all $n$:
$$
c_n = \inf_{k \geq n} a_k \leq \sup_{k \geq n} a_k = b_n
$$

Since $(c_n)$ is increasing and $(b_n)$ is decreasing, taking limits:
$$
\liminf a_n = \lim c_n \leq \lim b_n = \limsup a_n
$$

### Convergence Criterion

**Theorem 7.3:** A sequence $(a_n)$ converges to $L$ if and only if:
$$
\liminf_{n \to \infty} a_n = \limsup_{n \to \infty} a_n = L
$$

**Proof:** $(\Rightarrow)$ If $a_n \to L$, then every subsequence converges to $L$, so all limit points equal $L$. Thus, $\limsup a_n = \liminf a_n = L$.

$(\Leftarrow)$ Suppose $\limsup a_n = \liminf a_n = L$. Then $b_n \to L$ and $c_n \to L$.

Since $c_n \leq a_n \leq b_n$ for all $n$, by the squeeze theorem, $a_n \to L$.

### Negation Property

**Theorem 7.4:** For any sequence $(a_n)$:
$$
\limsup_{n \to \infty} (-a_n) = -\liminf_{n \to \infty} a_n
$$
$$
\liminf_{n \to \infty} (-a_n) = -\limsup_{n \to \infty} a_n
$$

**Proof:** We have:
$$
\sup\{-a_k : k \geq n\} = -\inf\{a_k : k \geq n\}
$$

Thus:
$$
\limsup (-a_n) = \lim_{n \to \infty} \sup_{k \geq n} (-a_k) = \lim_{n \to \infty} (-\inf_{k \geq n} a_k) = -\lim_{n \to \infty} \inf_{k \geq n} a_k = -\liminf a_n
$$

## Arithmetic Properties

**Theorem 7.5 (Subadditivity):** If $(a_n)$ and $(b_n)$ are bounded sequences:
$$
\limsup_{n \to \infty} (a_n + b_n) \leq \limsup_{n \to \infty} a_n + \limsup_{n \to \infty} b_n
$$

**Proof:** Let $\alpha = \limsup a_n$ and $\beta = \limsup b_n$. For any $k \geq n$:
$$
a_k + b_k \leq \sup_{j \geq n} a_j + \sup_{j \geq n} b_j
$$

Taking supremum over $k \geq n$:
$$
\sup_{k \geq n}(a_k + b_k) \leq \sup_{j \geq n} a_j + \sup_{j \geq n} b_j
$$

Taking $n \to \infty$:
$$
\limsup (a_n + b_n) \leq \alpha + \beta
$$

**Remark:** Equality need not hold. For $a_n = (-1)^n$ and $b_n = (-1)^{n+1}$:
$$
\limsup(a_n + b_n) = \limsup 0 = 0 < 1 + 1 = \limsup a_n + \limsup b_n
$$

**Theorem 7.6:** If $(a_n)$ and $(b_n)$ are bounded:
$$
\liminf_{n \to \infty} (a_n + b_n) \geq \liminf_{n \to \infty} a_n + \liminf_{n \to \infty} b_n
$$

### Scalar Multiplication

**Theorem 7.7:** For $c \geq 0$:
$$
\limsup_{n \to \infty} (c a_n) = c \limsup_{n \to \infty} a_n
$$

For $c < 0$:
$$
\limsup_{n \to \infty} (c a_n) = c \liminf_{n \to \infty} a_n
$$

## Applications to Series

**Theorem 7.8 (Cauchy-Hadamard Theorem):** The radius of convergence of the power series $\sum_{n=0}^{\infty} a_n x^n$ is:
$$
R = \frac{1}{\limsup_{n \to \infty} \sqrt[n]{|a_n|}}
$$

(with the convention $1/0 = \infty$ and $1/\infty = 0$).

### Example 4: Power Series

For $\sum_{n=0}^{\infty} \frac{x^n}{n!}$:
$$
\sqrt[n]{\frac{1}{n!}} = \frac{1}{(n!)^{1/n}} \to 0 \quad \text{as } n \to \infty
$$

Thus, $\limsup \sqrt[n]{|a_n|} = 0$, giving $R = \infty$. The series converges for all $x$.

### Example 5: Alternating Coefficients

For $\sum_{n=0}^{\infty} a_n x^n$ where $a_n = \begin{cases} 1 & \text{if } n \text{ even} \\ 2 & \text{if } n \text{ odd} \end{cases}$:

We have $\sqrt[n]{a_n} \to 1$ along even indices and $\sqrt[n]{2} \to 1$ along odd indices, so:
$$
\limsup \sqrt[n]{a_n} = 1 \implies R = 1
$$

## Characterization via Epsilon

**Theorem 7.9:** $L = \limsup a_n$ if and only if:
1. For every $\epsilon > 0$, $a_n < L + \epsilon$ for all but finitely many $n$
2. For every $\epsilon > 0$, $a_n > L - \epsilon$ for infinitely many $n$

**Proof:** (1) says that $L + \epsilon$ is eventually an upper bound, so $\sup_{k \geq n} a_k \leq L + \epsilon$ for large $n$, giving $\limsup a_n \leq L + \epsilon$.

(2) says that $L - \epsilon$ is not eventually an upper bound, so $\sup_{k \geq n} a_k \geq L - \epsilon$ for all $n$, giving $\limsup a_n \geq L - \epsilon$.

Since this holds for all $\epsilon > 0$, we have $\limsup a_n = L$.

## Computing Limsup and Liminf

### Example 6: Piecewise Sequence

For $a_n = \begin{cases} n & \text{if } n \text{ is a power of 2} \\ \frac{1}{n} & \text{otherwise} \end{cases}$:

The sequence is unbounded, so $\limsup a_n = \infty$.

For $\liminf$: the subsequence of non-powers of 2 converges to 0, so $\liminf a_n = 0$.

### Example 7: Nested Expression

For $a_n = \sin(n)$:
- The sequence is dense in $[-1, 1]$ (by Diophantine approximation)
- Thus, $\limsup a_n = 1$ and $\liminf a_n = -1$

### Example 8: Recursive

For $a_1 = 0$ and $a_{n+1} = \frac{1}{2}(a_n + 1)$:
- We can show $a_n \to \frac{2}{3}$ (solve $L = \frac{1}{2}(L + 1)$)
- Thus, $\limsup a_n = \liminf a_n = \frac{2}{3}$

## Extended Real Numbers

For unbounded sequences, we work in $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, \infty\}$.

### Example 9: Unbounded Oscillation

For $a_n = (-1)^n n$:
- $\limsup a_n = \infty$ (even terms $\to \infty$)
- $\liminf a_n = -\infty$ (odd terms $\to -\infty$)

## Relation to Sequences of Sets

The limsup and liminf notation extends to sequences of sets in measure theory and probability:
$$
\limsup_{n \to \infty} A_n = \bigcap_{n=1}^{\infty} \bigcup_{k=n}^{\infty} A_k \quad \text{(infinitely often)}
$$
$$
\liminf_{n \to \infty} A_n = \bigcup_{n=1}^{\infty} \bigcap_{k=n}^{\infty} A_k \quad \text{(eventually)}
$$

## Exercises

1. Compute $\limsup$ and $\liminf$ for $a_n = \sin(\frac{n\pi}{4})$.

2. Prove that $\limsup(a_n b_n) \leq (\limsup a_n)(\limsup b_n)$ if $a_n, b_n \geq 0$.

3. Find a sequence where $\limsup(a_n + b_n) < \limsup a_n + \limsup b_n$.

4. Show that if $(a_n)$ is bounded, then $\limsup a_n$ and $\liminf a_n$ are both limit points of $(a_n)$.

5. Prove that $\limsup \frac{a_{n+1}}{a_n} \geq 0$ implies $\limsup \sqrt[n]{a_n} \leq \limsup \frac{a_{n+1}}{a_n}$.

## Conclusion

The concepts of $\limsup$ and $\liminf$ extend our understanding of sequence behavior beyond simple convergence. They capture asymptotic bounds and oscillation patterns, proving invaluable in series convergence tests (ratio and root tests) and measure theory. Every bounded sequence has well-defined $\limsup$ and $\liminf$, making them universal tools for sequence analysis.
