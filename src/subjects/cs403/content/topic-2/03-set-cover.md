# Greedy Set Cover: ln(n) Approximation and Hardness

## Introduction

The Set Cover problem is fundamental in combinatorial optimization with applications ranging from resource allocation to facility location. While NP-complete, the greedy algorithm provides a logarithmic approximation - one of the most elegant results in approximation algorithms.

This analysis demonstrates the power of potential function methods and connects to information theory. Moreover, hardness results show that ln(n) is essentially optimal, making this one of the best possible polynomial-time approximations.

## Problem Definition

**Input**: 
- Universe $U = \{e_1, e_2, \ldots, e_n\}$ of $n$ elements
- Collection $S = \{S_1, S_2, \ldots, S_m\}$ of subsets of $U$
- Costs $c(S_i) \geq 0$ for each set

**Output**: Subcollection $C \subseteq S$ covering all elements

**Objective**: Minimize $\sum_{S_i \in C} c(S_i)$

**Covering constraint**:
$$\bigcup_{S_i \in C} S_i = U$$

### Example

Universe: $U = \{1,2,3,4,5\}$

Sets:
- $S_1 = \{1,2,3\}$, cost 3
- $S_2 = \{2,4\}$, cost 2  
- $S_3 = \{3,4,5\}$, cost 3
- $S_4 = \{1,5\}$, cost 2

**Optimal**: $\{S_1, S_2\}$ or $\{S_1, S_3\}$, cost 5

**Greedy**: Pick $S_1$ (covers 3 elements, ratio 3/3=1), then $S_2$ (covers 1 new, ratio 2/1=2), cost 5 ✓

## Greedy Algorithm

```typescript
function greedySetCover(U: Set<Element>, S: Set<Subset>, cost: Map<Subset, number>): Set<Subset> {
    const cover: Set<Subset> = new Set();
    const uncovered = new Set(U);
    
    while (uncovered.size > 0) {
        // Find set with minimum cost per uncovered element
        let bestSet: Subset = null;
        let bestRatio = Infinity;
        
        for (const set of S) {
            const newlyCovered = [...set].filter(e => uncovered.has(e)).length;
            if (newlyCovered > 0) {
                const ratio = cost.get(set) / newlyCovered;
                if (ratio < bestRatio) {
                    bestRatio = ratio;
                    bestSet = set;
                }
            }
        }
        
        cover.add(bestSet);
        for (const elem of bestSet) {
            uncovered.delete(elem);
        }
    }
    
    return cover;
}
```

**Time**: $O(|U| \cdot |S| \cdot \max_i |S_i|)$

## Analysis

**Theorem**: Greedy algorithm is an $H_n$-approximation where $H_n = 1 + \frac{1}{2} + \cdots + \frac{1}{n} = O(\log n)$.

**Proof**: (Using dual fitting / primal-dual method omitted for brevity)

**Key idea**: Each element "pays" for its coverage. The total payment is at most $H_n \cdot$ OPT.

### Harmonic Number

$$H_n = \sum_{i=1}^n \frac{1}{i} = \Theta(\log n)$$

More precisely: $\ln n < H_n < \ln n + 1$

## Hardness of Approximation

**Theorem** (Feige, 1998): Set Cover cannot be approximated within $(1-\epsilon) \ln n$ for any $\epsilon > 0$ unless NP $\subseteq$ DTIME$(n^{O(\log \log n)})$.

**Implication**: Greedy's $\ln n$-approximation is essentially optimal!

## Applications and Variants

### Weighted Set Cover
Costs can be arbitrary non-negative values.
Greedy still achieves $H_n$-approximation.

### Unweighted Set Cover  
All costs are 1.
Greedy achieves $\ln n$-approximation.
Also equivalent to minimum number of sets.

### Partial Set Cover
Cover at least $k$ elements.
Greedy achieves same approximation ratio.

### Maximum Coverage
Given budget $B$, maximize covered elements.
Greedy achieves $(1 - 1/e)$-approximation.

## Dual Fitting Analysis

The approximation ratio can be proven elegantly using **dual fitting**. The key insight is to assign prices to elements as the algorithm proceeds.

**Price Assignment**: When set $S$ is chosen with ratio $r = c(S)/|S \cap \text{uncovered}|$, each newly covered element $e$ is assigned price $\text{price}(e) = r$.

**Key Lemma**: For each element $e$, $\text{price}(e) \leq H_{|S^*|} \cdot \text{cost of } e$ in OPT, where $S^*$ is the optimal set containing $e$.

**Proof sketch**:
Consider element $e$ in optimal set $S^*$. At step $i$ when the $i$-th element of $S^*$ is covered:
- At least $|S^*| - i + 1$ elements of $S^*$ remain uncovered
- The greedy ratio is at most $\frac{c(S^*)}{|S^*| - i + 1}$

Element $e$ pays at most $\frac{c(S^*)}{k}$ where $k$ is the number of uncovered elements when $e$ is covered.

Summing over all $k$ from $|S^*|$ down to 1 yields the harmonic bound.

## Information-Theoretic Connection

The $\ln n$ bound has a deep connection to **entropy**:

**Shannon Entropy**: $H(X) = -\sum_i p_i \log p_i$

The greedy algorithm for Set Cover resembles **Huffman coding** in information theory—both make locally optimal choices that yield globally near-optimal results.

The approximation ratio $H_n = \Theta(\ln n)$ is essentially the information-theoretic minimum bits needed to identify one of $n$ elements. This connection is not coincidental—Set Cover reductions often involve information-hiding arguments.

## Practical Implementations

For real-world efficiency:

```typescript
// Optimized greedy using priority queue
function efficientGreedySetCover(U: Set<Element>, S: Subset[], cost: Map<Subset, number>): Set<Subset> {
    const cover: Set<Subset> = new Set();
    const uncovered = new Set(U);

    // Priority queue by cost-effectiveness
    const pq = new PriorityQueue<Subset>((a, b) =>
        (cost.get(a) / a.size) - (cost.get(b) / b.size)
    );

    for (const set of S) {
        pq.insert(set);
    }

    while (uncovered.size > 0) {
        const bestSet = pq.extractMin();
        const newlyCovered = [...bestSet].filter(e => uncovered.has(e));

        if (newlyCovered.length > 0) {
            cover.add(bestSet);
            for (const elem of newlyCovered) {
                uncovered.delete(elem);
            }
        }

        // Re-insert if still has uncovered elements (lazy deletion)
        // In practice, use lazy update for efficiency
    }

    return cover;
}
```

**Time complexity**: With careful implementation using lazy updates and efficient data structures: $O((|S| + |U|) \log |S|)$.

## Conclusion

Greedy Set Cover exemplifies optimal approximation algorithms—simple, efficient, and provably best possible. The $\ln n$ bound connects approximation algorithms to information theory and demonstrates the power of greedy analysis. The dual fitting technique provides an elegant proof framework applicable to many other problems.
