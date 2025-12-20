---
title: "Simple Groups"
description: "Introduction to simple groups and their role in group theory"
---

# Simple Groups

## Definition

**Definition**: A group $G$ is **simple** if:
1. $G \neq \{e\}$ (non-trivial)
2. The only normal subgroups of $G$ are $\{e\}$ and $G$ itself

Simple groups are the "atoms" of group theory - they cannot be broken down further via quotient groups. Just as every integer can be factored into primes, every finite group can be "factored" into simple groups through composition series. This makes simple groups the fundamental building blocks of all finite groups.

The concept of simplicity is crucial because it represents groups that have no proper normal subgroups, meaning they cannot be decomposed into smaller, more manageable pieces through the quotient construction. Understanding simple groups is therefore essential to understanding all groups.

## Examples

### Example 1: $\mathbb{Z}_p$ (prime $p$)

Any group of prime order is simple.

**Proof**: If $|G| = p$ (prime), then by Lagrange's Theorem, the only possible subgroup orders are 1 and $p$ (the divisors of $p$). Thus the only subgroups are $\{e\}$ and $G$ itself. Since all subgroups of abelian groups are normal, these are the only normal subgroups. Therefore $G$ is simple. $\square$

**Consequence**: $\mathbb{Z}_2, \mathbb{Z}_3, \mathbb{Z}_5, \mathbb{Z}_7, \mathbb{Z}_{11}, \ldots$ are all simple groups.

