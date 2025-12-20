---
title: "Continuous Maps"
slug: "continuous-maps"
description: "Definition and characterizations of continuous functions between topological spaces, with examples and properties"
order: 1
---

# Continuous Maps

## Introduction

Continuity is the fundamental notion that connects topological spaces. While in metric spaces continuity is defined using $\epsilon$-$\delta$ arguments, in general topological spaces we use open sets. This abstraction reveals the essence of continuity and applies to spaces where distance makes no sense.

## Definition of Continuity

**Definition 1.1 (Continuous Function):** Let $(X, \mathcal{T}_X)$ and $(Y, \mathcal{T}_Y)$ be topological spaces. A function $f: X \to Y$ is **continuous** if for every open set $V \in \mathcal{T}_Y$, the preimage $f^{-1}(V)$ is open in $X$.

Formally: $f$ is continuous iff $f^{-1}(V) \in \mathcal{T}_X$ for all $V \in \mathcal{T}_Y$.

**Intuition:** A function is continuous if it "preserves the topological structure" - pulling back open sets gives open sets.

### Basic Examples

**Example 1.1:** The identity function $\text{id}_X: X \to X$ given by $\text{id}_X(x) = x$ is continuous for any topological space $X$.

**Proof:** For any open set $U \in \mathcal{T}_X$, we have $\text{id}_X^{-1}(U) = U \in \mathcal{T}_X$. $\square$

**Example 1.2:** Any constant function $f: X \to Y$ where $f(x) = y_0$ for all $x \in X$ is continuous.

**Proof:** For any open set $V \subseteq Y$:
$$f^{-1}(V) = \begin{cases} X & \text{if } y_0 \in V \\ \emptyset & \text{if } y_0 \notin V \end{cases}$$

Both $X$ and $\emptyset$ are open in $X$, so $f$ is continuous. $\square$

**Example 1.3:** Let $X = \mathbb{R}$ with the discrete topology and $Y = \mathbb{R}$ with the standard topology. The identity function $f: X \to Y$ is continuous.

**Proof:** For any open set $V \subseteq Y$ (standard topology), $f^{-1}(V) = V$ is open in $X$ (discrete topology, where all sets are open). $\square$

**Example 1.4:** Let $X = \mathbb{R}$ with the standard topology and $Y = \mathbb{R}$ with the discrete topology. The identity function $f: X \to Y$ is NOT continuous.

**Proof:** The set $\{0\} \subseteq Y$ is open (discrete topology), but $f^{-1}(\{0\}) = \{0\}$ is not open in $X$ (standard topology). $\square$

**Observation:** Continuity depends on both topologies, not just the function itself.

## Continuity in Terms of Closed Sets

**Theorem 1.1 (Closed Set Characterization):** A function $f: X \to Y$ is continuous if and only if $f^{-1}(C)$ is closed in $X$ for every closed set $C$ in $Y$.

**Proof:**

($\Rightarrow$) Suppose $f$ is continuous and $C \subseteq Y$ is closed. Then $Y \setminus C$ is open in $Y$. By continuity, $f^{-1}(Y \setminus C)$ is open in $X$. But:
$$f^{-1}(Y \setminus C) = \{x : f(x) \in Y \setminus C\} = \{x : f(x) \notin C\} = X \setminus f^{-1}(C)$$

Since $X \setminus f^{-1}(C)$ is open, $f^{-1}(C)$ is closed.

($\Leftarrow$) Suppose $f^{-1}(C)$ is closed for every closed $C \subseteq Y$. Let $V \subseteq Y$ be open. Then $Y \setminus V$ is closed, so $f^{-1}(Y \setminus V) = X \setminus f^{-1}(V)$ is closed. Therefore $f^{-1}(V)$ is open, showing $f$ is continuous. $\square$

**Example 1.5:** The function $f: \mathbb{R} \to \mathbb{R}$ given by $f(x) = x^2$ is continuous (standard topology).

**Proof:** We can verify using closed sets. For any closed set $C \subseteq \mathbb{R}$, we need $f^{-1}(C)$ closed.

Alternatively, use the $\epsilon$-$\delta$ definition from calculus: for any $x_0$ and $\epsilon > 0$, there exists $\delta > 0$ such that $|x - x_0| < \delta$ implies $|x^2 - x_0^2| < \epsilon$. This ensures preimages of open intervals are open. $\square$

## Continuity in Terms of Basis

Working with arbitrary open sets can be cumbersome. Bases provide a more efficient approach.

**Theorem 1.2 (Basis Criterion for Continuity):** Let $\mathcal{B}$ be a basis for the topology on $Y$. Then $f: X \to Y$ is continuous if and only if $f^{-1}(B)$ is open in $X$ for every $B \in \mathcal{B}$.

