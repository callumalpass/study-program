# Function Composition

## Definition

Given functions f: A → B and g: B → C, the **composition** g ∘ f is a function from A to C defined by:

$$(g \circ f)(x) = g(f(x))$$

"Apply f first, then apply g to the result."

## Order of Operations

**Important:** g ∘ f means "f first, then g"—right to left!

Think of it as nested function calls: g(f(x)).

### Example

f: ℝ → ℝ, f(x) = x + 2
g: ℝ → ℝ, g(x) = x²

**(g ∘ f)(x) = g(f(x)) = g(x + 2) = (x + 2)²**

**(f ∘ g)(x) = f(g(x)) = f(x²) = x² + 2**

Note: g ∘ f ≠ f ∘ g in general! Composition is NOT commutative.

## When Composition is Defined

g ∘ f is defined when the codomain of f matches the domain of g:

```
f: A → B    g: B → C
         ↘   ↙
       g ∘ f: A → C
```

If f: A → B and g: D → C with B ≠ D, then g ∘ f is not defined.

## Properties of Composition

### Associativity

For f: A → B, g: B → C, h: C → D:

$$(h \circ g) \circ f = h \circ (g \circ f)$$

Both equal h(g(f(x))).

So we can write h ∘ g ∘ f without ambiguity.

### Identity Element

For the identity function id_A: A → A, id_A(x) = x:

- f ∘ id_A = f
- id_B ∘ f = f

The identity function is neutral for composition.

### Non-Commutativity

In general, f ∘ g ≠ g ∘ f.

Composition is NOT commutative (order matters!).

## Examples

### Linear Functions

f(x) = 2x + 1, g(x) = 3x - 4

(g ∘ f)(x) = g(2x + 1) = 3(2x + 1) - 4 = 6x + 3 - 4 = 6x - 1

(f ∘ g)(x) = f(3x - 4) = 2(3x - 4) + 1 = 6x - 8 + 1 = 6x - 7

### Trigonometric Functions

f(x) = sin(x), g(x) = x²

(g ∘ f)(x) = (sin(x))² = sin²(x)

(f ∘ g)(x) = sin(x²)

### Finite Functions

A = {1, 2, 3}, f and g defined by tables:

f: f(1) = 2, f(2) = 3, f(3) = 1
g: g(1) = 3, g(2) = 1, g(3) = 2

(g ∘ f):
- (g ∘ f)(1) = g(f(1)) = g(2) = 1
- (g ∘ f)(2) = g(f(2)) = g(3) = 2
- (g ∘ f)(3) = g(f(3)) = g(1) = 3

## Composition and Function Properties

### Composition Preserves Injectivity

If f and g are both injective, then g ∘ f is injective.

**Proof:** Suppose (g ∘ f)(a) = (g ∘ f)(b).
Then g(f(a)) = g(f(b)).
Since g is injective, f(a) = f(b).
Since f is injective, a = b. ✓

### Composition Preserves Surjectivity

If f and g are both surjective, then g ∘ f is surjective.

**Proof:** Let c ∈ C.
Since g is surjective, ∃b ∈ B: g(b) = c.
Since f is surjective, ∃a ∈ A: f(a) = b.
Then (g ∘ f)(a) = g(f(a)) = g(b) = c. ✓

### Composition Preserves Bijectivity

If f and g are both bijective, then g ∘ f is bijective.

(Follows from the above two results.)

### Partial Converses

- If g ∘ f is injective, then f is injective (but g might not be)
- If g ∘ f is surjective, then g is surjective (but f might not be)

## Decomposing Functions

Many functions can be viewed as compositions of simpler functions.

### Example

h(x) = √(x² + 1)

Decompose: Let f(x) = x² + 1 and g(x) = √x.
Then h = g ∘ f.

### Example

h(x) = sin³(2x)

Decompose:
- a(x) = 2x
- b(x) = sin(x)
- c(x) = x³

Then h = c ∘ b ∘ a = c(b(a(x))) = (sin(2x))³.

## Composition in Programming

Function composition is fundamental in functional programming:

```python
# Manual composition
def compose(g, f):
    return lambda x: g(f(x))

# Example
def double(x): return 2 * x
def add_one(x): return x + 1

double_then_add = compose(add_one, double)
print(double_then_add(3))  # add_one(double(3)) = add_one(6) = 7

# Chain of compositions
def square(x): return x * x
chain = compose(square, compose(add_one, double))
print(chain(3))  # square(add_one(double(3))) = square(7) = 49
```

### Pipe/Flow Pattern

Some languages reverse the order to be more readable:

```javascript
// With pipe: left to right
const result = pipe(3)
  .then(double)
  .then(addOne)
  .then(square);
// 3 → 6 → 7 → 49
```

## Iteration (Repeated Composition)

f ∘ f ∘ f ∘ ... (n times) is denoted f^n.

### Example

f(x) = x + 1
- f¹(x) = x + 1
- f²(x) = f(f(x)) = (x + 1) + 1 = x + 2
- f³(x) = x + 3
- fⁿ(x) = x + n

### Example

f(x) = 2x
- fⁿ(x) = 2ⁿx

## Summary

**Composition:** (g ∘ f)(x) = g(f(x))

**Key properties:**
- Associative: (h ∘ g) ∘ f = h ∘ (g ∘ f)
- NOT commutative: g ∘ f ≠ f ∘ g generally
- Identity is neutral: f ∘ id = id ∘ f = f

**Preserves properties:**
- Injective ∘ Injective = Injective
- Surjective ∘ Surjective = Surjective
- Bijective ∘ Bijective = Bijective

**Applications:**
- Decomposing complex functions
- Functional programming
- Understanding inverse: (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹
