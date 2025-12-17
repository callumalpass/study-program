---
title: "Examples of Continuous Functions"
slug: "continuous-examples"
description: "Comprehensive collection of examples illustrating continuous and discontinuous functions"
order: 7
---

# Examples of Continuous Functions

## Introduction

This section provides a comprehensive collection of examples of continuous and discontinuous functions. Understanding these examples is crucial for developing intuition about continuity in topological spaces.

## Polynomial and Rational Functions

**Example 7.1:** Every polynomial $p: \mathbb{R} \to \mathbb{R}$ is continuous.

**Proof:** Polynomials are continuous in the calculus sense, which implies topological continuity. Alternatively, constant functions and the identity are continuous, and sums and products of continuous functions are continuous. $\square$

**Example 7.2:** Every rational function $r(x) = p(x)/q(x)$ (where $p, q$ are polynomials) is continuous on its domain $\{x : q(x) \neq 0\}$.

**Example 7.3:** The function $f: \mathbb{R}^2 \to \mathbb{R}$ given by $f(x, y) = x^2 + y^2$ is continuous.

**Proof:** For any open interval $(a, b) \subseteq \mathbb{R}$:
$$f^{-1}((a, b)) = \{(x, y) : a < x^2 + y^2 < b\}$$

This is an open annulus (or disk, or empty set), which is open in $\mathbb{R}^2$. $\square$

## Piecewise Functions

**Example 7.4:** The absolute value function $f: \mathbb{R} \to \mathbb{R}$ given by $f(x) = |x|$ is continuous.

**Proof:** $f(x) = \max\{x, -x\}$, and maximum of continuous functions is continuous. Alternatively, verify directly using open sets or the $\epsilon$-$\delta$ definition. $\square$

**Example 7.5 (Discontinuous Piecewise):** The function:
$$f(x) = \begin{cases} 0 & x \in \mathbb{Q} \\ 1 & x \notin \mathbb{Q} \end{cases}$$

is discontinuous everywhere.

**Proof:** The set $\{0\} \subseteq \mathbb{R}$ is closed, but:
$$f^{-1}(\{0\}) = \mathbb{Q}$$
is not closed in $\mathbb{R}$ (its closure is $\mathbb{R}$). By the closed set criterion, $f$ is not continuous. $\square$

