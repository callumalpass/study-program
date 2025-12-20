---
id: cs201-t2-stability
title: "Sorting Stability"
order: 5
---

# Sorting Stability and Practical Considerations

The theoretical analysis of sorting algorithms—comparing asymptotic complexities and proving lower bounds—provides essential foundation, but practical sorting requires understanding subtle properties that theory alone doesn't capture. Stability, adaptiveness, cache behavior, and memory usage all influence algorithm choice in ways that big-O notation cannot express. A theoretically optimal O(n log n) algorithm may perform worse than a theoretically inferior O(n²) algorithm on small inputs or nearly-sorted data.

Stability is perhaps the most important of these practical properties. A stable sort preserves the relative order of equal elements, which seems trivial until you need to sort by multiple keys. Sorting employees first by name, then stably by department, produces employees alphabetized within each department—a result that unstable sorting cannot guarantee. Database systems, spreadsheet applications, and many data processing pipelines depend on stability for correct behavior.

Adaptive algorithms exploit existing order in the input, running faster on nearly-sorted data. Insertion sort is the classic adaptive algorithm: O(n) on sorted input, O(n²) on reverse-sorted. Timsort, Python's standard sort, is a sophisticated adaptive algorithm that detects and exploits "runs" of already-sorted elements. Real-world data is rarely random—log files are chronological, user lists are often alphabetical, sensor data trends smoothly—so adaptiveness provides substantial practical speedup.

## What is Stability?

A **stable sort** preserves the relative order of elements with equal keys.

```
Input:  [(A,2), (B,1), (C,2), (D,1)]
        Sort by number

Stable:   [(B,1), (D,1), (A,2), (C,2)]
          B before D, A before C (original order preserved)

Unstable: [(D,1), (B,1), (C,2), (A,2)]
          Order of equal elements may change
```

## Why Stability Matters

### Multi-Key Sorting

Sort by multiple criteria by sorting stable on keys in reverse priority order:

```python
# Sort employees by department, then by name within department
employees = [
    ("Alice", "Engineering"),
    ("Bob", "Sales"),
    ("Carol", "Engineering"),
    ("Dave", "Sales"),
]

# First sort by name (secondary key)
employees.sort(key=lambda x: x[0])  # Stable sort

# Then sort by department (primary key)
employees.sort(key=lambda x: x[1])  # Stable sort

# Result: [("Alice", "Engineering"), ("Carol", "Engineering"),
#          ("Bob", "Sales"), ("Dave", "Sales")]
```

### Preserving Previous Order

When re-sorting already-sorted data, stability preserves meaningful ordering.

## Stability of Common Algorithms

| Algorithm | Stable? | Notes |
|-----------|---------|-------|
| Merge Sort | Yes | Natural stability from merge process |
| Insertion Sort | Yes | Equal elements never swapped |
| Bubble Sort | Yes | Only swaps when strictly greater |
| Counting Sort | Yes | If implemented correctly |
| Radix Sort | Yes | Requires stable digit sort |
| Quick Sort | No | Partition may reorder equals |
| Heap Sort | No | Heap operations disrupt order |
| Selection Sort | No | Swaps may skip over equals |

## Making Unstable Sorts Stable

### Index Decoration

Add original index as tiebreaker:

```python
def stable_quicksort(arr):
    # Decorate with index
    decorated = [(val, i) for i, val in enumerate(arr)]

    # Sort with index as tiebreaker
    decorated.sort(key=lambda x: (x[0], x[1]))

    # Undecorate
    return [val for val, i in decorated]
```

**Cost**: O(n) extra space for indices.

### Careful Implementation

Some algorithms can be made stable with careful implementation at no extra cost.

## Adaptive Sorting

**Adaptive sorts** run faster on partially sorted input.

### Measuring Sortedness

**Inversions**: Pairs (i, j) where i < j but arr[i] > arr[j].

- Sorted array: 0 inversions
- Reverse sorted: n(n-1)/2 inversions

### Adaptive Algorithms

**Insertion Sort**: O(n + k) where k = number of inversions.

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:  # Each swap fixes one inversion
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

**Natural Merge Sort**: Exploits existing sorted runs.

```python
def natural_merge_sort(arr):
    # Find natural runs
    runs = find_runs(arr)

    # Merge runs pairwise until one remains
    while len(runs) > 1:
        new_runs = []
        for i in range(0, len(runs), 2):
            if i + 1 < len(runs):
                merged = merge(runs[i], runs[i+1])
                new_runs.append(merged)
            else:
                new_runs.append(runs[i])
        runs = new_runs

    return runs[0] if runs else []

def find_runs(arr):
    """Find ascending or descending runs"""
    if not arr:
        return []

    runs = []
    start = 0

    for i in range(1, len(arr)):
        if arr[i] < arr[i-1]:  # Run broken
            runs.append(arr[start:i])
            start = i

    runs.append(arr[start:])
    return runs
```

