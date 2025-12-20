---
title: "Open and Closed Sets"
slug: "open-closed"
description: "Comprehensive study of open and closed sets, their properties, and the relationship between them"
order: 3
---

# Open and Closed Sets

## Introduction

In everyday language, "open" and "closed" are opposites. In topology, the relationship is more subtle. A set can be both open and closed (called **clopen**), or neither. Understanding this relationship is crucial for working with topological spaces.

## Closed Sets

### Definition

**Definition 3.1 (Closed Set):** Let $(X, \mathcal{T})$ be a topological space. A subset $A \subseteq X$ is **closed** if its complement $X \setminus A$ is open.

Note that this definition makes "closed" a derived concept - it depends entirely on what sets are open.

### Examples of Closed Sets

**Example 3.1:** In $\mathbb{R}$ with the standard topology:
- $[0, 1]$ is closed because $\mathbb{R} \setminus [0,1] = (-\infty, 0) \cup (1, \infty)$ is open (a union of two open intervals)
- $\{0\}$ is closed because $\mathbb{R} \setminus \{0\} = (-\infty, 0) \cup (0, \infty)$ is open
- $\mathbb{N} = \{0, 1, 2, 3, \ldots\}$ is closed because its complement is $\mathbb{R} \setminus \mathbb{N} = \bigcup_{n \in \mathbb{N}} (n, n+1) \cup (-\infty, 0)$ is open

**Example 3.2:** In any topological space $(X, \mathcal{T})$:
- $\emptyset$ is closed because $X \setminus \emptyset = X$ is open (by axiom T1)
- $X$ is closed because $X \setminus X = \emptyset$ is open (by axiom T1)

Therefore, $\emptyset$ and $X$ are always both open and closed.

**Example 3.3:** In the discrete topology on any set $X$:
- Every subset $A \subseteq X$ is open, so every subset is also closed (since complements of open sets are open in the discrete topology)

**Example 3.4:** In the indiscrete topology on $X$:
- Only $\emptyset$ and $X$ are closed (these are the only open sets)

### The Axioms for Closed Sets

Just as open sets satisfy three axioms, closed sets satisfy dual axioms.

**Theorem 3.1 (Axioms for Closed Sets):** Let $(X, \mathcal{T})$ be a topological space. The collection $\mathcal{F}$ of closed sets satisfies:

1. **F1:** $\emptyset \in \mathcal{F}$ and $X \in \mathcal{F}$
2. **F2 (Arbitrary Intersections):** If $\{F_\alpha\}_{\alpha \in I}$ is any collection of closed sets, then $\bigcap_{\alpha \in I} F_\alpha$ is closed
3. **F3 (Finite Unions):** If $F_1, F_2, \ldots, F_n$ is a finite collection of closed sets, then $\bigcup_{i=1}^n F_i$ is closed

**Proof:**

**F1:** We've already shown $\emptyset$ and $X$ are closed.

**F2:** Let $\{F_\alpha\}_{\alpha \in I}$ be a collection of closed sets. Then each $X \setminus F_\alpha$ is open. We have:
$$X \setminus \bigcap_{\alpha \in I} F_\alpha = \bigcup_{\alpha \in I} (X \setminus F_\alpha)$$
by De Morgan's law. Since this is a union of open sets, it's open by axiom T2. Therefore $\bigcap_{\alpha \in I} F_\alpha$ is closed.

**F3:** Let $F_1, \ldots, F_n$ be closed sets. Then each $X \setminus F_i$ is open. We have:
$$X \setminus \bigcup_{i=1}^n F_i = \bigcap_{i=1}^n (X \setminus F_i)$$
by De Morgan's law. Since this is a finite intersection of open sets, it's open by axiom T3. Therefore $\bigcup_{i=1}^n F_i$ is closed. $\square$

**Important Observation:** Notice the "duality":
- Open sets: arbitrary unions, finite intersections
- Closed sets: arbitrary intersections, finite unions

This duality is fundamental in topology.

### Non-Examples: Why Infinite Unions Can Fail

**Example 3.5:** In $\mathbb{R}$ with the standard topology, consider the closed sets $F_n = [1/n, 1]$ for $n \in \mathbb{N}$.

Each $F_n$ is closed, but:
$$\bigcup_{n=1}^\infty F_n = \bigcup_{n=1}^\infty [1/n, 1] = (0, 1]$$

