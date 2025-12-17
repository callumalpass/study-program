---
title: "Monotone Sequences"
slug: "monotone-sequences"
description: "Monotone Convergence Theorem and applications"
---

# Monotone Sequences

## The Monotone Convergence Theorem

One of the most powerful results in real analysis is that bounded monotone sequences always converge.

**Theorem 4.1 (Monotone Convergence Theorem - MCT):**

1. If $(a_n)$ is increasing and bounded above, then $(a_n)$ converges to $\sup\{a_n : n \in \mathbb{N}\}$
2. If $(a_n)$ is decreasing and bounded below, then $(a_n)$ converges to $\inf\{a_n : n \in \mathbb{N}\}$

**Proof of (1):** Since $(a_n)$ is bounded above, by the completeness axiom, $L = \sup\{a_n : n \in \mathbb{N}\}$ exists.

We claim $a_n \to L$. Let $\epsilon > 0$. By the approximation property of supremum, there exists $N$ such that:
$$
L - \epsilon < a_N \leq L
$$

Since $(a_n)$ is increasing, for all $n \geq N$:
$$
L - \epsilon < a_N \leq a_n \leq L < L + \epsilon
$$

Thus, $|a_n - L| < \epsilon$ for all $n \geq N$, proving $a_n \to L$.

**Remark:** This theorem is actually equivalent to the completeness axiom. The MCT distinguishes $\mathbb{R}$ from $\mathbb{Q}$ just as completeness does.

## Examples of Monotone Convergence

### Example 1: Decimal Expansions

Consider $a_n = \sum_{k=1}^{n} \frac{1}{10^k} = 0.1 + 0.01 + \cdots + 0.\underbrace{00\ldots01}_{n \text{ places}}$.

This sequence is increasing (each term adds a positive amount) and bounded above by 1. By MCT:
$$
\lim_{n \to \infty} a_n = \sup\{a_n\} = 0.1111\ldots = \frac{1}{9}
$$

### Example 2: Nested Radicals

Define $a_1 = \sqrt{2}$ and $a_{n+1} = \sqrt{2 + a_n}$.

**Claim:** $(a_n)$ is increasing and bounded above by 2.

**Proof:** By induction:
- Base: $a_1 = \sqrt{2} < 2$ ✓
- Step: If $a_n < 2$, then $a_{n+1} = \sqrt{2 + a_n} < \sqrt{2 + 2} = 2$ ✓

For monotonicity, we show $a_{n+1} \geq a_n$:
$$
a_{n+1}^2 = 2 + a_n \quad \text{and} \quad a_n^2 = 2 + a_{n-1}
$$

Subtracting: $a_{n+1}^2 - a_n^2 = a_n - a_{n-1}$.

If $a_n \geq a_{n-1}$, then $a_{n+1}^2 \geq a_n^2$, so $a_{n+1} \geq a_n$ (since both are positive).

Since $a_2 = \sqrt{2 + \sqrt{2}} > \sqrt{2} = a_1$, by induction, $(a_n)$ is increasing.

By MCT, $\lim_{n \to \infty} a_n = L$ exists. Taking limits in $a_{n+1} = \sqrt{2 + a_n}$:
$$
L = \sqrt{2 + L}
$$
$$
L^2 = 2 + L
$$
$$
L^2 - L - 2 = 0
$$
$$
(L-2)(L+1) = 0
$$

Since $L > 0$, we have $L = 2$.

### Example 3: Recursive Sequence

Define $a_1 = 1$ and $a_{n+1} = \frac{1}{2}(a_n + \frac{2}{a_n})$.

This is Newton's method for $\sqrt{2}$. We can show:
- $a_n \geq \sqrt{2}$ for $n \geq 2$
- $(a_n)$ is decreasing for $n \geq 2$
- $(a_n)$ is bounded below by $\sqrt{2}$

By MCT, $a_n \to L$. Taking limits:
$$
L = \frac{1}{2}\left(L + \frac{2}{L}\right) \implies L^2 = 2 \implies L = \sqrt{2}
$$

## Applications to Series

The MCT is crucial for studying series via partial sums.

**Definition:** Given a sequence $(a_n)$, the **sequence of partial sums** is $s_n = \sum_{k=1}^{n} a_k$.

**Theorem 4.2:** If $a_n \geq 0$ for all $n$, then $(s_n)$ is increasing. The series $\sum_{n=1}^{\infty} a_n$ converges if and only if $(s_n)$ is bounded above.

**Example 4: Geometric Series**

For $|r| < 1$, the geometric series $\sum_{n=0}^{\infty} r^n$ has partial sums:
$$
s_n = \frac{1 - r^{n+1}}{1 - r}
$$

Since $r^{n+1} \to 0$, we have $s_n \to \frac{1}{1-r}$.

**Example 5: Harmonic Series**

Consider $\sum_{n=1}^{\infty} \frac{1}{n}$. The partial sums $s_n$ are increasing, but:
$$
s_{2^k} = 1 + \frac{1}{2} + \left(\frac{1}{3} + \frac{1}{4}\right) + \left(\frac{1}{5} + \cdots + \frac{1}{8}\right) + \cdots > 1 + \frac{1}{2} + \frac{2}{4} + \frac{4}{8} + \cdots = 1 + \frac{k}{2}
$$

