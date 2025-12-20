---
id: math403-topic-5-1
title: "Introduction to Compactness"
order: 1
---

# Introduction to Compactness

Compactness is one of the most important concepts in topology, generalizing the notion of closed and bounded sets in Euclidean space to arbitrary topological spaces. This fundamental property captures the essence of "finiteness" in an infinite setting and enables many powerful theorems about continuous functions and convergence.

## Historical Motivation

The concept of compactness emerged from attempts to understand what makes certain theorems in real analysis work. In the late 19th century, mathematicians noticed that many important results—such as the Extreme Value Theorem stating that a continuous function on a closed bounded interval attains its maximum and minimum values—depended on specific properties of the domain. The question arose: what exactly about "closed and bounded" makes such theorems possible?

The answer led to the abstract definition of compactness, which distills the essential feature: the ability to reduce infinite situations to finite ones. This insight proved remarkably fruitful, extending the reach of analysis to abstract spaces far beyond Euclidean geometry.

## Definition of Compactness

Before defining compactness, we need the notion of an open cover.

**Definition (Open Cover):** An **open cover** of a topological space X is a collection $\mathcal{U} = \{U_\alpha : \alpha \in A\}$ of open sets whose union contains X:
$$X \subseteq \bigcup_{\alpha \in A} U_\alpha$$

**Definition (Subcover):** A **subcover** of an open cover $\mathcal{U}$ is a subcollection of $\mathcal{U}$ that still covers X. If this subcollection is finite, we call it a **finite subcover**.

**Definition (Compact Space):** A topological space X is **compact** if every open cover of X has a finite subcover.

This definition captures the idea that in a compact space, no matter how we try to cover it with open sets, we can always find a finite number that suffice. This "reduction to the finite" is what gives compactness its power.

## Examples of Compact Spaces

### Example 1: Finite Spaces
Any finite topological space is compact. Given any open cover, we can select a finite subcover by choosing one open set for each of the finitely many points. This example shows that compactness generalizes the notion of finiteness.

### Example 2: The Closed Interval [0,1]
The closed interval [0,1] with the standard topology is compact. This is the content of the Heine-Borel theorem and requires a careful proof (presented in a later subtopic). The compactness of [0,1] is foundational to real analysis and underlies theorems like the Extreme Value Theorem.

### Example 3: The Cantor Set
The Cantor set $C$ is compact as a closed subset of [0,1]. Despite being uncountable and having a complex structure (it's perfect, totally disconnected, and has measure zero), the Cantor set inherits compactness from the ambient interval.

### Example 4: Finite Discrete Spaces
Any finite set with the discrete topology is compact. Each point forms an open singleton, and finitely many singletons cover the space.

## Non-Examples

### Example 5: The Open Interval (0,1)
The open interval (0,1) is not compact. Consider the cover $\mathcal{U} = \{(1/n, 1) : n \geq 2\}$. The union of all these sets equals (0,1), so this is indeed a cover. However, no finite subcollection suffices: if we take $(1/n_1, 1), (1/n_2, 1), \ldots, (1/n_k, 1)$, then points in $(0, 1/\max\{n_1, \ldots, n_k\})$ are not covered.

### Example 6: The Real Line
$\mathbb{R}$ is not compact. The cover $\{(-n, n) : n \in \mathbb{N}\}$ consists of increasingly large intervals whose union is all of $\mathbb{R}$, but no finite subcollection covers the entire line—any finite union of these intervals is bounded.

### Example 7: The Rational Numbers
$\mathbb{Q}$ with the subspace topology from $\mathbb{R}$ is not compact. It is neither closed nor bounded, and one can construct covers without finite subcovers.

## Basic Properties

The following fundamental theorems establish how compactness interacts with other topological notions.

**Theorem 1:** A compact subset of a Hausdorff space is closed.

*Proof:* Let K be a compact subset of a Hausdorff space X. We show $X \setminus K$ is open. For any point $x \notin K$, we use the Hausdorff property: for each $y \in K$, there exist disjoint open sets $U_y$ containing $x$ and $V_y$ containing $y$. The collection $\{V_y : y \in K\}$ covers K. By compactness, finitely many suffice: $K \subseteq V_{y_1} \cup \cdots \cup V_{y_n}$. Then $U = U_{y_1} \cap \cdots \cap U_{y_n}$ is an open neighborhood of $x$ disjoint from K. Since every point outside K has such a neighborhood, $X \setminus K$ is open.

**Theorem 2:** A closed subset of a compact space is compact.

*Proof:* Let C be a closed subset of a compact space X. Consider any open cover $\{U_\alpha\}$ of C. Extend it to an open cover of X by adding $X \setminus C$. By compactness of X, finitely many sets cover X. Removing $X \setminus C$ from this finite collection gives a finite subcover of C.

**Theorem 3:** The continuous image of a compact space is compact.

*Proof:* Let $f: X \to Y$ be continuous with X compact. Suppose $\{V_\alpha\}$ is an open cover of f(X). Then $\{f^{-1}(V_\alpha)\}$ is an open cover of X (by continuity). A finite subcover $\{f^{-1}(V_1), \ldots, f^{-1}(V_n)\}$ of X corresponds to a finite subcover $\{V_1, \ldots, V_n\}$ of f(X).

## Compactness and Continuity

The interaction between compactness and continuous functions yields some of the most important results in analysis.

**Theorem (Extreme Value Theorem):** A continuous real-valued function on a nonempty compact space attains its maximum and minimum values.

*Proof:* Let $f: X \to \mathbb{R}$ be continuous with X compact. The image f(X) is compact in $\mathbb{R}$, hence closed and bounded (by Heine-Borel). A closed bounded subset of $\mathbb{R}$ contains its supremum and infimum, so f attains these extreme values.

**Theorem:** A continuous bijection from a compact space to a Hausdorff space is a homeomorphism.

*Proof:* We need to show $f^{-1}$ is continuous, which is equivalent to showing f maps closed sets to closed sets. Closed subsets of a compact space are compact (Theorem 2), and compact subsets of a Hausdorff space are closed (Theorem 1). Thus f maps closed sets to closed sets, making $f^{-1}$ continuous.

This theorem is remarkably useful: it shows that compactness and Hausdorffness together give us "free" homeomorphisms from continuous bijections.

## The Finite Intersection Property

An alternative characterization of compactness uses closed sets rather than open covers.

**Definition:** A collection of sets has the **finite intersection property (FIP)** if every finite subcollection has non-empty intersection.

**Theorem:** A space X is compact if and only if every collection of closed sets with the FIP has non-empty intersection.

*Proof:* This follows from taking complements: an open cover has no finite subcover if and only if the complements (which are closed) have the FIP but empty total intersection. Thus X is compact iff every collection of closed sets with the FIP has non-empty intersection.

This characterization is often more convenient for proving compactness in applications, particularly in functional analysis and algebra.

## Key Takeaways

- Compactness generalizes "closed and bounded" to abstract topological spaces
- A space is compact if every open cover has a finite subcover
- Closed subsets of compact spaces are compact; compact subsets of Hausdorff spaces are closed
- Continuous images of compact spaces are compact
- The finite intersection property provides an equivalent characterization using closed sets
- Compactness enables powerful theorems about extreme values and homeomorphisms
