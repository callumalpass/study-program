---
id: math203-t7-summary
title: "Curve Sketching: Complete Framework"
order: 7
---

# Curve Sketching: Complete Framework

This section synthesizes all curve sketching techniques into a unified framework. We present the complete procedure, work through comprehensive examples, and provide reference tables for quick application.

## The Complete Curve Sketching Checklist

Follow these steps systematically for any function $f(x)$:

### Step 1: Domain
Find all $x$-values where $f(x)$ is defined.
- Exclude division by zero
- Exclude negative square roots (for real functions)
- Exclude negative logarithm arguments

### Step 2: Intercepts
- **x-intercepts:** Solve $f(x) = 0$
- **y-intercept:** Calculate $f(0)$ if $0$ is in the domain

### Step 3: Symmetry
- **Even function:** $f(-x) = f(x)$ → symmetric about y-axis
- **Odd function:** $f(-x) = -f(x)$ → symmetric about origin
- **Periodic:** $f(x + T) = f(x)$ for some period $T$

### Step 4: Asymptotes
- **Vertical:** Where $\lim_{x \to a} f(x) = \pm\infty$
- **Horizontal:** $\lim_{x \to \pm\infty} f(x) = L$
- **Oblique:** $\lim_{x \to \pm\infty} [f(x) - (mx + b)] = 0$

