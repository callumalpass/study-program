---
id: math101-t2-strong
title: "Strong Induction"
order: 6
---

# Strong Induction and Well-Ordering

## Limitations of Standard Induction

Standard induction assumes P(k) and proves P(k+1). But sometimes P(k+1) depends not just on P(k), but on earlier cases like P(k-1), P(k-2), or even P(1).

Consider the Fibonacci sequence: F(n) = F(n-1) + F(n-2). To prove something about F(n), you need information about both F(n-1) AND F(n-2).

This is where **strong induction** comes in.

## The Principle of Strong Induction

To prove ∀n ≥ n₀, P(n):

1. **Base Case(s):** Prove P(n₀) (and possibly P(n₀+1), P(n₀+2)... if needed)
2. **Inductive Step:** Prove that for any k ≥ n₀, if P(n₀), P(n₀+1), ..., P(k) are ALL true, then P(k+1) is true.

The inductive hypothesis in strong induction assumes **all previous cases**, not just the immediately preceding one.

## The Structure

```
Theorem: For all n ≥ n₀, P(n).

Proof: (by strong induction on n)

Base Case(s):
[Prove P(n₀), and possibly P(n₀+1), etc., as needed]

Inductive Step:
Assume P(m) is true for all m with n₀ ≤ m ≤ k.  [Strong Inductive Hypothesis]
[Show P(k+1) is true, possibly using any of P(n₀), P(n₀+1), ..., P(k)]

By strong induction, P(n) is true for all n ≥ n₀. □
```

## Example 1: Fundamental Theorem of Arithmetic (Existence)

**Theorem:** Every integer n ≥ 2 can be written as a product of primes.

**Proof:** (by strong induction on n)

**Base Case (n = 2):**
2 is prime, so 2 = 2 is a product of primes (just one prime). ✓

**Inductive Step:**
Assume every integer m with 2 ≤ m ≤ k can be written as a product of primes.

Consider k + 1.

**Case 1:** k + 1 is prime.
Then k + 1 is itself a product of primes (just one). ✓

**Case 2:** k + 1 is composite.
Then k + 1 = a · b for some integers a, b with 2 ≤ a, b < k + 1.
By the strong inductive hypothesis, a and b can each be written as products of primes.
Therefore, k + 1 = a · b is also a product of primes. ✓

By strong induction, every n ≥ 2 can be written as a product of primes. □

## Example 2: Fibonacci Lower Bound

**Theorem:** For all n ≥ 6, Fₙ ≥ 2^(n/2), where Fₙ is the nth Fibonacci number.

**Proof:** (by strong induction)

**Base Cases:**
- F₆ = 8 and 2^(6/2) = 2³ = 8. So F₆ ≥ 2³ ✓
- F₇ = 13 and 2^(7/2) = 2^3.5 ≈ 11.3. So F₇ ≥ 2^(7/2) ✓

**Inductive Step:**
Assume Fₘ ≥ 2^(m/2) for all m with 6 ≤ m ≤ k, where k ≥ 7.

Consider F(k+1) = Fₖ + F(k-1).

By strong IH:
- Fₖ ≥ 2^(k/2)
- F(k-1) ≥ 2^((k-1)/2)

Therefore:
F(k+1) ≥ 2^(k/2) + 2^((k-1)/2)
       = 2^((k-1)/2)(2^(1/2) + 1)
       ≥ 2^((k-1)/2) · 2  [since √2 + 1 > 2]
       = 2^((k-1)/2 + 1)
       = 2^((k+1)/2) ✓

By strong induction, Fₙ ≥ 2^(n/2) for all n ≥ 6. □

## Example 3: Making Change

**Theorem:** Every amount of postage ≥ 12 cents can be made using 4-cent and 5-cent stamps.

**Proof:** (by strong induction)

**Base Cases:**
- 12 = 4 + 4 + 4 (three 4-cent stamps) ✓
- 13 = 4 + 4 + 5 (two 4-cent, one 5-cent) ✓
- 14 = 4 + 5 + 5 (one 4-cent, two 5-cent) ✓
- 15 = 5 + 5 + 5 (three 5-cent stamps) ✓

**Inductive Step:**
Assume every amount m with 12 ≤ m ≤ k can be made, where k ≥ 15.

For k + 1: Since k + 1 ≥ 16, we have (k + 1) - 4 = k - 3 ≥ 12.

By strong IH, k - 3 can be made with 4-cent and 5-cent stamps.
Adding one 4-cent stamp gives k + 1 cents. ✓

By strong induction, every amount ≥ 12 cents can be made. □

## The Well-Ordering Principle

The **Well-Ordering Principle** states: Every non-empty set of positive integers has a least element.

This principle is logically equivalent to both standard and strong induction.

## Proof by Smallest Counterexample

Using the well-ordering principle, we can prove statements by assuming a counterexample exists and deriving a contradiction.

```
Theorem: For all n ≥ n₀, P(n).

Proof: (by smallest counterexample)
Suppose the theorem is false.
Let S = {n ≥ n₀ : P(n) is false}.
By assumption, S is non-empty.
By well-ordering, S has a least element, call it m.
[Show this leads to a contradiction, often by finding a smaller counterexample]
Therefore, S must be empty, and P(n) is true for all n ≥ n₀. □
```

## Example: Well-Ordering Proof

**Theorem:** Every positive integer can be written in binary (base 2).

**Proof:** (by smallest counterexample)
Suppose not. Let m be the smallest positive integer that cannot be written in binary.

**Case 1:** m = 1.
But 1 = 1₂ in binary. Contradiction.

**Case 2:** m is even.
Then m = 2k for some positive integer k < m.
Since k < m, k can be written in binary (m was the smallest counterexample).
If k = (bₙbₙ₋₁...b₁b₀)₂, then m = 2k = (bₙbₙ₋₁...b₁b₀0)₂.
Contradiction: m can be written in binary.

**Case 3:** m is odd and m > 1.
Then m - 1 is even and m - 1 < m.
Since m - 1 < m, it can be written in binary.
If m - 1 = (bₙbₙ₋₁...b₁0)₂, then m = (bₙbₙ₋₁...b₁1)₂.
Contradiction: m can be written in binary.

In all cases, we have a contradiction.
Therefore, every positive integer can be written in binary. □

## When to Use Strong Induction

Use strong induction when:
- P(k+1) depends on multiple previous cases
- The problem involves recursive definitions (like Fibonacci)
- You need flexibility in which previous case to use
- The problem involves "breaking down" (like factorization)

## Strong vs. Standard Induction

| Aspect | Standard | Strong |
|--------|----------|--------|
| **IH assumes** | P(k) | P(n₀), P(n₀+1), ..., P(k) |
| **Base cases** | Usually one | May need several |
| **Use when** | P(k+1) depends only on P(k) | P(k+1) depends on earlier cases |
| **Equivalent?** | Yes, they prove the same theorems |

In fact, strong and standard induction are logically equivalent—anything provable with one is provable with the other. But strong induction is often more natural for certain problems.

## Summary

**Strong Induction:**
- Assume all cases P(n₀) through P(k) in the inductive step
- Useful when you need more than just the previous case
- May require multiple base cases

**Well-Ordering Principle:**
- Every non-empty set of positive integers has a minimum
- Equivalent to induction
- Enables "smallest counterexample" proofs

These techniques extend the power of induction to handle problems where the standard "P(k) implies P(k+1)" pattern is too restrictive.
