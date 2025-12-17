---
title: "Corollaries of Lagrange's Theorem"
description: "Important consequences and applications of Lagrange's Theorem"
---

# Corollaries of Lagrange's Theorem

## Fundamental Corollaries

### Corollary 1: Element Order Divides Group Order

**Statement**: If $G$ is finite and $g \in G$, then $|g|$ divides $|G|$.

**Proof**: $|g| = |\langle g \rangle|$ divides $|G|$ by Lagrange. $\square$

**Application**: In a group of order 20, possible element orders are 1, 2, 4, 5, 10, 20.

### Corollary 2: $g^{|G|} = e$

**Statement**: For any $g$ in finite group $G$: $g^{|G|} = e$.

**Proof**: If $|g| = k$, then $k | |G|$, so $|G| = km$. Thus $g^{|G|} = (g^k)^m = e^m = e$. $\square$

**Applications**:
- **Fermat's Little Theorem**: $a^p \equiv a \pmod{p}$ for prime $p$
- **Euler's Theorem**: $a^{\phi(n)} \equiv 1 \pmod{n}$ when $\gcd(a,n) = 1$

### Corollary 3: Prime Order Groups Are Cyclic

**Statement**: If $|G| = p$ (prime), then $G \cong \mathbb{Z}_p$.

**Proof**: Any $g \neq e$ has order dividing $p$. Since $p$ is prime and $|g| > 1$, we have $|g| = p$, so $G = \langle g \rangle$. $\square$

**Example**: All groups of order 7 are isomorphic to $\mathbb{Z}_7$.

## Index Calculations

### Corollary 4: Index Formula

**Statement**: $[G : H] = |G|/|H|$ for finite groups.

**Example**: $[S_4 : A_4] = 24/12 = 2$.

### Corollary 5: Tower Law

**Statement**: If $K \leq H \leq G$, then $[G:K] = [G:H][H:K]$.

**Proof**: Cosets of $K$ in $G$ partition into cosets of $K$ in $H$, which partition into cosets of $H$ in $G$. $\square$

**Example**: $[\mathbb{Z} : 12\mathbb{Z}] = [\mathbb{Z} : 4\mathbb{Z}][4\mathbb{Z} : 12\mathbb{Z}] = 4 \cdot 3 = 12$. ✓

## Existence Results

### Corollary 6: Subgroups of Prime Index

**Statement**: If $[G:H] = p$ (prime), then $H$ is maximal (no proper subgroup strictly between $H$ and $G$).

**Proof**: If $H < K < G$, then $[G:H] = [G:K][K:H]$. Both factors are $> 1$, contradicting $p$ prime. $\square$

### Corollary 7: No Subgroup of Order 6 in $A_4$

$|A_4| = 12$. If $H \leq A_4$ with $|H| = 6$, then $[A_4:H] = 2$. But this would make $H$ normal (index 2 subgroups are normal), and $A_4$ has no normal subgroup of order 6.

## Non-Existence Results

**Limitation**: Lagrange does NOT guarantee existence of subgroups.

**Example**: No group has a subgroup of every divisor order in general.

$A_4$ (order 12) has no subgroup of order 6, even though $6 | 12$.

## Applications to Specific Groups

### In Cyclic Groups

**Theorem**: $\mathbb{Z}_n$ has a unique subgroup of order $d$ for each $d | n$.

Already covered in cyclic groups section.

### In Symmetric Groups

**Example**: $S_n$ has subgroups of many orders, but not all divisors of $n!$.

### In Dihedral Groups

$D_n$ has order $2n$. Subgroup orders divide $2n$.

**Example**: $D_6$ has order 12. Possible subgroup orders: 1, 2, 3, 4, 6, 12.

## Counting Elements

### Corollary 8: Partition by Order

$$|G| = \sum_{d | |G|} \psi(d)$$

where $\psi(d)$ is the number of elements of order $d$.

**For cyclic groups**: $\psi(d) = \phi(d)$ (Euler's totient).

### Example

$\mathbb{Z}_{12}$: $12 = \phi(1) + \phi(2) + \phi(3) + \phi(4) + \phi(6) + \phi(12) = 1 + 1 + 2 + 2 + 2 + 4 = 12$. ✓

## Impossibility Results

### Corollary 9: Order Restrictions

If $|G| = 15$, no element can have order 4, 6, 8, 9, 10, 12, etc. (non-divisors).

### Corollary 10: Subgroup Constraints

In group of order $p^2$ ($p$ prime), every non-identity element has order $p$ or $p^2$.

**Proof**: Order divides $p^2$, so order is 1, $p$, or $p^2$. Only identity has order 1. $\square$

## Summary Table

| Corollary | Statement | Application |
|-----------|-----------|-------------|
| Element Order | $|g|$ divides $|G|$ | Restricts possible orders |
| Power Formula | $g^{|G|} = e$ | Fermat, Euler |
| Prime Order | $|G| = p \Rightarrow G$ cyclic | Classification |
| Index Formula | $[G:H] = |G|/|H|$ | Computing cosets |
| Tower Law | $[G:K] = [G:H][H:K]$ | Nested subgroups |

These corollaries make Lagrange's Theorem one of the most useful results in finite group theory.
