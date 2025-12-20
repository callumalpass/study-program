---
id: math403-topic-6-7
title: "Metrization Theorems"
order: 7
---

# Metrization Theorems

Metrization theorems characterize which topological spaces are metrizable, providing fundamental connections between topology and metric theory. These theorems answer the natural question: given a topological space defined abstractly through open sets, when can we find a metric that induces exactly that topology? This question lies at the heart of the relationship between the quantitative (metric) and qualitative (topological) approaches to studying spaces.

## Historical Development

The metrization problem occupied topologists throughout the early 20th century. After Fréchet introduced metric spaces in 1906, mathematicians sought to determine which topological spaces could be metrized. Early necessary conditions were discovered (Hausdorff, first-countability, normality), but finding sufficient conditions proved challenging. The breakthrough came with Urysohn's theorem in 1924 for second-countable spaces, followed by the more general Nagata-Smirnov theorem in the 1950s, which completely resolved the metrization problem for general topological spaces.

## The Metrization Problem

**Central Question:** When can a topology be induced by a metric?

A topological space (X, $\mathcal{T}$) is **metrizable** if there exists a metric d on X such that $\mathcal{T}$ is the metric topology induced by d. We say the space is homeomorphic to a metric space.

**Important Distinction:** A space may admit multiple non-equivalent metrics that induce the same topology. Metrization theorems tell us when at least one such metric exists, not which specific metric to use.

## Necessary Conditions

**Theorem:** Every metrizable space is:
1. **Hausdorff (T₂):** Distinct points have disjoint neighborhoods
2. **First-countable:** Every point has a countable neighborhood basis
3. **Normal (T₄):** Disjoint closed sets can be separated by disjoint open sets
4. **Perfectly normal:** Every closed set is a $G_\delta$ (countable intersection of open sets)
5. **Paracompact:** Every open cover has a locally finite open refinement

**Proof of necessity:**
- **Hausdorff:** For $x \neq y$, let $r = d(x,y)/2$. Then $B(x,r)$ and $B(y,r)$ are disjoint.
- **First-countable:** $\{B(x, 1/n) : n \in \mathbb{N}\}$ is a countable neighborhood basis at x.
- **Normal:** Use the distance function. For disjoint closed sets A, B, define $U = \{x : d(x,A) < d(x,B)\}$ and $V = \{x : d(x,B) < d(x,A)\}$.
- **Perfectly normal:** For closed F, we have $F = \bigcap_{n=1}^\infty \{x : d(x,F) < 1/n\}$, expressing F as a $G_\delta$.

**Critical Observation:** These conditions are necessary but not individually sufficient. The challenge is finding conditions that are both necessary and sufficient.

## The Urysohn Metrization Theorem

**Theorem (Urysohn, 1924):** A regular second-countable space is metrizable.

More precisely: A topological space that is T₃ (regular and T₀) and second-countable (has a countable basis) admits a compatible metric.

This was the first major metrization theorem, showing that the combination of regularity and second-countability suffices.

### Proof Outline

*Proof Idea:*

**Step 1:** Let $\{U_n : n \in \mathbb{N}\}$ be a countable basis for the topology.

**Step 2:** For each pair (n, m) with $\overline{U_n} \subseteq U_m$, use Urysohn's Lemma (which applies because X is normal, a consequence of being regular and second-countable) to construct a continuous function $f_{n,m}: X \to [0,1]$ with:
- $f_{n,m}(x) = 0$ for $x \in \overline{U_n}$
- $f_{n,m}(x) = 1$ for $x \in X \setminus U_m$

**Step 3:** Index these functions as $\{g_k : k \in \mathbb{N}\}$ (countably many).

**Step 4:** Define the metric:
$$d(x, y) = \sum_{k=1}^\infty \frac{|g_k(x) - g_k(y)|}{2^k}$$

The series converges because each term is bounded by $1/2^k$.

**Step 5:** Verify d is a metric:
- **Positivity:** Each term is non-negative
- **Identity of indiscernibles:** If $d(x,y) = 0$, then $g_k(x) = g_k(y)$ for all k. The functions separate points (by construction using the countable basis), so $x = y$
- **Symmetry:** Obvious from the formula
- **Triangle inequality:** Follows from the triangle inequality for each summand

**Step 6:** Verify the metric topology equals the original topology. This uses the fact that the functions $g_k$ were constructed to separate points from closed sets using the basis.

**Significance:** This theorem shows that many familiar spaces (manifolds, separable Banach spaces, etc.) are metrizable.

## The Nagata-Smirnov Metrization Theorem

**Theorem (Nagata, 1950; Smirnov, 1951):** A topological space is metrizable if and only if it is regular and has a σ-locally finite base.

