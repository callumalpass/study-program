---
title: "L'Hôpital's Rule"
slug: "lhopitals-rule"
description: "Evaluating limits using derivatives"
---

# L'Hôpital's Rule

## Introduction

L'Hôpital's Rule is a powerful technique for evaluating limits of indeterminate forms using derivatives. When direct substitution in a limit yields an indeterminate form such as $0/0$ or $\infty/\infty$, L'Hôpital's Rule allows us to replace the original limit with a (hopefully simpler) limit involving derivatives. This section provides rigorous proofs of L'Hôpital's Rule for various cases and demonstrates its application through numerous examples.

## Indeterminate Forms

When evaluating $\lim_{x \to a} \frac{f(x)}{g(x)}$, direct substitution may yield various **indeterminate forms**:

**Primary indeterminate forms:**
- $\frac{0}{0}$: both numerator and denominator approach 0
- $\frac{\infty}{\infty}$: both numerator and denominator approach $\pm\infty$

**Secondary indeterminate forms** (can be converted to primary forms):
- $0 \cdot \infty$
- $\infty - \infty$
- $0^0$, $1^\infty$, $\infty^0$

These are called indeterminate because the limit could be any value (or fail to exist) depending on the specific functions involved.

## L'Hôpital's Rule: The $0/0$ Case

**Theorem 5.4.1 (L'Hôpital's Rule, $0/0$ Form):** Suppose $f$ and $g$ are differentiable on an open interval $I$ containing $a$ (except possibly at $a$ itself), and suppose:
1. $\lim_{x \to a} f(x) = 0$ and $\lim_{x \to a} g(x) = 0$
2. $g'(x) \neq 0$ for all $x \in I$ with $x \neq a$
3. $\lim_{x \to a} \frac{f'(x)}{g'(x)} = L$ (where $L \in \mathbb{R}$ or $L = \pm\infty$)

Then:
$$
\lim_{x \to a} \frac{f(x)}{g(x)} = L
$$

**Proof:** We prove the case where $a \in \mathbb{R}$ and $L \in \mathbb{R}$. Define:
$$
F(x) = \begin{cases} f(x) & x \neq a \\ 0 & x = a \end{cases}, \quad
G(x) = \begin{cases} g(x) & x \neq a \\ 0 & x = a \end{cases}
$$

Then $F$ and $G$ are continuous on $I$ (by the assumption $\lim_{x \to a} f(x) = \lim_{x \to a} g(x) = 0$).

Let $x \in I$ with $x \neq a$. By Cauchy's Mean Value Theorem applied to $F$ and $G$ on the interval between $a$ and $x$, there exists $c$ strictly between $a$ and $x$ such that:
$$
\frac{F(x) - F(a)}{G(x) - G(a)} = \frac{F'(c)}{G'(c)}
$$

Since $F(a) = G(a) = 0$, $F(x) = f(x)$, $G(x) = g(x)$, $F'(c) = f'(c)$, and $G'(c) = g'(c)$:
$$
\frac{f(x)}{g(x)} = \frac{f'(c)}{g'(c)}
$$

As $x \to a$, we have $c \to a$ (since $c$ is between $a$ and $x$). Therefore:
$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{c \to a} \frac{f'(c)}{g'(c)} = L
$$
$\square$

**Remark:** The same result holds for one-sided limits $x \to a^+$ or $x \to a^-$, and also for limits as $x \to \infty$ or $x \to -\infty$ with appropriate modifications.

## L'Hôpital's Rule: The $\infty/\infty$ Case

**Theorem 5.4.2 (L'Hôpital's Rule, $\infty/\infty$ Form):** Suppose $f$ and $g$ are differentiable on an open interval $(a, b)$, and suppose:
1. $\lim_{x \to a^+} g(x) = \pm\infty$ (and consequently $\lim_{x \to a^+} f(x) = \pm\infty$)
2. $g'(x) \neq 0$ for all $x \in (a,b)$
3. $\lim_{x \to a^+} \frac{f'(x)}{g'(x)} = L$

Then:
$$
\lim_{x \to a^+} \frac{f(x)}{g(x)} = L
$$

**Proof Sketch:** The proof is more technical than the $0/0$ case. It involves choosing a point $c \in (a,b)$ and applying Cauchy's Mean Value Theorem to the interval $(x,c)$ for $x \in (a,c)$, then carefully taking limits. The key is showing that the term involving $f(c)$ and $g(c)$ becomes negligible as $g(x) \to \infty$. $\square$

## Examples: Basic Applications

**Example 5.4.3:** Evaluate $\lim_{x \to 0} \frac{\sin x}{x}$.

This is a $0/0$ indeterminate form. Applying L'Hôpital's Rule:
$$
\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{(\sin x)'}{(x)'} = \lim_{x \to 0} \frac{\cos x}{1} = \cos 0 = 1
$$

**Example 5.4.4:** Evaluate $\lim_{x \to 0} \frac{e^x - 1}{x}$.

