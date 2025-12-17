---
title: "Integrability Criteria"
slug: "integrability-criteria"
description: "Riemann integrability and Darboux criterion"
---

# Integrability Criteria

## Introduction

While the definition of the Riemann integral provides a theoretical framework, it doesn't immediately tell us which functions are integrable. This section develops practical criteria for determining when a function is Riemann integrable. The key result is the Darboux criterion, which characterizes integrability in terms of upper and lower sums. We also explore the relationship between continuity and integrability, showing that continuous functions and monotone functions are always integrable.

## Review: Riemann Sums and Darboux Sums

Recall from the previous section:

**Upper and Lower Sums:** For a partition $P = \{x_0, \ldots, x_n\}$ of $[a,b]$:
$$
M_i = \sup\{f(x) : x \in [x_{i-1}, x_i]\}, \quad m_i = \inf\{f(x) : x \in [x_{i-1}, x_i]\}
$$
$$
U(f, P) = \sum_{i=1}^n M_i \Delta x_i, \quad L(f, P) = \sum_{i=1}^n m_i \Delta x_i
$$

**Upper and Lower Integrals:**
$$
\overline{\int_a^b} f = \inf_P U(f,P), \quad \underline{\int_a^b} f = \sup_P L(f,P)
$$

## The Darboux Criterion

**Theorem 6.2.1 (Darboux Integrability Criterion):** A bounded function $f:[a,b] \to \mathbb{R}$ is Riemann integrable if and only if:
$$
\overline{\int_a^b} f = \underline{\int_a^b} f
$$

Equivalently, for every $\epsilon > 0$, there exists a partition $P$ such that:
$$
U(f,P) - L(f,P) < \epsilon
$$

**Proof:**
($\Rightarrow$) Suppose $f$ is Riemann integrable with $\int_a^b f = I$. Given $\epsilon > 0$, there exists $\delta > 0$ such that for any partition $P$ with $\|P\| < \delta$ and any choice of sample points $\{t_i\}$:
$$
|S(f, P, \{t_i\}) - I| < \epsilon/2
$$

Since $m_i \leq f(t_i) \leq M_i$:
$$
L(f,P) \leq S(f, P, \{t_i\}) \leq U(f,P)
$$

Therefore:
$$
U(f,P) - L(f,P) \leq U(f,P) - I + I - L(f,P) < \epsilon
$$

($\Leftarrow$) Suppose for every $\epsilon > 0$ there exists partition $P$ with $U(f,P) - L(f,P) < \epsilon$. Then:
$$
0 \leq \overline{\int_a^b} f - \underline{\int_a^b} f \leq U(f,P) - L(f,P) < \epsilon
$$

Since this holds for all $\epsilon > 0$, we have $\overline{\int_a^b} f = \underline{\int_a^b} f = I$.

Now, given $\epsilon > 0$, choose partition $P$ with $U(f,P) - L(f,P) < \epsilon$. For any Riemann sum with this partition:
$$
|S(f,P,\{t_i\}) - I| \leq U(f,P) - L(f,P) < \epsilon
$$
$\square$

**Example 6.2.2:** Show that $f(x) = x^2$ is integrable on $[0,1]$.

Consider the partition $P_n = \{0, 1/n, 2/n, \ldots, 1\}$ with $\Delta x_i = 1/n$. Since $f$ is increasing:
$$
M_i = f(i/n) = i^2/n^2, \quad m_i = f((i-1)/n) = (i-1)^2/n^2
$$

Therefore:
$$
U(f,P_n) - L(f,P_n) = \sum_{i=1}^n \left(\frac{i^2}{n^2} - \frac{(i-1)^2}{n^2}\right) \cdot \frac{1}{n}
$$
$$
= \frac{1}{n^3} \sum_{i=1}^n (2i-1) = \frac{1}{n^3} \cdot n^2 = \frac{1}{n} \to 0
$$

By the Darboux criterion, $f$ is integrable.

## Refinement of Partitions

**Definition 6.2.3:** A partition $Q$ is a **refinement** of $P$ if $P \subseteq Q$ (every point in $P$ is also in $Q$).

