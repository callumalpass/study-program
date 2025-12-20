---
title: "The Archimedean Property"
slug: "archimedean-property"
description: "Natural numbers are unbounded and rationals are dense in the reals"
---

# The Archimedean Property

## Statement and Significance

The Archimedean property, named after the ancient Greek mathematician Archimedes, states that natural numbers are unbounded in $\mathbb{R}$. This seemingly simple fact has profound consequences throughout real analysis.

**Theorem 4.1 (Archimedean Property):** For any $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ such that $n > x$.

**Proof:** Suppose, for contradiction, that there exists $x \in \mathbb{R}$ such that $n \leq x$ for all $n \in \mathbb{N}$. Then $x$ is an upper bound for $\mathbb{N}$.

By the completeness axiom, $\mathbb{N}$ has a supremum; let $\alpha = \sup \mathbb{N}$.

Since $\alpha$ is the least upper bound and $1 > 0$, we have $\alpha - 1$ is not an upper bound for $\mathbb{N}$. Therefore, there exists $m \in \mathbb{N}$ such that:
$$
m > \alpha - 1
$$

But then $m + 1 \in \mathbb{N}$ and:
$$
m + 1 > \alpha
$$

This contradicts $\alpha$ being an upper bound for $\mathbb{N}$. Therefore, $\mathbb{N}$ is unbounded above.

**Remark:** The Archimedean property fails in non-standard models of the reals containing "infinitesimals" or "infinite numbers."

## Equivalent Formulations

**Theorem 4.2:** The following statements are equivalent:

1. For any $x \in \mathbb{R}$, there exists $n \in \mathbb{N}$ with $n > x$
2. For any $\epsilon > 0$, there exists $n \in \mathbb{N}$ with $\frac{1}{n} < \epsilon$
3. For any $x, y \in \mathbb{R}$ with $x > 0$, there exists $n \in \mathbb{N}$ with $nx > y$

**Proof:** $(1) \Rightarrow (2)$: Let $\epsilon > 0$. By (1), there exists $n \in \mathbb{N}$ with $n > \frac{1}{\epsilon}$. Since $n > 0$, we have $\frac{1}{n} < \epsilon$.

$(2) \Rightarrow (3)$: Let $x, y \in \mathbb{R}$ with $x > 0$. Let $\epsilon = \frac{x}{y+1}$ (handling $y \leq 0$ trivially). By (2), there exists $n$ with $\frac{1}{n} < \epsilon$, so:
$$
nx > n \cdot \frac{x}{y+1} = \frac{n}{y+1} > \frac{1}{\epsilon} = y+1 > y
$$

Actually, let's be more direct: Let $\epsilon = \frac{x}{y+1}$ if $y \geq 0$. By (2), choose $n$ with $\frac{1}{n} < \frac{x}{y+1}$. Then $nx > y+1 > y$.

For $y < 0$, take $n = 1$.

$(3) \Rightarrow (1)$: Let $x \in \mathbb{R}$. Apply (3) with $x = 1$ and $y = x$ to get $n \in \mathbb{N}$ with $n \cdot 1 > x$.

## Consequences

### Infinitesimals Do Not Exist

**Corollary 4.3:** There is no $\epsilon > 0$ in $\mathbb{R}$ such that $\epsilon < \frac{1}{n}$ for all $n \in \mathbb{N}$.

**Proof:** If such $\epsilon$ existed, then by formulation (2) of the Archimedean property, there would exist $m \in \mathbb{N}$ with $\frac{1}{m} < \epsilon$. But this contradicts $\epsilon < \frac{1}{m}$ for all $m$.

### Approximation by Integers

**Theorem 4.4:** For any $x \in \mathbb{R}$, there exists a unique $n \in \mathbb{Z}$ such that:
$$
n \leq x < n + 1
$$

This integer is denoted $\lfloor x \rfloor$ and called the **floor** of $x$.

**Proof (Existence):** Let $S = \{m \in \mathbb{Z} : m \leq x\}$.

