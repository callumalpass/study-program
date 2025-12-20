---
title: "The Basis Theorem"
slug: "basis-theorem"
description: "Fundamental theorems about bases, including uniqueness, refinement, and applications"
order: 2
---

# The Basis Theorem

## Introduction

Having defined bases in the previous section, we now explore deeper properties and theorems about bases. The basis theorem provides necessary and sufficient conditions for when a collection generates a topology, and establishes important relationships between different bases for the same topology.

## The Main Basis Theorem

We've already seen the basis criterion (B1 and B2), but let's state it more formally and explore its consequences.

**Theorem 2.1 (Basis Theorem):** Let $X$ be a set and $\mathcal{B}$ be a collection of subsets of $X$. The following are equivalent:

1. $\mathcal{B}$ is a basis for some topology on $X$
2. $\mathcal{B}$ satisfies:
   - **(B1)** $\bigcup_{B \in \mathcal{B}} B = X$
   - **(B2)** For any $B_1, B_2 \in \mathcal{B}$ and $x \in B_1 \cap B_2$, there exists $B_3 \in \mathcal{B}$ with $x \in B_3 \subseteq B_1 \cap B_2$

3. The collection $\mathcal{T} = \{U \subseteq X : \forall x \in U, \exists B \in \mathcal{B} \text{ with } x \in B \subseteq U\}$ is a topology on $X$ and $\mathcal{B}$ is a basis for $\mathcal{T}$

**Proof:**

We've proven $(1) \Rightarrow (2)$ and $(2) \Rightarrow (1)$ previously. Let's show $(2) \Rightarrow (3)$ and $(3) \Rightarrow (1)$.

$(2) \Rightarrow (3)$: Assume B1 and B2 hold. Define $\mathcal{T}$ as in (3). We verify $\mathcal{T}$ is a topology.

- **T1:** For $\emptyset$, the condition is vacuous, so $\emptyset \in \mathcal{T}$. For $X$, by B1, every $x \in X$ is in some $B \in \mathcal{B}$, and $B \subseteq X$, so $X \in \mathcal{T}$.

- **T2:** Let $\{U_\alpha\}_{\alpha \in I} \subseteq \mathcal{T}$ and let $U = \bigcup_\alpha U_\alpha$. For any $x \in U$, there exists $\alpha$ with $x \in U_\alpha$. Since $U_\alpha \in \mathcal{T}$, there exists $B \in \mathcal{B}$ with $x \in B \subseteq U_\alpha \subseteq U$. Therefore $U \in \mathcal{T}$.

- **T3:** Let $U_1, \ldots, U_n \in \mathcal{T}$ and let $U = \bigcap_{i=1}^n U_i$. For any $x \in U$, we have $x \in U_i$ for all $i$. For each $i$, there exists $B_i \in \mathcal{B}$ with $x \in B_i \subseteq U_i$.

  By B2 applied repeatedly, there exists $B \in \mathcal{B}$ with $x \in B \subseteq \bigcap_{i=1}^n B_i \subseteq \bigcap_{i=1}^n U_i = U$. Therefore $U \in \mathcal{T}$.

To show $\mathcal{B}$ is a basis for $\mathcal{T}$: First, every $B \in \mathcal{B}$ is in $\mathcal{T}$ (for $x \in B$, we can choose $B$ itself). Second, every $U \in \mathcal{T}$ can be written as $U = \bigcup_{x \in U} B_x$ where for each $x$, we choose $B_x \in \mathcal{B}$ with $x \in B_x \subseteq U$. Thus $\mathcal{B}$ is a basis for $\mathcal{T}$.

$(3) \Rightarrow (1)$: Immediate from the definition. $\square$

## Lemma on Basis Elements

**Lemma 2.1:** Let $\mathcal{B}$ be a basis for a topology $\mathcal{T}$ on $X$. Then $B \in \mathcal{B}$ if and only if $B \in \mathcal{T}$ and for every $x \in B$, there exists $B' \in \mathcal{B}$ with $x \in B' \subseteq B$ and $B' = B$.

Actually, a simpler statement: every basis element is open, but not every open set is a basis element.

**Lemma 2.2 (Basis Elements are Open):** If $\mathcal{B}$ is a basis for $\mathcal{T}$, then $\mathcal{B} \subseteq \mathcal{T}$.

**Proof:** Each $B \in \mathcal{B}$ can be written as $B = \bigcup \{B\} = B$, a union of basis elements, so $B \in \mathcal{T}$. $\square$

## Refinement of Bases

**Definition 2.1 (Refinement):** A basis $\mathcal{B}'$ is a **refinement** of basis $\mathcal{B}$ if for every $B \in \mathcal{B}$ and every $x \in B$, there exists $B' \in \mathcal{B}'$ with $x \in B' \subseteq B$.

