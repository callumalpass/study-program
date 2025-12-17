---
title: "Countability and Cardinality"
slug: "countability"
description: "Countable and uncountable sets, Cantor's diagonal argument"
---

# Countability and Cardinality

## Cardinality and Bijections

**Definition:** Two sets $A$ and $B$ have the same **cardinality**, written $|A| = |B|$, if there exists a bijection $f: A \to B$.

**Definition:** A set $A$ is:
- **Finite** if $|A| = |\{1, 2, \ldots, n\}|$ for some $n \in \mathbb{N}$, or $A = \emptyset$
- **Countably infinite** if $|A| = |\mathbb{N}|$
- **Countable** if it is finite or countably infinite
- **Uncountable** if it is not countable

**Remark:** A set is countably infinite if and only if its elements can be listed as $a_1, a_2, a_3, \ldots$ (possibly with repetitions, but establishing a bijection).

## Countable Sets

**Theorem 6.1:** $\mathbb{N}$, $\mathbb{Z}$, and $\mathbb{Q}$ are all countably infinite.

**Proof for $\mathbb{Z}$:** Define $f: \mathbb{N} \to \mathbb{Z}$ by:
$$
f(n) = \begin{cases}
\frac{n}{2} & \text{if } n \text{ is even} \\
-\frac{n+1}{2} & \text{if } n \text{ is odd}
\end{cases}
$$

This gives the listing: $0, -1, 1, -2, 2, -3, 3, \ldots$

Explicitly: $f(0) = 0$, $f(1) = -1$, $f(2) = 1$, $f(3) = -2$, etc.

One can verify that $f$ is a bijection.

**Proof for $\mathbb{Q}$:** We first show $\mathbb{Q}^+ = \{r \in \mathbb{Q} : r > 0\}$ is countable.

Arrange all positive rationals in an array:
$$
\begin{array}{cccccc}
\frac{1}{1} & \frac{2}{1} & \frac{3}{1} & \frac{4}{1} & \frac{5}{1} & \cdots \\
\frac{1}{2} & \frac{2}{2} & \frac{3}{2} & \frac{4}{2} & \frac{5}{2} & \cdots \\
\frac{1}{3} & \frac{2}{3} & \frac{3}{3} & \frac{4}{3} & \frac{5}{3} & \cdots \\
\frac{1}{4} & \frac{2}{4} & \frac{3}{4} & \frac{4}{4} & \frac{5}{4} & \cdots \\
\vdots & \vdots & \vdots & \vdots & \vdots & \ddots
\end{array}
$$

Traverse this array diagonally: $\frac{1}{1}, \frac{2}{1}, \frac{1}{2}, \frac{1}{3}, \frac{2}{2}, \frac{3}{1}, \frac{4}{1}, \frac{3}{2}, \ldots$

Skip any fraction already encountered in reduced form. This produces an enumeration of $\mathbb{Q}^+$.

Since $\mathbb{Q} = \mathbb{Q}^+ \cup \{0\} \cup \mathbb{Q}^-$ and each part is countable, $\mathbb{Q}$ is countable.

### Properties of Countable Sets

**Theorem 6.2:** Any subset of a countable set is countable.

**Proof:** Let $A$ be countable and $B \subseteq A$. If $A$ is finite, so is $B$. If $A$ is countably infinite, list $A = \{a_1, a_2, a_3, \ldots\}$. The elements of $B$ appear in this list as some subsequence $\{a_{n_1}, a_{n_2}, a_{n_3}, \ldots\}$, which gives an enumeration of $B$.

**Theorem 6.3:** The union of countably many countable sets is countable.

**Proof:** Let $A_1, A_2, A_3, \ldots$ be countable sets. We can assume each is countably infinite (by absorbing finite sets). List each:
$$
\begin{align}
A_1 &= \{a_{11}, a_{12}, a_{13}, \ldots\} \\
A_2 &= \{a_{21}, a_{22}, a_{23}, \ldots\} \\
A_3 &= \{a_{31}, a_{32}, a_{33}, \ldots\} \\
&\vdots
\end{align}
$$

Arrange in an array and traverse diagonally (as with $\mathbb{Q}$):
$$
a_{11}, a_{21}, a_{12}, a_{31}, a_{22}, a_{13}, a_{41}, a_{32}, a_{23}, a_{14}, \ldots
$$

