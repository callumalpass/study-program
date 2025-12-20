# Primality Testing: Miller-Rabin and Probabilistic Guarantees

## Introduction

Determining whether a number is prime is fundamental to cryptography and number theory. While deterministic primality testing exists (AKS algorithm), the randomized Miller-Rabin test is significantly faster and provides practical guarantees that make it the standard choice in real-world cryptographic systems.

Primality testing demonstrates how probabilistic algorithms can provide arbitrarily high confidence while remaining efficient—a trade-off that's often better than deterministic alternatives.

## Problem Definition

**Input**: Integer $n$ (typically hundreds or thousands of bits for cryptography).

**Output**: PRIME or COMPOSITE.

**Naive approach**: Trial division up to $\sqrt{n}$ takes $O(\sqrt{n})$ time. For a 2048-bit number, $\sqrt{n}$ has 1024 bits—far too many operations to be feasible.

**Requirement**: We need algorithms with polynomial complexity in the number of bits, i.e., $O(\text{poly}(\log n))$.

## Fermat's Little Theorem

**Theorem** (Fermat's Little Theorem): If $p$ is prime and $\gcd(a, p) = 1$, then:
$$a^{p-1} \equiv 1 \pmod{p}$$

This suggests a test: if $a^{n-1} \not\equiv 1 \pmod{n}$, then $n$ is definitely composite.

### Fermat Primality Test

```typescript
function fermatTest(n: bigint, k: number): boolean {
    if (n < 4n) return n === 2n || n === 3n;

    for (let i = 0; i < k; i++) {
        // Choose random a in [2, n-2]
        const a = randomBigInt(2n, n - 2n);

        // Check if a^(n-1) ≡ 1 (mod n)
        if (modPow(a, n - 1n, n) !== 1n) {
            return false;  // Definitely composite
        }
    }

    return true;  // Probably prime
}
```

### Problem: Carmichael Numbers

**Carmichael numbers** are composite numbers $n$ where $a^{n-1} \equiv 1 \pmod{n}$ for all $a$ coprime to $n$.

Examples: 561, 1105, 1729, 2465, ...

These "Fermat pseudoprimes" fool the Fermat test no matter how many iterations we run (unless we accidentally choose a factor of $n$).

## Miller-Rabin Primality Test

Miller-Rabin strengthens Fermat's test by checking for non-trivial square roots of 1.

### Key Insight

Write $n - 1 = 2^s \cdot d$ where $d$ is odd.

If $n$ is an odd prime and $a$ is not divisible by $n$, then either:
1. $a^d \equiv 1 \pmod{n}$, or
2. $a^{2^r d} \equiv -1 \pmod{n}$ for some $r$ with $0 \leq r < s$

**Why?** By Fermat: $a^{n-1} = a^{2^s d} \equiv 1 \pmod{n}$.

As we compute $a^d, a^{2d}, a^{4d}, \ldots, a^{2^s d}$, we start at some value and eventually reach 1.

If $n$ is prime, the last value before 1 must be $-1$ (the only non-trivial square root of 1 mod a prime).

If $n$ is composite, other square roots of 1 may exist (e.g., $\pm 1, \pm k$ where $k^2 \equiv 1$).

### Algorithm

```typescript
function millerRabin(n: bigint, k: number): boolean {
    // Handle small cases
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    // Write n-1 = 2^s * d
    let s = 0n;
    let d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
        s += 1n;
    }

    // Witness loop
    witnessLoop: for (let i = 0; i < k; i++) {
        // Choose random a in [2, n-2]
        const a = randomBigInt(2n, n - 2n);

        // Compute a^d mod n
        let x = modPow(a, d, n);

        // If a^d ≡ 1 or -1, this witness doesn't reveal composite
        if (x === 1n || x === n - 1n) {
            continue witnessLoop;
        }

        // Square repeatedly
        for (let r = 1n; r < s; r++) {
            x = (x * x) % n;

            if (x === n - 1n) {
                continue witnessLoop;  // Found -1, not a witness
            }
        }

        // Never found -1 before reaching 1
        return false;  // Definitely composite
    }

    return true;  // Probably prime
}
```

### Modular Exponentiation

Efficient modular exponentiation is crucial:

```typescript
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    base = base % mod;

    while (exp > 0n) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp = exp / 2n;
        base = (base * base) % mod;
    }

    return result;
}
```

Time complexity: $O(\log \exp \cdot M(\log \mod))$ where $M$ is multiplication cost.

## Error Analysis

**Theorem**: If $n$ is composite, at most $\frac{n-1}{4}$ values of $a$ in $\{1, \ldots, n-1\}$ fail to witness that $n$ is composite.

**Corollary**: Each iteration has error probability at most $\frac{1}{4}$.

After $k$ iterations with independent random witnesses:
$$\Pr[\text{wrongly declare prime}] \leq \left(\frac{1}{4}\right)^k = 2^{-2k}$$

**Practical values**:
- $k = 10$: Error $\leq 2^{-20} \approx 10^{-6}$
- $k = 40$: Error $\leq 2^{-80}$—negligible compared to hardware errors
- $k = 64$: Standard in cryptographic libraries

### Comparison with Hardware Reliability

A typical CPU has bit-flip error rate $\approx 10^{-18}$ per operation. Running 40 iterations of Miller-Rabin gives error $\approx 10^{-24}$, which is more reliable than the hardware running it!

## Deterministic Variants

### Deterministic Miller-Rabin for Small Numbers

For $n < 3,317,044,064,679,887,385,961,981$, testing witnesses $\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37\}$ is sufficient.

For $n < 3,215,031,751$, witnesses $\{2, 3, 5, 7\}$ suffice.

### AKS Algorithm

**Theorem** (Agrawal-Kayal-Saxena, 2002): Primality can be decided in deterministic polynomial time.

Original complexity: $O(\log^{12} n)$.

Improved to: $O(\log^6 n)$ (with plausible conjectures: $O(\log^3 n)$).

**Practical relevance**: The constants are large enough that Miller-Rabin remains faster for all practical sizes.

## Applications

**RSA key generation**: Generate large random primes $p, q$ for $n = pq$.

**Diffie-Hellman**: Find safe primes $p$ where $(p-1)/2$ is also prime.

**Digital signatures**: DSA requires prime moduli.

**Hash functions**: Some constructions use prime field sizes.

## Key Takeaways

- Miller-Rabin provides arbitrarily high confidence with $O(k \log^3 n)$ time
- Error probability $\leq (1/4)^k$ after $k$ iterations
- Defeats Carmichael numbers that fool Fermat's test
- More practical than deterministic AKS despite theoretical interest
- Widely deployed in cryptographic systems (OpenSSL, GnuPG, etc.)
- Demonstrates how probabilistic algorithms can be "reliable enough" for security
