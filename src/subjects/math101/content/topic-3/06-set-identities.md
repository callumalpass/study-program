---
id: math101-t3-identities
title: "Set Identities"
order: 6
---

# Set Identities and Laws

## Why Set Identities Matter

Set identities are equations that hold for all sets. They allow us to:
- Simplify complex set expressions
- Prove set equalities algebraically
- Transform expressions into equivalent, more useful forms
- Understand the algebraic structure of sets

## Fundamental Set Identities

### Identity Laws
$$A \cup \emptyset = A$$
$$A \cap U = A$$

Union with empty set, or intersection with universal set, returns the original set.

### Domination Laws
$$A \cup U = U$$
$$A \cap \emptyset = \emptyset$$

Union with U gives everything; intersection with ∅ gives nothing.

### Idempotent Laws
$$A \cup A = A$$
$$A \cap A = A$$

Repeating an operation with the same set has no effect.

### Complement Laws
$$A \cup \overline{A} = U$$
$$A \cap \overline{A} = \emptyset$$

A set and its complement together make U; they share nothing.

### Double Complement
$$\overline{\overline{A}} = A$$

### Commutative Laws
$$A \cup B = B \cup A$$
$$A \cap B = B \cap A$$

Order doesn't matter.

### Associative Laws
$$(A \cup B) \cup C = A \cup (B \cup C)$$
$$(A \cap B) \cap C = A \cap (B \cap C)$$

Grouping doesn't matter for consecutive operations of the same type.

### Distributive Laws
$$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$$
$$A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$$

Union distributes over intersection, and vice versa.

### De Morgan's Laws
$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$
$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

### Absorption Laws
$$A \cup (A \cap B) = A$$
$$A \cap (A \cup B) = A$$

These are useful for simplification.

## Quick Reference Table

| Law | Union Form | Intersection Form |
|-----|------------|-------------------|
| Identity | A ∪ ∅ = A | A ∩ U = A |
| Domination | A ∪ U = U | A ∩ ∅ = ∅ |
| Idempotent | A ∪ A = A | A ∩ A = A |
| Complement | A ∪ Ā = U | A ∩ Ā = ∅ |
| Commutative | A ∪ B = B ∪ A | A ∩ B = B ∩ A |
| Associative | (A∪B)∪C = A∪(B∪C) | (A∩B)∩C = A∩(B∩C) |
| Distributive | A∪(B∩C) = (A∪B)∩(A∪C) | A∩(B∪C) = (A∩B)∪(A∩C) |
| De Morgan | $\overline{A∪B} = \overline{A}∩\overline{B}$ | $\overline{A∩B} = \overline{A}∪\overline{B}$ |
| Absorption | A∪(A∩B) = A | A∩(A∪B) = A |

## Proving Set Identities

There are two main approaches:

### Method 1: Element Argument (Proof by Double Inclusion)

To prove A = B:
1. Show A ⊆ B: Let x ∈ A, prove x ∈ B
2. Show B ⊆ A: Let x ∈ B, prove x ∈ A

### Example: Prove A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)

**Proof:**

(⊆) Let x ∈ A ∩ (B ∪ C).
Then x ∈ A and x ∈ B ∪ C.
Since x ∈ B ∪ C, either x ∈ B or x ∈ C.

Case 1: x ∈ B. Then x ∈ A and x ∈ B, so x ∈ A ∩ B, hence x ∈ (A ∩ B) ∪ (A ∩ C).
Case 2: x ∈ C. Then x ∈ A and x ∈ C, so x ∈ A ∩ C, hence x ∈ (A ∩ B) ∪ (A ∩ C).

So A ∩ (B ∪ C) ⊆ (A ∩ B) ∪ (A ∩ C).

(⊇) Let x ∈ (A ∩ B) ∪ (A ∩ C).
Then x ∈ A ∩ B or x ∈ A ∩ C.

Case 1: x ∈ A ∩ B. Then x ∈ A and x ∈ B, so x ∈ B ∪ C. Thus x ∈ A ∩ (B ∪ C).
Case 2: x ∈ A ∩ C. Then x ∈ A and x ∈ C, so x ∈ B ∪ C. Thus x ∈ A ∩ (B ∪ C).

So (A ∩ B) ∪ (A ∩ C) ⊆ A ∩ (B ∪ C).

Therefore, A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C). □

### Method 2: Algebraic Proof Using Known Identities

Use established identities to transform one side into the other.

### Example: Prove A ∪ (Ā ∩ B) = A ∪ B

**Proof:**
A ∪ (Ā ∩ B)
= (A ∪ Ā) ∩ (A ∪ B)  [Distributive]
= U ∩ (A ∪ B)         [Complement]
= A ∪ B               [Identity] □

### Example: Prove $\overline{A - B} = \overline{A} ∪ B$

**Proof:**
$\overline{A - B}$
= $\overline{A ∩ \overline{B}}$    [Definition of difference]
= $\overline{A} ∪ \overline{\overline{B}}$  [De Morgan]
= $\overline{A} ∪ B$    [Double complement] □

## More Useful Identities

### Set Difference Identities
$$A - B = A \cap \overline{B}$$
$$A - (A - B) = A \cap B$$
$$A - (B \cup C) = (A - B) \cap (A - C)$$
$$A - (B \cap C) = (A - B) \cup (A - C)$$

### Symmetric Difference Identities
$$A \triangle B = (A - B) \cup (B - A)$$
$$A \triangle B = (A \cup B) - (A \cap B)$$
$$A \triangle B = B \triangle A$$
$$A \triangle A = \emptyset$$
$$A \triangle \emptyset = A$$

### Subset Relationships
$$A \subseteq B \iff A \cap B = A$$
$$A \subseteq B \iff A \cup B = B$$
$$A \subseteq B \iff A - B = \emptyset$$

## Simplification Examples

### Example 1: Simplify (A ∪ B) ∩ (A ∪ B̄)

(A ∪ B) ∩ (A ∪ B̄)
= A ∪ (B ∩ B̄)  [Distributive]
= A ∪ ∅        [Complement]
= A            [Identity]

### Example 2: Simplify (A ∩ B) ∪ (A ∩ B̄)

(A ∩ B) ∪ (A ∩ B̄)
= A ∩ (B ∪ B̄)  [Distributive]
= A ∩ U        [Complement]
= A            [Identity]

### Example 3: Simplify Ā ∪ (A ∩ B)

Ā ∪ (A ∩ B)
= (Ā ∪ A) ∩ (Ā ∪ B)  [Distributive]
= U ∩ (Ā ∪ B)        [Complement]
= Ā ∪ B              [Identity]

## Duality Principle

There's a duality between union and intersection (and between ∅ and U):

If an identity holds, swapping:
- ∪ ↔ ∩
- ∅ ↔ U
- ⊆ ↔ ⊇

gives another valid identity.

Example:
- Identity: A ∪ ∅ = A
- Dual: A ∩ U = A

This duality mirrors the duality between ∧ and ∨ in propositional logic.

## Summary

Set identities are powerful tools for manipulating and simplifying set expressions. Key identities to remember:

1. **De Morgan's Laws**: Complement swaps ∪ and ∩
2. **Distributive Laws**: Each operation distributes over the other
3. **Absorption**: A ∪ (A ∩ B) = A and A ∩ (A ∪ B) = A
4. **Complement Laws**: A ∪ Ā = U and A ∩ Ā = ∅

Two proof methods:
- **Element argument**: Show mutual subset inclusion
- **Algebraic**: Apply known identities
