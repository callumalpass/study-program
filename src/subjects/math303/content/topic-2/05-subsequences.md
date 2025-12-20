---
title: "Subsequences"
slug: "subsequences"
description: "Subsequences and the Bolzano-Weierstrass Theorem"
---

# Subsequences

## Definition and Notation

**Definition:** Let $(a_n)$ be a sequence. A **subsequence** of $(a_n)$ is a sequence $(a_{n_k})$ where $(n_k)$ is a strictly increasing sequence of natural numbers.

Explicitly: $n_1 < n_2 < n_3 < \cdots$ and the subsequence is $(a_{n_1}, a_{n_2}, a_{n_3}, \ldots)$.

**Example 1:** From $(1, 2, 3, 4, 5, 6, \ldots)$, we can form:
- $(1, 3, 5, 7, \ldots)$ with $n_k = 2k - 1$ (odd terms)
- $(2, 4, 6, 8, \ldots)$ with $n_k = 2k$ (even terms)
- $(1, 4, 9, 16, \ldots)$ with $n_k = k^2$ (perfect squares)

**Example 2:** From the sequence $((-1)^n) = (-1, 1, -1, 1, -1, \ldots)$:
- $n_k = 2k$ gives $(1, 1, 1, \ldots)$ converging to 1
- $n_k = 2k-1$ gives $(-1, -1, -1, \ldots)$ converging to $-1$

**Important:** Since $(n_k)$ is strictly increasing and $n_1 \geq 1$, we have $n_k \geq k$ for all $k$.

## Convergence of Subsequences

**Theorem 5.1:** If $a_n \to L$, then every subsequence of $(a_n)$ also converges to $L$.

**Proof:** Let $(a_{n_k})$ be a subsequence and let $\epsilon > 0$. Since $a_n \to L$, there exists $N$ such that for all $n \geq N$:
$$
|a_n - L| < \epsilon
$$

Since $n_k \geq k$, for all $k \geq N$, we have $n_k \geq k \geq N$, thus:
$$
|a_{n_k} - L| < \epsilon
$$

Therefore, $a_{n_k} \to L$.

**Contrapositive (Divergence Criterion):** If a sequence has two subsequences converging to different limits, or has a divergent subsequence, then the sequence diverges.

**Example 3:** $((-1)^n)$ has subsequences converging to 1 and $-1$, so $((-1)^n)$ diverges.

## Limit Points of Sequences

**Definition:** A number $L$ is a **limit point** (or **cluster point**, **accumulation point**) of the sequence $(a_n)$ if some subsequence of $(a_n)$ converges to $L$.

**Example 4:** For $a_n = (-1)^n + \frac{1}{n}$:
- The subsequence $(a_{2k}) = 1 + \frac{1}{2k} \to 1$
- The subsequence $(a_{2k-1}) = -1 + \frac{1}{2k-1} \to -1$
- The limit points are $\{-1, 1\}$

**Theorem 5.2:** If $a_n \to L$, then $L$ is the unique limit point of $(a_n)$.

**Proof:** By Theorem 5.1, every subsequence converges to $L$, so $L$ is a limit point. If $M$ is another limit point, then some subsequence converges to $M$, which by Theorem 5.1 must equal $L$.

## The Bolzano-Weierstrass Theorem

**Theorem 5.3 (Bolzano-Weierstrass Theorem - BWT):** Every bounded sequence has a convergent subsequence.

**Proof:** Let $(a_n)$ be bounded, say $|a_n| \leq M$ for all $n$. We construct a convergent subsequence using the **bisection method**.

Let $I_0 = [-M, M]$, which contains infinitely many terms of $(a_n)$.

Divide $I_0$ into two equal halves $[-M, 0]$ and $[0, M]$. At least one contains infinitely many terms of $(a_n)$. Let $I_1$ be such a half.

Repeat: divide $I_k$ into two equal halves, and let $I_{k+1}$ be a half containing infinitely many terms.

We obtain nested intervals $I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$ with length$(I_k) = \frac{2M}{2^k} \to 0$.

By the Nested Intervals Theorem, $\bigcap_{k=0}^{\infty} I_k = \{L\}$ for some $L \in \mathbb{R}$.

Now construct a subsequence: choose $n_1$ such that $a_{n_1} \in I_1$. Having chosen $n_1 < \cdots < n_k$, choose $n_{k+1} > n_k$ with $a_{n_{k+1}} \in I_{k+1}$ (possible since $I_{k+1}$ contains infinitely many terms).

For any $\epsilon > 0$, choose $K$ such that length$(I_K) < \epsilon$. For all $k \geq K$, since $a_{n_k}, L \in I_K$:
$$
|a_{n_k} - L| \leq \text{length}(I_K) < \epsilon
$$

Thus, $a_{n_k} \to L$.

**Remark:** BWT is equivalent to completeness (and to MCT and NIT).

