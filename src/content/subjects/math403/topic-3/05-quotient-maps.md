---
title: "Quotient Maps and Quotient Topology"
slug: "quotient-maps"
description: "Study of quotient maps, quotient topology, and identification spaces"
order: 5
---

# Quotient Maps and Quotient Topology

## Introduction

The quotient topology is a way to create new topological spaces by "gluing together" points of an existing space. This construction is fundamental in topology, allowing us to build complex spaces like the torus, projective spaces, and many others from simpler pieces.

## Quotient Maps

**Definition 5.1 (Quotient Map):** A surjective map $p: X \to Y$ is a **quotient map** if $U \subseteq Y$ is open if and only if $p^{-1}(U)$ is open in $X$.

Equivalently: $Y$ has the finest topology making $p$ continuous.

**Important:** Quotient maps are surjective by definition. They're continuous, but the defining property is stronger: they determine the topology on $Y$.

## Quotient Topology

**Definition 5.2 (Quotient Topology):** Let $p: X \to Y$ be a surjective map. The **quotient topology** on $Y$ is:
$$\mathcal{T}_Y = \{U \subseteq Y : p^{-1}(U) \in \mathcal{T}_X\}$$

With this topology, $p$ is a quotient map.

**Verification:** We need to check this is a topology:
- T1: $p^{-1}(\emptyset) = \emptyset \in \mathcal{T}_X$ and $p^{-1}(Y) = X \in \mathcal{T}_X$
- T2: $p^{-1}(\bigcup_\alpha U_\alpha) = \bigcup_\alpha p^{-1}(U_\alpha)$, a union of open sets
- T3: $p^{-1}(\bigcap_{i=1}^n U_i) = \bigcap_{i=1}^n p^{-1}(U_i)$, a finite intersection of open sets

## Examples

**Example 5.1:** Any continuous surjection $f: X \to Y$ where $X$ is compact and $Y$ is Hausdorff is a quotient map.

**Example 5.2:** The map $p: [0, 1] \to S^1$ given by $p(t) = e^{2\pi i t}$ where we identify $0 \sim 1$ is a quotient map.

The quotient topology on $S^1$ makes it homeomorphic to the circle in $\mathbb{R}^2$.

**Example 5.3:** Let $X = [0, 1] \sqcup [0, 1]$ (two disjoint copies of $[0, 1]$). Define an equivalence relation by identifying corresponding points. The quotient space is homeomorphic to $[0, 1]$.

## Quotient by Equivalence Relation

The most common use of quotient topology:

**Construction:** Let $X$ be a topological space and $\sim$ an equivalence relation on $X$. Let $X/{\sim}$ denote the set of equivalence classes. The **quotient map** is:
$$\pi: X \to X/{\sim}, \quad \pi(x) = [x]$$

The quotient topology on $X/{\sim}$ is the finest topology making $\pi$ continuous.

**Example 5.4 (Torus from Square):** Let $X = [0, 1] \times [0, 1]$. Define equivalence:
$$(x, 0) \sim (x, 1) \text{ for all } x \in [0, 1]$$
$$(0, y) \sim (1, y) \text{ for all } y \in [0, 1]$$

The quotient space $X/{\sim}$ is the **torus** $T^2 = S^1 \times S^1$.

**Visualization:** Glue opposite sides of the square together.

**Example 5.5 (Real Projective Space):** Let $S^n$ be the $n$-sphere. Define $x \sim -x$ (antipodal points). The quotient $\mathbb{RP}^n = S^n/{\sim}$ is **real projective $n$-space**.

For $n = 1$: $\mathbb{RP}^1 \cong S^1$ (homeomorphic to the circle).

## Universal Property

Quotient maps have a crucial universal property:

**Theorem 5.1 (Universal Property):** Let $p: X \to Y$ be a quotient map. A function $f: Y \to Z$ is continuous if and only if $f \circ p: X \to Z$ is continuous.

**Proof:**

($\Rightarrow$) If $f$ is continuous, then $f \circ p$ is continuous (composition of continuous maps).

($\Leftarrow$) Suppose $f \circ p$ is continuous. Let $W \subseteq Z$ be open. We need $f^{-1}(W)$ open in $Y$.

Since $p$ is a quotient map, it suffices to show $p^{-1}(f^{-1}(W))$ is open in $X$. But:
$$p^{-1}(f^{-1}(W)) = (f \circ p)^{-1}(W)$$

which is open since $f \circ p$ is continuous. Therefore $f$ is continuous. $\square$

**Application:** To define a continuous function on a quotient space, define it on the original space and check it respects the equivalence relation.

## Saturated Sets

**Definition 5.3 (Saturated):** Let $p: X \to Y$ be a surjective map. A set $A \subseteq X$ is **saturated** (with respect to $p$) if $A = p^{-1}(p(A))$.

Equivalently: if $p(x) \in p(A)$, then $x \in A$.

**Intuition:** $A$ is a union of complete fibers of $p$.

