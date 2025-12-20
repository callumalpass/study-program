---
id: math101-t1-connectives
title: "Basic Connectives (AND, OR, NOT)"
order: 3
---

# Basic Logical Connectives: NOT, AND, OR

## Introduction to Connectives

Logical connectives are operators that combine propositions to form compound propositions. Just as arithmetic operators (+, -, ×, ÷) combine numbers, logical connectives combine truth values.

In this section, we cover three fundamental connectives:
- **Negation (NOT)**: Flips a truth value
- **Conjunction (AND)**: True when both operands are true
- **Disjunction (OR)**: True when at least one operand is true

## Negation (NOT) — ¬

The negation operator takes a single proposition and flips its truth value.

### Notation

| Notation | Read As |
|----------|---------|
| ¬p | "not p" |
| ~p | "not p" |
| !p | "not p" (programming) |
| p' | "p prime" or "not p" |

### Truth Table

| p | ¬p |
|:---:|:---:|
| T | F |
| F | T |

### Examples

- If p = "It is raining", then ¬p = "It is not raining"
- If q = "5 > 3" (True), then ¬q = "5 ≤ 3" (False)
- If r = "All birds can fly" (False), then ¬r = "Not all birds can fly" (True)

### Common Mistake: Negation vs. Opposite

The negation of "It is hot" is "It is NOT hot"—not "It is cold."

"Not hot" could mean cold, warm, or mild. The negation only asserts that the original statement is false; it doesn't assert a specific alternative.

## Conjunction (AND) — ∧

The conjunction of two propositions is true only when **both** propositions are true.

### Notation

| Notation | Read As |
|----------|---------|
| p ∧ q | "p and q" |
| p · q | "p and q" |
| p & q | "p and q" |
| p && q | "p and q" (programming) |

### Truth Table

| p | q | p ∧ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | F |
| F | T | F |
| F | F | F |

The conjunction is true in exactly one case: when both operands are true.

### Examples

Let:
- p = "Alice passed the exam"
- q = "Bob passed the exam"

Then p ∧ q = "Alice passed the exam AND Bob passed the exam"

This compound statement is only true if both Alice and Bob passed.

**In Programming:**
```python
if age >= 18 and has_license:
    allow_driving()
```
Both conditions must be true to enter the if block.

### Properties of Conjunction

**Commutative:** p ∧ q ≡ q ∧ p (order doesn't matter)

**Associative:** (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) (grouping doesn't matter)

**Identity:** p ∧ T ≡ p (AND with True gives p)

**Annihilator:** p ∧ F ≡ F (AND with False is always False)

**Idempotent:** p ∧ p ≡ p (AND with itself gives itself)

## Disjunction (OR) — ∨

The disjunction of two propositions is true when **at least one** proposition is true.

### Notation

| Notation | Read As |
|----------|---------|
| p ∨ q | "p or q" |
| p + q | "p or q" |
| p \| q | "p or q" |
| p \|\| q | "p or q" (programming) |

### Truth Table

| p | q | p ∨ q |
|:---:|:---:|:---:|
| T | T | **T** |
| T | F | **T** |
| F | T | **T** |
| F | F | F |

The disjunction is false in exactly one case: when both operands are false.

### Inclusive vs. Exclusive OR

In logic, the standard OR (∨) is **inclusive**: it's true when one or both operands are true.

In everyday English, "or" is often **exclusive**: "Coffee or tea?" usually means one but not both.

**Inclusive OR (standard):** "Would you like fries or a drink with that?" — You can have both.

**Exclusive OR (XOR):** "Is the answer true or false?" — Only one can be correct.

The exclusive OR (XOR, ⊕) has this truth table:

| p | q | p ⊕ q |
|:---:|:---:|:---:|
| T | T | F |
| T | F | T |
| F | T | T |
| F | F | F |

XOR can be expressed using basic connectives: p ⊕ q ≡ (p ∨ q) ∧ ¬(p ∧ q)

### Examples

Let:
- p = "I will study math"
- q = "I will study physics"

Then p ∨ q = "I will study math OR I will study physics (or both)"

**In Programming:**
```python
if is_admin or is_owner:
    grant_access()
```
Either condition being true grants access.

### Properties of Disjunction

**Commutative:** p ∨ q ≡ q ∨ p

**Associative:** (p ∨ q) ∨ r ≡ p ∨ (q ∨ r)

**Identity:** p ∨ F ≡ p (OR with False gives p)

**Annihilator:** p ∨ T ≡ T (OR with True is always True)

**Idempotent:** p ∨ p ≡ p

## Combining Multiple Connectives

When combining connectives, we need to know the order of operations.

### Operator Precedence (Highest to Lowest)

1. ¬ (NOT) — binds tightest
2. ∧ (AND)
3. ∨ (OR)

So p ∨ q ∧ r means p ∨ (q ∧ r), not (p ∨ q) ∧ r.

### Examples

Evaluate when p = T, q = F, r = T:

1. **¬p ∧ q**
   - ¬T ∧ F = F ∧ F = **F**

2. **p ∨ ¬q**
   - T ∨ ¬F = T ∨ T = **T**

3. **¬(p ∧ q)**
   - ¬(T ∧ F) = ¬F = **T**

4. **p ∨ q ∧ r** (AND has higher precedence)
   - T ∨ (F ∧ T) = T ∨ F = **T**

5. **(p ∨ q) ∧ r**
   - (T ∨ F) ∧ T = T ∧ T = **T**

### Using Parentheses for Clarity

Even when precedence rules apply, using parentheses makes your intent clear:

❌ p ∨ q ∧ ¬r ∨ s (confusing)
✅ p ∨ ((q ∧ ¬r) ∨ s) (clear)

## Summary

| Connective | Symbol | True When... |
|------------|--------|--------------|
| NOT | ¬p | p is False |
| AND | p ∧ q | Both p and q are True |
| OR | p ∨ q | At least one of p or q is True |

Key points:
- **NOT** is a unary operator (one operand); **AND** and **OR** are binary (two operands)
- **AND** requires both operands to be true
- **OR** (inclusive) is true if at least one operand is true
- **Precedence**: NOT > AND > OR
- Use parentheses liberally for clarity

Next, we'll explore two more connectives: implication and biconditional.
