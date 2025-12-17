---
title: "Types of Discontinuities"
slug: "discontinuities"
description: "Classification and properties of discontinuities"
---

# Types of Discontinuities

## Introduction

While much of real analysis focuses on continuous functions and their remarkable properties, understanding discontinuities is equally important. Discontinuities occur when functions fail to be continuous at certain points, and the way they fail provides insight into the structure of functions and the nature of continuity itself. Not all discontinuities are created equal: some are minor defects that can be "fixed" by redefining the function at a single point, while others represent fundamental breaks in the function's behavior. The classification of discontinuities helps us understand which functions can be approximated by continuous functions, which can be integrated, and which exhibit pathological behavior. This taxonomy is essential for advanced topics in analysis, including measure theory, Fourier series, and the study of functions of bounded variation.

## Definition of Discontinuity

**Definition 7.1:** Let $f: D \to \mathbb{R}$ where $D \subseteq \mathbb{R}$, and let $c \in D$. We say $f$ is **discontinuous at $c$** if $f$ is not continuous at $c$.

Recall that $f$ is continuous at $c$ if:
$$
\lim_{x \to c} f(x) = f(c)
$$

So $f$ is discontinuous at $c$ if any of the following fail:
1. $f(c)$ is not defined
2. $\lim_{x \to c} f(x)$ does not exist
3. $\lim_{x \to c} f(x) \neq f(c)$

## Classification of Discontinuities

We classify discontinuities based on the behavior of one-sided limits.

### Removable Discontinuity

**Definition 7.2 (Removable Discontinuity):** A function $f$ has a **removable discontinuity** at $c$ if:
$$
\lim_{x \to c} f(x) \text{ exists but } \lim_{x \to c} f(x) \neq f(c)
$$

This includes the case where $f(c)$ is undefined.

The name "removable" reflects that we can make $f$ continuous at $c$ by redefining (or defining) $f(c) = \lim_{x \to c} f(x)$.

**Example 7.1:** Consider:
$$
f(x) = \frac{x^2 - 1}{x - 1}
$$

At $x = 1$, the function is undefined (discontinuous). However:
$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} \frac{(x-1)(x+1)}{x-1} = \lim_{x \to 1} (x + 1) = 2
$$

We can remove the discontinuity by defining $f(1) = 2$.

**Example 7.2:** Consider:
$$
f(x) = \begin{cases}
\frac{\sin x}{x} & x \neq 0 \\
0 & x = 0
\end{cases}
$$

Since $\lim_{x \to 0} \frac{\sin x}{x} = 1 \neq 0 = f(0)$, this has a removable discontinuity at $x = 0$.

Redefining $f(0) = 1$ makes $f$ continuous everywhere.

**Example 7.3:** Consider:
$$
f(x) = \begin{cases}
x^2 & x \neq 2 \\
5 & x = 2
\end{cases}
$$

Since $\lim_{x \to 2} x^2 = 4 \neq 5 = f(2)$, this has a removable discontinuity at $x = 2$.

### Jump Discontinuity

**Definition 7.3 (Jump Discontinuity):** A function $f$ has a **jump discontinuity** at $c$ if both one-sided limits exist but are unequal:
$$
\lim_{x \to c^-} f(x) \text{ and } \lim_{x \to c^+} f(x) \text{ both exist, but } \lim_{x \to c^-} f(x) \neq \lim_{x \to c^+} f(x)
$$

The **jump** at $c$ is defined as:
$$
J = \lim_{x \to c^+} f(x) - \lim_{x \to c^-} f(x)
$$

Jump discontinuities cannot be removed by redefining $f$ at a single point.

**Example 7.4:** The Heaviside function (unit step function):
$$
H(x) = \begin{cases}
0 & x < 0 \\
1 & x \geq 0
\end{cases}
$$

At $x = 0$:
- $\lim_{x \to 0^-} H(x) = 0$
- $\lim_{x \to 0^+} H(x) = 1$

Since these are unequal, $H$ has a jump discontinuity at $x = 0$ with jump $J = 1 - 0 = 1$.

**Example 7.5:** The greatest integer function (floor function):
$$
f(x) = \lfloor x \rfloor
$$

At any integer $n$:
- $\lim_{x \to n^-} \lfloor x \rfloor = n - 1$
- $\lim_{x \to n^+} \lfloor x \rfloor = n$

