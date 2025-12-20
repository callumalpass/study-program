---
id: math101-t5-special
title: "Special Functions and Applications"
order: 7
---

# Special Functions and Applications

## Floor and Ceiling Functions

### Floor Function ⌊x⌋

The **floor** of x is the greatest integer less than or equal to x.

$$\lfloor x \rfloor = \max\{n \in \mathbb{Z} : n \leq x\}$$

**Examples:**
- ⌊3.7⌋ = 3
- ⌊5⌋ = 5
- ⌊-2.3⌋ = -3 (not -2!)
- ⌊π⌋ = 3

**Properties:**
- x - 1 < ⌊x⌋ ≤ x
- ⌊x⌋ = x if and only if x ∈ ℤ
- ⌊x + n⌋ = ⌊x⌋ + n for n ∈ ℤ

### Ceiling Function ⌈x⌉

The **ceiling** of x is the smallest integer greater than or equal to x.

$$\lceil x \rceil = \min\{n \in \mathbb{Z} : n \geq x\}$$

**Examples:**
- ⌈3.7⌉ = 4
- ⌈5⌉ = 5
- ⌈-2.3⌉ = -2
- ⌈π⌉ = 4

**Properties:**
- x ≤ ⌈x⌉ < x + 1
- ⌈x⌉ = x if and only if x ∈ ℤ
- ⌈x⌉ = -⌊-x⌋

### Applications

**Division with rounding:**
- Pages needed for n items, k per page: ⌈n/k⌉
- Integer division quotient: ⌊a/b⌋ for positive a, b

**Computer science:**
- Array indexing
- Memory allocation
- Time complexity (e.g., ⌊log₂ n⌋ levels in binary tree)

## Modular Arithmetic Functions

### Modulo Operation

a mod n = r where a = qn + r and 0 ≤ r < n

**Examples:**
- 17 mod 5 = 2
- 23 mod 7 = 2
- -3 mod 5 = 2 (mathematical convention)

### Division and Modulo Relationship

For a, n ∈ ℤ with n > 0:
- q = ⌊a/n⌋ (quotient)
- r = a - n⌊a/n⌋ = a mod n (remainder)
- a = qn + r

### Applications

- Clock arithmetic (hours mod 12)
- Cryptography (RSA uses modular exponentiation)
- Hash functions
- Cyclic data structures

## Factorial Function

n! = n × (n-1) × (n-2) × ... × 2 × 1 for n ≥ 1
0! = 1 (by convention)

**Properties:**
- n! = n × (n-1)!
- (n+1)! = (n+1) × n!
- n! counts permutations of n objects

**Values:**
| n | n! |
|---|-----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 6 |
| 4 | 24 |
| 5 | 120 |
| 10 | 3,628,800 |

### Stirling's Approximation

For large n: n! ≈ √(2πn)(n/e)ⁿ

## Combinatorial Functions

### Binomial Coefficient

$$\binom{n}{k} = \frac{n!}{k!(n-k)!}$$

"n choose k" = number of ways to choose k items from n items.

**Properties:**
- C(n, 0) = C(n, n) = 1
- C(n, k) = C(n, n-k) (symmetry)
- C(n, k) = C(n-1, k-1) + C(n-1, k) (Pascal's identity)

### Applications

- Counting combinations
- Binomial theorem: (a + b)ⁿ = Σ C(n,k) aⁿ⁻ᵏ bᵏ
- Probability distributions

## Characteristic Functions

The **characteristic function** of set S ⊆ A is χ_S: A → {0, 1}:

$$\chi_S(x) = \begin{cases} 1 & \text{if } x \in S \\ 0 & \text{if } x \notin S \end{cases}$$

**Properties:**
- χ_{A∩B} = χ_A · χ_B
- χ_{A∪B} = χ_A + χ_B - χ_A · χ_B
- χ_{Ā} = 1 - χ_A

**Application:** Predicates in logic and programming are characteristic functions.

## Logarithms

### Definition

log_b(x) = y means b^y = x

**Common bases:**
- log₁₀(x): common logarithm
- ln(x) = logₑ(x): natural logarithm
- log₂(x): binary logarithm (CS)

### Properties

- log_b(xy) = log_b(x) + log_b(y)
- log_b(x/y) = log_b(x) - log_b(y)
- log_b(xⁿ) = n · log_b(x)
- log_b(x) = log_c(x) / log_c(b) (change of base)

### Applications

- Algorithm complexity: O(log n)
- Information theory: bits = log₂(states)
- pH scale, decibels, Richter scale

## Functions in Programming

### Pure Functions

A function is **pure** if:
1. Output depends only on inputs (deterministic)
2. No side effects (doesn't modify external state)

```python
# Pure
def square(x):
    return x * x

# Impure (side effect)
total = 0
def add_to_total(x):
    global total
    total += x
    return total
```

### Higher-Order Functions

Functions that take functions as arguments or return functions.

```python
# Takes function as argument
def apply_twice(f, x):
    return f(f(x))

# Returns a function
def multiplier(n):
    return lambda x: n * x

double = multiplier(2)
print(double(5))  # 10
```

### Common Higher-Order Functions

- **map(f, list)**: Apply f to each element
- **filter(p, list)**: Keep elements where p is true
- **reduce(f, list)**: Combine elements pairwise

## Summary

**Special mathematical functions:**
- Floor ⌊x⌋ and ceiling ⌈x⌉
- Modulo (a mod n)
- Factorial (n!)
- Binomial coefficients C(n,k)
- Logarithms log_b(x)

**Key applications:**
- Computer science: indexing, complexity, hashing
- Combinatorics: counting
- Programming: pure functions, higher-order functions

Understanding these functions provides tools for both mathematical reasoning and practical computation.
