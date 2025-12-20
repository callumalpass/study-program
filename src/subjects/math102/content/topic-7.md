## Introduction

Probability theory provides the mathematical framework for reasoning about uncertainty. In computer science, probability is essential for analyzing randomized algorithms, understanding machine learning, designing cryptographic systems, and modeling real-world phenomena. This topic introduces discrete probability concepts with a focus on applications relevant to computing.

**Learning Objectives:**
- Define sample spaces, events, and probability measures
- Apply counting techniques to calculate probabilities
- Understand conditional probability and independence
- Use Bayes' theorem for updating beliefs
- Calculate expected value and variance
- Apply basic probability distributions (uniform, binomial, geometric)

---

## Core Concepts

### Sample Spaces and Events

A **sample space** Ω is the set of all possible outcomes of an experiment.

An **event** is a subset of the sample space.

```python
# Rolling a die
sample_space = {1, 2, 3, 4, 5, 6}

# Event: rolling an even number
even = {2, 4, 6}

# Event: rolling greater than 4
greater_than_4 = {5, 6}

# Intersection: even AND greater than 4
print(even & greater_than_4)  # {6}

# Union: even OR greater than 4
print(even | greater_than_4)  # {2, 4, 5, 6}
```

### Probability Axioms

For a sample space Ω and events A, B:

1. **Non-negativity:** P(A) ≥ 0
2. **Normalization:** P(Ω) = 1
3. **Additivity:** If A ∩ B = ∅, then P(A ∪ B) = P(A) + P(B)

**Consequences:**
- P(∅) = 0
- P(A') = 1 - P(A) (complement rule)
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B) (inclusion-exclusion)

```python
def probability(event, sample_space):
    """Calculate probability assuming uniform distribution"""
    return len(event) / len(sample_space)

# P(even) when rolling a die
sample = {1, 2, 3, 4, 5, 6}
even = {2, 4, 6}
print(probability(even, sample))  # 0.5
```

### Counting and Probability

Many probability problems reduce to counting:

$$P(A) = \frac{|A|}{|\Omega|}$$

**Example: Birthday Problem**

What's the probability that in a group of n people, at least two share a birthday?

```python
def birthday_probability(n, days=365):
    """
    Probability that at least 2 of n people share a birthday.
    Uses complement: P(shared) = 1 - P(all different)
    """
    if n > days:
        return 1.0

    # P(all different) = 365/365 × 364/365 × ... × (365-n+1)/365
    prob_all_different = 1.0
    for i in range(n):
        prob_all_different *= (days - i) / days

    return 1 - prob_all_different

# 23 people: ~50% chance of shared birthday
print(f"n=23: {birthday_probability(23):.4f}")  # 0.5073

# 50 people: ~97% chance
print(f"n=50: {birthday_probability(50):.4f}")  # 0.9704
```

### Conditional Probability

The probability of A given that B has occurred:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

```python
def conditional_probability(a_and_b, b):
    """P(A|B) = P(A ∩ B) / P(B)"""
    if b == 0:
        return 0
    return a_and_b / b

# Example: Two dice rolled
# P(sum=7 | first die is 3)
# A ∩ B = {(3,4)}
# B = {(3,1), (3,2), (3,3), (3,4), (3,5), (3,6)}
prob_a_and_b = 1/36
prob_b = 6/36
print(conditional_probability(prob_a_and_b, prob_b))  # 1/6 ≈ 0.167
```

### Independence

Events A and B are **independent** if:
$$P(A \cap B) = P(A) \cdot P(B)$$

Equivalently: P(A|B) = P(A)

```python
def are_independent(p_a, p_b, p_a_and_b, epsilon=1e-10):
    """Check if events A and B are independent"""
    return abs(p_a_and_b - p_a * p_b) < epsilon

# Rolling a die: "even" and "greater than 2"
p_even = 3/6
p_greater_2 = 4/6
p_even_and_greater_2 = 2/6  # {4, 6}
print(are_independent(p_even, p_greater_2, p_even_and_greater_2))  # False
# 2/6 ≠ (3/6)(4/6) = 12/36 = 1/3
```

### Bayes' Theorem

$$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$

**Law of Total Probability:**
$$P(B) = \sum_i P(B|A_i) \cdot P(A_i)$$

