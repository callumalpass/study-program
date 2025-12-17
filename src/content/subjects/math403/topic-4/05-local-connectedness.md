---
title: "Local Connectedness"
slug: "local-connectedness"
description: "Study of locally connected spaces and their properties"
order: 5
---

# Local Connectedness

## Introduction

While connectedness is a global property, local connectedness describes behavior near each point. A space is locally connected if every point has arbitrarily small connected neighborhoods. This property has important implications for the structure of components.

## Definition

**Definition 5.1 (Locally Connected):** A space $X$ is **locally connected** if for every point $x \in X$ and every neighborhood $U$ of $x$, there exists a connected neighborhood $V$ of $x$ with $V \subseteq U$.

Equivalently: $X$ is locally connected if it has a basis of connected open sets.

**Proposition 5.1:** $X$ is locally connected if and only if for every open set $U \subseteq X$, the connected components of $U$ are open in $X$.

**Proof:**

($\Rightarrow$) Suppose $X$ is locally connected. Let $U$ be open and $C$ be a connected component of $U$. For any $x \in C$, since $U$ is a neighborhood of $x$ and $X$ is locally connected, there exists a connected neighborhood $V$ of $x$ with $V \subseteq U$.

Since $V$ is connected, contains $x \in C$, and is contained in $U$, by maximality of the component $C$ within $U$, we have $V \subseteq C$. Thus $C$ is a neighborhood of each of its points, so $C$ is open.

($\Leftarrow$) Suppose components of open sets are open. Let $x \in X$ and $U$ be a neighborhood of $x$. The component of $x$ in $U$ is open (by hypothesis) and connected, and contains $x$. This is the required connected neighborhood. $\square$

## Examples

**Example 5.1:** $\mathbb{R}^n$ is locally connected.

**Proof:** The collection of open balls forms a basis, and each open ball is convex, hence path-connected, hence connected. $\square$

**Example 5.2:** Any discrete space is locally connected (singletons are connected and form a basis).

**Example 5.3:** $(0, 1) \cup (2, 3)$ is locally connected but not connected.

**Example 5.4 (Topologist's Sine Curve):** The topologist's sine curve is connected but NOT locally connected.

**Proof:** Near points on the vertical segment $\{0\} \times [-1, 1]$, there are no connected neighborhoods contained in small open sets (the oscillation prevents this). $\square$

**Example 5.5 (Comb Space):** Define:
$$C = \left(\{0\} \times [0, 1]\right) \cup \left(\bigcup_{n=1}^\infty \{1/n\} \times [0, 1]\right) \cup ([0, 1] \times \{0\})$$

This is path-connected but not locally path-connected at points $(0, y)$ for $y > 0$.

## Components in Locally Connected Spaces

**Theorem 5.1:** If $X$ is locally connected, then every connected component is open (and closed).

**Proof:** Each component $C$ is a connected component of the open set $X$. By Proposition 5.1, $C$ is open. We already know components are closed. $\square$

**Corollary 5.1:** In a locally connected space, components are clopen.

**Corollary 5.2:** A locally connected space is a topological disjoint union of its connected components (each component is both open and closed).

## Local Path-Connectedness

**Definition 5.2 (Locally Path-Connected):** A space $X$ is **locally path-connected** if for every point $x \in X$ and every neighborhood $U$ of $x$, there exists a path-connected neighborhood $V$ of $x$ with $V \subseteq U$.

**Theorem 5.2:** Locally path-connected implies locally connected.

**Proof:** Path-connected spaces are connected, so path-connected neighborhoods are connected neighborhoods. $\square$

**The converse is false:** There exist locally connected spaces that are not locally path-connected (though examples are pathological).

**Theorem 5.3:** For locally path-connected spaces, connected components equal path components.

**Proof:** In a locally path-connected space, path components are open (similar argument to components in locally connected spaces). Since path components are always closed (they're unions of paths, which are connected, and unions with common point...), actually this needs more care.

The standard proof: A path component in a locally path-connected space is open (can show directly), and being a component, it's also closed. Since the space is connected iff it has one component, and path components partition the space, they must coincide with connected components. $\square$

## Totally Disconnected

**Definition 5.3 (Totally Disconnected):** A space is **totally disconnected** if every connected component is a singleton.

**Example 5.6:** $\mathbb{Q}$ with the subspace topology from $\mathbb{R}$ is totally disconnected.

**Example 5.7:** Any discrete space is totally disconnected.

**Example 5.8 (Cantor Set):** The Cantor set is totally disconnected, compact, and perfect (has no isolated points). This is a remarkable combination of properties.

**Theorem 5.4:** A locally connected, totally disconnected space is discrete.

**Proof:** If $X$ is locally connected and totally disconnected, then components (which are singletons) are open by Theorem 5.1. Thus every singleton is open, making $X$ discrete. $\square$

## Applications

**Application 5.1:** Locally connected spaces are easier to work with because components have better behavior (they're open).

**Application 5.2:** Many spaces arising in analysis and geometry are locally connected (manifolds, CW complexes, etc.).

**Application 5.3:** Local connectedness is preserved by products (finite products; infinite products can fail).

**Theorem 5.5:** Finite products of locally connected spaces are locally connected.

**Proof:** If $X$ and $Y$ are locally connected, then $X \times Y$ has a basis of sets $U \times V$ where $U, V$ are connected open sets. Such products are connected, so $X \times Y$ has a basis of connected sets, hence is locally connected. $\square$

## Summary

Key points:

1. **Definition:** Every point has arbitrarily small connected neighborhoods
2. **Equivalent:** Has a basis of connected open sets
3. **Components:** In locally connected spaces, components are open
4. **Examples:** $\mathbb{R}^n$ (locally connected), topologist's sine curve (not)
5. **Path version:** Locally path-connected is stronger
6. **Total disconnection:** Locally connected + totally disconnected = discrete

Local connectedness is crucial for understanding the fine structure of topological spaces and appears frequently in applications.
