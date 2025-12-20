# Paging Algorithms: LRU, FIFO, and Competitive Ratios

## Introduction

Paging is one of the most fundamental and practically important online problems in computer science. Every modern computer system relies on caching at multiple levels—CPU L1/L2/L3 caches, virtual memory page tables, web browser caches, database buffer pools, and content delivery networks all face the same fundamental question: when the cache is full and a new item must be brought in, which existing item should be evicted?

The paging problem captures this essence: we have a fast memory (cache) of limited size $k$, and a slow memory containing all pages. Requests arrive online, and each miss (requesting a page not in cache) incurs cost. The challenge is that we must decide eviction immediately, without knowledge of future requests.

This problem is historically significant—it motivated the development of competitive analysis in the 1980s and remains central to systems design today.

## Problem Definition

**Input**:
- Cache of size $k$ (can hold $k$ pages simultaneously)
- Sequence of page requests $\sigma = r_1, r_2, \ldots, r_m$ from universe of $n$ pages

**Cost model**:
- **Cache hit**: Request for page already in cache. Cost = 0.
- **Cache miss**: Request for page not in cache. Cost = 1. Must bring page into cache, evicting another if cache is full.

**Goal**: Minimize total number of cache misses.

**Assumption**: $n > k$ (otherwise problem is trivial—cache all pages).

The problem is inherently online: when request $r_i$ arrives, the algorithm must decide which page to evict (if any) knowing only $r_1, \ldots, r_i$, not future requests.

## Offline Optimal: Farthest in Future

