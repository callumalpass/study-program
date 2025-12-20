---
title: "Classification of Cyclic Groups"
description: "Complete classification and recognition of cyclic groups"
---

# Classification of Cyclic Groups

## The Classification Theorem

**Fundamental Theorem**: Every cyclic group is isomorphic to either $\mathbb{Z}$ or $\mathbb{Z}_n$ for some positive integer $n$. Moreover:
- All cyclic groups of the same order are isomorphic
- Two cyclic groups are isomorphic if and only if they have the same order

This provides a complete classification: cyclic groups are entirely determined by their order (finite or infinite).

## Recognition Criteria

How do we determine if a group is cyclic?

**Theorem 1**: A group $G$ is cyclic if and only if there exists $a \in G$ with $|G| = |a|$.

**Proof**: Clear from definitions. $\square$

**Theorem 2**: A finite group $G$ is cyclic if and only if for each divisor $d$ of $|G|$, there is at most one subgroup of order $d$.

**Proof**:
($\Rightarrow$) If $G$ is cyclic, the Fundamental Theorem of Cyclic Groups guarantees uniqueness.

($\Leftarrow$) Suppose for each divisor $d$ of $|G| = n$, there is at most one subgroup of order $d$. We'll show $G$ is cyclic.

Let $\psi(d)$ be the number of elements of order $d$ in $G$. By basic counting:
$$n = \sum_{d | n} \psi(d)$$

