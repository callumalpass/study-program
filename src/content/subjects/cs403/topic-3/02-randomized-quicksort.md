# Randomized Quicksort: Expected O(n log n) Analysis

## Introduction

Quicksort is one of the most widely used sorting algorithms in practice. While deterministic quicksort has $O(n^2)$ worst-case time (on sorted input), randomized quicksort achieves $O(n \log n)$ expected time regardless of input.

This analysis showcases key techniques in randomized algorithm analysis: indicator random variables, linearity of expectation, and careful probability accounting.

## Algorithm

```typescript
function randomizedQuicksort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) return;
    
    // Random pivot
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    
    // Swap pivot to end
    [arr[pivotIdx], arr[right]] = [arr[right], arr[pivotIdx]];
    
    // Partition
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] <= arr[right]) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    // Place pivot
    [arr[i+1], arr[right]] = [arr[right], arr[i+1]];
    const pivotPos = i + 1;
    
    // Recurse
    randomizedQuicksort(arr, left, pivotPos - 1);
    randomizedQuicksort(arr, pivotPos + 1, right);
}
```

## Analysis

**Theorem**: Expected running time is $O(n \log n)$.

**Proof**:

Let $S = \{s_1, s_2, \ldots, s_n\}$ be the sorted elements.

**Key insight**: Elements $s_i$ and $s_j$ are compared at most once (when one becomes pivot in subarray containing both).

**Indicator variables**: $X_{ij} = 1$ if $s_i$ and $s_j$ are compared.

**Total comparisons**:
$$X = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} X_{ij}$$

**Expected comparisons**:
$$\mathbb{E}[X] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \mathbb{E}[X_{ij}] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \Pr[s_i \text{ and } s_j \text{ compared}]$$

**Computing** $\Pr[s_i, s_j \text{ compared}]$:

Elements $s_i$ and $s_j$ are compared iff one of them is chosen as pivot before any element in $\{s_{i+1}, s_{i+2}, \ldots, s_{j-1}\}$.

Among $\{s_i, s_{i+1}, \ldots, s_j\}$ (total $j-i+1$ elements), each equally likely to be chosen first as pivot.

$$\Pr[s_i \text{ or } s_j \text{ chosen first}] = \frac{2}{j-i+1}$$

**Therefore**:
$$\mathbb{E}[X] = \sum_{i=1}^{n-1} \sum_{j=i+1}^{n} \frac{2}{j-i+1}$$

Let $k = j - i$:
$$\mathbb{E}[X] = \sum_{i=1}^{n-1} \sum_{k=1}^{n-i} \frac{2}{k+1} \leq \sum_{i=1}^{n} \sum_{k=1}^{n} \frac{2}{k+1}$$

$$= 2n \sum_{k=1}^{n} \frac{1}{k+1} = 2n H_n = O(n \log n)$$

where $H_n = 1 + \frac{1}{2} + \cdots + \frac{1}{n} \approx \ln n$.

**Conclusion**: Expected number of comparisons is $O(n \log n)$. ✓

## Worst-Case Analysis

**Worst-case time**: $O(n^2)$

**Example**: If pivot always smallest/largest element.

**Probability of worst-case**:
$$\Pr[\text{worst-case}] = \left(\frac{1}{n}\right)^{\log n} = \frac{1}{n^{\log n}} = \frac{1}{2^{(\log n)^2}}$$

Exponentially small!

## Practical Optimizations

### Median-of-Three

Choose median of three random elements as pivot:

```typescript
function medianOfThree(arr: number[], left: number, right: number): number {
    const a = left + Math.floor(Math.random() * (right - left + 1));
    const b = left + Math.floor(Math.random() * (right - left + 1));
    const c = left + Math.floor(Math.random() * (right - left + 1));
    
    const vals = [arr[a], arr[b], arr[c]];
    vals.sort((x, y) => x - y);
    
    if (vals[1] === arr[a]) return a;
    if (vals[1] === arr[b]) return b;
    return c;
}
```

**Effect**: Better balance, fewer bad pivots.

### Insertion Sort for Small Subarrays

```typescript
function quicksortOptimized(arr: number[], left: number, right: number): void {
    const THRESHOLD = 10;
    
    if (right - left < THRESHOLD) {
        insertionSort(arr, left, right);
        return;
    }
    
    // Regular quicksort for larger subarrays
    // ...
}
```

**Reason**: Insertion sort faster for small $n$ due to lower constant factors.

### Three-Way Partitioning

Handle duplicate elements efficiently:

```typescript
function threeWayPartition(arr: number[], left: number, right: number, pivot: number): [number, number] {
    let lt = left;      // arr[left..lt-1] < pivot
    let i = left;       // arr[lt..i-1] == pivot
    let gt = right;     // arr[gt+1..right] > pivot
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    
    return [lt, gt];
}
```

**Benefit**: $O(n)$ time when all elements equal.

## Comparison with Other Algorithms

| Algorithm | Worst-case | Average-case | Space | Stable? |
|-----------|------------|--------------|-------|---------|
| Quicksort (randomized) | $O(n^2)$ (rare) | $O(n \log n)$ | $O(\log n)$ | No |
| Mergesort | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Yes |
| Heapsort | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | No |

**Why quicksort popular?**
- In-place (low memory)
- Cache-friendly (good locality)
- Small constants
- Fast in practice

## Applications

**Standard library sorting**: C++ std::sort uses introsort (quicksort + heapsort fallback)

**Database systems**: Sorting query results

**Numerical computing**: Partial sorting, selecting top-k

## Conclusion

Randomized quicksort demonstrates the power of randomization:
- Simple algorithm
- $O(n \log n)$ expected time
- No worst-case input (for randomized version)
- Practical and widely used

The analysis showcases fundamental techniques in randomized algorithms that apply broadly across computer science.
