---
title: "Connected Components"
slug: "components"
description: "Study of connected components and their properties"
order: 4
---

# Connected Components

## Introduction

Every topological space can be decomposed into maximal connected subsets called connected components. This decomposition reveals the fundamental structure of the space and provides a way to understand disconnected spaces through their connected pieces.

## Definition

**Definition 4.1 (Connected Component):** For a point $x$ in a topological space $X$, the **connected component** of $x$, denoted $C_x$ or $C(x)$, is the union of all connected subsets of $X$ that contain $x$.

Equivalently, $C_x$ is the largest connected subset containing $x$.

**Theorem 4.1:** The connected component $C_x$ is indeed connected.

**Proof:** $C_x$ is a union of connected sets (all connected subsets containing $x$), and all these sets have $x$ in common. By the theorem on unions of connected sets with a common point, $C_x$ is connected. $\square$

**Theorem 4.2:** The connected component $C_x$ is closed.

**Proof:** Since $C_x$ is connected, its closure $\overline{C_x}$ is also connected (closure of connected is connected). Since $\overline{C_x}$ contains $x$ and is connected, by maximality of $C_x$, we have $\overline{C_x} \subseteq C_x$. But $C_x \subseteq \overline{C_x}$ always, so $C_x = \overline{C_x}$, meaning $C_x$ is closed. $\square$

## Components Partition the Space

**Theorem 4.3:** Connected components form a partition of $X$. That is:
1. Every point lies in some component
2. Components are either disjoint or identical
3. $X$ is the union of all components

**Proof:**

(1) Every point $x$ lies in $C_x$ (the singleton $\{x\}$ is connected and contains $x$).

(2) Suppose $C_x \cap C_y \neq \emptyset$. Then $C_x \cup C_y$ is a union of two connected sets with a common point (any point in the intersection), hence connected. Since $C_x \cup C_y$ contains $x$ and is connected, $C_x \cup C_y \subseteq C_x$ by maximality. Similarly, $C_x \cup C_y \subseteq C_y$. Therefore $C_x = C_y$.

(3) $X = \bigcup_{x \in X} C_x$ since every point is in its component. $\square$

**Corollary 4.1:** A space is connected if and only if it has exactly one connected component.

## Examples

**Example 4.1:** In $\mathbb{R}$ with the standard topology, the only connected component is $\mathbb{R}$ itself.

**Example 4.2:** In $\mathbb{Q}$ with the subspace topology from $\mathbb{R}$, every connected component is a single point (singleton).

**Proof:** We've shown $\mathbb{Q}$ is totally disconnected: any two distinct rationals can be separated by choosing an irrational between them. Therefore the only connected subsets are singletons. $\square$

**Example 4.3:** In $X = [0, 1] \cup [2, 3] \subseteq \mathbb{R}$, there are two connected components: $[0, 1]$ and $[2, 3]$.

**Example 4.4:** In the space $X = \mathbb{Z}$ with the discrete topology, each component is a single point $\{n\}$.

**Example 4.5:** Consider $X = \mathbb{R} \setminus \{0\}$. This has two connected components: $(-\infty, 0)$ and $(0, \infty)$.

## Quasi-Components

**Definition 4.2 (Quasi-Component):** For $x \in X$, the **quasi-component** of $x$ is:
$$Q_x = \bigcap\{U \subseteq X : U \text{ is clopen and } x \in U\}$$

**Theorem 4.4:** $C_x \subseteq Q_x$ for all $x \in X$.

**Proof:** Let $U$ be clopen with $x \in U$. If $y \in C_x$, then $C_x$ is connected and $x \in C_x \cap U$. If $C_x \not\subseteq U$, then $(C_x \cap U, C_x \cap (X \setminus U))$ would be a separation of $C_x$, contradicting connectedness. Therefore $C_x \subseteq U$ for all clopen $U$ containing $x$, so $C_x \subseteq Q_x$. $\square$

**In general:** $C_x \neq Q_x$ is possible, but for locally connected spaces they coincide.

**Theorem 4.5:** If $X$ is compact Hausdorff (or more generally, locally connected), then $C_x = Q_x$.

We won't prove this here, but it's an important result in general topology.

## Number of Components

**Definition 4.3:** The **number of connected components** of $X$, denoted $\pi_0(X)$ or $|\pi_0(X)|$, is the cardinality of the set of connected components.

**Example 4.6:**
- $\pi_0(\mathbb{R}) = 1$ (one component)
- $\pi_0(\mathbb{Q}) = |\mathbb{Q}|$ (countably many components)
- $\pi_0([0,1] \cup [2,3]) = 2$

**Proposition 4.1:** $\pi_0$ is a topological invariant: if $f: X \to Y$ is a homeomorphism, then $\pi_0(X) = \pi_0(Y)$.

**Proof:** A homeomorphism maps components to components bijectively. $\square$

## Local Properties vs Global

**Observation:** Being locally connected (every point has arbitrarily small connected neighborhoods) does not imply being connected globally.

**Example 4.7:** $X = (0, 1) \cup (2, 3)$ is locally connected (every open interval is connected) but globally disconnected.

Conversely, being connected does not imply locally connected:

**Example 4.8:** The topologist's sine curve is connected but not locally connected.

## Countability of Components

**Theorem 4.6:** If $X$ has a countable basis and is locally connected, then $X$ has at most countably many connected components.

**Proof Sketch:** Each component is open (in locally connected spaces) and contains a basis element. Since components are disjoint, we can assign each a distinct basis element, giving an injection from components to the countable basis. $\square$

## Applications

**Application 4.1 (Classification):** The number and nature of components helps classify spaces.

For instance, $\mathbb{R}^n \setminus \{\text{point}\}$ has:
- 2 components for $n = 1$ ($\mathbb{R} \setminus \{0\}$)
- 1 component for $n \geq 2$ ($\mathbb{R}^n \setminus \{0\}$ is connected)

This shows $\mathbb{R}^1 \not\cong \mathbb{R}^n$ for $n \geq 2$ topologically.

**Application 4.2 (Removing Points):** The behavior of components when removing points is a topological invariant used to distinguish spaces.

## Summary

Key points about connected components:

1. **Definition:** Maximal connected subset containing a point
2. **Closed:** Components are always closed (but not always open)
3. **Partition:** Components partition the space into disjoint pieces
4. **Quasi-components:** Related notion using clopen sets
5. **$\pi_0$:** Number of components is a topological invariant
6. **Examples:** $\mathbb{R}$ (1 component), $\mathbb{Q}$ (infinitely many)

Connected components provide the fundamental decomposition of a space into its connected pieces, essential for understanding the global structure.
