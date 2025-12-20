---
id: math101-t3-power
title: "Power Sets and Cartesian Products"
order: 5
---

# Power Sets and Cartesian Products

## Subsets Review

A set A is a **subset** of B if every element of A is also in B.

$$A \subseteq B \iff \forall x (x \in A \to x \in B)$$

**Proper subset:** A ⊂ B means A ⊆ B and A ≠ B.

Key facts:
- ∅ ⊆ A for any set A (vacuously true)
- A ⊆ A for any set A
- If A ⊆ B and B ⊆ A, then A = B

## Power Set

The **power set** of A, denoted P(A) or 2^A, is the set of all subsets of A.

### Definition
$$\mathcal{P}(A) = \{S : S \subseteq A\}$$

### Examples

**P({1, 2}):**
- ∅ (the empty set is always a subset)
- {1}
- {2}
- {1, 2}

So P({1, 2}) = {∅, {1}, {2}, {1, 2}}

**P({a, b, c}):**
- ∅
- {a}, {b}, {c}
- {a, b}, {a, c}, {b, c}
- {a, b, c}

So P({a, b, c}) = {∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c}}

**P(∅):**
- Only ∅ is a subset of ∅

So P(∅) = {∅}

Note: |P(∅)| = 1, not 0!

### Cardinality of Power Set

If |A| = n, then |P(A)| = 2^n.

**Why?** For each element of A, a subset either includes it or doesn't. That's 2 choices per element, giving 2^n total subsets.

| |A| | |P(A)| |
|----|--------|
| 0 | 1 |
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| n | 2^n |

### Binomial Connection

The number of subsets of A with exactly k elements is C(n, k) = n!/(k!(n-k)!).

$$|\mathcal{P}(A)| = \sum_{k=0}^{n} \binom{n}{k} = 2^n$$

This is also why we write 2^A for the power set—it has 2^|A| elements.

## Cartesian Product

The **Cartesian product** of A and B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.

### Definition
$$A \times B = \{(a, b) : a \in A \text{ and } b \in B\}$$

### Examples

**{1, 2} × {a, b}:**
- (1, a), (1, b)
- (2, a), (2, b)

So {1, 2} × {a, b} = {(1, a), (1, b), (2, a), (2, b)}

**{1, 2, 3} × {x}:**
{(1, x), (2, x), (3, x)}

**ℝ × ℝ = ℝ²:**
The Cartesian plane—all points (x, y) where x, y ∈ ℝ.

### Properties

**Cardinality:**
$$|A \times B| = |A| \cdot |B|$$

**NOT Commutative:**
A × B ≠ B × A (in general)

{1} × {2} = {(1, 2)}
{2} × {1} = {(2, 1)}

These are different! (1, 2) ≠ (2, 1) since ordered pairs care about order.

**NOT Associative:**
(A × B) × C ≠ A × (B × C) (in general)

((1, 2), 3) ≠ (1, (2, 3))

However, we often identify A × B × C with the set of triples (a, b, c).

**Distributive over Union:**
$$A \times (B \cup C) = (A \times B) \cup (A \times C)$$
$$(A \cup B) \times C = (A \times C) \cup (B \times C)$$

**Distributive over Intersection:**
$$A \times (B \cap C) = (A \times B) \cap (A \times C)$$

## Special Cases

**A × ∅ = ∅:**
No pairs can be formed if one set is empty.

**A × A = A²:**
Called the **Cartesian square** of A.
- ℝ² = ℝ × ℝ (the plane)
- ℤ² = ℤ × ℤ (integer lattice points)

**Higher Products:**
A × B × C = {(a, b, c) : a ∈ A, b ∈ B, c ∈ C}
|A × B × C| = |A| · |B| · |C|

## Visualizing Cartesian Products

### Finite Sets as Tables

For A = {1, 2} and B = {a, b, c}:

```
      a       b       c
  ┌───────┬───────┬───────┐
1 │ (1,a) │ (1,b) │ (1,c) │
  ├───────┼───────┼───────┤
2 │ (2,a) │ (2,b) │ (2,c) │
  └───────┴───────┴───────┘
```

Each cell is one ordered pair. Total: 2 × 3 = 6 pairs.

### ℝ × ℝ as the Plane

The Cartesian product ℝ × ℝ = ℝ² gives us the familiar xy-plane, where each point is an ordered pair (x, y).

This is named after René Descartes, who introduced coordinate geometry.

## Connections to Other Concepts

### Relations

A **relation** from A to B is a subset of A × B.
(We'll explore this in the next topic.)

### Functions

A **function** f: A → B can be viewed as a special kind of relation (subset of A × B) where each a ∈ A appears exactly once as a first component.

### Databases

In relational databases, a table is essentially a subset of a Cartesian product:
- Each column is an attribute with a domain
- Each row is a tuple from the Cartesian product of domains

## Power Set of Cartesian Product

P(A × B) contains all subsets of ordered pairs.

If |A| = m and |B| = n:
- |A × B| = mn
- |P(A × B)| = 2^(mn)

For A = {1, 2} and B = {a, b}:
- A × B has 4 elements
- P(A × B) has 2⁴ = 16 subsets

## Summary

**Power Set P(A):**
- Set of all subsets of A
- |P(A)| = 2^|A|
- Always includes ∅ and A itself

**Cartesian Product A × B:**
- Set of all ordered pairs (a, b)
- |A × B| = |A| · |B|
- Order matters: A × B ≠ B × A
- Foundation for relations and functions

**Key formulas:**
- |P(A)| = 2^n where n = |A|
- |A × B| = |A| × |B|
- |A × B × C| = |A| × |B| × |C|
