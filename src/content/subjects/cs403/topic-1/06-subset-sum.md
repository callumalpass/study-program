# Subset Sum, Partition Problem, and Pseudo-Polynomial Time

## Introduction

The Subset Sum problem represents a fascinating case in computational complexity - an NP-complete problem that admits a pseudo-polynomial time algorithm. This property makes it simultaneously intractable in the worst case yet efficiently solvable for many practical instances.

Understanding Subset Sum provides crucial insights into the distinction between strong and weak NP-completeness, the role of numeric parameters in complexity, and the design of dynamic programming algorithms for NP-complete problems.

## The Subset Sum Problem

### Definition

**Problem**: SUBSET-SUM

**Input**: A set of positive integers $S = \{a_1, a_2, \ldots, a_n\}$ and a target sum $t$

**Question**: Is there a subset $S' \subseteq S$ such that $\sum_{a_i \in S'} a_i = t$?

**Example**:
- $S = \{3, 34, 4, 12, 5, 2\}$, $t = 9$
- **Solution**: $S' = \{3, 4, 2\}$ since $3 + 4 + 2 = 9$ ✓

### NP-Completeness

**Theorem**: SUBSET-SUM is NP-complete.

**Proof**:

**Part 1: SUBSET-SUM ∈ NP**

**Certificate**: Subset $S' \subseteq S$

**Verifier**: Sum elements of $S'$ and check if equal to $t$

**Time**: $O(n)$

**Part 2: 3-SAT ≤ₚ SUBSET-SUM**

[Detailed reduction omitted for brevity - involves encoding variables and clauses as numbers]

The reduction creates numbers whose digits encode boolean assignments. The key insight is that we can construct numbers such that finding a subset summing to target $t$ corresponds to finding a satisfying assignment.

Therefore, SUBSET-SUM is NP-complete. ∎

## Pseudo-Polynomial Time Algorithm

### What is Pseudo-Polynomial Time?

An algorithm is **pseudo-polynomial** if its running time is polynomial in the *numeric value* of the input, but exponential in the *length* (number of bits) of the input.

**Example**: An algorithm running in $O(nt)$ time where $n$ is the number of elements and $t$ is the target sum:
- If $t = 1000$, algorithm runs in $O(1000n)$ - fast!
- But $t$ is represented in $\log_2 t \approx 10$ bits
- So runtime is $O(n \cdot 2^{\log t})$, which is exponential in input size

### Dynamic Programming Algorithm

**Idea**: For each prefix $\{a_1, \ldots, a_i\}$ and sum $s \leq t$, determine if we can achieve sum $s$.

**State**: $DP[i][s]$ = true if subset of $\{a_1, \ldots, a_i\}$ sums to $s$

**Base case**: $DP[0][0] = \text{true}$, $DP[0][s] = \text{false}$ for $s > 0$

**Recurrence**:
$$DP[i][s] = DP[i-1][s] \lor DP[i-1][s-a_i]$$

