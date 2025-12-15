# Basic Set Operations

## Overview

Set operations combine sets to create new sets, similar to how arithmetic operations combine numbers. The three fundamental operations are:
- **Union** (∪): elements in either set
- **Intersection** (∩): elements in both sets
- **Difference** (\ or -): elements in one but not the other

## Union (∪)

The **union** of sets A and B contains all elements that are in A **or** B (or both).

### Definition
$$A \cup B = \{x : x \in A \text{ or } x \in B\}$$

### Venn Diagram
```
    ┌─────────────────────────────┐
    │       ▓▓▓▓▓▓▓▓▓▓▓▓▓         │
    │    ▓▓▓░░░░░▓░░░░░▓▓▓        │
    │   ▓░░░░░░░░▓░░░░░░░▓        │
    │   ▓░░░░░░░░▓░░░░░░░▓        │
    │    ▓▓▓░░░░░▓░░░░░▓▓▓        │
    │       ▓▓▓▓▓▓▓▓▓▓▓▓▓         │
    └─────────────────────────────┘
    A ∪ B: All shaded region
```

### Examples

- {1, 2, 3} ∪ {3, 4, 5} = {1, 2, 3, 4, 5}
- {a, b} ∪ {c, d} = {a, b, c, d}
- {1, 2} ∪ ∅ = {1, 2}
- {1, 2} ∪ {1, 2} = {1, 2}

### Properties

- **Commutative:** A ∪ B = B ∪ A
- **Associative:** (A ∪ B) ∪ C = A ∪ (B ∪ C)
- **Identity:** A ∪ ∅ = A
- **Idempotent:** A ∪ A = A
- **Domination:** A ∪ U = U (where U is the universal set)

## Intersection (∩)

The **intersection** of sets A and B contains all elements that are in **both** A and B.

### Definition
$$A \cap B = \{x : x \in A \text{ and } x \in B\}$$

### Venn Diagram
```
    ┌─────────────────────────────┐
    │                              │
    │    ┌─────┐ ┌─────┐          │
    │    │     │▓│     │          │
    │    │  A  │▓│  B  │          │
    │    │     │▓│     │          │
    │    └─────┘ └─────┘          │
    └─────────────────────────────┘
    A ∩ B: Only the overlapping region (▓)
```

### Examples

- {1, 2, 3} ∩ {3, 4, 5} = {3}
- {a, b} ∩ {c, d} = ∅
- {1, 2, 3} ∩ {1, 2, 3} = {1, 2, 3}
- {1, 2} ∩ ∅ = ∅

### Properties

- **Commutative:** A ∩ B = B ∩ A
- **Associative:** (A ∩ B) ∩ C = A ∩ (B ∩ C)
- **Identity:** A ∩ U = A
- **Idempotent:** A ∩ A = A
- **Annihilation:** A ∩ ∅ = ∅

## Disjoint Sets

Sets A and B are **disjoint** if they have no elements in common:
$$A \cap B = \emptyset$$

Examples:
- {1, 2} and {3, 4} are disjoint
- Even integers and odd integers are disjoint
- {1, 2, 3} and {3, 4, 5} are NOT disjoint (they share 3)

## Set Difference (\ or -)

The **difference** A - B (or A \ B) contains elements in A that are **not** in B.

### Definition
$$A - B = A \setminus B = \{x : x \in A \text{ and } x \notin B\}$$

### Venn Diagram
```
    ┌─────────────────────────────┐
    │                              │
    │    ┌─────┐ ┌─────┐          │
    │    │▓▓▓▓▓│ │     │          │
    │    │▓▓A▓▓│ │  B  │          │
    │    │▓▓▓▓▓│ │     │          │
    │    └─────┘ └─────┘          │
    └─────────────────────────────┘
    A - B: Only the part of A not overlapping B (▓)
```

### Examples

- {1, 2, 3, 4, 5} - {3, 4, 5, 6, 7} = {1, 2}
- {a, b, c} - {b, c, d} = {a}
- {1, 2, 3} - ∅ = {1, 2, 3}
- {1, 2, 3} - {4, 5, 6} = {1, 2, 3}
- ∅ - A = ∅

### Properties

- **NOT commutative:** A - B ≠ B - A (in general)
- **NOT associative:** (A - B) - C ≠ A - (B - C) (in general)
- A - A = ∅
- A - ∅ = A
- ∅ - A = ∅

### Relationship to Other Operations

$$A - B = A \cap \overline{B}$$

(Difference equals intersection with complement—we'll cover complement next)

## Combining Operations

### Order of Operations

There's no universal precedence; use parentheses to clarify.

### Examples

Let A = {1, 2, 3}, B = {2, 3, 4}, C = {3, 4, 5}

**(A ∪ B) ∩ C:**
- A ∪ B = {1, 2, 3, 4}
- (A ∪ B) ∩ C = {1, 2, 3, 4} ∩ {3, 4, 5} = {3, 4}

**A ∪ (B ∩ C):**
- B ∩ C = {3, 4}
- A ∪ (B ∩ C) = {1, 2, 3} ∪ {3, 4} = {1, 2, 3, 4}

Note: (A ∪ B) ∩ C ≠ A ∪ (B ∩ C) in general.

## Generalized Union and Intersection

For a collection of sets A₁, A₂, ..., Aₙ:

**Generalized Union:**
$$\bigcup_{i=1}^{n} A_i = A_1 \cup A_2 \cup \cdots \cup A_n$$

Elements in at least one Aᵢ.

**Generalized Intersection:**
$$\bigcap_{i=1}^{n} A_i = A_1 \cap A_2 \cap \cdots \cap A_n$$

Elements in all Aᵢ.

### Example

A₁ = {1, 2, 3}, A₂ = {2, 3, 4}, A₃ = {3, 4, 5}

- ∪Aᵢ = {1, 2, 3, 4, 5}
- ∩Aᵢ = {3}

## Counting Elements: Inclusion-Exclusion

For finite sets A and B:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

We subtract the intersection because it was counted twice.

### Example

A = {1, 2, 3, 4}, B = {3, 4, 5, 6}
- |A| = 4, |B| = 4
- A ∩ B = {3, 4}, so |A ∩ B| = 2
- |A ∪ B| = 4 + 4 - 2 = 6

Check: A ∪ B = {1, 2, 3, 4, 5, 6}, which has 6 elements. ✓

### Three Sets

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

## Summary

| Operation | Notation | Contains |
|-----------|----------|----------|
| Union | A ∪ B | Elements in A OR B |
| Intersection | A ∩ B | Elements in A AND B |
| Difference | A - B | Elements in A but NOT B |

Key properties:
- Union and intersection are commutative and associative
- Difference is neither commutative nor associative
- ∅ is the identity for union; U is the identity for intersection
- Use inclusion-exclusion to count elements in unions

Next, we'll explore complement and symmetric difference.
