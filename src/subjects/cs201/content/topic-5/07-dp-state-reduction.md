---
id: cs201-t5-state
title: "State Space Reduction"
order: 7
---

# DP State Space Reduction

When state spaces become too large, dynamic programming algorithms can exceed available memory or require prohibitive computation time. Advanced state reduction techniques transform seemingly intractable problems into solvable ones by compressing the state space, eliminating redundancy, or exploiting mathematical structure that reduces complexity.

The fundamental equation governing DP efficiency is: total complexity = (number of states) × (transition cost per state). State reduction attacks this equation by decreasing either factor—reducing states through compression or rolling arrays, or reducing transition costs through techniques like monotonic deques or matrix exponentiation.

These techniques represent the difference between a theoretical understanding of DP and the practical ability to solve challenging problems. Many competition problems and real-world applications require state reduction to be feasible.

## The Challenge

Consider the Traveling Salesman Problem. A naive approach considers all n! orderings of cities—computationally impossible for even moderate n. Bitmask DP reduces this to O(2ⁿ × n²) by recognizing that the set of visited cities matters, not their order. This is still exponential, but the difference between n! and 2ⁿ × n² is the difference between a solution that runs in microseconds (for n=15) versus one requiring more time than the age of the universe.

State reduction transforms "impossible" problems into merely "expensive" ones, or expensive problems into efficient ones. Mastering these techniques is essential for competitive programming and for real-world applications where naive DP is insufficient.

## Space Optimization

### Rolling Arrays

The most common and widely applicable optimization recognizes that many DPs only need access to the immediately previous row or layer. Instead of storing the entire table, we maintain only the current and previous rows.

**Observation**: If dp[i] depends only on dp[i-1], we need only two rows at any time.

**Before** (O(n²) space for LCS):
```python
def lcs(X, Y):
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = ...
```

**After** (O(n) space):
```python
def lcs(X, Y):
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            curr[j] = ... (using prev)
        prev, curr = curr, prev
```

This technique applies whenever the recurrence has limited lookback—when computing row i, we only need row i-1 (or perhaps i-2). The space reduction from O(n²) or O(n×W) to O(n) or O(W) can mean the difference between a feasible solution and a memory overflow.

**When it works**: dp[i] depends only on dp[i-1] (or a constant number of previous rows)

### Single Array with Careful Ordering

Sometimes we can reduce even further to a single array by carefully controlling the iteration order. The key insight is that if we process elements in the right order, we can overwrite values we no longer need.

For 0/1 knapsack, processing capacities in reverse order ensures we don't use the same item twice:

```python
def knapsack(weights, values, W):
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, weights[i] - 1, -1):  # Backwards
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
```

Processing backwards ensures dp[w - weights[i]] still contains the previous item's value when we compute dp[w]. If we processed forward, dp[w - weights[i]] might already reflect the current item, effectively allowing us to use the item multiple times.

For unbounded knapsack, we want to allow reuse, so we process forward instead. The iteration order encodes the problem constraints.

## Bitmask DP

When the state involves subsets of a collection, representing subsets as integers (bitmasks) provides both conceptual clarity and computational efficiency.

**Key insight**: An integer with n bits can represent any subset of n elements. Bit i being set indicates element i is in the subset.

Bit operations become set operations:
- `mask & (1 << i)`: Is element i in the subset?
- `mask | (1 << i)`: Add element i to the subset
- `mask & ~(1 << i)`: Remove element i from the subset
- `mask ^ (1 << i)`: Toggle element i

### Traveling Salesman Problem

The classic application of bitmask DP is TSP, where the state tracks which cities have been visited.

State: (current city, set of visited cities represented as bitmask)

```python
def tsp(dist):
    n = len(dist)
    ALL = (1 << n) - 1

    # dp[mask][i] = min cost to visit cities in mask, ending at i
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0

    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            if dp[mask][last] == float('inf'):
                continue

            for next_city in range(n):
                if mask & (1 << next_city):
                    continue
                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(
                    dp[new_mask][next_city],
                    dp[mask][last] + dist[last][next_city]
                )

    # Return to start
    return min(dp[ALL][i] + dist[i][0] for i in range(n))
```

**Time**: O(2ⁿ × n²) vs O(n!) brute force

For n=20, n! ≈ 2.4 × 10¹⁸ while 2ⁿ × n² ≈ 4.2 × 10⁸—a reduction by a factor of about 10¹⁰.

### Subset Sum with Bitmask Enumeration

For small n, enumerating all subsets via bitmasks provides a systematic approach:

```python
def subsets_with_sum(nums, target):
    n = len(nums)
    count = 0

    for mask in range(1 << n):
        total = sum(nums[i] for i in range(n) if mask & (1 << i))
        if total == target:
            count += 1

    return count
```

This O(2ⁿ × n) approach is straightforward and works well for n ≤ 20 or so.

## Dimension Reduction

### Coordinate Compression

When state values are sparse but ranges are large, we can map actual values to compressed indices.

```python
def compress(values):
    sorted_unique = sorted(set(values))
    mapping = {v: i for i, v in enumerate(sorted_unique)}
    return [mapping[v] for v in values], sorted_unique
```

**Example**: A range DP with coordinates spanning 1 to 10⁹ might only use 1000 distinct values. Compression reduces the state space from 10⁹ to 1000.

This technique is essential when the state space is defined by values rather than counts—common in scheduling, interval, and geometric DP problems.

### Meet in the Middle

