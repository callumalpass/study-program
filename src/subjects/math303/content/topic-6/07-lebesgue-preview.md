---
title: "Lebesgue Integration Preview"
slug: "lebesgue-preview"
description: "Motivation for Lebesgue theory"
---

# Lebesgue Integration Preview

## Introduction

While the Riemann integral is powerful and sufficient for many applications, it has significant limitations. These limitations motivate the development of Lebesgue integration, a more general theory that addresses the Riemann integral's shortcomings. This section provides a preview of Lebesgue theory, highlighting the problems with Riemann integration and sketching how Lebesgue's approach resolves them. A full treatment requires measure theory, which is typically covered in graduate analysis courses.

## Limitations of the Riemann Integral

### Problem 1: Limited Class of Integrable Functions

**Issue:** The Riemann integral can only handle functions with "not too many" discontinuities. Specifically, Riemann's criterion states that a bounded function is Riemann integrable if and only if its set of discontinuities has measure zero.

**Example 7.1 (Dirichlet Function):** Recall that the Dirichlet function:
$$
f(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q} \end{cases}
$$
is not Riemann integrable on $[0,1]$ because it is discontinuous everywhere.

However, from a measure-theoretic perspective, $f$ equals 0 "almost everywhere" (since the rationals have measure zero), so intuitively $\int_0^1 f$ "should" equal 0. The Lebesgue integral makes this precise.

### Problem 2: Interchange of Limits

**Issue:** The Riemann integral does not behave well with respect to limits of sequences.

**Example 7.2:** Define $f_n: [0,1] \to \mathbb{R}$ by:
$$
f_n(x) = \begin{cases} n^2 & 0 < x \leq 1/n \\ 0 & \text{otherwise} \end{cases}
$$

Each $f_n$ is Riemann integrable with $\int_0^1 f_n = n$. The pointwise limit is:
$$
f(x) = \lim_{n \to \infty} f_n(x) = 0 \text{ for all } x \in [0,1]
$$

We have $\int_0^1 f = 0$, but $\lim_{n \to \infty} \int_0^1 f_n = \lim_{n \to \infty} n = \infty \neq 0$.

Thus: $\int_0^1 \lim_{n \to \infty} f_n \neq \lim_{n \to \infty} \int_0^1 f_n$.

The Riemann integral lacks good convergence theorems. We need conditions like uniform convergence, which are often too restrictive.

### Problem 3: Non-Completeness

**Issue:** The space of Riemann integrable functions is not complete.

If $\{f_n\}$ is a Cauchy sequence of Riemann integrable functions (in the $L^1$ norm), the limit function need not be Riemann integrable.

**Example 7.3:** Consider a sequence of continuous functions on $[0,1]$ that converges (in $L^1$) to the Dirichlet function. Each function in the sequence is Riemann integrable, but the limit is not.

## The Lebesgue Approach: Measuring Sets First

### The Key Idea

**Riemann's approach:** Partition the domain (the $x$-axis) into intervals.

**Lebesgue's approach:** Partition the range (the $y$-axis) and measure the sets where the function takes values in each interval.

For the Riemann integral of $f$ on $[a,b]$, we compute:
$$
\sum_{i=1}^n f(t_i) \Delta x_i
$$

For the Lebesgue integral, we essentially compute:
$$
\sum_{j=1}^m y_j \cdot \mu(\{x : f(x) \approx y_j\})
$$

where $\mu$ denotes "measure" (a generalization of length).

**Analogy:** Suppose you want to count the total value of coins in a jar.
- **Riemann method:** Pick up coins one by one, note each value, and sum.
- **Lebesgue method:** Sort coins by denomination, count how many of each type, then compute (number of pennies)×1¢ + (number of nickels)×5¢ + ...

### Measure Zero Sets

**Definition 7.4 (Informal):** A set $E \subseteq \mathbb{R}$ has **measure zero** if for every $\epsilon > 0$, we can cover $E$ by countably many intervals whose total length is less than $\epsilon$.

**Examples:**
- Finite sets have measure zero
- Countable sets (like $\mathbb{Q}$) have measure zero
- The Cantor set has measure zero (despite being uncountable)
- Any interval $[a,b]$ with $a < b$ does NOT have measure zero

**Key Insight:** A property holds **almost everywhere** (a.e.) if it holds except on a set of measure zero.

For Lebesgue integration, functions that differ only on a measure zero set are considered the same.

## The Lebesgue Integral: Informal Definition

**Step 1:** For a "simple" function $s$ that takes only finitely many values $y_1, \ldots, y_n$ on measurable sets $E_1, \ldots, E_n$:
$$
\int s \, d\mu = \sum_{i=1}^n y_i \mu(E_i)
$$

**Step 2:** For a general non-negative measurable function $f$, approximate it from below by simple functions:
$$
\int f \, d\mu = \sup\left\{\int s \, d\mu : s \text{ simple, } s \leq f\right\}
$$

**Step 3:** For a general function $f$, write $f = f^+ - f^-$ where:
$$
f^+(x) = \max\{f(x), 0\}, \quad f^-(x) = \max\{-f(x), 0\}
$$

Then define:
$$
\int f \, d\mu = \int f^+ \, d\mu - \int f^- \, d\mu
$$

provided both integrals are finite.

## Advantages of the Lebesgue Integral

### Advantage 1: Larger Class of Integrable Functions

Every Riemann integrable function is Lebesgue integrable, but not conversely.

**Example 7.5:** The Dirichlet function is Lebesgue integrable with:
$$
\int_0^1 f \, d\mu = 0
$$

This makes sense: the function is 1 on $\mathbb{Q} \cap [0,1]$ (measure zero) and 0 on the irrationals (measure 1).

### Advantage 2: Powerful Convergence Theorems

**Theorem 7.6 (Monotone Convergence Theorem):** If $0 \leq f_1 \leq f_2 \leq \cdots$ and $f_n \to f$ pointwise, then:
$$
\lim_{n \to \infty} \int f_n \, d\mu = \int f \, d\mu
$$

**Theorem 7.7 (Dominated Convergence Theorem):** If $f_n \to f$ pointwise a.e., and $|f_n| \leq g$ for some integrable $g$, then:
$$
\lim_{n \to \infty} \int f_n \, d\mu = \int f \, d\mu
$$

These theorems have no direct Riemann analogues and are enormously powerful in analysis.

### Advantage 3: Completeness

**Theorem 7.8:** The space $L^1(\mu)$ of Lebesgue integrable functions (modulo functions that are zero a.e.) is a complete metric space under the $L^1$ norm:
$$
\|f\|_1 = \int |f| \, d\mu
$$

This completeness is crucial for functional analysis and probability theory.

### Advantage 4: Fubini's Theorem

**Theorem 7.9 (Fubini):** Under suitable conditions, for a function $f(x,y)$ on $\mathbb{R}^2$:
$$
\int \left(\int f(x,y) \, dy\right) dx = \int \left(\int f(x,y) \, dx\right) dy = \int f \, d\mu
$$

where the last integral is over $\mathbb{R}^2$. The Lebesgue theory provides precise conditions for when iterated integrals can be interchanged.

## Measurable Functions

**Definition 7.10 (Informal):** A function $f: \mathbb{R} \to \mathbb{R}$ is **measurable** if for every $a \in \mathbb{R}$, the set $\{x : f(x) > a\}$ is measurable.

**Key Facts:**
- Continuous functions are measurable
- Limits of measurable functions are measurable
- The Dirichlet function is measurable
- Measurability is the right notion for Lebesgue integration (analogous to how continuity is natural for Riemann integration)

## Lebesgue Measure on $\mathbb{R}$

**Informal Definition:** Lebesgue measure $\mu$ on $\mathbb{R}$ assigns to "measurable sets" a non-negative extended real number satisfying:

1. **Translation invariance:** $\mu(E + x) = \mu(E)$ for all $x \in \mathbb{R}$
2. **Countable additivity:** If $E_1, E_2, \ldots$ are disjoint, then:
$$
\mu\left(\bigcup_{i=1}^\infty E_i\right) = \sum_{i=1}^\infty \mu(E_i)
$$
3. **Normalization:** $\mu([0,1]) = 1$

