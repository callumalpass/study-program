# Ratio Test, Root Test, and Absolute Convergence

## The Ratio Test

The **Ratio Test** is particularly useful for series involving factorials, exponentials, or products. It examines the ratio of consecutive terms.

### Theorem: The Ratio Test

Given a series $\sum a_n$ with positive terms, let:
$$L = \lim_{n \to \infty} \frac{a_{n+1}}{a_n}$$

Then:
1. If $L < 1$, the series **converges absolutely**
2. If $L > 1$ (or $L = \infty$), the series **diverges**
3. If $L = 1$, the test is **inconclusive**

### Why It Works

The Ratio Test essentially compares the series to a geometric series. If $\frac{a_{n+1}}{a_n} \approx r < 1$ for large $n$, the series behaves like a convergent geometric series with ratio $r$.

### Example 1: Series with Factorial

Test $\sum_{n=1}^{\infty} \frac{n!}{n^n}$ for convergence.

**Solution**: Apply the Ratio Test with $a_n = \frac{n!}{n^n}$:

$$\frac{a_{n+1}}{a_n} = \frac{\frac{(n+1)!}{(n+1)^{n+1}}}{\frac{n!}{n^n}} = \frac{(n+1)! \cdot n^n}{n! \cdot (n+1)^{n+1}}$$

$$= \frac{(n+1) \cdot n! \cdot n^n}{n! \cdot (n+1)^{n+1}} = \frac{n^n}{(n+1)^n} = \left(\frac{n}{n+1}\right)^n = \left(\frac{1}{1 + \frac{1}{n}}\right)^n$$

Taking the limit:
$$L = \lim_{n \to \infty} \left(\frac{1}{1 + \frac{1}{n}}\right)^n = \lim_{n \to \infty} \frac{1}{\left(1 + \frac{1}{n}\right)^n} = \frac{1}{e} \approx 0.368 < 1$$

Since $L < 1$, the series converges.

### Example 2: Exponential Series

Determine if $\sum_{n=1}^{\infty} \frac{2^n}{n!}$ converges.

**Solution**: Let $a_n = \frac{2^n}{n!}$:

$$\frac{a_{n+1}}{a_n} = \frac{\frac{2^{n+1}}{(n+1)!}}{\frac{2^n}{n!}} = \frac{2^{n+1} \cdot n!}{2^n \cdot (n+1)!} = \frac{2}{n+1}$$

Taking the limit:
$$L = \lim_{n \to \infty} \frac{2}{n+1} = 0 < 1$$

Since $L < 1$, the series converges.

### Example 3: Power Series

Test $\sum_{n=1}^{\infty} \frac{n^2 \cdot 3^n}{2^n}$ for convergence.

**Solution**: Let $a_n = \frac{n^2 \cdot 3^n}{2^n}$:

$$\frac{a_{n+1}}{a_n} = \frac{(n+1)^2 \cdot 3^{n+1} / 2^{n+1}}{n^2 \cdot 3^n / 2^n} = \frac{(n+1)^2 \cdot 3}{n^2 \cdot 2} = \frac{3}{2} \cdot \frac{(n+1)^2}{n^2}$$

$$= \frac{3}{2} \cdot \left(1 + \frac{1}{n}\right)^2$$

Taking the limit:
$$L = \lim_{n \to \infty} \frac{3}{2} \cdot \left(1 + \frac{1}{n}\right)^2 = \frac{3}{2} > 1$$

Since $L > 1$, the series diverges.

### Example 4: When the Ratio Test Fails

Apply the Ratio Test to $\sum_{n=1}^{\infty} \frac{1}{n^2}$.

**Solution**: Let $a_n = \frac{1}{n^2}$:

$$\frac{a_{n+1}}{a_n} = \frac{\frac{1}{(n+1)^2}}{\frac{1}{n^2}} = \frac{n^2}{(n+1)^2} = \left(\frac{n}{n+1}\right)^2 = \left(\frac{1}{1 + \frac{1}{n}}\right)^2$$

Taking the limit:
$$L = \lim_{n \to \infty} \left(\frac{1}{1 + \frac{1}{n}}\right)^2 = 1$$

The Ratio Test is **inconclusive**. We must use another test. (We know from the p-series test that this series converges.)

### Example 5: Alternating Series with Ratio Test

Test $\sum_{n=1}^{\infty} \frac{(-1)^n n^3}{3^n}$ for absolute convergence.

**Solution**: Test for absolute convergence using $|a_n| = \frac{n^3}{3^n}$:

$$\frac{a_{n+1}}{a_n} = \frac{(n+1)^3 / 3^{n+1}}{n^3 / 3^n} = \frac{(n+1)^3}{3n^3} = \frac{1}{3} \cdot \left(\frac{n+1}{n}\right)^3 = \frac{1}{3} \cdot \left(1 + \frac{1}{n}\right)^3$$

$$L = \lim_{n \to \infty} \frac{1}{3} \cdot \left(1 + \frac{1}{n}\right)^3 = \frac{1}{3} < 1$$

Since $L < 1$, the series $\sum |a_n|$ converges, so the original series is **absolutely convergent**.

## The Root Test

The **Root Test** (also called the **$n$-th Root Test**) is useful for series where each term is raised to the $n$-th power.

### Theorem: The Root Test

Given a series $\sum a_n$ with non-negative terms, let:
$$L = \lim_{n \to \infty} \sqrt[n]{a_n}$$

Then:
1. If $L < 1$, the series **converges absolutely**
2. If $L > 1$ (or $L = \infty$), the series **diverges**
3. If $L = 1$, the test is **inconclusive**

### Example 1: Powers of $n$

Test $\sum_{n=1}^{\infty} \left(\frac{2n + 3}{5n + 1}\right)^n$ for convergence.

**Solution**: Let $a_n = \left(\frac{2n + 3}{5n + 1}\right)^n$:

$$\sqrt[n]{a_n} = \frac{2n + 3}{5n + 1}$$

Taking the limit:
$$L = \lim_{n \to \infty} \frac{2n + 3}{5n + 1} = \lim_{n \to \infty} \frac{2 + \frac{3}{n}}{5 + \frac{1}{n}} = \frac{2}{5} < 1$$

Since $L < 1$, the series converges.

### Example 2: Exponential in Exponent

Determine if $\sum_{n=1}^{\infty} \frac{1}{(\ln n)^n}$ converges (for $n \geq 2$).

**Solution**: Let $a_n = \frac{1}{(\ln n)^n}$:

$$\sqrt[n]{a_n} = \sqrt[n]{\frac{1}{(\ln n)^n}} = \frac{1}{\ln n}$$

Taking the limit:
$$L = \lim_{n \to \infty} \frac{1}{\ln n} = 0 < 1$$

Since $L < 1$, the series converges.

### Example 3: More Complex Expression

Test $\sum_{n=1}^{\infty} \left(\frac{n^2}{2^n}\right)^n$ for convergence.

**Solution**: Let $a_n = \left(\frac{n^2}{2^n}\right)^n$:

$$\sqrt[n]{a_n} = \frac{n^2}{2^n}$$

This limit is tricky. For large $n$, the exponential $2^n$ dominates $n^2$:
$$L = \lim_{n \to \infty} \frac{n^2}{2^n} = 0 < 1$$

(This can be proven using L'Hôpital's Rule twice on $f(x) = \frac{x^2}{2^x}$.)

Since $L < 1$, the series converges.

### Example 4: When Root Test is Inconclusive

Apply the Root Test to $\sum_{n=1}^{\infty} \frac{1}{n}$.

**Solution**: Let $a_n = \frac{1}{n}$:

$$\sqrt[n]{a_n} = \sqrt[n]{\frac{1}{n}} = \frac{1}{n^{1/n}}$$

We need $\lim_{n \to \infty} n^{1/n}$. Taking logarithms:
$$\ln(n^{1/n}) = \frac{\ln n}{n} \to 0$$

Therefore, $n^{1/n} \to e^0 = 1$, so:
$$L = \lim_{n \to \infty} \frac{1}{n^{1/n}} = 1$$

The Root Test is inconclusive. (We know the harmonic series diverges.)

## Comparison: Ratio Test vs. Root Test

### When to Use Each Test

