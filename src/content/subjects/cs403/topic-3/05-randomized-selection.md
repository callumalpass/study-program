# Randomized Selection: Median Finding in Expected Linear Time

## Introduction

Selection—finding the k-th smallest element in an unsorted array—is a fundamental algorithmic problem. While sorting solves selection in $O(n \log n)$ time, we can do better: randomized selection achieves expected $O(n)$ time. This is optimal since we must examine every element at least once.

The algorithm demonstrates how randomization can improve performance significantly: deterministic $O(n)$ algorithms exist (median-of-medians), but randomized selection is simpler, has lower constants, and is faster in practice.

## Problem Definition

**Input**: Array $A$ of $n$ distinct elements, integer $k$ with $1 \leq k \leq n$.

**Output**: The $k$-th smallest element in $A$.

**Special cases**:
- $k = 1$: Minimum (trivially $O(n)$)
- $k = n$: Maximum (trivially $O(n)$)
- $k = \lceil n/2 \rceil$: Median

### Why Selection Matters

**Statistical queries**: Computing median, percentiles, quartiles for data analysis.

**Algorithm building block**: Many divide-and-conquer algorithms need good pivots.

**Database systems**: Processing ORDER BY queries with LIMIT clauses.

**Graphics**: Median filtering for noise reduction in images.

## Randomized Quickselect

The algorithm mirrors quicksort but only recurses on one side:

```typescript
function randomizedSelect(A: number[], k: number): number {
    if (A.length === 1) {
        return A[0];
    }

    // Choose pivot uniformly at random
    const pivotIndex = Math.floor(Math.random() * A.length);
    const pivot = A[pivotIndex];

    // Partition into three parts
    const less: number[] = [];      // Elements < pivot
    const equal: number[] = [];     // Elements = pivot
    const greater: number[] = [];   // Elements > pivot

    for (const x of A) {
        if (x < pivot) less.push(x);
        else if (x > pivot) greater.push(x);
        else equal.push(x);
    }

    // Recurse on appropriate partition
    if (k <= less.length) {
        return randomizedSelect(less, k);
    } else if (k <= less.length + equal.length) {
        return pivot;
    } else {
        return randomizedSelect(greater, k - less.length - equal.length);
    }
}
```

**Key insight**: Unlike quicksort, we recurse on only one partition, not both.

## Expected Time Analysis

**Theorem**: Expected running time is $O(n)$.

### Analysis via Indicator Random Variables

Let $T(n)$ denote expected time on $n$ elements.

**Observation**: If pivot has rank $r$ (position in sorted order), then:
- If $k < r$: recurse on left partition of size $r - 1$
- If $k = r$: done
- If $k > r$: recurse on right partition of size $n - r$

**Best case**: Pivot is the $k$-th element—we're done!

**Good pivot**: Rank in middle half, i.e., $\frac{n}{4} \leq r \leq \frac{3n}{4}$.

Probability of good pivot: $\frac{1}{2}$.

**With good pivot**: Recursive call has size at most $\frac{3n}{4}$.

### Recurrence

Expected cost satisfies:
$$T(n) \leq T\left(\frac{3n}{4}\right) + O(n) + \text{cost of bad pivots}$$

More precisely, let $G$ be the number of rounds until we get a good pivot.

$\mathbb{E}[G] = 2$ (geometric distribution with $p = 1/2$).

Each round costs $O(n)$ work, and a good pivot reduces problem size by at least $1/4$.

$$T(n) \leq 2 \cdot O(n) + T\left(\frac{3n}{4}\right)$$

Solving: $T(n) = O(n) + O(3n/4) + O(9n/16) + \cdots = O(n) \cdot \sum_{i=0}^{\log_{4/3} n} (3/4)^i = O(n)$.

### Alternative Analysis

Count expected comparisons:

$$\mathbb{E}[\text{comparisons}] = \sum_{i=1}^{n} \Pr[\text{element } i \text{ compared to some element}]$$

Each element is compared to pivot in each round where it participates. Expected number of rounds an element participates before being eliminated is $O(\log n)$, but the telescoping sum gives $O(n)$ total.

## Worst-Case Analysis

**Worst-case time**: $O(n^2)$ if every pivot is bad.

**Probability**: Extremely unlikely. For $n$ rounds all to have bad pivots:
$$\Pr[\text{all bad}] \leq \left(\frac{1}{2}\right)^n$$

**High probability bound**: With probability $\geq 1 - 1/n^c$, running time is $O(n)$.

## Median-of-Medians: Deterministic Linear Time

**Blum, Floyd, Pratt, Rivest, Tarjan (1973)** gave a deterministic $O(n)$ algorithm.

**Algorithm**:
1. Divide $A$ into groups of 5
2. Find median of each group (constant time per group)
3. Recursively find median of these medians
4. Use this "median of medians" as pivot

```typescript
function deterministicSelect(A: number[], k: number): number {
    if (A.length <= 5) {
        A.sort((a, b) => a - b);
        return A[k - 1];
    }

    // Divide into groups of 5
    const medians: number[] = [];
    for (let i = 0; i < A.length; i += 5) {
        const group = A.slice(i, Math.min(i + 5, A.length));
        group.sort((a, b) => a - b);
        medians.push(group[Math.floor(group.length / 2)]);
    }

    // Recursively find median of medians
    const pivot = deterministicSelect(medians, Math.ceil(medians.length / 2));

    // Partition and recurse
    const [less, equal, greater] = partition(A, pivot);

    if (k <= less.length) return deterministicSelect(less, k);
    if (k <= less.length + equal.length) return pivot;
    return deterministicSelect(greater, k - less.length - equal.length);
}
```

### Why It Works

**Claim**: Median of medians eliminates at least $3n/10$ elements.

**Proof**:
- Half of groups have median $\leq$ median of medians
- Each such group contributes at least 3 elements $\leq$ median of medians
- So at least $3 \cdot \frac{n}{10} = \frac{3n}{10}$ elements eliminated

**Recurrence**:
$$T(n) = T(n/5) + T(7n/10) + O(n)$$

Solving: $T(n) = O(n)$ since $1/5 + 7/10 = 9/10 < 1$.

### Practical Considerations

**Median-of-medians constants**: Very high ($\approx 20n$ comparisons).

**Randomized**: Lower constants ($\approx 2.5n$ expected comparisons).

**In practice**: Use randomized for speed; median-of-medians for guaranteed time.

**Hybrid approach**: Use randomized with median-of-medians as fallback if too many bad pivots.

## Applications

**Statistics**: Computing percentiles and quartiles for data analysis.

**Algorithm design**: Quick partitioning for divide-and-conquer algorithms.

**Image processing**: Median filtering removes salt-and-pepper noise.

**Database engines**: Efficient LIMIT and TOP-k queries.

**Streaming**: Approximate median with reservoir sampling variants.

## Key Takeaways

- Selection can be solved in expected $O(n)$ time via randomization
- Randomized quickselect: simple, fast, optimal expected time
- Good pivots occur with probability $1/2$, giving geometric progress
- Median-of-medians provides deterministic $O(n)$ but with higher constants
- Selection is fundamental to divide-and-conquer algorithm design
- The analysis techniques (indicator variables, geometric random variables) are widely applicable
