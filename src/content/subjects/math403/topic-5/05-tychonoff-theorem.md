# Tychonoff's Theorem

Tychonoff's theorem is one of the most important and powerful results in topology, stating that arbitrary products of compact spaces are compact.

## Statement of the Theorem

**Theorem (Tychonoff):** Let $\{X_\alpha : \alpha \in A\}$ be a family of compact topological spaces. Then the product space $\prod_{\alpha \in A} X_\alpha$ with the product topology is compact.

This theorem is remarkable because it holds for arbitrary (possibly uncountable) products.

## Equivalence with the Axiom of Choice

**Theorem (Kelley):** Tychonoff's theorem is equivalent to the Axiom of Choice.

This means:
1. Assuming AC, Tychonoff's theorem is provable
2. Assuming Tychonoff's theorem, AC is provable

## Proof Using Alexander's Subbase Theorem

**Lemma (Alexander's Subbase Theorem):** A space X is compact if and only if every cover by subbasic open sets has a finite subcover.

*Proof of Tychonoff using Alexander:*

The product topology has subbase $\mathcal{S} = \{\pi_\alpha^{-1}(U_\alpha) : \alpha \in A, U_\alpha \text{ open in } X_\alpha\}$.

Let $\mathcal{C}$ be a cover by subbasic sets with no finite subcover. For each $\alpha$, let:
$$\mathcal{C}_\alpha = \{U : \pi_\alpha^{-1}(U) \in \mathcal{C}\}$$

If $\mathcal{C}_\alpha$ covers $X_\alpha$ for some $\alpha$, then by compactness of $X_\alpha$, finitely many $U_1, \ldots, U_n$ cover $X_\alpha$. Then $\pi_\alpha^{-1}(U_1), \ldots, \pi_\alpha^{-1}(U_n)$ cover the product, contradicting our assumption.

Therefore, for each $\alpha$, there exists $x_\alpha \in X_\alpha \setminus \bigcup \mathcal{C}_\alpha$.

By the Axiom of Choice, we can form $x = (x_\alpha) \in \prod X_\alpha$.

But x is not covered by any set in $\mathcal{C}$, since if $\pi_\alpha^{-1}(U) \in \mathcal{C}$ contained x, then $x_\alpha \in U \in \mathcal{C}_\alpha$, contradiction.

This contradicts that $\mathcal{C}$ covers the product.

## Finite Products

For finite products, Tychonoff's theorem can be proved without the Axiom of Choice.

**Theorem:** If X and Y are compact, then $X \times Y$ is compact.

*Proof:* Let $\mathcal{U}$ be an open cover of $X \times Y$.

For each $x \in X$, the "slice" $\{x\} \times Y$ is compact (homeomorphic to Y). Cover it by finitely many sets from $\mathcal{U}$. Their union contains a "tube" $U_x \times Y$ for some open $U_x \ni x$.

The sets $\{U_x : x \in X\}$ cover X. By compactness, finitely many $U_{x_1}, \ldots, U_{x_n}$ cover X.

The finite union of the finite subcovers for each slice gives a finite subcover of $X \times Y$.

## Applications

### Application 1: The Hilbert Cube
The Hilbert cube $[0,1]^{\mathbb{N}} = \prod_{n=1}^\infty [0,1]$ is compact.

### Application 2: Stone-Čech Compactification
Tychonoff's theorem is essential in constructing the Stone-Čech compactification.

### Application 3: Functional Analysis
The unit ball in the dual of a Banach space is weak* compact (Banach-Alaoglu theorem), proved using Tychonoff.

## The Axiom of Choice Connection

**Theorem:** The following are equivalent:
1. Axiom of Choice
2. Tychonoff's theorem
3. Every vector space has a basis
4. Zorn's Lemma

This places Tychonoff's theorem at the heart of foundational mathematics.