**Furthest-in-Future** (Bélády's algorithm, 1966): On a miss, evict the page whose next request is furthest in the future. If a page is never requested again, evict it.

**Theorem**: Furthest-in-Future is optimal for offline paging.

**Proof sketch** (exchange argument): Consider any optimal algorithm OPT that differs from FF. Find the first point where they evict different pages. Show we can modify OPT to match FF at this point without increasing cost. By induction, FF achieves optimal cost.

**Example**: Cache size $k=3$, requests: 1,2,3,4,1,2,5,1,2,3,4,5

| Request | FF Cache | FF Action |
|---------|----------|-----------|
| 1 | {1} | Miss, load 1 |
| 2 | {1,2} | Miss, load 2 |
| 3 | {1,2,3} | Miss, load 3 |
| 4 | {1,2,4} | Miss, evict 3 (furthest next use) |
| 1 | {1,2,4} | Hit |
| 2 | {1,2,4} | Hit |
| 5 | {1,2,5} | Miss, evict 4 |

FF achieves 5 misses, which is optimal for this sequence.

## LRU: Least Recently Used

**Algorithm**: On a miss, evict the page that was accessed least recently.

**Intuition**: Recent past predicts near future. Pages accessed recently are likely to be accessed again soon (temporal locality).

**Implementation**: Maintain pages in order of last access using a doubly-linked list combined with a hash map for O(1) lookups.

```typescript
class LRU {
    cache: Map<Page, Node>;
    order: DoublyLinkedList;
    capacity: number;

    access(page: Page): void {
        if (this.cache.has(page)) {
            // Hit: move to front (most recently used)
            this.order.moveToFront(this.cache.get(page));
        } else {
            // Miss: evict LRU if full, insert new page
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

**Competitive ratio**: $k$-competitive (optimal for deterministic algorithms).

**Proof of $k$-competitive upper bound**:

Consider any request sequence $\sigma$. Partition $\sigma$ into phases where each phase contains requests to exactly $k+1$ distinct pages (phase ends when $(k+1)$-th distinct page is requested).

**LRU cost per phase**: At most $k$ misses (after first request in phase, LRU has all $k$ recently requested pages; it misses at most once per distinct page).

**OPT cost per phase**: At least 1 miss (phase involves $k+1$ distinct pages but cache holds only $k$).

**Ratio**: LRU/OPT $\leq k$.

**Lower bound**: Any deterministic algorithm has competitive ratio at least $k$. The adversary can force this by always requesting the page just evicted.

## FIFO: First In First Out

**Algorithm**: Evict the page that entered the cache first, regardless of how recently it was accessed.

**Implementation**: Simple queue of pages. O(1) operations.

```typescript
class FIFO {
    cache: Set<Page>;
    queue: Queue<Page>;
    capacity: number;

    access(page: Page): void {
        if (!this.cache.has(page)) {
            if (this.cache.size === this.capacity) {
                const evicted = this.queue.dequeue();
                this.cache.delete(evicted);
            }
            this.queue.enqueue(page);
            this.cache.add(page);
        }
        // On hit: do nothing (unlike LRU)
    }
}
```

**Competitive ratio**: Also $k$-competitive.

**Comparison with LRU**: FIFO ignores access patterns after initial loading. LRU adapts by tracking recency. In practice, LRU performs significantly better on workloads with temporal locality.

**Bélády's anomaly**: Counterintuitively, increasing FIFO cache size can increase misses for some request sequences. For sequence 1,2,3,4,1,2,5,1,2,3,4,5:
- Cache size 3: 9 misses
- Cache size 4: 10 misses (worse!)

This anomaly does not occur with LRU, making LRU theoretically cleaner despite same competitive ratio.

## LFU: Least Frequently Used

**Algorithm**: Evict the page with the lowest access count.

**Implementation**: Maintain a counter per page and use a priority queue (min-heap on counts).

**Problem**: Frequency-based policies suffer from "cache pollution." Old pages accumulate high counts and are never evicted, even if they haven't been accessed recently. A page accessed 1000 times yesterday may never be evicted despite being irrelevant today.

**Competitive ratio**: Unbounded—can be $\Omega(n)$ in worst case. Consider a sequence that accesses one page $n$ times, then $k$ new pages repeatedly. The high-count page occupies a slot forever.

**LFU with aging**: Decay counts over time to address cache pollution, but this introduces parameters and complexity.

## Randomized Algorithms

Randomization can improve competitive ratio from $k$ to $O(\log k)$—exponentially better for large caches.

**Marking algorithm**:
1. Maintain a "marked" bit for each cached page
2. On access: mark the page
3. On miss when cache full:
   - If all pages marked, unmark all
   - Evict a random unmarked page

```typescript
function markingEvict(cache: Page[]): Page {
    const unmarked = cache.filter(p => !p.marked);
    if (unmarked.length === 0) {
        cache.forEach(p => p.marked = false);
        return cache[Math.floor(Math.random() * cache.length)];
    }
    return unmarked[Math.floor(Math.random() * unmarked.length)];
}
```

**Theorem**: Marking algorithm is $O(\log k)$-competitive against oblivious adversaries.

**Proof idea**: In each phase (between unmarking events), marking ensures we never evict a page that will be requested again in this phase. Random choice among unmarked pages distributes risk.

**Lower bound**: Against adaptive adversaries (who see our random choices), no randomized algorithm can do better than $k$-competitive. Randomization only helps against oblivious adversaries.

## Practical Considerations

Real systems need algorithms that balance theoretical guarantees with implementation efficiency.

**Clock algorithm** (Second Chance): Approximates LRU with O(1) overhead.
- Pages arranged in circular list with "clock hand"
- Each page has a reference bit, set on access
- On eviction: scan from clock hand. If reference bit is 1, clear it and move on. If 0, evict.
- Used in many operating systems (Linux, BSD variants)

**2Q algorithm**: Separates recency from frequency using two queues.
- A1 queue: Recently accessed pages (FIFO)
- Am queue: Frequently accessed pages (LRU)
- Pages promoted from A1 to Am on second access
- Better than pure LRU for scan-resistant workloads

**ARC** (Adaptive Replacement Cache): Self-tuning balance between recency and frequency.
- Maintains ghost entries (recently evicted pages)
- Dynamically adjusts balance based on which ghost entries get requested
- Used in ZFS filesystem, IBM storage systems

## Applications

Paging appears throughout computing systems:

**Virtual memory**: Operating systems use page replacement to manage physical memory. When a process accesses a page not in RAM, a page fault triggers eviction of another page to disk.

**CPU caches**: Hardware L1/L2/L3 caches use simplified policies (often pseudo-LRU) implemented in circuits.

**Web caching**: Browser caches, proxy caches, and CDN edge servers cache web resources to reduce latency and bandwidth.

**Database buffer pools**: Database systems cache frequently accessed disk pages in memory using variants of LRU with domain-specific optimizations.

**Key-value stores**: Redis, Memcached use LRU variants for memory management.

## Key Takeaways

- Paging is the canonical online algorithm problem, motivating competitive analysis
- Bélády's optimal offline algorithm evicts the page used furthest in the future
- LRU achieves optimal $k$-competitive ratio for deterministic algorithms
- FIFO is also $k$-competitive but exhibits Bélády's anomaly
- Randomization (marking algorithm) achieves $O(\log k)$ against oblivious adversaries
- Practical systems use approximate LRU (Clock, 2Q, ARC) for efficiency
- The $k$ lower bound is tight: no deterministic algorithm can do better
