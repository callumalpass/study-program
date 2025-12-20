---
title: "Normal Subgroups"
description: "Introduction to normal subgroups and their fundamental properties"
---

# Normal Subgroups

Normal subgroups occupy a central position in group theory, serving as the key ingredient for constructing quotient groups and understanding the internal structure of groups. While every subgroup partitions a group into cosets, only normal subgroups allow us to define a natural group operation on those cosets. This section establishes the definition, characterizations, and fundamental properties of normal subgroups.

## Definition and Equivalent Characterizations

**Definition**: A subgroup $N$ of a group $G$ is called **normal** in $G$, denoted $N \triangleleft G$ or $N \unlhd G$, if for every element $g \in G$, the left coset $gN$ equals the right coset $Ng$:
$$gN = Ng \text{ for all } g \in G$$

This condition is stronger than simply requiring that left and right cosets have the same number of elements—it demands that they are identical as sets.

**Theorem (Equivalent Characterizations)**: For a subgroup $N$ of $G$, the following are equivalent:

1. $N \triangleleft G$ (left cosets equal right cosets)
2. $gNg^{-1} = N$ for all $g \in G$ (invariant under conjugation)
3. $gNg^{-1} \subseteq N$ for all $g \in G$ (closed under conjugation)
4. $gng^{-1} \in N$ for all $g \in G$ and $n \in N$
5. $N$ is a union of conjugacy classes of $G$
6. $N$ is the kernel of some homomorphism from $G$

**Proof of (1) ⟺ (2)**:
If $gN = Ng$, then multiplying both sides on the right by $g^{-1}$ gives $gNg^{-1} = Ngg^{-1} = N$.
Conversely, if $gNg^{-1} = N$, multiplying on the right by $g$ gives $gN = Ng$. $\square$

**Proof of (2) ⟺ (3)**:
The direction (2) ⟹ (3) is immediate. For (3) ⟹ (2), note that if $gNg^{-1} \subseteq N$ for all $g$, then also $g^{-1}Ng \subseteq N$. Conjugating this by $g$ gives $N \subseteq gNg^{-1}$, so $gNg^{-1} = N$. $\square$

## Examples of Normal Subgroups

### Example 1: Subgroups of Abelian Groups

In any abelian group $G$, every subgroup $H$ is normal.

**Proof**: For any $g \in G$ and $h \in H$, we have $ghg^{-1} = gg^{-1}h = h \in H$ since $gh = hg$. Thus $gHg^{-1} \subseteq H$, and by our equivalent characterizations, $H \triangleleft G$. $\square$

This explains why normality is automatic in $\mathbb{Z}$, $\mathbb{R}$, $\mathbb{Z}_n$, and all abelian groups.

### Example 2: The Alternating Group

The alternating group $A_n$ is normal in the symmetric group $S_n$ for all $n \geq 1$.

**Proof 1 (Index 2)**: Since $[S_n : A_n] = 2$, the subgroup $A_n$ is normal by a general theorem (proved below).

**Proof 2 (Kernel)**: $A_n = \ker(\text{sgn})$ where $\text{sgn}: S_n \to \{1, -1\}$ is the sign homomorphism. Since kernels are always normal, $A_n \triangleleft S_n$. $\square$

### Example 3: The Center of a Group

The center $Z(G) = \{z \in G : gz = zg \text{ for all } g \in G\}$ is always normal in $G$.

**Proof**: For any $g \in G$ and $z \in Z(G)$, we have $gzg^{-1} = zgg^{-1} = z \in Z(G)$, using that $z$ commutes with $g$. $\square$

### Example 4: The Klein Four-Group in $A_4$

The Klein four-group $V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$ is normal in $A_4$.

**Verification**: Each non-identity element of $V_4$ is a product of two disjoint 2-cycles. Under conjugation by any element of $A_4$, a product of two disjoint 2-cycles remains a product of two disjoint 2-cycles. Since $V_4$ contains all three such elements in $A_4$, we have $\sigma V_4 \sigma^{-1} = V_4$ for all $\sigma \in A_4$. $\square$

## Non-Examples: Subgroups That Are Not Normal

### Non-Example 1: A Subgroup of $S_3$

Consider $H = \{e, (1\,2)\} \leq S_3$. This subgroup is NOT normal in $S_3$.

**Verification**: Compute $(1\,3)H(1\,3)^{-1} = (1\,3)H(1\,3)$:
- $(1\,3)e(1\,3) = e$
- $(1\,3)(1\,2)(1\,3) = (2\,3)$

