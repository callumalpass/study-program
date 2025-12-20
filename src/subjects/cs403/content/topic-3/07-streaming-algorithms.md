# Streaming Algorithms: Count-Min Sketch, Reservoir Sampling, Distinct Elements

## Introduction

Streaming algorithms process massive datasets that are too large to store in memory, using randomization and approximation to compute useful statistics in sublinear space. These algorithms are essential for big data processing, network monitoring, and real-time analytics where the data volume exceeds available memory by orders of magnitude.

The streaming model fundamentally changes algorithm design: we can only examine each data element once, and must maintain a compact summary that supports the queries we need.

## The Streaming Model

**Input**: A stream of elements $a_1, a_2, \ldots, a_m$ arriving sequentially. The stream may be arbitrarily long (potentially infinite) or too large to store.

**Constraints**:
- **Single pass**: Each element can only be examined once as it arrives
- **Sublinear space**: Memory usage must be $o(m)$, typically $O(\text{polylog } m)$
- **Per-element time**: Processing time per element must be low (often $O(1)$ or $O(\log m)$)

**Operations**:
- **Update**: Process an arriving element and update the summary
- **Query**: Answer questions about the stream using only the summary

**Goal**: Provide approximate answers with high probability, trading exactness for massive space savings.

## Count-Min Sketch

The Count-Min Sketch estimates the frequency of items in a data stream.

### Problem

Given a stream of items from a universe $U$, estimate the frequency $f_x$ of any item $x$.

**Exact solution**: Maintain a hash table with exact counts—requires $O(n)$ space where $n$ is the number of distinct items.

**Streaming goal**: $O(\frac{1}{\epsilon} \log \frac{1}{\delta})$ space with $(\epsilon, \delta)$-approximation guarantees.

### Data Structure

The Count-Min Sketch uses a $d \times w$ array of counters, along with $d$ pairwise independent hash functions $h_1, \ldots, h_d: U \to [w]$.

```typescript
class CountMinSketch {
    private table: number[][];
    private hashFunctions: Array<(x: string) => number>;
    private width: number;
    private depth: number;

    constructor(epsilon: number, delta: number) {
        this.width = Math.ceil(Math.E / epsilon);
        this.depth = Math.ceil(Math.log(1 / delta));
        this.table = Array(this.depth)
            .fill(null)
            .map(() => Array(this.width).fill(0));
        this.hashFunctions = this.generateHashes(this.depth, this.width);
    }

    update(item: string, count: number = 1): void {
        for (let i = 0; i < this.depth; i++) {
            const j = this.hashFunctions[i](item);
            this.table[i][j] += count;
        }
    }

    query(item: string): number {
        let min = Infinity;
        for (let i = 0; i < this.depth; i++) {
            const j = this.hashFunctions[i](item);
            min = Math.min(min, this.table[i][j]);
        }
        return min;
    }
}
```

### Analysis

**Guarantee**: For any item $x$, let $\hat{f}_x$ be the estimate. Then:
$$f_x \leq \hat{f}_x \leq f_x + \epsilon \cdot \|f\|_1$$

with probability at least $1 - \delta$, where $\|f\|_1 = \sum_y f_y$ is the total count.

**No underestimates**: The estimate is always at least the true frequency (we might count collisions, never remove true counts).

**Space**: $O(\frac{1}{\epsilon} \log \frac{1}{\delta})$ counters.

### Why It Works

Each row gives an independent estimate. The probability that a single row overestimates by more than $\epsilon \|f\|_1$ is at most $1/e$ (by Markov inequality on hash collisions).

With $d = \ln(1/\delta)$ independent rows, the probability that all rows overestimate is at most $(1/e)^d = \delta$.

Taking the minimum across rows gives the tightest estimate.

## Reservoir Sampling

Reservoir sampling maintains a uniform random sample of $k$ elements from a stream of unknown length.

### Problem

Sample $k$ elements uniformly at random from a stream, where the total length is unknown in advance.

### Algorithm

