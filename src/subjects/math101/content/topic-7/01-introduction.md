---
id: math101-t7-intro
title: "Introduction to Sequences and Summations"
order: 1
---

# Introduction to Sequences and Summations

## What Are Sequences?

A **sequence** is an ordered list of elements, typically numbers, following some pattern or rule. Unlike sets, order matters and repetition is allowed.

Examples of sequences:
- 1, 2, 3, 4, 5, ... (natural numbers)
- 2, 4, 6, 8, 10, ... (even numbers)
- 1, 1, 2, 3, 5, 8, 13, ... (Fibonacci)
- 1, 1/2, 1/4, 1/8, ... (powers of 1/2)

Sequences appear everywhere: loop iterations, algorithm steps, data patterns, time series.

## What Are Summations?

A **summation** is the operation of adding up terms of a sequence. Rather than writing:

1 + 2 + 3 + 4 + 5 + ... + 100

We use compact notation:

$$\sum_{i=1}^{100} i$$

Summation notation is essential for:
- Expressing algorithm complexity
- Computing series and totals
- Writing mathematical proofs
- Analyzing data structures

## Why These Concepts Matter

### Algorithm Analysis

Every loop accumulating a value computes a summation:

```python
# This computes Σ(i=0 to n-1) arr[i]
total = 0
for i in range(n):
    total += arr[i]
```

Nested loops often require nested summations:

```python
# Total operations: Σ(i=1 to n) i = n(n+1)/2 = O(n²)
for i in range(1, n+1):
    for j in range(i):
        process()
```

### Closed-Form Efficiency

Computing 1 + 2 + 3 + ... + 1000000 by addition requires a million operations.

Using the formula n(n+1)/2 requires constant time:
$$\sum_{i=1}^{1000000} i = \frac{1000000 \cdot 1000001}{2} = 500000500000$$

Understanding summation formulas lets you optimize calculations.

### Pattern Recognition

Sequences encode patterns. Recognizing the pattern lets you:
- Predict future values
- Find explicit formulas
- Compute sums efficiently
- Solve recurrence relations

## Basic Sequence Notation

### Subscript Notation

We denote sequences using subscripts:

$$a_1, a_2, a_3, \ldots, a_n, \ldots$$

Or compactly: $\{a_n\}$ or $(a_n)_{n=1}^{\infty}$

### Indexing Conventions

Sequences can start at different indices:

| Convention | First Terms | Common Use |
|------------|-------------|------------|
| $a_1, a_2, ...$ | n starts at 1 | Mathematics |
| $a_0, a_1, ...$ | n starts at 0 | Computer science |

Always check the starting index—off-by-one errors are common!

## Defining Sequences

### Explicit Formulas

An **explicit formula** directly computes the nth term:

$$a_n = 2n + 1$$

This gives: a₁ = 3, a₂ = 5, a₃ = 7, ...

Advantages:
- Compute any term directly
- Easy to analyze

### Recursive Formulas

A **recursive formula** defines terms using previous terms:

$$a_1 = 3, \quad a_n = a_{n-1} + 2$$

This gives the same sequence: 3, 5, 7, 9, ...

Advantages:
- Often more intuitive
- Natural for some patterns
- Easy to implement

Disadvantages:
- Need to compute all previous terms
- Can be slower

### Example: Factorial

Explicit: $n! = n \times (n-1) \times \cdots \times 2 \times 1$

Recursive: $0! = 1$, $n! = n \times (n-1)!$

Both define the same sequence: 1, 1, 2, 6, 24, 120, ...

## Common Sequence Types

| Type | Pattern | Example |
|------|---------|---------|
| Arithmetic | Constant difference | 2, 5, 8, 11, ... (d=3) |
| Geometric | Constant ratio | 3, 6, 12, 24, ... (r=2) |
| Fibonacci | Sum of previous two | 1, 1, 2, 3, 5, 8, ... |
| Harmonic | 1/n | 1, 1/2, 1/3, 1/4, ... |
| Factorial | n! | 1, 1, 2, 6, 24, 120, ... |

## Summation Preview

The summation symbol Σ (capital sigma) represents addition:

$$\sum_{i=1}^{n} a_i = a_1 + a_2 + a_3 + \cdots + a_n$$

Components:
- **i**: Index variable (also called dummy variable)
- **1**: Lower bound (starting value)
- **n**: Upper bound (ending value)
- **aᵢ**: General term (expression to sum)

### Reading Summations

$$\sum_{k=0}^{4} 2^k$$

Read as: "Sum of 2^k for k from 0 to 4"

Expands to: 2⁰ + 2¹ + 2² + 2³ + 2⁴ = 1 + 2 + 4 + 8 + 16 = 31

## Learning Path

This topic covers:

1. **Arithmetic Sequences**: Constant difference patterns
2. **Geometric Sequences**: Constant ratio patterns
3. **Summation Notation**: The Σ symbol and its rules
4. **Summation Formulas**: Closed forms for common sums
5. **Summation Techniques**: Manipulation and simplification
6. **Recurrence Relations**: Defining sequences recursively

## Connections to Other Topics

Sequences and summations connect to:

- **Induction**: Proving summation formulas
- **Functions**: Sequences as functions from ℕ to ℝ
- **Sets**: Range of a sequence
- **Relations**: Recurrence as a relation between terms
- **Logic**: Quantifiers in summation expressions

## A Motivating Problem

**Problem:** Compute 1 + 2 + 3 + ... + 100.

**Brute force:** Add all 100 numbers. Tedious!

**Gauss's insight:** Pair numbers from opposite ends:
- 1 + 100 = 101
- 2 + 99 = 101
- 3 + 98 = 101
- ...
- 50 + 51 = 101

There are 50 pairs, each summing to 101.
Total = 50 × 101 = 5050

**General formula:** For 1 + 2 + ... + n:
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

Check: n = 100 gives 100(101)/2 = 5050 ✓

This is the power of summation formulas—turning computation into algebra.

## Summary

**Sequences:**
- Ordered lists following patterns
- Can be defined explicitly or recursively
- Common types: arithmetic, geometric, Fibonacci

**Summations:**
- Compact notation for adding terms
- Essential for algorithm analysis
- Closed-form formulas enable efficient computation

**Why learn this:**
- Analyze loop complexity
- Recognize and exploit patterns
- Transform iteration into direct calculation
