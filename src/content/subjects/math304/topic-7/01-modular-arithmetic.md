---
title: "Modular Arithmetic"
description: "Foundations of modular arithmetic for cryptography"
---

# Modular Arithmetic

## Congruence Modulo $n$

**Definition**: Integers $a$ and $b$ are **congruent modulo $n$** if $n | (a - b)$.

Write: $a \equiv b \pmod{n}$.

## Properties

**Theorem**: Modular arithmetic operations:
- $(a + b) \bmod n = ((a \bmod n) + (b \bmod n)) \bmod n$
- $(ab) \bmod n = ((a \bmod n)(b \bmod n)) \bmod n$

**Congruence** is an equivalence relation, partitioning $\mathbb{Z}$ into $n$ equivalence classes.

## Modular Exponentiation

Computing $a^k \bmod n$ efficiently using **repeated squaring**:

$$a^{13} = a^8 \cdot a^4 \cdot a^1$$

Compute $a^1, a^2, a^4, a^8$ by successive squaring, combine needed powers.

**Example**: $7^{13} \bmod 11$
- $7^1 \equiv 7$
- $7^2 \equiv 5$
- $7^4 \equiv 3$
- $7^8 \equiv 9$
- $7^{13} = 7^8 \cdot 7^4 \cdot 7^1 \equiv 9 \cdot 3 \cdot 7 \equiv 2 \pmod{11}$

## Modular Inverse

**Definition**: $a^{-1} \bmod n$ is the inverse of $a$ modulo $n$: $aa^{-1} \equiv 1 \pmod{n}$.

**Existence**: $a$ has inverse mod $n$ iff $\gcd(a, n) = 1$.

**Extended Euclidean Algorithm** computes inverse efficiently.

### Example

Find $7^{-1} \bmod 26$:
Extended GCD gives: $15 \cdot 7 - 4 \cdot 26 = 1$, so $7^{-1} \equiv 15 \pmod{26}$.

## Chinese Remainder Theorem

**Theorem**: If $\gcd(m, n) = 1$, the system
$$x \equiv a \pmod{m}, \quad x \equiv b \pmod{n}$$
has unique solution modulo $mn$.

**Application**: RSA decryption speedup.

## Summary

- Congruence: $a \equiv b \pmod{n}$ iff $n | (a-b)$
- Operations preserve congruence
- Efficient exponentiation via repeated squaring
- Modular inverse when $\gcd(a,n) = 1$
- CRT for solving simultaneous congruences

Modular arithmetic is the mathematical foundation of modern cryptography.
