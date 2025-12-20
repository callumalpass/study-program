---
title: "Definition of a Topology"
slug: "topology-definition"
description: "Introduction to the fundamental definition of a topology, axioms, and basic examples"
order: 1
---

# Definition of a Topology

## Introduction

Topology is the mathematical study of spaces and continuous functions. Unlike metric spaces, which require a notion of distance, topological spaces provide a more general framework for discussing concepts like convergence, continuity, and connectivity. The key idea is to abstract the notion of "nearness" or "closeness" without explicitly measuring distances.

## Motivation from Metric Spaces

Before defining a topology abstractly, let's recall that in metric spaces, open sets are fundamental. A subset $U$ of a metric space $(X, d)$ is open if for every point $x \in U$, there exists $\epsilon > 0$ such that the open ball $B(x, \epsilon) = \{y \in X : d(x, y) < \epsilon\}$ is contained in $U$.

Open sets in metric spaces satisfy important properties:
1. The empty set $\emptyset$ and the whole space $X$ are open
2. Arbitrary unions of open sets are open
3. Finite intersections of open sets are open

These properties are so fundamental that we use them to define a topology abstractly, without requiring a metric.

## Definition of a Topological Space

**Definition 1.1 (Topology):** Let $X$ be a set. A **topology** on $X$ is a collection $\mathcal{T}$ of subsets of $X$ satisfying the following axioms:

1. **T1 (Empty and Whole):** $\emptyset \in \mathcal{T}$ and $X \in \mathcal{T}$
2. **T2 (Arbitrary Unions):** If $\{U_\alpha\}_{\alpha \in I}$ is any collection of sets in $\mathcal{T}$, then $\bigcup_{\alpha \in I} U_\alpha \in \mathcal{T}$
3. **T3 (Finite Intersections):** If $U_1, U_2, \ldots, U_n \in \mathcal{T}$ is a finite collection, then $\bigcap_{i=1}^n U_i \in \mathcal{T}$

The pair $(X, \mathcal{T})$ is called a **topological space**. The sets in $\mathcal{T}$ are called **open sets**.

**Important Note:** The axiom T3 requires only finite intersections. Infinite intersections of open sets need not be open, which is a crucial distinction from unions.

## Examples of Topologies

### Example 1.1: Discrete Topology

Let $X$ be any set. The **discrete topology** on $X$ is $\mathcal{T}_{\text{discrete}} = \mathcal{P}(X)$, the power set of $X$ (the collection of all subsets of $X$).

**Verification:**
- T1: $\emptyset \subseteq X$ and $X \subseteq X$, so both are in $\mathcal{P}(X)$
- T2: The union of any collection of subsets of $X$ is a subset of $X$
- T3: The intersection of any finite collection of subsets of $X$ is a subset of $X$

In the discrete topology, every subset is open. This is the "finest" or "largest" topology on $X$.

### Example 1.2: Indiscrete (Trivial) Topology

Let $X$ be any set. The **indiscrete topology** (also called the **trivial topology**) on $X$ is $\mathcal{T}_{\text{indiscrete}} = \{\emptyset, X\}$.

**Verification:**
- T1: Both $\emptyset$ and $X$ are in $\mathcal{T}_{\text{indiscrete}}$ by definition
- T2: Any union of sets from $\{\emptyset, X\}$ is either $\emptyset$ or $X$
- T3: Any intersection of sets from $\{\emptyset, X\}$ is either $\emptyset$ or $X$

This is the "coarsest" or "smallest" topology on $X$.

### Example 1.3: Finite Complement Topology

Let $X$ be any set. The **finite complement topology** on $X$ is:
$$\mathcal{T}_{\text{fc}} = \{U \subseteq X : X \setminus U \text{ is finite}\} \cup \{\emptyset\}$$

In other words, a set is open if its complement is finite, or if it's empty.

