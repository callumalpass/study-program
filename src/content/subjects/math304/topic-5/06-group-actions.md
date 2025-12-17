---
title: "Group Actions"
description: "Introduction to group actions and their fundamental properties"
---

# Group Actions

## Introduction

Group actions provide a powerful framework for studying symmetry by describing how groups "act on" or "transform" sets. This concept bridges abstract group theory with concrete geometric and combinatorial applications, allowing us to use group-theoretic tools to solve problems about symmetries of objects.

## Definition

**Definition**: A **group action** of a group $G$ on a set $X$ is a function
$$\cdot: G \times X \to X$$
written as $(g, x) \mapsto g \cdot x$, satisfying:

1. **Identity**: $e \cdot x = x$ for all $x \in X$
2. **Compatibility**: $(gh) \cdot x = g \cdot (h \cdot x)$ for all $g, h \in G$ and $x \in X$

We say "$G$ acts on $X$" or "$X$ is a $G$-set."

**Alternative formulation**: A group action is equivalent to a homomorphism $\phi: G \to \text{Sym}(X)$ where $\text{Sym}(X)$ is the group of all bijections $X \to X$.

The correspondence is: $\phi(g)(x) = g \cdot x$.

## Fundamental Examples

### Example 1: Left Multiplication

$G$ acts on itself by left multiplication: $g \cdot h = gh$.

**Verification**:
- $e \cdot h = eh = h$ ✓
- $(g_1 g_2) \cdot h = (g_1 g_2)h = g_1(g_2 h) = g_1 \cdot (g_2 \cdot h)$ ✓

### Example 2: Conjugation

$G$ acts on itself by conjugation: $g \cdot h = ghg^{-1}$.

**Verification**:
- $e \cdot h = ehe^{-1} = h$ ✓
- $(g_1 g_2) \cdot h = (g_1 g_2)h(g_1 g_2)^{-1} = g_1(g_2 h g_2^{-1})g_1^{-1} = g_1 \cdot (g_2 \cdot h)$ ✓

### Example 3: Symmetric Group on Sets

$S_n$ acts on $\{1, 2, \ldots, n\}$ by permuting elements: $\sigma \cdot i = \sigma(i)$.

More generally, for any set $X$ with $n$ elements, $S_n$ acts on $X$.

### Example 4: Dihedral Group on Polygon

$D_n$ (symmetries of regular $n$-gon) acts on the set of vertices by physical transformations.

For a square with vertices labeled 1, 2, 3, 4:
- Rotation $r$ by $90°$: $r \cdot 1 = 2$, $r \cdot 2 = 3$, $r \cdot 3 = 4$, $r \cdot 4 = 1$
- Reflection $s$: depends on axis of reflection

### Example 5: Matrix Groups on Vector Spaces

$GL_n(\mathbb{R})$ acts on $\mathbb{R}^n$ by matrix-vector multiplication: $A \cdot \vec{v} = A\vec{v}$.

**Verification**:
- $I \cdot \vec{v} = I\vec{v} = \vec{v}$ ✓
- $(AB) \cdot \vec{v} = (AB)\vec{v} = A(B\vec{v}) = A \cdot (B \cdot \vec{v})$ ✓

### Example 6: Automorphism Group

$\text{Aut}(G)$ acts on $G$ by function application: $\phi \cdot g = \phi(g)$.

### Example 7: Group Acting on Cosets

Let $H \leq G$. Then $G$ acts on the set of left cosets $G/H$ by left multiplication:
$$g \cdot (aH) = (ga)H$$

This action is transitive (see below).

## Orbits

**Definition**: The **orbit** of $x \in X$ under the action of $G$ is:
$$G \cdot x = \{g \cdot x : g \in G\} = \{\text{all images of } x\}$$

**Theorem 1**: The orbits partition $X$ into disjoint equivalence classes.

**Proof**: Define relation $x \sim y$ if $y = g \cdot x$ for some $g \in G$.

