# Comparison Tests for Series

## Introduction

The **comparison tests** are powerful tools for determining convergence by comparing a series of interest to a series whose convergence is already known. The basic idea is: if a series is smaller than a convergent series, it must converge; if a series is larger than a divergent series, it must diverge.

## The Direct Comparison Test

The **Direct Comparison Test** (or simply **Comparison Test**) formalizes the intuitive idea of comparing series term-by-term.

### Theorem: Direct Comparison Test

Suppose $0 \leq a_n \leq b_n$ for all $n \geq N$ (for some positive integer $N$).

1. If $\sum b_n$ **converges**, then $\sum a_n$ **converges**.
2. If $\sum a_n$ **diverges**, then $\sum b_n$ **diverges**.

### Key Strategy

To use this test:
1. Identify whether you want to prove convergence or divergence
2. Find an appropriate comparison series (usually a p-series or geometric series)
3. Establish the inequality $a_n \leq b_n$ (for convergence) or $a_n \geq b_n$ (for divergence)

### Example 1: Proving Convergence

Determine if $\sum_{n=1}^{\infty} \frac{1}{n^2 + 1}$ converges.

**Solution**: We want to compare with a known convergent series. Note that:
$$n^2 + 1 > n^2 \quad \text{for all } n$$

Therefore:
$$\frac{1}{n^2 + 1} < \frac{1}{n^2} \quad \text{for all } n \geq 1$$

Since $\sum \frac{1}{n^2}$ is a p-series with $p = 2 > 1$, it converges.

By the Direct Comparison Test, $\sum \frac{1}{n^2 + 1}$ also converges.

### Example 2: Proving Divergence

Does $\sum_{n=1}^{\infty} \frac{n}{n^2 + 1}$ converge?

**Solution**: For large $n$, the series behaves roughly like $\frac{n}{n^2} = \frac{1}{n}$. We'll compare with the harmonic series.

For $n \geq 1$:
$$n^2 + 1 \leq n^2 + n^2 = 2n^2$$

Therefore:
$$\frac{n}{n^2 + 1} \geq \frac{n}{2n^2} = \frac{1}{2n}$$

Since $\sum \frac{1}{n}$ diverges and $\sum \frac{1}{2n} = \frac{1}{2}\sum \frac{1}{n}$ also diverges, we have:
$$\sum_{n=1}^{\infty} \frac{n}{n^2 + 1} \text{ diverges by the Direct Comparison Test.}$$

### Example 3: Exponential Comparison

Test $\sum_{n=1}^{\infty} \frac{2^n}{3^n + 1}$ for convergence.

**Solution**: Note that:
$$3^n + 1 > 3^n \quad \text{for all } n$$

Therefore:
$$\frac{2^n}{3^n + 1} < \frac{2^n}{3^n} = \left(\frac{2}{3}\right)^n$$

The series $\sum \left(\frac{2}{3}\right)^n$ is geometric with $r = \frac{2}{3} < 1$, so it converges.

By the Direct Comparison Test, $\sum \frac{2^n}{3^n + 1}$ converges.

### Example 4: Square Root Series

Determine if $\sum_{n=1}^{\infty} \frac{1}{\sqrt{n^3 + n}}$ converges.

**Solution**: For $n \geq 1$:
$$n^3 + n \leq n^3 + n^3 = 2n^3$$

Therefore:
$$\sqrt{n^3 + n} \leq \sqrt{2n^3} = \sqrt{2} \cdot n^{3/2}$$

This gives:
$$\frac{1}{\sqrt{n^3 + n}} \geq \frac{1}{\sqrt{2} \cdot n^{3/2}} = \frac{1}{\sqrt{2}} \cdot \frac{1}{n^{3/2}}$$

Wait—this shows our series is **larger** than a convergent series, which doesn't help. Let's reverse the inequality:

$$n^3 + n \geq n^3$$

Therefore:
$$\frac{1}{\sqrt{n^3 + n}} \leq \frac{1}{\sqrt{n^3}} = \frac{1}{n^{3/2}}$$

Since $\sum \frac{1}{n^{3/2}}$ is a p-series with $p = \frac{3}{2} > 1$, it converges.

By the Direct Comparison Test, $\sum \frac{1}{\sqrt{n^3 + n}}$ converges.

## The Limit Comparison Test

Sometimes it's difficult to establish the inequalities needed for the Direct Comparison Test. The **Limit Comparison Test** provides an alternative that often works when the series behave similarly for large $n$.

### Theorem: Limit Comparison Test

Suppose $a_n > 0$ and $b_n > 0$ for all $n$. If:
$$\lim_{n \to \infty} \frac{a_n}{b_n} = L$$

where $0 < L < \infty$ (i.e., $L$ is a positive finite number), then:
$$\sum a_n \text{ and } \sum b_n \text{ either both converge or both diverge.}$$

### Special Cases

- If $L = 0$ and $\sum b_n$ converges, then $\sum a_n$ converges
- If $L = \infty$ and $\sum b_n$ diverges, then $\sum a_n$ diverges

### Example 1: Basic Application

Determine if $\sum_{n=1}^{\infty} \frac{3n^2 + 2n + 1}{5n^4 + n^2 + 7}$ converges.

**Solution**: For large $n$, the dominant terms are $\frac{3n^2}{5n^4} = \frac{3}{5n^2}$.

Let's compare with $b_n = \frac{1}{n^2}$:
$$\lim_{n \to \infty} \frac{a_n}{b_n} = \lim_{n \to \infty} \frac{\frac{3n^2 + 2n + 1}{5n^4 + n^2 + 7}}{\frac{1}{n^2}}$$

