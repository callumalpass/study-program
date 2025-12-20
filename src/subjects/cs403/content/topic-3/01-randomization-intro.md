# Introduction to Randomized Algorithms: Monte Carlo vs Las Vegas

## Introduction

Randomized algorithms use random bits to make algorithmic decisions, often achieving better performance than deterministic algorithms. They represent a powerful paradigm where we trade determinism for efficiency or simplicity.

Understanding randomized algorithms requires probability theory and careful analysis of expected behavior. The distinction between Monte Carlo and Las Vegas algorithms captures two fundamental approaches to randomization.

## Why Randomize?

**Advantages**:
1. **Simplicity**: Randomized algorithms often simpler than deterministic counterparts
2. **Efficiency**: Better expected/average-case performance
3. **Impossibility bypass**: Some problems require randomization (e.g., distributed consensus)
4. **Adversary resistance**: No worst-case input for randomized algorithms

**Example**: Quicksort with random pivot
- Deterministic: $O(n^2)$ worst-case on sorted input
- Randomized: $O(n \log n)$ expected time regardless of input

## Monte Carlo Algorithms

### Definition

**Monte Carlo** algorithms:
- Always run in bounded time
- May produce incorrect answer with small probability
- Probability of error can be made arbitrarily small

**Characteristics**:
- Fixed running time
- Probabilistic correctness
- One-sided or two-sided error

### Example: Randomized MIN-CUT

**Karger's algorithm** for minimum cut:

```typescript
function kargerMinCut(G: Graph): number {
    let H = G.clone();
    
    while (H.vertices() > 2) {
        // Choose random edge
        const e = H.randomEdge();
        
        // Contract edge (merge endpoints)
        H.contract(e);
    }
    
    // Return number of edges between final 2 vertices
    return H.edgeCount();
}
```

**Analysis**:
- Running time: $O(n^2)$ always
- Success probability: $\geq \frac{2}{n(n-1)}$
- Repeat $O(n^2 \log n)$ times → high probability of finding min-cut

### Error Amplification

Run Monte Carlo algorithm multiple times, take majority vote:

**Theorem**: If algorithm has error probability $p < 1/2$, running $k$ times and taking majority gives error probability $\leq 2^{-\Omega(k)}$.

**Proof**: Chernoff bound on binomial distribution.

```typescript
function amplify<T>(algorithm: () => T, k: number): T {
    const results = new Map<T, number>();
    
    for (let i = 0; i < k; i++) {
        const result = algorithm();
        results.set(result, (results.get(result) || 0) + 1);
    }
    
    // Return most frequent result
    return maxKey(results);
}
```

## Las Vegas Algorithms

### Definition

**Las Vegas** algorithms:
- Always produce correct answer
- Running time is random variable
- Expected running time is bounded

**Characteristics**:
- Probabilistic running time
- Deterministic correctness
- Expected polynomial time

### Example: Randomized Quicksort

```typescript
function randomizedQuicksort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Random pivot
    const pivotIdx = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIdx];
    
    const left = arr.filter((x, i) => i !== pivotIdx && x < pivot);
    const right = arr.filter((x, i) => i !== pivotIdx && x >= pivot);
    
    return [...randomizedQuicksort(left), pivot, ...randomizedQuicksort(right)];
}
```

**Analysis**:
- Always produces sorted array (correct)
- Expected time: $O(n \log n)$
- Worst-case time: $O(n^2)$ (probability exponentially small)

### Example: Randomized Selection

Find $k$-th smallest element:

```typescript
function randomizedSelect(arr: number[], k: number): number {
    if (arr.length === 1) return arr[0];
    
    const pivotIdx = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIdx];
    
    const left = arr.filter((x, i) => i !== pivotIdx && x < pivot);
    const right = arr.filter((x, i) => i !== pivotIdx && x >= pivot);
    
    if (k < left.length) {
        return randomizedSelect(left, k);
    } else if (k === left.length) {
        return pivot;
    } else {
        return randomizedSelect(right, k - left.length - 1);
    }
}
```

**Expected time**: $O(n)$

## Monte Carlo vs Las Vegas Comparison

| Property | Monte Carlo | Las Vegas |
|----------|-------------|-----------|
| Running time | Deterministic | Random |
| Correctness | Probabilistic | Deterministic |
| Error | Bounded probability | Never |
| Example | Randomized MIN-CUT | Randomized Quicksort |
| Amplification | Repeat & majority | Repeat until success |

### Converting Between Types

**Monte Carlo → Las Vegas**:
If we can verify correctness, repeat until correct answer obtained.

**Las Vegas → Monte Carlo**:
Run for fixed time, output best solution found.

**Not always possible**: Some problems only have one type of randomized algorithm.

## Expected Running Time

### Definition

For randomized algorithm with running time $T$ (random variable):

**Expected running time**: $\mathbb{E}[T] = \sum_t t \cdot \Pr[T = t]$

**Theorem** (Markov): $\Pr[T \geq k \cdot \mathbb{E}[T]] \leq \frac{1}{k}$

**Implication**: Running time rarely much larger than expectation.

### Analysis Techniques

**1. Indicator Random Variables**

For event $A$, define:
$$I_A = \begin{cases} 1 & \text{if } A \text{ occurs} \\ 0 & \text{otherwise} \end{cases}$$

**Linearity of expectation**:
$$\mathbb{E}\left[\sum_i I_i\right] = \sum_i \mathbb{E}[I_i] = \sum_i \Pr[A_i]$$

**2. Conditional Expectation**

$$\mathbb{E}[X] = \sum_y \mathbb{E}[X | Y = y] \cdot \Pr[Y = y]$$

**3. Recurrence Relations**

$$\mathbb{E}[T(n)] = \mathbb{E}[\text{work}] + \mathbb{E}[T(\text{subproblem size})]$$

## Probability Tools

### Concentration Bounds

**Markov's Inequality**:
$$\Pr[X \geq a] \leq \frac{\mathbb{E}[X]}{a}$$

**Chebyshev's Inequality**:
$$\Pr[|X - \mathbb{E}[X]| \geq a] \leq \frac{\text{Var}[X]}{a^2}$$

**Chernoff Bound**: For sum of independent random variables $X = \sum X_i$:
$$\Pr[X \geq (1+\delta)\mathbb{E}[X]] \leq e^{-\frac{\delta^2 \mathbb{E}[X]}{3}}$$

### Union Bound

$$\Pr\left[\bigcup_i A_i\right] \leq \sum_i \Pr[A_i]$$

Useful for bounding probability of any bad event.

## Derandomization

Sometimes we can remove randomness while preserving efficiency:

**Method enumeration**: Try all random choices, use best result
- Only works if few random bits used

**Conditional expectations**: Make choice that minimizes expected cost
- Used in MAX-SAT approximation

**Pairwise independence**: Use limited randomness
- Hash functions, sampling

## Applications

### Primality Testing
Monte Carlo algorithm (Miller-Rabin) runs in polynomial time with exponentially small error.

### Polynomial Identity Testing
Schwartz-Zippel lemma: random evaluation detects non-zero polynomials.

### Load Balancing
Randomized assignment achieves good balance with high probability.

### Hashing
Random hash functions avoid worst-case collisions.

## Conclusion

Randomized algorithms provide powerful tools for algorithm design:
- **Monte Carlo**: Fixed time, small error probability
- **Las Vegas**: Always correct, expected polynomial time
- **Analysis**: Probability theory and concentration bounds

Understanding randomization is essential for modern algorithm design, from cryptography to distributed systems to machine learning.