So $\lfloor x \rfloor$ has a jump discontinuity of magnitude $1$ at every integer.

**Example 7.6:** The sign function:
$$
\text{sgn}(x) = \begin{cases}
-1 & x < 0 \\
0 & x = 0 \\
1 & x > 0
\end{cases}
$$

At $x = 0$:
- $\lim_{x \to 0^-} \text{sgn}(x) = -1$
- $\lim_{x \to 0^+} \text{sgn}(x) = 1$

Jump discontinuity with jump $J = 1 - (-1) = 2$.

### Infinite Discontinuity

**Definition 7.4 (Infinite Discontinuity):** A function $f$ has an **infinite discontinuity** at $c$ if at least one of the one-sided limits is infinite:
$$
\lim_{x \to c^-} f(x) = \pm\infty \quad \text{or} \quad \lim_{x \to c^+} f(x) = \pm\infty
$$

**Example 7.7:** Consider $f(x) = \frac{1}{x}$ at $x = 0$.

- $\lim_{x \to 0^-} \frac{1}{x} = -\infty$
- $\lim_{x \to 0^+} \frac{1}{x} = +\infty$

This is an infinite discontinuity.

**Example 7.8:** Consider $f(x) = \frac{1}{(x-1)^2}$ at $x = 1$.

- $\lim_{x \to 1^-} \frac{1}{(x-1)^2} = +\infty$
- $\lim_{x \to 1^+} \frac{1}{(x-1)^2} = +\infty$

Both one-sided limits are $+\infty$, so this is an infinite discontinuity.

**Example 7.9:** Consider $f(x) = \ln|x|$ at $x = 0$.

$$
\lim_{x \to 0^{\pm}} \ln|x| = -\infty
$$

This is an infinite discontinuity.

### Essential Discontinuity

**Definition 7.5 (Essential Discontinuity):** A function $f$ has an **essential discontinuity** (or **oscillating discontinuity**) at $c$ if the limit $\lim_{x \to c} f(x)$ does not exist in any sense (finite or infinite).

This typically occurs when the function oscillates too wildly near $c$.

**Example 7.10:** Consider $f(x) = \sin\left(\frac{1}{x}\right)$ at $x = 0$.

As $x \to 0$, the argument $\frac{1}{x} \to \pm\infty$, and $\sin\left(\frac{1}{x}\right)$ oscillates infinitely often between $-1$ and $1$.

Neither $\lim_{x \to 0^-} f(x)$ nor $\lim_{x \to 0^+} f(x)$ exists (even as $\pm\infty$).

Therefore, $f$ has an essential discontinuity at $x = 0$.

**Example 7.11:** The Dirichlet function:
$$
f(x) = \begin{cases}
1 & x \in \mathbb{Q} \\
0 & x \in \mathbb{R} \setminus \mathbb{Q}
\end{cases}
$$

At any point $c \in \mathbb{R}$, the limit $\lim_{x \to c} f(x)$ does not exist because:
- In any interval around $c$, there are both rationals (where $f = 1$) and irrationals (where $f = 0$)
- Any sequence of rationals approaching $c$ has $f(x_n) = 1 \to 1$
- Any sequence of irrationals approaching $c$ has $f(x_n) = 0 \to 0$

Therefore $f$ has an essential discontinuity at every point.

**Example 7.12:** Consider:
$$
f(x) = \begin{cases}
\sin\left(\frac{1}{x}\right) & x \neq 0 \\
0 & x = 0
\end{cases}
$$

This has an essential discontinuity at $x = 0$ (as in Example 7.10).

However, the modified function:
$$
g(x) = \begin{cases}
x\sin\left(\frac{1}{x}\right) & x \neq 0 \\
0 & x = 0
\end{cases}
$$

is actually continuous at $x = 0$ because:
$$
\lim_{x \to 0} x\sin\left(\frac{1}{x}\right) = 0
$$
(using $|\sin(1/x)| \leq 1$, so $|x\sin(1/x)| \leq |x| \to 0$).

## Summary Table

| Type | One-sided limits | Removable? | Example |
|------|------------------|------------|---------|
| **Removable** | Both exist and equal | Yes | $\frac{\sin x}{x}$ at $x=0$ |
| **Jump** | Both exist but unequal | No | $\lfloor x \rfloor$ at integers |
| **Infinite** | At least one is $\pm\infty$ | No | $\frac{1}{x}$ at $x=0$ |
| **Essential** | At least one doesn't exist | No | $\sin(1/x)$ at $x=0$ |

