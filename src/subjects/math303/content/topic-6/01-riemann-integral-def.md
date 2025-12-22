---
title: "Riemann Integral: Definition"
slug: "riemann-integral-def"
description: "Riemann sums, partitions, and the formal definition of the Riemann integral"
---

# Riemann Integral: Definition

## Introduction and Motivation

The integral is one of the central concepts in mathematics, formalizing the intuitive notion of "area under a curve." While calculus courses often present integration as the reverse of differentiation (via antiderivatives), a rigorous treatment requires us to define the integral independently and then prove its connection to differentiation through the Fundamental Theorem of Calculus.

The Riemann integral, developed by Bernhard Riemann in the 1850s, accomplishes this by approximating areas with rectangles and taking a limit. This approach provides both geometric intuition and mathematical rigor.

## Partitions of an Interval

**Definition:** A **partition** of a closed interval $[a, b]$ is a finite set of points:
$$
P = \{x_0, x_1, x_2, \ldots, x_n\}
$$
satisfying:
$$
a = x_0 < x_1 < x_2 < \cdots < x_n = b
$$

The partition divides $[a, b]$ into $n$ subintervals $[x_{i-1}, x_i]$ for $i = 1, 2, \ldots, n$.

**Definition:** The **width** of the $i$-th subinterval is:
$$
\Delta x_i = x_i - x_{i-1}
$$

**Definition:** The **mesh** (or **norm**) of a partition $P$ is the length of its longest subinterval:
$$
\|P\| = \max_{1 \leq i \leq n} \Delta x_i
$$

The mesh measures how "fine" the partition is—a smaller mesh means more, smaller subintervals.

**Example 1:** The uniform partition of $[0, 1]$ into $n$ equal parts has:
$$
P = \{0, 1/n, 2/n, \ldots, (n-1)/n, 1\}
$$
with $\Delta x_i = 1/n$ for all $i$, and mesh $\|P\| = 1/n$.

**Example 2:** The partition $P = \{0, 0.1, 0.5, 0.6, 1\}$ of $[0, 1]$ has:
- $\Delta x_1 = 0.1$, $\Delta x_2 = 0.4$, $\Delta x_3 = 0.1$, $\Delta x_4 = 0.4$
- Mesh $\|P\| = 0.4$

## Riemann Sums

Given a bounded function $f: [a, b] \to \mathbb{R}$ and a partition $P$, we approximate the "area" by summing the areas of rectangles.

**Definition:** A **tagged partition** is a partition $P$ together with a choice of sample points $t_i \in [x_{i-1}, x_i]$ for each subinterval. We denote this as $(P, \{t_i\})$.

**Definition:** The **Riemann sum** for $f$ with tagged partition $(P, \{t_i\})$ is:
$$
S(f, P, \{t_i\}) = \sum_{i=1}^{n} f(t_i) \Delta x_i
$$

Geometrically, each term $f(t_i) \Delta x_i$ is the signed area of a rectangle with base $\Delta x_i$ and height $f(t_i)$.

**Special Cases:**
- **Left Riemann sum:** $t_i = x_{i-1}$ (left endpoints)
- **Right Riemann sum:** $t_i = x_i$ (right endpoints)
- **Midpoint Riemann sum:** $t_i = (x_{i-1} + x_i)/2$ (midpoints)

**Example 3:** For $f(x) = x^2$ on $[0, 1]$ with uniform partition into $n$ parts and right endpoints:
$$
S(f, P, \{t_i\}) = \sum_{i=1}^{n} \left(\frac{i}{n}\right)^2 \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{i=1}^{n} i^2 = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6}
$$

As $n \to \infty$, this approaches $\frac{1}{3}$, which is indeed $\int_0^1 x^2 \, dx$.

## The Riemann Integral: Definition

**Definition (Riemann Integrability):** A bounded function $f: [a, b] \to \mathbb{R}$ is **Riemann integrable** on $[a, b]$ if there exists a number $I$ such that: for every $\epsilon > 0$, there exists $\delta > 0$ such that for any tagged partition $(P, \{t_i\})$ with mesh $\|P\| < \delta$:
$$
|S(f, P, \{t_i\}) - I| < \epsilon
$$

When this condition holds, we write:
$$
I = \int_a^b f(x) \, dx \quad \text{or simply} \quad I = \int_a^b f
$$

**Key Insight:** This definition requires the Riemann sums to converge to $I$ uniformly over all possible choices of sample points $\{t_i\}$, not just for one specific choice like left or right endpoints.

## Upper and Lower Sums (Darboux Approach)

An equivalent and often more practical approach uses upper and lower sums, which avoid the dependence on sample points.

