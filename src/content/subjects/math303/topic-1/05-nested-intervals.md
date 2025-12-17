---
title: "Nested Intervals Theorem"
slug: "nested-intervals"
description: "The fundamental property of nested closed intervals in complete spaces"
---

# Nested Intervals Theorem

## Closed and Open Intervals

**Definition:** For $a, b \in \mathbb{R}$ with $a < b$:

- The **closed interval** $[a, b] = \{x \in \mathbb{R} : a \leq x \leq b\}$
- The **open interval** $(a, b) = \{x \in \mathbb{R} : a < x < b\}$
- The **half-open intervals** $[a, b) = \{x : a \leq x < b\}$ and $(a, b] = \{x : a < x \leq b\}$

The **length** of an interval $[a, b]$ is $b - a$.

## The Nested Intervals Theorem

**Theorem 5.1 (Nested Intervals Theorem - NIT):** Let $\{I_n\}_{n=1}^{\infty}$ be a sequence of closed, bounded intervals such that $I_{n+1} \subseteq I_n$ for all $n \in \mathbb{N}$. Then:
$$
\bigcap_{n=1}^{\infty} I_n \neq \emptyset
$$

Moreover, if the lengths of the intervals tend to zero, the intersection contains exactly one point.

**Proof:** Write $I_n = [a_n, b_n]$. The nesting condition $I_{n+1} \subseteq I_n$ means:
$$
[a_{n+1}, b_{n+1}] \subseteq [a_n, b_n]
$$

This implies $a_n \leq a_{n+1} \leq b_{n+1} \leq b_n$ for all $n$.

Therefore:
- The sequence $(a_n)$ is increasing: $a_1 \leq a_2 \leq a_3 \leq \cdots$
- The sequence $(b_n)$ is decreasing: $b_1 \geq b_2 \geq b_3 \geq \cdots$
- For all $m, n$: $a_m \leq b_n$ (since if $m \leq n$, then $a_m \leq a_n \leq b_n$; if $n < m$, then $a_m \leq b_m \leq b_n$)

Let $A = \{a_n : n \in \mathbb{N}\}$ and $B = \{b_n : n \in \mathbb{N}\}$. Since every $b_n$ is an upper bound for $A$, the set $A$ is bounded above. By completeness, let $\alpha = \sup A$.

Since $b_1$ is an upper bound for $A$, we have $\alpha \leq b_1$. Also, $a_1 \leq \alpha$ (as $a_1 \in A$). Therefore, $a_1 \leq \alpha \leq b_1$.

For any $n \in \mathbb{N}$:
- Since $a_n \in A$, we have $a_n \leq \alpha$
- Since $\alpha$ is the least upper bound and $a_n \leq a_k$ for all $k \geq n$, and $a_k \leq b_n$ for all $k$, we have $\alpha \leq b_n$

Thus $\alpha \in [a_n, b_n]$ for all $n$, so $\alpha \in \bigcap_{n=1}^{\infty} I_n$.

**Uniqueness when lengths tend to zero:** Suppose $\lim_{n \to \infty} (b_n - a_n) = 0$. If $x, y \in \bigcap_{n=1}^{\infty} I_n$, then for all $n$:
$$
|x - y| \leq b_n - a_n
$$

As $n \to \infty$, $b_n - a_n \to 0$, so $|x - y| = 0$, thus $x = y$.

**Remark:** The condition that intervals be closed is essential.

## Counterexamples

### Open Intervals

**Example 5.2:** Consider $I_n = (0, \frac{1}{n})$ for $n \in \mathbb{N}$. Then $I_{n+1} \subseteq I_n$, but:
$$
\bigcap_{n=1}^{\infty} I_n = \emptyset
$$

**Proof:** If $x \in \bigcap_{n=1}^{\infty} I_n$, then $0 < x < \frac{1}{n}$ for all $n$. By the Archimedean property, there exists $N$ with $\frac{1}{N} < x$, contradicting $x < \frac{1}{N}$.

### Unbounded Intervals

**Example 5.3:** Consider $I_n = [n, \infty)$. Then $I_{n+1} \subseteq I_n$, but:
$$
\bigcap_{n=1}^{\infty} I_n = \emptyset
$$

**Proof:** If $x \in \bigcap_{n=1}^{\infty} I_n$, then $x \geq n$ for all $n \in \mathbb{N}$, contradicting the Archimedean property.

## Applications

### Application 1: Existence of Real Numbers

The NIT can be used to prove the existence of certain real numbers.

**Proposition 5.4:** There exists $x \in \mathbb{R}$ such that $x^2 = 2$.

**Proof:** Define sequences $(a_n)$ and $(b_n)$ as follows:
- $a_1 = 1$, $b_1 = 2$
- Given $[a_n, b_n]$, let $m_n = \frac{a_n + b_n}{2}$ (midpoint)
  - If $m_n^2 < 2$, set $a_{n+1} = m_n$, $b_{n+1} = b_n$
  - If $m_n^2 \geq 2$, set $a_{n+1} = a_n$, $b_{n+1} = m_n$

Let $I_n = [a_n, b_n]$. Then:
- $I_{n+1} \subseteq I_n$
- $a_n^2 < 2 < b_n^2$ for all $n$
- $b_n - a_n = \frac{1}{2^{n-1}}$

By NIT, there exists unique $x \in \bigcap_{n=1}^{\infty} I_n$. For any $n$:
$$
a_n \leq x \leq b_n
$$

Thus:
$$
a_n^2 \leq x^2 \leq b_n^2
$$