**Theorem 5.2:** A surjective continuous map $p: X \to Y$ is a quotient map if and only if it maps saturated open sets to open sets (or saturated closed sets to closed sets).

**Example 5.6:** For $p: \mathbb{R} \to S^1$ given by $p(t) = e^{2\pi i t}$, the saturated sets are those of the form $\bigcup_{n \in \mathbb{Z}} (A + n)$ where $A \subseteq [0, 1)$.

## Open and Closed Quotient Maps

**Definition 5.4 (Open/Closed Quotient Map):** A quotient map $p: X \to Y$ is:
- **Open** if $p$ maps open sets to open sets
- **Closed** if $p$ maps closed sets to closed sets

**Example 5.7:** The quotient map $p: [0, 1] \to [0, 1]/\{0, 1\}$ (identifying endpoints) is both open and closed.

**Example 5.8:** Not all quotient maps are open or closed. The projection from a non-compact space can fail to be closed.

## Distinguishing Quotient Maps

**Proposition 5.1:** Every continuous open surjection is a quotient map.

**Proof:** Let $p: X \to Y$ be continuous, open, and surjective. Let $U \subseteq Y$ with $p^{-1}(U)$ open. We need to show $U$ is open.

For any $y \in U$, choose $x \in X$ with $p(x) = y$ (surjectivity). Then $x \in p^{-1}(U)$. Since $p^{-1}(U)$ is open and $p$ is open, there's a neighborhood... Actually, we need a different approach.

Since $p$ is open: $p(p^{-1}(U)) = U$ (using surjectivity). Since $p^{-1}(U)$ is open and $p$ is an open map, $U = p(p^{-1}(U))$ is open. $\square$

Similarly, every continuous closed surjection is a quotient map.

## Examples of Quotient Spaces

**Example 5.9 (Cone):** Let $X$ be a space. The **cone** $CX$ is the quotient of $X \times [0, 1]$ where we identify all points in $X \times \{0\}$ to a single point.

**Example 5.10 (Suspension):** The **suspension** $SX$ is the quotient of $X \times [-1, 1]$ where we identify $X \times \{-1\}$ to one point and $X \times \{1\}$ to another point.

For $X = S^0$ (two points), $SS^0 = S^1$ (circle).
For $X = S^1$, $SS^1 = S^2$ (sphere).

**Example 5.11 (Wedge Sum):** Given pointed spaces $(X, x_0)$ and $(Y, y_0)$, the **wedge sum** $X \vee Y$ is the quotient of $X \sqcup Y$ identifying $x_0 \sim y_0$.

## Non-Examples

**Example 5.12:** The function $f: \mathbb{R} \to \mathbb{R}$ given by $f(x) = x^2$ is NOT a quotient map.

**Proof:** $f$ is continuous and surjective onto $[0, \infty)$. Consider $U = [0, 1)$ open in the quotient topology on $[0, \infty)$. We have:
$$f^{-1}([0, 1)) = [-1, 1)$$
which is not open in $\mathbb{R}$. But wait, we need to consider the quotient topology, not the standard topology.

Let me reconsider: $f: \mathbb{R} \to [0, \infty)$ with standard topology on both. Then $f$ is continuous but not a quotient map because...

Actually, $f^{-1}([0, 1)) = (-1, 1)$ which IS open. Let me use a better example:

**Example 5.12 (Corrected):** Consider $f: [0, 1) \cup [2, 3] \to [0, 2]$ given by:
$$f(x) = \begin{cases} x & x \in [0, 1) \\ x - 1 & x \in [2, 3] \end{cases}$$

This is continuous and surjective but not a quotient map (the image of the closed set $[2, 3]$ is $[1, 2]$, but this doesn't determine the topology correctly).

## Composition of Quotient Maps

**Proposition 5.2:** The composition of quotient maps is a quotient map.

**Proof:** Let $p: X \to Y$ and $q: Y \to Z$ be quotient maps. We show $q \circ p$ is a quotient map.

Let $U \subseteq Z$. Then:
$$U \text{ open in } Z \iff q^{-1}(U) \text{ open in } Y \iff p^{-1}(q^{-1}(U)) \text{ open in } X$$

Since $p^{-1}(q^{-1}(U)) = (q \circ p)^{-1}(U)$, we have $U$ open in $Z$ iff $(q \circ p)^{-1}(U)$ open in $X$. Thus $q \circ p$ is a quotient map. $\square$

## Summary

Key points:

1. **Quotient map:** Surjective map determining topology on codomain
2. **Quotient topology:** $U$ open iff $p^{-1}(U)$ open
3. **Equivalence relations:** Main construction method
4. **Universal property:** Functions from quotient continuous iff composition is
5. **Examples:** Torus, projective spaces, cones, suspensions
6. **Applications:** Building complex spaces from simple ones

Quotient topology is the dual of subspace topology and is fundamental for constructing new spaces in algebraic topology.