The set $(0, 1]$ is NOT closed in $\mathbb{R}$ because its complement $(-\infty, 0] \cup (1, \infty)$ is not open (it's not a union of open intervals around each of its points).

This shows that infinite unions of closed sets need not be closed.

**Example 3.6:** Similarly, consider the closed sets $F_n = \{1/n\}$ for $n \in \mathbb{N}$.

Each singleton is closed in $\mathbb{R}$, but:
$$\bigcup_{n=1}^\infty F_n = \{1, 1/2, 1/3, 1/4, \ldots\}$$

While this set happens to be closed in $\mathbb{R}$ (its complement is open), this is not true in all topologies.

## Clopen Sets

**Definition 3.2 (Clopen Set):** A set that is both open and closed is called **clopen**.

### Examples of Clopen Sets

**Example 3.7:** In any topological space $(X, \mathcal{T})$:
- $\emptyset$ and $X$ are always clopen

**Example 3.8:** In the discrete topology on $X$:
- Every subset is clopen

**Example 3.9:** In $\mathbb{R}$ with the standard topology:
- The only clopen sets are $\emptyset$ and $\mathbb{R}$

**Proof:** Suppose $A \subseteq \mathbb{R}$ is clopen with $A \neq \emptyset$ and $A \neq \mathbb{R}$. Then $A$ and $\mathbb{R} \setminus A$ are both non-empty open sets. Choose $a \in A$ and $b \in \mathbb{R} \setminus A$ with $a < b$ (if necessary, swap $a$ and $b$).

Define:
$$c = \sup\{x \in [a, b] : x \in A\}$$

This supremum exists since $a \in A$ and $b$ is an upper bound. We have $c \in [a, b]$.

If $c \in A$, then since $A$ is open, there exists $\epsilon > 0$ such that $(c - \epsilon, c + \epsilon) \subseteq A$. But this contradicts the definition of $c$ as a supremum (there would be points in $(c, c + \epsilon) \cap [a,b]$ that are in $A$, so $c$ wouldn't be the least upper bound).

If $c \notin A$, then $c \in \mathbb{R} \setminus A$. Since $\mathbb{R} \setminus A$ is open, there exists $\epsilon > 0$ such that $(c - \epsilon, c + \epsilon) \subseteq \mathbb{R} \setminus A$. But this contradicts $c$ being the supremum of $A \cap [a,b]$ (there would be points in $(c - \epsilon, c) \cap [a,b]$ that are not in $A$, so $c - \epsilon/2$ would be an upper bound).

Both cases lead to contradiction, so no such $A$ exists. $\square$

**Example 3.10:** In a discrete space, every set is clopen. In the indiscrete topology, only $\emptyset$ and $X$ are clopen.

**Example 3.11:** Let $X = [0,1] \cup [2,3]$ with the subspace topology from $\mathbb{R}$.

Then $[0, 1]$ is clopen in $X$:
- It's open in $X$ because $[0,1] = (-1, 1.5) \cap X$ where $(-1, 1.5)$ is open in $\mathbb{R}$
- It's closed in $X$ because $X \setminus [0,1] = [2,3] = (1.5, 4) \cap X$ where $(1.5, 4)$ is open in $\mathbb{R}$

This example shows that "disconnected" spaces can have non-trivial clopen sets.

## Neither Open Nor Closed

Many sets are neither open nor closed.

**Example 3.12:** In $\mathbb{R}$ with the standard topology:
- $(0, 1]$ is neither open nor closed
  - Not open: $1 \in (0,1]$ but no interval $(1-\epsilon, 1+\epsilon)$ is contained in $(0,1]$
  - Not closed: Its complement $(-\infty, 0] \cup (1, \infty)$ is not open (consider the point $0$)

**Example 3.13:** In $\mathbb{R}^2$ with the standard topology:
- The set $A = \{(x, y) : 0 < x^2 + y^2 \leq 1\}$ (closed unit disk minus origin) is neither open nor closed
  - Not open: Points on the boundary $x^2 + y^2 = 1$ have no open ball contained in $A$
  - Not closed: The complement includes the origin, and small balls around the origin are not contained in the complement

## Closed Sets in Metric Spaces

For metric spaces, we have an equivalent characterization of closed sets.

**Theorem 3.2 (Sequential Characterization of Closed Sets):** Let $(X, d)$ be a metric space with the metric topology. A set $F \subseteq X$ is closed if and only if whenever $(x_n)$ is a sequence in $F$ converging to some $x \in X$, we have $x \in F$.

In other words, $F$ is closed if and only if it contains all its limit points (in the sequential sense).

**Proof:**

($\Rightarrow$) Suppose $F$ is closed and $(x_n)$ is a sequence in $F$ with $x_n \to x$ for some $x \in X$. Assume for contradiction that $x \notin F$, so $x \in X \setminus F$. Since $X \setminus F$ is open, there exists $\epsilon > 0$ such that $B(x, \epsilon) \subseteq X \setminus F$.

But since $x_n \to x$, there exists $N$ such that for all $n > N$, $d(x_n, x) < \epsilon$, meaning $x_n \in B(x, \epsilon) \subseteq X \setminus F$. This contradicts $x_n \in F$ for all $n$. Therefore $x \in F$.

($\Leftarrow$) Suppose $F$ contains all limits of convergent sequences in $F$. We'll show $X \setminus F$ is open.

Let $x \in X \setminus F$. Assume for contradiction that for all $\epsilon > 0$, $B(x, \epsilon) \not\subseteq X \setminus F$. Then for each $n \in \mathbb{N}$, there exists $x_n \in B(x, 1/n) \cap F$.

The sequence $(x_n)$ satisfies $d(x_n, x) < 1/n \to 0$, so $x_n \to x$. By hypothesis, $x \in F$, contradicting $x \in X \setminus F$. Therefore, there exists $\epsilon > 0$ such that $B(x, \epsilon) \subseteq X \setminus F$, showing $X \setminus F$ is open. $\square$

### Examples Using Sequential Characterization

**Example 3.14:** In $\mathbb{R}$, the set $F = \{1/n : n \in \mathbb{N}\} \cup \{0\}$ is closed.

**Proof:** Any sequence in $F$ either:
1. Contains $0$ infinitely often, in which case it has a subsequence converging to $0 \in F$
2. Contains only points $1/n$ for various $n$. Any convergent subsequence must converge to $0$ (since $1/n \to 0$), and $0 \in F$
3. Is eventually constant, converging to some $1/n \in F$

In all cases, the limit is in $F$. $\square$

**Example 3.15:** In $\mathbb{R}$, the set $(0, 1]$ is not closed.

**Proof:** The sequence $x_n = 1/n \in (0, 1]$ converges to $0 \notin (0, 1]$. $\square$

## Closure Relationships

**Theorem 3.3 (Complement of Interior):** For any subset $A$ of a topological space $X$:
$$X \setminus \overline{A} = \text{int}(X \setminus A)$$

where $\overline{A}$ denotes closure and $\text{int}(A)$ denotes interior (we'll define these precisely in the next section).

This theorem relates closed sets and open sets through complementation and will be proved when we study closure and interior.

## Properties of Open and Closed Sets

**Proposition 3.1:** Let $(X, \mathcal{T})$ be a topological space.

1. If $U$ is open and $F$ is closed, then $U \setminus F$ is open and $F \setminus U$ is closed
2. If $U_1, U_2$ are open, then $U_1 \setminus U_2$ need not be open or closed
3. If $F_1, F_2$ are closed, then $F_1 \setminus F_2$ need not be open or closed

**Proof:**

1. We have $U \setminus F = U \cap (X \setminus F)$. Since $U$ is open and $X \setminus F$ is open (as $F$ is closed), their intersection is open (by a finite intersection).

   Also, $F \setminus U = F \cap (X \setminus U)$. We have $X \setminus (F \setminus U) = (X \setminus F) \cup U$, which is a union of an open set and an open set, hence open. Therefore $F \setminus U$ is closed.

2. In $\mathbb{R}$, let $U_1 = (0, 2)$ and $U_2 = (1, 3)$. Then $U_1 \setminus U_2 = (0, 1]$, which is neither open nor closed.

3. In $\mathbb{R}$, let $F_1 = [0, 2]$ and $F_2 = [1, 3]$. Then $F_1 \setminus F_2 = [0, 1)$, which is neither open nor closed. $\square$

## Topological Definitions via Closed Sets

We could have defined a topology using closed sets instead of open sets.

**Alternative Definition:** A collection $\mathcal{F}$ of subsets of $X$ is the collection of closed sets for some topology if and only if:
1. $\emptyset, X \in \mathcal{F}$
2. Arbitrary intersections of sets in $\mathcal{F}$ are in $\mathcal{F}$
3. Finite unions of sets in $\mathcal{F}$ are in $\mathcal{F}$

Given such a collection $\mathcal{F}$, we can define $\mathcal{T} = \{X \setminus F : F \in \mathcal{F}\}$, and this will be a topology.

This duality is powerful: many concepts have both "open" and "closed" formulations.

## Summary

Key takeaways:

1. **Closed sets are complements of open sets** - this is the definition
2. **Both open and closed is possible** - these are clopen sets
3. **Neither open nor closed is common** - like $(0, 1]$ in $\mathbb{R}$
4. **Duality principle:**
   - Open: arbitrary unions, finite intersections
   - Closed: arbitrary intersections, finite unions
5. **Sequential characterization** - in metric spaces, closed sets contain limits of their sequences
6. **Topology can be defined via closed sets** - using the dual axioms

Understanding the relationship between open and closed sets is fundamental for all of topology. The interplay between these concepts will appear repeatedly in continuity, compactness, and connectedness.
