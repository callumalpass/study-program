## Introduction

Limits are the foundation of calculus. They describe the behavior of functions as inputs approach particular values, enabling us to define continuity, derivatives, and integrals with mathematical precision. This topic develops your intuition for limits and builds the rigorous techniques needed to evaluate them.

**Why This Matters:**
Limits appear everywhere in applied mathematics and science. They model instantaneous rates of change (velocity from position), asymptotic behavior of algorithms, convergence of numerical methods, and physical quantities like instantaneous power or marginal cost. Understanding limits is essential for all subsequent calculus topics.

**Learning Objectives:**
- Evaluate limits using direct substitution, factoring, and algebraic manipulation
- Recognize and evaluate one-sided limits
- Identify and classify discontinuities
- Apply the Squeeze Theorem
- Evaluate limits involving infinity
- Use L'Hôpital's Rule for indeterminate forms
- Understand the formal ε-δ definition of limits

---

## Core Concepts

### Intuitive Definition of a Limit

The **limit** of $f(x)$ as $x$ approaches $a$ is the value that $f(x)$ gets arbitrarily close to as $x$ gets arbitrarily close to $a$ (but not equal to $a$).

$$\lim_{x \to a} f(x) = L$$

This means: as $x$ gets closer and closer to $a$, $f(x)$ gets closer and closer to $L$.

**Key Insight:** The limit describes behavior *near* a point, not necessarily *at* the point. A function need not be defined at $a$ for the limit to exist.

### One-Sided Limits

Sometimes a function approaches different values from the left and right:

- **Left-hand limit:** $\lim_{x \to a^-} f(x)$ (approaching from values less than $a$)
- **Right-hand limit:** $\lim_{x \to a^+} f(x)$ (approaching from values greater than $a$)

The two-sided limit exists if and only if both one-sided limits exist and are equal:
$$\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L$$

### Limit Laws

For functions $f$ and $g$ with existing limits at $a$, and constant $c$:

| Law | Statement |
|-----|-----------|
| **Sum** | $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$ |
| **Difference** | $\lim_{x \to a} [f(x) - g(x)] = \lim_{x \to a} f(x) - \lim_{x \to a} g(x)$ |
| **Constant Multiple** | $\lim_{x \to a} [c \cdot f(x)] = c \cdot \lim_{x \to a} f(x)$ |
| **Product** | $\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$ |
| **Quotient** | $\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)}$ (if denominator limit ≠ 0) |
| **Power** | $\lim_{x \to a} [f(x)]^n = \left[\lim_{x \to a} f(x)\right]^n$ |
| **Root** | $\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{\lim_{x \to a} f(x)}$ (with appropriate domain restrictions) |

### Continuity

A function $f$ is **continuous at $a$** if three conditions hold:
1. $f(a)$ is defined
2. $\lim_{x \to a} f(x)$ exists
3. $\lim_{x \to a} f(x) = f(a)$

In other words: you can evaluate the limit by direct substitution.

**Types of Discontinuities:**
- **Removable:** Limit exists but doesn't equal function value (or function undefined)
- **Jump:** Left and right limits exist but differ
- **Infinite:** Function approaches $\pm\infty$
- **Oscillating:** Function oscillates without settling (e.g., $\sin(1/x)$ near 0)

### The Squeeze Theorem

If $g(x) \leq f(x) \leq h(x)$ for all $x$ near $a$ (except possibly at $a$), and:
$$\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L$$

Then:
$$\lim_{x \to a} f(x) = L$$

**Classic Application:**
$$\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0$$

Since $-x^2 \leq x^2 \sin(1/x) \leq x^2$ and both bounds approach 0.

### Limits at Infinity

These describe behavior as $x$ grows without bound:

$$\lim_{x \to \infty} f(x) = L \quad \text{or} \quad \lim_{x \to -\infty} f(x) = L$$

**Key Techniques for Rational Functions:**
- Divide numerator and denominator by highest power of $x$ in denominator
- Compare degrees: if numerator degree < denominator degree, limit is 0
- If degrees equal, limit is ratio of leading coefficients
- If numerator degree > denominator degree, limit is $\pm\infty$

