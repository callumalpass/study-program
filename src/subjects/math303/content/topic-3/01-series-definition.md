---
title: "Series: Definition and Convergence"
slug: "series-definition"
description: "Infinite series, partial sums, and basic convergence tests"
---

# Series: Definition and Convergence

## Definition of Series

**Definition:** Given a sequence $(a_n)$, the **infinite series** (or simply **series**) $\sum_{n=1}^{\infty} a_n$ is defined via the sequence of **partial sums**:
$$
s_n = \sum_{k=1}^{n} a_k = a_1 + a_2 + \cdots + a_n
$$

We say the series **converges** to $S$ if $\lim_{n \to \infty} s_n = S$, and write:
$$
\sum_{n=1}^{\infty} a_n = S
$$

If $(s_n)$ diverges, we say the series **diverges**.

**Notation:** We also write $\sum a_n$, $\sum_{n=1}^{\infty} a_n$, or $\sum_{n=0}^{\infty} a_n$ depending on context.

## Basic Examples

### Example 1: Geometric Series

For $|r| < 1$:
$$
\sum_{n=0}^{\infty} r^n = \frac{1}{1-r}
$$

**Proof:** The $n$-th partial sum is:
$$
s_n = 1 + r + r^2 + \cdots + r^{n-1} = \frac{1 - r^n}{1 - r}
$$

Since $|r| < 1$, we have $r^n \to 0$, thus:
$$
\lim_{n \to \infty} s_n = \frac{1}{1-r}
$$

For $|r| \geq 1$, the series diverges.

### Example 2: Telescoping Series

$$
\sum_{n=1}^{\infty} \left(\frac{1}{n} - \frac{1}{n+1}\right) = 1
$$

**Proof:** The partial sum is:
$$
s_n = \sum_{k=1}^{n} \left(\frac{1}{k} - \frac{1}{k+1}\right) = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \cdots + \left(\frac{1}{n} - \frac{1}{n+1}\right) = 1 - \frac{1}{n+1}
$$

Thus, $s_n \to 1$.

### Example 3: Harmonic Series

$$
\sum_{n=1}^{\infty} \frac{1}{n} = \infty \quad \text{(diverges)}
$$

**Proof:** We showed earlier (using the Cauchy criterion) that:
$$
s_{2^k} \geq 1 + \frac{k}{2} \to \infty
$$

### Example 4: p-Series

$$
\sum_{n=1}^{\infty} \frac{1}{n^p}
$$

- Converges if $p > 1$
- Diverges if $p \leq 1$

We'll prove this using the integral test later.

## Necessary Condition for Convergence

**Theorem 3.1 (Term Test):** If $\sum_{n=1}^{\infty} a_n$ converges, then $\lim_{n \to \infty} a_n = 0$.

**Proof:** If $\sum a_n = S$, then $s_n \to S$. Thus:
$$
a_n = s_n - s_{n-1} \to S - S = 0
$$

**Contrapositive (Divergence Test):** If $a_n \not\to 0$, then $\sum a_n$ diverges.

**Example 5:** $\sum_{n=1}^{\infty} \frac{n}{n+1}$ diverges because $\frac{n}{n+1} \to 1 \neq 0$.

**Warning:** The converse is false! $\frac{1}{n} \to 0$ but $\sum \frac{1}{n}$ diverges.

## Cauchy Criterion for Series

**Theorem 3.2 (Cauchy Criterion):** The series $\sum_{n=1}^{\infty} a_n$ converges if and only if for every $\epsilon > 0$, there exists $N$ such that for all $m \geq n \geq N$:
$$
\left|\sum_{k=n}^{m} a_k\right| < \epsilon
$$

Equivalently: $|s_m - s_n| < \epsilon$ for $m \geq n \geq N$.

**Proof:** This is the Cauchy criterion applied to the sequence $(s_n)$ of partial sums.

**Example 6:** For $\sum \frac{1}{n^2}$, we have for $m > n$:
$$
\left|\sum_{k=n+1}^{m} \frac{1}{k^2}\right| \leq \sum_{k=n+1}^{m} \frac{1}{k(k-1)} = \frac{1}{n} - \frac{1}{m} < \frac{1}{n}
$$

Given $\epsilon > 0$, choose $N > \frac{1}{\epsilon}$. Then for $m > n \geq N$, the sum is less than $\epsilon$. Thus, the series converges.

## Linearity of Series

**Theorem 3.3:** If $\sum a_n = A$ and $\sum b_n = B$, then:
1. $\sum (a_n + b_n) = A + B$
2. $\sum (c a_n) = cA$ for any $c \in \mathbb{R}$

**Proof:** The partial sums of $\sum(a_n + b_n)$ are:
$$
s_n = \sum_{k=1}^{n} (a_k + b_k) = \sum_{k=1}^{n} a_k + \sum_{k=1}^{n} b_k \to A + B
$$

## Positive Series

**Definition:** A series $\sum a_n$ is a **positive series** if $a_n \geq 0$ for all $n$.

**Theorem 3.4:** For a positive series $\sum a_n$:
- The sequence of partial sums $(s_n)$ is increasing
- $\sum a_n$ converges if and only if $(s_n)$ is bounded above
- If $\sum a_n$ diverges, then $s_n \to \infty$

**Proof:** Since $a_n \geq 0$, we have $s_{n+1} = s_n + a_{n+1} \geq s_n$, so $(s_n)$ is increasing.

By the Monotone Convergence Theorem, $(s_n)$ converges if and only if it's bounded above.

