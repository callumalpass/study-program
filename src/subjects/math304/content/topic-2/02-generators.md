---
title: "Generators of Cyclic Groups"
description: "Identifying and characterizing generators of cyclic groups"
---

# Generators of Cyclic Groups

## Multiple Generators

A cyclic group can have more than one generator. Understanding which elements generate a cyclic group is crucial for applications in number theory and cryptography.

**Definition**: An element $g$ is a **generator** (or **primitive element**) of group $G$ if $G = \langle g \rangle$.

## Generators of Infinite Cyclic Groups

**Theorem 1**: The infinite cyclic group $\mathbb{Z}$ has exactly two generators: 1 and -1.

**Proof**: Clearly $\mathbb{Z} = \langle 1 \rangle = \langle -1 \rangle$.

Suppose $\mathbb{Z} = \langle k \rangle$ for some $k \in \mathbb{Z}$. Then $1 \in \mathbb{Z} = \langle k \rangle$, so $1 = nk$ for some integer $n$. This gives $k = \pm 1$.

Therefore, 1 and -1 are the only generators. $\square$

**Generalization**: If $G = \langle a \rangle$ is infinite cyclic, then $G$ has exactly two generators: $a$ and $a^{-1}$.

## Generators of Finite Cyclic Groups

For finite cyclic groups, the situation is more interesting.

**Theorem 2**: Let $G = \langle a \rangle$ be a cyclic group of order $n$. Then $a^k$ is a generator of $G$ if and only if $\gcd(k, n) = 1$.

**Proof**: We have $|a| = n$ and need to determine when $|\langle a^k \rangle| = n$.

By the formula for orders of powers:
$$|a^k| = \frac{n}{\gcd(n, k)}$$

Thus:
$$|\langle a^k \rangle| = |a^k| = \frac{n}{\gcd(n, k)} = n \Leftrightarrow \gcd(n, k) = 1$$

Therefore, $a^k$ generates $G$ if and only if $\gcd(k, n) = 1$. $\square$

**Consequence**: A cyclic group of order $n$ has exactly $\phi(n)$ generators, where $\phi$ is Euler's totient function.

### Examples

**Example 1**: Generators of $\mathbb{Z}_6$

Since $\mathbb{Z}_6 = \langle 1 \rangle$, we check which powers of 1 generate the group:
- $\gcd(1, 6) = 1$ ✓ $\implies$ 1 is a generator
- $\gcd(2, 6) = 2$ ✗ $\implies$ 2 is not a generator ($\langle 2 \rangle = \{0, 2, 4\}$)
- $\gcd(3, 6) = 3$ ✗ $\implies$ 3 is not a generator ($\langle 3 \rangle = \{0, 3\}$)
- $\gcd(4, 6) = 2$ ✗ $\implies$ 4 is not a generator ($\langle 4 \rangle = \{0, 4, 2\}$)
- $\gcd(5, 6) = 1$ ✓ $\implies$ 5 is a generator

Generators: 1 and 5. Total: $\phi(6) = 2$ generators.

**Example 2**: Generators of $\mathbb{Z}_{12}$

Elements coprime to 12: $\{1, 5, 7, 11\}$

These are the generators of $\mathbb{Z}_{12}$. Total: $\phi(12) = 4$ generators.

Verification for 5:
- $1 \cdot 5 = 5$
- $2 \cdot 5 = 10$
- $3 \cdot 5 = 15 \equiv 3 \pmod{12}$
- $4 \cdot 5 = 20 \equiv 8 \pmod{12}$
- $5 \cdot 5 = 25 \equiv 1 \pmod{12}$
- $6 \cdot 5 = 30 \equiv 6 \pmod{12}$
- $7 \cdot 5 = 35 \equiv 11 \pmod{12}$
- $8 \cdot 5 = 40 \equiv 4 \pmod{12}$
- $9 \cdot 5 = 45 \equiv 9 \pmod{12}$
- $10 \cdot 5 = 50 \equiv 2 \pmod{12}$
- $11 \cdot 5 = 55 \equiv 7 \pmod{12}$
- $12 \cdot 5 = 60 \equiv 0 \pmod{12}$

All elements of $\mathbb{Z}_{12}$ appear, confirming 5 is a generator.

**Example 3**: Generators of $\mathbb{Z}_p$ for prime $p$

When $p$ is prime, $\phi(p) = p - 1$, so $\mathbb{Z}_p$ has $p - 1$ generators.

The generators are: $\{1, 2, 3, \ldots, p-1\}$ (all nonzero elements).

For $\mathbb{Z}_7$: generators are $\{1, 2, 3, 4, 5, 6\}$.

## Finding Generators Systematically

To find all generators of $\mathbb{Z}_n$:

1. **Compute** $\phi(n)$ (number of integers from 1 to $n$ coprime to $n$)
2. **List** all $k$ with $1 \leq k < n$ and $\gcd(k, n) = 1$
3. These are precisely the generators

**Example**: Find generators of $\mathbb{Z}_{20}$

