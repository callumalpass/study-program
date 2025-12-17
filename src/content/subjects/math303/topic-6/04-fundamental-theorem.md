---
title: "Fundamental Theorem of Calculus"
slug: "fundamental-theorem"
description: "Connection between differentiation and integration"
---

# Fundamental Theorem of Calculus

## Introduction

The Fundamental Theorem of Calculus is one of the most important results in all of mathematics. It establishes the deep connection between the two central operations of calculus: differentiation and integration. The theorem comes in two parts. The first part shows that integration can be "undone" by differentiation, while the second part provides a practical method for computing definite integrals using antiderivatives. Together, these results transform integration from a limit process into an algebraic operation, making many calculations feasible.

## Part I: The Derivative of an Integral

**Theorem 6.4.1 (Fundamental Theorem of Calculus, Part I):** Let $f$ be integrable on $[a,b]$ and define:
$$
F(x) = \int_a^x f(t) \, dt \quad \text{for } x \in [a,b]
$$

Then:
1. $F$ is continuous on $[a,b]$
2. If $f$ is continuous at $c \in (a,b)$, then $F$ is differentiable at $c$ and $F'(c) = f(c)$

**Proof:**
**(1) Continuity:** Let $x, y \in [a,b]$ with $x < y$. Since $f$ is integrable, it is bounded: $|f(t)| \leq M$ for some $M$. Then:
$$
|F(y) - F(x)| = \left|\int_a^y f - \int_a^x f\right| = \left|\int_x^y f\right| \leq M|y-x|
$$

This shows $F$ is Lipschitz continuous, hence continuous.

**(2) Differentiability:** Assume $f$ is continuous at $c$. For $h \neq 0$ small enough that $c + h \in (a,b)$:
$$
\frac{F(c+h) - F(c)}{h} = \frac{1}{h}\int_c^{c+h} f(t) \, dt
$$

By the Mean Value Theorem for Integrals, there exists $\xi_h$ between $c$ and $c+h$ such that:
$$
\frac{1}{h}\int_c^{c+h} f(t) \, dt = f(\xi_h)
$$

As $h \to 0$, we have $\xi_h \to c$, so by continuity of $f$ at $c$:
$$
F'(c) = \lim_{h \to 0} f(\xi_h) = f(c)
$$
$\square$

**Remark:** If $f$ is continuous on all of $[a,b]$, then $F'(x) = f(x)$ for all $x \in (a,b)$.

**Example 6.4.2:** Let $F(x) = \int_0^x t^2 dt$. Find $F'(x)$.

By FTC Part I, since $f(t) = t^2$ is continuous:
$$
F'(x) = x^2
$$

**Example 6.4.3:** Let $F(x) = \int_0^x \sin(t^2) dt$. Find $F'(x)$.

Even though we cannot express $F(x)$ in terms of elementary functions, FTC Part I tells us:
$$
F'(x) = \sin(x^2)
$$

**Example 6.4.4:** Find $\frac{d}{dx}\int_0^{x^2} \sin t \, dt$.

Let $u = x^2$, so we want $\frac{d}{dx}\int_0^u \sin t \, dt$. By the chain rule and FTC Part I:
$$
\frac{d}{dx}\int_0^{x^2} \sin t \, dt = \sin(x^2) \cdot 2x = 2x\sin(x^2)
$$

## Part II: Evaluation by Antiderivatives

**Definition 6.4.5:** A function $F$ is an **antiderivative** (or **primitive**) of $f$ on $[a,b]$ if $F'(x) = f(x)$ for all $x \in (a,b)$.

**Lemma 6.4.6:** If $F$ and $G$ are both antiderivatives of $f$ on $[a,b]$, then $F - G$ is constant.

**Proof:** $(F - G)' = F' - G' = f - f = 0$. By the Mean Value Theorem, $F - G$ is constant. $\square$

**Theorem 6.4.7 (Fundamental Theorem of Calculus, Part II):** If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$, then:
$$
\int_a^b f(x) \, dx = F(b) - F(a)
$$

