---
title: "Epsilon-Delta Proofs"
slug: "epsilon-delta"
description: "Mastering epsilon-delta arguments for continuity"
---

# Epsilon-Delta Proofs

## Introduction

The epsilon-delta definition of continuity, attributed to Weierstrass, represents one of the crowning achievements of 19th-century mathematical rigor. While the intuitive notion of continuity has been understood since ancient times, it was not until the development of the epsilon-delta formulation that mathematicians could prove continuity with complete logical precision. This framework eliminates ambiguity and provides a universal language for discussing continuity across all of mathematical analysis. Learning to construct epsilon-delta proofs is essential for developing mathematical maturity and understanding the foundations of calculus and analysis. While initially challenging, these proofs follow recognizable patterns that become more natural with practice.

## The Epsilon-Delta Definition Revisited

For a function $f: D \to \mathbb{R}$ and a point $c \in D$, we say $f$ is **continuous at $c$** if:

$$
\forall \epsilon > 0, \exists \delta > 0: \forall x \in D, \, |x - c| < \delta \implies |f(x) - f(c)| < \epsilon
$$

The structure of this definition is crucial:
- $\epsilon$ (epsilon) represents the desired tolerance in the output
- $\delta$ (delta) represents how close inputs must be to $c$ to achieve that tolerance
- The definition says: no matter how small an error tolerance we demand in the output ($\epsilon$), we can find a corresponding input tolerance ($\delta$) that guarantees it

The challenge in epsilon-delta proofs is finding an appropriate $\delta$ for each given $\epsilon$.

## General Strategy for Epsilon-Delta Proofs

The standard approach follows these steps:

1. **Scratch Work (not part of the formal proof):**
   - Start with $|f(x) - f(c)| < \epsilon$
   - Manipulate this inequality algebraically to isolate $|x - c|$
   - Determine what constraint on $|x - c|$ would ensure $|f(x) - f(c)| < \epsilon$
   - This often involves making additional restrictions to bound other terms

2. **Formal Proof (what you write):**
   - Begin: "Let $\epsilon > 0$ be given"
   - Choose your $\delta$ based on the scratch work
   - Verify: "Suppose $|x - c| < \delta$"
   - Show through forward reasoning that this implies $|f(x) - f(c)| < \epsilon$

The key insight is that the scratch work proceeds backward (from desired conclusion to hypothesis), but the formal proof proceeds forward (from hypothesis to conclusion).

## Linear Functions

**Theorem 2.1:** Every linear function $f(x) = mx + b$ is continuous on $\mathbb{R}$.

**Proof:** Let $c \in \mathbb{R}$ and $\epsilon > 0$.

**Case 1:** If $m = 0$, then $f(x) = b$ is constant, so $|f(x) - f(c)| = 0 < \epsilon$ for all $x$. Any $\delta > 0$ works.

**Case 2:** If $m \neq 0$, we have:
$$
|f(x) - f(c)| = |mx + b - mc - b| = |m(x - c)| = |m| \cdot |x - c|
$$

We want $|m| \cdot |x - c| < \epsilon$, which is equivalent to $|x - c| < \frac{\epsilon}{|m|}$.

Choose $\delta = \frac{\epsilon}{|m|}$. Then if $|x - c| < \delta$:
$$
|f(x) - f(c)| = |m| \cdot |x - c| < |m| \cdot \frac{\epsilon}{|m|} = \epsilon
$$

Therefore $f$ is continuous at $c$.

**Example 2.1:** Prove that $f(x) = 3x - 5$ is continuous at $c = 2$.

**Scratch work:** We need $|(3x - 5) - (3 \cdot 2 - 5)| = |3x - 6| = 3|x - 2| < \epsilon$.

This requires $|x - 2| < \frac{\epsilon}{3}$.

**Formal proof:** Let $\epsilon > 0$. Choose $\delta = \frac{\epsilon}{3}$.

