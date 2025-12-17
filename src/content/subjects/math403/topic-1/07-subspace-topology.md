---
title: "Subspace Topology"
slug: "subspace-topology"
description: "Comprehensive study of subspace topology, relative topology, and properties inherited by subspaces"
order: 7
---

# Subspace Topology

## Introduction

Given a topological space and a subset, we naturally want to consider the subset as a topological space in its own right. The subspace topology provides the canonical way to do this, ensuring that the inclusion map is continuous and that topological properties are preserved in a natural way.

## Definition of Subspace Topology

**Definition 7.1 (Subspace Topology):** Let $(X, \mathcal{T})$ be a topological space and $Y \subseteq X$ be a subset. The **subspace topology** (or **relative topology** or **induced topology**) on $Y$ is:
$$\mathcal{T}_Y = \{U \cap Y : U \in \mathcal{T}\}$$

A set $V \subseteq Y$ is open in the subspace topology if and only if $V = U \cap Y$ for some open set $U$ in $X$.

The pair $(Y, \mathcal{T}_Y)$ is called a **subspace** of $(X, \mathcal{T})$.

**Verification that $\mathcal{T}_Y$ is a topology:**

- **T1:** $\emptyset = \emptyset \cap Y \in \mathcal{T}_Y$ and $Y = X \cap Y \in \mathcal{T}_Y$ (since $\emptyset, X \in \mathcal{T}$)

- **T2:** Let $\{V_\alpha\}_{\alpha \in I}$ be a collection in $\mathcal{T}_Y$. For each $\alpha$, write $V_\alpha = U_\alpha \cap Y$ where $U_\alpha \in \mathcal{T}$. Then:
  $$\bigcup_{\alpha \in I} V_\alpha = \bigcup_{\alpha \in I} (U_\alpha \cap Y) = \left(\bigcup_{\alpha \in I} U_\alpha\right) \cap Y$$
  Since $\bigcup_{\alpha \in I} U_\alpha \in \mathcal{T}$, we have $\bigcup_{\alpha \in I} V_\alpha \in \mathcal{T}_Y$.

- **T3:** Let $V_1, \ldots, V_n \in \mathcal{T}_Y$. For each $i$, write $V_i = U_i \cap Y$ where $U_i \in \mathcal{T}$. Then:
  $$\bigcap_{i=1}^n V_i = \bigcap_{i=1}^n (U_i \cap Y) = \left(\bigcap_{i=1}^n U_i\right) \cap Y$$
  Since $\bigcap_{i=1}^n U_i \in \mathcal{T}$, we have $\bigcap_{i=1}^n V_i \in \mathcal{T}_Y$.

## Examples

**Example 7.1:** Let $Y = [0, 2] \subseteq \mathbb{R}$ with $\mathbb{R}$ having the standard topology.

Open sets in $Y$ include:
- $[0, 1) = (-1, 1) \cap [0, 2]$ (open in $Y$, not in $\mathbb{R}$)
- $(1, 2] = (1, 3) \cap [0, 2]$ (open in $Y$, not in $\mathbb{R}$)
- $[0, 2] = \mathbb{R} \cap [0, 2]$ (open in $Y$, not in $\mathbb{R}$)
- $(1/2, 3/2) = (1/2, 3/2) \cap [0, 2]$ (open in both $Y$ and $\mathbb{R}$)

**Important observation:** $[0, 1)$ is open in $[0, 2]$ but not open in $\mathbb{R}$. Whether a set is "open" depends on the ambient space.

**Example 7.2:** Let $Y = \{a, b\} \subseteq X = \{a, b, c\}$ where $X$ has topology $\mathcal{T} = \{\emptyset, \{a\}, \{a, b\}, X\}$.

The subspace topology on $Y$ is:
$$\mathcal{T}_Y = \{\emptyset \cap Y, \{a\} \cap Y, \{a,b\} \cap Y, X \cap Y\} = \{\emptyset, \{a\}, \{a,b\}, \{a,b\}\} = \{\emptyset, \{a\}, Y\}$$

This is the Sierpiński topology on $\{a, b\}$.

**Example 7.3:** The unit circle $S^1 = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}$ with the subspace topology from $\mathbb{R}^2$.

An open set in $S^1$ looks like an "arc." For instance:
$$V = \{(\cos\theta, \sin\theta) : 0 < \theta < \pi\} = U \cap S^1$$
where $U = \{(x, y) \in \mathbb{R}^2 : y > 0\}$ is open in $\mathbb{R}^2$.

**Example 7.4:** The integers $\mathbb{Z} \subseteq \mathbb{R}$ with the subspace topology.

