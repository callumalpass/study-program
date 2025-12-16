# Time Complexity

**Time complexity** measures the computational resources—specifically running time—required to solve problems. It classifies problems by how quickly they can be solved.

## Measuring Time

For a deterministic TM M, the **running time** on input w is:
- Number of steps until M halts
- If M doesn't halt, time is undefined (∞)

## Time Complexity Function

The **time complexity** of M is function t: ℕ → ℕ where:

t(n) = max{steps M takes on input w : |w| = n}

Worst-case over all inputs of length n.

## Big-O Notation

We use asymptotic notation to describe growth rates:

- **O(f(n))**: Upper bound (at most)
- **Ω(f(n))**: Lower bound (at least)
- **Θ(f(n))**: Tight bound (exactly)

f(n) = O(g(n)) means ∃c,n₀: f(n) ≤ c·g(n) for n ≥ n₀

## Common Time Bounds

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Linear search |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Selection sort |
| O(n³) | Cubic | Matrix multiplication |
| O(2ⁿ) | Exponential | Brute-force SAT |

## Time Complexity Classes

**TIME(t(n))** = languages decidable in O(t(n)) time by deterministic TM.

Examples:
- TIME(n) ⊂ TIME(n²) ⊂ TIME(n³) ⊂ ...
- Strict hierarchy: more time = more languages

## Time Hierarchy Theorem

**Theorem**: For time-constructible f(n):

TIME(f(n)) ⊊ TIME(f(n)·log²(f(n)))

More time means strictly more power (can solve new problems).

## Multi-Tape vs Single-Tape

**Theorem**: If multi-tape TM runs in time t(n), single-tape TM can simulate in O(t(n)²).

Polynomial relationship—same complexity class P.

## Reasonable vs Unreasonable

**Polynomial time** (n^c for constant c): Considered "efficient"
**Exponential time** (2^n, n!): Considered "intractable"

This distinction, while arbitrary, captures real-world practicality.

## Model Independence (for P)

Polynomial-time class P is robust:
- Same for single-tape, multi-tape TMs
- Same for RAMs
- Same for most reasonable models

Justifies studying P as fundamental class.

## Examples

**Sorting**: O(n log n) — in P
**Matrix multiplication**: O(n³) standard, O(n^2.37) best known — in P
**Graph connectivity**: O(n + m) — in P
**Primality testing**: O(n¹²) or better — in P (AKS algorithm)

## Analyzing Algorithms

To determine time complexity:
1. Identify basic operations
2. Count operations as function of input size
3. Express in big-O notation

## Lower Bounds

Proving lower bounds is harder:
- Comparison-based sorting: Ω(n log n)
- Element distinctness: Ω(n log n) comparisons
- Most lower bounds unknown

## Time vs Space

Time can be converted to space and vice versa (with overhead):
- SPACE(s(n)) ⊆ TIME(2^O(s(n)))
- TIME(t(n)) ⊆ SPACE(t(n))
