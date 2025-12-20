---
title: "Sequences: Definition and Examples"
slug: "sequences-definition"
description: "Introduction to sequences, notation, and fundamental examples"
---

# Sequences: Definition and Examples

## Definition of a Sequence

**Definition:** A **sequence** in $\mathbb{R}$ is a function $f: \mathbb{N} \to \mathbb{R}$. We typically write $a_n = f(n)$ and denote the sequence by $(a_n)$, $(a_n)_{n=1}^{\infty}$, or $\{a_n\}_{n=1}^{\infty}$.

The value $a_n$ is called the **$n$-th term** of the sequence.

**Notation:** We often specify sequences by:
- **Explicit formula:** $a_n = \frac{1}{n}$, $(a_n) = (1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \ldots)$
- **Recursive formula:** $a_1 = 1$, $a_{n+1} = \frac{1}{2}(a_n + \frac{2}{a_n})$
- **Implicit description:** $a_n =$ the $n$-th prime number

**Remark:** The domain can start at any integer (e.g., $n = 0$ or $n = 5$), but $n = 1$ is most common.

## Basic Examples

### Example 1: Constant Sequence

$a_n = c$ for all $n$, where $c \in \mathbb{R}$.

$(a_n) = (c, c, c, c, \ldots)$

### Example 2: Arithmetic Sequences

$a_n = a + (n-1)d$ where $a$ is the first term and $d$ is the common difference.

Example: $a_n = 2n + 1$ gives $(3, 5, 7, 9, 11, \ldots)$

### Example 3: Geometric Sequences

$a_n = ar^{n-1}$ where $a$ is the first term and $r$ is the common ratio.

Example: $a_n = 2^n$ gives $(2, 4, 8, 16, 32, \ldots)$

### Example 4: Reciprocal Sequence

$$a_n = \frac{1}{n}$$

$(a_n) = (1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \frac{1}{5}, \ldots)$

### Example 5: Alternating Sequence

$$a_n = (-1)^n$$

$(a_n) = (-1, 1, -1, 1, -1, \ldots)$

### Example 6: Fibonacci Sequence

$$a_1 = 1, \quad a_2 = 1, \quad a_{n+2} = a_{n+1} + a_n$$

$(a_n) = (1, 1, 2, 3, 5, 8, 13, 21, \ldots)$

### Example 7: Decimal Approximations

$$a_n = \lfloor 10^n \sqrt{2} \rfloor / 10^n$$

$(a_n) = (1, 1.4, 1.41, 1.414, 1.4142, \ldots)$

This sequence "approaches" $\sqrt{2}$.

## Bounded Sequences

**Definition:** A sequence $(a_n)$ is:
- **Bounded above** if there exists $M \in \mathbb{R}$ such that $a_n \leq M$ for all $n$
- **Bounded below** if there exists $m \in \mathbb{R}$ such that $a_n \geq m$ for all $n$
- **Bounded** if it is both bounded above and below

Equivalently, $(a_n)$ is bounded if there exists $K > 0$ such that $|a_n| \leq K$ for all $n$.

### Examples

**Example 8:** $a_n = \frac{1}{n}$ is bounded: $0 < a_n \leq 1$.

**Example 9:** $a_n = n$ is unbounded above, bounded below by 1.

**Example 10:** $a_n = (-1)^n$ is bounded: $-1 \leq a_n \leq 1$.

**Example 11:** $a_n = (-1)^n n$ is unbounded (both above and below).

**Theorem 2.1:** The sequence $(a_n)$ is bounded if and only if the set $\{a_n : n \in \mathbb{N}\}$ is bounded in $\mathbb{R}$.

## Monotone Sequences

**Definition:** A sequence $(a_n)$ is:
- **Increasing** if $a_n \leq a_{n+1}$ for all $n$
- **Decreasing** if $a_n \geq a_{n+1}$ for all $n$
- **Strictly increasing** if $a_n < a_{n+1}$ for all $n$
- **Strictly decreasing** if $a_n > a_{n+1}$ for all $n$
- **Monotone** if it is either increasing or decreasing

### Examples

**Example 12:** $a_n = n$ is strictly increasing.

**Example 13:** $a_n = \frac{1}{n}$ is strictly decreasing.

**Example 14:** $a_n = (-1)^n$ is not monotone.

**Example 15:** $a_n = \frac{n}{n+1} = 1 - \frac{1}{n+1}$ is strictly increasing.

**Proof:** We have:
$$
a_{n+1} - a_n = \frac{n+1}{n+2} - \frac{n}{n+1} = \frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)} = \frac{n^2 + 2n + 1 - n^2 - 2n}{(n+1)(n+2)} = \frac{1}{(n+1)(n+2)} > 0
$$

## Operations on Sequences

Given sequences $(a_n)$ and $(b_n)$ and $c \in \mathbb{R}$, we define:

**Sum:** $(a_n + b_n)$ is the sequence with $n$-th term $a_n + b_n$

**Product:** $(a_n b_n)$ is the sequence with $n$-th term $a_n b_n$

**Scalar multiplication:** $(c a_n)$ is the sequence with $n$-th term $c a_n$

**Quotient:** If $b_n \neq 0$ for all $n$, $(a_n / b_n)$ has $n$-th term $a_n / b_n$

### Examples

If $a_n = \frac{1}{n}$ and $b_n = \frac{1}{n^2}$, then:
- $(a_n + b_n) = (\frac{1}{n} + \frac{1}{n^2}) = (\frac{n+1}{n^2})$
- $(a_n b_n) = (\frac{1}{n^3})$
- $(a_n / b_n) = (n)$

