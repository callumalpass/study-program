# The Traveling Salesman Problem: NP-Hardness, Variants, and Approaches

## Introduction

The Traveling Salesman Problem (TSP) is perhaps the most famous NP-complete problem in computer science and operations research. First formulated in the 1800s and studied intensively since the 1950s, TSP asks a simple question: given a list of cities and the distances between them, what is the shortest possible route that visits each city exactly once and returns to the starting city?

Despite its apparent simplicity, TSP encapsulates fundamental challenges in combinatorial optimization and has applications ranging from logistics and manufacturing to DNA sequencing and astronomy. Understanding TSP provides deep insights into computational complexity, algorithm design, and the limits of efficient computation.

## Problem Definition

### Decision Version

**Problem**: TSP (Decision)

**Input**: A set of cities $C = \{c_1, c_2, \ldots, c_n\}$, distances $d(c_i, c_j)$ for all pairs, and a bound $B$

**Question**: Does there exist a tour visiting each city exactly once with total distance at most $B$?

A **tour** is a cycle $(c_{\pi(1)}, c_{\pi(2)}, \ldots, c_{\pi(n)}, c_{\pi(1)})$ where $\pi$ is a permutation of $\{1, 2, \ldots, n\}$.

**Total distance**: 
$$L(\pi) = \sum_{i=1}^{n} d(c_{\pi(i)}, c_{\pi(i+1)}) \text{ where } c_{\pi(n+1)} = c_{\pi(1)}$$

### Optimization Version

**Problem**: TSP (Optimization)

**Input**: Cities $C$ and distances $d(c_i, c_j)$

**Goal**: Find a tour $\pi$ minimizing total distance $L(\pi)$

### Graph Formulation

TSP can be viewed on a weighted graph $G = (V, E, w)$:
- Vertices $V$ represent cities
- Edges $E$ represent connections
- Weight $w(e)$ represents distance

**Complete graph**: In the general TSP, the graph is complete ($K_n$), meaning every pair of cities has a direct connection.

**Hamiltonian cycle**: A TSP tour is a minimum-weight Hamiltonian cycle.

## NP-Completeness and NP-Hardness

### TSP Decision is NP-Complete

**Theorem**: TSP (decision version) is NP-complete.

**Proof**:

**Part 1: TSP ∈ NP**

**Certificate**: A permutation $\pi$ of cities

**Verifier**:
```typescript
function VerifyTSP(C: City[], d: Distance[][], B: number, π: Permutation): boolean {
    if (!isValidPermutation(π, n)) return false;
    
    let totalDist = 0;
    for (let i = 0; i < n; i++) {
        totalDist += d[π[i]][π[(i+1) % n]];
    }
    
    return totalDist <= B;
}
```

**Time**: $O(n)$ to sum distances

Therefore TSP ∈ NP. ✓

**Part 2: HAMILTONIAN-CYCLE ≤ₚ TSP**

Given graph $G = (V, E)$ for HAM-CYCLE, construct TSP instance:

**Cities**: $V$

**Distances**:
$$d(u, v) = \begin{cases}
1 & \text{if } (u,v) \in E \\\\
2 & \text{if } (u,v) \notin E
\end{cases}$$

**Bound**: $B = n$ (number of vertices)

**Correctness**:

($\Rightarrow$) If $G$ has Hamiltonian cycle, use that cycle as tour. Each edge has distance 1, so total distance = $n \leq B$. ✓

($\Leftarrow$) If TSP tour has distance $\leq n$, all edges must have distance 1 (since we visit $n$ edges and distance $\geq n$). Therefore, all edges are in $E$, giving a Hamiltonian cycle in $G$. ✓

Therefore, TSP is NP-complete. ∎

### TSP Optimization is NP-Hard

The optimization version of TSP is NP-hard (at least as hard as NP-complete problems) but not in NP since it's not a decision problem.

**Proof**: If we could solve TSP optimization in polynomial time, we could solve TSP decision by checking if the optimal tour length is $\leq B$.

## Triangle Inequality and Metric TSP

### Triangle Inequality

The **triangle inequality** states that for all cities $i, j, k$:
$$d(i, k) \leq d(i, j) + d(j, k)$$