$$= \lim_{n \to \infty} \frac{n^2(3n^2 + 2n + 1)}{5n^4 + n^2 + 7}$$

$$= \lim_{n \to \infty} \frac{3n^4 + 2n^3 + n^2}{5n^4 + n^2 + 7}$$

Divide numerator and denominator by $n^4$:
$$= \lim_{n \to \infty} \frac{3 + \frac{2}{n} + \frac{1}{n^2}}{5 + \frac{1}{n^2} + \frac{7}{n^4}} = \frac{3}{5}$$

Since $L = \frac{3}{5}$ is positive and finite, and $\sum \frac{1}{n^2}$ converges (p-series, $p=2>1$), we conclude that the original series converges.

### Example 2: Divergent Comparison

Does $\sum_{n=1}^{\infty} \frac{\sqrt{n} + 3}{n + 5}$ converge?

**Solution**: For large $n$, this behaves like $\frac{\sqrt{n}}{n} = \frac{1}{\sqrt{n}}$.

Compare with $b_n = \frac{1}{\sqrt{n}}$:
$$\lim_{n \to \infty} \frac{\frac{\sqrt{n} + 3}{n + 5}}{\frac{1}{\sqrt{n}}} = \lim_{n \to \infty} \frac{(\sqrt{n} + 3)\sqrt{n}}{n + 5}$$

$$= \lim_{n \to \infty} \frac{n + 3\sqrt{n}}{n + 5} = \lim_{n \to \infty} \frac{1 + \frac{3}{\sqrt{n}}}{1 + \frac{5}{n}} = 1$$

Since $L = 1$ is positive and finite, and $\sum \frac{1}{\sqrt{n}} = \sum \frac{1}{n^{1/2}}$ diverges (p-series, $p = \frac{1}{2} < 1$), the original series diverges.

### Example 3: With Factorials

Test $\sum_{n=1}^{\infty} \frac{n!}{(n+2)!}$ for convergence.

**Solution**: Simplify first:
$$\frac{n!}{(n+2)!} = \frac{n!}{(n+2)(n+1)n!} = \frac{1}{(n+2)(n+1)}$$

For large $n$, this behaves like $\frac{1}{n^2}$. Compare with $b_n = \frac{1}{n^2}$:
$$\lim_{n \to \infty} \frac{\frac{1}{(n+2)(n+1)}}{\frac{1}{n^2}} = \lim_{n \to \infty} \frac{n^2}{(n+2)(n+1)}$$

$$= \lim_{n \to \infty} \frac{n^2}{n^2 + 3n + 2} = \lim_{n \to \infty} \frac{1}{1 + \frac{3}{n} + \frac{2}{n^2}} = 1$$

Since $L = 1$ and $\sum \frac{1}{n^2}$ converges, the original series converges.

### Example 4: Exponential and Polynomial

Determine if $\sum_{n=1}^{\infty} \frac{n^3}{e^n}$ converges.

**Solution**: For large $n$, exponentials dominate polynomials, so this should converge. However, finding a direct comparison is tricky.

Let's use the ratio test instead—but if we wanted to use comparison, we could compare with $b_n = \frac{1}{2^n}$ (or any geometric series with $r < 1$).

Actually, let's try: For sufficiently large $n$ (say $n \geq 10$), we have $e^n > 2n^3$, so:
$$\frac{n^3}{e^n} < \frac{n^3}{2n^3} = \frac{1}{2}$$

But this doesn't give us a series. Better approach: note that for $n$ large enough, $e^n > n^4$, so:
$$\frac{n^3}{e^n} < \frac{n^3}{n^4} = \frac{1}{n}$$

But this diverges. We need a sharper bound. The Limit Comparison Test with a geometric series is awkward here, so the Ratio Test (covered later) is better for this problem.

### Example 5: Trigonometric Series

Does $\sum_{n=1}^{\infty} \frac{\sin^2 n}{n^2}$ converge?

**Solution**: Since $0 \leq \sin^2 n \leq 1$:
$$0 \leq \frac{\sin^2 n}{n^2} \leq \frac{1}{n^2}$$

The series $\sum \frac{1}{n^2}$ converges (p-series with $p=2>1$).

By the Direct Comparison Test, $\sum \frac{\sin^2 n}{n^2}$ converges.

## Choosing Between Comparison Tests

**Use Direct Comparison when**:
- You can easily establish the inequality $a_n \leq b_n$ or $a_n \geq b_n$
- The series involves trigonometric bounds (like $|\sin n| \leq 1$)
- One series clearly dominates the other

**Use Limit Comparison when**:
- The series have similar behavior but establishing an inequality is difficult
- Both series are rational functions
- You want to compare series that differ only by lower-order terms

## Common Comparison Series

Keep these series in mind for comparisons:

1. **p-Series**: $\sum \frac{1}{n^p}$ (converges if $p > 1$, diverges if $p \leq 1$)

2. **Geometric Series**: $\sum r^n$ (converges if $|r| < 1$, diverges if $|r| \geq 1$)

3. **Modified p-Series**: $\sum \frac{1}{n(\ln n)^p}$ (converges if $p > 1$, diverges if $p \leq 1$)

## Key Takeaways

- The Direct Comparison Test requires establishing inequalities between terms
- The Limit Comparison Test only requires computing a limit of ratios
- Both tests require choosing an appropriate comparison series
- When in doubt, identify the dominant behavior for large $n$ to select a comparison series
- p-series and geometric series are the most common choices for comparison
