# Advanced Counting Problems

This section presents challenging counting problems that synthesize multiple techniques. Working through these builds problem-solving mastery.

## Lattice Path Problems

### Standard Lattice Paths

**Problem:** Count paths from (0,0) to (m,n) using steps right (R) and up (U).

**Solution:** Total steps = m+n, choose n to be U (or m to be R).
$$\binom{m+n}{n} = \binom{m+n}{m}$$

### Paths Avoiding Diagonal

**Problem (Ballot Problem):** Count paths from (0,0) to (m,n) staying strictly below y=x (where m > n).

**Solution:** By reflection principle:
$$\binom{m+n}{n} - \binom{m+n}{n+1} = \frac{m-n+1}{m+1}\binom{m+n}{n}$$

**Interpretation:** Probability candidate A stays ahead of B throughout count.

### Catalan Numbers via Paths

**Dyck paths:** From (0,0) to (2n,0), steps (+1,+1) or (+1,-1), never going below x-axis.

$$C_n = \frac{1}{n+1}\binom{2n}{n}$$

## Counting Permutations with Restrictions

### Permutations with Descent Pattern

A **descent** at position i means π(i) > π(i+1).

**Problem:** Count permutations of [n] with descents exactly at positions in set S.

Uses **Eulerian numbers** A(n,k) = permutations with exactly k descents.

### Alternating Permutations

Pattern: π(1) < π(2) > π(3) < π(4) > ...

$$E_n = \text{number of alternating permutations of } [n]$$

Generating function:
$$\sum_{n=0}^{\infty} E_n \frac{x^n}{n!} = \sec x + \tan x$$

### Pattern Avoidance

Count permutations avoiding specific patterns (e.g., no 132 pattern).

Surprisingly, all patterns of length 3 give Catalan numbers.

## Counting Functions

### Surjections

Onto functions from [m] to [n]:
$$n! \cdot S(m,n) = \sum_{k=0}^{n} (-1)^k \binom{n}{k}(n-k)^m$$

### Injections

One-to-one functions from [m] to [n] (m ≤ n):
$$P(n,m) = n(n-1)\cdots(n-m+1)$$

### Functions with Restricted Image

Count f: [m] → [n] where each value is used at least once (surjection) or at most once (injection).

## Set Partition Problems

### Partitions with Block Constraints

**Problem:** Partition [n] into blocks where each block has size in set S.

Use exponential generating functions:
$$A(x) = \sum_{k \in S} \frac{x^k}{k!}$$

EGF for such partitions: e^{A(x)}

### Partitions into k Blocks of Specified Sizes

Count partitions of [n] into blocks of sizes a₁, a₂, ..., aₖ:
$$\frac{n!}{a_1! a_2! \cdots a_k!} \cdot \frac{1}{\text{# equal sizes}}$$

## Multinomial Problems

### Distributing Distinct Objects

**Problem:** Distribute n distinct objects into k distinct boxes with sizes a₁, ..., aₖ.

$$\binom{n}{a_1, a_2, \ldots, a_k} = \frac{n!}{a_1! a_2! \cdots a_k!}$$

### Arranging with Repetitions

**Problem:** Arrange letters of MISSISSIPPI.

Total: 11 letters with M(1), I(4), S(4), P(2)
$$\frac{11!}{1! \cdot 4! \cdot 4! \cdot 2!} = 34650$$

## Recurrence Techniques

### Divide and Conquer Counting

**Problem:** Count binary trees with n nodes.

$$T_n = \sum_{k=0}^{n-1} T_k T_{n-1-k}, \quad T_0 = 1$$

This gives Catalan numbers: T_n = C_n.

### Linear Recurrence Solution

**Problem:** Solve aₙ = 5aₙ₋₁ - 6aₙ₋₂ with a₀ = 1, a₁ = 4.

Characteristic equation: x² - 5x + 6 = 0 → x = 2, 3

General solution: aₙ = A·2ⁿ + B·3ⁿ

From initial conditions: A = -1, B = 2

Answer: aₙ = 2·3ⁿ - 2ⁿ

## Generating Function Problems

### Coin Change

**Problem:** Ways to make n cents using 1, 5, 10, 25 cent coins.

$$G(x) = \frac{1}{(1-x)(1-x^5)(1-x^{10})(1-x^{25})}$$

Extract [xⁿ]G(x) using partial fractions or recurrence.

### Integer Compositions

**Problem:** Ordered sums of positive integers equaling n.

$$C(x) = \frac{x}{1-2x}$$

[xⁿ]C(x) = 2^{n-1} for n ≥ 1.

## Inclusion-Exclusion Applications

### Counting Derangements

No fixed points in permutation:
$$D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!} \approx \frac{n!}{e}$$

### Problème des Rencontres

Count permutations with exactly k fixed points:
$$\binom{n}{k} D_{n-k} = \binom{n}{k} (n-k)! \sum_{j=0}^{n-k} \frac{(-1)^j}{j!}$$

## Competition-Style Problems

### Problem 1: Card Arrangements

**Problem:** In how many ways can a standard 52-card deck be arranged so no two adjacent cards have the same suit?

**Approach:** Use inclusion-exclusion on "bad" pairs or transfer-matrix method.

### Problem 2: Grid Tiling

**Problem:** In how many ways can a 3×n rectangle be tiled with 1×2 dominoes?

**Solution:** Let aₙ = number of tilings.

Recurrence: aₙ = 4aₙ₋₂ - aₙ₋₄

With a₀ = 1, a₂ = 3, a₄ = 11, a₆ = 41, ...

### Problem 3: Labeled Trees

**Problem:** Count labeled trees on n vertices where vertex 1 has degree exactly 2.

**Solution:** By Cayley's formula variant:
$$\binom{n-1}{2} (n-1)^{n-3} (n-2) = \frac{(n-1)(n-2)^2 (n-1)^{n-3}}{2}$$

## Problem-Solving Strategies

1. **Identify structure:** Is it partition, permutation, function, path?

2. **Consider generating functions:** OGF for selection, EGF for labeled structures.

3. **Look for recurrence:** Can you build from smaller cases?

4. **Apply symmetry:** Does Pólya/Burnside simplify counting?

5. **Use inclusion-exclusion:** Count by removing restrictions.

6. **Check small cases:** Verify formula against explicit enumeration.

## Practice Problems

1. Count ways to tile a 2×n rectangle with 1×2 dominoes.

2. Find number of permutations of [8] with no 3 consecutive ascending.

3. Count labeled graphs on n vertices with exactly n edges.

4. How many ways to arrange 5 married couples in a row with no spouses adjacent?

5. Count partitions of 12 into distinct parts, each part ≤ 5.

## Summary

Advanced counting combines:
- Lattice paths with reflection principle
- Permutation pattern analysis
- Generating functions (OGF and EGF)
- Recurrence relations
- Inclusion-exclusion
- Symmetry via Pólya/Burnside

Success requires recognizing which technique fits each problem structure.
