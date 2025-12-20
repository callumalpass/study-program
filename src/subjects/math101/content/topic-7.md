## Introduction

Sequences and summations are fundamental tools for expressing patterns and computing totals in discrete mathematics. A sequence is an ordered list of numbers following a rule, while a summation provides notation for adding terms together. These concepts appear everywhere in computer science: analyzing algorithm complexity, computing hash functions, understanding recurrence relations, and working with series in numerical methods.

**Why This Matters:**
When you write a loop that accumulates a total, you're computing a summation. When you analyze how many operations an algorithm performs, you often express the count as a sum. Understanding sequences helps you recognize patterns, and summation formulas let you compute totals efficiently without iterating through every term.

**Learning Objectives:**
- Define and work with arithmetic and geometric sequences
- Use summation notation (Σ) fluently
- Apply closed-form formulas for common sums
- Manipulate summation indices and split/combine sums
- Prove summation identities using induction
- Recognize and solve simple recurrence relations

---

## Core Concepts

### Sequences

A **sequence** is an ordered list of elements. We typically denote a sequence as $\{a_n\}$ where $n$ is the index.

**Explicit Formula:** Defines each term directly.
- Example: $a_n = 2n + 1$ gives the sequence 3, 5, 7, 9, 11, ...

**Recursive Formula:** Defines each term based on previous terms.
- Example: $a_1 = 1$, $a_n = a_{n-1} + 2$ gives the same sequence 1, 3, 5, 7, ...

### Arithmetic Sequences

An **arithmetic sequence** has a constant difference between consecutive terms.

**General form:** $a_n = a_1 + (n-1)d$

where:
- $a_1$ is the first term
- $d$ is the common difference
- $n$ is the term number

**Example:** 2, 5, 8, 11, 14, ...
- $a_1 = 2$, $d = 3$
- $a_n = 2 + (n-1) \cdot 3 = 3n - 1$
- Check: $a_4 = 3(4) - 1 = 11$ ✓

### Geometric Sequences

A **geometric sequence** has a constant ratio between consecutive terms.

**General form:** $a_n = a_1 \cdot r^{n-1}$

where:
- $a_1$ is the first term
- $r$ is the common ratio

**Example:** 3, 6, 12, 24, 48, ...
- $a_1 = 3$, $r = 2$
- $a_n = 3 \cdot 2^{n-1}$
- Check: $a_5 = 3 \cdot 2^4 = 48$ ✓

### Summation Notation

The **summation symbol** $\sum$ (capital sigma) provides compact notation:

$$\sum_{i=1}^{n} a_i = a_1 + a_2 + a_3 + \cdots + a_n$$

**Components:**
- $i$ is the **index variable** (also called dummy variable)
- $1$ is the **lower bound**
- $n$ is the **upper bound**
- $a_i$ is the **general term**

**Examples:**
$$\sum_{i=1}^{4} i^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30$$

$$\sum_{k=0}^{3} 2^k = 2^0 + 2^1 + 2^2 + 2^3 = 1 + 2 + 4 + 8 = 15$$

### Important Summation Formulas

**Sum of first n positive integers:**
$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$

**Sum of first n squares:**
$$\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}$$

**Sum of first n cubes:**
$$\sum_{i=1}^{n} i^3 = \left(\frac{n(n+1)}{2}\right)^2$$

**Sum of arithmetic series:**
$$\sum_{i=1}^{n} (a_1 + (i-1)d) = \frac{n(a_1 + a_n)}{2} = \frac{n(2a_1 + (n-1)d)}{2}$$

**Sum of geometric series:**
$$\sum_{i=0}^{n-1} ar^i = a \cdot \frac{r^n - 1}{r - 1} \quad (r \neq 1)$$

**Infinite geometric series (|r| < 1):**
$$\sum_{i=0}^{\infty} ar^i = \frac{a}{1-r}$$

### Summation Properties

**Linearity:**
$$\sum_{i=1}^{n} (ca_i) = c \sum_{i=1}^{n} a_i$$

$$\sum_{i=1}^{n} (a_i + b_i) = \sum_{i=1}^{n} a_i + \sum_{i=1}^{n} b_i$$

**Splitting sums:**
$$\sum_{i=1}^{n} a_i = \sum_{i=1}^{k} a_i + \sum_{i=k+1}^{n} a_i$$

**Index shifting:** If we substitute $j = i - c$:
$$\sum_{i=c}^{n} a_i = \sum_{j=0}^{n-c} a_{j+c}$$

### Recurrence Relations

A **recurrence relation** defines a sequence using previous terms.

**Example - Fibonacci:**
$$F_0 = 0, \quad F_1 = 1, \quad F_n = F_{n-1} + F_{n-2}$$

Gives: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

**First-order linear recurrence:**
$$a_n = ca_{n-1} + d$$