### Infinite Limits

When a function grows without bound near a point:
$$\lim_{x \to a} f(x) = \infty \quad \text{or} \quad \lim_{x \to a} f(x) = -\infty$$

This indicates a **vertical asymptote** at $x = a$.

### L'Hôpital's Rule

For **indeterminate forms** $\frac{0}{0}$ or $\frac{\infty}{\infty}$:

$$\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}$$

provided the right-hand limit exists (or is $\pm\infty$).

**Indeterminate Forms:**
- Direct: $\frac{0}{0}$, $\frac{\infty}{\infty}$
- Require transformation: $0 \cdot \infty$, $\infty - \infty$, $0^0$, $1^\infty$, $\infty^0$

---

## Common Patterns and Techniques

### Direct Substitution
Always try substituting first. If you get a number, you're done!

$$\lim_{x \to 2} (3x^2 - 2x + 1) = 3(4) - 4 + 1 = 9$$

### Factoring and Cancellation
For $\frac{0}{0}$ forms, factor to cancel common terms:

$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3} (x + 3) = 6$$

### Rationalizing
Multiply by conjugate to eliminate radicals:

$$\lim_{x \to 0} \frac{\sqrt{x+1} - 1}{x} = \lim_{x \to 0} \frac{(\sqrt{x+1} - 1)(\sqrt{x+1} + 1)}{x(\sqrt{x+1} + 1)} = \lim_{x \to 0} \frac{x}{x(\sqrt{x+1} + 1)} = \frac{1}{2}$$

### Special Limits

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$

$$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$$

$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1$$

$$\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1$$

---

## Common Mistakes and Debugging

### Mistake 1: Assuming Limit Equals Function Value
$$\lim_{x \to 2} f(x) \neq f(2) \text{ in general}$$
The limit depends on values *near* 2, not *at* 2.

### Mistake 2: Canceling Before Checking
You can only cancel $(x-a)$ if $x \neq a$. In a limit, this is fine since we never let $x = a$.

### Mistake 3: Misapplying L'Hôpital's Rule
L'Hôpital only applies to indeterminate forms. If you have $\frac{5}{0}$, that's not indeterminate—it's an infinite limit!

### Mistake 4: Ignoring One-Sided Limits
For piecewise functions or functions with asymptotes, always check both sides:
$$\lim_{x \to 0} \frac{1}{x} \text{ does not exist (left gives } -\infty \text{, right gives } +\infty \text{)}$$

---

## Best Practices

1. **Try direct substitution first** — if it works, you're done
2. **Identify the indeterminate form** before choosing a technique
3. **Factor systematically** — use difference of squares, sum/difference of cubes
4. **Rationalize when you see radicals** in $\frac{0}{0}$ forms
5. **For limits at infinity**, divide by highest power in denominator
6. **Check one-sided limits** for piecewise functions and quotients
7. **Verify L'Hôpital conditions** before applying

---

## The Formal ε-δ Definition

For completeness, here is the rigorous definition:

$$\lim_{x \to a} f(x) = L$$

means: for every $\varepsilon > 0$, there exists a $\delta > 0$ such that:
$$0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon$$

This formalizes "arbitrarily close": no matter how small a tolerance $\varepsilon$ you demand for the output, I can find a neighborhood $\delta$ around the input that achieves it.

---

## Summary

- **Limits** describe function behavior near a point, not at it
- **Continuity** means the limit equals the function value
- **Limit laws** allow us to break complex limits into simpler pieces
- **One-sided limits** must agree for the two-sided limit to exist
- **Squeeze Theorem** handles oscillating functions
- **L'Hôpital's Rule** resolves $\frac{0}{0}$ and $\frac{\infty}{\infty}$ forms
- **Limits at infinity** describe end behavior and horizontal asymptotes

---

## Further Exploration

- **Sequences and Series:** Limits of sequences lead to convergence tests
- **Continuity on Intervals:** Intermediate Value Theorem and its applications
- **Uniform Continuity:** A stronger form important in analysis
- **Metric Spaces:** Generalization of limits to abstract spaces
