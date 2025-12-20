---
title: "Conjugacy Classes"
description: "Conjugation, conjugacy classes, and their applications"
---

# Conjugacy Classes

## Conjugation

**Definition**: Elements $a, b \in G$ are **conjugate** if there exists $g \in G$ such that:
$$b = gag^{-1}$$

We write $a \sim b$ to denote that $a$ and $b$ are conjugate.

**Interpretation**: Conjugate elements represent "the same" algebraic structure from different viewpoints or coordinate systems. In geometric groups, conjugation corresponds to changing perspective while preserving the essential nature of the transformation.

The operation of conjugation can be thought of as a change of basis or coordinate system. When we conjugate $a$ by $g$, we're asking "what does $a$ look like from the perspective of $g$?" This geometric intuition is particularly clear in matrix groups, where conjugate matrices represent the same linear transformation in different bases.

## Conjugacy as Equivalence Relation

**Theorem**: Conjugacy is an equivalence relation on $G$.

**Proof**:
We must verify three properties:

- **Reflexive**: For any $a \in G$, is $a \sim a$?

  Yes: $a = eae^{-1}$, so $a$ is conjugate to itself. ✓

- **Symmetric**: If $a \sim b$, is $b \sim a$?

  Suppose $b = gag^{-1}$ for some $g \in G$. Multiply on the left by $g^{-1}$ and on the right by $g$:
  $$g^{-1}b = g^{-1}(gag^{-1}) = (g^{-1}g)a(g^{-1}g) = a$$
  So $a = g^{-1}bg = g^{-1}b(g^{-1})^{-1}$, showing $a$ is conjugate to $b$. ✓

- **Transitive**: If $a \sim b$ and $b \sim c$, is $a \sim c$?

  Suppose $b = g_1ag_1^{-1}$ and $c = g_2bg_2^{-1}$. Then:
  $$c = g_2bg_2^{-1} = g_2(g_1ag_1^{-1})g_2^{-1} = (g_2g_1)a(g_1^{-1}g_2^{-1}) = (g_2g_1)a(g_2g_1)^{-1}$$
  So $c$ is conjugate to $a$ via the element $g_2g_1$. ✓

Since conjugacy is reflexive, symmetric, and transitive, it is an equivalence relation. $\square$

**Consequence**: As an equivalence relation, conjugacy partitions the group $G$ into disjoint equivalence classes called conjugacy classes.

## Conjugacy Classes

**Definition**: The **conjugacy class** of $a \in G$ is:
$$\text{cl}(a) = \{gag^{-1} : g \in G\}$$

This is the set of all elements conjugate to $a$.

**Properties**:
1. Conjugacy classes partition $G$ (disjoint union)
2. $|G| = \sum |\text{cl}(a_i)|$ where $a_i$ are representatives from each class
3. Elements in the center have singleton conjugacy classes
4. In abelian groups, every conjugacy class is a singleton

### Example 1: $S_3$

Let's compute all conjugacy classes in $S_3$:

**Class 1**: $\text{cl}(e) = \{e\}$ (identity always alone)

**Class 2**: Transpositions
- $(1\,2), (1\,3), (2\,3)$ are all conjugate
- $\text{cl}((1\,2)) = \{(1\,2), (1\,3), (2\,3)\}$

**Class 3**: 3-cycles
- $(1\,2\,3), (1\,3\,2)$ are conjugate
- $\text{cl}((1\,2\,3)) = \{(1\,2\,3), (1\,3\,2)\}$

**Verification**: $1 + 3 + 2 = 6 = |S_3|$ ✓

**Key Observation**: Elements with the same cycle type are conjugate in $S_n$! This is a fundamental result.

### Example 2: Abelian Groups

In any abelian group $G$, for all $a, g \in G$:
$$gag^{-1} = gg^{-1}a = ea = a$$

So $\text{cl}(a) = \{a\}$ for all $a$.

**Conclusion**: Every element forms its own conjugacy class (singleton). This is characteristic of abelian groups.

Conversely, if every conjugacy class is a singleton, then $gag^{-1} = a$ for all $g, a$, which means $ga = ag$ for all $g, a$, proving $G$ is abelian.

**Important**: A group is abelian if and only if all conjugacy classes are singletons.

## Cycle Type and Conjugacy in $S_n$

**Theorem**: Two permutations in $S_n$ are conjugate if and only if they have the same cycle type.

**Proof Sketch**:
- If $\sigma$ and $\tau$ have the same cycle type, we can construct an explicit $g \in S_n$ with $\tau = g\sigma g^{-1}$
- Conversely, conjugate permutations preserve cycle structure

**Example**: In $S_5$:
- All 5-cycles form one conjugacy class (24 elements)
- All products $(2\text{-cycle}) \times (3\text{-cycle})$ form one class (20 elements)
- All products of two disjoint 2-cycles form one class (15 elements)
- etc.

**Application**: This makes counting and classifying permutations much easier - we only need to consider cycle types!

