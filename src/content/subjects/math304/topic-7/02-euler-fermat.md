---
title: "Euler's and Fermat's Theorems"
description: "Fundamental number-theoretic results for cryptography"
---

# Euler's and Fermat's Theorems

## Euler's Totient Function

**Definition**: $\phi(n) = |\{k : 1 \leq k \leq n, \gcd(k,n) = 1\}|$

Count of integers up to $n$ coprime to $n$.

**Formula**: If $n = p_1^{a_1} \cdots p_k^{a_k}$:
$$\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right)$$

**Examples**:
- $\phi(12) = 12 \cdot (1 - 1/2)(1 - 1/3) = 4$
- $\phi(p) = p - 1$ for prime $p$
- $\phi(p^k) = p^{k-1}(p-1)$

## Euler's Theorem

**Theorem**: If $\gcd(a, n) = 1$, then:
$$a^{\phi(n)} \equiv 1 \pmod{n}$$

**Proof**: Group-theoretic. $U(n)$ has order $\phi(n)$. For $a \in U(n)$, order divides $\phi(n)$ by Lagrange, so $a^{\phi(n)} = 1$. $\square$

**Application**: Computing modular inverses.

### Example

$7^{\phi(12)} = 7^4 \equiv 1 \pmod{12}$.

Verify: $7^4 = 2401 = 200 \cdot 12 + 1 \equiv 1$. ✓

## Fermat's Little Theorem

**Theorem**: If $p$ is prime and $\gcd(a, p) = 1$:
$$a^{p-1} \equiv 1 \pmod{p}$$

**Corollary**: $a^p \equiv a \pmod{p}$ for all $a$.

**Proof**: Special case of Euler ($\phi(p) = p - 1$). $\square$

### Examples

- $2^{10} \equiv 1 \pmod{11}$
- $3^6 \equiv 1 \pmod{7}$

## Applications

### RSA Correctness

RSA uses: $(m^e)^d \equiv m^{ed} \equiv m^{1 + k\phi(n)} \equiv m \pmod{n}$

Where $ed \equiv 1 \pmod{\phi(n)}$.

### Primality Testing

Fermat test: If $a^{n-1} \not\equiv 1 \pmod{n}$, then $n$ is composite.

(Probabilistic test; Carmichael numbers fool it.)

### Computing Large Powers

$7^{222} \bmod 11$: Since $7^{10} \equiv 1$ and $222 = 22 \cdot 10 + 2$:
$$7^{222} \equiv 7^2 \equiv 5 \pmod{11}$$

## Summary

- $\phi(n)$: count of coprimes to $n$
- Euler: $a^{\phi(n)} \equiv 1 \pmod{n}$ when $\gcd(a,n) = 1$
- Fermat: $a^{p-1} \equiv 1 \pmod{p}$ for prime $p$
- Foundation for RSA and primality testing

These theorems are cornerstones of computational number theory and cryptography.
