# Fermat's and Euler's Theorems

These fundamental theorems of number theory describe the behavior of exponentiation in modular arithmetic. They have crucial applications in cryptography and computational number theory.

## Fermat's Little Theorem

### Statement

If p is prime and gcd(a, p) = 1, then:
$$a^{p-1} \equiv 1 \pmod{p}$$

Equivalently, for any integer a:
$$a^p \equiv a \pmod{p}$$

### Proof

Consider the set {a, 2a, 3a, ..., (p-1)a} modulo p.

**Claim:** These are exactly {1, 2, 3, ..., p-1} in some order.

**Proof of claim:**
- All are nonzero mod p (since gcd(a, p) = 1)
- All distinct: if ia ≡ ja (mod p), then i ≡ j (mod p)
- So they form a permutation of {1, ..., p-1}

Therefore:
$$a \cdot 2a \cdot 3a \cdots (p-1)a \equiv 1 \cdot 2 \cdot 3 \cdots (p-1) \pmod{p}$$
$$a^{p-1}(p-1)! \equiv (p-1)! \pmod{p}$$

Since gcd((p-1)!, p) = 1, we can divide: a^{p-1} ≡ 1 (mod p).

### Applications

**Modular exponentiation:** Compute a^n mod p efficiently.

If n ≥ p-1, reduce: a^n ≡ a^{n mod (p-1)} (mod p)

**Computing modular inverse:** a^{-1} ≡ a^{p-2} (mod p)

```python
def mod_inverse_fermat(a, p):
    """Compute a^(-1) mod p using Fermat's theorem. p must be prime."""
    return pow(a, p - 2, p)
```

## Euler's Totient Function

### Definition

φ(n) = count of integers in {1, 2, ..., n} coprime to n.

### Computing φ(n)

For prime p: φ(p) = p - 1

For prime power: φ(p^k) = p^k - p^{k-1} = p^{k-1}(p - 1)

For coprime m, n: φ(mn) = φ(m)φ(n)

General formula:
$$\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right)$$

```python
def euler_phi(n):
    """Compute Euler's totient function."""
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1
    if n > 1:
        result -= result // n
    return result
```

### Examples

- φ(12) = 12 × (1 - 1/2) × (1 - 1/3) = 12 × 1/2 × 2/3 = 4
- φ(100) = 100 × (1 - 1/2) × (1 - 1/5) = 100 × 1/2 × 4/5 = 40

### Properties

1. φ(1) = 1
2. φ(p) = p - 1 for prime p
3. Multiplicative: φ(mn) = φ(m)φ(n) when gcd(m,n) = 1
4. Sum of divisors: Σ_{d|n} φ(d) = n

## Euler's Theorem

### Statement

If gcd(a, n) = 1, then:
$$a^{\phi(n)} \equiv 1 \pmod{n}$$

This generalizes Fermat's theorem (when n = p, φ(p) = p-1).

### Proof

Similar to Fermat's theorem, but using the group of units modulo n.

Let {r₁, r₂, ..., r_{φ(n)}} be the integers from 1 to n coprime to n.

The products {ar₁, ar₂, ..., ar_{φ(n)}} are a permutation of this set.

Therefore: ∏ arᵢ ≡ ∏ rᵢ (mod n)
⟹ a^{φ(n)} ∏ rᵢ ≡ ∏ rᵢ (mod n)
⟹ a^{φ(n)} ≡ 1 (mod n)

### Computing Modular Inverse

a^{-1} ≡ a^{φ(n)-1} (mod n)

### RSA Connection

In RSA:
- n = pq for primes p, q
- φ(n) = (p-1)(q-1)
- Choose e coprime to φ(n)
- d = e^{-1} mod φ(n)
- Encryption: c = m^e mod n
- Decryption: m = c^d mod n

Why it works: c^d = m^{ed} = m^{1+kφ(n)} = m · (m^{φ(n)})^k ≡ m · 1^k = m (mod n)

## Order and Primitive Roots

### Order

The **order** of a modulo n is the smallest positive k such that a^k ≡ 1 (mod n).

Notation: ord_n(a) or o(a)

**Properties:**
- ord_n(a) divides φ(n)
- a^m ≡ 1 (mod n) iff ord_n(a) divides m

### Primitive Root

A **primitive root** modulo n is an element g with ord_n(g) = φ(n).

**Existence:** Primitive roots exist for:
- n = 1, 2, 4
- n = p^k or 2p^k for odd prime p

### Finding Primitive Root

```python
def find_primitive_root(p):
    """Find smallest primitive root modulo prime p."""
    phi = p - 1
    factors = prime_factors(phi)

    for g in range(2, p):
        is_primitive = True
        for q in factors:
            if pow(g, phi // q, p) == 1:
                is_primitive = False
                break
        if is_primitive:
            return g
    return None
```

## Carmichael Function

### Definition

λ(n) is the smallest positive m such that a^m ≡ 1 (mod n) for all a coprime to n.

### Computation

- λ(2) = 1, λ(4) = 2, λ(2^k) = 2^{k-2} for k ≥ 3
- λ(p^k) = φ(p^k) = p^{k-1}(p-1) for odd prime p
- λ(∏ pᵢ^{eᵢ}) = lcm(λ(pᵢ^{eᵢ}))

**Relation to φ:** λ(n) divides φ(n), and a^{λ(n)} ≡ 1 (mod n).

## Quadratic Residues

### Definition

a is a **quadratic residue** modulo n if x² ≡ a (mod n) has a solution.

### Legendre Symbol

For prime p and gcd(a, p) = 1:
$$\left(\frac{a}{p}\right) = \begin{cases} 1 & \text{if } a \text{ is QR mod } p \\ -1 & \text{if } a \text{ is not QR mod } p \end{cases}$$

### Euler's Criterion

$$\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod{p}$$

## Applications

### Fast Exponentiation

```python
def pow_mod(a, n, m):
    """Compute a^n mod m using binary exponentiation."""
    result = 1
    a = a % m
    while n > 0:
        if n % 2 == 1:
            result = (result * a) % m
        n //= 2
        a = (a * a) % m
    return result
```

### Primality Testing

Fermat test: If a^{n-1} ≢ 1 (mod n), then n is composite.

### Discrete Logarithm

Given g, h, n, find x such that g^x ≡ h (mod n).
- Believed computationally hard
- Basis for Diffie-Hellman, ElGamal cryptography

## Summary

Fermat's and Euler's theorems:
- Fermat: a^{p-1} ≡ 1 (mod p) for prime p
- Euler: a^{φ(n)} ≡ 1 (mod n) for gcd(a,n) = 1
- φ(n) counts integers coprime to n
- Enable modular inverse computation
- Underlie RSA encryption
- Primitive roots generate all coprime residues
- Carmichael function gives tighter exponent bound
