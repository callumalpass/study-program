---
title: "The Completeness Axiom"
slug: "completeness-axiom"
description: "The fundamental property that distinguishes real numbers from rationals"
---

# The Completeness Axiom

## Motivation

The field and order axioms alone do not uniquely determine the real numbers. The rational numbers $\mathbb{Q}$ satisfy all these axioms, yet we know intuitively that $\mathbb{R}$ contains "more" numbers. The completeness axiom captures the essential difference: $\mathbb{R}$ has "no gaps."

## Upper and Lower Bounds

**Definition:** Let $S \subseteq \mathbb{R}$ be a nonempty set.

- A number $M \in \mathbb{R}$ is an **upper bound** for $S$ if $x \leq M$ for all $x \in S$
- A number $m \in \mathbb{R}$ is a **lower bound** for $S$ if $m \leq x$ for all $x \in S$
- $S$ is **bounded above** if it has an upper bound
- $S$ is **bounded below** if it has a lower bound
- $S$ is **bounded** if it is both bounded above and below

**Example:** Consider $S = \{x \in \mathbb{R} : 0 < x < 1\}$.

- Any $M \geq 1$ is an upper bound
- Any $m \leq 0$ is a lower bound
- $S$ is bounded

**Example:** The set $\mathbb{N} = \{1, 2, 3, \ldots\}$ is bounded below (by 1) but not bounded above.

## Supremum and Infimum

**Definition:** Let $S \subseteq \mathbb{R}$ be nonempty and bounded above.

- A number $\alpha \in \mathbb{R}$ is the **supremum** (or **least upper bound**) of $S$, written $\alpha = \sup S$, if:
  1. $\alpha$ is an upper bound for $S$
  2. If $\beta$ is any upper bound for $S$, then $\alpha \leq \beta$

Similarly, if $S$ is bounded below:

- A number $\gamma \in \mathbb{R}$ is the **infimum** (or **greatest lower bound**) of $S$, written $\gamma = \inf S$, if:
  1. $\gamma$ is a lower bound for $S$
  2. If $\delta$ is any lower bound for $S$, then $\delta \leq \gamma$

**Remark:** If $\sup S$ exists, it is unique. For if $\alpha_1$ and $\alpha_2$ are both suprema, then by property (2), $\alpha_1 \leq \alpha_2$ and $\alpha_2 \leq \alpha_1$, so $\alpha_1 = \alpha_2$.

## The Completeness Axiom

**Axiom (Completeness):** Every nonempty subset of $\mathbb{R}$ that is bounded above has a supremum in $\mathbb{R}$.

This axiom is also called the **least upper bound property** or **supremum property**.

**Theorem 2.1:** Every nonempty subset of $\mathbb{R}$ that is bounded below has an infimum in $\mathbb{R}$.

**Proof:** Let $S$ be nonempty and bounded below. Define $T = \{-x : x \in S\}$. Then $T$ is nonempty and bounded above. By completeness, $\alpha = \sup T$ exists. We claim $-\alpha = \inf S$.

First, for any $x \in S$, we have $-x \in T$, so $-x \leq \alpha$, thus $-\alpha \leq x$. So $-\alpha$ is a lower bound for $S$.

Second, if $\beta$ is any lower bound for $S$, then for all $x \in S$, $\beta \leq x$, so $-x \leq -\beta$. Thus $-\beta$ is an upper bound for $T$, giving $\alpha \leq -\beta$, hence $\beta \leq -\alpha$.

Therefore, $-\alpha = \inf S$.

## Characterization of Supremum

**Theorem 2.2 (Approximation Property):** Let $S \subseteq \mathbb{R}$ be nonempty and bounded above, and let $\alpha = \sup S$. Then for every $\epsilon > 0$, there exists $x \in S$ such that $\alpha - \epsilon < x \leq \alpha$.

**Proof:** Since $\alpha = \sup S$, we know $\alpha$ is an upper bound, so $x \leq \alpha$ for all $x \in S$.

Suppose for some $\epsilon > 0$, no element of $S$ satisfies $x > \alpha - \epsilon$. Then $\alpha - \epsilon$ is an upper bound for $S$, contradicting the fact that $\alpha$ is the *least* upper bound. Therefore, there must exist $x \in S$ with $\alpha - \epsilon < x$.

**Corollary 2.3:** $\alpha = \sup S$ if and only if:
1. $x \leq \alpha$ for all $x \in S$
2. For every $\epsilon > 0$, there exists $x \in S$ with $x > \alpha - \epsilon$

This characterization is often more useful than the definition for proving that a number is the supremum.

## Examples

**Example 1:** Let $S = \{x \in \mathbb{R} : 0 < x < 1\}$. Then $\sup S = 1$ and $\inf S = 0$.

