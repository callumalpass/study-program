# Universal Hashing, Perfect Hashing, and Bloom Filters

## Introduction

Hashing is fundamental to data structures and algorithms. Randomized hashing techniques provide worst-case guarantees and practical efficiency. Universal hashing ensures no worst-case input exists, perfect hashing achieves O(1) worst-case lookups, and Bloom filters provide space-efficient probabilistic membership testing.

## Hash Functions

A hash function $h: U \to [m]$ maps universe $U$ to table of size $m$. **Collision**: $h(x) = h(y)$ for $x \neq y$. **Chaining**: Store colliding elements in linked list at each slot. **Expected search time**: $O(1 + \alpha)$ where $\alpha = n/m$ is load factor.

## Universal Hashing

**Definition**: Family $\mathcal{H}$ is universal if $\forall x \neq y: \Pr_{h \in \mathcal{H}}[h(x) = h(y)] \leq \frac{1}{m}$. **Construction**: For prime $p > |U|$, define $h_{ab}(x) = ((ax + b) \mod p) \mod m$ for $a,b \in \mathbb{Z}_p, a \neq 0$. **Analysis**: Expected collisions for key $x$ is at most $n/m$ under random $h \in \mathcal{H}$.

## Perfect Hashing

**Goal**: $O(1)$ worst-case lookup with $O(n)$ space. **FKS scheme** (Fredman-Komlós-Szemerédi): Two-level hashing with universal hash functions. First level: $O(n)$ space. Second level: $O(n_i^2)$ space for $n_i$ colliding keys. Total space: $O(n)$ with probability $> 1-1/n$.

## Bloom Filters

**Space-efficient probabilistic** set membership. Uses $k$ hash functions and $m$ bits. **Insert**: Set $h_1(x), \ldots, h_k(x)$ to 1. **Query**: Check if all $h_i(x)$ are 1. **False positives possible, no false negatives**. **Optimal $k$**: $k = (m/n) \ln 2 \approx 0.7m/n$ gives false positive rate $(1/2)^k$.

## Applications

**Databases**: Hash joins, aggregation. **Caching**: Web caches, CDNs. **Blockchain**: Merkle trees use hashing. **Security**: Password storage (cryptographic hashing). **Distributed systems**: Consistent hashing for load balancing.

