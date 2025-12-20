---
title: "Euler's and Fermat's Theorems"
description: "Fundamental number-theoretic results for cryptography"
---

# Euler's and Fermat's Theorems

## Introduction

Euler's theorem and Fermat's Little Theorem stand among the most profound and practically useful results in number theory. These theorems describe the behavior of exponentiation in modular arithmetic, revealing deep structural properties of integers. In cryptography, they are not merely theoretical curiosities—they provide the mathematical guarantees that make public-key cryptography possible. Without these results, RSA encryption, digital signatures, and secure key exchange would be impossible.

The power of these theorems lies in their ability to predict when exponential expressions "wrap around" to the identity element, enabling efficient computation of modular inverses and providing the foundation for cryptographic correctness proofs.

## Euler's Totient Function

**Definition**: Euler's totient function $\phi(n)$ counts the positive integers up to $n$ that are relatively prime to $n$:

$$\phi(n) = |\{k : 1 \leq k \leq n, \gcd(k,n) = 1\}|$$

The totient function measures the size of the multiplicative group $U(n) = (\mathbb{Z}_n)^* = \{a \in \mathbb{Z}_n : \gcd(a, n) = 1\}$, which consists of all elements in $\mathbb{Z}_n$ that have multiplicative inverses.

### Computing $\phi(n)$

**For prime $p$**: Every positive integer less than $p$ is coprime to $p$, so:
$$\phi(p) = p - 1$$

**For prime power $p^k$**: The only integers not coprime to $p^k$ are multiples of $p$: $p, 2p, 3p, \ldots, p^{k-1} \cdot p$. There are $p^{k-1}$ such multiples, so:
$$\phi(p^k) = p^k - p^{k-1} = p^{k-1}(p - 1)$$

**General formula**: If $n = p_1^{a_1} p_2^{a_2} \cdots p_k^{a_k}$ is the prime factorization of $n$, then $\phi$ is multiplicative:
$$\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right) = \prod_{i=1}^{k} p_i^{a_i - 1}(p_i - 1)$$

### Examples

**Example 1**: $\phi(12)$

Since $12 = 2^2 \cdot 3$:
$$\phi(12) = 12 \cdot \left(1 - \frac{1}{2}\right) \cdot \left(1 - \frac{1}{3}\right) = 12 \cdot \frac{1}{2} \cdot \frac{2}{3} = 4$$

The integers coprime to 12 are: $\{1, 5, 7, 11\}$. Count: 4. ✓

**Example 2**: $\phi(100)$

Since $100 = 2^2 \cdot 5^2$:
$$\phi(100) = 100 \cdot \left(1 - \frac{1}{2}\right) \cdot \left(1 - \frac{1}{5}\right) = 100 \cdot \frac{1}{2} \cdot \frac{4}{5} = 40$$

**Example 3**: RSA modulus $n = pq$ for distinct primes $p, q$:
$$\phi(n) = \phi(pq) = \phi(p)\phi(q) = (p-1)(q-1)$$

This formula is central to RSA key generation.

## Euler's Theorem

**Theorem (Euler)**: If $\gcd(a, n) = 1$, then:
$$a^{\phi(n)} \equiv 1 \pmod{n}$$

This theorem generalizes Fermat's Little Theorem and reveals that raising any element of $U(n)$ to the power $\phi(n)$ yields the multiplicative identity.

### Proof

**Group-theoretic proof**: Consider the multiplicative group $U(n) = \{a \in \mathbb{Z}_n : \gcd(a, n) = 1\}$ under multiplication modulo $n$. This group has order $|U(n)| = \phi(n)$.

By Lagrange's theorem from group theory, the order of any element $a \in U(n)$ divides the order of the group. If $a$ has order $d$, then $a^d \equiv 1 \pmod{n}$ and $d | \phi(n)$.

Write $\phi(n) = dk$ for some integer $k$. Then:
$$a^{\phi(n)} = a^{dk} = (a^d)^k \equiv 1^k = 1 \pmod{n}$$

Therefore, $a^{\phi(n)} \equiv 1 \pmod{n}$. $\square$