**Proof:**

($\Rightarrow$) If $f$ is continuous, then $f^{-1}(B)$ is open for every open set $B$, including basis elements.

($\Leftarrow$) Suppose $f^{-1}(B)$ is open for every $B \in \mathcal{B}$. Let $V \subseteq Y$ be open. Since $\mathcal{B}$ is a basis, we can write $V = \bigcup_{\alpha} B_\alpha$ where $B_\alpha \in \mathcal{B}$. Then:
$$f^{-1}(V) = f^{-1}\left(\bigcup_\alpha B_\alpha\right) = \bigcup_\alpha f^{-1}(B_\alpha)$$

Each $f^{-1}(B_\alpha)$ is open by hypothesis, so their union is open. Therefore $f^{-1}(V)$ is open. $\square$

**Example 1.6:** To show $f: \mathbb{R} \to \mathbb{R}$ with $f(x) = 2x + 1$ is continuous, it suffices to verify that $f^{-1}((a, b))$ is open for all open intervals $(a, b)$.

We have:
$$f^{-1}((a, b)) = \{x : a < 2x + 1 < b\} = \{x : (a-1)/2 < x < (b-1)/2\} = ((a-1)/2, (b-1)/2)$$

This is an open interval, hence open. By the basis criterion, $f$ is continuous. $\square$

## Continuity in Terms of Subbasis

**Theorem 1.3 (Subbasis Criterion):** Let $\mathcal{S}$ be a subbasis for the topology on $Y$. Then $f: X \to Y$ is continuous if and only if $f^{-1}(S)$ is open in $X$ for every $S \in \mathcal{S}$.

**Proof:** The collection of finite intersections of subbasis elements forms a basis. If $f^{-1}(S)$ is open for all $S \in \mathcal{S}$, then:
$$f^{-1}\left(\bigcap_{i=1}^n S_i\right) = \bigcap_{i=1}^n f^{-1}(S_i)$$

is a finite intersection of open sets, hence open. By the basis criterion (Theorem 1.2), $f$ is continuous. $\square$

**Example 1.7:** For the projection $\pi_1: \mathbb{R} \times \mathbb{R} \to \mathbb{R}$, we can use the subbasis $\{(a, \infty), (-\infty, b) : a, b \in \mathbb{R}\}$ for $\mathbb{R}$.

We have:
$$\pi_1^{-1}((a, \infty)) = (a, \infty) \times \mathbb{R}$$
$$\pi_1^{-1}((-\infty, b)) = (-\infty, b) \times \mathbb{R}$$

Both are open in $\mathbb{R}^2$ (product topology). By the subbasis criterion, $\pi_1$ is continuous. $\square$

## Continuity at a Point

**Definition 1.2 (Continuity at a Point):** A function $f: X \to Y$ is **continuous at a point** $x_0 \in X$ if for every open set $V \subseteq Y$ containing $f(x_0)$, there exists an open set $U \subseteq X$ containing $x_0$ such that $f(U) \subseteq V$.

Equivalently: For every neighborhood $V$ of $f(x_0)$, there exists a neighborhood $U$ of $x_0$ with $f(U) \subseteq V$.

**Theorem 1.4:** A function $f: X \to Y$ is continuous if and only if it is continuous at every point $x \in X$.

**Proof:**

($\Rightarrow$) Suppose $f$ is continuous. Let $x_0 \in X$ and let $V$ be an open set containing $f(x_0)$. Since $f$ is continuous, $U = f^{-1}(V)$ is open in $X$. We have $x_0 \in U$ (since $f(x_0) \in V$) and $f(U) \subseteq V$ (by definition of preimage). Thus $f$ is continuous at $x_0$.

($\Leftarrow$) Suppose $f$ is continuous at every point. Let $V \subseteq Y$ be open. We show $f^{-1}(V)$ is open.

For each $x \in f^{-1}(V)$, we have $f(x) \in V$. By continuity at $x$, there exists an open set $U_x \subseteq X$ containing $x$ with $f(U_x) \subseteq V$. This means $U_x \subseteq f^{-1}(V)$.

Therefore:
$$f^{-1}(V) = \bigcup_{x \in f^{-1}(V)} U_x$$

is a union of open sets, hence open. $\square$

## Continuity in Metric Spaces

**Theorem 1.5 (Sequential Criterion in Metric Spaces):** Let $(X, d_X)$ and $(Y, d_Y)$ be metric spaces with their metric topologies. A function $f: X \to Y$ is continuous at $x_0$ if and only if for every sequence $(x_n)$ in $X$ converging to $x_0$, the sequence $(f(x_n))$ converges to $f(x_0)$ in $Y$.

