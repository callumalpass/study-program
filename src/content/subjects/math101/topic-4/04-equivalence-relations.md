# Equivalence Relations

## Definition

An **equivalence relation** on a set A is a relation that is:
- **Reflexive**: aRa for all a ∈ A
- **Symmetric**: aRb implies bRa
- **Transitive**: aRb and bRc implies aRc

Equivalence relations capture the notion of "sameness" or "equality in some respect."

Common notation: a ~ b (instead of aRb) for equivalence relations.

## Examples

### Example 1: Equality

The relation = on any set is the simplest equivalence relation.
- Reflexive: a = a ✓
- Symmetric: a = b implies b = a ✓
- Transitive: a = b and b = c implies a = c ✓

### Example 2: Congruence Modulo n

For integers a and b, define a ≡ b (mod n) if n divides (a - b).

For n = 3:
- 7 ≡ 1 (mod 3) because 3 | (7 - 1) = 6
- 10 ≡ 4 (mod 3) because 3 | (10 - 4) = 6
- 5 ≢ 9 (mod 3) because 3 ∤ (5 - 9) = -4

**Verification:**
- Reflexive: a - a = 0, and n | 0 ✓
- Symmetric: n | (a - b) implies n | (b - a) ✓
- Transitive: If n | (a - b) and n | (b - c), then n | (a - c) ✓

### Example 3: Same Remainder

On ℤ, define aRb if a mod 5 = b mod 5 (same remainder when divided by 5).

Classes: {...,-5,0,5,10,...}, {...,-4,1,6,11,...}, {...,-3,2,7,12,...}, {...,-2,3,8,13,...}, {...,-1,4,9,14,...}

### Example 4: Same Absolute Value

On ℝ, define aRb if |a| = |b|.

- 3 ~ -3 (both have absolute value 3)
- 0 ~ 0

This is an equivalence relation.

### Example 5: Parallel Lines

On the set of lines in a plane, define L₁ ~ L₂ if L₁ is parallel to L₂ (including L₁ = L₂).

This is an equivalence relation.

## Equivalence Classes

Given an equivalence relation ~ on A, the **equivalence class** of element a is:

$$[a] = \{x \in A : x \sim a\}$$

All elements equivalent to a.

### Example

For ≡ (mod 3) on ℤ:
- [0] = {..., -6, -3, 0, 3, 6, 9, ...}
- [1] = {..., -5, -2, 1, 4, 7, 10, ...}
- [2] = {..., -4, -1, 2, 5, 8, 11, ...}

Note: [0] = [3] = [6] = [-3] = ... (same class)

### Properties of Equivalence Classes

1. **Every element is in some class:** a ∈ [a] (by reflexivity)

2. **Classes are either identical or disjoint:**
   - If [a] ∩ [b] ≠ ∅, then [a] = [b]
   - Two distinct elements either share a class or have non-overlapping classes

3. **Elements in the same class are equivalent:**
   - x ∈ [a] if and only if x ~ a

## Partitions

A **partition** of set A is a collection of non-empty subsets {A₁, A₂, ...} such that:
1. Every element of A is in exactly one Aᵢ
2. The Aᵢ are pairwise disjoint: Aᵢ ∩ Aⱼ = ∅ for i ≠ j
3. Together they cover A: ∪Aᵢ = A

### Fundamental Theorem

**Theorem:** There is a one-to-one correspondence between:
- Equivalence relations on A
- Partitions of A

**Equivalence → Partition:** The equivalence classes form a partition.

**Partition → Equivalence:** Define a ~ b if a and b are in the same partition block.

### Example

Partition of {1, 2, 3, 4, 5} into {{1, 3}, {2, 4}, {5}}

Corresponding equivalence relation:
R = {(1,1), (1,3), (3,1), (3,3), (2,2), (2,4), (4,2), (4,4), (5,5)}

## Quotient Set

The **quotient set** A/~ is the set of all equivalence classes:

$$A/\sim \;= \{[a] : a \in A\}$$

### Example

ℤ/≡₃ (integers mod 3) = {[0], [1], [2]}

Only three distinct classes, though infinitely many integers.

### Cardinality

If A is finite with equivalence relation ~:
- |A/~| = number of equivalence classes
- |A| = Σ |[a]| over representatives

## Congruence Modulo n in Detail

For any positive integer n, congruence modulo n (≡ₙ) on ℤ:
- Creates exactly n equivalence classes: [0], [1], ..., [n-1]
- [k] = {k + mn : m ∈ ℤ}
- ℤ/≡ₙ = {[0], [1], ..., [n-1]}

This is fundamental to modular arithmetic and cryptography.

## Finding Equivalence Classes

### Method 1: Start with an Element

1. Pick an element a
2. Find all elements equivalent to a
3. That's [a]
4. Pick an uncategorized element, repeat

### Method 2: Transitivity Chains

1. Build the transitive closure of the "immediately related" pairs
2. Group elements that end up related

### Example

A = {1, 2, 3, 4, 5}, R defined by: (1,2), (2,1), (3,4), (4,3), (5,5), plus reflexive pairs

Classes:
- [1] = [2] = {1, 2}
- [3] = [4] = {3, 4}
- [5] = {5}

Partition: {{1, 2}, {3, 4}, {5}}

## Applications

### 1. Modular Arithmetic
Integers partitioned by remainder when divided by n.

### 2. Rational Numbers
ℚ is constructed as equivalence classes of pairs (a, b) where (a, b) ~ (c, d) if ad = bc.
- 1/2 ~ 2/4 ~ 3/6 ~ ...

### 3. String Equivalence
In formal languages, strings equivalent under certain rules.

### 4. Graph Isomorphism
Graphs equivalent if one can be relabeled to match the other.

## Summary

**Equivalence relation:** Reflexive + Symmetric + Transitive

**Equivalence class [a]:** All elements equivalent to a

**Key properties:**
- Classes partition the set
- a ~ b if and only if [a] = [b]
- |A/~| counts distinct classes

**Fundamental theorem:** Equivalence relations ↔ Partitions

Equivalence relations formalize "sameness in some aspect" and are essential for constructing mathematical objects like ℚ from ℤ.
