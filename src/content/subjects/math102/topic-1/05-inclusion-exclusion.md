# Inclusion-Exclusion Principle

When counting elements in overlapping sets, we must carefully avoid double-counting. The inclusion-exclusion principle provides a systematic way to handle set unions with arbitrary overlaps.

## Two Sets

For two sets A and B:

```
|A ∪ B| = |A| + |B| - |A ∩ B|
```

We add A and B, but their intersection was counted twice, so we subtract it once.

### Example: Language Classes

In a class of 30 students:
- 18 study French
- 15 study Spanish
- 8 study both

How many study at least one language?

|F ∪ S| = 18 + 15 - 8 = 25 students

How many study neither? 30 - 25 = 5 students

## Three Sets

For three sets A, B, and C:

```
|A ∪ B ∪ C| = |A| + |B| + |C|
            - |A ∩ B| - |A ∩ C| - |B ∩ C|
            + |A ∩ B ∩ C|
```

**Pattern**: Add singles, subtract pairs, add triple.

### Venn Diagram Intuition

```
    A         B
   /‾‾\     /‾‾\
  | 1  |2| 3  |
   \    \|/   /
    \   |4|  /
     \  /|\
      \/ | \/
   5  |  6  | 7
      |  C  |
       \___/
```

Region 4 (intersection of all three) gets:
- Added 3 times (in A, B, C)
- Subtracted 3 times (in A∩B, A∩C, B∩C)
- Added 1 time (in A∩B∩C)
- Net: counted exactly once ✓

### Example: Divisibility

How many integers from 1 to 100 are divisible by 2, 3, or 5?

Let A = multiples of 2, B = multiples of 3, C = multiples of 5.

- |A| = ⌊100/2⌋ = 50
- |B| = ⌊100/3⌋ = 33
- |C| = ⌊100/5⌋ = 20
- |A ∩ B| = ⌊100/6⌋ = 16 (multiples of 6)
- |A ∩ C| = ⌊100/10⌋ = 10 (multiples of 10)
- |B ∩ C| = ⌊100/15⌋ = 6 (multiples of 15)
- |A ∩ B ∩ C| = ⌊100/30⌋ = 3 (multiples of 30)

|A ∪ B ∪ C| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74

## General Formula

For n sets A₁, A₂, ..., Aₙ:

```
|A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| - ... + (-1)ⁿ⁺¹|A₁ ∩ ... ∩ Aₙ|
```

**Pattern**: Alternate between adding and subtracting intersections of increasing size.

- Add all singletons
- Subtract all pairs
- Add all triples
- Subtract all quadruples
- ...and so on

### Number of Terms

For n sets, the formula has 2ⁿ - 1 terms:
- C(n,1) singletons
- C(n,2) pairs
- C(n,3) triples
- ...

## Counting Complement: At Least One Property

Often easier to count "none" and subtract from total.

**Count elements with at least one of properties P₁, ..., Pₙ**:

Let Aᵢ = elements with property Pᵢ.

|at least one| = |A₁ ∪ ... ∪ Aₙ| (use inclusion-exclusion)

|none| = |U| - |A₁ ∪ ... ∪ Aₙ| where U is the universal set.

## Derangements via Inclusion-Exclusion

A derangement is a permutation with no fixed points. Let's derive D(n).

Let Aᵢ = permutations where element i is in position i (fixed point).

**Want**: Permutations NOT in any Aᵢ = n! - |A₁ ∪ ... ∪ Aₙ|

**Calculate intersections**:
- |Aᵢ| = (n-1)! (fix one element, permute rest)
- |Aᵢ ∩ Aⱼ| = (n-2)! (fix two elements)
- |Aᵢ ∩ Aⱼ ∩ Aₖ| = (n-3)!
- In general: |intersection of k sets| = (n-k)!

**Apply inclusion-exclusion**:
```
|A₁ ∪ ... ∪ Aₙ| = C(n,1)(n-1)! - C(n,2)(n-2)! + C(n,3)(n-3)! - ...
                = n!/1! - n!/2! + n!/3! - ... + (-1)ⁿ⁺¹n!/n!
```

**Derangements**:
```
D(n) = n! - (n!/1! - n!/2! + n!/3! - ...)
     = n!(1 - 1/1! + 1/2! - 1/3! + ... + (-1)ⁿ/n!)
```

## Euler's Totient Function

φ(n) counts integers from 1 to n that are relatively prime to n.

For n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ:

```
φ(n) = n × (1 - 1/p₁) × (1 - 1/p₂) × ... × (1 - 1/pₖ)
```

### Derivation via Inclusion-Exclusion

Let Aᵢ = multiples of prime pᵢ in {1, ..., n}.

Non-coprime integers = |A₁ ∪ ... ∪ Aₖ|

Using inclusion-exclusion and the fact that |Aᵢ| = n/pᵢ:

```
φ(n) = n - |A₁ ∪ ... ∪ Aₖ|
     = n(1 - Σ1/pᵢ + Σ1/(pᵢpⱼ) - ...)
     = n∏(1 - 1/pᵢ)
```

### Example: φ(30)

30 = 2 × 3 × 5

φ(30) = 30 × (1/2) × (2/3) × (4/5) = 30 × 8/30 = 8

The integers coprime to 30: {1, 7, 11, 13, 17, 19, 23, 29}

## Surjective Functions

How many surjective (onto) functions exist from an m-element set to an n-element set?

Let Aᵢ = functions that miss element i in the codomain.

**Total functions**: nᵐ

**Surjective functions**: nᵐ - |A₁ ∪ ... ∪ Aₙ|

**Calculate**:
- |Aᵢ| = (n-1)ᵐ (map to any of n-1 elements)
- |Aᵢ ∩ Aⱼ| = (n-2)ᵐ
- etc.

```
Surjections = Σₖ₌₀ⁿ (-1)ᵏ C(n,k)(n-k)ᵐ
```

This formula is also written using Stirling numbers of the second kind:
Surjections = n! × S(m,n)

## Problem-Solving Tips

1. **Define sets carefully**: Each set should represent "having" a property
2. **Check intersections**: Ensure you understand what each intersection represents
3. **Use complement when easier**: "At least one" often easier as "total minus none"
4. **Look for symmetry**: If |Aᵢ| all equal and |Aᵢ ∩ Aⱼ| all equal, formulas simplify greatly
