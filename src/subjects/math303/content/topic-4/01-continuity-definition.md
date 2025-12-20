---
title: "Continuity: Definition"
slug: "continuity-definition"
description: "Formal definition of continuity using limits"
---

# Continuity: Definition

## Introduction

Continuity is one of the most fundamental concepts in real analysis and calculus. Intuitively, a continuous function is one whose graph can be drawn without lifting the pen from the paper. This geometric intuition, while helpful, lacks the precision needed for rigorous mathematical analysis. The formal definition of continuity, developed in the 19th century by mathematicians such as Cauchy, Weierstrass, and Bolzano, provides a precise framework for understanding when small changes in input produce small changes in output. This concept is essential for understanding limits, derivatives, integrals, and forms the foundation for many deep results in analysis, topology, and beyond.

## Intuitive Understanding

Before diving into formal definitions, consider what it means for a function to be continuous. If we think of a function $f$ as describing a physical relationship, continuity means that small perturbations in the input variable produce only small perturbations in the output. For instance, if $f(x)$ represents the temperature at position $x$ along a metal rod, we expect temperature to change gradually, not to jump discontinuously from one value to another at a single point.

Conversely, discontinuous functions exhibit sudden jumps or breaks. The classic example is a step function that jumps from one value to another at a specific point. Such behavior is incompatible with many physical phenomena but can model situations like switching a light on or off.

## Formal Definition via Limits

**Definition 1.1 (Continuity at a Point):** Let $f: D \to \mathbb{R}$ where $D \subseteq \mathbb{R}$, and let $c \in D$. We say that $f$ is **continuous at $c$** if:
$$
\lim_{x \to c} f(x) = f(c)
$$

This definition unpacks into three essential requirements:

1. **$f(c)$ is defined**: The function must have a value at the point $c$.
2. **$\lim_{x \to c} f(x)$ exists**: As $x$ approaches $c$ from either side, $f(x)$ must approach some limiting value.
3. **These values are equal**: The limiting value must equal the function's value at $c$.

If any of these conditions fails, the function is discontinuous at $c$.

**Definition 1.2 (Continuity on a Set):** A function $f$ is **continuous on a set $D$** if it is continuous at every point $c \in D$.

## The Epsilon-Delta Definition

The limit-based definition relies on our understanding of limits. To make continuity completely rigorous, we use the epsilon-delta formulation:

**Definition 1.3 ($\epsilon$-$\delta$ Definition of Continuity):** Let $f: D \to \mathbb{R}$ and $c \in D$. The function $f$ is **continuous at $c$** if for every $\epsilon > 0$, there exists $\delta > 0$ such that:
$$
|x - c| < \delta \text{ and } x \in D \implies |f(x) - f(c)| < \epsilon
$$

In other words, we can make $f(x)$ arbitrarily close to $f(c)$ (within $\epsilon$) by choosing $x$ sufficiently close to $c$ (within $\delta$). The key insight is that $\delta$ depends on both $\epsilon$ and the point $c$, but once chosen, it works for all $x$ within $\delta$ of $c$.

## Worked Examples

**Example 1.1:** Prove that $f(x) = x^2$ is continuous at every point $c \in \mathbb{R}$.

**Proof:** Let $c \in \mathbb{R}$ and $\epsilon > 0$. We need to find $\delta > 0$ such that $|x - c| < \delta$ implies $|x^2 - c^2| < \epsilon$.

First, observe that:
$$
|x^2 - c^2| = |x - c||x + c|
$$

To control $|x + c|$, we restrict $x$ to be close to $c$. Specifically, if $|x - c| < 1$, then:
$$
|x| < |c| + 1
$$
and thus:
$$
|x + c| \leq |x| + |c| < 2|c| + 1
$$

Therefore, if $|x - c| < 1$, we have:
$$
|x^2 - c^2| = |x - c||x + c| < |x - c|(2|c| + 1)
$$

To ensure this is less than $\epsilon$, we need:
$$
|x - c| < \frac{\epsilon}{2|c| + 1}
$$

We must satisfy both restrictions, so we choose:
$$
\delta = \min\left\{1, \frac{\epsilon}{2|c| + 1}\right\}
$$