**Cycle Types in $S_4$**:
- $(4)$: four-cycles like $(1\,2\,3\,4)$ - one class of size 6
- $(3,1)$: three-cycles like $(1\,2\,3)$ - one class of size 8
- $(2,2)$: products of disjoint transpositions like $(1\,2)(3\,4)$ - one class of size 3
- $(2,1,1)$: single transpositions like $(1\,2)$ - one class of size 6
- $(1,1,1,1)$: identity - one class of size 1

Total: $6 + 8 + 3 + 6 + 1 = 24 = |S_4|$ ✓

## Size of Conjugacy Classes

**Definition**: The **centralizer** of $a$ is:
$$C(a) = C_G(a) = \{g \in G : ga = ag\} = \{g \in G : gag^{-1} = a\}$$

The centralizer consists of all elements that commute with $a$.

**Properties**:
- $C(a)$ is always a subgroup of $G$
- $a \in C(a)$ (since $a$ commutes with itself)
- The larger $C(a)$, the "more symmetric" $a$ is

**Theorem (Class Equation for Elements)**:
$$|\text{cl}(a)| = [G : C(a)] = \frac{|G|}{|C(a)|}$$

**Proof**: Define a map $\phi: G \to \text{cl}(a)$ by $\phi(g) = gag^{-1}$.

**Claim**: $\phi(g_1) = \phi(g_2)$ if and only if $g_1$ and $g_2$ are in the same left coset of $C(a)$.

- If $g_1ag_1^{-1} = g_2ag_2^{-1}$, then $g_2^{-1}g_1 a = a g_2^{-1}g_1$, so $g_2^{-1}g_1 \in C(a)$, meaning $g_1 \in g_2C(a)$
- Conversely, if $g_1 \in g_2C(a)$, then $g_1 = g_2c$ for some $c \in C(a)$, so:
  $$g_1ag_1^{-1} = g_2cac^{-1}g_2^{-1} = g_2ag_2^{-1}$$

Therefore, the number of distinct values of $\phi$ equals the number of cosets of $C(a)$ in $G$, which is $[G:C(a)]$. Since $\phi$ is surjective onto $\text{cl}(a)$, we have $|\text{cl}(a)| = [G:C(a)] = |G|/|C(a)|$. $\square$

