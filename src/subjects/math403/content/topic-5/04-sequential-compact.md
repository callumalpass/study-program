---
id: math403-topic-5-4
title: "Sequential Compactness"
order: 4
---

# Sequential Compactness

Sequential compactness provides an alternative characterization of compactness using sequences, which is often more intuitive and easier to work with in metric spaces. While the open cover definition of compactness is more general, sequential compactness captures the same idea in settings where sequences determine the topology.

## Definition

**Definition:** A topological space X is **sequentially compact** if every sequence in X has a convergent subsequence (with limit in X).

This definition directly generalizes the Bolzano-Weierstrass theorem: a subset of $\mathbb{R}^n$ is bounded if and only if every sequence in it has a convergent subsequence (possibly converging to a point outside the set). Sequential compactness adds the requirement that the limit must be in the space.

## Relationship to Compactness

In general topological spaces, sequential compactness and compactness are independent properties. Neither implies the other in full generality. However, they coincide in the most important cases.

**Theorem:** For metric spaces, the following are equivalent:
1. X is compact
2. X is sequentially compact
3. X is complete and totally bounded

This equivalence makes sequential compactness particularly useful in analysis, where metric spaces are the primary setting.

**Non-equivalence in general spaces:**
- There exist compact spaces that are not sequentially compact (e.g., the product $[0,1]^{[0,1]}$ with the product topology)
- There exist sequentially compact spaces that are not compact (e.g., the first uncountable ordinal $\omega_1$ with the order topology)

## Proof of Equivalence in Metric Spaces

### Compact ⟹ Sequentially Compact

Let $(x_n)$ be a sequence in a compact metric space X. We show it has a convergent subsequence.

Suppose for contradiction that no subsequence converges. Then for each point $x \in X$, there exists $\epsilon_x > 0$ such that the ball $B(x, \epsilon_x)$ contains only finitely many terms of the sequence. (If every ball around x contained infinitely many terms, we could extract a subsequence converging to x.)

The collection $\{B(x, \epsilon_x) : x \in X\}$ is an open cover of X. By compactness, finitely many balls cover X:
$$X \subseteq B(x_1, \epsilon_{x_1}) \cup B(x_2, \epsilon_{x_2}) \cup \cdots \cup B(x_k, \epsilon_{x_k})$$

But each ball contains only finitely many terms of the sequence, so finitely many balls can contain only finitely many terms total. This contradicts the fact that the sequence has infinitely many terms in X.

Therefore, some subsequence converges.

### Sequentially Compact ⟹ Totally Bounded

We prove the contrapositive: if X is not totally bounded, then X is not sequentially compact.

Suppose X is not totally bounded. Then there exists $\epsilon > 0$ such that X cannot be covered by finitely many $\epsilon$-balls. We construct a sequence with no convergent subsequence.

**Construction:**
- Pick any $x_1 \in X$
- Since $B(x_1, \epsilon)$ doesn't cover X, pick $x_2 \in X \setminus B(x_1, \epsilon)$
- Since $B(x_1, \epsilon) \cup B(x_2, \epsilon)$ doesn't cover X, pick $x_3$ outside both balls
- Continue inductively

The resulting sequence $(x_n)$ satisfies $d(x_n, x_m) \geq \epsilon$ whenever $n \neq m$. No subsequence can be Cauchy, hence no subsequence converges.

### Sequentially Compact ⟹ Complete

Let $(x_n)$ be a Cauchy sequence in a sequentially compact space X. By sequential compactness, some subsequence $(x_{n_k})$ converges to some $x \in X$.

We claim the entire sequence converges to x. Given $\epsilon > 0$:
- Since $(x_n)$ is Cauchy, there exists N such that $d(x_n, x_m) < \epsilon/2$ for all $n, m > N$
- Since $x_{n_k} \to x$, there exists K with $n_K > N$ and $d(x_{n_K}, x) < \epsilon/2$

For any $n > N$:
$$d(x_n, x) \leq d(x_n, x_{n_K}) + d(x_{n_K}, x) < \epsilon/2 + \epsilon/2 = \epsilon$$

