# One-Sided Limits

Sometimes a function behaves differently when approached from the left versus the right. One-sided limits capture this asymmetry and are essential for understanding piecewise functions, absolute values, and discontinuities.

## Definition

**Left-hand limit:** The limit of $f(x)$ as $x$ approaches $a$ from values less than $a$:
$$\lim_{x \to a^-} f(x) = L$$

The superscript "$-$" indicates we only consider $x < a$.

**Right-hand limit:** The limit of $f(x)$ as $x$ approaches $a$ from values greater than $a$:
$$\lim_{x \to a^+} f(x) = L$$

The superscript "$+$" indicates we only consider $x > a$.

## Relationship to Two-Sided Limits

**Fundamental theorem:** The two-sided limit exists if and only if both one-sided limits exist and are equal:

$$\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L$$

If the one-sided limits exist but differ, the two-sided limit does not exist.

## Piecewise Functions

One-sided limits are essential for analyzing piecewise-defined functions.

**Example:** Consider
$$f(x) = \begin{cases} x^2 + 1 & \text{if } x < 2 \\ 3x - 1 & \text{if } x \geq 2 \end{cases}$$

To find $\lim_{x \to 2} f(x)$:

**Left-hand limit:** For $x < 2$, use $f(x) = x^2 + 1$:
$$\lim_{x \to 2^-} f(x) = \lim_{x \to 2^-} (x^2 + 1) = 4 + 1 = 5$$

**Right-hand limit:** For $x > 2$, use $f(x) = 3x - 1$:
$$\lim_{x \to 2^+} f(x) = \lim_{x \to 2^+} (3x - 1) = 6 - 1 = 5$$

Since both one-sided limits equal 5, the two-sided limit exists: $\lim_{x \to 2} f(x) = 5$.

**Example with different one-sided limits:**
$$g(x) = \begin{cases} x + 1 & \text{if } x < 0 \\ x^2 & \text{if } x \geq 0 \end{cases}$$

$$\lim_{x \to 0^-} g(x) = 0 + 1 = 1$$
$$\lim_{x \to 0^+} g(x) = 0^2 = 0$$

Since $1 \neq 0$, the two-sided limit $\lim_{x \to 0} g(x)$ **does not exist**.

## Absolute Value Functions

The absolute value function $|x|$ is defined piecewise:
$$|x| = \begin{cases} x & \text{if } x \geq 0 \\ -x & \text{if } x < 0 \end{cases}$$

**Example:** Find $\lim_{x \to 0} \frac{|x|}{x}$

**Left-hand limit:** For $x < 0$, $|x| = -x$:
$$\lim_{x \to 0^-} \frac{|x|}{x} = \lim_{x \to 0^-} \frac{-x}{x} = -1$$

**Right-hand limit:** For $x > 0$, $|x| = x$:
$$\lim_{x \to 0^+} \frac{|x|}{x} = \lim_{x \to 0^+} \frac{x}{x} = 1$$

Since $-1 \neq 1$, the limit **does not exist**.

## Infinite One-Sided Limits

One-sided limits can be infinite, indicating vertical asymptote behavior.

**Example:** $f(x) = \frac{1}{x}$

$$\lim_{x \to 0^+} \frac{1}{x} = +\infty$$

As $x$ approaches 0 from the right, $x$ is small and positive, so $\frac{1}{x}$ is large and positive.

$$\lim_{x \to 0^-} \frac{1}{x} = -\infty$$

As $x$ approaches 0 from the left, $x$ is small and negative, so $\frac{1}{x}$ is large and negative.

The two-sided limit does not exist (the one-sided limits are not equal real numbers).

**Compare with:** $f(x) = \frac{1}{x^2}$

$$\lim_{x \to 0^+} \frac{1}{x^2} = +\infty$$
$$\lim_{x \to 0^-} \frac{1}{x^2} = +\infty$$

Both approach $+\infty$, so we write $\lim_{x \to 0} \frac{1}{x^2} = +\infty$ (though technically the limit "does not exist" as a real number).

## Sign Analysis

To determine whether a one-sided limit is $+\infty$ or $-\infty$, analyze the signs of numerator and denominator near the point.

**Example:** Find the one-sided limits of $f(x) = \frac{x + 1}{x - 2}$ at $x = 2$.

Near $x = 2$:
- Numerator: $x + 1 \approx 3$ (positive)
- Denominator: $x - 2 \approx 0$

**From the left** ($x \to 2^-$): $x - 2 < 0$ (negative)
$$\frac{\text{positive}}{\text{negative small}} = \text{negative large} \implies \lim_{x \to 2^-} f(x) = -\infty$$

**From the right** ($x \to 2^+$): $x - 2 > 0$ (positive)
$$\frac{\text{positive}}{\text{positive small}} = \text{positive large} \implies \lim_{x \to 2^+} f(x) = +\infty$$

## Step Functions

The greatest integer function (floor function) $\lfloor x \rfloor$ returns the largest integer less than or equal to $x$.

At any integer $n$:
$$\lim_{x \to n^-} \lfloor x \rfloor = n - 1$$
$$\lim_{x \to n^+} \lfloor x \rfloor = n$$

The one-sided limits differ by 1 at every integer, creating jump discontinuities.

## When to Check One-Sided Limits

Always check one-sided limits when:
1. The function is defined piecewise
2. There's an absolute value
3. There's a potential vertical asymptote
4. The function involves floor/ceiling operations
5. You suspect the two-sided limit might not exist

## Summary

- One-sided limits describe behavior from a single direction
- The two-sided limit exists iff both one-sided limits exist and are equal
- Piecewise functions require checking which formula applies on each side
- Absolute values often require splitting into cases
- Sign analysis determines whether infinite limits are $+\infty$ or $-\infty$
- When in doubt, check both sides separately
