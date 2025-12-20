# Universal Hashing, Perfect Hashing, and Bloom Filters

## Introduction

Hashing is fundamental to data structures and algorithms. Randomized hashing techniques provide worst-case guarantees and practical efficiency that deterministic approaches cannot match. Universal hashing ensures no adversarial worst-case input exists, perfect hashing achieves O(1) worst-case lookups, and Bloom filters provide space-efficient probabilistic membership testing.

Understanding randomized hashing is essential for designing efficient systems, from database engines to network routers to distributed caches. These techniques demonstrate how randomization transforms average-case guarantees into worst-case expectations.

## Hash Function Basics

A hash function $h: U \to [m]$ maps elements from a universe $U$ to a table of size $m$.

**Collision**: When $h(x) = h(y)$ for distinct elements $x \neq y$.

**Collision resolution**:
- **Chaining**: Store colliding elements in a linked list at each slot
- **Open addressing**: Probe for empty slots (linear probing, quadratic probing)

**Load factor**: $\alpha = n/m$ where $n$ is the number of elements stored.

**Expected search time** with chaining: $O(1 + \alpha)$ under the simple uniform hashing assumption.

**Problem**: For any fixed hash function, an adversary can construct worst-case input with all elements mapping to the same slot, giving $\Theta(n)$ lookup time.

## Universal Hashing

**Definition**: A family $\mathcal{H}$ of hash functions is **universal** if for all $x \neq y$:
$$\Pr_{h \in \mathcal{H}}[h(x) = h(y)] \leq \frac{1}{m}$$

The probability is over random choice of $h$ from $\mathcal{H}$.

### Carter-Wegman Construction

For prime $p > |U|$, define:
$$h_{a,b}(x) = ((ax + b) \mod p) \mod m$$

where $a \in \{1, 2, \ldots, p-1\}$ and $b \in \{0, 1, \ldots, p-1\}$.

**Theorem**: $\mathcal{H} = \{h_{a,b} : a \in \mathbb{Z}_p^*, b \in \mathbb{Z}_p\}$ is universal.

```typescript
class UniversalHashFamily {
    private p: bigint;  // Prime larger than universe
    private m: number;  // Table size

    constructor(universeSize: number, tableSize: number) {
        this.p = this.nextPrime(BigInt(universeSize));
        this.m = tableSize;
    }

    randomHash(): (x: number) => number {
        const a = BigInt(1 + Math.floor(Math.random() * (Number(this.p) - 1)));
        const b = BigInt(Math.floor(Math.random() * Number(this.p)));
        const p = this.p;
        const m = this.m;

        return (x: number) => Number((a * BigInt(x) + b) % p) % m;
    }
}
```

### Analysis

**Theorem**: For any set $S$ of $n$ keys and any key $x \in S$, the expected number of collisions with $x$ under random $h \in \mathcal{H}$ is at most $(n-1)/m$.

**Proof**:
Let $X_y = 1$ if $h(x) = h(y)$ for $y \neq x$.

$$\mathbb{E}\left[\sum_{y \in S, y \neq x} X_y\right] = \sum_{y \in S, y \neq x} \Pr[h(x) = h(y)] \leq (n-1) \cdot \frac{1}{m}$$

**Corollary**: Expected lookup time is $O(1 + n/m) = O(1)$ when $m = \Theta(n)$.

## Perfect Hashing

**Goal**: Achieve $O(1)$ **worst-case** lookup time with $O(n)$ space.

### FKS Scheme (Fredman-Komlós-Szemerédi)

**Two-level hashing**:

1. **First level**: Universal hash function $h$ maps $n$ keys to $m = n$ slots
2. **Second level**: For each slot $i$ with $n_i$ collisions, use a second hash function to a table of size $m_i = n_i^2$