**Definition:** For a bounded function $f$ and partition $P$, define for each subinterval:
$$
M_i = \sup\{f(x) : x \in [x_{i-1}, x_i]\}, \quad m_i = \inf\{f(x) : x \in [x_{i-1}, x_i]\}
$$

**Definition:** The **upper sum** and **lower sum** for $f$ with partition $P$ are:
$$
U(f, P) = \sum_{i=1}^{n} M_i \Delta x_i, \quad L(f, P) = \sum_{i=1}^{n} m_i \Delta x_i
$$

**Observation:** For any tagged partition $(P, \{t_i\})$:
$$
L(f, P) \leq S(f, P, \{t_i\}) \leq U(f, P)
$$

since $m_i \leq f(t_i) \leq M_i$ for each $i$.

**Definition:** The **upper integral** and **lower integral** are:
$$
\overline{\int_a^b} f = \inf_P U(f, P), \quad \underline{\int_a^b} f = \sup_P L(f, P)
$$

## The Darboux Criterion

**Theorem (Darboux Criterion):** A bounded function $f: [a, b] \to \mathbb{R}$ is Riemann integrable if and only if:
$$
\overline{\int_a^b} f = \underline{\int_a^b} f
$$

When this holds, the common value equals $\int_a^b f$.

**Proof Sketch:** If $f$ is Riemann integrable with integral $I$, then for any $\epsilon > 0$, Riemann sums can be made within $\epsilon$ of $I$. Since $L(f, P) \leq S \leq U(f, P)$, we get $|U(f, P) - L(f, P)| < 2\epsilon$ for fine enough partitions, forcing $\overline{\int} = \underline{\int}$.

Conversely, if $\overline{\int} = \underline{\int} = I$, then for any $\epsilon > 0$, we can find $P$ with $U(f, P) - L(f, P) < \epsilon$, and any Riemann sum for this partition lies between $L$ and $U$, hence within $\epsilon$ of $I$. □

## Examples of Riemann Integrable and Non-Integrable Functions

**Example 4 (Constant Function):** $f(x) = c$ on $[a, b]$.

For any partition: $M_i = m_i = c$, so $U(f, P) = L(f, P) = c(b-a)$.
Hence $\int_a^b c \, dx = c(b-a)$.

**Example 5 (Identity Function):** $f(x) = x$ on $[a, b]$.

With uniform partition into $n$ parts:
$$
L(f, P) = \sum_{i=1}^{n} x_{i-1} \cdot \frac{b-a}{n}, \quad U(f, P) = \sum_{i=1}^{n} x_i \cdot \frac{b-a}{n}
$$

As $n \to \infty$, both converge to $\frac{b^2 - a^2}{2}$, confirming $\int_a^b x \, dx = \frac{b^2 - a^2}{2}$.

**Example 6 (Dirichlet Function):** $f(x) = \mathbf{1}_{\mathbb{Q}}(x)$ (1 if $x$ is rational, 0 otherwise).

For any partition:
- $M_i = 1$ (every subinterval contains rationals)
- $m_i = 0$ (every subinterval contains irrationals)

Hence $U(f, P) = b - a$ and $L(f, P) = 0$ for all $P$.
Since $\overline{\int} = b - a \neq 0 = \underline{\int}$, the Dirichlet function is **not Riemann integrable**.

**Example 7 (Step Function):** Functions with finitely many jump discontinuities are Riemann integrable—the contribution from the discontinuity subintervals can be made arbitrarily small.

## Key Takeaways

- A **partition** divides $[a, b]$ into subintervals; the **mesh** is the length of the longest subinterval.
- **Riemann sums** approximate the integral by summing $f(t_i) \Delta x_i$ over subintervals.
- $f$ is **Riemann integrable** if Riemann sums converge to a single value as mesh $\to 0$, uniformly over all sample point choices.
- **Upper and lower sums** bound Riemann sums and provide the **Darboux criterion**: $f$ is integrable iff $\overline{\int} = \underline{\int}$.
- Continuous functions are Riemann integrable; the Dirichlet function is not.

## Common Mistakes to Avoid

1. **Assuming all bounded functions are integrable:** The Dirichlet function is bounded but not Riemann integrable.

2. **Using only left or right Riemann sums:** The definition requires convergence for all choices of sample points, not just specific ones.

3. **Forgetting boundedness:** Riemann integrability requires $f$ to be bounded on $[a, b]$; unbounded functions require improper integrals.

4. **Confusing upper/lower sums with max/min Riemann sums:** Upper sums use suprema over each subinterval, not just the maximum sample point.