**Reflexive**: $x = e \cdot x$, so $x \sim x$. ✓

**Symmetric**: If $y = g \cdot x$, then $x = g^{-1} \cdot y$, so $y \sim x \Rightarrow x \sim y$. ✓

**Transitive**: If $y = g \cdot x$ and $z = h \cdot y$, then $z = h \cdot (g \cdot x) = (hg) \cdot x$, so $x \sim y$ and $y \sim z \Rightarrow x \sim z$. ✓

The equivalence classes are precisely the orbits. $\square$

### Examples of Orbits

**Example 8**: $S_3$ acting on $\{1, 2, 3\}$ has one orbit: the entire set. Any element can be moved to any other by some permutation.

**Example 9**: $\mathbb{Z}$ acting on $\mathbb{R}$ by translation ($n \cdot x = x + n$) has infinitely many orbits. Each orbit is $\{x + n : n \in \mathbb{Z}\}$ for some $x \in [0, 1)$.

**Example 10**: Conjugation action of $G$ on itself. Orbits are the **conjugacy classes**:
$$\text{cl}(g) = \{hgh^{-1} : h \in G\}$$

For abelian groups, each conjugacy class is a singleton.

For $S_3$: Conjugacy classes are $\{e\}$, $\{(1\,2), (1\,3), (2\,3)\}$, and $\{(1\,2\,3), (1\,3\,2)\}$.

## Stabilizers

**Definition**: The **stabilizer** of $x \in X$ is:
$$G_x = \text{Stab}(x) = \{g \in G : g \cdot x = x\}$$

The set of group elements that fix $x$.

**Theorem 2**: $G_x \leq G$ for all $x \in X$.

**Proof**: Subgroup test.
- Non-empty: $e \in G_x$ since $e \cdot x = x$ ✓
- Closure: If $g, h \in G_x$, then $(gh) \cdot x = g \cdot (h \cdot x) = g \cdot x = x$, so $gh \in G_x$ ✓
- Inverses: If $g \in G_x$, then $g \cdot x = x$, so $x = g^{-1} \cdot (g \cdot x) = g^{-1} \cdot x$, thus $g^{-1} \in G_x$ ✓

Therefore $G_x \leq G$. $\square$

### Examples of Stabilizers

**Example 11**: $S_4$ acting on $\{1, 2, 3, 4\}$:
$$G_1 = \{\sigma \in S_4 : \sigma(1) = 1\}$$

This consists of all permutations that fix 1, which is isomorphic to $S_3$ (permutations of $\{2, 3, 4\}$). So $|G_1| = 6$.

**Example 12**: $D_4$ (symmetries of square) acting on vertices $\{1, 2, 3, 4\}$:
$$G_1 = \{e, s_1\}$$

where $s_1$ is reflection through the diagonal passing through vertex 1. Thus $|G_1| = 2$.

**Example 13**: Conjugation action. The stabilizer of $g$ is:
$$G_g = \{h \in G : hgh^{-1} = g\} = \{h : gh = hg\} = C(g)$$

This is the **centralizer** of $g$.

## Types of Actions

### Transitive Actions

**Definition**: An action is **transitive** if there is only one orbit, i.e., for any $x, y \in X$, there exists $g \in G$ with $g \cdot x = y$.

**Examples**:
- $S_n$ on $\{1, \ldots, n\}$ is transitive
- $D_n$ on vertices of $n$-gon is transitive
- $G$ on $G/H$ (cosets) is transitive