**Proposition 2.1:** If $\mathcal{B}'$ is a refinement of $\mathcal{B}$, and both generate topologies on $X$, then $\mathcal{T}_{\mathcal{B}'} \supseteq \mathcal{T}_{\mathcal{B}}$ (i.e., $\mathcal{B}'$ generates a finer topology).

**Proof:** Let $U \in \mathcal{T}_{\mathcal{B}}$. Write $U = \bigcup_\alpha B_\alpha$ where $B_\alpha \in \mathcal{B}$. For each $x \in U$, there exists $\alpha$ with $x \in B_\alpha$. By the refinement property, there exists $B'_x \in \mathcal{B}'$ with $x \in B'_x \subseteq B_\alpha \subseteq U$. Thus:
$$U = \bigcup_{x \in U} B'_x$$
is a union of sets in $\mathcal{B}'$, so $U \in \mathcal{T}_{\mathcal{B}'}$. $\square$

**Example 2.1:** On $\mathbb{R}$:
- $\mathcal{B}_1 = \{(a, b) : a, b \in \mathbb{R}\}$ (all open intervals)
- $\mathcal{B}_2 = \{(a, b) : a, b \in \mathbb{Q}\}$ (rational endpoints)

$\mathcal{B}_2$ is a refinement of $\mathcal{B}_1$. Both generate the same topology (the standard topology), so $\mathcal{T}_{\mathcal{B}_1} = \mathcal{T}_{\mathcal{B}_2}$.

This shows that refinement doesn't always make the topology strictly finer - sometimes it just gives a different basis for the same topology.

## Criteria for Same Topology

**Theorem 2.2 (Same Topology Criterion):** Two bases $\mathcal{B}_1$ and $\mathcal{B}_2$ generate the same topology if and only if:
1. For every $B_1 \in \mathcal{B}_1$ and $x \in B_1$, there exists $B_2 \in \mathcal{B}_2$ with $x \in B_2 \subseteq B_1$
2. For every $B_2 \in \mathcal{B}_2$ and $x \in B_2$, there exists $B_1 \in \mathcal{B}_1$ with $x \in B_1 \subseteq B_2$

**Proof:**

($\Rightarrow$) If $\mathcal{T}_{\mathcal{B}_1} = \mathcal{T}_{\mathcal{B}_2}$, then every $B_1 \in \mathcal{B}_1$ is open in $\mathcal{T}_{\mathcal{B}_2}$. For $x \in B_1$, since $\mathcal{B}_2$ is a basis for $\mathcal{T}_{\mathcal{B}_2}$, there exists $B_2 \in \mathcal{B}_2$ with $x \in B_2 \subseteq B_1$. By symmetry, (2) holds.

($\Leftarrow$) Condition (1) says $\mathcal{B}_1$ is a refinement of $\mathcal{B}_2$, so $\mathcal{T}_{\mathcal{B}_1} \supseteq \mathcal{T}_{\mathcal{B}_2}$. Condition (2) says $\mathcal{B}_2$ is a refinement of $\mathcal{B}_1$, so $\mathcal{T}_{\mathcal{B}_2} \supseteq \mathcal{T}_{\mathcal{B}_1}$. Therefore $\mathcal{T}_{\mathcal{B}_1} = \mathcal{T}_{\mathcal{B}_2}$. $\square$

**Example 2.2:** On $\mathbb{R}^2$:
- $\mathcal{B}_1 = \{(a, b) \times (c, d)\}$ (open rectangles)
- $\mathcal{B}_2 = \{B(\mathbf{p}, r)\}$ (open disks)

These generate the same topology. To verify:

For $\mathcal{B}_1 \to \mathcal{B}_2$: Given rectangle $(a, b) \times (c, d)$ and point $\mathbf{p} \in (a,b) \times (c, d)$, we can find a disk $B(\mathbf{p}, r)$ contained in the rectangle (choose $r$ smaller than the distance to the boundary).

For $\mathcal{B}_2 \to \mathcal{B}_1$: Given disk $B(\mathbf{p}, r)$ and point $\mathbf{q} \in B(\mathbf{p}, r)$, we can find a rectangle containing $\mathbf{q}$ and contained in the disk.

## Countable Bases

**Definition 2.2 (Second-Countable):** A topological space $(X, \mathcal{T})$ is **second-countable** if it has a countable basis.

**Example 2.3:** $\mathbb{R}$ with the standard topology is second-countable, using $\mathcal{B} = \{(a, b) : a, b \in \mathbb{Q}\}$.

**Example 2.4:** $\mathbb{R}^n$ with the standard topology is second-countable, using:
$$\mathcal{B} = \left\{\prod_{i=1}^n (a_i, b_i) : a_i, b_i \in \mathbb{Q}\right\}$$

This is countable as a countable product of countable sets.

**Example 2.5:** Any discrete space $X$ has a countable basis if and only if $X$ is countable. The basis $\{\{x\} : x \in X\}$ has cardinality $|X|$.

