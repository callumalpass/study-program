# TSP via Dynamic Programming: Held-Karp Algorithm

## Introduction

The Traveling Salesman Problem (TSP) asks for the shortest tour visiting all cities exactly once. While NP-hard in general, the Held-Karp dynamic programming algorithm solves TSP in $O(n^2 2^n)$ time—exponential, but much better than the naive $O(n!)$ brute force.

This algorithm demonstrates DP over subsets, a powerful technique applicable to many combinatorial optimization problems. For instances up to about 25 cities, Held-Karp provides exact solutions; larger instances require approximation or heuristics.

## Problem Definition

**Input**: Complete graph with $n$ cities and distances $d[i,j]$ between cities $i$ and $j$.

**Output**: A tour (Hamiltonian cycle) of minimum total distance.

**Tour**: Permutation $(v_1, v_2, \ldots, v_n)$ with total cost:
$$\text{cost} = \sum_{i=1}^{n-1} d[v_i, v_{i+1}] + d[v_n, v_1]$$

**Goal**: Find tour minimizing total cost.

## Brute Force Analysis

**Naive approach**: Enumerate all $(n-1)!/2$ tours (fixing start, accounting for reversal).

For $n = 20$: $(19)!/2 \approx 6 \times 10^{16}$ tours. Infeasible.

**Observation**: Different orderings of the same subset have overlapping subproblems.

## Held-Karp Algorithm

**State**: DP over subsets of cities visited and ending city.

**Definition**: $DP[S, i]$ = minimum cost to start at city 1, visit all cities in $S$ exactly once, and end at city $i \in S$.

**Base case**: $DP[\{1\}, 1] = 0$ (at starting city, no travel cost).

**Recurrence**: For $S$ containing city 1 and $i \in S$, $i \neq 1$:
$$DP[S, i] = \min_{j \in S \setminus \{i\}} \left( DP[S \setminus \{i\}, j] + d[j, i] \right)$$

**Final answer**: $\min_{i \neq 1} \left( DP[V, i] + d[i, 1] \right)$

## Implementation

```typescript
function heldKarp(dist: number[][]): number {
    const n = dist.length;
    const FULL_SET = (1 << n) - 1;

    // DP[mask][i] = min cost to visit cities in mask, ending at i
    const dp: number[][] = Array(1 << n).fill(null)
        .map(() => Array(n).fill(Infinity));

    // Base case: start at city 0
    dp[1][0] = 0;

    // Iterate through all subsets containing city 0
    for (let mask = 1; mask <= FULL_SET; mask++) {
        if (!(mask & 1)) continue;  // Must include city 0

        for (let last = 0; last < n; last++) {
            if (!(mask & (1 << last))) continue;  // last must be in mask
            if (dp[mask][last] === Infinity) continue;

            // Try extending to each unvisited city
            for (let next = 0; next < n; next++) {
                if (mask & (1 << next)) continue;  // Already visited

                const newMask = mask | (1 << next);
                const newCost = dp[mask][last] + dist[last][next];

                dp[newMask][next] = Math.min(dp[newMask][next], newCost);
            }
        }
    }

    // Find minimum tour: return to city 0
    let minTour = Infinity;
    for (let last = 1; last < n; last++) {
        minTour = Math.min(minTour, dp[FULL_SET][last] + dist[last][0]);
    }

    return minTour;
}
```

## Reconstructing the Tour

Store predecessor information to recover the actual tour:

```typescript
function heldKarpWithPath(dist: number[][]): { cost: number; tour: number[] } {
    const n = dist.length;
    const FULL_SET = (1 << n) - 1;

    const dp: number[][] = /* ... as before ... */;
    const parent: number[][] = Array(1 << n).fill(null)
        .map(() => Array(n).fill(-1));

    // ... DP computation, storing parent[newMask][next] = last ...

    // Find last city before returning
    let minCost = Infinity;
    let lastCity = -1;
    for (let i = 1; i < n; i++) {
        const cost = dp[FULL_SET][i] + dist[i][0];
        if (cost < minCost) {
            minCost = cost;
            lastCity = i;
        }
    }

    // Reconstruct path
    const tour: number[] = [0];
    let mask = FULL_SET;
    let current = lastCity;

    while (current !== 0) {
        tour.push(current);
        const prev = parent[mask][current];
        mask ^= (1 << current);
        current = prev;
    }

    return { cost: minCost, tour: tour.reverse() };
}
```

## Complexity Analysis

**Time**: $O(n^2 \cdot 2^n)$
- $2^n$ subsets
- For each subset, $O(n)$ possible ending cities
- For each ending city, $O(n)$ transitions

**Space**: $O(n \cdot 2^n)$ for the DP table.

**Comparison to brute force**:
- $n = 15$: Brute force $\approx 10^{12}$, Held-Karp $\approx 10^7$
- $n = 20$: Brute force $\approx 10^{18}$, Held-Karp $\approx 10^8$

## Practical Considerations

**Memory limit**: $n = 25$ requires ~800MB for the DP table.

**Bit manipulation**: Efficient subset representation using bitmasks.

**Pruning**: Early termination when current path exceeds best known.

**Parallelization**: Different subset ranges can be computed independently.

## Relation to Other Methods

**Branch and bound**: Prunes search space using lower bounds. Often faster in practice.

**Christofides algorithm**: $O(n^3)$ approximation with 1.5× guarantee for metric TSP.

**Lin-Kernighan**: Powerful heuristic, often near-optimal in practice.

**Simulated annealing**: Metaheuristic for large instances.

## Applications

**Vehicle routing**: Delivery routes, service visits.

**Circuit board drilling**: Minimize drill head movement.

**DNA sequencing**: Order fragments for genome assembly.

**Telescope scheduling**: Order observations to minimize repositioning.

## Key Takeaways

- Held-Karp solves TSP exactly in $O(n^2 2^n)$ time
- DP over subsets: state = (visited cities, current city)
- Practical for $n \leq 25$; larger needs approximation
- Demonstrates exponential DP improvement over factorial brute force
- Bitmask representation enables efficient subset operations
- Foundation for understanding other subset-based DP problems
