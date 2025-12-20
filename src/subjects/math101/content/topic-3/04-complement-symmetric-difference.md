# Complement and Symmetric Difference

## The Universal Set

Before discussing complement, we need the concept of a **universal set** U—the set of all objects under consideration in a particular context.

Examples:
- In a study of integers: U = ℤ
- In a database of students: U = all student records
- In probability: U = sample space (all possible outcomes)

## Complement (Ā or A')

The **complement** of set A contains all elements in the universal set U that are **not** in A.

### Definition
$$\overline{A} = A' = A^c = \{x \in U : x \notin A\}$$

Also written as U - A.

### Venn Diagram
```
    ┌─────────────────────────────┐
    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓┌─────┐▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓│     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓│  A  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓│     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓└─────┘▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    └─────────────────────────────┘
    Ā: Everything outside A (▓)
```

### Examples

Let U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

- If A = {1, 2, 3}, then Ā = {4, 5, 6, 7, 8, 9, 10}
- If A = {2, 4, 6, 8, 10}, then Ā = {1, 3, 5, 7, 9}
- If A = U, then Ā = ∅
- If A = ∅, then Ā = U

### Properties of Complement

**Double Complement:**
$$\overline{\overline{A}} = A$$

Taking the complement twice returns to the original set.

**Complement of Universal and Empty Sets:**
$$\overline{U} = \emptyset$$
$$\overline{\emptyset} = U$$

**Complement Laws:**
$$A \cup \overline{A} = U$$
$$A \cap \overline{A} = \emptyset$$

Every element is either in A or in its complement, but never in both.

## De Morgan's Laws for Sets

These fundamental laws describe how complement interacts with union and intersection:

$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$
$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

**In words:**
- The complement of a union is the intersection of the complements
- The complement of an intersection is the union of the complements

### Verification Example

Let U = {1, 2, 3, 4, 5}, A = {1, 2, 3}, B = {2, 3, 4}

**First Law:** $\overline{A \cup B} = \overline{A} \cap \overline{B}$

- A ∪ B = {1, 2, 3, 4}
- $\overline{A \cup B}$ = {5}
- Ā = {4, 5}, B̄ = {1, 5}
- Ā ∩ B̄ = {5} ✓

**Second Law:** $\overline{A \cap B} = \overline{A} \cup \overline{B}$

- A ∩ B = {2, 3}
- $\overline{A \cap B}$ = {1, 4, 5}
- Ā = {4, 5}, B̄ = {1, 5}
- Ā ∪ B̄ = {1, 4, 5} ✓

### Generalized De Morgan's Laws

$$\overline{\bigcup_{i=1}^{n} A_i} = \bigcap_{i=1}^{n} \overline{A_i}$$

$$\overline{\bigcap_{i=1}^{n} A_i} = \bigcup_{i=1}^{n} \overline{A_i}$$

## Symmetric Difference (△ or ⊕)

The **symmetric difference** of A and B contains elements in A **or** B, but **not both**.

### Definition
$$A \triangle B = (A - B) \cup (B - A) = (A \cup B) - (A \cap B)$$

This is the set-theoretic analog of XOR (exclusive or).

### Venn Diagram
```
    ┌─────────────────────────────┐
    │                              │
    │    ┌─────┬─────┐            │
    │    │▓▓▓▓▓│     │▓▓▓▓▓│      │
    │    │▓▓A▓▓│     │▓▓B▓▓│      │
    │    │▓▓▓▓▓│     │▓▓▓▓▓│      │
    │    └─────┴─────┘            │
    └─────────────────────────────┘
    A △ B: Only the non-overlapping parts (▓)
```

### Examples

- {1, 2, 3} △ {3, 4, 5} = {1, 2, 4, 5}
- {a, b} △ {b, c} = {a, c}
- {1, 2} △ {1, 2} = ∅
- A △ ∅ = A
- A △ A = ∅

### Properties

**Commutative:** A △ B = B △ A

**Associative:** (A △ B) △ C = A △ (B △ C)

**Identity:** A △ ∅ = A

**Self-inverse:** A △ A = ∅

**Relationship to complement:**
$$A \triangle B = (A \cap \overline{B}) \cup (\overline{A} \cap B)$$

### Symmetric Difference and XOR

If we represent sets by their characteristic functions (1 if element is in set, 0 otherwise), then symmetric difference corresponds to XOR:

| x ∈ A | x ∈ B | x ∈ A △ B |
|:-----:|:-----:|:---------:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Expressing Operations Using Others

With complement, we can express all operations:

**Difference using complement:**
$$A - B = A \cap \overline{B}$$

**Symmetric difference using basic operations:**
$$A \triangle B = (A \cup B) - (A \cap B) = (A - B) \cup (B - A)$$

**Union using intersection and complement (De Morgan):**
$$A \cup B = \overline{\overline{A} \cap \overline{B}}$$

**Intersection using union and complement:**
$$A \cap B = \overline{\overline{A} \cup \overline{B}}$$

## Counting with Complement

For finite sets with universal set U:

$$|\overline{A}| = |U| - |A|$$

This is often useful when counting "everything except A" is easier than counting A directly.

### Example

How many integers from 1 to 100 are NOT divisible by 7?

- U = {1, 2, ..., 100}, so |U| = 100
- A = {n ∈ U : 7 | n} = {7, 14, 21, ..., 98}
- |A| = 14 (since 98 = 7 × 14)
- |Ā| = 100 - 14 = 86

## Summary

**Complement (Ā):**
- Elements in U but not in A
- Double complement: $\overline{\overline{A}} = A$
- A ∪ Ā = U and A ∩ Ā = ∅

**De Morgan's Laws:**
- $\overline{A \cup B} = \overline{A} \cap \overline{B}$
- $\overline{A \cap B} = \overline{A} \cup \overline{B}$

**Symmetric Difference (A △ B):**
- Elements in exactly one of A or B
- Equivalent to set XOR
- Commutative and associative
- A △ A = ∅, A △ ∅ = A

These operations, combined with union, intersection, and difference, provide a complete toolkit for set manipulation.
