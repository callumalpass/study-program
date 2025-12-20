---
title: "Properties of the Integral"
slug: "properties-integral"
description: "Linearity, monotonicity, and additivity"
---

# Properties of the Integral

## Introduction

Once we know which functions are integrable, we need to understand how integrals behave under various operations. This section develops the fundamental properties of the Riemann integral: linearity, monotonicity, additivity over intervals, and more. These properties are essential for computing integrals and for theoretical work throughout analysis. The results here mirror, in many ways, the properties of limits and sums, reflecting the integral's definition as a limit of Riemann sums.

## Linearity of the Integral

**Theorem 6.3.1 (Linearity):** If $f$ and $g$ are integrable on $[a,b]$ and $\alpha, \beta \in \mathbb{R}$, then $\alpha f + \beta g$ is integrable on $[a,b]$, and:
$$
\int_a^b (\alpha f + \beta g) = \alpha \int_a^b f + \beta \int_a^b g
$$

**Proof:** First, we show $\alpha f + \beta g$ is integrable. For any partition $P$ and sample points $\{t_i\}$:
$$
S(\alpha f + \beta g, P, \{t_i\}) = \sum_{i=1}^n (\alpha f(t_i) + \beta g(t_i)) \Delta x_i
$$
$$
= \alpha \sum_{i=1}^n f(t_i) \Delta x_i + \beta \sum_{i=1}^n g(t_i) \Delta x_i
$$
$$
= \alpha S(f, P, \{t_i\}) + \beta S(g, P, \{t_i\})
$$

Given $\epsilon > 0$, since $f$ and $g$ are integrable, there exists $\delta > 0$ such that for any partition $P$ with $\|P\| < \delta$:
$$
|S(f, P, \{t_i\}) - \int_a^b f| < \frac{\epsilon}{2(|\alpha| + 1)}
$$
$$
|S(g, P, \{t_i\}) - \int_a^b g| < \frac{\epsilon}{2(|\beta| + 1)}
$$

Therefore:
$$
|S(\alpha f + \beta g, P, \{t_i\}) - (\alpha \int_a^b f + \beta \int_a^b g)|
$$
$$
\leq |\alpha| |S(f, P, \{t_i\}) - \int_a^b f| + |\beta| |S(g, P, \{t_i\}) - \int_a^b g| < \epsilon
$$

This proves both integrability and the formula. $\square$

**Corollary 6.3.2:**
1. $\int_a^b (f + g) = \int_a^b f + \int_a^b g$ (additivity)
2. $\int_a^b cf = c\int_a^b f$ (homogeneity)
3. $\int_a^b (f - g) = \int_a^b f - \int_a^b g$

**Example 6.3.3:** Compute $\int_0^1 (3x^2 + 2x) dx$.

By linearity:
$$
\int_0^1 (3x^2 + 2x) dx = 3\int_0^1 x^2 dx + 2\int_0^1 x dx = 3 \cdot \frac{1}{3} + 2 \cdot \frac{1}{2} = 2
$$

## Monotonicity and Order Properties

**Theorem 6.3.4 (Monotonicity):** If $f$ and $g$ are integrable on $[a,b]$ and $f(x) \leq g(x)$ for all $x \in [a,b]$, then:
$$
\int_a^b f \leq \int_a^b g
$$

**Proof:** For any partition $P$ and sample points $\{t_i\}$:
$$
S(f, P, \{t_i\}) = \sum_{i=1}^n f(t_i) \Delta x_i \leq \sum_{i=1}^n g(t_i) \Delta x_i = S(g, P, \{t_i\})
$$

Taking limits as $\|P\| \to 0$:
$$
\int_a^b f = \lim_{\|P\| \to 0} S(f, P, \{t_i\}) \leq \lim_{\|P\| \to 0} S(g, P, \{t_i\}) = \int_a^b g
$$
$\square$

**Corollary 6.3.5 (Positivity):** If $f$ is integrable on $[a,b]$ and $f(x) \geq 0$ for all $x \in [a,b]$, then:
$$
\int_a^b f \geq 0
$$

**Corollary 6.3.6 (Bounds):** If $m \leq f(x) \leq M$ for all $x \in [a,b]$, then:
$$
m(b-a) \leq \int_a^b f \leq M(b-a)
$$

