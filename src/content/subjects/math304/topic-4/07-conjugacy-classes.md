---
title: "Conjugacy Classes"
description: "Conjugation, conjugacy classes, and their applications"
---

# Conjugacy Classes

## Conjugation

**Definition**: Elements $a, b \in G$ are **conjugate** if there exists $g \in G$ such that:
$$b = gag^{-1}$$

Write $a \sim b$ for conjugacy.

**Interpretation**: Conjugate elements are "the same" from different viewpoints.

## Conjugacy as Equivalence Relation

**Theorem**: Conjugacy is an equivalence relation.

**Proof**:
- **Reflexive**: $a = eae^{-1}$ ✓
- **Symmetric**: If $b = gag^{-1}$, then $a = g^{-1}bg$ ✓
- **Transitive**: If $b = g_1ag_1^{-1}$ and $c = g_2bg_2^{-1}$, then $c = (g_2g_1)a(g_2g_1)^{-1}$ ✓

$\square$

## Conjugacy Classes

**Definition**: The **conjugacy class** of $a \in G$ is:
$$\text{cl}(a) = \{gag^{-1} : g \in G\}$$

Conjugacy classes partition $G$ into disjoint subsets.

### Example 1: $S_3$

Conjugacy classes:
- $\{e\}$ (identity alone)
- $\{(1\,2), (1\,3), (2\,3)\}$ (all transpositions)
- $\{(1\,2\,3), (1\,3\,2)\}$ (all 3-cycles)

Elements with same cycle type are conjugate!

### Example 2: Abelian Groups

In abelian groups: $gag^{-1} = a$ for all $g$.

So each conjugacy class is a singleton: $\text{cl}(a) = \{a\}$.

## Cycle Type and Conjugacy in $S_n$

**Theorem**: Two permutations in $S_n$ are conjugate iff they have the same cycle type.

**Example**: In $S_5$:
- All 5-cycles are conjugate (one class)
- All products $(2\text{-cycle}) \times (3\text{-cycle})$ are conjugate

## Size of Conjugacy Classes

**Definition**: The **centralizer** of $a$ is:
$$C(a) = \{g \in G : ga = ag\}$$

**Theorem (Class Equation)**:
$$|\text{cl}(a)| = [G : C(a)] = \frac{|G|}{|C(a)|}$$

**Proof**: Conjugacy class size equals number of distinct conjugates, which equals number of cosets of centralizer. $\square$

### Example 3

In $S_3$, for $a = (1\,2)$:
- $C(a) = \{e, (1\,2)\}$ (elements commuting with $(1\,2)$)
- $|C(a)| = 2$
- $|\text{cl}(a)| = 6/2 = 3$ ✓ (three transpositions)

## Class Equation of a Group

**Theorem**: Let $g_1, \ldots, g_k$ be representatives of distinct non-central conjugacy classes. Then:
$$|G| = |Z(G)| + \sum_{i=1}^k [G : C(g_i)]$$

**Proof**: Partition $G$ into center (1-element classes) and non-central classes. $\square$

### Example 4: $S_3$

$Z(S_3) = \{e\}$ (only identity commutes with all).

Classes: $\{e\}$, $\{(1\,2), (1\,3), (2\,3)\}$, $\{(1\,2\,3), (1\,3\,2)\}$

Sizes: 1, 3, 2

Class equation: $6 = 1 + 3 + 2$ ✓

## Applications

### Application 1: Groups of Prime Power Order

If $|G| = p^n$, the class equation modulo $p$ shows $|Z(G)| \equiv 0 \pmod{p}$.

Thus $Z(G) \neq \{e\}$ for $p$-groups.

### Application 2: Determining Normal Subgroups

$N \triangleleft G$ iff $N$ is a union of conjugacy classes.

### Application 3: Counting in $S_n$

Number of permutations of given cycle type determined by conjugacy class sizes.

## Conjugacy in Specific Groups

### In $D_n$

Conjugacy classes group by type: rotations and reflections.

### In Matrix Groups

Conjugate matrices have same characteristic polynomial (similar matrices).

## Summary

- Conjugate: $b = gag^{-1}$
- Conjugacy classes partition $G$
- In $S_n$: cycle type determines class
- Class equation: $|G| = |Z(G)| + \sum [G:C(g_i)]$
- Tool for studying group structure

Conjugacy classes are fundamental for understanding symmetry and normal subgroups.
