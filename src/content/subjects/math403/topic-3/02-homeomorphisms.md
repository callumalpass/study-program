---
title: "Homeomorphisms"
slug: "homeomorphisms"
description: "Study of homeomorphisms as topological equivalences, with examples and invariant properties"
order: 2
---

# Homeomorphisms

## Introduction

In topology, we consider two spaces "the same" if there exists a continuous bijection between them with a continuous inverse. Such maps are called **homeomorphisms**, and they preserve all topological properties. Understanding homeomorphisms is crucial for classifying topological spaces.

## Definition

**Definition 2.1 (Homeomorphism):** A function $f: X \to Y$ between topological spaces is a **homeomorphism** if:
1. $f$ is bijective (one-to-one and onto)
2. $f$ is continuous
3. $f^{-1}: Y \to X$ is continuous

Two spaces $X$ and $Y$ are **homeomorphic**, written $X \cong Y$ or $X \approx Y$, if there exists a homeomorphism between them.

**Warning:** A continuous bijection need not be a homeomorphism! The inverse must also be continuous.

## Equivalent Characterizations

**Theorem 2.1 (Open/Closed Map Characterization):** Let $f: X \to Y$ be a bijection. Then $f$ is a homeomorphism if and only if $f$ is continuous and:
- $f$ maps open sets to open sets (f is an **open map**), OR
- $f$ maps closed sets to closed sets (f is a **closed map**)

**Proof:**

($\Rightarrow$) Suppose $f$ is a homeomorphism. Let $U \subseteq X$ be open. Since $f^{-1}$ is continuous:
$$(f^{-1})^{-1}(U) = f(U)$$
is open in $Y$. Thus $f$ is an open map. Similarly, $f$ is a closed map.

($\Leftarrow$) Suppose $f$ is a continuous bijection that's an open map. To show $f^{-1}$ is continuous, let $U \subseteq X$ be open. Then:
$$(f^{-1})^{-1}(U) = f(U)$$
is open in $Y$ (since $f$ is an open map). Therefore $f^{-1}$ is continuous, making $f$ a homeomorphism.

The proof for closed maps is similar. $\square$

## Basic Examples

**Example 2.1:** The identity function $\text{id}_X: X \to X$ is a homeomorphism.

**Example 2.2:** Any isometry between metric spaces is a homeomorphism.

For instance, $f: \mathbb{R} \to \mathbb{R}$ given by $f(x) = x + 1$ (translation) is a homeomorphism.

**Proof:** $f$ is bijective with inverse $f^{-1}(y) = y - 1$. For any open set $U \subseteq \mathbb{R}$, we have $f(U) = U + 1 = \{u + 1 : u \in U\}$, which is open (translation of an open set is open). Similarly, $f^{-1}$ maps open sets to open sets. $\square$

**Example 2.3:** The function $f: (-\pi/2, \pi/2) \to \mathbb{R}$ given by $f(x) = \tan(x)$ is a homeomorphism.

**Proof:**
- $f$ is bijective with inverse $f^{-1}(y) = \arctan(y)$
- $f$ is continuous (from calculus)
- $f^{-1}$ is continuous (from calculus)

Therefore $(-\pi/2, \pi/2) \cong \mathbb{R}$. $\square$

This shows that a bounded interval can be homeomorphic to the entire real line!

**Example 2.4:** The function $f: [0, 1) \to S^1 \setminus \{(1, 0)\}$ given by $f(t) = (\cos(2\pi t), \sin(2\pi t))$ is a homeomorphism.

Here $S^1 = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}$ is the unit circle.