First, $S \neq \emptyset$: By the Archimedean property, there exists $k \in \mathbb{N}$ with $k > -x$, so $-k < x$, thus $-k \in S$.

Second, $S$ is bounded above by $x$.

By the completeness axiom, $\alpha = \sup S$ exists. By Theorem 3.2, there is a sequence $(m_k)$ in $S$ with $m_k \to \alpha$. Since $S \subseteq \mathbb{Z}$ and $m_k \leq \alpha < m_k + 1$ eventually, there exists $n \in S$ with $n = \max S \cap [\alpha - 1, \alpha]$.

Actually, more directly: since $\alpha - 1$ is not an upper bound, there exists $n \in S$ with $n > \alpha - 1$. Since $n \in \mathbb{Z}$ and $n \leq \alpha$, we have $n \leq \alpha < n+1$. Since $\alpha = \sup S \geq x$ and $n$ is the largest integer in $S$, we have $n \leq x < n+1$.

**Uniqueness:** If $n, m \in \mathbb{Z}$ both satisfy $n \leq x < n+1$ and $m \leq x < m+1$, then:
$$
n \leq x < m + 1 \quad \text{and} \quad m \leq x < n + 1
$$
So $n < m + 1$ and $m < n + 1$, giving $n - m < 1$ and $m - n < 1$. Since $n - m \in \mathbb{Z}$, we have $n = m$.

Similarly, we define the **ceiling** $\lceil x \rceil$ as the unique integer satisfying:
$$
x \leq \lceil x \rceil < x + 1
$$

### Density of Rationals

One of the most important consequences of the Archimedean property is that $\mathbb{Q}$ is **dense** in $\mathbb{R}$.

**Theorem 4.5 (Density of $\mathbb{Q}$):** For any $x, y \in \mathbb{R}$ with $x < y$, there exists $r \in \mathbb{Q}$ such that $x < r < y$.

**Proof:** We have $y - x > 0$. By the Archimedean property (formulation 2), there exists $n \in \mathbb{N}$ such that:
$$
\frac{1}{n} < y - x
$$

Consider the set $S = \{k \in \mathbb{Z} : k > nx\}$. By the Archimedean property, $S \neq \emptyset$. Let $m$ be the smallest element of $S$ (which exists by the well-ordering principle). Then:
$$
m - 1 \leq nx < m
$$

Thus:
$$
x < \frac{m}{n} \leq x + \frac{1}{n} < x + (y - x) = y
$$

Therefore, $r = \frac{m}{n} \in \mathbb{Q}$ satisfies $x < r < y$.

**Corollary 4.6:** Between any two distinct real numbers, there exist infinitely many rational numbers.

**Proof:** Given $x < y$, by Theorem 4.5, there exists $r_1 \in \mathbb{Q}$ with $x < r_1 < y$. Then there exists $r_2 \in \mathbb{Q}$ with $r_1 < r_2 < y$, and so on.

### Density of Irrationals

**Theorem 4.7:** For any $x, y \in \mathbb{R}$ with $x < y$, there exists an irrational number $\alpha$ such that $x < \alpha < y$.

**Proof:** We have $\frac{x}{\sqrt{2}} < \frac{y}{\sqrt{2}}$. By Theorem 4.5, there exists $r \in \mathbb{Q}$ with:
$$
\frac{x}{\sqrt{2}} < r < \frac{y}{\sqrt{2}}
$$

Let $\alpha = r\sqrt{2}$. Then $x < \alpha < y$. Moreover, $\alpha$ is irrational (if $\alpha$ were rational, then $\alpha / r = \sqrt{2}$ would be rational, a contradiction).

**Remark:** Both $\mathbb{Q}$ and $\mathbb{R} \setminus \mathbb{Q}$ are dense in $\mathbb{R}$, yet $\mathbb{Q}$ is countable while $\mathbb{R} \setminus \mathbb{Q}$ is uncountable.

## Applications

### Application 1: Limits and Approximation