Thus $x_n \to x$, and X is complete.

### Complete + Totally Bounded ⟹ Compact

This direction uses the Lebesgue covering lemma. Let $\mathcal{U}$ be an open cover of a complete, totally bounded space X.

By the Lebesgue covering lemma (which can be proved for complete totally bounded spaces), there exists $\delta > 0$ such that every set of diameter less than $\delta$ is contained in some member of $\mathcal{U}$.

Since X is totally bounded, we can cover X by finitely many balls of radius $\delta/3$. Each such ball has diameter less than $\delta$, so is contained in some $U \in \mathcal{U}$. Taking the corresponding finitely many members of $\mathcal{U}$ gives a finite subcover.

## The Bolzano-Weierstrass Property

A related notion captures the existence of limit points for infinite sets.

**Definition:** A space has the **Bolzano-Weierstrass property** if every infinite subset has a limit point.

**Theorem:** For T₁ spaces, the Bolzano-Weierstrass property is equivalent to countable compactness (every countable open cover has a finite subcover).

The connection is that in T₁ spaces, having a limit point is equivalent to being the range of a sequence that converges to that point.

## Limit Point Compactness

**Definition:** A space is **limit point compact** (or has the Bolzano-Weierstrass property) if every infinite subset has a limit point.

**Relationships between compactness notions:**
- Compact ⟹ Limit point compact
- Limit point compact ⟹ Countably compact
- In first-countable T₁ spaces: Limit point compact ⟺ Sequentially compact

The converses generally fail. For example, the first uncountable ordinal with the order topology is limit point compact but not compact.

## Examples and Non-Examples

### Example 1: [0,1] is sequentially compact

Every sequence in [0,1] is bounded (being contained in [0,1]). By the Bolzano-Weierstrass theorem for $\mathbb{R}$, every bounded sequence has a convergent subsequence. Since [0,1] is closed in $\mathbb{R}$, the limit of any convergent sequence in [0,1] is also in [0,1].

### Example 2: (0,1) is NOT sequentially compact

Consider the sequence $x_n = 1/n$. This sequence converges to 0 in $\mathbb{R}$, but $0 \notin (0,1)$. Any subsequence also converges to 0, so no subsequence converges to a point in (0,1).

### Example 3: $\mathbb{R}$ is NOT sequentially compact

The sequence $x_n = n$ is unbounded and has no convergent subsequence. Every subsequence also tends to infinity.

### Example 4: The Cantor set is sequentially compact

The Cantor set C is a closed subset of [0,1], hence compact. In metric spaces, compact implies sequentially compact.

## Countable Compactness

**Definition:** A space is **countably compact** if every countable open cover has a finite subcover.

**Theorem:** The following implications hold:
$$\text{Compact} \Rightarrow \text{Countably Compact} \Rightarrow \text{Limit Point Compact}$$

In metric spaces, all these notions (including sequential compactness) are equivalent.

The distinction matters only in non-metrizable spaces. For practical purposes in analysis, sequential compactness and compactness are interchangeable.

## Applications

**Theorem (Weierstrass):** A continuous real-valued function on a nonempty sequentially compact space is bounded and attains its bounds.

*Proof:* If f were unbounded, we could find a sequence $(x_n)$ with $|f(x_n)| > n$. Any convergent subsequence $x_{n_k} \to x$ would give $f(x_{n_k}) \to f(x)$ by continuity, contradicting $|f(x_{n_k})| > n_k \to \infty$.

The attainment of bounds follows from the closedness of f(X) in $\mathbb{R}$.

**Theorem:** A continuous function from a sequentially compact space to a metric space is uniformly continuous.

This generalizes the classical result that continuous functions on [a,b] are uniformly continuous.

## Key Takeaways

- Sequential compactness means every sequence has a convergent subsequence with limit in the space
- In metric spaces, sequential compactness is equivalent to compactness
- The proof uses the characterization: compact ⟺ complete + totally bounded
- Sequential compactness is often easier to verify and work with than open cover compactness
- Related notions include limit point compactness and countable compactness
- All these notions coincide in metric spaces but may differ in general topological spaces