**Proof that $\sup S = 1$:**
- Clearly $x < 1$ for all $x \in S$, so 1 is an upper bound.
- For any $\epsilon > 0$, consider $x_0 = \min\{1 - \epsilon/2, 1/2\}$. If $\epsilon \geq 1$, then $x_0 = 1/2 \in S$ and $x_0 > 0 = 1 - 1 \geq 1 - \epsilon$. If $\epsilon < 1$, then $x_0 = 1 - \epsilon/2 \in S$ and $x_0 > 1 - \epsilon$.
- By Corollary 2.3, $\sup S = 1$.

**Example 2:** Let $S = \{1 - \frac{1}{n} : n \in \mathbb{N}\} = \{0, 1/2, 2/3, 3/4, \ldots\}$. Then $\sup S = 1$ and $\inf S = 0$.

**Example 3:** Let $S = \{x \in \mathbb{Q} : x^2 < 2\}$. As a subset of $\mathbb{Q}$, this set has no supremum! This demonstrates that $\mathbb{Q}$ does not satisfy the completeness axiom. However, as a subset of $\mathbb{R}$, $\sup S = \sqrt{2}$.

## Maximum and Minimum

**Definition:** Let $S \subseteq \mathbb{R}$ be nonempty.

- $M \in \mathbb{R}$ is the **maximum** of $S$, written $M = \max S$, if $M \in S$ and $M \geq x$ for all $x \in S$
- $m \in \mathbb{R}$ is the **minimum** of $S$, written $m = \min S$, if $m \in S$ and $m \leq x$ for all $x \in S$

**Remark:** The key difference between maximum and supremum is that the maximum must be an element of the set. Every set with a maximum has a supremum, and $\max S = \sup S$ when the maximum exists. However, a set may have a supremum without having a maximum.

**Example:** $S = \{x : 0 < x < 1\}$ has $\sup S = 1$ but no maximum, since $1 \notin S$.

**Theorem 2.4:** Let $S$ be nonempty and bounded above. Then $\max S$ exists if and only if $\sup S \in S$, in which case $\max S = \sup S$.

## Operations on Bounded Sets

**Theorem 2.5:** Let $S, T \subseteq \mathbb{R}$ be nonempty and bounded above. Define $S + T = \{s + t : s \in S, t \in T\}$. Then:
$$
\sup(S + T) = \sup S + \sup T
$$

**Proof:** Let $\alpha = \sup S$ and $\beta = \sup T$.

For any $s \in S$ and $t \in T$, we have $s \leq \alpha$ and $t \leq \beta$, so $s + t \leq \alpha + \beta$. Thus $\alpha + \beta$ is an upper bound for $S + T$.

Now let $\epsilon > 0$. By the approximation property, there exist $s_0 \in S$ and $t_0 \in T$ such that:
$$
s_0 > \alpha - \epsilon/2 \quad \text{and} \quad t_0 > \beta - \epsilon/2
$$
Then $s_0 + t_0 \in S + T$ and:
$$
s_0 + t_0 > (\alpha - \epsilon/2) + (\beta - \epsilon/2) = \alpha + \beta - \epsilon
$$
By Corollary 2.3, $\sup(S + T) = \alpha + \beta$.

**Theorem 2.6:** Let $S \subseteq \mathbb{R}$ be nonempty and bounded above, and let $c > 0$. Define $cS = \{cx : x \in S\}$. Then:
$$
\sup(cS) = c \sup S
$$

**Proof:** Exercise.

## The Completeness of $\mathbb{R}$ vs Incompleteness of $\mathbb{Q}$

The completeness axiom distinguishes $\mathbb{R}$ from $\mathbb{Q}$ fundamentally. Consider the set:
$$
S = \{x \in \mathbb{Q} : x^2 < 2\}
$$

As a subset of $\mathbb{Q}$, this set is bounded above (e.g., by 2) but has no supremum in $\mathbb{Q}$. If $r \in \mathbb{Q}$ were $\sup S$, we would need $r^2 = 2$, but no such rational exists.

In $\mathbb{R}$, by completeness, $S$ has a supremum, which we call $\sqrt{2}$. This number "fills the gap" in $\mathbb{Q}$.

## Equivalent Formulations of Completeness

There are several equivalent ways to express the completeness of $\mathbb{R}$. We will encounter these later:

1. **Nested Interval Property:** If $\{I_n\}$ is a sequence of closed, bounded intervals with $I_{n+1} \subseteq I_n$, then $\bigcap_{n=1}^{\infty} I_n \neq \emptyset$

2. **Cauchy Criterion:** Every Cauchy sequence in $\mathbb{R}$ converges

3. **Bolzano-Weierstrass Theorem:** Every bounded sequence has a convergent subsequence

4. **Monotone Convergence Theorem:** Every bounded monotone sequence converges

Each of these can be proven from the completeness axiom and can be used to prove the others.

## Conclusion

The completeness axiom is the cornerstone of real analysis. It guarantees that $\mathbb{R}$ has no "gaps" and enables us to prove fundamental theorems about convergence, continuity, and integration. In the next sections, we explore immediate consequences of completeness.