**Proof:** Define $G(x) = \int_a^x f(t) \, dt$. By FTC Part I, $G'(x) = f(x) = F'(x)$ for all $x \in (a,b)$. By Lemma 6.4.6, $F(x) = G(x) + C$ for some constant $C$. Therefore:
$$
\int_a^b f = G(b) = G(b) - G(a) = F(b) - C - (F(a) - C) = F(b) - F(a)
$$
since $G(a) = \int_a^a f = 0$. $\square$

**Notation:** We write $F(x)\big|_a^b$ or $[F(x)]_a^b$ to denote $F(b) - F(a)$.

**Example 6.4.8:** Compute $\int_0^1 x^2 dx$.

An antiderivative of $x^2$ is $F(x) = \frac{x^3}{3}$. Therefore:
$$
\int_0^1 x^2 dx = \frac{x^3}{3}\bigg|_0^1 = \frac{1}{3} - 0 = \frac{1}{3}
$$

**Example 6.4.9:** Compute $\int_0^\pi \sin x \, dx$.

An antiderivative of $\sin x$ is $-\cos x$. Therefore:
$$
\int_0^\pi \sin x \, dx = -\cos x\big|_0^\pi = -\cos \pi - (-\cos 0) = -(-1) + 1 = 2
$$

**Example 6.4.10:** Compute $\int_1^e \frac{1}{x} dx$.

An antiderivative of $1/x$ is $\ln x$. Therefore:
$$
\int_1^e \frac{1}{x} dx = \ln x\big|_1^e = \ln e - \ln 1 = 1 - 0 = 1
$$

## Applications of the Fundamental Theorem

### Computing Definite Integrals

The FTC transforms the problem of computing definite integrals from evaluating limits of Riemann sums to finding antiderivatives—an algebraic problem.

**Example 6.4.11:** Compute $\int_0^2 (3x^2 + 2x + 1) dx$.

An antiderivative is $F(x) = x^3 + x^2 + x$. Therefore:
$$
\int_0^2 (3x^2 + 2x + 1) dx = (x^3 + x^2 + x)\big|_0^2 = (8 + 4 + 2) - 0 = 14
$$

### Integration by Substitution

**Theorem 6.4.12 (Substitution Rule):** If $g$ has a continuous derivative on $[a,b]$ and $f$ is continuous on the range of $g$, then:
$$
\int_a^b f(g(x))g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du
$$

**Proof:** Let $F$ be an antiderivative of $f$. By the chain rule:
$$
\frac{d}{dx}[F(g(x))] = F'(g(x))g'(x) = f(g(x))g'(x)
$$

Therefore, $F(g(x))$ is an antiderivative of $f(g(x))g'(x)$. By FTC Part II:
$$
\int_a^b f(g(x))g'(x) \, dx = F(g(b)) - F(g(a)) = \int_{g(a)}^{g(b)} f(u) \, du
$$
$\square$

**Example 6.4.13:** Compute $\int_0^1 2x e^{x^2} dx$.

Let $u = x^2$, so $du = 2x \, dx$. When $x = 0$, $u = 0$; when $x = 1$, $u = 1$. Therefore:
$$
\int_0^1 2x e^{x^2} dx = \int_0^1 e^u du = e^u\big|_0^1 = e - 1
$$

**Example 6.4.14:** Compute $\int_0^{\pi/2} \sin x \cos x \, dx$.

Let $u = \sin x$, so $du = \cos x \, dx$. When $x = 0$, $u = 0$; when $x = \pi/2$, $u = 1$. Therefore:
$$
\int_0^{\pi/2} \sin x \cos x \, dx = \int_0^1 u \, du = \frac{u^2}{2}\bigg|_0^1 = \frac{1}{2}
$$

### Integration by Parts

**Theorem 6.4.15 (Integration by Parts):** If $f$ and $g$ have continuous derivatives on $[a,b]$, then:
$$
\int_a^b f(x)g'(x) \, dx = f(x)g(x)\big|_a^b - \int_a^b f'(x)g(x) \, dx
$$

**Proof:** By the product rule:
$$
(fg)' = f'g + fg'
$$