**Lemma 6.2.4 (Refinement Lemma):** If $Q$ is a refinement of $P$, then:
$$
L(f,P) \leq L(f,Q) \leq U(f,Q) \leq U(f,P)
$$

**Proof:** Adding more points to a partition can only increase lower sums and decrease upper sums. Suppose $Q$ adds a single point $c$ to an interval $[x_{k-1}, x_k]$ of $P$, dividing it into $[x_{k-1}, c]$ and $[c, x_k]$.

Let $M_k = \sup\{f(x) : x \in [x_{k-1}, x_k]\}$, and similarly for $M_k'$, $M_k''$ on the smaller intervals. Then:
$$
M_k' \Delta x_k' + M_k'' \Delta x_k'' \leq M_k (\Delta x_k' + \Delta x_k'') = M_k \Delta x_k
$$

since $M_k' \leq M_k$ and $M_k'' \leq M_k$. The argument for lower sums is similar. $\square$

**Corollary 6.2.5:** For any two partitions $P$ and $Q$:
$$
L(f,P) \leq U(f,Q)
$$

**Proof:** Let $R = P \cup Q$ be the common refinement. Then:
$$
L(f,P) \leq L(f,R) \leq U(f,R) \leq U(f,Q)
$$
$\square$

This immediately gives $\underline{\int_a^b} f \leq \overline{\int_a^b} f$.

## Integrability of Continuous Functions

**Theorem 6.2.6 (Continuous Functions are Integrable):** If $f$ is continuous on $[a,b]$, then $f$ is Riemann integrable on $[a,b]$.

**Proof:** Since $f$ is continuous on the compact set $[a,b]$, it is uniformly continuous. Given $\epsilon > 0$, there exists $\delta > 0$ such that:
$$
|x - y| < \delta \Rightarrow |f(x) - f(y)| < \frac{\epsilon}{b-a}
$$

Choose a partition $P$ with $\|P\| < \delta$. On each subinterval $[x_{i-1}, x_i]$ of length $\Delta x_i < \delta$, the continuous function $f$ attains its maximum $M_i$ and minimum $m_i$. By uniform continuity:
$$
M_i - m_i < \frac{\epsilon}{b-a}
$$

Therefore:
$$
U(f,P) - L(f,P) = \sum_{i=1}^n (M_i - m_i) \Delta x_i < \frac{\epsilon}{b-a} \sum_{i=1}^n \Delta x_i = \epsilon
$$

By the Darboux criterion, $f$ is integrable. $\square$

**Example 6.2.7:** Since $\sin(x)$, $\cos(x)$, $e^x$, and polynomials are continuous, they are all Riemann integrable on any closed interval.

## Integrability of Monotone Functions

**Theorem 6.2.8 (Monotone Functions are Integrable):** If $f$ is monotone on $[a,b]$, then $f$ is Riemann integrable.

**Proof:** Assume $f$ is increasing (the decreasing case is similar). Let $P_n$ be the uniform partition with $\Delta x_i = (b-a)/n$ for all $i$. Since $f$ is increasing:
$$
M_i = f(x_i), \quad m_i = f(x_{i-1})
$$

Therefore:
$$
U(f,P_n) - L(f,P_n) = \sum_{i=1}^n [f(x_i) - f(x_{i-1})] \cdot \frac{b-a}{n}
$$
$$
= \frac{b-a}{n} [f(b) - f(a)]
$$

This can be made arbitrarily small by choosing $n$ large enough. $\square$

**Example 6.2.9:** The function $f(x) = \lfloor x \rfloor$ (greatest integer function) is monotone increasing on any interval $[a,b]$, hence integrable despite having discontinuities.

## Functions with Finitely Many Discontinuities

**Theorem 6.2.10:** If $f$ is bounded on $[a,b]$ and has only finitely many discontinuities, then $f$ is Riemann integrable on $[a,b]$.

**Proof Sketch:** The key idea is that we can enclose the discontinuities in small intervals whose total length is small. Outside these intervals, $f$ is continuous (hence locally integrable), and the contribution from the discontinuity intervals can be made arbitrarily small. $\square$

**Example 6.2.11:** The function
$$
f(x) = \begin{cases} x^2 & x \neq 1/2 \\ 10 & x = 1/2 \end{cases}
$$
is integrable on $[0,1]$ with $\int_0^1 f = \int_0^1 x^2 dx = 1/3$, since changing the value at a single point doesn't affect the integral.

## Non-Integrable Functions

**Example 6.2.12 (Dirichlet Function):** The function
$$
f(x) = \begin{cases} 1 & x \in \mathbb{Q} \\ 0 & x \notin \mathbb{Q} \end{cases}
$$
is not Riemann integrable on $[0,1]$.

**Proof:** For any partition $P$, every subinterval contains both rationals and irrationals. Therefore:
$$
M_i = 1, \quad m_i = 0 \text{ for all } i
$$

Thus $U(f,P) = 1$ and $L(f,P) = 0$ for every partition, so:
$$
\overline{\int_0^1} f = 1 \neq 0 = \underline{\int_0^1} f
$$
$\square$

**Example 6.2.13 (Modified Dirichlet):** The function
$$
f(x) = \begin{cases} 1/q & x = p/q \text{ in lowest terms} \\ 0 & x \text{ irrational} \end{cases}
$$
is actually integrable on $[0,1]$ with integral 0, despite being discontinuous at every rational. This is because for any $\epsilon > 0$, the set of points where $f(x) \geq \epsilon$ is finite.

## Riemann's Criterion

**Theorem 6.2.14 (Riemann's Criterion):** A bounded function $f$ on $[a,b]$ is Riemann integrable if and only if the set of discontinuities of $f$ has measure zero.

**Remark:** A set has measure zero if it can be covered by countably many intervals whose total length is arbitrarily small. This includes finite sets, countable sets like $\mathbb{Q}$, and the Cantor set.

This theorem completely characterizes Riemann integrable functions but requires measure theory for a rigorous proof.

## Properties of Upper and Lower Integrals

**Proposition 6.2.15:** For bounded functions $f$ and $g$ on $[a,b]$:
1. If $f \leq g$, then $\underline{\int} f \leq \underline{\int} g$ and $\overline{\int} f \leq \overline{\int} g$.
2. $\underline{\int} (f+g) \geq \underline{\int} f + \underline{\int} g$
3. $\overline{\int} (f+g) \leq \overline{\int} f + \overline{\int} g$
4. For $c > 0$: $\overline{\int} cf = c\overline{\int} f$ and $\underline{\int} cf = c\underline{\int} f$

**Proof:** These follow from properties of supremum and infimum. $\square$

## Exercises

1. Show that $f(x) = x^3$ is integrable on $[-1,1]$ using the Darboux criterion.

2. Prove that if $f$ is integrable and $f(x) \geq 0$ for all $x$, then $\int_a^b f \geq 0$.

3. Let $f(x) = \begin{cases} 0 & x \in [0,1/2) \\ 1 & x \in [1/2,1] \end{cases}$. Show $f$ is integrable and compute $\int_0^1 f$.

4. Prove the Refinement Lemma in detail.

5. Show that the function $f(x) = \sin(1/x)$ for $x \in (0,1]$ with $f(0) = 0$ is integrable on $[0,1]$.

6. Find a bounded function with countably infinitely many discontinuities that is still Riemann integrable.

7. Prove that if $|f|$ is integrable, it doesn't necessarily follow that $f$ is integrable. (Hint: Consider a highly oscillatory function.)

8. Show that the composition of integrable functions need not be integrable.

## Conclusion

The Darboux criterion provides the fundamental tool for determining integrability: a function is integrable if and only if its upper and lower integrals coincide. The key results show that continuous functions and monotone functions are always integrable, as are bounded functions with only finitely many discontinuities. However, the Dirichlet function demonstrates that even bounded functions can fail to be integrable if they are "too discontinuous." Riemann's criterion (measure zero discontinuities) provides the complete characterization, though its proof requires more advanced tools from measure theory. These integrability criteria are essential for both theoretical work and practical applications in analysis.
