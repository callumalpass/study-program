# Convergence of Sequences

In metric spaces, convergence can be characterized entirely in terms of the metric, making sequences a powerful tool for studying topology.

## Definition of Convergence

**Definition:** A sequence $(x_n)$ in a metric space (X, d) **converges** to $x \in X$ if:
$$\forall \epsilon > 0, \exists N \in \mathbb{N}, \forall n \geq N: d(x_n, x) < \epsilon$$

We write $x_n \to x$ or $\lim_{n \to \infty} x_n = x$.

## Uniqueness of Limits

**Theorem:** In a metric space (or any Hausdorff space), limits are unique.

*Proof:* Suppose $x_n \to x$ and $x_n \to y$ with $x \neq y$. Let $\epsilon = d(x, y)/2 > 0$.

For large n: $d(x_n, x) < \epsilon$ and $d(x_n, y) < \epsilon$.

Then $d(x, y) \leq d(x, x_n) + d(x_n, y) < 2\epsilon = d(x, y)$.

Contradiction.

## Sequences and Closed Sets

**Theorem:** In a metric space, F is closed if and only if F contains the limits of all convergent sequences in F.

*Proof (⟹):* Let $x_n \in F$ with $x_n \to x$. If $x \notin F$, then $X \setminus F$ is an open neighborhood of x, so some $B(x, \epsilon) \cap F = \emptyset$. But $x_n \to x$ means $x_n \in B(x, \epsilon)$ eventually, contradiction.

*Proof (⟸):* Let $x \in \overline{F}$. For each n, choose $x_n \in B(x, 1/n) \cap F$. Then $x_n \to x$, so $x \in F$.

## Sequences and Continuous Functions

**Theorem:** A function $f: X \to Y$ between metric spaces is continuous at x if and only if:
$$x_n \to x \Rightarrow f(x_n) \to f(x)$$

*Proof (⟹):* Given $\epsilon > 0$, by continuity there exists $\delta > 0$ with $f(B(x, \delta)) \subseteq B(f(x), \epsilon)$. Since $x_n \to x$, eventually $x_n \in B(x, \delta)$, so $f(x_n) \in B(f(x), \epsilon)$.

*Proof (⟸):* Suppose f is not continuous at x. Then there exists $\epsilon > 0$ such that for all $\delta > 0$, some $y \in B(x, \delta)$ has $f(y) \notin B(f(x), \epsilon)$.

Taking $\delta = 1/n$, we get $x_n$ with $d(x_n, x) < 1/n$ but $d(f(x_n), f(x)) \geq \epsilon$. Then $x_n \to x$ but $f(x_n) \not\to f(x)$.

## Subsequences

**Definition:** A **subsequence** of $(x_n)$ is a sequence $(x_{n_k})$ where $n_1 < n_2 < n_3 < \cdots$.

**Theorem:** If $x_n \to x$, then every subsequence also converges to x.

**Theorem:** $(x_n)$ converges to x if and only if every subsequence has a further subsequence converging to x.

## Cauchy Sequences

**Definition:** A sequence $(x_n)$ is **Cauchy** if:
$$\forall \epsilon > 0, \exists N, \forall m, n \geq N: d(x_m, x_n) < \epsilon$$

**Theorem:** Every convergent sequence is Cauchy.

*Proof:* If $x_n \to x$, then for $\epsilon > 0$, eventually $d(x_n, x) < \epsilon/2$. For large m, n: $d(x_m, x_n) \leq d(x_m, x) + d(x, x_n) < \epsilon$.

**Note:** The converse is not always true. A metric space where every Cauchy sequence converges is called **complete**.

## Bounded Sequences

**Definition:** A sequence $(x_n)$ is **bounded** if the set $\{x_n : n \in \mathbb{N}\}$ is bounded.

**Theorem:** Every convergent sequence is bounded.

**Theorem (Bolzano-Weierstrass):** In $\mathbb{R}^n$, every bounded sequence has a convergent subsequence.

## Cluster Points

**Definition:** A point x is a **cluster point** (limit point) of $(x_n)$ if every neighborhood of x contains infinitely many terms of the sequence.

**Theorem:** x is a cluster point of $(x_n)$ if and only if some subsequence converges to x.
