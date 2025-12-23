---
id: math203-t1-intro
title: "Introduction to Limits"
order: 1
---

# Introduction to Limits

Limits are the cornerstone of calculus. They provide the mathematical foundation for understanding change, motion, and continuity. Before calculus, mathematicians struggled to rigorously define concepts like instantaneous velocity or the slope of a curve at a single point. Limits solve this problem by describing what happens to a function's output as its input approaches a particular value.

## What is a Limit?

The **limit** of a function $f(x)$ as $x$ approaches $a$ is the value that $f(x)$ gets arbitrarily close to as $x$ gets arbitrarily close to $a$. We write this as:

$$\lim_{x \to a} f(x) = L$$

This notation reads as "the limit of $f(x)$ as $x$ approaches $a$ equals $L$."

**Key insight:** The limit describes behavior *near* a point, not necessarily *at* the point. The function doesn't need to be defined at $a$ for the limit to exist, and even if $f(a)$ exists, it might differ from the limit.

## Historical Context

The concept of limits emerged from centuries of mathematical struggle. Ancient Greek mathematicians like Archimedes used "method of exhaustion" to calculate areas, essentially computing limits without the formal notation. However, the foundations remained shaky until the 19th century.

Isaac Newton and Gottfried Leibniz independently invented calculus in the late 1600s, but both relied on vague notions of "infinitesimals"—quantities smaller than any positive number yet not zero. Critics like Bishop Berkeley attacked these foundations as logically unsound, famously calling infinitesimals "ghosts of departed quantities."

It took nearly two centuries for mathematicians to resolve these issues. Augustin-Louis Cauchy in the 1820s and Karl Weierstrass in the 1870s developed the rigorous $\varepsilon$-$\delta$ definition of limits that we use today. This precise formulation finally placed calculus on solid logical ground.

## Why Limits Matter

Consider trying to find the velocity of a falling object at exactly $t = 2$ seconds. If position is given by $s(t) = 16t^2$ feet, we can calculate average velocity over an interval:

$$\text{Average velocity} = \frac{s(2 + h) - s(2)}{h}$$

For $h = 1$: $\frac{s(3) - s(2)}{1} = \frac{144 - 64}{1} = 80$ ft/s

For $h = 0.1$: $\frac{s(2.1) - s(2)}{0.1} = \frac{70.56 - 64}{0.1} = 65.6$ ft/s

For $h = 0.01$: $\frac{s(2.01) - s(2)}{0.01} = \frac{64.6416 - 64}{0.01} = 64.16$ ft/s

As $h$ gets smaller, the average velocity approaches 64 ft/s. But we can't set $h = 0$ directly because that would give us $\frac{0}{0}$, which is undefined. The limit lets us express this rigorously:

$$\lim_{h \to 0} \frac{s(2 + h) - s(2)}{h} = 64$$

This is the instantaneous velocity at $t = 2$.

## The Fundamental Role in Calculus

Limits are not just a preliminary topic—they are the conceptual glue holding all of calculus together. Every major concept in calculus is defined using limits:

1. **Derivatives**: The derivative $f'(x)$ is defined as $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
2. **Integrals**: The definite integral is defined as a limit of Riemann sums
3. **Continuity**: A function is continuous at $a$ if $\lim_{x \to a} f(x) = f(a)$
4. **Infinite Series**: The sum of a series is defined as the limit of its partial sums

Without a solid understanding of limits, the rest of calculus remains mysterious. This is why we begin here.

## Limit Notation and Interpretation

When we write $\lim_{x \to a} f(x) = L$, we mean:

- As $x$ gets closer and closer to $a$ (from either side)
- The values $f(x)$ get closer and closer to $L$
- We can make $f(x)$ as close to $L$ as we want by taking $x$ sufficiently close to $a$

**Example:** Consider $f(x) = \frac{x^2 - 1}{x - 1}$.

This function is undefined at $x = 1$ (division by zero), but we can ask what happens as $x$ approaches 1:

| $x$ | $f(x)$ |
|-----|--------|
| 0.9 | 1.9 |
| 0.99 | 1.99 |
| 0.999 | 1.999 |
| 1.001 | 2.001 |
| 1.01 | 2.01 |
| 1.1 | 2.1 |

The values approach 2 from both sides. Indeed, $\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2$.

We can verify this algebraically by factoring:
$$\frac{x^2 - 1}{x - 1} = \frac{(x-1)(x+1)}{x-1} = x + 1 \text{ for } x \neq 1$$

As $x \to 1$, $x + 1 \to 2$.

## Limits That Don't Exist

Not every function has a limit at every point. A limit fails to exist when:

1. **The function approaches different values from left and right** (one-sided limits disagree)
2. **The function grows without bound** (approaches $\pm\infty$)
3. **The function oscillates** without settling on any value

**Example of oscillation:** $\lim_{x \to 0} \sin\left(\frac{1}{x}\right)$

As $x \to 0$, $\frac{1}{x}$ grows without bound, causing $\sin\left(\frac{1}{x}\right)$ to oscillate infinitely between $-1$ and $1$. The limit does not exist.

## Building Intuition

Think of a limit as asking: "If I could walk along the graph of $f$ toward the point $x = a$, what $y$-value would I be approaching?"

- You might reach a well-defined point (limit exists and equals function value)
- You might be heading toward a cliff (limit is $\pm\infty$)
- You might be approaching a hole in the graph (limit exists but function is undefined there)
- You might be approaching a jump (left and right paths lead different places)

Understanding limits sets the stage for everything in calculus: derivatives (limits of difference quotients), integrals (limits of Riemann sums), and infinite series (limits of partial sums).

## Summary

- A limit describes the value a function approaches as its input approaches a given point
- The limit may differ from the function's value at that point (or the function may be undefined there)
- Limits can fail to exist due to disagreeing one-sided limits, unbounded growth, or oscillation
- Limits provide the rigorous foundation for instantaneous rates of change and continuous functions
