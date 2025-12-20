---
id: math204-t6-alternating
title: "Alternating Series"
order: 6
---

# Alternating Series

## Introduction to Alternating Series

An **alternating series** is a series whose terms alternate in sign. The general form is:
$$\sum_{n=1}^{\infty} (-1)^n a_n = -a_1 + a_2 - a_3 + a_4 - a_5 + \cdots$$

or:
$$\sum_{n=1}^{\infty} (-1)^{n+1} a_n = a_1 - a_2 + a_3 - a_4 + a_5 - \cdots$$

where $a_n > 0$ for all $n$.

### Examples

1. **Alternating Harmonic Series**: $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots$

2. **Alternating p-Series**: $\sum_{n=1}^{\infty} \frac{(-1)^n}{n^2} = -1 + \frac{1}{4} - \frac{1}{9} + \frac{1}{16} - \cdots$

3. **Alternating with Exponential**: $\sum_{n=0}^{\infty} \frac{(-1)^n}{2^n} = 1 - \frac{1}{2} + \frac{1}{4} - \frac{1}{8} + \cdots$

## The Alternating Series Test

The **Alternating Series Test** (also called **Leibniz's Test**) gives a simple criterion for convergence of alternating series.

### Theorem: Alternating Series Test

Consider the alternating series $\sum_{n=1}^{\infty} (-1)^{n+1} a_n$ where $a_n > 0$.

The series **converges** if:
1. $a_n \geq a_{n+1}$ for all $n$ (the terms $a_n$ are **decreasing**)
2. $\lim_{n \to \infty} a_n = 0$ (the terms approach **zero**)

### Important Notes

- Both conditions must be satisfied
- The terms $a_n$ (without the alternating sign) must decrease to zero
- The test can be applied starting at any index $N$ (i.e., conditions need only hold eventually)

### Intuition

The alternating series can be visualized as a "back and forth" process on the number line. If the steps get progressively smaller and approach zero, the series converges to a specific value.

### Example 1: The Alternating Harmonic Series

Show that $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}$ converges.

**Solution**: Here, $a_n = \frac{1}{n}$.

*Check condition 1*: Is $a_n \geq a_{n+1}$?
$$\frac{1}{n} \geq \frac{1}{n+1} \quad \checkmark$$

This is true for all $n \geq 1$.

*Check condition 2*: Does $\lim_{n \to \infty} a_n = 0$?
$$\lim_{n \to \infty} \frac{1}{n} = 0 \quad \checkmark$$

Both conditions are satisfied, so the series converges.

**Note**: The ordinary harmonic series $\sum \frac{1}{n}$ diverges, but the alternating version converges! This is remarkable—the alternation of signs is enough to make the series converge.

### Example 2: Convergent Alternating Series

Determine if $\sum_{n=1}^{\infty} \frac{(-1)^n n}{n^2 + 1}$ converges.

**Solution**: Here, $a_n = \frac{n}{n^2 + 1}$.

*Check condition 2 first*:
$$\lim_{n \to \infty} \frac{n}{n^2 + 1} = \lim_{n \to \infty} \frac{1}{n + \frac{1}{n}} = 0 \quad \checkmark$$

*Check condition 1*: Is $a_n$ decreasing?

Consider the function $f(x) = \frac{x}{x^2 + 1}$ and check if $f'(x) < 0$ for $x \geq 1$:
$$f'(x) = \frac{(x^2 + 1) - x(2x)}{(x^2 + 1)^2} = \frac{x^2 + 1 - 2x^2}{(x^2 + 1)^2} = \frac{1 - x^2}{(x^2 + 1)^2}$$

For $x \geq 1$, we have $1 - x^2 \leq 0$, so $f'(x) \leq 0$ and $f$ is decreasing. ✓

Both conditions are satisfied, so the series converges.

### Example 3: Divergent Alternating Series

Does $\sum_{n=1}^{\infty} \frac{(-1)^n n}{n + 1}$ converge?

**Solution**: Here, $a_n = \frac{n}{n + 1}$.

Check the limit:
$$\lim_{n \to \infty} \frac{n}{n + 1} = \lim_{n \to \infty} \frac{1}{1 + \frac{1}{n}} = 1 \neq 0$$

Condition 2 fails, so the Alternating Series Test does not apply. Moreover, by the Divergence Test, the series diverges.

### Example 4: Requiring Careful Analysis

Test $\sum_{n=2}^{\infty} \frac{(-1)^n}{\ln n}$ for convergence.

**Solution**: Here, $a_n = \frac{1}{\ln n}$.

*Check condition 2*:
$$\lim_{n \to \infty} \frac{1}{\ln n} = 0 \quad \checkmark$$

*Check condition 1*: Since $\ln n$ is increasing, $\frac{1}{\ln n}$ is decreasing. ✓

Both conditions are satisfied, so the series converges.

## Error Estimation for Alternating Series

One of the most useful properties of alternating series is the ability to estimate the error when approximating the sum with a partial sum.

### Theorem: Alternating Series Remainder Estimate

