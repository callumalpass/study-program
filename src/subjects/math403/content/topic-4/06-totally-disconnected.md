---
title: "Totally Disconnected Spaces"
slug: "totally-disconnected"
description: "Study of totally disconnected spaces and zero-dimensional spaces"
order: 6
---

# Totally Disconnected Spaces

## Introduction

At the opposite extreme from connected spaces are totally disconnected spaces, where the only connected subsets are singletons. These spaces have a very "fragmented" structure and arise naturally in many contexts, particularly in number theory and logic.

## Definition

**Definition 6.1 (Totally Disconnected):** A space $X$ is **totally disconnected** if for every $x \in X$, the connected component containing $x$ is the singleton $\{x\}$.

Equivalently, the only non-empty connected subsets of $X$ are singletons.

**Definition 6.2 (Zero-Dimensional):** A space is **zero-dimensional** if it has a basis consisting of clopen (both open and closed) sets.

**Theorem 6.1:** Zero-dimensional implies totally disconnected.

**Proof:** Let $X$ be zero-dimensional and $C$ be a connected subset with $|C| \geq 2$. Choose distinct $x, y \in C$.

Since $X$ is zero-dimensional, there exists a clopen set $U$ with $x \in U$ and $y \notin U$ (take a basic clopen set containing $x$; if it contains $y$, we'd need to separate them differently, but we can find such a set).

Then $U \cap C$ and $(X \setminus U) \cap C$ give a separation of $C$, contradicting connectedness. Therefore no such $C$ exists, so $X$ is totally disconnected. $\square$

**The converse is false:** There exist totally disconnected spaces that are not zero-dimensional (though the distinction is subtle).

## Examples

**Example 6.1 (Rationals):** $\mathbb{Q}$ with the subspace topology from $\mathbb{R}$ is totally disconnected.

**Proof:** For any $x \neq y$ in $\mathbb{Q}$, choose an irrational $\alpha$ with $x < \alpha < y$ (or $y < \alpha < x$). Then:
$$U = \mathbb{Q} \cap (-\infty, \alpha), \quad V = \mathbb{Q} \cap (\alpha, \infty)$$
separate $x$ and $y$ in any connected set containing them. Therefore components are singletons. $\square$

**Example 6.2 (Cantor Set):** The Cantor set $C \subseteq [0, 1]$ is totally disconnected, compact, and perfect.

**Proof:** The Cantor set is constructed by removing middle thirds. At each stage, we remove open intervals, creating a "gap." Any two distinct points in $C$ eventually lie in different thirds at some stage, so they can be separated by the gap. $\square$

**Example 6.3 (Discrete Spaces):** Any discrete space is zero-dimensional (singletons are clopen and form a basis).

**Example 6.4 ($p$-adic Numbers):** The $p$-adic integers $\mathbb{Z}_p$ and $p$-adic numbers $\mathbb{Q}_p$ are totally disconnected topological rings arising in number theory.

**Example 6.5 (Stone Spaces):** For any Boolean algebra $B$, the Stone space $S(B)$ (space of ultrafilters with the Stone topology) is compact, Hausdorff, and zero-dimensional.

## Properties

**Theorem 6.2:** Subspaces of totally disconnected spaces are totally disconnected.

**Proof:** If $X$ is totally disconnected and $Y \subseteq X$, then any connected subset of $Y$ is also connected in $X$, hence a singleton. $\square$

**Theorem 6.3:** Products of totally disconnected spaces are totally disconnected.

**Proof:** Let $\{X_\alpha\}$ be totally disconnected spaces. Suppose $C \subseteq \prod X_\alpha$ is connected with $|C| \geq 2$. Choose distinct $\mathbf{x}, \mathbf{y} \in C$ differing in coordinate $\alpha_0$.

The projection $\pi_{\alpha_0}(C)$ is connected (continuous image of connected set), contains the distinct points $x_{\alpha_0}$ and $y_{\alpha_0}$, contradicting total disconnectedness of $X_{\alpha_0}$. $\square$

**Theorem 6.4:** Totally disconnected does NOT imply discrete.

**Proof:** The Cantor set is totally disconnected but not discrete (it's not even first-countable at most points in terms of isolated points - actually, it has no isolated points, being perfect). $\square$

**Theorem 6.5:** A locally connected, totally disconnected space is discrete.

**Proof:** If $X$ is locally connected, connected components are open. If $X$ is totally disconnected, components are singletons. Therefore singletons are open, making $X$ discrete. $\square$

## Zero-Dimensional Spaces

**Proposition 6.1:** A space is zero-dimensional if and only if for any point $x$ and any neighborhood $U$ of $x$, there exists a clopen set $V$ with $x \in V \subseteq U$.

**Example 6.6:** The Cantor set is zero-dimensional.

**Proof:** The Cantor set can be represented as $\{0, 2\}^\mathbb{N}$ (infinite sequences of 0s and 2s) with the product topology. Cylinder sets (fixing finitely many coordinates) are clopen and form a basis. $\square$

**Theorem 6.6 (Characterization):** For compact Hausdorff spaces, totally disconnected and zero-dimensional are equivalent.

**Proof Sketch:** We've shown zero-dimensional implies totally disconnected. For the converse in compact Hausdorff spaces, use the fact that components and quasi-components coincide, and quasi-components are defined using clopen sets. $\square$

## Applications to Logic and Algebra

**Application 6.1 (Stone Duality):** There's a duality between Boolean algebras and compact Hausdorff zero-dimensional spaces (Stone spaces).

**Application 6.2 (Profinite Groups):** Inverse limits of finite groups with discrete topology are compact Hausdorff and totally disconnected.

**Application 6.3 ($p$-adic Analysis):** The $p$-adic numbers provide a totally disconnected field where analysis can be developed (important in number theory).

## Dimension Theory

**Remark:** Zero-dimensionality is the beginning of dimension theory. We can define:
- 0-dimensional: basis of clopen sets
- $n$-dimensional: inductively defined using boundaries
- Infinite-dimensional: not $n$-dimensional for any $n$

The Cantor set is 0-dimensional despite being a subset of the 1-dimensional interval $[0, 1]$.

## Summary

Key points:

1. **Totally disconnected:** Only connected sets are singletons
2. **Zero-dimensional:** Has basis of clopen sets
3. **Relation:** Zero-dimensional $\implies$ totally disconnected (not conversely in general)
4. **Examples:** $\mathbb{Q}$, Cantor set, discrete spaces, $p$-adics
5. **Properties:** Preserved by subspaces and products
6. **Not discrete:** Totally disconnected $\neq$ discrete (Cantor set example)
7. **Applications:** Stone duality, $p$-adic analysis, profinite groups

Totally disconnected spaces represent the most fragmented topological structure, important in algebra, logic, and number theory.
