## Introduction

Curve sketching brings together all the tools of differential calculus to create accurate graphs of functions. By systematically analyzing derivatives, we can determine a function's shape without plotting individual points.

**Why This Matters:**
Visualizing functions is essential for understanding their behavior. In applied contexts, sketching helps engineers see where a system is stable, where costs might explode, or where performance peaks. This skill also builds intuition for function behavior that's valuable in analysis and applications.

**Learning Objectives:**
- Analyze functions using a systematic checklist
- Find and interpret intercepts, asymptotes, and symmetry
- Determine intervals of increase/decrease using the first derivative
- Find local extrema using derivative tests
- Determine concavity and inflection points using the second derivative
- Synthesize information into accurate sketches

---

## Core Concepts

### The Curve Sketching Checklist

For a complete analysis of $y = f(x)$, examine:

1. **Domain:** Where is $f$ defined?
2. **Intercepts:** Where does the graph cross the axes?
3. **Symmetry:** Is $f$ even, odd, or periodic?
4. **Asymptotes:** Horizontal, vertical, and oblique (slant)
5. **First derivative analysis:** Increase/decrease, local extrema
6. **Second derivative analysis:** Concavity, inflection points
7. **Key points:** Plot critical points, inflection points, intercepts
8. **Sketch:** Connect the dots respecting all the analysis

### Domain

The domain is all $x$ values where $f(x)$ is defined.

**Watch for:**
- Division by zero: denominators can't be zero
- Even roots of negatives: $\sqrt{x}$ requires $x \geq 0$
- Logarithms of non-positives: $\ln x$ requires $x > 0$

**Example:** For $f(x) = \frac{1}{x-2}$, domain is $(-\infty, 2) \cup (2, \infty)$

### Intercepts

**$y$-intercept:** Set $x = 0$, compute $f(0)$ (if in domain)

**$x$-intercepts (zeros):** Solve $f(x) = 0$

**Example:** For $f(x) = x^2 - 4$:
- $y$-intercept: $f(0) = -4$, so $(0, -4)$
- $x$-intercepts: $x^2 - 4 = 0 \Rightarrow x = \pm 2$, so $(-2, 0)$ and $(2, 0)$

### Symmetry

**Even function:** $f(-x) = f(x)$ — symmetric about $y$-axis
- Example: $f(x) = x^2$, $\cos x$

**Odd function:** $f(-x) = -f(x)$ — symmetric about origin
- Example: $f(x) = x^3$, $\sin x$

**Periodic:** $f(x + T) = f(x)$ for some period $T$
- Example: $\sin x$, $\cos x$ with period $2\pi$

### Asymptotes

**Vertical asymptotes:** Where $f(x) \to \pm\infty$
- Usually where denominator $\to 0$ and numerator $\not\to 0$
- Check: $\lim_{x \to a^{\pm}} f(x) = \pm\infty$

**Horizontal asymptotes:** Behavior as $x \to \pm\infty$
- $\lim_{x \to \infty} f(x) = L$ means $y = L$ is a horizontal asymptote
- Check both $+\infty$ and $-\infty$ (they may differ)

**Oblique (slant) asymptotes:** When $f(x) \approx mx + b$ for large $|x|$
- Occur when degree of numerator = degree of denominator + 1
- Find by polynomial long division

**Example:** For $f(x) = \frac{x^2}{x-1}$:
- Vertical asymptote at $x = 1$
- Long division: $\frac{x^2}{x-1} = x + 1 + \frac{1}{x-1}$
- Oblique asymptote: $y = x + 1$

### First Derivative Analysis

**Find critical points:** Where $f'(x) = 0$ or $f'(x)$ undefined

**Sign chart for $f'$:**
1. Mark critical points and domain breaks on a number line
2. Test sign of $f'$ in each interval
3. Conclude:
   - $f' > 0$: $f$ increasing
   - $f' < 0$: $f$ decreasing

**Classify critical points:**
- Sign change $+$ to $-$: local maximum
- Sign change $-$ to $+$: local minimum
- No sign change: neither (inflection in slope)

### Second Derivative Analysis

**Find possible inflection points:** Where $f''(x) = 0$ or $f''(x)$ undefined

**Sign chart for $f''$:**
1. Mark where $f'' = 0$ or undefined
2. Test sign of $f''$ in each interval
3. Conclude:
   - $f'' > 0$: concave up (smile)
   - $f'' < 0$: concave down (frown)

**Inflection points:** Where concavity actually changes (sign of $f''$ changes)

---

## Complete Example

Sketch $f(x) = \frac{x^2 - 1}{x^2 + 1}$

**Domain:** All real numbers (denominator never zero)

**Intercepts:**
- $y$-intercept: $f(0) = \frac{-1}{1} = -1$
- $x$-intercepts: $x^2 - 1 = 0 \Rightarrow x = \pm 1$

**Symmetry:** $f(-x) = \frac{(-x)^2 - 1}{(-x)^2 + 1} = \frac{x^2 - 1}{x^2 + 1} = f(x)$ — even function

