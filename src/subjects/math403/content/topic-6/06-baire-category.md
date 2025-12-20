---
id: math403-topic-6-6
title: "Baire Category Theorem"
order: 6
---

# The Baire Category Theorem

The Baire Category Theorem is a fundamental result about complete metric spaces and locally compact Hausdorff spaces, with important applications in functional analysis, real analysis, and topology. Named after René-Louis Baire who proved it in his 1899 doctoral thesis, the theorem provides a powerful tool for proving existence results by showing that certain "large" sets cannot be decomposed into countably many "small" pieces. The terminology of "category" here is unrelated to category theory—it refers to a classification of sets by "size" in a topological sense.

## Historical Context

Baire developed his theorem while studying discontinuous functions and seeking to understand the structure of function spaces. The theorem reveals a surprising rigidity in complete metric spaces: they cannot be "too small" in a certain sense. This insight has proven fundamental to functional analysis, where it underlies the three pillars: the Uniform Boundedness Principle, the Open Mapping Theorem, and the Closed Graph Theorem.

## First and Second Category

**Definition:** A subset A of a topological space X is:
- **Nowhere dense** if $\text{int}(\overline{A}) = \emptyset$ (the closure of A has empty interior)
- **First category** (or **meager**) if it is a countable union of nowhere dense sets
- **Second category** (or **non-meager**) if it is not first category

**Definition:** A set is **residual** (or **comeager**) if its complement is first category.

**Intuition:** Nowhere dense sets are "thin"—they don't fill up any open set. First category sets are "small" in a topological sense, being countable unions of thin sets. Second category sets are "large"—they cannot be decomposed into countably many thin pieces.

## Understanding Nowhere Dense

A set A is nowhere dense if you cannot find any non-empty open set contained in $\overline{A}$. Equivalently, every non-empty open set contains a non-empty open subset disjoint from A.

**Example:** A finite set in $\mathbb{R}$ is nowhere dense because its closure is itself (finite), which has no interior points.

**Example:** $\mathbb{Z}$ is nowhere dense in $\mathbb{R}$ because $\overline{\mathbb{Z}} = \mathbb{Z}$ and $\text{int}(\mathbb{Z}) = \emptyset$.

**Example:** The Cantor set C is nowhere dense in $\mathbb{R}$. Although C is uncountable and closed, it contains no intervals, so $\text{int}(C) = \emptyset$.

**Non-Example:** $[0, 1]$ is not nowhere dense in $\mathbb{R}$ because $\text{int}(\overline{[0,1]}) = \text{int}([0,1]) = (0, 1) \neq \emptyset$.

## Examples of Category

