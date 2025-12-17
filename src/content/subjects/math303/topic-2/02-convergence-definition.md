---
title: "Convergence of Sequences"
slug: "convergence-definition"
description: "Epsilon-N definition of convergence and fundamental examples"
---

# Convergence of Sequences

## The Limit of a Sequence

**Definition:** A sequence $(a_n)$ **converges** to a limit $L \in \mathbb{R}$, written $\lim_{n \to \infty} a_n = L$ or $a_n \to L$, if:

For every $\epsilon > 0$, there exists $N \in \mathbb{N}$ such that for all $n \geq N$:
$$
|a_n - L| < \epsilon
$$

We say $(a_n)$ **converges** if it converges to some limit, and **diverges** otherwise.

**Intuitive meaning:** As $n$ gets large, $a_n$ gets arbitrarily close to $L$ and stays close.

**Geometric interpretation:** For any $\epsilon > 0$, all but finitely many terms lie in the interval $(L - \epsilon, L + \epsilon)$.

## Epsilon-N Proofs

The $\epsilon$-$N$ definition is the foundation of rigorous analysis. Let's see how to use it in proofs.

### Example 1: $\lim_{n \to \infty} \frac{1}{n} = 0$

**Proof:** Let $\epsilon > 0$. We need to find $N$ such that for all $n \geq N$:
$$
\left|\frac{1}{n} - 0\right| < \epsilon
$$

This simplifies to $\frac{1}{n} < \epsilon$, or $n > \frac{1}{\epsilon}$.

By the Archimedean property, choose $N \in \mathbb{N}$ with $N > \frac{1}{\epsilon}$. Then for all $n \geq N$:
$$
\frac{1}{n} \leq \frac{1}{N} < \epsilon
$$

Therefore, $\lim_{n \to \infty} \frac{1}{n} = 0$.

### Example 2: $\lim_{n \to \infty} \frac{n+1}{n} = 1$

**Proof:** We have:
$$
\left|\frac{n+1}{n} - 1\right| = \left|\frac{1}{n}\right| = \frac{1}{n}
$$

Let $\epsilon > 0$. Choose $N > \frac{1}{\epsilon}$. Then for $n \geq N$:
$$
\left|\frac{n+1}{n} - 1\right| = \frac{1}{n} \leq \frac{1}{N} < \epsilon
$$

### Example 3: $\lim_{n \to \infty} \frac{2n + 3}{5n + 7} = \frac{2}{5}$

**Proof:** We compute:
$$
\left|\frac{2n+3}{5n+7} - \frac{2}{5}\right| = \left|\frac{5(2n+3) - 2(5n+7)}{5(5n+7)}\right| = \left|\frac{10n + 15 - 10n - 14}{5(5n+7)}\right| = \frac{1}{5(5n+7)}
$$

For $n \geq 1$, we have $5n + 7 \geq 12$, so:
$$
\frac{1}{5(5n+7)} \leq \frac{1}{60n}
$$

Let $\epsilon > 0$. Choose $N > \frac{1}{60\epsilon}$. Then for $n \geq N$:
$$
\left|\frac{2n+3}{5n+7} - \frac{2}{5}\right| \leq \frac{1}{60n} < \epsilon
$$

### Example 4: $\lim_{n \to \infty} r^n = 0$ for $|r| < 1$

**Proof:** Assume $0 < r < 1$ (the case $r = 0$ is trivial, and $-1 < r < 0$ follows by $|r^n| = |r|^n$).

Write $r = \frac{1}{1+h}$ where $h > 0$. By Bernoulli's inequality, $(1+h)^n \geq 1 + nh$ for all $n \in \mathbb{N}$. Thus:
$$
|r^n - 0| = r^n = \frac{1}{(1+h)^n} \leq \frac{1}{1+nh} \leq \frac{1}{nh}
$$

