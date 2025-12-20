---
id: math102-t2-nonhom
title: "Non-Homogeneous Recurrences"
order: 3
---

# Non-Homogeneous Recurrences

Non-homogeneous recurrences include extra terms beyond the previous sequence values. These model situations where external "input" affects each step, common in algorithm analysis and applications.

## Standard Form

```
aₙ = c₁aₙ₋₁ + c₂aₙ₋₂ + ... + cₖaₙ₋ₖ + f(n)
```

The function f(n) is the **non-homogeneous** or **forcing** term.

Examples:
- aₙ = 2aₙ₋₁ + 3 (constant forcing)
- aₙ = aₙ₋₁ + n (linear forcing)
- aₙ = 2aₙ₋₁ + 2ⁿ (exponential forcing)

## Solution Structure

The general solution is:

```
aₙ = aₙ⁽ʰ⁾ + aₙ⁽ᵖ⁾
```

- **aₙ⁽ʰ⁾**: Homogeneous solution (solve without f(n))
- **aₙ⁽ᵖ⁾**: Particular solution (any solution to full equation)

### Why This Works

If aₙ⁽ʰ⁾ solves the homogeneous version and aₙ⁽ᵖ⁾ solves the full equation:

```
aₙ⁽ʰ⁾ + aₙ⁽ᵖ⁾ = (c₁aₙ₋₁⁽ʰ⁾ + ...) + (c₁aₙ₋₁⁽ᵖ⁾ + ... + f(n))
             = c₁(aₙ₋₁⁽ʰ⁾ + aₙ₋₁⁽ᵖ⁾) + ... + f(n)
```

The sum satisfies the original equation.

## Method of Undetermined Coefficients

Guess a particular solution based on f(n)'s form:

| f(n) | Guess for aₙ⁽ᵖ⁾ |
|------|-----------------|
| constant c | A (constant) |
| n | An + B |
| n² | An² + Bn + C |
| bⁿ | Abⁿ |
| n·bⁿ | (An + B)bⁿ |

**Special case**: If the guess overlaps with homogeneous solution, multiply by n.

## Example: Constant Forcing

**Recurrence**: aₙ = 2aₙ₋₁ + 3, a₀ = 1

**Step 1: Homogeneous solution**
aₙ = 2aₙ₋₁ has solution aₙ⁽ʰ⁾ = A·2ⁿ

**Step 2: Particular solution**
Guess aₙ⁽ᵖ⁾ = B (constant)
Substitute: B = 2B + 3 → -B = 3 → B = -3
So aₙ⁽ᵖ⁾ = -3

**Step 3: General solution**
aₙ = A·2ⁿ - 3

**Step 4: Apply initial condition**
a₀ = 1: A - 3 = 1 → A = 4

**Closed form**: aₙ = 4·2ⁿ - 3 = 2ⁿ⁺² - 3

## Example: Linear Forcing

**Recurrence**: aₙ = aₙ₋₁ + n, a₀ = 0

**Homogeneous**: aₙ = aₙ₋₁ → aₙ⁽ʰ⁾ = A (constant)

**Particular**: Guess aₙ⁽ᵖ⁾ = Bn + C
Substitute: Bn + C = B(n-1) + C + n = Bn - B + C + n
Comparing: Bn + C = (B+1)n + (C-B)
- Coefficient of n: B = B + 1 (contradiction!)

**Problem**: Constant is part of homogeneous solution.

**Fix**: Multiply by n. Guess aₙ⁽ᵖ⁾ = Bn² + Cn
Substitute: Bn² + Cn = B(n-1)² + C(n-1) + n
         = Bn² - 2Bn + B + Cn - C + n
Comparing:
- n²: B = B ✓
- n: C = -2B + C + 1 → 0 = -2B + 1 → B = 1/2
- constant: 0 = B - C → C = 1/2

**Particular**: aₙ⁽ᵖ⁾ = n²/2 + n/2 = n(n+1)/2

**General**: aₙ = A + n(n+1)/2

**Initial**: a₀ = 0 → A = 0

**Closed form**: aₙ = n(n+1)/2 (triangular numbers!)

## Example: Exponential Forcing

**Recurrence**: aₙ = 3aₙ₋₁ + 2ⁿ, a₀ = 1

**Homogeneous**: aₙ⁽ʰ⁾ = A·3ⁿ

**Particular**: Guess aₙ⁽ᵖ⁾ = B·2ⁿ
Substitute: B·2ⁿ = 3B·2ⁿ⁻¹ + 2ⁿ = (3B/2)·2ⁿ + 2ⁿ
           B = 3B/2 + 1 → -B/2 = 1 → B = -2

**General**: aₙ = A·3ⁿ - 2·2ⁿ = A·3ⁿ - 2ⁿ⁺¹

**Initial**: a₀ = 1 → A - 2 = 1 → A = 3

**Closed form**: aₙ = 3ⁿ⁺¹ - 2ⁿ⁺¹

## Resonance (Overlapping Solutions)

When f(n) resembles a homogeneous solution, multiply the guess by n.

**Example**: aₙ = 2aₙ₋₁ + 2ⁿ, a₀ = 1

Homogeneous solution is 2ⁿ. The forcing term 2ⁿ matches!

**Wrong guess**: aₙ⁽ᵖ⁾ = B·2ⁿ gives B·2ⁿ = 2B·2ⁿ⁻¹ + 2ⁿ = B·2ⁿ + 2ⁿ
This gives 0 = 2ⁿ, which is impossible.

**Correct guess**: aₙ⁽ᵖ⁾ = Bn·2ⁿ
Substitute: Bn·2ⁿ = 2·B(n-1)·2ⁿ⁻¹ + 2ⁿ
          = B(n-1)·2ⁿ + 2ⁿ
          = Bn·2ⁿ - B·2ⁿ + 2ⁿ
Comparing: 0 = -B + 1 → B = 1

**Particular**: aₙ⁽ᵖ⁾ = n·2ⁿ

**General**: aₙ = A·2ⁿ + n·2ⁿ = (A + n)·2ⁿ

**Initial**: a₀ = 1 → A = 1

**Closed form**: aₙ = (n + 1)·2ⁿ

## Tower of Hanoi

**Recurrence**: Hₙ = 2Hₙ₋₁ + 1, H₁ = 1

**Homogeneous**: Hₙ⁽ʰ⁾ = A·2ⁿ

**Particular**: Guess Hₙ⁽ᵖ⁾ = B
B = 2B + 1 → B = -1

**General**: Hₙ = A·2ⁿ - 1

**Initial**: H₁ = 1 → 2A - 1 = 1 → A = 1

**Closed form**: Hₙ = 2ⁿ - 1

For n disks, minimum moves = 2ⁿ - 1.

## Variation of Parameters

For more complex f(n), the variation of parameters method works when undetermined coefficients fails.

Given aₙ = c·aₙ₋₁ + f(n):

```
aₙ = cⁿa₀ + Σⱼ₌₁ⁿ cⁿ⁻ʲf(j)
```

This "accumulates" the forcing function's contributions.

## Summary: Solving Non-Homogeneous Recurrences

1. Solve the homogeneous part for aₙ⁽ʰ⁾
2. Guess particular solution form based on f(n)
3. If guess overlaps with homogeneous solution, multiply by n
4. Substitute and solve for coefficients
5. Combine: aₙ = aₙ⁽ʰ⁾ + aₙ⁽ᵖ⁾
6. Apply initial conditions to find all constants
