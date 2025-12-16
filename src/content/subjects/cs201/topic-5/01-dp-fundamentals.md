# Dynamic Programming Fundamentals

Dynamic programming (DP) solves complex problems by breaking them into overlapping subproblems, storing results to avoid redundant computation.

## Key Characteristics

1. **Optimal substructure**: Optimal solution contains optimal solutions to subproblems
2. **Overlapping subproblems**: Same subproblems solved multiple times

When both properties exist, DP transforms exponential solutions into polynomial ones.

## DP vs Divide and Conquer

| Aspect | Divide & Conquer | Dynamic Programming |
|--------|-----------------|---------------------|
| Subproblems | Independent | Overlapping |
| Solving | Top-down only | Top-down or bottom-up |
| Storage | No memoization | Memoization table |
| Example | Merge sort | Fibonacci |

## Classic Example: Fibonacci

### Naive Recursion: O(2ⁿ)

```python
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n-1) + fib_naive(n-2)
```

**Problem**: fib(5) computes fib(3) twice, fib(2) three times, etc.

### Top-Down with Memoization: O(n)

```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

### Bottom-Up Tabulation: O(n)

```python
def fib_table(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### Space-Optimized: O(1)

```python
def fib_optimized(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
```

## DP Design Process

### Step 1: Define the State

What information do we need to describe a subproblem?

**Fibonacci**: State = index n
**Knapsack**: State = (item index, remaining capacity)

### Step 2: Write the Recurrence

Express the solution in terms of smaller subproblems.

```
fib(n) = fib(n-1) + fib(n-2)
```

### Step 3: Identify Base Cases

What are the smallest subproblems with known answers?

```
fib(0) = 0
fib(1) = 1
```

### Step 4: Determine Computation Order

For bottom-up: What order ensures subproblems are solved before needed?

For Fibonacci: Compute in increasing order of n.

### Step 5: Optimize Space (if possible)

If dp[i] only depends on recent values, keep only those.

## Common DP Patterns

### 1D DP: Single Sequence

**Climbing Stairs**: Ways to reach step n (1 or 2 steps at a time)

```python
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### 2D DP: Grid Problems

**Unique Paths**: Ways to reach bottom-right of m×n grid

```python
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]
```

### Subsequence DP

**Longest Increasing Subsequence (LIS)**

```python
def length_of_lis(nums):
    n = len(nums)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

### String DP

**Edit Distance**: Minimum operations to transform word1 to word2

```python
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # Delete
                    dp[i][j-1],      # Insert
                    dp[i-1][j-1]     # Replace
                )

    return dp[m][n]
```

## Top-Down vs Bottom-Up

### Top-Down (Memoization)

**Pros**:
- Natural translation from recursion
- Computes only needed subproblems
- Easier to write for complex state spaces

**Cons**:
- Recursion overhead
- Stack overflow for deep recursion

### Bottom-Up (Tabulation)

**Pros**:
- No recursion overhead
- Can optimize space more easily
- Often faster in practice

**Cons**:
- Must determine correct order
- May compute unneeded subproblems

## State Space Optimization

### Rolling Array

When dp[i] only depends on dp[i-1]:

```python
# Before: O(n) space
dp = [0] * n
for i in range(1, n):
    dp[i] = f(dp[i-1])

# After: O(1) space
prev = 0
for i in range(1, n):
    prev = f(prev)
```

### Two Rows for 2D

When dp[i][j] only depends on row i-1:

```python
# Before: O(m*n) space
dp = [[0] * n for _ in range(m)]

# After: O(n) space
prev = [0] * n
curr = [0] * n
```

## Debugging DP

1. **Print the table**: Visualize how values propagate
2. **Verify base cases**: Most bugs start here
3. **Check recurrence on paper**: Trace through small example
4. **Validate dimensions**: Off-by-one errors are common