## Timsort: Production-Grade Sorting

Python and Java use **Timsort**, combining merge sort and insertion sort.

### Key Ideas

1. **Find natural runs**: Exploit existing order
2. **Minimum run size**: Force short runs to minimum length using insertion sort
3. **Merge strategy**: Maintain stack invariant for balanced merges
4. **Galloping mode**: Binary search during merge when one run dominates

### Performance

- Best case: O(n) for nearly sorted data
- Worst case: O(n log n)
- Stable: Yes
- Space: O(n)

```python
# Python's sort is Timsort
arr.sort()  # In-place, stable, adaptive
sorted(arr)  # Returns new list, stable, adaptive
```

## In-Place vs Out-of-Place

### In-Place Sorting

Uses O(1) or O(log n) extra space.

**Advantages**:
- Memory efficient
- Cache friendly
- No allocation overhead

**Examples**: Quick sort, heap sort, insertion sort

### Out-of-Place Sorting

Uses O(n) extra space.

**Advantages**:
- Often simpler to implement
- Can be stable more easily
- May have better cache behavior for linked structures

**Examples**: Merge sort, counting sort

## Cache Considerations

Modern CPUs have multi-level caches. Cache-friendly algorithms perform better.

### Sequential Access

```python
# Good: Sequential access
for i in range(n):
    process(arr[i])

# Bad: Random access
for i in random_order:
    process(arr[i])
```

### Merge Sort vs Quick Sort

**Quick Sort**:
- In-place partitioning has good locality
- Random pivot access may cause cache misses

**Merge Sort**:
- Sequential access during merge (cache friendly)
- Requires extra space (may not fit in cache)

### Block-Based Algorithms

Process data in cache-sized blocks for better performance.

## Parallel Sorting

### Parallel Merge Sort

Natural parallelism: sort halves independently, merge.

```
         [unsorted]
         /        \
    [half1]    [half2]   <- Sort in parallel
         \        /
         [merged]        <- Sequential merge
```

**Speedup**: Limited by sequential merge step.

### Parallel Quick Sort

Partition is sequential, but recursive calls can parallelize.

```python
def parallel_quicksort(arr, pool):
    if len(arr) <= threshold:
        return sequential_sort(arr)

    pivot = choose_pivot(arr)
    left, right = partition(arr, pivot)

    # Sort halves in parallel
    future_left = pool.submit(parallel_quicksort, left, pool)
    future_right = pool.submit(parallel_quicksort, right, pool)

    return future_left.result() + [pivot] + future_right.result()
```

### Sample Sort

For distributed systems:
1. Sample elements to determine splitters
2. Partition data across processors using splitters
3. Each processor sorts locally

## Choosing the Right Sort

### Decision Factors

| Factor | Recommendation |
|--------|----------------|
| Small n (< 50) | Insertion sort |
| General purpose | Quick sort or Timsort |
| Stability needed | Merge sort or Timsort |
| Memory constrained | Heap sort or quick sort |
| Nearly sorted | Insertion sort or Timsort |
| Integer keys | Counting/radix sort |
| Linked list | Merge sort |
| External data | External merge sort |

### Hybrid Approaches

Real implementations often combine algorithms:

```python
def hybrid_sort(arr, low, high):
    if high - low < THRESHOLD:
        insertion_sort(arr, low, high)
    else:
        # Quicksort or merge sort for larger arrays
        mid = partition(arr, low, high)
        hybrid_sort(arr, low, mid - 1)
        hybrid_sort(arr, mid + 1, high)
```

## External Sorting

When data doesn't fit in memory:

### External Merge Sort

1. **Run formation**: Read chunks, sort in memory, write to disk
2. **Merge phase**: Merge sorted runs using k-way merge

```python
def external_sort(input_file, output_file, memory_limit):
    # Phase 1: Create sorted runs
    runs = []
    for chunk in read_chunks(input_file, memory_limit):
        chunk.sort()
        run_file = write_to_temp(chunk)
        runs.append(run_file)

    # Phase 2: K-way merge
    k_way_merge(runs, output_file)
```

**I/O Complexity**: O((N/B) log_{M/B}(N/B)) where N = data size, M = memory, B = block size.