Then if $|x - c| < \delta$, we have:
$$
|x^2 - c^2| \leq |x - c|(2|c| + 1) < \frac{\epsilon}{2|c| + 1} \cdot (2|c| + 1) = \epsilon
$$

This completes the proof.

**Example 1.2:** Show that $f(x) = \frac{1}{x}$ is continuous on its domain $(0, \infty)$.

**Proof:** Let $c > 0$ and $\epsilon > 0$. We need to find $\delta > 0$ such that if $x > 0$ and $|x - c| < \delta$, then $\left|\frac{1}{x} - \frac{1}{c}\right| < \epsilon$.

We have:
$$
\left|\frac{1}{x} - \frac{1}{c}\right| = \left|\frac{c - x}{xc}\right| = \frac{|x - c|}{|x||c|}
$$

To bound $\frac{1}{|x|}$, we restrict $x$ to satisfy $|x - c| < \frac{c}{2}$. Then $x > \frac{c}{2}$, so $\frac{1}{|x|} < \frac{2}{c}$.

Thus:
$$
\left|\frac{1}{x} - \frac{1}{c}\right| < \frac{2|x - c|}{c^2}
$$

To make this less than $\epsilon$, we need $|x - c| < \frac{\epsilon c^2}{2}$.

Choosing:
$$
\delta = \min\left\{\frac{c}{2}, \frac{\epsilon c^2}{2}\right\}
$$

ensures that $|x - c| < \delta$ implies $\left|\frac{1}{x} - \frac{1}{c}\right| < \epsilon$.

**Example 1.3:** Determine whether $f(x) = |x|$ is continuous at $x = 0$.

**Proof:** Let $\epsilon > 0$. We need $\delta > 0$ such that $|x - 0| < \delta$ implies $||x| - |0|| < \epsilon$.

Since $|0| = 0$ and $||x|| = |x|$, we need $|x| < \epsilon$ when $|x| < \delta$.

Choosing $\delta = \epsilon$ works: if $|x| < \delta$, then $||x| - 0| = |x| < \delta = \epsilon$.

Therefore, $f(x) = |x|$ is continuous at $x = 0$ (and by similar arguments, everywhere).

**Example 1.4:** Show that the sign function
$$
\text{sgn}(x) = \begin{cases}
-1 & \text{if } x < 0 \\
0 & \text{if } x = 0 \\
1 & \text{if } x > 0
\end{cases}
$$
is discontinuous at $x = 0$.

**Proof:** Suppose $f$ were continuous at $0$. Then for $\epsilon = \frac{1}{2}$, there would exist $\delta > 0$ such that $|x - 0| < \delta$ implies $|\text{sgn}(x) - \text{sgn}(0)| < \frac{1}{2}$.

But $\text{sgn}(0) = 0$. For any $\delta > 0$, we can choose $x = -\frac{\delta}{2} < 0$. Then $|x| = \frac{\delta}{2} < \delta$, but:
$$
|\text{sgn}(x) - \text{sgn}(0)| = |-1 - 0| = 1 > \frac{1}{2}
$$

This contradiction shows that no such $\delta$ exists, so $\text{sgn}$ is discontinuous at $0$.

## Sequential Criterion for Continuity

An equivalent characterization of continuity uses sequences, which is often easier to work with in proofs.

**Theorem 1.1 (Sequential Criterion):** Let $f: D \to \mathbb{R}$ and $c \in D$. Then $f$ is continuous at $c$ if and only if for every sequence $(x_n)$ in $D$ converging to $c$, we have:
$$
\lim_{n \to \infty} f(x_n) = f(c)
$$

**Proof:**

($\Rightarrow$) Suppose $f$ is continuous at $c$. Let $(x_n)$ be a sequence in $D$ with $x_n \to c$, and let $\epsilon > 0$.

By continuity, there exists $\delta > 0$ such that $|x - c| < \delta$ implies $|f(x) - f(c)| < \epsilon$.

Since $x_n \to c$, there exists $N$ such that for all $n \geq N$, we have $|x_n - c| < \delta$.

Therefore, for all $n \geq N$:
$$
|f(x_n) - f(c)| < \epsilon
$$

