---
title: "Uniform Continuity"
slug: "uniform-continuity"
description: "Uniform continuity and distinction from pointwise continuity"
---

# Uniform Continuity

## Introduction

Uniform continuity strengthens the notion of ordinary (pointwise) continuity by requiring that the rate of continuity be uniform across the entire domain. While ordinary continuity allows the choice of $\delta$ to depend on both $\epsilon$ and the specific point $c$, uniform continuity demands that $\delta$ depend only on $\epsilon$, working simultaneously for all points in the domain. This seemingly subtle distinction has profound consequences. Uniformly continuous functions have better global behavior: they cannot oscillate too rapidly, they preserve Cauchy sequences, and they are always continuous on compact sets. The study of uniform continuity reveals the interplay between local and global properties of functions and provides essential tools for advanced analysis, including the theory of metric spaces and functional analysis.

## Formal Definition

**Definition 4.1 (Uniform Continuity):** Let $f: D \to \mathbb{R}$ where $D \subseteq \mathbb{R}$. We say $f$ is **uniformly continuous on $D$** if for every $\epsilon > 0$, there exists $\delta > 0$ such that for all $x, y \in D$:
$$
|x - y| < \delta \implies |f(x) - f(y)| < \epsilon
$$

**Key distinction:** The value of $\delta$ depends only on $\epsilon$, not on the particular points $x$ and $y$.

## Comparison with Pointwise Continuity

To understand the difference, let's write out both definitions carefully:

**Pointwise continuity at every point:**
$$
\forall c \in D, \forall \epsilon > 0, \exists \delta(c, \epsilon) > 0: \forall x \in D, \, |x - c| < \delta \implies |f(x) - f(c)| < \epsilon
$$

**Uniform continuity:**
$$
\forall \epsilon > 0, \exists \delta(\epsilon) > 0: \forall x, y \in D, \, |x - y| < \delta \implies |f(x) - f(y)| < \epsilon
$$

The order of quantifiers is crucial:
- In pointwise continuity, $\delta$ can vary from point to point
- In uniform continuity, a single $\delta$ must work for all points simultaneously

**Proposition 4.1:** If $f$ is uniformly continuous on $D$, then $f$ is continuous on $D$.

**Proof:** Let $c \in D$ and $\epsilon > 0$. By uniform continuity, there exists $\delta > 0$ such that for all $x, y \in D$:
$$
|x - y| < \delta \implies |f(x) - f(y)| < \epsilon
$$

In particular, taking $y = c$, we have: for all $x \in D$,
$$
|x - c| < \delta \implies |f(x) - f(c)| < \epsilon
$$

Therefore $f$ is continuous at $c$. Since $c$ was arbitrary, $f$ is continuous on $D$.

The converse is false, as we'll see in examples.

## Worked Examples

**Example 4.1:** Show that $f(x) = x$ is uniformly continuous on $\mathbb{R}$.

**Proof:** Let $\epsilon > 0$. Choose $\delta = \epsilon$.

For any $x, y \in \mathbb{R}$ with $|x - y| < \delta$:
$$
|f(x) - f(y)| = |x - y| < \delta = \epsilon
$$

Therefore $f$ is uniformly continuous on $\mathbb{R}$.

**Example 4.2:** Show that $f(x) = 3x + 5$ is uniformly continuous on $\mathbb{R}$.

**Proof:** Let $\epsilon > 0$. Choose $\delta = \frac{\epsilon}{3}$.

For any $x, y \in \mathbb{R}$ with $|x - y| < \delta$:
$$
|f(x) - f(y)| = |(3x + 5) - (3y + 5)| = 3|x - y| < 3 \cdot \frac{\epsilon}{3} = \epsilon
$$

**Example 4.3:** Show that $f(x) = x^2$ is NOT uniformly continuous on $\mathbb{R}$.

**Proof:** We show that no $\delta$ works for $\epsilon = 1$.

Suppose, for contradiction, that there exists $\delta > 0$ such that $|x - y| < \delta$ implies $|x^2 - y^2| < 1$ for all $x, y \in \mathbb{R}$.

Choose $n \in \mathbb{N}$ large enough that $n > \frac{1}{\delta}$. Let $x = n$ and $y = n + \frac{\delta}{2}$.

Then $|x - y| = \frac{\delta}{2} < \delta$, but:
$$
|x^2 - y^2| = |n^2 - (n + \delta/2)^2| = |n^2 - n^2 - n\delta - \delta^2/4| = |n\delta + \delta^2/4|
$$
$$
= n\delta + \delta^2/4 > n\delta > \frac{1}{\delta} \cdot \delta = 1
$$

This contradicts our assumption. Therefore $f(x) = x^2$ is not uniformly continuous on $\mathbb{R}$.

