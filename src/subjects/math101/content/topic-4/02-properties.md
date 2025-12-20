---
id: math101-t4-properties
title: "Properties of Relations"
order: 2
---

# Properties of Relations

## Overview

Relations on a set A (R ⊆ A × A) can have special properties that make them useful for different purposes. The main properties are:

- **Reflexive**: Every element relates to itself
- **Irreflexive**: No element relates to itself
- **Symmetric**: Relations go both ways
- **Antisymmetric**: Only identical elements can relate both ways
- **Transitive**: Relations "chain" together

## Reflexive

A relation R on A is **reflexive** if every element is related to itself.

$$\forall a \in A: (a, a) \in R$$

Equivalently: aRa for all a ∈ A.

### Examples

**Reflexive:**
- ≤ on ℝ: a ≤ a for all a ✓
- = on any set: a = a for all a ✓
- Divisibility on ℤ⁺: a | a for all a ✓
- "Has the same birthday as" on people ✓

**Not reflexive:**
- < on ℝ: a < a is false
- ≠ on any set: a ≠ a is false
- "Is taller than" on people

### Visual Test (Matrix)

In a relation matrix, reflexive means the main diagonal is all 1s.

## Irreflexive

A relation R on A is **irreflexive** if no element is related to itself.

$$\forall a \in A: (a, a) \notin R$$

### Examples

**Irreflexive:**
- < on ℝ: a < a is always false ✓
- ≠ on any set ✓
- "Is the parent of" on people ✓

**Not irreflexive:**
- ≤ on ℝ: 5 ≤ 5 is true
- Any relation containing (a, a) for some a

### Note

A relation can be:
- Reflexive and not irreflexive
- Irreflexive and not reflexive
- Neither reflexive nor irreflexive
- But NOT both reflexive and irreflexive (unless A is empty)

## Symmetric

A relation R on A is **symmetric** if whenever a relates to b, b also relates to a.

$$\forall a, b \in A: (a, b) \in R \to (b, a) \in R$$

Equivalently: aRb implies bRa.

### Examples

**Symmetric:**
- = on any set: a = b implies b = a ✓
- "Is a sibling of" (excluding self) ✓
- "Lives in the same city as" ✓
- {(1,1), (1,2), (2,1), (2,2)} ✓

**Not symmetric:**
- ≤ on ℝ: 1 ≤ 2 but 2 ≰ 1
- "Is the parent of" ✓
- {(1,2)} (no (2,1))

### Visual Test (Matrix)

Symmetric means the matrix equals its transpose (symmetric about the main diagonal).

## Antisymmetric

A relation R on A is **antisymmetric** if whenever a relates to b AND b relates to a, then a = b.

$$\forall a, b \in A: [(a, b) \in R \land (b, a) \in R] \to a = b$$

Equivalently: If aRb and bRa, then a = b.

**Contrapositive:** If a ≠ b, then not (aRb and bRa).

### Examples

**Antisymmetric:**
- ≤ on ℝ: a ≤ b and b ≤ a implies a = b ✓
- Divisibility on ℤ⁺: a | b and b | a implies a = b ✓
- ⊆ on sets: A ⊆ B and B ⊆ A implies A = B ✓
- < on ℝ: Vacuously true (never have both a < b and b < a) ✓

**Not antisymmetric:**
- "Has the same birthday as" (distinct people can share a birthday)
- {(1,2), (2,1), (1,1), (2,2)} (1 ≠ 2 but both directions exist)

### Note on Symmetric vs. Antisymmetric

A relation can be:
- Symmetric only
- Antisymmetric only
- Both (only when the relation consists of (a,a) pairs)
- Neither

The identity relation {(a,a) : a ∈ A} is both symmetric AND antisymmetric!

## Transitive

A relation R on A is **transitive** if whenever a relates to b AND b relates to c, then a relates to c.

$$\forall a, b, c \in A: [(a, b) \in R \land (b, c) \in R] \to (a, c) \in R$$

Equivalently: aRb and bRc implies aRc.

### Examples

**Transitive:**
- ≤ on ℝ: a ≤ b and b ≤ c implies a ≤ c ✓
- = on any set: a = b and b = c implies a = c ✓
- Divisibility: a | b and b | c implies a | c ✓
- ⊆ on sets: A ⊆ B and B ⊆ C implies A ⊆ C ✓

**Not transitive:**
- "Is the parent of": Parent and grandparent aren't the same relation
- {(1,2), (2,3)}: Missing (1,3)

### Testing Transitivity

For each pair (a,b) and (b,c) in R, check that (a,c) is also in R.

## Summary Table

| Property | Definition | "=" | "≤" | "<" | "Is sibling of" |
|----------|-----------|-----|-----|-----|-----------------|
| Reflexive | ∀a: aRa | ✓ | ✓ | ✗ | ✗ |
| Irreflexive | ∀a: ¬(aRa) | ✗ | ✗ | ✓ | ✓ |
| Symmetric | aRb → bRa | ✓ | ✗ | ✗ | ✓ |
| Antisymmetric | aRb ∧ bRa → a=b | ✓ | ✓ | ✓ | ✗ |
| Transitive | aRb ∧ bRc → aRc | ✓ | ✓ | ✓ | ✗* |

*Sibling relation is not transitive: my sibling's sibling could be me, not necessarily my sibling.

## Checking Properties: Examples

### Example 1
R = {(1,1), (1,2), (2,1), (2,2), (3,3)} on A = {1, 2, 3}

- **Reflexive?** (1,1)✓, (2,2)✓, (3,3)✓ → Yes
- **Symmetric?** (1,2)→(2,1)✓, (2,1)→(1,2)✓ → Yes
- **Antisymmetric?** (1,2) and (2,1) but 1≠2 → No
- **Transitive?** (1,2),(2,1)→(1,1)✓, (2,1),(1,2)→(2,2)✓, etc. → Yes

### Example 2
R = {(1,2), (2,3), (1,3)} on A = {1, 2, 3}

- **Reflexive?** No (1,1), no (2,2), no (3,3) → No
- **Irreflexive?** Yes, no (a,a) pairs → Yes
- **Symmetric?** (1,2) but no (2,1) → No
- **Antisymmetric?** No symmetric pairs with a≠b → Yes (vacuously)
- **Transitive?** (1,2),(2,3)→(1,3)✓ → Yes

## Summary

The five main properties of relations:

1. **Reflexive**: aRa for all a
2. **Irreflexive**: aRa for no a
3. **Symmetric**: aRb implies bRa
4. **Antisymmetric**: aRb and bRa implies a = b
5. **Transitive**: aRb and bRc implies aRc

These properties combine to define important classes of relations:
- **Equivalence relations**: Reflexive + Symmetric + Transitive
- **Partial orders**: Reflexive + Antisymmetric + Transitive
- **Strict orders**: Irreflexive + Antisymmetric + Transitive