This shows $f(x_n) \to f(c)$.

($\Leftarrow$) We prove the contrapositive. Suppose $f$ is not continuous at $c$. Then there exists $\epsilon > 0$ such that for every $\delta > 0$, there exists $x \in D$ with $|x - c| < \delta$ but $|f(x) - f(c)| \geq \epsilon$.

For each $n \in \mathbb{N}$, choose $\delta_n = \frac{1}{n}$ and let $x_n$ be a point with $|x_n - c| < \frac{1}{n}$ but $|f(x_n) - f(c)| \geq \epsilon$.

Then $x_n \to c$ (by the squeeze theorem), but $f(x_n) \not\to f(c)$ since $|f(x_n) - f(c)| \geq \epsilon$ for all $n$.

This contradicts our assumption, completing the proof.

## One-Sided Continuity

For functions defined on intervals, we can consider continuity from one side.

**Definition 1.4 (Right Continuity):** A function $f$ is **continuous from the right** at $c$ if:
$$
\lim_{x \to c^+} f(x) = f(c)
$$

Equivalently, for every $\epsilon > 0$, there exists $\delta > 0$ such that:
$$
0 < x - c < \delta \implies |f(x) - f(c)| < \epsilon
$$

**Definition 1.5 (Left Continuity):** A function $f$ is **continuous from the left** at $c$ if:
$$
\lim_{x \to c^-} f(x) = f(c)
$$

**Theorem 1.2:** A function $f$ is continuous at $c$ if and only if it is both left-continuous and right-continuous at $c$.

**Proof:** This follows immediately from the fact that $\lim_{x \to c} f(x) = L$ if and only if $\lim_{x \to c^+} f(x) = L = \lim_{x \to c^-} f(x)$.

**Example 1.5:** The function $f(x) = \lfloor x \rfloor$ (greatest integer function) is right-continuous at every integer $n$ but not left-continuous.

At $n \in \mathbb{Z}$:
- $\lim_{x \to n^+} \lfloor x \rfloor = n = f(n)$ (right-continuous)
- $\lim_{x \to n^-} \lfloor x \rfloor = n - 1 \neq n = f(n)$ (not left-continuous)

## Important Observations

1. **Domain Matters**: Continuity is always relative to the domain of the function. For example, $f(x) = \frac{1}{x}$ is continuous on $(0, \infty)$ but cannot be continuous at $x = 0$ since it's not defined there.

2. **Local Property**: Continuity is a local property—whether $f$ is continuous at $c$ depends only on the behavior of $f$ near $c$, not on its global behavior.

3. **Composition Preserves Continuity**: If $g$ is continuous at $c$ and $f$ is continuous at $g(c)$, then $f \circ g$ is continuous at $c$ (proven in detail in the properties section).

4. **All Elementary Functions are Continuous**: Polynomials, rational functions (on their domains), trigonometric functions, exponential and logarithmic functions are all continuous on their natural domains.

## Connections to Other Topics

- **Limits**: Continuity is defined in terms of limits. A function is continuous at $c$ precisely when the limit process and function evaluation commute: $\lim_{x \to c} f(x) = f(\lim_{x \to c} x)$.

- **Sequences**: The sequential criterion connects continuity to sequence convergence, allowing us to use sequence-based arguments in continuity proofs.

- **Differentiation**: Every differentiable function is continuous, but not every continuous function is differentiable (e.g., $f(x) = |x|$ at $x = 0$).

- **Integration**: The Riemann integral is most naturally defined for continuous functions, though it extends to broader classes.

- **Topology**: In topology, continuity is characterized by the preimage of open sets being open, generalizing the epsilon-delta definition to arbitrary topological spaces.

## Summary

Continuity is a fundamental concept that formalizes the intuitive notion of functions without jumps or breaks. The epsilon-delta definition provides the rigorous foundation: for every desired degree of closeness in outputs ($\epsilon$), we can achieve it by choosing inputs sufficiently close ($\delta$). The sequential criterion offers an equivalent characterization often more convenient in proofs. One-sided continuity refines the concept for functions on intervals, and the local nature of continuity allows us to analyze function behavior point by point. Mastering these definitions and their interrelationships is essential for all further study in real analysis.
