# Solving Linear Homogeneous Recurrences

Linear homogeneous recurrences with constant coefficients have a systematic solution method using characteristic equations. This technique solves many recurrences arising in combinatorics and algorithm analysis.

## Standard Form

A linear homogeneous recurrence with constant coefficients:

```
aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ... + cₖaₙ₋ₖ
```

- **Linear**: Each term has degree 1
- **Homogeneous**: No added constant or function of n
- **Constant coefficients**: c₁, c₂, ..., cₖ are constants

## The Characteristic Equation Method

### Step 1: Guess aₙ = rⁿ

Assume the solution has form aₙ = rⁿ for some constant r.

Substituting into aₙ = c₁aₙ₋₁ + c₂aₙ₋₂:

```
rⁿ = c₁rⁿ⁻¹ + c₂rⁿ⁻²
```

Divide by rⁿ⁻²:

```
r² = c₁r + c₂
r² - c₁r - c₂ = 0
```

### Step 2: Solve the Characteristic Equation

The **characteristic equation** is:

```
r² - c₁r - c₂ = 0
```

For order k recurrence:
```
rᵏ - c₁rᵏ⁻¹ - c₂rᵏ⁻² - ... - cₖ = 0
```

### Step 3: Build General Solution

The form depends on the roots:

**Distinct roots r₁, r₂, ..., rₖ**:
```
aₙ = A₁r₁ⁿ + A₂r₂ⁿ + ... + Aₖrₖⁿ
```

**Repeated root r with multiplicity m**:
```
(A₁ + A₂n + A₃n² + ... + Aₘnᵐ⁻¹)rⁿ
```

### Step 4: Use Initial Conditions

Solve for constants A₁, A₂, ... using initial conditions.

## Example: Fibonacci Numbers

**Recurrence**: Fₙ = Fₙ₋₁ + Fₙ₋₂, F₀ = 0, F₁ = 1

**Characteristic equation**: r² = r + 1 → r² - r - 1 = 0

**Roots**: Using quadratic formula:
```
r = (1 ± √5)/2
```

Let φ = (1 + √5)/2 ≈ 1.618 (golden ratio)
Let ψ = (1 - √5)/2 ≈ -0.618

**General solution**:
```
Fₙ = Aφⁿ + Bψⁿ
```

**Apply initial conditions**:
- F₀ = 0: A + B = 0 → B = -A
- F₁ = 1: Aφ + Bψ = 1 → Aφ - Aψ = 1 → A(φ - ψ) = 1

Since φ - ψ = √5: A = 1/√5, B = -1/√5

**Binet's Formula**:
```
Fₙ = (φⁿ - ψⁿ)/√5
```

Since |ψ| < 1, ψⁿ → 0, so Fₙ ≈ φⁿ/√5 (rounds to nearest integer).

## Example: Distinct Roots

**Recurrence**: aₙ = 5aₙ₋₁ - 6aₙ₋₂, a₀ = 1, a₁ = 4

**Characteristic equation**: r² - 5r + 6 = 0 → (r-2)(r-3) = 0

**Roots**: r₁ = 2, r₂ = 3

**General solution**: aₙ = A·2ⁿ + B·3ⁿ

**Apply initial conditions**:
- a₀ = 1: A + B = 1
- a₁ = 4: 2A + 3B = 4

Solving: B = 2, A = -1

**Closed form**: aₙ = 2·3ⁿ - 2ⁿ = 2(3ⁿ - 2ⁿ⁻¹)

**Verify**: a₂ = 5(4) - 6(1) = 14. Using formula: 2·9 - 4 = 14 ✓

## Repeated Roots

When a root r has multiplicity m, the solutions include:
```
rⁿ, n·rⁿ, n²·rⁿ, ..., nᵐ⁻¹·rⁿ
```

### Example: Double Root

**Recurrence**: aₙ = 4aₙ₋₁ - 4aₙ₋₂, a₀ = 1, a₁ = 3

**Characteristic equation**: r² - 4r + 4 = 0 → (r-2)² = 0

**Root**: r = 2 (double)

**General solution**: aₙ = (A + Bn)2ⁿ

**Apply initial conditions**:
- a₀ = 1: A = 1
- a₁ = 3: 2(A + B) = 3 → 2(1 + B) = 3 → B = 1/2

**Closed form**: aₙ = (1 + n/2)2ⁿ = 2ⁿ + n·2ⁿ⁻¹

## Complex Roots

Complex roots come in conjugate pairs: r = α ± βi

Using Euler's formula, the real form:
```
aₙ = ρⁿ(A cos(nθ) + B sin(nθ))
```

Where ρ = |r| = √(α² + β²) and θ = arctan(β/α)

### Example: Oscillating Sequence

**Recurrence**: aₙ = -aₙ₋₂, a₀ = 1, a₁ = 0

**Characteristic equation**: r² + 1 = 0 → r = ±i

**ρ = 1, θ = π/2**

**General solution**: aₙ = A cos(nπ/2) + B sin(nπ/2)

**Apply initial conditions**:
- a₀ = 1: A = 1
- a₁ = 0: B = 0

**Closed form**: aₙ = cos(nπ/2)

This gives: 1, 0, -1, 0, 1, 0, -1, 0, ... (period 4)

## Higher Order Recurrences

The method extends to any order.

**Third order**: aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + c₃aₙ₋₃

**Characteristic**: r³ - c₁r² - c₂r - c₃ = 0

With three roots r₁, r₂, r₃:
```
aₙ = A₁r₁ⁿ + A₂r₂ⁿ + A₃r₃ⁿ
```

### Example: Tribonacci Numbers

Tₙ = Tₙ₋₁ + Tₙ₋₂ + Tₙ₋₃, T₀ = 0, T₁ = 0, T₂ = 1

Characteristic: r³ - r² - r - 1 = 0

One real root ≈ 1.839, two complex conjugates.

The dominant growth is like 1.839ⁿ.

## Why This Works

**Linearity**: If aₙ and bₙ are solutions, so is Aaₙ + Bbₙ.

**Characteristic roots**: Each root r gives a solution rⁿ.

**Dimension**: Order-k recurrence needs k linearly independent solutions. The k characteristic roots (counting multiplicity) provide exactly k.

**Initial conditions**: The k constants A₁, ..., Aₖ match k initial conditions, giving unique solution.

## Summary Table

| Roots | Solution Form |
|-------|--------------|
| r₁, r₂ distinct | A₁r₁ⁿ + A₂r₂ⁿ |
| r double | (A + Bn)rⁿ |
| r triple | (A + Bn + Cn²)rⁿ |
| r₁, r₂ = α ± βi | ρⁿ(A cos nθ + B sin nθ) |
