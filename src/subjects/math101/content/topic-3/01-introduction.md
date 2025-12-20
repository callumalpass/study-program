# Introduction to Sets

## What is a Set?

A **set** is a well-defined collection of distinct objects. The objects in a set are called **elements** or **members** of the set.

"Well-defined" means there's a clear rule to determine whether any given object belongs to the set or not. "Distinct" means no duplicates—each element appears at most once.

## Basic Notation

### Set Membership

If x is an element of set A, we write: **x ∈ A** (read "x is in A" or "x belongs to A")

If x is NOT an element of A, we write: **x ∉ A**

### Examples

- 3 ∈ {1, 2, 3, 4, 5}
- 7 ∉ {1, 2, 3, 4, 5}
- "apple" ∈ {"apple", "banana", "cherry"}

## Describing Sets

### Roster Method (Listing)

List all elements inside curly braces:

- A = {1, 2, 3, 4, 5}
- Vowels = {a, e, i, o, u}
- B = {red, green, blue}

For larger sets, use ellipsis (...) if the pattern is clear:
- C = {1, 2, 3, ..., 100}
- Naturals = {1, 2, 3, 4, ...}

### Set-Builder Notation

Describe elements by a property:

**A = {x : P(x)}** or **A = {x | P(x)}**

Read as "the set of all x such that P(x)"

Examples:
- {x : x is an even positive integer} = {2, 4, 6, 8, ...}
- {x ∈ ℤ : x² < 10} = {-3, -2, -1, 0, 1, 2, 3}
- {x ∈ ℝ : 0 ≤ x ≤ 1} = the interval [0, 1]

## Important Properties of Sets

### Order Doesn't Matter

{1, 2, 3} = {3, 1, 2} = {2, 3, 1}

The order in which elements are listed is irrelevant.

### No Duplicates

{1, 1, 2, 2, 3} = {1, 2, 3}

Repeating an element doesn't change the set.

### Elements Can Be Anything

Sets can contain:
- Numbers: {1, 2, 3}
- Strings: {"hello", "world"}
- Other sets: {{1, 2}, {3, 4}}
- Mixed types: {1, "two", {3}}

## Special Sets

### The Empty Set

The **empty set** (or null set) contains no elements.

**Notation:** ∅ or {}

Properties:
- |∅| = 0 (cardinality is zero)
- ∅ is a subset of every set
- ∅ ≠ {∅} (the empty set is not the same as a set containing the empty set)

### Common Number Sets

| Symbol | Name | Elements |
|--------|------|----------|
| ℕ | Natural numbers | {1, 2, 3, ...} or {0, 1, 2, ...} |
| ℤ | Integers | {..., -2, -1, 0, 1, 2, ...} |
| ℚ | Rational numbers | {p/q : p, q ∈ ℤ, q ≠ 0} |
| ℝ | Real numbers | All points on the number line |
| ℂ | Complex numbers | {a + bi : a, b ∈ ℝ} |

Note: Some textbooks include 0 in ℕ, others don't. We use ℕ = {1, 2, 3, ...} here.

## Cardinality

The **cardinality** of a set is the number of elements it contains.

**Notation:** |A| or #A or n(A)

Examples:
- |{1, 2, 3}| = 3
- |{a, b}| = 2
- |∅| = 0
- |{∅}| = 1 (one element: the empty set)

For infinite sets:
- |ℕ| = ℵ₀ (aleph-null, countably infinite)
- |ℝ| = 𝔠 (cardinality of the continuum, uncountably infinite)

## Set Equality

Two sets are **equal** if they contain exactly the same elements.

**A = B** if and only if every element of A is in B and every element of B is in A.

Examples:
- {1, 2, 3} = {3, 2, 1} (same elements, different order)
- {1, 1, 2} = {1, 2} (duplicates don't count)
- {1, 2} ≠ {1, 2, 3} (different elements)

## Visualizing Sets: Venn Diagrams

Venn diagrams represent sets as circles (or ovals) within a rectangle representing the universal set.

```
    ┌─────────────────────────────┐
    │  U (Universal Set)          │
    │    ┌─────┐    ┌─────┐       │
    │    │  A  │    │  B  │       │
    │    │     │    │     │       │
    │    └─────┘    └─────┘       │
    │                             │
    └─────────────────────────────┘
```

When sets overlap, the overlapping region represents elements in both sets.

## Why Sets Matter

Sets are foundational to mathematics and computer science:

**In Mathematics:**
- Functions are defined as sets of ordered pairs
- Probability deals with sets of outcomes
- Algebra studies sets with operations
- Analysis uses sets to define limits and continuity

**In Computer Science:**
- Database queries return sets of records
- Data structures (HashSet, TreeSet) implement sets
- Type systems describe sets of values
- Formal languages are sets of strings

**In Logic:**
- Predicates define sets via characteristic functions
- Quantifiers range over sets
- Truth values form the set {True, False}

## Summary

- A **set** is a collection of distinct objects
- **Membership**: x ∈ A means x is in A
- **Roster notation**: list elements in {}
- **Set-builder notation**: {x : P(x)}
- **Empty set**: ∅ contains no elements
- **Cardinality**: |A| is the number of elements
- **Equality**: A = B when they have the same elements
- Order and duplicates don't matter in sets

Next, we'll explore set-builder notation in more detail and examine important special sets.
