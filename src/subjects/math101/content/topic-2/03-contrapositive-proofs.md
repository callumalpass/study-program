# Proof by Contrapositive

## The Logical Foundation

Recall from propositional logic that an implication is logically equivalent to its contrapositive:

$$P \to Q \equiv \neg Q \to \neg P$$

This means proving ¬Q → ¬P is exactly as valid as proving P → Q directly. The two statements have identical truth values in all cases.

## When to Use Contrapositive

Proof by contrapositive is especially useful when:
- The negation of Q gives you more useful information than P
- Working "backward" from ¬Q is more natural
- P involves an existential statement (∃) that becomes universal (∀) when negated
- Direct proof seems to lead nowhere

## The Basic Structure

```
Theorem: If P, then Q.

Proof: (by contrapositive)
We prove the contrapositive: If not Q, then not P.

Assume ¬Q.
[Logical derivation...]
Therefore, ¬P.

Since the contrapositive is true, the original statement P → Q is true. □
```

## Example 1: The Classic "n² Even Implies n Even"

**Theorem:** For any integer n, if n² is even, then n is even.

**Direct proof is tricky:** Starting with "n² is even" gives us n² = 2k, but extracting information about n requires knowing about its factors.

**Contrapositive is cleaner:** Prove "if n is odd, then n² is odd."

**Proof:** (by contrapositive)
We prove: If n is odd, then n² is odd.

Assume n is odd.
Then n = 2k + 1 for some integer k.

Therefore:
n² = (2k + 1)²
   = 4k² + 4k + 1
   = 2(2k² + 2k) + 1

Since 2k² + 2k is an integer, n² is odd.

By contrapositive, if n² is even, then n is even. □

## Example 2: Divisibility

**Theorem:** For integers a and b, if ab is odd, then both a and b are odd.

**Contrapositive:** If a is even OR b is even, then ab is even.

**Proof:** (by contrapositive)
Assume a is even or b is even.

**Case 1:** a is even.
Then a = 2k for some integer k.
So ab = 2k · b = 2(kb), which is even.

**Case 2:** b is even.
Then b = 2m for some integer m.
So ab = a · 2m = 2(am), which is even.

In either case, ab is even.

By contrapositive, if ab is odd, then both a and b are odd. □

## Example 3: Inequality

**Theorem:** For real numbers x and y, if x + y ≥ 2, then x ≥ 1 or y ≥ 1.

**Contrapositive:** If x < 1 AND y < 1, then x + y < 2.

**Proof:** (by contrapositive)
Assume x < 1 and y < 1.

Adding these inequalities:
x + y < 1 + 1 = 2

Therefore x + y < 2.

By contrapositive, if x + y ≥ 2, then x ≥ 1 or y ≥ 1. □

## Negating Complex Statements

To use contrapositive, you need to correctly negate both P and Q.

### Negation Rules Review

| Statement | Negation |
|-----------|----------|
| A ∧ B | ¬A ∨ ¬B |
| A ∨ B | ¬A ∧ ¬B |
| ∀x P(x) | ∃x ¬P(x) |
| ∃x P(x) | ∀x ¬P(x) |
| x > a | x ≤ a |
| x ≥ a | x < a |

### Example: Negating a Conjunction

**Original:** If x² + y² = 0, then x = 0 and y = 0.
**Contrapositive:** If x ≠ 0 or y ≠ 0, then x² + y² ≠ 0.

### Example: Negating a Disjunction

**Original:** If x is even or y is even, then xy is even.
**Contrapositive:** If xy is odd, then x is odd and y is odd.

## Example 4: Involving Quantifiers

**Theorem:** For all integers n, if n³ + 5 is odd, then n is even.

**Contrapositive:** If n is odd, then n³ + 5 is even.

**Proof:** (by contrapositive)
Assume n is odd. Then n = 2k + 1 for some integer k.

n³ = (2k + 1)³
   = 8k³ + 12k² + 6k + 1
   = 2(4k³ + 6k² + 3k) + 1

So n³ is odd.

Since n³ is odd and 5 is odd, n³ + 5 is even (sum of two odds).

By contrapositive, if n³ + 5 is odd, then n is even. □

## Example 5: Irrational Numbers

**Theorem:** If x is irrational, then √x is irrational.

**Contrapositive:** If √x is rational, then x is rational.

**Proof:** (by contrapositive)
Assume √x is rational.

Then √x = p/q for some integers p, q with q ≠ 0.

Therefore x = (√x)² = p²/q².

Since p² and q² are integers and q² ≠ 0, x is rational.

By contrapositive, if x is irrational, then √x is irrational. □

## Comparison: Direct vs. Contrapositive

| Aspect | Direct Proof | Contrapositive |
|--------|--------------|----------------|
| **Assumes** | P | ¬Q |
| **Derives** | Q | ¬P |
| **Best when** | P gives useful structure | ¬Q gives useful structure |
| **Example** | Sum of evens is even | n² even → n even |

## Common Mistakes

### Mistake 1: Confusing Converse and Contrapositive

- **Converse** of P → Q: Q → P (NOT equivalent!)
- **Contrapositive** of P → Q: ¬Q → ¬P (Equivalent!)

### Mistake 2: Incorrect Negation

¬(A ∧ B) = ¬A ∨ ¬B, not ¬A ∧ ¬B

Make sure you apply De Morgan's Laws correctly.

### Mistake 3: Forgetting to State the Method

Always clearly state "Proof by contrapositive" so the reader knows what you're proving.

## When Contrapositive Isn't Best

Contrapositive doesn't help when:
- P already gives you useful information directly
- Both P and ¬Q are equally informative
- The statement isn't an implication

In these cases, try direct proof or contradiction instead.

## Summary

Proof by contrapositive:
1. To prove P → Q, instead prove ¬Q → ¬P
2. This works because P → Q ≡ ¬Q → ¬P
3. Especially useful when ¬Q provides more structure than P

Key points:
- Correctly negate both sides
- State your method explicitly
- Don't confuse contrapositive with converse
- Choose contrapositive when the negated conclusion is easier to work with
