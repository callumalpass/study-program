# Injective Functions (One-to-One)

## Definition

A function f: A → B is **injective** (or **one-to-one**) if different inputs always produce different outputs.

$$\forall a_1, a_2 \in A: f(a_1) = f(a_2) \implies a_1 = a_2$$

**Contrapositive:** a₁ ≠ a₂ implies f(a₁) ≠ f(a₂)

## Visual Understanding

**Injective (One-to-One):**
```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │────►│ b │
│ 3 │────►│ c │
└───┘     │ d │
          └───┘
```
Each output has at most one arrow pointing to it.

**Not Injective:**
```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │─────┤   │
│ 3 │────►│ b │
└───┘     └───┘
```
Two inputs (1 and 2) map to the same output (a).

## Examples

### Injective Functions

**f: ℝ → ℝ, f(x) = 2x + 3**

Proof: If f(a) = f(b), then 2a + 3 = 2b + 3, so 2a = 2b, so a = b. ✓

**f: ℝ → ℝ, f(x) = x³**

Proof: If x³ = y³, then x = y (cube root is well-defined on ℝ). ✓

**f: ℤ → ℤ, f(n) = n + 5**

Proof: If n + 5 = m + 5, then n = m. ✓

### Not Injective

**f: ℝ → ℝ, f(x) = x²**

Counterexample: f(-2) = 4 = f(2), but -2 ≠ 2. ✗

**f: ℝ → ℝ, f(x) = sin(x)**

Counterexample: f(0) = 0 = f(π), but 0 ≠ π. ✗

**f: {1,2,3} → {a,b}, f(1) = a, f(2) = a, f(3) = b**

f(1) = f(2) = a, but 1 ≠ 2. ✗

## Proving Injectivity

### Method 1: Direct Proof

Assume f(a₁) = f(a₂) and show a₁ = a₂.

**Example:** Prove f(x) = 3x - 7 is injective.

Assume f(a) = f(b).
Then 3a - 7 = 3b - 7
So 3a = 3b
So a = b ✓

### Method 2: Contrapositive

Assume a₁ ≠ a₂ and show f(a₁) ≠ f(a₂).

**Example:** Prove f: ℕ → ℕ, f(n) = 2n is injective.

Assume n ≠ m.
Then 2n ≠ 2m (multiplying by 2 preserves inequality).
So f(n) ≠ f(m) ✓

## Disproving Injectivity

Find a **counterexample**: two different inputs with the same output.

**Example:** Show f(x) = |x| is not injective.

f(-3) = 3 = f(3), but -3 ≠ 3. ✗

Only one counterexample is needed.

## Horizontal Line Test

For f: ℝ → ℝ, the function is injective if and only if every horizontal line intersects the graph at most once.

**Why?** A horizontal line y = c intersects at points where f(x) = c. Multiple intersections mean multiple x values with the same output.

## Injectivity and Cardinality

### Finite Sets

If f: A → B is injective, then |A| ≤ |B|.

**Why?** Each element of A maps to a distinct element of B, so B must have at least as many elements.

**Contrapositive:** If |A| > |B|, no function from A to B can be injective. (Pigeonhole principle!)

### Infinite Sets

Injections define a notion of "smaller or equal cardinality":

|A| ≤ |B| if there exists an injection f: A → B.

## Injections and Inverses

An injective function has a **left inverse**: there exists g: B → A such that g(f(a)) = a for all a ∈ A.

**Why?** Since f is injective, each b in the range of f corresponds to a unique a. Define g(b) = that unique a.

### Example

f: ℕ → ℤ, f(n) = 2n (injective)
Range = even positive integers

g: ℤ → ℕ, g(m) = m/2 if m is positive even, else 1

Then g(f(n)) = g(2n) = 2n/2 = n ✓

Note: f(g(m)) = f(m/2) = m only for even positive m, so g is a left inverse but not necessarily a right inverse.

## Restriction Preserves Injectivity

If f: A → B is injective and S ⊆ A, then f|_S: S → B is also injective.

Restricting the domain cannot create collisions that didn't exist.

## Making a Function Injective

If f: A → B is not injective, we can sometimes restrict the domain to make it injective.

**Example:** f: ℝ → ℝ, f(x) = x² is not injective.

But f|[0,∞): [0, ∞) → ℝ, f(x) = x² IS injective.

This is often done to define inverse functions (like √ is the inverse of x² on [0, ∞)).

## Summary

**Injective (one-to-one):** Different inputs → different outputs

**Formal definition:** f(a₁) = f(a₂) ⟹ a₁ = a₂

**To prove:** Assume outputs equal, show inputs equal

**To disprove:** Find two different inputs with the same output

**Tests:**
- Horizontal line test (for real functions)
- Check if |A| ≤ |B| (necessary for finite sets)

**Connection to inverses:** Injective functions have left inverses

Injectivity ensures no information is lost—every output can be traced back to a unique input.
