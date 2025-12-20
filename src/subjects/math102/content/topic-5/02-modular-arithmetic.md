---
id: math102-t5-mod
title: "Modular Arithmetic"
order: 2
---

# Modular Arithmetic

Modular arithmetic works with remainders rather than absolute values. It's fundamental to computer science, appearing in hashing, cryptography, and cyclic structures.

## Congruence

**Definition**: a ≡ b (mod n) means n divides (a - b), equivalently a and b have the same remainder when divided by n.

### Examples

- 17 ≡ 5 (mod 12) since 17 - 5 = 12
- -3 ≡ 9 (mod 12) since -3 - 9 = -12
- 100 ≡ 2 (mod 7) since 100 = 14 × 7 + 2

### Properties

Congruence is an equivalence relation:

1. **Reflexive**: a ≡ a (mod n)
2. **Symmetric**: If a ≡ b (mod n), then b ≡ a (mod n)
3. **Transitive**: If a ≡ b and b ≡ c (mod n), then a ≡ c (mod n)

### Residue Classes

The integers partition into n residue classes modulo n:

```
[0] = {..., -n, 0, n, 2n, ...}
[1] = {..., -n+1, 1, n+1, 2n+1, ...}
...
[n-1] = {..., -1, n-1, 2n-1, ...}
```

The set Zₙ = {0, 1, 2, ..., n-1} represents these classes.

## Arithmetic Operations

If a ≡ a' (mod n) and b ≡ b' (mod n), then:

1. **(a + b) ≡ (a' + b') (mod n)**
2. **(a - b) ≡ (a' - b') (mod n)**
3. **(a × b) ≡ (a' × b') (mod n)**
4. **(aᵏ) ≡ (a'ᵏ) (mod n)** for positive k

**Note**: Division does NOT always preserve congruence.

### Example: Computing Large Powers

Calculate 7^100 mod 13:

```python
def power_mod(base, exp, mod):
    result = 1
    base = base % mod
    while exp > 0:
        if exp % 2 == 1:
            result = (result * base) % mod
        exp = exp // 2
        base = (base * base) % mod
    return result
```

7^100 mod 13 = 9 (using binary exponentiation)

## Modular Inverse

**Definition**: The modular inverse of a modulo n is a number a⁻¹ such that:

```
a × a⁻¹ ≡ 1 (mod n)
```

### Existence

a has an inverse mod n if and only if gcd(a, n) = 1.

### Finding the Inverse

Using Extended Euclidean Algorithm:

```python
def mod_inverse(a, n):
    g, x, _ = extended_gcd(a, n)
    if g != 1:
        raise ValueError(f"{a} has no inverse mod {n}")
    return x % n
```

**Example**: Find 7⁻¹ mod 26

gcd(7, 26) = 1 (inverse exists)
7 × 15 = 105 = 4 × 26 + 1 ≡ 1 (mod 26)
So 7⁻¹ ≡ 15 (mod 26)

### Using Fermat's Little Theorem

If p is prime and gcd(a, p) = 1:

```
a⁻¹ ≡ a^(p-2) (mod p)
```

## Fermat's Little Theorem

If p is prime and gcd(a, p) = 1:

```
a^(p-1) ≡ 1 (mod p)
```

Equivalently: a^p ≡ a (mod p) for all a.

**Application**: Primality testing (probable primes).

## Euler's Theorem

Generalizes Fermat to non-prime moduli.

**Euler's totient function** φ(n): Count of integers in {1, ..., n} coprime to n.

```
a^φ(n) ≡ 1 (mod n) if gcd(a, n) = 1
```

### Computing φ(n)

For n = p₁^e₁ × p₂^e₂ × ... × pₖ^eₖ:

```
φ(n) = n × (1 - 1/p₁) × (1 - 1/p₂) × ... × (1 - 1/pₖ)
```

```python
def euler_phi(n):
    result = n
    p = 2
    temp = n
    while p * p <= temp:
        if temp % p == 0:
            while temp % p == 0:
                temp //= p
            result -= result // p
        p += 1
    if temp > 1:
        result -= result // temp
    return result
```

**Examples**:
- φ(12) = 12 × (1/2) × (2/3) = 4
- φ(p) = p - 1 for prime p
- φ(p^k) = p^(k-1) × (p - 1)

## Chinese Remainder Theorem

If gcd(m, n) = 1, the system:
```
x ≡ a (mod m)
x ≡ b (mod n)
```
has a unique solution modulo mn.

### Construction

```python
def chinese_remainder(remainders, moduli):
    # Assume moduli are pairwise coprime
    M = 1
    for m in moduli:
        M *= m

    x = 0
    for ri, mi in zip(remainders, moduli):
        Mi = M // mi
        yi = mod_inverse(Mi, mi)
        x += ri * Mi * yi

    return x % M
```

### Example

Solve: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)

M = 3 × 5 × 7 = 105
- M₁ = 35, y₁ = 35⁻¹ mod 3 = 2
- M₂ = 21, y₂ = 21⁻¹ mod 5 = 1
- M₃ = 15, y₃ = 15⁻¹ mod 7 = 1

x = 2(35)(2) + 3(21)(1) + 2(15)(1) = 140 + 63 + 30 = 233 ≡ 23 (mod 105)

Check: 23 = 7(3) + 2 ≡ 2 (mod 3) ✓
       23 = 4(5) + 3 ≡ 3 (mod 5) ✓
       23 = 3(7) + 2 ≡ 2 (mod 7) ✓

## Applications

### Hashing

Hash functions often use modular arithmetic:
```python
def string_hash(s, mod=10**9 + 7, base=31):
    h = 0
    for c in s:
        h = (h * base + ord(c)) % mod
    return h
```

### RSA Cryptography

- Choose primes p, q
- n = pq, φ(n) = (p-1)(q-1)
- Choose e coprime to φ(n)
- Compute d = e⁻¹ mod φ(n)
- Encrypt: c = m^e mod n
- Decrypt: m = c^d mod n

### Checksums

ISBN, credit cards use mod 10 or mod 11 check digits.

```python
# ISBN-10 check digit
def isbn_check(isbn9):
    total = sum((10-i) * int(d) for i, d in enumerate(isbn9))
    check = (11 - total % 11) % 11
    return 'X' if check == 10 else str(check)
```
