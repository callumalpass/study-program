---
title: "Differentiation Rules"
slug: "differentiation-rules"
description: "Product rule, quotient rule, chain rule"
---

# Differentiation Rules

## Introduction

While the definition of the derivative allows us to compute derivatives from first principles, this process can be tedious and repetitive. Fortunately, certain rules allow us to compute derivatives of complex functions from derivatives of simpler ones. This section establishes the fundamental differentiation rules: linearity, the product rule, the quotient rule, and the chain rule. Each rule is proven rigorously from the definition of the derivative.

## Linearity of Differentiation

**Theorem 5.2.1 (Linearity):** Let $f$ and $g$ be differentiable at $c$, and let $\alpha, \beta \in \mathbb{R}$. Then $\alpha f + \beta g$ is differentiable at $c$, and:
$$
(\alpha f + \beta g)'(c) = \alpha f'(c) + \beta g'(c)
$$

**Proof:** By definition:
$$
(\alpha f + \beta g)'(c) = \lim_{h \to 0} \frac{[\alpha f(c+h) + \beta g(c+h)] - [\alpha f(c) + \beta g(c)]}{h}
$$
$$
= \lim_{h \to 0} \left[\alpha \frac{f(c+h) - f(c)}{h} + \beta \frac{g(c+h) - g(c)}{h}\right]
$$
$$
= \alpha \lim_{h \to 0} \frac{f(c+h) - f(c)}{h} + \beta \lim_{h \to 0} \frac{g(c+h) - g(c)}{h}
$$
$$
= \alpha f'(c) + \beta g'(c)
$$
where we used the linearity of limits. $\square$

**Corollary 5.2.2:** In particular:
1. $(f + g)' = f' + g'$ (sum rule)
2. $(cf)' = cf'$ for constant $c$ (constant multiple rule)
3. $(f - g)' = f' - g'$ (difference rule)

## The Product Rule

**Theorem 5.2.3 (Product Rule):** If $f$ and $g$ are differentiable at $c$, then $fg$ is differentiable at $c$, and:
$$
(fg)'(c) = f'(c)g(c) + f(c)g'(c)
$$

**Proof:** We use a classical algebraic trick. For $h \neq 0$:
$$
\frac{f(c+h)g(c+h) - f(c)g(c)}{h}
$$
Add and subtract $f(c+h)g(c)$:
$$
= \frac{f(c+h)g(c+h) - f(c+h)g(c) + f(c+h)g(c) - f(c)g(c)}{h}
$$
$$
= f(c+h) \cdot \frac{g(c+h) - g(c)}{h} + g(c) \cdot \frac{f(c+h) - f(c)}{h}
$$
Taking the limit as $h \to 0$:
$$
(fg)'(c) = \lim_{h \to 0} f(c+h) \cdot \lim_{h \to 0} \frac{g(c+h) - g(c)}{h} + g(c) \cdot \lim_{h \to 0} \frac{f(c+h) - f(c)}{h}
$$
Since $f$ is differentiable at $c$, it is continuous at $c$, so $\lim_{h \to 0} f(c+h) = f(c)$. Therefore:
$$
(fg)'(c) = f(c)g'(c) + g(c)f'(c)
$$
$\square$

**Mnemonic:** The derivative of a product is the first times the derivative of the second plus the second times the derivative of the first.

**Example 5.2.4:** Compute the derivative of $h(x) = x^2 \sin(x)$.

Using the product rule with $f(x) = x^2$ and $g(x) = \sin(x)$:
$$
h'(x) = (x^2)' \sin(x) + x^2 (\sin x)' = 2x \sin(x) + x^2 \cos(x)
$$

## The Quotient Rule

**Theorem 5.2.5 (Quotient Rule):** If $f$ and $g$ are differentiable at $c$ and $g(c) \neq 0$, then $f/g$ is differentiable at $c$, and:
$$
\left(\frac{f}{g}\right)'(c) = \frac{f'(c)g(c) - f(c)g'(c)}{[g(c)]^2}
$$

**Proof:** First, we establish that if $g(c) \neq 0$ and $g$ is continuous at $c$, then $1/g$ is continuous at $c$, and indeed differentiable if $g$ is differentiable.

For $1/g$:
$$
\left(\frac{1}{g}\right)'(c) = \lim_{h \to 0} \frac{\frac{1}{g(c+h)} - \frac{1}{g(c)}}{h}
$$
$$
= \lim_{h \to 0} \frac{g(c) - g(c+h)}{h \cdot g(c+h) \cdot g(c)}
$$
$$
= \lim_{h \to 0} \frac{-1}{g(c+h) \cdot g(c)} \cdot \frac{g(c+h) - g(c)}{h}
$$
$$
= \frac{-1}{[g(c)]^2} \cdot g'(c) = \frac{-g'(c)}{[g(c)]^2}
$$