Every subset of $\mathbb{Z}$ is open in the subspace topology! To see this, note that for any $A \subseteq \mathbb{Z}$:
$$A = \left(\bigcup_{n \in A} (n - 1/2, n + 1/2)\right) \cap \mathbb{Z}$$

The union is open in $\mathbb{R}$, so $A$ is open in $\mathbb{Z}$. Therefore $\mathbb{Z}$ has the discrete topology.

**Example 7.5:** The rationals $\mathbb{Q} \subseteq \mathbb{R}$ with the subspace topology.

This is NOT the discrete topology. For instance, $\mathbb{Z} \subseteq \mathbb{Q}$ is not open in $\mathbb{Q}$ (though it is open in the discrete topology on $\mathbb{Q}$).

To see this, suppose $\mathbb{Z} = U \cap \mathbb{Q}$ for some open $U \subseteq \mathbb{R}$. Then $0 \in U$, so there exists $\epsilon > 0$ with $(-\epsilon, \epsilon) \subseteq U$. But then $(-\epsilon, \epsilon) \cap \mathbb{Q} \subseteq U \cap \mathbb{Q} = \mathbb{Z}$, meaning all rationals in $(-\epsilon, \epsilon)$ are integers - contradiction.

## Closed Sets in Subspaces

**Theorem 7.1 (Closed Sets in Subspaces):** Let $Y$ be a subspace of $X$. A set $F \subseteq Y$ is closed in $Y$ if and only if $F = C \cap Y$ for some closed set $C$ in $X$.

**Proof:**

($\Leftarrow$) Suppose $F = C \cap Y$ where $C$ is closed in $X$. Then $X \setminus C$ is open in $X$. We have:
$$Y \setminus F = Y \setminus (C \cap Y) = Y \cap (X \setminus C)$$

Since $X \setminus C$ is open in $X$, $Y \setminus F$ is open in $Y$. Therefore $F$ is closed in $Y$.

($\Rightarrow$) Suppose $F$ is closed in $Y$. Then $Y \setminus F$ is open in $Y$, so $Y \setminus F = U \cap Y$ for some open $U$ in $X$. We have:
$$F = Y \setminus (Y \setminus F) = Y \setminus (U \cap Y) = Y \cap (X \setminus U)$$

Since $U$ is open in $X$, $X \setminus U$ is closed in $X$. Taking $C = X \setminus U$, we get $F = C \cap Y$. $\square$

**Example 7.6:** In $Y = [0, 2] \subseteq \mathbb{R}$:
- $\{0\}$ is closed in $Y$ because $\{0\} = (-\infty, 0] \cap [0, 2]$ and $(-\infty, 0]$ is closed in $\mathbb{R}$
- $[0, 1)$ is closed in $Y$ because $[0, 1) = [0, 1] \cap [0, 2]$ (wait, this is wrong - let me reconsider)

Actually, $[0, 1)$ is NOT closed in $[0, 2]$. To see this, note that $Y \setminus [0, 1) = [1, 2]$, and we need to check if this is open in $Y$. We have $[1, 2] = [1, 3) \cap [0, 2]$ where $[1, 3)$ is not open in $\mathbb{R}$. Let's try $[1, 2] = (1 - \epsilon, 3) \cap [0, 2]$ for small $\epsilon$... this gives $(1-\epsilon, 2]$, not $[1, 2]$.

Actually, $[1, 2]$ is closed in $Y$ because $[1, 2] = [1, 2] \cap [0, 2]$ and $[1, 2]$ is closed in $\mathbb{R}$. Therefore $Y \setminus [1, 2] = [0, 1)$ is open in $Y$, not closed.

**Example 7.7:** In $Y = (0, 1) \subseteq \mathbb{R}$:
- $Y$ itself is closed in $Y$ (always true)
- $[1/4, 1/2]$ is closed in $Y$ because $[1/4, 1/2] = [1/4, 1/2] \cap (0, 1)$ and $[1/4, 1/2]$ is closed in $\mathbb{R}$

## Closure, Interior, and Boundary in Subspaces

Let $Y$ be a subspace of $X$ and $A \subseteq Y$. We use subscripts to distinguish operations in different spaces.

**Theorem 7.2 (Closure in Subspaces):**
$$\overline{A}^Y = \overline{A}^X \cap Y$$

where $\overline{A}^Y$ denotes closure in $Y$ and $\overline{A}^X$ denotes closure in $X$.

**Proof:**

$\overline{A}^Y$ is the smallest closed set in $Y$ containing $A$. By Theorem 7.1, closed sets in $Y$ have the form $C \cap Y$ where $C$ is closed in $X$.