**Consequence**: The size of a conjugacy class divides the order of the group (by Lagrange's Theorem applied to the centralizer).

### Example 3

In $S_3$, for $a = (1\,2)$:

Elements commuting with $(1\,2)$:
- $e$ commutes with everything
- $(1\,2)$ commutes with itself
- $(1\,3)$ does NOT commute: $(1\,3)(1\,2) = (1\,2\,3) \neq (1\,3\,2) = (1\,2)(1\,3)$
- $(2\,3)$ does NOT commute (similar check)
- $(1\,2\,3)$ does NOT commute
- $(1\,3\,2)$ does NOT commute

So $C((1\,2)) = \{e, (1\,2)\}$ and $|C((1\,2))| = 2$.

Therefore: $|\text{cl}((1\,2))| = |S_3|/|C((1\,2))| = 6/2 = 3$ ✓

Indeed, $\text{cl}((1\,2)) = \{(1\,2), (1\,3), (2\,3)\}$ has size 3.

## Class Equation of a Group

**Definition**: The **center** of $G$ is:
$$Z(G) = \{z \in G : zg = gz \text{ for all } g \in G\}$$

Elements in the center commute with everything, so they have singleton conjugacy classes.

**Theorem (Class Equation)**: Let $z_1, \ldots, z_k$ be the elements of $Z(G)$, and let $g_1, \ldots, g_m$ be representatives of the non-central conjugacy classes. Then:
$$|G| = |Z(G)| + \sum_{i=1}^m [G : C(g_i)]$$

**Proof**: Partition $G$ into conjugacy classes. Elements in $Z(G)$ each form singleton classes (contributing $|Z(G)|$ to the sum). Non-central elements form classes of size $> 1$, and by the theorem above, each class has size $[G:C(g_i)]$. $\square$

This equation is powerful for analyzing group structure, especially for $p$-groups.

### Example 4: $S_3$

$Z(S_3) = \{e\}$ (only the identity commutes with all elements).

Conjugacy classes: $\{e\}$, $\{(1\,2), (1\,3), (2\,3)\}$, $\{(1\,2\,3), (1\,3\,2)\}$

Sizes: 1, 3, 2

Class equation: $|S_3| = 1 + 3 + 2 = 6$ ✓

### Example 5: Abelian Groups

For any abelian group $G$: $Z(G) = G$ and all conjugacy classes are singletons.

Class equation: $|G| = |G|$ (sum of $|G|$ singletons)

## Applications

### Application 1: Groups of Prime Power Order

**Theorem**: If $|G| = p^n$ for prime $p$ and $n \geq 1$, then $|Z(G)| > 1$ (the center is non-trivial).

**Proof**: Write the class equation:
$$p^n = |G| = |Z(G)| + \sum_{i=1}^m [G : C(g_i)]$$

For non-central $g_i$, we have $C(g_i) \neq G$, so $[G:C(g_i)] > 1$. Also, $[G:C(g_i)]$ divides $|G| = p^n$, so $[G:C(g_i)] = p^{k_i}$ for some $k_i \geq 1$.

Taking the equation modulo $p$:
$$0 \equiv |Z(G)| + \sum_{i=1}^m p^{k_i} \equiv |Z(G)| \pmod{p}$$

So $p | |Z(G)|$. Since $|Z(G)| \geq 1$ (contains identity) and is divisible by $p$, we have $|Z(G)| \geq p > 1$. $\square$

**Consequence**: Every group of order $p^2$ has a non-trivial center, and one can show such groups are abelian.

### Application 2: Determining Normal Subgroups

**Theorem**: A subgroup $N \leq G$ is normal if and only if $N$ is a union of conjugacy classes.

**Proof**:
- ($\Rightarrow$) If $N \triangleleft G$ and $a \in N$, then $gag^{-1} \in N$ for all $g \in G$, so $\text{cl}(a) \subseteq N$
- ($\Leftarrow$) If $N$ is a union of classes and $a \in N$, then $\text{cl}(a) \subseteq N$, so $gag^{-1} \in N$ for all $g$

$\square$

**Application**: To find normal subgroups, we look for unions of conjugacy classes (including the identity) whose sizes sum to a divisor of $|G|$.

### Application 3: Counting in $S_n$

The number of permutations of a given cycle type equals the size of the corresponding conjugacy class.

**Example**: In $S_5$, how many permutations have cycle type $(3, 2)$ (one 3-cycle and one disjoint 2-cycle)?

Answer: The conjugacy class size is $\frac{5!}{3 \cdot 2 \cdot 1} = \frac{120}{6} = 20$.

(The formula involves counting ordered selections divided by symmetries.)

## Conjugacy in Specific Groups

### In Dihedral Groups

$D_n$ has conjugacy classes grouping rotations and reflections by their geometric properties.

For $D_4$ (symmetries of a square):
- Rotations: $\{e\}$, $\{r, r^3\}$, $\{r^2\}$
- Reflections: two classes based on axis type

The structure of conjugacy classes reflects the geometry!

### In Matrix Groups

**Theorem**: In $GL_n(\mathbb{F})$ or $SL_n(\mathbb{F})$, matrices $A$ and $B$ are conjugate if and only if they are similar (i.e., represent the same linear transformation in different bases).

Conjugate matrices have:
- Same characteristic polynomial
- Same eigenvalues (with multiplicities)
- Same trace and determinant

**Example**: In $GL_2(\mathbb{R})$, the matrices $\begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$ and $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$ are NOT conjugate (different eigenvalue structures).

### In $A_5$

The conjugacy classes of $A_5$ (which we used to prove simplicity):
- Identity: 1 element
- 3-cycles: 20 elements
- Products of disjoint transpositions: 15 elements
- 5-cycles (type 1): 12 elements
- 5-cycles (type 2): 12 elements

Total: $1 + 20 + 15 + 12 + 12 = 60 = |A_5|$ ✓

## Computing Conjugacy Classes

**Algorithm** for finite groups:
1. Start with identity class: $\{e\}$
2. Pick an element $a$ not yet classified
3. Compute $C(a)$ (centralizer)
4. Compute $|\text{cl}(a)| = |G|/|C(a)|$
5. Generate conjugacy class by computing $gag^{-1}$ for various $g$
6. Repeat until all elements are classified

**For permutations**: Simply group by cycle type!

## Summary

- Conjugate elements: $b = gag^{-1}$ (same structure, different viewpoint)
- Conjugacy is an equivalence relation, partitioning $G$ into conjugacy classes
- In $S_n$: conjugacy $\Leftrightarrow$ same cycle type
- Class size formula: $|\text{cl}(a)| = |G|/|C(a)|$
- Class equation: $|G| = |Z(G)| + \sum [G:C(g_i)]$
- Normal subgroups are unions of conjugacy classes
- For $p$-groups: class equation (mod $p$) shows $Z(G)$ is non-trivial

Conjugacy classes are a fundamental tool for understanding group structure, computing normal subgroups, and analyzing symmetry.

## Key Takeaways

- Conjugation represents a "change of perspective" - conjugate elements are structurally identical
- Conjugacy is an equivalence relation that partitions any group into disjoint conjugacy classes
- In $S_n$, conjugacy corresponds exactly to having the same cycle type
- The size of a conjugacy class equals the index of the centralizer: $|\text{cl}(a)| = [G:C(a)]$
- The class equation $|G| = |Z(G)| + \sum [G:C(g_i)]$ is essential for analyzing $p$-groups
- Normal subgroups are precisely those subgroups that are unions of conjugacy classes
- In abelian groups, every conjugacy class is a singleton (and conversely)
- Groups of order $p^n$ have non-trivial centers (proven via the class equation)
- Conjugacy classes provide a powerful organizational tool for understanding group structure and computing important subgroups
