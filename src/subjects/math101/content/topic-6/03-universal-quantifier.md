---
id: math101-t6-universal
title: "The Universal Quantifier (∀)"
order: 3
---

# The Universal Quantifier (∀)

## Definition

The **universal quantifier** ∀ means "for all" or "for every."

$$\forall x \, P(x)$$

This reads as: "For all x, P(x) is true" or "Every x satisfies P."

## Truth Condition

∀x P(x) is **True** if and only if P(x) is true for *every* element x in the domain.

∀x P(x) is **False** if there exists *even one* element x in the domain for which P(x) is false.

## Examples

### Finite Domain

Domain: {1, 2, 3, 4, 5}

| Statement | Evaluation | Truth Value |
|-----------|------------|-------------|
| ∀x (x > 0) | 1>0 ∧ 2>0 ∧ 3>0 ∧ 4>0 ∧ 5>0 | True |
| ∀x (x < 4) | 1<4 ∧ 2<4 ∧ 3<4 ∧ 4<4 ∧ 5<4 | False (4,5 fail) |
| ∀x (x ≤ 5) | All ≤ 5 | True |

### Infinite Domain

Domain: ℤ (all integers)

| Statement | Truth Value | Reason |
|-----------|-------------|--------|
| ∀x (x² ≥ 0) | True | Squares are never negative |
| ∀x (x > 0) | False | Counterexample: -1 |
| ∀x (x = x) | True | Reflexivity of equality |
| ∀x (x ≠ x + 1) | True | No integer equals its successor |

## Universal as Giant AND

For a finite domain {a₁, a₂, ..., aₙ}:

$$\forall x \, P(x) \equiv P(a_1) \land P(a_2) \land \cdots \land P(a_n)$$

This interpretation helps understand:
- If ANY P(aᵢ) is false, the whole conjunction is false
- ALL must be true for the statement to be true

### Example

Domain: {1, 2, 3}
P(x): "x < 10"

∀x P(x) ≡ P(1) ∧ P(2) ∧ P(3)
        ≡ (1 < 10) ∧ (2 < 10) ∧ (3 < 10)
        ≡ True ∧ True ∧ True
        ≡ True

## Universal Quantifier with Implications

The most common pattern for ∀ is with implication:

$$\forall x \, (P(x) \to Q(x))$$

"For all x, if P(x) then Q(x)"

### Why Implication?

"All dogs bark" doesn't mean everything is a dog that barks.
It means: *If* something is a dog, *then* it barks.

$$\forall x \, (\text{Dog}(x) \to \text{Barks}(x))$$

### Common Patterns

| English | Predicate Logic |
|---------|-----------------|
| "All A are B" | ∀x (A(x) → B(x)) |
| "Every A is B" | ∀x (A(x) → B(x)) |
| "Each A is B" | ∀x (A(x) → B(x)) |
| "Any A is B" | ∀x (A(x) → B(x)) |

### Examples

"All prime numbers greater than 2 are odd":
$$\forall x \, ((\text{Prime}(x) \land x > 2) \to \text{Odd}(x))$$

"Every student passed the exam":
$$\forall x \, (\text{Student}(x) \to \text{Passed}(x))$$

"All integers are rational":
$$\forall x \in \mathbb{Z} \, (x \in \mathbb{Q})$$

## Vacuous Truth

If the domain is empty, or no element satisfies the hypothesis of an implication, the universal statement is **vacuously true**.

### Empty Domain

If D = ∅, then ∀x∈D P(x) is true (no counterexamples exist).

### Empty Hypothesis

"All purple elephants can fly" is vacuously true because there are no purple elephants.

∀x (PurpleElephant(x) → CanFly(x))

The implication is never tested because the antecedent is never true.

## Counterexamples

To prove ∀x P(x) is **false**, find ONE element c where P(c) is false.

This element c is called a **counterexample**.

### Example

Claim: ∀x∈ℤ (x² > x)

Counterexample: x = 0
Check: 0² = 0, and 0 > 0 is false.

One counterexample suffices to disprove a universal claim.

## Proving Universal Statements

To prove ∀x P(x) is true:

### Method 1: Direct Proof

Take an arbitrary element x from the domain and prove P(x).

"Let x be an arbitrary element of D. [Proof that P(x) holds.] Since x was arbitrary, ∀x P(x)."

### Method 2: Proof by Contrapositive

For ∀x (P(x) → Q(x)), prove ∀x (¬Q(x) → ¬P(x)).

### Method 3: Exhaustive Check (Finite Domains)

Check P(x) for every x in the domain.

## Universal Quantifier in Programming

```python
# Check if all elements satisfy a condition
def for_all(predicate, domain):
    for x in domain:
        if not predicate(x):
            return False
    return True

# Python built-in
all(x > 0 for x in numbers)  # ∀x ∈ numbers. x > 0

# Returns True if domain is empty (vacuous truth)
all(x > 0 for x in [])  # True
```

## Universal with Multiple Variables

When multiple universally quantified variables appear:

$$\forall x \, \forall y \, P(x, y)$$

This means P(x, y) holds for every combination of x and y.

Can be written as: ∀x ∀y P(x,y) or ∀x,y P(x,y)

### Example

"Addition is commutative":
$$\forall x \, \forall y \, (x + y = y + x)$$

This must hold for ALL pairs (x, y) in the domain.

## Bounded Universal Quantification

Restrict the quantifier to a subset:

$$\forall x \in S \, P(x)$$

Equivalent to:
$$\forall x \, (x \in S \to P(x))$$

### Example

"All positive integers have a successor":
$$\forall n \in \mathbb{Z}^+ \, \exists m \in \mathbb{Z}^+ \, (m = n + 1)$$

## Summary

**Universal quantifier (∀):**
- Means "for all" or "for every"
- True when predicate holds for ALL domain elements
- False if ANY counterexample exists

**Key patterns:**
- ∀x (A(x) → B(x)) for "All A are B"
- Think of ∀ as a giant AND over the domain

**Proving/disproving:**
- Prove: Show P(x) for arbitrary x
- Disprove: Find one counterexample

**Vacuous truth:**
- ∀x P(x) is true over empty domains
- ∀x (False → Q(x)) is always true
