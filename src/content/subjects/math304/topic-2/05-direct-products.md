---
title: "Direct Products of Cyclic Groups"
description: "Construction and properties of direct products, with focus on cyclic groups"
---

# Direct Products of Cyclic Groups

## Definition of Direct Product

The direct product allows us to build new groups from existing ones.

**Definition**: Let $(G, \ast)$ and $(H, \cdot)$ be groups. The **direct product** $G \times H$ is the set of ordered pairs:
$$G \times H = \{(g, h) : g \in G, h \in H\}$$

with operation defined componentwise:
$$(g_1, h_1) \cdot (g_2, h_2) = (g_1 \ast g_2, h_1 \cdot h_2)$$

**Properties**:
- **Identity**: $(e_G, e_H)$
- **Inverses**: $(g, h)^{-1} = (g^{-1}, h^{-1})$
- **Order**: $|G \times H| = |G| \cdot |H|$ (for finite groups)

### Example 1: $\mathbb{Z}_2 \times \mathbb{Z}_3$

Elements: $\{(0,0), (0,1), (0,2), (1,0), (1,1), (1,2)\}$

Operation (componentwise addition):
$$(1, 2) + (1, 1) = (1+1 \bmod 2, 2+1 \bmod 3) = (0, 0)$$

**Cayley Table**:
$$\begin{array}{c|cccccc}
+ & (0,0) & (0,1) & (0,2) & (1,0) & (1,1) & (1,2) \\
\hline
(0,0) & (0,0) & (0,1) & (0,2) & (1,0) & (1,1) & (1,2) \\
(0,1) & (0,1) & (0,2) & (0,0) & (1,1) & (1,2) & (1,0) \\
(0,2) & (0,2) & (0,0) & (0,1) & (1,2) & (1,0) & (1,1) \\
(1,0) & (1,0) & (1,1) & (1,2) & (0,0) & (0,1) & (0,2) \\
(1,1) & (1,1) & (1,2) & (1,0) & (0,1) & (0,2) & (0,0) \\
(1,2) & (1,2) & (1,0) & (1,1) & (0,2) & (0,0) & (0,1)
\end{array}$$

## When is a Direct Product Cyclic?

A crucial question: when is $G \times H$ cyclic?

**Theorem 1**: Let $G$ and $H$ be finite cyclic groups. Then $G \times H$ is cyclic if and only if $|G|$ and $|H|$ are relatively prime.

**Proof**:
($\Leftarrow$) Suppose $G = \langle a \rangle$ with $|a| = m$ and $H = \langle b \rangle$ with $|b| = n$, where $\gcd(m, n) = 1$.

Consider $(a, b) \in G \times H$. We have:
$$(a, b)^k = (a^k, b^k)$$

This equals $(e_G, e_H)$ if and only if $a^k = e_G$ and $b^k = e_H$, which means $m | k$ and $n | k$.

Since $\gcd(m, n) = 1$, this happens if and only if $mn | k$.

Therefore, $|(a, b)| = mn = |G \times H|$, so $(a, b)$ generates $G \times H$.

($\Rightarrow$) Suppose $G \times H$ is cyclic with generator $(a, b)$. Let $|(a, b)| = d$, $|a| = m$, $|b| = n$.

Then $(e_G, e_H) = (a, b)^d = (a^d, b^d)$, so $m | d$ and $n | d$.

Since $(a, b)$ generates $G \times H$, we need $d = mn$.

If $\gcd(m, n) = g > 1$, then $(a, b)^{mn/g} = (a^{mn/g}, b^{mn/g}) = (e_G, e_G)$, contradicting $|(a, b)| = mn$.

Therefore, $\gcd(m, n) = 1$. $\square$

### Example 2: $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$

Since $\gcd(2, 3) = 1$, the group $\mathbb{Z}_2 \times \mathbb{Z}_3$ is cyclic of order 6.

Generator: $(1, 1)$

Powers of $(1, 1)$:
- $(1, 1)^0 = (0, 0)$
- $(1, 1)^1 = (1, 1)$
- $(1, 1)^2 = (0, 2)$
- $(1, 1)^3 = (1, 0)$
- $(1, 1)^4 = (0, 1)$
- $(1, 1)^5 = (1, 2)$
- $(1, 1)^6 = (0, 0)$

All 6 elements appear, confirming $\mathbb{Z}_2 \times \mathbb{Z}_3$ is cyclic.

By uniqueness of cyclic groups, $\mathbb{Z}_2 \times \mathbb{Z}_3 \cong \mathbb{Z}_6$.

### Example 3: $\mathbb{Z}_2 \times \mathbb{Z}_2$ is NOT Cyclic

Since $\gcd(2, 2) = 2 \neq 1$, this group is not cyclic.

Elements: $\{(0,0), (0,1), (1,0), (1,1)\}$

Check orders:
- $|(0,0)| = 1$
- $|(0,1)| = 2$ (since $(0,1)^2 = (0,0)$)
- $|(1,0)| = 2$ (since $(1,0)^2 = (0,0)$)
- $|(1,1)| = 2$ (since $(1,1)^2 = (0,0)$)

No element has order 4, so the group is not cyclic. This is the Klein four-group $V_4$.

## The Chinese Remainder Theorem

**Theorem 2 (Chinese Remainder Theorem for Groups)**: If $\gcd(m, n) = 1$, then:
$$\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$$

**Proof**: Both groups are cyclic of order $mn$ by Theorem 1, and cyclic groups of the same order are isomorphic. $\square$

