# The Master Theorem

The Master Theorem provides a direct formula for solving divide-and-conquer recurrences of a specific form, eliminating the need for detailed analysis in common cases.

## Standard Form

The Master Theorem applies to recurrences of the form:

```
T(n) = aT(n/b) + f(n)
```

Where:
- **a ≥ 1**: Number of subproblems
- **b > 1**: Factor by which input size shrinks
- **f(n)**: Work done outside recursive calls (divide + combine)

## The Three Cases

Compare f(n) with n^(log_b(a)):

### Case 1: Recursion Dominates

If f(n) = O(n^(log_b(a) - ε)) for some ε > 0:

```
T(n) = Θ(n^(log_b(a)))
```

**Intuition**: Work at leaves dominates; most work happens in recursive calls.

**Example**: Binary search variant
```
T(n) = 2T(n/2) + O(1)
a = 2, b = 2, log_b(a) = 1
f(n) = O(1) = O(n^(1-1)) = O(n^0)
Case 1: T(n) = Θ(n)
```

### Case 2: Equal Work at All Levels

If f(n) = Θ(n^(log_b(a)) · log^k(n)) for some k ≥ 0:

```
T(n) = Θ(n^(log_b(a)) · log^(k+1)(n))
```

**Special case** (k = 0): If f(n) = Θ(n^(log_b(a))):
```
T(n) = Θ(n^(log_b(a)) · log n)
```

**Intuition**: Work evenly distributed across levels; log n levels contribute.

**Example**: Merge sort
```
T(n) = 2T(n/2) + Θ(n)
a = 2, b = 2, log_b(a) = 1
f(n) = Θ(n) = Θ(n^1)
Case 2 (k=0): T(n) = Θ(n log n)
```

### Case 3: Combine Step Dominates

If f(n) = Ω(n^(log_b(a) + ε)) for some ε > 0, AND f(n) satisfies the regularity condition af(n/b) ≤ cf(n) for some c < 1:

```
T(n) = Θ(f(n))
```

**Intuition**: Work at root dominates; recursive work is negligible.

**Example**: Select algorithm's worst case analysis
```
T(n) = T(n/2) + Θ(n)
a = 1, b = 2, log_b(a) = 0
f(n) = Θ(n) = Ω(n^(0+1))
Regularity: 1·f(n/2) = n/2 ≤ (1/2)·n = (1/2)·f(n) ✓
Case 3: T(n) = Θ(n)
```

## Worked Examples

### Example 1: Karatsuba Multiplication

```
T(n) = 3T(n/2) + Θ(n)
```

- a = 3, b = 2
- log_2(3) ≈ 1.585
- f(n) = Θ(n) = O(n^(1.585 - 0.585))

**Case 1**: T(n) = Θ(n^(log_2(3))) ≈ Θ(n^1.585)

### Example 2: Strassen's Matrix Multiplication

```
T(n) = 7T(n/2) + Θ(n²)
```

- a = 7, b = 2
- log_2(7) ≈ 2.807
- f(n) = Θ(n²) = O(n^(2.807 - 0.807))

**Case 1**: T(n) = Θ(n^(log_2(7))) ≈ Θ(n^2.807)

### Example 3: Modified Binary Search

```
T(n) = T(n/2) + Θ(log n)
```

- a = 1, b = 2
- log_2(1) = 0
- f(n) = Θ(log n)

This doesn't fit standard cases! f(n) = Θ(log n) is between Θ(1) and Θ(n^ε).

**Solution by expansion**:
```
T(n) = log n + log(n/2) + log(n/4) + ...
     = log n + (log n - 1) + (log n - 2) + ...
     = Θ(log² n)
```

### Example 4: Balanced Partition

```
T(n) = 2T(n/2) + n log n
```

- a = 2, b = 2
- log_2(2) = 1
- f(n) = n log n = Θ(n^1 · log n)

**Case 2** (k = 1): T(n) = Θ(n log² n)

