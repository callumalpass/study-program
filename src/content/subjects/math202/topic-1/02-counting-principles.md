# Counting Principles

## Introduction

Many probability problems require determining the number of ways an event can occur. Counting principles provide systematic methods for calculating the size of sample spaces and events without listing every outcome. These techniques are essential for computing probabilities in situations with large or complex sample spaces.

## The Multiplication Rule

The **multiplication rule** (or fundamental counting principle) states that if an operation consists of $k$ steps, and:
- Step 1 can be performed in $n_1$ ways
- Step 2 can be performed in $n_2$ ways
- ...
- Step $k$ can be performed in $n_k$ ways

Then the entire operation can be performed in $n_1 \times n_2 \times \cdots \times n_k$ ways.

### Example 1: Password Creation

How many 4-character passwords can be formed using:
- First character: uppercase letter (26 choices)
- Second character: lowercase letter (26 choices)
- Third character: digit (10 choices)
- Fourth character: special symbol from {!, @, #, $} (4 choices)

**Solution**:
$$26 \times 26 \times 10 \times 4 = 27,040 \text{ passwords}$$

### Example 2: License Plates

A license plate consists of 3 letters followed by 4 digits. How many different license plates are possible?

**Solution**:
$$26 \times 26 \times 26 \times 10 \times 10 \times 10 \times 10 = 26^3 \times 10^4 = 175,760,000$$

## Permutations

A **permutation** is an arrangement of objects in a specific order. The order matters in permutations.

### Permutations of n Distinct Objects

The number of ways to arrange $n$ distinct objects in a row is:
$$P(n) = n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1$$

**Example 3**: How many ways can 5 different books be arranged on a shelf?
$$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 \text{ ways}$$

### Permutations of r Objects from n

The number of ways to select and arrange $r$ objects from $n$ distinct objects (where order matters) is:
$$P(n, r) = \frac{n!}{(n-r)!}$$

This is also denoted $_nP_r$ or $P_r^n$.

**Derivation**:
- First position: $n$ choices
- Second position: $n-1$ choices
- ...
- $r$-th position: $n-r+1$ choices

Therefore: $P(n, r) = n \times (n-1) \times \cdots \times (n-r+1) = \frac{n!}{(n-r)!}$

### Example 4: Race Medals

In a race with 10 runners, how many ways can gold, silver, and bronze medals be awarded?

**Solution**:
$$P(10, 3) = \frac{10!}{7!} = 10 \times 9 \times 8 = 720 \text{ ways}$$

### Example 5: Seating Arrangement

How many ways can 4 people be selected from a group of 8 and seated in a row?

**Solution**:
$$P(8, 4) = \frac{8!}{4!} = 8 \times 7 \times 6 \times 5 = 1,680 \text{ ways}$$

## Combinations

A **combination** is a selection of objects where order does not matter.

### Combinations of r Objects from n

The number of ways to select $r$ objects from $n$ distinct objects (where order does not matter) is:
$$C(n, r) = \binom{n}{r} = \frac{n!}{r!(n-r)!}$$

This is read as "$n$ choose $r$" and also denoted $_nC_r$.

**Relationship to Permutations**: Since each combination of $r$ objects can be arranged in $r!$ ways:
$$P(n, r) = C(n, r) \times r!$$
$$C(n, r) = \frac{P(n, r)}{r!} = \frac{n!}{r!(n-r)!}$$

### Example 6: Committee Selection

How many ways can a committee of 3 people be selected from a group of 8?

**Solution**:
$$C(8, 3) = \binom{8}{3} = \frac{8!}{3!5!} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56 \text{ ways}$$

### Example 7: Poker Hands

How many 5-card poker hands can be dealt from a standard 52-card deck?

**Solution**:
$$C(52, 5) = \binom{52}{5} = \frac{52!}{5!47!} = 2,598,960 \text{ hands}$$

## Properties of Combinations

### Symmetry Property
$$\binom{n}{r} = \binom{n}{n-r}$$

Choosing $r$ objects to include is equivalent to choosing $n-r$ objects to exclude.

### Pascal's Identity
$$\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$$

This forms the basis of Pascal's triangle.

### Sum Property
$$\sum_{r=0}^{n} \binom{n}{r} = 2^n$$

The total number of subsets of an $n$-element set is $2^n$.

## Permutations with Repetition

When selecting $r$ objects from $n$ types where repetition is allowed, the number of permutations is:
$$n^r$$

### Example 8: PIN Codes

How many 4-digit PIN codes are possible (digits can repeat)?

**Solution**:
$$10^4 = 10,000 \text{ codes}$$

## Permutations of Non-Distinct Objects

The number of distinguishable permutations of $n$ objects where:
- $n_1$ are of type 1
- $n_2$ are of type 2
- ...
- $n_k$ are of type $k$

(where $n_1 + n_2 + \cdots + n_k = n$) is:
$$\frac{n!}{n_1! \, n_2! \, \cdots \, n_k!}$$

### Example 9: Word Arrangements

How many distinguishable arrangements are there of the letters in "MISSISSIPPI"?

**Solution**:
- Total letters: 11
- M: 1, I: 4, S: 4, P: 2

$$\frac{11!}{1! \, 4! \, 4! \, 2!} = \frac{39,916,800}{1 \times 24 \times 24 \times 2} = 34,650$$

## Combinations with Repetition

The number of ways to select $r$ objects from $n$ types where repetition is allowed is:
$$\binom{n+r-1}{r} = \binom{n+r-1}{n-1}$$

This is also called "multiset combinations" or "combinations with replacement."

### Example 10: Distributing Identical Objects

How many ways can 5 identical candies be distributed among 3 children?

**Solution**: This is equivalent to selecting 5 objects from 3 types with repetition:
$$\binom{3+5-1}{5} = \binom{7}{5} = \binom{7}{2} = 21 \text{ ways}$$

## Circular Permutations

The number of ways to arrange $n$ distinct objects in a circle is:
$$(n-1)!$$

We divide by $n$ because rotations of the same arrangement are considered identical.

### Example 11: Round Table Seating

How many ways can 6 people be seated around a circular table?

**Solution**:
$$(6-1)! = 5! = 120 \text{ ways}$$

## Worked Problem: Tournament Brackets

**Problem**: A single-elimination tournament has 16 teams. How many different ways can the tournament bracket be filled out (predicting the winner of each game)?

**Solution**:
- Round 1: 8 games, each with 2 possible outcomes: $2^8$
- Round 2: 4 games, each with 2 possible outcomes: $2^4$
- Round 3: 2 games, each with 2 possible outcomes: $2^2$
- Finals: 1 game with 2 possible outcomes: $2^1$

Total ways:
$$2^8 \times 2^4 \times 2^2 \times 2^1 = 2^{15} = 32,768$$

Alternatively, there are $16 - 1 = 15$ total games (each game eliminates one team), each with 2 outcomes: $2^{15}$.

## Worked Problem: Committee with Restrictions

**Problem**: From a group of 6 men and 8 women, how many ways can a committee of 5 be formed that includes:
(a) Exactly 3 women?
(b) At least 3 women?

**Solution**:

(a) Exactly 3 women means 3 women and 2 men:
$$\binom{8}{3} \times \binom{6}{2} = 56 \times 15 = 840 \text{ ways}$$

(b) At least 3 women means 3, 4, or 5 women:
$$\binom{8}{3}\binom{6}{2} + \binom{8}{4}\binom{6}{1} + \binom{8}{5}\binom{6}{0}$$
$$= 56 \times 15 + 70 \times 6 + 56 \times 1$$
$$= 840 + 420 + 56 = 1,316 \text{ ways}$$

## Summary Table

| Scenario | Formula | Order Matters? | Repetition? |
|----------|---------|----------------|-------------|
| Permutations of $n$ objects | $n!$ | Yes | N/A |
| Permutations: $r$ from $n$ | $\frac{n!}{(n-r)!}$ | Yes | No |
| Combinations: $r$ from $n$ | $\frac{n!}{r!(n-r)!}$ | No | No |
| Permutations with repetition | $n^r$ | Yes | Yes |
| Combinations with repetition | $\binom{n+r-1}{r}$ | No | Yes |

## Summary

Counting principles provide powerful tools for determining the size of sample spaces and events. The multiplication rule forms the foundation, while permutations and combinations handle selections with and without regard to order. Understanding when to use each technique is crucial for solving probability problems efficiently.
