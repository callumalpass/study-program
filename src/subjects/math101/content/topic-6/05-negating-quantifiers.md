---
id: math101-t6-negation
title: "Negating Quantified Statements"
order: 5
---

# Negating Quantified Statements

## The Fundamental Rules

Negating quantified statements follows a systematic pattern—quantifiers "flip" and the predicate is negated:

$$\neg(\forall x \, P(x)) \equiv \exists x \, \neg P(x)$$

$$\neg(\exists x \, P(x)) \equiv \forall x \, \neg P(x)$$

These are often called **De Morgan's laws for quantifiers**.

## Intuitive Understanding

### Negating Universal

"NOT all students passed" ≡ "Some student did NOT pass"

¬(∀x P(x)) ≡ ∃x ¬P(x)

To disprove "everything has property P," you need ONE counterexample—something that DOESN'T have P.

### Negating Existential

"NOT some student cheated" ≡ "ALL students did NOT cheat" ≡ "No student cheated"

¬(∃x P(x)) ≡ ∀x ¬P(x)

To disprove "something has property P," you must show NOTHING has P.

## Examples

### Simple Negations

| Statement | Negation |
|-----------|----------|
| ∀x (x > 0) | ∃x (x ≤ 0) |
| ∃x (x² = 5) | ∀x (x² ≠ 5) |
| ∀x (P(x) ∨ Q(x)) | ∃x (¬P(x) ∧ ¬Q(x)) |
| ∃x (P(x) ∧ Q(x)) | ∀x (¬P(x) ∨ ¬Q(x)) |

### English to English

| Original | Negation |
|----------|----------|
| "All birds can fly" | "Some bird cannot fly" |
| "Some dogs are aggressive" | "No dogs are aggressive" |
| "Every number is positive" | "Some number is not positive" |
| "There exists a solution" | "No solution exists" |

## Negating Statements with Implications

Many universal statements use implication. Recall:
$$\neg(P \to Q) \equiv P \land \neg Q$$

### Negating ∀x (P(x) → Q(x))

Step by step:
1. ¬(∀x (P(x) → Q(x)))
2. ∃x ¬(P(x) → Q(x))
3. ∃x (P(x) ∧ ¬Q(x))

### Example

Original: "All prime numbers greater than 2 are odd"
$$\forall x \, ((\text{Prime}(x) \land x > 2) \to \text{Odd}(x))$$

Negation: "There exists a prime greater than 2 that is not odd"
$$\exists x \, (\text{Prime}(x) \land x > 2 \land \neg\text{Odd}(x))$$

## Negating Nested Quantifiers

For multiple quantifiers, negate from outside in, flipping each quantifier:

$$\neg(\forall x \, \exists y \, P(x,y)) \equiv \exists x \, \forall y \, \neg P(x,y)$$

$$\neg(\exists x \, \forall y \, P(x,y)) \equiv \forall x \, \exists y \, \neg P(x,y)$$

### Algorithm

1. Work from left to right
2. Change each ∀ to ∃ and each ∃ to ∀
3. Negate the innermost predicate

### Example 1

Original: "For every x, there exists y such that x < y"
$$\forall x \, \exists y \, (x < y)$$

Negation: "There exists x such that for all y, x ≥ y"
$$\exists x \, \forall y \, (x \geq y)$$

(The negation claims some x is greater than or equal to everything—a maximum element.)

### Example 2

Original: "There exists a y that works for all x"
$$\exists y \, \forall x \, P(x, y)$$

Negation: "For every y, there's some x for which it fails"
$$\forall y \, \exists x \, \neg P(x, y)$$

## Complex Negation Examples

### Example: Continuity

The definition of continuous at point a:
$$\forall \epsilon > 0 \, \exists \delta > 0 \, \forall x \, (|x - a| < \delta \to |f(x) - f(a)| < \epsilon)$$

Negation (NOT continuous at a):
$$\exists \epsilon > 0 \, \forall \delta > 0 \, \exists x \, (|x - a| < \delta \land |f(x) - f(a)| \geq \epsilon)$$

"There's some ε such that no δ works for all x."

### Example: Limit Definition

Original: lim(x→a) f(x) = L
$$\forall \epsilon > 0 \, \exists \delta > 0 \, \forall x \, (0 < |x - a| < \delta \to |f(x) - L| < \epsilon)$$

Negation (limit is not L):
$$\exists \epsilon > 0 \, \forall \delta > 0 \, \exists x \, (0 < |x - a| < \delta \land |f(x) - L| \geq \epsilon)$$

## Common Mistake

**Don't just negate the predicate without flipping quantifiers!**

❌ Wrong: ¬(∀x P(x)) = ∀x ¬P(x)

This incorrectly claims NOTHING has property P.

✅ Correct: ¬(∀x P(x)) = ∃x ¬P(x)

This correctly claims SOMETHING lacks property P.

## Proof by Contradiction Connection

Negation rules are essential for proofs by contradiction:

To prove ∀x P(x):
1. Assume ¬(∀x P(x))
2. That is, assume ∃x ¬P(x)
3. Let c be such that ¬P(c)
4. Derive a contradiction
5. Conclude ∀x P(x)

## Negation and "No"

"No A is B" can be expressed two equivalent ways:

$$\neg\exists x \, (A(x) \land B(x)) \equiv \forall x \, (A(x) \to \neg B(x))$$

Both mean: "Everything that is A is not B" or "Nothing is both A and B."

### Example

"No prime number is negative":
- ¬∃x (Prime(x) ∧ Negative(x))
- ∀x (Prime(x) → ¬Negative(x))

## Restricted Quantifier Negation

For bounded quantifiers:

$$\neg(\forall x \in S \, P(x)) \equiv \exists x \in S \, \neg P(x)$$

$$\neg(\exists x \in S \, P(x)) \equiv \forall x \in S \, \neg P(x)$$

The restriction remains; only the quantifier flips.

## Practice Exercises

Negate these statements:

1. ∀x (x² ≥ 0)
   → ∃x (x² < 0)

2. ∃x (x + x = x)
   → ∀x (x + x ≠ x)

3. ∀x ∃y (x + y = 0)
   → ∃x ∀y (x + y ≠ 0)

4. "Every function has a fixed point"
   → "Some function has no fixed point"

5. ∀x (Even(x) → Divisible(x, 2))
   → ∃x (Even(x) ∧ ¬Divisible(x, 2))

## Summary

**De Morgan's laws for quantifiers:**
- ¬(∀x P(x)) ≡ ∃x ¬P(x)
- ¬(∃x P(x)) ≡ ∀x ¬P(x)

**Process for negation:**
1. Flip each quantifier (∀ ↔ ∃)
2. Negate the innermost predicate
3. Apply propositional negation rules (e.g., ¬(P→Q) ≡ P∧¬Q)

**Key insight:**
- Negating "all have P" → "some lacks P"
- Negating "some has P" → "all lack P"
