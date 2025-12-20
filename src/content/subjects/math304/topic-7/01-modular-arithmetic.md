---
title: "Modular Arithmetic"
description: "Foundations of modular arithmetic for cryptography"
---

# Modular Arithmetic

## Introduction

Modular arithmetic, often called "clock arithmetic," forms the mathematical foundation of modern cryptography. Just as a clock resets to 1 after 12 hours, modular arithmetic works with remainders after division by a fixed number. This simple concept underpins sophisticated cryptographic systems including RSA encryption, digital signatures, and secure key exchange protocols. Understanding modular arithmetic is essential for grasping how mathematical structures guarantee the security of digital communications.

The elegance of modular arithmetic lies in its ability to transform infinite sets of integers into finite, manageable structures while preserving essential algebraic properties. This transformation enables efficient computation on large numbers while maintaining mathematical rigor necessary for cryptographic applications.

## Congruence Modulo $n$

**Definition**: Two integers $a$ and $b$ are **congruent modulo $n$** if $n$ divides their difference, written $n | (a - b)$. We express this relationship as:

$$a \equiv b \pmod{n}$$

**Intuition**: $a$ and $b$ leave the same remainder when divided by $n$. For example, $17 \equiv 5 \pmod{12}$ because both leave remainder 5 when divided by 12.

**Alternative characterization**: $a \equiv b \pmod{n}$ if and only if $a = b + kn$ for some integer $k$.

### Examples

- $38 \equiv 14 \pmod{12}$ since $38 - 14 = 24 = 2 \cdot 12$
- $-3 \equiv 7 \pmod{10}$ since $-3 - 7 = -10 = (-1) \cdot 10$
- $100 \equiv 0 \pmod{25}$ since $100 - 0 = 100 = 4 \cdot 25$

## Properties of Congruence

**Theorem**: Congruence modulo $n$ is an **equivalence relation** on $\mathbb{Z}$, satisfying:

1. **Reflexivity**: $a \equiv a \pmod{n}$ for all $a$
2. **Symmetry**: If $a \equiv b \pmod{n}$, then $b \equiv a \pmod{n}$
3. **Transitivity**: If $a \equiv b \pmod{n}$ and $b \equiv c \pmod{n}$, then $a \equiv c \pmod{n}$

This equivalence relation partitions $\mathbb{Z}$ into $n$ distinct **equivalence classes** or **residue classes**: $[0], [1], [2], \ldots, [n-1]$, where $[a] = \{b \in \mathbb{Z} : b \equiv a \pmod{n}\}$.

**Theorem (Preservation of Operations)**: If $a \equiv b \pmod{n}$ and $c \equiv d \pmod{n}$, then:

1. $a + c \equiv b + d \pmod{n}$
2. $a - c \equiv b - d \pmod{n}$
3. $ac \equiv bd \pmod{n}$
4. $a^k \equiv b^k \pmod{n}$ for all positive integers $k$

These properties allow us to perform arithmetic directly on remainders:

- $(a + b) \bmod n = ((a \bmod n) + (b \bmod n)) \bmod n$
- $(ab) \bmod n = ((a \bmod n)(b \bmod n)) \bmod n$

**Warning**: Division doesn't always work! $4 \equiv 8 \pmod{12}$ but $2 \not\equiv 4 \pmod{12}$ after dividing by 2. Division requires careful handling through modular inverses.

## Modular Exponentiation

Computing $a^k \bmod n$ efficiently is crucial for cryptography, where $k$ may have hundreds of digits. Naive computation of $a^k$ followed by reduction modulo $n$ is impractical.

**Solution**: **Repeated squaring** (also called binary exponentiation).

### Algorithm

Express $k$ in binary: $k = k_m 2^m + k_{m-1} 2^{m-1} + \cdots + k_1 2 + k_0$ where each $k_i \in \{0, 1\}$.

Then: $a^k = \prod_{i: k_i = 1} a^{2^i}$

Compute $a^1, a^2, a^4, a^8, \ldots, a^{2^m}$ by successive squaring (each term is the square of the previous, reduced modulo $n$), then multiply the needed powers.

**Complexity**: $O(\log k)$ multiplications instead of $O(k)$ for naive approach.

### Detailed Example

Compute $7^{13} \bmod 11$:

$13 = 8 + 4 + 1 = 2^3 + 2^2 + 2^0$, so $7^{13} = 7^8 \cdot 7^4 \cdot 7^1$

**Step-by-step**:
- $7^1 \equiv 7 \pmod{11}$
- $7^2 = 49 \equiv 5 \pmod{11}$
- $7^4 = (7^2)^2 \equiv 5^2 = 25 \equiv 3 \pmod{11}$
- $7^8 = (7^4)^2 \equiv 3^2 = 9 \pmod{11}$
- $7^{13} = 7^8 \cdot 7^4 \cdot 7^1 \equiv 9 \cdot 3 \cdot 7 = 189 \equiv 2 \pmod{11}$

