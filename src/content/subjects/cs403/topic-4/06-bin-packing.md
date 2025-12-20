# Online Bin Packing: First Fit, Next Fit Algorithms

## Introduction

Online bin packing is a fundamental resource allocation problem: pack items of varying sizes into bins of unit capacity, minimizing the number of bins used. The problem is NP-hard even offline, making good approximation algorithms essential.

In the online setting, items arrive one at a time and must be immediately packed into a bin—they cannot be moved later. This models scenarios like memory allocation, storage management, and container loading where items arrive unpredictably and must be handled immediately.

The study of online bin packing has yielded elegant algorithms with provable competitive ratios and revealed fundamental limits on what online algorithms can achieve.

## Problem Definition

**Input**: Items with sizes $s_1, s_2, \ldots, s_n$ where each $s_i \in (0, 1]$ arrive online.

**Bins**: Each bin has capacity 1. Items assigned to a bin must have total size $\leq 1$.

**Packing**: When item $i$ with size $s_i$ arrives, assign it to some bin with sufficient remaining capacity.

**Goal**: Minimize the number of bins used.

**Constraint**: Items cannot be moved after initial placement.

**Notation**: Let ALG$(I)$ denote the number of bins used by algorithm ALG on instance $I$, and OPT$(I)$ the optimal offline number of bins.

## Next Fit (NF)

**Algorithm**: Maintain one "active" bin. Try to place item in active bin. If it doesn't fit, close active bin (never use again) and open a new active bin.

```typescript
function nextFit(items: number[]): number[][] {
    const bins: number[][] = [[]];
    let currentBin = 0;
    let currentLoad = 0;

    for (const item of items) {
        if (currentLoad + item <= 1) {
            bins[currentBin].push(item);
            currentLoad += item;
        } else {
            // Close current bin, open new one
            bins.push([item]);
            currentBin++;
            currentLoad = item;
        }
    }

    return bins;
}
```

**Time complexity**: O(1) per item, O(n) total.

**Space complexity**: O(1) active state (only tracks current bin).

**Theorem**: Next Fit is 2-competitive.

**Proof**:

Consider any two consecutive bins $B_i$ and $B_{i+1}$ in NF's packing. Since NF closed $B_i$ before opening $B_{i+1}$, the next item didn't fit in $B_i$. Therefore:
$$\text{load}(B_i) + \text{load}(B_{i+1}) > 1$$

Summing over all pairs of consecutive bins:
$$\sum_i s_i > \frac{\text{NF}(I)}{2}$$

Since OPT$(I) \geq \sum_i s_i$:
$$\text{NF}(I) < 2 \sum_i s_i \leq 2 \cdot \text{OPT}(I)$$

