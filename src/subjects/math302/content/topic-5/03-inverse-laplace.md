---
title: "Inverse Laplace Transform"
---

# Inverse Laplace Transform

## Introduction

The inverse Laplace transform is the operation that recovers the original function $f(t)$ from its Laplace transform $F(s)$. If $\mathcal{L}\{f(t)\} = F(s)$, we denote the inverse transform as:

$$f(t) = \mathcal{L}^{-1}\{F(s)\}$$

While the forward Laplace transform is defined by an integral, the inverse transform is typically found using tables, partial fraction decomposition, and properties rather than computing the complex inversion integral directly.

## The Inversion Formula

The formal definition of the inverse Laplace transform involves complex analysis:

$$f(t) = \mathcal{L}^{-1}\{F(s)\} = \frac{1}{2\pi i}\int_{\gamma-i\infty}^{\gamma+i\infty} e^{st}F(s) \, ds$$

where $\gamma$ is a real constant chosen so that the contour of integration lies to the right of all singularities of $F(s)$.

In practice, this integral is rarely computed directly. Instead, we use:
1. Tables of known transform pairs
2. Properties of the Laplace transform
3. Partial fraction decomposition
4. Residue theory (for advanced cases)

## Linearity of the Inverse Transform

Like the forward transform, the inverse Laplace transform is linear:

$$\mathcal{L}^{-1}\{aF(s) + bG(s)\} = a\mathcal{L}^{-1}\{F(s)\} + b\mathcal{L}^{-1}\{G(s)\}$$

### Example

Find $\mathcal{L}^{-1}\left\{\frac{3}{s} + \frac{2}{s-4}\right\}$:

$$\mathcal{L}^{-1}\left\{\frac{3}{s} + \frac{2}{s-4}\right\} = 3\mathcal{L}^{-1}\left\{\frac{1}{s}\right\} + 2\mathcal{L}^{-1}\left\{\frac{1}{s-4}\right\} = 3 + 2e^{4t}$$

## Using Transform Tables

Standard Laplace transform tables provide inverse transform pairs. Key entries include:

| $F(s)$ | $f(t) = \mathcal{L}^{-1}\{F(s)\}$ |
|--------|-----------------------------------|
| $\frac{1}{s}$ | $1$ |
| $\frac{1}{s^2}$ | $t$ |
| $\frac{n!}{s^{n+1}}$ | $t^n$ |
| $\frac{1}{s-a}$ | $e^{at}$ |
| $\frac{a}{s^2+a^2}$ | $\sin(at)$ |
| $\frac{s}{s^2+a^2}$ | $\cos(at)$ |
| $\frac{a}{s^2-a^2}$ | $\sinh(at)$ |
| $\frac{s}{s^2-a^2}$ | $\cosh(at)$ |

## Partial Fraction Decomposition

Most practical problems involve finding inverse transforms of rational functions $F(s) = \frac{P(s)}{Q(s)}$. When the degree of $P(s)$ is less than the degree of $Q(s)$, we use partial fraction decomposition.

### Case 1: Distinct Linear Factors

If $Q(s) = (s-a_1)(s-a_2)\cdots(s-a_n)$ with distinct $a_i$, then:

$$F(s) = \frac{A_1}{s-a_1} + \frac{A_2}{s-a_2} + \cdots + \frac{A_n}{s-a_n}$$

#### Example

Find $\mathcal{L}^{-1}\left\{\frac{s+7}{s^2+s-6}\right\}$:

Factor the denominator: $s^2+s-6 = (s+3)(s-2)$

$$\frac{s+7}{(s+3)(s-2)} = \frac{A}{s+3} + \frac{B}{s-2}$$

Multiply both sides by $(s+3)(s-2)$:

$$s+7 = A(s-2) + B(s+3)$$

Setting $s = 2$: $9 = 5B$, so $B = \frac{9}{5}$

Setting $s = -3$: $4 = -5A$, so $A = -\frac{4}{5}$

$$\mathcal{L}^{-1}\left\{\frac{s+7}{s^2+s-6}\right\} = -\frac{4}{5}e^{-3t} + \frac{9}{5}e^{2t}$$

### Case 2: Repeated Linear Factors

If $Q(s)$ has a repeated factor $(s-a)^m$, the decomposition includes:

$$\frac{A_1}{s-a} + \frac{A_2}{(s-a)^2} + \cdots + \frac{A_m}{(s-a)^m}$$

Recall that $\mathcal{L}^{-1}\left\{\frac{1}{(s-a)^n}\right\} = \frac{t^{n-1}}{(n-1)!}e^{at}$

#### Example

Find $\mathcal{L}^{-1}\left\{\frac{2s+1}{(s-1)^2}\right\}$:

$$\frac{2s+1}{(s-1)^2} = \frac{A}{s-1} + \frac{B}{(s-1)^2}$$

Multiply by $(s-1)^2$:

