## Introduction

Recurrence relations are equations that define sequences where each term depends on previous terms. They are fundamental to computer science because they naturally describe recursive algorithms and data structures. Mastering recurrence relations allows you to analyze algorithm complexity, understand dynamic programming, and solve a wide variety of computational problems.

**Learning Objectives:**
- Recognize and formulate recurrence relations from problem descriptions
- Solve linear recurrence relations using the characteristic equation method
- Apply the Master Theorem to divide-and-conquer recurrences
- Use iteration and substitution methods for simple recurrences
- Understand the connection between recurrences and algorithm analysis

---

## Core Concepts

### What is a Recurrence Relation?

A **recurrence relation** defines a sequence {aₙ} where each term is expressed as a function of one or more previous terms, along with **initial conditions** (base cases).

```python
# The Fibonacci sequence: F(n) = F(n-1) + F(n-2)
# Initial conditions: F(0) = 0, F(1) = 1
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
```

### Common Examples

**Arithmetic sequence:** aₙ = aₙ₋₁ + d (constant difference)
```python
# a(n) = a(n-1) + 3, a(0) = 2
# Solution: a(n) = 2 + 3n
```

**Geometric sequence:** aₙ = r · aₙ₋₁ (constant ratio)
```python
# a(n) = 2 * a(n-1), a(0) = 1
# Solution: a(n) = 2^n
```

**Tower of Hanoi:** T(n) = 2T(n-1) + 1
```python
def hanoi_moves(n):
    """Minimum moves to solve Tower of Hanoi"""
    if n == 0:
        return 0
    return 2 * hanoi_moves(n - 1) + 1

# Solution: T(n) = 2^n - 1
```

### Solving by Iteration (Telescoping)

Expand the recurrence repeatedly until you see a pattern:

**Example:** T(n) = T(n-1) + n, T(1) = 1

```
T(n) = T(n-1) + n
     = T(n-2) + (n-1) + n
     = T(n-3) + (n-2) + (n-1) + n
     ...
     = T(1) + 2 + 3 + ... + n
     = 1 + (2 + 3 + ... + n)
     = n(n+1)/2
```

```python
def sum_to_n(n):
    """T(n) = T(n-1) + n, T(1) = 1"""
    return n * (n + 1) // 2
```

### Solving by Substitution

Guess a solution and prove it by induction.

**Example:** T(n) = 2T(n/2) + n

Guess: T(n) = O(n log n)

Prove: Assume T(k) ≤ ck log k for all k < n
```
T(n) = 2T(n/2) + n
     ≤ 2·c(n/2)log(n/2) + n
     = cn(log n - 1) + n
     = cn log n - cn + n
     = cn log n - (c-1)n
     ≤ cn log n  (when c ≥ 1)
```

### Linear Homogeneous Recurrences

A **linear homogeneous recurrence** with constant coefficients has the form:
$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + \cdots + c_k a_{n-k}$$

**Solution Method: Characteristic Equation**

1. Write the characteristic equation: xᵏ - c₁xᵏ⁻¹ - c₂xᵏ⁻² - ... - cₖ = 0
2. Find roots r₁, r₂, ..., rₖ
3. General solution:
   - Distinct roots: aₙ = A₁r₁ⁿ + A₂r₂ⁿ + ... + Aₖrₖⁿ
   - Repeated root r with multiplicity m: include terms n·rⁿ, n²·rⁿ, ..., nᵐ⁻¹·rⁿ
4. Use initial conditions to solve for constants

**Example: Fibonacci**

F(n) = F(n-1) + F(n-2), F(0) = 0, F(1) = 1

Characteristic equation: x² - x - 1 = 0
Roots: r₁ = (1+√5)/2 (golden ratio φ), r₂ = (1-√5)/2

General solution: F(n) = A·φⁿ + B·((1-√5)/2)ⁿ

Using F(0) = 0, F(1) = 1: A = 1/√5, B = -1/√5

**Binet's formula:** F(n) = (φⁿ - ψⁿ)/√5 where ψ = (1-√5)/2

```python
import math

def fibonacci_closed_form(n):
    """Fibonacci using Binet's formula"""
    phi = (1 + math.sqrt(5)) / 2
    psi = (1 - math.sqrt(5)) / 2
    return round((phi**n - psi**n) / math.sqrt(5))
```

### The Master Theorem

For divide-and-conquer recurrences of the form:
$$T(n) = aT(n/b) + f(n)$$

where a ≥ 1, b > 1, and f(n) is asymptotically positive.

Let c = log_b(a). Then:

**Case 1:** If f(n) = O(n^(c-ε)) for some ε > 0, then T(n) = Θ(n^c)

**Case 2:** If f(n) = Θ(n^c · log^k n) for some k ≥ 0, then T(n) = Θ(n^c · log^(k+1) n)

**Case 3:** If f(n) = Ω(n^(c+ε)) for some ε > 0 and af(n/b) ≤ cf(n), then T(n) = Θ(f(n))

