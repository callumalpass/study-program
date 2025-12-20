# Bijections and Inverse Functions

## Definition of Bijection

A function f: A → B is **bijective** (or a **bijection** or **one-to-one correspondence**) if it is both injective and surjective.

- **Injective:** Different inputs → different outputs
- **Surjective:** Every output is hit by some input
- **Bijective:** Both (perfect matching)

## Visual Understanding

```
  A         B
┌───┐     ┌───┐
│ 1 │────►│ a │
│ 2 │────►│ b │
│ 3 │────►│ c │
└───┘     └───┘
```

Each element of A pairs with exactly one element of B, and vice versa.

## Examples

### Bijective Functions

**f: ℝ → ℝ, f(x) = 2x + 3**
- Injective: 2a + 3 = 2b + 3 ⟹ a = b ✓
- Surjective: For any y, x = (y-3)/2 works ✓

**f: ℤ → ℤ, f(n) = n + 1**
- Injective: n + 1 = m + 1 ⟹ n = m ✓
- Surjective: For any m, n = m - 1 works ✓

**f: ℝ → ℝ, f(x) = x³**
- Injective: x³ = y³ ⟹ x = y ✓
- Surjective: For any y, x = ∛y works ✓

### Not Bijective

**f: ℝ → ℝ, f(x) = x²**
- Not injective: f(-2) = f(2) ✗
- Not surjective: -1 has no preimage ✗

**f: ℝ → ℝ, f(x) = eˣ**
- Injective: eᵃ = eᵇ ⟹ a = b ✓
- Not surjective: -1 has no preimage ✗

**f: ℤ → ℤ, f(n) = 2n**
- Injective: 2a = 2b ⟹ a = b ✓
- Not surjective: 3 has no preimage (not even) ✗

## Bijections and Cardinality

### Finite Sets

If f: A → B is a bijection, then |A| = |B|.

**Conversely:** If |A| = |B| and f: A → B is injective, then f is also surjective (and hence bijective).

### Infinite Sets

Two sets have the **same cardinality** if there exists a bijection between them.

- ℕ and ℤ have the same cardinality (both countably infinite)
- ℕ and ℝ do NOT have the same cardinality (ℝ is uncountable)

## Inverse Functions

### Definition

If f: A → B is a bijection, the **inverse function** f⁻¹: B → A is defined by:

$$f^{-1}(b) = a \text{ where } f(a) = b$$

For each b ∈ B, there's exactly one such a (by bijectivity).

### Properties

For a bijection f: A → B with inverse f⁻¹: B → A:

1. **f⁻¹(f(a)) = a** for all a ∈ A
2. **f(f⁻¹(b)) = b** for all b ∈ B
3. **f⁻¹ is also a bijection**
4. **(f⁻¹)⁻¹ = f**

### Examples

**f: ℝ → ℝ, f(x) = 2x + 3**

To find f⁻¹: Solve y = 2x + 3 for x.
x = (y - 3)/2

So f⁻¹(y) = (y - 3)/2, or f⁻¹(x) = (x - 3)/2.

Verify: f⁻¹(f(x)) = f⁻¹(2x + 3) = ((2x + 3) - 3)/2 = 2x/2 = x ✓

**f: ℝ → ℝ, f(x) = x³**

f⁻¹(x) = ∛x = x^(1/3)

**f: ℝ⁺ → ℝ, f(x) = ln(x)** (ℝ⁺ = positive reals)

f⁻¹(x) = eˣ

Note: The domain/codomain switch roles for the inverse.

## Finding Inverses

### Algebraic Method

1. Write y = f(x)
2. Solve for x in terms of y
3. That expression is f⁻¹(y)
4. Verify: f(f⁻¹(y)) = y and f⁻¹(f(x)) = x

### Example

f: ℝ \ {2} → ℝ \ {1}, f(x) = (x + 1)/(x - 2)

**Step 1:** y = (x + 1)/(x - 2)

**Step 2:** Solve for x
y(x - 2) = x + 1
yx - 2y = x + 1
yx - x = 2y + 1
x(y - 1) = 2y + 1
x = (2y + 1)/(y - 1)

**Step 3:** f⁻¹(y) = (2y + 1)/(y - 1)

Or in x: f⁻¹(x) = (2x + 1)/(x - 1)

## Graphical Relationship

For f: ℝ → ℝ, the graph of f⁻¹ is the **reflection** of the graph of f across the line y = x.

**Why?** If (a, b) is on the graph of f (meaning f(a) = b), then (b, a) is on the graph of f⁻¹ (meaning f⁻¹(b) = a).

## Partial Inverses

Even if f is not bijective, we can sometimes define inverses on restricted domains.

### Example: Square Root

f: ℝ → ℝ, f(x) = x² is not bijective.

Restrict to f: [0, ∞) → [0, ∞), f(x) = x².
Now f is bijective, and f⁻¹(x) = √x.

### Example: Trigonometric Inverses

sin: ℝ → ℝ is not bijective.

Restrict to sin: [-π/2, π/2] → [-1, 1].
Now it's bijective, and sin⁻¹: [-1, 1] → [-π/2, π/2].

## Left and Right Inverses

For non-bijective functions:

- **Injective only:** Has a left inverse g: g(f(x)) = x
- **Surjective only:** Has a right inverse h: f(h(y)) = y
- **Bijective:** Has a two-sided inverse f⁻¹: both properties

## Composition of Bijections

If f: A → B and g: B → C are bijections, then:

- g ∘ f: A → C is a bijection
- (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ ("reverse order")

### Proof of Reverse Order

(g ∘ f)⁻¹(c) = a where (g ∘ f)(a) = c
f⁻¹(g⁻¹(c)) = f⁻¹(b) where g(b) = c, = a where f(a) = b

So (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹ ✓

## Summary

**Bijection:** Injective AND surjective (one-to-one correspondence)

**Properties:**
- |A| = |B| for bijections between finite sets
- Each element pairs with exactly one element in the other set

**Inverse function f⁻¹:**
- Exists if and only if f is bijective
- f⁻¹(f(x)) = x and f(f⁻¹(y)) = y
- Graph is reflection across y = x

**Composition:**
- Bijections compose to bijections
- (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹
