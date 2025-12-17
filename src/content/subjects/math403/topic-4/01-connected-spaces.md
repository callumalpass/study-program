---
title: "Connected Spaces"
slug: "connected-spaces"
description: "Definition and fundamental properties of connected topological spaces"
order: 1
---

# Connected Spaces

## Introduction

Connectedness captures the intuitive notion of a space being "in one piece." A space is connected if it cannot be separated into two disjoint non-empty open parts. This is one of the most important topological properties, preserved by continuous maps and fundamental for understanding the structure of spaces.

## Definition

**Definition 1.1 (Disconnected Space):** A topological space $X$ is **disconnected** if there exist non-empty open sets $U, V \subseteq X$ such that:
1. $U \cap V = \emptyset$ (disjoint)
2. $U \cup V = X$ (cover the space)

Such a pair $(U, V)$ is called a **separation** or **disconnection** of $X$.

**Definition 1.2 (Connected Space):** A topological space $X$ is **connected** if it is not disconnected. That is, there is no separation of $X$.

## Equivalent Characterizations

**Theorem 1.1 (Equivalent Definitions of Connected):** For a topological space $X$, the following are equivalent:

1. $X$ is connected
2. The only subsets of $X$ that are both open and closed are $\emptyset$ and $X$
3. Every continuous function $f: X \to \{0, 1\}$ (with discrete topology) is constant
4. $X$ cannot be written as the union of two disjoint non-empty closed sets

**Proof:**

$(1) \Rightarrow (2)$: Suppose $X$ is connected and $A \subseteq X$ is clopen (both open and closed) with $A \neq \emptyset, X$. Then $B = X \setminus A$ is also non-empty, open (since $A$ is closed), and closed (since $A$ is open). The pair $(A, B)$ would be a separation of $X$, contradicting connectedness.

$(2) \Rightarrow (3)$: Suppose the only clopen sets are $\emptyset$ and $X$. Let $f: X \to \{0, 1\}$ be continuous. Then $f^{-1}(\{0\})$ and $f^{-1}(\{1\})$ are both clopen (since $\{0\}$ and $\{1\}$ are both open and closed in the discrete topology).

Since $f^{-1}(\{0\}) \cup f^{-1}(\{1\}) = X$ and they're disjoint, one must be $\emptyset$ and the other $X$. Thus $f$ is constant.

$(3) \Rightarrow (4)$: Suppose every continuous $f: X \to \{0, 1\}$ is constant. If $X = A \cup B$ where $A, B$ are disjoint non-empty closed sets, define:
$$f(x) = \begin{cases} 0 & x \in A \\ 1 & x \in B \end{cases}$$

This is continuous (preimages of $\{0\}$ and $\{1\}$ are $A$ and $B$, both closed), but not constant, contradiction.

$(4) \Rightarrow (1)$: If $X$ has a separation $(U, V)$, then $U$ and $V$ are disjoint non-empty closed sets (since $V = X \setminus U$ is closed, and similarly for $U$), contradicting (4). $\square$

## Basic Examples

**Example 1.1:** The real line $\mathbb{R}$ with the standard topology is connected.

**Proof:** Suppose $(U, V)$ is a separation of $\mathbb{R}$. Choose $u \in U$ and $v \in V$. Without loss of generality, assume $u < v$.

Define:
$$c = \sup(U \cap [u, v])$$

This supremum exists since $u \in U \cap [u, v]$ and $v$ is an upper bound.

