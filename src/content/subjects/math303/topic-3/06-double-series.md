---
title: "Double Series"
slug: "double-series"
description: "Summation of double series and Fubini's theorem for series"
---

# Double Series

## Definition

**Definition:** A **double series** is an expression of the form:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_{m,n}
$$

We can sum in different orders or sum over all pairs simultaneously.

## Iterated Sums

**Row-wise sum:**
$$
\sum_{m=1}^{\infty} \left(\sum_{n=1}^{\infty} a_{m,n}\right)
$$

**Column-wise sum:**
$$
\sum_{n=1}^{\infty} \left(\sum_{m=1}^{\infty} a_{m,n}\right)
$$

**Question:** When do these give the same answer?

## Absolutely Convergent Double Series

**Definition:** The double series $\sum_{m,n} a_{m,n}$ converges absolutely if:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} |a_{m,n}| < \infty
$$

**Theorem 6.1 (Fubini for Series):** If $\sum_{m,n} |a_{m,n}| < \infty$, then:
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_{m,n} = \sum_{n=1}^{\infty} \sum_{m=1}^{\infty} a_{m,n} = \sum_{(m,n)} a_{m,n}
$$

where the last sum is over all pairs in any order.

**Proof:** Absolute convergence allows us to group and rearrange without affecting the sum.

**Example 1:**
$$
\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{m^2 n^2} = \left(\sum_{m=1}^{\infty} \frac{1}{m^2}\right)\left(\sum_{n=1}^{\infty} \frac{1}{n^2}\right) = \frac{\pi^2}{6} \cdot \frac{\pi^2}{6} = \frac{\pi^4}{36}
$$

## Failure of Fubini Without Absolute Convergence

**Example 2:** Consider:
$$
a_{m,n} = \begin{cases}
1 & \text{if } m = n \\
-1 & \text{if } m = n+1 \\
0 & \text{otherwise}
\end{cases}
$$

Row-wise: $\sum_n a_{m,n} = 0$ for all $m > 1$ (each row sums to 0), so total is 0.

Column-wise: Similar analysis gives different result.

**Example 3 (Classic):**
$$
a_{m,n} = \frac{(-1)^{m+n}}{m+n}
$$

The iterated sums may not be equal without absolute convergence.

## Product of Two Series

**Theorem 6.2:** If $\sum a_m$ and $\sum b_n$ both converge absolutely, then:
$$
\left(\sum_{m=1}^{\infty} a_m\right)\left(\sum_{n=1}^{\infty} b_n\right) = \sum_{m=1}^{\infty} \sum_{n=1}^{\infty} a_m b_n
$$

**Proof:** Set $c_{m,n} = a_m b_n$. Then:
$$
\sum_{m,n} |c_{m,n}| = \sum_m |a_m| \sum_n |b_n| < \infty
$$

By Fubini, the double series equals the product.

## Exercises

1. Evaluate $\sum_{m=1}^{\infty} \sum_{n=1}^{\infty} \frac{1}{2^{m+n}}$.

2. Find an example where row and column sums exist but are not equal.

3. Prove that $\sum_{m,n \geq 1, m \neq n} \frac{1}{m^2 n^2}$ converges.

## Conclusion

Double series require care: iterated sums may not commute without absolute convergence. Fubini's theorem for series provides conditions under which summation order doesn't matter, analogous to Fubini's theorem for integration.