**Example 7.6 (Thomae's Function):** Define:
$$f(x) = \begin{cases} 0 & x \notin \mathbb{Q} \\ 1/q & x = p/q \text{ in lowest terms} \end{cases}$$

This function is continuous at all irrationals and discontinuous at all rationals! This is a classic example from real analysis.

## Functions on Product Spaces

**Example 7.7 (Projections):** For any topological spaces $X, Y$, the projection maps:
$$\pi_X: X \times Y \to X, \quad \pi_X(x, y) = x$$
$$\pi_Y: X \times Y \to Y, \quad \pi_Y(x, y) = y$$

are always continuous (this is built into the definition of the product topology).

**Example 7.8 (Diagonal):** The diagonal map $\Delta: X \to X \times X$ given by $\Delta(x) = (x, x)$ is continuous.

**Proof:** For any basic open set $U \times V$ in $X \times X$:
$$\Delta^{-1}(U \times V) = \{x : (x, x) \in U \times V\} = U \cap V$$
which is open. $\square$

**Example 7.9 (Addition):** The addition map $+: \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ given by $+(x, y) = x + y$ is continuous.

**Proof:** For any open interval $(a, b)$:
$$+^{-1}((a, b)) = \{(x, y) : a < x + y < b\}$$
This is an open strip in $\mathbb{R}^2$, hence open. $\square$

Similarly, multiplication, subtraction, and division (on appropriate domains) are continuous.

## Norm and Distance Functions

**Example 7.10 (Norm):** In any normed space, the norm function $\|\cdot\|: X \to \mathbb{R}$ is continuous.

**Proof:** The reverse triangle inequality gives $|\|x\| - \|y\|| \leq \|x - y\|$, which can be used to prove continuity. $\square$

**Example 7.11 (Distance Function):** For any metric space $(X, d)$ and fixed $a \in X$, the function $f: X \to \mathbb{R}$ given by $f(x) = d(x, a)$ is continuous.

**Proof:** For any $x, y \in X$:
$$|d(x, a) - d(y, a)| \leq d(x, y)$$
by the triangle inequality. This implies continuity. $\square$

**Example 7.12:** The distance function $d: X \times X \to \mathbb{R}$ is continuous (where $X \times X$ has the product topology).

## Indicator Functions

**Example 7.13:** For a subset $A \subseteq X$, the **indicator function** $\mathbb{1}_A: X \to \{0, 1\}$ (with discrete topology on $\{0, 1\}$) is continuous if and only if $A$ is both open and closed (clopen).

**Proof:**

($\Rightarrow$) If $\mathbb{1}_A$ is continuous, then:
$$\mathbb{1}_A^{-1}(\{1\}) = A \text{ is open}$$
$$\mathbb{1}_A^{-1}(\{0\}) = X \setminus A \text{ is open}$$
Thus $A$ is clopen.

($\Leftarrow$) If $A$ is clopen, then both $A$ and $X \setminus A$ are open, so preimages of all sets in $\{0, 1\}$ are open. $\square$

**Example 7.14:** The indicator function $\mathbb{1}_{[0,1]}: \mathbb{R} \to \{0, 1\}$ is continuous (since $[0, 1]$ is closed... wait, not open). Let me reconsider.

With discrete topology on $\{0, 1\}$, we need both $\mathbb{1}_{[0,1]}^{-1}(\{0\}) = \mathbb{R} \setminus [0, 1]$ and $\mathbb{1}_{[0,1]}^{-1}(\{1\}) = [0, 1]$ to be open. But $[0, 1]$ is not open, so $\mathbb{1}_{[0,1]}$ is NOT continuous.

## Gluing Functions

**Example 7.15 (Gluing Lemma):** Let $X = A \cup B$ where $A, B$ are closed. If $f: A \to Y$ and $g: B \to Y$ are continuous and agree on $A \cap B$, then the function:
$$h(x) = \begin{cases} f(x) & x \in A \\ g(x) & x \in B \end{cases}$$
is continuous.

**Proof:** For any closed $C \subseteq Y$:
$$h^{-1}(C) = f^{-1}(C) \cup g^{-1}(C)$$
is a union of closed sets (by continuity of $f$ and $g$), hence closed. $\square$

**Example 7.16:** Define $f: \mathbb{R} \to \mathbb{R}$ by:
$$f(x) = \begin{cases} x^2 & x \leq 0 \\ x + 1 & x > 0 \end{cases}$$

Is this continuous? At $x = 0$: $\lim_{x \to 0^-} f(x) = 0$ but $\lim_{x \to 0^+} f(x) = 1$, so $f$ is discontinuous at $0$.

## Pathological Examples

**Example 7.17 (Conway Base-13 Function):** There exists a function $f: \mathbb{R} \to \mathbb{R}$ that is continuous at exactly one point (say, $x = 0$) and discontinuous everywhere else.

**Example 7.18:** The function $f: \mathbb{Q} \to \mathbb{R}$ (inclusion) is continuous when $\mathbb{Q}$ has the subspace topology from $\mathbb{R}$.

**Example 7.19:** Let $X = \mathbb{R}$ with the discrete topology and $Y = \mathbb{R}$ with the indiscrete topology. Every function $f: X \to Y$ is continuous (preimages of $\emptyset$ and $Y$ are always open in the discrete topology).

Conversely, if $X$ has the indiscrete topology and $Y$ has the discrete topology, the only continuous functions are constants.

## Continuous Functions and Topology Changes

**Example 7.20:** The identity $\text{id}: (\mathbb{R}, \mathcal{T}_{\text{discrete}}) \to (\mathbb{R}, \mathcal{T}_{\text{std}})$ is continuous.

**Example 7.21:** The identity $\text{id}: (\mathbb{R}, \mathcal{T}_{\text{std}}) \to (\mathbb{R}, \mathcal{T}_{\text{discrete}})$ is NOT continuous.

This shows continuity depends on both topologies.

## Limits and Continuity

**Example 7.22:** In $\mathbb{R}$, define:
$$f(x) = \begin{cases} \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$$

This is discontinuous at $0$ (oscillates wildly).

**Example 7.23:** Define:
$$f(x) = \begin{cases} x \sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$$

This IS continuous at $0$ (the multiplication by $x$ forces convergence).

## Summary Table

| Function | Domain | Codomain | Continuous? | Notes |
|----------|--------|----------|-------------|-------|
| $x^2$ | $\mathbb{R}$ | $\mathbb{R}$ | Yes | Polynomial |
| $1/x$ | $\mathbb{R} \setminus \{0\}$ | $\mathbb{R}$ | Yes | Rational |
| $\|x\|$ | $\mathbb{R}$ | $\mathbb{R}$ | Yes | Piecewise |
| $\mathbb{1}_\mathbb{Q}$ | $\mathbb{R}$ | $\{0,1\}$ | No | Discontinuous everywhere |
| $\sin(1/x)$ at $0$ | $\mathbb{R}$ | $\mathbb{R}$ | No | Oscillation |
| $x\sin(1/x)$ at $0$ | $\mathbb{R}$ | $\mathbb{R}$ | Yes | Bounded oscillation |
| Projections | $X \times Y$ | $X$ or $Y$ | Yes | Product topology |
| Diagonal | $X$ | $X \times X$ | Yes | Product topology |

## Summary

Key takeaways:

1. **Polynomials, rationals:** Always continuous on their domains
2. **Piecewise:** Need compatibility at boundaries
3. **Product spaces:** Projections, addition, multiplication continuous
4. **Pathological:** Can construct very irregular continuous functions
5. **Topology-dependent:** Continuity depends on both domain and codomain topologies

These examples illustrate the rich variety of continuous and discontinuous functions in topology, providing intuition for general theorems and constructions.