This enumerates $\bigcup_{n=1}^{\infty} A_n$.

**Corollary 6.4:** The set of algebraic numbers (roots of polynomials with integer coefficients) is countable.

**Proof:** For each $n$, the set of polynomials of degree $n$ with integer coefficients is countable (it's a subset of $\mathbb{Z}^{n+1}$, which is countable). Each polynomial has finitely many roots. Thus, the algebraic numbers form a countable union of finite sets, hence are countable.

**Theorem 6.5:** $\mathbb{N} \times \mathbb{N}$ is countable.

**Proof:** Define $f: \mathbb{N} \times \mathbb{N} \to \mathbb{N}$ by:
$$
f(m, n) = 2^m (2n + 1) - 1
$$

This is a bijection (uses unique prime factorization).

Alternatively, use the diagonal argument: $(1,1), (2,1), (1,2), (3,1), (2,2), (1,3), \ldots$

## Uncountable Sets

The most significant result in the theory of cardinality is that $\mathbb{R}$ is uncountable.

**Theorem 6.6 (Cantor, 1874):** The interval $(0, 1)$ is uncountable.

**Proof (Cantor's Diagonal Argument):** Suppose, for contradiction, that $(0, 1)$ is countable. Then we can list all elements:
$$
\begin{align}
x_1 &= 0.d_{11}d_{12}d_{13}d_{14}\ldots \\
x_2 &= 0.d_{21}d_{22}d_{23}d_{24}\ldots \\
x_3 &= 0.d_{31}d_{32}d_{33}d_{34}\ldots \\
x_4 &= 0.d_{41}d_{42}d_{43}d_{44}\ldots \\
&\vdots
\end{align}
$$

where $d_{ij} \in \{0, 1, 2, \ldots, 9\}$ are decimal digits.

Construct $y = 0.e_1e_2e_3e_4\ldots$ where:
$$
e_i = \begin{cases}
5 & \text{if } d_{ii} \neq 5 \\
6 & \text{if } d_{ii} = 5
\end{cases}
$$

Then $y \in (0, 1)$, but $y \neq x_n$ for any $n$ because $y$ differs from $x_n$ in the $n$-th decimal place. This contradicts the assumption that our list contains all elements of $(0, 1)$.

**Corollary 6.7:** $\mathbb{R}$ is uncountable.

**Proof:** Since $(0, 1) \subseteq \mathbb{R}$ and $(0, 1)$ is uncountable, $\mathbb{R}$ is uncountable.

**Remark:** The diagonal argument is one of the most elegant proofs in mathematics. It shows that "most" real numbers are not algebraic (since algebraic numbers are countable).

### The Cardinality of $\mathbb{R}$

**Theorem 6.8:** $|(0, 1)| = |\mathbb{R}|$.

**Proof:** We construct an explicit bijection. Define $f: (0, 1) \to \mathbb{R}$ by:
$$
f(x) = \tan\left(\pi\left(x - \frac{1}{2}\right)\right)
$$

As $x$ ranges over $(0, 1)$, the expression $\pi(x - 1/2)$ ranges over $(-\pi/2, \pi/2)$, and $\tan$ maps this bijectively to $\mathbb{R}$.

**Theorem 6.9:** The set $2^{\mathbb{N}}$ of all subsets of $\mathbb{N}$ is uncountable.

**Proof:** Suppose $2^{\mathbb{N}}$ is countable, and list all subsets as $A_1, A_2, A_3, \ldots$

Define $B = \{n \in \mathbb{N} : n \notin A_n\}$. Then $B$ is a subset of $\mathbb{N}$, so $B = A_k$ for some $k$.

Is $k \in B$?
- If $k \in B$, then by definition of $B$, $k \notin A_k = B$, contradiction.
- If $k \notin B$, then $k \notin A_k$, so by definition, $k \in B$, contradiction.

Thus, our assumption is false, and $2^{\mathbb{N}}$ is uncountable.

**Theorem 6.10:** $|2^{\mathbb{N}}| = |\mathbb{R}|$.

**Proof sketch:** Every real number in $(0, 1)$ has a binary expansion $0.b_1b_2b_3\ldots$ where $b_i \in \{0, 1\}$. This corresponds to the subset $\{i : b_i = 1\} \subseteq \mathbb{N}$. With care about non-unique representations (e.g., $0.1000\ldots = 0.0111\ldots$ in binary), this establishes a bijection.

## Cardinality Hierarchy

**Cantor's Theorem:** For any set $A$, $|A| < |2^A|$ (the power set has strictly larger cardinality).

**Proof:** The map $a \mapsto \{a\}$ is an injection from $A$ to $2^A$, so $|A| \leq |2^A|$.

To show $|A| \neq |2^A|$, suppose $f: A \to 2^A$ is any function. Define:
$$
B = \{a \in A : a \notin f(a)\}
$$

If $f$ were surjective, then $B = f(b)$ for some $b \in A$. But:
- If $b \in B$, then $b \notin f(b) = B$, contradiction.
- If $b \notin B$, then $b \in f(b) = B$, contradiction.

Thus, $f$ is not surjective, so there is no bijection from $A$ to $2^A$.

This shows there are infinitely many levels of infinity:
$$
|\mathbb{N}| < |2^{\mathbb{N}}| < |2^{2^{\mathbb{N}}}| < \cdots
$$

The cardinality $|\mathbb{N}|$ is denoted $\aleph_0$ (aleph-null), and $|\mathbb{R}| = |2^{\mathbb{N}}|$ is denoted $\mathfrak{c}$ (the "continuum").

## The Continuum Hypothesis

**Continuum Hypothesis (CH):** There is no set $A$ such that $\aleph_0 < |A| < \mathfrak{c}$.

Equivalently, $\mathfrak{c} = \aleph_1$ (the next cardinal after $\aleph_0$).

**Theorem (Gödel 1940, Cohen 1963):** The Continuum Hypothesis is independent of the standard axioms of set theory (ZFC). It can neither be proved nor disproved from these axioms.

## Applications to Analysis

### Nowhere Dense Sets

**Definition:** A set $A \subseteq \mathbb{R}$ is **nowhere dense** if every interval contains a subinterval disjoint from $A$.

**Example:** The Cantor set is nowhere dense and uncountable.

### Baire Category Theorem

**Theorem 6.11 (Baire Category Theorem):** $\mathbb{R}$ cannot be written as a countable union of nowhere dense sets.

This has profound implications: the set of points where a sequence of continuous functions converges cannot always be arbitrary.

### Most Real Numbers are Transcendental

**Corollary 6.12:** The set of transcendental numbers (real numbers that are not algebraic) is uncountable.

**Proof:** The algebraic numbers are countable. If transcendental numbers were countable, then $\mathbb{R} =$ (algebraic) $\cup$ (transcendental) would be countable, a contradiction.

Thus, "most" real numbers are transcendental, even though we know very few specific examples (like $\pi$ and $e$).

## Uncountability and Measure

The concept of countability is intimately related to measure theory:

**Theorem 6.13:** Every countable set has Lebesgue measure zero.

However, there exist uncountable sets of measure zero (like the Cantor set), and measure-zero sets need not be countable.

## Historical Note

Cantor's discovery of different sizes of infinity was controversial in his time. Leopold Kronecker, a prominent mathematician, opposed Cantor's work, saying "God created the integers, all else is the work of man." Despite initial resistance, Cantor's set theory became the foundation of modern mathematics.

## Exercises

1. Prove that the set of all finite sequences of natural numbers is countable.

2. Show that $\mathbb{Q}^n$ (the $n$-dimensional rational space) is countable for any $n \in \mathbb{N}$.

3. Prove that the set of all continuous functions from $\mathbb{R}$ to $\mathbb{R}$ is uncountable.

4. Show that the set of irrational numbers is uncountable.

5. Prove that any open interval $(a, b)$ has the same cardinality as $\mathbb{R}$.

6. Show that the set of all countably infinite subsets of $\mathbb{N}$ is uncountable.

## Conclusion

The theory of countability reveals a fundamental distinction between $\mathbb{Q}$ and $\mathbb{R}$. While both are infinite and dense in $\mathbb{R}$, the rationals are "sparse" (countable) while the reals are "abundant" (uncountable). This distinction has profound implications throughout analysis, from measure theory to functional analysis.
