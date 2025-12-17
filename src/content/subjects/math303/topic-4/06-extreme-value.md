---
title: "Extreme Value Theorem"
slug: "extreme-value"
description: "Existence of maxima and minima for continuous functions"
---

# Extreme Value Theorem

## Introduction

The Extreme Value Theorem (EVT) is one of the most important and practically useful results in real analysis. It guarantees that continuous functions on closed, bounded intervals always attain their maximum and minimum values—these extreme values are not merely approached but actually achieved at specific points. This theorem provides the theoretical foundation for optimization in calculus and applied mathematics: it ensures that optimization problems on compact domains have solutions. The EVT, together with the Intermediate Value Theorem and the Boundedness Theorem, reveals the special behavior of continuous functions on compact sets. The proof elegantly combines the Bolzano-Weierstrass Theorem (guaranteeing convergent subsequences) with the sequential criterion for continuity, showcasing the power of sequential arguments in analysis. Understanding when and why the EVT applies, and when it fails, is crucial for both theoretical mathematics and practical problem-solving.

## Statement of the Theorem

**Theorem 6.1 (Extreme Value Theorem):** Let $f: [a, b] \to \mathbb{R}$ be continuous on the closed, bounded interval $[a, b]$. Then $f$ attains both its maximum and minimum values on $[a, b]$.

More precisely, there exist points $c, d \in [a, b]$ such that:
$$
f(c) \leq f(x) \leq f(d) \quad \text{for all } x \in [a, b]
$$

We call $f(c)$ the **minimum value** of $f$ on $[a, b]$, and $f(d)$ the **maximum value** of $f$ on $[a, b]$.

## Proof of the Extreme Value Theorem

We first prove that $f$ is bounded (the Boundedness Theorem), then show that $f$ attains its supremum and infimum.

**Step 1: Boundedness**

**Lemma 6.1 (Boundedness Theorem):** If $f: [a, b] \to \mathbb{R}$ is continuous, then $f$ is bounded on $[a, b]$.

**Proof:** Suppose, for contradiction, that $f$ is unbounded. Then for each $n \in \mathbb{N}$, there exists $x_n \in [a, b]$ such that $|f(x_n)| > n$.

The sequence $(x_n)$ is bounded since $x_n \in [a, b]$ for all $n$. By the Bolzano-Weierstrass Theorem, $(x_n)$ has a convergent subsequence $(x_{n_k})$ with limit:
$$
x_{n_k} \to c \text{ for some } c \in [a, b]
$$

(The limit $c$ must be in $[a, b]$ because $[a, b]$ is closed.)

Since $f$ is continuous at $c$, the sequential criterion implies:
$$
f(x_{n_k}) \to f(c)
$$

Therefore, the sequence $(f(x_{n_k}))$ is convergent, hence bounded.

But this contradicts the fact that $|f(x_{n_k})| > n_k \to \infty$.

Therefore, $f$ must be bounded on $[a, b]$.

**Step 2: Attainment of Maximum**

Since $f$ is bounded, the set $\{f(x) : x \in [a, b]\}$ is a non-empty bounded subset of $\mathbb{R}$. By the Completeness Axiom, it has a supremum:
$$
M = \sup\{f(x) : x \in [a, b]\}
$$

We must show that this supremum is actually attained, i.e., there exists $d \in [a, b]$ with $f(d) = M$.

By the approximation property of supremum, for each $n \in \mathbb{N}$, there exists $x_n \in [a, b]$ such that:
$$
M - \frac{1}{n} < f(x_n) \leq M
$$

The sequence $(x_n)$ is bounded (lying in $[a, b]$), so by the Bolzano-Weierstrass Theorem, it has a convergent subsequence:
$$
x_{n_k} \to d \text{ for some } d \in [a, b]
$$

Since $f$ is continuous at $d$:
$$
f(x_{n_k}) \to f(d)
$$

But we also have:
$$
M - \frac{1}{n_k} < f(x_{n_k}) \leq M
$$

Taking the limit as $k \to \infty$ and using the squeeze theorem:
$$
M \leq f(d) \leq M
$$

Therefore $f(d) = M$, showing that the maximum is attained at $d \in [a, b]$.

**Step 3: Attainment of Minimum**

The proof for the minimum is identical, using $m = \inf\{f(x) : x \in [a, b]\}$ instead of the supremum.

Alternatively, apply the maximum result to $-f$: if $-f$ attains its maximum at $c$, then $f$ attains its minimum at $c$.

## Necessity of Hypotheses

Each hypothesis in the EVT is essential. Here we show what happens when each is violated:

**Example 6.1 (Continuity Required):** Consider:
$$
f(x) = \begin{cases}
x & \text{if } x \in [0, 1) \\
0 & \text{if } x = 1
\end{cases}
$$

on $[0, 1]$.

Then $f$ is defined on a closed, bounded interval, but discontinuous at $x = 1$.

We have $\sup\{f(x) : x \in [0, 1]\} = 1$, but this supremum is not attained (there is no $x \in [0, 1]$ with $f(x) = 1$).

