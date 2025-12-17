# TSP via Dynamic Programming: Held-Karp Algorithm

Exact solution for TSP using DP on subsets.

## Algorithm
$$DP[S,i] = \min_{j \in S, j \neq i} (DP[S \setminus \{i\}, j] + d[j,i])$$

Optimal tour: $\min_i (DP[V, i] + d[i, 1])$

**Time**: $O(n^2 2^n)$, **Space**: $O(n 2^n)$

## Practical
Solves instances up to n=20-25. For larger, use approximation/heuristics.