### Step 5: First Derivative Analysis
- Find $f'(x)$
- Find critical points (where $f' = 0$ or undefined)
- Create sign chart for $f'$
- Identify intervals of increase ($f' > 0$) and decrease ($f' < 0$)
- Identify local maxima and minima

### Step 6: Second Derivative Analysis
- Find $f''(x)$
- Find inflection point candidates (where $f'' = 0$ or undefined)
- Create sign chart for $f''$
- Identify concave up ($f'' > 0$) and concave down ($f'' < 0$) regions
- Verify inflection points (sign change in $f''$)

### Step 7: Plot Key Points
- x- and y-intercepts
- Local maxima and minima
- Inflection points
- Additional points if needed for accuracy

### Step 8: Sketch the Curve
Connect the points respecting:
- Increasing/decreasing behavior
- Concavity
- Asymptotic behavior
- Any symmetry

## Quick Reference Tables

### First Derivative Interpretation

| $f'(x)$ | Behavior of $f$ |
|---------|-----------------|
| $f'(x) > 0$ | Increasing |
| $f'(x) < 0$ | Decreasing |
| $f'(x) = 0$ (changes + to -) | Local maximum |
| $f'(x) = 0$ (changes - to +) | Local minimum |
| $f'(x) = 0$ (no sign change) | Neither max nor min |

### Second Derivative Interpretation

| $f''(x)$ | Behavior of $f$ |
|----------|-----------------|
| $f''(x) > 0$ | Concave up (cup-shaped) |
| $f''(x) < 0$ | Concave down (cap-shaped) |
| $f''(x) = 0$ (sign changes) | Inflection point |

### Second Derivative Test for Extrema

At critical point $c$ where $f'(c) = 0$:

| $f''(c)$ | Conclusion |
|----------|------------|
| $f''(c) > 0$ | Local minimum |
| $f''(c) < 0$ | Local maximum |
| $f''(c) = 0$ | Test inconclusive |

## Comprehensive Example 1: Rational Function

**Sketch $f(x) = \frac{x^2 - 4}{x^2 - 1}$**

**Step 1: Domain**
$x^2 - 1 \neq 0 \Rightarrow x \neq \pm 1$
Domain: $(-\infty, -1) \cup (-1, 1) \cup (1, \infty)$

**Step 2: Intercepts**
- x-intercepts: $x^2 - 4 = 0 \Rightarrow x = \pm 2$
- y-intercept: $f(0) = \frac{-4}{-1} = 4$

**Step 3: Symmetry**
$f(-x) = \frac{(-x)^2 - 4}{(-x)^2 - 1} = \frac{x^2 - 4}{x^2 - 1} = f(x)$
Even function—symmetric about y-axis.

**Step 4: Asymptotes**
- Vertical: $x = 1$ and $x = -1$

At $x = 1$: $\lim_{x \to 1^+} f(x) = \frac{-3}{0^+} = -\infty$ and $\lim_{x \to 1^-} f(x) = \frac{-3}{0^-} = +\infty$

- Horizontal: $\lim_{x \to \pm\infty} \frac{x^2 - 4}{x^2 - 1} = \lim_{x \to \pm\infty} \frac{1 - 4/x^2}{1 - 1/x^2} = 1$

Horizontal asymptote: $y = 1$

**Step 5: First Derivative**
Using quotient rule:
$$f'(x) = \frac{2x(x^2-1) - (x^2-4)(2x)}{(x^2-1)^2} = \frac{2x(x^2-1-x^2+4)}{(x^2-1)^2} = \frac{6x}{(x^2-1)^2}$$

Critical point: $x = 0$

Sign chart for $f'$:
- $x < -1$: $f' < 0$ (decreasing)
- $-1 < x < 0$: $f' < 0$ (decreasing)
- $0 < x < 1$: $f' > 0$ (increasing)
- $x > 1$: $f' > 0$ (increasing)

Local minimum at $x = 0$: $f(0) = 4$

**Step 6: Second Derivative**
$$f''(x) = \frac{6(x^2-1)^2 - 6x \cdot 2(x^2-1)(2x)}{(x^2-1)^4} = \frac{6(x^2-1) - 24x^2}{(x^2-1)^3} = \frac{-18x^2 - 6}{(x^2-1)^3}$$

Numerator: $-18x^2 - 6 < 0$ always

Sign of $f''$ depends on $(x^2-1)^3$:
- $|x| < 1$: $(x^2-1)^3 < 0$, so $f'' > 0$ (concave up)
- $|x| > 1$: $(x^2-1)^3 > 0$, so $f'' < 0$ (concave down)

No inflection points (asymptotes interrupt).

**Step 7-8: Sketch**
- Symmetric about y-axis
- Local min at $(0, 4)$
- x-intercepts at $(\pm 2, 0)$
- Vertical asymptotes at $x = \pm 1$
- Horizontal asymptote at $y = 1$
- Concave up between asymptotes, concave down outside

## Comprehensive Example 2: Function with e^x

**Sketch $f(x) = xe^{-x}$**

**Step 1: Domain**
All real numbers.

**Step 2: Intercepts**
- x-intercept: $xe^{-x} = 0 \Rightarrow x = 0$
- y-intercept: $f(0) = 0$

**Step 3: Symmetry**
$f(-x) = -xe^x \neq f(x)$ or $-f(x)$
Neither even nor odd.

**Step 4: Asymptotes**
- No vertical asymptotes
- $\lim_{x \to \infty} xe^{-x} = \lim_{x \to \infty} \frac{x}{e^x} = 0$ (L'Hôpital)
- $\lim_{x \to -\infty} xe^{-x} = -\infty$

Horizontal asymptote: $y = 0$ (as $x \to +\infty$)

**Step 5: First Derivative**
$$f'(x) = e^{-x} + x(-e^{-x}) = e^{-x}(1-x)$$

Critical point: $1 - x = 0 \Rightarrow x = 1$

Sign chart:
- $x < 1$: $f' > 0$ (increasing)
- $x > 1$: $f' < 0$ (decreasing)

Local maximum at $x = 1$: $f(1) = e^{-1} \approx 0.368$

**Step 6: Second Derivative**
$$f''(x) = -e^{-x}(1-x) + e^{-x}(-1) = e^{-x}(x-2)$$

$f'' = 0$ when $x = 2$

Sign chart:
- $x < 2$: $f'' < 0$ (concave down)
- $x > 2$: $f'' > 0$ (concave up)

Inflection point at $x = 2$: $f(2) = 2e^{-2} \approx 0.271$

**Step 7-8: Sketch**
- Passes through origin
- Rises to local max at $(1, 1/e)$
- Falls toward $y = 0$ as $x \to \infty$
- Concave down until $x = 2$, then concave up
- Goes to $-\infty$ as $x \to -\infty$

## Common Function Shapes Reference

| Function Type | Key Features |
|---------------|--------------|
| $x^n$ (n even) | U-shaped, symmetric about y-axis |
| $x^n$ (n odd) | S-shaped, symmetric about origin |
| $e^x$ | Always increasing, always concave up |
| $e^{-x}$ | Always decreasing, always concave up |
| $\ln x$ | Always increasing, always concave down |
| $\frac{1}{x}$ | Hyperbola, asymptotes at axes |
| $\sin x$, $\cos x$ | Periodic, bounded between -1 and 1 |

## Troubleshooting Tips

**If your sketch looks wrong:**
1. Verify critical points are in the domain
2. Check sign analysis at test points
3. Confirm asymptote calculations
4. Make sure concavity matches your curve

**If derivatives are complicated:**
1. Factor before differentiating if possible
2. Use logarithmic differentiation for products
3. Simplify $f'$ before finding $f''$

## Summary

The complete curve sketching process combines:
1. Domain analysis
2. Intercept finding
3. Symmetry detection
4. Asymptote determination
5. First derivative analysis (increasing/decreasing, extrema)
6. Second derivative analysis (concavity, inflection points)
7. Plotting key points
8. Connecting with appropriate shape

Each step provides information that constrains the final sketch. By systematically completing all steps, you can accurately sketch virtually any function you'll encounter in calculus.

Practice builds intuition: experienced sketchers can often predict the shape from the function form, then verify with calculus.
