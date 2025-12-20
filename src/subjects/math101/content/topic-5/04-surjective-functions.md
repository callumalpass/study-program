---
id: math101-t5-surjective
title: "Surjective Functions (Onto)"
order: 4
---

# Surjective Functions (Onto)

## Definition

A function f: A → B is **surjective** (or **onto**) if every element of B is mapped to by some element of A.

$$\forall b \in B, \exists a \in A: f(a) = b$$

Equivalently: The range of f equals the codomain: Im(f) = B

## Visual Understanding

**Surjective (Onto):**
```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │─────┤   │
│ 3 │────►│ b │
│ 4 │────►│ c │
└───┘     └───┘
```
Every element of B has at least one arrow pointing to it.

**Not Surjective:**
```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │────►│ b │
│ 3 │─────┘   │
└───┘     │ c │  ← Nothing maps here!
          └───┘
```
Element c in B is not mapped to by anything in A.

## Examples

### Surjective Functions

**f: ℝ → ℝ, f(x) = x³**

For any b ∈ ℝ, let a = ∛b. Then f(a) = (∛b)³ = b. ✓

**f: ℤ → ℤ, f(n) = n - 5**

For any m ∈ ℤ, let n = m + 5. Then f(n) = (m + 5) - 5 = m. ✓

**f: ℝ → ℝ⁺, f(x) = eˣ** (where ℝ⁺ = positive reals)

For any b > 0, let a = ln(b). Then f(a) = e^(ln b) = b. ✓

### Not Surjective

**f: ℝ → ℝ, f(x) = x²**

No real x satisfies x² = -1, so -1 has no preimage. ✗

**f: ℝ → ℝ, f(x) = eˣ**

e^x > 0 for all x, so 0 and negative numbers have no preimage. ✗

**f: {1,2,3} → {a,b,c,d}, f(1) = a, f(2) = b, f(3) = c**

d has no preimage. ✗

## Proving Surjectivity

### Method: Construct a Preimage

Let b be an arbitrary element of B.
Find (construct) an element a ∈ A such that f(a) = b.

**Example:** Prove f: ℝ → ℝ, f(x) = 2x + 1 is surjective.

Let b ∈ ℝ.
We need a ∈ ℝ such that 2a + 1 = b.
Solving: a = (b - 1)/2.
Check: f((b-1)/2) = 2·(b-1)/2 + 1 = b - 1 + 1 = b ✓

Since any b has a preimage, f is surjective. ✓

**Example:** Prove f: ℤ → ℤ, f(n) = 2n is NOT surjective.

Consider b = 3 (an odd integer).
If 2n = 3, then n = 1.5, which is not an integer.
So 3 has no preimage in ℤ. ✗

## Surjectivity and Cardinality

### Finite Sets

If f: A → B is surjective, then |A| ≥ |B|.

**Why?** Each element of B must be "hit" by at least one element of A.

**Contrapositive:** If |A| < |B|, no function from A to B can be surjective.

### Infinite Sets

Surjections define a notion of "greater or equal cardinality":

|A| ≥ |B| if there exists a surjection f: A → B.

## Surjections and Inverses

A surjective function has a **right inverse**: there exists g: B → A such that f(g(b)) = b for all b ∈ B.

**Why?** For each b ∈ B, since f is surjective, there exists some a with f(a) = b. Define g(b) = one such a.

### Example

f: ℤ → {0, 1}, f(n) = n mod 2 (surjective)

g: {0, 1} → ℤ, g(0) = 0, g(1) = 1

f(g(0)) = f(0) = 0 ✓
f(g(1)) = f(1) = 1 ✓

Note: g(f(n)) ≠ n in general (e.g., g(f(4)) = g(0) = 0 ≠ 4).

## Changing the Codomain

A function that's not surjective can be made surjective by shrinking the codomain to the range.

**Example:** f: ℝ → ℝ, f(x) = x² is not surjective.

But f: ℝ → [0, ∞), f(x) = x² IS surjective.

The range is [0, ∞), so if we use that as the codomain, f becomes onto.

## Counting Surjections

The number of surjective functions from an n-element set to a k-element set (where n ≥ k) is:

$$k! \cdot S(n, k)$$

where S(n, k) is a Stirling number of the second kind.

For f: {1,...,n} → {1,...,k}:

$$\text{Surjections} = \sum_{i=0}^{k} (-1)^i \binom{k}{i} (k-i)^n$$

(Inclusion-exclusion formula)

### Example

Surjections from {1, 2, 3} to {a, b}:

= 2³ - (# missing a) - (# missing b) + (# missing both)
= 8 - 1 - 1 + 0 = 6

## Composition and Surjectivity

If f: A → B and g: B → C:

- If g ∘ f is surjective, then g is surjective
- If both f and g are surjective, then g ∘ f is surjective

**Proof of first:** Let c ∈ C. Since g ∘ f is surjective, ∃a: (g ∘ f)(a) = c.
So g(f(a)) = c. Let b = f(a) ∈ B. Then g(b) = c, so g is surjective. ✓

## Summary

**Surjective (onto):** Every element of codomain is hit

**Formal definition:** ∀b ∈ B, ∃a ∈ A: f(a) = b

**Equivalently:** Range = Codomain (Im(f) = B)

**To prove:** For arbitrary b, construct a that maps to it

**To disprove:** Find b with no preimage

**Cardinality:** |A| ≥ |B| necessary for surjection (finite sets)

**Connection to inverses:** Surjective functions have right inverses

Surjectivity ensures no element of the codomain is "wasted"—everything is reachable.
