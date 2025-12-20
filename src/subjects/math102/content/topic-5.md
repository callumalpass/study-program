## Introduction

Number theory is the study of integers and their properties. It forms the mathematical foundation for cryptography, computer security, hash functions, and error detection. Understanding number theory concepts like divisibility, primes, and modular arithmetic is essential for designing secure systems and efficient algorithms.

**Learning Objectives:**
- Apply divisibility rules and the Division Algorithm
- Compute GCD using Euclid's algorithm
- Solve linear Diophantine equations using the Extended Euclidean Algorithm
- Perform modular arithmetic operations
- Apply Fermat's Little Theorem and Euler's Theorem
- Understand the Chinese Remainder Theorem
- Recognize applications in cryptography

---

## Core Concepts

### Divisibility

We say **a divides b** (written a | b) if there exists an integer k such that b = ak.

**Properties:**
- If a | b and a | c, then a | (b + c) and a | (b - c)
- If a | b and b | c, then a | c (transitivity)
- If a | b and a | c, then a | (mb + nc) for any integers m, n

```python
def divides(a, b):
    """Check if a divides b"""
    if a == 0:
        return b == 0
    return b % a == 0

# Examples
print(divides(3, 12))  # True: 12 = 3 × 4
print(divides(5, 12))  # False
```

### The Division Algorithm

For any integers a and b with b > 0, there exist unique integers q (quotient) and r (remainder) such that:

$$a = bq + r \text{ where } 0 \leq r < b$$

```python
def division_algorithm(a, b):
    """Return (quotient, remainder) for a = bq + r"""
    q = a // b
    r = a % b
    return q, r

# Example: 17 = 5 × 3 + 2
q, r = division_algorithm(17, 5)
print(f"17 = 5 × {q} + {r}")  # 17 = 5 × 3 + 2
```

### Greatest Common Divisor (GCD)

The **GCD** of a and b is the largest positive integer that divides both a and b.

**Euclid's Algorithm:** gcd(a, b) = gcd(b, a mod b)

```python
def gcd(a, b):
    """Euclidean algorithm for GCD"""
    a, b = abs(a), abs(b)
    while b:
        a, b = b, a % b
    return a

# gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6
print(gcd(48, 18))  # 6
```

**Time complexity:** O(log(min(a, b)))

### Least Common Multiple (LCM)

The **LCM** of a and b is the smallest positive integer divisible by both a and b.

$$\text{lcm}(a, b) = \frac{|a \times b|}{\gcd(a, b)}$$

```python
def lcm(a, b):
    """Calculate LCM using GCD"""
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // gcd(a, b)

print(lcm(12, 18))  # 36
```

### Extended Euclidean Algorithm

Finds integers x and y such that: ax + by = gcd(a, b)

This is essential for finding modular inverses.

```python
def extended_gcd(a, b):
    """Return (gcd, x, y) where ax + by = gcd"""
    if b == 0:
        return a, 1, 0

    g, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

# Example: Find x, y such that 48x + 18y = gcd(48, 18) = 6
g, x, y = extended_gcd(48, 18)
print(f"{48}×{x} + {18}×{y} = {g}")  # 48×(-1) + 18×3 = 6
```

### Linear Diophantine Equations

The equation ax + by = c has integer solutions if and only if gcd(a, b) | c.

```python
def solve_linear_diophantine(a, b, c):
    """
    Solve ax + by = c for integers x, y.
    Returns (x, y) or None if no solution.
    """
    g, x0, y0 = extended_gcd(a, b)

    if c % g != 0:
        return None  # No solution

    # Scale the solution
    factor = c // g
    return x0 * factor, y0 * factor

# Solve 12x + 8y = 20
solution = solve_linear_diophantine(12, 8, 20)
print(f"12×{solution[0]} + 8×{solution[1]} = 20")
```

### Modular Arithmetic

Modular arithmetic is arithmetic on remainders. We write a ≡ b (mod n) if n | (a - b).

**Properties:**
- (a + b) mod n = ((a mod n) + (b mod n)) mod n
- (a × b) mod n = ((a mod n) × (b mod n)) mod n
- (a - b) mod n = ((a mod n) - (b mod n) + n) mod n

```python
def mod_add(a, b, n):
    return (a % n + b % n) % n

def mod_subtract(a, b, n):
    return (a % n - b % n + n) % n

def mod_multiply(a, b, n):
    return (a % n * b % n) % n

# Example: 7 × 8 (mod 5)
print(mod_multiply(7, 8, 5))  # (2 × 3) % 5 = 1
```

### Modular Exponentiation

Compute aᵇ mod m efficiently using binary exponentiation.

**Time complexity:** O(log b)

```python
def mod_pow(base, exp, mod):
    """Calculate base^exp mod m efficiently"""
    result = 1
    base = base % mod

    while exp > 0:
        if exp & 1:  # If exp is odd
            result = (result * base) % mod
        exp >>= 1  # Divide exp by 2
        base = (base * base) % mod

    return result

# Calculate 2^100 mod 13
print(mod_pow(2, 100, 13))  # 3
```

### Modular Inverse

The **modular inverse** of a modulo n is a number x such that ax ≡ 1 (mod n).

It exists if and only if gcd(a, n) = 1 (a and n are coprime).

```python
def mod_inverse(a, n):
    """Find modular inverse of a mod n"""
    g, x, _ = extended_gcd(a, n)
    if g != 1:
        return None  # No inverse exists
    return x % n

# Find 3^(-1) mod 7
inv = mod_inverse(3, 7)
print(f"3 × {inv} ≡ {(3 * inv) % 7} (mod 7)")  # 3 × 5 ≡ 1 (mod 7)
```

