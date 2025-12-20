---
id: math101-t5-intro
title: "Introduction to Functions"
order: 1
---

# Introduction to Functions

## What is a Function?

A **function** f from set A to set B is a rule that assigns to each element of A exactly one element of B.

**Notation:** f: A → B

**Key requirements:**
1. Every element of A maps to something (totality)
2. Each element of A maps to exactly one element of B (well-defined)

## Formal Definition

A function f: A → B is a relation f ⊆ A × B such that:

$$\forall a \in A, \exists! b \in B: (a, b) \in f$$

"For every a in A, there exists a unique b in B such that (a, b) is in f."

If (a, b) ∈ f, we write f(a) = b and say "f maps a to b" or "the value of f at a is b."

## Terminology

**Domain:** The set A (inputs)
**Codomain:** The set B (potential outputs)
**Range (Image):** The set of actual outputs: {f(a) : a ∈ A} ⊆ B

### Example

f: {1, 2, 3} → {a, b, c, d}
f(1) = a, f(2) = a, f(3) = c

- Domain: {1, 2, 3}
- Codomain: {a, b, c, d}
- Range: {a, c} (b and d are never output)

## Functions vs. Relations

Every function is a relation, but not every relation is a function.

| Relation R | Function? | Reason |
|------------|-----------|--------|
| {(1, a), (2, b), (3, c)} | ✓ | Each input has exactly one output |
| {(1, a), (1, b), (2, c)} | ✗ | 1 maps to both a and b |
| {(1, a), (3, c)} | ✗ | 2 has no output (if domain is {1,2,3}) |

## Ways to Specify Functions

### 1. Explicit Formula

f: ℝ → ℝ defined by f(x) = x² + 1

### 2. Table (Finite Domains)

| x | f(x) |
|---|------|
| 1 | a |
| 2 | b |
| 3 | a |

### 3. Set of Pairs

f = {(1, a), (2, b), (3, a)}

### 4. Arrow Diagram

```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │────►│ b │
│ 3 │─────┘   │
└───┘     │ c │
          └───┘
```

### 5. Graph (for ℝ → ℝ)

The set of points (x, f(x)) in the Cartesian plane.

## The Vertical Line Test

For functions f: ℝ → ℝ, a curve in the plane represents a function if and only if every vertical line intersects it at most once.

**Why?** A vertical line x = a intersects the curve at points (a, y) where f(a) = y. Multiple intersections would mean multiple outputs for input a.

## Examples of Functions

### Mathematical Functions

- f(x) = 2x + 3 (linear)
- g(x) = x² (quadratic)
- h(x) = sin(x) (trigonometric)
- k(x) = eˣ (exponential)
- floor(x) = ⌊x⌋ (greatest integer ≤ x)
- ceiling(x) = ⌈x⌉ (smallest integer ≥ x)

### Discrete Functions

- Successor: S(n) = n + 1 for n ∈ ℕ
- Absolute value: |n| on ℤ
- Factorial: n! for n ∈ ℕ₀

### Computer Science Functions

```python
def square(x):
    return x * x

def is_even(n):
    return n % 2 == 0

def first_char(s):
    return s[0] if s else None
```

## Non-Examples

### Not a Function: Multiple Outputs

Relation on ℝ where x relates to both √x and -√x (for x > 0)
- This is a relation, not a function

### Not a Function: Missing Inputs

f(x) = 1/x with domain ℝ
- f(0) is undefined, so this isn't a function from ℝ to ℝ
- It IS a function from ℝ \ {0} to ℝ

### Not a Function: Ambiguous Rule

"f(n) = some divisor of n"
- This doesn't specify which divisor, so it's not well-defined

## Important Special Functions

### Identity Function

id_A: A → A defined by id_A(a) = a

Maps every element to itself.

### Constant Function

c_b: A → B defined by c_b(a) = b for all a ∈ A

Maps every element to the same value b.

### Characteristic Function

χ_S: A → {0, 1} defined by χ_S(a) = 1 if a ∈ S, else 0

Indicates membership in subset S ⊆ A.

## Equality of Functions

Two functions f and g are **equal** (f = g) if:
1. They have the same domain and codomain
2. f(x) = g(x) for all x in the domain

### Example

f: ℝ → ℝ, f(x) = (x+1)² - 2x - 1
g: ℝ → ℝ, g(x) = x²

f(x) = x² + 2x + 1 - 2x - 1 = x² = g(x)

So f = g.

## Summary

- A **function** f: A → B assigns exactly one output to each input
- **Domain**: set of inputs (A)
- **Codomain**: set of potential outputs (B)
- **Range**: set of actual outputs (f(A) ⊆ B)
- Functions can be specified by formulas, tables, diagrams, or pairs
- Vertical line test: each vertical line intersects graph at most once

Next, we'll explore properties that distinguish different types of functions.