Since $(2\,3) \notin H$, we have $(1\,3)H(1\,3)^{-1} \neq H$, so $H$ is not normal.

Alternatively, check cosets: $(1\,3)H = \{(1\,3), (1\,2\,3)\}$ but $H(1\,3) = \{(1\,3), (1\,3\,2)\}$. Since $(1\,2\,3) \neq (1\,3\,2)$, the left and right cosets differ.

### Non-Example 2: Rotation Subgroup in $D_4$

In the dihedral group $D_4$ (symmetries of a square), the subgroup of pure reflections through one axis is not normal, while the rotation subgroup $\langle r \rangle$ is normal.

## Key Theorems About Normal Subgroups

**Theorem 1 (Index 2 Implies Normal)**: If $[G:N] = 2$, then $N \triangleleft G$.

**Proof**: There are exactly two cosets of $N$ in $G$: the subgroup $N$ itself and its complement $G \setminus N$. For any $g \in G$:
- If $g \in N$, then $gN = N = Ng$.
- If $g \notin N$, then $gN = G \setminus N = Ng$ (since both are the unique coset other than $N$).

In either case, $gN = Ng$. $\square$

**Corollary**: $A_n \triangleleft S_n$, $n\mathbb{Z} \triangleleft \mathbb{Z}$ when $n = 2$, and any subgroup of index 2 is automatically normal.

**Theorem 2 (Intersection of Normal Subgroups)**: If $M \triangleleft G$ and $N \triangleleft G$, then $M \cap N \triangleleft G$.

**Proof**: For any $g \in G$ and $x \in M \cap N$:
- Since $x \in M$ and $M \triangleleft G$, we have $gxg^{-1} \in M$.
- Since $x \in N$ and $N \triangleleft G$, we have $gxg^{-1} \in N$.

Therefore $gxg^{-1} \in M \cap N$, showing $g(M \cap N)g^{-1} \subseteq M \cap N$. $\square$

**Theorem 3 (Product of Normal Subgroups)**: If $M, N \triangleleft G$, then $MN = \{mn : m \in M, n \in N\}$ is also a normal subgroup of $G$.

**Theorem 4 (Normal Subgroups and Kernels)**: $N \triangleleft G$ if and only if $N = \ker(\phi)$ for some homomorphism $\phi: G \to H$.

**Proof**: We've shown kernels are normal. Conversely, if $N \triangleleft G$, then the natural projection $\pi: G \to G/N$ defined by $\pi(g) = gN$ is a homomorphism with $\ker(\pi) = N$. $\square$

## Simple Groups

**Definition**: A group $G$ is **simple** if its only normal subgroups are $\{e\}$ and $G$ itself.

Simple groups are the "building blocks" of all finite groups, analogous to prime numbers for integers.

**Examples of Simple Groups**:
- $\mathbb{Z}_p$ for any prime $p$ (having no proper nontrivial subgroups at all)
- $A_n$ for $n \geq 5$ (a profound theorem requiring careful proof)

**Non-Examples**:
- Any abelian group of composite order has proper nontrivial subgroups, all normal
- $S_n$ for $n \geq 3$ contains the normal subgroup $A_n$
- $A_4$ contains the normal subgroup $V_4$

## The Normal Subgroup Test via Conjugacy Classes

**Theorem**: A subgroup $N$ of $G$ is normal if and only if $N$ is a union of conjugacy classes of $G$.

**Proof**: If $N \triangleleft G$ and $n \in N$, then $gng^{-1} \in N$ for all $g \in G$. This means the entire conjugacy class of $n$ is contained in $N$.

Conversely, if $N$ is a union of conjugacy classes, then for any $n \in N$ and $g \in G$, the element $gng^{-1}$ is in the conjugacy class of $n$, hence in $N$. $\square$

This test is particularly useful when the conjugacy classes of a group are known, as is often the case for symmetric and alternating groups.

## Key Takeaways

- **Normal subgroups** are subgroups where left and right cosets coincide: $gN = Ng$ for all $g \in G$
- **Equivalent conditions**: conjugation invariance ($gNg^{-1} = N$), being a kernel, or being a union of conjugacy classes
- **Every subgroup is normal** in abelian groups
- **Index 2 subgroups** are automatically normal
- **Simple groups** have no proper nontrivial normal subgroups
- **Normality is essential** for constructing quotient groups, as we'll see in the next section

Normal subgroups provide the foundation for quotient groups, which are among the most powerful tools in group theory for understanding group structure.