**Example 6.2 (Closedness Required):** Consider $f(x) = x$ on the open interval $(0, 1)$.

Then $f$ is continuous, but the interval is not closed.

We have $\sup\{f(x) : x \in (0, 1)\} = 1$ and $\inf\{f(x) : x \in (0, 1)\} = 0$, but neither of these values is attained.

**Example 6.3 (Boundedness Required):** Consider $f(x) = x$ on the closed but unbounded interval $[0, \infty)$.

Then $f$ is continuous, but the interval is not bounded.

We have $\inf\{f(x) : x \in [0, \infty)\} = 0$ (attained at $x = 0$), but $\sup\{f(x) : x \in [0, \infty)\} = +\infty$ (no maximum exists).

**Example 6.4 (Another Example Without Closedness):** Consider $f(x) = \frac{1}{x}$ on $(0, 1]$.

Then $f$ is continuous, and the interval is bounded but not closed.

We have $\inf\{f(x) : x \in (0, 1]\} = 1$ (attained at $x = 1$), but $\sup\{f(x) : x \in (0, 1]\} = +\infty$ (no maximum exists).

These examples show that all three hypotheses—continuity, closedness, and boundedness—are necessary for the conclusion.

## Worked Examples

**Example 6.5:** Find the maximum and minimum values of $f(x) = x^3 - 3x$ on $[-2, 2]$.

**Solution:** Since $f$ is continuous (polynomial) on the closed, bounded interval $[-2, 2]$, the EVT guarantees that maximum and minimum values exist.

To find them, we check:
1. Critical points (where $f'(x) = 0$ or $f'(x)$ doesn't exist)
2. Endpoints

First, find critical points:
$$
f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 0 \implies x = \pm 1
$$

Both critical points $x = -1$ and $x = 1$ lie in $[-2, 2]$.

Evaluate $f$ at critical points and endpoints:
- $f(-2) = (-2)^3 - 3(-2) = -8 + 6 = -2$
- $f(-1) = (-1)^3 - 3(-1) = -1 + 3 = 2$
- $f(1) = 1^3 - 3(1) = 1 - 3 = -2$
- $f(2) = 2^3 - 3(2) = 8 - 6 = 2$

Therefore:
- **Maximum value:** $2$ (attained at $x = -1$ and $x = 2$)
- **Minimum value:** $-2$ (attained at $x = -2$ and $x = 1$)

**Example 6.6:** Find the maximum and minimum values of $f(x) = \sin x + \cos x$ on $[0, 2\pi]$.

**Solution:** $f$ is continuous on $[0, 2\pi]$, so extreme values exist by EVT.

Find critical points:
$$
f'(x) = \cos x - \sin x = 0 \implies \cos x = \sin x \implies \tan x = 1
$$

In $[0, 2\pi]$, this gives $x = \frac{\pi}{4}$ and $x = \frac{5\pi}{4}$.

Evaluate at critical points and endpoints:
- $f(0) = \sin 0 + \cos 0 = 0 + 1 = 1$
- $f(\pi/4) = \sin(\pi/4) + \cos(\pi/4) = \frac{\sqrt{2}}{2} + \frac{\sqrt{2}}{2} = \sqrt{2}$
- $f(5\pi/4) = \sin(5\pi/4) + \cos(5\pi/4) = -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} = -\sqrt{2}$
- $f(2\pi) = \sin(2\pi) + \cos(2\pi) = 0 + 1 = 1$

Therefore:
- **Maximum value:** $\sqrt{2}$ at $x = \frac{\pi}{4}$
- **Minimum value:** $-\sqrt{2}$ at $x = \frac{5\pi}{4}$

**Example 6.7:** Show that if $f: [a, b] \to \mathbb{R}$ is continuous and $f(x) > 0$ for all $x \in [a, b]$, then there exists $m > 0$ such that $f(x) \geq m$ for all $x \in [a, b]$.

**Solution:** By the EVT, $f$ attains its minimum at some $c \in [a, b]$. Let $m = f(c)$.

Then $f(x) \geq m$ for all $x \in [a, b]$ by definition of minimum.

Since $f(c) > 0$, we have $m > 0$.

**Remark:** This shows that a continuous positive function on a closed, bounded interval is bounded away from zero.

**Example 6.8:** Let $f: [0, 1] \to [0, 1]$ be continuous. Prove that there exists $c \in [0, 1]$ such that $f(c) = c^2$.

**Solution:** Define $g(x) = f(x) - x^2$ for $x \in [0, 1]$.

Then $g$ is continuous, and:
- $g(0) = f(0) - 0 = f(0) \geq 0$ (since $f(0) \in [0, 1]$)
- $g(1) = f(1) - 1 \leq 0$ (since $f(1) \in [0, 1]$)

If $g(0) = 0$ or $g(1) = 0$, we're done (with $c = 0$ or $c = 1$).

Otherwise, $g(0) > 0$ and $g(1) < 0$. By the Intermediate Value Theorem, there exists $c \in (0, 1)$ with $g(c) = 0$, i.e., $f(c) = c^2$.

**Example 6.9:** Among all rectangles with perimeter $P$, which has the largest area?