This method scales to enormous exponents used in RSA (e.g., 2048-bit numbers).

## Modular Inverse

**Definition**: The **modular inverse** of $a$ modulo $n$ is an integer $b$ such that:

$$ab \equiv 1 \pmod{n}$$

We denote this $b = a^{-1} \bmod n$.

**Existence Theorem**: $a$ has a multiplicative inverse modulo $n$ if and only if $\gcd(a, n) = 1$ (i.e., $a$ and $n$ are coprime).

**Proof sketch**: If $\gcd(a, n) = d > 1$, then $ab \equiv 0 \pmod{d}$ for all $b$, so $ab \not\equiv 1 \pmod{n}$. Conversely, if $\gcd(a, n) = 1$, Bezout's identity gives integers $x, y$ with $ax + ny = 1$, so $ax \equiv 1 \pmod{n}$. $\square$

### Extended Euclidean Algorithm

The **Extended Euclidean Algorithm** not only computes $\gcd(a, n)$ but also finds coefficients $x, y$ satisfying Bezout's identity: $ax + ny = \gcd(a, n)$.

If $\gcd(a, n) = 1$, then $x$ is the modular inverse of $a$ modulo $n$.

### Example

Find $7^{-1} \bmod 26$:

Apply Extended Euclidean Algorithm:
```
26 = 3 · 7 + 5
7 = 1 · 5 + 2
5 = 2 · 2 + 1
2 = 2 · 1 + 0
```

Back-substitution:
```
1 = 5 - 2 · 2
  = 5 - 2 · (7 - 1 · 5) = 3 · 5 - 2 · 7
  = 3 · (26 - 3 · 7) - 2 · 7 = 3 · 26 - 11 · 7
```

Thus $-11 \cdot 7 + 3 \cdot 26 = 1$, so $7^{-1} \equiv -11 \equiv 15 \pmod{26}$.

**Verification**: $7 \cdot 15 = 105 = 4 \cdot 26 + 1 \equiv 1 \pmod{26}$. ✓

## Chinese Remainder Theorem

The **Chinese Remainder Theorem (CRT)** is a powerful tool for solving systems of congruences.

**Theorem**: If $\gcd(m, n) = 1$, the system of congruences
$$x \equiv a \pmod{m}, \quad x \equiv b \pmod{n}$$
has a unique solution modulo $mn$.

**Constructive proof**: Let $M = mn$. Since $\gcd(m, n) = 1$, there exist $u, v$ with $um + vn = 1$. Set:
$$x = a(vn) + b(um)$$

Then $x \equiv a(vn) \equiv a(1 - um) \equiv a \pmod{m}$ and similarly $x \equiv b \pmod{n}$. $\square$

**Generalization**: For pairwise coprime moduli $n_1, \ldots, n_k$, the system
$$x \equiv a_i \pmod{n_i}, \quad i = 1, \ldots, k$$
has unique solution modulo $N = n_1 \cdots n_k$.

### Cryptographic Application

CRT provides significant speedup for RSA decryption. Instead of computing $m \equiv c^d \pmod{n}$ directly, compute:
- $m_p \equiv c^{d_p} \pmod{p}$ where $d_p = d \bmod (p-1)$
- $m_q \equiv c^{d_q} \pmod{q}$ where $d_q = d \bmod (q-1)$

Then use CRT to combine $m_p$ and $m_q$ into $m \bmod n$. This is approximately 4 times faster!

## Summary

Modular arithmetic provides the fundamental algebraic structure for modern cryptography:

- **Congruence**: $a \equiv b \pmod{n}$ if $n | (a-b)$, forming an equivalence relation
- **Operations**: Addition, subtraction, and multiplication preserve congruence
- **Efficient exponentiation**: Repeated squaring enables practical computation of $a^k \bmod n$
- **Modular inverse**: Exists when $\gcd(a, n) = 1$, computed via Extended Euclidean Algorithm
- **Chinese Remainder Theorem**: Solves systems of congruences, optimizes RSA operations

These concepts transform infinite arithmetic into finite, computationally tractable structures while preserving the mathematical properties essential for secure cryptographic protocols. Modular arithmetic is not merely theoretical—it is the computational engine powering every encrypted message, digital signature, and secure connection on the internet.

## Key Takeaways

- Modular arithmetic reduces infinite integer arithmetic to finite arithmetic on residue classes
- The ring structure of $\mathbb{Z}_n$ enables secure cryptographic operations
- Efficient algorithms (repeated squaring, Extended Euclidean Algorithm) make large-number modular arithmetic practical
- The Chinese Remainder Theorem provides both theoretical insight and practical optimization
- Understanding modular arithmetic is essential for analyzing cryptographic security
