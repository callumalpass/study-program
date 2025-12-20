# Recurrence Relations

## What is a Recurrence Relation?

A **recurrence relation** defines each term of a sequence using previous terms. It consists of:

1. **Base case(s):** Initial value(s)
2. **Recurrence:** Formula relating terms

### Example: Factorial

$$a_0 = 1, \quad a_n = n \cdot a_{n-1}$$

This generates: 1, 1, 2, 6, 24, 120, ... (the factorials)

### Example: Fibonacci

$$F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2}$$

This generates: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

## Why Use Recurrence Relations?

### Natural Problem Description

Many problems are naturally recursive:

- "The nth step depends on the (n-1)th step"
- "To solve size n, combine solutions of smaller sizes"

### Algorithm Analysis

Divide-and-conquer algorithms have recurrence relations for their time complexity:

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)  # O(n) work
```

Time complexity: $T(n) = 2T(n/2) + O(n)$

## First-Order Linear Recurrences

### Homogeneous: $a_n = c \cdot a_{n-1}$

**Solution:** $a_n = a_0 \cdot c^n$

This is a geometric sequence.

**Example:** $a_0 = 3$, $a_n = 2a_{n-1}$

Solution: $a_n = 3 \cdot 2^n$

Sequence: 3, 6, 12, 24, 48, ...

### Non-Homogeneous: $a_n = c \cdot a_{n-1} + d$

**Solution (c ≠ 1):**
$$a_n = c^n \cdot a_0 + d \cdot \frac{c^n - 1}{c - 1}$$

**Solution (c = 1):**
$$a_n = a_0 + n \cdot d$$ (arithmetic sequence)

**Example:** $a_0 = 2$, $a_n = 3a_{n-1} + 1$

Using the formula with c = 3, d = 1:
$$a_n = 3^n \cdot 2 + 1 \cdot \frac{3^n - 1}{3 - 1} = 2 \cdot 3^n + \frac{3^n - 1}{2} = \frac{5 \cdot 3^n - 1}{2}$$

Check: $a_1 = 3(2) + 1 = 7$, formula: $(5 \cdot 3 - 1)/2 = 14/2 = 7$ ✓

## Second-Order Linear Recurrences

### Form: $a_n = c_1 a_{n-1} + c_2 a_{n-2}$

**Characteristic equation:** $x^2 = c_1 x + c_2$

Or: $x^2 - c_1 x - c_2 = 0$

### Distinct Roots r₁, r₂

**General solution:** $a_n = A \cdot r_1^n + B \cdot r_2^n$

Constants A and B are determined by initial conditions.

### Repeated Root r

**General solution:** $a_n = (A + Bn) \cdot r^n$

### Example: Fibonacci

$F_n = F_{n-1} + F_{n-2}$, with $F_0 = 0$, $F_1 = 1$

Characteristic equation: $x^2 - x - 1 = 0$

Roots: $r = \frac{1 \pm \sqrt{5}}{2}$

Let $\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618$ (golden ratio)
Let $\psi = \frac{1 - \sqrt{5}}{2} \approx -0.618$

General solution: $F_n = A \cdot \phi^n + B \cdot \psi^n$

Using $F_0 = 0$: $A + B = 0$, so $B = -A$
Using $F_1 = 1$: $A\phi - A\psi = 1$, so $A = \frac{1}{\phi - \psi} = \frac{1}{\sqrt{5}}$

**Binet's formula:**
$$F_n = \frac{\phi^n - \psi^n}{\sqrt{5}} = \frac{1}{\sqrt{5}}\left[\left(\frac{1+\sqrt{5}}{2}\right)^n - \left(\frac{1-\sqrt{5}}{2}\right)^n\right]$$

Since $|\psi| < 1$, for large n: $F_n \approx \frac{\phi^n}{\sqrt{5}}$

## Divide-and-Conquer Recurrences

### General Form

$$T(n) = aT(n/b) + f(n)$$

- a: Number of subproblems
- n/b: Size of each subproblem
- f(n): Work done outside recursive calls

### Master Theorem (Simplified)

For $T(n) = aT(n/b) + O(n^k)$:

Let $c = \log_b a$

1. If k < c: $T(n) = O(n^c)$
2. If k = c: $T(n) = O(n^c \log n)$
3. If k > c: $T(n) = O(n^k)$

### Common Examples

**Binary Search:** $T(n) = T(n/2) + O(1)$
- a = 1, b = 2, k = 0, c = 0
- k = c, so $T(n) = O(\log n)$

**Merge Sort:** $T(n) = 2T(n/2) + O(n)$
- a = 2, b = 2, k = 1, c = 1
- k = c, so $T(n) = O(n \log n)$

**Naive Matrix Multiply:** $T(n) = 8T(n/2) + O(n^2)$
- a = 8, b = 2, k = 2, c = 3
- k < c, so $T(n) = O(n^3)$

**Strassen's Matrix Multiply:** $T(n) = 7T(n/2) + O(n^2)$
- a = 7, b = 2, k = 2, c = log₂7 ≈ 2.81
- k < c, so $T(n) = O(n^{2.81})$

## Solving by Iteration (Unrolling)

Expand the recurrence repeatedly until you see a pattern.

**Example:** $T(n) = 2T(n/2) + n$, with $T(1) = 1$

Unroll:
- $T(n) = 2T(n/2) + n$
- $= 2[2T(n/4) + n/2] + n = 4T(n/4) + 2n$
- $= 4[2T(n/8) + n/4] + 2n = 8T(n/8) + 3n$
- $= 2^k T(n/2^k) + kn$

When $n/2^k = 1$, we have $k = \log_2 n$:
$$T(n) = 2^{\log_2 n} \cdot T(1) + n \log_2 n = n + n \log_2 n = O(n \log n)$$

## Solving by Substitution

Guess a solution form, then prove it by induction.

**Example:** Prove $T(n) = 2T(n/2) + n$ is $O(n \log n)$

**Guess:** $T(n) \leq cn \log n$ for some c

**Inductive step:**
$$T(n) = 2T(n/2) + n \leq 2 \cdot c(n/2)\log(n/2) + n$$
$$= cn(\log n - 1) + n = cn \log n - cn + n$$
$$= cn \log n - (c-1)n \leq cn \log n$$

when $c \geq 1$. ✓

## Tower of Hanoi

Classic recurrence relation problem.

**Problem:** Move n disks from source to target using auxiliary peg. Only smaller disks can go on larger.

**Recurrence:** $H(n) = 2H(n-1) + 1$, with $H(1) = 1$

**Solution:** $H(n) = 2^n - 1$

**Proof by induction:**
- Base: $H(1) = 2^1 - 1 = 1$ ✓
- Step: $H(n) = 2H(n-1) + 1 = 2(2^{n-1} - 1) + 1 = 2^n - 2 + 1 = 2^n - 1$ ✓

## Applications in Computer Science

### Dynamic Programming

Many DP solutions have recurrence relations:

**Coin change:** $C(n) = \min_{c \in \text{coins}} (C(n-c) + 1)$

**Edit distance:** $E(i,j) = \min(E(i-1,j)+1, E(i,j-1)+1, E(i-1,j-1) + \delta)$

### Data Structure Analysis

**AVL tree height:** $H(n) \geq H(n-1) + H(n-2) + 1$

Similar to Fibonacci, giving $H(n) = O(\log n)$ for n nodes.

### Probability

**Random walk:** $P_n = \frac{1}{2}P_{n-1} + \frac{1}{2}P_{n+1}$

## Summary

**First-order linear:**
- $a_n = c \cdot a_{n-1}$: Solution is $a_0 \cdot c^n$ (geometric)
- $a_n = c \cdot a_{n-1} + d$: Has closed-form solution

**Second-order linear:**
- Solve characteristic equation $x^2 - c_1 x - c_2 = 0$
- General solution: $A \cdot r_1^n + B \cdot r_2^n$

**Divide-and-conquer:**
- Use Master Theorem for $T(n) = aT(n/b) + f(n)$
- Or solve by iteration/substitution

**Key insight:** Recurrences capture the structure of recursive processes; solving them reveals complexity and behavior.