**Explicit Isomorphism**: The map $\phi: \mathbb{Z}_{mn} \to \mathbb{Z}_m \times \mathbb{Z}_n$ defined by:
$$\phi(k) = (k \bmod m, k \bmod n)$$
is an isomorphism.

### Example 4: $\mathbb{Z}_{15} \cong \mathbb{Z}_3 \times \mathbb{Z}_5$

Since $\gcd(3, 5) = 1$:

The isomorphism $\phi: \mathbb{Z}_{15} \to \mathbb{Z}_3 \times \mathbb{Z}_5$:
- $\phi(0) = (0, 0)$
- $\phi(1) = (1, 1)$
- $\phi(2) = (2, 2)$
- $\phi(3) = (0, 3)$
- $\phi(7) = (1, 2)$
- $\phi(11) = (2, 1)$
- etc.

## Structure of $\mathbb{Z}_n$

Using prime factorization and the Chinese Remainder Theorem:

**Theorem 3**: If $n = p_1^{e_1} p_2^{e_2} \cdots p_k^{e_k}$ is the prime factorization of $n$, then:
$$\mathbb{Z}_n \cong \mathbb{Z}_{p_1^{e_1}} \times \mathbb{Z}_{p_2^{e_2}} \times \cdots \times \mathbb{Z}_{p_k^{e_k}}$$

**Proof**: Follows from repeated application of the CRT, since the prime powers are pairwise coprime. $\square$

### Example 5: $\mathbb{Z}_{360}$

$360 = 8 \cdot 9 \cdot 5 = 2^3 \cdot 3^2 \cdot 5$

Therefore:
$$\mathbb{Z}_{360} \cong \mathbb{Z}_8 \times \mathbb{Z}_9 \times \mathbb{Z}_5$$

## Direct Products of Multiple Groups

**Definition**: For groups $G_1, G_2, \ldots, G_n$:
$$G_1 \times G_2 \times \cdots \times G_n = \{(g_1, g_2, \ldots, g_n) : g_i \in G_i\}$$

with componentwise operation.

**Theorem 4**: The direct product $G_1 \times \cdots \times G_n$ is cyclic if and only if each $G_i$ is cyclic and the orders are pairwise coprime.

### Example 6: $\mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_5$

Since $\gcd(2, 3) = \gcd(2, 5) = \gcd(3, 5) = 1$:

$$\mathbb{Z}_2 \times \mathbb{Z}_3 \times \mathbb{Z}_5 \cong \mathbb{Z}_{30}$$

Generator: $(1, 1, 1)$ with order $2 \cdot 3 \cdot 5 = 30$.

## Order of Elements in Direct Products

**Theorem 5**: In $G \times H$, the order of $(g, h)$ is $\text{lcm}(|g|, |h|)$.

**Proof**: We have $(g, h)^k = (g^k, h^k) = (e_G, e_H)$ if and only if $|g| | k$ and $|h| | k$, which happens if and only if $\text{lcm}(|g|, |h|) | k$. $\square$

### Example 7

In $\mathbb{Z}_4 \times \mathbb{Z}_6$:
- $|(2, 3)| = \text{lcm}(2, 2) = 2$ (since $|2|_{\mathbb{Z}_4} = 2$ and $|3|_{\mathbb{Z}_6} = 2$)
- $|(1, 1)| = \text{lcm}(4, 6) = 12$
- $|(2, 2)| = \text{lcm}(2, 3) = 6$

## Subgroups of Direct Products

**Theorem 6**: If $H \leq G$ and $K \leq H$, then $H \times K \leq G \times H$.

Not all subgroups have this form! For example, in $\mathbb{Z}_2 \times \mathbb{Z}_2$:
$$\{(0,0), (1,1)\}$$
is a subgroup but not a direct product of subgroups.

### Example 8: Subgroups of $\mathbb{Z}_2 \times \mathbb{Z}_2$

All 5 subgroups:
1. $\{(0,0)\}$
2. $\{(0,0), (1,0)\} = \mathbb{Z}_2 \times \{0\}$
3. $\{(0,0), (0,1)\} = \{0\} \times \mathbb{Z}_2$
4. $\{(0,0), (1,1)\}$ (diagonal subgroup)
5. $\mathbb{Z}_2 \times \mathbb{Z}_2$

## Applications

### Decomposing Finite Abelian Groups

The Fundamental Theorem of Finite Abelian Groups states every finite abelian group is a direct product of cyclic groups. Direct products provide the building blocks.

### Efficient Computation

Computing in $\mathbb{Z}_{360}$ can be done via $\mathbb{Z}_8 \times \mathbb{Z}_9 \times \mathbb{Z}_5$ using the CRT, often more efficiently.

### Cryptography

The RSA algorithm relies on the CRT for efficient decryption using:
$$\mathbb{Z}_n \cong \mathbb{Z}_p \times \mathbb{Z}_q$$
where $n = pq$ for primes $p, q$.

## Summary

Key results:
- $G \times H$ is cyclic $\Leftrightarrow$ $\gcd(|G|, |H|) = 1$
- Chinese Remainder Theorem: $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ when $\gcd(m,n) = 1$
- $|(g, h)| = \text{lcm}(|g|, |h|)$
- $|G \times H| = |G| \cdot |H|$
- $\mathbb{Z}_n$ decomposes as product of prime power cyclic groups

Direct products are fundamental for understanding abelian group structure.
