# Paging Algorithms: LRU, FIFO, and Competitive Ratios

## Introduction

Paging (or caching) is fundamental in computer systems - from CPU caches to web caches to virtual memory. The paging problem asks: which page to evict when cache is full?

## Problem Definition

**Input**: 
- Cache of size $k$
- Sequence of page requests $\sigma = r_1, r_2, \ldots$

**Cost**: Number of cache misses (page not in cache when requested)

**Goal**: Minimize total cost

## Offline Optimal: Farthest in Future

**Furthest-in-Future** (Bélády's algorithm): Evict page whose next request is furthest in future.

**Theorem**: Furthest-in-Future is optimal for offline paging.

**Example**: Cache size $k=3$, requests: 1,2,3,4,1,2,5,1,2,3,4,5

**Proof**: Exchange argument - any other algorithm can be transformed to FF without increasing cost.

## LRU: Least Recently Used

**Algorithm**: Evict page accessed longest ago.

**Implementation**: Maintain pages in order of last access (stack or linked list).

```typescript
class LRU {
    cache: Map<Page, Node>;
    order: DoublyLinkedList;
    capacity: number;
    
    access(page: Page): void {
        if (this.cache.has(page)) {
            // Hit: move to front
            this.order.moveToFront(this.cache.get(page));
        } else {
            // Miss: evict LRU, insert new
            if (this.cache.size === this.capacity) {
                const evicted = this.order.removeLast();
                this.cache.delete(evicted.page);
            }
            const node = this.order.addFirst(page);
            this.cache.set(page, node);
        }
    }
}
```

**Competitive ratio**: $k$ (optimal for deterministic)

**Proof**: Consider any request sequence. LRU maintains $k$ most recently used pages. In worst case, adversary requests $k+1$ distinct pages repeatedly. LRU misses on every request to $(k+1)$-th page. Optimal misses at least once per $k+1$ requests. Ratio: $\frac{k+1}{1} \approx k$.

## FIFO: First In First Out

**Algorithm**: Evict page that has been in cache longest (regardless of access).

**Implementation**: Queue of pages.

**Competitive ratio**: Also $k$

**Worse in practice**: Doesn't exploit temporal locality like LRU.

**Bélády's anomaly**: Increasing cache size can increase misses for FIFO (counterintuitive!).

## LFU: Least Frequently Used

**Algorithm**: Evict page accessed least frequently.

**Implementation**: Counter per page, priority queue.

**Problem**: Old pages accumulate high counts, never evicted even if not recently used.

**Competitive ratio**: Not constant (can be $\Omega(n)$ in worst case).

## Randomized Algorithms

**Marking algorithm**:
- Mark pages on access
- On miss, if all pages marked, unmark all
- Evict random unmarked page

**Competitive ratio**: $O(\log k)$ against oblivious adversary

**Lower bound**: Any randomized algorithm against adaptive adversary has ratio $\Omega(k)$.

## Practical Considerations

**Clock algorithm**: Approximates LRU with less overhead
- Circular list with "clock hand"
- Reference bit per page
- Scan for unreferenced page

**2Q algorithm**: Two queues - recent and frequently used
- Better than LRU for some workloads

**ARC** (Adaptive Replacement Cache): Self-tuning, adapts to workload
- Balances recency and frequency

## Applications

**Virtual memory**: OS page replacement
**CPU caches**: L1/L2/L3 cache management
**Web caching**: Browser caches, CDN caching
**Database buffers**: Disk page caching

## Conclusion

LRU achieves optimal $k$-competitive ratio for deterministic paging algorithms. In practice, approximate LRU variants offer good performance with low overhead. Randomization can improve competitive ratio logarithmically against oblivious adversaries.
