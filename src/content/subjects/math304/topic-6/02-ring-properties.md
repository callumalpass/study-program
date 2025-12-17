---
title: "Ring Properties"
description: "Fundamental properties and theorems about rings"
---

# Ring Properties

## Basic Properties

**Theorem 1**: In any ring $R$:
1. $0 \cdot a = a \cdot 0 = 0$ for all $a \in R$
2. $(-a)b = a(-b) = -(ab)$
3. $(-a)(-b) = ab$
4. If $R$ has unity 1, then it is unique

**Proof of (1)**: $0 \cdot a = (0+0) \cdot a = 0 \cdot a + 0 \cdot a$. Cancel $0 \cdot a$ to get $0 = 0 \cdot a$. $\square$

## Cancellation Laws

**Theorem 2**: If $a \in R$ is not a zero divisor and $ab = ac$, then $b = c$ (left cancellation).

**Proof**: $ab = ac \Rightarrow ab - ac = 0 \Rightarrow a(b - c) = 0$. Since $a$ is not a zero divisor, $b - c = 0$, so $b = c$. $\square$

**Warning**: Cancellation fails with zero divisors!

In $\mathbb{Z}_6$: $2 \cdot 1 = 2 \cdot 4 = 2$ but $1 \neq 4$.

## Characteristic

**Definition**: The **characteristic** of ring $R$ is the smallest positive $n$ such that $n \cdot 1 = 0$, or 0 if no such $n$ exists.

Notation: $\text{char}(R)$.

### Examples

- $\text{char}(\mathbb{Z}) = 0$
- $\text{char}(\mathbb{Q}) = 0$
- $\text{char}(\mathbb{Z}_n) = n$
- $\text{char}(\mathbb{Z}_p) = p$ for prime $p$

**Theorem**: If $R$ has no zero divisors, then $\text{char}(R) = 0$ or prime.

## Subrings

**Definition**: Subset $S \subseteq R$ is a **subring** if $S$ is a ring under the same operations.

**Subring Test**: $S \subseteq R$ is a subring iff:
1. $S \neq \emptyset$
2. $a - b \in S$ for all $a, b \in S$
3. $ab \in S$ for all $a, b \in S$

### Examples

- $\mathbb{Z} \subseteq \mathbb{Q} \subseteq \mathbb{R} \subseteq \mathbb{C}$
- $\mathbb{Z}[i] = \{a + bi : a, b \in \mathbb{Z}\} \subseteq \mathbb{C}$ (Gaussian integers)

## Ring Homomorphisms

**Definition**: Function $\phi: R \to S$ is a **ring homomorphism** if:
1. $\phi(a + b) = \phi(a) + \phi(b)$
2. $\phi(ab) = \phi(a)\phi(b)$

Note: Preserves both operations!

**Properties**:
- $\phi(0_R) = 0_S$
- $\phi(-a) = -\phi(a)$
- If $R$ has unity, $\phi(1_R)$ is idempotent in $S$ (may not be $1_S$)

### Example

$\phi: \mathbb{Z} \to \mathbb{Z}_n$ by $\phi(k) = k \bmod n$ is a ring homomorphism.

## Direct Products

**Definition**: For rings $R$ and $S$, the **direct product** $R \times S$ has:
- Addition: $(r_1, s_1) + (r_2, s_2) = (r_1 + r_2, s_1 + s_2)$
- Multiplication: $(r_1, s_1)(r_2, s_2) = (r_1r_2, s_1s_2)$

### Example

$\mathbb{Z}_2 \times \mathbb{Z}_3$ is a ring of order 6.

**Chinese Remainder Theorem**: $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$ when $\gcd(m,n) = 1$.

## Summary

- Multiplication by 0 gives 0
- Cancellation holds without zero divisors
- Characteristic: smallest $n$ with $n \cdot 1 = 0$
- Subrings, homomorphisms generalize group concepts
- Direct products combine rings

Ring properties extend and enrich group theory concepts.
