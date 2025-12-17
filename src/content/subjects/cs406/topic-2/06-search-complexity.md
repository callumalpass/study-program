---
title: "Search Complexity Analysis"
slug: "search-complexity"
description: "Time and space complexity of search algorithms, optimality, completeness analysis"
---

# Search Complexity Analysis

## Introduction

Understanding search algorithm complexity is essential for choosing appropriate methods and predicting performance. We analyze time complexity (nodes expanded), space complexity (memory required), completeness (guaranteed to find solutions), and optimality (guaranteed to find best solutions).

## Complexity Metrics

**Time Complexity**: Number of nodes generated/expanded
- Depends on branching factor $b$ and depth $d$
- Typically exponential: $O(b^d)$

**Space Complexity**: Maximum nodes in memory
- Frontier + explored set
- Critical bottleneck for search

**Completeness**: Guaranteed to find solution if one exists

**Optimality**: Guaranteed to find lowest-cost solution

## Algorithm Analysis Table

| Algorithm | Time | Space | Complete | Optimal |
|-----------|------|-------|----------|---------|
| BFS | $O(b^d)$ | $O(b^d)$ | Yes | Yes* |
| DFS | $O(b^m)$ | $O(bm)$ | No** | No |
| IDDFS | $O(b^d)$ | $O(bd)$ | Yes | Yes* |
| UCS | $O(b^{C^*/\epsilon})$ | $O(b^{C^*/\epsilon})$ | Yes | Yes |
| A* | $O(b^d)$ | $O(b^d)$ | Yes*** | Yes*** |

*If step costs uniform
**Not complete in infinite spaces
***If heuristic is admissible/consistent

## Branching Factor Impact

**Example**: $b=10$, $d=5$

BFS nodes: $1 + 10 + 100 + 1000 + 10000 + 100000 = 111,111$

If each node takes 1μs and 100 bytes:
- Time: 0.11 seconds
- Space: 11 MB

**At depth 10**: $10^{10}$ nodes = 116 days, 1 TB memory!

## Effective Branching Factor

Measure of heuristic quality:

Given $N$ nodes expanded to depth $d$, find $b^*$ where:
$$N = 1 + b^* + (b^*)^2 + ... + (b^*)^d$$

**Lower $b^*$ = better heuristic**

Example:
- Uninformed: $b^* = 2.79$
- Manhattan distance: $b^* = 1.42$

## Optimality Proofs

**Theorem (BFS)**: BFS is optimal for uniform costs.

**Proof**: BFS expands nodes in order of increasing depth. If goal $g_1$ at depth $d_1$ and goal $g_2$ at depth $d_2 > d_1$, BFS finds $g_1$ first. With uniform costs, shallower = cheaper. ∎

**Theorem (A*)**: A* with admissible heuristic is optimal.

**Proof**: Suppose A* returns suboptimal goal $G_2$ before optimal $G_1$. Let $n$ be node on path to $G_1$ in frontier. Then:
- $f(n) = g(n) + h(n) \leq g(n) + h^*(n) = g(G_1)$ (by admissibility)
- $f(G_2) = g(G_2) > g(G_1)$ (G_2 is suboptimal)
- Therefore $f(n) < f(G_2)$

A* expands lowest $f$ first, so should expand $n$ before $G_2$. Contradiction! ∎

## Memory Requirements

**8-puzzle**: ~180K states, BFS frontier ~90K nodes ≈ 2.7 MB (manageable)

**15-puzzle**: ~10^13 states, BFS frontier ~10^12 nodes ≈ 30 TB (impossible!)

**Solution**: Memory-bounded search
- IDA* (linear space)
- RBFS (Recursive Best-First)
- SMA* (Simplified Memory-bounded A*)

## Conclusion

Search complexity fundamentally limits which problems we can solve. Exponential growth in $b^d$ means small increases in depth or branching factor cause massive increases in cost. Understanding these limits guides algorithm selection and problem formulation.
