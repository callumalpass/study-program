# Bipartite Matching via Max Flow

Maximum bipartite matching finds largest set of non-conflicting edges in bipartite graph. Reduces to max flow, demonstrating power of flow algorithms.

## Problem
**Bipartite graph** $G = (L \cup R, E)$. **Matching** $M \subseteq E$ with no shared vertices. **Goal**: Maximize $|M|$.

## Reduction to Max Flow
1. Direct edges $L \to R$ with capacity 1
2. Add source $s$ with edges to all $l \in L$, capacity 1
3. Add sink $t$ with edges from all $r \in R$, capacity 1
4. Max flow = max matching size

**Time**: $O(VE)$ with Edmonds-Karp

## Applications
Job assignment, course scheduling, network design
