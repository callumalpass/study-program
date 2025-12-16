# Partition Theory

Partition theory studies ways to write integers as sums. This elegant branch of combinatorics connects to number theory, algebra, and physics.

## Definitions

### Integer Partitions

A **partition** of n is a way to write n as a sum of positive integers, where order doesn't matter.

**Example:** Partitions of 5:
- 5
- 4 + 1
- 3 + 2
- 3 + 1 + 1
- 2 + 2 + 1
- 2 + 1 + 1 + 1
- 1 + 1 + 1 + 1 + 1

So p(5) = 7.

### Notation

- **p(n):** number of partitions of n
- **Parts:** summands in a partition
- **Largest part:** maximum summand
- **Number of parts:** count of summands

## Partition Diagrams

### Ferrers Diagrams

Represent partition visually with dots:

For 4 + 2 + 1:
```
● ● ● ●
● ●
●
```

### Young Diagrams

Use boxes instead of dots (equivalent representation).

### Conjugate Partition

Reflect diagram across diagonal.

Conjugate of 4 + 2 + 1 is 3 + 2 + 1 + 1:
```
● ● ● ●    → ● ● ●
● ●           ● ●
●             ●
              ●
```

## Generating Function

The generating function for partitions:

$$\sum_{n=0}^{\infty} p(n) x^n = \prod_{k=1}^{\infty} \frac{1}{1-x^k}$$

**Why:** Factor 1/(1-xᵏ) = 1 + xᵏ + x²ᵏ + ... represents choosing 0, 1, 2, ... parts of size k.

Product over all k allows any partition.

## Restricted Partitions

### Distinct Parts

Each part appears at most once.

$$\sum_{n=0}^{\infty} p_d(n) x^n = \prod_{k=1}^{\infty} (1+x^k)$$

**Example:** Partitions of 6 into distinct parts:
- 6
- 5 + 1
- 4 + 2
- 3 + 2 + 1

So p_d(6) = 4.

### Odd Parts

All parts are odd.

$$\sum_{n=0}^{\infty} p_o(n) x^n = \prod_{k=0}^{\infty} \frac{1}{1-x^{2k+1}}$$

### Euler's Theorem

**Theorem:** The number of partitions of n into distinct parts equals the number into odd parts.

**Proof:** Show generating functions are equal:
$$\prod_{k=1}^{\infty} (1+x^k) = \prod_{k=1}^{\infty} \frac{1-x^{2k}}{1-x^k} = \prod_{k=0}^{\infty} \frac{1}{1-x^{2k+1}}$$

### At Most k Parts

Partitions with ≤ k parts.

**Key:** Equivalent to partitions with largest part ≤ k (by conjugation).

## Identities

### Pentagonal Number Theorem

$$\prod_{k=1}^{\infty} (1-x^k) = \sum_{n=-\infty}^{\infty} (-1)^n x^{n(3n-1)/2}$$

The exponents are generalized pentagonal numbers.

**Application:** Recurrence for p(n):
$$p(n) = p(n-1) + p(n-2) - p(n-5) - p(n-7) + p(n-12) + \cdots$$

### Rogers-Ramanujan Identities

$$\sum_{n=0}^{\infty} \frac{x^{n^2}}{(1-x)(1-x^2)\cdots(1-x^n)} = \prod_{n=0}^{\infty} \frac{1}{(1-x^{5n+1})(1-x^{5n+4})}$$

Connects partitions with gap conditions to parts ≡ ±1 (mod 5).

## Bijective Proofs

### Distinct vs Odd Parts

**Bijection:** Convert partition with distinct parts to one with odd parts.

Write each distinct part uniquely as 2ᵃ × (odd part).
Combine: k copies of odd part o come from parts 2⁰o, 2¹o, ..., where binary representation of k uses those powers.

**Example:** 6 + 5 + 3 + 2 = (2×3) + 5 + 3 + (2×1)
→ 3 appears twice (from 6=2×3 and 3)
→ 5 appears once
→ 1 appears twice (from 2=2×1)
Result: 5 + 3 + 3 + 1 + 1

### Conjugation Bijection

Conjugation proves: partitions with ≤ k parts ↔ partitions with largest part ≤ k.

## Asymptotic Formula

### Hardy-Ramanujan Formula

$$p(n) \sim \frac{1}{4n\sqrt{3}} e^{\pi\sqrt{2n/3}}$$

More precisely:
$$p(n) = \frac{1}{2\pi\sqrt{2}} \sum_{k=1}^{\infty} A_k(n) \sqrt{k} \cdot \frac{d}{dn}\left(\frac{e^{\frac{\pi}{k}\sqrt{2(n-1/24)/3}}}{\sqrt{n-1/24}}\right)$$

### Growth Rate

p(n) grows like exp(c√n), slower than factorial but faster than polynomial.

**Values:**
- p(10) = 42
- p(50) = 204,226
- p(100) = 190,569,292

## Partitions and Representations

### Schur Functions

Symmetric functions indexed by partitions, fundamental in representation theory.

### Young Tableaux

Fillings of Young diagrams with numbers, satisfying:
- **Standard:** 1 to n, increasing along rows and columns
- **Semistandard:** Increasing along rows, non-decreasing along columns

Count standard tableaux: **Hook length formula**
$$f^\lambda = \frac{n!}{\prod_{(i,j) \in \lambda} h(i,j)}$$

## Applications

### Physics

- Quantum mechanics: partition functions
- Statistical mechanics: Bose-Einstein statistics
- String theory: modular forms

### Computer Science

- Data structures: Young tableau insertion
- Algorithm analysis: distributional complexity

### Number Theory

- Ramanujan's congruences: p(5n+4) ≡ 0 (mod 5)
- Modular forms and partitions

## Practice Problems

1. **Prove:** Number of partitions of n into parts ≤ k equals partitions of n + k into exactly k parts.

2. **Find:** Generating function for partitions into parts ≡ 1 or 2 (mod 3).

3. **Compute:** p(8) by listing all partitions.

4. **Prove:** Every partition is conjugate to exactly one partition.

5. **Show:** Sum of all parts over all partitions of n equals sum of (largest part) × (number of such partitions).

## Summary

Partition theory studies:
- Ways to write integers as sums
- Generating functions encode restrictions
- Ferrers/Young diagrams visualize partitions
- Euler's theorem: distinct parts ↔ odd parts
- Bijective proofs give combinatorial insight
- Connections to algebra, physics, number theory
