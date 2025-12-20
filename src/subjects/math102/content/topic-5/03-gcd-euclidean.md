---
id: math102-t5-gcd
title: "GCD and Euclidean Algorithm"
order: 3
---

# GCD and the Euclidean Algorithm

The greatest common divisor (GCD) is fundamental to number theory. The Euclidean algorithm provides an efficient method to compute GCDs, with extensions that solve linear Diophantine equations.

## Greatest Common Divisor

### Definition

The **greatest common divisor** of integers a and b, denoted gcd(a, b), is the largest positive integer that divides both a and b.

**Properties:**
- gcd(a, b) = gcd(b, a) (commutative)
- gcd(a, 0) = |a|
- gcd(a, a) = |a|
- gcd(a, b) = gcd(a - b, b) for a > b

### Least Common Multiple

The **least common multiple** lcm(a, b) is the smallest positive integer divisible by both a and b.

**Relationship:** gcd(a, b) × lcm(a, b) = |a × b|

## The Euclidean Algorithm

**Key insight:** gcd(a, b) = gcd(b, a mod b)

**Proof:** If d divides both a and b, then d divides a - qb = a mod b for any q. Conversely, if d divides b and a mod b, then d divides qb + (a mod b) = a.

### Algorithm

```python
def gcd(a, b):
    """Euclidean algorithm for GCD."""
    while b != 0:
        a, b = b, a % b
    return abs(a)
```

**Example:** gcd(48, 18)
- gcd(48, 18) = gcd(18, 48 mod 18) = gcd(18, 12)
- gcd(18, 12) = gcd(12, 18 mod 12) = gcd(12, 6)
- gcd(12, 6) = gcd(6, 12 mod 6) = gcd(6, 0) = 6

### Complexity

**Theorem (Lamé):** The Euclidean algorithm takes at most 5 × (number of digits in min(a,b)) steps.

**Worst case:** Consecutive Fibonacci numbers, giving O(log min(a,b)) steps.

## Extended Euclidean Algorithm

Finds x and y such that: ax + by = gcd(a, b)

### Bézout's Identity

**Theorem:** For any integers a and b (not both zero), there exist integers x and y such that:
$$ax + by = \gcd(a, b)$$

These x, y are called **Bézout coefficients**.

### Extended Algorithm

```python
def extended_gcd(a, b):
    """
    Extended Euclidean algorithm.
    Returns (gcd, x, y) such that ax + by = gcd.
    """
    if b == 0:
        return (a, 1, 0)

    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return (gcd, x, y)
```

**Derivation:** If gcd(b, a mod b) = bx₁ + (a mod b)y₁, then:
- a mod b = a - (a//b)×b
- gcd = bx₁ + (a - (a//b)×b)y₁
- gcd = ay₁ + b(x₁ - (a//b)×y₁)
- So x = y₁, y = x₁ - (a//b)×y₁

### Example

Find x, y for 35x + 15y = gcd(35, 15)

```
extended_gcd(35, 15):
  extended_gcd(15, 5):
    extended_gcd(5, 0):
      return (5, 1, 0)
    gcd=5, x=0, y=1-(15//5)*0=1
    return (5, 0, 1)
  gcd=5, x=1, y=0-(35//15)*1=-2
  return (5, 1, -2)
```

Check: 35(1) + 15(-2) = 35 - 30 = 5 ✓

## Modular Inverse

### Definition

The **modular inverse** of a modulo n is x such that:
$$ax \equiv 1 \pmod{n}$$

Exists iff gcd(a, n) = 1.

### Finding Inverse

Use extended Euclidean algorithm:
- Find x, y such that ax + ny = 1
- Then ax ≡ 1 (mod n), so x is the inverse

```python
def mod_inverse(a, n):
    """Find modular inverse of a mod n, or None if it doesn't exist."""
    gcd, x, _ = extended_gcd(a, n)
    if gcd != 1:
        return None  # Inverse doesn't exist
    return x % n
```

### Application: RSA

In RSA encryption:
- Choose primes p, q; let n = pq
- Choose e coprime to φ(n) = (p-1)(q-1)
- Compute d = e⁻¹ mod φ(n) using extended GCD
- Public key: (n, e), Private key: d

## Linear Diophantine Equations

### Equation ax + by = c

**Theorem:** The equation ax + by = c has integer solutions iff gcd(a, b) divides c.

### Finding Solutions

1. Use extended GCD to find x₀, y₀ with ax₀ + by₀ = gcd(a, b)
2. Scale: if c = k × gcd(a, b), then x = kx₀, y = ky₀
3. General solution: x = kx₀ + (b/g)t, y = ky₀ - (a/g)t for any integer t

### Example

Solve 15x + 25y = 40

1. gcd(15, 25) = 5, and 5 | 40 ✓
2. Extended GCD gives 15(2) + 25(-1) = 5
3. Scale by 8: 15(16) + 25(-8) = 40
4. General solution: x = 16 + 5t, y = -8 - 3t

## Chinese Remainder Theorem

### Statement

If n₁, n₂, ..., nₖ are pairwise coprime, the system:
- x ≡ a₁ (mod n₁)
- x ≡ a₂ (mod n₂)
- ...
- x ≡ aₖ (mod nₖ)

has a unique solution modulo N = n₁n₂...nₖ.

### Construction

Let Nᵢ = N/nᵢ. Since gcd(Nᵢ, nᵢ) = 1, let yᵢ = Nᵢ⁻¹ mod nᵢ.

Then: x = Σ aᵢNᵢyᵢ (mod N)

### Example

Solve: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)

- N = 3 × 5 × 7 = 105
- N₁ = 35, y₁ = 35⁻¹ mod 3 = 2⁻¹ mod 3 = 2
- N₂ = 21, y₂ = 21⁻¹ mod 5 = 1⁻¹ mod 5 = 1
- N₃ = 15, y₃ = 15⁻¹ mod 7 = 1⁻¹ mod 7 = 1
- x = 2(35)(2) + 3(21)(1) + 2(15)(1) = 140 + 63 + 30 = 233 ≡ 23 (mod 105)

Check: 23 = 7×3+2 ≡ 2 (mod 3) ✓, 23 = 4×5+3 ≡ 3 (mod 5) ✓, 23 = 3×7+2 ≡ 2 (mod 7) ✓

## Applications

### Cryptography

- RSA key generation
- Modular exponentiation
- Digital signatures

### Computer Science

- Hash function design
- Random number generation
- Error detection (checksums)

### Algorithms

- Rational reconstruction
- Solving systems of congruences
- Polynomial GCD

## Summary

The Euclidean algorithm:
- Computes GCD in O(log min(a,b)) steps
- Extended version finds Bézout coefficients
- Enables modular inverse computation
- Solves linear Diophantine equations
- Underlies Chinese Remainder Theorem
- Essential for cryptographic algorithms