**Use the Ratio Test when**:
- The series involves factorials
- The series involves products
- The form suggests comparing consecutive terms

**Use the Root Test when**:
- Each term is raised to the $n$-th power
- The series has the form $a_n = (f(n))^n$
- Taking $n$-th roots simplifies the expression

### Important Fact

If the Ratio Test gives $L \neq 1$, and the Root Test limit exists, then the Root Test gives the same $L$. However, the Root Test can sometimes work when the Ratio Test fails.

### Example: Both Tests Apply

For $\sum_{n=1}^{\infty} \frac{2^n}{n!}$, we already used the Ratio Test. Let's try the Root Test:

$$\sqrt[n]{a_n} = \sqrt[n]{\frac{2^n}{n!}} = \frac{2}{\sqrt[n]{n!}}$$

The limit $\lim_{n \to \infty} \sqrt[n]{n!}$ is more difficult to evaluate directly (it equals $\infty$), but using Stirling's approximation:
$$\sqrt[n]{n!} \approx \frac{n}{e}$$

So:
$$L = \lim_{n \to \infty} \frac{2}{\sqrt[n]{n!}} = \lim_{n \to \infty} \frac{2e}{n} = 0 < 1$$

Both tests conclude the series converges, but the Ratio Test was easier in this case.

## Absolute vs. Conditional Convergence Revisited

Both the Ratio Test and Root Test test for **absolute convergence**. When applied to a series with both positive and negative terms, we apply the test to $|a_n|$.

### Testing Strategy for General Series

For a series $\sum a_n$ with mixed signs:

1. **First**, apply the Divergence Test: If $\lim_{n \to \infty} a_n \neq 0$, the series diverges.

2. **Second**, test for absolute convergence using the Ratio or Root Test on $\sum |a_n|$:
   - If $\sum |a_n|$ converges, then $\sum a_n$ converges absolutely.

3. **If absolute convergence fails**, and the series is alternating, try the Alternating Series Test for conditional convergence.

### Example: Complete Analysis

Analyze $\sum_{n=1}^{\infty} \frac{(-1)^n n}{2^n}$ completely.

**Solution**:

*Step 1: Divergence Test*
$$\lim_{n \to \infty} \frac{(-1)^n n}{2^n}$$

This limit doesn't exist in the usual sense, but $|a_n| = \frac{n}{2^n} \to 0$, so we can't conclude divergence yet.

*Step 2: Test for Absolute Convergence*

Consider $\sum |a_n| = \sum \frac{n}{2^n}$. Apply the Ratio Test:
$$\frac{a_{n+1}}{a_n} = \frac{(n+1)/2^{n+1}}{n/2^n} = \frac{n+1}{2n} = \frac{1}{2} \cdot \frac{n+1}{n}$$

$$L = \lim_{n \to \infty} \frac{1}{2} \cdot \frac{n+1}{n} = \frac{1}{2} < 1$$

The series of absolute values converges, so the original series is **absolutely convergent**.

## Summary of Convergence Tests

Here's a quick reference for choosing the right test:

| Test | Best Used For | Conclusion |
|------|---------------|------------|
| Divergence Test | All series (first check) | Can only prove divergence |
| Geometric Series | $ar^n$ form | Converges if $\|r\| < 1$ |
| p-Series | $\frac{1}{n^p}$ form | Converges if $p > 1$ |
| Integral Test | Continuous, decreasing $f(n)$ | Same as $\int f(x)\,dx$ |
| Direct Comparison | Can bound by known series | Inequality determines result |
| Limit Comparison | Similar behavior to known series | Same convergence as comparison |
| Alternating Series | Alternating signs | Converges if decreasing to 0 |
| Ratio Test | Factorials, exponentials | Converges if $L < 1$ |
| Root Test | $n$-th powers | Converges if $L < 1$ |

## Key Takeaways

- The Ratio Test is ideal for series with factorials or exponential growth
- The Root Test works well when terms are raised to the $n$-th power
- Both tests determine absolute convergence when they apply
- When $L = 1$, both tests are inconclusive—use a different test
- Absolute convergence is stronger than conditional convergence
- A systematic approach: try Divergence Test first, then choose the most appropriate convergence test