**Example 5:** The sequence $(\sin n)$ is bounded by 1, so BWT guarantees a convergent subsequence exists (though it's hard to describe explicitly!).

## Applications of BWT

### Existence of Supremum via Sequences

**Alternative proof that bounded sets have suprema:** Let $S \subseteq \mathbb{R}$ be nonempty and bounded above. For each $n$, choose $x_n \in S$ such that $x_n > \sup S - \frac{1}{n}$ (possible by approximation property of supremum, assuming completeness).

By BWT, $(x_n)$ has a convergent subsequence $(x_{n_k}) \to L$. Since $x_{n_k} \in S$ and $S$ is bounded above by any upper bound $M$, we have $L \leq M$. Also, $x_{n_k} > \sup S - \frac{1}{n_k}$, so taking $k \to \infty$ gives $L \geq \sup S$.

Thus, $L = \sup S$.

### Limit Points and Closures

**Theorem 5.4:** A number $L$ is a limit point of a set $S$ if and only if there exists a sequence $(x_n)$ in $S \setminus \{L\}$ with $x_n \to L$.

**Proof:** $(\Rightarrow)$ For each $n$, choose $x_n \in N_{1/n}(L) \cap (S \setminus \{L\})$ (possible since $L$ is a limit point). Then $|x_n - L| < \frac{1}{n} \to 0$.

$(\Leftarrow)$ If $x_n \to L$ with $x_n \in S \setminus \{L\}$, then every neighborhood of $L$ contains infinitely many $x_n$, hence points of $S$ other than $L$.

## Divergent Sequences with Convergent Subsequences

**Example 6:** $(1, 1, 2, 1, 2, 3, 1, 2, 3, 4, \ldots)$

This sequence is unbounded, hence diverges, but has the constant subsequence $(1, 1, 1, \ldots) \to 1$.

**Example 7:** $a_n = n \sin(n\pi/2) = (0, 2, 0, -4, 0, 6, 0, -8, \ldots)$

The subsequence $a_{2k} = 0 \to 0$, but the sequence itself is unbounded.

## Limsup and Liminf Preview

For a bounded sequence, we can consider:
- $\limsup_{n \to \infty} a_n$ = largest limit point
- $\liminf_{n \to \infty} a_n$ = smallest limit point

We'll develop this fully in the next section.

## Characterizations of Convergence

**Theorem 5.5:** A sequence $(a_n)$ converges to $L$ if and only if every subsequence has a further subsequence converging to $L$.

**Proof:** $(\Rightarrow)$ Clear from Theorem 5.1.

$(\Leftarrow)$ Suppose every subsequence has a further subsequence converging to $L$. Suppose, for contradiction, that $a_n \not\to L$. Then there exists $\epsilon > 0$ such that for all $N$, there exists $n \geq N$ with $|a_n - L| \geq \epsilon$.

Construct a subsequence $(a_{n_k})$ with $|a_{n_k} - L| \geq \epsilon$ for all $k$. By assumption, $(a_{n_k})$ has a further subsequence converging to $L$, contradicting $|a_{n_k} - L| \geq \epsilon$.

**Theorem 5.6 (Subsequence Criterion):** A bounded sequence $(a_n)$ converges if and only if all its convergent subsequences have the same limit.

**Proof:** $(\Rightarrow)$ By Theorem 5.1.

$(\Leftarrow)$ By BWT, $(a_n)$ has a convergent subsequence, say $a_{n_k} \to L$. We claim $a_n \to L$.

If not, there exists $\epsilon > 0$ and infinitely many $n$ with $|a_n - L| \geq \epsilon$. These form a bounded subsequence, which by BWT has a convergent further subsequence, say converging to $M$. By assumption, $M = L$, contradicting $|a_n - L| \geq \epsilon$.

## Dense Subsequences

**Definition:** A subsequence $(a_{n_k})$ is **dense** in $(a_n)$ if every term of $(a_n)$ is arbitrarily close to some term of the subsequence.

**Example 8:** In $(1, 2, 3, 4, \ldots)$, the subsequence $(2, 4, 6, 8, \ldots)$ is not dense, but $(1, 2, 3, \ldots) = (a_n)$ itself is dense.

## Sequential Compactness

**Definition:** A set $K \subseteq \mathbb{R}$ is **sequentially compact** if every sequence in $K$ has a subsequence converging to a point in $K$.

**Theorem 5.7:** A set $K \subseteq \mathbb{R}$ is sequentially compact if and only if it is closed and bounded.

**Proof sketch:** $(\Rightarrow)$ If $K$ is unbounded, construct a sequence $(x_n)$ in $K$ with $|x_n| \to \infty$. No subsequence can converge, contradicting sequential compactness.

If $K$ is not closed, there exists a limit point $L \notin K$ of $K$. Construct $(x_n)$ in $K$ with $x_n \to L$. Any convergent subsequence must converge to $L \notin K$, contradiction.

$(\Leftarrow)$ If $K$ is closed and bounded, any sequence in $K$ is bounded, so by BWT has a convergent subsequence. The limit lies in $K$ because $K$ is closed.

## Exercises

1. Give an example of a divergent sequence all of whose subsequences diverge.

2. Prove that if $(a_n)$ is unbounded, it has a subsequence $(a_{n_k})$ with $|a_{n_k}| \to \infty$.

3. Show that every sequence has a monotone subsequence.

4. If $(a_n)$ is bounded and has exactly two limit points, prove that $(a_n)$ diverges.

5. Construct a sequence containing every rational number as a term.

## Conclusion

Subsequences provide a flexible tool for analyzing sequence behavior. The Bolzano-Weierstrass Theorem guarantees that bounded sequences have convergent subsequences, a fact central to compactness arguments throughout analysis. Understanding limit points via subsequences bridges sequence theory and topology.