Intuitively: going directly from $i$ to $k$ is no longer than going via $j$.

### Metric TSP

**Metric TSP** is TSP where distances satisfy the triangle inequality.

**Examples satisfying triangle inequality**:
- Euclidean distance in $\mathbb{R}^2$: $d(p, q) = \sqrt{(p_x - q_x)^2 + (p_y - q_y)^2}$
- Manhattan distance: $d(p, q) = |p_x - q_x| + |p_y - q_y|$
- Shortest path distances in any graph

**Why it matters**: Metric TSP admits better approximation algorithms than general TSP (which cannot be approximated within any constant factor unless P=NP).

### Hardness Results

**Theorem**: Even Metric TSP is NP-complete.

**Theorem** (Sahni & Gonzalez, 1976): For any constant $\epsilon > 0$, there is no polynomial-time $(1+\epsilon)$-approximation for general TSP unless P=NP.

In contrast, Metric TSP has a 1.5-approximation algorithm (Christofides).

## Exact Algorithms

### Brute Force

Try all $(n-1)!/2$ possible tours:

```typescript
function bruteForceTSP(cities: City[], dist: number[][]): Tour {
    let minDist = Infinity;
    let bestTour: Tour = null;
    
    // Generate all permutations
    for (const perm of permutations(cities.slice(1))) {
        const tour = [cities[0], ...perm, cities[0]];
        const tourDist = computeTourDistance(tour, dist);
        
        if (tourDist < minDist) {
            minDist = tourDist;
            bestTour = tour;
        }
    }
    
    return bestTour;
}
```

**Time**: $O(n!)$
**Space**: $O(n)$

**Practical limit**: ~15-20 cities

### Dynamic Programming: Held-Karp Algorithm

The **Held-Karp algorithm** (1962) uses dynamic programming to solve TSP in $O(n^2 2^n)$ time.

**State**: $DP[S][i]$ = minimum distance to visit all cities in set $S$, ending at city $i$

**Base case**: $DP[\{1\}][1] = 0$ (start at city 1)

**Recurrence**:
$$DP[S][i] = \min_{j \in S \setminus \{i\}} (DP[S \setminus \{i\}][j] + d(j, i))$$

**Final answer**:
$$\min_{i \neq 1} (DP[V][i] + d(i, 1))$$

```typescript
function heldKarpTSP(n: number, dist: number[][]): number {
    const dp: Map<string, number> = new Map();
    
    // Base case
    dp.set(encode([0], 0), 0);
    
    // Fill table for increasing subset sizes
    for (let size = 2; size <= n; size++) {
        for (const S of subsetsOfSize(n, size)) {
            for (const i of S) {
                const SminusI = S.filter(x => x !== i);
                let minDist = Infinity;
                
                for (const j of SminusI) {
                    const prev = dp.get(encode(SminusI, j));
                    minDist = Math.min(minDist, prev + dist[j][i]);
                }
                
                dp.set(encode(S, i), minDist);
            }
        }
    }
    
    // Find minimum tour
    const allCities = range(n);
    let result = Infinity;
    for (let i = 1; i < n; i++) {
        const tourDist = dp.get(encode(allCities, i)) + dist[i][0];
        result = Math.min(result, tourDist);
    }
    
    return result;
}
```

**Time**: $O(n^2 2^n)$
**Space**: $O(n 2^n)$

**Practical limit**: ~20-25 cities

### Branch and Bound

**Idea**: Build tours incrementally, pruning branches that cannot improve the best tour found so far.

**Lower bound**: Use relaxations like:
- **Minimum Spanning Tree (MST)**: Weight of MST ≤ Weight of optimal TSP tour
- **1-tree bound**: MST on $n-1$ cities plus two cheapest edges from remaining city
- **Linear Programming relaxation**: Solve TSP ILP without integrality constraints

