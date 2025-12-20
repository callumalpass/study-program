---
id: cs201-t6-vs-dp
title: "Greedy vs Dynamic Programming"
order: 7
---

# Greedy vs Dynamic Programming

Greedy and dynamic programming represent two fundamental approaches to optimization problems. Greedy algorithms make locally optimal choices without reconsidering, hoping local optimality yields global optimality. Dynamic programming systematically considers all options, building optimal solutions from optimal subproblems. Knowing when each approach applies—and why—is essential for algorithm design.

The crucial difference is the greedy choice property. Both approaches require optimal substructure, but greedy additionally requires that a locally optimal choice be part of some globally optimal solution. When this property holds (activity selection, MST, Huffman coding), greedy algorithms are simpler and faster. When it fails (0/1 knapsack, coin change with arbitrary denominations), greedy produces suboptimal results and DP is necessary.

The comparison illuminates a fundamental trade-off in algorithm design. Greedy algorithms are typically O(n log n) or better, with simple implementations and proofs that require careful reasoning. DP algorithms are typically O(n²) or O(n × S), with more complex implementations but automatic correctness when the recurrence is correct. Mastering both approaches—and recognizing which applies to a given problem—is a core competency in algorithm design.

## Core Philosophies

### Greedy Approach

- Make locally optimal choice at each step
- Never reconsider past decisions
- Hope local optimums lead to global optimum

### Dynamic Programming

- Consider all possibilities systematically
- Store solutions to subproblems
- Build optimal solution from optimal subproblem solutions

## When Each Works

### Greedy Works When

1. **Greedy choice property**: A locally optimal choice is part of some globally optimal solution

2. **Optimal substructure**: After making a greedy choice, remaining problem has the same optimal structure

### DP Works When

1. **Optimal substructure**: Optimal solution built from optimal subproblems

2. **Overlapping subproblems**: Same subproblems solved repeatedly

**Key difference**: Greedy requires greedy choice property; DP doesn't.

## Classic Comparisons

### Coin Change

**Problem**: Minimum coins to make amount.

**Greedy approach**:
```python
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)
    count = 0
    for coin in coins:
        count += amount // coin
        amount %= coin
    return count if amount == 0 else -1
```

**Works for**: US coins (1, 5, 10, 25)
**Fails for**: coins = [1, 3, 4], amount = 6
- Greedy: 4 + 1 + 1 = 3 coins
- Optimal: 3 + 3 = 2 coins

**DP solution** (always works):
```python
def coin_change_dp(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
```

### Knapsack

**0/1 Knapsack**: Each item once

**Greedy by value/weight ratio fails**:
- Items: (value=60, weight=10), (value=100, weight=20), (value=120, weight=30)
- Capacity: 50
- Greedy takes (60/10) then (100/20) = 160
- Optimal: (100) + (120) = 220

**Fractional Knapsack**: Can take fractions

**Greedy works!** Take highest ratio items first.

**Key insight**: Greedy fails when choices are discrete (0/1), but works with continuous choices (fractions).

### Activity Selection

**Problem**: Select maximum non-overlapping activities.

| Strategy | Optimal? |
|----------|----------|
| Earliest start | No |
| Shortest duration | No |
| Fewest conflicts | No |
| **Earliest finish** | **Yes!** |

**Why earliest finish works**: Leaves maximum room for remaining activities.

```python
def activity_selection(activities):
    activities.sort(key=lambda x: x[1])  # Sort by end time
    selected = [activities[0]]
    for start, end in activities[1:]:
        if start >= selected[-1][1]:
            selected.append((start, end))
    return selected
```

**Weighted activity selection** requires DP:
```python
def weighted_activity_selection(activities):
    # activities = [(start, end, weight), ...]
    activities.sort(key=lambda x: x[1])
    n = len(activities)

    # dp[i] = max weight using first i activities
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        # Find last non-conflicting activity
        j = binary_search_last_non_conflict(activities, i)
        dp[i] = max(dp[i-1], activities[i-1][2] + dp[j])

    return dp[n]
```

## Decision Framework

```
Is there optimal substructure?
├── No → Problem may need different approach
└── Yes → Check for greedy choice property
    ├── Yes → Try greedy
    │   └── Can you prove it? → Use greedy
    └── No/Unsure → Use DP
        └── Are there overlapping subproblems?
            ├── Yes → Use DP with memoization
            └── No → Divide and conquer
```

## Proving Greedy Correctness

### Exchange Argument

1. Consider optimal solution O
2. If O differs from greedy solution G
3. Show we can modify O to match G without losing optimality
4. Conclude G is also optimal

**Example**: Activity selection

If optimal O starts with activity a ≠ first greedy choice g:
- g has earliest end time
- end(g) ≤ end(a)
- Replacing a with g in O is still valid and optimal
- Therefore G's choice is safe

### Staying Ahead

Show greedy solution is "at least as good" at every step.

**Example**: Huffman coding

Show that at each merge step, the greedy tree has cost ≤ optimal tree.

## Complexity Comparison

| Aspect | Greedy | DP |
|--------|--------|-----|
| Time | Usually O(n log n) | Usually O(n²) or O(n × S) |
| Space | Often O(1) or O(n) | Often O(n) or O(n²) |
| Implementation | Usually simpler | Can be complex |
| Correctness proof | Required | Automatic if recurrence correct |

## Hybrid Approaches

Sometimes greedy + DP works together:

### Greedy Preprocessing

Sort or preprocess, then apply DP.

```python
def weighted_intervals(intervals):
    # Greedy: Sort by end time
    intervals.sort(key=lambda x: x[1])

    # DP: Find optimal selection
    dp = [0] * (len(intervals) + 1)
    for i, (start, end, weight) in enumerate(intervals):
        j = find_last_compatible(intervals, i)
        dp[i + 1] = max(dp[i], weight + dp[j + 1])

    return dp[-1]
```

### Greedy Heuristic for DP

Use greedy solution to prune DP search space.

## Common Patterns

### Greedy Usually Works For

- Interval scheduling (by end time)
- Minimum spanning trees
- Shortest paths (non-negative weights)
- Huffman coding
- Fractional knapsack
- Making change with "nice" coin systems

### DP Usually Required For

- 0/1 Knapsack
- Longest common subsequence
- Matrix chain multiplication
- Edit distance
- Weighted interval scheduling
- General coin change

## Warning Signs That Greedy Fails

1. **Discrete choices with dependencies**: Items can't be split, choices affect future options

2. **Global constraints**: Can't evaluate choice without considering entire solution

3. **Counter-examples exist**: Find one case where greedy gives wrong answer

## Testing Greedy Correctness

Before implementing:

1. **Try to find counter-example**: Small cases, edge cases

2. **Formulate greedy choice**: What exactly is the local optimum?

3. **Attempt proof**: Exchange argument or staying ahead

4. **If unsure, use DP**: Correctness over efficiency

## Summary

| Problem | Greedy | DP | Why |
|---------|--------|-----|-----|
| Activity selection | ✓ | ✗ | Earliest end is provably safe |
| Weighted activities | ✗ | ✓ | Weight makes greedy unsafe |
| Fractional knapsack | ✓ | ✗ | Continuous choices |
| 0/1 knapsack | ✗ | ✓ | Discrete choices |
| Coin change (general) | ✗ | ✓ | Depends on coin denominations |
| LCS | ✗ | ✓ | No greedy choice property |
| MST | ✓ | ✗ | Cut property ensures safety |
| Shortest path (non-neg) | ✓ | ✗ | Triangle inequality |
| Shortest path (negative) | ✗ | ✓ | Greedy choice not safe |

The key insight: Greedy is a special case where the local choice is always globally safe. When this property holds, greedy is preferred for its simplicity and efficiency. When it doesn't, DP systematically explores all options.
