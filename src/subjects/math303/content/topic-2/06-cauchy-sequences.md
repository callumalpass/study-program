---
title: "Cauchy Sequences"
slug: "cauchy-sequences"
description: "Cauchy criterion for convergence and completeness of the reals"
---

# Cauchy Sequences

## Definition

**Definition:** A sequence $(a_n)$ is a **Cauchy sequence** if for every $\epsilon > 0$, there exists $N \in \mathbb{N}$ such that for all $m, n \geq N$:
$$
|a_m - a_n| < \epsilon
$$

**Intuitive meaning:** The terms of a Cauchy sequence get arbitrarily close to each other (not necessarily to a specific limit).

**Example 1:** The sequence $a_n = \frac{1}{n}$ is Cauchy.

**Proof:** For $m \geq n \geq N$:
$$
|a_m - a_n| = \left|\frac{1}{m} - \frac{1}{n}\right| \leq \frac{1}{n} \leq \frac{1}{N}
$$

Given $\epsilon > 0$, choose $N > \frac{1}{\epsilon}$. Then for $m, n \geq N$:
$$
|a_m - a_n| \leq \frac{1}{N} < \epsilon
$$

## Convergent Sequences are Cauchy

**Theorem 6.1:** Every convergent sequence is Cauchy.

**Proof:** Suppose $a_n \to L$. Let $\epsilon > 0$. Choose $N$ such that for $n \geq N$:
$$
|a_n - L| < \frac{\epsilon}{2}
$$

For $m, n \geq N$:
$$
|a_m - a_n| = |a_m - L + L - a_n| \leq |a_m - L| + |a_n - L| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

**Remark:** In $\mathbb{Q}$, the converse is false! The sequence of decimal approximations to $\sqrt{2}$ is Cauchy in $\mathbb{Q}$ but doesn't converge in $\mathbb{Q}$.

## The Cauchy Criterion

**Theorem 6.2 (Cauchy Criterion):** A sequence in $\mathbb{R}$ converges if and only if it is Cauchy.

We've proved $(\Rightarrow)$ above. For $(\Leftarrow)$, we need completeness.

**Proof of $(\Leftarrow)$:** Let $(a_n)$ be Cauchy. We'll show it's bounded, apply BWT to get a convergent subsequence, then show the whole sequence converges to the same limit.

**Step 1:** $(a_n)$ is bounded.

Taking $\epsilon = 1$, there exists $N$ such that for all $n \geq N$:
$$
|a_n - a_N| < 1
$$

Thus, $|a_n| \leq |a_N| + 1$ for $n \geq N$. Let:
$$
M = \max\{|a_1|, |a_2|, \ldots, |a_{N-1}|, |a_N| + 1\}
$$

Then $|a_n| \leq M$ for all $n$.

**Step 2:** $(a_n)$ has a convergent subsequence.

By BWT (since $(a_n)$ is bounded), there exists a subsequence $(a_{n_k}) \to L$.

**Step 3:** $a_n \to L$.

Let $\epsilon > 0$. Since $(a_n)$ is Cauchy, there exists $N_1$ such that for $m, n \geq N_1$:
$$
|a_m - a_n| < \frac{\epsilon}{2}
$$

Since $a_{n_k} \to L$, there exists $K$ such that $n_K \geq N_1$ and:
$$
|a_{n_K} - L| < \frac{\epsilon}{2}
$$

For $n \geq N_1$:
$$
|a_n - L| = |a_n - a_{n_K} + a_{n_K} - L| \leq |a_n - a_{n_K}| + |a_{n_K} - L| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

Thus, $a_n \to L$.

**Remark:** The Cauchy Criterion is equivalent to completeness. In fact, a metric space is called **complete** if every Cauchy sequence converges.

## Cauchy Sequences are Bounded

**Corollary 6.3:** Every Cauchy sequence is bounded.

**Proof:** Proved in Step 1 above.

## Examples

### Example 2: Partial Sums

Define $a_n = \sum_{k=1}^{n} \frac{1}{k^2}$. Is $(a_n)$ Cauchy?

For $m > n$:
$$
|a_m - a_n| = \sum_{k=n+1}^{m} \frac{1}{k^2} \leq \sum_{k=n+1}^{m} \frac{1}{k(k-1)} = \sum_{k=n+1}^{m} \left(\frac{1}{k-1} - \frac{1}{k}\right) = \frac{1}{n} - \frac{1}{m} \leq \frac{1}{n}
$$

Given $\epsilon > 0$, choose $N > \frac{1}{\epsilon}$. Then for $m \geq n \geq N$:
$$
|a_m - a_n| \leq \frac{1}{n} \leq \frac{1}{N} < \epsilon
$$

So $(a_n)$ is Cauchy, hence converges. (The limit is $\frac{\pi^2}{6}$, though proving this requires more advanced techniques.)

### Example 3: Harmonic Series

Consider $a_n = \sum_{k=1}^{n} \frac{1}{k}$. For $n < 2n$:
$$
|a_{2n} - a_n| = \sum_{k=n+1}^{2n} \frac{1}{k} \geq \sum_{k=n+1}^{2n} \frac{1}{2n} = \frac{n}{2n} = \frac{1}{2}
$$

Taking $\epsilon = 1/4$, there is no $N$ such that $|a_m - a_n| < \epsilon$ for all $m, n \geq N$. Thus, $(a_n)$ is not Cauchy, hence doesn't converge.

### Example 4: Recursive Sequence

Define $a_1 = 1$ and $a_{n+1} = \sqrt{2 + a_n}$. Is $(a_n)$ Cauchy?

We showed earlier that $(a_n)$ is increasing and bounded by 2, so by MCT, $(a_n)$ converges. By Theorem 6.1, $(a_n)$ is Cauchy.