### Example 1: First Category Sets
- Any countable set in $\mathbb{R}$ is first category (it's a countable union of singletons, each nowhere dense)
- $\mathbb{Q}$ is first category in $\mathbb{R}$
- The Cantor set is nowhere dense but uncountable—it is first category (being nowhere dense itself)

### Example 2: Second Category Sets
- $\mathbb{R}$ is second category in itself (by the Baire Category Theorem)
- $[0, 1]$ is second category in itself
- The irrationals $\mathbb{R} \setminus \mathbb{Q}$ are second category in $\mathbb{R}$ (since their complement, $\mathbb{Q}$, is first category)

### Example 3: Context Matters
Whether a set is nowhere dense depends on the ambient space. The interval $[0, 1]$ is nowhere dense in $\mathbb{R}^2$ but not nowhere dense in $\mathbb{R}$.

## The Baire Category Theorem

**Theorem (Baire):** Let X be either:
1. A complete metric space, or
2. A locally compact Hausdorff space

Then X is second category in itself (i.e., X is not a countable union of nowhere dense sets).

**Equivalent formulation:** The intersection of countably many dense open sets is dense.

**Proof of equivalence of formulations:** Let $G_n$ be dense open sets. We want to show $\bigcap_{n=1}^\infty G_n$ is dense, i.e., it intersects every non-empty open set U.

The complements $F_n = X \setminus G_n$ are closed with empty interior (since $G_n$ is dense). If $\bigcap G_n$ were not dense, some non-empty open U would satisfy $U \cap \bigcap G_n = \emptyset$, meaning $U \subseteq \bigcup F_n$. But then $X = (X \setminus U) \cup \bigcup F_n$ is a countable union of nowhere dense sets (the closure of $X \setminus U$ has interior $X \setminus \overline{U}$, which doesn't contain U, and the $F_n$ are nowhere dense). This contradicts X being second category.

## Proof for Complete Metric Spaces

Let $G_1, G_2, G_3, \ldots$ be dense open sets in the complete metric space (X, d). We show $\bigcap_{n=1}^\infty G_n$ is dense.

Let U be any non-empty open set. We construct a point in $U \cap \bigcap_{n=1}^\infty G_n$.

**Step 1:** Since $G_1$ is dense, $U \cap G_1 \neq \emptyset$ is a non-empty open set. Choose $x_1 \in U \cap G_1$ and $0 < r_1 < 1$ such that $\overline{B(x_1, r_1)} \subseteq U \cap G_1$ (possible since $U \cap G_1$ is open).

**Step 2:** Since $G_2$ is dense, $B(x_1, r_1) \cap G_2 \neq \emptyset$ is non-empty open. Choose $x_2 \in B(x_1, r_1) \cap G_2$ and $0 < r_2 < 1/2$ such that $\overline{B(x_2, r_2)} \subseteq B(x_1, r_1) \cap G_2$.

**Inductive step:** Given $x_n$ and $r_n$, since $G_{n+1}$ is dense, $B(x_n, r_n) \cap G_{n+1} \neq \emptyset$. Choose $x_{n+1} \in B(x_n, r_n) \cap G_{n+1}$ and $0 < r_{n+1} < 1/(n+1)$ such that $\overline{B(x_{n+1}, r_{n+1})} \subseteq B(x_n, r_n) \cap G_{n+1}$.

**Construction produces:**
- A nested sequence of closed balls: $\overline{B(x_1, r_1)} \supseteq \overline{B(x_2, r_2)} \supseteq \overline{B(x_3, r_3)} \supseteq \cdots$
- With $r_n \to 0$ (since $r_n < 1/n$)
- Each $\overline{B(x_n, r_n)} \subseteq G_n$

**Claim:** The sequence $(x_n)$ is Cauchy.

For $m > n$, we have $x_m \in B(x_n, r_n)$, so $d(x_m, x_n) < r_n < 1/n \to 0$.

By completeness, $x_n \to x^*$ for some $x^* \in X$.

**Claim:** $x^* \in \overline{B(x_n, r_n)}$ for all n.

Since the sequence $(x_k)_{k \geq n}$ lies in $\overline{B(x_n, r_n)}$, and this set is closed, the limit $x^*$ is also in $\overline{B(x_n, r_n)}$.

**Conclusion:** For each n, $x^* \in \overline{B(x_n, r_n)} \subseteq G_n$, so $x^* \in \bigcap_{n=1}^\infty G_n$. Also, $x^* \in \overline{B(x_1, r_1)} \subseteq U$.

Therefore, $x^* \in U \cap \bigcap_{n=1}^\infty G_n$, proving that this intersection is non-empty.

Since U was an arbitrary non-empty open set, $\bigcap_{n=1}^\infty G_n$ is dense.

## Applications

### Application 1: $\mathbb{Q}$ is Not a $G_\delta$ in $\mathbb{R}$

A $G_\delta$ set is a countable intersection of open sets.

**Claim:** $\mathbb{Q}$ cannot be written as $\bigcap_{n=1}^\infty G_n$ with each $G_n$ open in $\mathbb{R}$.

*Proof:* Suppose $\mathbb{Q} = \bigcap_{n=1}^\infty G_n$ with $G_n$ open. Since $\mathbb{Q}$ is dense in $\mathbb{R}$, we have $\mathbb{Q} \subseteq G_n$, so each $G_n$ is dense (containing the dense set $\mathbb{Q}$).

By the Baire Category Theorem, $\bigcap_{n=1}^\infty G_n$ is dense in $\mathbb{R}$.

But $\bigcap_{n=1}^\infty G_n = \mathbb{Q}$, and $\overline{\mathbb{Q}} = \mathbb{R} \neq \mathbb{Q}$... Actually, $\mathbb{Q}$ IS dense, so this argument needs refinement.

Better proof: If $\mathbb{Q} = \bigcap_{n=1}^\infty G_n$, then $\mathbb{R} \setminus \mathbb{Q} = \bigcup_{n=1}^\infty (\mathbb{R} \setminus G_n)$. Each $\mathbb{R} \setminus G_n$ is closed. If each $G_n$ is dense (which must be true since $\mathbb{Q} \subseteq G_n$ and we want $\mathbb{Q} = \bigcap G_n$), then each $F_n = \mathbb{R} \setminus G_n$ has empty interior (is nowhere dense). So $\mathbb{R} \setminus \mathbb{Q}$ would be first category. But $\mathbb{R} \setminus \mathbb{Q}$ is dense in $\mathbb{R}$, and by the Baire theorem, $\mathbb{R}$ is second category, so its dense subsets should be second category—contradiction.

### Application 2: Existence of Continuous Nowhere-Differentiable Functions

**Theorem:** The set of continuous nowhere-differentiable functions on $[0,1]$ is residual (comeager) in $C[0,1]$ with the supremum metric.

*Proof idea:* For each point $x \in [0,1]$ and each potential derivative value $m \in \mathbb{Q}$, the set of functions that are differentiable at x with derivative m is nowhere dense. Taking a countable union over rational x and rational m, the set of functions that are differentiable somewhere with rational derivative is first category. By additional argument, all differentiable functions form a first category set, so nowhere-differentiable functions are residual.

**Consequence:** In a precise sense, "most" continuous functions are nowhere differentiable! This counterintuitive result shows that the smooth functions we typically encounter are exceptional.

### Application 3: Uniform Boundedness Principle

Let $(T_\alpha: X \to Y)$ be a family of bounded linear operators between Banach spaces. If $\sup_\alpha \|T_\alpha x\| < \infty$ for each $x \in X$ (pointwise boundedness), then $\sup_\alpha \|T_\alpha\| < \infty$ (uniform boundedness).

*Proof sketch:* For each n, let $F_n = \{x : \sup_\alpha \|T_\alpha x\| \leq n\}$. Each $F_n$ is closed (by continuity of the operators). By hypothesis, $X = \bigcup_{n=1}^\infty F_n$. By Baire's theorem, some $F_N$ has non-empty interior, containing a ball $B(x_0, r)$. This implies uniform boundedness.

### Application 4: Open Mapping Theorem

A bounded linear surjection $T: X \to Y$ between Banach spaces is an open map (maps open sets to open sets).

The proof uses Baire's theorem to show that the image of the unit ball in X contains a ball in Y.

### Application 5: Closed Graph Theorem

A linear map $T: X \to Y$ between Banach spaces is bounded if and only if its graph $\{(x, Tx) : x \in X\}$ is closed in $X \times Y$.

The proof relies on Baire's theorem applied to the complete space $X \times Y$.

### Application 6: Generic Properties in Dynamics

In dynamical systems, properties that hold for a residual set of systems are called "generic." Baire's theorem helps prove that certain behaviors are generic.

## The Baire Property

**Definition:** A set has the **Baire property** if it differs from an open set by a meager (first category) set. Equivalently, A has the Baire property if $A = (U \setminus M_1) \cup M_2$ where U is open and $M_1, M_2$ are meager.

**Theorem:** In a complete metric space:
- All open sets have the Baire property
- All closed sets have the Baire property (taking U = interior plus a nowhere dense set)
- All Borel sets have the Baire property

The Baire property provides a notion of "measurability" parallel to Lebesgue measurability. Sets with the Baire property form a σ-algebra, and there's a rich analogy between measure theory and category.

## Limitations and Generalizations

**Limitation:** The theorem requires either completeness or local compactness. In $\mathbb{Q}$ (incomplete, not locally compact), the theorem fails: $\mathbb{Q} = \bigcup_{q \in \mathbb{Q}} \{q\}$ is a countable union of nowhere dense sets.

**Generalization (Choquet):** More general versions exist for topological vector spaces and other structures, extending Baire's insight to broader contexts.

## Analogy with Measure Theory

There's a deep analogy:

| Category | Measure |
|----------|---------|
| Nowhere dense | Measure zero |
| First category | Null set |
| Residual | Full measure |
| Baire theorem | Completeness of measure |

However, these concepts are independent: there exist sets of first category with full Lebesgue measure, and null sets that are second category.

## Key Takeaways

- The Baire Category Theorem states that complete metric spaces cannot be decomposed into countably many nowhere dense sets
- Equivalently, countable intersections of dense open sets remain dense
- The theorem distinguishes "large" (second category) from "small" (first category) sets topologically
- Applications include proving $\mathbb{Q}$ is not a $G_\delta$, existence of nowhere-differentiable functions, and the three fundamental theorems of functional analysis
- The proof uses completeness essentially through the Cantor intersection property
- Baire category provides a notion of "largeness" complementary to measure-theoretic size
- Generic properties (holding on residual sets) often capture typical behavior in mathematics
- The theorem fails without completeness or local compactness, showing these are essential hypotheses
