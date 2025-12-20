---
title: "Boundary of a Set"
slug: "boundary"
description: "Study of boundary points, frontier, and their relationship to interior and closure"
order: 5
---

# Boundary of a Set

## Introduction

The boundary of a set captures the intuitive notion of the "edge" or "frontier" of the set. Points on the boundary are those where the set and its complement "meet." Understanding boundaries is crucial for analyzing topological properties and for applications in analysis and geometry.

## Definition of Boundary

**Definition 5.1 (Boundary):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. The **boundary** of $A$, denoted $\partial A$ or $\text{bd}(A)$ or $\text{Fr}(A)$ (for frontier), is defined as:
$$\partial A = \overline{A} \cap \overline{X \setminus A}$$

Alternatively, $\partial A = \overline{A} \setminus \text{int}(A)$.

**Intuition:** A point is in the boundary if it's in the closure of $A$ but not in the interior of $A$. This means every neighborhood of the point contains both points of $A$ and points not in $A$.

## Equivalent Characterizations

**Theorem 5.1 (Characterizations of Boundary):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. The following are equivalent for a point $x \in X$:

1. $x \in \partial A$
2. Every open set containing $x$ intersects both $A$ and $X \setminus A$
3. $x \in \overline{A}$ and $x \notin \text{int}(A)$
4. $x \in \overline{A}$ and $x \in \overline{X \setminus A}$

**Proof:**

$(1) \Rightarrow (2)$: Suppose $x \in \partial A = \overline{A} \cap \overline{X \setminus A}$. Then $x \in \overline{A}$ and $x \in \overline{X \setminus A}$. Let $U$ be any open set containing $x$. Since $x \in \overline{A}$, by definition of closure, $U \cap A \neq \emptyset$. Since $x \in \overline{X \setminus A}$, we have $U \cap (X \setminus A) \neq \emptyset$. Therefore $U$ intersects both $A$ and $X \setminus A$.

$(2) \Rightarrow (3)$: Suppose every open set containing $x$ intersects both $A$ and $X \setminus A$. In particular, every open set containing $x$ intersects $A$, so $x \in \overline{A}$.

To show $x \notin \text{int}(A)$, assume for contradiction that $x \in \text{int}(A)$. Then there exists an open set $U$ with $x \in U \subseteq A$. But by hypothesis, $U$ must intersect $X \setminus A$, meaning there exists $y \in U$ with $y \notin A$. This contradicts $U \subseteq A$. Therefore $x \notin \text{int}(A)$.

$(3) \Rightarrow (4)$: Suppose $x \in \overline{A}$ and $x \notin \text{int}(A)$. We need to show $x \in \overline{X \setminus A}$.

Let $U$ be any open set containing $x$. Since $x \notin \text{int}(A)$, we cannot have $U \subseteq A$ (otherwise $x$ would be in the interior). Therefore $U \not\subseteq A$, meaning $U \cap (X \setminus A) \neq \emptyset$. Thus every open set containing $x$ intersects $X \setminus A$, so $x \in \overline{X \setminus A}$.

$(4) \Rightarrow (1)$: This is immediate from the definition $\partial A = \overline{A} \cap \overline{X \setminus A}$. $\square$

## Examples

**Example 5.1:** In $\mathbb{R}$ with the standard topology:

1. $\partial[0, 1] = \{0, 1\}$
   - $\overline{[0,1]} = [0, 1]$
   - $\text{int}([0, 1]) = (0, 1)$
   - $\partial[0, 1] = [0, 1] \setminus (0, 1) = \{0, 1\}$

2. $\partial(0, 1) = \{0, 1\}$
   - $\overline{(0, 1)} = [0, 1]$
   - $\text{int}((0, 1)) = (0, 1)$
   - $\partial(0, 1) = [0, 1] \setminus (0, 1) = \{0, 1\}$

3. $\partial\mathbb{Q} = \mathbb{R}$
   - $\overline{\mathbb{Q}} = \mathbb{R}$ (rationals are dense)
   - $\text{int}(\mathbb{Q}) = \emptyset$ (every open interval contains irrationals)
   - $\partial\mathbb{Q} = \mathbb{R} \setminus \emptyset = \mathbb{R}$

4. $\partial\{0\} = \{0\}$
   - $\overline{\{0\}} = \{0\}$
   - $\text{int}(\{0\}) = \emptyset$
   - $\partial\{0\} = \{0\}$

