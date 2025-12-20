# Topic 6: Sequences and Series

## Overview

This topic explores the fundamental concepts of sequences and infinite series, which form the foundation for understanding convergence, power series, and Taylor series in calculus. We'll learn how to determine whether an infinite process produces a finite result and develop techniques for analyzing the behavior of sequences and series.

## What You'll Learn

In this topic, you will:

- Understand sequences as functions on the positive integers and determine their limits
- Explore key properties of sequences including boundedness and monotonicity
- Define infinite series through partial sums and understand convergence criteria
- Master various convergence tests for different types of series
- Work with geometric series, p-series, and alternating series
- Distinguish between absolute and conditional convergence
- Apply error estimation techniques for alternating series

## Why This Matters

Sequences and series are essential throughout mathematics, science, and engineering:

- **Numerical Methods**: Series provide approximations for computing values of functions, integrals, and solutions to differential equations
- **Physics**: Infinite series appear in quantum mechanics, wave equations, and gravitational calculations
- **Computer Science**: Understanding convergence is crucial for algorithm analysis and numerical stability
- **Finance**: Present value calculations and compound interest involve geometric series
- **Engineering**: Fourier series (built on these concepts) are fundamental in signal processing

The techniques you learn here will be used extensively in the study of power series, Taylor series, and Fourier series.

## Prerequisites

Before starting this topic, you should be comfortable with:

- Limits of functions as $x \to \infty$
- L'Hôpital's Rule
- Improper integrals
- Basic inequality manipulation
- Natural logarithm and exponential functions

## Key Concepts

### Sequences

A **sequence** is an ordered list of numbers $\{a_n\}$ where each term is determined by the index $n$. Understanding when and how sequences converge to a limit is the first step toward understanding series.

**Important Properties**:
- Convergence and divergence
- Boundedness (upper and lower bounds)
- Monotonicity (increasing or decreasing)
- The Monotone Convergence Theorem
- The Squeeze Theorem for sequences

### Infinite Series

An **infinite series** $\sum_{n=1}^{\infty} a_n$ is the sum of infinitely many terms. We define convergence through the limit of partial sums:
$$S_n = a_1 + a_2 + \cdots + a_n$$

The series converges if $\lim_{n \to \infty} S_n$ exists and is finite.

### Convergence Tests

Different types of series require different techniques to determine convergence:

1. **Divergence Test**: If $\lim_{n \to \infty} a_n \neq 0$, the series diverges
2. **Geometric Series**: $\sum ar^n$ converges if $|r| < 1$
3. **p-Series Test**: $\sum \frac{1}{n^p}$ converges if $p > 1$
4. **Integral Test**: Compares series to improper integrals
5. **Comparison Tests**: Direct and Limit Comparison with known series
6. **Alternating Series Test**: For series with alternating signs
7. **Ratio Test**: Examines ratios of consecutive terms (great for factorials)
8. **Root Test**: Examines $n$-th roots (great for $n$-th powers)

### Special Series

- **Harmonic Series**: $\sum \frac{1}{n}$ diverges despite $\frac{1}{n} \to 0$
- **Alternating Harmonic Series**: $\sum \frac{(-1)^{n+1}}{n}$ converges to $\ln 2$
- **Basel Problem**: $\sum \frac{1}{n^2} = \frac{\pi^2}{6}$

### Absolute vs. Conditional Convergence

- **Absolute Convergence**: $\sum |a_n|$ converges (implies $\sum a_n$ converges)
- **Conditional Convergence**: $\sum a_n$ converges but $\sum |a_n|$ diverges

Absolutely convergent series can be rearranged freely, while conditionally convergent series cannot.

## Study Tips

1. **Always start with the Divergence Test**: It's quick and can immediately eliminate many series.

2. **Recognize patterns**: Learn to identify geometric series, p-series, and their variations.

3. **Choose the right test**:
   - Factorials or products? Try the Ratio Test
   - $n$-th powers? Try the Root Test
   - Rational functions? Try comparison tests or Integral Test
   - Alternating signs? Try the Alternating Series Test

4. **Practice simplification**: Many series problems require algebraic manipulation before applying tests.

5. **Understand, don't memorize**: Focus on why each test works, not just the mechanics.

6. **Build intuition**: Ask yourself "Is this series bigger or smaller than something I know?"

## Common Pitfalls

- Forgetting that $\lim_{n \to \infty} a_n = 0$ does NOT imply convergence (harmonic series!)
- Confusing the sequence $\{a_n\}$ with the series $\sum a_n$
- Applying tests incorrectly (e.g., forgetting to check that functions are decreasing for the Integral Test)
- When the Ratio or Root Test gives $L = 1$, the test is inconclusive—not "the series diverges"
- Forgetting to test for absolute convergence first when dealing with alternating series

## Connection to Other Topics

Sequences and series connect to many other areas of mathematics:

- **Power Series** (next topic): Series of the form $\sum a_n x^n$
- **Taylor Series**: Representing functions as infinite polynomials
- **Fourier Series**: Representing periodic functions as sums of sines and cosines
- **Differential Equations**: Series solutions to ODEs
- **Probability**: Generating functions and expected values
- **Complex Analysis**: Laurent series and residue theory

## Practice Strategy

1. **Master the basics**: Ensure you can quickly evaluate geometric series and identify p-series
2. **Work through examples**: Practice applying each test multiple times
3. **Mixed practice**: Work on problem sets that require choosing the appropriate test
4. **Error estimation**: Practice using the Alternating Series Remainder Theorem
5. **Proof practice**: Understanding proofs deepens your intuition

## Real-World Applications

- **Approximating π**: $\frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots$ (Leibniz formula)
- **Computing $e$**: $e = \sum_{n=0}^{\infty} \frac{1}{n!} = 1 + 1 + \frac{1}{2} + \frac{1}{6} + \cdots$
- **Loan calculations**: Geometric series for mortgage payments
- **Signal processing**: Fourier series decompose signals into frequency components
- **Quantum mechanics**: Wave functions are often expressed as infinite series

## Historical Note

The rigorous treatment of infinite series was developed in the 17th and 18th centuries, with major contributions from mathematicians like Newton, Leibniz, Euler, and the Bernoullis. However, it wasn't until the 19th century that mathematicians like Cauchy, Weierstrass, and Riemann established the formal foundations we use today. The harmonic series was known to diverge since medieval times, but many subtle issues about convergence weren't fully resolved until the 1800s.

## Getting Started

Begin with **01-sequences-definition.md** to learn the fundamentals of sequences and limits. Then progress through the subtopics in order, as each builds on the previous concepts. Pay special attention to the examples and work through them yourself before reading the solutions.