```typescript
function reservoirSampling(stream: Iterable<T>, k: number): T[] {
    const reservoir: T[] = [];
    let i = 0;

    for (const item of stream) {
        if (i < k) {
            // Fill the reservoir initially
            reservoir.push(item);
        } else {
            // Replace with probability k/(i+1)
            const j = Math.floor(Math.random() * (i + 1));
            if (j < k) {
                reservoir[j] = item;
            }
        }
        i++;
    }

    return reservoir;
}
```

### Correctness

**Claim**: After processing $n$ elements, each element is in the reservoir with probability exactly $k/n$.

**Proof by induction**:

**Base case**: After $k$ elements, all are in reservoir with probability 1 = $k/k$.

**Inductive step**: Assume true after $n$ elements. When element $n+1$ arrives:

- Element $n+1$ enters with probability $k/(n+1)$.
- Each earlier element $i$ stays with probability:
  $$\frac{k}{n} \cdot \left(1 - \frac{k}{n+1} \cdot \frac{1}{k}\right) = \frac{k}{n} \cdot \frac{n}{n+1} = \frac{k}{n+1}$$

So each element has probability $k/(n+1)$ after $n+1$ elements. ✓

### Weighted Reservoir Sampling

For weighted sampling (probability proportional to weight):

```typescript
function weightedReservoirSampling(stream: Iterable<[T, number]>, k: number): T[] {
    const reservoir: Array<{item: T, key: number}> = [];

    for (const [item, weight] of stream) {
        const key = Math.pow(Math.random(), 1 / weight);

        if (reservoir.length < k) {
            reservoir.push({item, key});
            reservoir.sort((a, b) => b.key - a.key);
        } else if (key > reservoir[k-1].key) {
            reservoir[k-1] = {item, key};
            reservoir.sort((a, b) => b.key - a.key);
        }
    }

    return reservoir.map(r => r.item);
}
```

## Distinct Elements (Flajolet-Martin)

Estimating the number of distinct elements in a stream is surprisingly difficult: exact counting requires $\Omega(n)$ space.

### Problem

Given a stream containing $n$ elements with $d$ distinct values, estimate $d$.

### HyperLogLog Algorithm

The key insight: hash each element to a binary string, and track the maximum number of leading zeros seen.

If elements are uniformly distributed, expected maximum leading zeros is $\log_2 d$.

```typescript
function hyperLogLog(stream: Iterable<T>, numRegisters: number = 16): number {
    const registers = new Array(numRegisters).fill(0);

    for (const item of stream) {
        const hash = hashToBits(item);
        const registerIndex = hash >>> (32 - Math.log2(numRegisters));
        const remainingBits = hash & ((1 << (32 - Math.log2(numRegisters))) - 1);
        const leadingZeros = countLeadingZeros(remainingBits);
        registers[registerIndex] = Math.max(registers[registerIndex], leadingZeros);
    }

    // Harmonic mean of 2^register values
    const alphaM = 0.7213 / (1 + 1.079 / numRegisters);
    const sum = registers.reduce((acc, r) => acc + Math.pow(2, -r), 0);
    const estimate = alphaM * numRegisters * numRegisters / sum;

    return Math.round(estimate);
}
```

**Space**: $O(m)$ bits for $m$ registers gives standard error $\approx 1.04/\sqrt{m}$.

**Practical**: 1KB of memory achieves ~2% error for billions of distinct elements.

## Applications

**Network monitoring**: Track flow statistics, detect DDoS attacks by counting distinct source IPs, identify heavy hitters.

**Database query optimization**: Estimate join cardinality and selectivity for query planning.

**Web analytics**: Count unique visitors, track page view frequencies, identify trending topics.

**Recommendation systems**: Track item frequencies for popularity-based recommendations.

**Log analysis**: Sample representative log entries, estimate error frequencies.

## Key Takeaways

- Streaming algorithms trade exactness for massive space savings
- Count-Min Sketch: $O(\frac{1}{\epsilon} \log \frac{1}{\delta})$ space for frequency estimation
- Reservoir sampling: $O(k)$ space for uniform sampling from unknown-length streams
- HyperLogLog: $O(\log \log n)$ space for distinct element counting
- Randomization is essential: deterministic streaming lower bounds are much worse
- These algorithms power real-world big data systems (Redis, Spark, network monitors)
