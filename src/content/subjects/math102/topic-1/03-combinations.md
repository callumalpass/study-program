# Combinations

A combination is a selection of objects where order does not matter. While permutations count arrangements, combinations count groups or subsets.

## Basic Combinations

The number of ways to choose k objects from n distinct objects (order doesn't matter) is:

```
C(n,k) = (n choose k) = n! / (k!(n-k)!)
```

Also written as ₙCₖ or "n choose k."

### Derivation from Permutations

P(n,k) counts ordered selections: pick k from n AND arrange them.
C(n,k) counts unordered selections: just pick k from n.

Since k objects can be arranged in k! ways:

```
P(n,k) = C(n,k) × k!
C(n,k) = P(n,k) / k! = n! / (k!(n-k)!)
```

### Example: Committee Selection

Choose a 3-person committee from 10 candidates.

C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120 committees

Order doesn't matter: {Alice, Bob, Carol} is the same committee as {Carol, Alice, Bob}.

## Properties of Binomial Coefficients

### Symmetry

```
C(n,k) = C(n, n-k)
```

Choosing k items to include is equivalent to choosing n-k items to exclude.

Example: C(10,3) = C(10,7) = 120

### Pascal's Identity

```
C(n,k) = C(n-1,k-1) + C(n-1,k)
```

**Interpretation**: Consider a specific element. Either:
- Include it: choose remaining k-1 from n-1 others → C(n-1,k-1)
- Exclude it: choose all k from n-1 others → C(n-1,k)

### Sum of Row

```
C(n,0) + C(n,1) + ... + C(n,n) = 2ⁿ
```

The total number of subsets of an n-element set is 2ⁿ.

### Hockey Stick Identity

```
C(r,r) + C(r+1,r) + ... + C(n,r) = C(n+1,r+1)
```

Useful for summing diagonals in Pascal's triangle.

## Pascal's Triangle

```
          1
         1 1
        1 2 1
       1 3 3 1
      1 4 6 4 1
     1 5 10 10 5 1
```

Row n contains C(n,0), C(n,1), ..., C(n,n).

Each entry is the sum of the two entries above it (Pascal's identity).

## Combinations with Repetition

When choosing k items from n types where repetition is allowed (multisets):

```
C(n+k-1, k) = C(n+k-1, n-1)
```

Also called "stars and bars" or "multichoose."

### Example: Distributing Donuts

Choose 5 donuts from 3 flavors (chocolate, vanilla, strawberry).

This is choosing with repetition: C(3+5-1, 5) = C(7,5) = 21 ways.

### Stars and Bars Visualization

Represent k items as stars (*) and use n-1 bars (|) to separate types.

5 donuts from 3 flavors: **|*|** means 2 chocolate, 1 vanilla, 2 strawberry.

Total arrangements of 5 stars and 2 bars: C(7,2) = C(7,5) = 21.

## Restricted Combinations

### At Least / At Most Constraints

**Example**: From 10 men and 8 women, form a committee of 5 with at least 2 women.

Cases:
- 2 women, 3 men: C(8,2) × C(10,3) = 28 × 120 = 3,360
- 3 women, 2 men: C(8,3) × C(10,2) = 56 × 45 = 2,520
- 4 women, 1 man: C(8,4) × C(10,1) = 70 × 10 = 700
- 5 women, 0 men: C(8,5) × C(10,0) = 56 × 1 = 56

Total: 3,360 + 2,520 + 700 + 56 = 6,636

### Specific Element Inclusion/Exclusion

**Must include Alice**:
- Fix Alice in the group
- Choose remaining k-1 from n-1 others
- Answer: C(n-1, k-1)

**Must exclude Bob**:
- Choose all k from n-1 remaining
- Answer: C(n-1, k)

## The Binomial Theorem

The binomial coefficients appear in polynomial expansion:

```
(x + y)ⁿ = Σ C(n,k) × x^(n-k) × y^k  for k = 0 to n
```

### Example: (x + y)⁴

= C(4,0)x⁴ + C(4,1)x³y + C(4,2)x²y² + C(4,3)xy³ + C(4,4)y⁴
= x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴

### Applications

**Counting**: Set x = y = 1:
(1+1)ⁿ = C(n,0) + C(n,1) + ... + C(n,n) = 2ⁿ

**Alternating sum**: Set x = 1, y = -1:
(1-1)ⁿ = 0 = C(n,0) - C(n,1) + C(n,2) - ...

So: C(n,0) + C(n,2) + C(n,4) + ... = C(n,1) + C(n,3) + ...

Even subsets equal odd subsets: each = 2^(n-1).

## Multinomial Coefficients

Generalization to dividing n objects into groups of sizes k₁, k₂, ..., kᵣ:

```
(n; k₁,k₂,...,kᵣ) = n! / (k₁! × k₂! × ... × kᵣ!)
```

where k₁ + k₂ + ... + kᵣ = n.

### Example: Team Division

Divide 12 players into teams of 5, 4, and 3.

12!/(5!×4!×3!) = 479,001,600/(120×24×6) = 27,720 ways

### Multinomial Theorem

```
(x₁ + x₂ + ... + xᵣ)ⁿ = Σ (n; k₁,...,kᵣ) × x₁^k₁ × ... × xᵣ^kᵣ
```

Sum is over all non-negative integer solutions to k₁ + ... + kᵣ = n.

## Computational Tips

**Avoid overflow**: Compute C(n,k) iteratively:

```
C(n,k) = (n/1) × ((n-1)/2) × ... × ((n-k+1)/k)
```

**Use symmetry**: C(100,98) = C(100,2) = 4,950 (much easier).

**Cancellation**: C(20,3) = (20×19×18)/(3×2×1). Cancel before multiplying.
