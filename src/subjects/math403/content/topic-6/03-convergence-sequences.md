---
id: math403-topic-6-3
title: "Convergence of Sequences"
order: 3
---

# Convergence of Sequences

In metric spaces, convergence can be characterized entirely in terms of the metric, making sequences a powerful tool for studying topology. The ability to use sequences rather than the more general notion of nets is one of the key advantages of working in metric spaces, providing both intuition and computational power.

## Historical Development

The rigorous $\epsilon$-$N$ definition of convergence was developed in the 19th century by Cauchy and Weierstrass as part of the effort to place calculus on firm logical foundations. This definition extends naturally from the real numbers to arbitrary metric spaces, where it provides the foundation for analysis in abstract settings. The connection between sequences and topology was fully understood only in the 20th century with the development of general topology.

## Definition of Convergence

**Definition:** A sequence $(x_n)$ in a metric space (X, d) **converges** to $x \in X$ if:
$$\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N: d(x_n, x) < \epsilon$$

We write $x_n \to x$ or $\lim_{n \to \infty} x_n = x$.

**Intuition:** The sequence converges to x if the terms eventually get arbitrarily close to x. For any desired level of closeness $\epsilon$, we can find a point N in the sequence beyond which all terms are within $\epsilon$ of x.

**Example:** In $\mathbb{R}$ with the standard metric, $x_n = 1/n \to 0$ because for any $\epsilon > 0$, choosing $N > 1/\epsilon$ ensures $|1/n - 0| = 1/n < \epsilon$ for all $n \geq N$.

**Non-Example:** The sequence $x_n = (-1)^n$ does not converge in $\mathbb{R}$ because it oscillates between -1 and 1, never settling near any point.

## Topological Interpretation

A sequence converges to x if and only if every neighborhood of x contains all but finitely many terms of the sequence. This topological perspective shows that convergence is fundamentally about the neighborhood structure, though in metric spaces we can make it quantitative via the metric.

## Uniqueness of Limits

**Theorem:** In a metric space (or any Hausdorff space), limits are unique.

*Proof:* Suppose $x_n \to x$ and $x_n \to y$ with $x \neq y$. Let $\epsilon = d(x, y)/2 > 0$.

Since $x_n \to x$, there exists $N_1$ such that for all $n \geq N_1$: $d(x_n, x) < \epsilon$.

Since $x_n \to y$, there exists $N_2$ such that for all $n \geq N_2$: $d(x_n, y) < \epsilon$.

For $n \geq \max(N_1, N_2)$, both inequalities hold:

$$d(x, y) \leq d(x, x_n) + d(x_n, y) < 2\epsilon = d(x, y)$$

This contradiction shows that x = y.

This result demonstrates why the Hausdorff property is essential for analysis—without it, limits need not be unique, undermining the foundation of calculus.

## Sequences and Closed Sets

**Theorem:** In a metric space, F is closed if and only if F contains the limits of all convergent sequences in F.

This is one of the most important characterizations of closed sets in metric spaces, providing a sequential test for closedness.

*Proof (⟹):* Let $x_n \in F$ with $x_n \to x$. We show $x \in F$.

If $x \notin F$, then $x \in X \setminus F$, which is open. So some $B(x, \epsilon) \subseteq X \setminus F$, meaning $B(x, \epsilon) \cap F = \emptyset$.

But $x_n \to x$ means that for large enough n, $x_n \in B(x, \epsilon)$. Since $x_n \in F$, this contradicts $B(x, \epsilon) \cap F = \emptyset$.

*Proof (⟸):* We show F is closed by proving $X \setminus F$ is open.

Let $x \in X \setminus F$. We claim there exists $\epsilon > 0$ with $B(x, \epsilon) \cap F = \emptyset$.

Suppose not. Then for every n, $B(x, 1/n) \cap F \neq \emptyset$. Choose $x_n \in B(x, 1/n) \cap F$.

Then $x_n \in F$ and $d(x_n, x) < 1/n \to 0$, so $x_n \to x$. By hypothesis, $x \in F$, contradicting $x \in X \setminus F$.

**Application:** This theorem provides an efficient way to prove sets are closed or not closed by considering sequences.

## Sequences and Continuous Functions

**Theorem:** A function $f: X \to Y$ between metric spaces is continuous at x if and only if:
$$x_n \to x \Rightarrow f(x_n) \to f(x)$$

This sequential characterization of continuity is invaluable for both theory and applications.

*Proof (⟹):* Suppose f is continuous at x, and let $x_n \to x$.

Given $\epsilon > 0$, by continuity there exists $\delta > 0$ with $f(B_X(x, \delta)) \subseteq B_Y(f(x), \epsilon)$.

Since $x_n \to x$, there exists N such that for $n \geq N$: $x_n \in B_X(x, \delta)$.

Therefore, for $n \geq N$: $f(x_n) \in B_Y(f(x), \epsilon)$, proving $f(x_n) \to f(x)$.

*Proof (⟸):* Suppose f is not continuous at x. Then there exists $\epsilon > 0$ such that for all $\delta > 0$, some $y \in B(x, \delta)$ has $f(y) \notin B(f(x), \epsilon)$.

Taking $\delta_n = 1/n$, we get $x_n$ with $d(x_n, x) < 1/n$ but $d(f(x_n), f(x)) \geq \epsilon$.

