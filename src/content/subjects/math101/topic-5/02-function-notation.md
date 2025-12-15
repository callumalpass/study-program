# Function Notation and Terminology

## Standard Notation

### Function Declaration

**f: A → B** declares:
- f is a function
- Domain is A
- Codomain is B

### Mapping Rule

**f(x) = expression** or **x ↦ expression**

Examples:
- f: ℝ → ℝ, f(x) = x²
- f: ℝ → ℝ, x ↦ x²
- "The function x ↦ x² from ℝ to ℝ"

### Lambda Notation

In mathematics and programming:
- λx. x² (lambda calculus)
- `lambda x: x**2` (Python)
- `x => x * x` (JavaScript arrow function)

## Domain and Codomain Details

### Natural Domain

When no domain is specified for a real function, the **natural domain** is the largest subset of ℝ where the expression is defined.

| Function | Natural Domain |
|----------|----------------|
| f(x) = x² | ℝ |
| f(x) = 1/x | ℝ \ {0} |
| f(x) = √x | [0, ∞) |
| f(x) = ln(x) | (0, ∞) |
| f(x) = √(x² - 1) | (-∞, -1] ∪ [1, ∞) |

### Restricting the Domain

We can **restrict** a function to a smaller domain:

f: ℝ → ℝ, f(x) = x²
f|[0,∞): [0, ∞) → ℝ, f|[0,∞)(x) = x²

The restriction f|S is f limited to inputs from S.

## Image and Preimage

### Image of a Set

For function f: A → B and S ⊆ A:

**f(S) = {f(x) : x ∈ S}**

The image of S under f.

### Example

f: ℝ → ℝ, f(x) = x²

- f({1, 2, 3}) = {1, 4, 9}
- f([-1, 1]) = [0, 1]
- f(ℝ) = [0, ∞) (the range)

### Preimage of a Set

For function f: A → B and T ⊆ B:

**f⁻¹(T) = {x ∈ A : f(x) ∈ T}**

The preimage of T under f (all inputs that map into T).

**Note:** f⁻¹(T) is defined even if f has no inverse function.

### Example

f: ℝ → ℝ, f(x) = x²

- f⁻¹({4}) = {-2, 2}
- f⁻¹([0, 4]) = [-2, 2]
- f⁻¹({-1}) = ∅ (nothing maps to -1)
- f⁻¹([0, ∞)) = ℝ

## Function Properties Notation

### Image and Range

**Im(f)** or **f(A)** or **ran(f)**: The range/image of f

$$\text{Im}(f) = \{f(x) : x \in A\} = f(A)$$

### Kernel (for some contexts)

**ker(f)**: For functions to groups/vector spaces, elements mapping to identity/zero.

## Multi-Variable Functions

Functions can have multiple inputs:

### Cartesian Product Domain

f: A × B → C
f: ℝ × ℝ → ℝ, f(x, y) = x + y

### Curried Form

f: A → (B → C)

Given a ∈ A, f(a) is a function B → C.

f: ℝ → (ℝ → ℝ), f(x)(y) = x + y

These are equivalent in many contexts.

## Sequences as Functions

A **sequence** is a function from ℕ (or ℕ₀) to some set.

(a₁, a₂, a₃, ...) corresponds to f: ℕ → A where f(n) = aₙ

### Notation

- (aₙ)ₙ₌₁^∞ or {aₙ}ₙ₌₁^∞
- The sequence (aₙ) where aₙ = 1/n

### Example

aₙ = n² defines the sequence (1, 4, 9, 16, 25, ...)
This is f: ℕ → ℕ where f(n) = n².

## Piecewise Functions

Functions defined by different rules on different parts of the domain:

$$f(x) = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

This defines |x|, the absolute value.

### Example: Sign Function

$$\text{sgn}(x) = \begin{cases} 1 & \text{if } x > 0 \\ 0 & \text{if } x = 0 \\ -1 & \text{if } x < 0 \end{cases}$$

## Special Number-Theoretic Functions

### Floor Function ⌊x⌋

Greatest integer less than or equal to x.
- ⌊3.7⌋ = 3
- ⌊-2.3⌋ = -3
- ⌊5⌋ = 5

### Ceiling Function ⌈x⌉

Smallest integer greater than or equal to x.
- ⌈3.7⌉ = 4
- ⌈-2.3⌉ = -2
- ⌈5⌉ = 5

### Modulo Function

a mod n = r where a = qn + r and 0 ≤ r < n

- 17 mod 5 = 2
- -3 mod 5 = 2 (in mathematical convention)

### Greatest Common Divisor

gcd(a, b) = largest positive integer dividing both a and b

### Euler's Totient

φ(n) = count of integers from 1 to n coprime to n

## Boolean Functions

Functions to {0, 1} or {True, False}:

f: A → {0, 1}

These are **predicates** or **characteristic functions**.

### Example

is_prime: ℕ → {0, 1}
is_prime(n) = 1 if n is prime, 0 otherwise

## Summary

Key notation:
- **f: A → B**: f maps from A to B
- **f(x)** or **x ↦ expression**: mapping rule
- **f(S)**: image of set S
- **f⁻¹(T)**: preimage of set T
- **Im(f)**: range of f

Special functions:
- Piecewise definitions for different cases
- Floor ⌊⌋ and ceiling ⌈⌉
- Sequences as functions from ℕ

Understanding this notation is essential for working with functions across mathematics and computer science.
