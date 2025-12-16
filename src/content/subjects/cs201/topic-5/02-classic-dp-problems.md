# Classic Dynamic Programming Problems

These fundamental DP problems illustrate common patterns and techniques. Mastering them builds intuition for recognizing DP opportunities.

## 0/1 Knapsack

**Problem**: Given items with weights and values, maximize value within weight capacity. Each item used at most once.

```python
def knapsack_01(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value using items 0..i-1 with capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i-1
            dp[i][w] = dp[i-1][w]
            # Take item i-1 if possible
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]
```

**Time**: O(n × W), **Space**: O(n × W) or O(W) with optimization

### Space-Optimized

```python
def knapsack_01_optimized(weights, values, capacity):
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        # Traverse backwards to avoid using same item twice
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]
```

## Longest Common Subsequence (LCS)

**Problem**: Find longest subsequence common to two strings.

```python
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]
```

**Reconstructing the LCS**:

```python
def lcs_string(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Backtrack
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]:
            result.append(s1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(result))
```

## Edit Distance (Levenshtein)

**Problem**: Minimum operations (insert, delete, replace) to transform one string to another.

```python
def edit_distance(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all from s1
    for j in range(n + 1):
        dp[0][j] = j  # Insert all into s1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]  # No operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # Delete from s1
                    dp[i][j-1],      # Insert into s1
                    dp[i-1][j-1]     # Replace in s1
                )

    return dp[m][n]
```

## Coin Change

**Problem**: Minimum coins to make amount (unlimited supply of each denomination).

```python
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
```

**Counting ways**:

```python
def coin_change_ways(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]
```

## Longest Increasing Subsequence (LIS)

**O(n²) solution**:

```python
def lis(nums):
    n = len(nums)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

**O(n log n) solution using binary search**:

```python
import bisect

def lis_optimized(nums):
    tails = []  # tails[i] = smallest ending element of LIS length i+1

    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)
```

## Matrix Chain Multiplication

**Problem**: Minimize scalar multiplications for matrix chain product.

```python
def matrix_chain(dims):
    """dims[i] = rows of matrix i = cols of matrix i-1"""
    n = len(dims) - 1  # Number of matrices
    dp = [[0] * n for _ in range(n)]

    # l = chain length
    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = (dp[i][k] + dp[k+1][j] +
                       dims[i] * dims[k+1] * dims[j+1])
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n-1]
```

## Rod Cutting

**Problem**: Maximize revenue from cutting rod of length n.

```python
def rod_cutting(prices, n):
    """prices[i] = price of rod of length i+1"""
    dp = [0] * (n + 1)

    for i in range(1, n + 1):
        for j in range(1, i + 1):
            if j <= len(prices):
                dp[i] = max(dp[i], prices[j-1] + dp[i-j])

    return dp[n]
```

## Problem Pattern Recognition

| Pattern | Example Problems |
|---------|------------------|
| Linear DP | LIS, House Robber, Climbing Stairs |
| Grid DP | Unique Paths, Min Path Sum |
| String DP | LCS, Edit Distance, Palindrome |
| Interval DP | Matrix Chain, Burst Balloons |
| Subset DP | Knapsack, Partition Equal Subset |
| Tree DP | House Robber III, Binary Tree Maximum Path |

## Key Insights

1. **Identify subproblems**: What decisions lead to optimal?
2. **Define state clearly**: What do indices represent?
3. **Write recurrence**: How do larger problems decompose?
4. **Handle base cases**: What are trivial subproblems?
5. **Optimize space**: Often only need previous row/few values