**Example 6.3.7:** Since $0 \leq \sin x \leq 1$ on $[0, \pi/2]$, we have:
$$
0 \leq \int_0^{\pi/2} \sin x dx \leq \frac{\pi}{2}
$$

## The Triangle Inequality

**Theorem 6.3.8 (Triangle Inequality for Integrals):** If $f$ is integrable on $[a,b]$, then $|f|$ is integrable, and:
$$
\left|\int_a^b f\right| \leq \int_a^b |f|
$$

**Proof:** First, we show $|f|$ is integrable. This follows from the fact that if $f$ satisfies the Darboux criterion, so does $|f|$ (using $||f(x)| - |f(y)|| \leq |f(x) - f(y)|$).

For the inequality, note that $-|f(x)| \leq f(x) \leq |f(x)|$. By monotonicity:
$$
-\int_a^b |f| \leq \int_a^b f \leq \int_a^b |f|
$$

This is equivalent to $|\int_a^b f| \leq \int_a^b |f|$. $\square$

**Remark:** The converse is false: $|f|$ can be integrable without $f$ being integrable (though this requires pathological examples).

## Additivity Over Intervals

**Theorem 6.3.9 (Additivity Over Intervals):** If $f$ is integrable on $[a,b]$ and $c \in (a,b)$, then $f$ is integrable on $[a,c]$ and $[c,b]$, and:
$$
\int_a^b f = \int_a^c f + \int_c^b f
$$

**Proof:** Given $\epsilon > 0$, there exists a partition $P$ of $[a,b]$ with $U(f,P) - L(f,P) < \epsilon$. Let $Q = P \cup \{c\}$ be a refinement. Then $Q$ divides into partitions $Q_1$ of $[a,c]$ and $Q_2$ of $[c,b]$. We have:
$$
U(f,Q) - L(f,Q) = [U(f,Q_1) - L(f,Q_1)] + [U(f,Q_2) - L(f,Q_2)] < \epsilon
$$

Therefore both $U(f,Q_1) - L(f,Q_1)$ and $U(f,Q_2) - L(f,Q_2)$ can be made arbitrarily small, proving integrability on the subintervals.

For the formula, note that for any partition respecting the point $c$:
$$
S(f, P, \{t_i\}) = S(f, P_1, \{t_i\}) + S(f, P_2, \{t_i\})
$$
where $P_1$ and $P_2$ are the restrictions to $[a,c]$ and $[c,b]$. Taking limits proves the additivity formula. $\square$

**Convention:** We extend the definition to allow $a > b$ by:
$$
\int_b^a f = -\int_a^b f
$$
and $\int_a^a f = 0$. With these conventions, the additivity formula holds for any ordering of $a$, $b$, $c$.

**Example 6.3.10:** If $\int_0^5 f = 10$ and $\int_0^3 f = 4$, then:
$$
\int_3^5 f = \int_0^5 f - \int_0^3 f = 10 - 4 = 6
$$

## Products and Quotients

**Theorem 6.3.11:** If $f$ and $g$ are integrable on $[a,b]$, then:
1. $fg$ is integrable on $[a,b]$
2. If $g(x) \geq m > 0$ for all $x$, then $f/g$ is integrable on $[a,b]$

**Proof:** For (1), use the fact that:
$$
fg = \frac{1}{4}[(f+g)^2 - (f-g)^2]
$$
and that if $h$ is integrable, so is $h^2$ (this follows from the Darboux criterion using $|h^2(x) - h^2(y)| = |h(x) - h(y)| \cdot |h(x) + h(y)|$ and boundedness).

For (2), note that $1/g$ is continuous (hence integrable) on $[a,b]$ since $g \geq m > 0$, so apply (1) to $f$ and $1/g$. $\square$

**Example 6.3.12:** Since $x$ and $\sin x$ are integrable on $[0, \pi]$, so is $x \sin x$.

## The Mean Value Theorem for Integrals

**Theorem 6.3.13 (Mean Value Theorem for Integrals):** If $f$ is continuous on $[a,b]$, then there exists $c \in [a,b]$ such that:
$$
\int_a^b f = f(c)(b-a)
$$

**Proof:** Since $f$ is continuous on the compact set $[a,b]$, it attains its minimum $m$ and maximum $M$. By the bounds property:
$$
m(b-a) \leq \int_a^b f \leq M(b-a)
$$

