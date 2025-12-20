---
id: math403-topic-5-3
title: "Heine-Borel Theorem"
order: 3
---

# The Heine-Borel Theorem

The Heine-Borel theorem characterizes compact subsets of Euclidean space and is one of the most important results in real analysis and topology. It provides a concrete, easily verifiable criterion for compactness in the most commonly encountered setting.

## Statement of the Theorem

**Theorem (Heine-Borel):** A subset of $\mathbb{R}^n$ is compact if and only if it is closed and bounded.

This elegant characterization makes it straightforward to determine whether a given subset of Euclidean space is compact. However, it is crucial to understand that this theorem does NOT hold in general metric or topological spaces—it is a special property of finite-dimensional Euclidean spaces.

## Historical Context

The theorem is named after Eduard Heine and Émile Borel, who proved versions of this result in the late 19th century. Heine proved in 1872 that continuous functions on closed bounded intervals are uniformly continuous, implicitly using the compactness of such intervals. Borel explicitly formulated the covering property in 1895. The modern synthesis recognizes that "closed and bounded" in $\mathbb{R}^n$ is equivalent to the topological notion of compactness.

## Proof for the Real Line

**Theorem:** A subset K of $\mathbb{R}$ is compact if and only if K is closed and bounded.

### Proof (⇒): Compact implies closed and bounded

Suppose K is compact. We prove both properties.

**K is bounded:** Consider the open cover $\{(-n, n) : n \in \mathbb{N}\}$ of K. Since K is compact, finitely many of these intervals cover K. If we take intervals up to $(-N, N)$, then $K \subseteq (-N, N)$, so K is bounded.

More precisely, since $K \subseteq \bigcup_{i=1}^{k} (-n_i, n_i)$ for finitely many $n_i$, we have $K \subseteq (-M, M)$ where $M = \max\{n_1, \ldots, n_k\}$.

**K is closed:** We show $\mathbb{R} \setminus K$ is open. Let $x \notin K$. For each $y \in K$, since $x \neq y$, choose $\epsilon_y = |x - y|/2 > 0$ and consider the intervals:
- $U_y = (x - \epsilon_y, x + \epsilon_y)$, an open interval containing x
- $V_y = (y - \epsilon_y, y + \epsilon_y)$, an open interval containing y

These intervals are disjoint by construction (since $\epsilon_y$ is half the distance from x to y).

The collection $\{V_y : y \in K\}$ is an open cover of K. By compactness, finitely many suffice:
$$K \subseteq V_{y_1} \cup V_{y_2} \cup \cdots \cup V_{y_n}$$

Now let $U = U_{y_1} \cap U_{y_2} \cap \cdots \cap U_{y_n}$. This is a finite intersection of open sets containing x, hence open and containing x. Moreover, U is disjoint from each $V_{y_i}$, and therefore disjoint from K.

Since every point outside K has an open neighborhood disjoint from K, $\mathbb{R} \setminus K$ is open, so K is closed.

### Proof (⇐): Closed and bounded implies compact

Let K be closed and bounded. Since K is bounded, $K \subseteq [a, b]$ for some interval [a,b]. We first establish that [a,b] is compact (see next section), then use the fact that closed subsets of compact spaces are compact.

Since [a,b] is compact and K is a closed subset of [a,b], K is compact.

## Proof that [a,b] is Compact

This is the fundamental result that underlies the Heine-Borel theorem.

**Theorem:** Every closed bounded interval [a,b] is compact.

*Proof by bisection (contradiction):*

Suppose $\mathcal{U}$ is an open cover of [a,b] with no finite subcover. We construct a nested sequence of intervals, each lacking a finite subcover, and derive a contradiction.

**Construction:**
1. Let $I_0 = [a,b]$, which has no finite subcover by assumption
2. Bisect $I_0$ into $[a, \frac{a+b}{2}]$ and $[\frac{a+b}{2}, b]$
3. At least one half has no finite subcover (if both did, their union would have a finite subcover). Call this half $I_1$.
4. Continue inductively: bisect $I_n$ and let $I_{n+1}$ be a half with no finite subcover
5. We obtain a nested sequence $I_0 \supseteq I_1 \supseteq I_2 \supseteq \cdots$
6. The lengths satisfy $|I_n| = \frac{b-a}{2^n} \to 0$ as $n \to \infty$