$$\phi(20) = \phi(4 \cdot 5) = \phi(2^2 \cdot 5) = 20 \cdot (1 - \frac{1}{2})(1 - \frac{1}{5}) = 20 \cdot \frac{1}{2} \cdot \frac{4}{5} = 8$$

Elements coprime to 20: $\{1, 3, 7, 9, 11, 13, 17, 19\}$

These 8 elements are the generators of $\mathbb{Z}_{20}$.

## Generators of $U(n)$

The group $U(n)$ consists of units modulo $n$ under multiplication. Finding generators is more challenging.

**Definition**: A generator of $U(n)$ is called a **primitive root modulo $n$**.

**Theorem 3**: Primitive roots modulo $n$ exist if and only if $n = 1, 2, 4, p^k$, or $2p^k$ where $p$ is an odd prime and $k \geq 1$.

### Examples

**Example 1**: $U(7) = \{1, 2, 3, 4, 5, 6\}$

Since 7 is prime, $|U(7)| = \phi(7) = 6$.

Check if 3 is a generator:
- $3^1 = 3$
- $3^2 = 9 \equiv 2 \pmod{7}$
- $3^3 = 27 \equiv 6 \pmod{7}$
- $3^4 = 81 \equiv 4 \pmod{7}$
- $3^5 = 243 \equiv 5 \pmod{7}$
- $3^6 = 729 \equiv 1 \pmod{7}$

All elements appear, so 3 is a primitive root modulo 7.

Other primitive roots modulo 7: 3 and 5 (there are $\phi(6) = 2$ primitive roots).

**Example 2**: $U(8) = \{1, 3, 5, 7\}$

$|U(8)| = \phi(8) = 4$

Check orders:
- $|1| = 1$
- $|3| = 2$ (since $3^2 = 9 \equiv 1 \pmod{8}$)
- $|5| = 2$ (since $5^2 = 25 \equiv 1 \pmod{8}$)
- $|7| = 2$ (since $7^2 = 49 \equiv 1 \pmod{8}$)

No element has order 4, so $U(8)$ is not cyclic!

This illustrates that $U(n)$ is not always cyclic. By Theorem 3, there are no primitive roots modulo 8.

## Relationship Between Generators

**Theorem 4**: If $g$ is a generator of cyclic group $G$ of order $n$, then $g^k$ is also a generator if and only if $\gcd(k, n) = 1$.

**Proof**: Already proven in Theorem 2. $\square$

**Corollary**: If $g$ and $h$ are both generators of cyclic group $G$ of order $n$, then $h = g^k$ for some $k$ with $\gcd(k, n) = 1$.

### Example

In $\mathbb{Z}_8$, both 1 and 3 are generators.

Express 3 in terms of 1: $3 = 3 \cdot 1$.

Check: $\gcd(3, 8) = 1$ ✓

Similarly, $5 = 5 \cdot 1$ and $\gcd(5, 8) = 1$ ✓

And $7 = 7 \cdot 1$ and $\gcd(7, 8) = 1$ ✓

## Applications to Cryptography

### Diffie-Hellman Key Exchange

The Diffie-Hellman protocol uses a cyclic group $\langle g \rangle$ of large prime order $p$. Security relies on the discrete logarithm problem in this group.

**Setup**: Public parameters are a large prime $p$ and a generator $g$ of $\mathbb{Z}_p^*$.

The choice of generator is crucial for security.

### Primitive Roots in Practice

Finding primitive roots modulo large primes is important for:
- Cryptographic protocols (DH, ElGamal)
- Pseudorandom number generation
- Hash functions

**Algorithm**: To find a primitive root modulo prime $p$:
1. Compute $\phi(p) = p - 1$
2. Factor $p - 1 = q_1^{e_1} \cdots q_k^{e_k}$
3. For candidate $g = 2, 3, 4, \ldots$:
   - Check if $g^{(p-1)/q_i} \not\equiv 1 \pmod{p}$ for all prime factors $q_i$
   - If all checks pass, $g$ is a primitive root

## Summary Table

| Group | Order | Number of Generators | Generators |
|-------|-------|---------------------|------------|
| $\mathbb{Z}$ | $\infty$ | 2 | $\pm 1$ |
| $\mathbb{Z}_n$ | $n$ | $\phi(n)$ | $k$ with $\gcd(k,n)=1$ |
| $\mathbb{Z}_p$ (prime) | $p$ | $p-1$ | $1, 2, \ldots, p-1$ |
| $U(p)$ (prime) | $p-1$ | $\phi(p-1)$ | Primitive roots mod $p$ |
| $\mu_n$ (roots of unity) | $n$ | $\phi(n)$ | $e^{2\pi i k/n}$ with $\gcd(k,n)=1$ |

## Exercises Preview

Key questions about generators:
1. How many generators does $\mathbb{Z}_{100}$ have?
2. Is 2 a primitive root modulo 13?
3. Find all generators of $\mathbb{Z}_{18}$
4. Prove $U(12)$ is not cyclic

Understanding generators is essential for working with cyclic groups effectively.
