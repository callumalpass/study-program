---
title: "Topological Properties"
slug: "topological-properties"
description: "Study of properties preserved by homeomorphisms and continuous maps"
order: 3
---

# Topological Properties

## Introduction

A **topological property** (or **topological invariant**) is a property of topological spaces that is preserved by homeomorphisms. If $X$ has the property and $f: X \to Y$ is a homeomorphism, then $Y$ also has the property. These are the properties that topology studies - they depend only on the topological structure, not on any additional structure like metrics or coordinates.

## Definition

**Definition 3.1 (Topological Property):** A property $P$ of topological spaces is a **topological property** (or **topological invariant**) if whenever $X$ has property $P$ and $f: X \to Y$ is a homeomorphism, then $Y$ also has property $P$.

Equivalently, $P$ is topological if $X \cong Y$ and $X$ has $P$ implies $Y$ has $P$.

## Examples of Topological Properties

We'll encounter many topological properties throughout this course. Here's an overview:

### Cardinality Properties

**Property 3.1 (Finite/Infinite):** Being finite or infinite is a topological property.

**Proof:** A homeomorphism is a bijection, so it preserves cardinality. If $|X| = n$ (finite) and $f: X \to Y$ is a homeomorphism, then $|Y| = n$. $\square$

**Property 3.2 (Countable/Uncountable):** Being countable or uncountable is topological.

### Separation Properties

**Property 3.3 (Hausdorff - $T_2$):** A space $X$ is **Hausdorff** if for any two distinct points $x, y \in X$, there exist disjoint open sets $U, V$ with $x \in U$ and $y \in V$.

**Theorem 3.1:** The Hausdorff property is topological.

**Proof:** Let $X$ be Hausdorff and $f: X \to Y$ be a homeomorphism. Let $y_1, y_2 \in Y$ be distinct. Since $f$ is bijective, $x_1 = f^{-1}(y_1)$ and $x_2 = f^{-1}(y_2)$ are distinct points in $X$.

Since $X$ is Hausdorff, there exist disjoint open sets $U_1, U_2$ in $X$ with $x_1 \in U_1$ and $x_2 \in U_2$. Since $f$ is a homeomorphism (open map), $V_1 = f(U_1)$ and $V_2 = f(U_2)$ are open in $Y$.

We have $y_1 \in V_1$, $y_2 \in V_2$, and $V_1 \cap V_2 = f(U_1) \cap f(U_2) = f(U_1 \cap U_2) = f(\emptyset) = \emptyset$. Therefore $Y$ is Hausdorff. $\square$

**Example:** $\mathbb{R}$ with the standard topology is Hausdorff. So is any metric space.