5. $\partial\mathbb{R} = \emptyset$
   - $\overline{\mathbb{R}} = \mathbb{R}$
   - $\text{int}(\mathbb{R}) = \mathbb{R}$
   - $\partial\mathbb{R} = \mathbb{R} \setminus \mathbb{R} = \emptyset$

**Example 5.2:** In $\mathbb{R}^2$ with the standard topology:

1. For the open disk $D = \{(x, y) : x^2 + y^2 < 1\}$:
   - $\partial D = \{(x, y) : x^2 + y^2 = 1\}$ (the unit circle)

2. For the closed disk $\overline{D} = \{(x, y) : x^2 + y^2 \leq 1\}$:
   - $\partial\overline{D} = \{(x, y) : x^2 + y^2 = 1\}$ (the unit circle)

3. For a single point $\{(0, 0)\}$:
   - $\partial\{(0, 0)\} = \{(0, 0)\}$

**Example 5.3:** In the discrete topology on any set $X$:
- For any $A \subseteq X$: $\partial A = \emptyset$
- This is because $\text{int}(A) = A$ (every set is open) and $\overline{A} = A$ (every set is closed)

**Example 5.4:** In the indiscrete topology on $X$ (where $|X| \geq 2$):
- For any non-empty proper subset $A \subsetneq X$: $\partial A = X$
- This is because $\overline{A} = X$ and $\text{int}(A) = \emptyset$

## Properties of Boundary

**Theorem 5.2 (Properties of Boundary):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. Then:

1. $\partial A$ is closed
2. $\partial A = \partial(X \setminus A)$
3. $\partial A = \emptyset$ if and only if $A$ is clopen (both open and closed)
4. $\overline{A} = A \cup \partial A$
5. $\text{int}(A) = A \setminus \partial A$
6. $X = \text{int}(A) \sqcup \partial A \sqcup \text{int}(X \setminus A)$ (disjoint union)

**Proof:**

1. We have $\partial A = \overline{A} \cap \overline{X \setminus A}$. Both $\overline{A}$ and $\overline{X \setminus A}$ are closed (closures are always closed). An intersection of closed sets is closed. Therefore $\partial A$ is closed.

2. Using the definition:
   $$\partial(X \setminus A) = \overline{X \setminus A} \cap \overline{X \setminus (X \setminus A)} = \overline{X \setminus A} \cap \overline{A} = \partial A$$

3. ($\Rightarrow$) Suppose $\partial A = \emptyset$. Then $\overline{A} \setminus \text{int}(A) = \emptyset$, so $\overline{A} = \text{int}(A)$.

   Since $\text{int}(A) \subseteq A \subseteq \overline{A}$, we have $\text{int}(A) \subseteq A \subseteq \text{int}(A)$, giving $A = \text{int}(A)$. Thus $A$ is open.

   Also, $A = \overline{A}$, so $A$ is closed.

   ($\Leftarrow$) Suppose $A$ is both open and closed. Then $A = \text{int}(A)$ and $A = \overline{A}$. Therefore:
   $$\partial A = \overline{A} \setminus \text{int}(A) = A \setminus A = \emptyset$$

4. For any $x \in X$, we have three possibilities:
   - $x \in \text{int}(A)$: Then $x \in A$ and $x \in \overline{A}$, so $x \in A \cup \partial A$
   - $x \in \partial A$: Then $x \in A \cup \partial A$
   - $x \in \text{int}(X \setminus A)$: Then $x \notin \overline{A}$ (by interior-closure duality), so $x \notin A \cup \partial A$

   Conversely, if $x \in A$, then $x \in \overline{A}$ (since $A \subseteq \overline{A}$). If $x \in \partial A$, then $x \in \overline{A}$. Thus $A \cup \partial A \subseteq \overline{A}$.

   For the reverse inclusion, if $x \in \overline{A}$, then either $x \in \text{int}(A) \subseteq A$ or $x \in \overline{A} \setminus \text{int}(A) = \partial A$. Thus $\overline{A} \subseteq A \cup \partial A$.