Let $\epsilon > 0$. Choose $N > \frac{1}{h\epsilon}$. Then for $n \geq N$:
$$
|r^n| \leq \frac{1}{nh} < \epsilon
$$

## Uniqueness of Limits

**Theorem 2.2:** If a sequence converges, its limit is unique.

**Proof:** Suppose $a_n \to L$ and $a_n \to M$. Let $\epsilon > 0$.

Since $a_n \to L$, there exists $N_1$ such that for $n \geq N_1$, $|a_n - L| < \epsilon/2$.

Since $a_n \to M$, there exists $N_2$ such that for $n \geq N_2$, $|a_n - M| < \epsilon/2$.

Let $N = \max\{N_1, N_2\}$. For $n \geq N$:
$$
|L - M| = |L - a_n + a_n - M| \leq |L - a_n| + |a_n - M| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

Since this holds for all $\epsilon > 0$, we have $|L - M| = 0$, thus $L = M$.

## Divergence to Infinity

**Definition:** We write $\lim_{n \to \infty} a_n = \infty$ if:

For every $M > 0$, there exists $N \in \mathbb{N}$ such that for all $n \geq N$:
$$
a_n > M
$$

Similarly, $\lim_{n \to \infty} a_n = -\infty$ if for every $M < 0$, there exists $N$ such that $a_n < M$ for all $n \geq N$.

**Example 5:** $\lim_{n \to \infty} n^2 = \infty$

**Proof:** Let $M > 0$. Choose $N > \sqrt{M}$. Then for $n \geq N$:
$$
n^2 \geq N^2 > M
$$

**Remark:** When $a_n \to \infty$, we say $(a_n)$ **diverges to infinity**, not "converges to infinity." In the strict sense, the sequence diverges.

## Convergent Sequences are Bounded

**Theorem 2.3:** If $(a_n)$ converges, then $(a_n)$ is bounded.

**Proof:** Suppose $a_n \to L$. Taking $\epsilon = 1$, there exists $N$ such that for $n \geq N$:
$$
|a_n - L| < 1
$$

Thus, $|a_n| < |L| + 1$ for $n \geq N$.

Let:
$$
K = \max\{|a_1|, |a_2|, \ldots, |a_{N-1}|, |L| + 1\}
$$

Then $|a_n| \leq K$ for all $n$.

**Remark:** The converse is false. The sequence $(-1)^n$ is bounded but does not converge.

## Examples of Divergent Sequences

### Example 6: $a_n = (-1)^n$ diverges

**Proof:** Suppose, for contradiction, that $a_n \to L$. Taking $\epsilon = 1/2$, there exists $N$ such that for all $n \geq N$:
$$
|a_n - L| < \frac{1}{2}
$$

In particular, $|a_N - L| < 1/2$ and $|a_{N+1} - L| < 1/2$. By the triangle inequality:
$$
|a_N - a_{N+1}| \leq |a_N - L| + |L - a_{N+1}| < 1
$$

But $a_N$ and $a_{N+1}$ have opposite signs, so $|a_N - a_{N+1}| = 2$, a contradiction.

### Example 7: $a_n = \sin(n)$ diverges

This is more subtle. The sequence oscillates without settling, but the proof requires showing that the values $\sin(n)$ are "equidistributed" enough to prevent convergence.

### Example 8: $a_n = n$ diverges

This diverges to infinity, hence doesn't converge to any real number.

## Limit Points of Sequences vs. Sets

**Definition:** A point $L$ is a **limit point** (or **cluster point**) of the sequence $(a_n)$ if every neighborhood of $L$ contains $a_n$ for infinitely many $n$.

**Remark:** This is different from the limit! A sequence can have multiple limit points but at most one limit.

**Example 9:** The sequence $(1, 2, 1, 2, 1, 2, \ldots)$ has limit points 1 and 2, but no limit.

**Theorem 2.4:** If $a_n \to L$, then $L$ is the unique limit point of $(a_n)$.

