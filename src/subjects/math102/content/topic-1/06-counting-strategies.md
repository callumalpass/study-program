---
id: math102-t1-strat
title: "Counting Strategies"
order: 6
---

# Counting Strategies and Problem Types

Mastering combinatorics requires recognizing problem patterns and selecting appropriate techniques. This section covers systematic approaches to common counting scenarios.

## Decision Framework

When facing a counting problem, ask:

1. **Order**: Does arrangement matter?
   - Yes → Permutation-type
   - No → Combination-type

2. **Repetition**: Can items be reused?
   - Yes → With repetition formulas
   - No → Without repetition formulas

3. **Structure**: What's being created?
   - Sequences, arrangements → Permutations
   - Subsets, groups → Combinations
   - Partitions → Stars and bars, Stirling numbers

### The Four Basic Cases

| Repetition? | Order Matters | Order Doesn't Matter |
|-------------|--------------|---------------------|
| No | P(n,k) = n!/(n-k)! | C(n,k) = n!/(k!(n-k)!) |
| Yes | nᵏ | C(n+k-1,k) |

## Distributing Objects

### Distinct Objects into Distinct Boxes

**Each box gets at most one**: P(n,k) if k ≤ n, else 0

**Any distribution allowed**: nᵏ ways (each of k objects chooses a box)

**Exactly one object per box** (n=k): n! ways

### Identical Objects into Distinct Boxes

**Stars and bars**: C(n+k-1, k-1) ways to put n identical objects into k distinct boxes.

Example: Distribute 10 identical candies to 4 children.
C(10+4-1, 4-1) = C(13,3) = 286 ways

**With minimum requirements**: If each box needs at least 1, first place one in each, then distribute remainder.
Distribute 10 candies, each child gets at least 1:
Give 1 to each → 6 remaining
Distribute 6 to 4: C(6+4-1, 4-1) = C(9,3) = 84 ways

### Distinct Objects into Identical Boxes

This counts **partitions of a set** into non-empty parts.

Stirling number of second kind S(n,k) counts ways to partition n distinct objects into exactly k non-empty groups.

S(4,2) = 7: {{1},{2,3,4}}, {{2},{1,3,4}}, {{3},{1,2,4}}, {{4},{1,2,3}}, {{1,2},{3,4}}, {{1,3},{2,4}}, {{1,4},{2,3}}

### Identical Objects into Identical Boxes

This counts **integer partitions**.

p(n,k) = number of ways to write n as sum of exactly k positive integers (order doesn't matter).

Example: p(6,3) = 3: 6 = 4+1+1 = 3+2+1 = 2+2+2

## Grid Path Problems

### Lattice Paths

Count paths from (0,0) to (m,n) using only right (R) and up (U) moves.

Total moves: m rights + n ups
Any arrangement works → C(m+n, n) paths

Example: (0,0) to (4,3): C(7,3) = 35 paths

### Paths Avoiding Points/Lines

Use reflection principle or inclusion-exclusion.

**Ballot problem**: A gets 'a' votes, B gets 'b' votes (a > b). Probability A leads throughout:
P = (a-b)/(a+b)

Count using reflection across y = x line.

### Catalan Numbers

Paths from (0,0) to (n,n) never going above diagonal:

```
Cₙ = C(2n,n)/(n+1) = C(2n,n) - C(2n,n+1)
```

First few: 1, 1, 2, 5, 14, 42, 132, ...

Catalan numbers count many structures:
- Valid parentheses sequences
- Full binary trees with n+1 leaves
- Triangulations of convex polygon
- Non-crossing partitions

## Sequence and String Problems

### Binary Strings

n-bit strings with exactly k ones: C(n,k)

n-bit strings with no consecutive ones: Fibonacci! F(n+2)

### Avoiding Patterns

Strings of length n over k-letter alphabet avoiding specific subsequence often requires recurrence relations or generating functions.

Example: Ternary strings of length n with no "00":
Let aₙ = count. Either:
- Ends in 1 or 2: 2aₙ₋₁ continuations
- Ends in 0 preceded by 1 or 2: 2aₙ₋₂ continuations

Recurrence: aₙ = 2aₙ₋₁ + 2aₙ₋₂

## Committee and Selection Problems

### Committees with Restrictions

**President included**: Fix president, choose remaining k-1 from n-1
Answer: C(n-1, k-1)

**President excluded**: Choose all k from remaining n-1
Answer: C(n-1, k)

**At least one from group A**: Total - (none from A)
Answer: C(n,k) - C(n-|A|, k)

### Multiple Committees

Choose committee of k and subcommittee of j:
C(n,k) × C(k,j)

Alternatively: C(n,j) × C(n-j, k-j) (choose subcommittee first)

Both give same answer: n! / (j!(k-j)!(n-k)!)

## Generating Functions Approach

For complex counting, generating functions provide algebraic tools.

### Ordinary Generating Function

For sequence a₀, a₁, a₂, ...:
G(x) = a₀ + a₁x + a₂x² + ...

The coefficient of xⁿ in G(x) gives aₙ.

### Example: Coin Change

Ways to make n cents using pennies, nickels, dimes:

G(x) = 1/((1-x)(1-x⁵)(1-x¹⁰))

Expand and read coefficients.

### Useful Identities

```
1/(1-x) = 1 + x + x² + x³ + ...
1/(1-x)ᵏ = Σ C(n+k-1,k-1)xⁿ (stars and bars!)
(1+x)ⁿ = Σ C(n,k)xᵏ
```

## Problem-Solving Checklist

1. ☐ Understand what's being counted
2. ☐ Identify if order matters
3. ☐ Check for repetition
4. ☐ Look for constraints (minimum/maximum, restrictions)
5. ☐ Consider complement counting
6. ☐ Check for overcounting requiring division
7. ☐ Verify with small cases
8. ☐ Sanity check the answer's magnitude

## Common Mistakes

**Confusing with/without replacement**: Sampling WITH replacement allows repeats; WITHOUT doesn't.

**Ignoring identical items**: MISSISSIPPI ≠ 11 distinct letters.

**Forgetting "at least"**: "At least one" often needs complement.

**Order confusion in teams**: Teams of 3 vs. President/VP/Secretary.

**Wrong formula for circular**: Linear: n!. Circular: (n-1)!.
