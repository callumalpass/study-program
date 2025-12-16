# Dynamic Programming Optimization Techniques

Standard DP can be slow or memory-intensive. These optimization techniques reduce complexity and make challenging problems tractable.

## Space Optimization

### Rolling Arrays

When dp[i] depends only on dp[i-1]:

**Before** (O(n) space):
```python
dp = [0] * n
for i in range(1, n):
    dp[i] = f(dp[i-1])
```

**After** (O(1) space):
```python
prev = 0
for i in range(1, n):
    prev = f(prev)
```

### Example: Fibonacci

```python
def fib_space_optimized(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
```

### Two-Row Optimization

For 2D DP where dp[i][j] depends only on row i-1:

```python
def unique_paths_optimized(m, n):
    prev = [1] * n
    curr = [1] * n

    for i in range(1, m):
        for j in range(1, n):
            curr[j] = prev[j] + curr[j-1]
        prev, curr = curr, prev

    return prev[n-1]
```

**Space**: O(n) instead of O(m×n)

### Single-Row Optimization

Often possible when row only depends on same row and previous row:

```python
def unique_paths_single_row(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]  # dp[j] is prev[j], dp[j-1] is curr[j-1]
    return dp[n-1]
```

## Memoization with Limited Cache

Use LRU cache when state space is huge but actual states visited are few:

```python
from functools import lru_cache

@lru_cache(maxsize=10000)
def solve(state):
    # ... recursive solution
    pass
```

## State Compression

When state involves subsets, use bitmask representation.

### Traveling Salesman (Held-Karp)

**State**: (visited cities bitmask, current city)

```python
def tsp_dp(dist):
    n = len(dist)
    # dp[mask][i] = min cost to visit cities in mask, ending at i
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0

    for mask in range(1, 1 << n):
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
    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in range(n))
```

**Time**: O(n² × 2ⁿ) instead of O(n!)

### Subset Sum with Bitmask

```python
def count_subsets_with_sum(arr, target):
    n = len(arr)
    count = 0
    for mask in range(1 << n):
        total = sum(arr[i] for i in range(n) if mask & (1 << i))
        if total == target:
            count += 1
    return count
```

## Divide and Conquer Optimization

For recurrences of form:

```
dp[i][j] = min(dp[i-1][k] + cost(k, j)) for k < j
```

When optimal k increases monotonically with j, use divide and conquer:

```python
def solve_dc(i, j_left, j_right, k_left, k_right, dp, cost):
    if j_left > j_right:
        return

    j_mid = (j_left + j_right) // 2
    best_k = k_left
    best_val = float('inf')

    for k in range(k_left, min(k_right, j_mid) + 1):
        val = dp[i-1][k] + cost(k, j_mid)
        if val < best_val:
            best_val = val
            best_k = k

    dp[i][j_mid] = best_val

    solve_dc(i, j_left, j_mid - 1, k_left, best_k, dp, cost)
    solve_dc(i, j_mid + 1, j_right, best_k, k_right, dp, cost)
```

**Reduces**: O(n²) per layer to O(n log n)

## Convex Hull Trick

For recurrences: dp[i] = min(dp[j] + b[j] × a[i]) where slopes b[j] are monotonic.

Maintain convex hull of lines y = b[j] × x + dp[j].

```python
from collections import deque

def convex_hull_trick(n, a, b, c):
    """
    dp[i] = min(dp[j] + b[j] * a[i] + c[i]) for j < i
    Assumes b[j] is decreasing (or increasing, adjust accordingly)
    """
    dp = [0] * n
    # Store (slope, intercept) pairs
    hull = deque()

    def bad(l1, l2, l3):
        # Check if l2 is unnecessary
        return (l3[1] - l1[1]) * (l1[0] - l2[0]) <= \
               (l2[1] - l1[1]) * (l1[0] - l3[0])

    def query(x):
        while len(hull) > 1 and \
              hull[0][0] * x + hull[0][1] >= hull[1][0] * x + hull[1][1]:
            hull.popleft()
        return hull[0][0] * x + hull[0][1]

    for i in range(n):
        if hull:
            dp[i] = query(a[i]) + c[i]

        line = (b[i], dp[i])
        while len(hull) > 1 and bad(hull[-2], hull[-1], line):
            hull.pop()
        hull.append(line)

    return dp[n-1]
```

**Reduces**: O(n²) to O(n)

## Knuth's Optimization

For DP: dp[i][j] = min(dp[i][k] + dp[k][j]) + cost[i][j] where optimal k is monotonic.

If opt[i][j-1] ≤ opt[i][j] ≤ opt[i+1][j], then:

```python
def knuth_optimization(cost):
    n = len(cost)
    dp = [[0] * n for _ in range(n)]
    opt = [[0] * n for _ in range(n)]

    for i in range(n):
        opt[i][i] = i

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')

            for k in range(opt[i][j-1], opt[i+1][j] + 1):
                val = dp[i][k] + dp[k+1][j] + cost[i][j]
                if val < dp[i][j]:
                    dp[i][j] = val
                    opt[i][j] = k

    return dp[0][n-1]
```

**Reduces**: O(n³) to O(n²)

## When to Apply

| Technique | When to Use |
|-----------|-------------|
| Rolling array | Row depends on previous row only |
| Bitmask DP | Small set/subset states (n ≤ 20) |
| D&C optimization | Monotonic optimal splits |
| Convex hull trick | Linear cost functions |
| Knuth optimization | Quadrangle inequality holds |

## Recognizing Optimizable DP

1. Write naive recurrence
2. Analyze dependency structure
3. Look for:
   - Limited dependencies (space opt)
   - Monotonic optima (D&C, Knuth)
   - Linear structure (convex hull)
4. Apply appropriate technique
