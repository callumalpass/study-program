---
title: "Intermediate Value Theorem"
slug: "intermediate-value"
description: "The intermediate value property and its applications"
---

# Intermediate Value Theorem

## Introduction

The Intermediate Value Theorem (IVT) is one of the most intuitive and powerful results in real analysis. It formalizes the idea that a continuous function cannot "jump" over values—if it starts below a target value and ends above it, it must pass through that value at some point. This seemingly simple observation has profound consequences: it guarantees the existence of roots of equations, fixed points of functions, and solutions to many applied problems. The IVT is fundamentally a topological result, relying on the completeness of the real numbers and the connectedness of intervals. It exemplifies how continuity translates geometric intuition into rigorous mathematics, providing existence proofs for solutions we cannot necessarily compute explicitly. The theorem and its applications are essential throughout mathematics, from pure analysis to numerical methods and differential equations.

## Statement of the Theorem

**Theorem 5.1 (Intermediate Value Theorem):** Let $f: [a, b] \to \mathbb{R}$ be continuous on the closed interval $[a, b]$. If $k$ is any value between $f(a)$ and $f(b)$ (i.e., either $f(a) < k < f(b)$ or $f(b) < k < f(a)$), then there exists at least one point $c \in (a, b)$ such that:
$$
f(c) = k
$$

In other words, a continuous function on a closed interval takes on every value between its values at the endpoints.

## Proof of the Intermediate Value Theorem

**Proof:** Without loss of generality, assume $f(a) < k < f(b)$ (the case $f(b) < k < f(a)$ is similar).

Define the set:
$$
S = \{x \in [a, b] : f(x) < k\}
$$

**Claim 1:** $S$ is non-empty and bounded above.

Since $f(a) < k$, we have $a \in S$, so $S \neq \emptyset$. Also, $S \subseteq [a, b]$, so $S$ is bounded above by $b$.

By the Completeness Axiom of $\mathbb{R}$, the supremum exists. Define:
$$
c = \sup S
$$

Note that $a \leq c \leq b$ since $a \in S$ and $b$ is an upper bound for $S$.

**Claim 2:** $f(c) = k$.

We prove this by ruling out the other two possibilities.

**Case 1:** Suppose $f(c) < k$.

Since $f$ is continuous at $c$, for $\epsilon = k - f(c) > 0$, there exists $\delta > 0$ such that:
$$
|x - c| < \delta \implies |f(x) - f(c)| < \epsilon = k - f(c)
$$

In particular, for $x \in (c, c + \delta) \cap [a, b]$ (which is non-empty if $c < b$):
$$
f(x) < f(c) + (k - f(c)) = k
$$

This means $x \in S$ for $x \in (c, c + \delta)$, contradicting the fact that $c$ is an upper bound for $S$.

If $c = b$, then $f(b) < k$, contradicting our assumption that $f(b) > k$.

**Case 2:** Suppose $f(c) > k$.

Since $f$ is continuous at $c$, for $\epsilon = f(c) - k > 0$, there exists $\delta > 0$ such that:
$$
|x - c| < \delta \implies |f(x) - f(c)| < \epsilon = f(c) - k
$$

In particular, for $x \in (c - \delta, c) \cap [a, b]$:
$$
f(x) > f(c) - (f(c) - k) = k
$$

This means that $f(x) > k$ for all $x \in (c - \delta, c)$, so no points in this interval can be in $S$. Therefore $c - \delta$ is also an upper bound for $S$, contradicting the fact that $c = \sup S$ is the least upper bound.

**Conclusion:** Since both $f(c) < k$ and $f(c) > k$ lead to contradictions, we must have $f(c) = k$.

Moreover, since $a \in S$ (so $c \geq a$) and $f(b) > k$ (so $c < b$), we have $c \in (a, b)$ as claimed.

## Corollaries and Immediate Consequences

**Corollary 5.1 (Zero-Finding):** If $f: [a, b] \to \mathbb{R}$ is continuous and $f(a)$ and $f(b)$ have opposite signs (i.e., $f(a) \cdot f(b) < 0$), then there exists $c \in (a, b)$ such that $f(c) = 0$.

**Proof:** Apply the IVT with $k = 0$.

**Corollary 5.2 (Preservation of Intervals):** If $f: I \to \mathbb{R}$ is continuous where $I$ is an interval, then $f(I)$ is also an interval.

**Proof:** Let $y_1, y_2 \in f(I)$ with $y_1 < y_2$, and let $y \in (y_1, y_2)$. We need to show $y \in f(I)$.

Since $y_1, y_2 \in f(I)$, there exist $x_1, x_2 \in I$ with $f(x_1) = y_1$ and $f(x_2) = y_2$.

Since $I$ is an interval and $x_1, x_2 \in I$, the closed interval $[x_1, x_2]$ (or $[x_2, x_1]$ if $x_2 < x_1$) is contained in $I$.

By the IVT applied to $f$ on this interval, there exists $c$ between $x_1$ and $x_2$ such that $f(c) = y$.

