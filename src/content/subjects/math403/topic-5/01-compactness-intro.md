# Introduction to Compactness

Compactness is one of the most important concepts in topology, generalizing the notion of closed and bounded sets in Euclidean space to arbitrary topological spaces.

## Motivation

In analysis, the Extreme Value Theorem states that a continuous function on a closed bounded interval attains its maximum and minimum values. The concept of compactness captures exactly what properties of "closed and bounded" make such theorems work.

## Definition of Compactness

**Definition (Open Cover):** An **open cover** of a topological space X is a collection $\mathcal{U} = \{U_\alpha : \alpha \in A\}$ of open sets whose union contains X:
$$X \subseteq \bigcup_{\alpha \in A} U_\alpha$$

**Definition (Subcover):** A **subcover** of an open cover $\mathcal{U}$ is a subcollection of $\mathcal{U}$ that still covers X.

**Definition (Compact Space):** A topological space X is **compact** if every open cover of X has a finite subcover.

## Examples of Compact Spaces

### Example 1: Finite Spaces
Any finite topological space is compact. Given any open cover, we can select a finite subcover by choosing one open set for each point.

### Example 2: The Closed Interval [0,1]
The closed interval [0,1] with the standard topology is compact (Heine-Borel theorem). This is not obvious and requires careful proof.

### Example 3: The Cantor Set
The Cantor set is compact as a closed subset of [0,1].

## Non-Examples

### Example 4: Open Interval (0,1)
The open interval (0,1) is not compact. The cover $\{(1/n, 1) : n \geq 2\}$ has no finite subcover.

### Example 5: The Real Line
$\mathbb{R}$ is not compact. The cover $\{(-n, n) : n \in \mathbb{N}\}$ has no finite subcover.

## Basic Properties

**Theorem:** A compact subset of a Hausdorff space is closed.

*Proof:* Let K be a compact subset of a Hausdorff space X. For any point $x \notin K$, we can separate x from each point of K by disjoint open sets. Using compactness of K, we obtain a neighborhood of x disjoint from K.

**Theorem:** A closed subset of a compact space is compact.

*Proof:* Let C be a closed subset of a compact space X. Any open cover of C can be extended to an open cover of X by adding $X \setminus C$. The finite subcover of X yields a finite subcover of C.

**Theorem:** The continuous image of a compact space is compact.

*Proof:* Let $f: X \to Y$ be continuous with X compact. If $\{V_\alpha\}$ covers f(X), then $\{f^{-1}(V_\alpha)\}$ covers X. A finite subcover of X corresponds to a finite subcover of f(X).

## Compactness and Continuity

One of the most important applications of compactness involves continuous functions.

**Theorem (Extreme Value Theorem):** A continuous real-valued function on a compact space attains its maximum and minimum values.

*Proof:* The image f(X) is compact in $\mathbb{R}$, hence closed and bounded. A closed bounded subset of $\mathbb{R}$ contains its supremum and infimum.

**Theorem:** A continuous bijection from a compact space to a Hausdorff space is a homeomorphism.

*Proof:* We need to show $f^{-1}$ is continuous, equivalently that f maps closed sets to closed sets. Closed subsets of a compact space are compact, and compact subsets of a Hausdorff space are closed.

## The Finite Intersection Property

**Definition:** A collection of sets has the **finite intersection property (FIP)** if every finite subcollection has non-empty intersection.

**Theorem:** A space X is compact if and only if every collection of closed sets with the FIP has non-empty intersection.

This characterization is often useful in proving compactness results.
