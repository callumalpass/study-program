---
id: math204-t6-infinite-series
title: "Infinite Series"
order: 3
---

# Infinite Series

## Introduction to Series

An **infinite series** (or simply **series**) is the sum of the terms of an infinite sequence. If $\{a_n\}$ is a sequence, the associated series is:
$$\sum_{n=1}^{\infty} a_n = a_1 + a_2 + a_3 + a_4 + \cdots$$

The question we ask is: can we assign a finite value to this infinite sum?

### Examples of Series

1. $\sum_{n=1}^{\infty} \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$ (harmonic series)

2. $\sum_{n=1}^{\infty} \frac{1}{n^2} = 1 + \frac{1}{4} + \frac{1}{9} + \frac{1}{16} + \cdots$ (p-series with $p=2$)

3. $\sum_{n=0}^{\infty} \frac{1}{2^n} = 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \cdots$ (geometric series)

## Partial Sums

To make sense of infinite sums, we define **partial sums**.

The **$n$-th partial sum** $S_n$ is the sum of the first $n$ terms:
$$S_n = \sum_{k=1}^{n} a_k = a_1 + a_2 + a_3 + \cdots + a_n$$

The sequence of partial sums is:
$$S_1 = a_1$$
$$S_2 = a_1 + a_2$$
$$S_3 = a_1 + a_2 + a_3$$
$$\vdots$$
$$S_n = a_1 + a_2 + \cdots + a_n$$

### Example: Computing Partial Sums

For the series $\sum_{n=1}^{\infty} \frac{1}{n(n+1)}$, compute the first few partial sums.

**Solution**: Using partial fraction decomposition: $\frac{1}{n(n+1)} = \frac{1}{n} - \frac{1}{n+1}$

$$S_1 = \frac{1}{1} - \frac{1}{2} = \frac{1}{2}$$

$$S_2 = \left(\frac{1}{1} - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) = 1 - \frac{1}{3} = \frac{2}{3}$$

$$S_3 = \left(\frac{1}{1} - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{4}\right) = 1 - \frac{1}{4} = \frac{3}{4}$$

This is a **telescoping series**. In general:
$$S_n = 1 - \frac{1}{n+1} = \frac{n}{n+1}$$

## Convergence of Series

A series $\sum_{n=1}^{\infty} a_n$ is said to **converge** to the sum $S$ if the sequence of partial sums $\{S_n\}$ converges to $S$:
$$\sum_{n=1}^{\infty} a_n = S \iff \lim_{n \to \infty} S_n = S$$

If the sequence of partial sums does not converge, we say the series **diverges**.

### Formal Definition

The series $\sum_{n=1}^{\infty} a_n$ converges to $S$ if for every $\varepsilon > 0$, there exists $N$ such that:
$$\left|S_n - S\right| < \varepsilon \quad \text{for all } n > N$$

where $S_n = a_1 + a_2 + \cdots + a_n$.

### Example: Telescoping Series Continued

From the previous example:
$$\lim_{n \to \infty} S_n = \lim_{n \to \infty} \frac{n}{n+1} = \lim_{n \to \infty} \frac{1}{1 + \frac{1}{n}} = 1$$

Therefore:
$$\sum_{n=1}^{\infty} \frac{1}{n(n+1)} = 1$$

## Geometric Series

A **geometric series** has the form:
$$\sum_{n=0}^{\infty} ar^n = a + ar + ar^2 + ar^3 + \cdots$$

where $a$ is the first term and $r$ is the **common ratio**.

### Convergence of Geometric Series

The geometric series converges if and only if $|r| < 1$, and when it converges:
$$\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r} \quad \text{for } |r| < 1$$

If $|r| \geq 1$, the series diverges.

### Derivation

The $n$-th partial sum of a geometric series is:
$$S_n = a + ar + ar^2 + \cdots + ar^{n-1}$$

Multiply by $r$:
$$rS_n = ar + ar^2 + ar^3 + \cdots + ar^n$$

Subtract:
$$S_n - rS_n = a - ar^n$$
$$S_n(1-r) = a(1-r^n)$$
$$S_n = \frac{a(1-r^n)}{1-r}$$

If $|r| < 1$, then $r^n \to 0$ as $n \to \infty$, so:
$$\lim_{n \to \infty} S_n = \frac{a(1-0)}{1-r} = \frac{a}{1-r}$$

### Example 1: Convergent Geometric Series

Determine if $\sum_{n=0}^{\infty} \frac{3}{5^n}$ converges, and if so, find its sum.

**Solution**: This is a geometric series with $a = 3$ and $r = \frac{1}{5}$.

Since $|r| = \frac{1}{5} < 1$, the series converges to:
$$\sum_{n=0}^{\infty} \frac{3}{5^n} = \frac{3}{1 - \frac{1}{5}} = \frac{3}{\frac{4}{5}} = \frac{15}{4}$$

### Example 2: Divergent Geometric Series

Does $\sum_{n=1}^{\infty} 2^n$ converge?

**Solution**: This can be written as $\sum_{n=1}^{\infty} 2 \cdot 2^{n-1} = \sum_{n=0}^{\infty} 2^{n+1}$, which is geometric with $r = 2$.

Since $|r| = 2 > 1$, the series diverges.

