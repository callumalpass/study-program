---
id: math102-t5-factor
title: "Prime Factorization"
order: 4
---

# Prime Factorization

The Fundamental Theorem of Arithmetic states that every integer greater than 1 has a unique prime factorization. This section explores factorization algorithms and their applications.

## Fundamental Theorem of Arithmetic

### Statement

Every integer n > 1 can be represented uniquely as a product of primes:
$$n = p_1^{e_1} p_2^{e_2} \cdots p_k^{e_k}$$
where p₁ < p₂ < ... < pₖ are primes and eᵢ ≥ 1.

### Proof Sketch

**Existence:** By strong induction. If n is prime, done. Otherwise n = ab where 1 < a, b < n. By induction, a and b have prime factorizations, so n does too.

**Uniqueness:** Assume two factorizations. Use Euclid's lemma (if prime p | ab then p | a or p | b) to show primes must match.

## Factorization Algorithms

### Trial Division

```python
def trial_division(n):
    """Factor n by trial division up to sqrt(n)."""
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors
```

**Complexity:** O(√n) in worst case

**Optimization:** After checking 2, only check odd numbers.

### Wheel Factorization

Skip multiples of small primes:

```python
def wheel_factorization(n):
    """Factor using wheel with primes 2, 3, 5."""
    factors = []

    for p in [2, 3, 5]:
        while n % p == 0:
            factors.append(p)
            n //= p

    # Only check numbers coprime to 30
    wheel = [7, 11, 13, 17, 19, 23, 29, 31]  # + 30k
    k = 0
    i = 0
    while (wheel[i] + 30*k) ** 2 <= n:
        d = wheel[i] + 30*k
        while n % d == 0:
            factors.append(d)
            n //= d
        i += 1
        if i == len(wheel):
            i = 0
            k += 1

    if n > 1:
        factors.append(n)
    return factors
```

### Pollard's Rho Algorithm

For larger numbers, use probabilistic methods:

```python
import math

def pollard_rho(n):
    """
    Pollard's rho algorithm for finding a factor.
    Returns a non-trivial factor of n, or n if n is prime.
    """
    if n % 2 == 0:
        return 2

    x = 2
    y = 2
    d = 1

    # f(x) = x^2 + 1 mod n
    f = lambda x: (x * x + 1) % n

    while d == 1:
        x = f(x)
        y = f(f(y))
        d = math.gcd(abs(x - y), n)

    return d
```

**Complexity:** O(n^(1/4)) expected time

**Idea:** Use cycle detection in sequence x, f(x), f(f(x)), ... to find collisions mod a factor.

## Sieve of Eratosthenes

Find all primes up to n:

```python
def sieve_of_eratosthenes(n):
    """Return list of all primes up to n."""
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]
```

**Complexity:** O(n log log n)

### Linear Sieve

Also computes smallest prime factor:

```python
def linear_sieve(n):
    """
    Linear sieve computing primes and smallest prime factors.
    """
    spf = list(range(n + 1))  # smallest prime factor
    primes = []

    for i in range(2, n + 1):
        if spf[i] == i:  # i is prime
            primes.append(i)
        for p in primes:
            if p > spf[i] or i * p > n:
                break
            spf[i * p] = p

    return primes, spf
```

**Complexity:** O(n) time and space

## Divisor Functions

### Number of Divisors

If n = p₁^e₁ p₂^e₂ ... pₖ^eₖ, then:
$$d(n) = (e_1 + 1)(e_2 + 1) \cdots (e_k + 1)$$

```python
def count_divisors(n):
    """Count divisors using prime factorization."""
    count = 1
    d = 2
    while d * d <= n:
        exp = 0
        while n % d == 0:
            exp += 1
            n //= d
        count *= (exp + 1)
        d += 1
    if n > 1:  # Remaining prime factor
        count *= 2
    return count
```

### Sum of Divisors

$$\sigma(n) = \prod_{i=1}^{k} \frac{p_i^{e_i+1} - 1}{p_i - 1}$$

### Euler's Totient Function

$$\phi(n) = n \prod_{p | n} \left(1 - \frac{1}{p}\right)$$

Counts integers from 1 to n that are coprime to n.

## Applications

### Cryptography

**RSA Security:** Based on difficulty of factoring n = pq for large primes p, q.

**Key sizes:** 2048+ bit moduli are considered secure.

### Number Theory

**Perfect numbers:** n where σ(n) = 2n. Related to Mersenne primes.

**Amicable numbers:** Pairs (a, b) where σ(a) - a = b and σ(b) - b = a.

### Algorithm Design

**GCD via factorization:** gcd(a,b) = product of common prime factors with minimum exponents.

**LCM via factorization:** lcm(a,b) = product of all prime factors with maximum exponents.

## Primality Testing

### Fermat Test

Based on Fermat's Little Theorem: if p is prime, aᵖ⁻¹ ≡ 1 (mod p) for gcd(a,p)=1.

**Problem:** Carmichael numbers pass all Fermat tests but aren't prime.

### Miller-Rabin Test

```python
def is_prime_miller_rabin(n, k=10):
    """
    Miller-Rabin primality test with k rounds.
    Returns True if probably prime, False if definitely composite.
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 = 2^r * d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    import random
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False

    return True
```

**Accuracy:** False positive probability < 4^(-k).

## Summary

Prime factorization:
- Unique by Fundamental Theorem of Arithmetic
- Trial division: O(√n) for small n
- Pollard's rho: O(n^(1/4)) expected for larger n
- Sieve of Eratosthenes: O(n log log n) for all primes up to n
- Enables computation of divisor functions
- Security of RSA relies on factoring difficulty
- Miller-Rabin provides fast probabilistic primality testing
