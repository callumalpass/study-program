---
id: math101-t7-geometric
title: "Geometric Sequences"
order: 3
---

# Geometric Sequences

## Definition

A **geometric sequence** is a sequence where each term is obtained by multiplying the previous term by a constant called the **common ratio**.

$$\frac{a_n}{a_{n-1}} = r \quad \text{(constant for all } n > 1 \text{)}$$

## General Formula

If the first term is $a_1$ and the common ratio is $r$:

$$a_n = a_1 \cdot r^{n-1}$$

### Derivation

Starting from $a_1$:
- $a_2 = a_1 \cdot r$
- $a_3 = a_1 \cdot r^2$
- $a_4 = a_1 \cdot r^3$
- $a_n = a_1 \cdot r^{n-1}$

We multiply by r exactly (n-1) times to get from $a_1$ to $a_n$.

### Alternative Starting Index

If we start indexing at 0:
$$a_n = a_0 \cdot r^n$$

This form is often more convenient in computer science.

## Examples

### Example 1: Powers of 2

Sequence: 1, 2, 4, 8, 16, 32, ...

- First term: $a_1 = 1$ (or $a_0 = 1$)
- Common ratio: $r = 2$
- General term: $a_n = 1 \cdot 2^{n-1} = 2^{n-1}$

Verify: $a_6 = 2^5 = 32$ ✓

### Example 2: Decreasing Sequence

Sequence: 81, 27, 9, 3, 1, ...

- $a_1 = 81$
- $r = 27/81 = 1/3$
- $a_n = 81 \cdot (1/3)^{n-1} = 81 \cdot 3^{-(n-1)} = 3^{4-(n-1)} = 3^{5-n}$

Verify: $a_4 = 3^{5-4} = 3$ ✓

### Example 3: Alternating Signs

Sequence: 2, -6, 18, -54, ...

- $a_1 = 2$
- $r = -6/2 = -3$ (negative ratio!)
- $a_n = 2 \cdot (-3)^{n-1}$

When r < 0, signs alternate.

## Sum of Finite Geometric Series

The sum of the first n terms:

$$S_n = \sum_{i=1}^{n} a_1 \cdot r^{i-1} = a_1 \cdot \frac{r^n - 1}{r - 1} \quad (r \neq 1)$$

Or equivalently:
$$S_n = a_1 \cdot \frac{1 - r^n}{1 - r}$$

### Derivation

Let $S_n = a_1 + a_1 r + a_1 r^2 + \cdots + a_1 r^{n-1}$

Multiply by r:
$rS_n = a_1 r + a_1 r^2 + a_1 r^3 + \cdots + a_1 r^n$

Subtract:
$S_n - rS_n = a_1 - a_1 r^n$
$S_n(1 - r) = a_1(1 - r^n)$
$S_n = a_1 \cdot \frac{1 - r^n}{1 - r}$

### When r = 1

If r = 1, the formula doesn't apply. Instead:
$$S_n = a_1 + a_1 + \cdots + a_1 = n \cdot a_1$$

## Examples of Geometric Sums

### Example 1: Powers of 2

$1 + 2 + 4 + 8 + ... + 2^9$ (sum of first 10 powers of 2, starting at $2^0$)

$a_1 = 1$, $r = 2$, $n = 10$

$$S_{10} = 1 \cdot \frac{2^{10} - 1}{2 - 1} = \frac{1024 - 1}{1} = 1023$$

### Example 2: Decreasing Series

$1 + 1/2 + 1/4 + 1/8 + ... + 1/128$

$a_1 = 1$, $r = 1/2$, $a_n = 1/128 = (1/2)^7$, so $n = 8$

$$S_8 = 1 \cdot \frac{1 - (1/2)^8}{1 - 1/2} = \frac{1 - 1/256}{1/2} = \frac{255/256}{1/2} = \frac{255}{128}$$

## Infinite Geometric Series

When |r| < 1, the terms approach 0, and the infinite sum converges:

