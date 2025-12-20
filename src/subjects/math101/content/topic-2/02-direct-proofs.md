---
id: math101-t2-direct
title: "Direct Proofs"
order: 2
---

# Direct Proofs

## What is a Direct Proof?

A **direct proof** is the most straightforward proof technique. To prove an implication P → Q, we:
1. Assume P is true
2. Use logical steps to derive Q
3. Conclude that P → Q is true

This mirrors the structure of the implication itself: we show that whenever P holds, Q must follow.

## The Basic Structure

```
Theorem: If P, then Q.

Proof:
Assume P.
[Logical derivation...]
Therefore, Q.
Thus, P → Q.  □
```

## Example 1: Sum of Even Numbers

**Theorem:** The sum of two even numbers is even.

**Proof:**
Let a and b be even numbers.

By definition of even, there exist integers k and m such that:
- a = 2k
- b = 2m

Then:
a + b = 2k + 2m = 2(k + m)

Since k + m is an integer, a + b = 2(k + m) is even by definition.

Therefore, the sum of two even numbers is even. □

### Key Elements:
1. Started with the assumption (a and b are even)
2. Used the definition of even
3. Performed algebraic manipulation
4. Applied the definition again to conclude

## Example 2: Product of Odd Numbers

**Theorem:** The product of two odd numbers is odd.

**Proof:**
Let a and b be odd numbers.

By definition of odd, there exist integers k and m such that:
- a = 2k + 1
- b = 2m + 1

Then:
ab = (2k + 1)(2m + 1)
   = 4km + 2k + 2m + 1
   = 2(2km + k + m) + 1

Since 2km + k + m is an integer, ab has the form 2n + 1 for some integer n.

Therefore, ab is odd. □

## Example 3: Square of an Even Number

**Theorem:** If n is even, then n² is even.

**Proof:**
Assume n is even.

Then n = 2k for some integer k.

Therefore:
n² = (2k)² = 4k² = 2(2k²)

Since 2k² is an integer, n² = 2(2k²) is even.

Thus, if n is even, then n² is even. □

## Important Definitions

Many direct proofs rely on definitions. Here are key ones:

### Integers
- **Even:** n is even if n = 2k for some integer k
- **Odd:** n is odd if n = 2k + 1 for some integer k
- **Divides:** a divides b (written a | b) if b = ak for some integer k

### Rational Numbers
- **Rational:** r is rational if r = p/q where p, q are integers and q ≠ 0

### General
- **Prime:** p > 1 is prime if its only positive divisors are 1 and p
- **Composite:** n > 1 is composite if it has a divisor d with 1 < d < n

## Example 4: Using Divisibility

**Theorem:** If a | b and b | c, then a | c.

**Proof:**
Assume a | b and b | c.

By definition of divides:
- b = ak for some integer k
- c = bm for some integer m

Then:
c = bm = (ak)m = a(km)

Since km is an integer, a | c by definition.

Therefore, if a | b and b | c, then a | c. □

## Example 5: Rational Numbers

**Theorem:** The sum of two rational numbers is rational.

**Proof:**
Let r and s be rational numbers.

Then r = a/b and s = c/d for some integers a, b, c, d with b ≠ 0 and d ≠ 0.

The sum is:
r + s = a/b + c/d = (ad + bc)/(bd)

Since a, b, c, d are integers:
- ad + bc is an integer (closed under multiplication and addition)
- bd is an integer and bd ≠ 0 (since b ≠ 0 and d ≠ 0)

Therefore r + s is rational. □

## Proving Biconditionals

For a biconditional P ↔ Q, we prove both directions:
1. Direct proof of P → Q
2. Direct proof of Q → P

**Theorem:** n is even if and only if n + 1 is odd.

**Proof:**
(→) Assume n is even. Then n = 2k for some integer k.
So n + 1 = 2k + 1, which is odd by definition.

(←) Assume n + 1 is odd. Then n + 1 = 2m + 1 for some integer m.
So n = 2m, which is even by definition.

Therefore, n is even if and only if n + 1 is odd. □

## Strategies for Direct Proofs

### 1. Start from Definitions
Almost every direct proof uses definitions. The definition of your hypothesis usually gives you something to work with.

### 2. Work Forward from Assumptions
Start with what you know and manipulate toward what you want to show.

### 3. Work Backward from the Goal
Think about what form your conclusion needs to take, then work toward it.

### 4. Introduce Variables Properly
"Let x be..." or "There exists k such that..." — be precise about what variables represent.

### 5. Justify Each Step
Each step should follow from:
- Previous steps
- Definitions
- Known theorems or axioms
- Algebraic/arithmetic rules

## Common Pitfalls

### Pitfall 1: Assuming What You're Trying to Prove
❌ "To prove n² is even implies n is even, assume n is even..."
This assumes the conclusion! That's the contrapositive, not a direct proof of the original.

### Pitfall 2: Not Using the Hypothesis
Your proof should use the assumption P. If it doesn't, either the theorem is trivially true or something is wrong.

### Pitfall 3: Circular Reasoning
Every step must follow from earlier steps, not from later ones or from the conclusion.

### Pitfall 4: Missing Cases
Make sure your proof covers all cases. If you assumed k is positive, does it work for negative k?

## When to Use Direct Proof

Direct proof works well when:
- The hypothesis gives you useful information to manipulate
- The path from P to Q is clear
- Definitions can be "unwrapped" and "rewrapped"

If direct proof seems difficult, consider:
- Contrapositive (prove ¬Q → ¬P)
- Contradiction (assume P ∧ ¬Q, derive impossibility)

## Summary

Direct proof is the fundamental proof technique:
1. Assume the hypothesis P
2. Apply definitions, theorems, and logical rules
3. Derive the conclusion Q

Key strategies:
- Unpack definitions
- Work both forward from assumptions and backward from goals
- Justify every step
- Check you've used the hypothesis

Most proofs you encounter will be direct proofs or contain direct proof as a component.
