# Mathematical Induction

## The Domino Effect

Mathematical induction is a proof technique for establishing that a statement P(n) is true for all natural numbers n ≥ n₀ (usually n₀ = 0 or 1).

Think of it like dominoes falling:
1. **Base Case:** The first domino falls (P(n₀) is true)
2. **Inductive Step:** Each falling domino knocks over the next (P(k) → P(k+1))
3. **Conclusion:** All dominoes fall (P(n) is true for all n ≥ n₀)

## The Principle of Mathematical Induction

To prove ∀n ≥ n₀, P(n):

1. **Base Case:** Prove P(n₀) is true
2. **Inductive Step:** Prove that for any k ≥ n₀, if P(k) is true, then P(k+1) is true

If both steps succeed, then P(n) is true for all n ≥ n₀.

## The Structure

```
Theorem: For all n ≥ n₀, P(n).

Proof: (by induction on n)

Base Case (n = n₀):
[Show P(n₀) is true]

Inductive Step:
Assume P(k) is true for some arbitrary k ≥ n₀.  [This is the Inductive Hypothesis]
[Show P(k+1) is true using the assumption]

By the principle of mathematical induction, P(n) is true for all n ≥ n₀. □
```

## Example 1: Sum of First n Integers

**Theorem:** For all n ≥ 1, 1 + 2 + 3 + ... + n = n(n+1)/2.

**Proof:** (by induction)

**Base Case (n = 1):**
LHS: 1
RHS: 1(1+1)/2 = 1(2)/2 = 1
LHS = RHS ✓

**Inductive Step:**
Assume 1 + 2 + ... + k = k(k+1)/2 for some k ≥ 1. [Inductive Hypothesis]

We need to show: 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2.

Starting from the LHS:
1 + 2 + ... + k + (k+1)
= k(k+1)/2 + (k+1)  [by Inductive Hypothesis]
= k(k+1)/2 + 2(k+1)/2
= (k(k+1) + 2(k+1))/2
= (k+1)(k + 2)/2
= (k+1)((k+1)+1)/2 ✓

By induction, the formula holds for all n ≥ 1. □

## Example 2: Sum of First n Odd Numbers

**Theorem:** For all n ≥ 1, 1 + 3 + 5 + ... + (2n-1) = n².

**Proof:** (by induction)

**Base Case (n = 1):**
LHS: 1 (the first odd number)
RHS: 1² = 1
LHS = RHS ✓

**Inductive Step:**
Assume 1 + 3 + 5 + ... + (2k-1) = k² for some k ≥ 1.

Show: 1 + 3 + 5 + ... + (2k-1) + (2(k+1)-1) = (k+1)²

LHS:
= k² + (2(k+1) - 1)  [by IH]
= k² + (2k + 2 - 1)
= k² + 2k + 1
= (k + 1)² ✓

By induction, the formula holds for all n ≥ 1. □

## Example 3: Divisibility

**Theorem:** For all n ≥ 0, 3 divides n³ - n.

**Proof:** (by induction)

**Base Case (n = 0):**
0³ - 0 = 0, and 3 | 0 ✓

**Inductive Step:**
Assume 3 | (k³ - k) for some k ≥ 0.

Show: 3 | ((k+1)³ - (k+1))

(k+1)³ - (k+1)
= k³ + 3k² + 3k + 1 - k - 1
= k³ - k + 3k² + 3k
= (k³ - k) + 3(k² + k)

Now:
- 3 | (k³ - k) by Inductive Hypothesis
- 3 | 3(k² + k) since 3 is a factor

Therefore 3 | ((k³ - k) + 3(k² + k)) = (k+1)³ - (k+1) ✓

By induction, 3 | (n³ - n) for all n ≥ 0. □

## Example 4: Inequality

**Theorem:** For all n ≥ 1, 2ⁿ > n.

**Proof:** (by induction)

**Base Case (n = 1):**
2¹ = 2 > 1 ✓

**Inductive Step:**
Assume 2^k > k for some k ≥ 1.

Show: 2^(k+1) > k + 1

2^(k+1) = 2 · 2^k
        > 2 · k  [by IH]
        = k + k
        ≥ k + 1  [since k ≥ 1]

By induction, 2ⁿ > n for all n ≥ 1. □

## Example 5: Geometric Series

**Theorem:** For all n ≥ 0 and r ≠ 1, ∑(i=0 to n) rⁱ = (r^(n+1) - 1)/(r - 1).

**Proof:** (by induction)

**Base Case (n = 0):**
LHS: r⁰ = 1
RHS: (r¹ - 1)/(r - 1) = (r - 1)/(r - 1) = 1 ✓

**Inductive Step:**
Assume ∑(i=0 to k) rⁱ = (r^(k+1) - 1)/(r - 1) for some k ≥ 0.

Show: ∑(i=0 to k+1) rⁱ = (r^(k+2) - 1)/(r - 1)

∑(i=0 to k+1) rⁱ
= ∑(i=0 to k) rⁱ + r^(k+1)
= (r^(k+1) - 1)/(r - 1) + r^(k+1)  [by IH]
= (r^(k+1) - 1)/(r - 1) + r^(k+1)(r - 1)/(r - 1)
= (r^(k+1) - 1 + r^(k+2) - r^(k+1))/(r - 1)
= (r^(k+2) - 1)/(r - 1) ✓

By induction, the formula holds for all n ≥ 0. □

## Common Mistakes

### Mistake 1: Forgetting the Base Case
Without the base case, the inductive step proves nothing. The chain of implications needs a starting point.

### Mistake 2: Not Using the Inductive Hypothesis
If your proof of P(k+1) doesn't use P(k), something is wrong. The whole point is to build on the previous case.

### Mistake 3: Wrong Base Case
If P(1) is what you need but you prove P(0), or vice versa, the proof is incomplete.

### Mistake 4: Assuming Too Much
You assume P(k), not P(k+1). The goal is to *derive* P(k+1) from P(k).

## Tips for Induction Proofs

1. **Write the formula for n = k and n = k+1**
   Seeing both forms helps you spot how to connect them.

2. **Isolate the extra term**
   Usually P(k+1) = P(k) + (something). Use the IH on P(k) and simplify.

3. **Verify with examples**
   Before proving, check the formula for small values like n = 1, 2, 3.

4. **Be explicit about using IH**
   Label where you apply the inductive hypothesis.

5. **Check the algebra**
   Most errors in induction proofs are algebraic.

## Summary

Mathematical induction proves P(n) for all n ≥ n₀:

1. **Base Case:** Prove P(n₀)
2. **Inductive Step:** Prove P(k) → P(k+1) for arbitrary k ≥ n₀

The key insight: you don't prove P(k+1) in isolation. You prove it *assuming P(k)*, which is what makes the chain work.

Induction is essential for:
- Summation formulas
- Divisibility results
- Inequality chains
- Properties of recursively defined sequences