Meet in the middle splits a problem in half, solves each half independently, and combines results. This transforms exponential algorithms by taking the square root of the exponent.

**Problem**: Count subsets summing to S in an array of n elements.

**Naive**: O(2ⁿ)

**Meet in the middle**: O(2^(n/2) × n)

```python
def meet_in_middle_subset_sum(arr, target):
    n = len(arr)
    half = n // 2

    # All sums of first half
    left_sums = defaultdict(int)
    for mask in range(1 << half):
        s = sum(arr[i] for i in range(half) if mask & (1 << i))
        left_sums[s] += 1

    # Match with second half
    count = 0
    for mask in range(1 << (n - half)):
        s = sum(arr[half + i] for i in range(n - half) if mask & (1 << i))
        count += left_sums[target - s]

    return count
```

For n=40, naive would be 2⁴⁰ ≈ 10¹², while meet in the middle is 2 × 2²⁰ ≈ 2 × 10⁶—feasible on modern hardware.

## Profile DP

For grid problems, we can represent just the "profile" or boundary of the current computation state rather than the entire grid.

### Broken Profile DP

Grid problems like domino tiling can be solved by maintaining only the profile of which cells are filled:

```python
def count_tilings(n, m):
    """Count ways to tile n×m grid with 1×2 dominoes."""
    if (n * m) % 2:
        return 0

    # State: which cells in current row are filled (from above)
    dp = {0: 1}

    for row in range(n):
        for col in range(m):
            new_dp = defaultdict(int)
            for mask, count in dp.items():
                # Current cell is filled from above
                if mask & (1 << col):
                    # Must leave empty for potential horizontal domino
                    new_dp[mask ^ (1 << col)] += count
                else:
                    # Place vertical domino (fills this cell and next row)
                    new_dp[mask | (1 << col)] += count

                    # Place horizontal domino (if space)
                    if col + 1 < m and not (mask & (1 << (col + 1))):
                        new_dp[mask] += count

            dp = new_dp

    return dp.get(0, 0)
```

**Time**: O(nm × 2ᵐ) instead of O(2^(nm))

The state captures only the boundary between processed and unprocessed regions, which is O(2ᵐ) rather than O(2^(nm)).

## Cycle-Based Optimization

### Matrix Exponentiation

When transitions follow a fixed pattern, we can represent the DP as matrix multiplication and use fast exponentiation.

```python
def matrix_mult(A, B, mod):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod
    return C

def matrix_pow(M, p, mod):
    n = len(M)
    result = [[1 if i == j else 0 for j in range(n)] for i in range(n)]

    while p:
        if p & 1:
            result = matrix_mult(result, M, mod)
        M = matrix_mult(M, M, mod)
        p >>= 1

    return result
```

**Example**: Computing Fibonacci in O(log n):

```python
def fibonacci(n, mod):
    if n <= 1:
        return n
    M = [[1, 1], [1, 0]]
    result = matrix_pow(M, n - 1, mod)
    return result[0][0]
```

The Fibonacci recurrence f(n) = f(n-1) + f(n-2) can be written as matrix multiplication: [f(n), f(n-1)]ᵀ = M × [f(n-1), f(n-2)]ᵀ where M = [[1,1],[1,0]]. Thus f(n) is the top-left entry of M^(n-1).

This technique applies to any linear recurrence with constant coefficients and reduces O(n) linear scans to O(k³ log n) where k is the recurrence order.

## Monotonic Deque Optimization

When transitions involve min or max over a sliding window, monotonic deques reduce per-element cost from O(k) to O(1) amortized.

```python
from collections import deque

def sliding_window_max(arr, k):
    """Max in each window of size k."""
    dq = deque()  # Store indices
    result = []

    for i in range(len(arr)):
        # Remove old elements (outside window)
        while dq and dq[0] <= i - k:
            dq.popleft()

        # Remove smaller elements (they can never be the max)
        while dq and arr[dq[-1]] <= arr[i]:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(arr[dq[0]])

    return result
```

The deque maintains indices in decreasing order of values. Each element is added and removed at most once, giving O(n) total time regardless of window size.

This optimization applies to DP recurrences of the form dp[i] = min/max over dp[j] for j in a range.

## Techniques Summary

| Technique | What It Reduces | When to Use |
|-----------|-----------------|-------------|
| Rolling Array | Space | Only previous row needed |
| Bitmask DP | State count | Small subsets (n ≤ 20) |
| Coordinate Compression | State range | Sparse values |
| Meet in Middle | Time | 2ⁿ → 2^(n/2) |
| Profile DP | States | Grid with local dependencies |
| Matrix Exponentiation | Time | Fixed transition, large n |
| Monotonic Deque | Transition cost | Sliding window min/max |

## Recognizing Optimization Opportunities

When facing a DP problem that seems too slow or memory-intensive, ask:

1. **Do I need all previous states?** If only the last row matters, use rolling arrays.

2. **Can states be represented as bitmasks?** For n ≤ 20-25, subset states are tractable.

3. **Are coordinate values sparse?** Compression can reduce state range dramatically.

4. **Can I split the problem?** Meet in the middle squares the improvement.

5. **Is the transition matrix constant?** Matrix exponentiation handles large n efficiently.

6. **Does the recurrence involve range min/max?** Monotonic deques give constant-time transitions.

7. **Can I represent just a boundary rather than the full grid?** Profile DP reduces grid problems.

Mastering these techniques transforms seemingly intractable problems into solvable ones—often the difference between a solution that times out and one that runs comfortably within limits.
