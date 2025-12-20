---
id: math102-t2-solve
title: "Solving Techniques"
order: 6
---

# Solving Techniques for Recurrences

Beyond the standard methods, several advanced techniques help solve complex recurrence relations. This section explores substitution methods, domain transformations, and asymptotic analysis.

## The Substitution Method

The substitution method involves:
1. Guessing the form of the solution
2. Using induction to prove correctness
3. Finding the constants

### Basic Substitution

**Example:** Prove T(n) = O(n log n) for T(n) = 2T(n/2) + n

**Guess:** T(n) ≤ cn log n for some c

**Proof by induction:**
- Assume T(n/2) ≤ c(n/2)log(n/2)
- Then:
  ```
  T(n) = 2T(n/2) + n
       ≤ 2c(n/2)log(n/2) + n
       = cn log(n/2) + n
       = cn log n - cn log 2 + n
       = cn log n - cn + n
       ≤ cn log n  (when c ≥ 1)
  ```

### Subtracting Lower-Order Terms

Sometimes the guess is slightly off. Use subtraction to fix it.

**Example:** T(n) = T(n/2) + T(n/4) + n

**Guess:** T(n) = Θ(n)

If T(n) ≤ cn fails, try T(n) ≤ cn - bn:
- The lower-order term (-bn) provides slack for the proof

## Domain Transformation

Transform the recurrence domain to simplify solving.

### Exponential Substitution

For recurrences with n/b, let n = b^k (so k = log_b n):

**Original:** T(n) = aT(n/b) + f(n)

**Transformed:** S(k) = T(b^k)

Then: S(k) = aS(k-1) + f(b^k)

This converts divide-and-conquer recurrences to linear recurrences.

### Logarithmic Transformation

For multiplicative recurrences, take logarithms:

**Original:** T(n) = T(n-1)² · c

**Take log:** log T(n) = 2 log T(n-1) + log c

Let S(n) = log T(n):
S(n) = 2S(n-1) + log c

This is now a linear recurrence!

## Full History Recurrences

When T(n) depends on all previous values:

### Differencing Technique

**Example:** T(n) = T(n-1) + T(n-2) + ... + T(1) + n

Write the recurrence for T(n-1):
T(n-1) = T(n-2) + T(n-3) + ... + T(1) + (n-1)

Subtract:
T(n) - T(n-1) = T(n-1) + 1

So: T(n) = 2T(n-1) + 1

This is now a standard linear recurrence!

**Solution:** T(n) = 2^n - 1 (with T(1) = 1)

### Summation Recurrences

**Example:** T(n) = n + (2/n)∑_{i=1}^{n-1} T(i)

Multiply by n:
nT(n) = n² + 2∑T(i)

Similarly for n-1:
(n-1)T(n-1) = (n-1)² + 2∑_{i=1}^{n-2} T(i)

Subtract:
nT(n) - (n-1)T(n-1) = n² - (n-1)² + 2T(n-1)
nT(n) = (n+1)T(n-1) + 2n - 1

Divide by n(n+1):
T(n)/(n+1) = T(n-1)/n + (2n-1)/(n(n+1))

## Asymptotic Solutions

Often we only need asymptotic behavior, not exact solutions.

### Akra-Bazzi Theorem

Generalizes the Master Theorem for recurrences:
T(n) = ∑_{i=1}^{k} a_i T(n/b_i) + f(n)

where a_i > 0, b_i > 1.

**Solution:** T(n) = Θ(n^p(1 + ∫₁ⁿ f(u)/(u^{p+1}) du))

where p satisfies: ∑ a_i/b_i^p = 1

### Recursion Tree Method

Draw the recursion tree to identify patterns:

1. Root: f(n)
2. Children: a copies with f(n/b) each
3. Sum work at each level
4. Sum across all levels

**For T(n) = 2T(n/2) + n:**
```
Level 0: n (1 node)
Level 1: n/2 + n/2 = n (2 nodes)
Level 2: n/4 + n/4 + n/4 + n/4 = n (4 nodes)
...
Level log n: 1 each (n nodes)
```

Total: n × (log n + 1) = Θ(n log n)

## Amortized Recurrences

For operations with varying costs:

### Potential Method

Define potential function Φ. Amortized cost:
ĉ_i = c_i + ΔΦ_i

**Example:** Dynamic array doubling
- Most insertions: O(1)
- Doubling: O(n)
- Amortized: O(1) per insertion

### Aggregate Analysis

Sum total cost over n operations, divide by n.

## Solving Nonlinear Recurrences

### Square Root Recurrences

**Example:** T(n) = T(√n) + 1

Let n = 2^m, so √n = 2^{m/2}:
S(m) = T(2^m) = S(m/2) + 1

This is the Master Theorem case 2:
S(m) = Θ(log m)

So: T(n) = Θ(log log n)

### Polynomial Recurrences

**Example:** T(n) = T(n-1)² (with T(1) = 2)

T(2) = 4, T(3) = 16, T(4) = 256, ...

Pattern: T(n) = 2^{2^{n-1}}

**Verification:** T(n-1)² = (2^{2^{n-2}})² = 2^{2^{n-1}} ✓

## Common Pitfalls

### Boundary Conditions

The base case matters for constants:
- T(1) = 1 vs T(1) = 0 affects additive constants
- For Θ bounds, constants don't change complexity class
- For exact solutions, get boundaries right

### Floor and Ceiling

Real recurrences have ⌊n/2⌋ or ⌈n/2⌉:
- For asymptotic analysis, treat as n/2
- For exact solutions, handle carefully
- Use domain transformation to n = 2^k

### Multiple Recurrence Forms

Some problems have different recurrences for different cases:
- Odd vs even n
- Different structure at different sizes
- Combine solutions carefully

## Summary

Advanced solving techniques include:
- **Substitution:** Guess and verify by induction
- **Domain transformation:** Change variables to simplify
- **Differencing:** Convert full-history to local recurrences
- **Recursion trees:** Visualize and sum work per level
- **Akra-Bazzi:** Handle irregular divide-and-conquer

Each technique has its place; choosing the right one simplifies the solution significantly.
