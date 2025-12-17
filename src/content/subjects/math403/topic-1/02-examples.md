---
title: "Examples of Topological Spaces"
slug: "examples"
description: "Detailed exploration of important examples of topologies including metric topologies, order topologies, and product topologies"
order: 2
---

# Examples of Topological Spaces

## Introduction

Understanding topology requires familiarity with a rich variety of examples. While we've seen basic topologies like the discrete and indiscrete topologies, most interesting topological spaces arise from additional structure - metrics, orders, products, or geometric intuition. This section explores fundamental examples that will appear throughout the course.

## Metric Topologies

The most natural source of topologies comes from metrics. Every metric space naturally induces a topology.

### Definition: Metric-Induced Topology

**Definition 2.1 (Metric Topology):** Let $(X, d)$ be a metric space. The **metric topology** $\mathcal{T}_d$ on $X$ is defined by declaring $U \subseteq X$ to be open if and only if for every $x \in U$, there exists $\epsilon > 0$ such that the open ball $B(x, \epsilon) = \{y \in X : d(x, y) < \epsilon\}$ is contained in $U$.

We've already verified that this gives a topology on $\mathbb{R}$ with the standard metric. Let's explore more examples.

### Example 2.1: Euclidean Topology on $\mathbb{R}^n$

The **Euclidean metric** on $\mathbb{R}^n$ is:
$$d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$$

where $\mathbf{x} = (x_1, \ldots, x_n)$ and $\mathbf{y} = (y_1, \ldots, y_n)$.

The induced topology is the **standard topology** on $\mathbb{R}^n$. Open balls in this topology are:
$$B(\mathbf{x}, \epsilon) = \{\mathbf{y} \in \mathbb{R}^n : \|\mathbf{y} - \mathbf{x}\| < \epsilon\}$$

These are the interiors of spheres centered at $\mathbf{x}$ with radius $\epsilon$.

**Important Example:** In $\mathbb{R}^2$, the open set $U = \{(x, y) : x^2 + y^2 < 1\}$ (the open unit disk) is in the standard topology because for any point $\mathbf{p} \in U$, we can find $\epsilon = 1 - \|\mathbf{p}\| > 0$ such that $B(\mathbf{p}, \epsilon) \subseteq U$.

### Example 2.2: Discrete Metric Topology

Define the **discrete metric** on any set $X$ by:
$$d(x, y) = \begin{cases} 0 & \text{if } x = y \\ 1 & \text{if } x \neq y \end{cases}$$

**Proposition 2.1:** The discrete metric induces the discrete topology.

**Proof:**
Let $U \subseteq X$ be any subset. For any $x \in U$, the open ball $B(x, 1/2) = \{y \in X : d(x, y) < 1/2\} = \{x\}$ (since $d(x, y) = 1$ for all $y \neq x$). Clearly $\{x\} \subseteq U$. Therefore, every subset $U$ is open in the metric topology, giving us the discrete topology. $\square$

### Example 2.3: Taxicab Metric on $\mathbb{R}^2$

The **taxicab metric** (or **Manhattan metric**) on $\mathbb{R}^2$ is:
$$d_1((x_1, y_1), (x_2, y_2)) = |x_1 - x_2| + |y_1 - y_2|$$

This metric models distance traveled on a rectangular grid (like city blocks).

Open balls in this metric are diamond-shaped:
$$B((0,0), 1) = \{(x, y) : |x| + |y| < 1\}$$

**Important Fact:** The taxicab metric and Euclidean metric induce the same topology on $\mathbb{R}^2$. To see why, note that for any point $\mathbf{p}$ and Euclidean ball $B_{\text{Euclidean}}(\mathbf{p}, \epsilon)$, there exists a taxicab ball $B_{\text{taxicab}}(\mathbf{p}, \delta)$ contained in it (and vice versa). We say these metrics are **equivalent**.

### Example 2.4: Function Spaces

Let $C[0,1]$ denote the set of continuous real-valued functions on $[0,1]$. We can define several metrics:

**Sup metric (uniform metric):**
$$d_\infty(f, g) = \sup_{x \in [0,1]} |f(x) - g(x)|$$