## Tails and Convergence

**Theorem 2.5:** Changing finitely many terms of a sequence does not affect convergence or the limit.

**Proof:** If $a_n \to L$ and we define $b_n = a_n$ for $n > K$ (with $b_n$ arbitrary for $n \leq K$), then for any $\epsilon > 0$, there exists $N$ such that $|a_n - L| < \epsilon$ for $n \geq N$. Choosing $N' = \max\{N, K+1\}$, we have $|b_n - L| < \epsilon$ for $n \geq N'$.

## Negation of Convergence

Understanding the negation of the limit definition is crucial for proving divergence.

**Negation:** $(a_n)$ does **not** converge to $L$ if:

There exists $\epsilon > 0$ such that for all $N \in \mathbb{N}$, there exists $n \geq N$ with $|a_n - L| \geq \epsilon$.

**Example 10:** Show that $a_n = \frac{(-1)^n \cdot n}{n+1}$ does not converge to 0.

**Proof:** Let $\epsilon = 1/2$. For any $N$, choose $n > N$ even. Then:
$$
\left|a_n - 0\right| = \frac{n}{n+1} > \frac{n}{2n} = \frac{1}{2} = \epsilon
$$

So infinitely many terms lie outside $(-\epsilon, \epsilon)$.

## Working with Square Roots

### Example 11: $\lim_{n \to \infty} \frac{1}{\sqrt{n}} = 0$

**Proof:** Let $\epsilon > 0$. We need $\frac{1}{\sqrt{n}} < \epsilon$, which holds when $n > \frac{1}{\epsilon^2}$.

Choose $N > \frac{1}{\epsilon^2}$. Then for $n \geq N$:
$$
\frac{1}{\sqrt{n}} \leq \frac{1}{\sqrt{N}} < \epsilon
$$

### Example 12: $\lim_{n \to \infty} \sqrt{n+1} - \sqrt{n} = 0$

**Proof:** We rationalize:
$$
\sqrt{n+1} - \sqrt{n} = \frac{(\sqrt{n+1} - \sqrt{n})(\sqrt{n+1} + \sqrt{n})}{\sqrt{n+1} + \sqrt{n}} = \frac{1}{\sqrt{n+1} + \sqrt{n}} \leq \frac{1}{\sqrt{n}}
$$

Let $\epsilon > 0$. Choose $N > \frac{1}{\epsilon^2}$. Then for $n \geq N$:
$$
|\sqrt{n+1} - \sqrt{n}| \leq \frac{1}{\sqrt{n}} < \epsilon
$$

## Common Limits

The following limits are fundamental:

1. $\lim_{n \to \infty} \frac{1}{n^p} = 0$ for any $p > 0$
2. $\lim_{n \to \infty} r^n = 0$ for $|r| < 1$
3. $\lim_{n \to \infty} r^n = \infty$ for $r > 1$
4. $\lim_{n \to \infty} \sqrt[n]{n} = 1$
5. $\lim_{n \to \infty} \sqrt[n]{a} = 1$ for $a > 0$

We'll prove some of these using limit theorems in the next section.

## Exercises

1. Prove directly from the definition that $\lim_{n \to \infty} \frac{3n + 5}{2n + 1} = \frac{3}{2}$.

2. Show that $\lim_{n \to \infty} \frac{n^2}{2^n} = 0$.

3. Prove that if $a_n \to L$ and $L > 0$, then $a_n > 0$ for all sufficiently large $n$.

4. Give an example of a sequence that is unbounded but does not diverge to $\pm \infty$.

5. Prove that $\lim_{n \to \infty} \frac{\sin(n)}{n} = 0$.

## Conclusion

The $\epsilon$-$N$ definition of convergence is the cornerstone of real analysis. Mastering epsilon-delta arguments is essential for understanding limits, continuity, and differentiation. In the next section, we develop theorems that make computing limits more efficient.