Now, using $f/g = f \cdot (1/g)$ and the product rule:
$$
\left(\frac{f}{g}\right)'(c) = f'(c) \cdot \frac{1}{g(c)} + f(c) \cdot \frac{-g'(c)}{[g(c)]^2}
$$
$$
= \frac{f'(c)g(c) - f(c)g'(c)}{[g(c)]^2}
$$
$\square$

**Example 5.2.6:** Compute the derivative of $h(x) = \frac{x^2 + 1}{x^3 + 3x}$.

Using the quotient rule:
$$
h'(x) = \frac{(2x)(x^3 + 3x) - (x^2 + 1)(3x^2 + 3)}{(x^3 + 3x)^2}
$$
$$
= \frac{2x^4 + 6x^2 - 3x^4 - 3x^2 - 3x^2 - 3}{(x^3 + 3x)^2}
$$
$$
= \frac{-x^4 - 3}{(x^3 + 3x)^2}
$$

## The Chain Rule

The chain rule is arguably the most important differentiation rule, as it allows us to differentiate composite functions.

**Theorem 5.2.7 (Chain Rule):** Let $g$ be differentiable at $c$ and let $f$ be differentiable at $g(c)$. Then the composite function $f \circ g$ is differentiable at $c$, and:
$$
(f \circ g)'(c) = f'(g(c)) \cdot g'(c)
$$

**Proof:** The naive approach of writing
$$
\frac{f(g(c+h)) - f(g(c))}{h} = \frac{f(g(c+h)) - f(g(c))}{g(c+h) - g(c)} \cdot \frac{g(c+h) - g(c)}{h}
$$
fails when $g(c+h) = g(c)$ for some $h \neq 0$ near 0.

We use a more careful approach. Since $f$ is differentiable at $g(c)$, we can write:
$$
f(y) - f(g(c)) = f'(g(c))(y - g(c)) + \epsilon(y)(y - g(c))
$$
where $\epsilon(y) \to 0$ as $y \to g(c)$, with $\epsilon(g(c)) = 0$.

Let $y = g(c+h)$. Then:
$$
f(g(c+h)) - f(g(c)) = f'(g(c))(g(c+h) - g(c)) + \epsilon(g(c+h))(g(c+h) - g(c))
$$

Dividing by $h$ (for $h \neq 0$):
$$
\frac{f(g(c+h)) - f(g(c))}{h} = f'(g(c)) \frac{g(c+h) - g(c)}{h} + \epsilon(g(c+h)) \frac{g(c+h) - g(c)}{h}
$$

Taking the limit as $h \to 0$:
$$
(f \circ g)'(c) = f'(g(c)) \cdot g'(c) + \lim_{h \to 0} \epsilon(g(c+h)) \cdot g'(c)
$$

Since $g$ is continuous at $c$ (being differentiable there), $g(c+h) \to g(c)$ as $h \to 0$, so $\epsilon(g(c+h)) \to 0$. Therefore:
$$
(f \circ g)'(c) = f'(g(c)) \cdot g'(c)
$$
$\square$

**Leibniz Notation:** If $y = f(u)$ and $u = g(x)$, then:
$$
\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}
$$
This notation makes the chain rule appear natural, though it's important to remember that these are not actual fractions.

**Example 5.2.8:** Compute the derivative of $h(x) = \sin(x^2)$.

Let $f(u) = \sin(u)$ and $g(x) = x^2$. Then $h = f \circ g$, so:
$$
h'(x) = f'(g(x)) \cdot g'(x) = \cos(x^2) \cdot 2x = 2x\cos(x^2)
$$

**Example 5.2.9:** Compute the derivative of $h(x) = (x^3 + 2x + 1)^{100}$.

Let $f(u) = u^{100}$ and $g(x) = x^3 + 2x + 1$. Then:
$$
h'(x) = 100(x^3 + 2x + 1)^{99} \cdot (3x^2 + 2)
$$

**Example 5.2.10 (Multiple Compositions):** Compute the derivative of $h(x) = \sin(\sqrt{x^2 + 1})$.

We can think of this as $h = f \circ g \circ k$ where $f(u) = \sin(u)$, $g(v) = \sqrt{v}$, and $k(x) = x^2 + 1$.

Using the chain rule twice:
$$
h'(x) = \cos(\sqrt{x^2 + 1}) \cdot \frac{1}{2\sqrt{x^2 + 1}} \cdot 2x
$$
$$
= \frac{x\cos(\sqrt{x^2 + 1})}{\sqrt{x^2 + 1}}
$$

## Derivative of Inverse Functions

**Theorem 5.2.11 (Inverse Function Theorem):** Let $f$ be continuous and strictly monotone on an interval $I$, differentiable at $c \in I$ with $f'(c) \neq 0$. Let $g = f^{-1}$ be the inverse function. Then $g$ is differentiable at $f(c)$, and:
$$
g'(f(c)) = \frac{1}{f'(c)}
$$

**Proof:** Let $y_0 = f(c)$ and consider $y \neq y_0$ near $y_0$. Since $g$ is the inverse of $f$, we have $f(g(y)) = y$ for all $y$ in the range of $f$.