(Either don't include $a_i$, or include it if $s \geq a_i$)

**Answer**: $DP[n][t]$

```typescript
function subsetSumDP(nums: number[], target: number): boolean {
    const n = nums.length;
    const dp: boolean[][] = Array(n + 1).fill(null)
        .map(() => Array(target + 1).fill(false));
    
    // Base case
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }
    
    // Fill table
    for (let i = 1; i <= n; i++) {
        for (let s = 0; s <= target; s++) {
            dp[i][s] = dp[i-1][s]; // Don't include nums[i-1]
            
            if (s >= nums[i-1]) {
                dp[i][s] = dp[i][s] || dp[i-1][s - nums[i-1]]; // Include nums[i-1]
            }
        }
    }
    
    return dp[n][target];
}
```

**Time**: $O(nt)$
**Space**: $O(nt)$ (can be optimized to $O(t)$ using rolling array)

### Space-Optimized Version

Since $DP[i][s]$ only depends on $DP[i-1][*]$, we can use a 1D array:

```typescript
function subsetSumOptimized(nums: number[], target: number): boolean {
    const dp: boolean[] = Array(target + 1).fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        // Iterate backwards to avoid using updated values
        for (let s = target; s >= num; s--) {
            dp[s] = dp[s] || dp[s - num];
        }
    }
    
    return dp[target];
}
```

**Time**: $O(nt)$
**Space**: $O(t)$

### Reconstructing the Subset

To find the actual subset (not just whether it exists):

```typescript
function findSubset(nums: number[], target: number): number[] | null {
    const n = nums.length;
    const dp: boolean[][] = Array(n + 1).fill(null)
        .map(() => Array(target + 1).fill(false));
    
    // Fill DP table (same as before)
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    for (let i = 1; i <= n; i++) {
        for (let s = 0; s <= target; s++) {
            dp[i][s] = dp[i-1][s];
            if (s >= nums[i-1]) {
                dp[i][s] = dp[i][s] || dp[i-1][s - nums[i-1]];
            }
        }
    }
    
    if (!dp[n][target]) return null;
    
    // Backtrack to find subset
    const result: number[] = [];
    let s = target;
    for (let i = n; i > 0; i--) {
        if (!dp[i-1][s]) { // Must have included nums[i-1]
            result.push(nums[i-1]);
            s -= nums[i-1];
        }
    }
    
    return result;
}
```

## The Partition Problem

### Definition

**Problem**: PARTITION

**Input**: A set of positive integers $S = \{a_1, a_2, \ldots, a_n\}$

**Question**: Can $S$ be partitioned into two subsets $S_1$ and $S_2$ such that $\sum_{a \in S_1} a = \sum_{a \in S_2} a$?

**Example**:
- $S = \{1, 5, 11, 5\}$
- **Solution**: $S_1 = \{1, 5, 5\}$, $S_2 = \{11\}$ (both sum to 11) ✓

### Relationship to Subset Sum

**Theorem**: PARTITION is NP-complete.

**Proof**: Reduce PARTITION to SUBSET-SUM:

Given $S$ for PARTITION, compute total sum $T = \sum_{a \in S} a$.

If $T$ is odd, no partition exists (return NO).

If $T$ is even, solve SUBSET-SUM with target $t = T/2$.

**Correctness**:
- If partition exists, one subset sums to $T/2$ (solution to SUBSET-SUM)
- If subset summing to $T/2$ exists, remaining elements sum to $T/2$ (partition exists)

Therefore, PARTITION ≤ₚ SUBSET-SUM.

Combined with SUBSET-SUM being NP-complete, we get PARTITION is NP-complete. ∎

### Dynamic Programming for Partition

```typescript
function canPartition(nums: number[]): boolean {
    const total = nums.reduce((sum, num) => sum + num, 0);
    
    if (total % 2 !== 0) return false;
    
    const target = total / 2;
    return subsetSumOptimized(nums, target);
}
```

**Time**: $O(n \cdot \text{sum})$
**Space**: $O(\text{sum})$

## Strong vs Weak NP-Completeness

### Definitions

A problem is **weakly NP-complete** if:
- It is NP-complete
- It has a pseudo-polynomial time algorithm
- It becomes polynomial when numbers are represented in unary

A problem is **strongly NP-complete** if:
- It remains NP-complete even when numbers are bounded by a polynomial in $n$

**Examples**:
- **Weakly NP-complete**: SUBSET-SUM, PARTITION, KNAPSACK
- **Strongly NP-complete**: 3-SAT, CLIQUE, VERTEX-COVER, HAM-CYCLE, TSP (decision)

### Why the Distinction Matters

**Weakly NP-complete** problems:
- May be practical for small numeric values
- Pseudo-polynomial algorithms can be useful
- Approximation schemes (FPTAS) may exist

**Strongly NP-complete** problems:
- Unlikely to have pseudo-polynomial algorithms
- Must rely on approximation, heuristics, or exponential algorithms

### Unary vs Binary Encoding

**Binary encoding**: Number $n$ represented in $\lceil \log_2 n \rceil + 1$ bits

**Unary encoding**: Number $n$ represented as $n$ ones: $1^n$

**Example**: Number 7
- Binary: 111 (3 bits)
- Unary: 1111111 (7 bits)

For SUBSET-SUM with unary encoding:
- Input size becomes $O(n + \sum a_i)$
- Algorithm running in $O(n \cdot t)$ is now polynomial in input size!

But unary encoding is artificially inflated - binary is the standard.

## Approximation Schemes

### FPTAS for SUBSET-SUM

An **FPTAS** (Fully Polynomial-Time Approximation Scheme) finds a solution within $(1+\epsilon)$ of optimal in time polynomial in both $n$ and $1/\epsilon$.

For SUBSET-SUM, we can find a subset summing to at least $(1-\epsilon) \cdot \text{OPT}$ in $O(n^2/\epsilon)$ time.

**Idea**: Scale and round numbers to reduce the range of possible sums.

```typescript
function subsetSumFPTAS(nums: number[], target: number, epsilon: number): number {
    const n = nums.length;
    const maxNum = Math.max(...nums);
    
    // Scaling factor
    const scale = (epsilon * maxNum) / n;
    
    // Round down numbers
    const roundedNums = nums.map(num => Math.floor(num / scale));
    const roundedTarget = Math.floor(target / scale);
    
    // Solve on rounded instance
    const result = solveScaledSubsetSum(roundedNums, roundedTarget);
    
    // Convert back
    return result * scale;
}
```

**Analysis**:
- Rounded numbers are in range $[0, n/\epsilon]$
- DP runs in $O(n \cdot (n/\epsilon) \cdot \text{target}/\text{maxNum}) = O(n^3/\epsilon)$
- Approximation error: $(1+\epsilon)$ factor

## Applications

### Cryptography

**Knapsack cryptosystems**: Based on hardness of SUBSET-SUM
- **Merkle-Hellman** (1978): First public-key cryptosystem (later broken)
- **Low-density attacks**: Exploits special structure in subset-sum instances

### Resource Allocation

**Multiprocessor scheduling**: Partition jobs to balance load across processors
- Model as PARTITION problem
- Use pseudo-polynomial DP for small job sizes
- Use approximation for large instances

### Financial Planning

**Portfolio optimization**: Select assets to meet target value
- SUBSET-SUM with additional constraints
- Pseudo-polynomial DP feasible for reasonable asset counts and values

### Computational Biology

**Mass spectrometry**: Identify molecule composition from mass
- Subset of atom masses summing to measured mass
- Pseudo-polynomial DP practical for typical mass ranges

## Related Problems

### Equal Sum Subsets

Partition $S$ into $k$ subsets with equal sums.

**Hardness**: NP-complete for $k \geq 2$ (PARTITION is the $k=2$ case)

### Exact Cover by 3-Sets (X3C)

Given a set $X$ with $|X| = 3m$ and collection $C$ of 3-element subsets, can we select $m$ subsets that partition $X$?

**Hardness**: Strongly NP-complete
**Relationship**: Used to prove other problems NP-complete

### Multiple Subset Sum

Find multiple disjoint subsets, each summing to different targets.

**Hardness**: NP-complete
**Application**: Multi-objective resource allocation

## Practical Considerations

### When Pseudo-Polynomial is Good Enough

**Criteria**:
- Target sum $t$ is not too large (e.g., $t \leq 10^6$)
- Number of elements $n$ is moderate (e.g., $n \leq 1000$)
- Space $O(nt)$ is available

**Typical scenarios**:
- Financial applications (dollar amounts)
- Scheduling (time slots)
- Resource allocation (discrete units)

### Optimizations

**Early termination**: Stop if we reach exact target during DP

**Pruning**: Eliminate numbers larger than target

**Sorting**: Process numbers in sorted order for better pruning

**Meet-in-the-middle**: Split into two halves, solve each, combine
- Time: $O(2^{n/2})$ instead of $O(2^n)$
- Space: $O(2^{n/2})$

## Conclusion

SUBSET-SUM exemplifies the nuanced landscape of NP-completeness:
- NP-complete, yet tractable for many practical instances
- Admits pseudo-polynomial algorithms
- Serves as a basis for numerous reductions
- Applications from cryptography to scheduling

Understanding SUBSET-SUM and pseudo-polynomial time is essential for recognizing when "NP-complete" doesn't mean "hopeless in practice."
