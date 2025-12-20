---
id: math101-t6-existential
title: "The Existential Quantifier (∃)"
order: 4
---

# The Existential Quantifier (∃)

## Definition

The **existential quantifier** ∃ means "there exists" or "for some."

$$\exists x \, P(x)$$

This reads as: "There exists an x such that P(x)" or "Some x satisfies P."

## Truth Condition

∃x P(x) is **True** if and only if P(x) is true for *at least one* element x in the domain.

∃x P(x) is **False** if P(x) is false for *every* element in the domain.

## Examples

### Finite Domain

Domain: {1, 2, 3, 4, 5}

| Statement | Evaluation | Truth Value |
|-----------|------------|-------------|
| ∃x (x > 3) | 4>3 ∨ 5>3 | True |
| ∃x (x < 0) | No element < 0 | False |
| ∃x (x = 3) | 3 = 3 | True |
| ∃x (x² = 4) | 2² = 4 | True |

### Infinite Domain

Domain: ℤ (all integers)

| Statement | Truth Value | Witness |
|-----------|-------------|---------|
| ∃x (x² = 9) | True | x = 3 or x = -3 |
| ∃x (x + 5 = 0) | True | x = -5 |
| ∃x (x² = 2) | False | √2 is not an integer |
| ∃x (2x = 7) | False | 7/2 is not an integer |

## Existential as Giant OR

For a finite domain {a₁, a₂, ..., aₙ}:

$$\exists x \, P(x) \equiv P(a_1) \lor P(a_2) \lor \cdots \lor P(a_n)$$

This interpretation helps understand:
- If ANY P(aᵢ) is true, the whole disjunction is true
- All must be false for the statement to be false

### Example

Domain: {1, 2, 3}
P(x): "x is even"

∃x P(x) ≡ P(1) ∨ P(2) ∨ P(3)
        ≡ False ∨ True ∨ False
        ≡ True

## Existential Quantifier with Conjunction

The most common pattern for ∃ is with conjunction:

$$\exists x \, (P(x) \land Q(x))$$

"There exists an x such that P(x) and Q(x)"

### Why Conjunction?

"Some bird can swim" means there's something that is BOTH a bird AND can swim.

$$\exists x \, (\text{Bird}(x) \land \text{CanSwim}(x))$$

### Common Patterns

| English | Predicate Logic |
|---------|-----------------|
| "Some A is B" | ∃x (A(x) ∧ B(x)) |
| "There is an A that is B" | ∃x (A(x) ∧ B(x)) |
| "At least one A is B" | ∃x (A(x) ∧ B(x)) |

### Examples

"Some prime number is even":
$$\exists x \, (\text{Prime}(x) \land \text{Even}(x))$$
(Witness: x = 2)

"There exists a student who passed":
$$\exists x \, (\text{Student}(x) \land \text{Passed}(x))$$

## Common Mistake: ∃ with Implication

**Don't use → with ∃ for "some A is B"!**

❌ Wrong: ∃x (Bird(x) → CanSwim(x))

This is almost always true! Any non-bird x makes Bird(x) false, so the implication is true.

✅ Correct: ∃x (Bird(x) ∧ CanSwim(x))

## Witnesses

To prove ∃x P(x) is true, provide a **witness**: a specific element c where P(c) is true.

### Example

Prove: ∃x∈ℤ (x² = 25)

Witness: x = 5
Check: 5² = 25 ✓

One witness is sufficient to prove an existential claim.

## Proving Existential Statements

### Method 1: Constructive Proof

Find and exhibit a specific witness.

"Let x = c. Then P(c) is true because [reason]. Therefore ∃x P(x)."

### Method 2: Non-Constructive Proof

Prove that a witness must exist without explicitly finding it.

Example: "There exists an irrational number r such that r^r is rational."

Proof: Consider √2^√2. Either:
- It's rational, and r = √2 is our witness, or
- It's irrational, and (√2^√2)^√2 = 2 is rational, so r = √2^√2 is our witness.

Either way, such r exists, though we don't know which case holds.

## Disproving Existential Statements

To prove ∃x P(x) is false, show P(x) fails for ALL x.

### Example

Disprove: ∃x∈ℤ (x² = -1)

Proof: For any integer x, x² ≥ 0 (since squares are non-negative).
Therefore x² ≠ -1 for all x ∈ ℤ.

## Existential in Programming

```python
# Check if any element satisfies a condition
def exists(predicate, domain):
    for x in domain:
        if predicate(x):
            return True
    return False

# Python built-in
any(x > 100 for x in numbers)  # ∃x ∈ numbers. x > 100

# Returns False if domain is empty
any(x > 0 for x in [])  # False
```

## Empty Domain

If the domain is empty, ∃x P(x) is **false** (no element exists to satisfy P).

This contrasts with ∀x P(x) which is vacuously true over empty domains.

## Uniqueness Quantifier (∃!)

The **uniqueness quantifier** ∃! means "there exists exactly one."

$$\exists! x \, P(x)$$

"There exists a unique x such that P(x)"

### Formal Definition

$$\exists! x \, P(x) \equiv \exists x \, (P(x) \land \forall y \, (P(y) \to y = x))$$

Or equivalently:
$$\exists! x \, P(x) \equiv \exists x \, P(x) \land \forall x \, \forall y \, ((P(x) \land P(y)) \to x = y)$$

### Example

"There exists a unique even prime":
$$\exists! x \, (\text{Prime}(x) \land \text{Even}(x))$$

True—the unique witness is 2.

## Bounded Existential Quantification

Restrict the quantifier to a subset:

$$\exists x \in S \, P(x)$$

Equivalent to:
$$\exists x \, (x \in S \land P(x))$$

### Example

"Some positive integer is a perfect square less than 10":
$$\exists n \in \mathbb{Z}^+ \, (n < 10 \land \exists k \, (k^2 = n))$$

Witnesses: 1, 4, 9

## Multiple Existential Quantifiers

$$\exists x \, \exists y \, P(x, y)$$

Means there exist values for both x and y making P true.

Can be written as: ∃x ∃y P(x,y) or ∃x,y P(x,y)

### Example

"There exist integers that sum to 10":
$$\exists x \, \exists y \, (x + y = 10)$$

Witnesses: x = 3, y = 7 (among infinitely many)

## Summary

**Existential quantifier (∃):**
- Means "there exists" or "for some"
- True when predicate holds for AT LEAST ONE domain element
- False if NO element satisfies the predicate

**Key patterns:**
- ∃x (A(x) ∧ B(x)) for "Some A is B"
- Think of ∃ as a giant OR over the domain
- DON'T use ∃ with → for "some A is B"

**Proving/disproving:**
- Prove: Exhibit one witness
- Disprove: Show all elements fail

**Uniqueness (∃!):**
- "Exactly one" = "at least one" + "at most one"
