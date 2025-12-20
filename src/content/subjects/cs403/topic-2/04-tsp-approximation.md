# Metric TSP: Christofides Algorithm and 1.5-Approximation

## Introduction

The Traveling Salesman Problem with the triangle inequality (Metric TSP) admits better approximation than general TSP. While general TSP cannot be approximated within any polynomial factor (unless P=NP), Metric TSP allows constant-factor approximation.

Christofides' algorithm (1976) achieves a 1.5-approximation and held the record for over 40 years - a testament to the problem's difficulty.

## Metric TSP

**Input**: Complete graph $K_n$ with edge weights $w: E \to \mathbb{R}^+$ satisfying triangle inequality

**Triangle inequality**: $\forall i,j,k: w(i,k) \leq w(i,j) + w(j,k)$

**Output**: Minimum-weight Hamiltonian cycle

### Why Triangle Inequality Matters

**Without triangle inequality**: No polynomial-time $\alpha$-approximation for any $\alpha$ (unless P=NP)

**With triangle inequality**: Constant-factor approximation possible

**Intuition**: Can shortcut paths without increasing cost

## MST-Based 2-Approximation

```typescript
function mstTSP(cities: City[], dist: number[][]): Tour {
    // Compute MST
    const mst = primMST(cities, dist);
    
    // DFS traversal
    const tour: number[] = [];
    const visited = new Set<number>();
    
    function dfs(node: number) {
        visited.add(node);
        tour.push(node);
        for (const child of mst.adjacency[node]) {
            if (!visited.has(child)) {
                dfs(child);
            }
        }
    }
    
    dfs(0);
    tour.push(0); // Return to start
    
    return tour;
}
```

**Analysis**:
- MST weight $\leq$ OPT (removing one edge from tour gives spanning tree)
- DFS uses each MST edge twice: $2 \times$ MST
- Shortcutting (by triangle inequality) doesn't increase cost
- Total: $\leq 2 \times$ MST $\leq 2 \times$ OPT ✓

## Christofides Algorithm

**Idea**: Improve MST approach by making it Eulerian with minimum-weight perfect matching.

### Algorithm

```typescript
function christofidesTSP(cities: City[], dist: number[][]): Tour {
    const n = cities.length;
    
    // Step 1: Compute minimum spanning tree
    const mst = primMST(cities, dist);
    
    // Step 2: Find vertices with odd degree in MST
    const oddDegree: number[] = [];
    for (let i = 0; i < n; i++) {
        if (mst.degree(i) % 2 === 1) {
            oddDegree.push(i);
        }
    }
    
    // Step 3: Find minimum-weight perfect matching on odd-degree vertices
    const matching = minWeightPerfectMatching(oddDegree, dist);
    
    // Step 4: Combine MST and matching to form Eulerian graph
    const multigraph = mst.union(matching);
    
    // Step 5: Find Eulerian tour
    const eulerTour = findEulerianTour(multigraph);
    
    // Step 6: Shortcut to get Hamiltonian tour
    const tour = shortcut(eulerTour);
    
    return tour;
}
```

### Why It Works

**Odd-degree vertices**: 
- MST has even number of odd-degree vertices (handshaking lemma)
- Perfect matching exists

**Eulerian graph**:
- All vertices have even degree
- Eulerian tour exists (visits each edge once)

**Shortcutting**:
- Remove repeated vertices from Eulerian tour
- Triangle inequality ensures no cost increase

### Analysis

**Theorem**: Christofides is a 1.5-approximation.

**Proof**:

Let OPT = optimal TSP tour cost.

**Claim 1**: MST cost $\leq$ OPT

**Proof**: Remove any edge from optimal tour to get spanning tree. MST is minimum, so MST $\leq$ Tour - 1 edge $<$ OPT. ✓

**Claim 2**: Matching cost $\leq$ OPT/2

**Proof**: 
- Consider optimal tour restricted to odd-degree vertices
- This forms two edge-disjoint perfect matchings
- Each has cost $\leq$ OPT/2
- Our matching is minimum, so Matching $\leq$ OPT/2 ✓

**Claim 3**: Eulerian graph cost $\leq$ 1.5 × OPT

**Proof**:
- Eulerian graph = MST + Matching
- Cost $\leq$ OPT + OPT/2 = 1.5 × OPT ✓

**Claim 4**: Shortcutting doesn't increase cost

**Proof**: Triangle inequality. ✓

**Conclusion**: Christofides tour $\leq$ 1.5 × OPT ✓

## Recent Improvements

**2020**: Karlin, Klein, Gharan achieved $(1.5 - 10^{-36})$-approximation

**2022**: Improved to approximately 1.5 - $10^{-10}$

**Open problem**: Is there a polynomial-time 1.4-approximation? 1.3? 1.1?

**Conjecture**: For any $\epsilon > 0$, there exists $(1+\epsilon)$-approximation

## Implementation Details

```typescript
function minWeightPerfectMatching(vertices: number[], dist: number[][]): Edge[] {
    const n = vertices.length;
    if (n % 2 !== 0) throw new Error("Must have even number of vertices");
    
    // Use Blossom algorithm for minimum-weight perfect matching
    // Time: O(n^3)
    
    // Simplified implementation using greedy (not optimal but illustrative)
    const matching: Edge[] = [];
    const used = new Set<number>();
    
    for (let i = 0; i < n; i++) {
        if (used.has(vertices[i])) continue;
        
        let minDist = Infinity;
        let minJ = -1;
        
        for (let j = i + 1; j < n; j++) {
            if (used.has(vertices[j])) continue;
            if (dist[vertices[i]][vertices[j]] < minDist) {
                minDist = dist[vertices[i]][vertices[j]];
                minJ = j;
            }
        }
        
        if (minJ !== -1) {
            matching.push([vertices[i], vertices[minJ]]);
            used.add(vertices[i]);
            used.add(vertices[minJ]);
        }
    }
    
    return matching;
}
```

## Practical Considerations

**Christofides vs Local Search**:
- Christofides: 1.5-approximation guarantee
- Local search (2-opt, 3-opt): No guarantee, but often < 1.1 × OPT in practice

**Modern TSP solvers**:
- Concorde: Exact solver for 1000s of cities
- LKH: Heuristic achieving near-optimal solutions
- Hybrid: Christofides for initial solution, then local search

## Complexity Analysis

**Time Complexity**:
- MST: $O(n^2)$ with Prim's algorithm
- Finding odd-degree vertices: $O(n)$
- Minimum-weight perfect matching: $O(n^3)$ using Blossom algorithm
- Eulerian tour: $O(n)$
- Shortcutting: $O(n)$

**Total**: $O(n^3)$, dominated by the matching step.

## Conclusion

Christofides algorithm demonstrates sophisticated approximation algorithm design:
1. MST for initial structure
2. Matching to fix parity
3. Eulerian tour construction
4. Shortcutting via triangle inequality

The 1.5 ratio stood for 40+ years, highlighting the difficulty of TSP approximation. Even small improvements require groundbreaking techniques. The algorithm remains practically important as a subroutine in modern TSP solvers.
