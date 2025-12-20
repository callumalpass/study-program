---
id: cs201-t8-correctness
title: "Correctness Proofs"
order: 1
---

# Algorithm Correctness

Testing can show the presence of bugs, but only proofs can show their absence. In critical systems—medical devices, aviation software, financial trading systems—correctness matters enormously. Even in everyday programming, understanding how to reason about algorithm correctness improves code quality and debugging ability. Correctness proofs transform algorithm design from hopeful coding into mathematical reasoning.

The distinction between partial and total correctness is fundamental. Partial correctness means "if the algorithm terminates, it gives the right answer." Total correctness adds "and it always terminates." Both matter: an algorithm that loops forever is useless, but so is one that terminates with wrong answers. Complete analysis requires proving both properties separately, then combining them.

Loop invariants are the key tool for proving iterative algorithm correctness. An invariant is a property that holds before and after each iteration—a mathematical handle on what the loop accomplishes. Finding the right invariant requires understanding what the loop is really doing: maintaining sorted prefixes, narrowing search bounds, accumulating partial results. Once found, the invariant makes correctness almost obvious.

## What is Correctness?

An algorithm is correct if:
1. **Partial correctness**: If it terminates, it produces the correct output
2. **Total correctness**: It always terminates AND produces the correct output

## Loop Invariants

A loop invariant is a property that:
1. **Initialization**: True before the first iteration
2. **Maintenance**: If true before an iteration, true after
3. **Termination**: When the loop ends, the invariant implies correctness

### Example: Linear Search

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
```

**Invariant**: At the start of iteration i, target is not in arr[0:i].

**Initialization**: Before i=0, arr[0:0] is empty, so target isn't there. ✓

**Maintenance**: If target isn't in arr[0:i] and arr[i] ≠ target, then target isn't in arr[0:i+1]. ✓

**Termination**: If loop completes, i = n, so target isn't in arr[0:n] = arr. Return -1 is correct. If loop breaks at i, arr[i] = target. Return i is correct. ✓

### Example: Insertion Sort

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
```

**Outer loop invariant**: arr[0:i] is sorted and contains original arr[0:i] elements.

**Inner loop invariant**: arr[j+1:i+1] contains elements > key, in sorted order.

## Induction Proofs

Mathematical induction proves properties for all natural numbers.

### Structure

1. **Base case**: Prove P(0) or P(1)
2. **Inductive step**: Prove P(n) → P(n+1)
3. **Conclusion**: P(n) holds for all n ≥ base

### Example: Recursive Factorial

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

**Claim**: factorial(n) = n! for all n ≥ 0.

**Base case**: factorial(0) = 1 = 0!. ✓

**Inductive step**: Assume factorial(k) = k! for some k ≥ 0.

factorial(k+1) = (k+1) × factorial(k)  [by code]
              = (k+1) × k!             [by inductive hypothesis]
              = (k+1)!                  [by definition of factorial]

**Conclusion**: factorial(n) = n! for all n ≥ 0. ✓

## Structural Induction

For recursive structures (trees, lists), induction on structure.

### Example: Tree Height

```python
def height(node):
    if node is None:
        return -1
    return 1 + max(height(node.left), height(node.right))
```

**Claim**: height(node) returns the height of the subtree rooted at node.

**Base case**: If node is None, height = -1 (empty tree). ✓

**Inductive step**: Assume height(left) and height(right) are correct.

height(node) = 1 + max(height(left), height(right))

This equals 1 + maximum height of children, which is the definition of height. ✓

## Termination Proofs

### Variant (Decreasing Function)

Find a value that:
- Is always non-negative
- Strictly decreases each iteration/recursion
- When zero, algorithm terminates

### Example: Euclidean Algorithm

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

**Variant**: b

**Proof**:
- b ≥ 0 always (positive integers)
- Each iteration: new_b = a % b < b (remainder < divisor)
- When b = 0, loop terminates

Therefore, gcd terminates.

### Example: Binary Search

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Variant**: right - left + 1 (search space size)

**Proof**:
- Size ≥ 0 when left ≤ right
- Each iteration: Either return, or size decreases by at least half
- When size = 0, left > right, loop terminates

## Proving Greedy Correctness

### Exchange Argument

Show greedy solution can be transformed into optimal without losing optimality.

**Activity Selection**:
1. Let O be optimal solution
2. Let a₁ be first activity in greedy solution (earliest end)
3. Let o₁ be first activity in O
4. If o₁ ≠ a₁, replace o₁ with a₁ in O
5. New solution is still valid (a₁ ends no later)
6. Repeat inductively

### Greedy Stays Ahead

Show greedy is "at least as good" at each step.

**Huffman Coding**:
1. After each merge, greedy tree has minimum weighted path length
2. Prove by induction on number of merges

## Proving DP Correctness

### Optimal Substructure

Prove optimal solution contains optimal solutions to subproblems.

**Example: Rod Cutting**

If optimal cutting of rod length n includes piece of length i, then remaining length n-i must be cut optimally. (If not, we could improve the n-cut by using better (n-i)-cut.)

### Recurrence Proof

Prove recurrence captures all possibilities.

```
dp[n] = max(price[i] + dp[n-i]) for all valid i
```

**Correctness**: Considers all possible first cuts. Each choice leads to optimal solution for remainder (by inductive hypothesis).

## Common Pitfalls

**Off-by-one errors**: Carefully define bounds and check edge cases.

**Incomplete case analysis**: Ensure all cases are covered.

**Wrong invariant**: Invariant must imply correctness at termination.

**Assuming input validity**: Consider malformed inputs.

## Testing vs Proving

| Testing | Proving |
|---------|---------|
| Shows presence of bugs | Shows absence of bugs |
| Finite cases | All cases |
| Quick | Time-consuming |
| May miss edge cases | Covers all |

Both are valuable. Testing finds bugs quickly; proofs provide confidence for critical code.