**Result:** For an interval, $\mu((a,b)) = b - a$ (measure equals length).

Not all sets are measurable (using the Axiom of Choice), but all "reasonable" sets are.

## Comparison with Riemann Integration

| Feature | Riemann | Lebesgue |
|---------|---------|----------|
| **Basic idea** | Partition domain | Partition range |
| **Integrable functions** | Continuous + some discontinuous | All measurable (broader class) |
| **Limit theorems** | Restrictive (uniform convergence) | Powerful (MCT, DCT) |
| **Completeness** | Not complete | Complete |
| **Function space** | $\mathcal{R}[a,b]$ | $L^1(\mu)$ |
| **Difficulty** | Elementary | Requires measure theory |

**Theorem 7.11:** If $f$ is Riemann integrable on $[a,b]$, then $f$ is Lebesgue integrable, and the two integrals agree:
$$
\int_a^b f(x) \, dx = \int_{[a,b]} f \, d\mu
$$

## Why Study Riemann Integration First?

Given the superiority of Lebesgue integration, why study Riemann integration?

1. **Historical importance:** Riemann integration was developed first and influenced much of 19th-century analysis
2. **Sufficient for many applications:** Most functions encountered in elementary calculus are Riemann integrable
3. **Pedagogical value:** The Riemann integral provides intuition and is more elementary
4. **Connection to applications:** Riemann sums directly model physical quantities like work, area, etc.
5. **Foundation:** Understanding Riemann integration prepares for Lebesgue theory

## Further Study

A complete treatment of Lebesgue integration requires:

1. **Measure theory:** σ-algebras, measurable sets, measures
2. **Measurable functions:** Properties, limits, simple functions
3. **The Lebesgue integral:** Construction, properties, convergence theorems
4. **$L^p$ spaces:** Norms, completeness, duality
5. **Differentiation:** Lebesgue differentiation theorem, fundamental theorem
6. **Product measures:** Fubini's theorem, Tonelli's theorem

These topics are typically covered in a graduate real analysis course (e.g., Rudin's "Real and Complex Analysis" or Folland's "Real Analysis").

## Exercises

1. Give an example of a bounded function on $[0,1]$ that is Lebesgue integrable but not Riemann integrable.

2. Explain why the function $f(x) = 0$ for $x \in \mathbb{Q}$ and $f(x) = 1$ for $x \notin \mathbb{Q}$ should have Lebesgue integral equal to 1 on $[0,1]$.

3. Consider $f_n(x) = n\chi_{[0,1/n]}(x)$ where $\chi_A$ is the indicator function of set $A$. Compute $\lim_{n \to \infty} \int_0^1 f_n$ (Riemann) and explain why this doesn't equal $\int_0^1 \lim_{n \to \infty} f_n$.

4. Why is countable additivity (rather than just finite additivity) important for measure theory?

5. Research: What is the Axiom of Choice, and why is it needed to construct non-measurable sets?

6. If $f$ and $g$ differ only on a countable set, explain why they have the same Lebesgue integral.

7. Give an intuitive explanation for why the Cantor set has Lebesgue measure zero despite being uncountable.

8. Read about the Banach-Tarski paradox and explain how it relates to the impossibility of extending Lebesgue measure to all subsets of $\mathbb{R}^3$.

## Conclusion

The Lebesgue integral represents a profound generalization of Riemann integration, addressing its fundamental limitations while retaining its essential properties. By measuring sets in the range rather than partitioning the domain, Lebesgue created a theory that handles a much wider class of functions and provides powerful convergence theorems essential for modern analysis. While the Riemann integral suffices for most elementary applications and provides important geometric intuition, the Lebesgue integral is indispensable for probability theory, functional analysis, harmonic analysis, and many other areas of mathematics. The journey from Riemann to Lebesgue integration illustrates how mathematical concepts evolve to address limitations and create more powerful, general frameworks.
