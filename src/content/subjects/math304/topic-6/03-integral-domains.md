---
title: "Integral Domains"
description: "Rings without zero divisors and their properties"
---

# Integral Domains

## Definition

**Definition**: A **commutative ring with unity and no zero divisors** is called an **integral domain**.

Requirements:
1. Commutative: $ab = ba$
2. Has unity 1
3. No zero divisors: $ab = 0 \Rightarrow a = 0$ or $b = 0$

## Examples

### Example 1: $\mathbb{Z}$

The integers form an integral domain.

### Example 2: $\mathbb{Z}[x]$

Polynomials with integer coefficients.

### Example 3: $\mathbb{Z}[i]$

Gaussian integers: $\{a + bi : a,b \in \mathbb{Z}\}$.

### Example 4: Any Field

Every field is an integral domain (proven next section).

## Non-Examples

### Non-Example 1: $\mathbb{Z}_6$

Has zero divisors: $2 \cdot 3 = 0$ but $2 \neq 0, 3 \neq 0$.

Not an integral domain.

### Non-Example 2: $M_2(\mathbb{R})$

Matrix ring is non-commutative, so not an integral domain.

## Properties

**Theorem 1**: In an integral domain, cancellation holds.

If $a \neq 0$ and $ab = ac$, then $b = c$.

**Theorem 2**: Finite integral domains are fields (proven later).

**Theorem 3**: If $D$ is an integral domain, then $\text{char}(D) = 0$ or prime.

## $\mathbb{Z}_n$ as Integral Domain

**Theorem**: $\mathbb{Z}_n$ is an integral domain iff $n$ is prime.

**Proof**:
($\Leftarrow$) If $n = p$ prime and $ab \equiv 0 \pmod p$, then $p | ab$, so $p | a$ or $p | b$. Thus $a \equiv 0$ or $b \equiv 0 \pmod p$. ✓

($\Rightarrow$) If $n$ composite, say $n = ab$ with $1 < a, b < n$, then $ab \equiv 0 \pmod n$ with $a, b \not\equiv 0$, contradiction. $\square$

## Summary

- Integral domain: commutative ring with 1, no zero divisors
- Examples: $\mathbb{Z}, \mathbb{Z}[x], \mathbb{Z}[i]$, fields
- $\mathbb{Z}_p$ is integral domain iff $p$ prime
- Cancellation law holds
- Building block between rings and fields

Integral domains are the "nicest" rings short of being fields.
