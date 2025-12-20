# Amortized Analysis

Some operations are occasionally expensive but rarely so. Python's list append usually takes O(1) time, but occasionally triggers an O(n) resize when the underlying array fills. Analyzing each operation independently—claiming append is O(n)—paints a misleading picture. Over many operations, the occasional expensive ones are rare enough that the average cost remains O(1). Amortized analysis formalizes this intuition.

The key insight is that expensive operations create "room" for many cheap operations. When a dynamic array doubles, it gains n slots; the next n-1 appends are guaranteed cheap. The expensive operation "pays for itself" over subsequent operations. Amortized analysis captures this payoff structure, assigning costs that reflect long-run behavior rather than worst-case individual operations.

Amortized bounds are stronger than average-case bounds because they require no assumptions about input distribution. No matter what sequence of operations you perform—even adversarially chosen—the total cost is bounded by the amortized cost times the number of operations. This makes amortized analysis essential for data structure design, where we can't predict or control usage patterns.

## Motivation

Consider a dynamic array (like Python's list):
- Most insertions: O(1)
- Occasional resize: O(n)

Naive analysis: "Each insert could be O(n)"

**Reality**: Expensive operations are rare, amortized cost is O(1) per insert.

## Key Insight

Some operations "prepay" for expensive future operations.

**Amortized cost** = Total cost of all operations / Number of operations

## Three Methods

### 1. Aggregate Method

Sum all costs, divide by number of operations.

**Example: Dynamic Array Doubling**

Starting with capacity 1, insert n elements:
- Insert 1: copy 1 element (resize)
- Insert 2: copy 2 elements (resize)
- Insert 3: no resize
- Insert 4: copy 4 elements (resize)
- Insert 5-8: no resize
- Insert 9: copy 8 elements (resize)
- ...

Total copies: 1 + 2 + 4 + 8 + ... + n/2 = n - 1

Total operations: n inserts + (n - 1) copies < 3n

Amortized cost per insert: 3n / n = O(1)

### 2. Accounting Method

Assign "amortized costs" that overcharge some operations to prepay for others.

**Rules**:
- Amortized cost can differ from actual cost
- Must never go into "debt" (total amortized ≥ total actual)

**Example: Dynamic Array**

Charge $3 per insert:
- $1 for the actual insert
- $2 saved as "credit" on the element

When resize occurs:
- Each element has $2 credit
- Use $1 to move itself, $1 to move a "new" element
- All moves are prepaid!

### 3. Potential Method

Define a potential function Φ that maps data structure state to a real number.

**Amortized cost** = Actual cost + ΔΦ

Where ΔΦ = Φ(after) - Φ(before)

**Requirements**:
- Φ(initial state) = 0
- Φ(any state) ≥ 0

**Example: Dynamic Array**

Let Φ(D) = 2 × (size - capacity/2)

When size = capacity/2: Φ = 0
When size = capacity: Φ = capacity

For regular insert (no resize):
- Actual cost = 1
- ΔΦ = 2
- Amortized = 3

For insert with resize (capacity doubles):
- Actual cost = 1 + n (copy all)
- Φ(before) = n (array was full)
- Φ(after) = 2(n+1) - (2n+2)/2 = 1
- ΔΦ = 1 - n
- Amortized = (1 + n) + (1 - n) = 2

## Classic Examples

### Stack with Multipop

Operations:
- Push(x): O(1)
- Pop(): O(1)
- Multipop(k): pop min(k, size) elements, O(k) worst case

**Naive analysis**: n operations could each be O(n) → O(n²)

**Amortized analysis**:
- Each element pushed once, popped at most once
- Total pops ≤ total pushes ≤ n
- n operations = O(n) total
- Amortized O(1) per operation

### Incrementing Binary Counter

Count from 0 to n in binary. Each increment can flip many bits.

**Worst case**: All bits flip (e.g., 1111 → 10000)

**Amortized analysis**:
- Bit 0 flips every increment: n times
- Bit 1 flips every 2 increments: n/2 times
- Bit k flips every 2^k increments: n/2^k times

Total flips: n + n/2 + n/4 + ... < 2n

Amortized cost per increment: O(1)

### Splay Trees

Self-adjusting BST that moves accessed nodes to root.

**Key operations**:
- Zig: single rotation
- Zig-zig: two rotations same direction
- Zig-zag: two rotations opposite directions

**Amortized bounds** (via potential method):
- Access: O(log n) amortized
- Insert: O(log n) amortized
- Delete: O(log n) amortized

No explicit balancing, but performance matches balanced trees!

## Union-Find with Path Compression

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
```

**Amortized analysis**:
- With union by rank + path compression
- m operations on n elements: O(m × α(n))
- α(n) = inverse Ackermann function ≈ 4 for all practical n

Effectively O(1) per operation!

## When to Use Amortized Analysis

### Good candidates:
- Operations with varying costs
- Expensive operations are rare
- Data structure "remembers" past operations

### Common patterns:
- Lazy operations (defer work)
- Batched operations
- Rebuilding structures

## Comparison with Average Case

| Aspect | Amortized | Average Case |
|--------|-----------|--------------|
| Assumptions | None about input | Random input distribution |
| Guarantee | Worst-case total | Expected behavior |
| Applicability | Always valid | Depends on input |

Amortized is stronger: works for **any** input sequence.

## Summary

| Method | Approach | When to Use |
|--------|----------|-------------|
| Aggregate | Sum costs, divide | Simple counting |
| Accounting | Prepay with credits | Intuitive operations |
| Potential | Define Φ function | Complex structures |

Amortized analysis reveals the true cost of algorithms where worst-case analysis is too pessimistic. It's essential for analyzing dynamic data structures.
