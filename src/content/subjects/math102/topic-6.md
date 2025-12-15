## Introduction

Advanced counting techniques extend beyond basic combinatorics to handle more complex problems. Generating functions provide a powerful algebraic approach to counting, while concepts like Stirling numbers, partition theory, and the Principle of Inclusion-Exclusion in more sophisticated forms allow us to solve problems that resist elementary methods.

**Learning Objectives:**
- Understand and manipulate ordinary generating functions
- Apply generating functions to solve recurrence relations
- Calculate Stirling numbers of the first and second kind
- Count integer partitions
- Apply advanced inclusion-exclusion techniques
- Recognize when advanced methods are appropriate

---

## Core Concepts

### Generating Functions

A **generating function** encodes a sequence {a₀, a₁, a₂, ...} as coefficients of a formal power series:

$$G(x) = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots = \sum_{n=0}^{\infty} a_n x^n$$

**Why use generating functions?**
- Transform combinatorial problems into algebraic ones
- Solve recurrence relations systematically
- Find closed-form expressions for sequences

```python
# Conceptual representation of generating functions
# For sequence [1, 1, 1, 1, ...] (constant sequence)
# G(x) = 1 + x + x^2 + x^3 + ... = 1/(1-x)

def geometric_series_coefficient(n):
    """Coefficient of x^n in 1/(1-x) is 1"""
    return 1

# For sequence [1, 2, 3, 4, ...] (natural numbers)
# G(x) = 1 + 2x + 3x^2 + ... = 1/(1-x)^2

def natural_number(n):
    """Coefficient of x^n in 1/(1-x)^2 is n+1"""
    return n + 1
```

### Common Generating Functions

| Sequence | Generating Function |
|----------|---------------------|
| 1, 1, 1, ... | 1/(1-x) |
| 1, 2, 3, 4, ... | 1/(1-x)² |
| 0, 1, 2, 3, ... | x/(1-x)² |
| 1, a, a², a³, ... | 1/(1-ax) |
| C(n,0), C(n,1), ... | (1+x)ⁿ |
| F₀, F₁, F₂, ... (Fibonacci) | x/(1-x-x²) |

### Operations on Generating Functions

**Addition:** If G(x) generates {aₙ} and H(x) generates {bₙ}, then G(x) + H(x) generates {aₙ + bₙ}.

**Multiplication:** G(x) · H(x) generates the **convolution**: cₙ = Σᵢ aᵢ bₙ₋ᵢ

**Derivative:** G'(x) generates {(n+1)aₙ₊₁}

**Integration:** ∫G(x)dx generates {aₙ₋₁/n} (with a₋₁ = 0)

```python
def multiply_sequences(a, b, n):
    """
    Compute first n terms of convolution.
    If G(x) generates a and H(x) generates b,
    then G(x)*H(x) generates the result.
    """
    result = [0] * n
    for i in range(min(n, len(a))):
        for j in range(min(n - i, len(b))):
            result[i + j] += a[i] * b[j]
    return result

# Example: (1 + x + x²)(1 + x) = 1 + 2x + 2x² + x³
a = [1, 1, 1]  # 1 + x + x²
b = [1, 1]     # 1 + x
print(multiply_sequences(a, b, 4))  # [1, 2, 2, 1]
```

### Solving Recurrences with Generating Functions

**Example: Fibonacci**

Given F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1

Let G(x) = Σ F(n)xⁿ

Multiply recurrence by xⁿ and sum:
- G(x) - F(0) - F(1)x = x(G(x) - F(0)) + x²G(x)
- G(x) - x = xG(x) + x²G(x)
- G(x)(1 - x - x²) = x
- G(x) = x/(1 - x - x²)

Using partial fractions gives Binet's formula.