If $|x - 2| < \delta$, then:
$$
|f(x) - f(2)| = |3x - 5 - 1| = |3x - 6| = 3|x - 2| < 3 \cdot \frac{\epsilon}{3} = \epsilon
$$

## Polynomial Functions

**Theorem 2.2:** Every polynomial is continuous on $\mathbb{R}$.

**Proof sketch:** We prove this by induction on the degree, using:
1. Base case: Constant functions and $f(x) = x$ are continuous
2. Inductive step: If $f$ and $g$ are continuous, so is $f + g$ and $f \cdot g$ (proven in the properties section)

**Example 2.2:** Prove that $f(x) = x^3$ is continuous at $c = 2$.

**Scratch work:** We need to estimate $|x^3 - 8|$. Factor:
$$
|x^3 - 8| = |x - 2| \cdot |x^2 + 2x + 4|
$$

If we restrict $|x - 2| < 1$, then $1 < x < 3$, so:
$$
x^2 + 2x + 4 < 9 + 6 + 4 = 19
$$

Thus $|x^3 - 8| < 19|x - 2|$. To ensure this is $< \epsilon$, we need $|x - 2| < \frac{\epsilon}{19}$.

**Formal proof:** Let $\epsilon > 0$. Choose $\delta = \min\left\{1, \frac{\epsilon}{19}\right\}$.

Suppose $|x - 2| < \delta$. Then $|x - 2| < 1$, so $1 < x < 3$, giving:
$$
|x^2 + 2x + 4| < 19
$$

Therefore:
$$
|f(x) - f(2)| = |x^3 - 8| = |x - 2| \cdot |x^2 + 2x + 4| < \frac{\epsilon}{19} \cdot 19 = \epsilon
$$

**Example 2.3:** General approach for $f(x) = x^n$ at $c \neq 0$.

Using the factorization:
$$
x^n - c^n = (x - c)(x^{n-1} + x^{n-2}c + \cdots + xc^{n-2} + c^{n-1})
$$

If $|x - c| < |c|$, then $|x| < 2|c|$, and the sum has $n$ terms, each bounded by $(2|c|)^{n-1}$, giving:
$$
|x^n - c^n| \leq |x - c| \cdot n(2|c|)^{n-1}
$$

Choose $\delta = \min\left\{|c|, \frac{\epsilon}{n(2|c|)^{n-1}}\right\}$.

## Rational Functions

**Theorem 2.3:** If $g(c) \neq 0$ and $g$ is continuous at $c$, then $\frac{1}{g}$ is continuous at $c$.

**Proof:** Let $\epsilon > 0$. We need to control:
$$
\left|\frac{1}{g(x)} - \frac{1}{g(c)}\right| = \frac{|g(x) - g(c)|}{|g(x)| \cdot |g(c)|}
$$

First, ensure $|g(x)|$ stays away from zero. Since $g$ is continuous at $c$ and $g(c) \neq 0$, choose $\delta_1 > 0$ such that:
$$
|x - c| < \delta_1 \implies |g(x) - g(c)| < \frac{|g(c)|}{2}
$$

By the reverse triangle inequality, this gives $|g(x)| > \frac{|g(c)|}{2}$, so $\frac{1}{|g(x)|} < \frac{2}{|g(c)|}$.

Now choose $\delta_2 > 0$ such that:
$$
|x - c| < \delta_2 \implies |g(x) - g(c)| < \frac{\epsilon |g(c)|^2}{2}
$$

Set $\delta = \min\{\delta_1, \delta_2\}$. If $|x - c| < \delta$:
$$
\left|\frac{1}{g(x)} - \frac{1}{g(c)}\right| < \frac{2}{|g(c)|^2} \cdot \frac{\epsilon |g(c)|^2}{2} = \epsilon
$$

**Example 2.4:** Prove $f(x) = \frac{1}{x}$ is continuous at $c = 1$.

**Scratch work:**
$$
\left|\frac{1}{x} - 1\right| = \frac{|1 - x|}{|x|}
$$