**Tightness**: The bound is tight. Consider items $\frac{1}{2}, \frac{1}{2n}, \frac{1}{2}, \frac{1}{2n}, \ldots$ (alternating).
- NF uses $n$ bins (pairs don't fit together)
- OPT uses $\lceil n/2 \rceil + 1$ bins
- Ratio approaches 2

## First Fit (FF)

**Algorithm**: Place item in the first (earliest opened) bin with sufficient space. Open new bin only if no existing bin can accommodate the item.

```typescript
function firstFit(items: number[]): number[][] {
    const bins: number[][] = [];
    const loads: number[] = [];

    for (const item of items) {
        let placed = false;

        // Try to place in first bin with space
        for (let i = 0; i < bins.length; i++) {
            if (loads[i] + item <= 1) {
                bins[i].push(item);
                loads[i] += item;
                placed = true;
                break;
            }
        }

        // Open new bin if needed
        if (!placed) {
            bins.push([item]);
            loads.push(item);
        }
    }

    return bins;
}
```

**Time complexity**: O(n) per item naive, O(n log n) total with balanced tree for bin loads.

**Theorem**: First Fit is asymptotically 1.7-competitive.

$$\text{FF}(I) \leq 1.7 \cdot \text{OPT}(I) + 3$$

**Proof sketch**: Johnson (1973) proved the bound through careful analysis of how items distribute across bins. The key insight is that FF cannot have many bins that are less than half full.

**Improved analysis**: Dósa and Sgall (2013) proved the tight bound:
$$\text{FF}(I) \leq \frac{17}{10} \cdot \text{OPT}(I) + \frac{7}{10}$$

## Best Fit (BF)

**Algorithm**: Place item in the bin with the least remaining space that can still fit the item. This minimizes "wasted" space per placement.

```typescript
function bestFit(items: number[]): number[][] {
    const bins: number[][] = [];
    const loads: number[] = [];

    for (const item of items) {
        let bestBin = -1;
        let bestRemaining = 2; // More than any bin can have

        for (let i = 0; i < bins.length; i++) {
            const remaining = 1 - loads[i];
            if (remaining >= item && remaining - item < bestRemaining - item) {
                bestBin = i;
                bestRemaining = remaining;
            }
        }

        if (bestBin >= 0) {
            bins[bestBin].push(item);
            loads[bestBin] += item;
        } else {
            bins.push([item]);
            loads.push(item);
        }
    }

    return bins;
}
```

**Time complexity**: O(n log n) with balanced tree.

**Theorem**: Best Fit is also asymptotically 1.7-competitive.

**Comparison with FF**: Despite different strategies, FF and BF have the same asymptotic competitive ratio. In practice, their performance is similar, though specific instances may favor one or the other.

## Lower Bound for Online Algorithms

**Theorem**: No online algorithm can achieve competitive ratio better than 1.54037... (approximately).

**Proof** (van Vliet, 1992): Adversarial construction using items of sizes $\frac{1}{2} + \epsilon$, $\frac{1}{4} + \epsilon$, and $\frac{1}{4} - 2\epsilon$. The adversary reveals items to force poor packing.

This gap between 1.54 lower bound and 1.7 upper bound has been narrowed but not closed.

## First Fit Decreasing (FFD) - Semi-Online

If we can sort items before packing (semi-online or offline):

**Algorithm**: Sort items by decreasing size, then apply First Fit.

```typescript
function firstFitDecreasing(items: number[]): number[][] {
    const sorted = [...items].sort((a, b) => b - a);
    return firstFit(sorted);
}
```

**Theorem** (Johnson, 1973): FFD achieves:
$$\text{FFD}(I) \leq \frac{11}{9} \cdot \text{OPT}(I) + \frac{6}{9}$$

**Asymptotic ratio**: 11/9 ≈ 1.222 (much better than online 1.7).

**Intuition**: Large items are hard to pack well. By handling them first when bins are empty, FFD avoids leaving awkward gaps.

**Tight examples exist**: The 11/9 bound is essentially tight.

## Harmonic Algorithm

For better asymptotic performance, the Harmonic algorithm uses size-based bin classes.

**Idea**: Partition item sizes into classes. Items of size in $(\frac{1}{k+1}, \frac{1}{k}]$ go into class-$k$ bins, which hold exactly $k$ items.

**Competitive ratio**: 1.69103... (slightly better than FF).

**Variants**: Harmonic++ and other modifications achieve better ratios approaching the lower bound.

## Applications

**Memory allocation**: Operating systems pack processes into memory pages or swap regions.

**Disk storage**: Pack files onto fixed-size disk blocks or storage units.

**Virtual machine placement**: Pack VMs onto physical servers with fixed capacity.

**Cutting stock**: Cut pieces from standard-size raw materials (steel bars, fabric rolls, paper sheets).

**Container loading**: Pack boxes into shipping containers.

**Cloud container scheduling**: Pack containers onto nodes in Kubernetes-like systems.

## Bélády's Anomaly Analog

Unlike paging's Bélády's anomaly, bin packing has no such anomaly—more capacity always helps (or at least doesn't hurt). Larger bins can only reduce the number needed.

However, the order of items dramatically affects online performance, which is why FFD's sorting yields significant improvement.

## Key Takeaways

- Next Fit: O(1) per item, 2-competitive (simplest and fastest)
- First Fit: O(log n) per item, 1.7-competitive (widely used)
- Best Fit: O(log n) per item, 1.7-competitive (similar to FF)
- Lower bound: 1.54-competitive is impossible for online algorithms
- First Fit Decreasing: 11/9-competitive with sorting (semi-online)
- The gap between online lower bound (1.54) and best algorithm (1.7) remains partially open
- Applications span memory management, storage, cloud computing, and manufacturing