**Proposition 2.2:** If $X$ is second-countable, then $X$ is separable (has a countable dense subset).

**Proof:** Let $\mathcal{B} = \{B_n : n \in \mathbb{N}\}$ be a countable basis. For each $n$, if $B_n \neq \emptyset$, choose $x_n \in B_n$. Let $D = \{x_n : B_n \neq \emptyset\}$. Then $D$ is countable.

To show $D$ is dense, let $U$ be any non-empty open set. Write $U = \bigcup_i B_{n_i}$ where $B_{n_i} \in \mathcal{B}$. At least one $B_{n_i} \neq \emptyset$, so $x_{n_i} \in B_{n_i} \subseteq U$. Thus $U \cap D \neq \emptyset$, showing $\overline{D} = X$. $\square$

**Remark:** The converse is false. There exist separable spaces that are not second-countable (e.g., uncountable discrete spaces can't be separable).

## Applications of the Basis Theorem

**Application 2.1 (Verifying Topologies):** To show a collection $\mathcal{T}$ is a topology, it often suffices to exhibit a basis $\mathcal{B}$ and verify B1 and B2, rather than checking all three topology axioms for the entire collection.

**Application 2.2 (Constructing Topologies):** Given a geometric or analytic description of "basic open sets," we can generate a topology using the basis theorem.

**Example 2.6 (Metric Topology):** For a metric space $(X, d)$, the collection $\mathcal{B} = \{B(x, r) : x \in X, r > 0\}$ of all open balls satisfies B1 and B2:

- **B1:** Every $x \in X$ is in $B(x, 1)$, so $\bigcup_{x,r} B(x, r) = X$.

- **B2:** Let $y \in B(x_1, r_1) \cap B(x_2, r_2)$. Define:
  $$\delta = \min\{r_1 - d(y, x_1), r_2 - d(y, x_2)\} > 0$$

  Then $B(y, \delta) \subseteq B(x_1, r_1) \cap B(x_2, r_2)$ by the triangle inequality.

Therefore $\mathcal{B}$ is a basis for a topology on $X$, called the metric topology.

## Uniqueness Questions

**Question:** If $\mathcal{B}$ is a basis for $\mathcal{T}$, is it unique?

**Answer:** No! A topology can have many different bases.

**Example 2.7:** For the standard topology on $\mathbb{R}$:
- $\mathcal{B}_1 = \{(a, b) : a < b\}$
- $\mathcal{B}_2 = \{(a, b) : a, b \in \mathbb{Q}, a < b\}$
- $\mathcal{B}_3 = \{(x - r, x + r) : x \in \mathbb{R}, r > 0, r \in \mathbb{Q}\}$

All three are bases for the same topology.

**Question:** Does every topology have a basis?

**Answer:** Yes, trivially! The topology $\mathcal{T}$ itself is a basis for $\mathcal{T}$. Every open set is a union of open sets from $\mathcal{T}$.

But finding a "nice" or "small" basis is non-trivial and important.

## Minimal Bases

**Definition 2.3 (Minimal Basis):** A basis $\mathcal{B}$ for $\mathcal{T}$ is **minimal** if no proper subset of $\mathcal{B}$ is a basis for $\mathcal{T}$.

**Example 2.8:** In the discrete topology on a finite set $X = \{x_1, \ldots, x_n\}$, the basis $\mathcal{B} = \{\{x_1\}, \ldots, \{x_n\}\}$ is minimal. Removing any singleton leaves some singleton (and thus some subset) that can't be expressed as a union of the remaining singletons.

**Example 2.9:** For the standard topology on $\mathbb{R}$, the basis of all open intervals is NOT minimal (we can remove uncountably many intervals and still have a basis).

The basis $\{(a, b) : a, b \in \mathbb{Q}\}$ is also not minimal.

**Proposition 2.3:** Not every topology has a finite minimal basis.

**Proof:** The standard topology on $\mathbb{R}$ has no finite basis at all. If $\mathcal{B} = \{B_1, \ldots, B_n\}$ were a finite basis, each $B_i$ is an open set, hence a union of open intervals. But there exist open sets (like $(0, 1)$) that cannot be expressed as unions of finitely many fixed open sets. $\square$

## Summary

Key theorems and concepts:

1. **Basis Theorem:** Characterizes when a collection is a basis via B1 (coverage) and B2 (intersection property)
2. **Alternative Formulation:** $\mathcal{T} = \{U : \forall x \in U, \exists B \in \mathcal{B}, x \in B \subseteq U\}$
3. **Refinement:** Finer bases give finer topologies (or the same topology)
4. **Same Topology:** Two bases generate the same topology iff each refines the other
5. **Second-Countable:** Spaces with countable bases (important for analysis)
6. **Non-Uniqueness:** Topologies can have many different bases

The basis theorem is fundamental for constructing and analyzing topologies efficiently. Rather than specifying all open sets, we need only specify a basis satisfying two simple conditions.