Therefore:
$$
m \leq \frac{1}{b-a}\int_a^b f \leq M
$$

By the Intermediate Value Theorem, $f$ attains every value between $m$ and $M$, so there exists $c \in [a,b]$ with:
$$
f(c) = \frac{1}{b-a}\int_a^b f
$$
$\square$

**Definition 6.3.14:** The number $\frac{1}{b-a}\int_a^b f$ is called the **average value** of $f$ on $[a,b]$.

**Example 6.3.15:** The average value of $f(x) = x^2$ on $[0,1]$ is:
$$
\frac{1}{1-0}\int_0^1 x^2 dx = \frac{1}{3}
$$

This value is attained at $c = 1/\sqrt{3}$.

## Weighted Mean Value Theorem

**Theorem 6.3.16 (Weighted MVT):** If $f$ and $g$ are continuous on $[a,b]$ and $g(x) \geq 0$ for all $x \in [a,b]$, then there exists $c \in [a,b]$ such that:
$$
\int_a^b fg = f(c)\int_a^b g
$$

**Proof:** Let $m$ and $M$ be the minimum and maximum of $f$ on $[a,b]$. Then $mg(x) \leq f(x)g(x) \leq Mg(x)$, so:
$$
m\int_a^b g \leq \int_a^b fg \leq M\int_a^b g
$$

If $\int_a^b g = 0$, then $fg = 0$ a.e. and any $c$ works. Otherwise:
$$
m \leq \frac{\int_a^b fg}{\int_a^b g} \leq M
$$

By the Intermediate Value Theorem, there exists $c$ with $f(c) = \frac{\int_a^b fg}{\int_a^b g}$. $\square$

## Integral Inequalities

**Example 6.3.17 (Cauchy-Schwarz for Integrals):** If $f$ and $g$ are continuous on $[a,b]$:
$$
\left(\int_a^b fg\right)^2 \leq \left(\int_a^b f^2\right)\left(\int_a^b g^2\right)
$$

**Proof:** Consider $h(t) = \int_a^b (f + tg)^2 \geq 0$ for all $t$. Expanding:
$$
h(t) = \int_a^b f^2 + 2t\int_a^b fg + t^2\int_a^b g^2
$$

This is a quadratic in $t$ that is always non-negative, so its discriminant is non-positive:
$$
4\left(\int_a^b fg\right)^2 - 4\left(\int_a^b f^2\right)\left(\int_a^b g^2\right) \leq 0
$$
$\square$

## Exercises

1. Prove that if $f$ is integrable and $\int_a^b f = 0$ and $f(x) \geq 0$ for all $x$, then $f = 0$ at all but finitely many points.

2. Show that $|\int_0^{\pi} x \sin x dx| \leq \int_0^{\pi} |x \sin x| dx$ and compute both sides.

3. If $f$ is continuous on $[0,1]$ with $\int_0^1 f = 0$ and $\int_0^1 f^2 = 0$, prove that $f(x) = 0$ for all $x$.

4. Prove that $\int_a^b f = \int_a^c f + \int_c^b f$ holds even when $c \not\in [a,b]$.

5. If $f$ and $g$ are integrable with $|f(x) - g(x)| < \epsilon$ for all $x \in [a,b]$, show that $|\int_a^b f - \int_a^b g| < \epsilon(b-a)$.

6. Find the average value of $\sin x$ on $[0, 2\pi]$.

7. Prove Jensen's inequality for integrals: if $\varphi$ is convex and $f$ is integrable:
$$
\varphi\left(\frac{1}{b-a}\int_a^b f\right) \leq \frac{1}{b-a}\int_a^b \varphi \circ f
$$

8. Show that if $f$ is continuous and $\int_a^b f \cdot g = 0$ for all continuous $g$, then $f = 0$.

## Conclusion

The properties developed in this section—linearity, monotonicity, additivity over intervals, the triangle inequality, and the mean value theorem—form the computational and theoretical foundation for working with integrals. These properties allow us to break complex integrals into simpler pieces, establish inequalities, and make rigorous estimates. The parallels between these properties and those of finite sums reflect the integral's origin as a limit of Riemann sums. Understanding these properties is essential for both practical integration and for deeper theoretical work in analysis, differential equations, and probability theory.
