---
id: math101-t7-formulas
title: "Summation Formulas"
order: 5
---

# Summation Formulas

## Essential Formulas

These closed-form formulas let you compute sums directly without iteration.

### Sum of First n Positive Integers

$$\sum_{i=1}^{n} i = 1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}$$

**Verification:** n = 5: 1+2+3+4+5 = 15, and 5(6)/2 = 15 ✓

**Proof by pairing:** Pair first with last, second with second-to-last:
(1 + n) + (2 + n-1) + ... = n/2 pairs, each summing to n+1.
Total = (n/2)(n+1) = n(n+1)/2.

### Sum of First n Squares

$$\sum_{i=1}^{n} i^2 = 1^2 + 2^2 + \cdots + n^2 = \frac{n(n+1)(2n+1)}{6}$$

**Verification:** n = 4: 1+4+9+16 = 30, and 4(5)(9)/6 = 180/6 = 30 ✓

### Sum of First n Cubes

$$\sum_{i=1}^{n} i^3 = 1^3 + 2^3 + \cdots + n^3 = \left(\frac{n(n+1)}{2}\right)^2 = \left(\sum_{i=1}^{n} i\right)^2$$

**Verification:** n = 3: 1+8+27 = 36, and (3·4/2)² = 6² = 36 ✓

The sum of cubes equals the square of the sum of integers!

### Sum of Constants

$$\sum_{i=1}^{n} c = nc$$

(n copies of c)

### Arithmetic Series

$$\sum_{i=1}^{n} (a + (i-1)d) = \frac{n(2a + (n-1)d)}{2} = \frac{n(a + l)}{2}$$

where a is the first term, d is the common difference, and l is the last term.

### Geometric Series

$$\sum_{i=0}^{n-1} ar^i = a \cdot \frac{r^n - 1}{r - 1} = a \cdot \frac{1 - r^n}{1 - r} \quad (r \neq 1)$$

**Verification:** a=1, r=2, n=4: 1+2+4+8 = 15, and (2⁴-1)/(2-1) = 15 ✓

### Infinite Geometric Series

$$\sum_{i=0}^{\infty} ar^i = \frac{a}{1-r} \quad \text{when } |r| < 1$$

## Powers of 2

### Sum of Powers of 2

$$\sum_{i=0}^{n} 2^i = 2^{n+1} - 1$$

This follows from the geometric series with a=1, r=2.

**Verification:** n = 3: 1+2+4+8 = 15, and 2⁴-1 = 15 ✓

### Applications

In binary, the maximum n-bit number is:
$$\sum_{i=0}^{n-1} 2^i = 2^n - 1$$

8 bits: 2⁸ - 1 = 255

## Formula Reference Table

| Sum | Closed Form |
|-----|-------------|
| $\sum_{i=1}^{n} 1$ | $n$ |
| $\sum_{i=1}^{n} i$ | $\frac{n(n+1)}{2}$ |
| $\sum_{i=1}^{n} i^2$ | $\frac{n(n+1)(2n+1)}{6}$ |
| $\sum_{i=1}^{n} i^3$ | $\frac{n^2(n+1)^2}{4}$ |
| $\sum_{i=0}^{n} r^i$ | $\frac{r^{n+1}-1}{r-1}$ |
| $\sum_{i=0}^{n} ir^i$ | $\frac{r(1-r^n)}{(1-r)^2} - \frac{nr^{n+1}}{1-r}$ |

## Deriving Formulas

### Using Induction

To prove $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$:

**Base case (n=1):** LHS = 1, RHS = 1(2)/2 = 1 ✓

**Inductive step:** Assume true for n=k. For n=k+1:

$$\sum_{i=1}^{k+1} i = \sum_{i=1}^{k} i + (k+1) = \frac{k(k+1)}{2} + (k+1)$$

$$= (k+1)\left(\frac{k}{2} + 1\right) = (k+1) \cdot \frac{k+2}{2} = \frac{(k+1)(k+2)}{2}$$

This matches the formula with n = k+1. ✓

### Using Telescoping