Let $x = g(y)$ and $x_0 = g(y_0) = c$. Since $f$ is strictly monotone, $x \neq x_0$ when $y \neq y_0$. We have:
$$
\frac{g(y) - g(y_0)}{y - y_0} = \frac{x - x_0}{f(x) - f(x_0)} = \frac{1}{\frac{f(x) - f(x_0)}{x - x_0}}
$$

As $y \to y_0$, we have $x \to x_0$ (by continuity of $g$). Therefore:
$$
g'(y_0) = \lim_{y \to y_0} \frac{g(y) - g(y_0)}{y - y_0} = \lim_{x \to x_0} \frac{1}{\frac{f(x) - f(x_0)}{x - x_0}} = \frac{1}{f'(x_0)} = \frac{1}{f'(c)}
$$
$\square$

**Example 5.2.12:** Find the derivative of $\ln(x)$ using the fact that it's the inverse of $e^x$.

Let $f(x) = e^x$ and $g(x) = \ln(x)$. Then $g = f^{-1}$, and $f'(x) = e^x$.

At a point $y > 0$, let $x = \ln(y)$ so that $e^x = y$. Then:
$$
g'(y) = \frac{1}{f'(x)} = \frac{1}{e^x} = \frac{1}{y}
$$

Therefore, $(\ln x)' = 1/x$ for $x > 0$.

## Combined Applications

**Example 5.2.13:** Compute the derivative of $h(x) = \frac{\sin(x^3)}{e^{x^2}}$.

Using the quotient rule:
$$
h'(x) = \frac{[\sin(x^3)]' \cdot e^{x^2} - \sin(x^3) \cdot [e^{x^2}]'}{(e^{x^2})^2}
$$

For the numerator terms using the chain rule:
- $[\sin(x^3)]' = \cos(x^3) \cdot 3x^2$
- $[e^{x^2}]' = e^{x^2} \cdot 2x$

Therefore:
$$
h'(x) = \frac{3x^2\cos(x^3) \cdot e^{x^2} - \sin(x^3) \cdot e^{x^2} \cdot 2x}{e^{2x^2}}
$$
$$
= \frac{e^{x^2}[3x^2\cos(x^3) - 2x\sin(x^3)]}{e^{2x^2}}
$$
$$
= \frac{3x^2\cos(x^3) - 2x\sin(x^3)}{e^{x^2}}
$$

**Example 5.2.14:** Compute the derivative of $h(x) = x^x$ for $x > 0$.

We use logarithmic differentiation. Let $y = x^x$. Taking logarithms:
$$
\ln y = x \ln x
$$

Differentiating both sides with respect to $x$ (using the chain rule on the left):
$$
\frac{1}{y} \cdot y' = \ln x + x \cdot \frac{1}{x} = \ln x + 1
$$

Therefore:
$$
y' = y(\ln x + 1) = x^x(\ln x + 1)
$$

**Example 5.2.15:** Compute the derivative of $h(x) = (\sin x)^{\cos x}$ for $x \in (0, \pi)$.

Using logarithmic differentiation: $\ln h(x) = \cos x \cdot \ln(\sin x)$

Differentiating:
$$
\frac{h'(x)}{h(x)} = -\sin x \cdot \ln(\sin x) + \cos x \cdot \frac{\cos x}{\sin x}
$$
$$
= -\sin x \ln(\sin x) + \frac{\cos^2 x}{\sin x}
$$

Therefore:
$$
h'(x) = (\sin x)^{\cos x} \left[-\sin x \ln(\sin x) + \frac{\cos^2 x}{\sin x}\right]
$$

## Exercises

1. Prove the generalized product rule: $(fgh)' = f'gh + fg'h + fgh'$.

2. Use the product rule to prove the power rule $(x^n)' = nx^{n-1}$ for negative integers $n$.

3. Compute the derivative of $\tan(x)$ using the quotient rule.

4. If $f$ and $g$ are differentiable and $f \cdot g = 1$, show that $f'/f + g'/g = 0$.

5. Use the chain rule to prove that $(f^n)' = nf^{n-1}f'$ for $n \in \mathbb{N}$.

6. Compute: $\frac{d}{dx}\left[\sin^3(e^{x^2})\right]$

7. Let $f$ be differentiable. Show that the derivative of the even function $g(x) = f(x) + f(-x)$ is an odd function.

8. Prove Leibniz's rule for the $n$-th derivative of a product:
$$
(fg)^{(n)} = \sum_{k=0}^{n} \binom{n}{k} f^{(k)}g^{(n-k)}
$$

## Conclusion

The differentiation rules developed in this section—linearity, product rule, quotient rule, and chain rule—form the computational foundation of differential calculus. These rules allow us to systematically compute derivatives of arbitrarily complex functions built from elementary pieces. The proofs demonstrate how careful manipulation of limits, combined with the basic definition of the derivative, yields these powerful computational tools. Understanding both the statements and proofs of these rules is essential for deeper work in analysis and its applications.