Thus, $(s_n)$ is unbounded, so the harmonic series diverges.

## Euler's Number

**Definition:** Define:
$$
e_n = \left(1 + \frac{1}{n}\right)^n
$$

**Theorem 4.3:** The sequence $(e_n)$ is increasing and bounded above by 3. Its limit is denoted $e$ (Euler's number).

**Proof sketch:** By the binomial theorem:
$$
e_n = \sum_{k=0}^{n} \binom{n}{k} \frac{1}{n^k} = \sum_{k=0}^{n} \frac{1}{k!} \prod_{j=0}^{k-1} \left(1 - \frac{j}{n}\right)
$$

For fixed $k$, as $n$ increases, $\prod_{j=0}^{k-1}(1 - j/n)$ increases toward 1. Each term in the sum increases with $n$, and more terms are added, so $(e_n)$ is increasing.

For boundedness:
$$
e_n \leq \sum_{k=0}^{n} \frac{1}{k!} \leq 1 + \sum_{k=1}^{n} \frac{1}{2^{k-1}} = 1 + (2 - \frac{1}{2^{n-1}}) < 3
$$

Thus, $e = \lim_{n \to \infty} e_n$ exists and $e \in [2, 3]$. (More precisely, $e \approx 2.71828$.)

## Comparison Test for Sequences

**Theorem 4.4:** Suppose $(a_n)$ and $(b_n)$ are sequences with $0 \leq a_n \leq b_n$ for all $n$.

1. If $b_n \to 0$, then $a_n \to 0$
2. If $a_n \to \infty$, then $b_n \to \infty$

**Proof:** (1) follows from the squeeze theorem. (2) follows from the contrapositive of (1).

## Cesàro Mean

**Theorem 4.5 (Cesàro's Theorem):** If $a_n \to L$, then:
$$
\frac{a_1 + a_2 + \cdots + a_n}{n} \to L
$$

**Proof:** Let $\epsilon > 0$. Choose $N$ such that for $n \geq N$, $|a_n - L| < \epsilon/2$.

For $n > N$:
$$
\left|\frac{a_1 + \cdots + a_n}{n} - L\right| = \left|\frac{(a_1 - L) + \cdots + (a_n - L)}{n}\right|
$$
$$
\leq \frac{|a_1 - L| + \cdots + |a_N - L|}{n} + \frac{|a_{N+1} - L| + \cdots + |a_n - L|}{n}
$$

The first term goes to 0 as $n \to \infty$ (fixed numerator, growing denominator). The second term is at most $\frac{(n-N) \epsilon/2}{n} < \epsilon/2$.

For $n$ sufficiently large, the sum is less than $\epsilon$.

**Remark:** The converse is false. Let $a_n = (-1)^n$. Then $\frac{a_1 + \cdots + a_n}{n} \to 0$, but $a_n$ does not converge.

## Eventually Monotone Sequences

**Definition:** A sequence is **eventually monotone** if it is monotone from some index onward.

**Theorem 4.6:** If $(a_n)$ is eventually increasing and bounded above, then $(a_n)$ converges.

**Proof:** Only the tail of the sequence matters for convergence, and the tail satisfies MCT.

## Contractive Sequences

**Definition:** A sequence $(a_n)$ is **contractive** if there exists $0 < c < 1$ such that:
$$
|a_{n+2} - a_{n+1}| \leq c|a_{n+1} - a_n|
$$
for all $n$.

**Theorem 4.7:** Every contractive sequence converges.

**Proof:** This will follow from our study of Cauchy sequences.

## Monotone Sequences and Fixed Points

Many iterative algorithms generate monotone sequences converging to fixed points.

**General Pattern:** Given $f: [a,b] \to [a,b]$ and $x_1 \in [a,b]$, define $x_{n+1} = f(x_n)$.

If $f$ is increasing and $x_1 \leq f(x_1)$, then $(x_n)$ is increasing and bounded, hence converges to a fixed point of $f$.

## Exercises

1. Prove that if $(a_n)$ is decreasing and bounded below, then $a_n \to \inf\{a_n\}$.

2. Define $a_1 = 1$ and $a_{n+1} = \sqrt{6 + a_n}$. Show that $(a_n)$ converges and find the limit.

3. Prove that $\left(1 + \frac{1}{n}\right)^n < \left(1 + \frac{1}{n+1}\right)^{n+1}$ for all $n \in \mathbb{N}$.

4. Show that $\lim_{n \to \infty} \sqrt[n]{n!} / n = 1/e$ (hint: use Stirling's approximation or advanced techniques).

5. For $a_1 = 1$ and $a_{n+1} = \frac{a_n + 1}{a_n + 2}$, determine if $(a_n)$ converges and find the limit if it does.

## Conclusion

The Monotone Convergence Theorem is one of the most practical convergence criteria. Many sequences arising in mathematics are naturally monotone (or eventually monotone), making MCT an indispensable tool. Combined with completeness, it provides constructive proofs of existence for limits.