**Example:** $X = \{a, b\}$ with topology $\{\emptyset, \{a\}, X\}$ is NOT Hausdorff (can't separate $a$ and $b$).

### Compactness

**Property 3.4 (Compact):** A space $X$ is **compact** if every open cover has a finite subcover.

**Theorem 3.2:** Compactness is a topological property.

**Proof:** Let $X$ be compact and $f: X \to Y$ be a homeomorphism. Let $\{V_\alpha\}_{\alpha \in I}$ be an open cover of $Y$. Then $\{f^{-1}(V_\alpha)\}_{\alpha \in I}$ is an open cover of $X$ (since $f$ is continuous).

Since $X$ is compact, there exists a finite subcover $\{f^{-1}(V_{\alpha_1}), \ldots, f^{-1}(V_{\alpha_n})\}$. Then:
$$Y = f(X) = f\left(\bigcup_{i=1}^n f^{-1}(V_{\alpha_i})\right) = \bigcup_{i=1}^n f(f^{-1}(V_{\alpha_i})) = \bigcup_{i=1}^n V_{\alpha_i}$$

Therefore $\{V_{\alpha_1}, \ldots, V_{\alpha_n}\}$ is a finite subcover of $Y$. Thus $Y$ is compact. $\square$

**Application:** Since $[0, 1]$ is compact and $(0, 1)$ is not, we have $[0, 1] \not\cong (0, 1)$.

### Connectedness

**Property 3.5 (Connected):** A space $X$ is **connected** if it cannot be written as the union of two disjoint non-empty open sets.

**Theorem 3.3:** Connectedness is a topological property.

**Proof:** Let $X$ be connected and $f: X \to Y$ be a homeomorphism. Suppose $Y = U \cup V$ where $U, V$ are disjoint non-empty open sets. Since $f$ is continuous:
$$X = f^{-1}(Y) = f^{-1}(U) \cup f^{-1}(V)$$

Both $f^{-1}(U)$ and $f^{-1}(V)$ are open (by continuity), non-empty (since $f$ is surjective), and disjoint. This contradicts the connectedness of $X$. Therefore no such decomposition of $Y$ exists, so $Y$ is connected. $\square$

**Application:** $\mathbb{R}$ is connected but $\mathbb{R} \setminus \{0\}$ is not, so $\mathbb{R} \not\cong \mathbb{R} \setminus \{0\}$.

### Countability Properties

**Property 3.6 (First-Countable):** A space $X$ is **first-countable** if every point has a countable local basis.

**Property 3.7 (Second-Countable):** A space $X$ is **second-countable** if it has a countable basis.

**Theorem 3.4:** First-countability and second-countability are topological properties.

**Proof Sketch:** A homeomorphism $f: X \to Y$ maps local bases at $x$ to local bases at $f(x)$, and maps a basis for $X$ to a basis for $Y$. Countability is preserved. $\square$

**Example:** $\mathbb{R}^n$ is second-countable (use balls with rational centers and radii).

### Metrizability

**Property 3.8 (Metrizable):** A space $X$ is **metrizable** if its topology comes from some metric.

**Theorem 3.5:** Metrizability is a topological property.

**Proof:** If $X$ is metrizable with metric $d$ and $f: X \to Y$ is a homeomorphism, define:
$$d_Y(y_1, y_2) = d(f^{-1}(y_1), f^{-1}(y_2))$$

This is a metric on $Y$ inducing the topology of $Y$. $\square$

## Non-Topological Properties

Not all properties of spaces are topological. Properties that depend on additional structure (like metrics or coordinate systems) may not be preserved by homeomorphisms.

**Example 3.1 (Diameter):** The diameter of a metric space is NOT a topological property.

Consider $\mathbb{R}$ with the standard metric (unbounded diameter) and $(0, 1)$ with the standard metric (diameter 1). The function $f: (0, 1) \to \mathbb{R}$ given by $f(x) = \tan(\pi(x - 1/2))$ is a homeomorphism, but diameters differ.

**Example 3.2 (Boundedness):** Being bounded in a metric space is NOT topological.

$(0, 1)$ is bounded, $\mathbb{R}$ is unbounded, but $(0, 1) \cong \mathbb{R}$.

**Example 3.3 (Completeness):** Being a complete metric space is NOT topological.

$(0, 1)$ is not complete (the sequence $1/n$ is Cauchy but doesn't converge in $(0, 1)$), while $\mathbb{R}$ is complete. But $(0, 1) \cong \mathbb{R}$ as topological spaces.

**Example 3.4 (Convexity):** Being a convex subset of $\mathbb{R}^n$ is NOT topological.

A circle in $\mathbb{R}^2$ is homeomorphic to a square, but the circle is not convex while the square is.

**Example 3.5 (Differentiability):** Properties involving derivatives are NOT topological.

The function $f: \mathbb{R} \to \mathbb{R}$ with $f(x) = |x|$ and $g: \mathbb{R} \to \mathbb{R}$ with $g(x) = x$ are homeomorphisms of $\mathbb{R}$, but $f$ is not differentiable at 0 while $g$ is everywhere differentiable.

## Hereditary Properties

**Definition 3.2 (Hereditary Property):** A topological property $P$ is **hereditary** if whenever $X$ has $P$ and $A \subseteq X$ (with subspace topology), then $A$ has $P$.

**Example 3.6:** Metrizability is hereditary - subspaces of metric spaces are metric spaces.

**Example 3.7:** Second-countability is hereditary - a subspace of a second-countable space is second-countable.

**Example 3.8:** Compactness is NOT hereditary - $(0, 1) \subseteq [0, 1]$ but $(0, 1)$ is not compact.

**Example 3.9:** Connectedness is NOT hereditary - $\{0, 1\} \subseteq [0, 1]$ but $\{0, 1\}$ is not connected.

## Productive Properties

**Definition 3.3 (Productive Property):** A property $P$ is **productive** if whenever each $X_\alpha$ has $P$, then $\prod_\alpha X_\alpha$ (with product topology) has $P$.

**Example 3.10:** Compactness is productive (Tychonoff's theorem).

**Example 3.11:** Connectedness is productive for finite products.

**Example 3.12:** Metrizability is NOT productive - $\mathbb{R}^\mathbb{N}$ (countable product) is metrizable, but $\mathbb{R}^I$ for uncountable $I$ is not.

## Using Topological Properties

### To Prove Non-Homeomorphism

**Strategy:** To show $X \not\cong Y$, find a topological property that one has and the other doesn't.

**Example 3.13:** Show $\mathbb{R}$ and $\mathbb{R}^2$ are not homeomorphic.

**Proof:** If we remove a point from $\mathbb{R}$, we get a disconnected space (two components). If we remove a point from $\mathbb{R}^2$, it remains connected. This property is topological, so $\mathbb{R} \not\cong \mathbb{R}^2$. $\square$

**Example 3.14:** Show $S^1$ (circle) and $[0, 1]$ are not homeomorphic.

**Proof:** $S^1$ is compact but $[0, 1)$ is not... wait, actually $[0, 1]$ IS compact. Let me use a different property:

If we remove any single point from $S^1$, it remains connected. If we remove an interior point from $[0, 1]$, it becomes disconnected. $\square$

### To Classify Spaces

Topological properties help us organize spaces into equivalence classes.

**Example 3.15:** All open intervals in $\mathbb{R}$ are homeomorphic to each other, and to $\mathbb{R}$ itself.

**Example 3.16:** All circles (regardless of radius) are homeomorphic to each other.

## Summary of Common Topological Properties

| Property | Definition | Hereditary? | Productive? |
|----------|------------|-------------|-------------|
| Hausdorff | Distinct points separable | Yes | Yes |
| Compact | Every cover has finite subcover | No | Yes |
| Connected | Not union of disjoint open sets | No | Yes (finite) |
| Path-connected | Any two points joined by path | No | Yes |
| Metrizable | Topology from metric | Yes | No (infinite) |
| First-countable | Countable local basis | Yes | Yes |
| Second-countable | Countable basis | Yes | Yes (countable) |
| Separable | Countable dense subset | Yes | No (uncountable) |

## Topological Properties vs Geometric Properties

- **Topological:** Preserved by all homeomorphisms (stretching, bending allowed)
- **Geometric:** Require specific structure (angles, distances, etc.)

**Example 3.17:** A square and circle are:
- Topologically equivalent (homeomorphic)
- Geometrically different (different curvature)

This distinction is why topology is sometimes called "rubber sheet geometry."

## Summary

Key points:

1. **Definition:** Property preserved by homeomorphisms
2. **Examples:** Compactness, connectedness, Hausdorff, countability
3. **Non-examples:** Diameter, boundedness, completeness, differentiability
4. **Applications:** Proving non-homeomorphism, classifying spaces
5. **Special properties:** Hereditary (pass to subspaces), productive (pass to products)

Topological properties are the fundamental currency of topology - they're what topologists care about and study.