**Verification:**
- T1: $X \setminus \emptyset = X$ is finite (if $X$ is finite) or $\emptyset$ is included separately. $X \setminus X = \emptyset$ is finite, so $X \in \mathcal{T}_{\text{fc}}$
- T2: Let $\{U_\alpha\}_{\alpha \in I}$ be a collection in $\mathcal{T}_{\text{fc}}$ with each non-empty. Then:
  $$X \setminus \bigcup_{\alpha \in I} U_\alpha = \bigcap_{\alpha \in I} (X \setminus U_\alpha)$$
  Each $X \setminus U_\alpha$ is finite, and the intersection of finite sets (even infinitely many) is finite if at least one is finite. Thus the union is in $\mathcal{T}_{\text{fc}}$.

- T3: Let $U_1, \ldots, U_n \in \mathcal{T}_{\text{fc}}$. Then:
  $$X \setminus \bigcap_{i=1}^n U_i = \bigcup_{i=1}^n (X \setminus U_i)$$
  Each $X \setminus U_i$ is finite, and a finite union of finite sets is finite. Thus the intersection is in $\mathcal{T}_{\text{fc}}$.

### Example 1.4: Countable Complement Topology

Let $X$ be any set. The **countable complement topology** on $X$ is:
$$\mathcal{T}_{\text{cc}} = \{U \subseteq X : X \setminus U \text{ is countable}\} \cup \{\emptyset\}$$

The verification is similar to the finite complement topology, using the fact that countable unions of countable sets are countable.

## Why These Axioms?

The three axioms for a topology are not arbitrary. They capture the essential properties needed to:

1. **Have basic building blocks:** T1 ensures we have the most basic open sets
2. **Build larger open sets:** T2 allows us to take unions freely, modeling the idea that if each point in a union has a neighborhood contained in the union, the union should be open
3. **Find intersections carefully:** T3 allows finite intersections, but not arbitrary ones. This asymmetry is crucial and reflects the fact that infinite intersections can "shrink" to non-open sets (e.g., $\bigcap_{n=1}^\infty (-\frac{1}{n}, \frac{1}{n}) = \{0\}$ in $\mathbb{R}$, which is not open)

## Comparing Topologies

**Definition 1.2 (Coarser and Finer):** Let $\mathcal{T}_1$ and $\mathcal{T}_2$ be two topologies on the same set $X$.
- We say $\mathcal{T}_1$ is **coarser** (or **weaker**, or **smaller**) than $\mathcal{T}_2$ if $\mathcal{T}_1 \subseteq \mathcal{T}_2$
- We say $\mathcal{T}_2$ is **finer** (or **stronger**, or **larger**) than $\mathcal{T}_1$ if $\mathcal{T}_2 \supseteq \mathcal{T}_1$

Intuitively, a finer topology has more open sets, which means it can make finer distinctions between points.

**Proposition 1.1:** For any set $X$, the indiscrete topology is the coarsest topology on $X$, and the discrete topology is the finest topology on $X$.

**Proof:**
Let $\mathcal{T}$ be any topology on $X$. By axiom T1, $\emptyset, X \in \mathcal{T}$. Therefore $\{\emptyset, X\} \subseteq \mathcal{T}$, showing the indiscrete topology is coarsest.

For any subset $U \subseteq X$, we have $U = \bigcup_{x \in U} \{x\}$. In the discrete topology, each singleton $\{x\}$ is open (being a subset of $X$), so by T2, $U$ is open. Thus $\mathcal{T} \subseteq \mathcal{P}(X)$, showing the discrete topology is finest. $\square$

## Non-Examples

It's instructive to see collections that fail to be topologies.

### Non-Example 1.1: Missing Arbitrary Unions

Let $X = \{1, 2, 3\}$ and $\mathcal{T} = \{\emptyset, \{1\}, \{2\}, X\}$.

This is not a topology because $\{1\} \cup \{2\} = \{1, 2\} \notin \mathcal{T}$, violating T2.

### Non-Example 1.2: Missing Finite Intersections

Let $X = \mathbb{R}$ and let $\mathcal{T}$ be the collection of all open intervals $(a, b)$ together with $\emptyset$ and $\mathbb{R}$.

This is not a topology because $(0, 2) \cap (1, 3) = (1, 2)$ is an open interval, but we need to verify that all finite intersections of open intervals are in $\mathcal{T}$. However, $(0, 1) \cap (1, 2) = \emptyset$ is in $\mathcal{T}$, and actually this example needs more care.