Some formulas can be derived by telescoping. See the next section for techniques.

## Combining Formulas

### Example: Sum of 2i + 3

$$\sum_{i=1}^{n} (2i + 3) = 2\sum_{i=1}^{n} i + \sum_{i=1}^{n} 3$$
$$= 2 \cdot \frac{n(n+1)}{2} + 3n = n(n+1) + 3n = n^2 + 4n$$

**Verification:** n = 3: 5+7+9 = 21, and 9+12 = 21 ✓

### Example: Sum of i(i+1)

$$\sum_{i=1}^{n} i(i+1) = \sum_{i=1}^{n} (i^2 + i) = \sum_{i=1}^{n} i^2 + \sum_{i=1}^{n} i$$
$$= \frac{n(n+1)(2n+1)}{6} + \frac{n(n+1)}{2}$$
$$= \frac{n(n+1)(2n+1) + 3n(n+1)}{6} = \frac{n(n+1)(2n+4)}{6} = \frac{n(n+1)(n+2)}{3}$$

## Shifted Bounds

### Sum Starting at k

$$\sum_{i=k}^{n} f(i) = \sum_{i=1}^{n} f(i) - \sum_{i=1}^{k-1} f(i)$$

**Example:** $\sum_{i=5}^{10} i = \sum_{i=1}^{10} i - \sum_{i=1}^{4} i = 55 - 10 = 45$

### Odd Numbers

$$\sum_{i=1}^{n} (2i-1) = 2\sum_{i=1}^{n} i - \sum_{i=1}^{n} 1 = 2 \cdot \frac{n(n+1)}{2} - n = n^2$$

The sum of the first n odd numbers is n².

### Even Numbers

$$\sum_{i=1}^{n} 2i = 2\sum_{i=1}^{n} i = 2 \cdot \frac{n(n+1)}{2} = n(n+1)$$

## Algorithm Complexity Applications

### Simple Loop

```python
for i in range(n):
    process()  # O(1)
```
Total: $\sum_{i=0}^{n-1} 1 = n = O(n)$

### Nested Loop (Triangular)

```python
for i in range(n):
    for j in range(i):
        process()  # O(1)
```
Total: $\sum_{i=0}^{n-1} i = \frac{(n-1)n}{2} = O(n^2)$

### Nested Loop (Square)

```python
for i in range(n):
    for j in range(n):
        process()  # O(1)
```
Total: $\sum_{i=0}^{n-1} n = n^2 = O(n^2)$

### Logarithmic Work

```python
i = n
while i >= 1:
    process()  # O(1)
    i = i // 2
```
Iterations: $\lfloor \log_2 n \rfloor + 1 = O(\log n)$

### Geometric Work

```python
total_work = 0
for i in range(k):
    # Process 2^i elements
    for j in range(2**i):
        process()
        total_work += 1
```
Total: $\sum_{i=0}^{k-1} 2^i = 2^k - 1 = O(2^k)$

## Quick Reference

For algorithm analysis, memorize these growth patterns:

| Sum | Closed Form | Big-O |
|-----|-------------|-------|
| $\sum_{i=1}^{n} 1$ | $n$ | O(n) |
| $\sum_{i=1}^{n} i$ | $\frac{n(n+1)}{2}$ | O(n²) |
| $\sum_{i=1}^{n} i^2$ | $\frac{n(n+1)(2n+1)}{6}$ | O(n³) |
| $\sum_{i=0}^{\log n} 2^i$ | $2n - 1$ | O(n) |
| $\sum_{i=0}^{n} 2^i$ | $2^{n+1} - 1$ | O(2ⁿ) |

## Summary

**Essential formulas:**
- $\sum i = n(n+1)/2$
- $\sum i^2 = n(n+1)(2n+1)/6$
- $\sum i^3 = [n(n+1)/2]^2$
- $\sum r^i = (r^{n+1}-1)/(r-1)$

**Techniques:**
- Use linearity to split and factor
- Prove with induction
- Adjust bounds by adding/subtracting partial sums

**Applications:**
- Direct computation without loops
- Algorithm complexity analysis