The closed sets in $Y$ containing $A$ are precisely $\{C \cap Y : C \text{ closed in } X, A \subseteq C \cap Y\}$. Since $A \subseteq Y$, the condition $A \subseteq C \cap Y$ is equivalent to $A \subseteq C$.

Therefore:
$$\overline{A}^Y = \bigcap\{C \cap Y : C \text{ closed in } X, A \subseteq C\} = \left(\bigcap\{C : C \text{ closed in } X, A \subseteq C\}\right) \cap Y = \overline{A}^X \cap Y$$

$\square$

**Example 7.8:** Let $Y = (0, 2)$ and $A = (0, 1) \subseteq Y \subseteq \mathbb{R}$.
- $\overline{A}^Y = \overline{(0,1)}^{\mathbb{R}} \cap (0, 2) = [0, 1] \cap (0, 2) = (0, 1]$
- Note that $\overline{A}^Y \neq \overline{A}^{\mathbb{R}}$ in general

**Theorem 7.3 (Interior in Subspaces):**
$$\text{int}_Y(A) = \text{int}_X(A) \cap Y \text{ (NOT always true)}$$

Actually, the correct relationship is:
$$\text{int}_Y(A) \supseteq \text{int}_X(A) \cap Y$$

with equality when $Y$ is open in $X$.

**Counterexample:** Let $Y = [0, 2]$ and $A = [0, 1] \subseteq Y \subseteq \mathbb{R}$.
- $\text{int}_Y([0, 1]) = (0, 1)$ (largest open set in $Y$ contained in $[0, 1]$ is $(0, 1) = (-1, 1) \cap [0, 2]$... wait, no)

Let me reconsider. Open sets in $Y = [0, 2]$ containing only points from $[0, 1]$ include sets like $[0, a)$ for $a \leq 1$. The union of all such sets gives $[0, 1)$. Actually, no - let's be more careful.

Open sets in $Y$ contained in $[0, 1]$ are sets of the form $U \cap [0, 2]$ where $U$ is open in $\mathbb{R}$ and $U \cap [0, 2] \subseteq [0, 1]$. This means $U \cap [0, 2] \subseteq [0, 1]$, so $U \cap (1, 2] = \emptyset$. Examples: $(0.5, 0.7)$, $[0, 0.5) = (-1, 0.5) \cap [0, 2]$. The union of all such sets is $[0, 1)$.

So $\text{int}_Y([0, 1]) = [0, 1)$, while $\text{int}_{\mathbb{R}}([0, 1]) = (0, 1)$. Thus:
$$[0, 1) \neq (0, 1) \cap [0, 2] = (0, 1)$$

**Proposition 7.1:** If $Y$ is open in $X$, then $\text{int}_Y(A) = \text{int}_X(A)$ for all $A \subseteq Y$.

**Proof:** Since $Y$ is open in $X$, every open set in $Y$ is also open in $X$. Therefore the largest open set in $Y$ contained in $A$ is the same as the largest open set in $X$ contained in $A$. $\square$

**Theorem 7.4 (Boundary in Subspaces):**
$$\partial_Y A = (\partial_X A) \cap Y \text{ (NOT always true)}$$

The relationship between boundaries is more complex and depends on the position of $A$ relative to $Y$.

## Basis for Subspace Topology

**Theorem 7.5 (Basis for Subspace):** If $\mathcal{B}$ is a basis for the topology on $X$, then:
$$\mathcal{B}_Y = \{B \cap Y : B \in \mathcal{B}\}$$
is a basis for the subspace topology on $Y$.

**Proof:** Let $V$ be open in $Y$. Then $V = U \cap Y$ for some open $U$ in $X$. Since $\mathcal{B}$ is a basis for $X$, we can write $U = \bigcup_{\alpha} B_\alpha$ where $B_\alpha \in \mathcal{B}$. Then:
$$V = U \cap Y = \left(\bigcup_\alpha B_\alpha\right) \cap Y = \bigcup_\alpha (B_\alpha \cap Y)$$

Each $B_\alpha \cap Y \in \mathcal{B}_Y$, so $V$ is a union of basis elements from $\mathcal{B}_Y$. $\square$

**Example 7.9:** For $\mathbb{R}^2$ with the standard topology, a basis is $\mathcal{B} = \{(a, b) \times (c, d)\}$ (open rectangles). For the circle $S^1 \subseteq \mathbb{R}^2$, a basis for the subspace topology is:
$$\mathcal{B}_{S^1} = \{((a,b) \times (c, d)) \cap S^1\}$$