**Example 4.4:** Show that $f(x) = x^2$ IS uniformly continuous on $[0, 10]$.

**Proof:** Let $\epsilon > 0$. For $x, y \in [0, 10]$:
$$
|x^2 - y^2| = |x - y| \cdot |x + y| \leq |x - y| \cdot 20
$$

(since $x, y \leq 10$, we have $|x + y| \leq 20$)

Choose $\delta = \frac{\epsilon}{20}$. Then if $|x - y| < \delta$:
$$
|x^2 - y^2| \leq 20|x - y| < 20 \cdot \frac{\epsilon}{20} = \epsilon
$$

Therefore $f(x) = x^2$ is uniformly continuous on $[0, 10]$.

**Example 4.5:** Show that $f(x) = \frac{1}{x}$ is NOT uniformly continuous on $(0, 1)$.

**Proof:** Let $\epsilon = 1$. Suppose there exists $\delta > 0$ such that $|x - y| < \delta$ implies $\left|\frac{1}{x} - \frac{1}{y}\right| < 1$ for all $x, y \in (0, 1)$.

Choose $n$ large enough that $\frac{1}{n} < \delta$. Let $x = \frac{1}{2n}$ and $y = \frac{1}{n}$.

Then $|x - y| = \left|\frac{1}{2n} - \frac{1}{n}\right| = \frac{1}{2n} < \delta$, but:
$$
\left|\frac{1}{x} - \frac{1}{y}\right| = |2n - n| = n
$$

For sufficiently large $n$, this is greater than $1$, contradicting our assumption.

Therefore $f(x) = \frac{1}{x}$ is not uniformly continuous on $(0, 1)$.

**Intuition:** As $x \to 0^+$, the function becomes arbitrarily steep, preventing uniform continuity.

**Example 4.6:** Show that $f(x) = \sin(x)$ is uniformly continuous on $\mathbb{R}$.

**Proof:** We use the fact that $|\sin x - \sin y| \leq |x - y|$ for all $x, y \in \mathbb{R}$ (proven earlier).

Let $\epsilon > 0$. Choose $\delta = \epsilon$.

For any $x, y \in \mathbb{R}$ with $|x - y| < \delta$:
$$
|\sin x - \sin y| \leq |x - y| < \delta = \epsilon
$$

Therefore $\sin x$ is uniformly continuous on $\mathbb{R}$.

## The Uniform Continuity Theorem

The following fundamental theorem guarantees uniform continuity on compact sets:

**Theorem 4.1 (Uniform Continuity Theorem):** If $f: [a, b] \to \mathbb{R}$ is continuous on the closed, bounded interval $[a, b]$, then $f$ is uniformly continuous on $[a, b]$.

**Proof:** Suppose, for contradiction, that $f$ is continuous but not uniformly continuous on $[a, b]$.

Then there exists $\epsilon > 0$ such that for every $\delta > 0$, there exist points $x, y \in [a, b]$ with $|x - y| < \delta$ but $|f(x) - f(y)| \geq \epsilon$.

For each $n \in \mathbb{N}$, let $\delta_n = \frac{1}{n}$ and choose $x_n, y_n \in [a, b]$ such that:
$$
|x_n - y_n| < \frac{1}{n} \quad \text{but} \quad |f(x_n) - f(y_n)| \geq \epsilon
$$

By the Bolzano-Weierstrass Theorem, the bounded sequence $(x_n)$ has a convergent subsequence $(x_{n_k})$ with $x_{n_k} \to c$ for some $c \in [a, b]$.

Since $|y_{n_k} - x_{n_k}| < \frac{1}{n_k} \to 0$, we also have $y_{n_k} \to c$ (by the squeeze theorem applied to $c - \frac{1}{n_k} < y_{n_k} < c + \frac{1}{n_k}$).

Since $f$ is continuous at $c$:
$$
f(x_{n_k}) \to f(c) \quad \text{and} \quad f(y_{n_k}) \to f(c)
$$

Therefore:
$$
|f(x_{n_k}) - f(y_{n_k})| \to |f(c) - f(c)| = 0
$$

But this contradicts the fact that $|f(x_{n_k}) - f(y_{n_k})| \geq \epsilon > 0$ for all $k$.

Therefore $f$ must be uniformly continuous on $[a, b]$.

