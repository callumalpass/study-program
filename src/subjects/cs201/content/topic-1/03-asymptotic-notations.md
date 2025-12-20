---
id: cs201-t1-asymptotic
title: "Asymptotic Notations"
order: 3
---

# Asymptotic Notations

Asymptotic notation is the formal language of algorithm analysis. While "O(n²)" has entered everyday programmer vocabulary, the full family of notations—Big-O, Big-Ω, Big-Θ, little-o, and little-ω—enables precise statements about algorithm behavior. Using the wrong notation leads to imprecise or incorrect claims; using the right notation communicates exactly what you mean.

Big-O describes upper bounds: "this algorithm takes at most O(n²) time." Big-Ω describes lower bounds: "this algorithm takes at least Ω(n log n) time." Big-Θ describes tight bounds: "this algorithm takes exactly Θ(n) time." The distinction matters when making claims about algorithms. Saying "quicksort is O(n²)" is true but misleading—it suggests worst-case behavior while hiding the O(n log n) average case. Saying "comparison sorting requires Ω(n log n) comparisons" establishes a fundamental limit that no comparison sort can beat.

The mathematical definitions behind these notations—involving limits, constants, and threshold values—enable rigorous proofs about algorithm behavior. You can prove that one algorithm is asymptotically faster than another, that a problem has an inherent lower bound, or that a proposed algorithm achieves optimal complexity. This rigor elevates algorithm analysis from handwaving ("it seems fast") to mathematical certainty.

## Big-O: Upper Bound

**Definition**: f(n) = O(g(n)) if there exist c > 0 and n₀ such that f(n) ≤ c·g(n) for all n ≥ n₀.

**Meaning**: f grows no faster than g.

```
f(n) = 3n² + 5n + 2
f(n) = O(n²)

For n ≥ 5: 3n² + 5n + 2 ≤ 3n² + n² + n² = 5n²
So c = 5, n₀ = 5
```

## Big-Ω: Lower Bound

**Definition**: f(n) = Ω(g(n)) if there exist c > 0 and n₀ such that f(n) ≥ c·g(n) for all n ≥ n₀.

**Meaning**: f grows at least as fast as g.

```
f(n) = 3n² + 5n + 2
f(n) = Ω(n²)

For all n ≥ 1: 3n² + 5n + 2 ≥ 3n²
So c = 3, n₀ = 1
```

## Big-Θ: Tight Bound

**Definition**: f(n) = Θ(g(n)) if f(n) = O(g(n)) AND f(n) = Ω(g(n)).

**Meaning**: f grows at exactly the same rate as g.

```
f(n) = 3n² + 5n + 2
f(n) = Θ(n²)

3n² ≤ 3n² + 5n + 2 ≤ 5n² for large n
So c₁ = 3, c₂ = 5, n₀ = 5
```

## Little-o: Strict Upper Bound

**Definition**: f(n) = o(g(n)) if lim(n→∞) f(n)/g(n) = 0.

**Meaning**: f grows strictly slower than g.

```
n = o(n²)        # n/n² = 1/n → 0
n² ≠ o(n²)       # n²/n² = 1 ↛ 0
log(n) = o(n)    # log(n)/n → 0
```

## Little-ω: Strict Lower Bound

**Definition**: f(n) = ω(g(n)) if lim(n→∞) f(n)/g(n) = ∞.

**Meaning**: f grows strictly faster than g.

```
n² = ω(n)        # n²/n = n → ∞
n² = ω(n log n)  # n²/(n log n) = n/log n → ∞
2ⁿ = ω(nᵏ)       # For any constant k
```

## Notation Summary

| Notation | Relation | Intuition |
|----------|----------|-----------|
| O | ≤ | Upper bound |
| Ω | ≥ | Lower bound |
| Θ | = | Tight bound |
| o | < | Strictly less |
| ω | > | Strictly greater |

## Common Growth Rates

From slowest to fastest:

```
1 < log(n) < √n < n < n log(n) < n² < n³ < 2ⁿ < n! < nⁿ
```

### Hierarchy Proofs

**log(n) = o(n)**:
lim(n→∞) log(n)/n = lim(n→∞) 1/n (L'Hôpital) = 0 ✓

**n = o(n log n)**:
lim(n→∞) n/(n log n) = lim(n→∞) 1/log n = 0 ✓

**n² = o(2ⁿ)**:
lim(n→∞) n²/2ⁿ = 0 (exponential dominates polynomial) ✓

## Properties

### Transitivity

If f = O(g) and g = O(h), then f = O(h).
Same for Ω, Θ, o, ω.

### Reflexivity

f = O(f), f = Ω(f), f = Θ(f)
But: f ≠ o(f), f ≠ ω(f)

### Symmetry

f = Θ(g) iff g = Θ(f)

### Transpose Symmetry

f = O(g) iff g = Ω(f)
f = o(g) iff g = ω(f)

## Arithmetic Rules

### Addition

O(f) + O(g) = O(max(f, g))
Θ(f) + Θ(g) = Θ(max(f, g))

```
O(n²) + O(n) = O(n²)
Θ(n log n) + Θ(n) = Θ(n log n)
```

### Multiplication

O(f) × O(g) = O(f × g)
Θ(f) × Θ(g) = Θ(f × g)

```
O(n) × O(log n) = O(n log n)
n × O(1) = O(n)
```

### Constants

c × O(f) = O(f) for any constant c > 0
O(c × f) = O(f)

```
5 × O(n²) = O(n²)
O(100n) = O(n)
```

## Best, Worst, Average Cases

Asymptotic notation describes a function, not an algorithm directly.

**Quicksort**:
- Best case: Θ(n log n)
- Average case: Θ(n log n)
- Worst case: Θ(n²)

We can say:
- Quicksort is O(n²) in the worst case
- Quicksort is Ω(n log n) in all cases
- Quicksort is Θ(n log n) on average

## Common Mistakes

**Wrong**: "Algorithm is O(n²) and Ω(n²)"
**Right**: "Algorithm is Θ(n²)" or specify which case

**Wrong**: "O(2n) is worse than O(n)"
**Right**: O(2n) = O(n), constants don't matter

**Wrong**: "Best case is O(1)"
**Right**: Best case might be Θ(1), but O is an upper bound

## Practical Analysis

When analyzing algorithms:

1. Identify worst-case complexity (usually most important)
2. Consider average-case if inputs are random
3. Note best-case for understanding algorithm behavior
4. Use Θ when bounds are tight, O when only upper bound known

```python
# Linear search: O(n) worst, Θ(1) best
# Binary search: O(log n) worst, Θ(1) best
# Merge sort: Θ(n log n) all cases
```
