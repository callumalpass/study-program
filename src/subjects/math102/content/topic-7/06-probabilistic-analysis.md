# Probabilistic Analysis of Algorithms

Probabilistic analysis uses probability theory to analyze algorithm performance. This approach handles average-case complexity, randomized algorithms, and randomized data structures.

## Average-Case vs Worst-Case

### Motivation

Worst-case analysis can be pessimistic. Quicksort is O(n²) worst-case but O(n log n) average-case—and fast in practice.

### Average-Case Framework

1. Define probability distribution on inputs
2. Compute expected running time
3. Often assume uniform random input

## Indicator Random Variables

### Definition

An **indicator** Iₐ for event A:
$$I_A = \begin{cases} 1 & \text{if } A \text{ occurs} \\ 0 & \text{otherwise} \end{cases}$$

### Key Property

$$E[I_A] = P(A)$$

### Application

Count occurrences by summing indicators:
$$X = \sum_{i} I_{A_i} \implies E[X] = \sum_{i} P(A_i)$$

This simplifies counting via linearity of expectation.

## Hiring Problem Analysis

### Problem

Interview n candidates, hire current if best seen so far.

### Analysis

Let Xᵢ = indicator that candidate i is hired.

Xᵢ = 1 iff candidate i is best among first i.
P(Xᵢ = 1) = 1/i (uniform random order)

Expected hires:
$$E[X] = \sum_{i=1}^{n} \frac{1}{i} = H_n \approx \ln n$$

Logarithmic expected cost!

## Quicksort Analysis

### Setup

Analyze comparisons for random pivot quicksort on array of size n.

### Key Observation

Elements i and j are compared exactly once, and only if one is chosen as pivot before any element between them.

### Probability

For sorted elements z₁ < z₂ < ... < zₙ:
$$P(z_i, z_j \text{ compared}) = \frac{2}{j - i + 1}$$

(Either zᵢ or zⱼ must be first pivot from {zᵢ, ..., zⱼ})

### Expected Comparisons

$$E[\text{comparisons}] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \frac{2}{j-i+1}$$

$$= \sum_{i=1}^{n-1} \sum_{k=2}^{n-i+1} \frac{2}{k} = 2n \sum_{k=2}^{n} \frac{1}{k} - 2(n-1)$$

$$= O(n \log n)$$

## Randomized Selection

### Problem

Find kth smallest in unsorted array.

### Randomized Algorithm (Quickselect)

```python
def quickselect(arr, k):
    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    right = [x for x in arr if x > pivot]

    if k <= len(left):
        return quickselect(left, k)
    elif k > len(arr) - len(right):
        return quickselect(right, k - len(arr) + len(right))
    else:
        return pivot
```

### Analysis

Expected time: O(n)

Even though worst case is O(n²), expected is linear because pivot is unlikely to be extremely unbalanced repeatedly.

## Hash Table Analysis

### Simple Uniform Hashing

Assume each key equally likely to hash to any slot.

### Load Factor

α = n/m (n keys, m slots)

### Expected Search Time

- Unsuccessful search: O(1 + α)
- Successful search: O(1 + α/2) = O(1 + α)

With α = O(1), expected O(1) operations.

### Birthday Paradox Application

First collision expected after O(√m) insertions.

## Balls and Bins

### Problem

Throw n balls uniformly at random into n bins.

### Maximum Load

With high probability, max balls in any bin is Θ(log n / log log n).

### Application

Hash table maximum probe length, load balancing.

## Randomized Algorithms

### Las Vegas vs Monte Carlo

- **Las Vegas:** Always correct, random running time
- **Monte Carlo:** Always fast, possibly incorrect (bounded error)

### Example: Randomized Min-Cut

Karger's algorithm: Contract random edge repeatedly.

Single run: P(correct) ≥ 2/n²
Repeat O(n² log n) times: P(all wrong) → 0

Total time: O(n⁴ log n) with high success probability.

## Probabilistic Recurrences

### Expected Time Recurrence

For randomized quicksort with random pivot:
$$T(n) = n + \frac{1}{n} \sum_{k=0}^{n-1} [T(k) + T(n-1-k)]$$

Solve to get E[T(n)] = O(n log n).

### Amortized Analysis with Probability

Expected amortized cost uses probabilistic potential arguments.

## Concentration Inequalities

### Chernoff Bounds

For sum of independent Bernoulli variables X = Σ Xᵢ with μ = E[X]:

$$P(X \geq (1+\delta)\mu) \leq e^{-\delta^2 \mu / 3}$$ for 0 < δ < 1

$$P(X \leq (1-\delta)\mu) \leq e^{-\delta^2 \mu / 2}$$

### Application

Prove high-probability bounds, not just expectation.

**Example:** In n coin flips, P(heads > 0.6n) decays exponentially in n.

## Randomized Data Structures

### Skip Lists

Expected O(log n) search, insert, delete.

Each element promoted to next level with probability 1/2.

### Treaps

Binary search tree with random priorities.
Expected O(log n) operations.

### Bloom Filters

Probabilistic set membership.
- No false negatives
- Small false positive probability
- Space-efficient

## Practice Problems

1. **Indicator variables:** Expected number of fixed points in random permutation?

2. **Balls and bins:** Expected number of empty bins when throwing n balls into n bins?

3. **Quicksort:** If always choose first element as pivot with random input order, what's expected comparisons?

4. **Hash tables:** With m slots, n keys, expected number of collisions?

## Summary

Probabilistic analysis provides:
- Average-case bounds (often much better than worst-case)
- Indicator random variables simplify counting
- Randomized algorithms achieve good expected performance
- Concentration inequalities give high-probability bounds
- Essential for analyzing hash tables, sorting, selection
