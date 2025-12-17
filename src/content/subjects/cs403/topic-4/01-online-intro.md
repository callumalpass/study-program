# Introduction to Online Algorithms: Competitive Analysis

## Introduction

Online algorithms make irrevocable decisions without knowledge of future inputs, unlike offline algorithms that see the entire input sequence. Competitive analysis compares online performance to optimal offline performance, providing worst-case guarantees.

## Online vs Offline

**Offline algorithm**: Sees entire input before making decisions. Can optimize globally.

**Online algorithm**: Processes input incrementally. Must decide immediately without future knowledge.

**Example - Ski Rental**: Rent skis daily ($1/day) or buy ($10). Don't know how many days you'll ski.
- **Offline**: If skiing $\geq 10$ days, buy. Otherwise rent.
- **Online**: Don't know future, must decide each day.

## Competitive Ratio

**Definition**: Algorithm ALG is **c-competitive** if for all input sequences $\sigma$:
$$\text{ALG}(\sigma) \leq c \cdot \text{OPT}(\sigma) + \alpha$$

where $\alpha$ is additive constant (often 0 for minimization).

**Interpretation**: Online algorithm never more than $c$ times worse than optimal offline.

## Adversary Model

**Oblivious adversary**: Chooses input sequence in advance, doesn't adapt to algorithm's random choices.

**Adaptive adversary**: Sees algorithm's decisions (including random bits) before choosing next input.

**Most analysis**: Oblivious adversary (more realistic).

## Example: Paging

**Problem**: Cache of $k$ pages, request sequence. On cache miss, evict page.

**LRU** (Least Recently Used): Evict page accessed longest ago.
**Competitive ratio**: $k$ (optimal for deterministic algorithms)

**Randomized**: Random eviction achieves $O(\log k)$ competitive ratio.

## Lower Bounds

**Theorem**: No deterministic online algorithm for paging can achieve competitive ratio better than $k$.

**Proof**: Adversary requests $k+1$ distinct pages repeatedly. Online algorithm misses once per $k+1$ requests. Offline misses once per $k+1$ requests at best, but can do better with lookahead.

## Applications

**Resource allocation**: CPU scheduling, memory management
**Network routing**: Route packets without global network state
**Financial trading**: Buy/sell decisions without future price knowledge
**Caching**: Web caches, DNS caches, database buffers

## Conclusion

Online algorithms model real-world scenarios where decisions must be made with incomplete information. Competitive analysis provides worst-case performance guarantees, bridging theory and practice.