Since $a_n^2 < 2 < b_n^2$ and $b_n^2 - a_n^2 = (b_n - a_n)(b_n + a_n) \leq \frac{3}{2^{n-1}} \to 0$, we must have $x^2 = 2$.

### Application 2: Decimal Expansions

**Theorem 5.5:** Every real number in $[0, 1]$ has a decimal expansion.

**Proof:** Given $x \in [0, 1]$, we construct intervals $I_n = [a_n, b_n]$ where:
$$
a_n = 0.d_1d_2\cdots d_n = \sum_{k=1}^{n} \frac{d_k}{10^k}
$$

such that $x \in I_n$ and $b_n - a_n = \frac{1}{10^n}$.

Start with $I_0 = [0, 1]$. Given $I_n$, divide $[a_n, b_n]$ into 10 equal parts and choose the subinterval containing $x$. This determines the next digit $d_{n+1}$.

By NIT, $\bigcap_{n=1}^{\infty} I_n = \{x\}$, and:
$$
x = \sum_{k=1}^{\infty} \frac{d_k}{10^k}
$$

### Application 3: Fixed Point Theorem

**Theorem 5.6:** Let $f: [0, 1] \to [0, 1]$ be a function satisfying:
$$
|f(x) - f(y)| \leq \frac{1}{2}|x - y|
$$
for all $x, y \in [0, 1]$. Then $f$ has a unique fixed point (i.e., there exists unique $x^*$ with $f(x^*) = x^*$).

**Proof:** Define $I_1 = [0, 1]$. Given $I_n = [a_n, b_n]$, let $m_n = \frac{a_n + b_n}{2}$.

Consider the function $g(x) = f(x) - x$. We have:
$$
g(a_n) = f(a_n) - a_n \geq 0 \quad \text{or} \quad g(b_n) = f(b_n) - b_n \leq 0
$$

(since $f$ maps $[a_n, b_n]$ into $[0, 1] \subseteq [a_n, b_n]$ if the interval is chosen carefully).

Actually, let's use a direct construction:
- $x_1 = 1/2$
- $x_{n+1} = f(x_n)$

We have:
$$
|x_{n+1} - x_n| = |f(x_n) - f(x_{n-1})| \leq \frac{1}{2}|x_n - x_{n-1}| \leq \frac{1}{2^{n-1}}|x_2 - x_1|
$$

Let $I_n = [x_n - \epsilon_n, x_n + \epsilon_n]$ where $\epsilon_n = 2^{-n}$. Then $I_n$ forms nested intervals, and by NIT, there exists $x^* \in \bigcap I_n$.

Taking $n \to \infty$ in $x_{n+1} = f(x_n)$ gives $x^* = f(x^*)$.

## Relationship to Completeness

**Theorem 5.7:** The following are equivalent for an ordered field $F$:

1. $F$ satisfies the completeness axiom
2. $F$ satisfies the Nested Intervals Theorem
3. $F$ satisfies the Bolzano-Weierstrass Theorem (every bounded sequence has a convergent subsequence)
4. $F$ satisfies the Cauchy Criterion (every Cauchy sequence converges)

We have proven $(1) \Rightarrow (2)$. The other implications will be established when we study sequences.

## Cantor's Intersection Theorem

The NIT generalizes to arbitrary closed, bounded sets.

**Theorem 5.8 (Cantor's Intersection Theorem):** Let $\{F_n\}_{n=1}^{\infty}$ be a sequence of nonempty, closed, bounded subsets of $\mathbb{R}$ with $F_{n+1} \subseteq F_n$ for all $n$. Then:
$$
\bigcap_{n=1}^{\infty} F_n \neq \emptyset
$$

**Proof sketch:** For each $n$, since $F_n$ is bounded, it is contained in some interval $[a_n, b_n]$. We can choose these intervals to be nested. By NIT, there exists $x \in \bigcap [a_n, b_n]$. Using the closedness of $F_n$ and taking limits, we can show $x \in \bigcap F_n$.

## Nested Intervals in Higher Dimensions

**Theorem 5.9:** The NIT extends to $\mathbb{R}^n$. If $I_k = [a_1^{(k)}, b_1^{(k)}] \times \cdots \times [a_n^{(k)}, b_n^{(k)}]$ are nested closed, bounded "boxes" in $\mathbb{R}^n$, then $\bigcap_{k=1}^{\infty} I_k \neq \emptyset$.

**Proof:** Apply NIT to each coordinate separately to find $x_i \in \bigcap_{k=1}^{\infty} [a_i^{(k)}, b_i^{(k)}]$ for $i = 1, \ldots, n$. Then $(x_1, \ldots, x_n) \in \bigcap_{k=1}^{\infty} I_k$.

## Exercises

1. Prove directly (without NIT) that if $(a_n)$ is increasing and bounded above, then it converges.

2. Show that if $I_n = [a_n, b_n]$ are nested and $\bigcap I_n = \{c\}$, then $\lim a_n = \lim b_n = c$.

3. Construct nested intervals whose intersection is the Cantor set.

4. Give an example of nested closed intervals $I_n$ such that $\bigcap_{n=1}^{\infty} I_n$ is uncountably infinite.

5. Prove that the NIT fails for $\mathbb{Q}$: find nested closed intervals (with rational endpoints) in $\mathbb{Q}$ whose intersection is empty.

## Conclusion

The Nested Intervals Theorem is a powerful consequence of completeness, equivalent to several other fundamental properties of $\mathbb{R}$. It provides a constructive method for proving existence of real numbers and appears throughout analysis, from the construction of special numbers to fixed-point theorems and the theory of compact sets.