Integrating both sides from $a$ to $b$ and using FTC:
$$
f(b)g(b) - f(a)g(a) = \int_a^b f'g + \int_a^b fg'
$$

Rearranging gives the result. $\square$

**Mnemonic:** $\int u \, dv = uv - \int v \, du$ where $u = f$, $dv = g' dx$, $du = f' dx$, $v = g$.

**Example 6.4.16:** Compute $\int_0^1 xe^x dx$.

Let $u = x$ and $dv = e^x dx$. Then $du = dx$ and $v = e^x$. Therefore:
$$
\int_0^1 xe^x dx = xe^x\big|_0^1 - \int_0^1 e^x dx = e - 0 - (e^x\big|_0^1) = e - (e - 1) = 1
$$

**Example 6.4.17:** Compute $\int_0^\pi x\sin x \, dx$.

Let $u = x$ and $dv = \sin x \, dx$. Then $du = dx$ and $v = -\cos x$. Therefore:
$$
\int_0^\pi x\sin x \, dx = -x\cos x\big|_0^\pi + \int_0^\pi \cos x \, dx
$$
$$
= -\pi\cos\pi + 0 + \sin x\big|_0^\pi = \pi + 0 = \pi
$$

## The Integral as an Accumulation Function

FTC Part I shows that $F(x) = \int_a^x f(t) \, dt$ accumulates the "signed area" under $f$ from $a$ to $x$. The rate of accumulation at $x$ is precisely $f(x)$.

**Example 6.4.18 (Velocity and Displacement):** If $v(t)$ is the velocity of a particle at time $t$, then its displacement from time $a$ to time $b$ is:
$$
s(b) - s(a) = \int_a^b v(t) \, dt
$$

This follows from $s'(t) = v(t)$ and FTC Part II.

**Example 6.4.19 (Area Function):** Define $A(x) = \int_0^x (1 + t^2) dt$. Then:
$$
A'(x) = 1 + x^2
$$

This means the rate at which area accumulates under $y = 1 + t^2$ at position $x$ equals the height of the curve at that position.

## Improper Use and Cautions

**Warning 6.4.20:** FTC Part II requires $f$ to be continuous. If $f$ has a discontinuity, care is needed.

**Example 6.4.21 (Incorrect Application):** Consider $\int_{-1}^1 \frac{1}{x^2} dx$.

If we blindly apply FTC with the antiderivative $F(x) = -1/x$:
$$
-\frac{1}{x}\bigg|_{-1}^1 = -1 - 1 = -2
$$

This is WRONG! The function $1/x^2$ is not continuous on $[-1, 1]$ (it's undefined at 0), and the integral is actually improper and divergent.

## Exercises

1. Find $\frac{d}{dx}\int_1^x \sqrt{1 + t^3} \, dt$.

2. Find $\frac{d}{dx}\int_x^{x^2} \sin(t^2) \, dt$.

3. Compute $\int_0^1 x\sqrt{1-x^2} \, dx$ using substitution.

4. Compute $\int_0^{\pi/4} x\sec^2 x \, dx$ using integration by parts.

5. If $F(x) = \int_0^x f(t) \, dt$ and $F(x) = x^2 \sin x$, find $f(x)$.

6. Prove that $\int_0^a f(x) \, dx = \int_0^a f(a-x) \, dx$ for continuous $f$.

7. Use the FTC to prove that if $f$ is continuous and $f(x) \geq 0$ with $\int_a^b f = 0$, then $f(x) = 0$ for all $x \in [a,b]$.

8. Compute $\int_0^1 \frac{x}{(1+x^2)^2} \, dx$.

## Conclusion

The Fundamental Theorem of Calculus is the cornerstone result connecting differentiation and integration. Part I shows that integration and differentiation are inverse operations, while Part II provides a practical computational tool for evaluating definite integrals using antiderivatives. The theorem transforms integration from a limit process into an algebraic problem, making calculus applicable to a vast range of problems in science and engineering. The substitution rule and integration by parts, both consequences of the FTC, further expand our computational capabilities. Understanding the FTC deeply—both its statement and its proof—is essential for mastery of real analysis.
