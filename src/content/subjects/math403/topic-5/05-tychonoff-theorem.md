# Tychonoff's Theorem

Tychonoff's theorem is one of the most important and powerful results in topology, stating that arbitrary products of compact spaces are compact. This theorem has far-reaching consequences in functional analysis, algebraic geometry, and mathematical logic.

## Statement of the Theorem

**Theorem (Tychonoff):** Let $\{X_\alpha : \alpha \in A\}$ be a family of compact topological spaces, where the index set A can be arbitrary (finite, countable, or uncountable). Then the product space $\prod_{\alpha \in A} X_\alpha$ equipped with the product topology is compact.

This theorem is remarkable for several reasons. First, it holds for arbitrary products—even uncountably infinite products remain compact. Second, the product topology (the coarsest topology making all projections continuous) is precisely what makes this work; the box topology would fail spectacularly. Third, the theorem is equivalent to the Axiom of Choice, placing it at the foundation of modern mathematics.

## Significance and Power

Tychonoff's theorem is considered by many to be the most important theorem in general topology. Its power comes from the ability to construct compact spaces of enormous complexity. For instance:

- The Hilbert cube $[0,1]^\mathbb{N}$ is compact, despite being infinite-dimensional
- Stone-Čech compactifications exist because of Tychonoff's theorem
- The Banach-Alaoglu theorem in functional analysis relies on it

Without Tychonoff's theorem, much of modern analysis and topology would look very different.

## Equivalence with the Axiom of Choice

**Theorem (Kelley, 1950):** Tychonoff's theorem is equivalent to the Axiom of Choice in Zermelo-Fraenkel set theory.

This means:
1. Assuming the Axiom of Choice (AC), Tychonoff's theorem is provable
2. Assuming Tychonoff's theorem, the Axiom of Choice is provable

The proof that Tychonoff implies AC is ingenious: given a family of nonempty sets $\{S_\alpha\}$, one adds a point $*$ to each set to form $S_\alpha \cup \{*\}$ with a compact topology (the cofinite topology plus $*$). The product is compact by Tychonoff. A careful analysis shows that extracting a choice function is possible.

This equivalence places Tychonoff's theorem among the foundational principles of mathematics, alongside Zorn's Lemma and the Well-Ordering Principle.

## Alexander's Subbase Theorem

The key tool for proving Tychonoff's theorem is Alexander's subbase theorem, which reduces the problem of checking compactness to checking a simpler condition.

