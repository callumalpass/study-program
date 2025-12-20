---
title: "Limit Theorems for Sequences"
slug: "limit-theorems"
description: "Algebraic properties of limits and squeeze theorem"
---

# Limit Theorems for Sequences

## Algebraic Limit Theorems

The following theorems allow us to compute limits of complex sequences from simpler ones.

**Theorem 3.1 (Limit Laws):** Suppose $\lim_{n \to \infty} a_n = A$ and $\lim_{n \to \infty} b_n = B$. Then:

1. **Sum Rule:** $\lim_{n \to \infty} (a_n + b_n) = A + B$
2. **Difference Rule:** $\lim_{n \to \infty} (a_n - b_n) = A - B$
3. **Product Rule:** $\lim_{n \to \infty} (a_n b_n) = AB$
4. **Constant Multiple:** $\lim_{n \to \infty} (c a_n) = cA$ for any $c \in \mathbb{R}$
5. **Quotient Rule:** If $B \neq 0$, then $\lim_{n \to \infty} \frac{a_n}{b_n} = \frac{A}{B}$

### Proof of Sum Rule

**Proof:** Let $\epsilon > 0$. Since $a_n \to A$, there exists $N_1$ such that for $n \geq N_1$:
$$
|a_n - A| < \frac{\epsilon}{2}
$$

Since $b_n \to B$, there exists $N_2$ such that for $n \geq N_2$:
$$
|b_n - B| < \frac{\epsilon}{2}
$$

Let $N = \max\{N_1, N_2\}$. For $n \geq N$:
$$
|(a_n + b_n) - (A + B)| = |(a_n - A) + (b_n - B)| \leq |a_n - A| + |b_n - B| < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

Therefore, $\lim_{n \to \infty} (a_n + b_n) = A + B$.

### Proof of Product Rule

**Proof:** We use the identity:
$$
a_n b_n - AB = a_n b_n - a_n B + a_n B - AB = a_n(b_n - B) + B(a_n - A)
$$

Since $(a_n)$ converges, it is bounded: $|a_n| \leq M$ for some $M > 0$ and all $n$.

Let $\epsilon > 0$. Choose $N_1$ such that for $n \geq N_1$:
$$
|a_n - A| < \frac{\epsilon}{2(|B| + 1)}
$$

Choose $N_2$ such that for $n \geq N_2$:
$$
|b_n - B| < \frac{\epsilon}{2M}
$$

Let $N = \max\{N_1, N_2\}$. For $n \geq N$:
$$
|a_n b_n - AB| \leq |a_n||b_n - B| + |B||a_n - A| < M \cdot \frac{\epsilon}{2M} + |B| \cdot \frac{\epsilon}{2(|B|+1)} < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon
$$

### Proof of Quotient Rule

**Proof:** It suffices to show that if $b_n \to B \neq 0$, then $\frac{1}{b_n} \to \frac{1}{B}$. The general quotient rule follows by applying the product rule to $a_n \cdot \frac{1}{b_n}$.

**Lemma 3.2:** If $b_n \to B$ with $B \neq 0$, then $\frac{1}{b_n} \to \frac{1}{B}$.

**Proof of Lemma:** Since $b_n \to B$ and $B \neq 0$, there exists $N_0$ such that for $n \geq N_0$:
$$
|b_n - B| < \frac{|B|}{2}
$$

By the reverse triangle inequality, $|b_n| \geq |B| - |b_n - B| > |B| - \frac{|B|}{2} = \frac{|B|}{2}$.

Now, for $n \geq N_0$:
$$
\left|\frac{1}{b_n} - \frac{1}{B}\right| = \frac{|b_n - B|}{|b_n||B|} < \frac{|b_n - B|}{|B|^2/2} = \frac{2|b_n - B|}{|B|^2}
$$

Let $\epsilon > 0$. Choose $N \geq N_0$ such that for $n \geq N$:
$$
|b_n - B| < \frac{|B|^2 \epsilon}{2}
$$

Then for $n \geq N$:
$$
\left|\frac{1}{b_n} - \frac{1}{B}\right| < \frac{2}{|B|^2} \cdot \frac{|B|^2 \epsilon}{2} = \epsilon
$$

## Applications of Limit Laws

### Example 1: Polynomial Limits

Find $\lim_{n \to \infty} \frac{3n^2 + 5n + 1}{2n^2 + n + 7}$.

**Solution:** Divide numerator and denominator by $n^2$:
$$
\frac{3n^2 + 5n + 1}{2n^2 + n + 7} = \frac{3 + \frac{5}{n} + \frac{1}{n^2}}{2 + \frac{1}{n} + \frac{7}{n^2}}
$$

