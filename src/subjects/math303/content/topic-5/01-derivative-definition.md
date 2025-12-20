---
title: "The Derivative: Definition"
slug: "derivative-definition"
description: "Definition of derivative and basic examples"
---

# The Derivative: Definition

## Introduction

The derivative is the fundamental concept in differential calculus, providing a precise way to measure instantaneous rates of change. While the geometric interpretation of the derivative as the slope of a tangent line is intuitive, the rigorous definition requires careful use of limits. This section develops the formal definition of the derivative and explores its basic properties and implications.

## Formal Definition

**Definition 5.1.1 (Derivative at a Point):** Let $f: (a,b) \to \mathbb{R}$ and $c \in (a,b)$. The **derivative** of $f$ at $c$ is defined as:
$$
f'(c) = \lim_{h \to 0} \frac{f(c+h) - f(c)}{h}
$$
provided the limit exists and is finite. When this limit exists, we say that $f$ is **differentiable** at $c$.

**Alternative Formulation:** Equivalently, we can write:
$$
f'(c) = \lim_{x \to c} \frac{f(x) - f(c)}{x - c}
$$
The equivalence follows from the substitution $x = c + h$.

**Notation:** Various notations are used for the derivative:
- $f'(c)$ (Lagrange notation)
- $\frac{df}{dx}\bigg|_{x=c}$ (Leibniz notation)
- $Df(c)$ (operator notation)
- $\dot{f}(c)$ (Newton notation, used in physics)

## Geometric and Physical Interpretation

**Geometric Interpretation:** The derivative $f'(c)$ represents the slope of the tangent line to the graph of $f$ at the point $(c, f(c))$. The tangent line has equation:
$$
y - f(c) = f'(c)(x - c)
$$

**Physical Interpretation:** If $f(t)$ represents the position of a particle at time $t$, then $f'(t)$ represents the instantaneous velocity of the particle at time $t$. More generally, the derivative measures the instantaneous rate of change of any quantity.

## One-Sided Derivatives

**Definition 5.1.2 (One-Sided Derivatives):** The **right-hand derivative** of $f$ at $c$ is:
$$
f'_+(c) = \lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h}
$$
and the **left-hand derivative** is:
$$
f'_-(c) = \lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h}
$$

**Theorem 5.1.3:** $f$ is differentiable at $c$ if and only if both $f'_+(c)$ and $f'_-(c)$ exist and are equal. In this case, $f'(c) = f'_+(c) = f'_-(c)$.

**Proof:** This follows directly from the definition of the limit, since $\lim_{h \to 0}$ exists if and only if both one-sided limits exist and are equal. $\square$

## Differentiability Implies Continuity

**Theorem 5.1.4 (Differentiability Implies Continuity):** If $f$ is differentiable at $c$, then $f$ is continuous at $c$.

**Proof:** Assume $f'(c)$ exists. We need to show that $\lim_{x \to c} f(x) = f(c)$. For $x \neq c$ in a neighborhood of $c$, we can write:
$$
f(x) - f(c) = \frac{f(x) - f(c)}{x - c} \cdot (x - c)
$$
Taking the limit as $x \to c$:
$$
\lim_{x \to c} (f(x) - f(c)) = \lim_{x \to c} \frac{f(x) - f(c)}{x - c} \cdot \lim_{x \to c} (x - c) = f'(c) \cdot 0 = 0
$$
Therefore, $\lim_{x \to c} f(x) = f(c)$, proving continuity. $\square$

**Remark:** The converse is false. A function can be continuous at a point without being differentiable there, as the following examples demonstrate.

## Detailed Examples

**Example 5.1.5 (Power Function):** Let $f(x) = x^2$. We compute $f'(c)$ for any $c \in \mathbb{R}$ using the definition:
$$
f'(c) = \lim_{h \to 0} \frac{(c+h)^2 - c^2}{h} = \lim_{h \to 0} \frac{c^2 + 2ch + h^2 - c^2}{h}
$$
$$
= \lim_{h \to 0} \frac{2ch + h^2}{h} = \lim_{h \to 0} (2c + h) = 2c
$$
Thus, $(x^2)' = 2x$ for all $x \in \mathbb{R}$.

**Example 5.1.6 (Absolute Value Function):** Let $f(x) = |x|$. We investigate differentiability at $x = 0$.

For the right-hand derivative:
$$
f'_+(0) = \lim_{h \to 0^+} \frac{|h| - |0|}{h} = \lim_{h \to 0^+} \frac{h}{h} = 1
$$

For the left-hand derivative:
$$
f'_-(0) = \lim_{h \to 0^-} \frac{|h| - |0|}{h} = \lim_{h \to 0^-} \frac{-h}{h} = -1
$$

Since $f'_+(0) \neq f'_-(0)$, the function $|x|$ is not differentiable at 0, despite being continuous there. Geometrically, the graph has a "corner" at the origin.

