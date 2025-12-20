---
id: math101-t4-closures
title: "Closures of Relations"
order: 6
---

# Closures of Relations

## What is a Closure?

Given a relation R on set A and a property P, the **closure of R with respect to P** is the smallest relation that:
1. Contains R
2. Has property P

"Smallest" means no proper subset of the closure both contains R and has property P.

## Reflexive Closure

The **reflexive closure** r(R) is the smallest reflexive relation containing R.

### Construction

Add all pairs (a, a) that are missing:

$$r(R) = R \cup I_A$$

where I_A = {(a, a) : a ∈ A} is the identity relation.

### Example

A = {1, 2, 3}, R = {(1, 2), (2, 3)}

r(R) = {(1, 2), (2, 3), (1, 1), (2, 2), (3, 3)}

### Matrix View

Add 1s to the main diagonal:

```
Original R:          Reflexive closure r(R):
    1  2  3              1  2  3
  ┌─────────┐          ┌─────────┐
1 │ 0  1  0 │        1 │ 1  1  0 │
2 │ 0  0  1 │   →    2 │ 0  1  1 │
3 │ 0  0  0 │        3 │ 0  0  1 │
  └─────────┘          └─────────┘
```

## Symmetric Closure

The **symmetric closure** s(R) is the smallest symmetric relation containing R.

### Construction

Add the reverse of every pair:

$$s(R) = R \cup R^{-1}$$

where R⁻¹ = {(b, a) : (a, b) ∈ R}.

### Example

A = {1, 2, 3}, R = {(1, 2), (2, 3)}

R⁻¹ = {(2, 1), (3, 2)}

s(R) = {(1, 2), (2, 1), (2, 3), (3, 2)}

### Digraph View

Add a reverse edge for every edge:

```
Original:          Symmetric closure:
(1)──►(2)──►(3)    (1)◄──►(2)◄──►(3)
```

## Transitive Closure

The **transitive closure** t(R) is the smallest transitive relation containing R.

This is more complex than reflexive or symmetric closure.

### Intuition

If there's a "path" from a to b in R (possibly through multiple steps), add a direct edge (a, b).

### Example

A = {1, 2, 3}, R = {(1, 2), (2, 3)}

- Path 1→2 exists, so (1, 2) ∈ t(R)
- Path 2→3 exists, so (2, 3) ∈ t(R)
- Path 1→2→3 exists, so (1, 3) ∈ t(R)

t(R) = {(1, 2), (2, 3), (1, 3)}

### Construction Methods

**Method 1: Iterative**

Repeat until no changes:
- If (a, b) ∈ R and (b, c) ∈ R and (a, c) ∉ R, add (a, c)

**Method 2: Warshall's Algorithm**

Efficient O(n³) algorithm using dynamic programming:

```
for k = 1 to n:
    for i = 1 to n:
        for j = 1 to n:
            M[i][j] = M[i][j] OR (M[i][k] AND M[k][j])
```

**Method 3: Matrix Powers**

t(R) corresponds to M_R ∨ M_R² ∨ M_R³ ∨ ... ∨ M_R^n

where matrix multiplication uses OR for + and AND for ×.

### Example with Warshall's Algorithm

R = {(1, 2), (2, 3), (3, 1)} on A = {1, 2, 3}

Initial:
```
    1  2  3
  ┌─────────┐
1 │ 0  1  0 │
2 │ 0  0  1 │
3 │ 1  0  0 │
  └─────────┘
```

After k = 1 (considering paths through 1):
```
    1  2  3
  ┌─────────┐
1 │ 0  1  0 │
2 │ 0  0  1 │
3 │ 1  1  0 │  ← (3,2) added: 3→1→2
  └─────────┘
```

After k = 2 (paths through 2):
```
    1  2  3
  ┌─────────┐
1 │ 0  1  1 │  ← (1,3) added: 1→2→3
2 │ 0  0  1 │
3 │ 1  1  1 │  ← (3,3) added: 3→2→3
  └─────────┘
```

After k = 3 (paths through 3):
```
    1  2  3
  ┌─────────┐
1 │ 1  1  1 │  ← (1,1) added: 1→3→1
2 │ 1  1  1 │  ← (2,1), (2,2) added
3 │ 1  1  1 │
  └─────────┘
```

t(R) = A × A (all pairs, because every element can reach every other)

## Combining Closures

Sometimes we need multiple properties. The **reflexive-transitive closure** r(t(R)) or equivalently t(r(R)) is often useful.

### Order Matters?

For reflexive and symmetric closures: r(s(R)) = s(r(R))

For transitive closure: Order can matter!
- s(t(R)) may not equal t(s(R))

### Example Where Order Matters

R = {(1, 2)} on A = {1, 2, 3}

t(R) = {(1, 2)} (already transitive)
s(t(R)) = {(1, 2), (2, 1)}

s(R) = {(1, 2), (2, 1)}
t(s(R)) = {(1, 2), (2, 1), (1, 1), (2, 2)}

s(t(R)) ≠ t(s(R))!

## Applications

### Reachability in Graphs

The transitive closure tells you which vertices can reach which:
- (a, b) ∈ t(R) means there's a path from a to b

### Equivalence Closure

To make R an equivalence relation, take:
- Reflexive, symmetric, and transitive closure

The result partitions A into components where any two elements are connected by R-paths.

### Dependency Analysis

In build systems (Makefile) or package managers:
- Direct dependencies form R
- t(R) gives all (transitive) dependencies

## Summary

| Closure | Property | Construction |
|---------|----------|--------------|
| Reflexive r(R) | a R a | R ∪ I_A |
| Symmetric s(R) | aRb → bRa | R ∪ R⁻¹ |
| Transitive t(R) | aRb ∧ bRc → aRc | Warshall or iteration |

Key points:
- Closure is the smallest relation with the property containing R
- Reflexive and symmetric closures are simple: add missing elements
- Transitive closure requires finding all paths (Warshall's algorithm)
- Order of closures can matter when combining