```python
def fibonacci_from_gf(n):
    """
    Fibonacci using the closed form derived from GF.
    G(x) = x/(1-x-x²) = x/((1-φx)(1-ψx))
    where φ = (1+√5)/2, ψ = (1-√5)/2
    """
    import math
    phi = (1 + math.sqrt(5)) / 2
    psi = (1 - math.sqrt(5)) / 2
    return round((phi**n - psi**n) / math.sqrt(5))
```

### Exponential Generating Functions

For sequences where order matters (permutations), use:

$$E(x) = \sum_{n=0}^{\infty} a_n \frac{x^n}{n!}$$

The EGF for the sequence {n!} is 1/(1-x).

```python
# Derangements: D(n) = n! × Σ(-1)^k/k! for k=0 to n
# EGF for derangements: e^(-x)/(1-x)

from math import factorial, exp

def derangements(n):
    """Count derangements (permutations with no fixed points)"""
    total = 0
    for k in range(n + 1):
        total += ((-1) ** k) / factorial(k)
    return round(factorial(n) * total)

# D(5) = 44
print(derangements(5))
```

### Stirling Numbers of the Second Kind

**S(n, k)** counts the number of ways to partition n elements into exactly k non-empty subsets.

**Recurrence:** S(n, k) = k·S(n-1, k) + S(n-1, k-1)

**Boundary conditions:** S(0, 0) = 1, S(n, 0) = 0 for n > 0, S(0, k) = 0 for k > 0

```python
def stirling_second(n, k):
    """
    Stirling numbers of the second kind.
    S(n,k) = ways to partition n elements into k non-empty subsets.
    """
    if n == 0 and k == 0:
        return 1
    if n == 0 or k == 0:
        return 0
    if k > n:
        return 0

    # Use DP to compute
    dp = [[0] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 1

    for i in range(1, n + 1):
        for j in range(1, min(i, k) + 1):
            dp[i][j] = j * dp[i-1][j] + dp[i-1][j-1]

    return dp[n][k]

# S(4, 2) = 7: ways to partition {1,2,3,4} into 2 non-empty subsets
print(stirling_second(4, 2))  # 7
```

### Stirling Numbers of the First Kind

**s(n, k)** (unsigned) counts permutations of n elements with exactly k cycles.

**Recurrence:** |s(n, k)| = (n-1)·|s(n-1, k)| + |s(n-1, k-1)|

```python
def stirling_first(n, k):
    """
    Unsigned Stirling numbers of the first kind.
    |s(n,k)| = permutations of n elements with exactly k cycles.
    """
    if n == 0 and k == 0:
        return 1
    if n == 0 or k == 0:
        return 0
    if k > n:
        return 0

    dp = [[0] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 1

    for i in range(1, n + 1):
        for j in range(1, min(i, k) + 1):
            dp[i][j] = (i - 1) * dp[i-1][j] + dp[i-1][j-1]

    return dp[n][k]

# |s(4, 2)| = 11: permutations of 4 elements with 2 cycles
print(stirling_first(4, 2))  # 11
```

### Bell Numbers

**B(n)** counts the total number of partitions of n elements.

$$B(n) = \sum_{k=0}^{n} S(n, k)$$

```python
def bell_number(n):
    """
    Bell number B(n) = total partitions of n elements.
    Uses the Bell triangle method.
    """
    if n == 0:
        return 1

    # Bell triangle: B[i][j] where B[i][0] = B[i-1][i-1]
    # and B[i][j] = B[i][j-1] + B[i-1][j-1]
    bell = [[0] * (n + 1) for _ in range(n + 1)]
    bell[0][0] = 1

    for i in range(1, n + 1):
        bell[i][0] = bell[i-1][i-1]
        for j in range(1, i + 1):
            bell[i][j] = bell[i][j-1] + bell[i-1][j-1]

    return bell[n][0]

# B(5) = 52
print(bell_number(5))
```

### Integer Partitions

A **partition** of integer n is a way to write n as a sum of positive integers, where order doesn't matter.

**p(n)** = number of partitions of n.