**Algorithm**:
```typescript
function branchAndBoundTSP(cities: City[]): Tour {
    let bestTour: Tour = greedyTSP(cities); // Initial upper bound
    let bestDist = tourDistance(bestTour);
    
    function branch(partial: Tour, remaining: City[]) {
        if (remaining.length === 0) {
            const tourDist = tourDistance(partial);
            if (tourDist < bestDist) {
                bestDist = tourDist;
                bestTour = [...partial];
            }
            return;
        }
        
        for (const city of remaining) {
            const newPartial = [...partial, city];
            const lowerBound = computeLowerBound(newPartial, remaining);
            
            if (lowerBound < bestDist) { // Prune
                branch(newPartial, remaining.filter(c => c !== city));
            }
        }
    }
    
    branch([cities[0]], cities.slice(1));
    return bestTour;
}
```

**Performance**: Highly variable; can solve instances with 100+ cities in some cases, but can be very slow for difficult instances.

### Cutting Plane Methods

Modern exact solvers (like Concorde) use **cutting plane methods** combined with branch and bound:

1. Solve Linear Programming relaxation
2. If solution is not integral, find **violated inequalities** (cuts)
3. Add cuts to strengthen the LP
4. Repeat until integral solution found or branch

**Concorde solver**: Can solve instances with 1000s of cities optimally using sophisticated cutting planes.

## Approximation Algorithms

### Nearest Neighbor Heuristic

**Algorithm**: Start at arbitrary city, repeatedly visit nearest unvisited city.

```typescript
function nearestNeighborTSP(cities: City[], dist: number[][]): Tour {
    const n = cities.length;
    const visited = new Set<number>();
    const tour: number[] = [0];
    visited.add(0);
    
    let current = 0;
    for (let step = 1; step < n; step++) {
        let nearest = -1;
        let nearestDist = Infinity;
        
        for (let i = 0; i < n; i++) {
            if (!visited.has(i) && dist[current][i] < nearestDist) {
                nearest = i;
                nearestDist = dist[current][i];
            }
        }
        
        tour.push(nearest);
        visited.add(nearest);
        current = nearest;
    }
    
    tour.push(0); // Return to start
    return tour;
}
```

**Time**: $O(n^2)$

**Approximation ratio**: Can be arbitrarily bad (unbounded) even for metric TSP

**Example where it fails**:
- Cities $\{1, 2, 3, 4\}$ arranged in a line: $1 - 2 - 3 - 4$
- Distances: $d(i, i+1) = 1$, $d(1, 4) = 1.1$
- Nearest neighbor from 1: $1 \to 2 \to 3 \to 4 \to 1$ (distance 4.1)
- Optimal: $1 \to 4 \to 3 \to 2 \to 1$ (distance 4)

Despite poor worst-case, nearest neighbor often works well in practice.

### MST-Based 2-Approximation

For **Metric TSP**, we can guarantee a 2-approximation:

**Algorithm**:
1. Compute Minimum Spanning Tree (MST)
2. Perform DFS on MST to create a tour
3. Shortcut repeated vertices using triangle inequality

```typescript
function mstTSP(cities: City[], dist: number[][]): Tour {
    // Step 1: Compute MST
    const mst = primMST(cities, dist);
    
    // Step 2: DFS traversal
    const dfsOrder: number[] = [];
    function dfs(node: number, visited: Set<number>) {
        visited.add(node);
        dfsOrder.push(node);
        for (const child of mst.children(node)) {
            if (!visited.has(child)) {
                dfs(child, visited);
            }
        }
    }
    dfs(0, new Set());
    
    // Step 3: Create tour (shortcuts happen implicitly)
    dfsOrder.push(0); // Return to start
    return dfsOrder;
}
```

**Analysis**:

Let OPT = optimal TSP tour length.

**Lemma**: MST weight ≤ OPT

**Proof**: Remove one edge from optimal tour to get spanning tree. MST is minimum spanning tree, so MST weight ≤ (tour - one edge) < OPT. ✓

**Tour length**:
- DFS traversal uses each MST edge twice
- Total distance ≤ 2 × MST weight ≤ 2 × OPT ✓

**Approximation ratio**: 2

### Christofides Algorithm: 1.5-Approximation

**Christofides algorithm** (1976) improves the approximation to 1.5 for Metric TSP:

**Algorithm**:
1. Compute MST
2. Find vertices with odd degree in MST
3. Compute minimum-weight perfect matching on odd-degree vertices
4. Combine MST and matching to form Eulerian graph
5. Find Eulerian tour
6. Shortcut to remove repeated vertices

```typescript
function christofidesTSP(cities: City[], dist: number[][]): Tour {
    // Step 1: MST
    const mst = primMST(cities, dist);
    
    // Step 2: Find odd-degree vertices
    const oddVertices = mst.vertices().filter(v => mst.degree(v) % 2 === 1);
    
    // Step 3: Minimum-weight perfect matching
    const matching = minimumWeightPerfectMatching(oddVertices, dist);
    
    // Step 4: Combine MST + matching
    const eulerian = mst.union(matching);
    
    // Step 5: Eulerian tour
    const eulerTour = findEulerianTour(eulerian);
    
    // Step 6: Shortcut
    const tour = shortcutTour(eulerTour);
    return tour;
}
```

**Analysis**:

Let OPT = optimal tour length.

- MST weight ≤ OPT (as before)
- Matching weight ≤ OPT/2 (matching on odd vertices uses at most half of optimal tour)
- Eulerian graph weight ≤ MST + Matching ≤ OPT + OPT/2 = 1.5 × OPT
- Shortcutting doesn't increase length (triangle inequality)

**Approximation ratio**: 1.5 ✓

**Time**: $O(n^3)$ (bottleneck: matching)

**Best known**: Christofides held the record for 40+ years. Recent work has achieved slightly better (1.5 - ε) for small ε.

## TSP Variants

### Asymmetric TSP (ATSP)

**Distances not symmetric**: $d(i, j) \neq d(j, i)$

**Examples**:
- One-way streets
- Wind affecting flight time
- Time-dependent distances

**Hardness**: Still NP-complete, harder to approximate than symmetric TSP

### Multiple TSP

**Multiple salesmen**: $k$ salesmen collectively visit all cities

**Applications**: Vehicle routing, multi-robot systems

**Variations**:
- Minimize total distance
- Minimize maximum distance (min-max)
- Capacity constraints

### TSP with Time Windows

Each city has time window $[e_i, l_i]$ when it can be visited.

**Applications**: Package delivery, service scheduling

**Complexity**: More constrained than basic TSP, often modeled with Integer Linear Programming

### Prize-Collecting TSP

Each city has a prize; maximize prize - distance.

**Applications**: Tourist trip planning, data gathering

### Bottleneck TSP

Minimize maximum edge in tour (rather than total distance).

**Applications**: Network reliability, max-min fairness

## Practical Approaches

### Local Search

**2-opt**: Remove 2 edges, reconnect in different way

```typescript
function twoOpt(tour: Tour, dist: number[][]): Tour {
    let improved = true;
    let bestTour = [...tour];
    
    while (improved) {
        improved = false;
        for (let i = 1; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                const newTour = twoOptSwap(bestTour, i, j);
                if (tourDistance(newTour, dist) < tourDistance(bestTour, dist)) {
                    bestTour = newTour;
                    improved = true;
                }
            }
        }
    }
    return bestTour;
}
```

**3-opt**: Remove 3 edges, reconnect (7 ways)

**Lin-Kernighan**: Adaptive $k$-opt

### Metaheuristics

**Simulated Annealing**: Accept worse solutions probabilistically

**Genetic Algorithms**: Evolve population of tours

**Ant Colony Optimization**: Simulate ant foraging behavior

**Tabu Search**: Avoid recently visited solutions

## Applications

### Logistics
- Package delivery routing
- School bus routing
- Garbage collection

### Manufacturing
- PCB drilling (minimize drill movement)
- Genome sequencing (order fragments)
- Telescope scheduling (minimize movement)

### Computer Science
- Compiler optimization (register allocation)
- Data visualization (order data points)
- File fragmentation optimization

## Conclusion

TSP exemplifies the challenges and opportunities in computational complexity. Despite being NP-complete, decades of research have produced:
- Exact algorithms solving 1000+ city instances
- Approximation algorithms with provable guarantees
- Effective heuristics for practical use
- Insights applicable across optimization

Understanding TSP is essential for tackling real-world optimization problems and appreciating the interplay between theory and practice.
