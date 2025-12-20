---
id: cs201-t8-patterns
title: "Algorithm Design Patterns"
order: 3
---

# Algorithm Design Patterns and Strategies

Algorithm design is pattern recognition. Experienced algorithm designers don't invent solutions from scratch—they recognize problem structures that match known patterns and apply appropriate techniques. Two pointers for array problems, binary search the answer for optimization, meet in the middle for exponential search spaces, reduce to sorting when order matters. Building this pattern library accelerates problem solving dramatically.

Reduction is perhaps the most powerful meta-technique. When facing an unfamiliar problem, ask: can I transform it into a problem I already know how to solve? Element distinctness reduces to sorting. Convex hull has a sorting lower bound because sorting reduces to it. Understanding reductions reveals problem relationships and transfers algorithmic knowledge across domains.

These meta-strategies complement the major paradigms (divide and conquer, dynamic programming, greedy algorithms). While paradigms provide high-level structure, techniques like two pointers, sliding windows, and meet in the middle provide tactical tools for specific subproblems. A skilled algorithm designer combines strategic paradigm selection with tactical technique application to construct efficient solutions.

## Reduction

Transform an unfamiliar problem into a known one.

### Example: Element Distinctness

**Problem**: Are all elements in array distinct?

**Reduction to sorting**:
1. Sort the array: O(n log n)
2. Check adjacent elements: O(n)
3. Duplicates exist iff any adjacent pair is equal

```python
def all_distinct(arr):
    sorted_arr = sorted(arr)
    for i in range(len(arr) - 1):
        if sorted_arr[i] == sorted_arr[i + 1]:
            return False
    return True
```

### Example: Convex Hull → Sorting

The convex hull problem has a lower bound of Ω(n log n) because sorting reduces to it:

1. Given n numbers to sort
2. Map each x to point (x, x²)
3. Compute convex hull
4. Walk hull to get sorted order

### Reduction Hierarchy

```
Harder problems
     ↑
     | reduce to
     |
Easier problems
```

If A reduces to B:
- B at least as hard as A
- Algorithm for B solves A

## Problem Transformation

### Complementary Problems

Instead of finding X, find "not X":
- Shortest path → Longest path (negate weights)
- Maximum → Minimum
- Count satisfying → Count not satisfying

### Dual Problems

**Primal**: Minimize cost subject to constraints
**Dual**: Maximize bound subject to different constraints

Often easier to solve or bound one via the other.

### Parameter Space Search

Instead of directly computing answer, binary search for it:

```python
def find_minimum_x(predicate):
    """Find minimum x where predicate(x) is True"""
    lo, hi = 0, MAX_VALUE

    while lo < hi:
        mid = (lo + hi) // 2
        if predicate(mid):
            hi = mid
        else:
            lo = mid + 1

    return lo
```

**Example**: Minimum time to complete k tasks → Binary search on time

## Two Pointers Technique

Maintain two indices that systematically explore the solution space.

### Same Direction

Both pointers move in same direction (sliding window).

```python
def longest_subarray_sum_at_most_k(arr, k):
    """Longest subarray with sum ≤ k (positive elements)"""
    n = len(arr)
    left = 0
    current_sum = 0
    max_length = 0

    for right in range(n):
        current_sum += arr[right]

        while current_sum > k and left <= right:
            current_sum -= arr[left]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length
```

**Time**: O(n) - each element processed at most twice

### Opposite Direction

Pointers start at ends and move toward each other.

```python
def two_sum_sorted(arr, target):
    """Find pair summing to target in sorted array"""
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return None
```

### Three Pointers (and beyond)

```python
def three_sum(arr, target):
    """Find triplet summing to target"""
    arr.sort()
    n = len(arr)
    results = []

    for i in range(n - 2):
        if i > 0 and arr[i] == arr[i-1]:
            continue

        left, right = i + 1, n - 1
        while left < right:
            total = arr[i] + arr[left] + arr[right]
            if total == target:
                results.append((arr[i], arr[left], arr[right]))
                left += 1
                right -= 1
            elif total < target:
                left += 1
            else:
                right -= 1

    return results
```

## Meet in the Middle

Split problem in half, solve each half, combine results.

### Subset Sum (Large Weights)

**Problem**: Does any subset sum to target?

**Standard DP**: O(n × target) - bad if target is large

**Meet in middle**: O(2^(n/2) × n)

