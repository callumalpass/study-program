---
title: "Double Series and Iterated Sums"
slug: "double-series"
description: "Summation of double series, Fubini's theorem for series, and when summation order matters"
---

# Double Series and Iterated Sums

## Introduction

When working with series indexed by two (or more) indices, we encounter fundamental questions about the order of summation. For finite sums, commutativity and associativity guarantee that the order doesn't matter. For infinite double series, however, the situation is more delicate. This section explores when and why summation order matters, culminating in Fubini's theorem for series.

## Definition of Double Series

**Definition:** A **double series** is a formal expression:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_{m,n}
$$
where $(a_{m,n})$ is a doubly-indexed sequence of real numbers.

There are several ways to interpret this sum:

1. **Iterated sums (row-wise):** First sum over $n$ for each fixed $m$, then sum over $m$:
$$
\sum_{m=1}^{\infty} \left(\sum_{n=1}^{\infty} a_{m,n}\right)
$$

2. **Iterated sums (column-wise):** First sum over $m$ for each fixed $n$, then sum over $n$:
$$
\sum_{n=1}^{\infty} \left(\sum_{m=1}^{\infty} a_{m,n}\right)
$$

3. **Unordered summation:** Sum over all pairs $(m,n)$ in some order (e.g., by diagonals, spirals, or any enumeration of $\mathbb{N} \times \mathbb{N}$).

The central question is: **When do these interpretations give the same answer?**

## Iterated Sums May Differ

**Example 1:** Consider the double sequence defined by:
$$
a_{m,n} = \begin{cases}
1 & \text{if } m = n \\
-1 & \text{if } m = n+1 \\
0 & \text{otherwise}
\end{cases}
$$

This creates a matrix that looks like:
$$
\begin{pmatrix}
1 & 0 & 0 & 0 & \cdots \\
-1 & 1 & 0 & 0 & \cdots \\
0 & -1 & 1 & 0 & \cdots \\
0 & 0 & -1 & 1 & \cdots \\
\vdots & \vdots & \vdots & \vdots & \ddots
\end{pmatrix}
$$

**Row-wise summation:** For $m = 1$, the sum is 1. For $m > 1$, each row sums to $-1 + 1 = 0$. Hence:
$$
\sum_{m=1}^{\infty} \left(\sum_{n=1}^{\infty} a_{m,n}\right) = 1 + 0 + 0 + \cdots = 1
$$

**Column-wise summation:** For $n = 1$, the column sums to $1 + (-1) + 0 + \cdots = 0$. Similarly, each column sums to 0. Hence:
$$
\sum_{n=1}^{\infty} \left(\sum_{m=1}^{\infty} a_{m,n}\right) = 0 + 0 + 0 + \cdots = 0
$$

The two iterated sums give different values (1 vs. 0), demonstrating that summation order can matter.

**Example 2 (Classic):** Consider:
$$
a_{m,n} = \frac{(-1)^{m+n}}{(m+n)^2}
$$

Without absolute convergence, the row-wise and column-wise iterated sums may not be equal.

## Absolute Convergence of Double Series

**Definition:** A double series $\sum_{m,n} a_{m,n}$ **converges absolutely** if:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} |a_{m,n}| < \infty
$$

This condition ensures that the sum of absolute values is finite, regardless of the order.

**Theorem (Tonelli for Series):** If $a_{m,n} \geq 0$ for all $m, n$, then:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_{m,n} = \sum_{n=1}^{\infty} \sum_{m=1}^{\infty} a_{m,n} = \sum_{(m,n) \in \mathbb{N}^2} a_{m,n}
$$

All three sums are equal (possibly $+\infty$). For non-negative terms, order doesn't matter.

## Fubini's Theorem for Series

**Theorem (Fubini for Series):** If $\sum_{m,n} |a_{m,n}| < \infty$, then:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_{m,n} = \sum_{n=1}^{\infty} \sum_{m=1}^{\infty} a_{m,n} = \sum_{(m,n)} a_{m,n}
$$

where the last sum is over all pairs in any order. Moreover, all sums converge absolutely.

**Proof Sketch:** Absolute convergence allows us to apply the rearrangement theorem. Since $\sum |a_{m,n}| < \infty$, any enumeration of the terms gives the same sum. In particular, row-wise and column-wise orderings are both valid enumerations, so they give the same result. □