## Properties of Discontinuous Functions

### Monotone Functions

**Theorem 7.1:** If $f: (a, b) \to \mathbb{R}$ is monotone (increasing or decreasing), then:
1. All discontinuities of $f$ are jump discontinuities
2. The set of discontinuities is at most countable

**Proof sketch:**

For (1): If $f$ is increasing and $c \in (a, b)$, then:
- $\lim_{x \to c^-} f(x) = \sup\{f(x) : x < c\}$ exists (bounded above by $f(c)$)
- $\lim_{x \to c^+} f(x) = \inf\{f(x) : x > c\}$ exists (bounded below by $f(c)$)
- We have $\lim_{x \to c^-} f(x) \leq f(c) \leq \lim_{x \to c^+} f(x)$

If $f$ is discontinuous at $c$, then $\lim_{x \to c^-} f(x) < \lim_{x \to c^+} f(x)$, a jump discontinuity.

For (2): Each jump discontinuity has a positive jump. Assign to each discontinuity point a rational number in the jump interval. Since jumps are disjoint and $\mathbb{Q}$ is countable, there are at most countably many discontinuities.

**Example 7.13:** The function:
$$
f(x) = \sum_{n=1}^{\infty} \frac{1}{2^n} H(x - n)
$$
where $H$ is the Heaviside function, is increasing and has jump discontinuities at $x = 1, 2, 3, \ldots$ (countably many).

### Continuity of Characteristic Functions

**Example 7.14:** The characteristic function of a set $A \subseteq \mathbb{R}$ is:
$$
\chi_A(x) = \begin{cases}
1 & x \in A \\
0 & x \notin A
\end{cases}
$$

The function $\chi_A$ is continuous at $c$ if and only if $c$ is not a boundary point of $A$.

For example, $\chi_{[0,1]}$ is continuous on $\mathbb{R} \setminus \{0, 1\}$ and has jump discontinuities at $x = 0$ and $x = 1$.

### Functions Continuous at Exactly One Point

**Example 7.15:** The function:
$$
f(x) = \begin{cases}
x & x \in \mathbb{Q} \\
0 & x \in \mathbb{R} \setminus \mathbb{Q}
\end{cases}
$$

is continuous only at $x = 0$.

**Proof:**

At $x = 0$: Let $(x_n)$ be any sequence with $x_n \to 0$. If $x_n \in \mathbb{Q}$, then $f(x_n) = x_n \to 0 = f(0)$. If $x_n \notin \mathbb{Q}$, then $f(x_n) = 0 \to 0 = f(0)$. In both cases, $f(x_n) \to f(0)$, so $f$ is continuous at $0$.

At $x = c \neq 0$: Choose a sequence of rationals $(r_n) \to c$ and a sequence of irrationals $(s_n) \to c$. Then $f(r_n) = r_n \to c$ but $f(s_n) = 0 \to 0 \neq c$. The limits differ, so $f$ is discontinuous at $c$.

## Worked Examples

**Example 7.16:** Classify the discontinuities of:
$$
f(x) = \frac{x^2 - 4}{x - 2}
$$

**Solution:** The function is undefined at $x = 2$. For $x \neq 2$:
$$
f(x) = \frac{(x-2)(x+2)}{x-2} = x + 2
$$

Therefore:
$$
\lim_{x \to 2} f(x) = \lim_{x \to 2} (x + 2) = 4
$$

Since the limit exists but $f(2)$ is undefined, this is a **removable discontinuity**.

**Example 7.17:** Classify the discontinuities of:
$$
f(x) = \frac{|x|}{x}
$$

**Solution:** For $x > 0$: $f(x) = \frac{x}{x} = 1$

For $x < 0$: $f(x) = \frac{-x}{x} = -1$

At $x = 0$, the function is undefined.

One-sided limits:
- $\lim_{x \to 0^+} f(x) = 1$
- $\lim_{x \to 0^-} f(x) = -1$

Since both limits exist but are unequal, this is a **jump discontinuity** with jump $J = 1 - (-1) = 2$.

**Example 7.18:** Classify the discontinuities of:
$$
f(x) = \frac{1}{x^2 - 1}
$$