```python
def bayes_theorem(p_b_given_a, p_a, p_b):
    """P(A|B) using Bayes' theorem"""
    return (p_b_given_a * p_a) / p_b

# Medical test example:
# Disease prevalence: P(D) = 0.01
# True positive rate: P(+|D) = 0.99
# False positive rate: P(+|¬D) = 0.05
# If test is positive, what's P(D|+)?

p_d = 0.01
p_not_d = 0.99
p_positive_given_d = 0.99
p_positive_given_not_d = 0.05

# P(+) by law of total probability
p_positive = (p_positive_given_d * p_d +
              p_positive_given_not_d * p_not_d)

# P(D|+)
p_d_given_positive = bayes_theorem(p_positive_given_d, p_d, p_positive)
print(f"P(Disease|Positive) = {p_d_given_positive:.4f}")  # 0.1667
```

### Expected Value

The **expected value** of a random variable X is:

$$E[X] = \sum_x x \cdot P(X = x)$$

**Properties:**
- Linearity: E[aX + bY] = aE[X] + bE[Y] (always!)
- E[X + Y] = E[X] + E[Y] (even if not independent)

```python
def expected_value(outcomes):
    """
    Calculate E[X] from {outcome: probability} dict.
    """
    return sum(x * p for x, p in outcomes.items())

# Expected value of a fair die
die = {1: 1/6, 2: 1/6, 3: 1/6, 4: 1/6, 5: 1/6, 6: 1/6}
print(expected_value(die))  # 3.5

# Expected sum of two dice
two_dice = expected_value(die) + expected_value(die)
print(two_dice)  # 7.0
```

### Variance and Standard Deviation

