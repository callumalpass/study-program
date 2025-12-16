# Comparison Tests for Improper Integrals

Not every improper integral can be evaluated explicitly using elementary antiderivatives. Comparison tests allow us to determine convergence or divergence by comparing a difficult integral with a simpler one whose behavior is known. These tests are essential tools in analysis, probability, and applied mathematics.

## Why Comparison Tests?

Many important integrals resist direct evaluation:

$$\int_1^\infty \frac{e^{-x^2}}{x}\,dx, \quad \int_1^\infty \frac{\sin^2 x}{x^2}\,dx, \quad \int_0^1 \frac{\sin x}{\sqrt{x}}\,dx$$

Even when we can't find exact values, we often need to know whether these integrals converge (are finite) or diverge (are infinite). Comparison tests provide this information by relating unknown integrals to known benchmark integrals.

**Philosophy:** If a function is smaller than a convergent function, it converges. If a function is larger than a divergent function, it diverges.

## Direct Comparison Test

**Theorem (Direct Comparison Test):**

Let $f$ and $g$ be continuous functions with $0 \leq f(x) \leq g(x)$ for all $x \geq a$.

1. If $\int_a^\infty g(x)\,dx$ converges, then $\int_a^\infty f(x)\,dx$ converges.
2. If $\int_a^\infty f(x)\,dx$ diverges, then $\int_a^\infty g(x)\,dx$ diverges.

**Intuition:** If the bigger area is finite, the smaller area must be finite. If the smaller area is infinite, the bigger area must be infinite.

**Important:**
- The inequality must hold for all $x \geq a$ (or at least for all sufficiently large $x$)
- Both functions must be non-negative
- The test says nothing if $f$ diverges and $g$ converges

**Example 1: Using direct comparison to show convergence**

Determine whether $\int_1^\infty \frac{1}{x^2 + 1}\,dx$ converges.

**Solution:**

For $x \geq 1$, we have $x^2 + 1 > x^2$, so:
$$\frac{1}{x^2 + 1} < \frac{1}{x^2}$$

We know that $\int_1^\infty \frac{1}{x^2}\,dx$ converges (p-integral with $p = 2 > 1$).

Since $0 \leq \frac{1}{x^2 + 1} \leq \frac{1}{x^2}$ for $x \geq 1$, by the Direct Comparison Test, $\int_1^\infty \frac{1}{x^2 + 1}\,dx$ converges.

**Note:** We actually can evaluate this integral exactly (it equals $\frac{\pi}{2} - \frac{\pi}{4} = \frac{\pi}{4}$), but the comparison test gives the answer without computing the antiderivative.

**Example 2: Using direct comparison to show divergence**

Determine whether $\int_2^\infty \frac{1}{\sqrt{x - 1}}\,dx$ converges.

**Solution:**

For $x \geq 2$, we have $x - 1 < x$, so $\sqrt{x - 1} < \sqrt{x}$, thus:
$$\frac{1}{\sqrt{x - 1}} > \frac{1}{\sqrt{x}}$$

We know that $\int_2^\infty \frac{1}{\sqrt{x}}\,dx$ diverges (p-integral with $p = 1/2 < 1$).

Since $\frac{1}{\sqrt{x}} \leq \frac{1}{\sqrt{x - 1}}$ for $x \geq 2$, and the smaller function diverges, the larger function $\int_2^\infty \frac{1}{\sqrt{x - 1}}\,dx$ must also diverge.

**Example 3: Bounding a trigonometric integral**

Determine whether $\int_1^\infty \frac{\sin^2 x}{x^2}\,dx$ converges.

**Solution:**

Since $0 \leq \sin^2 x \leq 1$ for all $x$:
$$0 \leq \frac{\sin^2 x}{x^2} \leq \frac{1}{x^2}$$

Since $\int_1^\infty \frac{1}{x^2}\,dx$ converges, by Direct Comparison Test, $\int_1^\infty \frac{\sin^2 x}{x^2}\,dx$ converges.

**Note:** This example shows the power of comparison—we can't easily integrate $\frac{\sin^2 x}{x^2}$, but we can determine convergence.

## Limit Comparison Test

Sometimes finding a direct inequality is difficult, but the functions behave similarly for large $x$. The Limit Comparison Test handles this situation.

**Theorem (Limit Comparison Test):**

Let $f$ and $g$ be positive functions for $x \geq a$. If
$$\lim_{x \to \infty} \frac{f(x)}{g(x)} = L$$
where $0 < L < \infty$ (a positive finite number), then $\int_a^\infty f(x)\,dx$ and $\int_a^\infty g(x)\,dx$ either **both converge or both diverge**.

**Intuition:** If two functions have the same "asymptotic behavior" (approach the same rate of decay), they have the same convergence behavior.

**Special cases:**
- If $L = 0$ and $\int_a^\infty g(x)\,dx$ converges, then $\int_a^\infty f(x)\,dx$ converges
- If $L = \infty$ and $\int_a^\infty g(x)\,dx$ diverges, then $\int_a^\infty f(x)\,dx$ diverges

**Example 4: Limit comparison with a rational function**

Determine whether $\int_1^\infty \frac{2x^2 + 3}{x^4 - x + 1}\,dx$ converges.

**Solution:**

For large $x$, the numerator behaves like $2x^2$ and the denominator behaves like $x^4$, so the integrand behaves like:
$$\frac{2x^2}{x^4} = \frac{2}{x^2}$$

Let $f(x) = \frac{2x^2 + 3}{x^4 - x + 1}$ and $g(x) = \frac{2}{x^2}$.

Compute the limit:
$$\lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{\frac{2x^2 + 3}{x^4 - x + 1}}{\frac{2}{x^2}} = \lim_{x \to \infty} \frac{(2x^2 + 3) \cdot x^2}{2(x^4 - x + 1)}$$

$$= \lim_{x \to \infty} \frac{2x^4 + 3x^2}{2x^4 - 2x + 2} = \lim_{x \to \infty} \frac{2 + \frac{3}{x^2}}{2 - \frac{2}{x^3} + \frac{2}{x^4}} = \frac{2}{2} = 1$$

Since the limit is 1 (positive and finite), and $\int_1^\infty \frac{2}{x^2}\,dx$ converges, by Limit Comparison Test, $\int_1^\infty \frac{2x^2 + 3}{x^4 - x + 1}\,dx$ converges.

**Example 5: Exponential decay**

Determine whether $\int_1^\infty \frac{e^{-x}}{x}\,dx$ converges.

**Solution:**

For large $x$, exponential decay dominates polynomial growth. Compare with $g(x) = e^{-x}$.

$$\lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{\frac{e^{-x}}{x}}{e^{-x}} = \lim_{x \to \infty} \frac{1}{x} = 0$$

Since the limit is 0 (not in the interval $(0, \infty)$), we can't directly apply LCT in its standard form. However, the special case applies: since $f(x) \leq g(x)$ eventually and $\int_1^\infty e^{-x}\,dx$ converges, $\int_1^\infty \frac{e^{-x}}{x}\,dx$ converges.

Alternatively, compare with $g(x) = \frac{1}{x^2}$ instead. For large $x$, $e^{-x}$ decays much faster than $\frac{1}{x}$, so $\frac{e^{-x}}{x} < \frac{1}{x^2}$ for sufficiently large $x$, giving convergence by direct comparison.

**Example 6: Algebraic function**

Determine whether $\int_1^\infty \frac{\sqrt{x}}{x^2 + 1}\,dx$ converges.

**Solution:**

For large $x$, $x^2 + 1 \approx x^2$, so:
$$\frac{\sqrt{x}}{x^2 + 1} \approx \frac{\sqrt{x}}{x^2} = \frac{1}{x^{3/2}}$$

Let $g(x) = \frac{1}{x^{3/2}}$.

$$\lim_{x \to \infty} \frac{f(x)}{g(x)} = \lim_{x \to \infty} \frac{\frac{\sqrt{x}}{x^2 + 1}}{\frac{1}{x^{3/2}}} = \lim_{x \to \infty} \frac{x^{3/2} \cdot \sqrt{x}}{x^2 + 1} = \lim_{x \to \infty} \frac{x^2}{x^2 + 1} = 1$$

Since $\int_1^\infty \frac{1}{x^{3/2}}\,dx$ converges (p-integral with $p = 3/2 > 1$), the original integral converges.

## Choosing Comparison Functions

**Strategy for choosing $g(x)$:**

