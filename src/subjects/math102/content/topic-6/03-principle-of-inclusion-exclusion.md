---
id: math102-t6-incexc
title: "Inclusion-Exclusion Principle"
order: 3
---

# Principle of Inclusion-Exclusion

The Principle of Inclusion-Exclusion (PIE) provides a systematic way to count elements in unions of sets. It corrects for overcounting by alternating between addition and subtraction.

## Basic Principle

### Two Sets

For sets A and B:
$$|A \cup B| = |A| + |B| - |A \cap B|$$

We subtract the intersection because elements in both were counted twice.

### Three Sets

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

### General Formula

For sets A₁, A₂, ..., Aₙ:

$$\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{i} |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<k} |A_i \cap A_j \cap A_k| - \cdots + (-1)^{n+1}|A_1 \cap \cdots \cap A_n|$$

Or more compactly:
$$\left|\bigcup_{i=1}^{n} A_i\right| = \sum_{\emptyset \neq S \subseteq [n]} (-1)^{|S|+1} \left|\bigcap_{i \in S} A_i\right|$$

## Proof

**By membership counting:**

Consider an element x in exactly k of the sets (1 ≤ k ≤ n).

In the sum, x is counted:
- $\binom{k}{1}$ times in single sets
- $\binom{k}{2}$ times in pairwise intersections
- ...
- $\binom{k}{k}$ times in k-fold intersection

Net count: $\binom{k}{1} - \binom{k}{2} + \binom{k}{3} - \cdots = 1 - (1-1)^k = 1$

So each element is counted exactly once.

## Complementary Counting

Often easier to count elements NOT in any set:

$$\left|\overline{A_1} \cap \overline{A_2} \cap \cdots \cap \overline{A_n}\right| = |U| - \left|\bigcup_{i=1}^{n} A_i\right|$$

where U is the universal set.

## Classic Applications

### Counting Surjections

**Problem:** Count surjections (onto functions) from [m] to [n].

Let Aᵢ = functions missing element i from codomain.

|Aᵢ| = (n-1)^m (each domain element has n-1 choices)

|Aᵢ ∩ Aⱼ| = (n-2)^m (missing two elements)

By PIE, non-surjections = |∪Aᵢ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + ...

Surjections = n^m - |∪Aᵢ|

$$\text{onto}(m,n) = \sum_{k=0}^{n} (-1)^k \binom{n}{k} (n-k)^m$$

### Derangements

**Problem:** Count permutations with no fixed points (derangements).

Let Aᵢ = permutations fixing position i.

|Aᵢ| = (n-1)! (fix one element, permute rest)

|Aᵢ₁ ∩ ... ∩ Aᵢₖ| = (n-k)!

By PIE:
$$D_n = n! - \binom{n}{1}(n-1)! + \binom{n}{2}(n-2)! - \cdots + (-1)^n$$

$$D_n = n! \sum_{k=0}^{n} \frac{(-1)^k}{k!} \approx \frac{n!}{e}$$

### Euler's Totient Function

**Problem:** Count integers from 1 to n coprime to n.

Let n = p₁^{e₁} ... pₖ^{eₖ}.

Let Aᵢ = multiples of pᵢ in [1,n].

|Aᵢ| = n/pᵢ

|Aᵢ ∩ Aⱼ| = n/(pᵢpⱼ)

By PIE:
$$\phi(n) = n - \sum_i \frac{n}{p_i} + \sum_{i<j} \frac{n}{p_i p_j} - \cdots$$

$$= n \prod_{i=1}^{k} \left(1 - \frac{1}{p_i}\right)$$

## Counting with Restrictions

### Example: Letters with Conditions

**Problem:** How many 5-letter strings from {A,B,C,D,E} contain at least one A and at least one B?

Total = 5^5 = 3125

A₁ = strings without A: 4^5 = 1024
A₂ = strings without B: 4^5 = 1024
A₁ ∩ A₂ = strings without A or B: 3^5 = 243

By PIE: Strings missing A or B = 1024 + 1024 - 243 = 1805

Answer: 3125 - 1805 = **1320**

### Example: Restricted Digits

**Problem:** Count 4-digit numbers (1000-9999) with no repeated digits.

First digit: 9 choices (1-9)
Remaining digits: 9 × 8 × 7 choices

Answer: 9 × 9 × 8 × 7 = **4536**

Alternative via PIE is messier but possible.

## Sieve Methods

### Eratosthenes-Legendre Sieve

Count primes up to n using PIE:
- Start with n numbers
- Remove multiples of 2, 3, 5, ...
- Use PIE to correct for overcounting

### Brun's Sieve

For twin primes, apply more sophisticated sieving with PIE.

## Möbius Inversion

### Möbius Function

$$\mu(n) = \begin{cases} 1 & n = 1 \\ (-1)^k & n = p_1 p_2 \cdots p_k \text{ (squarefree)} \\ 0 & \text{otherwise} \end{cases}$$

### Inversion Formula

If $g(n) = \sum_{d|n} f(d)$, then:

$$f(n) = \sum_{d|n} \mu(d) g(n/d)$$

This is the multiplicative analog of PIE.

### Example: Counting Primitive Roots

Count integers with multiplicative order exactly n modulo p:

$$\phi(n) = \sum_{d|n} \mu(n/d) \cdot (\text{elements with order dividing } d)$$

## Weighted PIE

### Bonferroni Inequalities

Truncating PIE gives bounds:

$$\left|\bigcup A_i\right| \leq \sum |A_i|$$

$$\left|\bigcup A_i\right| \geq \sum |A_i| - \sum |A_i \cap A_j|$$

Alternating bounds continue.

### Probability Version

$$P\left(\bigcup A_i\right) = \sum P(A_i) - \sum P(A_i \cap A_j) + \cdots$$

Used in union bounds and correlation inequalities.

## Problem-Solving Strategy

1. **Identify "bad" properties** A₁, ..., Aₙ
2. **Count objects with at least one bad property** using PIE
3. **Subtract from total** to get "good" objects
4. **Compute intersection sizes** - often symmetric

Key insight: Intersections of k sets often depend only on k, not which sets.

## Practice Problems

1. **Count:** Integers from 1 to 1000 divisible by 2, 3, or 5.

2. **Count:** Permutations of MISSISSIPPI with no two I's adjacent.

3. **Prove:** Number of permutations with at least one fixed point approaches (1 - 1/e)n! as n → ∞.

4. **Count:** Ways to place 8 non-attacking rooks on a chessboard with certain squares forbidden.

## Summary

Inclusion-Exclusion:
- Counts unions by alternating addition/subtraction
- Corrects for overcounting in intersections
- Applies to surjections, derangements, coprimality
- Extends to Möbius inversion for divisibility
- Provides bounds via Bonferroni inequalities