This is $0/0$. By L'Hôpital's Rule:
$$
\lim_{x \to 0} \frac{e^x - 1}{x} = \lim_{x \to 0} \frac{e^x}{1} = e^0 = 1
$$

**Example 5.4.5:** Evaluate $\lim_{x \to \infty} \frac{x^2}{e^x}$.

This is $\infty/\infty$. Applying L'Hôpital's Rule:
$$
\lim_{x \to \infty} \frac{x^2}{e^x} = \lim_{x \to \infty} \frac{2x}{e^x}
$$

This is still $\infty/\infty$, so we apply L'Hôpital's Rule again:
$$
= \lim_{x \to \infty} \frac{2}{e^x} = 0
$$

**Example 5.4.6:** Evaluate $\lim_{x \to 0^+} \frac{\ln x}{1/x}$.

As $x \to 0^+$, we have $\ln x \to -\infty$ and $1/x \to +\infty$, giving the form $-\infty/\infty$. By L'Hôpital's Rule:
$$
\lim_{x \to 0^+} \frac{\ln x}{1/x} = \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} \frac{x^2}{-x} = \lim_{x \to 0^+} (-x) = 0
$$

## Multiple Applications

**Example 5.4.7:** Evaluate $\lim_{x \to 0} \frac{x - \sin x}{x^3}$.

This is $0/0$. First application:
$$
\lim_{x \to 0} \frac{x - \sin x}{x^3} = \lim_{x \to 0} \frac{1 - \cos x}{3x^2}
$$

Still $0/0$. Second application:
$$
= \lim_{x \to 0} \frac{\sin x}{6x}
$$

Still $0/0$. Third application:
$$
= \lim_{x \to 0} \frac{\cos x}{6} = \frac{1}{6}
$$

**Example 5.4.8:** Evaluate $\lim_{x \to \infty} \frac{x^n}{e^x}$ for $n \in \mathbb{N}$.

This is $\infty/\infty$. Applying L'Hôpital's Rule repeatedly (n times):
$$
\lim_{x \to \infty} \frac{x^n}{e^x} = \lim_{x \to \infty} \frac{nx^{n-1}}{e^x} = \cdots = \lim_{x \to \infty} \frac{n!}{e^x} = 0
$$

This shows that exponential functions grow faster than any polynomial.

## Converting Other Indeterminate Forms

### Form $0 \cdot \infty$

**Example 5.4.9:** Evaluate $\lim_{x \to 0^+} x \ln x$.

This is $0 \cdot (-\infty)$. Rewrite as:
$$
\lim_{x \to 0^+} x \ln x = \lim_{x \to 0^+} \frac{\ln x}{1/x}
$$

Now it's $-\infty/\infty$. By L'Hôpital's Rule:
$$
= \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} \frac{-x^2}{x} = \lim_{x \to 0^+} (-x) = 0
$$

### Form $\infty - \infty$

**Example 5.4.10:** Evaluate $\lim_{x \to 0^+} \left(\frac{1}{x} - \frac{1}{\sin x}\right)$.

This is $\infty - \infty$. Combine the fractions:
$$
\lim_{x \to 0^+} \left(\frac{1}{x} - \frac{1}{\sin x}\right) = \lim_{x \to 0^+} \frac{\sin x - x}{x \sin x}
$$

Now it's $0/0$. By L'Hôpital's Rule:
$$
= \lim_{x \to 0^+} \frac{\cos x - 1}{\sin x + x\cos x}
$$

Still $0/0$. Apply again:
$$
= \lim_{x \to 0^+} \frac{-\sin x}{\cos x + \cos x - x\sin x} = \frac{0}{2} = 0
$$

### Forms $0^0$, $1^\infty$, $\infty^0$

For indeterminate exponential forms, we use logarithms to convert to $0 \cdot \infty$ or $\infty/\infty$.

**Example 5.4.11:** Evaluate $\lim_{x \to 0^+} x^x$ (form $0^0$).

Let $y = x^x$, so $\ln y = x \ln x$. From Example 5.4.9:
$$
\lim_{x \to 0^+} \ln y = \lim_{x \to 0^+} x \ln x = 0
$$

Therefore:
$$
\lim_{x \to 0^+} x^x = \lim_{x \to 0^+} y = e^0 = 1
$$

**Example 5.4.12:** Evaluate $\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x$ (form $1^\infty$).

Let $y = \left(1 + \frac{1}{x}\right)^x$, so:
$$
\ln y = x \ln\left(1 + \frac{1}{x}\right) = \frac{\ln(1 + 1/x)}{1/x}
$$

This is $0/0$ as $x \to \infty$. By L'Hôpital's Rule (using the chain rule for the numerator):
$$
\lim_{x \to \infty} \frac{\ln(1 + 1/x)}{1/x} = \lim_{x \to \infty} \frac{\frac{1}{1+1/x} \cdot (-1/x^2)}{-1/x^2} = \lim_{x \to \infty} \frac{1}{1 + 1/x} = 1
$$

Therefore:
$$
\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e^1 = e
$$

