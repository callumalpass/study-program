# Dynamic Programming

## Introduction

Dynamic Programming (DP) is an optimization technique for solving problems by breaking them down into simpler sub-problems. It is similar to Divide and Conquer, but with a key difference: in DP, **sub-problems overlap**.

Instead of re-calculating the same sub-problem again and again, DP solves each sub-problem once and stores the result (usually in a table or array). This technique is called **Memoization** (top-down) or **Tabulation** (bottom-up).

## Learning Objectives

By the end of this topic, you will be able to:
1.  Identify problems suitable for DP (Optimal Substructure and Overlapping Subproblems).
2.  Implement DP solutions using **Memoization** (Recursion + Caching).
3.  Implement DP solutions using **Tabulation** (Iterative).
4.  Solve classic DP problems: Fibonacci, Climbing Stairs, Longest Common Subsequence, and Knapsack.

## Core Concepts

### 1. The Two Properties

-   **Optimal Substructure:** The optimal solution to the original problem can be constructed from the optimal solutions of its sub-problems.
-   **Overlapping Subproblems:** The problem can be broken down into sub-problems which are reused several times. (e.g., in Fibonacci, `fib(5)` calls `fib(4)` and `fib(3)`. `fib(4)` calls `fib(3)` and `fib(2)`. `fib(3)` is calculated twice).

### 2. Memoization (Top-Down)

Write the recursive solution first. Then, add a cache (hash map or array) to store results. Before computing `func(x)`, check if `x` is in the cache.

**Pros:** Intuitive, solves only necessary sub-problems.
**Cons:** Recursion overhead, stack limit risks.

### 3. Tabulation (Bottom-Up)

Solve the smallest sub-problems first and fill up a table (array) up to the target value.

**Pros:** No recursion overhead, space-efficient (sometimes).
**Cons:** Computes all sub-problems, even if some aren't needed.

### 4. Code Examples

**Fibonacci (Naive Recursive - $O(2^n)$):**
```python
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
```

**Fibonacci (Memoization - $O(n)$):**
```python
memo = {}
def fib_memo(n):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]
```

**Fibonacci (Tabulation - $O(n)$):**
```python
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### 5. Classic Problems

-   **0/1 Knapsack:** Choose items with weight/value to maximize value within capacity $W$.
-   **Longest Common Subsequence (LCS):** Find length of longest subsequence present in two strings.
-   **Coin Change:** Min coins to make amount $X$.

## Common Mistakes

1.  **Confusing Greedy with DP:** Greedy algorithms make the best local choice at each step. DP considers *all* choices (via sub-problems) to find the global optimum.
2.  **Incorrect Base Cases:** Failing to initialize the DP table correctly (e.g., setting everything to 0 when negatives are possible).
3.  **Off-by-one Errors:** Array indices in DP are tricky. Usually, a table of size `n+1` is needed to handle the `0` case.

## Best Practices

1.  **Find the Recurrence:** Write down the math first. $dp[i] = \max(dp[i-1], dp[i-2] + val[i])$.
2.  **Define State:** What variables uniquely define a sub-problem? (e.g., `index` in array, `current_weight`). The number of state variables determines the dimensionality of your DP table (1D, 2D, 3D).
3.  **Space Optimization:** If `dp[i]` only depends on `dp[i-1]`, you don't need an array of size $N$. You just need two variables. This reduces space from $O(n)$ to $O(1)$.

## Summary

Dynamic Programming transforms exponential time algorithms into polynomial time algorithms.
-   **Recipe:** Recursion -> Memoization -> Tabulation -> Space Optimization.
-   If you see "Minimize", "Maximize", or "Count ways" with overlapping sub-problems, think DP.
