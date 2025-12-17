---
title: "Normal Subgroups"
description: "Introduction to normal subgroups and their fundamental properties"
---

# Normal Subgroups

## Definition

**Definition**: A subgroup $N$ of $G$ is **normal** (denoted $N \triangleleft G$) if for all $g \in G$:
$$gN = Ng$$

Equivalently: left cosets equal right cosets.

**Alternative definition**: $gNg^{-1} = N$ for all $g \in G$.

## Examples

### Example 1: Abelian Groups

In any abelian group, every subgroup is normal.

**Proof**: $gN = Ng$ since $gn = ng$ for all $n \in N$. $\square$

### Example 2: $A_n \triangleleft S_n$

The alternating group is normal in the symmetric group.

**Proof**: $A_n$ is the kernel of $\text{sgn}: S_n \to \{-1, +1\}$. Kernels are always normal. $\square$

### Example 3: Center

$Z(G) \triangleleft G$ always.

**Proof**: For $z \in Z(G)$ and $g \in G$: $gzg^{-1} = z$ (since $z$ commutes with $g$). $\square$

## Non-Examples

### Non-Example 1

$H = \{e, (1\,2)\} \leq S_3$ is NOT normal.

**Check**: $(1\,3)H = \{(1\,3), (1\,2\,3)\}$ but $H(1\,3) = \{(1\,3), (1\,3\,2)\}$.

Since $(1\,2\,3) \neq (1\,3\,2)$, we have $(1\,3)H \neq H(1\,3)$. ✗

## Conjugation Test

**Theorem**: $N \triangleleft G$ iff $gNg^{-1} \subseteq N$ for all $g \in G$.

In fact, $gNg^{-1} = N$ (conjugation is an automorphism).

**Proof**: $gN = Ng \Leftrightarrow gNg^{-1} = N$. $\square$

### Example 4

Check if $V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\} \triangleleft A_4$:

For any $\sigma \in A_4$ and $v \in V_4$, compute $\sigma v \sigma^{-1}$. All such conjugates remain in $V_4$, so $V_4 \triangleleft A_4$. ✓

## Properties

**Theorem 1**: If $[G:N] = 2$, then $N \triangleleft G$.

**Proof**: Only two cosets: $N$ and $G \setminus N$. For any $g \notin N$: $gN = G \setminus N = Ng$. $\square$

**Example**: $A_n \triangleleft S_n$ (index 2).

**Theorem 2**: Intersection of normal subgroups is normal.

**Proof**: If $M, N \triangleleft G$, then for any $g \in G$:
$$g(M \cap N)g^{-1} = gMg^{-1} \cap gNg^{-1} = M \cap N$$
$\square$

## Normal Subgroup Criterion

**Theorem**: $N \triangleleft G$ iff $N$ is a union of conjugacy classes.

**Proof**: $gng^{-1} \in N$ for all $g$ iff $N$ contains complete conjugacy classes of its elements. $\square$

## Simple Groups

**Definition**: A group is **simple** if it has no proper nontrivial normal subgroups.

**Examples**:
- $\mathbb{Z}_p$ (prime order)
- $A_n$ for $n \geq 5$

**Non-examples**:
- Any abelian non-prime-order group (all subgroups normal)
- $S_n$ for $n \geq 3$ (contains $A_n$)

## Summary

- Normal subgroups: $gN = Ng$ for all $g$
- Equivalent to $gNg^{-1} = N$
- All subgroups normal in abelian groups
- Index 2 subgroups always normal
- Foundation for quotient groups

Normal subgroups are crucial for constructing quotient groups.
