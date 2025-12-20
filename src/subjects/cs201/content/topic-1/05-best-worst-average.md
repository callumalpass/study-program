---
id: cs201-t1-cases
title: "Best, Worst, and Average Cases"
order: 5
---

# Best, Worst, and Average Case Analysis

A single complexity number rarely tells the whole story. Linear search might find its target immediately or scan the entire array—same algorithm, vastly different performance. Quick sort runs in O(n log n) on most inputs but degrades to O(n²) on already-sorted data with poor pivot choice. Understanding best, worst, and average case analysis lets you reason about algorithm behavior across the spectrum of possible inputs.

The three cases serve different purposes. Worst case provides guarantees: "no matter what input you give me, this algorithm finishes in O(f(n)) time." Average case predicts typical behavior under assumptions about input distribution. Best case reveals theoretical limits and helps identify when an algorithm's natural advantages emerge. Choosing which case to optimize—and which to report—depends entirely on context.

Different applications demand different analyses. Real-time systems that must meet deadlines need worst-case guarantees; occasional slow responses are unacceptable. Batch processing systems care more about throughput, making average case the relevant metric. Adversarial environments (security, games) must assume worst case since attackers will find pathological inputs. Understanding your application's needs determines which analysis matters.

## The Three Cases

**Best case**: Fastest possible execution for any input of size n.

**Worst case**: Slowest possible execution for any input of size n.

**Average case**: Expected performance over all possible inputs.

## Why Case Analysis Matters

Consider linear search:
```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

- **Best case**: Target at index 0 → O(1)
- **Worst case**: Target at end or absent → O(n)
- **Average case**: Target at random position → O(n/2) = O(n)

Different algorithms might be better in different scenarios:
- If inputs are often best-case, algorithm A might beat algorithm B
- For critical systems, worst-case matters most
- For large-scale processing, average case determines throughput

## Worst Case Analysis

Most commonly used because:
1. **Guaranteed bound**: No input takes longer
2. **Safety**: Critical for real-time systems
3. **Simplicity**: Often easier to analyze

### Example: Insertion Sort

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

**Worst case** (reverse sorted array):
- Inner loop runs: 1 + 2 + ... + (n-1) = n(n-1)/2
- Worst case: **O(n²)**

**Best case** (already sorted):
- Inner loop never executes
- Best case: **O(n)**

## Best Case Analysis

Useful for understanding algorithm behavior but can be misleading.

### Caution: Bogus Best Cases

```python
def suspicious_sort(arr):
    if is_sorted(arr):  # O(n) check
        return arr
    # ... actual sorting ...
```

This has O(n) best case but tells us little about typical performance.

**Rule**: Best case should represent realistic favorable inputs, not artificial shortcuts.

### Legitimate Best Case: Quick Sort

```python
def quicksort(arr, low, high):
    if low < high:
        pivot = partition(arr, low, high)
        quicksort(arr, low, pivot - 1)
        quicksort(arr, pivot + 1, high)
```

**Best case**: Pivot always divides array in half.
- Recurrence: T(n) = 2T(n/2) + O(n)
- Best case: **O(n log n)**

**Worst case**: Pivot always smallest/largest (sorted input with bad pivot choice).
- Recurrence: T(n) = T(n-1) + O(n)
- Worst case: **O(n²)**

## Average Case Analysis

Most realistic but often hardest to compute.

### Requirements

1. **Probability distribution** over inputs
2. **Expected value** calculation

### Example: Linear Search (Random Target)

Assume target is equally likely at any position (or absent).

If target exists at position i, cost = i + 1 comparisons.

Expected cost = (1/n) × Σᵢ₌₁ⁿ i = (1/n) × n(n+1)/2 = (n+1)/2 = **O(n)**

### Example: Quick Sort (Random Pivot)

With random pivot selection:
- Expected number of comparisons: ≈ 1.39 n log n
- Average case: **O(n log n)**

The constant factor is higher than merge sort's n log n, but cache efficiency often makes quicksort faster in practice.

## Probabilistic Analysis

### Random Inputs

Assume inputs are uniformly random:

```python
def has_duplicates(arr):
    seen = set()
    for x in arr:
        if x in seen:
            return True
        seen.add(x)
    return False
```

**Worst case**: No duplicates → O(n)
**Best case**: First two elements same → O(1)
**Average case**: Depends on probability of duplicates in random input

### Randomized Algorithms

Algorithm itself makes random choices:

```python
import random

def randomized_quicksort(arr, low, high):
    if low < high:
        pivot_idx = random.randint(low, high)
        arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
        pivot = partition(arr, low, high)
        randomized_quicksort(arr, low, pivot - 1)
        randomized_quicksort(arr, pivot + 1, high)
```

- **Expected** time: O(n log n) for ANY input
- No adversary can construct worst-case input
- Randomness is in the algorithm, not the input

## Input-Sensitive Analysis

Some algorithms' complexity depends on specific input properties.

### Example: Insertion Sort on Nearly-Sorted Data

If each element is at most k positions from its sorted position:

Inner loop runs at most k times per element.
Total: **O(nk)**

When k = O(1): O(n)
When k = O(n): O(n²)

This explains why insertion sort is excellent for nearly-sorted data.

### Example: Binary Search Tree Operations

BST operations are O(h) where h = tree height.

| Tree Shape | Height | Operations |
|------------|--------|------------|
| Balanced | O(log n) | O(log n) |
| Skewed (worst) | O(n) | O(n) |
| Random inserts | O(log n) expected | O(log n) expected |

## Summary: Choosing What to Report

| Context | Focus On |
|---------|----------|
| Real-time systems | Worst case |
| Typical usage | Average case |
| Optimization | Best case tells you lower bound |
| Security-critical | Worst case (adversarial input) |
| Large-scale batch | Average case |

When reporting complexity, specify which case:
- "Quicksort is O(n²) worst case but O(n log n) average case"
- "Insertion sort is O(n) best case, O(n²) worst and average"
- "Hash table operations are O(1) average, O(n) worst case"
