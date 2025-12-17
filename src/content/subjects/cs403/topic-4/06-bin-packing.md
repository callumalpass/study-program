# Online Bin Packing: First Fit, Next Fit Algorithms

## Introduction

Online bin packing packs items into bins as they arrive. It's NP-hard offline and challenging online, with applications in memory allocation, storage management, and resource provisioning.

## Problem

**Input**: Items with sizes $s_1, s_2, \ldots \in (0,1]$ arrive online

**Bins**: Capacity 1 each

**Goal**: Minimize number of bins used

## First Fit (FF)

**Algorithm**: Place item in first bin with sufficient space. Open new bin if necessary.

```typescript
function firstFit(items: number[]): number {
    const bins: number[] = [];
    for (const item of items) {
        let placed = false;
        for (let i = 0; i < bins.length; i++) {
            if (bins[i] + item <= 1) {
                bins[i] += item;
                placed = true;
                break;
            }
        }
        if (!placed) bins.push(item);
    }
    return bins.length;
}
```

**Competitive ratio**: 1.7 (asymptotic)

**Absolute**: FF$(I) \leq 1.7 \cdot \text{OPT}(I) + 3$

## Next Fit (NF)

**Algorithm**: Try to place in current bin. If doesn't fit, close current bin and open new one.

**Competitive ratio**: 2 (tight)

**Advantage**: $O(1)$ time per item (vs $O(n)$ for FF)

## Best Fit (BF)

**Algorithm**: Place item in bin with least remaining space that fits.

**Competitive ratio**: Also 1.7 (asymptotic)

**Implementation**: Use heap/balanced tree, $O(\log n)$ per item

## First Fit Decreasing (FFD) - Semi-online

If items can be sorted first (semi-online):

**FFD**: Sort items in decreasing order, then apply First Fit

**Approximation**: FFD$(I) \leq \frac{11}{9}\text{OPT}(I) + \frac{6}{9}$

**Asymptotic**: 11/9 ratio (better than 1.7)

## Lower Bounds

**Theorem**: No online algorithm can achieve competitive ratio better than 1.54 (approximately)

**Proof**: Adversarial construction forces many bins for online algorithm while optimal packing is dense.

## Applications

**Memory allocation**: Pack processes into memory pages
**Disk storage**: Allocate files to disk blocks
**Cloud computing**: Pack VMs onto physical servers  
**Cutting stock**: Minimize material waste

## Conclusion

First Fit achieves 1.7-competitive ratio for online bin packing. This is provably near-optimal. For semi-online (sorted input), FFD improves to 11/9.