Restrict $|x - 1| < \frac{1}{2}$, so $\frac{1}{2} < x < \frac{3}{2}$, giving $\frac{1}{|x|} < 2$.

Thus $\left|\frac{1}{x} - 1\right| < 2|x - 1|$, so we need $|x - 1| < \frac{\epsilon}{2}$.

**Formal proof:** Let $\epsilon > 0$. Choose $\delta = \min\left\{\frac{1}{2}, \frac{\epsilon}{2}\right\}$.

If $|x - 1| < \delta$, then $|x - 1| < \frac{1}{2}$, so $x > \frac{1}{2}$ and $\frac{1}{x} < 2$.

Therefore:
$$
\left|\frac{1}{x} - 1\right| = \frac{|x - 1|}{x} < 2|x - 1| < 2 \cdot \frac{\epsilon}{2} = \epsilon
$$

## Root Functions

**Example 2.5:** Prove $f(x) = \sqrt{x}$ is continuous at $c > 0$.

**Scratch work:** For $x, c > 0$:
$$
|\sqrt{x} - \sqrt{c}| = \frac{|x - c|}{|\sqrt{x} + \sqrt{c}|}
$$

If $|x - c| < \frac{c}{2}$, then $x > \frac{c}{2}$, so $\sqrt{x} > \sqrt{\frac{c}{2}}$ and:
$$
\sqrt{x} + \sqrt{c} > \sqrt{\frac{c}{2}}
$$

Thus:
$$
|\sqrt{x} - \sqrt{c}| < \frac{|x - c|}{\sqrt{c/2}} = \sqrt{2} \cdot \frac{|x - c|}{\sqrt{c}}
$$

To ensure this is $< \epsilon$, we need $|x - c| < \frac{\epsilon \sqrt{c}}{\sqrt{2}}$.

**Formal proof:** Let $\epsilon > 0$ and $c > 0$. Choose $\delta = \min\left\{\frac{c}{2}, \frac{\epsilon\sqrt{c}}{\sqrt{2}}\right\}$.

If $0 < x$ and $|x - c| < \delta$, then:
$$
|\sqrt{x} - \sqrt{c}| = \frac{|x - c|}{\sqrt{x} + \sqrt{c}} < \frac{|x - c|}{\sqrt{c/2}} = \sqrt{2} \cdot \frac{|x - c|}{\sqrt{c}} < \sqrt{2} \cdot \frac{\epsilon\sqrt{c}/\sqrt{2}}{\sqrt{c}} = \epsilon
$$

**Example 2.6:** Prove $f(x) = \sqrt{x}$ is continuous at $c = 0$ from the right.

**Formal proof:** Let $\epsilon > 0$. Choose $\delta = \epsilon^2$.

If $0 \leq x < \delta$, then:
$$
|\sqrt{x} - \sqrt{0}| = \sqrt{x} < \sqrt{\delta} = \sqrt{\epsilon^2} = \epsilon
$$

## Trigonometric Functions

**Lemma 2.1:** For all $x, y \in \mathbb{R}$: $|\sin x - \sin y| \leq |x - y|$.

**Proof:** Using the identity:
$$
\sin x - \sin y = 2\cos\left(\frac{x+y}{2}\right)\sin\left(\frac{x-y}{2}\right)
$$

we have:
$$
|\sin x - \sin y| = 2\left|\cos\left(\frac{x+y}{2}\right)\right| \cdot \left|\sin\left(\frac{x-y}{2}\right)\right| \leq 2 \cdot 1 \cdot \left|\sin\left(\frac{x-y}{2}\right)\right|
$$

For small $|t|$, we have $|\sin t| \leq |t|$ (provable using calculus or geometry), so:
$$
|\sin x - \sin y| \leq 2 \cdot \left|\frac{x-y}{2}\right| = |x - y|
$$

**Theorem 2.4:** The function $f(x) = \sin x$ is continuous on $\mathbb{R}$.

**Proof:** Let $c \in \mathbb{R}$ and $\epsilon > 0$. Choose $\delta = \epsilon$.