**Case 1:** $c \in U$. Since $U$ is open, there exists $\epsilon > 0$ such that $(c - \epsilon, c + \epsilon) \subseteq U$. This contradicts $c$ being the supremum (there would be points in $(c, c + \epsilon) \cap [u, v]$ that are in $U$, so $c$ wouldn't be the least upper bound).

**Case 2:** $c \in V$. Since $V$ is open, there exists $\epsilon > 0$ such that $(c - \epsilon, c + \epsilon) \subseteq V$. This means no points of $(c - \epsilon, c)$ are in $U \cap [u, v]$, contradicting $c$ being the supremum.

Both cases lead to contradiction, so no separation exists. $\square$

**Example 1.2:** Any interval in $\mathbb{R}$ (open, closed, half-open) is connected.

**Proof:** An interval is homeomorphic to $\mathbb{R}$ or $[0, 1]$ (via linear maps), and connectedness is preserved by homeomorphisms. We can also prove directly using the intermediate value property. $\square$

**Example 1.3:** The rationals $\mathbb{Q}$ are disconnected.

**Proof:** Choose any irrational number $\alpha$ (say $\alpha = \sqrt{2}$). Define:
$$U = \{q \in \mathbb{Q} : q < \alpha\}, \quad V = \{q \in \mathbb{Q} : q > \alpha\}$$

Both $U$ and $V$ are non-empty and open in $\mathbb{Q}$ (subspace topology):
- $U = (-\infty, \alpha) \cap \mathbb{Q}$
- $V = (\alpha, \infty) \cap \mathbb{Q}$

They're disjoint and $U \cup V = \mathbb{Q}$. Thus $(U, V)$ is a separation. $\square$

**Example 1.4:** A discrete space with more than one point is disconnected.

**Proof:** If $X$ has at least two points $x, y$, then $\{x\}$ and $X \setminus \{x\}$ are both open (discrete topology), non-empty, and disjoint. $\square$

**Example 1.5:** An indiscrete space is connected.

**Proof:** The only open sets are $\emptyset$ and $X$, so there's no separation. $\square$

## Preservation Under Continuous Maps

**Theorem 1.2 (Continuous Image of Connected is Connected):** If $f: X \to Y$ is continuous and $X$ is connected, then $f(X)$ is connected (with the subspace topology).

**Proof:** Suppose $f(X)$ is disconnected with separation $(U, V)$. Then $U, V$ are open in $f(X)$, so $U = U' \cap f(X)$ and $V = V' \cap f(X)$ for open sets $U', V'$ in $Y$.

Define:
$$A = f^{-1}(U') = f^{-1}(U), \quad B = f^{-1}(V') = f^{-1}(V)$$

Both $A$ and $B$ are open in $X$ (by continuity), non-empty (since $f$ is surjective onto $f(X)$ and $U, V$ are non-empty), and disjoint (since $U \cap V = \emptyset$).

Furthermore, $A \cup B = f^{-1}(U \cup V) = f^{-1}(f(X)) = X$ (since $f$ is surjective onto its image).

Thus $(A, B)$ is a separation of $X$, contradicting the connectedness of $X$. $\square$

**Corollary 1.1:** Connectedness is a topological property (preserved by homeomorphisms).

**Corollary 1.2 (No Continuous Bijection):** There is no continuous bijection from a connected space to a disconnected space.

**Example 1.6:** Since $[0, 1]$ is connected and $(0, 1/2) \cup (1/2, 1)$ is disconnected, there's no continuous bijection between them.

## Intermediate Value Theorem

**Theorem 1.3 (Topological Intermediate Value Theorem):** Let $X$ be a connected space and $f: X \to \mathbb{R}$ be continuous. If $a, b \in X$ with $f(a) < c < f(b)$, then there exists $x \in X$ with $f(x) = c$.

**Proof:** Since $X$ is connected and $f$ is continuous, $f(X)$ is connected in $\mathbb{R}$. Connected subsets of $\mathbb{R}$ are intervals (we'll prove this next).

Since $f(a), f(b) \in f(X)$ with $f(a) < c < f(b)$, and $f(X)$ is an interval, we have $c \in f(X)$. Thus there exists $x \in X$ with $f(x) = c$. $\square$

**Theorem 1.4 (Connected Subsets of $\mathbb{R}$):** A subset of $\mathbb{R}$ is connected if and only if it is an interval.

**Proof:**

($\Leftarrow$) We've shown intervals are connected.

($\Rightarrow$) Let $A \subseteq \mathbb{R}$ be connected. We show $A$ is an interval.

Suppose not. Then there exist $a, b \in A$ with $a < b$ and some $c \in (a, b)$ with $c \notin A$. Define:
$$U = A \cap (-\infty, c), \quad V = A \cap (c, \infty)$$

Both are non-empty ($a \in U$, $b \in V$), open in $A$, disjoint, and $U \cup V = A$. This gives a separation of $A$, contradicting connectedness. $\square$

## Unions and Intersections

**Theorem 1.5 (Union of Connected Spaces):** Let $\{A_\alpha\}_{\alpha \in I}$ be a collection of connected subspaces of $X$ with $\bigcap_{\alpha \in I} A_\alpha \neq \emptyset$. Then $\bigcup_{\alpha \in I} A_\alpha$ is connected.

**Proof:** Let $A = \bigcup_{\alpha \in I} A_\alpha$ and suppose $(U, V)$ is a separation of $A$. Choose $x_0 \in \bigcap_{\alpha} A_\alpha$. Without loss of generality, assume $x_0 \in U$.

For each $\alpha$, consider $U \cap A_\alpha$ and $V \cap A_\alpha$. Since $A_\alpha$ is connected and $(U \cap A_\alpha) \cup (V \cap A_\alpha) = A_\alpha$, one of them must be empty.

Since $x_0 \in U \cap A_\alpha$ for all $\alpha$, we have $V \cap A_\alpha = \emptyset$ for all $\alpha$. Therefore:
$$V = V \cap A = V \cap \bigcup_\alpha A_\alpha = \bigcup_\alpha (V \cap A_\alpha) = \emptyset$$

This contradicts $V$ being non-empty. $\square$

**Example 1.7:** The union of all intervals containing 0 is $\mathbb{R}$, which is connected.

**Theorem 1.6 (Closure of Connected is Connected):** If $A$ is connected, then $\overline{A}$ is connected.

**Proof:** Suppose $(U, V)$ is a separation of $\overline{A}$. Then $U \cap A$ and $V \cap A$ are open in $A$, disjoint, and cover $A$ (since $A \subseteq \overline{A} = U \cup V$).

Since $A$ is connected, one of them is empty, say $V \cap A = \emptyset$. This means $A \subseteq U$.

Taking closures: $\overline{A} \subseteq \overline{U}$. But $U$ is open in $\overline{A}$, so... actually, we need to use that $V$ is also closed in $\overline{A}$.

Since $V$ is closed in $\overline{A}$ and $V \cap A = \emptyset$, we have $V \cap \overline{A} = V$. But $\overline{A} \supseteq A$, and closure of $A$ in $\overline{A}$ is $\overline{A}$ itself...

Let me use a different approach: Since $A \subseteq U$ and $U$ is open in $\overline{A}$, for any $x \in \overline{A}$, every neighborhood of $x$ intersects $A$, hence intersects $U$. This means... we need $U$ to be dense in $\overline{A}$.

Actually, the cleanest proof: If $V \cap A = \emptyset$ and $V$ is closed in $\overline{A}$, then $V$ is disjoint from $\overline{A}$ (since $V$ is closed, if it doesn't intersect $A$, it doesn't intersect the closure). Thus $V = \emptyset$, contradiction. $\square$

## Summary

Key points about connectedness:

1. **Definition:** No separation into disjoint non-empty open sets
2. **Equivalent:** Only clopen sets are $\emptyset$ and $X$
3. **$\mathbb{R}$:** Connected, as are all intervals
4. **$\mathbb{Q}$:** Disconnected (has gaps)
5. **Preserved:** By continuous maps
6. **IVT:** Topological generalization
7. **Unions:** Common point implies union connected
8. **Closure:** Closure of connected is connected

Connectedness is fundamental for understanding the global structure of topological spaces.