$$\sum_{i=0}^{\infty} ar^i = \frac{a}{1-r} \quad \text{when } |r| < 1$$

### Why It Works

As $n \to \infty$, if $|r| < 1$, then $r^n \to 0$:

$$\lim_{n \to \infty} S_n = \lim_{n \to \infty} a \cdot \frac{1 - r^n}{1 - r} = \frac{a}{1-r}$$

### Examples

**Example 1:** $1 + 1/2 + 1/4 + 1/8 + \cdots$

$a = 1$, $r = 1/2$

$$S = \frac{1}{1 - 1/2} = \frac{1}{1/2} = 2$$

**Example 2:** $3 - 1 + 1/3 - 1/9 + \cdots$

$a = 3$, $r = -1/3$

$$S = \frac{3}{1 - (-1/3)} = \frac{3}{4/3} = \frac{9}{4}$$

### Divergence When |r| ≥ 1

When |r| ≥ 1, the series diverges (sum is infinite or doesn't exist):
- $1 + 2 + 4 + 8 + ... \to \infty$
- $1 - 1 + 1 - 1 + ...$ oscillates, no sum

## Applications

### Binary Numbers

The value of an 8-bit binary number:

$$b_7 \cdot 2^7 + b_6 \cdot 2^6 + \cdots + b_0 \cdot 2^0$$

Maximum value (all 1s):
$$\sum_{i=0}^{7} 2^i = \frac{2^8 - 1}{2 - 1} = 255$$

### Compound Interest

Principal P with interest rate r compounded n times:

$$A = P(1 + r)^n$$

Total deposits of D made at start of each period for n periods:
$$A = D \cdot \frac{(1+r)^n - 1}{r}$$

### Data Compression

Fractal compression and wavelet transforms use geometric series properties.

### Memory Allocation

Doubling buffer sizes: 1KB, 2KB, 4KB, 8KB, ...

Total memory for k allocations:
$$\sum_{i=0}^{k-1} 2^i \text{ KB} = (2^k - 1) \text{ KB}$$

### Algorithm Analysis

Divide-and-conquer algorithms often have geometric work patterns:

```python
def binary_search(arr, target, lo, hi):
    if lo > hi:
        return -1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, hi)
    else:
        return binary_search(arr, target, lo, mid-1)
```

Each call halves the search space: n, n/2, n/4, ... until 1.
Number of comparisons: $\log_2 n$

## Recognizing Geometric Sequences

To check if a sequence is geometric:

1. Compute ratios between consecutive terms
2. If all ratios are equal, it's geometric

**Example:** Is 3, 6, 12, 24, ... geometric?

Ratios: 6/3=2, 12/6=2, 24/12=2

Yes, with r = 2.

**Example:** Is 1, 3, 6, 10, ... geometric?

Ratios: 3/1=3, 6/3=2, 10/6≈1.67

No, ratios aren't constant. (This is triangular numbers.)

## Arithmetic vs. Geometric

| Property | Arithmetic | Geometric |
|----------|------------|-----------|
| Pattern | Add constant | Multiply by constant |
| Parameter | Common difference d | Common ratio r |
| Formula | $a_n = a_1 + (n-1)d$ | $a_n = a_1 \cdot r^{n-1}$ |
| Sum | $\frac{n(a_1 + a_n)}{2}$ | $a_1 \cdot \frac{r^n - 1}{r-1}$ |
| Growth | Linear | Exponential |

## Summary

**Geometric sequence:**
- Constant ratio r between consecutive terms
- General term: $a_n = a_1 \cdot r^{n-1}$

**Geometric series (finite sum):**
$$S_n = a_1 \cdot \frac{r^n - 1}{r - 1} \quad (r \neq 1)$$

**Infinite geometric series:**
$$\sum_{i=0}^{\infty} ar^i = \frac{a}{1-r} \quad \text{when } |r| < 1$$

**Key insight:** Geometric sequences model exponential growth/decay—multiplying by a fixed factor each step.