Solution: $a_n = c^n a_0 + d \cdot \frac{c^n - 1}{c - 1}$ (for $c \neq 1$)

---

## Common Patterns and Idioms

### Telescoping Sums

A sum where consecutive terms cancel:

$$\sum_{i=1}^{n} (a_i - a_{i+1}) = a_1 - a_{n+1}$$

**Example:**
$$\sum_{i=1}^{n} \frac{1}{i(i+1)} = \sum_{i=1}^{n} \left(\frac{1}{i} - \frac{1}{i+1}\right) = 1 - \frac{1}{n+1} = \frac{n}{n+1}$$

### Double Summations

When summing over two indices:

$$\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij}$$

**Interchanging order:** For finite sums:
$$\sum_{i=1}^{m} \sum_{j=1}^{n} a_{ij} = \sum_{j=1}^{n} \sum_{i=1}^{m} a_{ij}$$

### Computing Loop Complexity

Nested loops often correspond to summations:

```python
count = 0
for i in range(1, n+1):
    for j in range(1, i+1):
        count += 1
```

Total operations: $\sum_{i=1}^{n} i = \frac{n(n+1)}{2} = O(n^2)$

---

## Common Mistakes and Debugging

### Mistake 1: Off-by-One Errors

$$\sum_{i=0}^{n} a_i \neq \sum_{i=1}^{n} a_i$$

The first has $n+1$ terms, the second has $n$ terms.

### Mistake 2: Forgetting the r ≠ 1 Condition

The geometric series formula $\frac{r^n - 1}{r-1}$ is undefined when $r = 1$.
When $r = 1$: $\sum_{i=0}^{n-1} a = na$

### Mistake 3: Index Variable Confusion

The index variable is a "dummy" — it doesn't exist outside the sum:

$$\sum_{i=1}^{n} i^2 = \sum_{k=1}^{n} k^2 = \sum_{j=1}^{n} j^2$$

But you can't use the same variable for nested sums:

❌ $\sum_{i=1}^{n} \sum_{i=1}^{m} a_{ij}$ — ambiguous!

### Mistake 4: Incorrect Series Type

An arithmetic sequence has constant DIFFERENCE: 2, 5, 8, 11 (d = 3)
A geometric sequence has constant RATIO: 2, 6, 18, 54 (r = 3)

Don't confuse them!

---

## Best Practices

1. **Verify formulas with small cases:** Before using $\sum_{i=1}^n i = \frac{n(n+1)}{2}$, check n=3: 1+2+3=6, and 3(4)/2=6 ✓

2. **Watch your bounds:** When transforming sums, track how bounds change.

3. **Factor before summing:** $\sum 3i = 3\sum i$ makes computation easier.

4. **Look for telescoping:** If terms look like differences, they might cancel.

5. **Use induction for proofs:** Summation identities are classic induction problems.

---

## Real-World Applications

**Algorithm Analysis:**
```python
# What's the time complexity?
def example(n):
    for i in range(n):          # n iterations
        for j in range(i):      # i iterations each
            process()           # O(1) work
# Total: Σ(i=0 to n-1) i = n(n-1)/2 = O(n²)
```

**Finance - Compound Interest:**
$$A = P \sum_{i=0}^{n-1} (1+r)^i = P \cdot \frac{(1+r)^n - 1}{r}$$

**Computer Graphics - Geometric Series:**
Level-of-detail rendering, where each level has half the polygons:
$$\text{Total polygons} = \sum_{i=0}^{k} \frac{n}{2^i} = n \cdot \frac{1 - (1/2)^{k+1}}{1 - 1/2} < 2n$$

**Data Structures - Hash Tables:**
Expected number of probes in linear probing analysis involves harmonic sums.

---

## Summary

- **Sequences** are ordered lists; arithmetic sequences have constant difference, geometric have constant ratio.
- **Summation notation** $\sum$ provides compact representation of sums.
- **Key formulas:** $\sum i = \frac{n(n+1)}{2}$, $\sum i^2 = \frac{n(n+1)(2n+1)}{6}$, geometric sum = $\frac{a(r^n-1)}{r-1}$
- **Properties:** Linearity, splitting, index shifting enable algebraic manipulation.
- **Telescoping** sums cancel intermediate terms.
- **Recurrence relations** define sequences recursively; solving them gives explicit formulas.

---

## Further Exploration

- **Generating Functions:** Encode sequences as power series coefficients.
- **Asymptotic Analysis:** Big-O notation for comparing growth rates of sums.
- **Harmonic Numbers:** $H_n = \sum_{i=1}^{n} \frac{1}{i}$, important in algorithm analysis.
- **Stirling's Approximation:** Approximating factorials: $n! \approx \sqrt{2\pi n}(n/e)^n$
