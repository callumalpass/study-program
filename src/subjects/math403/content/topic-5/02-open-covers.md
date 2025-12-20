---
id: math403-topic-5-2
title: "Open Covers and Subcovers"
order: 2
---

# Open Covers and Subcovers

Understanding open covers and their finite subcovers is fundamental to working with compact spaces. This subtopic explores the technical details of covers, refinements, and the key lemmas that make compactness proofs work.

## Detailed Study of Open Covers

The concept of an open cover is central to the definition of compactness and appears throughout topology.

**Definition:** Let X be a topological space and $A \subseteq X$. An **open cover** of A is a collection $\mathcal{U} = \{U_\alpha : \alpha \in I\}$ of open subsets of X such that $A \subseteq \bigcup_{\alpha \in I} U_\alpha$.

When A = X, we simply call it an open cover of the space. The index set I can be finite, countable, or uncountable—there is no restriction on its cardinality.

### Examples of Open Covers

**Example 1:** The collection $\{(-n, n) : n \in \mathbb{N}\}$ is an open cover of $\mathbb{R}$. Each set is an open interval centered at the origin, and their union is all of $\mathbb{R}$.

**Example 2:** For the unit interval [0,1], the collection $\{[0, 0.6), (0.4, 1]\}$ is an open cover (using the subspace topology, where these sets are open in [0,1]).

**Example 3:** The collection $\{B(x, 1) : x \in \mathbb{R}^n\}$ of all unit balls covers $\mathbb{R}^n$. This is an uncountable cover.

## Properties of Open Covers

### Refinements

The notion of refinement allows us to compare open covers and is crucial for advanced compactness concepts.

**Definition:** A cover $\mathcal{V}$ **refines** $\mathcal{U}$ (or is a **refinement** of $\mathcal{U}$) if every $V \in \mathcal{V}$ is contained in some $U \in \mathcal{U}$. We write $\mathcal{V} \prec \mathcal{U}$.

Note that a refinement may have more sets than the original cover. The point is that each new set is "smaller" in that it fits inside some original set.

**Example:** For the cover $\{(-\infty, 1), (0, \infty)\}$ of $\mathbb{R}$, a refinement is $\{(-\infty, 0], [0, 0.5], (0.25, 0.75), (0.5, \infty)\}$ where each set is contained in one of the original two.

### Star and Barycentric Refinements

These stronger notions of refinement appear in paracompactness and metrization theory.

**Definition:** Let $\mathcal{V}$ be a cover of X. The **star** of a point x with respect to $\mathcal{V}$ is:
$$St(x, \mathcal{V}) = \bigcup\{V \in \mathcal{V} : x \in V\}$$

This is the union of all sets in $\mathcal{V}$ that contain x.

**Definition:** A cover $\mathcal{V}$ is a **star refinement** of $\mathcal{U}$ if for each $x \in X$, the star $St(x, \mathcal{V})$ is contained in some $U \in \mathcal{U}$.

Star refinements are stronger than ordinary refinements: not only must each $V \in \mathcal{V}$ fit in some $U \in \mathcal{U}$, but the entire star around any point must fit in a single U.

**Definition:** For a set A, define $St(A, \mathcal{V}) = \bigcup\{V \in \mathcal{V} : V \cap A \neq \emptyset\}$. A cover $\mathcal{V}$ is a **barycentric refinement** of $\mathcal{U}$ if $\{St(V, \mathcal{V}) : V \in \mathcal{V}\}$ refines $\mathcal{U}$.

## Lebesgue Numbers

The Lebesgue number is a powerful tool that quantifies how "well" an open cover covers a compact metric space.

**Definition:** Let $(X, d)$ be a metric space. A **Lebesgue number** for an open cover $\mathcal{U}$ of X is a positive number $\delta$ such that every subset of X with diameter less than $\delta$ is contained in some member of $\mathcal{U}$.

In other words, if $A \subseteq X$ satisfies $\text{diam}(A) < \delta$, then $A \subseteq U$ for some $U \in \mathcal{U}$.

**Theorem (Lebesgue Covering Lemma):** Every open cover of a compact metric space has a Lebesgue number.

*Proof:* Let $\mathcal{U} = \{U_1, \ldots, U_n\}$ be an open cover of the compact metric space X (we may assume $\mathcal{U}$ is finite by compactness). For each $x \in X$, define:
$$f(x) = \frac{1}{n}\sum_{i=1}^n d(x, X \setminus U_i)$$

This is a continuous function. For each x, at least one $U_i$ contains x, so $d(x, X \setminus U_i) > 0$ for at least one i. Therefore $f(x) > 0$ for all x.

Since f is continuous on the compact space X, it attains a minimum value $\delta = \min_{x \in X} f(x) > 0$.

