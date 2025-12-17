---
title: "Path-Connectedness"
slug: "path-connectedness"
description: "Definition and properties of path-connected spaces"
order: 3
---

# Path-Connectedness

## Introduction

Path-connectedness is a stronger notion than connectedness. A space is path-connected if any two points can be joined by a continuous path. This is often easier to verify than general connectedness and is the appropriate notion for many applications.

## Definition

**Definition 3.1 (Path):** A **path** in a topological space $X$ is a continuous function $\gamma: [0, 1] \to X$. The point $\gamma(0)$ is the **initial point** and $\gamma(1)$ is the **terminal point** or **endpoint**.

We say the path **joins** $\gamma(0)$ to $\gamma(1)$.

**Definition 3.2 (Path-Connected):** A space $X$ is **path-connected** if for any two points $x, y \in X$, there exists a path $\gamma: [0, 1] \to X$ with $\gamma(0) = x$ and $\gamma(1) = y$.

## Relationship to Connectedness

**Theorem 3.1:** Every path-connected space is connected.

**Proof:** Suppose $X$ is path-connected but disconnected. Then there exists a separation $(U, V)$ of $X$. Choose $u \in U$ and $v \in V$.

Since $X$ is path-connected, there exists a path $\gamma: [0, 1] \to X$ with $\gamma(0) = u$ and $\gamma(1) = v$.

Define:
$$A = \gamma^{-1}(U), \quad B = \gamma^{-1}(V)$$

Since $\gamma$ is continuous and $U, V$ are open, both $A$ and $B$ are open in $[0, 1]$. Moreover:
- $A, B$ are non-empty ($0 \in A$ since $\gamma(0) = u \in U$, and $1 \in B$ since $\gamma(1) = v \in V$)
- $A, B$ are disjoint (since $U, V$ are disjoint)
- $A \cup B = [0, 1]$ (since $U \cup V = X$)

This gives a separation of $[0, 1]$, contradicting its connectedness. $\square$

**The Converse is False:** Not every connected space is path-connected.