Alternatively, we can show directly: $|a_{n+1} - a_n| = |\sqrt{2 + a_n} - \sqrt{2 + a_{n-1}}| \to 0$, and use the fact that if $|a_{n+1} - a_n| \to 0$ and $(a_n)$ is bounded, then... actually, this isn't sufficient! We need the full Cauchy criterion.

## Cauchy Criterion for Series

**Definition:** The series $\sum_{n=1}^{\infty} a_n$ converges if and only if the sequence of partial sums $(s_n)$ converges, where $s_n = \sum_{k=1}^{n} a_k$.

**Theorem 6.4 (Cauchy Criterion for Series):** The series $\sum_{n=1}^{\infty} a_n$ converges if and only if for every $\epsilon > 0$, there exists $N$ such that for all $m > n \geq N$:
$$
\left|\sum_{k=n+1}^{m} a_k\right| < \epsilon
$$

**Proof:** This is the Cauchy criterion applied to the sequence of partial sums.

**Corollary 6.5 (Necessary Condition for Convergence):** If $\sum_{n=1}^{\infty} a_n$ converges, then $\lim_{n \to \infty} a_n = 0$.

**Proof:** Taking $m = n+1$ in the Cauchy criterion gives $|a_{n+1}| < \epsilon$ for $n \geq N$.

**Remark:** The converse is false: $\sum \frac{1}{n}$ has $a_n \to 0$ but the series diverges.

## Contractive Sequences

**Definition:** A sequence $(a_n)$ is **contractive** if there exists $0 < c < 1$ such that:
$$
|a_{n+2} - a_{n+1}| \leq c|a_{n+1} - a_n|
$$
for all $n \geq 1$.

**Theorem 6.6:** Every contractive sequence is Cauchy, hence converges.

**Proof:** Let $d_n = |a_{n+1} - a_n|$. Then $d_{n+1} \leq c d_n$, so by induction:
$$
d_n \leq c^{n-1} d_1
$$

For $m > n$:
$$
|a_m - a_n| \leq |a_m - a_{m-1}| + |a_{m-1} - a_{m-2}| + \cdots + |a_{n+1} - a_n|
$$
$$
= d_{m-1} + d_{m-2} + \cdots + d_n \leq c^{m-2}d_1 + c^{m-3}d_1 + \cdots + c^{n-1}d_1
$$
$$
= c^{n-1}d_1(c^{m-n-1} + \cdots + c + 1) = c^{n-1}d_1 \frac{1 - c^{m-n}}{1-c} < \frac{c^{n-1}d_1}{1-c}
$$

Given $\epsilon > 0$, choose $N$ such that $\frac{c^{N-1}d_1}{1-c} < \epsilon$. Then for $m > n \geq N$:
$$
|a_m - a_n| < \epsilon
$$

### Example 5: Fixed Point Iteration

Let $f(x) = \frac{1}{2}(x + \frac{2}{x})$ on $[1, 2]$. Define $a_1 = 2$ and $a_{n+1} = f(a_n)$.

We have $|f'(x)| = |\frac{1}{2}(1 - \frac{2}{x^2})| \leq \frac{1}{2}$ on $[1, 2]$.

By the Mean Value Theorem:
$$
|a_{n+2} - a_{n+1}| = |f(a_{n+1}) - f(a_n)| \leq \frac{1}{2}|a_{n+1} - a_n|
$$

So $(a_n)$ is contractive with $c = 1/2$, hence converges.

## Completeness and Cauchy Sequences

The Cauchy criterion characterizes completeness:

**Definition:** A metric space $(X, d)$ is **complete** if every Cauchy sequence in $X$ converges to a point in $X$.

**Examples:**
- $\mathbb{R}$ is complete (Theorem 6.2)
- $\mathbb{Q}$ is not complete (decimal approximations of $\sqrt{2}$)
- $(0, 1)$ is not complete ($a_n = \frac{1}{n} \to 0 \notin (0, 1)$)
- $[0, 1]$ is complete

**Theorem 6.7:** The Cauchy Criterion, Monotone Convergence Theorem, Bolzano-Weierstrass Theorem, and Nested Intervals Theorem are all equivalent (in the presence of the field and order axioms).

## Rate of Convergence

The Cauchy criterion provides information about how fast a sequence converges.

**Example 6:** For $a_n = \frac{1}{n}$, we have $|a_m - a_n| \leq \frac{1}{n}$ for $m \geq n$. To get within $\epsilon$, we need $n \geq \frac{1}{\epsilon}$, a linear rate.

**Example 7:** For the contractive sequence with $|a_{n+1} - a_n| \leq c|a_n - a_{n-1}|$, convergence is exponential: $|a_n - L| \leq \frac{c^{n-1}d_1}{1-c}$.

## Exercises

1. Prove directly from the definition that $a_n = \sum_{k=1}^{n} \frac{1}{2^k}$ is Cauchy.

2. Show that if $(a_n)$ is Cauchy and has a subsequence converging to $L$, then $a_n \to L$.

3. Prove that if $(a_n)$ and $(b_n)$ are Cauchy, then $(a_n + b_n)$ and $(a_n b_n)$ are Cauchy.

4. Give an example of a Cauchy sequence in $\mathbb{Q}$ that doesn't converge in $\mathbb{Q}$.

5. Show that if $|a_{n+1} - a_n| \leq \frac{1}{n^2}$, then $(a_n)$ is Cauchy.

## Conclusion

The Cauchy Criterion provides both a practical convergence test and a deep characterization of completeness. It's particularly useful when we don't know the limit ahead of time, or when dealing with series. The equivalence of the Cauchy Criterion with other formulations of completeness (MCT, BWT, NIT) shows the fundamental unity of these concepts.