**Variance** measures spread around the mean:
$$Var(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$$

**Standard deviation:** σ = √Var(X)

```python
import math

def variance(outcomes):
    """Calculate Var(X)"""
    ex = expected_value(outcomes)
    ex2 = sum(x**2 * p for x, p in outcomes.items())
    return ex2 - ex**2

def std_dev(outcomes):
    return math.sqrt(variance(outcomes))

# Variance of a fair die
die = {1: 1/6, 2: 1/6, 3: 1/6, 4: 1/6, 5: 1/6, 6: 1/6}
print(f"E[X] = {expected_value(die)}")     # 3.5
print(f"Var(X) = {variance(die):.4f}")     # 2.9167
print(f"σ = {std_dev(die):.4f}")           # 1.7078
```

### Common Distributions

**Uniform Distribution:**
Each of n outcomes equally likely: P(X = k) = 1/n

```python
def uniform_pmf(n):
    """Uniform distribution over {1, 2, ..., n}"""
    return {k: 1/n for k in range(1, n+1)}

# E[X] = (n+1)/2, Var(X) = (n²-1)/12
```

**Bernoulli Distribution:**
Single trial with success probability p.

```python
def bernoulli_pmf(p):
    """Bernoulli(p): X ∈ {0, 1}"""
    return {0: 1-p, 1: p}

# E[X] = p, Var(X) = p(1-p)
```

**Binomial Distribution:**
Number of successes in n independent Bernoulli(p) trials.

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

```python
from math import comb

def binomial_pmf(n, p, k):
    """P(X = k) for Binomial(n, p)"""
    return comb(n, k) * (p ** k) * ((1-p) ** (n-k))

def binomial_distribution(n, p):
    """Full PMF for Binomial(n, p)"""
    return {k: binomial_pmf(n, p, k) for k in range(n+1)}

# 10 coin flips, P(exactly 7 heads)
print(f"P(X=7) = {binomial_pmf(10, 0.5, 7):.4f}")  # 0.1172

# E[X] = np, Var(X) = np(1-p)
```

**Geometric Distribution:**
Number of trials until first success.

$$P(X = k) = (1-p)^{k-1} p$$

```python
def geometric_pmf(p, k):
    """P(X = k) for Geometric(p), k ≥ 1"""
    return ((1-p) ** (k-1)) * p

# Expected flips until first heads
# E[X] = 1/p = 2 for fair coin
print(f"E[X] = {1/0.5}")  # 2.0
```

### Linearity of Expectation

Even for dependent random variables:

$$E\left[\sum_{i=1}^{n} X_i\right] = \sum_{i=1}^{n} E[X_i]$$

```python
# Expected number of fixed points in a random permutation
# Let Xi = 1 if element i is in position i, else 0
# E[Xi] = 1/n (each element equally likely to be anywhere)
# E[total fixed points] = n × (1/n) = 1

def expected_fixed_points(n):
    """Expected fixed points in random permutation of n elements"""
    return n * (1/n)  # Always 1!

print(expected_fixed_points(100))  # 1.0
```

### Indicator Random Variables

Use indicator variables (0 or 1) to simplify counting expectations:

```python
# Coupon collector problem:
# Expected draws to collect all n different coupons

def coupon_collector_expected(n):
    """
    E[X] = n × H(n) where H(n) = 1 + 1/2 + ... + 1/n
    """
    harmonic = sum(1/i for i in range(1, n+1))
    return n * harmonic

# Expected draws for n=10 coupons
print(f"E[X] = {coupon_collector_expected(10):.2f}")  # 29.29
```

---

## Applications in Computing

### Hash Table Analysis

Probability of collision when hashing n items into m buckets:

```python
def birthday_collision_prob(n, m):
    """
    Probability of at least one collision
    when inserting n items into m buckets.
    """
    if n > m:
        return 1.0

    prob_no_collision = 1.0
    for i in range(n):
        prob_no_collision *= (m - i) / m

    return 1 - prob_no_collision

# 23 items in 365 buckets
print(f"P(collision) = {birthday_collision_prob(23, 365):.4f}")  # 0.5073
```

### Randomized Algorithm Analysis

QuickSort expected comparisons:

```python
def quicksort_expected_comparisons(n):
    """
    Expected comparisons: ~2n ln(n) ≈ 1.39 n log₂(n)
    """
    import math
    if n <= 1:
        return 0
    return 2 * n * math.log(n)

print(f"n=1000: {quicksort_expected_comparisons(1000):.0f}")  # ~13816
```

---

## Common Mistakes and Debugging

### Mistake 1: Confusing P(A|B) and P(B|A)

These are generally NOT equal! Use Bayes' theorem to convert.

### Mistake 2: Assuming Independence

Events are not independent by default. Always verify or state the assumption.

### Mistake 3: Forgetting the Complement

P(at least one) = 1 - P(none) is often easier to calculate.

```python
# P(at least one 6 in 4 rolls)
# Wrong: 4 × (1/6) = 2/3
# Correct: 1 - (5/6)^4 ≈ 0.518
p_correct = 1 - (5/6)**4
print(f"P(at least one 6) = {p_correct:.4f}")
```

### Mistake 4: Multiplying Dependent Probabilities

P(A and B) = P(A) × P(B) only if independent!

For dependent events: P(A and B) = P(A) × P(B|A)

---

## Best Practices

1. **Define the sample space** clearly first
2. **Use complement rule** for "at least one" problems
3. **Apply linearity of expectation** freely (no independence needed)
4. **Use indicator variables** to simplify expected value calculations
5. **Draw probability trees** for conditional probability problems
6. **Sanity check** that probabilities sum to 1

---

## Summary

Discrete probability provides tools for analyzing uncertainty:

- **Sample space and events**: Basic setup for probability
- **Conditional probability**: P(A|B) = P(A∩B)/P(B)
- **Independence**: P(A∩B) = P(A)P(B)
- **Bayes' theorem**: Updating probabilities with new information
- **Expected value**: Average outcome, E[X] = Σ x·P(x)
- **Variance**: Spread around mean, Var(X) = E[X²] - (E[X])²
- **Key distributions**: Uniform, Bernoulli, Binomial, Geometric

**Key Formulas:**
- Birthday problem: P(collision) ≈ 1 - e^(-n²/2m)
- Binomial: P(X=k) = C(n,k)p^k(1-p)^(n-k)
- Geometric: E[X] = 1/p

---

## Further Exploration

- **Continuous probability**: Probability density functions
- **Markov chains**: State transitions with memory-less property
- **Monte Carlo methods**: Sampling for estimation
- **Information theory**: Entropy, mutual information
- **Randomized algorithms**: Las Vegas vs Monte Carlo
