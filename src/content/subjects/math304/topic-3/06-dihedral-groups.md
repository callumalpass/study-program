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

The dihedral groups provide some of the most concrete and visually intuitive examples of non-abelian groups. They arise naturally when studying the symmetries of geometric objects and have applications throughout mathematics, chemistry, and physics.

## Construction

For regular $n$-gon with vertices labeled $1, 2, \ldots, n$:

**Rotations**: $r^k$ for $k = 0, 1, \ldots, n-1$ where $r$ is counterclockwise rotation by $360°/n$.

The rotation $r$ generates a cyclic subgroup of order $n$, and powers of $r$ give all possible rotational symmetries. Note that $r^0 = e$ is the identity, $r^1 = r$ is the basic rotation, and $r^{n-1}$ is the rotation by $(n-1) \cdot 360°/n$, which is equivalent to a clockwise rotation by $360°/n$.

**Reflections**: $n$ reflection axes through vertices or edge midpoints.

The nature of these axes depends on whether $n$ is even or odd:
- If $n$ is odd, each reflection axis passes through a vertex and the midpoint of the opposite edge.
- If $n$ is even, there are $n/2$ axes through pairs of opposite vertices and $n/2$ axes through pairs of opposite edge midpoints.

## $D_3$ - Symmetries of Equilateral Triangle

$|D_3| = 6$

**Rotations**:
- $r^0 = e$ (identity)
- $r^1 = r$ (120°)
- $r^2$ (240°)

**Reflections**: $f_1, f_2, f_3$ through each vertex and opposite edge midpoint.

Each reflection axis passes through one vertex and bisects the opposite edge. The three reflections, combined with the three non-identity rotations and the identity, give exactly 6 symmetries.

**As permutations in $S_3$**:
- $r = (1\,2\,3)$
- $r^2 = (1\,3\,2)$
- $f_1 = (2\,3)$ (fixes vertex 1)
- $f_2 = (1\,3)$ (fixes vertex 2)
- $f_3 = (1\,2)$ (fixes vertex 3)

**Isomorphism**: $D_3 \cong S_3$

This is a remarkable fact: the symmetry group of an equilateral triangle is isomorphic to the full symmetric group on three elements. This makes $D_3$ particularly important as it is simultaneously a dihedral group and a symmetric group. It is the smallest non-abelian group, having order 6.

## $D_4$ - Symmetries of Square

$|D_4| = 8$

**Rotations**: $\{e, r, r^2, r^3\}$ where $r = 90°$

The rotational symmetries form a cyclic subgroup isomorphic to $\mathbb{Z}_4$: rotations by 0°, 90°, 180°, and 270°.

**Reflections**:
- Diagonal reflections: $d_1, d_2$ (through opposite vertices)
- Vertical/horizontal: $h, v$ (through opposite edge midpoints)

**As permutations**: $D_4 \leq S_4$

If we label the vertices of the square as 1, 2, 3, 4 going counterclockwise from the top-right, then:
- $r = (1\,2\,3\,4)$ (90° counterclockwise rotation)
- $d_1 = (2\,4)$ (diagonal reflection)
- $v = (1\,4)(2\,3)$ (vertical reflection)

**Subgroups**:
- Rotation subgroup: $\{e, r, r^2, r^3\} \cong \mathbb{Z}_4$
- Five order-2 subgroups (each reflection + identity)
- Two order-4 subgroups containing $r^2$

The lattice of subgroups of $D_4$ is particularly rich and serves as an excellent example for studying subgroup relationships.

## Presentation of $D_n$

**Generators**: Rotation $r$ and reflection $s$

**Relations**:
$$r^n = e, \quad s^2 = e, \quad srs = r^{-1}$$

**Presentation**: $D_n = \langle r, s \mid r^n = s^2 = e, srs = r^{-1} \rangle$

The third relation $srs = r^{-1}$ (equivalently $sr = r^{-1}s$) captures how reflections reverse rotation direction. This can be understood geometrically: if you rotate and then reflect, the result is different from reflecting first and then rotating in the same direction. Specifically, the reflection "reverses" the rotation.

An alternative presentation uses the relation $(sr)^2 = e$ instead of $srs = r^{-1}$, which can be derived from the given relations:
$$D_n = \langle r, s \mid r^n = s^2 = (sr)^2 = e \rangle$$

This form emphasizes that the product $sr$ has order 2.

## Elements in General Form

