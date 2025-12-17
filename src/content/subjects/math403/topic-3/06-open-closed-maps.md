---
title: "Open and Closed Maps"
slug: "open-closed-maps"
description: "Study of open and closed continuous maps and their properties"
order: 6
---

# Open and Closed Maps

## Introduction

While continuity requires preimages of open sets to be open, we can also study maps that send open sets to open sets (open maps) or closed sets to closed sets (closed maps). These properties are independent of continuity and play important roles in topology.

## Definitions

**Definition 6.1 (Open Map):** A function $f: X \to Y$ is an **open map** if for every open set $U \subseteq X$, the image $f(U)$ is open in $Y$.

**Definition 6.2 (Closed Map):** A function $f: X \to Y$ is a **closed map** if for every closed set $C \subseteq X$, the image $f(C)$ is closed in $Y$.

**Important:** These properties are independent of continuity! A map can be:
- Continuous but not open
- Open but not continuous
- Both continuous and open
- Neither continuous nor open

## Examples and Non-Examples

**Example 6.1:** The identity map $\text{id}_X: X \to X$ is both open and closed (and continuous).

**Example 6.2 (Projection):** The projection $\pi_1: \mathbb{R}^2 \to \mathbb{R}$ given by $\pi_1(x, y) = x$ is open but not closed.

**Proof (Open):** Let $U \subseteq \mathbb{R}^2$ be open. For any $x_0 \in \pi_1(U)$, there exists $(x_0, y_0) \in U$. Since $U$ is open, there exists $\epsilon > 0$ with $B((x_0, y_0), \epsilon) \subseteq U$. Then $(x_0 - \epsilon/2, x_0 + \epsilon/2) \subseteq \pi_1(U)$, showing $\pi_1(U)$ is open.

**Proof (Not Closed):** The set $C = \{(x, y) : xy = 1, x > 0\}$ (hyperbola) is closed in $\mathbb{R}^2$, but $\pi_1(C) = (0, \infty)$ is not closed in $\mathbb{R}$. $\square$

**Example 6.3:** The function $f: \mathbb{R} \to \mathbb{R}$ given by $f(x) = x^2$ is continuous and closed but not open.

**Proof (Not Open):** The set $(-1, 1)$ is open in $\mathbb{R}$, but $f((-1, 1)) = [0, 1)$ is not open. $\square$

**Example 6.4:** Let $f: \mathbb{R} \to \mathbb{R}$ be:
$$f(x) = \begin{cases} x & x \in \mathbb{Q} \\ -x & x \notin \mathbb{Q} \end{cases}$$

This is neither continuous, nor open, nor closed.

## Relationship to Homeomorphisms

**Theorem 6.1:** A continuous bijection $f: X \to Y$ is a homeomorphism if and only if it is an open map (or equivalently, if and only if it is a closed map).

**Proof:**

($\Rightarrow$) If $f$ is a homeomorphism, then $f^{-1}$ is continuous. For any open $U \subseteq X$:
$$(f^{-1})^{-1}(U) = f(U)$$
is open in $Y$ (by continuity of $f^{-1}$). Thus $f$ is an open map.

($\Leftarrow$) Suppose $f$ is a continuous bijection that's an open map. To show $f^{-1}$ is continuous, let $U \subseteq X$ be open. Then:
$$(f^{-1})^{-1}(U) = f(U)$$
is open (since $f$ is an open map). Thus $f^{-1}$ is continuous, making $f$ a homeomorphism. $\square$

This is why we required both continuity and openness (or closedness) for homeomorphisms.

## Open Maps and Quotient Maps

**Theorem 6.2:** Every open continuous surjection is a quotient map.

**Proof:** Let $p: X \to Y$ be continuous, open, and surjective. Let $U \subseteq Y$ with $p^{-1}(U)$ open in $X$. Then:
$$U = p(p^{-1}(U))$$
(using surjectivity: $p(p^{-1}(U)) \supseteq U$ always, and $\subseteq$ holds because if $y \in p(p^{-1}(U))$, then $y = p(x)$ for some $x \in p^{-1}(U)$, so $y \in U$).

Since $p^{-1}(U)$ is open and $p$ is an open map, $U = p(p^{-1}(U))$ is open. Thus $p$ is a quotient map. $\square$

Similarly, every closed continuous surjection is a quotient map.

## Proper Maps

**Definition 6.3 (Proper Map):** A continuous map $f: X \to Y$ is **proper** if for every compact set $K \subseteq Y$, the preimage $f^{-1}(K)$ is compact in $X$.

**Theorem 6.3:** A proper map between locally compact Hausdorff spaces is closed.

We'll prove this after studying compactness.

**Example 6.5:** The inclusion $(0, 1) \to \mathbb{R}$ is not proper ($f^{-1}([1/2, 2]) = [1/2, 1)$ is not compact).

**Example 6.6:** Any continuous map from a compact space to a Hausdorff space is proper and closed.

## Local Homeomorphisms

**Definition 6.4 (Local Homeomorphism):** A map $f: X \to Y$ is a **local homeomorphism** if every $x \in X$ has a neighborhood $U$ such that $f(U)$ is open in $Y$ and $f|_U: U \to f(U)$ is a homeomorphism.

**Proposition 6.1:** Every local homeomorphism is an open map.

**Proof:** Let $f$ be a local homeomorphism and $V \subseteq X$ open. For each $x \in V$, there exists a neighborhood $U_x$ such that $f|_{U_x}$ is a homeomorphism onto $f(U_x)$. Then:
$$f(V) = \bigcup_{x \in V} f(V \cap U_x)$$

Each $f(V \cap U_x)$ is open in $f(U_x)$ (since $f|_{U_x}$ is a homeomorphism), and $f(U_x)$ is open in $Y$. Thus $f(V \cap U_x)$ is open in $Y$, so $f(V)$ is open. $\square$

**Example 6.7:** The exponential map $\exp: \mathbb{R} \to S^1$ given by $\exp(t) = e^{2\pi i t}$ is a local homeomorphism but not a homeomorphism (not injective).

## Characterizations

**Theorem 6.4:** For a continuous map $f: X \to Y$ between metric spaces, $f$ is open if and only if for every $x \in X$ and every $\epsilon > 0$, there exists $\delta > 0$ such that $B(f(x), \delta) \subseteq f(B(x, \epsilon))$.

This gives a "pointwise" characterization of open maps in metric spaces.

## Invariance Under Composition

**Proposition 6.2:**
1. The composition of open maps is open
2. The composition of closed maps is closed

**Proof:**
1. Let $f: X \to Y$ and $g: Y \to Z$ be open maps. For any open $U \subseteq X$:
   $$g(f(U)) = (g \circ f)(U)$$
   Since $f(U)$ is open in $Y$ and $g$ is open, $g(f(U))$ is open in $Z$.

2. Similar proof for closed maps. $\square$

## Summary

Key points:

1. **Open maps:** Send open sets to open sets
2. **Closed maps:** Send closed sets to closed sets
3. **Independent of continuity:** Can have any combination
4. **Homeomorphisms:** Continuous bijections that are open (or closed)
5. **Quotient maps:** Open (or closed) continuous surjections are quotient maps
6. **Proper maps:** Continuous maps with compact preimages of compact sets
7. **Applications:** Characterizing homeomorphisms, understanding projections

Open and closed maps provide important tools for analyzing the behavior of continuous functions beyond just continuity itself.