5. From (4), we have $\overline{A} = A \cup \partial A$. Since $\partial A = \overline{A} \setminus \text{int}(A)$, we get:
   $$A = \overline{A} \setminus \partial A = \overline{A} \setminus (\overline{A} \setminus \text{int}(A)) = \text{int}(A) \cup (A \setminus \overline{A})$$

   But $A \setminus \overline{A} = \emptyset$ since $A \subseteq \overline{A}$. Actually, let's be more direct:

   We have $\text{int}(A) \subseteq A$ and $\partial A \subseteq \overline{A}$. For any $x \in A$:
   - If $x \in \text{int}(A)$, then $x \notin \partial A$ (by definition of boundary)
   - If $x \notin \text{int}(A)$, then $x \in \overline{A} \setminus \text{int}(A) = \partial A$ (since $x \in A \subseteq \overline{A}$)

   Therefore $A = \text{int}(A) \sqcup (A \cap \partial A)$. But from (4), $\partial A = \overline{A} \setminus A$ is not quite right...

   Let me reconsider: We know $\text{int}(A) = A \cap \text{int}(\overline{A})$ is not generally true. Let's use:
   $$\partial A = \overline{A} \setminus \text{int}(A)$$

   So $\text{int}(A) = \overline{A} \setminus \partial A$. Since $A \subseteq \overline{A}$, we need to be careful.

   Actually: $A \setminus \partial A = A \setminus (\overline{A} \setminus \text{int}(A)) = A \cap (X \setminus \overline{A} \cup \text{int}(A)) = A \cap \text{int}(A) = \text{int}(A)$.

6. We need to show these three sets partition $X$. They're clearly disjoint:
   - $\text{int}(A)$ consists of points with neighborhoods in $A$
   - $\text{int}(X \setminus A)$ consists of points with neighborhoods in $X \setminus A$
   - $\partial A$ consists of points whose neighborhoods intersect both $A$ and $X \setminus A$

   For any $x \in X$, if $x \notin \partial A$, then either $x \in \text{int}(A)$ or $x \in \text{int}(X \setminus A)$ (using $\partial A = \partial(X \setminus A)$ and the interior-closure duality). $\square$

## Boundary and Continuity

Boundaries play an important role in understanding continuity, which we'll explore more later.

**Example 5.5:** A function $f: \mathbb{R} \to \mathbb{R}$ is continuous at a point $x$ if and only if for every $\epsilon > 0$, the preimage $f^{-1}((f(x) - \epsilon, f(x) + \epsilon))$ contains an open neighborhood of $x$. This is related to how the boundary of sets behaves under $f^{-1}$.

## Boundary of Intersections and Unions

**Proposition 5.1:** For subsets $A, B$ of a topological space $X$:

1. $\partial(A \cup B) \subseteq \partial A \cup \partial B$
2. $\partial(A \cap B) \subseteq \partial A \cup \partial B$

Equality need not hold in either case.

**Proof:**

1. We have:
   $$\partial(A \cup B) = \overline{A \cup B} \setminus \text{int}(A \cup B) = (\overline{A} \cup \overline{B}) \setminus (\text{int}(A) \cup \text{int}(B))$$

   A point in this set is in $\overline{A} \cup \overline{B}$ but not in $\text{int}(A) \cup \text{int}(B)$.

   If $x \in \overline{A}$ but $x \notin \text{int}(A) \cup \text{int}(B)$, then $x \notin \text{int}(A)$, so $x \in \partial A$.

   Similarly, if $x \in \overline{B}$ but $x \notin \text{int}(A) \cup \text{int}(B)$, then $x \in \partial B$.

   Therefore $\partial(A \cup B) \subseteq \partial A \cup \partial B$.

2. We have:
   $$\partial(A \cap B) = \overline{A \cap B} \setminus \text{int}(A \cap B)$$

   Since $\overline{A \cap B} \subseteq \overline{A} \cap \overline{B}$ and $\text{int}(A \cap B) = \text{int}(A) \cap \text{int}(B)$:
   $$\partial(A \cap B) \subseteq (\overline{A} \cap \overline{B}) \setminus (\text{int}(A) \cap \text{int}(B))$$

   This is contained in $(\overline{A} \setminus \text{int}(A)) \cup (\overline{B} \setminus \text{int}(B)) = \partial A \cup \partial B$. $\square$

