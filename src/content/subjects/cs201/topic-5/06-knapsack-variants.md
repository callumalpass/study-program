# Knapsack Problem Variants

The knapsack problem is a cornerstone of combinatorial optimization with profound practical importance. From cargo loading and resource allocation to financial portfolio optimization and cryptography, knapsack variants appear throughout computer science and operations research. Understanding the landscape of knapsack variants—each with different constraints and solution strategies—helps recognize when a new problem fits an established pattern.

The classic knapsack scenario involves a thief with a limited-capacity knapsack who must decide which items to steal to maximize total value without exceeding the weight limit. While this framing is simple, the mathematical structure applies to any resource-constrained optimization: allocating a budget across investments, scheduling tasks within time limits, or packing shipping containers.

Each variant changes the constraints slightly, which profoundly affects the solution approach. Some variants require dynamic programming, others yield to greedy algorithms, and some have polynomial-time solutions while others remain NP-complete. Developing intuition for these differences is essential for efficient algorithm design.

## Classic 0/1 Knapsack

The 0/1 Knapsack is the foundational variant: each item can be used at most once—we either take it (1) or leave it (0). This binary choice gives the problem its name and creates the need for dynamic programming.

**Problem**: Given n items with weights w[i] and values v[i], and capacity W, maximize total value without exceeding the weight limit.

**Constraint**: Each item used at most once.

The key insight is that for each item, we make a binary decision: include or exclude. The optimal solution to the full problem depends on optimal solutions to subproblems considering fewer items or smaller capacities—this optimal substructure makes DP possible.

### Standard DP Solution

The state dp[i][w] represents the maximum value achievable using the first i items with capacity w. For each item, we either skip it (keeping dp[i-1][w]) or take it (if it fits), adding its value to the best solution with reduced capacity.

```python
def knapsack_01(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            # Don't take item i
            dp[i][w] = dp[i - 1][w]
            # Take item i (if possible)
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w],
                               dp[i - 1][w - weights[i - 1]] + values[i - 1])

    return dp[n][W]
```

**Time**: O(nW), **Space**: O(nW)

The pseudo-polynomial nature of this complexity is crucial to understand: W is a number, not a count. If W is encoded in binary (using log W bits), the algorithm is actually exponential in the input size. This is why 0/1 Knapsack remains NP-complete despite having this practical algorithm.

### Space Optimization

Since each row only depends on the previous row, we can reduce space from O(nW) to O(W). The key insight is processing capacities in reverse order to avoid overwriting values we still need.

```python
def knapsack_01_optimized(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)

    for i in range(n):
        for w in range(W, weights[i] - 1, -1):  # Backwards!
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]
```

**Space**: O(W)

Processing backwards ensures that when we compute dp[w], the value dp[w - weights[i]] still represents the previous item's row—it hasn't been overwritten yet.

## Unbounded Knapsack

In the unbounded variant, each item can be used unlimited times. This models scenarios like buying multiple units of products or cutting rods into repeated lengths.

**Constraint**: Each item can be used unlimited times.

```python
def knapsack_unbounded(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)

    for w in range(1, W + 1):
        for i in range(n):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]
```

Notice the key difference from 0/1: we process forward through capacities, and we can reuse the same capacity value because items can repeat. The alternative formulation processes by item with forward iteration:

```python
def knapsack_unbounded_alt(weights, values, W):
    dp = [0] * (W + 1)

    for i in range(len(weights)):
        for w in range(weights[i], W + 1):  # Forwards
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]
```

## Bounded Knapsack

The bounded variant limits how many times each item can be used: item i can be selected at most count[i] times. This models inventory constraints or limited availability.

**Constraint**: Item i can be used at most count[i] times.

### Binary Decomposition

The elegant approach converts bounded knapsack to 0/1 by decomposing item counts into powers of two. An item with count=5 becomes three virtual items with counts 1, 2, and 2 (since 1+2+2=5). Any usage from 0 to 5 can be expressed by selecting some subset of these virtual items.

```python
def knapsack_bounded(weights, values, counts, W):
    # Expand items using binary decomposition
    expanded_w = []
    expanded_v = []

    for i in range(len(weights)):
        remaining = counts[i]
        k = 1
        while k <= remaining:
            expanded_w.append(weights[i] * k)
            expanded_v.append(values[i] * k)
            remaining -= k
            k *= 2
        if remaining > 0:
            expanded_w.append(weights[i] * remaining)
            expanded_v.append(values[i] * remaining)

    # Now solve as 0/1
    return knapsack_01_optimized(expanded_w, expanded_v, W)
```

**Time**: O(W × Σ log(count[i]))

Binary decomposition is a powerful technique that reduces any bounded problem to 0/1 with only logarithmic blowup in the number of items.

## Subset Sum

Subset sum asks whether items can be selected to exactly fill a target capacity—there's no optimization, just a feasibility question. It's a special case of 0/1 knapsack where value equals weight.

**Problem**: Can we select items to exactly fill capacity W?

```python
def subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for t in range(target, num - 1, -1):
            dp[t] = dp[t] or dp[t - num]

    return dp[target]
```

