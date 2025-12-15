# Introduction to Relations

## What is a Relation?

A **relation** describes a relationship between elements of sets. While functions map each input to exactly one output, relations are more general—they can associate elements in various ways.

Informally, a relation R from set A to set B tells us which elements of A are "related to" which elements of B.

## Formal Definition

A **relation R from A to B** is a subset of the Cartesian product A × B.

$$R \subseteq A \times B$$

If (a, b) ∈ R, we say "a is related to b" and write **aRb**.

A **relation on A** is a relation from A to A (i.e., R ⊆ A × A).

## Examples

### Example 1: Less Than

Let A = {1, 2, 3, 4}. Define R on A by: aRb if a < b.

R = {(1,2), (1,3), (1,4), (2,3), (2,4), (3,4)}

### Example 2: Divisibility

Let A = {1, 2, 3, 4, 5, 6}. Define R on A by: aRb if a divides b.

R = {(1,1), (1,2), (1,3), (1,4), (1,5), (1,6), (2,2), (2,4), (2,6), (3,3), (3,6), (4,4), (5,5), (6,6)}

### Example 3: Student-Course Enrollment

Let Students = {Alice, Bob, Charlie}
Let Courses = {Math, Physics, CS}

Enrollment relation R ⊆ Students × Courses:
R = {(Alice, Math), (Alice, CS), (Bob, Math), (Bob, Physics), (Charlie, CS)}

This says Alice takes Math and CS, Bob takes Math and Physics, etc.

## Notation

Several notations express "a is related to b by R":

| Notation | Meaning |
|----------|---------|
| (a, b) ∈ R | Ordered pair form |
| aRb | Infix notation |
| R(a, b) | Function-like notation |
| a ~ b | When R is an equivalence (covered later) |
| a ≤ b | For ordering relations |

## Domain, Codomain, and Range

For a relation R from A to B:

**Domain of R:** dom(R) = {a ∈ A : ∃b ∈ B, (a, b) ∈ R}
Elements of A that are related to something in B.

**Range of R:** ran(R) = {b ∈ B : ∃a ∈ A, (a, b) ∈ R}
Elements of B that something in A is related to.

**Codomain:** B (the target set, regardless of what's actually related)

### Example

R = {(1, a), (1, b), (2, b), (3, c)} from A = {1, 2, 3, 4} to B = {a, b, c, d}

- dom(R) = {1, 2, 3}
- ran(R) = {a, b, c}
- Codomain = B = {a, b, c, d}

Note: 4 ∈ A is not in the domain (not related to anything), and d ∈ B is not in the range.

## Special Relations

### Empty Relation
∅ ⊆ A × B

No elements are related. aRb is false for all a, b.

### Universal Relation
A × B (the entire Cartesian product)

Every element of A is related to every element of B.

### Identity Relation
I_A = {(a, a) : a ∈ A}

Every element is related only to itself.

## Relations vs. Functions

Every function is a relation, but not every relation is a function.

A relation R from A to B is a **function** if:
1. Every element of A is related to at least one element of B
2. Every element of A is related to at most one element of B

In other words: each a ∈ A appears exactly once as a first component.

| Type | Can have (a, b₁) and (a, b₂)? | Must every a be related? |
|------|------------------------------|--------------------------|
| Relation | Yes | No |
| Function | No (b₁ must equal b₂) | Yes |

### Example

From A = {1, 2} to B = {a, b, c}:

- R₁ = {(1, a), (1, b), (2, c)} — Relation but not function (1 maps to two things)
- R₂ = {(1, a)} — Relation but not function (2 doesn't map to anything)
- R₃ = {(1, a), (2, b)} — This IS a function

## Why Relations Matter

Relations are fundamental to:

**Databases:**
Tables in relational databases are relations. Each row is a tuple in the relation.

**Graph Theory:**
Directed graphs are relations: vertices are elements, edges are pairs.

**Orderings:**
Less than (≤), subset (⊆), divisibility (|) are all relations.

**Equivalences:**
"Same color as," "congruent modulo n" partition sets into classes.

**Logic:**
Predicates with two arguments define relations.

## Summary

- A **relation** R from A to B is a subset R ⊆ A × B
- (a, b) ∈ R or aRb means "a is related to b"
- A **relation on A** is a relation from A to itself (R ⊆ A × A)
- Relations generalize functions (functions have exactly one output per input)
- Key examples: less than, divisibility, equality, enrollment

Next, we'll explore the properties that make relations useful for different purposes.
