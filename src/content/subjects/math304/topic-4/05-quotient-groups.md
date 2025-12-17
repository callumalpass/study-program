---
title: "Quotient Groups"
description: "Construction and properties of quotient groups (factor groups)"
---

# Quotient Groups

## Definition

**Definition**: If $N \triangleleft G$, the **quotient group** (or **factor group**) $G/N$ is the set of cosets of $N$ with operation:
$$(aN)(bN) = (ab)N$$

**Requirement**: $N$ must be normal for this operation to be well-defined.

## Well-Definedness

**Theorem**: The coset multiplication is well-defined iff $N \triangleleft G$.

**Proof**: Need $(a_1N)(b_1N) = (a_2N)(b_2N)$ when $a_1N = a_2N$ and $b_1N = b_2N$.

This holds iff $N$ is normal. $\square$

## Basic Examples

### Example 1: $\mathbb{Z}/n\mathbb{Z}$

Cosets: $\{0 + n\mathbb{Z}, 1 + n\mathbb{Z}, \ldots, (n-1) + n\mathbb{Z}\}$

Operation: $(a + n\mathbb{Z}) + (b + n\mathbb{Z}) = (a+b) + n\mathbb{Z}$

This is $\mathbb{Z}_n$ (integers modulo $n$)!

### Example 2: $S_3/A_3$

$A_3 = \{e, (1\,2\,3), (1\,3\,2)\}$

Cosets: $A_3$ and $(1\,2)A_3 = \{(1\,2), (1\,3), (2\,3)\}$

$S_3/A_3 = \{A_3, (1\,2)A_3\} \cong \mathbb{Z}_2$

### Example 3: $\mathbb{R}/\mathbb{Z}$

Identifies integers: $[x] = [y]$ iff $x - y \in \mathbb{Z}$.

Geometrically: circle group $S^1$.

## Properties of Quotient Groups

**Theorem 1**: If $N \triangleleft G$, then $G/N$ is a group.

**Proof**: Verify group axioms:
- Closure: $(aN)(bN) = abN \in G/N$ ✓
- Associativity: Inherited from $G$ ✓
- Identity: $eN = N$ ✓
- Inverses: $(aN)^{-1} = a^{-1}N$ ✓

$\square$

**Order**: $|G/N| = [G:N] = |G|/|N|$ (for finite groups).

## Natural Projection

**Definition**: The **natural projection** $\pi: G \to G/N$ is $\pi(g) = gN$.

**Properties**:
- Homomorphism: $\pi(ab) = (ab)N = (aN)(bN) = \pi(a)\pi(b)$
- Surjective
- Kernel: $\ker(\pi) = N$

## Isomorphism Theorems Preview

**First Isomorphism Theorem**: $G/\ker(\phi) \cong \text{Im}(\phi)$ for any homomorphism $\phi$.

(Covered in detail in homomorphisms section)

## Computing in Quotient Groups

### Example 4: $\mathbb{Z}_{12}/\langle 4 \rangle$

$\langle 4 \rangle = \{0, 4, 8\}$ has order 3.

Quotient has order $12/3 = 4$.

Cosets: $\{0, 4, 8\}, \{1, 5, 9\}, \{2, 6, 10\}, \{3, 7, 11\}$

$\mathbb{Z}_{12}/\langle 4 \rangle \cong \mathbb{Z}_4$

## Applications

**Simplification**: Quotient groups "collapse" normal subgroup to identity, simplifying structure.

**Classification**: Understanding groups via normal subgroups and quotients.

**Modular Arithmetic**: $\mathbb{Z}/n\mathbb{Z} = \mathbb{Z}_n$

## Summary

- Quotient $G/N$ defined when $N \triangleleft G$
- Elements are cosets of $N$
- Operation: $(aN)(bN) = abN$
- $|G/N| = |G|/|N|$
- Natural projection $\pi: G \to G/N$

Quotient groups are fundamental for understanding group structure and homomorphisms.