For $c \neq 0$, we can verify that $f'(c) = \text{sgn}(c)$ where sgn is the sign function.

**Example 5.1.7 (Square Root Function):** Let $f(x) = \sqrt{x}$ on $(0, \infty)$. For $c > 0$:
$$
f'(c) = \lim_{h \to 0} \frac{\sqrt{c+h} - \sqrt{c}}{h}
$$
Rationalizing the numerator:
$$
= \lim_{h \to 0} \frac{\sqrt{c+h} - \sqrt{c}}{h} \cdot \frac{\sqrt{c+h} + \sqrt{c}}{\sqrt{c+h} + \sqrt{c}}
$$
$$
= \lim_{h \to 0} \frac{(c+h) - c}{h(\sqrt{c+h} + \sqrt{c})} = \lim_{h \to 0} \frac{h}{h(\sqrt{c+h} + \sqrt{c})}
$$
$$
= \lim_{h \to 0} \frac{1}{\sqrt{c+h} + \sqrt{c}} = \frac{1}{2\sqrt{c}}
$$

At $c = 0$, examining the right-hand derivative:
$$
f'_+(0) = \lim_{h \to 0^+} \frac{\sqrt{h}}{h} = \lim_{h \to 0^+} \frac{1}{\sqrt{h}} = +\infty
$$
Thus, $\sqrt{x}$ is not differentiable at 0 (the tangent line is vertical).

**Example 5.1.8 (Nowhere Differentiable Function):** Let $f(x) = x \sin(1/x)$ for $x \neq 0$ and $f(0) = 0$. We examine differentiability at 0:
$$
\frac{f(h) - f(0)}{h} = \frac{h\sin(1/h)}{h} = \sin(1/h)
$$
As $h \to 0$, $\sin(1/h)$ oscillates between $-1$ and $1$ without approaching a limit. Therefore, $f$ is not differentiable at 0.

However, if we modify this to $g(x) = x^2 \sin(1/x)$ for $x \neq 0$ and $g(0) = 0$, then:
$$
g'(0) = \lim_{h \to 0} \frac{h^2 \sin(1/h)}{h} = \lim_{h \to 0} h\sin(1/h) = 0
$$
since $|\sin(1/h)| \leq 1$ and $\lim_{h \to 0} h = 0$. This function is differentiable at 0 with $g'(0) = 0$.

**Example 5.1.9 (Cubic Function):** Let $f(x) = x^3$. Using the definition:
$$
f'(c) = \lim_{h \to 0} \frac{(c+h)^3 - c^3}{h}
$$
Expanding $(c+h)^3 = c^3 + 3c^2h + 3ch^2 + h^3$:
$$
= \lim_{h \to 0} \frac{3c^2h + 3ch^2 + h^3}{h} = \lim_{h \to 0} (3c^2 + 3ch + h^2) = 3c^2
$$
Therefore, $(x^3)' = 3x^2$.

## Differentiability on an Interval

**Definition 5.1.10:** A function $f$ is **differentiable on an open interval** $(a,b)$ if it is differentiable at every point $c \in (a,b)$. In this case, the derivative $f'$ is itself a function from $(a,b)$ to $\mathbb{R}$.

For differentiability on a **closed interval** $[a,b]$, we require:
- $f$ is differentiable on $(a,b)$
- $f'_+(a)$ exists (right derivative at $a$)
- $f'_-(b)$ exists (left derivative at $b$)

## Exercises

1. Using the definition of the derivative, prove that if $f(x) = x^n$ for $n \in \mathbb{N}$, then $f'(x) = nx^{n-1}$.

2. Show that $f(x) = x|x|$ is differentiable at $x = 0$ and find $f'(0)$.

3. Determine whether $f(x) = x^{2/3}$ is differentiable at $x = 0$.

4. Let $f(x) = x^2$ for $x \in \mathbb{Q}$ and $f(x) = 0$ for $x \notin \mathbb{Q}$. Determine where $f$ is differentiable.

5. For what values of $\alpha > 0$ is $f(x) = x^\alpha$ differentiable at $x = 0$?

6. Prove that if $f$ is differentiable at $c$ and $f'(c) \neq 0$, then there exists $\delta > 0$ such that $f$ is monotone on $(c-\delta, c+\delta)$.

7. Show that the function $f(x) = \begin{cases} x^2\sin(1/x) & x \neq 0 \\ 0 & x = 0 \end{cases}$ is differentiable everywhere but $f'$ is not continuous at 0.

## Conclusion

The derivative, defined rigorously through limits, provides a powerful tool for analyzing the local behavior of functions. The key results established here are that differentiability is a stronger condition than continuity, and that differentiability can fail even when continuity holds. The examples illustrate various ways differentiability can fail: through corners (absolute value), vertical tangents (square root at zero), or oscillatory behavior. These foundational concepts prepare us for the development of differentiation rules and deeper theorems about differentiable functions.
