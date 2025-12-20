# The Pigeonhole Principle

The pigeonhole principle is one of the simplest yet most powerful tools in combinatorics. Despite its elementary nature, it proves surprisingly deep results about existence.

## Basic Form

**If n+1 or more objects are placed into n boxes, at least one box contains 2 or more objects.**

More generally: If n objects are placed into k boxes and n > k, at least one box contains at least 2 objects.

### Simple Example

If 13 people are in a room, at least 2 share the same birth month.

- 13 people (pigeons)
- 12 months (holes)
- 13 > 12, so some month has ≥ 2 people

## Generalized Pigeonhole Principle

**If n objects are placed into k boxes, at least one box contains at least ⌈n/k⌉ objects.**

Where ⌈x⌉ is the ceiling function (round up).

### Example: Cards

In a standard 52-card deck, how many cards must you draw to guarantee 5 of the same suit?

- 4 suits (boxes)
- Need at least 5 in one suit
- ⌈n/4⌉ ≥ 5 means n ≥ 17
- Draw 17 cards to guarantee 5 of one suit

**Why not 16?** With 16 cards, you could have exactly 4 of each suit (4×4=16).

### Formula Derivation

If all boxes had fewer than ⌈n/k⌉ objects, each has at most ⌈n/k⌉ - 1.

Total ≤ k × (⌈n/k⌉ - 1) < k × (n/k) = n

Contradiction! So some box must have ≥ ⌈n/k⌉.

## Classic Applications

### Same Sum Subsets

Among any 10 distinct integers from 1 to 100, there exist two non-empty disjoint subsets with equal sums.

**Proof**:
- 10 integers have 2¹⁰ - 1 = 1023 non-empty subsets
- Maximum possible sum: 91+92+...+100 = 955
- Minimum possible sum: 1
- At most 955 different sums possible
- 1023 subsets > 955 possible sums
- By pigeonhole, two subsets have the same sum

If they overlap, remove common elements to get disjoint subsets with equal sums.

### Divisibility

Among any n+1 integers, two have the same remainder when divided by n.

**Proof**: Only n possible remainders (0 through n-1). With n+1 integers, some remainder repeats.

**Consequence**: Among any n+1 integers, two differ by a multiple of n.

### Points in a Square

Place 5 points in a unit square. At least 2 points are within distance √2/2 of each other.

**Proof**: Divide square into 4 equal (1/2 × 1/2) squares. By pigeonhole, some small square contains 2+ points. Maximum distance within a 1/2 × 1/2 square is its diagonal: √(1/4 + 1/4) = √(1/2) = √2/2.

### Handshake Lemma Consequence

At any party of n ≥ 2 people, at least two people have the same number of friends present.

**Proof**: Each person can have 0, 1, 2, ..., or n-1 friends (n possible values). But if someone has 0 friends, no one can have n-1 friends (and vice versa). So at most n-1 distinct values for n people. By pigeonhole, some value repeats.

## Probabilistic Interpretation

Pigeonhole gives existence proofs but not explicit constructions.

### Birthday Paradox Connection

In a room of 23 people, probability of a shared birthday > 50%.

This isn't directly pigeonhole (which guarantees a match at 367), but shows that collisions happen sooner than intuition suggests.

With 23 people and 365 days:
P(all different) = 365/365 × 364/365 × ... × 343/365 ≈ 0.493
P(at least one match) ≈ 0.507

## Advanced Applications

### Erdős-Szekeres Theorem

Any sequence of n² + 1 distinct numbers contains either an increasing subsequence of length n+1 or a decreasing subsequence of length n+1.

**Proof sketch**: Assign each element a pair (i,j) where i = length of longest increasing subsequence ending here, j = length of longest decreasing subsequence ending here.

If neither exceeds n, then pairs come from {1,...,n} × {1,...,n}, giving at most n² distinct pairs. With n²+1 elements, two share the same pair—but this is impossible for distinct elements in sequence.

### Ramsey-Type Results

Many Ramsey theory results are proven via pigeonhole. Example: In any 2-coloring of edges of K₆ (complete graph on 6 vertices), there exists a monochromatic triangle.

**Proof**: Fix a vertex v. It has 5 edges to other vertices. By pigeonhole, at least 3 edges share a color (say red). Consider the 3 vertices connected to v by red edges. If any edge among them is red, we have a red triangle with v. If all three edges are blue, we have a blue triangle.

## Constructive vs. Non-Constructive

Pigeonhole proofs are existence proofs—they prove something exists without showing how to find it.

**Example**: Among 100 integers, some two have the same last two digits.

We know two exist, but the proof doesn't identify which two.

In algorithms, this distinction matters:
- **Existence**: Some configuration must occur (useful for impossibility proofs)
- **Finding it**: May require O(n) search or clever algorithm

## Problem-Solving Strategy

1. **Identify the objects** (pigeons): What are we distributing?
2. **Identify the categories** (holes): What properties define groups?
3. **Count**: Show objects > categories (or use generalized form)
4. **Conclude**: State what must repeat or collide

### Template Problems

"Among any n objects with property P, at least two share property Q."

1. Define categories based on Q values
2. Show number of categories < n
3. Apply pigeonhole

## Common Pitfalls

**Wrong direction**: Pigeonhole works when objects > holes, not the reverse.

**Incorrect ceiling**: For "at least k in one box," ensure you correctly solve ⌈n/m⌉ ≥ k.

**Overlooking constraints**: The problem "two people with same friends" requires noting that 0 and n-1 friends are mutually exclusive.