**Definition:** A collection $\mathcal{B}$ of subsets is **locally finite** if every point has a neighborhood that intersects only finitely many members of $\mathcal{B}$.

**Definition:** A collection is **σ-locally finite** if it is a countable union $\bigcup_{n=1}^\infty \mathcal{B}_n$ where each $\mathcal{B}_n$ is locally finite.

**Significance:** This theorem completely characterizes metrizable spaces in terms of purely topological properties. The σ-locally finite base condition is more general than second-countability (every second-countable space has a countable, hence σ-locally finite, base).

**Example:** A discrete space is metrizable (use the discrete metric). It has a σ-locally finite base: the collection of all singletons, which is locally finite (each point has a neighborhood—itself—intersecting only one singleton).

## The Bing Metrization Theorem

**Theorem (Bing, 1951):** A topological space is metrizable if and only if it is regular and has a σ-discrete base.

**Definition:** A collection $\mathcal{B}$ is **discrete** if every point has a neighborhood intersecting at most one member of $\mathcal{B}$.

**Definition:** A collection is **σ-discrete** if it is a countable union of discrete collections.

**Relationship:** Discrete ⟹ locally finite, so σ-discrete ⟹ σ-locally finite. Thus Bing's theorem provides a stronger characterization than Nagata-Smirnov.

**Proof technique:** Both the Nagata-Smirnov and Bing theorems use sophisticated constructions to build metrics from bases with these special properties. The proofs are considerably more involved than Urysohn's theorem.

## Applications and Examples

### Example 1: Second-Countable Spaces
Any second-countable regular space is metrizable by Urysohn's theorem.

**Application:** All manifolds are metrizable (they are locally Euclidean, hence locally second-countable, and the second-countable ones are metrizable).

**Application:** Separable Banach spaces are metrizable (they have countable dense subsets, giving countable bases for the norm topology).

### Example 2: Compact Hausdorff Spaces
A compact Hausdorff space is metrizable if and only if it is second-countable.

*Proof (⟸):* Compact Hausdorff spaces are regular (in fact, normal), so second-countability implies metrizability by Urysohn.

*Proof (⟹):* If a compact space is metrizable, it is separable (every compact metric space is separable: use total boundedness to construct a countable dense set). In metric spaces, separable ⟺ second-countable.

