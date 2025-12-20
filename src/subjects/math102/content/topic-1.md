## Introduction

Combinatorics is the branch of mathematics concerned with counting, arrangement, and selection of objects. It provides essential techniques for analyzing discrete structures and solving counting problems that arise throughout computer science. From analyzing algorithm complexity to calculating probabilities, combinatorial methods are indispensable tools for any computer scientist.

**Learning Objectives:**
- Apply the fundamental counting principle to multi-stage processes
- Calculate permutations and combinations correctly
- Distinguish when to use permutations vs. combinations
- Apply the inclusion-exclusion principle
- Use the pigeonhole principle in proofs
- Solve counting problems with repetition

---

## Core Concepts

### The Fundamental Counting Principle

The foundation of all combinatorics is the multiplication principle:

> If one event can occur in m ways and another independent event can occur in n ways, then both events can occur in m × n ways.

```python
# Example: Creating a password
# 3 uppercase letters followed by 4 digits
uppercase_choices = 26  # A-Z
digit_choices = 10      # 0-9

total_passwords = (26 ** 3) * (10 ** 4)  # 175,760,000 possibilities
```

This principle extends to any number of stages:
- If you have k stages with n₁, n₂, ..., nₖ choices respectively
- Total outcomes = n₁ × n₂ × ... × nₖ

### Permutations

A **permutation** is an ordered arrangement of objects. The order matters!

**Permutations of n distinct objects:**
$$P(n) = n! = n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1$$

```python
def factorial(n):
    if n <= 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Ways to arrange 5 books on a shelf
print(factorial(5))  # 120
```

**Permutations of n objects taken r at a time:**
$$P(n, r) = \frac{n!}{(n-r)!} = n \times (n-1) \times \cdots \times (n-r+1)$$

```python
def permutations(n, r):
    """P(n,r) = n!/(n-r)!"""
    if r > n or r < 0:
        return 0
    result = 1
    for i in range(n, n - r, -1):
        result *= i
    return result

# Ways to award gold, silver, bronze to 10 athletes
print(permutations(10, 3))  # 720
```

### Combinations

A **combination** is an unordered selection of objects. The order does NOT matter!

$$C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}$$

```python
def combinations(n, k):
    """C(n,k) = n! / (k! * (n-k)!)"""
    if k > n or k < 0:
        return 0
    if k == 0 or k == n:
        return 1
    k = min(k, n - k)  # Optimization: C(n,k) = C(n,n-k)
    result = 1
    for i in range(k):
        result = result * (n - i) // (i + 1)
    return result

# Ways to choose 3 students from 10 for a committee
print(combinations(10, 3))  # 120
```