**Non-example**: $D_4$ acting on edges of a square has two orbits (horizontal/vertical edges vs. diagonal edges... wait, that's wrong). Actually, all edges are equivalent under $D_4$, so it IS transitive on edges.

**Actual non-example**: Let $G = \{e, (1\,2)\} \leq S_3$ act on $\{1, 2, 3\}$. Orbits are $\{1, 2\}$ and $\{3\}$, so not transitive.

### Faithful Actions

**Definition**: An action is **faithful** if distinct group elements act differently, i.e., the associated homomorphism $\phi: G \to \text{Sym}(X)$ is injective.

Equivalently: $\{g \in G : g \cdot x = x \text{ for all } x \in X\} = \{e\}$.

**Examples**:
- $G$ acting on itself by left multiplication is faithful (Cayley's theorem)
- $S_n$ on $\{1, \ldots, n\}$ is faithful

**Non-example**: Trivial action $g \cdot x = x$ for all $g, x$ is not faithful (unless $|G| = 1$).

### Free Actions

**Definition**: An action is **free** if all non-identity elements have no fixed points, i.e., $g \cdot x \neq x$ for all $g \neq e$ and all $x \in X$.

Equivalently: all stabilizers are trivial.

**Examples**:
- $\mathbb{Z}$ acting on $\mathbb{R}$ by translation is free
- $\mathbb{Z}_n$ acting on itself by rotation (addition) is free

**Non-example**: Any action with a fixed point is not free.

## Fixed Points

**Definition**: For $g \in G$, the **fixed point set** is:
$$\text{Fix}(g) = \{x \in X : g \cdot x = x\}$$

**Relationship**: $x \in \text{Fix}(g) \Leftrightarrow g \in G_x$.

### Example 14: Rotations of Square

For $D_4$ acting on vertices of square:
- $\text{Fix}(e) = \{1, 2, 3, 4\}$ (all vertices)
- $\text{Fix}(r) = \emptyset$ (90° rotation has no fixed vertices)
- $\text{Fix}(r^2) = \emptyset$ (180° rotation)
- $\text{Fix}(s) = \{1, 3\}$ (reflection through diagonal)

## Cayley's Theorem

**Cayley's Theorem**: Every group $G$ is isomorphic to a subgroup of $\text{Sym}(G)$ (the symmetric group on the set $G$).

**Proof**: $G$ acts on itself by left multiplication. Define $\phi: G \to \text{Sym}(G)$ by $\phi(g)(h) = gh$.

**Homomorphism**: $\phi(g_1 g_2)(h) = (g_1 g_2)h = g_1(g_2 h) = \phi(g_1)(\phi(g_2)(h)) = (\phi(g_1) \circ \phi(g_2))(h)$. ✓

**Injective**: If $\phi(g) = \phi(e)$, then $gh = eh = h$ for all $h$, so $g = e$ (take $h = e$). Thus $\ker(\phi) = \{e\}$, so $\phi$ is injective. ✓

By the First Isomorphism Theorem, $G \cong \text{Im}(\phi) \leq \text{Sym}(G)$. $\square$

**Significance**: This shows every group can be realized as a group of permutations. Abstract groups are "just" groups of symmetries!

## Application: Counting with Symmetry

Group actions provide tools for counting objects up to symmetry (using Burnside's Lemma, covered in next section).

### Example 15: Colorings of Triangle

How many ways to color vertices of an equilateral triangle with 2 colors, up to rotation?

Without symmetry: $2^3 = 8$ colorings.

$D_3$ acts on colorings. Rotations identify certain colorings as "the same."

(Full solution uses Burnside's Lemma.)

## Summary

**Group Actions**:
- Formalize notion of groups acting on sets
- Two axioms: identity, compatibility
- Equivalent to homomorphism $G \to \text{Sym}(X)$

**Orbits**:
- $G \cdot x = \{g \cdot x : g \in G\}$
- Partition $X$ into equivalence classes
- Measure "reachability" under group action

**Stabilizers**:
- $G_x = \{g : g \cdot x = x\}$
- Always a subgroup
- Measure "symmetry" of point $x$

**Types**:
- Transitive: one orbit
- Faithful: no kernel
- Free: trivial stabilizers

**Key Examples**:
- Left multiplication, conjugation
- $S_n$ on sets, $D_n$ on polygons
- Matrix groups on vector spaces

Group actions bridge abstract algebra and concrete symmetry, providing a unified framework for studying transformations across mathematics.