```python
import math

def analyze_master_theorem(a, b, f_degree):
    """Analyze T(n) = a*T(n/b) + n^f_degree"""
    c = math.log(a) / math.log(b)  # log_b(a)

    if f_degree < c - 0.01:
        return f"Case 1: T(n) = Θ(n^{c:.2f})"
    elif abs(f_degree - c) < 0.01:
        return f"Case 2: T(n) = Θ(n^{f_degree:.0f} log n)"
    else:
        return f"Case 3: T(n) = Θ(n^{f_degree:.0f})"

# Common algorithms:
print(analyze_master_theorem(2, 2, 1))  # Merge sort: Θ(n log n)
print(analyze_master_theorem(2, 2, 0))  # Binary tree traversal: Θ(n)
print(analyze_master_theorem(1, 2, 0))  # Binary search: Θ(log n)
```

### Common Algorithm Recurrences

| Algorithm | Recurrence | Solution |
|-----------|------------|----------|
| Binary Search | T(n) = T(n/2) + O(1) | O(log n) |
| Merge Sort | T(n) = 2T(n/2) + O(n) | O(n log n) |
| Quick Sort (avg) | T(n) = 2T(n/2) + O(n) | O(n log n) |
| Strassen's | T(n) = 7T(n/2) + O(n²) | O(n^2.81) |
| Linear Search | T(n) = T(n-1) + O(1) | O(n) |

### Non-Homogeneous Recurrences

For recurrences with a non-recursive term:
$$a_n = c_1 a_{n-1} + c_2 a_{n-2} + f(n)$$

Solve by finding:
1. **Homogeneous solution** (solve without f(n))
2. **Particular solution** (guess based on form of f(n))
3. **General solution** = Homogeneous + Particular

```python
# Example: a(n) = 2*a(n-1) + 3, a(0) = 1
# Homogeneous: a(n) = A * 2^n
# Particular: Try constant c. Then c = 2c + 3, so c = -3
# General: a(n) = A * 2^n - 3
# Using a(0) = 1: A = 4
# Solution: a(n) = 4 * 2^n - 3 = 2^(n+2) - 3
```

---

## Common Patterns and Applications

### Dynamic Programming Recurrences

**Coin Change Problem:**
```python
# min_coins(n) = min(min_coins(n-c) for c in coins) + 1
def min_coins(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
```

**Fibonacci Variants:**
```python
# Stair climbing: ways(n) = ways(n-1) + ways(n-2)
def climb_stairs(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1
```

### Catalan Numbers

C(n) = C(n-1) · 2(2n-1)/(n+1), C(0) = 1

Count: binary trees, valid parentheses, non-crossing partitions, and more.

```python
def catalan(n):
    if n <= 1:
        return 1
    cat = 1
    for i in range(1, n + 1):
        cat = cat * 2 * (2*i - 1) // (i + 1)
    return cat

# C(5) = 42
```

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting Initial Conditions

```python
# Wrong: No base case leads to infinite recursion
def bad_recurrence(n):
    return 2 * bad_recurrence(n - 1) + 1  # Never stops!

# Correct: Always include base case(s)
def good_recurrence(n):
    if n == 0:
        return 1
    return 2 * good_recurrence(n - 1) + 1
```

### Mistake 2: Wrong Number of Initial Conditions

A k-th order recurrence needs k initial conditions:
- First order (like T(n) = T(n-1) + 1): needs T(0) or T(1)
- Second order (like Fibonacci): needs T(0) and T(1)

### Mistake 3: Misapplying the Master Theorem

The Master Theorem only works for specific forms. It doesn't apply when:
- f(n) is not polynomial (e.g., f(n) = n/log n)
- The subproblem sizes vary (e.g., T(n) = T(n/3) + T(2n/3) + n)

### Mistake 4: Arithmetic vs. Geometric Behavior

```python
# Linear/arithmetic growth: T(n) = T(n-1) + c → O(n)
# Exponential/geometric: T(n) = 2*T(n-1) + c → O(2^n)
# Log growth: T(n) = T(n/2) + c → O(log n)
```

---

## Best Practices

1. **Identify the type of recurrence** first:
   - Linear homogeneous → Characteristic equation
   - Divide-and-conquer → Master theorem
   - Simple additive → Iteration/telescoping

2. **Always verify** by computing a few terms manually.

3. **Use memoization** or iteration for efficient computation:
```python
def fibonacci_efficient(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1
```

4. **Matrix exponentiation** for O(log n) computation of linear recurrences.

5. **Look for closed-form solutions** when they exist for efficiency.

---

## Summary

Recurrence relations are essential for analyzing recursive algorithms:

- **Iteration/Telescoping**: Expand and find patterns
- **Substitution**: Guess and prove by induction
- **Characteristic equation**: For linear homogeneous recurrences
- **Master Theorem**: For divide-and-conquer recurrences T(n) = aT(n/b) + f(n)

**Key Complexity Classes from Recurrences:**
- T(n) = T(n-1) + c → O(n)
- T(n) = T(n/2) + c → O(log n)
- T(n) = 2T(n/2) + n → O(n log n)
- T(n) = 2T(n-1) + c → O(2^n)

**Algorithm Analysis Pattern:**
1. Write the recurrence from the code structure
2. Identify the type and apply appropriate method
3. Determine the complexity class

---

## Further Exploration

- **Generating functions**: Transform sequences into formal power series
- **Akra-Bazzi method**: Generalizes Master Theorem
- **Annihilator method**: Systematic approach for non-homogeneous recurrences
- **Recurrence relations in probability**: Random walks, Markov chains
