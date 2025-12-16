# Divisibility and Prime Numbers

Number theory studies properties of integers. Divisibility and primes form the foundation, with applications in cryptography, hashing, and algorithm design.

## Divisibility

**Definition**: a divides b (written a | b) if there exists an integer k such that b = ak.

### Properties

For integers a, b, c with a ≠ 0:

1. **Reflexivity**: a | a
2. **Transitivity**: If a | b and b | c, then a | c
3. **Linearity**: If a | b and a | c, then a | (bx + cy) for any integers x, y
4. **Multiplication**: If a | b, then a | bc for any integer c
5. **Comparison**: If a | b and b ≠ 0, then |a| ≤ |b|

### Division Algorithm

For any integers a and d with d > 0, there exist unique integers q and r such that:

```
a = dq + r, where 0 ≤ r < d
```

- **q** is the quotient
- **r** is the remainder

```python
def div_algorithm(a, d):
    q = a // d  # Floor division
    r = a % d   # Remainder
    return q, r
```

## Prime Numbers

**Prime**: An integer p > 1 whose only divisors are 1 and p.

**Composite**: An integer n > 1 that is not prime.

First primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...

**Note**: 1 is neither prime nor composite by convention.

### Fundamental Theorem of Arithmetic

Every integer n > 1 can be expressed uniquely as a product of primes:

```
n = p₁^e₁ × p₂^e₂ × ... × pₖ^eₖ
```

where p₁ < p₂ < ... < pₖ are primes and eᵢ ≥ 1.

### Infinitude of Primes

**Theorem** (Euclid): There are infinitely many primes.

**Proof**: Suppose primes are finite: p₁, p₂, ..., pₙ.

Consider N = p₁p₂...pₙ + 1.

N is not divisible by any pᵢ (remainder 1).

So N is either prime or has a prime factor not in our list.

Contradiction.

### Prime Distribution

**Prime counting function** π(n): Number of primes ≤ n.

**Prime Number Theorem**: π(n) ~ n/ln(n)

| n | π(n) | n/ln(n) |
|---|------|---------|
| 10³ | 168 | 145 |
| 10⁶ | 78,498 | 72,382 |
| 10⁹ | 50,847,534 | 48,254,942 |

## Primality Testing

### Trial Division

```python
def is_prime_trial(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True
```

**Time**: O(√n)

**Why √n?** If n = ab with a ≤ b, then a ≤ √n.

### Sieve of Eratosthenes

Find all primes up to n:

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]
```

**Time**: O(n log log n)
**Space**: O(n)

## Greatest Common Divisor

**GCD(a,b)**: Largest positive integer dividing both a and b.

### Properties

1. gcd(a, b) = gcd(b, a)
2. gcd(a, 0) = |a|
3. gcd(a, b) = gcd(a - b, b) if a > b
4. gcd(a, b) = gcd(a mod b, b)

### Euclidean Algorithm

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
```

**Example**: gcd(48, 18)
```
48 = 2 × 18 + 12
18 = 1 × 12 + 6
12 = 2 × 6 + 0
```
gcd(48, 18) = 6

**Time**: O(log(min(a,b)))

### Extended Euclidean Algorithm

Finds x, y such that ax + by = gcd(a, b):

```python
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y
```

**Application**: Finding modular inverse.

## Least Common Multiple

**LCM(a,b)**: Smallest positive integer divisible by both a and b.

**Relationship**: lcm(a, b) × gcd(a, b) = |a × b|

```python
def lcm(a, b):
    return abs(a * b) // gcd(a, b)
```

## Coprimality

**Coprime** (relatively prime): gcd(a, b) = 1

### Properties

1. If gcd(a, b) = 1 and a | bc, then a | c
2. If gcd(a, b) = 1 and gcd(a, c) = 1, then gcd(a, bc) = 1
3. If gcd(a, b) = 1, there exist x, y with ax + by = 1

## Bézout's Identity

For any integers a, b (not both zero):

```
gcd(a, b) = ax + by for some integers x, y
```

**Moreover**: gcd(a, b) is the smallest positive integer expressible as ax + by.

### Example

gcd(35, 15) = 5

Extended GCD gives: 35(1) + 15(-2) = 35 - 30 = 5 ✓

## Applications

**Cryptography**: RSA relies on difficulty of factoring large numbers.

**Hashing**: Prime table sizes reduce clustering.

**Modular arithmetic**: GCD determines when inverses exist.

**Rational arithmetic**: GCD reduces fractions to lowest terms.

**Computer algebra**: Polynomial GCD in symbolic computation.
