# Primality Testing: Miller-Rabin and Probabilistic Guarantees

## Introduction

Determining whether a number is prime is fundamental in cryptography. While deterministic primality testing exists (AKS algorithm), randomized Miller-Rabin test is faster and widely used in practice, providing probabilistic guarantees.

## Problem

**Input**: Integer $n$. **Output**: PRIME or COMPOSITE. **Naive**: Trial division up to $\sqrt{n}$ takes $O(\sqrt{n})$ time - infeasible for cryptographic sizes (1024+ bits).

## Fermat's Little Theorem

If $p$ prime and $a \not\equiv 0 \pmod{p}$, then $a^{p-1} \equiv 1 \pmod{p}$. **Fermat test**: Pick random $a$, check if $a^{n-1} \equiv 1 \pmod{n}$. If not, $n$ composite. **Problem**: Carmichael numbers (composite but pass for all $a$ coprime to $n$).

## Miller-Rabin Test

**Based on**: If $n$ prime and $n-1 = 2^s d$ (odd $d$), then for any $a$: either $a^d \equiv 1 \pmod{n}$ or $a^{2^r d} \equiv -1 \pmod{n}$ for some $0 \leq r < s$. **Algorithm**: Repeatedly square $a^d$ checking for non-trivial square roots of 1. **Error probability**: At most 1/4 per iteration.

## Implementation

```typescript
function millerRabin(n: number, k: number): boolean {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0) return false;
  
  let s = 0, d = n - 1;
  while (d % 2 === 0) { d /= 2; s++; }
  
  for (let i = 0; i < k; i++) {
    const a = 2 + Math.floor(Math.random() * (n - 3));
    let x = modPow(a, d, n);
    if (x === 1 || x === n - 1) continue;
    
    let cont = false;
    for (let r = 0; r < s - 1; r++) {
      x = (x * x) % n;
      if (x === n - 1) { cont = true; break; }
    }
    if (!cont) return false;
  }
  return true;
}
```

## Error Analysis

**Theorem**: If $n$ composite, probability Miller-Rabin returns PRIME is at most $(1/4)^k$ after $k$ iterations. **Cryptographic use**: $k=40$ gives error $< 2^{-80}$ - more likely hardware error than algorithm failure!

## Deterministic Primality

**AKS algorithm** (2002): Deterministic $O(\log^{12} n)$ time (improved to $O(\log^6 n)$). **Practical**: Miller-Rabin faster for cryptographic sizes. **Certificates**: For proving primality, use Pratt certificates.