**Alternative proof**: Consider the set $S = \{a_1, a_2, \ldots, a_{\phi(n)}\}$ of all elements in $U(n)$. For any $a \in U(n)$, multiplication by $a$ permutes $S$ (since multiplication by $a$ is a bijection on $U(n)$).

Therefore:
$$a \cdot a_1 \cdot a \cdot a_2 \cdots a \cdot a_{\phi(n)} \equiv a_1 \cdot a_2 \cdots a_{\phi(n)} \pmod{n}$$

This gives $a^{\phi(n)} \prod a_i \equiv \prod a_i \pmod{n}$. Since $\gcd(\prod a_i, n) = 1$, we can cancel to get $a^{\phi(n)} \equiv 1 \pmod{n}$. $\square$

### Examples

**Example 1**: Verify $7^{\phi(12)} \equiv 1 \pmod{12}$

We computed $\phi(12) = 4$, and $\gcd(7, 12) = 1$, so Euler's theorem applies:
$$7^4 = 2401 = 200 \cdot 12 + 1 \equiv 1 \pmod{12}$$

Verified! ✓

**Example 2**: Compute $11^{100} \bmod 24$

Since $\gcd(11, 24) = 1$ and $\phi(24) = \phi(2^3 \cdot 3) = 24 \cdot \frac{1}{2} \cdot \frac{2}{3} = 8$:

$100 = 12 \cdot 8 + 4$, so:
$$11^{100} = 11^{12 \cdot 8 + 4} = (11^8)^{12} \cdot 11^4 \equiv 1^{12} \cdot 11^4 \equiv 11^4 \pmod{24}$$

Compute $11^4 = 14641 = 610 \cdot 24 + 1 \equiv 1 \pmod{24}$.

Therefore $11^{100} \equiv 1 \pmod{24}$.

## Fermat's Little Theorem

**Theorem (Fermat)**: If $p$ is prime and $\gcd(a, p) = 1$, then:
$$a^{p-1} \equiv 1 \pmod{p}$$

**Corollary**: For any integer $a$ and prime $p$:
$$a^p \equiv a \pmod{p}$$

(If $p | a$, both sides are $0 \bmod p$; otherwise apply the theorem and multiply by $a$.)

### Proof

Fermat's Little Theorem is a special case of Euler's theorem. For prime $p$, we have $\phi(p) = p - 1$, so Euler's theorem immediately gives the result. $\square$

**Alternative combinatorial proof**: The necklaces with $p$ beads in $a$ colors, allowing rotations as equivalent, number $(a^p - a)/p + a$. Since this must be an integer, $p | (a^p - a)$, proving $a^p \equiv a \pmod{p}$. $\square$

### Examples

**Example 1**: $2^{10} \bmod 11$

Since 11 is prime and $\gcd(2, 11) = 1$:
$$2^{10} \equiv 1 \pmod{11}$$

**Example 2**: $3^6 \bmod 7$

Since 7 is prime and $\gcd(3, 7) = 1$:
$$3^6 \equiv 1 \pmod{7}$$

**Example 3**: Compute $7^{222} \bmod 11$

Since $\phi(11) = 10$ and $222 = 22 \cdot 10 + 2$:
$$7^{222} = (7^{10})^{22} \cdot 7^2 \equiv 1^{22} \cdot 49 \equiv 5 \pmod{11}$$

## Applications to Cryptography

### RSA Correctness

RSA encryption and decryption rely fundamentally on Euler's theorem.

**Setup**: Choose primes $p, q$, set $n = pq$, and $\phi(n) = (p-1)(q-1)$. Choose $e$ with $\gcd(e, \phi(n)) = 1$, and compute $d \equiv e^{-1} \pmod{\phi(n)}$.

**Encryption**: $c \equiv m^e \pmod{n}$
**Decryption**: $m \equiv c^d \pmod{n}$

**Why decryption works**: Since $ed \equiv 1 \pmod{\phi(n)}$, write $ed = 1 + k\phi(n)$ for some integer $k$. Then:
$$c^d \equiv (m^e)^d = m^{ed} = m^{1 + k\phi(n)} = m \cdot (m^{\phi(n)})^k \pmod{n}$$

