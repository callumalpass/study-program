---
id: math102-t1-proofs
title: "Combinatorial Proofs"
order: 7
---

# Combinatorial Proofs

Combinatorial proofs demonstrate mathematical identities by counting the same set in two different ways. This elegant technique provides intuitive understanding and often simpler arguments than algebraic manipulation.

## The Essence of Combinatorial Proofs

A combinatorial proof works by:
1. Finding a counting problem whose answer is one side of the identity
2. Counting the same thing a different way to get the other side
3. Since both count the same objects, they must be equal

This approach transforms abstract algebra into concrete counting.

## Basic Combinatorial Identities

### Pascal's Identity

**Identity:** $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$

**Combinatorial Proof:**
- Left side: Choose k people from n people
- Right side: Consider person n. Either:
  - Person n is chosen: Pick k-1 more from remaining n-1 → $\binom{n-1}{k-1}$
  - Person n is not chosen: Pick k from remaining n-1 → $\binom{n-1}{k}$

Both count the same selections, so they're equal.

### Symmetry Identity

**Identity:** $\binom{n}{k} = \binom{n}{n-k}$

**Combinatorial Proof:**
- Choosing k items to include is equivalent to choosing n-k items to exclude
- Every subset of size k corresponds to a unique subset of size n-k (its complement)

### Vandermonde's Identity

**Identity:** $\binom{m+n}{r} = \sum_{k=0}^{r} \binom{m}{k}\binom{n}{r-k}$

**Combinatorial Proof:**
- Left side: Choose r people from m men and n women combined
- Right side: Sum over all ways to choose k men and r-k women
- Every selection is counted exactly once on both sides

## The Committee Selection Framework

Many identities can be proven by counting committees:

### Sum of Binomial Coefficients

**Identity:** $\sum_{k=0}^{n} \binom{n}{k} = 2^n$

**Proof:**
- Right side: Each of n people can be in or out of a committee → 2^n subsets
- Left side: Count subsets by size k, then sum over all sizes

### Alternating Sum Identity

**Identity:** $\sum_{k=0}^{n} (-1)^k \binom{n}{k} = 0$ (for n > 0)

**Proof:**
- Pair each subset S with S △ {1} (toggle element 1)
- Subsets with element 1 (odd size contribution) pair with those without
- Contributions cancel out

## Hockey Stick Identity

**Identity:** $\sum_{i=r}^{n} \binom{i}{r} = \binom{n+1}{r+1}$

**Combinatorial Proof:**

Consider choosing r+1 elements from {1, 2, ..., n+1}.

- Right side: Direct count
- Left side: Partition by the largest element chosen
  - If largest is i+1, choose remaining r elements from {1, ..., i}
  - Sum over all possible largest elements (i+1 from r+1 to n+1)

The identity gets its name from the pattern in Pascal's triangle:
```
          1
         1 1
        1 2 1
       1 3 3 1     ← Add diagonal entries...
      1 4 6 4 1
     1 5 10 10 5 1  ← ...to get this entry
```

## Double Counting Technique

### Counting Pairs

Many proofs involve counting pairs (x, y) where x ∈ A and y ∈ B have some relationship.

**Example:** In a group where each person has exactly k friends, if there are n people, the total number of friendships is nk/2.

**Proof:**
- Count pairs (person, friend of person)
- By person: n × k pairs
- Each friendship (A, B) creates two pairs: (A, B) and (B, A)
- So friendships = nk/2

### Degree Sum Formula

**Identity:** For a graph G, $\sum_{v \in V} \deg(v) = 2|E|$

**Proof:** Each edge contributes 2 to the sum (once for each endpoint).

## Bijective Proofs

A bijection (one-to-one correspondence) between two sets proves they have equal size.

### Binary Strings and Subsets

**Identity:** Number of n-bit binary strings = Number of subsets of an n-element set = 2^n

**Bijection:** Map string b₁b₂...bₙ to subset {i : bᵢ = 1}

### Dyck Paths and Ballot Sequences

**Identity:** Number of valid parenthesizations with n pairs = Catalan number Cₙ

**Bijection:** Map '(' to "up step" and ')' to "down step" to create lattice paths that never go below the x-axis.

## Advanced Identities

### Chu-Vandermonde Identity

**Identity:** $\binom{m+n}{k} = \sum_{j=0}^{k} \binom{m}{j}\binom{n}{k-j}$

This is the general form of Vandermonde's identity.

### Binomial Coefficient Squares

**Identity:** $\sum_{k=0}^{n} \binom{n}{k}^2 = \binom{2n}{n}$

**Proof:**
- Right side: Choose n items from 2n items (n red, n blue)
- Left side: Choose k red items and n-k blue items, sum over k

## Constructing Combinatorial Proofs

**Strategy:**
1. Identify what each side might be counting
2. Find a common interpretation
3. Show both sides count the same objects exactly once

**Common contexts:**
- Selecting committees (with/without restrictions)
- Distributing objects into boxes
- Lattice paths
- Binary strings with constraints
- Graph structures

## Practice Examples

### Example 1: Prove $k\binom{n}{k} = n\binom{n-1}{k-1}$

**Proof:** Both sides count ways to:
- Choose a committee of size k from n people
- Then select a chair from the committee

- Left side: Choose k people, then pick 1 of k as chair
- Right side: Choose the chair first (n ways), then k-1 more members from remaining n-1

### Example 2: Prove $\binom{2n}{2} = 2\binom{n}{2} + n^2$

**Proof:** Count pairs from n red and n blue balls.
- Left: Any 2 from 2n balls
- Right: 2 red OR 2 blue OR 1 of each
  - $\binom{n}{2}$ ways for 2 red
  - $\binom{n}{2}$ ways for 2 blue
  - $n \times n = n^2$ ways for 1 of each

## Summary

Combinatorial proofs:
- Provide elegant, intuitive demonstrations of identities
- Count the same objects two different ways
- Often reveal deeper understanding than algebraic proofs
- Use techniques like double counting and bijections
- Are powerful tools for discovering new identities