The Archimedean property is crucial for proving that $\lim_{n \to \infty} \frac{1}{n} = 0$.

**Proposition 4.8:** For any $\epsilon > 0$, there exists $N \in \mathbb{N}$ such that for all $n \geq N$:
$$
\left|\frac{1}{n}\right| < \epsilon
$$

**Proof:** By the Archimedean property (formulation 2), there exists $N \in \mathbb{N}$ with $\frac{1}{N} < \epsilon$. For any $n \geq N$:
$$
\frac{1}{n} \leq \frac{1}{N} < \epsilon
$$

### Application 2: Decimal Expansions

**Theorem 4.9:** Every real number has a decimal expansion.

**Proof sketch:** Given $x \in \mathbb{R}$, let $n_0 = \lfloor x \rfloor$. Then $0 \leq x - n_0 < 1$.

For the first decimal place, let $n_1 = \lfloor 10(x - n_0) \rfloor$. Then $0 \leq n_1 \leq 9$ and:
$$
n_1 \leq 10(x - n_0) < n_1 + 1
$$

So:
$$
\frac{n_1}{10} \leq x - n_0 < \frac{n_1 + 1}{10}
$$

Continuing, we construct $n_k \in \{0, 1, \ldots, 9\}$ such that:
$$
n_0 + \sum_{k=1}^{m} \frac{n_k}{10^k} \leq x < n_0 + \sum_{k=1}^{m} \frac{n_k}{10^k} + \frac{1}{10^m}
$$

As $m \to \infty$, $\frac{1}{10^m} \to 0$ by the Archimedean property, so the decimal expansion converges to $x$.

### Application 3: Approximation by Dyadic Rationals

**Theorem 4.10:** For any $x \in \mathbb{R}$ and $\epsilon > 0$, there exists a dyadic rational $\frac{k}{2^n}$ (where $k \in \mathbb{Z}$, $n \in \mathbb{N}$) such that:
$$
\left|x - \frac{k}{2^n}\right| < \epsilon
$$

**Proof:** By the Archimedean property, choose $n$ such that $\frac{1}{2^n} < \epsilon$. Let $k = \lfloor 2^n x \rfloor$. Then:
$$
k \leq 2^n x < k + 1
$$
$$
\frac{k}{2^n} \leq x < \frac{k+1}{2^n}
$$

Thus:
$$
\left|x - \frac{k}{2^n}\right| < \frac{1}{2^n} < \epsilon
$$

## Non-Archimedean Systems

To appreciate the Archimedean property, consider systems where it fails:

**Example:** The field of rational functions $\mathbb{R}(x)$ with the ordering where $x > r$ for all $r \in \mathbb{R}$ is non-Archimedean: no matter how many times we add 1 to itself, we cannot exceed $x$.

**Example:** In non-standard analysis, the hyperreals ${}^*\mathbb{R}$ contain infinite numbers $\omega$ such that $\omega > n$ for all $n \in \mathbb{N}$.

## Historical Note

Archimedes used a version of this principle (often called the "axiom of Archimedes") in his work on the measurement of circles. He showed that given two magnitudes, one can always find a multiple of the smaller that exceeds the larger.

## Exercises

1. Prove that for any $x > 0$, there exists $n \in \mathbb{N}$ such that $\frac{1}{n} < x < n$.

2. Show that $\lim_{n \to \infty} \frac{1}{n^2} = 0$ using the Archimedean property.

3. Prove that between any two distinct real numbers, there exist infinitely many irrationals.

4. Show that for any $x \in \mathbb{R}$ and $\epsilon > 0$, there exists $n \in \mathbb{N}$ and $p \in \mathbb{Z}$ such that $|x - p/n| < \epsilon$.

## Conclusion

The Archimedean property bridges the algebraic structure of $\mathbb{R}$ with its topological properties. It ensures that $\mathbb{N}$ is cofinal in $\mathbb{R}$, enabling approximation arguments that are fundamental to analysis. Together with completeness, it characterizes the real number system.