If $\gcd(m, n) = 1$, Euler's theorem gives $m^{\phi(n)} \equiv 1 \pmod{n}$, so:
$$c^d \equiv m \cdot 1^k = m \pmod{n}$$

(The case $\gcd(m, n) \neq 1$ requires the Chinese Remainder Theorem but also works.) $\square$

### Computing Modular Inverses

**Application**: To compute $a^{-1} \bmod n$ when $\gcd(a, n) = 1$:

By Euler's theorem, $a^{\phi(n)} \equiv 1 \pmod{n}$, which means $a \cdot a^{\phi(n) - 1} \equiv 1 \pmod{n}$.

Therefore: $a^{-1} \equiv a^{\phi(n) - 1} \pmod{n}$

**Example**: Find $7^{-1} \bmod 10$

$\phi(10) = 4$, so $7^{-1} \equiv 7^3 = 343 \equiv 3 \pmod{10}$.

Verify: $7 \cdot 3 = 21 \equiv 1 \pmod{10}$. ✓

### Primality Testing

**Fermat primality test**: If $n$ is prime, then $a^{n-1} \equiv 1 \pmod{n}$ for all $a$ coprime to $n$.

**Test**: Choose random $a$ with $1 < a < n$. If $a^{n-1} \not\equiv 1 \pmod{n}$, then $n$ is **definitely composite**.

If $a^{n-1} \equiv 1 \pmod{n}$, then $n$ is **probably prime** (could be a Carmichael number).

**Limitation**: Carmichael numbers (e.g., 561 = 3 · 11 · 17) satisfy $a^{n-1} \equiv 1 \pmod{n}$ for all $a$ coprime to $n$, fooling the Fermat test. Miller-Rabin test overcomes this limitation.

### Reducing Large Exponents

When computing $a^k \bmod n$ for large $k$, use Euler's theorem to reduce the exponent:

Since $a^{\phi(n)} \equiv 1 \pmod{n}$, we have $a^k \equiv a^{k \bmod \phi(n)} \pmod{n}$ (when $\gcd(a, n) = 1$).

**Example**: $13^{500} \bmod 17$

$\phi(17) = 16$, and $500 = 31 \cdot 16 + 4$, so:
$$13^{500} \equiv 13^4 = 28561 \equiv 4 \pmod{17}$$

## Historical Context

**Pierre de Fermat** (1607-1665) stated his "little theorem" in a 1640 letter but provided no proof. The first published proof came from Leonhard Euler in 1736.

**Leonhard Euler** (1707-1783) introduced the totient function and proved his generalization in 1763, connecting number theory to the emerging theory of groups.

These results were purely theoretical for centuries until the 1970s, when RSA cryptography transformed them into the foundation of digital security.

## Summary

Euler's and Fermat's theorems provide the mathematical foundation for modern public-key cryptography:

- **Totient function**: $\phi(n)$ counts integers coprime to $n$, with formula $\phi(n) = n \prod_{p|n}(1 - 1/p)$
- **Euler's theorem**: $a^{\phi(n)} \equiv 1 \pmod{n}$ when $\gcd(a,n) = 1$
- **Fermat's Little Theorem**: $a^{p-1} \equiv 1 \pmod{p}$ for prime $p$ and $\gcd(a,p) = 1$
- **RSA correctness**: Guaranteed by Euler's theorem applied to $m^{ed} \bmod n$
- **Primality testing**: Fermat test based on the contrapositive of Fermat's Little Theorem
- **Computational efficiency**: Reduce large exponents using periodicity from Euler's theorem

These theorems reveal the deep group-theoretic structure underlying modular arithmetic and enable the secure cryptographic protocols that protect modern digital communications.

## Key Takeaways

- Euler's totient function measures the multiplicative structure of $\mathbb{Z}_n$
- Euler's theorem generalizes Fermat's Little Theorem and proves RSA correctness
- Both theorems follow from Lagrange's theorem in group theory
- These results enable efficient computation of modular inverses and reduction of exponents
- Fermat's test provides a probabilistic primality test (with limitations)
- The connection between abstract algebra and practical cryptography is profound and essential