Every element of $D_n$ has unique form:
$$r^k \quad \text{or} \quad sr^k$$
for $0 \leq k < n$.

**Proof**: There are $n$ rotations ($r^k$ for $k = 0, 1, \ldots, n-1$) and $n$ reflections (since $sr^k$ for different values of $k$ give different reflections). These account for all $2n$ symmetries. The uniqueness follows from the fact that no rotation equals a reflection (rotations preserve orientation while reflections reverse it). $\square$

This canonical form makes calculations in $D_n$ systematic and straightforward.

## Multiplication Rules

From the relations:
- $r^i r^j = r^{i+j \bmod n}$
- $(sr^i)(sr^j) = r^{i-j}$ (product of two reflections is a rotation)
- $r^i(sr^j) = sr^{j-i}$
- $(sr^i)r^j = sr^{i+j}$

These rules can all be derived from the basic relations. The second rule is particularly interesting: it shows that the product of two reflections is always a rotation, and the specific rotation depends on the "angle" between the two reflection axes.

### Example: $D_4$

$(sr)(sr^2) = r^{1-2} = r^{-1} = r^3$

This composition takes the reflection through one axis, followed by reflection through another axis (one step further around), resulting in a rotation by 270° (or equivalently, -90°).

$(sr^2)(r^3) = sr^{2+3} = sr^5 = sr^1$

Here we have a reflection followed by a rotation, which gives another reflection.

### Detailed Example: $D_3$

Let's compute the full Cayley table for $D_3$ using our multiplication rules with $n=3$:

If $s$ reflects through the axis passing through vertex 1, then:
- $rs = sr^{-1} = sr^2$
- $r^2s = sr^{-2} = sr^1 = sr$
- $s \cdot s = e$
- $(sr)(sr) = r^{1-1} = e$
- $(sr^2)(sr) = r^{2-1} = r$

These calculations demonstrate the non-commutativity: $rs \neq sr$.

## Center of $D_n$

**Theorem**:
$$Z(D_n) = \begin{cases}
\{e\} & \text{if } n \text{ is odd} \\
\{e, r^{n/2}\} & \text{if } n \text{ is even}
\end{cases}$$

**Proof**: An element $g \in Z(D_n)$ must commute with all elements, in particular with the generators $r$ and $s$.

If $g = r^k$, then $g$ commutes with $r$ automatically. For $g$ to commute with $s$, we need:
$$r^k s = s r^k$$

Using the relation $sr = r^{-1}s$, we have $sr^k = r^{-k}s$. Thus:
$$r^k s = s r^k \implies r^k s = s r^k \implies s r^{-k} = s r^k \implies r^{-k} = r^k$$

This holds if and only if $r^{2k} = e$, which means $n | 2k$.

If $n$ is odd, then $\gcd(n, 2) = 1$, so $n | k$, giving only $k = 0$, hence $g = e$.

If $n$ is even, then $k \in \{0, n/2\}$, giving $Z(D_n) = \{e, r^{n/2}\}$. Note that $r^{n/2}$ represents a 180° rotation, which commutes with all reflections (reflecting twice across axes separated by 180° returns to the original position). $\square$

## Subgroups of $D_n$

**Rotation subgroup**: $\langle r \rangle \cong \mathbb{Z}_n$ (normal, index 2)

This subgroup is always normal because it has index 2 in $D_n$. Any subgroup of index 2 in a finite group is automatically normal.

**Reflection subgroups**: $\langle sr^k \rangle \cong \mathbb{Z}_2$ for each $k$

Each individual reflection generates a subgroup of order 2. There are $n$ such subgroups, one for each reflection.

**Other subgroups**: Depend on divisors of $n$. For $d | n$:
$$\langle r^{n/d} \rangle \cong \mathbb{Z}_d$$

These are cyclic subgroups coming from certain rotations. For example, in $D_6$, we have $\langle r^2 \rangle \cong \mathbb{Z}_3$ and $\langle r^3 \rangle \cong \mathbb{Z}_2$.

Additionally, for each divisor $d | n$, there are dihedral subgroups isomorphic to $D_d$, formed by taking every $(n/d)$-th rotation and the corresponding reflections.

## Quotient Groups

Since rotation subgroup has index 2:
$$D_n / \langle r \rangle \cong \mathbb{Z}_2$$

This quotient distinguishes rotations from reflections. The two cosets are $\langle r \rangle$ (all rotations) and $s \langle r \rangle$ (all reflections).