If the alternating series $\sum_{n=1}^{\infty} (-1)^{n+1} a_n$ satisfies the conditions of the Alternating Series Test and converges to $S$, then the error in approximating $S$ by the $n$-th partial sum $S_n$ satisfies:
$$|S - S_n| \leq a_{n+1}$$

In other words, **the error is at most the absolute value of the first omitted term**.

### Intuition

Because the series alternates and the terms decrease, each new term overshoots the limit by less than the previous overshoot. The error is bounded by the next term you would add.

### Example 1: Approximating the Alternating Harmonic Series

Approximate $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}$ by $S_{10}$ and estimate the error.

**Solution**: The partial sum is:
$$S_{10} = 1 - \frac{1}{2} + \frac{1}{3} - \frac{1}{4} + \cdots - \frac{1}{10}$$

Computing:
$$S_{10} = \frac{7381}{12600} \approx 0.5858$$

The error satisfies:
$$|S - S_{10}| \leq a_{11} = \frac{1}{11} \approx 0.0909$$

So the true sum $S$ is between $S_{10} - a_{11}$ and $S_{10} + a_{11}$, i.e., approximately between $0.495$ and $0.677$.

(The actual sum is $\ln 2 \approx 0.6931$.)

### Example 2: Achieving a Desired Accuracy

How many terms of $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^2}$ are needed to approximate the sum to within $0.01$?

**Solution**: We need:
$$a_{n+1} = \frac{1}{(n+1)^2} < 0.01$$

Solving:
$$(n+1)^2 > 100$$
$$n + 1 > 10$$
$$n > 9$$

So we need at least $n = 10$ terms. Using $S_{10}$ will give an error less than $\frac{1}{121} \approx 0.00826 < 0.01$.

### Example 3: Precision Requirement

For the series $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n!}$, how many terms are needed for an error less than $0.001$?

**Solution**: We need:
$$\frac{1}{(n+1)!} < 0.001$$

Testing values:
- $\frac{1}{5!} = \frac{1}{120} \approx 0.0083 > 0.001$
- $\frac{1}{6!} = \frac{1}{720} \approx 0.00139 > 0.001$
- $\frac{1}{7!} = \frac{1}{5040} \approx 0.000198 < 0.001$ ✓

We need $n = 6$ terms.

## Absolute vs. Conditional Convergence

Understanding the relationship between a series and its absolute values leads to important classifications.

### Definitions

For a series $\sum a_n$:

1. The series is **absolutely convergent** if $\sum |a_n|$ converges.

2. The series is **conditionally convergent** if $\sum a_n$ converges but $\sum |a_n|$ diverges.

### Theorem: Absolute Convergence Implies Convergence

If $\sum |a_n|$ converges, then $\sum a_n$ converges.

**Note**: The converse is false, as shown by the alternating harmonic series.

### Example 1: Absolutely Convergent Series

Consider $\sum_{n=1}^{\infty} \frac{(-1)^n}{n^2}$.

**Solution**: Check absolute convergence:
$$\sum_{n=1}^{\infty} \left|\frac{(-1)^n}{n^2}\right| = \sum_{n=1}^{\infty} \frac{1}{n^2}$$

This is a p-series with $p = 2 > 1$, so it converges. Therefore, the original series is **absolutely convergent** (and thus convergent).

### Example 2: Conditionally Convergent Series

Consider the alternating harmonic series $\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}$.

**Solution**: We know this series converges by the Alternating Series Test.

Check absolute convergence:
$$\sum_{n=1}^{\infty} \left|\frac{(-1)^{n+1}}{n}\right| = \sum_{n=1}^{\infty} \frac{1}{n}$$

This is the harmonic series, which diverges.

Therefore, the alternating harmonic series is **conditionally convergent**.

### Example 3: Testing for Absolute Convergence

Determine if $\sum_{n=1}^{\infty} \frac{(-1)^n n}{2^n}$ is absolutely convergent, conditionally convergent, or divergent.

**Solution**: Test for absolute convergence:
$$\sum_{n=1}^{\infty} \left|\frac{(-1)^n n}{2^n}\right| = \sum_{n=1}^{\infty} \frac{n}{2^n}$$

Use the Ratio Test (we'll learn this next):
$$\lim_{n \to \infty} \frac{a_{n+1}}{a_n} = \lim_{n \to \infty} \frac{\frac{n+1}{2^{n+1}}}{\frac{n}{2^n}} = \lim_{n \to \infty} \frac{n+1}{2n} = \frac{1}{2} < 1$$

So $\sum \frac{n}{2^n}$ converges, meaning the original series is **absolutely convergent**.

## Properties of Absolutely Convergent Series

Absolutely convergent series have special properties:

1. **Rearrangement**: The terms can be rearranged in any order without changing the sum
2. **Product**: The product of two absolutely convergent series is absolutely convergent

Conditionally convergent series do NOT have these properties. In fact, the **Riemann Rearrangement Theorem** states that the terms of a conditionally convergent series can be rearranged to converge to any real number, or even diverge!

## Key Takeaways

- The Alternating Series Test provides an easy way to test convergence for alternating series
- The error in approximating an alternating series is bounded by the first omitted term
- Absolutely convergent series are "more convergent" than conditionally convergent series
- The alternating harmonic series is the classic example of conditional convergence