**Example:** The space $[0,1]$ with the order topology is metrizable (it's compact, Hausdorff, and second-countable).

**Non-Example:** The space $[0,1]^{\mathbb{R}}$ (uncountable product) with the product topology is compact Hausdorff but not second-countable, hence not metrizable.

### Example 3: The Sorgenfrey Line
The **Sorgenfrey line** is $\mathbb{R}$ with the **lower limit topology**: basis elements are half-open intervals $[a, b)$.

**Properties:**
- Hausdorff: Yes
- Normal: Yes (can be proved)
- Lindelöf: Yes (every open cover has a countable subcover)
- First-countable: Yes ($\{[x, x+1/n) : n \in \mathbb{N}\}$ is a countable neighborhood basis at x)
- Second-countable: **NO**

**Conclusion:** The Sorgenfrey line is NOT metrizable.

*Proof that not second-countable:* The collection $\{[x, x+1) : x \in \mathbb{R}\}$ is an uncountable collection of disjoint open sets. Any basis must contain at least one basis element inside each of these, giving uncountably many basis elements.

This example shows that first-countability + normality is insufficient for metrizability.

### Example 4: Moore Spaces
There exist normal spaces with σ-discrete bases that are not metrizable if the continuum hypothesis is false. These counterexamples highlight the subtlety of the metrization problem.

## Non-Metrizable Spaces

### Example 5: Long Line
The **long line** is locally metrizable (locally homeomorphic to $\mathbb{R}$) but not globally metrizable.

*Reason:* It's not first-countable at the limit point, failing a necessary condition.

### Example 6: Uncountable Products
An uncountable product $\prod_{\alpha \in A} X_\alpha$ where $|A|$ is uncountable and each $X_\alpha$ has at least two points is not metrizable with the product topology.

*Reason:* It's not first-countable. At any point, a neighborhood basis requires specifying coordinates in uncountably many factors, which cannot be captured by countably many neighborhoods.

**Example:** $\mathbb{R}^{\mathbb{R}}$ with the product topology is not metrizable.

### Example 7: Indiscrete Topology
Any space with more than one point equipped with the indiscrete topology (only $\emptyset$ and X are open) is not metrizable because it's not Hausdorff.

## Complete Metrizability

**Definition:** A metrizable space is **completely metrizable** if it admits a complete metric that induces the topology.

Not every metrizable space is completely metrizable. For instance, $(0,1)$ with the standard metric is metrizable but any compatible metric is incomplete.

**Theorem (Alexandroff, 1924):** A $G_\delta$ subset of a completely metrizable space is completely metrizable.

*Proof idea:* If $X = \bigcap_{n=1}^\infty U_n$ where each $U_n$ is open in a complete space Y with metric d, modify the metric using:
$$d'(x, y) = d(x, y) + \sum_{n=1}^\infty \frac{1}{2^n} \left| \frac{1}{d(x, Y \setminus U_n)} - \frac{1}{d(y, Y \setminus U_n)} \right|$$

This metric makes Cauchy sequences in X remain in X.

**Theorem:** A metrizable space is completely metrizable if and only if it is a $G_\delta$ in its completion.

**Example:** $\mathbb{Q}$ is metrizable but not completely metrizable (it's not a $G_\delta$ in $\mathbb{R}$).

**Example:** The irrational numbers $\mathbb{R} \setminus \mathbb{Q}$ are completely metrizable (they form a $G_\delta$ in $\mathbb{R}$: $\bigcap_{q \in \mathbb{Q}} (\mathbb{R} \setminus \{q\})$).

## Polish Spaces

**Definition:** A **Polish space** is a separable completely metrizable space.

Polish spaces are fundamental in descriptive set theory, probability theory, and measure theory.

**Examples:**
- $\mathbb{R}^n$ with the Euclidean metric
- The Cantor set (with the subspace metric from $\mathbb{R}$)
- The irrational numbers $\mathbb{P} = \mathbb{R} \setminus \mathbb{Q}$
- Separable Banach spaces (like $\ell^p$ for $1 \leq p < \infty$, or $C[0,1]$)
- The Hilbert cube $[0,1]^{\mathbb{N}}$

**Theorem:** Every Polish space is homeomorphic to a $G_\delta$ subset of the Hilbert cube $[0,1]^{\mathbb{N}}$.

**Applications:** Polish spaces provide the natural setting for:
- Borel sets and analytic sets in descriptive set theory
- Standard Borel spaces in measure theory
- State spaces in probability theory
- Many constructions in ergodic theory and dynamical systems

## The Embedding Theorems

**Theorem (Urysohn Embedding):** Every separable metrizable space embeds (homeomorphically) in the Hilbert cube $[0,1]^{\mathbb{N}}$.

*Proof sketch:* Use the countable family of functions from Urysohn's metrization theorem to define a map $\Phi: X \to [0,1]^{\mathbb{N}}$ by $\Phi(x) = (g_1(x), g_2(x), g_3(x), \ldots)$. The construction ensures this is a homeomorphism onto its image.

**Corollary:** Every separable metrizable space embeds in $\mathbb{R}^{\mathbb{N}}$ (which is homeomorphic to a subset of $[0,1]^{\mathbb{N}}$).

**Theorem:** Every metrizable space embeds in a product of real lines (possibly uncountably many).

This shows that metric spaces, despite their abstraction, can always be realized as subspaces of familiar function spaces.

## Summary of Major Results

| Theorem | Condition | Conclusion |
|---------|-----------|------------|
| Urysohn | Regular + second-countable | Metrizable |
| Nagata-Smirnov | Regular + σ-locally finite base | Metrizable (if and only if) |
| Bing | Regular + σ-discrete base | Metrizable (if and only if) |
| Alexandroff | $G_\delta$ in complete metric space | Completely metrizable |
| Urysohn embedding | Separable metrizable | Embeds in Hilbert cube |

## Practical Criteria

**To prove a space is metrizable:**
1. Check if it's second-countable and regular (easiest approach if applicable)
2. Explicitly construct a metric (when possible)
3. Show it embeds in a known metrizable space
4. Verify it has a σ-locally finite or σ-discrete base

**To prove a space is NOT metrizable:**
1. Show it's not Hausdorff
2. Show it's not first-countable
3. Show it's not normal (harder to verify)
4. Find a sequence without unique limits
5. For compact spaces: show it's not second-countable

## Key Takeaways

- Metrizable spaces must be Hausdorff, first-countable, normal, and perfectly normal
- The Urysohn theorem: regular + second-countable ⟹ metrizable (sufficient for many applications)
- The Nagata-Smirnov theorem completely characterizes metrizable spaces via σ-locally finite bases
- Not all topological spaces are metrizable (e.g., Sorgenfrey line, uncountable products, long line)
- Complete metrizability is stronger than metrizability and characterized by the $G_\delta$ property
- Polish spaces (separable + completely metrizable) are the natural setting for descriptive set theory
- Every separable metrizable space embeds in the Hilbert cube, connecting abstract spaces to concrete realizations
- Metrization theorems provide the bridge between metric geometry and general topology