If unbounded, then $s_n \to \infty$ (since it's increasing).

## Comparison Test

**Theorem 3.5 (Comparison Test):** Suppose $0 \leq a_n \leq b_n$ for all $n \geq N_0$.

1. If $\sum b_n$ converges, then $\sum a_n$ converges
2. If $\sum a_n$ diverges, then $\sum b_n$ diverges

**Proof:** Let $s_n = \sum_{k=1}^{n} a_k$ and $t_n = \sum_{k=1}^{n} b_k$.

For $n \geq N_0$, we have $s_n \leq t_n + C$ for some constant $C$.

If $\sum b_n$ converges, then $(t_n)$ is bounded, so $(s_n)$ is bounded, thus $\sum a_n$ converges.

**Example 7:** Does $\sum_{n=1}^{\infty} \frac{1}{n^2 + n}$ converge?

Since $\frac{1}{n^2 + n} < \frac{1}{n^2}$ and $\sum \frac{1}{n^2}$ converges (p-series with $p=2$), by comparison, $\sum \frac{1}{n^2 + n}$ converges.

**Example 8:** Does $\sum_{n=2}^{\infty} \frac{1}{\sqrt{n} - 1}$ converge?

For $n \geq 2$, $\sqrt{n} - 1 < \sqrt{n}$, so $\frac{1}{\sqrt{n} - 1} > \frac{1}{\sqrt{n}}$. Since $\sum \frac{1}{\sqrt{n}} = \sum \frac{1}{n^{1/2}}$ diverges (p-series with $p = 1/2 < 1$), by comparison, the series diverges.

## Limit Comparison Test

**Theorem 3.6 (Limit Comparison Test):** Suppose $a_n, b_n > 0$ for all $n$ and:
$$
\lim_{n \to \infty} \frac{a_n}{b_n} = L
$$

1. If $0 < L < \infty$, then $\sum a_n$ and $\sum b_n$ either both converge or both diverge
2. If $L = 0$ and $\sum b_n$ converges, then $\sum a_n$ converges
3. If $L = \infty$ and $\sum b_n$ diverges, then $\sum a_n$ diverges

**Proof of (1):** Since $\frac{a_n}{b_n} \to L > 0$, for large $n$:
$$
\frac{L}{2} < \frac{a_n}{b_n} < 2L
$$

Thus, $\frac{L}{2} b_n < a_n < 2L b_n$. By the comparison test, $\sum a_n$ and $\sum b_n$ have the same convergence behavior.

**Example 9:** Does $\sum_{n=1}^{\infty} \frac{n+1}{n^3 + 2n + 5}$ converge?

Compare with $b_n = \frac{1}{n^2}$:
$$
\frac{a_n}{b_n} = \frac{n+1}{n^3 + 2n + 5} \cdot n^2 = \frac{n^3 + n^2}{n^3 + 2n + 5} \to 1
$$

Since $\sum \frac{1}{n^2}$ converges, so does $\sum a_n$.

## Condensation Test

**Theorem 3.7 (Cauchy Condensation Test):** Let $(a_n)$ be a decreasing sequence of non-negative terms. Then:
$$
\sum_{n=1}^{\infty} a_n \text{ converges} \iff \sum_{k=0}^{\infty} 2^k a_{2^k} \text{ converges}
$$

**Proof sketch:** The terms $a_1, a_2, a_2, a_3, a_3, a_3, a_3, a_4, \ldots$ group as:
- $a_1$
- $a_2, a_2$ (2 terms, each $\geq a_3$)
- $a_3, a_3, a_3, a_3$ (4 terms, each $\geq a_7$)
- etc.

Comparing the groupings gives the equivalence.

**Example 10 (p-series):** For $\sum \frac{1}{n^p}$:
$$
\sum 2^k a_{2^k} = \sum 2^k \cdot \frac{1}{(2^k)^p} = \sum 2^{k(1-p)} = \sum (2^{1-p})^k
$$

This is a geometric series with ratio $r = 2^{1-p}$:
- Converges if $|r| < 1 \iff 2^{1-p} < 1 \iff 1-p < 0 \iff p > 1$
- Diverges if $p \leq 1$

## Integral Test

**Theorem 3.8 (Integral Test):** Let $f: [1, \infty) \to \mathbb{R}$ be a positive, decreasing function. Then:
$$
\sum_{n=1}^{\infty} f(n) \text{ converges} \iff \int_1^{\infty} f(x) \, dx \text{ converges}
$$

**Proof idea:** Since $f$ is decreasing:
$$
f(n+1) \leq \int_n^{n+1} f(x) \, dx \leq f(n)
$$

Summing gives:
$$
\sum_{n=2}^{N} f(n) \leq \int_1^{N} f(x) \, dx \leq \sum_{n=1}^{N-1} f(n)
$$

The series and integral either both converge or both diverge.

**Example 11:** For $\sum \frac{1}{n \ln n}$ (starting at $n=2$):
$$
\int_2^{\infty} \frac{1}{x \ln x} \, dx = \lim_{b \to \infty} [\ln(\ln x)]_2^b = \infty
$$

So the series diverges.

## Exercises

1. Determine convergence of $\sum_{n=1}^{\infty} \frac{2^n + 3^n}{4^n}$.

2. Use the comparison test to show $\sum \frac{1}{n!}$ converges.

3. Prove that $\sum \frac{1}{n(\ln n)^p}$ converges if and only if $p > 1$.

4. Show that if $\sum a_n$ converges, then $\sum a_n^2$ need not converge.

5. For which values of $p$ does $\sum \frac{(\ln n)^p}{n^2}$ converge?

## Conclusion

Infinite series extend finite sums to the infinite case via limits of partial sums. Positive series are particularly tractable, admitting comparison tests and the integral test. The Cauchy criterion provides the fundamental convergence test, while special tests (comparison, limit comparison, condensation, integral) offer practical tools for determining convergence.