**Example 5.6 (Equality fails):** In $\mathbb{R}$, let $A = [0, 1]$ and $B = [1, 2]$.
- $\partial A = \{0, 1\}$ and $\partial B = \{1, 2\}$
- $\partial(A \cup B) = \partial[0, 2] = \{0, 2\}$
- $\partial A \cup \partial B = \{0, 1, 2\} \neq \{0, 2\}$

## Regular Closed and Regular Open Sets

**Definition 5.2:** A subset $A$ of a topological space is:
- **Regular closed** if $A = \overline{\text{int}(A)}$
- **Regular open** if $A = \text{int}(\overline{A})$

**Example 5.7:** In $\mathbb{R}$:
- $[0, 1]$ is regular closed: $\text{int}([0,1]) = (0, 1)$ and $\overline{(0,1)} = [0, 1]$
- $(0, 1)$ is regular open: $\overline{(0, 1)} = [0, 1]$ and $\text{int}([0, 1]) = (0, 1)$
- $[0, 1)$ is neither regular closed nor regular open:
  - $\overline{\text{int}([0, 1))} = \overline{(0, 1)} = [0, 1] \neq [0, 1)$
  - $\text{int}(\overline{[0, 1)}) = \text{int}([0, 1]) = (0, 1) \neq [0, 1)$

**Proposition 5.2:** A set $A$ is regular closed if and only if $A = \overline{B}$ for some open set $B$.

**Proof:**
($\Rightarrow$) If $A = \overline{\text{int}(A)}$, then $A$ is the closure of the open set $B = \text{int}(A)$.

($\Leftarrow$) If $A = \overline{B}$ for some open set $B$, then $\text{int}(A) = \text{int}(\overline{B}) \supseteq B$ (since open sets are contained in their interiors and $B \subseteq \overline{B}$). Actually, $\text{int}(\overline{B}) \supseteq B$ always, and taking closures: $\overline{\text{int}(A)} \supseteq \overline{B} = A$. Also, $\text{int}(A) \subseteq A$, so $\overline{\text{int}(A)} \subseteq \overline{A} = A$. Thus $A = \overline{\text{int}(A)}$. $\square$

## Relationship to Exterior

**Definition 5.3 (Exterior):** The **exterior** of a set $A$ is:
$$\text{ext}(A) = \text{int}(X \setminus A)$$

**Proposition 5.3:** For any set $A$ in a topological space $X$:
$$X = \text{int}(A) \sqcup \partial A \sqcup \text{ext}(A)$$

This is a restatement of Theorem 5.2(6).

**Example 5.8:** In $\mathbb{R}$, for $A = [0, 1]$:
- $\text{int}(A) = (0, 1)$
- $\partial A = \{0, 1\}$
- $\text{ext}(A) = \text{int}(\mathbb{R} \setminus [0, 1]) = (-\infty, 0) \cup (1, \infty)$
- Indeed, $\mathbb{R} = (0, 1) \sqcup \{0, 1\} \sqcup ((-\infty, 0) \cup (1, \infty))$

## Applications and Visualizations

The boundary is crucial in many areas:

1. **Partial Differential Equations:** Boundary conditions are specified on $\partial\Omega$ where $\Omega$ is a region
2. **Geometry:** The boundary of a manifold with boundary (like a disk or half-space)
3. **Fractals:** Sets like the Cantor set equal their own boundary
4. **Analysis:** The boundary measures the "irregularity" of a set

**Example 5.9 (Cantor Set):** The Cantor set $C \subseteq [0, 1]$ is a classic example where:
- $\text{int}(C) = \emptyset$ (nowhere dense)
- $\overline{C} = C$ (closed set)
- $\partial C = C$ (equals its own boundary)

This is an example of a "fractal" boundary.

## Summary

Key points about boundaries:

1. **Definition:** $\partial A = \overline{A} \cap \overline{X \setminus A} = \overline{A} \setminus \text{int}(A)$
2. **Characterization:** Points where every neighborhood intersects both $A$ and $X \setminus A$
3. **Symmetry:** $\partial A = \partial(X \setminus A)$
4. **Clopen test:** $\partial A = \emptyset \iff A$ is clopen
5. **Partition:** $X = \text{int}(A) \sqcup \partial A \sqcup \text{ext}(A)$
6. **Closure decomposition:** $\overline{A} = A \cup \partial A$

Understanding boundaries is essential for analyzing the fine structure of topological spaces and for applications throughout mathematics.