```python
def partitions(n):
    """Count integer partitions of n"""
    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(1, n + 1):
        for j in range(i, n + 1):
            dp[j] += dp[j - i]

    return dp[n]

# p(5) = 7: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1
print(partitions(5))  # 7

def list_partitions(n, max_val=None):
    """Generate all partitions of n"""
    if max_val is None:
        max_val = n

    if n == 0:
        return [[]]

    result = []
    for first in range(min(n, max_val), 0, -1):
        for rest in list_partitions(n - first, first):
            result.append([first] + rest)

    return result

print(list_partitions(5))
```

### Partitions with Restrictions

**Distinct parts:** Each part appears at most once
**Odd parts only:** Only odd numbers allowed

```python
def partitions_distinct(n):
    """Count partitions into distinct parts"""
    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(1, n + 1):
        # Traverse in reverse to ensure each part used at most once
        for j in range(n, i - 1, -1):
            dp[j] += dp[j - i]

    return dp[n]

def partitions_odd_parts(n):
    """Count partitions into odd parts only"""
    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(1, n + 1, 2):  # Only odd numbers
        for j in range(i, n + 1):
            dp[j] += dp[j - i]

    return dp[n]

# Theorem: partitions into distinct parts = partitions into odd parts
print(partitions_distinct(10))    # 10
print(partitions_odd_parts(10))   # 10 (same!)
```

### Advanced Inclusion-Exclusion

**Counting Surjections (onto functions):**

The number of surjections from an n-set to a k-set is:

$$k! \cdot S(n, k) = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$$

```python
from math import comb

def count_surjections(n, k):
    """Count surjective functions from n-set to k-set"""
    if n < k:
        return 0

    total = 0
    for i in range(k + 1):
        term = ((-1) ** i) * comb(k, i) * ((k - i) ** n)
        total += term

    return total

# Surjections from 4-set to 3-set
print(count_surjections(4, 3))  # 36
```

---

## Common Patterns and Applications

### Counting Lattice Paths with Restrictions

Count paths from (0,0) to (n,n) that don't cross the diagonal:

```python
def catalan(n):
    """
    Catalan number C(n) = paths that don't cross diagonal
    Also: valid parentheses, binary trees, etc.
    """
    from math import comb
    return comb(2*n, n) // (n + 1)

print(catalan(5))  # 42
```

### Counting Distributions

Ways to distribute n identical items into k distinct bins:

```python
def distributions(n, k):
    """Stars and bars: n items into k bins"""
    from math import comb
    return comb(n + k - 1, k - 1)
```

---

## Common Mistakes and Debugging

### Mistake 1: Confusing OGF and EGF

- Use OGF when order doesn't matter (combinations)
- Use EGF when order matters (permutations)

### Mistake 2: Off-by-One in Stirling Numbers

Remember boundary conditions: S(0,0) = 1, S(n,0) = 0 for n > 0.

### Mistake 3: Forgetting Restrictions in Partitions

Distinct vs. unrestricted partitions give different counts.

---

## Best Practices

1. **Identify the counting type** before choosing a method
2. **Check small cases** by hand enumeration
3. **Use recurrences** when GF manipulation is complex
4. **Look for known sequences** in OEIS (oeis.org)
5. **Use symmetry** when possible

---

## Summary

Advanced counting techniques extend our combinatorial toolkit:

- **Generating functions**: Algebraic approach to sequences
- **Stirling numbers**: Partitions and cycles of permutations
- **Bell numbers**: Total set partitions
- **Integer partitions**: Sums without order
- **Advanced I-E**: Surjections, restricted counts

**When to use what:**
- Simple counting → Basic combinatorics
- Recurrence relations → Generating functions
- Set partitions → Stirling numbers
- Integer sums → Partition theory
- Overlapping restrictions → Inclusion-exclusion

---

## Further Exploration

- **Pólya enumeration**: Counting with symmetries
- **Species theory**: Categorical approach to GFs
- **q-analogs**: Generalized counting
- **Asymptotic analysis**: Behavior of counts for large n