```typescript
class PerfectHashTable<T> {
    private firstLevel: ((x: number) => number);
    private secondLevel: Array<{hash: (x: number) => number, table: T[]}>;

    constructor(keys: number[], values: T[]) {
        const n = keys.length;

        // First level: hash to n slots
        this.firstLevel = universalHash(n);
        const buckets: number[][] = Array(n).fill(null).map(() => []);

        for (let i = 0; i < n; i++) {
            buckets[this.firstLevel(keys[i])].push(i);
        }

        // Second level: for each bucket, use n_i^2 slots
        this.secondLevel = buckets.map((bucket, i) => {
            const ni = bucket.length;
            const mi = ni * ni;  // Quadratic space per bucket
            const h2 = universalHash(mi);
            const table = Array(mi).fill(null);

            // Verify no collisions (retry if needed)
            for (const idx of bucket) {
                table[h2(keys[idx])] = values[idx];
            }

            return {hash: h2, table};
        });
    }

    get(key: number): T | null {
        const bucket = this.firstLevel(key);
        const {hash, table} = this.secondLevel[bucket];
        return table[hash(key)];
    }
}
```

### Space Analysis

**Expected total space**:
$$\sum_{i=1}^{m} n_i^2$$

**Key insight**: $\sum n_i^2 \leq 2n$ with probability $\geq 1/2$.

**Proof**: Let $X_{jk} = 1$ if keys $j$ and $k$ collide at first level.

$$\mathbb{E}\left[\sum n_i^2\right] = \mathbb{E}\left[n + 2\sum_{j < k} X_{jk}\right] \leq n + 2 \cdot \binom{n}{2} \cdot \frac{1}{n} = n + (n-1) < 2n$$

By Markov's inequality, $\Pr[\sum n_i^2 > 4n] \leq 1/2$.

Retry first-level hash until space is acceptable; expected 2 tries.

## Bloom Filters

Bloom filters provide space-efficient probabilistic set membership with one-sided error.

**Structure**: $m$ bits (initially all 0) and $k$ independent hash functions $h_1, \ldots, h_k$.

**Insert(x)**: Set bits $h_1(x), h_2(x), \ldots, h_k(x)$ to 1.

**Query(x)**: Return true iff all bits $h_1(x), \ldots, h_k(x)$ are 1.

```typescript
class BloomFilter {
    private bits: Uint8Array;
    private hashFunctions: Array<(x: string) => number>;

    constructor(m: number, k: number) {
        this.bits = new Uint8Array(Math.ceil(m / 8));
        this.hashFunctions = Array(k).fill(null).map((_, i) =>
            (x: string) => this.hash(x, i) % m
        );
    }

    insert(x: string): void {
        for (const h of this.hashFunctions) {
            this.setBit(h(x));
        }
    }

    query(x: string): boolean {
        return this.hashFunctions.every(h => this.getBit(h(x)));
    }
}
```

### Analysis

**No false negatives**: If $x$ was inserted, query always returns true.

**False positive rate**: After inserting $n$ elements:
$$\Pr[\text{false positive}] \approx \left(1 - e^{-kn/m}\right)^k$$

**Optimal $k$**: To minimize false positive rate, choose $k = (m/n) \ln 2 \approx 0.693 \cdot m/n$.

This gives false positive rate approximately $(1/2)^k = (0.6185)^{m/n}$.

**Space-time tradeoff**: Smaller $m$ means more false positives; larger $k$ means more hash computations.

## Practical Applications

**Database systems**: Hash joins for query processing, hash-based aggregation, hash indexes.

**Caching**: Web caches use hashing for lookup; consistent hashing for distributed caches.

**Networking**: Bloom filters in routers for packet classification; hash tables for NAT tables.

**Security**: Password storage uses cryptographic hashing; Merkle trees in blockchain.

**Distributed systems**: Consistent hashing for load balancing; CRDTs use hashing.

## Key Takeaways

- Universal hashing eliminates worst-case inputs through randomization
- Perfect hashing achieves $O(1)$ worst-case lookup with $O(n)$ space
- Bloom filters trade false positives for extreme space efficiency
- Randomized hashing is essential for robust, efficient systems
- Two-level hashing demonstrates how quadratic blow-up at each level yields linear total space
