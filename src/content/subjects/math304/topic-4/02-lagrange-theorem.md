---
title: "Lagrange's Theorem"
description: "The fundamental theorem relating subgroup order to group order"
---

# Lagrange's Theorem

## Statement

**Lagrange's Theorem**: If $H$ is a subgroup of finite group $G$, then $|H|$ divides $|G|$. Moreover:
$$|G| = |H| \cdot [G:H]$$

where $[G:H]$ is the number of distinct left (or right) cosets of $H$ in $G$.

## Proof

The left cosets of $H$ partition $G$ into disjoint sets, each of size $|H|$.

If there are $k$ distinct cosets, then:
$$|G| = k \cdot |H| = [G:H] \cdot |H|$$

Therefore $|H|$ divides $|G|$. $\square$

## Immediate Consequences

**Corollary 1**: The order of any element divides the order of the group.

**Proof**: If $a \in G$, then $|\langle a \rangle|$ divides $|G|$ by Lagrange. But $|\langle a \rangle| = |a|$. $\square$

**Corollary 2**: If $|G| = p$ (prime), then $G$ is cyclic.

**Proof**: Let $a \in G$, $a \neq e$. Then $|a| > 1$ divides $p$. Since $p$ is prime, $|a| = p$, so $\langle a \rangle = G$. $\square$

**Corollary 3**: For $g \in G$, we have $g^{|G|} = e$.

**Proof**: Let $|g| = k$. Then $k | |G|$, so $|G| = km$ for some $m$. Thus:
$$g^{|G|} = g^{km} = (g^k)^m = e^m = e$$
$\square$

This generalizes Fermat's Little Theorem!

## Examples

### Example 1

$G = S_3$, $|G| = 6$. Possible subgroup orders: 1, 2, 3, 6 (divisors of 6).

Indeed:
- Order 1: $\{e\}$
- Order 2: $\{e, (1\,2)\}$, $\{e, (1\,3)\}$, $\{e, (2\,3)\}$
- Order 3: $\{e, (1\,2\,3), (1\,3\,2)\}$
- Order 6: $S_3$

### Example 2

$G = \mathbb{Z}_{12}$, $|G| = 12$. Divisors: 1, 2, 3, 4, 6, 12.

Subgroups:
- $|\langle 6 \rangle| = 2$ ✓
- $|\langle 4 \rangle| = 3$ ✓
- $|\langle 3 \rangle| = 4$ ✓
- $|\langle 2 \rangle| = 6$ ✓

All subgroup orders divide 12.

### Example 3

No subgroup of $S_3$ has order 4 or 5 (don't divide 6).

## Computing Index

From $|G| = |H| \cdot [G:H]$:
$$[G:H] = \frac{|G|}{|H|}$$

### Example 4

$H = A_5 \leq S_5$. Then $|H| = 60$, $|G| = 120$, so:
$$[S_5 : A_5] = \frac{120}{60} = 2$$

## Non-Converse

**Warning**: Lagrange's theorem does NOT say: "If $d | |G|$, then there exists a subgroup of order $d$."

**Counterexample**: $A_4$ has order 12, but no subgroup of order 6!

Divisors of 12: 1, 2, 3, 4, 6, 12.
$A_4$ has subgroups of orders 1, 2, 3, 4, 12 but NOT 6.

## Historical Note

Joseph-Louis Lagrange (1736-1813) proved this for permutation groups. The general version came later with the abstract definition of groups.

## Applications

### Application 1: Element Orders in Finite Groups

In group of order 30, possible element orders: 1, 2, 3, 5, 6, 10, 15, 30 (divisors of 30).

### Application 2: Prime Order Groups

**Theorem**: Every group of prime order is cyclic.

Already proven using Lagrange.

### Application 3: Counting Subgroups

If $|G| = 15 = 3 \cdot 5$, possible subgroup orders: 1, 3, 5, 15.

## Tower Law

**Theorem**: If $K \leq H \leq G$, then:
$$[G:K] = [G:H] \cdot [H:K]$$

**Proof**: Count cosets. Each coset of $K$ in $G$ is a union of cosets of $K$ in $H$. $\square$

**Corollary**: $|G| = |K| \cdot [G:K] = |K| \cdot [G:H] \cdot [H:K]$.

### Example 5

$\{0\} \leq 4\mathbb{Z} \leq 2\mathbb{Z} \leq \mathbb{Z}$

Check: $[2\mathbb{Z} : 4\mathbb{Z}] = 2$ and $[\mathbb{Z} : 2\mathbb{Z}] = 2$, so $[\mathbb{Z} : 4\mathbb{Z}] = 2 \cdot 2 = 4$. ✓

## Summary

Lagrange's Theorem:
- $|H|$ divides $|G|$ for any subgroup $H$
- $|G| = |H| \cdot [G:H]$
- Element order divides group order
- Prime order implies cyclic
- Does NOT guarantee existence of subgroups of each divisor order

One of the most fundamental theorems in group theory.