Therefore $y \in f(I)$, proving that $f(I)$ is an interval.

**Corollary 5.3 (Intermediate Value Property):** A function $f$ satisfies the **Intermediate Value Property (IVP)** if whenever $f(a) < k < f(b)$ for $a < b$, there exists $c \in (a, b)$ with $f(c) = k$.

Every continuous function has the IVP, but the converse is false (see Darboux's Theorem below).

## Worked Examples

**Example 5.1:** Show that the equation $x^5 + x - 1 = 0$ has a solution in $(0, 1)$.

**Solution:** Let $f(x) = x^5 + x - 1$. Then $f$ is a polynomial, hence continuous on $\mathbb{R}$.

Evaluate at the endpoints:
- $f(0) = 0 + 0 - 1 = -1 < 0$
- $f(1) = 1 + 1 - 1 = 1 > 0$

Since $f(0) < 0 < f(1)$ and $f$ is continuous, by the IVT (Corollary 5.1), there exists $c \in (0, 1)$ such that $f(c) = 0$.

Therefore the equation has a solution in $(0, 1)$.

**Example 5.2:** Prove that every polynomial of odd degree has at least one real root.

**Proof:** Let $p(x) = a_nx^n + a_{n-1}x^{n-1} + \cdots + a_1x + a_0$ where $n$ is odd and $a_n \neq 0$.

Factor out the leading term:
$$
p(x) = x^n\left(a_n + \frac{a_{n-1}}{x} + \cdots + \frac{a_0}{x^n}\right)
$$

As $x \to +\infty$:
- If $a_n > 0$, then $p(x) \to +\infty$ (since $n$ is odd, $x^n \to +\infty$)
- If $a_n < 0$, then $p(x) \to -\infty$

As $x \to -\infty$:
- If $a_n > 0$, then $p(x) \to -\infty$ (since $n$ is odd, $(-x)^n \to -\infty$)
- If $a_n < 0$, then $p(x) \to +\infty$

In either case, for sufficiently large $|x|$, $p(x)$ takes both positive and negative values.

Therefore, there exist $a, b \in \mathbb{R}$ with $a < b$ such that $p(a) < 0 < p(b)$ (or vice versa).

By the IVT, there exists $c \in (a, b)$ with $p(c) = 0$.

**Example 5.3:** Prove that $\sqrt{2}$ exists.

**Proof:** Define $f: [0, 2] \to \mathbb{R}$ by $f(x) = x^2 - 2$.

Then $f$ is continuous (polynomial), and:
- $f(0) = -2 < 0$
- $f(2) = 4 - 2 = 2 > 0$

By the IVT, there exists $c \in (0, 2)$ such that $f(c) = 0$, i.e., $c^2 = 2$.

Therefore $\sqrt{2} = c$ exists.

**Example 5.4:** Let $f: [0, 1] \to [0, 1]$ be continuous. Prove that $f$ has a fixed point, i.e., there exists $c \in [0, 1]$ such that $f(c) = c$.

**Proof:** Define $g(x) = f(x) - x$ for $x \in [0, 1]$.

Then $g$ is continuous (difference of continuous functions), and:
- $g(0) = f(0) - 0 = f(0) \geq 0$
- $g(1) = f(1) - 1 \leq 0$ (since $f(1) \in [0, 1]$)

**Case 1:** If $g(0) = 0$, then $f(0) = 0$, so $0$ is a fixed point.

**Case 2:** If $g(1) = 0$, then $f(1) = 1$, so $1$ is a fixed point.

**Case 3:** If $g(0) > 0$ and $g(1) < 0$, then by the IVT, there exists $c \in (0, 1)$ such that $g(c) = 0$, i.e., $f(c) = c$.

In all cases, a fixed point exists.

**Remark:** This is a special case of Brouwer's Fixed Point Theorem in one dimension.

**Example 5.5:** Show that if $f: [0, 1] \to \mathbb{R}$ is continuous with $f(0) = f(1)$, then for any $n \in \mathbb{N}$, there exist points $a, b \in [0, 1]$ with $|a - b| = \frac{1}{n}$ and $f(a) = f(b)$.

**Proof:** Define $g(x) = f(x + \frac{1}{n}) - f(x)$ for $x \in [0, 1 - \frac{1}{n}]$.

Then $g$ is continuous. Consider:
$$
\sum_{k=0}^{n-1} g\left(\frac{k}{n}\right) = \sum_{k=0}^{n-1} \left[f\left(\frac{k+1}{n}\right) - f\left(\frac{k}{n}\right)\right]
$$

This is a telescoping sum:
$$
= f\left(\frac{n}{n}\right) - f\left(\frac{0}{n}\right) = f(1) - f(0) = 0
$$

Since the sum of $n$ numbers is zero, they cannot all have the same sign. Therefore, either:
1. Some $g(\frac{k}{n}) = 0$, or
2. Some are positive and some are negative

In case (1), we have $f(\frac{k}{n} + \frac{1}{n}) = f(\frac{k}{n})$, so we can take $a = \frac{k}{n}$ and $b = \frac{k+1}{n}$.

In case (2), by the IVT applied to $g$ on an interval where it changes sign, there exists $c$ with $g(c) = 0$, giving $f(c + \frac{1}{n}) = f(c)$.

## Applications

**Application 5.1 (Bisection Method):** The IVT provides the theoretical foundation for the bisection method of numerical root-finding.

If $f$ is continuous on $[a, b]$ with $f(a) \cdot f(b) < 0$:
1. Compute $m = \frac{a + b}{2}$
2. If $f(m) = 0$, we've found a root
3. If $f(m) \cdot f(a) < 0$, replace $[a, b]$ with $[a, m]$
4. If $f(m) \cdot f(b) < 0$, replace $[a, b]$ with $[m, b]$
5. Repeat

This produces a sequence of nested intervals, each half the length of the previous, all containing a root. The sequence of midpoints converges to a root.

**Application 5.2 (Connectedness):** In topology, the IVT is equivalent to the statement that intervals are connected: they cannot be written as a union of two disjoint non-empty open sets.

**Application 5.3 (Calculus):** The IVT is used to prove that derivatives satisfy the intermediate value property (Darboux's Theorem), even though derivatives need not be continuous.

## Darboux's Theorem

While continuous functions satisfy the IVP, the converse is false. A famous example is:

**Theorem 5.2 (Darboux's Theorem):** If $f$ is differentiable on $[a, b]$, then $f'$ satisfies the Intermediate Value Property, even if $f'$ is not continuous.

**Proof sketch:** Suppose $f'(a) < k < f'(b)$. Define $g(x) = f(x) - kx$.

Then $g$ is differentiable with $g'(a) = f'(a) - k < 0$ and $g'(b) = f'(b) - k > 0$.

By the definition of derivative, near $a$, $g$ is decreasing (since $g'(a) < 0$), and near $b$, $g$ is increasing (since $g'(b) > 0$).

Therefore $g$ has a local minimum at some point $c \in (a, b)$. At this minimum, $g'(c) = 0$, so:
$$
f'(c) = k
$$

**Example 5.6:** The function:
$$
f(x) = \begin{cases}
x^2\sin(1/x) & x \neq 0 \\
0 & x = 0
\end{cases}
$$

is differentiable everywhere, with:
$$
f'(x) = \begin{cases}
2x\sin(1/x) - \cos(1/x) & x \neq 0 \\
0 & x = 0
\end{cases}
$$

The derivative $f'$ satisfies the IVP but is not continuous at $x = 0$ (since $\cos(1/x)$ oscillates as $x \to 0$).

## Important Observations

1. **Existence, not uniqueness:** The IVT guarantees that intermediate values are attained, but says nothing about uniqueness. There may be multiple points where $f(c) = k$.

2. **Closed intervals:** The theorem requires a closed interval $[a, b]$. On open intervals, the conclusion may fail (e.g., $f(x) = x$ on $(0, 1)$ takes all values in $(0, 1)$ but not the endpoints).

3. **Completeness:** The proof crucially uses the completeness of $\mathbb{R}$ (via the supremum). The IVT fails over the rationals: $f(x) = x^2 - 2$ is continuous with $f(0) = -2$ and $f(2) = 2$, but there is no $c \in \mathbb{Q}$ with $f(c) = 0$.

4. **Connectedness:** The IVT is fundamentally about the connectedness of intervals. It fails for disconnected sets like $[0, 1] \cup [2, 3]$.

## Connections to Other Topics

- **Completeness of $\mathbb{R}$:** The proof uses the supremum, which exists due to the Completeness Axiom. This is essential—the IVT fails in $\mathbb{Q}$.

- **Topology:** The IVT generalizes to: continuous images of connected sets are connected. Intervals are the connected subsets of $\mathbb{R}$.

- **Fixed Point Theorems:** The fixed point application is a one-dimensional case of more general results like Brouwer's and Banach's fixed point theorems.

- **Numerical Analysis:** The IVT justifies bisection and other root-finding methods.

- **Differential Equations:** Existence theorems for differential equations often use IVT-type arguments.

- **Darboux Functions:** Functions satisfying the IVP but not continuous are called Darboux functions. Derivatives are always Darboux functions.

## Summary

The Intermediate Value Theorem asserts that continuous functions on closed intervals cannot skip values—they must take on every intermediate value between their endpoint values. The proof ingeniously uses the completeness of the real numbers to locate a supremum that must equal the target value. This seemingly simple result has far-reaching consequences: it proves existence of roots for polynomials and other equations, guarantees fixed points for continuous maps on intervals, and provides the theoretical foundation for numerical root-finding algorithms. The theorem exemplifies how topological properties (connectedness of intervals) combine with analytical properties (continuity) to yield powerful existence results. While the IVT guarantees existence, it rarely provides a constructive method for finding solutions, making it a quintessentially non-constructive result in classical analysis.
