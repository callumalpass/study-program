---
title: "Supremum and Infimum Properties"
slug: "supremum-infimum"
description: "Advanced properties and applications of supremum and infimum"
---

# Supremum and Infimum Properties

## Extended Real Number System

To handle unbounded sets uniformly, we work with the **extended real numbers** $\overline{\mathbb{R}} = \mathbb{R} \cup \{-\infty, \infty\}$.

**Convention:** For any nonempty set $S \subseteq \mathbb{R}$:

- If $S$ is not bounded above, we write $\sup S = \infty$
- If $S$ is not bounded below, we write $\inf S = -\infty$
- For the empty set: $\sup \emptyset = -\infty$ and $\inf \emptyset = \infty$

With these conventions, every subset of $\mathbb{R}$ has a supremum and infimum in $\overline{\mathbb{R}}$.

## Alternative Characterizations

**Theorem 3.1 (Epsilon Characterization):** Let $S \subseteq \mathbb{R}$ be nonempty and $\alpha \in \mathbb{R}$. Then $\alpha = \sup S$ if and only if:

1. For all $x \in S$, $x \leq \alpha$
2. For all $\epsilon > 0$, there exists $x \in S$ such that $x > \alpha - \epsilon$

**Proof:** This is Corollary 2.3 from the previous section.

**Theorem 3.2 (Sequence Characterization):** Let $S \subseteq \mathbb{R}$ be nonempty and bounded above, with $\alpha = \sup S$. Then there exists a sequence $(x_n)$ in $S$ such that $\lim_{n \to \infty} x_n = \alpha$.

**Proof:** For each $n \in \mathbb{N}$, by the approximation property with $\epsilon = 1/n$, there exists $x_n \in S$ such that:
$$
\alpha - \frac{1}{n} < x_n \leq \alpha
$$