For cyclic groups, we know $\psi(d) = \phi(d)$ (Euler's totient). We also have:
$$n = \sum_{d | n} \phi(d)$$

If there's at most one subgroup of each order, the same counting argument shows $\psi(d) = \phi(d)$ for all $d | n$.

In particular, $\psi(n) = \phi(n) \geq 1$, so there exists an element of order $n$, making $G$ cyclic. $\square$

## Recognizing Non-Cyclic Groups

**Theorem 3**: A group $G$ of order $n$ is NOT cyclic if:
1. There exist two distinct subgroups of the same order $d | n$, or
2. Every element has order strictly less than $n$

### Example 1: Klein Four-Group

$V_4 = \{e, a, b, ab\}$ with $a^2 = b^2 = (ab)^2 = e$

Order: $|V_4| = 4$

Subgroups of order 2:
- $\{e, a\}$
- $\{e, b\}$
- $\{e, ab\}$

Three distinct subgroups of order 2! Therefore, $V_4$ is not cyclic.

Alternatively: all non-identity elements have order 2 < 4, so $V_4$ is not cyclic.

### Example 2: $U(8) = \{1, 3, 5, 7\}$

Check element orders:
- $|1| = 1$
- $|3| = 2$ (since $3^2 \equiv 1 \pmod 8$)
- $|5| = 2$
- $|7| = 2$

Maximal order is 2 < 4 = $|U(8)|$, so $U(8)$ is not cyclic.

## Groups of Prime Order

**Theorem 4**: Every group of prime order is cyclic.

**Proof**: Let $|G| = p$ where $p$ is prime. Let $a \in G$ with $a \neq e$.

Then $|\langle a \rangle|$ divides $p$ by Lagrange's theorem (to be proven later). Since $p$ is prime and $|\langle a \rangle| > 1$, we have $|\langle a \rangle| = p$.

Therefore, $G = \langle a \rangle$ is cyclic. $\square$

**Corollary**: All groups of order $p$ (prime) are isomorphic to $\mathbb{Z}_p$.

### Examples

- All groups of order 2 are cyclic (isomorphic to $\mathbb{Z}_2$)
- All groups of order 3 are cyclic (isomorphic to $\mathbb{Z}_3$)
- All groups of order 5 are cyclic (isomorphic to $\mathbb{Z}_5$)
- All groups of order 7 are cyclic (isomorphic to $\mathbb{Z}_7$)

## Classification by Order

For small orders, we can completely classify groups:

### Order 1
Only one group: $\{e\}$ (trivial group, cyclic)

### Order 2
Only one group: $\mathbb{Z}_2$ (cyclic)

### Order 3
Only one group: $\mathbb{Z}_3$ (cyclic)

### Order 4
Two groups (up to isomorphism):
1. $\mathbb{Z}_4$ (cyclic)
2. $\mathbb{Z}_2 \times \mathbb{Z}_2 \cong V_4$ (non-cyclic)

**Distinction**: $\mathbb{Z}_4$ has an element of order 4; $V_4$ has only elements of order 1 and 2.

### Order 5
Only one group: $\mathbb{Z}_5$ (cyclic, prime order)

### Order 6
Two groups (up to isomorphism):
1. $\mathbb{Z}_6$ (cyclic)
2. $S_3$ (non-cyclic, non-abelian)

**Distinction**: $\mathbb{Z}_6$ is abelian; $S_3$ is non-abelian.

### Order 7
Only one group: $\mathbb{Z}_7$ (cyclic, prime order)

### Order 8
Five groups (up to isomorphism):
1. $\mathbb{Z}_8$ (cyclic)
2. $\mathbb{Z}_4 \times \mathbb{Z}_2$ (non-cyclic, abelian)
3. $\mathbb{Z}_2 \times \mathbb{Z}_2 \times \mathbb{Z}_2$ (non-cyclic, abelian)
4. $D_4$ (non-cyclic, non-abelian)
5. $Q_8$ (quaternion group, non-cyclic, non-abelian)

Only $\mathbb{Z}_8$ is cyclic.

## Determining If Two Cyclic Groups Are Isomorphic

**Theorem 5**: Cyclic groups $G$ and $H$ are isomorphic if and only if $|G| = |H|$.

**Proof**: Both directions follow from the classification theorem. $\square$

### Examples

- $\mathbb{Z}_6 \cong \langle e^{2\pi i/6} \rangle$ (both cyclic of order 6)
- $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$ (both cyclic of order 6)
- $\langle r \rangle \cong \mathbb{Z}_4$ where $r$ is 90° rotation of square

## Invariants of Cyclic Groups

**Definition**: An **invariant** is a property preserved under isomorphism.

For cyclic groups, the complete invariant is:
- **Order** (finite or infinite)

Other properties that are invariants:
- Abelian (all cyclic groups are abelian)
- Number of subgroups
- Number of generators
- Element orders

### Example: Using Invariants

**Question**: Is $\mathbb{Z}_{12}$ isomorphic to $\mathbb{Z}_4 \times \mathbb{Z}_3$?

**Answer**:
- $|\mathbb{Z}_{12}| = 12$
- $|\mathbb{Z}_4 \times \mathbb{Z}_3| = 4 \times 3 = 12$
- $\gcd(4, 3) = 1$, so $\mathbb{Z}_4 \times \mathbb{Z}_3$ is cyclic

Both are cyclic of order 12, so yes: $\mathbb{Z}_{12} \cong \mathbb{Z}_4 \times \mathbb{Z}_3$.

**Question**: Is $\mathbb{Z}_{12}$ isomorphic to $\mathbb{Z}_4 \times \mathbb{Z}_2$?

**Answer**:
- $|\mathbb{Z}_{12}| = 12$
- $|\mathbb{Z}_4 \times \mathbb{Z}_2| = 8 \neq 12$

Different orders, so not isomorphic.

Wait, $|\mathbb{Z}_4 \times \mathbb{Z}_2| = 4 \times 2 = 8$, not 12. Let me reconsider.

Actually, for $\mathbb{Z}_6 \times \mathbb{Z}_2$:
- $|\mathbb{Z}_6 \times \mathbb{Z}_2| = 12$
- $\gcd(6, 2) = 2 \neq 1$

So $\mathbb{Z}_6 \times \mathbb{Z}_2$ is NOT cyclic (has elements of max order $\text{lcm}(6,2) = 6 < 12$).

Therefore, $\mathbb{Z}_{12} \not\cong \mathbb{Z}_6 \times \mathbb{Z}_2$.

## Finding Isomorphisms

To construct an explicit isomorphism between cyclic groups $G = \langle a \rangle$ and $H = \langle b \rangle$ of order $n$:

Define $\phi: G \to H$ by $\phi(a^k) = b^k$.

This is well-defined, a homomorphism, and bijective.

### Example

Isomorphism between $\mathbb{Z}_5$ and $U(11) = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$:

Both have order... wait, $|U(11)| = \phi(11) = 10 \neq 5$.

Let me use $U(6) = \{1, 5\}$:
- $|U(6)| = \phi(6) = 2$

Isomorphism $\phi: \mathbb{Z}_2 \to U(6)$:
$$\phi(0) = 1, \quad \phi(1) = 5$$

Check: $\phi(1 + 1) = \phi(0) = 1 = 5 \times 5 \bmod 6 = \phi(1) \cdot \phi(1)$. ✓

## Summary Table

| Order | Cyclic Groups | Total Groups | Notes |
|-------|---------------|--------------|-------|
| 1 | 1 | 1 | Trivial |
| 2 | 1 | 1 | Prime |
| 3 | 1 | 1 | Prime |
| 4 | 1 | 2 | Also $V_4$ |
| 5 | 1 | 1 | Prime |
| 6 | 1 | 2 | Also $S_3$ |
| 7 | 1 | 1 | Prime |
| 8 | 1 | 5 | Four non-cyclic |
| $p$ | 1 | 1 | Prime |

## Applications

### Cryptographic Strength

Cyclic groups of prime order are preferred in cryptography:
- Simple structure
- All non-identity elements are generators (for prime order)
- Discrete log problem well-studied

### Fourier Analysis

The group structure of $\mathbb{Z}_n$ underlies the discrete Fourier transform (DFT).

### Coding Theory

Cyclic codes use ideals in polynomial rings over $\mathbb{Z}_p$, related to cyclic group structure.

## Summary

Classification results:
- Cyclic groups completely determined by order
- All groups of prime order are cyclic
- Recognition: unique subgroups of each order
- Isomorphism: same order $\Leftrightarrow$ isomorphic
- Complete classification for small orders

The simplicity of cyclic groups makes them fundamental building blocks in abstract algebra.