**Corollary:** If $\sum_{m,n} |a_{m,n}| < \infty$, then for any bijection $\sigma: \mathbb{N} \to \mathbb{N} \times \mathbb{N}$:
$$
\sum_{k=1}^{\infty} a_{\sigma(k)} = \sum_{m,n} a_{m,n}
$$

This includes diagonal enumeration, spiral enumeration, or any other systematic ordering.

## Example: The Product Formula

**Example 3:** Compute $\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{m^2 n^2}$.

Since all terms are positive and:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{m^2 n^2} = \left(\sum_{m=1}^{\infty} \frac{1}{m^2}\right)\left(\sum_{n=1}^{\infty} \frac{1}{n^2}\right) = \frac{\pi^2}{6} \cdot \frac{\pi^2}{6} = \frac{\pi^4}{36}
$$

The product formula works because we can separate the variables when terms factor.

**Example 4:** Evaluate $\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{2^{m+n}}$.

$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{2^{m+n}} = \sum_{m=1}^{\infty} \frac{1}{2^m} \sum_{n=1}^{\infty} \frac{1}{2^n} = 1 \cdot 1 = 1
$$

(using the geometric series formula $\sum_{k=1}^{\infty} 1/2^k = 1$).

## Products of Series

**Theorem (Cauchy Product):** If $\sum a_m$ and $\sum b_n$ both converge absolutely, then:
$$
\left(\sum_{m=0}^{\infty} a_m\right)\left(\sum_{n=0}^{\infty} b_n\right) = \sum_{k=0}^{\infty} c_k
$$
where $c_k = \sum_{j=0}^{k} a_j b_{k-j}$ is the **Cauchy product**.

**Proof:** The double series $\sum_{m,n} a_m b_n$ converges absolutely since:
$$
\sum_{m,n} |a_m b_n| = \left(\sum_m |a_m|\right)\left(\sum_n |b_n|\right) < \infty
$$

By Fubini, we can sum in any order, including along diagonals ($m + n = k$), giving the Cauchy product. □

**Non-Example:** Without absolute convergence, the Cauchy product can fail. The classic example involves $\sum (-1)^n / \sqrt{n+1}$, which converges conditionally, but its Cauchy product with itself diverges.

## Diagonal Summation

**Definition:** Summing a double series "by diagonals" means:
$$
\sum_{k=2}^{\infty} \sum_{m+n=k} a_{m,n} = \sum_{k=2}^{\infty} \sum_{m=1}^{k-1} a_{m, k-m}
$$

For absolutely convergent double series, this gives the same result as iterated summation.

**Example 5:** For $a_{m,n} = x^m y^n$ with $|x|, |y| < 1$:
$$
\sum_{k=2}^{\infty} \sum_{m=1}^{k-1} x^m y^{k-m} = \sum_{k=2}^{\infty} y^k \sum_{m=1}^{k-1} (x/y)^m = \frac{xy}{(1-x)(1-y)}
$$

This matches direct computation.

## When Summation Order Matters: A Warning

Without absolute convergence, double series can exhibit pathological behavior:

1. **Different iterated sums:** As shown in Example 1.
2. **Conditional convergence in one order but divergence in another.**
3. **Dependence on the enumeration of $\mathbb{N} \times \mathbb{N}.$**

**Rule of thumb:** Always check for absolute convergence before manipulating double series. If absolute convergence fails, treat all order changes with extreme caution.

## Key Takeaways

- **Double series** can be summed in different orders: row-wise, column-wise, or by other enumerations.
- Without absolute convergence, **iterated sums may differ** or even diverge.
- **Fubini's theorem for series:** If $\sum |a_{m,n}| < \infty$, all summation orders give the same result.
- For **non-negative series**, Tonelli's theorem guarantees order-invariance (even if the sum is $\infty$).
- The **Cauchy product** of absolutely convergent series is valid; conditional convergence can cause failure.
- **Always check absolute convergence** before interchanging summation order.

## Common Mistakes to Avoid

1. **Assuming row and column sums are equal:** Without absolute convergence, they may differ.

2. **Interchanging limits without justification:** The order of $\sum_m$ and $\sum_n$ requires Fubini's conditions.

3. **Confusing Fubini (signed) with Tonelli (non-negative):** Tonelli applies to non-negative terms always; Fubini requires the signed sum to converge absolutely.

4. **Forgetting to verify absolute convergence:** This is the key hypothesis for order invariance.