**Example 3.1 (Topologist's Sine Curve):** Define:
$$S = \left\{(x, \sin(1/x)) : 0 < x \leq 1\right\} \cup \{(0, y) : -1 \leq y \leq 1\}$$

This space is connected but not path-connected.

**Proof (Sketch):** The curve $\{(x, \sin(1/x)) : 0 < x \leq 1\}$ is connected (continuous image of $(0, 1]$), and its closure includes the segment $\{0\} \times [-1, 1]$. Since closure of connected is connected, $S$ is connected.

However, there's no path from $(1, \sin 1)$ to $(0, 0)$ because any path approaching the $y$-axis must oscillate infinitely. $\square$

## Examples

**Example 3.2:** $\mathbb{R}^n$ is path-connected.

**Proof:** For any $\mathbf{x}, \mathbf{y} \in \mathbb{R}^n$, the straight-line path:
$$\gamma(t) = (1-t)\mathbf{x} + t\mathbf{y}$$
is continuous and joins $\mathbf{x}$ to $\mathbf{y}$. $\square$

**Example 3.3:** Any convex subset of $\mathbb{R}^n$ is path-connected (using straight-line paths).

**Example 3.4:** The unit circle $S^1$ is path-connected.

**Proof:** For any two points on $S^1$, we can travel along the circle from one to the other. Explicitly, parametrize $S^1$ by angle and move along the shorter arc. $\square$

**Example 3.5:** The unit sphere $S^n \subseteq \mathbb{R}^{n+1}$ is path-connected for $n \geq 1$.

**Proof:** For $n = 1$ (the circle), we've shown this. For $n \geq 2$, any two points not antipodal lie in a great circle (which is homeomorphic to $S^1$), so we can connect them. For antipodal points, first move slightly, then connect. $\square$

## Path-Connected Components

**Definition 3.3 (Path Component):** For $x \in X$, the **path component** of $x$ is:
$$P_x = \{y \in X : \text{there exists a path from } x \text{ to } y\}$$

**Proposition 3.1:** Path components partition $X$ into disjoint path-connected subsets.

**Proof:**
- **Reflexive:** The constant path $\gamma(t) = x$ shows $x \in P_x$
- **Symmetric:** If $\gamma: [0, 1] \to X$ joins $x$ to $y$, then $\gamma(1-t)$ joins $y$ to $x$
- **Transitive:** If $\gamma_1$ joins $x$ to $y$ and $\gamma_2$ joins $y$ to $z$, then:
$$\gamma(t) = \begin{cases} \gamma_1(2t) & 0 \leq t \leq 1/2 \\ \gamma_2(2t-1) & 1/2 \leq t \leq 1 \end{cases}$$
joins $x$ to $z$ (continuous by the gluing lemma).

Therefore, being path-connected to $x$ is an equivalence relation, and path components are the equivalence classes. $\square$

## Preservation Properties

**Theorem 3.2:** If $f: X \to Y$ is continuous and $X$ is path-connected, then $f(X)$ is path-connected.

**Proof:** Let $y_1, y_2 \in f(X)$. Choose $x_1, x_2 \in X$ with $f(x_1) = y_1$ and $f(x_2) = y_2$.

Since $X$ is path-connected, there exists a path $\gamma: [0, 1] \to X$ joining $x_1$ to $x_2$. Then $f \circ \gamma: [0, 1] \to Y$ is a continuous path joining $y_1$ to $y_2$. Therefore $f(X)$ is path-connected. $\square$

**Corollary 3.1:** Path-connectedness is a topological property.

## Products

**Theorem 3.3:** If $X$ and $Y$ are path-connected, then $X \times Y$ is path-connected.

**Proof:** Let $(x_1, y_1), (x_2, y_2) \in X \times Y$. Choose paths:
- $\gamma_X: [0, 1] \to X$ from $x_1$ to $x_2$
- $\gamma_Y: [0, 1] \to Y$ from $y_1$ to $y_2$

Define $\gamma: [0, 1] \to X \times Y$ by:
$$\gamma(t) = (\gamma_X(t), \gamma_Y(t))$$

This is continuous (both components are continuous) and joins $(x_1, y_1)$ to $(x_2, y_2)$. $\square$

**Corollary 3.2:** Finite products of path-connected spaces are path-connected.

**Corollary 3.3:** Arbitrary products of path-connected spaces are path-connected.

## Locally Path-Connected Spaces

**Definition 3.4 (Locally Path-Connected):** A space $X$ is **locally path-connected** if for every $x \in X$ and every neighborhood $U$ of $x$, there exists a path-connected neighborhood $V$ of $x$ with $V \subseteq U$.

**Theorem 3.4:** A space is locally path-connected if and only if path components of open sets are open.

**Theorem 3.5:** For locally path-connected spaces, connected = path-connected.

**Proof:** Let $X$ be connected and locally path-connected. Fix $x_0 \in X$. Let $P$ be the path component of $x_0$.

**Claim:** $P$ is open. Let $y \in P$. Since $X$ is locally path-connected, there exists a path-connected neighborhood $U$ of $y$. Since $y \in P$, there's a path from $x_0$ to $y$. For any $z \in U$, we can concatenate the path from $x_0$ to $y$ with a path from $y$ to $z$ (in $U$), showing $z \in P$. Thus $U \subseteq P$, so $P$ is open.

**Claim:** $P$ is closed. We show $X \setminus P$ is open. Let $y \in X \setminus P$. There exists a path-connected neighborhood $U$ of $y$. If $U$ intersected $P$, then we could find a path from $x_0$ to $y$, contradicting $y \notin P$. Therefore $U \subseteq X \setminus P$, so $X \setminus P$ is open.

Since $P$ is clopen and $X$ is connected, either $P = \emptyset$ or $P = X$. Since $x_0 \in P$, we have $P = X$. $\square$

**Example 3.6:** $\mathbb{R}^n$ is locally path-connected (open balls are path-connected).

**Example 3.7:** The topologist's sine curve is connected but not locally path-connected.

## Homotopy (Preview)

Two paths with the same endpoints are **homotopic** if one can be continuously deformed into the other. This leads to the fundamental group, a key invariant in algebraic topology.

## Summary

Key points:

1. **Definition:** Any two points joined by continuous path
2. **Stronger:** Path-connected $\implies$ connected (not conversely)
3. **Examples:** $\mathbb{R}^n$, spheres, convex sets
4. **Counterexample:** Topologist's sine curve (connected, not path-connected)
5. **Preserved:** By continuous maps and products
6. **Local:** Locally path-connected spaces have nice properties

Path-connectedness is the appropriate notion for most applications and provides a bridge to algebraic topology through homotopy theory.