**Example 5.4.13:** Evaluate $\lim_{x \to \infty} x^{1/x}$ (form $\infty^0$).

Let $y = x^{1/x}$, so $\ln y = \frac{\ln x}{x}$ (form $\infty/\infty$). By L'Hôpital's Rule:
$$
\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{1/x}{1} = 0
$$

Therefore:
$$
\lim_{x \to \infty} x^{1/x} = e^0 = 1
$$

## Common Mistakes and Cautions

**Warning 5.4.14:** L'Hôpital's Rule can only be applied when:
1. The limit is an indeterminate form
2. The derivatives exist in a neighborhood of the point
3. The limit of the quotient of derivatives exists

**Example 5.4.15 (Incorrect Application):** Consider $\lim_{x \to 0} \frac{x^2 + 1}{x + 1}$.

Direct substitution gives $\frac{1}{1} = 1$, which is NOT an indeterminate form. Applying L'Hôpital's Rule incorrectly would give:
$$
\lim_{x \to 0} \frac{2x}{1} = 0 \quad \text{(WRONG!)}
$$

**Example 5.4.16 (Oscillatory Behavior):** Consider $\lim_{x \to \infty} \frac{x + \sin x}{x}$.

This is $\infty/\infty$. We might try L'Hôpital's Rule:
$$
\lim_{x \to \infty} \frac{1 + \cos x}{1}
$$

But this limit doesn't exist (oscillates between 0 and 2). However, the original limit exists:
$$
\lim_{x \to \infty} \frac{x + \sin x}{x} = \lim_{x \to \infty} \left(1 + \frac{\sin x}{x}\right) = 1 + 0 = 1
$$

This shows that L'Hôpital's Rule can fail if the limit of derivatives doesn't exist, even when the original limit exists.

## Advanced Examples

**Example 5.4.17:** Evaluate $\lim_{x \to 0} \frac{\tan x - \sin x}{\sin^3 x}$.

Form $0/0$. First application:
$$
\lim_{x \to 0} \frac{\sec^2 x - \cos x}{3\sin^2 x \cos x}
$$

Still $0/0$ (since $\sec^2 0 = 1 = \cos 0$). This approach becomes messy. Instead, use series or rewrite:
$$
\frac{\tan x - \sin x}{\sin^3 x} = \frac{\sin x/\cos x - \sin x}{\sin^3 x} = \frac{\sin x(1 - \cos x)}{\cos x \cdot \sin^3 x} = \frac{1 - \cos x}{\cos x \cdot \sin^2 x}
$$

Now apply L'Hôpital's Rule to $\frac{1 - \cos x}{\sin^2 x}$:
$$
\lim_{x \to 0} \frac{\sin x}{2\sin x \cos x} = \lim_{x \to 0} \frac{1}{2\cos x} = \frac{1}{2}
$$

Combined with $\lim_{x \to 0} \frac{1}{\cos x} = 1$, we get $\frac{1}{2}$.

**Example 5.4.18:** Evaluate $\lim_{x \to 0} \frac{e^x - e^{-x} - 2x}{x - \sin x}$.

Form $0/0$. First application:
$$
\lim_{x \to 0} \frac{e^x + e^{-x} - 2}{1 - \cos x}
$$

Still $0/0$. Second application:
$$
\lim_{x \to 0} \frac{e^x - e^{-x}}{\sin x}
$$

Still $0/0$. Third application:
$$
\lim_{x \to 0} \frac{e^x + e^{-x}}{\cos x} = \frac{2}{1} = 2
$$

## Exercises

1. Evaluate: $\lim_{x \to 0} \frac{e^{2x} - 1}{\sin 3x}$

2. Evaluate: $\lim_{x \to 0} \frac{\ln(\cos x)}{x^2}$

3. Evaluate: $\lim_{x \to \infty} \frac{\ln x}{x^{1/2}}$

4. Evaluate: $\lim_{x \to 0^+} x^{\sin x}$ (form $0^0$)

5. Evaluate: $\lim_{x \to 1} \frac{x^x - 1}{x - 1}$

6. Find $\lim_{x \to 0} \left(\frac{1}{\sin^2 x} - \frac{1}{x^2}\right)$ (form $\infty - \infty$)

7. Show that $\lim_{x \to 0} \frac{\sin x - x + \frac{x^3}{6}}{x^5} = \frac{1}{120}$

8. Evaluate: $\lim_{x \to \pi/2^-} (\tan x)^{\cos x}$ (form $\infty^0$)

## Conclusion

L'Hôpital's Rule is a powerful computational tool for evaluating limits involving indeterminate forms. The rule transforms a potentially difficult limit calculation into a (hopefully simpler) derivative calculation. However, care must be taken to verify that the hypotheses are satisfied, and one should always check whether simpler algebraic methods might work. The technique is particularly useful for establishing growth rates of functions and for theoretical work in asymptotic analysis. Understanding when and how to apply L'Hôpital's Rule, including multiple applications and conversions between indeterminate forms, is an essential skill in real analysis.