### Prime Numbers

A **prime** number p > 1 has no divisors other than 1 and p.

```python
def is_prime(n):
    """Check if n is prime"""
    if n < 2:
        return False
    if n < 4:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

def sieve_of_eratosthenes(n):
    """Generate all primes up to n"""
    if n < 2:
        return []
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(2, n + 1) if is_prime[i]]

print(sieve_of_eratosthenes(30))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

### Prime Factorization

Every integer > 1 can be uniquely expressed as a product of primes (Fundamental Theorem of Arithmetic).

```python
def prime_factorization(n):
    """Return prime factorization as {prime: exponent}"""
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = 1
    return factors

# 360 = 2³ × 3² × 5
print(prime_factorization(360))  # {2: 3, 3: 2, 5: 1}
```

### Fermat's Little Theorem

If p is prime and gcd(a, p) = 1, then:
$$a^{p-1} \equiv 1 \pmod{p}$$

Equivalently: aᵖ ≡ a (mod p) for any a.

```python
def fermat_inverse(a, p):
    """Find inverse using Fermat's Little Theorem (p must be prime)"""
    return mod_pow(a, p - 2, p)

# 3^(-1) mod 7 using Fermat
print(fermat_inverse(3, 7))  # 5
```

### Euler's Totient Function

φ(n) counts integers from 1 to n that are coprime to n.

**Properties:**
- φ(p) = p - 1 for prime p
- φ(pᵏ) = pᵏ - pᵏ⁻¹ for prime p
- φ(mn) = φ(m)φ(n) if gcd(m, n) = 1

```python
def euler_phi(n):
    """Calculate Euler's totient function"""
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

print(euler_phi(12))  # 4 (1, 5, 7, 11 are coprime to 12)
```

### Euler's Theorem

If gcd(a, n) = 1, then:
$$a^{\phi(n)} \equiv 1 \pmod{n}$$

This generalizes Fermat's Little Theorem.

### Chinese Remainder Theorem

If n₁, n₂, ..., nₖ are pairwise coprime, the system:
- x ≡ a₁ (mod n₁)
- x ≡ a₂ (mod n₂)
- ...
- x ≡ aₖ (mod nₖ)

has a unique solution modulo N = n₁ × n₂ × ... × nₖ.

```python
def chinese_remainder(remainders, moduli):
    """Solve system of congruences using CRT"""
    N = 1
    for m in moduli:
        N *= m

    result = 0
    for r, m in zip(remainders, moduli):
        Ni = N // m
        yi = mod_inverse(Ni, m)
        result += r * Ni * yi

    return result % N

# x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)
x = chinese_remainder([2, 3, 2], [3, 5, 7])
print(f"x = {x}")  # 23
print(f"Verify: {x % 3}, {x % 5}, {x % 7}")  # 2, 3, 2
```

---

## Applications in Cryptography

### RSA Key Generation (Simplified)

```python
def simple_rsa_demo():
    """Simplified RSA demonstration"""
    # Choose two primes
    p, q = 61, 53
    n = p * q  # 3233
    phi_n = (p - 1) * (q - 1)  # 3120

    # Choose e coprime to phi(n)
    e = 17

    # Calculate d = e^(-1) mod phi(n)
    d = mod_inverse(e, phi_n)  # 2753

    print(f"Public key: (n={n}, e={e})")
    print(f"Private key: d={d}")

    # Encrypt message m
    m = 65
    c = mod_pow(m, e, n)
    print(f"Encrypted: {c}")

    # Decrypt ciphertext c
    decrypted = mod_pow(c, d, n)
    print(f"Decrypted: {decrypted}")

simple_rsa_demo()
```

---

## Common Mistakes and Debugging

### Mistake 1: Negative Modulo

Python's % operator handles negatives correctly, but be careful in other languages:

```python
# Python: -7 % 5 = 3 (correct mathematical result)
# Some languages: -7 % 5 = -2 (may need adjustment)
def safe_mod(a, n):
    return ((a % n) + n) % n
```

### Mistake 2: Assuming Modular Inverse Always Exists

```python
# Wrong: Assuming inverse exists
inv = mod_inverse(4, 8)  # Returns None! gcd(4,8) = 4 ≠ 1

# Correct: Check first
if gcd(a, n) == 1:
    inv = mod_inverse(a, n)
else:
    print("No inverse exists")
```

### Mistake 3: Overflow in Modular Operations

```python
# Wrong: May overflow before taking mod
result = (a * b) % n  # If a*b overflows

# Better: Take mod at each step
result = ((a % n) * (b % n)) % n
```

---

## Best Practices

1. **Always use modular exponentiation** for large powers
2. **Check coprimality** before computing modular inverse
3. **Take mod at intermediate steps** to prevent overflow
4. **Use the Sieve** for generating multiple primes
5. **Verify solutions** by substituting back

---

## Summary

Number theory provides essential tools for computer science:

- **Divisibility**: a | b means a divides b evenly
- **Euclid's Algorithm**: Efficient GCD computation
- **Extended GCD**: Find x, y such that ax + by = gcd(a,b)
- **Modular arithmetic**: Arithmetic on remainders
- **Modular inverse**: Exists when gcd(a, n) = 1
- **Fermat/Euler theorems**: a^(p-1) ≡ 1 (mod p)
- **Chinese Remainder Theorem**: Solve systems of congruences

**Key Applications:**
- RSA encryption
- Hash functions
- Error detection codes
- Random number generation

---

## Further Exploration

- **Primality testing**: Miller-Rabin, AKS
- **Integer factorization**: Pollard's rho, quadratic sieve
- **Elliptic curve cryptography**
- **Quadratic residues and the Legendre symbol
