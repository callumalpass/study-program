---
id: math101-t7-arithmetic
title: "Arithmetic Sequences"
order: 2
---

# Arithmetic Sequences

## Definition

An **arithmetic sequence** is a sequence where each term differs from the previous by a constant amount called the **common difference**.

$$a_n - a_{n-1} = d \quad \text{(constant for all } n \text{)}$$

## General Formula

If the first term is $a_1$ and the common difference is $d$:

$$a_n = a_1 + (n-1)d$$

### Derivation

Starting from $a_1$:
- $a_2 = a_1 + d$
- $a_3 = a_1 + 2d$
- $a_4 = a_1 + 3d$
- $a_n = a_1 + (n-1)d$

Each term adds one more d, and we add d exactly (n-1) times to get from $a_1$ to $a_n$.

## Examples

### Example 1: Simple Arithmetic Sequence

Sequence: 2, 5, 8, 11, 14, ...

- First term: $a_1 = 2$
- Common difference: $d = 5 - 2 = 3$
- General term: $a_n = 2 + (n-1) \cdot 3 = 2 + 3n - 3 = 3n - 1$

Verify: $a_5 = 3(5) - 1 = 14$ ✓

### Example 2: Decreasing Sequence

Sequence: 20, 17, 14, 11, 8, ...

- First term: $a_1 = 20$
- Common difference: $d = 17 - 20 = -3$ (negative!)
- General term: $a_n = 20 + (n-1)(-3) = 20 - 3n + 3 = 23 - 3n$

Verify: $a_4 = 23 - 12 = 11$ ✓

### Example 3: Non-Integer Difference

Sequence: 1, 1.5, 2, 2.5, 3, ...

- $a_1 = 1$, $d = 0.5$
- $a_n = 1 + (n-1)(0.5) = 0.5n + 0.5$

## Finding Terms

### Finding a Specific Term

Given $a_1 = 7$ and $d = 4$, find $a_{20}$:

$$a_{20} = 7 + (20-1)(4) = 7 + 76 = 83$$

### Finding Which Term

In the sequence 3, 7, 11, 15, ..., which term equals 99?

$a_n = 3 + (n-1)(4) = 4n - 1$

Set $4n - 1 = 99$:
$4n = 100$
$n = 25$

So 99 is the 25th term.

## Sum of Arithmetic Series

The sum of the first n terms of an arithmetic sequence is:

$$S_n = \sum_{i=1}^{n} a_i = \frac{n(a_1 + a_n)}{2} = \frac{n(2a_1 + (n-1)d)}{2}$$

### Derivation (Gauss's Method)

Write the sum forwards and backwards:
$$S_n = a_1 + a_2 + \cdots + a_n$$
$$S_n = a_n + a_{n-1} + \cdots + a_1$$

Add vertically:
$$2S_n = (a_1 + a_n) + (a_2 + a_{n-1}) + \cdots + (a_n + a_1)$$

Each pair sums to $a_1 + a_n$, and there are n pairs:
$$2S_n = n(a_1 + a_n)$$
$$S_n = \frac{n(a_1 + a_n)}{2}$$

### Formula Interpretations

$$S_n = \frac{n(a_1 + a_n)}{2} = n \cdot \frac{a_1 + a_n}{2}$$

This is (number of terms) × (average of first and last).

$$S_n = \frac{n(2a_1 + (n-1)d)}{2}$$

This form uses only $a_1$, $d$, and $n$—useful when you don't know $a_n$.

## Examples of Arithmetic Sums

### Example 1: Sum of 1 to 100

$a_1 = 1$, $d = 1$, $n = 100$, $a_n = 100$

$$S_{100} = \frac{100(1 + 100)}{2} = \frac{100 \cdot 101}{2} = 5050$$

### Example 2: Sum of Odd Numbers

1 + 3 + 5 + ... + 99

$a_1 = 1$, $d = 2$, $a_n = 99$

Find n: $1 + (n-1)(2) = 99 \Rightarrow n = 50$

$$S_{50} = \frac{50(1 + 99)}{2} = \frac{50 \cdot 100}{2} = 2500$$

### Example 3: Partial Sum

Sum of 5 + 8 + 11 + ... + 35

$a_1 = 5$, $d = 3$, $a_n = 35$

Find n: $5 + (n-1)(3) = 35 \Rightarrow 3n + 2 = 35 \Rightarrow n = 11$

$$S_{11} = \frac{11(5 + 35)}{2} = \frac{11 \cdot 40}{2} = 220$$

## Special Cases

### Sum of First n Positive Integers

$$\sum_{i=1}^{n} i = 1 + 2 + 3 + \cdots + n = \frac{n(n+1)}{2}$$

This is an arithmetic series with $a_1 = 1$, $d = 1$.

### Sum of First n Odd Positive Integers

$$\sum_{i=1}^{n} (2i-1) = 1 + 3 + 5 + \cdots + (2n-1) = n^2$$

The sum of the first n odd numbers is always a perfect square!

### Sum of First n Even Positive Integers

$$\sum_{i=1}^{n} 2i = 2 + 4 + 6 + \cdots + 2n = n(n+1)$$

## Applications

### Stacking Objects

A triangular stack of cans: 10 on bottom, 9 on next row, ..., 1 on top.

Total cans = 1 + 2 + ... + 10 = 10(11)/2 = 55

### Salary Growth

Starting salary $50,000 with $2,000 annual raises.

Year n salary: $a_n = 50000 + (n-1)(2000)$

Total earned over 10 years:
$$S_{10} = \frac{10(50000 + 68000)}{2} = \frac{10 \cdot 118000}{2} = 590000$$

### Loop Analysis

```python
# How many operations?
total = 0
for i in range(1, n+1):
    for j in range(i):
        total += 1  # This runs i times for each i
```

Total iterations: $\sum_{i=1}^{n} i = \frac{n(n+1)}{2} = O(n^2)$

## Recognizing Arithmetic Sequences

To check if a sequence is arithmetic:

1. Compute differences between consecutive terms
2. If all differences are equal, it's arithmetic

**Example:** Is 4, 7, 10, 13, ... arithmetic?

Differences: 7-4=3, 10-7=3, 13-10=3

Yes, with d = 3.

**Example:** Is 1, 4, 9, 16, ... arithmetic?

Differences: 4-1=3, 9-4=5, 16-9=7

No, differences aren't constant. (This is the squares sequence.)

## Summary

**Arithmetic sequence:**
- Constant difference d between consecutive terms
- General term: $a_n = a_1 + (n-1)d$

**Arithmetic series (sum):**
- $S_n = \frac{n(a_1 + a_n)}{2}$
- $S_n = \frac{n(2a_1 + (n-1)d)}{2}$

**Special cases:**
- $\sum_{i=1}^n i = \frac{n(n+1)}{2}$
- Sum of n odd numbers = $n^2$

**Key insight:** Arithmetic sequences model linear growth—adding a fixed amount each step.