By the squeeze theorem (which we'll prove rigorously later), since $\lim_{n \to \infty} (\alpha - 1/n) = \alpha$ and $\lim_{n \to \infty} \alpha = \alpha$, we have $\lim_{n \to \infty} x_n = \alpha$.

**Remark:** This theorem provides a constructive way to "reach" the supremum via a sequence of elements from the set.

## Supremum and Infimum of Functions

**Definition:** Let $f: D \to \mathbb{R}$ be a function. We define:
$$
\sup_{x \in D} f(x) = \sup\{f(x) : x \in D\}
$$
$$
\inf_{x \in D} f(x) = \inf\{f(x) : x \in D\}
$$

**Example:** For $f(x) = \frac{x}{1+x^2}$ on $D = [0, \infty)$:

We can show that $f$ achieves its maximum at $x = 1$ with $f(1) = 1/2$. Thus:
$$
\sup_{x \geq 0} \frac{x}{1+x^2} = \frac{1}{2}
$$

and $\inf_{x \geq 0} f(x) = f(0) = 0$.

## Properties of Supremum and Infimum

### Monotonicity

**Theorem 3.3:** If $S \subseteq T \subseteq \mathbb{R}$, then:
$$
\inf T \leq \inf S \leq \sup S \leq \sup T
$$

**Proof:** Every upper bound for $T$ is an upper bound for $S$. Since $\sup T$ is the least upper bound for $T$, and $\sup S$ is an upper bound for $S \subseteq T$, we have $\sup S \leq \sup T$ (though this reasoning needs care; properly: if $s \in S$, then $s \in T$, so $s \leq \sup T$, making $\sup T$ an upper bound for $S$, thus $\sup S \leq \sup T$).

### Addition and Scalar Multiplication

**Theorem 3.4:** Let $S, T \subseteq \mathbb{R}$ be nonempty. Then:

1. $\sup(S + T) = \sup S + \sup T$ (if both suprema exist in $\mathbb{R}$)
2. $\inf(S + T) = \inf S + \inf T$ (if both infima exist in $\mathbb{R}$)

where $S + T = \{s + t : s \in S, t \in T\}$.

**Proof of (1):** Proved in the previous section as Theorem 2.5.

**Theorem 3.5:** Let $S \subseteq \mathbb{R}$ be nonempty and $c \in \mathbb{R}$.

1. If $c > 0$: $\sup(cS) = c \sup S$ and $\inf(cS) = c \inf S$
2. If $c < 0$: $\sup(cS) = c \inf S$ and $\inf(cS) = c \sup S$
3. If $c = 0$: $\sup(cS) = \inf(cS) = 0$

**Proof of (2):** Let $c < 0$ and $\alpha = \sup S$. For any $x \in S$, we have $x \leq \alpha$, so $cx \geq c\alpha$ (inequality reverses). Thus $c\alpha$ is a lower bound for $cS$.

For any $\epsilon > 0$, there exists $x_0 \in S$ with $x_0 > \alpha - \epsilon/|c|$. Then:
$$
cx_0 < c\alpha + \epsilon
$$
So $c\alpha = \inf(cS)$ by the epsilon characterization.

### Product and Quotient

For products, the situation is more complex.

**Theorem 3.6:** Let $S, T \subseteq (0, \infty)$ be nonempty. Then:
$$
\sup(ST) = (\sup S)(\sup T)
$$
where $ST = \{st : s \in S, t \in T\}$.

**Proof:** Let $\alpha = \sup S$ and $\beta = \sup T$. For any $s \in S$ and $t \in T$:
$$
st \leq \alpha \beta
$$
so $\alpha\beta$ is an upper bound for $ST$.

For any $\epsilon > 0$, choose $s_0 \in S$ and $t_0 \in T$ such that:
$$
s_0 > \alpha - \frac{\epsilon}{2\beta}, \quad t_0 > \beta - \frac{\epsilon}{2\alpha}
$$
(assuming $\alpha, \beta > 0$; adjustments needed for edge cases). Then:
$$
s_0 t_0 > \left(\alpha - \frac{\epsilon}{2\beta}\right)\left(\beta - \frac{\epsilon}{2\alpha}\right) = \alpha\beta - \frac{\epsilon}{2} - \frac{\epsilon}{2} + \frac{\epsilon^2}{4\alpha\beta}
$$

For small $\epsilon$, this exceeds $\alpha\beta - \epsilon$, giving $\sup(ST) = \alpha\beta$.

## Supremum/Infimum of Unions and Intersections

**Theorem 3.7:** Let $\{S_i : i \in I\}$ be a collection of nonempty subsets of $\mathbb{R}$. Then:
$$
\sup\left(\bigcup_{i \in I} S_i\right) = \sup_{i \in I} \sup S_i
$$
$$
\inf\left(\bigcup_{i \in I} S_i\right) = \inf_{i \in I} \inf S_i
$$

**Proof:** Let $S = \bigcup_{i \in I} S_i$. For any $x \in S$, there exists $i \in I$ with $x \in S_i$, so:
$$
x \leq \sup S_i \leq \sup_{i \in I} \sup S_i
$$

Thus $\sup_{i \in I} \sup S_i$ is an upper bound for $S$.

Conversely, for any $\epsilon > 0$, there exists $i_0$ such that:
$$
\sup S_{i_0} > \sup_{i \in I} \sup S_i - \epsilon/2
$$

And there exists $x_0 \in S_{i_0}$ with:
$$
x_0 > \sup S_{i_0} - \epsilon/2
$$

Thus $x_0 \in S$ and $x_0 > \sup_{i \in I} \sup S_i - \epsilon$, giving the result.

For intersections, the situation is different.

**Theorem 3.8:** Let $\{S_i : i \in I\}$ be a collection of nonempty subsets of $\mathbb{R}$ with $\bigcap_{i \in I} S_i \neq \emptyset$. Then:
$$
\sup_{i \in I} \inf S_i \leq \inf\left(\bigcap_{i \in I} S_i\right) \leq \sup\left(\bigcap_{i \in I} S_i\right) \leq \inf_{i \in I} \sup S_i
$$

**Proof:** Let $T = \bigcap_{i \in I} S_i$. If $x \in T$, then $x \in S_i$ for all $i$, so:
$$
\inf S_i \leq x \leq \sup S_i
$$
for all $i$. Thus:
$$
\sup_{i \in I} \inf S_i \leq x \leq \inf_{i \in I} \sup S_i
$$

Taking infimum and supremum over $x \in T$ gives the result.

## Applications

### Example 1: Finding Supremum of a Set

Find $\sup S$ where $S = \left\{\frac{n}{n+1} : n \in \mathbb{N}\right\}$.

**Solution:** We claim $\sup S = 1$.

First, for all $n \in \mathbb{N}$:
$$
\frac{n}{n+1} = 1 - \frac{1}{n+1} < 1
$$
so 1 is an upper bound.

Second, for any $\epsilon > 0$, choose $N > \frac{1}{\epsilon} - 1$. Then:
$$
\frac{N}{N+1} = 1 - \frac{1}{N+1} > 1 - \epsilon
$$

By Theorem 3.1, $\sup S = 1$.

### Example 2: Supremum of a Quadratic

Find $\sup_{x \in [0, 2]} (2x - x^2)$.

**Solution:** Let $f(x) = 2x - x^2$. Taking the derivative: $f'(x) = 2 - 2x$, which equals zero at $x = 1$.

Since $f(0) = 0$, $f(1) = 1$, $f(2) = 0$, we have:
$$
\sup_{x \in [0,2]} f(x) = f(1) = 1
$$

### Example 3: Supremum with Parameters

Let $S_a = \{x \in \mathbb{R} : x^2 < a\}$ for $a > 0$. Find $\sup S_a$.

**Solution:** We have $x \in S_a$ if and only if $-\sqrt{a} < x < \sqrt{a}$. Thus:
$$
\sup S_a = \sqrt{a}, \quad \inf S_a = -\sqrt{a}
$$

Note that neither is in $S_a$ unless we work with closed intervals.

## Supremum Metric and Distance

**Definition:** For nonempty bounded sets $S, T \subseteq \mathbb{R}$, the **Hausdorff distance** is:
$$
d_H(S, T) = \max\left\{\sup_{s \in S} \inf_{t \in T} |s - t|, \sup_{t \in T} \inf_{s \in S} |t - s|\right\}
$$

This measures how far apart two sets are.

## Common Mistakes

1. **Confusing supremum with maximum:** $\sup(0,1) = 1$ but $\max(0,1)$ does not exist

2. **Incorrect inequality direction:** $\sup(-S) = -\inf S$, not $-\sup S$

3. **Empty set conventions:** Some authors avoid defining $\sup \emptyset$, leading to confusion

4. **Product formula:** $\sup(ST) = (\sup S)(\sup T)$ requires $S, T \subseteq (0, \infty)$

## Exercises

1. Prove that if $S$ is finite, then $\max S$ exists and equals $\sup S$.

2. Show that $\sup(S \cup T) = \max\{\sup S, \sup T\}$.

3. If $S \subseteq \mathbb{R}$ is nonempty, prove that $\sup(-S) = -\inf S$ where $-S = \{-x : x \in S\}$.

4. Find $\sup_{x \in (0,1)} \frac{x}{1-x}$ and $\inf_{x \in (0,1)} \frac{x}{1-x}$.

## Conclusion

The supremum and infimum are fundamental tools in analysis, appearing in definitions of continuity, integration, and measure theory. Mastery of their properties is essential for rigorous mathematical reasoning.