**Example 2.5 (Non-example):** The function $f: [0, 1) \to S^1$ given by $f(t) = (\cos(2\pi t), \sin(2\pi t))$ is NOT a homeomorphism (even though it's a continuous bijection).

**Proof:** $f$ is continuous and bijective, but $f^{-1}$ is not continuous. Consider the open set $U = [0, 1/2)$ in $[0, 1)$. Then:
$$f(U) = \{(\cos(2\pi t), \sin(2\pi t)) : 0 \leq t < 1/2\}$$

is the "upper semicircle" including $(1, 0)$ but not including $(-1, 0)$. This set is NOT open in $S^1$ (any neighborhood of $(1, 0)$ includes points near $(-1, 0)$).

Since $f$ is an open map but $f(U)$ is not open, we have a contradiction... Actually, let me reconsider. The issue is that $f$ is NOT surjective onto $S^1$. Let me correct:

Actually, if we try to extend $f$ to make it surjective, we can't - there's no continuous way to map $[0, 1)$ onto all of $S^1$ bijectively. The problem is topological: $[0, 1)$ is not compact, while $S^1$ is compact. $\square$

## Non-Examples: Continuous Bijections That Are Not Homeomorphisms

**Example 2.6:** Let $X = [0, 1)$ with the subspace topology from $\mathbb{R}$, and $Y = S^1$ with the subspace topology from $\mathbb{R}^2$. There is no homeomorphism $X \to Y$.

**Proof:** $Y$ is compact but $X$ is not. Compactness is preserved by homeomorphisms (we'll prove this later). Therefore no homeomorphism exists. $\square$

**Example 2.7:** Let $X = \mathbb{R}$ with the standard topology and $Y = \mathbb{R}$ with the discrete topology. The identity function $f: X \to Y$ is a continuous bijection but not a homeomorphism.

**Proof:** $f$ is clearly bijective and continuous (preimages of all sets are open in the standard topology). However, $f^{-1}: Y \to X$ is not continuous because $f^{-1}(\{0\}) = \{0\}$ is not open in $X$. $\square$

**Example 2.8:** Consider $f: [0, 2\pi) \to S^1$ given by $f(t) = (\cos t, \sin t)$.

This is a continuous bijection but not a homeomorphism. The set $[0, \pi)$ is open in $[0, 2\pi)$ (it equals $[0, 2\pi) \cap (-1, \pi)$), but its image under $f$ is not open in $S^1$.

## Properties Preserved by Homeomorphisms

Homeomorphisms preserve all topological properties. Here are some key invariants:

**Theorem 2.2 (Topological Invariants):** If $f: X \to Y$ is a homeomorphism, then:

1. **Cardinality:** $|X| = |Y|$
2. **Compactness:** $X$ compact iff $Y$ compact
3. **Connectedness:** $X$ connected iff $Y$ connected
4. **Hausdorff:** $X$ Hausdorff iff $Y$ Hausdorff
5. **Separation axioms:** All $T_i$ properties are preserved
6. **Countability:** First-countable, second-countable preserved
7. **Metrizability:** $X$ metrizable iff $Y$ metrizable

We'll prove these as we encounter each concept. The key idea: topological properties are exactly those preserved by homeomorphisms.

**Contrapositive Use:** If $X$ has a property and $Y$ doesn't, then $X \not\cong Y$.

**Example 2.9:** $\mathbb{R}$ is not homeomorphic to $\mathbb{R}^2$.

**Proof (Sketch):** If we remove a point from $\mathbb{R}$, we get two connected components. If we remove a point from $\mathbb{R}^2$, it remains connected. Since homeomorphisms preserve this property, $\mathbb{R} \not\cong \mathbb{R}^2$. $\square$

**Example 2.10:** The interval $(0, 1)$ is not homeomorphic to the circle $S^1$.

**Proof:** $(0, 1)$ is not compact, but $S^1$ is compact. $\square$

## Homeomorphism as Equivalence Relation

**Theorem 2.3:** Homeomorphism is an equivalence relation on the class of topological spaces.

**Proof:**

**Reflexive:** $\text{id}_X: X \to X$ is a homeomorphism.

**Symmetric:** If $f: X \to Y$ is a homeomorphism, then $f^{-1}: Y \to X$ is a homeomorphism.

**Proof of symmetric:** We need to show $f^{-1}$ is bijective with continuous inverse. Since $f$ is bijective, $f^{-1}$ is bijective. Since $f$ is continuous, $(f^{-1})^{-1} = f$ is continuous. Since $f^{-1}$ is continuous, it's a homeomorphism.

**Transitive:** If $f: X \to Y$ and $g: Y \to Z$ are homeomorphisms, then $g \circ f: X \to Z$ is a homeomorphism.

**Proof of transitive:** $g \circ f$ is bijective (composition of bijections). $g \circ f$ is continuous (composition of continuous functions). The inverse $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$ is continuous (composition of continuous functions). $\square$

This equivalence relation partitions topological spaces into **homeomorphism classes**.

## Local Homeomorphisms

**Definition 2.2 (Local Homeomorphism):** A function $f: X \to Y$ is a **local homeomorphism** if every point $x \in X$ has a neighborhood $U$ such that $f(U)$ is open in $Y$ and $f|_U: U \to f(U)$ is a homeomorphism.

**Example 2.11:** The exponential map $f: \mathbb{R} \to S^1$ given by $f(t) = e^{2\pi i t} = (\cos(2\pi t), \sin(2\pi t))$ is a local homeomorphism but not a homeomorphism.

**Proof:** Each point $t \in \mathbb{R}$ has a neighborhood $(t - 1/4, t + 1/4)$ that maps homeomorphically onto an arc of $S^1$. However, $f$ is not globally injective ($f(t) = f(t+1)$), so it's not a homeomorphism. $\square$

Local homeomorphisms are important in covering space theory and manifold theory.

## Homeomorphisms and Subspaces

**Theorem 2.4:** If $f: X \to Y$ is a homeomorphism and $A \subseteq X$, then $f|_A: A \to f(A)$ is a homeomorphism (where $A$ and $f(A)$ have subspace topologies).

**Proof:**
- $f|_A$ is bijective (restriction of a bijection to a subset)
- $f|_A$ is continuous (restriction of a continuous function)
- $(f|_A)^{-1} = (f^{-1})|_{f(A)}$ is continuous (restriction of $f^{-1}$)

Therefore $f|_A$ is a homeomorphism. $\square$

## Examples of Homeomorphic Spaces

**Example 2.12:** Any two open intervals $(a, b)$ and $(c, d)$ in $\mathbb{R}$ are homeomorphic.

**Proof:** The linear map $f(x) = c + (d-c) \cdot \frac{x-a}{b-a}$ is a homeomorphism. $\square$

**Example 2.13:** All open balls in $\mathbb{R}^n$ are homeomorphic.

**Example 2.14:** The open square $(0, 1) \times (0, 1)$ and the open disk $\{(x, y) : x^2 + y^2 < 1\}$ in $\mathbb{R}^2$ are homeomorphic.

**Proof (Sketch):** Use a radial projection or construct explicitly using smooth functions. $\square$

**Example 2.15:** The sphere $S^2$ minus a point is homeomorphic to $\mathbb{R}^2$.

This is **stereographic projection**, a fundamental example in geometry.

## Determining Non-Homeomorphism

To show two spaces are NOT homeomorphic, we find a topological property that one has and the other doesn't.

**Example 2.16:** Show $[0, 1]$ and $(0, 1)$ are not homeomorphic.

**Proof:** $[0, 1]$ is compact but $(0, 1)$ is not. $\square$

**Example 2.17:** Show $\mathbb{R}$ and $\mathbb{R} \setminus \{0\}$ are not homeomorphic.

**Proof:** $\mathbb{R}$ is connected, but $\mathbb{R} \setminus \{0\} = (-\infty, 0) \cup (0, \infty)$ is disconnected. $\square$

**Example 2.18:** Show the letters "S" and "T" (as subspaces of $\mathbb{R}^2$) are not homeomorphic.

**Proof:** If we remove the "crossing point" from "T", we get three connected components. Removing any single point from "S" leaves at most two components. This property is preserved by homeomorphisms. $\square$

## Automorphisms

**Definition 2.3 (Automorphism):** A homeomorphism $f: X \to X$ from a space to itself is called an **automorphism** of $X$.

The set of all automorphisms of $X$ forms a group under composition, denoted $\text{Aut}(X)$ or $\text{Homeo}(X)$.

**Example 2.19:** For $X = S^1$, the rotation by angle $\theta$ is an automorphism. The group $\text{Aut}(S^1)$ contains the circle group $SO(2)$ as well as reflections.

**Example 2.20:** For $X = \mathbb{R}$, translations $x \mapsto x + a$ and scaling $x \mapsto cx$ (for $c \neq 0$) are automorphisms.

## Summary

Key points about homeomorphisms:

1. **Definition:** Continuous bijection with continuous inverse
2. **Not just bijection:** Continuous bijection $\neq$ homeomorphism
3. **Equivalence relation:** Partitions spaces into classes
4. **Invariants:** Preserves all topological properties
5. **Applications:** Classifying spaces up to topological equivalence
6. **Non-homeomorphism:** Show via invariants (compactness, connectedness, etc.)

Homeomorphisms are the isomorphisms in the category of topological spaces, making them the fundamental notion of "sameness" in topology.