Then $x_n \to x$ (since $d(x_n, x) < 1/n \to 0$), but $f(x_n) \not\to f(x)$ (since terms stay at least $\epsilon$ away from $f(x)$).

This contradicts the hypothesis.

**Important Note:** This characterization works in metric spaces (and first-countable spaces) but fails in general topological spaces, where nets must be used instead of sequences.

## Subsequences

**Definition:** A **subsequence** of $(x_n)$ is a sequence $(x_{n_k})$ where $n_1 < n_2 < n_3 < \cdots$.

Subsequences are obtained by selecting infinitely many terms from the original sequence while preserving their order.

**Theorem:** If $x_n \to x$, then every subsequence also converges to x.

*Proof:* If $x_n \to x$, then for any $\epsilon > 0$, there exists N such that $d(x_n, x) < \epsilon$ for all $n \geq N$.

Since $n_k \geq k$ (by induction on the definition of subsequences), we have $n_k \geq N$ for all $k \geq N$, so $d(x_{n_k}, x) < \epsilon$ for all $k \geq N$.

**Theorem:** $(x_n)$ converges to x if and only if every subsequence has a further subsequence converging to x.

This characterization is useful in compactness arguments and in probability theory.

## Cauchy Sequences

**Definition:** A sequence $(x_n)$ is **Cauchy** if:
$$\forall \epsilon > 0, \exists N, \forall m, n \geq N: d(x_m, x_n) < \epsilon$$

**Intuition:** A Cauchy sequence is one whose terms get arbitrarily close to each other, even if we don't know whether they approach any particular limit.

**Theorem:** Every convergent sequence is Cauchy.

*Proof:* Suppose $x_n \to x$. Given $\epsilon > 0$, there exists N such that for all $n \geq N$: $d(x_n, x) < \epsilon/2$.

For $m, n \geq N$:
$$d(x_m, x_n) \leq d(x_m, x) + d(x, x_n) < \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon$$

**Critical Observation:** The converse is not always true! A metric space where every Cauchy sequence converges is called **complete**. Completeness is a crucial property explored in the next section.

**Example:** In $\mathbb{Q}$ with the standard metric, the sequence $x_n = \sum_{k=0}^n \frac{1}{k!}$ is Cauchy (by the same argument as in $\mathbb{R}$) but does not converge in $\mathbb{Q}$ (it converges to $e \notin \mathbb{Q}$).

## Bounded Sequences

**Definition:** A sequence $(x_n)$ is **bounded** if the set $\{x_n : n \in \mathbb{N}\}$ is bounded.

Equivalently, $(x_n)$ is bounded if there exists $x_0 \in X$ and $M > 0$ such that $d(x_n, x_0) < M$ for all n.

**Theorem:** Every convergent sequence is bounded.

*Proof:* Suppose $x_n \to x$. Taking $\epsilon = 1$, there exists N such that $d(x_n, x) < 1$ for all $n \geq N$.

Let $M = \max\{d(x_1, x), d(x_2, x), \ldots, d(x_N, x), 1\} + 1$.

Then $d(x_n, x) < M$ for all n, so the sequence is bounded.

**Theorem (Bolzano-Weierstrass):** In $\mathbb{R}^n$, every bounded sequence has a convergent subsequence.

This fundamental result connects boundedness to compactness. The theorem fails in general metric spaces (consider a bounded sequence in an infinite discrete space), but holds in $\mathbb{R}^n$ due to compactness of closed bounded sets.

## Cluster Points

**Definition:** A point x is a **cluster point** (or **limit point** or **accumulation point**) of $(x_n)$ if every neighborhood of x contains infinitely many terms of the sequence.

Equivalently, x is a cluster point if for every $\epsilon > 0$ and every N, there exists $n \geq N$ with $d(x_n, x) < \epsilon$.

**Distinction:** A cluster point of a sequence is different from a limit point of a set. The sequence $x_n = (-1)^n$ has cluster points 1 and -1, though it doesn't converge.

**Theorem:** x is a cluster point of $(x_n)$ if and only if some subsequence converges to x.

*Proof (⟹):* Construct the subsequence inductively. Since x is a cluster point, we can find $n_1$ with $d(x_{n_1}, x) < 1$. Given $n_1, \ldots, n_k$, we can find $n_{k+1} > n_k$ with $d(x_{n_{k+1}}, x) < 1/(k+1)$ (using the cluster point property). Then $x_{n_k} \to x$.

*Proof (⟸):* If $x_{n_k} \to x$, then for any $\epsilon > 0$ and any N, there exists k large enough that $n_k \geq N$ and $d(x_{n_k}, x) < \epsilon$, so x is a cluster point.

## Applications to Compactness

In metric spaces, sequential compactness (every sequence has a convergent subsequence) is equivalent to the usual topological compactness. This equivalence, which fails in general topological spaces, makes metric spaces particularly amenable to sequential arguments.

## Key Takeaways

- Sequence convergence in metric spaces is characterized by the $\epsilon$-$N$ definition
- Limits are unique in metric spaces due to the Hausdorff property
- Closed sets are precisely those containing limits of all their convergent sequences
- Continuity is equivalent to preserving sequential convergence
- Every convergent sequence is Cauchy and bounded, but not conversely in general
- Subsequences preserve convergence, and cluster points correspond to convergent subsequences
- Sequences provide a powerful tool for metric spaces that generalizes classical analysis