```python
def subset_sum_meet_middle(arr, target):
    n = len(arr)
    mid = n // 2

    # Generate all subset sums for first half
    left_sums = set()
    for mask in range(1 << mid):
        s = sum(arr[i] for i in range(mid) if mask & (1 << i))
        left_sums.add(s)

    # Check if any right half subset complements to target
    for mask in range(1 << (n - mid)):
        s = sum(arr[mid + i] for i in range(n - mid) if mask & (1 << i))
        if target - s in left_sums:
            return True

    return False
```

### 4-Sum Problem

```python
def four_sum(arr, target):
    """Find four elements summing to target"""
    n = len(arr)
    pair_sums = {}

    # Store all pair sums with their indices
    for i in range(n):
        for j in range(i + 1, n):
            s = arr[i] + arr[j]
            if s not in pair_sums:
                pair_sums[s] = []
            pair_sums[s].append((i, j))

    # Find complementary pairs
    for s, pairs in pair_sums.items():
        complement = target - s
        if complement in pair_sums:
            for i, j in pairs:
                for k, l in pair_sums[complement]:
                    if len({i, j, k, l}) == 4:
                        return [arr[i], arr[j], arr[k], arr[l]]

    return None
```

**Time**: O(n²) instead of O(n⁴)

## Amortized Analysis Techniques

### Aggregate Method

Total cost over n operations, divided by n.

**Example**: Dynamic array doubling
- n insertions cost at most 1 + 2 + 4 + ... + n ≤ 3n
- Amortized cost: O(1) per insertion

### Accounting Method

Assign "charges" to operations, save excess for expensive operations.

**Example**: Stack with multipop
- Push: charge 2 (1 for push, 1 saved)
- Pop/Multipop: use saved credits
- Each element popped was previously pushed
- Amortized O(1) per operation

### Potential Method

Define potential function Φ measuring "stored work":
- Amortized cost = actual cost + ΔΦ
- Choose Φ so expensive operations decrease potential

**Example**: Binary counter increments
- Φ = number of 1-bits
- Flip 0→1: actual=1, ΔΦ=+1, amortized=2
- Flip 1→0: actual=1, ΔΦ=-1, amortized=0
- Total amortized for any increment: O(1)

## Randomization Strategies

### Las Vegas Algorithms

Always correct, expected running time is good.

```python
import random

def randomized_quicksort(arr):
    """Always produces sorted array, expected O(n log n)"""
    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return randomized_quicksort(left) + mid + randomized_quicksort(right)
```

### Monte Carlo Algorithms

Probably correct, always fast.

```python
def miller_rabin_primality(n, k=40):
    """Probably prime if returns True, definitely composite if False"""
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 as 2^r × d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    # Witness loop
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False

    return True
```

**Error probability**: ≤ 4^(-k)

## Incremental Construction

Build solution piece by piece, maintaining invariants.

### Graham Scan (Convex Hull)

```python
def graham_scan(points):
    """Build convex hull incrementally"""
    # Find bottom-most point
    start = min(points, key=lambda p: (p[1], p[0]))

    # Sort by polar angle from start
    def polar_angle(p):
        return math.atan2(p[1] - start[1], p[0] - start[0])

    sorted_points = sorted(points, key=polar_angle)

    # Build hull
    hull = []
    for p in sorted_points:
        while len(hull) >= 2 and cross(hull[-2], hull[-1], p) <= 0:
            hull.pop()
        hull.append(p)

    return hull

def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
```

### Online Algorithms

Process input as it arrives, making irrevocable decisions.

**Competitive ratio**: Compare online solution to optimal offline solution.

## Problem-Solving Checklist

1. **Understand the problem**
   - What's the input/output?
   - What are the constraints?
   - What are edge cases?

2. **Find similar problems**
   - Can this reduce to a known problem?
   - What paradigm fits?

3. **Start simple**
   - What's the brute force solution?
   - What's its complexity?

4. **Identify inefficiencies**
   - What work is repeated?
   - What information is discarded but useful?

5. **Apply techniques**
   - Can we sort/preprocess?
   - Can we use two pointers?
   - Is there optimal substructure?
   - Can we binary search the answer?

6. **Verify correctness**
   - Does it handle edge cases?
   - Can we prove it works?

7. **Analyze complexity**
   - Time and space
   - Best/worst/average case