If $|x - c| < \delta$, then by Lemma 2.1:
$$
|\sin x - \sin c| \leq |x - c| < \delta = \epsilon
$$

**Example 2.7:** Similarly, $f(x) = \cos x$ is continuous, using $|\cos x - \cos y| \leq |x - y|$.

## Composition of Functions

**Theorem 2.5:** If $g$ is continuous at $c$ and $f$ is continuous at $g(c)$, then $f \circ g$ is continuous at $c$.

**Proof:** Let $\epsilon > 0$. Since $f$ is continuous at $g(c)$, there exists $\gamma > 0$ such that:
$$
|y - g(c)| < \gamma \implies |f(y) - f(g(c))| < \epsilon
$$

Since $g$ is continuous at $c$, there exists $\delta > 0$ such that:
$$
|x - c| < \delta \implies |g(x) - g(c)| < \gamma
$$

Therefore, if $|x - c| < \delta$:
$$
|g(x) - g(c)| < \gamma \implies |(f \circ g)(x) - (f \circ g)(c)| = |f(g(x)) - f(g(c))| < \epsilon
$$

**Example 2.8:** Since $x^2$ and $\sin x$ are continuous, so is $\sin(x^2)$.

**Example 2.9:** Since $x$ and $\sqrt{x}$ (on $[0, \infty)$) are continuous, so is $\sqrt{x^2 + 1}$ on $\mathbb{R}$.

## Advanced Examples

**Example 2.10:** Prove $f(x) = x\sin\left(\frac{1}{x}\right)$ (with $f(0) = 0$) is continuous at $x = 0$.

**Proof:** Let $\epsilon > 0$. We need to show $|x\sin(1/x) - 0| < \epsilon$ for $x$ near $0$.

Since $|\sin(1/x)| \leq 1$ for all $x \neq 0$:
$$
\left|x\sin\left(\frac{1}{x}\right)\right| \leq |x| \cdot 1 = |x|
$$

Choose $\delta = \epsilon$. If $0 < |x| < \delta$:
$$
\left|f(x) - f(0)\right| = \left|x\sin\left(\frac{1}{x}\right)\right| \leq |x| < \delta = \epsilon
$$

## Important Observations

1. **The role of restrictions:** Often we first restrict $|x - c| < 1$ (or some other value) to bound auxiliary terms, then impose a second restriction to control the error.

2. **Taking minimums:** When multiple restrictions are needed, we take $\delta = \min\{\delta_1, \delta_2, \ldots\}$ to satisfy all simultaneously.

3. **Special cases:** Always check if $c = 0$ or the function has special behavior that simplifies the proof.

4. **Lipschitz continuity:** When $|f(x) - f(c)| \leq K|x - c|$ for some constant $K$, simply choose $\delta = \epsilon/K$.

## Connections to Other Topics

- **Limits:** The epsilon-delta definition of continuity is a special case of the epsilon-delta definition of limits where the limit point is in the domain.

- **Uniform Continuity:** The next topic strengthens epsilon-delta by requiring $\delta$ to depend only on $\epsilon$, not on the point $c$.

- **Metric Spaces:** The epsilon-delta formulation generalizes beautifully to continuity in metric spaces by replacing absolute values with the metric.

- **Analysis:** Mastering epsilon-delta proofs develops the logical precision needed for all advanced analysis.

## Summary

Epsilon-delta proofs formalize the intuition that continuous functions can be made arbitrarily accurate by controlling input precision. The standard strategy involves backward scratch work to discover the appropriate $\delta$, followed by forward verification in the formal proof. For different function classes—linear, polynomial, rational, trigonometric, and compositions—characteristic patterns emerge that make the proofs more routine with practice. The key is understanding the logical structure: given any output tolerance $\epsilon$, we must produce an input tolerance $\delta$ that guarantees it. This framework, while initially challenging, becomes a powerful and elegant tool for rigorous mathematical reasoning.