**Asymptotes:**
- No vertical asymptotes
- $\lim_{x \to \pm\infty} \frac{x^2 - 1}{x^2 + 1} = \lim_{x \to \pm\infty} \frac{1 - 1/x^2}{1 + 1/x^2} = 1$
- Horizontal asymptote: $y = 1$

**First derivative:**
$$f'(x) = \frac{2x(x^2+1) - (x^2-1)(2x)}{(x^2+1)^2} = \frac{2x(x^2+1-x^2+1)}{(x^2+1)^2} = \frac{4x}{(x^2+1)^2}$$

- Critical point: $x = 0$
- $f'(x) < 0$ for $x < 0$ (decreasing)
- $f'(x) > 0$ for $x > 0$ (increasing)
- Local minimum at $x = 0$: $f(0) = -1$

**Second derivative:**
$$f''(x) = \frac{4(x^2+1)^2 - 4x \cdot 2(x^2+1)(2x)}{(x^2+1)^4}$$
$$= \frac{4(x^2+1) - 16x^2}{(x^2+1)^3} = \frac{4 - 12x^2}{(x^2+1)^3}$$

- $f''(x) = 0$ when $4 - 12x^2 = 0 \Rightarrow x = \pm\frac{1}{\sqrt{3}}$
- For $|x| < \frac{1}{\sqrt{3}}$: $f'' > 0$ (concave up)
- For $|x| > \frac{1}{\sqrt{3}}$: $f'' < 0$ (concave down)
- Inflection points at $x = \pm\frac{1}{\sqrt{3}}$

**Summary:**
- Even function (symmetric about $y$-axis)
- Crosses $x$-axis at $\pm 1$
- Local minimum at $(0, -1)$
- Approaches $y = 1$ as $x \to \pm\infty$
- Concave up near origin, concave down far from origin
- Inflection points at $x \approx \pm 0.577$

---

## Sketching Rational Functions

For $f(x) = \frac{P(x)}{Q(x)}$:

1. **Factor** numerator and denominator
2. **Find zeros** (numerator = 0, denominator ≠ 0)
3. **Find vertical asymptotes** (denominator = 0, numerator ≠ 0)
4. **Find holes** (both = 0 at same point, after canceling)
5. **Compare degrees** for horizontal/oblique asymptotes
6. **Analyze derivatives** for shape details

### Asymptote Rules for $\frac{P(x)}{Q(x)}$

Let $n = \deg(P)$ and $m = \deg(Q)$:

| Relationship | End Behavior |
|-------------|--------------|
| $n < m$ | Horizontal asymptote $y = 0$ |
| $n = m$ | Horizontal asymptote $y = \frac{\text{leading coef of } P}{\text{leading coef of } Q}$ |
| $n = m + 1$ | Oblique asymptote (use division) |
| $n > m + 1$ | No horizontal or oblique asymptote |

---

## Sketching Other Functions

### Polynomial Functions
- Domain: all reals
- No asymptotes
- End behavior determined by leading term
- Smooth, continuous curves

### Exponential Functions
- Domain: all reals
- Range: $(0, \infty)$ for $f(x) = e^x$
- Horizontal asymptote: $y = 0$ (for $e^x$ as $x \to -\infty$)
- Always increasing (for $a > 1$)

### Logarithmic Functions
- Domain: $(0, \infty)$
- Range: all reals
- Vertical asymptote: $x = 0$
- Always increasing

### Trigonometric Functions
- Periodic
- Bounded (for $\sin$, $\cos$)
- Asymptotes for $\tan$, $\cot$, $\sec$, $\csc$

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Check Both Infinities
$\lim_{x \to \infty} f(x)$ and $\lim_{x \to -\infty} f(x)$ may differ.

### Mistake 2: Missing Vertical Asymptotes
Check all points where the denominator is zero.

### Mistake 3: Calling Every $f'' = 0$ Point an Inflection
You need a sign change in $f''$ for an actual inflection point.

### Mistake 4: Incorrect End Behavior
For large $|x|$, the highest-degree terms dominate.

### Mistake 5: Not Plotting Enough Key Points
Include: intercepts, critical points, inflection points, asymptote approaches.

---

## Best Practices

1. **Follow the checklist systematically** — don't skip steps
2. **Make a sign chart** for both $f'$ and $f''$
3. **Label asymptotes** on your graph
4. **Plot calculated points** before connecting
5. **Respect concavity** — curves should bend correctly
6. **Check special points** — the curve should pass through intercepts
7. **Verify end behavior** — curve should approach asymptotes

---

## Summary

- **Domain:** Where is the function defined?
- **Intercepts:** Where does it cross the axes?
- **Symmetry:** Even, odd, or periodic?
- **Asymptotes:** Vertical (denominator zeros), horizontal (limits at infinity), oblique (division)
- **First derivative:** Increasing/decreasing, local extrema
- **Second derivative:** Concavity, inflection points
- **Synthesis:** Combine all information for accurate sketch

---

## Further Exploration

- **Parametric Curves:** Sketching when $x$ and $y$ are functions of $t$
- **Polar Curves:** Sketching $r = f(\theta)$
- **Implicit Curves:** When $y$ is defined implicitly
- **Computer Graphing:** Using technology to verify and explore
