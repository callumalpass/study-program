---
id: math101-t3-builder
title: "Set-Builder Notation"
order: 2
---

# Set-Builder Notation and Special Sets

## Set-Builder Notation

Set-builder notation provides a concise way to describe sets by specifying a property that members must satisfy.

### Basic Form

**{x : P(x)}** or **{x | P(x)}**

Read as: "the set of all x such that P(x)"

- x is a **variable** (placeholder for elements)
- P(x) is a **predicate** (condition that must be true)

### With a Domain Restriction

**{x ∈ D : P(x)}**

Read as: "the set of all x in D such that P(x)"

This is often clearer because it specifies where x comes from.

## Examples

### Simple Conditions

- **{x ∈ ℤ : x > 0}** = {1, 2, 3, 4, ...} (positive integers)
- **{x ∈ ℤ : x is even}** = {..., -4, -2, 0, 2, 4, ...}
- **{x ∈ ℝ : x² = 4}** = {-2, 2}

### Compound Conditions

- **{x ∈ ℤ : x > 0 and x < 10}** = {1, 2, 3, 4, 5, 6, 7, 8, 9}
- **{x ∈ ℤ : x is even or x < 0}** = {..., -3, -2, -1, 0, 2, 4, 6, ...}

### With Expressions

- **{2n : n ∈ ℤ}** = {..., -4, -2, 0, 2, 4, ...} (all even integers)
- **{n² : n ∈ ℕ}** = {1, 4, 9, 16, 25, ...} (perfect squares)
- **{1/n : n ∈ ℕ}** = {1, 1/2, 1/3, 1/4, ...}

### Multiple Variables

- **{(x, y) ∈ ℝ² : x² + y² = 1}** (unit circle)
- **{(a, b) ∈ ℤ² : a | b}** (pairs where a divides b)

## Intervals

Intervals are special sets of real numbers between two endpoints.

### Notation

| Notation | Set-Builder | Description |
|----------|-------------|-------------|
| (a, b) | {x ∈ ℝ : a < x < b} | Open interval |
| [a, b] | {x ∈ ℝ : a ≤ x ≤ b} | Closed interval |
| (a, b] | {x ∈ ℝ : a < x ≤ b} | Half-open (left) |
| [a, b) | {x ∈ ℝ : a ≤ x < b} | Half-open (right) |
| (a, ∞) | {x ∈ ℝ : x > a} | Unbounded above |
| [a, ∞) | {x ∈ ℝ : x ≥ a} | Unbounded above |
| (-∞, b) | {x ∈ ℝ : x < b} | Unbounded below |
| (-∞, b] | {x ∈ ℝ : x ≤ b} | Unbounded below |
| (-∞, ∞) | ℝ | All real numbers |

### Examples

- [0, 1] includes 0 and 1
- (0, 1) excludes 0 and 1
- [0, 1) includes 0, excludes 1
- [2, ∞) is all real numbers ≥ 2

## Important Number Sets

### Natural Numbers (ℕ)

The counting numbers: ℕ = {1, 2, 3, 4, ...}

Some definitions include 0: ℕ₀ = {0, 1, 2, 3, ...}

**Properties:**
- Closed under addition and multiplication
- Not closed under subtraction (3 - 5 is not natural)

### Integers (ℤ)

All whole numbers: ℤ = {..., -3, -2, -1, 0, 1, 2, 3, ...}

**Subsets:**
- ℤ⁺ = {1, 2, 3, ...} (positive integers)
- ℤ⁻ = {-1, -2, -3, ...} (negative integers)
- ℤ≥0 = {0, 1, 2, ...} (non-negative integers)

### Rational Numbers (ℚ)

Numbers expressible as fractions: ℚ = {p/q : p, q ∈ ℤ, q ≠ 0}

**Examples:** 1/2, -3/4, 5 (= 5/1), 0.25 (= 1/4)

**Properties:**
- Decimal expansions are either terminating or repeating
- Dense: between any two rationals is another rational

### Irrational Numbers

Real numbers that are not rational: ℝ \ ℚ

**Examples:** √2, π, e, √3

**Properties:**
- Decimal expansions neither terminate nor repeat
- Also dense in ℝ

### Real Numbers (ℝ)

All points on the number line: ℝ = ℚ ∪ (ℝ \ ℚ)

**Properties:**
- Continuous (no "gaps")
- Uncountable (more real numbers than rationals)

### Complex Numbers (ℂ)

Numbers of the form a + bi where i² = -1

ℂ = {a + bi : a, b ∈ ℝ}

## Special Finite Sets

### Boolean Set

𝔹 = {True, False} or {0, 1}

Foundation of digital logic and computer science.

### Modular Arithmetic Sets

ℤₙ = {0, 1, 2, ..., n-1}

Integers modulo n, used in cryptography and computer science.

- ℤ₂ = {0, 1}
- ℤ₁₂ = {0, 1, 2, ..., 11} (hours on a clock)

## The Universal Set

The **universal set** U contains all objects under consideration in a given context.

- In number theory: U might be ℤ
- In probability: U is the sample space
- In a database: U might be all records

The universal set is context-dependent—there's no single "set of everything" (which leads to paradoxes like Russell's Paradox).

## Russell's Paradox

Consider R = {x : x ∉ x}, the set of all sets that don't contain themselves.

Is R ∈ R?
- If R ∈ R, then by definition of R, R ∉ R. Contradiction.
- If R ∉ R, then by definition of R, R ∈ R. Contradiction.

This paradox shows that not every property defines a valid set. Modern set theory (ZFC) includes axioms to avoid such paradoxes.

## Subsets of Important Sets

Using set-builder notation with number sets:

| Description | Set-Builder |
|-------------|-------------|
| Even integers | {n ∈ ℤ : 2 | n} |
| Odd integers | {n ∈ ℤ : 2 ∤ n} |
| Prime numbers | {p ∈ ℕ : p > 1 and p's only divisors are 1 and p} |
| Perfect squares | {n² : n ∈ ℤ} |
| Powers of 2 | {2ⁿ : n ∈ ℕ₀} |

## Summary

**Set-Builder Notation:**
- {x : P(x)} describes sets by property
- {x ∈ D : P(x)} restricts to domain D
- Can include expressions: {2n : n ∈ ℕ}

**Key Number Sets:**
- ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ
- Each extends the previous to solve more equations

**Intervals:**
- (a, b), [a, b], (a, b], [a, b) for bounded
- (-∞, a), (a, ∞) for unbounded

Set-builder notation is powerful but must define valid sets (avoiding paradoxes). Next, we'll explore operations on sets.