**Applying the Nested Interval Property:**

By the completeness of $\mathbb{R}$ (the Nested Interval Property), we have:
$$\bigcap_{n=0}^\infty I_n = \{x_0\}$$
for some unique point $x_0 \in [a,b]$.

**Deriving the contradiction:**

Since $\mathcal{U}$ covers [a,b], some $U \in \mathcal{U}$ contains $x_0$. Since U is open, there exists $\epsilon > 0$ with $(x_0 - \epsilon, x_0 + \epsilon) \subseteq U$.

For sufficiently large n, $|I_n| = \frac{b-a}{2^n} < \epsilon$. Since $x_0 \in I_n$ and $|I_n| < \epsilon$, we have $I_n \subseteq (x_0 - \epsilon, x_0 + \epsilon) \subseteq U$.

But this means the single set U covers $I_n$, contradicting our construction that $I_n$ has no finite subcover.

Therefore our assumption was wrong, and [a,b] is compact.

## Generalization to $\mathbb{R}^n$

**Theorem:** A subset of $\mathbb{R}^n$ is compact if and only if it is closed and bounded.

*Proof:*

**(⇒)** The proof that compact implies closed and bounded generalizes directly from the one-dimensional case.

**(⇐)** Let K be closed and bounded in $\mathbb{R}^n$. Since K is bounded, $K \subseteq [-M, M]^n$ for some $M > 0$.

The cube $[-M, M]^n$ is compact by Tychonoff's theorem: it is the product of n compact intervals, and products of compact spaces are compact.

Since K is a closed subset of the compact space $[-M, M]^n$, K is compact.

## Failure in Infinite Dimensions

The Heine-Borel theorem is fundamentally a finite-dimensional result. It fails dramatically in infinite-dimensional spaces.

**Example:** Consider the Hilbert space $\ell^2 = \{(x_1, x_2, \ldots) : \sum_{i=1}^\infty x_i^2 < \infty\}$ with the norm $\|x\| = \sqrt{\sum_{i=1}^\infty x_i^2}$.

The closed unit ball $B = \{x \in \ell^2 : \|x\| \leq 1\}$ is closed and bounded but NOT compact.

**Proof:** Consider the sequence of standard basis vectors:
$$e_n = (0, 0, \ldots, 0, \underbrace{1}_{n\text{th position}}, 0, \ldots)$$

Each $e_n$ is in B since $\|e_n\| = 1$. However, for $n \neq m$:
$$\|e_n - e_m\| = \sqrt{1^2 + 1^2} = \sqrt{2}$$

The sequence $(e_n)$ has no convergent subsequence because any two terms are distance $\sqrt{2}$ apart. This violates sequential compactness, hence B is not compact.

This failure is fundamental: in infinite-dimensional normed spaces, closed bounded sets are never compact unless they are also finite-dimensional.

## Applications

### Extreme Value Theorem

**Theorem:** If $f: K \to \mathbb{R}$ is continuous and K is compact, then f attains its maximum and minimum on K.

*Proof:* The image f(K) is compact in $\mathbb{R}$, hence closed and bounded by Heine-Borel. Being bounded, f(K) has a supremum M and infimum m. Being closed, f(K) contains M and m. Thus there exist points in K where f achieves these values.

### Uniform Continuity

**Theorem:** A continuous function on a compact metric space is uniformly continuous.

*Application:* Any continuous function on [a,b] is uniformly continuous. This is why we can approximate continuous functions by polynomials (Weierstrass approximation theorem).

### Bolzano-Weierstrass Theorem

**Theorem:** Every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence.

*Proof:* A bounded sequence lies in some compact box $[-M, M]^n$. In a compact metric space, every sequence has a convergent subsequence.

## Key Takeaways

- The Heine-Borel theorem states that subsets of $\mathbb{R}^n$ are compact iff closed and bounded
- The proof uses the nested interval property (completeness of $\mathbb{R}$)
- This characterization fails in infinite-dimensional spaces
- The theorem enables practical verification of compactness in Euclidean spaces
- Applications include the Extreme Value Theorem and uniform continuity results