**Solution:** The function is undefined at $x = \pm 1$.

At $x = 1$:
- $\lim_{x \to 1^+} \frac{1}{x^2-1} = \lim_{x \to 1^+} \frac{1}{(x-1)(x+1)} = +\infty$
- $\lim_{x \to 1^-} \frac{1}{x^2-1} = -\infty$

**Infinite discontinuity** at $x = 1$.

At $x = -1$:
- $\lim_{x \to -1^+} \frac{1}{x^2-1} = -\infty$
- $\lim_{x \to -1^-} \frac{1}{x^2-1} = +\infty$

**Infinite discontinuity** at $x = -1$.

**Example 7.19:** Classify the discontinuities of:
$$
f(x) = \cos\left(\frac{1}{x}\right)
$$

**Solution:** The function is undefined at $x = 0$.

As $x \to 0$, we have $\frac{1}{x} \to \pm\infty$, so $\cos\left(\frac{1}{x}\right)$ oscillates between $-1$ and $1$ infinitely often.

Neither one-sided limit exists, so this is an **essential discontinuity** at $x = 0$.

**Example 7.20:** Determine all points of discontinuity for:
$$
f(x) = \begin{cases}
x + 1 & x < 0 \\
x^2 & 0 \leq x < 2 \\
4 & x = 2 \\
2x - 2 & x > 2
\end{cases}
$$

**Solution:** Check potential discontinuity points $x = 0$ and $x = 2$.

At $x = 0$:
- $\lim_{x \to 0^-} f(x) = \lim_{x \to 0^-} (x + 1) = 1$
- $\lim_{x \to 0^+} f(x) = \lim_{x \to 0^+} x^2 = 0$
- $f(0) = 0$

Since $\lim_{x \to 0^-} f(x) \neq \lim_{x \to 0^+} f(x)$, there is a **jump discontinuity** at $x = 0$.

At $x = 2$:
- $\lim_{x \to 2^-} f(x) = \lim_{x \to 2^-} x^2 = 4$
- $\lim_{x \to 2^+} f(x) = \lim_{x \to 2^+} (2x - 2) = 2$
- $f(2) = 4$

Since $\lim_{x \to 2^-} f(x) \neq \lim_{x \to 2^+} f(x)$, there is a **jump discontinuity** at $x = 2$.

## Important Observations

1. **Hierarchy of discontinuities:** Removable < Jump < Infinite < Essential, in terms of "severity."

2. **Monotone functions are nice:** They can only have jump discontinuities, and these are at most countable.

3. **Pathological functions exist:** Functions like the Dirichlet function are discontinuous everywhere, showing that discontinuity can be far worse than isolated points.

4. **Measure theory:** In measure theory, we learn that functions can be "almost everywhere continuous" even if discontinuous on a dense set.

5. **Riemann integrability:** Functions with finitely many jump discontinuities are Riemann integrable. Functions with too many discontinuities may not be.

## Connections to Other Topics

- **Limits:** The classification of discontinuities is entirely based on the behavior of limits (one-sided and two-sided).

- **Monotone Functions:** These have special properties regarding discontinuities, connecting to the theory of functions of bounded variation.

- **Integration:** The Riemann integral can handle functions with "small" sets of discontinuities. The Lebesgue integral extends this to larger classes.

- **Fourier Analysis:** Understanding discontinuities is crucial for Fourier series, which can converge differently at discontinuities (Gibbs phenomenon).

- **Measure Theory:** Sets of discontinuities can be analyzed using measure theory, leading to concepts like "almost everywhere continuity."

- **Topology:** In general topology, different types of discontinuities generalize to various notions of non-continuity in topological spaces.

## Summary

Discontinuities are classified based on the existence and values of one-sided limits. Removable discontinuities can be "fixed" by redefining the function at a single point. Jump discontinuities represent finite jumps between one-sided limits and cannot be removed. Infinite discontinuities occur when limits are infinite, and essential discontinuities involve wild oscillation where limits fail to exist entirely. Monotone functions can only have jump discontinuities, and these are at most countable—a significant restriction. Understanding the taxonomy of discontinuities is essential for integration theory, Fourier analysis, and recognizing when functions can be approximated by continuous functions. The study of discontinuities reveals the richness and complexity of real-valued functions beyond the well-behaved continuous ones.
