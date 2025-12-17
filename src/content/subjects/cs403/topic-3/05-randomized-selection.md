# Randomized Selection: Median Finding in Expected Linear Time

## Introduction

Selection - finding the k-th smallest element - can be solved in expected O(n) time using randomization. While deterministic O(n) algorithms exist (median-of-medians), randomized selection is simpler and faster in practice.

## Problem Definition

**Input**: Array $A$ of $n$ elements, integer $k$. **Output**: $k$-th smallest element. **Special cases**: $k=1$ is minimum, $k=n$ is maximum, $k=\lceil n/2 \rceil$ is median.

## Randomized Quickselect

```typescript
function randomizedSelect(A: number[], k: number): number {
  if (A.length === 1) return A[0];
  const pivot = A[Math.floor(Math.random() * A.length)];
  const L = A.filter(x => x < pivot);
  const E = A.filter(x => x === pivot);
  const G = A.filter(x => x > pivot);
  if (k <= L.length) return randomizedSelect(L, k);
  else if (k <= L.length + E.length) return pivot;
  else return randomizedSelect(G, k - L.length - E.length);
}
```

## Analysis

**Expected time**: $T(n) = T(n/2) + O(n) = O(n)$. **Key insight**: Expected size of recursive call is $n/2$. **Proof**: With probability 1/2, pivot is in middle half of sorted array, giving recurrence $T(n) \leq T(3n/4) + O(n)$ in expectation. Solving gives $T(n) = O(n)$.

## Worst-Case Linear Selection

**Median-of-medians** algorithm guarantees $O(n)$ worst-case. **Idea**: Choose good pivot deterministically by computing median of medians. **Complexity**: $T(n) = T(n/5) + T(7n/10) + O(n) = O(n)$. **Practical**: High constants make it slower than randomized version.

## Applications

**Statistics**: Computing percentiles, quartiles. **Algorithms**: Partitioning for divide-and-conquer. **Graphics**: Median filtering for image processing. **Database systems**: ORDER BY LIMIT queries.