This quotient homomorphism can be thought of as the "orientation character": it detects whether a symmetry preserves or reverses orientation.

## Dihedral Groups as Subgroups of $S_n$

$D_n$ embeds in $S_n$ by action on vertices.

**Example**: $D_4 \leq S_4$ with:
- $r = (1\,2\,3\,4)$
- $s = (2\,4)$

These two permutations generate all 8 symmetries of the square with vertices labeled 1-2-3-4 going counterclockwise.

More generally, the embedding $D_n \to S_n$ is given by the natural action on the $n$ vertices. This embedding shows that every dihedral group is a subgroup of some symmetric group, providing a concrete realization of abstract dihedral groups as permutation groups.

## Comparison: $D_n$ vs Cyclic Groups

| Property | $D_n$ | $\mathbb{Z}_{2n}$ |
|----------|-------|-------------------|
| Order | $2n$ | $2n$ |
| Abelian | No ($n \geq 3$) | Yes |
| Generators | 2 | 1 |
| Structure | Semi-direct product | Cyclic |

$D_n \not\cong \mathbb{Z}_{2n}$ for $n \geq 3$ (different structure).

The key distinction is that $D_n$ is non-abelian (when $n \geq 3$) while $\mathbb{Z}_{2n}$ is always abelian. This shows that groups of the same order can have very different structures. In fact, $D_n \cong \mathbb{Z}_n \rtimes \mathbb{Z}_2$, a semi-direct product, where $\mathbb{Z}_2$ acts on $\mathbb{Z}_n$ by inversion.

## Applications

**Crystallography**: 2D lattice symmetries include dihedral groups. The 17 wallpaper groups, which classify all possible periodic patterns in the plane, include several that are based on dihedral symmetries.

**Chemistry**: Molecular symmetries are described by point groups, many of which are dihedral. For example, benzene ($C_6H_6$) has $D_6$ symmetry. Water ($H_2O$) has $D_{2h}$ symmetry when including the distinction between rotations and rotoreflections. Understanding molecular symmetry through group theory helps predict spectroscopic properties and chemical behavior.

**Art and Architecture**: Patterns with rotational and reflective symmetry appear throughout human culture. Islamic geometric patterns, rose windows in Gothic cathedrals, and traditional mandalas often exhibit dihedral symmetries. Snowflakes naturally display $D_6$ symmetry due to the hexagonal structure of ice crystals.

**Computer Graphics**: Dihedral groups are used in procedural generation of symmetric designs and in optimizing rendering algorithms by exploiting symmetry to reduce computational complexity.

## Historical Note

The systematic study of dihedral groups began in the 19th century as part of the development of group theory. They were among the first examples of non-abelian groups to be studied in detail, providing crucial insights into the nature of group structure beyond cyclic groups.

## Summary

- $D_n$ = symmetries of regular $n$-gon
- Order $2n$: $n$ rotations, $n$ reflections
- Presentation: $\langle r, s \mid r^n = s^2 = (sr)^2 = e \rangle$
- Non-abelian for $n \geq 3$
- Embeds in $S_n$
- Has a cyclic normal subgroup of index 2 (the rotation subgroup)

Dihedral groups are fundamental examples of non-abelian groups with clear geometric meaning, bridging the gap between abstract algebra and concrete geometric intuition.

## Key Takeaways

- Dihedral groups $D_n$ represent the complete symmetry groups of regular $n$-gons, including both rotations and reflections.
- Every dihedral group has order $2n$ and can be generated by two elements: a rotation $r$ of order $n$ and a reflection $s$ of order 2.
- The defining relations $r^n = s^2 = e$ and $srs = r^{-1}$ completely determine the group structure and capture how reflections reverse rotations.
- For $n \geq 3$, dihedral groups are non-abelian, providing accessible examples of non-commutative group structures.
- The rotation subgroup $\langle r \rangle \cong \mathbb{Z}_n$ is always normal with index 2, making $D_n$ a semi-direct product $\mathbb{Z}_n \rtimes \mathbb{Z}_2$.
- The center of $D_n$ is trivial when $n$ is odd but contains the 180° rotation when $n$ is even.
- Dihedral groups have rich applications in geometry, chemistry, crystallography, and art, making them one of the most practically important families of groups.
- $D_3 \cong S_3$ is exceptional: it is simultaneously the smallest non-abelian group, a dihedral group, and a symmetric group.
