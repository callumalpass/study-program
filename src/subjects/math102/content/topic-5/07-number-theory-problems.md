---
id: math102-t5-probs
title: "Number Theory Problems"
order: 7
---

# Number Theory Problems

This section presents classic number theory problems and techniques. Working through these builds problem-solving skills and deeper understanding.

## Divisibility Problems

### Problem 1: Divisibility by 9

**Statement:** An integer is divisible by 9 iff the sum of its digits is divisible by 9.

**Proof:**
Let n = dₖ10^k + dₖ₋₁10^{k-1} + ... + d₁10 + d₀

Since 10 ≡ 1 (mod 9):
n ≡ dₖ + dₖ₋₁ + ... + d₁ + d₀ (mod 9)

So 9|n ⟺ 9|(sum of digits)

### Problem 2: Divisibility Test for 7

**Technique:** Remove last digit d, subtract 2d from remaining number.

**Example:** Is 364 divisible by 7?
- 364 → 36 - 2(4) = 28 → 2 - 2(8) = -14
- 14 is divisible by 7, so 364 is ✓

**Why it works:** 10a + d ≡ 0 (mod 7) ⟺ a - 2d ≡ 0 (mod 7)
(since 10 ≡ 3 and 3 × (-2) ≡ 1 (mod 7))

## GCD and LCM Problems

### Problem 3: GCD Properties

**Prove:** gcd(a, b) = gcd(a + b, lcm(a, b))

**Proof:**
Let g = gcd(a, b). Then a = gm, b = gn where gcd(m, n) = 1.
lcm(a, b) = gmn
a + b = g(m + n)

gcd(g(m+n), gmn) = g · gcd(m+n, mn)

Since gcd(m, n) = 1:
- gcd(m+n, m) = gcd(n, m) = 1
- gcd(m+n, n) = gcd(m, n) = 1
- So gcd(m+n, mn) = 1

Therefore gcd(a+b, lcm(a,b)) = g = gcd(a, b) ✓

### Problem 4: Count Coprimes

**Count:** Integers from 1 to 1000 coprime to 1000.

**Solution:**
1000 = 2³ × 5³

φ(1000) = 1000 × (1 - 1/2) × (1 - 1/5) = 1000 × 1/2 × 4/5 = 400

## Modular Arithmetic

### Problem 5: Last Digits

**Find:** Last two digits of 7^{2023}.

**Solution:** Work mod 100 = 4 × 25.

By Chinese Remainder Theorem:
- 7² = 49 ≡ 1 (mod 4), so 7^{2023} ≡ 7 ≡ 3 (mod 4)
- φ(25) = 20, so 7^{20} ≡ 1 (mod 25)
- 2023 = 101 × 20 + 3, so 7^{2023} ≡ 7³ = 343 ≡ 18 (mod 25)

Solve: x ≡ 3 (mod 4), x ≡ 18 (mod 25)
From second: x = 18 + 25k
Substitute: 18 + 25k ≡ 3 (mod 4) → k ≡ 1 (mod 4)
So x = 18 + 25 = 43

**Answer:** Last two digits are **43**.

### Problem 6: Finding Inverse

**Find:** 17^{-1} mod 43.

**Using Extended Euclidean:**
```
43 = 2(17) + 9
17 = 1(9) + 8
9 = 1(8) + 1
```

Back-substitute:
```
1 = 9 - 8 = 9 - (17 - 9) = 2(9) - 17 = 2(43 - 2(17)) - 17 = 2(43) - 5(17)
```

So 17^{-1} ≡ -5 ≡ 38 (mod 43).

**Check:** 17 × 38 = 646 = 15 × 43 + 1 ≡ 1 (mod 43) ✓

## Fermat and Euler

### Problem 7: Compute Large Power

**Find:** 2^{1000} mod 13.

**Solution:** By Fermat, 2^{12} ≡ 1 (mod 13).
1000 = 83 × 12 + 4
2^{1000} ≡ 2^4 = 16 ≡ 3 (mod 13)

### Problem 8: Order Finding

**Find:** Order of 2 modulo 17.

**Solution:** ord₁₇(2) divides φ(17) = 16.

Check divisors of 16:
- 2¹ = 2 (mod 17)
- 2² = 4 (mod 17)
- 2⁴ = 16 ≡ -1 (mod 17)
- 2⁸ ≡ 1 (mod 17)

**Answer:** ord₁₇(2) = **8**.

## Prime Number Problems

### Problem 9: Infinitely Many Primes

**Prove:** There are infinitely many primes.

**Proof (Euclid):**
Suppose only finitely many primes: p₁, p₂, ..., pₖ.
Consider N = p₁p₂...pₖ + 1.

N is not divisible by any pᵢ (remainder is 1).
So N is either prime or has a prime factor not in the list.
Either way, we have a new prime. Contradiction.

### Problem 10: Primes in Arithmetic Progressions

**Statement (Dirichlet):** If gcd(a, d) = 1, there are infinitely many primes of form a + nd.

**Example:** Primes ≡ 1 (mod 4): 5, 13, 17, 29, 37, ...

## Diophantine Equations

### Problem 11: Linear Equation

**Solve:** 21x + 35y = 14 in integers.

**Solution:**
gcd(21, 35) = 7, and 7|14, so solutions exist.

Simplify: 3x + 5y = 2

By inspection or Euclidean algorithm:
3(4) + 5(-2) = 2

Particular solution: (x₀, y₀) = (4, -2)

General solution: x = 4 + 5t, y = -2 - 3t

### Problem 12: Pythagorean Triples

**Find:** All primitive Pythagorean triples (a, b, c) with a² + b² = c².

**Solution:** For coprime m > n > 0 with opposite parity:
- a = m² - n²
- b = 2mn
- c = m² + n²

All primitive triples arise this way.

**Examples:**
- m=2, n=1: (3, 4, 5)
- m=3, n=2: (5, 12, 13)
- m=4, n=1: (15, 8, 17)

## Competition Problems

### Problem 13: IMO 1988/6

**Find:** All positive integers n such that n² divides 2ⁿ + 1.

**Solution:** n = 1 and n = 3 only.

Key insight: If prime p|n, analyze ord_p(2).

### Problem 14: Sum of Cubes

**Prove:** 1³ + 2³ + ... + n³ = (1 + 2 + ... + n)².

**Solution by induction:**

Base: 1³ = 1² ✓

Inductive step:
(1³ + ... + n³) + (n+1)³ = [n(n+1)/2]² + (n+1)³
= (n+1)²[n²/4 + (n+1)]
= (n+1)²[n² + 4n + 4]/4
= (n+1)²(n+2)²/4
= [(n+1)(n+2)/2]² ✓

## Proof Techniques Summary

1. **Induction:** Standard and strong forms
2. **Contradiction:** Assume opposite, derive inconsistency
3. **Modular analysis:** Work modulo appropriate number
4. **Prime factorization:** Exploit unique factorization
5. **Pigeonhole:** If n+1 objects in n boxes, some box has 2+
6. **Descent:** Show minimal counterexample can't exist

## Practice Problems

1. Prove: n⁵ - n is divisible by 30 for all integers n.

2. Find all solutions to x² ≡ 1 (mod 35).

3. Prove: If p is an odd prime, (p-1)! ≡ -1 (mod p) (Wilson's theorem).

4. Find the last 3 digits of 13^{2024}.

5. Solve: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 5 (mod 7).

## Summary

Number theory problem-solving requires:
- Mastery of divisibility, GCD, modular arithmetic
- Fermat's and Euler's theorems for exponentiation
- Chinese Remainder Theorem for systems
- Diophantine equation techniques
- Creative application of proof methods