1. **For rational functions:** Keep only the highest powers in numerator and denominator
2. **For exponentials:** Use $e^{-ax}$ or compare with p-integrals (exponentials usually dominate)
3. **For bounded functions:** Factor out the bounded part and analyze what remains
4. **For Type 2 integrals near singularities:** Use p-integrals with appropriate power

**Example 7: Rational function strategy**

For $\int_1^\infty \frac{3x^3 - 2x + 5}{x^5 + 7x^2 - 1}\,dx$:

Keep highest powers: $\frac{3x^3}{x^5} = \frac{3}{x^2}$

Compare with $g(x) = \frac{1}{x^2}$ (converges).

**Example 8: Bounded function strategy**

For $\int_1^\infty \frac{\cos^2 x}{x^3}\,dx$:

Since $0 \leq \cos^2 x \leq 1$, we have $\frac{\cos^2 x}{x^3} \leq \frac{1}{x^3}$.

Since $\int_1^\infty \frac{1}{x^3}\,dx$ converges, so does the original integral.

## Comparison Tests for Type 2 Integrals

The comparison tests also apply to Type 2 improper integrals with discontinuities.

**Example 9: Type 2 comparison**

Determine whether $\int_0^1 \frac{1}{\sqrt{x(1-x)}}\,dx$ converges.

**Solution:**

There are discontinuities at both $x = 0$ and $x = 1$. Split at $x = 1/2$:

$$\int_0^1 \frac{1}{\sqrt{x(1-x)}}\,dx = \int_0^{1/2} \frac{1}{\sqrt{x(1-x)}}\,dx + \int_{1/2}^1 \frac{1}{\sqrt{x(1-x)}}\,dx$$

**For the left integral near $x = 0$:**

On $[0, 1/2]$, we have $1 - x \geq 1/2$, so:
$$\frac{1}{\sqrt{x(1-x)}} \leq \frac{1}{\sqrt{x \cdot (1/2)}} = \frac{\sqrt{2}}{\sqrt{x}}$$

Since $\int_0^{1/2} \frac{1}{\sqrt{x}}\,dx$ converges (p-integral with $p = 1/2 < 1$), the left part converges.

**For the right integral near $x = 1$:**

Substitute $u = 1 - x$, and by symmetry, this also converges.

Therefore, the entire integral converges.

**Example 10: Type 2 divergence**

Determine whether $\int_0^1 \frac{1}{x\sqrt{1-x}}\,dx$ converges.

**Solution:**

Discontinuities at $x = 0$ and $x = 1$. Near $x = 0$:
$$\frac{1}{x\sqrt{1-x}} \geq \frac{1}{x \cdot 1} = \frac{1}{x}$$

Since $\int_0^1 \frac{1}{x}\,dx$ diverges, the original integral diverges by comparison.

## Common Pitfalls

**Pitfall 1: Comparing with the wrong function**

For $\int_1^\infty \frac{1}{x^2 - 1}\,dx$, don't compare with $\frac{1}{x^2}$ on the entire interval—the inequality fails near $x = 1$. Instead, start from $x = 2$ or use $\frac{2}{x^2}$ for all $x \geq 1$.

**Pitfall 2: Forgetting the positivity requirement**

Comparison tests require $f, g \geq 0$. For oscillating functions like $\frac{\sin x}{x^2}$, compare $\frac{|\sin x|}{x^2}$ instead.

**Pitfall 3: Incorrect limit computation**

When using LCT, compute the limit carefully. Factor out dominant terms systematically.

**Pitfall 4: Assuming asymptotic equivalence means equality**

Just because $f(x) \sim g(x)$ as $x \to \infty$ doesn't mean $\int f = \int g$. It means they have the same convergence behavior.

## Summary

- **Direct Comparison Test:** If $0 \leq f \leq g$ and $\int g$ converges, then $\int f$ converges
- **Limit Comparison Test:** If $\lim \frac{f}{g} = L$ with $0 < L < \infty$, then $\int f$ and $\int g$ have the same behavior
- **Choose comparison functions** by identifying dominant terms
- For **rational functions**, keep only highest powers
- For **exponential functions**, exponentials dominate polynomials
- For **bounded functions**, factor out bounds and analyze what remains
- Comparison tests work for both **Type 1 and Type 2** improper integrals
- **p-integrals** are the most common comparison benchmarks

Comparison tests transform difficult convergence questions into manageable comparisons with known benchmark functions, making them indispensable tools for theoretical and applied work with improper integrals.
