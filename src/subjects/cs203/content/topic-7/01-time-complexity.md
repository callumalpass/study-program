---
id: cs203-t7-time
title: "Time Complexity"
order: 1
---

# Time Complexity

**Time complexity** measures the computational resources—specifically running time—required to solve problems. It provides a framework for classifying problems by how quickly they can be solved, independent of specific hardware or implementation details.

## Why Time Complexity Matters

Understanding time complexity is essential for practical software development and theoretical computer science:

**Algorithm Selection**: When choosing between algorithms, time complexity tells us which will scale better. An O(n log n) sorting algorithm will dramatically outperform an O(n²) algorithm on large inputs.

**Feasibility Assessment**: Some problems have algorithms, but the algorithms are too slow to be practical. A problem solvable in O(2ⁿ) time is effectively unsolvable for large n, even though it's technically decidable.

**Problem Classification**: Time complexity classes like P and NP categorize problems by their inherent difficulty, revealing deep structure in what computers can efficiently compute.

## Historical Context

Complexity theory emerged in the 1960s-70s as computer scientists sought to understand the intrinsic difficulty of problems. Key milestones include:
- Hartmanis and Stearns (1965): Introduced time complexity classes
- Cook (1971): Proved SAT is NP-complete, launching P vs NP research
- Karp (1972): Identified 21 NP-complete problems, showing NP-completeness is pervasive

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

## Practical Perspective

Understanding these complexity bounds has real-world implications:

**Polynomial Time (Efficient)**: Problems in O(n), O(n²), O(n³) are generally tractable. Even O(n⁵) can be practical with optimizations. These correspond to the class P.

**Exponential Time (Intractable)**: Problems requiring O(2ⁿ), O(n!), or O(nⁿ) time quickly become infeasible. With n=100, operations exceeding 2¹⁰⁰ cannot complete before the heat death of the universe.

**The Threshold**: The boundary between polynomial and exponential separates problems we can solve from those we effectively cannot—at least without breakthrough algorithmic ideas.

## Connecting to P and NP

The study of time complexity leads naturally to fundamental questions:
- **Class P**: Problems solvable in polynomial time (efficient algorithms exist)
- **Class NP**: Problems where solutions can be verified in polynomial time
- **P vs NP**: Are these classes equal? The most important open problem in computer science

These classes and their relationships are explored in subsequent subtopics.

## Key Takeaways

- Time complexity measures algorithm efficiency as a function of input size
- We use worst-case analysis and asymptotic notation (Big-O) for clean comparisons
- Common complexity classes form a hierarchy: O(1) ⊂ O(log n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(2ⁿ)
- The Time Hierarchy Theorem proves more time strictly means more computational power
- Polynomial vs exponential is the key practical boundary for tractability
- Time complexity classes (like P and NP) categorize problems by inherent difficulty
- Model choice (single-tape vs multi-tape TM) affects time by polynomial factors, not fundamentally