### Example 3: Repeating Decimal

Express $0.777\ldots$ as a fraction using geometric series.

**Solution**: We can write:
$$0.777\ldots = \frac{7}{10} + \frac{7}{100} + \frac{7}{1000} + \cdots = \sum_{n=1}^{\infty} \frac{7}{10^n}$$

This is geometric with $a = \frac{7}{10}$ and $r = \frac{1}{10}$:
$$\sum_{n=1}^{\infty} \frac{7}{10^n} = \frac{\frac{7}{10}}{1 - \frac{1}{10}} = \frac{\frac{7}{10}}{\frac{9}{10}} = \frac{7}{9}$$

### Example 4: More Complex Geometric Series

Find the sum of $\sum_{n=2}^{\infty} \frac{3^{n+1}}{4^{n-1}}$.

**Solution**: Rewrite the general term:
$$\frac{3^{n+1}}{4^{n-1}} = \frac{3^{n+1}}{4^{n-1}} = 3^{n+1} \cdot 4^{-(n-1)} = 3 \cdot 3^n \cdot 4 \cdot 4^{-n} = 12 \cdot \left(\frac{3}{4}\right)^n$$

So:
$$\sum_{n=2}^{\infty} \frac{3^{n+1}}{4^{n-1}} = \sum_{n=2}^{\infty} 12 \left(\frac{3}{4}\right)^n = 12 \sum_{n=2}^{\infty} \left(\frac{3}{4}\right)^n$$

To use the geometric series formula starting at $n=0$:
$$\sum_{n=2}^{\infty} \left(\frac{3}{4}\right)^n = \sum_{n=0}^{\infty} \left(\frac{3}{4}\right)^n - \frac{3}{4}^0 - \left(\frac{3}{4}\right)^1$$

$$= \frac{1}{1-\frac{3}{4}} - 1 - \frac{3}{4} = 4 - 1 - \frac{3}{4} = \frac{9}{4}$$

Therefore:
$$\sum_{n=2}^{\infty} \frac{3^{n+1}}{4^{n-1}} = 12 \cdot \frac{9}{4} = 27$$

## Properties of Convergent Series

If $\sum a_n$ and $\sum b_n$ are convergent series, then:

1. **Constant Multiple**: $\sum c \cdot a_n = c \sum a_n$ for any constant $c$

2. **Sum/Difference**: $\sum (a_n \pm b_n) = \sum a_n \pm \sum b_n$

3. **Finite Terms Don't Affect Convergence**: Adding, removing, or changing a finite number of terms doesn't affect whether a series converges (though it may change the sum)

4. **Tail of Series**: $\sum_{n=N}^{\infty} a_n$ converges if and only if $\sum_{n=1}^{\infty} a_n$ converges

### Example: Using Linearity

Find $\sum_{n=0}^{\infty} \left(\frac{2^n + 3^n}{6^n}\right)$.

**Solution**: Split the series:
$$\sum_{n=0}^{\infty} \frac{2^n + 3^n}{6^n} = \sum_{n=0}^{\infty} \frac{2^n}{6^n} + \sum_{n=0}^{\infty} \frac{3^n}{6^n}$$

$$= \sum_{n=0}^{\infty} \left(\frac{1}{3}\right)^n + \sum_{n=0}^{\infty} \left(\frac{1}{2}\right)^n$$

Both are geometric series with $|r| < 1$:
$$= \frac{1}{1-\frac{1}{3}} + \frac{1}{1-\frac{1}{2}} = \frac{3}{2} + 2 = \frac{7}{2}$$

## The Harmonic Series

The **harmonic series** is:
$$\sum_{n=1}^{\infty} \frac{1}{n} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots$$

Despite the fact that $\frac{1}{n} \to 0$, this series **diverges**.

### Proof of Divergence

Group terms as follows:
$$1 + \frac{1}{2} + \left(\frac{1}{3} + \frac{1}{4}\right) + \left(\frac{1}{5} + \frac{1}{6} + \frac{1}{7} + \frac{1}{8}\right) + \cdots$$

Each group sums to at least $\frac{1}{2}$:
$$\frac{1}{3} + \frac{1}{4} > \frac{1}{4} + \frac{1}{4} = \frac{1}{2}$$

$$\frac{1}{5} + \frac{1}{6} + \frac{1}{7} + \frac{1}{8} > \frac{1}{8} + \frac{1}{8} + \frac{1}{8} + \frac{1}{8} = \frac{1}{2}$$

Since we have infinitely many groups each summing to at least $\frac{1}{2}$, the series diverges to infinity.

## Important Notes

1. If $a_n \not\to 0$, then $\sum a_n$ diverges (the Test for Divergence, covered in the next section)

2. If $a_n \to 0$, the series might converge or diverge (the harmonic series shows that $a_n \to 0$ is necessary but not sufficient)

3. For geometric series, the behavior depends entirely on the common ratio $r$

## Key Takeaways

- A series converges if its sequence of partial sums converges
- Geometric series $\sum ar^n$ converges to $\frac{a}{1-r}$ when $|r| < 1$
- Series can be manipulated algebraically if they converge
- The harmonic series diverges despite having terms that approach zero
- Computing partial sums explicitly (when possible) is the most direct way to determine convergence
