# The Heine-Borel Theorem

The Heine-Borel theorem characterizes compact subsets of Euclidean space and is one of the most important results in real analysis and topology.

## Statement of the Theorem

**Theorem (Heine-Borel):** A subset of $\mathbb{R}^n$ is compact if and only if it is closed and bounded.

This theorem does NOT hold in general metric or topological spaces.

## Proof for the Real Line

**Theorem:** A subset K of $\mathbb{R}$ is compact if and only if K is closed and bounded.

### Proof (⇒): Compact implies closed and bounded

Suppose K is compact.

**Bounded:** The open cover $\{(-n, n) : n \in \mathbb{N}\}$ covers K. By compactness, finitely many suffice, so K is contained in some $(-N, N)$ and is therefore bounded.

**Closed:** We show $\mathbb{R} \setminus K$ is open. Let $x \notin K$. For each $y \in K$, choose disjoint open intervals $U_y \ni x$ and $V_y \ni y$. The sets $\{V_y : y \in K\}$ cover K. By compactness, $K \subseteq V_{y_1} \cup \cdots \cup V_{y_n}$. Then $U = U_{y_1} \cap \cdots \cap U_{y_n}$ is an open neighborhood of x disjoint from K.

### Proof (⇐): Closed and bounded implies compact

Let K be closed and bounded. Since K is bounded, $K \subseteq [a, b]$ for some interval. Since [a,b] is compact and K is a closed subset, K is compact.

## Proof that [a,b] is Compact

We need to prove this fundamental fact independently.

**Theorem:** Every closed bounded interval [a,b] is compact.

*Proof by bisection:*

Suppose $\mathcal{U}$ is an open cover with no finite subcover. We construct a nested sequence of intervals:

1. Let $I_0 = [a,b]$
2. Bisect $I_0$ into $[a, \frac{a+b}{2}]$ and $[\frac{a+b}{2}, b]$
3. At least one half has no finite subcover; call it $I_1$
4. Continue: $I_n \supseteq I_{n+1}$, each with no finite subcover
5. The lengths satisfy $|I_n| = \frac{b-a}{2^n} \to 0$

By the Nested Interval Property, $\bigcap_{n=0}^\infty I_n = \{x_0\}$ for some $x_0$.

Since $\mathcal{U}$ covers [a,b], some $U \in \mathcal{U}$ contains $x_0$. Since U is open, $x_0 \in (x_0 - \epsilon, x_0 + \epsilon) \subseteq U$ for some $\epsilon > 0$.

For large n, $|I_n| < \epsilon$, so $I_n \subseteq U$. This contradicts that $I_n$ has no finite subcover.

## Generalization to $\mathbb{R}^n$

**Theorem:** A subset of $\mathbb{R}^n$ is compact if and only if it is closed and bounded.

*Proof (sketch):*

- A closed bounded set is contained in some cube $[-M, M]^n$
- This cube is homeomorphic to $[0,1]^n$
- By Tychonoff's theorem, $[0,1]^n$ is compact (being a product of compact spaces)
- Closed subsets of compact spaces are compact

## Failure in Infinite Dimensions

**Example:** The Heine-Borel theorem fails in infinite-dimensional spaces.

Consider $\ell^2 = \{(x_1, x_2, \ldots) : \sum x_i^2 < \infty\}$ with the norm $\|x\| = \sqrt{\sum x_i^2}$.

The closed unit ball $B = \{x : \|x\| \leq 1\}$ is closed and bounded but NOT compact.

The sequence of standard basis vectors $e_n = (0, \ldots, 0, 1, 0, \ldots)$ satisfies $\|e_n - e_m\| = \sqrt{2}$ for $n \neq m$. This sequence has no convergent subsequence.

## Applications

### Extreme Value Theorem
If $f: K \to \mathbb{R}$ is continuous and K is compact, then f attains its maximum and minimum on K.

### Uniform Continuity
A continuous function on a compact metric space is uniformly continuous.

### Bolzano-Weierstrass
Every bounded sequence in $\mathbb{R}^n$ has a convergent subsequence.