### Example 5: Unequal Division

```
T(n) = T(n/3) + T(2n/3) + Θ(n)
```

Master Theorem doesn't directly apply (different subproblem sizes). But analysis shows work is Θ(n) per level, log_{3/2}(n) levels deep.

**Result**: T(n) = Θ(n log n)

## Recognizing Cases

### Quick Decision Tree

```
Given T(n) = aT(n/b) + f(n):

1. Compute k = log_b(a)

2. Compare f(n) to n^k:
   - f(n) polynomially smaller → Case 1 → T(n) = Θ(n^k)
   - f(n) ≈ n^k (within log factors) → Case 2
   - f(n) polynomially larger → Case 3 → T(n) = Θ(f(n))
```

### Common Patterns

| Recurrence | log_b(a) | f(n) | Case | T(n) |
|------------|----------|------|------|------|
| T(n) = 2T(n/2) + 1 | 1 | O(1) | 1 | Θ(n) |
| T(n) = 2T(n/2) + n | 1 | Θ(n) | 2 | Θ(n log n) |
| T(n) = 2T(n/2) + n² | 1 | Ω(n²) | 3 | Θ(n²) |
| T(n) = 4T(n/2) + n | 2 | O(n) | 1 | Θ(n²) |
| T(n) = 4T(n/2) + n² | 2 | Θ(n²) | 2 | Θ(n² log n) |
| T(n) = T(n/2) + n | 0 | Ω(n) | 3 | Θ(n) |

## When Master Theorem Doesn't Apply

### Gap Between Cases

If f(n) differs from n^(log_b(a)) by less than a polynomial factor:

```
T(n) = 2T(n/2) + n/log n
```

Here f(n) = n/log n is not polynomially different from n. Use other methods.

### Non-Constant a or b

```
T(n) = √n · T(√n) + n
```

Master Theorem requires constant a and b.

### Floor/Ceiling Effects

```
T(n) = 2T(⌊n/2⌋) + n
```

In practice, floors/ceilings don't affect asymptotic result. Can usually apply Master Theorem.

### Regularity Condition Fails

In Case 3, if af(n/b) > cf(n) for all c < 1, the theorem doesn't apply directly.

## Extended Master Theorem

For more cases, including logarithmic gaps:

If f(n) = Θ(n^(log_b(a)) · (log n)^k):
- k > -1: T(n) = Θ(n^(log_b(a)) · (log n)^(k+1))
- k = -1: T(n) = Θ(n^(log_b(a)) · log log n)
- k < -1: T(n) = Θ(n^(log_b(a)))

## Alternative: Akra-Bazzi Method

For more general recurrences:

```
T(n) = Σᵢ aᵢT(bᵢn + hᵢ(n)) + g(n)
```

Find p such that Σᵢ aᵢbᵢ^p = 1, then:

```
T(n) = Θ(n^p · (1 + ∫₁ⁿ g(u)/u^(p+1) du))
```

Handles unequal splits and floor/ceiling terms rigorously.

## Proof Intuition

### Recursion Tree Analysis

The Master Theorem can be understood through recursion trees:

- **Depth**: log_b(n) levels
- **Nodes at level i**: a^i
- **Work per node at level i**: f(n/b^i)
- **Total work at level i**: a^i · f(n/b^i)

**Case 1**: Work increases geometrically down the tree; leaves dominate.

**Case 2**: Work roughly equal at each level; multiply by number of levels.

**Case 3**: Work decreases geometrically down the tree; root dominates.

## Summary

The Master Theorem is a powerful tool for analyzing divide-and-conquer algorithms:

1. Write recurrence in form T(n) = aT(n/b) + f(n)
2. Compute log_b(a)
3. Compare f(n) to n^(log_b(a))
4. Apply appropriate case

When it doesn't apply, fall back to:
- Substitution method
- Recursion tree analysis
- Akra-Bazzi method