$$2s+1 = A(s-1) + B$$

Expanding: $2s+1 = As - A + B$

Comparing coefficients: $A = 2$ and $-A + B = 1$, so $B = 3$

$$\mathcal{L}^{-1}\left\{\frac{2s+1}{(s-1)^2}\right\} = 2\mathcal{L}^{-1}\left\{\frac{1}{s-1}\right\} + 3\mathcal{L}^{-1}\left\{\frac{1}{(s-1)^2}\right\}$$

$$= 2e^t + 3te^t = (2+3t)e^t$$

### Case 3: Irreducible Quadratic Factors

For factors of the form $s^2 + bs + c$ that cannot be factored over the reals, we complete the square and use:

$$\mathcal{L}^{-1}\left\{\frac{s-a}{(s-a)^2+b^2}\right\} = e^{at}\cos(bt)$$

$$\mathcal{L}^{-1}\left\{\frac{b}{(s-a)^2+b^2}\right\} = e^{at}\sin(bt)$$

#### Example

Find $\mathcal{L}^{-1}\left\{\frac{s+5}{s^2+2s+5}\right\}$:

Complete the square: $s^2+2s+5 = (s+1)^2+4$

Rewrite the numerator: $s+5 = (s+1) + 4$

$$\frac{s+5}{s^2+2s+5} = \frac{s+1}{(s+1)^2+4} + \frac{4}{(s+1)^2+4}$$

$$= \frac{s+1}{(s+1)^2+2^2} + 2 \cdot \frac{2}{(s+1)^2+2^2}$$

$$\mathcal{L}^{-1}\left\{\frac{s+5}{s^2+2s+5}\right\} = e^{-t}\cos(2t) + 2e^{-t}\sin(2t)$$

$$= e^{-t}[\cos(2t) + 2\sin(2t)]$$

### Complex Example

Find $\mathcal{L}^{-1}\left\{\frac{3s^2-2s+1}{s(s-1)(s^2+1)}\right\}$:

Partial fraction decomposition:

$$\frac{3s^2-2s+1}{s(s-1)(s^2+1)} = \frac{A}{s} + \frac{B}{s-1} + \frac{Cs+D}{s^2+1}$$

Multiply by $s(s-1)(s^2+1)$:

$$3s^2-2s+1 = A(s-1)(s^2+1) + Bs(s^2+1) + (Cs+D)s(s-1)$$

Setting $s = 0$: $1 = -A$, so $A = -1$

Setting $s = 1$: $2 = 2B$, so $B = 1$

Expanding and comparing coefficients (or setting $s = i$):

$C = 3$ and $D = 0$

$$\frac{3s^2-2s+1}{s(s-1)(s^2+1)} = -\frac{1}{s} + \frac{1}{s-1} + \frac{3s}{s^2+1}$$

$$\mathcal{L}^{-1}\left\{\frac{3s^2-2s+1}{s(s-1)(s^2+1)}\right\} = -1 + e^t + 3\cos(t)$$

## Completing the Square Technique

When dealing with quadratic expressions in $s$, completing the square is essential.

For $as^2 + bs + c$:

1. Factor out $a$: $a\left(s^2 + \frac{b}{a}s + \frac{c}{a}\right)$
2. Complete the square: $a\left[\left(s + \frac{b}{2a}\right)^2 + \frac{c}{a} - \frac{b^2}{4a^2}\right]$

### Example

Express $s^2 - 6s + 13$ in completed square form:

$$s^2 - 6s + 13 = (s-3)^2 - 9 + 13 = (s-3)^2 + 4$$

## Inverse Transform Using Properties

### First Translation (s-shifting)

If $\mathcal{L}^{-1}\{F(s)\} = f(t)$, then:

$$\mathcal{L}^{-1}\{F(s-a)\} = e^{at}f(t)$$

#### Example

Find $\mathcal{L}^{-1}\left\{\frac{1}{(s-2)^3}\right\}$:

Since $\mathcal{L}^{-1}\left\{\frac{1}{s^3}\right\} = \frac{t^2}{2}$:

$$\mathcal{L}^{-1}\left\{\frac{1}{(s-2)^3}\right\} = e^{2t} \cdot \frac{t^2}{2} = \frac{t^2e^{2t}}{2}$$

### Second Translation (t-shifting)

$$\mathcal{L}^{-1}\{e^{-as}F(s)\} = f(t-a)u(t-a)$$

where $u(t-a)$ is the unit step function.

## Summary

Finding inverse Laplace transforms is a crucial skill for solving differential equations. The key techniques are:

1. **Direct table lookup** for simple transforms
2. **Linearity** to break complex expressions into simpler parts
3. **Partial fractions** for rational functions
4. **Completing the square** for quadratic factors
5. **Translation theorems** for shifted transforms

Mastery of partial fraction decomposition and recognizing standard forms in transform tables enables efficient solution of initial value problems using the Laplace transform method.