**Corollary 4.1:** The hypotheses of Theorem 4.1 are necessary:
- Continuity: The function $f(x) = \begin{cases} 0 & x \in [0, 1) \\ 1 & x = 1 \end{cases}$ on $[0, 1]$ is not uniformly continuous (it's not even continuous)
- Closedness: $f(x) = \frac{1}{x}$ on $(0, 1]$ is continuous but not uniformly continuous
- Boundedness: $f(x) = x^2$ on $[0, \infty)$ is continuous but not uniformly continuous

## Lipschitz Continuity

A stronger form of uniform continuity is Lipschitz continuity:

**Definition 4.2 (Lipschitz Continuity):** A function $f: D \to \mathbb{R}$ is **Lipschitz continuous** (or **Lipschitz**) if there exists a constant $K > 0$ such that for all $x, y \in D$:
$$
|f(x) - f(y)| \leq K|x - y|
$$

The smallest such $K$ is called the **Lipschitz constant** of $f$.

**Theorem 4.2:** Every Lipschitz continuous function is uniformly continuous.

**Proof:** Let $f$ be Lipschitz with constant $K$, and let $\epsilon > 0$.

Choose $\delta = \frac{\epsilon}{K}$. Then for any $x, y \in D$ with $|x - y| < \delta$:
$$
|f(x) - f(y)| \leq K|x - y| < K \cdot \frac{\epsilon}{K} = \epsilon
$$

Therefore $f$ is uniformly continuous.

**Example 4.7:** The function $f(x) = 3x + 5$ is Lipschitz with constant $K = 3$, since:
$$
|f(x) - f(y)| = |3x + 5 - 3y - 5| = 3|x - y|
$$

**Example 4.8:** The function $f(x) = \sin x$ is Lipschitz with constant $K = 1$, since:
$$
|\sin x - \sin y| \leq |x - y|
$$

**Example 4.9:** The function $f(x) = \sqrt{x}$ on $[0, \infty)$ is NOT Lipschitz.

**Proof:** Suppose $f$ were Lipschitz with constant $K$. For $x = 0$ and $y = h > 0$:
$$
|\sqrt{h} - 0| \leq K|h - 0|
$$
$$
\sqrt{h} \leq Kh
$$
$$
\frac{1}{\sqrt{h}} \leq K
$$

As $h \to 0^+$, the left side goes to infinity, contradicting the existence of a fixed $K$.

However, $f(x) = \sqrt{x}$ IS uniformly continuous on $[0, \infty)$, showing that uniform continuity is strictly weaker than Lipschitz continuity.

**Example 4.10:** Prove $f(x) = \sqrt{x}$ is uniformly continuous on $[0, \infty)$.

**Proof:** Let $\epsilon > 0$. Choose $\delta = \epsilon^2$.

For $x, y \in [0, \infty)$ with $x \geq y$ and $|x - y| < \delta$:
$$
|\sqrt{x} - \sqrt{y}| = \frac{|x - y|}{\sqrt{x} + \sqrt{y}} \leq \frac{|x - y|}{\sqrt{y}}
$$

If $y \geq \delta$, then:
$$
|\sqrt{x} - \sqrt{y}| \leq \frac{\delta}{\sqrt{\delta}} = \sqrt{\delta} = \epsilon
$$

If $y < \delta$, then since $|x - y| < \delta$, we have $x < 2\delta$, so:
$$
|\sqrt{x} - \sqrt{y}| < \sqrt{x} + \sqrt{y} < 2\sqrt{2\delta} < 2\epsilon
$$

We can refine this argument. Better approach:

**Better proof:** For $x \geq y \geq 0$:
$$
|\sqrt{x} - \sqrt{y}| = \frac{x - y}{\sqrt{x} + \sqrt{y}} \leq \frac{x - y}{\sqrt{y}}
$$

For any $\epsilon > 0$, choose $\delta = \min\{1, \epsilon^2\}$.

If $y \geq 1$, then $|\sqrt{x} - \sqrt{y}| \leq |x - y| < \delta \leq \epsilon^2 < \epsilon$.

If $y < 1$ and $|x - y| < \delta \leq 1$, then $x < 2$, so:
$$
|\sqrt{x} - \sqrt{y}| = \frac{|x - y|}{\sqrt{x} + \sqrt{y}} < \frac{\delta}{\sqrt{y}}
$$

For $y \geq \delta$: $|\sqrt{x} - \sqrt{y}| < \frac{\delta}{\sqrt{\delta}} = \sqrt{\delta} \leq \epsilon$.

For $y < \delta$: $|\sqrt{x} - \sqrt{y}| < \sqrt{x} + \sqrt{y} < \sqrt{2} + \sqrt{\delta} < 2\epsilon$ (for small enough $\delta$).

Actually, the cleanest proof uses:

**Cleanest proof:** For $x, y \geq 0$:
$$
|\sqrt{x} - \sqrt{y}|^2 = |x - y - 2\sqrt{xy}| \leq |x - y|
$$

Wait, that's not quite right. Let's use the standard approach:

For $x \geq y \geq 0$ and any $\epsilon > 0$, choose $\delta = \epsilon^2$. Then:
$$
|\sqrt{x} - \sqrt{y}| = \frac{|x - y|}{\sqrt{x} + \sqrt{y}} \leq \sqrt{|x - y|} < \sqrt{\delta} = \epsilon
$$

where we used $\frac{|x-y|}{\sqrt{x}+\sqrt{y}} \leq \frac{|x-y|}{2\sqrt{y}} \leq \frac{|x-y|}{2\sqrt{|x-y|}} = \frac{\sqrt{|x-y|}}{2}$ for $|x-y|$ small, or more simply:

Since $(\sqrt{x} - \sqrt{y})^2 \leq |\sqrt{x} - \sqrt{y}| \cdot (|\sqrt{x}| + |\sqrt{y}|) = |\sqrt{x} - \sqrt{y}| \cdot (\sqrt{x} + \sqrt{y})$, we have $|\sqrt{x} - \sqrt{y}| \leq \frac{|x-y|}{\sqrt{x}+\sqrt{y}}$.

Most direct: use $|\sqrt{x} - \sqrt{y}| \cdot |\sqrt{x} + \sqrt{y}| = |x - y|$, so $|\sqrt{x} - \sqrt{y}| = \frac{|x-y|}{|\sqrt{x} + \sqrt{y}|}$.

For $\delta = \epsilon^2$ and $|x - y| < \delta$: if $\min\{x, y\} \geq \delta$, then $|\sqrt{x} - \sqrt{y}| < \frac{\delta}{\sqrt{\delta}} = \sqrt{\delta} = \epsilon$.

If $\min\{x,y\} < \delta$, then both $x, y < 2\delta$ (since $|x-y| < \delta$), so $|\sqrt{x} - \sqrt{y}| < 2\sqrt{\delta} = 2\epsilon$. Choosing $\delta = \frac{\epsilon^2}{4}$ handles this.

## Negation and Non-Uniform Continuity

**Theorem 4.3 (Negation):** $f$ is NOT uniformly continuous on $D$ if and only if:

There exist $\epsilon > 0$ and sequences $(x_n), (y_n)$ in $D$ such that $|x_n - y_n| \to 0$ but $|f(x_n) - f(y_n)| \geq \epsilon$ for all $n$.

This provides a practical method for proving non-uniform continuity.

**Example 4.11:** Use Theorem 4.3 to show $f(x) = x^2$ is not uniformly continuous on $\mathbb{R}$.

**Proof:** Let $x_n = n$ and $y_n = n + \frac{1}{n}$.

Then $|x_n - y_n| = \frac{1}{n} \to 0$, but:
$$
|f(x_n) - f(y_n)| = \left|n^2 - \left(n + \frac{1}{n}\right)^2\right| = \left|n^2 - n^2 - 2 - \frac{1}{n^2}\right| = 2 + \frac{1}{n^2} \geq 2
$$

Therefore $f$ is not uniformly continuous on $\mathbb{R}$.

## Important Observations

1. **Uniform continuity is a global property:** Unlike ordinary continuity, which is a local property (depending on behavior near each point), uniform continuity depends on the function's behavior across the entire domain.

2. **Compactness is key:** The Uniform Continuity Theorem shows that continuous functions on compact sets are automatically uniformly continuous. This is one of many special properties of compact sets.

3. **Preservation of Cauchy sequences:** If $f$ is uniformly continuous and $(x_n)$ is a Cauchy sequence, then $(f(x_n))$ is also Cauchy. This property fails for merely continuous functions.

4. **Extension theorem:** If $f$ is uniformly continuous on a dense subset of its domain, it can be uniquely extended to a continuous function on the closure. This is false for ordinary continuous functions.

## Connections to Other Topics

- **Metric Spaces:** Uniform continuity extends naturally to metric spaces, where it's defined using the metrics on the domain and codomain.

- **Compactness:** The Uniform Continuity Theorem is a fundamental result connecting continuity and compactness, previewing deeper results in topology.

- **Completeness:** Uniformly continuous functions preserve Cauchy sequences, connecting to the completeness of metric spaces.

- **Integration:** Uniform continuity ensures that Riemann sums converge uniformly, which is important for the theory of integration.

- **Functional Analysis:** In Banach spaces, uniformly continuous functions play a key role in extension theorems and approximation theory.

## Summary

Uniform continuity strengthens ordinary continuity by requiring a uniform modulus of continuity across the entire domain. While every uniformly continuous function is continuous, the converse fails: functions like $x^2$ on $\mathbb{R}$ or $\frac{1}{x}$ on $(0, 1)$ are continuous but not uniformly continuous. The Uniform Continuity Theorem is a cornerstone result: every continuous function on a closed, bounded interval is uniformly continuous. Lipschitz continuity provides an even stronger condition implying uniform continuity. These concepts reveal the deep interplay between local behavior (continuity at points), global behavior (uniform bounds), and topological structure (compactness), forming essential foundations for advanced analysis.