We claim $\delta$ is a Lebesgue number. Let A have diameter less than $\delta$ and pick any $a \in A$. Then $f(a) \geq \delta > \text{diam}(A)$. There exists some j with $d(a, X \setminus U_j) > \text{diam}(A)$. This means $B(a, \text{diam}(A)) \subseteq U_j$, and since $A \subseteq B(a, \text{diam}(A))$, we have $A \subseteq U_j$.

**Remark:** The Lebesgue number depends on the cover. Different covers of the same space have different Lebesgue numbers. Finer covers typically have smaller Lebesgue numbers.

## Constructing Subcovers

### The Standard Proof Technique

To prove a space X is compact, we must show every open cover has a finite subcover. The standard approach is proof by contradiction:

1. Assume some open cover $\mathcal{U}$ has no finite subcover
2. Use this assumption to construct a sequence, net, or other object
3. Derive a contradiction, often using properties like completeness or the finite intersection property

### Example: Compactness of [a,b]

**Theorem:** The closed interval [a,b] is compact.

*Proof (using the least upper bound property):*

Let $\mathcal{U}$ be an open cover of [a,b]. Define:
$$S = \{x \in [a,b] : [a,x] \text{ can be covered by finitely many sets from } \mathcal{U}\}$$

We prove S is nonempty, bounded above, and that $\sup S = b$.

**Step 1:** $a \in S$. Since $\mathcal{U}$ covers [a,b], some $U \in \mathcal{U}$ contains a. Then [a,a] = {a} is covered by this single set.

**Step 2:** S is bounded above by b, so $s = \sup S$ exists with $a \leq s \leq b$.

**Step 3:** We show $s \in S$. Some $U_\beta \in \mathcal{U}$ contains s. Since $U_\beta$ is open, there exists $\epsilon > 0$ with $(s-\epsilon, s+\epsilon) \cap [a,b] \subseteq U_\beta$. Since s is the supremum, some $x \in S$ satisfies $s - \epsilon < x \leq s$. By definition of S, [a,x] is covered by finitely many sets, say $U_1, \ldots, U_n$. Then $[a,s] \subseteq [a,x] \cup U_\beta$ is covered by $U_1, \ldots, U_n, U_\beta$. Thus $s \in S$.

**Step 4:** We show $s = b$. If $s < b$, then $(s - \epsilon, s + \epsilon) \subseteq U_\beta$ for some $\epsilon$ with $s + \epsilon \leq b$. The interval $[a, s + \epsilon/2]$ is covered by finitely many sets (since [a,s] is and $[s, s+\epsilon/2] \subseteq U_\beta$). This means $s + \epsilon/2 \in S$, contradicting that s is an upper bound.

Therefore $s = b$, meaning [a,b] has a finite subcover from $\mathcal{U}$.

## Lindelöf Spaces

A weaker form of compactness requires only countable subcovers.

**Definition:** A space is **Lindelöf** if every open cover has a countable subcover.

**Theorem:** Every second-countable space is Lindelöf.

*Proof:* Let $\mathcal{B}$ be a countable base for X. For each $U_\alpha$ in an open cover and each $x \in U_\alpha$, choose $B_x \in \mathcal{B}$ with $x \in B_x \subseteq U_\alpha$. The collection $\{B_x : x \in X\}$ is a subset of $\mathcal{B}$, hence countable, and covers X. For each basis element in this cover, choose one $U_\alpha$ containing it. This gives a countable subcover.

**Corollary:** Every compact space is Lindelöf. Every second-countable compact space has a countable dense subset (is separable).

## Point-Finite and Locally Finite Covers

These properties of covers are important for paracompactness.

**Definition:** An open cover $\mathcal{U}$ is:
- **Point-finite** if each point of X belongs to only finitely many members of $\mathcal{U}$
- **Locally finite** if each point has a neighborhood meeting only finitely many members of $\mathcal{U}$

Locally finite implies point-finite, but not conversely.

**Theorem:** Every open cover of a compact space has a finite subcover, hence is trivially point-finite and locally finite (being finite).

**Theorem (Characterization):** A regular space is paracompact if and only if every open cover has a locally finite open refinement.

## Key Takeaways

- Open covers are collections of open sets whose union contains the space
- Refinements allow comparison of covers, with one being "finer" than another
- Star and barycentric refinements are stronger notions used in metrization theory
- The Lebesgue covering lemma guarantees a positive "Lebesgue number" for covers of compact metric spaces
- The proof of compactness for [a,b] uses the least upper bound property of real numbers
- Lindelöf spaces generalize compactness by requiring only countable subcovers
- Point-finite and locally finite covers are important for paracompactness theory