**$L^1$ metric:**
$$d_1(f, g) = \int_0^1 |f(x) - g(x)| \, dx$$

**$L^2$ metric:**
$$d_2(f, g) = \sqrt{\int_0^1 |f(x) - g(x)|^2 \, dx}$$

Each induces a different topology on $C[0,1]$, and these topologies are not all the same (unlike the Euclidean and taxicab cases). The sup metric topology is finer than the $L^1$ and $L^2$ topologies.

## The Subspace Topology

Given a topological space and a subset, there's a natural way to give the subset a topology.

**Definition 2.2 (Subspace Topology):** Let $(X, \mathcal{T})$ be a topological space and $A \subseteq X$. The **subspace topology** on $A$ (also called **relative topology** or **induced topology**) is:
$$\mathcal{T}_A = \{U \cap A : U \in \mathcal{T}\}$$

In other words, a set $V \subseteq A$ is open in $A$ if and only if $V = U \cap A$ for some open set $U$ in $X$.

### Example 2.5: Subspace of $\mathbb{R}$

Consider $A = [0, 1] \subseteq \mathbb{R}$ with the standard topology.

In the subspace topology on $[0, 1]$:
- The set $[0, 1/2)$ is open in $[0,1]$ because $[0, 1/2) = (-1, 1/2) \cap [0,1]$, and $(-1, 1/2)$ is open in $\mathbb{R}$
- The set $\{0\}$ is NOT open in $\mathbb{R}$, but $[0, 1/2)$ is open in $[0, 1]$
- The whole space $[0, 1]$ is both open and closed in the subspace topology

This illustrates an important point: whether a set is open depends on the ambient space.

### Example 2.6: The Circle $S^1$

The unit circle $S^1 = \{(x, y) \in \mathbb{R}^2 : x^2 + y^2 = 1\}$ inherits the subspace topology from $\mathbb{R}^2$.

An open set in $S^1$ looks like an "arc" of the circle. For instance:
$$U = \{(\cos\theta, \sin\theta) : 0 < \theta < \pi\}$$

is open in $S^1$ because it equals $V \cap S^1$ where $V = \{(x,y) : y > 0\}$ is open in $\mathbb{R}^2$.

## Product Topology

We can combine topological spaces to create new ones.

**Definition 2.3 (Product Topology - Finite Case):** Let $(X, \mathcal{T}_X)$ and $(Y, \mathcal{T}_Y)$ be topological spaces. The **product topology** on $X \times Y$ is the topology generated by the basis:
$$\mathcal{B} = \{U \times V : U \in \mathcal{T}_X, V \in \mathcal{T}_Y\}$$

(We'll formalize "generated by a basis" later, but intuitively, it's the collection of all unions of sets from $\mathcal{B}$.)

### Example 2.7: $\mathbb{R}^2$ as a Product

The standard topology on $\mathbb{R}^2$ is the product topology $\mathbb{R} \times \mathbb{R}$.

A basis for this topology consists of "rectangles" $(a, b) \times (c, d)$ where $(a,b)$ and $(c,d)$ are open intervals in $\mathbb{R}$.

While open balls $\{(x,y) : x^2 + y^2 < r^2\}$ are not basis elements, they are open because they can be written as unions of rectangles.

### Example 2.8: The Torus

The **torus** $T^2$ can be defined as the product $S^1 \times S^1$ where $S^1$ has the subspace topology from $\mathbb{R}^2$.

Alternatively, we can think of $T^2$ as the quotient space obtained by identifying opposite sides of a square, but we'll explore quotient topologies later.

## Order Topology

Linearly ordered sets have a natural topology arising from the order structure.

**Definition 2.4 (Order Topology):** Let $X$ be a set with a linear order $<$ (also called total order). The **order topology** on $X$ is generated by the basis consisting of:
1. All open intervals $(a, b) = \{x \in X : a < x < b\}$ for $a, b \in X$
2. All rays $(-\infty, b) = \{x \in X : x < b\}$ and $(a, \infty) = \{x \in X : a < x\}$ if $X$ has a smallest or largest element

