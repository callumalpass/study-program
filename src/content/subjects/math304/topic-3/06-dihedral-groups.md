---
title: "Dihedral Groups"
description: "Study of dihedral groups as symmetry groups of regular polygons"
---

# Dihedral Groups

## Definition

**Definition**: The **dihedral group** $D_n$ is the group of symmetries (rotations and reflections) of a regular $n$-gon.

**Order**: $|D_n| = 2n$

**Elements**:
- $n$ rotations (including identity)
- $n$ reflections

## Construction

For regular $n$-gon with vertices labeled $1, 2, \ldots, n$:

**Rotations**: $r^k$ for $k = 0, 1, \ldots, n-1$ where $r$ is counterclockwise rotation by $360°/n$.

**Reflections**: $n$ reflection axes through vertices or edge midpoints.

## $D_3$ - Symmetries of Equilateral Triangle

$|D_3| = 6$

**Rotations**:
- $r^0 = e$ (identity)
- $r^1 = r$ (120°)
- $r^2$ (240°)

**Reflections**: $f_1, f_2, f_3$ through each vertex and opposite edge midpoint.

**As permutations in $S_3$**:
- $r = (1\,2\,3)$
- $r^2 = (1\,3\,2)$
- $f_1 = (2\,3)$ (fixes vertex 1)
- $f_2 = (1\,3)$ (fixes vertex 2)
- $f_3 = (1\,2)$ (fixes vertex 3)

**Isomorphism**: $D_3 \cong S_3$

## $D_4$ - Symmetries of Square

$|D_4| = 8$

**Rotations**: $\{e, r, r^2, r^3\}$ where $r = 90°$

**Reflections**:
- Diagonal reflections: $d_1, d_2$
- Vertical/horizontal: $h, v$

**As permutations**: $D_4 \leq S_4$

**Subgroups**:
- Rotation subgroup: $\{e, r, r^2, r^3\} \cong \mathbb{Z}_4$
- Five order-2 subgroups (each reflection + identity)

## Presentation of $D_n$

**Generators**: Rotation $r$ and reflection $s$

**Relations**:
$$r^n = e, \quad s^2 = e, \quad srs = r^{-1}$$

**Presentation**: $D_n = \langle r, s \mid r^n = s^2 = e, srs = r^{-1} \rangle$

The third relation $srs = r^{-1}$ (equivalently $sr = r^{-1}s$) captures how reflections reverse rotation direction.

## Elements in General Form

Every element of $D_n$ has unique form:
$$r^k \quad \text{or} \quad sr^k$$
for $0 \leq k < n$.

**Proof**: Rotations and reflections account for all $2n$ symmetries. $\square$

## Multiplication Rules

From the relations:
- $r^i r^j = r^{i+j \bmod n}$
- $(sr^i)(sr^j) = r^{i-j}$ (product of two reflections is a rotation)
- $r^i(sr^j) = sr^{j-i}$
- $(sr^i)r^j = sr^{i+j}$

### Example: $D_4$

$(sr)(sr^2) = r^{1-2} = r^{-1} = r^3$

$(sr^2)(r^3) = sr^{2+3} = sr^5 = sr^1$

## Center of $D_n$

**Theorem**:
$$Z(D_n) = \begin{cases}
\{e\} & \text{if } n \text{ is odd} \\
\{e, r^{n/2}\} & \text{if } n \text{ is even}
\end{cases}$$

**Proof**: Element commutes with all others iff it commutes with generators $r$ and $s$. Check: $r^{n/2}$ is 180° rotation, commutes with all when $n$ even. $\square$

## Subgroups of $D_n$

**Rotation subgroup**: $\langle r \rangle \cong \mathbb{Z}_n$ (normal, index 2)

**Reflection subgroups**: $\langle sr^k \rangle \cong \mathbb{Z}_2$ for each $k$

**Other subgroups**: Depend on divisors of $n$. For $d | n$:
$$\langle r^{n/d} \rangle \cong \mathbb{Z}_d$$

## Quotient Groups

Since rotation subgroup has index 2:
$$D_n / \langle r \rangle \cong \mathbb{Z}_2$$

This quotient distinguishes rotations from reflections.

## Dihedral Groups as Subgroups of $S_n$

$D_n$ embeds in $S_n$ by action on vertices.

**Example**: $D_4 \leq S_4$ with:
- $r = (1\,2\,3\,4)$
- $s = (2\,4)$

Generates all 8 symmetries of square labeled 1-2-3-4.

## Comparison: $D_n$ vs Cyclic Groups

| Property | $D_n$ | $\mathbb{Z}_{2n}$ |
|----------|-------|-------------------|
| Order | $2n$ | $2n$ |
| Abelian | No ($n \geq 3$) | Yes |
| Generators | 2 | 1 |
| Structure | Semi-direct product | Cyclic |

$D_n \not\cong \mathbb{Z}_{2n}$ for $n \geq 3$ (different structure).

## Applications

**Crystallography**: 2D lattice symmetries include dihedral groups.

**Chemistry**: Molecular symmetries (benzene has $D_6$ symmetry).

**Art and Architecture**: Patterns with rotational and reflective symmetry.

## Summary

- $D_n$ = symmetries of regular $n$-gon
- Order $2n$: $n$ rotations, $n$ reflections
- Presentation: $\langle r, s \mid r^n = s^2 = (sr)^2 = e \rangle$
- Non-abelian for $n \geq 3$
- Embeds in $S_n$

Dihedral groups are fundamental examples of non-abelian groups with clear geometric meaning.