## Subsequences (Preview)

**Definition:** A **subsequence** of $(a_n)$ is a sequence $(a_{n_k})$ where $(n_k)$ is a strictly increasing sequence of natural numbers.

**Example 16:** From $(1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \frac{1}{5}, \ldots)$, we can extract:
- $(1, \frac{1}{3}, \frac{1}{5}, \ldots)$ (odd indices: $n_k = 2k-1$)
- $(\frac{1}{2}, \frac{1}{4}, \frac{1}{6}, \ldots)$ (even indices: $n_k = 2k$)
- $(1, \frac{1}{4}, \frac{1}{9}, \ldots)$ (perfect squares: $n_k = k^2$)

## Important Sequences

### Harmonic Sequence

$$a_n = \frac{1}{n}$$

This sequence "approaches" 0.

### Geometric Sequence with $|r| < 1$

$$a_n = r^n, \quad |r| < 1$$

Examples: $(1/2)^n = (1/2, 1/4, 1/8, 1/16, \ldots)$ "approaches" 0.

### Sequence of Partial Sums

Given a sequence $(a_n)$, the **sequence of partial sums** is:
$$
s_n = \sum_{k=1}^{n} a_k = a_1 + a_2 + \cdots + a_n
$$

**Example 17:** For $a_n = \frac{1}{2^n}$:
$$
s_n = \frac{1}{2} + \frac{1}{4} + \cdots + \frac{1}{2^n} = 1 - \frac{1}{2^n}
$$

This "approaches" 1.

### Factorial Growth

$$a_n = n!$$

$(a_n) = (1, 2, 6, 24, 120, 720, \ldots)$

This grows extremely rapidly and is unbounded.

### Exponential vs Polynomial

$$a_n = \frac{2^n}{n^2}$$

Despite the $n^2$ in the denominator, this sequence is unbounded because exponential growth dominates polynomial growth.

## Sequences Defined by Recurrence

### Example 18: Square Root Approximation

Define $a_1 = 1$ and:
$$
a_{n+1} = \frac{1}{2}\left(a_n + \frac{2}{a_n}\right)
$$

This is Newton's method for finding $\sqrt{2}$:
$$
(a_n) = (1, 1.5, 1.41\overline{6}, 1.41421\overline{568}, \ldots)
$$

### Example 19: Logistic Map

Define $a_1 = 0.5$ and:
$$
a_{n+1} = r a_n(1 - a_n)
$$

For different values of $r$, this can exhibit convergent, oscillatory, or chaotic behavior.

## Relationship Between Sequences and Functions

Every sequence $(a_n)$ can be viewed as the restriction of a function $f: \mathbb{R}^+ \to \mathbb{R}$ to $\mathbb{N}$.

**Example 20:** The sequence $a_n = \frac{1}{n}$ corresponds to $f(x) = \frac{1}{x}$.

Understanding $\lim_{x \to \infty} f(x)$ can help understand $\lim_{n \to \infty} a_n$.

## Notation and Conventions

**Important:** We write:
- $(a_n)$ or $\{a_n\}$ to denote the sequence itself
- $\{a_n : n \in \mathbb{N}\}$ to denote the **range** or **set of values**

For example, if $a_n = (-1)^n$:
- The sequence $(a_n) = (-1, 1, -1, 1, \ldots)$ is infinite
- The range $\{a_n : n \in \mathbb{N}\} = \{-1, 1\}$ is finite

## Tail of a Sequence

**Definition:** For any $N \in \mathbb{N}$, the **tail** of the sequence $(a_n)$ starting at $N$ is the sequence $(a_n)_{n=N}^{\infty}$.

Many properties of sequences (convergence, boundedness) depend only on the tail, not the initial terms.

**Example 21:** The sequence $(n, n, n, \frac{1}{4}, \frac{1}{5}, \frac{1}{6}, \ldots)$ defined by:
$$
a_n = \begin{cases}
n & \text{if } n \leq 3 \\
\frac{1}{n} & \text{if } n > 3
\end{cases}
$$
is bounded on its tail, even though the first three terms are large.

## Sequences in Mathematics

Sequences appear throughout mathematics:
- **Approximation:** Numerical methods generate sequences approximating solutions
- **Iteration:** Fixed-point methods, Newton's method
- **Series:** $\sum_{n=1}^{\infty} a_n$ is defined via the sequence of partial sums
- **Probability:** Random walks, Markov chains
- **Dynamical systems:** Orbits of discrete-time systems

## Exercises

1. Determine whether each sequence is bounded, increasing, decreasing, or none of these:
   - $a_n = \frac{n}{n+1}$
   - $a_n = \frac{(-1)^n}{n}$
   - $a_n = \sin(n)$

2. Find an explicit formula for the sequence defined by $a_1 = 2$, $a_{n+1} = 2a_n + 1$.

3. Prove that if $(a_n)$ is increasing and $(b_n)$ is increasing, then $(a_n + b_n)$ is increasing.

4. Show that $a_n = \frac{n^2}{2^n}$ is eventually decreasing (i.e., decreasing for $n$ sufficiently large).

5. Give an example of a bounded sequence that is not monotone.

## Conclusion

Sequences are fundamental objects in analysis, providing the framework for limits, series, and continuity. Understanding the behavior of sequences—whether they are bounded, monotone, or exhibit other patterns—is the first step toward studying convergence, which we explore in the next section.
