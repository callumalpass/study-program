# QuickSort Deep Dive

QuickSort is arguably the most influential sorting algorithm ever invented. Despite its O(n²) worst case, it dominates practical sorting applications because its average-case behavior combines excellent theoretical performance with outstanding cache efficiency. The algorithm's elegance lies in its simplicity: choose a pivot element, partition the array so smaller elements precede larger ones, then recursively sort the partitions.

What makes QuickSort fascinating is the tension between its simplicity and the depth of its analysis. The basic algorithm is easy to understand—partition and recurse—but achieving optimal performance requires understanding partitioning schemes, pivot selection strategies, and the subtle ways implementation choices affect cache behavior. Tony Hoare invented the algorithm in 1959 when he was just 25, and it remains the algorithm of choice for general-purpose sorting more than six decades later.

The practical dominance of QuickSort stems from several factors. Unlike merge sort, it operates in-place, requiring only O(log n) stack space for recursion. Its partitioning phase exhibits excellent cache locality, accessing elements sequentially rather than jumping around memory. And while pathological inputs can cause O(n²) behavior, randomized pivot selection or median-of-three strategies make such cases astronomically unlikely for random data.

## The Algorithm

QuickSort works by:
1. **Partition**: Choose pivot, rearrange so smaller elements are left, larger are right
2. **Recurse**: Sort left and right partitions independently

```python
def quicksort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quicksort(arr, low, pivot_idx - 1)
        quicksort(arr, pivot_idx + 1, high)

    return arr
```

## Partitioning Schemes

### Lomuto Partition

Simple but not as efficient. Uses last element as pivot.

```python
def lomuto_partition(arr, low, high):
    pivot = arr[high]
    i = low - 1  # Index of smaller element

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

**Invariant**: arr[low..i] ≤ pivot < arr[i+1..j-1]

**Trace**:
```
arr = [8, 3, 1, 7, 0, 10, 2], pivot = 2
  j=0: 8>2, skip
  j=1: 3>2, skip
  j=2: 1≤2, i=0, swap → [1, 3, 8, 7, 0, 10, 2]
  j=3: 7>2, skip
  j=4: 0≤2, i=1, swap → [1, 0, 8, 7, 3, 10, 2]
  j=5: 10>2, skip
Final: swap pivot → [1, 0, 2, 7, 3, 10, 8]
Return i+1 = 2
```

### Hoare Partition

Original, more efficient (fewer swaps on average).

```python
def hoare_partition(arr, low, high):
    pivot = arr[(low + high) // 2]  # Middle element
    i = low - 1
    j = high + 1

    while True:
        i += 1
        while arr[i] < pivot:
            i += 1

        j -= 1
        while arr[j] > pivot:
            j -= 1

        if i >= j:
            return j

        arr[i], arr[j] = arr[j], arr[i]
```

**Note**: Returns different index than Lomuto. Recursive calls use (low, j) and (j+1, high).

## Pivot Selection Strategies

### First/Last Element

Simple but vulnerable to sorted inputs.

```python
pivot = arr[low]   # or arr[high]
```

**Problem**: Already sorted array → O(n²)

### Random Pivot

Eliminates adversarial worst case.

```python
import random

def random_partition(arr, low, high):
    pivot_idx = random.randint(low, high)
    arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
    return lomuto_partition(arr, low, high)
```

**Expected time**: O(n log n) for ANY input.

### Median-of-Three

Good balance of simplicity and performance.

```python
def median_of_three(arr, low, high):
    mid = (low + high) // 2

    # Sort low, mid, high positions
    if arr[low] > arr[mid]:
        arr[low], arr[mid] = arr[mid], arr[low]
    if arr[mid] > arr[high]:
        arr[mid], arr[high] = arr[high], arr[mid]
    if arr[low] > arr[mid]:
        arr[low], arr[mid] = arr[mid], arr[low]

    # Median is now at mid, move to high-1
    arr[mid], arr[high - 1] = arr[high - 1], arr[mid]
    return arr[high - 1]
```

**Benefits**:
- Avoids worst case on sorted input
- Good pivot choice on average
- No random number generation

## Complexity Analysis

### Worst Case: O(n²)

Occurs when pivot is always min or max.

```
T(n) = T(n-1) + T(0) + O(n)
     = T(n-1) + O(n)
     = O(n²)
```

**Happens with**: Sorted array + first/last pivot selection.

### Best Case: O(n log n)

Pivot always divides array in half.

```
T(n) = 2T(n/2) + O(n)
     = O(n log n)
```

### Average Case: O(n log n)

With random pivot, expected comparisons ≈ 1.39 n log n.

**Proof sketch**: Let X = total comparisons. For elements zᵢ and zⱼ (i < j), they're compared iff one is chosen as pivot before any element between them.

P(zᵢ, zⱼ compared) = 2/(j - i + 1)

E[X] = Σᵢ<ⱼ 2/(j - i + 1) = O(n log n)

## Optimizations

### Cutoff to Insertion Sort

Small subarrays are better sorted with insertion sort.

```python
CUTOFF = 16

def optimized_quicksort(arr, low, high):
    if high - low < CUTOFF:
        insertion_sort(arr, low, high)
        return

    # ... normal quicksort
```

### Tail Recursion Elimination

Reduce stack depth by recursing on smaller partition first.

```python
def tail_optimized_quicksort(arr, low, high):
    while low < high:
        pivot = partition(arr, low, high)

        # Recurse on smaller partition
        if pivot - low < high - pivot:
            tail_optimized_quicksort(arr, low, pivot - 1)
            low = pivot + 1
        else:
            tail_optimized_quicksort(arr, pivot + 1, high)
            high = pivot - 1
```

**Guarantees**: O(log n) stack depth even in worst case.

### Three-Way Partition

Handles many equal elements efficiently.

```python
def three_way_partition(arr, low, high):
    """Dutch National Flag algorithm"""
    pivot = arr[low]
    lt = low      # arr[low..lt-1] < pivot
    gt = high     # arr[gt+1..high] > pivot
    i = low + 1   # arr[lt..i-1] == pivot

    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1

    return lt, gt
```

**Benefit**: O(n) for arrays with many duplicates.

## Comparison with Merge Sort

| Aspect | QuickSort | Merge Sort |
|--------|-----------|------------|
| Average time | O(n log n) | O(n log n) |
| Worst time | O(n²) | O(n log n) |
| Space | O(log n) | O(n) |
| Stable | No | Yes |
| Cache performance | Excellent | Good |
| In-place | Yes | No (usually) |

**When to use QuickSort**:
- General-purpose sorting
- Memory constrained
- Cache performance matters

**When to use Merge Sort**:
- Guaranteed O(n log n) required
- Stability required
- External sorting
