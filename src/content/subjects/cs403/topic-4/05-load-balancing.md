# Online Load Balancing: Greedy and Potential Function Analysis

## Introduction

Online load balancing assigns jobs to machines as they arrive, without knowledge of future jobs. This models real-world scenarios like web server load balancing and cloud resource allocation.

## Problem

**Input**: $m$ identical machines, jobs arrive online with processing times $p_1, p_2, \ldots$

**Assignment**: Upon arrival, assign job $j$ to machine $i$

**Load**: $L_i = \sum_{j \text{ assigned to } i} p_j$

**Goal**: Minimize makespan $\max_i L_i$

## Greedy Algorithm

**List scheduling**: Assign each job to machine with current minimum load.

```typescript
function greedyLoadBalance(jobs: number[], m: number): number {
    const load = Array(m).fill(0);
    for (const job of jobs) {
        const minMachine = load.indexOf(Math.min(...load));
        load[minMachine] += job;
    }
    return Math.max(...load);
}
```

**Competitive ratio**: 2 (same as offline list scheduling)

**Analysis**: If makespan is $C$, then $C \leq 2 \cdot \text{OPT}$ because average load $\leq \text{OPT}$ and largest job $\leq \text{OPT}$.

## Potential Function Method

**Potential**: $\Phi = \sum_i L_i^2$ (sum of squared loads)

**Amortized cost**: Actual cost + change in potential

**Analysis**: Show amortized cost per job is $O(1) \cdot \text{OPT}$, giving competitive ratio bound.

## Improved: Semi-online

If know maximum job size in advance: $(3/2)$-competitive

If can reject some fraction of jobs: Better ratios possible

## Applications

**Web servers**: Distribute requests across backends
**Cloud computing**: VM placement on physical hosts
**Task scheduling**: Distribute tasks to processors  
**Network routing**: Balance traffic across paths

## Conclusion

Greedy load balancing achieves 2-competitive ratio, matching offline performance. Potential function analysis provides systematic way to analyze online algorithms.
