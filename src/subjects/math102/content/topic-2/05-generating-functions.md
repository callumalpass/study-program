---
id: math102-t2-genfunc
title: "Generating Functions"
order: 5
---

# Generating Functions for Recurrences

Generating functions transform recurrence relations into algebraic equations. This powerful technique handles recurrences that resist other methods.

## What is a Generating Function?

For a sequence a₀, a₁, a₂, ..., the **ordinary generating function** (OGF) is:

```
A(x) = a₀ + a₁x + a₂x² + a₃x³ + ... = Σₙ≥₀ aₙxⁿ
```

The coefficient of xⁿ in A(x) is aₙ, written [xⁿ]A(x) = aₙ.

## Key Generating Functions

| Sequence | Closed Form | Generating Function |
|----------|-------------|---------------------|
| 1, 1, 1, ... | aₙ = 1 | 1/(1-x) |
| 1, 2, 3, ... | aₙ = n+1 | 1/(1-x)² |
| 1, c, c², ... | aₙ = cⁿ | 1/(1-cx) |
| 0, 1, 2, 3, ... | aₙ = n | x/(1-x)² |
| C(n,k) | - | (1+x)ⁿ |
| Fibonacci | - | x/(1-x-x²) |

## Solving Recurrences: The Method

### Step 1: Write the Recurrence

Start with aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ... + f(n)

### Step 2: Multiply by xⁿ and Sum

Sum both sides for n ≥ k (where k is the order):

```
Σₙ≥ₖ aₙxⁿ = c₁Σₙ≥ₖ aₙ₋₁xⁿ + c₂Σₙ≥ₖ aₙ₋₂xⁿ + ...
```

### Step 3: Express in Terms of A(x)

Use the shift property:
- Σₙ≥₁ aₙ₋₁xⁿ = xΣₙ≥₁ aₙ₋₁xⁿ⁻¹ = xΣₘ≥₀ aₘxᵐ = xA(x)
- Σₙ≥₂ aₙ₋₂xⁿ = x²A(x)

### Step 4: Solve for A(x)

Algebraically solve for A(x).

### Step 5: Extract Coefficients

Use partial fractions and known series to find [xⁿ]A(x) = aₙ.

## Example: Fibonacci Numbers

**Recurrence**: Fₙ = Fₙ₋₁ + Fₙ₋₂ for n ≥ 2, F₀ = 0, F₁ = 1

**Step 1**: Let F(x) = Σₙ≥₀ Fₙxⁿ

**Step 2**: Multiply by xⁿ and sum for n ≥ 2:
```
Σₙ≥₂ Fₙxⁿ = Σₙ≥₂ Fₙ₋₁xⁿ + Σₙ≥₂ Fₙ₋₂xⁿ
```

**Step 3**: Express in terms of F(x):
- Left side: F(x) - F₀ - F₁x = F(x) - x
- First sum: xΣₙ≥₂ Fₙ₋₁xⁿ⁻¹ = x(F(x) - F₀) = xF(x)
- Second sum: x²Σₙ≥₂ Fₙ₋₂xⁿ⁻² = x²F(x)

**Equation**:
```
F(x) - x = xF(x) + x²F(x)
F(x) - x = (x + x²)F(x)
F(x)(1 - x - x²) = x
F(x) = x/(1 - x - x²)
```

**Step 4**: Factor denominator
1 - x - x² = -(x² + x - 1) = -(x - r₁)(x - r₂)

where r₁ = (-1 + √5)/2 and r₂ = (-1 - √5)/2

Note: 1/r₁ = φ (golden ratio), 1/r₂ = ψ

**Step 5**: Partial fractions
```
F(x) = x/((1-φx)(1-ψx)) = (1/√5)(1/(1-φx) - 1/(1-ψx))
```

Using 1/(1-cx) = Σ cⁿxⁿ:
```
Fₙ = (1/√5)(φⁿ - ψⁿ)
```

This is Binet's formula!

## Example: Tower of Hanoi

**Recurrence**: Hₙ = 2Hₙ₋₁ + 1, H₀ = 0

**Setup**: Let H(x) = Σₙ≥₀ Hₙxⁿ

**Sum recurrence** for n ≥ 1:
```
Σₙ≥₁ Hₙxⁿ = 2Σₙ≥₁ Hₙ₋₁xⁿ + Σₙ≥₁ xⁿ
```

- Left: H(x) - H₀ = H(x)
- First term: 2xH(x)
- Second term: x/(1-x)

**Solve**:
```
H(x) = 2xH(x) + x/(1-x)
H(x)(1-2x) = x/(1-x)
H(x) = x/((1-x)(1-2x))
```

**Partial fractions**:
```
H(x) = -1/(1-x) + 1/(1-2x)
     = -Σ xⁿ + Σ 2ⁿxⁿ
```

**Extract**: Hₙ = 2ⁿ - 1

## Convolution and Products

The product of generating functions corresponds to convolution:

If A(x) = Σ aₙxⁿ and B(x) = Σ bₙxⁿ, then:

```
A(x)·B(x) = Σ cₙxⁿ where cₙ = Σₖ₌₀ⁿ aₖbₙ₋ₖ
```

### Application: Catalan Numbers

Catalan numbers satisfy: Cₙ = Σₖ₌₀ⁿ⁻¹ CₖCₙ₋₁₋ₖ with C₀ = 1

Let C(x) = Σ Cₙxⁿ. The convolution gives:

```
C(x) - 1 = x·C(x)²
```

(The x accounts for the index shift.)

**Solve**: xC(x)² - C(x) + 1 = 0

Using quadratic formula:
```
C(x) = (1 - √(1-4x))/(2x)
```

Expanding √(1-4x) using binomial series:
```
Cₙ = C(2n,n)/(n+1)
```

## Common Transformations

| Operation | Sequence | GF |
|-----------|----------|-----|
| Original | aₙ | A(x) |
| Right shift | aₙ₋₁ (with a₋₁=0) | xA(x) |
| Left shift | aₙ₊₁ | (A(x)-a₀)/x |
| Scaling | cⁿaₙ | A(cx) |
| Differentiation | naₙ | xA'(x) |
| Integration | aₙ/(n+1) | ∫A(x)dx |

## When to Use Generating Functions

**Advantages**:
- Handles complex non-homogeneous terms
- Reveals hidden structure (like convolutions)
- Connects to combinatorial identities

**Best for**:
- Counting problems (lattice paths, partitions)
- Complex forcing functions
- When closed form is needed for asymptotics

**Alternative methods may be faster for**:
- Simple linear recurrences (characteristic equation)
- Divide-and-conquer (Master Theorem)

## Asymptotic Analysis

From the generating function, asymptotic behavior comes from singularities.

If A(x) has its smallest singularity at x = 1/ρ, then typically:
```
aₙ ~ C · ρⁿ · n^k
```

For Fibonacci: singularity at x = 1/φ gives Fₙ ~ φⁿ/√5.