These are the smallest simple groups and the only abelian simple groups (as we'll prove later).

### Example 2: $A_5$

The alternating group $A_5$ (even permutations of 5 elements) is simple. This is the smallest non-abelian simple group, with order $|A_5| = 60$.

**Proof Sketch**: We must show that $A_5$ has no proper non-trivial normal subgroups.

The conjugacy classes of $A_5$ are:
- Identity: $\{e\}$ (size 1)
- 3-cycles: $(1\,2\,3)$ and conjugates (size 20)
- Products of two disjoint transpositions: $(1\,2)(3\,4)$ and conjugates (size 15)
- 5-cycles of type 1: $(1\,2\,3\,4\,5)$ and conjugates (size 12)
- 5-cycles of type 2: $(1\,2\,3\,5\,4)$ and conjugates (size 12)

Any normal subgroup must be a union of conjugacy classes (including the identity). The sum of sizes must divide 60.

Checking all possibilities:
- $1$ (just identity - trivial normal subgroup)
- $1 + 20 = 21$ (doesn't divide 60)
- $1 + 15 = 16$ (doesn't divide 60)
- $1 + 12 = 13$ (doesn't divide 60)
- $1 + 12 + 12 = 25$ (doesn't divide 60)
- $1 + 20 + 15 = 36$ (doesn't divide 60)
- All others either don't divide 60 or give us the whole group

Therefore, the only normal subgroups are $\{e\}$ and $A_5$, proving $A_5$ is simple. $\square$

### Example 3: $A_n$ for $n \geq 5$

**Theorem**: $A_n$ is simple for all $n \geq 5$.

This is a fundamental result with profound implications. The proof requires showing that 3-cycles generate $A_n$ for $n \geq 5$, and that all 3-cycles are conjugate in $A_n$.

**Historical Significance**: The simplicity of $A_5$ is the key to proving that polynomial equations of degree 5 or higher cannot be solved by radicals (the Abel-Ruffini theorem). This connection between group theory and polynomial equations was one of the driving forces in the development of abstract algebra.

## Non-Examples

### Non-Example 1: $\mathbb{Z}_6$

Not simple: $\mathbb{Z}_6$ has the proper normal subgroup $\{0, 2, 4\} = \langle 2 \rangle = 2\mathbb{Z}/6\mathbb{Z}$.

Since $\mathbb{Z}_6$ is abelian, all subgroups are normal, and $\mathbb{Z}_6$ has subgroups of orders 1, 2, 3, and 6 (corresponding to divisors of 6). The subgroups of orders 2 and 3 are proper normal subgroups.

### Non-Example 2: $S_n$ for $n \geq 3$

The symmetric group $S_n$ is not simple for $n \geq 3$ because it contains the alternating group $A_n$ as a proper normal subgroup.

Since $[S_n : A_n] = 2$, the subgroup $A_n$ has index 2 and is therefore normal. For $n \geq 3$, we have $1 < |A_n| < |S_n|$, so $A_n$ is a proper non-trivial normal subgroup.

**Special Case**: $S_2 = \mathbb{Z}_2$ has order 2 (prime), so it is actually simple. However, for $n \geq 3$, $S_n$ is never simple.

### Non-Example 3: $A_4$

The alternating group $A_4$ is not simple. It contains the Klein four-group as a proper normal subgroup:
$$V_4 = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\}$$

**Verification**: $V_4$ is a normal subgroup of $A_4$ because:
1. $|V_4| = 4$ and $|A_4| = 12$, so $V_4$ is proper
2. $V_4$ is the union of conjugacy classes (identity and all products of disjoint transpositions)
3. Being a union of conjugacy classes makes it normal

Therefore $A_4$ is not simple. This shows that the pattern "$A_n$ is simple" only holds for $n \geq 5$.

## Abelian Simple Groups

**Theorem**: An abelian group is simple if and only if it is isomorphic to $\mathbb{Z}_p$ for some prime $p$.

**Proof**:
($\Leftarrow$) We already proved that $\mathbb{Z}_p$ is simple for prime $p$.

($\Rightarrow$) Suppose $G$ is abelian and simple. Since $G$ is abelian, every subgroup is normal. Pick any non-identity element $g \in G$. Then $\langle g \rangle$ is a normal subgroup of $G$. By simplicity, either $\langle g \rangle = \{e\}$ or $\langle g \rangle = G$.

Since $g \neq e$, we have $\langle g \rangle \neq \{e\}$, so $\langle g \rangle = G$. Thus $G$ is cyclic.

Now, if $G$ is cyclic with $|G| = n$, then by the Fundamental Theorem of Cyclic Groups, $G$ has a subgroup of order $d$ for each divisor $d$ of $n$. If $n$ is composite, say $n = ab$ with $1 < a < n$, then $G$ has a proper subgroup of order $a$, which contradicts simplicity.

Therefore $n$ must be prime, and $G \cong \mathbb{Z}_p$ for some prime $p$. $\square$

**Consequence**: All non-abelian simple groups are necessarily more complex structures, and understanding them requires sophisticated techniques.

## Classification of Finite Simple Groups

The Classification of Finite Simple Groups is one of the greatest achievements in mathematics, completed in 2004 after decades of collaborative work by hundreds of mathematicians. The complete proof spans over 10,000 pages across hundreds of journal articles.

**The Classification Theorem**: Every finite simple group is isomorphic to one of the following:

1. **Cyclic groups of prime order**: $\mathbb{Z}_p$ for prime $p$
2. **Alternating groups**: $A_n$ for $n \geq 5$
3. **Groups of Lie type**: 16 infinite families, including:
   - Linear groups: $PSL_n(q)$ (projective special linear groups)
   - Symplectic groups: $PSp_{2n}(q)$
   - Orthogonal groups: various families
   - Exceptional groups: $E_6(q), E_7(q), E_8(q), F_4(q), G_2(q)$
4. **26 Sporadic groups**: Exceptional groups that don't fit the patterns above, including:
   - Mathieu groups: $M_{11}, M_{12}, M_{22}, M_{23}, M_{24}$
   - Janko groups: $J_1, J_2, J_3, J_4$
   - Conway groups: $Co_1, Co_2, Co_3$
   - The Monster group: $M$ (largest sporadic group, order approximately $8 \times 10^{53}$)

The Monster group is particularly fascinating - it has connections to modular functions, string theory, and many areas of mathematics and physics.

## Applications

### Galois Theory

Simple groups play a crucial role in determining the solvability of polynomial equations by radicals.

A polynomial equation is solvable by radicals if and only if its Galois group is a solvable group. A group is solvable if it can be built from abelian groups through extensions. Since simple groups are building blocks, and $A_5$ is a non-abelian simple group, we get:

**Theorem (Abel-Ruffini)**: There is no general formula for solving polynomial equations of degree 5 or higher using radicals.

**Proof Idea**: The Galois group of a general quintic contains $A_5$, which is simple and non-abelian, hence not solvable.

This was one of the original motivations for developing group theory in the first place!

### Composition Series

Every finite group has a **composition series**:
$$\{e\} = G_0 \triangleleft G_1 \triangleleft \cdots \triangleleft G_n = G$$

where each quotient $G_{i+1}/G_i$ is simple.

The composition factors (simple quotients) are the building blocks of $G$.

**Jordan-Hölder Theorem**: The composition factors are unique up to order and isomorphism. That is, any two composition series for $G$ have the same length and the same composition factors (possibly in different order).

This is analogous to unique prime factorization for integers!

**Example**: For $\mathbb{Z}_{12}$:
$$\{0\} \triangleleft \{0, 6\} \triangleleft \{0, 4, 8\} \triangleleft \mathbb{Z}_{12}$$

Quotients:
- $\{0, 6\}/\{0\} \cong \mathbb{Z}_2$
- $\{0, 4, 8\}/\{0, 6\} \cong \mathbb{Z}_2$
- $\mathbb{Z}_{12}/\{0, 4, 8\} \cong \mathbb{Z}_3$

So $\mathbb{Z}_{12}$ is "built from" simple groups $\mathbb{Z}_2, \mathbb{Z}_2, \mathbb{Z}_3$ (not unique order, but the multiset $\{2, 2, 3\}$ is unique).

### Building Blocks

Just as every integer factors uniquely into primes:
$$n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$$

Every finite group "factors" into simple groups via composition series. However, unlike integers, the group structure depends not just on which simple groups appear, but also on HOW they are put together (the extensions).

For example, there are two non-isomorphic groups of order 4: $\mathbb{Z}_4$ and $\mathbb{Z}_2 \times \mathbb{Z}_2$. Both have composition factors $\{\mathbb{Z}_2, \mathbb{Z}_2\}$, but they are assembled differently.

## Testing for Simplicity

### Conjugacy Class Method

If $G$ has a conjugacy class $C$ (other than $\{e\}$) such that $\langle C \rangle = G$, and if we can show no union of conjugacy classes (except all of them) forms a proper normal subgroup, then $G$ is simple.

**Reasoning**: Normal subgroups are unions of conjugacy classes. If no such union works, there are no proper normal subgroups.

### Index Arguments

Use Lagrange's Theorem and properties of indices to constrain possible normal subgroup orders.

**Example**: If $|G| = 60$ and we want to show $G$ is simple, we check all divisors $d | 60$ (other than 1 and 60) and show that no normal subgroup of order $d$ can exist.

### Example: Showing $A_5$ is Simple

$|A_5| = 60$. Possible normal subgroup orders (divisors of 60): 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60.

Using the conjugacy class method:
- Conjugacy classes have sizes: 1, 12, 12, 15, 20
- Any normal subgroup is a union of conjugacy classes
- Sum must divide 60

Testing combinations:
- $1 + 12 = 13$ ✗ (doesn't divide 60)
- $1 + 15 = 16$ ✗
- $1 + 20 = 21$ ✗
- $1 + 12 + 12 = 25$ ✗
- $1 + 12 + 15 = 28$ ✗
- $1 + 12 + 20 = 33$ ✗
- $1 + 15 + 20 = 36$ ✗
- $1 + 12 + 12 + 15 = 40$ ✗
- $1 + 12 + 12 + 20 = 45$ ✗
- $1 + 12 + 15 + 20 = 48$ ✗
- $1 + 12 + 12 + 15 + 20 = 60$ ✓ (whole group)

The only possibilities are 1 (trivial) and 60 (whole group), so $A_5$ is simple. $\square$

## Summary

- Simple groups are non-trivial groups with only trivial normal subgroups
- They are the building blocks of all finite groups (via composition series)
- Abelian simple groups are exactly $\mathbb{Z}_p$ for prime $p$
- $A_n$ is simple for $n \geq 5$ (but $A_3, A_4$ are not simple)
- The Classification Theorem lists all finite simple groups (cyclic, alternating, Lie type, sporadic)
- Simple groups are essential in Galois theory and polynomial solvability
- Jordan-Hölder Theorem: composition factors are unique (up to order)
- Testing simplicity often uses conjugacy classes and divisibility arguments

Simple groups are fundamental to understanding group structure and represent one of the deepest areas of modern algebra.

## Key Takeaways

- Simple groups have no proper non-trivial normal subgroups (cannot be "factored" further)
- Every abelian simple group is cyclic of prime order ($\mathbb{Z}_p$)
- The alternating groups $A_n$ are simple for $n \geq 5$, with $A_5$ being the smallest non-abelian simple group
- The Classification of Finite Simple Groups took over a century and 10,000+ pages to complete
- Simple groups appear as composition factors in the Jordan-Hölder theorem, analogous to prime factorization
- The simplicity of $A_5$ proves the insolvability of the general quintic equation
- Testing simplicity requires checking that no union of conjugacy classes (except trivial ones) has order dividing $|G|$
- Understanding simple groups is essential for understanding all finite groups, as every finite group is built from simple groups
