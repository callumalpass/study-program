---
title: "Embeddings"
slug: "embedding"
description: "Study of topological embeddings as injective homeomorphisms onto their image"
order: 4
---

# Embeddings

## Introduction

An **embedding** is a way to place one topological space inside another while preserving the topological structure. Embeddings are injective continuous maps that are homeomorphisms onto their image (with the subspace topology). They formalize the idea of viewing one space as a subspace of another.

## Definition

**Definition 4.1 (Embedding):** A continuous function $f: X \to Y$ is an **embedding** (or **topological embedding**) if:
1. $f$ is injective (one-to-one)
2. $f: X \to f(X)$ is a homeomorphism, where $f(X)$ has the subspace topology from $Y$

Equivalently, $f$ is an embedding if it's injective and $f^{-1}: f(X) \to X$ is continuous.

**Alternative Characterization:** $f: X \to Y$ is an embedding iff $f$ is injective and for every open set $U \subseteq X$, the set $f(U)$ is relatively open in $f(X)$ (i.e., $f(U) = V \cap f(X)$ for some open $V \subseteq Y$).

## Examples

**Example 4.1:** The inclusion map $i: A \to X$ for $A \subseteq X$ is an embedding.

**Proof:** $i$ is clearly injective. For any open set $U \subseteq A$ (subspace topology), $U = V \cap A$ for some open $V \subseteq X$. Then $i(U) = U = V \cap i(A)$, which is relatively open in $i(A) = A$. $\square$

**Example 4.2:** The map $f: \mathbb{R} \to \mathbb{R}^2$ given by $f(t) = (t, 0)$ is an embedding.

**Proof:** $f$ is injective. For any open interval $(a, b) \subseteq \mathbb{R}$, we have:
$$f((a, b)) = \{(t, 0) : a < t < b\} = ((a, b) \times (-1, 1)) \cap f(\mathbb{R})$$

This is relatively open in the line $f(\mathbb{R}) = \mathbb{R} \times \{0\}$. $\square$

**Example 4.3:** The map $f: [0, 2\pi) \to \mathbb{R}^2$ given by $f(t) = (\cos t, \sin t)$ is NOT an embedding.

**Proof:** $f$ is injective and continuous, but not an embedding. The set $[0, \pi)$ is open in $[0, 2\pi)$ (it equals $(-1, \pi) \cap [0, 2\pi)$), but:
$$f([0, \pi)) = \{(\cos t, \sin t) : 0 \leq t < \pi\}$$

is not relatively open in $f([0, 2\pi)) = S^1 \setminus \{(1, 0)\}$... Actually, let me reconsider.

Actually, $[0, 2\pi) \to S^1 \setminus \{(1, 0)\}$ might be an embedding. Let me use a better example:

**Example 4.3 (Corrected):** The map $f: [0, 1) \to S^1$ given by $f(t) = e^{2\pi i t}$ is NOT an embedding (it's not even surjective, so let me reconsider the definition).

Actually, for embeddings we need $f: X \to f(X)$ to be a homeomorphism. Let's use:

**Example 4.3 (Final):** Consider $f: (0, 1) \to \mathbb{R}$ given by $f(x) = x$ (inclusion). This IS an embedding. But $f: [0, 1) \to \mathbb{R}$ given by $f(x) = x$ is also an embedding (as long as we consider the image with subspace topology).

Let me give a proper non-example:

**Example 4.4:** Let $X = [0, 1)$ with the subspace topology from $\mathbb{R}$, and define $f: X \to S^1$ by wrapping the interval around the circle: $f(t) = (\cos(2\pi t), \sin(2\pi t))$.

This map is continuous and injective, but it's not an embedding because $f$ is not an open map onto its image (any neighborhood of $f(0) = (1, 0)$ in the image must wrap around near the endpoints).

## Embeddings vs Homeomorphisms onto Image

**Theorem 4.1:** A continuous map $f: X \to Y$ is an embedding if and only if it's injective and a homeomorphism onto $f(X)$ with the subspace topology.

This is essentially the definition, but worth emphasizing.

## Characterization via Inverse

**Theorem 4.2:** An injective continuous map $f: X \to Y$ is an embedding if and only if $f^{-1}: f(X) \to X$ is continuous (where $f^{-1}$ is defined on the image).

**Proof:**

($\Rightarrow$) If $f$ is an embedding, then by definition $f^{-1}: f(X) \to X$ is continuous.

($\Leftarrow$) If $f$ is injective and $f^{-1}$ is continuous, then $f: X \to f(X)$ is a continuous bijection with continuous inverse, hence a homeomorphism. Thus $f$ is an embedding. $\square$

## Embeddings and Subspaces

**Proposition 4.1:** If $f: X \to Y$ is an embedding, then $X$ is homeomorphic to the subspace $f(X) \subseteq Y$.

**Proof:** The function $f: X \to f(X)$ is a homeomorphism by definition of embedding. $\square$

This means embeddings allow us to view $X$ as a subspace of $Y$ up to homeomorphism.

**Example 4.5:** The embedding $f: S^1 \to \mathbb{R}^3$ given by $f(\cos\theta, \sin\theta) = (\cos\theta, \sin\theta, 0)$ shows that $S^1$ can be viewed as a subspace of $\mathbb{R}^3$.

## Closed Embeddings and Open Embeddings

**Definition 4.2 (Closed Embedding):** An embedding $f: X \to Y$ is a **closed embedding** if $f(X)$ is closed in $Y$.

**Definition 4.3 (Open Embedding):** An embedding $f: X \to Y$ is an **open embedding** if $f(X)$ is open in $Y$.

**Example 4.6:** The inclusion $[0, 1] \to \mathbb{R}$ is a closed embedding.

**Example 4.7:** The inclusion $(0, 1) \to \mathbb{R}$ is neither a closed nor open embedding: $(0, 1)$ is not closed and not open in $\mathbb{R}$.

Actually, wait - $(0, 1)$ IS open in $\mathbb{R}$, so this is an open embedding.

**Example 4.7 (Corrected):** The inclusion $(0, 1) \to \mathbb{R}$ is an open embedding (since $(0, 1)$ is open in $\mathbb{R}$).

**Example 4.8:** The inclusion $[0, 1) \to \mathbb{R}$ is neither closed nor open (since $[0, 1)$ is neither closed nor open in $\mathbb{R}$).

## Embedding Theorem for Metric Spaces

**Theorem 4.3:** Let $f: X \to Y$ be an injective continuous map between metric spaces. Then $f$ is an embedding if and only if $f$ preserves convergence: whenever $x_n \to x$ in $X$, we have $f(x_n) \to f(x)$ in $Y$, AND whenever $f(x_n) \to f(x)$ in $Y$, we have $x_n \to x$ in $X$.

**Proof Sketch:** The forward direction uses continuity of $f$ and $f^{-1}$. The reverse direction builds continuity from sequential convergence. $\square$

## Universal Property

Embeddings satisfy a universal property related to subspaces.

**Theorem 4.4:** If $f: X \to Y$ is an embedding and $i: f(X) \to Y$ is the inclusion, then for any space $Z$ and continuous map $g: Z \to Y$ with $g(Z) \subseteq f(X)$, there exists a unique continuous map $h: Z \to X$ such that $f \circ h = g$.

Specifically, $h = f^{-1} \circ g$.

**Proof:** Define $h(z) = f^{-1}(g(z))$. Since $g(Z) \subseteq f(X)$ and $f^{-1}$ is continuous on $f(X)$, the composition $h = f^{-1} \circ g$ is continuous. Clearly $f(h(z)) = f(f^{-1}(g(z))) = g(z)$. Uniqueness follows from $f$ being injective. $\square$

## Examples of Classical Embeddings

**Example 4.9 (Stereographic Projection):** The map $f: \mathbb{R}^n \to S^n \setminus \{N\}$ (where $N$ is the north pole) given by stereographic projection is a homeomorphism, hence an embedding of $\mathbb{R}^n$ into $S^n$.

**Example 4.10 (Graph Embedding):** For any continuous function $g: X \to \mathbb{R}$, the graph map $\Gamma: X \to X \times \mathbb{R}$ given by $\Gamma(x) = (x, g(x))$ is an embedding.

**Proof:** $\Gamma$ is injective (if $(x_1, g(x_1)) = (x_2, g(x_2))$, then $x_1 = x_2$). $\Gamma$ is continuous (both coordinates are continuous). The inverse $\Gamma^{-1}: \Gamma(X) \to X$ is just projection onto the first coordinate, which is continuous. $\square$

**Example 4.11 (Diagonal Embedding):** The diagonal map $\Delta: X \to X \times X$ given by $\Delta(x) = (x, x)$ is an embedding.

**Proof:** $\Delta$ is injective. For any open set $U \subseteq X$, we have:
$$\Delta(U) = \{(x, x) : x \in U\} = (U \times U) \cap \Delta(X)$$

Since $U \times U$ is open in $X \times X$, the set $\Delta(U)$ is relatively open in $\Delta(X)$. Thus $\Delta$ is an embedding. $\square$

## Embeddings and Compactness

**Theorem 4.5:** If $f: X \to Y$ is an embedding with $X$ compact and $Y$ Hausdorff, then $f$ is a closed embedding (i.e., $f(X)$ is closed in $Y$).

**Proof:** We'll prove this when we study compactness. The key idea: continuous images of compact sets are compact, and compact subsets of Hausdorff spaces are closed. $\square$

## Dense Embeddings

**Definition 4.4 (Dense Embedding):** An embedding $f: X \to Y$ is **dense** if $\overline{f(X)} = Y$.

**Example 4.12:** The inclusion $\mathbb{Q} \to \mathbb{R}$ is a dense embedding.

**Example 4.13:** The embedding $\mathbb{R}^n \to S^n$ via stereographic projection is dense (the image is $S^n$ minus one point, whose closure is all of $S^n$).

## Summary

Key points about embeddings:

1. **Definition:** Injective continuous map that's a homeomorphism onto its image
2. **Characterization:** Injective with continuous inverse on image
3. **Subspaces:** Embeddings realize spaces as subspaces
4. **Types:** Open embeddings, closed embeddings, dense embeddings
5. **Examples:** Inclusions, graphs, diagonal maps
6. **Universal property:** Factor maps through embeddings uniquely

Embeddings are fundamental for understanding how spaces sit inside larger spaces and for constructing spaces as subspaces of familiar spaces like $\mathbb{R}^n$.
