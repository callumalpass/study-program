---
id: math102-t6-advcomb
title: "Advanced Combinatorics"
order: 1
---

# Advanced Combinatorics

Beyond basic counting, advanced techniques handle complex structures like partitions, lattice paths with restrictions, and asymptotic enumeration.

## Integer Partitions

A **partition** of n is a way of writing n as a sum of positive integers, where order doesn't matter.

### Example: Partitions of 5

```
5 = 5
  = 4 + 1
  = 3 + 2
  = 3 + 1 + 1
  = 2 + 2 + 1
  = 2 + 1 + 1 + 1
  = 1 + 1 + 1 + 1 + 1
```

p(5) = 7 partitions

### Partition Function p(n)

| n | p(n) |
|---|------|
| 1 | 1 |
| 5 | 7 |
| 10 | 42 |
| 50 | 204,226 |
| 100 | 190,569,292 |

No simple closed form exists. Hardy-Ramanujan asymptotic:

```
p(n) ~ (1/4n√3) × exp(π√(2n/3))
```

### Generating Function

```
Σ p(n)xⁿ = 1/((1-x)(1-x²)(1-x³)...)
```

### Restricted Partitions

**p(n,k)**: Partitions of n into exactly k parts
**q(n)**: Partitions into distinct parts
**p_odd(n)**: Partitions into odd parts only

**Euler's Identity**: q(n) = p_odd(n)

Partitions of 5 into distinct parts: {5}, {4+1}, {3+2} → 3
Partitions of 5 into odd parts: {5}, {3+1+1}, {1+1+1+1+1} → 3 ✓

## Stirling Numbers

### Stirling Numbers of the Second Kind

S(n,k) = number of ways to partition n distinct objects into k non-empty subsets.

**Recurrence**:
```
S(n,k) = k × S(n-1,k) + S(n-1,k-1)
```

Base cases: S(n,0) = 0, S(0,0) = 1, S(n,n) = 1

**Example**: S(4,2) = 7

Partitions of {1,2,3,4} into 2 parts:
{{1},{2,3,4}}, {{2},{1,3,4}}, {{3},{1,2,4}}, {{4},{1,2,3}}, {{1,2},{3,4}}, {{1,3},{2,4}}, {{1,4},{2,3}}

### Bell Numbers

B(n) = total partitions of n objects = Σₖ S(n,k)

| n | B(n) |
|---|------|
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 15 |
| 5 | 52 |

### Stirling Numbers of the First Kind

s(n,k) = number of permutations of n elements with exactly k cycles.

**Unsigned**: |s(n,k)| = c(n,k)

**Recurrence**:
```
c(n,k) = (n-1) × c(n-1,k) + c(n-1,k-1)
```

## Catalan Numbers

The nth Catalan number:

```
Cₙ = C(2n,n)/(n+1) = C(2n,n) - C(2n,n+1)
```

| n | Cₙ |
|---|-----|
| 0 | 1 |
| 1 | 1 |
| 2 | 2 |
| 3 | 5 |
| 4 | 14 |
| 5 | 42 |

### Catalan Recurrence

```
Cₙ = Σᵢ₌₀ⁿ⁻¹ Cᵢ × Cₙ₋₁₋ᵢ
```

### What Catalan Numbers Count

1. **Balanced parentheses**: n pairs of parentheses correctly matched
2. **Dyck paths**: Lattice paths (0,0)→(n,n) never going above diagonal
3. **Full binary trees**: Trees with n+1 leaves
4. **Triangulations**: Ways to triangulate a convex (n+2)-gon
5. **Non-crossing partitions**: Set partitions where arcs don't cross
6. **Stack-sortable permutations**: Permutations sortable by a single stack

### Generating Function

```
C(x) = (1 - √(1-4x))/(2x) = Σₙ≥₀ Cₙxⁿ
```

Satisfies: C(x) = 1 + x × C(x)²

## Ballot Problem

In an election, A gets 'a' votes and B gets 'b' votes (a > b).

**Probability A leads throughout**: (a-b)/(a+b)

**Proof**: Uses reflection principle. Bad sequences (where B ever catches up) biject to sequences where B wins, counted by reflection across the diagonal.

## Cycle Lemma

Consider sequences of +1 and -1 with sum k > 0.

Exactly k of the n cyclic rotations have all partial sums positive.

**Corollary**: For n (+1)s and (n-1) (-1)s, exactly 1/(2n-1) of arrangements have all partial sums ≥ 0. This gives another proof that Cₙ = C(2n,n)/(n+1).

## Exponential Generating Functions

For labeled structures, use:

```
Ê(x) = Σₙ≥₀ aₙ × xⁿ/n!
```

**Product rule**: If Ê(x) and F̂(x) are EGFs, their product counts ways to partition a set and apply structures to each part.

### Labeled Structures Example

**Permutations**: All permutations of [n] → n!
EGF: Σ n! × xⁿ/n! = 1/(1-x)

**Derangements**: Dₙ derangements
EGF: e⁻ˣ/(1-x)

## Pólya Enumeration

Count distinct objects under symmetry using group actions.

**Burnside's Lemma**:
```
Number of distinct objects = (1/|G|) × Σₐ∈ₐ |Xᵍ|
```

Where |Xᵍ| = number of colorings fixed by symmetry g.

### Example: Coloring a Bracelet

Color 4 beads with 2 colors. Symmetries: rotations and reflections (dihedral group D₄, 8 elements).

- Identity: 2⁴ = 16 fixed
- Rotations by 90°, 270°: 2 fixed each
- Rotation by 180°: 4 fixed
- Two axis reflections: 4 fixed each
- Two diagonal reflections: 8 fixed each

Total: (16 + 2 + 4 + 2 + 4 + 4 + 8 + 8)/8 = 48/8 = 6 distinct bracelets

## Asymptotic Analysis

For large n, exact formulas are often replaced by approximations.

**Stirling's approximation**: n! ~ √(2πn)(n/e)ⁿ

**Binomial coefficients**: C(2n,n) ~ 4ⁿ/√(πn)

**Catalan numbers**: Cₙ ~ 4ⁿ/(n^(3/2)√π)