**Solution:** Let $x$ be the width and $y$ be the height. Then $2x + 2y = P$, so $y = \frac{P}{2} - x$.

The area is:
$$
A(x) = xy = x\left(\frac{P}{2} - x\right) = \frac{P}{2}x - x^2
$$

The width must satisfy $0 \leq x \leq \frac{P}{2}$ (so that $y \geq 0$).

By the EVT, $A(x)$ attains its maximum on $[0, \frac{P}{2}]$.

Find critical points:
$$
A'(x) = \frac{P}{2} - 2x = 0 \implies x = \frac{P}{4}
$$

Evaluate:
- $A(0) = 0$
- $A(P/4) = \frac{P}{4} \cdot \frac{P}{4} = \frac{P^2}{16}$
- $A(P/2) = \frac{P}{2} \cdot 0 = 0$

Maximum area is $\frac{P^2}{16}$, attained when $x = y = \frac{P}{4}$ (a square).

## Applications in Optimization

**Application 6.1 (General Optimization Strategy):** To find the maximum and minimum of a continuous function $f$ on $[a, b]$:

1. Find all critical points in $(a, b)$ (where $f'(x) = 0$ or $f'$ doesn't exist)
2. Evaluate $f$ at all critical points and at the endpoints $a, b$
3. The largest value is the maximum; the smallest is the minimum

The EVT guarantees this process will succeed.

**Application 6.2 (Distance to a Compact Set):** If $K$ is a closed, bounded subset of $\mathbb{R}$ and $p \in \mathbb{R}$, then there exists a point in $K$ closest to $p$.

**Proof:** Define $f: K \to \mathbb{R}$ by $f(x) = |x - p|$.

Then $f$ is continuous (composition of continuous functions). If $K$ can be written as $K = [a, b] \cap S$ for some set $S$, and if $K$ is itself a closed interval or finite union of closed intervals, then $f$ restricted to $K$ attains its minimum by the EVT.

More generally, this requires the concept of compactness in metric spaces.

**Application 6.3 (Uniform Continuity):** The EVT is a key ingredient in proving the Uniform Continuity Theorem: every continuous function on $[a, b]$ is uniformly continuous.

## Relationship to Other Theorems

**Comparison with IVT:**

- **IVT:** Guarantees that intermediate values are attained
- **EVT:** Guarantees that extreme values (sup and inf) are attained

Both theorems require continuity on a closed, bounded interval and fail without these hypotheses.

**Comparison with Boundedness Theorem:**

- **Boundedness:** Guarantees $f$ is bounded (sup and inf are finite)
- **EVT:** Guarantees these bounds are attained

The EVT implies the Boundedness Theorem, but is stronger.

## Important Observations

1. **Existence, not location:** The EVT guarantees that extreme values exist and are attained, but doesn't tell us where. Finding the locations requires additional work (calculus techniques).

2. **Multiple extrema:** The maximum or minimum may be attained at multiple points. The EVT guarantees at least one point for each.

3. **Local vs. global:** The EVT concerns global extrema (over the entire interval). Local extrema are a different concept, though related through Fermat's Theorem.

4. **Compactness:** The requirement that the domain be closed and bounded is equivalent to compactness in $\mathbb{R}$. The EVT generalizes: continuous images of compact sets are compact, and compact subsets of $\mathbb{R}$ are closed and bounded.

5. **Sequential compactness:** The proof uses the Bolzano-Weierstrass Theorem, which characterizes sequential compactness. This reveals the deep connection between compactness and the existence of convergent subsequences.

## Connections to Other Topics

- **Calculus:** The EVT is the theoretical justification for the "critical point method" of finding maxima and minima taught in calculus courses.

- **Optimization:** The theorem guarantees that continuous optimization problems on compact domains have solutions, making them well-posed.

- **Topology:** The EVT generalizes to: continuous images of compact sets are compact. In $\mathbb{R}$, compact sets are exactly the closed and bounded sets (Heine-Borel Theorem).

- **Bolzano-Weierstrass:** The proof crucially uses this theorem to extract convergent subsequences from bounded sequences.

- **Completeness:** The supremum and infimum, whose existence relies on the Completeness Axiom, are central to the proof.

- **Uniform Continuity:** The EVT, combined with sequential arguments, is used to prove that continuous functions on closed, bounded intervals are uniformly continuous.

## Summary

The Extreme Value Theorem asserts that every continuous function on a closed, bounded interval attains both its maximum and minimum values. The proof beautifully combines several fundamental results: the Completeness Axiom (ensuring suprema and infima exist), the Bolzano-Weierstrass Theorem (providing convergent subsequences), and the sequential criterion for continuity (transferring convergence from inputs to outputs). All three hypotheses—continuity, closedness, and boundedness—are essential, as demonstrated by counterexamples. The EVT is indispensable in optimization, providing the theoretical foundation for the critical point method in calculus and ensuring that continuous objective functions on compact domains have optimal solutions. Together with the Intermediate Value Theorem, the EVT reveals the special, well-behaved nature of continuous functions on compact sets, a theme that pervades all of modern analysis and topology.
