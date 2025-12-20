# Facility Location: LP Rounding and Primal-Dual

## Introduction

The Facility Location problem is a classic optimization problem with applications in logistics, network design, and clustering. It admits multiple approximation approaches, demonstrating the richness of approximation algorithm techniques.

We'll explore LP rounding and primal-dual methods, achieving constant-factor approximations through different lenses.

## Problem Definition

**Input**:
- Set $F$ of facility locations with opening costs $f_i$
- Set $C$ of clients
- Connection costs $c_{ij}$ for connecting client $j$ to facility $i$

**Output**: 
- Set $S \subseteq F$ of open facilities
- Assignment of each client to an open facility

**Objective**: Minimize total cost
$$\sum_{i \in S} f_i + \sum_{j \in C} c_{\sigma(j), j}$$

where $\sigma(j)$ is the facility serving client $j$.

### Example

Facilities: $F = \{1,2,3\}$ with costs $f_1=10, f_2=12, f_3=8$
Clients: $C = \{a,b,c\}$

Connection costs:
```
   a  b  c
1  2  5  8
2  7  3  2
3  4  6  5
```

**Solution 1**: Open {1,3}
- Cost: $10+8=18$ (facilities)
- Connect: $a\to1$ (2), $b\to3$ (6), $c\to3$ (5)
- Total: $18+2+6+5=31$

**Better**: Open {1,2}
- Cost: $10+12=22$
- Connect: $a\to1$ (2), $b\to2$ (3), $c\to2$ (2)
- Total: $22+2+3+2=29$ ✓

## Integer Linear Program

**Variables**:
- $y_i \in \{0,1\}$: facility $i$ is open
- $x_{ij} \in \{0,1\}$: client $j$ served by facility $i$

**Objective**:
$$\min \sum_i f_i y_i + \sum_{i,j} c_{ij} x_{ij}$$

**Constraints**:
$$\sum_i x_{ij} = 1 \quad \forall j \quad \text{(each client served)}$$
$$x_{ij} \leq y_i \quad \forall i,j \quad \text{(can't use closed facility)}$$
$$x_{ij}, y_i \in \{0,1\}$$

## LP Relaxation and Rounding

**Relax**: $x_{ij}, y_i \in [0,1]$

**Algorithm**:
```typescript
function facilityLocationLPRounding(F: Facility[], C: Client[]): Solution {
    // Solve LP relaxation
    const lpSol = solveLPRelaxation(F, C);
    
    // Phase 1: Open facilities where y_i ≥ 1/3
    const open = new Set<Facility>();
    for (const fac of F) {
        if (lpSol.y[fac.id] >= 1/3) {
            open.add(fac);
        }
    }
    
    // Phase 2: Connect each client to nearest open facility
    const assignment = new Map<Client, Facility>();
    for (const client of C) {
        let nearest = null;
        let minCost = Infinity;
        for (const fac of open) {
            if (cost(fac, client) < minCost) {
                minCost = cost(fac, client);
                nearest = fac;
            }
        }
        assignment.set(client, nearest);
    }
    
    return {open, assignment};
}
```

**Analysis**: Achieves $O(1)$-approximation (details omitted).

## Primal-Dual 3-Approximation

**Dual LP**:
$$\max \sum_j v_j$$
$$\sum_j w_{ij} \leq f_i \quad \forall i$$
$$v_j - w_{ij} \leq c_{ij} \quad \forall i,j$$
$$v_j, w_{ij} \geq 0$$

**Interpretation**:
- $v_j$: budget client $j$ pays
- $w_{ij}$: contribution toward opening facility $i$

**Algorithm**:
```typescript
function facilityLocationPrimalDual(F: Facility[], C: Client[]): Solution {
    const v = new Map<Client, number>(); // Client budgets
    const w = new Map<[Facility, Client], number>(); // Contributions
    
    // Initialize
    for (const client of C) v.set(client, 0);
    
    const open = new Set<Facility>();
    const unconnected = new Set(C);
    
    // Raise budgets until facilities open
    while (unconnected.size > 0) {
        // Increase budgets of unconnected clients uniformly
        for (const client of unconnected) {
            v.set(client, v.get(client) + delta);
            
            // Update contributions
            for (const fac of F) {
                const contribution = Math.max(0, v.get(client) - cost(fac, client));
                w.set([fac, client], contribution);
                
                // Open facility if fully paid
                const totalContrib = sumContributions(fac, w);
                if (totalContrib >= fac.openingCost && !open.has(fac)) {
                    open.add(fac);
                    
                    // Connect clients that can afford this facility
                    for (const c of unconnected) {
                        if (v.get(c) >= cost(fac, c)) {
                            unconnected.delete(c);
                        }
                    }
                }
            }
        }
    }
    
    return {open, assignment: connectClientsGreedily(open, C)};
}
```

**Theorem**: Primal-dual algorithm achieves 3-approximation.

## State-of-the-Art

**Best known**: 1.488-approximation (Li, 2013)

**Hardness**: Cannot approximate better than 1.463 unless NP ⊆ DTIME$(n^{O(\log \log n)})$

**UFL (Uncapacitated)**: 1.488-approximation
**CFL (Capacitated)**: More complex, worse bounds

## Variants

### $k$-Median
Open exactly $k$ facilities, minimize connection costs.
$(3+\epsilon)$-approximation exists.

### $k$-Center  
Open $k$ facilities, minimize maximum connection cost.
2-approximation (best possible unless P=NP).

### Universal Facility Location
Non-uniform opening costs depending on how much facility is used.
Harder to approximate.

## Applications

**Supply chain**: Where to place warehouses?
**Network design**: Where to place servers/routers?
**Clustering**: Choose cluster centers to minimize distance to points

## Local Search Methods

Local search provides practical alternatives to LP-based approaches:

**Swap-based Local Search**:
1. Start with any feasible solution
2. Consider swapping: close one facility, open another
3. Accept swap if it improves total cost
4. Repeat until no improving swap exists

```typescript
function localSearchFacilityLocation(F: Facility[], C: Client[]): Solution {
    // Start with all facilities open
    let open = new Set(F);
    let cost = computeTotalCost(open, C);

    let improved = true;
    while (improved) {
        improved = false;

        for (const closeCandidate of open) {
            for (const openCandidate of F) {
                if (open.has(openCandidate)) continue;

                // Try swap
                const newOpen = new Set(open);
                newOpen.delete(closeCandidate);
                newOpen.add(openCandidate);

                const newCost = computeTotalCost(newOpen, C);
                if (newCost < cost) {
                    open = newOpen;
                    cost = newCost;
                    improved = true;
                    break;
                }
            }
            if (improved) break;
        }
    }

    return {open, cost};
}
```

**Theorem**: Single-swap local search achieves 5-approximation for uncapacitated facility location.

Multi-swap variants with $p$ simultaneous swaps achieve $(3 + 2/p)$-approximation.

## Conclusion

Facility Location showcases multiple approximation techniques:
1. LP rounding for fractional solutions
2. Primal-dual for dual-guided construction
3. Greedy and local search heuristics

The gap between best approximation (1.488) and hardness (1.463) remains narrow—a testament to decades of research refinement. The variety of successful approaches makes facility location an excellent case study for algorithm designers.
