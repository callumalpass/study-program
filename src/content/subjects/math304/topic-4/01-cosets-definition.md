---
title: "Cosets Definition"
description: "Introduction to left and right cosets and their properties"
---

# Cosets Definition

## Motivation

Cosets partition a group into equal-sized pieces, generalizing modular arithmetic and providing the foundation for quotient groups.

## Left Cosets

**Definition**: Let $H \leq G$ and $g \in G$. The **left coset** of $H$ containing $g$ is:
$$gH = \{gh : h \in H\}$$

### Example 1: $\mathbb{Z}$ and $3\mathbb{Z}$

$H = 3\mathbb{Z} = \{\ldots, -6, -3, 0, 3, 6, \ldots\}$

Left cosets:
- $0 + 3\mathbb{Z} = 3\mathbb{Z} = \{\ldots, -6, -3, 0, 3, 6, \ldots\}$
- $1 + 3\mathbb{Z} = \{\ldots, -5, -2, 1, 4, 7, \ldots\}$
- $2 + 3\mathbb{Z} = \{\ldots, -4, -1, 2, 5, 8, \ldots\}$

These are the residue classes modulo 3!

### Example 2: $S_3$ and $H = \{e, (1\,2)\}$

Left cosets:
- $eH = H = \{e, (1\,2)\}$
- $(1\,3)H = \{(1\,3), (1\,3)(1\,2)\} = \{(1\,3), (1\,2\,3)\}$
- $(2\,3)H = \{(2\,3), (2\,3)(1\,2)\} = \{(2\,3), (1\,3\,2)\}$

## Right Cosets

**Definition**: The **right coset** of $H$ containing $g$ is:
$$Hg = \{hg : h \in H\}$$

### Example 3

In $S_3$ with $H = \{e, (1\,2)\}$:

Right cosets:
- $He = H = \{e, (1\,2)\}$
- $H(1\,3) = \{(1\,3), (1\,2)(1\,3)\} = \{(1\,3), (1\,3\,2)\}$
- $H(2\,3) = \{(2\,3), (1\,2)(2\,3)\} = \{(2\,3), (1\,2\,3)\}$

Notice: $(1\,3)H \neq H(1\,3)$ in general!

## Properties of Cosets

**Theorem 1**: Let $H \leq G$. For any $a, b \in G$:
1. $aH = bH$ if and only if $a^{-1}b \in H$
2. $aH = H$ if and only if $a \in H$
3. $|aH| = |H|$ for all $a \in G$
4. Either $aH = bH$ or $aH \cap bH = \emptyset$

**Proof of (1)**:
($\Rightarrow$) If $aH = bH$, then $a \in aH = bH$, so $a = bh$ for some $h \in H$. Thus $a^{-1}b = h^{-1} \in H$.

($\Leftarrow$) If $a^{-1}b \in H$, write $a^{-1}b = h$. Then $b = ah$. For any $bh' \in bH$:
$$bh' = (ah)h' = a(hh') \in aH$$
Similarly $aH \subseteq bH$, so $aH = bH$. $\square$

**Proof of (3)**: The map $\phi: H \to aH$ defined by $\phi(h) = ah$ is bijective:
- Injective: If $ah_1 = ah_2$, then $h_1 = h_2$ (cancellation)
- Surjective: Every element of $aH$ has form $ah$

Therefore $|aH| = |H|$. $\square$

## Partition Property

**Theorem 2**: The left cosets of $H$ in $G$ partition $G$ into disjoint subsets of equal size.

**Proof**: Every $g \in G$ belongs to $gH$. If $gH \cap g'H \neq \emptyset$, then some element $x \in gH \cap g'H$, so $x = gh_1 = g'h_2$, giving $g^{-1}g' \in H$, hence $gH = g'H$ by Theorem 1. $\square$

**Example**: $\mathbb{Z}/3\mathbb{Z}$ partitions into $\{0+3\mathbb{Z}, 1+3\mathbb{Z}, 2+3\mathbb{Z}\}$.

## Number of Cosets

**Definition**: The **index** of $H$ in $G$, denoted $[G:H]$, is the number of distinct left cosets of $H$ in $G$.

### Example 4

$[S_3 : H] = 3$ where $H = \{e, (1\,2)\}$ (three left cosets).

$[\mathbb{Z} : n\mathbb{Z}] = n$ for any positive integer $n$.

## Coset Representatives

A **coset representative** is any element from a coset.

For $aH$, the element $a$ is a representative. But $aH = a'H$ for any $a' \in aH$, so representatives are not unique.

**Complete set of representatives**: One element from each distinct coset.

### Example 5

For $\mathbb{Z}/5\mathbb{Z}$, a complete set of representatives is $\{0, 1, 2, 3, 4\}$.

Another choice: $\{5, 6, 7, 8, 9\}$ also works.

## Coset Equality

**Testing equality**: $aH = bH \Leftrightarrow b^{-1}a \in H \Leftrightarrow a \in bH \Leftrightarrow b \in aH$.

### Example 6

In $S_3$ with $H = \{e, (1\,2)\}$:
Does $(1\,3)H = (1\,2\,3)H$?

Check: $(1\,2\,3)^{-1}(1\,3) = (1\,3\,2)(1\,3) = (1\,2) \in H$ ✓

Therefore yes, $(1\,3)H = (1\,2\,3)H$.

## Left vs Right Cosets

In general, $aH \neq Ha$. The sets of left and right cosets may differ!

**Lemma**: There is a bijection between left and right cosets: $aH \leftrightarrow Ha^{-1}$.

**Proof**: Map $aH \to Ha^{-1}$. This is bijective since $(aH)^{-1} = Ha^{-1}$. $\square$

**Consequence**: Number of left cosets = number of right cosets (both equal $[G:H]$).

## Summary

- Coset $gH = \{gh : h \in H\}$ shifts $H$ by $g$
- Cosets partition $G$ into equal-sized pieces
- $|gH| = |H|$ always
- $[G:H]$ counts distinct cosets
- Left and right cosets may differ

Cosets provide the foundation for Lagrange's theorem and quotient groups.