### Example 2.9: Standard Topology on $\mathbb{R}$

The order topology on $\mathbb{R}$ (with the usual order $<$) is precisely the standard topology.

A basis consists of all open intervals $(a, b)$ and rays $(-\infty, b)$ and $(a, \infty)$.

### Example 2.10: The Extended Real Line

Consider $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, +\infty\}$ with the order extending $<$ on $\mathbb{R}$ by declaring $-\infty < x < +\infty$ for all $x \in \mathbb{R}$.

The order topology on $\overline{\mathbb{R}}$ has a basis:
- $(a, b)$ for $a, b \in \mathbb{R}$
- $[-\infty, b) = \{-\infty\} \cup (-\infty, b)$ for $b \in \mathbb{R}$
- $(a, +\infty] = (a, +\infty) \cup \{+\infty\}$ for $a \in \mathbb{R}$

This makes $\overline{\mathbb{R}}$ a compact topological space (we'll prove this later).

### Example 2.11: The Ordered Square

Define the **ordered square** $I^2_{\text{ord}}$ as $[0,1] \times [0,1]$ with the **lexicographic order**:
$$(x_1, y_1) < (x_2, y_2) \iff x_1 < x_2 \text{ or } (x_1 = x_2 \text{ and } y_1 < y_2)$$

This order is like dictionary ordering: first compare $x$-coordinates, then $y$-coordinates if needed.

The order topology on $I^2_{\text{ord}}$ is different from the product topology on $[0,1] \times [0,1]$. For instance, in the order topology, the "vertical" segment $\{1/2\} \times (0, 1)$ is open (it equals $((1/2, 0), (1/2, 1))$ in the order topology), but it's not open in the product topology.

## Lower Limit Topology

We can modify the standard topology on $\mathbb{R}$ to create interesting examples.

**Definition 2.5 (Lower Limit Topology):** The **lower limit topology** $\mathcal{T}_\ell$ on $\mathbb{R}$ is generated by the basis:
$$\mathcal{B}_\ell = \{[a, b) : a, b \in \mathbb{R}, a < b\}$$

Sets of the form $[a, b)$ are called **half-open intervals**.

### Example 2.12: Sorgenfrey Line

$\mathbb{R}$ with the lower limit topology is called the **Sorgenfrey line** (denoted $\mathbb{R}_\ell$).

**Proposition 2.2:** The lower limit topology is strictly finer than the standard topology on $\mathbb{R}$.

**Proof:**
First, every open interval $(a, b)$ in the standard topology can be written as:
$$(a, b) = \bigcup_{n=1}^\infty [a + 1/n, b)$$
Thus $(a, b)$ is open in $\mathcal{T}_\ell$, showing $\mathcal{T}_{\text{std}} \subseteq \mathcal{T}_\ell$.

Second, $[0, 1)$ is open in $\mathcal{T}_\ell$ but not in $\mathcal{T}_{\text{std}}$. To see why it's not open in the standard topology, note that any open interval containing $0$ has the form $(-\epsilon, \epsilon)$ for some $\epsilon > 0$, which is not contained in $[0, 1)$.

Therefore $\mathcal{T}_\ell$ is strictly finer. $\square$

## K-Topology on $\mathbb{R}$

**Definition 2.6 (K-Topology):** Let $K = \{1/n : n \in \mathbb{N}\} \subseteq \mathbb{R}$. The **K-topology** on $\mathbb{R}$ is generated by the basis:
$$\mathcal{B}_K = \{(a, b) : a, b \in \mathbb{R}\} \cup \{(a, b) \setminus K : a, b \in \mathbb{R}\}$$

In other words, we take the usual open intervals and also allow intervals with the sequence $\{1/n\}$ removed.

**Proposition 2.3:** The K-topology is strictly finer than the standard topology on $\mathbb{R}$.

**Proof:**
Every basis element of the standard topology (open intervals $(a,b)$) is in $\mathcal{B}_K$, so $\mathcal{T}_{\text{std}} \subseteq \mathcal{T}_K$.

The set $(-1, 1) \setminus K$ is open in $\mathcal{T}_K$ but not in $\mathcal{T}_{\text{std}}$. To see it's not open in the standard topology, consider the point $0 \in (-1, 1) \setminus K$. Any interval $(0 - \epsilon, 0 + \epsilon)$ contains points of $K$ (for $n$ large enough, $1/n < \epsilon$), so cannot be contained in $(-1, 1) \setminus K$.

Therefore $\mathcal{T}_K$ is strictly finer. $\square$

## Finite Topologies

For finite sets, we can completely describe all topologies (though there are many).

### Example 2.13: Topologies on Three Points

Let $X = \{a, b, c\}$. Some topologies on $X$:

1. **Discrete:** $\mathcal{T} = \mathcal{P}(X)$ (8 elements)
2. **Indiscrete:** $\mathcal{T} = \{\emptyset, X\}$ (2 elements)
3. **Sierpiński topology:** $\mathcal{T} = \{\emptyset, \{a\}, X\}$ (3 elements)
4. **Another topology:** $\mathcal{T} = \{\emptyset, \{a\}, \{a,b\}, X\}$ (4 elements)

**Verification of 4:**
- T1: $\emptyset, X \in \mathcal{T}$ ✓
- T2: All unions:
  - $\{a\} \cup \{a,b\} = \{a,b\} \in \mathcal{T}$ ✓
  - Other unions give $\{a\}$, $\{a,b\}$, or $X$, all in $\mathcal{T}$ ✓
- T3: All intersections:
  - $\{a\} \cap \{a,b\} = \{a\} \in \mathcal{T}$ ✓
  - Other intersections give $\emptyset$ or sets already in $\mathcal{T}$ ✓

Note that there are exactly 29 distinct topologies on a 3-element set (this can be verified by exhaustive enumeration).

## Infinite-Dimensional Spaces

### Example 2.14: The Hilbert Cube

The **Hilbert cube** is the infinite product:
$$H = \prod_{n=1}^\infty [0, 1/n] = [0,1] \times [0, 1/2] \times [0, 1/3] \times \cdots$$

Each factor $[0, 1/n]$ has the subspace topology from $\mathbb{R}$, and $H$ has the product topology.

This is a fundamental example of an infinite-dimensional compact space.

### Example 2.15: Sequence Space $\ell^2$

The space $\ell^2$ consists of all infinite sequences $(x_1, x_2, x_3, \ldots)$ of real numbers such that:
$$\sum_{n=1}^\infty x_n^2 < \infty$$

We can define a metric:
$$d(x, y) = \sqrt{\sum_{n=1}^\infty (x_n - y_n)^2}$$

This metric induces a topology on $\ell^2$, making it a complete metric space (a Hilbert space).

## Quotient Topology (Preview)

**Definition 2.7 (Quotient Topology - Informal):** Let $(X, \mathcal{T})$ be a topological space and $\sim$ an equivalence relation on $X$. Let $X/{\sim}$ denote the set of equivalence classes. The **quotient topology** on $X/{\sim}$ is the finest topology making the quotient map $\pi: X \to X/{\sim}$ continuous.

We'll formalize this later, but here's an example:

### Example 2.16: The Circle from an Interval

Consider $[0, 1]$ with the subspace topology from $\mathbb{R}$. Define $x \sim y$ if $x = y$ or $\{x, y\} = \{0, 1\}$.

The quotient space $[0,1]/{\sim}$ is homeomorphic to the circle $S^1$. Intuitively, we "glue" the endpoints $0$ and $1$ together.

## Summary of Examples

We've seen:
1. **Metric topologies:** Euclidean, discrete, taxicab, function spaces
2. **Subspace topologies:** Intervals, circles, embedded manifolds
3. **Product topologies:** $\mathbb{R}^2$, torus, Hilbert cube
4. **Order topologies:** $\mathbb{R}$, extended reals, ordered square
5. **Modified topologies:** Sorgenfrey line, K-topology
6. **Finite topologies:** Explicit construction and counting
7. **Quotient topologies:** Circle from interval

These examples will serve as testing grounds for theorems and provide intuition for abstract concepts throughout the course. Understanding these concrete cases is essential for mastering topology.