Better: Let $X = \mathbb{R}$ and $\mathcal{T} = \{(a, \infty) : a \in \mathbb{R}\} \cup \{\emptyset, \mathbb{R}\}$.

Then $(0, \infty) \cap (-1, \infty) = (0, \infty) \in \mathcal{T}$, which is fine. But we need to check all cases. Actually, the intersection of $(a, \infty)$ and $(b, \infty)$ is $(\max\{a,b\}, \infty)$, which is in $\mathcal{T}$. This actually is a topology!

Better non-example: Let $X = \{1, 2, 3, 4\}$ and $\mathcal{T} = \{\emptyset, \{1, 2\}, \{2, 3\}, X\}$. Then $\{1, 2\} \cap \{2, 3\} = \{2\} \notin \mathcal{T}$, violating T3.

## The Standard Topology on $\mathbb{R}$

**Definition 1.3 (Standard Topology):** The **standard topology** (or **usual topology**) on $\mathbb{R}$ is the topology $\mathcal{T}_{\text{std}}$ where $U \in \mathcal{T}_{\text{std}}$ if and only if for every $x \in U$, there exists $\epsilon > 0$ such that $(x - \epsilon, x + \epsilon) \subseteq U$.

This is precisely the topology induced by the standard metric $d(x, y) = |x - y|$ on $\mathbb{R}$.

**Theorem 1.1:** The standard topology on $\mathbb{R}$ satisfies the three topology axioms.

**Proof:**
- T1: For $\emptyset$, the condition is vacuously true. For $\mathbb{R}$, every $x \in \mathbb{R}$ satisfies $(x-1, x+1) \subseteq \mathbb{R}$.

- T2: Let $\{U_\alpha\}_{\alpha \in I}$ be a collection of open sets, and let $U = \bigcup_{\alpha \in I} U_\alpha$. If $x \in U$, then $x \in U_\alpha$ for some $\alpha \in I$. Since $U_\alpha$ is open, there exists $\epsilon > 0$ such that $(x - \epsilon, x + \epsilon) \subseteq U_\alpha \subseteq U$. Thus $U$ is open.

- T3: Let $U_1, \ldots, U_n$ be open sets, and let $U = \bigcap_{i=1}^n U_i$. If $x \in U$, then $x \in U_i$ for all $i = 1, \ldots, n$. For each $i$, there exists $\epsilon_i > 0$ such that $(x - \epsilon_i, x + \epsilon_i) \subseteq U_i$. Let $\epsilon = \min\{\epsilon_1, \ldots, \epsilon_n\} > 0$. Then $(x - \epsilon, x + \epsilon) \subseteq U_i$ for all $i$, so $(x - \epsilon, x + \epsilon) \subseteq U$. Thus $U$ is open. $\square$

## Visualizing Topologies

While topological spaces can be very abstract, it helps to visualize them:

- **Discrete topology:** Every point is "isolated" - you can always find an open set containing just that point
- **Indiscrete topology:** Points are "inseparable" - there's no way to separate two distinct points with open sets
- **Standard topology on $\mathbb{R}$:** Points are separated by intervals, capturing our intuitive notion of "nearby"

## Important Remarks

1. **Context matters:** When we write $(X, \mathcal{T})$, we explicitly state the topology. Often, when the topology is clear from context, we simply write $X$ instead of $(X, \mathcal{T})$.

2. **Multiple topologies:** A single set can have many different topologies. For example, $\mathbb{R}$ can have the discrete topology, indiscrete topology, standard topology, finite complement topology, etc.

3. **Notation:** We often write "let $X$ be a topological space" as shorthand for "let $(X, \mathcal{T})$ be a topological space for some topology $\mathcal{T}$."

4. **Open vs. closed:** In the next section, we'll see that "open" and "closed" are not opposites in topology - a set can be both, neither, or just one.

## Conclusion

The definition of a topology provides a powerful abstraction that unifies many areas of mathematics. By identifying the essential properties of open sets, we can study continuous functions, convergence, and geometric properties in a general setting. The three axioms - while simple - have profound consequences that we'll explore throughout this course.

The key insight is that topology is about structure, not measurement. We don't need to know "how far apart" points are; we only need to know which sets are "open," and from this simple beginning, an entire theory emerges.