The boolean DP tracks reachability: dp[t] is true if we can form sum t using some subset.

### Counting Subsets

Counting how many subsets sum to the target requires tracking counts instead of boolean values:

```python
def count_subsets(nums, target):
    dp = [0] * (target + 1)
    dp[0] = 1

    for num in nums:
        for t in range(target, num - 1, -1):
            dp[t] += dp[t - num]

    return dp[target]
```

## Partition Problem

The partition problem asks whether an array can be divided into two subsets with equal sums—a direct application of subset sum.

```python
def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False

    target = total // 2
    return subset_sum(nums, target)
```

If the total is odd, partition is impossible. Otherwise, finding a subset summing to half the total automatically creates two equal partitions.

## Minimum Partition Difference

When exact partition isn't possible, we might want to minimize the difference between two partition sums—useful for fair division problems.

```python
def min_partition_diff(nums):
    total = sum(nums)
    half = total // 2

    dp = [False] * (half + 1)
    dp[0] = True

    for num in nums:
        for t in range(half, num - 1, -1):
            dp[t] = dp[t] or dp[t - num]

    # Find largest achievable sum <= half
    for t in range(half, -1, -1):
        if dp[t]:
            return total - 2 * t
```

We find the largest achievable sum not exceeding half the total. The difference between partitions is then (total - t) - t = total - 2t.

## Coin Change Variants

Coin change problems are knapsack variants with different optimization objectives.

### Minimum Coins

Finding the fewest coins to make a target amount—an unbounded knapsack variant minimizing count rather than maximizing value.

```python
def min_coins(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
```

### Counting Ways to Make Change

Counting distinct ways to form an amount—each way uses the same coins but in different combinations (order doesn't matter).

```python
def count_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] += dp[a - coin]

    return dp[amount]
```

### Counting Permutations (Order Matters)

When order matters, we count permutations rather than combinations—different sequences of the same coins count separately.

```python
def count_permutations(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] += dp[a - coin]

    return dp[amount]
```

The critical difference is loop order: iterating amounts in the outer loop counts each ordering separately.

## Multi-dimensional Knapsack

Real-world problems often have multiple constraints simultaneously—weight AND volume, time AND budget, etc.

**Problem**: Optimize subject to multiple resource constraints.

```python
def knapsack_2d(weights, volumes, values, W, V):
    n = len(weights)
    dp = [[0] * (V + 1) for _ in range(W + 1)]

    for i in range(n):
        for w in range(W, weights[i] - 1, -1):
            for v in range(V, volumes[i] - 1, -1):
                dp[w][v] = max(dp[w][v],
                               dp[w - weights[i]][v - volumes[i]] + values[i])

    return dp[W][V]
```

**Time**: O(n × W × V)

Each additional dimension multiplies the state space, so problems with many constraints become computationally challenging.

## Group Knapsack

In group knapsack, items are organized into groups, and we can select at most one item from each group—modeling mutually exclusive choices.

```python
def group_knapsack(groups, W):
    """groups[g] = [(weight, value), ...]"""
    dp = [0] * (W + 1)

    for group in groups:
        for w in range(W, -1, -1):
            for weight, value in group:
                if weight <= w:
                    dp[w] = max(dp[w], dp[w - weight] + value)

    return dp[W]
```

The key is processing each group completely before moving to the next, ensuring at most one item per group is selected.

## Fractional Knapsack

Unlike all previous variants, fractional knapsack allows taking portions of items—and this changes everything. When items are divisible, a simple greedy algorithm is optimal.

```python
def fractional_knapsack(weights, values, W):
    items = sorted(zip(values, weights),
                   key=lambda x: x[0] / x[1],
                   reverse=True)

    total_value = 0
    remaining = W

    for value, weight in items:
        if weight <= remaining:
            total_value += value
            remaining -= weight
        else:
            total_value += value * (remaining / weight)
            break

    return total_value
```

Greedy works because we can always take more of the highest-value-per-weight item without regret—there's no binary constraint forcing suboptimal local choices.

## Problem Identification Guide

Recognizing which variant applies is often the key insight for solving a new problem:

| Constraint | Variant |
|------------|---------|
| Use each item once | 0/1 Knapsack |
| Unlimited use | Unbounded Knapsack |
| Limited count per item | Bounded Knapsack |
| Exactly fill capacity | Subset Sum |
| Equal partition | Partition Problem |
| Order matters | Permutation counting |
| Multiple resource limits | Multi-dimensional Knapsack |
| Mutually exclusive groups | Group Knapsack |
| Fractions allowed | Fractional Knapsack (Greedy) |

## Complexity Summary

| Variant | Time | Space |
|---------|------|-------|
| 0/1 | O(nW) | O(W) |
| Unbounded | O(nW) | O(W) |
| Bounded | O(W Σlog c[i]) | O(W) |
| Subset Sum | O(nW) | O(W) |
| Coin Change | O(nW) | O(W) |
| Multi-dim | O(nW₁W₂...Wₖ) | O(W₁W₂...Wₖ) |

Understanding knapsack variants deeply means recognizing the subtle differences in constraints that determine the appropriate algorithm—the difference between a polynomial solution and an intractable problem often lies in these details.