**Lemma (Alexander's Subbase Theorem):** A space X is compact if and only if every cover of X by subbasic open sets has a finite subcover.

This dramatically simplifies compactness proofs because we only need to consider covers by sets from a subbase, rather than all open sets.

*Proof sketch:* Suppose every subbasic cover has a finite subcover but X is not compact. Using Zorn's Lemma, find a maximal open cover $\mathcal{M}$ with no finite subcover. For each subbasic set S, either S or its complement must fail to be in $\mathcal{M}$ (else $\mathcal{M}$ would have a finite subcover by our assumption). This leads to a contradiction via the maximality of $\mathcal{M}$.

## Proof of Tychonoff's Theorem

*Proof using Alexander's Subbase Theorem:*

Let $\prod_{\alpha \in A} X_\alpha$ be the product of compact spaces. The product topology has a standard subbase:
$$\mathcal{S} = \{\pi_\alpha^{-1}(U) : \alpha \in A, U \text{ open in } X_\alpha\}$$

where $\pi_\alpha$ is the projection onto the $\alpha$-th factor.

Let $\mathcal{C}$ be a cover of the product by subbasic sets. Suppose for contradiction that $\mathcal{C}$ has no finite subcover.

For each index $\alpha \in A$, define:
$$\mathcal{C}_\alpha = \{U \subseteq X_\alpha : \pi_\alpha^{-1}(U) \in \mathcal{C}\}$$

This is the collection of open sets in $X_\alpha$ whose preimages under $\pi_\alpha$ appear in $\mathcal{C}$.

**Claim:** For each $\alpha$, the collection $\mathcal{C}_\alpha$ does NOT cover $X_\alpha$.

*Proof of claim:* Suppose $\mathcal{C}_\alpha$ covers $X_\alpha$ for some $\alpha$. Since $X_\alpha$ is compact, finitely many sets $U_1, \ldots, U_n \in \mathcal{C}_\alpha$ cover $X_\alpha$. Then:
$$\prod_{\beta \in A} X_\beta = \pi_\alpha^{-1}(X_\alpha) = \pi_\alpha^{-1}(U_1 \cup \cdots \cup U_n) = \pi_\alpha^{-1}(U_1) \cup \cdots \cup \pi_\alpha^{-1}(U_n)$$

This means $\mathcal{C}$ has a finite subcover, contradicting our assumption.

**Constructing the contradiction:**

Since $\mathcal{C}_\alpha$ doesn't cover $X_\alpha$ for any $\alpha$, there exists for each $\alpha$ a point:
$$x_\alpha \in X_\alpha \setminus \bigcup \mathcal{C}_\alpha$$

By the **Axiom of Choice**, we can form the point $x = (x_\alpha)_{\alpha \in A} \in \prod_{\alpha \in A} X_\alpha$.

Now consider any set $\pi_\alpha^{-1}(U) \in \mathcal{C}$. We have $U \in \mathcal{C}_\alpha$, and by construction $x_\alpha \notin U$. Therefore $x \notin \pi_\alpha^{-1}(U)$.

This means x is not in any set of $\mathcal{C}$, contradicting that $\mathcal{C}$ covers the product.

Therefore every subbasic cover has a finite subcover, and by Alexander's theorem, the product is compact.

## Finite Products Without Choice

For finite products, Tychonoff's theorem can be proved without invoking the Axiom of Choice.

**Theorem:** If X and Y are compact spaces, then $X \times Y$ is compact.

*Proof (Tube Lemma approach):*

Let $\mathcal{U}$ be an open cover of $X \times Y$.

For each point $x \in X$, the vertical "slice" $\{x\} \times Y$ is homeomorphic to Y, hence compact. This slice is covered by sets from $\mathcal{U}$, so finitely many sets $U_{x,1}, \ldots, U_{x,n_x}$ cover $\{x\} \times Y$.

The union $W_x = U_{x,1} \cup \cdots \cup U_{x,n_x}$ is an open set containing $\{x\} \times Y$. By the **Tube Lemma**, there exists an open neighborhood $V_x$ of x in X such that the "tube" $V_x \times Y \subseteq W_x$.

The collection $\{V_x : x \in X\}$ is an open cover of X. By compactness of X, finitely many suffice: $X \subseteq V_{x_1} \cup \cdots \cup V_{x_m}$.

Now $X \times Y \subseteq \bigcup_{i=1}^m (V_{x_i} \times Y) \subseteq \bigcup_{i=1}^m W_{x_i}$.

Each $W_{x_i}$ is covered by finitely many sets from $\mathcal{U}$, so the entire product is covered by finitely many sets from $\mathcal{U}$.

## Applications

### Application 1: The Hilbert Cube
The Hilbert cube $[0,1]^{\mathbb{N}} = \prod_{n=1}^\infty [0,1]$ is compact. This is a universal space: every separable metrizable space embeds in the Hilbert cube.

### Application 2: Stone-Čech Compactification
For a completely regular space X, the Stone-Čech compactification $\beta X$ can be constructed as the closure of the image of X in a product $\prod_{f \in C^*(X)} [0, \|f\|_\infty]$. Tychonoff's theorem ensures this product is compact.

### Application 3: Banach-Alaoglu Theorem
**Theorem:** The closed unit ball in the dual of a Banach space is weak* compact.

*Proof sketch:* The unit ball in $X^*$ embeds into the product $\prod_{x \in B_X} [-\|x\|, \|x\|]$, which is compact by Tychonoff. The unit ball is closed in this product, hence compact.

### Application 4: Existence of Haar Measure
The existence of Haar measure on locally compact groups uses compactness arguments that rely on Tychonoff's theorem.

## Foundational Equivalences

**Theorem:** In Zermelo-Fraenkel set theory (ZF), the following are equivalent:
1. Axiom of Choice
2. Tychonoff's theorem
3. Every vector space has a basis
4. Zorn's Lemma
5. Well-Ordering Principle
6. Every surjection has a right inverse

This web of equivalences shows that Tychonoff's theorem is not merely a result in topology but a fundamental principle of mathematics.

## Key Takeaways

- Tychonoff's theorem: arbitrary products of compact spaces are compact
- The proof uses Alexander's Subbase Theorem and the Axiom of Choice
- The theorem is equivalent to the Axiom of Choice
- Finite products can be proved compact without AC using the Tube Lemma
- Applications include the Hilbert cube, Stone-Čech compactification, and Banach-Alaoglu theorem
- The theorem is foundational for modern analysis and topology