**Proof:**

($\Rightarrow$) Suppose $f$ is continuous at $x_0$ and $x_n \to x_0$. Let $\epsilon > 0$. The open ball $B(f(x_0), \epsilon)$ is an open set containing $f(x_0)$. By continuity, there exists an open set $U$ containing $x_0$ with $f(U) \subseteq B(f(x_0), \epsilon)$.

Since $U$ is open, there exists $\delta > 0$ with $B(x_0, \delta) \subseteq U$. Since $x_n \to x_0$, there exists $N$ such that $d_X(x_n, x_0) < \delta$ for all $n > N$. Thus $x_n \in B(x_0, \delta) \subseteq U$ for $n > N$.

Therefore $f(x_n) \in f(U) \subseteq B(f(x_0), \epsilon)$, meaning $d_Y(f(x_n), f(x_0)) < \epsilon$ for $n > N$. Thus $f(x_n) \to f(x_0)$.

($\Leftarrow$) Suppose the sequential condition holds. Assume for contradiction that $f$ is not continuous at $x_0$. Then there exists an open set $V$ containing $f(x_0)$ such that for every open set $U$ containing $x_0$, we have $f(U) \not\subseteq V$.

In particular, for each $n \in \mathbb{N}$, the ball $B(x_0, 1/n)$ satisfies $f(B(x_0, 1/n)) \not\subseteq V$. Choose $x_n \in B(x_0, 1/n)$ with $f(x_n) \notin V$.

Then $d_X(x_n, x_0) < 1/n \to 0$, so $x_n \to x_0$. By hypothesis, $f(x_n) \to f(x_0)$. Since $V$ is an open set containing $f(x_0)$, we must have $f(x_n) \in V$ for all sufficiently large $n$, contradicting our construction. $\square$

**Example 1.8:** The function $f: \mathbb{R} \to \mathbb{R}$ given by:
$$f(x) = \begin{cases} x & \text{if } x \in \mathbb{Q} \\ 0 & \text{if } x \notin \mathbb{Q} \end{cases}$$

is NOT continuous at any $x \neq 0$.

**Proof:** Consider $x_0 = 1$. Take the sequence $x_n = 1 + \sqrt{2}/n \to 1$ (irrationals converging to a rational). Then $f(x_n) = 0$ for all $n$ (since $x_n$ is irrational), so $f(x_n) \to 0 \neq 1 = f(1)$. By the sequential criterion, $f$ is not continuous at $1$. $\square$

## Composition of Continuous Functions

**Theorem 1.6 (Composition):** If $f: X \to Y$ and $g: Y \to Z$ are continuous, then $g \circ f: X \to Z$ is continuous.

**Proof:** Let $W \subseteq Z$ be open. Since $g$ is continuous, $g^{-1}(W)$ is open in $Y$. Since $f$ is continuous, $f^{-1}(g^{-1}(W))$ is open in $X$. But:
$$(g \circ f)^{-1}(W) = \{x : g(f(x)) \in W\} = \{x : f(x) \in g^{-1}(W)\} = f^{-1}(g^{-1}(W))$$

Therefore $(g \circ f)^{-1}(W)$ is open, showing $g \circ f$ is continuous. $\square$

**Corollary 1.1:** Continuous functions form a category: composition is associative, and identity functions are continuous.

## Restriction and Extension

**Theorem 1.7 (Restriction to Subspace):** If $f: X \to Y$ is continuous and $A \subseteq X$, then the restriction $f|_A: A \to Y$ is continuous (where $A$ has the subspace topology).

**Proof:** Let $V \subseteq Y$ be open. Then:
$$(f|_A)^{-1}(V) = \{a \in A : f(a) \in V\} = A \cap f^{-1}(V)$$

Since $f$ is continuous, $f^{-1}(V)$ is open in $X$. Therefore $(f|_A)^{-1}(V) = f^{-1}(V) \cap A$ is open in the subspace topology on $A$. $\square$

## Summary

Key concepts about continuous functions:

1. **Definition:** $f^{-1}(V)$ open for all open $V$
2. **Closed sets:** $f^{-1}(C)$ closed for all closed $C$
3. **Basis criterion:** Only check basis elements
4. **Subbasis criterion:** Only check subbasis elements
5. **Point-wise:** Continuous everywhere iff continuous at every point
6. **Sequences:** In metric spaces, preserves convergent sequences
7. **Composition:** Composition of continuous functions is continuous

Continuity in topological spaces generalizes the calculus notion and provides the morphisms in the category of topological spaces.