Since $\frac{1}{n} \to 0$ and $\frac{1}{n^2} \to 0$, by limit laws:
$$
\lim_{n \to \infty} \frac{3 + \frac{5}{n} + \frac{1}{n^2}}{2 + \frac{1}{n} + \frac{7}{n^2}} = \frac{3 + 0 + 0}{2 + 0 + 0} = \frac{3}{2}
$$

### Example 2: Square Root Limits

Find $\lim_{n \to \infty} \frac{\sqrt{n^2 + n}}{n}$.

**Solution:**
$$
\frac{\sqrt{n^2 + n}}{n} = \frac{\sqrt{n^2(1 + \frac{1}{n})}}{n} = \sqrt{1 + \frac{1}{n}}
$$

Since $\frac{1}{n} \to 0$ and the square root function is continuous (we'll prove this rigorously later):
$$
\lim_{n \to \infty} \sqrt{1 + \frac{1}{n}} = \sqrt{1 + 0} = 1
$$

## Order Properties of Limits

**Theorem 3.3 (Order Limit Theorem):** Suppose $a_n \to A$ and $b_n \to B$.

1. If $a_n \leq b_n$ for all $n \geq N_0$, then $A \leq B$
2. If $a_n < b_n$ for all $n$, we can only conclude $A \leq B$ (not $A < B$!)

**Proof of (1):** Suppose, for contradiction, that $A > B$. Let $\epsilon = \frac{A - B}{2} > 0$.

There exists $N_1$ such that for $n \geq N_1$, $|a_n - A| < \epsilon$, so $a_n > A - \epsilon$.

There exists $N_2$ such that for $n \geq N_2$, $|b_n - B| < \epsilon$, so $b_n < B + \epsilon$.

Let $N = \max\{N_0, N_1, N_2\}$. Then for $n \geq N$:
$$
a_n > A - \epsilon = A - \frac{A-B}{2} = \frac{A+B}{2} = B + \frac{A-B}{2} = B + \epsilon > b_n
$$

This contradicts $a_n \leq b_n$.

**Example:** Let $a_n = 0$ and $b_n = \frac{1}{n}$. Then $a_n < b_n$ for all $n$, but $\lim a_n = \lim b_n = 0$.

**Corollary 3.4:** If $a_n \to A$ and $a_n \geq 0$ for all $n$, then $A \geq 0$.

## Squeeze Theorem

**Theorem 3.5 (Squeeze Theorem):** Suppose $a_n \leq b_n \leq c_n$ for all $n \geq N_0$ and $\lim_{n \to \infty} a_n = \lim_{n \to \infty} c_n = L$. Then $\lim_{n \to \infty} b_n = L$.

**Proof:** Let $\epsilon > 0$. There exists $N_1 \geq N_0$ such that for $n \geq N_1$:
$$
L - \epsilon < a_n < L + \epsilon
$$

There exists $N_2 \geq N_0$ such that for $n \geq N_2$:
$$
L - \epsilon < c_n < L + \epsilon
$$

Let $N = \max\{N_1, N_2\}$. For $n \geq N$:
$$
L - \epsilon < a_n \leq b_n \leq c_n < L + \epsilon
$$

Thus, $|b_n - L| < \epsilon$.

### Applications of Squeeze Theorem

**Example 3:** Prove $\lim_{n \to \infty} \frac{\sin n}{n} = 0$.

**Proof:** Since $-1 \leq \sin n \leq 1$:
$$
-\frac{1}{n} \leq \frac{\sin n}{n} \leq \frac{1}{n}
$$

Since $\lim_{n \to \infty} \pm\frac{1}{n} = 0$, by the squeeze theorem, $\lim_{n \to \infty} \frac{\sin n}{n} = 0$.

**Example 4:** Prove $\lim_{n \to \infty} \frac{n!}{n^n} = 0$.

**Proof:** For $n \geq 2$:
$$
0 < \frac{n!}{n^n} = \frac{n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1}{n \cdot n \cdot n \cdots n \cdot n} = \frac{n}{n} \cdot \frac{n-1}{n} \cdot \frac{n-2}{n} \cdots \frac{2}{n} \cdot \frac{1}{n} \leq \frac{1}{n}
$$

Since $\frac{1}{n} \to 0$, by the squeeze theorem, $\frac{n!}{n^n} \to 0$.

**Example 5:** Prove $\lim_{n \to \infty} \sqrt[n]{n} = 1$.

**Proof:** Write $\sqrt[n]{n} = 1 + h_n$ where $h_n \geq 0$. Then:
$$
n = (1 + h_n)^n \geq \binom{n}{2} h_n^2 = \frac{n(n-1)}{2} h_n^2
$$

For $n \geq 2$:
$$
h_n^2 \leq \frac{2n}{n(n-1)} = \frac{2}{n-1}
$$

Thus, $0 \leq h_n \leq \sqrt{\frac{2}{n-1}} \to 0$. By the squeeze theorem, $h_n \to 0$, so $\sqrt[n]{n} \to 1$.

## Absolute Value and Limits

**Theorem 3.6:** If $a_n \to A$, then $|a_n| \to |A|$.

**Proof:** By the reverse triangle inequality:
$$
||a_n| - |A|| \leq |a_n - A|
$$

Let $\epsilon > 0$. Choose $N$ such that for $n \geq N$, $|a_n - A| < \epsilon$. Then:
$$
||a_n| - |A|| < \epsilon
$$

**Remark:** The converse is false: $|(-1)^n| = 1 \to 1$, but $(-1)^n$ does not converge.

**Theorem 3.7:** If $|a_n| \to 0$, then $a_n \to 0$.

**Proof:** We have $-|a_n| \leq a_n \leq |a_n|$. Since $|a_n| \to 0$, by the squeeze theorem, $a_n \to 0$.

## Limits of Powers and Roots

**Theorem 3.8:** If $a_n \to A$ and $A > 0$, then for any $r \in \mathbb{Q}$:
$$
\lim_{n \to \infty} a_n^r = A^r
$$

**Proof sketch:** For $r = \frac{p}{q}$ with $p, q \in \mathbb{Z}$ and $q > 0$, we need to show:
$$
\lim_{n \to \infty} (a_n^{1/q})^p = (A^{1/q})^p
$$

First, show $a_n^{1/q} \to A^{1/q}$ using the identity:
$$
|a_n^{1/q} - A^{1/q}| = \frac{|a_n - A|}{|a_n^{(q-1)/q} + a_n^{(q-2)/q} A^{1/q} + \cdots + A^{(q-1)/q}|}
$$

The denominator is bounded away from zero for $n$ large (since $a_n \to A > 0$), allowing us to control the difference. Then apply the product rule repeatedly for the power $p$.

## Growth Rates

**Theorem 3.9 (Hierarchy of Growth):** For $a > 1$, $p > 0$, and $q > 0$:
$$
\lim_{n \to \infty} \frac{n^p}{a^n} = 0 \quad \text{and} \quad \lim_{n \to \infty} \frac{(\log n)^q}{n^p} = 0
$$

These show: logarithms grow slower than polynomials, which grow slower than exponentials.

**Proof of first limit:** Let $a = 1 + h$ with $h > 0$. For $n > 2p$:
$$
a^n = (1+h)^n \geq \binom{n}{k} h^k
$$
where $k = \lceil p + 1 \rceil$. Choose $k$ such that $\binom{n}{k} h^k > n^p$ for large $n$.

## Common Limit Computations

**Example 6:** $\lim_{n \to \infty} \frac{2^n + 3^n}{4^n} = 0$

**Solution:**
$$
\frac{2^n + 3^n}{4^n} = \left(\frac{1}{2}\right)^n + \left(\frac{3}{4}\right)^n \to 0 + 0 = 0
$$

**Example 7:** $\lim_{n \to \infty} \frac{n^2 + 2^n}{3^n + n^3} = \frac{1}{3}$

**Solution:** Divide by $3^n$:
$$
\frac{n^2 + 2^n}{3^n + n^3} = \frac{\frac{n^2}{3^n} + \frac{2^n}{3^n}}{1 + \frac{n^3}{3^n}} \to \frac{0 + 0}{1 + 0} = 0
$$

Wait, let me recalculate. The dominant term in the numerator is $2^n$ and in the denominator is $3^n$:
$$
\frac{n^2 + 2^n}{3^n + n^3} \sim \frac{2^n}{3^n} = \left(\frac{2}{3}\right)^n \to 0
$$

## Exercises

1. Prove the constant multiple rule (Theorem 3.1, part 4) directly from the definition.

2. Find $\lim_{n \to \infty} \frac{n^3 + 2n^2 - 5}{4n^3 + n + 1}$ using limit laws.

3. Use the squeeze theorem to show $\lim_{n \to \infty} \frac{\cos(n^2)}{n} = 0$.

4. Prove that if $|r| > 1$, then $\lim_{n \to \infty} r^n$ does not exist (diverges to $\pm\infty$).

5. Show that $\lim_{n \to \infty} \sqrt[n]{a^n + b^n} = \max\{a, b\}$ for $a, b > 0$.

## Conclusion

The limit theorems transform the difficult task of using the $\epsilon$-$N$ definition repeatedly into algebraic manipulations. The squeeze theorem is particularly powerful for sequences involving oscillating or complex expressions. These tools, combined with our understanding of monotone sequences, form the foundation for analyzing sequence convergence.