**When to use which:**
- **Permutations**: "In how many ways can we arrange..." (order matters)
- **Combinations**: "In how many ways can we select/choose..." (order doesn't matter)

### Permutations with Repetition (Multisets)

When objects are not all distinct, we divide by the factorial of each repeated element:

$$\frac{n!}{n_1! \times n_2! \times \cdots \times n_k!}$$

```python
from collections import Counter
from math import factorial

def multiset_permutations(s):
    """Count distinct permutations of string with repeated chars"""
    counts = Counter(s)
    n = len(s)
    result = factorial(n)
    for count in counts.values():
        result //= factorial(count)
    return result

# Arrangements of "MISSISSIPPI"
print(multiset_permutations("MISSISSIPPI"))  # 34650
# 11! / (4! × 4! × 2!) = 34650 (4 I's, 4 S's, 2 P's)
```

### Combinations with Repetition (Stars and Bars)

The number of ways to select r items from n types **with repetition allowed**:

$$\binom{n + r - 1}{r} = \binom{n + r - 1}{n - 1}$$

This is the "stars and bars" method: distributing r identical items into n distinct bins.

```python
def combinations_with_repetition(n, r):
    """Ways to choose r items from n types with repetition"""
    return combinations(n + r - 1, r)

# Ways to buy 5 donuts from 3 flavors
print(combinations_with_repetition(3, 5))  # 21
```

### The Inclusion-Exclusion Principle

For counting elements in overlapping sets:

$$|A \cup B| = |A| + |B| - |A \cap B|$$

For three sets:
$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

```python
from itertools import combinations as combo
from math import gcd
from functools import reduce

def lcm(a, b):
    return abs(a * b) // gcd(a, b)

def count_divisible(n, divisors):
    """Count integers 1 to n divisible by any of the divisors"""
    total = 0
    for r in range(1, len(divisors) + 1):
        for subset in combo(divisors, r):
            l = reduce(lcm, subset)
            count = n // l
            # Add for odd subsets, subtract for even
            if r % 2 == 1:
                total += count
            else:
                total -= count
    return total

# Integers 1-100 divisible by 2, 3, or 5
print(count_divisible(100, [2, 3, 5]))  # 74
```

### The Pigeonhole Principle

> If n items are placed into m containers where n > m, then at least one container must contain more than one item.

**Generalized form:** If n items are placed into m containers, at least one container has ⌈n/m⌉ items.

```python
import math

def min_items_in_fullest_container(n_items, m_containers):
    """Minimum items in the container with most items"""
    return math.ceil(n_items / m_containers)

# 13 people, 12 months: at least 2 share a birth month
print(min_items_in_fullest_container(13, 12))  # 2
```

**Applications:**
- In any group of 367 people, at least 2 share a birthday
- In any sequence of n+1 integers from 1 to 2n, two are consecutive
- A function from a larger set to a smaller set cannot be injective

---

## Common Patterns and Applications

### Counting Subsets

A set with n elements has 2ⁿ subsets (including the empty set):

```python
def count_subsets(n):
    return 2 ** n

# A set with 5 elements has 32 subsets
print(count_subsets(5))  # 32
```

### Counting Binary Strings

Binary strings of length n: 2ⁿ total strings

```python
# Binary strings of length 5 with exactly 3 ones
print(combinations(5, 3))  # 10 (choose positions for the 1s)
```

### Counting Paths in a Grid

Paths from (0,0) to (m,n) moving only right or down:

```python
def grid_paths(m, n):
    """Paths in m×n grid from top-left to bottom-right"""
    return combinations(m + n, n)

# Paths in 4×3 grid
print(grid_paths(4, 3))  # 35
```

---

## Common Mistakes and Debugging

### Mistake 1: Confusing Permutations and Combinations

```python
# Wrong: Using combinations when order matters
# "How many ways to arrange 3 books from 10?"
wrong = combinations(10, 3)  # 120 - this is selecting, not arranging

# Correct: Use permutations
correct = permutations(10, 3)  # 720
```

### Mistake 2: Forgetting to Account for Repetition

```python
# Wrong: Treating repeated items as distinct
# "Arrangements of AABB"
wrong = factorial(4)  # 24 - treats all 4 as distinct

# Correct: Divide by repeated elements
correct = factorial(4) // (factorial(2) * factorial(2))  # 6
```

### Mistake 3: Overcounting in Inclusion-Exclusion

Always carefully identify what constitutes each set and their intersections. Draw Venn diagrams when needed.

### Mistake 4: Misapplying the Pigeonhole Principle

The principle gives existence, not construction. It tells you something exists but not how to find it.

---

## Best Practices

1. **Identify the counting type first**: Is order important? Are repetitions allowed?

2. **Use the decision tree approach**:
   - Ordered vs Unordered
   - With vs Without repetition

3. **Verify with small cases**: Test your formula with n=2 or n=3 where you can enumerate by hand.

4. **Check for overcounting**: When in doubt, ask "Am I counting the same configuration multiple ways?"

5. **Use symmetry**: C(n,k) = C(n,n-k) can simplify calculations.

6. **Consider complements**: Sometimes it's easier to count what you DON'T want and subtract.

---

## Summary

Combinatorics provides the mathematical foundation for counting discrete objects:

- **Fundamental Counting Principle**: Multiply independent choices
- **Permutations**: Ordered arrangements (n! or P(n,r))
- **Combinations**: Unordered selections (C(n,k) or "n choose k")
- **Multiset permutations**: Divide by factorials of repeated elements
- **Stars and bars**: Combinations with repetition
- **Inclusion-exclusion**: Count union by adding/subtracting intersections
- **Pigeonhole principle**: Proves existence of crowded containers

**Key Decision Points:**
- Does order matter? → Permutation vs Combination
- Can items repeat? → With/without repetition formulas
- Are there overlapping conditions? → Inclusion-exclusion

---

## Further Exploration

- **Generating functions**: A powerful technique for solving recurrences and counting problems
- **Catalan numbers**: Count binary trees, valid parentheses, and more
- **Derangements**: Permutations with no fixed points
- **Burnside's lemma**: Counting with symmetries