These are "arcs" of the circle.

## Inheritance of Properties

Many topological properties are inherited by subspaces.

**Theorem 7.6:** If $X$ is Hausdorff, then every subspace $Y \subseteq X$ is Hausdorff.

We'll prove this when we study separation axioms.

**Non-Inheritance:** Not all properties are inherited. For example:
- If $X$ is connected, a subspace $Y$ need not be connected (e.g., $Y = \{0, 1\} \subseteq \mathbb{R}$)
- If $X$ is compact, a subspace $Y$ need not be compact (e.g., $Y = (0, 1) \subseteq [0, 1]$)

## Subspace of a Subspace

**Theorem 7.7:** Let $Z \subseteq Y \subseteq X$ where $Y$ has the subspace topology from $X$. Then the subspace topology on $Z$ inherited from $Y$ is the same as the subspace topology on $Z$ inherited from $X$.

**Proof:** A set is open in $Z$ as a subspace of $Y$ if it has the form $(V \cap Y) \cap Z$ where $V$ is open in $X$. But $(V \cap Y) \cap Z = V \cap (Y \cap Z) = V \cap Z$ (since $Z \subseteq Y$). This is precisely the form of open sets in $Z$ as a subspace of $X$. $\square$

**Example 7.10:** $\mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R}$. The subspace topology on $\mathbb{Z}$ from $\mathbb{Q}$ is the same as from $\mathbb{R}$ (both give the discrete topology).

## Product of Subspaces

**Theorem 7.8:** Let $Y_1 \subseteq X_1$ and $Y_2 \subseteq X_2$. The subspace topology on $Y_1 \times Y_2 \subseteq X_1 \times X_2$ is the same as the product topology on $Y_1 \times Y_2$.

**Proof:** A basis for the subspace topology on $Y_1 \times Y_2$ consists of sets of the form $(U_1 \times U_2) \cap (Y_1 \times Y_2) = (U_1 \cap Y_1) \times (U_2 \cap Y_2)$ where $U_i$ is open in $X_i$.

But $U_i \cap Y_i$ is open in $Y_i$ (subspace topology), so $(U_1 \cap Y_1) \times (U_2 \cap Y_2)$ is a basis element for the product topology on $Y_1 \times Y_2$. The bases coincide, so the topologies are the same. $\square$

## Applications

**Example 7.11 (Embedded Manifolds):** Many important spaces are defined as subspaces of Euclidean space:
- The sphere $S^2 = \{(x, y, z) \in \mathbb{R}^3 : x^2 + y^2 + z^2 = 1\}$
- The torus embedded in $\mathbb{R}^3$
- Algebraic varieties

**Example 7.12 (Metric Subspaces):** If $(X, d)$ is a metric space and $Y \subseteq X$, the restriction $d|_{Y \times Y}$ is a metric on $Y$. The metric topology on $(Y, d|_{Y \times Y})$ is precisely the subspace topology inherited from $X$.

## Relative Notions

When working with subspaces, it's crucial to specify the ambient space:

- "$A$ is open" is ambiguous - open in what space?
- Always say "open in $Y$" or "open in $X$" to be clear
- Closure, interior, boundary all depend on the ambient space

**Example 7.13:** For $A = [0, 1) \subseteq Y = [0, 2] \subseteq \mathbb{R}$:
- $A$ is open in $Y$ but not open in $\mathbb{R}$
- $A$ is not closed in $Y$ and not closed in $\mathbb{R}$
- $\overline{A}^Y = [0, 1]$ while $\overline{A}^{\mathbb{R}} = [0, 1]$ (same in this case)

## Summary

Key points about subspace topology:

1. **Definition:** $\mathcal{T}_Y = \{U \cap Y : U \in \mathcal{T}_X\}$
2. **Closed sets:** $F$ is closed in $Y \iff F = C \cap Y$ for some closed $C$ in $X$
3. **Closure:** $\overline{A}^Y = \overline{A}^X \cap Y$
4. **Interior:** Generally $\text{int}_Y(A) \neq \text{int}_X(A) \cap Y$, but equal when $Y$ is open
5. **Basis:** If $\mathcal{B}$ is a basis for $X$, then $\{B \cap Y : B \in \mathcal{B}\}$ is a basis for $Y$
6. **Transitivity:** Subspace of subspace equals subspace of original space
7. **Context matters:** Always specify the ambient space when discussing openness/closedness

The subspace topology is the most natural way to topologize a subset, ensuring compatibility with the ambient space and preservation of key properties. It's fundamental for studying embeddings, manifolds, and relative topological notions.
